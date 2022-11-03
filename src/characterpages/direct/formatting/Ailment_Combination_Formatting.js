import React, {useState, useEffect} from "react";
import reactStringReplace from "react-string-replace"
import replacer_titles from '../../../processing/replacer_titles'
import replacer_buff from '../../../processing/replacer_buffcontent'

const Ailment_Combination_Formatting = ({
    components,
    AilmentNames,
    Single,
    formatting,
    base_id
}) =>{

    const addformatting =(text,switching)=>{
        if(formatting != true){
        let replacement = text
        var number = 0
        replacement = replacement == undefined ? "" : reactStringReplace(replacement, /(\[.*?\])/, (match, i) => {
            number = number + 1
            return(
            <span key={`1-${i}-${number}`} className="unique">{match}</span>
            )})
        
        replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\d+%)/, (match, i) => {
            number = number + 1
            return(
        <span key={`2-${i}-${number}`} className="values">{match}</span>
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

    var master_ailment = AilmentNames[components.ailment_id] && AilmentNames[components.ailment_id].name

    if(master_ailment == undefined){
        master_ailment = components.ailment_id
    }
        var component_id = components.component_id == -1 ? "" : AilmentNames[components.component_id] && AilmentNames[components.component_id].name
        var component_id_1 = components.component_id_1 == -1 ? "" : AilmentNames[components.component_id_1] && AilmentNames[components.component_id_1].name
        var component_id_2 = components.component_id_2 == -1 ? "" : AilmentNames[components.component_id_2] && AilmentNames[components.component_id_2].name
        var component_id_3 = components.component_id_3 == -1 ? "" : AilmentNames[components.component_id_3] && AilmentNames[components.component_id_3].name
        var component_id_4 = components.component_id_4 == -1 ? "" : AilmentNames[components.component_id_4] && AilmentNames[components.component_id_4].name

        var component_id_str = component_id == "" ? "" :` [${component_id}] #${components.component_id}`
        var component_id_1_str = component_id_1 == "" ? "" : ` [${component_id_1}] #${components.component_id_1}`
        var component_id_2_str = component_id_2 == "" ? "" : ` [${component_id_2}] #${components.component_id_2}`
        var component_id_3_str = component_id_3 == "" ? "" : ` [${component_id_3}] #${components.component_id_3}`
        var component_id_4_str = component_id_4 == "" ? "" : ` [${component_id_4}] #${components.component_id_4}`
        const passives = []

        if(components.component_id != components.ailment_id && component_id_str != "" && base_id != components.component_id){
            passives.push(component_id_str)
        }
        if(component_id_1_str != "" && base_id != components.component_id_1){
            passives.push(component_id_1_str)
        }
        if(component_id_2_str != "" && base_id != components.component_id_2){
            passives.push(component_id_2_str)
        }
        if(component_id_3_str != "" && base_id != components.component_id_3){
            passives.push(component_id_3_str)
        }
        if(component_id_4_str != "" && base_id != components.component_id_4){
            passives.push(component_id_4_str)
        }
        var fullstr = `${passives.map(self=>self)}`
        var display_str = ""
        if(base_id == components.ailment_id){  
            display_str = `*Displayed while${fullstr} ${passives.length > 1 ? "are": "is"} active`
        } else {
            display_str = `*Displays [${master_ailment}] #${components.ailment_id} ${passives.length != 0 ? "while": ""}${fullstr} ${passives.length != 1 ? passives.length == 0 ? "when" :"are": "is"} active`
        }
    
    if(Single == true){
        return(
            <div className="buffunit">
                <div className="infoholder">
                    <div className="bluebanner infonameholderenemybuff" >
                        <div className="combotext " >{`${master_ailment} #${components.ailment_id}`}</div>
                        <div className="abilityJPname">
                            {AilmentNames[components.component_id] && AilmentNames[components.component_id].jpname != undefined ?
                           addformatting(AilmentNames[components.component_id].jpname,"tl") :
                            "Unknown"}
                        </div>
                    </div>
                    <div className="introflex bluebase">
                        {component_id!=""?
                        <div>
                            {display_str!=""?
                            addformatting(display_str,"tl")
                            :""}
                        </div>
                        :""}
                    </div>
                </div>
            </div>
        )
    } else {
    return(
        <div>
            {display_str!=""?
            addformatting(display_str,"tl")
            :""}
        </div>
    )}
}
export default Ailment_Combination_Formatting