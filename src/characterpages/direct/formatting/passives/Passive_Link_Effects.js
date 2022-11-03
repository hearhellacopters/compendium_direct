import React from "react";
import require_trans_handler from '../require_trans_handler'
import replacer_titles from '../../../../processing/replacer_titles'
import replacer_buff from '../../../../processing/replacer_buffcontent'

const Passive_Link_Effects =({
    link_effect,
    ailment_group,
    command_group,
    AilmentNames,
    CommandNames,
    CondData,
    equipmentpassivenames,
    passivenames,
    require_passive,
    passive_target,
    trap_type,
    attack_type,
    killer_type,
    elementid_1,
    enemy_type,
    command_type,
    target_range_,
    formatting,
    Ailment_Effects
})=>{

    var val_edit_type = Ailment_Effects && Ailment_Effects.val_edit_type
    var group_id = Ailment_Effects && Ailment_Effects.group_id

    var require_value1 = link_effect.require_value1
    var require_value2 = link_effect.require_value2
    var require_value3 = link_effect.require_value3

    var require_value1_1 = link_effect.require_value1_1
    var require_value2_1 = link_effect.require_value2_1
    var require_value3_1 = link_effect.require_value3_1

    var value_display = undefined

    var require_ = ""
    var require__1 = ""

    if(link_effect.require_id != undefined){
        require_ = require_trans_handler(
            link_effect.require_id,
            link_effect.require_target,
            require_value1,
            require_value2,
            require_value3,
    
            require_passive,
            passive_target,
            CommandNames,
            AilmentNames,
            elementid_1,
            attack_type,
            killer_type,
            command_group,
            ailment_group,
            trap_type,
            passivenames,
            equipmentpassivenames,
            enemy_type,
            command_type,
            target_range_
        )
        }

        if(link_effect.cond_id != undefined){
            const puller = CondData[link_effect.cond_id] && CondData[link_effect.cond_id].trans
            const target = passive_target[link_effect.require_target] && passive_target[link_effect.require_target].passive_target
            if(puller != undefined){
                require_ = `${target}: ${puller}`
            } else {
                require_ = `cond_data #${link_effect.cond_id}`
            }
        }
    
        if(link_effect.require_id_1 != undefined){
            require__1 = require_trans_handler(
                link_effect.require_id_1,
                link_effect.require_target_1,
                require_value1_1,
                require_value2_1,
                require_value3_1,
        
                require_passive,
                passive_target,
                CommandNames,
                AilmentNames,
                elementid_1,
                attack_type,
                killer_type,
                command_group,
                ailment_group,
                trap_type,
                passivenames,
                equipmentpassivenames,
                enemy_type,
                command_type,
                target_range_
            )
        }

        if(link_effect.cond_id_1 != undefined){
            const puller2 = CondData[link_effect.cond_id_1] && CondData[link_effect.cond_id_1].trans
            const target2 = passive_target[link_effect.require_target_1] && passive_target[link_effect.require_target_1].passive_target
            if(puller2 != undefined){
                require__1 = `${target2}: ${puller2}`
            } else {
                require__1 = `cond_data #${link_effect.cond_id_1}`
            }
        }

        var effect_ = ``
        
        if(link_effect.change_value > 0){
            effect_ = `+${link_effect.change_value}%`
        }else{
            effect_ = `-${Math.abs(link_effect.change_value)}%`
        }

        if(link_effect.val_edit_type != undefined){
            const puller3 = val_edit_type[link_effect.val_edit_type] && val_edit_type[link_effect.val_edit_type]
            if(puller3.val_edit_type != undefined){
                if(puller3.modify_value != undefined){

                    if(puller3.modify_value == "group_id"){
                        const puller4 = group_id[link_effect.modify_value] && group_id[link_effect.modify_value].group_id
                        if(puller4 != undefined){
                            value_display = puller3.val_edit_type.replace(/\[modify_value\]/gm,puller4)
                        } else {
                            value_display = puller3.val_edit_type.replace(/\[modify_value\]/gm, `[unknown group#${link_effect.modify_value}]`)
                        }
                    }

                    if(puller3.modify_value == "ailment_id"){
                        const puller5 = AilmentNames[link_effect.modify_value] && AilmentNames[link_effect.modify_value].name
                        if(puller5 != undefined){
                            value_display = puller3.val_edit_type.replace(/\[modify_value\]/gm,`[${puller5}] #${link_effect.modify_value}`)
                        } else {
                            value_display = puller3.val_edit_type.replace(/\[modify_value\]/gm, `[unknown ailment#${link_effect.modify_value}]`)
                        }
                    }

                } else {
                    value_display = puller3.val_edit_type
                }
            } else {
                value_display = `val_edit_type #${link_effect.val_edit_typ}`
            }
        }

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

    return(
        <div>
            {add_formatting(`${effect_}${value_display!= undefined ? ` (${value_display})`:""} ${require_ != "" ? require_ : ""} ${require__1 != "" && require_ != "" ? " and " : ""}${require__1 != "" ? `${require__1}` : ""}${link_effect.add_once_in_turn != undefined ? " (once per turn)" : ""}`,"tl")}{require__1 != "" || require_ != "" ? <br/> : ""}
        </div>
    )
}

export default Passive_Link_Effects