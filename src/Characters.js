import React, { useState, useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import { useDispatch } from "react-redux";
import { setFalse, setTrue } from './redux/ducks/jptoggle'
import Tippy from './components/TippyDefaults.js';
import { Helmet } from 'react-helmet-async';
import Select from 'react-select';
import CharacterFilterReturns from './components/Characters/CharacterFilterReturns.js'
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { ImWarning } from 'react-icons/im';
import { IoSearch } from 'react-icons/io5';
import { FaUndoAlt } from 'react-icons/fa';
import { getQuery, getQueryStringVal, useQueryParam } from './components/URLParams'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaShareSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import roles from './processing/ailment/ailment_tags.json'

export default function Characters({ 
  ProcessedCharacters, 
  jptoggledata 
}){

  const [rawData, setrawData] = useStateIfMounted(Object.values(ProcessedCharacters))
  const [ver, setver] = useStateIfMounted(jptoggledata == true ? "JP" : "GL")

  const dispatch = useDispatch();

  const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null ? true : false);
  const [clearFilter, setclearFilter] = useStateIfMounted(false);

  //damage types
  const [Magic, setMagic] = useState(getQueryStringVal("magic") != null ? true : false);
  const [Ranged, setRanged] = useState(getQueryStringVal("ranged") != null ? true : false);
  const [Melee, setMelee] = useState(getQueryStringVal("melee") != null ? true : false);
  const [Non_Elemental, setNon_Elemental] = useState(getQueryStringVal("Non_Elemental") != null ? true : false);

  //slots
  const [ASlot, setASlot] = useState(getQueryStringVal("ASlot") != null ? true : false);
  const [BSlot, setBSlot] = useState(getQueryStringVal("BSlot") != null ? true : false);
  const [CSlot, setCSlot] = useState(getQueryStringVal("CSlot") != null ? true : false);
  const [DSlot, setDSlot] = useState(getQueryStringVal("DSlot") != null ? true : false);
  const [ESlot, setESlot] = useState(getQueryStringVal("ESlot") != null ? true : false);

  //elemental damage 
  const [Fire, setFire] = useState(getQueryStringVal("fire") != null ? true : false);
  const [Ice, setIce] = useState(getQueryStringVal("ice") != null ? true : false);
  const [Thunder, setThunder] = useState(getQueryStringVal("thunder") != null ? true : false);
  const [Water, setWater] = useState(getQueryStringVal("water") != null ? true : false);
  const [Earth, setEarth] = useState(getQueryStringVal("earth") != null ? true : false);
  const [Wind, setWind] = useState(getQueryStringVal("wind") != null ? true : false);
  const [Dark, setDark] = useState(getQueryStringVal("dark") != null ? true : false);
  const [Holy, setHoly] = useState(getQueryStringVal("holy") != null ? true : false);

  //crystal damage 
  const [RedCrystal, setRedCrystal] = useState(getQueryStringVal("red") != null ? true : false);
  const [BlueCrystal, setBlueCrystal] = useState(getQueryStringVal("blue") != null ? true : false);
  const [GreenCrystal, setGreenCrystal] = useState(getQueryStringVal("green") != null ? true : false);
  const [YellowCrystal, setYellowCrystal] = useState(getQueryStringVal("yellow") != null ? true : false);
  const [BlackCrystal, setBlackCrystal] = useState(getQueryStringVal("black") != null ? true : false);
  const [WhiteCrystal, setWhiteCrystal] = useState(getQueryStringVal("white") != null ? true : false);

  //weapons
  const [Dagger, setDagger] = useState(getQueryStringVal("dagger") != null ? true : false);
  const [Sword, setSword] = useState(getQueryStringVal("sword") != null ? true : false);
  const [Greatsword, setGreatsword] = useState(getQueryStringVal("greatsword") != null ? true : false);
  const [Staff, setStaff] = useState(getQueryStringVal("staff") != null ? true : false);
  const [Gun, setGun] = useState(getQueryStringVal("gun") != null ? true : false);
  const [Fist, setFist] = useState(getQueryStringVal("fist") != null ? true : false);
  const [Throwing, setThrowing] = useState(getQueryStringVal("throwing") != null ? true : false);
  const [Spear, setSpear] = useState(getQueryStringVal("spear") != null ? true : false);
  const [Bow, setBow] = useState(getQueryStringVal("bow") != null ? true : false);
  const [Whip, setWhip] = useState(getQueryStringVal("whip") != null ? true : false);
  const [Other, setOther] = useState(getQueryStringVal("other") != null ? true : false);

  //max gear
  const [ActiveRework, setActiveRework] = useState(getQueryStringVal("rework") != null ? true : false);
  const [FRFlag, setFRFlag] = useState(getQueryStringVal("fr") != null ? true : false);
  const [FE50BoardFlag, setFE50BoardFlag] = useState(getQueryStringVal("fe50board") != null ? true : false);
  const [Board5Flag, setBoard5Flag] = useState(getQueryStringVal("board5") != null ? true : false);
  const [BTPlusFlag, setBTPlusFlag] = useState(getQueryStringVal("btplus") != null ? true : false);

  //non-tag
  const [NoFR, setNoFR] = useState(getQueryStringVal("NoFR") != null ? true : false);
  const [NoFE50, setNoFE50] = useState(getQueryStringVal("NoFE50") != null ? true : false);
  const [NoFRBoard, setNoFRBoard] = useState(getQueryStringVal("NoFRBoard") != null ? true : false);
  const [NoBT, setNoBT] = useState(getQueryStringVal("NoBT") != null ? true : false);

  //sort
  const [RealmSort, setRealmSort] = useState(getQueryStringVal("Sort") == "Realm" ? true : false);
  const [NameSort, setNameSort] = useState(getQueryStringVal("Sort") == "Name" ? true : false);
  const [JPSort, setJPSort] = useState(getQueryStringVal("Sort") == "JP" ? true : false);

  //advance class
  const [MagicImperil, setMagicImperil] = useState(getQueryStringVal("MagicImperil") != null ? true : false);
  const [MeleeImperil, setMeleeImperil] = useState(getQueryStringVal("MeleeImperil") != null ? true : false);
  const [RangedImperil, setRangedImperil] = useState(getQueryStringVal("RangedImperil") != null ? true : false);

  const [FireEnchant, setFireEnchant] = useState(getQueryStringVal("FireEnchant") != null ? true : false);
  const [IceEnchant, setIceEnchant] = useState(getQueryStringVal("IceEnchant") != null ? true : false);
  const [ThunderEnchant, setThunderEnchant] = useState(getQueryStringVal("ThunderEnchant") != null ? true : false);
  const [WaterEnchant, setWaterEnchant] = useState(getQueryStringVal("WaterEnchant") != null ? true : false);
  const [EarthEnchant, setEarthEnchant] = useState(getQueryStringVal("EarthEnchant") != null ? true : false);
  const [WindEnchant, setWindEnchant] = useState(getQueryStringVal("WindEnchant") != null ? true : false);
  const [DarkEnchant, setDarkEnchant] = useState(getQueryStringVal("DarkEnchant") != null ? true : false);
  const [HolyEnchant, setHolyEnchant] = useState(getQueryStringVal("HolyEnchant") != null ? true : false);

  const [FireImperil, setFireImperil] = useState(getQueryStringVal("FireImperil") != null ? true : false);
  const [IceImperil, setIceImperil] = useState(getQueryStringVal("IceImperil") != null ? true : false);
  const [ThunderImperil, setThunderImperil] = useState(getQueryStringVal("ThunderImperil") != null ? true : false);
  const [WaterImperil, setWaterImperil] = useState(getQueryStringVal("WaterImperil") != null ? true : false);
  const [EarthImperil, setEarthImperil] = useState(getQueryStringVal("EarthImperil") != null ? true : false);
  const [WindImperil, setWindImperil] = useState(getQueryStringVal("WindImperil") != null ? true : false);
  const [DarkImperil, setDarkImperil] = useState(getQueryStringVal("DarkImperil") != null ? true : false);
  const [HolyImperil, setHolyImperil] = useState(getQueryStringVal("HolyImperil") != null ? true : false);

  const [Debuffer, setDebuffer] = useState(getQueryStringVal("Debuffer") != null ? true : false);
  const [Cleanse, setCleanse] = useState(getQueryStringVal("Cleanse") != null ? true : false);
  const [Trap, setTrap] = useState(getQueryStringVal("Trap") != null ? true : false);
  const [BRVPoison, setBRVPoison] = useState(getQueryStringVal("BRVPoison") != null ? true : false);
  const [HPPoison, setHPPoison] = useState(getQueryStringVal("HPPoison") != null ? true : false);
  const [BRVResistDown, setBRVResistDown] = useState(getQueryStringVal("BRVResistDown") != null ? true : false);
  const [HPResistDown, setHPResistDown] = useState(getQueryStringVal("HPResistDown") != null ? true : false);
  const [BRVControl, setBRVControl] = useState(getQueryStringVal("BRVControl") != null ? true : false);
  const [Disable, setDisable] = useState(getQueryStringVal("Disable") != null ? true : false);
  const [Stacked_Debuff, setStacked_Debuff] = useState(getQueryStringVal("Stacked_Debuff") != null ? true : false);
  const [Blind, setBlind] = useState(getQueryStringVal("Blind") != null ? true : false);
  const [Debuff_Evade, setDebuff_Evade] = useState(getQueryStringVal("Debuff_Evade") != null ? true : false);
  const [Debuff_Gold, setDebuff_Gold] = useState(getQueryStringVal("Debuff_Gold") != null ? true : false);

  const [HP_Damage_Up, setHP_Damage_Up] = useState(getQueryStringVal("HP_Damage_Up") != null ? true : false);
  const [Tank, setTank] = useState(getQueryStringVal("Cover") != null ? true : false);
  const [Battery, setBattery] = useState(getQueryStringVal("Battery") != null ? true : false);
  const [Launcher, setLauncher] = useState(getQueryStringVal("Launcher") != null ? true : false);
  const [Dispel, setDispel] = useState(getQueryStringVal("Dispel") != null ? true : false);
  const [BuffPrevent, setBuffPrevent] = useState(getQueryStringVal("BuffPrevent") != null ? true : false);
  const [Counter, setCounter] = useState(getQueryStringVal("Counter") != null ? true : false);
  const [Delay, setDelay] = useState(getQueryStringVal("Delay") != null ? true : false);
  const [ThreeDelay, setThreeDelay] = useState(getQueryStringVal("ThreeDelay") != null ? true : false);
  const [ForceBreak, setForceBreak] = useState(getQueryStringVal("ForceBreak") != null ? true : false);
  const [DeleteTurns, setDeleteTurns] = useState(getQueryStringVal("DeleteTurns") != null ? true : false);
  const [BRVDamageResist, setBRVDamageResist] = useState(getQueryStringVal("BRVDamageResist") != null ? true : false);
  const [HPDamageResist, setHPDamageResist] = useState(getQueryStringVal("HPDamageResist") != null ? true : false);
  const [BRVRegen, setBRVRegen] = useState(getQueryStringVal("BRVRegen") != null ? true : false);
  const [HPRegen, setHPRegen] = useState(getQueryStringVal("HPRegen") != null ? true : false);
  const [BRVShield, setBRVShield] = useState(getQueryStringVal("BRVShield") != null ? true : false);
  const [HPHealAbility, setHPHealAbility] = useState(getQueryStringVal("HPHealAbility") != null ? true : false);
  const [TwoAbilitiesRecover, setTwoAbilitiesRecover] = useState(getQueryStringVal("TwoAbilitiesRecover") != null ? true : false);
  const [CritRateUp, setCritRateUp] = useState(getQueryStringVal("CritRateUp") != null ? true : false);
  const [Evade, setEvade] = useState(getQueryStringVal("Evade") != null ? true : false);
  const [Ignore_DEF, setIgnore_DEF] = useState(getQueryStringVal("Ignore_DEF") != null ? true : false);
  const [KO_Prevent, setKO_Prevent] = useState(getQueryStringVal("KO_Prevent") != null ? true : false);
  const [Reviver, setReviver] = useState(getQueryStringVal("Reviver") != null ? true : false);
  const [Buff_Extension, setBuff_Extension] = useState(getQueryStringVal("Buff_Extension") != null ? true : false);
  const [Break_Reset, setBreak_Reset] = useState(getQueryStringVal("Break_Reset") != null ? true : false);
  const [Self_Harm, setSelf_Harm] = useState(getQueryStringVal("Self_Harm") != null ? true : false);
  const [BRVHP_Upgrade, setBRVHP_Upgrade] = useState(getQueryStringVal("BRVHP_Upgrade") != null ? true : false);
  const [Ally_Turn_Manipulator, setAlly_Turn_Manipulator] = useState(getQueryStringVal("Ally_Turn_Manipulator") != null ? true : false);
  const [FollowUp, setFollowUp] = useState(getQueryStringVal("FollowUp") != null ? true : false);
  const [Cannot_Break, setCannot_Break] = useState(getQueryStringVal("Cannot_Break") != null ? true : false);
  const [Launch_Support, setLaunch_Support] = useState(getQueryStringVal("Launch_Support") != null ? true : false);
  const [Continuous_Turns, setContinuous_Turns] = useState(getQueryStringVal("Continuous_Turns") != null ? true : false);
  const [Turn_Interrupter, setTurn_Interrupter] = useState(getQueryStringVal("Turn_Interrupter") != null ? true : false);
  const [BRV_Ratio, setBRV_Ratio] = useState(getQueryStringVal("BRV_Ratio") != null ? true : false);
  const [EX_MAX_Party, setEX_MAX_Party] = useState(getQueryStringVal("EX_MAX_Party") != null ? true : false);
  const [Stacked_Buff, setStacked_Buff] = useState(getQueryStringVal("Stacked_Buff") != null ? true : false);
  const [Stacked_Buff_Five, setStacked_Buff_Five] = useState(getQueryStringVal("Stacked_Buff_Five") != null ? true : false);
  const [Free_Ability, setFree_Ability] = useState(getQueryStringVal("Free_Ability") != null ? true : false);
  const [Special_Buff, setSpecial_Buff] = useState(getQueryStringVal("Special_Buff") != null ? true : false);
  const [BRV_Damage_Cap, setBRV_Damage_Cap] = useState(getQueryStringVal("BRV_Damage_Cap") != null ? true : false);

  const [Trap_After_Trigger, setTrap_After_Trigger] = useState(getQueryStringVal("Trap_After_Trigger") != null ? true : false);
  const [Trap_Before_Turn, setTrap_Before_Turn] = useState(getQueryStringVal("Trap_Before_Turn") != null ? true : false);
  const [FollowUp_Before_Player_Turn, setFollowUp_Before_Player_Turn] = useState(getQueryStringVal("FollowUp_Before_Player_Turn") != null ? true : false);
  const [FollowUp_Before_Ability, setFollowUp_Before_Ability] = useState(getQueryStringVal("FollowUp_Before_Ability") != null ? true : false);
  const [FollowUp_Extension, setFollowUp_Extension] = useState(getQueryStringVal("FollowUp_Extension") != null ? true : false);
  const [FollowUp_Start_Of_Next, setFollowUp_Start_Of_Next] = useState(getQueryStringVal("FollowUp_Start_Of_Next") != null ? true : false);
  const [FollowUp_Action_On_Enemy, setFollowUp_Action_On_Enemy] = useState(getQueryStringVal("FollowUp_Action_On_Enemy") != null ? true : false);
  const [Target_Lock, setTarget_Lock] = useState(getQueryStringVal("Target_Lock") != null ? true : false);
  const [Charger, setCharger] = useState(getQueryStringVal("Charger") != null ? true : false);

  const [loop, setLoop] = useStateIfMounted(false);
  const [reverse, setReverse] = useState(getQueryStringVal("rev") != null ? true : false);
  const [spoilers, setspoilers] = useState(getQueryStringVal("spoilers") != null ? true : false);
  const [searchdisplay, setsearchdisplay] = useState(getQueryStringVal("search") != null ? getQueryStringVal("search") : "");
  const [searchTerm, setSearchTerm] = useState(getQueryStringVal("search") != null ? getQueryStringVal("search").toLowerCase() : "");
  const [merge, setMerge] = useState(getQueryStringVal("merge") != null ? true : false);
  const [condFilter, setCondFilter] = useState("");
  const [filterResults, setFilterResults] = useState(rawData);
  const [searchResults, setSearchResults] = useState(rawData);
  const [listDisplay, setListDisplay] = useState(rawData)

  //type list
  const typeList = Object.values(rawData).map((item) => item.RealmPars);
  const typeListUnique = typeList
    .filter(onlyUnique)
    .sort((a, b) => a - b)
    .filter(function (el) {
      return el !== undefined;
    });

  // eslint-disable-next-line no-sparse-arrays
  const realmlabel = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , "Tactics", , , , , , , , , , "Type-0", , , , , , , , , , "CC", , , , , , , , , , "WOFF", "Origins"];

  const typeListArray = typeListUnique.map((typeListUnique) => ({
    value: realmlabel[typeListUnique],
    label: realmlabel[typeListUnique],
    id: typeListUnique,
  }));

  const [Magicsearch, setMagicsearch] = useQueryParam("magic", "");
  const [Rangedsearch, setRangedsearch] = useQueryParam("ranged", "");
  const [Meleesearch, setMeleesearch] = useQueryParam("melee", "");
  const [Non_Elementalsearch, setNon_Elementalsearch] = useQueryParam("Non_Elemental", "");

  const [ASlotsearch, setASlotsearch] = useQueryParam("ASlot", "");
  const [BSlotsearch, setBSlotsearch] = useQueryParam("BSlot", "");
  const [CSlotsearch, setCSlotsearch] = useQueryParam("CSlot", "");
  const [DSlotsearch, setDSlotsearch] = useQueryParam("DSlot", "");
  const [ESlotsearch, setESlotsearch] = useQueryParam("ESlot", "");

  const [RedCrystalsearch, setRedCrystalsearch] = useQueryParam("red", "");
  const [BlueCrystalsearch, setBlueCrystalsearch] = useQueryParam("blue", "");
  const [GreenCrystalsearch, setGreenCrystalsearch] = useQueryParam("green", "");
  const [YellowCrystalsearch, setYellowCrystalsearch] = useQueryParam("yellow", "");
  const [BlackCrystalsearch, setBlackCrystalsearch] = useQueryParam("black", "");
  const [WhiteCrystalsearch, setWhiteCrystalsearch] = useQueryParam("white", "");

  const [ActiveReworksearch, setActiveReworksearch] = useQueryParam("rework", "");
  const [FRFlagsearch, setFRFlagsearch] = useQueryParam("fr", "");
  const [FE50BoardFlagsearch, setFE50BoardFlagsearch] = useQueryParam("fe50board", "");
  const [Board5Flagsearch, setBoard5Flagsearch] = useQueryParam("board5", "");
  const [BTPlusFlagsearch, setBTPlusFlagsearch] = useQueryParam("btplus", "");

  const [NoFRsearch, setNoFRsearch] = useQueryParam("NoFR", "");
  const [NoFE50search, setNoFE50search] = useQueryParam("NoFE50", "");
  const [NoFRBoardsearch, setNoFRBoardsearch] = useQueryParam("NoFRBoard", "");
  const [NoBTsearch, setNoBTsearch] = useQueryParam("NoBT", "");

  //advance class
  const [MagicImperilsearch, setMagicImperilsearch] = useQueryParam("MagicImperil", "");
  const [MeleeImperilsearch, setMeleeImperilsearch] = useQueryParam("MeleeImperil", "");
  const [RangedImperilsearch, setRangedImperilsearch] = useQueryParam("RangedImperil", "");

  const [FireEnchantsearch, setFireEnchantsearch] = useQueryParam("FireEnchant", "");
  const [IceEnchantsearch, setIceEnchantsearch] = useQueryParam("IceEnchant", "");
  const [ThunderEnchantsearch, setThunderEnchantsearch] = useQueryParam("ThunderEnchant", "");
  const [WaterEnchantsearch, setWaterEnchantsearch] = useQueryParam("WaterEnchant", "");
  const [EarthEnchantsearch, setEarthEnchantsearch] = useQueryParam("EarthEnchant", "");
  const [WindEnchantsearch, setWindEnchantsearch] = useQueryParam("WindEnchant", "");
  const [DarkEnchantsearch, setDarkEnchantsearch] = useQueryParam("DarkEnchant", "");
  const [HolyEnchantsearch, setHolyEnchantsearch] = useQueryParam("HolyEnchant", "");

  const [Debuffersearch, setDebuffersearch] = useQueryParam("Debuffer", "");
  const [Cleansesearch, setCleansesearch] = useQueryParam("Cleanse", "");
  const [Trapsearch, setTrapsearch] = useQueryParam("Trap", "");
  const [BRVPoisonsearch, setBRVPoisonsearch] = useQueryParam("BRVPoison", "");
  const [HPPoisonsearch, setHPPoisonsearch] = useQueryParam("HPPoison", "");
  const [BRVResistDownsearch, setBRVResistDownsearch] = useQueryParam("BRVResistDown", "");
  const [HPResistDownsearch, setHPResistDownsearch] = useQueryParam("HPResistDown", "");
  const [BRVControlsearch, setBRVControlsearch] = useQueryParam("BRVControl", "");
  const [Disablesearch, setDisablesearch] = useQueryParam("Disable", "");
  const [Stacked_Debuffsearch, setStacked_Debuffsearch] = useQueryParam("Stacked_Debuff", "");
  const [Blindsearch, setBlindsearch] = useQueryParam("Blind", "");
  const [Debuff_Evadesearch, setDebuff_Evadesearch] = useQueryParam("Debuff_Evade", "");
  const [Debuff_Goldsearch, setDebuff_Goldsearch] = useQueryParam("Debuff_Gold", "");
  const [Trap_After_Triggersearch, setTrap_After_Triggersearch] = useQueryParam("Trap_After_Trigger", "");
  const [Trap_Before_Turnsearch, setTrap_Before_Turnsearch] = useQueryParam("Trap_Before_Turn", "");

  const [HP_Damage_Upsearch, setHP_Damage_Upsearch] = useQueryParam("HP_Damage_Up", "");
  const [Tanksearch, setTanksearch] = useQueryParam("Cover", "");
  const [Batterysearch, setBatterysearch] = useQueryParam("Battery", "");
  const [Launchersearch, setLaunchersearch] = useQueryParam("Launcher", "");
  const [Dispelsearch, setDispelsearch] = useQueryParam("Dispel", "");
  const [BuffPreventsearch, setBuffPreventsearch] = useQueryParam("BuffPrevent", "");
  const [Countersearch, setCountersearch] = useQueryParam("Counter", "");
  const [Delaysearch, setDelaysearch] = useQueryParam("Delay", "");
  const [ThreeDelaysearch, setThreeDelaysearch] = useQueryParam("ThreeDelay", "");
  const [ForceBreaksearch, setForceBreaksearch] = useQueryParam("ForceBreak", "");
  const [DeleteTurnssearch, setDeleteTurnssearch] = useQueryParam("DeleteTurns", "");
  const [BRVDamageResistsearch, setBRVDamageResistsearch] = useQueryParam("BRVDamageResist", "");
  const [HPDamageResistsearch, setHPDamageResistsearch] = useQueryParam("HPDamageResist", "");
  const [BRVRegensearch, setBRVRegensearch] = useQueryParam("BRVRegen", "");
  const [HPRegensearch, setHPRegensearch] = useQueryParam("HPRegen", "");
  const [BRVShieldsearch, setBRVShieldsearch] = useQueryParam("BRVShield", "");
  const [HPHealAbilitysearch, setHPHealAbilitysearch] = useQueryParam("HPHealAbility", "");
  const [TwoAbilitiesRecoversearch, setTwoAbilitiesRecoversearch] = useQueryParam("TwoAbilitiesRecover", "");
  const [CritRateUpsearch, setCritRateUpsearch] = useQueryParam("CritRateUp", "");
  const [Evadesearch, setEvadesearch] = useQueryParam("Evade", "");
  const [Ignore_DEFsearch, setIgnore_DEFsearch] = useQueryParam("Ignore_DEF", "");
  const [KO_Preventsearch, setKO_Preventsearch] = useQueryParam("KO_Prevent", "");
  const [Reviversearch, setReviversearch] = useQueryParam("Reviver", "");
  const [Buff_Extensionsearch, setBuff_Extensionsearch] = useQueryParam("Buff_Extension", "");
  const [Break_Resetsearch, setBreak_Resetsearch] = useQueryParam("Break_Reset", "");
  const [Self_Harmsearch, setSelf_Harmsearch] = useQueryParam("Self_Harm", "");
  const [BRVHP_Upgradesearch, setBRVHP_Upgradesearch] = useQueryParam("BRVHP_Upgrade", "");
  const [Ally_Turn_Manipulatorsearch, setAlly_Turn_Manipulatorsearch] = useQueryParam("Ally_Turn_Manipulator", "");
  const [FollowUpsearch, setFollowUpsearch] = useQueryParam("FollowUp", "");
  const [Cannot_Breaksearch, setCannot_Breaksearch] = useQueryParam("Cannot_Break", "");
  const [Launch_Supportsearch, setLaunch_Supportsearch] = useQueryParam("Launch_Support", "");
  const [Continuous_Turnssearch, setContinuous_Turnssearch] = useQueryParam("Continuous_Turns", "");
  const [Turn_Interruptersearch, setTurn_Interruptersearch] = useQueryParam("Turn_Interrupter", "");
  const [BRV_Ratiosearch, setBRV_Ratiosearch] = useQueryParam("BRV_Ratio", "");
  const [EX_MAX_Partysearch, setEX_MAX_Partysearch] = useQueryParam("EX_MAX_Party", "");
  const [Stacked_Buffsearch, setStacked_Buffsearch] = useQueryParam("Stacked_Buff", "");
  const [Stacked_Buff_Fivesearch, setStacked_Buff_Fivesearch] = useQueryParam("Stacked_Buff_Five", "");
  const [FollowUp_Before_Player_Turnsearch, setFollowUp_Before_Player_Turnsearch] = useQueryParam("FollowUp_Before_Player_Turn", "");
  const [FollowUp_Before_Abilitysearch, setFollowUp_Before_Abilitysearch] = useQueryParam("FollowUp_Before_Ability", "");
  const [FollowUp_Extensionsearch, setFollowUp_Extensionsearch] = useQueryParam("FollowUp_Extension", "");
  const [FollowUp_Start_Of_Nextsearch, setFollowUp_Start_Of_Nextsearch] = useQueryParam("FollowUp_Start_Of_Next", "");
  const [FollowUp_Action_On_Enemysearch, setFollowUp_Action_On_Enemysearch] = useQueryParam("FollowUp_Action_On_Enemy", "");
  const [Free_Abilitysearch, setFree_Abilitysearch] = useQueryParam("Free_Ability", "");
  const [Special_Buffsearch, setSpecial_Buffsearch] = useQueryParam("Special_Buff", "");
  const [BRV_Damage_Capsearch, setBRV_Damage_Capsearch] = useQueryParam("BRV_Damage_Cap", "");
  const [Target_Locksearch, setTarget_Locksearch] = useQueryParam("Target_Lock", "");
  const [Chargersearch, setChargersearch] = useQueryParam("Charger", "");

  const [FireImperilsearch, setFireImperilsearch] = useQueryParam("FireImperil", "");
  const [IceImperilsearch, setIceImperilsearch] = useQueryParam("IceImperil", "");
  const [ThunderImperilsearch, setThunderImperilsearch] = useQueryParam("ThunderImperil", "");
  const [WaterImperilsearch, setWaterImperilsearch] = useQueryParam("WaterImperil", "");
  const [EarthImperilsearch, setEarthImperilsearch] = useQueryParam("EarthImperil", "");
  const [WindImperilsearch, setWindImperilsearch] = useQueryParam("WindImperil", "");
  const [DarkImperilsearch, setDarkImperilsearch] = useQueryParam("DarkImperil", "");
  const [HolyImperilsearch, setHolyImperilsearch] = useQueryParam("HolyImperil", "");

  const [Daggersearch, setDaggersearch] = useQueryParam("dagger", "");
  const [Swordsearch, setSwordsearch] = useQueryParam("sword", "");
  const [Greatswordsearch, setGreatswordsearch] = useQueryParam("greatsword", "");
  const [Staffsearch, setStaffsearch] = useQueryParam("staff", "");
  const [Gunsearch, setGunsearch] = useQueryParam("gun", "");
  const [Fistsearch, setFistsearch] = useQueryParam("fist", "");
  const [Throwingsearch, setThrowingsearch] = useQueryParam("throwing", "");
  const [Spearsearch, setSpearsearch] = useQueryParam("spear", "");
  const [Bowsearch, setBowsearch] = useQueryParam("bow", "");
  const [Whipsearch, setWhipsearch] = useQueryParam("whip", "");
  const [Othersearch, setOthersearch] = useQueryParam("other", "");

  const [Firesearch, setFiresearch] = useQueryParam("fire", "");
  const [Icesearch, setIcesearch] = useQueryParam("ice", "");
  const [Thundersearch, setThundersearch] = useQueryParam("thunder", "");
  const [Watersearch, setWatersearch] = useQueryParam("water", "");
  const [Earthsearch, setEarthsearch] = useQueryParam("earth", "");
  const [Windsearch, setWindsearch] = useQueryParam("wind", "");
  const [Darksearch, setDarksearch] = useQueryParam("dark", "");
  const [Holysearch, setHolysearch] = useQueryParam("holy", "");

  const [Sortsearch, setSortsearch] = useQueryParam("Sort", "")

  const [mergesearch, setMergesearch] = useQueryParam("merge", "");
  const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
  const [spoilerssearch, setspoilerssearch] = useQueryParam("spoilers", "");
  const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
  const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");
  const [Typesearch, setTypesearch] = useQueryParam("Realm", "");
  const [JPsearch, setJPSearch] = useQueryParam("JP", "");
  const { protocol, pathname, host } = window.location;
  const query = getQuery();
  const url = `${protocol}//${host}${pathname}?${query.toString()}`;

  //jp params
  useEffect(() => {
    if (getQueryStringVal("JP") == "true") {
      dispatch(setTrue())
      setJPSearch("true")
    } else {
      dispatch(setFalse())
      setJPSearch("")
    }
  }, [setJPSearch, dispatch])

  useEffect(() => {
    if (getQueryStringVal("spoilers") == "true") {
      setspoilers(true)
      setspoilerssearch("true")
    } else {
      setspoilers(false)
      setspoilerssearch("")
    }
  }, [setspoilerssearch])

  useEffect(() => {
    if (jptoggledata == true) {
      setJPSearch("true")
      setver("JP")
      if (Sortsearch == "") {
        setJPSort(true)
        setSortsearch("JP")
      }
    } else {
      setver("GL")
    }
    if (getQueryStringVal("JP") == "true") {
      dispatch(setTrue())
      if (Sortsearch == "") {
        setJPSort(true)
        setSortsearch("JP")
      }
    }
  }, [jptoggledata, setver, dispatch, setJPSearch, Sortsearch, setSortsearch])

  useEffect(() => {
    // eslint-disable-next-line no-sparse-arrays
    const realmlabel2 = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , "Tactics", , , , , , , , , , "Type-0", , , , , , , , , , "CC", , , , , , , , , , "WOFF", "Origins"];
    const typeListArray2 = typeListUnique.map((typeListUnique) => ({
      value: realmlabel2[typeListUnique],
      label: realmlabel2[typeListUnique],
      id: typeListUnique,
    }));
    if (Typesearch != null) {
      const filteredtype = typeListArray2.filter(self => { return self.label == getQueryStringVal("Realm") })
      if (filteredtype.length != 0) {
        setTypesearch(getQueryStringVal("Realm"))
        setCondFilter(filteredtype[0].id)
      } else {
        setTypesearch("")
        setCondFilter("")
      }
    }
  }, [setCondFilter, typeListUnique, Typesearch, setTypesearch])


  useEffect(() => {
    //search params
    if (getQueryStringVal("search") != null) {
      setSearchTerm(getQueryStringVal("search") != null ? getQueryStringVal("search").toLowerCase() : "")
      setTEXTsearch(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
      setsearchdisplay(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
    }
  }, [setTEXTsearch, setFiltersearch])

  //filter
  useEffect(() => {
    if (merge == false) {
      const filterholder = [];
      //damage type
      if (Magic === true) {
        const filteredout = rawData.filter(
          (chars) => chars["Magic"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Melee === true) {
        const filteredout = rawData.filter(
          (chars) => chars["Melee"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Ranged === true) {
        const filteredout = rawData.filter(
          (chars) => chars["Ranged"] === true
        );
        filterholder.push(...filteredout);
      }
      //slots
      if (ASlot === true) {
        const filteredout = rawData.filter(
          (chars) => chars["SlotA"] === true
        );
        filterholder.push(...filteredout);
      }
      if (BSlot === true) {
        const filteredout = rawData.filter(
          (chars) => chars["SlotB"] === true
        );
        filterholder.push(...filteredout);
      }
      if (CSlot === true) {
        const filteredout = rawData.filter(
          (chars) => chars["SlotC"] === true
        );
        filterholder.push(...filteredout);
      }
      if (DSlot === true) {
        const filteredout = rawData.filter(
          (chars) => chars["SlotD"] === true
        );
        filterholder.push(...filteredout);
      }
      if (ESlot === true) {
        const filteredout = rawData.filter(
          (chars) => chars["SlotE"] === true
        );
        filterholder.push(...filteredout);
      }
      //elements
      if (Fire === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Fire_Damage"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Ice === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Ice_Damage"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Thunder === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Thunder_Damage"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Water === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Water_Damage"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Earth === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Earth_Damage"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Wind === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Wind_Damage"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Dark === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Dark_Damage"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Holy === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Holy_Damage"] === true
        );
        filterholder.push(...filteredout);
      }
      //max gear
      if (ActiveRework === true) {
        const filteredout = rawData.filter(
          (chars) => chars["ActiveRework"] === true
        );
        filterholder.push(...filteredout);
      }
      if (FRFlag === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["FRFlag"] === true
        );
        filterholder.push(...filteredout);
      }
      if (FE50BoardFlag === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["FE50BoardFlag"] === true
        );
        filterholder.push(...filteredout);
      }
      if (BTPlusFlag === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["BTPlusFlag"] === true
        );
        filterholder.push(...filteredout);
      }
      //non-tag
      if (NoFR === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["NoFR"] === true
        );
        filterholder.push(...filteredout);
      }
      if (NoFRBoard === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["NoFRBoard"] === true
        );
        filterholder.push(...filteredout);
      }
      if (NoFE50 === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["NoFE50"] === true
        );
        filterholder.push(...filteredout);
      }
      if (NoBT === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["NoBT"] === true
        );
        filterholder.push(...filteredout);
      }
      //crystals
      if (RedCrystal === true) {
        const filteredout = rawData.filter(
          (chars) => chars["RedCrystal"] === true
        );
        filterholder.push(...filteredout);
      }
      if (BlueCrystal === true) {
        const filteredout = rawData.filter(
          (chars) => chars["BlueCrystal"] === true
        );
        filterholder.push(...filteredout);
      }
      if (GreenCrystal === true) {
        const filteredout = rawData.filter(
          (chars) => chars["GreenCrystal"] === true
        );
        filterholder.push(...filteredout);
      }
      if (YellowCrystal === true) {
        const filteredout = rawData.filter(
          (chars) => chars["YellowCrystal"] === true
        );
        filterholder.push(...filteredout);
      }
      if (BlackCrystal === true) {
        const filteredout = rawData.filter(
          (chars) => chars["BlackCrystal"] === true
        );
        filterholder.push(...filteredout);
      }
      if (WhiteCrystal === true) {
        const filteredout = rawData.filter(
          (chars) => chars["WhiteCrystal"] === true
        );
        filterholder.push(...filteredout);
      }
      //weapons
      if (Dagger === true) {
        const filteredout = rawData.filter(
          (chars) => chars["Dagger"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Sword === true) {
        const filteredout = rawData.filter(
          (chars) => chars["Sword"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Greatsword === true) {
        const filteredout = rawData.filter(
          (chars) => chars["Greatsword"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Staff === true) {
        const filteredout = rawData.filter(
          (chars) => chars["Staff"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Gun === true) {
        const filteredout = rawData.filter(
          (chars) => chars["Gun"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Fist === true) {
        const filteredout = rawData.filter(
          (chars) => chars["Fist"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Throwing === true) {
        const filteredout = rawData.filter(
          (chars) => chars["Throwing"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Spear === true) {
        const filteredout = rawData.filter(
          (chars) => chars["Spear"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Bow === true) {
        const filteredout = rawData.filter(
          (chars) => chars["Bow"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Whip === true) {
        const filteredout = rawData.filter(
          (chars) => chars["Whip"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Other === true) {
        const filteredout = rawData.filter(
          (chars) => chars["Other"] === true
        );
        filterholder.push(...filteredout);
      }
      //classes
      if (MagicImperil === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Magic_Imperil"] === true
        );
        filterholder.push(...filteredout);
      }
      if (MeleeImperil === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Melee_Imperil"] === true
        );
        filterholder.push(...filteredout);
      }
      if (RangedImperil === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Ranged_Imperil"] === true
        );
        filterholder.push(...filteredout);
      }
      if (FireEnchant === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Fire_Enchant"] === true
        );
        filterholder.push(...filteredout);
      }
      if (IceEnchant === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Ice_Enchant"] === true
        );
        filterholder.push(...filteredout);
      }
      if (ThunderEnchant === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Thunder_Enchant"] === true
        );
        filterholder.push(...filteredout);
      }
      if (WaterEnchant === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Water_Enchant"] === true
        );
        filterholder.push(...filteredout);
      }
      if (EarthEnchant === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Earth_Enchant"] === true
        );
        filterholder.push(...filteredout);
      }
      if (WindEnchant === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Wind_Enchant"] === true
        );
        filterholder.push(...filteredout);
      }
      if (DarkEnchant === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Dark_Enchant"] === true
        );
        filterholder.push(...filteredout);
      }
      if (HolyEnchant === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Holy_Enchant"] === true
        );
        filterholder.push(...filteredout);
      }
      if (FireImperil === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Fire_Imperil"] === true
        );
        filterholder.push(...filteredout);
      }
      if (IceImperil === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Ice_Imperil"] === true
        );
        filterholder.push(...filteredout);
      }
      if (ThunderImperil === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Thunder_Imperil"] === true
        );
        filterholder.push(...filteredout);
      }
      if (WaterImperil === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Water_Imperil"] === true
        );
        filterholder.push(...filteredout);
      }
      if (EarthImperil === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Earth_Imperil"] === true
        );
        filterholder.push(...filteredout);
      }
      if (WindImperil === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Wind_Imperil"] === true
        );
        filterholder.push(...filteredout);
      }
      if (DarkImperil === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Dark_Imperil"] === true
        );
        filterholder.push(...filteredout);
      }
      if (HolyImperil === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Holy_Imperil"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Debuffer === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Debuffer"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Cleanse === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Cleanse"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Trap === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Trap"] === true
        );
        filterholder.push(...filteredout);
      }
      if (BRVPoison === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["BRV_Poison"] === true
        );
        filterholder.push(...filteredout);
      }
      if (HPPoison === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["HP_Poison"] === true
        );
        filterholder.push(...filteredout);
      }
      if (BRVResistDown === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["BRV_Resist_Down"] === true
        );
        filterholder.push(...filteredout);
      }
      if (HPResistDown === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["HP_Resist_Down"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Tank === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Cover"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Battery === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Battery"] === true
        );
        filterholder.push(...filteredout);
      }
      if (BRVControl === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["BRV_Control"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Launcher === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Launcher"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Disable === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Disable"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Dispel === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Dispel"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Counter === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Counter"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Delay === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Delay"] === true
        );
        filterholder.push(...filteredout);
      }
      if (ForceBreak === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Force_Break"] === true
        );
        filterholder.push(...filteredout);
      }
      if (DeleteTurns === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Delete_Turns"] === true
        );
        filterholder.push(...filteredout);
      }
      if (BRVDamageResist === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["BRV_Damage_Resist"] === true
        );
        filterholder.push(...filteredout);
      }
      if (HPDamageResist === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["HP_Damage_Resist"] === true
        );
        filterholder.push(...filteredout);
      }
      if (BRVRegen === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["BRV_Regen"] === true
        );
        filterholder.push(...filteredout);
      }
      if (HPRegen === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["HP_Regen"] === true
        );
        filterholder.push(...filteredout);
      }
      if (BRVShield === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["BRV_Shield"] === true
        );
        filterholder.push(...filteredout);
      }
      if (HPHealAbility === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["HP_Heal_Ability"] === true
        );
        filterholder.push(...filteredout);
      }
      if (ThreeDelay === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Three_Delay"] === true
        );
        filterholder.push(...filteredout);
      }
      if (TwoAbilitiesRecover === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Two_Abilities_Recover"] === true
        );
        filterholder.push(...filteredout);
      }
      if (CritRateUp === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Crit_Rate_Up"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Evade === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Evade"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Ignore_DEF === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Ignore_DEF"] === true
        );
        filterholder.push(...filteredout);
      }
      if (KO_Prevent === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["KO_Prevent"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Reviver === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Reviver"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Stacked_Debuff == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Stacked_Debuff"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Non_Elemental == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Non_Elemental"] === true
        );
        filterholder.push(...filteredout);
      }
      if (HP_Damage_Up == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["HP_Damage_Up"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Buff_Extension == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Buff_Extension"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Break_Reset == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Break_Reset"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Self_Harm == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Self_Harm"] === true
        );
        filterholder.push(...filteredout);
      }
      if (BRVHP_Upgrade == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["BRVHP_Upgrade"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Ally_Turn_Manipulator == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Ally_Turn_Manipulator"] === true
        );
        filterholder.push(...filteredout);
      }
      if (FollowUp == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["FollowUp"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Cannot_Break == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Cannot_Break"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Blind == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Blind"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Debuff_Evade == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Debuff_Evade"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Debuff_Gold == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Debuff_Gold"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Launch_Support == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Launch_Support"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Continuous_Turns == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Continuous_Turns"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Turn_Interrupter == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Turn_Interrupter"] === true
        );
        filterholder.push(...filteredout);
      }
      if (BRV_Ratio == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["BRV_Ratio"] === true
        );
        filterholder.push(...filteredout);
      }
      if (EX_MAX_Party == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["EX_MAX_Party"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Stacked_Buff == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Stacked_Buff"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Trap_After_Trigger == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Trap_After_Trigger"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Trap_Before_Turn == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Trap_Before_Turn"] === true
        );
        filterholder.push(...filteredout);
      }
      if (FollowUp_Before_Player_Turn == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["FollowUp_Before_Player_Turn"] === true
        );
        filterholder.push(...filteredout);
      }
      if (FollowUp_Before_Ability == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["FollowUp_Before_Ability"] === true
        );
        filterholder.push(...filteredout);
      }
      if (FollowUp_Extension == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["FollowUp_Extension"] === true
        );
        filterholder.push(...filteredout);
      }
      if (FollowUp_Start_Of_Next == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["FollowUp_Start_Of_Next"] === true
        );
        filterholder.push(...filteredout);
      }
      if (FollowUp_Action_On_Enemy == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["FollowUp_Action_On_Enemy"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Free_Ability == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Free_Ability"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Stacked_Buff_Five == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Stacked_Buff_Five"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Special_Buff == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Special_Buff"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Board5Flag == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Board5Flag"] === true
        );
        filterholder.push(...filteredout);
      }
      if (BRV_Damage_Cap == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["BRV_Damage_Cap"] === true
        );
        filterholder.push(...filteredout);
      }
      if (BuffPrevent == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["BuffPrevent"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Target_Lock == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Target_Lock"] === true
        );
        filterholder.push(...filteredout);
      }
      if (Charger == true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Charger"] === true
        );
        filterholder.push(...filteredout);
      }

      if (filterholder.length === 0) {
        filterholder.push(...rawData);
      }

      const makeUnique = filterholder
        .filter(onlyUnique);
      const searchit = makeUnique.filter((char) =>
        `${char.CharacterName} ${char.JPName}`.toLowerCase().includes(searchTerm)
      );
      const getcharacterfilter = searchit.filter(function (ef) {
        const newfilterpull = ef["RealmPars"] === condFilter;
        if (condFilter !== "") {
          return newfilterpull;
        } else {
          return ef
        }
      });
      setFilterResults(makeUnique);
      setSearchResults(getcharacterfilter);
      setListDisplay(getcharacterfilter);
    }
  }, [ver, jptoggledata, NoFR, NoFRBoard, NoFE50, NoBT, Charger, BRV_Damage_Cap, Board5Flag, Special_Buff, BRVHP_Upgrade, FE50BoardFlag, Target_Lock, Free_Ability, Stacked_Buff_Five, BuffPrevent, FollowUp_Action_On_Enemy, FollowUp_Start_Of_Next, FollowUp_Extension, FollowUp_Before_Ability, FollowUp_Before_Player_Turn, Trap_After_Trigger, Trap_Before_Turn, Stacked_Buff, EX_MAX_Party, BRV_Ratio, Turn_Interrupter, Continuous_Turns, Launch_Support, Debuff_Gold, Debuff_Evade, Blind, FRFlag, Cannot_Break, FollowUp, Ally_Turn_Manipulator, Self_Harm, Break_Reset, RealmSort, JPSort, NameSort, Buff_Extension, rawData, searchTerm, HP_Damage_Up, Non_Elemental, Stacked_Debuff, KO_Prevent, Reviver, Ignore_DEF, Evade, CritRateUp, clearFilter, TwoAbilitiesRecover, merge, BRVRegen, BRVDamageResist, Dagger, Sword, Greatsword, Staff, Gun, Fist, Throwing, Spear, Bow, Whip, Other, RedCrystal, BlueCrystal, YellowCrystal, GreenCrystal, BlackCrystal, WhiteCrystal, BTPlusFlag, ActiveRework, Magic, Ranged, Melee, ASlot, BSlot, CSlot, DSlot, ESlot, Fire, Ice, Thunder, Water, Earth, Wind, Dark, Holy, Tank, Debuffer, BRVResistDown, MagicImperil, RangedImperil, MeleeImperil, WindImperil, FireImperil, ThunderImperil, HolyImperil, IceImperil, WaterImperil, EarthImperil, DarkImperil, ThreeDelay, Battery, BRVControl, BRVPoison, BRVShield, Cleanse, Counter, DarkEnchant, Delay, Disable, Dispel, EarthEnchant, FireEnchant, ForceBreak, HolyEnchant, HPDamageResist, HPHealAbility, HPPoison, HPRegen, IceEnchant, Launcher, ThunderEnchant, Trap, WaterEnchant, WindEnchant, DeleteTurns, HPResistDown, condFilter, reverse]);

  //Merge filter
  useEffect(() => {
    if (merge == true) {
      const charType = {
        Magic: Magic,
        Melee: Melee,
        Ranged: Ranged,

        SlotA: ASlot,
        SlotB: BSlot,
        SlotC: CSlot,
        SlotD: DSlot,
        SlotE: ESlot,

        RedCrystal: RedCrystal,
        BlueCrystal: BlueCrystal,
        GreenCrystal: GreenCrystal,
        YellowCrystal: YellowCrystal,
        WhiteCrystal: WhiteCrystal,
        BlackCrystal: BlackCrystal,

        Dagger: Dagger,
        Sword: Sword,
        Greatsword: Greatsword,
        Staff: Staff,
        Gun: Gun,
        Fist: Fist,
        Throwing: Throwing,
        Spear: Spear,
        Bow: Bow,
        Whip: Whip,
        Other: Other,

        FRFlag: FRFlag,
        FE50BoardFlag:FE50BoardFlag,
        BTPlusFlag: BTPlusFlag,
        Board5Flag: Board5Flag,

        NoFR: NoFR,
        NoFRBoard: NoFRBoard,
        NoBT: NoBT,
        NoFR50: NoFE50,

        Fire_Damage: Fire,
        Ice_Damage: Ice,
        Thunder_Damage: Thunder,
        Water_Damage: Water,
        Earth_Damage: Earth,
        Wind_Damage: Wind,
        Dark_Damage: Dark,
        Holy_Damage: Holy,
        Magic_Imperil: MagicImperil,
        Melee_Imperil: MeleeImperil,
        Ranged_Imperil: RangedImperil,
        Fire_Enchant: FireEnchant,
        Ice_Enchant: IceEnchant,
        Thunder_Enchant: ThunderEnchant,
        Water_Enchant: WaterEnchant,
        Earth_Enchant: EarthEnchant,
        Wind_Enchant: WindEnchant,
        Dark_Enchant: DarkEnchant,
        Holy_Enchant: HolyEnchant,
        Fire_Imperil: FireImperil,
        Ice_Imperil: IceImperil,
        Thunder_Imperil: ThunderImperil,
        Water_Imperil: WaterImperil,
        Earth_Imperil: EarthImperil,
        Wind_Imperil: WindImperil,
        Dark_Imperil: DarkImperil,
        Holy_Imperil: HolyImperil,
        Debuffer: Debuffer,
        Cleanse: Cleanse,
        Trap: Trap,
        BRV_Poison: BRVPoison,
        HP_Poison: HPPoison,
        BRV_Resist_Down: BRVResistDown,
        HP_Resist_Down: HPResistDown,
        Cover: Tank,
        Battery: Battery,
        BRV_Control: BRVControl,
        Launcher: Launcher,
        Disable: Disable,
        Dispel: Dispel,
        BuffPrevent: BuffPrevent,
        Counter: Counter,
        Delay: Delay,
        Force_Break: ForceBreak,
        Delete_Turns: DeleteTurns,
        BRV_Damage_Resist: BRVDamageResist,
        HP_Damage_Resist: HPDamageResist,
        BRV_Regen: BRVRegen,
        BRV_Shield: BRVShield,
        HP_Heal_Ability: HPHealAbility,
        Three_Delay: ThreeDelay,
        Two_Abilities_Recover: TwoAbilitiesRecover,
        Crit_Rate_Up: CritRateUp,
        Evade: Evade,
        Ignore_DEF: Ignore_DEF,
        KO_Prevent: KO_Prevent,
        Reviver: Reviver,
        Stacked_Debuff: Stacked_Debuff,
        Non_Elemental: Non_Elemental,
        HP_Damage_Up: HP_Damage_Up,
        Buff_Extension: Buff_Extension,
        Break_Reset: Break_Reset,
        HP_Regen: HPRegen,
        Self_Harm: Self_Harm,
        BRVHP_Upgrade: BRVHP_Upgrade,
        Ally_Turn_Manipulator: Ally_Turn_Manipulator,
        FollowUp: FollowUp,
        Cannot_Break: Cannot_Break,
        Blind: Blind,
        Debuff_Evade: Debuff_Evade,
        Debuff_Gold: Debuff_Gold,
        Launch_Support: Launch_Support,
        Continuous_Turns: Continuous_Turns,
        Turn_Interrupter: Turn_Interrupter,
        BRV_Ratio: BRV_Ratio,
        EX_MAX_Party: EX_MAX_Party,
        Stacked_Buff: Stacked_Buff,
        Trap_After_Trigger: Trap_After_Trigger,
        Trap_Before_Turn: Trap_Before_Turn,
        FollowUp_Before_Player_Turn: FollowUp_Before_Player_Turn,
        FollowUp_Before_Ability: FollowUp_Before_Ability,
        FollowUp_Extension: FollowUp_Extension,
        FollowUp_Start_Of_Next: FollowUp_Start_Of_Next,
        FollowUp_Action_On_Enemy: FollowUp_Action_On_Enemy,
        Free_Ability: Free_Ability,
        Stacked_Buff_Five: Stacked_Buff_Five,
        Special_Buff: Special_Buff,
        BRV_Damage_Cap: BRV_Damage_Cap,
        Target_Lock: Target_Lock,
        Charger:Charger,
      };
      
      var filtermerge = rawData.filter((oneChar) => {
        return Object.entries(charType)
          .filter(entry => entry[1])
          .every(([key, value]) => oneChar[`${ver}traits`] && oneChar[`${ver}traits`][key] === value);
      });

      const base = {
        ActiveRework: ActiveRework
      }

      filtermerge = filtermerge.filter((oneChar) => {
        return Object.entries(base)
          .filter(entry => entry[1])
          .every(([key, value]) => oneChar[key] === value);
      });

      const makeUnique = filtermerge
        .filter(onlyUnique);
      const searchit = makeUnique.filter((char) =>
        (`${char.CharacterName} ${char.JPName}`).toLowerCase().includes(searchTerm)
      );
      const getcharacterfilter = searchit.filter(function (ef) {
        const newfilterpull = ef["RealmPars"] === condFilter;
        if (condFilter !== "") {
          return newfilterpull;
        } else {
          return ef
        }
      });
      setFilterResults(makeUnique);
      setSearchResults(getcharacterfilter);
      setListDisplay(getcharacterfilter);
    }
  }, [jptoggledata, ActiveRework, ver, NoFR, NoFRBoard, NoBT, NoFE50, Charger, BRV_Damage_Cap, Board5Flag, Target_Lock, BRVHP_Upgrade, FE50BoardFlag, Special_Buff, Free_Ability, Stacked_Buff_Five, BuffPrevent, FollowUp_Action_On_Enemy, FollowUp_Start_Of_Next, FollowUp_Extension, FollowUp_Before_Ability, FollowUp_Before_Player_Turn, Trap_After_Trigger, Trap_Before_Turn, Stacked_Buff, EX_MAX_Party, BRV_Ratio, Turn_Interrupter, Continuous_Turns, Launch_Support, Debuff_Gold, Debuff_Evade, Blind, Cannot_Break, FRFlag, FollowUp, Ally_Turn_Manipulator, Self_Harm, Break_Reset, RealmSort, JPSort, Buff_Extension, rawData, searchTerm, HP_Damage_Up, Non_Elemental, Stacked_Debuff, KO_Prevent, Reviver, Ignore_DEF, Evade, CritRateUp, clearFilter, TwoAbilitiesRecover, merge, BRVRegen, BRVDamageResist, Dagger, Sword, Greatsword, Staff, Gun, Fist, Throwing, Spear, Bow, Whip, Other, RedCrystal, BlueCrystal, YellowCrystal, GreenCrystal, BlackCrystal, WhiteCrystal, BTPlusFlag, Magic, Ranged, Melee, ASlot, BSlot, CSlot, DSlot, ESlot, Fire, Ice, Thunder, Water, Earth, Wind, Dark, Holy, Tank, Debuffer, BRVResistDown, MagicImperil, RangedImperil, MeleeImperil, WindImperil, FireImperil, ThunderImperil, HolyImperil, IceImperil, WaterImperil, EarthImperil, DarkImperil, ThreeDelay, Battery, BRVControl, BRVPoison, BRVShield, Cleanse, Counter, DarkEnchant, Delay, Disable, Dispel, EarthEnchant, FireEnchant, ForceBreak, HolyEnchant, HPDamageResist, HPHealAbility, HPPoison, HPRegen, IceEnchant, Launcher, ThunderEnchant, Trap, WaterEnchant, WindEnchant, DeleteTurns, HPResistDown, condFilter, reverse]);

  const button = (value, search, set ) => {
    if (value == false) {
      search("true")
    } else {
      search("")
    }
    set((prevValue) => !prevValue);
  }

  const NameSortbutton = () => {
    if (NameSort == false) {
      setSortsearch("Name")
      setJPSort(false)
      setRealmSort(false)
    } else {
      setSortsearch("")
    }
    setNameSort((prevValue) => !prevValue);
  };

  const RealmSortbutton = () => {
    if (RealmSort == false) {
      setSortsearch("Realm")
      setJPSort(false)
      setNameSort(false)
    } else {
      setSortsearch("")
    }
    setRealmSort((prevValue) => !prevValue);
  };

  const JPSortbutton = () => {
    if (JPSort == false) {
      dispatch(setTrue())
      setSortsearch("JP")
      setJPSearch("true")
      setRealmSort(false)
      setNameSort(false)
    } else {
      setSortsearch("")
      setJPSearch("")
      dispatch(setFalse())
    }
    setJPSort((prevValue) => !prevValue);
  };

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
  const characterSelect = (e) => {
    if (e !== null) {
      setCondFilter(e.id);
      setTypesearch(e.value)
    } else {
      setCondFilter("");
      setTypesearch("")
    }
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
  const clearSearch = () => {
    setsearchdisplay("")
    setSearchTerm("");
    setTEXTsearch("")
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setSearchTerm(searchdisplay.toLowerCase());
      setTEXTsearch(searchdisplay)
    }
  }

  const chars = listDisplay;

  const bannerdisplay = <><span className="subtextgold">{chars.length}</span> Character{chars.length == 1 ? "" : "s"}</>
  const bannermatch = <>Matching <span className="subtextgold">{chars.length}</span> Character{chars.length == 1 ? "" : "s"}</>

  const resetbutton = () => {
    setclearFilter(true);
    setReverse(false)
    setMagic(false)
    setRanged(false)
    setMelee(false)
    setASlot(false)
    setBSlot(false)
    setCSlot(false)
    setDSlot(false)
    setESlot(false)
    setFire(false)
    setIce(false)
    setThunder(false)
    setWater(false)
    setEarth(false)
    setWind(false)
    setDark(false)
    setHoly(false)
    setTank(false)
    setBRVDamageResist(false)
    setBRVRegen(false)
    setDebuffer(false)
    setBRVResistDown(false)
    setMagicImperil(false)
    setRangedImperil(false)
    setMeleeImperil(false)
    setWindImperil(false)
    setFireImperil(false)
    setThunderImperil(false)
    setHolyImperil(false)
    setIceImperil(false)
    setWaterImperil(false)
    setEarthImperil(false)
    setDarkImperil(false)
    setThreeDelay(false)
    setBattery(false)
    setBRVControl(false)
    setBRVPoison(false)
    setBRVShield(false)
    setCleanse(false)
    setCounter(false)
    setDarkEnchant(false)
    setDelay(false)
    setDisable(false)
    setDispel(false)
    setBuffPrevent(false)
    setEarthEnchant(false)
    setFireEnchant(false)
    setForceBreak(false)
    setHolyEnchant(false)
    setHPDamageResist(false)
    setHPHealAbility(false)
    setHPPoison(false)
    setHPRegen(false)
    setIceEnchant(false)
    setLauncher(false)
    setThunderEnchant(false)
    setTrap(false)
    setWaterEnchant(false)
    setWindEnchant(false)
    setDeleteTurns(false)
    setHPResistDown(false)
    setActiveRework(false)
    setFRFlag(false)
    setFE50BoardFlag(false)
    setBTPlusFlag(false)
    setRedCrystal(false)
    setBlueCrystal(false)
    setGreenCrystal(false)
    setYellowCrystal(false)
    setWhiteCrystal(false)
    setBlackCrystal(false)
    setDagger(false)
    setSword(false)
    setGreatsword(false)
    setStaff(false)
    setGun(false)
    setFist(false)
    setThrowing(false)
    setSpear(false)
    setBow(false)
    setWhip(false)
    setOther(false)
    setTwoAbilitiesRecover(false)
    setCritRateUp(false)
    setEvade(false)
    setIgnore_DEF(false)
    setKO_Prevent(false)
    setReviver(false)
    setStacked_Debuff(false)
    setNon_Elemental(false)
    setHP_Damage_Up(false)
    setMerge(false)
    setRealmSort(false)
    setNameSort(false)
    setJPSort(false)
    setBuff_Extension(false)
    setBreak_Reset(false)
    setSelf_Harm(false)
    setBRVHP_Upgrade(false)
    setAlly_Turn_Manipulator(false)
    setFollowUp(false)
    setCannot_Break(false)
    setBlind(false)
    setDebuff_Evade(false)
    setDebuff_Gold(false)
    setLaunch_Support(false)
    setContinuous_Turns(false)
    setTurn_Interrupter(false)
    setBRV_Ratio(false)
    setEX_MAX_Party(false)
    setStacked_Buff(false)
    setTrap_After_Trigger(false)
    setTrap_Before_Turn(false)
    setFollowUp_Before_Player_Turn(false)
    setFollowUp_Before_Ability(false)
    setFollowUp_Extension(false)
    setFollowUp_Start_Of_Next(false)
    setFollowUp_Action_On_Enemy(false)
    setFree_Ability(false)
    setStacked_Buff_Five(false)
    setBoard5Flag(false)
    setBRV_Damage_Cap(false)
    setspoilers(false)
    setTarget_Lock(false)
    setCharger(false)

    setNoFE50(false)
    setNoFR(false)
    setNoBT(false)
    setNoFRBoard(false)

    setMagicsearch("")
    setRangedsearch("")
    setMeleesearch("")
    setNon_Elementalsearch("")

    setASlotsearch("")
    setBSlotsearch("")
    setCSlotsearch("")
    setDSlotsearch("")
    setESlotsearch("")

    setRedCrystalsearch("")
    setBlueCrystalsearch("")
    setGreenCrystalsearch("")
    setYellowCrystalsearch("")
    setBlackCrystalsearch("")
    setWhiteCrystalsearch("")

    setFiresearch("")
    setIcesearch("")
    setThundersearch("")
    setWatersearch("")
    setEarthsearch("")
    setWindsearch("")
    setDarksearch("")
    setHolysearch("")

    setDaggersearch("")
    setSwordsearch("")
    setGreatswordsearch("")
    setStaffsearch("")
    setGunsearch("")
    setFistsearch("")
    setThrowingsearch("")
    setSpearsearch("")
    setBowsearch("")
    setWhipsearch("")
    setOthersearch("")

    setMagicImperilsearch("")
    setMeleeImperilsearch("")
    setRangedImperilsearch("")

    setFireEnchantsearch("")
    setIceEnchantsearch("")
    setThunderEnchantsearch("")
    setWaterEnchantsearch("")
    setEarthEnchantsearch("")
    setWindEnchantsearch("")
    setDarkEnchantsearch("")
    setHolyEnchantsearch("")

    setFireImperilsearch("")
    setIceImperilsearch("")
    setThunderImperilsearch("")
    setWaterImperilsearch("")
    setEarthImperilsearch("")
    setWindImperilsearch("")
    setDarkImperilsearch("")
    setHolyImperilsearch("")

    setDebuffersearch("")
    setCleansesearch("")
    setTrapsearch("")
    setBRVPoisonsearch("")
    setHPPoisonsearch("")
    setBRVResistDownsearch("")
    setHPResistDownsearch("")
    setBRVControlsearch("")
    setDisablesearch("")
    setStacked_Debuffsearch("")
    setHP_Damage_Upsearch("")
    setTanksearch("")
    setBatterysearch("")
    setLaunchersearch("")
    setDispelsearch("")
    setBuffPreventsearch("")
    setCountersearch("")
    setDelaysearch("")
    setThreeDelaysearch("")
    setForceBreaksearch("")
    setDeleteTurnssearch("")
    setBRVDamageResistsearch("")
    setHPDamageResistsearch("")
    setBRVRegensearch("")
    setHPRegensearch("")
    setBRVShieldsearch("")
    setHPHealAbilitysearch("")
    setTwoAbilitiesRecoversearch("")
    setCritRateUpsearch("")
    setEvadesearch("")
    setIgnore_DEFsearch("")
    setKO_Preventsearch("")
    setReviversearch("")
    setBuff_Extensionsearch("")
    setBreak_Resetsearch("")
    setSelf_Harmsearch("")
    setBRVHP_Upgradesearch("")
    setAlly_Turn_Manipulatorsearch("")
    setFollowUpsearch("")
    setCannot_Breaksearch("")
    setBlindsearch("")
    setDebuff_Evadesearch("")
    setDebuff_Goldsearch("")
    setLaunch_Supportsearch("")
    setContinuous_Turnssearch("")
    setTurn_Interruptersearch("")
    setBRV_Ratiosearch("")
    setEX_MAX_Partysearch("")
    setStacked_Buffsearch("")
    setTrap_After_Triggersearch("")
    setTrap_Before_Turnsearch("")
    setFollowUp_Before_Player_Turnsearch("")
    setFollowUp_Before_Abilitysearch("")
    setFollowUp_Extensionsearch("")
    setFollowUp_Start_Of_Nextsearch("")
    setFollowUp_Action_On_Enemysearch("")
    setFree_Abilitysearch('')
    setStacked_Buff_Fivesearch('')
    setBRV_Damage_Capsearch('')
    setTarget_Locksearch('')
    setChargersearch('')

    setActiveReworksearch("")
    setFE50BoardFlagsearch("")
    setFRFlagsearch("")
    setBTPlusFlagsearch("")
    setBoard5Flagsearch('')

    setNoFE50search("")
    setNoFRsearch("")
    setNoBTsearch("")
    setNoFRBoardsearch('')

    setSortsearch("")

    setMergesearch("")
    setReversesearch("")
    setTEXTsearch("")
    setTypesearch("")
    setspoilerssearch("")

    setsearchdisplay("");
    setSearchTerm("");
    setCondFilter("")
    setTimeout(() => setclearFilter(false), 1000);
  }

  const jponlybutton = () => {
    if (jptoggledata == false) {
      dispatch(setTrue())
      setJPSearch("true")
    } else {
      dispatch(setFalse())
      setJPSearch("")
    }
  };

  return (
    <div>
      <Helmet>
        <title>Characters - Dissidia Compendium</title>
        <meta property="og:site_name" content="Dissidia Compendium" />
        <meta property="og:type" content="website" />
        <meta name="description" content="Dissidia Opera Omnia Database Characters with english translations for all enemies found in game" />
        <meta name="twitter:title" content="Dissidia Compendium - Characters" />
        <meta name="twitter:description" content="Dissidia Opera Omnia Database Characters with english translations for all enemies found in game" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:alt" content="Dissidia Compendium - Characters" />
        <meta property="og:title" content="Dissidia Compendium - Characters" />
        <meta property="og:description" content="Dissidia Opera Omnia Database Characters with english translations for all enemies found in game" />
        <meta property="og:url" content="https://dissidiacompendium.com/chracters" />
      </Helmet>
      <div className="content">
        <h1>{`${jptoggledata ? "JP" : "GL"} Characters`}</h1>
        <div className="charfilterspacer" />
        <div key="filter1" onClick={()=>button(showFilter,setFiltersearch,setShowFilter)} className="charfilter"><span className="filterstext"></span>{showFilter ? <TiArrowSortedUp className="uparrow" /> : <TiArrowSortedDown className="downarrow" />}</div>
        {showFilter == false ?
          <div className="event-search-reverse-holder">
            <span className={`${jptoggledata ? "jponlybackground" : "GLonlybackground"}`}>
              <Tippy content={`${jptoggledata ? "Switch to GL" : "Switch to JP"}`} className="tooltip" >
                <span onClick={jponlybutton} className={`${jptoggledata ? "jpflage jpsmallinactive smalleventbutton" : "glflage smalleventbutton"}`} />
              </Tippy>
            </span>
            <IoSearch className="searchicon" />
            <div className="search-holder el">
              <input
                className="char-search-bar"
                type="text"
                id="search"
                placeholder="Search Name"
                value={searchdisplay}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              <span className="Spoilerbackground">
                <Tippy content={`Spoilers ${spoilers == false ? "on" : "off"}!`} className="tooltip" >
                  <span>
                    <ImWarning
                      onClick={()=>button(spoilers,setspoilerssearch,setspoilers)}
                      className={`spoiler_toggle jpsmallinactive ${spoilers ? "spoiler_off" : ""}`}
                      color='#ed2226'
                      size='30px'
                    ></ImWarning>
                  </span>
                </Tippy>
              </span>
              {searchTerm === "" ? "" :
                <IoMdCloseCircleOutline onClick={clearSearch} className="eventclearsearch"></IoMdCloseCircleOutline>}
            </div>
          </div>
          : 
        <div className="filterholder noselect" id={showFilter ? "showfilteren" : "hiddenfilteren"}>
          <div className="similarbanner">Basic Traits</div>
          <div className="filterholderflair">
            <ul className="bufftypes">
              <Tippy content="A Sphere Slot">
                <li className={`${ASlot ? "filteractive" : "filterinactive"} spheresbutton aSpheresButton`} onClick={()=>button(ASlot,setASlotsearch,setASlot)}></li>
              </Tippy>
              <Tippy content="B Sphere Slot">
                <li className={`${BSlot ? "filteractive" : "filterinactive"} spheresbutton bSpheresButton`} onClick={()=>button(BSlot,setBSlotsearch,setBSlot)}></li>
              </Tippy>
              <Tippy content="C Sphere Slot">
                <li className={`${CSlot ? "filteractive" : "filterinactive"} spheresbutton cSpheresButton`} onClick={()=>button(CSlot,setCSlotsearch,setCSlot)}></li>
              </Tippy>
              <Tippy content="D Sphere Slot">
                <li className={`${DSlot ? "filteractive" : "filterinactive"} spheresbutton dSpheresButton`} onClick={()=>button(DSlot,setDSlotsearch,setDSlot)}></li>
              </Tippy>
              <Tippy content="E Sphere Slot">
                <li className={`${ESlot ? "filteractive" : "filterinactive"} spheresbutton eSpheresButton`} onClick={()=>button(ESlot,setESlotsearch,setESlot)}></li>
              </Tippy>
            </ul>
            <br />
            <ul className="bufftypes">
              <Tippy content="Red Crystal">
                <li className={`${RedCrystal ? "filteractive" : "filterinactive"} spheresbutton redcrystalbutton`} onClick={()=>button(RedCrystal,setRedCrystalsearch,setRedCrystal)}></li>
              </Tippy>
              <Tippy content="Blue Crystal">
                <li className={`${BlueCrystal ? "filteractive" : "filterinactive"} spheresbutton bluecrystalbutton`} onClick={()=>button(BlueCrystal,setBlueCrystalsearch,setBlueCrystal)}></li>
              </Tippy>
              <Tippy content="Green Crystal">
                <li className={`${GreenCrystal ? "filteractive" : "filterinactive"} spheresbutton greencrystalbutton`} onClick={()=>button(GreenCrystal,setGreenCrystalsearch,setGreenCrystal)}></li>
              </Tippy>
              <Tippy content="Yellow Crystal">
                <li className={`${YellowCrystal ? "filteractive" : "filterinactive"} spheresbutton yellowcrystalbutton`} onClick={()=>button(YellowCrystal,setYellowCrystalsearch,setYellowCrystal)}></li>
              </Tippy>
              <Tippy content="White Crystal">
                <li className={`${WhiteCrystal ? "filteractive" : "filterinactive"} spheresbutton whitecrystalbutton`} onClick={()=>button(WhiteCrystal,setWhiteCrystalsearch,setWhiteCrystal)}></li>
              </Tippy>
              <Tippy content="Black Crystal">
                <li className={`${BlackCrystal ? "filteractive" : "filterinactive"} spheresbutton blackcrystalbutton`} onClick={()=>button(BlackCrystal,setBlackCrystalsearch,setBlackCrystal)}></li>
              </Tippy>
            </ul>
            <br />
            <ul className="bufftypes">
              <Tippy content="Dagger Weapon">
                <li className={`${Dagger ? "filteractive" : "filterinactive"} spheresbutton daggerbutton`} onClick={()=>button(Dagger,setDaggersearch,setDagger)}></li>
              </Tippy>
              <Tippy content="Sword Weapon">
                <li className={`${Sword ? "filteractive" : "filterinactive"} spheresbutton swordbutton`} onClick={()=>button(Sword,setSwordsearch,setSword)}></li>
              </Tippy>
              <Tippy content="Greatsword Weapon">
                <li className={`${Greatsword ? "filteractive" : "filterinactive"} spheresbutton greatswordbutton`} onClick={()=>button(Greatsword,setGreatswordsearch,setGreatsword)}></li>
              </Tippy>
              <Tippy content="Staff Weapon">
                <li className={`${Staff ? "filteractive" : "filterinactive"} spheresbutton staffbutton`} onClick={()=>button(Staff,setStaffsearch,setStaff)}></li>
              </Tippy>
              <Tippy content="Gun Weapon">
                <li className={`${Gun ? "filteractive" : "filterinactive"} spheresbutton gunbutton`} onClick={()=>button(Gun,setGunsearch,setGun)}></li>
              </Tippy>
              <Tippy content="Fist Weapon">
                <li className={`${Fist ? "filteractive" : "filterinactive"} spheresbutton fistbutton`} onClick={()=>button(Fist,setFistsearch,setFist)}></li>
              </Tippy>
              <Tippy content="Throwing Weapon">
                <li className={`${Throwing ? "filteractive" : "filterinactive"} spheresbutton throwingbutton`} onClick={()=>button(Throwing,setThrowingsearch,setThrowing)}></li>
              </Tippy>
              <Tippy content="Spear Weapon">
                <li className={`${Spear ? "filteractive" : "filterinactive"} spheresbutton spearbutton`} onClick={()=>button(Spear,setSpearsearch,setSpear)}></li>
              </Tippy>
              <Tippy content="Bow Weapon">
                <li className={`${Bow ? "filteractive" : "filterinactive"} spheresbutton bowbutton`} onClick={()=>button(Bow,setBowsearch,setBow)}></li>
              </Tippy>
              <Tippy content="Whip Weapon">
                <li className={`${Whip ? "filteractive" : "filterinactive"} spheresbutton whipbutton`} onClick={()=>button(Whip,setWhipsearch,setWhip)}></li>
              </Tippy>
              <Tippy content="Other Weapon">
                <li className={`${Other ? "filteractive" : "filterinactive"} spheresbutton otherbutton`} onClick={()=>button(Other,setOthersearch,setOther)}></li>
              </Tippy>
            </ul>
            <br />
            <div className="similarbanner">Damage Types</div>
            <ul className="bufftypes">
              <Tippy content="Magic Damage Type">
                <li className={`${Magic ? "filteractive" : "filterinactive"} buffsbutton magicbutton`} onClick={()=>button(Magic,setMagicsearch,setMagic)}></li>
              </Tippy>
              <Tippy content="Melee Damage Type">
                <li className={`${Melee ? "filteractive" : "filterinactive"} buffsbutton meleebutton`} onClick={()=>button(Melee,setMeleesearch,setMelee)}></li>
              </Tippy>
              <Tippy content="Ranged Damage Type">
                <li className={`${Ranged ? "filteractive" : "filterinactive"} buffsbutton rangedbutton`} onClick={()=>button(Ranged,setRangedsearch,setRanged)}></li>
              </Tippy>
              <Tippy content="Non-Elemental">
                <li className={`${Non_Elemental ? "filteractive" : "filterinactive"} buffsbutton Non_Elementalbutton`} onClick={()=>button(Non_Elemental,setNon_Elementalsearch,setNon_Elemental)}></li>
              </Tippy>
            </ul>
            <br />
            <ul className="bufftypes">
              <Tippy content="Fire BRV Damage">
                <li className={`${Fire ? "filteractive" : "filterinactive"} spheresbutton Firebutton`} onClick={()=>button(Fire,setFiresearch,setFire)}></li>
              </Tippy>
              <Tippy content="Ice BRV Damage">
                <li className={`${Ice ? "filteractive" : "filterinactive"} spheresbutton Icebutton`} onClick={()=>button(Ice,setIcesearch,setIce)}></li>
              </Tippy>
              <Tippy content="Thunder BRV Damage">
                <li className={`${Thunder ? "filteractive" : "filterinactive"} spheresbutton Thunderbutton`} onClick={()=>button(Thunder,setThundersearch,setThunder)}></li>
              </Tippy>
              <Tippy content="Water BRV Damage">
                <li className={`${Water ? "filteractive" : "filterinactive"} spheresbutton Waterbutton`} onClick={()=>button(Water,setWatersearch,setWater)}></li>
              </Tippy>
              <Tippy content="Earth BRV Damage">
                <li className={`${Earth ? "filteractive" : "filterinactive"} spheresbutton Earthbutton`} onClick={()=>button(Earth,setEarthsearch,setEarth)}></li>
              </Tippy>
              <Tippy content="Wind BRV Damage">
                <li className={`${Wind ? "filteractive" : "filterinactive"} spheresbutton Windbutton`} onClick={()=>button(Wind,setWindsearch,setWind)}></li>
              </Tippy>
              <Tippy content="Dark BRV Damage">
                <li className={`${Dark ? "filteractive" : "filterinactive"} spheresbutton Darkbutton`} onClick={()=>button(Dark,setDarksearch,setDark)}></li>
              </Tippy>
              <Tippy content="Holy BRV Damage">
                <li className={`${Holy ? "filteractive" : "filterinactive"} spheresbutton Holybutton`} onClick={()=>button(Holy,setHolysearch,setHoly)}></li>
              </Tippy>
            </ul>
            <div className="similarbanner">Attacking</div>
            <ul className="bufftypes">
              <Tippy content={roles[`Magic_Imperil`].name}>
                <li className={`${MagicImperil ? "filteractive" : "filterinactive"} spheresbutton`} onClick={()=>button(MagicImperil,setMagicImperilsearch,setMagicImperil)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Magic_Imperil`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Melee_Imperil`].name}>
                <li className={`${MeleeImperil ? "filteractive" : "filterinactive"} spheresbutton`} onClick={()=>button(MeleeImperil,setMeleeImperilsearch,setMeleeImperil)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Melee_Imperil`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Ranged_Imperil`].name}>
                <li className={`${RangedImperil ? "filteractive" : "filterinactive"} spheresbutton`} onClick={()=>button(RangedImperil,setRangedImperilsearch,setRangedImperil)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Ranged_Imperil`].url}.png)` }}></li>
              </Tippy>
            </ul>
            <br />
            <ul className="bufftypes">
              <Tippy content={roles[`Fire_Enchant`].name}>
                <li className={`${FireEnchant ? "filteractive" : "filterinactive"} spheresbutton`} onClick={()=>button(FireEnchant,setFireEnchantsearch,setFireEnchant)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Fire_Enchant`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Ice_Enchant`].name}>
                <li className={`${IceEnchant ? "filteractive" : "filterinactive"} spheresbutton`} onClick={()=>button(IceEnchant,setIceEnchantsearch,setIceEnchant)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Ice_Enchant`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Thunder_Enchant`].name}>
                <li className={`${ThunderEnchant ? "filteractive" : "filterinactive"} spheresbutton`} onClick={()=>button(ThunderEnchant,setThunderEnchantsearch,setThunderEnchant)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Thunder_Enchant`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Water_Enchant`].name}>
                <li className={`${WaterEnchant ? "filteractive" : "filterinactive"} spheresbutton`} onClick={()=>button(WaterEnchant,setWaterEnchantsearch,setWaterEnchant)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Water_Enchant`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Earth_Enchant`].name}>
                <li className={`${EarthEnchant ? "filteractive" : "filterinactive"} spheresbutton`} onClick={()=>button(EarthEnchant,setEarthEnchantsearch,setEarthEnchant)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Earth_Enchant`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Wind_Enchant`].name}>
                <li className={`${WindEnchant ? "filteractive" : "filterinactive"} spheresbutton`} onClick={()=>button(WindEnchant,setWindEnchantsearch,setWindEnchant)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Wind_Enchant`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Dark_Enchant`].name}>
                <li className={`${DarkEnchant ? "filteractive" : "filterinactive"} spheresbutton`} onClick={()=>button(DarkEnchant,setDarkEnchantsearch,setDarkEnchant)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Dark_Enchant`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Holy_Enchant`].name}>
                <li className={`${HolyEnchant ? "filteractive" : "filterinactive"} spheresbutton`} onClick={()=>button(HolyEnchant,setHolyEnchantsearch,setHolyEnchant)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Holy_Enchant`].url}.png)` }}></li>
              </Tippy>
            </ul>
            <br />
            <ul className="bufftypes">
              <Tippy content={roles[`Fire_Imperil`].name}>
                <li className={`${FireImperil ? "filteractive" : "filterinactive"} spheresbutton`} onClick={()=>button(FireImperil,setFireImperilsearch,setFireImperil)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Fire_Imperil`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Ice_Imperil`].name}>
                <li className={`${IceImperil ? "filteractive" : "filterinactive"} spheresbutton`} onClick={()=>button(IceImperil,setIceImperilsearch,setIceImperil)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Ice_Imperil`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Thunder_Imperil`].name}>
                <li className={`${ThunderImperil ? "filteractive" : "filterinactive"} spheresbutton`} onClick={()=>button(ThunderImperil,setThunderImperilsearch,setThunderImperil)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Thunder_Imperil`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Water_Imperil`].name}>
                <li className={`${WaterImperil ? "filteractive" : "filterinactive"} spheresbutton`} onClick={()=>button(WaterImperil,setWaterImperilsearch,setWaterImperil)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Water_Imperil`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Earth_Imperil`].name}>
                <li className={`${EarthImperil ? "filteractive" : "filterinactive"} spheresbutton`} onClick={()=>button(EarthImperil,setEarthImperilsearch,setEarthImperil)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Earth_Imperil`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Wind_Imperil`].name}>
                <li className={`${WindImperil ? "filteractive" : "filterinactive"} spheresbutton`} onClick={()=>button(WindImperil,setWindImperilsearch,setWindImperil)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Wind_Imperil`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Dark_Imperil`].name}>
                <li className={`${DarkImperil ? "filteractive" : "filterinactive"} spheresbutton`} onClick={()=>button(DarkImperil,setDarkImperilsearch,setDarkImperil)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Dark_Imperil`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Holy_Imperil`].name}>
                <li className={`${HolyImperil ? "filteractive" : "filterinactive"} spheresbutton`} onClick={()=>button(HolyImperil,setHolyImperilsearch,setHolyImperil)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Holy_Imperil`].url}.png)` }}></li>
              </Tippy>
            </ul>
            <br />
            <ul className="characterclasses">
              <Tippy content={roles[`Launcher`].name}>
                <li className={`${Launcher ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Launcher,setLaunchersearch,setLauncher)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Launcher`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Launch_Support`].name}>
                <li className={`${Launch_Support ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Launch_Support,setLaunch_Supportsearch,setLaunch_Support)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Launch_Support`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Force_Break`].name}>
                <li className={`${ForceBreak ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(ForceBreak,setForceBreaksearch,setForceBreak)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Force_Break`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Crit_Rate_Up`].name}>
                <li className={`${CritRateUp ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(CritRateUp,setCritRateUpsearch,setCritRateUp)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Crit_Rate_Up`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Ignore_DEF`].name}>
                <li className={`${Ignore_DEF ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Ignore_DEF,setIgnore_DEFsearch,setIgnore_DEF)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Ignore_DEF`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Continuous_Turns`].name}>
                <li className={`${Continuous_Turns ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Continuous_Turns,setContinuous_Turnssearch,setContinuous_Turns)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Continuous_Turns`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Turn_Interrupter`].name}>
                <li className={`${Turn_Interrupter ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Turn_Interrupter,setTurn_Interruptersearch,setTurn_Interrupter)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Turn_Interrupter`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Ally_Turn_Manipulator`].name}>
                <li className={`${Ally_Turn_Manipulator ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Ally_Turn_Manipulator,setAlly_Turn_Manipulatorsearch,setAlly_Turn_Manipulator)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Ally_Turn_Manipulator`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`BRV_Ratio`].name}>
                <li className={`${BRV_Ratio ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(BRV_Ratio,setBRV_Ratiosearch,setBRV_Ratio)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`BRV_Ratio`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`HP_Damage_Up_Party`].name}>
                <li className={`${HP_Damage_Up ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(HP_Damage_Up,setHP_Damage_Upsearch,setHP_Damage_Up)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`HP_Damage_Up_Party`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`BRV_Damage_Cap`].name}>
                <li className={`${BRV_Damage_Cap ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(BRV_Damage_Cap,setBRV_Damage_Capsearch,setBRV_Damage_Cap)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`BRV_Damage_Cap`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`EX_MAX_Party`].name}>
                <li className={`${EX_MAX_Party ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(EX_MAX_Party,setEX_MAX_Partysearch,setEX_MAX_Party)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`EX_MAX_Party`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Debuffer`].name}>
                <li className={`${Debuffer ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Debuffer,setDebuffersearch,setDebuffer)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Debuffer`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`BRV_Resist_Down`].name}>
                <li className={`${BRVResistDown ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(BRVResistDown,setBRVResistDownsearch,setBRVResistDown)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`BRV_Resist_Down`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`HP_Resist_Down`].name}>
                <li className={`${HPResistDown ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(HPResistDown,setHPResistDownsearch,setHPResistDown)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`HP_Resist_Down`].url}.png)` }}></li>
              </Tippy>
            </ul>
            <div className="similarbanner">Healing</div>
            <ul className="characterclasses">
              <Tippy content={roles[`Cleanse`].name}>
                <li className={`${Cleanse ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Cleanse,setCleansesearch,setCleanse)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Cleanse`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Battery`].name}>
                <li className={`${Battery ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Battery,setBatterysearch,setBattery)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Battery`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Reviver`].name}>
                <li className={`${Reviver ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Reviver,setReviversearch,setReviver)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Reviver`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`KO_Prevent`].name}>
                <li className={`${KO_Prevent ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(KO_Prevent,setKO_Preventsearch,setKO_Prevent)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`KO_Prevent`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`BRV_Regen`].name}>
                <li className={`${BRVRegen ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(BRVRegen,setBRVRegensearch,setBRVRegen)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`BRV_Regen`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`HP_Regen`].name}>
                <li className={`${HPRegen ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(HPRegen,setHPRegensearch,setHPRegen)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`HP_Regen`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`HP_Heal_Ability`].name}>
                <li className={`${HPHealAbility ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(HPHealAbility,setHPHealAbilitysearch,setHPHealAbility)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`HP_Heal_Ability`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Two_Abilities_Recover`].name}>
                <li className={`${TwoAbilitiesRecover ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(TwoAbilitiesRecover,setTwoAbilitiesRecoversearch,setTwoAbilitiesRecover)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Two_Abilities_Recover`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Buff_Extension`].name}>
                <li className={`${Buff_Extension ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Buff_Extension,setBuff_Extensionsearch,setBuff_Extension)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Buff_Extension`].url}.png)` }}></li>
              </Tippy>
            </ul>
            <div className="similarbanner">Additional Attacks</div>
            <ul className="characterclasses">
              <Tippy content={roles[`Trap`].name}>
                <li className={`${Trap ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Trap,setTrapsearch,setTrap)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Trap`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Trap_After_Trigger`].name}>
                <li className={`${Trap_After_Trigger ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Trap_After_Trigger,setTrap_After_Triggersearch,setTrap_After_Trigger)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Trap_After_Trigger`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Trap_Before_Turn`].name}>
                <li className={`${Trap_Before_Turn ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Trap_Before_Turn,setTrap_Before_Turnsearch,setTrap_Before_Turn)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Trap_Before_Turn`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Counter`].name}>
                <li className={`${Counter ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Counter,setCountersearch,setCounter)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Counter`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`FollowUp`].name}>
                <li className={`${FollowUp ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(FollowUp,setFollowUpsearch,setFollowUp)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`FollowUp`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`FollowUp_Before_Player_Turn`].name}>
                <li className={`${FollowUp_Before_Player_Turn ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(FollowUp_Before_Player_Turn,setFollowUp_Before_Player_Turnsearch,setFollowUp_Before_Player_Turn)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`FollowUp_Before_Player_Turn`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`FollowUp_Before_Ability`].name}>
                <li className={`${FollowUp_Before_Ability ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(FollowUp_Before_Ability,setFollowUp_Before_Abilitysearch,setFollowUp_Before_Ability)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`FollowUp_Before_Ability`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`FollowUp_Extension`].name}>
                <li className={`${FollowUp_Extension ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(FollowUp_Extension,setFollowUp_Extensionsearch,setFollowUp_Extension)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`FollowUp_Extension`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`FollowUp_Start_Of_Next`].name}>
                <li className={`${FollowUp_Start_Of_Next ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(FollowUp_Start_Of_Next,setFollowUp_Start_Of_Nextsearch,setFollowUp_Start_Of_Next)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`FollowUp_Start_Of_Next`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`FollowUp_Action_On_Enemy`].name}>
                <li className={`${FollowUp_Action_On_Enemy ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(FollowUp_Action_On_Enemy,setFollowUp_Action_On_Enemysearch,setFollowUp_Action_On_Enemy)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`FollowUp_Action_On_Enemy`].url}.png)` }}></li>
              </Tippy>
            </ul>
            <div className="similarbanner">Defending</div>
            <ul className="characterclasses">
              <Tippy content={roles[`Target_Lock`].name}>
                <li className={`${Target_Lock ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Target_Lock,setTarget_Locksearch,setTarget_Lock)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Target_Lock`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Cover`].name}>
                <li className={`${Tank ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Tank,setTanksearch,setTank)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Cover`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Evade`].name}>
                <li className={`${Evade ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Evade,setEvadesearch,setEvade)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Evade`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`BRV_Shield`].name}>
                <li className={`${BRVShield ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(BRVShield,setBRVShieldsearch,setBRVShield)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`BRV_Shield`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Cannot_Break`].name}>
                <li className={`${Cannot_Break ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Cannot_Break,setCannot_Breaksearch,setCannot_Break)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Cannot_Break`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`BRV_Damage_Resist`].name}>
                <li className={`${BRVDamageResist ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(BRVDamageResist,setBRVDamageResistsearch,setBRVDamageResist)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`BRV_Damage_Resist`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`HP_Damage_Resist`].name}>
                <li className={`${HPDamageResist ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(HPDamageResist,setHPDamageResistsearch,setHPDamageResist)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`HP_Damage_Resist`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Debuff_Evade`].name}>
                <li className={`${Debuff_Evade ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Debuff_Evade,setDebuff_Evadesearch,setDebuff_Evade)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Debuff_Evade`].url}.png)` }}></li>
              </Tippy>
            </ul>
            <div className="similarbanner">Interference</div>
            <ul className="characterclasses">
              <Tippy content={roles[`Delay`].name}>
                <li className={`${Delay ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Delay,setDelaysearch,setDelay)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Delay`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Three_Delay`].name}>
                <li className={`${ThreeDelay ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(ThreeDelay,setThreeDelaysearch,setThreeDelay)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Three_Delay`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Delete_Turns`].name}>
                <li className={`${DeleteTurns ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(DeleteTurns,setDeleteTurnssearch,setDeleteTurns)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Delete_Turns`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Dispel`].name}>
                <li className={`${Dispel ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Dispel,setDispelsearch,setDispel)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Dispel`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`BuffPrevent`].name}>
                <li className={`${BuffPrevent ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(BuffPrevent,setBuffPreventsearch,setBuffPrevent)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`BuffPrevent`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Break_Reset`].name}>
                <li className={`${Break_Reset ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Break_Reset,setBreak_Resetsearch,setBreak_Reset)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Break_Reset`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`BRV_Poison`].name}>
                <li className={`${BRVPoison ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(BRVPoison,setBRVPoisonsearch,setBRVPoison)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`BRV_Poison`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`HP_Poison`].name}>
                <li className={`${HPPoison ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(HPPoison,setHPPoisonsearch,setHPPoison)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`HP_Poison`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`BRV_Control`].name}>
                <li className={`${BRVControl ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(BRVControl,setBRVControlsearch,setBRVControl)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`BRV_Control`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Disable`].name}>
                <li className={`${Disable ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Disable,setDisablesearch,setDisable)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Disable`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Blind`].name}>
                <li className={`${Blind ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Blind,setBlindsearch,setBlind)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Blind`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Debuff_Gold`].name}>
                <li className={`${Debuff_Gold ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Debuff_Gold,setDebuff_Goldsearch,setDebuff_Gold)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Debuff_Gold`].url}.png)` }}></li>
              </Tippy>
            </ul>
            <div className="similarbanner">Other</div>
            <ul className="characterclasses">
              <Tippy content={roles[`Special_Buff`].name}>
                <li className={`${Special_Buff ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Special_Buff,setSpecial_Buffsearch,setSpecial_Buff)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Special_Buff`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Stacked_Debuff`].name}>
                <li className={`${Stacked_Debuff ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Stacked_Debuff,setStacked_Debuffsearch,setStacked_Debuff)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Stacked_Debuff`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Stacked_Buff`].name}>
                <li className={`${Stacked_Buff ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Stacked_Buff,setStacked_Buffsearch,setStacked_Buff)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Stacked_Buff`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Stacked_Buff_Five`].name}>
                <li className={`${Stacked_Buff_Five ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Stacked_Buff_Five,setStacked_Buff_Fivesearch,setStacked_Buff_Five)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Stacked_Buff_Five`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Free_Ability`].name}>
                <li className={`${Free_Ability ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Free_Ability,setFree_Abilitysearch,setFree_Ability)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Free_Ability`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Self_Harm`].name}>
                <li className={`${Self_Harm ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Self_Harm,setSelf_Harmsearch,setSelf_Harm)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Self_Harm`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`BRVHP_Upgrade`].name}>
                <li className={`${BRVHP_Upgrade ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(BRVHP_Upgrade,setBRVHP_Upgradesearch,setBRVHP_Upgrade)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`BRVHP_Upgrade`].url}.png)` }}></li>
              </Tippy>
              <Tippy content={roles[`Charger`].name}>
                <li className={`${Charger ? "filteractive" : "filterinactive"} characterclassesbutton`} onClick={()=>button(Charger,setChargersearch,setCharger)} style={{ backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Charger`].url}.png)` }}></li>
              </Tippy>
            </ul>
            <div className="similarbanner">Gear Level</div>
            <ul className="bufftypes">
              <Tippy content="FR Board Characters">
                <li className={`${Board5Flag ? "filteractive" : "filterinactive"} buffbutton board5button`} onClick={()=>button(Board5Flag,setBoard5Flagsearch,setBoard5Flag)}></li>
              </Tippy>
              <Tippy content="Force Enhancement 50 Characters">
                <li className={`${FE50BoardFlag ? "filteractive" : "filterinactive"} buffbutton fe50button`} onClick={()=>button(FE50BoardFlag,setFE50BoardFlagsearch,setFE50BoardFlag)}></li>
              </Tippy>
              <Tippy content="FR Weapon Characters">
                <li className={`${FRFlag ? "filteractive" : "filterinactive"} buffbutton frcharbutton`} onClick={()=>button(FRFlag,setFRFlagsearch,setFRFlag)}></li>
              </Tippy>
              <Tippy content="BT+ Weapon Characters">
                <li className={`${BTPlusFlag ? "filteractive" : "filterinactive"} buffbutton btpluscharbutton`} onClick={()=>button(BTPlusFlag,setBTPlusFlagsearch,setBTPlusFlag)}></li>
              </Tippy>
              <Tippy content="Active JP Reworks">
                <li className={`${ActiveRework ? "filteractive" : "filterinactive"} buffbutton reworkbutton`} onClick={()=>button(ActiveRework,setActiveReworksearch,setActiveRework)}></li>
              </Tippy>
            </ul>
            <div className="similarbanner">Gear Missing</div>
            <ul className="bufftypes">
              <Tippy content="Non-FR Board Characters">
                <li className={`${NoFRBoard ? "filteractivegrey" : "filterinactivegrey"} buffbutton board5button`} onClick={()=>button(NoFRBoard,setNoFRBoardsearch,setNoFRBoard)}></li>
              </Tippy>
              <Tippy content="Non-Force Enhancement 50 Characters">
                <li className={`${NoFE50 ? "filteractivegrey" : "filterinactivegrey"} buffbutton fe50button`} onClick={()=>button(NoFE50,setNoFE50search,setNoFE50)}></li>
              </Tippy>
              <Tippy content="Non-FR Weapon Characters">
                <li className={`${NoFR ? "filteractivegrey" : "filterinactivegrey"} buffbutton frcharbutton`} onClick={()=>button(NoFR,setNoFRsearch,setNoFR)}></li>
              </Tippy>
              <Tippy content="Non-BT+ Weapon Characters">
                <li className={`${NoBT ? "filteractivegrey" : "filterinactivegrey"} buffbutton btpluscharbutton`} onClick={()=>button(NoBT,setNoBTsearch,setNoBT)}></li>
              </Tippy>
            </ul>
            <div className="similarbanner">Sort</div>
            <ul className="bufftypes">
              <Tippy content="Realm">
                <li className={`${RealmSort ? "filteractive" : "filterinactive"} buffbutton RealmSortbutton`} onClick={RealmSortbutton}></li>
              </Tippy>
              <Tippy content="JP / GL Release Order">
                <li className={`${JPSort ? "filteractive" : "filterinactive"} buffbutton JPSortbutton`} onClick={JPSortbutton}></li>
              </Tippy>
              <Tippy content="Name">
                <li className={`${NameSort ? "filteractive" : "filterinactive"} buffbutton NameSortbutton`} onClick={NameSortbutton}></li>
              </Tippy>
            </ul>
            <div className="similarbanner">Refine</div>
            <div className="margeholder">
              <div className="Merge">
                <label htmlFor="search" className="MergeText">Merge Filters?</label>
                <div key="mergecheck1" className={`${merge == true ? "nodisplay" : `uncheck`}`} onClick={()=>button(merge,setMergesearch,setMerge)} />
                <div key="mergecheck2" className={`${merge == true ? "check" : `nodisplay`}`} onClick={()=>button(merge,setMergesearch,setMerge)} />
              </div>
            </div>
            <div className="margeholder">
              <div className="Merge">
                <label htmlFor="search" className="MergeText">Spoilers?</label>
                <div key="mergecheck1" className={`${spoilers == true ? "nodisplay" : `uncheck`}`} onClick={()=>button(spoilers,setspoilerssearch,setspoilers)} />
                <div key="mergecheck2" className={`${spoilers == true ? "check" : `nodisplay`}`} onClick={()=>button(spoilers,setspoilerssearch,setspoilers)} />
              </div>
            </div>
            <div className="typeholder">
              <Select
                defaultValue={Typesearch != "" ? { value: Typesearch, label: Typesearch } : null}
                key={Typesearch}
                isSearchable={true}
                placeholder="Realm Filter..."
                className='typecontainer'
                classNamePrefix="typetext"
                onChange={characterSelect}
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
                  placeholder="Search Name"
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
          <Link className="whitecolor" to={"/characters/ultimaweapon"}>
            <span className="subtext">Ultima</span>
          </Link>
          {" / "}
          <Link className="whitecolor" to={"/characters/forcetime"}>
            <span className="subtext">Force</span>
          </Link>
          {" / "}
          <Link className="whitecolor" to={"/characters/wardrobe"}>
            <span className="subtext">Skins page</span>
          </Link>
        </div>
        }
        {showFilter == true ? "" :
          <div>
            <Link className="whitecolor" to={"/characters/ultimaweapon"}>
              <span className="subtext">Ultima</span>
            </Link>
            <span>{" / "}</span>
            <Link className="whitecolor" to={"/characters/forcetime"}>
              <span className="subtext">Force</span>
            </Link>
            {" / "}
            <Link className="whitecolor" to={"/characters/wardrobe"}>
              <span className="subtext">Wardrobe page</span>
            </Link>
          </div>}
        <ul className="characterholder">
          {chars.length == rawData.length ?
            <div className="subtext">
              {bannerdisplay}
            </div> :
            <div className="nonmatchheader">
              {bannermatch}
            </div>
          }
          <CharacterFilterReturns
            match={chars}
            reverse={reverse}
            Sortsearch={Sortsearch}
            ProcessedCharacters={rawData}
            jptoggledata={jptoggledata}
            spoilers={spoilers}
          />
        </ul>
      </div>
    </div>
  );
}