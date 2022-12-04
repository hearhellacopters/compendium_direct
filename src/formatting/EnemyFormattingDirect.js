import React, {useEffect, useState} from 'react';
import { useStateIfMounted } from 'use-state-if-mounted';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import FaceMaker from './CharFaceFormatting.js'
import LevelsFormatting from './LevelsFormatting.js'
import EventListing from './SingleEventsFormatting.js'
import './EnemyFormatting.css'
import '../Characters.css'
import '../Bestiary.css'
import { Helmet } from 'react-helmet-async';
import ResistIcon from './ResistIcons.js';
import DefaultTippy from './TippyDefaults.js';
import EnemyListingDirect from './EnemyListingDirect'
import EnemyAbilities_MasterListDirect from './EnemyAbilities_MasterListDirect';
import ScrollToTop from './ScrollToTop.js';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { ImArrowRight } from 'react-icons/im';
import { ImArrowLeft }  from 'react-icons/im';
import DevSwitch from '../redux/DevSwitch'
import EnemyForceGauge from './EnemyForceGauge'
import Ailment_Data_Formatting from './Buff_Handler/Ailment_Data_Formating.js';
import Tippy from './TippyDefaults.js';
import replace_title from '../processing/replacer_titles'
import ReactJson from '@microlink/react-json-view'
import addformatting from '../processing/replacer_enemydesc';
import roles from '../characterpages/direct/formatting/command_ability/ailment_tags.json'
import { getQuery, getQueryStringVal,useQueryParam } from '../processing/urlparams'
import cleaner from '../processing/Format_Cleaner.js';
import { setTrue, setFalse } from '../redux/ducks/jptoggle.js';

