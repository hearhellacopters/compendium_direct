import React, {useState, useEffect} from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import { useDispatch } from "react-redux";
import { setFalse, setTrue } from './redux/ducks/jptoggle'
import './Events.css';
import Tippy from './formatting/TippyDefaults.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import { Helmet} from 'react-helmet-async';
import Select from 'react-select';
import { Link } from 'react-router-dom'
import ForecastFormatting from './formatting/ForecastFormatting.js'
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5'; 
import { FaUndoAlt } from 'react-icons/fa'; 
import {getQuery, getQueryStringVal,useQueryParam } from './processing/urlparams'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaShareSquare } from 'react-icons/fa';

const Forecast = ({ProcessedBanners,ProcessedCharacters,jptoggledata}) =>{

    const dispatch = useDispatch();

    const startinglimit = 25;
  
    const banerDisplayTerm = "releases";
    
    const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null  ? true : false);
    const [clearFilter, setclearFilter] = useStateIfMounted(false);
  
    const [jponly, setJPonly] = useState(jptoggledata);
    const [futureevents, setFutureEvents] = useState(getQueryStringVal("future") != null? true : false);
    const [prefilterlist, setPrefilterlist] = useState([])
    const [reverse, setReverse] = useState(getQueryStringVal("rev") != null? true : false);
  
    //prefilter
    useEffect(() => {
      const filterholder = [];
      if (futureevents === false ) {
        if (jponly === false ) {
          const filteredevents = ProcessedBanners.filter((item) => {
            return new Date().getTime() <= new Date(item.indate)
          })
            filterholder.push(...filteredevents);
          } else {
            const filteredevents = ProcessedBanners.filter((item) => {
              return new Date().getTime() <= new Date(item.JPindate)
            })
            filterholder.push(...filteredevents);
          }
        if (reverse === false) {
          filterholder
          .filter(onlyUnique)
          .sort((a, b) => new Date(a.indate) - new Date(b.indate));
        } else {
          filterholder
          .filter(onlyUnique)
          .sort((a, b) => new Date(a.indate) - new Date(b.indate));
        }
      if (jponly === false ) {
        const filteredevents2 = filterholder.filter((item) => {
          return item.tempdate === false
        })
        setPrefilterlist(filteredevents2);
      } else {
        setPrefilterlist(filterholder);
      } 
      } else {
        if (jponly === false ) {
            const filteredevents = ProcessedBanners.filter((item) => {
                return new Date().getTime() <= new Date(item.indate)
              })
                filterholder.push(...filteredevents);
                setPrefilterlist(filterholder);
          } else {
            const filteredevents = ProcessedBanners.filter((item) => {
                return new Date().getTime() <= new Date(item.JPindate)
              })
                filterholder.push(...filteredevents);
                setPrefilterlist(filterholder);
          }
      if (reverse === false) {
        filterholder
        .filter(onlyUnique)
        .sort((a, b) => new Date(a.indate) - new Date(b.indate));
      } else {
        filterholder
        .filter(onlyUnique)
        .sort((a, b) => new Date(a.indate) - new Date(b.indate));
      }
    }
    },[ProcessedBanners,jponly, futureevents, reverse]);
  
    const rawData = prefilterlist;
  
    const [newchar, setNewChar] = useState(getQueryStringVal("newchar") != null? true : false);
    const [btchar, setBTChar] = useState(getQueryStringVal("bt") != null? true : false);
    const [btpluschar, setBTPlusChar] = useState(getQueryStringVal("btplus") != null? true : false);
    const [ldchar, setLDChar] = useState(getQueryStringVal("ld") != null? true : false);
    const [frchar, setFRChar] = useState(getQueryStringVal("fr") != null? true : false);
    const [ldboardchar, setLDBoardChar] = useState(getQueryStringVal("ldboard") != null? true : false);
    const [frboardchar, setFRBoardChar] = useState(getQueryStringVal("frboard") != null? true : false);
    const [sevenachar, setSevenAChar] = useState(getQueryStringVal("7a") != null? true : false);
    const [sevenapluschar, setSevenAPlusChar] = useState(getQueryStringVal("7aplus") != null? true : false);
    const [reworkchar, setReworkChar] = useState(getQueryStringVal("rework") != null? true : false);
    const [eightychar, setEightyChar] = useState(getQueryStringVal("eighty") != null? true : false);
    const [ninetychar, setNinetyChar] = useState(getQueryStringVal("ninety") != null? true : false);
    const [board5char, setBoard5Char] = useState(getQueryStringVal("board5") != null? true : false);
  
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
  
    const [newcharsearch, setNewCharsearch] = useQueryParam("newchar", "");
    const [btcharsearch, setBTCharsearch] = useQueryParam("bt", "");
    const [btpluscharsearch, setBTPlusCharsearch] = useQueryParam("btplus", "");
    const [ldcharsearch, setLDCharsearch] = useQueryParam("ld", "");
    const [frcharsearch, setFRCharsearch] = useQueryParam("fr", "");
    const [frboardcharsearch, setFRBoardCharsearch] = useQueryParam("frboard", "");
    const [ldboardcharsearch, setLDBoardCharsearch] = useQueryParam("ldboard", "");
    const [sevenacharsearch, setSevenACharsearch] = useQueryParam("7a", "");
    const [sevenapluscharsearch, setSevenAPlusCharsearch] = useQueryParam("7aplus", "");
    const [reworkcharsearch, setReworkCharsearch] = useQueryParam("rework", "");
    const [eightycharsearch, setEightyCharsearch] = useQueryParam("eighty", "");
    const [ninetycharsearch, setNinetyCharsearch] = useQueryParam("ninety", "");
    const [board5charsearch, setBoard5Charsearch] = useQueryParam("board5" ,"");

    const [futureeventssearch, setFutureEventssearch] = useQueryParam("future", "");
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
        if(Typesearch != null){
         const filteredtype = Object.values(ProcessedCharacters).filter(function (ef) {
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
     },[setCondFilter,ProcessedCharacters,Typesearch,setTypesearch])
  
     useEffect(() => {
      if(jptoggledata == true){
        setJPSearch("true")
      } else {
        setJPSearch("")
      }
    },[jptoggledata,setJPSearch])
  
    useEffect(() => {
      if(getQueryStringVal("JP") == "true" ){
        dispatch(setTrue())
        setJPonly(true)
      } else {
        dispatch(setFalse())
        setJPonly(false)
      }
    },[setJPSearch,dispatch])
  
    useEffect(() => {
      //search params
      if(getQueryStringVal("search") != null){
        setSearchTerm(getQueryStringVal("search") != null  ? getQueryStringVal("search").toLowerCase() : "")
        setTEXTsearch(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
        setsearchdisplay(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
      }
      }, [setTEXTsearch,setFiltersearch])

    useEffect(() => {
      const filterholder = [];
      if (newchar === true) {
        const filteredout = rawData.filter(function (ef) {
          const newfilterpull = ef.ForecastChars
          .some(CharList => CharList.newcharacter === true)
        ;
        if(newfilterpull !== null){
          return newfilterpull;
        } else {
          return ef
        }});
        filterholder.push(...filteredout);
      }
      if (btchar === true) {
        const filteredout = rawData.filter(function (ef) {
          const newfilterpull = ef.ForecastChars
          .some(CharList => CharList.BTChar === true)
        ;
        if(newfilterpull !== null){
          return newfilterpull;
        } else {
          return ef
        }});
        filterholder.push(...filteredout);
      }
      if (btpluschar === true) {
        const filteredout = rawData.filter(function (ef) {
          const newfilterpull = ef.ForecastChars
          .some(CharList => CharList.BTPlus === true)
        ;
        if(newfilterpull !== null){
          return newfilterpull;
        } else {
          return ef
        }});
        filterholder.push(...filteredout);
      }
      if (ldchar === true) {
        const filteredout = rawData.filter(function (ef) {
          const newfilterpull = ef.ForecastChars
          .some(CharList => CharList.LD === true)
        ;
        if(newfilterpull !== null){
          return newfilterpull;
        } else {
          return ef
        }});
        filterholder.push(...filteredout);
      }
      if (ldboardchar === true) {
        const filteredout = rawData.filter(function (ef) {
          const newfilterpull = ef.ForecastChars
          .some(CharList => CharList.LDBoard === true)
        ;
        if(newfilterpull !== null){
          return newfilterpull;
        } else {
          return ef
        }});
        filterholder.push(...filteredout);
      }
      if (frboardchar === true) {
        const filteredout = rawData.filter(function (ef) {
          const newfilterpull = ef.ForecastChars
          .some(CharList => CharList.FRBoard === true)
        ;
        if(newfilterpull !== null){
          return newfilterpull;
        } else {
          return ef
        }});
        filterholder.push(...filteredout);
      }
      if (board5char === true) {
        const filteredout = rawData.filter(function (ef) {
          const newfilterpull = ef.ForecastChars
          .some(CharList => CharList.Board5 === true)
        ;
        if(newfilterpull !== null){
          return newfilterpull;
        } else {
          return ef
        }});
        filterholder.push(...filteredout);
      }
      if (sevenachar === true) {
        const filteredout = rawData.filter(function (ef) {
          const newfilterpull = ef.ForecastChars
          .some(CharList => CharList.SevenArmor === true)
        ;
        if(newfilterpull !== null){
          return newfilterpull;
        } else {
          return ef
        }});
        filterholder.push(...filteredout);
      }
      if (sevenapluschar === true) {
        const filteredout = rawData.filter(function (ef) {
          const newfilterpull = ef.ForecastChars
          .some(CharList => CharList.SevenArmorPlus === true)
        ;
        if(newfilterpull !== null){
          return newfilterpull;
        } else {
          return ef
        }});
        filterholder.push(...filteredout);
      }
      if (reworkchar === true) {
        const filteredout = rawData.filter(function (ef) {
          const newfilterpull = ef.ForecastChars
          .some(CharList => CharList.Rework === true)
        ;
        if(newfilterpull !== null){
          return newfilterpull;
        } else {
          return ef
        }});
        filterholder.push(...filteredout);
      }
      if (eightychar === true) {
        const filteredout = rawData.filter(function (ef) {
          const newfilterpull = ef.ForecastChars
          .some(CharList => CharList.CystalEighty === true)
        ;
        if(newfilterpull !== null){
          return newfilterpull;
        } else {
          return ef
        }});
        filterholder.push(...filteredout);
      }
      if (ninetychar === true) {
        const filteredout = rawData.filter(function (ef) {
          const newfilterpull = ef.ForecastChars
          .some(CharList => CharList.CystalNinety === true)
        ;
        if(newfilterpull !== null){
          return newfilterpull;
        } else {
          return ef
        }});
        filterholder.push(...filteredout);
      }
      if (frchar === true) {
        const filteredout = rawData.filter(function (ef) {
          const newfilterpull = ef.ForecastChars
          .some(CharList => CharList.FR === true)
        ;
        if(newfilterpull !== null){
          return newfilterpull;
        } else {
          return ef
        }});
        filterholder.push(...filteredout);
      }
      if ( ![newchar, btchar, btpluschar, ldchar, board5char, ldboardchar, sevenachar, sevenapluschar, reworkchar, eightychar, ninetychar,frchar,frboardchar].includes(true)) {
        filterholder.push(...rawData);
      }
  
        const makeUnique = filterholder
          .filter(onlyUnique)
          .sort((a, b) => 
          reverse === false ?
          new Date(a.indate) - new Date(b.indate) :
          new Date(b.indate) - new Date(a.indate));
        const searchit = makeUnique.filter((events) =>
          events.name.toLowerCase().includes(searchTerm)
        );
        const gettypefilter = searchit.filter(function (ef) {
          const newfilterpull = ef.ForecastChars
          .some(CharList => CharList.CharID === condFilter)
          ;
          if(condFilter !== ""){
            return newfilterpull;
          } else {
            return ef
          }});
        setFilterResults(makeUnique);
        setSearchResults(gettypefilter);
        const newlistdisplay = gettypefilter.slice(0, limits);
        setShowLoadMore(limits < gettypefilter.length ? true : false);
        setListDisplay(newlistdisplay);
        setListLength(limits < gettypefilter.length ? gettypefilter.length : newlistdisplay.length);
        setDisplayBanner(
          <>Displaying <span className="subtextgold">{newlistdisplay.length}</span> of <span className="subtextgold"> {gettypefilter.length}</span> {banerDisplayTerm}</>
        );
    }, [board5char,limits,rawData,searchTerm,clearFilter, newchar, btchar, btpluschar, ldchar, ldboardchar, sevenachar, sevenapluschar, reworkchar,frchar, frboardchar, eightychar, ninetychar, jponly, condFilter, reverse, prefilterlist]);
  
      const newcharbutton = () => {
        if(newchar == false){
          setNewCharsearch("true")
          } else {
            setNewCharsearch("")
          }
      setNewChar((prevValue) => !prevValue);
    };
    const btcharbutton = () => {
      if(btchar == false){
        setBTCharsearch("true")
        } else {
            setBTCharsearch("")
        }
      setBTChar((prevValue) => !prevValue);
    };
    const btpluscharbutton = () => {
      if(btpluschar == false){
        setBTPlusCharsearch("true")
        } else {
            setBTPlusCharsearch("")
        }
      setBTPlusChar((prevValue) => !prevValue);
    };

    const ldcharbutton = () => {
      if(ldchar == false){
        setLDCharsearch("true")
        } else {
            setLDCharsearch("")
        }
      setLDChar((prevValue) => !prevValue);
    };
    const ldboardcharbutton = () => {
      if(ldboardchar == false){
        setLDBoardCharsearch("true")
        } else {
            setLDBoardCharsearch("")
        }
      setLDBoardChar((prevValue) => !prevValue);
    };
    const frboardcharbutton = () => {
      if(frboardchar == false){
        setFRBoardCharsearch("true")
        } else {
            setFRBoardCharsearch("")
        }
      setFRBoardChar((prevValue) => !prevValue);
    };
    const board5charbutton = () => {
      if(frboardchar == false){
        setBoard5Charsearch("true")
        } else {
            setBoard5Charsearch("")
        }
      setBoard5Char((prevValue) => !prevValue);
    };
    const sevenacharbutton = () => {
        if(sevenachar == false){
            setSevenACharsearch("true")
          } else {
            setSevenACharsearch("")
          }
        setSevenAChar((prevValue) => !prevValue);
      };
      const sevenapluscharbutton = () => {
        if(sevenapluschar == false){
            setSevenAPlusCharsearch("true")
          } else {
            setSevenAPlusCharsearch("")
          }
        setSevenAPlusChar((prevValue) => !prevValue);
      };
      const reworkcharbutton = () => {
        if(reworkchar == false){
            setReworkCharsearch("true")
          } else {
            setReworkCharsearch("")
          }
          setReworkChar((prevValue) => !prevValue);
      };
      const eightycharbutton = () => {
        if(eightychar == false){
            setEightyCharsearch("true")
          } else {
            setEightyCharsearch("")
          }
          setEightyChar((prevValue) => !prevValue);
      };
      const ninetycharbutton = () => {
        if(ninetychar == false){
            setNinetyCharsearch("true")
          } else {
            setNinetyCharsearch("")
          }
          setNinetyChar((prevValue) => !prevValue);
      };
    const futurebutton = () => {
        if(futureevents == false){
          setFutureEventssearch("true")
          } else {
          setFutureEventssearch("")
          }
        setFutureEvents((prevValue) => !prevValue);
      };
      const frbutton = () => {
        if(frchar == false){
          setFRCharsearch("true")
          } else {
            setFRCharsearch("")
          }
        setFRChar((prevValue) => !prevValue);
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
    
  
    const reversebutton = () => {
      if(reverse == false){
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
  useEffect(()=>{
    const typeListArray2 = Object.values(ProcessedCharacters).filter(self=>jptoggledata == true? self.JPOrder != undefined : self.GLOrder != undefined).sort((a,b)=>jptoggledata == true? b.JPOrder - a.JPOrder : b.GLOrder - a.GLOrder).map((typeListUnique) => ({
      value: typeListUnique.CharacterName,
      label: typeListUnique.CharacterName,
      id: typeListUnique.CharID,
    }));
    settypeListArray(typeListArray2)
  },[jptoggledata,ProcessedCharacters,settypeListArray])
  
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
  
    const resetbutton = () =>{
      setclearFilter(true);
      setReverse(false)
      setFutureEvents(false);
      setNewChar(false)
      setBTChar(false)
      setBTPlusChar(false)
      setLDChar(false)
      setLDBoardChar(false)
      setFRBoardChar(false)
      setSevenAChar(false)
      setSevenAPlusChar(false)
      setReworkChar(false)
      setEightyChar(false)
      setNinetyChar(false)
      setFRChar(false)
      setBoard5Char(false)
  
      setNewCharsearch("")
      setBTCharsearch("")
      setBTPlusCharsearch("")
      setLDCharsearch("")
      setLDBoardCharsearch("")
      setFRBoardCharsearch("")
      setSevenACharsearch("")
      setSevenAPlusCharsearch("")
      setReworkCharsearch("")
      setEightyCharsearch("")
      setNinetyCharsearch("")
      setFRCharsearch("")
      setBoard5Charsearch("")

      setFutureEventssearch("")
      setReversesearch("")
      setTEXTsearch("")
      setTypesearch("")
  
      setsearchdisplay("");
      setSearchTerm("");
      setCondFilter("")
      setTimeout(() => setclearFilter(false), 1000);
    }
  
     const releases = listDisplay;

    return(
        <div>
      <Helmet>
          <title>Release Forecast - Dissidia Compendium</title>
          <meta property="og:site_name" content="Dissidia Compendium"/>
          <meta name="description" content="Upcoming Release Forecast in a timeline!"/>
          <meta name="twitter:title" content="Release Forecast - Dissidia Compendium"/>
          <meta property="og:type" content="website" />
          <meta name="twitter:description" content="Upcoming Release Forecast in a timeline!"/>
          <meta property="og:title" content="Release Forecast - Dissidia Compendium"/>
          <meta property="og:description" content="Upcoming Release Forecast in a timeline!"/>
          <meta property="og:url" content="https://dissidiacompendium.com/events/forecast"/>
      </Helmet>
      <div className="content">
        <h1>{jponly== false? "GL " :"JP "}Forecast</h1>
        <div className="subheader">Use filters to limit returns</div>
        <div className="charfilterspacer"/>
          <div onClick={showfilterbutton} className="charfilter" id={showFilter ? "filteropen" : "filterclosed"}><span className="filterstext"></span>{showFilter ? <TiArrowSortedUp className="uparrow"/> : <TiArrowSortedDown className="downarrow"/>}</div>
          {showFilter == false ? 
              <div className="event-search-reverse-holder">
                <span className={`${jptoggledata ? "jponlybackground" : "GLonlybackground"}`}>
              <Tippy content={`${jptoggledata ? "Switch to GL" : "Switch to JP"}`} className="tooltip" >
                <span onClick={jponlybutton} className={`${jptoggledata ? "jpflage jpsmallinactive smalleventbutton" : "glflage smalleventbutton"}`}/>
                </Tippy>
                </span>
                <IoSearch className="searchicon"/>
              <div className="search-holder el">
                <input 
                    className="char-search-bar" 
                    type="text"
                    placeholder="Banner Name"
                    value={searchdisplay}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <span className="pasteventbackground">
                <Tippy content="Future Events" className="tooltip" >
                <span onClick={futurebutton} className={`futureevents ${futureevents ? "pastsmallactive" : "pastsmallinactive" }`}/>
                </Tippy>
                </span>
                {searchTerm === "" ? "" : 
                <IoMdCloseCircleOutline onClick={clearSearch} className="eventclearsearch"></IoMdCloseCircleOutline>}
                </div>
                </div>
              :""
              }
            <div className="filterholder noselect" id={showFilter ? "showfilteren" : "hiddenfilteren"}>
            <div className="similarbanner">Multiple filters can be active</div>
              <div className="filterholderflair">
                <ul className="refineabilities">
                    <Tippy content="New Character" className="tooltip" >
                        <li alt="New Character" onClick={newcharbutton} className={`${newchar ? "filteractive": "filterinactive"} NewChar buffbutton`}></li>
                    </Tippy>
                    <Tippy content="FR Characters" className="tooltip" >
                        <li alt="FR Characters" onClick={frbutton} className={`${frchar ? "filteractive": "filterinactive"} frbutton buffbutton`}></li>
                    </Tippy>
                    <Tippy content="FR Boards Characters" className="tooltip" >
                        <li alt="FR Boards" onClick={board5charbutton} className={`${board5char ? "filteractive": "filterinactive"} board5button buffbutton`}></li>
                    </Tippy>
                    <Tippy content="Force Enhancement" className="tooltip" >
                        <li alt="Force Enhancement" onClick={frboardcharbutton} className={`${frboardchar ? "filteractive": "filterinactive"} frboardbutton buffbutton`}></li>
                    </Tippy>
                    <Tippy content="BT+ Characters" className="tooltip" >
                        <li alt="BT+ Characters" onClick={btpluscharbutton} className={`${btpluschar ? "filteractive": "filterinactive"} wpbtplusbutton buffbutton`}></li>
                    </Tippy>
                    <Tippy content="LD Characters" className="tooltip" >
                        <li alt="LD Characters" onClick={ldcharbutton} className={`${ldchar ? "filteractive": "filterinactive"} wpldbutton buffbutton`}></li>
                    </Tippy>
                    <Tippy content="Rework Characters" className="tooltip" >
                        <li alt="Rework Characters" onClick={reworkcharbutton} className={`${reworkchar ? "filteractive": "filterinactive"} reworkicon buffbutton`}></li>
                    </Tippy>
                    <Tippy content="7★+ Armor Characters" className="tooltip" >
                        <li alt="7★+ Armor" onClick={sevenapluscharbutton} className={`${sevenapluschar ? "filteractive": "filterinactive"} arm7aplusbutton buffbutton`}></li>
                    </Tippy>
                    <Tippy content="Level 90 Characters" className="tooltip" >
                        <li alt="Level 90 Characters" onClick={ninetycharbutton} className={`${ninetychar ? "filteractive": "filterinactive"} cl90button buffbutton`}></li>
                    </Tippy>
                    
                </ul>
                <div className="similarbanner">Additional Releases</div>
                <ul className="eventtypes">
                  <Tippy content="JP Schedule" className="tooltip" >
                  <li alt="Upcoming JP" onClick={jponlybutton} className={`${jponly ? "filteractive": "filterinactive"} JPOnly eventbutton`} ></li>
                  </Tippy>
                  <Tippy content="Future Event" className="tooltip" >
                  <li alt="Future Events" onClick={futurebutton} className={`${futureevents ? "filteractive": "filterinactive"} FutureEvents eventbutton`}></li>
                  </Tippy>
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
                      onChange={characterSelect} 
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
                        placeholder="Banner Name"
                        value={searchdisplay}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                    {searchTerm === "" ? "" : 
                    <IoMdCloseCircleOutline onClick={clearSearch} className="clearsearch"></IoMdCloseCircleOutline>}
                  </div>
                  <Tippy content="Reverse Order" className="tooltip" >
                          <div className={`reversebox`} ><i onClick={reversebutton} className={`reversebutton ${loop ? "flip": ""}`} ><ImSortAmountAsc className={`reversebutton ${reverse ? "": "nodisplay"}`}/><ImSortAmountDesc className={`reversebutton ${reverse ? "nodisplay": ""}`}/></i></div>
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
              <Link to={"/events"}>
                <li className={""} >Events</li>
              </Link>
              <Link to={"../events/banners"}>
              <li className={""} >Banners</li>
              </Link>
              <Link to={"/events/forecast"}>
              <li className={"active"} ><span className="gemselected"/>Forecast</li>
              </Link>
              <Link to={"/events/panels"}>
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
            {releases.length !== 0 ?
            releases.map(events => (
              <ForecastFormatting 
              key={events.bannerindex} 
              match={events} 
              newchar={newchar} 
              btchar={btchar} 
              btpluschar={btpluschar} 
              ldchar={ldchar} 
              ldboardchar={ldboardchar} 
              frboardchar={frboardchar} 
              sevenachar={sevenachar} 
              sevenapluschar={sevenapluschar} 
              reworkchar={reworkchar} 
              eightychar={eightychar} 
              ninetychar={ninetychar} 
              frchar={frchar} 
              board5char={board5char} 
              CharID={condFilter}
              />
           )) :
           <div className="subtextbottom">
             No results / currently posted upcoming releases
             <br/>
             <br/>
             Try changing refinements or including JP / Future content
           </div>
           }
           {releases.length !== 0 ?
           <div className="subtextbottom">
                {displayBanner}
            </div>
            : ""}
          </ul>
          {showLoadMore && 
                <div className="loadmore" onClick={loadMoreButton}> Load More </div>}
      </div>
    </div>
    )
}

export default Forecast