import React, { useState, useEffect } from 'react';
import Tippy from '../components/TippyDefaults'
import { useStateIfMounted } from "use-state-if-mounted";
import Select from 'react-select';
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { FaUndoAlt } from 'react-icons/fa'
import AbilityPars from '../components/Abilities/AbilityPars';
import { getQuery, getQueryStringVal, useQueryParam } from '../components/URLParams'
import { MarkerType } from 'react-flow-renderer';
import MapMaker from './MapMaker';
import CharacterAbilitySubListFormatting from '../components/Characters/CharacterAbilitySubListFormatting';
import { LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';

function CharacterAbilityPage ({
    ability_data,
    buff_data,
    selected_id,
    access,
    ver,
    loc,
    newcompare,
    file,

    formatting,
    master_index,
    scrollPosition
}) {

    const CommandNames = master_index.commands

    const rawData = Object.values(ability_data)

    const banerDisplayTerm = "character abilities"

    const startinglimit = 999

    const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null ? true : false);
    const [showMap, setShowMap] = useState(getQueryStringVal("map") != null ? true : false);
    const [Full, setFull] = useState(getQueryStringVal("full") != null ? true : false);
    const [upgraded, setupgraded] = useState(getQueryStringVal("upgraded") != null ? false : true);
    const [clearFilter, setclearFilter] = useStateIfMounted(false);

    const [loop, setLoop] = useStateIfMounted(false);
    const [reverse, setReverse] = useState(getQueryStringVal("rev") != null ? true : false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchdisplay, setsearchdisplay] = useState("");
    const [condFilter, setCondFilter] = useState("");
    const [condFilter2, setCondFilter2] = useState("");
    const [valuedisplay, setvaluedisplay] = useState("");
    const [valuedisplay2, setvaluedisplay2] = useState("");
    const [valuedisplay3, setvaluedisplay3] = useState("");
    const [valuedisplay4, setvaluedisplay4] = useState("");
    const [filterResults, setFilterResults] = useState(rawData);
    const [searchResults, setSearchResults] = useState(rawData);
    const [limits, setLimits] = useState(startinglimit);
    const [listDisplay, setListDisplay] = useState(
        rawData && rawData.slice(0, limits)
    );

    const [listLength, setListLength] = useState(listDisplay.length);
    const [showLoadMore, setShowLoadMore] = useState(true);
    const [displayBanner, setDisplayBanner] = useState(
        `Displaying ${listLength} of ${rawData.length} ${banerDisplayTerm}`
    );
    const [Typesearch, setTypesearch] = useQueryParam("rank", "");
    const [Typesearch2, setTypesearch2] = useQueryParam("char", "");
    const [AdvanceValuesearch, setAdvanceValuesearch] = useQueryParam("command", "");
    const [AdvanceValuesearch2, setAdvanceValuesearch2] = useQueryParam("cast", "");
    const [AdvanceValuesearch3, setAdvanceValuesearch3] = useQueryParam("ailment", "");
    const [AdvanceValuesearch4, setAdvanceValuesearch4] = useQueryParam("hit_data", "");
    const { protocol, pathname, host } = window.location;
    const query = getQuery();
    const url = `${protocol}//${host}${pathname}?${query.toString()}`
    const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
    const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
    const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");
    const [Mapsearch, setMapsearch] = useQueryParam("map", "");
    const [Fullsearch, setFullsearch] = useQueryParam("full", "");
    const [upgradedsearch, setupgradedsearch] = useQueryParam("upgraded", "");

    useEffect(() => {
        if (showFilter == false) {
            setFiltersearch("")
        } else {
            setFiltersearch("true")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showFilter])

    const showfilterbutton = () => {
        if (showFilter == false) {
            setFiltersearch("true")
        } else {
            setFiltersearch("")
        }
        setShowFilter((prevValue) => !prevValue);
    }

    useEffect(() => {
        if (Full == false) {
            setFullsearch("")
        } else {
            setFullsearch("true")
        }
        if (upgraded == true) {
            setupgradedsearch("")
        } else {
            setupgradedsearch("false")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Full, upgraded])

    const showfullbutton = () => {
        if (Full == false) {
            setFullsearch("true")
        } else {
            setFullsearch("")
        }
        setFull((prevValue) => !prevValue);
    }

    const upgradedbutton = () => {
        if (upgraded == false) {
            setupgradedsearch("true")
        } else {
            setupgradedsearch("")
        }
        setupgraded((prevValue) => !prevValue);
    }

    useEffect(() => {
        if (showMap == false) {
            setMapsearch("")
        } else {
            setMapsearch("true")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showMap])

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
                "value": "FR",
                "label": "FR"
            },
            {
                "value": "Call75",
                "label": "Call 75"
            },
            {
                "value": "CallLD",
                "label": "Call LD"
            },
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
            const filteredtype2 = Object.values(master_index.charid).filter(self => self.CharacterName == getQueryStringVal("char"))
            if (filteredtype2.length != 0) {
                setTypesearch2(getQueryStringVal("char"))
                setCondFilter2(filteredtype2[0].CharID)
            } else {
                setTypesearch2("")
                setCondFilter2("")
            }
        }
    }, [setCondFilter2, master_index, Typesearch2, setTypesearch2])

    useEffect(() => {
        //search params
        if (getQueryStringVal("command") != null) {
            setvaluedisplay(getQueryStringVal("command") != null ? getQueryStringVal("command") : "")
        }
    }, [setvaluedisplay])

    useEffect(() => {
        //search params
        if (getQueryStringVal("cast") != null) {
            setvaluedisplay2(getQueryStringVal("cast") != null ? getQueryStringVal("cast") : "")
        }
    }, [setvaluedisplay2])

    useEffect(() => {
        //search params
        if (getQueryStringVal("ailment") != null) {
            setvaluedisplay3(getQueryStringVal("ailment") != null ? getQueryStringVal("ailment") : "")
        }
    }, [setvaluedisplay3])

    useEffect(() => {
        //search params
        if (getQueryStringVal("hit_data") != null) {
            setvaluedisplay4(getQueryStringVal("hit_data") != null ? getQueryStringVal("hit_data") : "")
        }
    }, [setvaluedisplay4])



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
        var rawData2 = rawData
        if (upgraded == true) {
            const filteredout = rawData.filter(
                (command) =>
                    command && command.full == true
            );
            rawData2 = filteredout;
        }

        if (upgraded == true) {
            const filteredout = rawData2.filter(
                (command) =>
                    command && command.full == true
            )
            filterholder.push(...filteredout);
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

        if (AdvanceValuesearch2 != "") {
            const filteredout = rawData2.filter(
                (command) =>
                    command && command.command && command.command.atype == AdvanceValuesearch2 ||
                    command && command.command && command.command.atype_1 == AdvanceValuesearch2 ||
                    command && command.command && command.command.atype_2 == AdvanceValuesearch2 ||
                    command && command.command && command.command.atype_3 == AdvanceValuesearch2 ||
                    command && command.command && command.command.atype_4 == AdvanceValuesearch2 ||
                    command && command.command && command.command.atype_5 == AdvanceValuesearch2 ||
                    command && command.command && command.command.atype_6 == AdvanceValuesearch2 ||
                    command && command.command && command.command.atype_7 == AdvanceValuesearch2 ||
                    command && command.command && command.command.atype_8 == AdvanceValuesearch2 ||
                    command && command.command && command.command.atype_9 == AdvanceValuesearch2
            );
            filterholder.push(...filteredout);
        }

        if (AdvanceValuesearch4 != "") {
            const filteredout = rawData2.filter(
                (command) =>
                    command && command.hit_data_id && command.hit_data_id == AdvanceValuesearch4 ||
                    command && command.hit_data_id_1 && command.hit_data_id_1 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_2 && command.hit_data_id_2 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_3 && command.hit_data_id_3 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_4 && command.hit_data_id_4 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_5 && command.hit_data_id_5 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_6 && command.hit_data_id_6 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_7 && command.hit_data_id_7 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_8 && command.hit_data_id_8 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_9 && command.hit_data_id_9 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_10 && command.hit_data_id_10 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_11 && command.hit_data_id_11 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_12 && command.hit_data_id_12 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_13 && command.hit_data_id_13 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_14 && command.hit_data_id_14 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_15 && command.hit_data_id_15 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_16 && command.hit_data_id_16 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_17 && command.hit_data_id_17 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_18 && command.hit_data_id_18 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_19 && command.hit_data_id_19 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_20 && command.hit_data_id_20 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_21 && command.hit_data_id_21 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_22 && command.hit_data_id_22 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_23 && command.hit_data_id_23 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_24 && command.hit_data_id_24 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_25 && command.hit_data_id_25 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_26 && command.hit_data_id_26 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_27 && command.hit_data_id_27 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_28 && command.hit_data_id_28 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_29 && command.hit_data_id_29 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_30 && command.hit_data_id_30 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_31 && command.hit_data_id_31 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_32 && command.hit_data_id_32 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_33 && command.hit_data_id_33 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_34 && command.hit_data_id_34 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_35 && command.hit_data_id_35 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_36 && command.hit_data_id_36 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_37 && command.hit_data_id_37 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_38 && command.hit_data_id_38 == AdvanceValuesearch4 ||
                    command && command.hit_data_id_39 && command.hit_data_id_39 == AdvanceValuesearch4

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
            (`${command.LearningAbility && command.LearningAbility ? CommandNames[command.LearningAbility] && CommandNames[command.LearningAbility].jpname : ""} ${command.LearningAbility && command.LearningAbility ? CommandNames[command.LearningAbility] && CommandNames[command.LearningAbility].name : ""} - #${command.LearningAbility}`).toLowerCase().includes(searchTerm)
        );
        const getailmentfilter2 = searchit.filter(function (ef) {
            const newfilterpull = ef.rank === condFilter;
            if (condFilter !== "") {
                return newfilterpull;
            } else {
                return ef
            }
        });
        const getailmentfilter = getailmentfilter2.filter(function (ef) {
            const newfilterpull = ef["charaID"] == condFilter2;
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
    }, [upgraded, searchTerm, clearFilter, condFilter, condFilter2, AdvanceValuesearch, AdvanceValuesearch2, AdvanceValuesearch3, AdvanceValuesearch4, reverse]);

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
            "value": "FR",
            "label": "FR"
        },
        {
            "value": "Call75",
            "label": "Call 75"
        },
        {
            "value": "CallLD",
            "label": "Call LD"
        },
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

    const searchobjects2 = () => {
        setAdvanceValuesearch2(valuedisplay2)
    }

    const clearSearchValue2 = () => {
        setvaluedisplay2("")
        setAdvanceValuesearch2("")
    };

    const changeend2 = (event) => {
        setvaluedisplay2(event.target.value)

    }
    const handleKeyPressValue2 = (event) => {
        if (event.key === 'Enter') {
            setAdvanceValuesearch2(valuedisplay2);
        }
    }

    const searchobjects3 = () => {
        setAdvanceValuesearch3(valuedisplay3)
    }

    const clearSearchValue3 = () => {
        setvaluedisplay3("")
        setAdvanceValuesearch3("")
    };

    const changeend3 = (event) => {
        setvaluedisplay3(event.target.value)

    }
    const handleKeyPressValue3 = (event) => {
        if (event.key === 'Enter') {
            setAdvanceValuesearch3(valuedisplay3);
        }
    }

    const searchobjects4 = () => {
        setAdvanceValuesearch4(valuedisplay4)
    }

    const clearSearchValue4 = () => {
        setAdvanceValuesearch4("")
        setvaluedisplay4("")
    };

    const changeend4 = (event) => {
        setvaluedisplay4(event.target.value)

    }
    const handleKeyPressValue4 = (event) => {
        if (event.key === 'Enter') {
            setAdvanceValuesearch4(valuedisplay4);
        }
    }

    const commandList = listDisplay;

    const [elementMaker, setelementMaker] = useStateIfMounted({})
    const [typeListArray3, settypeListArray3] = useStateIfMounted([])
    const [finshedrunning, setfinshedrunning] = useStateIfMounted(false)
    const [elements, setelements] = useState(Object.values(elementMaker))
    const [commandfilter, setcommandfilter] = useState()

    const showmapbutton = () => {
        if (showMap == false) {
            setMapsearch("true")
        } else {
            setMapsearch("")
        }
        setShowMap((prevValue) => !prevValue);
    }

    const optionsOnly = {}

    const idbase = new Set()

    Object.values(ability_data).filter(self => {
        if (self.options != undefined) {
            self.options.map(self2 => {
                Object.assign(optionsOnly, { [self2.data_index]: self2 })
            })
        }
    })

    Object.values(ability_data).map(self => {
        if (self.base == true) {
            idbase.add(self.LearningAbility)
        }
    })

    useEffect(() => {
        if (showMap) {
            const elementholder = {}

            //first
            if (idbase.length != 0) {
                idbase.forEach(self => {
                    const filter = Object.values(optionsOnly).filter(self2 => self2.original_label_ == self)
                    if (filter.length != 0) {
                        filter.map(self3 => {
                            if (self3.active != false) {
                                if (idbase.has(self3.change_label_) == false) {
                                    idbase.add(self3.change_label_)
                                }
                            }
                        })
                    }
                })
            }

            Object.values(optionsOnly).map(self => {
                if (self.original_label_ != self.change_label_) {
                    if (self.active != false && idbase.has(self.original_label_) == true && idbase.has(self.change_label_)) {
                        if (elementholder[self.original_label_] == undefined) {
                            const getcmd1 = CommandNames[self.original_label_]
                            if (getcmd1 != undefined) {
                                Object.assign(elementholder, {
                                    [self.original_label_]: {
                                        id: `${self.original_label_}`,
                                        data: {
                                            label: <>
                                                <a className='abilitylink' href={`#${self.original_label_}`}>
                                                    {getcmd1.name}{" #"}{self.original_label_}
                                                </a>
                                                <br />
                                                <div className={getcmd1.rank == undefined ? "unknown" : getcmd1.rank.replace(/EX/gm, "EXrank").replace(/\+/gm, "plus").replace(/ /gm, "_").replace(/BRV/, "brvattackiconbutton undertag").replace(/HP/, "hpplusattackicon undertaga")} />
                                            </>
                                        },
                                        position: {
                                            x: 0,
                                            y: 0,
                                        },
                                        ids: [self.original_label_],
                                        style: {
                                            background: "rgb(30, 55, 88)"
                                        },
                                        type: "default",
                                        targetPosition: "left",
                                        sourcePosition: "right",
                                    }
                                })
                            }
                        }
                        if (elementholder[self.change_label_] == undefined) {
                            const getcmd2 = CommandNames[self.change_label_]
                            if (getcmd2 != undefined) {
                                Object.assign(elementholder, {
                                    [self.change_label_]: {
                                        id: `${self.change_label_}`,
                                        data: {
                                            label: <>
                                                <a className='abilitylink' href={`#${self.change_label_}`}>
                                                    {getcmd2.name}{" #"}{self.change_label_}
                                                </a>
                                                <br />
                                                <div className={getcmd2.rank == undefined ? "unknown" : getcmd2.rank.replace(/EX/gm, "EXrank").replace(/\+/gm, "plus").replace(/ /gm, "_").replace(/BRV/, "brvattackiconbutton undertag").replace(/HP/, "hpplusattackicon undertaga")} />
                                            </>
                                        },
                                        position: {
                                            x: 0,
                                            y: 0,
                                        },
                                        ids: [self.change_label_],
                                        style: {
                                            background: "rgb(30, 55, 88)"
                                        },
                                        type: "default",
                                        targetPosition: "left",
                                        sourcePosition: "right",
                                    }
                                })
                            }
                        }
                        if (elementholder[`${self.original_label_}_${self.change_label_}_1`] == undefined) {
                            if (self.original_label_ != self.change_label_) {

                                Object.assign(elementholder, {
                                    [`${self.original_label_}_${self.change_label_}_1`]: {
                                        id: `${self.original_label_}_${self.change_label_}_1`,
                                        data: {
                                            label:
                                                <div className={"ability_tags"}
                                                >
                                                    {self.option_type_ == 1 ? "Replace" : "Follow Up"}
                                                    {self.passives && self.passives.length != 0 ?
                                                        self.passives.map((self2, key) => (
                                                            <div key={key}>
                                                                <div className={self2.loc_tag}>

                                                                </div>
                                                            </div>
                                                        ))
                                                        : ""}
                                                </div>
                                        },
                                        position: {
                                            x: 0,
                                            y: 0,
                                        },
                                        spacer: self.passives && self.passives.length,
                                        ids: [self.change_label_, self.original_label_],
                                        type: "default",
                                        style: {
                                            background: self.option_type_ == 1 ? "#773040f0" : "#346746f0",
                                        },
                                        targetPosition: "left",
                                        sourcePosition: "right",
                                    }
                                })
                            }
                        }
                        if (elementholder[`${self.original_label_}_${self.change_label_}_2`] == undefined) {
                            if (self.original_label_ != self.change_label_) {
                                Object.assign(elementholder, {
                                    [`${self.original_label_}_${self.change_label_}_2`]: {
                                        id: `${self.original_label_}-${self.change_label_}_2`,
                                        source: `${self.original_label_}_${self.change_label_}_1`,
                                        target: `${self.change_label_}`,
                                        labelBgPadding: [8, 4],
                                        labelBgBorderRadius: 4,
                                        ids: [`${self.original_label_}-${self.change_label_}_2`, self.change_label_],
                                        labelBgStyle: { fill: `${self.option_type_ == 1 ? "#cb750b" : "#67f772f0"}`, color: '#fff', fillOpacity: 0.7 },
                                        labelStyle: { fill: `white` },
                                        arrowHeadType: 'arrowclosed',
                                        type: 'default',
                                        markerEnd: {
                                            type: MarkerType.ArrowClosed,
                                            color: "#1e3758f0",
                                        },
                                    }
                                })
                            }
                        }

                        if (elementholder[`${self.original_label_}_${self.change_label_}_3`] == undefined) {
                            if (self.original_label_ != self.change_label_) {
                                Object.assign(elementholder, {
                                    [`${self.original_label_}_${self.change_label_}_3`]: {
                                        id: `${self.original_label_}-${self.change_label_}_3`,
                                        source: `${self.original_label_}`,
                                        target: `${self.original_label_}_${self.change_label_}_1`,
                                        labelBgPadding: [8, 4],
                                        labelBgBorderRadius: 4,
                                        ids: [self.original_label_, `${self.original_label_}_${self.change_label_}_1`],
                                        labelBgStyle: { fill: `${self.option_type_ == 1 ? "#cb750b" : "#67f772f0"}`, color: '#fff', fillOpacity: 0.7 },
                                        labelStyle: { fill: `white` },
                                        arrowHeadType: 'arrowclosed',
                                        type: 'default',
                                        markerEnd: {
                                            type: MarkerType.ArrowClosed,
                                            color: "#1e3758f0",
                                        },
                                    }
                                })
                            }
                        }
                    }
                }
            })

            Object.values(ability_data).map(self => {
                const getcmd = CommandNames[self.LearningAbility]
                if (getcmd != undefined && elementholder[self.LearningAbility] == undefined && idbase.has(self.LearningAbility) == true) {
                    Object.assign(elementholder, {
                        [self.LearningAbility]: {
                            id: `${self.LearningAbility}`,
                            data: {
                                label: <>
                                    <a className='abilitylink' href={`#${self.LearningAbility}`}>
                                        {getcmd.name}{" #"}{self.LearningAbility}
                                    </a>
                                    <br />
                                    <div className={getcmd.rank == undefined ? "unknown" : getcmd.rank.replace(/EX/gm, "EXrank").replace(/\+/gm, "plus").replace(/ /gm, "_").replace(/BRV/, "brvattackiconbutton undertag").replace(/HP/, "hpplusattackicon undertaga")} />
                                </>
                            },
                            position: {
                                x: 0,
                                y: 0,
                            },
                            ids: [self.LearningAbility],
                            style: {
                                background: "rgb(30, 55, 88)"
                            },
                            type: "default",
                            targetPosition: "left",
                            sourcePosition: "right",
                        }
                    })
                }
            })
            const holder2 = []
            Object.values(ability_data).map((self) => {
                if (idbase.has(self.LearningAbility)) {
                    holder2.push({
                        value: self.LearningAbility,
                        label: `${CommandNames[self.LearningAbility] && CommandNames[self.LearningAbility].name} #${self.LearningAbility}`
                    })
                }
            })
            settypeListArray3(holder2)

            setelementMaker(elementholder)

            const master = {}
            const secondtarget = {}
            const secondsource = {}
            const filerted1 = Object.values(elementMaker).filter(self2 => {
                return self2.source == commandfilter || self2.target == `${commandfilter}` || self2.id == `${commandfilter}`
            })
            filerted1.map(self => {
                if (self.id == commandfilter) {
                    Object.assign(master, {
                        [self.id]:
                    {
                        id: self.id,
                        data: {
                            label: <div className='abilitybox'>
                                {self.data.label}
                            </div>
                        },
                        position: self.position,
                        type: self.type,
                        style: {
                            background: "rgb(30, 55, 88)"
                        },
                        targetPosition: self.targetPosition,
                        sourcePosition: self.sourcePosition,
                    }
                    })
                } else {
                    Object.assign(master, { [self.id]: self })
                }
                if (self.target != undefined) {
                    Object.assign(secondtarget, { [self.target]: {} })
                }
                if (self.source != undefined) {
                    Object.assign(secondsource, { [self.source]: {} })
                }
            })
            //first
            Object.keys(secondtarget).map(self => {
                if (master[self] == undefined) {
                    Object.assign(master, { [elementMaker[self].id]: elementMaker[self] })
                }
                const filerted2 = Object.values(elementMaker).filter(self2 => {
                    return self2.id == `${self}` || self2.source == `${self}`
                })
                filerted2.map(self3 => {
                    if (master[self3.id] == undefined) {
                        Object.assign(master, { [self3.id]: self3 })
                    }
                    if (self3.target != undefined) {
                        Object.assign(secondtarget, { [self3.target]: {} })
                        if (master[elementMaker[self3.target].id] == undefined) {
                            Object.assign(master, { [elementMaker[self3.target].id]: elementMaker[self3.target] })
                        }
                    }
                })
            })
            Object.keys(secondsource).map(self => {
                if (master[self] == undefined) {
                    Object.assign(master, { [elementMaker[self].id]: elementMaker[self] })
                }
                const filerted2 = Object.values(elementMaker).filter(self2 => {
                    return self2.id == `${self}` || self2.target == `${self}`
                })
                filerted2.map(self3 => {
                    if (master[self3.id] == undefined) {
                        Object.assign(master, { [self3.id]: self3 })
                    }
                    if (self3.source != undefined) {
                        Object.assign(secondsource, { [self3.source]: {} })
                        if (master[elementMaker[self3.source].id] == undefined) {
                            Object.assign(master, { [elementMaker[self3.source].id]: elementMaker[self3.source] })
                        }
                    }
                })
            })
            //second
            Object.keys(secondtarget).map(self => {
                if (master[self] == undefined) {
                    Object.assign(master, { [elementMaker[self].id]: elementMaker[self] })
                }
                const filerted2 = Object.values(elementMaker).filter(self2 => {
                    return self2.id == `${self}` || self2.source == `${self}`
                })
                filerted2.map(self3 => {
                    if (master[self3.id] == undefined) {
                        Object.assign(master, { [self3.id]: self3 })
                    }
                    if (self3.target != undefined) {
                        Object.assign(secondtarget, { [self3.target]: {} })
                        if (master[elementMaker[self3.target].id] == undefined) {
                            Object.assign(master, { [elementMaker[self3.target].id]: elementMaker[self3.target] })
                        }
                    }
                })
            })
            Object.keys(secondsource).map(self => {
                if (master[self] == undefined) {
                    Object.assign(master, { [elementMaker[self].id]: elementMaker[self] })
                }
                const filerted2 = Object.values(elementMaker).filter(self2 => {
                    return self2.id == `${self}` || self2.target == `${self}`
                })
                filerted2.map(self3 => {
                    if (master[self3.id] == undefined) {
                        Object.assign(master, { [self3.id]: self3 })
                    }
                    if (self3.source != undefined) {
                        Object.assign(secondsource, { [self3.source]: {} })
                        if (master[elementMaker[self3.source].id] == undefined) {
                            Object.assign(master, { [elementMaker[self3.source].id]: elementMaker[self3.source] })
                        }
                    }
                })
            })
            //third
            Object.keys(secondtarget).map(self => {
                if (master[self] == undefined) {
                    Object.assign(master, { [elementMaker[self].id]: elementMaker[self] })
                }
                const filerted2 = Object.values(elementMaker).filter(self2 => {
                    return self2.id == `${self}` || self2.source == `${self}`
                })
                filerted2.map(self3 => {
                    if (master[self3.id] == undefined) {
                        Object.assign(master, { [self3.id]: self3 })
                    }
                    if (self3.target != undefined) {
                        Object.assign(secondtarget, { [self3.target]: {} })
                        if (master[elementMaker[self3.target].id] == undefined) {
                            Object.assign(master, { [elementMaker[self3.target].id]: elementMaker[self3.target] })
                        }
                    }
                })
            })
            Object.keys(secondsource).map(self => {
                if (master[self] == undefined) {
                    Object.assign(master, { [elementMaker[self].id]: elementMaker[self] })
                }
                const filerted2 = Object.values(elementMaker).filter(self2 => {
                    return self2.id == `${self}` || self2.target == `${self}`
                })
                filerted2.map(self3 => {
                    if (master[self3.id] == undefined) {
                        Object.assign(master, { [self3.id]: self3 })
                    }
                    if (self3.source != undefined) {
                        Object.assign(secondsource, { [self3.source]: {} })
                        if (master[elementMaker[self3.source].id] == undefined) {
                            Object.assign(master, { [elementMaker[self3.source].id]: elementMaker[self3.source] })
                        }
                    }
                })
            })
            //forth
            Object.keys(secondtarget).map(self => {
                if (master[self] == undefined) {
                    Object.assign(master, { [elementMaker[self].id]: elementMaker[self] })
                }
                const filerted2 = Object.values(elementMaker).filter(self2 => {
                    return self2.id == `${self}` || self2.source == `${self}`
                })
                filerted2.map(self3 => {
                    if (master[self3.id] == undefined) {
                        Object.assign(master, { [self3.id]: self3 })
                    }
                    if (self3.target != undefined) {
                        Object.assign(secondtarget, { [self3.target]: {} })
                        if (master[elementMaker[self3.target].id] == undefined) {
                            Object.assign(master, { [elementMaker[self3.target].id]: elementMaker[self3.target] })
                        }
                    }
                })
            })
            Object.keys(secondsource).map(self => {
                if (master[self] == undefined) {
                    Object.assign(master, { [elementMaker[self].id]: elementMaker[self] })
                }
                const filerted2 = Object.values(elementMaker).filter(self2 => {
                    return self2.id == `${self}` || self2.target == `${self}`
                })
                filerted2.map(self3 => {
                    if (master[self3.id] == undefined) {
                        Object.assign(master, { [self3.id]: self3 })
                    }
                    if (self3.source != undefined) {
                        Object.assign(secondsource, { [self3.source]: {} })
                        if (master[elementMaker[self3.source].id] == undefined) {
                            Object.assign(master, { [elementMaker[self3.source].id]: elementMaker[self3.source] })
                        }
                    }
                })
            })
            //fifth
            Object.keys(secondtarget).map(self => {
                if (master[self] == undefined) {
                    Object.assign(master, { [elementMaker[self].id]: elementMaker[self] })
                }
                const filerted2 = Object.values(elementMaker).filter(self2 => {
                    return self2.id == `${self}` || self2.source == `${self}`
                })
                filerted2.map(self3 => {
                    if (master[self3.id] == undefined) {
                        Object.assign(master, { [self3.id]: self3 })
                    }
                    if (self3.target != undefined) {
                        Object.assign(secondtarget, { [self3.target]: {} })
                        if (master[elementMaker[self3.target].id] == undefined) {
                            Object.assign(master, { [elementMaker[self3.target].id]: elementMaker[self3.target] })
                        }
                    }
                })
            })
            Object.keys(secondsource).map(self => {
                if (master[self] == undefined) {
                    Object.assign(master, { [elementMaker[self].id]: elementMaker[self] })
                }
                const filerted2 = Object.values(elementMaker).filter(self2 => {
                    return self2.id == `${self}` || self2.target == `${self}`
                })
                filerted2.map(self3 => {
                    if (master[self3.id] == undefined) {
                        Object.assign(master, { [self3.id]: self3 })
                    }
                    if (self3.source != undefined) {
                        Object.assign(secondsource, { [self3.source]: {} })
                        if (master[elementMaker[self3.source].id] == undefined) {
                            Object.assign(master, { [elementMaker[self3.source].id]: elementMaker[self3.source] })
                        }
                    }
                })
            })
            //sixth
            Object.keys(secondtarget).map(self => {
                if (master[self] == undefined) {
                    Object.assign(master, { [elementMaker[self].id]: elementMaker[self] })
                }
                const filerted2 = Object.values(elementMaker).filter(self2 => {
                    return self2.id == `${self}` || self2.source == `${self}`
                })
                filerted2.map(self3 => {
                    if (master[self3.id] == undefined) {
                        Object.assign(master, { [self3.id]: self3 })
                    }
                    if (self3.target != undefined) {
                        Object.assign(secondtarget, { [self3.target]: {} })
                        if (master[elementMaker[self3.target].id] == undefined) {
                            Object.assign(master, { [elementMaker[self3.target].id]: elementMaker[self3.target] })
                        }
                    }
                })
            })
            Object.keys(secondsource).map(self => {
                if (master[self] == undefined) {
                    Object.assign(master, { [elementMaker[self].id]: elementMaker[self] })
                }
                const filerted2 = Object.values(elementMaker).filter(self2 => {
                    return self2.id == `${self}` || self2.target == `${self}`
                })
                filerted2.map(self3 => {
                    if (master[self3.id] == undefined) {
                        Object.assign(master, { [self3.id]: self3 })
                    }
                    if (self3.source != undefined) {
                        Object.assign(secondsource, { [self3.source]: {} })
                        if (master[elementMaker[self3.source].id] == undefined) {
                            Object.assign(master, { [elementMaker[self3.source].id]: elementMaker[self3.source] })
                        }
                    }
                })
            })

            if (commandfilter != undefined) {
                setelements(Object.values(master))
                setfinshedrunning(true)
            } else {
                setelements(Object.values(elementMaker))
                setfinshedrunning(true)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [finshedrunning, showMap, setShowMap, commandfilter])

    useEffect(() => {
        if (commandfilter != undefined) {
            const master = {}
            const secondtarget = {}
            const secondsource = {}
            const filerted1 = Object.values(elementMaker).filter(self2 => {
                return self2.source == commandfilter || self2.target == `${commandfilter}` || self2.id == `${commandfilter}`
            })
            filerted1.map(self => {
                if (self.id == commandfilter) {
                    Object.assign(master, {
                        [self.id]:
                    {
                        id: self.id,
                        data: {
                            label: <div className='abilitybox'>
                                {self.data.label}
                            </div>
                        },
                        position: self.position,
                        type: self.type,
                        style: {
                            background: "rgb(30, 55, 88)"
                        },
                        targetPosition: self.targetPosition,
                        sourcePosition: self.sourcePosition,
                    }
                    })
                } else {
                    Object.assign(master, { [self.id]: self })
                }
                if (self.target != undefined) {
                    Object.assign(secondtarget, { [self.target]: {} })
                }
                if (self.source != undefined) {
                    Object.assign(secondsource, { [self.source]: {} })
                }
            })
            //first
            Object.keys(secondtarget).map(self => {
                if (master[self] == undefined) {
                    Object.assign(master, { [elementMaker[self].id]: elementMaker[self] })
                }
                const filerted2 = Object.values(elementMaker).filter(self2 => {
                    return self2.id == `${self}` || self2.source == `${self}`
                })
                filerted2.map(self3 => {
                    if (master[self3.id] == undefined) {
                        Object.assign(master, { [self3.id]: self3 })
                    }
                    if (self3.target != undefined) {
                        Object.assign(secondtarget, { [self3.target]: {} })
                        if (master[elementMaker[self3.target].id] == undefined) {
                            Object.assign(master, { [elementMaker[self3.target].id]: elementMaker[self3.target] })
                        }
                    }
                })
            })
            Object.keys(secondsource).map(self => {
                if (master[self] == undefined) {
                    Object.assign(master, { [elementMaker[self].id]: elementMaker[self] })
                }
                const filerted2 = Object.values(elementMaker).filter(self2 => {
                    return self2.id == `${self}` || self2.target == `${self}`
                })
                filerted2.map(self3 => {
                    if (master[self3.id] == undefined) {
                        Object.assign(master, { [self3.id]: self3 })
                    }
                    if (self3.source != undefined) {
                        Object.assign(secondsource, { [self3.source]: {} })
                        if (master[elementMaker[self3.source].id] == undefined) {
                            Object.assign(master, { [elementMaker[self3.source].id]: elementMaker[self3.source] })
                        }
                    }
                })
            })
            //second
            Object.keys(secondtarget).map(self => {
                if (master[self] == undefined) {
                    Object.assign(master, { [elementMaker[self].id]: elementMaker[self] })
                }
                const filerted2 = Object.values(elementMaker).filter(self2 => {
                    return self2.id == `${self}` || self2.source == `${self}`
                })
                filerted2.map(self3 => {
                    if (master[self3.id] == undefined) {
                        Object.assign(master, { [self3.id]: self3 })
                    }
                    if (self3.target != undefined) {
                        Object.assign(secondtarget, { [self3.target]: {} })
                        if (master[elementMaker[self3.target].id] == undefined) {
                            Object.assign(master, { [elementMaker[self3.target].id]: elementMaker[self3.target] })
                        }
                    }
                })
            })
            Object.keys(secondsource).map(self => {
                if (master[self] == undefined) {
                    Object.assign(master, { [elementMaker[self].id]: elementMaker[self] })
                }
                const filerted2 = Object.values(elementMaker).filter(self2 => {
                    return self2.id == `${self}` || self2.target == `${self}`
                })
                filerted2.map(self3 => {
                    if (master[self3.id] == undefined) {
                        Object.assign(master, { [self3.id]: self3 })
                    }
                    if (self3.source != undefined) {
                        Object.assign(secondsource, { [self3.source]: {} })
                        if (master[elementMaker[self3.source].id] == undefined) {
                            Object.assign(master, { [elementMaker[self3.source].id]: elementMaker[self3.source] })
                        }
                    }
                })
            })
            //third
            Object.keys(secondtarget).map(self => {
                if (master[self] == undefined) {
                    Object.assign(master, { [elementMaker[self].id]: elementMaker[self] })
                }
                const filerted2 = Object.values(elementMaker).filter(self2 => {
                    return self2.id == `${self}` || self2.source == `${self}`
                })
                filerted2.map(self3 => {
                    if (master[self3.id] == undefined) {
                        Object.assign(master, { [self3.id]: self3 })
                    }
                    if (self3.target != undefined) {
                        Object.assign(secondtarget, { [self3.target]: {} })
                        if (master[elementMaker[self3.target].id] == undefined) {
                            Object.assign(master, { [elementMaker[self3.target].id]: elementMaker[self3.target] })
                        }
                    }
                })
            })
            Object.keys(secondsource).map(self => {
                if (master[self] == undefined) {
                    Object.assign(master, { [elementMaker[self].id]: elementMaker[self] })
                }
                const filerted2 = Object.values(elementMaker).filter(self2 => {
                    return self2.id == `${self}` || self2.target == `${self}`
                })
                filerted2.map(self3 => {
                    if (master[self3.id] == undefined) {
                        Object.assign(master, { [self3.id]: self3 })
                    }
                    if (self3.source != undefined) {
                        Object.assign(secondsource, { [self3.source]: {} })
                        if (master[elementMaker[self3.source].id] == undefined) {
                            Object.assign(master, { [elementMaker[self3.source].id]: elementMaker[self3.source] })
                        }
                    }
                })
            })
            //forth
            Object.keys(secondtarget).map(self => {
                if (master[self] == undefined) {
                    Object.assign(master, { [elementMaker[self].id]: elementMaker[self] })
                }
                const filerted2 = Object.values(elementMaker).filter(self2 => {
                    return self2.id == `${self}` || self2.source == `${self}`
                })
                filerted2.map(self3 => {
                    if (master[self3.id] == undefined) {
                        Object.assign(master, { [self3.id]: self3 })
                    }
                    if (self3.target != undefined) {
                        Object.assign(secondtarget, { [self3.target]: {} })
                        if (master[elementMaker[self3.target].id] == undefined) {
                            Object.assign(master, { [elementMaker[self3.target].id]: elementMaker[self3.target] })
                        }
                    }
                })
            })
            Object.keys(secondsource).map(self => {
                if (master[self] == undefined) {
                    Object.assign(master, { [elementMaker[self].id]: elementMaker[self] })
                }
                const filerted2 = Object.values(elementMaker).filter(self2 => {
                    return self2.id == `${self}` || self2.target == `${self}`
                })
                filerted2.map(self3 => {
                    if (master[self3.id] == undefined) {
                        Object.assign(master, { [self3.id]: self3 })
                    }
                    if (self3.source != undefined) {
                        Object.assign(secondsource, { [self3.source]: {} })
                        if (master[elementMaker[self3.source].id] == undefined) {
                            Object.assign(master, { [elementMaker[self3.source].id]: elementMaker[self3.source] })
                        }
                    }
                })
            })
            //fifth
            Object.keys(secondtarget).map(self => {
                if (master[self] == undefined) {
                    Object.assign(master, { [elementMaker[self].id]: elementMaker[self] })
                }
                const filerted2 = Object.values(elementMaker).filter(self2 => {
                    return self2.id == `${self}` || self2.source == `${self}`
                })
                filerted2.map(self3 => {
                    if (master[self3.id] == undefined) {
                        Object.assign(master, { [self3.id]: self3 })
                    }
                    if (self3.target != undefined) {
                        Object.assign(secondtarget, { [self3.target]: {} })
                        if (master[elementMaker[self3.target].id] == undefined) {
                            Object.assign(master, { [elementMaker[self3.target].id]: elementMaker[self3.target] })
                        }
                    }
                })
            })
            Object.keys(secondsource).map(self => {
                if (master[self] == undefined) {
                    Object.assign(master, { [elementMaker[self].id]: elementMaker[self] })
                }
                const filerted2 = Object.values(elementMaker).filter(self2 => {
                    return self2.id == `${self}` || self2.target == `${self}`
                })
                filerted2.map(self3 => {
                    if (master[self3.id] == undefined) {
                        Object.assign(master, { [self3.id]: self3 })
                    }
                    if (self3.source != undefined) {
                        Object.assign(secondsource, { [self3.source]: {} })
                        if (master[elementMaker[self3.source].id] == undefined) {
                            Object.assign(master, { [elementMaker[self3.source].id]: elementMaker[self3.source] })
                        }
                    }
                })
            })
            //sixth
            Object.keys(secondtarget).map(self => {
                if (master[self] == undefined) {
                    Object.assign(master, { [elementMaker[self].id]: elementMaker[self] })
                }
                const filerted2 = Object.values(elementMaker).filter(self2 => {
                    return self2.id == `${self}` || self2.source == `${self}`
                })
                filerted2.map(self3 => {
                    if (master[self3.id] == undefined) {
                        Object.assign(master, { [self3.id]: self3 })
                    }
                    if (self3.target != undefined) {
                        Object.assign(secondtarget, { [self3.target]: {} })
                        if (master[elementMaker[self3.target].id] == undefined) {
                            Object.assign(master, { [elementMaker[self3.target].id]: elementMaker[self3.target] })
                        }
                    }
                })
            })
            Object.keys(secondsource).map(self => {
                if (master[self] == undefined) {
                    Object.assign(master, { [elementMaker[self].id]: elementMaker[self] })
                }
                const filerted2 = Object.values(elementMaker).filter(self2 => {
                    return self2.id == `${self}` || self2.target == `${self}`
                })
                filerted2.map(self3 => {
                    if (master[self3.id] == undefined) {
                        Object.assign(master, { [self3.id]: self3 })
                    }
                    if (self3.source != undefined) {
                        Object.assign(secondsource, { [self3.source]: {} })
                        if (master[elementMaker[self3.source].id] == undefined) {
                            Object.assign(master, { [elementMaker[self3.source].id]: elementMaker[self3.source] })
                        }
                    }
                })
            })
            setelements(Object.values(master))
        } else {
            setelements(Object.values(elementMaker))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commandfilter])

    //type selector2
    const CondSelect2 = (e) => {
        if (e !== null) {
            setcommandfilter(e.value)
        } else {
            setcommandfilter();
        }
    };

    //clear
    const resetbutton = () => {
        setclearFilter(true);
        setReverse(false)
        setupgraded(true)

        setAdvanceValuesearch("")
        setAdvanceValuesearch2("")
        setAdvanceValuesearch3("")
        setAdvanceValuesearch4("")
        setReversesearch("")
        setTEXTsearch("")
        setTypesearch("")
        setTypesearch2("")
        setsearchdisplay("");
        setSearchTerm("");
        setCondFilter("")
        setCondFilter2("")
        setvaluedisplay("")
        setvaluedisplay2("")
        setvaluedisplay3("")
        setvaluedisplay4("")
        setupgradedsearch("")

        setTimeout(() => setclearFilter(false), 1000);
    }

    if (ability_data.length == 0) {
        return (
            <div className='ultimaweaponitemholder'>
                No Data
            </div>
        )
    } else {
        return (
            <div>
                <div className="charfilterspacer" />
                <div key="filter1" onClick={showfilterbutton} className="charfilter"><span className="filterstext"></span>{showFilter ? <TiArrowSortedUp className="uparrow" /> : <TiArrowSortedDown className="downarrow" />}</div>
                <div className="event-search-reverse-holder">
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
                </div>
                <div className="filterholder noselect" id={showFilter ? "showfilteren" : "hiddenfilteren"}>
                    <div className="similarbanner">ID Finder</div>
                    <div className="filterholderflair">
                        <div className='muliwrap'>
                            <div className='makespace'>
                                <div className="not_rangeholder">
                                    Command
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
                            </div>
                            <div className='makespace'>
                                <div className="not_rangeholder">
                                    Cast
                                    <div className="labelmax">
                                        <input
                                            className="not_numberbox"
                                            placeholder="5"
                                            id="search3"
                                            value={valuedisplay2}
                                            onChange={changeend2}
                                            onKeyDown={handleKeyPressValue2}
                                        >
                                        </input>
                                        {valuedisplay2 === "" ? "" :
                                            <IoMdCloseCircleOutline onClick={clearSearchValue2} className="clearsearch"></IoMdCloseCircleOutline>}
                                    </div>
                                </div>
                                <div className="loadmore" onClick={searchobjects2}>
                                    Search
                                </div>
                            </div>
                            <div className='makespace'>
                                <div className="not_rangeholder">
                                    Ailment
                                    <div className="labelmax">
                                        <input
                                            className="not_numberbox"
                                            placeholder="5"
                                            id="search4"
                                            value={valuedisplay3}
                                            onChange={changeend3}
                                            onKeyDown={handleKeyPressValue3}
                                        >
                                        </input>
                                        {valuedisplay3 === "" ? "" :
                                            <IoMdCloseCircleOutline onClick={clearSearchValue3} className="clearsearch"></IoMdCloseCircleOutline>}
                                    </div>
                                </div>
                                <div className="loadmore" onClick={searchobjects3}>
                                    Search
                                </div>
                            </div>
                            <div className='makespace'>
                                <div className="not_rangeholder">
                                    Hit Data
                                    <div className="labelmax">
                                        <input
                                            className="not_numberbox"
                                            placeholder="5"
                                            id="search5"
                                            value={valuedisplay4}
                                            onChange={changeend4}
                                            onKeyDown={handleKeyPressValue4}
                                        >
                                        </input>
                                        {valuedisplay4 === "" ? "" :
                                            <IoMdCloseCircleOutline onClick={clearSearchValue4} className="clearsearch"></IoMdCloseCircleOutline>}
                                    </div>
                                </div>
                                <div className="loadmore" onClick={searchobjects4}>
                                    Search
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="similarbanner">Filters</div>
                        <div className="margeholder">
                            <div className="Merge">
                                <Tippy content="Only Fully Upgraded">
                                    <label htmlFor='search' className="MergeText">Upgraded</label>
                                </Tippy>
                                <div key="mergecheck1" className={`${upgraded == true ? "nodisplay" : `uncheck`}`} onClick={upgradedbutton} />
                                <div key="mergecheck2" className={`${upgraded == true ? "check" : `nodisplay`}`} onClick={upgradedbutton} />
                            </div>
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
                                    id="search6"
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
                            <div className="mapbox">

                            <div className="centertext" onClick={showmapbutton}>Map</div>

                            </div>
                            <Tippy content="Reset Filters" className="tooltip" >
                                <div onClick={resetbutton} className={`clearbox`} ><div className="makecenter">Reset&nbsp;<FaUndoAlt className={`clearbutton ${clearFilter ? "loop" : ""}`} ></FaUndoAlt></div></div>
                            </Tippy>
                        </div>
                    </div>
                </div>
                <div id={showMap && finshedrunning ? "showfilteren" : "hiddenfilteren"} className={`filterholder noselect`}>
                    <div className="similarbanner">Ability Map
                        <div className="typeholder2">
                            <Select
                                key={typeListArray3}
                                isSearchable={true}
                                placeholder="Command Filter..."
                                className='typecontainer'
                                classNamePrefix="typetext"
                                onChange={CondSelect2}
                                options={Object.values(typeListArray3)}
                                isClearable={true}
                            />
                        </div>
                        <div className='subtextbottom'>Abilities are movable for better viewing</div>
                    </div>
                    <div className="filterholderflair">
                        <MapMaker
                            key={elements}
                            initialElements={elements}
                        />
                    </div>
                </div>
                <div className="ultimaweaponitemholder">
                    <CharacterAbilitySubListFormatting
                        tag_display={"brvattackicon"}
                        character_ability={commandList.filter(self => self.rank == "BRV")}
                        ver={ver}
                        loc={loc}
                        file={file}

                        master_index={master_index}
                        debugging={true}
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
                        debugging={true}
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
                        debugging={true}
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
                        debugging={true}
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
                        debugging={true}
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
                        debugging={true}
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
                        debugging={true}
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
                        debugging={true}
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
                        debugging={true}
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
                        debugging={true}
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
                        debugging={true}
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
                        debugging={true}
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

export default trackWindowScroll(CharacterAbilityPage) 