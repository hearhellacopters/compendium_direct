import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Tippy from '../components/TippyDefaults'
import { useStateIfMounted } from "use-state-if-mounted";
import { useDispatch } from "react-redux";
import Select from 'react-select';
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaShareSquare } from 'react-icons/fa';
import { FaUndoAlt } from 'react-icons/fa'
import AilmentFieldStandalone from '../components/Buffs/AilmentFieldStandalone'
import { getQuery, getQueryStringVal, useQueryParam } from '../components/URLParams'

export default function AilmentFieldEffects ({
  ver,
  loc,
  file,
  newcompare,
  //indexes
  master_index,
  //APIs
  ailment_field_effects,

}) {

  const rawData = Object.values(ailment_field_effects)

  const dispatch = useDispatch();

  const banerDisplayTerm = "field effects";

  const startinglimit = 30

  const [formatting, setformatting] = useStateIfMounted(true);

  const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null ? true : false);
  const [clearFilter, setclearFilter] = useStateIfMounted(false);
  const [slider, setslider] = useState(getQueryStringVal("slider") != null ? true : false);

  const [loop, setLoop] = useStateIfMounted(false);
  const [reverse, setReverse] = useState(getQueryStringVal("rev") != null ? true : false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchdisplay, setsearchdisplay] = useState("");
  const [labeldisplay, setlabeldisplay] = useState("");
  const [valuedisplay, setvaluedisplay] = useState("");
  const [condFilter, setCondFilter] = useState("");
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

  const [Advancesearch, setAdvancesearch] = useQueryParam("advance", "");
  const [AdvanceValuesearch, setAdvanceValuesearch] = useQueryParam("value", "");
  const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
  const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
  const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");
  const [slidersearch, setslidersearch] = useQueryParam("slider", "");
  const [Typesearch, setTypesearch] = useQueryParam("effect", "");
  const { protocol, pathname, host } = window.location;
  const query = getQuery();
  const url = `${protocol}//${host}${pathname}?${query.toString()}`

  useEffect(() => {
    //type params
    if (Typesearch != "") {
      const filteredtype = Object.values(master_index.ailment_effect_id_index.effect_id).filter(self => self.effect_id == getQueryStringVal("effect"))
      if (filteredtype.length != 0) {
        setTypesearch(getQueryStringVal("effect"))
        setCondFilter(filteredtype[0].id)
      } else {
        setTypesearch("")
        setCondFilter("")
      }
    }
  }, [setCondFilter, master_index, Typesearch, setTypesearch])

  useEffect(() => {
    //search params
    if (getQueryStringVal("advance") != null) {
      setlabeldisplay(getQueryStringVal("advance") != null ? getQueryStringVal("advance") : "")
    }
    if (getQueryStringVal("value") != null) {
      setvaluedisplay(getQueryStringVal("value") != null ? getQueryStringVal("value") : "")
    }
  }, [setlabeldisplay, setvaluedisplay])


  const showfilterbutton = () => {
    if (showFilter == false) {
      setFiltersearch("true")
    } else {
      setFiltersearch("")
    }
    setShowFilter((prevValue) => !prevValue);
  }


  const reversebutton = () => {
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

  //button toogle
  useEffect(() => {
    if (reverse == true) {
      setReversesearch("true")
    } else {
      setReversesearch("")
    }
    if (slider == true) {
      setslidersearch("true")
    } else {
      setslidersearch("")
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Reversesearch, setReverse, reverse, slidersearch, setslider, slider, slidersearch])


  const togglesilder = () => {
    setslider((prevValue) => !prevValue);
  }


  //unique
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  //filter
  useEffect(() => {
    const filterholder = [];
    if (Advancesearch != "") {
      const filteredout = rawData.filter(
        (buffs) => buffs[Advancesearch] == AdvanceValuesearch
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
          a.data_id - b.data_id :
          b.data_id - a.data_id);
    const searchit = makeUnique.filter((ailment) =>
      (`${ailment.effect_id} - ${ailment.name && ailment.name} ${ailment.jpname && ailment.jpname}- #${ailment.ailment_id && ailment.ailment_id}`).toLowerCase().includes(searchTerm)
    );
    const getailmentfilter = searchit.filter(function (ef) {
      const newfilterpull = ef && ef.ailment_effect === condFilter;
      if (condFilter !== "") {
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
  }, [Advancesearch, AdvanceValuesearch, searchTerm, clearFilter, condFilter, reverse]);

  //type list
  const typeListArray = Object.values(master_index.ailment_effect_id_index.effect_id).map((typeListUnique) => ({
    value: typeListUnique.effect_id,
    label: typeListUnique.effect_id,
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

  //advanced
  const searchobjects = () => {
    setAdvancesearch(labeldisplay)
    setAdvanceValuesearch(valuedisplay)
  }

  const clearSearchValue = () => {
    setvaluedisplay("")
    setAdvanceValuesearch("")
  };
  const clearSearchLabel = () => {
    setlabeldisplay("")
    setAdvancesearch("")
  };

  const changestart = (event) => {
    setlabeldisplay(event.target.value)
  };
  const handleKeyPressLabel = (event) => {
    if (event.key === 'Enter') {
      setAdvancesearch(labeldisplay);
    }
  }
  const changeend = (event) => {
    setvaluedisplay(event.target.value)

  }
  const handleKeyPressValue = (event) => {
    if (event.key === 'Enter') {
      setAdvanceValuesearch(valuedisplay);
    }
  }

  //clear
  const resetbutton = () => {
    setclearFilter(true);
    setReverse(false)
    setslider(false)

    setlabeldisplay("")
    setAdvancesearch("")
    setvaluedisplay("")
    setAdvanceValuesearch("")

    setReversesearch("")
    setTEXTsearch("")
    setTypesearch("")
    setsearchdisplay("");
    setSearchTerm("");
    setCondFilter("")
    setTimeout(() => setclearFilter(false), 1000);
  }

  const listBuff = listDisplay;
  
  return (<div>
    <br />
    <div className="charfilterspacer" />
    <div key="filter1" onClick={showfilterbutton} className="charfilter"><span className="filterstext"></span>{showFilter ? <TiArrowSortedUp className="uparrow" /> : <TiArrowSortedDown className="downarrow" />}</div>
    <div className="event-search-reverse-holder">
      {showFilter == true ? "" :
        <ul className="bufftypes">
          <Link to={`/${ver}/ailments/ailment_field_effects/compare`} >
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
          <Link to={`/${ver}/ailments/ailment_field_effects/new`} >
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
          <Link to={`/${ver}/ailments/ailment_field_effects/compare?filter=true`} >
            <Tippy content={`Added from update`}>
              <li className={`${newcompare == "compare" ? "filteractive" : "filterinactive"} buffbutton newbutton`}></li>
            </Tippy>
          </Link>
          <Link to={`/${ver}/ailments/ailment_field_effects/new?filter=true`} >
            <Tippy content={`Full list`}>
              <li className={`${newcompare == "new" ? "filteractive" : "filterinactive"} buffbutton fullbutton`}></li>
            </Tippy>
          </Link>
        </ul>
        <div className="similarbanner">Advanced</div>
        <div className="not_rangeholder">
          Object Label
          <div className="labelmax">
            <input
              className="not_numberbox"
              placeholder="effect_type_id"
              id="search2"
              value={labeldisplay}
              onChange={changestart}
              onKeyDown={handleKeyPressLabel}
            >
            </input>
            {labeldisplay === "" ? "" :
              <IoMdCloseCircleOutline onClick={clearSearchLabel} className="clearsearch"></IoMdCloseCircleOutline>}
          </div>
        </div>
        <div className="not_rangeholder">
          Object Value
          <div className="labelmax">
            <input
              className="not_numberbox"
              placeholder="5"
              id="search3"
              value={valuedisplay}
              onChange={changeend}
              onKeyDown={handleKeyPressValue}
            >
            </input>
            {valuedisplay === "" ? "" :
              <IoMdCloseCircleOutline onClick={clearSearchValue} className="clearsearch"></IoMdCloseCircleOutline>}
          </div>
        </div>
        <div className="loadmore" onClick={searchobjects}>
          Search
        </div>
        <div className="margeholder">
            <div className="Merge">
              <label htmlFor='search' className="MergeText">Formatting</label>
              <div key="mergecheck1" className={`${formatting == true ? "check" : `uncheck`}`} onClick={()=> { setformatting((preValue) => !preValue) }} />
            </div>
          </div>
        <div className="typeholder">
          <Select
            defaultValue={Typesearch != "" ? { value: Typesearch, label: Typesearch } : null}
            key={Typesearch}
            isSearchable={true}
            placeholder="Effect Select..."
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
              id="search4"
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
      {listBuff.length > 0 ? (
        listBuff.map(buffs => (
          <AilmentFieldStandalone
            key={buffs.effect_id}
            ailment_field={{
              ailment_id: buffs.ailment_id,
              abyss_id: buffs.abyss_id,
              pa_id: buffs.pa_id,
              weapon_pa_id: buffs.weapon_pa_id,
              require_id: 1,
              require_id_1: -1,
              require_id_2: -1,
              effect_id:buffs
            }}
            castlocation={false}
            formatting={formatting}
            hide_type={false}
            showvalues={false}
            ver={ver}
            master_index={master_index}
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
  </div>)
}