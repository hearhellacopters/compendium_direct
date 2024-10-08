import React, { useState, useRef, useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import DefaultTippy from '../TippyDefaults.js';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate  } from 'react-router-dom'
import Random from '../../processing/random.js'
import OhNo from '../OhNo.js'
import CharacterHeader from './CharacterHeader.js'
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import AutosizeInput from '../AutosizeInput.js';
import { useDispatch } from "react-redux";
import { setFalse, setTrue } from '../../redux/ducks/jptoggle.js'
import { getQuery, getQueryStringVal, useQueryParam } from '../URLParams.js'
import DevSwitch from '../../redux/DevSwitch.js';
import axios from "axios";
import Event_Single from './CharacterEventPageFormatting.js'
import CharacterBuffPageFormatting from './CharacterBuffPageFormatting.js'
import EXP_Passives from './CharacterPassiveExpPageFormatting.js';
import CharacterAbilityPageFormatting from './CharacterAbilityPageFormatting.js';
import Crystal_Passives from './CharacterPassiveCrystalPageFormatting.js';
import Sum_Fix_Passive from './CharacterPassiveBoardPageFormatting.js';
import Link_Passives from './CharacterPassiveLinkPageFormatting.js';
import Equipment_Passives from './CharacterGearPage.js';
import SpheresPage from './CharacterPassiveSpheresPageFormatting.js';
import Art_bycharacter from './CharacterPassiveArtPageFormatting.js';
import CharacterPageFormatting from './CharacterPageFormatting.js';
import CharacterReworks from './CharacterPageReworks.js'
import CharacterPageCommunity from './CharacterPageCommunity.js';
import UseOnClickOutside from '../UseOnClickOutside.js';
import { _error } from '../../redux/sagas/handlers/_error_state_add.js';
import { _error_remove } from '../../redux/sagas/handlers/_error_state_remove.js';

