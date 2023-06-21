import React, { useState, useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import Tippy from './components/TippyDefaults'
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from 'react-helmet-async';
import Select from 'react-select';
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { FaUndoAlt } from 'react-icons/fa'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaShareSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { getQuery, getQueryStringVal, useQueryParam } from './components/URLParams'
import Passive_Ability_Formatting from './components/Passives/PassiveAbilityFormatting';
import Art_Passive_Formatting from './components/Passives/PassiveArtFormatting';

import { setFalse, setTrue } from './redux/ducks/jptoggle'

export default function Passives ({
  ProcessedPassives,

  ver,
  loc,
  file,

  formatting,
  master_index
}){

  const char_id = master_index.charid

  const passivelimit = window.innerWidth <= 815 ? 30 : 60;

  const rawData = ProcessedPassives;

  const banerDisplayTerm = "passives";

  const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null ? true : false);
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
  const [cl88, setcl88] = useState(getQueryStringVal("cl88") != null ? true : false);
  const [cl85, setcl85] = useState(getQueryStringVal("cl85") != null ? true : false);
  const [cl80, setcl80] = useState(getQueryStringVal("cl80") != null ? true : false);
  const [cl78, setcl78] = useState(getQueryStringVal("cl78") != null ? true : false);
  const [cl70, setcl70] = useState(getQueryStringVal("cl70") != null ? true : false);
  const [cl68, setcl68] = useState(getQueryStringVal("cl68") != null ? true : false);
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
  const [cl15, setcl15] = useState(getQueryStringVal("cl15") != null ? true : false);
  const [cl10, setcl10] = useState(getQueryStringVal("cl20") != null ? true : false);
  const [cl5, setcl5] = useState(getQueryStringVal("cl5") != null ? true : false);
  const [artpass, setartpass] = useState(getQueryStringVal("art") != null ? true : false);

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
  const [cl88search, setcl88search] = useQueryParam("cl88", "");
  const [cl85search, setcl85search] = useQueryParam("cl85", "");
  const [cl80search, setcl80search] = useQueryParam("cl80", "");
  const [cl78search, setcl78search] = useQueryParam("cl77", "");
  const [cl70search, setcl70search] = useQueryParam("cl70", "");
  const [cl68search, setcl68search] = useQueryParam("cl68", "");
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
  const [cl15search, setcl15search] = useQueryParam("cl15", "");
  const [cl10search, setcl10search] = useQueryParam("cl10", "");
  const [cl5search, setcl5search] = useQueryParam("cl5", "");
  const [artpasssearch, setartpasssearch] = useQueryParam("art", "");

  const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
  const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
  const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");
  const [Typesearch, setTypesearch] = useQueryParam("Char", "");
  const { protocol, pathname, host } = window.location;
  const query = getQuery();
  const url = `${protocol}//${host}${pathname}?${query.toString()}`

  useEffect(() => {
    //type params
    if (Typesearch != null) {
      const ID_PULL = Object.values(char_id).filter(self => self.name == getQueryStringVal("Char"))
      const match_id = ID_PULL[0] && ID_PULL[0].id
      const filteredtype = ProcessedPassives.filter(self => self.chara_id == match_id)
      if (filteredtype.length != 0) {
        setTypesearch(getQueryStringVal("Char"))
        setCondFilter(filteredtype[0].chara_id)
      } else {
        setTypesearch("")
        setCondFilter("")
      }
    }
  }, [setCondFilter, ProcessedPassives, Typesearch, setTypesearch, char_id])

  useEffect(() => {
    //search params
    if (getQueryStringVal("search") != null) {
      setSearchTerm(getQueryStringVal("search") != null ? getQueryStringVal("search").toLowerCase() : "")
      setTEXTsearch(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
      setsearchdisplay(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
    }
  }, [setTEXTsearch, setFiltersearch])

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  //filter
  useEffect(() => {
    var filterholder = [];
    if (ldext === true) {
      const filteredout = rawData.filter(
        (passives) => passives.board4ext == true
      );
      filterholder.push(...filteredout);
    }
    if (ldcall === true) {
      const filteredout = rawData.filter(
        (passives) => passives.board4cext == true
      );
      filterholder.push(...filteredout);
    }
    if (board5echo === true) {
      const filteredout = rawData.filter(
        (passives) => passives.board5echo == true
      );
      filterholder.push(...filteredout);
    }
    if (board5ext === true) {
      const filteredout = rawData.filter(
        (passives) => passives.board5ext === true
      );
      filterholder.push(...filteredout);
    }
    if (board5 === true) {
      const filteredout = rawData.filter(
        (passives) => passives.board5 == true
      );
      filterholder.push(...filteredout);
    }
    if (board4 === true) {
      const filteredout = rawData.filter(
        (passives) => passives.board4 == true
      );
      filterholder.push(...filteredout);
    }
    if (boardfr === true) {
      const filteredout = rawData.filter(
        (passives) => passives.link == true
      );
      filterholder.push(...filteredout);
    }
    if (board3 === true) {
      const filteredout = rawData.filter(
        (passives) => passives.board3 == true
      );
      filterholder.push(...filteredout);
    }
    if (board2 === true) {
      const filteredout = rawData.filter(
        (passives) => passives.board2 == true
      );
      filterholder.push(...filteredout);
    }
    if (board1 === true) {
      const filteredout = rawData.filter(
        (passives) => passives.board1 == true
      );
      filterholder.push(...filteredout);
    }
    if (cl88 === true) {
      const filteredout = rawData.filter(
        (passives) => passives.cl88 == true
      );
      filterholder.push(...filteredout);
    }
    if (cl85 === true) {
      const filteredout = rawData.filter(
        (passives) => passives.cl85 == true
      );
      filterholder.push(...filteredout);
    }
    if (cl80 === true) {
      const filteredout = rawData.filter(
        (passives) => passives.cl80 == true
      );
      filterholder.push(...filteredout);
    }
    if (cl78 === true) {
      const filteredout = rawData.filter(
        (passives) => passives.cl78 == true
      );
      filterholder.push(...filteredout);
    }
    if (cl70 === true) {
      const filteredout = rawData.filter(
        (passives) => passives.cl70 == true
      );
      filterholder.push(...filteredout);
    }
    if (cl68 === true) {
      const filteredout = rawData.filter(
        (passives) => passives.cl68 == true
      );
      filterholder.push(...filteredout);
    }
    if (cl60 === true) {
      const filteredout = rawData.filter(
        (passives) => passives.cl60 == true
      );
      filterholder.push(...filteredout);
    }
    if (cl58 === true) {
      const filteredout = rawData.filter(
        (passives) => passives.cl58 == true
      );
      filterholder.push(...filteredout);
    }
    if (cl55 === true) {
      const filteredout = rawData.filter(
        (passives) => passives.cl55 == true
      );
      filterholder.push(...filteredout);
    }
    if (cl54 === true) {
      const filteredout = rawData.filter(
        (passives) => passives.cl54 == true
      );
      filterholder.push(...filteredout);
    }
    if (cl50 === true) {
      const filteredout = rawData.filter(
        (passives) => passives.cl50 == true
      );
      filterholder.push(...filteredout);
    }
    if (cl45 === true) {
      const filteredout = rawData.filter(
        (passives) => passives.cl45 == true
      );
      filterholder.push(...filteredout);
    }
    if (cl40 === true) {
      const filteredout = rawData.filter(
        (passives) => passives.cl40 == true
      );
      filterholder.push(...filteredout);
    }
    if (cl35 === true) {
      const filteredout = rawData.filter(
        (passives) => passives.cl35 == true
      );
      filterholder.push(...filteredout);
    }
    if (cl30 === true) {
      const filteredout = rawData.filter(
        (passives) => passives.cl30 == true
      );
      filterholder.push(...filteredout);
    }
    if (cl25 === true) {
      const filteredout = rawData.filter(
        (passives) => passives.cl25 == true
      );
      filterholder.push(...filteredout);
    }
    if (cl15 === true) {
      const filteredout = rawData.filter(
        (passives) => passives.cl15 == true
      );
      filterholder.push(...filteredout);
    }
    if (cl10 === true) {
      const filteredout = rawData.filter(
        (passives) => passives.cl10 == true
      );
      filterholder.push(...filteredout);
    }
    if (cl5 === true) {
      const filteredout = rawData.filter(
        (passives) => passives.cl5 == true
      );
      filterholder.push(...filteredout);
    }
    if (artpass === true) {
      const filteredout = rawData.filter(
        (passives) => passives.art == true
      );
      filterholder.push(...filteredout);
    }

    if (filterholder.length === 0) {
      filterholder.push(...rawData);
    }

    if (condFilter != "") {
      filterholder = filterholder.filter(
        (ef) => ef.chara_id == condFilter
      );
    }

    const makeUnique = filterholder
      .filter(onlyUnique)
      .sort((a, b) =>
        reverse === false ?
          a.order - b.order :
          b.order - a.order
      );
    const searchit = searchTerm == "" ? makeUnique : makeUnique.filter((passive) =>
      (`${passive.passive && passive.passive.name} ${passive.passive && passive.passive.glname} ${passive.passive && passive.passive.jpname}`).toLowerCase().includes(searchTerm)
    );
    setFilterResults(makeUnique);
    setSearchResults(searchit);
    const newlistdisplay = searchit.slice(0, limits);
    if (limits < searchit.length) {
      setShowLoadMore(true);
      setListDisplay(newlistdisplay);
      setListLength(searchit.length);
      setDisplayBanner(
        `Displaying ${newlistdisplay.length} of ${searchit.length} ${banerDisplayTerm}`
      );
    } else {
      setShowLoadMore(false);
      setListDisplay(newlistdisplay);
      setListLength(newlistdisplay.length);
      setDisplayBanner(
        `Displaying ${newlistdisplay.length} of ${newlistdisplay.length} ${banerDisplayTerm}`
      );
    }

  }, [board5echo, board5ext, board5, cl88, cl85, boardfr, limits, searchTerm, rawData, clearFilter, ldcall, ldext, board4, board3, board2, board1, cl80, cl78, cl70, cl68, cl60, cl58, cl55, cl54, cl50, cl45, cl40, cl35, cl30, cl25, cl15, cl10, cl5, artpass, condFilter, reverse])

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
    if (ldext == false) {
      setldextsearch("true")
    } else {
      setldextsearch("")
    }
    setldext((prevValue) => !prevValue);
  };
  const board4button = () => {
    if (board4 == false) {
      setboard4search("true")
    } else {
      setboard4search("")
    }
    setboard4((prevValue) => !prevValue);
  };
  const board5button = () => {
    if (board5 == false) {
      setboard5search("true")
    } else {
      setboard5search("")
    }
    setboard5((prevValue) => !prevValue);
  };
  const board5extbutton = () => {
    if (board5ext == false) {
      setboard5extsearch("true")
    } else {
      setboard5extsearch("")
    }
    setboard5ext((prevValue) => !prevValue);
  };
  const board5echobutton = () => {
    if (board5echo == false) {
      setboard5echosearch("true")
    } else {
      setboard5echosearch("")
    }
    setboard5echo((prevValue) => !prevValue);
  };
  const board3button = () => {
    if (board3 == false) {
      setboard3search("true")
    } else {
      setboard3search("")
    }
    setboard3((prevValue) => !prevValue);
  };
  const board2button = () => {
    if (board2 == false) {
      setboard2search("true")
    } else {
      setboard2search("")
    }
    setboard2((prevValue) => !prevValue);
  };
  const board1button = () => {
    if (board1 == false) {
      setboard1search("true")
    } else {
      setboard1search("")
    }
    setboard1((prevValue) => !prevValue);
  };
  const boardfrbutton = () => {
    if (boardfr == false) {
      setboardfrsearch("true")
    } else {
      setboardfrsearch("")
    }
    setboardfr((prevValue) => !prevValue);
  };
  const cl88button = () => {
    if (cl88 == false) {
      setcl88search("true")
    } else {
      setcl88search("")
    }
    setcl88((prevValue) => !prevValue);
  };
  const cl85button = () => {
    if (cl85 == false) {
      setcl85search("true")
    } else {
      setcl85search("")
    }
    setcl85((prevValue) => !prevValue);
  };
  const cl80button = () => {
    if (cl80 == false) {
      setcl80search("true")
    } else {
      setcl80search("")
    }
    setcl80((prevValue) => !prevValue);
  };
  const cl78button = () => {
    if (cl78 == false) {
      setcl78search("true")
    } else {
      setcl78search("")
    }
    setcl78((prevValue) => !prevValue);
  };
  const cl70button = () => {
    if (cl70 == false) {
      setcl70search("true")
    } else {
      setcl70search("")
    }
    setcl70((prevValue) => !prevValue);
  };
  const cl68button = () => {
    if (cl68 == false) {
      setcl68search("true")
    } else {
      setcl68search("")
    }
    setcl68((prevValue) => !prevValue);
  };
  const cl60button = () => {
    if (cl60 == false) {
      setcl60search("true")
    } else {
      setcl60search("")
    }
    setcl60((prevValue) => !prevValue);
  };
  const cl58button = () => {
    if (cl58 == false) {
      setcl58search("true")
    } else {
      setcl58search("")
    }
    setcl58((prevValue) => !prevValue);
  };
  const cl55button = () => {
    if (cl55 == false) {
      setcl55search("true")
    } else {
      setcl55search("")
    }
    setcl55((prevValue) => !prevValue);
  };
  const cl54button = () => {
    if (cl54 == false) {
      setcl54search("true")
    } else {
      setcl54search("")
    }
    setcl54((prevValue) => !prevValue);
  };
  const cl50button = () => {
    if (cl50 == false) {
      setcl50search("true")
    } else {
      setcl50search("")
    }
    setcl50((prevValue) => !prevValue);
  };
  const cl45button = () => {
    if (cl45 == false) {
      setcl45search("true")
    } else {
      setcl45search("")
    }
    setcl45((prevValue) => !prevValue);
  };
  const cl40button = () => {
    if (cl40 == false) {
      setcl40search("true")
    } else {
      setcl40search("")
    }
    setcl40((prevValue) => !prevValue);
  };
  const cl35button = () => {
    if (cl35 == false) {
      setcl35search("true")
    } else {
      setcl35search("")
    }
    setcl35((prevValue) => !prevValue);
  };
  const cl30button = () => {
    if (cl30 == false) {
      setcl30search("true")
    } else {
      setcl30search("")
    }
    setcl30((prevValue) => !prevValue);
  };
  const cl25button = () => {
    if (cl25 == false) {
      setcl25search("true")
    } else {
      setcl25search("")
    }
    setcl25((prevValue) => !prevValue);
  };
  const cl15button = () => {
    if (cl15 == false) {
      setcl15search("true")
    } else {
      setcl15search("")
    }
    setcl15((prevValue) => !prevValue);
  };
  const cl10button = () => {
    if (cl10 == false) {
      setcl10search("true")
    } else {
      setcl10search("")
    }
    setcl10((prevValue) => !prevValue);
  };
  const cl5button = () => {
    if (cl5 == false) {
      setcl5search("true")
    } else {
      setcl5search("")
    }
    setcl5((prevValue) => !prevValue);
  };
  const artpassbutton = () => {
    if (artpass == false) {
      setartpasssearch("true")
    } else {
      setartpasssearch("")
    }
    setartpass((prevValue) => !prevValue);
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

  //type list
  const typeListArray = Object.values(char_id).filter(self => ver == "JP" ? self.JPOrder != undefined : self.GLOrder != undefined).sort((a, b) => ver == "JP" ? b.JPOrder - a.JPOrder : b.GLOrder - a.GLOrder).map((typeListUnique) => ({
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

  const resetbutton = () => {
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
    setcl88(false)
    setcl85(false)
    setcl80(false)
    setcl78(false)
    setcl70(false)
    setcl68(false)
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
    setcl15(false)
    setcl10(false)
    setcl5(false)
    setartpass(false)

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
    setcl88search("")
    setcl85search("")
    setcl80search("")
    setcl78search("")
    setcl70search("")
    setcl68search("")
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
    setcl15search("")
    setcl10search("")
    setcl5search("")
    setartpasssearch("")
    setReversesearch("")
    setTEXTsearch("")
    setTypesearch("")

    setsearchdisplay("");
    setSearchTerm("");
    setCondFilter("")
    setTimeout(() => setclearFilter(false), 1000);
  }

  const listPasives = listDisplay;

  const dispatch = useDispatch();

  const jptoggledata = useSelector((state) =>
    state.toggle.toggle
  );

  const [jponly, setJPonly] = useState(jptoggledata);
  const [JPsearch, setJPSearch] = useQueryParam("JP", "");

  useEffect(() => {
    if (getQueryStringVal("JP") == "true") {
      dispatch(setTrue())
      setJPSearch("true")
      setJPonly(true)
    } else {
      dispatch(setFalse())
      setJPSearch("")
      setJPonly(false)
    }

  }, [setJPSearch, dispatch])

  const jponlybutton = () => {
    if (jponly == false) {
      dispatch(setTrue())
      setJPSearch("true")
      setJPonly(true);
    } else {
      dispatch(setFalse())
      setJPSearch("")
      setJPonly(false);
    }
  };

  const setGLbutton = () => {
    if (jponly == true) {
      dispatch(setFalse())
      setJPSearch("")
      setJPonly(false);
    }
  };

  const setJPbutton = () => {
    if (jponly == false) {
      dispatch(setTrue())
      setJPSearch("true")
      setJPonly(true);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Passives - Dissidia Compendium</title>
        <meta property="og:site_name" content="Dissidia Compendium" />
        <meta property="og:type" content="website" />
        <meta name="description" content="Passives Search" />
        <meta name="twitter:title" content="Passives Search" />
        <meta name="twitter:description" content="Passives Search" />
        <meta property="og:title" content="Passives Search" />
        <meta property="og:description" content="Passives Search" />
        <meta property="og:url" content="https://dissidiacompendium.com/search/passives" />
      </Helmet>
      <div className="content">
        <h1>{`${jptoggledata == false ? "GL" : "JP"} Passives`}</h1>
        <div className="subheader">
          Use filters to limit returns
        </div>
        <div className="charfilterspacer" />
        <div key="filter1" onClick={showfilterbutton} className="charfilter"><span className="filterstext"></span>{showFilter ? <TiArrowSortedUp className="uparrow" /> : <TiArrowSortedDown className="downarrow" />}</div>
        {showFilter == false ?
          <div className="event-search-reverse-holder">
            <span className={`${jponly ? "jponlybackground" : "GLonlybackground"}`}>
              <Tippy content={`${jponly == true ? "Switch to GL" : "Switch to JP"}`} className="tooltip" >
                <span onClick={jponlybutton} className={`${jponly ? "jpflage jpsmallinactive smalleventbutton" : "glflage smalleventbutton"}`} />
              </Tippy>
            </span>
            <IoSearch className="searchicon" />
            <div className="search-holder el">
              <input
                className="char-search-bar"
                type="text"
                id="search"
                placeholder="Search"
                value={searchdisplay}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              {searchTerm === "" ? "" :
                <IoMdCloseCircleOutline onClick={clearSearch} className="clearsearch"></IoMdCloseCircleOutline>}
            </div>
          </div>
          : ""
        }
        <div className="filterholder noselect" id={showFilter ? "showfilteren" : "hiddenfilteren"}>
          <div className="similarbanner">Multiple filters can be active</div>
          <div className="filterholderflair">
            <div className="passivefilterbuttonholder">
              <ul className="spheretypes">
                <Tippy content="Force Enhancement Passive">
                  <li className={`${boardfr ? "filteractive" : "filterinactive"} buffbutton boardfrbutton`} onClick={boardfrbutton}></li>
                </Tippy>
                <Tippy content="FR Extension Passive">
                  <li className={`${board5ext ? "filteractive" : "filterinactive"} buffbutton board5extbutton`} onClick={board5extbutton}></li>
                </Tippy>
                <Tippy content="FR Echo Passive">
                  <li className={`${board5echo ? "filteractive" : "filterinactive"} buffbutton board5echobutton`} onClick={board5echobutton}></li>
                </Tippy>
                <Tippy content="FR Board Passives">
                  <li className={`${board5 ? "filteractive" : "filterinactive"} buffbutton board5button`} onClick={board5button}></li>
                </Tippy>
                <Tippy content="LD Extension Passive">
                  <li className={`${ldext ? "filteractive" : "filterinactive"} buffbutton ench4extbutton`} onClick={ldextbutton}></li>
                </Tippy>
                <Tippy content={`LD Call Extension Passives`}>
                  <li className={`${ldcall ? "filteractive" : "filterinactive"} buffbutton ench4cextbutton`} onClick={ldcallbutton}></li>
                </Tippy>
                <Tippy content="LD Board Passives">
                  <li className={`${board4 ? "filteractive" : "filterinactive"} buffbutton board4button`} onClick={board4button}></li>
                </Tippy>
                <Tippy content="EX Board Passives">
                  <li className={`${board3 ? "filteractive" : "filterinactive"} buffbutton board3button`} onClick={board3button}></li>
                </Tippy>
                <Tippy content="S2 Board Passives">
                  <li className={`${board2 ? "filteractive" : "filterinactive"} buffbutton board2button`} onClick={board2button}></li>
                </Tippy>
                <Tippy content="S1 Board Passives">
                  <li className={`${board1 ? "filteractive" : "filterinactive"} buffbutton board1button`} onClick={board1button}></li>
                </Tippy>
                <Tippy content="Artifact Passives">
                  <li className={`${artpass ? "filteractive" : "filterinactive"} buffbutton artpassbutton`} onClick={artpassbutton}></li>
                </Tippy>
                <li className={`${cl88 ? "filteractive" : "filterinactive"} buffbutton cl88button`} onClick={cl88button}></li>
                <li className={`${cl85 ? "filteractive" : "filterinactive"} buffbutton cl85button`} onClick={cl85button}></li>
                <li className={`${cl80 ? "filteractive" : "filterinactive"} buffbutton cl80button`} onClick={cl80button}></li>
                <li className={`${cl78 ? "filteractive" : "filterinactive"} buffbutton cl78button`} onClick={cl78button}></li>
                <li className={`${cl70 ? "filteractive" : "filterinactive"} buffbutton cl70button`} onClick={cl70button}></li>
                <li className={`${cl68 ? "filteractive" : "filterinactive"} buffbutton cl68button`} onClick={cl68button}></li>
                <li className={`${cl60 ? "filteractive" : "filterinactive"} buffbutton cl60button`} onClick={cl60button}></li>
                <li className={`${cl58 ? "filteractive" : "filterinactive"} buffbutton cl58button`} onClick={cl58button}></li>
                <li className={`${cl55 ? "filteractive" : "filterinactive"} buffbutton cl55button`} onClick={cl55button}></li>
                <li className={`${cl54 ? "filteractive" : "filterinactive"} buffbutton cl54button`} onClick={cl54button}></li>
                <li className={`${cl50 ? "filteractive" : "filterinactive"} buffbutton cl50button`} onClick={cl50button}></li>
                <li className={`${cl45 ? "filteractive" : "filterinactive"} buffbutton cl45button`} onClick={cl45button}></li>
                <li className={`${cl40 ? "filteractive" : "filterinactive"} buffbutton cl40button`} onClick={cl40button}></li>
                <li className={`${cl35 ? "filteractive" : "filterinactive"} buffbutton cl35button`} onClick={cl35button}></li>
                <li className={`${cl30 ? "filteractive" : "filterinactive"} buffbutton cl30button`} onClick={cl30button}></li>
                <li className={`${cl25 ? "filteractive" : "filterinactive"} buffbutton cl25button`} onClick={cl25button}></li>
                <li className={`${cl15 ? "filteractive" : "filterinactive"} buffbutton cl15button`} onClick={cl15button}></li>
                <li className={`${cl10 ? "filteractive" : "filterinactive"} buffbutton cl10button`} onClick={cl10button}></li>
                <li className={`${cl5 ? "filteractive" : "filterinactive"} buffbutton cl5button`} onClick={cl5button}></li>
              </ul>
            </div>
            <div className="similarbanner">Refine</div>
            <ul className="bufftypes">
              <Tippy content="GL Database">
                <li className={`${jponly ? "filterinactive" : "filteractive"} buffbutton ver_gl`} onClick={setGLbutton}></li>
              </Tippy>
              <Tippy content="JP Database">
                <li className={`${jponly ? "filteractive" : "filterinactive"} buffbutton ver_jp`} onClick={setJPbutton}></li>
              </Tippy>
            </ul>
            <div className="typeholder">
              <Select
                defaultValue={Typesearch != "" ? { value: Typesearch, label: Typesearch } : null}
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
                <IoSearch className="innersearchicon" />
                <input
                  className="search-bar"
                  type="text"
                  id="search2"
                  placeholder="Search"
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
          <Link className="whitecolor" to={`/bonuses/crystal`}>
              <span className="subtext">Check out the Crystal Brilliance page</span>
          </Link>
        </div>
        {showFilter == true ? "" :
            <span>
                <Link className="whitecolor" to={`/bonuses/crystal`}>
                    <span className="subtext">Crystal Brilliance</span>
                </Link>
            </span>}
        <ul className="bannertabs">
          <Link to={`/search/buffs${jptoggledata == false ? "" : "?JP=true"}`}>
            <li className={""} >Buffs</li>
          </Link>
          <Link to={`/search/abilities${jptoggledata == false ? "" : "?JP=true"}`}>
            <li className={""} >Abilities</li>
          </Link>
          <Link to={`/search/gear${jptoggledata == false ? "" : "?JP=true"}`}>
            <li className={""} >Gear</li>
          </Link>
          <Link to={`/search/passives${jptoggledata == false ? "" : "?JP=true"}`}>
            <li className={"active"} ><span className="gemselected" />Passives</li>
          </Link>
          <Link to={`/search/spheres${jptoggledata == false ? "" : "?JP=true"}`}>
            <li className={""} >Spheres</li>
          </Link>
          <Link to={`/search/stickers${jptoggledata == false ? "" : "?JP=true"}`}>
            <li className={""} >Stickers</li>
          </Link>
          <Link to={`/search/music${jptoggledata == false ? "" : "?JP=true"}`}>
            <li className={""} >Music</li>
          </Link>
        </ul>
        <div className="buffsholder">
          <div className="subtext">
            {displayBanner}
          </div>
          {listPasives.length > 0 ? (
            listPasives.map(passive => (
              passive.art == true ?
                <Art_Passive_Formatting
                  key={passive.order}
                  art_passive={passive}
                  ver={ver}
                  loc={loc}
                  file={"exskill"}
                  Single={true}

                  master_index={master_index}

                  formatting={true}

                  span={true}
                  banner_color={"ArtRedbanner"}
                  base_color={"ArtRedbase"}

                  link={"passives"}
                />
                :
                <Passive_Ability_Formatting
                  key={passive.order}

                  passive_ability={passive.passive}
                  ver={ver}
                  loc={loc}
                  file={"exskill"}
                  Single={true}

                  master_index={master_index}

                  formatting={true}
                  chara_id_passoff={passive.chara_id}
                  cost_overide={passive.need_point}
                  cp_overide={passive.cp}
                  tag_overide={passive.rank_tag}
                  release={passive.start_date}

                  banner_color={"newblue"}
                  base_color={"bluebase"}
                  span={true}

                  link={"passives"}
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
  )
}