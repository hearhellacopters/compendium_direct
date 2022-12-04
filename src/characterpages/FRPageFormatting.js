import React, {useState, useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import { Helmet} from 'react-helmet-async';
import CharacterForceCond from '../formatting/CharacterForceCond.js'
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/scale-subtle.css';
import 'tippy.js/animations/scale-extreme.css';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import Tippy from '../formatting/TippyDefaults.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5'; 
import { FaUndoAlt } from 'react-icons/fa'; 
import Select from 'react-select';
import { FaShareSquare } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { getQuery, getQueryStringVal, useQueryParam } from '../processing/urlparams'

const FRPage = ({ match, ProcessedCharacters, ForceCharacters, jptoggledata }) => {

  const passivelimit = 50

  const [rawData, setrawData] = useStateIfMounted(ForceCharacters);

  const banerDisplayTerm = "Force Time";

  const [showinfo,setshowinfo] = useStateIfMounted(false);
  const [loop, setLoop] = useStateIfMounted(false);
  const [clearFilter, setclearFilter] = useStateIfMounted(false);
  const [reverse, setReverse] = useState(getQueryStringVal("rev") != null  ? true : false);
  const [searchResults, setSearchResults] = useState(rawData);
  const [limits, setLimits] = useState(passivelimit);
  const [listDisplay, setListDisplay] = useState(
    rawData && rawData.slice(0, passivelimit)
  );
  const [searchTerm, setSearchTerm] = useState(getQueryStringVal("search") != null  ? getQueryStringVal("search").toLowerCase() : "");
  const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null  ? true : false);
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
  
//param logic
useEffect(() => {
  //type params
  if(Typesearch != null){
   const filteredtype = Object.values(ProcessedCharacters).filter(function (ef) {
     const newfilterpull = ef["CharacterName"] === getQueryStringVal("Char");
     return newfilterpull;
   })
   if(filteredtype.length != 0){
     setTypesearch(getQueryStringVal("Char"))
     setCondFilter(filteredtype[0].CharID)
   } else{
     setTypesearch("")
     setCondFilter("")
   }
 }
},[setCondFilter,ProcessedCharacters,Typesearch,setTypesearch])

useEffect(() => {
  //search params
  if(getQueryStringVal("search") != null){
    setSearchTerm(getQueryStringVal("search") != null  ? getQueryStringVal("search").toLowerCase() : "")
    setTEXTsearch(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
    setsearchdisplay(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
  }
  }, [setTEXTsearch,setFiltersearch])

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

   //unique
   function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  
    //filter
    useEffect(() => {
      const filterholder = [];

      if(jptoggledata == true){
        const filteredout = rawData.filter(
          (char) => char.JPtraits && char.JPtraits.FRtraits != undefined
        );
        filterholder.push(...filteredout);
      } else {
        const filteredout = rawData.filter(
          (char) => char.GLtraits && char.GLtraits.FRtraits != undefined
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
        a.GLOrder - b.GLOrder :
        b.GLOrder - a.GLOrder)
      const searchit = makeUnique.filter((e) =>
      (`${e.CharacterName} ${e.JPName} ${ProcessedCharacters[e.FR_Partner] && ProcessedCharacters[e.FR_Partner].CharacterName} ${e.AbilityFR}`).toLowerCase().includes(searchTerm)
      );
      const getcondfilter = searchit.filter(function (ef) {
        const newfilterpull = ef["CharID"] === condFilter;
        if(condFilter !== "") {
        return newfilterpull;
      } else {
        return ef
      }});
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
        setListLength(getcondfilter.length);
        setDisplayBanner(
          <>Displaying <span className="subtextgold">{getcondfilter.length}</span> of <span className="subtextgold"> {getcondfilter.length}</span> {banerDisplayTerm}</>
        );
      }
    },[reverse,rawData,limits,ProcessedCharacters,jptoggledata,condFilter,searchTerm])

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

     //type list
    const [typeListArray, settypeListArray] = useStateIfMounted(false);
    useEffect(()=>{
      const typeListArray2 = Object.values(ProcessedCharacters).filter(self=>jptoggledata == true? self.JPOrder != undefined : self.GLOrder != undefined).sort((a,b)=>jptoggledata == true? b.JPOrder - a.JPOrder : b.GLOrder - a.GLOrder).map((typeListUnique) => ({
        value: typeListUnique.CharacterName,
        label: typeListUnique.CharacterName,
        id: typeListUnique.CharID,
      }));
      settypeListArray(typeListArray2)
    },[jptoggledata,ProcessedCharacters,settypeListArray])
  
    const showfilterbutton = () => {
      if (showFilter == false) {
        setFiltersearch("true")
      } else {
        setFiltersearch("")
      }
      setShowFilter((prevValue) => !prevValue);
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

  const resetbutton = () =>{
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

  const listgear = listDisplay;

    return(
        <div className="wrapper">
            <Helmet>
                <title>Force Time - Dissidia Compendium</title>
                <meta property="og:site_name" content="Dissidia Compendium"/>
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://dissidiacompendium.com"/>
                <meta name="description" content={`${jptoggledata==true?"JP":"GL"} Force Time Page`}/>
                <meta name="twitter:title" content={`${jptoggledata==true?"JP":"GL"} Force Time Page`}/>
                <meta name="twitter:description" content={`${jptoggledata==true?"JP":"GL"} Force Time Page`}/>
                <meta name="twitter:image" content="https://dissidiacompendium.com/images/static/site/logo512.png"/>
                <meta name="twitter:card" content="summary"/>
                <meta name="twitter:image:alt" content={`Dissia Compendium`}/>
                <meta property="og:title" content={`${jptoggledata==true?"JP":"GL"} Force Time Page`}/>
                <meta property="og:description" content={`${jptoggledata==true?"JP":"GL"} Force Time Page`}/>
                <meta property="og:image" content="https://dissidiacompendium.com/images/static/site/logo512.png"/>
                <meta property="og:url" content={`https://dissidiacompendium.com/characters/forcetime/`}/>
            </Helmet>
            <div className="content">
              <h1>{`${jptoggledata==true?"JP":"GL"} Force Time`}</h1>
              <div className="charfilterspacer"/>
              <div key="filter1" onClick={showfilterbutton} className="charfilter"><span className="filterstext"></span>{showFilter ? <TiArrowSortedUp className="uparrow"/> : <TiArrowSortedDown className="downarrow"/>}</div>
              {showFilter == false ? 
              <div className="char-search-reverse-holder">
                <IoSearch className="searchicon"/>
              <div className="search-holder">
                <input 
                    className="char-search-bar" 
                    type="text"
                    placeholder="Search Name"
                    value={searchdisplay}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                {searchTerm === "" ? "" : 
                <IoMdCloseCircleOutline onClick={clearSearch} className="clearsearch"></IoMdCloseCircleOutline>}
                </div>
                </div>
              :""
              }
                <div className="filterholder noselect" id={showFilter ? "showfilteren" : "hiddenfilteren"}>
                    <div className="filterholderflair">
                        <div className="similarbanner"><div className='infoclick' onClick={()=>{setshowinfo((preValue)=>!preValue)}}>Info{showinfo ? <TiArrowSortedUp className="uparrow"/> : <TiArrowSortedDown className="downarrow"/>}</div></div> 
                        {showinfo == false?<br></br>:<div><div className="ultimainfo darkerbg">
                        <div className="yellowcolor">{"Force Gauge active in battle with FR Weapon or Force Enhancement Passive"}</div><br/>
                        <div className="yellowcolor">{"Force Gauge increases every turn, Force Ability is usable at 100%"}</div><br/>
                        <div className="yellowcolor">{"Force Time only possible with a Character that can use a Force Ability"}</div><br/>
                        <div className="yellowcolor">{"Force Abilities can be used during Burst but do not start Force Time"}</div><br/>
                        <div className="yellowcolor">{"Force Time decreases during Burst Phase"}</div><br/>
                        <div className="yellowcolor">{"Force Time increases HP Damage dealt and provides other enhancements"}</div><br/>
                        <div className="yellowcolor">{"Enhancement Passives provide Force enhancements without needing a FR Weapon"}</div>
                        </div>
                        <div className="similarbanner">Needed</div> 
                        <div className="ultimainfo darkerbg">
                        <span className="hiorbm"></span>{" x12 High Power Stone for "}<div className="ultimayellowcolor">{"full MLB"}</div>{", "}<span className="hiorbm"></span>{" x4 per "}<div className="ultimayellowcolor">{"Limit Break"}</div><br/><br/>
                        <span className="orbm"></span>{" x20 Power Stone makes "}<span className="hiorbm"></span>{"x1 "}<div className="ultimayellowcolor">{"High Power Stone"}</div><br/><br/>
                        <span className="orbm"></span>{" x240 needed for "}<div className="ultimayellowcolor">{" MLB "}</div><span className="gorbm"></span>{" x170 "}<div className="ultimayellowcolor">{"Higher Power Orbs "}</div>{"to Max level"}<br/><br/>
                        <span className="hiorbm"></span>{" x4 when selling a "}<div className="ultimayellowcolor">{"FR Weapon"}</div>
                        </div>
                        <div className="similarbanner">Where to get</div>
                        <div className="ultimainfo darkerbg">
                        <span className="frstone"></span>{" x2 Force Stones at FR Weapon "}<div className="ultimayellowcolor">{" Master Limit Break"}</div><br/><br/>
                        <span className="frstone"></span>{" x3 or "}<span className="frshard"></span>{" x60 and "}<span className="bpointm"></span>{" x15,000 Points for "}<div className="ultimayellowcolor">{"Force Enhancement Lv30"}</div><br/><br/>
                        <span className="frshard"></span>{" x20 when completing "}<div className="ultimayellowcolor">{"Shinryu level quests"}</div><br/><br/>
                        <span className="CPIcon CPIconSmaller"></span>{" +90 at Lv30 and "}<span className="CPIcon CPIconSmaller"></span>{" x90"}<div className="ultimayellowcolor">{" required for all passives"}</div>
                        </div></div>}
                        <div className="similarbanner">Refine</div>
                      <div className="typeholder">
                        <Select
                        defaultValue={Typesearch != "" ? {value: Typesearch, label: Typesearch } : null}
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
                        <IoSearch className="innersearchicon"/>
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
                          <div className={`reversebox`} ><i onClick={reversebutton} className={`reversebutton ${loop ? "flip": ""}`} ><ImSortAmountDesc className={`reversebutton ${reverse ? "": "nodisplay"}`}/><ImSortAmountAsc className={`reversebutton ${reverse ? "nodisplay": ""}`}/></i></div>
                        </Tippy>
                         </div>
                         <div>
                          <CopyToClipboard text={url}>
                            <div className="sharebox">
                                <Tippy content="Link Copied!" inertia={true} animation={"shift-away"} touch={true} arrow={false} trigger={"click"} placement={"top"} duration={[100,500]}>
                                    <div className="centertext"><FaShareSquare className="shareicon"/>&nbsp;Share</div>
                                </Tippy>
                            </div>
                            </CopyToClipboard>
                            <Tippy content="Reset Filters" className="tooltip" >
                              <div onClick={resetbutton} className={`clearbox`} ><div className="makecenter">Reset&nbsp;<FaUndoAlt  className={`clearbutton ${clearFilter ? "loop": ""}`} ></FaUndoAlt></div></div>
                            </Tippy>
                          </div>      
                    </div>
                  </div>
                  <div className="ultimaweaponitemholder">
                <div className="subtext">
                  {displayBanner}
                </div>
              {listgear.length > 0 ?  (
                listgear.map(self=>(
                  <CharacterForceCond
                  key={self.CharID}
                  match={self}
                  ProcessedCharacters={ProcessedCharacters}
                  jptoggledata={jptoggledata}
                  />
                ))
                ) : (
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
    )
}
export default FRPage