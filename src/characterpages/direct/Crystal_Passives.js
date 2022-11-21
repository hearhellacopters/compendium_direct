import React, {useState, useEffect} from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import Passive_Ability_Formatting from './formatting/passives/Passive_Ability_Formatting.js'
import Cry_Parm from './Cry_Parm';
import Tippy from '../../formatting/TippyDefaults'
import { slice, concat, } from 'lodash';
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
import Character_Ability_Pars from './formatting/command_ability/Character_Ability_Pars.js'

const Crystal_Passives =({
    crydata,
    ver,
    newcompare,
    loc,
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

    hit_data,
    showFilter
})=>{

    const [rawData, setrawData] = useState(crydata)

    const banerDisplayTerm = "passive abilities";

    const startinglimit = 999

    const [clearFilter, setclearFilter] = useStateIfMounted(false);

    //show icons

    const [showCl50, setshowCl50] = useStateIfMounted(false);
    const [showCl55, setshowCl55] = useStateIfMounted(false);
    const [showCl60, setshowCl60] = useStateIfMounted(false);
    const [showCl70, setshowCl70] = useStateIfMounted(false);
    const [showCl80, setshowCl80] = useStateIfMounted(false);
    const [showCl85, setshowCl85] = useStateIfMounted(false);
    const [showCl88, setshowCl88] = useStateIfMounted(false);

    useEffect(()=>{
      if(Object.values(crydata).some(self=>self.passive && self.passive.loc_tag == "cl50")){
        setshowCl50(true)
      }
      if(Object.values(crydata).some(self=>self.passive && self.passive.loc_tag == "cl55")){
        setshowCl55(true)
      }
      if(Object.values(crydata).some(self=>self.passive && self.passive.loc_tag == "cl60")){
        setshowCl60(true)
      }
      if(Object.values(crydata).some(self=>self.passive && self.passive.loc_tag == "cl70")){
        setshowCl70(true)
      }
      if(Object.values(crydata).some(self=>self.passive && self.passive.loc_tag == "cl80")){
        setshowCl80(true)
      }
      if(Object.values(crydata).some(self=>self.passive && self.passive.loc_tag == "cl85")){
        setshowCl85(true)
      }
      if(Object.values(crydata).some(self=>self.passive && self.passive.loc_tag == "cl88")){
        setshowCl88(true)
      }
      // eslint-disable-next-line
  },[crydata])

  const [activeCl50search, setactiveCl50search] = useQueryParam("Cl50", "");
  const [activeCl55search, setactiveCl55search] = useQueryParam("Cl55", "");
  const [activeCl60search, setactiveCl60search] = useQueryParam("Cl60", "");
  const [activeCl70search, setactiveCl70search] = useQueryParam("Cl70", "");
  const [activeCl80search, setactiveCl80search] = useQueryParam("Cl80", "");
  const [activeCl85search, setactiveCl85search] = useQueryParam("Cl85", "");
  const [activeCl88search, setactiveCl88search] = useQueryParam("Cl88", "");

  const [activeCl50, setactiveCl50] = useStateIfMounted(getQueryStringVal("Cl50") != null  ? true : false);
  const [activeCl55, setactiveCl55] = useStateIfMounted(getQueryStringVal("Cl55") != null  ? true : false);
  const [activeCl60, setactiveCl60] = useStateIfMounted(getQueryStringVal("Cl60") != null  ? true : false);
  const [activeCl70, setactiveCl70] = useStateIfMounted(getQueryStringVal("Cl70") != null  ? true : false);
  const [activeCl80, setactiveCl80] = useStateIfMounted(getQueryStringVal("Cl80") != null  ? true : false);
  const [activeCl85, setactiveCl85] = useStateIfMounted(getQueryStringVal("Cl85") != null  ? true : false);
  const [activeCl88, setactiveCl88] = useStateIfMounted(getQueryStringVal("Cl88") != null  ? true : false);

  useEffect(()=>{
    if(activeCl50 == false){
      setactiveCl50search("")
    } else {
      setactiveCl50search("true")
    }
    if(activeCl55 == false){
      setactiveCl55search("")
    } else {
      setactiveCl55search("true")
    }
    if(activeCl60 == false){
      setactiveCl60search("")
    } else {
      setactiveCl60search("true")
    }
    if(activeCl70 == false){
      setactiveCl70search("")
    } else {
      setactiveCl70search("true")
    }
    if(activeCl80 == false){
      setactiveCl80search("")
    } else {
      setactiveCl80search("true")
    }
    if(activeCl85 == false){
      setactiveCl85search("")
    } else {
      setactiveCl85search("true")
    }
    if(activeCl88 == false){
      setactiveCl88search("")
    } else {
      setactiveCl88search("true")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[activeCl80,activeCl50,activeCl55,activeCl60,activeCl70,activeCl85,activeCl88])

    const [loop, setLoop] = useStateIfMounted(false);
    const [reverse, setReverse] = useState(getQueryStringVal("rev") != null  ? true : false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchdisplay, setsearchdisplay] = useState("");
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
    if(activeCl50 == true){
      const filteredout = rawData.filter(
        (ef) => 
        ef && ef.passive && ef.passive.loc_tag == "cl50"
      );
      filterholder.push(...filteredout);
    }
    if(activeCl55 == true){
      const filteredout = rawData.filter(
        (ef) => 
        ef && ef.passive && ef.passive.loc_tag == "cl55"
      );
      filterholder.push(...filteredout);
    }
    if(activeCl60 == true){
      const filteredout = rawData.filter(
        (ef) => 
        ef && ef.passive && ef.passive.loc_tag == "cl60"
      );
      filterholder.push(...filteredout);
    }
    if(activeCl70 == true){
      const filteredout = rawData.filter(
        (ef) => 
        ef && ef.passive && ef.passive.loc_tag == "cl70"
      );
      filterholder.push(...filteredout);
    }
    if(activeCl80 == true){
      const filteredout = rawData.filter(
        (ef) => 
        ef && ef.passive && ef.passive.loc_tag == "cl80"
      );
      filterholder.push(...filteredout);
    }
    if(activeCl85 == true){
      const filteredout = rawData.filter(
        (ef) => 
        ef && ef.passive && ef.passive.loc_tag == "cl85"
      );
      filterholder.push(...filteredout);
    }
    if(activeCl88 == true){
      const filteredout = rawData.filter(
        (ef) => 
        ef && ef.passive && ef.passive.loc_tag == "cl88"
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
        b.level - a.level:
        a.level - b.level);
        const searchit = makeUnique.filter((passive) =>
        (`
        ${passive.awakening_type == -1 ? passive.command && passive.command.command ? ver =="GL" ? passive.command.command.name : passive.command.command.glname : "": ""} 
        ${passive.awakening_type == -1 ? passive.command && passive.command.command ? ver =="GL" ? passive.command.command.jpname : passive.command.command.name : "": ""} 
        ${passive.awakening_type == 1 ? passive.command && passive.command.command ? ver =="GL" ? passive.command.command.name: passive.command.command.glname : "": ""} 
        ${passive.awakening_type == 1 ? passive.command && passive.command.command ? ver =="GL" ? passive.command.command.jpname : passive.command.command.name : "": ""} 
        ${passive.awakening_type == 2 ? passive.passive && passive.passive ? ver =="GL" ? passive.passive.name : passive.passive.glname : "": ""} 
        ${passive.awakening_type == 2 ? passive.passive && passive.passive ? ver =="GL" ? passive.passive.jpname : passive.passive.name : "": ""} 
        ${passive.awakening_type == 3 ? passive.param : ""} 
        ${passive.awakening_type == 4 ? passive.command && passive.command.command ? ver =="GL" ? passive.command.command.name: passive.command.command.glname : "": ""} 
        ${passive.awakening_type == 4 ? passive.command && passive.command.command ? ver =="GL" ? passive.command.command.jpname : passive.command.command.name : "": ""} 
        ${passive.awakening_type == 5 ? passive.command && passive.command.command ? ver =="GL" ? passive.command.command.name: passive.command.command.glname : "": ""} 
        ${passive.awakening_type == 5 ? passive.command && passive.command.command ? ver =="GL" ? passive.command.command.jpname : passive.command.command.name : "": ""} 
        ${passive.awakening_type == 6 ? passive.param && passive.param : ""} 
        #-${passive.cac_id}
        `).toLowerCase().includes(searchTerm)
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, clearFilter, reverse,activeCl80, activeCl50,activeCl55,activeCl60,activeCl70,activeCl85,activeCl88]);

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
    setactiveCl50(false)
    setactiveCl55(false)
    setactiveCl60(false)
    setactiveCl70(false)
    setactiveCl80(false)
    setactiveCl85(false)
    setactiveCl88(false)

    setReversesearch("")
    setTEXTsearch("")
    setsearchdisplay("");
    setSearchTerm("");
    setactiveCl50search("")
    setactiveCl55search("")
    setactiveCl60search("")
    setactiveCl70search("")
    setactiveCl80search("")
    setactiveCl85search("")
    setactiveCl88search("")
    setTimeout(() => setclearFilter(false), 1000);
  }

    const effect_ = passive_effects_data.effect_
    const require_passive = passive_effects_data.require_passive
    const passive_target = passive_effects_data.passive_target
    const trap_type = passive_effects_data.trap_type
    const param_id = passive_effects_data.param_id
    const attack_type = passive_effects_data.attack_type
    const killer_type_passive = passive_effects_data.killer_type
    const elementid_1 = passive_effects_data.elementid_1
    const command_type_passive = passive_effects_data.command_type

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

    const getcastnames = Object.values(AilmentNames).map(self=>{
        return {[self.castID]: self}
      })
    
      const CastNames = getcastnames.reduce(function(result, item) {
        var key = Object.keys(item)[0]; //first property: a, b, c
        result[key] = item[key];
        return result;
        }, {});

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

    const displaydata = listDisplay

    const Cl50button = () => {
      if (activeCl50 == false) {
          setactiveCl50search("true")
      } else {
          setactiveCl50search("")
      }
      setactiveCl50((prevValue) => !prevValue);
    }
    const Cl55button = () => {
      if (activeCl55 == false) {
          setactiveCl55search("true")
      } else {
          setactiveCl55search("")
      }
      setactiveCl55((prevValue) => !prevValue);
    }
    const Cl60button = () => {
      if (activeCl60 == false) {
          setactiveCl60search("true")
      } else {
          setactiveCl60search("")
      }
      setactiveCl60((prevValue) => !prevValue);
    }
    const Cl80button = () => {
      if (activeCl80 == false) {
          setactiveCl80search("true")
      } else {
          setactiveCl80search("")
      }
      setactiveCl80((prevValue) => !prevValue);
    }
    const Cl70button = () => {
      if (activeCl70 == false) {
          setactiveCl70search("true")
      } else {
          setactiveCl70search("")
      }
      setactiveCl70((prevValue) => !prevValue);
    }
    const Cl85button = () => {
      if (activeCl85 == false) {
          setactiveCl85search("true")
      } else {
          setactiveCl85search("")
      }
      setactiveCl85((prevValue) => !prevValue);
    }
    const Cl88button = () => {
      if (activeCl88 == false) {
          setactiveCl88search("true")
      } else {
          setactiveCl88search("")
      }
      setactiveCl88((prevValue) => !prevValue);
    }

    if(crydata.length == 0){
        return(
            <div className='nonenemyholder enemyholderstyling'>
                    No Data
            </div>
        )
    } else {
        return(
            <div>
                <div className="filterholder noselect" id={showFilter ? "showfilteren" : "hiddenfilteren"}>
                  <div className="similarbanner">Subcategories</div>
                  <div className="filterholderflair">
                  <ul className='bufftypes'>
                        {showCl88 == true ? 
                        <Tippy content="Crystal Level 88">
                        <li onClick={Cl88button} className={`${activeCl88 == true ? "filteractive": "filterinactive"} buffbutton cl88button`}>
                            </li>
                        </Tippy>
                        :""}
                        {showCl85 == true ? 
                        <Tippy content="Crystal Level 85">
                        <li onClick={Cl85button} className={`${activeCl85 == true ? "filteractive": "filterinactive"} buffbutton cl85button`}>
                            </li>
                        </Tippy>
                        :""}
                        {showCl80 == true ? 
                        <Tippy content="Crystal Level 80">
                        <li onClick={Cl80button} className={`${activeCl80 == true ? "filteractive": "filterinactive"} buffbutton cl80button`}>
                            </li>
                        </Tippy>
                        :""}
                        {showCl70 == true ? 
                        <Tippy content="Crystal Level 70">
                        <li onClick={Cl70button} className={`${activeCl70 == true ? "filteractive": "filterinactive"} buffbutton cl70button`}>
                            </li>
                        </Tippy>
                        :""}
                        {showCl60 == true ? 
                        <Tippy content="Crystal Level 60">
                        <li onClick={Cl60button} className={`${activeCl60 == true ? "filteractive": "filterinactive"} buffbutton cl60button`}>
                            </li>
                        </Tippy>
                        :""}
                        {showCl55 == true ? 
                        <Tippy content="Crystal Level 55">
                        <li onClick={Cl55button} className={`${activeCl55 == true ? "filteractive": "filterinactive"} buffbutton cl55button`}>
                            </li>
                        </Tippy>
                        :""}
                        {showCl50 == true ? 
                        <Tippy content="Crystal Level 50">
                        <li onClick={Cl50button} className={`${activeCl50 == true ? "filteractive": "filterinactive"} buffbutton cl50button`}>
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
                    {displaydata.length > 0 ?  (
                    displaydata.map(passive=>(
                      passive.awakening_type == 3 && passive.command != undefined?
                        <Character_Ability_Pars
                        key={passive.cac_id}

                        tag_override={`cl${passive.level}`}

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

                        formatting={formatting}
                        />
                        :passive.awakening_type == 3 ?
                        <Cry_Parm
                        key={passive.cac_id}
                        type={3}
                        passive={passive}
                        char_id={char_id}
                        ver={ver}
                        />
                        :passive.awakening_type == 2 || passive.awakening_type == 5?
                        <Passive_Ability_Formatting
                        key={passive.cac_id}
                        passive_ability={passive.passive}
                        ver={ver}
                        loc={loc}
                        file={"exskill"}
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
                        command_type={command_type_passive}
                        target_range_={target_range_}
                        formatting={formatting}
                        chara_id_passoff={passive.chara_id}
                        cp_overide={passive.cp}
                        tag_overide={`cl${passive.level}`}
                        span={true}
                        release={passive.start_date}

                        banner_color={"bluebanner"}
                        base_color={"bluebase"}
                        />
                        :passive.awakening_type == 6 ?
                        <Cry_Parm
                        key={passive.cac_id}
                        type={6}
                        passive={passive}
                        char_id={char_id}
                        ver={ver}
                        />
                        :passive.awakening_type == 1 && passive.command != undefined?
                        <Character_Ability_Pars
                        key={passive.cac_id}

                        tag_override={`cl${passive.level}`}

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

                        formatting={formatting}
                        />
                        :passive.awakening_type == -1 && passive.command != undefined?
                        <Character_Ability_Pars
                        key={passive.cac_id}

                        tag_override={`cl${passive.level}`}

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

                        formatting={formatting}
                        />
                        :passive.awakening_type == 4 && passive.command != undefined?
                        <Character_Ability_Pars
                        key={passive.cac_id}

                        tag_override={`cl${passive.level}`}

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

                        formatting={formatting}
                        />
                        :
                        passive.command != undefined?
                        <Character_Ability_Pars
                        key={passive.cac_id}

                        tag_override={`cl${passive.level}`}

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

                        formatting={formatting}
                        />
                        :""
                    ))) : (
                        <div className=''>No Data</div>
                        )
                        }
                        </div>
                </div>
        )
    }
}
export default Crystal_Passives