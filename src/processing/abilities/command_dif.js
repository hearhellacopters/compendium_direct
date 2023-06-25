import command_ability_pars from './command_ability_pars.js'
import hitdata_handler from './hitdata_handler.js'
import hitdata_counts_handler from './hitdata_counts_handler.js'
import hitdata_times_handler from './hitdata_times_handler.js'

export default function command_dif(
    character_ability,
    master_index,
    ver,
    debugging
){

    var full_str = ""

    var command_meta = character_ability && character_ability.command &&
        command_ability_pars(
            character_ability.command,
            ver,
            master_index,
        )

    const hit_data_pars = character_ability && hitdata_handler(
        character_ability,
        master_index,
        ver,
        command_meta,
        debugging
    )

    const hit_parers = hitdata_counts_handler(hit_data_pars.hit_pars)

    const hit_map = hitdata_times_handler(hit_parers)

    const cast_list = {}

    command_meta && command_meta.cast_list && command_meta.cast_list.forEach(self => {
        if (cast_list[self.hit] == undefined) {
            Object.assign(cast_list, { [self.hit]: [self] })
        } else {
            cast_list[self.hit].push(self)
        }
    })

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
        for (var number = 1; number < 41; number++) {
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
                if (hit_map[number].after_each_except_last != undefined) {
                    full_str = `${full_str}${hit_map[number].after_each_except_last}\n`
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
        }
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
        if (hit_map[`S1`].after_each_except_last != undefined) {
            full_str = `${full_str}${hit_map[`S1`].after_each_except_last}\n`
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

        if (command_meta.faf != undefined && debugging == true) {
            full_str = `${full_str}${command_meta.faf}\n`
        }

    if (command_meta.bdlur != undefined) {
        full_str = `${full_str}${command_meta.bdlur}\n`
    }

    if (command_meta.mblur != undefined) {
        full_str = `${full_str}${command_meta.mblur}\n`
    }

        if (command_meta.kcon != undefined && debugging == true) {
            full_str = `${full_str}${command_meta.kcon}\n`
        }

        if (command_meta.kcon_1 != undefined && debugging == true) {
            full_str = `${full_str}${command_meta.kcon_1}\n`
        }

        if (command_meta.kid != undefined && debugging == true) {
            full_str = `${full_str}${command_meta.kid}\n`
        }

        if (command_meta.kid_1 != undefined && debugging == true) {
            full_str = `${full_str}${command_meta.kid_1}\n`
        }

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

        if(command_meta.nasp != undefined && debugging == true){
            full_str = `${full_str}${command_meta.nasp}\n`
        }

        if(command_meta.nex != undefined && debugging == true){
            full_str = `${full_str}${command_meta.nex}\n`
        }

        if(command_meta.nsum != undefined && debugging == true){
            full_str = `${full_str}${command_meta.nsum}\n`
        }

        if(command_meta.nabi != undefined && debugging == true){
            full_str = `${full_str}${command_meta.nabi}\n`
        }

    if (command_meta.exshow != undefined) {
        full_str = `${full_str}${command_meta.exshow}\n`
    }

    if (command_meta.ncharge != undefined) {
        full_str = `${full_str}${command_meta.ncharge}\n`
    }

        if(command_meta.type_ != undefined && debugging == true){
            full_str = `${full_str}${command_meta.type_}\n`
        }

        if(command_meta.target_range_ != undefined && debugging == true){
            full_str = `${full_str}${command_meta.target_range_}\n`
        }

        if(command_meta.target_type_ != undefined && debugging == true){
            full_str = `${full_str}${command_meta.target_type_}\n`
        }

        if(command_meta.auto_target_type_ != undefined && debugging == true){
            full_str = `${full_str}${command_meta.auto_target_type_}\n`
    }

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