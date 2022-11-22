import React, {useState, useEffect} from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import require_trans_handler from '../require_trans_handler'
import passive_effect_handler from "../passive_effect_handler";
import replacer_titles from '../../../../processing/replacer_titles'
import replacer_buff from '../../../../processing/replacer_buffcontent'
import reactStringReplace from "react-string-replace"
import Ailment_Field_Attached_State from "../Ailment_Field_Attached_State";
import ReactJson from '@microlink/react-json-view'
import Tippy from '../../../../formatting/TippyDefaults'

const Passive_Battle_State =({
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
    Ailment_Effects,
    skip_space,
    ver,
    use_ailment,
    merged,
    hide_disp
})=>{

    const [showraw,setshowraw] = useState(false)

    const showmeraw = (e)=>{
        if(e.shiftKey){
            if(showraw == false){
                setshowraw(true)
            } else{
                setshowraw(false)
            }
        }
    }

    var effect_value1 = passive_ability.effect_value1_disp
    var effect_value2 = passive_ability.effect_value2_disp
    var effect_value3 = passive_ability.effect_value3_disp

    var effect_value1_1 = passive_ability.effect_value1_1_disp
    var effect_value2_1 = passive_ability.effect_value2_1_disp
    var effect_value3_1 = passive_ability.effect_value3_1_disp

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

    if( passive_ability.require_ != undefined && passive_ability.require_disp == true &&
        passive_ability.passive_cond_type == 2 && passive_ability.effect_ != undefined
        ){
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

    if( passive_ability.require__1 != undefined && passive_ability.require__1disp == true &&
        passive_ability.passive_cond_type == 2 && passive_ability.effect__1 != undefined
        ){
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

    if(passive_ability.effect_ != undefined  && passive_ability.effect_disp == true){
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
            CastNames,
            undefined,
            use_ailment
        )
    }

    if(passive_ability.effect__1 != undefined  && passive_ability.effect__1disp == true){
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
            CastNames,
            undefined,
            use_ailment
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

    if(require_ == "" && require__1 == "" && effect_ == "" && effect__1 == "" && (passive_ability.field == undefined || passive_ability.hide_field == true)){
        return ("")
    }else {
    return(
        <div className="" onClick={showmeraw}>
            {hide_disp == true || passive_ability.loc_tag == merged ? "":
            add_formatting(`From <${passive_ability.loc_tag}>`,"tl")
            }
            {passive_ability.passive_cond_type == 1 ?
            <div className="">
                {add_formatting(`${require__1 == "" && require_ == "" ? "" : "\xa0┬ "}${require_}${require__1 != "" && require_ != "" ? " & " : ""}${require__1 != "" ? `${require__1}` : ""}`,"tl")}{require__1 != "" || require_ != "" ? <br/> : ""}
                {effect_display_pars(effect_,effect__1,require_,require__1,1)}
                {effect_ == "Field Effect" && passive_ability.hide_field != true?
                        passive_ability.field && passive_ability.field.map(buffs => (
                            <Ailment_Field_Attached_State 
                            key={buffs.data_id}
                            castlocation={true}
                            ver={ver}
                            ailment_field={buffs}
                            ailment_group={ailment_group}
                            command_group={command_group}
                            AilmentNames={AilmentNames}
                            CastNames={CastNames}
                            CommandNames={CommandNames}
                            CondData={CondData}
                            Ailment_Effects={Ailment_Effects}
                            MessageData_FFSeries={MessageData_FFSeries}
                            MessageData_Category={MessageData_Category}
                            loc={"passive"}
                            slider={false}
                            formatting={formatting}
                            char_id={undefined}
                            hide_type={true}
                            hide_disp={hide_disp != true ? false : buffs.field_hide}
                            is_passive={true}
                            />
                        ))
                        :""
                }
                {effect_display_pars(effect_,effect__1,require_,require__1,2)}
                {effect__1 == "Field Effect" && passive_ability.hide_field != true?
                        passive_ability.field && passive_ability.field.map(buffs => (
                            <Ailment_Field_Attached_State 
                            key={buffs.data_id}
                            castlocation={true}
                            ver={ver}
                            ailment_field={buffs}
                            ailment_group={ailment_group}
                            command_group={command_group}
                            AilmentNames={AilmentNames}
                            CastNames={CastNames}
                            CommandNames={CommandNames}
                            CondData={CondData}
                            Ailment_Effects={Ailment_Effects}
                            MessageData_FFSeries={MessageData_FFSeries}
                            MessageData_Category={MessageData_Category}
                            loc={"passive"}
                            slider={false}
                            formatting={formatting}
                            char_id={undefined}
                            hide_type={true}
                            hide_disp={hide_disp != true ? false : buffs.field_hide}
                            is_passive={true}
                            />
                        ))
                        :""
                }
                {effect__1 != "Field Effect" && effect_ != "Field Effect" && passive_ability.hide_field != true && passive_ability.field != undefined ?
                passive_ability.field && passive_ability.field.map(buffs => (
                    <Ailment_Field_Attached_State 
                    key={buffs.data_id}
                    castlocation={true}
                    ver={ver}
                    ailment_field={buffs}
                    ailment_group={ailment_group}
                    command_group={command_group}
                    AilmentNames={AilmentNames}
                    CastNames={CastNames}
                    CommandNames={CommandNames}
                    CondData={CondData}
                    Ailment_Effects={Ailment_Effects}
                    MessageData_FFSeries={MessageData_FFSeries}
                    MessageData_Category={MessageData_Category}
                    loc={"passive"}
                    slider={false}
                    formatting={formatting}
                    char_id={undefined}
                    hide_type={true}
                    hide_disp={hide_disp != true ? false : buffs.field_hide}
                    />
                ))
                :""}
            </div>

            :""}
            {passive_ability.passive_cond_type == 3 ?
            <div>
                {add_formatting(`${require_ != "" ? `\xa0┬ ${require_}` : ""}${require__1 != "" && require_ != "" ? " or " : ""}${require__1 != "" ? `${require__1}` : ""}`,"tl")}{require__1 != "" || require_ != "" ? <br/> : ""}
                {effect_display_pars(effect_,effect__1,require_,require__1,1)}
                {effect_ == "Field Effect" && passive_ability.hide_field != true ?
                        passive_ability.field && passive_ability.field.map(buffs => (
                            <Ailment_Field_Attached_State 
                            key={buffs.data_id}
                            castlocation={true}
                            ver={ver}
                            ailment_field={buffs}
                            ailment_group={ailment_group}
                            command_group={command_group}
                            AilmentNames={AilmentNames}
                            CastNames={CastNames}
                            CommandNames={CommandNames}
                            CondData={CondData}
                            Ailment_Effects={Ailment_Effects}
                            MessageData_FFSeries={MessageData_FFSeries}
                            MessageData_Category={MessageData_Category}
                            loc={"passive"}
                            slider={false}
                            formatting={formatting}
                            char_id={undefined}
                            hide_type={true}
                            hide_disp={hide_disp != true ? false : buffs.field_hide}
                            is_passive={true}
                            />
                        ))
                        :""
                }
                {effect_display_pars(effect_,effect__1,require_,require__1,2)}
                {effect__1 == "Field Effect" && passive_ability.hide_field != true ?
                        passive_ability.field && passive_ability.field.map(buffs => (
                            <Ailment_Field_Attached_State 
                            key={buffs.data_id}
                            castlocation={true}
                            ver={ver}
                            ailment_field={buffs}
                            ailment_group={ailment_group}
                            command_group={command_group}
                            AilmentNames={AilmentNames}
                            CastNames={CastNames}
                            CommandNames={CommandNames}
                            CondData={CondData}
                            Ailment_Effects={Ailment_Effects}
                            MessageData_FFSeries={MessageData_FFSeries}
                            MessageData_Category={MessageData_Category}
                            loc={"passive"}
                            slider={false}
                            formatting={formatting}
                            char_id={undefined}
                            hide_type={true}
                            hide_disp={hide_disp != true ? false : buffs.field_hide}
                            is_passive={true}
                            />
                        ))
                        :""
                }
                {effect__1 != "Field Effect" && effect_ != "Field Effect" && passive_ability.hide_field != true && passive_ability.field != undefined ?
                passive_ability.field && passive_ability.field.map(buffs => (
                    <Ailment_Field_Attached_State 
                    key={buffs.data_id}
                    castlocation={true}
                    ver={ver}
                    ailment_field={buffs}
                    ailment_group={ailment_group}
                    command_group={command_group}
                    AilmentNames={AilmentNames}
                    CastNames={CastNames}
                    CommandNames={CommandNames}
                    CondData={CondData}
                    Ailment_Effects={Ailment_Effects}
                    MessageData_FFSeries={MessageData_FFSeries}
                    MessageData_Category={MessageData_Category}
                    loc={"passive"}
                    slider={false}
                    formatting={formatting}
                    char_id={undefined}
                    hide_type={true}
                    hide_disp={hide_disp != true ? false : buffs.field_hide}
                    />
                ))
                :""}
            </div>
            :""}
            {passive_ability.passive_cond_type == 2 ?
            <div>
                <div>
                {require_ != "" ? add_formatting(`\xa0┬ ${require_}`,"tl") : ""}{require_ != "" ? <br/> : ""}
                {effect_display_pars(effect_,effect__1,require_,require__1,1)}
                {effect_ == "Field Effect" && passive_ability.hide_field != true ?
                        passive_ability.field && passive_ability.field.map(buffs => (
                            <Ailment_Field_Attached_State 
                            key={buffs.data_id}
                            castlocation={true}
                            ver={ver}
                            ailment_field={buffs}
                            ailment_group={ailment_group}
                            command_group={command_group}
                            AilmentNames={AilmentNames}
                            CastNames={CastNames}
                            CommandNames={CommandNames}
                            CondData={CondData}
                            Ailment_Effects={Ailment_Effects}
                            MessageData_FFSeries={MessageData_FFSeries}
                            MessageData_Category={MessageData_Category}
                            loc={"passive"}
                            slider={false}
                            formatting={formatting}
                            char_id={undefined}
                            hide_type={true}
                            hide_disp={hide_disp != true ? false : buffs.field_hide}
                            is_passive={true}
                            />
                        ))
                        :""
                }
                </div>
                <div>
                {require__1 != "" ? add_formatting(`\xa0┬ ${require__1}`,"tl") : ""}{require__1 != "" ? <br/> : ""}
                {effect_display_pars(effect_,effect__1,require_,require__1,2)}
                {effect__1 == "Field Effect" && passive_ability.hide_field != true ?
                        passive_ability.field && passive_ability.field.map(buffs => (
                            <Ailment_Field_Attached_State 
                            key={buffs.data_id}
                            castlocation={true}
                            ver={ver}
                            ailment_field={buffs}
                            ailment_group={ailment_group}
                            command_group={command_group}
                            AilmentNames={AilmentNames}
                            CastNames={CastNames}
                            CommandNames={CommandNames}
                            CondData={CondData}
                            Ailment_Effects={Ailment_Effects}
                            MessageData_FFSeries={MessageData_FFSeries}
                            MessageData_Category={MessageData_Category}
                            loc={"passive"}
                            slider={false}
                            formatting={formatting}
                            char_id={undefined}
                            hide_type={true}
                            hide_disp={hide_disp != true ? false : buffs.field_hide}
                            is_passive={true}
                            />
                        ))
                        :""
                }
                </div>
                {effect__1 != "Field Effect" && effect_ != "Field Effect" && passive_ability.hide_field != true && passive_ability.field != undefined ?
                passive_ability.field && passive_ability.field.map(buffs => (
                    <Ailment_Field_Attached_State 
                    key={buffs.data_id}
                    castlocation={true}
                    ver={ver}
                    ailment_field={buffs}
                    ailment_group={ailment_group}
                    command_group={command_group}
                    AilmentNames={AilmentNames}
                    CastNames={CastNames}
                    CommandNames={CommandNames}
                    CondData={CondData}
                    Ailment_Effects={Ailment_Effects}
                    MessageData_FFSeries={MessageData_FFSeries}
                    MessageData_Category={MessageData_Category}
                    loc={"passive"}
                    slider={false}
                    formatting={formatting}
                    char_id={undefined}
                    hide_type={true}
                    hide_disp={hide_disp != true ? false : buffs.field_hide}
                    />
                ))
                :""}
            </div>
            :""}
         {showraw == true?
                <div>
                    <ReactJson iconStyle={"square"} quotesOnKeys={false} name={"Raw"} displayDataTypes={false} collapsed={false} theme={"threezerotwofour"} src={passive_ability}/>
                </div>
                    :""}
        </div>  
    )
    }
}

export default Passive_Battle_State