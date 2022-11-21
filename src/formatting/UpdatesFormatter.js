import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import DefaultTippy from '../formatting/TippyDefaults.js'
import EventListing from '../formatting/SingleEventsFormatting.js'
import FaceMaker from '../formatting/CharFaceFormatting.js'
import EnemyListingsDirect from '../formatting/EnemyListingDirect'
import BannersFormatting from '../formatting/SingleBannersFormatting.js'
import addformatting from '../processing/replacer_abilitycontent.js';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ImWarning } from 'react-icons/im';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const UpdateFormatting = ({ match,jptoggledata }) => {

    const [showupdate, setshowupdate] = useState(false);

    const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function ordinal(n) {
      var s = ["th", "st", "nd", "rd"];
      var v = n%100;
      return n + (s[(v-20)%10] || s[v] || s[0]);
    }

    const [spoilers,setspoilers] = useState(match && match.JPFlag == "GL"  ? true : false)
    const toggle_spoilers=()=>{
      setspoilers((prevValue)=>!prevValue)
      setshowupdate(true)
    }

    const showmorecheck = match.CharList && match.CharList.length + match.EventList && match.EventList.length + match.BannersList && match.BannersList.length + match.EnemyList && match.EnemyList.length + match.SummList &&  match.SummList.length;
     if( showmorecheck == 0 ) {
       return(
         ""
       )
     }
    return(
        <div className="updateunitholder">
          <div className="featuredbannernotop">{match.Title}</div>
          {(spoilers == false && jptoggledata == false)
              ? 
              <div className='titlemainupdateholder'>
              <div id="red" className='spoiler_text' onClick={toggle_spoilers}>
                <ImWarning className='jpsmallinactive'></ImWarning>
                  {" SPOILER WARNING "}
                  <ImWarning className='jpsmallinactive'></ImWarning><br/>
                  <span className='updatelink'>- Click to show -</span>
              </div>
              </div>
              :
              <>
            <div className="updateunit">
                <div className="updatedate">
                {match.JPFlag == "GL" ? <span className="emoji">🌎</span> : <span className="jpflagupdate"></span>} {months[new Date(match.DateUpdate).getMonth()] + " " + ordinal(new Date(match.DateUpdate).getDate()) + " " + new Date(match.DateUpdate).getFullYear()}
                </div>
                <div className="titlemainupdateholder notop">
                  <div className="updatetitle">
                  {match.Summary}
                  </div>
                  <div className="updatemain">
                    {addformatting(match.Main)} 
                  </div>
                </div>
              </div>
                {showupdate == true &&
                match.CharList != undefined ? 
                <div className="zone">
                  <div className="featuredbanner">Updated Characters</div>
                    <div className="charalistflarholder">
                      <div className="titlemainupdateholder">
                    <ul className="CharListHolder">
                          {match.CharList.map(char => (
                              <FaceMaker key={char.CharID} match={char} location={char.charurl}/>
                          ))
                          }
                    </ul>
                    </div>
                    </div>
                </div> : ""}
                {showupdate == true &&
                match.EventList !== undefined ? 
                <div className="">
                <div className="featuredbanner">Updated Events</div>
                {match.EventList.map(events => (
                    <EventListing key={events.eventindex} match={events} permapage={false}/>
                ))}
                </div> :"" }
                {showupdate == true &&
                match.BannersList != undefined ? 
                <div className="">
                    <div className="featuredbanner">Updated Banners</div>
                        {match.BannersList.map(events => (
                        <BannersFormatting key={events.bannerindex} match={events} showbanner={false} permapage={false}/>
                        ))}
                </div> : ""}
                {showupdate == true &&
                match.EnemyList != undefined ?
                <div>
                    <div className="featuredbanner">Updated Enemies</div>
                    <ul className="enemyholder nomargbottom nomargtop charalistflarholder notop">
                  <div className="titlemainupdateholder">
                    <div className="singlenemyholder">
                    {match.EnemyList.map(enemy => (
                        <EnemyListingsDirect key={enemy.battle_enemy_id} match={enemy} />
                    ))} 
                    </div>
                    </div>
                    </ul>
                </div> : ""}
                {showupdate == true &&
                match.SummList != undefined ? 
                <div>
                <div className="featuredbanner">Updated Summons</div>
                <div className="charholderflair notop">
                  <div className="titlemainupdateholder">
                    <ul className="summonupdatelist">
                      {match.SummList.map(summons => (
                      <li key={summons.SummonID}>
                        <DefaultTippy content={summons.SummonName}>
                        <Link to={`/summons/${summons.SummonNameShort}`}>
                            <LazyLoadImage effect="opacity" alt={summons.SummonName} className="summonimglink" src={`https://dissidiacompendium.com/images/static/icons/summons/face/${summons.SummonFace}`} />
                        </Link>
                        </DefaultTippy>
                      </li>
                      ))}
                    </ul>
                  </div>
                  </div>
                </div> : ""
                }
                {showupdate == false ? 
                    <div className="banneroneventholder"  >
                    <div className="loadbanners" onClick={() => setshowupdate((prevValue) => !prevValue)} >Show Updates</div>
                    </div> : 
                    <div className="banneroneventholder"  >
                    <div className="loadbanners" onClick={() => setshowupdate((prevValue) => !prevValue)} >Hide Updates</div>
                    </div>}
                </>}
        </div>

    )

}

export default UpdateFormatting;