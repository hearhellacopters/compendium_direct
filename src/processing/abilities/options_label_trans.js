import ailment_level_icon from "../ailment/ailment_level_icon.js"

export default function options_label_pars(
    label,
    valueA,
    valueB,
    valueC,
    target,
    original_label_,

    master_index,
    ver,
){

    const option_labels = master_index.option_trans_data.option_labels
    const target_data = master_index.option_trans_data.target
    const AilmentNames = master_index.ailments
    const CommandNames = master_index.commands
    const ailment_group = master_index.ailment_group_full[ver]
    const elementid_1 = master_index.passive_effects.elementid_1
    const CondData = master_index.cond

    var label1_pull = label && option_labels[label]

    var value_trans = label && option_labels[label] && option_labels[label].value_trans

    var target_trans = label && option_labels[label] && option_labels[label].target_trans

    var target_str = target && target_data[target] && target_data[target].require_target_

    if (target_str == undefined) {
        target_str = `unknown target #${target}`
    }

    var original_label_str = original_label_ && CommandNames[original_label_] && `[${CommandNames[original_label_].name}] #${original_label_}`

    if (original_label_str == undefined) {
        original_label_str = `[command_id #${original_label_}]`
    }

    var valueA_str = valueA

    var valueB_str = valueB

    var valueC_str = valueC

    var final_str = ""

    if (label1_pull != undefined) {

        final_str = label1_pull.label_str

        switch (value_trans) {
            case "element_id":
                if (elementid_1[valueA] != undefined) {
                    valueA_str = elementid_1[valueA].elementid_1
                }
                break;
            case "ailment_idA_debuffed":
                if (valueA == -1) {
                    if (valueB == 1) {
                        valueB_str = ""
                        valueA_str = "debuffed"
                    }
                    if (valueB != 1) {
                        valueB_str = "not "
                        valueA_str = "debuffed"
                    }
                } else {
                    var ailmentpull = AilmentNames[valueA] ||{}
                    if (ailmentpull != undefined) {
                        if (valueB == 1) {
                            valueB_str = ""
                        }
                        if (valueB != 1) {
                            valueB_str = "not "
                        }
                        valueA_str = `inflicted with //${ailmentpull.icon}// [${ailmentpull.name}] #${valueA}`
    
                    } else {
                        if (valueB == 1) {
                            valueB_str = ""
                        }
                        if (valueB != 1) {
                            valueB_str = "not "
                        }
                        valueA_str = `inflicted with //${ailmentpull.icon}// [${valueA}] #${valueA}`
                    }
                }
                break;
            case "ailment_idA_buffed":
                if (valueA == -1) {
                    if (valueB == 1) {
                        valueB_str = ""
                        valueA_str = "While buffed"
                    }
                    if (valueB != 1) {
                        valueB_str = "While not "
                        valueA_str = "buffed"
                    }
                } else {
                    ailmentpull = AilmentNames[valueA] || {}
                    if (ailmentpull != undefined) {
                        if (valueB == 1) {
                            valueB_str = "A"
                        }
                        if (valueB != 1) {
                            valueB_str = "Ina"
                        }
                        valueA_str = `ctive //${ailmentpull.icon}// [${ailmentpull.name}] #${valueA}`
    
                    } else {
                        if (valueB == 1) {
                            valueB_str = "A"
                        }
                        if (valueB != 1) {
                            valueB_str = "Ina"
                        }
                        valueA_str = `ctive [${valueA}] #${valueA}`
                    }
                }
                break;
            case "times":
                if (valueB == 1) {
                    valueB_str = " 1 time"
                }
                if (valueB != 1) {
                    valueB_str = ` ${valueB} times`
                }
                break;
            case "ailment_idB":
                if (valueB == -1) {
                    valueB_str = `[removed]`
                } else {
                    ailmentpull = AilmentNames[valueB] || {}
                    if (ailmentpull != undefined) {
                        valueB_str = `//${ailment_level_icon(ailmentpull,valueC)}// [${ailmentpull.name}] #${valueB}`
                    } else {
                        valueB_str = `[${valueB}] #${valueB}`
                    }
                }
                break;
            case "equipment_idA_ailment_idB":
                if (valueB == -1) {
                    valueB_str = `[removed]`
                } else {
                    ailmentpull = AilmentNames[valueB] || {}
                    if (ailmentpull != undefined) {
                        valueB_str = `//${ailmentpull.icon}// [${ailmentpull.name}] #${valueB}`
                    } else {
                        valueB_str = `[${valueB}] #${valueB}`
                    }
                }
                break;
            case "equipment_idA_ailment_idB_command_idC":
                if (valueB == -1) {
                    valueB_str = `[removed]`
                } else {
                    ailmentpull = AilmentNames[valueB] || {}
                    if (ailmentpull != undefined) {
                        valueB_str = `//${ailmentpull.icon}// [${ailmentpull.name}] #${valueB}`
                    } else {
                        valueB_str = `[${valueB}] #${valueB}`
                    }
                }
                if (valueC == -1) {
                    valueC_str = `[removed]`
                } else {
                    var commandpull = CommandNames[valueC] && CommandNames[valueC].name
                    if (commandpull != undefined) {
                        valueC_str = `[${commandpull}] #${valueC}`
                    } else {
                        valueC_str = `[${valueC}] #${valueC}`
                    }
                }
                break;
            case "ailment_idB_command_idC":
                if (valueB == -1) {
                    valueB_str = `[removed]`
                } else {
                    ailmentpull = AilmentNames[valueB] || {}
                    if (ailmentpull != undefined) {
                        valueB_str = `//${ailment_level_icon(ailmentpull,valueC)}// [${ailmentpull.name}] #${valueB}`
                    } else {
                        valueB_str = `[${valueB}] #${valueB}`
                    }
                }
                if (valueC == -1) {
                    valueC_str = `[removed]`
                } else {
                    commandpull = CommandNames[valueC] && CommandNames[valueC].name
                    if (commandpull != undefined) {
                        valueC_str = `[${commandpull}] #${valueC}`
                    } else {
                        valueC_str = `[${valueC}] #${valueC}`
                    }
                }
                break;
            case "ailment_idB_ailment_idC":
                if (valueB == -1) {
                    valueB_str = `[removed]`
                } else {
                    ailmentpull = AilmentNames[valueB] ||{}
                    if (ailmentpull != undefined) {
                        valueB_str = `//${ailmentpull.icon}// [${ailmentpull.name}] #${valueB}`
                    } else {
                        valueB_str = `[${valueB}] #${valueB}`
                    }
                }
                if (valueC == -1) {
                    valueC_str = `[removed]`
                } else {
                    ailmentpull = AilmentNames[valueC] || {}
                    valueC_str = `//${ailmentpull.icon}// [${ailmentpull.name}] #${valueC}`
                }
                break;
            case "ailment_idB_timesC":
                if (valueB == -1) {
                    valueB_str = `[removed]`
                } else {
                    ailmentpull = AilmentNames[valueB] || {}
                    if (ailmentpull != undefined) {
                        valueB_str = `//${ailmentpull.icon}// [${ailmentpull.name}] #${valueB}`
                    } else {
                        valueB_str = `[${valueB}] #${valueB}`
                    }
                }
                if (valueC == 1) {
                    valueC_str = " 1 time"
                }
                if (valueC != 1) {
                    valueC_str = ` ${valueC} times`
                }
                break;
            case "ailment_idB_equipment_idA":
                if (valueB == -1) {
                    valueB_str = `[removed]`
                } else {
                    ailmentpull = AilmentNames[valueB] || {}
                    if (ailmentpull != undefined) {
                        valueB_str = `//${ailmentpull.icon}// [${ailmentpull.name}] #${valueB}`
                    } else {
                        valueB_str = `[${valueB}] #${valueB}`
                    }
                }
                break;
            case "ailment_idA":
                if (valueA == -1) {
                    valueA_str = `[removed]`
                } else {
                    ailmentpull = AilmentNames[valueA]  || {}
                    if (ailmentpull != undefined) {
                        valueA_str = `//${ailmentpull.icon}// [${ailmentpull.name}] #${valueA}`
                    } else {
                        valueA_str = `[${valueA}] #${valueA}`
                    }
                }
                break;
            case "ailment_idA_level":
                if (valueA == -1) {
                    valueA_str = `[removed]`
                } else {
                    ailmentpull = AilmentNames[valueA]  || {}
                    if (ailmentpull != undefined) {
                        valueA_str = `//${ailment_level_icon(ailmentpull,valueB)}// [${ailmentpull.name}] #${valueA}`
                    } else {
                        valueA_str = `[${valueA}] #${valueA}`
                    }
                }
                break;
            case "ailment_idA_between_lessthanzero":
                if (valueA == -1) {
                    if (valueB == 0) {
                        valueA_str = ``
                        valueB_str = ` count of less than ${valueC} `
                        valueC_str = ""
                    } else {
                        if (valueB == 1) {
                            valueA_str = ``
                            valueB_str = `ed`
                            valueC_str = ""
                        } else {
                            valueA_str = ``
                            valueB_str = ` count of at least ${valueB}`
                            valueC_str = ""
                        }
                    }
                } else {
                    ailmentpull = AilmentNames[valueA] || {}
                    if (ailmentpull != undefined) {
                        valueA_str = ` //${ailmentpull.icon}// [${ailmentpull.name}] #${valueA}`
                        if (valueB != 1) {
                            valueB_str = ` count of at least ${valueB}`
                            valueC_str = ""
                        } else {
                            valueB_str = ""
                            valueC_str = ""
                        }
                    } else {
                        valueA_str = ` [${valueA}] #${valueA} `
                        if (valueB != 1) {
                            valueB_str = ` count of at least ${valueB}`
                            valueC_str = ""
                        } else {
                            valueB_str = ""
                            valueC_str = ""
                        }
                    }
                }
                break;
            case "equipment_idA_between_lessthanzero":
                if (valueB == 0) {
                    valueA_str = `of `
                    valueB_str = `≤ ${valueC}`
                    valueC_str = ""
                } else {
                    valueA_str = ``
                    valueB_str = `between ${valueB}% - ${valueC}`
                    valueC_str = ""
                }
                break;
            case "equipment_idA":
                //handled elsewhere
                final_str = ""
                //equipmentpull = equipmentpassivenames[valueA] && equipmentpassivenames[valueA].name
                //loc_tag = equipmentpassivenames[valueA] && equipmentpassivenames[valueA].loc_tag
                //if(equipmentpull != undefined){
                //    valueA_str = `[${equipmentpull}]${loc_tag != undefined ? ` <${loc_tag}>` : ""}`
                //} else {
                //    valueA_str = `[#${valueA}]`
                //}
                //if(valueA == -1){
                //    final_str = ""
                //}
                break;
            case "equipment_idA_times":
                if (valueC > valueB) {
                    valueB_str = ` between ${valueB} & ${valueC} times`
                    valueC_str = ""
                }
                if (valueC < valueB) {
                    if (valueB == 1) {
                        valueB_str = ` 1 time`
                    } else {
                        valueB_str = ` ${valueB} times`
                    }
                }
                break;
            case "ailment_groupA":
                ailmentpull = ailment_group[valueA] && ailment_group[valueA].unique
                if (ailmentpull != undefined) {
                    valueA_str = `${ailmentpull}`
                } else {
                    valueA_str = `ailmen_group #${valueA}`
                }
                break;
            case "between_lessthanzero":
                if (valueB == 0) {
                    valueB_str = `≤ ${valueC}`
                    valueC_str = ""
                } else {
                    valueB_str = `between ${valueB}% - ${valueC}`
                    valueC_str = ""
                }
                break;
            case "command_idA_uses":
                commandpull = CommandNames[valueA] && CommandNames[valueA].name
                if (commandpull != undefined) {
                    valueA_str = `[${commandpull}] #${valueA}`
                } else {
                    valueA_str = `[${valueA}] #${valueC}`
                }
                if (valueB == 1) {
                    valueB_str = `1 use`
                } else {
                    valueB_str = `${valueB} uses`
                }
                break;
            case "command_idA_times":
                commandpull = CommandNames[valueA] && CommandNames[valueA].name
                if (commandpull != undefined) {
                    valueA_str = `[${commandpull}] #${valueA}`
                } else {
                    valueA_str = `[${valueA}] #${valueA}`
                }
                if (valueB == 1) {
                    valueB_str = ` 1 time`
                } else {
                    valueB_str = ` ${valueB} times`
                }
                break;
            case "least_under_valueC":
                if (valueB == 0) {
                    valueA_str = `≥ ${valueA}%`
                    valueB_str = ""
                    valueC_str = ""
                }
                if (valueA == 0) {
                    valueA_str = `≤ ${valueB}%`
                    valueB_str = ""
                    valueC_str = ""
                }
                if (valueB != 0 && valueA != 0) {
                    valueA_str = `between ${valueA}% & ${valueB}%`
                    valueB_str = ""
                    valueC_str = ""
                }
                break;
            case "cond_idA":
                const condpull = CondData[valueA] && CondData[valueA].trans
                if (condpull != undefined) {
                    valueA_str = condpull
                } else {
                    valueA_str = `cond #${valueA}`
                }
                break;
            case "target_count":
                if ((valueB + 1) == valueC) {
                    valueB_str = valueB
                    valueC_str = ""
                } else {
                    valueB_str = `at least ${valueB}`
                    valueC_str = ` but less than ${valueC}`
                }
                break;
            default:
                break;
        }

        final_str = final_str.replace(/\[target\]/gm, target_str)
            .replace(/\[valueA\]/gm, valueA_str)
            .replace(/\[valueB\]/gm, valueB_str)
            .replace(/\[valueC\]/gm, valueC_str)
            .replace(/\[original_label_\]/gm, original_label_str)

        switch (target_trans) {
            case "is_noself":
                final_str = final_str.replace(/while Self is buffed with/gm, "Active")
                final_str = final_str.replace(/while buffed with/gm, "Active")
                final_str = final_str.replace(/Self is /gm, "")
                break;
            case "is_noself_any_debuff":
                final_str = final_str.replace(/any target is buffed/gm, "any target is inflicted")
                final_str = final_str.replace(/While Party is buffed with/gm, "Active")
                final_str = final_str.replace(/While Self is buffed with/gm, "Active")
                break;
            case "has_noself":
                final_str = final_str.replace(/Self has /gm, "")
                final_str = final_str.replace(/While Self HP/gm, "While HP")
                break;
            case "total_noself":
                final_str = final_str.replace(/Self total /gm, "")
                break;
            case "has_used_using_noself":
                final_str = final_str.replace(/Self has used/gm, "using")
                break;
            case "has_debuffed":
                final_str = final_str.replace(/has debuffed/gm, "is debuffed")
                break;
            case "self_has_buffed_with":
                final_str = final_str.replace(/While Self has/gm, "Active")
                final_str = final_str.replace(/any target has/gm, "any target is inflicted with")
                final_str = final_str.replace(/Self has/gm, "buffed with")
                break;
            default:
                break;
        }
    }

    return (
        final_str
    )
}