import React, {useState, useEffect} from 'react';
import Tippy from '../../formatting/TippyDefaults'
import { useStateIfMounted } from "use-state-if-mounted";
import { slice, concat, } from 'lodash';
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5'; 
import { FaUndoAlt } from 'react-icons/fa'
import Passive_Ability_Formatting from './formatting/passives/Passive_Ability_Formatting';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import { getQuery, getQueryStringVal, useQueryParam } from '../../processing/urlparams'
import Character_Ability_Pars from './formatting/command_ability/Character_Ability_Pars.js'

const EXP_Passives =({
  ver,
  loc,
  file, 
  newcompare,
  passive_effects_data,
  passivenames,
  equipmentpassivenames,
  AilmentNames,
  CommandNames,
  CondData,
  Ailment_Effects,
  command_data_effects,
  option_trans_data,
  enemy_resist,
  hit_data_effects,
  MessageData_Category,
  MessageData_FFSeries,
  ailment_group,
  command_group,

  passive_data,

  char_id,
  cast_targets,
  enemy_type,
  hit_data,
  formatting
})=>{

    const [rawData, setrawData] = useState(passive_data);

    const banerDisplayTerm = "character board passives";

    const startinglimit = 999

    const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null  ? true : false);
    const [clearFilter, setclearFilter] = useStateIfMounted(false);

    const [loop, setLoop] = useStateIfMounted(false);
    const [reverse, setReverse] = useState(getQueryStringVal("rev") != null  ? true : false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchdisplay, setsearchdisplay] = useState("");
    const [condFilter, setCondFilter] = useState("");
    const [condFilter2, setCondFilter2] = useState("");
    const [condFilter3, setCondFilter3] = useState("");
    const [condFilter4, setCondFilter4] = useState("");
    const [filterResults, setFilterResults] = useState(rawData);
    const [searchResults, setSearchResults] = useState(rawData);
    const [limits, setLimits] = useState(startinglimit);
    const [listDisplay, setListDisplay] = useState(
      slice(rawData, 0, startinglimit)
    );
    const [listLength, setListLength] = useState(listDisplay.length);
    const [showLoadMore, setShowLoadMore] = useState(true);
    const [displayBanner, setDisplayBanner] = useState(
      `Displaying ${listLength} of ${rawData.length} ${banerDisplayTerm}`
    );
    const [Typesearch, setTypesearch] = useQueryParam("char", "");
    const [Typesearch2, setTypesearch2] = useQueryParam("board", "");
    const [Typesearch3, setTypesearch3] = useQueryParam("effect", "");
    const [Typesearch4, setTypesearch4] = useQueryParam("require", "");
    const { protocol, pathname, host } = window.location;
    const query = getQuery();
    const url = `${protocol}//${host}${pathname}?${query.toString()}`
    const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
    const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
    const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");

    const showfilterbutton = () => {
    if (showFilter == false) {
        setFiltersearch("true")
    } else {
        setFiltersearch("")
    }
    setShowFilter((prevValue) => !prevValue);
    }

    useEffect(() => {
      if (showFilter == false) {
        setFiltersearch("")
      } else {
        setFiltersearch("true")
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[showFilter])

    //button toogle
    useEffect(() => {
      if (reverse == true) {
        setReversesearch("true")
    } else {
        setReversesearch("")
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Reversesearch,setReverse,reverse])

    const reversebutton = () => {
     
    setLoop(true);
    setReverse((prevValue) => !prevValue);
    setTimeout(() => setLoop(false), 1000);
    };

    useEffect(() => {
      //type params
      if(Typesearch != ""){
       const filteredtype = Object.values(char_id).filter(self => self.name == getQueryStringVal("char"))
       if(filteredtype.length != 0){
         setTypesearch(getQueryStringVal("char"))
         setCondFilter(filteredtype[0].id)
       } else{
         setTypesearch("")
         setCondFilter("")
       }
     }
   },[setCondFilter,char_id,Typesearch,setTypesearch])

   
   useEffect(() => {
    //type params2
    if(Typesearch2 != ""){
     const filteredtype2 = Object.values(passive_effects_data.passive_types).filter(self => self.label == getQueryStringVal("board"))
     if(filteredtype2.length != 0){
       setTypesearch2(getQueryStringVal("board"))
       setCondFilter2(filteredtype2[0].passive_types)
     } else{
       setTypesearch2("")
       setCondFilter2("")
     }
   }
 },[setCondFilter2,passive_effects_data.passive_types,Typesearch2,setTypesearch2])

 useEffect(() => {
  //type params2
  if(Typesearch3 != ""){
   const filteredtype3 = Object.values(passive_effects_data.effect_).filter(self => self.effect_type == getQueryStringVal("effect"))
   if(filteredtype3.length != 0){
     setTypesearch3(getQueryStringVal("effect"))
     setCondFilter3(filteredtype3[0].id)
   } else{
     setTypesearch3("")
     setCondFilter3("")
   }
 }
},[setCondFilter3,passive_effects_data.effect_,Typesearch3,setTypesearch3])

useEffect(() => {
  //type params2
  if(Typesearch4 != ""){
   const filteredtype4 = Object.values(passive_effects_data.require_passive).filter(self => self.require_ == getQueryStringVal("require"))
   if(filteredtype4.length != 0){
     setTypesearch4(getQueryStringVal("require"))
     setCondFilter4(filteredtype4[0].id)
   } else{
     setTypesearch4("")
     setCondFilter4("")
   }
 }
},[setCondFilter4,passive_effects_data.require_passive,Typesearch4,setTypesearch4])

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

            //type selector2
    const CondSelect2 = (e) => {
      if (e !== null) {
          setTypesearch2(e.label)
          setCondFilter2(e.value);
      } else {
          setCondFilter2("");
          setTypesearch2("")
      }
      };

      //type selector3
    const CondSelect3 = (e) => {
      if (e !== null) {
          setTypesearch3(e.label)
          setCondFilter3(e.value);
      } else {
          setCondFilter3("");
          setTypesearch3("")
      }
    };

        //type selector4
        const CondSelect4 = (e) => {
          if (e !== null) {
              setTypesearch4(e.label)
              setCondFilter4(e.value);
          } else {
              setCondFilter4("");
              setTypesearch4("")
          }
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
        const newlistdisplay = concat(
        listDisplay,
        slice(searchResults, limits, newlimits)
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
    
     //filter
  useEffect(() => {
    const filterholder = rawData;

      const makeUnique = filterholder
        .filter(onlyUnique)
        .sort((a, b) => 
        reverse === false ?
        a.level - b.level:
        b.level - a.level);
        const searchit = makeUnique.filter((ailment) =>
        (`
        ${ailment.command && ailment.command.command ? ver =="GL" ? ailment.command.command.name : ailment.command.command.glname : ""} 
        ${ailment.command && ailment.command.command ? ver =="GL" ? ailment.command.command.jpname : ailment.command.command.name : ""} 
        ${ver == "GL" && ailment.awakening_type != -1 ? ailment.passive && ailment.passive.jpname != undefined? ailment.passive.jpname : "" : ""} 
        ${ailment.passive != undefined ? ailment.passive.name : ""}
        ${ver == "JP" && ailment.awakening_type != -1 ? ailment.passive != undefined ? ailment.passive.glname : "" :""}
          - #${ailment.passive != undefined ?  ailment.passive.sfp_id : ""}`).toLowerCase().includes(searchTerm)
        );
        const getailmentfilter = searchit.filter(function (ef) {
          const newfilterpull = ef.passive && ef.passive.loc_tag == condFilter2;
          if(condFilter2 !== "") {
            return newfilterpull;
          } else {
            return ef
        }});
        setFilterResults(makeUnique);
        setSearchResults(getailmentfilter);
        const newlistdisplay = slice(getailmentfilter, 0, limits);
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
  }, [searchTerm, clearFilter, condFilter, condFilter2, condFilter3, condFilter4, reverse]);

  //type list
  const typeListArray = Object.values(char_id).map((typeListUnique) => ({
    value: typeListUnique.id,
    label: typeListUnique.name
    }));

    
    const typeListArray2 = [
      {
      value: "board1",
      label: "S1 Board"
      },
      {
      value: "board2",
      label:	"S2 Board"
      },
      {
      value: "board3",
      label:	"EX Board"
      },
      {
      value: "board4",
      label:	"LD Board"
      },
      {
        value: "board4ext",
        label:	"LD EXT"
      }
    ]


    const typeListArray3 = Object.values(passive_effects_data.effect_).filter(self=>{return self.effect_type != undefined}).map((typeListUnique) =>({
      value: typeListUnique.id,
      label: typeListUnique.effect_type
    }));

    const typeListArray4 = Object.values(passive_effects_data.require_passive).filter(self=>{return self.require_str != undefined}).map((typeListUnique) =>({
      value: typeListUnique.id,
      label: typeListUnique.require_
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

        //clear
  const resetbutton = () =>{
    setclearFilter(true);
    setReverse(false)

    setReversesearch("")
    setTEXTsearch("")
    setTypesearch("")
    setTypesearch2("")
    setTypesearch3("")
    setTypesearch4("")
    setsearchdisplay("");
    setSearchTerm("");
    setCondFilter("")
    setCondFilter2("")
    setCondFilter3("")
    setCondFilter4("")
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
    

  const listPassives = listDisplay;

  const effect_ = passive_effects_data.effect_
  const require_passive = passive_effects_data.require_passive
  const passive_target = passive_effects_data.passive_target
  const trap_type = passive_effects_data.trap_type
  const param_id = passive_effects_data.param_id
  const attack_type = passive_effects_data.attack_type
  const killer_type_passive = passive_effects_data.killer_type
  const elementid_1 = passive_effects_data.elementid_1

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

  for (var key in effect_) {
    var obj = effect_[key].effect_type;
    if (obj == undefined) {
        delete effect_[key]
    }
  }

  for (var key2 in require_passive) {
    var obj2 = require_passive[key2].require_str;
    if (obj2 == undefined) {
        delete require_passive[key2]
    }
  }

  for (var key3 in passive_target) {
    var obj3 = passive_target[key3].passive_target;
    if (obj3 == undefined) {
        delete passive_target[key3]
    }
  }


    return(
        <div>
                <div className="characterpageholder">
                {listPassives.length > 0 ?  (
                listPassives.map(passive => (
                passive.ability_type == 1 && passive.command != undefined?
                  <Character_Ability_Pars
                  key={passive.cla_id}

                  character_ability={passive.command}

                  hit_data={hit_data}
                  ver={ver}
                  loc={loc}
                  file={"character_ability"}

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
                  tag_override={`cl${passive.level}`}
                  />
                :passive.passive && 
                <Passive_Ability_Formatting 
                key={passive.cla_id}
                passive_ability={passive.passive}
                ver={ver}
                loc={loc}
                file={"passive_ability"}
                Single={true}
                passivenames={passivenames}
                equipmentpassivenames={equipmentpassivenames}
                AilmentNames={AilmentNames}
                CommandNames={CommandNames}
                CondData={CondData}
                Ailment_Effects={Ailment_Effects}
                MessageData_Category={MessageData_Category}
                MessageData_FFSeries={MessageData_FFSeries}
                passive_effects_data={passive_effects_data}
                command_data_effects={command_data_effects}
                ailment_group={ailment_group}
                command_group={command_group}
                CastNames={CastNames}
                enemy_type={enemy_type}
                char_id={char_id}
                cast_targets={cast_targets}
                effect_={effect_}
                require_passive={require_passive}
                passive_target={passive_target}
                trap_type={trap_type}
                param_id={param_id}
                attack_type={attack_type}
                killer_type={killer_type_passive}
                elementid_1={elementid_1}
                cp_cost={passive.cp}
                board_cost={passive.board_point}
                chara_id_passoff={passive.chara_id}
                target_range_={target_range_}
                formatting={formatting}
                tag_overide={`exp${passive.level} notag`}
                />
                ))) : (
                  <div>No Data</div>
                )}
                </div>
        </div>
    )
}
export default EXP_Passives