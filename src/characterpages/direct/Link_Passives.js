import React, {useState, useEffect} from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import Passive_Ability_Formatting from './formatting/passives/Passive_Ability_Formatting.js'
import Link_Parm from './Link_Parm';
import { getQuery, getQueryStringVal, useQueryParam } from '../../processing/urlparams'
import Tippy from '../../formatting/TippyDefaults'
import { useDispatch } from "react-redux";
import { slice, concat, } from 'lodash';
import Select from 'react-select';
import { ImSortAmountAsc } from 'react-icons/im';
import { ImSortAmountDesc } from 'react-icons/im';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5'; 
import { FaUndoAlt } from 'react-icons/fa'

const Link_Passives =({
    linkeddata,
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
})=>{

    const rawData = Object.values(linkeddata && linkeddata.sort((a,b)=>b.link_level - a.link_level))

    const banerDisplayTerm = "force enhancements";

    const startinglimit = 9999

    const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null  ? true : false);
    const [clearFilter, setclearFilter] = useStateIfMounted(false);

    const [loop, setLoop] = useStateIfMounted(false);
    const [reverse, setReverse] = useState(getQueryStringVal("rev") != null  ? true : false);
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
      `Displaying ${listLength} of ${rawData.length} ${banerDisplayTerm}`
    );
    const [Typesearch, setTypesearch] = useQueryParam("type", "");
    const { protocol, pathname, host } = window.location;
    const query = getQuery();
    const url = `${protocol}//${host}${pathname}?${query.toString()}`
    const [Reversesearch, setReversesearch] = useQueryParam("rev", "");
    const [TEXTsearch, setTEXTsearch] = useQueryParam("search", "");
    const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");

    const showfilterbutton = () => {
        if (showFilter == false) {
            setFiltersearch("true")
            setShowFilter(true)
        } else {
            setFiltersearch("")
            setShowFilter(false)
        }
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
            if(getQueryStringVal("type") == "Stats"){
            setTypesearch(getQueryStringVal("type"))
            setCondFilter(3)
            }
            if(getQueryStringVal("type") == "Passive Ability"){
            setTypesearch(getQueryStringVal("type"))
            setCondFilter(2)
            }
        }
        },[setCondFilter,Typesearch,setTypesearch])

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

    useEffect(() => {
    //search params
    if(getQueryStringVal("search") != null){
        setSearchTerm(getQueryStringVal("search") != null  ? getQueryStringVal("search").toLowerCase() : "")
        setTEXTsearch(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
        setsearchdisplay(getQueryStringVal("search") != null ? getQueryStringVal("search") : "")
    }
    }, [setTEXTsearch,setFiltersearch])

     //unique
     function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
        }

        //filter
  useEffect(() => {
    var filterholder = rawData;

        if(reverse == true){
            filterholder = rawData.sort((a, b) => a.link_level - b.link_level)
        } else {
            filterholder = rawData.sort((a, b) => b.link_level - a.link_level)
        }
        
      const makeUnique = filterholder.filter(onlyUnique);
        const searchit = makeUnique.filter((ailment) =>
        (`${ver == "GL" ? ailment.passive && ailment.passive.jpname : ""} ${ailment.param} ${ailment.passive && ailment.passive.name} ${ver == "JP" ? ailment.passive && ailment.passive.glname :""} - #${ailment.passives && ailment.passives.pa_id}`).toLowerCase().includes(searchTerm)
        );
        const getailmentfilter = searchit.filter(function (ef) {
          const newfilterpull = ef["link_type"] == condFilter;
          if(condFilter !== "") {
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
  }, [searchTerm, condFilter, reverse]);


    const effect_ = passive_effects_data.effect_
    const require_passive = passive_effects_data.require_passive
    const passive_target = passive_effects_data.passive_target
    const trap_type = passive_effects_data.trap_type
    const param_id = passive_effects_data.param_id
    const attack_type = passive_effects_data.attack_type
    const killer_type = passive_effects_data.killer_type
    const elementid_1 = passive_effects_data.elementid_1
    const command_type = passive_effects_data.command_type
    const target_range_ = passive_effects_data.target_range_

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

    const typeListArray = [
        {
            value: 3,
            label: "Stats"
        },
        {
            value: 2,
            label: "Passive Ability"
        }
    ]

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
    setsearchdisplay("");
    setSearchTerm("");
    setCondFilter("")
    setTimeout(() => setclearFilter(false), 1000);
  }

    const listPassives = listDisplay;

    if(linkeddata.length == 0){
        return(
            <div className="nonenemyholder enemyholderstyling">
            No Data
            </div>
        )
    } else {
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
                  <div className="similarbanner">Filters</div>
                  <div className="filterholderflair">
                    <div className="typeholder">
                      <Select
                      defaultValue={Typesearch != "" ? {value: Typesearch, label: Typesearch } : null}
                      key={Typesearch}
                      isSearchable={true} 
                      placeholder="Type Select..."
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
            <div className="nonenemyholder enemyholderstyling">
            {listPassives.length > 0 ?  (
                    listPassives.map(passive=>(
                        passive.link_type == 3 ?
                        <Link_Parm
                        key={passive.lc_id}
                        passive={passive}
                        char_id={char_id}
                        tag_overide={passive.cp != 0 ? "smallpassive automarg" : "newstatus"}
                        />
                        :passive.link_type == 2 && passive.passive != undefined?
                        <Passive_Ability_Formatting
                        key={passive.lc_id}
                        passive_ability={passive.passive}
                        ver={ver}
                        loc={loc}
                        file={""}
                        Single={true}
                        passivenames={passivenames}
                        equipmentpassivenames={equipmentpassivenames}
                        passive_effects_data={passive_effects_data}
                        AilmentNames={AilmentNames}
                        CommandNames={CommandNames}
                        CondData={CondData}
                        Ailment_Effects={Ailment_Effects}
                        MessageData_Category={MessageData_Category}
                        MessageData_FFSeries={MessageData_FFSeries}
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
                        killer_type={killer_type}
                        elementid_1={elementid_1}
                        command_type={command_type}
                        formatting={formatting}
                        chara_id_passoff={passive.chara_id}
                        cost_overide={passive.need_point}
                        target_range_={target_range_}
                        cp_overide={passive.cp}
                        tag_overide={passive.rank_tag}
                        release={passive.start_date}

                        banner_color={"newblue"}
                        base_color={"bluebase"}
                        />
                        :""
                        ))) : (
                        <div>No results</div>
                        )
                        }
            </div>
            </div>
        )
    }
}
export default Link_Passives