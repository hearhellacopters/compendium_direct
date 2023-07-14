import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Random from '../../processing/random.js'
import OhNo from '../../components/OhNo.js'
import './CharacterPage.css'
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/scale-subtle.css';
import 'tippy.js/animations/scale-extreme.css';
import TickUp from '../../components/tickUp.js'
import { StartsInTimer } from '../../components/Timers.js'
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import CharacterAbilityDifHandler from '../Abilities/AbilityDifHandler.js';
import AilmentDifHandler from '../Buffs/AilmentDifHandler.js';
import PassiveAbilityDifHandler from '../Passives/PassiveAbilityDifHandler.js';
import EquipmentPassiveDifHandler from '../Gear/EquipmentPassiveDifHandler.js';
import ReplacerCharacter from '../ReplacerCharacter.js';
import '../../Passives.css';

export default function CharacterPageReworks({
  match,
  ProcessedReworks,
  selected_chara,
  master_index,
  ProcessedCharacters,
  jptoggledata
}){

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
                {ReplacerCharacter(`<${passives.PassiveRank}> Passives`)}
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
                      <div className={`Buffbanner iconbuffer infonameholder nobuffpadding `}>
                        <div className="displayfex">
                          <div className="spacearound infotitle">
                          {ReplacerCharacter(`<${passives.PassiveRank}> ${rework.title}`)}
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
                            <EquipmentPassiveDifHandler
                              key={i}
                              passive_data={reworker}
                              master_index={master_index}
                              ProcessedCharacters={ProcessedCharacters}
                            />
                          )
                        }
                        if(reworker.pass == true){
                          return(
                            <PassiveAbilityDifHandler
                              key={i}
                              passive_data={reworker}
                              master_index={master_index}
                            />
                          )
                        }
                          if(reworker.cmd == true){
                            return(
                              <CharacterAbilityDifHandler
                                key={i}
                                ability_data={reworker}
                                master_index={master_index}
                                ProcessedCharacters={ProcessedCharacters}
                              />
                            )
                          }
                          if(reworker.ailment == true){
                            return(
                              <AilmentDifHandler
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