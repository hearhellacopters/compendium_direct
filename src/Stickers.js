import React, {useState, useEffect} from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import { Link } from 'react-router-dom'
import './Spheres.css';
import Tippy from './formatting/TippyDefaults.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import { slice, concat, } from 'lodash';
import { Helmet } from 'react-helmet-async';
import Select from 'react-select';
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5'; 
import { FaUndoAlt } from 'react-icons/fa'; 
import { getQuery, getQueryStringVal, useQueryParam } from './processing/urlparams'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaShareSquare } from 'react-icons/fa';

const Stickers = ({ProcessedStickers, ProcessedCharacters}) => {

  const StickerLimit = 25;

  const rawData = ProcessedStickers;

  const banerDisplayTerm = "stickers";

  const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null  ? true : false);
  const [clearFilter, setclearFilter] = useStateIfMounted(false);

  const [animated, setanimated] = useState(getQueryStringVal("animated") != null  ? true : false);

  const [loop, setLoop] = useStateIfMounted(false);
  const [reverse, setReverse] = useState(getQueryStringVal("rev") != null  ? true : false);
  const [searchTerm, setSearchTerm] = useState(getQueryStringVal("search") != null  ? getQueryStringVal("search").toLowerCase() : "");
  const [condFilter, setCondFilter] = useState("")
  const [searchdisplay, setsearchdisplay] = useState(getQueryStringVal("search") != null ? getQueryStringVal("search") : "");
  const [filterResults, setFilterResults] = useState(rawData);
  const [searchResults, setSearchResults] = useState(rawData);
  const [limits, setLimits] = useState(StickerLimit);
  const [listDisplay, setListDisplay] = useState(
    slice(rawData, 0, StickerLimit)
  );

  const [listLength, setListLength] = useState(listDisplay.length);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [displayBanner, setDisplayBanner] = useState(
    <>Displaying <span className="subtextgold">{listLength}</span> of <span className="subtextgold"> {rawData.length}</span> {banerDisplayTerm}</>
  );


  const [animatedsearch, setanimatedsearch] = useQueryParam("animated", "");
  const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
  const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
  const [Typesearch, setTypesearch] = useQueryParam("Char", "");
  const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");
  const { protocol, pathname, host } = window.location;
  const query = getQuery();
  const url = `${protocol}//${host}${pathname}?${query.toString()}`;

  useEffect(() => {
    //type params
    if(getQueryStringVal("Char") != null){
      const filteredtype = ProcessedCharacters.filter(function (ef) {
        const newfilterpull = ef["CharacterName"] === getQueryStringVal("Char");
        return newfilterpull;
      })
      if(filteredtype.length != 0){
        setTypesearch(getQueryStringVal("Char"))
        setCondFilter(filteredtype[0].CharID)
      } else{
        setTypesearch("")
        setCondFilter("")
      }
    }
  },[setTypesearch,ProcessedCharacters])

    useEffect(() => {
    //filter params
    if(getQueryStringVal("filter") == "true"){
      setShowFilter(true)
      setFiltersearch("true")
    } 
  },[setFiltersearch])

    useEffect(() => {
    //search params
    if(getQueryStringVal("search") != null){
      setSearchTerm(getQueryStringVal("search") != null  ? getQueryStringVal("search").toLowerCase() : "")
      setTEXTsearch(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
      setsearchdisplay(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
    }
  }, [setTEXTsearch])


  //filter
  useEffect(() => {
      const filterholder = [];
      if (animated === true) {
        const filteredout = rawData.filter(
          (stickers) => stickers["Animated"] == true
        );
        filterholder.push(...filteredout);
      }
  
      if (filterholder.length === 0) {
        filterholder.push(...rawData);
      }
  
        const makeUnique = filterholder
          .filter(onlyUnique)
          .sort((a, b) => 
          reverse === false ? 
          b.StickerKey - a.StickerKey:
          a.StickerKey - b.StickerKey);
        const searchit = makeUnique.filter((e) =>
          (`${e.Name} ${e.JPName}`).toLowerCase().includes(searchTerm)
        );
        const getcondfilter = searchit.filter(function (ef) {
          const newfilterpull = ef["CharID"] == condFilter;
          if(condFilter !== "") {
            return newfilterpull;
          } else {
            return ef
          }});
        setFilterResults(makeUnique);
        setSearchResults(getcondfilter);
        const newlistdisplay = slice(getcondfilter, 0, limits);
        if (limits < getcondfilter.length) {
          setShowLoadMore(true);
          setListDisplay(newlistdisplay);
          setListLength(getcondfilter.length);
          setDisplayBanner(
            <>Displaying <span className="subtextgold">{newlistdisplay.length}</span> of <span className="subtextgold"> {getcondfilter.length}</span> {banerDisplayTerm}</>
          );
        } else {
          setShowLoadMore(false);
          setListDisplay(newlistdisplay);
          setListLength(newlistdisplay.length);
          setDisplayBanner(
            <>Displaying <span className="subtextgold">{newlistdisplay.length}</span> of <span className="subtextgold"> {newlistdisplay.length}</span> {banerDisplayTerm}</>
          );
        }
  }, [limits,rawData,searchTerm,clearFilter, animated, condFilter, reverse]);


  //buttons
  const animatedbutton = () => {
    if (animated == false) {
      setanimatedsearch("true")
    } else {
      setanimatedsearch("")
    }
    setanimated((prevValue) => !prevValue);
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

    //type selector
    const CondSelect = (e) => {
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
    const newlimits = limits + StickerLimit;
    const newLoadMore = searchResults.length > newlimits;
    const newlistdisplay = concat(
      listDisplay,
      slice(searchResults, limits, newlimits)
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

  const getCharName = (CharID) => {
    const charactermap = ProcessedCharacters.filter(function (ef) {
      const getchar = ef["CharID"] === CharID
      return getchar
    })
      return charactermap[0].CharacterName
  }   

    //type list
    const typeList = Object.values(rawData).map((item) => item.CharID);
    const typeListUnique = typeList
      .filter(onlyUnique)
      .sort()
      .filter(function (el) {
        return el !== undefined;
      });
  
    const typeListArray = typeListUnique.map((typeListUnique) => ({
      value: getCharName(typeListUnique),
      label: getCharName(typeListUnique),
      id: typeListUnique,
    }));

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

  const resetbutton = () =>{
    setclearFilter(true);
    setReverse(false)
    setanimated(false);
    setsearchdisplay("");
    setSearchTerm("");
    setCondFilter("")

    setReversesearch("")
    setanimatedsearch("")
    setTypesearch("")
    setTEXTsearch("")

    setTimeout(() => setclearFilter(false), 1000);
  }

  const showfilterbutton = () => {
    if (showFilter == false) {
      setFiltersearch("true")
    } else {
      setFiltersearch("")
    }
    setShowFilter((prevValue) => !prevValue);
  }

  const listSpheres = listDisplay;

  const onclick = (Voice) =>{
    try {
    const myAudioElement = new Audio (`https://dissidiacompendium.com/images/static/stamps/audio/${Voice}.mp3`)
      myAudioElement.addEventListener("canplaythrough", (event) => {
        /* the audio is now playable; play it if permissions allow */
        myAudioElement.play();
      });
    } catch (error) {
      console.log(error)
    }
}

    return (
      <div className="wrapper">
        <Helmet>
          <title>Stickers - Dissidia Compendium</title>
          <meta property="og:site_name" content="Dissidia Compendium"/>
          <meta property="og:type" content="website" />
          <meta name="description" content="Stickers Search"/>
          <meta name="twitter:title" content="Stickers Search"/>
          <meta name="twitter:description" content="Stickers Search"/>
          <meta property="og:title" content="Stickers Search"/>
          <meta property="og:description" content="Spheres Search"/>
          <meta property="og:url" content="https://dissidiacompendium.com/search/stickers"/>
        </Helmet>
            <div className="content">
              <h1  >Stickers</h1>
              <div className="subheader">Use filters to limit returns</div>
              <div className="charfilterspacer"/>
              <div key="filter1" onClick={showfilterbutton} className="charfilter"><span className="filterstext"></span>{showFilter ? <TiArrowSortedUp className="uparrow"/> : <TiArrowSortedDown className="downarrow"/>}</div>
              {showFilter == false ? 
              <div className="char-search-reverse-holder">
                <IoSearch className="searchicon"/>
              <div className="search-holder">
                <input 
                    className="char-search-bar" 
                    type="text"
                    placeholder="Name Search"
                    value={searchdisplay}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                {searchTerm === "" ? "" : 
                <IoMdCloseCircleOutline onClick={clearSearch} className="clearsearch"></IoMdCloseCircleOutline>}
                </div>
                </div>
              :""
              }
                <div className="filterholder noselect" id={showFilter ? "showfilteren" : "hiddenfilteren"}>
                  <div className="similarbanner">Multiple filters can be active</div>
                    <div className="filterholderflair">
                      <ul className="bufftypes">
                        <li className={`${animated ? "filteractive": "filterinactive"} buffbutton gifbutton`} onClick={animatedbutton}></li>
                      </ul>                      
                      <div className="similarbanner">Refine</div>
                      <div className="typeholder">
                        <Select
                        defaultValue={Typesearch != "" ? {value: Typesearch, label: Typesearch } : null}
                        key={Typesearch}
                        isSearchable={true} 
                        placeholder="Character Select..."
                        className='typecontainer' 
                        classNamePrefix="typetext" 
                        onChange={CondSelect}  
                        options={typeListArray} 
                        isClearable={true}
                        />
                      </div>
                      <div className="search-reverse-holder">
                        <div className="search-holder">
                        <IoSearch className="innersearchicon"/>
                          <input 
                              className="search-bar" 
                              type="text"
                              placeholder="Name Search"
                              value={searchdisplay}
                              onChange={handleChange}
                              onKeyDown={handleKeyDown}
                          />
                          {searchTerm === "" ? "" : 
                          <IoMdCloseCircleOutline onClick={clearSearch} className="clearsearch"></IoMdCloseCircleOutline>}
                        </div>
                        <Tippy content="Reverse Order" className="tooltip" >
                          <div className={`reversebox`} ><i onClick={reversebutton} className={`reversebutton ${loop ? "flip": ""}`} ><ImSortAmountDesc className={`reversebutton ${reverse ? "": "nodisplay"}`}/><ImSortAmountAsc className={`reversebutton ${reverse ? "nodisplay": ""}`}/></i></div>
                        </Tippy>
                         </div>
                         <div>
                          <CopyToClipboard text={url}>
                            <div className="sharebox">
                                <Tippy content="Link Copied!" inertia={true} animation={"shift-away"} touch={true} arrow={false} trigger={"click"} placement={"top"} duration={[100,500]}>
                                    <div className="centertext"><FaShareSquare className="shareicon"/>&nbsp;Share</div>
                                </Tippy>
                            </div>
                            </CopyToClipboard>
                            <Tippy content="Reset Filters" className="tooltip" >
                              <div onClick={resetbutton} className={`clearbox`} ><div className="makecenter">Reset&nbsp;<FaUndoAlt  className={`clearbutton ${clearFilter ? "loop": ""}`} ></FaUndoAlt></div></div>
                            </Tippy>
                          </div>
                    </div>
                  </div>
              <ul className="bannertabs">
                <Link to={`/search/buffs`}>
                  <li className={""} >Buffs</li>
                </Link>
                <Link to={`/search/abilities`}>
                  <li className={""} >Abilities</li>
                </Link>
                <Link to={`/search/gear`}>
                  <li className={""} >Gear</li>
                </Link>
                <Link to={`/search/passives`}>
                  <li className={""} >Passives</li>
                </Link>
                <Link to={`/search/spheres`}>
                  <li className={""} >Spheres</li>
                </Link>
                <Link to={`/search/stickers`}>
                  <li className={"active"} ><span className="gemselected"/>Stickers</li>
                </Link>
                <Link to={`/search/music`}>
                  <li className={""} >Music</li>
                </Link>
              </ul>
              <div className="buffsholder">
                <div className="subtext">
                  {displayBanner}
                </div>
              {listSpheres.length > 0 ?  (
              listSpheres.map(stickers =>(
                <div key={stickers.StickerKey} className="buffunit">
                <div className="infoholder">
                    <div className="infonameholder clicky Nocolorbanner" onClick={()=> onclick(stickers.Voice)}>
                        {stickers.Name} ►
                        <div className="abilityJPname">{stickers.JPName}
                        </div>
                    </div>
                    <div className="infobase stamppadding Nocolorbase">
                        {stickers.IconGL == undefined ? null :
                        <img className="stampsicon clicky" onClick={()=> onclick(stickers.Voice)} style={stickers.BackgroundColor != null ? { background: `${stickers.BackgroundColor}`} : {background: null}} alt={stickers.Name} src={`https://dissidiacompendium.com/images/static/stamps/GL/${stickers.IconGL}${stickers.Animated == true ? ".gif" : ".png"}`}></img>}
                        {stickers.IconJP == undefined ? null :
                        <img className="stampsicon clicky" onClick={()=> onclick(stickers.Voice)} style={stickers.BackgroundColor != null ? { background: `${stickers.BackgroundColor}`} : {background: null}} alt={stickers.JPName} src={`https://dissidiacompendium.com/images/static/stamps/JP/${stickers.IconJP}${stickers.Animated == true ? ".gif" : ".png"}`}></img>}
                    </div>
                </div>
            </div>
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
export default Stickers;