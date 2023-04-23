import React, { useState, useEffect } from 'react';
import Command_Ability_Pars from './Command_Ability_Pars';
import Hit_Data_For_Ability from './Hit_Data_For_Ability';
import Hit_Data_Pars from '../hitdata/Hit_Data_Pars';
import counts_handler from './counts_handler.js'
import times_handler from './times_handler.js'

const Command_Dif = (
    character_ability,
    master_index,
    ver,
) => {

    var full_str = ""

    var command_meta = character_ability && character_ability.command &&
        Command_Ability_Pars(
            character_ability.command,
            ver,

            master_index,
        )

    const hit_data_pars = Hit_Data_For_Ability(
        character_ability,
        master_index,
        ver,

        character_ability.hit_data_pars.hit_1,
        character_ability.hit_data_pars.hit_2,
        character_ability.hit_data_pars.hit_3,
        character_ability.hit_data_pars.hit_4,
        character_ability.hit_data_pars.hit_5,
        character_ability.hit_data_pars.hit_6,
        character_ability.hit_data_pars.hit_7,
        character_ability.hit_data_pars.hit_8,
        character_ability.hit_data_pars.hit_9,
        character_ability.hit_data_pars.hit_10,
        character_ability.hit_data_pars.hit_11,
        character_ability.hit_data_pars.hit_12,
        character_ability.hit_data_pars.hit_13,
        character_ability.hit_data_pars.hit_14,
        character_ability.hit_data_pars.hit_15,
        character_ability.hit_data_pars.hit_16,
        character_ability.hit_data_pars.hit_17,
        character_ability.hit_data_pars.hit_18,
        character_ability.hit_data_pars.hit_19,
        character_ability.hit_data_pars.hit_20,
        character_ability.hit_data_pars.hit_21,
        character_ability.hit_data_pars.hit_22,
        character_ability.hit_data_pars.hit_23,
        character_ability.hit_data_pars.hit_24,
        character_ability.hit_data_pars.hit_25,
        character_ability.hit_data_pars.hit_26,
        character_ability.hit_data_pars.hit_27,
        character_ability.hit_data_pars.hit_28,
        character_ability.hit_data_pars.hit_29,
        character_ability.hit_data_pars.hit_30,
        character_ability.hit_data_pars.hit_31,
        character_ability.hit_data_pars.hit_32,
        character_ability.hit_data_pars.hit_33,
        character_ability.hit_data_pars.hit_34,
        character_ability.hit_data_pars.hit_35,
        character_ability.hit_data_pars.hit_36,
        character_ability.hit_data_pars.hit_37,
        character_ability.hit_data_pars.hit_38,
        character_ability.hit_data_pars.hit_39,
        character_ability.hit_data_pars.hit_40,

        command_meta && command_meta.faf != undefined ? command_meta.faf : undefined,
        command_meta && command_meta.bdlur != undefined ? command_meta.bdlur : undefined,
        command_meta && command_meta.mblur != undefined ? command_meta.mblur : undefined,
        command_meta && command_meta.kcon != undefined ? command_meta.kcon : undefined,
        command_meta && command_meta.kcon_1 != undefined ? command_meta.kcon_1 : undefined,
        command_meta && command_meta.kid != undefined ? command_meta.kid : undefined,
        command_meta && command_meta.kid_1 != undefined ? command_meta.kid_1 : undefined,

        character_ability.power
    )

    const hit_parers = counts_handler(hit_data_pars.hit_pars)

    const new_hit_pars = {}

    var hit_num = 0

    Object.keys(hit_parers).forEach((key, index, array) => {
        if (key == "B1" ||
            key == "B2" ||
            key == "B3" ||
            key == "B4" ||
            key == "S1"
        ) {
            Object.assign(new_hit_pars, { [key]: hit_parers[key] })
        } else {
            if (hit_parers[key] != undefined && hit_parers[key].show != false) {
                hit_num = hit_num + 1
                Object.assign(new_hit_pars, { [`hit_${hit_num}`]: hit_parers[key] })
            }
        }
    })

    const hit_pars = times_handler(new_hit_pars)

    const hit_map = {}

    Object.values(hit_pars).forEach(self => {
        Object.assign(hit_map, { [self.hit_num]: self })
    })

    const abilitytext = character_ability.command && character_ability.command && character_ability.command.udname

    const cast_list = {}

    command_meta && command_meta.cast_list && command_meta.cast_list.forEach(self => {
        if (cast_list[self.hit] == undefined) {
            Object.assign(cast_list, { [self.hit]: [self] })
        } else {
            cast_list[self.hit].push(self)
        }
    })

    const hit_count_map = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
    ]


    if (cast_list[-1] != undefined) {
        cast_list[-1].map(self => {
            if (self.cond != undefined) {
                full_str = `${full_str}┬ ${self.cond}\n└─ ${self.cast_str}\n`
            } else {
                full_str = `${full_str}${self.cast_str}\n`
            }
        })
    }

    {
        hit_count_map.map(number => {
            cast_list[number] && cast_list[number].map(self => {
                self.cond != undefined ?
                    full_str = `${full_str}┬ ${self.cond}\n└─ ${self.cast_str}\n` :
                    full_str = `${full_str}${self.cast_str}\n`
            })
            if (hit_map[number] != undefined && hit_map[number].show != false) {
                if (hit_map[number].atk_str != undefined) {
                    full_str = `${full_str}${hit_map[number].hit_count == undefined ? "" : hit_map[number].hit_count}${hit_map[number].atk_str.replace(/{Attack}/gm, hit_map[number].atk_hp_str == undefined ? "Attack" : hit_map[number].atk_hp_str)}${hit_map[number].times_count == undefined ? "" : hit_map[number].times_count}\n`
                }
                if (hit_map[number].pot_str != undefined) {
                    full_str = `${full_str}${hit_map[number].pot_str}\n`
                }
                if (hit_map[number].st_str != undefined) {
                    full_str = `${full_str}${hit_map[number].st_str}\n`
                }
                if (hit_map[number].eff_str != undefined) {
                    full_str = `${full_str}${hit_map[number].eff_str}${hit_map[number].repeat_count == undefined ? "" : hit_map[number].repeat_count}\n`
                }
                if (hit_map[number].ove_str != undefined) {
                    full_str = `${full_str}${hit_map[number].ove_str}\n`
                }
                if (hit_map[number].eff_before_hp_str != undefined) {
                    full_str = `${full_str}${hit_map[number].eff_before_hp_str} before ${hit_map[number].times_count == undefined ? "" : `last `}HP Attack\n`
                }
                if (hit_map[number].eff_hp_str != undefined) {
                    full_str = `${full_str}${hit_map[number].eff_hp_str}${hit_map[number].times_count == undefined ? "" : `, on each HP Attack`}\n`
                }
                if (hit_map[number].pot_hp_str != undefined) {
                    full_str = `${full_str}${hit_map[number].pot_hp_str}${hit_map[number].times_count == undefined ? "" : `, on each HP Attack`}\n`
                }
                if (hit_map[number].eff_add_str != undefined) {
                    full_str = `${full_str}${hit_map[number].eff_add_str}${hit_map[number].times_count == undefined ? "" : ` after each HP Attack${hit_map[number].except_last == true ? ", except last" : ""}`}\n`
                }
                if (hit_map[number].eff_add_str_2 != undefined) {
                    full_str = `${full_str}${hit_map[number].eff_add_str_2}${hit_map[number].times_count == undefined ? "" : ` after each HP Attack${hit_map[number].except_last_2 == true ? ", except last" : ""}`}\n`
                }
                if (hit_map[number].eff_det_str != undefined) {
                    full_str = `${full_str}${hit_map[number].eff_det_str}\n`
                }
                if (hit_map[number].eff_det_str_2 != undefined) {
                    full_str = `${full_str}${hit_map[number].eff_det_str_2}\n`
                }
                if (hit_map[number].mcap_str != undefined) {
                    full_str = `${full_str}${hit_map[number].mcap_str}\n`
                }
                if (hit_map[number].brvcap_str != undefined) {
                    full_str = `${full_str}${hit_map[number].brvcap_str}\n`
                }
            }
        })
    }

    if (cast_list[0] != undefined) {
        cast_list[0].map(self => {
            if (self.cond != undefined) {
                full_str = `${full_str}┬ ${self.cond}\n└─ ${self.cast_str}\n`
            } else {
                full_str = `${full_str}${self.cast_str}\n`
            }
        })
    }

    if (hit_map["S1"] != undefined && hit_map["S1"].show != false) {
        if (hit_map["S1"].atk_str != undefined) {
            full_str = `${full_str}${hit_map["S1"].hit_count == undefined ? "" : hit_map["S1"].hit_count}${hit_map["S1"].atk_str.replace(/{Attack}/gm, hit_map["S1"].atk_hp_str == undefined ? "Attack" : hit_map["S1"].atk_hp_str)}${hit_map["S1"].times_count == undefined ? "" : hit_map["S1"].times_count}\n`
        }
        if (hit_map["S1"].pot_str != undefined) {
            full_str = `${full_str}${hit_map["S1"].pot_str}\n`
        }
        if (hit_map["S1"].st_str != undefined) {
            full_str = `${full_str}${hit_map["S1"].st_str}\n`
        }
        if (hit_map["S1"].eff_str != undefined) {
            full_str = `${full_str}${hit_map["S1"].eff_str}${hit_map["S1"].repeat_count == undefined ? "" : hit_map["S1"].repeat_count}\n`
        }
        if (hit_map["S1"].ove_str != undefined) {
            full_str = `${full_str}${hit_map["S1"].ove_str}\n`
        }
        if (hit_map["S1"].eff_before_hp_str != undefined) {
            full_str = `${full_str}${hit_map["S1"].eff_before_hp_str} before ${hit_map["S1"].times_count == undefined ? "" : `last `}HP Attack\n`
        }
        if (hit_map["S1"].eff_hp_str != undefined) {
            full_str = `${full_str}${hit_map["S1"].eff_hp_str}${hit_map["S1"].times_count == undefined ? "" : `, on each HP Attack`}\n`
        }
        if (hit_map["S1"].pot_hp_str != undefined) {
            full_str = `${full_str}${hit_map["S1"].pot_hp_str}${hit_map["S1"].times_count == undefined ? "" : `, on each HP Attack`}\n`
        }
        if (hit_map["S1"].eff_add_str != undefined) {
            full_str = `${full_str}${hit_map["S1"].eff_add_str}${hit_map["S1"].times_count == undefined ? "" : ` after each HP Attack${hit_map["S1"].except_last == true ? ", except last" : ""}`}\n`
        }
        if (hit_map["S1"].eff_add_str_2 != undefined) {
            full_str = `${full_str}${hit_map["S1"].eff_add_str_2}${hit_map["S1"].times_count == undefined ? "" : ` after each HP Attack${hit_map["S1"].except_last_2 == true ? ", except last" : ""}`}\n`
        }
        if (hit_map["S1"].eff_det_str != undefined) {
            full_str = `${full_str}${hit_map["S1"].eff_det_str}\n`
        }
        if (hit_map["S1"].eff_det_str_2 != undefined) {
            full_str = `${full_str}${hit_map["S1"].eff_det_str_2}\n`
        }
        if (hit_map["S1"].mcap_str != undefined) {
            full_str = `${full_str}${hit_map["S1"].mcap_str}\n`
        }
        if (hit_map["S1"].brvcap_str != undefined) {
            full_str = `${full_str}${hit_map["S1"].brvcap_str}\n`
        }
    }

    //if (command_meta.faf != undefined) {
    //    full_str = `${full_str}${command_meta.faf}\n`
    //}

    if (command_meta.bdlur != undefined) {
        full_str = `${full_str}${command_meta.bdlur}\n`
    }

    if (command_meta.mblur != undefined) {
        full_str = `${full_str}${command_meta.mblur}\n`
    }

    //if (command_meta.kcon != undefined) {
    //    full_str = `${full_str}${command_meta.kcon}\n`
    //}

    //if (command_meta.kcon_1 != undefined) {
    //    full_str = `${full_str}${command_meta.kcon_1}\n`
    //}

    //if (command_meta.kid != undefined) {
    //    full_str = `${full_str}${command_meta.kid}\n`
    //}

    //if (command_meta.kid_1 != undefined) {
    //    full_str = `${full_str}${command_meta.kid_1}\n`
    //}

    if (command_meta.cost != undefined && command_meta.cost == "*Instant Turn Rate") {
        full_str = `${full_str}${command_meta.cost}\n`
    }

    if (command_meta.blow != undefined) {
        full_str = `${full_str}${command_meta.blow}\n`
    }

    if (command_meta.stun != undefined) {
        full_str = `${full_str}${command_meta.stun}\n`
    }

    if (command_meta.stunadd != undefined) {
        full_str = `${full_str}${command_meta.stunadd}\n`
    }

    if (command_meta.cost != undefined && command_meta.cost != "*Instant Turn Rate") {
        full_str = `${full_str}${command_meta.cost}\n`
    }

    //if(command_meta.nasp != undefined){
    //    full_str = `${full_str}${command_meta.nasp}\n`
    //}

    //if(command_meta.nex != undefined){
    //    full_str = `${full_str}${command_meta.nex}\n`
    //}

    //if(command_meta.nsum != undefined){
    //    full_str = `${full_str}${command_meta.nsum}\n`
    //}

    //if(command_meta.nabi != undefined){
    //    full_str = `${full_str}${command_meta.nabi}\n`
    //}

    if (command_meta.exshow != undefined) {
        full_str = `${full_str}${command_meta.exshow}\n`
    }

    if (command_meta.ncharge != undefined) {
        full_str = `${full_str}${command_meta.ncharge}\n`
    }

    //if(command_meta.type_ != undefined){
    //    full_str = `${full_str}${command_meta.type_}\n`
    //}

    //if(command_meta.target_range_ != undefined){
    //    full_str = `${full_str}${command_meta.target_range_}\n`
    //}

    //if(command_meta.target_type_ != undefined){
    //    full_str = `${full_str}${command_meta.target_type_}\n`
    //}

    //if(command_meta.auto_target_type_ != undefined){
    //    full_str = `${full_str}${command_meta.auto_target_type_}\n`
    //}

    if (command_meta.show != undefined) {
        full_str = `${full_str}${command_meta.show}\n`
    }

    if (command_meta.showadd != undefined) {
        full_str = `${full_str}${command_meta.showadd}\n`
    }

    if (character_ability.same_ability_id_ != 0 && character_ability.same_ability_id_ != undefined) {
        full_str = `${full_str}*Ability Group: ${character_ability.same_ability_id_}\n`
    }

    if (character_ability.ability_rank_ != 0 && character_ability.ability_rank_ != undefined) {
        full_str = `${full_str}*Ability Rank: ${character_ability.ability_rank_}\n`
    }

    return (
        full_str
    )
}
export default Command_Dif