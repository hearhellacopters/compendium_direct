const timeser = (
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
        //all hp hits
        var all_hp = true
        for (let index = 2; index < (count + 1); index++) {
            if (holder[`hit_${index - 1}`].id != holder[`hit_${index}`].id) {
                all_hp = false
            }
            if (holder[`hit_${index - 1}`].atk_hp_str != holder[`hit_${index}`].atk_hp_str) {
                all_hp = false
            }
            if (holder[`hit_${index - 1}`].hit_count != holder[`hit_${index}`].hit_count) {
                all_hp = false
            }
            if (holder[`hit_${index - 1}`].atk_type != holder[`hit_${index}`].atk_type) {
                all_hp = false
            }
        }
        if (all_hp == true) {
            var show_true = true
            for (let index = 1; index < (count + 1); index++) {
                if (holder[`hit_${index}`].show == false) {
                    show_true = false
                }
            }
            if (show_true == true) {
                var all_effects = true
                for (let index = 1; index < (count + 1); index++) {
                    if (index != 1) {
                        if (holder[`hit_${index - 1}`].eff_add_str != holder[`hit_${index}`].eff_add_str) {
                            all_effects = false
                        }
                        if (holder[`hit_${index - 1}`].eff_add_str_2 != holder[`hit_${index}`].eff_add_str_2) {
                            all_effects = false
                        }
                    }
                    if (index != count) {
                        if (holder[`hit_${index}`].eff_before_hp_str != undefined) {
                            all_effects = false
                        }
                    }
                }
                if (all_effects == true) {
                    Object.assign(hit_1, {
                        show: true,
                        times_count: ` ${count} times`,
                        eff_before_hp_str: holder[`hit_${count}`].eff_before_hp_str,
                        timers: "all_effects"
                    })
                    for (let index = 1; index < (count + 1); index++) {
                        if (index != 1) {
                            Object.assign(holder[`hit_${index}`], { show: false, timers: "all_effects" })
                        }
                    }
                } else {
                    var but_eff_add_str = true
                    for (let index = 1; index < (count + 1); index++) {
                        if (index != 1) {
                            if (index != count) {
                                if (holder[`hit_${index - 1}`].eff_add_str != holder[`hit_${index}`].eff_add_str) {
                                    but_eff_add_str = false
                                }
                            }
                            if (holder[`hit_${index - 1}`].eff_add_str_2 != holder[`hit_${index}`].eff_add_str_2) {
                                but_eff_add_str = false
                            }
                        }
                        if (index == count) {
                            if (holder[`hit_${index - 1}`].eff_add_str == holder[`hit_${index}`].eff_add_str) {
                                but_eff_add_str = false
                            }
                        }
                        if (index != count) {
                            if (holder[`hit_${index}`].eff_before_hp_str != undefined) {
                                but_eff_add_str = false
                            }
                        }
                    }
                    if (but_eff_add_str == true) {
                        Object.assign(hit_1, {
                            show: true,
                            times_count: ` ${count} times`,
                            eff_det_str: holder[`hit_${count}`].eff_add_str,
                            except_last: true,
                            eff_before_hp_str: holder[`hit_${count}`].eff_before_hp_str,
                            timers: "but_eff_add_str"
                        })
                        for (let index = 1; index < (count + 1); index++) {
                            if (index != 1) {
                                Object.assign(holder[`hit_${index}`], { show: false, timers: "but_eff_add_str" })
                            }
                        }
                    }
                    var but_eff_add_str_2 = true
                    for (let index = 1; index < (count + 1); index++) {
                        if (index != 1) {
                            if (index != count) {
                                if (holder[`hit_${index - 1}`].eff_add_str_2 != holder[`hit_${index}`].eff_add_str_2) {
                                    but_eff_add_str_2 = false
                                }
                            }
                            if (holder[`hit_${index - 1}`].eff_add_str != holder[`hit_${index}`].eff_add_str) {
                                but_eff_add_str_2 = false
                            }
                        }
                        if (index == count) {
                            if (holder[`hit_${index - 1}`].eff_add_str_2 == holder[`hit_${index}`].eff_add_str_2) {
                                but_eff_add_str_2 = false
                            }
                        }
                        if (index != count) {
                            if (holder[`hit_${index}`].eff_before_hp_str != undefined) {
                                but_eff_add_str_2 = false
                            }
                        }
                    }
                    if (but_eff_add_str_2 == true) {
                        Object.assign(hit_1, {
                            show: true,
                            times_count: ` ${count} times`,
                            eff_det_str_2: holder[`hit_${count}`].eff_add_str_2,
                            except_last_2: true,
                            eff_before_hp_str: holder[`hit_${count}`].eff_before_hp_str,
                            timers: "but_eff_add_str_2"
                        })
                        for (let index = 1; index < (count + 1); index++) {
                            if (index != 1) {
                                Object.assign(holder[`hit_${index}`], { show: false, timers: "but_eff_add_str_2" })
                            }
                        }
                    }
                    var no_eff_add_str = true
                    for (let index = 1; index < (count + 1); index++) {
                        if (index != 1) {
                            if (index != count) {
                                if (holder[`hit_${index - 1}`].eff_add_str_2 != holder[`hit_${index}`].eff_add_str_2) {
                                    no_eff_add_str = false
                                }
                                if (holder[`hit_${index - 1}`].eff_add_str != holder[`hit_${index}`].eff_add_str) {
                                    no_eff_add_str = false
                                }
                            }
                        }
                        if (index == count) {
                            if (holder[`hit_${index - 1}`].eff_add_str == holder[`hit_${index}`].eff_add_str) {
                                no_eff_add_str = false
                            }
                            if (holder[`hit_${index - 1}`].eff_add_str_2 == holder[`hit_${index}`].eff_add_str_2) {
                                no_eff_add_str = false
                            }
                        }
                        if (index != count) {
                            if (holder[`hit_${index}`].eff_before_hp_str != undefined) {
                                no_eff_add_str = false
                            }
                        }
                    }
                    if (no_eff_add_str == true) {
                        var eff_det_str_holder = holder[`hit_${count}`].eff_add_str
                        var eff_det_str_2_holder = holder[`hit_${count}`].eff_add_str_2
                        var except_last = true
                        var except_last_2 = true
                        //cross check
                        if(hit_1.eff_add_str_2 == holder[`hit_${count}`].eff_add_str){
                            eff_det_str_holder = undefined
                            except_last_2 = undefined
                        }
                        if(hit_1.eff_add_str == holder[`hit_${count}`].eff_add_str_2){
                            eff_det_str_2_holder = undefined
                            except_last = undefined
                        }
                        Object.assign(hit_1, {
                            show: true,
                            times_count: ` ${count} times`,
                            eff_det_str: eff_det_str_holder,
                            except_last: except_last,
                            eff_det_str_2: eff_det_str_2_holder,
                            except_last_2: except_last_2,
                            eff_before_hp_str: holder[`hit_${count}`].eff_before_hp_str,
                            timers: "no_eff_add_str"
                        })
                        for (let index = 1; index < (count + 1); index++) {
                            if (index != 1) {
                                Object.assign(holder[`hit_${index}`], { show: false, timers: "no_eff_add_str" })
                            }
                        }
                    }
                }
            }
        }

    }
}
export default timeser