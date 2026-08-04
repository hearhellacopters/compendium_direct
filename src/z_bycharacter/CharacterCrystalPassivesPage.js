import React, { useState, useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import Tippy from '../components/TippyDefaults.js';
import Select from 'react-select';
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { FaUndoAlt } from 'react-icons/fa'
import { getQuery, getQueryStringVal, useQueryParam } from '../components/URLParams.js'
import AbilityPars from '../components/Abilities/AbilityPars.js';
import PassiveAbilityFormatting from '../components/Passives/PassiveAbilityFormatting.js';
import PassiveCrystalParm from '../components/Passives/PassiveCrystalParm.js';
import { LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';

function CharacterCrystalPassivesPage ({
  crydata,
  ver,
  newcompare,
  loc,
  access,
  formatting,

  master_index,
  scrollPosition
}) {

  const [rawData, setrawData] = useState(crydata)

  const banerDisplayTerm = "passive abilities";

  const startinglimit = 999

  const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null ? true : false);
  const [clearFilter, setclearFilter] = useStateIfMounted(false);

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
  const [Typesearch, setTypesearch] = useQueryParam("char", "");
  const [Typesearch2, setTypesearch2] = useQueryParam("type", "");
  const [Typesearch3, setTypesearch3] = useQueryParam("effect", "");
  const [Typesearch4, setTypesearch4] = useQueryParam("require", "");
  const { protocol, pathname, host } = window.location;
  const query = getQuery();
  const url = `${protocol}//${host}${pathname}?${query.toString()}`
  const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
  const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
  const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");

  const showfilterbutton = () => {
    if (showFilter == false) {
      setFiltersearch("true")
    } else {
      setFiltersearch("")
    }
    setShowFilter((prevValue) => !prevValue);
  }

  useEffect(() => {
    if (showFilter == false) {
      setFiltersearch("")
    } else {
      setFiltersearch("true")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFilter])

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
    //type params
    if (Typesearch != "") {
      const filteredtype = Object.values(master_index.charid).filter(self => self.CharacterName == getQueryStringVal("char"))
      if (filteredtype.length != 0) {
        setTypesearch(getQueryStringVal("char"))
        setCondFilter(filteredtype[0].CharID)
      } else {
        setTypesearch("")
        setCondFilter("")
      }
    }
  }, [setCondFilter, master_index, Typesearch, setTypesearch])

  useEffect(() => {
    const typeListArray2 = [
      {
        value: "CLv 88",
        label: "CLv 88",
        id: 88,
      },
      {
        value: "CLv 85",
        label: "CLv 85",
        id: 85
      },
      {
        value: "CLv 80",
        label: "CLv 80",
        id: 80
      },
      {
        value: "CLv 78",
        label: "CLv 78",
        id: 78
      },
      {
        value: "CLv 75",
        label: "CLv 75",
        id: 75,
      },
      {
        value: "CLv 70",
        label: "CLv 70",
        id: 70,
      },
      {
        value: "CLv 68",
        label: "CLv 68",
        id: 68,
      },
      {
        value: "CLv 65",
        label: "CLv 65",
        id: 65,
      },
      {
        value: "CLv 60",
        label: "CLv 60",
        id: 60,
      },
      {
        value: "CLv 58",
        label: "CLv 58",
        id: 58,
      },
      {
        value: "CLv 55",
        label: "CLv 55",
        id: 55,
      },
      {
        value: "CLv 54",
        label: "CLv 54",
        id: 54,
      },
      {
        value: "CLv 50",
        label: "CLv 50",
        id: 50,
      },
      {
        value: "CLv 45",
        label: "CLv 45",
        id: 45,
      },
      {
        value: "CLv 40",
        label: "CLv 40",
        id: 40,
      },
      {
        value: "CLv 35",
        label: "CLv 35",
        id: 35,
      },
      {
        value: "CLv 30",
        label: "CLv 30",
        id: 30,
      },
      {
        value: "CLv 25",
        label: "CLv 25",
        id: 25,
      },
      {
        value: "CLv 20",
        label: "CLv 20",
        id: 20,
      },
      {
        value: "CLv 15",
        label: "CLv 15",
        id: 15,
      },
      {
        value: "CLv 10",
        label: "CLv 10",
        id: 10,
      },
      {
        value: "CLv 5",
        label: "CLv 5",
        id: 5,
      },
      {
        value: "CLv 1",
        label: "CLv 1",
        id: 1,
      }
    ]
    if (Typesearch2 != "") {
      const filteredtype2 = typeListArray2.filter(self => self.label == getQueryStringVal("type"))

      if (filteredtype2.length != 0) {
        setTypesearch2(getQueryStringVal("type"))
        setCondFilter2(filteredtype2[0].id)
      } else {
        setTypesearch2("")
        setCondFilter2("")
      }
    }
  }, [setCondFilter2, Typesearch2, setTypesearch2])

  useEffect(() => {
    //type params2
    if (Typesearch3 != "") {
      const filteredtype3 = Object.values(master_index.passive_effects.effect_).filter(self => self.effect_type == getQueryStringVal("effect"))
      if (filteredtype3.length != 0) {
        setTypesearch3(getQueryStringVal("effect"))
        setCondFilter3(filteredtype3[0].id)
      } else {
        setTypesearch3("")
        setCondFilter3("")
      }
    }
  }, [setCondFilter3, master_index, Typesearch3, setTypesearch3])

  useEffect(() => {
    //type params2
    if (Typesearch4 != "") {
      const filteredtype4 = Object.values(master_index.passive_effects.require_passive).filter(self => self.require_ == getQueryStringVal("require"))
      if (filteredtype4.length != 0) {
        setTypesearch4(getQueryStringVal("require"))
        setCondFilter4(filteredtype4[0].id)
      } else {
        setTypesearch4("")
        setCondFilter4("")
      }
    }
  }, [setCondFilter4, master_index, Typesearch4, setTypesearch4])

  //type selector
  const CondSelect = (e) => {
    if (e !== null) {
      setTypesearch(e.label)
      setCondFilter(e.value);
    } else {
      setCondFilter("");
      setTypesearch("")
    }
  };

  //type selector2
  const CondSelect2 = (e) => {
    if (e !== null) {
      setTypesearch2(e.label)
      setCondFilter2(e.value);
    } else {
      setCondFilter2("");
      setTypesearch2("")
    }
  };

  //type selector3
  const CondSelect3 = (e) => {
    if (e !== null) {
      setTypesearch3(e.label)
      setCondFilter3(e.value);
    } else {
      setCondFilter3("");
      setTypesearch3("")
    }
  };

  //type selector4
  const CondSelect4 = (e) => {
    if (e !== null) {
      setTypesearch4(e.label)
      setCondFilter4(e.value);
    } else {
      setCondFilter4("");
      setTypesearch4("")
    }
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
    const filterholder = rawData;

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
    const getailmentfilter = searchit.filter(function (ef) {
      const newfilterpull = ef["level"] == condFilter2;
      if (condFilter2 !== "") {
        return newfilterpull;
      } else {
        return ef
      }
    });
    setFilterResults(makeUnique);
    setSearchResults(getailmentfilter);
    const newlistdisplay = getailmentfilter.slice(0, limits);
    if (limits < getailmentfilter.length) {
      setShowLoadMore(true);
      setListDisplay(newlistdisplay);
      setListLength(getailmentfilter.length);
      setDisplayBanner(
        `Displaying ${newlistdisplay.length} of ${getailmentfilter.length} ${banerDisplayTerm}`
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
  }, [searchTerm, clearFilter, condFilter, condFilter2, condFilter3, condFilter4, reverse]);

  //type list
  const typeListArray = Object.values(master_index.charid).map((typeListUnique) => ({
    value: typeListUnique.CharID,
    label: typeListUnique.CharacterName
  }));

  const typeListArray2 = [
    {
      value: "CLv 88",
      label: "CLv 88",
      id: 88,
    },
    {
      value: "CLv 85",
      label: "CLv 85",
      id: 85
    },
    {
      value: "CLv 80",
      label: "CLv 80",
      id: 80
    },
    {
      value: "CLv 78",
      label: "CLv 78",
      id: 78
    },
    {
      value: "CLv 75",
      label: "CLv 75",
      id: 75,
    },
    {
      value: "CLv 70",
      label: "CLv 70",
      id: 70,
    },
    {
      value: "CLv 68",
      label: "CLv 68",
      id: 68,
    },
    {
      value: "CLv 65",
      label: "CLv 65",
      id: 65,
    },
    {
      value: "CLv 60",
      label: "CLv 60",
      id: 60,
    },
    {
      value: "CLv 58",
      label: "CLv 58",
      id: 58,
    },
    {
      value: "CLv 55",
      label: "CLv 55",
      id: 55,
    },
    {
      value: "CLv 54",
      label: "CLv 54",
      id: 54,
    },
    {
      value: "CLv 50",
      label: "CLv 50",
      id: 50,
    },
    {
      value: "CLv 45",
      label: "CLv 45",
      id: 45,
    },
    {
      value: "CLv 40",
      label: "CLv 40",
      id: 40,
    },
    {
      value: "CLv 35",
      label: "CLv 35",
      id: 35,
    },
    {
      value: "CLv 30",
      label: "CLv 30",
      id: 30,
    },
    {
      value: "CLv 25",
      label: "CLv 25",
      id: 25,
    },
    {
      value: "CLv 20",
      label: "CLv 20",
      id: 20,
    },
    {
      value: "CLv 15",
      label: "CLv 15",
      id: 15,
    },
    {
      value: "CLv 10",
      label: "CLv 10",
      id: 10,
    },
    {
      value: "CLv 5",
      label: "CLv 5",
      id: 5,
    },
    {
      value: "CLv 1",
      label: "CLv 1",
      id: 1,
    }
  ]

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

    setReversesearch("")
    setTEXTsearch("")
    setTypesearch("")
    setTypesearch2("")
    setTypesearch3("")
    setTypesearch4("")
    setsearchdisplay("");
    setSearchTerm("");
    setCondFilter("")
    setCondFilter2("")
    setCondFilter3("")
    setCondFilter4("")
    setTimeout(() => setclearFilter(false), 1000);
  }

  const displaydata = listDisplay

  if (crydata.length == 0) {
    return (
      <div className='ultimaweaponitemholder'>
        No Data
      </div>
    )
  } else {
    return (
      <div>
        <div className="charfilterspacer" />
        <div key="filter1" onClick={showfilterbutton} className="charfilter"><span className="filterstext"></span>{showFilter ? <TiArrowSortedUp className="uparrow" /> : <TiArrowSortedDown className="downarrow" />}</div>
        <div className="event-search-reverse-holder">
          {showFilter == false ?
            <div className="char-search-reverse-holder">
              <IoSearch className="searchicon" />
              <div className="search-holder el">
                <input
                  className="char-search-bar"
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
            </div>
            : ""
          }
        </div>
        <div className="filterholder noselect" id={showFilter ? "showfilteren" : "hiddenfilteren"}>
          <div className="similarbanner">Filters</div>
          <div className="filterholderflair">
            <div className="typeholder">
              <Select
                defaultValue={Typesearch2 != "" ? { value: Typesearch2, label: Typesearch2 } : null}
                key={Typesearch2}
                isSearchable={true}
                placeholder="Type Select..."
                className='typecontainer'
                classNamePrefix="typetext"
                onChange={CondSelect2}
                options={typeListArray2}
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
        <div className="ultimaweaponitemholder">
          {displaydata.length > 0 ? (
            displaydata.map(passive => (
              passive.awakening_type == 3 && passive.command != undefined ?
              <LazyLoadComponent
              key={passive.cac_id}
                scrollPosition={scrollPosition}
                placeholder={<div className="buffunit">
                                <div className="infoholder" style={{ minHeight: "220px" }}>
                                <img className="loadingbardots" src="/images/static/site/loading.gif"/>
                                </div>
                            </div>}
                >
                <AbilityPars
                  key={passive.cac_id}

                  tag_override={`cl${passive.level}`}

                  character_ability={passive.command}

                  ver={ver}
                  loc={loc}
                  file={"character_ability"}
                  debugging={true}
                  master_index={master_index}

                  formatting={formatting}
                />
                </LazyLoadComponent>
                : passive.awakening_type == 3 ?
                  <LazyLoadComponent
                  key={passive.cac_id}
                  scrollPosition={scrollPosition}
                  placeholder={<div className="buffunit infoholder" style={{ minHeight: `250px` }}>
                    <img className="loadingbardots" src="/images/static/site/loading.gif"/>
                  </div>
                    }
                  >
                  <PassiveCrystalParm
                    key={passive.cac_id}
                    type={3}
                    passive={passive}
                    master_index={master_index}
                    ver={ver}
                  />
                  </LazyLoadComponent>
                  : passive.awakening_type == 3 && passive.command == undefined ?
                    <LazyLoadComponent
                    key={passive.cac_id}
                    scrollPosition={scrollPosition}
                    placeholder={<div className="buffunit infoholder" style={{ minHeight: `250px` }}>
                      <img className="loadingbardots" src="/images/static/site/loading.gif"/>
                    </div>
                      }
                    >
                    <PassiveCrystalParm
                      key={passive.cac_id}
                      type={3}
                      passive={passive}
                      master_index={master_index}
                      ver={ver}
                    />
                    </LazyLoadComponent>
                    : passive.awakening_type == 2 || passive.awakening_type == 5 ?
                      <LazyLoadComponent
                      key={passive.cac_id}
                      scrollPosition={scrollPosition}
                      placeholder={<div className="buffunit infoholder" style={{ minHeight: `250px` }}>
                        <img className="loadingbardots" src="/images/static/site/loading.gif"/>
                      </div>
                        }
                      >
                      <PassiveAbilityFormatting
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
                        debugging={true}
                        banner_color={"bluebanner"}
                        base_color={"bluebase"}
                      />
                      </LazyLoadComponent>
                      : passive.awakening_type == 6 ?
                        <LazyLoadComponent
                        key={passive.cac_id}
                        scrollPosition={scrollPosition}
                        placeholder={<div className="buffunit infoholder" style={{ minHeight: `250px` }}>
                          <img className="loadingbardots" src="/images/static/site/loading.gif"/>
                        </div>
                          }
                        >
                        <PassiveCrystalParm
                          key={passive.cac_id}
                          type={6}
                          passive={passive}
                          master_index={master_index}
                          ver={ver}
                        />
                        </LazyLoadComponent>
                        : passive.awakening_type == 1 && passive.command != undefined ?
                          <LazyLoadComponent
                          key={passive.cac_id}
                          scrollPosition={scrollPosition}
                          placeholder={<div className="buffunit">
                                          <div className="infoholder" style={{ minHeight: "220px" }}>
                                          <img className="loadingbardots" src="/images/static/site/loading.gif"/>
                                          </div>
                                      </div>}
                          >
                          <AbilityPars
                            key={passive.cac_id}

                            tag_override={`cl${passive.level}`}

                            character_ability={passive.command}
                            access={access}
                            ver={ver}
                            loc={loc}
                            file={"character_ability"}
                            debugging={true}
                            master_index={master_index}

                            formatting={formatting}
                          />
                          </LazyLoadComponent>
                          : passive.awakening_type == -1 && passive.command != undefined ?
                            <LazyLoadComponent
                            key={passive.cac_id}
                            scrollPosition={scrollPosition}
                            placeholder={<div className="buffunit">
                                            <div className="infoholder" style={{ minHeight: "220px" }}>
                                            <img className="loadingbardots" src="/images/static/site/loading.gif"/>
                                            </div>
                                        </div>}
                            >
                            <AbilityPars
                              key={passive.cac_id}

                              tag_override={`cl${passive.level}`}

                              character_ability={passive.command}
                              access={access}
                              ver={ver}
                              loc={loc}
                              file={"character_ability"}
                              debugging={true}
                              master_index={master_index}

                              formatting={formatting}
                            />
                            </LazyLoadComponent>
                            : passive.awakening_type == 4 && passive.command != undefined ?
                              <LazyLoadComponent
                              key={passive.cac_id}
                              scrollPosition={scrollPosition}
                              placeholder={<div className="buffunit">
                                              <div className="infoholder" style={{ minHeight: "220px" }}>
                                              <img className="loadingbardots" src="/images/static/site/loading.gif"/>
                                              </div>
                                          </div>}
                              >
                              <AbilityPars
                                key={passive.cac_id}

                                tag_override={`cl${passive.level}`}
                                debugging={true}
                                character_ability={passive.command}
                                access={access}
                                ver={ver}
                                loc={loc}
                                file={"character_ability"}

                                master_index={master_index}

                                formatting={formatting}
                              />
                              </LazyLoadComponent>
                              :
                              passive.command != undefined ?
                              <LazyLoadComponent
                              key={passive.cac_id}
                                scrollPosition={scrollPosition}
                                placeholder={<div className="buffunit">
                                                <div className="infoholder" style={{ minHeight: "220px" }}>
                                                <img className="loadingbardots" src="/images/static/site/loading.gif"/>
                                                </div>
                                            </div>}
                                >
                                <AbilityPars
                                  key={passive.cac_id}

                                  tag_override={`cl${passive.level}`}
                                  debugging={true}
                                  character_ability={passive.command}
                                  access={access}
                                  ver={ver}
                                  loc={loc}
                                  file={"character_ability"}

                                  master_index={master_index}

                                  formatting={formatting}
                                />
                                </LazyLoadComponent>
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

export default trackWindowScroll(CharacterCrystalPassivesPage)