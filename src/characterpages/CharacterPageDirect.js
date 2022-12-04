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
import CharacterPage from './CharacterPageFormatting.js';
import CharacterReworks from './CharacterPageReworks'
import CharacterPageCommunity from './CharacterPageCommunity.js';

const CharacterPageDirect = ({
    Access,
    selected_char,
    ProcessedCharacters,
    ProcessedEventsIndex,
    match,
    jptoggledata,

    loc,
    CharGuideData,

    master_index
})=>{

    const formatting =true

    const dispatch = useDispatch();
    
    const [JPsearch, setJPSearch] = useQueryParam("JP", "");
    const [ver, setver] = useStateIfMounted(jptoggledata == true ? "JP" : "GL")
    const [selectedCharaID, setselectedCharaID] = useStateIfMounted(selected_char.CharID)


    useEffect(()=>{
        setselectedCharaID(selected_char.CharID)
        setver(jptoggledata == true ? "JP" : "GL")
        // eslint-disable-next-line
    },[selected_char,jptoggledata])

    const jponlybutton = () => {
        if (jptoggledata == false) {
          dispatch(setTrue())
          setJPSearch("true")
          setver("JP")
        } else {
          dispatch(setFalse())
          setJPSearch("")
          setver("GL")
        }
      };
    const [showFilter, setShowFilter] = useState(true)
    const showfilterbutton = () => {
        setShowFilter((prevValue) => !prevValue);
    }
    const [random ] = useStateIfMounted(Random(7));
    const [chr_list,setchr_list] = useState(Object.values(ProcessedCharacters).filter(self=>jptoggledata == true? self.JPOrder != undefined : self.GLOrder != undefined).sort((a,b)=>jptoggledata == true? b.JPOrder - a.JPOrder : b.GLOrder - a.GLOrder))

    useEffect(()=>{
      const new_list = Object.values(ProcessedCharacters).filter(self=>jptoggledata == true? self.JPOrder != undefined : self.GLOrder != undefined)
      setchr_list(new_list.sort((a,b)=>jptoggledata == true? a.JPOrder - b.JPOrder : a.GLOrder - b.GLOrder))
    },[jptoggledata,ProcessedCharacters])

    let currentIndex = chr_list.findIndex(x => x.CharID == selected_char.CharID);
    const nextIndex = (currentIndex + 1) % chr_list.length;
    const previousIndex = (currentIndex - 1) % chr_list.length;

    const nextevent = (function (){
        const holder = chr_list[nextIndex];
        if(nextIndex === 0 ){
            return false;
        } else{
            return holder;
        }
    })();

    const previousevent = (function (){
        const holder = chr_list[previousIndex];
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
    const [previousIDrework,setpreviousIDrework] = useStateIfMounted()
    const [previousIDevent, setpreviousIDevent] = useStateIfMounted()
    const [previousIDspheres, setpreviousIDspheres] = useStateIfMounted()
    const [previousIDboard, setpreviousIDboard] = useStateIfMounted()
    const [previousIDequipment, setpreviousIDequipment] = useStateIfMounted()
    const [previousIDlink, setpreviousIDlink] = useStateIfMounted()
    const [previousIDcpassive,setpreviousIDcpassive] = useStateIfMounted()
    const [previousIDexp,setpreviousIDexp] = useStateIfMounted()
    const [previousIDability,setpreviousIDability] = useStateIfMounted()
    const [previousIDart,setpreviousIDart] = useStateIfMounted()

    const [profiledata,setprofiledata] = useStateIfMounted(selected_char)
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
    const [banner_loc,setbanner_loc] = useStateIfMounted("")
    const [ProcessedVoices, setProcessedVoices] = useStateIfMounted()
    const [CharStickers, setCharStickers] = useStateIfMounted()
    const [ProcessedReworks, setProcessedReworks] = useStateIfMounted()
    const [hide_page,sethide_page]= useStateIfMounted(false)

   useEffect(() => {
        //rework
        if(DevSwitch == true && loc == "reworks" && previousIDrework != `${selectedCharaID}${ver}`&& selectedCharaID != undefined ){
            setProcessedReworks(undefined)
            axios.get(`http://localhost:3001/data/reworks/${selectedCharaID}`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setProcessedReworks(response)
            setpreviousIDrework(selectedCharaID+ver)
            }).catch(function(err) {
                console.log(err)
            })
        }
        if(DevSwitch == false&& loc == "reworks"  && previousIDrework != `${selectedCharaID}${ver}`&& selectedCharaID != undefined ){
            setProcessedReworks(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/reworks/${selectedCharaID}.json`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setProcessedReworks(response)
            setpreviousIDrework(selectedCharaID+ver)
            }).catch(function(err) {
                console.log(err)
            })
        }
        //profile
        if(DevSwitch == true && loc == "character" && previousIDprofile != `${selectedCharaID}${ver}` && selectedCharaID != undefined ){
            setProcessedVoices(undefined)
            axios.get(`http://localhost:3001/data/characters/voice/${selectedCharaID}`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setProcessedVoices(response)
            setpreviousIDprofile(selectedCharaID+ver)
            }).catch(function(err) {
                console.log(err)
            })
            setCharStickers(undefined)
            axios.get(`http://localhost:3001/data/characters/stickers/${selectedCharaID}`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setCharStickers(response)
            setpreviousIDprofile(selectedCharaID+ver)
            }).catch(function(err) {
                console.log(err)
            })
        }
        if(DevSwitch == false && loc == "character" && previousIDprofile != `${selectedCharaID}${ver}` && selectedCharaID!= undefined ){
            setProcessedVoices(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/characters/voice/${selectedCharaID}.json`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setProcessedVoices(response)
            setpreviousIDprofile(selectedCharaID+ver)
            }).catch(function(err) {
                console.log(err)
            })
            setCharStickers(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/characters/stickers/${selectedCharaID}.json`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setCharStickers(response)
            setpreviousIDprofile(selectedCharaID+ver)
            }).catch(function(err) {
                console.log(err)
            })
        }
        //event
        if(DevSwitch == true && loc == "events" && previousIDevent != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}events`] == true){
            seteventdata(undefined)
        axios.get(`http://localhost:3005/data/events/${ver}New/${selectedCharaID}`,{'muteHttpExceptions': true}).then((res) => {
        const response = res.data;
        seteventdata(response)
        setpreviousIDevent(selectedCharaID+ver)
        }).catch(function(err) {
            console.log(err)
        })
        }
        if(DevSwitch == false && loc == "events" && previousIDevent != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}events`] == true){
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
         if(DevSwitch == true && loc == "spheres" && previousIDspheres != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}spheres`] == true){
                axios.get(`http://localhost:3005/data/ex_skill/${ver}New/${selectedCharaID}`,{'muteHttpExceptions': true}).then((res) => {
                const response = res.data;
                setspheresdata(response)
                setprofiledata(selected_char)
                setpreviousIDspheres(selectedCharaID+ver)

            }).catch(function(err) {
                console.log(err)
            })
            }
        if(DevSwitch == false && loc == "spheres" && previousIDspheres != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}spheres`] == true){
            axios.get(`https://www.dissidiacompendium.com/data/_dir/_m/ex_skill/${ver}New/${selectedCharaID}.json`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setspheresdata(response)
            setprofiledata(selected_char)
            setpreviousIDspheres(selectedCharaID+ver)
        }).catch(function(err) {
            console.log(err)
        })
        }
        //sum_fix_passive
        if(DevSwitch == true && loc == "passives" && match.params.type == "boards" && previousIDboard != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}sum_fix`] == true){
            setboarddata(undefined)
            axios.get(`http://localhost:3005/data/sum_fix_passive/${ver}New/${selectedCharaID}`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setboarddata(response)
            setpreviousIDboard(selectedCharaID+ver)
        }).catch(function(err) {
            console.log(err)
        })
        }
        if(DevSwitch == false && loc == "passives" && match.params.type == "boards" && previousIDboard != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}sum_fix`] == true){
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
        if(DevSwitch == true && loc == "gear" && previousIDequipment != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}gear`] == true){
            setequipmentdata(undefined)
            axios.get(`http://localhost:3005/data/equipment_passive_character/${ver}New/${selectedCharaID}`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setequipmentdata(response)
            setpreviousIDequipment(selectedCharaID+ver)
        }).catch(function(err) {
            console.log(err)
        })
        }
        if(DevSwitch == false && loc == "gear" && previousIDequipment != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}gear`]  == true){
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
        if(DevSwitch == true && loc == "passives" && match.params.type == "force" && previousIDlink != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}link`] == true){
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
        if(DevSwitch == false && loc == "passives" && match.params.type == "force" && previousIDlink != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}link`] == true){
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
        if(DevSwitch == true && loc == "passives" && match.params.type == "crystal" && previousIDcpassive != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}crystal`] == true){
            setcpassivedata(undefined)
            axios.get(`http://localhost:3005/data/crystal_awakening_chara/${ver}New/${selectedCharaID}`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setcpassivedata(response)
            setpreviousIDcpassive(selectedCharaID+ver)
        }).catch(function(err) {
            console.log(err)
        })
        }
        if(DevSwitch == false && loc == "passives" && match.params.type == "crystal" && previousIDcpassive != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}crystal`] == true){
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
        if(DevSwitch == true && loc == "passives" && match.params.type == "exp" && previousIDexp != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}exp`] == true){
            setexpdata(undefined)
            axios.get(`http://localhost:3005/data/chara_level_ability/${ver}New/${selectedCharaID}`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setexpdata(response)
            setpreviousIDexp(selectedCharaID+ver)
        }).catch(function(err) {
            console.log(err)
        })
        }
        if(DevSwitch == false && loc == "passives" && match.params.type == "exp" && previousIDexp != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}exp`] == true){
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
        if(DevSwitch == true && loc == "passives" && match.params.type == "arts" && previousIDart != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}art`] == true){
            setartdata(undefined)
            axios.get(`http://localhost:3005/data/art_passive_bycharacter/${ver}New/${selectedCharaID}`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setartdata(response)
            setpreviousIDart(selectedCharaID+ver)
        }).catch(function(err) {
            console.log(err)
        })
        }
        if(DevSwitch == false && loc == "passives" && match.params.type == "arts" && previousIDart != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}art`] == true){
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
        if(DevSwitch == true && loc == "abilities" && previousIDability != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}abilities`] == true){
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
        if(DevSwitch == false && loc == "abilities" && previousIDability != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}abilities`] == true){
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
        if(DevSwitch == true && loc== "buffs" && previousIDability != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}buffs`] == true){
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
        if(DevSwitch == false && loc == "buffs" && previousIDability != `${selectedCharaID}${ver}`  && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}buffs`] == true){
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
    },[DevSwitch,ver,match.params.type,loc,previousIDprofile,previousIDrework,selectedCharaID,previousIDevent,previousIDboard,previousIDspheres,previousIDequipment,previousIDlink,previousIDcpassive,previousIDexp,previousIDability])

    useEffect(()=>{
        if(loc=="community"){
            setbanner_loc("Community Help")
            sethide_page(false)
        }
        if(loc == "character"){
            setbanner_loc("Classes dependant on selected version")
            sethide_page(false)
        }
        if(loc == "reworks"){
            setbanner_loc("Upcoming Reworks")
            sethide_page(false)
        }
        if(loc == "buffs"){
            setbanner_loc("Buffs")
            if( selected_char[`${ver}basic`] == true && 
                selected_char[`${ver}buffs`] == true){
                    sethide_page(false)
            } else {
                sethide_page(true)
            }
        }
        if(loc == "abilities"){
            setbanner_loc("Abilities")
            if( selected_char[`${ver}basic`] == true && 
                selected_char[`${ver}abilities`] == true){
                    sethide_page(false)
            } else {
                sethide_page(true)
            }
        }
        if(loc == "gear"){
            setbanner_loc("Gear")
            setbanner_loc("Abilities")
            if( selected_char[`${ver}basic`] == true && 
                selected_char[`${ver}gear`] == true){
                    sethide_page(false)
            } else {
                sethide_page(true)
            }
        }
        if(loc == "spheres"){
            setbanner_loc("Spheres")
            if( selected_char[`${ver}basic`] == true && 
                selected_char[`${ver}spheres`] == true){
                    sethide_page(false)
            } else {
                sethide_page(true)
            }
        }
        if(loc == "events"){
            setbanner_loc("Events")
            if( selected_char[`${ver}basic`] == true && 
                selected_char[`${ver}events`] == true){
                    sethide_page(false)
            } else {
                sethide_page(true)
            }
        }
        if(loc == "passives"&& match.params.type == undefined){
            setbanner_loc("Passives")
            if( selected_char[`${ver}basic`] == true && 
                selected_char[`${ver}crystal`] == true){
                    sethide_page(false)
            } else {
                sethide_page(true)
            }
        }
        if(loc == "passives" && match.params.type == "arts" ){
            setbanner_loc("Artifacts")
            if( selected_char[`${ver}basic`] == true && 
                selected_char[`${ver}art`] == true){
                    sethide_page(false)
            } else {
                sethide_page(true)
            }
        }
        if(loc == "passives" && match.params.type == "exp"){
            setbanner_loc("Experience")
            if( selected_char[`${ver}basic`] == true && 
                selected_char[`${ver}exp`] == true){
                    sethide_page(false)
            } else {
                sethide_page(true)
            }
        }
        if(loc == "passives" && match.params.type == "crystal"){
            setbanner_loc("Crystal")
            if( selected_char[`${ver}basic`] == true && 
                selected_char[`${ver}crystal`] == true){
                    sethide_page(false)
            } else {
                sethide_page(true)
            }
        }
        if(loc == "passives" && match.params.type == "force" ){
            setbanner_loc("Force Empowerment")
            if( selected_char[`${ver}basic`] == true && 
                selected_char[`${ver}link`] == true){
                    sethide_page(false)
            } else {
                sethide_page(true)
            }
        }
        if(loc == "passives" && match.params.type == "boards"){
            setbanner_loc("Boards")
            if( selected_char[`${ver}basic`] == true && 
                selected_char[`${ver}sum_fix`] == true){
                    sethide_page(false)
            } else {
                sethide_page(true)
            }
        }
    },[loc,match,setbanner_loc,selected_char,ver,sethide_page])

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
                  Subheader={banner_loc}
                  subcat={"none"}
                  headertitle={
                    <h1>
                    <span>
                        <DefaultTippy content={`${jptoggledata == true? "Switch to GL" : "Switch to JP"}`} className="tooltip" >
                        <span onClick={jponlybutton} className={`${jptoggledata ? "jpflage jpsmallinactive smalleventbutton" : "glflage smalleventbutton"}`}/>
                    </DefaultTippy>
                  </span>{" "}
                    {selected_char.CharacterName}
                    </h1>}
                  match={match}
                  newmatch={selected_char}
                  pageloc={loc}
                  Access={ProcessedCharacters[selectedCharaID]}
                  direct_loc={match.params.type}
                  showFilter={showFilter}
                  showfilterbutton={showfilterbutton}
                  />
                  {hide_page == true ? 
                  <div className='singlepageholder'>
                  <OhNo 
                  name={selected_char.CharacterName} 
                  random={random} 
                  message1={"No results found"}
                  message={<span>Try changing version? <DefaultTippy content={`${jptoggledata == true? "Switch to GL" : "Switch to JP"}`} className="tooltip" >
                    <span onClick={jponlybutton} className={`${jptoggledata ? "glflage smalleventbutton" : "jpflage jpsmallinactive smalleventbutton"}`}/>
                </DefaultTippy>
              </span>}
                  /> 
                  </div>
                  :                 
                  ""}
                  {hide_page == true ? "":
                  loc == "character" ?
                  ProcessedVoices != undefined && CharStickers !=undefined ?
                  <CharacterPage 
                  nextevent={nextevent}
                  previousevent={previousevent}
                  Subheader={banner_loc}
                  matchdata={match} 
                  match={selected_char} 
                  ProcessedCharacters={ProcessedCharacters} 
                  CharGuideData={CharGuideData} 
                  jptoggledata={jptoggledata} 
                  ProcessedVoices={ProcessedVoices} 
                  CharStickers={CharStickers}
                  />
                : 
                <div className='characterpageholder'>
                    Loading...
                </div>
              :""}
                  {hide_page == true ? "":
                  loc == "abilities" ?
                  abilitydata != undefined?
                  <Ability_bycharacter
                    key={abilitydata}
                    ability_data={abilitydata}
                    buff_data={buffdata}

                    selected_id={selectedCharaID}

                    ver={ver}
                    loc={"sum_fix_passive"}
                    newcompare={"new"}
                    file={"sum_fix_passive"}

                    master_index={master_index}
                    ProcessedCharacters={ProcessedCharacters} 

                    formatting={formatting}
                    showFilter={showFilter}
                    />
                  : 
                    <div className='characterpageholder'>
                        Loading...
                    </div>
                  :""}
                  {hide_page == true ? "":
                  loc == "buffs"?
                  buffdata != undefined && abilitydata != undefined ?
                  <Buff_bycharacter
                    key={buffdata}
                    ability_data={abilitydata}
                    buff_data={buffdata}
                    selected_id={selectedCharaID}

                    master_index={master_index}

                    ver={ver}
                    loc={"sum_fix_passive"}
                    newcompare={"new"}
                    file={"sum_fix_passive"}

                    
                    formatting={formatting}
                    showFilter={showFilter}
                    />
                  : 
                    <div className='characterpageholder'>
                        Loading...
                    </div>
                  :""}
                  {hide_page == true ? "":
                loc == "gear" ?
                 equipmentdata != undefined 
                  ?
                  <Equipment_Passives
                    equipment_passive_ability={equipmentdata}
                    ver={ver}
                    newcompare={"new"}
                    loc={"equipment_passive"}

                    master_index={master_index}
                    ProcessedCharacters={ProcessedCharacters} 
                    
                    formatting={formatting}
                    showFilter={showFilter}
                />
                : 
                <div className='characterpageholder'>
                    Loading...
                </div>
                :""}
                {hide_page == true ? "":
                  loc == "passives" && match.params.type == "crystal" ?
                  cpassivedata != undefined  ?
                  <Crystal_Passives
                        crydata={cpassivedata}
                        ver={ver}
                        newcompare={"new"}
                        loc={"equipment_passive"}

                        master_index={master_index}
                        ProcessedCharacters={ProcessedCharacters} 
                        
                        formatting={formatting}
                        showFilter={showFilter}
                    />
                  : 
                    <div className='characterpageholder'>
                        Loading...
                    </div>
                  :""}
                  {hide_page == true ? "":
                  loc == "passives" && match.params.type == "exp" 
                  ? expdata != undefined  ?
                  <EXP_Passives
                    key={expdata}
                    passive_data={expdata}
                    ver={ver}
                    loc={"sum_fix_passive"}
                    newcompare={"new"}

                    master_index={master_index}
                    ProcessedCharacters={ProcessedCharacters} 
                    
                    formatting={formatting}
                    showFilter={showFilter}
                    />
                  : 
                    <div className='characterpageholder'>
                        Loading...
                    </div>
                  :""}
                  
                  {hide_page == true ? "":
                  loc == "passives" && match.params.type == "boards" ?
                    boarddata != undefined  ?
                  <Sum_Fix_Passive
                        key={boarddata}
                        sum_fix_passive={boarddata}
                        ver={ver}
                        loc={"sum_fix_passive"}
                        newcompare={"new"}
                        ProcessedCharacters={ProcessedCharacters} 
                        master_index={master_index}
                        
                        formatting={formatting}
                        showFilter={showFilter}
                    />
                  : 
                    <div className='characterpageholder'>
                        Loading...
                    </div>
                  :""}
                  {hide_page == true ? "":
                  loc == "passives" && match.params.type == "force" ?
                   linkeddata != undefined ?
                    <Link_Passives
                        linkeddata={linkeddata}
                        ver={ver}
                        newcompare={"new"}
                        loc={"equipment_passive"}
                        ProcessedCharacters={ProcessedCharacters} 
                        master_index={master_index}
                
                        formatting={formatting}
                        showFilter={showFilter}
                    />
                : 
                <div className='characterpageholder'>
                    Loading...
                </div>
                :""}
                {hide_page == true ? "":
                loc == "passives" && match.params.type == "arts" ?
                 artdata != undefined 
                  ?
                  <Art_bycharacter
                    art_passive={artdata}
                    ver={ver}
                    match={selected_char}
                    newcompare={"new"}
                    loc={"art_passive"}
                    file={"art_passive"}
                    ProcessedCharacters={ProcessedCharacters} 
                    master_index={master_index}
                   
                    formatting={formatting}
                    showFilter={showFilter}
                    />
                : 
                <div className='characterpageholder'>
                    Loading...
                </div>
                :""}
                {hide_page == true ? "":
                  loc == "reworks" ?
                  ProcessedReworks !=undefined ?
                  <CharacterReworks
                  ProcessedReworks={ProcessedReworks} 
                  ProcessedCharacters={ProcessedCharacters} 
                  match={match} 
                  selected_chara={selected_char}
                  jptoggledata={jptoggledata}
                  showFilter={showFilter}
                  />
                : 
                <div className='characterpageholder'>
                    Loading...
                </div>
              :""}
                {hide_page == true ? "":
                loc == "spheres" ?
                spheresdata != undefined && profiledata != undefined ?
                  <Spheres_Page
                        data={spheresdata}
                        profiledata={profiledata}
                        ProcessedEventsIndex={ProcessedEventsIndex}
                        char_data={selected_char}
                        ver={ver}
                        loc={"ex_skill"}
                        ProcessedCharacters={ProcessedCharacters} 
                        master_index={master_index}

                        formatting={formatting}
                        showFilter={showFilter}
                    />
                : 
                <div className='characterpageholder'>
                    Loading...
                </div>
                :""}
                {hide_page == true ? "":
                loc == "events" ?
                 eventdata != undefined
                  ?
                  <Event_Single
                  data={eventdata}
                  ProcessedEventsIndex={ProcessedEventsIndex}
                  jptoggledata={jptoggledata}
                  ver={ver}
                  ProcessedCharacters={ProcessedCharacters}
                  showFilter={showFilter}
                  />
                  : 
                    <div className='characterpageholder'>
                        Loading...
                    </div>
                 :"" }
                {hide_page == true ? "":
                loc == "community" ?
                CharGuideData != undefined ?
                <CharacterPageCommunity 
                selected_char={selected_char}
                CharGuideData={CharGuideData}/>
                : 
                <div className='characterpageholder'>
                    Loading...
                </div>
                :"" }
            </div>
        </div>
    )
}
export default CharacterPageDirect