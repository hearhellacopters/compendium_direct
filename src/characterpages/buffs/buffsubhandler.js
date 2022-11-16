import React, { useState, useEffect} from 'react';
import '../../characterpages/CharacterPage.css'
import BuffsFormatting from '../../formatting/BuffsFormatting.js'
import DefaultTippy from '../../formatting/TippyDefaults.js';
import { useDispatch } from "react-redux";
import { setFalse, setTrue } from '../../redux/ducks/jptoggle'
import { Helmet} from 'react-helmet-async';
import { Link, Navigate} from 'react-router-dom'
import ScrollToTop from '../../formatting/ScrollToTop.js'
import Random from '../../processing/Random.js'
import OhNo from '../OhNo.js'
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/scale-subtle.css';
import 'tippy.js/animations/scale-extreme.css';
import FaceMaker from '../../formatting/CharFaceFormatting.js'
import CharcterHeader from '../CharacterHeader.js'
import { getQuery, getQueryStringVal, useQueryParam } from '../../processing/urlparams'

const AAFormatingFormatting = ({match, type, ProcessedBuffs, ProcessedCharacters ,jptoggledata}) => {

  const dispatch = useDispatch();

  const [JPsearch, setJPSearch] = useQueryParam("JP", "");

  useEffect(() => {
    //jp toggle
    if(jptoggledata == true ){
      setJPSearch("true")
    }
    if(getQueryStringVal("JP") == "true" ){
      dispatch(setTrue())
    }
  },[jptoggledata,dispatch,setJPSearch])


    function typehandler(type){
      if(type == "aa"){
        return "ABuff"
      }
      if(type == "bt"){
        return "BTBuff"
      }
      if(type == "call"){
        return "CallBuff"
      }
      if(type == "ld"){
        return "LDBuff"
      }
      if(type == "ex"){
        return "EXBuff"
      }
      if(type == "fr"){
        return "FRBuff"
      }
      if(type == "s1"){
        return "S1Buff"
      }
      if(type == "s2"){
        return "S2Buff"
      }
      if(type == "battlestate"){
        return "BState"
      }
    }


    function lochandler(type){ 
      if(type == "aa"){
        return "AA Line Buffs"
      }
      if(type == "bt"){
        return "Burst Line Buffs"
      }
      if(type == "call"){
        return "Calls Line Buffs"
      }
      if(type == "ld"){
        return "LD Line Buffs"
      }
      if(type == "ex"){
        return "EX Line Buffs"
      }
      if(type == "fr"){
        return "FR Line Buffs"
      }
      if(type == "s1"){
        return "Starting Skill Line Buffs"
      }
      if(type == "s2"){
        return "Second Skill Line Buffs"
      }
      if(type == "battlestate"){
        return "Battle State Buffs"
      }
    }

    function subhandler(type){ 
      if(type == "aa"){
        return "AA Buffs & Debuffs"
      }
      if(type == "bt"){
        return "Burst Buffs & Debuffs"
      }
      if(type == "call"){
        return "Calls Buffs & Debuffs"
      }
      if(type == "ld"){
        return "LD Buffs & Debuffs"
      }
      if(type == "ex"){
        return "EX Buffs & Debuffs"
      }
      if(type == "fr"){
        return "FR Buffs & Debuffs"
      }
      if(type == "s1"){
        return "Starting Ability Buffs & Debuffs"
      }
      if(type == "s2"){
        return "Crystal Level 20 Buffs & Debuffs"
      }
      if(type == "battlestate"){
        return "Battle State Buffs"
      }
    }

    const [random, setRandom] =useState(1);

    useEffect(() => {
        setRandom(Random(7))
      }, [])
    
    const filtered = ProcessedCharacters.filter(function (el) { 
        return el["ShortName"] == match.params.id ; 
      }); 

      const filteredchar = ProcessedBuffs.filter(function (el) { 
        return el["CharID"] == filtered[0].CharID && el["BuffFlag"] === typehandler(type) ; 
      }); 

      if(filtered.length === 0 || filteredchar.length === 0) {
        return(
            <Navigate replace to="/404"/>
        )
    
    } else {

        

          const btbuffs = ProcessedBuffs.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["BuffFlag"] === "BTBuff" ; 
          }); 
          const callbuffs = ProcessedBuffs.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["BuffFlag"] === "CallBuff" ; 
          });
          const aabuffs = ProcessedBuffs.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["BuffFlag"] === "ABuff" ; 
          }); 
          const ldbuffs = ProcessedBuffs.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["BuffFlag"] === "LDBuff" ; 
          }); 
          const exbuffs = ProcessedBuffs.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["BuffFlag"] === "EXBuff" ; 
          }); 
          const s1buffs = ProcessedBuffs.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["BuffFlag"] === "S1Buff" ; 
          }); 
          const s2buffs = ProcessedBuffs.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["BuffFlag"] === "S2Buff" ; 
          }); 
          const bstatebuffs = ProcessedBuffs.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["BuffFlag"] === "BState" ; 
          }); 
          const frbuffs = ProcessedBuffs.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["BuffFlag"] === "FRBuff" ; 
          }); 

          const char = filteredchar;

    return (
        <div className="wrapper">
             <ScrollToTop/>
        <Helmet>
          <title>{filtered[0].CharacterName} {lochandler(type)} - Dissidia Compendium</title>
          <meta property="og:site_name" content="Dissidia Compendium"/>
          <meta property="og:type" content="website" />
          <meta name="description" content={`Listing of ${lochandler(type)} for ${filtered[0].CharacterName}`}/>
          <meta name="twitter:title" content={`${filtered[0].CharacterName} ${lochandler(type)}`}/>
          <meta name="twitter:description" content={`Listing of all ${lochandler(type)} for ${filtered[0].CharacterName}`}/>
          <meta name="twitter:image" content={`https://dissidiacompendium.com/images/static/characters/${filtered[0].CharacterURLName}/cc.png`}/>
          <meta name="twitter:card" content="summary"/>
          <meta name="twitter:image:alt" content={`${filtered[0].CharacterName}`}/>
          <meta property="og:title" content={`${filtered[0].CharacterName} ${lochandler(type)}`}/>
          <meta property="og:description" content={`Listing of all ${lochandler(type)} for ${filtered[0].CharacterName}`}/>
          <meta property="og:image" content={`https://dissidiacompendium.com/images/static/characters/${filtered[0].CharacterURLName}/cc.png`}/>
          <meta property="og:url" content={`https://dissidiacompendium.com/characters/${filtered[0].ShortName}/buffs/${type}`}/>
        </Helmet>
            <div className="returnbutton">
                <DefaultTippy content="Return to Characters" className="tooltip" >
                <Link className="returnlink" to={`/characters/`}>
                    <div className="returnicon"></div>
                </Link>
                </DefaultTippy>
            </div>
            <div className="content">
            <CharcterHeader
                  nextevent={false}
                  previousevent={false}
                  Subheader={subhandler(type)}
                  headertitle={
                    <div className="facetop">
                        <ul className="CharListHolder">
                          <FaceMaker match={filtered[0]}/>
                        </ul>
                    </div>}
                    match={match}
                  newmatch={filtered[0]}
                  pageloc={lochandler(type)}
                  subcat={"buffs"}
                  btbuffs={btbuffs}
                  callbuffs={callbuffs}
                  aabuffs={aabuffs}
                  ldbuffs={ldbuffs}
                  exbuffs={exbuffs}
                  s1buffs={s1buffs}
                  s2buffs={s2buffs}
                  bstatebuffs={bstatebuffs}
                  frbuffs={frbuffs}
                  />
                <div className="singlepageholder">
                    {char.length > 0 ?  (
                    char.map(buffs => (
                    <BuffsFormatting 
                    ProcessedBuffs={ProcessedBuffs}
                    key={buffs.BuffKey}
                    match={buffs}
                    jptoggledata={jptoggledata}
                    />
                    ))) : ""}
                </div>
            </div>
        </div>
        )
    }
}
export default AAFormatingFormatting