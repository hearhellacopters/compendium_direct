import React, { useState, useEffect } from 'react';
import DefaultTippy from '../formatting/TippyDefaults.js';
import { Helmet} from 'react-helmet-async';
import { Link, Navigate} from 'react-router-dom'
import Random from '../processing/Random.js'
import OhNo from './OhNo.js'
import '../characterpages/CharacterPage.css'
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/scale-subtle.css';
import 'tippy.js/animations/scale-extreme.css';
import TickUp from '../processing/tickUp'
const Diff = require('diff');
import {EndsInTimer, StartsInTimer} from '../formatting/Timers'
import addformatting from '../processing/replacer_abilitycontent';
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import '../Passives.css';

const ReworksPageFormatting = ({match, ProcessedReworks, selected_chara, ProcessedCharacters,jptoggledata}) => {

    const [reworks, setreworks] = useState(ProcessedReworks);

    const [random ] = useState(Random(7));

    const filtered = selected_chara

    const monthstext = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const handledate = (date) =>{
      return <div className="tickholder greencolor">
                <div className="glshadow"><span className='emoji'>🌎</span></div>
                <div className="spacerleft">
                    <TickUp value={monthstext[new Date(date).getMonth()]}/>
                </div>

                <div className="spacerleft">
                    <TickUp value={new Date(date).getFullYear()}/>
                </div>
            </div>
    }

    const makediff = (oldText,newText) =>{
      const JPDESCREPLACE = Diff.diffTrimmedLines(oldText + "\n", newText + "\n", {newlineIsToken: false})
      const output = JPDESCREPLACE.map(text => `${text.added == true ? '~~' + text.value + '~.~': ""}${text.removed == true ? '^^' + text.value  + '^.^': ""}${text.removed == undefined && text.added == undefined ? text.value :""}`).join("")
      return (
          output
      )
  }

  return (
        <div className="singlepageholder">
          {reworks.length == 0 ? 
            <OhNo 
            name={filtered.CharacterName} 
            random={random}
            message={"for active reworks"}
            /> :
          reworks.map((passives,i) => (
            <div  key={i}>
            <div className="abilitygreysinglebutton margtop">
              <span className={`${passives.PassiveRank} undertaga`}></span> Passives
              </div>
              <LazyLoadComponent>
              <div className="buffunit">
                <div className="infoholder" style={{ minHeight: "160px"}}>
                <div className="infotitleholder">
                  <div className="faceandiconholder">
                    <div className='faceholderpassives'>
                      <LazyLoadImage effect="opacity" alt={selected_chara.CharacterName} className={`faceicon`} src={selected_chara.CharacterName == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_face.png" : `https://dissidiacompendium.com/images/static/characters/${selected_chara.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"")}/face.png`}/>
                      <div className="facetext">
                        {selected_chara.CharacterName == "Cloud of Darkness" ? "CoD" : selected_chara.CharacterName == "Warrior of Light" ? "WoL" : selected_chara.CharacterName}
                        </div>
                      </div>
                  </div>
                </div>
                <div className={`Buffbanner  iconbuffer infonameholder nobuffpadding `}>
                <div className="displayfex">
                <div className="spacearound">
                <span className={`${passives.PassiveRank} automarg`}/>{passives.PassiveName1}
                </div>
                </div>
                  {passives.bannerindex1 == undefined ? "" :
                    <div className="similarbanner">
                        {passives.bannerindex1.tempdate == true ?
                        <div>
                            <Link className="linktopage" to={`/events/banners/${passives.bannerindex1.bannerindex}`}>
                                {passives.bannerindex1.name}<br/>
                        </Link>
                            {handledate(passives.bannerindex1.indate)}
                        </div>
                        :
                        <div> 
                            <Link className="linktopage" to={`/events/banners/${passives.bannerindex1.bannerindex}`}>
                                {passives.bannerindex1.name}<br/>
                        </Link>
                            <StartsInTimer expiryTimestamp={new Date(passives.bannerindex1.indate)}/>
                            </div>
                        }
                    </div>
                    }
                </div>
                <div className={`bluebase  infobase nobuffpadding`}>
                {passives.PassiveDesc1GL == undefined ? "" : addformatting(makediff(passives.PassiveDesc1GL,passives.PassiveDesc1))}
                </div>
                {passives.PassiveCount == 4?
                  <div className={`bluebase  infobase nobuffpadding`}>
                {passives.PassiveDesc2GL == undefined ? "" : addformatting(makediff(passives.PassiveDesc2GL,passives.PassiveDesc2))}
                </div>
                :""}
                 {passives.PassiveCount == 4?
                  <div className={`bluebase  infobase nobuffpadding`}>
                {passives.PassiveDesc3GL == undefined ? "" : addformatting(makediff(passives.PassiveDesc3GL,passives.PassiveDesc3))}
                </div>
                :""}
                {passives.PassiveCount == 4?
                  <div className={`bluebase  infobase nobuffpadding`}>
                {passives.PassiveDesc4GL == undefined ? "" : addformatting(makediff(passives.PassiveDesc4GL,passives.PassiveDesc4))}
                </div>
                :""}
              </div>
              </div>


              {passives.bannerindex2 != undefined ?
              <div className="buffunit">
              <div className="infoholder" style={{ minHeight: "160px"}}>
              <div className="infotitleholder">
                <div className="faceandiconholder">
                    <LazyLoadImage effect="opacity" alt={selected_chara.CharacterName} className={`faceicon`} src={selected_chara.CharacterName == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_face.png" : `https://dissidiacompendium.com/images/static/characters/${selected_chara.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"")}/face.png`}/>
                    <div className="facetext">
                      {selected_chara.CharacterName == "Cloud of Darkness" ? "CoD" : selected_chara.CharacterName == "Warrior of Light" ? "WoL" : selected_chara.CharacterName}
                      </div>
                </div>
              </div>
              <div className={`Buffbanner  iconbuffer infonameholder nobuffpadding `}>
              <div className="displayfex">
              <div className="spacearound">
              <span className={`${passives.PassiveRank} automarg`}/>{passives.PassiveName1}
              </div>
              </div>
                {passives.bannerindex2 == undefined ? "" :
                  <div className="similarbanner">
                      {passives.bannerindex2.tempdate == true ?
                      <div>
                          <Link className="linktopage" to={`/events/banners/${passives.bannerindex2.bannerindex}`}>
                              {passives.bannerindex2.name}<br/>
                      </Link>
                          {handledate(passives.bannerindex2.indate)}
                      </div>
                      :
                      <div> 
                          <Link className="linktopage" to={`/events/banners/${passives.bannerindex2.bannerindex}`}>
                              {passives.bannerindex2.name}<br/>
                      </Link>
                          <StartsInTimer expiryTimestamp={new Date(passives.bannerindex2.indate)}/>
                          </div>
                      }
                  </div>
                  }
              </div>
              <div className={`bluebase  infobase nobuffpadding`}>
              {passives.PassiveDesc1_2 == undefined ? "" : addformatting(makediff(passives.PassiveDesc1_2,passives.PassiveDesc1GL))}
              </div>
              {passives.PassiveCount == 4?
                <div className={`bluebase  infobase nobuffpadding`}>
              {passives.PassiveDesc2_2 == undefined ? "" : addformatting(makediff(passives.PassiveDesc2_2,passives.PassiveDesc2GL))}
              </div>
              :""}
               {passives.PassiveCount == 4?
                <div className={`bluebase  infobase nobuffpadding`}>
              {passives.PassiveDesc3_2 == undefined ? "" : addformatting(makediff(passives.PassiveDesc3_2,passives.PassiveDesc3GL))}
              </div>
              :""}
              {passives.PassiveCount == 4?
                <div className={`bluebase  infobase nobuffpadding`}>
              {passives.PassiveDesc4_2 == undefined ? "" : addformatting(makediff(passives.PassiveDesc4_2,passives.PassiveDesc4GL))}
              </div>
              :""}
            </div>
            </div>
              :""}

              {passives.bannerindex3 != undefined ?
              <div className="buffunit">
              <div className="infoholder" style={{ minHeight: "160px"}}>
              <div className="infotitleholder">
                <div className="faceandiconholder">
                    <LazyLoadImage effect="opacity" alt={selected_chara.CharacterName} className={`faceicon`} src={selected_chara.CharacterName == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_face.png" : `https://dissidiacompendium.com/images/static/characters/${selected_chara.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"")}/face.png`}/>
                    <div className="facetext">
                      {selected_chara.CharacterName == "Cloud of Darkness" ? "CoD" : selected_chara.CharacterName == "Warrior of Light" ? "WoL" : selected_chara.CharacterName}
                      </div>
                </div>
              </div>
              <div className={`Buffbanner  iconbuffer infonameholder nobuffpadding `}>
              <div className="displayfex">
              <div className="spacearound">
              <span className={`${passives.PassiveRank} automarg`}/>{passives.PassiveName1}
              </div>
              </div>
                {passives.bannerindex3 == undefined ? "" :
                  <div className="similarbanner">
                      {passives.bannerindex3.tempdate == true ?
                      <div>
                          <Link className="linktopage" to={`/events/banners/${passives.bannerindex3.bannerindex}`}>
                              {passives.bannerindex3.name}<br/>
                      </Link>
                          {handledate(passives.bannerindex3.indate)}
                      </div>
                      :
                      <div> 
                          <Link className="linktopage" to={`/events/banners/${passives.bannerindex3.bannerindex}`}>
                              {passives.bannerindex3.name}<br/>
                      </Link>
                          <StartsInTimer expiryTimestamp={new Date(passives.bannerindex3.indate)}/>
                          </div>
                      }
                  </div>
                  }
              </div>
              <div className={`bluebase  infobase nobuffpadding`}>
              {passives.PassiveDesc1_3 == undefined ? "" : addformatting(makediff(passives.PassiveDesc1_3,passives.PassiveDesc1_2))}
              </div>
              {passives.PassiveCount == 4?
                <div className={`bluebase  infobase nobuffpadding`}>
              {passives.PassiveDesc2_3 == undefined ? "" : addformatting(makediff(passives.PassiveDesc2_3,passives.PassiveDesc2_2))}
              </div>
              :""}
               {passives.PassiveCount == 4?
                <div className={`bluebase  infobase nobuffpadding`}>
              {passives.PassiveDesc3_3 == undefined ? "" : addformatting(makediff(passives.PassiveDesc3_3,passives.PassiveDesc3_2))}
              </div>
              :""}
              {passives.PassiveCount == 4?
                <div className={`bluebase  infobase nobuffpadding`}>
              {passives.PassiveDesc4_3 == undefined ? "" : addformatting(makediff(passives.PassiveDesc4_3,passives.PassiveDesc4_2))}
              </div>
              :""}
            </div>
            </div>
              :""}
                </LazyLoadComponent>
            </div>
          ))}
        </div>
      )
    
}
export default ReworksPageFormatting