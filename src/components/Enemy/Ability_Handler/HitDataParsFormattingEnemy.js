import React from 'react';
import ReplacerCharacter from '../../ReplacerCharacter'

export default function HitDataParsFormattingEnemy({
    cast_list,
    hit_data,
}){

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
                self.cond != undefined ? ReplacerCharacter(`┬ ${self.cond}\n└─ ${self.cast_str}\n`) : ReplacerCharacter(`${self.cast_str}\n`)
            ))
        )
    }
    if (hit_data.show == true || hit_data.show == undefined) {
        return (
            <>
                {cast_list && cast_list.map(self => (
                    self.cond != undefined ? ReplacerCharacter(`┬ ${self.cond}\n└─ ${self.cast_str}\n`) : ReplacerCharacter(`${self.cast_str}\n`)
                ))}
                {hit_data.atk_str != undefined ? ReplacerCharacter(`${hit_data.hit_count == undefined ? "" : hit_data.hit_count}${hit_data.atk_str.replace(/{Attack}/gm, hit_data.atk_hp_str == undefined ? "Attack" : hit_data.atk_hp_str)}${hit_data.times_count == undefined ? "" : hit_data.times_count}\n`) : ""}
                {hit_data.pot_str != undefined ? ReplacerCharacter(hit_data.pot_str+'\n'): ""}
                {hit_data.st_str != undefined ? ReplacerCharacter(hit_data.st_str+"\n") : ""}
                {hit_data.eff_str != undefined ? ReplacerCharacter(`${hit_data.eff_str}${hit_data.repeat_count == undefined ? "" : hit_data.repeat_count}\n`) : ""}
                {hit_data.ove_str != undefined ? ReplacerCharacter(hit_data.ove_str+"\n"): ""}
                {hit_data.eff_before_hp_str != undefined ? ReplacerCharacter(`${hit_data.eff_before_hp_str} before ${hit_data.times_count == undefined ? "" : `last `}HP Attack\n`): ""}
                {hit_data.eff_hp_str != undefined ? ReplacerCharacter(`${hit_data.eff_hp_str}${hit_data.times_count == undefined ? "" : `, on each HP Attack`}\n`) : ""}
                {hit_data.pot_hp_str != undefined ? ReplacerCharacter(`${hit_data.pot_hp_str}${hit_data.times_count == undefined ? "" : `, on each HP Attack`}\n`) : ""}
                {hit_data.after_each_except_last != undefined ? ReplacerCharacter(hit_data.after_each_except_last+"\n") : ""}
                {hit_data.eff_add_str != undefined ? ReplacerCharacter(`${hit_data.eff_add_str}${hit_data.times_count == undefined ? "" : ` after each HP Attack${hit_data.except_last == true ? ", except last" : ""}`}\n`) : ""}
                {hit_data.eff_add_str_2 != undefined ? ReplacerCharacter(`${hit_data.eff_add_str_2}${hit_data.times_count == undefined ? "" : ` after each HP Attack${hit_data.except_last_2 == true ? ", except last" : ""}`}\n`) : ""}
                {hit_data.eff_det_str != undefined ? ReplacerCharacter(hit_data.eff_det_str+"\n") : ""}
                {hit_data.eff_det_str_2 != undefined ? ReplacerCharacter(hit_data.eff_det_str_2+"\n") : ""}
                {hit_data.mcap_str != undefined ? ReplacerCharacter(hit_data.mcap_str+"\n") : ""}
                {hit_data.brvcap_str != undefined ? ReplacerCharacter(hit_data.brvcap_str+"\n") : ""}
            </>
        )
    }
}