const EnemyFormattingDirect = ({ match, stats, alllevels, setlevel, battle_enemy_id, ProcessedEnemies, ProcessedEvents, ProcessedLevels, levelurl, battle_enemy, PartnerCharacters, ProcessedCharacters, jptoggledata }) => {
    
        //const battle_enemy = ProcessedEnemies.filter(function (el) {
        //    return el["battle_enemy_id"] == battle_enemy_id; 
        //  }); 

    const dispatch = useDispatch();
    const [columns,setcolumns]  =useStateIfMounted(`${window.innerWidth == undefined ? 2 : window.innerWidth > 799 ? 3 : window.innerWidth > 349 ? 2 : 1}`)
    const [ran, setran] =useStateIfMounted(false)
    const [showjp, setshowjp] =useStateIfMounted(false)
    const [set_helpers, setset_helpers] =useStateIfMounted([])
    const [set_chars, setset_chars] =useStateIfMounted(battle_enemy.CharArray)
    const [helpers, sethelpers] = useStateIfMounted([])
    const [prev, setprev] = useStateIfMounted(battle_enemy.battle_enemy_id)

    const [ForcetimeTab, setForcetimeTab] = useState(getQueryStringVal("force") != null  ? getQueryStringVal("force") : 0);
    const [ForcetimeTabsearch, setForcetimeTabsearch] = useQueryParam("force", "");

    const [JPsearch, setJPSearch] = useQueryParam("JP", "");


    const jponlybutton = () => {
        if (jptoggledata == false) {
            dispatch(setTrue())
            setJPSearch("true")
        } else {
            dispatch(setFalse())
            setJPSearch("")
        }
      };

    useEffect(()=>{
        if(battle_enemy.ForceGauge && battle_enemy.ForceGauge.length > 1){
            setForcetimeTabsearch(`${ForcetimeTab}`)
        }
    },[setForcetimeTabsearch,ForcetimeTab,battle_enemy])

    useEffect(()=>{
        if(prev != battle_enemy.battle_enemy_id){
            setset_chars(battle_enemy.CharArray)
            sethelpers([])
            setran(false)
            setprev(battle_enemy.battle_enemy_id)
        }
        // eslint-disable-next-line
    },[battle_enemy])

    const cmp = function(a, b) {
        if (a > b) return +1;
        if (a < b) return -1;
        return 0;
    }

    const column_helper = function(normal, length) {
        var returner = normal
        if(length >= 7){
            returner = 3
        }
        if(length < 7){
            returner = 2
        }
        if(length < 3){
            returner = 1
        }
        if(returner >= normal){
            return normal
        } else {
            return returner
        }
    }

    useEffect(()=>{
        if(ran == true){
            setran(false)
        }
        // eslint-disable-next-line 
    },[jptoggledata])

    useEffect(()=>{
        if(ran == false){
            const ver = jptoggledata == true ? "JP" : "GL"
            const helper_holder = {}
            var helpers_str = []
            if(battle_enemy.ForceGauge != undefined){
                if(battle_enemy.ForceGauge[ForcetimeTab].RoleTag != undefined){
                    helpers_str = battle_enemy.ForceGauge[ForcetimeTab].RoleTag .split(" ")
                }
                if(battle_enemy.ForceGauge[ForcetimeTab].CharArray != undefined){
                    battle_enemy.ForceGauge[ForcetimeTab].CharArray.map(self=>{
                        const single = ProcessedCharacters[self.CharID] && ProcessedCharacters[self.CharID]
                        if(helper_holder[self.CharID] == undefined){
                            Object.assign(helper_holder,{[self.CharID]: {
                                GLOrder: single.GLOrder, 
                                RealmPars: single.RealmPars, 
                                Sort: single.Sort, 
                                ShortName: single.ShortName, 
                                CharacterFaceURL: `https://dissidiacompendium.com/images/static/characters/${single.CharacterURLName}/face.png`, 
                                CharacterName: 
                                single.CharacterName, 
                                CharID: self.CharID, 
                                roles: ["Enemy"]
                            }})
                        } else {
                            var new_set = new Set(helper_holder[self.CharID].roles)
                            new_set.add("Enemy")
                            const holder = []
                            new_set.forEach(self=>{holder.push(self)})
                            Object.assign(helper_holder[self.CharID],{roles: holder})
                        }
                    })
                }
                if(battle_enemy.ForceGauge[ForcetimeTab].ForceCond1 != undefined){
                    const charType = {}
                    battle_enemy.ForceGauge[ForcetimeTab].ForceCond1.split(" ").forEach(self=>{
                        Object.assign(charType,{[self]:true})
                    })
                    const filtermerge = Object.values(ProcessedCharacters).filter((oneChar) => {
                        return Object.entries(charType)
                          .filter(entry => entry[1])
                          .every(([key, value]) => oneChar[`${ver}traits`] && oneChar[`${ver}traits`][`FRtraits`]  && oneChar[`${ver}traits`][`FRtraits`][key] === value);
                      });
                      filtermerge.map(self3=>{
                        if(helper_holder[self3.CharID] == undefined){
                            Object.assign(helper_holder,{[self3.CharID]: {
                                GLOrder: self3.GLOrder, 
                                RealmPars: self3.RealmPars, 
                                Sort: self3.Sort, 
                                ShortName: self3.ShortName, 
                                CharacterFaceURL: `https://dissidiacompendium.com/images/static/characters/${self3.CharacterURLName}/face.png`, 
                                CharacterName: 
                                self3.CharacterName, 
                                CharID: self3.CharID, 
                                roles:["Force_Enemy"]
                            }})
                        } else {
                            var new_set = new Set(helper_holder[self3.CharID].roles)
                            new_set.add("Force_Enemy")
                            const holder = []
                            new_set.forEach(self=>{holder.push(self)})
                            Object.assign(helper_holder[self3.CharID],{roles: holder})
                        }
                      })
                }
                if(battle_enemy.ForceGauge[ForcetimeTab].ForceCond2 != undefined){
                    const charType = {}
                    battle_enemy.ForceGauge[ForcetimeTab].ForceCond2.split(" ").forEach(self=>{
                        Object.assign(charType,{[self]:true})
                    })
                    const filtermerge = Object.values(ProcessedCharacters).filter((oneChar) => {
                        return Object.entries(charType)
                          .filter(entry => entry[1])
                          .every(([key, value]) => oneChar[`${ver}traits`] && oneChar[`${ver}traits`][`FRtraits`]  && oneChar[`${ver}traits`][`FRtraits`][key] === value);
                      });
                      filtermerge.map(self3=>{
                        if(helper_holder[self3.CharID] == undefined){
                            Object.assign(helper_holder,{[self3.CharID]: {
                                GLOrder: self3.GLOrder, 
                                RealmPars: self3.RealmPars, 
                                Sort: self3.Sort, 
                                ShortName: self3.ShortName, 
                                CharacterFaceURL: `https://dissidiacompendium.com/images/static/characters/${self3.CharacterURLName}/face.png`, 
                                CharacterName: 
                                self3.CharacterName, 
                                CharID: self3.CharID, 
                                roles:["Force_Enemy"]
                            }})
                        } else {
                            var new_set = new Set(helper_holder[self3.CharID].roles)
                            new_set.add("Force_Enemy")
                            const holder = []
                            new_set.forEach(self=>{holder.push(self)})
                            Object.assign(helper_holder[self3.CharID],{roles: holder})
                        }
                      })
                }
            } else if(battle_enemy && battle_enemy.RoleTag != undefined){
                helpers_str = battle_enemy.RoleTag && battle_enemy.RoleTag.split(" ")
            }
            sethelpers([])
            helpers_str.map(self=>{
                const helper_pull = Object.values(ProcessedCharacters).filter(function (ef) {
                    return ef[`${ver}traits`] && ef[`${ver}traits`][`${self}`] == true;
                  });
                  
                  helper_pull.map(self3=>{
                    if(helper_holder[self3.CharID] == undefined){
                        Object.assign(helper_holder,{[self3.CharID]: {
                            GLOrder: self3.GLOrder, 
                            RealmPars: self3.RealmPars, 
                            Sort: self3.Sort, 
                            ShortName: self3.ShortName, 
                            CharacterFaceURL: `https://dissidiacompendium.com/images/static/characters/${self3.CharacterURLName}/face.png`, 
                            CharacterName: 
                            self3.CharacterName, 
                            CharID: self3.CharID, 
                            roles:[self]
                        }})
                    } else {
                        var new_set = new Set(helper_holder[self3.CharID].roles)
                        new_set.add(self)
                        const holder = []
                        new_set.forEach(self=>{holder.push(self)})
                        Object.assign(helper_holder[self3.CharID],{roles: holder})
                    }
                  })
            })
            set_chars && set_chars.map(self=>{
                const single = ProcessedCharacters[self.CharID] && ProcessedCharacters[self.CharID]
                if(helper_holder[self.CharID] == undefined){
                    Object.assign(helper_holder,{[self.CharID]: {
                        GLOrder: single.GLOrder, 
                        RealmPars: single.RealmPars, 
                        Sort: single.Sort, 
                        ShortName: single.ShortName, 
                        CharacterFaceURL: `https://dissidiacompendium.com/images/static/characters/${single.CharacterURLName}/face.png`, 
                        CharacterName: 
                        single.CharacterName, 
                        CharID: self.CharID, 
                        roles: ["Enemy"]
                    }})
                } else {
                    var new_set = new Set(helper_holder[self.CharID].roles)
                    new_set.add("Enemy")
                    const holder = []
                    new_set.forEach(self=>{holder.push(self)})
                    Object.assign(helper_holder[self.CharID],{roles: holder})
                }
            })

            const final_arry = Object.values(helper_holder).sort((a, b) => cmp(a.RealmPars, b.RealmPars) || cmp(a.Sort,b.Sort))
            setran(true)
            sethelpers(final_arry)
            setcolumns(`${window.innerWidth == undefined ? column_helper(2,final_arry.length) : window.innerWidth > 799 ? column_helper(3,final_arry.length) : window.innerWidth > 349 ? column_helper(2,final_arry.length) : column_helper(1,final_arry.length)}`)
        }
    },[ran,setran,ProcessedCharacters,set_helpers,set_chars,jptoggledata,sethelpers,setset_helpers,battle_enemy,setcolumns,setForcetimeTabsearch,ForcetimeTab])

    const abilities = match.params.abilities
 
    let currentIndex = ProcessedEnemies.findIndex(x => x.battle_enemy_id == battle_enemy_id);
    const nextIndex = (currentIndex + 1) % ProcessedEnemies.length;
    const previousIndex = (currentIndex - 1) % ProcessedEnemies.length;

    const nextEnemy = (function (){
        const holder = ProcessedEnemies[nextIndex];
        if(nextIndex === 0 ){
            return false;
        } else{
            return holder;
        }
    })();

    const previousEnemy = (function (){
        const holder = ProcessedEnemies[previousIndex];
        if(holder === undefined ){
            return false;
        } else{
            return holder;
        }
    })();

    const [movetotop,setmovetotop] = useStateIfMounted(false)

    useEffect(()=>{
        setmovetotop(true)
        setTimeout(() => setmovetotop(false), 100)
        // eslint-disable-next-line 
    },[battle_enemy_id])
    
    const enemy = battle_enemy;
    const currentenemyid = enemy.enemy_id;
    const similarid = ProcessedEnemies.filter(similar => similar.enemy_id == currentenemyid);
    const similarids = similarid.filter(similar => similar.battle_enemy_id !== enemy.battle_enemy_id);

    const summonedenemy1 = enemy.SummonID1;
    const summonedenemy2 = enemy.SummonID2;

    const spancheck = (function (){
        if(enemy.DamageFlag == undefined && enemy.AilmentsFlag == undefined ){
        return false
        } else {
        return true
    }})();

    const singlespancheck = (function (){
        if((enemy.DamageFlag == undefined && enemy.AilmentsFlag == true) || (enemy.DamageFlag == true && enemy.AilmentsFlag == undefined)){
        return true
        } else {
        return false
    }})();

    const handletypefilter = (array, filtervalue) => {
        if (filtervalue !== "") {
          const filteredout = array
          .filter(thisarray => thisarray.EnemyList
          .some(List => List.battle_enemy_id == filtervalue)
          );
          return filteredout;
        } else {
          return array;
        }
      }

    const eventsin = handletypefilter(ProcessedEvents, enemy.battle_enemy_id)
    const title = `${enemy.Name} - ID:${enemy.battle_enemy_id} - Dissidia Compendium`

    const [selectedbuff, setselectedbuff] = useStateIfMounted([]);

    const buffselect = (buffs) =>{
        if(selectedbuff.unq_id == buffs.unq_id){
            setselectedbuff([])
        } else {
        setselectedbuff(buffs)
        }
    }

    const [showmeraw,setshowmeraw] = useStateIfMounted(false)
    const [showmestats,setshowmestats] = useStateIfMounted(false)

    const handleClick = (e) =>{
        if (e.shiftKey) {
            setshowmeraw((prev)=>!prev)
        }
    }

    const debuginfo = {
        enemy_id: enemy.enemy_id,
        ai_: enemy.ai_,
        unit_type_id: enemy.unit_type_id
    }

    useEffect(()=>{
        if(stats != undefined){
            setshowmestats(
                {
                    id0: stats.id0,
                    id1: stats.id1,
                    id2: stats.id2,
                    id3: stats.id3,
                    id4: stats.id4,
                    id5: stats.id5,
                    id6: stats.id6,
                    id7: stats.id7,
                    id8: stats.id8,
                    id9: stats.id9,
                }
            )
        }
        // eslint-disable-next-line 
    },[stats])

    const ForceTimeSelect = (number) => {
        if(ran == true){
            setForcetimeTabsearch(`${number}`)
            setForcetimeTab(number)
            setran(false)
        }
      }
    const toggle_jp=()=>{
        setshowjp((prevValue)=>!prevValue)
    }

    return(
        <div className="wrapper">
            <Helmet>
                  <title>{title}</title>
                  <meta name="description" content={enemy.Name}/>
                  <meta name="twitter:title" content={title}/>
                  <meta name="twitter:description" content={enemy.Name}/>
                  <meta name="twitter:image" content={"https://dissidiacompendium.com/images/static/enemy/face/" + enemy.url}/>
                  <meta name="twitter:card" content="summary"/>
                  <meta name="twitter:image:alt" content={`${enemy.Name}`}/>
                  <meta property="og:title" content="Dissidia Compendium"/>
                  <meta property="og:description" content={enemy.Name}/>
                  <meta property="og:image" content={"https://dissidiacompendium.com/images/static/enemy/face/" + enemy.url}/>
                  <meta property="og:url" content={`https://dissidiacompendium.com/bestiary/enemies/${enemy.battle_enemy_id}`}/>
            </Helmet>
            <div className="content">
                {movetotop == true ?
                <ScrollToTop/>
                :""}
                <div className="returnbutton">
                <DefaultTippy content={"Return to Bestiary"} className="tooltip" >
                <Link className="returnlink" to={`/bestiary`}>
                    <div className="returnicon"></div>
                </Link>
                </DefaultTippy>
                </div>
                {nextEnemy == false ? "":
                <Link to={`/bestiary/enemies/${nextEnemy.battle_enemy_id}`}>
                <DefaultTippy content={<span>{nextEnemy.Name}<br/>ID: {nextEnemy.battle_enemy_id}</span>} className="tooltip" >
                <div className="nextbutton">
                    <ImArrowRight className="nexticon"/>
                </div>
                </DefaultTippy>
                </Link>}
                {previousEnemy == false ? "":
                <Link to={`/bestiary/enemies/${previousEnemy.battle_enemy_id}`}>
                <DefaultTippy content={<span>{previousEnemy.Name}<br/>ID: {previousEnemy.battle_enemy_id}</span>} className="tooltip" >
                <div className="previousbutton">
                    <ImArrowLeft className="previousicon"/>
                </div>
                </DefaultTippy>
                </Link>}
                <h1>{enemy.Name} - ID: {enemy.battle_enemy_id}
                {enemy.JPName != "" ?
                <div className="jpenemysubtexttitle">
                   {enemy.JPName} 
                </div>
                :""}
                </h1>
                {enemy.Foundin === undefined ?
                <div className="subheader">
                    
                <span>Know where this is enemy is located? Let us know <a className="linktext" target="_blank" rel="noreferrer noopener" href="https://drive.google.com/open?id=1IJE93eDUcKIEKuQH0jwMZ7WaWVcrldUqbc6EyEZRrzs">here</a></span>
                </div> :
                <div className="subheader">
                    <span className="subtextgold">General Location:</span><br/>{enemy.Foundin}<br/>
                    <span className="subtextsmaller">*by name only, not specific ID</span>
                </div>}
                <div className="enemyholderdesc">
                    <div className="imageelementholder">
                            <LazyLoadImage onClick={handleClick} effect="opacity" className={`enemyimage ${enemy.SummonFlag1 == true ? "spansummon" : ""}`} alt={enemy.Name} src={"https://dissidiacompendium.com/images/static/enemy/face/" + enemy.url}/>
                        <div className={`elementsholder elements1 ${enemy.ElementsFlag === true ? "": "nodisplayenemy" }`}>
                            <div className="elementtext">Elements</div>
                            <div className="elementholder">
                                <span className="FireElement"/>
                                <ResistIcon attack="" resist={enemy.Fire}/>
                            </div>
                            <div className="elementholder">
                                <span className="IceElement"/>
                                <ResistIcon attack="" resist={enemy.Ice}/>
                            </div>
                            <div className="elementholder">
                                <span className="ThunderElement"/>
                                <ResistIcon attack="" resist={enemy.Thunder}/>
                            </div>
                            <div className="elementholder">
                                <span className="WaterElement"/>
                                <ResistIcon attack="" resist={enemy.Water}/>
                            </div>
                            <div className="elementholder">
                                <span className="EarthElement"/>
                                <ResistIcon attack="" resist={enemy.Earth}/>
                            </div>
                            <div className="elementholder">
                                <span className="WindElement"/>
                                <ResistIcon attack="" resist={enemy.Wind}/>
                            </div>
                            <div className="elementholder">
                                <span className="HolyElement"/>
                                <ResistIcon attack="" resist={enemy.Holy}/>
                            </div>
                            <div className="elementholder">
                                <span className="DarkElement"/>
                                <ResistIcon attack="" resist={enemy.Dark}/>
                            </div>
                        </div>
                        {summonedenemy1 == undefined ?
                        "" :
                        <div className="summonhiderlarge">
                            <div className="summonedenemysubbanner">Summoned Enemies</div>
                            <ul className="similarenemyholder">
                            <DefaultTippy key={summonedenemy1.Name + summonedenemy1.battle_enemy_id  + "1"} content={enemy.SummonEnemy1.split('\n').map((str,loc) => <div key={loc}>{str}</div>)} className="tooltip" >
                                <li>
                                    <Link key={summonedenemy1.Name + summonedenemy1.battle_enemy_id  + "2"} to={`/bestiary/enemies/${summonedenemy1.battle_enemy_id}`}>
                                            <LazyLoadImage effect="opacity" key={summonedenemy1.Name + summonedenemy1.battle_enemy_id  + "3"} className="similarenemycard" alt={summonedenemy1.Name} src={"https://dissidiacompendium.com/images/static/enemy/face/" + summonedenemy1.url}/>
                                    </Link>
                                </li>
                                </DefaultTippy>
                                {summonedenemy2 == undefined ?
                                "" :
                                <DefaultTippy key={summonedenemy2.Name + summonedenemy2.battle_enemy_id  + "4"} content={enemy.SummonEnemy2.split('\n').map((str,loc) => <div key={loc}>{str}</div>)} className="tooltip" >
                                <li>
                                    <Link key={summonedenemy2.Name + summonedenemy2.battle_enemy_id  + "5"} to={`/bestiary/enemies/${summonedenemy2.battle_enemy_id}`}>
                                        <LazyLoadImage effect="opacity" key={summonedenemy2.Name + summonedenemy2.battle_enemy_id  + "6"} className="similarenemycard" alt={summonedenemy2.Name} src={"https://dissidiacompendium.com/images/static/enemy/face/" + summonedenemy2.url}/>
                                    </Link>
                                </li>
                                </DefaultTippy>}
                            </ul>
                        </div>
                    }
                    </div>
                        <div className="enemytopcard">
                            
                            <div className="enemytoptext">
                            <span className="subtextgold">Name:<br/></span>{enemy.Name}
                            </div>
                            <div className="enemytoptext">
                                <span className="subtextgold">Realm:<br/></span>{enemy.realm === undefined ? "-" : enemy.realm}
                            </div>
                            <div className="enemytoptext">
                                <span className="subtextgold">Type:<br/></span> {enemy.type === undefined ? "-" : enemy.type}
                            </div>
                        </div>
                    {showmeraw == true ?
                    <ReactJson iconStyle={"square"} quotesOnKeys={false} name={"Debug"} displayDataTypes={false} collapsed={false} theme={"threezerotwofour"} src={debuginfo}/>
                    :""}
                </div>
                <div className="statsholder">
                <div className={`enemyholderdesc statsdisplay ${spancheck == false ? "fill" :""}`}>
                    <LevelsFormatting key={enemy.battle_enemy_id} setlevel={setlevel} stats={stats} match={match} alllevels={alllevels} battle_enemy_id={enemy.battle_enemy_id} chase={enemy.chase} enemy_id={enemy.enemy_id} ProcessedLevels={ProcessedLevels} levelurl={levelurl}/>
                    {showmeraw== true ?
                    <ReactJson iconStyle={"square"} quotesOnKeys={false} name={"Stats Commands"} displayDataTypes={false} collapsed={false} theme={"threezerotwofour"} src={showmestats}/>
                    :""}
                </div>
                <div className={`${spancheck == true ? "fill" : "blockdisplay"}`}>
                {enemy.ElementsFlag !== true ? "" : 
                <div className={`enemyholderdesc elements2 ${spancheck == false ? "" :"nomargenemy"}`}>
                    <div className="elementsholder">
                        <div className="elementtext">Elements</div>
                        <div className="elementholder">
                                <span className="FireElement"/>
                                <ResistIcon attack="" resist={enemy.Fire}/>
                            </div>
                            <div className="elementholder">
                                <span className="IceElement"/>
                                <ResistIcon attack="" resist={enemy.Ice}/>
                            </div>
                            <div className="elementholder">
                                <span className="ThunderElement"/>
                                <ResistIcon attack="" resist={enemy.Thunder}/>
                            </div>
                            <div className="elementholder">
                                <span className="WaterElement"/>
                                <ResistIcon attack="" resist={enemy.Water}/>
                            </div>
                            <div className="elementholder">
                                <span className="EarthElement"/>
                                <ResistIcon attack="" resist={enemy.Earth}/>
                            </div>
                            <div className="elementholder">
                                <span className="WindElement"/>
                                <ResistIcon attack="" resist={enemy.Wind}/>
                            </div>
                            <div className="elementholder">
                                <span className="HolyElement"/>
                                <ResistIcon attack="" resist={enemy.Holy}/>
                            </div>
                            <div className="elementholder">
                                <span className="DarkElement"/>
                                <ResistIcon attack="" resist={enemy.Dark}/>
                        </div>
                    </div>
                </div>}
                    {enemy.DamageFlag !== true ? "" :
                    <div className={`enemyholderdescattack ${singlespancheck == true ? "height-fill" : ""}`}>
                    <div className="elementsholder">
                        <div className="elementtext">Attacks</div>
                            <div className="attacktypeholder">
                                <LazyLoadImage effect="opacity" className="damagetypeimage" alt="Melee" src="https://dissidiacompendium.com/images/static/icons/buttons/ability/Ability_Melee_BRV_Blue.png"/>
                                <ResistIcon attack="attack" resist={enemy.Melee}/>
                            </div>
                            <div className="attacktypeholder">
                                <LazyLoadImage effect="opacity" className="damagetypeimage" alt="Ranged" src="https://dissidiacompendium.com/images/static/icons/buttons/ability/Ability_Ranged_BRV_Blue.png"/>
                                <ResistIcon attack="attack" resist={enemy.Ranged}/>
                            </div>
                            <div className="attacktypeholder">
                                <LazyLoadImage effect="opacity" className="damagetypeimage" alt="Magic" src="https://dissidiacompendium.com/images/static/icons/buttons/ability/Ability_Magic_BRV_Blue.png"/>
                                <ResistIcon attack="attack" resist={enemy.Magic}/>
                            </div>
                        </div>
                    </div>}
                    {enemy.AilmentsFlag !== true ? "" :
                    <div className={`enemyholderdescresist ${singlespancheck == true ? "height-fill" : ""}`}>
                        <div className="resistsholder">
                            <div className="resiststext">Resistances</div>
                                <div className="blockresists">
                                    <div className="resisttypeholder">
                                        <DefaultTippy content="+100%"className="tooltip" >
                                        <div className="resistancetextspacer">Low:</div>
                                        </DefaultTippy>
                                        <div className="resistlow">{enemy.AilmentResistsLow == undefined ? "-" : addformatting(enemy.AilmentResistsLow) }</div>
                                    </div>
                                    <div className="resisttypeholder">
                                        <DefaultTippy content="-50%"className="tooltip" >
                                        <div className="resistancetextspacer">High:</div>
                                        </DefaultTippy>
                                        <div className="resisthigh">{enemy.AilmentResistsHigh == undefined ? "-" : addformatting(enemy.AilmentResistsHigh)}</div>
                                    </div>
                                    <div className="resisttypeholder">
                                        <DefaultTippy content="-100%" className="tooltip" >
                                        <div className="resistancetextspacer">Immune:</div>
                                        </DefaultTippy>
                                        <div className="resistimmune">{enemy.AilmentResistsImmune == undefined ? "-" : addformatting(enemy.AilmentResistsImmune)}</div>
                                    </div>
                                </div>
                        </div>
                    </div>}
                    </div>
                 </div>
                    {//where AdvanceInfo was
                    }
                    {enemy.ForceTime != undefined?
                    <div className="enemyholderdesc">
                    <div className="orbcondunit">
                        <div className="orbholder">
                            <div>
                            <DefaultTippy content="Change text">
                                <div className={showjp ? "switch switchchecked": "switch switchunchecked"}  onClick={toggle_jp}>
                                    <div className={showjp ? "slider sliderchecked": "slider sliderunchecked" } ></div>
                                </div>
                            </DefaultTippy>
                                <span className="textsafe">Force Time</span>
                            </div>   
                            <LazyLoadImage effect="opacity" alt="orb" className="orbicon2" src={`https://dissidiacompendium.com/images/static/icons/misc/Shinryu1.png`}/>
                        </div>
                        <div className="orbcondtext">
                        {enemy.ForceTime.map(self=>(
                            <div key={self.id} className="orbconbholder forcebholder">
                                <div><span className="unique">
                                    {showjp == false ? self.name : self.jpname == undefined ? self.name : self.jpname}
                                    </span><br/>
                                    {addformatting(showjp == false ? self.desc : self.jpdesc == undefined ? self.desc : self.jpdesc)}
                                    </div>
                            </div>
                        )) }
                            </div>
                        </div>
                    </div>
                    :''}
                    {enemy[`ForceGauge`] != undefined && enemy[`ForceGauge`].length > 1?
                    <ul className="enemybannertabs">
                        {enemy[`ForceGauge`].map((self,i)=>(
                        <li key={i} className={ForcetimeTab == i ? "active" : ""} onClick={()=>ForceTimeSelect(i)}>
                            {ForcetimeTab == i ?<span className="gemselected"/>
                            :""}
                            {`Force Time ${i+1}`}
                        </li>
                        ))}
                    </ul>
                    :""}
                    {enemy[`ForceGauge`] && enemy[`ForceGauge`][ForcetimeTab] != undefined ?
                    <div className={`enemyholderdesc${enemy[`ForceGauge`].length > 1 ? "2":""}`}>
                        <div className="enemyforcesubbanner">Force Gauge</div>
                        {enemy[`ForceGauge`][ForcetimeTab] && enemy[`ForceGauge`][ForcetimeTab].ForceGauge.sort((a,b)=>a.id-b.id).map((self,i)=>(
                            <div className="buffunit" key={i}>
                                <div className="infoholder egfbanner">
                            <div className={`infonameholderenemybuff centeralign ${self.name == "Force Weakness" ? "blackbanner" : self.name =="Force Gauge Increase" ? "Buffbanner" : "Debuffbanner"}`}>
                                <span className="unique">
                                    {self.name && replace_title(showjp == false ? self.name : self.jpname == undefined ? self.name : self.jpname )}
                                </span>
                                {self.name == "Force Weakness" ? "":
                                <EnemyForceGauge gauge_min={self.gauge_min} gauge_max={self.gauge_max}/>
                                }
                            </div>
                            <div className={`efginfobase efgbase fontnormal ${self.name == "Force Weakness" ? "blackbase" : self.name =="Force Gauge Increase" ? "Buffbase" : "Debuffbase"}`}>
                            {self.desc && addformatting(showjp == false ? self.desc : self.jpdesc == undefined ? self.desc : self.jpdesc )}
                            </div>
                            </div>
                            </div>
                        ))}
                        <div className="subtextfg">*displays effect range</div>
                    </div>
                    :""}
                    {enemy.OrbFlag == true ?
                    <div className="enemyholderdesc">
                        <div className="orbcondunit">
                            <div className="orbholder">
                            <DefaultTippy content="Change text">
                                <div className={showjp ? "switch switchchecked": "switch switchunchecked"}  onClick={toggle_jp}>
                                    <div className={showjp ? "slider sliderchecked": "slider sliderunchecked" } ></div>
                                </div>
                            </DefaultTippy>
                                <div>
                                    <span className="textsafe">Special Counter</span>
                                </div>   
                                <LazyLoadImage effect="opacity" alt="orb" className="orbicon" src={`https://dissidiacompendium.com/images/static/icons/misc/43${enemy.LufeniaPlusFlag == true ? "+": ""}.png`}/>
                                {enemy.LufeniaStartCounter === undefined ? "" :
                                <div>
                                    <span className="textsafe">Start count: <span className="values">{enemy.LufeniaStartCounter}</span></span>
                                </div>
                                }
                            </div>
                            <div className="orbcondtext">
                            {enemy.LufeniaCons != undefined ?
                            enemy.LufeniaCons.map((self,key)=>(
                                <div key={key} className="orbconbholder">
                                    <div className={self.desc.slice(0, self.desc.indexOf(":"))}>
                                        {addformatting(showjp == false ? self.desc : self.jpdesc == undefined ? self.desc : cleaner(self.jpdesc))}
                                    </div>
                                </div>
                            ))   
                            :""}
                            </div>
                        </div>
                    </div>
                    :
                    ""}
                    {helpers.length == 0 ? "" :
                        <div className="characterhelper" key={helpers}>
                            <div className="similarbanner">
                            <DefaultTippy content={`${jptoggledata == true? "Switch to GL" : "Switch to JP"}`} className="tooltip" >
                                <span onClick={jponlybutton} className={`${jptoggledata ? "jpflage jpsmallinactive smalleventbutton" : "glflage smalleventbutton"}`}/>
                            </DefaultTippy>
                               {" Potential Special Helpers"}</div>
                            <div className="filterholderflair">
                            <ul className="CharNameHolder" style={{columnCount: columns, MozColumnsCount: columns, WebkitColumnsCount: columns}}>
                            {helpers.map((self,i)=>(
                                <li key={i}>
                                    <Link className="linkforce" to={`/characters/${self.ShortName}`}>
                                        {self.CharacterName}:
                                    </Link><br/>
                                   
                                    {self.roles.map((self3,i)=>(
                                        <Tippy key={i} content={roles[self3] && roles[self3].name}>
                                        <span className="rolesforforce" style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[self3] && roles[self3].url}.png)`}}>
                                        </span>
                                        </Tippy>
                                    ))}
                                    
                                </li>
                            ))}
                        </ul>
                        </div>
                        <div className="subtext">{"*Dependant on "}
                        <DefaultTippy content={`${jptoggledata == true? "Switch to GL" : "Switch to JP"}`} className="tooltip" >
                        <span onClick={jponlybutton} className={`${jptoggledata ? "jpflage jpsmallinactive smalleventbutton" : "glflage smalleventbutton"}`}/>
                    </DefaultTippy>{" version"}</div>
                        </div>
                    }
                    {summonedenemy1 == undefined ?
                    "" :
                        <div className="enemyholderdesc summonhidersmall">
                            <div className="summonedenemysubbanner">Summoned Enemies</div>
                            <ul className="summonedenemyholder">
                                <DefaultTippy key={summonedenemy1.Name + summonedenemy1.battle_enemy_id  + "7"} content={<span>{summonedenemy1.Name}<br/>ID: {summonedenemy1.battle_enemy_id}</span>} className="tooltip" >
                                    <li>
                                        <Link key={summonedenemy1.Name + summonedenemy1.battle_enemy_id  + "8"} to={`/bestiary/enemies/${summonedenemy1.battle_enemy_id}`}>
                                        <LazyLoadImage effect="opacity" key={summonedenemy1.Name + summonedenemy1.battle_enemy_id  + "9"} className="enemycard" alt={summonedenemy1.Name} src={"https://dissidiacompendium.com/images/static/enemy/face/" + summonedenemy1.url}/>
                                        </Link>
                                    </li>
                                </DefaultTippy>
                                {summonedenemy2 == undefined ?
                                "" :
                                <DefaultTippy key={summonedenemy2.Name + summonedenemy2.battle_enemy_id  + "10"} content={<span>{summonedenemy2.Name}<br/>ID: {summonedenemy2.battle_enemy_id}</span>} className="tooltip" >
                                    <li>
                                    <Link key={summonedenemy2.Name + summonedenemy2.battle_enemy_id  + "11"} to={`/bestiary/enemies/${summonedenemy2.battle_enemy_id}`}>
                                        <LazyLoadImage effect="opacity" key={summonedenemy2.Name + summonedenemy2.battle_enemy_id  + "12"} className="enemycard" alt={summonedenemy2.Name} src={"https://dissidiacompendium.com/images/static/enemy/face/" + summonedenemy2.url}/>
                                    </Link>
                                    </li>
                                </DefaultTippy>}
                            </ul>
                        </div>
                    }
                    {enemy.BattleAspects == null ? "" :
                        <div className="enemyholderdesc">
                        <div className="enemydescholder">
                            <div className="enemysubheader">※ Battle Aspects ※</div>
                            {enemy.BattleAspects == undefined ? "" : addformatting(enemy.BattleAspects)}
                        </div>
                    </div>
                    }
                    {enemy.CastingBuffs == undefined ? "" :
                    <div className="characterhelper">
                      <div className={`bufflistbanner noselect fullnow newblue makeright`}>
                      <div className="unique ailmenttext">Starting Buffs:</div>
                      <ul className="abilitybufflist"> 
                        {enemy.CastingBuffs.map(buffs => (
                        <li className={`abilitybufficonsholder ${selectedbuff.unq_id == buffs.unq_id ? "buffactive" : ""}`} key={buffs.unq_id}>
                            <div className="biconspacer" onClick={() => buffselect(buffs)} >
                                <Tippy content={buffs.name && replace_title(buffs.cast_str+ " #" + buffs.id) }>
                                <img alt={buffs.name} className={`clicky abilitybufficon `} src={"https://dissidiacompendium.com/images/static/" +buffs.icon} />
                                </Tippy>
                                </div>
                            </li>
                        ))}
                        </ul>
                        </div>
                    {selectedbuff.length == 0 ? "" :
                        <div className={`${selectedbuff.is_buff == 0 ? "Debuff" : "Buff"}base infobase makeright`}>
                            <div className={`${selectedbuff.is_buff == 0 ? "Debuff" : "Buff"}subbanner`}>
                            {selectedbuff.name && replace_title(selectedbuff.cast_str)}{` #${selectedbuff.id}`}
                            {selectedbuff.jpname == "" || selectedbuff.jpname == undefined?
                            <div className="abilityJPname">
                                {replace_title(selectedbuff.name)}
                            </div>
                            :
                            <div className="abilityJPname">
                            {selectedbuff.jpname && replace_title(selectedbuff.jpname)}
                            </div>}
                            </div>
                            <Ailment_Data_Formatting 
                            key={selectedbuff}
                            ailment_data={selectedbuff}/>
                        </div>}
                        </div>
                        }
                    <ul className="enemybannertabs">
                        <Link to={`/bestiary/enemies/${battle_enemy_id}/${stats&& stats.data_index}`}>
                        <li className={abilities == undefined ? "active" : ""} >
                        {abilities == undefined ?
                        <span className="gemselected"/>
                        :""}
                            Desc
                            </li>
                        </Link>
                        {enemy.Infographic != undefined ?
                        <Link to={`/bestiary/enemies/${battle_enemy_id}/${stats&& stats.data_index}/infographic`}>
                        <li className={abilities == "infographic" ? "active" : ""} >
                        {abilities == "infographic" ?
                        <span className="gemselected"/>
                        :""}
                            Infographics
                            </li>
                        </Link>
                        :""}
                        <Link to={`/bestiary/enemies/${battle_enemy_id}/${stats&& stats.data_index}/abilities`}>
                        <li className={abilities == "abilities" ? "active" : ""} >
                        {abilities == "abilities" ?
                        <span className="gemselected"/>
                        :""}
                            Abilities
                            </li>
                        </Link>
                    </ul>
                    <div className="enemyholderdesc2 normalfont">
                            {abilities == undefined ?
                            <div className="enemydescholder">
                            <div className="enemysubheader">※ Abilities Description ※</div>
                            <DefaultTippy content="Change text">
                                <div className={showjp ? "switch switchchecked": "switch switchunchecked"}  onClick={toggle_jp}>
                                    <div className={showjp ? "slider sliderchecked": "slider sliderunchecked" } ></div>
                                </div>
                            </DefaultTippy>
                            {enemy.desc == undefined ? "" : addformatting(showjp == false ? enemy.desc : enemy.jpdesc == undefined ? enemy.desc : enemy.jpdesc)}
                            </div>
                            :
                            ""
                            }
                            {abilities == "abilities" ?
                            <EnemyAbilities_MasterListDirect 
                            stats={stats} 
                            ai={enemy.ai_} 
                            showmeraw={showmeraw} 
                            battle_enemy={battle_enemy}/>
                            :""}
                            {abilities == "infographic" && enemy.Infographic != undefined?
                            enemy.Infographic.map(self=>(
                                <div key={self}>
                                    <a target="_blank" rel="noreferrer" href={`https://dissidiacompendium.com/images/static/info/${self}.png`}>
                                    <img  className="infoimg withshadow clicky" src={`https://dissidiacompendium.com/images/static/info/${self}.png`}/>
                                    </a>
                                </div>
                            ))
                            :""}
                    </div>
                    {eventsin.length == 0 ? "" :
                    <ul className="similarholder nolist">
                        <div className="similarbanner addbordertop addborderbottom">Featured Events</div>
                        {eventsin.map(events => (
                        <EventListing key={events.eventindex} match={events} permapage={false}/>
                    ))}
                    </ul>
                    }
                    {similarids[0] !== undefined ? 
                    <div className="similarholder">
                        <div className="similarbanner addbordertop addborderbottom">Similar Enemies</div>
                        <ul className="enemyholder similarformating">
                        {similarids.map(similarids => (
                            <EnemyListingDirect key={similarids.battle_enemy_id} match={similarids} />
                        ))} 
                        </ul>
                    </div>:
                    ""}
                </div>
        </div>
    )
}
export default EnemyFormattingDirect;