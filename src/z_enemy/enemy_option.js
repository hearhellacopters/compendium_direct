import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
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
import OptionStandalone from '../components/Abilities/OptionStandalone';
import { getQuery, getQueryStringVal, useQueryParam } from '../components/URLParams';
import reactStringReplace from "react-string-replace";
import { LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';

function EnemyOption ({
  ver,
  loc,
  file,
  newcompare,

  master_index,

  enemy_names,

  enemy_option,
  scrollPosition
}) {

  const rawData = Object.values(enemy_option)

  const banerDisplayTerm = "enemy options";

  const startinglimit = 50

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
  const [valuedisplay, setvaluedisplay] = useState("");
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
  const [Typesearch, setTypesearch] = useQueryParam("label", "");
  const [Typesearch2, setTypesearch2] = useQueryParam("char", "");
  const [Typesearch3, setTypesearch3] = useQueryParam("type", "");
  const [AdvanceValuesearch, setAdvanceValuesearch] = useQueryParam("value", "");
  const { protocol, pathname, host } = window.location;
  const query = getQuery();
  const url = `${protocol}//${host}${pathname}?${query.toString()}`
  const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
  const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
  const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");

  useEffect(() => {
    //type params
    if (Typesearch != "") {
      const filteredtype = Object.values(master_index.option_trans_data.option_labels).filter(self => self.label == getQueryStringVal("label"))
      if (filteredtype.length != 0) {
        setTypesearch(getQueryStringVal("label"))
        setCondFilter(filteredtype[0].id)
      } else {
        setTypesearch("")
        setCondFilter("")
      }
    }
  }, [setCondFilter, Typesearch, setTypesearch, master_index])

  useEffect(() => {
    //search params
    if (getQueryStringVal("value") != null) {
      setvaluedisplay(getQueryStringVal("value") != null ? getQueryStringVal("value") : "")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(() => {
    //type params
    if (Typesearch2 != "") {
      const name_ = getQueryStringVal("char") != null ? getQueryStringVal("char").toString().replace(/(.+?) - \d+/gm, "$1") : ""
      var replace = `(?:${name_.replace(/\(/gm, "\\(").replace(/\)/gm, "\\)")} - )(\\d+)`;
      var re = new RegExp(replace, "g");
      const id_number = getQueryStringVal("char") != null ? getQueryStringVal("char").toString().replace(re, "$1") : ""
      const filteredtype = Object.values(enemy_names).filter(self => self.name == name_ && self.id == id_number)
      if (filteredtype.length != 0) {
        setTypesearch2(getQueryStringVal("char"))
        setCondFilter2(filteredtype[0].id)
      } else {
        setTypesearch2("")
        setCondFilter2("")
      }
    }
  }, [setCondFilter2, enemy_names, Typesearch2, setTypesearch2])

  useEffect(() => {
    //type params2
    if (Typesearch3 != "") {
      const filteredtype3 = Object.values(master_index.option_trans_data.option_type_).filter(self => self.option_type_ == getQueryStringVal("type"))

      if (filteredtype3.length != 0) {
        setTypesearch3(getQueryStringVal("type"))
        setCondFilter3(filteredtype3[0].id)
      } else {
        setTypesearch3("")
        setCondFilter3("")
      }
    }
  }, [setCondFilter3, master_index, Typesearch3, setTypesearch3])


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

  useEffect(() => {
    const filterholder = [];
    if (AdvanceValuesearch != "") {
      const filteredout = rawData.filter(
        (command) =>
          command && command.original_label_ == AdvanceValuesearch ||
          command && command.change_label_ == AdvanceValuesearch
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
      (`${ailment.chara_id_ && enemy_names[ailment.chara_id_] && enemy_names[ailment.chara_id_].name} - #${ailment.data_id}`).toLowerCase().includes(searchTerm)
    );
    const getailmentfilter2 = searchit.filter(function (ef) {
      const newfilterpull = ef["require_label_"] === condFilter || ef["require_label2_"] === condFilter;
      if (condFilter !== "") {
        return newfilterpull;
      } else {
        return ef
      }
    });
    const getailmentfilter3 = getailmentfilter2.filter(function (ef) {
      const newfilterpull = ef["chara_id_"] === condFilter2;
      if (condFilter2 !== "") {
        return newfilterpull;
      } else {
        return ef
      }
    });
    const getailmentfilter = getailmentfilter3.filter(function (ef) {
      const newfilterpull = ef["option_type_"] === condFilter3;
      if (condFilter3 !== "") {
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
  }, [searchTerm, clearFilter, condFilter, condFilter2, condFilter3, reverse, AdvanceValuesearch]);

  //type list
  const typeListArray = Object.values(master_index.option_trans_data.option_labels).map((typeListUnique) => ({
    value: typeListUnique.label,
    label: typeListUnique.label,
    id: typeListUnique.id,
  }));

  //type list
  const typeListArray2 = Object.values(enemy_names).map((typeListUnique) => ({
    value: `${typeListUnique.name} - ${typeListUnique.id}`,
    label: `${typeListUnique.name} - ${typeListUnique.id}`,
    id: typeListUnique.id,
  }));

  //type list
  const typeListArray3 = Object.values(master_index.option_trans_data.option_type_).map((typeListUnique) => ({
    value: typeListUnique.option_type_,
    label: typeListUnique.option_type_,
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

  const searchobjects = () => {
    setAdvanceValuesearch(valuedisplay)
  }

  const clearSearchValue = () => {
    setclearFilter(true);
    setTimeout(() => setclearFilter(false), 1000);
  };

  useEffect(() => {
    if (clearFilter == true) {
      if (valuedisplay != "") {
        setvaluedisplay("")
      }
    }
    if (clearFilter == true) {
      if (AdvanceValuesearch != "") {
        setAdvanceValuesearch("")
      }
    }
  }, [clearFilter, setAdvanceValuesearch, AdvanceValuesearch, valuedisplay, url])


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

    setAdvanceValuesearch("")
    setReversesearch("")
    setTEXTsearch("")
    setTypesearch("")
    setTypesearch2("")
    setTypesearch3("")
    setsearchdisplay("")
    setSearchTerm("")
    setCondFilter("")
    setCondFilter2("")
    setCondFilter3("")
    setvaluedisplay("")

    setTimeout(() => setclearFilter(false), 1000);
  }

  const optionList = listDisplay;

  const addformatting = (text) => {
    let replacement = text
    var number = 0

    replacement = replacement == "" ? undefined : reactStringReplace(replacement, /(\d*)/, (match, i) => {
      number = number + 1
      return (
        <span key={`1-${i}-${number}`} className="subtextgold">{match}</span>
      )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\\n)/, (match, i) => {
      number = number + 1
      return (
        <br key={`10-${i}-${number}`} />
      )
    })
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\n)/, (match, i) => {
      number = number + 1
      return (
        <br key={`11-${i}-${number}`} />
      )
    })
    return (
      replacement
    )
  }

  return (
    <div>
      <br />
      <div className="charfilterspacer" />
      <div key="filter1" onClick={showfilterbutton} className="charfilter"><span className="filterstext"></span>{showFilter ? <TiArrowSortedUp className="uparrow" /> : <TiArrowSortedDown className="downarrow" />}</div>
      <div className="event-search-reverse-holder">
        {showFilter == true ? "" :
          <ul className="bufftypes">
            <Link to={`/${ver}/charability/${file}/compare`} >
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
            <Link to={`/${ver}/enemyabilities/${file}/new`} >
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
            <Link to={`/${ver}/enemyabilities/${file}/compare?filter=true`} >
              <Tippy content={`Added from update`}>
                <li className={`${newcompare == "compare" ? "filteractive" : "filterinactive"} buffbutton newbutton`}></li>
              </Tippy>
            </Link>
            <Link to={`/${ver}/enemyabilities/${file}/new?filter=true`} >
              <Tippy content={`Full list`}>
                <li className={`${newcompare == "new" ? "filteractive" : "filterinactive"} buffbutton fullbutton`}></li>
              </Tippy>
            </Link>
          </ul>
          <div className="similarbanner">Command ID Finder</div>
          <div className="not_rangeholder">
            Command ID
            <div className="labelmax">
              <input
                className="not_numberbox"
                placeholder="5"
                id="search2"
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
          <br />
          <div className="similarbanner">Filters</div>
          <div className="margeholder">
            <div className="Merge">
                <Tippy content="Replaces tags with images">
                  <label htmlFor='search' className="MergeText">Formatting?</label>
                </Tippy>
                <div key="mergecheck1" className={`${formatting == true ? "nodisplay" : `uncheck`}`} onClick={() => setformatting((prev) => !prev)} />
                <div key="mergecheck2" className={`${formatting == true ? "check" : `nodisplay`}`} onClick={() => setformatting((prev) => !prev)} />
              </div>
            </div>
          <div className="typeholder">
            <Select
              defaultValue={Typesearch3 != "" ? { value: Typesearch3, label: Typesearch3 } : null}
              key={Typesearch3}
              isSearchable={true}
              placeholder="Type Select..."
              className='typecontainer'
              classNamePrefix="typetext"
              onChange={CondSelect3}
              options={typeListArray3}
              isClearable={true}
            />
          </div>
          <div className="typeholder">
            <Select
              defaultValue={Typesearch2 != "" ? { value: Typesearch2, label: Typesearch2 } : null}
              key={Typesearch2}
              isSearchable={true}
              placeholder="Enemy Select..."
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
              placeholder="Label Select..."
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
                id="search3"
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
        {optionList.length > 0 ? (
          optionList.map(option => (
            <LazyLoadComponent
              key={option.data_id}
              scrollPosition={scrollPosition}
              placeholder={<div className="buffunit infoholder" style={{ minHeight: `250px` }}>
                <img className="loadingbardots" src="/images/static/site/loading.gif"/>
              </div>
                }
              >
            <OptionStandalone
              key={option.data_id}
              character_option={option}
              ver={ver}
              enemy_names={enemy_names}
              master_index={master_index}
              enemy={true}
              formatting={formatting}
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

export default trackWindowScroll(EnemyOption)