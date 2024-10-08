import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import Tippy from './components/TippyDefaults'
import { setFalse, setTrue } from './redux/ducks/jptoggle'
import ReplacerCharacter from './components/ReplacerCharacter';
import { Helmet } from 'react-helmet-async';
import DefaultTippy from './components/TippyDefaults.js'
import SingleEventsFormatting from './components/Events/SingleEventsFormatting.js'
import CharacterFaceFormatting from './components/Characters/CharacterFaceFormatting';
import EnemyListingsDirect from './components/Enemy/EnemyListing'
import BannersFormatting from './components/Events/SingleBannersFormatting.js'
import UpdatesFormmating from './components/UpdatesFormatting.js'
import { ImWarning } from 'react-icons/im';
import { Link } from 'react-router-dom'
import { getQueryStringVal, useQueryParam } from './components/URLParams'

export default function Home({ 
  ProcessedUpdates, 
  jptoggledata 
}){

  const dispatch = useDispatch();

  const startinglimit = 10;

  const rawData = ProcessedUpdates;

  const lastupdate = rawData[0];

  const updatelen = rawData.length;

  const olderupdates = rawData.slice(1, updatelen);

  const banerDisplayTerm = "updates";

  const [showGLToggle, setShowGLToggle] = useState(jptoggledata);

  const filterResults = olderupdates;
  const [limits, setLimits] = useState(startinglimit);
  const [listDisplay, setListDisplay] = useState(
    olderupdates && olderupdates.slice(0, startinglimit)
  );

  const [spoilers, setspoilers] = useState(lastupdate && lastupdate.JPFlag == "GL" ? true : false)
  const [listLength, setListLength] = useState(listDisplay.length);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [displayBanner, setDisplayBanner] = useState(
    <>Displaying <span className="subtextgold">{listLength}</span> of <span className="subtextgold"> {olderupdates.length}</span> {banerDisplayTerm}</>
  );

  const [JPsearch, setJPSearch] = useQueryParam("JP", "");

  //jp params
  useEffect(() => {
    if (getQueryStringVal("JP") == "true") {
      dispatch(setTrue())
      setJPSearch("true")
      setShowGLToggle(true)
    } else {
      dispatch(setFalse())
      setJPSearch("")
      setShowGLToggle(false)
    }
  }, [setJPSearch, dispatch])

  useEffect(() => {
    if (jptoggledata == true) {
      setJPSearch("true")
    }
    if (getQueryStringVal("JP") == "true") {
      dispatch(setTrue())
    }
  }, [jptoggledata, dispatch, setJPSearch])

  useEffect(() => {
    setShowLoadMore(true);
    setLimits(startinglimit);
    setListLength(olderupdates.length);
    setListDisplay(olderupdates.slice(0, startinglimit));
    setDisplayBanner(
      <>Displaying <span className="subtextgold">{startinglimit}</span> of <span className="subtextgold"> {olderupdates.length}</span> {banerDisplayTerm}</>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //load more
  const loadMoreButton = () => {
    const newlimits = limits + startinglimit;
    const newLoadMore = filterResults.length > newlimits;
    const newlistdisplay = listDisplay.concat(
      filterResults.slice(limits, newlimits)
    );
    setLimits(newlimits);
    if (newlimits <= newlistdisplay.length) {
      setDisplayBanner(
        <>Displaying <span className="subtextgold">{newlimits}</span> of <span className="subtextgold"> {filterResults.length}</span> {banerDisplayTerm}</>
      );
    } else {
      setDisplayBanner(
        <>Displaying <span className="subtextgold">{filterResults.length}</span> of <span className="subtextgold"> {filterResults.length}</span> {banerDisplayTerm}</>
      );
    }
    setShowLoadMore(newLoadMore);
    setListDisplay(newlistdisplay);
    setListLength(newlistdisplay.length);
  };

  const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function ordinal(n) {
    var s = ["th", "st", "nd", "rd"];
    var v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  const handletoggle = (toggle) => {
    if (toggle == false) {
      setShowGLToggle(true)
      dispatch(setTrue())
      setJPSearch("true")
    } else {
      setShowGLToggle(false)
      dispatch(setFalse())
      setJPSearch("")
    }
  }

  useEffect(() => {
    if (getQueryStringVal("JP") == "true") {
      dispatch(setTrue())
      setJPSearch("true")
    } else {
      dispatch(setFalse())
      setJPSearch("")
    }

  }, [setJPSearch, dispatch])

  const jponlybutton = () => {
    if (jptoggledata == false) {
      dispatch(setTrue())
      setJPSearch("true")
    }
  };

  const glonlybutton = () => {
    if (jptoggledata == true) {
      dispatch(setFalse())
      setJPSearch("")
    }
  };

  const togglebutton = () => {
    if (jptoggledata == true) {
      dispatch(setFalse())
      setJPSearch("")
    } else {
      dispatch(setTrue())
      setJPSearch("true")
    }
  };

  const toggle_spoilers = () => {
    setspoilers((prevValue) => !prevValue)
  }
  return (
    <div>
      <Helmet>
        <title>Dissidia Compendium | Home</title>
        <meta property="og:site_name" content="Dissidia Compendium" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content="Dissidia Final Fantasy Opera Omnia mobile game Database. We provide English and Japanese translations for both Global and Japanese versions. Here you'll find all character abilities, enemies and summons, as well as a complete timeline of game events with community guides" />
        <meta name="twitter:title" content="Dissidia Compendium" />
        <meta name="twitter:description" content="Dissidia Final Fantasy Opera Omnia mobile game Database. We provide English and Japanese translations for both Global and Japanese versions. Here you'll find all character abilities, enemies and summons, as well as a complete timeline of game events with community guides" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:alt" content="Dissidia Compendium" />
        <meta property="og:title" content="Dissidia Compendium" />
        <meta property="og:description" content="Dissidia Final Fantasy Opera Omnia mobile game Database. We provide English and Japanese translations for both Global and Japanese versions. Here you'll find all character abilities, enemies and summons, as well as a complete timeline of game events with community guides" />
        <meta property="og:url" content="https://dissidiacompendium.com" />
      </Helmet>
      <div className="content">
        <h1 className="maintitle" >Welcome to Dissidia Compendium <Link className="updatelink" to="/log">v7.1!</Link><span className="squallsmile"></span></h1>
        <div className="enemyholderdesc" style={{ whiteSpace: "normal" }}>
          <div className="subheader">
            <div className="homewelcomeholder noselect">
              Dissidia Final Fantasy Opera Omnia mobile game database.<br /><br />
              We provide translations for both the Global
              and Japanese versions. Here you'll find all character abilities,
              enemies and summons, as well as a complete timeline of game events
              with community guides. You can switch databases by using the upper <span className="emoji clicky" onClick={glonlybutton}>🌎</span> or <span className="jpflagupdate clicker" onClick={jponlybutton}></span> icons
              or the button below:
              <br />
              <br />
              <div className='center'>
                <Tippy content={jptoggledata == false ? "GL" : "JP"}>
                  <span className={`${jptoggledata == false ? "ver_gl" : "ver_jp"} buffbutton filterinactive`} onClick={togglebutton}></span>
                </Tippy>
              </div>
              <span className="center" id="red">
                <ImWarning className='jpsmallinactive'></ImWarning>
                {" SPOILER WARNING "}
                <ImWarning className='jpsmallinactive'></ImWarning>
              </span>
              <span className="center">{"If you're a Global player who rather not know about upcoming content."}</span><br />
              <div className="centertext">
                {"Join our "}<a className="updatelink" target="_blank" rel="noreferrer" href="https://discord.gg/Y3Yn6gb"><span className="discord"></span></a>{" for the latest updates!"}</div>
            </div>
          </div>
        </div>
        <div className="updatesholder">
          <div className="lastupdate">Latest Update</div>
          <div className="featuredbannernotop">{lastupdate.Title}</div>
          {(spoilers == false && showGLToggle == false)
            ?
            <div className='titlemainupdateholder'>
              <div id="red" className='spoiler_text' onClick={toggle_spoilers}>
                <ImWarning className='jpsmallinactive'></ImWarning>
                {" SPOILER WARNING "}
                <ImWarning className='jpsmallinactive'></ImWarning><br />
                <span className='updatelink'>- Click to show -</span>
              </div>
            </div>
            :
            <>
              <div className="updateunit">
                <div className="updatedate">
                  {lastupdate.JPFlag == "GL" ? <span className="emoji">🌎</span> : <span className="jpflagupdate"></span>} {months[new Date(lastupdate.DateUpdate).getMonth()] + " " + ordinal(new Date(lastupdate.DateUpdate).getDate()) + " " + new Date(lastupdate.DateUpdate).getFullYear()}
                </div>
                <div className="titlemainupdateholder notop">
                  <div className="updatetitle">
                    {lastupdate.Summary}
                  </div>
                  <div className="updatemain">
                    {lastupdate.Main != undefined ? ReplacerCharacter(lastupdate.Main) : ""}
                  </div>
                </div>
              </div>
              {lastupdate.CharList == undefined ? "" :
                <div className="zone">
                  <div className="featuredbanner">Updated Characters</div>
                  <div className="charalistflarholder">
                    <div className="titlemainupdateholder">
                      <ul className="CharListHolder">
                        {lastupdate.CharList.map((char,i) => (
                          <CharacterFaceFormatting key={i} match={char} location={char.charurl} />
                        ))
                        }
                      </ul>
                    </div>
                  </div>
                </div>}
              {lastupdate.EventList == undefined ? "" :
                <div className="">
                  <div className="featuredbanner">Updated Events</div>
                  {lastupdate.EventList.map(events => (
                    <SingleEventsFormatting 
                    key={events.eventindex} 
                    match={events} 
                    permapage={false} />
                  ))}
                </div>
              }
              {lastupdate.BannersList == undefined ? "" :
                <div className="">
                  <div className="featuredbanner">Updated Banners</div>
                  {lastupdate.BannersList.map(events => (
                    <BannersFormatting key={events.bannerindex} match={events} showbanner={false} permapage={false} />
                  ))}
                </div>}
              {lastupdate.EnemyList == undefined ? "" :
                <div>
                  <div className="featuredbanner">Updated Enemies</div>
                  <ul className="enemyholder nomargbottom nomargtop charalistflarholder notop">
                    <div className="titlemainupdateholder">
                      <div className="singlenemyholder">
                        {lastupdate.EnemyList.map(enemy => (
                          <EnemyListingsDirect key={enemy.battle_enemy_id} match={enemy} />
                        ))}
                      </div>
                    </div>
                  </ul>
                </div>
              }
              {lastupdate.SummList == undefined ? "" :
                <div>
                  <div className="featuredbanner">Updated Summons</div>
                  <div className="charholderflair notop">
                    <div className="titlemainupdateholder">
                      <ul className="summonupdatelist">
                        {lastupdate.SummList.map(summons => (
                          <li key={summons.SummonID}>
                            <Link to={`/bonuses/${summons.SummonNameShort}`}>
                              <DefaultTippy content={summons.SummonName}>
                                <img alt={summons.SummonName} className="summonimglink" src={`https://dissidiacompendium.com/images/static/icons/summons/face/${summons.SummonFace}`} />
                              </DefaultTippy>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              }
            </>
          }
        </div>
        <div className="updatesholder">
          <div className="lastupdate nobottom">Previous Updates</div>
          {listDisplay.map(updates => (
            <UpdatesFormmating
              key={updates.UpdateKey}
              match={updates}
              jptoggledata={jptoggledata}
            />
          ))}
          <div className="">
            <div className="subtextbottom">
              {displayBanner}
            </div>
            {showLoadMore &&
              <div className="loadmore" onClick={loadMoreButton}> Load More </div>}
          </div>
        </div>
      </div>
    </div>
  )
}