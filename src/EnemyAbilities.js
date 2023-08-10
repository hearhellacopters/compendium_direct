import React, { useState, useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import { Link } from 'react-router-dom'
import Tippy from './components/TippyDefaults.js';
import EnemyAbilitiesListingFormattingDirect from './components/Enemy/Ability_Handler/EnemyAbilitiesListingFormatting'
import { Helmet } from 'react-helmet-async';
import Select from 'react-select';
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { FaUndoAlt } from 'react-icons/fa';
import { getQuery, getQueryStringVal, useQueryParam } from './components/URLParams'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaShareSquare } from 'react-icons/fa';
import { LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';

function EnemyAbilities({ 
  ProcessedEnemyAbilities,
  scrollPosition
}){

  const passivelimit = window.innerWidth <= 815 ? 15 : 30;

  const rawData = ProcessedEnemyAbilities;

  const banerDisplayTerm = "abilities";

  const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null ? true : false);
  const [clearFilter, setclearFilter] = useStateIfMounted(false);

  const [aoe, setaoe] = useState(getQueryStringVal("aoe") != null ? true : false);
  const [magic, setmagic] = useState(getQueryStringVal("magic") != null ? true : false);
  const [ranged, setranged] = useState(getQueryStringVal("ranged") != null ? true : false);
  const [melee, setmelee] = useState(getQueryStringVal("melee") != null ? true : false);
  const [fire, setfire] = useState(getQueryStringVal("fire") != null ? true : false);
  const [thunder, setthunder] = useState(getQueryStringVal("thunder") != null ? true : false);
  const [earth, setearth] = useState(getQueryStringVal("earth") != null ? true : false);
  const [water, setwater] = useState(getQueryStringVal("water") != null ? true : false);
  const [ice, setice] = useState(getQueryStringVal("ice") != null ? true : false);
  const [wind, setwind] = useState(getQueryStringVal("wind") != null ? true : false);
  const [holy, setholy] = useState(getQueryStringVal("holy") != null ? true : false);
  const [dark, setdark] = useState(getQueryStringVal("dark") != null ? true : false);

  const [merge, setMerge] = useState(getQueryStringVal("merge") != null ? true : false);

  const [loop, setLoop] = useStateIfMounted(false);
  const [reverse, setReverse] = useState(getQueryStringVal("rev") != null ? true : false);
  const [searchTerm, setSearchTerm] = useState(getQueryStringVal("search") != null ? getQueryStringVal("search").toLowerCase() : "");
  const [condFilter, setCondFilter] = useState("");
  const [searchdisplay, setsearchdisplay] = useState(getQueryStringVal("search") != null ? getQueryStringVal("search") : "");
  const [filterResults, setFilterResults] = useState(rawData);
  const [searchResults, setSearchResults] = useState(rawData);
  const [limits, setLimits] = useState(passivelimit);
  const [listDisplay, setListDisplay] = useState(
    rawData && rawData.slice(0, passivelimit)
  );

  const [listLength, setListLength] = useState(listDisplay.length);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [displayBanner, setDisplayBanner] = useState(
    <>Displaying <span className="subtextgold">{listLength}</span> of <span className="subtextgold"> {rawData.length}</span> {banerDisplayTerm}</>
  );


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
  const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
  const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
  const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");
  const [mergesearch, setMergesearch] = useQueryParam("merge", "");
  const [Typesearch, setTypesearch] = useQueryParam("Enemy", "");
  const [JPsearch, setJPSearch] = useQueryParam("JP", "");
  const { protocol, pathname, host } = window.location;
  const query = getQuery();
  const url = `${protocol}//${host}${pathname}?${query.toString()}`;


  useEffect(() => {
    //type params
    if (Typesearch != null) {
      const filteredtype = ProcessedEnemyAbilities.filter(function (ef) {
        const newfilterpull = ef["EnemyName"] === getQueryStringVal("Enemy");
        return newfilterpull;
      })
      if (filteredtype.length != 0) {
        setTypesearch(getQueryStringVal("Enemy"))
        setCondFilter(filteredtype[0].battle_enemy_id)
      } else {
        setTypesearch("")
        setCondFilter("")
      }
    }
  }, [setCondFilter, ProcessedEnemyAbilities, Typesearch, setTypesearch])


  useEffect(() => {
    //search params
    if (getQueryStringVal("search") != null) {
      setSearchTerm(getQueryStringVal("search") != null ? getQueryStringVal("search").toLowerCase() : "")
      setTEXTsearch(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
      setsearchdisplay(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
    }
  }, [setTEXTsearch, setFiltersearch])


  //filter
  useEffect(() => {
    if (merge != true) {
      const filterholder = [];
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


      if (filterholder.length === 0) {
        filterholder.push(...rawData);
      }
      const makeUnique = filterholder
        .filter(onlyUnique)
        .sort((a, b) =>
          reverse == false ?
            a.data_id - b.data_id :
            b.data_id - a.data_id);
      const searchit = makeUnique.filter((e) =>
        (`${e.Name} ${e.JPName}`).toLowerCase().includes(searchTerm)
      );
      const getcondfilter = searchit.filter(function (ef) {
        const newfilterpull = ef["battle_enemy_id"] === condFilter;
        if (condFilter !== "") {
          return newfilterpull;
        } else {
          return ef
        }
      });
      setFilterResults(makeUnique);
      setSearchResults(getcondfilter);
      const newlistdisplay = getcondfilter.slice(0, limits);
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
  }, [merge, searchTerm, rawData, limits, aoe, magic, ranged, melee, fire, thunder, earth, water, ice, wind, holy, dark, condFilter, reverse]);

  //filter
  useEffect(() => {
    if (merge == true) {
      const charType = {
        Magic: magic,
        Melee: melee,
        Ranged: ranged,
        Fire: fire,
        Ice: ice,
        Thunder: thunder,
        Water: water,
        Earth: earth,
        Wind: wind,
        Dark: dark,
        Holy: holy,
        AOE: aoe
      }
      const filtermerge = rawData.filter((oneChar) => {
        return Object.entries(charType)
          .filter(entry => entry[1])
          .every(([key, value]) => oneChar[key] === value);
      });

      const makeUnique = filtermerge
        .filter(onlyUnique)
        .sort((a, b) =>
          reverse == false ?
            a.data_id - b.data_id :
            b.data_id - a.data_id);
      const searchit = makeUnique.filter((e) =>
        (`${e.Name} ${e.JPName}`).toLowerCase().includes(searchTerm)
      );
      const getcondfilter = searchit.filter(function (ef) {
        const newfilterpull = ef["battle_enemy_id"] === condFilter;
        if (condFilter !== "") {
          return newfilterpull;
        } else {
          return ef
        }
      });
      setFilterResults(makeUnique);
      setSearchResults(getcondfilter);
      const newlistdisplay = getcondfilter.slice(0, limits);
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
  }, [merge, searchTerm, rawData, limits, aoe, magic, ranged, melee, fire, thunder, earth, water, ice, wind, holy, dark, condFilter, reverse]);

  //buttons
  const aoebutton = () => {
    if (aoe == false) {
      setaoesearch("true")
    } else {
      setaoesearch("")
    }
    setaoe((prevValue) => !prevValue);
  };
  const magicbutton = () => {
    if (magic == false) {
      setmagicsearch("true")
    } else {
      setmagicsearch("")
    }
    setmagic((prevValue) => !prevValue);
  };
  const rangedbutton = () => {
    if (ranged == false) {
      setrangedsearch("true")
    } else {
      setrangedsearch("")
    }
    setranged((prevValue) => !prevValue);
  };
  const meleebutton = () => {
    if (melee == false) {
      setmeleesearch("true")
    } else {
      setmeleesearch("")
    }
    setmelee((prevValue) => !prevValue);
  };
  const firebutton = () => {
    if (fire == false) {
      setfiresearch("true")
    } else {
      setfiresearch("")
    }
    setfire((prevValue) => !prevValue);
  };
  const icebutton = () => {
    if (ice == false) {
      seticesearch("true")
    } else {
      seticesearch("")
    }
    setice((prevValue) => !prevValue);
  };
  const thunderbutton = () => {
    if (thunder == false) {
      setthundersearch("true")
    } else {
      setthundersearch("")
    }
    setthunder((prevValue) => !prevValue);
  };
  const earthbutton = () => {
    if (earth == false) {
      setearthsearch("true")
    } else {
      setearthsearch("")
    }
    setearth((prevValue) => !prevValue);
  };
  const waterbutton = () => {
    if (water == false) {
      setwatersearch("true")
    } else {
      setwatersearch("")
    }
    setwater((prevValue) => !prevValue);
  };
  const windbutton = () => {
    if (wind == false) {
      setwindsearch("true")
    } else {
      setwindsearch("")
    }
    setwind((prevValue) => !prevValue);
  };
  const holybutton = () => {
    if (holy == false) {
      setholysearch("true")
    } else {
      setholysearch("")
    }
    setholy((prevValue) => !prevValue);
  };
  const darkbutton = () => {
    if (dark == false) {
      setdarksearch("true")
    } else {
      setdarksearch("")
    }
    setdark((prevValue) => !prevValue);
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
    } else {
      setMergesearch("")
    }
    setMerge((prevValue) => !prevValue);
  }

  //type selector
  const CondSelect = (e) => {
    if (e !== null) {
      setTypesearch(e.label)
      setCondFilter(e.value);
    } else {
      setCondFilter("");
      setTypesearch('')
    }
  };

  //load more
  const loadMoreButton = () => {
    const newlimits = limits + passivelimit;
    const newLoadMore = searchResults.length > newlimits;
    const newlistdisplay = listDisplay.concat(
      searchResults.slice(limits, newlimits)
    );
    setLimits(newlimits);
    if (newlimits <= newlistdisplay.length) {
      setDisplayBanner(
        <>Displaying <span className="subtextgold">{newlimits}</span> of <span className="subtextgold"> {searchResults.length}</span> {banerDisplayTerm}</>
      );
    } else {
      setDisplayBanner(
        <>Displaying <span className="subtextgold">{searchResults.length}</span> of <span className="subtextgold"> {searchResults.length}</span> {banerDisplayTerm}</>
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
  const typeListArray = ProcessedEnemyAbilities.map((typeListUnique) => ({
    value: typeListUnique.battle_enemy_id,
    label: typeListUnique.EnemyName
  }));

  let mymap = new Map();

  const uniquetypeListArray = typeListArray.filter(el => {
    const val = mymap.get(el.label);
    if (val) {
      if (el.value < val) {
        mymap.delete(el.label);
        mymap.set(el.label, el.value);
        return true;
      } else {
        return false;
      }
    }
    mymap.set(el.label, el.value);
    return true;
  });

  const filteredarray = uniquetypeListArray.filter(el => {
    return el["label"] != ""
  })

  //search bar
  const handleChange = (e) => {
    setsearchdisplay(e.target.value);
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

  const resetbutton = () => {
    setclearFilter(true);
    setReverse(false);
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
    setMerge(false)

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

    setMergesearch("")
    setReversesearch("")
    setTEXTsearch("")
    setTypesearch("")

    setsearchdisplay("");
    setSearchTerm("");
    setCondFilter("")
    setTimeout(() => setclearFilter(false), 1000);
  }

  const listabilities = listDisplay;

  return (
    <div>
      <Helmet>
        <title>Enemy Abilities - Dissidia Compendium</title>
        <meta property="og:site_name" content="Dissidia Compendium" />
        <meta property="og:type" content="website" />
        <meta name="description" content="Abilities Search" />
        <meta name="twitter:title" content="Abilities Search" />
        <meta name="twitter:description" content="Abilities Search" />
        <meta property="og:title" content="Abilities Search" />
        <meta property="og:description" content="Abilities Search" />
        <meta property="og:url" content="https://dissidiacompendium.com/search/abilities" />
      </Helmet>
      <div className="content">
        <h1  >Enemy Abilities</h1>
        <div className="subheader">Use filters to limit returns</div>
        <div className="charfilterspacer" />
        <div key="filter1" onClick={showfilterbutton} className="charfilter"><span className="filterstext"></span>{showFilter ? <TiArrowSortedUp className="uparrow" /> : <TiArrowSortedDown className="downarrow" />}</div>
        {showFilter == false ?
        <div className="char-search-reverse-holder">
          <IoSearch className="searchicon" />
          <div className="search-holder">
            <input
              className="char-search-bar"
              type="text"
              id="search"
              placeholder="Ability Name / Effects"
              value={searchdisplay}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            {searchTerm === "" ? "" :
              <IoMdCloseCircleOutline onClick={clearSearch} className="clearsearch"></IoMdCloseCircleOutline>}
          </div>
        </div>
        : 
        <div className="filterholder noselect" id={showFilter ? "showfilteren" : "hiddenfilteren"}>
          <div className="similarbanner">Multiple filters can be active</div>
          <div className="filterholderflair">
            <ul className="bufftypes">
              <Tippy content="Magic BRV Damage">
                <li className={`${magic ? "filteractive" : "filterinactive"} buffbutton magictypebutton`} onClick={magicbutton}></li>
              </Tippy>
              <Tippy content="Melee BRV Damage">
                <li className={`${melee ? "filteractive" : "filterinactive"} buffbutton meleetypebutton`} onClick={meleebutton}></li>
              </Tippy>
              <Tippy content="Ranged BRV Damage">
                <li className={`${ranged ? "filteractive" : "filterinactive"} buffbutton rangedtypebutton`} onClick={rangedbutton}></li>
              </Tippy>
              <Tippy content="Group Attacks">
                <li className={`${aoe ? "filteractive" : "filterinactive"} buffbutton aoetypebutton`} onClick={aoebutton}></li>
              </Tippy>
            </ul>
            <br />
            <ul className="bufftypes">
              <Tippy content="Fire BRV Damage">
                <li className={`${fire ? "filteractive" : "filterinactive"} spheresbutton Firebutton`} onClick={firebutton}></li>
              </Tippy>
              <Tippy content="Ice BRV Damage">
                <li className={`${ice ? "filteractive" : "filterinactive"} spheresbutton Icebutton`} onClick={icebutton}></li>
              </Tippy>
              <Tippy content="Thunder BRV Damage">
                <li className={`${thunder ? "filteractive" : "filterinactive"} spheresbutton Thunderbutton`} onClick={thunderbutton}></li>
              </Tippy>
              <Tippy content="Earth BRV Damage">
                <li className={`${earth ? "filteractive" : "filterinactive"} spheresbutton Earthbutton`} onClick={earthbutton}></li>
              </Tippy>
              <Tippy content="Water BRV Damage">
                <li className={`${water ? "filteractive" : "filterinactive"} spheresbutton Waterbutton`} onClick={waterbutton}></li>
              </Tippy>
              <Tippy content="Wind BRV Damage">
                <li className={`${wind ? "filteractive" : "filterinactive"} spheresbutton Windbutton`} onClick={windbutton}></li>
              </Tippy>
              <Tippy content="Holy BRV Damage">
                <li className={`${holy ? "filteractive" : "filterinactive"} spheresbutton Holybutton`} onClick={holybutton}></li>
              </Tippy>
              <Tippy content="Dark BRV Damage">
                <li className={`${dark ? "filteractive" : "filterinactive"} spheresbutton Darkbutton`} onClick={darkbutton}></li>
              </Tippy>
            </ul>
            <br />
            <div className="similarbanner">Refine</div>
            <div className="margeholder">
              <div className="Merge">
                <label htmlFor="search" className="MergeText">Merge Filters?</label>
                <div key="mergecheck1" className={`${merge == true ? "nodisplay" : `uncheck`}`} onClick={togglemerge} />
                <div key="mergecheck2" className={`${merge == true ? "check" : `nodisplay`}`} onClick={togglemerge} />
              </div>
            </div>
            <div className="typeholder">
              <Select
                defaultValue={Typesearch != "" ? { value: Typesearch, label: Typesearch } : null}
                key={Typesearch}
                isSearchable={true}
                placeholder="Enemy Select..."
                className='typecontainer'
                classNamePrefix="typetext"
                onChange={CondSelect}
                options={filteredarray}
                isClearable={true}
              />
            </div>
            <div className="search-reverse-holder">
              <div className="search-holder">
                <IoSearch className="innersearchicon" />
                <input
                  className="search-bar"
                  type="text"
                  id="search"
                  placeholder="Ability Name / Effects"
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
        }
        <ul className="bannertabs">
          <Link to={`/bestiary/enemies`}>
            <li className={""} >Enemies</li>
          </Link>
          <Link to={`/bestiary/abilities`}>
            <li className={"active"} ><span className="gemselected" />Abilities</li>
          </Link>
          <Link to={`/bestiary/buffs`}>
            <li className={""} >Buffs</li>
          </Link>
        </ul>
        <div className="nonenemyholder enemyholderstyling">
          <div className="subtext">
            {displayBanner}
          </div>
          {listabilities.length > 0 ? (
            listabilities.map(abilities => (
              <LazyLoadComponent
                key={abilities.data_id}
                scrollPosition={scrollPosition}
                placeholder={<div className="buffunit">
                                <div className="infoholder" style={{ minHeight: "220px" }}>
                                <img className="loadingbardots" src="https://dissidiacompendium.com/images/static/site/loading.gif"/>
                                </div>
                            </div>}
                >
              <EnemyAbilitiesListingFormattingDirect 
              key={abilities.data_id} 
              match={abilities} />
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
    </div>
  );
}

export default trackWindowScroll(EnemyAbilities)