import React, { useState, useEffect } from 'react';
import Tippy from '../components/TippyDefaults'
import { useStateIfMounted } from "use-state-if-mounted";
import Select from 'react-select';
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { FaUndoAlt } from 'react-icons/fa'
import { getQuery, getQueryStringVal, useQueryParam } from '../components/URLParams'
import EquipmentPassivesFormatting from '../components/Gear/EquipmentPassivesFormatting';
import { LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';

function CharacterGearPage ({
  equipment_passive_ability,
  ver,
  loc,
  newcompare,

  formatting,
  master_index,
  scrollPosition,
}) {

  const rawData = Object.values(equipment_passive_ability && equipment_passive_ability.sort((a, b) => b.ranked - a.ranked))

  const banerDisplayTerm = "equipment passive abilities";

  const startinglimit = 9999

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
      setShowFilter(true)
    } else {
      setFiltersearch("")
      setShowFilter(false)
    }
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
    //type params2
    const typeListArray2 = [
      {
        id: "wpbtplus",
        value: "BT+ Weapon",
        label: "BT+ Weapon"
      },
      {
        id: "wpbt",
        value: "BT Weapon",
        label: "BT Weapon"
      },
      {
        id: "wpfr",
        value: "FR Weapon",
        label: "FR Weapon"
      },
      {
        id: "wpexplus",
        value: "EX+ Weapon",
        label: "EX+ Weapon"
      },
      {
        id: "wpld",
        value: "LD Weapon",
        label: "LD Weapon"
      },
      {
        id: "wpex",
        value: "EX Weapon",
        label: "EX Weapon"
      },
      {
        id: "wpnt",
        value: "NT Weapon",
        label: "NT Weapon"
      },
      {
        id: "wpdark",
        value: "Dark Weapon",
        label: "Dark Weapon"
      },
      {
        id: "wp35",
        value: "35CP Weapon",
        label: "35CP Weapon"
      },
      {
        id: "wpwoi",
        value: "WoI Weapon",
        label: "WoI Weapon"
      },
      {
        id: "wp15",
        value: "15CP Weapon",
        label: "15CP Weapon"
      },
      {
        id: "wp4w",
        value: "4★ Weapon",
        label: "4★ Weapon"
      },
      {
        id: "armbloom",
        value: "Bloom Stone",
        label: "Bloom Stone"
      },
      {
        id: "arm7aplus",
        value: "7★+ Armor",
        label: "7★+ Armor"
      },
      {
        id: "arm7a",
        value: "7★ Armor",
        label: "7★ Armor"
      },
      {
        id: "armhgplus",
        value: "HG+ Armor",
        label: "HG+ Armor"
      },
      {
        id: "armhg",
        value: "HG Armor",
        label: "HG Armor"
      },
      {
        id: "arm35a",
        value: "35CP Armor",
        label: "35CP Armor"
      },
      {
        id: "arm4a",
        value: "4★ Armor",
        label: "4★ Armor"
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
      setCondFilter2(e.id);
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

    const makeUnique = filterholder.filter(onlyUnique);
    const searchit = makeUnique.filter((gear) =>
      (`${ver == "GL" ? gear.passives && gear.passives.map(self => ` ${self.jpname}`) : ""} ${gear.passives && gear.passives.map(self => ` ${self.name}`)} ${gear.name} ${ver == "JP" ? gear.glname : gear.jpname} ${ver == "JP" ? gear.passives && gear.passives.map(self => ` ${self.glname}`) : ""} - #${gear.equip_id}`).toLowerCase().includes(searchTerm)
    );
    const getailmentfilter2 = searchit.filter(function (ef) {
      const newfilterpull = ef["CharID"] === condFilter;
      if (condFilter !== "") {
        return newfilterpull;
      } else {
        return ef
      }
    });
    const getailmentfilter3 = getailmentfilter2.filter(function (ef) {
      const newfilterpull = ef["effect_"] === condFilter3 || ef["effect__1"] === condFilter3;
      if (condFilter3 !== "") {
        return newfilterpull;
      } else {
        return ef
      }
    });
    const getailmentfilter4 = getailmentfilter3.filter(function (ef) {
      const newfilterpull = ef["require__1"] === condFilter4 || ef["require_"] === condFilter4;
      if (condFilter4 !== "") {
        return newfilterpull;
      } else {
        return ef
      }
    });
    const getailmentfilter = getailmentfilter4.filter(function (ef) {
      const newfilterpull = ef["gear_tag"] == condFilter2;
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

  const typeListArray2 = [
    {
      id: "wpbtplus",
      value: "BT+ Weapon",
      label: "BT+ Weapon"
    },
    {
      id: "wpbt",
      value: "BT Weapon",
      label: "BT Weapon"
    },
    {
      id: "wpfr",
      value: "FR Weapon",
      label: "FR Weapon"
    },
    {
      id: "wpexplus",
      value: "EX+ Weapon",
      label: "EX+ Weapon"
    },
    {
      id: "wpld",
      value: "LD Weapon",
      label: "LD Weapon"
    },
    {
      id: "wpex",
      value: "EX Weapon",
      label: "EX Weapon"
    },
    {
      id: "wpnt",
      value: "NT Weapon",
      label: "NT Weapon"
    },
    {
      id: "wpdark",
      value: "Dark Weapon",
      label: "Dark Weapon"
    },
    {
      id: "wp35",
      value: "35CP Weapon",
      label: "35CP Weapon"
    },
    {
      id: "wpwoi",
      value: "WoI Weapon",
      label: "WoI Weapon"
    },
    {
      id: "wp15",
      value: "15CP Weapon",
      label: "15CP Weapon"
    },
    {
      id: "wp4w",
      value: "4★ Weapon",
      label: "4★ Weapon"
    },
    {
      id: "armbloom",
      value: "Bloom Stone",
      label: "Bloom Stone"
    },
    {
      id: "arm7aplus",
      value: "7★+ Armor",
      label: "7★+ Armor"
    },
    {
      id: "arm7a",
      value: "7★ Armor",
      label: "7★ Armor"
    },
    {
      id: "armhgplus",
      value: "HG+ Armor",
      label: "HG+ Armor"
    },
    {
      id: "armhg",
      value: "HG Armor",
      label: "HG Armor"
    },
    {
      id: "arm35a",
      value: "35CP Armor",
      label: "35CP Armor"
    },
    {
      id: "arm4a",
      value: "4★ Armor",
      label: "4★ Armor"
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

  const listPassives = listDisplay;

  if (equipment_passive_ability.length == 0) {
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
                placeholder="Gear Select..."
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
          {
            listPassives.length > 0 ? (
              listPassives.map(gear => (
                <LazyLoadComponent
                  key={`${gear.equip_id}-${gear.chara_id}`}
                  scrollPosition={scrollPosition}
                  placeholder={<div className='infoholder' style={{ minHeight: "350px" }}>
                                  <img className="loadingbardots" src="./images/static/site/loading.gif"/>
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
                  debugging={true}
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