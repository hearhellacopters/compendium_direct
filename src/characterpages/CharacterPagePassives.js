import React, { useState, useEffect } from 'react';
import PassivesFormatting from '../formatting/PassivesFormatting.js'
import { useDispatch } from "react-redux";
import { setFalse, setTrue } from '../redux/ducks/jptoggle'
import DefaultTippy from '../formatting/TippyDefaults.js';
import { Helmet} from 'react-helmet-async';
import { Link, Navigate} from 'react-router-dom'
import ScrollToTop from '../formatting/ScrollToTop.js'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import OhNo from '../characterpages/OhNo.js'
import Random from '../processing/Random.js'
import '../characterpages/CharacterPage.css'
import FaceMaker from '../formatting/CharFaceFormatting.js'
import CharcterHeader from './CharacterHeader.js'
import { getQuery, getQueryStringVal, useQueryParam } from '../processing/urlparams'


const PassivePageFormatting = ({match, ProcessedPassives, ProcessedCharacters, ProcessedBuffs, jptoggledata}) => {

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

    const [random, setRandom] =useState(1);

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

        const filteredchar = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID ; 
          }); 

          const reworks = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveGLFlag"] === true ; 
          }); 
          const artifacts = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveLoc"] === "artpass" ; 
          }); 
          const board1 = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveLoc"] === "board1" ; 
          }); 
          const board2 = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveLoc"] === "board2" ; 
          }); 
          const board3 = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveLoc"] === "board3" ; 
          }); 
          const board4 = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveLoc"] === "board4" ; 
          }); 
          const board5 = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveType"] === "board5" ; 
          }); 
          const frext = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveLoc"] === "board5ext" ; 
          }); 
          const frecho = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveLoc"] === "board5echo" ; 
          }); 
          const boardfr = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveType"] === "boardfr" ; 
          }); 
          const crystal = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveType"].includes("Crystal")
          });   
          const ldext = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveRank"] === 327 ; 
          });      
          const ldcall = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveRank"] === 326 ; 
          });  
          const ldcallext = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveRank"] === 325 ; 
          });
          const cl90 = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveRank"] === 190 ; 
          }); 
          const cl88 = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveRank"] === 188 ; 
          }); 
          const cl85 = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveRank"] === 185 ; 
          }); 
          const cl80 = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveRank"] === 180 ; 
          }); 
          const cl78 = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveRank"] === 178 ; 
          }); 
          const cl75 = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveRank"] === 175 ; 
          }); 
          const cl70 = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveRank"] === 170 ; 
          }); 
          const cl68 = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveRank"] === 168 ; 
          }); 
          const cl65 = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveRank"] === 165 ; 
          }); 
          const cl60 = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveRank"] === 160 ; 
          }); 
          const cl58 = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveRank"] === 158 ; 
          }); 
          const cl55 = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveRank"] === 155 ; 
          }); 
          const cl54 = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveRank"] === 154 ; 
          }); 
          const cl50 = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveRank"] === 150 ; 
          }); 
          const cl45 = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveRank"] === 145 ; 
          }); 
          const cl40 = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveRank"] === 140 ; 
          }); 
          const cl35 = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveRank"] === 135 ; 
          }); 
          const cl30 = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveRank"] === 130 ; 
          }); 
          const cl25 = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveRank"] === 125 ; 
          }); 
          const cl20 = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveRank"] === 120 ; 
          }); 
          const cl15 = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveRank"] === 115 ; 
          }); 
          const cl10 = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveRank"] === 110 ; 
          }); 
          const cl5 = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveRank"] === 105 ; 
          }); 
          const cl1 = ProcessedPassives.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID && el["PassiveRank"] === 101 ; 
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
          <title>{filtered[0].CharacterName} Passives - Dissidia Compendium</title>
          <meta property="og:site_name" content="Dissidia Compendium"/>
          <meta property="og:type" content="website" />
          <meta name="description" content={`Listing of all passives for ${filtered[0].CharacterName}`}/>
          <meta name="twitter:title" content={`${filtered[0].CharacterName} Passives`}/>
          <meta name="twitter:description" content={`Listing of all passives for ${filtered[0].CharacterName}`}/>
          <meta name="twitter:image" content={`https://dissidiacompendium.com/images/static/characters/${filtered[0].CharacterURLName}/cc.png`}/>
          <meta name="twitter:card" content="summary"/>
          <meta name="twitter:image:alt" content={`${filtered[0].CharacterName}`}/>
          <meta property="og:title" content={`${filtered[0].CharacterName} Passives`}/>
          <meta property="og:description" content={`Listing of all passives for ${filtered[0].CharacterName}`}/>
          <meta property="og:image" content={`https://dissidiacompendium.com/images/static/characters/${filtered[0].CharacterURLName}/cc.png`}/>
          <meta property="og:url" content={`https://dissidiacompendium.com/characters/${filtered[0].ShortName}/passives`}/>
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
                  Subheader={
                    <div className="pagecrystalholder">
                      <LazyLoadImage effect="opacity" alt={filtered[0].CrystalColor} className="crystalpage" src={filtered[0].CrystalColorURL == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_icon.png" : "https://dissidiacompendium.com/images/static/icons/crystalcolors/" + filtered[0].CrystalColorURL}/>
                      <span>Passives</span>
                    </div>
                  }
                  headertitle={
                    <div className="facetop">
                        <ul className="CharListHolder">
                          <FaceMaker match={filtered[0]}/>
                        </ul>
                    </div>}
                    match={match}
                  newmatch={filtered[0]}
                  pageloc={"passives"}
                  subcat={"passives"}
                  frext={frext}
                  frecho={frecho}
                  board5={board5}
                  board4={board4}
                  board3={board3}
                  board2={board2}
                  board1={board1}
                  boardfr={boardfr}
                  crystal={crystal}
                  ldext={ldext}
                  ldcall={ldcall}
                  ldcallext={ldcallext}
                  cl90={cl90}
                  cl88={cl88}
                  cl85={cl85}
                  cl80={cl80}
                  cl78={cl78}
                  cl75={cl75}
                  cl70={cl70}
                  cl68={cl68}
                  cl65={cl65}
                  cl60={cl60}
                  cl58={cl58}
                  cl55={cl55}
                  cl54={cl54}
                  cl50={cl50}
                  cl45={cl45}
                  cl40={cl40}
                  cl35={cl35}
                  cl30={cl30}
                  cl25={cl25}
                  cl20={cl20}
                  cl15={cl15}
                  cl10={cl10}
                  cl5={cl5}
                  cl1={cl1}
                  artifacts={artifacts}
                  reworks={reworks}
                  />
                <div className="singlepageholder">
                    {char.length > 0 ?  (
                    char.map(passives => (
                    <PassivesFormatting 
                    key={passives.PassiveKey}
                    match={passives}
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
export default PassivePageFormatting