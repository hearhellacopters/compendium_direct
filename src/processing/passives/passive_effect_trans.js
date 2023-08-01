import ailment_val_edit_type_handler from "../ailment/ailment_val_edit_type_handler.js"

export default function passive_effect_trans(
    effect_,
    effect_target,
    effect_value1,
    effect_value2,
    effect_value3,
    effect__1,

    master_index,
    ver,

    merge_value,
    use_ailment
){

    const effect_data = master_index.passive_effects.effect_
    const passive_target = master_index.passive_effects.passive_target
    const CommandNames = master_index.commands
    const AilmentNames = master_index.ailments
    const elementid_1 = master_index.passive_effects.elementid_1
    const attack_type = master_index.passive_effects.attack_type
    const ability_type = master_index.passive_effects.ability_type
    const ailment_group = master_index.ailment_group_full[ver]
    const passivenames = master_index.passivenames
    const equipmentpassivenames = master_index.equipmentpassivenames
    const enemy_type = master_index.enemy_type
    const CastNames = master_index.cast_names

    function ordinal(n) {
        var s = ["th", "st", "nd", "rd"];
        var v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }

    var effect_pull = effect_data[effect_]

    var effect_str = ""

    if (effect_pull != undefined) {
        if (use_ailment == true && effect_pull.ailment_str != undefined) {
            effect_str = effect_pull.ailment_str
        } else {
            effect_str = effect_pull.effect_str
        }
        if(effect_value1 < 0 && effect_pull.deffect_str != undefined){
            effect_str = effect_pull.deffect_str
            effect_value1 = Math.abs(effect_value1)
        }
        if(effect_pull && effect_pull.hidden == true){
            effect_str = ""
        }
    } else {
        effect_str = `Unknown effect #${effect_} target: [target] with values [value1], [value2], [value3]`
    }

    var effect_target_str = ""

    if (passive_target[effect_target] != undefined) {
        effect_target_str = passive_target[effect_target].passive_target
        if (effect_pull && effect_pull.target_trans != undefined && effect_pull.target_trans == "alt") {
            if (effect_target != 2) {
                effect_target_str = ` ${passive_target[effect_target].passive_target_alt}`
            }
        }
    } else {
        effect_target_str = `undefined target ${effect_target}`
    }

    //value trans

    var BRV_CAP;

    const value_trans = effect_pull && effect_pull.value_trans

    switch (value_trans) {
        case "command_id_1":
            if (effect_value1 == -1) {
                effect_value1 = " any ability"
            }
            if (CommandNames[effect_value1] != undefined) {
                effect_value1 = `[${CommandNames[effect_value1].name}]: #${effect_value1}`
            }
            break;
        case "command_id_2":
            if (effect_value2 == -1) {
                effect_value2 = "any ability"
            }
            if (CommandNames[effect_value2] != undefined) {
                effect_value2 = `[${CommandNames[effect_value2].name}]: #${effect_value2}`
            }
            break;
        case "ability_type_mod":
            if (effect_value2 < 0) {
                effect_str = effect_pull.deffect_str
                effect_value2 = Math.abs(effect_value2)
            }
            if (ability_type[effect_value1] && ability_type[effect_value1].ability_type != undefined) {
                effect_value1 = ability_type[effect_value1].ability_type
            }
            break;
        case "cast_id_1":
            if (CastNames[effect_value1] != undefined) {
                effect_value1 = `//${CastNames[effect_value1].icon}// [${CastNames[effect_value1].name}] #${CastNames[effect_value1].id}`
            }
            if(effect_value2 < 1){
                effect_value2 = ""
            } else {
                effect_value2 = ` for ${effect_value2} turns${effect_value2!=1?"s":""}`
            }
            break;
        case "cast_id_2":
            if (CastNames[effect_value2] != undefined) {
                effect_value2 = `//${CastNames[effect_value2].icon}// [${CastNames[effect_value2].name}] #${CastNames[effect_value2].id}`
            }
            const test = effect_value3
            if (test != 1) {
                effect_value3 = ` for ${effect_value3} turns`
            } else {
                effect_value3 = ` for ${effect_value3} turn`
            }
            if (test == -1) {
                effect_value3 = ""
            }
            break;
        case "cast_id_2_chance":
            if (effect_value1 != 100) {
                effect_value1 = `${effect_value1}% chance to `
            }
            if (effect_value2 == -1) {
                effect_value2 = " any ability"
            }
            if (effect_value1 == 100) {
                effect_value1 = ""
            }
            if (CastNames[effect_value2] != undefined) {
                effect_value2 = `//${CastNames[effect_value2].icon}// [${CastNames[effect_value2].name}] #${CastNames[effect_value2].id}`
            }
            const test1 = effect_value3
            if (test1 != 1) {
                effect_value3 = ` for ${effect_value3} turns`
            } else {
                effect_value3 = ` for ${effect_value3} turn`
            }
            if (test1 == -1) {
                effect_value3 = ""
            }
            break;
        case "command_id_2_chance":
            if (effect_value1 != 100) {
                effect_value1 = ` a ${effect_value1}% chance to`
            }
            if (effect_value1 == 100) {
                effect_value1 = ""
            }
            if (effect_value2 == -1) {
                effect_value2 = "any ability"
            }
            if (CommandNames[effect_value2] != undefined) {
                effect_value2 = `[${CommandNames[effect_value2].name}] #${effect_value2}`
            }
            break;
        case "no_0_values":
            if (effect_value1 == 0) {
                effect_str = effect_str.replace(/Adds \[target\] BRV Damage Up by \[value1\]%\n/gm, "")
            }
            if (effect_value2 == 0) {
                effect_str = effect_str.replace(/\nAdds \[target\] HP Damage Up by \[value1\]%/gm, "")
            }
            break;
        case "int_max":
            if (effect_value2 >= 1) {
                effect_value2 = "INT BRV"
            }
            if (effect_value2 == 0) {
                effect_value2 = "MAX BRV"
            }
            break;
        case "int_max_2":
            if (effect_value2 == 0) {
                effect_value2 = "INT BRV"
            }
            if (effect_value2 >= 1) {
                effect_value2 = "MAX BRV"
            }
            break;
        case "brv_damage_cap_per":
            BRV_CAP = Math.round(effect_value1 * 100)
            effect_str = effect_str.replace(/\[BRV_CAP\]/gm, BRV_CAP.toLocaleString("en-US"))
            break;
        case "max_brv_cap_per":
            BRV_CAP = Math.round(effect_value1 * 1000)
            effect_str = effect_str.replace(/\[MAX_CAP\]/gm, BRV_CAP.toLocaleString("en-US"))
            break;
        case "elementid_1":
            if (elementid_1[effect_value1] != undefined) {
                effect_value1 = elementid_1[effect_value1].elementid_1
            }
            break;
        case "incremental":
            if (effect__1 == undefined) {
                effect_value2 = (effect_value2 + 1)
            } else {
                effect_value1 = (effect_value1 * 2)
                effect_value2 = (effect_value2 + 1) / 2
            }
            break;
        case "attack_type":
            if (attack_type[effect_value1] != undefined) {
                effect_value1 = attack_type[effect_value1].attack_type
            }
            break;
        case "passive_grant":
            if (passivenames[effect_value1] != undefined) {
                if (effect_value1 != -1) {
                    if (passivenames[effect_value1].name != undefined) {
                        effect_value1 = `[${passivenames[effect_value1].name}] #${effect_value1}`
                    } else {
                        effect_value1 = `[#${effect_value1}]`
                    }
                } else {
                    effect_value1 = ""
                }
                if (effect_value2 != -1) {
                    if (passivenames[effect_value2] && passivenames[effect_value2].name != undefined) {
                        effect_value2 = `, [${passivenames[effect_value2].name}] #${effect_value2}`
                    } else {
                        effect_value2 = `, [#${effect_value2}]`
                    }
                } else {
                    effect_value2 = ""
                }
                if (effect_value3 != -1) {
                    if (passivenames[effect_value3] && passivenames[effect_value3].name != undefined) {
                        effect_value3 = `, [${passivenames[effect_value3].name}] #${effect_value3}`
                    } else {
                        effect_value3 = `, [#${effect_value3}]`
                    }
                } else {
                    effect_value3 = ""
                }
            }
            break;
        case "equipment_passive_grant":
            if (equipmentpassivenames[effect_value1] != undefined) {
                if (effect_value1 != -1) {
                    if (equipmentpassivenames[effect_value1].name != undefined) {
                        effect_value1 = `[${equipmentpassivenames[effect_value1].name}] #${effect_value1}`
                    } else {
                        effect_value1 = `[#${effect_value1}]`
                    }
                } else {
                    effect_value1 = ""
                }
                if (effect_value2 != -1) {
                    if (equipmentpassivenames[effect_value2] && equipmentpassivenames[effect_value2].name != undefined) {
                        effect_value2 = `, [${equipmentpassivenames[effect_value2].name}] #${effect_value2}`
                    } else {
                        effect_value2 = `, [#${effect_value2}]`
                    }
                } else {
                    effect_value2 = ""
                }
                if (effect_value3 != -1) {
                    if (equipmentpassivenames[effect_value3] && equipmentpassivenames[effect_value3].name != undefined) {
                        effect_value3 = `, [${equipmentpassivenames[effect_value3].name}] #${effect_value3}`
                    } else {
                        effect_value3 = `, [#${effect_value3}]`
                    }
                } else {
                    effect_value3 = ""
                }
            }
            break;
        case "enemy_type":
            if (enemy_type[effect_value1] != undefined) {
                effect_value1 = enemy_type[effect_value1].translation
            }
            break;
        case "split_by_3":
            var value1_1 = ailment_val_edit_type_handler(2, effect_value1)
            if (value1_1 == 0) {
                effect_str = effect_str
                    .replace(/Adds \[target\] ATK Up.*\n/gm, "")
            }
            var value1_2 = ailment_val_edit_type_handler(3, effect_value1)
            if (value1_2 == 0) {
                effect_str = effect_str
                    .replace(/Adds \[target\] DEF Up.*\n/gm, "")
            }
            var value1_3 = ailment_val_edit_type_handler(4, effect_value1)
            if (value1_3 == 0) {
                effect_str = effect_str
                    .replace(/Adds \[target\] SPD Up.*\n/gm, "")
            }
            var value2_2 = ailment_val_edit_type_handler(3, effect_value2)
            if (value2_2 == 0) {
                effect_str = effect_str
                    .replace(/Adds \[target\] INT BRV Up.*\n/gm, "")
            }
            var value2_3 = ailment_val_edit_type_handler(4, effect_value2)
            if (value2_3 == 0) {
                effect_str = effect_str
                    .replace(/Adds \[target\] MAX BRV Up.*\n/gm, "")
            }
            var newstr = effect_str
                .replace(/\[value1_1\]/gm, value1_1)
                .replace(/\[value1_2\]/gm, value1_2)
                .replace(/\[value1_3\]/gm, value1_3)
                .replace(/\[value2_2\]/gm, value2_2)
                .replace(/\[value2_3\]/gm, value2_3)
                .replace(/\[target\]/gm, effect_target_str)
            if (effect_pull && effect_pull.target_trans == "no_self") {
                newstr = newstr.replace(/Self /gm, "")
            }
            effect_str = newstr
            break;
        case "ailment_id_1s":
            const ailment_pull = AilmentNames[effect_value1]
            if (effect_value1 != -1 && ailment_pull == undefined) {
                effect_value1 = `[${effect_value1}] #${effect_value1}`
            }
            if (ailment_pull != undefined) {
                effect_value1 = `//${AilmentNames[effect_value1].icon}// [${AilmentNames[effect_value1].name}] #${effect_value1}`
            }
            if (effect_value1 == -1) {
                effect_value1 = "any"
            }
            break;
        case "ailment_id_1":
            if (AilmentNames[effect_value1] != undefined) {
                effect_value1 = `//${AilmentNames[effect_value1].icon}// [${AilmentNames[effect_value1].name}] #${effect_value1}`
            } else {
                effect_value1 = `[${effect_value1}] #${effect_value1}`
            }
            if (effect_value1 == -1) {
                effect_value1 = "any"
            }
            break;
        case "ailment_id_2":
            if (AilmentNames[effect_value2] != undefined) {
                effect_value2 = `//${AilmentNames[effect_value2].icon}// [${AilmentNames[effect_value2].name}] #${effect_value2}`
            } else {
                effect_value2 = `[${effect_value2}] #${effect_value2}`
            }
            if (effect_value2 == -1) {
                effect_value2 = "any"
            }
            break;
        case "ailment_effect_boost":
            if (AilmentNames[effect_value1] != undefined) {
                effect_value1 = `//${AilmentNames[effect_value1].icon}// [${AilmentNames[effect_value1].name}] #${effect_value1}`
            } else {
                effect_value1 = `[${effect_value1}] #${effect_value1}`
            }
            var newval2 = effect_value2 - 1
            if (newval2 == -1) {
                effect_value2 = "all"
                effect_str += "s"
            } else {
                effect_value2 = ordinal(effect_value2)
            }
            break;
        case "ailment_group_effect_boost":
            if (ailment_group[effect_value1] != undefined) {
                effect_value1 = ailment_group[effect_value1].unique
            } else {
                effect_value1 = `ailment group #${effect_value1}`
            }
            var newval3 = effect_value2 - 1
            if (newval3 == -1) {
                effect_value2 = "all"
                effect_str += "s"
            } else {
                effect_value2 = ordinal(effect_value2)
            }
            break;
        case "by_10":
            const newval = effect_value1 / 10
            effect_value1 = newval
            break;
        case "no_turns2":
            if (effect_value2 != 0) {
                effect_str += "s"
            }
            if (effect_value2 == -1) {
                effect_str = effect_str
                    .replace(/ for \[value2\] turns/gm, "")
            }
            break;
        case "no_turns1":
            if (effect_value1 != 1) {
                effect_str += "s"
            }
            if (effect_value1 == -1) {
                effect_str = effect_str
                    .replace(/ by \[value1\] turns/gm, "")
            }
            break;
        default:
            break;
    }
    
    //ending
    var final_str = effect_str
        .replace(/\[value1\]/gm, effect_value1)
        .replace(/\[value2\]/gm, effect_value2)
        .replace(/\[value3\]/gm, effect_value3)
        .replace(/\[target\]/gm, effect_target_str)
        .replace(/Adds ATK Up by 0%/gm, "")
        .replace(/\nAdds SPD Up by 0%/gm, "")
        .replace(/\nAdds INT BRV Up by 0%/gm, "")
        .replace(/\nAdds DEF Up by 0%/gm, "")
        .replace(/\nAdds MAX BRV Up by 0%/gm, "")
        .replace(/Adds ATK Up by 0% for 0 turns/gm, "")
        .replace(/\nAdds SPD Up by 0% for 0 turns/gm, "")
        .replace(/\nAdds INT BRV Up by 0% for 0 turns/gm, "")
        .replace(/\nAdds DEF Up by 0% for 0 turns/gm, "")
        .replace(/\nAdds MAX BRV Up by 0% for 0 turns/gm, "")


    if (value_trans == "ailment_id_1s") {
        if (effect_value2 != 1) {
            final_str += " turns"
        } else {
            final_str += " turn"
        }
    }

    if (effect_pull && effect_pull.target_trans == "no_self") {
        final_str = final_str.replace(/Self /gm, "")
    }



    if (merge_value == undefined) {
        return final_str
    } else {
        if (effect_target_str == "Self") {
            if (effect_pull.ATK == "value1") {
                merge_value.ATK = merge_value.ATK + effect_value1
            }
            if (effect_pull.ATK == "value1_1") {
                merge_value.ATK = merge_value.ATK + value1_1
            }
            if (effect_pull.DEF == "value1") {
                merge_value.DEF = merge_value.DEF + effect_value1
            }
            if (effect_pull.DEF == "value1_2") {
                merge_value.DEF = merge_value.DEF + value1_2
            }
            if (effect_pull.SPD == "value1") {
                merge_value.SPD = merge_value.SPD + effect_value1
            }
            if (effect_pull.SPD == "value1_3") {
                merge_value.SPD = merge_value.SPD + value1_3
            }
            if (effect_pull.IBRV == "value1") {
                merge_value.IBRV = merge_value.IBRV + effect_value1
            }
            if (effect_pull.IBRV == "value2_2") {
                merge_value.IBRV = merge_value.IBRV + value2_2
            }
            if (effect_pull.MBRV == "value1") {
                merge_value.MBRV = merge_value.MBRV + effect_value1
            }
            if (effect_pull.MBRV == "value2_3") {
                merge_value.MBRV = merge_value.MBRV + value2_3
            }
            if (effect_pull.BRVDMG == "value1") {
                merge_value.BRVDMG = merge_value.BRVDMG + effect_value1
            }
            if (effect_pull.GAINS == "value1") {
                merge_value.GAINS = merge_value.GAINS + effect_value1
            }
            if (effect_pull.S_OVER == "value1") {
                merge_value.S_OVER = merge_value.S_OVER + effect_value1
            }
            if (effect_pull.G_OVER == "value1") {
                merge_value.G_OVER = merge_value.G_OVER + effect_value1
            }
            if (effect_pull.BRVCAP == "value1") {
                merge_value.BRVCAP = merge_value.BRVCAP + effect_value1
            }
            if (effect_pull.MAXCAP == "value1") {
                merge_value.MAXCAP = merge_value.MAXCAP + effect_value1
            }
        }
        if (effect_target_str == "Party") {
            if (effect_pull.ATK == "value1") {
                merge_value.P_ATK = merge_value.P_ATK + effect_value1
            }
            if (effect_pull.ATK == "value1_1") {
                merge_value.P_ATK = merge_value.P_ATK + value1_1
            }
            if (effect_pull.DEF == "value1") {
                merge_value.P_DEF = merge_value.P_DEF + effect_value1
            }
            if (effect_pull.DEF == "value1_2") {
                merge_value.P_DEF = merge_value.P_DEF + value1_2
            }
            if (effect_pull.SPD == "value1") {
                merge_value.P_SPD = merge_value.P_SPD + effect_value1
            }
            if (effect_pull.SPD == "value1_3") {
                merge_value.P_SPD = merge_value.P_SPD + value1_3
            }
            if (effect_pull.IBRV == "value1") {
                merge_value.P_IBRV = merge_value.P_IBRV + effect_value1
            }
            if (effect_pull.IBRV == "value2_2") {
                merge_value.P_IBRV = merge_value.P_IBRV + value2_2
            }
            if (effect_pull.MBRV == "value1") {
                merge_value.P_MBRV = merge_value.P_MBRV + effect_value1
            }
            if (effect_pull.MBRV == "value2_3") {
                merge_value.P_MBRV = merge_value.P_MBRV + value2_3
            }
            if (effect_pull.BRVDMG == "value1") {
                merge_value.P_BRVDMG = merge_value.P_BRVDMG + effect_value1
            }
            if (effect_pull.GAINS == "value1") {
                merge_value.P_GAINS = merge_value.P_GAINS + effect_value1
            }
            if (effect_pull.S_OVER == "value1") {
                merge_value.P_S_OVER = merge_value.P_S_OVER + effect_value1
            }
            if (effect_pull.G_OVER == "value1") {
                merge_value.P_G_OVER = merge_value.P_G_OVER + effect_value1
            }
            if (effect_pull.BRVCAP == "value1") {
                merge_value.P_BRVCAP = merge_value.P_BRVCAP + effect_value1
            }
            if (effect_pull.MAXCAP == "value1") {
                merge_value.P_MAXCAP = merge_value.P_MAXCAP + effect_value1
            }
        }
        if (effect_pull.BONUSSTART == "value1") {
            merge_value.BONUSSTART = merge_value.BONUSSTART + effect_value1
        }
        if (effect_pull.BONUSEND == "value1") {
            merge_value.BONUSEND = merge_value.BONUSEND + effect_value1
        }
        if (effect_pull.GAUGE == "value1") {
            merge_value.GAUGE = merge_value.GAUGE + effect_value1
        }
        if (effect_pull.RATE == "value2") {
            merge_value.RATE = merge_value.RATE + effect_value2
        }
        if (effect_pull.HPRETAIN == "value1") {
            merge_value.HPRETAIN = merge_value.HPRETAIN + effect_value1
        }
        return merge_value
    }
}