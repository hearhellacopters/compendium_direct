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
import AbilitiesFormatting from './formatting/AbilitiesFormatting.js'
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

const Passives = ({ProcessedCharacters, ProcessedAbilities, ProcessedBuffs, jptoggledata}) => {

  //const error = ProcessedAbilities.filter(function (ef) {
  //  const newfilterpull = ef["JPName"] == '';
  //  return newfilterpull;
  //})
  //
  //console.log(error)

  const dispatch = useDispatch();

  const passivelimit = window.innerWidth <= 815 ? 15 : 30;
  
  const rawData = ProcessedAbilities;

  const banerDisplayTerm = "abilities";

  const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null  ? true : false);
  const [clearFilter, setclearFilter] = useStateIfMounted(false);

  const [brv, setbrv] = useState(getQueryStringVal("brv") != null  ? true : false);
  const [hp, sethp] = useState(getQueryStringVal("hp") != null  ? true : false)
  const [s1, sets1] = useState(getQueryStringVal("s1") != null  ? true : false);
  const [s2, sets2] = useState(getQueryStringVal("s2") != null  ? true : false);
  const [aa, setaa] = useState(getQueryStringVal("aa") != null  ? true : false);
  const [ex, setex] = useState(getQueryStringVal("ex") != null  ? true : false);
  const [ld, setld] = useState(getQueryStringVal("ld") != null  ? true : false);
  const [fr, setfr] = useState(getQueryStringVal("fr") != null  ? true : false);
  const [burst, setburst] = useState(getQueryStringVal("burst") != null  ? true : false);
  const [call75, setcall75] = useState(getQueryStringVal("call75") != null  ? true : false);
  const [callld, setcallld] = useState(getQueryStringVal("callld") != null  ? true : false);
  const [aoe, setaoe] = useState(getQueryStringVal("aoe") != null  ? true : false);
  const [magic, setmagic] = useState(getQueryStringVal("magic") != null  ? true : false);
  const [ranged, setranged] = useState(getQueryStringVal("ranged") != null  ? true : false);
  const [melee, setmelee] = useState(getQueryStringVal("melee") != null  ? true : false);
  const [fire, setfire] = useState(getQueryStringVal("fire") != null  ? true : false);
  const [thunder, setthunder] = useState(getQueryStringVal("thunder") != null  ? true : false);
  const [earth, setearth] = useState(getQueryStringVal("earth") != null  ? true : false);
  const [water, setwater] = useState(getQueryStringVal("water") != null  ? true : false);
  const [ice, setice] = useState(getQueryStringVal("ice") != null  ? true : false);
  const [wind, setwind] = useState(getQueryStringVal("wind") != null  ? true : false);
  const [holy, setholy] = useState(getQueryStringVal("holy") != null  ? true : false);
  const [dark, setdark] = useState(getQueryStringVal("dark") != null  ? true : false);
  const [counter, setcounter] = useState(getQueryStringVal("counter") != null  ? true : false);
  const [followup, setfollowup] = useState(getQueryStringVal("followup") != null  ? true : false);
  const [trap, settrap] = useState(getQueryStringVal("trap") != null  ? true : false);
  const [rework, setrework] = useState(getQueryStringVal("rework") != null  ? true : false);
  const [knockback, setknockback] = useState(getQueryStringVal("knockback") != null  ? true : false);

  const [loop, setLoop] = useStateIfMounted(false);
  const [reverse, setReverse] = useState(getQueryStringVal("rev") != null  ? true : false);
  const [searchTerm, setSearchTerm] = useState(getQueryStringVal("search") != null  ? getQueryStringVal("search").toLowerCase() : "");
  const [condFilter, setCondFilter] = useState("");
  const [searchdisplay, setsearchdisplay] = useState(getQueryStringVal("search") != null ? getQueryStringVal("search") : "");
  const [merge, setMerge] = useState(getQueryStringVal("merge") != null  ? true : false);
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


    const [brvsearch, setbrvsearch] = useQueryParam("brv", "");
    const [hpsearch, sethpsearch] = useQueryParam("hp", "");
    const [s1search, sets1search] = useQueryParam("s1", "");
    const [s2search, sets2search] = useQueryParam("s2", "");
    const [aasearch, setaasearch] = useQueryParam("aa", "");
    const [exsearch, setexsearch] = useQueryParam("ex", "");
    const [ldsearch, setldsearch] = useQueryParam("ld", "");
    const [frsearch, setfrsearch] = useQueryParam("fr", "");
    const [burstsearch, setburstsearch] = useQueryParam("burst", "");
    const [call75search, setcall75search] = useQueryParam("call75", "");
    const [callldsearch, setcallldsearch] = useQueryParam("callld", "");
    const [aoesearch, setaoesearch] = useQueryParam("aoe", "");
    const [magicsearch, setmagicsearch] = useQueryParam("magic", "");
    const [rangedsearch, setrangedsearch] = useQueryParam("ranged", "");
    const [meleesearch, setmeleesearch] = useQueryParam("melee", "");
    const [firesearch, setfiresearch] = useQueryParam("fire", "");
    const [thundersearch, setthundersearch] = useQueryParam("thunder", "");
    const [earthsearch, setearthsearch] = useQueryParam("earth", "");
    const [watersearch, setwatersearch] = useQueryParam("water", "");
    const [icesearch, seticesearch] = useQueryParam("ice", "");
    const [windsearch, setwindsearch] = useQueryParam("wind", "");
    const [holysearch, setholysearch] = useQueryParam("holy", "");
    const [darksearch, setdarksearch] = useQueryParam("dark", "");
    const [countersearch, setcountersearch] = useQueryParam("counter", "");
    const [followupsearch, setfollowupsearch] = useQueryParam("followup", "");
    const [trapsearch, settrapsearch] = useQueryParam("trap", "");
    const [reworksearch, setreworksearch] = useQueryParam("rework", "");
    const [knockbacksearch, setknockbacksearch] = useQueryParam("knockback", "");
    const [mergesearch, setMergesearch] = useQueryParam("merge", "");
    const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
    const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
    const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");
    const [Typesearch, setTypesearch] = useQueryParam("Char", "");
    const [JPsearch, setJPSearch] = useQueryParam("JP", "");
    const { protocol, pathname, host } = window.location;
    const query = getQuery();
    const url = `${protocol}//${host}${pathname}?${query.toString()}`;
  
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
    if(merge == false){
    const filterholder = [];

    if (brv === true) {
      const filteredout = rawData.filter(
        (ability) => ability["AbilityRank"] == 1
      );
      filterholder.push(...filteredout);
    }
    if (hp === true) {
      const filteredout = rawData.filter(
        (ability) => ability["AbilityRank"] == 2
      );
      filterholder.push(...filteredout);
    }
    if (s1 === true) {
      const filteredout = rawData.filter(
        (ability) => ability["AbilityRank"] == 3
      );
      filterholder.push(...filteredout);
    }
    if (s2 === true) {
      const filteredout = rawData.filter(
        (ability) => ability["AbilityRank"] == 4
      );
      filterholder.push(...filteredout);
    }
    if (aa === true) {
      const filteredout = rawData.filter(
        (ability) => ability["AbilityRank"] == 5
      );
      filterholder.push(...filteredout);
    }
    if (ex === true) {
      const filteredout = rawData.filter(
        (ability) => ability["AbilityRank"] == 6
      );
      filterholder.push(...filteredout);
    }
    if (fr === true) {
      const filteredout = rawData.filter(
        (ability) => ability["AbilityRank"] == 9
      );
      filterholder.push(...filteredout);
    }
    if (ld === true) {
      const filteredout = rawData.filter(
        (ability) => ability["AbilityRank"] == 7
      );
      filterholder.push(...filteredout);
    }
    if (burst === true) {
      const filteredout = rawData.filter(
        (ability) => ability["AbilityRank"] == 8
      );
      filterholder.push(...filteredout);
    }
    if (call75 === true) {
      const filteredout = rawData.filter(
        (ability) => ability["AbilityRank"] == 20
      );
      filterholder.push(...filteredout);
    }
    if (callld === true) {
      const filteredout = rawData.filter(
        (ability) => ability["AbilityRank"] == 21
      );
      filterholder.push(...filteredout);
    }

    if (aoe === true) {
      const filteredout = rawData.filter(
        (ability) => ability["AOE"] == true
      );
      filterholder.push(...filteredout);
    }
    if (magic === true) {
      const filteredout = rawData.filter(
        (ability) => ability["Magic"] == true
      );
      filterholder.push(...filteredout);
    }
    if (ranged === true) {
      const filteredout = rawData.filter(
        (ability) => ability["Ranged"] == true
      );
      filterholder.push(...filteredout);
    }
    if (melee === true) {
      const filteredout = rawData.filter(
        (ability) => ability["Melee"] == true
      );
      filterholder.push(...filteredout);
    }
    if (fire === true) {
      const filteredout = rawData.filter(
        (ability) => ability["Fire"] == true
      );
      filterholder.push(...filteredout);
    }
    if (thunder === true) {
      const filteredout = rawData.filter(
        (ability) => ability["Thunder"] == true
      );
      filterholder.push(...filteredout);
    }
    if (earth === true) {
      const filteredout = rawData.filter(
        (ability) => ability["Earth"] == true
      );
      filterholder.push(...filteredout);
    }
    if (water === true) {
      const filteredout = rawData.filter(
        (ability) => ability["Water"] == true
      );
      filterholder.push(...filteredout);
    }
    if (ice === true) {
      const filteredout = rawData.filter(
        (ability) => ability["Ice"] == true
      );
      filterholder.push(...filteredout);
    }
    if (wind === true) {
      const filteredout = rawData.filter(
        (ability) => ability["Wind"] == true
      );
      filterholder.push(...filteredout);
    }
    if (holy === true) {
      const filteredout = rawData.filter(
        (ability) => ability["Holy"] == true
      );
      filterholder.push(...filteredout);
    }
    if (dark === true) {
      const filteredout = rawData.filter(
        (ability) => ability["Dark"] == true
      );
      filterholder.push(...filteredout);
    }
    if (counter === true) {
      const filteredout = rawData.filter(
        (ability) => ability["Counter"] == true
      );
      filterholder.push(...filteredout);
    }
    if (followup === true) {
      const filteredout = rawData.filter(
        (ability) => ability["FollowUp"] == true
      );
      filterholder.push(...filteredout);
    }
    if (trap === true) {
      const filteredout = rawData.filter(
        (ability) => ability["Trap"] == true
      );
      filterholder.push(...filteredout);
    }
    if (rework === true) {
      const filteredout = rawData.filter(
        (ability) => ability["GLFlag"] == true
      );
      filterholder.push(...filteredout);
    }
    if (knockback === true) {
      const filteredout = rawData.filter(
        (ability) => ability["KnockBack"] == true
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
        a.AbilityKey - b.AbilityKey :
        b.AbilityKey - a.AbilityKey );
      const searchit = makeUnique.filter((e) =>
      (`${e.AbilityName} ${e.JPName} ${e.Desc.replace(/(<span class=")/gm,"").replace(/(">)/gm,"").replace(/(<\/span>)/gm,"").replace(/(unique)/gm,"").replace(/(values)/gm,"")}`).toLowerCase().includes(searchTerm)
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
  }, [searchTerm,rawData,limits,merge, knockback, rework, aa, fr, followup, trap, counter, brv, hp, s1, s2, ex, ld, burst, call75, callld, aoe, magic, ranged, melee, fire, thunder, earth, water, ice, wind, holy, dark, condFilter, reverse]);


  //marge filter
  useEffect(() => {
    if(merge == true){
      const filterholder = [];
        const charType = {
          AbilityRank: brv == true ? 1 : hp == true ? 2 : s1 == true ? 3 : s2 == true ? 4 : aa == true ? 5 : ex == true ? 6 : ld == true ? 7 : burst == true ? 8 : fr == true ? 9 : call75 == true ? 20 : callld == true ? 21 : undefined,
          AOE: aoe,
          Magic: magic,
          Ranged: ranged,
          Melee: melee,
          Fire: fire,
          Thunder: thunder,
          Earth: earth,
          Water: water,
          Ice: ice,
          Wind: wind,
          Holy: holy,
          Dark: dark,
          Counter: counter,
          FollowUp: followup,
          Trap: trap,
          GLFlag: rework,
          KnockBack: knockback
        }
      const filtermerge = rawData.filter((oneChar) => {
        return Object.entries(charType)
          .filter(entry => entry[1])
          .every(([key, value]) => oneChar[key] === value);
      });

      if (filterholder.length === 0) {
        filterholder.push(...filtermerge);
      }

        const makeUnique = filterholder
        .filter(onlyUnique)
        .sort((a, b) => 
        reverse == false ? 
        a.AbilityKey - b.AbilityKey :
        b.AbilityKey - a.AbilityKey );
      const searchit = makeUnique.filter((e) =>
      (`${e.AbilityName} ${e.JPName} ${e.Desc.replace(/(<span class=")/gm,"").replace(/(">)/gm,"").replace(/(<\/span>)/gm,"").replace(/(unique)/gm,"").replace(/(values)/gm,"")}`).toLowerCase().includes(searchTerm)
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
  }, [merge, searchTerm,rawData,limits,knockback, rework, aa, fr, followup, trap, counter, brv, hp, s1, s2, ex, ld, burst, call75, callld, aoe, magic, ranged, melee, fire, thunder, earth, water, ice, wind, holy, dark, condFilter, reverse]);

  //buttons
  const brvbutton = () => {
    if(brv == false){
      setbrvsearch("true")
      } else {
      setbrvsearch("")
      }
    setbrv((prevValue) => !prevValue);
  };
  const hpbutton = () => {
    if(hp == false){
      sethpsearch("true")
      } else {
      sethpsearch("")
      }
    sethp((prevValue) => !prevValue);
  };
  const s1button = () => {
    if(s1 == false){
      sets1search("true")
      } else {
      sets1search("")
      }
    sets1((prevValue) => !prevValue);
  };
  const s2button = () => {
    if(s2 == false){
      sets2search("true")
      } else {
      sets2search("")
      }
    sets2((prevValue) => !prevValue);
  };
  const aabutton = () => {
    if(aa == false){
      setaasearch("true")
      } else {
      setaasearch("")
      }
    setaa((prevValue) => !prevValue);
  };
  const exbutton = () => {
    if(ex == false){
      setexsearch("true")
      } else {
      setexsearch("")
      }
    setex((prevValue) => !prevValue);
  };
  const ldbutton = () => {
    if(ld == false){
      setldsearch("true")
      } else {
      setldsearch("")
      }
    setld((prevValue) => !prevValue);
  };
  const frbutton = () => {
    if(frsearch == false){
      setfrsearch("true")
      } else {
      setfrsearch("")
      }
    setfr((prevValue) => !prevValue);
  };
  const burstbutton = () => {
    if(burst == false){
      setburstsearch("true")
      } else {
      setburstsearch("")
      }
    setburst((prevValue) => !prevValue);
  };
  const call75button = () => {
    if(call75 == false){
      setcall75search("true")
      } else {
      setcall75search("")
      }
    setcall75((prevValue) => !prevValue);
  };
  const callldbutton = () => {
    if(callld == false){
      setcallldsearch("true")
      } else {
      setcallldsearch("")
      }
    setcallld((prevValue) => !prevValue);
  };
  const aoebutton = () => {
    if(aoe == false){
      setaoesearch("true")
      } else {
      setaoesearch("")
      }
    setaoe((prevValue) => !prevValue);
  };
  const magicbutton = () => {
    if(magic == false){
      setmagicsearch("true")
      } else {
      setmagicsearch("")
      }
    setmagic((prevValue) => !prevValue);
  };
  const rangedbutton = () => {
    if(ranged == false){
      setrangedsearch("true")
      } else {
      setrangedsearch("")
      }
    setranged((prevValue) => !prevValue);
  };
  const meleebutton = () => {
    if(melee == false){
      setmeleesearch("true")
      } else {
      setmeleesearch("")
      }
    setmelee((prevValue) => !prevValue);
  };
  const firebutton = () => {
    if(fire == false){
      setfiresearch("true")
      } else {
      setfiresearch("")
      }
    setfire((prevValue) => !prevValue);
  };
  const icebutton = () => {
    if(ice == false){
      seticesearch("true")
      } else {
      seticesearch("")
      }
    setice((prevValue) => !prevValue);
  };
  const thunderbutton = () => {
    if(thunder == false){
      setthundersearch("true")
      } else {
      setthundersearch("")
      }
    setthunder((prevValue) => !prevValue);
  };
  const earthbutton = () => {
    if(earth == false){
      setearthsearch("true")
      } else {
      setearthsearch("")
      }
    setearth((prevValue) => !prevValue);
  };
  const waterbutton = () => {
    if(water == false){
      setwatersearch("true")
      } else {
      setwatersearch("")
      }
    setwater((prevValue) => !prevValue);
  };
  const windbutton = () => {
    if(wind == false){
      setwindsearch("true")
      } else {
      setwindsearch("")
      }
    setwind((prevValue) => !prevValue);
  };
  const holybutton = () => {
    if(holy == false){
      setholysearch("true")
      } else {
      setholysearch("")
      }
    setholy((prevValue) => !prevValue);
  };
  const darkbutton = () => {
    if(dark == false){
      setdarksearch("true")
      } else {
      setdarksearch("")
      }
    setdark((prevValue) => !prevValue);
  };
  const trapbutton = () => {
    if(trap == false){
      settrapsearch("true")
      } else {
      settrapsearch("")
      }
    settrap((prevValue) => !prevValue);
  };
  const counterbutton = () => {
    if(counter == false){
      setcountersearch("true")
      } else {
      setcountersearch("")
      }
    setcounter((prevValue) => !prevValue);
  };
  const followupbutton = () => {
    if(followup == false){
      setfollowupsearch("true")
      } else {
      setfollowupsearch("")
      }
    setfollowup((prevValue) => !prevValue);
  };
  const reworkbutton = () => {
    if(rework == false){
      setreworksearch("true")
      } else {
      setreworksearch("")
      }
    setrework((prevValue) => !prevValue);
  };
  const knockbackbutton = () => {
    if(knockback == false){
      setknockbacksearch("true")
      } else {
      setknockbacksearch("")
      }
    setknockback((prevValue) => !prevValue);
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

  const togglemerge = () => {
    if (merge == false) {
      setMergesearch("true")
    } else{
      setMergesearch("")
    }
    setMerge((prevValue) => !prevValue);
  }

    //type selector
    const CondSelect = (e) => {
      if (e !== null) {
        setTypesearch(e.label)
        setCondFilter(e.id);
      } else {
        setCondFilter("");
        setTypesearch('')
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
        <>Displaying <span className="subtextgold">${newlimits}</span> of <span className="subtextgold"> {searchResults.length}</span> {banerDisplayTerm} </>
      );
    } else {
      setDisplayBanner(
        <>Displaying <span className="subtextgold">{searchResults.length}</span> of <span className="subtextgold"> {searchResults.length}</span> {banerDisplayTerm} </>
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

  const resetbutton = () =>{
    setclearFilter(true);
    setrework(false)
    setReverse(false);
    setbrv(false);
    sethp(false);
    sets1(false);
    sets2(false);
    setaa(false);
    setex(false);
    setld(false);
    setfr(false);
    setburst(false);
    setcall75(false);
    setcallld(false);
    setaoe(false);
    setmagic(false);
    setranged(false);
    setmelee(false);
    setfire(false);
    setice(false);
    setthunder(false);
    setearth(false);
    setwater(false);
    setholy(false);
    setdark(false);
    setwind(false);
    settrap(false);
    setcounter(false);
    setfollowup(false);
    setknockback(false);
    setMerge(false)

    setbrvsearch("")
    sethpsearch("")
    sets1search("")
    sets2search("")
    setaasearch("")
    setexsearch("")
    setldsearch("")
    setfrsearch("")
    setburstsearch("")
    setcall75search("")
    setcallldsearch("")
    setaoesearch("")
    setmagicsearch("")
    setrangedsearch("")
    setmeleesearch("")
    setfiresearch("")
    setthundersearch("")
    setearthsearch("")
    setwatersearch("")
    seticesearch("")
    setwindsearch("")
    setholysearch("")
    setdarksearch("")
    setcountersearch("")
    setfollowupsearch("")
    settrapsearch("")
    setreworksearch("")
    setknockbacksearch("")
    setReversesearch("")
    setTEXTsearch("")
    setTypesearch("")

    setMergesearch("")
    setsearchdisplay("");
    setSearchTerm("");
    setCondFilter("")
    setTimeout(() => setclearFilter(false), 1000);
  }

  const listabilities = listDisplay;

    return (
      <div className="wrapper">
        <Helmet>
          <title>Abilities - Dissidia Compendium</title>
          <meta property="og:site_name" content="Dissidia Compendium"/>
          <meta property="og:type" content="website" />
          <meta name="description" content="Abilities Search"/>
          <meta name="twitter:title" content="Abilities Search"/>
          <meta name="twitter:description" content="Abilities Search"/>
          <meta property="og:title" content="Abilities Search"/>
          <meta property="og:description" content="Abilities Search"/>
          <meta property="og:url" content="https://dissidiacompendium.com/search/abilities"/>
        </Helmet>
            <div className="content">
              <h1  >Abilities</h1>
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
                    placeholder="Ability Name / Effects"
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
                        <Tippy content="Magic BRV Damage">
                        <li className={`${magic ? "filteractive": "filterinactive"} buffbutton magictypebutton`} onClick={magicbutton}></li> 
                        </Tippy>
                        <Tippy content="Melee BRV Damage">
                        <li className={`${melee ? "filteractive": "filterinactive"} buffbutton meleetypebutton`} onClick={meleebutton}></li>
                        </Tippy>
                        <Tippy content="Ranged BRV Damage">
                        <li className={`${ranged ? "filteractive": "filterinactive"} buffbutton rangedtypebutton`} onClick={rangedbutton}></li>
                        </Tippy>
                      </ul>
                      <br/>
                    <ul className="bufftypes">
                      <Tippy content="Fire BRV Damage">
                        <li className={`${fire ? "filteractive": "filterinactive"} spheresbutton Firebutton`} onClick={firebutton}></li>
                        </Tippy>
                        <Tippy content="Ice BRV Damage">
                        <li className={`${ice ? "filteractive": "filterinactive"} spheresbutton Icebutton`} onClick={icebutton}></li>
                        </Tippy>
                        <Tippy content="Thunder BRV Damage">
                        <li className={`${thunder ? "filteractive": "filterinactive"} spheresbutton Thunderbutton`} onClick={thunderbutton}></li>
                        </Tippy>
                        <Tippy content="Earth BRV Damage">
                        <li className={`${earth ? "filteractive": "filterinactive"} spheresbutton Earthbutton`} onClick={earthbutton}></li>
                        </Tippy>
                        <Tippy content="Water BRV Damage">
                        <li className={`${water ? "filteractive": "filterinactive"} spheresbutton Waterbutton`} onClick={waterbutton}></li>   
                        </Tippy>
                        <Tippy content="Wind BRV Damage">
                        <li className={`${wind ? "filteractive": "filterinactive"} spheresbutton Windbutton`} onClick={windbutton}></li>
                        </Tippy>
                        <Tippy content="Holy BRV Damage">
                        <li className={`${holy ? "filteractive": "filterinactive"} spheresbutton Holybutton`} onClick={holybutton}></li>
                        </Tippy>
                        <Tippy content="Dark BRV Damage">
                        <li className={`${dark ? "filteractive": "filterinactive"} spheresbutton Darkbutton`} onClick={darkbutton}></li>
                        </Tippy>
                      </ul>  
                      <br/>
                      <ul className="bufftypes">
                        <Tippy content="Knock Back Attacks">
                        <li className={`${knockback ? "filteractive": "filterinactive"} buffbutton knockbackbutton`} onClick={knockbackbutton}></li>
                        </Tippy>
                        <Tippy content="Group Attacks">
                        <li className={`${aoe ? "filteractive": "filterinactive"} buffbutton aoetypebutton`} onClick={aoebutton}></li>
                        </Tippy>
                        <Tippy content="Counter Attacks">
                        <li className={`${counter ? "filteractive": "filterinactive"} buffbutton countertypebutton`} onClick={counterbutton}></li>
                        </Tippy>
                        <Tippy content="Follow Up Attacks">
                        <li className={`${followup ? "filteractive": "filterinactive"} buffbutton followuptypebutton`} onClick={followupbutton}></li>
                        </Tippy>
                        <Tippy content="Trap Attacks">
                        <li className={`${trap ? "filteractive": "filterinactive"} buffbutton traptypebutton`} onClick={trapbutton}></li>
                        </Tippy>
                        <Tippy content="Attacks with active JP reworks">
                        <li className={`${rework ? "filteractive": "filterinactive"} buffbutton reworkbutton`} onClick={reworkbutton}></li>
                        </Tippy>
                      </ul>                                  
                      <div className="similarbanner">Ability Tree</div>
                      <ul className="refineabilities">
                        <Tippy content="Burst Attacks">
                        <li className={`${burst ? "filteractive": "filterinactive"} buffbutton wpbtbutton`} onClick={burstbutton}></li>
                        </Tippy>
                        <Tippy content="FR Attacks">
                        <li className={`${fr ? "filteractive": "filterinactive"} buffbutton wpfrbutton`} onClick={frbutton}></li>
                        </Tippy>
                        <Tippy content="Crystal Lv75 Call Attacks">
                        <li className={`${call75 ? "filteractive": "filterinactive"} buffbutton call1button`} onClick={call75button}></li>
                        </Tippy>
                        <Tippy content="LD Call Attacks">
                        <li className={`${callld ? "filteractive": "filterinactive"} buffbutton call2button`} onClick={callldbutton}></li>
                        </Tippy>
                        <Tippy content="LD Attacks">
                        <li className={`${ld ? "filteractive": "filterinactive"} buffbutton wpldbutton`} onClick={ldbutton}></li>
                        </Tippy>
                        <Tippy content="EX Attacks">
                        <li className={`${ex ? "filteractive": "filterinactive"} buffbutton  wpexbutton`} onClick={exbutton}></li>
                        </Tippy>
                        <Tippy content="AA Attacks">
                        <li className={`${aa ? "filteractive": "filterinactive"} buffbutton abuffButton`} onClick={aabutton}></li>
                        </Tippy>
                        <Tippy content="Crystal Lv20 Attacks">
                        <li className={`${s2 ? "filteractive": "filterinactive"} buffbutton cl20button`} onClick={s2button}></li>
                        </Tippy>
                        <Tippy content="Starting Attacks">
                        <li className={`${s1 ? "filteractive": "filterinactive"} buffbutton startingButton`} onClick={s1button}></li>
                        </Tippy>
                        <Tippy content="HP Attacks">
                        <li className={`${hp ? "filteractive": "filterinactive"} buffbutton hpplusattackiconbutton`} onClick={hpbutton}></li>
                        </Tippy>
                        <Tippy content="BRV Attacks">
                        <li className={`${brv ? "filteractive": "filterinactive"} buffbutton brvattackiconbutton`} onClick={brvbutton}></li>
                        </Tippy>
                      </ul>   
                      <div className="similarbanner">Refine</div>
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
                              placeholder="Ability Name / Effects"
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
                  <li className={"active"} ><span className="gemselected"/>Abilities</li>
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
              {listabilities.length > 0 ?  (
              listabilities.map(abilities =>(
                <AbilitiesFormatting key={abilities.AbilityKey} match={abilities} ProcessedBuffs={ProcessedBuffs} jptoggledata={jptoggledata}/>
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