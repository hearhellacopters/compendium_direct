import React, { useState, useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import EventListing from '../formatting/SingleEventsFormatting.js'
import DefaultTippy from '../formatting/TippyDefaults.js';
import { Helmet} from 'react-helmet-async';
import { Link, Redirect} from 'react-router-dom'
import ScrollToTop from '../formatting/ScrollToTop.js'
import Random from '../processing/Random.js'
import OhNo from './OhNo.js'
import '../characterpages/CharacterPage.css'
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/scale-subtle.css';
import 'tippy.js/animations/scale-extreme.css';
import FaceMaker from '../formatting/CharFaceFormatting.js'
import CharcterHeader from './CharacterHeader.js'
import { useDispatch } from "react-redux";
import { setFalse, setTrue } from '../redux/ducks/jptoggle'
import { getQuery, getQueryStringVal, useQueryParam } from '../processing/urlparams'
import DevSwitch from '../redux/DevSwitch.js';
import axios from "axios";
import './direct/Direct.css'
import Event_Single from './direct/events.js';
import Buff_bycharacter from './direct/Buff_bycharacter'
import EXP_Passives from './direct/EXP_Passives.js';
import Ability_bycharacter from './direct/Ability_bycharacter.js';
import Crystal_Passives from './direct/Crystal_Passives.js';
import Sum_Fix_Passive from './direct/Board_Passives.js';
import Link_Passives from './direct/Link_Passives.js';
import Equipment_Passives from './direct/Equipment_Passives.js';
import Spheres_Page from './direct/spheres.js';
import Art_bycharacter from './direct/Art_character.js';
import Character_Profile from './direct/character_profiles.js';

const CharacterPageDirect = ({
    Access,
    selected_char,
    ProcessedCharacters,
    ProcessedEventsIndex,
    match,
    jptoggledata,

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
    
    ailment_group_data,
    command_group_data,
    enemy_resist_data,
})=>{

    const formatting =true

    const dispatch = useDispatch();
    
    const [JPsearch, setJPSearch] = useQueryParam("JP", "");
    const [ver, setver] = useStateIfMounted(jptoggledata == true ? "JP" : "GL")
    const [selectedCharaID, setselectedCharaID] = useStateIfMounted(selected_char.CharID)

    const ailment_group = ailment_group_data[ver]
    const command_group = command_group_data[ver]
    const enemy_resist = enemy_resist_data[ver]

    useEffect(()=>{
        setselectedCharaID(selected_char.CharID)
        setver(jptoggledata == true ? "JP" : "GL")
        // eslint-disable-next-line
    },[selected_char,jptoggledata])

    const [random ] = useStateIfMounted(Random(7));

    let currentIndex = ProcessedCharacters.findIndex(x => x.GLOrder == selected_char.GLOrder);
    const nextIndex = (currentIndex + 1) % ProcessedCharacters.length;
    const previousIndex = (currentIndex - 1) % ProcessedCharacters.length;

    const nextevent = (function (){
        const holder = ProcessedCharacters[nextIndex];
        if(nextIndex === 0 ){
            return false;
        } else{
            return holder;
        }
    })();

    const previousevent = (function (){
        const holder = ProcessedCharacters[previousIndex];
        if(holder === undefined ){
            return false;
        } else{
            return holder;
        }
    })();


    useEffect(() => {
        //jp toggle
        if(jptoggledata == true ){
          setJPSearch("true")
        }
        if(getQueryStringVal("JP") == "true" ){
          dispatch(setTrue())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[jptoggledata])


    const [previousIDprofile,setpreviousIDprofile] = useStateIfMounted()
    const [previousIDevent, setpreviousIDevent] = useStateIfMounted()
    const [previousIDspheres, setpreviousIDspheres] = useStateIfMounted()
    const [previousIDboard, setpreviousIDboard] = useStateIfMounted()
    const [previousIDequipment, setpreviousIDequipment] = useStateIfMounted()
    const [previousIDlink, setpreviousIDlink] = useStateIfMounted()
    const [previousIDcpassive,setpreviousIDcpassive] = useStateIfMounted()
    const [previousIDexp,setpreviousIDexp] = useStateIfMounted()
    const [previousIDability,setpreviousIDability] = useStateIfMounted()
    const [previousIDart,setpreviousIDart] = useStateIfMounted()

    const [profiledata,setprofiledata] = useStateIfMounted()
    const [eventdata,seteventdata] = useStateIfMounted()
    const [spheresdata,setspheresdata] = useStateIfMounted([])
    const [boarddata,setboarddata] = useStateIfMounted()
    const [equipmentdata,setequipmentdata] = useStateIfMounted()
    const [linkeddata,setlinkeddata] = useStateIfMounted()
    const [cpassivedata, setcpassivedata] = useStateIfMounted()
    const [expdata, setexpdata] = useStateIfMounted()
    const [abilitydata, setabilitydata] = useStateIfMounted()
    const [buffdata, setbuffdata] = useStateIfMounted()
    const [artdata, setartdata] = useStateIfMounted()

   useEffect(() => {
       //profile
       if(DevSwitch == true && match.params.type == undefined && previousIDprofile != `${selectedCharaID}${ver}` && Access[selectedCharaID][`${ver}basic`] == true){
            setprofiledata(undefined)
            axios.get(`http://localhost:3005/data/character_basic/${ver}New/${selectedCharaID}`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setprofiledata(response)
            setpreviousIDprofile(selectedCharaID)
        }).catch(function(err) {
            console.log(err)
        })
        }
        if(DevSwitch == false && match.params.type == undefined && previousIDprofile != `${selectedCharaID}${ver}` && Access[selectedCharaID][`${ver}basic`] == true){
            setprofiledata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/_m/character_basic/${ver}New/${selectedCharaID}.json`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setprofiledata(response)
            setpreviousIDprofile(selectedCharaID)
        }).catch(function(err) {
            console.log(err)
        })
        }
        //event
        if(DevSwitch == true && match.params.type == "events" && previousIDevent != `${selectedCharaID}${ver}` && Access[selectedCharaID][`${ver}basic`] == true && Access[selectedCharaID][`${ver}events`] == true){
            seteventdata(undefined)
        axios.get(`http://localhost:3005/data/events/${ver}New/${selectedCharaID}`,{'muteHttpExceptions': true}).then((res) => {
        const response = res.data;
        seteventdata(response)
        setpreviousIDevent(selectedCharaID+ver)
        }).catch(function(err) {
            console.log(err)
        })
        }
        if(DevSwitch == false && match.params.type == "events" && previousIDevent != `${selectedCharaID}${ver}` && Access[selectedCharaID][`${ver}basic`] == true && Access[selectedCharaID][`${ver}events`] == true){
            seteventdata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/_m/events/${ver}New/${selectedCharaID}.json`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            seteventdata(response)
            setpreviousIDevent(selectedCharaID+ver)
        }).catch(function(err) {
            console.log(err)
        })
        }
        //spheres
         if(DevSwitch == true && match.params.type == "spheres" && previousIDspheres != `${selectedCharaID}${ver}` && Access[selectedCharaID][`${ver}basic`] == true && Access[selectedCharaID][`${ver}spheres`] == true){
                axios.get(`http://localhost:3005/data/ex_skill/${ver}New/${selectedCharaID}`,{'muteHttpExceptions': true}).then((res) => {
                const response = res.data;
                setspheresdata(response)
                setpreviousIDspheres(selectedCharaID+ver)
            }).catch(function(err) {
                console.log(err)
            })
            }
        if(DevSwitch == false && match.params.type == "spheres" && previousIDspheres != `${selectedCharaID}${ver}` && Access[selectedCharaID][`${ver}basic`] == true && Access[selectedCharaID][`${ver}spheres`] == true){
            axios.get(`https://www.dissidiacompendium.com/data/_dir/_m/ex_skill/${ver}New/${selectedCharaID}.json`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setspheresdata(response)
            setpreviousIDspheres(selectedCharaID+ver)
        }).catch(function(err) {
            console.log(err)
        })
        }
        if(DevSwitch == true && match.params.type == "spheres" && previousIDprofile != `${selectedCharaID}${ver}` && Access[selectedCharaID][`${ver}basic`] == true){
            setprofiledata(undefined)
            axios.get(`http://localhost:3005/data/character_basic/${ver}New/${selectedCharaID}`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setprofiledata(response)
            setpreviousIDprofile(selectedCharaID)
        }).catch(function(err) {
            console.log(err)
        })
        }
        if(DevSwitch == false && match.params.type == "spheres" && previousIDprofile != `${selectedCharaID}${ver}` && Access[selectedCharaID][`${ver}basic`] == true){
            setprofiledata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/_m/character_basic/${ver}New/${selectedCharaID}.json`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setprofiledata(response)
            setpreviousIDprofile(selectedCharaID)
        }).catch(function(err) {
            console.log(err)
        })
        }
        //sum_fix_passive
        if(DevSwitch == true && match.params.type == "boards" && previousIDboard != `${selectedCharaID}${ver}` && Access[selectedCharaID][`${ver}basic`] == true && Access[selectedCharaID][`${ver}sum_fix`] == true){
            setboarddata(undefined)
            axios.get(`http://localhost:3005/data/sum_fix_passive/${ver}New/${selectedCharaID}`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setboarddata(response)
            setpreviousIDboard(selectedCharaID+ver)
        }).catch(function(err) {
            console.log(err)
        })
        }
        if(DevSwitch == false && match.params.type == "boards" && previousIDboard != `${selectedCharaID}${ver}` && Access[selectedCharaID][`${ver}basic`] == true && Access[selectedCharaID][`${ver}sum_fix`] == true){
            setboarddata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/_m/sum_fix_passive/${ver}New/${selectedCharaID}.json`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setboarddata(response)
            setpreviousIDboard(selectedCharaID+ver)
        }).catch(function(err) {
            console.log(err)
        })
        }
        //gear
        if(DevSwitch == true && match.params.type == "gear" && previousIDequipment != `${selectedCharaID}${ver}` && Access[selectedCharaID][`${ver}basic`] == true && Access[selectedCharaID][`${ver}gear`] == true){
            setequipmentdata(undefined)
            axios.get(`http://localhost:3005/data/equipment_passive_character/${ver}New/${selectedCharaID}`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setequipmentdata(response)
            setpreviousIDequipment(selectedCharaID+ver)
        }).catch(function(err) {
            console.log(err)
        })
        }
        if(DevSwitch == false && match.params.type == "gear" && previousIDequipment != `${selectedCharaID}${ver}` && Access[selectedCharaID][`${ver}basic`] == true && Access[selectedCharaID][`${ver}gear`]  == true){
            setequipmentdata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/_m/equipment_passive_character/${ver}New/${selectedCharaID}.json`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setequipmentdata(response)
            setpreviousIDequipment(selectedCharaID+ver)
        }).catch(function(err) {
            console.log(err)
        })
        }
        //link
        if(DevSwitch == true && match.params.type == "force" && previousIDlink != `${selectedCharaID}${ver}` && Access[selectedCharaID][`${ver}basic`] == true && Access[selectedCharaID][`${ver}link`] == true){
            setlinkeddata(undefined)
            axios.get(`http://localhost:3005/data/link_chara/${ver}New/${selectedCharaID}`,{'muteHttpExceptions': true}).then((res) => {               
            const response = res.data;
            setlinkeddata(response)
            setpreviousIDlink(selectedCharaID+ver)
        }).catch(function(err) {
            setlinkeddata([])
            console.log(err)
        })
        }
        if(DevSwitch == false && match.params.type == "force" && previousIDlink != `${selectedCharaID}${ver}` && Access[selectedCharaID][`${ver}basic`] == true && Access[selectedCharaID][`${ver}link`] == true){
            setlinkeddata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/_m/link_chara/${ver}New/${selectedCharaID}.json`,{'muteHttpExceptions': true}).then((res) => {
                const response = res.data;
                setlinkeddata(response)
                setpreviousIDlink(selectedCharaID+ver)
            }).catch(function(err) {
                setlinkeddata([])
                console.log(err.response.status)
            })
        }
        //crystal
        if(DevSwitch == true && match.params.type == "crystal" && previousIDcpassive != `${selectedCharaID}${ver}` && Access[selectedCharaID][`${ver}basic`] == true && Access[selectedCharaID][`${ver}crystal`] == true){
            setcpassivedata(undefined)
            axios.get(`http://localhost:3005/data/crystal_awakening_chara/${ver}New/${selectedCharaID}`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setcpassivedata(response)
            setpreviousIDcpassive(selectedCharaID+ver)
        }).catch(function(err) {
            console.log(err)
        })
        }
        if(DevSwitch == false && match.params.type == "crystal" && previousIDcpassive != `${selectedCharaID}${ver}` && Access[selectedCharaID][`${ver}basic`] == true && Access[selectedCharaID][`${ver}crystal`] == true){
            setcpassivedata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/_m/crystal_awakening_chara/${ver}New/${selectedCharaID}.json`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setcpassivedata(response)
            setpreviousIDcpassive(selectedCharaID+ver)
        }).catch(function(err) {
            console.log(err)
        })
        }
        //exp
        if(DevSwitch == true && match.params.type == "exp" && previousIDexp != `${selectedCharaID}${ver}` && Access[selectedCharaID][`${ver}basic`] == true && Access[selectedCharaID][`${ver}exp`] == true){
            setexpdata(undefined)
            axios.get(`http://localhost:3005/data/chara_level_ability/${ver}New/${selectedCharaID}`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setexpdata(response)
            setpreviousIDexp(selectedCharaID+ver)
        }).catch(function(err) {
            console.log(err)
        })
        }
        if(DevSwitch == false && match.params.type == "exp" && previousIDexp != `${selectedCharaID}${ver}` && Access[selectedCharaID][`${ver}basic`] == true && Access[selectedCharaID][`${ver}exp`] == true){
            setexpdata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/_m/chara_level_ability/${ver}New/${selectedCharaID}.json`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setexpdata(response)
            setpreviousIDexp(selectedCharaID+ver)
        }).catch(function(err) {
            console.log(err)
        })
        }
        //art
        if(DevSwitch == true && match.params.type == "arts" && previousIDart != `${selectedCharaID}${ver}` && Access[selectedCharaID][`${ver}basic`] == true && Access[selectedCharaID][`${ver}art`] == true){
            setartdata(undefined)
            axios.get(`http://localhost:3005/data/art_passive_bycharacter/${ver}New/${selectedCharaID}`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setartdata(response)
            setpreviousIDart(selectedCharaID+ver)
        }).catch(function(err) {
            console.log(err)
        })
        }
        if(DevSwitch == false && match.params.type == "arts" && previousIDart != `${selectedCharaID}${ver}` && Access[selectedCharaID][`${ver}basic`] == true && Access[selectedCharaID][`${ver}art`] == true){
            setartdata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/_m/art_passive_bycharacter/${ver}New/${selectedCharaID}.json`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setartdata(response)
            setpreviousIDart(selectedCharaID+ver)
        }).catch(function(err) {
            console.log(err)
        })
        }
        //ability
        if(DevSwitch == true && match.params.type == "abilities" && previousIDability != `${selectedCharaID}${ver}` && Access[selectedCharaID][`${ver}basic`] == true && Access[selectedCharaID][`${ver}abilities`] == true){
            setabilitydata(undefined)
            axios.get(`http://localhost:3005/data/character_ability_character/${ver}New/${selectedCharaID}`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setabilitydata(response)
            setpreviousIDability(selectedCharaID+ver)
        }).catch(function(err) {
            console.log(err)
        })
            setbuffdata(undefined)
            axios.get(`http://localhost:3005/data/ailmentdefault_character/${ver}New/${selectedCharaID}`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setbuffdata(response)
            setpreviousIDability(selectedCharaID+ver)
        }).catch(function(err) {
            console.log(err)
        })
        }
        if(DevSwitch == false && match.params.type == "abilities" && previousIDability != `${selectedCharaID}${ver}` && Access[selectedCharaID][`${ver}basic`] == true && Access[selectedCharaID][`${ver}abilities`] == true){
            setabilitydata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/_m/character_ability_character/${ver}New/${selectedCharaID}.json`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setabilitydata(response)
            setpreviousIDability(selectedCharaID+ver)
        }).catch(function(err) {
            console.log(err)
        })
            setbuffdata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/_m/ailmentdefault_character/${ver}New/${selectedCharaID}.json`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setbuffdata(response)
            setpreviousIDability(selectedCharaID+ver)
        }).catch(function(err) {
            console.log(err)
        })
        }
        //buffs
        if(DevSwitch == true && match.params.type == "buffs" && previousIDability != `${selectedCharaID}${ver}` && Access[selectedCharaID][`${ver}basic`] == true && Access[selectedCharaID][`${ver}buffs`] == true){
            setabilitydata(undefined)
            axios.get(`http://localhost:3005/data/character_ability_character/${ver}New/${selectedCharaID}`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setabilitydata(response)
            setpreviousIDability(selectedCharaID+ver)
        }).catch(function(err) {
            console.log(err)
        })
            setbuffdata(undefined)
            axios.get(`http://localhost:3005/data/ailmentdefault_character/${ver}New/${selectedCharaID}`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setbuffdata(response)
            setpreviousIDability(selectedCharaID+ver)
        }).catch(function(err) {
            console.log(err)
        })
        }
        if(DevSwitch == false && match.params.type == "buffs" && previousIDability != `${selectedCharaID}${ver}`  && Access[selectedCharaID][`${ver}basic`] == true && Access[selectedCharaID][`${ver}buffs`] == true){
            setabilitydata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/_m/character_ability_character/${ver}New/${selectedCharaID}.json`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setabilitydata(response)
            setpreviousIDability(selectedCharaID+ver)
        }).catch(function(err) {
            console.log(err)
        })
            setbuffdata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/_m/ailmentdefault_character/${ver}New/${selectedCharaID}.json`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setbuffdata(response)
            setpreviousIDability(selectedCharaID+ver)
        }).catch(function(err) {
            console.log(err)
        })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[DevSwitch,ver,match.params.type,previousIDprofile,selectedCharaID,previousIDevent,previousIDboard,previousIDspheres,previousIDequipment,previousIDlink,previousIDcpassive,previousIDexp,previousIDability])

    return(
        <div className="wrapper">
        <Helmet>
            <title>{selected_char.CharacterName} Direct - Dissidia Compendium</title>
            <meta property="og:site_name" content="Dissidia Compendium"/>
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://dissidiacompendium.com"/>
            <meta name="description" content={`${selected_char.CharacterName} Page`}/>
            <meta name="twitter:title" content={`${selected_char.CharacterName} Page`}/>
            <meta name="twitter:description" content={`${selected_char.CharacterName} Page`}/>
            <meta name="twitter:image" content={`https://dissidiacompendium.com/images/static/characters/${selected_char.CharacterURLName}/cc.png`}/>
            <meta name="twitter:card" content="summary"/>
            <meta name="twitter:image:alt" content={`${selected_char.CharacterName}`}/>
            <meta property="og:title" content={`${selected_char.CharacterName} Page`}/>
            <meta property="og:description" content={`${selected_char.CharacterName} Banner`}/>
            <meta property="og:image" content={`https://dissidiacompendium.com/images/static/characters/${selected_char.CharacterURLName}/cc.png`}/>
            <meta property="og:url" content={`https://dissidiacompendium.com/characters/${selected_char.ShortName}`}/>
        </Helmet>
        <div className="returnbutton">
                <DefaultTippy content="Return to Characters" className="tooltip" >
                <Link className="returnlink" to={`/characters/`}>
                    <div className="returnicon"></div>
                </Link>
                </DefaultTippy>
            </div>
            <div className="content">
            <CharcterHeader
                  nextevent={nextevent}
                  previousevent={previousevent}
                  Subheader={"Direct"}
                  headertitle={
                    <div className="facetop">
                        <ul className="CharListHolder">
                          <FaceMaker match={selected_char}/>
                        </ul>
                    </div>}
                  match={match}
                  newmatch={selected_char}
                  pageloc={"direct"}
                  subcat={"direct"}
                  Access={Access[selectedCharaID]}
                  direct_loc={match.params.type}
                  />
                  {Access[selectedCharaID][`${ver}basic`]  != true ? 
                  <div className='singlepageholder'>
                  <OhNo name={selected_char.CharacterName} random={random} message={"for the selected version "}/> 
                  </div>
                  :                 
                  ""}
                  {match.params.type == undefined && 
                  Access[selectedCharaID][`${ver}basic`] == true &&
                  profiledata != undefined ?
                    <Character_Profile
                    data={profiledata}
                    ver={ver}
                    />
                  :""}
                  {match.params.type == "abilities" && 
                  Access[selectedCharaID][`${ver}abilities`] == true  ?
                  abilitydata != undefined
                  ?
                  <Ability_bycharacter
                    key={abilitydata}
                    ability_data={abilitydata}
                    buff_data={buffdata}

                    selected_id={selectedCharaID}

                    ver={ver}
                    loc={"sum_fix_passive"}
                    newcompare={"new"}
                    file={"sum_fix_passive"}

                    enemy_type={enemy_type}
                    cast_targets={cast_targets}
                    passive_effects_data={passive_effects_data}
                    char_id={char_id}
                    passivenames={passivenames}
                    equipmentpassivenames={equipmentpassivenames}
                    AilmentNames={AilmentNames}
                    CommandNames={CommandNames}
                    CondData={CondData}
                    Ailment_Effects={Ailment_Effects}
                    MessageData_Category={MessageData_Category}
                    MessageData_FFSeries={MessageData_FFSeries}
                    command_data_effects={command_data_effects}
                    hit_data_effects={hit_data_effects}
                    option_trans_data={option_trans_data}
                    
                    ailment_group={ailment_group}
                    command_group={command_group}
                    enemy_resist={enemy_resist}
                    formatting={formatting}
                    />
                  : 
                    <div className='characterpageholder'>
                        Loading...
                    </div>
                  :""}
                  {match.params.type == "buffs" && 
                  Access[selectedCharaID][`${ver}basic`] == true && 
                  Access[selectedCharaID][`${ver}buffs`] == true ?
                  buffdata != undefined &&
                  abilitydata != undefined
                  ?
                  <Buff_bycharacter
                    key={buffdata}
                    ability_data={abilitydata}
                    buff_data={buffdata}
                    selected_id={selectedCharaID}

                    ver={ver}
                    loc={"sum_fix_passive"}
                    newcompare={"new"}
                    file={"sum_fix_passive"}

                    enemy_type={enemy_type}
                    cast_targets={cast_targets}
                    passive_effects_data={passive_effects_data}
                    char_id={char_id}
                    passivenames={passivenames}
                    equipmentpassivenames={equipmentpassivenames}
                    AilmentNames={AilmentNames}
                    CommandNames={CommandNames}
                    CondData={CondData}
                    Ailment_Effects={Ailment_Effects}
                    MessageData_Category={MessageData_Category}
                    MessageData_FFSeries={MessageData_FFSeries}
                    command_data_effects={command_data_effects}
                    hit_data_effects={hit_data_effects}
                    option_trans_data={option_trans_data}
                    
                    ailment_group={ailment_group}
                    command_group={command_group}
                    enemy_resist={enemy_resist}
                    formatting={formatting}
                    />
                  : 
                    <div className='characterpageholder'>
                        Loading...
                    </div>
                  :""}
                  {match.params.type == "exp" && 
                  Access[selectedCharaID][`${ver}basic`] == true && 
                  Access[selectedCharaID][`${ver}abilities`] == true ?
                  expdata != undefined
                  ?
                  <EXP_Passives
                    key={expdata}
                    passive_data={expdata}
                    ver={ver}
                    loc={"sum_fix_passive"}
                    newcompare={"new"}

                    enemy_type={enemy_type}
                    cast_targets={cast_targets}
                    passive_effects_data={passive_effects_data}
                    char_id={char_id}
                    passivenames={passivenames}
                    equipmentpassivenames={equipmentpassivenames}
                    AilmentNames={AilmentNames}
                    CommandNames={CommandNames}
                    CondData={CondData}
                    Ailment_Effects={Ailment_Effects}
                    MessageData_Category={MessageData_Category}
                    MessageData_FFSeries={MessageData_FFSeries}
                    command_data_effects={command_data_effects}
                    hit_data_effects={hit_data_effects}
                    option_trans_data={option_trans_data}
                    
                    ailment_group={ailment_group}
                    command_group={command_group}
                    enemy_resist={enemy_resist}
                    formatting={formatting}
                    />
                  : 
                    <div className='characterpageholder'>
                        Loading...
                    </div>
                  :""}
                  {(match.params.type == "crystal" || match.params.type == "passsives")&& 
                  Access[selectedCharaID][`${ver}basic`] == true && 
                  Access[selectedCharaID][`${ver}crystal`] == true ?
                  cpassivedata != undefined 
                  ?
                  <Crystal_Passives
                        crydata={cpassivedata}
                        ver={ver}
                        newcompare={"new"}
                        loc={"equipment_passive"}
                        enemy_type={enemy_type}
                        cast_targets={cast_targets}
                        passive_effects_data={passive_effects_data}
                        char_id={char_id}
                        passivenames={passivenames}
                        equipmentpassivenames={equipmentpassivenames}
                        AilmentNames={AilmentNames}
                        CommandNames={CommandNames}
                        CondData={CondData}
                        Ailment_Effects={Ailment_Effects}
                        MessageData_Category={MessageData_Category}
                        MessageData_FFSeries={MessageData_FFSeries}
                        command_data_effects={command_data_effects}
                        hit_data_effects={hit_data_effects}
                        option_trans_data={option_trans_data}
                        
                        ailment_group={ailment_group}
                        command_group={command_group}
                        enemy_resist={enemy_resist}
                        formatting={formatting}
                    />
                  : 
                    <div className='characterpageholder'>
                        Loading...
                    </div>
                  :""}
                  {match.params.type == "boards" && 
                  Access[selectedCharaID][`${ver}basic`] == true && 
                  Access[selectedCharaID][`${ver}sum_fix`] == true ?
                  boarddata != undefined 
                  ?
                  <Sum_Fix_Passive
                        key={boarddata}
                        sum_fix_passive={boarddata}
                        ver={ver}
                        loc={"sum_fix_passive"}
                        newcompare={"new"}

                        enemy_type={enemy_type}
                        cast_targets={cast_targets}
                        passive_effects_data={passive_effects_data}
                        char_id={char_id}

                        passivenames={passivenames}
                        equipmentpassivenames={equipmentpassivenames}

                        AilmentNames={AilmentNames}
                        CommandNames={CommandNames}
                        CondData={CondData}
                        Ailment_Effects={Ailment_Effects}
                        MessageData_Category={MessageData_Category}
                        MessageData_FFSeries={MessageData_FFSeries}

                        command_data_effects={command_data_effects}
                        
                        hit_data_effects={hit_data_effects}
                        option_trans_data={option_trans_data}
                        
                        ailment_group={ailment_group}
                        command_group={command_group}
                        enemy_resist={enemy_resist}
                        formatting={formatting}
                    />
                  : 
                    <div className='characterpageholder'>
                        Loading...
                    </div>
                  :""}
                  {match.params.type == "force" && 
                  Access[selectedCharaID][`${ver}basic`] == true && 
                  Access[selectedCharaID][`${ver}link`] == true ?
                  linkeddata != undefined 
                  ?
                    <Link_Passives
                        linkeddata={linkeddata}
                        ver={ver}
                        newcompare={"new"}
                        loc={"equipment_passive"}
                        enemy_type={enemy_type}
                        cast_targets={cast_targets}
                        passive_effects_data={passive_effects_data}
                        char_id={char_id}
                        passivenames={passivenames}
                        equipmentpassivenames={equipmentpassivenames}
                        AilmentNames={AilmentNames}
                        CommandNames={CommandNames}
                        CondData={CondData}
                        Ailment_Effects={Ailment_Effects}
                        MessageData_Category={MessageData_Category}
                        MessageData_FFSeries={MessageData_FFSeries}
                        command_data_effects={command_data_effects}
                        hit_data_effects={hit_data_effects}
                        option_trans_data={option_trans_data}
                        
                        ailment_group={ailment_group}
                        command_group={command_group}
                        enemy_resist={enemy_resist}
                        formatting={formatting}
                    />
                : 
                <div className='characterpageholder'>
                    Loading...
                </div>
                :""}
                {match.params.type == "gear" && 
                  Access[selectedCharaID][`${ver}basic`] == true && 
                  Access[selectedCharaID][`${ver}gear`] == true ?
                  equipmentdata != undefined 
                  ?
                  <Equipment_Passives
                    equipment_passive_ability={equipmentdata}
                    ver={ver}
                    newcompare={"new"}
                    loc={"equipment_passive"}
                    enemy_type={enemy_type}
                    cast_targets={cast_targets}
                    passive_effects_data={passive_effects_data}
                    char_id={char_id}
                    passivenames={passivenames}
                    equipmentpassivenames={equipmentpassivenames}
                    AilmentNames={AilmentNames}
                    CommandNames={CommandNames}
                    CondData={CondData}
                    Ailment_Effects={Ailment_Effects}
                    MessageData_Category={MessageData_Category}
                    MessageData_FFSeries={MessageData_FFSeries}
                    command_data_effects={command_data_effects}
                    hit_data_effects={hit_data_effects}
                    option_trans_data={option_trans_data}
                    
                    ailment_group={ailment_group}
                    command_group={command_group}
                    enemy_resist={enemy_resist}
                    formatting={formatting}
                />
                : 
                <div className='characterpageholder'>
                    Loading...
                </div>
                :""}
                {match.params.type == "spheres" && 
                  Access[selectedCharaID][`${ver}basic`] == true && 
                  Access[selectedCharaID][`${ver}spheres`] == true ?
                  spheresdata != undefined &&
                  profiledata != undefined
                  ?
                  <Spheres_Page
                        data={spheresdata}
                        profiledata={profiledata}
                        ProcessedEventsIndex={ProcessedEventsIndex}
                        char_data={selected_char}
                        ver={ver}
                        loc={"ex_skill"}
                        enemy_type={enemy_type}
                        cast_targets={cast_targets}
                        passive_effects_data={passive_effects_data}
                        char_id={char_id}
                        passivenames={passivenames}
                        equipmentpassivenames={equipmentpassivenames}
                        AilmentNames={AilmentNames}
                        CommandNames={CommandNames}
                        CondData={CondData}
                        Ailment_Effects={Ailment_Effects}
                        MessageData_Category={MessageData_Category}
                        MessageData_FFSeries={MessageData_FFSeries}
                        command_data_effects={command_data_effects}
                        hit_data_effects={hit_data_effects}
                        option_trans_data={option_trans_data}
                        
                        ailment_group={ailment_group}
                        command_group={command_group}
                        enemy_resist={enemy_resist}
                        formatting={formatting}
                    />
                : 
                <div className='characterpageholder'>
                    Loading...
                </div>
                :""}
                {match.params.type == "arts" && 
                  Access[selectedCharaID][`${ver}basic`] == true && 
                  Access[selectedCharaID][`${ver}art`] == true ?
                  artdata != undefined 
                  ?
                  <Art_bycharacter
                    art_passive={artdata}
                    ver={ver}
                    match={selected_char}
                    newcompare={"new"}
                    loc={"art_passive"}
                    file={"art_passive"}
                    enemy_type={enemy_type}
                    cast_targets={cast_targets}
                    passive_effects_data={passive_effects_data}
                    char_id={char_id}
                    passivenames={passivenames}
                    equipmentpassivenames={equipmentpassivenames}
                    AilmentNames={AilmentNames}
                    CommandNames={CommandNames}
                    CondData={CondData}
                    Ailment_Effects={Ailment_Effects}
                    MessageData_Category={MessageData_Category}
                    MessageData_FFSeries={MessageData_FFSeries}
                    command_data_effects={command_data_effects}
                    hit_data_effects={hit_data_effects}
                    option_trans_data={option_trans_data}
                    
                    ailment_group={ailment_group}
                    command_group={command_group}
                    enemy_resist={enemy_resist}
                    formatting={formatting}
                    />
                : 
                <div className='characterpageholder'>
                    Loading...
                </div>
                :""}
                {match.params.type == "events" && 
                  Access[selectedCharaID][`${ver}basic`] == true && 
                  Access[selectedCharaID][`${ver}abilities`] == true ?
                  eventdata != undefined
                  ?
                  <Event_Single
                  data={eventdata}
                  ProcessedEventsIndex={ProcessedEventsIndex}
                  ver={ver}
                  char_id={char_id}
                  />
                  : 
                    <div className='characterpageholder'>
                        Loading...
                    </div>
                  :""}
            </div>
        </div>
    )
}
export default CharacterPageDirect