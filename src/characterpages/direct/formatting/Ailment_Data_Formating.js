import React, {useState, useEffect} from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import { Link } from 'react-router-dom'
import 'react-lazy-load-image-component/src/effects/opacity.css';
import ailment_data_pars from './Ailment_Data_Pars'
import Ailment_Data_Pars_Handler from './Ailment_Data_Pars_Handler';
import Ailment_Level_Settings from './Ailment_Level_Settings';
import Field_Effect_Pars from './Field_Effect_Pars';
import Ailment_Meta_Handler from './Ailment_Meta_Handler.js'
import Slider_Handler from './Slider_Handler';
import Slider from 'react-input-slider';
import SilderStyleLevel from './SilderStyleLevel';
import SilderStyleRank from './SilderStyleRank';
import SilderStyleTurns from './SilderStyleTurns';
import SilderStyleDebuff from './SilderStyleDebuff';
import SilderStyleHP from './SilderStyleHP';
import SilderStyleBuff from './SilderStyleBuff';
import Ailment_Data_Combination_Formatting from './Ailment_Combination_Formatting'
import Ailment_Modify_Formatting from './Ailment_Modify_Formatting';
import replacer_titles from '../../../processing/replacer_titles'
import replacer_buff from '../../../processing/replacer_buffcontent'
import Passive_Link_Effects from './passives/Passive_Link_Effects';
import Ailment_Attached from './Ailment_Attached';
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import axios from "axios";
import DevSwitch from '../../../redux/DevSwitch';
import addformatting from '../../../processing/replacer_buffcontent';
import { useDispatch, useSelector } from "react-redux";
import { getTransNames } from '../../../redux/ducks/transnames';
import Format_Cleaner from '../../../processing/Format_Cleaner';
import translater from '../../../processing/translater_characters';
import ReactJson from '@microlink/react-json-view'
import merger_master from '../merger_master';
import Passive_Battle_State from './passives/Passives_Battle_State';
import Passive_Total_Display from './passives/Passive_Total_Display';
import DefaultTippy from '../../../formatting/TippyDefaults'
import ailment_tags from './command_ability/ailment_tags.json'

