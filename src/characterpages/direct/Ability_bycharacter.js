import React, {useState, useEffect} from 'react';
import Tippy from '../../formatting/TippyDefaults';
import { useStateIfMounted } from "use-state-if-mounted";
import Select from 'react-select';
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5'; 
import { FaUndoAlt } from 'react-icons/fa'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import { getQuery, getQueryStringVal, useQueryParam } from '../../processing/urlparams'
import 'react-flow-renderer/dist/theme-default.css';
import replacer_titles from '../../processing/replacer_titles'
import replacer_buff from '../../processing/replacer_buffcontent'
import MapMaker from './MapMaker';
import Character_Ability_List from './Ability_list';
import {MarkerType} from 'react-flow-renderer';

const Ability_bycharacter =({
    ability_data,
    buff_data,
    selected_id,

    ver,
    loc,
    newcompare,
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
    showFilter
})=>{

    const rawData = Object.values(ability_data)

    const optionsOnly = {}
    
    Object.values(ability_data).filter(self=>{
        if(self.options != undefined){
            self.options.map(self2=>{
                Object.assign(optionsOnly,{[self2.data_index]:self2})
            })
        }
    })
    
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

    useEffect(()=>{
        if(Object.values(ability_data).some(self=>self.BRV == true)){
            setshowBRV(true)
        }
        if(Object.values(ability_data).some(self=>self.HP == true)){
            setshowHP(true)
        }
        if(Object.values(ability_data).some(self=>self.S1 == true)){
            setshowS1(true)
        }
        if(Object.values(ability_data).some(self=>self.S2 == true)){
            setshowS2(true)
        }
        if(Object.values(ability_data).some(self=>self.AA == true)){
            setshowAA(true)
        }
        if(Object.values(ability_data).some(self=>self.EX == true)){
            setshowEX(true)
        }
        if(Object.values(ability_data).some(self=>self.LD == true)){
            setshowLD(true)
        }
        if(Object.values(ability_data).some(self=>self.BT == true)){
            setshowBT(true)
        }
        if(Object.values(ability_data).some(self=>self.BTplus == true)){
            setshowBT(true)
        }
        if(Object.values(ability_data).some(self=>self.FR == true)){
            setshowFR(true)
        }
        if(Object.values(ability_data).some(self=>self.FRExt == true)){
            setshowFR(true)
        }
        if(Object.values(ability_data).some(self=>self.Call75 == true)){
            setshowCALL75(true)
        }
        if(Object.values(ability_data).some(self=>self.CallLD == true)){
            setshowCALLLD(true)
        }
        // eslint-disable-next-line
    },[ability_data])

    const [activeBRVsearch, setactiveBRVsearch] = useQueryParam("BRV", "");
    const [activeHPsearch, setactiveHPsearch] = useQueryParam("HP", "");
    const [activeS1search, setactiveS1search] =  useQueryParam("S1", "");
    const [activeS2search, setactiveS2search] =  useQueryParam("S2", "");
    const [activeAAsearch, setactiveAAsearch] =  useQueryParam("AA", "");
    const [activeEXsearch, setactiveEXsearch] =  useQueryParam("EX", "");
    const [activeLDsearch, setactiveLDsearch] =  useQueryParam("LD", "");
    const [activeBTsearch, setactiveBTsearch] =  useQueryParam("BT", "");
    const [activeFRsearch, setactiveFRsearch] =  useQueryParam("FR", "");
    const [activeCALL75search, setactiveCALL75search] =  useQueryParam("Call75", "");
    const [activeCALLLDsearch, setactiveCALLLDsearch] =  useQueryParam("CallLD", "");

    const [activeBRV, setactiveBRV] = useStateIfMounted(getQueryStringVal("BRV") != null  ? true : false);
    const [activeHP, setactiveHP] = useStateIfMounted(getQueryStringVal("HP") != null  ? true : false);
    const [activeS1, setactiveS1] = useStateIfMounted(getQueryStringVal("S1") != null  ? true : false);
    const [activeS2, setactiveS2] = useStateIfMounted(getQueryStringVal("S2") != null  ? true : false);
    const [activeAA, setactiveAA] = useStateIfMounted(getQueryStringVal("AA") != null  ? true : false);
    const [activeEX, setactiveEX] = useStateIfMounted(getQueryStringVal("EX") != null  ? true : false);
    const [activeLD, setactiveLD] = useStateIfMounted(getQueryStringVal("LD") != null  ? true : false);
    const [activeBT, setactiveBT] = useStateIfMounted(getQueryStringVal("BT") != null  ? true : false);
    const [activeFR, setactiveFR] = useStateIfMounted(getQueryStringVal("FR") != null  ? true : false);
    const [activeCALL75, setactiveCALL75] = useStateIfMounted(getQueryStringVal("Call75") != null  ? true : false);
    const [activeCALLLD, setactiveCALLLD] = useStateIfMounted(getQueryStringVal("CallLD") != null  ? true : false);

    const [showMap, setShowMap] = useState(getQueryStringVal("map") != null  ? true : false);
    const [upgraded, setupgraded] = useState(getQueryStringVal("upgraded") != null ? false : true);
    const [clearFilter, setclearFilter] = useStateIfMounted(false);

    const [loop, setLoop] = useStateIfMounted(false);
    const [reverse, setReverse] = useState(getQueryStringVal("rev") != null  ? true : false);
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
    const [Mapsearch, setMapsearch] = useQueryParam("map", "");
    const [upgradedsearch, setupgradedsearch] = useQueryParam("upgraded", "");

    useEffect(() => {
        if (showMap == false) {
            setMapsearch("")
          } else {
            setMapsearch("true")
          }
          if(activeBT == false){
            setactiveBTsearch("")
          } else {
            setactiveBTsearch("true")
          }
          if(activeFR == false){
            setactiveFRsearch("")
          } else {
            setactiveFRsearch("true")
          }
          if(activeEX == false){
            setactiveEXsearch("")
          } else {
            setactiveEXsearch("true")
          }
          if(activeLD == false){
            setactiveLDsearch("")
          } else {
            setactiveLDsearch("true")
          }
          if(activeS1 == false){
            setactiveS1search("")
          } else {
            setactiveS1search("true")
          }
          if(activeS2 == false){
            setactiveS2search("")
          } else {
            setactiveS2search("true")
          }
          if(activeAA == false){
            setactiveAAsearch("")
          } else {
            setactiveAAsearch("true")
          }
          if(activeCALL75 == false){
            setactiveCALL75search("")
          } else {
            setactiveCALL75search("true")
          }
          if(activeCALLLD == false){
            setactiveCALLLDsearch("")
          } else {
            setactiveCALLLDsearch("true")
          }
          if(activeBRV == false){
            setactiveBRVsearch("")
          } else {
            setactiveBRVsearch("true")
          }
          if(activeHP == false){
            setactiveHPsearch("")
          } else {
            setactiveHPsearch("true")
          }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[showMap,activeBT,activeFR,activeEX,activeS2,activeS1,activeLD,activeAA,activeCALL75,activeCALLLD,activeBRV,activeHP])

        const showmapbutton = () => {
            if (showMap == false) {
                setMapsearch("true")
            } else {
                setMapsearch("")
            }
            setShowMap((prevValue) => !prevValue);
            }

      useEffect(() => {
        if (upgraded == true) {
            setupgradedsearch("")
        } else {
            setupgradedsearch("false")
        }
        if(reverse == false){
            setReversesearch("")
          } else {
            setReversesearch("true")
          }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[upgraded,reverse])

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
    },[showMap])

     useEffect(() => {
        //search params
        if(getQueryStringVal("command") != null){
          setvaluedisplay(getQueryStringVal("command") != null  ? getQueryStringVal("command") : "")
        }
        }, [setvaluedisplay])

    useEffect(() => {
        //search params
        if(getQueryStringVal("ailment") != null){
            setvaluedisplay3(getQueryStringVal("ailment") != null  ? getQueryStringVal("ailment") : "")
        }
        }, [setvaluedisplay3])


    
    
    const reversebutton = () => {
        setLoop(true);
        setReverse((prevValue) => !prevValue);
        setTimeout(() => setLoop(false), 1000);
        };
    

    
    useEffect(() => {
        //search params
        if(getQueryStringVal("search") != null){
            setSearchTerm(getQueryStringVal("search") != null  ? getQueryStringVal("search").toLowerCase() : "")
            setTEXTsearch(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
            setsearchdisplay(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
        }
        }, [setTEXTsearch,setFiltersearch])

    
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

    const idbase = new Set ()    

    Object.values(ability_data).map(self=>{
        if(self.base == true){
            idbase.add(self.LearningAbility)
        }
    })

     //unique
     function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
        }
        
        useEffect(() => {
            const filterholder = [];
            var rawData2= rawData
            if(upgraded == true){
                const filteredout = rawData.filter(
                    (command) => 
                    command && command.full == true
                    );
                    rawData2 = filteredout;
            } 

            if(AdvanceValuesearch3 != ""){
                const filteredout = rawData2.filter(
                  (command) => 
                  command && command.command && command.command.casts &&
                  command.command.casts.some(self=>(
                    self.id == AdvanceValuesearch3
                  ))
                   
                );
                filterholder.push(...filteredout);
              }

              if(AdvanceValuesearch != ""){
                const filteredout = rawData2.filter(
                  (command) => 
                  command && command.LearningAbility == AdvanceValuesearch
                );
                filterholder.push(...filteredout);
              }

              //buttons
              if(activeBRV == true){
                const filteredout = rawData2.filter(
                  (ef) => 
                  ef && ef.BRV == true
                );
                filterholder.push(...filteredout);
              }
              if(activeHP == true){
                const filteredout = rawData2.filter(
                  (ef) => 
                  ef && ef.HP == true
                );
                filterholder.push(...filteredout);
              }
              if(activeCALL75 == true){
                const filteredout = rawData2.filter(
                  (ef) => 
                  ef && ef.Call75 == true
                );
                filterholder.push(...filteredout);
              }
              if(activeCALLLD == true){
                const filteredout = rawData2.filter(
                  (ef) => 
                  ef && ef.CallLD == true
                );
                filterholder.push(...filteredout);
              }
              if(activeAA == true){
                const filteredout = rawData2.filter(
                  (ef) => 
                  ef && ef.AA == true
                );
                filterholder.push(...filteredout);
              }
              if(activeS1 == true){
                const filteredout = rawData2.filter(
                  (ef) => 
                  ef && ef.S1 == true
                );
                filterholder.push(...filteredout);
              }
              if(activeS2 == true){
                const filteredout = rawData2.filter(
                  (ef) => 
                  ef && ef.S2 == true
                );
                filterholder.push(...filteredout);
              }
              if(activeEX == true){
                const filteredout = rawData2.filter(
                  (ef) => 
                  ef && ef.EX == true
                );
                filterholder.push(...filteredout);
              }
              if(activeLD == true){
                const filteredout = rawData2.filter(
                  (ef) => 
                  ef && ef.LD == true
                );
                filterholder.push(...filteredout);
              }
              if(activeFR == true){
                const filteredout = rawData2.filter(
                  (ef) => 
                  ef && ef.FR == true || ef && ef.FRExt == true 
                );
                filterholder.push(...filteredout);
              }

              if(activeBT == true){
                const filteredout = rawData2.filter(
                  (ef) => 
                  ef && ef.BT == true || ef && ef.BTplus == true
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
            a.LearningAbility - b.LearningAbility:
            b.LearningAbility - a.LearningAbility);
            const searchit = makeUnique.filter((command) =>
            (`${command.LearningAbility && command.LearningAbility ? CommandNames[command.LearningAbility] && CommandNames[command.LearningAbility].jpname: ""} ${command.LearningAbility && command.LearningAbility ? CommandNames[command.LearningAbility] && CommandNames[command.LearningAbility].name: ""} - #${command.LearningAbility}`).toLowerCase().includes(searchTerm)
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
        }, [activeBRV, activeHP, activeCALL75, activeCALLLD, activeAA, activeS1,activeS2,activeEX,activeLD,activeFR,activeBT, searchTerm, upgraded, clearFilter, AdvanceValuesearch, AdvanceValuesearch3, reverse]);

        

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

    const searchobjects = ()=>{
        setAdvanceValuesearch(valuedisplay)
      }
      
    const clearSearchValue = () => {
        setvaluedisplay("")
        setAdvanceValuesearch("")
    };
  
    const changeend  = (event) => {
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
  
    const changeend3  = (event) => {
        setvaluedisplay3(event.target.value)
        setAdvanceValuesearch3(event.target.value)
  
  }
    const handleKeyPressValue3 = (event) => {
        if (event.key === 'Enter') {
        setAdvanceValuesearch3(valuedisplay3);
        }
    }

  const getcastnames = Object.values(AilmentNames).map(self=>{
    return {[self.castID]: self}
  })

  const CastNames = getcastnames.reduce(function(result, item) {
    var key = Object.keys(item)[0]; //first property: a, b, c
    result[key] = item[key];
    return result;
    }, {});

    const commandList = listDisplay;

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

    const add_formatting = (text,switching)=>{
        if(formatting != true){
            return text
        } else {
            if(switching == "tl"){
                return replacer_titles(text)
            }
            if(switching == "bu"){
                return replacer_buff(text)
            }
        }
    } 

    const [elements, setelements] =useStateIfMounted([])
    const [typeListArray3, settypeListArray3] =useStateIfMounted([])
    const [commandfilter, setcommandfilter] =useStateIfMounted()
    const [elementMaker, setelementMaker] =useStateIfMounted({})
    const [finshedrunning,setfinshedrunning] = useStateIfMounted(false)

    useEffect(()=>{
        if(showMap){
        const elementholder= {}

        //first
        if(idbase.length != 0){
            idbase.forEach(self=>{
                const filter = Object.values(optionsOnly).filter(self2=>self2.original_label_ == self)
                if(filter.length != 0){
                    filter.map(self3=>{
                        if(self3.active != false){
                            if(idbase.has(self3.change_label_) == false){
                                idbase.add(self3.change_label_)
                            }
                        }
                    })
                }
            })
        }
    
        Object.values(optionsOnly).map(self=>{
            if(self.original_label_ != self.change_label_){
                if(self.active != false && idbase.has(self.original_label_) == true && idbase.has(self.change_label_) ){
                    if(elementholder[self.original_label_] == undefined){
                        const getcmd1 = CommandNames[self.original_label_]
                        if(getcmd1 != undefined){
                            Object.assign(elementholder, {[self.original_label_]:{
                                id: `${self.original_label_}`,
                                data: {
                                    label: <>
                                                <a className='abilitylink' href={`#${self.original_label_}`}>
                                                    {getcmd1.name}{" #"}{self.original_label_}
                                                </a>
                                                <br/>
                                                <div className={getcmd1.rank == undefined ? "unknown" : getcmd1.rank.replace(/EX/gm,"EXrank").replace(/\+/gm,"plus").replace(/ /gm,"_").replace(/BRV/,"brvattackiconbutton undertag").replace(/HP/,"hpplusattackicon undertaga")}/>
                                            </>
                                },
                                position: {
                                    x: 0,
                                    y: 0,
                                    },
                                ids:[self.original_label_],
                                style: {
                                    background: "rgb(30, 55, 88)"
                                },
                                type: "default",
                                targetPosition: "left",
                                sourcePosition: "right",
                            } })
                        }
                    }
                    if(elementholder[self.change_label_] == undefined){
                        const getcmd2 = CommandNames[self.change_label_]
                        if(getcmd2 != undefined){
                            Object.assign(elementholder, {[self.change_label_]:{
                                id: `${self.change_label_}`,
                                data: {
                                    label: <>
                                                <a className='abilitylink' href={`#${self.change_label_}`}>
                                                    {getcmd2.name}{" #"}{self.change_label_}
                                                </a>
                                                <br/>
                                                <div className={getcmd2.rank == undefined ? "unknown" : getcmd2.rank.replace(/EX/gm,"EXrank").replace(/\+/gm,"plus").replace(/ /gm,"_").replace(/BRV/,"brvattackiconbutton undertag").replace(/HP/,"hpplusattackicon undertaga")}/>
                                            </>
                                },
                                position: {
                                    x: 0,
                                    y: 0,
                                    },
                                ids:[self.change_label_],
                                style: {
                                    background: "rgb(30, 55, 88)"
                                },
                                type: "default",
                                targetPosition: "left",
                                sourcePosition: "right",
                            } })
                        }
                    }
                    if(elementholder[`${self.original_label_}_${self.change_label_}_1`] == undefined){
                        if (self.original_label_ != self.change_label_){
    
                            Object.assign(elementholder, {[`${self.original_label_}_${self.change_label_}_1`]:{
                                id: `${self.original_label_}_${self.change_label_}_1`,
                                data: {
                                    label: 
                                                <div className={"ability_tags"}
                                                >
                                                    {self.option_type_== 1 ? "Replace" : "Follow Up"}
                                                {self.passives && self.passives.length != 0 ?
                                                self.passives.map((self2,key)=>(
                                                    <div key={key}>
                                                    <div  className={self2.loc_tag}>
                                                    
                                                        </div>
                                                        </div>
                                                ))
                                                :""}
                                                </div>
                                },
                                position: {
                                    x: 0,
                                    y: 0,
                                    },
                                spacer:  self.passives && self.passives.length,
                                ids:[self.change_label_,self.original_label_],
                                type: "default",
                                style: {
                                    background: self.option_type_== 1 ? "#773040f0" : "#346746f0",
                                  },
                                targetPosition: "left",
                                sourcePosition: "right",
                            } })
                        }
                    }
                    if(elementholder[`${self.original_label_}_${self.change_label_}_2`] == undefined){
                        if (self.original_label_ != self.change_label_){
                        Object.assign(elementholder, {[`${self.original_label_}_${self.change_label_}_2`]:{
                            id: `${self.original_label_}-${self.change_label_}_2`,
                            source: `${self.original_label_}_${self.change_label_}_1`,
                            target: `${self.change_label_}`,
                            labelBgPadding: [8, 4],
                            labelBgBorderRadius: 4,
                            ids:[`${self.original_label_}-${self.change_label_}_2`,self.change_label_],
                            labelBgStyle: { fill: `${self.option_type_ == 1 ? "#cb750b": "#67f772f0"}`, color: '#fff', fillOpacity: 0.7 },
                            labelStyle: {fill: `white`},
                            arrowHeadType: 'arrowclosed',
                            type: 'default',
                            markerEnd: {
                                type: MarkerType.ArrowClosed,
                                color: "#1e3758f0",
                              },
                        } })
                        }
                    }
    
                        if(elementholder[`${self.original_label_}_${self.change_label_}_3`] == undefined){
                            if (self.original_label_ != self.change_label_){
                            Object.assign(elementholder, {[`${self.original_label_}_${self.change_label_}_3`]:{
                                id: `${self.original_label_}-${self.change_label_}_3`,
                                source: `${self.original_label_}`,
                                target: `${self.original_label_}_${self.change_label_}_1`,
                                labelBgPadding: [8, 4],
                                labelBgBorderRadius: 4,
                                ids:[self.original_label_,`${self.original_label_}_${self.change_label_}_1`],
                                labelBgStyle: { fill: `${self.option_type_ == 1 ? "#cb750b": "#67f772f0"}`, color: '#fff', fillOpacity: 0.7 },
                                labelStyle: {fill: `white`},
                                arrowHeadType: 'arrowclosed',
                                type: 'default',
                                markerEnd: {
                                    type: MarkerType.ArrowClosed,
                                    color: "#1e3758f0",
                                  },
                            } })
                            }
                        }
                }
            }
        })
    
        Object.values(ability_data).map(self=>{
            const getcmd = CommandNames[self.LearningAbility]
            if(getcmd != undefined && elementholder[self.LearningAbility] == undefined && idbase.has(self.LearningAbility) == true){
                Object.assign(elementholder, {[self.LearningAbility]:{
                    id: `${self.LearningAbility}`,
                    data: {
                        label: <>
                                    <a className='abilitylink' href={`#${self.LearningAbility}`}>
                                        {getcmd.name}{" #"}{self.LearningAbility}
                                    </a>
                                    <br/>
                                    <div className={getcmd.rank == undefined ? "unknown" : getcmd.rank.replace(/EX/gm,"EXrank").replace(/\+/gm,"plus").replace(/ /gm,"_").replace(/BRV/,"brvattackiconbutton undertag").replace(/HP/,"hpplusattackicon undertaga")}/>
                                </>
                    },
                    position: {
                        x: 0,
                        y: 0,
                        },
                    ids:[self.LearningAbility],
                    style: {
                        background: "rgb(30, 55, 88)"
                    },
                    type: "default",
                    targetPosition: "left",
                    sourcePosition: "right",
                } })
            }
        })
        const holder2 = []
        Object.values(ability_data).map((self)=>{
            if(idbase.has(self.LearningAbility)){
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
                const filerted1 = Object.values(elementMaker).filter(self2=>{
                    return self2.source == commandfilter || self2.target == `${commandfilter}` || self2.id == `${commandfilter}`
                })
                filerted1.map(self=>{
                    if(self.id == commandfilter ){
                        Object.assign(master,{[self.id]: 
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
                            }})
                    } else {
                        Object.assign(master,{[self.id]:self})
                    }
                    if(self.target != undefined){
                        Object.assign(secondtarget,{[self.target]:{}})
                    }
                    if(self.source != undefined){
                        Object.assign(secondsource,{[self.source]:{}})
                    }
                })
                //first
                Object.keys(secondtarget).map(self=>{
                    if(master[self] == undefined){
                        Object.assign(master,{[elementMaker[self].id]: elementMaker[self]})
                    }
                    const filerted2 = Object.values(elementMaker).filter(self2=>{
                        return  self2.id == `${self}` || self2.source == `${self}` 
                    })
                    filerted2.map(self3=>{
                        if(master[self3.id] == undefined){
                            Object.assign(master,{[self3.id]:self3})
                        }
                        if(self3.target != undefined){
                            Object.assign(secondtarget,{[self3.target]:{}})
                            if(master[elementMaker[self3.target].id] == undefined){
                                Object.assign(master,{[elementMaker[self3.target].id]: elementMaker[self3.target]})
                            }
                        }
                    })
                })
                Object.keys(secondsource).map(self=>{
                    if(master[self] == undefined){
                        Object.assign(master,{[elementMaker[self].id]: elementMaker[self]})
                    }
                    const filerted2 = Object.values(elementMaker).filter(self2=>{
                        return  self2.id == `${self}` || self2.target == `${self}` 
                    })
                    filerted2.map(self3=>{
                        if(master[self3.id] == undefined){
                            Object.assign(master,{[self3.id]:self3})
                        }
                        if(self3.source != undefined){
                            Object.assign(secondsource,{[self3.source]:{}})
                            if(master[elementMaker[self3.source].id] == undefined){
                                Object.assign(master,{[elementMaker[self3.source].id]: elementMaker[self3.source]})
                            }
                        }
                    })
                })
                //second
                Object.keys(secondtarget).map(self=>{
                    if(master[self] == undefined){
                        Object.assign(master,{[elementMaker[self].id]: elementMaker[self]})
                    }
                    const filerted2 = Object.values(elementMaker).filter(self2=>{
                        return  self2.id == `${self}` || self2.source == `${self}` 
                    })
                    filerted2.map(self3=>{
                        if(master[self3.id] == undefined){
                            Object.assign(master,{[self3.id]:self3})
                        }
                        if(self3.target != undefined){
                            Object.assign(secondtarget,{[self3.target]:{}})
                            if(master[elementMaker[self3.target].id] == undefined){
                                Object.assign(master,{[elementMaker[self3.target].id]: elementMaker[self3.target]})
                            }
                        }
                    })
                })
                Object.keys(secondsource).map(self=>{
                    if(master[self] == undefined){
                        Object.assign(master,{[elementMaker[self].id]: elementMaker[self]})
                    }
                    const filerted2 = Object.values(elementMaker).filter(self2=>{
                        return  self2.id == `${self}` || self2.target == `${self}` 
                    })
                    filerted2.map(self3=>{
                        if(master[self3.id] == undefined){
                            Object.assign(master,{[self3.id]:self3})
                        }
                        if(self3.source != undefined){
                            Object.assign(secondsource,{[self3.source]:{}})
                            if(master[elementMaker[self3.source].id] == undefined){
                                Object.assign(master,{[elementMaker[self3.source].id]: elementMaker[self3.source]})
                            }
                        }
                    })
                })
                //third
                Object.keys(secondtarget).map(self=>{
                    if(master[self] == undefined){
                        Object.assign(master,{[elementMaker[self].id]: elementMaker[self]})
                    }
                    const filerted2 = Object.values(elementMaker).filter(self2=>{
                        return  self2.id == `${self}` || self2.source == `${self}` 
                    })
                    filerted2.map(self3=>{
                        if(master[self3.id] == undefined){
                            Object.assign(master,{[self3.id]:self3})
                        }
                        if(self3.target != undefined){
                            Object.assign(secondtarget,{[self3.target]:{}})
                            if(master[elementMaker[self3.target].id] == undefined){
                                Object.assign(master,{[elementMaker[self3.target].id]: elementMaker[self3.target]})
                            }
                        }
                    })
                })
                Object.keys(secondsource).map(self=>{
                    if(master[self] == undefined){
                        Object.assign(master,{[elementMaker[self].id]: elementMaker[self]})
                    }
                    const filerted2 = Object.values(elementMaker).filter(self2=>{
                        return  self2.id == `${self}` || self2.target == `${self}` 
                    })
                    filerted2.map(self3=>{
                        if(master[self3.id] == undefined){
                            Object.assign(master,{[self3.id]:self3})
                        }
                        if(self3.source != undefined){
                            Object.assign(secondsource,{[self3.source]:{}})
                            if(master[elementMaker[self3.source].id] == undefined){
                                Object.assign(master,{[elementMaker[self3.source].id]: elementMaker[self3.source]})
                            }
                        }
                    })
                })
                //forth
                Object.keys(secondtarget).map(self=>{
                    if(master[self] == undefined){
                        Object.assign(master,{[elementMaker[self].id]: elementMaker[self]})
                    }
                    const filerted2 = Object.values(elementMaker).filter(self2=>{
                        return  self2.id == `${self}` || self2.source == `${self}` 
                    })
                    filerted2.map(self3=>{
                        if(master[self3.id] == undefined){
                            Object.assign(master,{[self3.id]:self3})
                        }
                        if(self3.target != undefined){
                            Object.assign(secondtarget,{[self3.target]:{}})
                            if(master[elementMaker[self3.target].id] == undefined){
                                Object.assign(master,{[elementMaker[self3.target].id]: elementMaker[self3.target]})
                            }
                        }
                    })
                })
                Object.keys(secondsource).map(self=>{
                    if(master[self] == undefined){
                        Object.assign(master,{[elementMaker[self].id]: elementMaker[self]})
                    }
                    const filerted2 = Object.values(elementMaker).filter(self2=>{
                        return  self2.id == `${self}` || self2.target == `${self}` 
                    })
                    filerted2.map(self3=>{
                        if(master[self3.id] == undefined){
                            Object.assign(master,{[self3.id]:self3})
                        }
                        if(self3.source != undefined){
                            Object.assign(secondsource,{[self3.source]:{}})
                            if(master[elementMaker[self3.source].id] == undefined){
                                Object.assign(master,{[elementMaker[self3.source].id]: elementMaker[self3.source]})
                            }
                        }
                    })
                })
                //fifth
                Object.keys(secondtarget).map(self=>{
                    if(master[self] == undefined){
                        Object.assign(master,{[elementMaker[self].id]: elementMaker[self]})
                    }
                    const filerted2 = Object.values(elementMaker).filter(self2=>{
                        return  self2.id == `${self}` || self2.source == `${self}` 
                    })
                    filerted2.map(self3=>{
                        if(master[self3.id] == undefined){
                            Object.assign(master,{[self3.id]:self3})
                        }
                        if(self3.target != undefined){
                            Object.assign(secondtarget,{[self3.target]:{}})
                            if(master[elementMaker[self3.target].id] == undefined){
                                Object.assign(master,{[elementMaker[self3.target].id]: elementMaker[self3.target]})
                            }
                        }
                    })
                })
                Object.keys(secondsource).map(self=>{
                    if(master[self] == undefined){
                        Object.assign(master,{[elementMaker[self].id]: elementMaker[self]})
                    }
                    const filerted2 = Object.values(elementMaker).filter(self2=>{
                        return  self2.id == `${self}` || self2.target == `${self}` 
                    })
                    filerted2.map(self3=>{
                        if(master[self3.id] == undefined){
                            Object.assign(master,{[self3.id]:self3})
                        }
                        if(self3.source != undefined){
                            Object.assign(secondsource,{[self3.source]:{}})
                            if(master[elementMaker[self3.source].id] == undefined){
                                Object.assign(master,{[elementMaker[self3.source].id]: elementMaker[self3.source]})
                            }
                        }
                    })
                })
                //sixth
                Object.keys(secondtarget).map(self=>{
                    if(master[self] == undefined){
                        Object.assign(master,{[elementMaker[self].id]: elementMaker[self]})
                    }
                    const filerted2 = Object.values(elementMaker).filter(self2=>{
                        return  self2.id == `${self}` || self2.source == `${self}` 
                    })
                    filerted2.map(self3=>{
                        if(master[self3.id] == undefined){
                            Object.assign(master,{[self3.id]:self3})
                        }
                        if(self3.target != undefined){
                            Object.assign(secondtarget,{[self3.target]:{}})
                            if(master[elementMaker[self3.target].id] == undefined){
                                Object.assign(master,{[elementMaker[self3.target].id]: elementMaker[self3.target]})
                            }
                        }
                    })
                })
                Object.keys(secondsource).map(self=>{
                    if(master[self] == undefined){
                        Object.assign(master,{[elementMaker[self].id]: elementMaker[self]})
                    }
                    const filerted2 = Object.values(elementMaker).filter(self2=>{
                        return  self2.id == `${self}` || self2.target == `${self}` 
                    })
                    filerted2.map(self3=>{
                        if(master[self3.id] == undefined){
                            Object.assign(master,{[self3.id]:self3})
                        }
                        if(self3.source != undefined){
                            Object.assign(secondsource,{[self3.source]:{}})
                            if(master[elementMaker[self3.source].id] == undefined){
                                Object.assign(master,{[elementMaker[self3.source].id]: elementMaker[self3.source]})
                            }
                        }
                    })
                })
            
            if(commandfilter != undefined){
                setelements(Object.values(master))
                setfinshedrunning(true)
            } else {
                setelements(Object.values(elementMaker))
                setfinshedrunning(true)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[finshedrunning,showMap,setShowMap,commandfilter])

       //type selector2
       const CondSelect2 = (e) => {
        if (e !== null) {
            setcommandfilter(e.value)
        } else {
            setcommandfilter();
        }
        };

        const [showinfo,setshowinfo] = useStateIfMounted(false);

        const BTbutton = () => {
            if (activeBT == false) {
                setactiveBTsearch("true")
            } else {
                setactiveBTsearch("")
            }
            setactiveBT((prevValue) => !prevValue);
        }

        const FRbutton = () => {
            if (activeFR == false) {
                setactiveFRsearch("true")
            } else {
                setactiveFRsearch("")
            }
            setactiveFR((prevValue) => !prevValue);
        }

        const LDbutton = () => {
            if (activeLD == false) {
                setactiveLDsearch("true")
            } else {
                setactiveLDsearch("")
            }
            setactiveLD((prevValue) => !prevValue);
        }

        const EXbutton = () => {
            if (activeEX == false) {
                setactiveEXsearch("true")
            } else {
                setactiveEXsearch("")
            }
            setactiveEX((prevValue) => !prevValue);
        }

        const S2button = () => {
            if (activeS2 == false) {
                setactiveS2search("true")
            } else {
                setactiveS2search("")
            }
            setactiveS2((prevValue) => !prevValue);
        }

        const S1button = () => {
            if (activeS1 == false) {
                setactiveS1search("true")
            } else {
                setactiveS1search("")
            }
            setactiveS1((prevValue) => !prevValue);
        }
        const AAbutton = () => {
            if (activeAA == false) {
                setactiveAAsearch("true")
            } else {
                setactiveAAsearch("")
            }
            setactiveAA((prevValue) => !prevValue);
        }

        const CallLDbutton = () => {
            if (activeCALLLD == false) {
                setactiveCALLLDsearch("true")
            } else {
                setactiveCALLLDsearch("")
            }
            setactiveCALLLD((prevValue) => !prevValue);
        }
        const Call75button = () => {
            if (activeCALL75== false) {
                setactiveCALL75search("true")
            } else {
                setactiveCALL75search("")
            }
            setactiveCALL75((prevValue) => !prevValue);
        }
        const HPbutton = () => {
            if (activeHP== false) {
                setactiveHPsearch("true")
            } else {
                setactiveHPsearch("")
            }
            setactiveHP((prevValue) => !prevValue);
        }
        const BRVbutton = () => {
            if (activeBRV== false) {
                setactiveBRVsearch("true")
            } else {
                setactiveBRVsearch("")
            }
            setactiveBRV((prevValue) => !prevValue);
        }

          //clear
  const resetbutton = () =>{
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

    if(ability_data.length == 0){
        return(
            <div className='nonenemyholder enemyholderstyling'>
                No Data
            </div>
        )
    } else{
    return(
        <div>
                <div className="filterholder noselect" id={showFilter ? "showfilteren" : "hiddenfilteren"}>
                    <div className="similarbanner">Subcategories</div>
                    <div className="filterholderflair">
                        <ul className='bufftypes'>
                        {showBT == true ? 
                        <Tippy content="Burst Attacks">
                        <li onClick={BTbutton} className={`${activeBT == true ? "filteractive": "filterinactive"} buffbutton wpbtbutton`}>
                            </li>
                        </Tippy>
                        :""}
                        {showFR == true ? 
                        <Tippy content="Force Attacks">
                        <li onClick={FRbutton} className={`${activeFR == true ? "filteractive": "filterinactive"} buffbutton wpfrbutton`}>
                            </li>
                            </Tippy>
                        :""}
                        {showLD == true ? 
                        <Tippy content="Limited Attacks">
                        <li onClick={LDbutton} className={`${activeLD == true ? "filteractive": "filterinactive"} buffbutton wpldbutton`}>
                            </li>
                        </Tippy>
                        :""}
                        {showEX == true ? 
                         <Tippy content="EX Attacks">
                        <li onClick={EXbutton} className={`${activeEX == true ? "filteractive": "filterinactive"} buffbutton wpexbutton`}>
                            </li>
                        </Tippy>
                        :""}
                        {showS2 == true ? 
                        <Tippy content="Crystal Lv20 Attacks">
                        <li onClick={S2button} className={`${activeS2 == true ? "filteractive": "filterinactive"} buffbutton cl20button`}>
                            </li>
                        </Tippy>
                        :""}
                        {showS1 == true ? 
                        <Tippy content="Starting Attacks">
                        <li onClick={S1button} className={`${activeS1 == true ? "filteractive": "filterinactive"} buffbutton startingButton`}>
                            </li>
                        </Tippy>
                        :""}
                        <br/>
                        {showAA == true ? 
                        <Tippy content="AA Attacks">
                        <li onClick={AAbutton} className={`${activeAA == true ? "filteractive": "filterinactive"} buffbutton abuffButton`}>
                            </li>
                        </Tippy>
                        :""}
                        {showCALLLD == true ? 
                        <Tippy content="LD Call Attacks">
                        <li onClick={CallLDbutton} className={`${activeCALLLD == true ? "filteractive": "filterinactive"} buffbutton call2button`}>
                            </li>
                        </Tippy>
                        :""}
                        {showCALL75 == true ? 
                        <Tippy content="Crystal L75 Call Attacks">
                        <li onClick={Call75button} className={`${activeCALL75 == true ? "filteractive": "filterinactive"} buffbutton call1button`}>
                            </li>
                            </Tippy>
                        :""}
                        {showHP == true ? 
                        <Tippy content="HP Attacks">
                        <li onClick={HPbutton} className={`${activeHP == true ? "filteractive": "filterinactive"} buffbutton hpplusattackiconbutton`}>
                            </li>
                        </Tippy>
                        :""}
                        {showBRV == true ? 
                        <Tippy content="BRV Attacks">
                        <li onClick={BRVbutton} className={`${activeBRV == true ? "filteractive": "filterinactive"} buffbutton brvattackiconbutton`}>
                            </li>
                        </Tippy>
                        :""}
                        </ul>
                    <div className="similarbanner"><div className='infoclick' onClick={()=>{setshowinfo((preValue)=>!preValue)}}>Advanced{showinfo ? <TiArrowSortedUp className="uparrow"/> : <TiArrowSortedDown className="downarrow"/>}</div></div> 
                    
                    {showinfo == false? <div style={{paddingBottom:"5px"}}></div>:
                    <div className='muliwrap'>
                      <div className='makespace'>
                        <div className="not_rangeholder">
                          Ability ID
                          <div className="labelmax">
                        <input 
                        className="not_numberbox" 
                        placeholder="12345"
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
                        <label className="MergeText">Upgraded</label>
                        </Tippy>
                        <div key="mergecheck1" className={`${upgraded == true ? "nodisplay" :  `uncheck`}`} onClick={upgradedbutton}/>
                        <div key="mergecheck2" className={`${upgraded == true ? "check" :  `nodisplay`}`} onClick={upgradedbutton}/>
                    </div>
                    </div>
                    <div className="search-reverse-holder">
                      <div className="search-holder">
                      <IoSearch className="innersearchicon"/>
                        <input 
                            className="search-bar" 
                            type="text"
                            placeholder="Name Search"
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
                        <div className="mapbox">
                              
                                  <div className="centertext" onClick={showmapbutton}>Map</div>
                              
                          </div>
                          <Tippy content="Reset Filters" className="tooltip" >
                            <div onClick={resetbutton} className={`clearbox`} ><div className="makecenter">Reset&nbsp;<FaUndoAlt  className={`clearbutton ${clearFilter ? "loop": ""}`} ></FaUndoAlt></div></div>
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
                        <div className='subtextbottom'>Remove upgraded filter to generate all mapped abilities</div>
                        </div>
                            <div className="filterholderflair">
                            <MapMaker
                                key={elements}
                                initialElements={elements}
                                />
                            </div>
                    </div>
                <div className="characterpageholder">
                    <Character_Ability_List
                    tag_display={"brvattackicon"}
                    character_ability={commandList.filter(self=>self.BRV == true)}
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
                    ailment_group={ailment_group}
                    command_group={command_group}
                    enemy_resist={enemy_resist}
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
                    formatting={formatting}
                    all_options={false}
                    buff_data={buff_data}
                    reverse={reverse}
                    />
                    <Character_Ability_List
                    tag_display={"hpattackicon"}
                    character_ability={commandList.filter(self=>self.HP == true)}
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
                    ailment_group={ailment_group}
                    command_group={command_group}
                    enemy_resist={enemy_resist}
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
                    formatting={formatting}
                    all_options={false}
                    buff_data={buff_data}
                    reverse={reverse}
                    />
                    <Character_Ability_List
                    tag_display={"cl1"}
                    character_ability={commandList.filter(self=>self.S1 == true)}
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
                    ailment_group={ailment_group}
                    command_group={command_group}
                    enemy_resist={enemy_resist}
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
                    formatting={formatting}
                    all_options={false}
                    buff_data={buff_data}
                    reverse={reverse}
                    />
                    <Character_Ability_List
                    tag_display={"cl20"}
                    character_ability={commandList.filter(self=>self.S2 == true)}
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
                    ailment_group={ailment_group}
                    command_group={command_group}
                    enemy_resist={enemy_resist}
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
                    formatting={formatting}
                    all_options={false}
                    buff_data={buff_data}
                    reverse={reverse}
                    />
                    <Character_Ability_List
                    tag_display={"aaabilityButton"}
                    character_ability={commandList.filter(self=>self.AA == true)}
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
                    ailment_group={ailment_group}
                    command_group={command_group}
                    enemy_resist={enemy_resist}
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
                    formatting={formatting}
                    all_options={false}
                    buff_data={buff_data}
                    reverse={reverse}
                    />
                    <Character_Ability_List
                    tag_display={"wpex"}
                    character_ability={commandList.filter(self=>self.EX == true)}
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
                    ailment_group={ailment_group}
                    command_group={command_group}
                    enemy_resist={enemy_resist}
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
                    formatting={formatting}
                    all_options={false}
                    buff_data={buff_data}
                    reverse={reverse}
                    />
                    <Character_Ability_List
                    tag_display={"wpld"}
                    character_ability={commandList.filter(self=>self.LD == true)}
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
                    ailment_group={ailment_group}
                    command_group={command_group}
                    enemy_resist={enemy_resist}
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
                    formatting={formatting}
                    all_options={false}
                    buff_data={buff_data}
                    reverse={reverse}
                    />
                    <Character_Ability_List
                    tag_display={"wpbt"}
                    character_ability={commandList.filter(self=>self.BT == true|| self.BTplus == true)}
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
                    ailment_group={ailment_group}
                    command_group={command_group}
                    enemy_resist={enemy_resist}
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
                    formatting={formatting}
                    all_options={false}
                    buff_data={buff_data}
                    reverse={reverse}
                    />
                    <Character_Ability_List
                    tag_display={"wpfr"}
                    character_ability={commandList.filter(self=>self.FR == true || self.FRExt == true)}
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
                    ailment_group={ailment_group}
                    command_group={command_group}
                    enemy_resist={enemy_resist}
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
                    formatting={formatting}
                    all_options={false}
                    buff_data={buff_data}
                    reverse={reverse}
                    />
                    <Character_Ability_List
                    tag_display={"call1"}
                    character_ability={commandList.filter(self=>self.Call75 == true)}
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
                    ailment_group={ailment_group}
                    command_group={command_group}
                    enemy_resist={enemy_resist}
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
                    formatting={formatting}
                    all_options={false}
                    buff_data={buff_data}
                    reverse={reverse}
                    />
                    <Character_Ability_List
                    tag_display={"call2"}
                    character_ability={commandList.filter(self=>self.CallLD == true)}
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
                    ailment_group={ailment_group}
                    command_group={command_group}
                    enemy_resist={enemy_resist}
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
                    formatting={formatting}
                    all_options={false}
                    buff_data={buff_data}
                    reverse={reverse}
                    />
                    <Character_Ability_List
                    tag_display={"unknown"}
                    character_ability={upgraded == true ? [] : commandList.filter(self=>self.command && self.command.rank == undefined || self.command == undefined)}
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
                    ailment_group={ailment_group}
                    command_group={command_group}
                    enemy_resist={enemy_resist}
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
export default Ability_bycharacter