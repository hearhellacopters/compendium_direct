import React, {useState, useEffect, useRef} from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom'
import { getQuery, getQueryStringVal, useQueryParam } from './processing/urlparams'
import './JukeBoxStyle.css'
import Select from 'react-select';
import Tippy from './formatting/TippyDefaults.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5'; 
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { slice, concat, } from 'lodash';
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { FaUndoAlt } from 'react-icons/fa'; 
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaShareSquare } from 'react-icons/fa';
import { setPlayVolume } from './redux/ducks/playvolume'
import { setPlaying } from './redux/ducks/playing'
import { setPlayList } from './redux/ducks/playlist'
import { setUpdate } from './redux/ducks/playlist'
import { addTrack } from './redux/ducks/playlist'
import { setMusicKey } from './redux/ducks/playindex'
import { getPlayList } from './redux/ducks/playlist'
import { setFalse, setTrue } from './redux/ducks/jptoggle'

const JukeBox = ({ProcessedMusic, playing, volume, playindex, playlist, musickey}) =>{

  const dispatch = useDispatch();

    const rawData = ProcessedMusic

    const [play, setplay] = useStateIfMounted(false)
    const [song, setsong] = useStateIfMounted(playindex)

    useEffect(()=>{
      setsong(playindex)
    },[playindex,setsong])

   useEffect(()=>{
     if(musickey != undefined){
       dispatch(getPlayList())
       const getSong = rawData.filter(self=>self.MusicKey == musickey)
       if(getSong.length != 0){
         setsong(getSong[0])
       }
     }
   },[musickey,playindex,rawData,setsong,dispatch])
    
    const startinglimit = 50;
  
    const [reverse, setReverse] = useState(getQueryStringVal("rev") != null? true : false);
  
    const banerDisplayTerm = "songs";
    
    const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null  ? true : false);
    const [clearFilter, setclearFilter] = useStateIfMounted(false);
  
    const [loop, setLoop] = useStateIfMounted(false);
    
    const [condFilter, setCondFilter] = useState(getQueryStringVal("series") != null  ? getQueryStringVal("series") : "");
    const [searchTerm, setSearchTerm] = useState(getQueryStringVal("search") != null  ? getQueryStringVal("search").toLowerCase() : "");
    const [typeFilter, setTypeFilter] = useState(getQueryStringVal("song") != null  ? getQueryStringVal("song") : "");
    const [searchdisplay, setsearchdisplay] = useState(getQueryStringVal("search") != null ? getQueryStringVal("search") : "");
    const [filterResults, setFilterResults] = useState(rawData);
    const [searchResults, setSearchResults] = useState(rawData);
    const [limits, setLimits] = useState(startinglimit);
    const [listDisplay, setListDisplay] = useState(
      slice(rawData, 0, startinglimit)
    );
  
    const [listLength, setListLength] = useState(listDisplay.length);
    const [showLoadMore, setShowLoadMore] = useState(true);
    const [displayBanner, setDisplayBanner] = useState(
      <>Displaying <span className="subtextgold">{listLength}</span> of <span className="subtextgold"> {rawData.length}</span> {banerDisplayTerm}</>
    );
  
      const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
      const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
      const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");
      const [Typesearch, setTypesearch] = useQueryParam("song", "");
      const [seriessearch, setseriessearch] = useQueryParam("series", "");
      const { protocol, pathname, host } = window.location;
      const query = getQuery();
      const url = `${protocol}//${host}${pathname}?${query.toString()}`;
  
      //param logic
      useEffect(() => {
        //type params
        if(getQueryStringVal("song") != null){
          const filteredtype = rawData.filter(function (ef) {
            const newfilterpull = ef["name"] === getQueryStringVal("song");
            return newfilterpull;
          })
          if(filteredtype.length != 0){
            setsong(filteredtype[0])
            dispatch(setMusicKey(filteredtype[0].MusicKey))
          }
          if(filteredtype.length != 0){
            setTypesearch(getQueryStringVal("song"))
            setTypeFilter(getQueryStringVal("song"))
            setplay(true)
            setTimeout(() => {
              dispatch(setPlaying(true))
            }, 1000)
          } else{
            setTypesearch("")
            setTypeFilter("")
          }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

              //type params
   useEffect(() => {
    if(getQueryStringVal("series") != null){
      const filteredtype = rawData.filter(function (ef) {
        const newfilterpull = ef["singer"] === getQueryStringVal("series");
        return newfilterpull;
      })
      if(filteredtype.length != 0){
        setseriessearch(getQueryStringVal("series"))
        setCondFilter(getQueryStringVal("series"))
      } else{
        setseriessearch("")
        setCondFilter("")
      }
    }
  },[setseriessearch,rawData])
      
      
  useEffect(() => {
    //search params
    if(getQueryStringVal("search") != null){
      setSearchTerm(getQueryStringVal("search") != null  ? getQueryStringVal("search").toLowerCase() : "")
      setTEXTsearch(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
      setsearchdisplay(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
    }
    }, [setTEXTsearch,setFiltersearch])
        
      
    //filter
    useEffect(() => {
      const filterholder = rawData;
  
        const makeUnique = filterholder
          .filter(onlyUnique)
          .sort((a, b) => 
          reverse == false ? 
          b.MusicKey - a.MusicKey:
          a.MusicKey - b.MusicKey);
        const searchit = makeUnique.filter((e) =>
        (`${e.name}`).toLowerCase().includes(searchTerm)
        );
        const getcondfilter = searchit.filter(function (ef) {
          const newfilterpull = ef["singer"] === condFilter;
          if(condFilter !== "") {
            return newfilterpull;
          } else {
            return ef
          }});
        setFilterResults(makeUnique);
        setSearchResults(getcondfilter);
        const newlistdisplay = slice(getcondfilter, 0, limits);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limits,reverse,searchTerm,typeFilter,condFilter]);

    useEffect(()=>{
      Typesearch != "" ?
      play ? setplay(false) : setplay(true) 
      : ""
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  
      
    //buttons
    const reversebutton = () => {
      if (reverse == false) {
        setReversesearch("true")
        setReverse(true)
      } else {
        setReversesearch("")
        setReverse(false)
      }
      setLoop(true);
      setTimeout(() => setLoop(false), 1000);
    };

    const showfilterbutton = () => {
      if (showFilter == false) {
        setFiltersearch("true")
        setShowFilter(true)
      } else {
        setFiltersearch("")
        setShowFilter(false)
      }
    }

  
    //load more
    const loadMoreButton = () => {
      const newlimits = limits + startinglimit;
      const newLoadMore = searchResults.length > newlimits;
      const newlistdisplay = concat(
        listDisplay,
        slice(searchResults, limits, newlimits)
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
    const typeList = Object.values(rawData).map((item) => item.singer);
    const typeListUnique = typeList
      .filter(onlyUnique)
      .sort()
      .filter(function (el) {
        return el !== undefined;
      });

      const seriesorder = (e) => {
        if(e == 'FFI'){
          return 1
        }
        if(e == 'FFII'){
          return 2
        }
        if(e == 'FFIII'){
          return 3
        }
        if(e == 'FFIV'){
          return 4
        }
        if(e == 'FFIV TAY'){
          return 5
        }
        if(e == 'FFV'){
          return 6
        }
        if(e == 'FFVI'){
          return 7
        }
        if(e == 'FFVII'){
          return 8
        }
        if(e == 'CC FFVII'){
          return 9
        }
        if(e == 'FFVII AC'){
          return 10
        }
        if(e == 'DCFFVII'){
          return 11
        }
        if(e == 'FFVIII'){
          return 12
        }
        if(e == 'FFIX'){
          return 13
        }
        if(e == 'FFX'){
          return 14
        }
        if(e == 'FFX-2'){
          return 15
        }
        if(e == 'FFXI'){
          return 16
        }
        if(e == 'FFXII'){
          return 17
        }
        if(e == 'FFXIIRW'){
          return 18
        }
        if(e == 'FFXIII'){
          return 19
        }
        if(e == 'FFXIII-2'){
          return 20
        }
        if(e == 'LR FFXIII'){
          return 21
        }
        if(e == 'FFXIV'){
          return 22
        }
        if(e == 'FFXV'){
          return 23
        }
        if(e == 'FFT'){
          return 24
        }
        if(e == 'FF0'){
          return 25
        }
        if(e == 'FFCC'){
          return 26
        }
        if(e == 'FFCC RoF'){
          return 27
        }
        if(e == 'FFCC EoT'){
          return 28
        }
        if(e == 'FFCC TCB'){
          return 29
        }
        if(e == 'WOFF'){
          return 30
        }
        if(e == 'DFF'){
          return 31
        }
        if(e == 'DDFF'){
          return 32
        }
        if(e == 'DFFAC'){
          return 33
        }
        if(e == 'DFFNT'){
          return 34
        }
        if(e == 'DFFOO'){
          return 35
        } 
        if(e == 'FFO'){
          return 36
        }else {
          return -1
        }
      }
    const typeListArray = typeListUnique.map((typeListUnique) => ({
      value: typeListUnique,
      label: typeListUnique,
      sort: seriesorder(typeListUnique)
    })).sort((a, b)=>
    a.sort - b.sort)
        
        //type selector
        const seriesSelect = (e) => {
          if (e !== null) {
            setseriessearch(e.value)
            setCondFilter(e.value);
          } else {
            setseriessearch("")
            setCondFilter("");
          }
        };
    
      
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
      
        const listsong = listDisplay;
      
        const resetbutton = () =>{
          setclearFilter(true);
          setReverse(false)
          setplay(false)
          setsearchdisplay("");
          setSearchTerm("");
      
          setTypesearch("")
          setReversesearch("")
          setTEXTsearch("")
      
          setTypeFilter("")
          setTimeout(() => setclearFilter(false), 1000);
        }

        const handleselectmusic = (e) =>{ 
          setTypesearch(e.name);
          setsong(e)
          dispatch(setMusicKey(e.MusicKey))
          dispatch(addTrack([e]))
        }

        const handlesetplaylist = (e) =>{ 
          window.localStorage.setItem('currentList', e)
          dispatch(setPlayList(e))
        }

        const handleaddtrack = (e) =>{ 
          dispatch(addTrack([e]))
        }

  //save
  const playbutton =() => {
    playing? dispatch(setPlaying(false)) : dispatch(setPlaying(true))
  }

  const handlevolume = (e) => {
    dispatch(setPlayVolume(parseFloat(e.target.value)))
  };

  const handleclear =()=>{
    dispatch(setUpdate([]))
  }

  const handleaddlist = () =>{ 
    dispatch(addTrack(searchResults))
    dispatch(setPlayList(playlist))
  }

    const jptoggledata = useSelector((state) => 
        state.toggle.toggle
        );

    const [jponly, setJPonly] = useState(jptoggledata);
    const [JPsearch, setJPSearch] = useQueryParam("JP", "");

    useEffect(() => {
    if(getQueryStringVal("JP") == "true" ){
        dispatch(setTrue())
        setJPSearch("true")
        setJPonly(true)
    } else {
        dispatch(setFalse())
        setJPSearch("")
        setJPonly(false)
    }
    },[setJPSearch,dispatch])

    const jponlybutton = () => {
        if (jptoggledata == false) {
            dispatch(setTrue())
            setJPSearch("true")
            setJPonly(true);
        }    
    };

    const glonlybutton = () => {
        if (jptoggledata == true) {
            dispatch(setFalse())
            setJPSearch("")
            setJPonly(false);
        }
    };

  const noplayicon = <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="react-jinke-music-player-play-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"></path></svg>

  const playingicon = <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="react-jinke-music-player-pause-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm-16 328c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160zm112 0c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160z"></path></svg>
    
    return (
        <div className="wrapper">
        <Helmet>
          <title>Juke Box - Dissidia Compendium</title>
          <meta property="og:site_name" content="Dissidia Compendium"/>
          <meta property="og:type" content="website" />
          <meta name="description" content="JukeBox"/>
          <meta name="twitter:title" content="JukeBox"/>
          <meta name="twitter:description" content="JukeBox"/>
          <meta property="og:title" content="JukeBox"/>
          <meta property="og:description" content="JukeBox"/>
          <meta property="og:url" content="https://dissidiacompendium.com/search/music"/>
        </Helmet>
            <div className="content">
              <h1  >Juke Box</h1>
              <div className="subheader">Find your favorite songs!</div>
              <div className="charfilterspacer"/>
              <div key="filter1" onClick={showfilterbutton} className="charfilter"><span className="filterstext"></span>{showFilter ? <TiArrowSortedUp className="uparrow"/> : <TiArrowSortedDown className="downarrow"/>}</div>
              {showFilter == false ? 
              <div className="event-search-reverse-holder">
                <div className="loopiconholder">
                </div>
                <IoSearch className="searchicon"/>
              <div className="search-holder el">
                    <input 
                    className="char-search-bar" 
                    type="text"
                    placeholder="Song Name"
                    value={searchdisplay}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                {searchTerm === "" ? "" : 
                <IoMdCloseCircleOutline onClick={clearSearch} className="clearsearch"></IoMdCloseCircleOutline>}
                </div>
                <div className="playiconholder">
                {playing ? 
                <Tippy content={"Playing"}>
                <div onClick={playbutton} className="playericon2 clicker">{playingicon}</div> 
                </Tippy>
                : 
                <Tippy content={"Stopped"}>
                <div onClick={playbutton} className="playericon2 clicker">{noplayicon}</div>
                </Tippy>
                }
                </div>
                </div>
              :""
              }
              <div className="filterholder noselect" id={showFilter ? "showfilteren" : "hiddenfilteren"}>
              <div className="similarbanner">             
              {playing ? `Playing: ${song && song.name}` : "Select a song"}
              </div>
                  <div className="filterholderflair">
                  <ul className="spheretypes">
                    <Tippy content="Master Playlist" className="tooltip" >
                    <li className={`${playlist == "master" ? "filteractive" : "filterinactive"} buffbutton button_master`} onClick={()=>handlesetplaylist("master")}></li>
                    </Tippy>
                    <Tippy content="Load Playlist 1" className="tooltip" >
                    <li className={`${playlist == "list1" ? "filteractive" : "filterinactive"} buffbutton button_list1`} onClick={()=>handlesetplaylist("list1")}></li>
                    </Tippy>
                    <Tippy content="Load Playlist 2" className="tooltip" >
                    <li className={`${playlist == "list2" ? "filteractive" : "filterinactive"} buffbutton button_list2`} onClick={()=>handlesetplaylist("list2")}></li>
                    </Tippy>
                    <Tippy content="Load Playlist 3" className="tooltip" >
                    <li className={`${playlist == "list3" ? "filteractive" : "filterinactive"} buffbutton button_list3`} onClick={()=>handlesetplaylist("list3")}></li>
                    </Tippy>
                  </ul>
                  <br/>
                  <ul className="spheretypes">
                    <Tippy content="Add all matching below" className="tooltip" >
                    <li className={`filterinactive buffbutton button_addall`} onClick={()=> handleaddlist()}></li>
                    </Tippy>
                    <Tippy content="Clear playlist" className="tooltip" >
                    <li className={`filterinactive buffbutton button_reset`} onClick={()=> handleclear()}></li>
                    </Tippy>
                  </ul>
                  <div className="typeholder">
                        <Select
                        defaultValue={condFilter != "" ? {value: condFilter, label: condFilter } : null}
                        key={condFilter}
                        isSearchable={true} 
                        placeholder="Series Select..."
                        className='typecontainer' 
                        classNamePrefix="typetext" 
                        onChange={seriesSelect}  
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
                        placeholder="Song Name"
                        value={searchdisplay}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                    {searchTerm === "" ? "" : 
                    <IoMdCloseCircleOutline onClick={clearSearch} className="clearsearch"></IoMdCloseCircleOutline>}
                  </div>
                    <Tippy content="Reverse Order" className="tooltip" >
                      <div className={`reversebox`} ><i onClick={reversebutton} className={`reversebutton ${loop ? "flip": ""}`} ><ImSortAmountAsc className={`reversebutton ${reverse ? "": "nodisplay"}`}/><ImSortAmountDesc className={`reversebutton ${reverse ? "nodisplay": ""}`}/></i></div>
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
                    <div className="controlmusicholder">
                <input 
              className="sumslider" 
              onChange={handlevolume}
              defaultValue={volume} 
              type="range" 
              step={.1}
              min={0} 
              max={1} 
              id="summonlevel"/>
              <div className="playiconholder">
              {playing ? 
                <Tippy content={"Playing"}>
                <div onClick={playbutton} className="playericon2 clicker">{playingicon}</div> 
                </Tippy>
                : 
                <Tippy content={"Stopped"}>
                <div onClick={playbutton} className="playericon2 clicker">{noplayicon}</div>
                </Tippy>
                }
                </div>
                </div>
            </div>
            </div>
              <ul className="bannertabs">
                <Link to={`/search/buffs${jptoggledata == false ? "":"?JP=true"}`}>
                  <li className={""} >Buffs</li>
                </Link>
                <Link to={`/search/abilities${jptoggledata == false ? "":"?JP=true"}`}>
                  <li className={""} >Abilities</li>
                </Link>
                <Link to={`/search/gear${jptoggledata == false ? "":"?JP=true"}`}>
                  <li className={""} >Gear</li>
                </Link>
                <Link to={`/search/passives${jptoggledata == false ? "":"?JP=true"}`}>
                  <li className={""} >Passives</li>
                </Link>
                <Link to={`/search/spheres${jptoggledata == false ? "":"?JP=true"}`}>
                  <li className={""} >Spheres</li>
                </Link>
                <Link to={`/search/stickers${jptoggledata == false ? "":"?JP=true"}`}>
                  <li className={""} >Stickers</li>
                </Link>
                <Link to={`/search/music${jptoggledata == false ? "":"?JP=true"}`}>
                  <li className={"active"} ><span className="gemselected"/>Music</li>
                </Link>
              </ul>
              <div className="buffsholder">
              <div className="subtext">
                  {displayBanner}
                </div>
              {listsong.map(music =>(
                 <div key={music.MusicKey} className="infoholder lowerspace">
                <div  className={`infonameholder ${playindex && playindex.MusicKey == music.MusicKey? "Buffbanner" : "newbackbanner"}`}>
                <span className='add_button clicky' onClick={()=>handleaddtrack(music)}></span><span className='clicky' onClick={() => handleselectmusic(music)}>{" ► "}</span>{music.name}
                </div>
                </div>
              ))}
              {showLoadMore && 
                <div className="loadmore" onClick={loadMoreButton}> Load More </div>}
              </div>
            </div>
        </div>
    )
}
export default JukeBox