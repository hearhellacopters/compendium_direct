import React, {useState, useEffect} from 'react';
import replacer from '../../processing/replacer_abilitycontent'

const Hit_Data_Pars =({
    hit_data,
})=>{

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
    if(hit_data.show == true || hit_data.show == undefined){
        return(
            <div>
                {hit_data.atk_str != undefined ?
                <div>
                    {replacer(`${hit_data.hit_count == undefined ? "" : hit_data.hit_count}${hit_data.atk_str.replace(/{Attack}/gm, hit_data.atk_hp_str == undefined ? "Attack" : hit_data.atk_hp_str)}${hit_data.times_count == undefined ? "" : hit_data.times_count}`)}
                </div>
                :""}
                {hit_data.pot_str != undefined ?
                <div>
                    {replacer(hit_data.pot_str)}
                </div>
                :""}
                {hit_data.st_str != undefined ?
                <div>
                    {replacer(hit_data.st_str)}
                </div>
                :""}
                {hit_data.eff_str != undefined ?
                <div>
                    {replacer(`${hit_data.eff_str}${hit_data.repeat_count==undefined?"":hit_data.repeat_count}`)}
                </div>
                :""}
                {hit_data.ove_str != undefined ?
                <div>
                    {replacer(hit_data.ove_str)}
                </div>
                :""}
                {hit_data.eff_before_hp_str != undefined ?
                <div>
                    {replacer(`${hit_data.eff_before_hp_str} before ${hit_data.times_count == undefined ? "": `last `}HP Attack`,"tl")}
                </div>
                :""}
                {hit_data.eff_hp_str != undefined ?
                <div>
                    {replacer(`${hit_data.eff_hp_str}${hit_data.times_count == undefined ? "": `, on each HP Attack`}`)}
                </div>
                :""}
                {hit_data.pot_hp_str != undefined ?
                <div>
                    {replacer(`${hit_data.pot_hp_str}${hit_data.times_count == undefined ? "": `, on each HP Attack`}`)}
                </div>
                :""}
                {hit_data.eff_add_str != undefined ?
                <div>
                    {replacer(`${hit_data.eff_add_str}${hit_data.times_count == undefined ? "": ` after each HP Attack${hit_data.except_last == true ? ", except last" : ""}`}`)}
                </div>
                :""}
                {hit_data.eff_add_str_2 != undefined ?
                <div>
                    {replacer(`${hit_data.eff_add_str_2}${hit_data.times_count == undefined ? "": ` after each HP Attack${hit_data.except_last_2 == true ? ", except last" : ""}`}`)}
                </div>
                :""}
                {hit_data.eff_det_str != undefined ?
                <div>
                    {replacer(hit_data.eff_det_str)}
                </div>
                :""}
                {hit_data.eff_det_str_2 != undefined ?
                <div>
                    {replacer(hit_data.eff_det_str_2)}
                </div>
                :""}
                {hit_data.mcap_str != undefined ?
                <div>
                    {replacer(hit_data.mcap_str)}
                </div>
                :""}
                {hit_data.brvcap_str != undefined?
                <div>
                    {replacer(hit_data.brvcap_str)}
                </div>
                :""}
            </div>
        )
    }
}
export default Hit_Data_Pars