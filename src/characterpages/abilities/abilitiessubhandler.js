import React, { useState, useEffect } from 'react';
import AbilitiesFormatting from '../../formatting/AbilitiesFormatting.js'
import DefaultTippy from '../../formatting/TippyDefaults.js';
import { useDispatch } from "react-redux";
import { setFalse, setTrue } from '../../redux/ducks/jptoggle'
import { Helmet} from 'react-helmet-async';
import { Link, Navigate} from 'react-router-dom'
import ScrollToTop from '../../formatting/ScrollToTop.js'
import Random from '../../processing/Random.js'
import '../../characterpages/CharacterPage.css'
import FaceMaker from '../../formatting/CharFaceFormatting.js'
import CharcterHeader from '../CharacterHeader.js'
import { getQuery, getQueryStringVal, useQueryParam } from '../../processing/urlparams'

const AAAttackFormatting = ({match, ProcessedAbilities, ProcessedCharacters, type, ProcessedBuffs, jptoggledata}) => {

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
    },[jptoggledata,dispatch,setJPSearch])

    function typehandler(type){
      if(type == "brv"){
        return 1
      }
      if(type == "hp"){
        return 2
      }
      if(type == "s1"){
        return 3
      }
      if(type == "s2"){
        return 4
      }
      if(type == "aa"){
        return 5
      }
      if(type == "ex"){
        return 6
      }
      if(type == "ld"){
        return 7
      }
      if(type == "burst"){
        return 8
      }
      if(type == "fr"){
        return 9
      }
      if(type == "call75"){
        return 20
      }
      if(type == "callld"){
        return 21
      }
    }

    function typesub(type){
      if(type == "brv"){
        return "BRV Abilities"
      }
      if(type == "hp"){
        return "HP Abilities"
      }
      if(type == "s1"){
        return "Starting Abilities"
      }
      if(type == "s2"){
        return "Crystal Level 20 Abilities"
      }
      if(type == "aa"){
        return "AA Abilities"
      }
      if(type == "ex"){
        return "EX Abilities"
      }
      if(type == "ld"){
        return "LD Abilities"
      }
      if(type == "fr"){
        return "FR Abilities"
      }
      if(type == "burst"){
        return "Burst Abilities"
      }
      if(type == "call75"){
        return "Call Crystal Level 75 Abilities"
      }
      if(type == "callld"){
        return "Call LD Abilities"
      }
    }

    function typeloc(type){
      if(type == "brv"){
        return "BRV Attacks"
      }
      if(type == "hp"){
        return "HP Attacks"
      }
      if(type == "s1"){
        return "Starting Attacks"
      }
      if(type == "s2"){
        return "Crystal Lv20 Attacks"
      }
      if(type == "aa"){
        return "AA Attacks"
      }
      if(type == "ex"){
        return "EX Attacks"
      }
      if(type == "ld"){
        return "LD Attacks"
      }
      if(type == "fr"){
        return "FR Attacks"
      }
      if(type == "burst"){
        return "Burst Attacks"
      }
      if(type == "call75"){
        return "Crystal Level 75 Call Attacks"
      }
      if(type == "callld"){
        return "LD Call Attacks"
      }
    }

    useEffect(() => {
      setRandom(Random(7))
      }, [])
    
    const filtered = ProcessedCharacters.filter(function (el) { 
        return el["ShortName"] == match.params.id ; 
      }); 

      const filteredchar = ProcessedAbilities.filter(function (el) { 
        return el["CharID"] == filtered[0].CharID && el["AbilityRank"] === typehandler(type) ;
      }); 

      if(filtered.length === 0 || filteredchar.length === 0 ) {
        return(
            <Navigate replace to="/404"/>
        )
    
    } else {

      
          const brvattack = ProcessedAbilities.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["AbilityRank"] === 1 ; 
          }); 
          const hpattacks = ProcessedAbilities.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID &&  el["AbilityRank"] === 2 ; 
          });
          const s1attacks = ProcessedAbilities.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID &&  el["AbilityRank"] === 3 ; 
          });
          const s2attacks = ProcessedAbilities.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID &&  el["AbilityRank"] === 4 ; 
          });
          const aaattacks = ProcessedAbilities.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID &&  el["AbilityRank"] === 5 ; 
          });
          const exattacks = ProcessedAbilities.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID &&  el["AbilityRank"] === 6 ; 
          });
          const ldattacks = ProcessedAbilities.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID &&  el["AbilityRank"] === 7 ; 
          });
          const btattacks = ProcessedAbilities.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID &&  el["AbilityRank"] === 8 ; 
          });
          const frattacks = ProcessedAbilities.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID &&  el["AbilityRank"] === 9 ; 
          });
          const call75attacks = ProcessedAbilities.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID &&  el["AbilityRank"] === 20 ; 
          });
          const callldattacks = ProcessedAbilities.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID &&  el["AbilityRank"] === 21 ; 
          });

          const char = filteredchar;

          

    return (
        <div className="wrapper">
            <ScrollToTop/>
        <Helmet>
          <title>{filtered[0].CharacterName} {typeloc(type)} - Dissidia Compendium</title>
          <meta property="og:site_name" content="Dissidia Compendium"/>
          <meta property="og:type" content="website" />
          <meta name="description" content={`Listing of ${typeloc(type)} for ${filtered[0].CharacterName}`}/>
          <meta name="twitter:title" content={`${filtered[0].CharacterName} ${typeloc(type)}`}/>
          <meta name="twitter:description" content={`Listing of ${typeloc(type)} for ${filtered[0].CharacterName}`}/>
          <meta name="twitter:image" content={filtered[0].CardURL}/>
          <meta name="twitter:card" content="summary"/>
          <meta name="twitter:image:alt" content={`${filtered[0].CharacterName}`}/>
          <meta property="og:title" content={`${filtered[0].CharacterName} ${typeloc(type)}`}/>
          <meta property="og:description" content={`Listing of ${typeloc(type)} for ${filtered[0].CharacterName}`}/>
          <meta property="og:image" content={filtered[0].CardURL}/>
          <meta property="og:url" content={`https://dissidiacompendium.com/characters/${filtered[0].ShortName}/abilities/${type}`}/>
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
                  nonext={true}
                  Subheader={typesub(type)}
                  headertitle={
                    <div className="facetop">
                        <ul className="CharListHolder">
                          <FaceMaker match={filtered[0]}/>
                        </ul>
                    </div>}
                    match={match}
                  newmatch={filtered[0]}
                  pageloc={typeloc(type)}
                  subcat={"abilities"}
                  brvattack={brvattack}
                  hpattacks={hpattacks}
                  s1attacks={s1attacks}
                  s2attacks={s2attacks}
                  aaattacks={aaattacks}
                  exattacks={exattacks}
                  ldattacks={ldattacks}
                  btattacks={btattacks}
                  call75attacks={call75attacks}
                  callldattacks={callldattacks}
                  frattacks={frattacks}
                  />
                <div className="singlepageholder">
                    {char.length > 0 ?  (
                    char.map(buffs => (
                    <AbilitiesFormatting 
                    key={buffs.AbilityKey}
                    match={buffs}
                    ProcessedBuffs={ProcessedBuffs}
                    jptoggledata={jptoggledata}
                    />
                    ))) : ""}
                </div>
            </div>
        </div>
        )
    }
}
export default AAAttackFormatting