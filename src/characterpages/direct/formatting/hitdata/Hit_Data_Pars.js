import React, {useState, useEffect} from 'react';
import reactStringReplace from "react-string-replace"
import replacer_titles from '../../../../processing/replacer_titles'
import replacer_buff from '../../../../processing/replacer_buffcontent'
import Format_cleaner from '../../../../processing/Format_Cleaner'

const Hit_Data_Pars =({
    hit_data,
    formatting,
    abilitytext
})=>{

    const addformatting =(text,switching)=>{
        if(formatting != true){
        let replacement = text
        var number = 0

        replacement = replacement == undefined ? "" : reactStringReplace(replacement, /(\[.*?\])/, (match, i) => {
            number = number + 1
            return(
                <span key={`1-${i}-${number}`} className="unique">{match}</span>
            )})
        replacement = replacement == undefined ? "" : reactStringReplace(replacement, /--(.*?)--/, (match, i) => {
            number = number + 1
            return(
                <span key={`6-${i}-${number}`} className="limit">{`[${match}]`}</span>
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

    var eff_str_display = hit_data.eff_str

    if(hit_data == undefined){
        return(
            ""
        )
    }
    if(hit_data.show == false){
        return(
            ""
        )
    }

    if((hit_data.show == true || hit_data.show == undefined) && eff_str_display && eff_str_display.includes("text line")){
        const rain_check = eff_str_display.includes("Limit")
        if(eff_str_display.includes("text line 1") && abilitytext != undefined){
            const getfirst = abilitytext.split(/\n/gm)
            if(getfirst.length != 0){
                eff_str_display = eff_str_display.replace(/text line 1/,`banner ${rain_check == true?"--":"["}"${Format_cleaner(getfirst[0])}"${rain_check == true?"--":"]"}`)
            }
        }
        if(eff_str_display.includes("text line 2") && abilitytext != undefined){
            const getsecond = abilitytext.split(/\n/gm)
            if(getsecond.length != 0){
                eff_str_display = eff_str_display.replace(/text line 2/,`banner ${rain_check == true?"--":"["}"${Format_cleaner(getsecond[1])}"${rain_check == true?"--":"]"}`)
            }
        }
        if(eff_str_display.includes("text line 3") && abilitytext != undefined){
            const getthird = abilitytext.split(/\n/gm)
            if(getthird.length != 0){
                eff_str_display = eff_str_display.replace(/text line 3/,`banner ${rain_check == true?"--":"["}"${Format_cleaner(getthird[2])}"${rain_check == true?"--":"]"}`)
            }
        }
        if(eff_str_display.includes("text line 4") && abilitytext != undefined){
            const getforth = abilitytext.split(/\n/gm)
            if(getforth.length != 0){
                eff_str_display = eff_str_display.replace(/text line 4/,`banner ${rain_check == true?"--":"["}"${Format_cleaner(getforth[3])}"${rain_check == true?"--":"]"}`)
            }
        }
    }
    
    if(hit_data.show == true || hit_data.show == undefined){
        return(
            <div>
                {hit_data.atk_str != undefined ?
                <div>
                    {addformatting(`${hit_data.hit_count == undefined ? "" : hit_data.hit_count}${hit_data.atk_str.replace(/{Attack}/gm, hit_data.atk_hp_str == undefined ? "Attack" : hit_data.atk_hp_str)}${hit_data.times_count == undefined ? "" : hit_data.times_count}`,"tl")}
                </div>
                :""}
                {hit_data.pot_str != undefined ?
                <div>
                    {addformatting(hit_data.pot_str,"tl")}
                </div>
                :""}
                {hit_data.st_str != undefined ?
                <div>
                    {addformatting(hit_data.st_str,"tl")}
                </div>
                :""}
                {eff_str_display != undefined ?
                <div>
                    {addformatting(`${eff_str_display}${hit_data.repeat_count==undefined?"":hit_data.repeat_count}`,"tl")}
                </div>
                :""}
                {hit_data.ove_str != undefined ?
                <div>
                    {addformatting(hit_data.ove_str,"tl")}
                </div>
                :""}
                {hit_data.eff_before_hp_str != undefined ?
                <div>
                    {addformatting(`${hit_data.eff_before_hp_str} before ${hit_data.times_count == undefined ? "": `last `}HP Attack`,"tl")}
                </div>
                :""}
                {hit_data.eff_hp_str != undefined ?
                <div>
                    {addformatting(`${hit_data.eff_hp_str}${hit_data.times_count == undefined ? "": `, on each HP Attack`}`,"tl")}
                </div>
                :""}
                {hit_data.pot_hp_str != undefined ?
                <div>
                    {addformatting(`${hit_data.pot_hp_str}${hit_data.times_count == undefined ? "": `, on each HP Attack`}`,"tl")}
                </div>
                :""}
                {hit_data.eff_add_str != undefined ?
                <div>
                    {addformatting(`${hit_data.eff_add_str}${hit_data.times_count == undefined ? "": ` after each HP Attack${hit_data.except_last == true ? ", except last" : ""}`}`,"tl")}
                </div>
                :""}
                {hit_data.eff_add_str_2 != undefined ?
                <div>
                    {addformatting(`${hit_data.eff_add_str_2}${hit_data.times_count == undefined ? "": ` after each HP Attack${hit_data.except_last_2 == true ? ", except last" : ""}`}`,"tl")}
                </div>
                :""}
                {hit_data.eff_det_str != undefined ?
                <div>
                    {addformatting(hit_data.eff_det_str,"tl")}
                </div>
                :""}
                {hit_data.eff_det_str_2 != undefined ?
                <div>
                    {addformatting(hit_data.eff_det_str_2,"tl")}
                </div>
                :""}
                {hit_data.mcap_str != undefined ?
                <div>
                    {addformatting(hit_data.mcap_str,"tl")}
                </div>
                :""}
                {hit_data.brvcap_str != undefined?
                <div>
                    {addformatting(hit_data.brvcap_str,"tl")}
                </div>
                :""}
            </div>
        )
    }
}
export default Hit_Data_Pars