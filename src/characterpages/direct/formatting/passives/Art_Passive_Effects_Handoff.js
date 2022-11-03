import React from "react";
import require_trans_handler from '../require_trans_handler'
import passive_effect_handler from "../passive_effect_handler";
import Passive_Effects_Attached from "./Passive_Effects_Attached";
import replacer_titles from '../../../../processing/replacer_titles'
import replacer_buff from '../../../../processing/replacer_buffcontent'
import reactStringReplace from "react-string-replace"

const Art_Passive_Effects_Handoff =({
    file,
    passive_ability,
    ailment_group,
    command_group,
    AilmentNames,
    CastNames,
    CommandNames,
    CondData,
    MessageData_FFSeries,
    MessageData_Category,
    equipmentpassivenames,
    passivenames,
    cast_targets,
    effect_data,
    require_passive,
    passive_target,
    trap_type,
    param_id,
    attack_type,
    killer_type,
    elementid_1,
    enemy_type,
    command_type,
    target_range_,
    command_data_effects,
    passive_effects_data,
    formatting
})=>{

    var require_ = ""
    var require__1 = ""

    if(passive_ability.require_type != undefined){
    require_ = require_trans_handler(
        passive_ability.require_type,
        passive_ability.require_target,
        passive_ability.require_arg_01,
        passive_ability.require_arg_02,
        passive_ability.require_arg_03,

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

    if(passive_ability.require_type_1 != undefined){
        require__1 = require_trans_handler(
            passive_ability.require_type_1,
            passive_ability.require_target_1,
            passive_ability.require_arg_01_1,
            passive_ability.require_arg_02_1,
            passive_ability.require_arg_03_1,
    
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

    var effect_ = ""
    var effect__1 = ""

    if(passive_ability.effect_type != undefined){
        effect_ = passive_effect_handler(
            passive_ability.effect_type,
            passive_ability.passive_target == 2 ? passive_ability.effect_target : passive_ability.passive_target,
            passive_ability.effect_arg_01,
            passive_ability.effect_arg_02,
            passive_ability.effect_arg_03,
            passive_ability.effect_type_1,
    
            effect_data,
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
            CastNames
        )
    }

    if(passive_ability.effect_type_1 != undefined){
        effect__1 = passive_effect_handler(
            passive_ability.effect_type_1,
            passive_ability.passive_target == 2 ? passive_ability.effect_target_1 : passive_ability.passive_target,
            passive_ability.effect_arg_01_1,
            passive_ability.effect_arg_02_1,
            passive_ability.effect_arg_03_1,
            passive_ability.effect_type_1,
    
            effect_data,
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
            CastNames
        )
    }

    const add_formatting = (text,switching)=>{
        if(formatting != true){
            let replacement = text
            var number = 0

            replacement = replacement && replacement.replace(/ /,"\xa0")

            replacement = replacement == undefined ? "" : reactStringReplace(replacement, /(\\n)/, (match, i) => {
                number = number + 1
                return(
                    <br key={`8-${i}-${number}`}/>
            )})
            replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\n)/, (match, i) => {
                number = number + 1
                return(
                    <br key={`9-${i}-${number}`}/>
            )})
            return replacement
        } else {
            if(switching == "tl"){
                return replacer_titles(text)
            }
            if(switching == "bu"){
                return replacer_buff(text)
            }
        }
    }

    const effect_display_pars = (effect_,effect__1,require_,require__1,effect_num)=>{
        const effec_1_break = effect_ && effect_.search('\n') != -1 
        var add_char_1 = `\xa0- `
        var last_char_1 = `\xa0- `
        if(require_ != "" || require__1 != ""){
        add_char_1 = `\xa0├─ `
        last_char_1 = effect__1 == "" ? `\xa0└─ ` : `\xa0├─ `
        }
        if(effec_1_break){
            const last1 = effect_.split(/\n/g).length - 1
            var effect_display = effect_.split(/\n/g).map((text,key)=>{
                return(
                <div key={key}>{add_formatting(`${key != last1 ? add_char_1 : last_char_1}${text}`,"bu")}</div>
                )
            })
            
        } else {
            effect_display = <div >{add_formatting(`${last_char_1}${effect_}`,"bu")}</div>
        }
        const effec_2_break = effect__1 && effect__1.search('\n') != -1 
        var add_char_2 = `\xa0- `
        var last_char_2 = `\xa0- `
        if(require_ != "" || require__1 != ""){
        add_char_2 = `\xa0├─ `
        last_char_2 = `\xa0└─ `
        }
        if(effec_2_break){
            const last2 = effect__1.split(/\n/g).length - 1
            var effect__1_display = effect__1.split(/\n/g).map((text,key)=>{
                return(
                <div key={key}>{add_formatting(`${key != last2 ? add_char_2 : last_char_2}${text}`,"bu")}</div>
                )
            })
        } else {
            effect__1_display = <div >{add_formatting(`${last_char_2}${effect__1}`,"bu")}</div>
        }
        if(effect_num == 1){
            return effect_ != "Field Effect" && effect_ != "" ? effect_display :""
        } else {
            return effect__1 != "Field Effect" && effect__1 != ""? effect__1_display :""
        }
    }

    if(require_ == "" && require__1 == "" && effect_ == "" && effect__1 == ""){
        return ("")
    }else {
    return(
        <div >
            <div>
            {add_formatting(`${require__1 == "" && require_ == "" ? "" : "\xa0┬ "}${require_}${require__1 != "" && require_ != "" ? " & " : ""}${require__1 != "" ? `${require__1}` : ""}`,"tl")}{require__1 != "" || require_ != "" ? <br/> : ""}
                {effect_display_pars(effect_,effect__1,require_,require__1,1)}
                {effect_display_pars(effect_,effect__1,require_,require__1,2)}
            </div>
            {passive_ability.attached != undefined ?
            passive_ability.attached.map(self=>
                <Passive_Effects_Attached
                key={Object.values(self)[0].pa_id}
                passive_ability={Object.values(self)[0]}
                ailment_group={ailment_group}
                command_group={command_group}
                AilmentNames={AilmentNames}
                CastNames={CastNames}
                CommandNames={CommandNames}
                CondData={CondData}
                MessageData_FFSeries={MessageData_FFSeries}
                MessageData_Category={MessageData_Category}
                equipmentpassivenames={equipmentpassivenames}
                command_data_effects={command_data_effects}
                passive_effects_data={passive_effects_data}
                passivenames={passivenames}
                cast_targets={cast_targets}
                effect_data={effect_data}
                require_passive={require_passive}
                passive_target={passive_target}
                trap_type={trap_type}
                param_id={param_id}
                attack_type={attack_type}
                killer_type={killer_type}
                elementid_1={elementid_1}
                enemy_type={enemy_type}
                command_type={command_type}
                target_range_={target_range_}
                formatting={formatting}
                />
            )
            :""}
        </div>  
    )
    }
}

export default Art_Passive_Effects_Handoff