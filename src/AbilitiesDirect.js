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
import Character_Ability_Pars from './characterpages/direct/formatting/command_ability/Character_Ability_Pars';

import { setFalse, setTrue } from './redux/ducks/jptoggle'

const AbilitiesDirect =({
    ProcessedAbilities,

    ver,
    loc,
    file,

    enemy_type,
    cast_targets,
    passive_effects_data,
    char_id,
    passivenames,
    equipmentpassivenames,
    AilmentNames,
    CommandNames,
    CondData,
    Ailment_Effects,
    MessageData_Category,
    MessageData_FFSeries,
    command_data_effects,
    hit_data_effects,
    option_trans_data,
    
    ailment_group,
    command_group,
    enemy_resist,
    formatting,
}) => {

    const startinglimit = window.innerWidth <= 815 ? 15 : 30;

    const rawData = ProcessedAbilities;

    const banerDisplayTerm = "abilities";

    const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null  ? true : false);
    const [clearFilter, setclearFilter] = useStateIfMounted(false);
  
    const [BRV, setBRV] = useState(getQueryStringVal("BRV") != null  ? true : false);
    const [HP, setHP] = useState(getQueryStringVal("HP") != null  ? true : false)
    const [S1, setS1] = useState(getQueryStringVal("S1") != null  ? true : false);
    const [S2, setS2] = useState(getQueryStringVal("S2") != null  ? true : false);
    const [AA, setAA] = useState(getQueryStringVal("AA") != null  ? true : false);
    const [EX, setEX] = useState(getQueryStringVal("EX") != null  ? true : false);
    const [LD, setLD] = useState(getQueryStringVal("LD") != null  ? true : false);
    const [FR, setFR] = useState(getQueryStringVal("FR") != null  ? true : false);
    const [BT, setBT] = useState(getQueryStringVal("BT") != null  ? true : false);
    const [Call75, setCall75] = useState(getQueryStringVal("Call75") != null  ? true : false);
    const [CallLD, setCallLD] = useState(getQueryStringVal("CallLD") != null  ? true : false);
    const [Magic, setMagic] = useState(getQueryStringVal("Magic") != null  ? true : false);
    const [Ranged, setRanged] = useState(getQueryStringVal("Ranged") != null  ? true : false);
    const [Melee, setMelee] = useState(getQueryStringVal("Melee") != null  ? true : false);
    const [Fire, setFire] = useState(getQueryStringVal("Fire") != null  ? true : false);
    const [Thunder, setThunder] = useState(getQueryStringVal("Thunder") != null  ? true : false);
    const [Earth, setEarth] = useState(getQueryStringVal("Earth") != null  ? true : false);
    const [Water, setWater] = useState(getQueryStringVal("Water") != null  ? true : false);
    const [Ice, setIce] = useState(getQueryStringVal("Ice") != null  ? true : false);
    const [Wind, setWind] = useState(getQueryStringVal("Wind") != null  ? true : false);
    const [Holy, setHoly] = useState(getQueryStringVal("Holy") != null  ? true : false);
    const [Dark, setDark] = useState(getQueryStringVal("Dark") != null  ? true : false);

    const [Group, setGroup] = useState(getQueryStringVal("Group") != null  ? true : false);
    const [Trap, setTrap] = useState(getQueryStringVal("Trap") != null  ? true : false);
    const [FollowUp, setFollowUp] = useState(getQueryStringVal("FollowUp") != null  ? true : false);
    const [Counter, setCounter] = useState(getQueryStringVal("Counter") != null  ? true : false);
    const [KnockBack, setKnockBack] = useState(getQueryStringVal("KnockBack") != null  ? true : false);
    const [Break, setBreak] = useState(getQueryStringVal("Break")!=null ? true : false)
    const [BreakCancel, setBreakCancel] = useState(getQueryStringVal("BreakCancel")!=null ? true : false)
    const [IgnoreDEF, setIgnoreDEF] = useState(getQueryStringVal("IgnoreDEF")!=null ? true : false)
    const [Cleanse, setCleanse] = useState(getQueryStringVal("Cleanse")!=null ? true : false)
    const [Delay, setDelay] = useState(getQueryStringVal("Delay")!=null ? true : false)
    const [Delay3, setDelay3] = useState(getQueryStringVal("Delay3")!=null ? true : false)
    const [Delete, setDelete] = useState(getQueryStringVal("Delete")!=null ? true : false)
    const [Dispel, setDispel] = useState(getQueryStringVal("Dispel")!=null ? true : false)
    const [Heals, setHeals] = useState(getQueryStringVal("Heals")!=null ? true : false)
    const [Revive, setRevive] = useState(getQueryStringVal("Revive")!=null ? true : false)
    const [Increase, setIncrease] = useState(getQueryStringVal("Increase")!=null ? true : false)
    const [Increase2, setIncrease2] = useState(getQueryStringVal("Increase2")!=null ? true : false)
    const [Instant, setInstant] = useState(getQueryStringVal("Instant")!=null ? true : false)
    const [Turn_Manipulator, setTurn_Manipulator] = useState(getQueryStringVal("Turn_Manipulator")!=null ? true : false)
    const [Battery,setBattery]= useState(getQueryStringVal("Battery")!=null ? true : false)
    const [Buff_Extension, setBuff_Extension]= useState(getQueryStringVal("Buff_Extension")!=null ? true : false)
    const [Free, setFree] = useState(getQueryStringVal("Free")!=null ? true : false)
    const [Self_Harm, setSelf_Harm] = useState(getQueryStringVal("Self_Harm")!=null ? true : false)

    const [loop, setLoop] = useStateIfMounted(false);
    const [reverse, setReverse] = useState(getQueryStringVal("rev") != null  ? true : false);
    const [merge, setmerge] = useState(getQueryStringVal("merge") != null  ? true : false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchdisplay, setsearchdisplay] = useState("");
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

    const [BRVsearch, setBRVsearch] = useQueryParam("BRV", "");
    const [HPsearch, setHPsearch] = useQueryParam("HP", "");
    const [S1search, setS1search] = useQueryParam("S1", "");
    const [S2search, setS2search] = useQueryParam("S2", "");
    const [AAsearch, setAAsearch] = useQueryParam("AA", "");
    const [EXsearch, setEXsearch] = useQueryParam("EX", "");
    const [LDsearch, setLDsearch] = useQueryParam("LD", "");
    const [FRsearch, setFRsearch] = useQueryParam("FR", "");
    const [BTsearch, setBTsearch] = useQueryParam("BT", "");
    const [Call75search, setCall75search] = useQueryParam("Call75", "");
    const [CallLDsearch, setCallLDsearch] = useQueryParam("CallLD", "");
    const [Magicsearch, setMagicsearch] = useQueryParam("Magic", "");
    const [Rangedsearch, setRangedsearch] = useQueryParam("Magic", "");
    const [Meleesearch, setMeleesearch] = useQueryParam("Melee", "");
    const [Firesearch, setFiresearch] = useQueryParam("Fire", "");
    const [Thundersearch, setThundersearch] = useQueryParam("Thunder", "");
    const [Earthsearch, setEarthsearch] = useQueryParam("Earth", "");
    const [Watersearch, setWatersearch] = useQueryParam("Water", "");
    const [Icesearch, setIcesearch] = useQueryParam("Ice", "");
    const [Windsearch, setWindsearch] = useQueryParam("Wind", "");
    const [Holysearch, setHolysearch] = useQueryParam("Holy", "");
    const [Darksearch, setDarksearch] = useQueryParam("Dark", "");

    const [Groupsearch, setGroupsearch] = useQueryParam("Group", "")
    const [Trapsearch, setTrapsearch] = useQueryParam("Trap", "")
    const [FollowUpsearch, setFollowUpsearch] = useQueryParam("FollowUp", "")
    const [Countersearch, setCountersearch] = useQueryParam("Counter", "")
    const [KnockBacksearch, setKnockBacksearch] = useQueryParam("KnockBack", "")
    const [Breaksearch, setBreaksearch] = useQueryParam("Break", "")
    const [BreakCancelsearch, setBreakCancelsearch] = useQueryParam("BreakCancel", "")
    const [IgnoreDEFsearch, setIgnoreDEFsearch] = useQueryParam("IgnoreDEF", "")
    const [Cleansesearch, setCleansesearch] = useQueryParam("Cleanse", "")
    const [Delaysearch, setDelaysearch] = useQueryParam("Delay", "")
    const [Delay3search, setDelay3search] = useQueryParam("Delay3", "")
    const [Deletesearch, setDeletesearch] = useQueryParam("Delete", "")
    const [Dispelsearch, setDispelsearch] = useQueryParam("Dispel", "")
    const [Healssearch, setHealssearch] = useQueryParam("Heals", "")
    const [Revivesearch, setRevivesearch] = useQueryParam("Revive", "")
    const [Increasesearch, setIncreasesearch] = useQueryParam("Increase", "")
    const [Increase2search, setIncrease2search] = useQueryParam("Increase2", "")
    const [Instantsearch, setInstantsearch] = useQueryParam("Instant", "")
    const [Turn_Manipulatorsearch, setTurn_Manipulatorsearch] = useQueryParam("Turn_Manipulator", "")
    const [Batterysearch,setBatterysearch] = useQueryParam("Battery", "")
    const [Buff_Extensionsearch,setBuff_Extensionsearch]= useQueryParam("Buff_Extension", "")
    const [Freesearch, setFreesearch] = useQueryParam("Free", "")
    const [Self_Harmsearch, setSelf_Harmsearch] = useQueryParam("Self_Harm", "")

    const [mergesearch, setmergesearch] = useQueryParam("merge", "");
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
         const filteredtype = ProcessedAbilities.filter(self=>self.charaID == match_id)
         if(filteredtype.length != 0){
           setTypesearch(getQueryStringVal("Char"))
           setCondFilter(filteredtype[0].charaID)
         } else{
           setTypesearch("")
           setCondFilter("")
         }
       }
     },[setCondFilter,ProcessedAbilities,Typesearch,setTypesearch,char_id])

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
        if(BRV == true){
            const filteredout = rawData.filter(
                ability=> ability.BRV == true
            )
            filterholder.push(...filteredout)
        }
        if(HP == true){
            const filteredout = rawData.filter(
                ability=> ability.HP == true
            )
            filterholder.push(...filteredout)
        }
        if(S1 == true){
            const filteredout = rawData.filter(
                ability=> ability.S1 == true
            )
            filterholder.push(...filteredout)
        }
        if(S2 == true){
            const filteredout = rawData.filter(
                ability=> ability.S2 == true
            )
            filterholder.push(...filteredout)
        }
        if(AA == true){
            const filteredout = rawData.filter(
                ability=> ability.AA == true
            )
            filterholder.push(...filteredout)
        }
        if(EX == true){
            const filteredout = rawData.filter(
                ability=> ability.EX == true
            )
            filterholder.push(...filteredout)
        }
        if(LD == true){
            const filteredout = rawData.filter(
                ability=> ability.LD == true
            )
            filterholder.push(...filteredout)
        }
        if(Call75 == true){
            const filteredout = rawData.filter(
                ability=> ability.Call75 == true
            )
            filterholder.push(...filteredout)
        }
        if(CallLD == true){
            const filteredout = rawData.filter(
                ability=> ability.CallLD == true
            )
            filterholder.push(...filteredout)
        }
        if(FR == true){
            const filteredout = rawData.filter(
                ability=> ability.FR == true
            )
            filterholder.push(...filteredout)
        }
        if(BT == true){
            const filteredout = rawData.filter(
                ability=> ability.BT == true
            )
            filterholder.push(...filteredout)
        }
        if(Magic == true){
            const filteredout = rawData.filter(
                ability=> ability.Magic == true
            )
            filterholder.push(...filteredout)
        }
        if(Melee == true){
            const filteredout = rawData.filter(
                ability=> ability.Melee == true
            )
            filterholder.push(...filteredout)
        }
        if(Ranged == true){
            const filteredout = rawData.filter(
                ability=> ability.Ranged == true
            )
            filterholder.push(...filteredout)
        }
        if(Fire == true){
            const filteredout = rawData.filter(
                ability=> ability.Fire == true
            )
            filterholder.push(...filteredout)
        }
        if(Ice == true){
            const filteredout = rawData.filter(
                ability=> ability.Ice == true
            )
            filterholder.push(...filteredout)
        }
        if(Thunder == true){
            const filteredout = rawData.filter(
                ability=> ability.Thunder == true
            )
            filterholder.push(...filteredout)
        }
        if(Earth == true){
            const filteredout = rawData.filter(
                ability=> ability.Earth == true
            )
            filterholder.push(...filteredout)
        }
        if(Water == true){
            const filteredout = rawData.filter(
                ability=> ability.Water == true
            )
            filterholder.push(...filteredout)
        }
        if(Wind == true){
            const filteredout = rawData.filter(
                ability=> ability.Wind == true
            )
            filterholder.push(...filteredout)
        }
        if(Holy == true){
            const filteredout = rawData.filter(
                ability=> ability.Holy == true
            )
            filterholder.push(...filteredout)
        }
        if(Dark == true){
            const filteredout = rawData.filter(
                ability=> ability.Dark == true
            )
            filterholder.push(...filteredout)
        }
        if(Group == true){
            const filteredout = rawData.filter(
                ability=> ability.Group == true
            )
            filterholder.push(...filteredout)
        }
        if(Trap == true){
            const filteredout = rawData.filter(
                ability=> ability.Trap == true
            )
            filterholder.push(...filteredout)
        }
        if(FollowUp == true){
            const filteredout = rawData.filter(
                ability=> ability.FollowUp == true
            )
            filterholder.push(...filteredout)
        }
        if(Counter == true){
            const filteredout = rawData.filter(
                ability=> ability.Counter == true
            )
            filterholder.push(...filteredout)
        }
        if(KnockBack == true){
            const filteredout = rawData.filter(
                ability=> ability.Launcher == true
            )
            filterholder.push(...filteredout)
        }
        if(Break == true){
            const filteredout = rawData.filter(
                ability=> ability.Force_Break == true
            )
            filterholder.push(...filteredout)
        }
        if(BreakCancel == true){
            const filteredout = rawData.filter(
                ability=> ability.Break_Reset == true
            )
            filterholder.push(...filteredout)
        }
        if(IgnoreDEF == true){
            const filteredout = rawData.filter(
                ability=> ability.Ignore_DEF == true
            )
            filterholder.push(...filteredout)
        }
        if(Cleanse == true){
            const filteredout = rawData.filter(
                ability=> ability.Cleanse == true
            )
            filterholder.push(...filteredout)
        }
        if(Delay == true){
            const filteredout = rawData.filter(
                ability=> ability.Delay == true
            )
            filterholder.push(...filteredout)
        }
        if(Delay3 == true){
            const filteredout = rawData.filter(
                ability=> ability.Three_Delay == true
            )
            filterholder.push(...filteredout)
        }
        if(Delete == true){
            const filteredout = rawData.filter(
                ability=> ability.Delete_Turns == true
            )
            filterholder.push(...filteredout)
        }
        if(Dispel == true){
            const filteredout = rawData.filter(
                ability=> ability.Dispel == true
            )
            filterholder.push(...filteredout)
        }
        if(Heals == true){
            const filteredout = rawData.filter(
                ability=> ability.HP_Heal_Ability == true
            )
            filterholder.push(...filteredout)
        }
        if(Revive == true){
            const filteredout = rawData.filter(
                ability=> ability.Revive == true
            )
            filterholder.push(...filteredout)
        }
        if(Increase == true){
            const filteredout = rawData.filter(
                ability=> ability.Increase == true
            )
            filterholder.push(...filteredout)
        }
        if(Increase2 == true){
            const filteredout = rawData.filter(
                ability=> ability.Two_Abilities_Recover == true
            )
            filterholder.push(...filteredout)
        }
        if(Turn_Manipulator == true){
            const filteredout = rawData.filter(
                ability=> ability.Turn_Manipulator == true 
            )
            filterholder.push(...filteredout)
        }
        if(Instant == true){
            const filteredout = rawData.filter(
                ability=> ability.Instant == true
            )
            filterholder.push(...filteredout)
        }
        if(Free == true){
            const filteredout = rawData.filter(
                ability=> ability.Free_Ability == true
            )
            filterholder.push(...filteredout)
        }
        if(Battery == true){
            const filteredout = rawData.filter(
                ability=> ability.Battery == true
            )
            filterholder.push(...filteredout)
        }
        if(Buff_Extension == true){
            const filteredout = rawData.filter(
                ability=> ability.Buff_Extension == true
            )
            filterholder.push(...filteredout)
        }
        if(Self_Harm == true){
            const filteredout = rawData.filter(
                ability=> ability.Self_Harm == true
            )
            filterholder.push(...filteredout)
        }

        if (filterholder.length === 0) {
            filterholder.push(...rawData);
        }

        if(condFilter != ""){
            filterholder = filterholder.filter(
                (ef)=> ef.charaID == condFilter
            );
        }

        const makeUnique = filterholder
            .filter(onlyUnique)
            .sort((a, b) => 
            reverse === false ?
            a.order - b.order:
            b.order - a.order
            );
            const searchit = searchTerm == "" ? makeUnique : makeUnique.filter((ability) =>
            (`${ability.command && ability.command.name} ${ability.command && ability.command.jpname} ${ability.command && ability.command.glname} - #${ability.LearningAbility}`).toLowerCase().includes(searchTerm)
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
    },[rawData,merge,limits,condFilter,reverse,searchTerm,AA, BRV, BT, Delay3,Self_Harm, Break,Buff_Extension, Increase2, BreakCancel,Battery, Call75, CallLD, Cleanse, Turn_Manipulator, Counter, Dark, Delay, Delete, Dispel, EX, Earth, FR, Fire, FollowUp, Free, Group, HP, Heals, Holy, Ice, IgnoreDEF, Increase, Instant, KnockBack, LD, Magic, Melee, Ranged, Revive, S1, S2, Thunder, Trap, Water, Wind])

    //filter merge
    useEffect(() => {
        if(merge == true){
            const filterholder = [];
            const charType = {
                charaID: condFilter != "" ? condFilter: undefined,
                BRV: BRV,
                HP: HP,
                S1: S1,
                S2: S2,
                AA: AA,
                EX: EX,
                LD: LD,
                Call75: Call75,
                CallLD: CallLD,
                FR: FR,
                BT: BT,
                Magic: Magic,
                Melee: Melee,
                Ranged: Ranged,
                Fire: Fire,
                Ice: Ice,
                Thunder: Thunder,
                Earth: Earth,
                Water: Water,
                Wind: Wind,
                Holy: Holy,
                Dark: Dark,
                Group: Group,
                Trap: Trap,
                FollowUp: FollowUp,
                Counter: Counter,
                Launcher: KnockBack,
                Force_Break: Break,
                Break_Reset: BreakCancel,
                Ignore_DEF: IgnoreDEF,
                Cleanse: Cleanse,
                Delay: Delay,
                Three_Delay: Delay3,
                Delete_Turns: Delete,
                Dispel: Dispel,
                HP_Heal_Ability: Heals,
                Revive: Revive,
                Increase: Increase,
                Two_Abilities_Recover: Increase2,
                Turn_Manipulator: Turn_Manipulator,
                Instant: Instant,
                Free_Ability: Free,
                Buff_Extension: Buff_Extension,
                Battery: Battery,
                Self_Harm: Self_Harm
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
            const searchit = searchTerm == "" ? makeUnique : makeUnique.filter((ability) =>
            (`${ability.command && ability.command.name} ${ability.command && ability.command.jpname} ${ability.command && ability.command.glname} - #${ability.LearningAbility}`).toLowerCase().includes(searchTerm)
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
    },[rawData,merge,limits,condFilter,reverse,searchTerm,AA, BRV, BT,Self_Harm, Break,Buff_Extension, Delay3,Battery, BreakCancel, Turn_Manipulator, Increase2, Call75, CallLD, Cleanse, Counter, Dark, Delay, Delete, Dispel, EX, Earth, FR, Fire, FollowUp, Free, Group, HP, Heals, Holy, Ice, IgnoreDEF, Increase, Instant, KnockBack, LD, Magic, Melee, Ranged, Revive, S1, S2, Thunder, Trap, Water, Wind])

    //buttons
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
          setmergesearch("true")
        } else{
          setmergesearch("")
        }
        setmerge((prevValue) => !prevValue);
      }

    const BRVbutton =()=>{
        if(BRV == false){
            setBRVsearch("true")
        } else {
            setBRVsearch("")
        }
        setBRV((prevValue) => !prevValue);
    }
    const Batterybutton =()=>{
        if(Battery == false){
            setBatterysearch("true")
        } else {
            setBatterysearch("")
        }
        setBattery((prevValue) => !prevValue);
    }
    const Self_Harmbutton =()=>{
        if(Self_Harm == false){
            setSelf_Harmsearch("true")
        } else {
            setSelf_Harmsearch("")
        }
        setSelf_Harm((prevValue) => !prevValue);
    }
    const Buff_Extensionbutton=()=>{
        if(Buff_Extension == false){
            setBuff_Extensionsearch("true")
        } else {
            setBuff_Extensionsearch("")
        }
        setBuff_Extension((prevValue) => !prevValue);
    }
    const HPbutton =()=>{
        if(HP == false){
            setHPsearch("true")
        } else {
            setHPsearch("")
        }
        setHP((prevValue) => !prevValue);
    }
    const S1button =()=>{
        if(S1 == false){
            setS1search("true")
        } else {
            setS1search("")
        }
        setS1((prevValue) => !prevValue);
    }
    const S2button =()=>{
        if(S2 == false){
            setS2search("true")
        } else {
            setS2search("")
        }
        setS2((prevValue) => !prevValue);
    }
    const AAbutton =()=>{
        if(AA == false){
            setAAsearch("true")
        } else {
            setAAsearch("")
        }
        setAA((prevValue) => !prevValue);
    }
    const EXbutton =()=>{
        if(EX == false){
            setEXsearch("true")
        } else {
            setEXsearch("")
        }
        setEX((prevValue) => !prevValue);
    }
    const LDbutton =()=>{
        if(LD == false){
            setLDsearch("true")
        } else {
            setLDsearch("")
        }
        setLD((prevValue) => !prevValue);
    }
    const Call75button =()=>{
        if(Call75 == false){
            setCall75search("true")
        } else {
            setCall75search("")
        }
        setCall75((prevValue) => !prevValue);
    }
    const CallLDbutton =()=>{
        if(CallLD == false){
            setCallLDsearch("true")
        } else {
            setCallLDsearch("")
        }
        setCallLD((prevValue) => !prevValue);
    }
    const FRbutton =()=>{
        if(FR == false){
            setFRsearch("true")
        } else {
            setFRsearch("")
        }
        setFR((prevValue) => !prevValue);
    }
    const BTbutton =()=>{
        if(BT == false){
            setBTsearch("true")
        } else {
            setBTsearch("")
        }
        setBT((prevValue) => !prevValue);
    }
    const Magicbutton =()=>{
        if(Magic == false){
            setMagicsearch("true")
        } else {
            setMagicsearch("")
        }
        setMagic((prevValue) => !prevValue);
    }
    const Meleebutton =()=>{
        if(Melee == false){
            setMeleesearch("true")
        } else {
            setMeleesearch("")
        }
        setMelee((prevValue) => !prevValue);
    }
    const Rangedbutton =()=>{
        if(Ranged == false){
            setRangedsearch("true")
        } else {
            setRangedsearch("")
        }
        setRanged((prevValue) => !prevValue);
    }
    const Firebutton =()=>{
        if(Fire == false){
            setFiresearch("true")
        } else {
            setFiresearch("")
        }
        setFire((prevValue) => !prevValue);
    }
    const Icebutton =()=>{
        if(Ice == false){
            setIcesearch("true")
        } else {
            setIcesearch("")
        }
        setIce((prevValue) => !prevValue);
    }
    const Thunderbutton =()=>{
        if(Thunder == false){
            setThundersearch("true")
        } else {
            setThundersearch("")
        }
        setThunder((prevValue) => !prevValue);
    }
    const Earthbutton =()=>{
        if(Earth == false){
            setEarthsearch("true")
        } else {
            setEarthsearch("")
        }
        setEarth((prevValue) => !prevValue);
    }
    const Waterbutton =()=>{
        if(Water == false){
            setWatersearch("true")
        } else {
            setWatersearch("")
        }
        setWater((prevValue) => !prevValue);
    }
    const Windbutton =()=>{
        if(Wind == false){
            setWindsearch("true")
        } else {
            setWindsearch("")
        }
        setWind((prevValue) => !prevValue);
    }
    const Holybutton =()=>{
        if(Holy == false){
            setHolysearch("true")
        } else {
            setHolysearch("")
        }
        setHoly((prevValue) => !prevValue);
    }
    const Darkbutton =()=>{
        if(Dark == false){
            setDarksearch("true")
        } else {
            setDarksearch("")
        }
        setDark((prevValue) => !prevValue);
    }
    const Groupbutton =()=>{
        if(Group == false){
            setGroupsearch("true")
        } else {
            setGroupsearch("")
        }
        setGroup((prevValue) => !prevValue);
    }
    const Trapbutton =()=>{
        if(Trap == false){
            setTrapsearch("true")
        } else {
            setTrapsearch("")
        }
        setTrap((prevValue) => !prevValue);
    }
    const FollowUpbutton =()=>{
        if(FollowUp == false){
            setFollowUpsearch("true")
        } else {
            setFollowUpsearch("")
        }
        setFollowUp((prevValue) => !prevValue);
    }
    const Counterbutton =()=>{
        if(Counter == false){
            setCountersearch("true")
        } else {
            setCountersearch("")
        }
        setCounter((prevValue) => !prevValue);
    }
    const KnockBackbutton =()=>{
        if(KnockBack == false){
            setKnockBacksearch("true")
        } else {
            setKnockBacksearch("")
        }
        setKnockBack((prevValue) => !prevValue);
    }
    const Breakbutton =()=>{
        if(Break == false){
            setBreaksearch("true")
        } else {
            setBreaksearch("")
        }
        setBreak((prevValue) => !prevValue);
    }
    const BreakCancelbutton =()=>{
        if(BreakCancel == false){
            setBreakCancelsearch("true")
        } else {
            setBreakCancelsearch("")
        }
        setBreakCancel((prevValue) => !prevValue);
    }
    const IgnoreDEFbutton =()=>{
        if(IgnoreDEF == false){
            setIgnoreDEFsearch("true")
        } else {
            setIgnoreDEFsearch("")
        }
        setIgnoreDEF((prevValue) => !prevValue);
    }
    const Cleansebutton =()=>{
        if(Cleanse == false){
            setCleansesearch("true")
        } else {
            setCleansesearch("")
        }
        setCleanse((prevValue) => !prevValue);
    }
    const Delaybutton =()=>{
        if(Delay == false){
            setDelaysearch("true")
        } else {
            setDelaysearch("")
        }
        setDelay((prevValue) => !prevValue);
    }
    const Delay3button =()=>{
        if(Delay3 == false){
            setDelay3search("true")
        } else {
            setDelay3search("")
        }
        setDelay3((prevValue) => !prevValue);
    }
    const Turn_Manipulatorbutton =()=>{
        if(Turn_Manipulator == false){
            setTurn_Manipulatorsearch("true")
        } else {
            setTurn_Manipulatorsearch("")
        }
        setTurn_Manipulator((prevValue) => !prevValue);
    }
    const Deletebutton =()=>{
        if(Delete == false){
            setDeletesearch("true")
        } else {
            setDeletesearch("")
        }
        setDelete((prevValue) => !prevValue);
    }
    const Dispelbutton =()=>{
        if(Dispel == false){
            setDispelsearch("true")
        } else {
            setDispelsearch("")
        }
        setDispel((prevValue) => !prevValue);
    }
    const Healsbutton =()=>{
        if(Heals == false){
            setHealssearch("true")
        } else {
            setHealssearch("")
        }
        setHeals((prevValue) => !prevValue);
    }
    const Revivebutton =()=>{
        if(Revive == false){
            setRevivesearch("true")
        } else {
            setRevivesearch("")
        }
        setRevive((prevValue) => !prevValue);
    }
    const Increasebutton =()=>{
        if(Increase == false){
            setIncreasesearch("true")
        } else {
            setIncreasesearch("")
        }
        setIncrease((prevValue) => !prevValue);
    }
    const Increase2button =()=>{
        if(Increase2 == false){
            setIncrease2search("true")
        } else {
            setIncrease2search("")
        }
        setIncrease2((prevValue) => !prevValue);
    }
    const Instantbutton =()=>{
        if(Instant == false){
            setInstantsearch("true")
        } else {
            setInstantsearch("")
        }
        setInstant((prevValue) => !prevValue);
    }
    const Freebutton =()=>{
        if(Free == false){
            setFreesearch("true")
        } else {
            setFreesearch("")
        }
        setFree((prevValue) => !prevValue);
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
        setmerge(false)
        setmergesearch("")
        setTypesearch("")

        setBRV(false)
        setHP(false)
        setS1(false)
        setS2(false)
        setAA(false)
        setEX(false)
        setLD(false)
        setCall75(false)
        setCallLD(false)
        setFR(false)
        setBT(false)
        setMagic(false)
        setMelee(false)
        setRanged(false)
        setFire(false)
        setIce(false)
        setThunder(false)
        setEarth(false)
        setWater(false)
        setWind(false)
        setHoly(false)
        setDark(false)
        setGroup(false)
        setTrap(false)
        setFollowUp(false)
        setCounter(false)
        setKnockBack(false)
        setBreak(false)
        setBreakCancel(false)
        setIgnoreDEF(false)
        setCleanse(false)
        setDelay(false)
        setDelay3(false)
        setDelete(false)
        setDispel(false)
        setHeals(false)
        setRevive(false)
        setIncrease(false)
        setIncrease2(false)
        setTurn_Manipulator(false)
        setInstant(false)
        setFree(false)
        setBattery(false)
        setBuff_Extension(false)
        setSelf_Harm(false)

        setBRVsearch("")
        setHPsearch("")
        setS1search("")
        setS2search("")
        setAAsearch("")
        setEXsearch("")
        setLDsearch("")
        setCall75search("")
        setCallLDsearch("")
        setFRsearch("")
        setBTsearch("")
        setMagicsearch("")
        setMeleesearch("")
        setRangedsearch("")
        setFiresearch("")
        setIcesearch("")
        setThundersearch("")
        setEarthsearch("")
        setWatersearch("")
        setWindsearch("")
        setHolysearch("")
        setDarksearch("")
        setGroupsearch("")
        setTrapsearch("")
        setFollowUpsearch("")
        setCountersearch("")
        setKnockBacksearch("")
        setBreaksearch("")
        setBreakCancelsearch("")
        setIgnoreDEFsearch("")
        setCleansesearch("")
        setDelaysearch("")
        setDelay3search("")
        setDeletesearch("")
        setDispelsearch("")
        setHealssearch("")
        setRevivesearch("")
        setIncreasesearch("")
        setIncrease2search("")
        setTurn_Manipulatorsearch("")
        setBuff_Extensionsearch("")
        setInstantsearch("")
        setFreesearch("")
        setBatterysearch("")
        setSelf_Harmsearch("")

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

    const listAbility = listDisplay;

    const type_ = command_data_effects.type_
    const attack_type_ = command_data_effects.attack_type_
    const target_range_ = command_data_effects.target_range_
    const target_type_ = command_data_effects.target_type_
    const auto_target_type_ = command_data_effects.auto_target_type_
    const killer_cond = command_data_effects.killer_cond
    const killer_cond_1 = command_data_effects.killer_cond_1
    const killer_type = command_data_effects.killer_type
    const cast_target = command_data_effects.cast_target
    const ailment_cond = command_data_effects.ailment_cond
    const ailment_cond_14 = command_data_effects.ailment_cond_14
    const command_type = command_data_effects.command_type

    const option_labels = option_trans_data.option_labels
    const option_type_ = option_trans_data.option_type_
    const options_target = option_trans_data.target

    const hit_effect_id = hit_data_effects.hit_effect_id
    const ability_target_id = hit_data_effects.ability_target_id
    const type_id = hit_data_effects.type_id
    const attack_type_id = hit_data_effects.attack_type_id
    const effect_value_type_id = hit_data_effects.effect_value_type_id
    const element_bit_ = hit_data_effects.element_bit_

    const dispatch = useDispatch();

    const jptoggledata = useSelector((state) => 
        state.toggle.toggle
        );

    const [jponly, setJPonly] = useState(jptoggledata);
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

    },[setJPSearch,dispatch])

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
          <title>Abilities - Dissidia Compendium</title>
          <meta property="og:site_name" content="Dissidia Compendium"/>
          <meta property="og:type" content="website" />
          <meta name="description" content="Abilities Search"/>
          <meta name="twitter:title" content="Abilities Search"/>
          <meta name="twitter:description" content="Abilities Search"/>
          <meta property="og:title" content="Abilities Search"/>
          <meta property="og:description" content="Abilities Search"/>
          <meta property="og:url" content="https://dissidiacompendium.com/search/abilities"/>
        </Helmet>
            <div className="content">
              <h1>{`${jptoggledata == false ? "GL" : "JP"} Abilities`}</h1>
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
                  <ul className="refineabilities">
                    <Tippy content="Burst Attacks">
                    <li className={`${BT ? "filteractive": "filterinactive"} buffbutton wpbtbutton`} onClick={BTbutton}></li>
                    </Tippy>
                    <Tippy content="FR Attacks">
                    <li className={`${FR ? "filteractive": "filterinactive"} buffbutton wpfrbutton`} onClick={FRbutton}></li>
                    </Tippy>
                    <Tippy content="Crystal Lv75 Call Attacks">
                    <li className={`${Call75 ? "filteractive": "filterinactive"} buffbutton call1button`} onClick={Call75button}></li>
                    </Tippy>
                    <Tippy content="LD Call Attacks">
                    <li className={`${CallLD ? "filteractive": "filterinactive"} buffbutton call2button`} onClick={CallLDbutton}></li>
                    </Tippy>
                    <Tippy content="LD Attacks">
                    <li className={`${LD ? "filteractive": "filterinactive"} buffbutton wpldbutton`} onClick={LDbutton}></li>
                    </Tippy>
                    <Tippy content="EX Attacks">
                    <li className={`${EX ? "filteractive": "filterinactive"} buffbutton  wpexbutton`} onClick={EXbutton}></li>
                    </Tippy>
                    <Tippy content="AA Attacks">
                    <li className={`${AA ? "filteractive": "filterinactive"} buffbutton abuffButton`} onClick={AAbutton}></li>
                    </Tippy>
                    <Tippy content="Crystal Lv20 Attacks">
                    <li className={`${S2 ? "filteractive": "filterinactive"} buffbutton cl20button`} onClick={S2button}></li>
                    </Tippy>
                    <Tippy content="Starting Attacks">
                    <li className={`${S1 ? "filteractive": "filterinactive"} buffbutton startingButton`} onClick={S1button}></li>
                    </Tippy>
                    <Tippy content="HP Attacks">
                    <li className={`${HP ? "filteractive": "filterinactive"} buffbutton hpplusattackiconbutton`} onClick={HPbutton}></li>
                    </Tippy>
                    <Tippy content="BRV Attacks">
                    <li className={`${BRV ? "filteractive": "filterinactive"} buffbutton brvattackiconbutton`} onClick={BRVbutton}></li>
                    </Tippy>
                </ul>  
                <div className="similarbanner">Damage Type</div>
                <ul className="bufftypes">
                    <Tippy content="Magic BRV Damage">
                    <li className={`${Magic ? "filteractive": "filterinactive"} buffbutton magictypebutton`} onClick={Magicbutton}></li> 
                    </Tippy>
                    <Tippy content="Melee BRV Damage">
                    <li className={`${Melee ? "filteractive": "filterinactive"} buffbutton meleetypebutton`} onClick={Meleebutton}></li>
                    </Tippy>
                    <Tippy content="Ranged BRV Damage">
                    <li className={`${Ranged ? "filteractive": "filterinactive"} buffbutton rangedtypebutton`} onClick={Rangedbutton}></li>
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
                    <Tippy content="Earth BRV Damage">
                    <li className={`${Earth ? "filteractive": "filterinactive"} spheresbutton Earthbutton`} onClick={Earthbutton}></li>
                    </Tippy>
                    <Tippy content="Water BRV Damage">
                    <li className={`${Water ? "filteractive": "filterinactive"} spheresbutton Waterbutton`} onClick={Waterbutton}></li>   
                    </Tippy>
                    <Tippy content="Wind BRV Damage">
                    <li className={`${Wind ? "filteractive": "filterinactive"} spheresbutton Windbutton`} onClick={Windbutton}></li>
                    </Tippy>
                    <Tippy content="Holy BRV Damage">
                    <li className={`${Holy ? "filteractive": "filterinactive"} spheresbutton Holybutton`} onClick={Holybutton}></li>
                    </Tippy>
                    <Tippy content="Dark BRV Damage">
                    <li className={`${Dark ? "filteractive": "filterinactive"} spheresbutton Darkbutton`} onClick={Darkbutton}></li>
                    </Tippy>
                </ul>
                <br/>
                <ul className='characterclasses'>
                    <Tippy content={"Trap Attacks"}>
                        <li className={`${Trap ? "filteractive" :"filterinactive" } buffbutton traptypebutton`} onClick={Trapbutton}/>
                    </Tippy>
                    <Tippy content="Follow Up">
                        <li className={`${FollowUp? "filteractive":"filterinactive"} buffbutton followuptypebutton`} onClick={FollowUpbutton}/>
                    </Tippy>
                    <Tippy content="Counter">
                        <li className={`${Counter? "filteractive":"filterinactive"} buffbutton countertypebutton`} onClick={Counterbutton}/>
                    </Tippy>
                </ul>  
                <div className="similarbanner">Advanced</div>
                <ul className='characterclasses'>
                    <Tippy content={"Group Attacks"}>
                        <li className={`${Group ? "filteractive" :"filterinactive" } buffbutton aoetypebutton`} onClick={Groupbutton}/>
                    </Tippy>
                    <Tippy content="HP Heal">
                        <li className={`${Heals? "filteractive":"filterinactive"} buffbutton Healsbutton`} onClick={Healsbutton}/>
                    </Tippy>
                    <Tippy content="Party BRV Battery">
                        <li className={`${Battery? "filteractive":"filterinactive"} buffbutton BatteryGearbutton`} onClick={Batterybutton}/>
                    </Tippy>
                    <Tippy content="Knock Back">
                        <li className={`${KnockBack? "filteractive":"filterinactive"} buffbutton knockbackbutton`} onClick={KnockBackbutton}/>
                    </Tippy>
                    <Tippy content="Instant Turn Rate">
                        <li className={`${Instant? "filteractive":"filterinactive"} buffbutton Instantbutton`} onClick={Instantbutton}/>
                    </Tippy>
                    <Tippy content="Force BREAK">
                        <li className={`${Break? "filteractive":"filterinactive"} buffbutton Breakbutton`} onClick={Breakbutton}/>
                    </Tippy>
                    <Tippy content="BREAK Cancel">
                        <li className={`${BreakCancel? "filteractive":"filterinactive"} buffbutton BreakCancelbutton`} onClick={BreakCancelbutton}/>
                    </Tippy>
                    <Tippy content="Ignore DEF">
                        <li className={`${IgnoreDEF? "filteractive":"filterinactive"} buffbutton IgnoreDEFbutton`} onClick={IgnoreDEFbutton}/>
                    </Tippy>
                    <Tippy content="Debuff Cleanse">
                        <li className={`${Cleanse? "filteractive":"filterinactive"} buffbutton Cleansebutton`} onClick={Cleansebutton}/>
                    </Tippy>
                    <Tippy content="Dispel Debuffs">
                        <li className={`${Dispel? "filteractive":"filterinactive"} buffbutton Dispelbutton`} onClick={Dispelbutton}/>
                    </Tippy>
                    <Tippy content="Turn Delay">
                        <li className={`${Delay? "filteractive":"filterinactive"} buffbutton Delaybutton`} onClick={Delaybutton}/>
                    </Tippy>
                    <Tippy content="3 Turn Delay">
                        <li className={`${Delay3? "filteractive":"filterinactive"} buffbutton Delay3button`} onClick={Delay3button}/>
                    </Tippy>
                    <Tippy content="Turn Delete">
                        <li className={`${Delete? "filteractive":"filterinactive"} buffbutton Deletebutton`} onClick={Deletebutton}/>
                    </Tippy>
                    <Tippy content="Turn Manipulation">
                        <li className={`${Turn_Manipulator? "filteractive":"filterinactive"} buffbutton Turn_Manipulator`} onClick={Turn_Manipulatorbutton}/>
                    </Tippy>
                    <Tippy content="Revive">
                        <li className={`${Revive? "filteractive":"filterinactive"} buffbutton Revivebutton`} onClick={Revivebutton}/>
                    </Tippy>
                    <Tippy content="Ability Recovered">
                        <li className={`${Increase? "filteractive":"filterinactive"} buffbutton Increasebutton`} onClick={Increasebutton}/>
                    </Tippy>
                    <Tippy content="Two Abilities Recovered">
                        <li className={`${Increase2? "filteractive":"filterinactive"} buffbutton Increase2button`} onClick={Increase2button}/>
                    </Tippy>
                    <Tippy content="Buff Extension">
                        <li className={`${Buff_Extension? "filteractive":"filterinactive"} buffbutton Buff_ExtensionGearbutton`} onClick={Buff_Extensionbutton}/>
                    </Tippy>
                    <Tippy content="Free Ability Use">
                        <li className={`${Free? "filteractive":"filterinactive"} buffbutton Freebutton`} onClick={Freebutton}/>
                    </Tippy>
                    <Tippy content="Self-Harm HP Damage">
                        <li className={`${Self_Harm? "filteractive":"filterinactive"} buffbutton HPHarmbutton`} onClick={Self_Harmbutton}/>
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
            </div>  
            <ul className="bannertabs">
            <Link to={`/search/buffs${jptoggledata == false ? "":"?JP=true"}`}>
                <li className={""} >Buffs</li>
            </Link>
            <Link to={`/search/abilities${jptoggledata == false ? "":"?JP=true"}`}>
                <li className={"active"} ><span className="gemselected"/>Abilities</li>
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
                {listAbility.length > 0 ?  (
              listAbility.map(cmd => (
                <Character_Ability_Pars
                key={cmd.data_id}
                character_ability={cmd}
                ver={ver}
                loc={loc}
                file={file}

                CastNames={CastNames}
                enemy_type={enemy_type}
                cast_targets={cast_targets}
                passivenames={passivenames}
                equipmentpassivenames={equipmentpassivenames}
                passive_effects_data={passive_effects_data}
                CondData={CondData}

                Ailment_Effects={Ailment_Effects}

                MessageData_Category={MessageData_Category}
                MessageData_FFSeries={MessageData_FFSeries}
                char_id={char_id}

                option_trans_data={option_trans_data}
                command_data_effects={command_data_effects}
                hit_data_effects={hit_data_effects}

                hit_effect_id={hit_effect_id}
                ability_target_id={ability_target_id}
                type_id={type_id}
                attack_type_id={attack_type_id}
                effect_value_type_id={effect_value_type_id}
                CommandNames={CommandNames}
                AilmentNames={AilmentNames}
                ailment_group={ailment_group[ver]}
                command_group={command_group[ver]}
                enemy_resist={enemy_resist[ver]}
                element_bit_={element_bit_}

                type_={type_}
                attack_type_={attack_type_}
                target_range_={target_range_}
                target_type_={target_type_}
                auto_target_type_={auto_target_type_}
                killer_cond={killer_cond}
                killer_cond_1={killer_cond_1}
                killer_type={killer_type}
                cast_target={cast_target}
                ailment_cond={ailment_cond}
                ailment_cond_14={ailment_cond_14}
                command_type={command_type}

                option_labels={option_labels}
                options_target={options_target}
                option_type_={option_type_}
                formatting={true}

                link={"abilities"}
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
export default AbilitiesDirect