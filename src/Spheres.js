import React, {useState, useEffect} from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import { Link } from 'react-router-dom'
import './Spheres.css';
import Tippy from './formatting/TippyDefaults.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import { slice, concat, } from 'lodash';
import SpheresFormatting from './formatting/SpheresFormatting.js'
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

const Spheres = ({ProcessedSpheres}) => {

  const dSphereslimit = window.innerWidth <= 815 ? 25 : 50;

  //  const error = ProcessedSpheres.filter(function (ef) {
  //  const newfilterpull = ef["JPName"] == '';
  //  return newfilterpull;
  //})
  //
  //console.log(error)
  
  const rawData = ProcessedSpheres;

  const banerDisplayTerm = "spheres";

  const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null  ? true : false);
  const [clearFilter, setclearFilter] = useStateIfMounted(false);

  const [aSpheres, setASpheres] = useState(getQueryStringVal("A") != null  ? true : false);
  const [bSpheres, setBSpheres] = useState(getQueryStringVal("B") != null  ? true : false);
  const [cSpheres, setCSpheres] = useState(getQueryStringVal("C") != null  ? true : false);
  const [dSpheres, setDSpheres] = useState(getQueryStringVal("D") != null  ? true : false);
  const [eSpheres, setESpheres] = useState(getQueryStringVal("E") != null  ? true : false);

  const [exSpheres, setEXSpheres] = useState(getQueryStringVal("EX") != null  ? true : false);
  const [rfSpheres, setRFSpheres] = useState(getQueryStringVal("Refine") != null  ? true : false);

  const [loop, setLoop] = useStateIfMounted(false);
  const [reverse, setReverse] = useState(getQueryStringVal("rev") != null  ? true : false);
  const [searchTerm, setSearchTerm] = useState(getQueryStringVal("search") != null  ? getQueryStringVal("search").toLowerCase() : "");
  const [condFilter, setCondFilter] = useState(getQueryStringVal("cond") != null  ? getQueryStringVal("cond") : "");
  const [searchdisplay, setsearchdisplay] = useState(getQueryStringVal("search") != null ? getQueryStringVal("search") : "");
  const [filterResults, setFilterResults] = useState(rawData);
  const [searchResults, setSearchResults] = useState(rawData);
  const [limits, setLimits] = useState(dSphereslimit);
  const [listDisplay, setListDisplay] = useState(
    slice(rawData, 0, dSphereslimit)
  );

  const [listLength, setListLength] = useState(listDisplay.length);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [displayBanner, setDisplayBanner] = useState(
    <>Displaying <span className="subtextgold">{listLength}</span> of <span className="subtextgold"> {rawData.length}</span> {banerDisplayTerm}</>
  );


  const [Asearch, setAsearch] = useQueryParam("A", "");
  const [Bsearch, setBsearch] = useQueryParam("B", "");
  const [Csearch, setCsearch] = useQueryParam("C", "");
  const [Dsearch, setDsearch] = useQueryParam("D", "");
  const [Esearch, setEsearch] = useQueryParam("E", "");
  const [Refinsearch, setRefinsearch] = useQueryParam("Refine", "");
  const [EXsearch, setEXsearch] = useQueryParam("EX", "");
  const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
  const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
  const [Typesearch, setTypesearch] = useQueryParam("cond", "");
  const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");
  const { protocol, pathname, host } = window.location;
  const query = getQuery();
  const url = `${protocol}//${host}${pathname}?${query.toString()}`;

  useEffect(() => {
    //type params
    if(getQueryStringVal("cond") != null){
      const filteredtype = ProcessedSpheres.filter(function (ef) {
        const newfilterpull = ef["SphereCond"] === getQueryStringVal("cond");
        return newfilterpull;
      })
      if(filteredtype.length != 0){
        setTypesearch(getQueryStringVal("cond"))
        setCondFilter(getQueryStringVal("cond"))
      } else{
        setTypesearch("")
        setCondFilter("")
      }
    }
  },[setTypesearch,ProcessedSpheres])
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
    if( exSpheres == true && rfSpheres == true || exSpheres == false && rfSpheres == false) {
      const filterholder = [];
      if (aSpheres === true) {
        const filteredout = rawData.filter(
          (spheres) => spheres["SphereLetter"] === "A"
        );
        filterholder.push(...filteredout);
      }
      if (bSpheres === true) {
        const filteredout = rawData.filter(
          (spheres) => spheres["SphereLetter"] === "B"
        );
        filterholder.push(...filteredout);
      }
      if (cSpheres === true) {
        const filteredout = rawData.filter(
          (spheres) => spheres["SphereLetter"] === "C"
        );
        filterholder.push(...filteredout);
      }
      if (dSpheres === true) {
        const filteredout = rawData.filter(
          (spheres) => spheres["SphereLetter"] === "D"
        );
        filterholder.push(...filteredout);
      }
      if (eSpheres === true) {
        const filteredout = rawData.filter(
          (spheres) => spheres["SphereLetter"] === "E"
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
          a.SphereKey - b.SphereKey:
          b.SphereKey - a.SphereKey);
        const searchit = makeUnique.filter((e) =>
          (`${e.SphereName} ${e.JPName} ${e.SphereCharacterName} ${e.SphereDesc == undefined ? "" :  e.SphereDesc.replace(/(<span class=")/gm,"").replace(/(">)/gm,"").replace(/(<\/span>)/gm,"").replace(/(upstat)/gm,"").replace(/(downstat)/gm,"").replace(/(unique)/gm,"").replace(/(values)/gm,"")}`).toLowerCase().includes(searchTerm)
        );
        const getcondfilter = searchit.filter(function (ef) {
          const newfilterpull = ef["SphereCond"] === condFilter;
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
    }
  }, [limits,rawData,searchTerm,clearFilter, aSpheres, bSpheres, cSpheres, dSpheres, eSpheres, exSpheres, rfSpheres, condFilter, reverse]);


  //buttons
  const aSpheresbutton = () => {
    if (aSpheres == false) {
      setAsearch("true")
    } else {
      setAsearch("")
    }
    setASpheres((prevValue) => !prevValue);
  };
  const bSpheresbutton = () => {
    if (bSpheres == false) {
      setBsearch("true")
    } else {
      setBsearch("")
    }
    setBSpheres((prevValue) => !prevValue);
  };
  const cSpheresbutton = () => {
    if (cSpheres == false) {
      setCsearch("true")
    } else {
      setCsearch("")
    }
    setCSpheres((prevValue) => !prevValue);
  };
  const dSpheresbutton = () => {
    if (dSpheres == false) {
      setDsearch("true")
    } else {
      setDsearch("")
    }
    setDSpheres((prevValue) => !prevValue);
  };
  const eSpheresbutton = () => {
    if (eSpheres == false) {
      setEsearch("true")
    } else {
      setEsearch("")
    }
    setESpheres((prevValue) => !prevValue);
  };
  const exspheresbutton = () => {
    if (exSpheres == false) {
      setEXsearch("true")
    } else {
      setEXsearch("")
    }
    setEXSpheres((prevValue) => !prevValue);
  };
  const rfspheresbutton = () => {
    if (rfSpheres == false) {
      setRefinsearch("true")
    } else {
      setRefinsearch("")
    }
    setRFSpheres((prevValue) => !prevValue);
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
        setTypesearch(e.value)
        setCondFilter(e.value);
      } else {
        setTypesearch("")
        setCondFilter("");
      }
    };

  //load more
  const loadMoreButton = () => {
    const newlimits = limits + dSphereslimit;
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

    //craft filter
    useEffect(() => {
      if(rfSpheres == true && exSpheres == false) {
        const sphereType = {
          SphereType: "Craft"
        }
        const filtermerge = rawData.filter((spheres) => {
          return Object.entries(sphereType)
            .filter(entry => entry[1])
            .every(([key, value]) => spheres[key] === value);
        });
  
        const filterholder = [];
        if (aSpheres === true) {
          const filteredout = filtermerge.filter(
            (spheres) => spheres["SphereLetter"] === "A"
          );
          filterholder.push(...filteredout);
        }
        if (bSpheres === true) {
          const filteredout = filtermerge.filter(
            (spheres) => spheres["SphereLetter"] === "B"
          );
          filterholder.push(...filteredout);
        }
        if (cSpheres === true) {
          const filteredout = filtermerge.filter(
            (spheres) => spheres["SphereLetter"] === "C"
          );
          filterholder.push(...filteredout);
        }
        if (dSpheres === true) {
          const filteredout = filtermerge.filter(
            (spheres) => spheres["SphereLetter"] === "D"
          );
          filterholder.push(...filteredout);
        }
        if (eSpheres === true) {
          const filteredout = filtermerge.filter(
            (spheres) => spheres["SphereLetter"] === "E"
          );
          filterholder.push(...filteredout);
        }
    
        if (filterholder.length === 0) {
          filterholder.push(...filtermerge);
        }
    
        const makeUnique = filterholder
            .filter(onlyUnique)
            .sort((a, b) => 
            reverse == false ? 
            a.SphereKey - b.SphereKey :
            b.SphereKey - a.SphereKey );
          const searchit = makeUnique.filter((e) =>
            (`${e.SphereName} ${e.JPName} ${e.SphereCharacterName} ${e.SphereDesc == undefined ? "" :  e.SphereDesc.replace(/(<span class=")/gm,"").replace(/(">)/gm,"").replace(/(<\/span>)/gm,"").replace(/(upstat)/gm,"").replace(/(downstat)/gm,"").replace(/(unique)/gm,"").replace(/(values)/gm,"")}`).toLowerCase().includes(searchTerm)
          );
          const getcharacterfilter = searchit.filter(function (ef) {
            const newfilterpull = ef["SphereCond"] === condFilter;
            if(condFilter !== "") {
              return newfilterpull;
            } else {
              return ef
            }});
          setFilterResults(makeUnique);
          setSearchResults(getcharacterfilter);
          setListDisplay(getcharacterfilter);
          setListLength(getcharacterfilter.length);
          setDisplayBanner(
            <>Displaying <span className="subtextgold">{getcharacterfilter.length}</span> of <span className="subtextgold"> {getcharacterfilter.length}</span> {banerDisplayTerm}</>
          );
      }
    }, [condFilter,rawData,limits,searchTerm, aSpheres, bSpheres, cSpheres, dSpheres, eSpheres, rfSpheres,exSpheres,reverse])

     //ex filter
     useEffect(() => {
      if(exSpheres == true && rfSpheres == false) {
        const sphereType = {
          SphereType: "EX"
        }
        const filtermerge = rawData.filter((spheres) => {
          return Object.entries(sphereType)
            .filter(entry => entry[1])
            .every(([key, value]) => spheres[key] === value);
        });
        const filterholder = [];
        if (aSpheres === true) {
          const filteredout = filtermerge.filter(
            (spheres) => spheres["SphereLetter"] === "A"
          );
          filterholder.push(...filteredout);
        }
        if (bSpheres === true) {
          const filteredout = filtermerge.filter(
            (spheres) => spheres["SphereLetter"] === "B"
          );
          filterholder.push(...filteredout);
        }
        if (cSpheres === true) {
          const filteredout = filtermerge.filter(
            (spheres) => spheres["SphereLetter"] === "C"
          );
          filterholder.push(...filteredout);
        }
        if (dSpheres === true) {
          const filteredout = filtermerge.filter(
            (spheres) => spheres["SphereLetter"] === "D"
          );
          filterholder.push(...filteredout);
        }
        if (eSpheres === true) {
          const filteredout = filtermerge.filter(
            (spheres) => spheres["SphereLetter"] === "E"
          );
          filterholder.push(...filteredout);
        }
    
        if (filterholder.length === 0) {
          filterholder.push(...filtermerge);
        }
    
        const makeUnique = filterholder
            .filter(onlyUnique)
            .sort((a, b) => 
            reverse == false ? 
            a.SphereKey - b.SphereKey :
            b.SphereKey - a.SphereKey );
          const searchit = makeUnique.filter((e) =>
            (`${e.SphereName} ${e.JPName} ${e.SphereCharacterName} ${e.SphereDesc == undefined ? "" :  e.SphereDesc.replace(/(<span class=")/gm,"").replace(/(">)/gm,"").replace(/(<\/span>)/gm,"").replace(/(upstat)/gm,"").replace(/(downstat)/gm,"").replace(/(unique)/gm,"").replace(/(values)/gm,"")}`).toLowerCase().includes(searchTerm)
          );
          const getcharacterfilter = searchit.filter(function (ef) {
            const newfilterpull = ef["SphereCond"] === condFilter;
            if(condFilter !== "") {
              return newfilterpull;
            } else {
              return ef
            }});
          setFilterResults(makeUnique);
          setSearchResults(getcharacterfilter);
          setListDisplay(getcharacterfilter);
          if (limits < getcharacterfilter.length) {
            setShowLoadMore(true);
            setListLength(getcharacterfilter.length);
            setDisplayBanner(
              <>Displaying <span className="subtextgold">{getcharacterfilter.length}</span> of <span className="subtextgold"> {getcharacterfilter.length}</span> {banerDisplayTerm}</>
            );
          } else {
            setShowLoadMore(false);
            setListLength(getcharacterfilter.length);
            setDisplayBanner(
              <>Displaying <span className="subtextgold">{getcharacterfilter.length}</span> of <span className="subtextgold"> {getcharacterfilter.length}</span> {banerDisplayTerm}</>
            );
      }
    }
    }, [searchTerm,rawData,condFilter,limits, aSpheres, bSpheres, cSpheres, dSpheres, eSpheres, exSpheres,rfSpheres,reverse])

    //type list
    const typeList = Object.values(rawData).map((item) => item.SphereCond);
    const typeListUnique = typeList
      .filter(onlyUnique)
      .sort()
      .filter(function (el) {
        return el !== undefined;
      });
  
    const typeListArray = typeListUnique.map((typeListUnique) => ({
      value: typeListUnique,
      label: typeListUnique
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
    setASpheres(false);
    setBSpheres(false);
    setCSpheres(false);
    setDSpheres(false);
    setESpheres(false);
    setEXSpheres(false);
    setRFSpheres(false);
    setsearchdisplay("");
    setSearchTerm("");
    setCondFilter("")

    setReversesearch("")
    setAsearch("")
    setBsearch("")
    setDsearch("")
    setCsearch("")
    setEsearch("")
    setRefinsearch("")
    setEXsearch("")
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


    return (
      <div className="wrapper">
        <Helmet>
          <title>Spheres - Dissidia Compendium</title>
          <meta property="og:site_name" content="Dissidia Compendium"/>
          <meta property="og:type" content="website" />
          <meta name="description" content="Spheres Search"/>
          <meta name="twitter:title" content="Spheres Search"/>
          <meta name="twitter:description" content="Spheres Search"/>
          <meta property="og:title" content="Spheres Search"/>
          <meta property="og:description" content="Spheres Search"/>
          <meta property="og:url" content="https://dissidiacompendium.com/search/spheres"/>
        </Helmet>
            <div className="content">
              <h1  >Spheres</h1>
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
                    placeholder="Sphere Name / Effect"
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
                      <ul className="spheretypes">
                        <li className={`${aSpheres ? "filteractive": "filterinactive"} spheresbutton aSpheresButton`} onClick={aSpheresbutton}></li>
                        <li className={`${bSpheres ? "filteractive": "filterinactive"} spheresbutton bSpheresButton`} onClick={bSpheresbutton}></li>
                        <li className={`${cSpheres ? "filteractive": "filterinactive"} spheresbutton cSpheresButton`} onClick={cSpheresbutton}></li>
                        <li className={`${dSpheres ? "filteractive": "filterinactive"} spheresbutton dSpheresButton`} onClick={dSpheresbutton}></li>
                        <li className={`${eSpheres ? "filteractive": "filterinactive"} spheresbutton eSpheresButton`} onClick={eSpheresbutton}></li>
                      </ul>                      
                      <div className="similarbanner">Refine</div>
                      <ul className="spheretypes">
                        <Tippy content="EX Spheres">
                        <li className={`${exSpheres ? "filteractive": "filterinactive"} spheresbutton exSpheresButton`} onClick={exspheresbutton}></li>
                        </Tippy>
                        <Tippy content="Refined Spheres">
                        <li className={`${rfSpheres ? "filteractive": "filterinactive"} spheresbutton rfSpheresButton`} onClick={rfspheresbutton}></li>
                        </Tippy>
                      </ul>
                      <div className="typeholder">
                        <Select
                        defaultValue={Typesearch != "" ? {value: Typesearch, label: Typesearch } : null}
                        key={Typesearch}
                        isSearchable={true} 
                        placeholder="Condition Select..."
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
                              placeholder="Sphere Name / Effects"
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
                  <li className={"active"} ><span className="gemselected"/>Spheres</li>
                </Link>
                <Link to={`/search/stickers`}>
                  <li className={""} >Stickers</li>
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
              listSpheres.map(spheres =>(
                <SpheresFormatting key={spheres.SphereKey} match={spheres}/>
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
export default Spheres;