import React, { useState, useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import { useDispatch } from "react-redux";
import { setFalse, setTrue } from './redux/ducks/jptoggle'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import Tippy from './components/TippyDefaults'
import axios from 'axios'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { getQuery, getQueryStringVal, useQueryParam } from './components/URLParams'
import { FaShareSquare } from 'react-icons/fa';
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { FaUndoAlt } from 'react-icons/fa'
import MissionFormatting from './components/Missions/MissionFormatting';
import PanelFormatting from './components/Missions/PanelFormatting';
import Select from 'react-select';

export default function Missions({
    jptoggledata
}
){

    const dispatch = useDispatch();

    const startinglimit = 25;

    const [banerDisplayTerm, setbanerDisplayTerm] = useStateIfMounted("panels");
    const [rawData, setrawData] = useStateIfMounted([]);
    const [returnmsg, setreturnmsg] = useStateIfMounted();
    const [loop1, setloop1] = useStateIfMounted(false);
    const [loop2, setloop2] = useStateIfMounted(false);
    const [request, setrequest]  = useStateIfMounted();
    const [JP, setJP] = useState(jptoggledata);
    const [JPsearch, setJPSearch] = useQueryParam("JP", "");

    useEffect(()=>{
        if(rawData.length == 0){
            axios.get(`https://www.dissidiacompendium.com/data/_dir/missions/${JP==true?"JP":"GL"}${banerDisplayTerm}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setrawData(response)
            }).catch(function (err) {
                console.log(err)
                setrawData([])
            })
        }
         // eslint-disable-next-line
    },[rawData,banerDisplayTerm,JP,setbanerDisplayTerm])

    const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null ? true : false);
    const [clearFilter, setclearFilter] = useStateIfMounted(false);
    const [reverse, setReverse] = useState(getQueryStringVal("rev") != null ? true : false);

    const [dailies, setdailies] = useState(getQueryStringVal("dailies") != null ? true : false);
    const [player,setplayer] = useState(getQueryStringVal("player") != null ? true : false);
    const [panel,setpanel] = useState(getQueryStringVal("panels") != null ? true : false);
    const [event, setevent] = useState(getQueryStringVal("event") != null ? true : false);
    const [spiritus, setspiritus] = useState(getQueryStringVal("spiritus") != null ? true : false);
    const [ultima,setultima] = useState(getQueryStringVal("ultima") != null ? true : false);
    const [feod, setfeod] = useState(getQueryStringVal("feod") != null ? true : false);
    const [abyss, setabyss] = useState(getQueryStringVal("abyss") != null ? true : false);
    const [single,setsingle] = useState(getQueryStringVal("single") != null ? true : false);
    const [sixman, setsixman] = useState(getQueryStringVal("sixman") != null ? true : false);
    const [memorial, setmemorial] = useState(getQueryStringVal("memorial") != null ? true : false);
    const [raid, setraid] = useState(getQueryStringVal("raid") != null ? true : false);

    const [loop, setLoop] = useStateIfMounted(false);
    const [searchTerm, setSearchTerm] = useState(getQueryStringVal("search") != null ? getQueryStringVal("search").toLowerCase() : "");
    const [searchdisplay, setsearchdisplay] = useState(getQueryStringVal("search") != null ? getQueryStringVal("search") : "");
    const [searchResults, setSearchResults] = useState(rawData);
    const [condFilter, setCondFilter] = useState("");
    const [limits, setLimits] = useState(startinglimit);
    const [listDisplay, setListDisplay] = useState(
        rawData && rawData.slice(0, startinglimit)
    );

    const [listLength, setListLength] = useState(listDisplay.length);
    const [showLoadMore, setShowLoadMore] = useState(true);
    const [displayBanner, setDisplayBanner] = useState(
      <>Displaying <span className="subtextgold">{listLength}</span> of <span className="subtextgold"> {rawData.length}</span> {banerDisplayTerm}</>
    );

    const [dailiessearch,setdailiessearch] = useQueryParam("dailies", "");
    const [playersearch,setplayersearch] = useQueryParam("player", "");
    const [panelsearch,setpanelsearch] = useQueryParam("panels", "");
    const [eventsearch, seteventsearch] = useQueryParam("event", "");
    const [spiritussearch, setspiritussearch] = useQueryParam("spiritus", "")
    const [ultimasearch, setultimasearch] = useQueryParam("ultima", "")
    const [feodsearch, setfeodsearch] = useQueryParam("feod", "");
    const [abysssearch, setabysssearch] = useQueryParam("abyss", "");
    const [singlesearch, setsinglesearch] = useQueryParam("single", "");
    const [sixmansearch, setsixmansearch] = useQueryParam("sixman", "");
    const [memorialsearch, setmemorialsearch] = useQueryParam("memorial", "");
    const [raidsearch, setraidsearch] = useQueryParam("raid", "");

    const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
    const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
    const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");
    const { protocol, pathname, host } = window.location;
    const query = getQuery();
    const url = `${protocol}//${host}${pathname}?${query.toString()}`;

    //jp params
    useEffect(() => {
        if (jptoggledata == true) {
        setJPSearch("true")
        } else {
        setJPSearch("")
        }
    }, [jptoggledata, setJPSearch])

    useEffect(() => {
        if (getQueryStringVal("JP") == "true") {
          dispatch(setTrue())
          setJP(true)
        } else {
          dispatch(setFalse())
          setJP(false)
        }
      }, [setJPSearch, dispatch])

    useEffect(() => {
        if (getQueryStringVal("JP") == "true") {
            setJP(true)
        } else {
            setJP(false)
        }
        if(getQueryStringVal("panels") != "true"){
            setbanerDisplayTerm("missions")
        }
        // eslint-disable-next-line 
    }, [])

    useEffect(() => {
        //search params
        if (getQueryStringVal("search") != null) {
          setSearchTerm(getQueryStringVal("search") != null ? getQueryStringVal("search").toLowerCase() : "")
          setTEXTsearch(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
          setsearchdisplay(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
        }
    }, [setTEXTsearch, setFiltersearch])

    const type_list = [
        {
            id:1,
            item_id: 19,
            item_type: 18,
            name: 'Providence Core',
            value: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_lb_material/19.png`} alt={'Providence Core'}/>{'Providence Core'}</span>,
            label: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_lb_material/19.png`} alt={'Providence Core'}/>{'Providence Core'}</span>
        },
        {
            id:2,
            item_id: 20,
            item_type: 18,
            name: 'High Power Stone',
            value: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_lb_material/20.png`} alt={'High Power Stone'}/>{'High Power Stone'}</span>,
            label: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_lb_material/20.png`} alt={'High Power Stone'}/>{'High Power Stone'}</span>
        },
        {
            id:3,
            item_id: 1,
            item_type: 37,
            name: 'Force Stone Fragment',
            value: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_link_stone/1.png`} alt={'Force Stone Fragment'}/>{'Force Stone Fragment'}</span>,
            label: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_link_stone/1.png`} alt={'Force Stone Fragment'}/>{'Force Stone Fragment'}</span>
        },
        {
            id:4,
            item_id: -2,
            item_type: 41,
            name: 'Polychromatic Sparkle',
            value: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_crystal_point/-2.png`} alt={'Polychromatic Sparkle'}/>{'Polychromatic Sparkle'}</span>,
            label: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_crystal_point/-2.png`} alt={'Polychromatic Sparkle'}/>{'Polychromatic Sparkle'}</span>
        },
        {
            id:5,
            item_id: 15,
            item_type: 18,
            name: 'Fragment of Ruins Miracles',
            value: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_lb_material/15.png`} alt={'Fragment of Ruin\'s Miracles'}/>{'Fragment of Ruin\'s Miracles'}</span>,
            label: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_lb_material/15.png`} alt={'Fragment of Ruin\'s Miracles'}/>{'Fragment of Ruin\'s Miracles'}</span>
        },
        {
            id:6,
            item_id: 17,
            item_type: 18,
            name: 'Ruins Ultima Nugget',
            value: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_lb_material/17.png`} alt={'Ruin\'s Ultima Nugget'}/>{'Ruin\'s Ultima Nugget'}</span>,
            label: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_lb_material/17.png`} alt={'Ruin\'s Ultima Nugget'}/>{'Ruin\'s Ultima Nugget'}</span>
        },
        {
            id:7,
            item_id: 11,
            item_type: 18,
            name: 'Fragment of Refuges Miracles',
            value: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_lb_material/11.png`} alt={'Fragment of Refuge\'s Miracles'}/>{'Fragment of Refuge\'s Miracles'}</span>,
            label: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_lb_material/11.png`} alt={'Fragment of Refuge\'s Miracles'}/>{'Fragment of Refuge\'s Miracles'}</span>
        },
        {
            id:8,
            item_id: 13,
            item_type: 18,
            name: 'Refuges Ultima Nugget',
            value: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_lb_material/13.png`} alt={'Refuge\'s Ultima Nugget'}/>{'Refuge\'s Ultima Nugget'}</span>,
            label: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_lb_material/13.png`} alt={'Refuge\'s Ultima Nugget'}/>{'Refuge\'s Ultima Nugget'}</span>
        }
    ]

    //type list
    const [typeListArray, settypeListArray] = useStateIfMounted(type_list);
    const [Typesearch, setTypesearch] = useQueryParam("item", "");

    //param logic
    useEffect(() => {
        const type_list = [
            {
                id:1,
                item_id: 19,
                item_type: 18,
                name: 'Providence Core',
                value: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_lb_material/19.png`} alt={'Providence Core'}/>{'Providence Core'}</span>,
                label: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_lb_material/19.png`} alt={'Providence Core'}/>{'Providence Core'}</span>
            },
            {
                id:2,
                item_id: 20,
                item_type: 18,
                name: 'High Power Stone',
                value: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_lb_material/20.png`} alt={'High Power Stone'}/>{'High Power Stone'}</span>,
                label: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_lb_material/20.png`} alt={'High Power Stone'}/>{'High Power Stone'}</span>
            },
            {
                id:3,
                item_id: 1,
                item_type: 37,
                name: 'Force Stone Fragment',
                value: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_link_stone/1.png`} alt={'Force Stone Fragment'}/>{'Force Stone Fragment'}</span>,
                label: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_link_stone/1.png`} alt={'Force Stone Fragment'}/>{'Force Stone Fragment'}</span>
            },
            {
                id:4,
                item_id: -2,
                item_type: 41,
                name: 'Polychromatic Sparkle',
                value: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_crystal_point/-2.png`} alt={'Polychromatic Sparkle'}/>{'Polychromatic Sparkle'}</span>,
                label: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_crystal_point/-2.png`} alt={'Polychromatic Sparkle'}/>{'Polychromatic Sparkle'}</span>
            },
            {
                id:5,
                item_id: 15,
                item_type: 18,
                name: 'Fragment of Ruins Miracles',
                value: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_lb_material/15.png`} alt={'Fragment of Ruin\'s Miracles'}/>{'Fragment of Ruin\'s Miracles'}</span>,
                label: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_lb_material/15.png`} alt={'Fragment of Ruin\'s Miracles'}/>{'Fragment of Ruin\'s Miracles'}</span>
            },
            {
                id:6,
                item_id: 17,
                item_type: 18,
                name: 'Ruins Ultima Nugget',
                value: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_lb_material/17.png`} alt={'Ruin\'s Ultima Nugget'}/>{'Ruin\'s Ultima Nugget'}</span>,
                label: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_lb_material/17.png`} alt={'Ruin\'s Ultima Nugget'}/>{'Ruin\'s Ultima Nugget'}</span>
            },
            {
                id:7,
                item_id: 11,
                item_type: 18,
                name: 'Fragment of Refuges Miracles',
                value: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_lb_material/11.png`} alt={'Fragment of Refuge\'s Miracles'}/>{'Fragment of Refuge\'s Miracles'}</span>,
                label: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_lb_material/11.png`} alt={'Fragment of Refuge\'s Miracles'}/>{'Fragment of Refuge\'s Miracles'}</span>
            },
            {
                id:8,
                item_id: 13,
                item_type: 18,
                name: 'Refuges Ultima Nugget',
                value: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_lb_material/13.png`} alt={'Refuge\'s Ultima Nugget'}/>{'Refuge\'s Ultima Nugget'}</span>,
                label: <span><img className='inline-buff' src={`https://dissidiacompendium.com/images/static/items/mst_lb_material/13.png`} alt={'Refuge\'s Ultima Nugget'}/>{'Refuge\'s Ultima Nugget'}</span>
            }
        ]
        //type params
        if (Typesearch != null && banerDisplayTerm != "panels") {
            const filteredtype = type_list.filter(function (ef) {
                const newfilterpull = ef.name === getQueryStringVal("item");
                return newfilterpull;
            })
            if (filteredtype.length != 0) {
                setTypesearch(getQueryStringVal("item"))
                setCondFilter(filteredtype[0])
            } else {
                setTypesearch("")
                setCondFilter("")
            }
        }
        // eslint-disable-next-line
    }, [setCondFilter, Typesearch, banerDisplayTerm, rawData])

    //filter
    useEffect(() => {
        const filterholder = [];
        if(banerDisplayTerm == "missions"){
            if (dailies === true) {
                const filteredout = rawData.filter(
                    (event) => event.mission_category == 1
                );
                filterholder.push(...filteredout);
            }
            if (player === true) {
                const filteredout = rawData.filter(
                    (event) => event.mission_category == 2
                );
                filterholder.push(...filteredout);
            }
            if (event === true) {
                const filteredout = rawData.filter(
                    (event) => event.mission_category == 3
                );
                filterholder.push(...filteredout);
            }
            if (feod === true) {
                const filteredout = rawData.filter(
                    (event) => event.mission_category == 7 || event.mission_category == 13
                );
                filterholder.push(...filteredout);
            }
            if (abyss === true) {
                const filteredout = rawData.filter(
                    (event) => event.mission_category == 8
                );
                filterholder.push(...filteredout);
            }
            if (ultima === true) {
                const filteredout = rawData.filter(
                    (event) => event.mission_category == 11
                );
                filterholder.push(...filteredout);
            }
            if (sixman === true) {
                const filteredout = rawData.filter(
                    (event) => event.mission_category == 12
                );
                filterholder.push(...filteredout);
            }
            if (spiritus === true) {
                const filteredout = rawData.filter(
                    (event) => event.mission_category == 14 || event.mission_category == 15
                );
                filterholder.push(...filteredout);
            }
            if (raid === true) {
                const filteredout = rawData.filter(
                    (event) => event.mission_category == 5 || event.mission_category == 6
                );
                filterholder.push(...filteredout);
            }
            if (single === true) {
                const filteredout = rawData.filter(
                    (event) => event.mission_category == 16
                );
                filterholder.push(...filteredout);
            }
            if (memorial === true) {
                const filteredout = rawData.filter(
                    (event) => event.mission_category == 17
                );
                filterholder.push(...filteredout);
            }
        } else {
            filterholder.push(...rawData);
        }
       
        if (![dailies, player, event, feod, abyss, ultima, raid, sixman, spiritus, single, memorial].includes(true)) {
            filterholder.push(...rawData);
        }

        const makeUnique = filterholder.filter(onlyUnique)
            .sort((a, b) =>
                reverse === false ?
                banerDisplayTerm == "panels" ? b.panel_id - a.panel_id : a.sort_num - b.sort_num:
                banerDisplayTerm == "panels" ? a.panel_id - b.panel_id : b.sort_num - a.sort_num
            );
        const searchit = makeUnique.filter((events) =>
        `#${events.mission_id} #${events.panel_id} ${events.title} ${events.trans} ${events.description} ${events.loc} ${events.field}`.toLowerCase().includes(searchTerm)
        );
        const gettypefilter = searchit.filter(function (ef) {
            if (condFilter !== "" && banerDisplayTerm != "panels") {
              return ef.rewards
              .some(reward => reward.item_id === condFilter.item_id && reward.item_type === condFilter.item_type)
              ;
            } else {
              return ef
            }
        });
        setSearchResults(gettypefilter);
        const newlistdisplay = gettypefilter.slice(0, limits);
        setShowLoadMore(limits < gettypefilter.length ? true : false);
        setListDisplay(newlistdisplay);
        setListLength(limits < gettypefilter.length ? gettypefilter.length : newlistdisplay.length);
        setDisplayBanner(
        <>Displaying <span className="subtextgold">{newlistdisplay.length}</span> of <span className="subtextgold"> {gettypefilter.length}</span> {banerDisplayTerm}</>
        );
    }, [banerDisplayTerm, searchTerm, rawData, limits, raid, clearFilter, panel, dailies, player, event, feod, abyss, ultima, sixman, spiritus, single, memorial, condFilter, reverse]);

    const dailiesbutton = () => {
        if (dailies == false) {
            if(banerDisplayTerm == "panels"){
                setbanerDisplayTerm("missions")
                setrawData([])
            }

            setdailies(true);
            setdailiessearch("true")

            setplayer(false);
            setplayersearch("")
            setpanel(false);
            setpanelsearch("")
            setevent(false)
            seteventsearch("")
            setfeod(false)
            setfeodsearch("")
            setabyss(false)
            setabysssearch("")
            setultima(false)
            setultimasearch("")
            setsixman(false)
            setsixmansearch("")
            setspiritus(false)
            setspiritussearch("")
            setsingle(false)
            setsinglesearch("")
            setmemorial(false)
            setmemorialsearch("")
            setraid(false)
            setraidsearch("")
        }
    };
    const playerbutton = () => {
        if (player == false) {
            if(banerDisplayTerm == "panels"){
                setbanerDisplayTerm("missions")
                setrawData([])
            }

            setdailies(false);
            setdailiessearch("")

            setplayer(true);
            setplayersearch("true")

            setpanel(false);
            setpanelsearch("")
            setevent(false)
            seteventsearch("")
            setfeod(false)
            setfeodsearch("")
            setabyss(false)
            setabysssearch("")
            setultima(false)
            setultimasearch("")
            setsixman(false)
            setsixmansearch("")
            setspiritus(false)
            setspiritussearch("")
            setsingle(false)
            setsinglesearch("")
            setmemorial(false)
            setmemorialsearch("")
            setraid(false)
            setraidsearch("")
        }
    };
    const panelbutton = () => {
        if (panel == false) {
            if(banerDisplayTerm == "missions"){
                setbanerDisplayTerm("panels")
                setrawData([])
            }

            setdailies(false);
            setdailiessearch("")
            setplayer(false);
            setplayersearch("")

            setpanel(true);
            setpanelsearch("true")

            setevent(false)
            seteventsearch("")
            setfeod(false)
            setfeodsearch("")
            setabyss(false)
            setabysssearch("")
            setultima(false)
            setultimasearch("")
            setsixman(false)
            setsixmansearch("")
            setspiritus(false)
            setspiritussearch("")
            setsingle(false)
            setsinglesearch("")
            setmemorial(false)
            setmemorialsearch("")
            setraid(false)
            setraidsearch("")
        }
    };
    const eventsbutton = () => {
        if (event == false) {
            if(banerDisplayTerm == "panels"){
                setbanerDisplayTerm("missions")
                setrawData([])
            }

            setdailies(false);
            setdailiessearch("")
            setplayer(false);
            setplayersearch("")
            setpanel(false);
            setpanelsearch("")

            setevent(true)
            seteventsearch("true")

            setfeod(false)
            setfeodsearch("")
            setabyss(false)
            setabysssearch("")
            setultima(false)
            setultimasearch("")
            setsixman(false)
            setsixmansearch("")
            setspiritus(false)
            setspiritussearch("")
            setsingle(false)
            setsinglesearch("")
            setmemorial(false)
            setmemorialsearch("")
            setraid(false)
            setraidsearch("")
        }
    };
    const feodbutton = () => {
        if (feod == false) {
            if(banerDisplayTerm == "panels"){
                setbanerDisplayTerm("missions")
                setrawData([])
            }

            setdailies(false);
            setdailiessearch("")
            setplayer(false);
            setplayersearch("")
            setpanel(false);
            setpanelsearch("")
            setevent(false)
            seteventsearch("")

            setfeod(true)
            setfeodsearch("true")

            setabyss(false)
            setabysssearch("")
            setultima(false)
            setultimasearch("")
            setsixman(false)
            setsixmansearch("")
            setspiritus(false)
            setspiritussearch("")
            setsingle(false)
            setsinglesearch("")
            setmemorial(false)
            setmemorialsearch("")
            setraid(false)
            setraidsearch("")
        }
    };
    const abyssbutton = () => {
        if (abyss == false) {
            if(banerDisplayTerm == "panels"){
                setbanerDisplayTerm("missions")
                setrawData([])
            }

            setdailies(false);
            setdailiessearch("")
            setplayer(false);
            setplayersearch("")
            setpanel(false);
            setpanelsearch("")
            setevent(false)
            seteventsearch("")
            setfeod(false)
            setfeodsearch("")

            setabyss(true)
            setabysssearch("true")

            setultima(false)
            setultimasearch("")
            setsixman(false)
            setsixmansearch("")
            setspiritus(false)
            setspiritussearch("")
            setsingle(false)
            setsinglesearch("")
            setmemorial(false)
            setmemorialsearch("")
            setraid(false)
            setraidsearch("")
        }
    };
    const ultimabutton = () => {
        if (ultima == false) {
            if(banerDisplayTerm == "panels"){
                setbanerDisplayTerm("missions")
                setrawData([])
            }

            setdailies(false);
            setdailiessearch("")
            setplayer(false);
            setplayersearch("")
            setpanel(false);
            setpanelsearch("")
            setevent(false)
            seteventsearch("")
            setfeod(false)
            setfeodsearch("")
            setabyss(false)
            setabysssearch("")

            setultima(true)
            setultimasearch("true")

            setsixman(false)
            setsixmansearch("")
            setspiritus(false)
            setspiritussearch("")
            setsingle(false)
            setsinglesearch("")
            setmemorial(false)
            setmemorialsearch("")
            setraid(false)
            setraidsearch("")
        }
    };
    const sixmanbutton = () => {
        if (sixman == false) {
            if(banerDisplayTerm == "panels"){
                setbanerDisplayTerm("missions")
                setrawData([])
            }

            setdailies(false);
            setdailiessearch("")
            setplayer(false);
            setplayersearch("")
            setpanel(false);
            setpanelsearch("")
            setevent(false)
            seteventsearch("")
            setfeod(false)
            setfeodsearch("")
            setabyss(false)
            setabysssearch("")
            setultima(false)
            setultimasearch("")

            setsixman(true)
            setsixmansearch("true")

            setspiritus(false)
            setspiritussearch("")
            setsingle(false)
            setsinglesearch("")
            setmemorial(false)
            setmemorialsearch("")
            setraid(false)
            setraidsearch("")
        }
    };
    const spiritusbutton = () => {
        if (spiritus == false) {
            if(banerDisplayTerm == "panels"){
                setbanerDisplayTerm("missions")
                setrawData([])
            }

            setdailies(false);
            setdailiessearch("")
            setplayer(false);
            setplayersearch("")
            setpanel(false);
            setpanelsearch("")
            setevent(false)
            seteventsearch("")
            setfeod(false)
            setfeodsearch("")
            setabyss(false)
            setabysssearch("")
            setultima(false)
            setultimasearch("")
            setsixman(false)
            setsixmansearch("")

            setspiritus(true)
            setspiritussearch("true")

            setsingle(false)
            setsinglesearch("")
            setmemorial(false)
            setmemorialsearch("")
            setraid(false)
            setraidsearch("")
        }
    };
    const singlebutton = () => {
        if (single == false) {
            if(banerDisplayTerm == "panels"){
                setbanerDisplayTerm("missions")
                setrawData([])
            }

            setdailies(false);
            setdailiessearch("")
            setplayer(false);
            setplayersearch("")
            setpanel(false);
            setpanelsearch("")
            setevent(false)
            seteventsearch("")
            setfeod(false)
            setfeodsearch("")
            setabyss(false)
            setabysssearch("")
            setultima(false)
            setultimasearch("")
            setsixman(false)
            setsixmansearch("")
            setspiritus(false)
            setspiritussearch("")
            
            setsingle(true)
            setsinglesearch("true")

            setmemorial(false)
            setmemorialsearch("")
            setraid(false)
            setraidsearch("")
        }
    };
    const memorialbutton = () => {
        if (memorial == false) {
            if(banerDisplayTerm == "panels"){
                setbanerDisplayTerm("missions")
                setrawData([])
            }

            setdailies(false);
            setdailiessearch("")
            setplayer(false);
            setplayersearch("")
            setpanel(false);
            setpanelsearch("")
            setevent(false)
            seteventsearch("")
            setfeod(false)
            setfeodsearch("")
            setabyss(false)
            setabysssearch("")
            setultima(false)
            setultimasearch("")
            setsixman(false)
            setsixmansearch("")
            setspiritus(false)
            setspiritussearch("")
            setsingle(false)
            setsinglesearch("")

            setmemorial(true)
            setmemorialsearch("true")

            setraid(false)
            setraidsearch("")
        }
    };

    const raidbutton = () => {
        if (raid == false) {
            if(banerDisplayTerm == "panels"){
                setbanerDisplayTerm("missions")
                setrawData([])
            }

            setdailies(false);
            setdailiessearch("")
            setplayer(false);
            setplayersearch("")
            setpanel(false);
            setpanelsearch("")
            setevent(false)
            seteventsearch("")
            setfeod(false)
            setfeodsearch("")
            setabyss(false)
            setabysssearch("")
            setultima(false)
            setultimasearch("")
            setsixman(false)
            setsixmansearch("")
            setspiritus(false)
            setspiritussearch("")
            setsingle(false)
            setsinglesearch("")
            setmemorial(false)
            setmemorialsearch("")

            setraid(true)
            setraidsearch("true")
        }
    };

    const setver_JP = ()=>{
        if(JP == false){
            dispatch(setTrue())
            setJPSearch("true")
            setListDisplay([])
            setrawData([])
        }
    }

    const setver_GL = ()=>{
        if(JP == true){
            dispatch(setFalse())
            setJPSearch("")
            setListDisplay([])
            setrawData([])
        }
    }

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

    //unique
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    //search bar
    const handleChange = (e) => {
        setsearchdisplay(e.target.value);
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
        setclearFilter(true)
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

    const itemSelect = (e) => {
        if (e !== null) {
          setTypesearch(e.name)
          setCondFilter(e);
        } else {
          setCondFilter("");
          setTypesearch("")
        }
      };

    const mission_data = listDisplay;

    return (
        <div className="">
            <Helmet>
                <title>Missions Search - Dissidia Compendium</title>
                <meta property="og:site_name" content="Dissidia Compendium" />
                <meta name="description" content="Search every mission in the game!" />
                <meta name="twitter:title" content="Mission Search - Dissidia Compendium" />
                <meta property="og:type" content="website" />
                <meta name="twitter:description" content="Search every mission in the game!" />
                <meta property="og:title" content="Mission Search - Dissidia Compendium" />
                <meta property="og:description" content="Search every mission in the game!" />
                <meta property="og:url" content="https://dissidiacompendium.com/missions" />
            </Helmet>
            <div className="content">
                <h1>{JP == false ? "GL " : "JP "}Events</h1>
                <div className="subheader">Use filters to limit returns</div>
                <div className="charfilterspacer" />
                <div key="filter1" onClick={showfilterbutton} className="charfilter"><span className="filterstext"></span>{showFilter ? <TiArrowSortedUp className="uparrow" /> : <TiArrowSortedDown className="downarrow" />}</div>
                {showFilter == false ?
                    <div className="event-search-reverse-holder">
                        <span className={`${JP == true ? "jponlybackground" : "GLonlybackground"}`}>
                            <Tippy content={`${JP == true ? "Switch to GL" : "Switch to JP"}`} className="tooltip" >
                                <span onClick={JP == true ? setver_GL : setver_JP} className={`${JP == true  ? "jpflage jpsmallinactive smalleventbutton" : "glflage smalleventbutton"}`} />
                            </Tippy>
                        </span>
                        <IoSearch className="searchicon" />
                        <div className="search-holder">
                            <input
                                className="char-search-bar"
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
                    </div>
                : 
    
                    <div className="filterholder noselect">
                        <div className="similarbanner">{`${JP == true?"JP":"GL"} Version`}</div>
                        <div className="filterholderflair">
                            <ul className="eventtypes">
                                <Tippy content="Panels" className="tooltip" >
                                    <li alt="Panels" onClick={panelbutton} className={`${panel ? "filteractive" : "filterinactive"} PanelMission eventbutton`} ></li>
                                </Tippy>
                                <Tippy content="Player" className="tooltip">
                                    <li alt="Player" onClick={playerbutton} className={`${player ? "filteractive" : "filterinactive"} PlayerMission eventbutton`} ></li>
                                </Tippy>
                                <Tippy content="Events" className="tooltip" >
                                    <li alt="Events" onClick={eventsbutton} className={`${event ? "filteractive" : "filterinactive"} Events eventbutton`} ></li>
                                </Tippy>
                                <Tippy content="Dimensions End Missions" className="tooltip" >
                                    <li alt="Dimensions End" onClick={feodbutton} className={`${feod ? "filteractive" : "filterinactive"} DimensionsEnd eventbutton`} ></li>
                                </Tippy>
                                <Tippy content="Abyss Missions" className="tooltip" >
                                    <li alt="Abyss" onClick={abyssbutton} className={`${abyss ? "filteractive" : "filterinactive"} AbyssButton eventbutton`} ></li>
                                </Tippy>                                
                                <Tippy content="Six-Warrior Missions" className="tooltip" >
                                    <li alt="Six-Warrior Quests" onClick={sixmanbutton} className={`${sixman ? "filteractive" : "filterinactive"} SixMan eventbutton`} ></li>
                                </Tippy>
                                <Tippy content="Spiritus Missions" className="tooltip" >
                                    <li alt="Spiritus" onClick={spiritusbutton} className={`${spiritus ? "filteractive" : "filterinactive"} WorldofIllusions eventbutton`} ></li>
                                </Tippy>                                
                                <Tippy content="Single Missions" className="tooltip" >
                                    <li alt="Single Missions" onClick={singlebutton} className={`${single ? "filteractive" : "filterinactive"} SingleMission eventbutton`} ></li>
                                </Tippy>
                                <Tippy content="Memorial Missions" className="tooltip" >
                                    <li alt="Memorial Quests" onClick={memorialbutton} className={`${memorial ? "filteractive" : "filterinactive"} Memorial eventbutton`} ></li>
                                </Tippy>
                                <Tippy content="Ultima Missions" className="tooltip">
                                    <li alt="Ultima" onClick={ultimabutton} className={`${ultima ? "filteractive" : "filterinactive"} UltimaMission eventbutton`} ></li>
                                </Tippy>
                                <Tippy content="Raid Missions" className="tooltip">
                                    <li alt="Raid" onClick={raidbutton} className={`${raid ? "filteractive" : "filterinactive"} RaidButton eventbutton`} ></li>
                                </Tippy>
                            </ul>
                            <ul className="bufftypes">
                                <Tippy content="JP Missions">
                                    <li onClick={setver_JP} className={`${JP == true ? "filteractive" : "filterinactive"} buffbutton ver_jp`}/>
                                </Tippy>
                                <Tippy content="GL Missions">
                                    <li onClick={setver_GL} className={`${JP == false ? "filteractive" : "filterinactive"} buffbutton ver_gl`}/>
                                </Tippy>
                            </ul>
                            <div className="typeholder">
                                <Select
                                    defaultValue={Typesearch != "" ? { value: Typesearch, label: Typesearch } : null}
                                    key={Typesearch}
                                    isSearchable={true}
                                    placeholder="Reward Select..."
                                    className='typecontainer'
                                    classNamePrefix="typetext"
                                    onChange={itemSelect}
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
                        <span className='subtext'>*Reward filter only available on missions</span>
                    </div>
                }
                <ul className="bannertabs">
                    <Link to={"../events"}>
                        <li className={""} >Events</li>
                    </Link>
                    <Link to={"../events/banners"}>
                        <li className={""} >Banners</li>
                    </Link>
                    <Link to={"../events/missions?panels=true"}>
                        <li className={"active"} ><span className="gemselected" />Missions</li>
                    </Link>
                    <Link to={"../events/notices"}>
                        <li className={""} >Notices</li>
                    </Link>
                    <Link to={"../events/forecast"}>
                        <li className={""} >Forecast</li>
                    </Link>
                    <Link to={"/events/calendar"}>
                        <li className={""} >Calendar</li>
                    </Link>
                </ul>
                <div className="buffsholder">
                    <div className="subtexttop">
                        {displayBanner}
                    </div>
                    {mission_data && mission_data.length != 0 ?
                    mission_data.map((self, i)=>{
                        return(
                            banerDisplayTerm == "panels"?
                            <PanelFormatting
                            key={`${i}-${banerDisplayTerm}-${JP==true?"JP":"GL"}`}
                            panel={self}
                            ver={JP==true?"JP":"GL"}
                            />
                            :
                            <MissionFormatting
                            key={`${i}-${banerDisplayTerm}-${JP==true?"JP":"GL"}`}
                            mission={self}
                            solo={true}
                            ver={JP==true?"JP":"GL"}
                            />
                        )
                    })
                    :
                    <div>No results</div>
                    }
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