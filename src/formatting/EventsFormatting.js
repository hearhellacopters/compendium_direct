import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom'
import FaceMaker from './CharFaceFormatting.js'
import EnemyListingDirect from './EnemyListingDirect.js'
import ReminderMaker from './ReminderMaker.js';
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import GetEvents from '../passoff/GetEventGuides.js'
import {EndsInTimer, StartsInTimer} from './Timers'
import TickDown from '../processing/tickDown'
import TickUp from '../processing/tickUp'

import Sphere_Passive_Ability_Formatting from '../characterpages/direct/formatting/passives/Sphere_Passive_Ability_Formatting.js';
import { useDispatch, useSelector } from "react-redux";
import { getJPToggle } from '../redux/ducks/jptoggle';

//direct
import { getAilmentGroupFull } from '../redux/ducks/ailment_group_full';
import { getCommandGroupFull } from '../redux/ducks/command_group_full';
import { getEnemyResistFull } from '../redux/ducks/enemy_resist_full';
import { getAilmentNames } from '../redux/ducks/ailmentnames';
import { getCommandNames } from '../redux/ducks/commandnames';
import { getCondData } from '../redux/ducks/cond_data';
import { getAilmentEffects } from '../redux/ducks/ailment_effects';
import { getWeaponCat } from '../redux/ducks/weaponcat'
import { getFFSeries} from '../redux/ducks/ffseries'
import { getCharID} from '../redux/ducks/char_id'
import { getCastTargets} from '../redux/ducks/cast_targets'
import { getEquipmentPassiveNames} from '../redux/ducks/equipmentpassivenames'
import { getPassiveNames} from '../redux/ducks/passivenames'
import { getEnemyType} from '../redux/ducks/enemy_type'
import { getPassiveEffects} from '../redux/ducks/passive_effects'
import { getHitTransData} from '../redux/ducks/hittransdata'
import { getCommandTransData} from '../redux/ducks/commandtransdata'
import { getOptionTransData} from '../redux/ducks/optiontransdata'

import { getJPGameListSphere } from '../redux/ducks/JP/gamelist_sphere';
import { getGLGameListSphere } from '../redux/ducks/GL/gamelist_sphere';

