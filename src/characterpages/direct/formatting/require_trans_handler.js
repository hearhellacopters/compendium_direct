import element_weakness from "../../../processing/element_weakness"
import element_other from "../../../processing/element_other"
import additional_attack from "../../../processing/additional_attack"
import crystal from './crystal.json'

const require_trans_handler = (
    require_,
    require_target,
    require_value1,
    require_value2,
    require_value3,

    master_index,
    ver,
) => {

    const require_passive = master_index.passive_effects.require_passive
    const passive_target = master_index.passive_effects.passive_target
    const CommandNames = master_index.commands
    const AilmentNames = master_index.ailments
    const elementid_1 = master_index.passive_effects.elementid_1
    const attack_type = master_index.passive_effects.attack_type
    const killer_type = master_index.passive_effects.killer_type
    const command_group = master_index.command_group_full[ver]
    const ailment_group = master_index.ailment_group_full[ver]
    const trap_type = master_index.passive_effects.trap_type
    const passivenames = master_index.passivenames
    const equipmentpassivenames = master_index.equipmentpassivenames
    const enemy_type = master_index.enemy_type
    const command_type = master_index.passive_effects.command_type
    const target_range_ = master_index.passive_effects.target_range_
    const ailment_type = master_index.passive_effects.ailment_type

    var require = require_passive[require_]

    var require_str = ""

    if (require != undefined) {
        require_str = require.require_str
    } else {
        require_str = `Unknown require #${require_} target: [target] with values [value1], [value2], [value3]`
    }

    if (require_ == 1) {
        require_str = ""
    }

    var passive_target_str = ""

    if (passive_target[require_target] != undefined) {
        if (require && require.target_trans != undefined && require.target_trans == "alt") {
            if (require_target != 2) {
                passive_target_str = ` ${passive_target[require_target].passive_target_alt}`
            }
        } else {
            passive_target_str = passive_target[require_target].passive_target
        }
    } else {
        passive_target_str = `undefined target ${require_target}`
    }

    //value trans

    const value_trans = require && require.value_trans

    if(value_trans == "crystal_or"){
        if (require_value1 == -1) {
            require_value1 = ""
        } else {
            const color = crystal[require_value1]
            require_value1 = color
        }
        if (require_value2 == -1) {
            require_value2 = ""
        } else {
            const color = crystal[require_value2]
            require_value2 = ` or ${color}`
        }
        if (require_value3 == -1) {
            require_value3 = ""
        } else {
            const color = crystal[require_value3]
            require_value3 = ` or ${color}`
        }
    }

    if(value_trans == "crystal"){
        if (require_value1 == -1) {
            require_value1 = ""
        } else {
            const color = crystal[require_value1]
            require_value1 = color
        }
        if (require_value2 == -1) {
            require_value2 = ""
        } else {
            const color = crystal[require_value2]
            require_value2 = ` and ${color}`
        }
        if (require_value3 == -1) {
            require_value3 = ""
        } else {
            const color = crystal[require_value3]
            require_value3 = ` and ${color}`
        }
    }

    if (value_trans == "command_id_1") {
        var getname0 = CommandNames[require_value1]
        if (require_value1 == -1) {
            require_value1 = " any ability"
        }
        if (getname0 != undefined) {
            require_value1 = `[${CommandNames[require_value1].name}] #${require_value1}`
        }
    }

    if (value_trans == "command_id") {
        var getname1 = CommandNames[require_value1]
        if (getname1 != undefined) {
            require_value1 = `[${CommandNames[require_value1].name}] #${require_value1}`
        } else {
            if (require_value1 != -1) {
                require_value1 = `[${require_value1}] #${require_value1}`
            } else {
                require_value1 = ""
            }
        }

        var getname2 = CommandNames[require_value2]
        if (getname2 != undefined) {
            require_value2 = `, [${CommandNames[require_value2].name}] #${require_value2}`
        } else {
            if (require_value2 != -1) {
                require_value2 = `, [${require_value2}] #${require_value2}`
            } else {
                require_value2 = ""
            }
        }

        var getname3 = CommandNames[require_value3]
        if (getname3 != undefined) {
            require_value3 = `, [${CommandNames[require_value3].name}] #${require_value3}`
        } else {
            if (require_value3 != -1) {
                require_value3 = `, [${require_value3}] #${require_value3}`
            } else {
                require_value3 = ""
            }
        }
    }

    if (value_trans == "ailment_id_with") {
        var getname4 = AilmentNames[require_value1]
        if (require_value1 == -1) {
            require_value1 = ""
        }
        if (getname4 != undefined) {
            require_value1 = ` with [${AilmentNames[require_value1].name}] #${require_value1}`
        }
    }

    if (value_trans == "ailment_id_debuff_between") {
        var getname5a = AilmentNames[require_value1]
        if (require_value1 == -1) {
            require_value1 = "any debuff"
        }
        if (getname5a != undefined) {
            require_value1 = `[${AilmentNames[require_value1].name}] #${require_value1}`
        }
        if (require_value2 <= 0) {
            require_value2 = ""
            require_value3 = ""
        } else {
            require_value2 = ` between ${require_value2} - ${require_value3}`
            require_value3 = ""
        }
    }

    if (value_trans == "ailment_id_1a") {
        var getname4a = AilmentNames[require_value1]
        if (getname4a != undefined) {
            require_value1 = ` [${AilmentNames[require_value1].name}] #${require_value1}`
        }
        if (require_value1 == -1) {
            require_value1 = " a"
        }
    }

    if (value_trans == "ailment_id") {
        if (AilmentNames[require_value1] != undefined) {
            require_value1 = ` [${AilmentNames[require_value1].name}] #${require_value1}`
        }
        if (require_value1 == -1) {
            require_value1 = ""
        }
        if (AilmentNames[require_value2] != undefined) {
            require_value2 = `, [${AilmentNames[require_value2].name}] #${require_value2}`
        }
        if (require_value2 == -1) {
            require_value2 = ""
        }
        if (AilmentNames[require_value3] != undefined) {
            require_value3 = `, [${AilmentNames[require_value3].name}] #${require_value3}`
        }
        if (require_value3 == -1) {
            require_value3 = ""
        }
    }

    if (value_trans == "killer_type") {
        var getname5 = killer_type[require_value1]
        if (getname5 != undefined) {
            require_value1 = killer_type[require_value1].killer_type
        }
    }

    if (value_trans == "buffs") {
        if (require_value1 > 1) {
            require_value1 = ` at least ${require_value1} buffs`
        } else {
            require_value1 = ""
        }
    }

    if (value_trans == "ailment_id_1") {

        if (AilmentNames[require_value1] != undefined) {
            require_value1 = `[${AilmentNames[require_value1].name}] #${require_value1}`
        } else {
            if (require_value1 == -1) {
                require_value1 = "any"
            } else {
                require_value1 = `[${require_value1}] ${require_value1}`
            }
        }
    }

    if (value_trans == "ailment_id_1_between") {
        if (AilmentNames[require_value1] != undefined) {
            require_value1 = `[${AilmentNames[require_value1].name}] #${require_value1}`
        } else {
            if (require_value1 == -1) {
                require_value1 = "any"
            } else {
                require_value1 = `[${require_value1}] ${require_value1}`
            }
        }
        if ((require_value3 - require_value2) == 1) {
            require_value2 = `at level ${require_value2}`
            require_value3 = ""
        } else {
            require_value2 = `between levels ${require_value2} - ${require_value3 - 1}`
            require_value3 = ""
        }
    }

    if (value_trans == "ailment_type_between_nozero") {
        if (ailment_type[require_value1] != undefined) {
            require_value1 = ailment_type[require_value1].ailment_type
        } else {
            require_value1 = `ailment type #${require_value1}`
        }
        if ((require_value3 - 1) < 1) {
            require_value2 = `at least ${require_value2}`
            require_value3 = ""
        } else {
            require_value2 = `between ${require_value2} - ${require_value3 - 1}`
            require_value3 = ""
        }
    }

    if (value_trans == "own_party") {
        if (require_target == 2) {
            require_str = require_str.replace(/\[target\]/gm, " own")
        }
        if (require_target == 31) {
            require_str = require_str.replace(/\[target\]/gm, " Party")
        }
    }

    if (value_trans == "any_0") {
        if (require_value1 == 0) {
            require_value1 = "any"
        }
    }

    if (value_trans == "no_0s") {
        if (require_value1 == 0) {
            require_value1 = "no"
        }
    }

    if (value_trans == "elementid_1") {
        if (elementid_1[require_value1] != undefined) {
            require_value1 = elementid_1[require_value1].elementid_1
        }
    }

    if (value_trans == "elementid_2") {
        if (require_value1 == -1) {
            require_value1 = ""
        } else {
            if (require_value1 == 1) {
                require_value1 = "BRV "
            }
            if (require_value1 == 2) {
                require_value1 = "HP "
            }
        }
        if (elementid_1[require_value2] != undefined) {
            require_value2 = elementid_1[require_value2].elementid_1
        }
        const damagetype = [undefined, " Melee", " Ranged", " Magic"]
        if (damagetype[require_value3] != undefined) {
            require_value3 = damagetype[require_value3]
        } else {
            require_value3 = ""
        }
    }

    if (value_trans == "attack_type") {
        if (attack_type[require_value1] != undefined) {
            require_value1 = attack_type[require_value1].attack_type
        }
    }

    if (value_trans == "attack_type_single") {
        if (require_value1 == 1) {
            require_value1 = "<Melee>"
        } else {
            require_value1 = ""
        }
        if (require_value2 == 1) {
            require_value2 = "<Ranged>"
        } else {
            require_value2 = ""
        }
        if (require_value3 == 1) {
            require_value3 = "<Magic>"
        } else {
            require_value3 = ""
        }
        if (require_value1 != "" && require_value2 != "") {
            require_value1 = require_value1 + " "
        }
        if (require_value2 != "" && require_value3 != "") {
            require_value2 = require_value2 + " "
        }
        if (require_value1 != "" && require_value3 != "") {
            require_value1 = require_value1 + " "
        }
        if (require_value1 != "" && require_value2 != "" && require_value3 != "") {
            require_value1 = require_value1 + " "
            require_value2 = require_value2 + " "
        }
    }

    if (value_trans == "attack_type_any") {
        if (attack_type[require_value1] != undefined) {
            require_value1 = attack_type[require_value1].attack_type
        }
        if (require_value2 == -1) {
            require_value2 = ""
        } else {
            if (require_value2 == 1) {
                require_value2 = " BRV"
            }
            if (require_value2 == 2) {
                require_value2 = " HP"
            }
            if (require_value2 == 0) {
                require_value2 = ""
            }
        }
    }

    if (value_trans == "attack_type_any_elementid_2") {
        if (attack_type[require_value1] != undefined) {
            require_value1 = attack_type[require_value1].attack_type
        }
        if (elementid_1[require_value2] != undefined) {
            require_value2 = elementid_1[require_value2].elementid_1
        } else {
            require_value2 = ""
        }
    }

    if (value_trans == "m_abilities") {
        if (require_value1 != 1) {
            require_value1 = ` ${require_value1} abilities`
        } else {
            require_value1 = ` ${require_value1} ability`
        }
    }

    if (value_trans == "targets") {
        if (require_value1 != 1) {
            require_value1 = `${require_value1} targets`
        } else {
            require_value1 = `a single target`
        }
    }

    if (value_trans == "command_group_id") {
        if (command_group[require_value1] != undefined) {
            require_value1 = command_group[require_value1].unique
        }
    }

    if (value_trans == "ailment_group") {
        if (ailment_group[require_value1] != undefined) {
            require_value1 = ailment_group[require_value1].unique
        }
    }

    if (value_trans == "element_weak") {
        const getweakness = element_weakness(require_value1)
        require_value1 = getweakness
    }

    if (value_trans == "trap_type") {
        if (trap_type[require_value1] != undefined) {
            require_value1 = trap_type[require_value1].trap_type == undefined ? "" : trap_type[require_value1].trap_type
        }
    }

    if (value_trans == "damage_3") {
        var fullstr = ""
        if (require_value1 == 1) {
            if (fullstr == "") {
                fullstr = "<Melee>"
            } else {
                fullstr += " / <Melee>"
            }
        }
        if (require_value2 == 1) {
            if (fullstr == "") {
                fullstr = "<Ranged>"
            } else {
                fullstr += " / <Ranged>"
            }
        }
        if (require_value3 == 1) {
            if (fullstr == "") {
                fullstr = "<Magic>"
            } else {
                fullstr += " / <Magic>"
            }
        }
        require_value1 = fullstr
    }

    if (value_trans == "brv_or_hp") {
        if (require_value1 == 1) {
            require_value1 = "[BRV Attack]"
        } else {
            require_value1 = ""
        }
        if (require_value2 == 1) {
            require_value2 = "[HP Attack]"
        } else {
            require_value2 = ""
        }
    }
    if (value_trans == "delay_break") {
        if (require_value1 == 1) {
            require_value1 = " (including from BREAK)"
        } else {
            require_value1 = ""
        }
    }

    if (value_trans == "gold_frame_3") {
        if (require_value2 == 3) {
            require_value2 = `Gold Framed `
        } else {
            require_value2 = ""
        }
    }

    if (value_trans == "consecutive") {
        if (require_value2 == 1) {
            require_value2 = ``
        }
        if (require_value2 == 2) {
            require_value2 = ` (while afflicted with BREAK)`
        }
        if (require_value2 == 3) {
            require_value2 = ` (while NOT afflicted with BREAK)`
        }
    }

    if (value_trans == "passive_id") {
        if (passivenames[require_value1] != undefined) {
            if (passivenames[require_value1].name && passivenames[require_value1].name != undefined) {
                require_value1 = `[${passivenames[require_value1].name}]`
            } else {
                require_value1`[${require_value1}]`
            }

        }
    }

    if (value_trans == "equipment_id") {
        if (equipmentpassivenames[require_value1] != undefined) {
            if (equipmentpassivenames[require_value1].name && equipmentpassivenames[require_value1].name != undefined) {
                require_value1 = `[${equipmentpassivenames[require_value1].name}]`
            } else {
                require_value1`[${require_value1}]`
            }

        }
    }

    if (value_trans == "additional_attack") {
        const getattack1 = additional_attack(require_value1)
        require_value1 = getattack1
    }

    if (value_trans == "element_weakness") {
        const getweakness4 = element_weakness(require_value1)
        require_value1 = getweakness4
    }

    if (value_trans == "element_weakness_additional_attack") {
        const getweakness2 = element_weakness(require_value1)
        require_value1 = getweakness2
        const getattack2 = additional_attack(require_value2)
        require_value2 = getattack2
    }

    if (value_trans == "command_type") {
        const getcommand = command_type[require_value1]
        if (getcommand != undefined) {
            require_value1 = getcommand.command_type
        }
    }

    if (value_trans == "command_type_attack_type_element") {
        const getcommand = command_type[require_value1]
        if (getcommand != undefined) {
            require_value1 = getcommand.command_type
        }
        const getat = attack_type[require_value2]
        if (getat != undefined) {
            require_value2 = getat.attack_type
        }
        const getel = elementid_1[require_value3]
        if (getel != undefined) {
            require_value3 = getel.elementid_1
        }
    }

    if (value_trans == "command_type_element_weakness") {
        const getcommand2 = command_type[require_value1]
        if (getcommand2 != undefined) {
            require_value1 = getcommand2.command_type
        }
        const getweakness3 = element_weakness(require_value2)
        require_value2 = getweakness3
    }

    if (value_trans == "command_type_element_weakness2") {
        const getcommand3 = command_type[require_value1]
        if (getcommand3 != undefined) {
            require_value1 = getcommand3.command_type
        }
        const getweakness4 = element_weakness(require_value2)
        require_value2 = getweakness4
        const getweakness5 = element_weakness(require_value3)
        require_value3 = getweakness5
    }

    if (value_trans == "element_other") {
        const getother = element_other(require_value1)
        require_value1 = getother
    }

    if (value_trans == "buff_count") {
        if (require_value1 == 0 && require_value2 <= 1) {
            require_value1 = ``
            require_value2 = `no buffs`
        } else {
            if(require_value1 == 0 && require_value2 > 1){
                require_value1 = `less than ${require_value2-1} buff${(require_value2 - 1) == 1 ?"":"s"}`
                require_value2 = ""
            } else {
                require_value1 = `between ${require_value1} & ${require_value2-1} buff${(require_value2 - 1) == 1 ?"":"s"}`
                require_value2 = ""
            }
        }
    }

    if (value_trans == "debuff_count") {
        if (require_value1 == 0 && require_value2 <= 1) {
            require_value1 = ``
            require_value2 = `no debuffs`
        } else {
            if(require_value1 == 0 && require_value2 > 1){
                require_value1 = `less than ${require_value2-1} debuff${(require_value2 - 1) == 1? "" : "s"}`
                require_value2 = ""
            } else {
                require_value1 = `between ${require_value1} & ${require_value2-1} debuff${(require_value2 - 1) == 1 ?"":"s"}`
                require_value2 = ""
            }
        }
    }

    if (value_trans == "below_above_percent") {
        if (require_value2 < require_value1) {
            if (require_value2 == 0) {
                require_value2 = `above ${require_value1}%`
                require_value1 = ``
            } else {
                require_value1 = `between ${require_value1}% & ${require_value2}%`
                require_value2 = ""
            }
        } else { //  require_value2 > require_value1
            if (require_value1 == 0) {
                require_value1 = ``
                require_value2 = `below ${require_value2}%`
            } else {
                require_value1 = `between ${require_value1}% & ${require_value2}%`
                require_value2 = ""
            }
        }
    }

    if (value_trans == "type_element") {
        if (require_value2 == 1) {
            require_value2 = `damage type`
        } else {
            require_value2 = `elemental`
        }
    }

    if (value_trans == "at_least_between") {
        if (require_value2 >= 100) {
            require_value2 = `at least ${require_value1}%`
            require_value1 = ``
        }
        if (require_value2 <= 99) {
            require_value2 = `between ${require_value2}% - ${require_value1}%`
            require_value1 = ``
        }
    }

    if (value_trans == "2_debuff") {
        if (require_value2 == 1) {
            require_value2 = "de"
        } else {
            require_value2 = ""
        }
    }

    if (value_trans == "target_range_") {
        const getrange = target_range_[require_value1]
        if (getrange != undefined) {
            require_value1 = getrange.target_range_
        }
    }

    if (value_trans == "neg_active_buffs") {
        if (require_value1 <= 0) {
            require_value1 = "no active buffs"
        }
        if (require_value1 == 1) {
            require_value1 = "1 active buff"
        }
        if (require_value1 > 1) {
            var valueholder = require_value1
            require_value1 = `${valueholder} active buff`
        }
    }

    if (value_trans == "any_buff") {
        if (require_value1 <= 0) {
            require_value1 = "any buff"
        }
        if (require_value1 == 1) {
            require_value1 = "1 buff"
        }
        if (require_value1 > 1) {
            var hold_val = require_value1
            require_value1 = `${hold_val} buffs`
        }
    }

    if (value_trans == "move_cost") {
        var holder_text = ""
        if (require_value1 == 1) {
            holder_text += "greater than 30"
        }
        if (require_value2 == 1) {
            if (holder_text != "") {
                holder_text += " / "
            }
            holder_text = "30"
        }
        if (require_value3 == 1) {
            if (holder_text != "") {
                holder_text += " / "
            }
            holder_text += "less than 30"
        }
        require_value1 = holder_text
    }

    //ending

    if (require && require.target_trans == "own" && require_target == 2) {
        passive_target_str = "own"
    }

    var final_str = require_str && require_str
        .replace(/\[value1\]/gm, require_value1)
        .replace(/\[value2\]/gm, require_value2)
        .replace(/\[value3\]/gm, require_value3)
        .replace(/\[target\]/gm, passive_target_str)

    if (require && require.target_trans == "no_self") {
        final_str = final_str.replace(/Self /gm, "")
    }

    if (require && require.target_trans == "has_noself") {
        final_str = final_str.replace(/Self has /gm, "")
    }

    if (value_trans == "any_0s") {
        if (require_value1 != 1) {
            final_str += "s"
        }
    }

    if (value_trans == "no_0s") {
        if (require_value1 != 1) {
            final_str += "s"
        }
    }


    return final_str
}
export default require_trans_handler