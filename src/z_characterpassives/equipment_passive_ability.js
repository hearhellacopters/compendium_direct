import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Tippy from '../components/TippyDefaults';
import { useStateIfMounted } from "use-state-if-mounted";
import Select from 'react-select';
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaShareSquare } from 'react-icons/fa';
import { FaUndoAlt } from 'react-icons/fa';
import PassiveAbilityFormatting from '../components/Passives/PassiveAbilityFormatting';
import { getQuery, getQueryStringVal, useQueryParam } from '../components/URLParams';
import { LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';

function EquipmentPassiveAbility ({
  ver,
  loc,
  file,
  newcompare,
  master_index,
  equipment_passive_ability,
  scrollPosition
}) {

  const rawData = Object.values(equipment_passive_ability)

  const banerDisplayTerm = "equipment passive abilities";

  const startinglimit = 20

  const [formatting, setformatting] = useStateIfMounted(true);

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
        id: "ultima",
        value: "Ultima Weapon",
        label: "Ultima Weapon"
      },
      {
        id: "wpbtplus",
        value: "BT+ Weapon",
        label: "BT+ Weapon"
      },
      {
        id: "wpbtplus0",
        value: "BT+ Weapon LB0",
        label: "BT+ Weapon LB0"
      },
      {
        id: "wpbtplus1",
        value: "BT+ Weapon LB1",
        label: "BT+ Weapon LB1"
      },
      {
        id: "wpbtplus2",
        value: "BT+ Weapon LB2",
        label: "BT+ Weapon LB2"
      },
      {
        id: "wpbtplus3",
        value: "BT+ Weapon LB3",
        label: "BT+ Weapon LB3"
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
        id: "wpfr0",
        value: "FR Weapon LB0",
        label: "FR Weapon LB0"
      },
      {
        id: "wpfr1",
        value: "FR Weapon LB1",
        label: "FR Weapon LB1"
      },
      {
        id: "wpfr2",
        value: "FR Weapon LB2",
        label: "FR Weapon LB2"
      },
      {
        id: "wpfr3",
        value: "FR Weapon LB3",
        label: "FR Weapon LB3"
      },
      {
        id: "wpexplus",
        value: "EX+ Weapon",
        label: "EX+ Weapon"
      },
      {
        id: "wpexplus0",
        value: "EX+ Weapon LB0",
        label: "EX+ Weapon LB0"
      },
      {
        id: "wpexplus1",
        value: "EX+ Weapon LB1",
        label: "EX+ Weapon LB1"
      },
      {
        id: "wpexplus2",
        value: "EX+ Weapon LB2",
        label: "EX+ Weapon LB2"
      },
      {
        id: "wpexplus3",
        value: "EX+ Weapon LB3",
        label: "EX+ Weapon LB3"
      },
      {
        id: "wpld",
        value: "LD Weapon",
        label: "LD Weapon"
      },
      {
        id: "wpld0",
        value: "LD Weapon LB0",
        label: "LD Weapon LB0"
      },
      {
        id: "wpld1",
        value: "LD Weapon LB1",
        label: "LD Weapon LB1"
      },
      {
        id: "wpld2",
        value: "LD Weapon LB2",
        label: "LD Weapon LB2"
      },
      {
        id: "wpld1",
        value: "LD Weapon LB3",
        label: "LD Weapon LB3"
      },
      {
        id: "wpex",
        value: "EX Weapon",
        label: "EX Weapon"
      },
      {
        id: "wpex0",
        value: "EX Weapon LB0",
        label: "EX Weapon LB0"
      },
      {
        id: "wpex1",
        value: "EX Weapon LB1",
        label: "EX Weapon LB1"
      },
      {
        id: "wpex2",
        value: "EX Weapon LB2",
        label: "EX Weapon LB2"
      },
      {
        id: "wpex3",
        value: "EX Weapon LB3",
        label: "EX Weapon LB3"
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
      setCondFilter(e.id);
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
      setCondFilter3(e.id);
    } else {
      setCondFilter3("");
      setTypesearch3("")
    }
  };

  //type selector4
  const CondSelect4 = (e) => {
    if (e !== null) {
      setTypesearch4(e.label)
      setCondFilter4(e.id);
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
          a.pa_id - b.pa_id :
          b.pa_id - a.pa_id);
    const searchit = makeUnique.filter((ailment) =>
      (`${ver == "GL" ? ailment.jpname && ailment.jpname : ""} ${ailment.name} ${ver == "JP" ? ailment.glname && ailment.glname : ""} - #${ailment.pa_id}`).toLowerCase().includes(searchTerm)
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
      const newfilterpull = ef["loc_tag"] == condFilter2;
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
    value: typeListUnique.CharacterName,
    label: typeListUnique.CharacterName,
    id: typeListUnique.CharID,
  }));

  const typeListArray2 = [
    {
      id: "ultima",
      value: "Ultima Weapon",
      label: "Ultima Weapon"
    },
    {
      id: "wpbtplus",
      value: "BT+ Weapon",
      label: "BT+ Weapon"
    },
    {
      id: "wpbtplus0",
      value: "BT+ Weapon LB0",
      label: "BT+ Weapon LB0"
    },
    {
      id: "wpbtplus1",
      value: "BT+ Weapon LB1",
      label: "BT+ Weapon LB1"
    },
    {
      id: "wpbtplus2",
      value: "BT+ Weapon LB2",
      label: "BT+ Weapon LB2"
    },
    {
      id: "wpbtplus3",
      value: "BT+ Weapon LB3",
      label: "BT+ Weapon LB3"
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
      id: "wpfr0",
      value: "FR Weapon LB0",
      label: "FR Weapon LB0"
    },
    {
      id: "wpfr1",
      value: "FR Weapon LB1",
      label: "FR Weapon LB1"
    },
    {
      id: "wpfr2",
      value: "FR Weapon LB2",
      label: "FR Weapon LB2"
    },
    {
      id: "wpfr3",
      value: "FR Weapon LB3",
      label: "FR Weapon LB3"
    },
    {
      id: "wpexplus",
      value: "EX+ Weapon",
      label: "EX+ Weapon"
    },
    {
      id: "wpexplus0",
      value: "EX+ Weapon LB0",
      label: "EX+ Weapon LB0"
    },
    {
      id: "wpexplus1",
      value: "EX+ Weapon LB1",
      label: "EX+ Weapon LB1"
    },
    {
      id: "wpexplus2",
      value: "EX+ Weapon LB2",
      label: "EX+ Weapon LB2"
    },
    {
      id: "wpexplus3",
      value: "EX+ Weapon LB3",
      label: "EX+ Weapon LB3"
    },
    {
      id: "wpld",
      value: "LD Weapon",
      label: "LD Weapon"
    },
    {
      id: "wpld0",
      value: "LD Weapon LB0",
      label: "LD Weapon LB0"
    },
    {
      id: "wpld1",
      value: "LD Weapon LB1",
      label: "LD Weapon LB1"
    },
    {
      id: "wpld2",
      value: "LD Weapon LB2",
      label: "LD Weapon LB2"
    },
    {
      id: "wpld1",
      value: "LD Weapon LB3",
      label: "LD Weapon LB3"
    },
    {
      id: "wpex",
      value: "EX Weapon",
      label: "EX Weapon"
    },
    {
      id: "wpex0",
      value: "EX Weapon LB0",
      label: "EX Weapon LB0"
    },
    {
      id: "wpex1",
      value: "EX Weapon LB1",
      label: "EX Weapon LB1"
    },
    {
      id: "wpex2",
      value: "EX Weapon LB2",
      label: "EX Weapon LB2"
    },
    {
      id: "wpex3",
      value: "EX Weapon LB3",
      label: "EX Weapon LB3"
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

  const typeListArray3 = Object.values(master_index.passive_effects.effect_).filter(self => { return self.effect_type != undefined }).map((typeListUnique) => ({
    value: typeListUnique.effect_type,
    label: typeListUnique.effect_type,
    id: typeListUnique.id,
  }));

  const typeListArray4 = Object.values(master_index.passive_effects.require_passive).filter(self => { return self.require_str != undefined }).map((typeListUnique) => ({
    value: typeListUnique.require_,
    label: typeListUnique.require_,
    id: typeListUnique.id,
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

  return (
    <div>
      <br />
      <div className="charfilterspacer" />
      <div key="filter1" onClick={showfilterbutton} className="charfilter"><span className="filterstext"></span>{showFilter ? <TiArrowSortedUp className="uparrow" /> : <TiArrowSortedDown className="downarrow" />}</div>
      <div className="event-search-reverse-holder">
        {showFilter == true ? "" :
          <ul className="bufftypes">
            <Link to={`/${ver}/characterpassives/${file}/compare`} >
              <Tippy content={`Added from update`}>
                <li className={`${newcompare == "compare" ? "filteractive" : "filterinactive"} buffbutton newbutton spaceright`}></li>
              </Tippy>
            </Link>
          </ul>}
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
        {showFilter == true ? "" :
          <ul className="bufftypes">
            <Link to={`/${ver}/characterpassives/${file}/new`} >
              <Tippy content={`Full list`}>
                <li className={`${newcompare == "new" ? "filteractive" : "filterinactive"} buffbutton fullbutton`}></li>
              </Tippy>
            </Link>
          </ul>}
      </div>
      <div className="filterholder noselect" id={showFilter ? "showfilteren" : "hiddenfilteren"}>
        <div className="similarbanner">Volume Select</div>
        <div className="filterholderflair">
          <ul className="bufftypes">
            <Link to={`/${ver}/characterpassives/${file}/compare?filter=true`} >
              <Tippy content={`Added from update`}>
                <li className={`${newcompare == "compare" ? "filteractive" : "filterinactive"} buffbutton newbutton`}></li>
              </Tippy>
            </Link>
            <Link to={`/${ver}/characterpassives/${file}/new?filter=true`} >
              <Tippy content={`Full list`}>
                <li className={`${newcompare == "new" ? "filteractive" : "filterinactive"} buffbutton fullbutton`}></li>
              </Tippy>
            </Link>
          </ul>
          <div className="margeholder">
          <div className="Merge">
              <label htmlFor='search' className="MergeText">Formatting</label>
              <div key="mergecheck1" className={`${formatting == true ? "check" : `uncheck`}`} onClick={()=> { setformatting((preValue) => !preValue) }} />
            </div>
          </div>
          <div className="typeholder">
            <Select
              defaultValue={Typesearch3 != "" ? { value: Typesearch3, label: Typesearch3 } : null}
              key={Typesearch3}
              isSearchable={true}
              placeholder="Effect Select..."
              className='typecontainer'
              classNamePrefix="typetext"
              onChange={CondSelect3}
              options={typeListArray3}
              isClearable={true}
            />
          </div>
          <div className="typeholder">
            <Select
              defaultValue={Typesearch4 != "" ? { value: Typesearch4, label: Typesearch4 } : null}
              key={Typesearch4}
              isSearchable={true}
              placeholder="Require Select..."
              className='typecontainer'
              classNamePrefix="typetext"
              onChange={CondSelect4}
              options={typeListArray4}
              isClearable={true}
            />
          </div>
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
      </div>
      <div className="ultimaweaponitemholder">
        <div className="subtext">
          {displayBanner}
        </div>
        {listPassives.length > 0 ? (
          listPassives.map(passive => (
            <LazyLoadComponent
              key={passive.pa_id}
              scrollPosition={scrollPosition}
              placeholder={<div className="buffunit infoholder" style={{ minHeight: `250px` }}>
                <img className="loadingbardots" src="/images/static/site/loading.gif"/>
              </div>
                }
              >
            <PassiveAbilityFormatting
              key={passive.pa_id}
              passive_ability={passive}
              ver={ver}
              loc={loc}
              file={"passive_ability"}
              master_index={master_index}
              formatting={formatting}
              banner_color={"board4banner"}
              base_color={"bluebase"}
              debugging={true}
              release={passive.start_date}
            />
            </LazyLoadComponent>
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
  )
}

export default trackWindowScroll(EquipmentPassiveAbility)