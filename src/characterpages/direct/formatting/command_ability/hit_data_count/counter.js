const counter = (
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
) => {
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
        //all brv hits
        var all_brv = true
        for (let index = 1; index < (count + 1); index++) {
            if (index != 1) {
                if (holder[`hit_${index - 1}`].id != holder[`hit_${index}`].id) {
                    all_brv = false
                }
            }
        }
        if (all_brv == true && hit_1.atk_type == "BRV") {
            if (hit_1.show == undefined) {
                Object.assign(hit_1, {
                    show: true,
                    hit_count: `${count}-Hit `
                })
                for (let index = 1; index < (count + 1); index++) {
                    if (index != 1) {
                        Object.assign(holder[`hit_${index}`], { show: false })
                    }
                }
            }
        }

        if (count > 3) {
            //HP and 2 effects
            var hp_effect2 = true
            for (let index = 1; index < (count + 1); index++) {
                if (index != 1) {
                    if (index != count) {
                        if (index != count - 1) {
                            if (index != count - 2) {
                                if (holder[`hit_${index}`].id != holder[`hit_${index - 1}`].id) {
                                    hp_effect2 = false
                                }
                            }
                        }
                    }
                }
                if (index != count) {
                    if (index != count - 1) {
                        if (index != count - 2) {
                            if (holder[`hit_${index}`].atk_type != "BRV") {
                                hp_effect2 = false
                            }
                        }
                    }
                }
            }
            if (holder[`hit_${count - 2}`] == undefined) {
                hp_effect2 = false
            } else {
                if (holder[`hit_${count - 2}`].atk_type != "HP") {
                    hp_effect2 = false
                }
            }
            if (holder[`hit_${count - 1}`] == undefined) {
                hp_effect2 = false
            } else {
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
            if (holder[`hit_${count}`] == undefined) {
                hp_effect2 = false
            } else {
                if (holder[`hit_${count}`].atk_type != undefined) {
                    hp_effect2 = false
                }
                if (holder[`hit_${count}`].atk_str != undefined) {
                    hp_effect2 = false
                }
                if (holder[`hit_${count}`].eff_str == undefined) {
                    hp_effect2 = false
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
            }
            if (hp_effect2 == true) {
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
                        eff_add_str_2: holder[`hit_${count}`].eff_str
                    })
                    for (let index = 1; index < (count + 1); index++) {
                        if (index != 1) {
                            Object.assign(holder[`hit_${index}`], { show: false })
                        }
                    }
                }
            }

            //HP effect before and after
            var hp_effect_before_after = true
            for (let index = 1; index < (count + 1); index++) {
                if (index != 1) {
                    if (index != count) {
                        if (index != count - 1) {
                            if (index != count - 2) {
                                if (holder[`hit_${index}`].id != holder[`hit_${index - 1}`].id) {
                                    hp_effect_before_after = false
                                }
                            }
                        }
                    }
                }
                if (index != count) {
                    if (index != count - 1) {
                        if (index != count - 2) {
                            if (holder[`hit_${index}`].atk_type != "BRV") {
                                hp_effect_before_after = false
                            }
                        }
                    }
                }
            }
            if (holder[`hit_${count - 1}`] == undefined) {
                hp_effect_before_after = false
            } else {
                if (holder[`hit_${count - 1}`].atk_type != "HP") {
                    hp_effect_before_after = false
                }
            }
            if (holder[`hit_${count - 2}`] == undefined) {
                hp_effect_before_after = false
            } else {
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
            if (holder[`hit_${count}`] == undefined) {
                hp_effect_before_after = false
            } else {
                if (holder[`hit_${count}`].atk_type != undefined) {
                    hp_effect_before_after = false
                }
                if (holder[`hit_${count}`].atk_str != undefined) {
                    hp_effect_before_after = false
                }
                if (holder[`hit_${count}`].eff_str == undefined) {
                    hp_effect_before_after = false
                }
                if(holder[`hit_${count + 1}`] != undefined){
                    //not the same as the follow effecting
                   if (holder[`hit_${count + 1}`].id == holder[`hit_${count}`].id) {
                        hp_effect_before_after = false
                   }
               }
            }
            if (hp_effect_before_after == true && count > 3) {
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
                        eff_before_hp_str: holder[`hit_${count - 2}`].eff_str
                    })
                    for (let index = 1; index < (count + 1); index++) {
                        if (index != 1) {
                            Object.assign(holder[`hit_${index}`], { show: false })
                        }
                    }
                }
            }
        }

        if (count > 2) {
            //HP and effect
            var hp_and_effect = true
            for (let index = 1; index < (count + 1); index++) {
                if (index != 1) {
                    if (index != count) {
                        if (index != count - 1) {
                            if (holder[`hit_${index}`].id != holder[`hit_${index - 1}`].id) {
                                hp_and_effect = false
                            }
                        }
                    }
                }
                if (index != count) {
                    if (index != count - 1) {
                        if (holder[`hit_${index}`].atk_type != "BRV") {
                            hp_and_effect = false
                        }
                    }
                }
            }
            if (holder[`hit_${count - 1}`] == undefined) {
                hp_and_effect = false
            } else {
                if (holder[`hit_${count - 1}`].atk_type != "HP") {
                    hp_and_effect = false
                }
            }
            if (holder[`hit_${count}`] == undefined) {
                hp_and_effect = false
            } else {
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
            }
            if (hp_and_effect == true) {
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
                        eff_add_str: holder[`hit_${count}`].eff_str
                    })
                    for (let index = 1; index < (count + 1); index++) {
                        if (index != 1) {
                            Object.assign(holder[`hit_${index}`], { show: false })
                        }
                    }
                }
            }

            //HP and effect before
            var hp_effect_before = true
            for (let index = 1; index < (count + 1); index++) {
                if (index != 1) {
                    if (index != count) {
                        if (index != count - 1) {
                            if (holder[`hit_${index}`].id != holder[`hit_${index - 1}`].id) {
                                hp_effect_before = false
                            }
                        }
                    }
                }
                if (index != count) {
                    if (index != count - 1) {
                        if (holder[`hit_${index}`].atk_type != "BRV") {
                            hp_effect_before = false
                        }
                    }
                }
            }
            if (holder[`hit_${count}`] == undefined) {
                hp_effect_before = false
            } else {
                if (holder[`hit_${count}`].atk_type != "HP") {
                    hp_effect_before = false
                }
            }
            if (holder[`hit_${count - 1}`] == undefined) {
                hp_effect_before = false
            } else {
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
            if (hp_effect_before == true) {
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
                        eff_before_hp_str: holder[`hit_${count - 1}`].eff_str
                    })
                    for (let index = 1; index < (count + 1); index++) {
                        if (index != 1) {
                            Object.assign(holder[`hit_${index}`], { show: false })
                        }
                    }
                }
            }
        }

        if (count > 1) {
            //last attack is hp
            var hp_last = true
            for (let index = 1; index < (count + 1); index++) {
                if (index != 1) {
                    if (index != count) {
                        if (holder[`hit_${index}`].id != holder[`hit_${index - 1}`].id) {
                            hp_last = false
                        }
                    }
                }
                if (index != count) {
                    if (holder[`hit_${index}`].atk_type != "BRV") {
                        hp_last = false
                    }
                }
            }
            if (holder[`hit_${count}`] == undefined) {
                hp_last = false
            } else {
                if (holder[`hit_${count}`].atk_type != "HP") {
                    hp_last = false
                }
            }
            if (hp_last == true) {
                if (hit_1.show == undefined && holder[`hit_${count}`].atk_str != undefined) {
                    const hp_str = `+ ${holder[`hit_${count}`].atk_str.replace(/{Attack}/gm, "Attack").replace(/<Melee> /gm, "").replace(/<Ranged> /gm, "").replace(/<Magic> /gm, "")}`
                    Object.assign(hit_1, {
                        show: true,
                        hit_count: `${count - 1}-Hit `,
                        atk_type: "HP",
                        atk_hp_str: hp_str,
                        eff_hp_str: holder[`hit_${count}`].eff_str,
                        pot_hp_str: holder[`hit_${count}`].pot_str,
                        hp_id: holder[`hit_${count}`].id
                    })
                    for (let index = 1; index < (count + 1); index++) {
                        if (index != 1) {
                            Object.assign(holder[`hit_${index}`], { show: false })
                        }
                    }
                }
            }
            //count
            var alleffects = true
            for (let index = 1; index < (count + 1); index++) {
                if (index != 1) {
                    if (holder[`hit_${index}`].id != holder[`hit_${index - 1}`].id) {
                        alleffects = false
                    }
                }
            }
            if (holder[`hit_${count}`] == undefined) {
                alleffects = false
            } else {
                if (holder[`hit_${count}`].atk_type != undefined) {
                    alleffects = false
                }
            }
            if (alleffects == true) {
                if (hit_1.show == undefined) {
                    Object.assign(hit_1, { show: true, repeat_count: ` × ${count}` })
                    for (let index = 1; index < (count + 1); index++) {
                        if (index != 1) {
                            Object.assign(holder[`hit_${index}`], { show: false })
                        }
                    }
                }
            }
        }

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
                Object.assign(hit_1, {
                    show: true,
                    eff_add_str: hit_2.eff_str
                })
                Object.assign(hit_2, { show: false })
            }
        }
    }
}
export default counter