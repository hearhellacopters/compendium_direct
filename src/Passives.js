import React, {useState, useEffect} from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import { useDispatch } from "react-redux";
import { setFalse, setTrue } from './redux/ducks/jptoggle'
import { Link } from 'react-router-dom'
import './Spheres.css';
import Tippy from './formatting/TippyDefaults.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import { slice, concat, } from 'lodash';
import PassivesFormatting from './formatting/PassivesFormatting.js'
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

const Passives = ({ProcessedCharacters, ProcessedPassives, ProcessedBuffs, jptoggledata}) => {

  //const error = ProcessedPassives.filter(function (ef) {
  //  const newfilterpull = ef["JPName"] == '';
  //  return newfilterpull;
  //})
  //
  //console.log(error)

  const dispatch = useDispatch();

  const passivelimit = window.innerWidth <= 815 ? 30 : 60;
  
  const rawData = ProcessedPassives;

  const banerDisplayTerm = "passives";

  const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null  ? true : false);
  const [clearFilter, setclearFilter] = useStateIfMounted(false);

  const [ldext, setldext] = useState(getQueryStringVal("ldext") != null ? true : false);
  const [ldcall, setldcall] = useState(getQueryStringVal("ldcall") != null ? true : false);
  const [boardfr, setboardfr] = useState(getQueryStringVal("boardfr") != null ? true : false);
  const [board5ext, setboard5ext] = useState(getQueryStringVal("board5ext") != null ? true : false);
  const [board5echo, setboard5echo] = useState(getQueryStringVal("board5echo") != null ? true : false);
  const [board5, setboard5] = useState(getQueryStringVal("board5") != null ? true : false);
  const [board4, setboard4] = useState(getQueryStringVal("board4") != null ? true : false);
  const [board3, setboard3] = useState(getQueryStringVal("board3") != null ? true : false);
  const [board2, setboard2] = useState(getQueryStringVal("board2") != null ? true : false);
  const [board1, setboard1] = useState(getQueryStringVal("board1") != null ? true : false);
  const [cl90, setcl90] = useState(getQueryStringVal("cl90") != null ? true : false);
  const [cl88, setcl88] = useState(getQueryStringVal("cl88") != null ? true : false);
  const [cl85, setcl85] = useState(getQueryStringVal("cl85") != null ? true : false);
  const [cl80, setcl80] = useState(getQueryStringVal("cl80") != null ? true : false);
  const [cl78, setcl78] = useState(getQueryStringVal("cl78") != null ? true : false);
  const [cl75, setcl75] = useState(getQueryStringVal("cl75") != null ? true : false);
  const [cl70, setcl70] = useState(getQueryStringVal("cl70") != null ? true : false);
  const [cl68, setcl68] = useState(getQueryStringVal("cl68") != null ? true : false);
  const [cl65, setcl65] = useState(getQueryStringVal("cl65") != null ? true : false);
  const [cl60, setcl60] = useState(getQueryStringVal("cl60") != null ? true : false);
  const [cl58, setcl58] = useState(getQueryStringVal("cl58") != null ? true : false);
  const [cl55, setcl55] = useState(getQueryStringVal("cl55") != null ? true : false);
  const [cl54, setcl54] = useState(getQueryStringVal("cl54") != null ? true : false);
  const [cl50, setcl50] = useState(getQueryStringVal("cl50") != null ? true : false);
  const [cl45, setcl45] = useState(getQueryStringVal("cl45") != null ? true : false);
  const [cl40, setcl40] = useState(getQueryStringVal("cl40") != null ? true : false);
  const [cl35, setcl35] = useState(getQueryStringVal("cl35") != null ? true : false);
  const [cl30, setcl30] = useState(getQueryStringVal("cl30") != null ? true : false);
  const [cl25, setcl25] = useState(getQueryStringVal("cl25") != null ? true : false);
  const [cl20, setcl20] = useState(getQueryStringVal("cl20") != null ? true : false);
  const [cl15, setcl15] = useState(getQueryStringVal("cl15") != null ? true : false);
  const [cl10, setcl10] = useState(getQueryStringVal("cl20") != null ? true : false);
  const [cl5, setcl5] = useState(getQueryStringVal("cl5") != null ? true : false);
  const [cl1, setcl1] = useState(getQueryStringVal("cl1") != null ? true : false);
  const [artpass, setartpass] = useState(getQueryStringVal("art") != null ? true : false);
  const [ActiveRework, setActiveRework] = useState(getQueryStringVal("rework") != null ? true : false);

  const [loop, setLoop] = useStateIfMounted(false);
  const [reverse, setReverse] = useState(getQueryStringVal("rev") != null ? true : false)
  const [searchTerm, setSearchTerm] = useState(getQueryStringVal("search") != null  ? getQueryStringVal("search").toLowerCase() : "");
  const [condFilter, setCondFilter] = useState("");
  const [searchdisplay, setsearchdisplay] = useState(getQueryStringVal("search") != null ? getQueryStringVal("search") : "");
  const [filterResults, setFilterResults] = useState(rawData);
  const [searchResults, setSearchResults] = useState(rawData);
  const [limits, setLimits] = useState(passivelimit);
  const [listDisplay, setListDisplay] = useState(
    slice(rawData, 0, passivelimit)
  );

  const [listLength, setListLength] = useState(listDisplay.length);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [displayBanner, setDisplayBanner] = useState(
    <>Displaying <span className="subtextgold">{listLength}</span> of <span className="subtextgold"> {rawData.length}</span> {banerDisplayTerm}</>
  );

  
    const [ldextsearch, setldextsearch] = useQueryParam("ldext", "");
    const [ldcallsearch, setldcallsearch] = useQueryParam("ldcall", "");
    const [boardfrsearch, setboardfrsearch] = useQueryParam("boardfr", "");
    const [board5search, setboard5search] = useQueryParam("board5", "");
    const [board5extsearch, setboard5extsearch] = useQueryParam("board5ext", "");
    const [board5echosearch, setboard5echosearch] = useQueryParam("board5echo", "");
    const [board4search, setboard4search] = useQueryParam("board4", "");
    const [board3search, setboard3search] = useQueryParam("board3", "");
    const [board2search, setboard2search] = useQueryParam("board2", "");
    const [board1search, setboard1search] = useQueryParam("board1", "");
    const [cl90search, setcl90search] = useQueryParam("cl90", "");
    const [cl88search, setcl88search] = useQueryParam("cl88", "");
    const [cl85search, setcl85search] = useQueryParam("cl85", "");
    const [cl80search, setcl80search] = useQueryParam("cl80", "");
    const [cl78search, setcl78search] = useQueryParam("cl77", "");
    const [cl75search, setcl75search] = useQueryParam("cl75", "");
    const [cl70search, setcl70search] = useQueryParam("cl70", "");
    const [cl68search, setcl68search] = useQueryParam("cl68", "");
    const [cl65search, setcl65search] = useQueryParam("cl65", "");
    const [cl60search, setcl60search] = useQueryParam("cl60", "");
    const [cl58search, setcl58search] = useQueryParam("cl58", "");
    const [cl55search, setcl55search] = useQueryParam("cl55", "");
    const [cl54search, setcl54search] = useQueryParam("cl54", "");
    const [cl50search, setcl50search] = useQueryParam("cl50", "");
    const [cl45search, setcl45search] = useQueryParam("cl45", "");
    const [cl40search, setcl40search] = useQueryParam("cl40", "");
    const [cl35search, setcl35search] = useQueryParam("cl35", "");
    const [cl30search, setcl30search] = useQueryParam("cl30", "");
    const [cl25search, setcl25search] = useQueryParam("cl25", "");
    const [cl20search, setcl20search] = useQueryParam("cl20", "");
    const [cl15search, setcl15search] = useQueryParam("cl15", "");
    const [cl10search, setcl10search] = useQueryParam("cl10", "");
    const [cl5search, setcl5search] = useQueryParam("cl5", "");
    const [cl1search, setcl1search] = useQueryParam("cl1", "");
    const [artpasssearch, setartpasssearch] = useQueryParam("art", "");
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
    },[setCondFilter,ProcessedCharacters,Typesearch,setTypesearch])


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
    if(ActiveRework == false){
      const filterholder = [];
      if (ldext === true) {
        const filteredout = rawData.filter(
          (passives) => passives["LDBoard"] == 1
        );
        filterholder.push(...filteredout);
      }
      if (ldcall === true) {
        const filteredout = rawData.filter(
          (passives) => passives["LDBoard"] == 2
        );
        filterholder.push(...filteredout);
      }
      if (board5echo === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "board5echo"
        );
        filterholder.push(...filteredout);
      }
      if (board5ext === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "board5ext"
        );
        filterholder.push(...filteredout);
      }
      if (board5 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "board5"
        );
        filterholder.push(...filteredout);
      }
      if (board4 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "board4"
        );
        filterholder.push(...filteredout);
      }
      if (boardfr === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveType"] == "boardfr"
        );
        filterholder.push(...filteredout);
      }
      if (board3 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "board3"
        );
        filterholder.push(...filteredout);
      }
      if (board2 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "board2"
        );
        filterholder.push(...filteredout);
      }
      if (board1 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "board1"
        );
        filterholder.push(...filteredout);
      }
      if (cl90 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "cl90"
        );
        filterholder.push(...filteredout);
      }
      if (cl88 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "cl88"
        );
        filterholder.push(...filteredout);
      }
      if (cl85 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "cl85"
        );
        filterholder.push(...filteredout);
      }
      if (cl80 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "cl80"
        );
        filterholder.push(...filteredout);
      }
      if (cl78 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "cl78"
        );
        filterholder.push(...filteredout);
      }
      if (cl75 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "cl75"
        );
        filterholder.push(...filteredout);
      }
      if (cl70 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "cl70"
        );
        filterholder.push(...filteredout);
      }
      if (cl68 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "cl68"
        );
        filterholder.push(...filteredout);
      }
      if (cl65 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "cl65"
        );
        filterholder.push(...filteredout);
      }
      if (cl60 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "cl60"
        );
        filterholder.push(...filteredout);
      }
      if (cl58 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "cl58"
        );
        filterholder.push(...filteredout);
      }
      if (cl55 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "cl55"
        );
        filterholder.push(...filteredout);
      }
      if (cl54 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "cl54"
        );
        filterholder.push(...filteredout);
      }
      if (cl50 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "cl50"
        );
        filterholder.push(...filteredout);
      }
      if (cl45 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "cl45"
        );
        filterholder.push(...filteredout);
      }
      if (cl40 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "cl40"
        );
        filterholder.push(...filteredout);
      }
      if (cl35 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "cl35"
        );
        filterholder.push(...filteredout);
      }
      if (cl30 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "cl30"
        );
        filterholder.push(...filteredout);
      }
      if (cl25 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "cl25"
        );
        filterholder.push(...filteredout);
      }
      if (cl20 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "cl20"
        );
        filterholder.push(...filteredout);
      }
      if (cl15 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "cl15"
        );
        filterholder.push(...filteredout);
      }
      if (cl10 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "cl10"
        );
        filterholder.push(...filteredout);
      }
      if (cl5 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "cl5"
        );
        filterholder.push(...filteredout);
      }
      if (cl1 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "cl1"
        );
        filterholder.push(...filteredout);
      }
      if (artpass === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "artpass"
        );
        filterholder.push(...filteredout);
      }
  
      if (filterholder.length === 0) {
        filterholder.push(...rawData);
      }

      const makeUnique = filterholder
          .filter(onlyUnique)
          .sort((a, b) => 
          reverse == false ? 
          a.PassiveKey - b.PassiveKey :
          b.PassiveKey - a.PassiveKey );
          const searchit = makeUnique.filter((e) =>
          (`${e.PassiveName} ${e.JPName} ${e.PassiveDesc == undefined ? "" : e.PassiveDesc.replace(/(<span class=")/gm,"").replace(/(">)/gm,"").replace(/(<\/span>)/gm,"").replace(/(upstat)/gm,"").replace(/(downstat)/gm,"").replace(/(unique)/gm,"").replace(/(values)/gm,"")}`).toLowerCase().includes(searchTerm)
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
  }, [board5echo,board5ext,board5,cl90,cl88,cl85,boardfr,limits,searchTerm,rawData,ActiveRework, clearFilter, ldcall, ldext, board4, board3, board2, board1, cl80, cl78, cl75, cl70, cl68, cl65, cl60, cl58, cl55, cl54, cl50, cl45, cl40, cl35, cl30, cl25, cl20, cl15, cl10, cl5, cl1, artpass, condFilter, reverse]);


  //buttons
  const ldcallbutton = () => {
    if (ldcall == false) {
      setldcallsearch("true")
    } else {
      setldcallsearch("")
    }
    setldcall((prevValue) => !prevValue);
  };
  const ldextbutton = () => {
    if(ldext == false){
      setldextsearch("true")
    } else {
      setldextsearch("")
    }
    setldext((prevValue) => !prevValue);
  };
  const board4button = () => {
    if(board4 == false){
      setboard4search("true")
    }else{
      setboard4search("")
    }
    setboard4((prevValue) => !prevValue);
  };
  const board5button = () => {
    if(board5 == false){
      setboard5search("true")
    }else{
      setboard5search("")
    }
    setboard5((prevValue) => !prevValue);
  };
  const board5extbutton = () => {
    if(board5ext == false){
      setboard5extsearch("true")
    }else{
      setboard5extsearch("")
    }
    setboard5ext((prevValue) => !prevValue);
  };
  const board5echobutton = () => {
    if(board5echo == false){
      setboard5echosearch("true")
    }else{
      setboard5echosearch("")
    }
    setboard5echo((prevValue) => !prevValue);
  };
  const board3button = () => {
    if(board3 == false){
      setboard3search("true")
    }else{
      setboard3search("")
    }
    setboard3((prevValue) => !prevValue);
  };
  const board2button = () => {
    if(board2 == false){
      setboard2search("true")
    }else{
      setboard2search("")
    }
    setboard2((prevValue) => !prevValue);
  };
  const board1button = () => {
    if(board1 == false){
      setboard1search("true")
    }else{
      setboard1search("")
    }
    setboard1((prevValue) => !prevValue);
  };
  const boardfrbutton = () => {
    if(boardfr == false){
      setboardfrsearch("true")
    }else{
      setboardfrsearch("")
    }
    setboardfr((prevValue) => !prevValue);
  };
  const cl90button = () => {
    if(cl90 == false){
      setcl90search("true")
    } else {
      setcl90search("")
    }
    setcl90((prevValue) => !prevValue);
  };
  const cl88button = () => {
    if(cl88 == false){
      setcl88search("true")
    } else {
      setcl88search("")
    }
    setcl88((prevValue) => !prevValue);
  };
  const cl85button = () => {
    if(cl85 == false){
      setcl85search("true")
    } else {
      setcl85search("")
    }
    setcl85((prevValue) => !prevValue);
  };
  const cl80button = () => {
    if(cl80 == false){
      setcl80search("true")
    } else {
      setcl80search("")
    }
    setcl80((prevValue) => !prevValue);
  };
  const cl78button = () => {
    if(cl78 == false){
      setcl78search("true")
    } else {
      setcl78search("")
    }
    setcl78((prevValue) => !prevValue);
  };
  const cl75button = () => {
    if(cl75 == false){
      setcl75search("true")
    } else {
      setcl75search("")
    }
    setcl75((prevValue) => !prevValue);
  };
  const cl70button = () => {
    if(cl70 == false){
      setcl70search("true")
    } else {
      setcl70search("")
    }
    setcl70((prevValue) => !prevValue);
  };
  const cl68button = () => {
    if(cl68 == false){
      setcl68search("true")
    } else {
      setcl68search("")
    }
    setcl68((prevValue) => !prevValue);
  };
  const cl65button = () => {
    if(cl65 == false){
      setcl65search("true")
    } else {
      setcl65search("")
    }
    setcl65((prevValue) => !prevValue);
  };
  const cl60button = () => {
    if(cl60 == false){
      setcl60search("true")
    } else {
      setcl60search("")
    }
    setcl60((prevValue) => !prevValue);
  };
  const cl58button = () => {
    if(cl58 == false){
      setcl58search("true")
    } else {
      setcl58search("")
    }
    setcl58((prevValue) => !prevValue);
  };
  const cl55button = () => {
    if(cl55 == false){
      setcl55search("true")
    } else {
      setcl55search("")
    }
    setcl55((prevValue) => !prevValue);
  };
  const cl54button = () => {
    if(cl54 == false){
      setcl54search("true")
    } else {
      setcl54search("")
    }
    setcl54((prevValue) => !prevValue);
  };
  const cl50button = () => {
    if(cl50 == false){
      setcl50search("true")
    } else {
      setcl50search("")
    }
    setcl50((prevValue) => !prevValue);
  };
  const cl45button = () => {
    if(cl45 == false){
      setcl45search("true")
    } else {
      setcl45search("")
    }
    setcl45((prevValue) => !prevValue);
  };
  const cl40button = () => {
    if(cl40 == false){
      setcl40search("true")
    } else {
      setcl40search("")
    }
    setcl40((prevValue) => !prevValue);
  };
  const cl35button = () => {
    if(cl35 == false){
      setcl35search("true")
    } else {
      setcl35search("")
    }
    setcl35((prevValue) => !prevValue);
  };
  const cl30button = () => {
    if(cl30 == false){
      setcl30search("true")
    } else {
      setcl30search("")
    }
    setcl30((prevValue) => !prevValue);
  };
  const cl25button = () => {
    if(cl25 == false){
      setcl25search("true")
    } else {
      setcl25search("")
    }
    setcl25((prevValue) => !prevValue);
  };
  const cl20button = () => {
    if(cl20 == false){
      setcl20search("true")
    } else {
      setcl20search("")
    }
    setcl20((prevValue) => !prevValue);
  };
  const cl15button = () => {
    if(cl15 == false){
      setcl15search("true")
    } else {
      setcl15search("")
    }
    setcl15((prevValue) => !prevValue);
  };
  const cl10button = () => {
    if(cl10 == false){
      setcl10search("true")
    } else {
      setcl10search("")
    }
    setcl10((prevValue) => !prevValue);
  };
  const cl5button = () => {
    if(cl5 == false){
      setcl5search("true")
    } else {
      setcl5search("")
    }
    setcl5((prevValue) => !prevValue);
  };
  const cl1button = () => {
    if(cl1 == false){
      setcl1search("true")
    } else {
      setcl1search("")
    }
    setcl1((prevValue) => !prevValue);
  };
  const artpassbutton = () => {
    if(artpass == false){
      setartpasssearch("true")
    } else {
      setartpasssearch("")
    }
    setartpass((prevValue) => !prevValue);
  }
  const ActiveReworkbutton = () => {
    if(ActiveRework == false){
      setActiveReworksearch("true")
    } else {
      setActiveReworksearch("")
    }
    setActiveRework((prevValue) => !prevValue);
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
        setTypesearch(e.label)
        setCondFilter(e.id);
      } else {
        setCondFilter("");
        setTypesearch("")
      }
    };

  //load more
  const loadMoreButton = () => {
    const newlimits = limits + passivelimit;
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

  //rework filter
  useEffect(() => {
    if(ActiveRework == true) {
      const rework = {
        PassiveGLFlag: true
      }

      const filtermerge = rawData.filter((passive) => {
        return Object.entries(rework)
          .filter(entry => entry[1])
          .every(([key, value]) => passive[key] === value);
      });

      const filterholder = [];
      if (ldext === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["LDBoard"] == 1
        );
        filterholder.push(...filteredout);
      }
      if (ldcall === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["LDBoard"] == 2
        );
        filterholder.push(...filteredout);
      }
      if (board5echo === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveType"] === "board5echo"
        );
        filterholder.push(...filteredout);
      }
      if (board5ext === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveType"] === "board5ext"
        );
        filterholder.push(...filteredout);
      }
      if (board5 === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveLoc"] === "board5"
        );
        filterholder.push(...filteredout);
      }
      if (board4 === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["PassiveLoc"] === "board4"
        );
        filterholder.push(...filteredout);
      }
      if (board3 === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["PassiveLoc"] === "board3"
        );
        filterholder.push(...filteredout);
      }
      if (board2 === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["PassiveLoc"] === "board2"
        );
        filterholder.push(...filteredout);
      }
      if (board1 === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["PassiveLoc"] === "board1"
        );
        filterholder.push(...filteredout);
      }
      if (boardfr === true) {
        const filteredout = rawData.filter(
          (passives) => passives["PassiveRank"] == 405 || passives["PassiveRank"] == 410 || passives["PassiveRank"] == 415 || passives["PassiveRank"] == 420 || passives["PassiveRank"] == 425 || passives["PassiveRank"] == 430
        );
        filterholder.push(...filteredout);
      }
      if (cl90 === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["PassiveLoc"] === "cl90"
        );
        filterholder.push(...filteredout);
      }
      if (cl88 === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["PassiveLoc"] === "cl88"
        );
        filterholder.push(...filteredout);
      }
      if (cl85 === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["PassiveLoc"] === "cl85"
        );
        filterholder.push(...filteredout);
      }
      if (cl80 === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["PassiveLoc"] === "cl80"
        );
        filterholder.push(...filteredout);
      }
      if (cl78 === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["PassiveLoc"] === "cl78"
        );
        filterholder.push(...filteredout);
      }
      if (cl75 === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["PassiveLoc"] === "cl75"
        );
        filterholder.push(...filteredout);
      }
      if (cl70 === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["PassiveLoc"] === "cl70"
        );
        filterholder.push(...filteredout);
      }
      if (cl68 === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["PassiveLoc"] === "cl68"
        );
        filterholder.push(...filteredout);
      }
      if (cl65 === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["PassiveLoc"] === "cl65"
        );
        filterholder.push(...filteredout);
      }
      if (cl60 === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["PassiveLoc"] === "cl60"
        );
        filterholder.push(...filteredout);
      }
      if (cl58 === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["PassiveLoc"] === "cl58"
        );
        filterholder.push(...filteredout);
      }
      if (cl55 === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["PassiveLoc"] === "cl55"
        );
        filterholder.push(...filteredout);
      }
      if (cl54 === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["PassiveLoc"] === "cl54"
        );
        filterholder.push(...filteredout);
      }
      if (cl50 === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["PassiveLoc"] === "cl50"
        );
        filterholder.push(...filteredout);
      }
      if (cl45 === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["PassiveLoc"] === "cl45"
        );
        filterholder.push(...filteredout);
      }
      if (cl40 === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["PassiveLoc"] === "cl40"
        );
        filterholder.push(...filteredout);
      }
      if (cl35 === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["PassiveLoc"] === "cl35"
        );
        filterholder.push(...filteredout);
      }
      if (cl30 === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["PassiveLoc"] === "cl30"
        );
        filterholder.push(...filteredout);
      }
      if (cl25 === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["PassiveLoc"] === "cl25"
        );
        filterholder.push(...filteredout);
      }
      if (cl20 === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["PassiveLoc"] === "cl20"
        );
        filterholder.push(...filteredout);
      }
      if (cl15 === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["PassiveLoc"] === "cl15"
        );
        filterholder.push(...filteredout);
      }
      if (cl10 === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["PassiveLoc"] === "cl10"
        );
        filterholder.push(...filteredout);
      }
      if (cl5 === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["PassiveLoc"] === "cl5"
        );
        filterholder.push(...filteredout);
      }
      if (cl1 === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["PassiveLoc"] === "cl1"
        );
        filterholder.push(...filteredout);
      }
      if (artpass === true) {
        const filteredout = filtermerge.filter(
          (passives) => passives["PassiveLoc"] === "artpass"
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
          a.PassiveKey - b.PassiveKey :
          b.PassiveKey - a.PassiveKey );
        const searchit = makeUnique.filter((e) =>
        (`${e.PassiveName} ${e.JPName} ${e.PassiveDesc == undefined ? "" : e.PassiveDesc.replace(/(<span class=")/gm,"").replace(/(">)/gm,"").replace(/(<\/span>)/gm,"").replace(/(upstat)/gm,"").replace(/(downstat)/gm,"").replace(/(unique)/gm,"").replace(/(values)/gm,"")}`).toLowerCase().includes(searchTerm)
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
  }, [board5echo,board5ext,board5,boardfr, cl90,cl88,cl85,searchTerm,rawData,condFilter,artpass,ActiveRework,cl1,cl5,cl10,cl15,cl20,cl25,cl30,cl35,cl40,cl45,cl50,cl54,cl55,cl58,cl60,cl65,cl68,cl70,cl75,cl78,cl80,board1,board2,board3,board4,ldext,ldcall,limits,reverse])

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

  const resetbutton = () =>{
    setclearFilter(true);
    setReverse(false)
    setldcall(false)
    setldext(false)
    setboard5echo(false)
    setboard5ext(false)
    setboard5(false)
    setboard4(false)
    setboard3(false)
    setboard2(false)
    setboard1(false)
    setboardfr(false)
    setcl90(false)
    setcl88(false)
    setcl85(false)
    setcl80(false)
    setcl78(false)
    setcl75(false)
    setcl70(false)
    setcl68(false)
    setcl65(false)
    setcl60(false)
    setcl58(false)
    setcl55(false)
    setcl54(false)
    setcl50(false)
    setcl45(false)
    setcl40(false)
    setcl35(false)
    setcl30(false)
    setcl25(false)
    setcl20(false)
    setcl15(false)
    setcl10(false)
    setcl5(false)
    setcl1(false)
    setartpass(false)
    setActiveRework(false)

    setldcallsearch("")
    setldextsearch("")
    setboard5echosearch("")
    setboard5extsearch("")
    setboard5search("")
    setboard4search("")
    setboard3search("")
    setboard2search("")
    setboard1search("")
    setboardfrsearch("")
    setcl90search("")
    setcl88search("")
    setcl85search("")
    setcl80search("")
    setcl78search("")
    setcl75search("")
    setcl70search("")
    setcl68search("")
    setcl65search("")
    setcl60search("")
    setcl58search("")
    setcl55search("")
    setcl54search("")
    setcl50search("")
    setcl45search("")
    setcl40search("")
    setcl35search("")
    setcl30search("")
    setcl25search("")
    setcl20search("")
    setcl15search("")
    setcl10search("")
    setcl5search("")
    setcl1search("")
    setartpasssearch("")
    setReversesearch("")
    setTEXTsearch("")
    setTypesearch("")
    setActiveReworksearch("")

    setsearchdisplay("");
    setSearchTerm("");
    setCondFilter("")
    setTimeout(() => setclearFilter(false), 1000);
  }

  const listPasives = listDisplay;

    return (
      <div className="wrapper">
        <Helmet>
          <title>Passives - Dissidia Compendium</title>
          <meta property="og:site_name" content="Dissidia Compendium"/>
          <meta property="og:type" content="website" />
          <meta name="description" content="Passives Search"/>
          <meta name="twitter:title" content="Passives Search"/>
          <meta name="twitter:description" content="Passives Search"/>
          <meta property="og:title" content="Passives Search"/>
          <meta property="og:description" content="Passives Search"/>
          <meta property="og:url" content="https://dissidiacompendium.com/search/passives"/>
        </Helmet>
            <div className="content">
              <h1  >Passives</h1>
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
                    placeholder="Passive Name / Effect"
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
                      <div className="passivefilterbuttonholder">
                        <ul className="spheretypes">
                        <Tippy content="Force Enhancement Passive">
                            <li className={`${boardfr ? "filteractive": "filterinactive"} buffbutton boardfrbutton`} onClick={boardfrbutton}></li>
                          </Tippy>
                          <Tippy content="FR Extension Passive">
                            <li className={`${board5ext ? "filteractive": "filterinactive"} buffbutton board5extbutton`} onClick={board5extbutton}></li>
                          </Tippy>
                          <Tippy content="FR Echo Passive">
                            <li className={`${board5echo ? "filteractive": "filterinactive"} buffbutton board5echobutton`} onClick={board5echobutton}></li>
                          </Tippy>
                          <Tippy content="FR Board Passives">
                            <li className={`${board5 ? "filteractive": "filterinactive"} buffbutton board5button`} onClick={board5button}></li>
                          </Tippy>
                          <Tippy content="LD Extension Passive">
                            <li className={`${ldext ? "filteractive": "filterinactive"} buffbutton ench4extbutton`} onClick={ldextbutton}></li>
                          </Tippy>
                          <Tippy content={`LD Call & Extension Passives`}>
                            <li className={`${ldcall ? "filteractive": "filterinactive"} buffbutton ench4cextbutton`} onClick={ldcallbutton}></li>
                          </Tippy>
                          <Tippy content="LD Board Passives">
                            <li className={`${board4 ? "filteractive": "filterinactive"} buffbutton board4button`} onClick={board4button}></li>
                          </Tippy>
                          <Tippy content="EX Board Passives">
                            <li className={`${board3 ? "filteractive": "filterinactive"} buffbutton board3button`} onClick={board3button}></li>
                          </Tippy>
                          <Tippy content="S2 Board Passives">
                            <li className={`${board2 ? "filteractive": "filterinactive"} buffbutton board2button`} onClick={board2button}></li>
                          </Tippy>
                          <Tippy content="S1 Board Passives">
                            <li className={`${board1 ? "filteractive": "filterinactive"} buffbutton board1button`} onClick={board1button}></li>
                          </Tippy>
                          <Tippy content="Artifact Passives">
                            <li className={`${artpass ? "filteractive": "filterinactive"} buffbutton artpassbutton`} onClick={artpassbutton}></li>
                          </Tippy>
                          <li className={`${cl90 ? "filteractive": "filterinactive"} buffbutton cl90button`} onClick={cl90button}></li> 
                          <li className={`${cl88 ? "filteractive": "filterinactive"} buffbutton cl88button`} onClick={cl88button}></li> 
                          <li className={`${cl85 ? "filteractive": "filterinactive"} buffbutton cl85button`} onClick={cl85button}></li> 
                          <li className={`${cl80 ? "filteractive": "filterinactive"} buffbutton cl80button`} onClick={cl80button}></li> 
                          <li className={`${cl78 ? "filteractive": "filterinactive"} buffbutton cl78button`} onClick={cl78button}></li>
                          <li className={`${cl75 ? "filteractive": "filterinactive"} buffbutton cl75button`} onClick={cl75button}></li>
                          <li className={`${cl70 ? "filteractive": "filterinactive"} buffbutton cl70button`} onClick={cl70button}></li>
                          <li className={`${cl68 ? "filteractive": "filterinactive"} buffbutton cl68button`} onClick={cl68button}></li>
                          <li className={`${cl65 ? "filteractive": "filterinactive"} buffbutton cl65button`} onClick={cl65button}></li>
                          <li className={`${cl60 ? "filteractive": "filterinactive"} buffbutton cl60button`} onClick={cl60button}></li>
                          <li className={`${cl58 ? "filteractive": "filterinactive"} buffbutton cl58button`} onClick={cl58button}></li>
                          <li className={`${cl55 ? "filteractive": "filterinactive"} buffbutton cl55button`} onClick={cl55button}></li>
                          <li className={`${cl54 ? "filteractive": "filterinactive"} buffbutton cl54button`} onClick={cl54button}></li>
                          <li className={`${cl50 ? "filteractive": "filterinactive"} buffbutton cl50button`} onClick={cl50button}></li>
                          <li className={`${cl45 ? "filteractive": "filterinactive"} buffbutton cl45button`} onClick={cl45button}></li>   
                          <li className={`${cl40 ? "filteractive": "filterinactive"} buffbutton cl40button`} onClick={cl40button}></li>
                          <li className={`${cl35 ? "filteractive": "filterinactive"} buffbutton cl35button`} onClick={cl35button}></li>
                          <li className={`${cl30 ? "filteractive": "filterinactive"} buffbutton cl30button`} onClick={cl30button}></li>
                          <li className={`${cl25 ? "filteractive": "filterinactive"} buffbutton cl25button`} onClick={cl25button}></li>
                          <li className={`${cl20 ? "filteractive": "filterinactive"} buffbutton cl20button`} onClick={cl20button}></li>
                          <li className={`${cl15 ? "filteractive": "filterinactive"} buffbutton cl15button`} onClick={cl15button}></li>
                          <li className={`${cl10 ? "filteractive": "filterinactive"} buffbutton cl10button`} onClick={cl10button}></li>
                          <li className={`${cl5 ? "filteractive": "filterinactive"} buffbutton cl5button`} onClick={cl5button}></li>
                          <li className={`${cl1 ? "filteractive": "filterinactive"} buffbutton cl1button`} onClick={cl1button}></li>
                        </ul>
                      </div>      
                      <div className="similarbanner">Refine</div>
                      <ul className="bufftypes">
                      <Tippy content="Active JP Reworks">
                        <li className={`${ActiveRework ? "filteractive": "filterinactive"} buffbutton reworkbutton`} onClick={ActiveReworkbutton}></li>
                      </Tippy>
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
                              placeholder="Passive Name / Effect"
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
                  <li className={"active"} ><span className="gemselected"/>Passives</li>
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
              {listPasives.length > 0 ?  (
              listPasives.map(spheres =>(
                <PassivesFormatting key={spheres.PassiveKey} match={spheres} ProcessedBuffs={ProcessedBuffs} jptoggledata={jptoggledata}/>
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
export default Passives;