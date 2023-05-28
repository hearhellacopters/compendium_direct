import React, { useState, useEffect } from 'react';
import DefaultTippy from '../formatting/TippyDefaults.js';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate } from 'react-router-dom'
import Random from '../processing/Random.js'
import OhNo from './OhNo.js'
import '../characterpages/CharacterPage.css'
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/scale-subtle.css';
import 'tippy.js/animations/scale-extreme.css';
import TickUp from '../processing/tickUp'
const Diff = require('diff');
import { EndsInTimer, StartsInTimer } from '../formatting/Timers'
import addformatting from '../processing/replacer_abilitycontent';
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import Character_Ability_Dif_Handler from './direct/formatting/command_ability/Character_Ability_Dif_Handler.js';
import Ailment_Character_Dif_Handler from './direct/formatting/Ailment_Character_Dif_Handler.js';
import Passive_Ability_Dif_Handler from './direct/formatting/passives/Passive_Ability_Dif_Handler.js';
import Equipment_Passive_Dif_Handler from './direct/formatting/passives/Equipment_Passive_Dif_Handler.js';
import '../Passives.css';

const CharacterPageReworks = ({
  match,
  ProcessedReworks,
  selected_chara,
  master_index,
  ProcessedCharacters,
  jptoggledata
}) => {

  const [reworks, setreworks] = useState(ProcessedReworks);

  const [random] = useState(Random(7));

  const filtered = selected_chara

  const monthstext = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const handledate = (date) => {
    return <div className="tickholder greencolor">
      <div className="glshadow"><span className='emoji'>🌎</span></div>
      <div className="spacerleft">
        <TickUp value={monthstext[new Date(date).getMonth()]} />
      </div>

      <div className="spacerleft">
        <TickUp value={new Date(date).getFullYear()} />
      </div>
    </div>
  }

  return (
    <div className="singlepageholder">
      {reworks.length == 0 ?
        <OhNo
          name={filtered.CharacterName}
          random={random}
          message={"for active reworks"}
        /> :
        reworks.map((passives, i) => {
          return (
            <div key={i}>
              <div className="abilitygreysinglebutton margtop">
                <span className={`${passives.PassiveRank} undertaga`}></span> Passives
              </div>
              <LazyLoadComponent>
                <div className="buffunit">
                  <div className="infoholder" style={{ minHeight: "160px" }}>
                    <div className="infotitleholder">
                      <div className="faceandiconholder">
                        <div className='faceholderpassives'>
                          <LazyLoadImage effect="opacity" alt={selected_chara.CharacterName} className={`faceicon`} src={selected_chara.CharacterName == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_face.png" : `https://dissidiacompendium.com/images/static/characters/${selected_chara.CharacterName.replace(/ /g, "").replace(/,/g, "").replace(/'/g, "").replace(/&/g, "")}/face.png`} />
                          <div className="facetext">
                            {selected_chara.CharacterName == "Cloud of Darkness" ? "CoD" : selected_chara.CharacterName == "Warrior of Light" ? "WoL" : selected_chara.CharacterName}
                          </div>
                        </div>
                      </div>
                    </div>
                    {passives && passives.reworks.map((rework, i)=>(
                      <div key={i}>
                      <div className={`Buffbanner  iconbuffer infonameholder nobuffpadding `}>
                        <div className="displayfex">
                          <div className="spacearound">
                          <span className={passives.PassiveRank} />{" "}{rework.title}
                          </div>
                        </div>
                        {rework.bannerindex == undefined ? "" :
                          <div className="similarbanner">
                            {rework.bannerindex.tempdate == true ?
                              <div>
                                <Link className="linktopage" to={`/events/banners/${rework.bannerindex.bannerindex}`}>
                                  {rework.bannerindex.name}<br />
                                </Link>
                                {handledate(rework.bannerindex.indate)}
                              </div>
                              :
                              <div>
                                <Link className="linktopage" to={`/events/banners/${rework.bannerindex.bannerindex}`}>
                                  {rework.bannerindex.name}<br />
                                </Link>
                                <StartsInTimer expiryTimestamp={new Date(rework.bannerindex.indate)} />
                              </div>
                            }
                          </div>
                        }
                      </div>
                      {rework && rework.reworks.map((reworker, i)=>{
                        if(reworker.equ_pass == true){
                          return(
                            <Equipment_Passive_Dif_Handler
                              key={i}
                              passive_data={reworker}
                              master_index={master_index}
                              ProcessedCharacters={ProcessedCharacters}
                            />
                          )
                        }
                        if(reworker.pass == true){
                          return(
                            <Passive_Ability_Dif_Handler
                              key={i}
                              passive_data={reworker}
                              master_index={master_index}
                              ProcessedCharacters={ProcessedCharacters}
                            />
                          )
                        }
                          if(reworker.cmd == true){
                            return(
                              <Character_Ability_Dif_Handler
                                key={i}
                                ability_data={reworker}
                                master_index={master_index}
                                ProcessedCharacters={ProcessedCharacters}
                              />
                            )
                          }
                          if(reworker.ailment == true){
                            return(
                              <Ailment_Character_Dif_Handler
                              key={i}
                              buff_data={reworker}
                              master_index={master_index}
                              ProcessedCharacters={ProcessedCharacters}
                              />
                            )
                          }
                      })}
                      </div>
                    ))
                    }
                  </div>
                </div>
              </LazyLoadComponent>
            </div>
          )
        })}
    </div>
  )

}
export default CharacterPageReworks