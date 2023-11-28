import React from 'react';
import ReplacerCharacter from '../ReplacerCharacter'
import Format_cleaner from '../../processing/format_cleaner'

export default function HitDataParsFormatting({
    cast_list,
    hit_data,
    formatting,
    abilitytext
}){

    const form = {formatting:formatting}

    var eff_str_display = hit_data && hit_data.eff_str

    if (hit_data == undefined && cast_list == undefined) {
        return (
            ""
        )
    }

    if (hit_data != undefined && hit_data.show == false && cast_list == undefined) {
        return (
            ""
        )
    }

    if (hit_data == undefined && cast_list != undefined) {
        return (
            cast_list.map(self => (
                self.cond != undefined ? ReplacerCharacter(`┬ ${self.cond}\n└─ ${self.cast_str}\n`,form) : ReplacerCharacter(`${self.cast_str}\n`,form)
            ))
        )
    }

    if ((hit_data.show == true || hit_data.show == undefined) && eff_str_display && eff_str_display.includes("text line")) {
        const rain_check = eff_str_display.includes("Limit")
        if (eff_str_display.includes("text line 1") && abilitytext != undefined) {
            const getfirst = abilitytext.split(/\\n/gm)
            if (getfirst.length != 0) {
                eff_str_display = eff_str_display.replace(/text line 1/, `banner ${rain_check == true ? "--" : "["}"${Format_cleaner(getfirst[0])}"${rain_check == true ? "--" : "]"}`)
            }
        }
        if (eff_str_display.includes("text line 2") && abilitytext != undefined) {
            const getsecond = abilitytext.split(/\\n/gm)
            if (getsecond.length != 0) {
                eff_str_display = eff_str_display.replace(/text line 2/, `banner ${rain_check == true ? "--" : "["}"${Format_cleaner(getsecond[1])}"${rain_check == true ? "--" : "]"}`)
            }
        }
        if (eff_str_display.includes("text line 3") && abilitytext != undefined) {
            const getthird = abilitytext.split(/\\n/gm)
            if (getthird.length != 0) {
                eff_str_display = eff_str_display.replace(/text line 3/, `banner ${rain_check == true ? "--" : "["}"${Format_cleaner(getthird[2])}"${rain_check == true ? "--" : "]"}`)
            }
        }
        if (eff_str_display.includes("text line 4") && abilitytext != undefined) {
            const getforth = abilitytext.split(/\\n/gm)
            if (getforth.length != 0) {
                eff_str_display = eff_str_display.replace(/text line 4/, `banner ${rain_check == true ? "--" : "["}"${Format_cleaner(getforth[3])}"${rain_check == true ? "--" : "]"}`)
            }
        }
    }

    if(hit_data.after_each_except_last != undefined){
        if(hit_data.eff_str == hit_data.after_each_except_last){
            hit_data.after_each_except_last_end_str = ` after each HP Attack`
            hit_data.eff_str = undefined
        } else
        if(hit_data.pot_hp_str == hit_data.after_each_except_last){
            hit_data.after_each_except_last_end_str = ` after each HP Attack`
            hit_data.pot_hp_str = undefined
        } else
        if(hit_data.eff_hp_str == hit_data.after_each_except_last){
            hit_data.after_each_except_last_end_str = ` after each HP Attack`
            hit_data.eff_hp_str = undefined
        } else
        if(hit_data.eff_add_str == hit_data.after_each_except_last){
            hit_data.after_each_except_last_end_str = ` after each HP Attack`
            hit_data.eff_add_str = undefined
        } else
        if(hit_data.eff_add_str_2 == hit_data.after_each_except_last){
            hit_data.after_each_except_last_end_str = ` after each HP Attack`
            hit_data.eff_add_str_2 = undefined
        } else
        if(hit_data.eff_det_str == hit_data.after_each_except_last){
            hit_data.after_each_except_last_end_str = ` after each HP Attack`
            hit_data.eff_det_str = undefined
        } else
        if(hit_data.eff_det_str_2 == hit_data.after_each_except_last){
            hit_data.after_each_except_last_end_str = ` after each HP Attack`
            hit_data.eff_det_str_2 = undefined
        }
    }

    if (hit_data.show == true || hit_data.show == undefined) {
        return (
            <>
                {cast_list && cast_list.map(self => (
                    self.cond != undefined ? ReplacerCharacter(`┬ ${self.cond}\n└─ ${self.cast_str}\n`,form) : ReplacerCharacter(`${self.cast_str}\n`,form)
                ))}
                {hit_data.atk_str != undefined ? ReplacerCharacter(`${hit_data.hit_count == undefined ? "" : hit_data.hit_count}${hit_data.atk_str.replace(/{Attack}/gm, hit_data.atk_hp_str == undefined ? "Attack" : hit_data.atk_hp_str)}${hit_data.times_count == undefined ? "" : hit_data.times_count}\n`,form) : ""}
                {hit_data.pot_str != undefined ? ReplacerCharacter(hit_data.pot_str+'\n',form): ""}
                {hit_data.st_str != undefined ? ReplacerCharacter(hit_data.st_str+"\n",form) : ""}
                {eff_str_display != undefined ? ReplacerCharacter(`${eff_str_display}${hit_data.repeat_count == undefined ? "" : hit_data.repeat_count}\n`,form) : ""}
                {hit_data.ove_str != undefined ? ReplacerCharacter(hit_data.ove_str+"\n",form): ""}
                {hit_data.eff_before_hp_str != undefined ? ReplacerCharacter(`${hit_data.eff_before_hp_str} before ${hit_data.times_count == undefined ? "" : `last `}HP Attack\n`,form): ""}
                {hit_data.eff_hp_str != undefined ? ReplacerCharacter(`${hit_data.eff_hp_str}${hit_data.times_count == undefined ? "" : `, on each HP Attack`}\n`,form) : ""}
                {hit_data.pot_hp_str != undefined ? ReplacerCharacter(`${hit_data.pot_hp_str}${hit_data.times_count == undefined ? "" : `, on each HP Attack`}\n`,form) : ""}
                {hit_data.after_each_except_last != undefined ? ReplacerCharacter(`${hit_data.after_each_except_last}${hit_data.after_each_except_last_end_str}\n${hit_data.after_each_except_last_ovr!=undefined?hit_data.after_each_except_last_ovr+"\n":""}`,form) : ""}
                {hit_data.eff_add_str != undefined ? ReplacerCharacter(`${hit_data.eff_add_str}${hit_data.times_count == undefined ? "" : ` after each HP Attack${hit_data.except_last == true ? ", except last" : ""}`}\n`,form) : ""}
                {hit_data.eff_add_str_2 != undefined ? ReplacerCharacter(`${hit_data.eff_add_str_2}${hit_data.times_count == undefined ? "" : ` after each HP Attack${hit_data.except_last_2 == true ? ", except last" : ""}`}\n`,form) : ""}
                {hit_data.eff_det_str != undefined ? ReplacerCharacter(hit_data.eff_det_str+"\n",form) : ""}
                {hit_data.eff_det_str_2 != undefined ? ReplacerCharacter(hit_data.eff_det_str_2+"\n",form) : ""}
                {hit_data.mcap_str != undefined ? ReplacerCharacter(hit_data.mcap_str+"\n",form) : ""}
                {hit_data.brvcap_str != undefined ? ReplacerCharacter(hit_data.brvcap_str+"\n",form) : ""}
            </>
        )
    }
}