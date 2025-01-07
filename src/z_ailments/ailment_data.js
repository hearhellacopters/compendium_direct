import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Tippy from '../components/TippyDefaults'
import { useStateIfMounted } from "use-state-if-mounted";
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
import { getQuery, getQueryStringVal, useQueryParam } from '../components/URLParams'
import AilmentDataFormatting from '../components/Buffs/AilmentDataFormatting'

export default function AilmentData ({
  ver,
  newcompare,
  //indexes
  master_index,
  //APIs
  ailment_data,
}) {

  const EffectID = master_index.ailment_effect_id_index.effect_id

  const rawData = Object.values(ailment_data)

  const banerDisplayTerm = "ailments";

  const startinglimit = 50

  const [formatting, setformatting] = useStateIfMounted(true);

  const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null ? true : false);
  const [clearFilter, setclearFilter] = useStateIfMounted(false);
  const [slider, setslider] = useState(getQueryStringVal("slider") != null ? true : false);

  const [buffs, setBuffs] = useState(getQueryStringVal("buffs") != null ? true : false);
  const [debuffs, setDebuffs] = useState(getQueryStringVal("debuffs") != null ? true : false);
  const [special, setspecial] = useState(getQueryStringVal("special") != null ? true : false);
  const [field, setfield] = useState(getQueryStringVal("field") != null ? true : false);
  const [combo, setcombo] = useState(getQueryStringVal("combo") != null ? true : false);
  const [modify, setmodify] = useState(getQueryStringVal("modify") != null ? true : false);

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
  const [specialsearch, setspecialsearch] = useQueryParam("special", "");
  const [fieldsearch, setfieldsearch] = useQueryParam("field", "");
  const [combosearch, setcombosearch] = useQueryParam("combo", "");
  const [modifysearch, setmodifysearch] = useQueryParam("modify", "");
  const [buffssearch, setBuffssearch] = useQueryParam("buffs", "");
  const [debuffssearch, setDebuffssearch] = useQueryParam("debuffs", "");
  const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
  const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
  const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");
  const [slidersearch, setslidersearch] = useQueryParam("slider", "");
  const [Advancesearch, setAdvancesearch] = useQueryParam("advance", "");
  const [AdvanceValuesearch, setAdvanceValuesearch] = useQueryParam("value", "");
  const [Typesearch, setTypesearch] = useQueryParam("effect", "");
  const { protocol, pathname, host } = window.location;
  const query = getQuery();
  const url = `${protocol}//${host}${pathname}?${query.toString()}`

  useEffect(() => {
    //type params
    if (Typesearch != "") {
      const filteredtype = Object.values(EffectID).filter(self => self.effect_id == getQueryStringVal("effect"))
      if (filteredtype.length != 0) {
        setTypesearch(getQueryStringVal("effect"))
        setCondFilter(filteredtype[0].id)
      } else {
        setTypesearch("")
        setCondFilter("")
      }
    }
  }, [setCondFilter, EffectID, Typesearch, setTypesearch])

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
    if (special == true) {
      setspecialsearch("true")
    } else {
      setspecialsearch("")
    }
    if (field == true) {
      setfieldsearch("true")
    } else {
      setfieldsearch("")
    }
    if (combo == true) {
      setcombosearch("true")
    } else {
      setcombosearch("")
    }
    if (modify == true) {
      setmodifysearch("true")
    } else {
      setmodifysearch("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modify, setmodify, combo, setmodify, Reversesearch, setReverse, reverse, setfield, fieldsearch, setspecial, specialsearch, field, setspecial, special, slidersearch, setslider, slider, slidersearch])

  const fieldbutton = () => {
    setfield((prevValue) => !prevValue);
  };

  const specialbutton = () => {
    setspecial((prevValue) => !prevValue);
  };

  const modifybutton = () => {
    setmodify((prevValue) => !prevValue);
  };

  const combobutton = () => {
    setcombo((prevValue) => !prevValue);
  };

  const togglesilder = () => {
    setslider((prevValue) => !prevValue);
  }

  const buffsbutton = () => {
    if (buffs == false) {
      setBuffssearch("true")
      setDebuffssearch("")
      setDebuffs(false)
    } else {
      setBuffssearch("")
      setDebuffssearch("")
    }
    setBuffs((prevValue) => !prevValue);
  };
  const debuffsbutton = () => {
    if (debuffs == false) {
      setDebuffssearch("true")
      setBuffssearch("")
      setBuffs(false)
    } else {
      setDebuffssearch("")
      setBuffssearch("")
    }
    setDebuffs((prevValue) => !prevValue);
  };

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
    if (buffs === true) {
      const filteredout = rawData.filter(
        (buffs) => buffs["is_buff"] == 1
      );
      filterholder.push(...filteredout);
    }
    if (debuffs === true) {
      const filteredout = rawData.filter(
        (buffs) => buffs["is_buff"] == 0
      );
      filterholder.push(...filteredout);
    }
    if (special === true) {
      const filteredout = rawData.filter(
        (buffs) => buffs["sp_disp_type"] && buffs["sp_disp_type"] != 0
      );
      filterholder.push(...filteredout);
    }
    if (field === true) {
      const filteredout = rawData.filter(
        (buffs) => buffs["field"] != undefined
      );
      filterholder.push(...filteredout);
    }
    if (combo === true) {
      const filteredout = rawData.filter(
        (buffs) => buffs["components"] != undefined
      );
      filterholder.push(...filteredout);
    }
    if (modify === true) {
      const filteredout = rawData.filter(
        (buffs) => buffs["modify"] != undefined
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
          a.id - b.id :
          b.id - a.id);
    const searchit = makeUnique.filter((ailment) =>
      (`${ailment.name} - #${ailment.id} ${ailment.jpname}`).toLowerCase().includes(searchTerm)
    );
    const getailmentfilter = searchit.filter(function (ef) {
      const newfilterpull =
        ef["effect_id"] === condFilter ||
        ef["effect_id_1"] === condFilter ||
        ef["effect_id_2"] === condFilter ||
        ef["effect_id_3"] === condFilter ||
        ef["effect_id_4"] === condFilter ||
        ef["effect_id_5"] === condFilter ||
        ef["effect_id_6"] === condFilter ||
        ef["effect_id_7"] === condFilter ||
        ef["effect_id_8"] === condFilter ||
        ef["effect_id_9"] === condFilter ||
        ef.field && ef.field
          .some(fieldeffects => fieldeffects.effect_id && fieldeffects.effect_id.ailment_effect === condFilter)
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
  }, [modify, combo, Advancesearch, AdvanceValuesearch, special, field, buffs, debuffs, searchTerm, clearFilter, condFilter, reverse]);

  //type list
  const typeListArray = Object.values(EffectID).map((typeListUnique) => ({
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
    setBuffs(false);
    setDebuffs(false);
    setfield(false)
    setspecial(false)
    setslider(false)
    setcombo(false)
    setmodify(false)

    setslidersearch("")
    setBuffssearch("")
    setDebuffssearch("")
    setspecialsearch("")
    setfieldsearch("")
    setcombosearch("")
    setmodifysearch("")
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

  return (
    <div>
      <br />
      <div className="charfilterspacer" />
      <div key="filter1" onClick={showfilterbutton} className="charfilter"><span className="filterstext"></span>{showFilter ? <TiArrowSortedUp className="uparrow" /> : <TiArrowSortedDown className="downarrow" />}</div>
      <div className="event-search-reverse-holder">
        {showFilter == true ? "" :
          <ul className="bufftypes">
            <Link to={`/${ver}/ailments/ailment_data/compare`} >
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
            <Link to={`/${ver}/ailments/ailment_data/new`} >
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
            <Link to={`/${ver}/ailments/ailment_data/compare?filter=true`} >
              <Tippy content={`Added from update`}>
                <li className={`${newcompare == "compare" ? "filteractive" : "filterinactive"} buffbutton newbutton`}></li>
              </Tippy>
            </Link>
            <Link to={`/${ver}/ailments/ailment_data/new?filter=true`} >
              <Tippy content={`Full list`}>
                <li className={`${newcompare == "new" ? "filteractive" : "filterinactive"} buffbutton fullbutton`}></li>
              </Tippy>
            </Link>
          </ul>
          <div className="similarbanner">Filters</div>
          <ul className="bufftypes">
            <Tippy content={`Speical Icon Buffs`}>
              <li className={`${special == true ? "filteractive" : "filterinactive"} buffbutton specialbutton`} onClick={specialbutton} />
            </Tippy>
            <Tippy content={`Ailments with Field Effects`}>
              <li className={`${field == true ? "filteractive" : "filterinactive"} buffbutton fieldbutton`} onClick={fieldbutton} />
            </Tippy>
            <Tippy content={`Ailments with combinations`}>
              <li className={`${combo == true ? "filteractive" : "filterinactive"} buffbutton combobutton`} onClick={combobutton} />
            </Tippy>
            <Tippy content={`Ailments with modifications`}>
              <li className={`${modify == true ? "filteractive" : "filterinactive"} buffbutton modifybutton`} onClick={modifybutton} />
            </Tippy>
          </ul>
          <br />
          <ul className="bufftypes">
            <li className={`${buffs ? "filteractive" : "filterinactive"} buffsbutton buffsButton`} onClick={buffsbutton}></li>
            <li className={`${debuffs ? "filteractive" : "filterinactive"} buffsbutton debuffsButton`} onClick={debuffsbutton}></li>
          </ul>
          <div className="similarbanner">Advanced</div>
          <div className="not_rangeholder">
            Object Label
            <div className="labelmax">
              <input
                className="not_numberbox"
                placeholder="max_level"
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
          listBuff.map(self => (
            <AilmentDataFormatting
              key={self.id}
              ver={ver}
              ailment_data={self}
              master_index={master_index}
              rank={self.arank}
              arg1={self.aarg1}
              arg2={self.aarg2}
              alt_rank={self.aranka}
              alt_aug1={self.aarg1a}
              alt_aug2={self.aarg2a}
              castlocation={false}
              formatting={formatting}
              gear={false}
              rank_tag={self.rank_tag}
              turns={self.alife}
              character_face={false}
              hide_title={true}
              full={true}
              showvalues={!formatting}
              debugging={true}
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
    </div>
  )
}