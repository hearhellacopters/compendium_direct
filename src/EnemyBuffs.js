import React, { useState, useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import { Link } from 'react-router-dom'
import './Buffs.css';
import Tippy from './components/TippyDefaults.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import AilmentDataFormattingEnemy from './components/Enemy/Buff_Handler/AilmentDataFormattingEnemy';
import { Helmet } from 'react-helmet-async';
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { FaUndoAlt } from 'react-icons/fa'
import { getQuery, getQueryStringVal, useQueryParam } from './components/URLParams'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaShareSquare } from 'react-icons/fa';

export default function EnemyBuffs({ 
  ProcessedEnemyBuffs 
}){

  const startinglimit = window.innerWidth <= 815 ? 30 : 50;

  const rawData = ProcessedEnemyBuffs;

  const banerDisplayTerm = "buffs";

  const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null ? true : false);
  const [clearFilter, setclearFilter] = useStateIfMounted(false);

  const [buffs, setBuffs] = useState(getQueryStringVal("buffs") != null ? true : false);
  const [debuffs, setDebuffs] = useState(getQueryStringVal("debuffs") != null ? true : false);

  const [loop, setLoop] = useStateIfMounted(false);
  const [reverse, setReverse] = useState(getQueryStringVal("rev") != null ? true : false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchdisplay, setsearchdisplay] = useState("");
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

  const [buffssearch, setBuffssearch] = useQueryParam("buffs", "");
  const [debuffssearch, setDebuffssearch] = useQueryParam("debuffs", "");
  const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
  const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
  const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");
  const { protocol, pathname, host } = window.location;
  const query = getQuery();
  const url = `${protocol}//${host}${pathname}?${query.toString()}`


  useEffect(() => {
    //search params
    if (getQueryStringVal("search") != null) {
      setSearchTerm(getQueryStringVal("search") != null ? getQueryStringVal("search").toLowerCase() : "")
      setTEXTsearch(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
      setsearchdisplay(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
    }
  }, [setTEXTsearch, setFiltersearch])


  //unique
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  //filter
  useEffect(() => {
    const filterholder = [];

    if (debuffs == false && buffs == true) {
      const filteredout = rawData.filter(
        (enemies) => enemies["is_buff"] == 1
      );
      filterholder.push(...filteredout);
    }
    if (debuffs == true && buffs == false) {
      const filteredout = rawData.filter(
        (enemies) => enemies["is_buff"] === 0
      );
      filterholder.push(...filteredout);
    }

    if (debuffs == false && buffs == false) {
      filterholder.push(...rawData)
    }
    if (debuffs == true && buffs == true) {
      filterholder.push(...rawData)
    }

    if (filterholder.length === 0) {
      filterholder.push(...rawData);
    }

    const makeUnique = filterholder
      .sort((a, b) =>
        reverse === false ?
          a.id - b.id :
          b.id - a.id);
    const searchit = makeUnique.filter((e) =>
      (`${e.name && e.name} ${e.jpname} #${e.id}`).toLowerCase().includes(searchTerm)
    );
    setFilterResults(makeUnique);
    setSearchResults(searchit);
    const newlistdisplay = searchit.slice(0, limits);
    if (limits < searchit.length) {
      setShowLoadMore(true);
      setListDisplay(newlistdisplay);
      setListLength(searchit.length);
      setDisplayBanner(
        <>Displaying <span className="subtextgold">{newlistdisplay.length}</span> of <span className="subtextgold"> {searchit.length}</span> {banerDisplayTerm}</>
      );
    } else {
      setShowLoadMore(false);
      setListDisplay(newlistdisplay);
      setListLength(newlistdisplay.length);
      setDisplayBanner(
        <>Displaying <span className="subtextgold">{newlistdisplay.length}</span> of <span className="subtextgold"> {newlistdisplay.length}</span> {banerDisplayTerm}</>
      );
    }
  }, [limits, rawData, searchTerm, clearFilter, buffs, debuffs, reverse]);

  //buttons
  const buffsbutton = () => {
    if (buffs == false) {
      setBuffssearch("true")
      setDebuffssearch("")
      setDebuffs(false)
    }
    if (buffs == true) {
      setBuffssearch("")
      setDebuffssearch("")
    }
    setBuffs((prevValue) => !prevValue);
  };
  const debuffsbutton = () => {
    if (debuffs == false) {
      setDebuffssearch("true")
      setBuffssearch("")
      setBuffs(false)
    } else {
      setDebuffssearch("")
      setBuffssearch("")
    }
    setDebuffs((prevValue) => !prevValue);
  };

  const showfilterbutton = () => {
    if (showFilter == false) {
      setFiltersearch("true")
    } else {
      setFiltersearch("")
    }
    setShowFilter((prevValue) => !prevValue);
  }

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



  //search bar
  const handleChange = (e) => {
    setsearchdisplay(e.target.value)
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
    setclearFilter(true);
    setReverse(false)
    setDebuffs(false);
    setDebuffs(false);

    setBuffssearch("")
    setDebuffssearch("")
    setReversesearch("")
    setTEXTsearch("")

    setsearchdisplay("");
    setSearchTerm("");
    setTimeout(() => setclearFilter(false), 1000);
  }

  const listBuff = listDisplay;

  return (
    <div>
      <Helmet>
        <title>Enemy Buffs - Dissidia Compendium</title>
        <meta property="og:site_name" content="Dissidia Compendium" />
        <meta property="og:type" content="website" />
        <meta name="description" content="Enemy Buffs Search" />
        <meta name="twitter:title" content="Enemy Buffs Search" />
        <meta name="twitter:description" content="Enemy Buffs Search" />
        <meta property="og:title" content="Enemy Buffs Search" />
        <meta property="og:description" content="Enemy Buffs Search" />
        <meta property="og:url" content="https://dissidiacompendium.com/bestiary/buffs" />
      </Helmet>
      <div className="content">
        <h1  >Enemy Buffs</h1>
        <div className="subheader">Use filters to limit returns</div>
        <div className="charfilterspacer" />
        <div key="filter1" onClick={showfilterbutton} className="charfilter"><span className="filterstext"></span>{showFilter ? <TiArrowSortedUp className="uparrow" /> : <TiArrowSortedDown className="downarrow" />}</div>
        {showFilter == false ?
        <div className="char-search-reverse-holder">
          <IoSearch className="searchicon" />
          <div className="search-holder el">
            <input
              className="char-search-bar"
              type="text"
              id="search"
              placeholder="Buff Name / Effects"
              value={searchdisplay}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            {searchTerm === "" ? "" :
              <IoMdCloseCircleOutline onClick={clearSearch} className="clearsearch"></IoMdCloseCircleOutline>}
          </div>
        </div>
        : 
        <div className="filterholder noselect" id={showFilter ? "showfilteren" : "hiddenfilteren"}>
          <div className="similarbanner">Refine</div>
          <div className="filterholderflair">
            <ul className="bufftypes">
              <li className={`${buffs ? "filteractive" : "filterinactive"} buffsbutton buffsButton`} onClick={buffsbutton}></li>
              <li className={`${debuffs ? "filteractive" : "filterinactive"} buffsbutton debuffsButton`} onClick={debuffsbutton}></li>
            </ul>
            <br />
            <div className="search-reverse-holder">
              <div className="search-holder">
                <IoSearch className="innersearchicon" />
                <input
                  className="search-bar"
                  type="text"
                  id="search2"
                  placeholder="Buff Name / Effects"
                  value={searchdisplay}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
                {searchTerm === "" ? "" :
                  <IoMdCloseCircleOutline onClick={clearSearch} className="clearsearch"></IoMdCloseCircleOutline>}
              </div>
              <Tippy content="Reverse Order" className="tooltip" >
                <div className={`reversebox`} ><i onClick={reversebutton} className={`reversebutton ${loop ? "flip" : ""}`} ><ImSortAmountDesc className={`reversebutton ${reverse ? "" : "nodisplay"}`} /><ImSortAmountAsc className={`reversebutton ${reverse ? "nodisplay" : ""}`} /></i></div>
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
          <span className="subtext">Strength of buff is determined by ability</span>
        </div>
        }
        {showFilter == true ? "" :
          <div className="subtext2 ">Strength of buff is determined by ability</div>
        }
        <ul className="bannertabs">
          <Link to={`/bestiary/enemies`}>
            <li className={""} >Enemies</li>
          </Link>
          <Link to={`/bestiary/abilities`}>
            <li className={""} >Abilities</li>
          </Link>
          <Link to={`/bestiary/buffs`}>
            <li className={"active"} ><span className="gemselected" />Buffs</li>
          </Link>
        </ul>
        <div className="nonenemyholder enemyholderstyling">
          <div className="subtext">
            {displayBanner}
          </div>
          {listBuff.length > 0 ? (
            listBuff.map(buffs => (
              <AilmentDataFormattingEnemy
                key={buffs.id}
                ailment_data={buffs}
                enemy_space={false}
              />
            ))) : (
            <div>No results</div>
          )}
          <div className="subtextbottom">
            {displayBanner}
          </div>
          {showLoadMore &&
            <div className="loadmore" onClick={loadMoreButton}> Load More </div>}
        </div>
      </div>
    </div>
  );
}