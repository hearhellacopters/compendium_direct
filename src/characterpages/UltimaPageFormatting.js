import React, {useState, useEffect } from 'react';
import { Helmet} from 'react-helmet-async';
import { Link, Navigate} from 'react-router-dom'
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/scale-subtle.css';
import 'tippy.js/animations/scale-extreme.css';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import Tippy from '../formatting/TippyDefaults.js';
import { slice, concat, } from 'lodash';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import Equipment_Passive_Handler from './direct/Equipment_Passives_Handler.js';
import { getQuery, getQueryStringVal, useQueryParam } from '../processing/urlparams'

const UltimaPage = ({ 
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

    ProcessedGear, 
    match
  
  }) => {

  const matchweapon = match.params.id

  const passivelimit = 20

  const rawData = ProcessedGear;

  const banerDisplayTerm = "Ultima Weapon";

  const [searchResults, setSearchResults] = useState(rawData);
  const [limits, setLimits] = useState(passivelimit);
  const [listDisplay, setListDisplay] = useState(
    rawData && rawData.slice(0, passivelimit)
  );
  const [showFilter, setShowFilter] = useState(getQueryStringVal("filter") != null  ? true : false);
  const [searchdisplay, setsearchdisplay] = useState(getQueryStringVal("search") != null ? getQueryStringVal("search") : "");
  const [Filtersearch, setFiltersearch] = useQueryParam("filter", "");
  const [listLength, setListLength] = useState(listDisplay.length);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [displayBanner, setDisplayBanner] = useState(
    <>Displaying <span className="subtextgold">{listLength}</span> of <span className="subtextgold"> {rawData.length}</span> {banerDisplayTerm}</>
  );
  const [Sword, setSword] = useState(matchweapon == "sword"  ? true : false);
  const [Greatsword, setGreatsword] = useState(matchweapon == "greatsword"  ? true : false);
  const [Staff, setStaff] = useState(matchweapon == "staff"  ? true : false);
  const [Fist, setFist] = useState(matchweapon == "fist"  ? true : false);
  const [Dagger, setDagger] = useState(matchweapon == "dagger" ? true : false);
  const [Gun, setGun] = useState(matchweapon == "gun" ? true : false);
  const [Throwing, setThrowing] = useState(matchweapon == "thowing" ? true : false);
  const [Whip, setWhip] = useState(matchweapon == "whip" ? true : false);
  const [Bow, setBow] = useState(matchweapon == "bow" ? true : false);
  const [Spear, setSpear] = useState(matchweapon == "spear"  ? true : false);
  const [Other, setOther] = useState(matchweapon == "other"  ? true : false);   
  const [Weapons, setWeapons] = useState(matchweapon == ""  ? true : false);

  useEffect(() => {
    if(matchweapon == undefined){
      setWeapons(true)
    } else {
      setWeapons(false)
    }
    if(matchweapon == "sword"){
      setSword(true)
    } else {
      setSword(false)
    }
    if(matchweapon == "greatsword"){
      setGreatsword(true)
    } else {
      setGreatsword(false)
    }
    if(matchweapon == "staff"){
      setStaff(true)
    } else {
      setStaff(false)
    }
    if(matchweapon == "fist"){
      setFist(true)
    } else{
      setFist(false)
    }
    if(matchweapon == "dagger"){
      setDagger(true)
    } else {
      setDagger(false)
    }
    if(matchweapon == "gun"){
      setGun(true)
    } else {
      setGun(false)
    }
    if(matchweapon == "throwing"){
      setThrowing(true)
    } else {
      setThrowing(false)
    }
    if(matchweapon == "whip"){
      setWhip(true)
    } else {
      setWhip(false)
    }
    if(matchweapon == "bow"){
      setBow(true)
    } else {
      setBow(false)
    }
    if(matchweapon == "spear"){
      setSpear(true)
    } else {
      setSpear(false)
    }
    if(matchweapon == "other"){
      setOther(true)
    } else {
      setOther(false)
    }

  },[matchweapon])
  
  const loadMoreButton = () => {
    const newlimits = limits + passivelimit;
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

  const showfilterbutton = () => {
    setShowFilter((prevValue) => !prevValue);
  }

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
    //filter
    useEffect(() => {
      const filterholder = [];
      if (Sword === true) {
        const filteredout = rawData.filter(
          (gear) => gear["type"] == "Sword"
        );
        filterholder.push(...filteredout);
      }
      if (Greatsword === true) {
        const filteredout = rawData.filter(
          (gear) => gear["type"] == "Greatsword" 
        );
        filterholder.push(...filteredout);
      }
      if (Staff === true) {
        const filteredout = rawData.filter(
          (gear) => gear["type"] == "Staff" 
        );
        filterholder.push(...filteredout);
      }
      if (Fist === true) {
        const filteredout = rawData.filter(
          (gear) => gear["type"] == "Fist" 
        );
        filterholder.push(...filteredout);
      }
      if (Dagger === true) {
        const filteredout = rawData.filter(
          (gear) => gear["type"] == "Dagger"
        );
        filterholder.push(...filteredout);
      }
      if (Gun === true) {
        const filteredout = rawData.filter(
          (gear) => gear["type"] == "Gun" 
        );
        filterholder.push(...filteredout);
      }
      if (Throwing === true) {
        const filteredout = rawData.filter(
          (gear) => gear["type"] == "Throwing" 
        );
        filterholder.push(...filteredout);
      }
      if (Whip === true) {
        const filteredout = rawData.filter(
          (gear) => gear["type"] == "Whip"
        );
        filterholder.push(...filteredout);
      }
      if (Bow === true) {
        const filteredout = rawData.filter(
          (gear) => gear["type"] == "Bow" 
        );
        filterholder.push(...filteredout);
      }
      if (Spear === true) {
        const filteredout = rawData.filter(
          (gear) => gear["type"] == "Spear" 
        );
        filterholder.push(...filteredout);
      }
      if (Other === true) {
        const filteredout = rawData.filter(
          (gear) => gear["type"] == "Other" 
        );
        filterholder.push(...filteredout);
      }
      if (filterholder.length == 0) {
        filterholder.push(...rawData)
      }

      const newlistdisplay = filterholder.slice(0, limits);
      if (limits < newlistdisplay.length) {
        setShowLoadMore(true);
        setListDisplay(newlistdisplay);
        setListLength(filterholder.length);
        setDisplayBanner(
          <>Displaying <span className="subtextgold">{newlistdisplay.length}</span> of <span className="subtextgold"> {filterholder.length}</span> {banerDisplayTerm}</>
        );
      } else {
        setShowLoadMore(false);
        setListDisplay(newlistdisplay);
        setListLength(newlistdisplay.length);
        setDisplayBanner(
          <>Displaying <span className="subtextgold">{newlistdisplay.length}</span> of <span className="subtextgold"> {newlistdisplay.length}</span> {banerDisplayTerm}</>
        );
      }
    },[Weapons, Bow, Dagger, Fist, Greatsword, Gun, Other, Spear, Staff, Sword, Throwing, Whip, rawData,limits])

    const getcastnames = Object.values(AilmentNames).map(self=>{
      return {[self.castID]: self}
    })
  
    const CastNames = getcastnames.reduce(function(result, item) {
      var key = Object.keys(item)[0]; //first property: a, b, c
      result[key] = item[key];
      return result;
      }, {});

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
      
  const listgear = listDisplay;
  if(matchweapon == "sword" || matchweapon == undefined || matchweapon == "greatsword" || matchweapon == "staff" || matchweapon == "fist" || matchweapon == "dagger" || matchweapon == "gun" || matchweapon == "throwing" || matchweapon == "whip" || matchweapon == "bow" || matchweapon == "spear" || matchweapon == "other") {
    return(
        <div className="wrapper">
            <Helmet>
                <title>Ultima Weapons - Dissidia Compendium</title>
                <meta property="og:site_name" content="Dissidia Compendium"/>
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://dissidiacompendium.com"/>
                <meta name="description" content={`Ultima Weapons Page`}/>
                <meta name="twitter:title" content={`Ultima Weapons Page`}/>
                <meta name="twitter:description" content={`Ultima Weapons Page`}/>
                <meta name="twitter:image" content="https://dissidiacompendium.com/images/static/site/logo512.png"/>
                <meta name="twitter:card" content="summary"/>
                <meta name="twitter:image:alt" content={`Dissia Compendium`}/>
                <meta property="og:title" content={`Ultima Weapons Page`}/>
                <meta property="og:description" content={`Ultima Weapons for level 90 characters`}/>
                <meta property="og:image" content="https://dissidiacompendium.com/images/static/site/logo512.png"/>
                <meta property="og:url" content={`https://dissidiacompendium.com/characters/ultimaweapon/`}/>
            </Helmet>
            <div className="content">
              <h1 >{`${matchweapon == "" ? `` : `${capitalize(matchweapon)} `}${listLength == 1 ? "Ultima Weapon" : "Ultima Weapons"}`}</h1>
              <div className="charfilterspacer"/>
              <div key="filter1" onClick={showfilterbutton} className="charfilter"><span className="infotext"></span>{showFilter ? <TiArrowSortedUp className="uparrow"/> : <TiArrowSortedDown className="downarrow"/>}</div>
                <div className="filterholder noselect" id={showFilter ? "showfilteren" : "hiddenfilteren"}>
                  <div className="similarbanner">Weapon Filter</div>
                    <div className="filterholderflair">
                        <ul className="spheretypes">
                          <Tippy content="Sword">
                            <Link className="ultimaicons" to="/characters/ultimaweapon/sword">
                            <li className={`${Sword ? "filteractive": "filterinactive"} spheresbutton swordbutton`} ></li>
                            </Link>
                          </Tippy>  
                          <Tippy content="Greatsword">
                            <Link className="ultimaicons" to="/characters/ultimaweapon/greatsword">
                            <li className={`${Greatsword ? "filteractive": "filterinactive"} spheresbutton greatswordbutton`} ></li>
                            </Link>
                          </Tippy>
                          <Tippy content="Staff">
                            <Link className="ultimaicons" to="/characters/ultimaweapon/staff">
                            <li className={`${Staff ? "filteractive": "filterinactive"} spheresbutton staffbutton`}></li>
                            </Link>
                          </Tippy>
                          <Tippy content="Fist">
                            <Link className="ultimaicons" to="/characters/ultimaweapon/fist">
                            <li className={`${Fist ? "filteractive": "filterinactive"} spheresbutton fistbutton`}></li>
                            </Link>
                          </Tippy>
                          <Tippy content="Dagger">
                            <Link className="ultimaicons" to="/characters/ultimaweapon/dagger">
                            <li className={`${Dagger ? "filteractive": "filterinactive"} spheresbutton daggerbutton`}></li>
                            </Link>
                          </Tippy>
                          <Tippy content="Gun">
                            <Link className="ultimaicons" to="/characters/ultimaweapon/gun">
                            <li className={`${Gun ? "filteractive": "filterinactive"} spheresbutton gunbutton`} ></li>
                            </Link>
                          </Tippy>
                          <Tippy content="Throwing">
                            <Link className="ultimaicons" to="/characters/ultimaweapon/throwing">
                            <li className={`${Throwing ? "filteractive": "filterinactive"} spheresbutton throwbutton`} ></li>
                            </Link>
                          </Tippy>
                          <Tippy content="Whip">
                            <Link className="ultimaicons" to="/characters/ultimaweapon/whip">
                            <li className={`${Whip ? "filteractive": "filterinactive"} spheresbutton whipbutton`} ></li>
                            </Link>
                          </Tippy>
                          <Tippy content="Bow">
                            <Link className="ultimaicons" to="/characters/ultimaweapon/bow">
                            <li className={`${Bow ? "filteractive": "filterinactive"} spheresbutton bowbutton`} ></li>
                            </Link>
                          </Tippy>
                          <Tippy content="Spear">
                            <Link className="ultimaicons" to="/characters/ultimaweapon/spear">
                            <li className={`${Spear ? "filteractive": "filterinactive"} spheresbutton spearsbutton`} ></li>
                            </Link>
                          </Tippy>
                          <Tippy content="Other">
                            <Link className="ultimaicons" to="/characters/ultimaweapon/other">
                            <li className={`${Other ? "filteractive": "filterinactive"} spheresbutton othersbutton`} ></li>
                            </Link>
                          </Tippy>
                          <Tippy content="All Weapons">
                            <Link className="ultimaicons" to="/characters/ultimaweapon">
                            <li className={`${Weapons ? "filteractive": "filterinactive"} spheresbutton weaponbutton`} ></li>
                            </Link>
                          </Tippy>
                        </ul>  
                        <div className="similarbanner">Info</div> 
                        <div className="ultimainfo darkerbg">
                        <div className="yellowcolor">{"Can be equipped by Crystal Level 90 Characters with matching weapon type"}</div><br/>
                        <div className="yellowcolor">{"Weapon Gloss available to any matching type characters (including non-Level 90)"}</div><br/>
                        <div className="yellowcolor">{"Stats *DO NOT* get affinity boosts"}</div><br/>
                        <div className="yellowcolor">{"Stats *DO* get event character boosts"}</div><br/>
                        <div className="yellowcolor">{"Passives *CAN NOT* be learned"}</div>
                        </div>
                        <div className="similarbanner">Needed</div> 
                        <div className="ultimainfo darkerbg">
                        <span className="ultimaorb"></span>{" x50 for "}<div className="ultimayellowcolor">{"first time buy"}</div>{", "}<span className="ultimaorb"></span>{" x150 for each "}<div className="ultimayellowcolor">{"previously bought weapon"}</div><br/><br/>
                        <span className="ultimaorb"></span>{" x150 needed "}<div className="ultimayellowcolor">{"per limit break"}</div>{" for 5 limits total"}<br/><br/>
                        <span className="ultimaorb"></span>{" x800 needed for "}<div className="ultimayellowcolor">{"first MLB"}</div><br/><br/>
                        <span className="ultimaorb"></span>{" x900 for each "}<div className="ultimayellowcolor">{"additional weapon of the same type"}</div>
                        </div>
                        <div className="similarbanner">Where to get</div>
                        <div className="ultimainfo darkerbg">
                        <span className="ultimaorb"></span>{" x10 when enhancing a character to"}<div className="ultimayellowcolor">{" Crystal Level 90"}</div><br/><br/>
                        <span className="ultimaorb"></span>{" x30-60 available per "}<div className="ultimayellowcolor">{"Event"}</div><br/><br/>
                        <span className="ultimaorb"></span>{" x20 additional per event with "}<div className="ultimayellowcolor">{"Moogle Pass Premium"}</div><br/><br/>
                        {//<span className="ultimaorb"></span>{" x20 per "}<div className="ultimayellowcolor">{"Special Pannels Mission"}</div>{" clears"}<br/><br/>
                        }
                        <span className="ultimaorb"></span>{" x5 when clearing a "}<div className="ultimayellowcolor">{"LUFENIA"}</div>{" mission with matching character"}<br/><br/>
                        <span className="ultimaorb"></span>{" Breaking down a weapon "}<div className="ultimayellowcolor">{"recovers all cores"}</div>{" (once per calendar month)"}
                        {//<span className="ultimaorb"></span>{" x3 when clearing "}<div className="ultimayellowcolor">{"Ultima Missions"}</div><br/>
                        }
                        </div>                               
                    </div>
                  </div>
                  <div className="ultimaweaponitemholder">
                <div className="subtext">
                  {displayBanner}
                </div>
              {listgear.length > 0 ?  (
              listgear.map(gear =>(
                <Equipment_Passive_Handler 
                gear={gear}
                ver={"GL"}
                loc={"gear"}
                key={gear.equip_id} 
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
                killer_type={killer_type}
                elementid_1={elementid_1}
                command_type={command_type}
                target_range_={target_range_}
                formatting={true}
                
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
    } else {
      return(
        <Navigate replace to="/404"/>
    )
  }
}
export default UltimaPage