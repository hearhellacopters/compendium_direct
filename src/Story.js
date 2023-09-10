import React, { useState, useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import Tippy from './components/TippyDefaults'
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from 'react-helmet-async';
import Select from 'react-select';
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { FaUndoAlt } from 'react-icons/fa'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaShareSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import {BsFillImageFill} from 'react-icons/bs';
import { getQuery, getQueryStringVal, useQueryParam } from './components/URLParams'
import { LazyLoadComponent, LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import { setFalse, setTrue } from './redux/ducks/jptoggle'

function Story({
    ver,
    ProcessedCharacters,
    talk,
    talk_index,
    scrollPosition
}){
    const startinglimit = 999

    const [rawData, setrawData] = useStateIfMounted(Object.values(talk))

    const banerDisplayTerm = "scripts";

    const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null ? true : false);
    const [clearFilter, setclearFilter] = useStateIfMounted(false);

    const [act1display, setact1display] = useState([]);
    const [act2display, setact2display] = useState([]);
    const [act3display, setact3display] = useState([]);
    const [act4display, setact4display] = useState([]);
    const [chaptersdisplay, setchaptersdisplay] = useState([]);
    const [willsdisplay, setwillsdisplay] = useState([]);
    const [eventsdisplay, seteventsdisplay] = useState([]);
    const [illusionsdisplay, setillusionsdisplay] = useState([]);

    const [maps, setmaps] = useState(getQueryStringVal("maps") != null ? false : true);

    const [act1, setact1] = useState(getQueryStringVal("act1") != null ? true : false);
    const [act2, setact2] = useState(getQueryStringVal("act2") != null ? true : false);
    const [act3, setact3] = useState(getQueryStringVal("act3") != null ? true : false);
    const [act4, setact4] = useState(getQueryStringVal("act4") != null ? true : false);
    const [chapters, setchapters] = useState(getQueryStringVal("chapters") != null ? true : false);
    const [wills, setwills] = useState(getQueryStringVal("wills") != null ? true : false);
    const [events, setevents] = useState(getQueryStringVal("events") != null ? true : false);
    const [illusions, setillusions] = useState(getQueryStringVal("illusions") != null ? true : false);

    const [mapssearch, setmapssearch] = useQueryParam("maps", "");

    const [act1search, setact1search] = useQueryParam("act1", "");
    const [act2search, setact2search] = useQueryParam("act2", "");
    const [act3search, setact3search] = useQueryParam("act3", "");
    const [act4search, setact4search] = useQueryParam("act4", "");
    const [chapterssearch, setchapterssearch] = useQueryParam("chapters", "");
    const [willssearch, setwillssearch] = useQueryParam("wills", "");
    const [eventssearch, seteventssearch] = useQueryParam("events", "");
    const [illusionssearch, setillusionssearch] = useQueryParam("illusions", "");

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
        <>Displaying <span className="subtextgold">{listLength}</span> of <span className="subtextgold"> {rawData.length}</span> {banerDisplayTerm}</>
    );

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
    const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
    const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");
    const [Typesearch, setTypesearch] = useQueryParam("Char", "");
    const { protocol, pathname, host } = window.location;
    const query = getQuery();
    const url = `${protocol}//${host}${pathname}?${query.toString()}`

    useEffect(() => {
        //type params
        if (Typesearch != null) {
            const ID_PULL = Object.values(ProcessedCharacters).filter(self => self.CharacterName == getQueryStringVal("Char"))
            const match_id = ID_PULL[0] && ID_PULL[0].CharID
            if (match_id != undefined) {
                setTypesearch(getQueryStringVal("Char"))
                setCondFilter(match_id)
            } else {
                setTypesearch("")
                setCondFilter("")
            }
        }
    }, [setCondFilter,  Typesearch, setTypesearch, ProcessedCharacters])

    useEffect(() => {
        //search params
        if (getQueryStringVal("search") != null) {
            setSearchTerm(getQueryStringVal("search") != null ? getQueryStringVal("search").toLowerCase() : "")
            setTEXTsearch(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
            setsearchdisplay(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
        }
    }, [setTEXTsearch, setFiltersearch])

    useEffect(() => {
        var filterholder = [];

        if (ver != undefined) {
            const filteredout = rawData.filter(
                (ef) => ef[ver] == true
            );
            filterholder.push(...filteredout);
        }

        if (condFilter != "") {
            filterholder = rawData.filter(
                (ef) => ef.char_ids.some(id=> id== condFilter)
            );
        }

        const makeUnique = filterholder
            .filter(onlyUnique)
            .sort((a, b) =>
                reverse === false ?
                    b.or - a.or :
                    a.or - b.or
            );
        const searchit = searchTerm == "" ? makeUnique : makeUnique.filter((story) =>
            (`${story && story.name} ${story && story.jpname}`).toLowerCase().includes(searchTerm)
        );
        const getcharacterfilter = searchit.filter(function (ef) {
            const newfilterpull = ef.char_ids.some(id=> id== condFilter)
            if (condFilter !== "") {
              return newfilterpull;
            } else {
              return ef
            }
          });
        setFilterResults(makeUnique);
        setact1display(getcharacterfilter.filter(self=>self.field_type == 1 && self.story_part == 1))
        setact2display(getcharacterfilter.filter(self=>self.field_type == 1 && self.story_part == 2))
        setact3display(getcharacterfilter.filter(self=>self.field_type == 1 && self.story_part == 3))
        setact4display(getcharacterfilter.filter(self=>self.field_type == 1 && self.story_part == 4))
        setchaptersdisplay(getcharacterfilter.filter(self=>self.field_type == 4))
        setwillsdisplay(getcharacterfilter.filter(self=>self.field_type == 14))
        seteventsdisplay(getcharacterfilter.filter(self=>self.field_type == 2 || self.field_type == 5 || self.field_type == 8 || self.field_type == 11 || self.field_type == 12|| self.field_type == 13 || self.field_type == 15 || self.field_type == 16 || self.field_type == 18))
        setillusionsdisplay(getcharacterfilter.filter(self=>self.field_type == 3 || self.field_type == 6 || self.field_type == 17))
        setSearchResults(getcharacterfilter);
        setListDisplay(getcharacterfilter);
    },[rawData,limits,searchTerm,reverse,condFilter,ver])

    const showfilterbutton = () => {
        if (showFilter == false) {
            setFiltersearch("true")
        } else {
            setFiltersearch("")
        }
        setShowFilter((prevValue) => !prevValue);
    }

    const dispatch = useDispatch();

    const jptoggledata = useSelector((state) =>
        state.toggle.toggle
    );

    const [jponly, setJPonly] = useStateIfMounted(jptoggledata);
    const [JPsearch, setJPSearch] = useQueryParam("JP", "");

    const jponlybutton = () => {
        if (jponly == false) {
            dispatch(setTrue())
            setJPSearch("true")
            setJPonly(true);
        } else {
            dispatch(setFalse())
            setJPSearch("")
            setJPonly(false);
        }
    };

    const setGLbutton = () => {
        if (jponly == true) {
            dispatch(setFalse())
            setJPSearch("")
            setJPonly(false);
        }
    };

    const setJPbutton = () => {
        if (jponly == false) {
            dispatch(setTrue())
            setJPSearch("true")
            setJPonly(true);
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

    //type list
    const typeListArray = Object.values(ProcessedCharacters).filter(self => ver == "JP" ? self.JPOrder != undefined : self.GLOrder != undefined).sort((a, b) => ver == "JP" ? b.JPOrder - a.JPOrder : b.GLOrder - a.GLOrder).map((typeListUnique) => ({
        value: typeListUnique.CharacterName,
        label: typeListUnique.CharacterName,
        id: typeListUnique.CharID,
    }));

    //type selector
    const CondSelect = (e) => {
        if (e !== null) {
            setTypesearch(e.value)
            setCondFilter(e.id);
        } else {
            setCondFilter("");
            setTypesearch("")
        }
    };

    const clearSearch = () => {
        setsearchdisplay("")
        setSearchTerm("");
        setTEXTsearch("")
    };

    const resetbutton = () => {
        setclearFilter(true);
        setReverse(false)
        setReverse(false)
        setReversesearch("")
        setTEXTsearch("")
        setsearchdisplay("");
        setSearchTerm("");
        setCondFilter("")
        setTypesearch("")

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

    const act1button = () => {
        if (act1 == false) {
            setact1search("true")
        } else {
            setact1search("")
        }
        setact2(false)
        setact2search("")
        setact3(false)
        setact3search("")
        setact4(false)
        setact4search("")
        setchapters(false)
        setchapterssearch("")
        setwills(false)
        setwillssearch("")
        setevents(false)
        seteventssearch("")
        setillusions(false)
        setillusionssearch("")
        setact1((prevValue) => !prevValue);
    };

    const act2button = () => {
        if (act2 == false) {
            setact2search("true")
        } else {
            setact2search("")
        }
        setact1(false)
        setact1search("")
        setact3(false)
        setact3search("")
        setact4(false)
        setact4search("")
        setchapters(false)
        setchapterssearch("")
        setwills(false)
        setwillssearch("")
        setevents(false)
        seteventssearch("")
        setillusions(false)
        setillusionssearch("")
        setact2((prevValue) => !prevValue);
    };

    const act3button = () => {
        if (act3 == false) {
            setact3search("true")
        } else {
            setact3search("")
        }
        setact1(false)
        setact1search("")
        setact2(false)
        setact2search("")
        setact4(false)
        setact4search("")
        setchapters(false)
        setchapterssearch("")
        setwills(false)
        setwillssearch("")
        setevents(false)
        seteventssearch("")
        setillusions(false)
        setillusionssearch("")
        setact3((prevValue) => !prevValue);
    };

    const act4button = () => {
        if (act4 == false) {
            setact4search("true")
        } else {
            setact4search("")
        }
        setact1(false)
        setact1search("")
        setact2(false)
        setact2search("")
        setact3(false)
        setact3search("")
        setchapters(false)
        setchapterssearch("")
        setwills(false)
        setwillssearch("")
        setevents(false)
        seteventssearch("")
        setillusions(false)
        setillusionssearch("")
        setact4((prevValue) => !prevValue);
    };

    const chaptersbutton = () => {
        if (chapters == false) {
            setchapterssearch("true")
        } else {
            setchapterssearch("")
        }
        setact1(false)
        setact1search("")
        setact2(false)
        setact2search("")
        setact3(false)
        setact3search("")
        setact4(false)
        setact4search("")
        setwills(false)
        setwillssearch("")
        setevents(false)
        seteventssearch("")
        setillusions(false)
        setillusionssearch("")
        setchapters((prevValue) => !prevValue);
    };

    const willsbutton = () => {
        if (wills == false) {
            setwillssearch("true")
        } else {
            setwillssearch("")
        }
        setact1(false)
        setact1search("")
        setact2(false)
        setact2search("")
        setact3(false)
        setact3search("")
        setact4(false)
        setact4search("")
        setevents(false)
        seteventssearch("")
        setchapters(false)
        setchapterssearch("")
        setillusions(false)
        setillusionssearch("")
        setwills((prevValue) => !prevValue);
    };

    const eventsbutton = () => {
        if (events == false) {
            seteventssearch("true")
        } else {
            seteventssearch("")
        }
        setact1(false)
        setact1search("")
        setact2(false)
        setact2search("")
        setact3(false)
        setact3search("")
        setact4(false)
        setact4search("")
        setwills(false)
        setwillssearch("")
        setchapters(false)
        setchapterssearch("")
        setillusions(false)
        setillusionssearch("")
        setevents((prevValue) => !prevValue);
    };

    const illusionsbutton = () => {
        if (illusions == false) {
            setillusionssearch("true")
        } else {
            setillusionssearch("")
        }
        setact1(false)
        setact1search("")
        setact2(false)
        setact2search("")
        setact3(false)
        setact3search("")
        setact4(false)
        setact4search("")
        setevents(false)
        seteventssearch("")
        setchapters(false)
        setchapterssearch("")
        setwills(false)
        setwillssearch("")
        setillusions((prevValue) => !prevValue);
    };

    const mapsbutton = () => {
        if (maps == true) {
          setmapssearch("false")
        } else {
          setmapssearch("")
        }
        setmaps((prevValue) => !prevValue);
      };

    const make_image = (data) =>{
        var image = `https://dissidiacompendium.com/images/static/banners/${ver.toLowerCase()}/event/eventtitle`
        if(data[`${ver}_banner`] != undefined && data[`${ver}_banner`][0]!= undefined){
            image = image + data[`${ver}_banner`][0] + "out.png"
        } else {
            image = image + "temp1out.png"
        }
        return(
                <Link className='teventimage' to={`/story/${data.field_id}`}>
                <LazyLoadImage
                key={`${data.or}_${data.eventindex}`}
                scrollPosition={scrollPosition}
                alt={data.name}
                placeholder={<div className='teventimage_dummy'/>}
                className='teventimage'
                src={image}
                effect="opacity"
                />
                </Link>
            )
    }

    return (
        <div>
            <Helmet>
                <title>Story - Dissidia Compendium</title>
                <meta property="og:site_name" content="Dissidia Compendium" />
                <meta property="og:type" content="website" />
                <meta name="description" content="Buffs" />
                <meta name="twitter:title" content="Buffs" />
                <meta name="twitter:description" content="Story" />
                <meta property="og:title" content="Story" />
                <meta property="og:description" content="Story" />
                <meta property="og:url" content="https://dissidiacompendium.com/story" />
            </Helmet>
            <div className="content">
            <h1>{`${jptoggledata == false ? "GL" : "JP"} Story`}</h1>
                <div className="subheader">
                    Use filters to limit returns
                </div>
                <div className="charfilterspacer" />
                <div key="filter1" onClick={showfilterbutton} className="charfilter"><span className="filterstext"></span>{showFilter ? <TiArrowSortedUp className="uparrow" /> : <TiArrowSortedDown className="downarrow" />}</div>
                {showFilter == false ?
                    <div className="event-search-reverse-holder">
                        <span className={`${jptoggledata ? "jponlybackground" : "GLonlybackground"}`}>
                            <Tippy content={`${jptoggledata == true ? "Switch to GL" : "Switch to JP"}`} className="tooltip" >
                                <span onClick={jponlybutton} className={`${jptoggledata ? "jpflage jpsmallinactive smalleventbutton" : "glflage smalleventbutton"}`} />
                            </Tippy>
                        </span>
                        <IoSearch className="searchicon" />
                        <div className="search-holder el">
                            <input
                                className="char-search-bar"
                                type="text"
                                id="search"
                                placeholder="Search"
                                value={searchdisplay}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                            />
                            <span className="Spoilerbackground">
                                <Tippy content="World Map" className="tooltip" >
                                <span onClick={mapsbutton} ><BsFillImageFill size={"1.5rem"} className={`mapsicon ${maps ? "pastsmallinactive" : "pastsmallactive"}`}/></span>
                                </Tippy>
                            </span>
                            {searchTerm === "" ? "" :
                                <IoMdCloseCircleOutline onClick={clearSearch} className="clearsearch"></IoMdCloseCircleOutline>}
                        </div>
                    </div>
                : 
                <div className="filterholder noselect" id={showFilter ? "showfilteren" : "hiddenfilteren"}>
                    <div className="filterholderflair">
                    <div className="similarbanner">Refine</div>
                    <span onClick={mapsbutton} className='mapspan'><BsFillImageFill size={"1.5rem"} className={`mapsicon ${maps ? "pastsmallinactive" : "pastsmallactive"}`}/>&nbsp;Toggle World Map</span>
                    <div className="typeholder">
                            <Select
                                defaultValue={Typesearch != "" ? { value: Typesearch, label: Typesearch } : null}
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
                            <IoSearch className="innersearchicon" />
                            <input
                                className="search-bar"
                                type="text"
                                id="search"
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
                }
                <div className="characterholder">
                    <div className='talk_bar_holder talk_click' onClick={act1button}>
                        <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/actbar_l.png)","--width":"27px"}} className="talk_storybar_l"/>
                            <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/actbar_c.png)"}}  className="talk_storybar_c">
                                <span style={{textAlign:"center",width:"100%"}}>{"Story Act 1"}</span>
                            </div>
                        <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/actbar_r.png)","--width":"27px"}}  className="talk_storybar_r"/>
                    </div>
                    {act1 == true ?
                        act1display.length != 0 ?
                        <span className={maps == true ? 'worldmap1':""}>
                        {act1display.map(field=>(
                            maps == true ?
                            <Tippy key={field.or} content={field.name}>
                                <Link 
                                to={`/story/${field.field_id}`}
                                style={{
                                    left: field.left||0,
                                    top: field.top||0,
                                    height: field.height||0,
                                    width: field.width||0,
                                }}
                                className={`world_object ${searchTerm!=""||condFilter!=""? " makevis":""}`}
                                />
                            </Tippy>
                            :
                            <Tippy key={field.or} content={field.name}>
                                {make_image(field)}
                            </Tippy>
                        ))}
                        </span>
                        :
                        "No returns"
                    :""}
                    <div className='talk_bar_holder talk_click' onClick={act2button}>
                        <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/actbar_l.png)","--width":"27px"}} className="talk_storybar_l"/>
                            <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/actbar_c.png)"}}  className="talk_storybar_c">
                                <span style={{textAlign:"center",width:"100%"}}>{"Story Act 2"}</span>
                            </div>
                        <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/actbar_r.png)","--width":"27px"}}  className="talk_storybar_r"/>
                    </div>
                    {act2 == true ?
                        act2display.length != 0 ?
                        <span className={maps == true ? 'worldmap2':""}>
                        {act2display.map(field=>(
                            maps == true ?
                            <Tippy key={field.or} content={field.name}>
                                <Link 
                                to={`/story/${field.field_id}`}
                                style={{
                                    left: field.left||0,
                                    top: field.top||0,
                                    height: field.height||0,
                                    width: field.width||0,
                                }}
                                className={`world_object ${searchTerm!=""||condFilter!=""? " makevis":""}`}
                                />
                            </Tippy>
                            :
                            <Tippy key={field.or} content={field.name}>
                                {make_image(field)}
                            </Tippy>
                        ))}
                        </span>
                        :
                        "No returns"
                    :""}
                    <div className='talk_bar_holder talk_click' onClick={act3button}>
                        <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/actbar_l.png)","--width":"27px"}} className="talk_storybar_l"/>
                            <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/actbar_c.png)"}}  className="talk_storybar_c">
                                <span style={{textAlign:"center",width:"100%"}}>{"Story Act 3"}</span>
                            </div>
                        <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/actbar_r.png)","--width":"27px"}}  className="talk_storybar_r"/>
                    </div>
                    {act3 == true ?
                        act3display.length != 0 ?
                        <span className={maps == true ? 'worldmap3':""}>
                        {act3display.map(field=>(
                            maps == true ?
                            <Tippy key={field.or} content={field.name}>
                                <Link 
                                to={`/story/${field.field_id}`}
                                style={{
                                    left: field.left||0,
                                    top: field.top||0,
                                    height: field.height||0,
                                    width: field.width||0,
                                }}
                                className={`world_object ${searchTerm!=""||condFilter!=""? " makevis":""}`}
                                />
                            </Tippy>
                            :
                            <Tippy key={field.or} content={field.name}>
                                {make_image(field)}
                            </Tippy>
                        ))}
                        </span>
                        :
                        "No returns"
                    :""}
                    <div className='talk_bar_holder talk_click' onClick={act4button}>
                        <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/actbar_l.png)","--width":"27px"}} className="talk_storybar_l"/>
                            <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/actbar_c.png)"}}  className="talk_storybar_c">
                                <span style={{textAlign:"center",width:"100%"}}>{"Story Act 4"}</span>
                            </div>
                        <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/actbar_r.png)","--width":"27px"}}  className="talk_storybar_r"/>
                    </div>
                    {act4 == true ?
                        act4display.length != 0 ?
                        <span className={maps == true ? 'worldmap4':""}>
                        {act4display.map(field=>(
                            maps == true ?
                            <Tippy key={field.or}  content={field.name}>
                                <Link 
                                to={`/story/${field.field_id}`}
                                style={{
                                    left: field.left||0,
                                    top: field.top||0,
                                    height: field.height||0,
                                    width: field.width||0,
                                }}
                                className={`world_object ${searchTerm!=""||condFilter!=""? " makevis":""}`}
                                />
                            </Tippy>
                            :
                            <Tippy key={field.or} content={field.name}>
                                {make_image(field)}
                            </Tippy>
                        ))}
                        </span>
                        :
                        "No returns"
                    :""}
                    <div className='talk_bar_holder talk_click' onClick={chaptersbutton}>
                        <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/chapterbar_l.png)","--width":"27px"}} className="talk_storybar_l"/>
                            <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/chapterbar_c.png)"}}  className="talk_storybar_c">
                                <span style={{textAlign:"center",width:"100%"}}>{"Lost Chapters"}</span>
                            </div>
                        <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/chapterbar_r.png)","--width":"27px"}}  className="talk_storybar_r"/>
                    </div>
                    {chapters == true ?
                        chaptersdisplay.length != 0 ?
                        chaptersdisplay.map(field=>(
                            <Tippy key={field.or} content={field.name}>
                                {make_image(field)}
                            </Tippy>
                        )):
                        "No returns"
                    :""}
                    <div className='talk_bar_holder talk_click' onClick={willsbutton}>
                        <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/chapterbar_l.png)","--width":"27px"}} className="talk_storybar_l"/>
                            <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/chapterbar_c.png)"}}  className="talk_storybar_c">
                                <span style={{textAlign:"center",width:"100%"}}>{"Intersecting Wills"}</span>
                            </div>
                        <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/chapterbar_r.png)","--width":"27px"}}  className="talk_storybar_r"/>
                    </div>
                    {wills == true ?
                        willsdisplay.length != 0 ?
                        willsdisplay.map(field=>(
                            <Tippy key={field.or} content={field.name}>
                                {make_image(field)}
                            </Tippy>
                        )):
                        "No returns"
                    :""}
                    <div className='talk_bar_holder talk_click' onClick={eventsbutton}>
                        <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/otherbar_l.png)","--width":"16px"}} className="talk_storybar_l"/>
                            <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/otherbar_c.png)"}}  className="talk_storybar_c">
                                <span style={{textAlign:"center",width:"100%"}}>{"Events"}</span>
                            </div>
                        <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/otherbar_r.png)","--width":"16px"}}  className="talk_storybar_r"/>
                    </div>
                    {events == true ?
                        eventsdisplay.length != 0 ?
                        eventsdisplay.map(field=>(
                            <Tippy key={field.or} content={field.name}>
                                {make_image(field)}
                            </Tippy>
                        )):
                        "No returns"
                    :""}
                    <div className='talk_bar_holder talk_click' onClick={illusionsbutton}>
                        <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/otherbar_l.png)","--width":"16px"}} className="talk_storybar_l"/>
                            <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/otherbar_c.png)"}}  className="talk_storybar_c">
                                <span style={{textAlign:"center",width:"100%"}}>{"World of Illusions"}</span>
                            </div>
                        <div style={{"--image":"url(https://dissidiacompendium.com/images/static/icons/banners/talk/otherbar_r.png)","--width":"16px"}}  className="talk_storybar_r"/>
                    </div>
                    {illusions == true ?
                        illusionsdisplay.length != 0 ?
                        illusionsdisplay.map(field=>(
                            <Tippy key={field.or} content={field.name}>
                                {make_image(field)}
                            </Tippy>
                        )):
                        "No returns"
                    :""}
                </div>
            </div>
        </div>
    )
}

export default trackWindowScroll(Story)