const EventsFormatting = ({ match, permapage, EventGuideData }) => {

    useEffect( () =>{
        setBannerdisplay("Banner1");
        setEventURL("Event1");
        setShowingLinks(permapage)
      },[permapage]);

    const [eventURL, setEventURL] = useState("Event1")
    const [showingBanners, setShowingBanners] = useState(false)
    const [showingLinks, setShowingLinks] = useState(false)
    const [bannerdisplay, setBannerdisplay] = useState("Banner1")
    const [selectedbanner, setselectedbanner] = useState()
    const [showingsphereslist, setshowingsphereslist] = useState(permapage == true ? true : false)
    const [spheres_holder, setspheres_holder] = useState()

    useEffect( () =>{
        if(match.bannercount != 0 && match.banners && match.banners.length != 0){
            setselectedbanner(match.banners[0])
        } else {
            setselectedbanner()
        }
      },[match,permapage]);

    const totalbannercount = match.bannercount == undefined ? 0 : match.bannercount;

    const currenttime = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function ordinal(n) {
        var s = ["th", "st", "nd", "rd"];
        var v = n%100;
        return n + (s[(v-20)%10] || s[v] || s[0]);
      }

    const caldata = {
        name: `${match.name} Event`,
        details: `Opera Omnia ${match.tempdate == false ? "GL Event " : "JP Event " }` + match.name,
        startsAt: match.tempdate == true ? match.JPindate : match.indate,
        endsAt: match.tempdate == true ? match.JPoutdate : match.outdate,
    }

    const handleSelectBanner =(bannerdata,bannernumber)=>{
        setselectedbanner(bannerdata)
        setBannerdisplay(bannernumber)
    }

    const [CastNames,setCastNames] = useState()
    const [effect_, seteffect_] = useState()
    const [require_passive,setrequire_passive] = useState()
    const [passive_target,setpassive_target] = useState()
    const [trap_type,settrap_type] = useState()
    const [param_id,setparam_id] = useState()
    const [attack_type,setattack_type] = useState()
    const [killer_type,setkiller_type] = useState()
    const [elementid_1,setelementid_1] = useState()
    const [command_type,setcommand_type] = useState()
    const [target_range_,settarget_range_] = useState()

    const dispatch = useDispatch();

    const AilmentNames = useSelector((state) => 
    state.ailmentnames.ailmentnames
    );
	
	useEffect(() => {
        let mounted = true
        if (mounted && AilmentNames == undefined) {
        dispatch(getAilmentNames());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,AilmentNames])
	
	const CommandNames = useSelector((state) => 
    state.commandnames.commandnames
    );
	
	useEffect(() => {
        let mounted = true
        if (mounted && CommandNames == undefined) {
        dispatch(getCommandNames());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,CommandNames])
	
	const CondData = useSelector((state) => 
    state.conddata.conddata
    );
	
	useEffect(() => {
        let mounted = true
        if (mounted && CondData ==undefined) {
        dispatch(getCondData());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,CondData])
	
	const Ailment_Effects = useSelector((state) => 
    state.ailment_effects.ailment_effects
    );

    useEffect(() => {
        let mounted = true
        if (mounted && Ailment_Effects ==undefined) {
        dispatch(getAilmentEffects());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,Ailment_Effects]);
	
	const MessageData_Category = useSelector((state) => 
    state.weaponcat.weaponcat
    );
	
	useEffect(() => {
        let mounted = true
        if (mounted && MessageData_Category == undefined) {
        dispatch(getWeaponCat());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,MessageData_Category])
	
	const MessageData_FFSeries = useSelector((state) => 
    state.ffseries.ffseries
    );
	
	useEffect(() => {
        let mounted = true
        if (mounted && MessageData_FFSeries == undefined) {
        dispatch(getFFSeries());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,MessageData_FFSeries])

    const char_id = useSelector((state) => 
    state.charid.charid
    );

    useEffect(() => {
        let mounted = true
        if (mounted && char_id == undefined) {
        dispatch(getCharID());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,char_id]);

    const casttargets = useSelector((state) => 
    state.casttargets.casttargets
    );

    useEffect(() => {
        let mounted = true
        if (mounted && casttargets == undefined) {
        dispatch(getCastTargets());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,casttargets]);
	
	const EquipmentPassiveNames = useSelector((state) => 
    state.equipmentpassivenames.equipmentpassivenames
    );
	
	useEffect(() => {
        let mounted = true
        if (mounted && EquipmentPassiveNames ==undefined) {
        dispatch(getEquipmentPassiveNames());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,EquipmentPassiveNames]);
	
	const PassiveNames = useSelector((state) => 
    state.passivenames.passivenames
    );

	useEffect(() => {
        let mounted = true
        if (mounted && PassiveNames ==undefined) {
        dispatch(getPassiveNames());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,PassiveNames]);
	
	const enemy_type = useSelector((state) => 
    state.enemy_type.enemy_type
    );

    useEffect(() => {
        let mounted = true
        if (mounted && enemy_type == undefined) {
        dispatch(getEnemyType());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,enemy_type]);
	
	const passive_effects = useSelector((state) => 
    state.passive_effects.passive_effects
    );

    useEffect(() => {
        let mounted = true
        if (mounted && passive_effects ==undefined) {
        dispatch(getPassiveEffects());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,passive_effects]);
	
	const hit_data_effects = useSelector((state) => 
    state.hit_trans_data.hit_trans_data
    );

    useEffect(() => {
        let mounted = true
        if (mounted && hit_data_effects ==undefined) {
        dispatch(getHitTransData());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,hit_data_effects]);
	
	const command_data_effects = useSelector((state) => 
    state.command_trans_data.command_trans_data
    );

    useEffect(() => {
        let mounted = true
        if (mounted && command_data_effects ==undefined) {
        dispatch(getCommandTransData());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,command_data_effects]);

    const option_trans_data = useSelector((state) => 
    state.option_trans_data.option_trans_data
    );

    useEffect(() => {
        let mounted = true
        if (mounted && option_trans_data ==undefined) {
        dispatch(getOptionTransData());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,option_trans_data]);
	
	//version change
	
	const ailment_group = useSelector((state) => 
    state.ailment_group_full.ailment_group_full
    );
 

    useEffect(() => {
        let mounted = true
        if (mounted && ailment_group == undefined) {
        dispatch(getAilmentGroupFull());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,ailment_group])

    const command_group = useSelector((state) => 
    state.command_group_full.command_group_full
    );
 

    useEffect(() => {
        let mounted = true
        if (mounted && command_group == undefined) {
        dispatch(getCommandGroupFull());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,command_group])
	
	const enemy_resist = useSelector((state) => 
    state.enemy_resist_full.enemy_resist_full
    );
 
    useEffect(() => {
        let mounted = true
        if (mounted && enemy_resist == undefined) {
        dispatch(getEnemyResistFull());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,enemy_resist])


    const jptoggledata = useSelector((state) => 
    state.toggle.toggle
    );

    useEffect(() => {
        let mounted = true
        if (mounted) {
        dispatch(getJPToggle());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch]);

    const [ProcessedSpheres, setProcessedSpheres] = useState()
    const [ver, setver] = useState(jptoggledata == true ? "JP" : "GL")

    const jp_gamelist_sphere = useSelector((state) => state.jp_gamelist_sphere.jp_gamelist_sphere)

    const gl_gamelist_sphere = useSelector((state) => state.gl_gamelist_sphere.gl_gamelist_sphere)

    useEffect(() => {
        let mounted = true
        if(mounted && match && match.tempdate == true && jp_gamelist_sphere == undefined){
            setProcessedSpheres()
            dispatch(getJPGameListSphere())
            setver("JP")
        }
        return function cleanup() {
            mounted = false
        }
    },[dispatch,match,jp_gamelist_sphere])

    useEffect(() => {
        let mounted = true
        if(mounted && match && match.tempdate == false && gl_gamelist_sphere == undefined){
            setProcessedSpheres()
            dispatch(getGLGameListSphere())
            setver("GL")
        }
        return function cleanup() {
            mounted = false
        }
    },[dispatch,match,gl_gamelist_sphere])

    useEffect(()=>{
        if(match && match.tempdate == true &&  jp_gamelist_sphere != undefined){
            setProcessedSpheres(jp_gamelist_sphere)
            setver("JP")
        }
        if(match && match.tempdate == false &&  gl_gamelist_sphere != undefined){
            setProcessedSpheres(gl_gamelist_sphere)
            setver("GL")
        }
    },[dispatch,match,gl_gamelist_sphere,jp_gamelist_sphere])

    useEffect(()=>{
        if(match.SpheresList && match.SpheresList.length != 0 && showingsphereslist == true && passive_effects != undefined && AilmentNames != undefined){
            //skip
            var getcastnames = Object.values(AilmentNames).map(self=>{
                return {[self.castID]: self}
              })
            
            const CastNames2 = getcastnames.reduce(function(result, item) {
            var key = Object.keys(item)[0]; //first property: a, b, c
            result[key] = item[key];
            return result;
            }, {});

            setCastNames(CastNames2)

            if(passive_effects != undefined){
                seteffect_(passive_effects.effect_)
                setrequire_passive(passive_effects.require_passive)
                setpassive_target(passive_effects.passive_target)
                settrap_type(passive_effects.trap_type)
                setparam_id(passive_effects.param_id)
                setattack_type(passive_effects.attack_type)
                setkiller_type(passive_effects.killer_type)
                setelementid_1(passive_effects.elementid_1)
                setcommand_type(passive_effects.command_type)
                settarget_range_(passive_effects.target_range_)
            }
        }
    },[match,showingsphereslist,AilmentNames,passive_effects])

    useEffect(()=>{
        if(match.SpheresList && match.SpheresList.length != 0 && showingsphereslist == true && ProcessedSpheres != undefined){
            const holder = []
            match.SpheresList.forEach(self=>{
                const pull = ProcessedSpheres.filter(self2=>self.CharID == self2.CharID && self2.RF == true)
                if(pull.length != 0){
                    holder.push(pull[0])
                }
            })
            if(holder.length != 0){
                setspheres_holder(holder)
            }

        }
    },[jptoggledata,match,showingsphereslist,ProcessedSpheres])

    return(
        <li id={match.type} key={match.eventindex}>
            <div className={permapage == true ? "singleeventtitlebanner" : "eventtitlebanner"} style={{ minHeight: "40px"}}>
                {permapage == false ? 
                <Link to={`/events/` + match.eventindex} >
                    <h3 className={permapage == false ? "toevents" : "atevents"}>{match.name}</h3>
                </Link> :
                <h3 className={permapage == false ? "toevents" : "atevents"}>{match.name}</h3>
                }
                    {currenttime >= new Date(match.outdate) ? (
                        match.permanent == true ? (
                            <LazyLoadComponent>
                            <div className="tickholder greencolor">
                                <div className="glshadow"><span className='emoji'>🌎</span></div>&nbsp;<TickUp value={months[new Date(match.indate).getMonth()]}/><TickUp value={ordinal(new Date(match.indate).getDate())}/><TickUp value={new Date(match.indate).getFullYear()}/>
                            </div>
                            </LazyLoadComponent>
                        ) : (
                            <LazyLoadComponent>
                            <div className="tickholder redcolor">
                                <div className="glshadow"><span className='emoji'>🌎</span></div>&nbsp;<TickDown value={months[new Date(match.outdate).getMonth()]}/><TickDown value={ordinal(new Date(match.outdate).getDate())}/><TickDown value={new Date(match.outdate).getFullYear()}/>
                            </div>
                            </LazyLoadComponent>
                        )
                    ) : match.tempdate == true ? 
                        <LazyLoadComponent>
                            <div className="greencolor">
                                <div className="tickholder">
                                <div className="glshadow"><span className='emoji'>🌎</span></div>&nbsp;<TickUp value={months[new Date(match.indate).getMonth()]}/><div className="spacerleft"><TickUp value={new Date(match.indate).getFullYear()}/></div>
                                </div>
                            {match.JPindate == undefined ? "" :
                            currenttime <= new Date(match.JPindate) ?
                                <StartsInTimer expiryTimestamp={new Date(match.JPindate)} JPFlag={true}/> : 
                                new Date(match.JPoutdate) <= currenttime ? "" :
                                    match.permanent == true ?(
                                        <div className="tickholder greencolor">
                                    <span className="jpflagtick"></span>&nbsp;<TickUp value={months[new Date(match.JPindate).getMonth()]}/><TickUp value={ordinal(new Date(match.JPindate).getDate())}/><TickUp value={new Date(match.JPindate).getFullYear()}/>
                                    </div>) :
                                    <EndsInTimer expiryTimestamp={new Date(match.JPoutdate)} JPFlag={true}/>}
                            </div> 
                        </LazyLoadComponent>
                     : currenttime <= new Date(match.indate) ? (
                        <LazyLoadComponent>
                            <StartsInTimer expiryTimestamp={new Date(match.indate)} JPFlag={false} />
                        </LazyLoadComponent>
                    ) : match.permanent == false ? (
                        <LazyLoadComponent>
                            <EndsInTimer expiryTimestamp={new Date(match.outdate)} JPFlag={false}/>
                        </LazyLoadComponent>
                        )
                    : (
                        <LazyLoadComponent>
                            <div className="tickholder greencolor">
                            <div className="glshadow"><span className='emoji'>🌎</span></div>&nbsp;<TickUp value={months[new Date(match.indate).getMonth()]}/><TickUp value={ordinal(new Date(match.indate).getDate())}/><TickUp value={new Date(match.indate).getFullYear()}/>
                            </div>
                        </LazyLoadComponent>
                    )}
            </div>
            {permapage == true ? 
                        match.tempdate == false && new Date(match.outdate) >= currenttime || match.tempdate == true  &&  match.JPindate != undefined && new Date(match.JPoutdate) >= currenttime?
                        <div className="znone">
                        <div className="eventtitlebanner">
                        <ReminderMaker eventdata={caldata}>
                            Reminder
                        </ReminderMaker>
                        </div>
                        </div>
                    : "": ""}
            <div className="eventimageholder">
                <div className="eventholder">
                    {match.url2 == undefined ? 
                    permapage == false ? 
                    <Link to={`../events/${match.eventindex}`}>
                    <LazyLoadImage effect="opacity" className={`eventimage withshadow ${permapage == false ? "showlink" : ""}`} src={match.url1} alt={match.name} />
                    </Link>
                    :
                    <LazyLoadImage effect="opacity" className={`eventimage withshadow ${permapage == false ? "showlink" : ""}`} src={match.url1} alt={match.name} />
                    : 
                    <div className="eventtabs">
                        <div className="eventwithbackgorundtabs withshadow">
                            {permapage == false ? 
                            <Link to={`../events/${match.eventindex}`}>
                            <LazyLoadImage effect="opacity" className={`eventimage ${permapage == false ? "showlink" : ""}`} src={
                            eventURL == "Event1" ? match.url1 :
                            eventURL == "Event2" ? match.url2 :
                            eventURL == "Event3" ? match.url3 :
                            eventURL == "Event4" ? match.url4 :
                            ""
                            } alt={match.name} />
                            </Link> :
                            <LazyLoadImage effect="opacity" className={`eventimage ${permapage == false ? "showlink" : ""}`} src={
                            eventURL == "Event1" ? match.url1 :
                            eventURL == "Event2" ? match.url2 :
                            eventURL == "Event3" ? match.url3 :
                            eventURL == "Event4" ? match.url4 :
                            ""
                            } alt={match.name} />
                            }
                        </div>
                        {match.url3 == undefined ? 
                        <ul className="eventablist">
                            <li onClick={() => setEventURL("Event1")} className={eventURL == "Event1" ? "activeeventtab" : "inactiveeventtab"} >
                                Event 1
                            </li>
                            <li onClick={() => setEventURL("Event2")} className={eventURL == "Event2" ? "activeeventtab" : "inactiveeventtab"}>
                                Event 2
                            </li>
                        </ul> :
                        match.url4 == undefined ? 
                         <ul className="eventablist">
                            <li onClick={() => setEventURL("Event1")} className={eventURL == "Event1" ? "activeeventtab" : "inactiveeventtab"}>
                                Event 1
                            </li>
                            <li onClick={() => setEventURL("Event2")} className={eventURL == "Event2" ? "activeeventtab" : "inactiveeventtab"}>
                                Event 2
                            </li>
                            <li onClick={() => setEventURL("Event3")} className={eventURL == "Event3" ? "activeeventtab" : "inactiveeventtab"}>
                                Event 3
                            </li>
                         </ul> :
                         <ul className="eventablist">
                         <li onClick={() => setEventURL("Event1")} className={eventURL == "Event1" ? "activeeventtab" : "inactiveeventtab"}>
                             Event 1
                         </li>
                         <li onClick={() => setEventURL("Event2")} className={eventURL == "Event2" ? "activeeventtab" : "inactiveeventtab"}>
                             Event 2
                         </li>
                         <li onClick={() => setEventURL("Event3")} className={eventURL == "Event3" ? "activeeventtab" : "inactiveeventtab"}>
                             Event 3
                         </li>
                         <li onClick={() => setEventURL("Event4")} className={eventURL == "Event4" ? "activeeventtab" : "inactiveeventtab"}>
                             Event 4
                         </li>
                      </ul>
                        }
                    </div>
                    }
                    {match.BTChar != undefined ?
                    <div className="spanhelper">
                    <LazyLoadImage effect="opacity" className="BTCharacter noselect" src={match.BTCharacter} alt={match.BTUnit.CharacterName} />
                    </div>
                    : ""}
                    {match.EnemyList.length != 0 ?
                    <div className="znone">
                    <div className="enemyunits" >
                        <div className="featuredbanner">Featured Enemies</div>
                        <ul className="enemyevents">
                        {match.EnemyList.map(Enemy => (
                            <EnemyListingDirect key={Enemy.key} match={Enemy}/>
                        ) )}
                     </ul>
                     </div>
                     </div>: ""
                    }
                    {match.CharList.length != 0 ?
                    <div className="zone">
                        <div className="featuredbanner">Featured Characters</div>
                        <div className="charholderflair" style={{ minHeight: "40px"}}>
                        <ul className="CharListHolder">
                            <LazyLoadComponent>
                                {match.CharList.map(char => (
                                    <FaceMaker key={char.CharID} match={char} BTUnit={match.BTChar}/>
                                ))
                                }
                            </LazyLoadComponent>
                        </ul>
                    </div>
                    </div>
                    :""
                    }
                    {match.SpheresList.length != 0 ?
                        <div className="zone">
                            <div className="featuredbanner">
                                <div onClick={() => setshowingsphereslist((prevValue) => !prevValue)} className="loadmorespheres">
                                <span className="spheresbutton rfSpheresButton"></span> Spheres
                                </div>
                            </div>
                            {   passive_effects != undefined &&
                                PassiveNames != undefined &&
                                EquipmentPassiveNames != undefined &&
                                AilmentNames != undefined &&
                                CommandNames!= undefined && 
                                CondData!= undefined && 
                                Ailment_Effects != undefined && 
                                MessageData_Category != undefined && 
                                MessageData_FFSeries != undefined && 
                                char_id != undefined && 
                                casttargets != undefined && 
                                enemy_type != undefined &&
                                hit_data_effects != undefined &&
                                command_data_effects != undefined &&
                                option_trans_data != undefined &&
                                
                                ailment_group != undefined && 
                                command_group != undefined && 
                                enemy_resist != undefined &&

                                ver != undefined &&
                                showingsphereslist == true &&
                                spheres_holder != undefined?
                            <div className="sphereslistholder">
                                {spheres_holder.map((passive,i) =>(
                                    <Sphere_Passive_Ability_Formatting
                                    key={passive.pa_id}
                                    passive_ability={passive.passive}
                                    ver={ver}
                                    loc={undefined}
                                    file={"exskill"}
                                    Single={true}
                                    passivenames={PassiveNames}
                                    equipmentpassivenames={EquipmentPassiveNames}
                                    AilmentNames={AilmentNames}
                                    CommandNames={CommandNames}
                                    CondData={CondData}
                                    Ailment_Effects={Ailment_Effects}
                                    MessageData_Category={MessageData_Category}
                                    MessageData_FFSeries={MessageData_FFSeries}
                                    command_data_effects={command_data_effects}
                                    passive_effects_data={passive_effects}
                                    ailment_group={ailment_group}
                                    command_group={command_group}
                                    CastNames={CastNames}
                                    enemy_type={enemy_type}
                                    char_id={char_id}
                                    cast_targets={casttargets}
                                    effect_={effect_}
                                    require_passive={require_passive}
                                    passive_target={passive_target}
                                    trap_type={trap_type}
                                    param_id={param_id}
                                    attack_type={attack_type}
                                    killer_type={killer_type}
                                    elementid_1={elementid_1}
                                    sphere_type={passive.sphere_type}
                                    sphere_letter={passive.ex_category_id}
                                    release={passive.start_date}
                                    target_range_={target_range_}
                                    command_type={command_type}
                                    formatting={true}
                    
                                    banner_color={"newblue"}
                                    base_color={"bluebase"}
                                    raw={passive}
                    
                                    link={"spheres"}
                                    />
                                ))}
                            </div> : ""}
                        </div>
                    :""}
                    {showingLinks == false ? "" :
                    <GetEvents index={match.eventindex} EventGuideData={EventGuideData}/>
                    }
                    {<div className="eventbuttons">
                     <div className="loadbanners" onClick={() => setShowingLinks((prevValue) => !prevValue)}>Community Help</div>
                     {totalbannercount == 0 ? "" :
                     <div className="loadbanners" onClick={() => setShowingBanners((prevValue) => !prevValue)}>Show Banner</div>}
                     </div>}
                    {showingBanners == false ?
                    totalbannercount == 0 ? "" :
                    showingBanners == false || showingLinks == false ? "" :
                    <div className="banneroneventholder"  >
                        <div className="loadbanners" onClick={() => setShowingLinks((prevValue) => !prevValue)}>Community Help</div>
                        {match.bannercount == 0 ? "" : <div className="loadbanners" onClick={() => setShowingBanners((prevValue) => !prevValue)}>Show Banner</div>}
                    </div> 
                        : 
                        <div className="bannerholdertabs">
                            {totalbannercount == 0 || selectedbanner == undefined? "" :
                            totalbannercount == 1 ?
                            <Link to={`../events/banners/${selectedbanner.bannerindex}`}>
                                <LazyLoadImage effect="opacity" className={`bannerimage showlink`} src={selectedbanner.url} alt={selectedbanner.name}/>
                                <div className="bannername">{selectedbanner.name}</div>
                            </Link> :
                            <div className="eventwithbackgorundtabs">
                                <Link to={`/events/banners/${selectedbanner.bannerindex}`}>
                            <LazyLoadImage effect="opacity" className={`bannerimage showlink`} src={selectedbanner.url} alt={selectedbanner.name} />
                                    <div className="bannername">{selectedbanner.name}</div></Link>
                            </div>}
                            {totalbannercount == 1 ? "" :
                            totalbannercount >= 1 ? 
                            <ul className="eventablist">
                                {match.banners.map((self,i)=>(
                                    <li key={i} onClick={() => handleSelectBanner(self,`Banner${i+1}`)} className={bannerdisplay == `Banner${i+1}` ? "activeeventtab" : "inactiveeventtab"} >
                                    {`Banner${i+1}`}
                                </li>
                                ))}                                
                            </ul> : ""}
                        {totalbannercount == 0 ? "" : <div className="loadbanners bottomspace" onClick={() => setShowingBanners(false)}>Hide Banner</div>}
                    </div>
                    }
                </div>
            </div>
        </li>
    )
}
export default EventsFormatting;