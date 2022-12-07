import React, {useState, useEffect} from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import { useDispatch, useSelector } from "react-redux";
import Tippy from './formatting/TippyDefaults'
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
import Sphere_Passive_Ability_Formatting from './characterpages/direct/formatting/passives/Sphere_Passive_Ability_Formatting';
import sphere_tags from './characterpages/direct/formatting/command_ability/sphere_tags.json'

import { setFalse, setTrue } from './redux/ducks/jptoggle'

const SpheresDirect =({
    ver,
    loc,
    file,
    match,

    ProcessedSpheres,
    Access,

    master_index
})=>{

  const char_id = master_index.charid

    const startinglimit = window.innerWidth <= 815 ? 30 : 50;

    const rawData = ProcessedSpheres;

    const banerDisplayTerm = "spheres";

    const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null  ? true : false);
    const [clearFilter, setclearFilter] = useStateIfMounted(false);

    const [aSpheres, setASpheres] = useState(getQueryStringVal("A") != null  ? true : false);
    const [bSpheres, setBSpheres] = useState(getQueryStringVal("B") != null  ? true : false);
    const [cSpheres, setCSpheres] = useState(getQueryStringVal("C") != null  ? true : false);
    const [dSpheres, setDSpheres] = useState(getQueryStringVal("D") != null  ? true : false);
    const [eSpheres, setESpheres] = useState(getQueryStringVal("E") != null  ? true : false);

    const [exSpheres, setEXSpheres] = useState(getQueryStringVal("EX") != null  ? true : false);
    const [rfSpheres, setRFSpheres] = useState(getQueryStringVal("Refine") != null  ? true : false);

    const [AnyBreak, setAnyBreak] = useState(getQueryStringVal("AnyBreak") != null  ? true : false);
    const [InflictBreak, setInflictBreak] = useState(getQueryStringVal("InflictBreak") != null  ? true : false);
    const [InflictBreakAttackBreak, setInflictBreakAttackBreak] = useState(getQueryStringVal("InflictBreakAttackBreak") != null  ? true : false);
    const [AttackBreak, setAttackBreak] = useState(getQueryStringVal("AttackBreak") != null  ? true : false);
    const [InflictBreakAttackBreakHPOver100, setInflictBreakAttackBreakHPOver100] = useState(getQueryStringVal("InflictBreakAttackBreakHPOver100") != null  ? true : false);
    const [GroupCritical, setGroupCritical] = useState(getQueryStringVal("GroupCritical") != null  ? true : false);
    const [Target1Critical, setTarget1Critical] = useState(getQueryStringVal("Target1Critical") != null  ? true : false);
    const [Critical, setCritical] = useState(getQueryStringVal("Critical") != null  ? true : false);
    const [HPOver100Critical, setHPOver100Critical] = useState(getQueryStringVal("HPOver100Critical") != null  ? true : false);
    const [HPOver100, setHPOver100] = useState(getQueryStringVal("HPOver100") != null  ? true : false);
    const [HPOver80, setHPOver80] = useState(getQueryStringVal("HPOver80") != null  ? true : false);
    const [HPUnder80, setHPUnder80] = useState(getQueryStringVal("HPUnder80") != null  ? true : false);
    const [FinalWaveHPOver50, setFinalWaveHPOver50] = useState(getQueryStringVal("FinalWaveHPOver50") != null  ? true : false);
    const [HPUnder50HPDamage, setHPUnder50HPDamage] = useState(getQueryStringVal("HPUnder50HPDamage") != null  ? true : false);
    const [HPDamage, setHPDamage] = useState(getQueryStringVal("HPDamage") != null  ? true : false);
    const [HealedHP, setHealedHP] = useState(getQueryStringVal("HealedHP") != null  ? true : false);
    const [Weak, setWeak] = useState(getQueryStringVal("Weak") != null  ? true : false);
    const [Evade, setEvade] = useState(getQueryStringVal("Evade") != null  ? true : false);
    const [KnockBack, setKnockBack] = useState(getQueryStringVal("KnockBack") != null  ? true : false);
    const [Target1, setTarget1] = useState(getQueryStringVal("Target1") != null  ? true : false);
    const [Group, setGroup] = useState(getQueryStringVal("Group") != null  ? true : false);
    const [DebuffedEnemy, setDebuffedEnemy] = useState(getQueryStringVal("DebuffedEnemy") != null  ? true : false);
    const [NotTargetingYou, setNotTargetingYou] = useState(getQueryStringVal("NotTargetingYou") != null  ? true : false);
    const [TargetingYou, setTargetingYou] = useState(getQueryStringVal("TargetingYou") != null  ? true : false);
    const [Ability, setAbility] = useState(getQueryStringVal("Ability") != null  ? true : false);
    const [InflictDebuff, setInflictDebuff] = useState(getQueryStringVal("InflictDebuff") != null  ? true : false);
    const [GrantBuff, setGrantBuff] = useState(getQueryStringVal("GrantBuff") != null  ? true : false);
    const [WhileBuffed5, setWhileBuffed5] = useState(getQueryStringVal("WhileBuffed5") != null  ? true : false);
    const [WhileBuffed3, setWhileBuffed3] = useState(getQueryStringVal("WhileBuffed3") != null  ? true : false);
    const [BattleStart, setBattleStart] = useState(getQueryStringVal("BattleStart") != null  ? true : false);

    const [loop, setLoop] = useStateIfMounted(false);
    const [reverse, setReverse] = useState(getQueryStringVal("rev") != null  ? true : false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchdisplay, setsearchdisplay] = useState("");
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

    const [AnyBreaksearch, setAnyBreaksearch] = useQueryParam("AnyBreak", "");
    const [InflictBreaksearch, setInflictBreaksearch] = useQueryParam("InflictBreak", "");
    const [InflictBreakAttackBreaksearch, setInflictBreakAttackBreaksearch] = useQueryParam("InflictBreakAttackBreak", "");
    const [AttackBreaksearch, setAttackBreaksearch] = useQueryParam("AttackBreak", "");
    const [InflictBreakAttackBreakHPOver100search, setInflictBreakAttackBreakHPOver100search] = useQueryParam("InflictBreakAttackBreakHPOver100", "");
    const [GroupCriticalsearch, setGroupCriticalsearch] = useQueryParam("GroupCritical", "");
    const [Target1Criticalsearch, setTarget1Criticalsearch] = useQueryParam("Target1Critical", "");
    const [Criticalsearch, setCriticalsearch] = useQueryParam("Critical", "");
    const [HPOver100Criticalsearch, setHPOver100Criticalsearch] = useQueryParam("HPOver100Critical", "");
    const [HPOver100search, setHPOver100search] = useQueryParam("HPOver100", "");
    const [HPOver80search, setHPOver80search] = useQueryParam("HPOver80", "");
    const [HPUnder80search, setHPUnder80search] = useQueryParam("HPUnder80", "");
    const [FinalWaveHPOver50search, setFinalWaveHPOver50search] = useQueryParam("FinalWaveHPOver50", "");
    const [HPUnder50HPDamagesearch, setHPUnder50HPDamagesearch] = useQueryParam("HPUnder50HPDamage", "");
    const [HPDamagesearch, setHPDamagesearch] = useQueryParam("HPDamage", "");
    const [HealedHPsearch, setHealedHPsearch] = useQueryParam("HealedHP", "");
    const [Weaksearch, setWeaksearch] = useQueryParam("Weak", "");
    const [Evadesearch, setEvadesearch] = useQueryParam("Evade", "");
    const [KnockBacksearch, setKnockBacksearch] = useQueryParam("KnockBack", "");
    const [Target1search, setTarget1search] = useQueryParam("Target1", "");
    const [Groupsearch, setGroupsearch] = useQueryParam("Group", "");
    const [DebuffedEnemysearch, setDebuffedEnemysearch] = useQueryParam("DebuffedEnemy", "");
    const [NotTargetingYousearch, setNotTargetingYousearch] = useQueryParam("NotTargetingYou", "");
    const [TargetingYousearch, setTargetingYousearch] = useQueryParam("TargetingYou", "");
    const [Abilitysearch, setAbilitysearch] = useQueryParam("Ability", "");
    const [InflictDebuffsearch, setInflictDebuffsearch] = useQueryParam("InflictDebuff", "");
    const [GrantBuffsearch, setGrantBuffsearch] = useQueryParam("GrantBuff", "");
    const [WhileBuffed5search, setWhileBuffed5search] = useQueryParam("WhileBuffed5", "");
    const [WhileBuffed3search, setWhileBuffed3search] = useQueryParam("WhileBuffed3", "");
    const [BattleStartsearch, setBattleStartsearch] = useQueryParam("BattleStart", "");
    
    const [Asearch, setAsearch] = useQueryParam("A", "");
    const [Bsearch, setBsearch] = useQueryParam("B", "");
    const [Csearch, setCsearch] = useQueryParam("C", "");
    const [Dsearch, setDsearch] = useQueryParam("D", "");
    const [Esearch, setEsearch] = useQueryParam("E", "");
    const [Refinsearch, setRefinsearch] = useQueryParam("Refine", "");
    const [EXsearch, setEXsearch] = useQueryParam("EX", "");

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
         const filteredtype = ProcessedSpheres.filter(self=>self.CharID == match_id)
         if(filteredtype.length != 0){
           setTypesearch(getQueryStringVal("Char"))
           setCondFilter(filteredtype[0].CharID)
         } else{
           setTypesearch("")
           setCondFilter("")
         }
       }
     },[setCondFilter,ProcessedSpheres,Typesearch,setTypesearch,char_id])

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
        var filterholder = [];

        if(AnyBreak == true){
            const filteredout = rawData.filter(
            (ef) =>ef.AnyBreak == true
            );
            filterholder.push(...filteredout);
        }
        if(InflictBreak == true){
            const filteredout = rawData.filter(
            (ef) =>ef.InflictBreak == true
            );
            filterholder.push(...filteredout);
        }
        if(InflictBreakAttackBreak == true){
            const filteredout = rawData.filter(
            (ef) =>ef.InflictBreakAttackBreak == true
            );
            filterholder.push(...filteredout);
        }
        if(AttackBreak == true){
            const filteredout = rawData.filter(
            (ef) =>ef.AttackBreak == true
            );
            filterholder.push(...filteredout);
        }
        if(InflictBreakAttackBreakHPOver100 == true){
            const filteredout = rawData.filter(
            (ef) =>ef.InflictBreakAttackBreakHPOver100 == true
            );
            filterholder.push(...filteredout);
        }
        if(GroupCritical == true){
            const filteredout = rawData.filter(
            (ef) =>ef.GroupCritical == true
            );
            filterholder.push(...filteredout);
        }
        if(Target1Critical == true){
            const filteredout = rawData.filter(
            (ef) =>ef.Target1Critical == true
            );
            filterholder.push(...filteredout);
        }
        if(Critical == true){
            const filteredout = rawData.filter(
            (ef) =>ef.Critical == true
            );
            filterholder.push(...filteredout);
        }
        if(HPOver100Critical == true){
            const filteredout = rawData.filter(
            (ef) =>ef.HPOver100Critical == true
            );
            filterholder.push(...filteredout);
        }
        if(HPOver100 == true){
            const filteredout = rawData.filter(
            (ef) =>ef.HPOver100 == true
            );
            filterholder.push(...filteredout);
        }
        if(HPOver80 == true){
            const filteredout = rawData.filter(
            (ef) =>ef.HPOver80 == true
            );
            filterholder.push(...filteredout);
        }
        if(HPUnder80 == true){
            const filteredout = rawData.filter(
            (ef) =>ef.HPUnder80 == true
            );
            filterholder.push(...filteredout);
        }
        if(FinalWaveHPOver50 == true){
            const filteredout = rawData.filter(
            (ef) =>ef.FinalWaveHPOver50 == true
            );
            filterholder.push(...filteredout);
        }
        if(HPUnder50HPDamage == true){
            const filteredout = rawData.filter(
            (ef) =>ef.HPUnder50HPDamage == true
            );
            filterholder.push(...filteredout);
        }
        if(HPDamage == true){
            const filteredout = rawData.filter(
            (ef) =>ef.HPDamage == true
            );
            filterholder.push(...filteredout);
        }
        if(HealedHP == true){
            const filteredout = rawData.filter(
            (ef) =>ef.HealedHP == true
            );
            filterholder.push(...filteredout);
        }
        if(Weak == true){
            const filteredout = rawData.filter(
            (ef) =>ef.Weak == true
            );
            filterholder.push(...filteredout);
        }
        if(Evade == true){
            const filteredout = rawData.filter(
            (ef) =>ef.Evade == true
            );
            filterholder.push(...filteredout);
        }
        if(KnockBack == true){
            const filteredout = rawData.filter(
            (ef) =>ef.KnockBack == true
            );
            filterholder.push(...filteredout);
        }
        if(Target1 == true){
            const filteredout = rawData.filter(
            (ef) =>ef.Target1 == true
            );
            filterholder.push(...filteredout);
        }
        if(Group == true){
            const filteredout = rawData.filter(
            (ef) =>ef.Group == true
            );
            filterholder.push(...filteredout);
        }
        if(DebuffedEnemy == true){
            const filteredout = rawData.filter(
            (ef) =>ef.DebuffedEnemy == true
            );
            filterholder.push(...filteredout);
        }
        if(NotTargetingYou == true){
            const filteredout = rawData.filter(
            (ef) =>ef.NotTargetingYou == true
            );
            filterholder.push(...filteredout);
        }
        if(TargetingYou == true){
            const filteredout = rawData.filter(
            (ef) =>ef.TargetingYou == true
            );
            filterholder.push(...filteredout);
        }
        if(Ability == true){
            const filteredout = rawData.filter(
            (ef) =>ef.Ability == true
            );
            filterholder.push(...filteredout);
        }
        if(InflictDebuff == true){
            const filteredout = rawData.filter(
            (ef) =>ef.InflictDebuff == true
            );
            filterholder.push(...filteredout);
        }
        if(GrantBuff == true){
            const filteredout = rawData.filter(
            (ef) =>ef.GrantBuff == true
            );
            filterholder.push(...filteredout);
        }
        if(WhileBuffed5 == true){
            const filteredout = rawData.filter(
            (ef) =>ef.WhileBuffed5 == true
            );
            filterholder.push(...filteredout);
        }
        if(WhileBuffed3 == true){
            const filteredout = rawData.filter(
            (ef) =>ef.WhileBuffed3 == true
            );
            filterholder.push(...filteredout);
        }
        if(BattleStart == true){
            const filteredout = rawData.filter(
            (ef) =>ef.BattleStart == true
            );
            filterholder.push(...filteredout);
        }

        if (filterholder.length === 0) {
            filterholder.push(...rawData);
        }

        if(aSpheres == true){
            filterholder = filterholder.filter(
                (ef) =>ef.A == true
                );
        }
        if(bSpheres == true){
            filterholder = filterholder.filter(
                (ef) =>ef.B == true
                );
        }
        if(cSpheres == true){
            filterholder = filterholder.filter(
                (ef) =>ef.C == true
                );
        }
        if(dSpheres == true){
            filterholder = filterholder.filter(
                (ef) =>ef.D == true
                );
        }
        if(eSpheres == true){
            filterholder = filterholder.filter(
                (ef) =>ef.E == true
                );
        }

        if(exSpheres == true){
            filterholder = filterholder.filter(
                (ef) =>ef.EX == true
                );
        }
        if(rfSpheres == true){
            filterholder = filterholder.filter(
                (ef) =>ef.RF == true
                );
        }

        if(condFilter != ""){
            filterholder = filterholder.filter(
                (ef)=> ef.CharID == condFilter
            );
        }

        const makeUnique = filterholder
            .filter(onlyUnique)
            .sort((a, b) => 
            reverse === false ?
            a.order - b.order:
            b.order - a.order
            );
            const searchit = searchTerm == "" ? makeUnique : makeUnique.filter((passive) =>
            (`${passive.passive && passive.passive.name} ${passive.passive && passive.passive.glname} ${passive.passive && passive.passive.jpname} - #${passive.pa_id}`).toLowerCase().includes(searchTerm)
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
        
    },[rawData,limits,searchTerm,reverse,condFilter,aSpheres,bSpheres,cSpheres,dSpheres,eSpheres,exSpheres,rfSpheres,AnyBreak,InflictBreak,InflictBreakAttackBreak,AttackBreak,InflictBreakAttackBreakHPOver100,GroupCritical,Target1Critical,Critical,HPOver100Critical,HPOver100,HPOver80,HPUnder80,FinalWaveHPOver50,HPUnder50HPDamage,HPDamage,HealedHP,Weak,Evade,KnockBack,Target1,Group,DebuffedEnemy,NotTargetingYou,TargetingYou,Ability,InflictDebuff,GrantBuff,WhileBuffed5,WhileBuffed3,BattleStart])
    
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

    const aSpheresbutton = () => {
        if (aSpheres == false) {
          setAsearch("true")
          setBsearch("")
          setCsearch("")
          setDsearch("")
          setEsearch("")

          setBSpheres(false)
          setCSpheres(false)
          setDSpheres(false)
          setESpheres(false)
        } else {
          setAsearch("")
        }
        setASpheres((prevValue) => !prevValue);
      };
      const bSpheresbutton = () => {
        if (bSpheres == false) {
          setAsearch("")
          setBsearch("true")
          setCsearch("")
          setDsearch("")
          setEsearch("")
          setASpheres(false)

          setCSpheres(false)
          setDSpheres(false)
          setESpheres(false)
        } else {
          setBsearch("")
        }
        setBSpheres((prevValue) => !prevValue);
      };
      const cSpheresbutton = () => {
        if (cSpheres == false) {
          setAsearch("")
          setBsearch("")
          setCsearch("true")
          setDsearch("")
          setEsearch("")
          setASpheres(false)
          setBSpheres(false)

          setDSpheres(false)
          setESpheres(false)
        } else {
          setCsearch("")
        }
        setCSpheres((prevValue) => !prevValue);
      };
      const dSpheresbutton = () => {
        if (dSpheres == false) {
          setAsearch("")
          setBsearch("")
          setCsearch("")
          setDsearch("true")
          setEsearch("")
          setASpheres(false)
          setBSpheres(false)
          setCSpheres(false)

          setESpheres(false)
        } else {
          setDsearch("")
        }
        setDSpheres((prevValue) => !prevValue);
      };
      const eSpheresbutton = () => {
        if (eSpheres == false) {
          setAsearch("")
          setBsearch("")
          setCsearch("")
          setDsearch("")
          setEsearch("true")
          setASpheres(false)
          setBSpheres(false)
          setCSpheres(false)
          setDSpheres(false)

        } else {
          setEsearch("")
        }
        setESpheres((prevValue) => !prevValue);
      };

    const AnyBreakbutton = () => {
        if (AnyBreak == false) {
        setAnyBreaksearch("true")
        } else {
        setAnyBreaksearch("")
        }
        setAnyBreak((prevValue) => !prevValue);
        };
        const InflictBreakbutton = () => {
        if (InflictBreak == false) {
        setInflictBreaksearch("true")
        } else {
        setInflictBreaksearch("")
        }
        setInflictBreak((prevValue) => !prevValue);
        };
        const InflictBreakAttackBreakbutton = () => {
        if (InflictBreakAttackBreak == false) {
        setInflictBreakAttackBreaksearch("true")
        } else {
        setInflictBreakAttackBreaksearch("")
        }
        setInflictBreakAttackBreak((prevValue) => !prevValue);
        };
        const AttackBreakbutton = () => {
        if (AttackBreak == false) {
        setAttackBreaksearch("true")
        } else {
        setAttackBreaksearch("")
        }
        setAttackBreak((prevValue) => !prevValue);
        };
        const InflictBreakAttackBreakHPOver100button = () => {
        if (InflictBreakAttackBreakHPOver100 == false) {
        setInflictBreakAttackBreakHPOver100search("true")
        } else {
        setInflictBreakAttackBreakHPOver100search("")
        }
        setInflictBreakAttackBreakHPOver100((prevValue) => !prevValue);
        };
        const GroupCriticalbutton = () => {
        if (GroupCritical == false) {
        setGroupCriticalsearch("true")
        } else {
        setGroupCriticalsearch("")
        }
        setGroupCritical((prevValue) => !prevValue);
        };
        const Target1Criticalbutton = () => {
        if (Target1Critical == false) {
        setTarget1Criticalsearch("true")
        } else {
        setTarget1Criticalsearch("")
        }
        setTarget1Critical((prevValue) => !prevValue);
        };
        const Criticalbutton = () => {
        if (Critical == false) {
        setCriticalsearch("true")
        } else {
        setCriticalsearch("")
        }
        setCritical((prevValue) => !prevValue);
        };
        const HPOver100Criticalbutton = () => {
        if (HPOver100Critical == false) {
        setHPOver100Criticalsearch("true")
        } else {
        setHPOver100Criticalsearch("")
        }
        setHPOver100Critical((prevValue) => !prevValue);
        };
        const HPOver100button = () => {
        if (HPOver100 == false) {
        setHPOver100search("true")
        } else {
        setHPOver100search("")
        }
        setHPOver100((prevValue) => !prevValue);
        };
        const HPOver80button = () => {
        if (HPOver80 == false) {
        setHPOver80search("true")
        } else {
        setHPOver80search("")
        }
        setHPOver80((prevValue) => !prevValue);
        };
        const HPUnder80button = () => {
        if (HPUnder80 == false) {
        setHPUnder80search("true")
        } else {
        setHPUnder80search("")
        }
        setHPUnder80((prevValue) => !prevValue);
        };
        const FinalWaveHPOver50button = () => {
        if (FinalWaveHPOver50 == false) {
        setFinalWaveHPOver50search("true")
        } else {
        setFinalWaveHPOver50search("")
        }
        setFinalWaveHPOver50((prevValue) => !prevValue);
        };
        const HPUnder50HPDamagebutton = () => {
        if (HPUnder50HPDamage == false) {
        setHPUnder50HPDamagesearch("true")
        } else {
        setHPUnder50HPDamagesearch("")
        }
        setHPUnder50HPDamage((prevValue) => !prevValue);
        };
        const HPDamagebutton = () => {
        if (HPDamage == false) {
        setHPDamagesearch("true")
        } else {
        setHPDamagesearch("")
        }
        setHPDamage((prevValue) => !prevValue);
        };
        const HealedHPbutton = () => {
        if (HealedHP == false) {
        setHealedHPsearch("true")
        } else {
        setHealedHPsearch("")
        }
        setHealedHP((prevValue) => !prevValue);
        };
        const Weakbutton = () => {
        if (Weak == false) {
        setWeaksearch("true")
        } else {
        setWeaksearch("")
        }
        setWeak((prevValue) => !prevValue);
        };
        const Evadebutton = () => {
        if (Evade == false) {
        setEvadesearch("true")
        } else {
        setEvadesearch("")
        }
        setEvade((prevValue) => !prevValue);
        };
        const KnockBackbutton = () => {
        if (KnockBack == false) {
        setKnockBacksearch("true")
        } else {
        setKnockBacksearch("")
        }
        setKnockBack((prevValue) => !prevValue);
        };
        const Target1button = () => {
        if (Target1 == false) {
        setTarget1search("true")
        } else {
        setTarget1search("")
        }
        setTarget1((prevValue) => !prevValue);
        };
        const Groupbutton = () => {
        if (Group == false) {
        setGroupsearch("true")
        } else {
        setGroupsearch("")
        }
        setGroup((prevValue) => !prevValue);
        };
        const DebuffedEnemybutton = () => {
        if (DebuffedEnemy == false) {
        setDebuffedEnemysearch("true")
        } else {
        setDebuffedEnemysearch("")
        }
        setDebuffedEnemy((prevValue) => !prevValue);
        };
        const NotTargetingYoubutton = () => {
        if (NotTargetingYou == false) {
        setNotTargetingYousearch("true")
        } else {
        setNotTargetingYousearch("")
        }
        setNotTargetingYou((prevValue) => !prevValue);
        };
        const TargetingYoubutton = () => {
        if (TargetingYou == false) {
        setTargetingYousearch("true")
        } else {
        setTargetingYousearch("")
        }
        setTargetingYou((prevValue) => !prevValue);
        };
        const Abilitybutton = () => {
        if (Ability == false) {
        setAbilitysearch("true")
        } else {
        setAbilitysearch("")
        }
        setAbility((prevValue) => !prevValue);
        };
        const InflictDebuffbutton = () => {
        if (InflictDebuff == false) {
        setInflictDebuffsearch("true")
        } else {
        setInflictDebuffsearch("")
        }
        setInflictDebuff((prevValue) => !prevValue);
        };
        const GrantBuffbutton = () => {
        if (GrantBuff == false) {
        setGrantBuffsearch("true")
        } else {
        setGrantBuffsearch("")
        }
        setGrantBuff((prevValue) => !prevValue);
        };
        const WhileBuffed5button = () => {
        if (WhileBuffed5 == false) {
        setWhileBuffed5search("true")
        } else {
        setWhileBuffed5search("")
        }
        setWhileBuffed5((prevValue) => !prevValue);
        };
        const WhileBuffed3button = () => {
        if (WhileBuffed3 == false) {
        setWhileBuffed3search("true")
        } else {
        setWhileBuffed3search("")
        }
        setWhileBuffed3((prevValue) => !prevValue);
        };
        const BattleStartbutton = () => {
        if (BattleStart == false) {
        setBattleStartsearch("true")
        } else {
        setBattleStartsearch("")
        }
        setBattleStart((prevValue) => !prevValue);
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

    const exspheresbutton = () => {
        if (exSpheres == false) {
          setEXsearch("true")
          setRefinsearch("")
          setRFSpheres(false)
        } else {
          setEXsearch("")
        }
        setEXSpheres((prevValue) => !prevValue);
      };
      const rfspheresbutton = () => {
        if (rfSpheres == false) {
          setRefinsearch("true")
          setEXsearch("")
          setEXSpheres(false)
        } else {
          setRefinsearch("")
        }
        setRFSpheres((prevValue) => !prevValue);
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
        setTypesearch("")

        setAnyBreak(false)
        setInflictBreak(false)
        setInflictBreakAttackBreak(false)
        setAttackBreak(false)
        setInflictBreakAttackBreakHPOver100(false)
        setGroupCritical(false)
        setTarget1Critical(false)
        setCritical(false)
        setHPOver100Critical(false)
        setHPOver100(false)
        setHPOver80(false)
        setHPUnder80(false)
        setFinalWaveHPOver50(false)
        setHPUnder50HPDamage(false)
        setHPDamage(false)
        setHealedHP(false)
        setWeak(false)
        setEvade(false)
        setKnockBack(false)
        setTarget1(false)
        setGroup(false)
        setDebuffedEnemy(false)
        setNotTargetingYou(false)
        setTargetingYou(false)
        setAbility(false)
        setInflictDebuff(false)
        setGrantBuff(false)
        setWhileBuffed5(false)
        setWhileBuffed3(false)
        setBattleStart(false)

        setAnyBreaksearch("")
        setInflictBreaksearch("")
        setInflictBreakAttackBreaksearch("")
        setAttackBreaksearch("")
        setInflictBreakAttackBreakHPOver100search("")
        setGroupCriticalsearch("")
        setTarget1Criticalsearch("")
        setCriticalsearch("")
        setHPOver100Criticalsearch("")
        setHPOver100search("")
        setHPOver80search("")
        setHPUnder80search("")
        setFinalWaveHPOver50search("")
        setHPUnder50HPDamagesearch("")
        setHPDamagesearch("")
        setHealedHPsearch("")
        setWeaksearch("")
        setEvadesearch("")
        setKnockBacksearch("")
        setTarget1search("")
        setGroupsearch("")
        setDebuffedEnemysearch("")
        setNotTargetingYousearch("")
        setTargetingYousearch("")
        setAbilitysearch("")
        setInflictDebuffsearch("")
        setGrantBuffsearch("")
        setWhileBuffed5search("")
        setWhileBuffed3search("")
        setBattleStartsearch("")

        setAsearch("")
        setBsearch("")
        setDsearch("")
        setCsearch("")
        setEsearch("")
        setRefinsearch("")
        setEXsearch("")
        setReverse(false)
        setASpheres(false);
        setBSpheres(false);
        setCSpheres(false);
        setDSpheres(false);
        setESpheres(false);
        setEXSpheres(false);
        setRFSpheres(false);
    
        setTimeout(() => setclearFilter(false), 1000);
      }


      const listSphere = listDisplay;

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

    return(
        <div>
        <Helmet>
          <title>Spheres - Dissidia Compendium</title>
          <meta property="og:site_name" content="Dissidia Compendium"/>
          <meta property="og:type" content="website" />
          <meta name="description" content="Spheres Search"/>
          <meta name="twitter:title" content="Spheres Search"/>
          <meta name="twitter:description" content="Spheres Search"/>
          <meta property="og:title" content="Spheres Search"/>
          <meta property="og:description" content="Spheres Search"/>
          <meta property="og:url" content="https://dissidiacompendium.com/search/spheres"/>
        </Helmet>
            <div className="content">
            <h1>{`${jptoggledata == false ? "GL" : "JP"} Spheres`}</h1>
              <div className="subheader">
              Use filters to limit returns
            </div>
            <div className="charfilterspacer"/>
             <div key="filter1" onClick={showfilterbutton} className="charfilter"><span className="filterstext"></span>{showFilter ? <TiArrowSortedUp className="uparrow"/> : <TiArrowSortedDown className="downarrow"/>}</div>
              {showFilter == false ? 
              <div className="event-search-reverse-holder">
                <span className={`${jponly ? "jponlybackground" : "GLonlybackground"}`}>
                 <Tippy content={`${jponly == true? "Switch to GL" : "Switch to JP"}`} className="tooltip" >
                <span onClick={jponlybutton} className={`${jponly ? "jpflage jpsmallinactive smalleventbutton" : "glflage smalleventbutton"}`}/>
                </Tippy>
                </span>
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
                <div className="similarbanner">Conditions</div>
                  <div className="filterholderflair">
                    <ul className='characterclasses'>
                    <Tippy content={sphere_tags[`AnyBreak`].name}>
                    <li className={`${AnyBreak ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={AnyBreakbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`AnyBreak`].url}.png)`}}></li>
                    </Tippy>
                    <Tippy content={sphere_tags[`InflictBreak`].name}>
                    <li className={`${InflictBreak ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={InflictBreakbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`InflictBreak`].url}.png)`}}></li>
                    </Tippy>
                    <Tippy content={sphere_tags[`InflictBreakAttackBreak`].name}>
                    <li className={`${InflictBreakAttackBreak ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={InflictBreakAttackBreakbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`InflictBreakAttackBreak`].url}.png)`}}></li>
                    </Tippy>
                    <Tippy content={sphere_tags[`AttackBreak`].name}>
                    <li className={`${AttackBreak ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={AttackBreakbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`AttackBreak`].url}.png)`}}></li>
                    </Tippy>
                    <Tippy content={sphere_tags[`InflictBreakAttackBreakHPOver100`].name}>
                    <li className={`${InflictBreakAttackBreakHPOver100 ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={InflictBreakAttackBreakHPOver100button} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`InflictBreakAttackBreakHPOver100`].url}.png)`}}></li>
                    </Tippy>
                    <br/>
                    <Tippy content={sphere_tags[`GroupCritical`].name}>
                    <li className={`${GroupCritical ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={GroupCriticalbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`GroupCritical`].url}.png)`}}></li>
                    </Tippy>
                    <Tippy content={sphere_tags[`Target1Critical`].name}>
                    <li className={`${Target1Critical ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={Target1Criticalbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`Target1Critical`].url}.png)`}}></li>
                    </Tippy>
                    <Tippy content={sphere_tags[`Critical`].name}>
                    <li className={`${Critical ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={Criticalbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`Critical`].url}.png)`}}></li>
                    </Tippy>
                    <Tippy content={sphere_tags[`HPOver100Critical`].name}>
                    <li className={`${HPOver100Critical ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={HPOver100Criticalbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`HPOver100Critical`].url}.png)`}}></li>
                    </Tippy>
                    <br/>
                    <Tippy content={sphere_tags[`HPOver100`].name}>
                    <li className={`${HPOver100 ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={HPOver100button} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`HPOver100`].url}.png)`}}></li>
                    </Tippy>
                    <Tippy content={sphere_tags[`HPOver80`].name}>
                    <li className={`${HPOver80 ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={HPOver80button} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`HPOver80`].url}.png)`}}></li>
                    </Tippy>
                    <Tippy content={sphere_tags[`HPUnder80`].name}>
                    <li className={`${HPUnder80 ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={HPUnder80button} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`HPUnder80`].url}.png)`}}></li>
                    </Tippy>
                    <Tippy content={sphere_tags[`FinalWaveHPOver50`].name}>
                    <li className={`${FinalWaveHPOver50 ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={FinalWaveHPOver50button} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`FinalWaveHPOver50`].url}.png)`}}></li>
                    </Tippy>
                    <Tippy content={sphere_tags[`HPUnder50HPDamage`].name}>
                    <li className={`${HPUnder50HPDamage ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={HPUnder50HPDamagebutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`HPUnder50HPDamage`].url}.png)`}}></li>
                    </Tippy>
                    <br/>
                    <Tippy content={sphere_tags[`HPDamage`].name}>
                    <li className={`${HPDamage ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={HPDamagebutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`HPDamage`].url}.png)`}}></li>
                    </Tippy>
                    <Tippy content={sphere_tags[`HealedHP`].name}>
                    <li className={`${HealedHP ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={HealedHPbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`HealedHP`].url}.png)`}}></li>
                    </Tippy>
                    <Tippy content={sphere_tags[`Weak`].name}>
                    <li className={`${Weak ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={Weakbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`Weak`].url}.png)`}}></li>
                    </Tippy>
                    <Tippy content={sphere_tags[`Evade`].name}>
                    <li className={`${Evade ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={Evadebutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`Evade`].url}.png)`}}></li>
                    </Tippy>
                    <Tippy content={sphere_tags[`KnockBack`].name}>
                    <li className={`${KnockBack ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={KnockBackbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`KnockBack`].url}.png)`}}></li>
                    </Tippy>
                    <br/>
                    <Tippy content={sphere_tags[`Target1`].name}>
                    <li className={`${Target1 ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={Target1button} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`Target1`].url}.png)`}}></li>
                    </Tippy>
                    <Tippy content={sphere_tags[`Group`].name}>
                    <li className={`${Group ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={Groupbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`Group`].url}.png)`}}></li>
                    </Tippy>
                    <Tippy content={sphere_tags[`DebuffedEnemy`].name}>
                    <li className={`${DebuffedEnemy ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={DebuffedEnemybutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`DebuffedEnemy`].url}.png)`}}></li>
                    </Tippy>
                    <Tippy content={sphere_tags[`NotTargetingYou`].name}>
                    <li className={`${NotTargetingYou ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={NotTargetingYoubutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`NotTargetingYou`].url}.png)`}}></li>
                    </Tippy>
                    <Tippy content={sphere_tags[`TargetingYou`].name}>
                    <li className={`${TargetingYou ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={TargetingYoubutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`TargetingYou`].url}.png)`}}></li>
                    </Tippy>
                    <br/>
                    <Tippy content={sphere_tags[`InflictDebuff`].name}>
                    <li className={`${InflictDebuff ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={InflictDebuffbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`InflictDebuff`].url}.png)`}}></li>
                    </Tippy>
                    <Tippy content={sphere_tags[`GrantBuff`].name}>
                    <li className={`${GrantBuff ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={GrantBuffbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`GrantBuff`].url}.png)`}}></li>
                    </Tippy>
                    <Tippy content={sphere_tags[`WhileBuffed5`].name}>
                    <li className={`${WhileBuffed5 ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={WhileBuffed5button} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`WhileBuffed5`].url}.png)`}}></li>
                    </Tippy>
                    <Tippy content={sphere_tags[`WhileBuffed3`].name}>
                    <li className={`${WhileBuffed3 ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={WhileBuffed3button} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`WhileBuffed3`].url}.png)`}}></li>
                    </Tippy>
                    <br/>
                    <Tippy content={sphere_tags[`Ability`].name}>
                    <li className={`${Ability ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={Abilitybutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`Ability`].url}.png)`}}></li>
                    </Tippy>
                    <Tippy content={sphere_tags[`BattleStart`].name}>
                    <li className={`${BattleStart ? "filteractive": "filterinactive"} infoiconholderbutton`} onClick={BattleStartbutton} style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${sphere_tags[`BattleStart`].url}.png)`}}></li>
                    </Tippy>
                    </ul>
                    <div className="similarbanner">Refine</div>
                    <ul className="bufftypes">
                      <Tippy content="GL Database">
                      <li className={`${jponly ? "filterinactive": "filteractive"} buffbutton ver_gl`} onClick={setGLbutton}></li>
                      </Tippy>
                      <Tippy content="JP Database">
                      <li className={`${jponly ? "filteractive": "filterinactive"} buffbutton ver_jp`} onClick={setJPbutton}></li>
                      </Tippy>
                    </ul><br/>
                    <ul className="spheretypes">
                        <li className={`${aSpheres ? "filteractive": "filterinactive"} spheresbutton aSpheresButton`} onClick={aSpheresbutton}></li>
                        <li className={`${bSpheres ? "filteractive": "filterinactive"} spheresbutton bSpheresButton`} onClick={bSpheresbutton}></li>
                        <li className={`${cSpheres ? "filteractive": "filterinactive"} spheresbutton cSpheresButton`} onClick={cSpheresbutton}></li>
                        <li className={`${dSpheres ? "filteractive": "filterinactive"} spheresbutton dSpheresButton`} onClick={dSpheresbutton}></li>
                        <li className={`${eSpheres ? "filteractive": "filterinactive"} spheresbutton eSpheresButton`} onClick={eSpheresbutton}></li>
                    </ul>
                    <br/>
                    <ul className="spheretypes">
                        <Tippy content="EX Spheres">
                        <li className={`${exSpheres ? "filteractive": "filterinactive"} spheresbutton exSpheresButton`} onClick={exspheresbutton}></li>
                        </Tippy>
                        <Tippy content="Refined Spheres">
                        <li className={`${rfSpheres ? "filteractive": "filterinactive"} spheresbutton rfSpheresButton`} onClick={rfspheresbutton}></li>
                        </Tippy>
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
                  </div>
                  <ul className="bannertabs">
            <Link to={`/search/buffs${jptoggledata == false ? "":"?JP=true"}`}>
                <li className={""} >Buffs</li>
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
                <li className={"active"} ><span className="gemselected"/>Spheres</li>
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
              {listSphere.length > 0 ?  (
              listSphere.map(passive => (
                passive.passive && 
                <Sphere_Passive_Ability_Formatting
                key={passive.pa_id}
                passive_ability={passive.passive}
                ver={ver}
                loc={loc}
                file={"exskill"}
                Single={true}

                master_index={master_index}

                
                sphere_type={passive.sphere_type}
                sphere_letter={passive.ex_category_id}
                release={passive.start_date}
              
                formatting={true}

                banner_color={"newblue"}
                base_color={"bluebase"}
                raw={passive}

                link={"spheres"}
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

export default SpheresDirect