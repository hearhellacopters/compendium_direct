import React, { useState, useEffect } from 'react';
import PassivesFormatting from '../../formatting/PassivesFormatting.js'
import ReworkFormatting from '../../formatting/ReworkPageFormatting.js'
import { useDispatch } from "react-redux";
import { setFalse, setTrue } from '../../redux/ducks/jptoggle'
import DefaultTippy from '../../formatting/TippyDefaults.js';
import { Helmet} from 'react-helmet-async';
import { Link, Navigate} from 'react-router-dom'
import ScrollToTop from '../../formatting/ScrollToTop.js'
import Random from '../../processing/Random.js'
import OhNo from '../OhNo.js'
import '../../characterpages/CharacterPage.css'
import FaceMaker from '../../formatting/CharFaceFormatting.js'
import CharcterHeader from '../CharacterHeader.js'
import { getQuery, getQueryStringVal, useQueryParam } from '../../processing/urlparams'
import { useStateIfMounted } from "use-state-if-mounted";

const PassivePageFormatting = ({match, ProcessedCharacters, ProcessedPassives, type, ProcessedBuffs, jptoggledata}) => {

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
    },[dispatch,jptoggledata,setJPSearch])

    function typehandler(type){
      if(type == "artifacts"){
        return "artpass" 
      }
      if(type == "board5echo"){
        return "board5echo"
      }
      if(type == "board5ext"){
        return "board5ext"
      }
      if(type == "board5"){
        return "board5"
      }
      if(type == "board4"){
        return "board4"
      }
      if(type == "board3"){
        return "board3"
      }
      if(type == "board2"){
        return "board2"
      }
      if(type == "board1"){
        return "board1"
      }
      if(type == "boardfr"){
        return "boardfr"
      }
      if(type == "ldext"){
        return 327
      }
      if(type == "ldcall"){
        return 326
      }
      if(type == "ldcallext"){
        return 325
      }
      if(type == "cl1"){
        return 101
      }
      if(type == "cl5"){
        return 105
      }
      if(type == "cl10"){
        return 110
      }
      if(type == "cl15"){
        return 115
      }
      if(type == "cl20"){
        return 120
      }
      if(type == "cl25"){
        return 125
      }
      if(type == "cl30"){
        return 130
      }
      if(type == "cl35"){
        return 135
      }
      if(type == "cl40"){
        return 140
      }
      if(type == "cl45"){
        return 145
      }
      if(type == "cl50"){
        return 150
      }
      if(type == "cl54"){
        return 154
      }
      if(type == "cl55"){
        return 155
      }
      if(type == "cl58"){
        return 158
      }
      if(type == "cl60"){
        return 160
      }
      if(type == "cl65"){
        return 165
      }
      if(type == "cl68"){
        return 168
      }
      if(type == "cl70"){
        return 170
      }
      if(type == "cl75"){
        return 175
      }
      if(type == "cl78"){
        return 178
      }
      if(type == "cl80"){
        return 180
      }
      if(type == "cl85"){
        return 185
      }
      if(type == "cl88"){
        return 188
      }
      if(type == "cl90"){
        return 190
      }
    }

    function lochandler(type){
      if(type == "reworks"){
        return "Upcoming Reworked Passives"
      }
      if(type == "artifacts"){
        return "Artifact Passives"
      }
      if(type == "board5echo"){
        return "FR Echo Passive"
      }
      if(type == "board5ext"){
        return "FR Extension Passive"
      }
      if(type == "board5"){
        return "FR Skill Board Passives"
      }
      if(type == "board4"){
        return "LD Skill Board Passives"
      }
      if(type == "board3"){
        return "EX Skill Board Passives"
      }
      if(type == "boardfr"){
        return "Force Enhancement"
      }
      if(type == "boardfr3"){
        return "Force Enhancement Lv 3"
      }
      if(type == "boardfr5"){
        return "Force Enhancement Lv 5"
      }
      if(type == "boardfr8"){
        return "Force Enhancement Lv 8"
      }
      if(type == "boardfr10"){
        return "Force Enhancement Lv 10"
      }
      if(type == "boardfr13"){
        return "Force Enhancement Lv 13"
      }
      if(type == "boardfr15"){
        return "Force Enhancement Lv 15"
      }
      if(type == "boardfr18"){
        return "Force Enhancement Lv 18"
      }
      if(type == "boardfr20"){
        return "Force Enhancement Lv 20"
      }
      if(type == "boardfr23"){
        return "Force Enhancement Lv 23"
      }
      if(type == "boardfr25"){
        return "Force Enhancement Lv 25"
      }
      if(type == "boardfr28"){
        return "Force Enhancement Lv 28"
      }
      if(type == "boardfr30"){
        return "Force Enhancement Lv 30"
      }
      if(type == "board2"){
        return "Skill 2 Board Passives"
      }
      if(type == "board1"){
        return "Skill 1 Board Passives"
      }
      if(type == "crystal"){
        return "Crystal Passives"
      }
      if(type == "ldext"){
        return "LD Extension Passive"
      }
      if(type == "ldcall"){
        return "LD Call Ability"
      }
      if(type == "ldcallext"){
        return "LD Call Extension Passive"
      }
      if(type == "cl1"){
        return "Starting Skill"
      }
      if(type == "cl5"){
        return "Crystal Level 5 Passive"
      }
      if(type == "cl10"){
        return "Crystal Level 10 Passive"
      }
      if(type == "cl15"){
        return "Crystal Level 15 Passive"
      }
      if(type == "cl20"){
        return "Crystal Level 20 Skill"
      }
      if(type == "cl25"){
        return "Crystal Level 25 Passive"
      }
      if(type == "cl30"){
        return "Crystal Level 30 Passive"
      }
      if(type == "cl35"){
        return "Crystal Level 35 Passive"
      }
      if(type == "cl40"){
        return "Crystal Level 40 Passive"
      }
      if(type == "cl45"){
        return "Crystal Level 45 Passive"
      }
      if(type == "cl50"){
        return "Crystal Level 50 Passive"
      }
      if(type == "cl54"){
        return "Crystal Level 54 Passive"
      }
      if(type == "cl55"){
        return "Crystal Level 55 Passive"
      }
      if(type == "cl58"){
        return "Crystal Level 58 Passive"
      }
      if(type == "cl60"){
        return "Crystal Level 60 Passive"
      }
      if(type == "cl65"){
        return "Crystal Level 65 Skill"
      }
      if(type == "cl68"){
        return "Crystal Level 68 Passive"
      }
      if(type == "cl70"){
        return "Crystal Level 70 Passive"
      }
      if(type == "cl75"){
        return "Crystal Level 75 Skill"
      }
      if(type == "cl78"){
        return "Crystal Level 78 Passive"
      }
      if(type == "cl80"){
        return "Crystal Level 80 Passive"
      }
      if(type == "cl85"){
        return "Crystal Level 85 Passive"
      }
      if(type == "cl88"){
        return "Crystal Level 88 Passive"
      }
      if(type == "cl90"){
        return "Crystal Level 90 Passive"
      }
    }

    useEffect(() => {
      setRandom(Random(7))
      }, [])

      var filteredchar = []


     if(type == "artifacts" || type == "board4" || type == "board3" || type == "board2" || type == "board1"){
       const filtered2 = ProcessedPassives.filter(function (el) { 
          return el["PassiveLoc"] === typehandler(type) ; 
        }) 
        filteredchar = filtered2
      }
        if(type == "crystal"){
          const filtered3 = ProcessedPassives.filter(function (el) { 
            return el["PassiveType"].includes("Crystal")
          }); 
          filteredchar = filtered3
        }
        if(type == "board5echo"){
          const filteredfr = ProcessedPassives.filter(function (el) { 
            return el["PassiveLoc"] == "board5echo"
              }); 
              filteredchar = filteredfr
            }
        if(type == "board5ext"){
          const filteredfr = ProcessedPassives.filter(function (el) { 
            return el["PassiveLoc"] == "board5ext"
              }); 
              filteredchar = filteredfr
            }
        if(type == "board5"){
          const filteredfr = ProcessedPassives.filter(function (el) { 
            return el["PassiveType"] == "board5"
              }); 
              filteredchar = filteredfr
            }
        if(type == "boardfr"){
          const filteredfr = ProcessedPassives.filter(function (el) { 
            return el["PassiveType"] == "boardfr"
          }); 
          filteredchar = filteredfr
        }
        if(type == "ldext"){
          const filteredfr = ProcessedPassives.filter(function (el) { 
            return el ["PassiveRank"] === 327 ; 
              }); 
              filteredchar = filteredfr
            }
        if(type == "ldcall"){
          const filteredfr = ProcessedPassives.filter(function (el) { 
            return el ["PassiveRank"] === 326 ; 
              }); 
              filteredchar = filteredfr
            }
        if(type == "ldcallext"){
        const filteredfr = ProcessedPassives.filter(function (el) { 
          return el ["PassiveRank"] === 325 ; 
            }); 
            filteredchar = filteredfr
          }
        if(type == "cl88"){
          const filteredfr = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] == 188
          }); 
          filteredchar = filteredfr
        }
        if(type == "cl85"){
          const filteredfr = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] == 185
          }); 
          filteredchar = filteredfr
        }
        if(type == "cl80"){
          const filteredfr = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] == 180
          }); 
          filteredchar = filteredfr
        }
        if(type == "cl75"){
          const filteredfr = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] == 175
          }); 
          filteredchar = filteredfr
        }
        if(type == "cl70"){
          const filteredfr = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] == 170
          }); 
          filteredchar = filteredfr
        }
        if(type == "cl65"){
          const filteredfr = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] == 165
          }); 
          filteredchar = filteredfr
        }
        if(type == "cl60"){
          const filteredfr = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] == 160
          }); 
          filteredchar = filteredfr
        }
        if(type == "cl55"){
          const filteredfr = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] == 155
          }); 
          filteredchar = filteredfr
        }
        if(type == "cl50"){
          const filteredfr = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] == 150
          }); 
          filteredchar = filteredfr
        }
        if(type == "cl20"){
          const filteredfr = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] == 120
          }); 
          filteredchar = filteredfr
        }
        if(type == "cl1"){
          const filteredfr = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] == 101
          }); 
          filteredchar = filteredfr
        }
        if(type == undefined){
        const filtered4 = ProcessedPassives.filter(function (el) { 
          return el["PassiveRank"] === typehandler(type) ; 
          })
          filteredchar = filtered4
        }

      if(filteredchar.length === 0) {
        return(
            <Navigate replace to="/404"/>
        )
    
    } else {

          const artifacts = ProcessedPassives.filter(function (el) { 
            return  el["PassiveLoc"] === "artpass" ; 
          }); 
          const board1 = ProcessedPassives.filter(function (el) { 
            return el["PassiveLoc"] === "board1" ; 
          }); 
          const board2 = ProcessedPassives.filter(function (el) { 
            return el["PassiveLoc"] === "board2" ; 
          }); 
          const board3 = ProcessedPassives.filter(function (el) { 
            return el["PassiveLoc"] === "board3" ; 
          }); 
          const board4 = ProcessedPassives.filter(function (el) { 
            return el["PassiveLoc"] === "board4" ; 
          }); 
          const board5 = ProcessedPassives.filter(function (el) { 
            return el["PassiveType"] === "board5" ; 
          }); 
          const frext = ProcessedPassives.filter(function (el) { 
            return el["PassiveLoc"] === "board5ext" ; 
          });   
          const frecho = ProcessedPassives.filter(function (el) { 
            return el["PassiveLoc"] === "board5echo" ; 
          });   
          const boardfr = ProcessedPassives.filter(function (el) { 
            return el["PassiveType"] === "boardfr" ; 
          }); 
          const crystal = ProcessedPassives.filter(function (el) { 
            return el["PassiveType"].includes("Crystal")
          });     
          const ldext = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] === 327 ; 
          });      
          const ldcall = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] === 326 ; 
          });  
          const ldcallext = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] === 325 ; 
          });
          const cl90 = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] === 190 ; 
          }); 
          const cl88 = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] === 188 ; 
          }); 
          const cl85 = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] === 185 ; 
          }); 
          const cl80 = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] === 180 ; 
          }); 
          const cl78 = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] === 178 ; 
          }); 
          const cl75 = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] === 175 ; 
          }); 
          const cl70 = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] === 170 ; 
          }); 
          const cl68 = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] === 168 ; 
          }); 
          const cl65 = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] === 165 ; 
          }); 
          const cl60 = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] === 160 ; 
          }); 
          const cl58 = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] === 158 ; 
          }); 
          const cl55 = ProcessedPassives.filter(function (el) { 
            return  el["PassiveRank"] === 155 ; 
          }); 
          const cl54 = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] === 154 ; 
          }); 
          const cl50 = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] === 150 ; 
          }); 
          const cl45 = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] === 145 ; 
          }); 
          const cl40 = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] === 140 ; 
          }); 
          const cl35 = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] === 135 ; 
          }); 
          const cl30 = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] === 130 ; 
          }); 
          const cl25 = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] === 125 ; 
          }); 
          const cl20 = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] === 120 ; 
          }); 
          const cl15 = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] === 115 ; 
          }); 
          const cl10 = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] === 110 ; 
          }); 
          const cl5 = ProcessedPassives.filter(function (el) { 
            return el["PassiveRank"] === 105 ; 
          }); 
          const cl1 = ProcessedPassives.filter(function (el) { 
            return  el["PassiveRank"] === 101 ; 
          }); 

          const filtered = ProcessedCharacters && ProcessedCharacters.filter(function (el) { 
            return el["ShortName"] == match.params.id ; 
          }); 

          const char = filteredchar;

    return (
        <div className="wrapper">
            <ScrollToTop/>
        <Helmet>
          <title>{filtered[0].CharacterName} {lochandler(type)} - Dissidia Compendium</title>
          <meta property="og:site_name" content="Dissidia Compendium"/>
          <meta property="og:type" content="website" />
          <meta name="description" content={`${lochandler(type)} for ${filtered[0].CharacterName}`}/>
          <meta name="twitter:title" content={`${filtered[0].CharacterName} {lochandler(type)}`}/>
          <meta name="twitter:description" content={`${lochandler(type)} for ${filtered[0].CharacterName}`}/>
          <meta name="twitter:image" content={filtered[0].CardURL}/>
          <meta name="twitter:card" content="summary"/>
          <meta name="twitter:image:alt" content={`${filtered[0].CharacterName}`}/>
          <meta property="og:title" content={`${filtered[0].CharacterName} {lochandler(type)}`}/>
          <meta property="og:description" content={`${lochandler(type)} for ${filtered[0].CharacterName}`}/>
          <meta property="og:image" content={filtered[0].CardURL}/>
          <meta property="og:url" content={`https://dissidiacompendium.com/characters/${filtered[0].ShortName}/passives/${type}`}/>
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
                  Subheader={
                    <div className="pagecrystalholder">
                      {type != "artifacts" && type != "board1" && type != "board12" && type != "board3" && type != "board4" && type != "ldext" && type != "ldcall" && type != "ldcallext" && type != "boardfr"?
                      <img alt={filtered[0].CrystalColor} className="crystalpage" src={filtered[0].CrystalColorURL == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_icon.png" : "https://dissidiacompendium.com/images/static/icons/crystalcolors/" + filtered[0].CrystalColorURL}/>:""}
                      <span>{lochandler(type)}</span>
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
                  pageloc={lochandler(type)}
                  subcat={"passives"}
                  frecho={frecho}
                  frext={frext}
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
                  />
                <div className="singlepageholder">
                  {type == "artifacts" ? 
                  filtered[0].ArtPriority1 == undefined ? "" :
                    <div className="">
                      <div className="singlesubbanner">{filtered[0].CharacterName}{"'s Artifact Priority"}</div>
                  <div className="filterholderflair somepadding">
                    <div className={"orangetext "}>
                    {filtered[0].ArtPriority1}
                    </div>
                    <div className={"orangetext "}>
                    {filtered[0].ArtPriority2}
                    </div>
                    <div className={"orangetext "}>
                    {filtered[0].ArtPriority3}
                    </div>
                    </div>
                  </div> : ""}
                    {char.length > 0 ?  (
                    char.map(passives => (
                    <PassivesFormatting 
                    key={passives.PassiveKey}
                    match={passives}
                    ProcessedBuffs={ProcessedBuffs}
                    jptoggledata={jptoggledata}
                    />
                    ))) : 
                    <OhNo random={random} name={filtered[0].CharacterName}/>
                    }
                </div>
            </div>
        </div>
        )
    }
}
export default PassivePageFormatting