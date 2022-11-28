import React from "react"
import { useStateIfMounted } from "use-state-if-mounted";
import reactStringReplace from "react-string-replace"
import replacer_titles from '../../../processing/replacer_titles'
import replacer_buff from '../../../processing/replacer_buffcontent'
import Capped from "../../../processing/capped";
import ReactJson from '@microlink/react-json-view'

const Default_Ailment_Pars =({
    default_data,

    formatting,
    gear,
    span,
    list,
    passed_ailment,
    master_index,
    ver
})=>{

    const default_cond = master_index.ailment_effect_id_index.default_cond
    const passivenames = master_index.passivenames
    const equipmentpassivenames = master_index.equipmentpassivenames
    const CommandNames = master_index.commands
    const cast_targets = master_index.cast_names

    const [showraw,setshowraw] = useStateIfMounted(false)

    const showmeraw = (e)=>{
        if(e.shiftKey){
            if(showraw == false){
            setshowraw(true)
            } else{
                setshowraw(false)
            }
        }
    }

    const EX_rename =(data)=>{
        let replacement = data
        replacement = data == undefined ? "" : data.replace(/EX/,"EXrank")
        return replacement
    }

    var cond_str = ""

    if(default_data.is_cast_only_wave_start_ == 1){
        cond_str = "At start of wave:"
    }
    if(default_data.is_cast_only_start_ == 1){
        cond_str = "At start of quest:"
    }
    if(default_data.is_cast_only_start_ == 1 && default_data.is_cast_only_wave_start_ == 1){
        cond_str = "At start of quest & at start of wave:"
    }

    var cond_id_str = ""

    var cond_id_1_str = ""

    var arg1 = default_data.cond_arg1

    var arg2 = default_data.cond_arg2

    var tag = ""

    var rank = ""

    var arg1_1 = default_data.cond_arg1_1

    var arg2_1 = default_data.cond_arg2_2

    var tag_1 = ""

    var rank_1 = ""

    //cond_id

    const cond_id = default_cond[default_data.cond_id] && default_cond[default_data.cond_id].default_cond

    const cond_id_value_trans = default_cond[default_data.cond_id] && default_cond[default_data.cond_id].value_trans

    if(cond_id != undefined){
        if(default_data.cond_id != 1){
            cond_id_str = cond_id

            if(cond_id_value_trans == "passivenames"){
                const pass_pull = passivenames[default_data.cond_arg1] && passivenames[default_data.cond_arg1].name
                if(pass_pull != undefined){
                    arg1 = `[${pass_pull}] #${default_data.cond_arg1} `
                } else {
                    arg1 = `[#${default_data.cond_arg1}] #${default_data.cond_arg1} `
                }
                const tag_pull = passivenames[default_data.cond_arg1] && passivenames[default_data.cond_arg1].loc_tag
                if(tag_pull != undefined){
                    tag = `<${tag_pull}>`
                } else {
                    tag = `unknown tag`
                }
            }

            if(cond_id_value_trans == "equipmentpassivenames"){
                const equpass_pull = equipmentpassivenames[default_data.cond_arg1] && equipmentpassivenames[default_data.cond_arg1].name
                if(equpass_pull != undefined){
                    arg1 = `[${equpass_pull}] #${default_data.cond_arg1} `
                } else {
                    arg1 = `[#${default_data.cond_arg1}] #${default_data.cond_arg1} `
                }
                const eqtag_pull = equipmentpassivenames[default_data.cond_arg1] && equipmentpassivenames[default_data.cond_arg1].loc_tag
                if(eqtag_pull != undefined){
                    tag = `<${eqtag_pull}>`
                } else {
                    tag = `unknown tag`
                }
            }

            if(cond_id_value_trans == "CommandNames"){
                const comd_pull = CommandNames[default_data.cond_arg1] && CommandNames[default_data.cond_arg1].name
                if(comd_pull != undefined){
                    arg1 = `[${comd_pull}] #${default_data.cond_arg1}`
                } else {
                    arg1 = `[#${default_data.cond_arg1}] #${default_data.cond_arg1}`
                }
                const rank_pull = CommandNames[default_data.cond_arg1] && CommandNames[default_data.cond_arg1].rank
                if(rank_pull != undefined){
                    tag = `<${EX_rename(rank_pull)}>`
                } else {
                    tag = `unknown tag`
                }
            }

            if(default_data.cond_arg2 != 0){
                arg2 = `w/ Priority: ${default_data.cond_arg2}`
            } else {
                arg2 = ""
            }

            cond_id_str = cond_id_str.replace(/\[arg1\]/gm,arg1)
            .replace(/\[arg2\]/gm,arg2)
            .replace(/\[tag\]/gm, tag)
            .replace(/\[rank\]/gm,rank)
        }
    }

    //cond_id_1

    const cond_id_1 = default_cond[default_data.cond_id_1] && default_cond[default_data.cond_id_1].default_cond

    const cond_id_1_value_trans = default_cond[default_data.cond_id_1] && default_cond[default_data.cond_id_1].value_trans

    if(cond_id != undefined){
        if(default_data.cond_id_1 != 1){
            cond_id_1_str = cond_id_1

            if(cond_id_1_value_trans == "passivenames"){
                const pass_pull_1 = passivenames[default_data.cond_arg1_1] && passivenames[default_data.cond_arg1_1].name
                if(pass_pull_1 != undefined){
                    arg1_1 = `[${pass_pull_1}] #${default_data.cond_arg1_1}`
                } else {
                    arg1_1 = `[#${default_data.cond_arg1_1}] #${default_data.cond_arg1_1}`
                }
                const tag_pull_1 = passivenames[default_data.cond_arg1_1] && passivenames[default_data.cond_arg1_1].loc_tag
                if(tag_pull_1 != undefined){
                    tag_1 = `<${tag_pull_1}>`
                } else {
                    tag_1 = `unknown tag`
                }
            }

            if(cond_id_1_value_trans == "equipmentpassivenames"){
                const equpass_pull_1 = equipmentpassivenames[default_data.cond_arg1_1] && equipmentpassivenames[default_data.cond_arg1_1].name
                if(equpass_pull_1 != undefined){
                    arg1_1 = `[${equpass_pull_1}] #${default_data.cond_arg1_1}`
                } else {
                    arg1_1 = `[#${default_data.cond_arg1_1}] #${default_data.cond_arg1_1} `
                }
                const eqtag_pull_1 = equipmentpassivenames[default_data.cond_arg1_1] && equipmentpassivenames[default_data.cond_arg1_1].loc_tag
                if(eqtag_pull_1 != undefined){
                    tag_1 = `<${eqtag_pull_1}>`
                } else {
                    tag_1 = `unknown tag`
                }
            }

            if(cond_id_1_value_trans == "CommandNames"){
                const comd_pull_1 = CommandNames[default_data.cond_arg1_1] && CommandNames[default_data.cond_arg1_1].name
                if(comd_pull_1 != undefined){
                    arg1_1 = `[${comd_pull_1}] #${default_data.cond_arg1_1}`
                } else {
                    arg1_1 = `[#${default_data.cond_arg1_1}] #${default_data.cond_arg1_1}`
                }
                const rank_pull_1 = CommandNames[default_data.cond_arg1_1] && CommandNames[default_data.cond_arg1_1].rank
                if(rank_pull_1 != undefined){
                    tag_1 = `<${rank_pull_1}>`
                } else {
                    tag_1 = `unknown tag`
                }
            }

            if(default_data.cond_arg2_1 != 0){
                arg2_1 = `w/ Priority: ${default_data.cond_arg2_1}`
            } else {
                arg2_1 = ""
            }

            cond_id_1_str = cond_id_1_str.replace(/\[arg1\]/gm,arg1_1)
            .replace(/\[arg2\]/gm,arg2_1)
            .replace(/\[tag\]/gm, tag_1)
            .replace(/\[rank\]/gm,rank_1)
        }
    }

    var is_buff = undefined
    var ailment_name = undefined
    var ailment_id = undefined
    var max_level = undefined

    if(default_data.cast != undefined){
        is_buff = default_data.cast.is_buff
        max_level = default_data.cast.max_level
        ailment_name = default_data.cast.name
        ailment_id = default_data.cast.id
    }

    if(passed_ailment != undefined){
        is_buff = passed_ailment.is_buff
        max_level = passed_ailment.max_level
        ailment_name = passed_ailment.name
        ailment_id = passed_ailment.id
    }

    var cast_str = `${default_data.cast_rate_ < 100 ? `${default_data.cast_rate_}% chance to cast ` : ` - ${is_buff && is_buff == 0 ? "Inflicts" :"Grants"}`}${max_level && max_level != 0 ? ` ${default_data.arg1} level${default_data.arg1 != 1 ?"s":""} of` :""} [${ailment_name && ailment_name == "" ? ailment_id : ailment_name}]${default_data.cast_target_ != 2 ? ` to ${cast_targets[default_data.cast_target_] && cast_targets[default_data.cast_target_].target_id}` : ""}${default_data.turn != -1 ? ` for ${default_data.turn} turn${default_data.turn > 1 ? "s" :""}`: ""}`

    const addformatting =(text,switching)=>{
        if(formatting != true){
        let replacement = text
        var number = 0

        replacement = replacement == undefined ? "" : reactStringReplace(replacement, /(\[.*?\])/, (match, i) => {
            number = number + 1
            return(
                <span key={`1-${i}-${number}`} className="unique">{match}</span>
            )
        })
        replacement = replacement == "" ? "" : reactStringReplace(replacement, /\|(.*?)\|/, (match, i) => {
            number = number + 1
            return(
            <Capped key={`3-${i}-${number}`} text={match}/>
            )})
        replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\d+%)/, (match, i) => {
            number = number + 1
            return(
        <span key={`4-${i}-${number}`} className="values">{match}</span>
        )})
        replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\\n)/, (match, i) => {
            number = number + 1
            return(
                <br key={`10-${i}-${number}`}/>
        )})
        replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\n)/, (match, i) => {
            number = number + 1
            return(
                <br key={`11-${i}-${number}`}/>
        )})
        return(
            replacement
        )
        } else {
            if(switching == "tl"){
                return replacer_titles(text)
            }
            if(switching == "bu"){
                return replacer_buff(text)
            }
        }
    }

    return (
        <div className={`${gear == true || span == true ? "gearinfobanner" : list == true ? "sliderbase infonameholder wpadding" :"defaultlistholder"} defaultcondbase`}>
            {cond_str != ""? 
                <div onClick={showmeraw}> {addformatting(cond_str,"tl")}</div>
            :""}
            {cast_str != ""? 
                <div onClick={showmeraw}>{addformatting(cast_str,"tl")}</div>
            :""}
            {cond_id_str != "" || cond_id_1_str != "" ?
                <div>
                 <br/>
                 {`\xa0┬ Requires:`}</div>
            :""}
            {cond_id_str != "" ?
                <div>{addformatting(`\xa0${cond_id_1_str == "" ? "└─" : "├─"} ` + cond_id_str,"tl")}</div>
            :""}
            {cond_id_1_str != "" ?
                <div>{addformatting(`\xa0└─ ` + cond_id_1_str,"tl")}</div>
            :""}
            {showraw == true?
            <ReactJson iconStyle={"square"} quotesOnKeys={false} name={"Raw"} displayDataTypes={false} collapsed={false} theme={"threezerotwofour"} src={default_data}/>
            :""}
        </div>
    )
}
export default Default_Ailment_Pars