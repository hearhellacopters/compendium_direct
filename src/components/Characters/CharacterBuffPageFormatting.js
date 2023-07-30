import React, { useState, useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import Tippy from '../TippyDefaults';
import CharacterFaceFormatting from './CharacterFaceFormatting'
import AilmentDataFormatting from '../Buffs/AilmentDataFormatting';
import ReplacerCharacter from '../ReplacerCharacter'
import ability_rank_ranked from '../../processing/abilities/ability_rank_ranked';
import { getQuery, getQueryStringVal, useQueryParam } from '../URLParams'
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { FaUndoAlt } from 'react-icons/fa'
import PassiveEffectsHandoff from '../Passives/PassiveEffectsHandoff';
import PassiveTotalDisplay from '../Passives/PassiveTotalDisplay';
import passive_stats_merger from '../../processing/passives/passive_stats_merger';
import { ObjectView } from 'react-object-view'
import ailment_level_icon from '../../processing/ailment/ailment_level_icon';

export default function CharacterBuffPage({
    ability_data,
    buff_data,

    ver,
    loc,
    newcompare,
    file,

    formatting,

    selected_id,
    gear,
    master_index
}){

    const form = {formatting:formatting}

    const char_id = master_index.charid

    const [showraw, setshowraw] = useStateIfMounted(false)

    const showmeraw = (e) => {
        if (e.shiftKey) {
            if (showraw == false) {
                setshowraw(true)
            } else {
                setshowraw(false)
            }
        }
    }

    const [selectedbuff, setselectedbuff] = useStateIfMounted([]);

    const buffselect = (e) => {
        if (selectedbuff.ailment_id == e.ailment_id && selectedbuff.data_id == e.data_id) {
            setselectedbuff([])
        } else {
            setselectedbuff(e)
        }
    }

    const [bufflist, setbufflist] = useStateIfMounted([])
    const [statelist, setstatelist] = useStateIfMounted([])

    useEffect(() => {
        const buff_holder = []
        const buff_hidden = []
        const stateholder = []
        buff_data && buff_data.forEach(self => {
            self.cast_id && self.cast_id.casts && self.cast_id.casts.forEach(selfcast => {
                var holder = {
                    [selfcast.id]: {
                        ...self,
                        cast: selfcast,
                        ailment_id: selfcast.id,
                        cast_id: undefined,
                        active: self.active,
                        chara_id: self.chara_id
                    }
                }
                if (selfcast.icon.includes("buff_hidden") == true) {
                    buff_hidden.push(holder)
                    holder = undefined
                } else {
                    if (self.is_state != true) {
                        buff_holder.push(holder)
                        holder = undefined
                    } else {
                        stateholder.push(holder)
                        holder = undefined
                    }
                }
            })
        })
        buff_holder.sort((a, b) => Object.keys(b) - Object.keys(a))
        buff_hidden.sort((a, b) => Object.keys(b) - Object.keys(a))
        buff_holder.push(...buff_hidden)
        stateholder.sort((a, b) => Object.keys(b) - Object.keys(a))
        setbufflist(buff_holder)
        setstatelist(stateholder)
        // eslint-disable-next-line
    }, [buff_data])

    const [showBRV, setshowBRV] = useState(false);
    const [showHP, setshowHP] = useState(false);
    const [showS1, setshowS1] = useState(false);
    const [showS2, setshowS2] = useState(false);
    const [showAA, setshowAA] = useState(false);
    const [showEX, setshowEX] = useState(false);
    const [showLD, setshowLD] = useState(false);
    const [showBT, setshowBT] = useState(false);
    const [showFR, setshowFR] = useState(false);
    const [showCALL, setshowCALL] = useState(false);

    const [activeBRVsearch, setactiveBRVsearch] = useQueryParam("BRV", "");
    const [activeHPsearch, setactiveHPsearch] = useQueryParam("HP", "");
    const [activeS1search, setactiveS1search] = useQueryParam("S1", "");
    const [activeS2search, setactiveS2search] = useQueryParam("S2", "");
    const [activeAAsearch, setactiveAAsearch] = useQueryParam("AA", "");
    const [activeEXsearch, setactiveEXsearch] = useQueryParam("EX", "");
    const [activeLDsearch, setactiveLDsearch] = useQueryParam("LD", "");
    const [activeBTsearch, setactiveBTsearch] = useQueryParam("BT", "");
    const [activeFRsearch, setactiveFRsearch] = useQueryParam("FR", "");
    const [activeCALLsearch, setactiveCALLsearch] = useQueryParam("Call", "");

    const [activeBRV, setactiveBRV] = useStateIfMounted(getQueryStringVal("BRV") != null ? true : false);
    const [activeHP, setactiveHP] = useStateIfMounted(getQueryStringVal("HP") != null ? true : false);
    const [activeS1, setactiveS1] = useStateIfMounted(getQueryStringVal("S1") != null ? true : false);
    const [activeS2, setactiveS2] = useStateIfMounted(getQueryStringVal("S2") != null ? true : false);
    const [activeAA, setactiveAA] = useStateIfMounted(getQueryStringVal("AA") != null ? true : false);
    const [activeEX, setactiveEX] = useStateIfMounted(getQueryStringVal("EX") != null ? true : false);
    const [activeLD, setactiveLD] = useStateIfMounted(getQueryStringVal("LD") != null ? true : false);
    const [activeBT, setactiveBT] = useStateIfMounted(getQueryStringVal("BT") != null ? true : false);
    const [activeFR, setactiveFR] = useStateIfMounted(getQueryStringVal("FR") != null ? true : false);
    const [activeCALL, setactiveCALL] = useStateIfMounted(getQueryStringVal("Call") != null ? true : false);

    const startinglimit = 9999

    const banerDisplayTerm = "character buffs"

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    const [loop, setLoop] = useStateIfMounted(false);
    const [reverse, setReverse] = useState(getQueryStringVal("rev") != null ? true : false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchdisplay, setsearchdisplay] = useState("");
    const [limits, setLimits] = useState(startinglimit);

    const [showLoadMore, setShowLoadMore] = useState(true);

    const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
    const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");

    const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");
    const { protocol, pathname, host } = window.location;
    const query = getQuery();
    const url = `${protocol}//${host}${pathname}?${query.toString()}`
    const [clearFilter, setclearFilter] = useStateIfMounted(false);

    const reversebutton = () => {
        setLoop(true);
        setReverse((prevValue) => !prevValue);
        setTimeout(() => setLoop(false), 1000);
    };

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

    useEffect(() => {
        //search params
        if (getQueryStringVal("search") != null) {
            setSearchTerm(getQueryStringVal("search") != null ? getQueryStringVal("search").toLowerCase() : "")
            setTEXTsearch(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
            setsearchdisplay(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
        }
    }, [setTEXTsearch, setFiltersearch])

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
        if (activeCALL == false) {
            setactiveCALLsearch("")
        } else {
            setactiveCALLsearch("true")
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
        if (reverse == false) {
            setReversesearch("")
        } else {
            setReversesearch("true")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reverse, activeBT, activeFR, activeEX, activeS2, activeS1, activeLD, activeAA, activeCALL, activeBRV, activeHP])

    const ParsBuffs = {}

    const tag_holder = {}

    Object.values(ability_data).forEach(filtered => {
        if (filtered.command && filtered.command.casts != undefined && filtered.full == true) {
            const new_str = filtered.command.rank
            filtered.command.casts.map(self => {
                Object.assign(ParsBuffs, { [self.id]: self })
                Object.assign(ParsBuffs[self.id], {
                    chara_id: selected_id,
                    ability_name: filtered.command.name,
                    ability_namegl: filtered.command.glname,
                    command_id: filtered.command.ca_id,
                    rank_tag: filtered.command.rank
                })
                if (tag_holder[self.id] == undefined) {
                    Object.assign(tag_holder, { [self.id]: [] })
                    tag_holder[self.id].push(new_str)
                } else {
                    tag_holder[self.id].push(new_str)
                }
            })
        }
    })

    Object.keys(tag_holder).forEach(id => {
        const unique = []
        new Set(tag_holder[id]).forEach(self => unique.push(self))
        Object.assign(ParsBuffs[id], { tags: unique })
    })

    const clear_filter=()=>{
        setactiveBT(false)
        setactiveFR(false)
        setactiveLD(false)
        setactiveEX(false)
        setactiveS2(false)
        setactiveS1(false)
        setactiveAA(false)
        setactiveCALL(false)
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

    const Callbutton = () => {
        if (activeCALL == false) {
            clear_filter()
            setactiveCALL(true)
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

    const [rawData, setrawData] = useStateIfMounted(Object.values(ParsBuffs).sort((a, b) =>
    ability_rank_ranked(b.rank_tag) - ability_rank_ranked(a.rank_tag) || b.id - a.id))

    const [listDisplay, setListDisplay] = useState(
        rawData && rawData.slice(0, startinglimit)
    );

    const [listLength, setListLength] = useState(listDisplay.length);
    const [displayBanner, setDisplayBanner] = useState(
        `Displaying ${listLength} of ${rawData.length} ${banerDisplayTerm}`
    );

    const [filterResults, setFilterResults] = useState(rawData);
    const [searchResults, setSearchResults] = useState(rawData);

    useState(() => {
        Object.values(ParsBuffs).map(filtered => {
            if (filtered.tags && filtered.tags.some(self => self == "BRV")) {
                setshowBRV(true)
            }
            if (filtered.tags && filtered.tags.some(self => self == "HP")) {
                setshowHP(true)
            }
            if (filtered.tags && filtered.tags.some(self => self == "S1")) {
                setshowS1(true)
            }
            if (filtered.tags && filtered.tags.some(self => self == "S2")) {
                setshowS2(true)
            }
            if (filtered.tags && filtered.tags.some(self => self == "AA")) {
                setshowAA(true)
            }
            if (filtered.tags && filtered.tags.some(self => self == "EX")) {
                setshowEX(true)
            }
            if (filtered.tags && filtered.tags.some(self => self == "LD")) {
                setshowLD(true)
            }
            if (filtered.tags && filtered.tags.some(self => self == "BT")) {
                setshowBT(true)
            }
            if (filtered.tags && filtered.tags.some(self => self == "BT+")) {
                setshowBT(true)
            }
            if (filtered.tags && filtered.tags.some(self => self == "FR")) {
                setshowFR(true)
            }
            if (filtered.tags && filtered.tags.some(self => self == "FRExt")) {
                setshowFR(true)
            }
            if (filtered.tags && filtered.tags.some(self => self == "Call 75")) {
                setshowCALL(true)
            }
            if (filtered.tags && filtered.tags.some(self => self == "Call LD")) {
                setshowCALL(true)
            }
        })
    }, [ParsBuffs])

    useEffect(() => {
        const filterholder = [];
        if (activeBRV == true) {
            const filteredout = rawData.filter(
                (ef) =>
                    ef && ef.tags.some(self => self == "BRV")
            );
            filterholder.push(...filteredout);
        }
        if (activeHP == true) {
            const filteredout = rawData.filter(
                (ef) =>
                    ef && ef.tags.some(self => self == "HP")
            );
            filterholder.push(...filteredout);
        }
        if (activeCALL == true) {
            const filteredout = rawData.filter(
                (ef) =>
                    ef && ef.tags.some(self => self == "Call LD" || self == "Call 75")
            );
            filterholder.push(...filteredout);
        }
        if (activeAA == true) {
            const filteredout = rawData.filter(
                (ef) =>
                    ef && ef.tags.some(self => self == "AA")
            );
            filterholder.push(...filteredout);
        }
        if (activeS1 == true) {
            const filteredout = rawData.filter(
                (ef) =>
                    ef && ef.tags.some(self => self == "S1")
            );
            filterholder.push(...filteredout);
        }
        if (activeS2 == true) {
            const filteredout = rawData.filter(
                (ef) =>
                    ef && ef.tags.some(self => self == "S2")
            );
            filterholder.push(...filteredout);
        }
        if (activeEX == true) {
            const filteredout = rawData.filter(
                (ef) =>
                    ef && ef.tags.some(self => self == "EX")
            );
            filterholder.push(...filteredout);
        }
        if (activeLD == true) {
            const filteredout = rawData.filter(
                (ef) =>
                    ef && ef.tags.some(self => self == "LD")
            );
            filterholder.push(...filteredout);
        }
        if (activeFR == true) {
            const filteredout = rawData.filter(
                (ef) =>
                    ef && ef.tags.some(self => self == "FR" || self == "FRExt")
            );
            filterholder.push(...filteredout);
        }

        if (activeBT == true) {
            const filteredout = rawData.filter(
                (ef) =>
                    ef && ef.tags.some(self => self == "BT" || self == "BT+")
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
                ability_rank_ranked(b.rank_tag) - ability_rank_ranked(a.rank_tag) || b.id - a.id :
                ability_rank_ranked(a.rank_tag) - ability_rank_ranked(b.rank_tag) || a.id - b.id);
        const searchit = makeUnique.filter((buff) =>
            (`${buff && buff.name} ${buff && buff.jpname} ${buff && buff.ability_name} ${buff && buff.ability_namegl} - #${buff.id}`).toLowerCase().includes(searchTerm)
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
    }, [rawData, activeBRV, activeHP, activeCALL, activeAA, activeS1, activeS2, activeEX, activeLD, activeFR, activeBT, searchTerm, clearFilter, reverse]);

    const displaybuffs = listDisplay

    //clear
    const resetbutton = () => {
        setclearFilter(true);
        setReverse(false)
        setactiveBT(false)
        setactiveFR(false)
        setactiveLD(false)
        setactiveEX(false)
        setactiveS2(false)
        setactiveS1(false)
        setactiveAA(false)
        setactiveCALL(false)
        setactiveHP(false)
        setactiveBRV(false)

        setReversesearch("")
        setTEXTsearch("")
        setsearchdisplay("");
        setSearchTerm("");

        setTimeout(() => setclearFilter(false), 1000);
    }


    const [merge_pas, setmerge_pas] = useStateIfMounted(true)

    useEffect(() => {
        if (selectedbuff && selectedbuff.passives && selectedbuff.passives.length <= 1) {
            setmerge_pas(false)
        } else {
            setmerge_pas(true)
        }
        // eslint-disable-next-line
    }, [selectedbuff])

    const togglemerge = () => {
        setmerge_pas((prevValue) => !prevValue);
    }

    return (
        <div>
            <div className="filterholder noselect" id={"showfilteren"}>
                <div className="similarbanner">Subcategories</div>
                <div className="filterholderflair">
                    <ul className='bufftypes'>

                        {showBT == true ?
                            <Tippy content="Burst Buffs">
                                <li onClick={BTbutton} className={`${activeBT == true ? "filteractive" : "filterinactive"} buffbutton wpbtbutton`}>
                                </li>
                            </Tippy>
                            : ""}
                        {showFR == true ?
                            <Tippy content="Force Buffs">
                                <li onClick={FRbutton} className={`${activeFR == true ? "filteractive" : "filterinactive"} buffbutton wpfrbutton`}>
                                </li>
                            </Tippy>
                            : ""}
                        {showCALL == true ?
                            <Tippy content="Call Line Buffs">
                                <li onClick={Callbutton} className={`${activeCALL == true ? "filteractive" : "filterinactive"} buffbutton callsButton`}>
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
                        <br />
                        {showAA == true ?
                            <Tippy content="AA Attacks">
                                <li onClick={AAbutton} className={`${activeAA == true ? "filteractive" : "filterinactive"} buffbutton abuffButton`}>
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
                    <br />
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
            <div className='characterpageholder'>
                {bufflist && bufflist.length != 0 ?
                    <div className={file == "passive_ability" ? "default_passive" : "buffunit"}>
                        <div className="infoholder">
                            {file != "passive_ability" ?
                                <div onClick={showmeraw} className="infotitleholder">
                                    <div className="faceandiconholder">
                                        <CharacterFaceFormatting char_id={char_id} id={selected_id} loc={loc} />
                                    </div>
                                </div>
                                : ""}
                            <div className={`${gear == true ? "gearinfobanner" : "defaultlistholder"} newblue`}>
                                <div className="unique ailmenttext">
                                    Conditional Casts:
                                </div>
                                {bufflist && bufflist.length != 0 ?
                                    <ul className="abilitybufflist">
                                        {bufflist.map(function (buff) {
                                            const buffs = Object.values(buff)[0]
                                            const cast = buffs.cast
                                            return buffs.active == false ? "" : <li className={`abilitybufficonsholder ${selectedbuff.ailment_id == buffs.ailment_id && selectedbuff.data_id == buffs.data_id ? "buffactive" : ""}`} key={`${buffs.ailment_id}-${buffs.data_id}`}>
                                                <div className="biconspacer" onClick={() => buffselect(buffs)} >
                                                    <Tippy content={
                                                        cast.name === "" ? ReplacerCharacter(`Unknown ${cast.id}`,form) : ReplacerCharacter(cast.name,form)
                                                    }>
                                                        <img alt={cast.name} className="clicky abilitybufficon" src={`https://dissidiacompendium.com/images/static/icons/buff/${ailment_level_icon(cast,buffs.arg1)}.png`} />
                                                    </Tippy>
                                                </div>
                                            </li>
                                        })}
                                    </ul> :
                                    ""}
                                {statelist && statelist.length != 0 ?
                                    <>
                                        <div className="unique ailmenttext">
                                            Battle States:
                                        </div>
                                        <ul className="abilitybufflist">
                                            {statelist.map(function (buff) {
                                                const buffs = Object.values(buff)[0]
                                                const cast = buffs.cast
                                                return <li className={`abilitybufficonsholder ${selectedbuff.ailment_id == buffs.ailment_id && selectedbuff.data_id == buffs.data_id ? "buffactive" : ""}`} key={`${buffs.ailment_id}-${buffs.data_id}`}>
                                                    <div className="biconspacer" onClick={() => buffselect(buffs)} >
                                                        <Tippy content={
                                                            cast.name === "" ? ReplacerCharacter(`Unknown ${cast.id}`,form) : ReplacerCharacter(cast.name,form)
                                                        }>
                                                            <img alt={cast.name} className="clicky abilitybufficon" src={`https://dissidiacompendium.com/images/static/icons/buff/${cast.icon}.png`} />
                                                        </Tippy>
                                                    </div>
                                                </li>
                                            })}
                                        </ul>
                                    </>
                                    :
                                    ""}
                            </div>
                            {selectedbuff.length != 0 && selectedbuff.is_state != true ?
                                <AilmentDataFormatting
                                    key={selectedbuff.id}
                                    file={file}
                                    loc={loc}
                                    ver={ver}
                                    ailment_data={selectedbuff.cast}

                                    master_index={master_index}

                                    slider={true}
                                    rank={selectedbuff.rank_id}
                                    arg1={selectedbuff.arg1}
                                    arg2={selectedbuff.arg2}
                                    castlocation={true}
                                    formatting={formatting}
                                    gear={gear}
                                    cur_char={selectedbuff.chara_id}
                                    turns={selectedbuff.turn}
                                    character_face={false}
                                    frameless={false}
                                    default_passoff={selectedbuff}
                                    passed_passive={selectedbuff.passive}
                                />
                            : ""}
                            {selectedbuff.length != 0 && selectedbuff.is_state == true ?
                                <div className='bufflistbanner Buffbase'>
                                    <div className='Buffsubbanner'>
                                        {ReplacerCharacter(selectedbuff.cast.name,form)}
                                        <div className='abilityJPname'>
                                            {ReplacerCharacter(selectedbuff.cast.jpname,form)}
                                        </div>
                                    </div>
                                    {selectedbuff.passives && selectedbuff.passives.length > 1 ?
                                        <div className='subpassiveflair spacearound'>
                                            <div key="mergecheck1" className={`${merge_pas == true ? "nodisplay" : `uncheck`}`} onClick={togglemerge} />
                                            <div key="mergecheck2" className={`${merge_pas == true ? "check" : `nodisplay`}`} onClick={togglemerge} />
                                            <div className='noselect'>&nbsp;&nbsp;Total Values</div>
                                        </div>
                                        : ""}
                                    {passive_stats_merger(
                                        selectedbuff.passives,

                                        master_index,
                                        ver,

                                        merge_pas,
                                        "state",
                                        false
                                    ).sort((a, b) => a.rank - b.rank).map((battle_passive, i, whole) => (
                                        battle_passive.is_total != true ? <PassiveEffectsHandoff
                                            key={`${battle_passive.pa_id}-${i}`}
                                            passive_ability={battle_passive}
                                            ver={ver}

                                            master_index={master_index}

                                            formatting={formatting}
                                            skip_space={i}
                                            use_ailment={true}
                                            merged={whole[i - 1] && whole[i - 1].loc_tag}
                                            hide_disp={merge_pas}
                                            battle_state={true}
                                        />
                                            :
                                            <PassiveTotalDisplay
                                                key={i}
                                                match={battle_passive}
                                            />
                                    ))}
                                </div>
                                : ""}
                        </div>
                    </div> : ""}
                {showraw == true ?
                    <span className='react-json-view'>
                        <ObjectView 
                        options={
                            {
                              hideDataTypes: true,
                              expandLevel: 1,
                              displayEntriesMaxCount: 1,
                            }
                          }
                        data={buff_data} 
                        />
                    </span>
                    : ""}
                {displaybuffs.length != 0 ?
                    <div className='directbuffholder'>
                        <div className='subtext2'>Strength of buff is determined by ability</div>
                        {displaybuffs.map(self => (
                            <AilmentDataFormatting
                                key={self.id}
                                file={file}
                                loc={loc}
                                ver={ver}
                                master_index={master_index}
                                ailment_data={self}
                                slider={true}
                                rank={self.arank}
                                arg1={self.aarg1}
                                arg2={self.aarg2}
                                alt_rank={self.aranka}
                                alt_aug1={self.aarg1a}
                                alt_aug2={self.aarg2a}
                                castlocation={true}
                                formatting={formatting}
                                gear={gear}
                                rank_tag={self.rank_tag}
                                cur_char={self.chara_id}
                                turns={self.alife}
                                character_face={true}
                                frameless={false}
                            />
                        ))}
                    </div>
                    : "No Data"}
            </div>
        </div>
    )
}