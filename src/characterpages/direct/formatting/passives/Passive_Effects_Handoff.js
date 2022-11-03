import React from "react";
import require_trans_handler from '../require_trans_handler'
import passive_effect_handler from "../passive_effect_handler";
import Passive_Effects_Attached from "./Passive_Effects_Attached";
import replacer_titles from '../../../../processing/replacer_titles'
import replacer_buff from '../../../../processing/replacer_buffcontent'
import reactStringReplace from "react-string-replace"

const Passive_Effects_Handoff =({
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
    formatting,
    target_range_,
    base_color
})=>{

    var restrict_type = ""
    if(passive_ability.restrict_type == 1){
        restrict_type = "*Does not stack with sphere of same name"
    }
    if(passive_ability.restrict_type == 2){
        restrict_type = "*Does not inflict debuff from spheres of the same name"
    }
    var type_ = ""
    if(passive_ability.type_ == 2){
        type_ = "*Increases applied before battle"
    }

    var required_equip_pa_id = ""
    if(passive_ability.required_equip_pa_id != undefined && passive_ability.required_equip_pa_id != -1){
        if(passive_ability.required_equip_pa_type != undefined && passive_ability.required_equip_pa_type == 0){
            const pull = equipmentpassivenames[passive_ability.required_equip_pa_id]
            if(pull != undefined){
                required_equip_pa_id = <div>{`*Requires `}<span className={equipmentpassivenames[passive_ability.required_equip_pa_id].loc_tag}></span><span className="unique">{" ["}{equipmentpassivenames[passive_ability.required_equip_pa_id].name}{"]"}</span>{` #${passive_ability.required_equip_pa_id}`}</div>
            } else {
                required_equip_pa_id = <div>{`*Requires Equipment `}<span className="smallpassive automarg"/><span className="unique">{" ["}{passive_ability.required_equip_pa_id}{"]"}</span>{` #${passive_ability.required_equip_pa_id}`}</div>
            }
        }
        if(passive_ability.required_equip_pa_type != undefined && passive_ability.required_equip_pa_type == 1){
            const pull = passivenames[passive_ability.required_equip_pa_id]
            if(pull != undefined){
                required_equip_pa_id = <div>{`*Requires `}<span className={passivenames[passive_ability.required_equip_pa_id].loc_tag}></span><span className="unique">{" ["}{passivenames[passive_ability.required_equip_pa_id].name}{"]"}</span>{` #${passive_ability.required_equip_pa_id}`}</div>
            }else {
                required_equip_pa_id = <div>{`*Requires `}<span className="smallpassive automarg"/><span className="unique">{" ["}{passive_ability.required_equip_pa_id}{"]"}</span>{` #${passive_ability.required_equip_pa_id}`}</div>
            }
        }
    }

    //param trans

    var effect_value1 = ""
    var effect_value2 = ""
    var effect_value3 = ""
    if(passive_ability.effect_value01_param_id != undefined){
        if(param_id[passive_ability.effect_value01_param_id] != undefined){
            effect_value1 = param_id[passive_ability.effect_value01_param_id].param_id
        } else {
            effect_value1 = passive_ability.effect_value1
        }
    } else {
        effect_value1 = passive_ability.effect_value1
    }

    if(passive_ability.effect_value02_param_id != undefined){
        if(param_id[passive_ability.effect_value02_param_id] != undefined){
            effect_value2 = param_id[passive_ability.effect_value02_param_id].param_id
        } else {
            effect_value2 = passive_ability.effect_value2
        }
    }else {
        effect_value2 = passive_ability.effect_value2
    }
    
    if(passive_ability.effect_value03_param_id != undefined){
        if(param_id[passive_ability.effect_value03_param_id] != undefined){
            effect_value3 = param_id[passive_ability.effect_value03_param_id].param_id
        } else {
            effect_value3 = passive_ability.effect_value3
        }
    }else {
        effect_value3 = passive_ability.effect_value3
    }

    //param_1 trans

    var effect_value1_1 = ""
    var effect_value2_1 = ""
    var effect_value3_1 = ""
    if(passive_ability.effect_value01_param_id_1 != undefined){
        if(param_id[passive_ability.effect_value01_param_id_1] != undefined){
            effect_value1_1 = param_id[passive_ability.effect_value01_param_id_1].param_id
        } else {
            effect_value1_1 = passive_ability.effect_value1_1
        }
    } else {
        effect_value1_1 = passive_ability.effect_value1_1
    }

    if(passive_ability.effect_value02_param_id_1 != undefined){
        if(param_id[passive_ability.effect_value02_param_id_1] != undefined){
            effect_value2_1 = param_id[passive_ability.effect_value02_param_id_1].param_id
        } else {
            effect_value2_1 = passive_ability.effect_value2_1
        }
    }else {
        effect_value2_1 = passive_ability.effect_value2_1
    }
    
    if(passive_ability.effect_value03_param_id_1 != undefined){
        if(param_id[passive_ability.effect_value03_param_id_1] != undefined){
            effect_value3_1 = param_id[passive_ability.effect_value03_param_id_1].param_id
        } else {
            effect_value3_1 = passive_ability.effect_value3_1
        }
    }else {
        effect_value3_1 = passive_ability.effect_value3_1
    }

    //Require param trans

    var require_value1 = ""
    var require_value2 = ""
    var require_value3 = ""
    if(passive_ability.require_value01_param_id != undefined){
        if(param_id[passive_ability.require_value01_param_id] != undefined){
            require_value1 = param_id[passive_ability.require_value01_param_id].param_id
        } else {
            require_value1 = passive_ability.require_value1
        }
    } else {
        require_value1 = passive_ability.require_value1
    }

    if(passive_ability.require_value02_param_id != undefined){
        if(param_id[passive_ability.require_value02_param_id] != undefined){
            require_value2 = param_id[passive_ability.require_value02_param_id].param_id
        } else {
            require_value2 = passive_ability.require_value2
        }
    }else {
        require_value2 = passive_ability.require_value2
    }
    
    if(passive_ability.require_value03_param_id != undefined){
        if(param_id[passive_ability.require_value03_param_id] != undefined){
            require_value3 = param_id[passive_ability.require_value03_param_id].param_id
        } else {
            require_value3 = passive_ability.require_value3
        }
    }else {
        require_value3 = passive_ability.require_value3
    }

    //Require_1 param trans

    var require_value1_1 = ""
    var require_value2_1 = ""
    var require_value3_1 = ""
    if(passive_ability.require_value01_param_id_1 != undefined){
        if(param_id[passive_ability.require_value01_param_id_1] != undefined){
            require_value1_1 = param_id[passive_ability.require_value01_param_id_1].param_id
        } else {
            require_value1_1 = passive_ability.require_value1_1
        }
    } else {
        require_value1_1 = passive_ability.require_value1_1
    }

    if(passive_ability.require_value02_param_id_1 != undefined){
        if(param_id[passive_ability.require_value02_param_id_1] != undefined){
            require_value2_1 = param_id[passive_ability.require_value02_param_id_1].param_id
        } else {
            require_value2_1 = passive_ability.require_value2_1
        }
    }else {
        require_value2_1 = passive_ability.require_value2_1
    }
    
    if(passive_ability.require_value03_param_id_1 != undefined){
        if(param_id[passive_ability.require_value03_param_id_1] != undefined){
            require_value3_1 = param_id[passive_ability.require_value03_param_id_1].param_id
        } else {
            require_value3_1 = passive_ability.require_value3_1
        }
    }else {
        require_value3_1 = passive_ability.require_value3_1
    }

    var require_ = ""
    var require__1 = ""

    if(passive_ability.require_ != undefined){
    require_ = require_trans_handler(
        passive_ability.require_,
        passive_ability.require_target,
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

    if(passive_ability.require__1 != undefined){
        require__1 = require_trans_handler(
            passive_ability.require__1,
            passive_ability.require_target_1,
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

    var effect_ = ""
    var effect__1 = ""

    if(passive_ability.effect_ != undefined){
        effect_ = passive_effect_handler(
            passive_ability.effect_,
            passive_ability.passive_target == 2 ? passive_ability.effect_target : passive_ability.passive_target,
            effect_value1,
            effect_value2,
            effect_value3,
            passive_ability.effect__1,
    
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

    if(passive_ability.effect__1 != undefined){
        effect__1 = passive_effect_handler(
            passive_ability.effect__1,
            passive_ability.passive_target == 2 ? passive_ability.effect_target_1 : passive_ability.passive_target,
            effect_value1_1,
            effect_value2_1,
            effect_value3_1,
            passive_ability.effect__1,
    
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
        if(passive_ability.passive_cond_type == 1 && (require_ != "" || require__1 != "")){
        add_char_1 = `\xa0├─ `
        last_char_1 = effect__1 == "" ? `\xa0└─ ` : `\xa0├─ `     
        }
        if(passive_ability.passive_cond_type == 3 && (require_ != "" || require__1 != "")){
        add_char_1 = `\xa0├─ `
        last_char_1 = effect__1 == "" ? `\xa0└─ ` : `\xa0├─ `   
        }
        if(passive_ability.passive_cond_type == 2 && require_ != ""){
        add_char_1 = `\xa0├─ `
        last_char_1 = `\xa0└─ `
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
        if(passive_ability.passive_cond_type == 1 && (require_ != "" || require__1 != "")){
        add_char_2 = `\xa0├─ `
        last_char_2 = `\xa0└─ `
        }
        if(passive_ability.passive_cond_type == 3 && (require_ != "" || require__1 != "")){
        add_char_2 = `\xa0├─ `
        last_char_2 = `\xa0└─ `
        }
        if(passive_ability.passive_cond_type == 2 && require__1 != ""){
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
            {passive_ability.passive_cond_type == 1 ?
            <div>
                {add_formatting(`${require__1 == "" && require_ == "" ? "" : "\xa0┬ "}${require_}${require__1 != "" && require_ != "" ? " & " : ""}${require__1 != "" ? `${require__1}` : ""}`,"tl")}{require__1 != "" || require_ != "" ? <br/> : ""}
                {effect_display_pars(effect_,effect__1,require_,require__1,1)}
                {effect_display_pars(effect_,effect__1,require_,require__1,2)}
            </div>
            :""}
            {passive_ability.passive_cond_type == 3 ?
            <div>
                {add_formatting(`${require_ != "" ? `\xa0┬ ${require_}` : ""}${require__1 != "" && require_ != "" ? " or " : ""}${require__1 != "" ? `${require__1}` : ""}`,"tl")}{require__1 != "" || require_ != "" ? <br/> : ""}
                {effect_display_pars(effect_,effect__1,require_,require__1,1)}
                {effect_display_pars(effect_,effect__1,require_,require__1,2)}
            </div>
            :""}
            {passive_ability.passive_cond_type == 2 ?
            <div>
                <div>
                {require_ != "" ? add_formatting(`\xa0┬ ${require_}`,"tl") : ""}{require_ != "" ? <br/> : ""}
                {effect_display_pars(effect_,effect__1,require_,require__1,1)}
                </div>
                <div>
                {require__1 != "" ? add_formatting(`\xa0┬ ${require__1}`,"tl") : ""}{require__1 != "" ? <br/> : ""}
                {effect_display_pars(effect_,effect__1,require_,require__1,2)}
                </div>
            </div>
            :""}
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
                passivenames={passivenames}
                cast_targets={cast_targets}
                effect_data={effect_data}
                require_passive={require_passive}
                passive_target={passive_target}
                trap_type={trap_type}
                param_id={param_id}
                attack_type={attack_type}
                killer_type={killer_type}
                target_range_={target_range_}
                elementid_1={elementid_1}
                enemy_type={enemy_type}
                formatting={formatting}
                />
            )
            :""}
            {restrict_type != "" ?
            <div>
            {restrict_type}
            </div>
            :""}
            {type_ != "" ?
            <div>
            {type_}
            </div>
            :""}
            {required_equip_pa_id != "" ?
            <div>
            {required_equip_pa_id}
            </div>
            :""}
        </div>  
    )
    }
}

export default Passive_Effects_Handoff