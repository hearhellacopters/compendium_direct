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
import { getQuery, getQueryStringVal, useQueryParam } from './components/URLParams'
import AilmentDataFormatting from './components/Buffs/AilmentDataFormatting';
import ailment_tags from './processing/ailment/ailment_tags.json'
import { LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';

import { setFalse, setTrue } from './redux/ducks/jptoggle'

function Buffs({
    ver,
    match,

    ProcessedBuffs,

    master_index,
    scrollPosition 
}) {

    const char_id = master_index.charid

    const startinglimit = window.innerWidth <= 815 ? 30 : 50;

    const rawData = ProcessedBuffs;

    const banerDisplayTerm = "casts";

    const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null ? true : false);
    const [clearFilter, setclearFilter] = useStateIfMounted(false);

    const [aBuff, setABuff] = useState(getQueryStringVal("aa") != null ? true : false);
    const [burstBuff, setBurstBuff] = useState(getQueryStringVal("burst") != null ? true : false);
    const [call_75, setcall_75] = useState(getQueryStringVal("call_75") != null ? true : false);
    const [call_ld, setcall_ld] = useState(getQueryStringVal("call_ld") != null ? true : false);
    const [starting, setStarting] = useState(getQueryStringVal("s1") != null ? true : false);
    const [s20, setS20] = useState(getQueryStringVal("s2") != null ? true : false);
    const [ld, setLD] = useState(getQueryStringVal("ld") != null ? true : false);
    const [fr, setFR] = useState(getQueryStringVal("fr") != null ? true : false);
    const [ex, setEX] = useState(getQueryStringVal("ex") != null ? true : false);
    const [brv, setbrv] = useState(getQueryStringVal("brv") != null ? true : false);
    const [hp, sethp] = useState(getQueryStringVal("hp") != null ? true : false);
    const [bstate, setbstate] = useState(getQueryStringVal("state") != null ? true : false);
    const [start, setstart] = useState(getQueryStringVal("start") != null ? true : false);
    const [buffs, setBuffs] = useState(getQueryStringVal("buffs") != null ? true : false);
    const [debuffs, setDebuffs] = useState(getQueryStringVal("debuffs") != null ? true : false);
    const [party, setparty] = useState(getQueryStringVal("party") != null ? true : false);

    const [Break, setBreak] = useState(getQueryStringVal("Break") != null ? true : false);
    const [BreakCancel, setBreakCancel] = useState(getQueryStringVal("BreakCancel") != null ? true : false);
    const [BreakPrevent, setBreakPrevent] = useState(getQueryStringVal("BreakPrevent") != null ? true : false);
    const [BRVCap, setBRVCap] = useState(getQueryStringVal("BRVCap") != null ? true : false);
    const [BRVFreeze, setBRVFreeze] = useState(getQueryStringVal("BRVFreeze") != null ? true : false);
    const [Launch_Support, setLaunch_Support] = useState(getQueryStringVal("Launch_Support") != null ? true : false);
    const [HP_Damage_Up, setHP_Damage_Up] = useState(getQueryStringVal("HP_Damage_Up") != null ? true : false);
    const [BRV_Resist_Down, setBRV_Resist_Down] = useState(getQueryStringVal("BRV_Resist_Down") != null ? true : false);
    const [Reviver, setReviver] = useState(getQueryStringVal("Reviver") != null ? true : false);
    const [Gains, setGains] = useState(getQueryStringVal("Gains") != null ? true : false);
    const [Refund, setRefund] = useState(getQueryStringVal("Refund") != null ? true : false);
    const [BRVRegen, setBRVRegen] = useState(getQueryStringVal("BRVRegen") != null ? true : false);
    const [BRVRetain, setBRVRetain] = useState(getQueryStringVal("BRVRetain") != null ? true : false);
    const [StolenBRV, setStolenBRV] = useState(getQueryStringVal("StolenBRV") != null ? true : false);
    const [BuffPrevent, setBuffPrevent] = useState(getQueryStringVal("BuffPrevent") != null ? true : false);
    const [CappedBRV, setCappedBRV] = useState(getQueryStringVal("CappedBRV") != null ? true : false);
    const [Cleanse, setCleanse] = useState(getQueryStringVal("Cleanse") != null ? true : false);
    const [Cover, setCover] = useState(getQueryStringVal("Cover") != null ? true : false);
    const [CriticalUp, setCriticalUp] = useState(getQueryStringVal("CriticalUp") != null ? true : false);
    const [CriticalRate, setCriticalRate] = useState(getQueryStringVal("CriticalRate") != null ? true : false);
    const [DebuffResist, setDebuffResist] = useState(getQueryStringVal("DebuffResist") != null ? true : false);
    const [IgnoreDEF, setIgnoreDEF] = useState(getQueryStringVal("IgnoreDEF") != null ? true : false);
    const [Delay, setDelay] = useState(getQueryStringVal("Delay") != null ? true : false);
    const [Delete, setDelete] = useState(getQueryStringVal("Delete") != null ? true : false);
    const [Dispel, setDispel] = useState(getQueryStringVal("Dispel") != null ? true : false);
    const [ElementalWeak, setElementalWeak] = useState(getQueryStringVal("ElementalWeak") != null ? true : false);
    const [Fire, setFire] = useState(getQueryStringVal("Fire") != null ? true : false);
    const [Ice, setIce] = useState(getQueryStringVal("Ice") != null ? true : false);
    const [Thunder, setThunder] = useState(getQueryStringVal("Thunder") != null ? true : false);
    const [Wind, setWind] = useState(getQueryStringVal("Wind") != null ? true : false);
    const [Water, setWater] = useState(getQueryStringVal("Water") != null ? true : false);
    const [Earth, setEarth] = useState(getQueryStringVal("Earth") != null ? true : false);
    const [Holy, setHoly] = useState(getQueryStringVal("Holy") != null ? true : false);
    const [Dark, setDark] = useState(getQueryStringVal("Dark") != null ? true : false);
    const [Evade, setEvade] = useState(getQueryStringVal("Evade") != null ? true : false);
    const [EXFill, setEXFill] = useState(getQueryStringVal("EXFill") != null ? true : false);
    const [EXRate, setEXRate] = useState(getQueryStringVal("EXRate") != null ? true : false);
    const [FreeUse, setFreeUse] = useState(getQueryStringVal("FreeUse") != null ? true : false);
    const [FreeTurn, setFreeTurn] = useState(getQueryStringVal("FreeTurn") != null ? true : false);
    const [StackedDebuff, setStackedDebuff] = useState(getQueryStringVal("StackedDebuff") != null ? true : false);
    const [StackedDebuff5, setStackedDebuff5] = useState(getQueryStringVal("StackedDebuff5") != null ? true : false);
    const [StackedBuff, setStackedBuff] = useState(getQueryStringVal("StackedBuff") != null ? true : false);
    const [StackedBuff5, setStackedBuff5] = useState(getQueryStringVal("StackedBuff5") != null ? true : false);
    const [DMGShield, setDMGShield] = useState(getQueryStringVal("DMGShield") != null ? true : false);
    const [GoldDebuff, setGoldDebuff] = useState(getQueryStringVal("GoldDebuff") != null ? true : false);
    const [GoldBuff, setGoldBuff] = useState(getQueryStringVal("GoldBuff") != null ? true : false);
    const [SpecialBuff, setSpecialBuff] = useState(getQueryStringVal("SpecialBuff") != null ? true : false);
    const [AddHP, setAddHP] = useState(getQueryStringVal("AddHP") != null ? true : false);
    const [MAXBRVCap, setMAXBRVCap] = useState(getQueryStringVal("MAXBRVCap") != null ? true : false);
    const [HPResistUp, setHPResistUp] = useState(getQueryStringVal("HPResistUp") != null ? true : false);
    const [HPResistDown, setHPResistDown] = useState(getQueryStringVal("HPResistDown") != null ? true : false);
    const [BRVPoison, setBRVPoison] = useState(getQueryStringVal("BRVPoison") != null ? true : false);
    const [HPPoison, setHPPoison] = useState(getQueryStringVal("HPPoison") != null ? true : false);
    const [HPHeal, setHPHeal] = useState(getQueryStringVal("HPHeal") != null ? true : false);
    const [HPRegen, setHPRegen] = useState(getQueryStringVal("HPRegen") != null ? true : false);
    const [Disable, setDisable] = useState(getQueryStringVal("Disable") != null ? true : false);
    const [FireDown, setFireDown] = useState(getQueryStringVal("FireDown") != null ? true : false);
    const [IceDown, setIceDown] = useState(getQueryStringVal("IceDown") != null ? true : false);
    const [ThunderDown, setThunderDown] = useState(getQueryStringVal("ThunderDown") != null ? true : false);
    const [WindDown, setWindDown] = useState(getQueryStringVal("WindDown") != null ? true : false);
    const [WaterDown, setWaterDown] = useState(getQueryStringVal("WaterDown") != null ? true : false);
    const [EarthDown, setEarthDown] = useState(getQueryStringVal("EarthDown") != null ? true : false);
    const [HolyDown, setHolyDown] = useState(getQueryStringVal("HolyDown") != null ? true : false);
    const [DarkDown, setDarkDown] = useState(getQueryStringVal("DarkDown") != null ? true : false);
    const [MeleeDown, setMeleeDown] = useState(getQueryStringVal("MeleeDown") != null ? true : false);
    const [RangedDown, setRangedDown] = useState(getQueryStringVal("RangedDown") != null ? true : false);
    const [MagicDown, setMagicDown] = useState(getQueryStringVal("MagicDown") != null ? true : false);
    const [Instant, setInstant] = useState(getQueryStringVal("Instant") != null ? true : false);
    const [LastStand, setLastStand] = useState(getQueryStringVal("LastStand") != null ? true : false);
    const [Turn_Interrupter, setTurn_Interrupter] = useState(getQueryStringVal("Turn_Interrupter") != null ? true : false);
    const [Continuous_Turns, setContinuous_Turns] = useState(getQueryStringVal("Continuous_Turns") != null ? true : false);
    const [TurnManip, setTurnManip] = useState(getQueryStringVal("TurnManip") != null ? true : false);
    const [Buff_Extension, setBuff_Extension] = useState(getQueryStringVal("Buff_Extension") != null ? true : false);
    const [Self_Harm, setSelf_Harm] = useState(getQueryStringVal("Self_Harm") != null ? true : false);
    const [BRV_Damage_Resist, setBRV_Damage_Resist] = useState(getQueryStringVal("BRV_Damage_Resist") != null ? true : false);
    const [Trap, setTrap] = useState(getQueryStringVal("Trap") != null ? true : false)
    const [Trap_After_Trigger, setTrap_After_Trigger] = useState(getQueryStringVal("Trap_After_Trigger") != null ? true : false)
    const [Trap_Before_Turn, setTrap_Before_Turn] = useState(getQueryStringVal("Trap_Before_Turn") != null ? true : false)
    const [Counter, setCounter] = useState(getQueryStringVal("Counter") != null ? true : false)
    const [FollowUp, setFollowUp] = useState(getQueryStringVal("FollowUp") != null ? true : false)
    const [FollowUp_Extension, setFollowUp_Extension] = useState(getQueryStringVal("FollowUp_Extension") != null ? true : false)
    const [FollowUp_Action_On_Enemy, setFollowUp_Action_On_Enemy] = useState(getQueryStringVal("FollowUp_Action_On_Enemy") != null ? true : false)
    const [FollowUp_Start_Of_Next, setFollowUp_Start_Of_Next] = useState(getQueryStringVal("FollowUp_Start_Of_Next") != null ? true : false)
    const [FollowUp_Before_Player_Turn, setFollowUp_Before_Player_Turn] = useState(getQueryStringVal("FollowUp_Before_Player_Turn") != null ? true : false)
    const [FollowUp_Before_Ability, setFollowUp_Before_Ability] = useState(getQueryStringVal("FollowUp_Before_Ability") != null ? true : false)
    const [Blind, setBlind] = useState(getQueryStringVal("Blind") != null ? true : false)
    const [Target_Lock, setTarget_Lock] = useState(getQueryStringVal("Target_Lock") != null ? true : false)

    const [loop, setLoop] = useStateIfMounted(false);
    const [reverse, setReverse] = useState(getQueryStringVal("rev") != null ? true : false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchdisplay, setsearchdisplay] = useState("");
    const [merge, setMerge] = useState(getQueryStringVal("merge") != null ? true : false);
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

    const [aBuffsearch, setABuffsearch] = useQueryParam("aa", "");
    const [burstBuffsearch, setBurstBuffsearch] = useQueryParam("burst", "");
    const [call_75search, setcall_75search] = useQueryParam("call_75", "");
    const [call_ldsearch, setcall_ldsearch] = useQueryParam("call_ld", "");
    const [startingsearch, setStartingsearch] = useQueryParam("s1", "");
    const [s20search, setS20search] = useQueryParam("s2", "");
    const [ldsearch, setLDsearch] = useQueryParam("ld", "");
    const [frsearch, setFRsearch] = useQueryParam("fr", "");
    const [exsearch, setEXsearch] = useQueryParam("ex", "");
    const [bstatesearch, setbstatesearch] = useQueryParam("state", "");
    const [startsearch, setstartsearch] = useQueryParam("start", "");
    const [brvsearch, setbrvsearch] = useQueryParam("brv", "");
    const [hpsearch, sethpsearch] = useQueryParam("hp", "");
    const [buffssearch, setBuffssearch] = useQueryParam("buffs", "");
    const [debuffssearch, setDebuffssearch] = useQueryParam("debuffs", "");
    const [partysearch, setpartysearch] = useQueryParam("party", "");

    const [Breaksearch, setBreaksearch] = useQueryParam("Break", "")
    const [BreakCancelsearch, setBreakCancelsearch] = useQueryParam("BreakCancel", "")
    const [BreakPreventsearch, setBreakPreventsearch] = useQueryParam("BreakPrevent", "")
    const [BRVCapsearch, setBRVCapsearch] = useQueryParam("BRVCap", "")
    const [BRVFreezesearch, setBRVFreezesearch] = useQueryParam("BRVFreeze", "")
    const [Launch_Supportsearch, setLaunch_Supportsearch] = useQueryParam("Launch_Support", "")
    const [HP_Damage_Upsearch, setHP_Damage_Upsearch] = useQueryParam("HP_Damage_Up", "")
    const [BRV_Resist_Downsearch, setBRV_Resist_Downsearch] = useQueryParam("BRV_Resist_Down", "")
    const [Reviversearch, setReviversearch] = useQueryParam("Reviver", "")
    const [Gainssearch, setGainssearch] = useQueryParam("Gains", "")
    const [Refundsearch, setRefundsearch] = useQueryParam("Refund", "")
    const [BRVRegensearch, setBRVRegensearch] = useQueryParam("BRVRegen", "")
    const [BRVRetainsearch, setBRVRetainsearch] = useQueryParam("BRVRetain", "")
    const [StolenBRVsearch, setStolenBRVsearch] = useQueryParam("StolenBRV", "")
    const [BuffPreventsearch, setBuffPreventsearch] = useQueryParam("BuffPrevent", "")
    const [CappedBRVsearch, setCappedBRVsearch] = useQueryParam("CappedBRV", "")
    const [Cleansesearch, setCleansesearch] = useQueryParam("Cleanse", "")
    const [Coversearch, setCoversearch] = useQueryParam("Cover", "")
    const [CriticalUpsearch, setCriticalUpsearch] = useQueryParam("CriticalUp", "")
    const [CriticalRatesearch, setCriticalRatesearch] = useQueryParam("CriticalRate", "")
    const [DebuffResistsearch, setDebuffResistsearch] = useQueryParam("DebuffResist", "")
    const [IgnoreDEFsearch, setIgnoreDEFsearch] = useQueryParam("IgnoreDEF", "")
    const [Delaysearch, setDelaysearch] = useQueryParam("Delay", "")
    const [Deletesearch, setDeletesearch] = useQueryParam("Delete", "")
    const [Dispelsearch, setDispelsearch] = useQueryParam("Dispel", "")
    const [ElementalWeaksearch, setElementalWeaksearch] = useQueryParam("ElementalWeak", "")
    const [Firesearch, setFiresearch] = useQueryParam("Fire", "")
    const [Icesearch, setIcesearch] = useQueryParam("Ice", "")
    const [Thundersearch, setThundersearch] = useQueryParam("Thunder", "")
    const [Windsearch, setWindsearch] = useQueryParam("Wind", "")
    const [Watersearch, setWatersearch] = useQueryParam("Water", "")
    const [Earthsearch, setEarthsearch] = useQueryParam("Earth", "")
    const [Holysearch, setHolysearch] = useQueryParam("Holy", "")
    const [Darksearch, setDarksearch] = useQueryParam("Dark", "")
    const [Evadesearch, setEvadesearch] = useQueryParam("Evade", "")
    const [EXFillsearch, setEXFillsearch] = useQueryParam("EXFill", "")
    const [EXRatesearch, setEXRatesearch] = useQueryParam("EXRate", "")
    const [FreeUsesearch, setFreeUsesearch] = useQueryParam("FreeUse", "")
    const [FreeTurnsearch, setFreeTurnsearch] = useQueryParam("FreeTurn", "")
    const [StackedBuffsearch, setStackedBuffsearch] = useQueryParam("StackedBuff", "")
    const [StackedBuff5search, setStackedBuff5search] = useQueryParam("StackedBuff5", "")
    const [StackedDebuffsearch, setStackedDebuffsearch] = useQueryParam("StackedDebuff", "")
    const [StackedDebuff5search, setStackedDebuff5search] = useQueryParam("StackedDebuff5", "")
    const [DMGShieldsearch, setDMGShieldsearch] = useQueryParam("DMGShield", "")
    const [GoldDebuffsearch, setGoldDebuffsearch] = useQueryParam("GoldDebuff", "")
    const [GoldBuffsearch, setGoldBuffsearch] = useQueryParam("GoldBuff", "")
    const [SpecialBuffsearch, setSpecialBuffsearch] = useQueryParam("SpecialBuff", "")
    const [AddHPsearch, setAddHPsearch] = useQueryParam("AddHP", "")
    const [MAXBRVCapsearch, setMAXBRVCapsearch] = useQueryParam("MAXBRVCap", "")
    const [HPResistUpsearch, setHPResistUpsearch] = useQueryParam("HPResistUp", "")
    const [HPResistDownsearch, setHPResistDownsearch] = useQueryParam("HPResistDown", "")
    const [BRVPoisonsearch, setBRVPoisonsearch] = useQueryParam("BRVPoison", "")
    const [HPPoisonsearch, setHPPoisonsearch] = useQueryParam("HPPoison", "")
    const [HPHealsearch, setHPHealsearch] = useQueryParam("HPHeal", "")
    const [HPRegensearch, setHPRegensearch] = useQueryParam("HPRegen", "")
    const [Disablesearch, setDisablesearch] = useQueryParam("Disable", "")
    const [FireDownsearch, setFireDownsearch] = useQueryParam("FireDown", "")
    const [IceDownsearch, setIceDownsearch] = useQueryParam("IceDown", "")
    const [ThunderDownsearch, setThunderDownsearch] = useQueryParam("ThunderDown", "")
    const [WindDownsearch, setWindDownsearch] = useQueryParam("WindDown", "")
    const [WaterDownsearch, setWaterDownsearch] = useQueryParam("WaterDown", "")
    const [EarthDownsearch, setEarthDownsearch] = useQueryParam("EarthDown", "")
    const [HolyDownsearch, setHolyDownsearch] = useQueryParam("HolyDown", "")
    const [DarkDownsearch, setDarkDownsearch] = useQueryParam("DarkDown", "")
    const [MeleeDownsearch, setMeleeDownsearch] = useQueryParam("MeleeDown", "")
    const [RangedDownsearch, setRangedDownsearch] = useQueryParam("RangedDown", "")
    const [MagicDownsearch, setMagicDownsearch] = useQueryParam("MagicDown", "")
    const [Instantsearch, setInstantsearch] = useQueryParam("Instant", "")
    const [LastStandsearch, setLastStandsearch] = useQueryParam("LastStand", "")
    const [Turn_Interruptersearch, setTurn_Interruptersearch] = useQueryParam("Turn_Interrupter", "")
    const [Continuous_Turnssearch, setContinuous_Turnssearch] = useQueryParam("Continuous_Turns", "")
    const [TurnManipsearch, setTurnManipsearch] = useQueryParam("TurnManip", "")
    const [mergesearch, setMergesearch] = useQueryParam("merge", "");
    const [Buff_Extensionsearch, setBuff_Extensionsearch] = useQueryParam("Buff_Extension", "");
    const [Self_Harmsearch, setSelf_Harmsearch] = useQueryParam("Self_Harm", "");
    const [BRV_Damage_Resistsearch, setBRV_Damage_Resistsearch] = useQueryParam("BRV_Damage_Resist", "");
    const [Trapsearch, setTrapsearch] = useQueryParam("Trap", "")
    const [Trap_After_Triggersearch, setTrap_After_Triggersearch] = useQueryParam("Trap_After_Trigger", "")
    const [Trap_Before_Turnsearch, setTrap_Before_Turnsearch] = useQueryParam("Trap_Before_Turn", "")
    const [Countersearch, setCountersearch] = useQueryParam("Counter", "")
    const [FollowUpsearch, setFollowUpsearch] = useQueryParam("FollowUp", "")
    const [FollowUp_Extensionsearch, setFollowUp_Extensionsearch] = useQueryParam("FollowUp_Extension", "")
    const [FollowUp_Action_On_Enemysearch, setFollowUp_Action_On_Enemysearch] = useQueryParam("FollowUp_Action_On_Enemy", "")
    const [FollowUp_Start_Of_Nextsearch, setFollowUp_Start_Of_Nextsearch] = useQueryParam("FollowUp_Start_Of_Next", "")
    const [FollowUp_Before_Player_Turnsearch, setFollowUp_Before_Player_Turnsearch] = useQueryParam("FollowUp_Before_Player_Turn", "")
    const [FollowUp_Before_Abilitysearch, setFollowUp_Before_Abilitysearch] = useQueryParam("FollowUp_Before_Ability", "")
    const [Blindsearch, setBlindsearch] = useQueryParam("Blind", "")
    const [Target_Locksearch, setTarget_Locksearch] = useQueryParam("Target_Lock", "")

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
            const ID_PULL = Object.values(char_id).filter(self => self.CharacterName == getQueryStringVal("Char"))
            const match_id = ID_PULL[0] && ID_PULL[0].CharID
            const filteredtype = ProcessedBuffs.filter(self => self.chara_id == match_id)
            if (filteredtype.length != 0) {
                setTypesearch(getQueryStringVal("Char"))
                setCondFilter(filteredtype[0].chara_id)
            } else {
                setTypesearch("")
                setCondFilter("")
            }
        }
    }, [setCondFilter, ProcessedBuffs, Typesearch, setTypesearch, char_id])

    useEffect(() => {
        //search params
        if (getQueryStringVal("search") != null) {
            setSearchTerm(getQueryStringVal("search") != null ? getQueryStringVal("search").toLowerCase() : "")
            setTEXTsearch(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
            setsearchdisplay(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
        }
    }, [setTEXTsearch, setFiltersearch])

    //filter non-merge
    useEffect(() => {
        if (merge == false) {
            var filterholder = [];

            if (buffs == true) {
                const filteredout = rawData.filter(
                    (ef) => ef.is_buff == 1
                );
                filterholder.push(...filteredout);
            }
            if (debuffs == true) {
                const filteredout = rawData.filter(
                    (ef) => ef.is_buff == 0
                );
                filterholder.push(...filteredout);
            }
            if (bstate == true) {
                const filteredout = rawData.filter(
                    (ef) => ef.state == true
                );
                filterholder.push(...filteredout);
            }
            if (start == true) {
                const filteredout = rawData.filter(
                    (ef) => ef.start == true
                );
                filterholder.push(...filteredout);
            }
            if (brv == true) {
                const filteredout = rawData.filter(
                    (ef) => ef.BRV == true
                );
                filterholder.push(...filteredout);
            }
            if (hp == true) {
                const filteredout = rawData.filter(
                    (ef) => ef.HP == true
                );
                filterholder.push(...filteredout);
            }
            if (call_75 == true) {
                const filteredout = rawData.filter(
                    (ef) => ef.Call_75 == true
                );
                filterholder.push(...filteredout);
            }
            if (call_ld == true) {
                const filteredout = rawData.filter(
                    (ef) => ef.Call_LD == true
                );
                filterholder.push(...filteredout);
            }
            if (aBuff == true) {
                const filteredout = rawData.filter(
                    (ef) => ef.AA == true
                );
                filterholder.push(...filteredout);
            }
            if (starting == true) {
                const filteredout = rawData.filter(
                    (ef) => ef.S1 == true
                );
                filterholder.push(...filteredout);
            }
            if (s20 == true) {
                const filteredout = rawData.filter(
                    (ef) => ef.S2 == true
                );
                filterholder.push(...filteredout);
            }
            if (ex == true) {
                const filteredout = rawData.filter(
                    (ef) => ef.EX == true
                );
                filterholder.push(...filteredout);
            }
            if (ld == true) {
                const filteredout = rawData.filter(
                    (ef) => ef.LD == true
                );
                filterholder.push(...filteredout);
            }
            if (fr == true) {
                const filteredout = rawData.filter(
                    (ef) => ef.FR == true
                );
                filterholder.push(...filteredout);
            }
            if (burstBuff == true) {
                const filteredout = rawData.filter(
                    (ef) => ef.BT == true
                );
                filterholder.push(...filteredout);
            }

            //advanced
            if (party != true) {
                if (Break == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Force_Break == true
                    );
                    filterholder.push(...filteredout)
                }
                if (BreakCancel == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Break_Reset == true
                    );
                    filterholder.push(...filteredout)
                }
                if (BreakPrevent == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Cannot_Break == true
                    );
                    filterholder.push(...filteredout)
                }
                if (BRVCap == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.BRVCap == true
                    );
                    filterholder.push(...filteredout)
                }
                if (BRVFreeze == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.BRV_Control == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Launch_Support == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Launch_Support == true
                    );
                    filterholder.push(...filteredout)
                }
                if (HP_Damage_Up == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.HP_Damage_Up_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Gains == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Gains == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Refund == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Refund == true
                    );
                    filterholder.push(...filteredout)
                }
                if (BRVRegen == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.BRV_Regen == true
                    );
                    filterholder.push(...filteredout)
                }
                if (BRVRetain == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.BRVRetain == true
                    );
                    filterholder.push(...filteredout)
                }
                if (StolenBRV == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.StolenBRV == true
                    );
                    filterholder.push(...filteredout)
                }
                if (BuffPrevent == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.BuffPrevent == true
                    );
                    filterholder.push(...filteredout)
                }
                if (CappedBRV == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.BRV_Damage_Cap == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Cleanse == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Cleanse == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Cover == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Cover == true
                    );
                    filterholder.push(...filteredout)
                }
                if (CriticalUp == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.CriticalUp == true
                    );
                    filterholder.push(...filteredout)
                }
                if (CriticalRate == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Crit_Rate_Up == true
                    );
                    filterholder.push(...filteredout)
                }
                if (DebuffResist == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Debuff_Evade == true
                    );
                    filterholder.push(...filteredout)
                }
                if (IgnoreDEF == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Ignore_DEF == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Delay == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Delay == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Delete == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Delete_Turns == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Dispel == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Dispel == true
                    );
                    filterholder.push(...filteredout)
                }
                if (ElementalWeak == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.ElementalWeak == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Fire == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Fire_Enchant == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Ice == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Ice_Enchant == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Thunder == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Thunder_Enchant == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Wind == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Wind_Enchant == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Water == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Water_Enchant == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Earth == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Earth_Enchant == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Holy == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Holy_Enchant == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Dark == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Dark_Enchant == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Evade == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Evade == true
                    );
                    filterholder.push(...filteredout)
                }
                if (EXFill == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.EX_MAX == true
                    );
                    filterholder.push(...filteredout)
                }
                if (EXRate == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.EXRate == true
                    );
                    filterholder.push(...filteredout)
                }
                if (FreeUse == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Free_Ability == true
                    );
                    filterholder.push(...filteredout)
                }
                if (FreeTurn == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.FreeTurn == true
                    );
                    filterholder.push(...filteredout)
                }
                if (StackedBuff == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Stacked_Buff == true
                    );
                    filterholder.push(...filteredout)
                }
                if (StackedBuff5 == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Stacked_Buff_Five == true
                    );
                    filterholder.push(...filteredout)
                }
                if (StackedDebuff == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Stacked_Debuff == true
                    );
                    filterholder.push(...filteredout)
                }
                if (StackedDebuff5 == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Stacked_Debuff_Five == true
                    );
                    filterholder.push(...filteredout)
                }
                if (DMGShield == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.BRV_Shield == true
                    );
                    filterholder.push(...filteredout)
                }

                if (GoldDebuff == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Debuff_Gold == true
                    );
                    filterholder.push(...filteredout)
                }
                if (GoldBuff == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Buff_Gold == true
                    );
                    filterholder.push(...filteredout)
                }
                if (SpecialBuff == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Special_Buff == true
                    );
                    filterholder.push(...filteredout)
                }
                if (AddHP == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.AddHP == true
                    );
                    filterholder.push(...filteredout)
                }
                if (MAXBRVCap == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.MAXBRVCap == true
                    );
                    filterholder.push(...filteredout)
                }
                if (HPResistUp == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.HP_Damage_Resist == true
                    );
                    filterholder.push(...filteredout)
                }
                if (HPResistDown == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.HP_Resist_Down == true
                    );
                    filterholder.push(...filteredout)
                }
                if (BRV_Resist_Down == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.BRV_Resist_Down == true
                    );
                    filterholder.push(...filteredout)
                }
                if (BRVPoison == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.BRV_Poison == true
                    );
                    filterholder.push(...filteredout)
                }
                if (HPPoison == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.HP_Poison == true
                    );
                    filterholder.push(...filteredout)
                }
                if (HPHeal == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.HPHealBuff == true
                    );
                    filterholder.push(...filteredout)
                }
                if (HPRegen == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.HP_Regen == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Disable == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Disable == true
                    );
                    filterholder.push(...filteredout)
                }
                if (FireDown == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Fire_Imperil == true
                    );
                    filterholder.push(...filteredout)
                }
                if (IceDown == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Ice_Imperil == true
                    );
                    filterholder.push(...filteredout)
                }
                if (ThunderDown == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Thunder_Imperil == true
                    );
                    filterholder.push(...filteredout)
                }
                if (WindDown == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Wind_Imperil == true
                    );
                    filterholder.push(...filteredout)
                }
                if (WaterDown == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Water_Imperil == true
                    );
                    filterholder.push(...filteredout)
                }
                if (EarthDown == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Earth_Imperil == true
                    );
                    filterholder.push(...filteredout)
                }
                if (HolyDown == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Holy_Imperil == true
                    );
                    filterholder.push(...filteredout)
                }
                if (DarkDown == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Dark_Imperil == true
                    );
                    filterholder.push(...filteredout)
                }
                if (MeleeDown == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Melee_Imperil == true
                    );
                    filterholder.push(...filteredout)
                }
                if (RangedDown == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Ranged_Imperil == true
                    );
                    filterholder.push(...filteredout)
                }
                if (MagicDown == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Magic_Imperil == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Instant == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Instant == true
                    );
                    filterholder.push(...filteredout)
                }
                if (LastStand == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.KO_Prevent == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Turn_Interrupter == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Turn_Interrupter == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Continuous_Turns == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Continuous_Turns == true
                    );
                    filterholder.push(...filteredout)
                }
                if (TurnManip == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Ally_Turn_Manipulator == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Reviver == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Reviver == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Buff_Extension == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Buff_Extension == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Self_Harm == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Self_Harm == true
                    );
                    filterholder.push(...filteredout)
                }
                if (BRV_Damage_Resist == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.BRV_Damage_Resist == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Trap == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Trap == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Trap_After_Trigger == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Trap_After_Trigger == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Trap_Before_Turn == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Trap_Before_Turn == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Counter == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Counter == true
                    );
                    filterholder.push(...filteredout)
                }
                if (FollowUp == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.FollowUp == true
                    );
                    filterholder.push(...filteredout)
                }
                if (FollowUp_Extension == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.FollowUp_Extension == true
                    );
                    filterholder.push(...filteredout)
                }
                if (FollowUp_Action_On_Enemy == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.FollowUp_Action_On_Enemy == true
                    );
                    filterholder.push(...filteredout)
                }
                if (FollowUp_Start_Of_Next == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.FollowUp_Start_Of_Next == true
                    );
                    filterholder.push(...filteredout)
                }
                if (FollowUp_Before_Player_Turn == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.FollowUp_Before_Player_Turn == true
                    );
                    filterholder.push(...filteredout)
                }
                if (FollowUp_Before_Ability == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.FollowUp_Before_Ability == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Blind == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Blind == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Target_Lock == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Target_Lock == true
                    );
                    filterholder.push(...filteredout)
                }
            }

            //party
            if (party == true) {
                if (Break == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Force_Break_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (BreakCancel == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Break_Reset_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (BreakPrevent == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Cannot_Break_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (BRVCap == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.BRVCap_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (BRVFreeze == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.BRV_Control_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Launch_Support == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Launch_Support_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (HP_Damage_Up == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.HP_Damage_Up_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Gains == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Gains_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Refund == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Refund_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (BRVRegen == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.BRV_Regen_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (BRVRetain == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.BRVRetain_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (StolenBRV == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.StolenBRV_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (BuffPrevent == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.BuffPrevent_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (CappedBRV == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.BRV_Damage_Cap_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Cleanse == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Cleanse_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Cover == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Cover_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (CriticalUp == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.CriticalUp_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (CriticalRate == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Crit_Rate_Up_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (DebuffResist == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Debuff_Evade_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (IgnoreDEF == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Ignore_DEF_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Delay == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Delay_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Delete == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Delete_Turns_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Dispel == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Dispel_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (ElementalWeak == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.ElementalWeak_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Fire == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Fire_Enchant_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Ice == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Ice_Enchant_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Thunder == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Thunder_Enchant_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Wind == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Wind_Enchant_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Water == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Water_Enchant_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Earth == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Earth_Enchant_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Holy == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Holy_Enchant_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Dark == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Dark_Enchant_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Evade == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Evade_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (EXFill == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.EX_MAX_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (EXRate == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.EXRate_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (FreeUse == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Free_Ability_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (FreeTurn == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.FreeTurn_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (StackedBuff == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Stacked_Buff_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (StackedBuff5 == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Stacked_Buff_Five_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (StackedDebuff == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Stacked_Debuff_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (StackedDebuff5 == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Stacked_Debuff_Five_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (DMGShield == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.BRV_Shield_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (GoldDebuff == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Debuff_Gold_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (GoldBuff == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Buff_Gold_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (SpecialBuff == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Special_Buff_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (AddHP == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.AddHP_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (MAXBRVCap == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.MAXBRVCap_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (HPResistUp == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.HP_Damage_Resist_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (HPResistDown == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.HP_Resist_Down_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (BRV_Resist_Down == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.BRV_Resist_Down_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (BRVPoison == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.BRV_Poison_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (HPPoison == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.HP_Poison_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (HPHeal == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.HPHealBuff_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (HPRegen == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.HP_Regen_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Disable == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Disable_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (FireDown == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Fire_Imperil_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (IceDown == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Ice_Imperil_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (ThunderDown == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.ThunderDown_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (WindDown == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Wind_Imperil_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (WaterDown == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Water_Imperil_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (EarthDown == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Earth_Imperil_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (HolyDown == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Holy_Imperil_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (DarkDown == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Dark_Imperil_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (MeleeDown == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Melee_Imperil_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (RangedDown == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Ranged_Imperil_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (MagicDown == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Magic_Imperil_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Instant == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Instant_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (LastStand == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.KO_Prevent_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Turn_Interrupter == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Turn_Interrupter_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Continuous_Turns == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Continuous_Turns_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (TurnManip == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Ally_Turn_Manipulator_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Reviver == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Reviver_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Buff_Extension == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Buff_Extension_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Self_Harm == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Self_Harm_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (BRV_Damage_Resist) {
                    const filteredout = rawData.filter(
                        (ef) => ef.BRV_Damage_Resist_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Trap == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Trap_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Trap_After_Trigger == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Trap_After_Trigger_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Trap_Before_Turn == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Trap_Before_Turn_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Counter == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Counter_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (FollowUp == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.FollowUp_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (FollowUp_Extension == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.FollowUp_Extension_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (FollowUp_Action_On_Enemy == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.FollowUp_Action_On_Enemy_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (FollowUp_Start_Of_Next == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.FollowUp_Start_Of_Next_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (FollowUp_Before_Player_Turn == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.FollowUp_Before_Player_Turn_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (FollowUp_Before_Ability == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.FollowUp_Before_Ability_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Blind == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Blind_Party == true
                    );
                    filterholder.push(...filteredout)
                }
                if (Target_Lock == true) {
                    const filteredout = rawData.filter(
                        (ef) => ef.Target_Lock_Party == true
                    );
                    filterholder.push(...filteredout)
                }
            }

            if (filterholder.length === 0) {
                filterholder.push(...rawData);
            }

            if (condFilter != "") {
                filterholder = filterholder.filter(
                    (ef) => ef.chara_id == condFilter
                );
            }

            const makeUnique = filterholder
                .filter(onlyUnique)
                .sort((a, b) =>
                    reverse === false ?
                        a.order - b.order :
                        b.order - a.order
                );
            const searchit = searchTerm == "" ? makeUnique : makeUnique.filter((buff) =>
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
        }
    }, [merge, rawData, limits, searchTerm, reverse, condFilter, party, start, brv, hp, Launch_Support, Target_Lock, Blind, BRV_Damage_Resist, HP_Damage_Up, Trap, Trap_After_Trigger, Trap_Before_Turn, Counter, FollowUp, FollowUp_Extension, FollowUp_Action_On_Enemy, FollowUp_Start_Of_Next, FollowUp_Before_Player_Turn, FollowUp_Before_Ability, Self_Harm, Buff_Extension, BRV_Resist_Down, Reviver, aBuff, bstate, buffs, Turn_Interrupter, Continuous_Turns, DMGShield, StackedBuff, StackedBuff5, StackedDebuff, StackedDebuff5, SpecialBuff, burstBuff, call_ld, call_75, debuffs, ex, GoldBuff, fr, ld, s20, starting, Break, BreakCancel, BreakPrevent, BRVCap, BRVFreeze, Gains, Refund, BRVRegen, BRVRetain, StolenBRV, BuffPrevent, CappedBRV, Cleanse, Cover, CriticalUp, CriticalRate, DebuffResist, IgnoreDEF, Delay, Delete, Dispel, ElementalWeak, Fire, Ice, Thunder, Wind, Water, Earth, Holy, Dark, Evade, EXFill, EXRate, FreeUse, FreeTurn, GoldDebuff, AddHP, MAXBRVCap, HPResistUp, HPResistDown, BRVPoison, HPPoison, HPHeal, HPRegen, Disable, FireDown, IceDown, ThunderDown, WindDown, WaterDown, EarthDown, HolyDown, DarkDown, MeleeDown, RangedDown, MagicDown, Instant, LastStand, TurnManip])

    //filter merge
    useEffect(() => {
        if (merge == true) {
            const filterholder = [];
            var buff_debuff = undefined
            if (buffs == true) {
                buff_debuff = 1
            }
            if (debuffs == true) {
                buff_debuff = "0"
            }

            if (bstate == true) {
                const filteredout = rawData.filter(
                    (ef) => ef.state == true
                );
                filterholder.push(...filteredout);
            }
            if (start == true) {
                const filteredout = rawData.filter(
                    (ef) => ef.start == true
                );
                filterholder.push(...filteredout);
            }
            if (brv == true) {
                const filteredout = rawData.filter(
                    (ef) => ef.BRV == true
                );
                filterholder.push(...filteredout);
            }
            if (hp == true) {
                const filteredout = rawData.filter(
                    (ef) => ef.HP == true
                );
                filterholder.push(...filteredout);
            }
            if (call_75 == true) {
                const filteredout = rawData.filter(
                    (ef) => ef.Call_75 == true
                );
                filterholder.push(...filteredout);
            }
            if (call_ld == true) {
                const filteredout = rawData.filter(
                    (ef) => ef.Call_LD == true
                );
                filterholder.push(...filteredout);
            }
            if (aBuff == true) {
                const filteredout = rawData.filter(
                    (ef) => ef.AA == true
                );
                filterholder.push(...filteredout);
            }
            if (starting == true) {
                const filteredout = rawData.filter(
                    (ef) => ef.S1 == true
                );
                filterholder.push(...filteredout);
            }
            if (s20 == true) {
                const filteredout = rawData.filter(
                    (ef) => ef.S2 == true
                );
                filterholder.push(...filteredout);
            }
            if (ex == true) {
                const filteredout = rawData.filter(
                    (ef) => ef.EX == true
                );
                filterholder.push(...filteredout);
            }
            if (ld == true) {
                const filteredout = rawData.filter(
                    (ef) => ef.LD == true
                );
                filterholder.push(...filteredout);
            }
            if (fr == true) {
                const filteredout = rawData.filter(
                    (ef) => ef.FR == true
                );
                filterholder.push(...filteredout);
            }
            if (burstBuff == true) {
                const filteredout = rawData.filter(
                    (ef) => ef.BT == true
                );
                filterholder.push(...filteredout);
            }

            if (filterholder.length === 0) {
                filterholder.push(...rawData);
            }

            var charType = {}
            if (party == false) {
                charType = {
                    chara_id: condFilter != "" ? condFilter : undefined,
                    is_buff: buff_debuff,

                    //AA: aBuff != true ? undefined : aBuff,
                    //BRV: brv != true ? undefined : brv,
                    //HP: hp != true ? undefined : hp,
                    //state: bstate != true ? undefined : bstate,
                    //start: start != true ? undefined : start,
                    //BT: burstBuff != true ? undefined : burstBuff,
                    //Call_LD: call_ld != true ? undefined : call_ld,
                    //Call_75: call_75 != true ? undefined : call_75,
                    //EX: ex != true ? undefined : ex,
                    //FR: fr != true ? undefined : fr,
                    //LD: ld != true ? undefined : ld,
                    //S2: s20 != true ? undefined : s20,
                    //S1: starting != true ? undefined : starting,

                    Force_Break: Break != true ? undefined : Break,
                    Break_Reset: BreakCancel != true ? undefined : BreakCancel,
                    Cannot_Break: BreakPrevent != true ? undefined : BreakPrevent,
                    BRVCap: BRVCap != true ? undefined : BRVCap,
                    BRV_Control: BRVFreeze != true ? undefined : BRVFreeze,
                    Launch_Support: Launch_Support != true ? undefined : Launch_Support,
                    HP_Damage_Up_Party: HP_Damage_Up != true ? undefined : HP_Damage_Up,
                    Reviver: Reviver != true ? undefined : Reviver,
                    Gains: Gains != true ? undefined : Gains,
                    Refund: Refund != true ? undefined : Refund,
                    BRV_Regen: BRVRegen != true ? undefined : BRVRegen,
                    BRVRetain: BRVRetain != true ? undefined : BRVRetain,
                    StolenBRV: StolenBRV != true ? undefined : StolenBRV,
                    BuffPrevent: BuffPrevent != true ? undefined : BuffPrevent,
                    BRV_Damage_Cap: CappedBRV != true ? undefined : CappedBRV,
                    Cleanse: Cleanse != true ? undefined : Cleanse,
                    Cover: Cover != true ? undefined : Cover,
                    CriticalUp: CriticalUp != true ? undefined : CriticalUp,
                    Crit_Rate_Up: CriticalRate != true ? undefined : CriticalRate,
                    Debuff_Evade: DebuffResist != true ? undefined : DebuffResist,
                    Ignore_DEF: IgnoreDEF != true ? undefined : IgnoreDEF,
                    Delay: Delay != true ? undefined : Delay,
                    Delete_Turns: Delete != true ? undefined : Delete,
                    Dispel: Dispel != true ? undefined : Dispel,
                    ElementalWeak: ElementalWeak != true ? undefined : ElementalWeak,
                    Fire_Enchant: Fire != true ? undefined : Fire,
                    Ice_Enchant: Ice != true ? undefined : Ice,
                    Thunder_Enchant: Thunder != true ? undefined : Thunder,
                    Wind_Enchant: Wind != true ? undefined : Wind,
                    Water_Enchant: Water != true ? undefined : Water,
                    Earth_Enchant: Earth != true ? undefined : Earth,
                    Holy_Enchant: Holy != true ? undefined : Holy,
                    Dark_Enchant: Dark != true ? undefined : Dark,
                    Evade: Evade != true ? undefined : Evade,
                    EX_MAX: EXFill != true ? undefined : EXFill,
                    EXRate: EXRate != true ? undefined : EXRate,
                    Free_Ability: FreeUse != true ? undefined : FreeUse,
                    FreeTurn: FreeTurn != true ? undefined : FreeTurn,
                    Stacked_Debuff: StackedDebuff != true ? undefined : StackedDebuff,
                    Stacked_Debuff_Five: StackedDebuff5 != true ? undefined : StackedDebuff5,
                    Stacked_Buff: StackedBuff != true ? undefined : StackedBuff,
                    Stacked_Buff_Five: StackedBuff5 != true ? undefined : StackedBuff5,
                    Debuff_Gold: GoldDebuff != true ? undefined : GoldDebuff,
                    Buff_Gold: GoldBuff != true ? undefined : GoldBuff,
                    BRV_Shield: DMGShield != true ? undefined : DMGShield,
                    Special_Buff: SpecialBuff != true ? undefined : SpecialBuff,
                    AddHP: AddHP != true ? undefined : AddHP,
                    MAXBRVCap: MAXBRVCap != true ? undefined : MAXBRVCap,
                    HP_Damage_Resist: HPResistUp != true ? undefined : HPResistUp,
                    HP_Resist_Down: HPResistDown != true ? undefined : HPResistDown,
                    BRV_Resist_Down: BRV_Resist_Down != true ? undefined : BRV_Resist_Down,
                    BRV_Poison: BRVPoison != true ? undefined : BRVPoison,
                    HP_Poison: HPPoison != true ? undefined : HPPoison,
                    HPHealBuff: HPHeal != true ? undefined : HPHeal,
                    HP_Regen: HPRegen != true ? undefined : HPRegen,
                    Disable: Disable != true ? undefined : Disable,
                    Fire_Imperil: FireDown != true ? undefined : FireDown,
                    Ice_Imperil: IceDown != true ? undefined : IceDown,
                    Thunder_Imperil: ThunderDown != true ? undefined : ThunderDown,
                    Wind_Imperil: WindDown != true ? undefined : WindDown,
                    Water_Imperil: WaterDown != true ? undefined : WaterDown,
                    Earth_Imperil: EarthDown != true ? undefined : EarthDown,
                    Holy_Imperil: HolyDown != true ? undefined : HolyDown,
                    Dark_Imperil: DarkDown != true ? undefined : DarkDown,
                    Melee_Imperil: MeleeDown != true ? undefined : MeleeDown,
                    Ranged_Imperil: RangedDown != true ? undefined : RangedDown,
                    Magic_Imperil: MagicDown != true ? undefined : MagicDown,
                    Instant: Instant != true ? undefined : Instant,
                    KO_Prevent: LastStand != true ? undefined : LastStand,
                    Turn_Interrupter: Turn_Interrupter != true ? undefined : Turn_Interrupter,
                    Continuous_Turns: Continuous_Turns != true ? undefined : Continuous_Turns,
                    Ally_Turn_Manipulator: TurnManip != true ? undefined : TurnManip,
                    Buff_Extension: Buff_Extension != true ? undefined : Buff_Extension,
                    Self_Harm: Self_Harm != true ? undefined : Self_Harm,
                    BRV_Damage_Resist: BRV_Damage_Resist != true ? undefined : BRV_Damage_Resist,
                    Trap: Trap != true ? undefined : Trap,
                    Trap_After_Trigger: Trap_After_Trigger != true ? undefined : Trap_After_Trigger,
                    Trap_Before_Turn: Trap_Before_Turn != true ? undefined : Trap_Before_Turn,
                    Counter: Counter != true ? undefined : Counter,
                    FollowUp: FollowUp != true ? undefined : FollowUp,
                    FollowUp_Extension: FollowUp_Extension != true ? undefined : FollowUp_Extension,
                    FollowUp_Action_On_Enemy: FollowUp_Action_On_Enemy != true ? undefined : FollowUp_Action_On_Enemy,
                    FollowUp_Start_Of_Next: FollowUp_Start_Of_Next != true ? undefined : FollowUp_Start_Of_Next,
                    FollowUp_Before_Player_Turn: FollowUp_Before_Player_Turn != true ? undefined : FollowUp_Before_Player_Turn,
                    FollowUp_Before_Ability: FollowUp_Before_Ability != true ? undefined : FollowUp_Before_Ability,
                    Blind: Blind != true ? undefined : Blind,
                    Target_Lock: Target_Lock != true ? undefined : Target_Lock,
                }
            }
            if (party == true) {
                charType = {
                    chara_id: condFilter != "" ? condFilter : undefined,
                    is_buff: buff_debuff,

                    //AA: aBuff != true ? undefined : aBuff,
                    //BRV: brv != true ? undefined : brv,
                    //HP: hp != true ? undefined : hp,
                    //state: bstate != true ? undefined : bstate,
                    //start: start != true ? undefined : start,
                    //BT: burstBuff != true ? undefined : burstBuff,
                    //Call_LD: call_ld != true ? undefined : call_ld,
                    //Call_75: call_75 != true ? undefined : call_75,
                    //EX: ex != true ? undefined : ex,
                    //FR: fr != true ? undefined : fr,
                    //LD: ld != true ? undefined : ld,
                    //S2: s20 != true ? undefined : s20,
                    //S1: starting != true ? undefined : starting,

                    Force_Break_Party: Break != true ? undefined : Break,
                    Break_Reset_Party: BreakCancel != true ? undefined : BreakCancel,
                    Cannot_Break_Party: BreakPrevent != true ? undefined : BreakPrevent,
                    BRVCap_Party: BRVCap != true ? undefined : BRVCap,
                    BRV_Control_Party: BRVFreeze != true ? undefined : BRVFreeze,
                    Gains_Party: Gains != true ? undefined : Gains,
                    Launch_Support_Party: Launch_Support != true ? undefined : Launch_Support,
                    HP_Damage_Up_Party: HP_Damage_Up != true ? undefined : HP_Damage_Up,
                    BRV_Resist_Down_Party: BRV_Resist_Down != true ? undefined : BRV_Resist_Down,
                    Reviver_Party: Reviver != true ? undefined : Reviver,
                    Refund_Party: Refund != true ? undefined : Refund,
                    BRV_Regen_Party: BRVRegen != true ? undefined : BRVRegen,
                    BRVRetain_Party: BRVRetain != true ? undefined : BRVRetain,
                    StolenBRV_Party: StolenBRV != true ? undefined : StolenBRV,
                    BuffPrevent_Party: BuffPrevent != true ? undefined : BuffPrevent,
                    BRV_Damage_Cap_Party: CappedBRV != true ? undefined : CappedBRV,
                    Cleanse_Party: Cleanse != true ? undefined : Cleanse,
                    Cover_Party: Cover != true ? undefined : Cover,
                    CriticalUp_Party: CriticalUp != true ? undefined : CriticalUp,
                    Crit_Rate_UpCriticalRate_Party: CriticalRate != true ? undefined : CriticalRate,
                    Debuff_Evade_Party: DebuffResist != true ? undefined : DebuffResist,
                    Ignore_DEF_Party: IgnoreDEF != true ? undefined : IgnoreDEF,
                    Delay_Party: Delay != true ? undefined : Delay,
                    Delete_Turns_Party: Delete != true ? undefined : Delete,
                    Dispel_Party: Dispel != true ? undefined : Dispel,
                    ElementalWeak_Party: ElementalWeak != true ? undefined : ElementalWeak,
                    Fire_Enchant_Party: Fire != true ? undefined : Fire,
                    Ice_Enchant_Party: Ice != true ? undefined : Ice,
                    Thunder_Enchant_Party: Thunder != true ? undefined : Thunder,
                    Wind_Enchant_Party: Wind != true ? undefined : Wind,
                    Water_Enchant_Party: Water != true ? undefined : Water,
                    Earth_Enchant_Party: Earth != true ? undefined : Earth,
                    Holy_Enchant_Party: Holy != true ? undefined : Holy,
                    Dark_Enchant_Party: Dark != true ? undefined : Dark,
                    Evade_Party: Evade != true ? undefined : Evade,
                    EX_MAX_Party: EXFill != true ? undefined : EXFill,
                    EXRate_Party: EXRate != true ? undefined : EXRate,
                    Free_Ability_Party: FreeUse != true ? undefined : FreeUse,
                    FreeTurn_Party: FreeTurn != true ? undefined : FreeTurn,
                    Stacked_Debuff_Party: StackedDebuff != true ? undefined : StackedDebuff,
                    Stacked_Debuff_Five_Party: StackedDebuff5 != true ? undefined : StackedDebuff5,
                    Stacked_Buff_Party: StackedBuff != true ? undefined : StackedBuff,
                    Stacked_Buff_Five_Party: StackedBuff5 != true ? undefined : StackedBuff5,
                    Debuff_Gold_Party: GoldDebuff != true ? undefined : GoldDebuff,
                    Buff_Gold_Party: GoldBuff != true ? undefined : GoldBuff,
                    Special_Buff_party: SpecialBuff != true ? undefined : SpecialBuff,
                    BRV_Shield_Party: DMGShield != true ? undefined : DMGShield,
                    AddHP_Party: AddHP != true ? undefined : AddHP,
                    MAXBRVCap_Party: MAXBRVCap != true ? undefined : MAXBRVCap,
                    HP_Damage_Resist_Party: HPResistUp != true ? undefined : HPResistUp,
                    HP_Resist_Down_Party: HPResistDown != true ? undefined : HPResistDown,
                    BRV_Poison_Party: BRVPoison != true ? undefined : BRVPoison,
                    HP_Poison_Party: HPPoison != true ? undefined : HPPoison,
                    HPHealBuff_Party: HPHeal != true ? undefined : HPHeal,
                    HP_Regen_Party: HPRegen != true ? undefined : HPRegen,
                    Disable_Party: Disable != true ? undefined : Disable,
                    Fire_Imperil_Party: FireDown != true ? undefined : FireDown,
                    Ice_Imperil_Party: IceDown != true ? undefined : IceDown,
                    Thunder_Imperil_Party: ThunderDown != true ? undefined : ThunderDown,
                    Wind_Imperil_Party: WindDown != true ? undefined : WindDown,
                    Water_Imperil_Party: WaterDown != true ? undefined : WaterDown,
                    Earth_Imperil_Party: EarthDown != true ? undefined : EarthDown,
                    Holy_Imperil_Party: HolyDown != true ? undefined : HolyDown,
                    Dark_Imperil_Party: DarkDown != true ? undefined : DarkDown,
                    Melee_Imperil_Party: MeleeDown != true ? undefined : MeleeDown,
                    Ranged_Imperil_Party: RangedDown != true ? undefined : RangedDown,
                    Magic_Imperil_Party: MagicDown != true ? undefined : MagicDown,
                    Instant_Party: Instant != true ? undefined : Instant,
                    KO_Prevent_Party: LastStand != true ? undefined : LastStand,
                    Turn_Interrupter_Party: Turn_Interrupter != true ? undefined : Turn_Interrupter,
                    Continuous_Turns_Party: Continuous_Turns != true ? undefined : Continuous_Turns,
                    Ally_Turn_Manipulator_Party: TurnManip != true ? undefined : TurnManip,
                    Buff_Extension_Party: Buff_Extension != true ? undefined : Buff_Extension,
                    Self_Harm_Party: Self_Harm != true ? undefined : Self_Harm,
                    BRV_Damage_Resist_Party: BRV_Damage_Resist != true ? undefined : BRV_Damage_Resist,
                    Trap_Party: Trap != true ? undefined : Trap,
                    Trap_After_Trigger_Party: Trap_After_Trigger != true ? undefined : Trap_After_Trigger,
                    Trap_Before_Turn_Party: Trap_Before_Turn != true ? undefined : Trap_Before_Turn,
                    Counter_Party: Counter != true ? undefined : Counter,
                    FollowUp_Party: FollowUp != true ? undefined : FollowUp,
                    FollowUp_Extension_Party: FollowUp_Extension != true ? undefined : FollowUp_Extension,
                    FollowUp_Action_On_Enemy_Party: FollowUp_Action_On_Enemy != true ? undefined : FollowUp_Action_On_Enemy,
                    FollowUp_Start_Of_Next_Party: FollowUp_Start_Of_Next != true ? undefined : FollowUp_Start_Of_Next,
                    FollowUp_Before_Player_Turn_Party: FollowUp_Before_Player_Turn != true ? undefined : FollowUp_Before_Player_Turn,
                    FollowUp_Before_Ability_Party: FollowUp_Before_Ability != true ? undefined : FollowUp_Before_Ability,
                    Blind_Party: Blind != true ? undefined : Blind,
                    Target_Lock_Party: Target_Lock != true ? undefined : Target_Lock,
                }
            }

            var filtermerge = filterholder.filter((oneChar) => {
                return Object.entries(charType)
                    .filter(entry => entry[1])
                    .every(([key, value]) => oneChar[key] == value);
            });

            const makeUnique = filtermerge
                .filter(onlyUnique)
                .sort((a, b) =>
                    reverse === false ?
                        a.order - b.order :
                        b.order - a.order
                );
            const searchit = searchTerm == "" ? makeUnique : makeUnique.filter((buff) =>
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
        }
    }, [merge, rawData, limits, party, searchTerm, reverse, Blind, condFilter, Target_Lock, start, aBuff, bstate, buffs, Self_Harm, Trap, Trap_After_Trigger, Trap_Before_Turn, Counter, FollowUp, FollowUp_Extension, FollowUp_Action_On_Enemy, FollowUp_Start_Of_Next, FollowUp_Before_Player_Turn, FollowUp_Before_Ability, BRV_Damage_Resist, HP_Damage_Up, Buff_Extension, Reviver, BRV_Resist_Down, Launch_Support, Turn_Interrupter, Continuous_Turns, DMGShield, StackedBuff, StackedBuff5, StackedDebuff, StackedDebuff5, SpecialBuff, burstBuff, call_ld, call_75, brv, hp, debuffs, GoldBuff, ex, fr, ld, s20, starting, Break, BreakCancel, BreakPrevent, BRVCap, BRVFreeze, Gains, Refund, BRVRegen, BRVRetain, StolenBRV, BuffPrevent, CappedBRV, Cleanse, Cover, CriticalUp, CriticalRate, DebuffResist, IgnoreDEF, Delay, Delete, Dispel, ElementalWeak, Fire, Ice, Thunder, Wind, Water, Earth, Holy, Dark, Evade, EXFill, EXRate, FreeUse, FreeTurn, GoldDebuff, AddHP, MAXBRVCap, HPResistUp, HPResistDown, BRVPoison, HPPoison, HPHeal, HPRegen, Disable, FireDown, IceDown, ThunderDown, WindDown, WaterDown, EarthDown, HolyDown, DarkDown, MeleeDown, RangedDown, MagicDown, Instant, LastStand, TurnManip])

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
    const call_75button = () => {
        if (call_75 == false) {
            setcall_75search("true")
        } else {
            setcall_75search("")
        }
        setcall_75((prevValue) => !prevValue);
    };
    const call_ldbutton = () => {
        if (call_ld == false) {
            setcall_ldsearch("true")
        } else {
            setcall_ldsearch("")
        }
        setcall_ld((prevValue) => !prevValue);
    };
    const startingbutton = () => {
        if (starting == false) {
            setStartingsearch("true")
        } else {
            setStartingsearch("")
        }
        setStarting((prevValue) => !prevValue);
    };
    const brvbutton = () => {
        if (brv == false) {
            setbrvsearch("true")
        } else {
            setbrvsearch("")
        }
        setbrv((prevValue) => !prevValue);
    };
    const hpbutton = () => {
        if (hp == false) {
            sethpsearch("true")
        } else {
            sethpsearch("")
        }
        sethp((prevValue) => !prevValue);
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
    const Blindbutton = () => {
        if (Blind == false) {
            setBlindsearch("true")
        } else {
            setBlindsearch("")
        }
        setBlind((prevValue) => !prevValue);
    }
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
        } else {
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
    const Launch_Supportbutton = () => {
        if (Launch_Support == false) {
            setLaunch_Supportsearch("true")
        } else {
            setLaunch_Supportsearch("")
        }
        setLaunch_Support((prevValue) => !prevValue);
    };
    const HP_Damage_Upbutton = () => {
        if (HP_Damage_Up == false) {
            setHP_Damage_Upsearch("true")
        } else {
            setHP_Damage_Upsearch("")
        }
        setHP_Damage_Up((prevValue) => !prevValue);
    };
    const Buff_Extensionbutton = () => {
        if (Buff_Extension == false) {
            setBuff_Extensionsearch("true")
        } else {
            setBuff_Extensionsearch("")
        }
        setBuff_Extension((prevValue) => !prevValue);
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
    const Reviverbutton = () => {
        if (Reviver == false) {
            setReviversearch("true")
        } else {
            setReviversearch("")
        }
        setReviver((prevValue) => !prevValue);
    }
    const StackedBuffbutton = () => {
        if (StackedBuff == false) {
            setStackedBuffsearch("true")
        } else {
            setStackedBuffsearch("")
        }
        setStackedBuff((prevValue) => !prevValue);
    };
    const StackedBuff5button = () => {
        if (StackedBuff5 == false) {
            setStackedBuff5search("true")
        } else {
            setStackedBuff5search("")
        }
        setStackedBuff5((prevValue) => !prevValue);
    };
    const StackedDebuffbutton = () => {
        if (StackedDebuff == false) {
            setStackedDebuffsearch("true")
        } else {
            setStackedDebuffsearch("")
        }
        setStackedDebuff((prevValue) => !prevValue);
    };
    const StackedDebuff5button = () => {
        if (StackedDebuff5 == false) {
            setStackedDebuff5search("true")
        } else {
            setStackedDebuff5search("")
        }
        setStackedDebuff5((prevValue) => !prevValue);
    };
    const GoldBuffbutton = () => {
        if (GoldBuff == false) {
            setGoldBuffsearch("true")
        } else {
            setGoldBuffsearch("")
        }
        setGoldBuff((prevValue) => !prevValue);
    };
    const SpecialBuffbutton = () => {
        if (SpecialBuff == false) {
            setSpecialBuffsearch("true")
        } else {
            setSpecialBuffsearch("")
        }
        setSpecialBuff((prevValue) => !prevValue);
    };
    const DMGShieldbutton = () => {
        if (DMGShield == false) {
            setDMGShieldsearch("true")
        } else {
            setDMGShieldsearch("")
        }
        setDMGShield((prevValue) => !prevValue);
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
    const BRV_Resist_Downbutton = () => {
        if (BRV_Resist_Down == false) {
            setBRV_Resist_Downsearch("true")
        } else {
            setBRV_Resist_Downsearch("")
        }
        setBRV_Resist_Down((prevValue) => !prevValue);
    };
    const BRV_Damage_Resistbutton = () => {
        if (BRV_Damage_Resist == false) {
            setBRV_Damage_Resistsearch("true")
        } else {
            setBRV_Damage_Resistsearch("")
        }
        setBRV_Damage_Resist((prevValue) => !prevValue);
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
    const Turn_Interrupterbutton = () => {
        if (Turn_Interrupter == false) {
            setTurn_Interruptersearch("true")
        } else {
            setTurn_Interruptersearch("")
        }
        setTurn_Interrupter((prevValue) => !prevValue);
    };
    const Continuous_Turnsbutton = () => {
        if (Continuous_Turns == false) {
            setContinuous_Turnssearch("true")
        } else {
            setContinuous_Turnssearch("")
        }
        setContinuous_Turns((prevValue) => !prevValue);
    };
    const Self_Harmbutton = () => {
        if (Self_Harm == false) {
            setSelf_Harmsearch("true")
        } else {
            setSelf_Harmsearch("")
        }
        setSelf_Harm((prevValue) => !prevValue);
    };
    const TurnManipbutton = () => {
        if (TurnManip == false) {
            setTurnManipsearch("true")
        } else {
            setTurnManipsearch("")
        }
        setTurnManip((prevValue) => !prevValue);
    };
    const Trapbutton = () => {
        if (Trap == false) {
            setTrapsearch("true")
        } else {
            setTrapsearch("")
        }
        setTrap((prevValue) => !prevValue)
    }
    const Trap_After_Triggerbutton = () => {
        if (Trap_After_Trigger == false) {
            setTrap_After_Triggersearch("true")
        } else {
            setTrap_After_Triggersearch("")
        }
        setTrap_After_Trigger((prevValue) => !prevValue)
    }
    const Trap_Before_Turnbutton = () => {
        if (Trap_Before_Turn == false) {
            setTrap_Before_Turnsearch("true")
        } else {
            setTrap_Before_Turnsearch("")
        }
        setTrap_Before_Turn((prevValue) => !prevValue)
    }
    const Counterbutton = () => {
        if (Counter == false) {
            setCountersearch("true")
        } else {
            setCountersearch("")
        }
        setCounter((prevValue) => !prevValue)
    }
    const FollowUpbutton = () => {
        if (FollowUp == false) {
            setFollowUpsearch("true")
        } else {
            setFollowUpsearch("")
        }
        setFollowUp((prevValue) => !prevValue)
    }
    const FollowUp_Extensionbutton = () => {
        if (FollowUp_Extension == false) {
            setFollowUp_Extensionsearch("true")
        } else {
            setFollowUp_Extensionsearch("")
        }
        setFollowUp_Extension((prevValue) => !prevValue)
    }
    const FollowUp_Action_On_Enemybutton = () => {
        if (FollowUp_Action_On_Enemy == false) {
            setFollowUp_Action_On_Enemysearch("true")
        } else {
            setFollowUp_Action_On_Enemysearch("")
        }
        setFollowUp_Action_On_Enemy((prevValue) => !prevValue)
    }
    const FollowUp_Start_Of_Nextbutton = () => {
        if (FollowUp_Start_Of_Next == false) {
            setFollowUp_Start_Of_Nextsearch("true")
        } else {
            setFollowUp_Start_Of_Nextsearch("")
        }
        setFollowUp_Start_Of_Next((prevValue) => !prevValue)
    }
    const FollowUp_Before_Player_Turnbutton = () => {
        if (FollowUp_Before_Player_Turn == false) {
            setFollowUp_Before_Player_Turnsearch("true")
        } else {
            setFollowUp_Before_Player_Turnsearch("")
        }
        setFollowUp_Before_Player_Turn((prevValue) => !prevValue)
    }
    const FollowUp_Before_Abilitybutton = () => {
        if (FollowUp_Before_Ability == false) {
            setFollowUp_Before_Abilitysearch("true")
        } else {
            setFollowUp_Before_Abilitysearch("")
        }
        setFollowUp_Before_Ability((prevValue) => !prevValue)
    }

    const Target_Lockbutton = () => {
        if (Target_Lock == false) {
            setTarget_Locksearch("true")
        } else {
            setTarget_Locksearch("")
        }
        setTarget_Lock((prevValue) => !prevValue)
    }

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
    const typeListArray = Object.values(char_id).filter(self => ver == "JP" ? self.JPOrder != undefined : self.GLOrder != undefined).sort((a, b) => ver == "JP" ? b.JPOrder - a.JPOrder : b.GLOrder - a.GLOrder).map((typeListUnique) => ({
        value: typeListUnique.CharacterName,
        label: typeListUnique.CharacterName,
        id: typeListUnique.CharID,
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

    const resetbutton = () => {
        setclearFilter(true);
        setReverse(false)
        setReversesearch("")
        setTEXTsearch("")
        setsearchdisplay("");
        setSearchTerm("");
        setCondFilter("")

        setABuffsearch("")
        setbrvsearch("")
        sethpsearch("")
        setbstatesearch("")
        setBuffssearch("")
        setBurstBuffsearch("")
        setcall_75search("")
        setcall_ldsearch("")
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
        setLaunch_Supportsearch("")
        setHP_Damage_Upsearch("")
        setBRV_Resist_Downsearch("")
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
        setStackedBuffsearch("")
        setStackedBuff5search("")
        setStackedDebuffsearch("")
        setStackedDebuff5search("")
        setGoldBuffsearch("")
        setSpecialBuffsearch("")
        setDMGShield("")
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
        setTurn_Interruptersearch("")
        setContinuous_Turnssearch("")
        setTurnManipsearch("")
        setstartsearch("")
        setTypesearch("")
        setReviversearch("")
        setBuff_Extensionsearch("")
        setSelf_Harmsearch("")
        setBRV_Damage_Resistsearch("")
        setTrapsearch("")
        setTrap_After_Triggersearch("")
        setTrap_Before_Turnsearch("")
        setCountersearch("")
        setFollowUpsearch("")
        setFollowUp_Extensionsearch("")
        setFollowUp_Action_On_Enemysearch("")
        setFollowUp_Start_Of_Nextsearch("")
        setFollowUp_Before_Player_Turnsearch("")
        setFollowUp_Before_Abilitysearch("")
        setBlindsearch("")
        setTarget_Locksearch('')

        setstart(false)
        setABuff(false)
        setbrv(false)
        sethp(false)
        setbstate(false)
        setBuffs(false)
        setBurstBuff(false)
        setcall_ld(false)
        setcall_75(false)
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
        setLaunch_Support(false)
        setHP_Damage_Up(false)
        setBRV_Resist_Down(false)
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
        setStackedBuff(false)
        setStackedBuff5(false)
        setStackedDebuff(false)
        setStackedDebuff5(false)
        setDMGShield(false)
        setGoldDebuff(false)
        setGoldBuff(false)
        setSpecialBuff(false)
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
        setTurn_Interrupter(false)
        setContinuous_Turns(false)
        setTurnManip(false)
        setReviver(false)
        setBuff_Extension(false)
        setSelf_Harm(false)
        setBRV_Damage_Resist(false)
        setTrap(false)
        setTrap_After_Trigger(false)
        setTrap_Before_Turn(false)
        setCounter(false)
        setFollowUp(false)
        setFollowUp_Extension(false)
        setFollowUp_Action_On_Enemy(false)
        setFollowUp_Start_Of_Next(false)
        setFollowUp_Before_Player_Turn(false)
        setFollowUp_Before_Ability(false)
        setBlind(false)
        setTarget_Lock(false)

        setparty(false)
        setpartysearch("")
        setMerge(false)
        setMergesearch("")

        setTimeout(() => setclearFilter(false), 1000);
    }

    const listBuff = listDisplay;

    const dispatch = useDispatch();

    const jptoggledata = useSelector((state) =>
        state.toggle.toggle
    );

    const [jponly, setJPonly] = useStateIfMounted(jptoggledata);
    const [JPsearch, setJPSearch] = useQueryParam("JP", "");

    useEffect(() => {
        if (getQueryStringVal("JP") == "true") {
            dispatch(setTrue())
            setJPSearch("true")
            setJPonly(true)
        } else {
            dispatch(setFalse())
            setJPSearch("")
            setJPonly(false)
        }

    }, [setJPSearch, dispatch, setJPonly])

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

    return (
        <div>
            <Helmet>
                <title>Buffs - Dissidia Compendium</title>
                <meta property="og:site_name" content="Dissidia Compendium" />
                <meta property="og:type" content="website" />
                <meta name="description" content="Buffs Search" />
                <meta name="twitter:title" content="Buffs Search" />
                <meta name="twitter:description" content="Buffs Search" />
                <meta property="og:title" content="Buffs Search" />
                <meta property="og:description" content="Buffs Search" />
                <meta property="og:url" content="https://dissidiacompendium.com/search/buffs" />
            </Helmet>
            <div className="content">
                <h1>{`${jptoggledata == false ? "GL" : "JP"} Buffs & Debuffs`}</h1>
                <div className="subheader">
                    Use filters to limit returns
                </div>
                <div className="charfilterspacer" />
                <div key="filter1" onClick={showfilterbutton} className="charfilter"><span className="filterstext"></span>{showFilter ? <TiArrowSortedUp className="uparrow" /> : <TiArrowSortedDown className="downarrow" />}</div>
                {showFilter == false ?
                    <div className="event-search-reverse-holder">
                        <span className={`${jponly ? "jponlybackground" : "GLonlybackground"}`}>
                            <Tippy content={`${jponly == true ? "Switch to GL" : "Switch to JP"}`} className="tooltip" >
                                <span onClick={jponlybutton} className={`${jponly ? "jpflage jpsmallinactive smalleventbutton" : "glflage smalleventbutton"}`} />
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
                            {searchTerm === "" ? "" :
                                <IoMdCloseCircleOutline onClick={clearSearch} className="clearsearch"></IoMdCloseCircleOutline>}
                        </div>
                    </div>
                    : 
                <div className="filterholder noselect" id={showFilter ? "showfilteren" : "hiddenfilteren"}>
                    <div className="similarbanner">Ability Line</div>
                    <div className="filterholderflair">
                        <ul className="bufftypes">
                            <Tippy content="Burst Line Casts">
                                <li className={`${burstBuff ? "filteractive" : "filterinactive"} buffbutton burstButton`} onClick={burstBuffbutton}></li>
                            </Tippy>
                            <Tippy content="FR Line Casts">
                                <li className={`${fr ? "filteractive" : "filterinactive"} buffbutton frbutton`} onClick={frbutton}></li>
                            </Tippy>
                            <Tippy content="Call LD Line Casts">
                                <li className={`${call_ld ? "filteractive" : "filterinactive"} buffbutton call2button`} onClick={call_ldbutton}></li>
                            </Tippy>
                            <Tippy content="Call 75 Line Casts">
                                <li className={`${call_75 ? "filteractive" : "filterinactive"} buffbutton call1button`} onClick={call_75button}></li>
                            </Tippy>
                            <br />
                            <Tippy content="LD Line Casts">
                                <li className={`${ld ? "filteractive" : "filterinactive"} buffbutton ldButton`} onClick={ldbutton}></li>
                            </Tippy>
                            <Tippy content="EX Line Casts">
                                <li className={`${ex ? "filteractive" : "filterinactive"} buffbutton exButton`} onClick={exbutton}></li>
                            </Tippy>
                            <Tippy content="AA Line Casts">
                                <li className={`${aBuff ? "filteractive" : "filterinactive"} buffbutton abuffButton`} onClick={aBuffbutton}></li>
                            </Tippy>
                            <Tippy content="Second Skill Line Casts">
                                <li className={`${s20 ? "filteractive" : "filterinactive"} buffbutton s20Button`} onClick={s20button}></li>
                            </Tippy>
                            <Tippy content="Starting Skill Line Casts">
                                <li className={`${starting ? "filteractive" : "filterinactive"} buffbutton startingButton`} onClick={startingbutton}></li>
                            </Tippy>
                            <br />
                            <Tippy content="BRV Attack Line Casts">
                                <li className={`${brv ? "filteractive" : "filterinactive"} buffbutton brvplusbutton`} onClick={brvbutton}></li>
                            </Tippy>
                            <Tippy content="HP Attack Line Casts">
                                <li className={`${hp ? "filteractive" : "filterinactive"} buffbutton hpplusbutton`} onClick={hpbutton}></li>
                            </Tippy>
                            <br />
                            <Tippy content="Quest Starting Casts">
                                <li className={`${start ? "filteractive" : "filterinactive"} buffbutton startbutton`} onClick={startbutton}></li>
                            </Tippy>
                            <Tippy content="State Buffs">
                                <li className={`${bstate ? "filteractive" : "filterinactive"} buffbutton bstateButton`} onClick={bstatebutton}></li>
                            </Tippy>
                        </ul>
                        <div className="similarbanner">Attacking</div>
                        <ul className="characterclasses">
                            <Tippy content={ailment_tags[`Melee_Imperil`].name}>
                                <li className={`${MeleeDown ? "filteractive" : "filterinactive"} spheresbutton`} onClick={MeleeDownbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Melee_Imperil`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Ranged_Imperil`].name}>
                                <li className={`${RangedDown ? "filteractive" : "filterinactive"} spheresbutton`} onClick={RangedDownbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Ranged_Imperil`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Magic_Imperil`].name}>
                                <li className={`${MagicDown ? "filteractive" : "filterinactive"} spheresbutton`} onClick={MagicDownbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Magic_Imperil`].url}.png)` }}></li>
                            </Tippy>
                            <br />
                            <Tippy content={ailment_tags[`Fire_Enchant`].name}>
                                <li className={`${Fire ? "filteractive" : "filterinactive"} spheresbutton`} onClick={Firebutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Fire_Enchant`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Ice_Enchant`].name}>
                                <li className={`${Ice ? "filteractive" : "filterinactive"} spheresbutton`} onClick={Icebutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Ice_Enchant`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Thunder_Enchant`].name}>
                                <li className={`${Thunder ? "filteractive" : "filterinactive"} spheresbutton`} onClick={Thunderbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Thunder_Enchant`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Wind_Enchant`].name}>
                                <li className={`${Wind ? "filteractive" : "filterinactive"} spheresbutton`} onClick={Windbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Wind_Enchant`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Water_Enchant`].name}>
                                <li className={`${Water ? "filteractive" : "filterinactive"} spheresbutton`} onClick={Waterbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Water_Enchant`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Earth_Enchant`].name}>
                                <li className={`${Earth ? "filteractive" : "filterinactive"} spheresbutton`} onClick={Earthbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Earth_Enchant`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Holy_Enchant`].name}>
                                <li className={`${Holy ? "filteractive" : "filterinactive"} spheresbutton`} onClick={Holybutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Holy_Enchant`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Dark_Enchant`].name}>
                                <li className={`${Dark ? "filteractive" : "filterinactive"} spheresbutton`} onClick={Darkbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Dark_Enchant`].url}.png)` }}></li>
                            </Tippy>
                            <br />
                            <Tippy content={ailment_tags[`Fire_Imperil`].name}>
                                <li className={`${FireDown ? "filteractive" : "filterinactive"} spheresbutton`} onClick={FireDownbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Fire_Imperil`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Ice_Imperil`].name}>
                                <li className={`${IceDown ? "filteractive" : "filterinactive"} spheresbutton`} onClick={IceDownbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Ice_Imperil`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Thunder_Imperil`].name}>
                                <li className={`${ThunderDown ? "filteractive" : "filterinactive"} spheresbutton`} onClick={ThunderDownbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Thunder_Imperil`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Wind_Imperil`].name}>
                                <li className={`${WindDown ? "filteractive" : "filterinactive"} spheresbutton`} onClick={WindDownbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Wind_Imperil`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Water_Imperil`].name}>
                                <li className={`${WaterDown ? "filteractive" : "filterinactive"} spheresbutton`} onClick={WaterDownbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Water_Imperil`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Earth_Imperil`].name}>
                                <li className={`${EarthDown ? "filteractive" : "filterinactive"} spheresbutton`} onClick={EarthDownbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Earth_Imperil`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Holy_Imperil`].name}>
                                <li className={`${HolyDown ? "filteractive" : "filterinactive"} spheresbutton`} onClick={HolyDownbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Holy_Imperil`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Dark_Imperil`].name}>
                                <li className={`${DarkDown ? "filteractive" : "filterinactive"} spheresbutton`} onClick={DarkDownbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Dark_Imperil`].url}.png)` }}></li>
                            </Tippy>
                            <br />
                            <Tippy content={ailment_tags[`Launch_Support`].name}>
                                <li className={`${Launch_Support ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={Launch_Supportbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Launch_Support`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Force_Break`].name}>
                                <li className={`${Break ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={Breakbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Force_Break`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`CriticalUp`].name}>
                                <li className={`${CriticalUp ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={CriticalUpbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`CriticalUp`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Crit_Rate_Up`].name}>
                                <li className={`${CriticalRate ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={CriticalRatebutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Crit_Rate_Up`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Ignore_DEF`].name}>
                                <li className={`${IgnoreDEF ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={IgnoreDEFbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Ignore_DEF`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Continuous_Turns`].name}>
                                <li className={`${Continuous_Turns ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={Continuous_Turnsbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Continuous_Turns`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Turn_Interrupter`].name}>
                                <li className={`${Turn_Interrupter ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={Turn_Interrupterbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Turn_Interrupter`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Ally_Turn_Manipulator`].name}>
                                <li className={`${TurnManip ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={TurnManipbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Ally_Turn_Manipulator`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`HP_Damage_Up_Party`].name}>
                                <li className={`${HP_Damage_Up ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={HP_Damage_Upbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`HP_Damage_Up_Party`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`AddHP`].name}>
                                <li className={`${AddHP ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={AddHPbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`AddHP`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`StolenBRV`].name}>
                                <li className={`${StolenBRV ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={StolenBRVbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`StolenBRV`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`BRV_Damage_Cap`].name}>
                                <li className={`${CappedBRV ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={CappedBRVbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`BRV_Damage_Cap`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`EX_MAX`].name}>
                                <li className={`${EXFill ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={EXFillbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`EX_MAX`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`EXRate`].name}>
                                <li className={`${EXRate ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={EXRatebutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`EXRate`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`BRV_Resist_Down`].name}>
                                <li className={`${BRV_Resist_Down ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={BRV_Resist_Downbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`BRV_Resist_Down`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`HP_Resist_Down`].name}>
                                <li className={`${HPResistDown ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={HPResistDownbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`HP_Resist_Down`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`BRVCap`].name}>
                                <li className={`${BRVCap ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={BRVCapbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`BRVCap`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`MAXBRVCap`].name}>
                                <li className={`${MAXBRVCap ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={MAXBRVCapbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`MAXBRVCap`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`ElementalWeak`].name}>
                                <li className={`${ElementalWeak ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={ElementalWeakbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`ElementalWeak`].url}.png)` }}></li>
                            </Tippy>
                        </ul>
                        <div className="similarbanner">Healing</div>
                        <ul className="characterclasses">
                            <Tippy content={ailment_tags[`Cleanse`].name}>
                                <li className={`${Cleanse ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={Cleansebutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Cleanse`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Reviver`].name}>
                                <li className={`${Reviver ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={Reviverbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Reviver`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`KO_Prevent`].name}>
                                <li className={`${LastStand ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={LastStandbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`KO_Prevent`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`HPHealBuff`].name}>
                                <li className={`${HPHeal ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={HPHealbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`HPHealBuff`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`BRV_Regen`].name}>
                                <li className={`${BRVRegen ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={BRVRegenbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`BRV_Regen`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`HP_Regen`].name}>
                                <li className={`${HPRegen ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={HPRegenbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`HP_Regen`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Gains`].name}>
                                <li className={`${Gains ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={Gainsbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Gains`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Buff_Extension`].name}>
                                <li className={`${Buff_Extension ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={Buff_Extensionbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Buff_Extension`].url}.png)` }}></li>
                            </Tippy>
                        </ul>
                        <div className="similarbanner">Additional Attacks</div>
                        <ul className="characterclasses">
                            <Tippy content={ailment_tags[`Trap`].name}>
                                <li className={`${Trap ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={Trapbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Trap`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Trap_After_Trigger`].name}>
                                <li className={`${Trap_After_Trigger ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={Trap_After_Triggerbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Trap_After_Trigger`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Trap_Before_Turn`].name}>
                                <li className={`${Trap_Before_Turn ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={Trap_Before_Turnbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Trap_Before_Turn`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Counter`].name}>
                                <li className={`${Counter ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={Counterbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Counter`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`FollowUp`].name}>
                                <li className={`${FollowUp ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={FollowUpbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`FollowUp`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`FollowUp_Before_Player_Turn`].name}>
                                <li className={`${FollowUp_Before_Player_Turn ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={FollowUp_Before_Player_Turnbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`FollowUp_Before_Player_Turn`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`FollowUp_Before_Ability`].name}>
                                <li className={`${FollowUp_Before_Ability ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={FollowUp_Before_Abilitybutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`FollowUp_Before_Ability`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`FollowUp_Extension`].name}>
                                <li className={`${FollowUp_Extension ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={FollowUp_Extensionbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`FollowUp_Extension`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`FollowUp_Start_Of_Next`].name}>
                                <li className={`${FollowUp_Start_Of_Next ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={FollowUp_Start_Of_Nextbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`FollowUp_Start_Of_Next`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`FollowUp_Action_On_Enemy`].name}>
                                <li className={`${FollowUp_Action_On_Enemy ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={FollowUp_Action_On_Enemybutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`FollowUp_Action_On_Enemy`].url}.png)` }}></li>
                            </Tippy>
                        </ul>
                        <div className="similarbanner">Defending</div>
                        <ul className="characterclasses">
                            <Tippy content={ailment_tags[`Target_Lock`].name}>
                                <li className={`${Target_Lock ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={Target_Lockbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Target_Lock`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Cover`].name}>
                                <li className={`${Cover ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={Coverbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Cover`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Evade`].name}>
                                <li className={`${Evade ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={Evadebutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Evade`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`BRV_Shield`].name}>
                                <li className={`${DMGShield ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={DMGShieldbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`BRV_Shield`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`BRV_Damage_Resist`].name}>
                                <li className={`${BRV_Damage_Resist ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={BRV_Damage_Resistbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`BRV_Damage_Resist`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`HP_Damage_Resist`].name}>
                                <li className={`${HPResistUp ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={HPResistUpbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`HP_Damage_Resist`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Cannot_Break`].name}>
                                <li className={`${BreakPrevent ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={BreakPreventbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Cannot_Break`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Refund`].name}>
                                <li className={`${Refund ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={Refundbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Refund`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`BRVRetain`].name}>
                                <li className={`${BRVRetain ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={BRVRetainbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`BRVRetain`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Debuff_Evade`].name}>
                                <li className={`${DebuffResist ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={DebuffResistbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Debuff_Evade`].url}.png)` }}></li>
                            </Tippy>
                        </ul>
                        <div className="similarbanner">Interference</div>
                        <ul className="characterclasses">
                            <Tippy content={ailment_tags[`Delay`].name}>
                                <li className={`${Delay ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={Delaybutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Delay`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Delete_Turns`].name}>
                                <li className={`${Delete ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={Deletebutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Delete_Turns`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`BuffPrevent`].name}>
                                <li className={`${BuffPrevent ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={BuffPreventbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`BuffPrevent`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Dispel`].name}>
                                <li className={`${Dispel ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={Dispelbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Dispel`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Break_Reset`].name}>
                                <li className={`${BreakCancel ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={BreakCancelbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Break_Reset`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`BRV_Poison`].name}>
                                <li className={`${BRVPoison ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={BRVPoisonbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`BRV_Poison`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`HP_Poison`].name}>
                                <li className={`${HPPoison ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={HPPoisonbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`HP_Poison`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`BRV_Control`].name}>
                                <li className={`${BRVFreeze ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={BRVFreezebutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`BRV_Control`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Disable`].name}>
                                <li className={`${Disable ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={Disablebutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Disable`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Blind`].name}>
                                <li className={`${Blind ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={Blindbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Blind`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Debuff_Gold`].name}>
                                <li className={`${GoldDebuff ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={GoldDebuffbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Debuff_Gold`].url}.png)` }}></li>
                            </Tippy>
                        </ul>
                        <div className="similarbanner">Other</div>
                        <ul className="characterclasses">
                            <Tippy content={ailment_tags[`Special_Buff`].name}>
                                <li className={`${SpecialBuff ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={SpecialBuffbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Special_Buff`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Stacked_Debuff`].name}>
                                <li className={`${StackedDebuff ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={StackedDebuffbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Stacked_Debuff`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Stacked_Debuff_Five`].name}>
                                <li className={`${StackedDebuff5 ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={StackedDebuff5button} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Stacked_Debuff_Five`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Stacked_Buff`].name}>
                                <li className={`${StackedBuff ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={StackedBuffbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Stacked_Buff`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Stacked_Buff_Five`].name}>
                                <li className={`${StackedBuff5 ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={StackedBuff5button} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Stacked_Buff_Five`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Free_Ability`].name}>
                                <li className={`${FreeUse ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={FreeUsebutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Free_Ability`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`FreeTurn`].name}>
                                <li className={`${FreeTurn ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={FreeTurnbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`FreeTurn`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Instant`].name}>
                                <li className={`${Instant ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={Instantbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Instant`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Self_Harm`].name}>
                                <li className={`${Self_Harm ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={Self_Harmbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Self_Harm`].url}.png)` }}></li>
                            </Tippy>
                            <Tippy content={ailment_tags[`Buff_Gold`].name}>
                                <li className={`${GoldBuff ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={GoldBuffbutton} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[`Buff_Gold`].url}.png)` }}></li>
                            </Tippy>
                        </ul>
                        <div className="similarbanner">Refine</div>
                        <ul className="bufftypes">
                            <Tippy content="GL Database">
                                <li className={`${jponly ? "filterinactive" : "filteractive"} buffbutton ver_gl`} onClick={setGLbutton}></li>
                            </Tippy>
                            <Tippy content="JP Database">
                                <li className={`${jponly ? "filteractive" : "filterinactive"} buffbutton ver_jp`} onClick={setJPbutton}></li>
                            </Tippy>
                        </ul>
                        <div className="margeholder">
                            <div className="Merge">
                                <label htmlFor="search" className="MergeText">Party Aura?</label>
                                <div key="mergecheck1" className={`${party == true ? "nodisplay" : `uncheck`}`} onClick={partybutton} />
                                <div key="mergecheck2" className={`${party == true ? "check" : `nodisplay`}`} onClick={partybutton} />
                            </div>
                        </div>
                        <div className="margeholder">
                            <div className="Merge">
                                <label htmlFor="search" className="MergeText">Merge Filters?</label>
                                <div key="mergecheck1" className={`${merge == true ? "nodisplay" : `uncheck`}`} onClick={togglemerge} />
                                <div key="mergecheck2" className={`${merge == true ? "check" : `nodisplay`}`} onClick={togglemerge} />
                            </div>
                        </div>
                        <ul className="bufftypes">
                            <li className={`${buffs ? "filteractive" : "filterinactive"} buffsbutton buffsButton`} onClick={buffsbutton}></li>
                            <li className={`${debuffs ? "filteractive" : "filterinactive"} buffsbutton debuffsButton`} onClick={debuffsbutton}></li>
                        </ul>
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
                    <Link className="whitecolor" to={`/characters/forcetime${jptoggledata == false ? "" : "?JP=true"}`}>
                        <span className="subtext">Check out the Force Time page</span>
                    </Link>
                </div>
                }
                {showFilter == true ? "" :
                    <div>
                        <Link className="whitecolor" to={`/characters/forcetime${jptoggledata == false ? "" : "?JP=true"}`}>
                            <span className="subtext">Force Time</span>
                        </Link>
                    </div>}
                <ul className="bannertabs">
                    <Link to={`/search/buffs${jptoggledata == false ? "" : "?JP=true"}`}>
                        <li className={"active"} ><span className="gemselected" />Buffs</li>
                    </Link>
                    <Link to={`/search/abilities${jptoggledata == false ? "" : "?JP=true"}`}>
                        <li className={""} >Abilities</li>
                    </Link>
                    <Link to={`/search/gear${jptoggledata == false ? "" : "?JP=true"}`}>
                        <li className={""} >Gear</li>
                    </Link>
                    <Link to={`/search/passives${jptoggledata == false ? "" : "?JP=true"}`}>
                        <li className={""} >Passives</li>
                    </Link>
                    <Link to={`/search/spheres${jptoggledata == false ? "" : "?JP=true"}`}>
                        <li className={""} >Spheres</li>
                    </Link>
                    <Link to={`/search/stickers${jptoggledata == false ? "" : "?JP=true"}`}>
                        <li className={""} >Stickers</li>
                    </Link>
                    <Link to={`/search/music${jptoggledata == false ? "" : "?JP=true"}`}>
                        <li className={""} >Music</li>
                    </Link>
                </ul>
                <div className="buffsholder">
                    <div className="subtext">
                        {displayBanner}
                    </div>
                    {listBuff.length > 0 ? (
                        listBuff.map(self => (
                            <LazyLoadComponent
                                key={`${self.id}_${self.chara_id}`}
                                scrollPosition={scrollPosition}
                                placeholder={<div className='buffunit' style={{ minHeight: `210px` }}>
                                                <div className='infoholder'>
                                                <img className="loadingbardots" src="https://dissidiacompendium.com/images/static/site/loading.gif"/>
                                                </div>
                                            </div>}
                            >
                            <AilmentDataFormatting
                                key={`${self.id}_${self.chara_id}`}
                                ver={ver}
                                ailment_data={self}
                                master_index={master_index}
                                rank={self.arank}
                                arg1={self.aarg1}
                                arg2={self.aarg2}
                                alt_rank={self.aranka}
                                alt_aug1={self.aarg1a}
                                alt_aug2={self.aarg2a}
                                castlocation={true}
                                formatting={true}
                                rank_tag={self.rank_tag}
                                turns={self.alife}
                                character_face={true}
                                link={"buffs"}
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
        </div>
    )
}

export default trackWindowScroll(Buffs)