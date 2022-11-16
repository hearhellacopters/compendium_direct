import React, { useState, useEffect } from 'react';
import BuffsFormatting from '../formatting/BuffsFormatting.js'
import DefaultTippy from '../formatting/TippyDefaults.js';
import { Helmet} from 'react-helmet-async';
import { useDispatch } from "react-redux";
import { setFalse, setTrue } from '../redux/ducks/jptoggle'
import { Link, Navigate} from 'react-router-dom'
import ScrollToTop from '../formatting/ScrollToTop.js'
import OhNo from '../characterpages/OhNo.js'
import Random from '../processing/Random.js'
import '../characterpages/CharacterPage.css'
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/scale-subtle.css';
import 'tippy.js/animations/scale-extreme.css';
import FaceMaker from '../formatting/CharFaceFormatting.js'
import CharcterHeader from './CharacterHeader.js'
import { getQuery, getQueryStringVal, useQueryParam } from '../processing/urlparams'

const BuffsPageFormatting = ({match, ProcessedCharacters, ProcessedBuffs, jptoggledata }) => {

    const [random, setRandom] =useState(1);
    
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[jptoggledata])

    useEffect(() => {
      setRandom(Random(7))
      }, [])
      
    const filtered = ProcessedCharacters.filter(function (el) { 
        return el["ShortName"] == match.params.id ; 
      }); 
      

      if(filtered.length === 0 ) {
        return(
            <Navigate replace to="/404"/>
        )
    
    } else {

        const filteredchar = ProcessedBuffs.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID ; 
          }); 

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

          let currentIndex = ProcessedCharacters.findIndex(x => x.GLOrder == filtered[0].GLOrder);
    const nextIndex = (currentIndex + 1) % ProcessedCharacters.length;
    const previousIndex = (currentIndex - 1) % ProcessedCharacters.length;

    const nextevent = (function (){
        const holder = ProcessedCharacters[nextIndex];
        if(nextIndex === 0 ){
            return false;
        } else{
            return holder;
        }
    })();

    const previousevent = (function (){
        const holder = ProcessedCharacters[previousIndex];
        if(holder === undefined ){
            return false;
        } else{
            return holder;
        }
    })();

          const char = filteredchar;

    return (
        <div className="wrapper">
            <ScrollToTop/>
        <Helmet>
          <title>{filtered[0].CharacterName} Buffs - Dissidia Compendium</title>
          <meta property="og:site_name" content="Dissidia Compendium"/>
          <meta property="og:type" content="website" />
          <meta name="description" content={`Listing of all buffs and debuffs for ${filtered[0].CharacterName}`}/>
          <meta name="twitter:title" content={`${filtered[0].CharacterName} Buffs`}/>
          <meta name="twitter:description" content={`Listing of all buffs and debuffs for ${filtered[0].CharacterName}`}/>
          <meta name="twitter:image" content={`https://dissidiacompendium.com/images/static/characters/${filtered[0].CharacterURLName}/cc.png`}/>
          <meta name="twitter:card" content="summary"/>
          <meta name="twitter:image:alt" content={`${filtered[0].CharacterName}`}/>
          <meta property="og:title" content={`${filtered[0].CharacterName} Buffs`}/>
          <meta property="og:description" content={`Listing of all buffs and debuffs for ${filtered[0].CharacterName}`}/>
          <meta property="og:image" content={`https://dissidiacompendium.com/images/static/characters/${filtered[0].CharacterURLName}/cc.png`}/>
          <meta property="og:url" content={`https://dissidiacompendium.com/characters/${filtered[0].ShortName}/buffs`}/>
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
                  nextevent={nextevent}
                  previousevent={previousevent}
                  Subheader={"Buffs & Debuffs"}
                  headertitle={
                    <div className="facetop">
                        <ul className="CharListHolder">
                          <FaceMaker match={filtered[0]}/>
                        </ul>
                    </div>}
                  match={match}
                  newmatch={filtered[0]}
                  pageloc={"buffs"}
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
                    ))) :""}
                </div>
            </div>
        </div>
        )
    }
}
export default BuffsPageFormatting