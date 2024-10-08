import React, { useState, useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import Tippy from './components/TippyDefaults.js';
import CharacterWardrobeFormatting from './components/Characters/CharacterWardrobeFormatting.js';
import { getQuery, getQueryStringVal, useQueryParam } from './components/URLParams.js'
import { LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';

function Wardrobe({
  match,
  ProcessedCharacters,
  scrollPosition 
}){

  const rawData = Object.values(ProcessedCharacters).filter(self => self.ArtworkCount > 1)

  const passivelimit = 40

  const banerDisplayTerm = "wardrobes";

  const [showAll, setshowAll] = useState(getQueryStringVal("all") != null ? true : false);

  const [loop, setLoop] = useStateIfMounted(false);
  const [reverse, setReverse] = useState(getQueryStringVal("rev") != null ? true : false)
  const [searchTerm, setSearchTerm] = useState(getQueryStringVal("search") != null ? getQueryStringVal("search").toLowerCase() : "");
  const [condFilter, setCondFilter] = useState("");
  const [searchdisplay, setsearchdisplay] = useState(getQueryStringVal("search") != null ? getQueryStringVal("search") : "");
  const [filterResults, setFilterResults] = useState(rawData);
  const [searchResults, setSearchResults] = useState(rawData);
  const [limits, setLimits] = useState(passivelimit);
  const [listDisplay, setListDisplay] = useState(
    rawData && rawData.slice(0, passivelimit)
  );

  const [listLength, setListLength] = useState(listDisplay.length);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [displayBanner, setDisplayBanner] = useState(
    <>Displaying <span className="subtextgold">{listLength}</span> of <span className="subtextgold"> {rawData.length}</span> {banerDisplayTerm}</>
  );

  const [All, setAll] = useQueryParam("all", "");

  const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
  const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
  const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");
  const [Typesearch, setTypesearch] = useQueryParam("Char", "");
  const [JPsearch, setJPSearch] = useQueryParam("JP", "");
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

  //filter
  useEffect(() => {
    const filterholder = [];
    var total = 0
    var display = 0
    if (showAll == true) {
      filterholder.push(...Object.values(ProcessedCharacters));
    }
    if (showAll == false) {
      filterholder.push(...rawData);
    }

    // eslint-disable-next-line no-sparse-arrays
    const realmlabel = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , "Tactics", , , , , , , , , , "Type-0", , , , , , , , , , "CC", , , , , , , , , , "WOFF", "SOP"];

    const makeUnique = filterholder
      .filter(onlyUnique)
      .sort((a, b) =>
        reverse == false ?
          a.GLOrder - b.GLOrder :
          b.GLOrder - a.GLOrder);
    const searchit = makeUnique.filter((char) =>
      `${char.CharacterName} ${char.JPName} realm-${realmlabel[char.RealmPars]}`.toLowerCase().includes(searchTerm)
    );
    setFilterResults(makeUnique);
    searchit.forEach(self=>{
      total += self.ArtworkCount - (showAll == true ? 0 :1) 
    })
    setSearchResults(searchit);
    const newlistdisplay = searchit.slice(0, limits);
    newlistdisplay.forEach(self=>{
      display += self.ArtworkCount - (showAll == true ? 0 :1)
    })
    if (limits < searchit.length) {
      setShowLoadMore(true);
      setListDisplay(newlistdisplay);
      setListLength(searchit.length);
      setDisplayBanner(
        <>Displaying <span className="subtextgold">{display}</span> of <span className="subtextgold"> {total}</span> {banerDisplayTerm}</>
      );
    } else {
      setShowLoadMore(false);
      setListDisplay(newlistdisplay);
      setListLength(newlistdisplay.length);
      setDisplayBanner(
        <>Displaying <span className="subtextgold">{display}</span> of <span className="subtextgold"> {total}</span> {banerDisplayTerm}</>
      );
    }
    // eslint-disable-next-line
  }, [showAll, limits, searchTerm, ProcessedCharacters, reverse])

  //buttons
  const allbutton = () => {
    setshowAll((prevValue) => !prevValue);
  };

  const reversebutton = () => {
    setLoop(true);
    setReverse((prevValue) => !prevValue);
    setTimeout(() => setLoop(false), 1000);
  };

  useEffect(() => {
    if (showAll == true) {
      setAll("true")
    } else {
      setAll("")
    }
    if (reverse == true) {
      setReversesearch("true")
    } else {
      setReversesearch("")
    }
  }, [setAll, showAll, setReversesearch, reverse])

  //load more
  const loadMoreButton = () => {
    const newlimits = limits + passivelimit;
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

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

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

  const listCharacters = listDisplay;

  return (
    <div>
      <Helmet>
        <title>Character Wardrobe Page - Dissidia Compendium</title>
        <meta property="og:site_name" content="Dissidia Compendium" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dissidiacompendium.com" />
        <meta name="description" content={`Character Wardrobe Page`} />
        <meta name="twitter:title" content={`Character Wardrobe Page`} />
        <meta name="twitter:description" content={`Character Wardrobe Page`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:image:alt" content={`Dissia Compendium`} />
        <meta property="og:title" content={`Character Wardrobe Page`} />
        <meta property="og:description" content={`Character Wardrobe skins`} />
        <meta property="og:url" content={`https://dissidiacompendium.com/characters/skins/wardrobe/`} />
      </Helmet>
      <div className="content">
        <h1 >Character Wardrobe Page</h1>
        <div className="filterholder noselect">
          <div className="search-reverse-holder">
            <div className="search-holder">
              <IoSearch className="innersearchicon" />
              <input
                className="search-bar"
                type="text"
                id="search"
                placeholder="Search Name"
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
          <div className="margeholder">
            <div className="Merge">
              <label htmlFor="search" className="MergeText">All Artwork?</label>
              <div key="mergecheck1" className={`${showAll == true ? "nodisplay" : `uncheck`}`} onClick={allbutton} />
              <div key="mergecheck2" className={`${showAll == true ? "check" : `nodisplay`}`} onClick={allbutton} />
            </div>
          </div>
        </div>
        <ul className="bannertabs">
          <Link to={`/characters/skins/wardrobe`}>
            <li className={"active"} ><span className="gemselected" />Wardrobes</li>
          </Link>
          <Link to={`/characters/skins/weapons`}>
            <li className={""} >Weapons</li>
          </Link>
        </ul>
        <div className="artworkholder">
          <div className="subtext">
            {displayBanner}
          </div>
          {listCharacters.length > 0 ? (
            listCharacters.map(char => (
              <LazyLoadComponent
              placeholder={<div className="charimagetoptopholder padd5"/>}
              key={char.CharID} 
              scrollPosition={scrollPosition}
              >
              <CharacterWardrobeFormatting 
              key={char.CharID} 
              match={char} 
              all={showAll} 
              />
              </LazyLoadComponent>
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
  )
}
export default trackWindowScroll(Wardrobe)