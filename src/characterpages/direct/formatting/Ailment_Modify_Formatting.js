import React, {useState, useEffect} from 'react';
import reactStringReplace from "react-string-replace"
import replacer_titles from '../../../processing/replacer_titles'
import replacer_buff from '../../../processing/replacer_buffcontent'

const Ailment_Modify_Formatting =({
        modify,
        CondData,
        AilmentNames,
        command_group,
        Single,
        Ailment_Effects,
        formatting
})=>{

    const modify_type_data = Ailment_Effects.modify_type
    const modify_require_data = Ailment_Effects.modify_require

    //mod str

    var modify_type_str = "Unknown Output"

    var mod_pull = modify_type_data[modify.modify_type] && modify_type_data[modify.modify_type].modify_type

    var modify_value_str = modify.modify_value

    if(mod_pull != undefined){
        modify_type_str = mod_pull
    } else {
        modify_type_str = `Unknown Modify #${modify.modify_type}`
    }

    var mod_trans = modify_type_data[modify.modify_type] && modify_type_data[modify.modify_type].value_trans

    if(mod_trans == "ailment_id"){
        const ailment_pull = AilmentNames[modify.modify_value] && AilmentNames[modify.modify_value].name
        modify_value_str = `[${ailment_pull}] #${modify.modify_value}`
    }

    modify_type_str = modify_type_str && modify_type_str.replace(/\[value\]/gm,modify_value_str)

    //requ str

    var requ_str = ""

    var requ_pull = modify_require_data[modify.require] && modify_require_data[modify.require].modify_require

    var requ_value_str = modify.require_value_1

    if(requ_pull != undefined && modify.require != 1){
        requ_str = requ_pull
    } else {
        if(modify.require != 1){
            requ_str = `Unknown require #${modify.require}`
        }
    }

    var requ_trans = modify_require_data[modify.require] && modify_require_data[modify.require].value_trans

    if(requ_trans == "command_group"){
        const group_pull = command_group[modify.require_value_1] && command_group[modify.require_value_1].unique
        if(group_pull == undefined){
            requ_value_str = `unknown ailment group #${modify.require_value_1}`
        } else {
            requ_value_str = group_pull
        }
    }

    if(requ_trans == "cond"){
        const cond_pull = CondData[modify.require_value_1] && CondData[modify.require_value_1].trans
        if(cond_pull == undefined){
            requ_value_str = `cond #${modify.require_value_1}`
        } else {
            requ_value_str = cond_pull
        }
    } 

    requ_str = requ_str && requ_str.replace(/\[value_1\]/gm, requ_value_str)

    //requ_1 str

    var requ_1_str = ""

    var requ_1_pull = modify_require_data[modify.require_1] && modify_require_data[modify.require_1].modify_require

    if(requ_1_pull != undefined && modify.require_1 != 1){
        requ_1_str = requ_1_pull
    } else {
        if(modify.require_1 != 1){
            requ_1_str = `Unknown require_1 #${modify.require_1}`
        }
    }

    var requ_1_trans = modify_require_data[modify.require_1] && modify_require_data[modify.require_1].value_trans

    var requ_1_value_str = modify.require_value_1_1

    if(requ_1_trans == "command_group"){
        const group_pull_1 = command_group[modify.require_value_1_1] && command_group[modify.require_value_1_1].unique
        if(group_pull_1 == undefined){
            requ_1_value_str = `unknown ailment group #${modify.require_value_1_1}`
        } else {
            requ_1_value_str = group_pull_1
        }
    }

    if(requ_1_trans == "cond"){
        const cond_pull_1 = CondData[modify.require_value_1_1] && CondData[modify.require_value_1_1].trans
        if(cond_pull_1 == undefined){
            requ_1_value_str = `cond #${modify.require_value_1_1}`
        } else {
            requ_1_value_str = cond_pull_1
        }
    } 

    requ_1_str = requ_1_str && requ_1_str.replace(/\[value_1\]/gm, requ_1_value_str)

    const full_req_str = requ_1_str != "" ? `${requ_str} & ${requ_1_str}` : requ_str

    const addformatting =(text, switching)=>{
        if(formatting != true){
        let replacement = text
        var number = 0
   
        replacement = replacement == undefined ? "" : reactStringReplace(replacement, /(\[.*?\])/, (match, i) => {
            number = number + 1
            return(
                <span key={`1-${i}-${number}`} className="unique">{match}</span>
            )
        })
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


    if(Single == true){
        return(
            <div className="buffunit">
                <div className="infoholder">
                    <div className="Dbanner infonameholderenemybuff" >
                        <div className="combotext">
                            {addformatting(`${modify && modify.name && modify.name} #${modify.id}`,"tl")}
                            </div>
                        <div className="abilityJPname">
                            {modify && modify.jpname != undefined ?
                            modify.jpname :
                            "unknown"}
                        </div>
                    </div>
                    <div className="introflex Dbase">
                    {addformatting(`\xa0┬ ${full_req_str}`,"tl")}
                    {modify_type_str != "" ?
                    <br/>
                    :""}
                    {modify_type_str != "" ?  addformatting(`\xa0└─ ${modify_type_str}`,"tl"):""}
                    </div>
                </div>
            </div>
        )
    } else {
        return(
            <div>
                {addformatting(`\xa0┬ ${full_req_str}`,"tl")}
                    {modify_type_str != "" ?
                    <br/>
                    :""}
                {modify_type_str != "" ?  addformatting(`\xa0└─ ${modify_type_str}`,"bu"):""}
            </div>
        )
    }
}
export default Ailment_Modify_Formatting