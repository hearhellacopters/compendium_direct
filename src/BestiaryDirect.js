import React, {useState, useEffect} from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import { useDispatch, useSelector } from "react-redux";
import { setFalse, setTrue } from './redux/ducks/jptoggle'
import { Link } from 'react-router-dom'
import './Bestiary.css';
import './App.css'
import Tippy from './formatting/TippyDefaults.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import { slice, concat, } from 'lodash';
import { Helmet} from 'react-helmet-async';
import Select from 'react-select';
import EnemyListingDirect from './formatting/EnemyListingDirect'
import EnemyDetailsDirect from './formatting/EnemyDetailsDirect';
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

const BestiaryDirect = ({ProcessedEnemy, jptoggledata, ProcessedCharacters, PartnerCharacters}) => {

  const dispatch = useDispatch();

  const [prefilterlist, setPrefilterlist] = useState([])
  const [jponly, setjponly] = useState(jptoggledata);
  const [reverse, setReverse] = useState(getQueryStringVal("rev") != null? true : false);

  useEffect(() => {
    if (jponly === false ) {
      const filteredenemy = ProcessedEnemy.filter((item) => {
        return item.JPOnly !== true
      })
      if (reverse == true){
      const reverselist = filteredenemy.sort((a, b) => b.battle_enemy_id - a.battle_enemy_id)
      setPrefilterlist(reverselist);
      } else {
        const noreverselist = filteredenemy.sort((a, b) => a.battle_enemy_id - b.battle_enemy_id)
        setPrefilterlist(noreverselist);
      }
    } else {
      if (reverse == true){
        const reverselist = ProcessedEnemy.sort((a, b) => b.battle_enemy_id - a.battle_enemy_id)
        setPrefilterlist(reverselist);
        } else {
          const noreverselist = ProcessedEnemy.sort((a, b) => a.battle_enemy_id - b.battle_enemy_id)
          setPrefilterlist(noreverselist);
        }
    }
  },[jponly, reverse,ProcessedEnemy]);

  const rawData = prefilterlist;

  const banerDisplayTerm = "enemies";
  
  const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null  ? true : false);
  const [clearFilter, setclearFilter] = useStateIfMounted(false);
  
  const [manikin, setManikin] = useState(getQueryStringVal("manikin") != null? true : false);
  const [heretic, setHeretic] = useState(getQueryStringVal("heretic") != null? true : false);
  const [lunatic, setLunatic] = useState(getQueryStringVal("lunatic") != null? true : false);
  const [lufenia, setLufenia] = useState(getQueryStringVal("luf") != null? true : false);
  const [lufeniaplus, setLufeniaPlus] = useState(getQueryStringVal("lufplus") != null? true : false);
  const [shinryu, setShinryu] = useState(getQueryStringVal("shinryu") != null? true : false);
  const [dimensional, setdimensional] = useState(getQueryStringVal("dimensional") != null? true : false);
  const [spiritus, setspiritus] = useState(getQueryStringVal("spiritus") != null? true : false);
  const [details, setdetails] = useState(getQueryStringVal("details") != null? true : false);

  const [fire, setfire] = useState(getQueryStringVal("fire") != null? getQueryStringVal("fire") : "");
  const [Firesearch, setFireSearch] = useQueryParam("fire", "");
  const [ice, setice] = useState(getQueryStringVal("ice") != null? getQueryStringVal("ice") : "");
  const [Icesearch, setIceSearch] = useQueryParam("ice", "");
  const [thunder, setthunder] = useState(getQueryStringVal("thunder") != null? getQueryStringVal("thunder") : "");
  const [Thundersearch, setThunderSearch] = useQueryParam("thunder", "");
  const [water, setwater] = useState(getQueryStringVal("water") != null? getQueryStringVal("water") : "");
  const [Watersearch, setWaterSearch] = useQueryParam("water", "");
  const [earth, setearth] = useState(getQueryStringVal("earth") != null? getQueryStringVal("earth") : "");
  const [Earthsearch, setEarthSearch] = useQueryParam("earth", "");
  const [wind, setwind] = useState(getQueryStringVal("wind") != null? getQueryStringVal("wind") : "");
  const [Windsearch, setWindSearch] = useQueryParam("wind", "");
  const [holy, setholy] = useState(getQueryStringVal("holy") != null? getQueryStringVal("holy") : "");
  const [Holysearch, setHolySearch] = useQueryParam("holy", "");
  const [dark, setdark] = useState(getQueryStringVal("dark") != null? getQueryStringVal("dark") : "");
  const [Darksearch, setDarkSearch] = useQueryParam("dark", "");

  const [melee, setmelee] = useState(getQueryStringVal("melee") != null? getQueryStringVal("melee") : "");
  const [Meleesearch, setMeleeSearch] = useQueryParam("melee", "");
  const [ranged, setranged] = useState(getQueryStringVal("ranged") != null? getQueryStringVal("ranged") : "");
  const [Rangedsearch, setRangedSearch] = useQueryParam("ranged", "");
  const [magic, setmagic] = useState(getQueryStringVal("magic") != null? getQueryStringVal("magic") : "");
  const [Magicsearch, setMagicSearch] = useQueryParam("magic", "");

  const [startinglimit, setstartinglimit] = useState(64)

  const [loop, setLoop] = useStateIfMounted(false);

  useEffect(() => {
    if(details == true){
      setstartinglimit(25)
      setLimits(25)
    } else {
      setstartinglimit(64)
      setLimits(64)
    }
  },[details,setstartinglimit])
  
  const [typeFilter, setTypeFilter] = useState(getQueryStringVal("type") != null  ? getQueryStringVal("type") : "");
  const [searchdisplay, setsearchdisplay] = useState(getQueryStringVal("search") != null ? getQueryStringVal("search") : "");
  const [searchTerm, setSearchTerm] = useState(getQueryStringVal("search") != null  ? getQueryStringVal("search").toLowerCase() : "");
  const [searchhighdisplay, setsearchhighdisplay] = useState(getQueryStringVal("high") != null ? getQueryStringVal("high") : "");
  const [searchhighdisplayTerm, setsearchhighdisplayTerm] = useState(getQueryStringVal("high") != null ? getQueryStringVal("high").toLowerCase() : "");
  const [searchlowdisplay, setsearchlowdisplay] = useState(getQueryStringVal("low") != null ? getQueryStringVal("low") : "");
  const [searchlowdisplayTerm, setsearchlowdisplayTerm] = useState(getQueryStringVal("low") != null ? getQueryStringVal("low").toLowerCase() : "");
  const [searchimmunedisplay, setsearchimmunedisplay] = useState(getQueryStringVal("immune") != null ? getQueryStringVal("immune") : "");
  const [searchimmunedisplayTerm, setsearchimmunedisplayTerm] = useState(getQueryStringVal("immune") != null ? getQueryStringVal("immune").toLowerCase() : "");
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

    const [JPsearch, setJPSearch] = useQueryParam("JP", "");
    const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
    const [searchhigh, setsearchhigh] = useQueryParam("high", "");
    const [searchlow, setsearchlow] = useQueryParam("low", "");
    const [searchimmune, setsearchimmune] = useQueryParam("immune", "");
    const [Manikinsearch, setManikinsearch] = useQueryParam("manikin", "");
    const [Hereticsearch, setHereticsearch] = useQueryParam("heretic", "");
    const [Lunaticsearch, setLunaticsearch] = useQueryParam("lunatic", "");
    const [Lufsearch, setLufsearch] = useQueryParam("luf", "");
    const [LufPlussearch, setLufPlussearch] = useQueryParam("lufplus", "");
    const [dimensionalsearch, setdimensionalsearch] = useQueryParam("dimensional", "");
    const [spiritussearch, setspiritussearch] = useQueryParam("spiritus", "");
    const [detailssearch, setdetailssearch] = useQueryParam("details", "");
    const [shinryusearch, setshinryusearch] = useQueryParam("shinryu", "");
    const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
    const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");
    const [Typesearch, setTypesearch] = useQueryParam("type", "");
    const { protocol, pathname, host } = window.location;
    const query = getQuery();
    const url = `${protocol}//${host}${pathname}?${query.toString()}`;

    //param logic
    useEffect(() => {
      //type params
      if(getQueryStringVal("type") != null){
        const filteredtype = ProcessedEnemy.filter(function (ef) {
          const newfilterpull = ef["type"] === getQueryStringVal("type");
          return newfilterpull;
        })
        if(filteredtype.length != 0){
          setTypesearch(getQueryStringVal("type"))
          setTypeFilter(getQueryStringVal("type"))
        } else{
          setTypesearch("")
          setTypeFilter("")
        }
      }
    },[setTypesearch,ProcessedEnemy])

  //jp params
  useEffect(() => {
    if(getQueryStringVal("JP") == "true" ){
      dispatch(setTrue())
      setJPSearch("true")
      setjponly(true)
    } else {
      dispatch(setFalse())
      setJPSearch("")
      setjponly(false)
    }
  },[setJPSearch,dispatch])

  useEffect(() => {
    if(jptoggledata == true ){
      setJPSearch("true")
    } 
    if(jptoggledata == false ){
      setJPSearch("")
    }
    if(getQueryStringVal("JP") == "true" ){
      dispatch(setTrue())
    }
  },[jptoggledata,dispatch,setJPSearch])

  useEffect(() => {
    //search params
    if(getQueryStringVal("search") != null){
      setSearchTerm(getQueryStringVal("search") != null  ? getQueryStringVal("search").toLowerCase() : "")
      setTEXTsearch(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
      setsearchdisplay(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
    }
    if(getQueryStringVal("high") != null){
      setsearchhighdisplayTerm(getQueryStringVal("high") != null  ? getQueryStringVal("high").toLowerCase() : "")
      setsearchhighdisplay(getQueryStringVal("high") != null ? getQueryStringVal("high") : "")
      setsearchhigh(getQueryStringVal("high") != null ? getQueryStringVal("high") : "")
    }
    if(getQueryStringVal("low") != null){
      setsearchlowdisplayTerm(getQueryStringVal("low") != null  ? getQueryStringVal("low").toLowerCase() : "")
      setsearchlowdisplay(getQueryStringVal("low") != null ? getQueryStringVal("low") : "")
      setsearchlow(getQueryStringVal("low") != null ? getQueryStringVal("low") : "")
    }
    if(getQueryStringVal("immune") != null){
      setsearchimmunedisplayTerm(getQueryStringVal("immune") != null  ? getQueryStringVal("immune").toLowerCase() : "")
      setsearchimmunedisplay(getQueryStringVal("immune") != null ? getQueryStringVal("immune") : "")
      setsearchimmune(getQueryStringVal("immune") != null ? getQueryStringVal("immune") : "")
    }
    }, [setsearchdisplay,setTEXTsearch,setsearchhighdisplay,setsearchhigh,setsearchlow,setsearchlowdisplay,setsearchimmunedisplay,setsearchimmune]);
  

  //filter
  useEffect(() => {
    const filterholder = [];
    if (manikin === true) {
      const filteredout = rawData.filter(
        (enemies) => enemies["ManikinFlag"] === true
      );
      filterholder.push(...filteredout);
    }
    if (heretic === true) {
      const filteredout = rawData.filter(
        (enemies) => enemies["HereticFlag"] === true
      );
      filterholder.push(...filteredout);
    }
    if (lunatic === true) {
      const filteredout = rawData.filter(
        (enemies) => enemies["LunaticFlag"] === true
      );
      filterholder.push(...filteredout);
    }
    if (lufenia === true) {
      const filteredout = rawData.filter(
        (enemies) => enemies["LufeniaFlag"] === true
      );
      filterholder.push(...filteredout);
    }
    if (lufeniaplus === true) {
      const filteredout = rawData.filter(
        (enemies) => enemies["LufeniaPlusFlag"] === true
      );
      filterholder.push(...filteredout);
    }
    if (dimensional === true) {
      const filteredout = rawData.filter(
        (enemies) => enemies["DimensionFlag"] === true
      );
      filterholder.push(...filteredout);
    }
    if (spiritus === true) {
      const filteredout = rawData.filter(
        (enemies) => enemies["SpiritusFlag"] === true
      );
      filterholder.push(...filteredout);
    }
    if (shinryu === true) {
      const filteredout = rawData.filter(
        (enemies) => enemies["ShinryuFlag"] === true
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
        b.battle_enemy_id - a.battle_enemy_id:
        a.battle_enemy_id - b.battle_enemy_id);
      const searchit = makeUnique.filter((e) =>
      (`${e.Name.replace("á","a")} ${e.battle_enemy_id} ${e.JPName == undefined? "": e.JPName} `).toLowerCase().includes(searchTerm)
      );
      const searchit2 = searchlowdisplayTerm == ""  ? searchit : searchit.filter((e) =>
      e.AilmentResistsLow && e.AilmentResistsLow.toLowerCase().includes(searchlowdisplayTerm)
      );
      const searchit3 = searchhighdisplayTerm == "" ? searchit2 : searchit2.filter((e) =>
      e.AilmentResistsHigh && e.AilmentResistsHigh.toLowerCase().includes(searchhighdisplayTerm)
      );
      const searchit4 = searchimmunedisplayTerm == "" ? searchit3 : searchit3.filter((e) =>
      e.AilmentResistsImmune && e.AilmentResistsImmune.toLowerCase().includes(searchimmunedisplayTerm)
      );
      const searchit5 = fire == "" ? searchit4 : searchit4.filter((e) =>
      e.Fire == fire
      );
      const searchit6 = ice == "" ? searchit5 : searchit5.filter((e) =>
      e.Ice == ice
      );
      const searchit7 = thunder == "" ? searchit6 : searchit6.filter((e) =>
      e.Thunder == thunder
      );
      const searchit8 = water == "" ? searchit7 : searchit7.filter((e) =>
      e.Water == water
      );
      const searchit9 = earth == "" ? searchit8 : searchit8.filter((e) =>
      e.Earth == earth
      );
      const searchit10 = wind == "" ? searchit9 : searchit9.filter((e) =>
      e.Wind == wind
      );
      const searchit11 = holy == "" ? searchit10 : searchit10.filter((e) =>
      e.Holy == holy
      );
      const searchit12 = dark == "" ? searchit11 : searchit11.filter((e) =>
      e.Dark == dark
      );
      const searchit13 = melee == "" ? searchit12 : searchit12.filter((e) =>
      e.Melee == melee
      );
      const searchit14 = ranged == "" ? searchit13 : searchit13.filter((e) =>
      e.Ranged == ranged
      );
      const searchit15 = magic == "" ? searchit14 : searchit14.filter((e) =>
      e.Magic == magic
      );
      const gettypefilter = searchit15.filter(function (ef) {
        const newfilterpull = ef["type"] === typeFilter;
        if(typeFilter !== ""){
        return newfilterpull
        } else {
            return ef;
        }})
      setFilterResults(makeUnique);
      setSearchResults(gettypefilter);
      const newlistdisplay = slice(gettypefilter, 0, limits);
      if (limits < gettypefilter.length) {
        setShowLoadMore(true);
        setListDisplay(newlistdisplay);
        setListLength(gettypefilter.length);
        setDisplayBanner(
          <>Displaying <span className="subtextgold">{newlistdisplay.length}</span> of <span className="subtextgold"> {gettypefilter.length}</span> {banerDisplayTerm}</>
        );
      } else {
        setShowLoadMore(false);
        setListDisplay(newlistdisplay);
        setListLength(newlistdisplay.length);
        setDisplayBanner(
          <>Displaying <span className="subtextgold">{newlistdisplay.length}</span> of <span className="subtextgold"> {newlistdisplay.length}</span> {banerDisplayTerm}</>
        );
      } 
  }, [ranged, spiritus, magic, melee, dark, holy, wind, earth,water,thunder, ice, fire,searchhighdisplayTerm,searchimmunedisplayTerm,searchlowdisplayTerm, dimensional,limits,rawData,searchTerm,clearFilter, manikin, heretic, lunatic, lufenia, lufeniaplus, jponly, prefilterlist, typeFilter, shinryu, reverse]);

  const [hidefire, sethidefire] = useState(true);
  const [hideice, sethideice] = useState(true);
  const [hidethunder, sethidethunder] = useState(true);
  const [hidewater, sethidewater] = useState(true);
  const [hideearth, sethideearth] = useState(true);
  const [hidewind, sethidewind] = useState(true);
  const [hideholy, sethideholy] = useState(true);
  const [hidedark, sethidedark] = useState(true);

  const [hidemelee, sethidemelee] = useState(true);
  const [hideranged, sethideranged] = useState(true);
  const [hidemagic, sethidemagic] = useState(true);

  const hidebuttonfire = () => {
    sethidefire((prevValue) => !prevValue);
  }

  const hidebuttonice = () => {
    sethideice((prevValue) => !prevValue);
  }

  const hidebuttonthunder = () => {
    sethidethunder((prevValue) => !prevValue);
  }

  const hidebuttonwater = () => {
    sethidewater((prevValue) => !prevValue);
  }

  const hidebuttonearth = () => {
    sethideearth((prevValue) => !prevValue);
  }

  const hidebuttonwind = () => {
    sethidewind((prevValue) => !prevValue);
  }

  const hidebuttonholy = () => {
    sethideholy((prevValue) => !prevValue);
  }

  const hidebuttondark = () => {
    sethidedark((prevValue) => !prevValue);
  }

  const hidebuttonmelee = () => {
    sethidemelee((prevValue) => !prevValue);
  }

  const hidebuttonranged = () => {
    sethideranged((prevValue) => !prevValue);
  }

  const hidebuttonmagic = () => {
    sethidemagic((prevValue) => !prevValue);
  }

  //buttons

  const magicbutton = (value) => {
    setMagicSearch(value)
    setmagic(value)
    sethidemagic((prevValue) => !prevValue);
  };

  const rangedbutton = (value) => {
    setRangedSearch(value)
    setranged(value)
    sethideranged((prevValue) => !prevValue);
  };

  const meleebutton = (value) => {
    setMeleeSearch(value)
    setmelee(value)
    sethidemelee((prevValue) => !prevValue);
  };

  const darkbutton = (value) => {
    setDarkSearch(value)
    setdark(value)
    sethidedark((prevValue) => !prevValue);
  };

  const holybutton = (value) => {
    setHolySearch(value)
    setholy(value)
    sethideholy((prevValue) => !prevValue);
  };

  const windbutton = (value) => {
    setWindSearch(value)
    setwind(value)
    sethidewind((prevValue) => !prevValue);
  };

  const earthbutton = (value) => {
    setEarthSearch(value)
    setearth(value)
    sethideearth((prevValue) => !prevValue);
  };

  const waterbutton = (value) => {
    setWaterSearch(value)
    setwater(value)
    sethidewater((prevValue) => !prevValue);
  };

  const thunderbutton = (value) => {
    setThunderSearch(value)
    setthunder(value)
    sethidethunder((prevValue) => !prevValue);
  };

  const firebutton = (value) => {
    setFireSearch(value)
    setfire(value)
    sethidefire((prevValue) => !prevValue);
  };

  const icebutton = (value) => {
    setIceSearch(value)
    setice(value)
    sethideice((prevValue) => !prevValue);
  };

  const detailsbutton = () => {
    if (details == false) {
      setdetailssearch("true")
    } else {
      setdetailssearch("")
    }
    setdetails((prevValue) => !prevValue);
  };
  const manikinbutton = () => {
    if (manikin == false) {
      setManikinsearch("true")
    } else {
      setManikinsearch("")
    }
    setManikin((prevValue) => !prevValue);
  };
  const hereticbutton = () => {
    if (heretic == false) {
      setHereticsearch("true")
    } else {
      setHereticsearch("")
    }
    setHeretic((prevValue) => !prevValue);
  };
  const lunaticbutton = () => {
    if (lunatic == false) {
      setLunaticsearch("true")
    } else {
      setLunaticsearch("")
    }
    setLunatic((prevValue) => !prevValue);
  };
  const lufeniabutton = () => {
    if (lufenia == false) {
      setLufsearch("true")
    } else {
      setLufsearch("")
    }
    setLufenia((prevValue) => !prevValue);
  };
  const lufeniaplusbutton = () => {
    if (lufeniaplus == false) {
      setLufPlussearch("true")
    } else {
      setLufPlussearch("")
    }
    setLufeniaPlus((prevValue) => !prevValue);
  };
  const dimensionbutton = () => {
    if (dimensional == false) {
      setdimensionalsearch("true")
    } else {
      setdimensionalsearch("")
    }
    setdimensional((prevValue) => !prevValue);
  };
  const shinryubutton = () => {
    if (shinryu == false) {
      setshinryusearch("true")
    } else {
      setshinryusearch("")
    }
    setShinryu((prevValue) => !prevValue);
  };
  const spiritusbutton = () => {
    if (spiritus == false) {
      setspiritussearch("true")
    } else {
      setspiritussearch("")
    }
    setspiritus((prevValue) => !prevValue);
  };
  const jponlybutton = () => {
    if (jponly == false) {
      dispatch(setTrue())
      setJPSearch("true")
    } else {
      dispatch(setFalse())
      setJPSearch("")
    }
    setjponly((prevValue) => !prevValue);
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
  const typeSelect = (e) => {
    if (e !== null) {
      setTypesearch(e.value)
      setTypeFilter(e.value);
    } else {
      setTypeFilter("");
      setTypesearch('')
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
  const typeList = Object.values(rawData).map((item) => item.type);
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

    //search high
    const handleChangeHigh = (e) => {
      setsearchhigh(e.target.value)
      setsearchhighdisplayTerm(e.target.value.toLowerCase());
      setsearchhighdisplay(e.target.value)
    };
    
    const handleKeyDownHigh = (event) => {
      if (event.key === 'Enter') {
        setsearchhighdisplayTerm(searchhighdisplay.toLowerCase());
        setsearchhigh(searchhighdisplay)
      }
    }
  
    const clearSearchHigh = () => {
      setsearchhighdisplay("")
      setsearchhighdisplayTerm("");
      setsearchhigh("")
    };
    
    //search low
    const handleChangeLow = (e) => {
      setsearchlow(e.target.value)
      setsearchlowdisplayTerm(e.target.value.toLowerCase());
      setsearchlowdisplay(e.target.value)
    };
    
    const handleKeyDownLow = (event) => {
      if (event.key === 'Enter') {
        setsearchlowdisplayTerm(searchlowdisplay.toLowerCase());
        setsearchlow(searchlowdisplay)
      }
    }
  
    const clearSearchLow = () => {
      setsearchlowdisplay("")
      setsearchlowdisplayTerm("");
      setsearchlow("")
    };

    //search immune
    const handleChangeImmune = (e) => {
      setsearchimmune(e.target.value)
      setsearchimmunedisplayTerm(e.target.value.toLowerCase());
      setsearchimmunedisplay(e.target.value)
    };
    
    const handleKeyDownImmune = (event) => {
      if (event.key === 'Enter') {
        setsearchimmunedisplayTerm(searchimmunedisplay.toLowerCase());
        setsearchimmune(searchimmunedisplay)
      }
    }
  
    const clearSearchImmune = () => {
      setsearchimmunedisplay("")
      setsearchimmunedisplayTerm("");
      setsearchimmune("")
    };

  const listenemies = listDisplay;

  const resetbutton = () =>{
    setclearFilter(true);
    setReverse(false)
    setManikin(false)
    setHeretic(false)
    setLunatic(false)
    setLufenia(false)
    setLufeniaPlus(false)
    setdimensional(false)
    setShinryu(false)
    setspiritus(false)

    setfire("")
    setFireSearch("")
    setice("")
    setIceSearch("")
    setthunder("")
    setThunderSearch("")
    setwater("")
    setWaterSearch("")
    setearth("")
    setEarthSearch("")
    setwind("")
    setWindSearch("")
    setholy("")
    setHolySearch("")
    setdark("")
    setDarkSearch("")

    setmelee("")
    setMeleeSearch("")
    setranged("")
    setRangedSearch("")
    setmagic("")
    setMagicSearch("")

    setsearchdisplay("");
    setSearchTerm("");
    setsearchhighdisplayTerm("")
    setsearchhighdisplay("")
    setsearchhigh("");
    setsearchlowdisplayTerm("")
    setsearchlowdisplay("")
    setsearchlow("");
    setsearchimmunedisplayTerm("")
    setsearchimmunedisplay("")
    setsearchimmune("");

    setTypesearch("")
    setLufsearch("")
    setReversesearch("")
    setLufPlussearch("")
    setManikinsearch("")
    setHereticsearch("")
    setLunaticsearch("")
    setdimensionalsearch("")
    setshinryusearch("")
    setspiritussearch("")
    setTEXTsearch("")
    setJPSearch("")

    setTypeFilter("")
    setTimeout(() => setclearFilter(false), 1000);
  }

return (
  <div className="wrapper">
    <Helmet>
      <title>Bestiary - Dissidia Compendium</title>
      <meta property="og:site_name" content="Dissidia Compendium"/>
      <meta property="og:type" content="website" />
      <meta name="description" content="Dissidia Opera Omnia Database Bestiary with english translations for all enemies found in game"/>
      <meta name="twitter:title" content="Dissidia Compendium - Bestiary"/>
      <meta name="twitter:description" content="Dissidia Opera Omnia Database Bestiary with english translations for all enemies found in game"/>
      <meta name="twitter:image" content="https://dissidiacompendium.com/images/static/site/logo152.png"/>
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:image:alt" content="Dissidia Compendium - Bestiary"/>
      <meta property="og:title" content="Dissidia Compendium  - Bestiary"/>
      <meta property="og:description" content="Dissidia Opera Omnia Database Bestiary with english translations for all enemies found in game"/>
      <meta property="og:image" content="https://dissidiacompendium.com/images/static/site/logo152.png"/>
      <meta property="og:url" content="https://dissidiacompendium.com/bestiary"/>
    </Helmet>
  <div className="content">
    <h1>{jponly== false? "GL " :"JP "}Enemies</h1>
    <div className="subheader">Use filters to limit returns</div>
    <div className="charfilterspacer"/>
    <div onClick={showfilterbutton} className="charfilter" id={showFilter ? "filteropen" : "filterclosed"}><span className="filterstext"></span>{showFilter ? <TiArrowSortedUp className="uparrow"/> : <TiArrowSortedDown className="downarrow"/>}</div>
      {showFilter == false ? 
        <div className="event-search-reverse-holder">
          <span className="jponlybackground">
            <Tippy content="Upcoming JP" className="tooltip" >
              <span onClick={jponlybutton} className={`jpflage smalleventbutton ${jponly ? "jpsmallactive" : "jpsmallinactive" }`}/>
            </Tippy>
          </span>
          <IoSearch className="searchicon"/>
        <div className="search-holder el">
          <input 
              className="char-search-bar" 
              type="text"
              placeholder="Enemy Name"
              value={searchdisplay}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
          />
          <span className="detailsbackground">
                <Tippy content="Details View" className="tooltip" >
                <span onClick={detailsbutton} className={`detailsview ${details ? "pastsmallactive" : "pastsmallinactive" }`}/>
                </Tippy>
                </span>
          {searchTerm === "" ? "" : 
          <IoMdCloseCircleOutline onClick={clearSearch} className="eventclearsearch"></IoMdCloseCircleOutline>}
          </div>
          </div>
        :""
        }
            <div className="filterholder" id={showFilter ? "showfilteren" : "hiddenfilteren"}>
            <div className="similarbanner">Multiple filters can be active</div>
              <div className="filterholderflair">
                <ul className="enemytypes">
                  <Tippy content="Manikins" className="tooltip" >
                  <li className={`enemybutton ${manikin ? "filteractive": "filterinactive"} manikinButton`} onClick={manikinbutton}></li>
                  </Tippy>
                  <Tippy content="Heretic" className="tooltip" >
                  <li className={`enemybutton ${heretic ? "filteractive": "filterinactive"} hereticButton`} onClick={hereticbutton} ></li>
                  </Tippy>
                  <Tippy content="Lunatic" className="tooltip" >
                  <li className={`enemybutton ${lunatic ? "filteractive": "filterinactive"} lunaticButton`} onClick={lunaticbutton}></li>
                  </Tippy>
                  <Tippy content="Lufenia" className="tooltip" >
                  <li className={`enemybutton ${lufenia ? "filteractive": "filterinactive"} lufeniaButton `} onClick={lufeniabutton}  ></li>
                  </Tippy>
                  <Tippy content="Lufenia+" className="tooltip" >
                  <li className={`enemybutton ${lufeniaplus ? "filteractive": "filterinactive"} lufeniaPlusButton`} onClick={lufeniaplusbutton}  ></li>
                  </Tippy>
                  <Tippy content="Dimensional" className="tooltip" >
                  <li className={`enemybutton ${dimensional ? "filteractive": "filterinactive"} dimensionButton`} onClick={dimensionbutton}  ></li>
                  </Tippy>
                  <Tippy content="Shinryu" className="tooltip" >
                  <li className={`enemybutton ${shinryu ? "filteractive": "filterinactive"} shinryuButton`} onClick={shinryubutton}  ></li>
                  </Tippy>
                  <Tippy content="Spiritus" className="tooltip" >
                  <li className={`enemybutton ${spiritus ? "filteractive": "filterinactive"} spiritusButton`} onClick={spiritusbutton}  ></li>
                  </Tippy>
                </ul>
                <div className="similarbanner">Additional Enemies</div>
                <ul className="enemytypes">
                  <Tippy content="JP Only" className="tooltip" >
                  <li className={`enemybutton ${jponly ? "filteractive": "filterinactive"} jpButton`} onClick={jponlybutton} ></li>
                  </Tippy>
                </ul>
                <div className="similarbanner">Advanced Filters</div>
                <ul className="enemytypes">
                  <Tippy content="Details View" className="tooltip" >
                  <li className={`enemybutton ${details ? "filteractive": "filterinactive"} DetailsButton`} onClick={detailsbutton} ></li>
                  </Tippy>
                </ul>
                <div className={`elementsholder`}>
                        
                        <div className="elementholder3 noselect">
                            <span className="FireElement"/>
                            {fire == undefined || fire == "" ? <div onClick={hidebuttonfire} className='resistund clicky'>*</div> : <i onClick={hidebuttonfire} className={`resist${fire} clicky`}/>}
                            <div className={`${hidefire == true ? "_opacity0" : "" } elementholder99 `}>
                            <div onClick={()=>firebutton("")} className={`resistund clicky`}>*</div>
                            <i onClick={()=>firebutton("2")} className={`resist2 clicky`}></i>
                            <i onClick={()=>firebutton("3")} className={`resist3 clicky`}></i>
                            <i onClick={()=>firebutton("4")} className={`resist4 clicky`}></i>
                            <i onClick={()=>firebutton("5")} className={`resist5 clicky`}></i>
                            <i onClick={()=>firebutton("6")} className={`resist6 clicky`}></i>
                            </div>
                        </div>
                        
                        
                        <div className="elementholder3 noselect">
                            <span className="IceElement"/>
                            {ice == undefined || ice == "" ? <div onClick={hidebuttonice} className='resistund clicky'>*</div> : <i onClick={hidebuttonice} className={`resist${ice} clicky`}/>}
                            <div className={`${hideice == true ? "_opacity0" : "" } elementholder99 `}>
                            <div onClick={()=>icebutton("")} className={`resistund clicky`}>*</div>
                            <i onClick={()=>icebutton("2")} className={`resist2 clicky`}></i>
                            <i onClick={()=>icebutton("3")} className={`resist3 clicky`}></i>
                            <i onClick={()=>icebutton("4")} className={`resist4 clicky`}></i>
                            <i onClick={()=>icebutton("5")} className={`resist5 clicky`}></i>
                            <i onClick={()=>icebutton("6")} className={`resist6 clicky`}></i>
                            </div>
                        </div>
                          
                        
                        <div className="elementholder3 noselect">
                            <span className="ThunderElement"/>
                            {thunder == undefined || thunder == "" ? <div onClick={hidebuttonthunder} className='resistund clicky'>*</div> : <i onClick={hidebuttonthunder} className={`resist${thunder} clicky`}/>}
                            <div className={`${hidethunder == true ? "_opacity0" : "" } elementholder99 `}>
                            <div onClick={()=>thunderbutton("")} className={`resistund clicky`}>*</div>
                            <i onClick={()=>thunderbutton("2")} className={`resist2 clicky`}></i>
                            <i onClick={()=>thunderbutton("3")} className={`resist3 clicky`}></i>
                            <i onClick={()=>thunderbutton("4")} className={`resist4 clicky`}></i>
                            <i onClick={()=>thunderbutton("5")} className={`resist5 clicky`}></i>
                            <i onClick={()=>thunderbutton("6")} className={`resist6 clicky`}></i>
                            </div>
                        </div>
                        
                        
                        <div className="elementholder3 noselect">
                            <span className="WaterElement"/>
                            {water == undefined || water == "" ? <div onClick={hidebuttonwater} className='resistund clicky'>*</div> : <i onClick={hidebuttonwater} className={`resist${water} clicky`}/>}
                            <div className={`${hidewater == true ? "_opacity0" : "" } elementholder99 `}>
                            <div onClick={()=>waterbutton("")} className={`resistund clicky`}>*</div>
                            <i onClick={()=>waterbutton("2")} className={`resist2 clicky`}></i>
                            <i onClick={()=>waterbutton("3")} className={`resist3 clicky`}></i>
                            <i onClick={()=>waterbutton("4")} className={`resist4 clicky`}></i>
                            <i onClick={()=>waterbutton("5")} className={`resist5 clicky`}></i>
                            <i onClick={()=>waterbutton("6")} className={`resist6 clicky`}></i>
                            </div>
                        </div>
                        
                        
                        <div className="elementholder3 noselect">
                            <span className="EarthElement"/>
                            {earth == undefined || earth == "" ? <div onClick={hidebuttonearth} className='resistund clicky'>*</div> : <i onClick={hidebuttonearth} className={`resist${earth} clicky`}/>}
                            <div className={`${hideearth == true ? "_opacity0" : "" } elementholder99 `}>
                            <div onClick={()=>earthbutton("")} className={`resistund clicky`}>*</div>
                            <i onClick={()=>earthbutton("2")} className={`resist2 clicky`}></i>
                            <i onClick={()=>earthbutton("3")} className={`resist3 clicky`}></i>
                            <i onClick={()=>earthbutton("4")} className={`resist4 clicky`}></i>
                            <i onClick={()=>earthbutton("5")} className={`resist5 clicky`}></i>
                            <i onClick={()=>earthbutton("6")} className={`resist6 clicky`}></i>
                            </div>
                        </div>
                        
                        
                        <div className="elementholder3 noselect">
                            <span className="WindElement"/>
                            {wind == undefined || wind == "" ? <div onClick={hidebuttonwind} className='resistund clicky'>*</div> : <i onClick={hidebuttonwind} className={`resist${wind} clicky`}/>}
                            <div className={`${hidewind== true ? "_opacity0" : "" } elementholder99 `}>
                            <div onClick={()=>windbutton("")} className={`resistund clicky`}>*</div>
                            <i onClick={()=>windbutton("2")} className={`resist2 clicky`}></i>
                            <i onClick={()=>windbutton("3")} className={`resist3 clicky`}></i>
                            <i onClick={()=>windbutton("4")} className={`resist4 clicky`}></i>
                            <i onClick={()=>windbutton("5")} className={`resist5 clicky`}></i>
                            <i onClick={()=>windbutton("6")} className={`resist6 clicky`}></i>
                            </div>
                        </div>
                        
                        
                        <div className="elementholder3 noselect">
                            <span className="HolyElement"/>
                            {holy == undefined || holy == "" ? <div onClick={hidebuttonholy} className='resistund clicky'>*</div> : <i onClick={hidebuttonholy} className={`resist${holy} clicky`}/>}
                            <div className={`${hideholy == true ? "_opacity0" : "" } elementholder99 `}>
                            <div onClick={()=>holybutton("")} className={`resistund clicky`}>*</div>
                            <i onClick={()=>holybutton("2")} className={`resist2 clicky`}></i>
                            <i onClick={()=>holybutton("3")} className={`resist3 clicky`}></i>
                            <i onClick={()=>holybutton("4")} className={`resist4 clicky`}></i>
                            <i onClick={()=>holybutton("5")} className={`resist5 clicky`}></i>
                            <i onClick={()=>holybutton("6")} className={`resist6 clicky`}></i>
                            </div>
                        </div>
                        
                        
                        <div className="elementholder3 noselect">
                            <span className="DarkElement"/>
                            {dark == undefined || dark == "" ? <div onClick={hidebuttondark} className='resistund clicky'>*</div> : <i onClick={hidebuttondark} className={`resist${dark} clicky`}/>}
                            <div className={`${hidedark == true ? "_opacity0" : "" } elementholder99 `}>
                            <div onClick={()=>darkbutton("")} className={`resistund clicky`}>*</div>
                            <i onClick={()=>darkbutton("2")} className={`resist2 clicky`}></i>
                            <i onClick={()=>darkbutton("3")} className={`resist3 clicky`}></i>
                            <i onClick={()=>darkbutton("4")} className={`resist4 clicky`}></i>
                            <i onClick={()=>darkbutton("5")} className={`resist5 clicky`}></i>
                            <i onClick={()=>darkbutton("6")} className={`resist6 clicky`}></i>
                            </div>
                        </div>

                        </div>

                        <div className="elementsholder">

                        <div className="elementholder3 noselect">
                            <span className="Melees"/>
                            {melee == undefined || melee == "" ? <div onClick={hidebuttonmelee} className='resistund clicky'>*</div> : <i onClick={hidebuttonmelee} className={`resist${melee} clicky`}/>}
                            <div className={`${hidemelee== true ? "_opacity0" : "" } elementholder99 `}>
                            <div onClick={()=>meleebutton("")} className={`resistund clicky`}>*</div>
                            <i onClick={()=>meleebutton("2")} className={`resist2 clicky`}></i>
                            <i onClick={()=>meleebutton("3")} className={`resist3 clicky`}></i>
                            <i onClick={()=>meleebutton("4")} className={`resist4 clicky`}></i>
                            <i onClick={()=>meleebutton("5")} className={`resist5 clicky`}></i>
                            <i onClick={()=>meleebutton("6")} className={`resist6 clicky`}></i>
                            </div>
                        </div>
                        
                        
                        <div className="elementholder3 noselect">
                            <span className="Rangeds"/>
                            {ranged == undefined || ranged == "" ? <div onClick={hidebuttonranged} className='resistund clicky'>*</div> : <i onClick={hidebuttonranged} className={`resist${ranged} clicky`}/>}
                            <div className={`${hideranged== true ? "_opacity0" : "" } elementholder99 `}>
                            <div onClick={()=>rangedbutton("")} className={`resistund clicky`}>*</div>
                            <i onClick={()=>rangedbutton("2")} className={`resist2 clicky`}></i>
                            <i onClick={()=>rangedbutton("3")} className={`resist3 clicky`}></i>
                            <i onClick={()=>rangedbutton("4")} className={`resist4 clicky`}></i>
                            <i onClick={()=>rangedbutton("5")} className={`resist5 clicky`}></i>
                            <i onClick={()=>rangedbutton("6")} className={`resist6 clicky`}></i>
                            </div>
                        </div>
                        
                        
                        <div className="elementholder3 noselect">
                            <span className="Magics"/>
                            {magic == undefined || magic == "" ? <div onClick={hidebuttonmagic} className='resistund clicky'>*</div> : <i onClick={hidebuttonmagic} className={`resist${magic} clicky`}/>}
                            <div className={`${hidemagic== true ? "_opacity0" : "" } elementholder99 `}>
                            <div onClick={()=>magicbutton("")} className={`resistund clicky`}>*</div>
                            <i onClick={()=>magicbutton("2")} className={`resist2 clicky`}></i>
                            <i onClick={()=>magicbutton("3")} className={`resist3 clicky`}></i>
                            <i onClick={()=>magicbutton("4")} className={`resist4 clicky`}></i>
                            <i onClick={()=>magicbutton("5")} className={`resist5 clicky`}></i>
                            <i onClick={()=>magicbutton("6")} className={`resist6 clicky`}></i>
                            </div>
                        </div>

                        </div>
                        <div>
                        <div className="search-reverse-holder margtop">
                          <div className="search-holder">
                            <IoSearch className="innersearchicon"/>
                            <input 
                                className="search-bar" 
                                type="text"
                                placeholder="Low Resist:"
                                value={searchlowdisplay}
                                onChange={handleChangeLow}
                                onKeyDown={handleKeyDownLow}
                            />
                            {searchlowdisplay === "" ? "" : 
                            <IoMdCloseCircleOutline onClick={clearSearchLow} className="clearsearch"></IoMdCloseCircleOutline>}
                          </div>
                        </div>
                        </div>
                        <div>
                        <div className="search-reverse-holder">
                          <div className="search-holder">
                            <IoSearch className="innersearchicon"/>
                            <input 
                                className="search-bar" 
                                type="text"
                                placeholder="High Resist:"
                                value={searchhighdisplay}
                                onChange={handleChangeHigh}
                                onKeyDown={handleKeyDownHigh}
                            />
                            {searchhighdisplay === "" ? "" : 
                            <IoMdCloseCircleOutline onClick={clearSearchHigh} className="clearsearch"></IoMdCloseCircleOutline>}
                          </div>
                        </div>
                        </div>
                        <div>
                        <div className="search-reverse-holder">
                          <div className="search-holder">
                            <IoSearch className="innersearchicon"/>
                            <input 
                                className="search-bar" 
                                type="text"
                                placeholder="Immune Resist:"
                                value={searchimmunedisplay}
                                onChange={handleChangeImmune}
                                onKeyDown={handleKeyDownImmune}
                            />
                            {searchimmunedisplay === "" ? "" : 
                            <IoMdCloseCircleOutline onClick={clearSearchImmune} className="clearsearch"></IoMdCloseCircleOutline>}
                          </div>
                        </div>
                        </div>

                <div className="similarbanner">Refine</div>
                <div className="typeholder">
                  <Select
                  defaultValue={Typesearch != "" ? {value: Typesearch, label: Typesearch } : null}
                  key={Typesearch}
                  isSearchable={true} 
                  placeholder="Type Select..."
                  className='typecontainer' 
                  classNamePrefix="typetext" 
                  onChange={typeSelect}  
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
                        placeholder="Enemy Name"
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
                <Link to={`/bestiary/enemies`}>
                  <li className={"active"} ><span className="gemselected"/>Enemies</li>
                </Link>
                <Link to={`/bestiary/abilities`}>
                  <li className={""} >Abilities</li>
                </Link>
                <Link to={`/bestiary/buffs`}>
                  <li className={""} >Buffs</li>
                </Link>
            </ul>
            <ul className="enemyholder enemyholderstyling">
            <div className="subtext paddleft">
                {displayBanner}
            </div>
            {details == true ?
             listenemies.length > 0 ?  (
              listenemies.map(enemy => (
                    <EnemyDetailsDirect key={enemy.battle_enemy_id} match={enemy} ProcessedCharacters={ProcessedCharacters} PartnerCharacters={PartnerCharacters}/>
                  ))) : (
                    <div>No results</div>
                  )
            :
            listenemies.length > 0 ?  (
            listenemies.map(enemy => (
                  <EnemyListingDirect key={enemy.battle_enemy_id} match={enemy} ProcessedCharacters={ProcessedCharacters} PartnerCharacters={PartnerCharacters}/>
                ))) : (
                  <div>No results</div>
                )}
            <div className="subtextbottom paddbottom">
                {displayBanner}
            </div>
        </ul>
              
              {showLoadMore && 
                <div className="loadmore" onClick={loadMoreButton}> Load More </div>}
          </div>
        </div>
);
}
export default BestiaryDirect;
  