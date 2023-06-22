import React, { useState, useEffect } from 'react';
import Tippy from '../TippyDefaults';
import { useStateIfMounted } from "use-state-if-mounted";
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { FaUndoAlt } from 'react-icons/fa'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import { getQuery, getQueryStringVal, useQueryParam } from '../URLParams'
import 'react-flow-renderer/dist/theme-default.css';
import CharacterAbilitySubListFormatting from './CharacterAbilitySubListFormatting';

export default function CharacterAbilityPageFormatting({
    ability_data,
    buff_data,
    selected_id,
    ProcessedCharacters,
    ver,
    loc,
    newcompare,
    file,

    formatting,
    showFilter,
    master_index
}){

    const rawData = Object.values(ability_data)

    const banerDisplayTerm = "character abilities"

    const startinglimit = 999

    //show icons

    const [showBRV, setshowBRV] = useStateIfMounted(false);
    const [showHP, setshowHP] = useStateIfMounted(false);
    const [showS1, setshowS1] = useStateIfMounted(false);
    const [showS2, setshowS2] = useStateIfMounted(false);
    const [showAA, setshowAA] = useStateIfMounted(false);
    const [showEX, setshowEX] = useStateIfMounted(false);
    const [showLD, setshowLD] = useStateIfMounted(false);
    const [showBT, setshowBT] = useStateIfMounted(false);
    const [showFR, setshowFR] = useStateIfMounted(false);
    const [showCALL75, setshowCALL75] = useStateIfMounted(false);
    const [showCALLLD, setshowCALLLD] = useStateIfMounted(false);

    useEffect(() => {
        const filtered_ability = Object.values(ability_data).filter(self => self.full == true)
        if (filtered_ability.some(self => self.rank == "BRV")) {
            setshowBRV(true)
        }
        if (filtered_ability.some(self => self.rank == "HP")) {
            setshowHP(true)
        }
        if (filtered_ability.some(self => self.rank == "S1")) {
            setshowS1(true)
        }
        if (filtered_ability.some(self => self.rank == "S2")) {
            setshowS2(true)
        }
        if (filtered_ability.some(self => self.rank == "AA")) {
            setshowAA(true)
        }
        if (filtered_ability.some(self => self.rank == "EX")) {
            setshowEX(true)
        }
        if (filtered_ability.some(self => self.rank == "LD")) {
            setshowLD(true)
        }
        if (filtered_ability.some(self => self.rank == "BT")) {
            setshowBT(true)
        }
        if (filtered_ability.some(self => self.rank == "FR")) {
            setshowFR(true)
        }
        if (filtered_ability.some(self => self.rank == "Call75")) {
            setshowCALL75(true)
        }
        if (filtered_ability.some(self => self.rank == "CallLD")) {
            setshowCALLLD(true)
        }
        // eslint-disable-next-line
    }, [ability_data])

    const [activeBRVsearch, setactiveBRVsearch] = useQueryParam("BRV", "");
    const [activeHPsearch, setactiveHPsearch] = useQueryParam("HP", "");
    const [activeS1search, setactiveS1search] = useQueryParam("S1", "");
    const [activeS2search, setactiveS2search] = useQueryParam("S2", "");
    const [activeAAsearch, setactiveAAsearch] = useQueryParam("AA", "");
    const [activeEXsearch, setactiveEXsearch] = useQueryParam("EX", "");
    const [activeLDsearch, setactiveLDsearch] = useQueryParam("LD", "");
    const [activeBTsearch, setactiveBTsearch] = useQueryParam("BT", "");
    const [activeFRsearch, setactiveFRsearch] = useQueryParam("FR", "");
    const [activeCALL75search, setactiveCALL75search] = useQueryParam("Call75", "");
    const [activeCALLLDsearch, setactiveCALLLDsearch] = useQueryParam("CallLD", "");

    const [activeBRV, setactiveBRV] = useStateIfMounted(getQueryStringVal("BRV") != null ? true : false);
    const [activeHP, setactiveHP] = useStateIfMounted(getQueryStringVal("HP") != null ? true : false);
    const [activeS1, setactiveS1] = useStateIfMounted(getQueryStringVal("S1") != null ? true : false);
    const [activeS2, setactiveS2] = useStateIfMounted(getQueryStringVal("S2") != null ? true : false);
    const [activeAA, setactiveAA] = useStateIfMounted(getQueryStringVal("AA") != null ? true : false);
    const [activeEX, setactiveEX] = useStateIfMounted(getQueryStringVal("EX") != null ? true : false);
    const [activeLD, setactiveLD] = useStateIfMounted(getQueryStringVal("LD") != null ? true : false);
    const [activeBT, setactiveBT] = useStateIfMounted(getQueryStringVal("BT") != null ? true : false);
    const [activeFR, setactiveFR] = useStateIfMounted(getQueryStringVal("FR") != null ? true : false);
    const [activeCALL75, setactiveCALL75] = useStateIfMounted(getQueryStringVal("Call75") != null ? true : false);
    const [activeCALLLD, setactiveCALLLD] = useStateIfMounted(getQueryStringVal("CallLD") != null ? true : false);

    const [upgraded, setupgraded] = useState(getQueryStringVal("upgraded") != null ? false : true);
    const [clearFilter, setclearFilter] = useStateIfMounted(false);

    const [loop, setLoop] = useStateIfMounted(false);
    const [reverse, setReverse] = useState(getQueryStringVal("rev") != null ? true : false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchdisplay, setsearchdisplay] = useState("");
    const [valuedisplay, setvaluedisplay] = useState("");
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
    const [Typesearch, setTypesearch] = useQueryParam("rank", "");
    const [Typesearch2, setTypesearch2] = useQueryParam("char", "");
    const [AdvanceValuesearch, setAdvanceValuesearch] = useQueryParam("command", "");
    const [AdvanceValuesearch3, setAdvanceValuesearch3] = useQueryParam("ailment", "");
    const { protocol, pathname, host } = window.location;
    const query = getQuery();
    const url = `${protocol}//${host}${pathname}?${query.toString()}`
    const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
    const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
    const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");
    const [upgradedsearch, setupgradedsearch] = useQueryParam("upgraded", "");

    useEffect(() => {
        if (activeBT == false) {
            setactiveBTsearch("")
        } else {
            setactiveBTsearch("true")
        }
        if (activeFR == false) {
            setactiveFRsearch("")
        } else {
            setactiveFRsearch("true")
        }
        if (activeEX == false) {
            setactiveEXsearch("")
        } else {
            setactiveEXsearch("true")
        }
        if (activeLD == false) {
            setactiveLDsearch("")
        } else {
            setactiveLDsearch("true")
        }
        if (activeS1 == false) {
            setactiveS1search("")
        } else {
            setactiveS1search("true")
        }
        if (activeS2 == false) {
            setactiveS2search("")
        } else {
            setactiveS2search("true")
        }
        if (activeAA == false) {
            setactiveAAsearch("")
        } else {
            setactiveAAsearch("true")
        }
        if (activeCALL75 == false) {
            setactiveCALL75search("")
        } else {
            setactiveCALL75search("true")
        }
        if (activeCALLLD == false) {
            setactiveCALLLDsearch("")
        } else {
            setactiveCALLLDsearch("true")
        }
        if (activeBRV == false) {
            setactiveBRVsearch("")
        } else {
            setactiveBRVsearch("true")
        }
        if (activeHP == false) {
            setactiveHPsearch("")
        } else {
            setactiveHPsearch("true")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeBT, activeFR, activeEX, activeS2, activeS1, activeLD, activeAA, activeCALL75, activeCALLLD, activeBRV, activeHP])

    useEffect(() => {
        if (upgraded == true) {
            setupgradedsearch("")
        } else {
            setupgradedsearch("false")
        }
        if (reverse == false) {
            setReversesearch("")
        } else {
            setReversesearch("true")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [upgraded, reverse])

    const upgradedbutton = () => {
        if (upgraded == false) {
            setupgradedsearch("true")
        } else {
            setupgradedsearch("")
        }
        setupgraded((prevValue) => !prevValue);
    }

    useEffect(() => {
        //search params
        if (getQueryStringVal("command") != null) {
            setvaluedisplay(getQueryStringVal("command") != null ? getQueryStringVal("command") : "")
        }
    }, [setvaluedisplay])

    useEffect(() => {
        //search params
        if (getQueryStringVal("ailment") != null) {
            setvaluedisplay3(getQueryStringVal("ailment") != null ? getQueryStringVal("ailment") : "")
        }
    }, [setvaluedisplay3])

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


    //unique
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    useEffect(() => {
        const filterholder = [];
        var rawData2 = rawData
        if (upgraded == true) {
            const filteredout = rawData.filter(
                (command) =>
                    command && command.full == true
            );
            rawData2 = filteredout;
        }

        if (AdvanceValuesearch3 != "") {
            const filteredout = rawData2.filter(
                (command) =>
                    command && command.command && command.command.casts &&
                    command.command.casts.some(self => (
                        self.id == AdvanceValuesearch3
                    ))

            );
            filterholder.push(...filteredout);
        }

        if (AdvanceValuesearch != "") {
            const filteredout = rawData2.filter(
                (command) =>
                    command && command.LearningAbility == AdvanceValuesearch
            );
            filterholder.push(...filteredout);
        }

        //buttons
        if (activeBRV == true) {
            const filteredout = rawData2.filter(
                (ef) =>
                    ef && ef.rank == "BRV"
            );
            filterholder.push(...filteredout);
        }
        if (activeHP == true) {
            const filteredout = rawData2.filter(
                (ef) =>
                    ef && ef.rank == "HP"
            );
            filterholder.push(...filteredout);
        }
        if (activeCALL75 == true) {
            const filteredout = rawData2.filter(
                (ef) =>
                    ef && ef.rank == "Call75"
            );
            filterholder.push(...filteredout);
        }
        if (activeCALLLD == true) {
            const filteredout = rawData2.filter(
                (ef) =>
                    ef && ef.rank == "CallLD"
            );
            filterholder.push(...filteredout);
        }
        if (activeAA == true) {
            const filteredout = rawData2.filter(
                (ef) =>
                    ef && ef.rank == "AA"
            );
            filterholder.push(...filteredout);
        }
        if (activeS1 == true) {
            const filteredout = rawData2.filter(
                (ef) =>
                    ef && ef.rank == "S1"
            );
            filterholder.push(...filteredout);
        }
        if (activeS2 == true) {
            const filteredout = rawData2.filter(
                (ef) =>
                    ef && ef.rank == "S2"
            );
            filterholder.push(...filteredout);
        }
        if (activeEX == true) {
            const filteredout = rawData2.filter(
                (ef) =>
                    ef && ef.rank == "EX"
            );
            filterholder.push(...filteredout);
        }
        if (activeLD == true) {
            const filteredout = rawData2.filter(
                (ef) =>
                    ef && ef.rank == "LD"
            );
            filterholder.push(...filteredout);
        }
        if (activeFR == true) {
            const filteredout = rawData2.filter(
                (ef) =>
                    ef && ef.rank == "FR"
            );
            filterholder.push(...filteredout);
        }

        if (activeBT == true) {
            const filteredout = rawData2.filter(
                (ef) =>
                    ef && ef.rank == "BT"
            );
            filterholder.push(...filteredout);
        }

        if (filterholder.length === 0) {
            filterholder.push(...rawData2);
        }

        const makeUnique = filterholder
            .filter(onlyUnique)
            .sort((a, b) =>
                reverse === false ?
                    a.LearningAbility - b.LearningAbility :
                    b.LearningAbility - a.LearningAbility);
        const searchit = makeUnique.filter((command) =>
            (`${command.command ? command.command.name : ""} ${command.command ? command.command.glname : ""} ${command.command ? command.command.jpname : ""} - #${command.LearningAbility}`).toLowerCase().includes(searchTerm)
        );
        setFilterResults(makeUnique);
        setSearchResults(searchit);
        const newlistdisplay = searchit.slice(0, limits);
        if (limits < searchit.length) {
            setShowLoadMore(true);
            setListDisplay(newlistdisplay);
            setListLength(searchit.length);
            setDisplayBanner(
                `Displaying ${newlistdisplay.length} of ${searchit.length} ${banerDisplayTerm}`
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
    }, [activeBRV, activeHP, activeCALL75, activeCALLLD, activeAA, activeS1, activeS2, activeEX, activeLD, activeFR, activeBT, searchTerm, upgraded, clearFilter, AdvanceValuesearch, AdvanceValuesearch3, reverse]);

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
        setAdvanceValuesearch(event.target.value)
    }

    const handleKeyPressValue = (event) => {
        if (event.key === 'Enter') {
            setAdvanceValuesearch(valuedisplay);
        }
    }

    const clearSearchValue3 = () => {
        setvaluedisplay3("")
        setAdvanceValuesearch3("")
    };

    const changeend3 = (event) => {
        setvaluedisplay3(event.target.value)
        setAdvanceValuesearch3(event.target.value)
    }

    const handleKeyPressValue3 = (event) => {
        if (event.key === 'Enter') {
            setAdvanceValuesearch3(valuedisplay3);
        }
    }

    const commandList = listDisplay;

    const [showinfo, setshowinfo] = useStateIfMounted(false);

    const clear_filter=()=>{
        setactiveBT(false)
        setactiveFR(false)
        setactiveLD(false)
        setactiveEX(false)
        setactiveS2(false)
        setactiveS1(false)
        setactiveAA(false)
        setactiveCALL75(false)
        setactiveCALLLD(false)
        setactiveHP(false)
        setactiveBRV(false)
    }

    const BTbutton = () => {
        if (activeBT == false) {
            clear_filter()
            setactiveBT(true)
        } else {
            clear_filter()
        }
    }

    const FRbutton = () => {
        if (activeFR == false) {
            clear_filter()
            setactiveFR(true)
        } else {
            clear_filter()
        }
    }

    const LDbutton = () => {
        if (activeLD == false) {
            clear_filter()
            setactiveLD(true)
        } else {
            clear_filter()
        }
    }

    const EXbutton = () => {
        if (activeEX == false) {
            clear_filter()
            setactiveEX(true)
        } else {
            clear_filter()
        }
    }

    const S2button = () => {
        if (activeS2 == false) {
            clear_filter()
            setactiveS2(true)
        } else {
            clear_filter()
        }
    }

    const S1button = () => {
        if (activeS1 == false) {
            clear_filter()
            setactiveS1(true)
        } else {
            clear_filter()
        }
    }
    const AAbutton = () => {
        if (activeAA == false) {
            clear_filter()
            setactiveAA(true)
        } else {
            clear_filter()
        }
    }

    const CallLDbutton = () => {
        if (activeCALLLD == false) {
            clear_filter()
            setactiveCALLLD(true)
        } else {
            clear_filter()
        }
    }
    const Call75button = () => {
        if (activeCALL75 == false) {
            clear_filter()
            setactiveCALL75(true)
        } else {
            clear_filter()
        }
    }
    const HPbutton = () => {
        if (activeHP == false) {
            clear_filter()
            setactiveHP(true)
        } else {
            clear_filter()
        }
    }
    const BRVbutton = () => {
        if (activeBRV == false) {
            clear_filter()
            setactiveBRV(true)
        } else {
            clear_filter()
        }
    }

    //clear
    const resetbutton = () => {
        setclearFilter(true);
        setReverse(false)
        setupgraded(true)
        setactiveBT(false)
        setactiveFR(false)
        setactiveLD(false)
        setactiveEX(false)
        setactiveS2(false)
        setactiveS1(false)
        setactiveAA(false)
        setactiveCALL75(false)
        setactiveCALLLD(false)
        setactiveHP(false)
        setactiveBRV(false)

        setAdvanceValuesearch("")
        setAdvanceValuesearch3("")
        setReversesearch("")
        setTEXTsearch("")
        setTypesearch("")
        setTypesearch2("")
        setsearchdisplay("");
        setSearchTerm("");
        setvaluedisplay("")
        setvaluedisplay3("")
        setupgradedsearch("")

        setTimeout(() => setclearFilter(false), 1000);
    }

    if (ability_data.length == 0) {
        return (
            <div className='nonenemyholder enemyholderstyling'>
                No Data
            </div>
        )
    } else {
        return (
            <div>
                <div className="filterholder noselect" id={showFilter ? "showfilteren" : "hiddenfilteren"}>
                    <div className="similarbanner">Subcategories</div>
                    <div className="filterholderflair">
                        <ul className='bufftypes'>
                            {showBT == true ?
                                <Tippy content="Burst Attacks">
                                    <li onClick={BTbutton} className={`${activeBT == true ? "filteractive" : "filterinactive"} buffbutton wpbtbutton`}>
                                    </li>
                                </Tippy>
                                : ""}
                            {showFR == true ?
                                <Tippy content="Force Attacks">
                                    <li onClick={FRbutton} className={`${activeFR == true ? "filteractive" : "filterinactive"} buffbutton wpfrbutton`}>
                                    </li>
                                </Tippy>
                                : ""}
                            {showLD == true ?
                                <Tippy content="Limited Attacks">
                                    <li onClick={LDbutton} className={`${activeLD == true ? "filteractive" : "filterinactive"} buffbutton wpldbutton`}>
                                    </li>
                                </Tippy>
                                : ""}
                            {showEX == true ?
                                <Tippy content="EX Attacks">
                                    <li onClick={EXbutton} className={`${activeEX == true ? "filteractive" : "filterinactive"} buffbutton wpexbutton`}>
                                    </li>
                                </Tippy>
                                : ""}
                            {showS2 == true ?
                                <Tippy content="Crystal Lv20 Attacks">
                                    <li onClick={S2button} className={`${activeS2 == true ? "filteractive" : "filterinactive"} buffbutton cl20button`}>
                                    </li>
                                </Tippy>
                                : ""}
                            {showS1 == true ?
                                <Tippy content="Starting Attacks">
                                    <li onClick={S1button} className={`${activeS1 == true ? "filteractive" : "filterinactive"} buffbutton startingButton`}>
                                    </li>
                                </Tippy>
                                : ""}
                            <br />
                            {showAA == true ?
                                <Tippy content="AA Attacks">
                                    <li onClick={AAbutton} className={`${activeAA == true ? "filteractive" : "filterinactive"} buffbutton abuffButton`}>
                                    </li>
                                </Tippy>
                                : ""}
                            {showCALLLD == true ?
                                <Tippy content="LD Call Attacks">
                                    <li onClick={CallLDbutton} className={`${activeCALLLD == true ? "filteractive" : "filterinactive"} buffbutton call2button`}>
                                    </li>
                                </Tippy>
                                : ""}
                            {showCALL75 == true ?
                                <Tippy content="Crystal L75 Call Attacks">
                                    <li onClick={Call75button} className={`${activeCALL75 == true ? "filteractive" : "filterinactive"} buffbutton call1button`}>
                                    </li>
                                </Tippy>
                                : ""}
                            {showHP == true ?
                                <Tippy content="HP Attacks">
                                    <li onClick={HPbutton} className={`${activeHP == true ? "filteractive" : "filterinactive"} buffbutton hpplusattackiconbutton`}>
                                    </li>
                                </Tippy>
                                : ""}
                            {showBRV == true ?
                                <Tippy content="BRV Attacks">
                                    <li onClick={BRVbutton} className={`${activeBRV == true ? "filteractive" : "filterinactive"} buffbutton brvattackiconbutton`}>
                                    </li>
                                </Tippy>
                                : ""}
                        </ul>
                        <div className="similarbanner"><div className='infoclick' onClick={() => { setshowinfo((preValue) => !preValue) }}>Advanced{showinfo ? <TiArrowSortedUp className="uparrow" /> : <TiArrowSortedDown className="downarrow" />}</div></div>

                        {showinfo == false ? <div style={{ paddingBottom: "5px" }}></div> :
                            <div className='muliwrap'>
                                <div className='makespace'>
                                    <div className="not_rangeholder">
                                        Ability ID
                                        <div className="labelmax">
                                            <input
                                                className="not_numberbox"
                                                placeholder="12345"
                                                id="search"
                                                value={valuedisplay}
                                                onChange={changeend}
                                                onKeyDown={handleKeyPressValue}
                                            >
                                            </input>
                                            {valuedisplay === "" ? "" :
                                                <IoMdCloseCircleOutline onClick={clearSearchValue} className="clearsearch"></IoMdCloseCircleOutline>}
                                        </div>
                                    </div>
                                </div>
                                <div className='makespace'>
                                    <div className="not_rangeholder">
                                        Buff ID
                                        <div className="labelmax">
                                            <input
                                                className="not_numberbox"
                                                placeholder="1234"
                                                id="search"
                                                value={valuedisplay3}
                                                onChange={changeend3}
                                                onKeyDown={handleKeyPressValue3}
                                            >
                                            </input>
                                            {valuedisplay3 === "" ? "" :
                                                <IoMdCloseCircleOutline onClick={clearSearchValue3} className="clearsearch"></IoMdCloseCircleOutline>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="margeholder">
                            <div className="Merge">
                                <Tippy content="Only Fully Upgraded">
                                    <label htmlFor="search" className="MergeText">Upgraded</label>
                                </Tippy>
                                <div key="mergecheck1" className={`${upgraded == true ? "nodisplay" : `uncheck`}`} onClick={upgradedbutton} />
                                <div key="mergecheck2" className={`${upgraded == true ? "check" : `nodisplay`}`} onClick={upgradedbutton} />
                            </div>
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
                <div className="characterpageholder">
                    <CharacterAbilitySubListFormatting
                        tag_display={"brvattackicon"}
                        character_ability={commandList.filter(self => self.rank == "BRV")}
                        ver={ver}
                        loc={loc}
                        file={file}

                        master_index={master_index}
                        ProcessedCharacters={ProcessedCharacters}
                        formatting={formatting}
                        all_options={false}
                        buff_data={buff_data}
                        reverse={reverse}
                    />
                    <CharacterAbilitySubListFormatting
                        tag_display={"hpattackicon"}
                        character_ability={commandList.filter(self => self.rank == "HP")}
                        ver={ver}
                        loc={loc}
                        file={file}

                        master_index={master_index}
                        ProcessedCharacters={ProcessedCharacters}
                        formatting={formatting}
                        all_options={false}
                        buff_data={buff_data}
                        reverse={reverse}
                    />
                    <CharacterAbilitySubListFormatting
                        tag_display={"cl1"}
                        character_ability={commandList.filter(self => self.rank == "S1")}
                        ver={ver}
                        loc={loc}
                        file={file}

                        master_index={master_index}
                        ProcessedCharacters={ProcessedCharacters}
                        formatting={formatting}
                        all_options={false}
                        buff_data={buff_data}
                        reverse={reverse}
                    />
                    <CharacterAbilitySubListFormatting
                        tag_display={"cl20"}
                        character_ability={commandList.filter(self => self.rank == "S2")}
                        ver={ver}
                        loc={loc}
                        file={file}

                        master_index={master_index}
                        ProcessedCharacters={ProcessedCharacters}
                        formatting={formatting}
                        all_options={false}
                        buff_data={buff_data}
                        reverse={reverse}
                    />
                    <CharacterAbilitySubListFormatting
                        tag_display={"aaabilityButton"}
                        character_ability={commandList.filter(self => self.rank == "AA")}
                        ver={ver}
                        loc={loc}
                        file={file}

                        master_index={master_index}
                        ProcessedCharacters={ProcessedCharacters}
                        formatting={formatting}
                        all_options={false}
                        buff_data={buff_data}
                        reverse={reverse}
                    />
                    <CharacterAbilitySubListFormatting
                        tag_display={"wpex"}
                        character_ability={commandList.filter(self => self.rank == "EX")}
                        ver={ver}
                        loc={loc}
                        file={file}

                        master_index={master_index}
                        ProcessedCharacters={ProcessedCharacters}
                        formatting={formatting}
                        all_options={false}
                        buff_data={buff_data}
                        reverse={reverse}
                    />
                    <CharacterAbilitySubListFormatting
                        tag_display={"wpld"}
                        character_ability={commandList.filter(self => self.rank == "LD")}
                        ver={ver}
                        loc={loc}
                        file={file}

                        master_index={master_index}
                        ProcessedCharacters={ProcessedCharacters}
                        formatting={formatting}
                        all_options={false}
                        buff_data={buff_data}
                        reverse={reverse}
                    />
                    <CharacterAbilitySubListFormatting
                        tag_display={"wpbt"}
                        character_ability={commandList.filter(self => self.rank == "BT")}
                        ver={ver}
                        loc={loc}
                        file={file}

                        master_index={master_index}
                        ProcessedCharacters={ProcessedCharacters}
                        formatting={formatting}
                        all_options={false}
                        buff_data={buff_data}
                        reverse={reverse}
                    />
                    <CharacterAbilitySubListFormatting
                        tag_display={"wpfr"}
                        character_ability={commandList.filter(self => self.rank == "FR")}
                        ver={ver}
                        loc={loc}
                        file={file}

                        master_index={master_index}
                        ProcessedCharacters={ProcessedCharacters}
                        formatting={formatting}
                        all_options={false}
                        buff_data={buff_data}
                        reverse={reverse}
                    />
                    <CharacterAbilitySubListFormatting
                        tag_display={"call1"}
                        character_ability={commandList.filter(self => self.rank == "Call75")}
                        ver={ver}
                        loc={loc}
                        file={file}

                        master_index={master_index}
                        ProcessedCharacters={ProcessedCharacters}
                        formatting={formatting}
                        all_options={false}
                        buff_data={buff_data}
                        reverse={reverse}
                    />
                    <CharacterAbilitySubListFormatting
                        tag_display={"call2"}
                        character_ability={commandList.filter(self => self.rank == "CallLD")}
                        ver={ver}
                        loc={loc}
                        file={file}

                        master_index={master_index}
                        ProcessedCharacters={ProcessedCharacters}
                        formatting={formatting}
                        all_options={false}
                        buff_data={buff_data}
                        reverse={reverse}
                    />
                    <CharacterAbilitySubListFormatting
                        tag_display={"unknown"}
                        character_ability={upgraded == true ? [] : commandList.filter(self => self.command && self.command.rank == undefined || self.command == undefined)}
                        ver={ver}
                        loc={loc}
                        file={file}

                        master_index={master_index}
                        ProcessedCharacters={ProcessedCharacters}
                        formatting={formatting}
                        all_options={false}
                        buff_data={buff_data}
                        reverse={reverse}
                    />
                </div>
            </div>
        )
    }
}