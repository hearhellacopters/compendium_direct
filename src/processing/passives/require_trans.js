import require_element_weakness from "./require_element_weakness.js"
import require_additional_attack from "./require_additional_attack.js"
import ailment_level_icon from "../ailment/ailment_level_icon.js"

export default function require_trans(
    require_,
    require_target,
    require_value1,
    require_value2,
    require_value3,

    master_index,
    ver,
){

    const require_passive = master_index.passive_effects.require_passive
    const passive_target = master_index.passive_effects.passive_target
    const CommandNames = master_index.commands
    const AilmentNames = master_index.ailments
    const elementid_1 = master_index.passive_effects.elementid_1
    const attack_type = master_index.passive_effects.attack_type
    const killer_type = master_index.passive_effects.killer_type
    const ability_type = master_index.passive_effects.ability_type
    const command_group = master_index.command_group_full[ver]
    const ailment_group = master_index.ailment_group_full[ver]
    const trap_type = master_index.passive_effects.trap_type
    const passivenames = master_index.passivenames
    const equipmentpassivenames = master_index.equipmentpassivenames
    const command_type = master_index.passive_effects.command_type
    const target_range_ = master_index.passive_effects.target_range_
    const ailment_type = master_index.passive_effects.ailment_type

    var require = require_passive[require_]

    const crystal = {
        "1": "Red",
        "2": "Blue",
        "3": "Green",
        "4": "Yellow",
        "5": "Black",
        "6": "White"
    }

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

    switch (value_trans) {
        case "crystal_or":
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
            break;
        case "crystal":
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
            break;
        case "command_id_1":
            var getname0 = CommandNames[require_value1]
            if (require_value1 == -1) {
                require_value1 = " any ability"
            }
            if (getname0 != undefined) {
                require_value1 = `[${CommandNames[require_value1].name}] #${require_value1}`
            }
            break;
        case "command_id":
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
            break;
        case "ailment_id_with":
            var getname4 = AilmentNames[require_value1]
            if (require_value1 == -1) {
                require_value1 = ""
            }
            if (getname4 != undefined) {
                require_value1 = ` with //${AilmentNames[require_value1].icon}// [${AilmentNames[require_value1].name}] #${require_value1}`
            }
            break;
        case "ailment_id_debuff_between":
            var getname5a = AilmentNames[require_value1]
            if (require_value1 == -1) {
                require_value1 = "any debuff"
            }
            if (getname5a != undefined) {
                require_value1 = `//${AilmentNames[require_value1].icon}// [${AilmentNames[require_value1].name}] #${require_value1}`
            }
            if (require_value2 <= 0) {
                require_value2 = ""
                require_value3 = ""
            } else {
                require_value1 = `//${ailment_level_icon(AilmentNames[require_value1],require_value2)}// [${AilmentNames[require_value1].name}] #${require_value1}`
                require_value2 = ` between ${require_value2} - ${require_value3}`
                require_value3 = ""
            }
            break;
        case "ailment_id_1a":
            var getname4a = AilmentNames[require_value1]
            if (getname4a != undefined) {
                require_value1 = ` //${AilmentNames[require_value1].icon}// [${AilmentNames[require_value1].name}] #${require_value1}`
            }
            if (require_value1 == -1) {
                require_value1 = " a"
            }
            break;
        case "ailment_id":
            if (AilmentNames[require_value1] != undefined) {
                require_value1 = ` //${AilmentNames[require_value1].name}// [${AilmentNames[require_value1].name}] #${require_value1}`
            }
            if (require_value1 < 1) {
                require_value1 = ""
            }
            if (AilmentNames[require_value2] != undefined) {
                require_value2 = `, //${AilmentNames[require_value2].icon}// [${AilmentNames[require_value2].name}] #${require_value2}`
            }
            if (require_value2 < 1) {
                require_value2 = ""
            }
            if (AilmentNames[require_value3] != undefined) {
                require_value3 = `, //${AilmentNames[require_value3].icon}// [${AilmentNames[require_value3].name}] #${require_value3}`
            }
            if (require_value3 < 1) {
                require_value3 = ""
            }
            break;
        case "killer_type":
            var getname5 = killer_type[require_value1]
            if (getname5 != undefined) {
                require_value1 = killer_type[require_value1].killer_type
            }
            break;
        case "buffs":
            if (require_value1 > 1) {
                require_value1 = ` at least ${require_value1} buffs`
            } else {
                require_value1 = ""
            }
            break;
        case "ailment_id_1":

            if (AilmentNames[require_value1] != undefined) {
                require_value1 = `//${AilmentNames[require_value1].icon}// [${AilmentNames[require_value1].name}] #${require_value1}`
            } else {
                if (require_value1 == -1) {
                    require_value1 = "any"
                } else {
                    require_value1 = `[${require_value1}] ${require_value1}`
                }
            }
            break;
        case "ailment_id_1_level":
            if (AilmentNames[require_value1] != undefined) {
                require_value1 = `//${ailment_level_icon(AilmentNames[require_value1],require_value2)}// [${AilmentNames[require_value1].name}] #${require_value1}`
            } else {
                if (require_value1 == -1) {
                    require_value1 = "any"
                } else {
                    require_value1 = `[${require_value1}] ${require_value1}`
                }
            }
            break;
        case "ailment_id_1_level3":
            if (AilmentNames[require_value1] != undefined) {
                require_value1 = `//${ailment_level_icon(AilmentNames[require_value1],require_value3)}// [${AilmentNames[require_value1].name}] #${require_value1}`
            } else {
                if (require_value1 == -1) {
                    require_value1 = "any"
                } else {
                    require_value1 = `[${require_value1}] ${require_value1}`
                }
            }
            break;
        case "ailment_id_1_between":
            const ail_data = AilmentNames[require_value1]
            if (ail_data != undefined) {
                if ((require_value3 - require_value2) == 1) {
                    require_value1 = `//${ailment_level_icon(ail_data,require_value2)}// [${ail_data.name}] #${require_value1}`
                    require_value2 = `at level ${require_value2}`
                    require_value3 = ""
                } else {
                    require_value1 = `//${ailment_level_icon(ail_data,require_value2)}// [${ail_data.name}] #${require_value1}`   
                    require_value2 = `between levels ${require_value2} - ${require_value3 - 1}`
                    require_value3 = ""
                }
            } else {
                if (require_value1 == -1) {
                    require_value1 = "any"
                } else {
                    require_value1 = `[${require_value1}] ${require_value1}`
                }
                if ((require_value3 - require_value2) == 1) {
                    require_value2 = `at level ${require_value2}`
                    require_value3 = ""
                } else {
                    require_value2 = `between levels ${require_value2} - ${require_value3 - 1}`
                    require_value3 = ""
                }
            }
            break;
        case "ailment_type_between_nozero":
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
            break;
        case "ailment_id_1_debuff_between_nozero":
            if (AilmentNames[require_value1] != undefined) {
                require_value1 = `//${AilmentNames[require_value1].icon}// [${AilmentNames[require_value1].name}] #${require_value1}`
            } else {
                require_value1 = `debuff`
            }
            if ((require_value3 - 1) < 1) {
                require_value2 = `of at least ${require_value2}`
                require_value3 = ""
            } else {
                require_value2 = `between ${require_value2} - ${require_value3 - 1}`
                require_value3 = ""
            }
            break;
        case "ailment_id_1_buff_between_nozero":
            if (AilmentNames[require_value1] != undefined) {
                require_value1 = `//${AilmentNames[require_value1].icon}// [${AilmentNames[require_value1].name}] #${require_value1}`
            } else {
                require_value1 = `buff`
            }
            if ((require_value3 - 1) < 1) {
                require_value2 = `of at least ${require_value2}`
                require_value3 = ""
            } else {
                require_value2 = `between ${require_value2} - ${require_value3 - 1}`
                require_value3 = ""
            }
            break;
        case "own_party":
            if (require_target == 2) {
                require_str = require_str.replace(/\[target\]/gm, " own")
            }
            if (require_target == 31) {
                require_str = require_str.replace(/\[target\]/gm, " Party")
            }
            break;
        case  "any_0":
            if (require_value1 == 0) {
                require_value1 = "any"
            }
            break;
        case "no_0s":
            if (require_value1 == 0) {
                require_value1 = "no"
            }
            if (require_value1 != 1) {
                require_str += "s"
            }
            break;
        case "elementid_1":
            if (elementid_1[require_value1] != undefined) {
                require_value1 = elementid_1[require_value1].elementid_1
            }
            break;
        case "elementid_2":
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
            break;
        case "attack_type":
            if (attack_type[require_value1] != undefined) {
                require_value1 = attack_type[require_value1].attack_type
            }
            break;
        case "attack_type_single":
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
            break;
        case "attack_type_any":
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
            break;
        case "attack_type_any_elementid_2":
            if (attack_type[require_value1] != undefined) {
                require_value1 = attack_type[require_value1].attack_type
            }
            if (elementid_1[require_value2] != undefined) {
                require_value2 = elementid_1[require_value2].elementid_1
            } else {
                require_value2 = ""
            }
            break;
        case "m_abilities":
            if (require_value1 != 1) {
                require_value1 = `${require_value1} abilities`
            } else {
                require_value1 = `${require_value1} ability`
            }
            break;
        case "targets":
            if (require_value1 != 1) {
                require_value1 = `${require_value1} targets`
                require_value2 = `and less than ${require_value2} targets`
            } else {
                require_value1 = `a single target`
                require_str = require_str.replace(/\[value2\]/gm,"")
            }
            break;
        case "command_group_id":
            if (command_group[require_value1] != undefined) {
                require_value1 = command_group[require_value1].unique
            }
            break;
        case "ailment_group":
            if (ailment_group[require_value1] != undefined) {
                require_value1 = ailment_group[require_value1].unique
            }
            break;
        case "trap_type":
            if (trap_type[require_value1] != undefined) {
                require_value1 = trap_type[require_value1].trap_type == undefined ? "" : trap_type[require_value1].trap_type
            }
            break;
        case "damage_3":
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
            break;
        case "brv_or_hp":
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
            break;
        case "delay_break":
            if (require_value1 == 1) {
                require_value1 = " (including from <BREAK>)"
            } else {
                require_value1 = " (excluding from <BREAK>)"
            }
            break;
        case "ability_type":
            if(ability_type[require_value1] && ability_type[require_value1].ability_type != undefined){
                require_value1 = ability_type[require_value1].ability_type
            }
            break;
        case "gold_frame_3":
            if (require_value2 == 3) {
                require_value2 = `Gold Framed `
            } else {
                require_value2 = ""
            }
            break;
        case "consecutive":
            if (require_value2 == 1) {
                require_value2 = ``
            }
            if (require_value2 == 2) {
                require_value2 = ` (while afflicted with <BREAK>)`
            }
            if (require_value2 == 3) {
                require_value2 = ` (while NOT afflicted with <BREAK>)`
            }
            break;
        case "passive_id":
            if (passivenames[require_value1] != undefined) {
                if (passivenames[require_value1].name && passivenames[require_value1].name != undefined) {
                    require_value1 = `[${passivenames[require_value1].name}]`
                } else {
                    require_value1`[${require_value1}]`
                }
            }
            break;
        case "equipment_id":
            if (equipmentpassivenames[require_value1] != undefined) {
                if (equipmentpassivenames[require_value1].name && equipmentpassivenames[require_value1].name != undefined) {
                    require_value1 = `[${equipmentpassivenames[require_value1].name}]`
                } else {
                    require_value1`[${require_value1}]`
                }
            }
            break;
        case "additional_attack":
            const getattack1 = require_additional_attack(require_value1,"or", 1)
            require_value1 = getattack1
            break;
        case "element_weakness":
            const getweakness4 = require_element_weakness(require_value1, "or", 1)
            require_value1 = getweakness4
            break;
        case "element_weakness_and":
            const getweaknessand = require_element_weakness(require_value1, "and", 1)
            require_value1 = getweaknessand
            break;
        case "element_weakness_additional_attack":
            const getweakness2 = require_element_weakness(require_value1, "or", 1)
            require_value1 = getweakness2
            const getattack2 = require_additional_attack(require_value2,"or", 1)
            require_value2 = getattack2
            break;
        case "command_type":
            const getcommand1 = command_type[require_value1]
            if (getcommand1 != undefined) {
                require_value1 = getcommand1.command_type
            }
            break;
        case "command_type_attack_type_element":
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
            break;
        case "command_type_element_weakness":
            const getcommand2 = command_type[require_value1]
            if (getcommand2 != undefined) {
                require_value1 = getcommand2.command_type
            }
            const getweakness3 = require_element_weakness(require_value2, "and", 1)
            require_value2 = getweakness3
            break;
        case "command_type_element_weakness2":
            const getcommand3 = command_type[require_value1]
            if (getcommand3 != undefined) {
                require_value1 = getcommand3.command_type
            }
            const getweakness6 = require_element_weakness(require_value2, "and", 1)
            require_value2 = getweakness6
            const getweakness5 = require_element_weakness(require_value3, "and", 1)
            require_value3 = getweakness5
            break;
        case "element_other":
            const getother = require_element_weakness(require_value1, "or", 0)
            require_value1 = getother
            break;
        case "buff_count":
            if (require_value1 == 0 && require_value2 <= 1) {
                require_value1 = ``
                require_value2 = `no buffs`
            } else {
                if(require_value1 == 0 && require_value2 > 1){
                    require_value1 = `less than ${require_value2-1} buff${(require_value2 - 1) == 1 ?"":"s"}`
                    require_value2 = ""
                } else {
                    if(require_value2 >= 50){
                        require_value1 = `≥ ${require_value1} buff${(require_value2 - 1) == 1 ?"":"s"}`
                        require_value2 = ""
                    } else {
                        require_value1 = `between ${require_value1} & ${require_value2-1} buff${(require_value2 - 1) == 1 ?"":"s"}`
                        require_value2 = ""
                    }
                    
                }
            }
            break;
        case "debuff_count":
            if (require_value1 == 0 && require_value2 <= 1) {
                require_value1 = ``
                require_value2 = `no debuffs`
            } else {
                if(require_value1 == 0 && require_value2 > 1){
                    require_value1 = `less than ${require_value2-1} debuff${(require_value2 - 1) == 1? "" : "s"}`
                    require_value2 = ""
                } else {
                    if(require_value2 >= 50){
                        require_value1 = `≥ ${require_value1} debuff${(require_value2 - 1) == 1 ?"":"s"}`
                    require_value2 = ""
                    } else {
                        require_value1 = `between ${require_value1} & ${require_value2-1} debuff${(require_value2 - 1) == 1 ?"":"s"}`
                        require_value2 = ""
                    }
                    
                }
            }
            break;
        case "below_above_percent":
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
            break;
        case "type_element":
            if (require_value2 == 1) {
                require_value2 = `damage type`
            } else {
                require_value2 = `elemental`
            }
            break;
        case "at_least_between":
            if (require_value2 >= 100) {
                require_value2 = `at least ${require_value1}%`
                require_value1 = ``
            }
            if (require_value2 <= 99) {
                require_value2 = `between ${require_value2}% - ${require_value1}%`
                require_value1 = ``
            }
            break;
        case "2_debuff":
            if (require_value2 == 1) {
                require_value2 = "de"
            } else {
                require_value2 = ""
            }
            break;
        case "target_range_":
            const getrange = target_range_[require_value1]
            if (getrange != undefined) {
                require_value1 = getrange.target_range_
            }
            break;
        case "neg_active_buffs":
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
            break;
        case "any_buff":
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
            break;
        case "move_cost":
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
            break;
        case "any_0s":
                if (require_value1 != 1) {
                    require_str += "s"
                }
            break;
        default:
            break;
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

    if (require && require.target_trans == "is_noself") {
        final_str = final_str.replace(/Self is /gm, "")
    }

    return final_str
}