export default function CharacterPageSingleFormatting({
    Access,
    selected_char,
    ProcessedCharacters,
    ProcessedEventsIndex,
    match,
    jptoggledata,

    loc,
    CharGuideData,

    master_index
}){

    const formatting = true

    const dispatch = useDispatch();

    const [JPsearch, setJPSearch] = useQueryParam("JP", "");
    const [ver, setver] = useStateIfMounted(jptoggledata == true ? "JP" : "GL")
    const [selectedCharaID, setselectedCharaID] = useStateIfMounted(selected_char.CharID)
    const [showdrop, setshowdrop] = useState(false)
    const [search, setsearch] = useState(selected_char.CharacterName);
    const [master_list, setmaster_list] = useStateIfMounted([]);
    const [list, setlist] = useStateIfMounted([]);

    useEffect(() => {
        const typeListArray = Object.values(ProcessedCharacters).filter(self => jptoggledata == true ? self.JPOrder != undefined : self.GLOrder != undefined).sort((a, b) => jptoggledata == true ? b.JPOrder - a.JPOrder : b.GLOrder - a.GLOrder).map((typeListUnique) => ({
            value: typeListUnique.ShortName,
            label: typeListUnique.CharacterName,
            id: typeListUnique.CharID,
        }));
        setmaster_list(typeListArray)
        setlist(typeListArray)
        setselectedCharaID(selected_char.CharID)
        setver(jptoggledata == true ? "JP" : "GL")
        setsearch(selected_char.CharacterName)
        // eslint-disable-next-line
    }, [selected_char, jptoggledata, setselectedCharaID,ProcessedCharacters])

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

    const [random] = useStateIfMounted(Random(7));
    const [chr_list, setchr_list] = useState(Object.values(ProcessedCharacters).filter(self => jptoggledata == true ? self.JPOrder != undefined : self.GLOrder != undefined).sort((a, b) => jptoggledata == true ? b.JPOrder - a.JPOrder : b.GLOrder - a.GLOrder))

    useEffect(() => {
        const new_list = Object.values(ProcessedCharacters).filter(self => jptoggledata == true ? self.JPOrder != undefined : self.GLOrder != undefined)
        setchr_list(new_list.sort((a, b) => jptoggledata == true ? a.JPOrder - b.JPOrder : a.GLOrder - b.GLOrder))
    }, [jptoggledata, ProcessedCharacters])

    let currentIndex = chr_list.findIndex(x => x.CharID == selected_char.CharID);
    const nextIndex = (currentIndex + 1) % chr_list.length;
    const previousIndex = (currentIndex - 1) % chr_list.length;

    const nextevent = (function () {
        const holder = chr_list[nextIndex];
        if (nextIndex === 0) {
            return false;
        } else {
            return holder;
        }
    })();

    const previousevent = (function () {
        const holder = chr_list[previousIndex];
        if (holder === undefined) {
            return false;
        } else {
            return holder;
        }
    })();


    useEffect(() => {
        //jp toggle
        if (jptoggledata == true) {
            setJPSearch("true")
        }
        if (getQueryStringVal("JP") == "true") {
            dispatch(setTrue())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jptoggledata])


    const [previousIDprofile, setpreviousIDprofile] = useStateIfMounted()
    const [previousIDrework, setpreviousIDrework] = useStateIfMounted()
    const [previousIDevent, setpreviousIDevent] = useStateIfMounted()
    const [previousIDspheres, setpreviousIDspheres] = useStateIfMounted()
    const [previousIDboard, setpreviousIDboard] = useStateIfMounted()
    const [previousIDequipment, setpreviousIDequipment] = useStateIfMounted()
    const [previousIDlink, setpreviousIDlink] = useStateIfMounted()
    const [previousIDcpassive, setpreviousIDcpassive] = useStateIfMounted()
    const [previousIDexp, setpreviousIDexp] = useStateIfMounted()
    const [previousIDability, setpreviousIDability] = useStateIfMounted()
    const [previousIDart, setpreviousIDart] = useStateIfMounted()

    const [profiledata, setprofiledata] = useStateIfMounted(selected_char)
    const [eventdata, seteventdata] = useStateIfMounted()
    const [spheresdata, setspheresdata] = useStateIfMounted([])
    const [boarddata, setboarddata] = useStateIfMounted()
    const [equipmentdata, setequipmentdata] = useStateIfMounted()
    const [linkeddata, setlinkeddata] = useStateIfMounted()
    const [cpassivedata, setcpassivedata] = useStateIfMounted()
    const [expdata, setexpdata] = useStateIfMounted()
    const [abilitydata, setabilitydata] = useStateIfMounted()
    const [buffdata, setbuffdata] = useStateIfMounted()
    const [artdata, setartdata] = useStateIfMounted()
    const [banner_loc, setbanner_loc] = useStateIfMounted("")
    const [ProcessedVoices, setProcessedVoices] = useStateIfMounted()
    const [CharStickers, setCharStickers] = useStateIfMounted()
    const [ProcessedReworks, setProcessedReworks] = useStateIfMounted()
    const [hide_page, sethide_page] = useStateIfMounted(false)

    useEffect(() => {
        //rework
        if (DevSwitch == true && loc == "reworks" && previousIDrework != `${selectedCharaID}${ver}` && selectedCharaID != undefined) {
            setProcessedReworks(undefined)
            axios.get(`http://localhost:3001/data/reworks/${selectedCharaID}`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`reworks_${selectedCharaID}`);
                setProcessedReworks(selected_char.ActiveRework == true ? response : []);
                setpreviousIDrework(selectedCharaID + ver);
            }).catch(function (err) {
                _error(`reworks_${selectedCharaID}`, err.message);
            })
        }
        if (DevSwitch == false && loc == "reworks" && previousIDrework != `${selectedCharaID}${ver}` && selectedCharaID != undefined) {
            setProcessedReworks(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/reworks/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`reworks_${selectedCharaID}`);
                setProcessedReworks(selected_char.ActiveRework == true ? response : []);
                setpreviousIDrework(selectedCharaID + ver);
            }).catch(function (err) {
                _error(`reworks_${selectedCharaID}`, err.message);
            })
        }
        //profile
        if (DevSwitch == true && loc == "character" && previousIDprofile != `${selectedCharaID}${ver}` && selectedCharaID != undefined) {
            setProcessedVoices(undefined)
            axios.get(`http://localhost:3001/data/characters/voice/${selectedCharaID}`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`voice_${selectedCharaID}`);
                setProcessedVoices(response);
                setpreviousIDprofile(selectedCharaID + ver);
            }).catch(function (err) {
                _error(`voice_${selectedCharaID}`, err.message);
            })
            setCharStickers(undefined)
            axios.get(`http://localhost:3001/data/characters/stickers/${selectedCharaID}`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`stickers_${selectedCharaID}`);
                setCharStickers(response);
                setpreviousIDprofile(selectedCharaID + ver);
            }).catch(function (err) {
                _error(`stickers_${selectedCharaID}`, err.message);
            })
        }
        if (DevSwitch == false && loc == "character" && previousIDprofile != `${selectedCharaID}${ver}` && selectedCharaID != undefined) {
            setProcessedVoices(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/characters/voice/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`voice_${selectedCharaID}`);
                setProcessedVoices(response);
                setpreviousIDprofile(selectedCharaID + ver);
            }).catch(function (err) {
                _error(`voice_${selectedCharaID}`, err.message);
            })
            setCharStickers(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/characters/stickers/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`stickers_${selectedCharaID}`);
                setCharStickers(response);
                setpreviousIDprofile(selectedCharaID + ver);
            }).catch(function (err) {
                _error(`stickers_${selectedCharaID}`, err.message);
            })
        }
        //event
        if (DevSwitch == true && loc == "events" && previousIDevent != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}events`] == true) {
            seteventdata(undefined)
            axios.get(`http://localhost:3005/data/events/${ver}New/${selectedCharaID}`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`events_new_${ver}_${selectedCharaID}`);
                seteventdata(response);
                setpreviousIDevent(selectedCharaID + ver);
            }).catch(function (err) {
                _error(`events_new_${ver}_${selectedCharaID}`, err.message);
            })
        }
        if (DevSwitch == false && loc == "events" && previousIDevent != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}events`] == true) {
            seteventdata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/_m/events/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`events_new_${ver}_${selectedCharaID}`);
                seteventdata(response);
                setpreviousIDevent(selectedCharaID + ver);
            }).catch(function (err) {
                _error(`events_new_${ver}_${selectedCharaID}`, err.message);
            })
        }
        //spheres
        if (DevSwitch == true && loc == "spheres" && previousIDspheres != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}spheres`] == true) {
            axios.get(`http://localhost:3005/data/ex_skill/${ver}New/${selectedCharaID}`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`ex_skill_new_${ver}_${selectedCharaID}`);
                setspheresdata(response);
                setprofiledata(selected_char);
                setpreviousIDspheres(selectedCharaID + ver);

            }).catch(function (err) {
                _error(`ex_skill_new_${ver}_${selectedCharaID}`, err.message);
            })
        }
        if (DevSwitch == false && loc == "spheres" && previousIDspheres != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}spheres`] == true) {
            axios.get(`https://www.dissidiacompendium.com/data/_dir/_m/ex_skill/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`ex_skill_new_${ver}_${selectedCharaID}`);
                setspheresdata(response);
                setprofiledata(selected_char);
                setpreviousIDspheres(selectedCharaID + ver);
            }).catch(function (err) {
                _error(`ex_skill_new_${ver}_${selectedCharaID}`, err.message);
            })
        }
        //sum_fix_passive
        if (DevSwitch == true && loc == "passives" && match.params.type == "boards" && previousIDboard != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}sum_fix`] == true) {
            setboarddata(undefined)
            axios.get(`http://localhost:3005/data/sum_fix_passive/${ver}New/${selectedCharaID}`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`sum_fix_passive_new_${ver}_${selectedCharaID}`);
                setboarddata(response);
                setpreviousIDboard(selectedCharaID + ver);
            }).catch(function (err) {
                _error(`sum_fix_passive_new_${ver}_${selectedCharaID}`, err.message);
            })
        }
        if (DevSwitch == false && loc == "passives" && match.params.type == "boards" && previousIDboard != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}sum_fix`] == true) {
            setboarddata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/_m/sum_fix_passive/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`sum_fix_passive_new_${ver}_${selectedCharaID}`);
                setboarddata(response);
                setpreviousIDboard(selectedCharaID + ver);
            }).catch(function (err) {
                _error(`sum_fix_passive_new_${ver}_${selectedCharaID}`, err.message);
            })
        }
        //gear
        if (DevSwitch == true && loc == "gear" && previousIDequipment != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}gear`] == true) {
            setequipmentdata(undefined)
            axios.get(`http://localhost:3005/data/equipment_passive_character/${ver}New/${selectedCharaID}`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`equipment_passive_character_new_${ver}_${selectedCharaID}`);
                setequipmentdata(response);
                setpreviousIDequipment(selectedCharaID + ver);
            }).catch(function (err) {
                _error(`equipment_passive_character_new_${ver}_${selectedCharaID}`, err.message);
            })
        }
        if (DevSwitch == false && loc == "gear" && previousIDequipment != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}gear`] == true) {
            setequipmentdata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/_m/equipment_passive_character/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`equipment_passive_character_new_${ver}_${selectedCharaID}`);
                setequipmentdata(response);
                setpreviousIDequipment(selectedCharaID + ver);
            }).catch(function (err) {
                _error(`equipment_passive_character_new_${ver}_${selectedCharaID}`, err.message);
            })
        }
        //link
        if (DevSwitch == true && loc == "passives" && match.params.type == "force" && previousIDlink != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}link`] == true) {
            setlinkeddata(undefined)
            axios.get(`http://localhost:3005/data/link_chara/${ver}New/${selectedCharaID}`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`link_chara_new_${ver}_${selectedCharaID}`);
                setlinkeddata(response);
                setpreviousIDlink(selectedCharaID + ver);
            }).catch(function (err) {
                setlinkeddata([]);
                _error(`link_chara_new_${ver}_${selectedCharaID}`, err.message);
            })
        }
        if (DevSwitch == false && loc == "passives" && match.params.type == "force" && previousIDlink != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}link`] == true) {
            setlinkeddata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/_m/link_chara/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`link_chara_new_${ver}_${selectedCharaID}`);
                setlinkeddata(response);
                setpreviousIDlink(selectedCharaID + ver);
            }).catch(function (err) {
                setlinkeddata([]);
                _error(`link_chara_new_${ver}_${selectedCharaID}`, err.message);
            })
        }
        //crystal
        if (DevSwitch == true && loc == "passives" && match.params.type == "crystal" && previousIDcpassive != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}crystal`] == true) {
            setcpassivedata(undefined)
            axios.get(`http://localhost:3005/data/crystal_awakening_chara/${ver}New/${selectedCharaID}`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`crystal_awakening_chara_new_${ver}_${selectedCharaID}`);
                setcpassivedata(response);
                setpreviousIDcpassive(selectedCharaID + ver);
            }).catch(function (err) {
                _error(`crystal_awakening_chara_new_${ver}_${selectedCharaID}`, err.message);
            })
        }
        if (DevSwitch == false && loc == "passives" && match.params.type == "crystal" && previousIDcpassive != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}crystal`] == true) {
            setcpassivedata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/_m/crystal_awakening_chara/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`crystal_awakening_chara_new_${ver}_${selectedCharaID}`);
                setcpassivedata(response);
                setpreviousIDcpassive(selectedCharaID + ver);
            }).catch(function (err) {
                _error(`crystal_awakening_chara_new_${ver}_${selectedCharaID}`, err.message);
            })
        }
        //exp
        if (DevSwitch == true && loc == "passives" && match.params.type == "exp" && previousIDexp != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}exp`] == true) {
            setexpdata(undefined)
            axios.get(`http://localhost:3005/data/chara_level_ability/${ver}New/${selectedCharaID}`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`chara_level_ability_new_${ver}_${selectedCharaID}`);
                setexpdata(response);
                setpreviousIDexp(selectedCharaID + ver);
            }).catch(function (err) {
                _error(`chara_level_ability_new_${ver}_${selectedCharaID}`, err.message);
            })
        }
        if (DevSwitch == false && loc == "passives" && match.params.type == "exp" && previousIDexp != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}exp`] == true) {
            setexpdata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/_m/chara_level_ability/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`chara_level_ability_new_${ver}_${selectedCharaID}`);
                setexpdata(response);
                setpreviousIDexp(selectedCharaID + ver);
            }).catch(function (err) {
                _error(`chara_level_ability_new_${ver}_${selectedCharaID}`, err.message);
            })
        }
        //art
        if (DevSwitch == true && loc == "passives" && match.params.type == "arts" && previousIDart != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}art`] == true) {
            setartdata(undefined)
            axios.get(`http://localhost:3005/data/art_passive_bycharacter/${ver}New/${selectedCharaID}`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`art_passive_bycharacter_new_${ver}_${selectedCharaID}`);
                setartdata(response);
                setpreviousIDart(selectedCharaID + ver);
            }).catch(function (err) {
                _error(`art_passive_bycharacter_new_${ver}_${selectedCharaID}`, err.message);
            })
        }
        if (DevSwitch == false && loc == "passives" && match.params.type == "arts" && previousIDart != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}art`] == true) {
            setartdata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/_m/art_passive_bycharacter/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`art_passive_bycharacter_new_${ver}_${selectedCharaID}`);
                setartdata(response);
                setpreviousIDart(selectedCharaID + ver);
            }).catch(function (err) {
                _error(`art_passive_bycharacter_new_${ver}_${selectedCharaID}`, err.message);
            })
        }
        //ability
        if (DevSwitch == true && loc == "abilities" && previousIDability != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}abilities`] == true) {
            setabilitydata(undefined)
            axios.get(`http://localhost:3005/data/character_ability_character/${ver}New/${selectedCharaID}`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`character_ability_character_new_${ver}_${selectedCharaID}`);
                setabilitydata(response);
                setpreviousIDability(selectedCharaID + ver);
            }).catch(function (err) {
                _error(`character_ability_character_new_${ver}_${selectedCharaID}`, err.message);
            })
            setbuffdata(undefined)
            axios.get(`http://localhost:3005/data/ailmentdefault_character/${ver}New/${selectedCharaID}`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`ailmentdefault_character_new_${ver}_${selectedCharaID}`);
                setbuffdata(response);
                setpreviousIDability(selectedCharaID + ver);
            }).catch(function (err) {
                _error(`ailmentdefault_character_new_${ver}_${selectedCharaID}`, err.message);
            })
        }
        if (DevSwitch == false && loc == "abilities" && previousIDability != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}abilities`] == true) {
            setabilitydata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/_m/character_ability_character/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`character_ability_character_new_${ver}_${selectedCharaID}`);
                setabilitydata(response);
                setpreviousIDability(selectedCharaID + ver);
            }).catch(function (err) {
                _error(`character_ability_character_new_${ver}_${selectedCharaID}`, err.message);
            })
            setbuffdata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/_m/ailmentdefault_character/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`ailmentdefault_character_new_${ver}_${selectedCharaID}`);
                setbuffdata(response);
                setpreviousIDability(selectedCharaID + ver);
            }).catch(function (err) {
                _error(`ailmentdefault_character_new_${ver}_${selectedCharaID}`, err.message);
            })
        }
        //buffs
        if (DevSwitch == true && loc == "buffs" && previousIDability != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}buffs`] == true) {
            setabilitydata(undefined)
            axios.get(`http://localhost:3005/data/character_ability_character/${ver}New/${selectedCharaID}`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`character_ability_character_new_${ver}_${selectedCharaID}`);
                setabilitydata(response);
                setpreviousIDability(selectedCharaID + ver);
            }).catch(function (err) {
                _error(`character_ability_character_new_${ver}_${selectedCharaID}`, err.message);
            })
            setbuffdata(undefined)
            axios.get(`http://localhost:3005/data/ailmentdefault_character/${ver}New/${selectedCharaID}`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`ailmentdefault_character_new_${ver}_${selectedCharaID}`);
                setbuffdata(response);
                setpreviousIDability(selectedCharaID + ver);
            }).catch(function (err) {
                _error(`ailmentdefault_character_new_${ver}_${selectedCharaID}`, err.message);
            })
        }
        if (DevSwitch == false && loc == "buffs" && previousIDability != `${selectedCharaID}${ver}` && ProcessedCharacters[selectedCharaID][`${ver}basic`] == true && ProcessedCharacters[selectedCharaID][`${ver}buffs`] == true) {
            setabilitydata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/_m/character_ability_character/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`character_ability_character_new_${ver}_${selectedCharaID}`);
                setabilitydata(response);
                setpreviousIDability(selectedCharaID + ver);
            }).catch(function (err) {
                _error(`character_ability_character_new_${ver}_${selectedCharaID}`, err.message);
            })
            setbuffdata(undefined)
            axios.get(`https://www.dissidiacompendium.com/data/_dir/_m/ailmentdefault_character/${ver}New/${selectedCharaID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`ailmentdefault_character_new_${ver}_${selectedCharaID}`);
                setbuffdata(response);
                setpreviousIDability(selectedCharaID + ver);
            }).catch(function (err) {
                _error(`ailmentdefault_character_new_${ver}_${selectedCharaID}`, err.message);
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [DevSwitch, ver, match.params.type, loc, previousIDprofile, previousIDrework, selectedCharaID, previousIDevent, previousIDboard, previousIDspheres, previousIDequipment, previousIDlink, previousIDcpassive, previousIDexp, previousIDability])

    useEffect(() => {
        if (loc == "community") {
            setbanner_loc("Community Help")
            sethide_page(false)
        }
        if (loc == "character") {
            setbanner_loc("Classes dependant on selected version")
            sethide_page(false)
        }
        if (loc == "reworks") {
            setbanner_loc("Upcoming Reworks")
            sethide_page(false)
        }
        if (loc == "buffs") {
            setbanner_loc("Buffs")
            if (selected_char[`${ver}basic`] == true &&
                selected_char[`${ver}buffs`] == true) {
                sethide_page(false)
            } else {
                sethide_page(true)
            }
        }
        if (loc == "abilities") {
            setbanner_loc("Abilities")
            if (selected_char[`${ver}basic`] == true &&
                selected_char[`${ver}abilities`] == true) {
                sethide_page(false)
            } else {
                sethide_page(true)
            }
        }
        if (loc == "gear") {
            setbanner_loc("Gear")
            setbanner_loc("Abilities")
            if (selected_char[`${ver}basic`] == true &&
                selected_char[`${ver}gear`] == true) {
                sethide_page(false)
            } else {
                sethide_page(true)
            }
        }
        if (loc == "spheres") {
            setbanner_loc("Spheres")
            if (selected_char[`${ver}basic`] == true &&
                selected_char[`${ver}spheres`] == true) {
                sethide_page(false)
            } else {
                sethide_page(true)
            }
        }
        if (loc == "events") {
            setbanner_loc("Events")
            if (selected_char[`${ver}basic`] == true &&
                selected_char[`${ver}events`] == true) {
                sethide_page(false)
            } else {
                sethide_page(true)
            }
        }
        if (loc == "passives" && match.params.type == undefined) {
            setbanner_loc("Passives")
            if (selected_char[`${ver}basic`] == true &&
                selected_char[`${ver}crystal`] == true) {
                sethide_page(false)
            } else {
                sethide_page(true)
            }
        }
        if (loc == "passives" && match.params.type == "arts") {
            setbanner_loc("Artifacts")
            if (selected_char[`${ver}basic`] == true &&
                selected_char[`${ver}art`] == true) {
                sethide_page(false)
            } else {
                sethide_page(true)
            }
        }
        if (loc == "passives" && match.params.type == "exp") {
            setbanner_loc("Experience")
            if (selected_char[`${ver}basic`] == true &&
                selected_char[`${ver}exp`] == true) {
                sethide_page(false)
            } else {
                sethide_page(true)
            }
        }
        if (loc == "passives" && match.params.type == "crystal") {
            setbanner_loc("Crystal")
            if (selected_char[`${ver}basic`] == true &&
                selected_char[`${ver}crystal`] == true) {
                sethide_page(false)
            } else {
                sethide_page(true)
            }
        }
        if (loc == "passives" && match.params.type == "force") {
            setbanner_loc("Force Enhancement")
            if (selected_char[`${ver}basic`] == true &&
                selected_char[`${ver}link`] == true) {
                sethide_page(false)
            } else {
                sethide_page(true)
            }
        }
        if (loc == "passives" && match.params.type == "boards") {
            setbanner_loc("Boards")
            if (selected_char[`${ver}basic`] == true &&
                selected_char[`${ver}sum_fix`] == true) {
                sethide_page(false)
            } else {
                sethide_page(true)
            }
        }
    }, [loc, match, setbanner_loc, selected_char, ver, sethide_page])



    useEffect(()=>{
        if(selected_char.CharacterName != search){
            const filtered = master_list && master_list.filter((char) => (`${char.label} `).toLowerCase().includes(search != selected_char.CharacterName ? search.toLowerCase() : ""))
            if(filtered.length != 0){
                setlist(filtered)
            } else {
                setlist([{
                    value: "No option",
                    label: "No option",
                    id: "none",
                }])
            }
        } else {
            setlist(master_list)
        }
         // eslint-disable-next-line
    },[search,setsearch,selected_char,master_list])

    const setFlashandhide = () => {
        setsearch(selected_char.CharacterName)
        setshowdrop(false)
    }

    const char_select=(e)=>{
        setshowdrop(false)
        setsearch(e)
    }
    const handleFocus = (event) => {
        event.target.select()
        setshowdrop(true)
    };

    const navigate = useNavigate();

    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setshowdrop(false)
            if(list && list[0] && list[0].id != "none" && search != selected_char.CharacterName){
                const path = `/characters/${list[0].value}${loc!="character"?`/${loc}`:""}${match.params.type!=undefined?`/${match.params.type}`:""}${"/?"+getQuery().toString()}`
                navigate(path)
            } else {
                setsearch(selected_char.CharacterName)
            }
        }
    }

    const btnRef = useRef();
    UseOnClickOutside(btnRef, () => setshowdrop(false));

    return (
        <div>
            <Helmet>
                <title>{selected_char.CharacterName} Direct - Dissidia Compendium</title>
                <meta property="og:site_name" content="Dissidia Compendium" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://dissidiacompendium.com" />
                <meta name="description" content={`${selected_char.CharacterName} Page`} />
                <meta name="twitter:title" content={`${selected_char.CharacterName} Page`} />
                <meta name="twitter:description" content={`${selected_char.CharacterName} Page`} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:image:alt" content={`${selected_char.CharacterName}`} />
                <meta property="og:title" content={`${selected_char.CharacterName} Page`} />
                <meta property="og:description" content={`${selected_char.CharacterName} Banner`} />
                <meta property="og:url" content={`https://dissidiacompendium.com/characters/${selected_char.ShortName}`} />
            </Helmet>
            <div className="returnbutton">
                <DefaultTippy content="Return to Characters" className="tooltip" >
                    <Link className="returnlink" to={`/characters/`}>
                        <div className="returnicon"></div>
                    </Link>
                </DefaultTippy>
            </div>
            <div className="content">
                <CharacterHeader
                    nextevent={nextevent}
                    previousevent={previousevent}
                    Subheader={banner_loc}
                    subcat={"none"}
                    headertitle={
                        <h1>
                                
                            <span>
                                <DefaultTippy content={`${jptoggledata == true ? "Switch to GL" : "Switch to JP"}`} className="tooltip" >
                                    <span onClick={jponlybutton} className={`${jptoggledata ? "jpflage jpsmallinactive smalleventbutton" : "glflage smalleventbutton"}`} />
                                </DefaultTippy>
                            </span>{" "}
                                <span ref={btnRef} className='char_link' 
                                >
                                <AutosizeInput
                                   
                                    inputStyle={{
                                        background: "none",
                                        color: "white",
                                        border: "none",
                                        textAlign: "center",
                                        fontSize: "calc( var(--column-width) / 100 )",
                                        fontWeight: "bold",
                                        textShadow: "-1px -1px #000, 1px -1px #000, -1px 1px #000, 1px 1px #000",
                                        outline: "none",
                                        minWidth: "2em",
                                        display: "inline-block",
                                        position: "relative",
                                        whiteSpace: "pre",
                                        padding: "0px"
                                    }}
                                    autoCapitalize="none"
                                    autoComplete="off" 
                                    autoCorrect="off" 
                                    spellCheck="false"
                                    tabIndex="0"
                                    type="text" 
                                    id="search2"
                                    aria-autocomplete="list"
                                    aria-expanded="false"
                                    aria-haspopup="true"
                                    role="combobox"
                                    onChange={e => setsearch(e.target.value)}
                                    value={search}
                                    onFocus={handleFocus}
                                    onKeyDown={_handleKeyDown}
                                    >
                                    </AutosizeInput>
                                    
                                {showdrop ? <TiArrowSortedUp className="uparrow" onClick={()=>setshowdrop(false)}/> : <TiArrowSortedDown className="downarrow" onClick={()=>setshowdrop(true)}/>}
                                </span>

                            {showdrop == true ?
                                <div ref={btnRef}  className="char-container contrl_text">
                                    <div className="leveltext__menu menu_selector-list">
                                        <div className="typetext__menu-list menu_selector-MenuList">
                                            {list && list.map((char,i) => (
                                                char.id == "none"?
                                                <div key={char.id} style={{color:"grey"}} className={`typetext__option menu_option-MenuList no_click`} onClick={setFlashandhide}>
                                                    {char.label}
                                                </div>
                                                :
                                                <Link className="selectorlinks"  key={i} to={`/characters/${char.value}${loc!="character"?`/${loc}`:""}${match.params.type!=undefined?`/${match.params.type}`:""}${"/?"+getQuery().toString()}`}>
                                                    <div  onClick={()=>char_select(char.label)} className={`typetext__option menu_option-MenuList ${char.id == selected_char.CharID ? "leveltext__option--is-selected" : ""}`}>
                                                        {char.label}
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div> : ""}
                                <div className='abilityJPname'>{selected_char.JPName}</div>
                        </h1>}
                    match={match}
                    newmatch={selected_char}
                    pageloc={loc}
                    Access={ProcessedCharacters[selectedCharaID]}
                    direct_loc={match.params.type}
                />
                {hide_page == true ?
                    <div className='singlepageholder'>
                        <OhNo
                            name={selected_char.CharacterName}
                            random={random}
                            message1={"No results found"}
                            message={<span>Try changing version? <DefaultTippy content={`${jptoggledata == true ? "Switch to GL" : "Switch to JP"}`} className="tooltip" >
                                <span onClick={jponlybutton} className={`${jptoggledata ? "glflage smalleventbutton" : "jpflage jpsmallinactive smalleventbutton"}`} />
                            </DefaultTippy>
                            </span>}
                        />
                    </div>
                    :
                    ""}
                {hide_page == true ? "" :
                    loc == "character" ?
                        ProcessedVoices != undefined && CharStickers != undefined ?
                            <CharacterPageFormatting
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
                        : ""}
                {hide_page == true ? "" :
                    loc == "abilities" ?
                        abilitydata != undefined ?
                            <CharacterAbilityPageFormatting
                                key={selectedCharaID}
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
                            />
                            :
                            <div className='characterpageholder'>
                                Loading...
                            </div>
                        : ""}
                {hide_page == true ? "" :
                    loc == "buffs" ?
                        buffdata != undefined && abilitydata != undefined ?
                            <CharacterBuffPageFormatting
                                key={selectedCharaID}
                                ability_data={abilitydata}
                                buff_data={buffdata}
                                selected_id={selectedCharaID}

                                master_index={master_index}

                                ver={ver}
                                loc={"sum_fix_passive"}
                                newcompare={"new"}
                                file={"sum_fix_passive"}


                                formatting={formatting}
                            />
                            :
                            <div className='characterpageholder'>
                                Loading...
                            </div>
                        : ""}
                {hide_page == true ? "" :
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
                            />
                            :
                            <div className='characterpageholder'>
                                Loading...
                            </div>
                        : ""}
                {hide_page == true ? "" :
                    loc == "passives" && match.params.type == "crystal" ?
                        cpassivedata != undefined ?
                            <Crystal_Passives
                                crydata={cpassivedata}
                                ver={ver}
                                newcompare={"new"}
                                loc={"equipment_passive"}

                                master_index={master_index}
                                ProcessedCharacters={ProcessedCharacters}

                                formatting={formatting}
                            />
                            :
                            <div className='characterpageholder'>
                                Loading...
                            </div>
                        : ""}
                {hide_page == true ? "" :
                    loc == "passives" && match.params.type == "exp"
                        ? expdata != undefined ?
                            <EXP_Passives
                                key={selectedCharaID}
                                passive_data={expdata}
                                ver={ver}
                                loc={"sum_fix_passive"}
                                newcompare={"new"}

                                master_index={master_index}
                                ProcessedCharacters={ProcessedCharacters}

                                formatting={formatting}
                            />
                            :
                            <div className='characterpageholder'>
                                Loading...
                            </div>
                        : ""}

                {hide_page == true ? "" :
                    loc == "passives" && match.params.type == "boards" ?
                        boarddata != undefined ?
                            <Sum_Fix_Passive
                                key={selectedCharaID}
                                sum_fix_passive={boarddata}
                                ver={ver}
                                loc={"sum_fix_passive"}
                                newcompare={"new"}
                                ProcessedCharacters={ProcessedCharacters}
                                master_index={master_index}

                                formatting={formatting}
                            />
                            :
                            <div className='characterpageholder'>
                                Loading...
                            </div>
                        : ""}
                {hide_page == true ? "" :
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
                            />
                            :
                            <div className='characterpageholder'>
                                Loading...
                            </div>
                        : ""}
                {hide_page == true ? "" :
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
                            />
                            :
                            <div className='characterpageholder'>
                                Loading...
                            </div>
                        : ""}
                {hide_page == true ? "" :
                    loc == "reworks" ?
                        ProcessedReworks != undefined ?
                            <CharacterReworks
                                ProcessedReworks={ProcessedReworks}
                                master_index={master_index}
                                ProcessedCharacters={ProcessedCharacters}
                                match={match}
                                selected_chara={selected_char}
                                jptoggledata={jptoggledata}
                            />
                            :
                            <div className='characterpageholder'>
                                Loading...
                            </div>
                        : ""}
                {hide_page == true ? "" :
                    loc == "spheres" ?
                        spheresdata != undefined && profiledata != undefined ?
                            <SpheresPage
                                data={spheresdata}
                                profiledata={profiledata}
                                ProcessedEventsIndex={ProcessedEventsIndex}
                                char_data={selected_char}
                                ver={ver}
                                loc={"ex_skill"}
                                ProcessedCharacters={ProcessedCharacters}
                                master_index={master_index}

                                formatting={formatting}
                            />
                            :
                            <div className='characterpageholder'>
                                Loading...
                            </div>
                        : ""}
                {hide_page == true ? "" :
                    loc == "events" ?
                        eventdata != undefined
                            ?
                            <Event_Single
                                data={eventdata}
                                ProcessedEventsIndex={ProcessedEventsIndex}
                                jptoggledata={jptoggledata}
                                ver={ver}
                                ProcessedCharacters={ProcessedCharacters}
                            />
                            :
                            <div className='characterpageholder'>
                                Loading...
                            </div>
                        : ""}
                {hide_page == true ? "" :
                    loc == "community" ?
                        CharGuideData != undefined ?
                            <CharacterPageCommunity
                                selected_char={selected_char}
                                CharGuideData={CharGuideData} />
                            :
                            <div className='characterpageholder'>
                                Loading...
                            </div>
                        : ""}
            </div>
        </div>
    )
}