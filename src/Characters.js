import React, {useState, useEffect} from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import { useDispatch } from "react-redux";
import { setFalse, setTrue } from './redux/ducks/jptoggle'
import './Characters.css';
import Tippy from './formatting/TippyDefaults.js';
import { Helmet } from 'react-helmet-async';
import Select from 'react-select';
import CharacterFiltering from './formatting/CharacterFilterReturns.js'
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { ImWarning } from 'react-icons/im';
import { IoSearch } from 'react-icons/io5'; 
import { FaUndoAlt } from 'react-icons/fa'; 
import { getQuery, getQueryStringVal,useQueryParam } from './processing/urlparams'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaShareSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import roles from './characterpages/direct/formatting/command_ability/ailment_tags.json'

const Characters = ({ProcessedCharacters,jptoggledata}) => {

  const [rawData, setrawData] = useStateIfMounted(Object.values(ProcessedCharacters))
  const [ver,setver] = useStateIfMounted(jptoggledata==true?"JP":"GL")

  const dispatch = useDispatch();

  const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null  ? true : false);
  const [clearFilter, setclearFilter] = useStateIfMounted(false);

  //damage types
  const [Magic, setMagic] = useState(getQueryStringVal("magic") != null  ? true : false);
  const [Ranged, setRanged] = useState(getQueryStringVal("ranged") != null  ? true : false);
  const [Melee, setMelee] = useState(getQueryStringVal("melee") != null  ? true : false);
  const [Non_Elemental, setNon_Elemental] = useState(getQueryStringVal("Non_Elemental") != null  ? true : false);

   //slots
  const [ASlot, setASlot] = useState(getQueryStringVal("ASlot") != null  ? true : false);
  const [BSlot, setBSlot] = useState(getQueryStringVal("BSlot") != null  ? true : false);
  const [CSlot, setCSlot] = useState(getQueryStringVal("CSlot") != null  ? true : false);
  const [DSlot, setDSlot] = useState(getQueryStringVal("DSlot") != null  ? true : false);
  const [ESlot, setESlot] = useState(getQueryStringVal("ESlot") != null  ? true : false);

  //elemental damage 
  const [Fire, setFire] = useState(getQueryStringVal("fire") != null  ? true : false);
  const [Ice, setIce] = useState(getQueryStringVal("ice") != null  ? true : false);
  const [Thunder, setThunder] = useState(getQueryStringVal("thunder") != null  ? true : false);
  const [Water, setWater] = useState(getQueryStringVal("water") != null  ? true : false);
  const [Earth, setEarth] = useState(getQueryStringVal("earth") != null  ? true : false);
  const [Wind, setWind] = useState(getQueryStringVal("wind") != null  ? true : false);
  const [Dark, setDark] = useState(getQueryStringVal("dark") != null  ? true : false);
  const [Holy, setHoly] = useState(getQueryStringVal("holy") != null  ? true : false);

  //crystal damage 
  const [RedCrystal, setRedCrystal] = useState(getQueryStringVal("red") != null  ? true : false);
  const [BlueCrystal, setBlueCrystal] = useState(getQueryStringVal("blue") != null  ? true : false);
  const [GreenCrystal, setGreenCrystal] = useState(getQueryStringVal("green") != null  ? true : false);
  const [YellowCrystal, setYellowCrystal] = useState(getQueryStringVal("yellow") != null  ? true : false);
  const [BlackCrystal, setBlackCrystal] = useState(getQueryStringVal("black") != null  ? true : false);
  const [WhiteCrystal, setWhiteCrystal] = useState(getQueryStringVal("white") != null  ? true : false);

  //weapons
  const [Dagger, setDagger] = useState(getQueryStringVal("dagger") != null  ? true : false);
  const [Sword, setSword] = useState(getQueryStringVal("sword") != null  ? true : false);
  const [Greatsword, setGreatsword] = useState(getQueryStringVal("greatsword") != null  ? true : false);
  const [Staff, setStaff] = useState(getQueryStringVal("staff") != null  ? true : false);
  const [Gun, setGun] = useState(getQueryStringVal("gun") != null  ? true : false);
  const [Fist, setFist] = useState(getQueryStringVal("fist") != null  ? true : false);
  const [Throwing, setThrowing] = useState(getQueryStringVal("throwing") != null  ? true : false);
  const [Spear, setSpear] = useState(getQueryStringVal("spear") != null  ? true : false);
  const [Bow, setBow] = useState(getQueryStringVal("bow") != null  ? true : false);
  const [Whip, setWhip] = useState(getQueryStringVal("whip") != null  ? true : false);
  const [Other, setOther] = useState(getQueryStringVal("other") != null  ? true : false);

  //max gear
  const [MaxLevel, setMaxLevel] = useState(getQueryStringVal("maxlevel") != null  ? true : false);
  const [ActiveRework, setActiveRework] = useState(getQueryStringVal("rework") != null  ? true : false);
  const [LDFlag, setLDFlag] = useState(getQueryStringVal("ld") != null  ? true : false);
  const [FRFlag, setFRFlag] = useState(getQueryStringVal("fr") != null  ? true : false);
  const [BTFlag, setBTFlag] = useState(getQueryStringVal("bt") != null  ? true : false);
  const [FRBoardFlag, setFRBoardFlag] = useState(getQueryStringVal("frboard") != null  ? true : false);
  const [Board5Flag, setBoard5Flag] = useState(getQueryStringVal("board5") != null  ? true : false);
  const [LDBoardFlag, setLDBoardFlag] = useState(getQueryStringVal("ldboard") != null  ? true : false);
  const [BTPlusFlag, setBTPlusFlag] = useState(getQueryStringVal("btplus") != null  ? true : false);
  const [SevenStarArmor, setSevenStarArmor] = useState(getQueryStringVal("sevenarmor") != null  ? true : false);
  const [SevenStarPlusArmor, setSevenStarPlusArmor] = useState(getQueryStringVal("sevenarmorplus") != null  ? true : false);

  //sort
  const [RealmSort, setRealmSort] = useState(getQueryStringVal("Sort") == "Realm"  ? true : false);
  const [NameSort, setNameSort] = useState(getQueryStringVal("Sort") == "Name"  ? true : false);
  const [JPSort, setJPSort] = useState(getQueryStringVal("Sort") == "JP"  ? true : false);
  const [HPSort, setHPSort] = useState(getQueryStringVal("Sort") == "HP"  ? true : false);
  const [INTBRVSort, setINTBRVSort] = useState(getQueryStringVal("Sort") == "INTBRV"  ? true : false);
  const [MAXBRVSort, setMAXBRVSort] = useState(getQueryStringVal("Sort") == "MAXBRV"  ? true : false);
  const [ATKSort, setATKSort] = useState(getQueryStringVal("Sort") == "ATK"  ? true : false);
  const [DEFSort, setDEFSort] = useState(getQueryStringVal("Sort") == "DEF"  ? true : false);
  const [SPDSort, setSPDSort] = useState(getQueryStringVal("Sort") == "SPD"  ? true : false);
  
  //advance class
  const [MagicImperil, setMagicImperil] = useState(getQueryStringVal("MagicImperil") != null  ? true : false);
  const [MeleeImperil, setMeleeImperil] = useState(getQueryStringVal("MeleeImperil") != null  ? true : false);
  const [RangedImperil, setRangedImperil] = useState(getQueryStringVal("RangedImperil") != null  ? true : false);

  const [FireEnchant, setFireEnchant] = useState(getQueryStringVal("FireEnchant") != null  ? true : false);
  const [IceEnchant, setIceEnchant] = useState(getQueryStringVal("IceEnchant") != null  ? true : false);
  const [ThunderEnchant, setThunderEnchant] = useState(getQueryStringVal("ThunderEnchant") != null  ? true : false);
  const [WaterEnchant, setWaterEnchant] = useState(getQueryStringVal("WaterEnchant") != null  ? true : false);
  const [EarthEnchant, setEarthEnchant] = useState(getQueryStringVal("EarthEnchant") != null  ? true : false);
  const [WindEnchant, setWindEnchant] = useState(getQueryStringVal("WindEnchant") != null  ? true : false);
  const [DarkEnchant, setDarkEnchant] = useState(getQueryStringVal("DarkEnchant") != null  ? true : false);
  const [HolyEnchant, setHolyEnchant] = useState(getQueryStringVal("HolyEnchant") != null  ? true : false);
  
  const [FireImperil, setFireImperil] = useState(getQueryStringVal("FireImperil") != null  ? true : false);
  const [IceImperil, setIceImperil] = useState(getQueryStringVal("IceImperil") != null  ? true : false);
  const [ThunderImperil, setThunderImperil] = useState(getQueryStringVal("ThunderImperil") != null  ? true : false);
  const [WaterImperil, setWaterImperil] = useState(getQueryStringVal("WaterImperil") != null  ? true : false);
  const [EarthImperil, setEarthImperil] = useState(getQueryStringVal("EarthImperil") != null  ? true : false);
  const [WindImperil, setWindImperil] = useState(getQueryStringVal("WindImperil") != null  ? true : false);
  const [DarkImperil, setDarkImperil] = useState(getQueryStringVal("DarkImperil") != null  ? true : false);
  const [HolyImperil, setHolyImperil] = useState(getQueryStringVal("HolyImperil") != null  ? true : false);

  const [Debuffer, setDebuffer] = useState(getQueryStringVal("Debuffer") != null  ? true : false);
  const [Cleanse, setCleanse] = useState(getQueryStringVal("Cleanse") != null  ? true : false);
  const [Trap, setTrap] = useState(getQueryStringVal("Trap") != null  ? true : false);
  const [BRVPoison, setBRVPoison] = useState(getQueryStringVal("BRVPoison") != null  ? true : false);
  const [HPPoison, setHPPoison] = useState(getQueryStringVal("HPPoison") != null  ? true : false);
  const [BRVResistDown, setBRVResistDown] = useState(getQueryStringVal("BRVResistDown") != null  ? true : false);
  const [HPResistDown, setHPResistDown] = useState(getQueryStringVal("HPResistDown") != null  ? true : false);
  const [FourDebuff, setFourDebuff] = useState(getQueryStringVal("FourDebuff") != null  ? true : false);
  const [BRVControl, setBRVControl] = useState(getQueryStringVal("BRVControl") != null  ? true : false);
  const [Disable, setDisable] = useState(getQueryStringVal("Disable") != null  ? true : false);
  const [Debuff_Break, setDebuff_Break] = useState(getQueryStringVal("Debuff_Break") != null  ? true : false);
  const [Stacked_Debuff, setStacked_Debuff] = useState(getQueryStringVal("Stacked_Debuff") != null  ? true : false);
  const [Blind, setBlind] = useState(getQueryStringVal("Blind") != null  ? true : false);
  const [Debuff_Evade, setDebuff_Evade] = useState(getQueryStringVal("Debuff_Evade") != null  ? true : false);
  const [Debuff_Gold, setDebuff_Gold] = useState(getQueryStringVal("Debuff_Gold") != null  ? true : false);

  const [HP_Damage_Up, setHP_Damage_Up] = useState(getQueryStringVal("HP_Damage_Up") != null  ? true : false);
  const [Tank, setTank] = useState(getQueryStringVal("Cover") != null  ? true : false);
  const [Battery, setBattery] = useState(getQueryStringVal("Battery") != null  ? true : false);
  const [Launcher, setLauncher] = useState(getQueryStringVal("Launcher") != null  ? true : false);
  const [Dispel, setDispel] = useState(getQueryStringVal("Dispel") != null  ? true : false);
  const [BuffPrevent,setBuffPrevent] = useState(getQueryStringVal("BuffPrevent") != null  ? true : false);
  const [Counter, setCounter] = useState(getQueryStringVal("Counter") != null  ? true : false);
  const [Delay, setDelay] = useState(getQueryStringVal("Delay") != null  ? true : false);
  const [ThreeDelay, setThreeDelay] = useState(getQueryStringVal("ThreeDelay") != null  ? true : false);
  const [ForceBreak, setForceBreak] = useState(getQueryStringVal("ForceBreak") != null  ? true : false);
  const [DeleteTurns, setDeleteTurns] = useState(getQueryStringVal("DeleteTurns") != null  ? true : false);
  const [BRVDamageResist, setBRVDamageResist] = useState(getQueryStringVal("BRVDamageResist") != null  ? true : false);
  const [HPDamageResist, setHPDamageResist] = useState(getQueryStringVal("HPDamageResist") != null  ? true : false);
  const [BRVRegen, setBRVRegen] = useState(getQueryStringVal("BRVRegen") != null  ? true : false);
  const [HPRegen, setHPRegen] = useState(getQueryStringVal("HPRegen") != null  ? true : false);
  const [BRVShield, setBRVShield] = useState(getQueryStringVal("BRVShield") != null  ? true : false);
  const [HPHealAbility, setHPHealAbility] = useState(getQueryStringVal("HPHealAbility") != null  ? true : false);
  const [FiftyHPHealAbility, setFiftyHPHealAbility] = useState(getQueryStringVal("FiftyHPHealAbility") != null  ? true : false);
  const [SixBuffs, setSixBuffs] = useState(getQueryStringVal("SixBuffs") != null  ? true : false);
  const [TwoAbilitiesRecover, setTwoAbilitiesRecover] = useState(getQueryStringVal("TwoAbilitiesRecover") != null  ? true : false);
  const [CritRateUp, setCritRateUp] = useState(getQueryStringVal("CritRateUp") != null  ? true : false);
  const [Evade, setEvade] = useState(getQueryStringVal("Evade") != null  ? true : false);
  const [Ignore_DEF, setIgnore_DEF] = useState(getQueryStringVal("Ignore_DEF") != null  ? true : false);
  const [KO_Prevent, setKO_Prevent] = useState(getQueryStringVal("KO_Prevent") != null  ? true : false);
  const [Reviver, setReviver] = useState(getQueryStringVal("Reviver") != null  ? true : false);
  const [Buff_Extension, setBuff_Extension] = useState(getQueryStringVal("Buff_Extension") != null  ? true : false);
  const [Break_Reset, setBreak_Reset] = useState(getQueryStringVal("Break_Reset") != null  ? true : false);
  const [Self_Harm, setSelf_Harm] = useState(getQueryStringVal("Self_Harm") != null  ? true : false);
  const [Ally_Turn_Manipulator, setAlly_Turn_Manipulator] = useState(getQueryStringVal("Ally_Turn_Manipulator") != null  ? true : false);
  const [FollowUp, setFollowUp] = useState(getQueryStringVal("FollowUp") != null  ? true : false);
  const [Cannot_Break, setCannot_Break] = useState(getQueryStringVal("Cannot_Break") != null  ? true : false);
  const [BRV_Wont_Below, setBRV_Wont_Below] = useState(getQueryStringVal("BRV_Wont_Below") != null  ? true : false);
  const [FollowUp_By_Other, setFollowUp_By_Other] = useState(getQueryStringVal("FollowUp_By_Other") != null  ? true : false);
  const [Launch_Support, setLaunch_Support] = useState(getQueryStringVal("Launch_Support") != null  ? true : false);
  const [Continuous_Turns, setContinuous_Turns] = useState(getQueryStringVal("Continuous_Turns") != null  ? true : false);
  const [Turn_Interrupter, setTurn_Interrupter] = useState(getQueryStringVal("Turn_Interrupter") != null  ? true : false);
  const [BRV_Ratio, setBRV_Ratio] = useState(getQueryStringVal("BRV_Ratio") != null  ? true : false);
  const [BRV_Absorb, setBRV_Absorb] = useState(getQueryStringVal("BRV_Absorb") != null  ? true : false);
  const [EX_MAX_Party, setEX_MAX_Party] = useState(getQueryStringVal("EX_MAX_Party") != null  ? true : false);
  const [Stacked_Buff, setStacked_Buff] = useState(getQueryStringVal("Stacked_Buff") != null  ? true : false);
  const [Stacked_Buff_Five, setStacked_Buff_Five] = useState(getQueryStringVal("Stacked_Buff_Five") != null  ? true : false);
  const [Free_Ability, setFree_Ability] = useState(getQueryStringVal("Free_Ability") != null  ? true : false);
  const [Special_Buff, setSpecial_Buff] = useState(getQueryStringVal("Special_Buff") != null  ? true : false);
  const [BRV_Damage_Cap, setBRV_Damage_Cap] = useState(getQueryStringVal("BRV_Damage_Cap") != null  ? true : false);

  const [Trap_After_Trigger, setTrap_After_Trigger] = useState(getQueryStringVal("Trap_After_Trigger") != null  ? true : false);
  const [Trap_Before_Turn, setTrap_Before_Turn] = useState(getQueryStringVal("Trap_Before_Turn") != null  ? true : false);
  const [FollowUp_Before_Player_Turn, setFollowUp_Before_Player_Turn] = useState(getQueryStringVal("FollowUp_Before_Player_Turn") != null  ? true : false);
  const [FollowUp_Before_Ability, setFollowUp_Before_Ability] = useState(getQueryStringVal("FollowUp_Before_Ability") != null  ? true : false);
  const [FollowUp_Extension, setFollowUp_Extension] = useState(getQueryStringVal("FollowUp_Extension") != null  ? true : false);
  const [FollowUp_Start_Of_Next, setFollowUp_Start_Of_Next] = useState(getQueryStringVal("FollowUp_Start_Of_Next") != null  ? true : false);
  const [FollowUp_Action_On_Enemy, setFollowUp_Action_On_Enemy] = useState(getQueryStringVal("FollowUp_Action_On_Enemy") != null  ? true : false);

  const [loop, setLoop] = useStateIfMounted(false);
  const [reverse, setReverse] = useState(getQueryStringVal("rev") != null  ? true : false);
  const [spoilers, setspoilers] = useState(getQueryStringVal("spoilers") != null  ? true : false);
  const [searchdisplay, setsearchdisplay] = useState(getQueryStringVal("search") != null ? getQueryStringVal("search") : "");
  const [searchTerm, setSearchTerm] = useState(getQueryStringVal("search") != null  ? getQueryStringVal("search").toLowerCase() : "");
  const [merge, setMerge] = useState(getQueryStringVal("merge") != null  ? true : false);
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
      const realmlabel = ["","I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"Tactics",,,,,,,,,,"Type-0",,,,,,,,,,"CC",,,,,,,,,,"WOFF","Origins"];

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

  //advance class
  const [MagicImperilsearch, setMagicImperilsearch] = useQueryParam("MagicImperil", "");
  const [MeleeImperilsearch, setMeleeImperilsearch] = useQueryParam("MeleeImperil", "");
  const [RangedImperilsearch, setRangedImperilsearch] = useQueryParam("RangedImperil", "");

  const [FireEnchantsearch, setFireEnchantsearch] = useQueryParam("FireEnchant", "");
  const [IceEnchantsearch, setIceEnchantsearch] =  useQueryParam("IceEnchant", "");
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
  const [FourDebuffsearch, setFourDebuffsearch] = useQueryParam("FourDebuff", "");
  const [BRVControlsearch, setBRVControlsearch] = useQueryParam("BRVControl", "");
  const [Disablesearch, setDisablesearch] = useQueryParam("Disable", "");
  const [Debuff_Breaksearch, setDebuff_Breaksearch] = useQueryParam("Debuff_Break", "");
  const [Stacked_Debuffsearch, setStacked_Debuffsearch] = useQueryParam("Stacked_Debuff", "");
  const [Blindsearch, setBlindsearch] = useQueryParam("Blind", "");
  const [Debuff_Evadesearch, setDebuff_Evadesearch] = useQueryParam("Debuff_Evade", "");
  const [Debuff_Goldsearch, setDebuff_Goldsearch] = useQueryParam("Debuff_Gold", "");
  const [Trap_After_Triggersearch, setTrap_After_Triggersearch] = useQueryParam("Trap_After_Trigger", "");
  const [Trap_Before_Turnsearch, setTrap_Before_Turnsearch] = useQueryParam("Trap_Before_Turn", "");

  const [HP_Damage_Upsearch, setHP_Damage_Upsearch] =  useQueryParam("HP_Damage_Up", "");
  const [Tanksearch, setTanksearch] = useQueryParam("Cover", "");
  const [Batterysearch, setBatterysearch] = useQueryParam("Battery", "");
  const [Launchersearch, setLaunchersearch] = useQueryParam("Launcher", "");
  const [Dispelsearch, setDispelsearch] = useQueryParam("Dispel", "");
  const [BuffPreventsearch,setBuffPreventsearch] = useQueryParam("BuffPrevent", "");
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
  const [FiftyHPHealAbilitysearch, setFiftyHPHealAbilitysearch] = useQueryParam("FiftyHPHealAbility", "");
  const [SixBuffssearch, setSixBuffssearch] = useQueryParam("SixBuffs", "");
  const [TwoAbilitiesRecoversearch, setTwoAbilitiesRecoversearch] = useQueryParam("TwoAbilitiesRecover", "");
  const [CritRateUpsearch, setCritRateUpsearch] = useQueryParam("CritRateUp", "");
  const [Evadesearch, setEvadesearch] = useQueryParam("Evade", "");
  const [Ignore_DEFsearch, setIgnore_DEFsearch] = useQueryParam("Ignore_DEF", "");
  const [KO_Preventsearch, setKO_Preventsearch] = useQueryParam("KO_Prevent", "");
  const [Reviversearch, setReviversearch] = useQueryParam("Reviver", "");
  const [Buff_Extensionsearch, setBuff_Extensionsearch] = useQueryParam("Buff_Extension", "");
  const [Break_Resetsearch, setBreak_Resetsearch] = useQueryParam("Break_Reset", "");
  const [Self_Harmsearch, setSelf_Harmsearch] = useQueryParam("Self_Harm", "");
  const [Ally_Turn_Manipulatorsearch, setAlly_Turn_Manipulatorsearch] = useQueryParam("Ally_Turn_Manipulator", "");
  const [FollowUpsearch, setFollowUpsearch] = useQueryParam("FollowUp", "");
  const [Cannot_Breaksearch, setCannot_Breaksearch] = useQueryParam("Cannot_Break", "");
  const [BRV_Wont_Belowsearch, setBRV_Wont_Belowsearch] = useQueryParam("BRV_Wont_Below", "");
  const [FollowUp_By_Othersearch, setFollowUp_By_Othersearch] = useQueryParam("FollowUp_By_Other", "");
  const [Launch_Supportsearch, setLaunch_Supportsearch] = useQueryParam("Launch_Support", "");
  const [Continuous_Turnssearch, setContinuous_Turnssearch] = useQueryParam("Continuous_Turns", "");
  const [Turn_Interruptersearch, setTurn_Interruptersearch] = useQueryParam("Turn_Interrupter", "");
  const [BRV_Ratiosearch, setBRV_Ratiosearch] = useQueryParam("BRV_Ratio", "");
  const [BRV_Absorbsearch, setBRV_Absorbsearch] = useQueryParam("BRV_Absorb", "");
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

  const [MaxLevelsearch, setMaxLevelsearch] = useQueryParam("maxlevel", "");
  const [ActiveReworksearch, setActiveReworksearch] = useQueryParam("rework", "");
  const [LDFlagsearch, setLDFlagsearch] = useQueryParam("ld", "");
  const [FRFlagsearch, setFRFlagsearch] = useQueryParam("fr", "");
  const [BTFlagsearch, setBTFlagsearch] = useQueryParam("bt", "");
  const [FRBoardFlagsearch, setFRBoardFlagsearch] = useQueryParam("frboard", "");
  const [Board5Flagsearch, setBoard5Flagsearch] = useQueryParam("board5", "");
  const [LDBoardFlagsearch, setLDBoardFlagsearch] = useQueryParam("ldboard", "");
  const [BTPlusFlagsearch, setBTPlusFlagsearch] = useQueryParam("btplus", "");
  const [SevenStarArmorsearch, setSevenStarArmorsearch] = useQueryParam("sevenarmor", "");
  const [SevenStarPlusArmorsearch, setSevenStarPlusArmorsearch] = useQueryParam("sevenarmorplus", "");

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
      if(getQueryStringVal("JP") == "true" ){
        dispatch(setTrue())
        setJPSearch("true")
      } else {
        dispatch(setFalse())
        setJPSearch("")
      }
    },[setJPSearch,dispatch])

    useEffect(() => {
      if(getQueryStringVal("spoilers") == "true" ){
        setspoilers(true)
        setspoilerssearch("true")
      } else {
        setspoilers(false)
        setspoilerssearch("")
      }
    },[setspoilerssearch])
    
    useEffect(() => {
      if(jptoggledata == true ){
        setJPSearch("true")
        setver("JP")
        if(Sortsearch == ""){
          setJPSort(true)
          setSortsearch("JP")
        }
      } else {
        setver("GL")
      }
      if(getQueryStringVal("JP") == "true" ){
        dispatch(setTrue())
        if(Sortsearch == ""){
          setJPSort(true)
          setSortsearch("JP")
          }
      }
    },[jptoggledata,setver,dispatch,setJPSearch,Sortsearch,setSortsearch])

 useEffect(() => {
     // eslint-disable-next-line no-sparse-arrays
     const realmlabel2 = ["","I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"Tactics",,,,,,,,,,"Type-0",,,,,,,,,,"CC",,,,,,,,,,"WOFF","Origins"];
     const typeListArray2 = typeListUnique.map((typeListUnique) => ({
      value: realmlabel2[typeListUnique],
      label: realmlabel2[typeListUnique],
      id: typeListUnique,
    }));
     if(Typesearch != null){
      const filteredtype = typeListArray2.filter(self=>{return self.label == getQueryStringVal("Realm")})
      if(filteredtype.length != 0){
        setTypesearch(getQueryStringVal("Realm"))
        setCondFilter(filteredtype[0].id)
      } else{
        setTypesearch("")
        setCondFilter("")
      }
    }
  },[setCondFilter,typeListUnique,Typesearch,setTypesearch])


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
    if( merge == false ) {
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
      if (MaxLevel === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Level90"] == true
        );
        filterholder.push(...filteredout);
      }
      if (LDFlag === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["LDFlag"] === true
        );
        filterholder.push(...filteredout);
      }
      if (FRFlag === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["FRFlag"] === true
        );
        filterholder.push(...filteredout);
      }
      if (BTFlag === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["BTFlag"] === true
        );
        filterholder.push(...filteredout);
      }
      if (LDBoardFlag === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["LDBoardFlag"] === true
        );
        filterholder.push(...filteredout);
      }
      if (FRBoardFlag === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["FRBoardFlag"] === true
        );
        filterholder.push(...filteredout);
      }
      if (BTPlusFlag === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["BTPlusFlag"] === true
        );
        filterholder.push(...filteredout);
      }
      if (SevenStarArmor === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["SevenStarArmor"] === true
        );
        filterholder.push(...filteredout);
      }
      if (SevenStarPlusArmor === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["SevenStarPlusArmor"] === true
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
          (chars) => chars["Dagger"] ===  true
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
      if (FourDebuff === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Four_Debuff"] === true
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
      if (FiftyHPHealAbility === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Fifty_HP_Heal_Ability"] === true
        );
        filterholder.push(...filteredout);
      }
      if (SixBuffs === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Six_Buffs"] === true
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
      if (Debuff_Break === true) {
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Debuff_Break"] === true
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
      if(Stacked_Debuff == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Stacked_Debuff"] === true
        );
        filterholder.push(...filteredout);
      }
      if(Non_Elemental == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Non_Elemental"] === true
        );
        filterholder.push(...filteredout);
      }
      if(HP_Damage_Up == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["HP_Damage_Up"] === true
        );
        filterholder.push(...filteredout);
      }
      if(Buff_Extension == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Buff_Extension"] === true
        );
        filterholder.push(...filteredout);
      }
      if(Break_Reset == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Break_Reset"] === true
        );
        filterholder.push(...filteredout);
      }
      if(Self_Harm == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Self_Harm"] === true
        );
        filterholder.push(...filteredout);
      }
      if(Ally_Turn_Manipulator == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Ally_Turn_Manipulator"] === true
        );
        filterholder.push(...filteredout);
      }
      if(FollowUp == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["FollowUp"] === true
        );
        filterholder.push(...filteredout);
      }
      if(Cannot_Break == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Cannot_Break"] === true
        );
        filterholder.push(...filteredout);
      }
      if(Blind == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Blind"] === true
        );
        filterholder.push(...filteredout);
      }
      if(Debuff_Evade == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Debuff_Evade"] === true
        );
        filterholder.push(...filteredout);
      }
      if(Debuff_Gold == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Debuff_Gold"] === true
        );
        filterholder.push(...filteredout);
      }
      if(BRV_Wont_Below == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["BRV_Wont_Below"] === true
        );
        filterholder.push(...filteredout);
      }
      if(FollowUp_By_Other == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["FollowUp_By_Other"] === true
        );
        filterholder.push(...filteredout);
      }
      if(Launch_Support == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Launch_Support"] === true
        );
        filterholder.push(...filteredout);
      }
      if(Continuous_Turns == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Continuous_Turns"] === true
        );
        filterholder.push(...filteredout);
      }
      if(Turn_Interrupter == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Turn_Interrupter"] === true
        );
        filterholder.push(...filteredout);
      }
      if(BRV_Ratio == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["BRV_Ratio"] === true
        );
        filterholder.push(...filteredout);
      }
      if(BRV_Absorb == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["BRV_Absorb"] === true
        );
        filterholder.push(...filteredout);
      }
      if(EX_MAX_Party == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["EX_MAX_Party"] === true
        );
        filterholder.push(...filteredout);
      }
      if(Stacked_Buff == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Stacked_Buff"] === true
        );
        filterholder.push(...filteredout);
      }
      if(Trap_After_Trigger == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Trap_After_Trigger"] === true
        );
        filterholder.push(...filteredout);
      }
      if(Trap_Before_Turn == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Trap_Before_Turn"] === true
        );
        filterholder.push(...filteredout);
      }
      if(FollowUp_Before_Player_Turn == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["FollowUp_Before_Player_Turn"] === true
        );
        filterholder.push(...filteredout);
      }
      if(FollowUp_Before_Ability == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["FollowUp_Before_Ability"] === true
        );
        filterholder.push(...filteredout);
      }
      if(FollowUp_Extension == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["FollowUp_Extension"] === true
        );
        filterholder.push(...filteredout);
      }
      if(FollowUp_Start_Of_Next == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["FollowUp_Start_Of_Next"] === true
        );
        filterholder.push(...filteredout);
      }
      if(FollowUp_Action_On_Enemy == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["FollowUp_Action_On_Enemy"] === true
        );
        filterholder.push(...filteredout);
      }
      if(Free_Ability == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Free_Ability"] === true
        );
        filterholder.push(...filteredout);
      }
      if(Stacked_Buff_Five == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Stacked_Buff_Five"] === true
        );
        filterholder.push(...filteredout);
      }
      if(Special_Buff == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Special_Buff"] === true
        );
        filterholder.push(...filteredout);
      }
      if(Board5Flag == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["Board5Flag"] === true
        );
        filterholder.push(...filteredout);
      }
      if(BRV_Damage_Cap == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["BRV_Damage_Cap"] === true
        );
        filterholder.push(...filteredout);
      }
      if(BuffPrevent == true){
        const filteredout = rawData.filter(
          (chars) => chars[`${ver}traits`] && chars[`${ver}traits`]["BuffPrevent"] === true
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
          if(condFilter !== "") {
            return newfilterpull;
          } else {
            return ef
        }});
        setFilterResults(makeUnique);
        setSearchResults(getcharacterfilter);
        setListDisplay(getcharacterfilter);
    }
  }, [ver,jptoggledata,BRV_Damage_Cap,Board5Flag,Special_Buff,Free_Ability,Stacked_Buff_Five,BuffPrevent, FollowUp_Action_On_Enemy,FollowUp_Start_Of_Next,FollowUp_Extension,FollowUp_Before_Ability,FollowUp_Before_Player_Turn,Trap_After_Trigger,Trap_Before_Turn, Stacked_Buff,EX_MAX_Party,BRV_Absorb,BRV_Ratio,Turn_Interrupter,Continuous_Turns,Launch_Support,FollowUp_By_Other,BRV_Wont_Below,Debuff_Gold,Debuff_Evade,Blind,FRFlag,FRBoardFlag, Cannot_Break, FollowUp, Ally_Turn_Manipulator, Self_Harm, Break_Reset, RealmSort, JPSort, HPSort, INTBRVSort, MAXBRVSort, ATKSort, DEFSort, SPDSort, NameSort, Buff_Extension,rawData,searchTerm,HP_Damage_Up, Non_Elemental, Stacked_Debuff, KO_Prevent, Reviver, SevenStarArmor, Debuff_Break, Ignore_DEF, Evade, CritRateUp, clearFilter, TwoAbilitiesRecover, merge, BRVRegen, BRVDamageResist, Dagger, Sword, Greatsword, Staff, Gun, Fist, Throwing, Spear, Bow, Whip, Other, RedCrystal, BlueCrystal, YellowCrystal, GreenCrystal, BlackCrystal, WhiteCrystal, SevenStarPlusArmor, BTPlusFlag, LDBoardFlag, BTFlag, LDFlag, MaxLevel, ActiveRework, Magic, Ranged, Melee, ASlot, BSlot, CSlot, DSlot, ESlot, Fire, Ice, Thunder, Water, Earth, Wind, Dark, Holy, Tank, Debuffer, BRVResistDown, MagicImperil, RangedImperil, MeleeImperil, WindImperil, FireImperil, ThunderImperil, HolyImperil, IceImperil, WaterImperil, EarthImperil, DarkImperil, ThreeDelay, FourDebuff, FiftyHPHealAbility, SixBuffs, Battery, BRVControl, BRVPoison, BRVShield, Cleanse, Counter, DarkEnchant, Delay, Disable, Dispel, EarthEnchant, FireEnchant, ForceBreak, HolyEnchant, HPDamageResist, HPHealAbility, HPPoison, HPRegen, IceEnchant, Launcher, ThunderEnchant, Trap, WaterEnchant, WindEnchant, DeleteTurns, HPResistDown, condFilter, reverse]);

  //Merge filter
  useEffect(() => {
    if(merge == true ) {
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
        Four_Debuff: FourDebuff,
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
        Fifty_HP_Heal_Ability: FiftyHPHealAbility,
        Six_Buffs: SixBuffs,
        Three_Delay: ThreeDelay,
        Level90: MaxLevel,
        LDFlag: LDFlag,
        FRFlag: FRFlag,
        LDBoardFlag: LDBoardFlag,
        FRBoardFlag: FRBoardFlag,
        BTFlag: BTFlag,
        BTPlusFlag: BTPlusFlag,
        SevenStarArmor: SevenStarArmor,
        SevenStarPlusArmor: SevenStarPlusArmor,
        Two_Abilities_Recover: TwoAbilitiesRecover,
        Crit_Rate_Up: CritRateUp,
        Evade: Evade,
        Ignore_DEF: Ignore_DEF,
        Debuff_Break: Debuff_Break,
        KO_Prevent: KO_Prevent, 
        Reviver: Reviver,
        Stacked_Debuff: Stacked_Debuff,
        Non_Elemental: Non_Elemental,
        HP_Damage_Up: HP_Damage_Up,
        Buff_Extension: Buff_Extension,
        Break_Reset: Break_Reset,
        HP_Regen: HPRegen,
        Self_Harm: Self_Harm,
        Ally_Turn_Manipulator: Ally_Turn_Manipulator,
        FollowUp: FollowUp,
        Cannot_Break: Cannot_Break,
        Blind: Blind,
        Debuff_Evade: Debuff_Evade,
        Debuff_Gold: Debuff_Gold,
        BRV_Wont_Below: BRV_Wont_Below,
        FollowUp_By_Other: FollowUp_By_Other,
        Launch_Support: Launch_Support,
        Continuous_Turns: Continuous_Turns,
        Turn_Interrupter: Turn_Interrupter,
        BRV_Ratio: BRV_Ratio,
        BRV_Absorb: BRV_Absorb,
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
        Board5Flag: Board5Flag,
        BRV_Damage_Cap: BRV_Damage_Cap
      };
      const filtermerge = rawData.filter((oneChar) => {
        return Object.entries(charType)
          .filter(entry => entry[1])
          .every(([key, value]) => oneChar[`${ver}traits`] && oneChar[`${ver}traits`][key] === value);
      });

      const makeUnique = filtermerge
          .filter(onlyUnique);
        const searchit = makeUnique.filter((char) =>
        (`${char.CharacterName} ${char.JPName}`).toLowerCase().includes(searchTerm)
        );
        const getcharacterfilter = searchit.filter(function (ef) {
          const newfilterpull = ef["RealmPars"] === condFilter;
          if(condFilter !== "") {
            return newfilterpull;
          } else {
            return ef
        }});
        setFilterResults(makeUnique);
        setSearchResults(getcharacterfilter);
        setListDisplay(getcharacterfilter);
    }
  }, [jptoggledata,ver,BRV_Damage_Cap,Board5Flag,Special_Buff,Free_Ability,Stacked_Buff_Five,BuffPrevent, FollowUp_Action_On_Enemy,FollowUp_Start_Of_Next,FollowUp_Extension,FollowUp_Before_Ability,FollowUp_Before_Player_Turn,Trap_After_Trigger,Trap_Before_Turn, Stacked_Buff,EX_MAX_Party,BRV_Absorb,BRV_Ratio,Turn_Interrupter,Continuous_Turns,Launch_Support,FollowUp_By_Other,BRV_Wont_Below,Debuff_Gold,Debuff_Evade,Blind,Cannot_Break, FRBoardFlag, FRFlag, FollowUp, Ally_Turn_Manipulator, Self_Harm, Break_Reset, RealmSort, JPSort, HPSort, INTBRVSort, MAXBRVSort, ATKSort, DEFSort, SPDSort, Buff_Extension,rawData,searchTerm,HP_Damage_Up, Non_Elemental, Stacked_Debuff, KO_Prevent, Reviver, SevenStarArmor, Debuff_Break, Ignore_DEF,Evade, CritRateUp, clearFilter, TwoAbilitiesRecover, merge, BRVRegen, BRVDamageResist, Dagger, Sword, Greatsword, Staff, Gun, Fist, Throwing, Spear, Bow, Whip, Other, RedCrystal, BlueCrystal, YellowCrystal, GreenCrystal, BlackCrystal, WhiteCrystal, SevenStarPlusArmor, BTPlusFlag, LDBoardFlag, BTFlag, LDFlag, MaxLevel, Magic, Ranged, Melee, ASlot, BSlot, CSlot, DSlot, ESlot, Fire, Ice, Thunder, Water, Earth, Wind, Dark, Holy, Tank, Debuffer, BRVResistDown, MagicImperil, RangedImperil, MeleeImperil, WindImperil, FireImperil, ThunderImperil, HolyImperil, IceImperil, WaterImperil, EarthImperil, DarkImperil, ThreeDelay, FourDebuff, FiftyHPHealAbility, SixBuffs, Battery, BRVControl, BRVPoison, BRVShield, Cleanse, Counter, DarkEnchant, Delay, Disable, Dispel, EarthEnchant, FireEnchant, ForceBreak, HolyEnchant, HPDamageResist, HPHealAbility, HPPoison, HPRegen, IceEnchant, Launcher, ThunderEnchant, Trap, WaterEnchant, WindEnchant, DeleteTurns, HPResistDown, condFilter, reverse]);

 

  //buttons
  const Magicbutton = () => {
    if(Magic == false){
    setMagicsearch("true")
    } else {
    setMagicsearch("")
    }
    setMagic((prevValue) => !prevValue);
  };
  const Rangedbutton = () => {
    if(Ranged == false){
      setRangedsearch("true")
      } else {
      setRangedsearch("")
      }
    setRanged((prevValue) => !prevValue);
  };
  const Meleebutton = () => {
    if(Melee == false){
      setMeleesearch("true")
      } else {
      setMeleesearch("")
      }
    setMelee((prevValue) => !prevValue);
  };
  const Non_Elementalbutton = () =>{
    if(Non_Elemental == false){
      setNon_Elementalsearch("true")
      } else {
      setNon_Elementalsearch("")
      }
    setNon_Elemental((prevValue) => !prevValue)
  }

  const ASlotbutton = () => {
    if(ASlot == false){
    setASlotsearch("true")
    } else {
      setASlotsearch("")
    }
    setASlot((prevValue) => !prevValue);
  };
  const BSlotbutton = () => {
    if(BSlot == false){
      setBSlotsearch("true")
      } else {
        setBSlotsearch("")
      }
    setBSlot((prevValue) => !prevValue);
  };
  const CSlotbutton = () => {
    if(CSlot == false){
      setCSlotsearch("true")
      } else {
        setCSlotsearch("")
      }
    setCSlot((prevValue) => !prevValue);
  };
  const DSlotbutton = () => {
    if(DSlot == false){
      setDSlotsearch("true")
      } else {
        setDSlotsearch("")
      }
    setDSlot((prevValue) => !prevValue);
  };
  const ESlotbutton = () => {
    if(ESlot == false){
      setESlotsearch("true")
      } else {
        setESlotsearch("")
      }
    setESlot((prevValue) => !prevValue);
  };

  const RedCrystalbutton = () => {
    if(RedCrystal == false){
      setRedCrystalsearch("true")
      } else {
        setRedCrystalsearch("")
      }
    setRedCrystal((prevValue) => !prevValue);
  };
  const BlueCrystalbutton = () => {
    if(BlueCrystal == false){
      setBlueCrystalsearch("true")
      } else {
        setBlueCrystalsearch("")
      }
    setBlueCrystal((prevValue) => !prevValue);
  };
  const GreenCrystalbutton = () => {
    if(GreenCrystal == false){
      setGreenCrystalsearch("true")
      } else {
        setGreenCrystalsearch("")
      }
    setGreenCrystal((prevValue) => !prevValue);
  };
  const YellowCrystalbutton = () => {
    if(YellowCrystal == false){
      setYellowCrystalsearch("true")
      } else {
        setYellowCrystalsearch("")
      }
    setYellowCrystal((prevValue) => !prevValue);
  };
  const WhiteCrystalbutton = () => {
    if(WhiteCrystal == false){
      setWhiteCrystalsearch("true")
      } else {
        setWhiteCrystalsearch("")
      }
    setWhiteCrystal((prevValue) => !prevValue);
  };
  const BlackCrystalbutton = () => {
    if(BlackCrystal == false){
      setBlackCrystalsearch("true")
      } else {
        setBlackCrystalsearch("")
      }
    setBlackCrystal((prevValue) => !prevValue);
  };

  const Firebutton = () => {
    if(Fire == false){
      setFiresearch("true")
      } else {
        setFiresearch("")
      }
    setFire((prevValue) => !prevValue);
  };
  const Icebutton = () => {
    if(Ice == false){
      setIcesearch("true")
      } else {
        setIcesearch("")
      }
    setIce((prevValue) => !prevValue);
  };
  const Thunderbutton = () => {
    if(Thunder == false){
      setThundersearch("true")
      } else {
        setThundersearch("")
      }
    setThunder((prevValue) => !prevValue);
  };
  const Waterbutton = () => {
    if(Water == false){
      setWatersearch("true")
      } else {
        setWatersearch("")
      }
    setWater((prevValue) => !prevValue);
  };
  const Earthbutton = () => {
    if(Earth == false){
      setEarthsearch("true")
      } else {
        setEarthsearch("")
      }
    setEarth((prevValue) => !prevValue);
  };
  const Windbutton = () => {
    if(Wind == false){
      setWindsearch("true")
      } else {
        setWindsearch("")
      }
    setWind((prevValue) => !prevValue);
  };
  const Darkbutton = () => {
    if(Dark == false){
      setDarksearch("true")
      } else {
        setDarksearch("")
      }
    setDark((prevValue) => !prevValue);
  };
  const Holybutton = () => {
    if(Holy == false){
      setHolysearch("true")
      } else {
        setHolysearch("")
      }
    setHoly((prevValue) => !prevValue);
  };

  const Daggerbutton = () => {
    if(Dagger == false){
      setDaggersearch("true")
      } else {
        setDaggersearch("")
      }
    setDagger((prevValue) => !prevValue);
  };
  const Swordbutton = () => {
    if(Sword == false){
      setSwordsearch("true")
      } else {
        setSwordsearch("")
      }
    setSword((prevValue) => !prevValue);
  };
  const Greatswordbutton = () => {
    if(Greatsword == false){
      setGreatswordsearch("true")
      } else {
        setGreatswordsearch("")
      }
    setGreatsword((prevValue) => !prevValue);
  };
  const Staffbutton = () => {
    if(Staff == false){
      setStaffsearch("true")
      } else {
        setStaffsearch("")
      }
    setStaff((prevValue) => !prevValue);
  };
  const Gunbutton = () => {
    if(Gun == false){
      setGunsearch("true")
      } else {
        setGunsearch("")
      }
    setGun((prevValue) => !prevValue);
  };
  const Fistbutton = () => {
    if(Fist == false){
      setFistsearch("true")
      } else {
        setFistsearch("")
      }
    setFist((prevValue) => !prevValue);
  };
  const Throwingbutton = () => {
    if(Throwing == false){
      setThrowingsearch("true")
      } else {
        setThrowingsearch("")
      }
    setThrowing((prevValue) => !prevValue);
  };
  const Spearbutton = () => {
    if(Spear == false){
      setSpearsearch("true")
      } else {
        setSpearsearch("")
      }
    setSpear((prevValue) => !prevValue);
  };
  const Bowbutton = () => {
    if(Bow == false){
      setBowsearch("true")
      } else {
        setBowsearch("")
      }
    setBow((prevValue) => !prevValue);
  };
  const Whipbutton = () => {
    if(Whip == false){
      setWhipsearch("true")
      } else {
        setWhipsearch("")
      }
    setWhip((prevValue) => !prevValue);
  };
  const Otherbutton = () => {
    if(Other == false){
      setOthersearch("true")
      } else {
        setOthersearch("")
      }
    setOther((prevValue) => !prevValue);
  };

  //roles
  const MagicImperilbutton = () => {
    if(MagicImperil == false){
      setMagicImperilsearch("true")
    } else{
      setMagicImperilsearch("")
    }
    setMagicImperil((prevValue) => !prevValue);
  };
  const RangedImperilbutton = () => {
    if(RangedImperil == false){
      setRangedImperilsearch("true")
    } else{
      setRangedImperilsearch("")
    }
    setRangedImperil((prevValue) => !prevValue);
  };
  const MeleeImperilbutton = () => {
    if(MeleeImperil == false){
      setMeleeImperilsearch("true")
    } else{
      setMeleeImperilsearch("")
    }
    setMeleeImperil((prevValue) => !prevValue);
  };

  const FireEnchantbutton = () => {
    if(FireEnchant == false){
      setFireEnchantsearch("true")
    } else{
      setFireEnchantsearch("")
    }
    setFireEnchant((prevValue) => !prevValue);
  };
  const IceEnchantbutton = () => {
    if(IceEnchant == false){
      setIceEnchantsearch("true")
    } else{
      setIceEnchantsearch("")
    }
    setIceEnchant((prevValue) => !prevValue);
  };
  const ThunderEnchantbutton = () => {
    if(ThunderEnchant == false){
      setThunderEnchantsearch("true")
    } else{
      setThunderEnchantsearch("")
    }
    setThunderEnchant((prevValue) => !prevValue);
  };
  const WaterEnchantbutton = () => {
    if(WaterEnchant == false){
      setWaterEnchantsearch("true")
    } else{
      setWaterEnchantsearch("")
    }
    setWaterEnchant((prevValue) => !prevValue);
  };
  const EarthEnchantbutton = () => {
    if(EarthEnchant == false){
      setEarthEnchantsearch("true")
    } else{
      setEarthEnchantsearch("")
    }
    setEarthEnchant((prevValue) => !prevValue);
  };
  const WindEnchantbutton = () => {
    if(WindEnchant == false){
      setWindEnchantsearch("true")
    } else{
      setWindEnchantsearch("")
    }
    setWindEnchant((prevValue) => !prevValue);
  };
  const DarkEnchantbutton = () => {
    if(DarkEnchant == false){
      setDarkEnchantsearch("true")
    } else{
      setDarkEnchantsearch("")
    }
    setDarkEnchant((prevValue) => !prevValue);
  };
  const HolyEnchantbutton = () => {
    if(HolyEnchant == false){
      setHolyEnchantsearch("true")
    } else{
      setHolyEnchantsearch("")
    }
    setHolyEnchant((prevValue) => !prevValue);
  };

  const FireImperilbutton = () => {
    if(FireImperil == false){
      setFireImperilsearch("true")
    } else{
      setFireImperilsearch("")
    }
    setFireImperil((prevValue) => !prevValue);
  };
  const IceImperilbutton = () => {
    if(IceImperil == false){
      setIceImperilsearch("true")
    } else{
      setIceImperilsearch("")
    }
    setIceImperil((prevValue) => !prevValue);
  };
  const ThunderImperilbutton = () => {
    if(ThunderImperil == false){
      setThunderImperilsearch("true")
    } else{
      setThunderImperilsearch("")
    }
    setThunderImperil((prevValue) => !prevValue);
  };
  const WaterImperilbutton = () => {
    if(WaterImperil == false){
      setWaterImperilsearch("true")
    } else{
      setWaterImperilsearch("")
    }
    setWaterImperil((prevValue) => !prevValue);
  };
  const EarthImperilbutton = () => {
    if(EarthImperil == false){
      setEarthImperilsearch("true")
    } else{
      setEarthImperilsearch("")
    }
    setEarthImperil((prevValue) => !prevValue);
  };
  const WindImperilbutton = () => {
    if(WindImperil == false){
      setWindImperilsearch("true")
    } else{
      setWindImperilsearch("")
    }
    setWindImperil((prevValue) => !prevValue);
  };
  const DarkImperilbutton = () => {
    if(DarkImperil == false){
      setDarkImperilsearch("true")
    } else{
      setDarkImperilsearch("")
    }
    setDarkImperil((prevValue) => !prevValue);
  };
  const HolyImperilbutton = () => {
    if(HolyImperil == false){
      setHolyImperilsearch("true")
    } else{
      setHolyImperilsearch("")
    }
    setHolyImperil((prevValue) => !prevValue);
  };

  const Debufferbutton = () => {
    if(Debuffer == false){
      setDebuffersearch("true")
    } else{
      setDebuffersearch("")
    }
    setDebuffer((prevValue) => !prevValue);
  };
  const Cleansebutton = () => {
    if(Cleanse == false){
      setCleansesearch("true")
    } else{
      setCleansesearch("")
    }
    setCleanse((prevValue) => !prevValue);
  };
  const Trapbutton = () => {
    if(Trap == false){
      setTrapsearch("true")
    } else{
      setTrapsearch("")
    }
    setTrap((prevValue) => !prevValue);
  };
  const BRVPoisonbutton = () => {
    if(BRVPoison == false){
      setBRVPoisonsearch("true")
    } else{
      setBRVPoisonsearch("")
    }
    setBRVPoison((prevValue) => !prevValue);
  };
  const HPPoisonbutton = () => {
    if(HPPoison == false){
      setHPPoisonsearch("true")
    } else{
      setHPPoisonsearch("")
    }
    setHPPoison((prevValue) => !prevValue);
  };
  const BRVResistDownbutton = () => {
    if(BRVResistDown == false){
      setBRVResistDownsearch("true")
    } else{
      setBRVResistDownsearch("")
    }
    setBRVResistDown((prevValue) => !prevValue);
  };
  const HPResistDownbutton = () => {
    if(HPResistDown == false){
      setHPResistDownsearch("true")
    } else{
      setHPResistDownsearch("")
    }
    setHPResistDown((prevValue) => !prevValue);
  };
  const FourDebuffbutton = () => {
    if(FourDebuff == false){
      setFourDebuffsearch("true")
    } else{
      setFourDebuffsearch("")
    }
    setFourDebuff((prevValue) => !prevValue);
  };
  const BRVControlbutton = () => {
    if(BRVControl == false){
      setBRVControlsearch("true")
    } else{
      setBRVControlsearch("")
    }
    setBRVControl((prevValue) => !prevValue);
  };
  const Disablebutton = () => {
    if(Disable == false){
      setDisablesearch("true")
    } else{
      setDisablesearch("")
    }
    setDisable((prevValue) => !prevValue);
  };
  const Debuff_Breakbutton = () => {
    if(Debuff_Break == false){
      setDebuff_Breaksearch("true")
    } else{
      setDebuff_Breaksearch("")
    }
    setDebuff_Break((prevValue) => !prevValue);
  }
  const Stacked_Debuffbutton =() =>{
    if(Stacked_Debuff == false){
      setStacked_Debuffsearch("true")
    } else{
      setStacked_Debuffsearch("")
    }
    setStacked_Debuff((prevValue) => !prevValue);
  }

  const HP_Damage_Upbutton =() =>{
    if(HP_Damage_Up == false){
      setHP_Damage_Upsearch("true")
    } else{
      setHP_Damage_Upsearch("")
    }
    setHP_Damage_Up((prevValue) => !prevValue)
  }
  const Tankbutton = () => {
    if(Tank == false){
      setTanksearch("true")
    } else{
      setTanksearch("")
    }
    setTank((prevValue) => !prevValue);
  };
  const Batterybutton = () => {
    if(Battery == false){
      setBatterysearch("true")
    } else{
      setBatterysearch("")
    }
    setBattery((prevValue) => !prevValue);
  };
  const Launcherbutton = () => {
    if(Launcher == false){
      setLaunchersearch("true")
    } else{
      setLaunchersearch("")
    }
    setLauncher((prevValue) => !prevValue);
  };
  const Dispelbutton = () => {
    if(Dispel == false){
      setDispelsearch("true")
    } else{
      setDispelsearch("")
    }
    setDispel((prevValue) => !prevValue);
  };
  const BuffPreventbutton = () => {
    if(BuffPrevent == false){
      setBuffPreventsearch("true")
    } else{
      setBuffPreventsearch("")
    }
    setBuffPrevent((prevValue) => !prevValue);
  };
  const Counterbutton = () => {
    if(Counter == false){
      setCountersearch("true")
    } else{
      setCountersearch("")
    }
    setCounter((prevValue) => !prevValue);
  };
  const Delaybutton = () => {
    if(Delay == false){
      setDelaysearch("true")
    } else{
      setDelaysearch("")
    }
    setDelay((prevValue) => !prevValue);
  };
  const ThreeDelaybutton = () => {
    if(ThreeDelay == false){
      setThreeDelaysearch("true")
    } else{
      setThreeDelaysearch("")
    }
    setThreeDelay((prevValue) => !prevValue);
  };
  const ForceBreakbutton = () => {
    if(ForceBreak == false){
      setForceBreaksearch("true")
    } else{
      setForceBreaksearch("")
    }
    setForceBreak((prevValue) => !prevValue);
  };
  const DeleteTurnsbutton = () => {
    if(DeleteTurns == false){
      setDeleteTurnssearch("true")
    } else{
      setDeleteTurnssearch("")
    }
    setDeleteTurns((prevValue) => !prevValue);
  };
  const BRVDamageResistbutton = () => {
    if(BRVDamageResist == false){
      setBRVDamageResistsearch("true")
    } else{
      setBRVDamageResistsearch("")
    }
    setBRVDamageResist((prevValue) => !prevValue);
  };
  const HPDamageResistbutton = () => {
    if(HPDamageResist == false){
      setHPDamageResistsearch("true")
    } else{
      setHPDamageResistsearch("")
    }
    setHPDamageResist((prevValue) => !prevValue);
  };
  const BRVRegenbutton = () => {
    if(BRVRegen == false){
      setBRVRegensearch("true")
    } else{
      setBRVRegensearch("")
    }
    setBRVRegen((prevValue) => !prevValue);
  };
  const HPRegenbutton = () => {
    if(HPRegen == false){
      setHPRegensearch("true")
    } else{
      setHPRegensearch("")
    }
    setHPRegen((prevValue) => !prevValue);
  };
  const BRVShieldbutton = () => {
    if(BRVShield == false){
      setBRVShieldsearch("true")
    } else{
      setBRVShieldsearch("")
    }
    setBRVShield((prevValue) => !prevValue);
  };
  const HPHealAbilitybutton = () => {
    if(HPHealAbility == false){
      setHPHealAbilitysearch("true")
    } else{
      setHPHealAbilitysearch("")
    }
    setHPHealAbility((prevValue) => !prevValue);
  };
  const FiftyHPHealAbilitybutton = () => {
    if(HPHealAbility == false){
      setFiftyHPHealAbilitysearch("true")
    } else{
      setFiftyHPHealAbilitysearch("")
    }
    setFiftyHPHealAbility((prevValue) => !prevValue);
  };
  const SixBuffsbutton = () => {
    if(SixBuffs == false){
      setSixBuffssearch("true")
    } else{
      setSixBuffssearch("")
    }
    setSixBuffs((prevValue) => !prevValue);
  };
  const TwoAbilitiesRecoverbutton = () => {
    if(TwoAbilitiesRecover == false){
      setTwoAbilitiesRecoversearch("true")
    } else{
      setTwoAbilitiesRecoversearch("")
    }
    setTwoAbilitiesRecover((prevValue) => !prevValue);
  }
  const CritRateUpbutton = () => {
    if(CritRateUp == false){
      setCritRateUpsearch("true")
    } else{
      setCritRateUpsearch("")
    }
    setCritRateUp((prevValue) => !prevValue);
  }
  const Evadebutton = () => {
    if(Evade == false){
      setEvadesearch("true")
    } else{
      setEvadesearch("")
    }
    setEvade((prevValue) => !prevValue);
  }
  const Ignore_DEFbutton = () => {
    if(Ignore_DEF == false){
      setIgnore_DEFsearch("true")
    } else{
      setIgnore_DEFsearch("")
    }
    setIgnore_DEF((prevValue) => !prevValue);
  }
  const KO_Preventbutton = () => {
    if(KO_Prevent == false){
      setKO_Preventsearch("true")
    } else{
      setKO_Preventsearch("")
    }
    setKO_Prevent((prevValue) => !prevValue);
  }
  const Reviverbutton = () => {
    if(Reviver == false){
      setReviversearch("true")
    } else{
      setReviversearch("")
    }
    setReviver((prevValue) => !prevValue);
  }
  const Buff_Extensionbutton = () => {
    if(Buff_Extension == false){
      setBuff_Extensionsearch("true")
    } else{
      setBuff_Extensionsearch("")
    }
    setBuff_Extension((prevValue) => !prevValue);
  }
  const Break_Resetbutton = () => {
    if(Break_Reset == false){
      setBreak_Resetsearch("true")
    } else{
      setBreak_Resetsearch("")
    }
    setBreak_Reset((prevValue) => !prevValue);
  }
  const Self_Harmbutton = () => {
    if(Self_Harm == false){
      setSelf_Harmsearch("true")
    } else{
      setSelf_Harmsearch("")
    }
    setSelf_Harm((prevValue) => !prevValue);
  }

  const Ally_Turn_Manipulatorbutton = () => {
    if(Ally_Turn_Manipulator == false){
      setAlly_Turn_Manipulatorsearch("true")
    } else{
      setAlly_Turn_Manipulatorsearch("")
    }
    setAlly_Turn_Manipulator((prevValue) => !prevValue);
  }
  const FollowUpbutton = () => {
    if(FollowUp == false){
      setFollowUpsearch("true")
    } else{
      setFollowUpsearch("")
    }
    setFollowUp((prevValue) => !prevValue);
  }
  const Cannot_Breakbutton = () => {
    if(Cannot_Break == false){
      setCannot_Breaksearch("true")
    } else{
      setCannot_Breaksearch("")
    }
    setCannot_Break((prevValue) => !prevValue);
  }
  const Blindbutton = () => {
    if(Blind == false){
      setBlindsearch("true")
    } else{
      setBlindsearch("")
    }
    setBlind((prevValue) => !prevValue);
  }
  const Debuff_Evadebutton = () => {
    if(Debuff_Evade == false){
      setDebuff_Evadesearch("true")
    } else{
      setDebuff_Evadesearch("")
    }
    setDebuff_Evade((prevValue) => !prevValue);
  }
  const Debuff_Goldbutton = () => {
    if(Debuff_Gold == false){
      setDebuff_Goldsearch("true")
    } else{
      setDebuff_Goldsearch("")
    }
    setDebuff_Gold((prevValue) => !prevValue);
  }
  const BRV_Wont_Belowbutton = () => {
    if(BRV_Wont_Below == false){
      setBRV_Wont_Belowsearch("true")
    } else{
      setBRV_Wont_Belowsearch("")
    }
    setBRV_Wont_Below((prevValue) => !prevValue);
  }
  const FollowUp_By_Otherbutton = () => {
    if(FollowUp_By_Other == false){
      setFollowUp_By_Othersearch("true")
    } else{
      setFollowUp_By_Othersearch("")
    }
    setFollowUp_By_Other((prevValue) => !prevValue);
  }
  const Launch_Supportbutton = () => {
    if(Launch_Support == false){
      setLaunch_Supportsearch("true")
    } else{
      setLaunch_Supportsearch("")
    }
    setLaunch_Support((prevValue) => !prevValue);
  }
  const Continuous_Turnsbutton = () => {
    if(Continuous_Turns == false){
      setContinuous_Turnssearch("true")
    } else{
      setContinuous_Turnssearch("")
    }
    setContinuous_Turns((prevValue) => !prevValue);
  }
  const Turn_Interrupterbutton = () => {
    if(Turn_Interrupter == false){
      setTurn_Interruptersearch("true")
    } else{
      setTurn_Interruptersearch("")
    }
    setTurn_Interrupter((prevValue) => !prevValue);
  }
  const BRV_Ratiobutton = () => {
    if(BRV_Ratio == false){
      setBRV_Ratiosearch("true")
    } else{
      setBRV_Ratiosearch("")
    }
    setBRV_Ratio((prevValue) => !prevValue);
  }
  const BRV_Absorbbutton = () => {
    if(BRV_Absorb == false){
      setBRV_Absorbsearch("true")
    } else{
      setBRV_Absorbsearch("")
    }
    setBRV_Absorb((prevValue) => !prevValue);
  }
  const EX_MAX_Partybutton = () => {
    if(EX_MAX_Party == false){
      setEX_MAX_Partysearch("true")
    } else{
      setEX_MAX_Partysearch("")
    }
    setEX_MAX_Party((prevValue) => !prevValue);
  }
  const Stacked_Buffbutton = () => {
    if(Stacked_Buff == false){
      setStacked_Buffsearch("true")
    } else{
      setStacked_Buffsearch("")
    }
    setStacked_Buff((prevValue) => !prevValue);
  }
  const Stacked_Buff_Fivebutton = () => {
    if(Stacked_Buff_Five == false){
      setStacked_Buff_Fivesearch("true")
    } else{
      setStacked_Buff_Fivesearch("")
    }
    setStacked_Buff_Five((prevValue) => !prevValue);
  }
  const Trap_After_Triggerbutton = () => {
    if(Trap_After_Trigger == false){
      setTrap_After_Triggersearch("true")
    } else{
      setTrap_After_Triggersearch("")
    }
    setTrap_After_Trigger((prevValue) => !prevValue);
  }
  const Trap_Before_Turnbutton = () => {
    if(Trap_Before_Turn == false){
      setTrap_Before_Turnsearch("true")
    } else{
      setTrap_Before_Turnsearch("")
    }
    setTrap_Before_Turn((prevValue) => !prevValue);
  }
  const FollowUp_Before_Player_Turnbutton = () => {
    if(FollowUp_Before_Player_Turn == false){
      setFollowUp_Before_Player_Turnsearch("true")
    } else{
      setFollowUp_Before_Player_Turnsearch("")
    }
    setFollowUp_Before_Player_Turn((prevValue) => !prevValue);
  }
  const FollowUp_Before_Abilitybutton = () => {
    if(FollowUp_Before_Ability == false){
      setFollowUp_Before_Abilitysearch("true")
    } else{
      setFollowUp_Before_Abilitysearch("")
    }
    setFollowUp_Before_Ability((prevValue) => !prevValue);
  }
  const FollowUp_Extensionbutton = () => {
    if(FollowUp_Extension == false){
      setFollowUp_Extensionsearch("true")
    } else{
      setFollowUp_Extensionsearch("")
    }
    setFollowUp_Extension((prevValue) => !prevValue);
  }
  const FollowUp_Start_Of_Nextbutton = () => {
    if(FollowUp_Start_Of_Next == false){
      setFollowUp_Start_Of_Nextsearch("true")
    } else{
      setFollowUp_Start_Of_Nextsearch("")
    }
    setFollowUp_Start_Of_Next((prevValue) => !prevValue);
  }
  const FollowUp_Action_On_Enemybutton = () => {
    if(FollowUp_Action_On_Enemy == false){
      setFollowUp_Action_On_Enemysearch("true")
    } else{
      setFollowUp_Action_On_Enemysearch("")
    }
    setFollowUp_Action_On_Enemy((prevValue) => !prevValue);
  }
  const Free_Abilitybutton = () => {
    if(Free_Ability == false){
      setFree_Abilitysearch("true")
    } else{
      setFree_Abilitysearch("")
    }
    setFree_Ability((prevValue) => !prevValue);
  }
  const Special_Buffbutton = () => {
    if(Free_Ability == false){
      setSpecial_Buffsearch("true")
    } else{
      setSpecial_Buffsearch("")
    }
    setSpecial_Buff((prevValue) => !prevValue);
  }

  const Board5button = () => {
    if(Board5Flag == false){
      setBoard5Flagsearch("true")
    } else{
      setBoard5Flagsearch("")
    }
    setBoard5Flag((prevValue) => !prevValue);
  }

  const BRV_Damage_Capbutton = () => {
    if(BRV_Damage_Cap == false){
      setBRV_Damage_Capsearch("true")
    } else{
      setBRV_Damage_Capsearch("")
    }
    setBRV_Damage_Cap((prevValue) => !prevValue);
  }
  
  //gear
  const MaxLevelbutton = () => {
    if(MaxLevel == false){
      setMaxLevelsearch("true")
      }else{
        setMaxLevelsearch("")
      }
    setMaxLevel((prevValue) => !prevValue);
  };
  const spoilersbutton = () => {
    if(spoilers == false){
      setspoilerssearch("true")
      }else{
        setspoilerssearch("")
      }
    setspoilers((prevValue) => !prevValue);
  };
  const ActiveReworkbutton = () => {
    if(ActiveRework == false){
      setActiveReworksearch("true")
      }else{
        setActiveReworksearch("")
      }
    setActiveRework((prevValue) => !prevValue);
  };
  const LDFlagbutton = () => {
    if(LDFlag == false){
      setLDFlagsearch("true")
      }else{
        setLDFlagsearch("")
      }
    setLDFlag((prevValue) => !prevValue);
  };
  const FRFlagbutton = () => {
    if(FRFlag == false){
      setFRFlagsearch("true")
      }else{
        setFRFlagsearch("")
      }
    setFRFlag((prevValue) => !prevValue);
  };
  const BTFlagbutton = () => {
    if(BTFlag == false){
      setBTFlagsearch("true")
      }else{
        setBTFlagsearch("")
      }
    setBTFlag((prevValue) => !prevValue);
  };
  const LDBoardFlagbutton = () => {
    if(LDBoardFlag == false){
      setLDBoardFlagsearch("true")
      }else{
        setLDBoardFlagsearch("")
      }
    setLDBoardFlag((prevValue) => !prevValue);
  };
  const FRBoardFlagbutton = () => {
    if(FRBoardFlag == false){
      setFRBoardFlagsearch("true")
      }else{
        setFRBoardFlagsearch("")
      }
    setFRBoardFlag((prevValue) => !prevValue);
  };
  const BTPlusFlagbutton = () => {
    if(BTPlusFlag == false){
      setBTPlusFlagsearch("true")
      }else{
        setBTPlusFlagsearch("")
      }
    setBTPlusFlag((prevValue) => !prevValue);
  };
  const SevenStarArmorbutton = () => {
    if(SevenStarArmor == false){
      setSevenStarArmorsearch("true")
      }else{
        setSevenStarArmorsearch("")
      }
    setSevenStarArmor((prevValue) => !prevValue);
  };
  const SevenStarPlusArmorbutton = () => {
    if(SevenStarPlusArmor == false){
      setSevenStarPlusArmorsearch("true")
      }else{
        setSevenStarPlusArmorsearch("")
      }
    setSevenStarPlusArmor((prevValue) => !prevValue);
  };

  const NameSortbutton = () => {
    if(NameSort == false){
      setSortsearch("Name")
      setJPSort(false)
      setHPSort(false)
      setINTBRVSort(false)
      setMAXBRVSort(false)
      setATKSort(false)
      setDEFSort(false)
      setSPDSort(false)
      setRealmSort(false)
      }else{
      setSortsearch("")
      }
    setNameSort((prevValue) => !prevValue);
  };

  const RealmSortbutton = () => {
    if(RealmSort == false){
      setSortsearch("Realm")
      setJPSort(false)
      setHPSort(false)
      setINTBRVSort(false)
      setMAXBRVSort(false)
      setATKSort(false)
      setDEFSort(false)
      setSPDSort(false)
      setNameSort(false)
      }else{
      setSortsearch("")
      }
    setRealmSort((prevValue) => !prevValue);
  };
  const JPSortbutton = () => {
    if(JPSort == false){
      dispatch(setTrue())
      setSortsearch("JP")
      setJPSearch("true")
      setHPSort(false)
      setINTBRVSort(false)
      setMAXBRVSort(false)
      setATKSort(false)
      setDEFSort(false)
      setSPDSort(false)
      setRealmSort(false)
      setNameSort(false)
      }else{
      setSortsearch("")
      setJPSearch("")
      dispatch(setFalse())
      }
    setJPSort((prevValue) => !prevValue);
  };
  const HPSortbutton = () => {
    if(HPSort == false){
      setSortsearch("HP")
      setINTBRVSort(false)
      setINTBRVSort(false)
      setATKSort(false)
      setDEFSort(false)
      setSPDSort(false)
      setRealmSort(false)
      setJPSort(false)
      setNameSort(false)
      }else{
      setSortsearch("")
      }
    setHPSort((prevValue) => !prevValue);
  };
  const INTBRVSortbutton = () => {
    if(INTBRVSort == false){
      setSortsearch("INTBRV")
      setHPSort(false)
      setMAXBRVSort(false)
      setATKSort(false)
      setDEFSort(false)
      setSPDSort(false)
      setRealmSort(false)
      setJPSort(false)
      setNameSort(false)
      }else{
      setSortsearch("")
      }
    setINTBRVSort((prevValue) => !prevValue);
  };
  const MAXBRVSortbutton = () => {
    if(MAXBRVSort == false){
      setSortsearch("MAXBRV")
      setHPSort(false)
      setINTBRVSort(false)
      setATKSort(false)
      setDEFSort(false)
      setSPDSort(false)
      setRealmSort(false)
      setJPSort(false)
      setNameSort(false)
      }else{
      setSortsearch("")
      }
    setMAXBRVSort((prevValue) => !prevValue);
  };
  const ATKSortbutton = () => {
    if(ATKSort == false){
      setSortsearch("ATK")
      setHPSort(false)
      setINTBRVSort(false)
      setMAXBRVSort(false)
      setDEFSort(false)
      setSPDSort(false)
      setRealmSort(false)
      setJPSort(false)
      setNameSort(false)
      }else{
      setSortsearch("")
      }
    setATKSort((prevValue) => !prevValue);
  };
  const DEFSortbutton = () => {
    if(DEFSort == false){
      setSortsearch("DEF")
      setHPSort(false)
      setINTBRVSort(false)
      setMAXBRVSort(false)
      setATKSort(false)
      setSPDSort(false)
      setRealmSort(false)
      setJPSort(false)
      setNameSort(false)
      }else{
      setSortsearch("")
      }
    setDEFSort((prevValue) => !prevValue);
  };
  const SPDSortbutton = () => {
    if(SPDSort == false){
      setSortsearch("SPD")
      setHPSort(false)
      setINTBRVSort(false)
      setMAXBRVSort(false)
      setATKSort(false)
      setDEFSort(false)
      setRealmSort(false)
      setJPSort(false)
      setNameSort(false)
      }else{
      setSortsearch("")
      }
    setSPDSort((prevValue) => !prevValue);
  };

  const togglemerge = () => {
    if (merge == false) {
      setMergesearch("true")
    } else{
      setMergesearch("")
    }
    setMerge((prevValue) => !prevValue);
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

  const showfilterbutton = () => {
    if (showFilter == false) {
      setFiltersearch("true")
    } else {
      setFiltersearch("")
    }
    setShowFilter((prevValue) => !prevValue);
  }

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

  const resetbutton = () =>{
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
    setFourDebuff(false)
    setFiftyHPHealAbility(false)
    setSixBuffs(false)
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
    setMaxLevel(false)
    setActiveRework(false)
    setLDFlag(false)
    setFRFlag(false)
    setBTFlag(false)
    setLDBoardFlag(false)
    setFRBoardFlag(false)
    setBTPlusFlag(false)
    setSevenStarArmor(false)
    setSevenStarPlusArmor(false)
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
    setDebuff_Break(false)
    setKO_Prevent(false)
    setReviver(false)
    setStacked_Debuff(false)
    setNon_Elemental(false)
    setHP_Damage_Up(false)
    setMerge(false)
    setRealmSort(false)
    setNameSort(false)
    setJPSort(false)
    setHPSort(false)
    setINTBRVSort(false)
    setMAXBRVSort(false)
    setATKSort(false)
    setDEFSort(false)
    setSPDSort(false)
    setBuff_Extension(false)
    setBreak_Reset(false)
    setSelf_Harm(false)
    setAlly_Turn_Manipulator(false)
    setFollowUp(false)
    setCannot_Break(false)
    setBlind(false)
    setDebuff_Evade(false)
    setDebuff_Gold(false)
    setBRV_Wont_Below(false)
    setFollowUp_By_Other(false)
    setLaunch_Support(false)
    setContinuous_Turns(false)
    setTurn_Interrupter(false)
    setBRV_Ratio(false)
    setBRV_Absorb(false)
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
    setFourDebuffsearch("")
    setBRVControlsearch("")
    setDisablesearch("")
    setDebuff_Breaksearch("")
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
    setFiftyHPHealAbilitysearch("")
    setSixBuffssearch("")
    setTwoAbilitiesRecoversearch("")
    setCritRateUpsearch("")
    setEvadesearch("")
    setIgnore_DEFsearch("")
    setKO_Preventsearch("")
    setReviversearch("")
    setBuff_Extensionsearch("")
    setBreak_Resetsearch("")
    setSelf_Harmsearch("")
    setAlly_Turn_Manipulatorsearch("")
    setFollowUpsearch("")
    setCannot_Breaksearch("")
    setBlindsearch("")
    setDebuff_Evadesearch("")
    setDebuff_Goldsearch("")
    setBRV_Wont_Belowsearch("")
    setFollowUp_By_Othersearch("")
    setLaunch_Supportsearch("")
    setContinuous_Turnssearch("")
    setTurn_Interruptersearch("")
    setBRV_Ratiosearch("")
    setBRV_Absorbsearch("")
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

    setMaxLevelsearch("")
    setActiveReworksearch("")
    setLDFlagsearch("")
    setFRFlagsearch("")
    setBTFlagsearch("")
    setLDBoardFlagsearch("")
    setFRBoardFlagsearch("")
    setBTPlusFlagsearch("")
    setSevenStarArmorsearch("")
    setSevenStarPlusArmorsearch("")
    setBoard5Flagsearch('')

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
    <div className="wrapper">
      <Helmet>
        <title>Characters - Dissidia Compendium</title>
        <meta property="og:site_name" content="Dissidia Compendium"/>
        <meta property="og:type" content="website" />
        <meta name="description" content="Dissidia Opera Omnia Database Characters with english translations for all enemies found in game"/>
        <meta name="twitter:title" content="Dissidia Compendium - Characters"/>
        <meta name="twitter:description" content="Dissidia Opera Omnia Database Characters with english translations for all enemies found in game"/>
        <meta name="twitter:image" content="https://dissidiacompendium.com/images/static/site/logo152.png"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:image:alt" content="Dissidia Compendium - Characters"/>
        <meta property="og:title" content="Dissidia Compendium - Characters"/>
        <meta property="og:description" content="Dissidia Opera Omnia Database Characters with english translations for all enemies found in game"/>
        <meta property="og:image" content="https://dissidiacompendium.com/images/static/site/logo152.png"/>
        <meta property="og:url" content="https://dissidiacompendium.com/chracters"/>
      </Helmet>
        <div className="content">
          <h1>{`${jptoggledata ? "JP" : "GL"} Characters`}</h1>
          <div className="charfilterspacer"/>
          <div key="filter1" onClick={showfilterbutton} className="charfilter"><span className="filterstext"></span>{showFilter ? <TiArrowSortedUp className="uparrow"/> : <TiArrowSortedDown className="downarrow"/>}</div>
          {showFilter == false ? 
          <div className="event-search-reverse-holder">
            <span className={`${jptoggledata ? "jponlybackground" : "GLonlybackground"}`}>
              <Tippy content={`${jptoggledata ? "Switch to GL" : "Switch to JP"}`} className="tooltip" >
              <span onClick={jponlybutton} className={`${jptoggledata ? "jpflage jpsmallinactive smalleventbutton" : "glflage smalleventbutton"}`}/>
              </Tippy>
            </span>
            <IoSearch className="searchicon"/>
          <div className="search-holder el">
            <input 
                className="char-search-bar" 
                type="text"
                placeholder="Search Name"
                value={searchdisplay}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <span className="Spoilerbackground">
              <Tippy content={`Spoilers ${spoilers==false?"on":"off"}!`} className="tooltip" >
                <span>
              <ImWarning 
              onClick={spoilersbutton}
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
          :""
          }
          <div className="filterholder noselect" id={showFilter ? "showfilteren" : "hiddenfilteren"}>
                  <div className="similarbanner">Basic Traits</div>
                  <div className="filterholderflair">
                      <ul className="bufftypes">
                      <Tippy content="A Sphere Slot">
                        <li className={`${ASlot ? "filteractive": "filterinactive"} spheresbutton aSpheresButton`} onClick={ASlotbutton}></li>
                      </Tippy>
                      <Tippy content="B Sphere Slot">
                        <li className={`${BSlot ? "filteractive": "filterinactive"} spheresbutton bSpheresButton`} onClick={BSlotbutton}></li>
                      </Tippy>
                      <Tippy content="C Sphere Slot">
                        <li className={`${CSlot ? "filteractive": "filterinactive"} spheresbutton cSpheresButton`} onClick={CSlotbutton}></li>
                      </Tippy>
                      <Tippy content="D Sphere Slot">
                        <li className={`${DSlot ? "filteractive": "filterinactive"} spheresbutton dSpheresButton`} onClick={DSlotbutton}></li>
                      </Tippy>
                      <Tippy content="E Sphere Slot">
                        <li className={`${ESlot ? "filteractive": "filterinactive"} spheresbutton eSpheresButton`} onClick={ESlotbutton}></li>
                      </Tippy>
                      </ul>
                    <br/>
                    <ul className="bufftypes">
                      <Tippy content="Red Crystal">
                        <li className={`${RedCrystal ? "filteractive": "filterinactive"} spheresbutton redcrystalbutton`} onClick={RedCrystalbutton}></li>
                      </Tippy>
                      <Tippy content="Blue Crystal">
                        <li className={`${BlueCrystal ? "filteractive": "filterinactive"} spheresbutton bluecrystalbutton`} onClick={BlueCrystalbutton}></li>
                      </Tippy>
                      <Tippy content="Green Crystal">
                        <li className={`${GreenCrystal ? "filteractive": "filterinactive"} spheresbutton greencrystalbutton`} onClick={GreenCrystalbutton}></li>
                      </Tippy>
                      <Tippy content="Yellow Crystal">
                        <li className={`${YellowCrystal ? "filteractive": "filterinactive"} spheresbutton yellowcrystalbutton`} onClick={YellowCrystalbutton}></li>
                      </Tippy>
                      <Tippy content="White Crystal">
                        <li className={`${WhiteCrystal ? "filteractive": "filterinactive"} spheresbutton whitecrystalbutton`} onClick={WhiteCrystalbutton}></li>
                      </Tippy>
                      <Tippy content="Black Crystal">
                        <li className={`${BlackCrystal ? "filteractive": "filterinactive"} spheresbutton blackcrystalbutton`} onClick={BlackCrystalbutton}></li>
                      </Tippy>
                    </ul>
                    <br/>
                    <ul className="bufftypes">
                      <Tippy content="Dagger Weapon">
                        <li className={`${Dagger ? "filteractive": "filterinactive"} spheresbutton daggerbutton`} onClick={Daggerbutton}></li>
                      </Tippy>
                      <Tippy content="Sword Weapon">
                        <li className={`${Sword ? "filteractive": "filterinactive"} spheresbutton swordbutton`} onClick={Swordbutton}></li>
                      </Tippy>
                      <Tippy content="Greatsword Weapon">
                        <li className={`${Greatsword ? "filteractive": "filterinactive"} spheresbutton greatswordbutton`} onClick={Greatswordbutton}></li>
                      </Tippy>
                      <Tippy content="Staff Weapon">
                        <li className={`${Staff ? "filteractive": "filterinactive"} spheresbutton staffbutton`} onClick={Staffbutton}></li>
                      </Tippy>
                      <Tippy content="Gun Weapon">
                        <li className={`${Gun ? "filteractive": "filterinactive"} spheresbutton gunbutton`} onClick={Gunbutton}></li>
                      </Tippy>
                      <Tippy content="Fist Weapon">
                        <li className={`${Fist ? "filteractive": "filterinactive"} spheresbutton fistbutton`} onClick={Fistbutton}></li>
                      </Tippy>
                      <Tippy content="Throwing Weapon">
                        <li className={`${Throwing ? "filteractive": "filterinactive"} spheresbutton throwingbutton`} onClick={Throwingbutton}></li>
                      </Tippy>
                      <Tippy content="Spear Weapon">
                        <li className={`${Spear ? "filteractive": "filterinactive"} spheresbutton spearbutton`} onClick={Spearbutton}></li>
                      </Tippy>
                      <Tippy content="Bow Weapon">
                        <li className={`${Bow ? "filteractive": "filterinactive"} spheresbutton bowbutton`} onClick={Bowbutton}></li>
                      </Tippy>
                      <Tippy content="Whip Weapon">
                        <li className={`${Whip ? "filteractive": "filterinactive"} spheresbutton whipbutton`} onClick={Whipbutton}></li>
                      </Tippy>
                      <Tippy content="Other Weapon">
                        <li className={`${Other ? "filteractive": "filterinactive"} spheresbutton otherbutton`} onClick={Otherbutton}></li>
                      </Tippy>
                    </ul>
                    <br/>
                    <div className="similarbanner">Damage Types</div>
                    <ul className="bufftypes">
                      <Tippy content="Magic Damage Type">
                        <li className={`${Magic ? "filteractive": "filterinactive"} buffsbutton magicbutton`} onClick={Magicbutton}></li>
                      </Tippy>
                      <Tippy content="Melee Damage Type">
                        <li className={`${Melee ? "filteractive": "filterinactive"} buffsbutton meleebutton`} onClick={Meleebutton}></li>
                      </Tippy>
                      <Tippy content="Ranged Damage Type">
                        <li className={`${Ranged ? "filteractive": "filterinactive"} buffsbutton rangedbutton`} onClick={Rangedbutton}></li>
                      </Tippy>
                      <Tippy content="Non-Elemental">
                        <li className={`${Non_Elemental ? "filteractive": "filterinactive"} buffsbutton Non_Elementalbutton`} onClick={Non_Elementalbutton}></li>
                      </Tippy>
                    </ul>
                    <br/>
                    <ul className="bufftypes">
                      <Tippy content="Fire BRV Damage">
                        <li className={`${Fire ? "filteractive": "filterinactive"} spheresbutton Firebutton`} onClick={Firebutton}></li>
                      </Tippy>
                      <Tippy content="Ice BRV Damage">
                        <li className={`${Ice ? "filteractive": "filterinactive"} spheresbutton Icebutton`} onClick={Icebutton}></li>
                      </Tippy>
                      <Tippy content="Thunder BRV Damage">
                        <li className={`${Thunder ? "filteractive": "filterinactive"} spheresbutton Thunderbutton`} onClick={Thunderbutton}></li>
                      </Tippy>
                      <Tippy content="Water BRV Damage">
                        <li className={`${Water ? "filteractive": "filterinactive"} spheresbutton Waterbutton`} onClick={Waterbutton}></li>
                      </Tippy>
                      <Tippy content="Earth BRV Damage">
                        <li className={`${Earth ? "filteractive": "filterinactive"} spheresbutton Earthbutton`} onClick={Earthbutton}></li>
                      </Tippy>
                      <Tippy content="Wind BRV Damage">
                        <li className={`${Wind ? "filteractive": "filterinactive"} spheresbutton Windbutton`} onClick={Windbutton}></li>
                      </Tippy>
                      <Tippy content="Dark BRV Damage">
                        <li className={`${Dark ? "filteractive": "filterinactive"} spheresbutton Darkbutton`} onClick={Darkbutton}></li>
                      </Tippy>
                      <Tippy content="Holy BRV Damage">
                        <li className={`${Holy ? "filteractive": "filterinactive"} spheresbutton Holybutton`} onClick={Holybutton}></li>
                      </Tippy>
                      </ul>
                    <div className="similarbanner">Attacking</div>
                    <ul className="bufftypes">
                      <Tippy content={roles[`Magic_Imperil`].name}>
                        <li className={`${MagicImperil ? "filteractive": "filterinactive"} spheresbutton`} onClick={MagicImperilbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Magic_Imperil`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Melee_Imperil`].name}>
                        <li className={`${MeleeImperil ? "filteractive": "filterinactive"} spheresbutton`} onClick={MeleeImperilbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Melee_Imperil`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Ranged_Imperil`].name}>
                        <li className={`${RangedImperil ? "filteractive": "filterinactive"} spheresbutton`} onClick={RangedImperilbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Ranged_Imperil`].url}.png)`}}></li>
                      </Tippy>
                    </ul>
                    <br/>
                    <ul className="bufftypes">
                      <Tippy content={roles[`Fire_Enchant`].name}>
                        <li className={`${FireEnchant ? "filteractive": "filterinactive"} spheresbutton`} onClick={FireEnchantbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Fire_Enchant`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Ice_Enchant`].name}>
                        <li className={`${IceEnchant ? "filteractive": "filterinactive"} spheresbutton`} onClick={IceEnchantbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Ice_Enchant`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Thunder_Enchant`].name}>
                        <li className={`${ThunderEnchant ? "filteractive": "filterinactive"} spheresbutton`} onClick={ThunderEnchantbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Thunder_Enchant`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Water_Enchant`].name}>
                        <li className={`${WaterEnchant ? "filteractive": "filterinactive"} spheresbutton`} onClick={WaterEnchantbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Water_Enchant`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Earth_Enchant`].name}>
                        <li className={`${EarthEnchant ? "filteractive": "filterinactive"} spheresbutton`} onClick={EarthEnchantbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Earth_Enchant`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Wind_Enchant`].name}>
                        <li className={`${WindEnchant ? "filteractive": "filterinactive"} spheresbutton`} onClick={WindEnchantbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Wind_Enchant`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Dark_Enchant`].name}>
                        <li className={`${DarkEnchant ? "filteractive": "filterinactive"} spheresbutton`} onClick={DarkEnchantbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Dark_Enchant`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Holy_Enchant`].name}>
                        <li className={`${HolyEnchant ? "filteractive": "filterinactive"} spheresbutton`} onClick={HolyEnchantbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Holy_Enchant`].url}.png)`}}></li>
                      </Tippy>
                    </ul>
                    <br/>
                    <ul className="bufftypes">
                      <Tippy content={roles[`Fire_Imperil`].name}>
                        <li className={`${FireImperil ? "filteractive": "filterinactive"} spheresbutton`} onClick={FireImperilbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Fire_Imperil`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Ice_Imperil`].name}>
                        <li className={`${IceImperil ? "filteractive": "filterinactive"} spheresbutton`} onClick={IceImperilbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Ice_Imperil`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Thunder_Imperil`].name}>
                        <li className={`${ThunderImperil ? "filteractive": "filterinactive"} spheresbutton`} onClick={ThunderImperilbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Thunder_Imperil`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Water_Imperil`].name}>
                        <li className={`${WaterImperil ? "filteractive": "filterinactive"} spheresbutton`} onClick={WaterImperilbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Water_Imperil`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Earth_Imperil`].name}>
                        <li className={`${EarthImperil ? "filteractive": "filterinactive"} spheresbutton`} onClick={EarthImperilbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Earth_Imperil`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Wind_Imperil`].name}>
                        <li className={`${WindImperil ? "filteractive": "filterinactive"} spheresbutton`} onClick={WindImperilbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Wind_Imperil`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Dark_Imperil`].name}>
                        <li className={`${DarkImperil ? "filteractive": "filterinactive"} spheresbutton`} onClick={DarkImperilbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Dark_Imperil`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Holy_Imperil`].name}>
                        <li className={`${HolyImperil ? "filteractive": "filterinactive"} spheresbutton`} onClick={HolyImperilbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Holy_Imperil`].url}.png)`}}></li>
                      </Tippy>
                    </ul>
                    <br/>
                    <ul className="characterclasses">
                      <Tippy content={roles[`Launcher`].name}>
                        <li className={`${Launcher ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Launcherbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Launcher`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Launch_Support`].name}>
                        <li className={`${Launch_Support ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Launch_Supportbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Launch_Support`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Force_Break`].name}>
                        <li className={`${ForceBreak ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={ForceBreakbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Force_Break`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Crit_Rate_Up`].name}>
                        <li className={`${CritRateUp ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={CritRateUpbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Crit_Rate_Up`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Ignore_DEF`].name}>
                        <li className={`${Ignore_DEF ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Ignore_DEFbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Ignore_DEF`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Continuous_Turns`].name}>
                        <li className={`${Continuous_Turns ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Continuous_Turnsbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Continuous_Turns`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Turn_Interrupter`].name}>
                        <li className={`${Turn_Interrupter ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Turn_Interrupterbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Turn_Interrupter`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Ally_Turn_Manipulator`].name}>
                        <li className={`${Ally_Turn_Manipulator ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Ally_Turn_Manipulatorbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Ally_Turn_Manipulator`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`BRV_Ratio`].name}>
                        <li className={`${BRV_Ratio ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={BRV_Ratiobutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`BRV_Ratio`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`HP_Damage_Up_Party`].name}>
                        <li className={`${HP_Damage_Up ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={HP_Damage_Upbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`HP_Damage_Up_Party`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`BRV_Damage_Cap`].name}>
                        <li className={`${BRV_Damage_Cap ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={BRV_Damage_Capbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`BRV_Damage_Cap`].url}.png)`}}></li>
                      </Tippy>      
                      <Tippy content={roles[`EX_MAX_Party`].name}>
                        <li className={`${EX_MAX_Party ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={EX_MAX_Partybutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`EX_MAX_Party`].url}.png)`}}></li>
                      </Tippy>  
                      <Tippy content={roles[`Debuffer`].name}>
                        <li className={`${Debuffer ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Debufferbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Debuffer`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`BRV_Resist_Down`].name}>
                        <li className={`${BRVResistDown ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={BRVResistDownbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`BRV_Resist_Down`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`HP_Resist_Down`].name}>
                        <li className={`${HPResistDown ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={HPResistDownbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`HP_Resist_Down`].url}.png)`}}></li>
                      </Tippy>
                    </ul>
                    <div className="similarbanner">Healing</div>
                    <ul className="characterclasses">
                      <Tippy content={roles[`Cleanse`].name}>
                        <li className={`${Cleanse ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Cleansebutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Cleanse`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Battery`].name}>
                        <li className={`${Battery ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Batterybutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Battery`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Reviver`].name}>
                        <li className={`${Reviver ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Reviverbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Reviver`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`KO_Prevent`].name}>
                        <li className={`${KO_Prevent ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={KO_Preventbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`KO_Prevent`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`BRV_Regen`].name}>
                        <li className={`${BRVRegen ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={BRVRegenbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`BRV_Regen`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`HP_Regen`].name}>
                        <li className={`${HPRegen ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={HPRegenbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`HP_Regen`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`HP_Heal_Ability`].name}>
                        <li className={`${HPHealAbility ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={HPHealAbilitybutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`HP_Heal_Ability`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Two_Abilities_Recover`].name}>
                        <li className={`${TwoAbilitiesRecover ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={TwoAbilitiesRecoverbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Two_Abilities_Recover`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Buff_Extension`].name}>
                        <li className={`${Buff_Extension ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Buff_Extensionbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Buff_Extension`].url}.png)`}}></li>
                      </Tippy>
                    </ul>
                    <div className="similarbanner">Additional Attacks</div>
                    <ul className="characterclasses">
                      <Tippy content={roles[`Trap`].name}>
                        <li className={`${Trap ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Trapbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Trap`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Trap_After_Trigger`].name}>
                        <li className={`${Trap_After_Trigger ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Trap_After_Triggerbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Trap_After_Trigger`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Trap_Before_Turn`].name}>
                        <li className={`${Trap_Before_Turn ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Trap_Before_Turnbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Trap_Before_Turn`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Counter`].name}>
                        <li className={`${Counter ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Counterbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Counter`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`FollowUp`].name}>
                        <li className={`${FollowUp ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={FollowUpbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`FollowUp`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`FollowUp_Before_Player_Turn`].name}>
                        <li className={`${FollowUp_Before_Player_Turn ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={FollowUp_Before_Player_Turnbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`FollowUp_Before_Player_Turn`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`FollowUp_Before_Ability`].name}>
                        <li className={`${FollowUp_Before_Ability ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={FollowUp_Before_Abilitybutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`FollowUp_Before_Ability`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`FollowUp_Extension`].name}>
                        <li className={`${FollowUp_Extension ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={FollowUp_Extensionbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`FollowUp_Extension`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`FollowUp_Start_Of_Next`].name}>
                        <li className={`${FollowUp_Start_Of_Next ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={FollowUp_Start_Of_Nextbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`FollowUp_Start_Of_Next`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`FollowUp_Action_On_Enemy`].name}>
                        <li className={`${FollowUp_Action_On_Enemy ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={FollowUp_Action_On_Enemybutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`FollowUp_Action_On_Enemy`].url}.png)`}}></li>
                      </Tippy>
                    </ul>
                    <div className="similarbanner">Defending</div>
                    <ul className="characterclasses">
                      <Tippy content={roles[`Cover`].name}>
                        <li className={`${Tank ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Tankbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Cover`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Evade`].name}>
                        <li className={`${Evade ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Evadebutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Evade`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`BRV_Shield`].name}>
                        <li className={`${BRVShield ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={BRVShieldbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`BRV_Shield`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Cannot_Break`].name}>
                        <li className={`${Cannot_Break ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Cannot_Breakbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Cannot_Break`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`BRV_Damage_Resist`].name}>
                        <li className={`${BRVDamageResist ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={BRVDamageResistbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`BRV_Damage_Resist`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`HP_Damage_Resist`].name}>
                        <li className={`${HPDamageResist ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={HPDamageResistbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`HP_Damage_Resist`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Debuff_Evade`].name}>
                        <li className={`${Debuff_Evade ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Debuff_Evadebutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Debuff_Evade`].url}.png)`}}></li>
                      </Tippy>
                    </ul>
                    <div className="similarbanner">Interference</div>
                    <ul className="characterclasses">
                      <Tippy content={roles[`Delay`].name}>
                        <li className={`${Delay ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Delaybutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Delay`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Three_Delay`].name}>
                        <li className={`${ThreeDelay ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={ThreeDelaybutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Three_Delay`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Delete_Turns`].name}>
                        <li className={`${DeleteTurns ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={DeleteTurnsbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Delete_Turns`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Dispel`].name}>
                        <li className={`${Dispel ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Dispelbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Dispel`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`BuffPrevent`].name}>
                        <li className={`${BuffPrevent ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={BuffPreventbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`BuffPrevent`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Break_Reset`].name}>
                        <li className={`${Break_Reset ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Break_Resetbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Break_Reset`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`BRV_Poison`].name}>
                        <li className={`${BRVPoison ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={BRVPoisonbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`BRV_Poison`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`HP_Poison`].name}>
                        <li className={`${HPPoison ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={HPPoisonbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`HP_Poison`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`BRV_Control`].name}>
                        <li className={`${BRVControl ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={BRVControlbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`BRV_Control`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Disable`].name}>
                        <li className={`${Disable ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Disablebutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Disable`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Blind`].name}>
                        <li className={`${Blind ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Blindbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Blind`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Debuff_Gold`].name}>
                        <li className={`${Debuff_Gold ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Debuff_Goldbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Debuff_Gold`].url}.png)`}}></li>
                      </Tippy>  
                    </ul>
                    <div className="similarbanner">Other</div>
                    <ul className="characterclasses">
                    <Tippy content={roles[`Special_Buff`].name}>
                        <li className={`${Special_Buff ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Special_Buffbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Special_Buff`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Stacked_Debuff`].name}>
                        <li className={`${Stacked_Debuff ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Stacked_Debuffbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Stacked_Debuff`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Stacked_Buff`].name}>
                        <li className={`${Stacked_Buff ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Stacked_Buffbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Stacked_Buff`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Stacked_Buff_Five`].name}>
                        <li className={`${Stacked_Buff_Five ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Stacked_Buff_Fivebutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Stacked_Buff_Five`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Free_Ability`].name}>
                        <li className={`${Free_Ability ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Free_Abilitybutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Free_Ability`].url}.png)`}}></li>
                      </Tippy>
                      <Tippy content={roles[`Self_Harm`].name}>
                        <li className={`${Self_Harm ? "filteractive": "filterinactive"} characterclassesbutton`} onClick={Self_Harmbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[`Self_Harm`].url}.png)`}}></li>
                      </Tippy>
                    </ul>
                    <div className="similarbanner">Gear Level</div>
                    <ul className="bufftypes">
                      <Tippy content="FR Board Characters">
                        <li className={`${Board5Flag ? "filteractive": "filterinactive"} buffbutton board5button`} onClick={Board5button}></li>
                      </Tippy>
                      <Tippy content="Force Enhancement Characters">
                        <li className={`${FRBoardFlag ? "filteractive": "filterinactive"} buffbutton frboardbutton`} onClick={FRBoardFlagbutton}></li>
                      </Tippy>
                      <Tippy content="FR Weapon Characters">
                        <li className={`${FRFlag ? "filteractive": "filterinactive"} buffbutton frcharbutton`} onClick={FRFlagbutton}></li>
                      </Tippy>
                      <Tippy content="BT+ Weapon Characters">
                        <li className={`${BTPlusFlag ? "filteractive": "filterinactive"} buffbutton btpluscharbutton`} onClick={BTPlusFlagbutton}></li>
                      </Tippy>
                      <Tippy content="Active JP Reworks">
                        <li className={`${ActiveRework ? "filteractive": "filterinactive"} buffbutton reworkbutton`} onClick={ActiveReworkbutton}></li>
                      </Tippy>
                    </ul>
                    <div className="similarbanner">Sort</div>
                    <ul className="bufftypes">
                      <Tippy content="Realm">
                        <li className={`${RealmSort ? "filteractive": "filterinactive"} buffbutton RealmSortbutton`} onClick={RealmSortbutton}></li>
                      </Tippy>
                      <Tippy content="JP Release Order">
                        <li className={`${JPSort ? "filteractive": "filterinactive"} buffbutton JPSortbutton`} onClick={JPSortbutton}></li>
                      </Tippy>
                      <Tippy content="Name">
                        <li className={`${NameSort ? "filteractive": "filterinactive"} buffbutton NameSortbutton`} onClick={NameSortbutton}></li>
                      </Tippy>
                      <br/>
                      <Tippy content="HP Stat">
                        <li className={`${HPSort ? "filteractive": "filterinactive"} buffbutton HPSortbutton`} onClick={HPSortbutton}></li>
                      </Tippy>
                      <Tippy content="INT BRV Stat">
                        <li className={`${INTBRVSort ? "filteractive": "filterinactive"} buffbutton INTBRVSortbutton`} onClick={INTBRVSortbutton}></li>
                      </Tippy>
                      <Tippy content="MAX BRV Stat">
                        <li className={`${MAXBRVSort ? "filteractive": "filterinactive"} buffbutton MAXBRVSortbutton`} onClick={MAXBRVSortbutton}></li>
                      </Tippy>
                      <Tippy content="ATK Sort">
                        <li className={`${ATKSort ? "filteractive": "filterinactive"} buffbutton ATKSortbutton`} onClick={ATKSortbutton}></li>
                      </Tippy>
                      <Tippy content="DEF Stat">
                        <li className={`${DEFSort ? "filteractive": "filterinactive"} buffbutton DEFSortbutton`} onClick={DEFSortbutton}></li>
                      </Tippy>
                      <Tippy content="SPD Stat">
                        <li className={`${SPDSort ? "filteractive": "filterinactive"} buffbutton SPDSortbutton`} onClick={SPDSortbutton}></li>
                      </Tippy>
                    </ul>
                    <div className="similarbanner">Refine</div>
                    <div className="margeholder">
                    <div className="Merge">
                      <label className="MergeText">Merge Filters?</label>
                      <div key="mergecheck1" className={`${merge == true ? "nodisplay" :  `uncheck`}`} onClick={togglemerge}/>
                      <div key="mergecheck2" className={`${merge == true ? "check" :  `nodisplay`}`} onClick={togglemerge}/>
                    </div>
                    </div>
                    <div className="margeholder">
                    <div className="Merge">
                      <label className="MergeText">Spoilers?</label>
                      <div key="mergecheck1" className={`${spoilers == true ? "nodisplay" :  `uncheck`}`} onClick={spoilersbutton}/>
                      <div key="mergecheck2" className={`${spoilers == true ? "check" :  `nodisplay`}`} onClick={spoilersbutton}/>
                    </div>
                    </div>
                    <div className="typeholder">
                      <Select
                      defaultValue={Typesearch != "" ? {value: Typesearch, label: Typesearch } : null}
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
                      <IoSearch className="innersearchicon"/>
                        <input 
                            className="search-bar" 
                            type="text"
                            placeholder="Search Name"
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
                        <Link className="whitecolor" to={"/characters/ultimaweapon"}>
                        <span className="subtext">Ultima</span>
                        </Link> 
                        {" / "}
                        <Link className="whitecolor" to={"/characters/forcetime"}>
                        <span className="subtext">Force</span>
                        </Link> 
                        {" / "}
                        <Link className="whitecolor" to={"/characters/skin/wardrobe"}>
                        <span className="subtext">Skins page</span>
                        </Link> 
                </div>
                {showFilter == true ? "" :
                  <span>
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
                  </span> }
                <ul className="characterholder">
                  {chars.length == rawData.length ?
                  <div className="subtext">
                  {bannerdisplay}
                  </div> :
                  <div className="nonmatchheader">
                  {bannermatch}
                  </div>
                   }
                  <CharacterFiltering 
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

export default Characters;
