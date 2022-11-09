import React, {useState, useEffect} from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import Tippy from './formatting/TippyDefaults'
import { useDispatch, useSelector } from "react-redux";
import { slice, concat, } from 'lodash';
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
import { getQuery, getQueryStringVal, useQueryParam } from './processing/urlparams'
import Ailment_Data_Formatting_bycharacter from './characterpages/direct/formatting/Ailment_Data_Formating_bycharacter';
import ailment_tags from './characterpages/direct/formatting/command_ability/ailment_tags.json'

import { setFalse, setTrue } from './redux/ducks/jptoggle'

const BuffsDirect =({
    ver,
    loc,
    file,
    match,

    ProcessedBuffs,

    enemy_type,
    cast_targets,
    char_id,
    passivenames,
    equipmentpassivenames,
    AilmentNames,
    CommandNames,
    CondData,
    Ailment_Effects,
    MessageData_Category,
    MessageData_FFSeries,
    hit_data_effects,
    command_data_effects,
    option_trans_data,
    enemy_names,
    passive_effects_data,
    Access,

    ailment_group,
    command_group,
    enemy_resist,
})=>{

    const startinglimit = window.innerWidth <= 815 ? 30 : 50;

    const rawData = ProcessedBuffs;

    const banerDisplayTerm = "casts";

    const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null  ? true : false);
    const [clearFilter, setclearFilter] = useStateIfMounted(false);

    const [aBuff, setABuff] = useState(getQueryStringVal("aa") != null  ? true : false);
    const [burstBuff, setBurstBuff] = useState(getQueryStringVal("burst") != null  ? true : false);
    const [calls, setCalls] = useState(getQueryStringVal("call") != null  ? true : false);
    const [starting, setStarting] = useState(getQueryStringVal("s1") != null  ? true : false);
    const [s20, setS20] = useState(getQueryStringVal("s2") != null  ? true : false);
    const [ld, setLD] = useState(getQueryStringVal("ld") != null  ? true : false);
    const [fr, setFR] = useState(getQueryStringVal("fr") != null  ? true : false);
    const [ex, setEX] = useState(getQueryStringVal("ex") != null  ? true : false);
    const [bstate, setbstate] = useState(getQueryStringVal("state") != null  ? true : false);
    const [start, setstart] = useState(getQueryStringVal("start") != null  ? true : false);
    const [buffs, setBuffs] = useState(getQueryStringVal("buffs") != null  ? true : false);
    const [debuffs, setDebuffs] = useState(getQueryStringVal("debuffs") != null  ? true : false);
    const [party, setparty] = useState(getQueryStringVal("party") != null  ? true : false);

    const [Break, setBreak] = useState(getQueryStringVal("Break")  != null ? true : false);
    const [BreakCancel, setBreakCancel] = useState(getQueryStringVal("BreakCancel")  != null ? true : false);
    const [BreakPrevent, setBreakPrevent] = useState(getQueryStringVal("BreakPrevent")  != null ? true : false);
    const [BRVCap, setBRVCap] = useState(getQueryStringVal("BRVCap")  != null ? true : false);
    const [BRVFreeze, setBRVFreeze] = useState(getQueryStringVal("BRVFreeze")  != null ? true : false);
    const [Gains, setGains] = useState(getQueryStringVal("Gains")  != null ? true : false);
    const [Refund, setRefund] = useState(getQueryStringVal("Refund")  != null ? true : false);
    const [BRVRegen, setBRVRegen] = useState(getQueryStringVal("BRVRegen")  != null ? true : false);
    const [BRVRetain, setBRVRetain] = useState(getQueryStringVal("BRVRetain")  != null ? true : false);
    const [StolenBRV, setStolenBRV] = useState(getQueryStringVal("StolenBRV")  != null ? true : false);
    const [BuffPrevent, setBuffPrevent] = useState(getQueryStringVal("BuffPrevent")  != null ? true : false);
    const [CappedBRV, setCappedBRV] = useState(getQueryStringVal("CappedBRV")  != null ? true : false);
    const [Cleanse, setCleanse] = useState(getQueryStringVal("Cleanse")  != null ? true : false);
    const [Cover, setCover] = useState(getQueryStringVal("Cover")  != null ? true : false);
    const [CriticalUp, setCriticalUp] = useState(getQueryStringVal("CriticalUp")  != null ? true : false);
    const [CriticalRate, setCriticalRate] = useState(getQueryStringVal("CriticalRate")  != null ? true : false);
    const [DebuffResist, setDebuffResist] = useState(getQueryStringVal("DebuffResist")  != null ? true : false);
    const [IgnoreDEF, setIgnoreDEF] = useState(getQueryStringVal("IgnoreDEF")  != null ? true : false);
    const [Delay, setDelay] = useState(getQueryStringVal("Delay")  != null ? true : false);
    const [Delete, setDelete] = useState(getQueryStringVal("Delete")  != null ? true : false);
    const [Dispel, setDispel] = useState(getQueryStringVal("Dispel")  != null ? true : false);
    const [ElementalWeak, setElementalWeak] = useState(getQueryStringVal("ElementalWeak")  != null ? true : false);
    const [Fire, setFire] = useState(getQueryStringVal("Fire")  != null ? true : false);
    const [Ice, setIce] = useState(getQueryStringVal("Ice")  != null ? true : false);
    const [Thunder, setThunder] = useState(getQueryStringVal("Thunder")  != null ? true : false);
    const [Wind, setWind] = useState(getQueryStringVal("Wind")  != null ? true : false);
    const [Water, setWater] = useState(getQueryStringVal("Water")  != null ? true : false);
    const [Earth, setEarth] = useState(getQueryStringVal("Earth")  != null ? true : false);
    const [Holy, setHoly] = useState(getQueryStringVal("Holy")  != null ? true : false);
    const [Dark, setDark] = useState(getQueryStringVal("Dark")  != null ? true : false);
    const [Evade, setEvade] = useState(getQueryStringVal("Evade")  != null ? true : false);
    const [EXFill, setEXFill] = useState(getQueryStringVal("EXFill")  != null ? true : false);
    const [EXRate, setEXRate] = useState(getQueryStringVal("EXRate")  != null ? true : false);
    const [FreeUse, setFreeUse] = useState(getQueryStringVal("FreeUse")  != null ? true : false);
    const [FreeTurn, setFreeTurn] = useState(getQueryStringVal("FreeTurn")  != null ? true : false);
    const [GoldDebuff, setGoldDebuff] = useState(getQueryStringVal("GoldDebuff")  != null ? true : false);
    const [AddHP, setAddHP] = useState(getQueryStringVal("AddHP")  != null ? true : false);
    const [MAXBRVCap, setMAXBRVCap] = useState(getQueryStringVal("MAXBRVCap")  != null ? true : false);
    const [HPResistUp, setHPResistUp] = useState(getQueryStringVal("HPResistUp")  != null ? true : false);
    const [HPResistDown, setHPResistDown] = useState(getQueryStringVal("HPResistDown")  != null ? true : false);
    const [BRVPoison, setBRVPoison] = useState(getQueryStringVal("BRVPoison")  != null ? true : false);
    const [HPPoison, setHPPoison] = useState(getQueryStringVal("HPPoison")  != null ? true : false);
    const [HPHeal, setHPHeal] = useState(getQueryStringVal("HPHeal")  != null ? true : false);
    const [HPRegen, setHPRegen] = useState(getQueryStringVal("HPRegen")  != null ? true : false);
    const [Disable, setDisable] = useState(getQueryStringVal("Disable")  != null ? true : false);
    const [FireDown, setFireDown] = useState(getQueryStringVal("FireDown")  != null ? true : false);
    const [IceDown, setIceDown] = useState(getQueryStringVal("IceDown")  != null ? true : false);
    const [ThunderDown, setThunderDown] = useState(getQueryStringVal("ThunderDown")  != null ? true : false);
    const [WindDown, setWindDown] = useState(getQueryStringVal("WindDown")  != null ? true : false);
    const [WaterDown, setWaterDown] = useState(getQueryStringVal("WaterDown")  != null ? true : false);
    const [EarthDown, setEarthDown] = useState(getQueryStringVal("EarthDown")  != null ? true : false);
    const [HolyDown, setHolyDown] = useState(getQueryStringVal("HolyDown")  != null ? true : false);
    const [DarkDown, setDarkDown] = useState(getQueryStringVal("DarkDown")  != null ? true : false);
    const [MeleeDown, setMeleeDown] = useState(getQueryStringVal("MeleeDown")  != null ? true : false);
    const [RangedDown, setRangedDown] = useState(getQueryStringVal("RangedDown")  != null ? true : false);
    const [MagicDown, setMagicDown] = useState(getQueryStringVal("MagicDown")  != null ? true : false);
    const [Instant, setInstant] = useState(getQueryStringVal("Instant")  != null ? true : false);
    const [LastStand, setLastStand] = useState(getQueryStringVal("LastStand")  != null ? true : false);
    const [TurnManip, setTurnManip] = useState(getQueryStringVal("TurnManip")  != null ? true : false);

    const [loop, setLoop] = useStateIfMounted(false);
    const [reverse, setReverse] = useState(getQueryStringVal("rev") != null  ? true : false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchdisplay, setsearchdisplay] = useState("");
    const [merge, setMerge] = useState(getQueryStringVal("merge") != null  ? true : false);
    const [condFilter, setCondFilter] = useState("");
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

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
        }

    const [aBuffsearch, setABuffsearch] = useQueryParam("aa", "");
    const [burstBuffsearch, setBurstBuffsearch] = useQueryParam("burst", "");
    const [callssearch, setCallssearch] = useQueryParam("call", "");
    const [startingsearch, setStartingsearch] = useQueryParam("s1", "");
    const [s20search, setS20search] = useQueryParam("s2", "");
    const [ldsearch, setLDsearch] = useQueryParam("ld", "");
    const [frsearch, setFRsearch] = useQueryParam("fr", "");
    const [exsearch, setEXsearch] = useQueryParam("ex", "");
    const [bstatesearch, setbstatesearch] = useQueryParam("state", "");
    const [startsearch, setstartsearch] = useQueryParam("start", "");
    const [buffssearch, setBuffssearch] = useQueryParam("buffs", "");
    const [debuffssearch, setDebuffssearch] = useQueryParam("debuffs", "");
    const [partysearch, setpartysearch] = useQueryParam("party", "");

    const [Breaksearch, setBreaksearch] = useQueryParam("Break","")
    const [BreakCancelsearch, setBreakCancelsearch] = useQueryParam("BreakCancel","")
    const [BreakPreventsearch, setBreakPreventsearch] = useQueryParam("BreakPrevent","")
    const [BRVCapsearch, setBRVCapsearch] = useQueryParam("BRVCap","")
    const [BRVFreezesearch, setBRVFreezesearch] = useQueryParam("BRVFreeze","")
    const [Gainssearch, setGainssearch] = useQueryParam("Gains","")
    const [Refundsearch, setRefundsearch] = useQueryParam("Refund","")
    const [BRVRegensearch, setBRVRegensearch] = useQueryParam("BRVRegen","")
    const [BRVRetainsearch, setBRVRetainsearch] = useQueryParam("BRVRetain","")
    const [StolenBRVsearch, setStolenBRVsearch] = useQueryParam("StolenBRV","")
    const [BuffPreventsearch, setBuffPreventsearch] = useQueryParam("BuffPrevent","")
    const [CappedBRVsearch, setCappedBRVsearch] = useQueryParam("CappedBRV","")
    const [Cleansesearch, setCleansesearch] = useQueryParam("Cleanse","")
    const [Coversearch, setCoversearch] = useQueryParam("Cover","")
    const [CriticalUpsearch, setCriticalUpsearch] = useQueryParam("CriticalUp","")
    const [CriticalRatesearch, setCriticalRatesearch] = useQueryParam("CriticalRate","")
    const [DebuffResistsearch, setDebuffResistsearch] = useQueryParam("DebuffResist","")
    const [IgnoreDEFsearch, setIgnoreDEFsearch] = useQueryParam("IgnoreDEF","")
    const [Delaysearch, setDelaysearch] = useQueryParam("Delay","")
    const [Deletesearch, setDeletesearch] = useQueryParam("Delete","")
    const [Dispelsearch, setDispelsearch] = useQueryParam("Dispel","")
    const [ElementalWeaksearch, setElementalWeaksearch] = useQueryParam("ElementalWeak","")
    const [Firesearch, setFiresearch] = useQueryParam("Fire","")
    const [Icesearch, setIcesearch] = useQueryParam("Ice","")
    const [Thundersearch, setThundersearch] = useQueryParam("Thunder","")
    const [Windsearch, setWindsearch] = useQueryParam("Wind","")
    const [Watersearch, setWatersearch] = useQueryParam("Water","")
    const [Earthsearch, setEarthsearch] = useQueryParam("Earth","")
    const [Holysearch, setHolysearch] = useQueryParam("Holy","")
    const [Darksearch, setDarksearch] = useQueryParam("Dark","")
    const [Evadesearch, setEvadesearch] = useQueryParam("Evade","")
    const [EXFillsearch, setEXFillsearch] = useQueryParam("EXFill","")
    const [EXRatesearch, setEXRatesearch] = useQueryParam("EXRate","")
    const [FreeUsesearch, setFreeUsesearch] = useQueryParam("FreeUse","")
    const [FreeTurnsearch, setFreeTurnsearch] = useQueryParam("FreeTurn","")
    const [GoldDebuffsearch, setGoldDebuffsearch] = useQueryParam("GoldDebuff","")
    const [AddHPsearch, setAddHPsearch] = useQueryParam("AddHP","")
    const [MAXBRVCapsearch, setMAXBRVCapsearch] = useQueryParam("MAXBRVCap","")
    const [HPResistUpsearch, setHPResistUpsearch] = useQueryParam("HPResistUp","")
    const [HPResistDownsearch, setHPResistDownsearch] = useQueryParam("HPResistDown","")
    const [BRVPoisonsearch, setBRVPoisonsearch] = useQueryParam("BRVPoison","")
    const [HPPoisonsearch, setHPPoisonsearch] = useQueryParam("HPPoison","")
    const [HPHealsearch, setHPHealsearch] = useQueryParam("HPHeal","")
    const [HPRegensearch, setHPRegensearch] = useQueryParam("HPRegen","")
    const [Disablesearch, setDisablesearch] = useQueryParam("Disable","")
    const [FireDownsearch, setFireDownsearch] = useQueryParam("FireDown","")
    const [IceDownsearch, setIceDownsearch] = useQueryParam("IceDown","")
    const [ThunderDownsearch, setThunderDownsearch] = useQueryParam("ThunderDown","")
    const [WindDownsearch, setWindDownsearch] = useQueryParam("WindDown","")
    const [WaterDownsearch, setWaterDownsearch] = useQueryParam("WaterDown","")
    const [EarthDownsearch, setEarthDownsearch] = useQueryParam("EarthDown","")
    const [HolyDownsearch, setHolyDownsearch] = useQueryParam("HolyDown","")
    const [DarkDownsearch, setDarkDownsearch] = useQueryParam("DarkDown","")
    const [MeleeDownsearch, setMeleeDownsearch] = useQueryParam("MeleeDown","")
    const [RangedDownsearch, setRangedDownsearch] = useQueryParam("RangedDown","")
    const [MagicDownsearch, setMagicDownsearch] = useQueryParam("MagicDown","")
    const [Instantsearch, setInstantsearch] = useQueryParam("Instant","")
    const [LastStandsearch, setLastStandsearch] = useQueryParam("LastStand","")
    const [TurnManipsearch, setTurnManipsearch] = useQueryParam("TurnManip","")
    const [mergesearch, setMergesearch] = useQueryParam("merge", "");

    const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
    const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
    const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");
    const [Typesearch, setTypesearch] = useQueryParam("Char", "");
    const { protocol, pathname, host } = window.location;
    const query = getQuery();
    const url = `${protocol}//${host}${pathname}?${query.toString()}`

    useEffect(() => {
        //type params
        if(Typesearch != null){
         const ID_PULL = Object.values(char_id).filter(self=>self.name == getQueryStringVal("Char"))
         const match_id = ID_PULL[0] && ID_PULL[0].id
         const filteredtype = ProcessedBuffs.filter(self=>self.chara_id == match_id)
         if(filteredtype.length != 0){
           setTypesearch(getQueryStringVal("Char"))
           setCondFilter(filteredtype[0].chara_id)
         } else{
           setTypesearch("")
           setCondFilter("")
         }
       }
     },[setCondFilter,ProcessedBuffs,Typesearch,setTypesearch,char_id])

    useEffect(() => {
        //search params
        if(getQueryStringVal("search") != null){
          setSearchTerm(getQueryStringVal("search") != null  ? getQueryStringVal("search").toLowerCase() : "")
          setTEXTsearch(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
          setsearchdisplay(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
        }
    }, [setTEXTsearch,setFiltersearch])

    //filter non-merge
    useEffect(() => {
        if(merge == false){
        var filterholder = [];

        if(buffs == true){
            const filteredout = rawData.filter(
                (ef) =>ef.is_buff == 1
            );
            filterholder.push(...filteredout);
        }
        if(debuffs == true){
            const filteredout = rawData.filter(
                (ef) =>ef.is_buff == 0
            );
            filterholder.push(...filteredout);
        }
        if(bstate == true){
            const filteredout = rawData.filter(
                (ef) =>ef.state == true
            );
            filterholder.push(...filteredout);
        }
        if(start == true){
            const filteredout = rawData.filter(
                (ef) =>ef.start == true
            );
            filterholder.push(...filteredout);
        }
        if(calls == true){
            const filteredout = rawData.filter(
                (ef) =>ef.Call == true
            );
            filterholder.push(...filteredout);
        }
        if(aBuff == true){
            const filteredout = rawData.filter(
                (ef) =>ef.AA == true
            );
            filterholder.push(...filteredout);
        }
        if(starting == true){
            const filteredout = rawData.filter(
                (ef) =>ef.S1 == true
            );
            filterholder.push(...filteredout);
        }
        if(s20 == true){
            const filteredout = rawData.filter(
                (ef) =>ef.S2 == true
            );
            filterholder.push(...filteredout);
        }
        if(ex == true){
            const filteredout = rawData.filter(
                (ef) =>ef.EX == true
            );
            filterholder.push(...filteredout);
        }
        if(ld == true){
            const filteredout = rawData.filter(
                (ef) =>ef.LD == true
            );
            filterholder.push(...filteredout);
        }
        if(fr == true){
            const filteredout = rawData.filter(
                (ef) =>ef.FR == true
            );
            filterholder.push(...filteredout);
        }
        if(burstBuff == true){
            const filteredout = rawData.filter(
                (ef) =>ef.BT == true
            );
            filterholder.push(...filteredout);
        }

        //advanced
        if(Break == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.Break == true
            );
            filterholder.push(...filteredout)
        }
        if(BreakCancel == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.BreakCancel == true
            );
            filterholder.push(...filteredout)
        }
        if(BreakPrevent == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.BreakPrevent == true
            );
            filterholder.push(...filteredout)
        }
        if(BRVCap == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.BRVCap == true
            );
            filterholder.push(...filteredout)
        }
        if(BRVFreeze == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.BRVFreeze == true
            );
            filterholder.push(...filteredout)
        }
        if(Gains == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.Gains == true
            );
            filterholder.push(...filteredout)
        }
        if(Refund == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.Refund == true
            );
            filterholder.push(...filteredout)
        }
        if(BRVRegen == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.BRVRegen == true
            );
            filterholder.push(...filteredout)
        }
        if(BRVRetain == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.BRVRetain == true
            );
            filterholder.push(...filteredout)
        }
        if(StolenBRV == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.StolenBRV == true
            );
            filterholder.push(...filteredout)
        }
        if(BuffPrevent == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.BuffPrevent == true
            );
            filterholder.push(...filteredout)
        }
        if(CappedBRV == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.CappedBRV == true
            );
            filterholder.push(...filteredout)
        }
        if(Cleanse == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.Cleanse == true
            );
            filterholder.push(...filteredout)
        }
        if(Cover == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.Cover == true
            );
            filterholder.push(...filteredout)
        }
        if(CriticalUp == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.CriticalUp == true
            );
            filterholder.push(...filteredout)
        }
        if(CriticalRate == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.CriticalRate == true
            );
            filterholder.push(...filteredout)
        }
        if(DebuffResist == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.DebuffResist == true
            );
            filterholder.push(...filteredout)
        }
        if(IgnoreDEF == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.IgnoreDEF == true
            );
            filterholder.push(...filteredout)
        }
        if(Delay == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.Delay == true
            );
            filterholder.push(...filteredout)
        }
        if(Delete == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.Delete == true
            );
            filterholder.push(...filteredout)
        }
        if(Dispel == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.Dispel == true
            );
            filterholder.push(...filteredout)
        }
        if(ElementalWeak == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.ElementalWeak == true
            );
            filterholder.push(...filteredout)
        }
        if(Fire == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.Fire == true
            );
            filterholder.push(...filteredout)
        }
        if(Ice == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.Ice == true
            );
            filterholder.push(...filteredout)
        }
        if(Thunder == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.Thunder == true
            );
            filterholder.push(...filteredout)
        }
        if(Wind == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.Wind == true
            );
            filterholder.push(...filteredout)
        }
        if(Water == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.Water == true
            );
            filterholder.push(...filteredout)
        }
        if(Earth == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.Earth == true
            );
            filterholder.push(...filteredout)
        }
        if(Holy == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.Holy == true
            );
            filterholder.push(...filteredout)
        }
        if(Dark == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.Dark == true
            );
            filterholder.push(...filteredout)
        }
        if(Evade == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.Evade == true
            );
            filterholder.push(...filteredout)
        }
        if(EXFill == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.EXFill == true
            );
            filterholder.push(...filteredout)
        }
        if(EXRate == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.EXRate == true
            );
            filterholder.push(...filteredout)
        }
        if(FreeUse == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.FreeUse == true
            );
            filterholder.push(...filteredout)
        }
        if(FreeTurn == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.FreeTurn == true
            );
            filterholder.push(...filteredout)
        }
        if(GoldDebuff == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.GoldDebuff == true
            );
            filterholder.push(...filteredout)
        }
        if(AddHP == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.AddHP == true
            );
            filterholder.push(...filteredout)
        }
        if(MAXBRVCap == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.MAXBRVCap == true
            );
            filterholder.push(...filteredout)
        }
        if(HPResistUp == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.HPResistUp == true
            );
            filterholder.push(...filteredout)
        }
        if(HPResistDown == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.HPResistDown == true
            );
            filterholder.push(...filteredout)
        }
        if(BRVPoison == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.BRVPoison == true
            );
            filterholder.push(...filteredout)
        }
        if(HPPoison == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.HPPoison == true
            );
            filterholder.push(...filteredout)
        }
        if(HPHeal == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.HPHeal == true
            );
            filterholder.push(...filteredout)
        }
        if(HPRegen == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.HPRegen == true
            );
            filterholder.push(...filteredout)
        }
        if(Disable == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.Disable == true
            );
            filterholder.push(...filteredout)
        }
        if(FireDown == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.FireDown == true
            );
            filterholder.push(...filteredout)
        }
        if(IceDown == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.IceDown == true
            );
            filterholder.push(...filteredout)
        }
        if(ThunderDown == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.ThunderDown == true
            );
            filterholder.push(...filteredout)
        }
        if(WindDown == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.WindDown == true
            );
            filterholder.push(...filteredout)
        }
        if(WaterDown == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.WaterDown == true
            );
            filterholder.push(...filteredout)
        }
        if(EarthDown == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.EarthDown == true
            );
            filterholder.push(...filteredout)
        }
        if(HolyDown == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.HolyDown == true
            );
            filterholder.push(...filteredout)
        }
        if(DarkDown == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.DarkDown == true
            );
            filterholder.push(...filteredout)
        }
        if(MeleeDown == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.MeleeDown == true
            );
            filterholder.push(...filteredout)
        }
        if(RangedDown == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.RangedDown == true
            );
            filterholder.push(...filteredout)
        }
        if(MagicDown == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.MagicDown == true
            );
            filterholder.push(...filteredout)
        }
        if(Instant == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.Instant == true
            );
            filterholder.push(...filteredout)
        }
        if(LastStand == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.LastStand == true
            );
            filterholder.push(...filteredout)
        }
        if(TurnManip == true && party != true){
            const filteredout = rawData.filter(
                (ef)=> ef.TurnManip == true
            );
            filterholder.push(...filteredout)
        }

        //party
        if(Break == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.Break_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(BreakCancel == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.BreakCancel_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(BreakPrevent == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.BreakPrevent_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(BRVCap == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.BRVCap_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(BRVFreeze == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.BRVFreeze_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(Gains == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.Gains_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(Refund == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.Refund_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(BRVRegen == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.BRVRegen_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(BRVRetain == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.BRVRetain_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(StolenBRV == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.StolenBRV_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(BuffPrevent == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.BuffPrevent_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(CappedBRV == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.CappedBRV_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(Cleanse == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.Cleanse_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(Cover == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.Cover_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(CriticalUp == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.CriticalUp_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(CriticalRate == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.CriticalRate_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(DebuffResist == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.DebuffResist_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(IgnoreDEF == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.IgnoreDEF_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(Delay == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.Delay_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(Delete == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.Delete_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(Dispel == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.Dispel_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(ElementalWeak == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.ElementalWeak_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(Fire == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.Fire_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(Ice == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.Ice_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(Thunder == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.Thunder_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(Wind == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.Wind_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(Water == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.Water_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(Earth == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.Earth_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(Holy == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.Holy_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(Dark == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.Dark_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(Evade == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.Evade_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(EXFill == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.EXFill_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(EXRate == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.EXRate_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(FreeUse == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.FreeUse_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(FreeTurn == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.FreeTurn_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(GoldDebuff == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.GoldDebuff_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(AddHP == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.AddHP_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(MAXBRVCap == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.MAXBRVCap_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(HPResistUp == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.HPResistUp_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(HPResistDown == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.HPResistDown_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(BRVPoison == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.BRVPoison_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(HPPoison == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.HPPoison_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(HPHeal == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.HPHeal_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(HPRegen == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.HPRegen_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(Disable == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.Disable_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(FireDown == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.FireDown_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(IceDown == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.IceDown_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(ThunderDown == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.ThunderDown_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(WindDown == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.WindDown_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(WaterDown == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.WaterDown_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(EarthDown == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.EarthDown_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(HolyDown == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.HolyDown_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(DarkDown == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.DarkDown_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(MeleeDown == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.MeleeDown_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(RangedDown == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.RangedDown_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(MagicDown == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.MagicDown_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(Instant == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.Instant_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(LastStand == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.LastStand_Party == true
            );
            filterholder.push(...filteredout)
        }
        if(TurnManip == true && party == true){
            const filteredout = rawData.filter(
                (ef)=> ef.TurnManip_Party == true
            );
            filterholder.push(...filteredout)
        }

        if (filterholder.length === 0) {
            filterholder.push(...rawData);
        }

        if(condFilter != ""){
            filterholder = filterholder.filter(
                (ef)=> ef.chara_id == condFilter
            );
        }

        const makeUnique = filterholder
            .filter(onlyUnique)
            .sort((a, b) => 
            reverse === false ?
            a.order - b.order:
            b.order - a.order
            );
            const searchit = searchTerm == "" ? makeUnique : makeUnique.filter((buff) =>
            (`${buff && buff.name} ${buff && buff.jpname} ${buff && buff.ability_name} ${buff && buff.ability_namegl} - #${buff.id}`).toLowerCase().includes(searchTerm)
            );
            setFilterResults(makeUnique);
            setSearchResults(searchit);
            const newlistdisplay = slice(searchit, 0, limits);
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
        }
    },[merge,rawData,limits,searchTerm,reverse,condFilter,party,start,aBuff,bstate,buffs,burstBuff,calls,debuffs,ex,fr,ld,s20,starting,Break,BreakCancel,BreakPrevent,BRVCap,BRVFreeze,Gains,Refund,BRVRegen,BRVRetain,StolenBRV,BuffPrevent,CappedBRV,Cleanse,Cover,CriticalUp,CriticalRate,DebuffResist,IgnoreDEF,Delay,Delete,Dispel,ElementalWeak,Fire,Ice,Thunder,Wind,Water,Earth,Holy,Dark,Evade,EXFill,EXRate,FreeUse,FreeTurn,GoldDebuff,AddHP,MAXBRVCap,HPResistUp,HPResistDown,BRVPoison,HPPoison,HPHeal,HPRegen,Disable,FireDown,IceDown,ThunderDown,WindDown,WaterDown,EarthDown,HolyDown,DarkDown,MeleeDown,RangedDown,MagicDown,Instant,LastStand,TurnManip])

    //filter merge
    useEffect(() => {
        if(merge == true){
            const filterholder = [];
            var buff_debuff = undefined
            if(buffs == true){
                buff_debuff = 1
            }
            if(debuffs == true){
                buff_debuff = "0" 
            }
            var charType = {}
            if(party == false){
                charType = {
                    chara_id: condFilter != "" ? condFilter: undefined,
                    AA: aBuff != true ? undefined : aBuff,
                    state: bstate != true ? undefined : bstate,
                    start: start != true ? undefined : start,
                    BT: burstBuff != true ? undefined : burstBuff,
                    Call: calls != true ? undefined : calls,
                    is_buff: buff_debuff,
                    EX: ex != true ? undefined : ex,
                    FR: fr != true ? undefined : fr,
                    LF: ld != true ? undefined : ld,
                    S2: s20 != true ? undefined : s20,
                    S1: starting != true ? undefined : starting,
    
                    Break: Break != true ? undefined : Break,
                    BreakCancel: BreakCancel != true ? undefined : BreakCancel,
                    BreakPrevent: BreakPrevent != true ? undefined : BreakPrevent,
                    BRVCap: BRVCap != true ? undefined : BRVCap,
                    BRVFreeze: BRVFreeze != true ? undefined : BRVFreeze,
                    Gains: Gains != true ? undefined : Gains,
                    Refund: Refund != true ? undefined : Refund,
                    BRVRegen: BRVRegen != true ? undefined : BRVRegen,
                    BRVRetain: BRVRetain != true ? undefined : BRVRetain,
                    StolenBRV: StolenBRV != true ? undefined : StolenBRV,
                    BuffPrevent: BuffPrevent != true ? undefined : BuffPrevent,
                    CappedBRV: CappedBRV != true ? undefined : CappedBRV,
                    Cleanse: Cleanse != true ? undefined : Cleanse,
                    Cover: Cover != true ? undefined : Cover,
                    CriticalUp: CriticalUp != true ? undefined : CriticalUp,
                    CriticalRate: CriticalRate != true ? undefined : CriticalRate,
                    DebuffResist: DebuffResist != true ? undefined : DebuffResist,
                    IgnoreDEF: IgnoreDEF != true ? undefined : IgnoreDEF,
                    Delay: Delay != true ? undefined : Delay,
                    Delete: Delete != true ? undefined : Delete,
                    Dispel: Dispel != true ? undefined : Dispel,
                    ElementalWeak: ElementalWeak != true ? undefined : ElementalWeak,
                    Fire: Fire != true ? undefined : Fire,
                    Ice: Ice != true ? undefined : Ice,
                    Thunder: Thunder != true ? undefined : Thunder,
                    Wind: Wind != true ? undefined : Wind,
                    Water: Water != true ? undefined : Water,
                    Earth: Earth != true ? undefined : Earth,
                    Holy: Holy != true ? undefined : Holy,
                    Dark: Dark != true ? undefined : Dark,
                    Evade: Evade != true ? undefined : Evade,
                    EXFill: EXFill != true ? undefined : EXFill,
                    EXRate: EXRate != true ? undefined : EXRate,
                    FreeUse: FreeUse != true ? undefined : FreeUse,
                    FreeTurn: FreeTurn != true ? undefined : FreeTurn,
                    GoldDebuff: GoldDebuff != true ? undefined : GoldDebuff,
                    AddHP: AddHP != true ? undefined : AddHP,
                    MAXBRVCap: MAXBRVCap != true ? undefined : MAXBRVCap,
                    HPResistUp: HPResistUp != true ? undefined : HPResistUp,
                    HPResistDown: HPResistDown != true ? undefined : HPResistDown,
                    BRVPoison: BRVPoison != true ? undefined : BRVPoison,
                    HPPoison: HPPoison != true ? undefined : HPPoison,
                    HPHeal: HPHeal != true ? undefined : HPHeal,
                    HPRegen: HPRegen != true ? undefined : HPRegen,
                    Disable: Disable != true ? undefined : Disable,
                    FireDown: FireDown != true ? undefined : FireDown,
                    IceDown: IceDown != true ? undefined : IceDown,
                    ThunderDown: ThunderDown != true ? undefined : ThunderDown,
                    WindDown: WindDown != true ? undefined : WindDown,
                    WaterDown: WaterDown != true ? undefined : WaterDown,
                    EarthDown: EarthDown != true ? undefined : EarthDown,
                    HolyDown: HolyDown != true ? undefined : HolyDown,
                    DarkDown: DarkDown != true ? undefined : DarkDown,
                    MeleeDown: MeleeDown != true ? undefined : MeleeDown,
                    RangedDown: RangedDown != true ? undefined : RangedDown,
                    MagicDown: MagicDown != true ? undefined : MagicDown,
                    Instant: Instant != true ? undefined : Instant,
                    LastStand: LastStand != true ? undefined : LastStand,
                    TurnManip: TurnManip != true ? undefined : TurnManip,
                }
            }
            if(party == true){
                charType = {
                    chara_id: condFilter != "" ? condFilter: undefined,
                    AA: aBuff != true ? undefined : aBuff,
                    state: bstate != true ? undefined : bstate,
                    start: start != true ? undefined : start,
                    BT: burstBuff != true ? undefined : burstBuff,
                    Call: calls != true ? undefined : calls,
                    is_buff: buff_debuff,
                    EX: ex != true ? undefined : ex,
                    FR: fr != true ? undefined : fr,
                    LF: ld != true ? undefined : ld,
                    S2: s20 != true ? undefined : s20,
                    S1: starting != true ? undefined : starting,

                    Break_Party: Break != true ? undefined : Break,
                    BreakCancel_Party: BreakCancel != true ? undefined : BreakCancel,
                    BreakPrevent_Party: BreakPrevent != true ? undefined : BreakPrevent,
                    BRVCap_Party: BRVCap != true ? undefined : BRVCap,
                    BRVFreeze_Party: BRVFreeze != true ? undefined : BRVFreeze,
                    Gains_Party: Gains != true ? undefined : Gains,
                    Refund_Party: Refund != true ? undefined : Refund,
                    BRVRegen_Party: BRVRegen != true ? undefined : BRVRegen,
                    BRVRetain_Party: BRVRetain != true ? undefined : BRVRetain,
                    StolenBRV_Party: StolenBRV != true ? undefined : StolenBRV,
                    BuffPrevent_Party: BuffPrevent != true ? undefined : BuffPrevent,
                    CappedBRV_Party: CappedBRV != true ? undefined : CappedBRV,
                    Cleanse_Party: Cleanse != true ? undefined : Cleanse,
                    Cover_Party: Cover != true ? undefined : Cover,
                    CriticalUp_Party: CriticalUp != true ? undefined : CriticalUp,
                    CriticalRate_Party: CriticalRate != true ? undefined : CriticalRate,
                    DebuffResist_Party: DebuffResist != true ? undefined : DebuffResist,
                    IgnoreDEF_Party: IgnoreDEF != true ? undefined : IgnoreDEF,
                    Delay_Party: Delay != true ? undefined : Delay,
                    Delete_Party: Delete != true ? undefined : Delete,
                    Dispel_Party: Dispel != true ? undefined : Dispel,
                    ElementalWeak_Party: ElementalWeak != true ? undefined : ElementalWeak,
                    Fire_Party: Fire != true ? undefined : Fire,
                    Ice_Party: Ice != true ? undefined : Ice,
                    Thunder_Party: Thunder != true ? undefined : Thunder,
                    Wind_Party: Wind != true ? undefined : Wind,
                    Water_Party: Water != true ? undefined : Water,
                    Earth_Party: Earth != true ? undefined : Earth,
                    Holy_Party: Holy != true ? undefined : Holy,
                    Dark_Party: Dark != true ? undefined : Dark,
                    Evade_Party: Evade != true ? undefined : Evade,
                    EXFill_Party: EXFill != true ? undefined : EXFill,
                    EXRate_Party: EXRate != true ? undefined : EXRate,
                    FreeUse_Party: FreeUse != true ? undefined : FreeUse,
                    FreeTurn_Party: FreeTurn != true ? undefined : FreeTurn,
                    GoldDebuff_Party: GoldDebuff != true ? undefined : GoldDebuff,
                    AddHP_Party: AddHP != true ? undefined : AddHP,
                    MAXBRVCap_Party: MAXBRVCap != true ? undefined : MAXBRVCap,
                    HPResistUp_Party: HPResistUp != true ? undefined : HPResistUp,
                    HPResistDown_Party: HPResistDown != true ? undefined : HPResistDown,
                    BRVPoison_Party: BRVPoison != true ? undefined : BRVPoison,
                    HPPoison_Party: HPPoison != true ? undefined : HPPoison,
                    HPHeal_Party: HPHeal != true ? undefined : HPHeal,
                    HPRegen_Party: HPRegen != true ? undefined : HPRegen,
                    Disable_Party: Disable != true ? undefined : Disable,
                    FireDown_Party: FireDown != true ? undefined : FireDown,
                    IceDown_Party: IceDown != true ? undefined : IceDown,
                    ThunderDown_Party: ThunderDown != true ? undefined : ThunderDown,
                    WindDown_Party: WindDown != true ? undefined : WindDown,
                    WaterDown_Party: WaterDown != true ? undefined : WaterDown,
                    EarthDown_Party: EarthDown != true ? undefined : EarthDown,
                    HolyDown_Party: HolyDown != true ? undefined : HolyDown,
                    DarkDown_Party: DarkDown != true ? undefined : DarkDown,
                    MeleeDown_Party: MeleeDown != true ? undefined : MeleeDown,
                    RangedDown_Party: RangedDown != true ? undefined : RangedDown,
                    MagicDown_Party: MagicDown != true ? undefined : MagicDown,
                    Instant_Party: Instant != true ? undefined : Instant,
                    LastStand_Party: LastStand != true ? undefined : LastStand,
                    TurnManip_Party: TurnManip != true ? undefined : TurnManip,
                }
            }
            const filtermerge = rawData.filter((oneChar) => {
                return Object.entries(charType)
                  .filter(entry => entry[1])
                  .every(([key, value]) => oneChar[key] == value);
              });

              if (filterholder.length === 0) {
                filterholder.push(...filtermerge);
              }

              const makeUnique = filterholder
            .filter(onlyUnique)
            .sort((a, b) => 
            reverse === false ?
            a.order - b.order:
            b.order - a.order
            );
            const searchit = searchTerm == "" ? makeUnique : makeUnique.filter((buff) =>
            (`${buff && buff.name} ${buff && buff.jpname} ${buff && buff.ability_name} ${buff && buff.ability_namegl} - #${buff.id}`).toLowerCase().includes(searchTerm)
            );
            setFilterResults(makeUnique);
            setSearchResults(searchit);
            const newlistdisplay = slice(searchit, 0, limits);
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
        }
    },[merge,rawData,limits,party,searchTerm,reverse,condFilter,start,aBuff,bstate,buffs,burstBuff,calls,debuffs,ex,fr,ld,s20,starting,Break,BreakCancel,BreakPrevent,BRVCap,BRVFreeze,Gains,Refund,BRVRegen,BRVRetain,StolenBRV,BuffPrevent,CappedBRV,Cleanse,Cover,CriticalUp,CriticalRate,DebuffResist,IgnoreDEF,Delay,Delete,Dispel,ElementalWeak,Fire,Ice,Thunder,Wind,Water,Earth,Holy,Dark,Evade,EXFill,EXRate,FreeUse,FreeTurn,GoldDebuff,AddHP,MAXBRVCap,HPResistUp,HPResistDown,BRVPoison,HPPoison,HPHeal,HPRegen,Disable,FireDown,IceDown,ThunderDown,WindDown,WaterDown,EarthDown,HolyDown,DarkDown,MeleeDown,RangedDown,MagicDown,Instant,LastStand,TurnManip])
    
    //buttons
    const aBuffbutton = () => {
        if (aBuff == false) {
        setABuffsearch("true")
        } else {
        setABuffsearch("")
        }
        setABuff((prevValue) => !prevValue);
    };
    const burstBuffbutton = () => {
        if (burstBuff == false) {
        setBurstBuffsearch("true")
        } else {
        setBurstBuffsearch("")
        }
        setBurstBuff((prevValue) => !prevValue);
    };
    const callsbutton = () => {
        if (calls == false) {
        setCallssearch("true")
        } else {
        setCallssearch("")
        }
        setCalls((prevValue) => !prevValue);
    };
    const startingbutton = () => {
        if (starting == false) {
        setStartingsearch("true")
        } else {
        setStartingsearch("")
        }
        setStarting((prevValue) => !prevValue);
    };
    const startbutton = () => {
        if (start == false) {
        setstartsearch("true")
        } else {
        setstartsearch("")
        }
        setstart((prevValue) => !prevValue);
    };
    const s20button = () => {
        if (s20 == false) {
        setS20search("true")
        } else {
        setS20search("")
        }
        setS20((prevValue) => !prevValue);
    };
    const ldbutton = () => {
        if (ld == false) {
        setLDsearch("true")
        } else {
        setLDsearch("")
        }
        setLD((prevValue) => !prevValue);
    };
    const frbutton = () => {
        if (fr == false) {
        setFRsearch("true")
        } else {
        setFRsearch("")
        }
        setFR((prevValue) => !prevValue);
    };
    const exbutton = () => {
        if (ex == false) {
        setEXsearch("true")
        } else {
        setEXsearch("")
        }
        setEX((prevValue) => !prevValue);
    };
    const buffsbutton = () => {
        if (buffs == false) {
          setBuffssearch("true")
          setDebuffssearch("")
          setDebuffs(false)
        } else {
          setBuffssearch("")
          setDebuffssearch("")
        }
        setBuffs((prevValue) => !prevValue);
      };
    const debuffsbutton = () => {
    if (debuffs == false) {
        setDebuffssearch("true")
        setBuffssearch("")
        setBuffs(false)
    } else {
        setDebuffssearch("")
        setBuffssearch("")
    }
    setDebuffs((prevValue) => !prevValue);
    };
    const bstatebutton = () => {
        if (bstate == false) {
          setbstatesearch("true")
        } else {
          setbstatesearch("")
        }
        setbstate((prevValue) => !prevValue)
    }

    const showfilterbutton = () => {
        if (showFilter == false) {
          setFiltersearch("true")
        } else {
          setFiltersearch("")
        }
        setShowFilter((prevValue) => !prevValue);
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

    const togglemerge = () => {
        if (merge == false) {
          setMergesearch("true")
        } else{
          setMergesearch("")
        }
        setMerge((prevValue) => !prevValue);
      }

      const partybutton = () => {
        if (party == false) {
        setpartysearch("true")
        } else {
        setpartysearch("")
        }
        setparty((prevValue) => !prevValue);
        };

      const Breakbutton = () => {
        if (Break == false) {
        setBreaksearch("true")
        } else {
        setBreaksearch("")
        }
        setBreak((prevValue) => !prevValue);
        };
        const BreakCancelbutton = () => {
        if (BreakCancel == false) {
        setBreakCancelsearch("true")
        } else {
        setBreakCancelsearch("")
        }
        setBreakCancel((prevValue) => !prevValue);
        };
        const BreakPreventbutton = () => {
        if (BreakPrevent == false) {
        setBreakPreventsearch("true")
        } else {
        setBreakPreventsearch("")
        }
        setBreakPrevent((prevValue) => !prevValue);
        };
        const BRVCapbutton = () => {
        if (BRVCap == false) {
        setBRVCapsearch("true")
        } else {
        setBRVCapsearch("")
        }
        setBRVCap((prevValue) => !prevValue);
        };
        const BRVFreezebutton = () => {
        if (BRVFreeze == false) {
        setBRVFreezesearch("true")
        } else {
        setBRVFreezesearch("")
        }
        setBRVFreeze((prevValue) => !prevValue);
        };
        const Gainsbutton = () => {
        if (Gains == false) {
        setGainssearch("true")
        } else {
        setGainssearch("")
        }
        setGains((prevValue) => !prevValue);
        };
        const Refundbutton = () => {
        if (Refund == false) {
        setRefundsearch("true")
        } else {
        setRefundsearch("")
        }
        setRefund((prevValue) => !prevValue);
        };
        const BRVRegenbutton = () => {
        if (BRVRegen == false) {
        setBRVRegensearch("true")
        } else {
        setBRVRegensearch("")
        }
        setBRVRegen((prevValue) => !prevValue);
        };
        const BRVRetainbutton = () => {
        if (BRVRetain == false) {
        setBRVRetainsearch("true")
        } else {
        setBRVRetainsearch("")
        }
        setBRVRetain((prevValue) => !prevValue);
        };
        const StolenBRVbutton = () => {
        if (StolenBRV == false) {
        setStolenBRVsearch("true")
        } else {
        setStolenBRVsearch("")
        }
        setStolenBRV((prevValue) => !prevValue);
        };
        const BuffPreventbutton = () => {
        if (BuffPrevent == false) {
        setBuffPreventsearch("true")
        } else {
        setBuffPreventsearch("")
        }
        setBuffPrevent((prevValue) => !prevValue);
        };
        const CappedBRVbutton = () => {
        if (CappedBRV == false) {
        setCappedBRVsearch("true")
        } else {
        setCappedBRVsearch("")
        }
        setCappedBRV((prevValue) => !prevValue);
        };
        const Cleansebutton = () => {
        if (Cleanse == false) {
        setCleansesearch("true")
        } else {
        setCleansesearch("")
        }
        setCleanse((prevValue) => !prevValue);
        };
        const Coverbutton = () => {
        if (Cover == false) {
        setCoversearch("true")
        } else {
        setCoversearch("")
        }
        setCover((prevValue) => !prevValue);
        };
        const CriticalUpbutton = () => {
        if (CriticalUp == false) {
        setCriticalUpsearch("true")
        } else {
        setCriticalUpsearch("")
        }
        setCriticalUp((prevValue) => !prevValue);
        };
        const CriticalRatebutton = () => {
        if (CriticalRate == false) {
        setCriticalRatesearch("true")
        } else {
        setCriticalRatesearch("")
        }
        setCriticalRate((prevValue) => !prevValue);
        };
        const DebuffResistbutton = () => {
        if (DebuffResist == false) {
        setDebuffResistsearch("true")
        } else {
        setDebuffResistsearch("")
        }
        setDebuffResist((prevValue) => !prevValue);
        };
        const IgnoreDEFbutton = () => {
        if (IgnoreDEF == false) {
        setIgnoreDEFsearch("true")
        } else {
        setIgnoreDEFsearch("")
        }
        setIgnoreDEF((prevValue) => !prevValue);
        };
        const Delaybutton = () => {
        if (Delay == false) {
        setDelaysearch("true")
        } else {
        setDelaysearch("")
        }
        setDelay((prevValue) => !prevValue);
        };
        const Deletebutton = () => {
        if (Delete == false) {
        setDeletesearch("true")
        } else {
        setDeletesearch("")
        }
        setDelete((prevValue) => !prevValue);
        };
        const Dispelbutton = () => {
        if (Dispel == false) {
        setDispelsearch("true")
        } else {
        setDispelsearch("")
        }
        setDispel((prevValue) => !prevValue);
        };
        const ElementalWeakbutton = () => {
        if (ElementalWeak == false) {
        setElementalWeaksearch("true")
        } else {
        setElementalWeaksearch("")
        }
        setElementalWeak((prevValue) => !prevValue);
        };
        const Firebutton = () => {
        if (Fire == false) {
        setFiresearch("true")
        } else {
        setFiresearch("")
        }
        setFire((prevValue) => !prevValue);
        };
        const Icebutton = () => {
        if (Ice == false) {
        setIcesearch("true")
        } else {
        setIcesearch("")
        }
        setIce((prevValue) => !prevValue);
        };
        const Thunderbutton = () => {
        if (Thunder == false) {
        setThundersearch("true")
        } else {
        setThundersearch("")
        }
        setThunder((prevValue) => !prevValue);
        };
        const Windbutton = () => {
        if (Wind == false) {
        setWindsearch("true")
        } else {
        setWindsearch("")
        }
        setWind((prevValue) => !prevValue);
        };
        const Waterbutton = () => {
        if (Water == false) {
        setWatersearch("true")
        } else {
        setWatersearch("")
        }
        setWater((prevValue) => !prevValue);
        };
        const Earthbutton = () => {
        if (Earth == false) {
        setEarthsearch("true")
        } else {
        setEarthsearch("")
        }
        setEarth((prevValue) => !prevValue);
        };
        const Holybutton = () => {
        if (Holy == false) {
        setHolysearch("true")
        } else {
        setHolysearch("")
        }
        setHoly((prevValue) => !prevValue);
        };
        const Darkbutton = () => {
        if (Dark == false) {
        setDarksearch("true")
        } else {
        setDarksearch("")
        }
        setDark((prevValue) => !prevValue);
        };
        const Evadebutton = () => {
        if (Evade == false) {
        setEvadesearch("true")
        } else {
        setEvadesearch("")
        }
        setEvade((prevValue) => !prevValue);
        };
        const EXFillbutton = () => {
        if (EXFill == false) {
        setEXFillsearch("true")
        } else {
        setEXFillsearch("")
        }
        setEXFill((prevValue) => !prevValue);
        };
        const EXRatebutton = () => {
        if (EXRate == false) {
        setEXRatesearch("true")
        } else {
        setEXRatesearch("")
        }
        setEXRate((prevValue) => !prevValue);
        };
        const FreeUsebutton = () => {
        if (FreeUse == false) {
        setFreeUsesearch("true")
        } else {
        setFreeUsesearch("")
        }
        setFreeUse((prevValue) => !prevValue);
        };
        const FreeTurnbutton = () => {
        if (FreeTurn == false) {
        setFreeTurnsearch("true")
        } else {
        setFreeTurnsearch("")
        }
        setFreeTurn((prevValue) => !prevValue);
        };
        const GoldDebuffbutton = () => {
        if (GoldDebuff == false) {
        setGoldDebuffsearch("true")
        } else {
        setGoldDebuffsearch("")
        }
        setGoldDebuff((prevValue) => !prevValue);
        };
        const AddHPbutton = () => {
        if (AddHP == false) {
        setAddHPsearch("true")
        } else {
        setAddHPsearch("")
        }
        setAddHP((prevValue) => !prevValue);
        };
        const MAXBRVCapbutton = () => {
        if (MAXBRVCap == false) {
        setMAXBRVCapsearch("true")
        } else {
        setMAXBRVCapsearch("")
        }
        setMAXBRVCap((prevValue) => !prevValue);
        };
        const HPResistUpbutton = () => {
        if (HPResistUp == false) {
        setHPResistUpsearch("true")
        } else {
        setHPResistUpsearch("")
        }
        setHPResistUp((prevValue) => !prevValue);
        };
        const HPResistDownbutton = () => {
        if (HPResistDown == false) {
        setHPResistDownsearch("true")
        } else {
        setHPResistDownsearch("")
        }
        setHPResistDown((prevValue) => !prevValue);
        };
        const BRVPoisonbutton = () => {
        if (BRVPoison == false) {
        setBRVPoisonsearch("true")
        } else {
        setBRVPoisonsearch("")
        }
        setBRVPoison((prevValue) => !prevValue);
        };
        const HPPoisonbutton = () => {
        if (HPPoison == false) {
        setHPPoisonsearch("true")
        } else {
        setHPPoisonsearch("")
        }
        setHPPoison((prevValue) => !prevValue);
        };
        const HPHealbutton = () => {
        if (HPHeal == false) {
        setHPHealsearch("true")
        } else {
        setHPHealsearch("")
        }
        setHPHeal((prevValue) => !prevValue);
        };
        const HPRegenbutton = () => {
        if (HPRegen == false) {
        setHPRegensearch("true")
        } else {
        setHPRegensearch("")
        }
        setHPRegen((prevValue) => !prevValue);
        };
        const Disablebutton = () => {
        if (Disable == false) {
        setDisablesearch("true")
        } else {
        setDisablesearch("")
        }
        setDisable((prevValue) => !prevValue);
        };
        const FireDownbutton = () => {
        if (FireDown == false) {
        setFireDownsearch("true")
        } else {
        setFireDownsearch("")
        }
        setFireDown((prevValue) => !prevValue);
        };
        const IceDownbutton = () => {
        if (IceDown == false) {
        setIceDownsearch("true")
        } else {
        setIceDownsearch("")
        }
        setIceDown((prevValue) => !prevValue);
        };
        const ThunderDownbutton = () => {
        if (ThunderDown == false) {
        setThunderDownsearch("true")
        } else {
        setThunderDownsearch("")
        }
        setThunderDown((prevValue) => !prevValue);
        };
        const WindDownbutton = () => {
        if (WindDown == false) {
        setWindDownsearch("true")
        } else {
        setWindDownsearch("")
        }
        setWindDown((prevValue) => !prevValue);
        };
        const WaterDownbutton = () => {
        if (WaterDown == false) {
        setWaterDownsearch("true")
        } else {
        setWaterDownsearch("")
        }
        setWaterDown((prevValue) => !prevValue);
        };
        const EarthDownbutton = () => {
        if (EarthDown == false) {
        setEarthDownsearch("true")
        } else {
        setEarthDownsearch("")
        }
        setEarthDown((prevValue) => !prevValue);
        };
        const HolyDownbutton = () => {
        if (HolyDown == false) {
        setHolyDownsearch("true")
        } else {
        setHolyDownsearch("")
        }
        setHolyDown((prevValue) => !prevValue);
        };
        const DarkDownbutton = () => {
        if (DarkDown == false) {
        setDarkDownsearch("true")
        } else {
        setDarkDownsearch("")
        }
        setDarkDown((prevValue) => !prevValue);
        };
        const MeleeDownbutton = () => {
        if (MeleeDown == false) {
        setMeleeDownsearch("true")
        } else {
        setMeleeDownsearch("")
        }
        setMeleeDown((prevValue) => !prevValue);
        };
        const RangedDownbutton = () => {
        if (RangedDown == false) {
        setRangedDownsearch("true")
        } else {
        setRangedDownsearch("")
        }
        setRangedDown((prevValue) => !prevValue);
        };
        const MagicDownbutton = () => {
        if (MagicDown == false) {
        setMagicDownsearch("true")
        } else {
        setMagicDownsearch("")
        }
        setMagicDown((prevValue) => !prevValue);
        };
        const Instantbutton = () => {
        if (Instant == false) {
        setInstantsearch("true")
        } else {
        setInstantsearch("")
        }
        setInstant((prevValue) => !prevValue);
        };
        const LastStandbutton = () => {
        if (LastStand == false) {
        setLastStandsearch("true")
        } else {
        setLastStandsearch("")
        }
        setLastStand((prevValue) => !prevValue);
        };
        const TurnManipbutton = () => {
        if (TurnManip == false) {
        setTurnManipsearch("true")
        } else {
        setTurnManipsearch("")
        }
        setTurnManip((prevValue) => !prevValue);
        };

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

    //type list
    const typeListArray = Object.values(char_id).filter(self=>ver=="JP"? self.JPOrder != undefined : self.GLOrder != undefined).sort((a,b)=>ver=="JP"? b.JPOrder - a.JPOrder : b.GLOrder - a.GLOrder).map((typeListUnique) => ({
        value: typeListUnique.name,
        label: typeListUnique.name,
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

      const resetbutton = () =>{
        setclearFilter(true);
        setReverse(false)    
        setReversesearch("")
        setTEXTsearch("")
        setsearchdisplay("");
        setSearchTerm("");
        setCondFilter("")

        setABuffsearch("")
        setbstatesearch("")
        setBuffssearch("")
        setBurstBuffsearch("")
        setCallssearch("")
        setDebuffssearch("")
        setEXsearch("")
        setFRsearch("")
        setLDsearch("")
        setS20search("")
        setStartingsearch("")
        setBreaksearch("")
        setBreakCancelsearch("")
        setBreakPreventsearch("")
        setBRVCapsearch("")
        setBRVFreezesearch("")
        setGainssearch("")
        setRefundsearch("")
        setBRVRegensearch("")
        setBRVRetainsearch("")
        setStolenBRVsearch("")
        setBuffPreventsearch("")
        setCappedBRVsearch("")
        setCleansesearch("")
        setCoversearch("")
        setCriticalUpsearch("")
        setCriticalRatesearch("")
        setDebuffResistsearch("")
        setIgnoreDEFsearch("")
        setDelaysearch("")
        setDeletesearch("")
        setDispelsearch("")
        setElementalWeaksearch("")
        setFiresearch("")
        setIcesearch("")
        setThundersearch("")
        setWindsearch("")
        setWatersearch("")
        setEarthsearch("")
        setHolysearch("")
        setDarksearch("")
        setEvadesearch("")
        setEXFillsearch("")
        setEXRatesearch("")
        setFreeUsesearch("")
        setFreeTurnsearch("")
        setGoldDebuffsearch("")
        setAddHPsearch("")
        setMAXBRVCapsearch("")
        setHPResistUpsearch("")
        setHPResistDownsearch("")
        setBRVPoisonsearch("")
        setHPPoisonsearch("")
        setHPHealsearch("")
        setHPRegensearch("")
        setDisablesearch("")
        setFireDownsearch("")
        setIceDownsearch("")
        setThunderDownsearch("")
        setWindDownsearch("")
        setWaterDownsearch("")
        setEarthDownsearch("")
        setHolyDownsearch("")
        setDarkDownsearch("")
        setMeleeDownsearch("")
        setRangedDownsearch("")
        setMagicDownsearch("")
        setInstantsearch("")
        setLastStandsearch("")
        setTurnManipsearch("")
        setstartsearch("")
        setTypesearch("")

        setstart(false)
        setABuff(false)
        setbstate(false)
        setBuffs(false)
        setBurstBuff(false)
        setCalls(false)
        setDebuffs(false)
        setEX(false)
        setFR(false)
        setLD(false)
        setS20(false)
        setStarting(false)
        setBreak(false)
        setBreakCancel(false)
        setBreakPrevent(false)
        setBRVCap(false)
        setBRVFreeze(false)
        setGains(false)
        setRefund(false)
        setBRVRegen(false)
        setBRVRetain(false)
        setStolenBRV(false)
        setBuffPrevent(false)
        setCappedBRV(false)
        setCleanse(false)
        setCover(false)
        setCriticalUp(false)
        setCriticalRate(false)
        setDebuffResist(false)
        setIgnoreDEF(false)
        setDelay(false)
        setDelete(false)
        setDispel(false)
        setElementalWeak(false)
        setFire(false)
        setIce(false)
        setThunder(false)
        setWind(false)
        setWater(false)
        setEarth(false)
        setHoly(false)
        setDark(false)
        setEvade(false)
        setEXFill(false)
        setEXRate(false)
        setFreeUse(false)
        setFreeTurn(false)
        setGoldDebuff(false)
        setAddHP(false)
        setMAXBRVCap(false)
        setHPResistUp(false)
        setHPResistDown(false)
        setBRVPoison(false)
        setHPPoison(false)
        setHPHeal(false)
        setHPRegen(false)
        setDisable(false)
        setFireDown(false)
        setIceDown(false)
        setThunderDown(false)
        setWindDown(false)
        setWaterDown(false)
        setEarthDown(false)
        setHolyDown(false)
        setDarkDown(false)
        setMeleeDown(false)
        setRangedDown(false)
        setMagicDown(false)
        setInstant(false)
        setLastStand(false)
        setTurnManip(false)

        setparty(false)
        setpartysearch("")
        setMerge(false)
        setMergesearch("")
    
        setTimeout(() => setclearFilter(false), 1000);
      }

      const getcastnames = Object.values(AilmentNames).map(self=>{
        return {[self.castID]: self}
      })
    
      const CastNames = getcastnames.reduce(function(result, item) {
        var key = Object.keys(item)[0]; //first property: a, b, c
        result[key] = item[key];
        return result;
        }, {});

      const listBuff = listDisplay;

    const dispatch = useDispatch();

    const jptoggledata = useSelector((state) => 
        state.toggle.toggle
        );

    const [jponly, setJPonly] = useStateIfMounted(jptoggledata);
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

    },[setJPSearch,dispatch,setJPonly])

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

    return(
        <div className="wrapper">
        <Helmet>
          <title>Buffs - Dissidia Compendium</title>
          <meta property="og:site_name" content="Dissidia Compendium"/>
          <meta property="og:type" content="website" />
          <meta name="description" content="Buffs Search"/>
          <meta name="twitter:title" content="Buffs Search"/>
          <meta name="twitter:description" content="Buffs Search"/>
          <meta property="og:title" content="Buffs Search"/>
          <meta property="og:description" content="Buffs Search"/>
          <meta property="og:url" content="https://dissidiacompendium.com/search/buffs"/>
        </Helmet>
            <div className="content">
            <h1>{`${jptoggledata == false ? "GL" : "JP"} Buffs & Debuffs`}</h1>
              <div className="subheader">
                <Tippy content="GL">
                        <span className={`${jptoggledata == false ? "filteractive": "filterinactive"} buffbutton ver_gl`} onClick={glonlybutton}></span>
                </Tippy>   
                <Tippy content="JP">
                        <span className={`${jptoggledata == true ? "filteractive": "filterinactive"} buffbutton ver_jp`} onClick={jponlybutton}></span>
                </Tippy> 
            </div>
              <div className="charfilterspacer"/>
             <div key="filter1" onClick={showfilterbutton} className="charfilter"><span className="filterstext"></span>{showFilter ? <TiArrowSortedUp className="uparrow"/> : <TiArrowSortedDown className="downarrow"/>}</div>
              {showFilter == false ? 
              <div className="char-search-reverse-holder">
                <IoSearch className="searchicon"/>
              <div className="search-holder el">
                <input 
                    className="char-search-bar" 
                    type="text"
                    placeholder="Search"
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
                  <div className="similarbanner">Ability Line</div>
                  <div className="filterholderflair">
                    <ul className="bufftypes">
                      <Tippy content="Burst Line Casts">
                      <li className={`${burstBuff ? "filteractive": "filterinactive"} buffbutton burstButton`} onClick={burstBuffbutton}></li>
                      </Tippy>
                      <Tippy content="FR Line Casts">
                      <li className={`${fr ? "filteractive": "filterinactive"} buffbutton frbutton`} onClick={frbutton}></li>
                      </Tippy>
                      <Tippy content="Calls Line Casts">
                      <li className={`${calls ? "filteractive": "filterinactive"} buffbutton callsButton`} onClick={callsbutton}></li>
                      </Tippy>
                      <Tippy content="LD Line Casts">
                      <li className={`${ld ? "filteractive": "filterinactive"} buffbutton ldButton`} onClick={ldbutton}></li>
                      </Tippy>
                      <Tippy content="EX Line Casts">
                      <li className={`${ex ? "filteractive": "filterinactive"} buffbutton exButton`} onClick={exbutton}></li>
                      </Tippy>
                      <Tippy content="AA Line Casts">
                      <li className={`${aBuff ? "filteractive": "filterinactive"} buffbutton abuffButton`} onClick={aBuffbutton}></li>
                      </Tippy>
                      <Tippy content="Second Skill Line Casts">
                      <li className={`${s20 ? "filteractive": "filterinactive"} buffbutton s20Button`} onClick={s20button}></li>
                      </Tippy>
                      <Tippy content="Starting Skill Line Casts">
                      <li className={`${starting ? "filteractive": "filterinactive"} buffbutton startingButton`} onClick={startingbutton}></li>
                      </Tippy>
                      <br/>
                        <Tippy content="Quest Starting Casts">
                            <li className={`${start ? "filteractive": "filterinactive"} buffbutton startbutton`} onClick={startbutton}></li>
                        </Tippy>
                        <Tippy content="State Buffs">
                            <li className={`${bstate ? "filteractive": "filterinactive"} buffbutton bstateButton`} onClick={bstatebutton}></li>
                        </Tippy>
                    </ul>
                    <div className="similarbanner">Attacking</div>
                    <ul className="characterclasses">
                        <Tippy content={ailment_tags[`MeleeDown`].name}>
                            <li className={`${MeleeDown ? "filteractive": "filterinactive"} spheresbutton`} onClick={MeleeDownbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`MeleeDown`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`RangedDown`].name}>
                            <li className={`${RangedDown ? "filteractive": "filterinactive"} spheresbutton`} onClick={RangedDownbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`RangedDown`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`MagicDown`].name}>
                            <li className={`${MagicDown ? "filteractive": "filterinactive"} spheresbutton`} onClick={MagicDownbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`MagicDown`].url}.png)`}}></li>
                        </Tippy>
                        <br/>
                        <Tippy content={ailment_tags[`Fire`].name}>
                            <li className={`${Fire ? "filteractive": "filterinactive"} spheresbutton`} onClick={Firebutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Fire`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`Ice`].name}>
                            <li className={`${Ice ? "filteractive": "filterinactive"} spheresbutton`} onClick={Icebutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Ice`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`Thunder`].name}>
                            <li className={`${Thunder ? "filteractive": "filterinactive"} spheresbutton`} onClick={Thunderbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Thunder`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`Wind`].name}>
                            <li className={`${Wind ? "filteractive": "filterinactive"} spheresbutton`} onClick={Windbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Wind`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`Water`].name}>
                            <li className={`${Water ? "filteractive": "filterinactive"} spheresbutton`} onClick={Waterbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Water`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`Earth`].name}>
                            <li className={`${Earth ? "filteractive": "filterinactive"} spheresbutton`} onClick={Earthbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Earth`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`Holy`].name}>
                            <li className={`${Holy ? "filteractive": "filterinactive"} spheresbutton`} onClick={Holybutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Holy`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`Dark`].name}>
                            <li className={`${Dark ? "filteractive": "filterinactive"} spheresbutton`} onClick={Darkbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Dark`].url}.png)`}}></li>
                        </Tippy>
                        <br/>
                        <Tippy content={ailment_tags[`FireDown`].name}>
                            <li className={`${FireDown ? "filteractive": "filterinactive"} spheresbutton`} onClick={FireDownbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`FireDown`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`IceDown`].name}>
                            <li className={`${IceDown ? "filteractive": "filterinactive"} spheresbutton`} onClick={IceDownbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`IceDown`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`ThunderDown`].name}>
                            <li className={`${ThunderDown ? "filteractive": "filterinactive"} spheresbutton`} onClick={ThunderDownbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`ThunderDown`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`WindDown`].name}>
                            <li className={`${WindDown ? "filteractive": "filterinactive"} spheresbutton`} onClick={WindDownbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`WindDown`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`WaterDown`].name}>
                            <li className={`${WaterDown ? "filteractive": "filterinactive"} spheresbutton`} onClick={WaterDownbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`WaterDown`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`EarthDown`].name}>
                            <li className={`${EarthDown ? "filteractive": "filterinactive"} spheresbutton`} onClick={EarthDownbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`EarthDown`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`HolyDown`].name}>
                            <li className={`${HolyDown ? "filteractive": "filterinactive"} spheresbutton`} onClick={HolyDownbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`HolyDown`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`DarkDown`].name}>
                            <li className={`${DarkDown ? "filteractive": "filterinactive"} spheresbutton`} onClick={DarkDownbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`DarkDown`].url}.png)`}}></li>
                        </Tippy>
                        <br/>
                        <Tippy content={ailment_tags[`Break`].name}>
                            <li className={`${Break ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Breakbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Break`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`CriticalUp`].name}>
                            <li className={`${CriticalUp ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={CriticalUpbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`CriticalUp`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`CriticalRate`].name}>
                            <li className={`${CriticalRate ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={CriticalRatebutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`CriticalRate`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`IgnoreDEF`].name}>
                            <li className={`${IgnoreDEF ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={IgnoreDEFbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`IgnoreDEF`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`TurnManip`].name}>
                            <li className={`${TurnManip ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={TurnManipbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`TurnManip`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`AddHP`].name}>
                            <li className={`${AddHP ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={AddHPbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`AddHP`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`StolenBRV`].name}>
                            <li className={`${StolenBRV ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={StolenBRVbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`StolenBRV`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`CappedBRV`].name}>
                            <li className={`${CappedBRV ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={CappedBRVbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`CappedBRV`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`EXFill`].name}>
                            <li className={`${EXFill ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={EXFillbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`EXFill`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`EXRate`].name}>
                            <li className={`${EXRate ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={EXRatebutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`EXRate`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`HPResistDown`].name}>
                            <li className={`${HPResistDown ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={HPResistDownbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`HPResistDown`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`BRVCap`].name}>
                            <li className={`${BRVCap ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={BRVCapbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`BRVCap`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`MAXBRVCap`].name}>
                            <li className={`${MAXBRVCap ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={MAXBRVCapbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`MAXBRVCap`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`ElementalWeak`].name}>
                            <li className={`${ElementalWeak ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={ElementalWeakbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`ElementalWeak`].url}.png)`}}></li>
                        </Tippy>
                        </ul>
                        <div className="similarbanner">Healing</div>
                        <ul className="characterclasses">
                        <Tippy content={ailment_tags[`HPHeal`].name}>
                            <li className={`${HPHeal ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={HPHealbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`HPHeal`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`BRVRegen`].name}>
                            <li className={`${BRVRegen ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={BRVRegenbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`BRVRegen`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`HPRegen`].name}>
                            <li className={`${HPRegen ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={HPRegenbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`HPRegen`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`Gains`].name}>
                            <li className={`${Gains ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Gainsbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Gains`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`LastStand`].name}>
                            <li className={`${LastStand ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={LastStandbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`LastStand`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`Cleanse`].name}>
                            <li className={`${Cleanse ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Cleansebutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Cleanse`].url}.png)`}}></li>
                        </Tippy>
                        </ul>
                        <div className="similarbanner">Defending</div>
                        <ul className="characterclasses">
                        <Tippy content={ailment_tags[`Cover`].name}>
                            <li className={`${Cover ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Coverbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Cover`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`Evade`].name}>
                            <li className={`${Evade ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Evadebutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Evade`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`HPResistUp`].name}>
                            <li className={`${HPResistUp ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={HPResistUpbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`HPResistUp`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`BreakPrevent`].name}>
                            <li className={`${BreakPrevent ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={BreakPreventbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`BreakPrevent`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`Refund`].name}>
                            <li className={`${Refund ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Refundbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Refund`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`BRVRetain`].name}>
                            <li className={`${BRVRetain ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={BRVRetainbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`BRVRetain`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`DebuffResist`].name}>
                            <li className={`${DebuffResist ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={DebuffResistbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`DebuffResist`].url}.png)`}}></li>
                        </Tippy>
                        </ul>
                        <div className="similarbanner">Interference</div>
                        <ul className="characterclasses">
                        <Tippy content={ailment_tags[`Delay`].name}>
                            <li className={`${Delay ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Delaybutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Delay`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`Delete`].name}>
                            <li className={`${Delete ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Deletebutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Delete`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`BreakCancel`].name}>
                            <li className={`${BreakCancel ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={BreakCancelbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`BreakCancel`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`BRVPoison`].name}>
                            <li className={`${BRVPoison ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={BRVPoisonbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`BRVPoison`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`HPPoison`].name}>
                            <li className={`${HPPoison ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={HPPoisonbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`HPPoison`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`BRVFreeze`].name}>
                            <li className={`${BRVFreeze ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={BRVFreezebutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`BRVFreeze`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`BuffPrevent`].name}>
                            <li className={`${BuffPrevent ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={BuffPreventbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`BuffPrevent`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`Dispel`].name}>
                            <li className={`${Dispel ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Dispelbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Dispel`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`Disable`].name}>
                            <li className={`${Disable ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Disablebutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Disable`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`GoldDebuff`].name}>
                            <li className={`${GoldDebuff ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={GoldDebuffbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`GoldDebuff`].url}.png)`}}></li>
                        </Tippy>
                        </ul>
                        <div className="similarbanner">Other</div>
                        <ul className="characterclasses">
                        <Tippy content={ailment_tags[`FreeUse`].name}>
                            <li className={`${FreeUse ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={FreeUsebutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`FreeUse`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`FreeTurn`].name}>
                            <li className={`${FreeTurn ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={FreeTurnbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`FreeTurn`].url}.png)`}}></li>
                        </Tippy>
                        <Tippy content={ailment_tags[`Instant`].name}>
                            <li className={`${Instant ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Instantbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Instant`].url}.png)`}}></li>
                        </Tippy>
                    </ul>
                    <div className="similarbanner">Refine</div>
                    <div className="margeholder">
                      <div className="Merge">
                        <label className="MergeText">Party Aura?</label>
                        <div key="mergecheck1" className={`${party == true ? "nodisplay" :  `uncheck`}`} onClick={partybutton}/>
                        <div key="mergecheck2" className={`${party == true ? "check" :  `nodisplay`}`} onClick={partybutton}/>
                      </div>
                    </div>
                    <div className="margeholder">
                      <div className="Merge">
                        <label className="MergeText">Merge Filters?</label>
                        <div key="mergecheck1" className={`${merge == true ? "nodisplay" :  `uncheck`}`} onClick={togglemerge}/>
                        <div key="mergecheck2" className={`${merge == true ? "check" :  `nodisplay`}`} onClick={togglemerge}/>
                      </div>
                    </div>
                    <ul className="bufftypes">
                      <li className={`${buffs ? "filteractive": "filterinactive"} buffsbutton buffsButton`} onClick={buffsbutton}></li>
                      <li className={`${debuffs ? "filteractive": "filterinactive"} buffsbutton debuffsButton`} onClick={debuffsbutton}></li>
                    </ul>
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
                            placeholder="Search"
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
                  <Link className="whitecolor" to={"/characters/forcetime"}>
                    <span className="subtext">Check out the Force Time page</span>
                    </Link>   
                  </div>
                  {showFilter == true ? "" :
                  <span>
                  <Link className="whitecolor" to={"/characters/forcetime"}>
                  <span className="subtext">Force Time</span>
                  </Link> 
                  </span> }
                <ul className="bannertabs">
                <Link to={`/search/buffs${jptoggledata == false ? "":"?JP=true"}`}>
                  <li className={"active"} ><span className="gemselected"/>Buffs</li>
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
                  <li className={""} >Music</li>
                </Link>
              </ul>
              <div className="buffsholder">
                <div className="subtext">
                  {displayBanner}
                </div>
              {listBuff.length > 0 ?  (
              listBuff.map(self => (
                <Ailment_Data_Formatting_bycharacter
                    key={`${self.id}_${self.chara_id}`}
                    file={file}
                    loc={loc}
                    ver={ver}
                    ailment_data={self}
                    ailment_group={ailment_group}
                    command_group={command_group}
                    AilmentNames={AilmentNames}
                    CastNames={CastNames}
                    CommandNames={CommandNames}
                    CondData={CondData}
                    Ailment_Effects={Ailment_Effects}
                    cast_targets={cast_targets}
    
                    passive_effects_data={passive_effects_data}
                    equipmentpassivenames={equipmentpassivenames}
                    passivenames={passivenames}
                    command_data_effects={command_data_effects}
                    enemy_type={enemy_type}
    
                    MessageData_FFSeries={MessageData_FFSeries}
                    MessageData_Category={MessageData_Category}
                    slider={true}
                    rank={self.arank}
                    arg1={self.aarg1}
                    arg2={self.aarg2}
                    alt_rank={self.aranka}
                    alt_aug1={self.aarg1a}
                    alt_aug2={self.aarg2a}
                    castlocation={true}
                    formatting={true}
                    gear={false}
                    char_id={char_id}
                    rank_tag={self.rank_tag}
                    turns={self.alife}

                    link={"buffs"}
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
      </div>
    )
}

export default BuffsDirect