import React, { useState, useEffect } from 'react';
import Tippy from '../../formatting/TippyDefaults'
import { useStateIfMounted } from "use-state-if-mounted";
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { FaUndoAlt } from 'react-icons/fa'
import Passive_Ability_Formatting from './formatting/passives/Passive_Ability_Formatting';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import { getQuery, getQueryStringVal, useQueryParam } from '../../processing/urlparams'
import Character_Ability_Pars from './formatting/command_ability/Character_Ability_Pars.js'

const Sum_Fix_Passive = ({
  sum_fix_passive,
  ver,
  loc,
  file,
  newcompare,
  ProcessedCharacters,
  formatting,
  showFilter,
  master_index
}) => {

  const [rawData, setrawData] = useState(sum_fix_passive);

  const banerDisplayTerm = "character board passives";

  const startinglimit = 999

  const [clearFilter, setclearFilter] = useStateIfMounted(false);

  //show icons

  const [showLDEXT, setshowLDEXT] = useStateIfMounted(false);
  const [showLDCallEXT, setshowLDCallEXT] = useStateIfMounted(false);
  const [showFRECHO, setshowFRECHO] = useStateIfMounted(false);
  const [showFREXT, setshowFREXT] = useStateIfMounted(false);

  useEffect(() => {
    if (Object.values(sum_fix_passive).some(self => self.passive && self.passive.loc_tag == "board4ext")) {
      setshowLDEXT(true)
    }
    if (Object.values(sum_fix_passive).some(self => self.passive && self.passive.loc_tag == "board4cext")) {
      setshowLDCallEXT(true)
    }
    if (Object.values(sum_fix_passive).some(self => self.passive && self.passive.loc_tag == "board5echo")) {
      setshowFRECHO(true)
    }
    if (Object.values(sum_fix_passive).some(self => self.passive && self.passive.loc_tag == "board5ext")) {
      setshowFREXT(true)
    }
    // eslint-disable-next-line
  }, [sum_fix_passive])

  const [activeLDEXTsearch, setactiveLDEXTsearch] = useQueryParam("LDEXT", "");
  const [activeLDCallEXTsearch, setactiveLDCallEXTsearch] = useQueryParam("LDCallEXT", "");
  const [activeFRECHOsearch, setactiveFRECHOsearch] = useQueryParam("FRECHO", "");
  const [activeFREXTsearch, setactiveFREXTsearch] = useQueryParam("FREXT", "");

  const [activeLDEXT, setactiveLDEXT] = useStateIfMounted(getQueryStringVal("LDEXT") != null ? true : false);
  const [activeLDCallEXT, setactiveLDCallEXT] = useStateIfMounted(getQueryStringVal("LDCallEXT") != null ? true : false);
  const [activeFRECHO, setactiveFRECHO] = useStateIfMounted(getQueryStringVal("FRECHO") != null ? true : false);
  const [activeFREXT, setactiveFREXT] = useStateIfMounted(getQueryStringVal("FREXT") != null ? true : false);

  useEffect(() => {
    if (activeLDEXT == false) {
      setactiveLDEXTsearch("")
    } else {
      setactiveLDEXTsearch("true")
    }
    if (activeLDCallEXT == false) {
      setactiveLDCallEXTsearch("")
    } else {
      setactiveLDCallEXTsearch("true")
    }
    if (activeFRECHO == false) {
      setactiveFRECHOsearch("")
    } else {
      setactiveFRECHOsearch("true")
    }
    if (activeFREXT == false) {
      setactiveFREXTsearch("")
    } else {
      setactiveFREXTsearch("true")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLDEXT, activeFRECHO, activeFREXT, activeLDCallEXT])

  const clear_filter =()=>{
    setactiveLDEXT(false)
    setactiveLDCallEXT(false)
    setactiveFRECHO(false)
    setactiveFREXT(false)
  }

  const LDEXTbutton = () => {
    if(activeLDEXT == false){
      clear_filter()
      setactiveLDEXT(true)
    } else {
      clear_filter()
    }
  }

  const LDCallEXTbutton = () => {
    if(activeLDCallEXT== false){
      clear_filter()
      setactiveLDCallEXT(true)
    } else {
      clear_filter()
    }
  }

  const FRECHObutton = () => {
    if(activeFRECHO== false){
      clear_filter()
      setactiveFRECHO(true)
    } else {
      clear_filter()
    }
  }

  const FREXTbutton = () => {
    if(activeFREXT){
      clear_filter()
      setactiveFREXT(true)
    } else {
      clear_filter()
    }
  }

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
    const filterholder = [];

    //buttons
    if (activeLDEXT == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.passive && ef.passive.loc_tag == "board4ext"
      );
      filterholder.push(...filteredout);
    }

    if (activeLDCallEXT == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.passive && ef.passive.loc_tag == "board4cext"
      );
      filterholder.push(...filteredout);
    }

    if (activeFREXT == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.passive && ef.passive.loc_tag == "board5ext"
      );
      filterholder.push(...filteredout);
    }

    if (activeFRECHO == true) {
      const filteredout = rawData.filter(
        (ef) =>
          ef && ef.passive && ef.passive.loc_tag == "board5echo"
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
          b.passive_num - a.passive_num :
          a.passive_num - b.passive_num);
    const searchit = makeUnique.filter((ailment) =>
      (`
        ${ailment.ability == true ? ailment.command && ailment.command.command ? ver == "GL" ? ailment.command.command.name : ailment.command.command.glname : "" : ""} 
        ${ailment.ability == true ? ailment.command && ailment.command.command ? ver == "GL" ? ailment.command.command.jpname : ailment.command.command.name : "" : ""} 
        ${ver == "GL" && ailment.ability != true ? ailment.passive && ailment.passive.jpname != undefined ? ailment.passive.jpname : "" : ""} 
        ${ailment.passive != undefined ? ailment.passive.name : ""}
        ${ver == "JP" && ailment.ability != true ? ailment.passive != undefined ? ailment.passive.glname : "" : ""}
          - #${ailment.passive != undefined ? ailment.passive.pa_id : ""}`).toLowerCase().includes(searchTerm)
    );
    const getailmentfilter = searchit.filter(function (ef) {
      const newfilterpull = ef.passive && ef.passive.loc_tag == condFilter2;
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
  }, [activeLDCallEXT, activeLDEXT, activeFRECHO, activeFREXT, searchTerm, clearFilter, condFilter, condFilter2, condFilter3, condFilter4, reverse]);


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
    setactiveLDEXT(false)
    setactiveLDCallEXT(false)
    setactiveFREXT(false)
    setactiveFRECHO(false)

    setactiveFRECHOsearch("")
    setactiveFREXTsearch("")
    setactiveLDEXTsearch("")
    setactiveLDCallEXTsearch("")
    setReversesearch("")
    setTEXTsearch("")
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
      <div className="filterholder noselect" id={showFilter ? "showfilteren" : "hiddenfilteren"}>
        <div className="similarbanner">Subcategories</div>
        <div className="filterholderflair">
          <ul className='bufftypes'>
            {showFREXT == true ?
              <Tippy content="FR Extension">
                <li onClick={FREXTbutton} className={`${activeFREXT == true ? "filteractive" : "filterinactive"} buffbutton board5extbutton`}>
                </li>
              </Tippy>
              : ""}
            {showFRECHO == true ?
              <Tippy content="FR Echo">
                <li onClick={FRECHObutton} className={`${activeFRECHO == true ? "filteractive" : "filterinactive"} buffbutton board5echobutton`}>
                </li>
              </Tippy>
              : ""}
            {showLDEXT == true ?
              <Tippy content="LD Extension">
                <li onClick={LDEXTbutton} className={`${activeLDEXT == true ? "filteractive" : "filterinactive"} buffbutton ench4extbutton`}>
                </li>
              </Tippy>
              : ""}
            {showLDCallEXT == true ?
              <Tippy content="Call LD Extension">
                <li onClick={LDCallEXTbutton} className={`${activeLDCallEXT == true ? "filteractive" : "filterinactive"} buffbutton ench4cextbutton`}>
                </li>
              </Tippy>
              : ""}
          </ul>
          <br />
          <div className="search-reverse-holder">
            <div className="search-holder">
              <IoSearch className="innersearchicon" />
              <input
                className="search-bar"
                type="text"
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
      <div className="characterpageholder">
        {listPassives.length > 0 ? (
          listPassives.map(passive => (
            passive.ability == true ?
              <Character_Ability_Pars
                key={passive.sfp_id}

                master_index={master_index}
                ProcessedCharacters={ProcessedCharacters}
                character_ability={passive.command}
                ver={ver}
                loc={loc}
                file={"character_ability"}

                span={true}
                formatting={formatting}
                tag_override={passive.passive_num == 27 ? "board4cext" : "board4c"}
              />
              : passive.passive &&
              <Passive_Ability_Formatting
                key={passive.sfp_id}
                passive_ability={passive.passive}
                ver={ver}
                loc={loc}
                file={"exskill"}
                Single={true}

                master_index={master_index}

                cp_cost={passive.cp}
                board_cost={passive.board_point}
                chara_id_passoff={passive.chara_id}
                formatting={formatting}
                release={passive.start_date}

                span={true}
                banner_color={"board4banner"}
                base_color={"bluebase"}
              />
          ))) : (
          <div className=''>No Data</div>
        )}
      </div>
    </div>
  )
}
export default Sum_Fix_Passive