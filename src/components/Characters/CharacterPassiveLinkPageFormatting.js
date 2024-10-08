import React, { useState, useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import PassiveAbilityFormatting from '../Passives/PassiveAbilityFormatting.js'
import Link_Parm from '../Passives/PassiveLinkParmFormatting.js';
import { getQuery, getQueryStringVal, useQueryParam } from '../URLParams.js'
import Tippy from '../TippyDefaults.js'
import Select from 'react-select';
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { FaUndoAlt } from 'react-icons/fa'
import { LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';

function CharacterPassiveLinkPageFormatting({
  linkeddata,
  ver,
  newcompare,
  loc,
  ProcessedCharacters,
  master_index,

  formatting,
  scrollPosition
}){

  const rawData = Object.values(linkeddata && linkeddata.sort((a, b) => b.link_level - a.link_level))

  const banerDisplayTerm = "force enhancements";

  const startinglimit = 9999

  const [clearFilter, setclearFilter] = useStateIfMounted(false);

  const [loop, setLoop] = useStateIfMounted(false);
  const [reverse, setReverse] = useState(getQueryStringVal("rev") != null ? true : false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchdisplay, setsearchdisplay] = useState("");
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
  const [Typesearch, setTypesearch] = useQueryParam("type", "");
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
    //type params
    if (Typesearch != "") {
      if (getQueryStringVal("type") == "Stats") {
        setTypesearch(getQueryStringVal("type"))
        setCondFilter(3)
      }
      if (getQueryStringVal("type") == "Passive Ability") {
        setTypesearch(getQueryStringVal("type"))
        setCondFilter(2)
      }
    }
  }, [setCondFilter, Typesearch, setTypesearch])

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

  //unique
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  //filter
  useEffect(() => {
    var filterholder = rawData;

    if (reverse == true) {
      filterholder = rawData.sort((a, b) => a.link_level - b.link_level)
    } else {
      filterholder = rawData.sort((a, b) => b.link_level - a.link_level)
    }

    const makeUnique = filterholder.filter(onlyUnique);
    const searchit = makeUnique.filter((ailment) =>
      (`${ver == "GL" ? ailment.passive && ailment.passive.jpname : ""} ${ailment.param} ${ailment.passive && ailment.passive.name} ${ver == "JP" ? ailment.passive && ailment.passive.glname : ""} - #${ailment.passives && ailment.passives.pa_id}`).toLowerCase().includes(searchTerm)
    );
    const getailmentfilter = searchit.filter(function (ef) {
      const newfilterpull = ef["link_type"] == condFilter;
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
  }, [searchTerm, condFilter, reverse]);


  const typeListArray = [
    {
      value: 3,
      label: "Stats"
    },
    {
      value: 2,
      label: "Passive Ability"
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
    setsearchdisplay("");
    setSearchTerm("");
    setCondFilter("")
    setTimeout(() => setclearFilter(false), 1000);
  }

  const listPassives = listDisplay;

  if (linkeddata.length == 0) {
    return (
      <div className="nonenemyholder enemyholderstyling">
        No Data
      </div>
    )
  } else {
    return (
      <div>
        <div className="filterholder noselect" id={ "showfilteren" }>
          <div className="similarbanner">Filters</div>
          <div className="filterholderflair">
            <div className="typeholder">
              <Select
                defaultValue={Typesearch != "" ? { value: Typesearch, label: Typesearch } : null}
                key={Typesearch}
                isSearchable={true}
                placeholder="Type Select..."
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
        <div className="nonenemyholder enemyholderstyling">
          {listPassives.length > 0 ? (
            listPassives.map(passive => (
              passive.link_type == 3 ?
                <LazyLoadComponent
                  key={passive.lc_id}
                  scrollPosition={scrollPosition}
                  placeholder={<div className="buffunit infoholder" style={{ minHeight: `250px` }}>
                    <img className="loadingbardots" src="https://dissidiacompendium.com/images/static/site/loading.gif"/>
                  </div>
                    }
                  >
                <Link_Parm
                  key={passive.lc_id}
                  passive={passive}
                  ver={ver}
                  master_index={master_index}
                  tag_overide={passive.cp != 0 ? "smallpassive" : "newstatus"}
                />
                </LazyLoadComponent>
                : passive.link_type == 2 && passive.passive != undefined ?
                  <LazyLoadComponent
                  key={passive.lc_id}
                  scrollPosition={scrollPosition}
                  placeholder={<div className="buffunit infoholder" style={{ minHeight: `250px` }}>
                    <img className="loadingbardots" src="https://dissidiacompendium.com/images/static/site/loading.gif"/>
                  </div>
                    }
                  >
                  <PassiveAbilityFormatting
                    key={passive.lc_id}
                    passive_ability={passive.passive}
                    ver={ver}
                    loc={loc}
                    file={""}
                    master_index={master_index}
                    formatting={formatting}
                    chara_id_passoff={passive.chara_id}
                    cost_overide={passive.need_point}
                    cp_overide={passive.cp}
                    tag_overide={passive.rank_tag}
                    release={passive.start_date}
                    banner_color={"newblue"}
                    base_color={"bluebase"}
                  />
                  </LazyLoadComponent>
                  : ""
            ))) : (
            <div>No results</div>
          )
          }
        </div>
      </div>
    )
  }
}

export default trackWindowScroll(CharacterPassiveLinkPageFormatting)