import React, { useState, useEffect } from 'react';
import AbilitiesFormatting from '../formatting/AbilitiesFormatting.js'
import DefaultTippy from '../formatting/TippyDefaults.js';
import { useDispatch } from "react-redux";
import { setFalse, setTrue } from '../redux/ducks/jptoggle'
import { Helmet} from 'react-helmet-async';
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


const AbilitiesPageFormatting = ({match, ProcessedAbilities, ProcessedCharacters, ProcessedBuffs, jptoggledata}) => {

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

    const [random, setRandom] = useState(1);

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

        const filteredchar = ProcessedAbilities.filter(function (el) { 
            return el["CharID"] == filtered[0].CharID ; 
          }); 

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
          <title>{filtered[0].CharacterName} Abilities - Dissidia Compendium</title>
          <meta property="og:site_name" content="Dissidia Compendium"/>
          <meta property="og:type" content="website" />
          <meta name="description" content={`Listing of all abilities for ${filtered[0].CharacterName}`}/>
          <meta name="twitter:title" content={`${filtered[0].CharacterName} Abilities`}/>
          <meta name="twitter:description" content={`Listing of all abilities for ${filtered[0].CharacterName}`}/>
          <meta name="twitter:image" content={`https://dissidiacompendium.com/images/static/characters/${filtered[0].CharacterURLName}/cc.png`}/>
          <meta name="twitter:card" content="summary"/>
          <meta name="twitter:image:alt" content={`${filtered[0].CharacterName}`}/>
          <meta property="og:title" content={`${filtered[0].CharacterName} Abilities`}/>
          <meta property="og:description" content={`Listing of all abilities for ${filtered[0].CharacterName}`}/>
          <meta property="og:image" content={`https://dissidiacompendium.com/images/static/characters/${filtered[0].CharacterURLName}/cc.png`}/>
          <meta property="og:url" content={`https://dissidiacompendium.com/characters/${filtered[0].ShortName}/abilities`}/>
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
                  Subheader={"Abilities"}
                  headertitle={
                    <div className="facetop">
                        <ul className="CharListHolder">
                          <FaceMaker match={filtered[0]}/>
                        </ul>
                    </div>}
                  match={match}
                  newmatch={filtered[0]}
                  pageloc={"abilities"}
                  subcat={"abilities"}
                  brvattack={brvattack}
                  hpattacks={hpattacks}
                  s1attacks={s1attacks}
                  s2attacks={s2attacks}
                  aaattacks={aaattacks}
                  exattacks={exattacks}
                  ldattacks={ldattacks}
                  btattacks={btattacks}
                  frattacks={frattacks}
                  call75attacks={call75attacks}
                  callldattacks={callldattacks}
                  />
                <div className="singlepageholder">
                    {
                    //char.length > 0 ? "" : (
                      //<OhNo random={random} name={filtered[0].CharacterName}/>
                    //)
                    }
                    {brvattack.length > 0 ?
                    <div>
                    <div className="abilitygreysinglebutton margtop"><span className="brvattackicon undertaga"></span> Attacks</div>
                      {brvattack.map(ability =>(
                        <AbilitiesFormatting 
                        key={ability.AbilityKey}
                        match={ability}
                        ProcessedBuffs={ProcessedBuffs}
                        jptoggledata={jptoggledata}
                        />
                      ))}
                      </div>: ""}
                      {hpattacks.length > 0 ?
                    <div>
                    <div className="abilitygreysinglebutton margtop"><span className="hpattackicon undertaga"></span> Attacks</div>
                      {hpattacks.map(ability =>(
                        <AbilitiesFormatting 
                        key={ability.AbilityKey}
                        match={ability}
                        ProcessedBuffs={ProcessedBuffs}
                        jptoggledata={jptoggledata}
                        />
                      ))}
                      </div>: ""}
                      {s1attacks.length > 0 ?
                    <div>
                    <div className="abilitygreysinglebutton margtop"><span className="cl1 undertaga"></span> Attacks</div>
                      {s1attacks.map(ability =>(
                        <AbilitiesFormatting 
                        key={ability.AbilityKey}
                        match={ability}
                        ProcessedBuffs={ProcessedBuffs}
                        jptoggledata={jptoggledata}
                        />
                      ))}
                      </div>: ""}
                      {s2attacks.length > 0 ?
                    <div>
                    <div className="abilitygreysinglebutton margtop"><span className="cl20 undertaga"></span> Attacks</div>
                      {s2attacks.map(ability =>(
                        <AbilitiesFormatting 
                        key={ability.AbilityKey}
                        match={ability}
                        ProcessedBuffs={ProcessedBuffs}
                        jptoggledata={jptoggledata}
                        />
                      ))}
                      </div>: ""}
                      {aaattacks.length > 0 ?
                    <div>
                    <div className="abilitygreysinglebutton margtop"><span className="aaabilityButton undertaga"></span> Attacks</div>
                      {aaattacks.map(ability =>(
                        <AbilitiesFormatting 
                        key={ability.AbilityKey}
                        match={ability}
                        ProcessedBuffs={ProcessedBuffs}
                        jptoggledata={jptoggledata}
                        />
                      ))}
                      </div>: ""}
                      {exattacks.length > 0 ?
                    <div>
                    <div className="abilitygreysinglebutton margtop"><span className="wpex undertaga"></span> Attacks</div>
                      {exattacks.map(ability =>(
                        <AbilitiesFormatting 
                        key={ability.AbilityKey}
                        match={ability}
                        ProcessedBuffs={ProcessedBuffs}
                        jptoggledata={jptoggledata}
                        />
                      ))}
                      </div>: ""}
                      {ldattacks.length > 0 ?
                    <div>
                    <div className="abilitygreysinglebutton margtop"><span className="wpld undertaga"></span> Attacks</div>
                      {ldattacks.map(ability =>(
                        <AbilitiesFormatting 
                        key={ability.AbilityKey}
                        match={ability}
                        ProcessedBuffs={ProcessedBuffs}
                        jptoggledata={jptoggledata}
                        />
                      ))}
                      </div>: ""}
                      {btattacks.length > 0 ?
                    <div>
                    <div className="abilitygreysinglebutton margtop"><span className="wpbt undertaga"></span> Attacks</div>
                      {btattacks.map(ability =>(
                        <AbilitiesFormatting 
                        key={ability.AbilityKey}
                        match={ability}
                        ProcessedBuffs={ProcessedBuffs}
                        jptoggledata={jptoggledata}
                        />
                      ))}
                      </div>: ""}
                      {frattacks.length > 0 ?
                    <div>
                    <div className="abilitygreysinglebutton margtop"><span className="wpfr undertaga"></span> Attacks</div>
                      {frattacks.map(ability =>(
                        <AbilitiesFormatting 
                        key={ability.AbilityKey}
                        match={ability}
                        ProcessedBuffs={ProcessedBuffs}
                        jptoggledata={jptoggledata}
                        />
                      ))}
                      </div>: ""}
                      {call75attacks.length > 0 ?
                    <div>
                    <div className="abilitygreysinglebutton margtop"><span className="call1 undertaga"></span> Attacks</div>
                      {call75attacks.map(ability =>(
                        <AbilitiesFormatting 
                        key={ability.AbilityKey}
                        match={ability}
                        ProcessedBuffs={ProcessedBuffs}
                        jptoggledata={jptoggledata}
                        />
                      ))}
                      </div>: ""}
                      {callldattacks.length > 0 ?
                    <div>
                    <div className="abilitygreysinglebutton margtop"><span className="call2 undertaga"></span> Attacks</div>
                      {callldattacks.map(ability =>(
                        <AbilitiesFormatting 
                        key={ability.AbilityKey}
                        match={ability}
                        ProcessedBuffs={ProcessedBuffs}
                        jptoggledata={jptoggledata}
                        />
                      ))}
                      </div>: ""}
                </div>
            </div>
        </div>
        )
    }
}
export default AbilitiesPageFormatting