const Ailment_Data_Formatting = ({
    file,
    loc,
    ver,
    ailment_data,
    ailment_group,
    command_group,
    AilmentNames,
    CastNames,
    CommandNames,
    CondData,
    Ailment_Effects,

    passive_effects_data,
    equipmentpassivenames,
    passivenames,
    command_data_effects,
    enemy_type,

    MessageData_FFSeries,
    MessageData_Category,
    slider,
    rank,
    arg1,
    arg2,
    castlocation,
    fullspan,
    alt_rank,
    alt_aug1,
    alt_aug2,
    formatting,
    gear,
    char_id,
    span,
    cast_targets,
    cur_char,
    turns
}) =>{

    const [onion_passoff, setonion_passoff] = useStateIfMounted();
    const [showdesc, setshowdesc] = useStateIfMounted(false);
    const [setdesc,setsetdesc] = useStateIfMounted();
    const [showtrans, setshowtrans] = useStateIfMounted(false)
    const [trans, settrans] = useStateIfMounted()

    const [showraw,setshowraw] = useStateIfMounted(false)
    const [ailment_tag, setailment_tag]= useStateIfMounted([]);

    const showmeraw = (e)=>{
        if(e.shiftKey){
            if(showraw == false){
                const holder =[]
                Object.keys(ailment_tags).forEach(key=>{
                    if(ailment_data[`${key}`] != undefined){
                        holder.push(ailment_tags[`${key}`])
                    }
                })
                setailment_tag(holder)
            setshowraw(true)
            } else{
                setshowraw(false)
            }
        }
    }

    useEffect(()=>{
        setshowdesc(false)
        setsetdesc()
        // eslint-disable-next-line
    },[ailment_data])

    const dispatch = useDispatch();

    const transnames = useSelector((state) => 
    state.transnames.transnames
    );

    async function doTrans(text){
        setshowtrans((prevValue) => !prevValue)
    }

    useEffect(() => {
        let mounted = true
        if (mounted && transnames == undefined && showtrans== true) {
        dispatch(getTransNames());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,transnames,showtrans]);

    useEffect(() => {
        const text = Format_Cleaner(setdesc).replace(/\\n/gm,"\x0A")
        if(transnames != undefined && showtrans == true){
            const translate = translater(text,transnames)
            settrans(translate)
        }
        }, [settrans,transnames,showtrans,setdesc]);

    const showmedesc = (current)=>{
        if(current == false){
            setshowdesc(true)
        } else{
            setshowdesc(false)
            setonion_passoff()
        }
    }

    useEffect(()=>{
        if(ailment_data && ailment_data.id && showdesc == true){
            if(onion_passoff != undefined){
                if(DevSwitch == true){
                    axios.get(`http://localhost:3005/data/_dir/ailmenttextonion/${onion_passoff}`,{'muteHttpExceptions': true}).then((res) => {
                        const response = res.data;
                        setsetdesc(response[ver])
                        }).catch(function(err) {
                            console.log(err)
                            setsetdesc("")
                        })
                } else {
                    axios.get(`https://www.dissidiacompendium.com/data/_dir/ailmenttextonion/${onion_passoff}.json`,{'muteHttpExceptions': true}).then((res) => {
                        const response = res.data;
                        setsetdesc(response[ver])
                        }).catch(function(err) {
                            console.log(err)
                            setsetdesc("")
                        })
                }
            } else {
                if(ailment_data.onion == undefined){
                    if(DevSwitch == true){
                        axios.get(`http://localhost:3005/data/_dir/ailmenttext/${ailment_data.id}`,{'muteHttpExceptions': true}).then((res) => {
                            const response = res.data;
                            setsetdesc(response[ver])
                            }).catch(function(err) {
                                console.log(err)
                                setsetdesc("")
                            })
                    } else {
                        axios.get(`https://www.dissidiacompendium.com/data/_dir/ailmenttext/${ailment_data.id}.json`,{'muteHttpExceptions': true}).then((res) => {
                            const response = res.data;
                            setsetdesc(response[ver])
                            }).catch(function(err) {
                                console.log(err)
                                setsetdesc("")
                            })
                    }
                }
            }
        }
        // eslint-disable-next-line 
    },[showdesc,onion_passoff,ailment_data,ver])

    const [showattached, setshowattached] = useStateIfMounted(false);

    const showmeattached = (current)=>{
        if(current == false){
            setshowattached(true)
        } else{
            setshowattached(false)
            setonion_passoff()
        }
    }

    useEffect(()=>{
        setshowattached(false)
        // eslint-disable-next-line
    },[ailment_data])

    const [highestlvl, setHighestlvl] = useStateIfMounted();

    useEffect(()=>{
        if(ailment_data.max_level >= 10){
            setHighestlvl(10)
        }
        if(ailment_data.max_level <= 10 && ailment_data.max_level != 0){
            setHighestlvl(ailment_data.max_level)
        } 
        if(ailment_data.max_level == 0){
            setHighestlvl(0)
        }
        if(ailment_data.max_level_overide != undefined){
            setHighestlvl(ailment_data.max_level_overide)
        }

        if(ailment_data.max_level == -1 && arg2 != undefined){
            setHighestlvl(arg2)
        }
        if(ailment_data.max_level == -1 && arg2 == undefined){
            setHighestlvl(10)
        }
        // eslint-disable-next-line
    },[ailment_data, arg2])

    const [currentrank, setcurrentrank] = useStateIfMounted(castlocation == false ? 1 : rank)
    const [currentlevel, setcurrentlevel] = useStateIfMounted(castlocation == false ? 1 : arg1)

    useEffect(()=>{
        if(arg1 != undefined && highestlvl != 0){
            if(castlocation == true){
                setcurrentlevel(arg1)
            }
        }
        // eslint-disable-next-line
    },[highestlvl, ailment_data,arg1,castlocation])

    useEffect(()=>{
        if(ailment_data && ailment_data.onion != undefined && ailment_data.onion != -1 && showdesc == true){
            setonion_passoff(ailment_data.onion + (currentlevel < 1 ? 0 : currentlevel - 1))
        } 
    },[currentlevel,setonion_passoff,ailment_data,showdesc])

    var turns_set = ailment_data && ailment_data.alife != undefined ? ailment_data.alife : turns

    const [currentturns, setcurrentturns] = useStateIfMounted(turns_set == undefined ? 1 : turns_set < 1 ? 1 : turns_set)
    const [currentdebuffsranks, setcurrentdebuffsranks] = useStateIfMounted(9)
    const [currentdebuffsmuliply, setcurrentdebuffsmuliply] = useStateIfMounted(9)
    const [currentbuffsranks, setcurrentbuffsranks] = useStateIfMounted(19)
    const [currentfieldbuffsranks, setcurrentfieldbuffsranks] = useStateIfMounted(7)
    const [currentbuffsmuliply, setcurrentbuffsmuliply] = useStateIfMounted(19)
    const [currentstacks, setcurrentstacks] = useStateIfMounted(5)
    const [currentenemies, setcurrentenemies] = useStateIfMounted(3)
    const [currentgroupstacks, setcurrentgroupstacks] = useStateIfMounted(5)
    const [currenthp, setcurrenthp] = useStateIfMounted(100)
    const [charactersleft, setcharactersleft] = useStateIfMounted(2)

    const handleChangeLevel = (e) => {
        setcurrentlevel(parseInt(e.x));
    };

    const handleChangeDebuffRank = (e) => {
        setcurrentdebuffsranks(parseInt(e.x));
      };
      const handleChangeDebuffMuliply = (e) => {
        setcurrentdebuffsmuliply(parseInt(e.x));
      };

    const handleChangeBuffRank = (e) => {
        setcurrentbuffsranks(parseInt(e.x));
    };
    const handleChangeFieldBuffRank = (e) => {
        setcurrentfieldbuffsranks(parseInt(e.x));
    };
    const handleChangeBuffMuliply = (e) => {
        setcurrentbuffsmuliply(parseInt(e.x));
    };

    const handleChangeGroupStacks = (e) => {
        setcurrentgroupstacks(parseInt(e.x));
    };


    const handleChangeStacks = (e) => {
        setcurrentstacks(parseInt(e.x));
    };

    const handleChangeEnemies = (e) => {
        setcurrentenemies(parseInt(e.x));
    };
    const handleChangeTurns = (e) => {
        setcurrentturns(parseInt(e.x));
    };

    const handleChangeRank = (e) => {
        setcurrentrank(parseInt(e.x));
      };

    const handleChangeHP = (e) => {
        setcurrenthp(parseInt(e.x));
    };

    const handleChangeCharactersLeft = (e) => {
        setcharactersleft(parseInt(e.x));
        };

    const effect_value_type_field = ailment_data.field && ailment_data.field.map(self=>{
        const fieldpull = self.effect_id && self.effect_id.effect_value_type
        return fieldpull
    })

    const val_edit_type_field = ailment_data.field && ailment_data.field.map(self=>{
        const fieldpull = self.effect_id && self.effect_id.val_edit_type
        return fieldpull
    })

    const sliders = Slider_Handler(ailment_data && ailment_data.val_type, 
                                   ailment_data && ailment_data.val_type_1, 
                                   ailment_data && ailment_data.val_type_2, 
                                   ailment_data && ailment_data.val_type_3, 
                                   ailment_data && ailment_data.val_type_4, 
                                   ailment_data && ailment_data.val_type_5, 
                                   ailment_data && ailment_data.val_type_6,
                                   ailment_data && ailment_data.val_type_7,
                                   ailment_data && ailment_data.val_type_8,
                                   ailment_data && ailment_data.val_type_9,
                                   ailment_data && ailment_data.val_edit_type,
                                   ailment_data && ailment_data.val_edit_type_1,
                                   ailment_data && ailment_data.val_edit_type_2,
                                   ailment_data && ailment_data.val_edit_type_3,
                                   ailment_data && ailment_data.val_edit_type_4,
                                   ailment_data && ailment_data.val_edit_type_5,
                                   ailment_data && ailment_data.val_edit_type_6,
                                   ailment_data && ailment_data.val_edit_type_7,
                                   ailment_data && ailment_data.val_edit_type_8,
                                   ailment_data && ailment_data.val_edit_type_9,
                                   ailment_data.max_level_overide != undefined ? ailment_data.max_level_overide : ailment_data.max_level,
                                   effect_value_type_field,
                                   val_edit_type_field);

    const effect_id_0 = ailment_data.effect_id && ailment_data_pars(
           loc,
           ailment_data.id,
           ailment_data.effect_id, 
           ailment_data.val_type,	
           ailment_data.val_specify, 
           ailment_data.val_edit_type, 
           ailment_data.cond_id, 
           ailment_data.rank_table, 
           ailment_data.is_buff,
           //effect#
           0,
           AilmentNames,
           CastNames,
           CommandNames,
           CondData,
           Ailment_Effects,
           MessageData_FFSeries,
           MessageData_Category,
           ailment_group,
           command_group,
           //aug1&2
           arg1,
           arg2,
           highestlvl,
           rank,
           alt_rank,
           alt_aug1,
           alt_aug2,
           char_id,
           undefined,
           ver
           )

        const effect_id_1 = ailment_data.effect_id_1 && ailment_data_pars(
            loc,
            ailment_data.id,
            ailment_data.effect_id_1, 
            ailment_data.val_type_1,	
            ailment_data.val_specify_1, 
            ailment_data.val_edit_type_1, 
            ailment_data.cond_id_1, 
            ailment_data.rank_table_1, 
            ailment_data.is_buff,
            //effect#
            1,
            AilmentNames,
            CastNames,
            CommandNames,
            CondData,
            Ailment_Effects,
            MessageData_FFSeries,
            MessageData_Category,
            ailment_group,
            command_group,
            //aug1&2
            arg1,
            arg2,
            highestlvl,
            rank,
            alt_rank,
            alt_aug1,
            alt_aug2,
            char_id,
            undefined,
            ver
            )

        const effect_id_2 = ailment_data.effect_id_2 && ailment_data_pars(
            loc,
            ailment_data.id,
            ailment_data.effect_id_2, 
            ailment_data.val_type_2,	
            ailment_data.val_specify_2, 
            ailment_data.val_edit_type_2, 
            ailment_data.cond_id_2, 
            ailment_data.rank_table_2, 
            ailment_data.is_buff,
            //effect#
            2,
            AilmentNames,
            CastNames,
            CommandNames,
            CondData,
            Ailment_Effects,
            MessageData_FFSeries,
            MessageData_Category,
            ailment_group,
            command_group,
            //aug1&2
            arg1,
            arg2,
            highestlvl,
            rank,
            alt_rank,
            alt_aug1,
            alt_aug2,
            char_id,
            undefined,
            ver
            )

        const effect_id_3 = ailment_data.effect_id_3 && ailment_data_pars(
            loc,
            ailment_data.id,
            ailment_data.effect_id_3, 
            ailment_data.val_type_3,	
            ailment_data.val_specify_3, 
            ailment_data.val_edit_type_3, 
            ailment_data.cond_id_3, 
            ailment_data.rank_table_3, 
            ailment_data.is_buff,
            //effect#
            3,
            AilmentNames,
            CastNames,
            CommandNames,
            CondData,
            Ailment_Effects,
            MessageData_FFSeries,
            MessageData_Category,
            ailment_group,
            command_group,
            //aug1&2
            arg1,
            arg2,
            highestlvl,
            rank,
            alt_rank,
            alt_aug1,
            alt_aug2,
            char_id,
            undefined,
            ver
            )

        var effect_id_4 = undefined
        if(ailment_data.effect_id_4 && ailment_data.effect_id_4 != 60){
            effect_id_4 = ailment_data.effect_id_4 && ailment_data_pars(
                loc,
                ailment_data.id,
                ailment_data.effect_id_4, 
                ailment_data.val_type_4,	
                ailment_data.val_specify_4, 
                ailment_data.val_edit_type_4, 
                ailment_data.cond_id_4, 
                ailment_data.rank_table_4, 
                ailment_data.is_buff,
                //effect#
                4,
                AilmentNames,
                CastNames,
                CommandNames,
                CondData,
                Ailment_Effects,
                MessageData_FFSeries,
                MessageData_Category,
                ailment_group,
                command_group,
                //aug1&2
                arg1,
                arg2,
                highestlvl,
                rank,
                alt_rank,
                alt_aug1,
                alt_aug2,
                char_id,
                undefined,
                ver
                )
            }

         const effect_id_5 = ailment_data.effect_id_5 && ailment_data_pars(
            loc,
            ailment_data.id,
            ailment_data.effect_id_5, 
            ailment_data.val_type_5,	
            ailment_data.val_specify_5, 
            ailment_data.val_edit_type_5, 
            ailment_data.cond_id_5, 
            ailment_data.rank_table_5, 
            ailment_data.is_buff,
            //effect#
            5,
            AilmentNames,
            CastNames,
            CommandNames,
            CondData,
            Ailment_Effects,
            MessageData_FFSeries,
            MessageData_Category,
            ailment_group,
            command_group,
            //aug1&2
            arg1,
            arg2,
            highestlvl,
            rank,
            alt_rank,
            alt_aug1,
            alt_aug2,
            char_id,
            undefined,
            ver
            )

         const effect_id_6 = ailment_data.effect_id_6 && ailment_data_pars(
            loc,
            ailment_data.id,
            ailment_data.effect_id_6, 
            ailment_data.val_type_6,	
            ailment_data.val_specify_6, 
            ailment_data.val_edit_type_6, 
            ailment_data.cond_id_6, 
            ailment_data.rank_table_6, 
            ailment_data.is_buff,
            //effect#
            6,
            AilmentNames,
            CastNames,
            CommandNames,
            CondData,
            Ailment_Effects,
            MessageData_FFSeries,
            MessageData_Category,
            ailment_group,
            command_group,
            //aug1&2
            arg1,
            arg2,
            highestlvl,
            rank,
            alt_rank,
            alt_aug1,
            alt_aug2,
            char_id,
            undefined,
            ver
            )

        const effect_id_7 = ailment_data.effect_id_7 && ailment_data_pars(
            loc,
            ailment_data.id,
            ailment_data.effect_id_7, 
            ailment_data.val_type_7,	
            ailment_data.val_specify_7, 
            ailment_data.val_edit_type_7, 
            ailment_data.cond_id_7, 
            ailment_data.rank_table_7, 
            ailment_data.is_buff,
            //effect#
            7,
            AilmentNames,
            CastNames,
            CommandNames,
            CondData,
            Ailment_Effects,
            MessageData_FFSeries,
            MessageData_Category,
            ailment_group,
            command_group,
            //aug1&2
            arg1,
            arg2,
            highestlvl,
            rank,
            alt_rank,
            alt_aug1,
            alt_aug2,
            char_id,
            undefined,
            ver
            )
        

        const effect_id_8 = ailment_data.effect_id_8 && ailment_data_pars(
            loc,
            ailment_data.id,
            ailment_data.effect_id_8, 
            ailment_data.val_type_8,	
            ailment_data.val_specify_8, 
            ailment_data.val_edit_type_8, 
            ailment_data.cond_id_8, 
            ailment_data.rank_table_8, 
            ailment_data.is_buff,
            //effect#
            8,
            AilmentNames,
            CastNames,
            CommandNames,
            CondData,
            Ailment_Effects,
            MessageData_FFSeries,
            MessageData_Category,
            ailment_group,
            command_group,
            //aug1&2
            arg1,
            arg2,
            highestlvl,
            rank,
            alt_rank,
            alt_aug1,
            alt_aug2,
            char_id,
            undefined,
            ver
            )

        const effect_id_9 = ailment_data.effect_id_9 && ailment_data_pars(
            loc,
            ailment_data.id,
            ailment_data.effect_id_9, 
            ailment_data.val_type_9,	
            ailment_data.val_specify_9, 
            ailment_data.val_edit_type_9, 
            ailment_data.cond_id_9, 
            ailment_data.rank_table_9, 
            ailment_data.is_buff,
            //effect#
            9,
            AilmentNames,
            CastNames,
            CommandNames,
            CondData,
            Ailment_Effects,
            MessageData_FFSeries,
            MessageData_Category,
            ailment_group,
            command_group,
            //aug1&2
            arg1,
            arg2,
            highestlvl,
            rank,
            alt_rank,
            alt_aug1,
            alt_aug2,
            char_id,
            undefined,
            ver
            )
 
    const metadata = Ailment_Meta_Handler(
        ailment_data.icon_type, 
        ailment_data.sp_disp_type, 
        ailment_data.global_limit, 
        ailment_data.life_type, 
        ailment_data.extendable, 
        ailment_data.onion, 
        ailment_data.b_life, 
        ailment_data.b_active, 
        ailment_data.max_level, 
        ailment_data.life_max_, 
        ailment_data.group_id,

        Ailment_Effects,
        highestlvl
        )

    const ailmentname = ailment_data.name && ailment_data.name

    const ailmentjpname = ailment_data.jpname && ailment_data.jpname

    const add_formatting = (text,switching)=>{
        if(formatting != true){
            return text
        } else {
            if(switching == "tl"){
                return replacer_titles(text)
            }
            if(switching == "bu"){
                return replacer_buff(text)
            }
        }
    }

    const minH = window.innerWidth <= 800 ? 210 : 150;

    const require_passive = passive_effects_data && passive_effects_data.require_passive
    const passive_target = passive_effects_data && passive_effects_data.passive_target
    const trap_type = passive_effects_data && passive_effects_data.trap_type
    const attack_type = passive_effects_data && passive_effects_data.attack_type
    const elementid_1 = passive_effects_data && passive_effects_data.elementid_1

    const killer_type = command_data_effects && command_data_effects.killer_type
    const command_type = command_data_effects && command_data_effects.command_type
    const target_range_ = command_data_effects && command_data_effects.target_range_

    const [merge_pas, setmerge_pas] = useStateIfMounted(ailment_data && ailment_data.passives && ailment_data.passives.length > 1 ? true :false)

    const togglemerge = () => {
      setmerge_pas((prevValue) => !prevValue);
    }

    const [show_upgrades, setshow_upgrades] = useStateIfMounted(ailment_data && ailment_data.options && ailment_data.options.length > 5 ? false : true)

    const doshow_upgrades =()=>{
        if(ailment_data && ailment_data.options && ailment_data.options.length > 5){
            setshow_upgrades(!show_upgrades)
        }
    }

    const [attachedbuff,setattachedbuff] = useStateIfMounted([])

    useEffect(()=>{
        setmerge_pas(ailment_data && ailment_data.passives && ailment_data.passives.length > 1 ? true : false)
        setshow_upgrades(ailment_data && ailment_data.options && ailment_data.options.length > 5 ? false : true)
        setattachedbuff([])
        // eslint-disable-next-line
    },[ailment_data])

    const buffattachedselect = (e) =>{
        if(attachedbuff && attachedbuff.id == e.id ){
            setattachedbuff([])
        } else {
            setattachedbuff(e)
        }
    }

    const replacer=(e)=>{
        var newtext = e&&e.replace(/&/gm,"%26")
        return newtext
    }

    const ailment_debug = {
        effect_id_0:effect_id_0,
        effect_id_1:effect_id_1,
        effect_id_2:effect_id_2,
        effect_id_3:effect_id_3,
        effect_id_4:effect_id_4,
        effect_id_5:effect_id_5,
        effect_id_6:effect_id_6,
        effect_id_7:effect_id_7,
        effect_id_8:effect_id_8,
        effect_id_9:effect_id_9,
        sliders: sliders,
        metadata: metadata
    } 

    return (
            <div key={ailment_data}
            className={`${fullspan == true || gear == true ? "infonameholderenemybuff default_passive ": "bufflistbanner "} ${ailment_data.is_buff == 0 ? "Debuffbase" : "Buffbase"}`}>
                <div onClick={showmeraw}  className={ailment_data.is_buff == 1 ? "Buffsubbanner" : "Debuffsubbanner"}>
                    {add_formatting(ailmentname  + " - #" + ailment_data.id,"tl")} 
                    {ailment_data.jpname == undefined || ailment_data.jpname == "" ?
                    <div className="abilityJPname">
                        {"None テキストなし"}
                    </div>
                    :<div className="abilityJPname">
                    {add_formatting(ailment_data.jpname && ailment_data.jpname,"tl")}
                    </div>}
                </div>
                {ailment_data.sp_disp_type == 133 ?
                    <div className="buffglreworkbanner">
                        <Link className="updatelink" to={`/characters/forcetime?Char=${char_id[cur_char] && replacer(char_id[cur_char].name)}`}>
                            View Force Time
                        </Link>
                    </div>
                    :""}
            {sliders.levels == false && 
            sliders.turns == false && 
            sliders.debuffsrank == false &&
            sliders.debuffsmuliply == false &&
            sliders.fieldbuffsrank == false &&
            sliders.buffsrank == false &&
            sliders.buffsmuliply == false &&
            sliders.groupstacks ==false &&
            sliders.enemies == false &&
            sliders.stacks == false &&
            sliders.currenthp == false &&
            sliders. charactersleft == false 
            ?
            "" :
            <div className={`sliderbase infonameholderenemybuff `}>
                {sliders.levels == true ?
                <div className="sliderspacer">
                <div className="rankspacer">{`Level: ${currentlevel} / ${highestlvl}`}</div>
                <Slider 
                key={ailment_data}
                axis="x"
                styles={SilderStyleLevel}
                onChange={handleChangeLevel}
                x={currentlevel} 
                xmin={0} 
                xmax={highestlvl}
                />
                </div>
                :""}
                {sliders.turns == true ?
                <div 
                key={ailment_data}
                className="sliderspacer">
                <div className="rankspacer">{`Turns remaining: ${currentturns} / ${10}`}</div>
                <Slider 
                key={ailment_data}
                axis="x"
                styles={SilderStyleTurns}
                onChange={handleChangeTurns}
                x={currentturns} 
                xmin={1} 
                xmax={10}
                />
                </div>
                :""}
                {sliders.debuffsrank == true ?
                <div 
                key={ailment_data}
                className="sliderspacer">
                <div className="rankspacer">{`Debuffs: ${currentdebuffsranks - 1} / ${8}`}</div>
                <Slider 
                key={ailment_data}
                axis="x"
                styles={SilderStyleDebuff}
                onChange={handleChangeDebuffRank}
                x={currentdebuffsranks} 
                xmin={1} 
                xmax={9}
                />
                </div>
                :""}
                {sliders.debuffsmuliply == true ?
                <div className="sliderspacer">
                <div className="rankspacer">{`Debuffs: ${currentdebuffsmuliply - 1} / ${8}`}</div>
                <Slider 
                key={ailment_data}
                axis="x"
                styles={SilderStyleDebuff}
                onChange={handleChangeDebuffMuliply}
                x={currentdebuffsmuliply} 
                xmin={1} 
                xmax={9}
                />
                </div>
                :""}
                {sliders.fieldbuffsrank == true ?
                <div className="sliderspacer">
                <div className="rankspacer">{`Per 3 Party Buffs: ${currentfieldbuffsranks - 1} / ${6}`}</div>
                <Slider 
                key={ailment_data}
                styles={SilderStyleBuff}
                onChange={handleChangeFieldBuffRank}
                x={currentfieldbuffsranks} 
                xmin={1} 
                xmax={7}
                />
                </div>
                :""}
                {sliders.buffsrank == true ?
                <div className="sliderspacer">
                <div className="rankspacer">{`Party Buffs: ${currentbuffsranks - 1} / ${18}`}</div>
                <Slider 
                key={ailment_data}
                styles={SilderStyleBuff}
                onChange={handleChangeBuffRank}
                x={currentbuffsranks} 
                xmin={1} 
                xmax={19}
                />
                </div>
                :""}
                {sliders.buffsmuliply == true ?
                <div className="sliderspacer">
                <div className="rankspacer">{`Party Buffs: ${currentbuffsmuliply - 1} / ${18}`}</div>
                <Slider 
                key={ailment_data}
                styles={SilderStyleBuff}
                onChange={handleChangeBuffMuliply}
                x={currentbuffsmuliply} 
                xmin={1} 
                xmax={19}
                />
                </div>
                :""}
                {sliders.enemies == true ?
                <div 
                key={ailment_data}
                className="sliderspacer">
                <div className="rankspacer">{`Enemies: ${currentenemies} / ${3}`}</div>
                <Slider 
                key={ailment_data}
                styles={SilderStyleBuff}
                onChange={handleChangeEnemies}
                x={currentenemies} 
                xmin={1} 
                xmax={3}
                />
                </div>
                :""}
                {sliders.stacks == true ?
                <div className="sliderspacer">
                <div className="rankspacer">{`Levels: ${currentstacks} / ${5}`}</div>
                <Slider 
                key={ailment_data}
                styles={SilderStyleDebuff}
                onChange={handleChangeStacks}
                x={currentstacks}  
                xmin={1} 
                xmax={5}
                />
                </div>
                :""}
                {sliders.groupstacks == true ?
                <div className="sliderspacer">
                <div className="rankspacer">{`Levels: ${currentgroupstacks} / ${5}`}</div>
                <Slider 
                key={ailment_data}
                styles={SilderStyleDebuff}
                onChange={handleChangeGroupStacks}
                x={currentgroupstacks} 
                xmin={1} 
                xmax={5}
                />
                </div>
                :""}
                {sliders.currenthp == true ?
                <div className="sliderspacer">
                <div className="rankspacer">{`Current HP: ${currenthp}% of ${100}%`}</div>
                <Slider 
                key={ailment_data}
                axis="x"
                styles={SilderStyleHP}
                onChange={handleChangeHP}
                x={currenthp} 
                xmin={0} 
                xmax={100}
                />
                </div>
                :""}
                {sliders.charactersleft == true ?
                <div className="sliderspacer">
                <div className="rankspacer">{`Characters to left: ${charactersleft} of ${2}`}</div>
                <Slider 
                key={ailment_data}
                axis="x"
                styles={SilderStyleHP}
                onChange={handleChangeCharactersLeft}
                x={charactersleft} 
                xmin={0} 
                xmax={2}
                />
                </div>
                :""}
            </div>}
                <div >
                    {ailment_data.note!=undefined?
                    <div className="subpassiveflair">
                    {ailment_data.note.split(/\n/gm).map((value, i)=>
                    <div key={i}>{replacer_buff(`(${value})`)}</div>
                    )}
                    </div>
                    :""}
                    {ailment_data.components != undefined ?
                    <div className="subpassiveflair2">
                        {ailment_data.components.map((item, i)=>
                            <Ailment_Data_Combination_Formatting
                            key={i}
                            components={item}
                            AilmentNames={AilmentNames} 
                            formatting={formatting}
                            char_id={char_id}
                            base_id={ailment_data.id}
                            />
                        )}
                    </div>
                    :""}

                    <Ailment_Data_Pars_Handler
                    file={file}
                    effect_id={effect_id_0}
                    castlocation={castlocation}
                    currentrank={currentrank}
                    currentlevel={currentlevel}
                    currentturns={currentturns}
                    currentenemies={currentenemies}
                    currentstacks={currentstacks}
                    currentdebuffsranks={currentdebuffsranks}
                    currentdebuffsmuliply={currentdebuffsmuliply}
                    currentbuffsranks={currentbuffsranks}
                    currentfieldbuffsranks={currentfieldbuffsranks}
                    currentbuffsmuliply={currentbuffsmuliply}
                    currentgroupstacks={currentgroupstacks}
                    currenthp={currenthp}
                    charactersleft={charactersleft}
                    formatting={formatting}
                    setonion_passoff={setonion_passoff}
                    setshowdesc={setshowdesc}
                    />
                    <Ailment_Data_Pars_Handler
                    file={file}
                    effect_id={effect_id_1}
                    castlocation={castlocation}
                    currentrank={currentrank}
                    currentlevel={currentlevel}
                    currentturns={currentturns}
                    currentenemies={currentenemies}
                    currentstacks={currentstacks}
                    currentdebuffsranks={currentdebuffsranks}
                    currentdebuffsmuliply={currentdebuffsmuliply}
                    currentbuffsranks={currentbuffsranks}
                    currentfieldbuffsranks={currentfieldbuffsranks}
                    currentbuffsmuliply={currentbuffsmuliply}
                    currentgroupstacks={currentgroupstacks}
                    currenthp={currenthp}
                    charactersleft={charactersleft}
                    formatting={formatting}
                    setonion_passoff={setonion_passoff}
                    setshowdesc={setshowdesc}
                    />
                    <Ailment_Data_Pars_Handler
                    file={file}
                    effect_id={effect_id_2}
                    castlocation={castlocation}
                    currentrank={currentrank}
                    currentlevel={currentlevel}
                    currentturns={currentturns}
                    currentenemies={currentenemies}
                    currentstacks={currentstacks}
                    currentdebuffsranks={currentdebuffsranks}
                    currentdebuffsmuliply={currentdebuffsmuliply}
                    currentbuffsranks={currentbuffsranks}
                    currentfieldbuffsranks={currentfieldbuffsranks}
                    currentbuffsmuliply={currentbuffsmuliply}
                    currentgroupstacks={currentgroupstacks}
                    currenthp={currenthp}
                    charactersleft={charactersleft}
                    formatting={formatting}
                    setonion_passoff={setonion_passoff}
                    setshowdesc={setshowdesc}
                    />
                    <Ailment_Data_Pars_Handler
                    file={file}
                    effect_id={effect_id_3}
                    castlocation={castlocation}
                    currentrank={currentrank}
                    currentlevel={currentlevel}
                    currentturns={currentturns}
                    currentenemies={currentenemies}
                    currentstacks={currentstacks}
                    currentdebuffsranks={currentdebuffsranks}
                    currentdebuffsmuliply={currentdebuffsmuliply}
                    currentbuffsranks={currentbuffsranks}
                    currentfieldbuffsranks={currentfieldbuffsranks}
                    currentbuffsmuliply={currentbuffsmuliply}
                    currentgroupstacks={currentgroupstacks}
                    currenthp={currenthp}
                    charactersleft={charactersleft}
                    formatting={formatting}
                    setonion_passoff={setonion_passoff}
                    setshowdesc={setshowdesc}
                    />
                    <Ailment_Data_Pars_Handler
                    file={file}
                    effect_id={effect_id_4}
                    castlocation={castlocation}
                    currentrank={currentrank}
                    currentlevel={currentlevel}
                    currentturns={currentturns}
                    currentenemies={currentenemies}
                    currentstacks={currentstacks}
                    currentdebuffsranks={currentdebuffsranks}
                    currentdebuffsmuliply={currentdebuffsmuliply}
                    currentbuffsranks={currentbuffsranks}
                    currentfieldbuffsranks={currentfieldbuffsranks}
                    currentbuffsmuliply={currentbuffsmuliply}
                    currentgroupstacks={currentgroupstacks}
                    currenthp={currenthp}
                    charactersleft={charactersleft}
                    formatting={formatting}
                    setonion_passoff={setonion_passoff}
                    setshowdesc={setshowdesc}
                    />
                    <Ailment_Data_Pars_Handler
                    file={file}
                    effect_id={effect_id_5}
                    castlocation={castlocation}
                    currentrank={currentrank}
                    currentlevel={currentlevel}
                    currentturns={currentturns}
                    currentenemies={currentenemies}
                    currentstacks={currentstacks}
                    currentdebuffsranks={currentdebuffsranks}
                    currentdebuffsmuliply={currentdebuffsmuliply}
                    currentbuffsranks={currentbuffsranks}
                    currentfieldbuffsranks={currentfieldbuffsranks}
                    currentbuffsmuliply={currentbuffsmuliply}
                    currentgroupstacks={currentgroupstacks}
                    currenthp={currenthp}
                    charactersleft={charactersleft}
                    formatting={formatting}
                    setonion_passoff={setonion_passoff}
                    setshowdesc={setshowdesc}
                    />
                    <Ailment_Data_Pars_Handler
                    file={file}
                    effect_id={effect_id_6}
                    castlocation={castlocation}
                    currentrank={currentrank}
                    currentlevel={currentlevel}
                    currentturns={currentturns}
                    currentenemies={currentenemies}
                    currentstacks={currentstacks}
                    currentdebuffsranks={currentdebuffsranks}
                    currentdebuffsmuliply={currentdebuffsmuliply}
                    currentbuffsranks={currentbuffsranks}
                    currentfieldbuffsranks={currentfieldbuffsranks}
                    currentbuffsmuliply={currentbuffsmuliply}
                    currentgroupstacks={currentgroupstacks}
                    currenthp={currenthp}
                    charactersleft={charactersleft}
                    formatting={formatting}
                    setonion_passoff={setonion_passoff}
                    setshowdesc={setshowdesc}
                    />
                    <Ailment_Data_Pars_Handler
                    file={file}
                    effect_id={effect_id_7}
                    castlocation={castlocation}
                    currentrank={currentrank}
                    currentlevel={currentlevel}
                    currentturns={currentturns}
                    currentenemies={currentenemies}
                    currentstacks={currentstacks}
                    currentdebuffsranks={currentdebuffsranks}
                    currentdebuffsmuliply={currentdebuffsmuliply}
                    currentbuffsranks={currentbuffsranks}
                    currentfieldbuffsranks={currentfieldbuffsranks}
                    currentbuffsmuliply={currentbuffsmuliply}
                    currentgroupstacks={currentgroupstacks}
                    currenthp={currenthp}
                    charactersleft={charactersleft}
                    formatting={formatting}
                    setonion_passoff={setonion_passoff}
                    setshowdesc={setshowdesc}
                    />
                    <Ailment_Data_Pars_Handler
                    file={file}
                    effect_id={effect_id_8}
                    castlocation={castlocation}
                    currentrank={currentrank}
                    currentlevel={currentlevel}
                    currentturns={currentturns}
                    currentenemies={currentenemies}
                    currentstacks={currentstacks}
                    currentdebuffsranks={currentdebuffsranks}
                    currentdebuffsmuliply={currentdebuffsmuliply}
                    currentbuffsranks={currentbuffsranks}
                    currentfieldbuffsranks={currentfieldbuffsranks}
                    currentbuffsmuliply={currentbuffsmuliply}
                    currentgroupstacks={currentgroupstacks}
                    currenthp={currenthp}
                    charactersleft={charactersleft}
                    formatting={formatting}
                    setonion_passoff={setonion_passoff}
                    setshowdesc={setshowdesc}
                    />
                    <Ailment_Data_Pars_Handler
                    file={file}
                    effect_id={effect_id_9}
                    castlocation={castlocation}
                    currentrank={currentrank}
                    currentlevel={currentlevel}
                    currentturns={currentturns}
                    currentenemies={currentenemies}
                    currentstacks={currentstacks}
                    currentdebuffsranks={currentdebuffsranks}
                    currentdebuffsmuliply={currentdebuffsmuliply}
                    currentbuffsranks={currentbuffsranks}
                    currentfieldbuffsranks={currentfieldbuffsranks}
                    currentbuffsmuliply={currentbuffsmuliply}
                    currentgroupstacks={currentgroupstacks}
                    currenthp={currenthp}
                    charactersleft={charactersleft}
                    formatting={formatting}
                    setonion_passoff={setonion_passoff}
                    setshowdesc={setshowdesc}
                    />
                    {ailment_data.field != undefined ?
                    <div className="">
                        <div className='spacearound'>
                                <DefaultTippy content="Field Effects">
                                <span className='fieldeffects'></span>
                                </DefaultTippy>
                            </div>
                        {ailment_data.field.map((item, i) => 
                            <Field_Effect_Pars 
                            key={i} 
                            file={file}
                            base_buff={ailment_data}
                            match={item} 
                            AilmentNames={AilmentNames} 
                            CondData={CondData} 
                            MessageData_FFSeries={MessageData_FFSeries}
                            MessageData_Category={MessageData_Category}
                            CastNames={CastNames}
                            CommandNames={CommandNames}
                            ailment_group={ailment_group}
                            command_group={command_group}
                            Ailment_Effects={Ailment_Effects}
                            is_buff={ailment_data.is_buff}
                            loc={loc}
                            slider={slider}
                            max_level={highestlvl}
                            rank={rank}
                            AugValue1={arg1}
                            AugValue2={arg2}
                            currentrank={currentrank}
                            currentlevel={currentlevel}
                            currentturns={currentturns}
                            currentenemies={currentenemies}
                            currentstacks={currentstacks}
                            currentdebuffsranks={currentdebuffsranks}
                            currentdebuffsmuliply={currentdebuffsmuliply}
                            currentbuffsranks={currentbuffsranks}
                            currentbuffsmuliply={currentbuffsmuliply}
                            currentfieldbuffsranks={currentfieldbuffsranks}
                            castlocation={castlocation}
                            currentgroupstacks={currentgroupstacks}
                            currenthp={currenthp}
                            charactersleft={charactersleft}
                            formatting={formatting}
                            alt_rank={alt_rank}
                            alt_aug1={alt_aug1}
                            alt_aug2={alt_aug2}
                            char_id={char_id}
                            />
                        )}
                    </div>
                    :""}
                    {ailment_data.force != undefined ?
                    <div className="forceaddtach infonameholderenemybuff default_passive">
                    <div className='BonusHPDamage'/>
                    {ailment_data.force.map(self=>(
                        <Passive_Link_Effects
                        key={self.link_id}
                        link_effect={self}
                        ailment_group={ailment_group}
                        command_group={command_group}
                        AilmentNames={AilmentNames}
                        CommandNames={CommandNames}
                        CondData={CondData}
                        equipmentpassivenames={equipmentpassivenames}
                        passivenames={passivenames}
                        require_passive={require_passive}
                        passive_target={passive_target}
                        trap_type={trap_type}
                        attack_type={attack_type}
                        killer_type={killer_type}
                        elementid_1={elementid_1}
                        enemy_type={enemy_type}
                        command_type={command_type}
                        target_range_={target_range_}
                        Ailment_Effects={Ailment_Effects}
                        formatting={formatting}
                        />
                    ))}
                    <div className='typeval'>*Totaled values</div>
                    </div>
                    :""}
                    {ailment_data.modify != undefined ?
                    <div className="introflex Dbase">
                    Modify:
                    <br/>
                        {ailment_data.modify.map((item, i) => 
                            <Ailment_Modify_Formatting 
                            key={i} 
                            modify={item}
                            CondData={CondData}
                            AilmentNames={AilmentNames}
                            command_group={command_group}
                            Single={false}
                            Ailment_Effects={Ailment_Effects}
                            formatting={formatting}
                            char_id={char_id}
                            />
                        )}
                    </div>
                    :""}
                    {ailment_data.levelsettings != undefined ?
                        <Ailment_Level_Settings levelsettings={ailment_data.levelsettings}/>
                    :""}

                    {ailment_data.passives != undefined?
                    <div className='p_grade'>
                        <div className='fieldbar'><span className='smallpassive'></span>{"\xa0"}Effects:</div>
                        <div className='spanleft'>
                        {ailment_data.passives.length != 1 ?
                        <div className='subpassiveflair spacearound'>
                            <div key="mergecheck1" className={`${merge_pas == true ? "nodisplay" :  `uncheck`}`} onClick={togglemerge}/>
                            <div key="mergecheck2" className={`${merge_pas == true ? "check" :  `nodisplay`}`} onClick={togglemerge}/>
                            <div className='noselect'>&nbsp;&nbsp;Total Values</div>
                        </div>
                        :""}
                        {merger_master(
                            ailment_data.passives,
                            passive_effects_data,
                            CommandNames,
                            AilmentNames,
                            command_group,
                            ailment_group,
                            passivenames,
                            equipmentpassivenames,
                            enemy_type,
                            CastNames,
                            merge_pas,
                            "ailment",
                            true
                        ).sort((a,b)=>a.rank-b.rank).map((ailment_passive,i,whole)=>(
                            ailment_passive.is_total != true ? <Passive_Battle_State
                            key={`${ailment_passive.pa_id}-${i}`}
                            passive_ability={ailment_passive}
                            ailment_group={ailment_group}
                            command_group={command_group}
                            AilmentNames={AilmentNames}
                            CastNames={CastNames}
                            ver={ver}
                            CommandNames={CommandNames}
                            CondData={CondData}
                            Ailment_Effects={Ailment_Effects}
                            MessageData_FFSeries={MessageData_FFSeries}
                            MessageData_Category={MessageData_Category}
                            equipmentpassivenames={equipmentpassivenames}
                            passivenames={passivenames}
                            cast_targets={cast_targets}
                            effect_data={passive_effects_data.effect_}
                            require_passive={passive_effects_data.require_passive}
                            passive_target={passive_effects_data.passive_target}
                            trap_type={passive_effects_data.trap_type}
                            param_id={passive_effects_data.param_id}
                            attack_type={passive_effects_data.attack_type}
                            killer_type={passive_effects_data.killer_type}
                            elementid_1={passive_effects_data.elementid_1}
                            enemy_type={enemy_type}
                            command_type={command_data_effects.command_type}
                            target_range_={command_data_effects.target_range_}
                            formatting={formatting}
                            skip_space={i}
                            use_ailment={true}
                            merged={whole[i-1] && whole[i-1].loc_tag}
                            hide_disp={merge_pas}
                            />
                            :
                            <Passive_Total_Display
                            key={i}
                            match={ailment_passive}
                            />
                        ))}
                        </div>
                    </div>
                    :""}

                    {ailment_data.options!=undefined?
                    <div className='p_grade'>
                        <div className='fieldbar'>
                        <div className={ailment_data.options.length <=5 ? "" :'updatelink clicky'} onClick={doshow_upgrades}>
                        {ailment_data.options.length <=5 ? <><span className='mini_ability'></span>Upgrades:</> : show_upgrades ? <><span className='mini_ability'></span>Hide Upgrades:</> : <><span className='mini_ability'></span>Show Upgrades:</>}
                        </div>
                        </div>
                        {show_upgrades ?
                            ailment_data.options.map((self,i)=>(
                                <div key={i} >{"\xa0- "}{addformatting(self,"tl")}</div>
                        ))
                        :""}
                        <div className='abilityJPname'>*conditions may apply</div>
                    </div>
                    :""}

                    {metadata && metadata.split ('\n').map((item, i) => <div key={i}>{item}</div>)}

                    <div onClick={()=>showmedesc(showdesc)} className='clicky contents updatelink'>{showdesc == false ? "\xa0- Show Desc -" : "\xa0- Hide Desc -"}</div>
                    {showdesc == true ?
                    <hr></hr>
                    :""}
                    {showdesc == true && trans != undefined && showtrans == true ?
                    trans.split(/\n/gm).map((value, i)=>
                    <div key={i}>
                    {addformatting(value,"tl")}<br></br>
                    </div>
                    )
                    :
                    <div>
                        {showdesc == true && setdesc != undefined && showtrans != true ? addformatting(Format_Cleaner(setdesc == undefined || setdesc == "" ? "Not available" : setdesc)):""}
                    </div>
                    }
                    {ver == "JP" && showdesc == true?
                        <div className='clicky updatelink' onClick={()=>doTrans()}>Translate (Beta)</div>
                    :""}

                    {showraw == true?
                    <div className="newblue">
                    <div className="unique ailmenttext">
                        Ailment Tags:
                    </div>
                    <ul className="abilitybufflist">
                            {ailment_tag.map(function(buff){
                            return  <li className={`abilitybufficonsholder`} key={`${buff.name}`}>
                                <div className="biconspacer" >
                                        <DefaultTippy content={buff.name}>
                                            <img alt={buff.name} className="abilitybufficon" src={`https://dissidiacompendium.com/images/static/icons/${buff.url}.png`} />
                                        </DefaultTippy>
                                    </div>
                                </li>
                            })}
                    </ul>
                    </div>
                    :
                    ""}
                    {showraw == true?
                    <ReactJson iconStyle={"square"} quotesOnKeys={false} name={"pars"} displayDataTypes={false} collapsed={true} theme={"threezerotwofour"} src={ailment_debug}/>
                    :""}
                    {showraw == true?
                    <ReactJson iconStyle={"square"} quotesOnKeys={false} name={"Raw"} displayDataTypes={false} collapsed={false} theme={"threezerotwofour"} src={ailment_data}/>
                    :""}

                    {ailment_data.attached != undefined ?
                        <div className='gearinfobanner newblue'>
                            <div className="unique ailmenttext">
                            Associated Casts:
                            </div>
                            <ul className="abilitybufflist">
                            {ailment_data.attached.map(function(buff){
                                return <li className={`abilitybufficonsholder ${buff.id == attachedbuff.id ? "buffactive" : ""}`} key={buff.id}>
                                <div className="biconspacer" onClick={() => buffattachedselect(buff)} >
                                    <DefaultTippy content={add_formatting(buff.name,"tl")}>
                                            <img alt={buff.name} className="clicky abilitybufficon" src={`https://dissidiacompendium.com/images/static/${buff.icon}`} />
                                        </DefaultTippy>
                                    </div>
                                </li>
                            })}
                            </ul>
                        </div>
                    :""}
                    {attachedbuff.length != 0 ? 
                        <Ailment_Attached
                        key={attachedbuff.id}
                        file={file}
                        ver={ver}
                        loc={loc}
                        ailment_data={attachedbuff}

                        command_data_effects={command_data_effects}
                        enemy_type={enemy_type}
                        passive_effects_data={passive_effects_data}
                        equipmentpassivenames={equipmentpassivenames}
                        passivenames={passivenames}
                        cast_targets={cast_targets}

                        ailment_group={ailment_group}
                        command_group={command_group}
                        AilmentNames={AilmentNames}
                        CastNames={CastNames}
                        CommandNames={CommandNames}
                        CondData={CondData}
                        Ailment_Effects={Ailment_Effects}
                        MessageData_FFSeries={MessageData_FFSeries}
                        MessageData_Category={MessageData_Category}
                        slider={true}
                        castlocation={true}
                        formatting={true}
                        rank={attachedbuff.arank}
                        arg1={attachedbuff.aarg1}
                        arg2={attachedbuff.aarg2}
                        alt_rank={attachedbuff.aranka}
                        alt_aug1={attachedbuff.aarg1a}
                        alt_aug2={attachedbuff.aarg2a}
                        char_id={char_id}
                        turns={attachedbuff.alife}
                        />
                    :""}
                </div>
            </div> 
    )
    
}

export default Ailment_Data_Formatting