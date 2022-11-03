import React, {useState, useEffect} from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import { Link } from 'react-router-dom'
import './Spheres.css';
import Tippy from './formatting/TippyDefaults.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import { slice, concat, } from 'lodash';
import GearFormatting from './formatting/GearFormatting.js'
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

const Gear = ({ProcessedCharacters, ProcessedGear, ProcessedBuffs , jptoggledata}) => {

  const passivelimit = window.innerWidth <= 815 ? 10 : 20;

  //const error = ProcessedGear.filter(function (ef) {
  //  const newfilterpull = ef["JPName"] == '';
  //  return newfilterpull;
  //})
  //
  //console.log(error)
  
  const [rawData, setrawData] = useStateIfMounted(ProcessedGear);

  const banerDisplayTerm = "Gear items";

  const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null  ? true : false);
  const [clearFilter, setclearFilter] = useStateIfMounted(false);

  const [ultima, setultima] = useState(getQueryStringVal("ultima") != null  ? true : false);
  const [armor7aplus, setarmor7aplus] = useState(getQueryStringVal("armor7plus") != null  ? true : false);
  const [armor7a, setarmor7a] = useState(getQueryStringVal("armor7") != null  ? true : false)
  const [armorhgplus, setarmorhgplus] = useState(getQueryStringVal("armorhgplus") != null  ? true : false);
  const [armorhg, setarmorhg] = useState(getQueryStringVal("armorhg") != null  ? true : false);
  const [armor35, setarmor35] = useState(getQueryStringVal("armor35") != null  ? true : false);
  const [armor4, setarmor4] = useState(getQueryStringVal("armor4") != null  ? true : false);
  const [weaponbtplus, setweaponbtplus] = useState(getQueryStringVal("weaponbtplus") != null  ? true : false);
  const [weaponbt, setweaponbt] = useState(getQueryStringVal("weaponbt") != null  ? true : false);
  const [weaponld, setweaponld] = useState(getQueryStringVal("weaponld") != null  ? true : false);
  const [weaponfr, setweaponfr] = useState(getQueryStringVal("weaponfr") != null  ? true : false);
  const [weaponexplus, setweaponexplus] = useState(getQueryStringVal("weaponexplus") != null  ? true : false);
  const [weaponex, setweaponex] = useState(getQueryStringVal("weaponex") != null  ? true : false);
  const [weapondark, setweapondark] = useState(getQueryStringVal("weapondark") != null  ? true : false);
  const [weaponnt, setweaponnt] = useState(getQueryStringVal("weaponnt") != null  ? true : false);
  const [weapon35, setweapon35] = useState(getQueryStringVal("weapon35") != null  ? true : false);
  const [weaponwoi, setweaponwoi] = useState(getQueryStringVal("weaponwoi") != null  ? true : false);
  const [weapon15, setweapon15] = useState(getQueryStringVal("weapon15") != null  ? true : false);
  const [weapon4, setweapon4] = useState(getQueryStringVal("weapon4") != null  ? true : false);
  const [bloom, setbloom] = useState(getQueryStringVal("bloom") != null  ? true : false);
  const [skin, setskin] = useState(getQueryStringVal("gloss") != null  ? true : false);
  const [ActiveRework, setActiveRework] = useState(getQueryStringVal("rework") != null ? true : false);
  
  const[Sword, setSword] = useState(getQueryStringVal("sword") != null  ? true : false);
  const[Greatsword, setGreatsword] = useState(getQueryStringVal("greatsword") != null  ? true : false);
  const[Staff, setStaff] = useState(getQueryStringVal("staff") != null  ? true : false);
  const[Fist, setFist] = useState(getQueryStringVal("fist") != null  ? true : false);
  const[Dagger, setDagger] = useState(getQueryStringVal("dagger") != null  ? true : false);
  const[Gun, setGun] = useState(getQueryStringVal("gun") != null  ? true : false);
  const[Throwing, setThrowing] = useState(getQueryStringVal("throw") != null  ? true : false);
  const[Whip, setWhip] = useState(getQueryStringVal("whip") != null  ? true : false);
  const[Bow, setBow] = useState(getQueryStringVal("bow") != null  ? true : false);
  const[Spear, setSpear] = useState(getQueryStringVal("spear") != null  ? true : false);
  const[Other, setOther] = useState(getQueryStringVal("other") != null  ? true : false);
  const[Armor, setArmor] = useState(getQueryStringVal("armor") != null  ? true : false);
  const[Weapons, setWeapons] = useState(getQueryStringVal("weapons") != null  ? true : false);

  const [merge, setMerge] = useState(getQueryStringVal("merge") != null  ? true : false);

  const [loop, setLoop] = useStateIfMounted(false);
  const [reverse, setReverse] = useState(getQueryStringVal("rev") != null  ? true : false);
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

    const [ultimasearch, setultimasearch] = useQueryParam("ultima", "");
    const [armor7aplussearch, setarmor7aplussearch] = useQueryParam("armor7plus", "");
    const [armor7asearch, setarmor7asearch] = useQueryParam("armor7", "");
    const [armorhgplussearch, setarmorhgplussearch] = useQueryParam("armorhgplus", "");
    const [armorhgsearch, setarmorhgsearch] = useQueryParam("armorhg", "");
    const [armor35search, setarmor35search] = useQueryParam("armor35", "");
    const [armor4search, setarmor4search] = useQueryParam("armor4", "");
    const [weaponbtplussearch, setweaponbtplussearch] = useQueryParam("weaponbtplus", "");
    const [weaponbtsearch, setweaponbtsearch] = useQueryParam("weaponbt", "");
    const [weaponldsearch, setweaponldsearch] = useQueryParam("weaponld", "");
    const [weaponfrsearch, setweaponfrsearch] = useQueryParam("weaponfr", "");
    const [weaponexplussearch, setweaponexplussearch] = useQueryParam("weaponexplus", "");
    const [weaponexsearch, setweaponexsearch] = useQueryParam("weaponex", "");
    const [weapondarksearch, setweapondarksearch] = useQueryParam("weapondark", "");
    const [weaponntsearch, setweaponntsearch] = useQueryParam("weaponnt", "");
    const [weapon35search, setweapon35search] = useQueryParam("weapon35", "");
    const [weaponwoisearch, setweaponwoisearch] = useQueryParam("weaponwoi", "");
    const [weapon15search, setweapon15search] = useQueryParam("weapon15", "");
    const [weapon4search, setweapon4search] = useQueryParam("weapon4", "");
    const [bloomsearch, setbloomsearch] = useQueryParam("bloom", "");
    const [skinsearch, setskinsearch] = useQueryParam("gloss", "");
    const [ActiveReworksearch, setActiveReworksearch] = useQueryParam("rework", "");
    
    const[Swordsearch, setSwordsearch] = useQueryParam("sword", "");
    const[Greatswordsearch, setGreatswordsearch] = useQueryParam("greatsword", "");
    const[Staffsearch, setStaffsearch] = useQueryParam("staff", "");
    const[Fistsearch, setFistsearch] = useQueryParam("fist", "");
    const[Daggersearch, setDaggersearch] = useQueryParam("dagger", "");
    const[Gunsearch, setGunsearch] = useQueryParam("gun", "");
    const[Throwingsearch, setThrowingsearch] = useQueryParam("throw", "");
    const[Whipsearch, setWhipsearch] = useQueryParam("whip", "");
    const[Bowsearch, setBowsearch] = useQueryParam("bow", "");
    const[Spearsearch, setSpearsearch] = useQueryParam("spear", "");
    const[Othersearch, setOthersearch] = useQueryParam("other", "");
    const[Armorsearch, setArmorsearch] = useQueryParam("armor", "");
    const[Weaponssearch, setWeaponssearch] = useQueryParam("weapons", "");

    const [mergesearch, setMergesearch] = useQueryParam("merge", "");
    const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
    const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
    const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");
    
    const [Typesearch, setTypesearch] = useQueryParam("Char", "");
    const { protocol, pathname, host } = window.location;
    const query = getQuery();
    const url = `${protocol}//${host}${pathname}?${query.toString()}`;

    //param logic
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

  useEffect(() => {
    setShowLoadMore(true);
    setLimits(passivelimit);
    setFilterResults(rawData);
    setSearchResults(rawData);
    setListLength(rawData.length);
    setListDisplay(slice(rawData, 0, passivelimit));
    setDisplayBanner(
      <>Displaying <span className="subtextgold">{passivelimit}</span> of <span className="subtextgold"> {rawData.length}</span> {banerDisplayTerm}</>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(ActiveRework == true){
      const filteredout = rawData.filter(
        (gear) => gear["GearGLFlag"] == true
      );
      setrawData(filteredout);
    } else{
      setrawData(ProcessedGear)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ActiveRework])

  //filter
  useEffect(() => {
    if(merge != true){
    const filterholder = [];
    if (armor7aplus === true) {
      const filteredout = rawData.filter(
        (gear) => gear["GearRank"] == 12
      );
      filterholder.push(...filteredout);
    }
    if (armor7a === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearRank"] == 11
        );
        filterholder.push(...filteredout);
      }
      if (armorhgplus === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearRank"] == 4
        );
        filterholder.push(...filteredout);
      }
      if (armorhg === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearRank"] == 3
        );
        filterholder.push(...filteredout);
      }
      if (armor35 === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearRank"] == 2
        );
        filterholder.push(...filteredout);
      }
      if (armor4 === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearRank"] == 1
        );
        filterholder.push(...filteredout);
      }
      if (bloom === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearRank"] == 10
        );
        filterholder.push(...filteredout);
      }
      if (skin === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearRank"] == 80
        );
        filterholder.push(...filteredout);
      }
      if (weaponbtplus === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearRank"] == 95
        );
        filterholder.push(...filteredout);
      }
      if (weaponbt === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearRank"] == 90
        );
        filterholder.push(...filteredout);
      }
      if (weaponld === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearRank"] == 57
        );
        filterholder.push(...filteredout);
      }
      if (weaponld === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearRank"] == 57
        );
        filterholder.push(...filteredout);
      }
      if (weaponexplus === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearRank"] == 70
        );
        filterholder.push(...filteredout);
      }
      if (weaponfr === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearRank"] == 75
        );
        filterholder.push(...filteredout);
      }
      if (weaponex === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearRank"] == 56
        );
        filterholder.push(...filteredout);
      }
      if (weapondark === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearRank"] == 55
        );
        filterholder.push(...filteredout);
      }
      if (weaponnt === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearRank"] == 54
        );
        filterholder.push(...filteredout);
      }
      if (weapon35 === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearRank"] == 53
        );
        filterholder.push(...filteredout);
      }
      if (weaponwoi === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearRank"] == 52
        );
        filterholder.push(...filteredout);
      }
      if (weapon15 === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearRank"] == 51
        );
        filterholder.push(...filteredout);
      }
      if (weapon4 === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearRank"] == 50
        );
        filterholder.push(...filteredout);
      }
      if (Sword === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearType"] == "Sword"
        );
        filterholder.push(...filteredout);
      }
      if (Greatsword === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearType"] == "Greatsword"
        );
        filterholder.push(...filteredout);
      }
      if (Staff === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearType"] == "Staff"
        );
        filterholder.push(...filteredout);
      }
      if (Fist === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearType"] == "Fist"
        );
        filterholder.push(...filteredout);
      }
      if (Dagger === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearType"] == "Dagger"
        );
        filterholder.push(...filteredout);
      }
      if (Gun === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearType"] == "Gun"
        );
        filterholder.push(...filteredout);
      }
      if (Throwing === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearType"] == "Throwing"
        );
        filterholder.push(...filteredout);
      }
      if (Whip === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearType"] == "Whip"
        );
        filterholder.push(...filteredout);
      }
      if (Bow === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearType"] == "Bow"
        );
        filterholder.push(...filteredout);
      }
      if (Spear === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearType"] == "Spear"
        );
        filterholder.push(...filteredout);
      }
      if (Other === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearType"] == "Other"
        );
        filterholder.push(...filteredout);
      }
      if (Armor === true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearRank"] >= 1 && gear["GearRank"] <= 12 && gear["GearRank"] != 10
        );
        filterholder.push(...filteredout);
      }
      if (Weapons == true) {
        const filteredout = rawData.filter(
          (gear) => gear["GearRank"] > 12  && gear["GearRank"] != 80
        );
        filterholder.push(...filteredout);
      }
      if (ultima == true) {
        const filteredout = rawData.filter(
          (gear) => gear["CharID"] == 999
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
        a.GearKey - b.GearKey :
        b.GearKey - a.GearKey);
      const searchit = makeUnique.filter((e) =>
      (`${e.GearPassiveTitle} ${e.JPName} ${e.GearName} ${e.GearPassiveDesc0 == undefined ? "" : e.GearPassiveDesc0.replace(/(>)/gm,"").replace(/(<)/gm,"")} ${e.GearPassiveDesc1 == undefined ? "" : e.GearPassiveDesc1.replace(/(>)/gm,"").replace(/(<)/gm,"")} ${e.GearPassiveDesc2 == undefined ? "" : e.GearPassiveDesc2.replace(/(>)/gm,"").replace(/(<)/gm,"")} ${e.GearPassiveDesc3 == undefined ? "" : e.GearPassiveDesc3.replace(/(>)/gm,"").replace(/(<)/gm,"")}`).toLowerCase().includes(searchTerm)
      );
      const getcondfilter = searchit.filter(function (ef) {
        const newfilterpull = ef["CharID"] === condFilter;
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
  }, [ultima, merge, weaponfr, limits,rawData,searchTerm,showFilter,clearFilter,Weapons, Armor, Other, Spear, Bow, Whip, Throwing, Gun, Dagger, Fist, Staff, Greatsword, Sword, clearFilter, bloom, armor7aplus, armor7a, armorhgplus, armorhg, armor35, armor4, weaponbtplus, weaponbt, weaponld, weaponexplus,  weaponex, weapondark, weaponnt, weapon35, weaponwoi, weapon15, weapon4, skin,  condFilter, reverse]);

  //merge filter
  useEffect(() => {
    if(merge == true){
      var Rank = null;
      var Type = null;
      if (armor7a === true) {
         Rank = 11
      }
      if (armorhgplus === true) {
        Rank = 4
      }
      if (armorhg === true) {
        Rank = 3
      }
      if (armor35 === true) {
        Rank = 2
      }
      if (armor4 === true) {
        Rank = 1
      }
      if (bloom === true) {
        Rank = 10
      }
      if (skin === true) {
        Rank = 80
      }
      if (weaponbtplus === true) {
        Rank = 95
      }
      if (weaponbt === true) {
        Rank = 90
      }
      if (weaponld === true) {
        Rank = 57
      }
      if (weaponexplus === true) {
        Rank = 70
      }
      if (weaponfr === true) {
        Rank = 75
      }
      if (weaponex === true) {
        Rank = 56
      }
      if (weapondark === true) {
        Rank = 55
      }
      if (weaponnt === true) {
        Rank = 54
      }
      if (weapon35 === true) {
       Rank = 53
      }
      if (weaponwoi === true) {
        Rank = 52
      }
      if (weapon15 === true) {
        Rank = 51
      }
      if (weapon4 === true) {
        Rank = 50
      }
      if (Sword === true) {
        Type = "Sword"
      }
      if (Greatsword === true) {
        Type = "Greatsword"
      }
      if (Staff === true) {
        Type = "Staff"
      }
      if (Fist === true) {
        Type = "Fist"
      }
      if (Dagger === true) {
        Type = "Dagger"
      }
      if (Gun === true) {
        Type = "Gun"
      }
      if (Throwing === true) {
        Type = "Throwing"
      }
      if (Whip === true) {
        Type = "Whip"
      }
      if (Bow === true) {
        Type = "Bow"
      }
      if (Spear === true) {
        Type = "Spear"
      }
      if (Other === true) {
        Type = "Other"
      }
      

      const charType = ultima == true ? {
        GearRank: Rank,
        GearType: Type,
        CharID: 999
      } : {
        GearRank: Rank,
        GearType: Type
      }
  
      const filtermerge = rawData.filter((oneChar) => {
        return Object.entries(charType)
          .filter(entry => entry[1])
          .every(([key, value]) => oneChar[key] === value);
      });

      const makeUnique = filtermerge
        .filter(onlyUnique)
        .sort((a, b) => 
        reverse == false ? 
        a.GearKey - b.GearKey :
        b.GearKey - a.GearKey);
      const searchit = makeUnique.filter((e) =>
      (`${e.GearPassiveTitle} ${e.JPName} ${e.GearName} ${e.GearPassiveDesc0 == undefined ? "" : e.GearPassiveDesc0.replace(/(>)/gm,"").replace(/(<)/gm,"")} ${e.GearPassiveDesc1 == undefined ? "" : e.GearPassiveDesc1.replace(/(>)/gm,"").replace(/(<)/gm,"")} ${e.GearPassiveDesc2 == undefined ? "" : e.GearPassiveDesc2.replace(/(>)/gm,"").replace(/(<)/gm,"")} ${e.GearPassiveDesc3 == undefined ? "" : e.GearPassiveDesc3.replace(/(>)/gm,"").replace(/(<)/gm,"")}`).toLowerCase().includes(searchTerm)
      );
      const getcondfilter = searchit.filter(function (ef) {
        const newfilterpull = ef["CharID"] === condFilter;
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
  }, [ultima, merge, limits,rawData,searchTerm,showFilter,clearFilter,Weapons, Armor, Other, Spear, Bow, Whip, Throwing, Gun, Dagger, Fist, Staff, Greatsword, Sword, clearFilter, bloom, armor7aplus, armor7a, armorhgplus, armorhg, armor35, armor4, weaponbtplus, weaponbt, weaponfr, weaponld, weaponexplus,  weaponex, weapondark, weaponnt, weapon35, weaponwoi, weapon15, weapon4, skin,  condFilter, reverse]);

  //buttons
  const ultimabutton = () => {
    if(ultima == false){
      setultimasearch("true")
    } else {
      setultimasearch("")
    }
    setultima((prevValue) => !prevValue);
  };
  const armor7aplusbutton = () => {
    if(armor7aplus == false){
      setarmor7aplussearch("true")
    } else {
      setarmor7aplussearch("")
    }
    setarmor7aplus((prevValue) => !prevValue);
  };
  const armor7abutton = () => {
    if(armor7a == false){
      setarmor7asearch("true")
    } else {
      setarmor7asearch("")
    }
    setarmor7a((prevValue) => !prevValue);
  };
  const armorhgplusbutton = () => {
    if(armorhgplus == false){
      setarmorhgplussearch("true")
    } else {
      setarmorhgplussearch("")
    }
    setarmorhgplus((prevValue) => !prevValue);
  };
  const armorhgbutton = () => {
    if(armorhg == false){
      setarmorhgsearch("true")
    } else {
      setarmorhgsearch("")
    }
    setarmorhg((prevValue) => !prevValue);
  };
  const armor35button = () => {
    if(armor35 == false){
      setarmor35search("true")
    } else {
      setarmor35search("")
    }
    setarmor35((prevValue) => !prevValue);
  };
  const armor4button = () => {
    if(armor4 == false){
      setarmor4search("true")
    } else {
      setarmor4search("")
    }
    setarmor4((prevValue) => !prevValue);
  };
  const bloombutton = () => {
    if(bloom == false){
      setbloomsearch("true")
    } else {
      setbloomsearch("")
    }
    setbloom((prevValue) => !prevValue);
  };
  const skinbutton = () => {
    if(skin == false){
      setskinsearch("true")
    } else {
      setskinsearch("")
    }
    setskin((prevValue) => !prevValue);
  };
  const weaponbtplusbutton = () => {
    if(weaponbtplus == false){
      setweaponbtplussearch("true")
    } else {
      setweaponbtplussearch("")
    }
    setweaponbtplus((prevValue) => !prevValue);
  };
  const weaponbtbutton = () => {
    if(weaponbt == false){
      setweaponbtsearch("true")
    } else {
      setweaponbtsearch("")
    }
    setweaponbt((prevValue) => !prevValue);
  };
  const weaponldbutton = () => {
    if(weaponld == false){
      setweaponldsearch("true")
    } else {
      setweaponldsearch("")
    }
    setweaponld((prevValue) => !prevValue);
  };
  const weaponexplusbutton = () => {
    if(weaponexplus == false){
      setweaponexplussearch("true")
    } else {
      setweaponexplussearch("")
    }
    setweaponexplus((prevValue) => !prevValue);
  };
  const weaponexbutton = () => {
    if(weaponex == false){
      setweaponexsearch("true")
    } else {
      setweaponexsearch("")
    }
    setweaponex((prevValue) => !prevValue);
  };
  const weapondarkbutton = () => {
    if(weapondark == false){
      setweapondarksearch("true")
    } else {
      setweapondarksearch("")
    }
    setweapondark((prevValue) => !prevValue);
  };
  const weaponntbutton = () => {
    if(weaponnt == false){
      setweaponntsearch("true")
    } else {
      setweaponntsearch("")
    }
    setweaponnt((prevValue) => !prevValue);
  };
  const weapon35button = () => {
    if(weapon35 == false){
      setweapon35search("true")
    } else {
      setweapon35search("")
    }
    setweapon35((prevValue) => !prevValue);
  };
  const weaponfrbutton = () => {
    if(weaponfr == false){
      setweaponfrsearch("true")
    } else {
      setweaponfrsearch("")
    }
    setweaponfr((prevValue) => !prevValue);
  };
  const weaponwoibutton = () => {
    if(weaponwoi == false){
      setweaponwoisearch("true")
    } else {
      setweaponwoisearch("")
    }
    setweaponwoi((prevValue) => !prevValue);
  };
  const weapon15button = () => {
    if(weapon15 == false){
      setweapon15search("true")
    } else {
      setweapon15search("")
    }
    setweapon15((prevValue) => !prevValue);
  };
  const weapon4button = () => {
    if(weapon4 == false){
      setweapon4search("true")
    } else {
      setweapon4search("")
    }
    setweapon4((prevValue) => !prevValue);
  };
  const swordbutton = () => {
    if(Sword == false){
      setSwordsearch("true")
    } else {
      setSwordsearch("")
    }
    setSword((prevValue) => !prevValue);
  };
  const greatswordbutton = () => {
    if(Greatsword == false){
      setGreatswordsearch("true")
    } else {
      setGreatswordsearch("")
    }
    setGreatsword((prevValue) => !prevValue);
  }
  const staffbutton = () => {
    if(Staff == false){
      setStaffsearch("true")
    } else {
      setStaffsearch("")
    }
    setStaff((prevValue) => !prevValue);
  }
  const fistbutton = () => {
    if(Fist == false){
      setFistsearch("true")
    } else {
      setFistsearch("")
    }
    setFist((prevValue) => !prevValue);
  }
  const daggerbutton = () => {
    if(Dagger == false){
      setDaggersearch("true")
    } else {
      setDaggersearch("")
    }
    setDagger((prevValue) => !prevValue);
  }
  const gunbutton = () => {
    if(Gun == false){
      setGunsearch("true")
    } else {
      setGunsearch("")
    }
    setGun((prevValue) => !prevValue);
  }
  const throwingbutton = () => {
    if(Throwing == false){
      setThrowingsearch("true")
    } else {
      setThrowingsearch("")
    }
    setThrowing((prevValue) => !prevValue);
  }
  const whipbutton = () => {
    if(Whip == false){
      setWhipsearch("true")
    } else {
      setWhipsearch("")
    }
    setWhip((prevValue) => !prevValue);
  }
  const bowbutton = () => {
    if(Bow == false){
      setBowsearch("true")
    } else {
      setBowsearch("")
    }
    setBow((prevValue) => !prevValue);
  }
  const spearbutton = () => {
    if(Spear == false){
      setSpearsearch("true")
    } else {
      setSpearsearch("")
    }
    setSpear((prevValue) => !prevValue);
  }
  const otherbutton = () => {
    if(Other == false){
      setOthersearch("true")
    } else {
      setOthersearch("")
    }
    setOther((prevValue) => !prevValue);
  }
  const armorbutton = () => {
    if(Armor == false){
      setArmorsearch("true")
    } else {
      setArmorsearch("")
    }
    setArmor((prevValue) => !prevValue);
  }
  const weaponsbutton = () => {
    if(Weapons == false){
      setWeaponssearch("true")
    } else {
      setWeaponssearch("")
    }
    setWeapons((prevValue) => !prevValue);
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

  const showfilterbutton = () => {
    if (showFilter == false) {
      setFiltersearch("true")
    } else {
      setFiltersearch("")
    }
    setShowFilter((prevValue) => !prevValue);
  }

  const ActiveReworkbutton = () => {
    if(ActiveRework == false){
      setActiveReworksearch("true")
    } else {
      setActiveReworksearch("")
    }
    setActiveRework((prevValue) => !prevValue);
  }
  

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

//merg toggle
  const togglemerge = () => {
    if (merge == false) {
      setMergesearch("true")
    } else{
      setMergesearch("")
    }
    setMerge((prevValue) => !prevValue);
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

  const resetbutton = () =>{
    setclearFilter(true);
    setReverse(false)
    setultima(false)
    setarmor7aplus(false);
    setarmor7aplus(false);
    setarmor7a(false);
    setarmorhgplus(false);
    setarmorhg(false);
    setarmor35(false);
    setarmor4(false);
    setbloom(false);
    setskin(false);
    setweaponbtplus(false);
    setweaponbt(false);
    setweaponld(false);
    setweaponexplus(false);
    setweaponex(false);
    setweapondark(false);
    setweaponnt(false);
    setweapon35(false);
    setweaponwoi(false);
    setweapon15(false);
    setweaponfr(false);
    setweapon4(false);
    setSword(false);
    setGreatsword(false);
    setStaff(false);
    setFist(false);
    setDagger(false);
    setGun(false);
    setThrowing(false);
    setWhip(false);
    setBow(false);
    setSpear(false);
    setOther(false);
    setweaponbtplus(false);
    setArmor(false);
    setWeapons(false);
    setMerge(false)
    setActiveRework(false)

    setultimasearch("")
    setarmor7aplussearch("")
    setarmor7asearch("")
    setarmorhgplussearch("")
    setarmorhgsearch("")
    setarmor35search("")
    setarmor4search("")
    setweaponbtplussearch("")
    setweaponbtsearch("")
    setweaponldsearch("")
    setweaponexplussearch("")
    setweaponexsearch("")
    setweapondarksearch("")
    setweaponntsearch("")
    setweapon35search("")
    setweaponwoisearch("")
    setweapon15search("")
    setweaponfrsearch("")
    setweapon4search("")
    setbloomsearch("")
    setskinsearch("")

    setSwordsearch("")
    setGreatswordsearch("")
    setStaffsearch("")
    setFistsearch("")
    setDaggersearch("")
    setGunsearch("")
    setThrowingsearch("")
    setWhipsearch("")
    setBowsearch("")
    setSpearsearch("")
    setOthersearch("")
    setArmorsearch("")
    setWeaponssearch("")
    setActiveReworksearch("")

    setMergesearch("")
    setReversesearch("")
    setTEXTsearch("")
    setTypesearch("")

    setsearchdisplay("");
    setSearchTerm("");
    setCondFilter("")
    setTimeout(() => setclearFilter(false), 1000);
  }

  const listgear = listDisplay;

    return (
      <div className="wrapper">
        <Helmet>
          <title>Gear - Dissidia Compendium</title>
          <meta property="og:site_name" content="Dissidia Compendium"/>
          <meta property="og:type" content="website" />
          <meta name="description" content="Gear Search"/>
          <meta name="twitter:title" content="Gear Search"/>
          <meta name="twitter:description" content="Gear Search"/>
          <meta property="og:title" content="Gear Search"/>
          <meta property="og:description" content="Gear Search"/>
          <meta property="og:url" content="https://dissidiacompendium.com/search/gear"/>
        </Helmet>
            <div className="content">
              <h1  >Gear</h1>
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
                    placeholder="Gear Name / Effects"
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
                          <Tippy content="Sword">
                            <li className={`${Sword ? "filteractive": "filterinactive"} spheresbutton swordbutton`} onClick={swordbutton}></li>
                          </Tippy>  
                          <Tippy content="Greatsword">
                            <li className={`${Greatsword ? "filteractive": "filterinactive"} spheresbutton greatswordbutton`} onClick={greatswordbutton}></li>
                          </Tippy>
                          <Tippy content="Staff">
                            <li className={`${Staff ? "filteractive": "filterinactive"} spheresbutton staffbutton`} onClick={staffbutton}></li>
                          </Tippy>
                          <Tippy content="Fist">
                            <li className={`${Fist ? "filteractive": "filterinactive"} spheresbutton fistbutton`} onClick={fistbutton}></li>
                          </Tippy>
                          <Tippy content="Dagger">
                            <li className={`${Dagger ? "filteractive": "filterinactive"} spheresbutton daggerbutton`} onClick={daggerbutton}></li>
                          </Tippy>
                          <Tippy content="Gun">
                            <li className={`${Gun ? "filteractive": "filterinactive"} spheresbutton gunbutton`} onClick={gunbutton}></li>
                          </Tippy>
                          <Tippy content="Throwing">
                            <li className={`${Throwing ? "filteractive": "filterinactive"} spheresbutton throwbutton`} onClick={throwingbutton}></li>
                          </Tippy>
                          <Tippy content="Whip">
                            <li className={`${Whip ? "filteractive": "filterinactive"} spheresbutton whipbutton`} onClick={whipbutton}></li>
                          </Tippy>
                          <Tippy content="Bow">
                            <li className={`${Bow ? "filteractive": "filterinactive"} spheresbutton bowbutton`} onClick={bowbutton}></li>
                          </Tippy>
                          <Tippy content="Spear">
                            <li className={`${Spear ? "filteractive": "filterinactive"} spheresbutton spearsbutton`} onClick={spearbutton}></li>
                          </Tippy>
                          <Tippy content="Other">
                            <li className={`${Other ? "filteractive": "filterinactive"} spheresbutton othersbutton`} onClick={otherbutton}></li>
                          </Tippy>
                          <Tippy content="All Weapons">
                            <li className={`${Weapons ? "filteractive": "filterinactive"} spheresbutton  weaponbutton`} onClick={weaponsbutton}></li>
                          </Tippy>
                          <Tippy content="All Armor">
                            <li className={`${Armor ? "filteractive": "filterinactive"} spheresbutton  armoriconbutton`} onClick={armorbutton}></li>
                          </Tippy>
                        </ul> 
                        <br/>
                        <ul className="bufftypes">
                        <Tippy content="Ultima Weapons">
                            <li className={`${ultima ? "filteractive": "filterinactive"} buffbutton ultimabutton`} onClick={ultimabutton}></li>
                        </Tippy>
                            <Tippy content="BT+ Weapon">
                            <li className={`${weaponbtplus ? "filteractive": "filterinactive"} buffbutton wpbtplusbutton`} onClick={weaponbtplusbutton}></li>
                            </Tippy>
                            <Tippy content="BT Weapon">
                            <li className={`${weaponbt ? "filteractive": "filterinactive"} buffbutton wpbtbutton`} onClick={weaponbtbutton}></li>
                            </Tippy>
                            <Tippy content="FR Weapon">
                            <li className={`${weaponfr ? "filteractive": "filterinactive"} buffbutton wpfrbutton`} onClick={weaponfrbutton}></li>
                            </Tippy>
                            <Tippy content="LD Weapon">
                            <li className={`${weaponld ? "filteractive": "filterinactive"} buffbutton wpldbutton`} onClick={weaponldbutton}></li>
                            </Tippy>
                            <Tippy content="7★+ Armor">
                            <li className={`${armor7aplus ? "filteractive": "filterinactive"} buffbutton arm7aplusbutton`} onClick={armor7aplusbutton}></li>
                        </Tippy>
                        <Tippy content="7★ Armor">
                            <li className={`${armor7a ? "filteractive": "filterinactive"} buffbutton arm7abutton`} onClick={armor7abutton}></li>
                        </Tippy>
                       
                            
                        </ul>  
                        <br/>  
                        <Tippy content="EX+ Weapon">
                            <li className={`${weaponexplus ? "filteractive": "filterinactive"} buffbutton wpexplusbutton`} onClick={weaponexplusbutton}></li>
                            </Tippy>
                            <Tippy content="EX Weapon">
                            <li className={`${weaponex ? "filteractive": "filterinactive"} buffbutton wpexbutton`} onClick={weaponexbutton}></li>
                            </Tippy>
                            <Tippy content="35CP Weapon">
                            <li className={`${weapon35 ? "filteractive": "filterinactive"} buffbutton wp35button`} onClick={weapon35button}></li>
                            </Tippy>
                            <Tippy content="15CP Weapon">
                            <li className={`${weapon15 ? "filteractive": "filterinactive"} buffbutton wp15button`} onClick={weapon15button}></li>
                            </Tippy>
                          <ul className="bufftypes">
                          <Tippy content="HG+ Armor">
                              <li className={`${armorhgplus ? "filteractive": "filterinactive"} buffbutton armhgplusbutton`} onClick={armorhgplusbutton}></li>
                              </Tippy>
                          <Tippy content="HG Armor">
                              <li className={`${armorhg ? "filteractive": "filterinactive"} buffbutton armhgbutton`} onClick={armorhgbutton}></li>
                              </Tippy>
                          <Tippy content="35CP Armor">
                              <li className={`${armor35 ? "filteractive": "filterinactive"} buffbutton arm35abutton`} onClick={armor35button}></li>
                              </Tippy>
                          </ul>    
                          <br/>
                        <ul className="bufftypes">
                            <Tippy content="World of Illusions Weapon">
                            <li className={`${weaponwoi ? "filteractive": "filterinactive"} buffbutton wpwoibutton`} onClick={weaponwoibutton}></li>
                            </Tippy>
                            <Tippy content="Dark Weapon">
                            <li className={`${weapondark ? "filteractive": "filterinactive"} buffbutton wpdarkbutton`} onClick={weapondarkbutton}></li>
                            </Tippy>
                            <Tippy content="NT Weapon">
                            <li className={`${weaponnt ? "filteractive": "filterinactive"} buffbutton wpntbutton`} onClick={weaponntbutton}></li>
                            </Tippy>
                            <Tippy content="Bloom Stone">
                            <li className={`${bloom ? "filteractive": "filterinactive"} buffbutton armbloombutton`} onClick={bloombutton}></li>
                            </Tippy>
                            <Tippy content="4★ Armor">
                            <li className={`${armor4 ? "filteractive": "filterinactive"} buffbutton arm4abutton`} onClick={armor4button}></li>
                            </Tippy>
                            <Tippy content="4★ Weapon">
                            <li className={`${weapon4 ? "filteractive": "filterinactive"} buffbutton wp4wbutton`} onClick={weapon4button}></li>
                            </Tippy>
                            <Tippy content="Weapon Gloss">
                            <li className={`${skin ? "filteractive": "filterinactive"} buffbutton skinbutton`} onClick={skinbutton}></li>
                            </Tippy>
                        </ul>          
                      <div className="similarbanner">Refine</div>
                      <ul className="bufftypes">
                        <Tippy content="Active JP Reworks">
                            <li className={`${ActiveRework ? "filteractive": "filterinactive"} buffbutton reworkbutton`} onClick={ActiveReworkbutton}></li>
                        </Tippy>
                      </ul> 
                      <div className="margeholder">
                    <div className="Merge">
                      <label className="MergeText">Merge Filters?</label>
                      <div key="mergecheck1" className={`${merge == true ? "nodisplay" :  `uncheck`}`} onClick={togglemerge}/>
                      <div key="mergecheck2" className={`${merge == true ? "check" :  `nodisplay`}`} onClick={togglemerge}/>
                    </div>
                    </div>
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
                              placeholder="Gear Name / Effects"
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
                    <Link className="whitecolor" to={"/characters/ultimaweapon"}>
                    <span className="subtext">Check out Ultima Weapon</span>
                    </Link>   
                    <span>{" / "}</span>
                    <Link className="whitecolor" to={"/characters/skins/weapons"}>
                    <span className="subtext">Gloss page</span>
                    </Link>   
                  </div>
                  {showFilter == true ? "" :
                  <span>
                  <Link className="whitecolor" to={"/characters/ultimaweapon"}>
                  <span className="subtext">Ultima Weapon</span>
                  </Link> 
                  <span>{" / "}</span>
                  <Link className="whitecolor" to={"/characters/skins/weapons"}>
                  <span className="subtext">Gloss page</span>
                  </Link>
                  </span> }
              <ul className="bannertabs">
                <Link to={`/search/buffs`}>
                  <li className={""} >Buffs</li>
                </Link>
                <Link to={`/search/abilities`}>
                  <li className={""} >Abilities</li>
                </Link>
                <Link to={`/search/gear`}>
                  <li className={"active"}><span className="gemselected"/>Gear</li>
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
              {listgear.length > 0 ?  (
              listgear.map(gear =>(
                <GearFormatting key={gear.GearKey} match={gear} ProcessedBuffs={ProcessedBuffs} jptoggledata={jptoggledata}/>
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
export default Gear;