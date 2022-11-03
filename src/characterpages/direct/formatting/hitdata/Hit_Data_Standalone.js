import React, {useState, useEffect} from 'react';
import DefaultTippy from '../../../../formatting/TippyDefaults';
import ReactJson from '@microlink/react-json-view'
import hit_data_handler from '../hit_data_handler';
import reactStringReplace from "react-string-replace"

const Hit_Data_Standalone =({
    hit_data,
    hit_effect_id,
    ability_target_id,
    type_id,
    attack_type_id,
    effect_value_type_id,
    CommandNames,
    AilmentNames,
    ailment_group,
    command_group,
    enemy_resist,
    element_bit_
})=>{

    const [showraw,setshowraw] = useState(false)

    const showmeraw = (current)=>{
        if(current == false){
            setshowraw(true)
        } else{
            setshowraw(false)
        }
    }

    const hit_data_pars = hit_data_handler(
        hit_data,
        hit_effect_id,
        ability_target_id,
        type_id,
        attack_type_id,
        effect_value_type_id,
        CommandNames,
        AilmentNames,
        ailment_group,
        command_group,
        enemy_resist,
        element_bit_,

        undefined,
        undefined,
        undefined,
        1
    )

    const addformatting =(text)=>{
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
    }


    return(
        <div className="buffunit">
            <div className="infoholder">
                <div className="Buffbanner infonameholderenemybuff">
                    <div className="spacearound"  >
                        <div className="infotitle displayfex" >
                            {`#${hit_data.hitdata_id}`}
                        </div>
                    </div>
                </div>
                <div className="Buffbase infobase">
                {hit_data_pars.atk_str != undefined ?
                    <div>
                        {hit_data_pars.atk_str.replace(/{Attack}/gm, "Attack")}
                    </div>
                    :""}
                    {hit_data_pars.eff_str != undefined ?
                    <div>
                        {addformatting(hit_data_pars.eff_str)}
                    </div>
                    :""}
                    {hit_data_pars.pot_str != undefined ?
                    <div>
                        {addformatting(hit_data_pars.pot_str)}
                    </div>
                    :""}
                    {hit_data_pars.st_str != undefined ?
                    <div>
                        {addformatting(hit_data_pars.st_str)}
                    </div>
                    :""}
                    {hit_data_pars.ove_str != undefined ?
                    <div>
                        {addformatting(hit_data_pars.ove_str)}
                    </div>
                    :""}
                    {hit_data_pars.mcap_str != undefined ?
                    <div>
                        {addformatting(hit_data_pars.mcap_str)}
                    </div>
                    :""}
                    {hit_data_pars.brvcap_str != undefined ?
                    <div>
                        {addformatting(hit_data_pars.brvcap_str)}
                    </div>
                    :""}
                </div>
            </div>
        </div>
    )
}
export default Hit_Data_Standalone