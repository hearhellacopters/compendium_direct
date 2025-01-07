import React, { useState, useEffect } from 'react';
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
import SummonAbilityHandler from '../components/Abilities/SummonAbilityHandler.js';
import { getQuery, getQueryStringVal, useQueryParam } from '../components/URLParams';
import { LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';

function SummonAbility ({
  ver,
  loc,
  file,
  newcompare,
  master_index,
  summon_ability,
  scrollPosition
}) {

  const CommandNames = master_index.commands

  const rawData = Object.values(summon_ability)

  const banerDisplayTerm = "summon abilities"

  const startinglimit = 20

  const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null ? true : false);
  const [clearFilter, setclearFilter] = useStateIfMounted(false);
  const [formatting, setformatting] = useStateIfMounted(true);

  const [loop, setLoop] = useStateIfMounted(false);
  const [reverse, setReverse] = useState(getQueryStringVal("rev") != null ? true : false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchdisplay, setsearchdisplay] = useState("");
  const [condFilter, setCondFilter] = useState("");
  const [valuedisplay, setvaluedisplay] = useState("");
  const [valuedisplay2, setvaluedisplay2] = useState("");
  const [valuedisplay3, setvaluedisplay3] = useState("");
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
  const { protocol, pathname, host } = window.location;
  const query = getQuery();
  const url = `${protocol}//${host}${pathname}?${query.toString()}`
  const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
  const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
  const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");

  useEffect(() => {
    //type params2
    const type1 = [
      {
        "value": "Relm",
        "label": "Relm"
      },
      {
        "value": "Ifrit",
        "label": "Ifrit"
      },
      {
        "value": "Shiva",
        "label": "Shiva"
      },
      {
        "value": "Ramuh",
        "label": "Ramuh"
      },
      {
        "value": "Leviathan",
        "label": "Leviathan"
      },
      {
        "value": "The Brothers",
        "label": "The Brothers"
      },
      {
        "value": "Pandemonium",
        "label": "Pandemonium"
      },
      {
        "value": "Diabolos",
        "label": "Diabolos"
      },
      {
        "value": "Alexander",
        "label": "Alexander"
      },
      {
        "value": "Odin",
        "label": "Odin"
      },
      {
        "value": "Bahamut",
        "label": "Bahamut"
      },
      {
        "value": "Chocobo",
        "label": "Chocobo"
      },
      {
        "value": "Sylph",
        "label": "Sylph"
      },
      {
        "value": "Mog",
        "label": "Mog"
      }
    ]
    if (Typesearch != "") {
      const filteredtype = Object.values(type1).filter(self => self.label == getQueryStringVal("char"))
      if (filteredtype.length != 0) {
        setTypesearch(getQueryStringVal("char"))
        setCondFilter(filteredtype[0].value)
      } else {
        setTypesearch("")
        setCondFilter("")
      }
    }
  }, [setCondFilter, Typesearch, setTypesearch])

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
      setCondFilter(e.value);
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

    if (AdvanceValuesearch != "") {
      const filteredout = rawData.filter(
        (command) =>
          command && command.ability == AdvanceValuesearch
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
      (`${command.ability && command.ability ? CommandNames[command.ability] && CommandNames[command.ability].jpname : ""} ${command.ability && command.ability ? CommandNames[command.ability] && CommandNames[command.ability].name : ""} - #${command.ability}`).toLowerCase().includes(searchTerm)
    );
    const getailmentfilter2 = searchit.filter(function (ef) {
      const newfilterpull = ef.Name && ef.Name === condFilter;
      if (condFilter !== "") {
        return newfilterpull;
      } else {
        return ef
      }
    });
    setFilterResults(makeUnique);
    setSearchResults(getailmentfilter2);
    const newlistdisplay = getailmentfilter2.slice(0, limits);
    if (limits < getailmentfilter2.length) {
      setShowLoadMore(true);
      setListDisplay(newlistdisplay);
      setListLength(getailmentfilter2.length);
      setDisplayBanner(
        `Displaying ${newlistdisplay.length} of ${getailmentfilter2.length} ${banerDisplayTerm}`
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
  }, [searchTerm, clearFilter, condFilter, AdvanceValuesearch, AdvanceValuesearch2, AdvanceValuesearch3, reverse]);

  const typeListArray = [
    {
      "value": "Relm",
      "label": "Relm"
    },
    {
      "value": "Ifrit",
      "label": "Ifrit"
    },
    {
      "value": "Shiva",
      "label": "Shiva"
    },
    {
      "value": "Ramuh",
      "label": "Ramuh"
    },
    {
      "value": "Leviathan",
      "label": "Leviathan"
    },
    {
      "value": "The Brothers",
      "label": "The Brothers"
    },
    {
      "value": "Pandemonium",
      "label": "Pandemonium"
    },
    {
      "value": "Diabolos",
      "label": "Diabolos"
    },
    {
      "value": "Alexander",
      "label": "Alexander"
    },
    {
      "value": "Odin",
      "label": "Odin"
    },
    {
      "value": "Bahamut",
      "label": "Bahamut"
    },
    {
      "value": "Chocobo",
      "label": "Chocobo"
    },
    {
      "value": "Sylph",
      "label": "Sylph"
    },
    {
      "value": "Mog",
      "label": "Mog"
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

  //clear
  const resetbutton = () => {
    setclearFilter(true);
    setReverse(false)

    setAdvanceValuesearch("")
    setReversesearch("")
    setTEXTsearch("")
    setTypesearch("")
    setsearchdisplay("");
    setSearchTerm("");
    setCondFilter("")
    setvaluedisplay("")
    setvaluedisplay2("")
    setvaluedisplay3("")

    setTimeout(() => setclearFilter(false), 1000);
  }

  const commandList = listDisplay;

  return (
    <div>
      <br />
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
        <div className="similarbanner">Command Finder</div>
        <div className="filterholderflair">
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
          <div className="similarbanner">Cast Finder</div>
          <div className="not_rangeholder">
            Cast ID
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
          <div className="not_rangeholder">
            Ailment ID
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
          <br />
          <div className="similarbanner">Filters</div>
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
              placeholder="Summon Select..."
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
                id="search5"
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
            <SummonAbilityHandler
              key={cmd.data_id}
              summon_ability={cmd}
              ver={ver}
              loc={loc}
              file={file}
              debugging={true}
              master_index={master_index}
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

export default trackWindowScroll(SummonAbility)