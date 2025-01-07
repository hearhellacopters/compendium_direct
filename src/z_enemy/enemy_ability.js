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
import { FaUndoAlt } from 'react-icons/fa'
import AbilityPars from '../components/Abilities/AbilityPars';
import { getQuery, getQueryStringVal, useQueryParam } from '../components/URLParams';
import { LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';

function EnemyAbility ({
  ver,
  loc,
  file,
  newcompare,
  master_index,
  enemy_names,
  enemy_ability,
  scrollPosition
}) {

  const CommandNames = master_index.commands

  const rawData = Object.values(enemy_ability)

  const banerDisplayTerm = "enemy abilities"

  const startinglimit = 20

  const [formatting, setformatting]  = useStateIfMounted(true);

  const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null ? true : false);
  const [clearFilter, setclearFilter] = useStateIfMounted(false);

  const [loop, setLoop] = useStateIfMounted(false);
  const [reverse, setReverse] = useState(getQueryStringVal("rev") != null ? true : false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchdisplay, setsearchdisplay] = useState("");
  const [condFilter, setCondFilter] = useState("");
  const [valuedisplay, setvaluedisplay] = useState("");
  const [valuedisplay2, setvaluedisplay2] = useState("");
  const [valuedisplay3, setvaluedisplay3] = useState("");
  const [valuedisplay4, setvaluedisplay4] = useState("");
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
  const [AdvanceValuesearch, setAdvanceValuesearch] = useQueryParam("command", "");
  const [AdvanceValuesearch2, setAdvanceValuesearch2] = useQueryParam("cast", "");
  const [AdvanceValuesearch3, setAdvanceValuesearch3] = useQueryParam("ailment", "");
  const [AdvanceValuesearch4, setAdvanceValuesearch4] = useQueryParam("hit_data", "");
  const { protocol, pathname, host } = window.location;
  const query = getQuery();
  const url = `${protocol}//${host}${pathname}?${query.toString()}`
  const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
  const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
  const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");

  useEffect(() => {
    //type params
    if (Typesearch != "") {
      const name_ = getQueryStringVal("char") != null ? getQueryStringVal("char").toString().replace(/(.+?) - \d+/gm, "$1") : ""
      var replace = `(?:${name_.replace(/\(/gm, "\\(").replace(/\)/gm, "\\)")} - )(\\d+)`;
      var re = new RegExp(replace, "g");
      const id_number = getQueryStringVal("char") != null ? getQueryStringVal("char").toString().replace(re, "$1") : ""
      const filteredtype = Object.values(enemy_names).filter(self => self.name == name_ && self.id == id_number)
      if (filteredtype.length != 0) {
        setTypesearch(getQueryStringVal("char"))
        setCondFilter(filteredtype[0].id)
      } else {
        setTypesearch("")
        setCondFilter("")
      }
    }
  }, [setCondFilter, enemy_names, Typesearch, setTypesearch])

  useEffect(() => {
    //search params
    if (getQueryStringVal("command") != null) {
      setvaluedisplay(getQueryStringVal("command") != null ? getQueryStringVal("command") : "")
    }
  }, [setvaluedisplay])

  useEffect(() => {
    //search params
    if (getQueryStringVal("cast") != null) {
      setvaluedisplay2(getQueryStringVal("cast") != null ? getQueryStringVal("cast") : "")
    }
  }, [setvaluedisplay2])

  useEffect(() => {
    //search params
    if (getQueryStringVal("ailment") != null) {
      setvaluedisplay3(getQueryStringVal("ailment") != null ? getQueryStringVal("ailment") : "")
    }
  }, [setvaluedisplay3])

  useEffect(() => {
    //search params
    if (getQueryStringVal("hit_data") != null) {
      setvaluedisplay4(getQueryStringVal("hit_data") != null ? getQueryStringVal("hit_data") : "")
    }
  }, [setvaluedisplay4])


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

  //unique
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }


  useEffect(() => {
    const filterholder = [];
    if (AdvanceValuesearch3 != "") {
      const filteredout = rawData.filter(
        (command) =>
          command && command.command && command.command.casts &&
          command.command.casts.some(self => (
            self.id == AdvanceValuesearch3
          ))

      );
      filterholder.push(...filteredout);
    }

    if (AdvanceValuesearch2 != "") {
      const filteredout = rawData.filter(
        (command) =>
          command && command.command && command.command.atype == AdvanceValuesearch2 ||
          command && command.command && command.command.atype_1 == AdvanceValuesearch2 ||
          command && command.command && command.command.atype_2 == AdvanceValuesearch2 ||
          command && command.command && command.command.atype_3 == AdvanceValuesearch2 ||
          command && command.command && command.command.atype_4 == AdvanceValuesearch2 ||
          command && command.command && command.command.atype_5 == AdvanceValuesearch2 ||
          command && command.command && command.command.atype_6 == AdvanceValuesearch2 ||
          command && command.command && command.command.atype_7 == AdvanceValuesearch2 ||
          command && command.command && command.command.atype_8 == AdvanceValuesearch2 ||
          command && command.command && command.command.atype_9 == AdvanceValuesearch2
      );
      filterholder.push(...filteredout);
    }

    if (AdvanceValuesearch4 != "") {
      const filteredout = rawData.filter(
        (command) =>
          command && command.hit_data_id && command.hit_data_id == AdvanceValuesearch4 ||
          command && command.hit_data_id_1 && command.hit_data_id_1 == AdvanceValuesearch4 ||
          command && command.hit_data_id_2 && command.hit_data_id_2 == AdvanceValuesearch4 ||
          command && command.hit_data_id_3 && command.hit_data_id_3 == AdvanceValuesearch4 ||
          command && command.hit_data_id_4 && command.hit_data_id_4 == AdvanceValuesearch4 ||
          command && command.hit_data_id_5 && command.hit_data_id_5 == AdvanceValuesearch4 ||
          command && command.hit_data_id_6 && command.hit_data_id_6 == AdvanceValuesearch4 ||
          command && command.hit_data_id_7 && command.hit_data_id_7 == AdvanceValuesearch4 ||
          command && command.hit_data_id_8 && command.hit_data_id_8 == AdvanceValuesearch4 ||
          command && command.hit_data_id_9 && command.hit_data_id_9 == AdvanceValuesearch4 ||
          command && command.hit_data_id_10 && command.hit_data_id_10 == AdvanceValuesearch4 ||
          command && command.hit_data_id_11 && command.hit_data_id_11 == AdvanceValuesearch4 ||
          command && command.hit_data_id_12 && command.hit_data_id_12 == AdvanceValuesearch4 ||
          command && command.hit_data_id_13 && command.hit_data_id_13 == AdvanceValuesearch4 ||
          command && command.hit_data_id_14 && command.hit_data_id_14 == AdvanceValuesearch4 ||
          command && command.hit_data_id_15 && command.hit_data_id_15 == AdvanceValuesearch4 ||
          command && command.hit_data_id_16 && command.hit_data_id_16 == AdvanceValuesearch4 ||
          command && command.hit_data_id_17 && command.hit_data_id_17 == AdvanceValuesearch4 ||
          command && command.hit_data_id_18 && command.hit_data_id_18 == AdvanceValuesearch4 ||
          command && command.hit_data_id_19 && command.hit_data_id_19 == AdvanceValuesearch4 ||
          command && command.hit_data_id_20 && command.hit_data_id_20 == AdvanceValuesearch4 ||
          command && command.hit_data_id_21 && command.hit_data_id_21 == AdvanceValuesearch4 ||
          command && command.hit_data_id_22 && command.hit_data_id_22 == AdvanceValuesearch4 ||
          command && command.hit_data_id_23 && command.hit_data_id_23 == AdvanceValuesearch4 ||
          command && command.hit_data_id_24 && command.hit_data_id_24 == AdvanceValuesearch4 ||
          command && command.hit_data_id_25 && command.hit_data_id_25 == AdvanceValuesearch4 ||
          command && command.hit_data_id_26 && command.hit_data_id_26 == AdvanceValuesearch4 ||
          command && command.hit_data_id_27 && command.hit_data_id_27 == AdvanceValuesearch4 ||
          command && command.hit_data_id_28 && command.hit_data_id_28 == AdvanceValuesearch4 ||
          command && command.hit_data_id_29 && command.hit_data_id_29 == AdvanceValuesearch4 ||
          command && command.hit_data_id_30 && command.hit_data_id_30 == AdvanceValuesearch4 ||
          command && command.hit_data_id_31 && command.hit_data_id_31 == AdvanceValuesearch4 ||
          command && command.hit_data_id_32 && command.hit_data_id_32 == AdvanceValuesearch4 ||
          command && command.hit_data_id_33 && command.hit_data_id_33 == AdvanceValuesearch4 ||
          command && command.hit_data_id_34 && command.hit_data_id_34 == AdvanceValuesearch4 ||
          command && command.hit_data_id_35 && command.hit_data_id_35 == AdvanceValuesearch4 ||
          command && command.hit_data_id_36 && command.hit_data_id_36 == AdvanceValuesearch4 ||
          command && command.hit_data_id_37 && command.hit_data_id_37 == AdvanceValuesearch4 ||
          command && command.hit_data_id_38 && command.hit_data_id_38 == AdvanceValuesearch4 ||
          command && command.hit_data_id_39 && command.hit_data_id_39 == AdvanceValuesearch4

      );
      filterholder.push(...filteredout);
    }

    if (AdvanceValuesearch != "") {
      const filteredout = rawData.filter(
        (command) =>
          command && command.abilityid_ == AdvanceValuesearch
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
    const searchit = makeUnique.filter((command) =>
      (`${command.abilityid_ && command.abilityid_ ? CommandNames[command.abilityid_] && CommandNames[command.abilityid_].jpname : ""} ${command.abilityid_ && command.abilityid_ ? CommandNames[command.abilityid_] && CommandNames[command.abilityid_].name : ""} - #${command.abilityid_}`).toLowerCase().includes(searchTerm)
    );
    const getailmentfilter = searchit.filter(function (ef) {
      const newfilterpull = ef["enemyID"] == condFilter;
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
  }, [searchTerm, clearFilter, condFilter, AdvanceValuesearch, AdvanceValuesearch2, AdvanceValuesearch3, reverse, AdvanceValuesearch4]);

  //type list
  const typeListArray = Object.values(enemy_names).map((typeListUnique) => ({
    value: `${typeListUnique.name} - ${typeListUnique.id}`,
    label: `${typeListUnique.name} - ${typeListUnique.id}`,
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
    setvaluedisplay("")
    setAdvanceValuesearch("")
  };

  const changeend = (event) => {
    setvaluedisplay(event.target.value)

  }
  const handleKeyPressValue = (event) => {
    if (event.key === 'Enter') {
      setAdvanceValuesearch(valuedisplay);
    }
  }

  const searchobjects2 = () => {
    setAdvanceValuesearch2(valuedisplay2)
  }

  const clearSearchValue2 = () => {
    setvaluedisplay2("")
    setAdvanceValuesearch2("")
  };

  const changeend2 = (event) => {
    setvaluedisplay2(event.target.value)

  }
  const handleKeyPressValue2 = (event) => {
    if (event.key === 'Enter') {
      setAdvanceValuesearch2(valuedisplay2);
    }
  }

  const searchobjects3 = () => {
    setAdvanceValuesearch3(valuedisplay3)
  }

  const clearSearchValue3 = () => {
    setvaluedisplay3("")
    setAdvanceValuesearch3("")
  };

  const changeend3 = (event) => {
    setvaluedisplay3(event.target.value)

  }
  const handleKeyPressValue3 = (event) => {
    if (event.key === 'Enter') {
      setAdvanceValuesearch3(valuedisplay3);
    }
  }

  const searchobjects4 = () => {
    setAdvanceValuesearch4(valuedisplay4)
  }

  const clearSearchValue4 = () => {
    setAdvanceValuesearch4("")
    setvaluedisplay4("")
  };

  const changeend4 = (event) => {
    setvaluedisplay4(event.target.value)

  }
  const handleKeyPressValue4 = (event) => {
    if (event.key === 'Enter') {
      setAdvanceValuesearch4(valuedisplay4);
    }
  }

  //clear
  const resetbutton = () => {
    setclearFilter(true);
    setReverse(false)


    setAdvanceValuesearch("")
    setAdvanceValuesearch2("")
    setAdvanceValuesearch3("")
    setAdvanceValuesearch4("")
    setReversesearch("")
    setTEXTsearch("")
    setTypesearch("")
    setsearchdisplay("");
    setSearchTerm("");
    setCondFilter("")
    setvaluedisplay("")
    setvaluedisplay2("")
    setvaluedisplay3("")
    setvaluedisplay4("")

    setTimeout(() => setclearFilter(false), 1000);
  }

  const commandList = listDisplay;

  return (
    <div>
      <br />
      <div className="charfilterspacer" />
      <div key="filter1" onClick={showfilterbutton} className="charfilter"><span className="filterstext"></span>{showFilter ? <TiArrowSortedUp className="uparrow" /> : <TiArrowSortedDown className="downarrow" />}</div>
      <div className="event-search-reverse-holder">
        {showFilter == true ? "" :
          <ul className="bufftypes">
            <Link to={`/${ver}/${"enemyabilities"}/${file}/compare`} >
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
            <Link to={`/${ver}/${"enemyabilities"}/${file}/new`} >
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
            <Link to={`/${ver}/${"enemyabilities"}/${file}/compare?filter=true`} >
              <Tippy content={`Added from update`}>
                <li className={`${newcompare == "compare" ? "filteractive" : "filterinactive"} buffbutton newbutton`}></li>
              </Tippy>
            </Link>
            <Link to={`/${ver}/${"enemyabilities"}/${file}/new?filter=true`} >
              <Tippy content={`Full list`}>
                <li className={`${newcompare == "new" ? "filteractive" : "filterinactive"} buffbutton fullbutton`}></li>
              </Tippy>
            </Link>
          </ul>
          <div className="similarbanner">ID Finder</div>
          <div className='muliwrap'>
            <div className='makespace'>
              <div className="not_rangeholder">
                Command
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
            </div>
            <div className='makespace'>
              <div className="not_rangeholder">
                Cast
                <div className="labelmax">
                  <input
                    className="not_numberbox"
                    placeholder="5"
                    id="search3"
                    value={valuedisplay2}
                    onChange={changeend2}
                    onKeyDown={handleKeyPressValue2}
                  >
                  </input>
                  {valuedisplay2 === "" ? "" :
                    <IoMdCloseCircleOutline onClick={clearSearchValue2} className="clearsearch"></IoMdCloseCircleOutline>}
                </div>
              </div>
              <div className="loadmore" onClick={searchobjects2}>
                Search
              </div>
            </div>
            <div className='makespace'>
              <div className="not_rangeholder">
                Ailment
                <div className="labelmax">
                  <input
                    className="not_numberbox"
                    placeholder="5"
                    id="search4"
                    value={valuedisplay3}
                    onChange={changeend3}
                    onKeyDown={handleKeyPressValue3}
                  >
                  </input>
                  {valuedisplay3 === "" ? "" :
                    <IoMdCloseCircleOutline onClick={clearSearchValue3} className="clearsearch"></IoMdCloseCircleOutline>}
                </div>
              </div>
              <div className="loadmore" onClick={searchobjects3}>
                Search
              </div>
            </div>
            <div className='makespace'>
              <div className="not_rangeholder">
                Hit Data
                <div className="labelmax">
                  <input
                    className="not_numberbox"
                    placeholder="5"
                    id="search5"
                    value={valuedisplay4}
                    onChange={changeend4}
                    onKeyDown={handleKeyPressValue4}
                  >
                  </input>
                  {valuedisplay4 === "" ? "" :
                    <IoMdCloseCircleOutline onClick={clearSearchValue4} className="clearsearch"></IoMdCloseCircleOutline>}
                </div>
              </div>
              <div className="loadmore" onClick={searchobjects4}>
                Search
              </div>
            </div>
          </div>
          <br />
          <div className="similarbanner">Filters</div>
          <div className="typeholder">
            <div className="margeholder">
              <div className="Merge">
                <Tippy content="Replaces tags with images">
                  <label htmlFor='search' className="MergeText">Formatting?</label>
                </Tippy>
                <div key="mergecheck1" className={`${formatting == true ? "nodisplay" : `uncheck`}`} onClick={() => setformatting((prev) => !prev)} />
                <div key="mergecheck2" className={`${formatting == true ? "check" : `nodisplay`}`} onClick={() => setformatting((prev) => !prev)} />
              </div>
            </div>
            <Select
              defaultValue={Typesearch != "" ? { value: Typesearch, label: Typesearch } : null}
              key={Typesearch}
              isSearchable={true}
              placeholder="Enemy Select..."
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
                id="search6"
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
        {commandList.length > 0 ? (
          commandList.map(cmd => (
            <LazyLoadComponent
            key={cmd.data_id}
            scrollPosition={scrollPosition}
            placeholder={<div className="buffunit">
                            <div className="infoholder" style={{ minHeight: "220px" }}>
                            <img className="loadingbardots" src="./images/static/site/loading.gif"/>
                            </div>
                        </div>}
            >
            <AbilityPars
              key={cmd.data_id}
              character_ability={cmd}
              ver={ver}
              loc={loc}
              file={file}
              enemy_names={enemy_names}
              formatting={formatting}
              master_index={master_index}
              enemy={true}
              debugging={true}
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

export default trackWindowScroll(EnemyAbility)