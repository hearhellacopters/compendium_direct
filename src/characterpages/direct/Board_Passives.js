import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import Tippy from '../../formatting/TippyDefaults'
import { useStateIfMounted } from "use-state-if-mounted";
import { slice, concat, } from 'lodash';
import Select from 'react-select';
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

const Sum_Fix_Passive =({
  sum_fix_passive,
  ver,
  loc,
  file, 
  newcompare,
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
  formatting
})=>{

    const [rawData, setrawData] = useState(sum_fix_passive);

    const banerDisplayTerm = "character board passives";

    const startinglimit = 999

    const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null  ? true : false);
    const [clearFilter, setclearFilter] = useStateIfMounted(false);

    //show icons

    const [showLDEXT, setshowLDEXT] = useStateIfMounted(false);
    const [showLDCallEXT, setshowLDCallEXT] = useStateIfMounted(false);
    const [showFRECHO, setshowFRECHO] = useStateIfMounted(false);
    const [showFREXT, setshowFREXT] = useStateIfMounted(false);

    useEffect(()=>{
      if(Object.values(sum_fix_passive).some(self=>self.passive && self.passive.loc_tag == "board4ext")){
        setshowLDEXT(true)
      }
      if(Object.values(sum_fix_passive).some(self=>self.passive && self.passive.loc_tag == "board4cext")){
        setshowLDCallEXT(true)
      }
      if(Object.values(sum_fix_passive).some(self=>self.passive && self.passive.loc_tag == "board5echo")){
        setshowFRECHO(true)
      }
      if(Object.values(sum_fix_passive).some(self=>self.passive && self.passive.loc_tag == "board5ext")){
        setshowFREXT(true)
      }
      // eslint-disable-next-line
  },[sum_fix_passive])

  const [activeLDEXTsearch, setactiveLDEXTsearch] = useQueryParam("LDEXT", "");
  const [activeLDCallEXTsearch, setactiveLDCallEXTsearch] = useQueryParam("LDCallEXT", "");
  const [activeFRECHOsearch, setactiveFRECHOsearch] = useQueryParam("FRECHO", "");
  const [activeFREXTsearch, setactiveFREXTsearch] = useQueryParam("FREXT", "");

  const [activeLDEXT, setactiveLDEXT] = useStateIfMounted(getQueryStringVal("LDEXT") != null  ? true : false);
  const [activeLDCallEXT, setactiveLDCallEXT] = useStateIfMounted(getQueryStringVal("LDCallEXT") != null  ? true : false);
  const [activeFRECHO, setactiveFRECHO] = useStateIfMounted(getQueryStringVal("FRECHO") != null  ? true : false);
  const [activeFREXT, setactiveFREXT] = useStateIfMounted(getQueryStringVal("FREXT") != null  ? true : false);

  useEffect(()=>{
    if(activeLDEXT == false){
      setactiveLDEXTsearch("")
    } else {
      setactiveLDEXTsearch("true")
    }
    if(activeLDCallEXT == false){
      setactiveLDCallEXTsearch("")
    } else {
      setactiveLDCallEXTsearch("true")
    }
    if(activeFRECHO == false){
      setactiveFRECHOsearch("")
    } else {
      setactiveFRECHOsearch("true")
    }
    if(activeFREXT == false){
      setactiveFREXTsearch("")
    } else {
      setactiveFREXTsearch("true")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[activeLDEXT,activeFRECHO,activeFREXT,activeLDCallEXT])

  const LDEXTbutton = () => {
    setactiveLDEXT((prevValue) => !prevValue);
  }

  const LDCallEXTbutton = () => {
    setactiveLDCallEXT((prevValue) => !prevValue);
  }

  const FRECHObutton = () => {
    setactiveFRECHO((prevValue) => !prevValue);
  }

  const FREXTbutton = () => {
    setactiveFREXT((prevValue) => !prevValue);
  }

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
    const filterholder = [];

    //buttons
    if(activeLDEXT == true){
      const filteredout = rawData.filter(
        (ef) => 
        ef && ef.passive && ef.passive.loc_tag == "board4ext"
      );
      filterholder.push(...filteredout);
    }

    if(activeLDCallEXT == true){
      const filteredout = rawData.filter(
        (ef) => 
        ef && ef.passive && ef.passive.loc_tag == "board4cext"
      );
      filterholder.push(...filteredout);
    }

    if(activeFREXT == true){
      const filteredout = rawData.filter(
        (ef) => 
        ef && ef.passive && ef.passive.loc_tag == "board5ext"
      );
      filterholder.push(...filteredout);
    }

    if(activeFRECHO == true){
      const filteredout = rawData.filter(
        (ef) => 
        ef && ef.passive && ef.passive.loc_tag == "board5echo"
      );
      filterholder.push(...filteredout);
    }

    if (filterholder.length === 0) {
      filterholder.push(...rawData);
      }

      const makeUnique = filterholder
        .filter(onlyUnique)
        .sort((a, b) => 
        reverse === false ?
        b.passive_num - a.passive_num:
        a.passive_num - b.passive_num);
        const searchit = makeUnique.filter((ailment) =>
        (`
        ${ailment.ability == true ? ailment.command && ailment.command.command ? ver =="GL" ? ailment.command.command.name : ailment.command.command.glname : "": ""} 
        ${ailment.ability == true ? ailment.command && ailment.command.command ? ver =="GL" ? ailment.command.command.jpname : ailment.command.command.name : "": ""} 
        ${ver == "GL" && ailment.ability != true ? ailment.passive && ailment.passive.jpname != undefined? ailment.passive.jpname : "" : ""} 
        ${ailment.passive != undefined ? ailment.passive.name : ""}
        ${ver == "JP" && ailment.ability != true ? ailment.passive != undefined ? ailment.passive.glname : "" :""}
          - #${ailment.passive != undefined ?  ailment.passive.pa_id : ""}`).toLowerCase().includes(searchTerm)
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
  }, [activeLDCallEXT,activeLDEXT,activeFRECHO,activeFREXT, searchTerm, clearFilter, condFilter, condFilter2, condFilter3, condFilter4, reverse]);


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
    setactiveLDEXT(false)
    setactiveLDCallEXT(false)
    setactiveFREXT(false)
    setactiveFRECHO(false)

    setactiveFRECHOsearch("")
    setactiveFREXTsearch("")
    setactiveLDEXTsearch("")
    setactiveLDCallEXTsearch("")
    setReversesearch("")
    setTEXTsearch("")
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
            <div className="charfilterspacer"/>
            <div key="filter1" onClick={showfilterbutton} className="charfilter"><span className="filterstext"></span>{showFilter ? <TiArrowSortedUp className="uparrow"/> : <TiArrowSortedDown className="downarrow"/>}</div>
            <div className="event-search-reverse-holder">
              {showFilter == false ? 
              <div className="char-search-reverse-holder">
                <IoSearch className="searchicon"/>
              <div className="search-holder el">
                <input 
                    className="char-search-bar" 
                    type="text"
                    placeholder="Name Search"
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
            </div>
                <div className="filterholder noselect" id={showFilter ? "showfilteren" : "hiddenfilteren"}>
                  <div className="similarbanner">Subcategories</div>
                  <div className="filterholderflair">
                  <ul className='bufftypes'>
                        {showFREXT == true ? 
                        <Tippy content="FR Extension">
                        <li onClick={FREXTbutton} className={`${activeFREXT == true ? "filteractive": "filterinactive"} buffbutton board5extbutton`}>
                            </li>
                        </Tippy>
                        :""}
                        {showFRECHO == true ? 
                        <Tippy content="FR Echo">
                        <li onClick={FRECHObutton} className={`${activeFRECHO == true ? "filteractive": "filterinactive"} buffbutton board5echobutton`}>
                            </li>
                        </Tippy>
                        :""}
                        {showLDEXT == true ? 
                        <Tippy content="LD Extension">
                        <li onClick={LDEXTbutton} className={`${activeLDEXT == true ? "filteractive": "filterinactive"} buffbutton ench4extbutton`}>
                            </li>
                        </Tippy>
                        :""}
                        {showLDCallEXT == true ? 
                        <Tippy content="Call LD Extension">
                        <li onClick={LDCallEXTbutton} className={`${activeLDCallEXT == true ? "filteractive": "filterinactive"} buffbutton ench4cextbutton`}>
                            </li>
                        </Tippy>
                        :""}
                      </ul>
                      <br/>
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

                          <Tippy content="Reset Filters" className="tooltip" >
                            <div onClick={resetbutton} className={`clearbox`} ><div className="makecenter">Reset&nbsp;<FaUndoAlt  className={`clearbutton ${clearFilter ? "loop": ""}`} ></FaUndoAlt></div></div>
                          </Tippy>
                          </div>
                  </div>
                </div>
                <div className="characterpageholder">
                {listPassives.length > 0 ?  (
                listPassives.map(passive => (
                passive.ability == true ?
                  <Character_Ability_Pars
                  key={passive.sfp_id}

                  character_ability={passive.command}

                  ver={ver}
                  loc={loc}
                  file={"character_ability"}

                  CastNames={CastNames}
                  enemy_type={enemy_type}
                  cast_targets={cast_targets}
                  passivenames={passivenames}
                  equipmentpassivenames={equipmentpassivenames}
                  CondData={CondData}

                  Ailment_Effects={Ailment_Effects}

                  MessageData_Category={MessageData_Category}
                  MessageData_FFSeries={MessageData_FFSeries}
                  char_id={char_id}

                  option_trans_data={option_trans_data}
                  command_data_effects={command_data_effects}
                  passive_effects_data={passive_effects_data}
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

                  span={true}
                  formatting={formatting}
                  tag_override={passive.passive_num == 27 ? "board4cext" : "board4c"}
                  />
                :passive.passive && 
                <Passive_Ability_Formatting 
                key={passive.sfp_id}
                passive_ability={passive.passive}
                ver={ver}
                loc={loc}
                file={"exskill"}
                Single={true}
                passivenames={passivenames}
                equipmentpassivenames={equipmentpassivenames}
                command_data_effects={command_data_effects}
                AilmentNames={AilmentNames}
                CommandNames={CommandNames}
                CondData={CondData}
                Ailment_Effects={Ailment_Effects}
                MessageData_Category={MessageData_Category}
                MessageData_FFSeries={MessageData_FFSeries}
                passive_effects_data={passive_effects_data}
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
                target_range_={target_range_}
                cp_cost={passive.cp}
                board_cost={passive.board_point}
                chara_id_passoff={passive.chara_id}
                formatting={formatting}
                release={passive.start_date}

                span={true}
                banner_color={"board4banner"}
                base_color={"bluebase"}
                />
                ))) : (
                  <div className=''>No Data</div>
                )}
                </div>
        </div>
    )
}
export default Sum_Fix_Passive