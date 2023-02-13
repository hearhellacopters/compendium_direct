import React, { useState, useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import { Helmet } from 'react-helmet-async';
import { Link, Navigate } from 'react-router-dom'
import Select from 'react-select';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/scale-subtle.css';
import 'tippy.js/animations/scale-extreme.css';
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { TiArrowSortedDown } from 'react-icons/ti';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { TiArrowSortedUp } from 'react-icons/ti';
import { IoSearch } from 'react-icons/io5';
import { FaUndoAlt } from 'react-icons/fa';
import { FaShareSquare } from 'react-icons/fa';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import Tippy from '../formatting/TippyDefaults.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import Passive_Ability_Formatting from './direct/formatting/passives/Passive_Ability_Formatting.js';
import { getQuery, getQueryStringVal, useQueryParam } from '../processing/urlparams'
import StatsMaker from '../formatting/StatsDisplay.js';

const CrystalPassivesPage = ({
  jptoggledata,

  crystalpassives,
  match,
  master_index

}) => {

  const matchweapon = match.params.id

  const passivelimit = 20

  const rawData = crystalpassives;

  const banerDisplayTerm = "Crystal Passives";

  const [showinfo, setshowinfo] = useStateIfMounted(false);
  const [loop, setLoop] = useStateIfMounted(false);
  const [clearFilter, setclearFilter] = useStateIfMounted(false);
  const [reverse, setReverse] = useState(getQueryStringVal("rev") != null ? true : false);
  const [searchResults, setSearchResults] = useState(rawData);
  const [limits, setLimits] = useState(passivelimit);
  const [listDisplay, setListDisplay] = useState(
    rawData && rawData.slice(0, passivelimit)
  );
  const [searchTerm, setSearchTerm] = useState(getQueryStringVal("search") != null ? getQueryStringVal("search").toLowerCase() : "");
  const [showFilter, setShowFilter] = useState(true);
  const [searchdisplay, setsearchdisplay] = useState(getQueryStringVal("search") != null ? getQueryStringVal("search") : "");
  const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");
  const [filterResults, setFilterResults] = useState(rawData);
  const [listLength, setListLength] = useState(listDisplay.length);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [displayBanner, setDisplayBanner] = useState(
    <>Displaying <span className="subtextgold">{listLength}</span> of <span className="subtextgold"> {rawData.length}</span> {banerDisplayTerm}</>
  );
  const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
  const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
  const [Typesearch, setTypesearch] = useQueryParam("Char", "");
  const { protocol, pathname, host } = window.location;
  const query = getQuery();
  const url = `${protocol}//${host}${pathname}?${query.toString()}`;
  const [condFilter, setCondFilter] = useState("");

  useEffect(() => {
    //search params
    if (getQueryStringVal("search") != null) {
      setSearchTerm(getQueryStringVal("search") != null ? getQueryStringVal("search").toLowerCase() : "")
      setTEXTsearch(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
      setsearchdisplay(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
    }
  }, [setTEXTsearch, setFiltersearch])

  useEffect(() => {
    setShowLoadMore(true);
    setLimits(passivelimit);
    setFilterResults(rawData);
    setSearchResults(rawData);
    setListLength(rawData.length);
    setListDisplay(rawData.slice(0, passivelimit));
    setDisplayBanner(
      <>Displaying <span className="subtextgold">{passivelimit}</span> of <span className="subtextgold"> {rawData.length}</span> {banerDisplayTerm}</>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const [Special, setSpecial] = useState(getQueryStringVal("special") != null ? true : false);
  const [Defence, setDefence] = useState(getQueryStringVal("defence") != null ? true : false);
  const [Attack, setAttack] = useState(getQueryStringVal("attack") != null ? true : false);

  const [Attacksearch, setAttacksearch] = useQueryParam("attack", "");
  const [Defencesearch, setDefencesearch] = useQueryParam("defence", "");
  const [Specialsearch, setSpecialsearch] = useQueryParam("special", "");

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

  const showfilterbutton = () => {
    setShowFilter((prevValue) => !prevValue);
  }

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

   //unique
   function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }


  //filter
  useEffect(() => {
    const filterholder = [];

    if (Special === true) {
      const filteredout = rawData.filter(
        (gear) => gear["loc_tag"] == "crypass_u"
      );
      filterholder.push(...filteredout);
    }
    if (Defence === true) {
      const filteredout = rawData.filter(
        (gear) => gear["loc_tag"] == "crypass_d"
      );
      filterholder.push(...filteredout);
    }
    if (Attack === true) {
      const filteredout = rawData.filter(
        (gear) => gear["loc_tag"] == "crypass_a"
      );
      filterholder.push(...filteredout);
    }
    
    if (filterholder.length == 0) {
      filterholder.push(...rawData)
    }

    const makeUnique = filterholder
    .filter(onlyUnique)
    .sort((a, b) =>
      reverse == false ?
        a.pa_id - b.pa_id :
        b.pa_id - a.pa_id)
      const searchit = makeUnique.filter((e) =>
        (`${e.name} ${e.glname} ${e.jpname} #${e.pa_id}`).toLowerCase().includes(searchTerm)
      );

      setFilterResults(makeUnique);
      setSearchResults(searchit);

  const newlistdisplay = searchit.slice(0, limits);

    if (limits < newlistdisplay.length) {
      setShowLoadMore(true);
      setListDisplay(newlistdisplay);
      setListLength(filterholder.length);
      setDisplayBanner(
        <>Displaying <span className="subtextgold">{newlistdisplay.length}</span> of <span className="subtextgold"> {filterholder.length}</span> {banerDisplayTerm}</>
      );
    } else {
      setShowLoadMore(false);
      setListDisplay(newlistdisplay);
      setListLength(newlistdisplay.length);
      setDisplayBanner(
        <>Displaying <span className="subtextgold">{newlistdisplay.length}</span> of <span className="subtextgold"> {newlistdisplay.length}</span> {banerDisplayTerm}</>
      );
    }
  }, [Special, Attack, Defence, rawData, limits, reverse, searchTerm])

  const SpecialButton= ()=>{
    if(Special == true){
      setSpecialsearch("")
      setSpecial(false)
    } else {
      setSpecialsearch("true")
      setSpecial(true)
    }
    setDefence(false)
    setDefencesearch("")
    setAttack(false)
    setAttacksearch("")
  }

  const AttackButton= ()=>{
    if(Attack == true){
      setAttacksearch("")
      setAttack(false)
    } else {
      setAttacksearch("true")
      setAttack(true)
    }
    setDefence(false)
    setDefencesearch("")
    setSpecial(false)
    setSpecialsearch("")
  }

  const DefenceButton= ()=>{
    if(Defence == true){
      setDefence(false)
      setDefencesearch("")
    } else {
      setDefencesearch("true")
      setDefence(true)
    }
    setAttack(false)
    setAttacksearch("")
    setSpecial(false)
    setSpecialsearch("")
  }

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

  const resetbutton = () => {
    setclearFilter(true);
    setReverse(false)

    setDefence(false)
    setAttack(false)
    setSpecial(false)

    setDefencesearch("")
    setSpecialsearch("")
    setAttacksearch("")

    setReversesearch("")
    setTEXTsearch("")
    setTypesearch("")

    setsearchdisplay("");
    setSearchTerm("");
    setCondFilter("")
    setTimeout(() => setclearFilter(false), 1000);
  }

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

  const listgear = listDisplay;

    return (
      <div><h1 className="">Crystal Brilliance</h1>
          <div className="filterholder" id={showFilter ? "showfilteren" : "hiddenfilteren"}>
            <div className="filterholderflair">
            
            <div className="similarbanner"><div className='infoclick' onClick={() => { setshowinfo((preValue) => !preValue) }}>Info{showinfo ? <TiArrowSortedUp className="uparrow" /> : <TiArrowSortedDown className="downarrow" />}</div></div>
            {showinfo == false ? <br></br> : 
            <div>
              <div className="ultimainfo darkerbg">
              <div className="yellowcolor">{"Acquired using colored "}<span className="cryspark"></span>{" Crystal Sparkles, obtainable from weekly Crystal Quests"}</div><br/>
              <div className="yellowcolor">Quest is randomly selected from a list of Shinryu level battles.</div><br/>
              <div className="yellowcolor">Rerolling is possible at a gem cost.</div><br/>
              <div className="yellowcolor">The <span className="cryspark"></span> color is dependent on the crystal color of the completing party.</div><br/>
              <div className="yellowcolor">Party MUST be a team of a single color.</div><br/>
              <div className="yellowcolor">The difficulty of the quest can be increased for greater <span className="cryspark"></span> gain.</div><br/>
              <div className="yellowcolor"><span className="cryspark"></span> x80 base at Lv 0 and <span className="cryspark"></span> x400 base plus <span className="cryspark"></span> x300 bonus at max Lv 3.</div><br/>
              <div className="yellowcolor">The weekly limit is 400 base and 300 bonus of <span className="cryspark"></span> x700.</div><br/>
              <div className="yellowcolor">Difficulty levels increase the enemy's HP (up to x1.5).</div><br/>
              <div className="yellowcolor">Each board has x90 <span className="crynode"></span> stat nodes and x18 <span className="crypnode"></span> passive nodes.</div><br/>
              <div className="yellowcolor">Only <span className="yellowcolor">3 of the 18 passives</span> can be active at a time.</div><br/>
              <div className="center">
              <StatsMaker 
              title="Board Mastery Stats"
              bg_class="similarbanner"
              HP={"+12,000"}
              INTBRV={"+1,008"}
              MAXBRV={"+3,010"}
              DEF={"+14,000"}
              ATK={"+2,002"}
              />
              </div><br/>
              <div className="yellowcolor">Passives and stats are automatically applied to color matching characters.</div>
            </div>
              <div className="similarbanner">Needed</div>
              <div className="ultimainfo darkerbg">
              <div className=""><span className="cryspark"></span> x100 per <span className="crynode"></span><span className="yellowcolor"> stat node</span>. There are <span className="yellowcolor">90 per board.</span></div><br/>
              <div className=""><span className="cryspark"></span> x600 per <span className="crypnode"></span><span className="yellowcolor"> passive node</span>. There are <span className="yellowcolor">18 per board.</span></div><br/>
              <div className="">Each <span className="crypnode"></span> requires all 4 surrounding <span className="crynode"></span> to be unlocked.</div><br/>
              <div className="">Meaning each <span className="yellowcolor">"cluster"</span> requires <span className="cryspark"></span><span className="yellowcolor"> x1000</span> to clear.</div><br/>
              <div className="">Each color board requires <span className="cryspark"></span><span className="yellowcolor"> x18,000 to complete (around 26 weeks per board).</span></div>
              </div>
              </div>}
              <div className="similarbanner">Passive Filter</div>
            <ul className="bufftypes">
              <Tippy content="Special Ability">
                  <li className={`${Special ? "filteractive" : "filterinactive"} buffbutton crypass_ubutton`} onClick={SpecialButton}></li>
              </Tippy>
              <Tippy content="Attack Ability">
                  <li className={`${Attack ? "filteractive" : "filterinactive"} buffbutton crypass_abutton`} onClick={AttackButton}></li>
              </Tippy>
              <Tippy content="Defence Ability">
                  <li className={`${Defence ? "filteractive" : "filterinactive"} buffbutton crypass_dbutton`} onClick={DefenceButton}></li>
              </Tippy>
            </ul><br/>
            <div className="search-reverse-holder">
                <div className="search-holder">
                    <IoSearch className="innersearchicon" />
                    <input
                        className="search-bar"
                        type="text"
                        placeholder="Search"
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
            {listgear.length > 0 ? (
              listgear.map(passive => (
                <Passive_Ability_Formatting
                    key={passive.pa_id}
                    passive_ability={passive}
                    ver={"JP"}
                    loc={"crystal"}
                    Single={true}

                    master_index={master_index}

                    formatting={true}

                    span={true}
                    release={passive.start_date}
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
export default CrystalPassivesPage