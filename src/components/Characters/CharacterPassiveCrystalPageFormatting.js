import React, { useState, useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import Passive_Ability_Formatting from '../Passives/PassiveAbilityFormatting.js'
import PassiveCrystalParm from '../Passives/PassiveCrystalParm.js';
import Tippy from '../TippyDefaults.js'
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { FaUndoAlt } from 'react-icons/fa'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import { getQuery, getQueryStringVal, useQueryParam } from '../URLParams.js'
import CharacterAbilityPars from '../Abilities/AbilityPars.js'

export default function CharacterPassiveCrystalPageFormatting({
  crydata,
  ver,
  newcompare,
  loc,
  ProcessedCharacters,
  formatting,

  showFilter,
  master_index
}){

  const [rawData, setrawData] = useState(crydata)

  const banerDisplayTerm = "passive abilities";

  const startinglimit = 999

  const [clearFilter, setclearFilter] = useStateIfMounted(false);

  //show icons

  const [showCl50, setshowCl50] = useStateIfMounted(false);
  const [showCl55, setshowCl55] = useStateIfMounted(false);
  const [showCl60, setshowCl60] = useStateIfMounted(false);
  const [showCl70, setshowCl70] = useStateIfMounted(false);
  const [showCl80, setshowCl80] = useStateIfMounted(false);
  const [showCl85, setshowCl85] = useStateIfMounted(false);
  const [showCl88, setshowCl88] = useStateIfMounted(false);

  useEffect(() => {
    if (Object.values(crydata).some(self => self.passive && self.passive.loc_tag == "cl50")) {
      setshowCl50(true)
    }
    if (Object.values(crydata).some(self => self.passive && self.passive.loc_tag == "cl55")) {
      setshowCl55(true)
    }
    if (Object.values(crydata).some(self => self.passive && self.passive.loc_tag == "cl60")) {
      setshowCl60(true)
    }
    if (Object.values(crydata).some(self => self.passive && self.passive.loc_tag == "cl70")) {
      setshowCl70(true)
    }
    if (Object.values(crydata).some(self => self.passive && self.passive.loc_tag == "cl80")) {
      setshowCl80(true)
    }
    if (Object.values(crydata).some(self => self.passive && self.passive.loc_tag == "cl85")) {
      setshowCl85(true)
    }
    if (Object.values(crydata).some(self => self.passive && self.passive.loc_tag == "cl88")) {
      setshowCl88(true)
    }
    // eslint-disable-next-line
  }, [crydata])

  const [activeCl50search, setactiveCl50search] = useQueryParam("Cl50", "");
  const [activeCl55search, setactiveCl55search] = useQueryParam("Cl55", "");
  const [activeCl60search, setactiveCl60search] = useQueryParam("Cl60", "");
  const [activeCl70search, setactiveCl70search] = useQueryParam("Cl70", "");
  const [activeCl80search, setactiveCl80search] = useQueryParam("Cl80", "");
  const [activeCl85search, setactiveCl85search] = useQueryParam("Cl85", "");
  const [activeCl88search, setactiveCl88search] = useQueryParam("Cl88", "");

  const [activeCl50, setactiveCl50] = useStateIfMounted(getQueryStringVal("Cl50") != null ? true : false);
  const [activeCl55, setactiveCl55] = useStateIfMounted(getQueryStringVal("Cl55") != null ? true : false);
  const [activeCl60, setactiveCl60] = useStateIfMounted(getQueryStringVal("Cl60") != null ? true : false);
  const [activeCl70, setactiveCl70] = useStateIfMounted(getQueryStringVal("Cl70") != null ? true : false);
  const [activeCl80, setactiveCl80] = useStateIfMounted(getQueryStringVal("Cl80") != null ? true : false);
  const [activeCl85, setactiveCl85] = useStateIfMounted(getQueryStringVal("Cl85") != null ? true : false);
  const [activeCl88, setactiveCl88] = useStateIfMounted(getQueryStringVal("Cl88") != null ? true : false);

  useEffect(() => {
    if (activeCl50 == false) {
      setactiveCl50search("")
    } else {
      setactiveCl50search("true")
    }
    if (activeCl55 == false) {
      setactiveCl55search("")
    } else {
      setactiveCl55search("true")
    }
    if (activeCl60 == false) {
      setactiveCl60search("")
    } else {
      setactiveCl60search("true")
    }
    if (activeCl70 == false) {
      setactiveCl70search("")
    } else {
      setactiveCl70search("true")
    }
    if (activeCl80 == false) {
      setactiveCl80search("")
    } else {
      setactiveCl80search("true")
    }
    if (activeCl85 == false) {
      setactiveCl85search("")
    } else {
      setactiveCl85search("true")
    }
    if (activeCl88 == false) {
      setactiveCl88search("")
    } else {
      setactiveCl88search("true")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCl80, activeCl50, activeCl55, activeCl60, activeCl70, activeCl85, activeCl88])

  const [loop, setLoop] = useStateIfMounted(false);
  const [reverse, setReverse] = useState(getQueryStringVal("rev") != null ? true : false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchdisplay, setsearchdisplay] = useState("");
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

    //buttons
    if (activeCl50 == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.passive && ef.passive.loc_tag == "cl50"
      );
      filterholder.push(...filteredout);
    }
    if (activeCl55 == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.passive && ef.passive.loc_tag == "cl55"
      );
      filterholder.push(...filteredout);
    }
    if (activeCl60 == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.passive && ef.passive.loc_tag == "cl60"
      );
      filterholder.push(...filteredout);
    }
    if (activeCl70 == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.passive && ef.passive.loc_tag == "cl70"
      );
      filterholder.push(...filteredout);
    }
    if (activeCl80 == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.passive && ef.passive.loc_tag == "cl80"
      );
      filterholder.push(...filteredout);
    }
    if (activeCl85 == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.passive && ef.passive.loc_tag == "cl85"
      );
      filterholder.push(...filteredout);
    }
    if (activeCl88 == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.passive && ef.passive.loc_tag == "cl88"
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
          b.level - a.level :
          a.level - b.level);
    const searchit = makeUnique.filter((passive) =>
      (`
        ${passive.awakening_type == -1 ? passive.command && passive.command.command ? ver == "GL" ? passive.command.command.name : passive.command.command.glname : "" : ""} 
        ${passive.awakening_type == -1 ? passive.command && passive.command.command ? ver == "GL" ? passive.command.command.jpname : passive.command.command.name : "" : ""} 
        ${passive.awakening_type == 1 ? passive.command && passive.command.command ? ver == "GL" ? passive.command.command.name : passive.command.command.glname : "" : ""} 
        ${passive.awakening_type == 1 ? passive.command && passive.command.command ? ver == "GL" ? passive.command.command.jpname : passive.command.command.name : "" : ""} 
        ${passive.awakening_type == 2 ? passive.passive && passive.passive ? ver == "GL" ? passive.passive.name : passive.passive.glname : "" : ""} 
        ${passive.awakening_type == 2 ? passive.passive && passive.passive ? ver == "GL" ? passive.passive.jpname : passive.passive.name : "" : ""} 
        ${passive.awakening_type == 3 ? passive.param : ""} 
        ${passive.awakening_type == 4 ? passive.command && passive.command.command ? ver == "GL" ? passive.command.command.name : passive.command.command.glname : "" : ""} 
        ${passive.awakening_type == 4 ? passive.command && passive.command.command ? ver == "GL" ? passive.command.command.jpname : passive.command.command.name : "" : ""} 
        ${passive.awakening_type == 5 ? passive.command && passive.command.command ? ver == "GL" ? passive.command.command.name : passive.command.command.glname : "" : ""} 
        ${passive.awakening_type == 5 ? passive.command && passive.command.command ? ver == "GL" ? passive.command.command.jpname : passive.command.command.name : "" : ""} 
        ${passive.awakening_type == 6 ? passive.param && passive.param : ""} 
        #-${passive.cac_id}
        `).toLowerCase().includes(searchTerm)
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
  }, [searchTerm, clearFilter, reverse, activeCl80, activeCl50, activeCl55, activeCl60, activeCl70, activeCl85, activeCl88]);

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
    setactiveCl50(false)
    setactiveCl55(false)
    setactiveCl60(false)
    setactiveCl70(false)
    setactiveCl80(false)
    setactiveCl85(false)
    setactiveCl88(false)

    setReversesearch("")
    setTEXTsearch("")
    setsearchdisplay("");
    setSearchTerm("");
    setactiveCl50search("")
    setactiveCl55search("")
    setactiveCl60search("")
    setactiveCl70search("")
    setactiveCl80search("")
    setactiveCl85search("")
    setactiveCl88search("")
    setTimeout(() => setclearFilter(false), 1000);
  }

  const displaydata = listDisplay

  const clear_filter =()=>{
    setactiveCl50(false)
    setactiveCl55(false)
    setactiveCl60(false)
    setactiveCl70(false)
    setactiveCl80(false)
    setactiveCl85(false)
    setactiveCl88(false)
  }

  const Cl50button = () => {
    if (activeCl50 == false) {
      clear_filter()
      setactiveCl50(true)
    } else {
      clear_filter()
    }
  }
  const Cl55button = () => {
    if (activeCl55 == false) {
      clear_filter()
      setactiveCl55(true)
    } else {
      clear_filter()
    }
  }
  const Cl60button = () => {
    if (activeCl60 == false) {
      clear_filter()
      setactiveCl60(true)
    } else {
      clear_filter()
    }
  }
  const Cl80button = () => {
    if (activeCl80 == false) {
      clear_filter()
      setactiveCl80(true)
    } else {
      clear_filter()
    }
  }
  const Cl70button = () => {
    if (activeCl70 == false) {
      clear_filter()
      setactiveCl70(true)
    } else {
      clear_filter()
    }
  }
  const Cl85button = () => {
    if (activeCl85 == false) {
      clear_filter()
      setactiveCl85(true)
    } else {
      clear_filter()
    }
  }
  const Cl88button = () => {
    if (activeCl88 == false) {
      clear_filter()
      setactiveCl88(true)
    } else {
      clear_filter()
    }
  }

  if (crydata.length == 0) {
    return (
      <div className='nonenemyholder enemyholderstyling'>
        No Data
      </div>
    )
  } else {
    return (
      <div>
        <div className="filterholder noselect" id={showFilter ? "showfilteren" : "hiddenfilteren"}>
          <div className="similarbanner">Subcategories</div>
          <div className="filterholderflair">
            <ul className='bufftypes'>
              {showCl88 == true ?
                <Tippy content="Crystal Level 88">
                  <li onClick={Cl88button} className={`${activeCl88 == true ? "filteractive" : "filterinactive"} buffbutton cl88button`}>
                  </li>
                </Tippy>
                : ""}
              {showCl85 == true ?
                <Tippy content="Crystal Level 85">
                  <li onClick={Cl85button} className={`${activeCl85 == true ? "filteractive" : "filterinactive"} buffbutton cl85button`}>
                  </li>
                </Tippy>
                : ""}
              {showCl80 == true ?
                <Tippy content="Crystal Level 80">
                  <li onClick={Cl80button} className={`${activeCl80 == true ? "filteractive" : "filterinactive"} buffbutton cl80button`}>
                  </li>
                </Tippy>
                : ""}
              {showCl70 == true ?
                <Tippy content="Crystal Level 70">
                  <li onClick={Cl70button} className={`${activeCl70 == true ? "filteractive" : "filterinactive"} buffbutton cl70button`}>
                  </li>
                </Tippy>
                : ""}
              {showCl60 == true ?
                <Tippy content="Crystal Level 60">
                  <li onClick={Cl60button} className={`${activeCl60 == true ? "filteractive" : "filterinactive"} buffbutton cl60button`}>
                  </li>
                </Tippy>
                : ""}
              {showCl55 == true ?
                <Tippy content="Crystal Level 55">
                  <li onClick={Cl55button} className={`${activeCl55 == true ? "filteractive" : "filterinactive"} buffbutton cl55button`}>
                  </li>
                </Tippy>
                : ""}
              {showCl50 == true ?
                <Tippy content="Crystal Level 50">
                  <li onClick={Cl50button} className={`${activeCl50 == true ? "filteractive" : "filterinactive"} buffbutton cl50button`}>
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
          {displaydata.length > 0 ? (
            displaydata.map(passive => (
              passive.awakening_type == 3 && passive.command != undefined ?
                <CharacterAbilityPars
                  key={passive.cac_id}

                  tag_override={`cl${passive.level}`}

                  character_ability={passive.command}
                  ProcessedCharacters={ProcessedCharacters}
                  ver={ver}
                  loc={loc}
                  file={"character_ability"}

                  master_index={master_index}

                  formatting={formatting}
                />
                : passive.awakening_type == 3 ?
                  <PassiveCrystalParm
                    key={passive.cac_id}
                    type={3}
                    passive={passive}
                    master_index={master_index}
                    ver={ver}
                  />
                  : passive.awakening_type == 2 || passive.awakening_type == 5 ?
                    <Passive_Ability_Formatting
                      key={passive.cac_id}
                      passive_ability={passive.passive}
                      ver={ver}
                      loc={loc}
                      file={"exskill"}
                      Single={true}

                      master_index={master_index}

                      formatting={formatting}
                      chara_id_passoff={passive.chara_id}
                      cp_overide={passive.cp}
                      tag_overide={`cl${passive.level}`}
                      span={true}
                      release={passive.start_date}

                      banner_color={"bluebanner"}
                      base_color={"bluebase"}
                    />
                    : passive.awakening_type == 6 ?
                      <PassiveCrystalParm
                        key={passive.cac_id}
                        type={6}
                        passive={passive}
                        master_index={master_index}
                        ver={ver}
                      />
                      : passive.awakening_type == 1 && passive.command != undefined ?
                        <CharacterAbilityPars
                          key={passive.cac_id}

                          tag_override={`cl${passive.level}`}

                          character_ability={passive.command}
                          ProcessedCharacters={ProcessedCharacters}
                          ver={ver}
                          loc={loc}
                          file={"character_ability"}

                          master_index={master_index}

                          formatting={formatting}
                        />
                        : passive.awakening_type == -1 && passive.command != undefined ?
                          <CharacterAbilityPars
                            key={passive.cac_id}

                            tag_override={`cl${passive.level}`}

                            character_ability={passive.command}
                            ProcessedCharacters={ProcessedCharacters}
                            ver={ver}
                            loc={loc}
                            file={"character_ability"}

                            master_index={master_index}

                            formatting={formatting}
                          />
                          : passive.awakening_type == 4 && passive.command != undefined ?
                            <CharacterAbilityPars
                              key={passive.cac_id}

                              tag_override={`cl${passive.level}`}

                              character_ability={passive.command}
                              ProcessedCharacters={ProcessedCharacters}
                              ver={ver}
                              loc={loc}
                              file={"character_ability"}

                              master_index={master_index}

                              formatting={formatting}
                            />
                            :
                            passive.command != undefined ?
                              <CharacterAbilityPars
                                key={passive.cac_id}

                                tag_override={`cl${passive.level}`}

                                character_ability={passive.command}
                                ProcessedCharacters={ProcessedCharacters}
                                ver={ver}
                                loc={loc}
                                file={"character_ability"}

                                master_index={master_index}

                                formatting={formatting}
                              />
                              : ""
            ))) : (
            <div className=''>No Data</div>
          )
          }
        </div>
      </div>
    )
  }
}