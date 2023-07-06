import React, { useState, useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import { useDispatch } from "react-redux";
import { setFalse, setTrue } from './redux/ducks/jptoggle'
import './Events.css';
import Tippy from './components/TippyDefaults.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import { Helmet } from 'react-helmet-async';
import Select from 'react-select';
import { Link } from 'react-router-dom'
import EventListing from './components/Events/EventsFormatting.js'
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { FaUndoAlt } from 'react-icons/fa';
import { getQuery, getQueryStringVal, useQueryParam } from './components/URLParams'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaShareSquare } from 'react-icons/fa';

export default function Events({ 
  ProcessedEvents, 
  ProcessedCharacters, 
  EventGuideData, 
  jptoggledata, 
  master_index 
}){

  const dispatch = useDispatch();

  const startinglimit = 15;

  const banerDisplayTerm = "events";

  const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null ? true : false);
  const [clearFilter, setclearFilter] = useStateIfMounted(false);

  const [jponly, setJPonly] = useState(jptoggledata);
  const [pastevents, setPastEvents] = useState(getQueryStringVal("past") != null ? true : false);
  const [rawData, setrawData] = useState(ProcessedEvents)
  const [reverse, setReverse] = useState(getQueryStringVal("rev") != null ? true : false);

  const [actone, setActOne] = useState(getQueryStringVal("act1") != null ? true : false);
  const [acttwo, setActTwo] = useState(getQueryStringVal("act2") != null ? true : false);
  const [actthree, setActThree] = useState(getQueryStringVal("act3") != null ? true : false);
  const [actfour, setActFour] = useState(getQueryStringVal("act4") != null ? true : false);
  const [event, setEvent] = useState(getQueryStringVal("event") != null ? true : false);
  const [lostchapter, setLostChapter] = useState(getQueryStringVal("lostchapter") != null ? true : false);
  const [woi, setWOI] = useState(getQueryStringVal("woi") != null ? true : false);
  const [feod, setFEoD] = useState(getQueryStringVal("feod") != null ? true : false);
  const [abyss, setAbyss] = useState(getQueryStringVal("abyss") != null ? true : false);
  const [hunt, setHunts] = useState(getQueryStringVal("hunt") != null ? true : false);
  const [heretic, setHeretic] = useState(getQueryStringVal("heretic") != null ? true : false);
  const [raid, setRaid] = useState(getQueryStringVal("raid") != null ? true : false);
  const [dungeon, setDungeon] = useState(getQueryStringVal("dungeon") != null ? true : false);
  const [bossrush, setBossRush] = useState(getQueryStringVal("bossrush") != null ? true : false);
  const [sixman, setSixman] = useState(getQueryStringVal("sixman") != null ? true : false);
  const [memorial, setMemorial] = useState(getQueryStringVal("memorial") != null ? true : false);
  const [wills, setWills] = useState(getQueryStringVal("wills") != null ? true : false);

  const [loop, setLoop] = useStateIfMounted(false);
  const [searchTerm, setSearchTerm] = useState(getQueryStringVal("search") != null ? getQueryStringVal("search").toLowerCase() : "");
  const [searchdisplay, setsearchdisplay] = useState(getQueryStringVal("search") != null ? getQueryStringVal("search") : "");
  const [condFilter, setCondFilter] = useState("");
  const [filterResults, setFilterResults] = useState(rawData);
  const [searchResults, setSearchResults] = useState(rawData);
  const [limits, setLimits] = useState(startinglimit);
  const [listDisplay, setListDisplay] = useState(
    rawData && rawData.slice(0, startinglimit)
  );

  const [listLength, setListLength] = useState(listDisplay.length);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [displayBanner, setDisplayBanner] = useState(
    <>Displaying <span className="subtextgold">{listLength}</span> of <span className="subtextgold"> {rawData.length}</span> {banerDisplayTerm}</>
  );

  const [actonesearch, setActOnesearch] = useQueryParam("act1", "");
  const [acttwosearch, setActTwosearch] = useQueryParam("act2", "");
  const [actthreesearch, setActThreesearch] = useQueryParam("act3", "");
  const [actfoursearch, setActFoursearch] = useQueryParam("act4", "");
  const [eventsearch, setEventsearch] = useQueryParam("event", "");
  const [lostchaptersearch, setLostChaptersearch] = useQueryParam("lostchpater", "");
  const [woisearch, setWOIsearch] = useQueryParam("woi", "");
  const [feodsearch, setFEoDsearch] = useQueryParam("feod", "");
  const [abysssearch, setAbysssearch] = useQueryParam("abyss", "");
  const [huntsearch, setHuntssearch] = useQueryParam("hunt", "");
  const [hereticsearch, setHereticsearch] = useQueryParam("heretic", "");
  const [raidsearch, setRaidsearch] = useQueryParam("raid", "");
  const [dungeonsearch, setDungeonsearch] = useQueryParam("dungeon", "");
  const [bossrushsearch, setBossRushsearch] = useQueryParam("bossrush", "");
  const [sixmansearch, setSixmansearch] = useQueryParam("sixman", "");
  const [willssearch, setWillssearch] = useQueryParam("wills", "");
  const [memorialsearch, setMemorialsearch] = useQueryParam("memorial", "");
  const [pasteventssearch, setPastEventssearch] = useQueryParam("past", "");
  const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
  const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
  const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");
  const [Typesearch, setTypesearch] = useQueryParam("Char", "");
  const { protocol, pathname, host } = window.location;
  const query = getQuery();
  const url = `${protocol}//${host}${pathname}?${query.toString()}`;
  const [JPsearch, setJPSearch] = useQueryParam("JP", "");

  //param logic
  useEffect(() => {
    //type params
    if (Typesearch != null) {
      const filteredtype = Object.values(ProcessedCharacters).filter(function (ef) {
        const newfilterpull = ef["CharacterName"] === getQueryStringVal("Char");
        return newfilterpull;
      })
      if (filteredtype.length != 0) {
        setTypesearch(getQueryStringVal("Char"))
        setCondFilter(filteredtype[0].CharID)
      } else {
        setTypesearch("")
        setCondFilter("")
      }
    }
  }, [setCondFilter, ProcessedCharacters, Typesearch, setTypesearch])

  //jp params
  useEffect(() => {
    if (jptoggledata == true) {
      setJPSearch("true")
    } else {
      setJPSearch("")
    }
  }, [jptoggledata, setJPSearch])

  useEffect(() => {
    if (getQueryStringVal("JP") == "true") {
      dispatch(setTrue())
      setJPonly(true)
    } else {
      dispatch(setFalse())
      setJPonly(false)
    }
  }, [setJPSearch, dispatch])

  useEffect(() => {
    //search params
    if (getQueryStringVal("search") != null) {
      setSearchTerm(getQueryStringVal("search") != null ? getQueryStringVal("search").toLowerCase() : "")
      setTEXTsearch(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
      setsearchdisplay(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
    }
  }, [setTEXTsearch, setFiltersearch])

  // prefilter
  useEffect(() => {
    const filterholder = [];
    if (pastevents === false) {

      if (jponly === false) {
        //gl
        const filteredevents = ProcessedEvents.filter((item) => {
          return new Date().getTime() <= new Date(item.outdate)
        }).filter((item) => {
          return item.tempdate == false
        }).sort((a, b) => reverse ? new Date(b.indate).getTime() - new Date(a.indate).getTime() : new Date(a.indate).getTime() - new Date(b.indate).getTime());
        filterholder.push(...filteredevents);
        const filteredevents2 = filterholder.filter((item) => {
          return item.tempdate === false
        })
        setrawData(filteredevents2);

      } else {
        //jp
        const filteredevents = ProcessedEvents.filter((item) => {
          return new Date().getTime() <= new Date(item.JPoutdate)
        }).filter((item) => {
          return item.url1 != "https://dissidiacompendium.com/images/static/banners/jp/event/eventtitletemp1out.png"
        }).sort((a, b) => reverse ? new Date(a.JPindate).getTime() - new Date(b.JPindate).getTime() : new Date(b.JPindate).getTime() - new Date(a.JPindate).getTime());
        filterholder.push(...filteredevents);
        setrawData(filterholder);

      }

    } else {

      if (jponly === false) {
        const filteredevents = ProcessedEvents.filter(item=>item.tempdate === false).sort((a, b) => reverse ? new Date(b.indate).getTime() - new Date(a.indate).getTime() : new Date(a.indate).getTime() - new Date(b.indate).getTime())
        setrawData(filteredevents);
      } else {
        const filteredevents = ProcessedEvents.sort((a, b) => reverse ? b.eventindex - a.eventindex : a.eventindex - b.eventindex)
        setrawData(filteredevents);
      }
      
    }
  }, [ProcessedEvents, jponly, pastevents, reverse]);

  //filter
  useEffect(() => {
    const filterholder = [];
    if (actone === true) {
      const filteredout = rawData.filter(
        (event) => event["type"] == "Act 1"
      );
      filterholder.push(...filteredout);
    }
    if (acttwo === true) {
      const filteredout = rawData.filter(
        (event) => event["type"] == "Act 2"
      );
      filterholder.push(...filteredout);
    }
    if (actthree === true) {
      const filteredout = rawData.filter(
        (event) => event["type"] == "Act 3"
      );
      filterholder.push(...filteredout);
    }
    if (actfour === true) {
      const filteredout = rawData.filter(
        (event) => event["type"] == "Act 4"
      );
      filterholder.push(...filteredout);
    }
    if (event === true) {
      const filteredout = rawData.filter(
        (event) => event["type"] == "Event"
      );
      filterholder.push(...filteredout);
    }
    if (lostchapter === true) {
      const filteredout = rawData.filter(
        (event) => event["type"] == "Lost Chapter"
      );
      filterholder.push(...filteredout);
    }
    if (woi === true) {
      const filteredout = rawData.filter(
        (event) => event["type"] == "World of Illusion"
      );
      filterholder.push(...filteredout);
    }
    if (feod === true) {
      const filteredout = rawData.filter(
        (event) => event["type"] == "Dimension's End"
      );
      filterholder.push(...filteredout);
    }
    if (abyss === true) {
      const filteredout = rawData.filter(
        (event) => event["type"] == "Abyss"
      );
      filterholder.push(...filteredout);
    }
    if (hunt === true) {
      const filteredout = rawData.filter(
        (event) => event["type"] == "Hunt"
      );
      filterholder.push(...filteredout);
    }
    if (heretic === true) {
      const filteredout = rawData.filter(
        (event) => event["type"] == "Heretic"
      );
      filterholder.push(...filteredout);
    }
    if (raid === true) {
      const filteredout = rawData.filter(
        (event) => event["type"] == "Raid"
      );
      filterholder.push(...filteredout);
    }
    if (dungeon === true) {
      const filteredout = rawData.filter(
        (event) => event["type"] == "Mission Dungeon"
      );
      filterholder.push(...filteredout);
    }
    if (bossrush === true) {
      const filteredout = rawData.filter(
        (event) => event["type"] == "Boss Rush"
      );
      filterholder.push(...filteredout);
    }
    if (sixman === true) {
      const filteredout = rawData.filter(
        (event) => event["type"] == "6 Man"
      );
      filterholder.push(...filteredout);
    }
    if (wills === true) {
      const filteredout = rawData.filter(
        (event) => event["type"] == "Entangled Wills"
      );
      filterholder.push(...filteredout);
    }
    if (memorial === true) {
      const filteredout = rawData.filter(
        (event) => event["type"] == "Memorial"
      );
      filterholder.push(...filteredout);
    }

    if (![actfour, actone, acttwo, actthree, event, memorial, lostchapter, woi, feod, abyss, abyss, hunt, heretic, raid, dungeon, sixman, bossrush, wills].includes(true)) {
      filterholder.push(...rawData);
    }

    const makeUnique = filterholder.filter(onlyUnique)
    const searchit = makeUnique.filter((events) =>
      `${events.name.toLowerCase()} ${events.SpheresList.length != 0 ? " rf spheres" : ""}`.includes(searchTerm)
    );
    const gettypefilter = searchit.filter(function (ef) {
      const newfilterpull = ef.CharList
        .some(CharList => CharList.CharID === condFilter)
        ;
      if (condFilter !== "") {
        return newfilterpull;
      } else {
        return ef
      }
    });
    setFilterResults(makeUnique);
    setSearchResults(gettypefilter);
    const newlistdisplay = gettypefilter.slice(0, limits);
    setShowLoadMore(limits < gettypefilter.length ? true : false);
    setListDisplay(newlistdisplay);
    setListLength(limits < gettypefilter.length ? gettypefilter.length : newlistdisplay.length);
    setDisplayBanner(
      <>Displaying <span className="subtextgold">{newlistdisplay.length}</span> of <span className="subtextgold"> {gettypefilter.length}</span> {banerDisplayTerm}</>
    );
  }, [searchTerm, rawData, limits, clearFilter, memorial, actone, acttwo, actthree, actfour, event, lostchapter, woi, feod, abyss, hunt, heretic, raid, dungeon, sixman, bossrush, jponly, pastevents, wills, condFilter, reverse]);


  //buttons
  const act1button = () => {
    if (actone == false) {
      setActOnesearch("true")
    } else {
      setActOnesearch("")
    }
    setActOne((prevValue) => !prevValue);
  };
  const act2button = () => {
    if (acttwo == false) {
      setActTwosearch("true")
    } else {
      setActTwosearch("")
    }
    setActTwo((prevValue) => !prevValue);
  };
  const act3button = () => {
    if (actthree == false) {
      setActThreesearch("true")
    } else {
      setActThreesearch("")
    }
    setActThree((prevValue) => !prevValue);
  };
  const act4button = () => {
    if (actthree == false) {
      setActFoursearch("true")
    } else {
      setActFoursearch("")
    }
    setActFour((prevValue) => !prevValue);
  };
  const eventsbutton = () => {
    if (event == false) {
      setEventsearch("true")
    } else {
      setEventsearch("")
    }
    setEvent((prevValue) => !prevValue);
  };
  const lostchapterbutton = () => {
    if (lostchapter == false) {
      setLostChaptersearch("true")
    } else {
      setLostChaptersearch("")
    }
    setLostChapter((prevValue) => !prevValue);
  };
  const woibutton = () => {
    if (woi == false) {
      setWOIsearch("true")
    } else {
      setWOIsearch("")
    }
    setWOI((prevValue) => !prevValue);
  };
  const feodbutton = () => {
    if (feod == false) {
      setFEoDsearch("true")
    } else {
      setFEoDsearch("")
    }
    setFEoD((prevValue) => !prevValue);
  };
  const abyssbutton = () => {
    if (abyss == false) {
      setAbysssearch("true")
    } else {
      setAbysssearch("")
    }
    setAbyss((prevValue) => !prevValue);
  };
  const huntsbutton = () => {
    if (hunt == false) {
      setHuntssearch("true")
    } else {
      setHuntssearch("")
    }
    setHunts((prevValue) => !prevValue);
  };
  const hereticbutton = () => {
    if (heretic == false) {
      setHereticsearch("true")
    } else {
      setHereticsearch("")
    }
    setHeretic((prevValue) => !prevValue);
  };
  const raidbutton = () => {
    if (raid == false) {
      setRaidsearch("true")
    } else {
      setRaidsearch("")
    }
    setRaid((prevValue) => !prevValue);
  };
  const dungeonbutton = () => {
    if (dungeon == false) {
      setDungeonsearch("true")
    } else {
      setDungeonsearch("")
    }
    setDungeon((prevValue) => !prevValue);
  };
  const rushbutton = () => {
    if (bossrush == false) {
      setBossRushsearch("true")
    } else {
      setBossRushsearch("")
    }
    setBossRush((prevValue) => !prevValue);
  };
  const sixmanbutton = () => {
    if (sixman == false) {
      setSixmansearch("true")
    } else {
      setSixmansearch("")
    }
    setSixman((prevValue) => !prevValue);
  };
  const jponlybutton = () => {
    if (jponly == false) {
      dispatch(setTrue())
      setJPSearch("true")
    } else {
      dispatch(setFalse())
      setJPSearch("")
    }
    setJPonly((prevValue) => !prevValue);
  };
  const pastbutton = () => {
    if (pastevents == false) {
      setPastEventssearch("true")
    } else {
      setPastEventssearch("")
    }
    setPastEvents((prevValue) => !prevValue);
  };
  const willsbutton = () => {
    if (wills == false) {
      setWillssearch("true")
    } else {
      setWillssearch("")
    }
    setWills((prevValue) => !prevValue);
  };
  const memorialbutton = () => {
    if (memorial == false) {
      setMemorialsearch("true")
    } else {
      setMemorialsearch("")
    }
    setMemorial((prevValue) => !prevValue);
  };
  const reversebutton = () => {
    if (reverse == false) {
      setReversesearch("true")
    } else {
      setReversesearch("")
    }
    setLoop(true);
    setReverse((prevValue) => !prevValue);
    setTimeout(() => setLoop(false), 1000);
  };
  const showfilterbutton = () => {
    if (showFilter == false) {
      setFiltersearch("true")
    } else {
      setFiltersearch("")
    }
    setShowFilter((prevValue) => !prevValue);
  }


  //type selector
  const characterSelect = (e) => {
    if (e !== null) {
      setTypesearch(e.label)
      setCondFilter(e.id);
    } else {
      setCondFilter("");
      setTypesearch("")
    }
  };

  //load more
  const loadMoreButton = () => {
    const newlimits = limits + startinglimit;
    const newLoadMore = searchResults.length > newlimits;
    const newlistdisplay = listDisplay.concat(
      searchResults.slice(limits, newlimits)
    );
    setLimits(newlimits);
    if (newlimits <= newlistdisplay.length) {
      setDisplayBanner(
        <>Displaying <span className="subtextgold">{newlimits}</span> of <span className="subtextgold"> {searchResults.length}</span> {banerDisplayTerm}</>
      );
    } else {
      setDisplayBanner(
        <>Displaying <span className="subtextgold">{searchResults.length}</span> of <span className="subtextgold"> {searchResults.length}</span> {banerDisplayTerm}</>
      );
    }
    setShowLoadMore(newLoadMore);
    setListDisplay(newlistdisplay);
    setListLength(newlistdisplay.length);
  };

  //unique
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  //type list
  const [typeListArray, settypeListArray] = useStateIfMounted(false);
  useEffect(() => {
    const typeListArray2 = Object.values(ProcessedCharacters).filter(self => jptoggledata == true ? self.JPOrder != undefined : self.GLOrder != undefined).sort((a, b) => jptoggledata == true ? b.JPOrder - a.JPOrder : b.GLOrder - a.GLOrder).map((typeListUnique) => ({
      value: typeListUnique.CharacterName,
      label: typeListUnique.CharacterName,
      id: typeListUnique.CharID,
    }));
    settypeListArray(typeListArray2)
  }, [jptoggledata, ProcessedCharacters, settypeListArray])


  //search bar
  const handleChange = (e) => {
    setsearchdisplay(e.target.value);
    setSearchTerm(e.target.value.toLowerCase());
    setTEXTsearch(e.target.value)
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setSearchTerm(searchdisplay.toLowerCase());
      setTEXTsearch(searchdisplay)
    }
  }

  const clearSearch = () => {
    setsearchdisplay("")
    setSearchTerm("");
    setTEXTsearch("")
  };


  //clear
  const resetbutton = () => {
    setclearFilter(true)
    setReverse(false)
    setPastEvents(false);
    setActOne(false)
    setActTwo(false)
    setActThree(false)
    setActFour(false)
    setEvent(false)
    setLostChapter(false)
    setWOI(false)
    setFEoD(false)
    setAbyss(false)
    setHunts(false)
    setHeretic(false)
    setRaid(false)
    setDungeon(false)
    setBossRush(false)
    setSixman(false)
    setPastEvents(false)
    setWills(false)
    setMemorial(false)

    setActOnesearch("")
    setActTwosearch("")
    setActThreesearch("")
    setActFoursearch("")
    setEventsearch("")
    setLostChaptersearch("")
    setWOIsearch("")
    setFEoDsearch("")
    setAbysssearch("")
    setHuntssearch("")
    setHereticsearch("")
    setRaidsearch("")
    setBossRushsearch("")
    setDungeonsearch("")
    setSixmansearch("")
    setPastEventssearch("")
    setWillssearch("")
    setMemorialsearch("")
    setReversesearch("")
    setTEXTsearch("")
    setTypesearch("")

    setsearchdisplay("");
    setSearchTerm("");
    setCondFilter("")
    setTimeout(() => setclearFilter(false), 1000);
  }

  const events = listDisplay;
  return (
    <div>
      <Helmet>
        <title>Events Search - Dissidia Compendium</title>
        <meta property="og:site_name" content="Dissidia Compendium" />
        <meta name="description" content="Search every event in a complete game timeline!" />
        <meta name="twitter:title" content="Events Search - Dissidia Compendium" />
        <meta property="og:type" content="website" />
        <meta name="twitter:description" content="Search every event in a complete game timeline!" />
        <meta property="og:title" content="Events Search - Dissidia Compendium" />
        <meta property="og:description" content="Search every event in a complete game timeline!" />
        <meta property="og:url" content="https://dissidiacompendium.com/events" />
      </Helmet>
      <div className="content">
        <h1>{jponly == false ? "GL " : "JP "}Events</h1>
        <div className="subheader">Use filters to limit returns</div>
        <div className="charfilterspacer" />
        <div onClick={showfilterbutton} className="charfilter" id={showFilter ? "filteropen" : "filterclosed"}><span className="filterstext"></span>{showFilter ? <TiArrowSortedUp className="uparrow" /> : <TiArrowSortedDown className="downarrow" />}</div>
        {showFilter == false ?
          <div className="event-search-reverse-holder">
            <span className={`${jponly ? "jponlybackground" : "GLonlybackground"}`}>
              <Tippy content={`${jptoggledata ? "Switch to GL" : "Switch to JP"}`} className="tooltip" >
                <span onClick={jponlybutton} className={`${jponly ? "jpflage jpsmallinactive smalleventbutton" : "glflage smalleventbutton"}`} />
              </Tippy>
            </span>
            <IoSearch className="searchicon" />
            <div className="search-holder el">
              <input
                className="char-search-bar"
                type="text"
                id="search"
                placeholder="Event Name"
                value={searchdisplay}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              <span className="pasteventbackground">
                <Tippy content="Past Events" className="tooltip" >
                  <span onClick={pastbutton} className={`pastevents ${pastevents ? "pastsmallactive" : "pastsmallinactive"}`} />
                </Tippy>
              </span>
              {searchTerm === "" ? "" :
                <IoMdCloseCircleOutline onClick={clearSearch} className="eventclearsearch"></IoMdCloseCircleOutline>}
            </div>
          </div>
          : 
        <div className="filterholder noselect" id={showFilter ? "showfilteren" : "hiddenfilteren"}>
          <div className="similarbanner">Multiple filters can be active</div>
          <div className="filterholderflair">
            <ul className="eventtypes">
              <Tippy content="Act 1" className="tooltip">
                <li alt="Act 1" onClick={act1button} className={`${actone ? "filteractive" : "filterinactive"} ActOne eventbutton`} ></li>
              </Tippy>
              <Tippy content="Act 2" className="tooltip">
                <li alt="Act 2" onClick={act2button} className={`${acttwo ? "filteractive" : "filterinactive"} ActTwo eventbutton`} ></li>
              </Tippy>
              <Tippy content="Act 3" className="tooltip" >
                <li alt="Act 3" onClick={act3button} className={`${actthree ? "filteractive" : "filterinactive"} ActThree eventbutton`} ></li>
              </Tippy>
              <Tippy content="Act 4" className="tooltip" >
                <li alt="Act 4" onClick={act4button} className={`${actfour ? "filteractive" : "filterinactive"} ActFour eventbutton`} ></li>
              </Tippy>
              <Tippy content="Events" className="tooltip" >
                <li alt="Events" onClick={eventsbutton} className={`${event ? "filteractive" : "filterinactive"} Events eventbutton`} ></li>
              </Tippy>
              <Tippy content="Lost Chapters" className="tooltip">
                <li alt="Lost Chapters" onClick={lostchapterbutton} className={`${lostchapter ? "filteractive" : "filterinactive"} LostChapters eventbutton`} ></li>
              </Tippy>
              <Tippy content="World of Illusions" className="tooltip" >
                <li alt="World of Illusions" onClick={woibutton} className={`${woi ? "filteractive" : "filterinactive"} WorldofIllusions eventbutton`} ></li>
              </Tippy>
              <Tippy content="Dimensions End" className="tooltip" >
                <li alt="Dimensions End" onClick={feodbutton} className={`${feod ? "filteractive" : "filterinactive"} DimensionsEnd eventbutton`} ></li>
              </Tippy>
              <Tippy content="Abyss" className="tooltip" >
                <li alt="Abyss" onClick={abyssbutton} className={`${abyss ? "filteractive" : "filterinactive"} AbyssButton eventbutton`} ></li>
              </Tippy>
              <Tippy content="Hunts" className="tooltip" >
                <li alt="Hunts" onClick={huntsbutton} className={`${hunt ? "filteractive" : "filterinactive"} Hunts eventbutton`} ></li>
              </Tippy>
              <Tippy content="Heretic" className="tooltip" >
                <li alt="Heretic" onClick={hereticbutton} className={`${heretic ? "filteractive" : "filterinactive"} HereticButton eventbutton`} ></li>
              </Tippy>
              <Tippy content="Raid" className="tooltip" >
                <li alt="Raid" onClick={raidbutton} className={`${raid ? "filteractive" : "filterinactive"} RaidButton eventbutton`} ></li>
              </Tippy>
              <Tippy content="Mission Dungeon" className="tooltip" >
                <li alt="Mission Dungeon" onClick={dungeonbutton} className={`${dungeon ? "filteractive" : "filterinactive"} MissionDungeon eventbutton`} ></li>
              </Tippy>
              <Tippy content="Boss Rush" className="tooltip" >
                <li alt="Boss Rush" onClick={rushbutton} className={`${bossrush ? "filteractive" : "filterinactive"} BossRush eventbutton`} ></li>
              </Tippy>
              <Tippy content="Six-Warrior Quests" className="tooltip" >
                <li alt="Six-Warrior Quests" onClick={sixmanbutton} className={`${sixman ? "filteractive" : "filterinactive"} SixMan eventbutton`} ></li>
              </Tippy>
              <Tippy content="Intersecting Wills" className="tooltip" >
                <li alt="Intersecting Wills" onClick={willsbutton} className={`${wills ? "filteractive" : "filterinactive"} EntangledWills eventbutton`} ></li>
              </Tippy>
              <Tippy content="Memorial Quests" className="tooltip" >
                <li alt="Memorial Quests" onClick={memorialbutton} className={`${memorial ? "filteractive" : "filterinactive"} Memorial eventbutton`} ></li>
              </Tippy>
            </ul>
            <div className="similarbanner">Additional Events</div>
            <ul className="eventtypes">
              <Tippy content="Upcoming JP" className="tooltip" >
                <li alt="Upcoming JP" onClick={jponlybutton} className={`${jponly ? "filteractive" : "filterinactive"} JPOnly eventbutton`} ></li>
              </Tippy>
              <Tippy content="Past Events" className="tooltip" >
                <li alt="Past Events" onClick={pastbutton} className={`${pastevents ? "filteractive" : "filterinactive"} PastEvents eventbutton`}></li>
              </Tippy>
            </ul>
            <div className="similarbanner">Refine</div>
            <div className="typeholder">
              <Select
                defaultValue={Typesearch != "" ? { value: Typesearch, label: Typesearch } : null}
                key={Typesearch}
                isSearchable={true}
                placeholder="Character Select..."
                className='typecontainer'
                classNamePrefix="typetext"
                onChange={characterSelect}
                options={typeListArray}
                isClearable={true}
              />
            </div>
            <div className="search-reverse-holder">
              <div className="search-holder">
                <IoSearch className="innersearchicon" />
                <input
                  className="search-bar"
                  type="text"
                  id="search2"
                  placeholder="Event Name"
                  value={searchdisplay}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
                {searchTerm === "" ? "" :
                  <IoMdCloseCircleOutline onClick={clearSearch} className="clearsearch"></IoMdCloseCircleOutline>}
              </div>
              <Tippy content="Reverse Order" className="tooltip" >
                <div className={`reversebox`} ><i onClick={reversebutton} className={`reversebutton ${loop ? "flip" : ""}`} ><ImSortAmountAsc className={`reversebutton ${reverse ? "" : "nodisplay"}`} /><ImSortAmountDesc className={`reversebutton ${reverse ? "nodisplay" : ""}`} /></i></div>
              </Tippy>
            </div>
            <div>
              <CopyToClipboard text={url}>
                <div className="sharebox">
                  <Tippy content="Link Copied!" inertia={true} animation={"shift-away"} touch={true} arrow={false} trigger={"click"} placement={"top"} duration={[100, 500]}>
                    <div className="centertext"><FaShareSquare className="shareicon" />&nbsp;Share</div>
                  </Tippy>
                </div>
              </CopyToClipboard>
              <Tippy content="Reset Filters" className="tooltip" >
                <div onClick={resetbutton} className={`clearbox`} ><div className="makecenter">Reset&nbsp;<FaUndoAlt className={`clearbutton ${clearFilter ? "loop" : ""}`} ></FaUndoAlt></div></div>
              </Tippy>
            </div>
          </div>
          <span className="subtext">*featured characters at time of event</span>
        </div>
        }
        <ul className="bannertabs">
          <Link to={"../events"}>
            <li className={"active"} ><span className="gemselected" />Events</li>
          </Link>
          <Link to={"../events/banners"}>
            <li className={""} >Banners</li>
          </Link>
          <Link to={"../events/notices"}>
            <li className={""} >Notices</li>
          </Link>
          <Link to={"../events/forecast"}>
            <li className={""} >Forecast</li>
          </Link>
          <Link to={"../events/panels"}>
            <li className={""} >Panels</li>
          </Link>
          <Link to={"/events/calendar"}>
            <li className={""} >Calendar</li>
          </Link>
        </ul>
        <ul className="bannerholder">
          <div className="subtexttop">
            {displayBanner}
          </div>
          {events.length !== 0 ?
            events.map(events => (
              <EventListing
                key={events.eventindex}
                match={events}
                showbanner={false}
                permapage={false}
                EventGuideData={EventGuideData}
                master_index={master_index}
              />
            )) :
            <div className="subtextbottom">
              No results
              <br />
              <br />
              Try changing refinements or including JP / Past content
            </div>
          }
          {events.length !== 0 ?
            <div className="subtextbottom">
              {displayBanner}
            </div>
            : ""}
        </ul>
        {showLoadMore &&
          <div className="loadmore" onClick={loadMoreButton}> Load More </div>}
      </div>
    </div>
  );
}