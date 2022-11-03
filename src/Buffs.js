import React, {useState, useEffect} from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import { useDispatch } from "react-redux";
import { setFalse, setTrue } from './redux/ducks/jptoggle'
import { Link } from 'react-router-dom'
import './Buffs.css';
import Tippy from './formatting/TippyDefaults.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import { slice, concat, } from 'lodash';
import BuffsFormatting from './formatting/BuffsFormatting.js'
import { Helmet } from 'react-helmet-async';
import Select from 'react-select';
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5'; 
import { FaUndoAlt } from 'react-icons/fa'
import { getQuery, getQueryStringVal, useQueryParam } from './processing/urlparams'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaShareSquare } from 'react-icons/fa';

const Buffs = ({ProcessedBuffs,ProcessedCharacters, jptoggledata}) => {

  //  const error = ProcessedBuffs.filter(function (ef) {
  //  const newfilterpull = ef["JPName"] == '';
  //  return newfilterpull;
  //})
  //
  //console.log(error)

  const dispatch = useDispatch();

  const startinglimit = window.innerWidth <= 815 ? 30 : 50;
  
  const rawData = ProcessedBuffs;

  const banerDisplayTerm = "buffs";

  const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null  ? true : false);
  const [clearFilter, setclearFilter] = useStateIfMounted(false);

  const [aBuff, setABuff] = useState(getQueryStringVal("aa") != null  ? true : false);
  const [burstBuff, setBurstBuff] = useState(getQueryStringVal("burst") != null  ? true : false);
  const [calls, setCalls] = useState(getQueryStringVal("call") != null  ? true : false);
  const [starting, setStarting] = useState(getQueryStringVal("s1") != null  ? true : false);
  const [s20, setS20] = useState(getQueryStringVal("s2") != null  ? true : false);
  const [ld, setLD] = useState(getQueryStringVal("ld") != null  ? true : false);
  const [fr, setFR] = useState(getQueryStringVal("fr") != null  ? true : false);
  const [ex, setEX] = useState(getQueryStringVal("ex") != null  ? true : false);
  const [bstate, setbstate] = useState(getQueryStringVal("state") != null  ? true : false);
  const [buffs, setBuffs] = useState(getQueryStringVal("buffs") != null  ? true : false);
  const [debuffs, setDebuffs] = useState(getQueryStringVal("debuffs") != null  ? true : false);
  const [rework, setrework] = useState(getQueryStringVal("rework") != null  ? true : false);

  const [loop, setLoop] = useStateIfMounted(false);
  const [reverse, setReverse] = useState(getQueryStringVal("rev") != null  ? true : false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchdisplay, setsearchdisplay] = useState("");
  const [condFilter, setCondFilter] = useState("");
  const [filterResults, setFilterResults] = useState(rawData);
  const [searchResults, setSearchResults] = useState(rawData);
  const [limits, setLimits] = useState(startinglimit);
  const [listDisplay, setListDisplay] = useState(
    slice(rawData, 0, startinglimit)
  );

  const [listLength, setListLength] = useState(listDisplay.length);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [displayBanner, setDisplayBanner] = useState(
    <>Displaying <span className="subtextgold">{listLength}</span> of <span className="subtextgold"> {rawData.length}</span> {banerDisplayTerm}</>
  );

  const [aBuffsearch, setABuffsearch] = useQueryParam("aa", "");
  const [burstBuffsearch, setBurstBuffsearch] = useQueryParam("burst", "");
  const [callssearch, setCallssearch] = useQueryParam("call", "");
  const [startingsearch, setStartingsearch] = useQueryParam("s1", "");
  const [s20search, setS20search] = useQueryParam("s2", "");
  const [ldsearch, setLDsearch] = useQueryParam("ld", "");
  const [frsearch, setFRsearch] = useQueryParam("fr", "");
  const [exsearch, setEXsearch] = useQueryParam("ex", "");
  const [bstatesearch, setbstatesearch] = useQueryParam("state", "");
  const [buffssearch, setBuffssearch] = useQueryParam("buffs", "");
  const [debuffssearch, setDebuffssearch] = useQueryParam("debuffs", "");
  const [ActiveReworksearch, setActiveReworksearch] = useQueryParam("rework", "");
  const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
  const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
  const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");
  const [Typesearch, setTypesearch] = useQueryParam("Char", "");
  const [JPsearch, setJPSearch] = useQueryParam("JP", "");
  const { protocol, pathname, host } = window.location;
  const query = getQuery();
  const url = `${protocol}//${host}${pathname}?${query.toString()}`

  //param logic

  useEffect(() => {
    //jp toggle
    if(jptoggledata == true ){
      setJPSearch("true")
    }
    if(getQueryStringVal("JP") == "true" ){
      dispatch(setTrue())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[jptoggledata])

 useEffect(() => {
     //type params
     if(Typesearch != null){
      const filteredtype = ProcessedBuffs.filter(function (ef) {
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
  },[setCondFilter,ProcessedBuffs,Typesearch,setTypesearch])

  useEffect(() => {
    //search params
    if(getQueryStringVal("search") != null){
      setSearchTerm(getQueryStringVal("search") != null  ? getQueryStringVal("search").toLowerCase() : "")
      setTEXTsearch(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
      setsearchdisplay(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
    }
    }, [setTEXTsearch,setFiltersearch])

  //filter
  useEffect(() => {
    if(debuffs == false && buffs == false){
      const filterholder = [];
      if (aBuff === true) {
        const filteredout = rawData.filter(
          (buffs) => buffs["BuffFlag"] === "ABuff"
        );
        filterholder.push(...filteredout);
      }
      if (burstBuff === true) {
        const filteredout = rawData.filter(
          (buffs) => buffs["BuffFlag"] === "BTBuff"
        );
        filterholder.push(...filteredout);
      }
      if (calls === true) {
        const filteredout = rawData.filter(
          (buffs) => buffs["BuffFlag"] === "CallBuff"
        );
        filterholder.push(...filteredout);
      }
      if (starting === true) {
        const filteredout = rawData.filter(
          (buffs) => buffs["BuffFlag"] === "S1Buff"
        );
        filterholder.push(...filteredout);
      }
      if (s20 === true) {
        const filteredout = rawData.filter(
          (buffs) => buffs["BuffFlag"] === "S2Buff"
        );
        filterholder.push(...filteredout);
      }
      if (ld === true) {
        const filteredout = rawData.filter(
          (buffs) => buffs["BuffFlag"] === "LDBuff"
        );
        filterholder.push(...filteredout);
      }
      if (ex === true) {
        const filteredout = rawData.filter(
          (buffs) => buffs["BuffFlag"] === "EXBuff"
        );
        filterholder.push(...filteredout);
      }
      if (fr === true) {
        const filteredout = rawData.filter(
          (buffs) => buffs["BuffFlag"] === "FRBuff"
        );
        filterholder.push(...filteredout);
      }
      if (bstate === true) {
        const filteredout = rawData.filter(
          (buffs) => buffs["BuffFlag"] === "BState"
        );
        filterholder.push(...filteredout);
      }
      if (rework === true) {
        const filteredout = rawData.filter(
          (buffs) => buffs["JPFlag"] === true
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
          a.BuffKey - b.BuffKey:
          b.BuffKey - a.BuffKey);
        const searchit = makeUnique.filter((e) =>
          (`${e.BuffNameDisplay && e.BuffNameDisplay.replace(/(<)/gm,"").replace(/(<)/gm,"")} ${e.JPName} ${e.BuffDesc == undefined ? "" : e.BuffDesc.replace(/(<)/gm,"").replace(/(<)/gm,"")}`).toLowerCase().includes(searchTerm)
        );
        const getcharacterfilter = searchit.filter(function (ef) {
          const newfilterpull = ef["CharID"] === condFilter;
          if(condFilter !== "") {
          return newfilterpull;
        } else {
          return ef
        }});
        setFilterResults(makeUnique);
        setSearchResults(getcharacterfilter);
        const newlistdisplay = slice(getcharacterfilter, 0, limits);
        if (limits < getcharacterfilter.length) {
          setShowLoadMore(true);
          setListDisplay(newlistdisplay);
          setListLength(getcharacterfilter.length);
          setDisplayBanner(
            <>Displaying <span className="subtextgold">{newlistdisplay.length}</span> of <span className="subtextgold"> {getcharacterfilter.length}</span> {banerDisplayTerm}</>
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
  }, [limits, rawData, fr, searchTerm, rework, bstate, clearFilter, aBuff, burstBuff, calls, starting, s20, ld, ex, buffs, debuffs, condFilter, reverse]);

    //buffs only
    useEffect(() => {
      if(debuffs == false && buffs == true){
        const buffs = {
          BuffType: "Buff"
        }
        const filtermerge = rawData.filter((items) => {
          return Object.entries(buffs)
            .filter(entry => entry[1])
            .every(([key, value]) => items[key] === value);
        });

        
        const filterholder = [];
        if (aBuff === true) {
          const filteredout = filtermerge.filter(
            (buffs) => buffs["BuffFlag"] === "ABuff"
          );
          filterholder.push(...filteredout);
        }
        if (burstBuff === true) {
          const filteredout = filtermerge.filter(
            (buffs) => buffs["BuffFlag"] === "BTBuff"
          );
          filterholder.push(...filteredout);
        }
        if (calls === true) {
          const filteredout = filtermerge.filter(
            (buffs) => buffs["BuffFlag"] === "CallBuff"
          );
          filterholder.push(...filteredout);
        }
        if (starting === true) {
          const filteredout = filtermerge.filter(
            (buffs) => buffs["BuffFlag"] === "S1Buff"
          );
          filterholder.push(...filteredout);
        }
        if (s20 === true) {
          const filteredout = filtermerge.filter(
            (buffs) => buffs["BuffFlag"] === "S2Buff"
          );
          filterholder.push(...filteredout);
        }
        if (ld === true) {
          const filteredout = filtermerge.filter(
            (buffs) => buffs["BuffFlag"] === "LDBuff"
          );
          filterholder.push(...filteredout);
        }
        if (fr === true) {
          const filteredout = filtermerge.filter(
            (buffs) => buffs["BuffFlag"] === "FRBuff"
          );
          filterholder.push(...filteredout);
        }
        if (ex === true) {
          const filteredout = filtermerge.filter(
            (buffs) => buffs["BuffFlag"] === "EXBuff"
          );
          filterholder.push(...filteredout);
        }
        if (bstate === true) {
          const filteredout = filtermerge.filter(
            (buffs) => buffs["BuffFlag"] === "BState"
          );
          filterholder.push(...filteredout);
        }
        if (rework === true) {
          const filteredout = filtermerge.filter(
            (buffs) => buffs["JPFlag"] === true
          );
          filterholder.push(...filteredout);
        }
        if (filterholder.length === 0) {
          filterholder.push(...filtermerge);
        }
    
          const makeUnique = filterholder
            .filter(onlyUnique)
            .sort((a, b) => 
            reverse === false ?
            a.BuffKey - b.BuffKey:
            b.BuffKey - a.BuffKey);
          const searchit = makeUnique.filter((e) =>
            (`${e.BuffNameDisplay && e.BuffNameDisplay.replace(/(<)/gm,"").replace(/(<)/gm,"")} ${e.JPName} ${e.BuffDesc == undefined ? "" : e.BuffDesc.replace(/(<)/gm,"").replace(/(<)/gm,"")}`).toLowerCase().includes(searchTerm)
          );
          const getcharacterfilter = searchit.filter(function (ef) {
            const newfilterpull = ef["CharID"] === condFilter;
            if(condFilter !== "") {
            return newfilterpull;
          } else {
            return ef
          }});
          setFilterResults(makeUnique);
          setSearchResults(getcharacterfilter);
          const newlistdisplay = slice(getcharacterfilter, 0, limits);
          if (limits < getcharacterfilter.length) {
            setShowLoadMore(true);
            setListDisplay(newlistdisplay);
            setListLength(getcharacterfilter.length);
            setDisplayBanner(
              <>Displaying <span className="subtextgold">{newlistdisplay.length}</span> of <span className="subtextgold"> {getcharacterfilter.length}</span> {banerDisplayTerm}</>
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
    }, [limits, rawData, searchTerm, rework, fr, bstate, clearFilter, aBuff, burstBuff, calls, starting, s20, ld, ex, buffs, debuffs, condFilter, reverse]);

    //debuffs only
    useEffect(() => {
      if(debuffs == true && buffs == false){
        const buffs = {
          BuffType: "Debuff"
        }
        const filtermerge = rawData.filter((items) => {
          return Object.entries(buffs)
            .filter(entry => entry[1])
            .every(([key, value]) => items[key] === value);
        });

        
        const filterholder = [];
        if (aBuff === true) {
          const filteredout = filtermerge.filter(
            (buffs) => buffs["BuffFlag"] === "ABuff"
          );
          filterholder.push(...filteredout);
        }
        if (burstBuff === true) {
          const filteredout = filtermerge.filter(
            (buffs) => buffs["BuffFlag"] === "BTBuff"
          );
          filterholder.push(...filteredout);
        }
        if (calls === true) {
          const filteredout = filtermerge.filter(
            (buffs) => buffs["BuffFlag"] === "CallBuff"
          );
          filterholder.push(...filteredout);
        }
        if (starting === true) {
          const filteredout = filtermerge.filter(
            (buffs) => buffs["BuffFlag"] === "S1Buff"
          );
          filterholder.push(...filteredout);
        }
        if (s20 === true) {
          const filteredout = filtermerge.filter(
            (buffs) => buffs["BuffFlag"] === "S2Buff"
          );
          filterholder.push(...filteredout);
        }
        if (ld === true) {
          const filteredout = filtermerge.filter(
            (buffs) => buffs["BuffFlag"] === "LDBuff"
          );
          filterholder.push(...filteredout);
        }
        if (fr === true) {
          const filteredout = filtermerge.filter(
            (buffs) => buffs["BuffFlag"] === "FRBuff"
          );
          filterholder.push(...filteredout);
        }
        if (ex === true) {
          const filteredout = filtermerge.filter(
            (buffs) => buffs["BuffFlag"] === "EXBuff"
          );
          filterholder.push(...filteredout);
        }
        if (bstate === true) {
          const filteredout = filtermerge.filter(
            (buffs) => buffs["BuffFlag"] === "BState"
          );
          filterholder.push(...filteredout);
        }
        if (rework === true) {
          const filteredout = filtermerge.filter(
            (buffs) => buffs["JPFlag"] === true
          );
          filterholder.push(...filteredout);
        }
        if (filterholder.length === 0) {
          filterholder.push(...filtermerge);
        }
    
          const makeUnique = filterholder
            .filter(onlyUnique)
            .sort((a, b) => 
            reverse === false ?
            a.BuffKey - b.BuffKey:
            b.BuffKey - a.BuffKey);
          const searchit = makeUnique.filter((e) =>
            (`${e.BuffNameDisplay && e.BuffNameDisplay.replace(/(<)/gm,"").replace(/(<)/gm,"")} ${e.JPName} ${e.BuffDesc == undefined ? "" : e.BuffDesc.replace(/(<)/gm,"").replace(/(<)/gm,"")}`).toLowerCase().includes(searchTerm)
          );
          const getcharacterfilter = searchit.filter(function (ef) {
            const newfilterpull = ef["CharID"] === condFilter;
            if(condFilter !== "") {
            return newfilterpull;
          } else {
            return ef
          }});
          setFilterResults(makeUnique);
          setSearchResults(getcharacterfilter);
          
          const newlistdisplay = slice(getcharacterfilter, 0, limits);
          if (limits < getcharacterfilter.length) {
            setShowLoadMore(true);
            setListDisplay(newlistdisplay);
            setListLength(getcharacterfilter.length);
            setDisplayBanner(
              <>Displaying <span className="subtextgold">{newlistdisplay.length}</span> of <span className="subtextgold"> {getcharacterfilter.length}</span> {banerDisplayTerm}</>
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
    }, [limits, rawData, searchTerm, rework, fr, bstate, clearFilter, aBuff, burstBuff, calls, starting, s20, ld, ex, buffs, debuffs, condFilter, reverse]);

  //buttons
  const aBuffbutton = () => {
    if (aBuff == false) {
      setABuffsearch("true")
    } else {
      setABuffsearch("")
    }
    setABuff((prevValue) => !prevValue);
  };
  const burstBuffbutton = () => {
    if (burstBuff == false) {
      setBurstBuffsearch("true")
    } else {
      setBurstBuffsearch("")
    }
    setBurstBuff((prevValue) => !prevValue);
  };
  const callsbutton = () => {
    if (calls == false) {
      setCallssearch("true")
    } else {
      setCallssearch("")
    }
    setCalls((prevValue) => !prevValue);
  };
  const startingbutton = () => {
    if (starting == false) {
      setStartingsearch("true")
    } else {
      setStartingsearch("")
    }
    setStarting((prevValue) => !prevValue);
  };
  const s20button = () => {
    if (s20 == false) {
      setS20search("true")
    } else {
      setS20search("")
    }
    setS20((prevValue) => !prevValue);
  };
  const ldbutton = () => {
    if (ld == false) {
      setLDsearch("true")
    } else {
      setLDsearch("")
    }
    setLD((prevValue) => !prevValue);
  };
  const frbutton = () => {
    if (fr == false) {
      setFRsearch("true")
    } else {
      setFRsearch("")
    }
    setFR((prevValue) => !prevValue);
  };
  const exbutton = () => {
    if (ex == false) {
      setEXsearch("true")
    } else {
      setEXsearch("")
    }
    setEX((prevValue) => !prevValue);
  };
  const buffsbutton = () => {
    if (buffs == false) {
      setBuffssearch("true")
      setDebuffssearch("")
      setDebuffs(false)
    } else {
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
  const bstatebutton = () => {
    if (bstate == false) {
      setbstatesearch("true")
    } else {
      setbstatesearch("")
    }
    setbstate((prevValue) => !prevValue)
  }
  const reworkbutton = () => {
    if (rework == false) {
      setActiveReworksearch("true")
    } else {
      setActiveReworksearch("")
    }
    setrework((prevValue) => !prevValue)
  }

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

    //type selector
    const CondSelect = (e) => {
      if (e !== null) {
        setTypesearch(e.value)
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

    //type list
    const typeListArray = ProcessedCharacters.map((typeListUnique) => ({
      value: typeListUnique.CharacterName,
      label: typeListUnique.CharacterName,
      id: typeListUnique.CharID,
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


  //clear
  const resetbutton = () =>{
    setclearFilter(true);
    setReverse(false)
    setABuff(false);
    setBurstBuff(false);
    setCalls(false);
    setStarting(false);
    setS20(false);
    setLD(false);
    setFR(false);
    setEX(false);
    setBuffs(false);
    setBuffs(false);
    setDebuffs(false);
    setbstate(false)
    setrework(false)

    setABuffsearch("")
    setBurstBuffsearch("")
    setCallssearch("")
    setStartingsearch("")
    setS20search("")
    setLDsearch("")
    setEXsearch("")
    setFRsearch("")
    setBuffssearch("")
    setDebuffssearch("")
    setbstatesearch("")
    setReversesearch("")
    setTEXTsearch("")
    setTypesearch("")
    setActiveReworksearch("")

    setsearchdisplay("");
    setSearchTerm("");
    setCondFilter("")
    setTimeout(() => setclearFilter(false), 1000);
  }

  const listBuff = listDisplay;

    return (
      <div className="wrapper">
        <Helmet>
          <title>Buffs - Dissidia Compendium</title>
          <meta property="og:site_name" content="Dissidia Compendium"/>
          <meta property="og:type" content="website" />
          <meta name="description" content="Buffs Search"/>
          <meta name="twitter:title" content="Buffs Search"/>
          <meta name="twitter:description" content="Buffs Search"/>
          <meta property="og:title" content="Buffs Search"/>
          <meta property="og:description" content="Buffs Search"/>
          <meta property="og:url" content="https://dissidiacompendium.com/search/buffs"/>
        </Helmet>
            <div className="content">
              <h1  >Buffs &#38; Debuffs</h1>
              <div className="subheader">Use filters to limit returns</div>
              <div className="charfilterspacer"/>
              <div key="filter1" onClick={showfilterbutton} className="charfilter"><span className="filterstext"></span>{showFilter ? <TiArrowSortedUp className="uparrow"/> : <TiArrowSortedDown className="downarrow"/>}</div>
              {showFilter == false ? 
              <div className="char-search-reverse-holder">
                <IoSearch className="searchicon"/>
              <div className="search-holder el">
                <input 
                    className="char-search-bar" 
                    type="text"
                    placeholder="Buff Name / Effects"
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
                      <Tippy content="Burst Line Buffs">
                      <li className={`${burstBuff ? "filteractive": "filterinactive"} buffbutton burstButton`} onClick={burstBuffbutton}></li>
                      </Tippy>
                      <Tippy content="FR Line Buffs">
                      <li className={`${fr ? "filteractive": "filterinactive"} buffbutton frbutton`} onClick={frbutton}></li>
                      </Tippy>
                      <Tippy content="Calls Line Buffs">
                      <li className={`${calls ? "filteractive": "filterinactive"} buffbutton callsButton`} onClick={callsbutton}></li>
                      </Tippy>
                      <Tippy content="LD Line Buffs">
                      <li className={`${ld ? "filteractive": "filterinactive"} buffbutton ldButton`} onClick={ldbutton}></li>
                      </Tippy>
                      <Tippy content="EX Line Buffs">
                      <li className={`${ex ? "filteractive": "filterinactive"} buffbutton exButton`} onClick={exbutton}></li>
                      </Tippy>
                      <Tippy content="AA Line Buffs">
                      <li className={`${aBuff ? "filteractive": "filterinactive"} buffbutton abuffButton`} onClick={aBuffbutton}></li>
                      </Tippy>
                      <Tippy content="Second Skill Line Buffs">
                      <li className={`${s20 ? "filteractive": "filterinactive"} buffbutton s20Button`} onClick={s20button}></li>
                      </Tippy>
                      <Tippy content="Starting Skill Line Buffs">
                      <li className={`${starting ? "filteractive": "filterinactive"} buffbutton startingButton`} onClick={startingbutton}></li>
                      </Tippy>
                    </ul>
                    <br/>
                    <ul className="bufftypes">
                    <Tippy content="State Buffs">
                      <li className={`${bstate ? "filteractive": "filterinactive"} buffbutton bstateButton`} onClick={bstatebutton}></li>
                      </Tippy>
                      <Tippy content="Buffs with active reworks">
                      <li className={`${rework ? "filteractive": "filterinactive"} buffbutton reworkbutton`} onClick={reworkbutton}></li>
                      </Tippy>
                    </ul>
                    <div className="similarbanner">Refine</div>
                    <ul className="bufftypes">
                      <li className={`${buffs ? "filteractive": "filterinactive"} buffsbutton buffsButton`} onClick={buffsbutton}></li>
                      <li className={`${debuffs ? "filteractive": "filterinactive"} buffsbutton debuffsButton`} onClick={debuffsbutton}></li>
                    </ul>
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
                            placeholder="Buff Name / Effects"
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
                  <Link className="whitecolor" to={"/characters/forcetime"}>
                    <span className="subtext">Check out the Force Time page</span>
                    </Link>   
                  </div>
                  {showFilter == true ? "" :
                  <span>
                  <Link className="whitecolor" to={"/characters/forcetime"}>
                  <span className="subtext">Force Time</span>
                  </Link> 
                  </span> }
              <ul className="bannertabs">
                <Link to={`/search/buffs`}>
                  <li className={"active"} ><span className="gemselected"/>Buffs</li>
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
              {listBuff.length > 0 ?  (
              listBuff.map(buffs => (
                <BuffsFormatting 
                ProcessedBuffs={ProcessedBuffs}
                key={buffs.BuffKey}
                match={buffs}
                jptoggledata={jptoggledata}
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
export default Buffs;