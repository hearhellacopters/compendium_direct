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
import { FaUndoAlt } from 'react-icons/fa';
import CommandAbilityStandalone from '../components/Abilities/CommandAbilityStandalone.js';
import { getQuery, getQueryStringVal, useQueryParam } from '../components/URLParams';
import { LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';

function CommandAbility ({
    ver,
    loc,
    file,
    newcompare,
    master_index,
    command_ability,
    scrollPosition
}) {

    const rawData = Object.values(command_ability)

    const banerDisplayTerm = "command abilities";

    const startinglimit = 20

    const [formatting, setformatting] = useStateIfMounted(true);

    const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null ? true : false);
    const [clearFilter, setclearFilter] = useStateIfMounted(false);

    const [loop, setLoop] = useStateIfMounted(false);
    const [reverse, setReverse] = useState(getQueryStringVal("rev") != null ? true : false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchdisplay, setsearchdisplay] = useState("");
    const [condFilter, setCondFilter] = useState("");
    const [condFilter2, setCondFilter2] = useState("");
    const [valuedisplay, setvaluedisplay] = useState("");
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
    const [Typesearch, setTypesearch] = useQueryParam("rank", "");
    const [Typesearch2, setTypesearch2] = useQueryParam("type", "");
    const [AdvanceValuesearch, setAdvanceValuesearch] = useQueryParam("value", "");
    const { protocol, pathname, host } = window.location;
    const query = getQuery();
    const url = `${protocol}//${host}${pathname}?${query.toString()}`
    const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
    const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
    const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");

    useEffect(() => {
        //type params
        const type1 = [
            {
                "value": "BRV",
                "label": "BRV"
            },
            {
                "value": "HP",
                "label": "HP"
            },
            {
                "value": "S1",
                "label": "S1"
            },
            {
                "value": "S2",
                "label": "S2"
            },
            {
                "value": "AA",
                "label": "AA"
            },
            {
                "value": "EX",
                "label": "EX"
            },
            {
                "value": "LD",
                "label": "LD"
            },
            {
                "value": "BT",
                "label": "BT"
            },
            {
                "value": "BT+",
                "label": "BT+"
            },
            {
                "value": "FR",
                "label": "FR"
            },
            {
                "value": "FRExt",
                "label": "FRExt"
            },
            {
                "value": "Call 75",
                "label": "Call 75"
            },
            {
                "value": "Call LD",
                "label": "Call LD"
            }
        ]
        if (Typesearch != "") {
            const filteredtype = Object.values(type1).filter(self => self.label == getQueryStringVal("rank"))
            if (filteredtype.length != 0) {
                setTypesearch(getQueryStringVal("rank"))
                setCondFilter(filteredtype[0].value)
            } else {
                setTypesearch("")
                setCondFilter("")
            }
        }
    }, [setCondFilter, Typesearch, setTypesearch])

    useEffect(() => {
        //type params2
        if (Typesearch2 != "") {
            const filteredtype2 = Object.values(master_index.command_data_trans.command_type).filter(self => self.command_type == getQueryStringVal("type"))

            if (filteredtype2.length != 0) {
                setTypesearch2(getQueryStringVal("type"))
                setCondFilter2(filteredtype2[0].id)
            } else {
                setTypesearch2("")
                setCondFilter2("")
            }
        }
    }, [setCondFilter2, master_index, Typesearch2, setTypesearch2])

    useEffect(() => {
        //search params
        if (getQueryStringVal("value") != null) {
            setvaluedisplay(getQueryStringVal("value") != null ? getQueryStringVal("value") : "")
        }
    }, [setvaluedisplay])

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

    //type selector2
    const CondSelect2 = (e) => {
        if (e !== null) {
            setTypesearch2(e.label)
            setCondFilter2(e.id);
        } else {
            setCondFilter2("");
            setTypesearch2("")
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
        if (AdvanceValuesearch != "") {
            const filteredout = rawData.filter(
                (command) =>
                    command && command.atype == AdvanceValuesearch ||
                    command && command.atype_1 == AdvanceValuesearch ||
                    command && command.atype_2 == AdvanceValuesearch ||
                    command && command.atype_3 == AdvanceValuesearch ||
                    command && command.atype_4 == AdvanceValuesearch ||
                    command && command.atype_5 == AdvanceValuesearch ||
                    command && command.atype_6 == AdvanceValuesearch ||
                    command && command.atype_7 == AdvanceValuesearch ||
                    command && command.atype_8 == AdvanceValuesearch ||
                    command && command.atype_9 == AdvanceValuesearch
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
                    a.ca_id - b.ca_id :
                    b.ca_id - a.ca_id);
        const searchit = makeUnique.filter((command) =>
            (`${ver == "GL" ? command.jpname && command.jpname : ""} ${command.name} ${ver == "JP" ? command.glname && command.glname : ""} - #${command.ca_id}`).toLowerCase().includes(searchTerm)
        );
        const getailmentfilter2 = searchit.filter(function (ef) {
            const newfilterpull = ef["rank"] === condFilter;
            if (condFilter !== "") {
                return newfilterpull;
            } else {
                return ef
            }
        });
        const getailmentfilter = getailmentfilter2.filter(function (ef) {
            const newfilterpull = ef["command_type"] == condFilter2;
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
    }, [searchTerm, clearFilter, condFilter, condFilter2, AdvanceValuesearch, reverse]);

    const typeListArray = [
        {
            "value": "BRV",
            "label": "BRV"
        },
        {
            "value": "HP",
            "label": "HP"
        },
        {
            "value": "S1",
            "label": "S1"
        },
        {
            "value": "S2",
            "label": "S2"
        },
        {
            "value": "AA",
            "label": "AA"
        },
        {
            "value": "EX",
            "label": "EX"
        },
        {
            "value": "LD",
            "label": "LD"
        },
        {
            "value": "BT",
            "label": "BT"
        },
        {
            "value": "BT+",
            "label": "BT+"
        },
        {
            "value": "FR",
            "label": "FR"
        },
        {
            "value": "FRExt",
            "label": "FRExt"
        },
        {
            "value": "Call 75",
            "label": "Call 75"
        },
        {
            "value": "Call LD",
            "label": "Call LD"
        }
    ]

    const typeListArray2 = Object.values(master_index.command_data_trans.command_type).map((typeListUnique) => ({
        value: typeListUnique.command_type,
        label: typeListUnique.command_type,
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

    //clear
    const resetbutton = () => {
        setclearFilter(true);
        setReverse(false)

        setAdvanceValuesearch("")
        setReversesearch("")
        setTEXTsearch("")
        setTypesearch("")
        setTypesearch2("")
        setsearchdisplay("");
        setSearchTerm("");
        setCondFilter("")
        setCondFilter2("")
        setvaluedisplay("")

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
                        <Link to={`/${ver}/charability/${file}/compare`} >
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
                        <Link to={`/${ver}/charability/${file}/new`} >
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
                        <Link to={`/${ver}/charability/${file}/compare?filter=true`} >
                            <Tippy content={`Added from update`}>
                                <li className={`${newcompare == "compare" ? "filteractive" : "filterinactive"} buffbutton newbutton`}></li>
                            </Tippy>
                        </Link>
                        <Link to={`/${ver}/charability/${file}/new?filter=true`} >
                            <Tippy content={`Full list`}>
                                <li className={`${newcompare == "new" ? "filteractive" : "filterinactive"} buffbutton fullbutton`}></li>
                            </Tippy>
                        </Link>
                    </ul>
                    <div className="similarbanner">Cast Finder</div>
                    <div className="not_rangeholder">
                        Cast ID
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
                    <div className="similarbanner">Filters</div>
                    <div className="margeholder">
                        <div className="Merge">
                        <Tippy content="Replaces tags with images">
                            <label htmlFor='search' className="MergeText">Formatting?</label>
                        </Tippy>
                        <div key="mergecheck1" className={`${formatting == true ? "nodisplay" : `uncheck`}`} onClick={() => setformatting((prev) => !prev)} />
                        <div key="mergecheck2" className={`${formatting == true ? "check" : `nodisplay`}`} onClick={() => setformatting((prev) => !prev)} />
                        </div>
                    </div>
                    <div className="typeholder">
                        <Select
                            defaultValue={Typesearch2 != "" ? { value: Typesearch2, label: Typesearch2 } : null}
                            key={Typesearch2}
                            isSearchable={true}
                            placeholder="Type Select..."
                            className='typecontainer'
                            classNamePrefix="typetext"
                            onChange={CondSelect2}
                            options={typeListArray2}
                            isClearable={true}
                        />
                    </div>
                    <div className="typeholder">
                        <Select
                            defaultValue={Typesearch != "" ? { value: Typesearch, label: Typesearch } : null}
                            key={Typesearch}
                            isSearchable={true}
                            placeholder="Rank Select..."
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
                                id="search3"
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
                    commandList.map(command => (
                        <LazyLoadComponent
                        key={command.ca_id}
                            scrollPosition={scrollPosition}
                            placeholder={<div className="buffunit">
                                            <div className="infoholder" style={{ minHeight: "220px" }}>
                                            <img className="loadingbardots" src="./images/static/site/loading.gif"/>
                                            </div>
                                        </div>}
                        >
                        <CommandAbilityStandalone
                            key={command.ca_id}
                            command_ability={command}
                            ver={ver}
                            formatting={formatting}
                            master_index={master_index}
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

export default trackWindowScroll(CommandAbility)