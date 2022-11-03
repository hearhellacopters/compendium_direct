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
import Art_Passive_Formatting from './formatting/passives/Art_Passive_Formatting.js'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import { getQuery, getQueryStringVal, useQueryParam } from '../../processing/urlparams'
import reactStringReplace from "react-string-replace"

const Art_bycharacter =({
    art_passive,

    ver,
    newcompare,
    loc,
    file,
    match,

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
    const rawData = Object.values(art_passive)

    const banerDisplayTerm = "artifact passives";

    const startinglimit = 9999

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
    const [Typesearch2, setTypesearch2] = useQueryParam("rank", "");
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

    const typeListArray2 = [
      {
        value: "★★",
        label: "★★",
        id: 5,
      },
      {
        value: "★",
        label: "★",
        id: 4,
      }
    ]

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
    const typeListArray2 = [
      {
        value: "★",
        label: "★★",
        id: 5,
      },
      {
        value: "★",
        label: "★",
        id: 4,
      }
      ]
    if(Typesearch2 != ""){
     const filteredtype2 = typeListArray2.filter(self => self.label == getQueryStringVal("rank"))
     if(filteredtype2.length != 0){
       setTypesearch2(getQueryStringVal("rank"))
       setCondFilter2(filteredtype2[0].id)
     } else{
       setTypesearch2("")
       setCondFilter2("")
     }
   }
 },[setCondFilter2,Typesearch2,setTypesearch2])

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
          setCondFilter2(e.id);
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
        b.spe_id - a.spe_id:
        a.spe_id - b.spe_id);
        const searchit = searchTerm == "" ? makeUnique : makeUnique.filter((ailment) =>
        (`${ver == "GL" ? ailment.jpname && ailment.jpname : ""} ${ailment.name} ${ver == "JP" ? ailment.glname && ailment.glname :""} - #${ailment.pa_id}`).toLowerCase().includes(searchTerm)
        );
        const getailmentfilter2 = condFilter == "" ? searchit : searchit.filter(function (ef) {
          const newfilterpull = ef["chara_id"] === condFilter;
          if(condFilter !== "") {
            return newfilterpull;
          } else {
            return ef
        }});
        const getailmentfilter3 = condFilter3 == "" ? getailmentfilter2 : getailmentfilter2.filter(function (ef) {
          const newfilterpull = ef["effect_type"] === condFilter3 || ef["effect_type_1"] === condFilter3;
          if(condFilter3 !== "") {
            return newfilterpull;
          } else {
            return ef
        }});
        const getailmentfilter4 = condFilter4 == "" ? getailmentfilter3 : getailmentfilter3.filter(function (ef) {
          const newfilterpull = ef["require_type"] === condFilter4 || ef["require_type_1"] === condFilter4;
          if(condFilter4 !== "") {
            return newfilterpull;
          } else {
            return ef
        }});
        const getailmentfilter = condFilter2 == "" ? getailmentfilter4 : getailmentfilter4.filter(function (ef) {
          const newfilterpull = ef["rank"] == condFilter2;
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

  const addformatting =(text)=>{
    let replacement = text
    var number = 0

    replacement = replacement == undefined ? "" : reactStringReplace(replacement, /(\d*)/, (match, i) => {
      number = number + 1
      return(
      <span key={`1-${i}-${number}`} className="subtextgold">{match}</span>
      )})
      replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\\n)/, (match, i) => {
        number = number + 1
        return(
            <br key={`10-${i}-${number}`}/>
    )})
    replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\n)/, (match, i) => {
        number = number + 1
        return(
            <br key={`11-${i}-${number}`}/>
    )})
    return(
      replacement
    )
  }

    return(
        <div>
                <div className="characterpageholder">
                {match & match.ArtPriority1 == undefined ? "" :
                <div className="">
                  <div className="singlesubbanner">{match.CharacterName}{"'s Artifact Priority"}</div>
                    <div className="filterholderflair somepadding">
                      <div className={"orangetext "}>
                      {match.ArtPriority1}
                      </div>
                      <div className={"orangetext "}>
                      {match.ArtPriority2}
                      </div>
                      <div className={"orangetext "}>
                      {match.ArtPriority3}
                      </div>
                    </div>
                </div>}
                {listPassives.length > 0 ?  (
                listPassives.map(passive => (
                <Art_Passive_Formatting 
                key={passive.spe_id}
                art_passive={passive}
                ver={ver}
                loc={loc}
                file={"exskill"}
                Single={true}
                passivenames={passivenames}
                equipmentpassivenames={equipmentpassivenames}
                command_data_effects={command_data_effects}
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
                target_range_={target_range_}
                formatting={formatting}

                span={true}
                banner_color={"ArtRedbanner"}
                base_color={"ArtRedbase"}
                />
                ))) : (
                  <div>No Data</div>
                )}                
                </div>
        </div>
    )
}
export default Art_bycharacter