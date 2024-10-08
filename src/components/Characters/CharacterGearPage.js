import React, { useState, useEffect } from 'react';
import Tippy from '../TippyDefaults'
import { useStateIfMounted } from "use-state-if-mounted";
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { FaUndoAlt } from 'react-icons/fa'
import { getQuery, getQueryStringVal, useQueryParam } from '../URLParams'
import EquipmentPassivesFormatting from '../Gear/EquipmentPassivesFormatting';
import { LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';

function CharacterGearPage({
  equipment_passive_ability,
  ver,
  loc,
  newcompare,
  ProcessedCharacters,
  formatting,
  master_index,
  scrollPosition 
}){

  const rawData = Object.values(equipment_passive_ability && equipment_passive_ability.sort((a, b) => b.ranked - a.ranked))

  const banerDisplayTerm = "equipment passive abilities";

  const startinglimit = 9999

  const [clearFilter, setclearFilter] = useStateIfMounted(false);

  //show icons

  const [showBTPlus, setshowBTPlus] = useStateIfMounted(false);
  const [showBT, setshowBT] = useStateIfMounted(false);
  const [showFR, setshowFR] = useStateIfMounted(false);
  const [showEXPlus, setshowEXPlus] = useStateIfMounted(false);
  const [showLD, setshowLD] = useStateIfMounted(false);
  const [showEX, setshowEX] = useStateIfMounted(false);
  const [showDark, setshowDark] = useStateIfMounted(false);
  const [show35, setshow35] = useStateIfMounted(false);
  const [showNT, setshowNT] = useStateIfMounted(false);
  const [showWOI, setshowWOI] = useStateIfMounted(false);
  const [show15, setshow15] = useStateIfMounted(false);
  const [show4, setshow4] = useStateIfMounted(false);

  const [show7APlus, setshow7APlus] = useStateIfMounted(false);
  const [show7A, setshow7A] = useStateIfMounted(false);
  const [showHGPlus, setshowHGPlus] = useStateIfMounted(false);
  const [showHG, setshowHG] = useStateIfMounted(false);
  const [show35a, setshow35a] = useStateIfMounted(false);
  const [show4a, setshow4a] = useStateIfMounted(false);
  const [showbloom, setshowbloom] = useStateIfMounted(false);

  useEffect(() => {
    if (Object.values(equipment_passive_ability).some(self => self.gear_tag == "wpbtplus")) {
      setshowBTPlus(true)
    }
    if (Object.values(equipment_passive_ability).some(self => self.gear_tag == "wpbt")) {
      setshowBT(true)
    }
    if (Object.values(equipment_passive_ability).some(self => self.gear_tag == "wpfr")) {
      setshowFR(true)
    }
    if (Object.values(equipment_passive_ability).some(self => self.gear_tag == "wpexplus")) {
      setshowEXPlus(true)
    }
    if (Object.values(equipment_passive_ability).some(self => self.gear_tag == "wpld")) {
      setshowLD(true)
    }
    if (Object.values(equipment_passive_ability).some(self => self.gear_tag == "wpex")) {
      setshowEX(true)
    }
    if (Object.values(equipment_passive_ability).some(self => self.gear_tag == "wpdark")) {
      setshowDark(true)
    }
    if (Object.values(equipment_passive_ability).some(self => self.gear_tag == "wp35")) {
      setshow35(true)
    }
    if (Object.values(equipment_passive_ability).some(self => self.gear_tag == "wpnt")) {
      setshowNT(true)
    }
    if (Object.values(equipment_passive_ability).some(self => self.gear_tag == "wpwoi")) {
      setshowWOI(true)
    }
    if (Object.values(equipment_passive_ability).some(self => self.gear_tag == "wp15")) {
      setshow15(true)
    }
    if (Object.values(equipment_passive_ability).some(self => self.gear_tag == "wp4w")) {
      setshow4(true)
    }

    if (Object.values(equipment_passive_ability).some(self => self.gear_tag == "arm7aplus")) {
      setshow7APlus(true)
    }
    if (Object.values(equipment_passive_ability).some(self => self.gear_tag == "arm7a")) {
      setshow7A(true)
    }
    if (Object.values(equipment_passive_ability).some(self => self.gear_tag == "armhgplus")) {
      setshowHGPlus(true)
    }
    if (Object.values(equipment_passive_ability).some(self => self.gear_tag == "armhg")) {
      setshowHG(true)
    }
    if (Object.values(equipment_passive_ability).some(self => self.gear_tag == "arm35a")) {
      setshow35a(true)
    }
    if (Object.values(equipment_passive_ability).some(self => self.gear_tag == "arm4a")) {
      setshow4a(true)
    }
    if (Object.values(equipment_passive_ability).some(self => self.gear_tag == "armbloom")) {
      setshowbloom(true)
    }
    // eslint-disable-next-line
  }, [equipment_passive_ability])


  const [activeBTPlussearch, setactiveBTPlussearch] = useQueryParam("BTPlus", "");
  const [activeBTsearch, setactiveBTsearch] = useQueryParam("BT", "");
  const [activeFRsearch, setactiveFRsearch] = useQueryParam("FR", "");
  const [activeEXPlussearch, setactiveEXPlussearch] = useQueryParam("EXPlus", "");
  const [activeLDsearch, setactiveLDsearch] = useQueryParam("LD", "");
  const [activeEXsearch, setactiveEXsearch] = useQueryParam("EX", "");
  const [activeDarksearch, setactiveDarksearch] = useQueryParam("Dark", "");
  const [active35search, setactive35search] = useQueryParam("35", "");
  const [activeNTsearch, setactiveNTsearch] = useQueryParam("NT", "");
  const [activeWOIsearch, setactiveWOIsearch] = useQueryParam("WOI", "");
  const [active15search, setactive15search] = useQueryParam("15", "");
  const [active4search, setactive4search] = useQueryParam("4", "");

  const [active7APlussearch, setactive7APlussearch] = useQueryParam("7APlus", "");
  const [active7Asearch, setactive7Asearch] = useQueryParam("7A", "");
  const [activeHGPlussearch, setactiveHGPlussearch] = useQueryParam("HGPlus", "");
  const [activeHGPsearch, setactiveHGsearch] = useQueryParam("HG", "");
  const [active35asearch, setactive35asearch] = useQueryParam("35a", "");
  const [active4asearch, setactive4asearch] = useQueryParam("4a", "");
  const [activebloomsearch, setactivebloomsearch] = useQueryParam("bloom", "");

  const [activeBTPlus, setactiveBTPlus] = useStateIfMounted(getQueryStringVal("BTPlus") != null ? true : false);
  const [activeBT, setactiveBT] = useStateIfMounted(getQueryStringVal("BT") != null ? true : false);
  const [activeFR, setactiveFR] = useStateIfMounted(getQueryStringVal("FR") != null ? true : false);
  const [activeEXPlus, setactiveEXPlus] = useStateIfMounted(getQueryStringVal("EXPlus") != null ? true : false);
  const [activeLD, setactiveLD] = useStateIfMounted(getQueryStringVal("LD") != null ? true : false);
  const [activeEX, setactiveEX] = useStateIfMounted(getQueryStringVal("EX") != null ? true : false);
  const [activeDark, setactiveDark] = useStateIfMounted(getQueryStringVal("Dark") != null ? true : false);
  const [active35, setactive35] = useStateIfMounted(getQueryStringVal("35") != null ? true : false);
  const [activeNT, setactiveNT] = useStateIfMounted(getQueryStringVal("NT") != null ? true : false);
  const [activeWOI, setactiveWOI] = useStateIfMounted(getQueryStringVal("WOI") != null ? true : false);
  const [active15, setactive15] = useStateIfMounted(getQueryStringVal("15") != null ? true : false);
  const [active4, setactive4] = useStateIfMounted(getQueryStringVal("4") != null ? true : false);

  const [active7APlus, setactive7APlus] = useStateIfMounted(getQueryStringVal("7APlus") != null ? true : false);
  const [active7A, setactive7A] = useStateIfMounted(getQueryStringVal("7A") != null ? true : false);
  const [activeHGPlus, setactiveHGPlus] = useStateIfMounted(getQueryStringVal("HGPlus") != null ? true : false);
  const [activeHG, setactiveHG] = useStateIfMounted(getQueryStringVal("HG") != null ? true : false);
  const [active35a, setactive35a] = useStateIfMounted(getQueryStringVal("35a") != null ? true : false);
  const [active4a, setactive4a] = useStateIfMounted(getQueryStringVal("4a") != null ? true : false);
  const [activebloom, setactivebloom] = useStateIfMounted(getQueryStringVal("bloom") != null ? true : false);

  useEffect(() => {
    if (activeBTPlus == false) {
      setactiveBTPlussearch("")
    } else {
      setactiveBTPlussearch("true")
    }
    if (activeBT == false) {
      setactiveBTsearch("")
    } else {
      setactiveBTsearch("true")
    }
    if (activeFR == false) {
      setactiveFRsearch("")
    } else {
      setactiveFRsearch("true")
    }
    if (activeEXPlus == false) {
      setactiveEXPlussearch("")
    } else {
      setactiveEXPlussearch("true")
    }
    if (activeLD == false) {
      setactiveLDsearch("")
    } else {
      setactiveLDsearch("true")
    }
    if (activeEX == false) {
      setactiveEXsearch("")
    } else {
      setactiveEXsearch("true")
    }
    if (activeDark == false) {
      setactiveDarksearch("")
    } else {
      setactiveDarksearch("true")
    }
    if (active35 == false) {
      setactive35search("")
    } else {
      setactive35search("true")
    }
    if (activeNT == false) {
      setactiveNTsearch("")
    } else {
      setactiveNTsearch("true")
    }
    if (activeWOI == false) {
      setactiveWOIsearch("")
    } else {
      setactiveWOIsearch("true")
    }
    if (active15 == false) {
      setactive15search("")
    } else {
      setactive15search("true")
    }
    if (active4 == false) {
      setactive4search("")
    } else {
      setactive4search("true")
    }

    if (active7APlus == false) {
      setactive7APlussearch("")
    } else {
      setactive7APlussearch("true")
    }
    if (active7A == false) {
      setactive7Asearch("")
    } else {
      setactive7Asearch("true")
    }
    if (activeHGPlus == false) {
      setactiveHGPlussearch("")
    } else {
      setactiveHGPlussearch("true")
    }
    if (activeHG == false) {
      setactiveHGsearch("")
    } else {
      setactiveHGsearch("true")
    }
    if (active35a == false) {
      setactive35asearch("")
    } else {
      setactive35asearch("true")
    }
    if (active4a == false) {
      setactive4asearch("")
    } else {
      setactive4asearch("true")
    }
    if (activebloom == false) {
      setactivebloomsearch("")
    } else {
      setactivebloomsearch("true")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activebloom, active4a, active35a, activeHG, activeHGPlus, active7A, active7APlus, active4, activeBTPlus, activeBT, activeFR, activeEXPlus, activeEX, activeLD, activeDark, active35, activeNT, activeWOI, active15])


  const clear_filter=()=>{
    setactiveBTPlus(false)
    setactiveBT(false)
    setactiveFR(false)
    setactiveEXPlus(false)
    setactiveLD(false)
    setactiveEX(false)
    setactiveDark(false)
    setactive35(false)
    setactiveNT(false)
    setactiveWOI(false)
    setactive15(false)
    setactive4(false)
    setactive7APlus(false)
    setactive7A(false)
    setactiveHGPlus(false)
    setactiveHG(false)
    setactive35a(false)
    setactive4a(false)
    setactivebloom(false)
  }
  const BTPlusbutton = () => {
    if (activeBTPlus == false) {
      clear_filter()
      setactiveBTPlus(true)
    } else {
      clear_filter()
    }
  }

  const BTbutton = () => {
    if (activeBT == false) {
      clear_filter()
      setactiveBT(true)
    } else {
      clear_filter()
    }
  }

  const FRbutton = () => {
    if (activeFR == false) {
      clear_filter()
      setactiveFR(true)
    } else {
      clear_filter()
    }
  }

  const EXPlusbutton = () => {
    if (activeEXPlus == false) {
      clear_filter()
      setactiveEXPlus(true)
    } else {
      clear_filter()
    }
  }

  const LDbutton = () => {
    if (activeLD == false) {
      clear_filter()
      setactiveLD(true)
    } else {
      clear_filter()
    }
  }

  const EXbutton = () => {
    if (activeEX == false) {
      clear_filter()
      setactiveEX(true)
    } else {
      clear_filter()
    }
  }

  const Darkbutton = () => {
    if (activeDark == false) {
      clear_filter()
      setactiveDark(true)
    } else {
      clear_filter()
    }
  }
  const _35button = () => {
    if (active35 == false) {
      clear_filter()
      setactive35(true)
    } else {
      clear_filter()
    }
  }
  const NTbutton = () => {
    if (activeNT == false) {
      clear_filter()
      setactiveNT(true)
    } else {
      clear_filter()
    }
  }
  const WOIbutton = () => {
    if (activeWOI == false) {
      clear_filter()
      setactiveWOI(true)
    } else {
      clear_filter()
    }
  }
  const _15button = () => {
    if (active15 == false) {
      clear_filter()
      setactive15(true)
    } else {
      clear_filter()
    }
  }
  const _4button = () => {
    if (active15 == false) {
      clear_filter()
      setactive4(true)
    } else {
      clear_filter()
    }
  }

  const _7APlusbutton = () => {
    if (active7APlus == false) {
      clear_filter()
      setactive7APlus(true)
    } else {
      clear_filter()
    }
  }
  const _7Abutton = () => {
    if (active7A == false) {
      clear_filter()
      setactive7A(true)
    } else {
      clear_filter()
    }
  }

  const HGPlusbutton = () => {
    if (activeHGPlus == false) {
      clear_filter()
      setactiveHGPlus(true)
    } else {
      clear_filter()
    }
  }

  const HGbutton = () => {
    if (activeHG == false) {
      clear_filter()
      setactiveHG(true)
    } else {
      clear_filter()
    }
  }
  const _35abutton = () => {
    if (active35a == false) {
      clear_filter()
      setactive35a(true)
    } else {
      clear_filter()
    }
  }
  const _4abutton = () => {
    if (active4a == false) {
      clear_filter()
      setactive4a(true)
    } else {
      clear_filter()
    }
  }
  const bloombutton = () => {
    if (activebloom == false) {
      clear_filter()
      setactivebloom(true)
    } else {
      clear_filter()
    }
  }

  const [loop, setLoop] = useStateIfMounted(false);
  const [reverse, setReverse] = useState(getQueryStringVal("rev") != null ? true : false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchdisplay, setsearchdisplay] = useState("");
  const [condFilter, setCondFilter] = useState("");
  const [condFilter2, setCondFilter2] = useState("");
  const [condFilter3, setCondFilter3] = useState("");
  const [condFilter4, setCondFilter4] = useState("");
  const [filterResults, setFilterResults] = useState(rawData);
  const [searchResults, setSearchResults] = useState(rawData);
  const [limits, setLimits] = useState(startinglimit);
  const [listDisplay, setListDisplay] = useState(
    rawData && rawData.slice(0, startinglimit)
  );
  const [listLength, setListLength] = useState(listDisplay.length);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [displayBanner, setDisplayBanner] = useState(
    `Displaying ${listLength} of ${rawData.length} ${banerDisplayTerm}`
  );
  const { protocol, pathname, host } = window.location;
  const query = getQuery();
  const url = `${protocol}//${host}${pathname}?${query.toString()}`
  const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
  const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
  const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");


  //button toogle
  useEffect(() => {
    if (reverse == true) {
      setReversesearch("true")
    } else {
      setReversesearch("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Reversesearch, setReverse, reverse])

  const reversebutton = () => {
    setLoop(true);
    setReverse((prevValue) => !prevValue);
    setTimeout(() => setLoop(false), 1000);
  };

  useEffect(() => {
    //search params
    if (getQueryStringVal("search") != null) {
      setSearchTerm(getQueryStringVal("search") != null ? getQueryStringVal("search").toLowerCase() : "")
      setTEXTsearch(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
      setsearchdisplay(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
    }
  }, [setTEXTsearch, setFiltersearch])

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
        `Displaying ${newlimits} of ${searchResults.length} ${banerDisplayTerm} `
      );
    } else {
      setDisplayBanner(
        `Displaying ${searchResults.length} of ${searchResults.length} ${banerDisplayTerm} `
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

  //filter
  useEffect(() => {
    const filterholder = [];

    //weapons
    if (activeBTPlus == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.gear_tag == "wpbtplus"
      );
      filterholder.push(...filteredout);
    }

    if (activeBT == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.gear_tag == "wpbt"
      );
      filterholder.push(...filteredout);
    }

    if (activeFR == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.gear_tag == "wpfr"
      );
      filterholder.push(...filteredout);
    }

    if (activeEXPlus == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.gear_tag == "wpexplus"
      );
      filterholder.push(...filteredout);
    }

    if (activeLD == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.gear_tag == "wpld"
      );
      filterholder.push(...filteredout);
    }

    if (activeEX == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.gear_tag == "wpex"
      );
      filterholder.push(...filteredout);
    }

    if (activeDark == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.gear_tag == "wpdark"
      );
      filterholder.push(...filteredout);
    }

    if (active35 == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.gear_tag == "wp35"
      );
      filterholder.push(...filteredout);
    }

    if (activeNT == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.gear_tag == "wpnt"
      );
      filterholder.push(...filteredout);
    }

    if (activeWOI == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.gear_tag == "wpwoi"
      );
      filterholder.push(...filteredout);
    }

    if (active15 == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.gear_tag == "wp15"
      );
      filterholder.push(...filteredout);
    }

    if (active4 == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.gear_tag == "wp4w"
      );
      filterholder.push(...filteredout);
    }

    //armor

    if (active7APlus == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.gear_tag == "arm7aplus"
      );
      filterholder.push(...filteredout);
    }

    if (active7A == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.gear_tag == "arm7a"
      );
      filterholder.push(...filteredout);
    }

    if (activeHGPlus == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.gear_tag == "armhgplus"
      );
      filterholder.push(...filteredout);
    }

    if (activeHG == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.gear_tag == "armhg"
      );
      filterholder.push(...filteredout);
    }

    if (active35a == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.gear_tag == "arm35a"
      );
      filterholder.push(...filteredout);
    }

    if (active4a == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.gear_tag == "arm4a"
      );
      filterholder.push(...filteredout);
    }

    if (activebloom == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.gear_tag == "armbloom"
      );
      filterholder.push(...filteredout);
    }

    if (filterholder.length === 0) {
      filterholder.push(...rawData);
    }

    const makeUnique = filterholder.filter(onlyUnique)
      .sort((a, b) =>
        reverse === false ?
          b.ranked - a.ranked :
          a.ranked - b.ranked);
    const searchit = makeUnique.filter((gear) =>
      (`${ver == "GL" ? gear.passives && gear.passives.map(self => ` ${self.jpname}`) : ""} ${gear.passives && gear.passives.map(self => ` ${self.name}`)} ${gear.name} ${ver == "JP" ? gear.glname : gear.jpname} ${ver == "JP" ? gear.passives && gear.passives.map(self => ` ${self.glname}`) : ""} - #${gear.equip_id}`).toLowerCase().includes(searchTerm)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activebloom, active4a, active35a, activeHG, activeHGPlus, active7A, active7APlus, active4, active15, activeWOI, activeNT, active35, activeDark, activeLD, activeEX, activeEXPlus, activeFR, activeBT, activeBTPlus, searchTerm, clearFilter, condFilter, condFilter2, condFilter3, condFilter4, reverse]);


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
  const resetbutton = () => {
    setclearFilter(true);
    setReverse(false)
    setactiveBTPlus(false)
    setactiveBT(false)
    setactiveEXPlus(false)
    setactiveLD(false)
    setactiveEX(false)
    setactiveDark(false)
    setactive35(false)
    setactiveNT(false)
    setactiveWOI(false)
    setactive15(false)
    setactive4(false)

    setactive7APlus(false)
    setactive7A(false)
    setactiveHGPlus(false)
    setactiveHG(false)
    setactive35a(false)
    setactive4a(false)
    setactivebloom(false)

    setReversesearch("")
    setTEXTsearch("")
    setsearchdisplay("");
    setSearchTerm("");
    setCondFilter("")
    setCondFilter2("")
    setCondFilter3("")
    setCondFilter4("")
    setTimeout(() => setclearFilter(false), 1000);
  }


  const listPassives = listDisplay;

  if (equipment_passive_ability.length == 0) {
    return (
      <div className='characterpageholder'>
        No Data
      </div>
    )
  } else {
    return (
      <div>
        <div className="filterholder noselect" id={"showfilteren"}>
          <div className="similarbanner">Subcategories</div>
          <div className="filterholderflair">
            <ul className='bufftypes'>
              {showBTPlus == true ?
                <Tippy content="BT+ Weapon">
                  <li onClick={BTPlusbutton} className={`${activeBTPlus == true ? "filteractive" : "filterinactive"} buffbutton wpbtplusbutton`}>
                  </li>
                </Tippy>
                : ""}
              {showBT == true ?
                <Tippy content="BT Weapon">
                  <li onClick={BTbutton} className={`${activeBT == true ? "filteractive" : "filterinactive"} buffbutton wpbtbutton`}>
                  </li>
                </Tippy>
                : ""}
              {showFR == true ?
                <Tippy content="FR Weapon">
                  <li onClick={FRbutton} className={`${activeFR == true ? "filteractive" : "filterinactive"} buffbutton wpfrbutton`}>
                  </li>
                </Tippy>
                : ""}
              {showEXPlus == true ?
                <Tippy content="EX Weapon">
                  <li onClick={EXPlusbutton} className={`${activeEXPlus == true ? "filteractive" : "filterinactive"} buffbutton wpexplusbutton`}>
                  </li>
                </Tippy>
                : ""}
              {showLD == true ?
                <Tippy content="LD Weapon">
                  <li onClick={LDbutton} className={`${activeLD == true ? "filteractive" : "filterinactive"} buffbutton wpldbutton`}>
                  </li>
                </Tippy>
                : ""}
              {showEX == true ?
                <Tippy content="EX+ Weapon">
                  <li onClick={EXbutton} className={`${activeEX == true ? "filteractive" : "filterinactive"} buffbutton wpexbutton`}>
                  </li>
                </Tippy>
                : ""}
              {showDark == true ?
                <Tippy content="Dark Weapon">
                  <li onClick={Darkbutton} className={`${activeDark == true ? "filteractive" : "filterinactive"} buffbutton wpdarkbutton`}>
                  </li>
                </Tippy>
                : ""}
              {show35 == true ?
                <Tippy content="35CP Weapon">
                  <li onClick={_35button} className={`${active35 == true ? "filteractive" : "filterinactive"} buffbutton wp35button`}>
                  </li>
                </Tippy>
                : ""}
              {showNT == true ?
                <Tippy content="NT Weapon">
                  <li onClick={NTbutton} className={`${activeNT == true ? "filteractive" : "filterinactive"} buffbutton wpntbutton`}>
                  </li>
                </Tippy>
                : ""}
              {showWOI == true ?
                <Tippy content="World of Illusions Weapon">
                  <li onClick={WOIbutton} className={`${activeWOI == true ? "filteractive" : "filterinactive"} buffbutton wpwoibutton`}>
                  </li>
                </Tippy>
                : ""}
              {show15 == true ?
                <Tippy content="15CP Weapon">
                  <li onClick={_15button} className={`${active15 == true ? "filteractive" : "filterinactive"} buffbutton wp15button`}>
                  </li>
                </Tippy>
                : ""}
              {show4 == true ?
                <Tippy content="4★ Weapon">
                  <li onClick={_4button} className={`${active4 == true ? "filteractive" : "filterinactive"} buffbutton wp4wbutton`}>
                  </li>
                </Tippy>
                : ""}
              <br />
              {show7APlus == true ?
                <Tippy content="7★+ Armor">
                  <li onClick={_7APlusbutton} className={`${active7APlus == true ? "filteractive" : "filterinactive"} buffbutton arm7aplusbutton`}>
                  </li>
                </Tippy>
                : ""}
              {show7A == true ?
                <Tippy content="7★ Armor">
                  <li onClick={_7Abutton} className={`${active7A == true ? "filteractive" : "filterinactive"} buffbutton arm7abutton`}>
                  </li>
                </Tippy>
                : ""}
              {showHGPlus == true ?
                <Tippy content="HG+ Armor">
                  <li onClick={HGPlusbutton} className={`${activeHGPlus == true ? "filteractive" : "filterinactive"} buffbutton armhgplusbutton`}>
                  </li>
                </Tippy>
                : ""}
              {showHG == true ?
                <Tippy content="HG Armor">
                  <li onClick={HGbutton} className={`${activeHG == true ? "filteractive" : "filterinactive"} buffbutton armhgbutton`}>
                  </li>
                </Tippy>
                : ""}
              {show35a == true ?
                <Tippy content="35CP Armor">
                  <li onClick={_35abutton} className={`${active35a == true ? "filteractive" : "filterinactive"} buffbutton arm35abutton`}>
                  </li>
                </Tippy>
                : ""}
              {show4a == true ?
                <Tippy content="4★ Armor">
                  <li onClick={_4abutton} className={`${active4a == true ? "filteractive" : "filterinactive"} buffbutton arm4abutton`}>
                  </li>
                </Tippy>
                : ""}
              {showbloom == true ?
                <Tippy content="Bloom Stone">
                  <li onClick={bloombutton} className={`${activebloom == true ? "filteractive" : "filterinactive"} buffbutton armbloombutton`}>
                  </li>
                </Tippy>
                : ""}
            </ul>
            <br />
            <div className="search-reverse-holder">
              <div className="search-holder">
                <IoSearch className="innersearchicon" />
                <input
                  className="search-bar"
                  type="text"
                  id="search"
                  placeholder="Name Search"
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
              <Tippy content="Reset Filters" className="tooltip" >
                <div onClick={resetbutton} className={`clearbox`} ><div className="makecenter">Reset&nbsp;<FaUndoAlt className={`clearbutton ${clearFilter ? "loop" : ""}`} ></FaUndoAlt></div></div>
              </Tippy>
            </div>
          </div>
        </div>
        <div className="characterpageholder">
          {
            listPassives.length > 0 ? (
              listPassives.map(gear => (
                <LazyLoadComponent
                scrollPosition={scrollPosition }
                key={gear.equip_id}
                placeholder={<div className='infoholder' style={{ minHeight: "350px" }}>
                                <img className="loadingbardots" src="https://dissidiacompendium.com/images/static/site/loading.gif"/>
                            </div>
                                }
                >
                <EquipmentPassivesFormatting
                  key={gear.equip_id}
                  gear={gear}
                  ver={ver}
                  loc={loc}
                  file={"equipment"}
                  Single={true}

                  master_index={master_index}

                  formatting={formatting}
                />
                </LazyLoadComponent>
              ))) : (
              <div>No results</div>
            )
          }
        </div>
      </div>
    )
  }

}

export default trackWindowScroll(CharacterGearPage)