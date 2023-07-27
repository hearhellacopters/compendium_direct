import React, { useState, useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import { useDispatch } from "react-redux";
import { setFalse, setTrue } from './redux/ducks/jptoggle'
import Tippy from './components/TippyDefaults.js';
import { Helmet } from 'react-helmet-async';
import Select from 'react-select';
import { Link } from 'react-router-dom'
import BannersFormatting from './components/Events/BannersFormatting.js'
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
  ProcessedBanners, 
  ProcessedCharacters, 
  jptoggledata 
}){

  const dispatch = useDispatch();

  const startinglimit = 15;

  const banerDisplayTerm = "banners";

  const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null ? true : false);
  const [clearFilter, setclearFilter] = useStateIfMounted(false);

  const [jponly, setJPonly] = useState(jptoggledata);
  const [pastevents, setPastEvents] = useState(getQueryStringVal("past") != null ? true : false);
  const [prefilterlist, setPrefilterlist] = useState([])
  const [reverse, setReverse] = useState(getQueryStringVal("rev") != null ? true : false);

  const [rawData, setrawData] = useState(ProcessedBanners)

  //prefilter
  useEffect(() => {
    const filterholder = [];
    if (pastevents === false) {

      if (jponly === false) {
        //gl
        const filteredevents = ProcessedBanners.filter((item) => {
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
        const filteredevents = ProcessedBanners.filter((item) => {
          return new Date().getTime() <= new Date(item.JPoutdate)
        }).filter((item) => {
          return item.url1 != "https://dissidiacompendium.com/images/static/banners/jp/pull/stl_banner_l_g_tex_temp1out.png"
        }).sort((a, b) => reverse ? new Date(a.JPindate).getTime() - new Date(b.JPindate).getTime() : new Date(b.JPindate).getTime() - new Date(a.JPindate).getTime());
        filterholder.push(...filteredevents);
        setrawData(filterholder);

      }

    } else {

      if (jponly === false) {
        const filteredevents = ProcessedBanners.filter(item=>item.tempdate === false).sort((a, b) => reverse ? new Date(b.indate).getTime() - new Date(a.indate).getTime() : new Date(a.indate).getTime() - new Date(b.indate).getTime())
        setrawData(filteredevents);
      } else {
        const filteredevents = ProcessedBanners.sort((a, b) => reverse ? b.bannerindex - a.bannerindex : a.bannerindex - b.bannerindex)
        setrawData(filteredevents);
      }

    }
  }, [ProcessedBanners, jponly, pastevents, reverse]);

  const [events, setEvents] = useState(getQueryStringVal("event") != null ? true : false);
  const [story, setStory] = useState(getQueryStringVal("story") != null ? true : false);
  const [campaign, setCampaign] = useState(getQueryStringVal("campaign") != null ? true : false);
  const [special, setSpecial] = useState(getQueryStringVal("special") != null ? true : false);
  const [weekly, setWeekly] = useState(getQueryStringVal("weekly") != null ? true : false);

  const [loop, setLoop] = useStateIfMounted(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchdisplay, setsearchdisplay] = useState("");
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

  const [eventssearch, setEventssearch] = useQueryParam("event", "");
  const [storysearch, setStorysearch] = useQueryParam("story", "");
  const [campaignsearch, setCampaignsearch] = useQueryParam("campaign", "");
  const [specialsearch, setSpecialsearch] = useQueryParam("special", "");
  const [weeklysearch, setWeeklysearch] = useQueryParam("weekly", "");
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

  useEffect(() => {
    const filterholder = [];
    if (events === true) {
      const filteredout = rawData.filter(
        (event) => event["type"] == "Event"
      );
      filterholder.push(...filteredout);
    }
    if (story === true) {
      const filteredout = rawData.filter(
        (event) => event["type"] == "Story"
      );
      filterholder.push(...filteredout);
    }
    if (campaign === true) {
      const filteredout = rawData.filter(
        (event) => event["type"] == "Campaign"
      );
      filterholder.push(...filteredout);
    }
    if (special === true) {
      const filteredout = rawData.filter(
        (event) => event["type"] == "Special"
      );
      filterholder.push(...filteredout);
    }
    if (weekly === true) {
      const filteredout = rawData.filter(
        (event) => event["type"] == "Weekly"
      );
      filterholder.push(...filteredout);
    }
    if (![events, story, campaign, special, weekly].includes(true)) {
      filterholder.push(...rawData);
    }

    const makeUnique = filterholder.filter(onlyUnique)
    const searchit = makeUnique.filter((events) =>
      events.name.toLowerCase().includes(searchTerm)
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
  }, [limits, rawData, searchTerm, clearFilter, events, story, campaign, special, weekly, jponly, pastevents, condFilter, reverse, prefilterlist]);

  const eventsbutton = () => {
    if (events == false) {
      setEventssearch("true")
    } else {
      setEventssearch("")
    }
    setEvents((prevValue) => !prevValue);
  };
  const storybutton = () => {
    if (story == false) {
      setStorysearch("true")
    } else {
      setStorysearch("")
    }
    setStory((prevValue) => !prevValue);
  };
  const campaignbutton = () => {
    if (campaign == false) {
      setCampaignsearch("true")
    } else {
      setCampaignsearch("")
    }
    setCampaign((prevValue) => !prevValue);
  };
  const specialbutton = () => {
    if (special == false) {
      setSpecialsearch("true")
    } else {
      setSpecialsearch("")
    }
    setSpecial((prevValue) => !prevValue);
  };
  const weeklybutton = () => {
    if (weekly == false) {
      setWeeklysearch("true")
    } else {
      setWeeklysearch("")
    }
    setWeekly((prevValue) => !prevValue);
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

  const resetbutton = () => {
    setclearFilter(true);
    setReverse(false)
    setPastEvents(false);
    setEvents(false);
    setStory(false);
    setCampaign(false);
    setSpecial(false);
    setWeekly(false);

    setEventssearch("")
    setStorysearch("")
    setCampaignsearch("")
    setSpecialsearch("")
    setWeeklysearch("")
    setPastEventssearch("")
    setReversesearch("")
    setTEXTsearch("")
    setTypesearch("")

    setsearchdisplay("");
    setSearchTerm("");
    setCondFilter("")
    setTimeout(() => setclearFilter(false), 1000);
  }

  const banners = listDisplay;

  return (
    <div>
      <Helmet>
        <title>Banners Search - Dissidia Compendium</title>
        <meta property="og:site_name" content="Dissidia Compendium" />
        <meta name="description" content="Search every banner in a complete game timeline!" />
        <meta name="twitter:title" content="Banners Search - Dissidia Compendium" />
        <meta property="og:type" content="website" />
        <meta name="twitter:description" content="Search every banner in a complete game timeline!" />
        <meta property="og:title" content="Banners Search - Dissidia Compendium" />
        <meta property="og:description" content="Search every banner in a complete game timeline!" />
        <meta property="og:url" content="https://dissidiacompendium.com/events/banners" />
      </Helmet>
      <div className="content">
        <h1>{jponly == false ? "GL " : "JP "}Banners</h1>
        <div className="subheader">Use filters to limit returns</div>
        <div className="charfilterspacer" />
        <div onClick={showfilterbutton} className="charfilter" id={showFilter ? "filteropen" : "filterclosed"}><span className="filterstext"></span>{showFilter ? <TiArrowSortedUp className="uparrow" /> : <TiArrowSortedDown className="downarrow" />}</div>
        {showFilter == false ?
          <div className="event-search-reverse-holder">
            <span className={`${jptoggledata ? "jponlybackground" : "GLonlybackground"}`}>
              <Tippy content={`${jptoggledata ? "Switch to GL" : "Switch to JP"}`} className="tooltip" >
                <span onClick={jponlybutton} className={`${jptoggledata ? "jpflage jpsmallinactive smalleventbutton" : "glflage smalleventbutton"}`} />
              </Tippy>
            </span>
            <IoSearch className="searchicon" />
            <div className="search-holder el">
              <input
                className="char-search-bar"
                type="text"
                name="Search"
                id="search"
                placeholder="Banner Name"
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
            <ul className="bannertypes">
              <li alt="Events" onClick={eventsbutton} className={`${events ? "filteractive" : "filterinactive"} EventsBanner bannerbutton`}></li>
              <li alt="Story" onClick={storybutton} className={`${story ? "filteractive" : "filterinactive"} Story bannerbutton`} ></li>
              <li alt="Campaign" onClick={campaignbutton} className={`${campaign ? "filteractive" : "filterinactive"} Campaign bannerbutton`} ></li>
              <li alt="Special" onClick={specialbutton} className={`${special ? "filteractive" : "filterinactive"} Special bannerbutton`} ></li>
              <li alt="Weekly" onClick={weeklybutton} className={`${weekly ? "filteractive" : "filterinactive"} Weekly bannerbutton`} ></li>
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
                  placeholder="Banner Name"
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
          <Link to={"/events"}>
            <li className={""} >Events</li>
          </Link>
          <Link to={"../events/banners"}>
            <li className={"active"} ><span className="gemselected" />Banners</li>
          </Link>
          <Link to={"../events/missions?panels=true"}>
              <li className={""} >Missions</li>
          </Link>
          <Link to={"../events/notices"}>
            <li className={""} >Notices</li>
          </Link>
          <Link to={"/events/forecast"}>
            <li className={""} >Forecast</li>
          </Link>
          <Link to={"/events/calendar"}>
            <li className={""} >Calendar</li>
          </Link>
        </ul>
        <ul className="bannerholder">
          <div className="subtexttop">
            {displayBanner}
          </div>
          {banners.length !== 0 ?
            banners.map(events => (
              <BannersFormatting key={events.bannerindex} match={events} showbanner={false} permapage={false} />
            )) :
            <div className="subtextbottom">
              No results
              <br />
              <br />
              Try changing refinements or including JP / Past content
            </div>
          }
          {banners.length !== 0 ?
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
