export default function hitdata_counter(
    count,

    hit_1,
    hit_2,
    hit_3,
    hit_4,
    hit_5,
    hit_6,
    hit_7,
    hit_8,
    hit_9,
    hit_10,
    hit_11,
    hit_12,
    hit_13,
    hit_14,
    hit_15,
    hit_16,
    hit_17,
    hit_18,
    hit_19,
    hit_20,
    hit_21,
    hit_22,
    hit_23,
    hit_24,
    hit_25,
    hit_26,
    hit_27,
    hit_28,
    hit_29,
    hit_30,
    hit_31,
    hit_32,
    hit_33,
    hit_34,
    hit_35,
    hit_36,
    hit_37,
    hit_38,
    hit_39,
    hit_40
){
    const holder = {
        hit_1: hit_1,
        hit_2: hit_2,
        hit_3: hit_3,
        hit_4: hit_4,
        hit_5: hit_5,
        hit_6: hit_6,
        hit_7: hit_7,
        hit_8: hit_8,
        hit_9: hit_9,
        hit_10: hit_10,
        hit_11: hit_11,
        hit_12: hit_12,
        hit_13: hit_13,
        hit_14: hit_14,
        hit_15: hit_15,
        hit_16: hit_16,
        hit_17: hit_17,
        hit_18: hit_18,
        hit_19: hit_19,
        hit_20: hit_20,
        hit_21: hit_21,
        hit_22: hit_22,
        hit_23: hit_23,
        hit_24: hit_24,
        hit_25: hit_25,
        hit_26: hit_26,
        hit_27: hit_27,
        hit_28: hit_28,
        hit_29: hit_29,
        hit_30: hit_30,
        hit_31: hit_31,
        hit_32: hit_32,
        hit_33: hit_33,
        hit_34: hit_34,
        hit_35: hit_35,
        hit_36: hit_36,
        hit_37: hit_37,
        hit_38: hit_38,
        hit_39: hit_39,
        hit_40: hit_40
    }
    var check = true

    if (holder[`hit_${count}`] == undefined) {
        check = false
    }

    if (check == true
    ) {
        
        //sets to true when run
        var already_checked = false
        //all brv hits
        var all_brv = true
        //BRV + HP and 2 effects - count > 3
        var hp_effect2 = true
        //BRV + effect before and after HP - count > 3
        var hp_effect_before_after = true
        //BRV + HP and 1 effect - count > 2
        var hp_and_effect = true
        //BRV + HP and effect before - count > 2
        var hp_effect_before = true
        //only hp and 2 effects - count == 3
        var single_hp_effect2 = true
        //last attack is hp - count >= 2
        var hp_last = true
        //count - count >= 2
        var alleffects = true

        for (let index = 1; index < (count + 1); index++) {
            if (index != 1) {
                //only all_brv
                if (holder[`hit_${index - 1}`].id != holder[`hit_${index}`].id) {
                    all_brv = false
                }
                //for all others count > 3
                if (index != count && count > 3) {
                    if (index != count - 1) {
                        if (index != count - 2) {
                            if (holder[`hit_${index}`].id != holder[`hit_${index - 1}`].id) {
                                hp_effect2 = false
                                hp_effect_before_after = false
                            }
                        }
                    }
                }
                //for all others count > 2
                if (index != count && count > 2) {
                    if (index != count - 1) {
                        if (holder[`hit_${index}`].id != holder[`hit_${index - 1}`].id) {
                            hp_and_effect = false
                            hp_effect_before = false
                        }
                    }
                }
                //for all others count == 3
                if (index != count && count == 3) {
                    if (index != count - 1) {
                        if (index != count - 2) {
                            if (holder[`hit_${index}`].id != holder[`hit_${index - 1}`].id) {
                                single_hp_effect2 = false
                            }
                        }
                    }
                }
                //for all others count >= 2
                if (count >= 2) {
                    if (holder[`hit_${index}`].id != holder[`hit_${index - 1}`].id) {
                        alleffects = false
                    }
                    if(index != count){
                        if (holder[`hit_${index}`].id != holder[`hit_${index - 1}`].id) {
                            hp_last = false
                        }
                    }
                }
            }
            //for all others count > 3
            if (index != count && count > 3) {
                if (index != count - 1) {
                    if (index != count - 2) {
                        if (holder[`hit_${index}`].atk_type != "BRV") {
                            hp_effect2 = false
                            hp_effect_before_after = false
                        }
                    }
                }
            }
            //for all others count > 2
            if (index != count && count > 2) {
                if (index != count - 1) {
                    if (holder[`hit_${index}`].atk_type != "BRV") {
                        hp_and_effect = false
                        hp_effect_before = false
                    }
                }
            }
            //for all others count == 3
            if (index != count && count == 3) {
                if (index != count - 1) {
                    if (index != count - 2) {
                        if (holder[`hit_${index}`].atk_type != "BRV") {
                            single_hp_effect2 = false
                        }
                    }
                }
            }
            //for all others count >= 2
            if (index != count && count >= 2) {
                if (holder[`hit_${index}`].atk_type != "BRV") {
                    hp_last = false
                }
            }
        }
        if (count > 3) {
            if (holder[`hit_${count - 2}`] == undefined) {
                hp_effect2 = false
                hp_effect_before_after = false
            } else {
                if (holder[`hit_${count - 2}`].atk_type != "HP") {
                    hp_effect2 = false
                }
                if (holder[`hit_${count - 2}`].atk_type != undefined) {
                    hp_effect_before_after = false
                }
                if (holder[`hit_${count - 2}`].atk_str != undefined) {
                    hp_effect_before_after = false
                }
                if (holder[`hit_${count - 2}`].eff_str == undefined) {
                    hp_effect_before_after = false
                }
            }
            if (holder[`hit_${count - 1}`] == undefined) {
                hp_effect2 = false
                hp_effect_before_after = false
            } else {
                if (holder[`hit_${count - 1}`].atk_type != "HP") {
                    hp_effect_before_after = false
                }
                if (holder[`hit_${count - 1}`].atk_type != undefined) {
                    hp_effect2 = false
                }
                if (holder[`hit_${count - 1}`].atk_str != undefined) {
                    hp_effect2 = false
                }
                if (holder[`hit_${count - 1}`].eff_str == undefined) {
                    hp_effect2 = false
                }
            }
            if (holder[`hit_${count}`].atk_type != undefined) {
                hp_effect2 = false
                hp_effect_before_after = false
            }
            if (holder[`hit_${count}`].atk_str != undefined) {
                hp_effect2 = false
                hp_effect_before_after = false
            }
            if (holder[`hit_${count}`].eff_str == undefined) {
                hp_effect2 = false
                hp_effect_before_after = false
            }
            if (holder[`hit_${count - 1}`] != undefined) {
                //not the same effect
                if (holder[`hit_${count - 1}`].id == holder[`hit_${count}`].id) {
                    hp_effect2 = false
                }
                if(holder[`hit_${count + 1}`] != undefined){
                        //not the same as the following effecting
                    if (holder[`hit_${count + 1}`].id == holder[`hit_${count}`].id) {
                        hp_effect2 = false
                    }
                }
            }
            if(holder[`hit_${count + 1}`] != undefined){
                //not the same as the follow effecting
                if (holder[`hit_${count + 1}`].id == holder[`hit_${count}`].id) {
                    hp_effect_before_after = false
                }
            }
        } else {
            hp_effect2 = false
            hp_effect_before_after = false
        }

        if (count > 2) {
            if (holder[`hit_${count}`].atk_type != "HP") {
                hp_effect_before = false
            }
            if (holder[`hit_${count - 1}`] == undefined) {
                hp_and_effect = false
                hp_effect_before = false
            } else {
                if (holder[`hit_${count - 1}`].atk_type != "HP") {
                    hp_and_effect = false
                }
                if (holder[`hit_${count - 1}`].atk_type != undefined) {
                    hp_effect_before = false
                }
                if (holder[`hit_${count - 1}`].atk_str != undefined) {
                    hp_effect_before = false
                }
                if (holder[`hit_${count - 1}`].eff_str == undefined) {
                    hp_effect_before = false
                }
            }
            if (holder[`hit_${count}`].atk_type != undefined) {
                hp_and_effect = false
            }
            if (holder[`hit_${count}`].atk_str != undefined) {
                hp_and_effect = false
            }
            if (holder[`hit_${count}`].eff_str == undefined) {
                hp_and_effect = false
            }
            //check ahead
            if (holder[`hit_${count + 1}`] != undefined){
                if(holder[`hit_${count + 1}`].id == holder[`hit_${count }`].id){
                    hp_and_effect = false
                }
            }
        } else {
            hp_and_effect = false
            hp_effect_before = false
        }

        if (count == 3) {
            if (holder[`hit_${count - 2}`] == undefined) {
                single_hp_effect2 = false
            } else {
                if (holder[`hit_${count - 2}`].atk_type != "HP") {
                    single_hp_effect2 = false
                }
            }
            if (holder[`hit_${count - 1}`] == undefined) {
                single_hp_effect2 = false
            } else {
                if (holder[`hit_${count - 1}`].atk_type != undefined) {
                    single_hp_effect2 = false
                }
                if (holder[`hit_${count - 1}`].atk_str != undefined) {
                    single_hp_effect2 = false
                }
                if (holder[`hit_${count - 1}`].eff_str == undefined) {
                    single_hp_effect2 = false
                }
            }
            if (holder[`hit_${count}`].atk_type != undefined) {
                single_hp_effect2 = false
            }
            if (holder[`hit_${count}`].atk_str != undefined) {
                single_hp_effect2 = false
            }
            if (holder[`hit_${count}`].eff_str == undefined) {
                single_hp_effect2 = false
            }
            if (holder[`hit_${count - 1}`] != undefined) {
                //not the same effect
                if (holder[`hit_${count - 1}`].id == holder[`hit_${count}`].id) {
                    single_hp_effect2 = false
                }
                if(holder[`hit_${count + 1}`] != undefined){
                        //not the same as the following effecting
                    if (holder[`hit_${count + 1}`].id == holder[`hit_${count}`].id) {
                        single_hp_effect2 = false
                    }
                }
            }
        } else {
            single_hp_effect2 = false
        }
        if(count >= 2){
            if (holder[`hit_${count}`].atk_type != undefined) {
                alleffects = false
            }
            if (holder[`hit_${count}`].atk_type != "HP") {
                hp_last = false
            }
        } else {
            hp_last = false
            alleffects = false
        }

        if (all_brv == true && hit_1.atk_type == "BRV") {
            already_checked = true
            if (hit_1.show == undefined) {
                Object.assign(hit_1, {
                    show: true,
                    hit_count: `${count}-Hit `,
                    counter: "all_brv"
                })
                for (let index = 1; index < (count + 1); index++) {
                    if (index != 1) {
                        Object.assign(holder[`hit_${index}`], { show: false, counter: "all_brv" })
                    }
                }
            }
        }

        //start with highest numbers (4+), this is for BRV + HP
        if (already_checked != true && hp_effect2 == true) {
            already_checked = true
            if (hit_1.show == undefined && holder[`hit_${count - 2}`].atk_str != undefined) {
                const hp_str = `+ ${holder[`hit_${count - 2}`].atk_str.replace(/{Attack}/gm, "Attack").replace(/<Melee> /gm, "").replace(/<Ranged> /gm, "").replace(/<Magic> /gm, "")}`
                Object.assign(hit_1, {
                    show: true,
                    hit_count: `${count - 3}-Hit `,
                    atk_type: "HP",
                    atk_hp_str: hp_str,
                    eff_hp_str: holder[`hit_${count - 2}`].eff_str,
                    pot_hp_str: holder[`hit_${count - 2}`].pot_str,
                    hp_id: holder[`hit_${count - 2}`].id,
                    eff_add_str: holder[`hit_${count - 1}`].eff_str,
                    eff_add_str_2: holder[`hit_${count}`].eff_str,
                    after_each_except_last: holder[`hit_${count - 2}`].after_each_except_last,
                    counter: "hp_effect2"
                })
                for (let index = 1; index < (count + 1); index++) {
                    if (index != 1) {
                        Object.assign(holder[`hit_${index}`], { show: false, counter: "hp_effect2" })
                    }
                }
            }
        } else if (already_checked != true && hp_effect_before_after == true) {
            already_checked = true
            if (hit_1.show == undefined && holder[`hit_${count - 1}`].atk_str != undefined) {
                const hp_str = `+ ${holder[`hit_${count - 1}`].atk_str.replace(/{Attack}/gm, "Attack").replace(/<Melee> /gm, "").replace(/<Ranged> /gm, "").replace(/<Magic> /gm, "")}`
                Object.assign(hit_1, {
                    show: true,
                    hit_count: `${count - 3}-Hit `,
                    atk_type: "HP",
                    atk_hp_str: hp_str,
                    eff_hp_str: holder[`hit_${count - 1}`].eff_str,
                    pot_hp_str: holder[`hit_${count - 1}`].pot_str,
                    hp_id: holder[`hit_${count - 1}`].id,
                    eff_add_str: holder[`hit_${count}`].eff_str,
                    eff_before_hp_str: holder[`hit_${count - 2}`].eff_str,
                    after_each_except_last: holder[`hit_${count - 1}`].after_each_except_last,
                    counter: "hp_effect_before_after"
                })
                for (let index = 1; index < (count + 1); index++) {
                    if (index != 1) {
                        Object.assign(holder[`hit_${index}`], { show: false, counter: "hp_effect_before_after" })
                    }
                }
            }
        } else if (already_checked != true && hp_and_effect == true) {
            already_checked = true
            if (hit_1.show == undefined && holder[`hit_${count - 1}`].atk_str != undefined) {
                const hp_str = `+ ${holder[`hit_${count - 1}`].atk_str.replace(/{Attack}/gm, "Attack").replace(/<Melee> /gm, "").replace(/<Ranged> /gm, "").replace(/<Magic> /gm, "")}`
                Object.assign(hit_1, {
                    show: true,
                    hit_count: `${count - 2}-Hit `,
                    atk_type: "HP",
                    atk_hp_str: hp_str,
                    eff_hp_str: holder[`hit_${count - 1}`].eff_str,
                    pot_hp_str: holder[`hit_${count - 1}`].pot_str,
                    hp_id: holder[`hit_${count - 1}`].id,
                    eff_add_str: holder[`hit_${count}`].eff_str,
                    after_each_except_last: holder[`hit_${count - 1}`].after_each_except_last,
                    counter: "hp_and_effect"
                })
                for (let index = 1; index < (count + 1); index++) {
                    if (index != 1) {
                        Object.assign(holder[`hit_${index}`], { show: false, counter: "hp_and_effect" })
                    }
                }
            }
        } else if (already_checked != true && hp_effect_before == true) {
            already_checked = true
            if (hit_1.show == undefined && holder[`hit_${count}`].atk_str != undefined) {
                const hp_str = `+ ${holder[`hit_${count}`].atk_str.replace(/{Attack}/gm, "Attack").replace(/<Melee> /gm, "").replace(/<Ranged> /gm, "").replace(/<Magic> /gm, "")}`
                Object.assign(hit_1, {
                    show: true,
                    hit_count: `${count - 2}-Hit `,
                    atk_type: "HP",
                    atk_hp_str: hp_str,
                    eff_hp_str: holder[`hit_${count}`].eff_str,
                    pot_hp_str: holder[`hit_${count}`].pot_str,
                    hp_id: holder[`hit_${count}`].id,
                    eff_before_hp_str: holder[`hit_${count - 1}`].eff_str,
                    after_each_except_last: holder[`hit_${count}`].after_each_except_last,
                    counter: "hp_effect_before"
                })
                for (let index = 1; index < (count + 1); index++) {
                    if (index != 1) {
                        Object.assign(holder[`hit_${index}`], { show: false, counter: "hp_effect_before" })
                    }
                }
            }
        } else if (already_checked != true && single_hp_effect2 == true) {
            already_checked = true
            if (hit_1.show == undefined && holder[`hit_${count - 2}`].atk_str != undefined) {
                Object.assign(hit_1, {
                    show: true,
                    hit_count: undefined,
                    atk_type: "HP",
                    hp_id: holder[`hit_${count - 2}`].id,
                    eff_add_str: holder[`hit_${count - 1}`].eff_str,
                    eff_add_str_2: holder[`hit_${count}`].eff_str,
                    after_each_except_last: holder[`hit_${count - 2}`].after_each_except_last,
                    counter: "single_hp_effect2"
                })
                for (let index = 1; index < (count + 1); index++) {
                    if (index != 1) {
                        Object.assign(holder[`hit_${index}`], { show: false, counter: "single_hp_effect2" })
                    }
                }
            }
        } else if (already_checked != true && hp_last == true) {
            already_checked = true
            if (hit_1.show == undefined && holder[`hit_${count}`].atk_str != undefined) {
                const hp_str = `+ ${holder[`hit_${count}`].atk_str.replace(/{Attack}/gm, "Attack").replace(/<Melee> /gm, "").replace(/<Ranged> /gm, "").replace(/<Magic> /gm, "")}`
                Object.assign(hit_1, {
                    show: true,
                    hit_count: `${count - 1}-Hit `,
                    atk_type: "HP",
                    atk_hp_str: hp_str,
                    eff_hp_str: holder[`hit_${count}`].eff_str,
                    pot_hp_str: holder[`hit_${count}`].pot_str,
                    hp_id: holder[`hit_${count}`].id,
                    after_each_except_last: holder[`hit_${count}`].after_each_except_last,
                    counter: "hp_last"
                })
                for (let index = 1; index < (count + 1); index++) {
                    if (index != 1) {
                        Object.assign(holder[`hit_${index}`], { show: false, counter: "hp_last" })
                    }
                }
            }
        } else if (already_checked != true && alleffects == true) {
            already_checked = true
            if (hit_1.show == undefined) {
                Object.assign(hit_1, { show: true, repeat_count: ` × ${count}`, counter: "alleffects" })
                for (let index = 1; index < (count + 1); index++) {
                    if (index != 1) {
                        Object.assign(holder[`hit_${index}`], { show: false, counter: "alleffects" })
                    }
                }
            }
        }

        //HP + effect
        if (count == 2) {
            if (hit_1.show == undefined &&
                hit_2.show == undefined &&
                hit_1.eff_hp_str == undefined &&
                hit_1.pot_hp_str == undefined &&
                hit_1.hp_id == undefined &&
                hit_1.atk_type == "HP" &&
                hit_2.atk_type != "HP" &&
                hit_2.atk_type != "BRV" &&
                hit_2.atk_type == undefined &&
                hit_2.atk_str == undefined &&
                hit_2.eff_str != undefined
            ) {
                //look ahead
                if( hit_3 != undefined &&
                    hit_3.id != hit_2.id){
                        Object.assign(hit_1, {
                            show: true,
                            eff_add_str: hit_2.eff_str,
                            counter: "2_count_eff_add_str"
                        })
                        Object.assign(hit_2, { show: false, counter: "2_count_eff_add_str" })
                }
            }
        }
    }
}