import val_edit_type_handler from "./val_edit_type_handler"
import split_by_2 from "./split_by_2_handler"

const ailment_data_pars = (
    ailment_id,
    effect_id,
    val_type,
    val_specify,
    val_edit_type,
    cond_id,
    rank_table,
    is_buff,
    effect_num,

    master_index,
    ver,

    AugValue1,
    AugValue2,
    max_level,
    rank,
    alt_rank,
    alt_aug1,
    alt_aug2,
    value_trans_override,
) => {

    const AilmentNames = master_index.ailments
    const CastNames = master_index.cast_names
    const CommandNames = master_index.commands
    const CondData = master_index.cond
    const MessageData_FFSeries = master_index.ffseries
    const MessageData_Category = master_index.weaponcat
    const ailment_group = master_index.ailment_group_full[ver]
    const command_group = master_index.command_group_full[ver]
    const char_id = master_index.charid

    const EffectID = master_index.ailment_effect_id_index.effect_id
    const ValType = master_index.ailment_effect_id_index.val_type
    const ValEditType = master_index.ailment_effect_id_index.val_edit_type
    const EffectValueType = master_index.ailment_effect_id_index.effect_value_type
    const EffectTypeID = master_index.ailment_effect_id_index.effect_type_id
    const EffectID53 = master_index.ailment_effect_id_index.effect_id_53
    const MessageData_Game = master_index.ailment_effect_id_index.MessageData_Game

    var valeditpull = ValEditType[val_edit_type]

    var val_edit_typestr = valeditpull == undefined ? `※ Unknown val_edit_type ${val_edit_type}` : val_edit_type != 0 ? valeditpull.val_edit_type : val_edit_type

    var ValEditTypeShow = false //for important val_type

    if (val_edit_type == 9 ||
        val_edit_type == 16 ||
        val_edit_type == 19 ||
        val_edit_type == 20 ||
        val_edit_type == 21 ||
        val_edit_type == 22 ||
        val_edit_type == 23 ||
        val_edit_type == 24 ||
        val_edit_type == 25 ||
        val_edit_type == 27) {
        ValEditTypeShow = true
    }

    var effectstrpull = EffectID[effect_id]

    var hidden = EffectID[effect_id] && EffectID[effect_id].hidden

    var condstr = undefined

    if (cond_id != -1 && cond_id != undefined) {
        if (ver == "GL") {
            if (CondData[cond_id] && CondData[cond_id].GLtrans != undefined) {
                condstr = CondData[cond_id].GLtrans
            } else {
                const cond_pull = CondData[cond_id] && CondData[cond_id].trans
                condstr = cond_pull == undefined ? `Cond #${cond_id}` : cond_pull
            }
        } else {
            const cond_pull = CondData[cond_id] && CondData[cond_id].trans
            condstr = cond_pull == undefined ? `Cond #${cond_id}` : cond_pull
        }
    }

    //set max level

    var setmaxlevel = undefined

    if (max_level != undefined) {
        setmaxlevel = max_level
    }

    if (max_level == -1) {
        if (AugValue2 != undefined) {
            setmaxlevel = AugValue2
        } else {
            setmaxlevel = 10
        }
    }


    if (is_buff == 1 && effect_id != -1) {
        var effectstr = effectstrpull && effectstrpull.buff_string && effectstrpull.buff_string
    } else {
        effectstr = effectstrpull && effectstrpull.debuff_string && effectstrpull.debuff_string
    }

    if (effectstr == undefined) {
        effectstr = `Unknown effect #${effect_id}`
    }

    if (effect_id == -1) {
        effectstr = `Removed effect`
    }

    if (val_edit_type == 8) {
        effectstr = effectstr && effectstr.replace(/\[value1\]/gm, val_edit_typestr)
    }

    if (effect_id == 53) {
        var effect53trpull = EffectID53[parseInt(`${ailment_id}-${effect_num}`)]
        if (effect53trpull && effect53trpull.true_effect_id_number != -1) {
            var effect53strpull2 = effect53trpull && EffectID[effect53trpull.true_effect_id_number]
            effectstrpull = effect53strpull2
            var effect53str = `Unknown ${ailment_id} -  effect ${effect_num}`
            if (is_buff == 1) {
                if (effect53strpull2.buff_string != undefined) {
                    effect53str = effect53strpull2 && " " + effect53strpull2.buff_string
                }
                effectstr += effect53str
            } else {
                if (effect53strpull2.debuff_string != undefined) {
                    effect53str = effect53strpull2 && " " + effect53strpull2.debuff_string
                }
                effectstr += effect53str
            }
        } else {
            if (is_buff == 1) {
                effectstrpull = effect53trpull
                effectstr += effect53trpull && " " + effect53trpull.buff_string
            } else {
                effectstrpull = effect53trpull
                effectstr += effect53trpull && " " + effect53trpull.debuff_string
            }
        }
    }

    var slidertype = "ranks" //static
    var multiply = false //multiplier true/false
    var multiplyslider = undefined //multiplier slider
    var defaultrank = 1 //rank
    var ValTypeShow = false //for important val_type
    var val_typestr = `• val_type ${val_type}`

    if (val_type == 0) {
        ValTypeShow = false
        val_typestr = undefined
        slidertype = "ranks"
        if (rank != undefined) {
            defaultrank = rank
        }
    }

    if (val_type == 1 && rank_table == -1) {
        val_typestr = "• Values come from Command's Cast AugValue1"
        slidertype = "ranks"
    }
    if (val_type == 1 && rank_table != -1) {
        val_typestr = "• Rank come from Command's Cast AugValue1"
        slidertype = "ranks"
        if (AugValue1 != undefined) {
            defaultrank = AugValue1
        }
    }
    if (val_type == 2 && rank_table == -1) {
        val_typestr = "• Values come from Command's Cast AugValue2"
        slidertype = "ranks"
    }
    if (val_type == 2 && rank_table != -1) {
        val_typestr = "• Rank come from Command's Cast AugValue2"
        slidertype = "ranks"
        if (AugValue2 != undefined) {
            defaultrank = AugValue2
        }
    }
    if (val_type == 3) {
        val_typestr = "• Rank increases by values in Command's Cast ArgValue1"
        slidertype = "levels"
        if (AugValue1 != undefined) {
            defaultrank = AugValue1
        }
    }
    if (val_type == 4) {
        val_typestr = "• Uses ranks 6-10 as 1-5 (6-10 now repeat)"
        slidertype = "levels"
        if (AugValue1 != undefined) {
            defaultrank = AugValue1
        }
    }
    if (val_type == 5) {
        val_typestr = "• Value from Summon Rank"
        slidertype = "ranks"
        if (rank != undefined) {
            defaultrank = rank
        }
    }
    if (val_type == 6) {
        val_typestr = "• Use effects val_specify for value"
        slidertype = "ranks"
        if (rank != undefined) {
            defaultrank = rank
        }
    }
    if (val_type == 7) {
        val_typestr = "• Per debuff present on target"
        ValTypeShow = true
        slidertype = "debuffsrank"
    }
    if (val_type == 8) {
        val_typestr = "• Split effect_1 5 ways (old)"
        slidertype = "ranks"
        if (rank != undefined) {
            defaultrank = rank
        }
    }
    if (val_type == 9) {
        val_typestr = "• Doubles value if there are two or more enemies on the field"
        ValTypeShow = true
        slidertype = "ranks"
        if (rank != undefined) {
            defaultrank = rank
        }
    }
    if (val_type == 10) {
        val_typestr = "• Per turns remaining"
        ValTypeShow = true
        slidertype = "turns"
    }
    if (val_type == 11) {
        val_typestr = "• Per debuffs on enemy"
        ValTypeShow = true
        slidertype = "debuffsrank"
    }
    if (val_type == 12) {
        val_typestr = "• Number of times effect is active"
        ValTypeShow = true
        slidertype = "rank"
        if (rank != undefined) {
            defaultrank = rank
        }
    }
    if (val_type == 14) {
        const debuffname14 = AilmentNames[val_specify]
        val_typestr = `• Per levels of [${debuffname14 && debuffname14.name}] - #${val_specify} on target`
        ValTypeShow = true
        slidertype = "stacks"
    }
    if (val_type == 16) {
        const debuffname16 = AilmentNames[val_specify]
        val_typestr = `• Per levels of [${debuffname16 && debuffname16.name}] - #${val_specify} on target`
        ValTypeShow = true
        slidertype = "stacks"
    }
    if (val_type == 18) {
        val_typestr = `• Per debuffs on all enemies`
        ValTypeShow = true
        slidertype = "debuffsrank"
    }
    if (val_type == 20) {
        val_typestr = `• Per number of enemies`
        ValTypeShow = true
        slidertype = "enemies"
    }
    if (defaultrank < 1) {
        defaultrank = 1
    }

    if (val_edit_type == 16) {
        multiply = true
        multiplyslider = "debuffsmuliply"
    }
    if (val_edit_type == 19) {
        multiply = true
        multiplyslider = "buffsmuliply"
    }
    if (val_edit_type == 25) {
        multiply = true
        multiplyslider = "debuffsmuliply"
    }
    if (val_edit_type == 27) {
        multiply = true
        multiplyslider = "debuffsmuliply"
    }

    var tables = {
        rank1: {
            value1: rank_table && rank_table.rank1
        },
        rank2: {
            value1: rank_table && rank_table.rank2
        },
        rank3: {
            value1: rank_table && rank_table.rank3
        },
        rank4: {
            value1: rank_table && rank_table.rank4
        },
        rank5: {
            value1: rank_table && rank_table.rank5
        },
        rank6: {
            value1: rank_table && rank_table.rank6
        },
        rank7: {
            value1: rank_table && rank_table.rank7
        },
        rank8: {
            value1: rank_table && rank_table.rank8
        },
        rank9: {
            value1: rank_table && rank_table.rank9
        },
        rank10: {
            value1: rank_table && rank_table.rank10
        },
        effectstr: effectstr,
        cond_id: condstr,
        val_typestr: val_typestr,
        val_edit_typestr: val_edit_typestr,
        ValEditTypeShow: ValEditTypeShow,
        ValTypeShow: ValTypeShow,
        slidertype: slidertype,
        multiply: multiply,
        multiplyslider: multiplyslider,
        defaultrank: defaultrank,
        hidden: hidden
    }


    if (rank == -1) {
        if (alt_rank != undefined && alt_rank != 0 && val_type != 3 && val_type != 4 && val_type != 20) {
            tables = {
                rank1: {
                    value1: alt_rank
                },
                rank2: {
                    value1: alt_rank
                },
                rank3: {
                    value1: alt_rank
                },
                rank4: {
                    value1: alt_rank
                },
                rank5: {
                    value1: alt_rank
                },
                rank6: {
                    value1: alt_rank
                },
                rank7: {
                    value1: alt_rank
                },
                rank8: {
                    value1: alt_rank
                },
                rank9: {
                    value1: alt_rank
                },
                rank10: {
                    value1: alt_rank
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        }
    }


    if (alt_aug1 != undefined && alt_aug1 != 0) {
        if (val_type == 1 || val_type == 3 || val_type == 4) {
            tables = {
                rank1: {
                    value1: alt_aug1
                },
                rank2: {
                    value1: alt_aug1
                },
                rank3: {
                    value1: alt_aug1
                },
                rank4: {
                    value1: alt_aug1
                },
                rank5: {
                    value1: alt_aug1
                },
                rank6: {
                    value1: alt_aug1
                },
                rank7: {
                    value1: alt_aug1
                },
                rank8: {
                    value1: alt_aug1
                },
                rank9: {
                    value1: alt_aug1
                },
                rank10: {
                    value1: alt_aug1
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        }
    }

    if (alt_aug2 != undefined && alt_aug2 != 0) {
        if (val_type == 2) {
            tables = {
                rank1: {
                    value1: alt_aug2
                },
                rank2: {
                    value1: alt_aug2
                },
                rank3: {
                    value1: alt_aug2
                },
                rank4: {
                    value1: alt_aug2
                },
                rank5: {
                    value1: alt_aug2
                },
                rank6: {
                    value1: alt_aug2
                },
                rank7: {
                    value1: alt_aug2
                },
                rank8: {
                    value1: alt_aug2
                },
                rank9: {
                    value1: alt_aug2
                },
                rank10: {
                    value1: alt_aug2
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        }
    }


    const neg_flag = effectstrpull && effectstrpull.neg_flag
    const value_trans = value_trans_override != undefined ? value_trans_override : effectstrpull && effectstrpull.value_trans
    const default_value = effectstrpull && effectstrpull.default
    const use_neg = effectstrpull && effectstrpull.use_neg

    if (val_type == 0) {
        if (rank_table != -1) {
            const rank1 = val_edit_type_handler(val_edit_type, tables.rank1.value1)
            const rank2 = val_edit_type_handler(val_edit_type, tables.rank2.value1)
            const rank3 = val_edit_type_handler(val_edit_type, tables.rank3.value1)
            const rank4 = val_edit_type_handler(val_edit_type, tables.rank4.value1)
            const rank5 = val_edit_type_handler(val_edit_type, tables.rank5.value1)
            const rank6 = val_edit_type_handler(val_edit_type, tables.rank6.value1)
            const rank7 = val_edit_type_handler(val_edit_type, tables.rank7.value1)
            const rank8 = val_edit_type_handler(val_edit_type, tables.rank8.value1)
            const rank9 = val_edit_type_handler(val_edit_type, tables.rank9.value1)
            const rank10 = val_edit_type_handler(val_edit_type, tables.rank10.value1)
            if (neg_flag == true) {
                const rank_vals = []
                if (rank1 != 0) {
                    rank_vals.push(rank1)
                }
                if (rank2 != 0) {
                    rank_vals.push(rank2)
                }
                if (rank3 != 0) {
                    rank_vals.push(rank3)
                }
                if (rank4 != 0) {
                    rank_vals.push(rank4)
                }
                if (rank5 != 0) {
                    rank_vals.push(rank5)
                }
                if (rank6 != 0) {
                    rank_vals.push(rank6)
                }
                if (rank7 != 0) {
                    rank_vals.push(rank7)
                }
                if (rank8 != 0) {
                    rank_vals.push(rank8)
                }
                if (rank9 != 0) {
                    rank_vals.push(rank9)
                }
                if (rank10 != 0) {
                    rank_vals.push(rank10)
                }
                if (defaultrank == 1 && rank1 != 0) {
                    if (rank1 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank1 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                if (rank_vals.length != 0) {
                    if (rank_vals[0] < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank_vals[0] > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                if (defaultrank == 2 && rank2 != 0) {
                    if (rank2 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank2 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                if (defaultrank == 3 && rank3 != 0) {
                    if (rank3 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank3 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                if (defaultrank == 4 && rank4 != 0) {
                    if (rank4 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank4 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                if (defaultrank == 5 && rank5 != 0) {
                    if (rank5 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank5 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                if (defaultrank == 6 && rank6 != 0) {
                    if (rank6 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank6 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                if (defaultrank == 7 && rank7 != 0) {
                    if (rank7 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank7 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                if (defaultrank == 8 && rank8 != 0) {
                    if (rank8 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank8 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                if (defaultrank == 9 && rank9 != 0) {
                    if (rank9 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank9 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                if (defaultrank == 10 && rank10 != 0) {
                    if (rank10 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank10 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
            }
            if (use_neg == true) {
                tables = {
                    rank1: {
                        value1: rank1
                    },
                    rank2: {
                        value1: rank2
                    },
                    rank3: {
                        value1: rank3
                    },
                    rank4: {
                        value1: rank4
                    },
                    rank5: {
                        value1: rank5
                    },
                    rank6: {
                        value1: rank6
                    },
                    rank7: {
                        value1: rank7
                    },
                    rank8: {
                        value1: rank8
                    },
                    rank9: {
                        value1: rank9
                    },
                    rank10: {
                        value1: rank10
                    },
                    effectstr: effectstr,
                    cond_id: condstr,
                    val_typestr: val_typestr,
                    val_edit_typestr: val_edit_typestr,
                    ValEditTypeShow: ValEditTypeShow,
                    ValTypeShow: ValTypeShow,
                    slidertype: slidertype,
                    multiply: multiply,
                    multiplyslider: multiplyslider,
                    defaultrank: defaultrank,
                    hidden: hidden
                }
            } else {
                tables = {
                    rank1: {
                        value1: Math.abs(rank1)
                    },
                    rank2: {
                        value1: Math.abs(rank2)
                    },
                    rank3: {
                        value1: Math.abs(rank3)
                    },
                    rank4: {
                        value1: Math.abs(rank4)
                    },
                    rank5: {
                        value1: Math.abs(rank5)
                    },
                    rank6: {
                        value1: Math.abs(rank6)
                    },
                    rank7: {
                        value1: Math.abs(rank7)
                    },
                    rank8: {
                        value1: Math.abs(rank8)
                    },
                    rank9: {
                        value1: Math.abs(rank9)
                    },
                    rank10: {
                        value1: Math.abs(rank10)
                    },
                    effectstr: effectstr,
                    cond_id: condstr,
                    val_typestr: val_typestr,
                    val_edit_typestr: val_edit_typestr,
                    ValEditTypeShow: ValEditTypeShow,
                    ValTypeShow: ValTypeShow,
                    slidertype: slidertype,
                    multiply: multiply,
                    multiplyslider: multiplyslider,
                    defaultrank: defaultrank,
                    hidden: hidden
                }
            }
        }
    }
    if (val_type == 1) {
        if (rank_table != -1) {
            const rank1 = val_edit_type_handler(val_edit_type, tables.rank1.value1)
            if (neg_flag == true) {
                if (rank1 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank1 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            const rank2 = val_edit_type_handler(val_edit_type, tables.rank2.value1)
            if (neg_flag == true) {
                if (rank2 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank2 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            const rank3 = val_edit_type_handler(val_edit_type, tables.rank3.value1)
            if (neg_flag == true) {
                if (rank3 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank3 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            const rank4 = val_edit_type_handler(val_edit_type, tables.rank4.value1)
            if (neg_flag == true) {
                if (rank4 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank4 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            const rank5 = val_edit_type_handler(val_edit_type, tables.rank5.value1)
            if (neg_flag == true) {
                if (rank5 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank5 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            const rank6 = val_edit_type_handler(val_edit_type, tables.rank6.value1)
            if (neg_flag == true) {
                if (rank6 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank6 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            const rank7 = val_edit_type_handler(val_edit_type, tables.rank7.value1)
            if (neg_flag == true) {
                if (rank7 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank7 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            const rank8 = val_edit_type_handler(val_edit_type, tables.rank8.value1)
            if (neg_flag == true) {
                if (rank8 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank8 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            const rank9 = val_edit_type_handler(val_edit_type, tables.rank9.value1)
            if (neg_flag == true) {
                if (rank9 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank9 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            const rank10 = val_edit_type_handler(val_edit_type, tables.rank10.value1)
            if (neg_flag == true) {
                if (rank10 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank10 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            if (use_neg == true) {
                tables = {
                    rank1: {
                        value1: rank1
                    },
                    rank2: {
                        value1: rank2
                    },
                    rank3: {
                        value1: rank3
                    },
                    rank4: {
                        value1: rank4
                    },
                    rank5: {
                        value1: rank5
                    },
                    rank6: {
                        value1: rank6
                    },
                    rank7: {
                        value1: rank7
                    },
                    rank8: {
                        value1: rank8
                    },
                    rank9: {
                        value1: rank9
                    },
                    rank10: {
                        value1: rank10
                    },
                    effectstr: effectstr,
                    cond_id: condstr,
                    val_typestr: val_typestr,
                    val_edit_typestr: val_edit_typestr,
                    ValEditTypeShow: ValEditTypeShow,
                    ValTypeShow: ValTypeShow,
                    slidertype: slidertype,
                    multiply: multiply,
                    multiplyslider: multiplyslider,
                    defaultrank: defaultrank,
                    hidden: hidden
                }
            } else {
                tables = {
                    rank1: {
                        value1: Math.abs(rank1)
                    },
                    rank2: {
                        value1: Math.abs(rank2)
                    },
                    rank3: {
                        value1: Math.abs(rank3)
                    },
                    rank4: {
                        value1: Math.abs(rank4)
                    },
                    rank5: {
                        value1: Math.abs(rank5)
                    },
                    rank6: {
                        value1: Math.abs(rank6)
                    },
                    rank7: {
                        value1: Math.abs(rank7)
                    },
                    rank8: {
                        value1: Math.abs(rank8)
                    },
                    rank9: {
                        value1: Math.abs(rank9)
                    },
                    rank10: {
                        value1: Math.abs(rank10)
                    },
                    effectstr: effectstr,
                    cond_id: condstr,
                    val_typestr: val_typestr,
                    val_edit_typestr: val_edit_typestr,
                    ValEditTypeShow: ValEditTypeShow,
                    ValTypeShow: ValTypeShow,
                    slidertype: slidertype,
                    multiply: multiply,
                    multiplyslider: multiplyslider,
                    defaultrank: defaultrank,
                    hidden: hidden
                }
            }
        } else {
            if (neg_flag == true) {
                if (AugValue1 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (AugValue1 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            if (use_neg == true) {
                tables = {
                    rank1: {
                        value1: Math.abs(alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1)
                    },
                    rank2: {
                        value1: Math.abs(alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1)
                    },
                    rank3: {
                        value1: Math.abs(alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1)
                    },
                    rank4: {
                        value1: Math.abs(alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1)
                    },
                    rank5: {
                        value1: Math.abs(alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1)
                    },
                    rank6: {
                        value1: Math.abs(alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1)
                    },
                    rank7: {
                        value1: Math.abs(alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1)
                    },
                    rank8: {
                        value1: Math.abs(alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1)
                    },
                    rank9: {
                        value1: Math.abs(alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1)
                    },
                    rank10: {
                        value1: Math.abs(alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1)
                    },
                    effectstr: effectstr,
                    cond_id: condstr,
                    val_typestr: val_typestr,
                    val_edit_typestr: val_edit_typestr,
                    ValEditTypeShow: ValEditTypeShow,
                    ValTypeShow: ValTypeShow,
                    slidertype: slidertype,
                    multiply: multiply,
                    defaultrank: defaultrank,
                    hidden: hidden
                }
            } else {
                tables = {
                    rank1: {
                        value1: alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1
                    },
                    rank2: {
                        value1: alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1
                    },
                    rank3: {
                        value1: alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1
                    },
                    rank4: {
                        value1: alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1
                    },
                    rank5: {
                        value1: alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1
                    },
                    rank6: {
                        value1: alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1
                    },
                    rank7: {
                        value1: alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1
                    },
                    rank8: {
                        value1: alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1
                    },
                    rank9: {
                        value1: alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1
                    },
                    rank10: {
                        value1: alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1
                    },
                    effectstr: effectstr,
                    cond_id: condstr,
                    val_typestr: val_typestr,
                    val_edit_typestr: val_edit_typestr,
                    ValEditTypeShow: ValEditTypeShow,
                    ValTypeShow: ValTypeShow,
                    slidertype: slidertype,
                    multiply: multiply,
                    multiplyslider: multiplyslider,
                    defaultrank: defaultrank,
                    hidden: hidden
                }
            }
        }
    }
    if (val_type == 2) {
        if (rank_table != -1) {
            const rank1 = val_edit_type_handler(val_edit_type, tables.rank1.value1)
            if (neg_flag == true) {
                if (rank1 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank1 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            const rank2 = val_edit_type_handler(val_edit_type, tables.rank2.value1)
            if (neg_flag == true) {
                if (rank2 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank2 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            const rank3 = val_edit_type_handler(val_edit_type, tables.rank3.value1)
            if (neg_flag == true) {
                if (rank3 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank3 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            const rank4 = val_edit_type_handler(val_edit_type, tables.rank4.value1)
            if (neg_flag == true) {
                if (rank4 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank4 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            const rank5 = val_edit_type_handler(val_edit_type, tables.rank5.value1)
            if (neg_flag == true) {
                if (rank5 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank5 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            const rank6 = val_edit_type_handler(val_edit_type, tables.rank6.value1)
            if (neg_flag == true) {
                if (rank6 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank6 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            const rank7 = val_edit_type_handler(val_edit_type, tables.rank7.value1)
            if (neg_flag == true) {
                if (rank7 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank7 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            const rank8 = val_edit_type_handler(val_edit_type, tables.rank8.value1)
            if (neg_flag == true) {
                if (rank8 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank8 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            const rank9 = val_edit_type_handler(val_edit_type, tables.rank9.value1)
            if (neg_flag == true) {
                if (rank9 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank9 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            const rank10 = val_edit_type_handler(val_edit_type, tables.rank10.value1)
            if (neg_flag == true) {
                if (rank10 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank10 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            if (use_neg == true) {
                tables = {
                    rank1: {
                        value1: rank1
                    },
                    rank2: {
                        value1: rank2
                    },
                    rank3: {
                        value1: rank3
                    },
                    rank4: {
                        value1: rank4
                    },
                    rank5: {
                        value1: rank5
                    },
                    rank6: {
                        value1: rank6
                    },
                    rank7: {
                        value1: rank7
                    },
                    rank8: {
                        value1: rank8
                    },
                    rank9: {
                        value1: rank9
                    },
                    rank10: {
                        value1: rank10
                    },
                    effectstr: effectstr,
                    cond_id: condstr,
                    val_typestr: val_typestr,
                    val_edit_typestr: val_edit_typestr,
                    ValEditTypeShow: ValEditTypeShow,
                    ValTypeShow: ValTypeShow,
                    slidertype: slidertype,
                    multiply: multiply,
                    multiplyslider: multiplyslider,
                    defaultrank: defaultrank,
                    hidden: hidden
                }
            } else {
                tables = {
                    rank1: {
                        value1: Math.abs(rank1)
                    },
                    rank2: {
                        value1: Math.abs(rank2)
                    },
                    rank3: {
                        value1: Math.abs(rank3)
                    },
                    rank4: {
                        value1: Math.abs(rank4)
                    },
                    rank5: {
                        value1: Math.abs(rank5)
                    },
                    rank6: {
                        value1: Math.abs(rank6)
                    },
                    rank7: {
                        value1: Math.abs(rank7)
                    },
                    rank8: {
                        value1: Math.abs(rank8)
                    },
                    rank9: {
                        value1: Math.abs(rank9)
                    },
                    rank10: {
                        value1: Math.abs(rank10)
                    },
                    effectstr: effectstr,
                    cond_id: condstr,
                    val_typestr: val_typestr,
                    val_edit_typestr: val_edit_typestr,
                    ValEditTypeShow: ValEditTypeShow,
                    ValTypeShow: ValTypeShow,
                    slidertype: slidertype,
                    multiply: multiply,
                    defaultrank: defaultrank,
                    hidden: hidden
                }
            }
        } else {
            if (neg_flag == true) {
                if (AugValue2 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (AugValue2 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            if (use_neg == true) {
                tables = {
                    rank1: {
                        value1: Math.abs(alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2)
                    },
                    rank2: {
                        value1: Math.abs(alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2)
                    },
                    rank3: {
                        value1: Math.abs(alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2)
                    },
                    rank4: {
                        value1: Math.abs(alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2)
                    },
                    rank5: {
                        value1: Math.abs(alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2)
                    },
                    rank6: {
                        value1: Math.abs(alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2)
                    },
                    rank7: {
                        value1: Math.abs(alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2)
                    },
                    rank8: {
                        value1: Math.abs(alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2)
                    },
                    rank9: {
                        value1: Math.abs(alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2)
                    },
                    rank10: {
                        value1: Math.abs(alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2)
                    },
                    effectstr: effectstr,
                    cond_id: condstr,
                    val_typestr: val_typestr,
                    val_edit_typestr: val_edit_typestr,
                    ValEditTypeShow: ValEditTypeShow,
                    ValTypeShow: ValTypeShow,
                    slidertype: slidertype,
                    multiply: multiply,
                    defaultrank: defaultrank,
                    hidden: hidden
                }
            } else {
                tables = {
                    rank1: {
                        value1: alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2
                    },
                    rank2: {
                        value1: alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2
                    },
                    rank3: {
                        value1: alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2
                    },
                    rank4: {
                        value1: alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2
                    },
                    rank5: {
                        value1: alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2
                    },
                    rank6: {
                        value1: alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2
                    },
                    rank7: {
                        value1: alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2
                    },
                    rank8: {
                        value1: alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2
                    },
                    rank9: {
                        value1: alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2
                    },
                    rank10: {
                        value1: alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2
                    },
                    effectstr: effectstr,
                    cond_id: condstr,
                    val_typestr: val_typestr,
                    val_edit_typestr: val_edit_typestr,
                    ValEditTypeShow: ValEditTypeShow,
                    ValTypeShow: ValTypeShow,
                    slidertype: slidertype,
                    multiply: multiply,
                    multiplyslider: multiplyslider,
                    defaultrank: defaultrank,
                    hidden: hidden
                }
            }
        }
    }
    if (val_type == 3) {
        const rank1 = val_edit_type_handler(val_edit_type, tables.rank1.value1)
        if (neg_flag == true) {
            if (rank1 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank1 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank2 = val_edit_type_handler(val_edit_type, tables.rank2.value1)
        if (neg_flag == true) {
            if (rank2 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank2 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank3 = val_edit_type_handler(val_edit_type, tables.rank3.value1)
        if (neg_flag == true) {
            if (rank3 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank3 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank4 = val_edit_type_handler(val_edit_type, tables.rank4.value1)
        if (neg_flag == true) {
            if (rank4 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank4 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank5 = val_edit_type_handler(val_edit_type, tables.rank5.value1)
        if (neg_flag == true) {
            if (rank5 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank5 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank6 = val_edit_type_handler(val_edit_type, tables.rank6.value1)
        if (neg_flag == true) {
            if (rank6 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank6 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank7 = val_edit_type_handler(val_edit_type, tables.rank7.value1)
        if (neg_flag == true) {
            if (rank7 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank7 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank8 = val_edit_type_handler(val_edit_type, tables.rank8.value1)
        if (neg_flag == true) {
            if (rank8 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank8 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank9 = val_edit_type_handler(val_edit_type, tables.rank9.value1)
        if (neg_flag == true) {
            if (rank9 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank9 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank10 = val_edit_type_handler(val_edit_type, tables.rank10.value1)
        if (neg_flag == true) {
            if (rank10 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank10 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        if (use_neg == true) {
            tables = {
                rank1: {
                    value1: rank1
                },
                rank2: {
                    value1: rank2
                },
                rank3: {
                    value1: rank3
                },
                rank4: {
                    value1: rank4
                },
                rank5: {
                    value1: rank5
                },
                rank6: {
                    value1: rank6
                },
                rank7: {
                    value1: rank7
                },
                rank8: {
                    value1: rank8
                },
                rank9: {
                    value1: rank9
                },
                rank10: {
                    value1: rank10
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        } else {
            tables = {
                rank1: {
                    value1: Math.abs(rank1)
                },
                rank2: {
                    value1: Math.abs(rank2)
                },
                rank3: {
                    value1: Math.abs(rank3)
                },
                rank4: {
                    value1: Math.abs(rank4)
                },
                rank5: {
                    value1: Math.abs(rank5)
                },
                rank6: {
                    value1: Math.abs(rank6)
                },
                rank7: {
                    value1: Math.abs(rank7)
                },
                rank8: {
                    value1: Math.abs(rank8)
                },
                rank9: {
                    value1: Math.abs(rank9)
                },
                rank10: {
                    value1: Math.abs(rank10)
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        }
    }
    if (val_type == 4) {
        const rank6 = val_edit_type_handler(val_edit_type, tables.rank6.value1)
        if (neg_flag == true) {
            if (rank6 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank6 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank7 = val_edit_type_handler(val_edit_type, tables.rank7.value1)
        if (neg_flag == true) {
            if (rank7 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank7 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank8 = val_edit_type_handler(val_edit_type, tables.rank8.value1)
        if (neg_flag == true) {
            if (rank8 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank8 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank9 = val_edit_type_handler(val_edit_type, tables.rank9.value1)
        if (neg_flag == true) {
            if (rank9 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank9 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank10 = val_edit_type_handler(val_edit_type, tables.rank10.value1)
        if (neg_flag == true) {
            if (rank10 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank10 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        if (use_neg == true) {
            tables = {
                rank1: {
                    value1: rank6
                },
                rank2: {
                    value1: rank7
                },
                rank3: {
                    value1: rank8
                },
                rank4: {
                    value1: rank9
                },
                rank5: {
                    value1: rank10
                },
                rank6: {
                    value1: rank6
                },
                rank7: {
                    value1: rank7
                },
                rank8: {
                    value1: rank8
                },
                rank9: {
                    value1: rank9
                },
                rank10: {
                    value1: rank10
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        } else {
            tables = {
                rank1: {
                    value1: Math.abs(rank6)
                },
                rank2: {
                    value1: Math.abs(rank7)
                },
                rank3: {
                    value1: Math.abs(rank8)
                },
                rank4: {
                    value1: Math.abs(rank9)
                },
                rank5: {
                    value1: Math.abs(rank10)
                },
                rank6: {
                    value1: Math.abs(rank6)
                },
                rank7: {
                    value1: Math.abs(rank7)
                },
                rank8: {
                    value1: Math.abs(rank8)
                },
                rank9: {
                    value1: Math.abs(rank9)
                },
                rank10: {
                    value1: Math.abs(rank10)
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        }
    }
    if (val_type == 5) {
        const rank1 = val_edit_type_handler(val_edit_type, tables.rank1.value1)
        if (neg_flag == true) {
            if (rank1 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank1 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank2 = val_edit_type_handler(val_edit_type, tables.rank2.value1)
        if (neg_flag == true) {
            if (rank2 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank2 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank3 = val_edit_type_handler(val_edit_type, tables.rank3.value1)
        if (neg_flag == true) {
            if (rank3 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank3 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank4 = val_edit_type_handler(val_edit_type, tables.rank4.value1)
        if (neg_flag == true) {
            if (rank4 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank4 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank5 = val_edit_type_handler(val_edit_type, tables.rank5.value1)
        if (neg_flag == true) {
            if (rank5 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank5 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank6 = val_edit_type_handler(val_edit_type, tables.rank6.value1)
        if (neg_flag == true) {
            if (rank6 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank6 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank7 = val_edit_type_handler(val_edit_type, tables.rank7.value1)
        if (neg_flag == true) {
            if (rank7 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank7 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank8 = val_edit_type_handler(val_edit_type, tables.rank8.value1)
        if (neg_flag == true) {
            if (rank8 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank8 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank9 = val_edit_type_handler(val_edit_type, tables.rank9.value1)
        if (neg_flag == true) {
            if (rank9 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank9 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank10 = val_edit_type_handler(val_edit_type, tables.rank10.value1)
        if (neg_flag == true) {
            if (rank10 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank10 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        if (use_neg == true) {
            tables = {
                rank1: {
                    value1: rank1
                },
                rank2: {
                    value1: rank2
                },
                rank3: {
                    value1: rank3
                },
                rank4: {
                    value1: rank4
                },
                rank5: {
                    value1: rank5
                },
                rank6: {
                    value1: rank6
                },
                rank7: {
                    value1: rank7
                },
                rank8: {
                    value1: rank8
                },
                rank9: {
                    value1: rank9
                },
                rank10: {
                    value1: rank10
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        } else {
            tables = {
                rank1: {
                    value1: Math.abs(rank1)
                },
                rank2: {
                    value1: Math.abs(rank2)
                },
                rank3: {
                    value1: Math.abs(rank3)
                },
                rank4: {
                    value1: Math.abs(rank4)
                },
                rank5: {
                    value1: Math.abs(rank5)
                },
                rank6: {
                    value1: Math.abs(rank6)
                },
                rank7: {
                    value1: Math.abs(rank7)
                },
                rank8: {
                    value1: Math.abs(rank8)
                },
                rank9: {
                    value1: Math.abs(rank9)
                },
                rank10: {
                    value1: Math.abs(rank10)
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        }
    }
    if (val_type == 6) {
        const rank = val_specify && val_edit_type_handler(val_edit_type, val_specify)
        if (neg_flag == true) {
            if (rank < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        if (use_neg == true) {
            tables = {
                rank1: {
                    value1: rank
                },
                rank2: {
                    value1: rank
                },
                rank3: {
                    value1: rank
                },
                rank4: {
                    value1: rank
                },
                rank5: {
                    value1: rank
                },
                rank6: {
                    value1: rank
                },
                rank7: {
                    value1: rank
                },
                rank8: {
                    value1: rank
                },
                rank9: {
                    value1: rank
                },
                rank10: {
                    value1: rank
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        } else {
            tables = {
                rank1: {
                    value1: Math.abs(rank)
                },
                rank2: {
                    value1: Math.abs(rank)
                },
                rank3: {
                    value1: Math.abs(rank)
                },
                rank4: {
                    value1: Math.abs(rank)
                },
                rank5: {
                    value1: Math.abs(rank)
                },
                rank6: {
                    value1: Math.abs(rank)
                },
                rank7: {
                    value1: Math.abs(rank)
                },
                rank8: {
                    value1: Math.abs(rank)
                },
                rank9: {
                    value1: Math.abs(rank)
                },
                rank10: {
                    value1: Math.abs(rank)
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        }
    }
    if (val_type == 7) {
        const rank1 = val_edit_type_handler(val_edit_type, tables.rank1.value1)
        if (neg_flag == true) {
            if (rank1 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank1 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank2 = val_edit_type_handler(val_edit_type, tables.rank2.value1)
        if (neg_flag == true) {
            if (rank2 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank2 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank3 = val_edit_type_handler(val_edit_type, tables.rank3.value1)
        if (neg_flag == true) {
            if (rank3 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank3 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank4 = val_edit_type_handler(val_edit_type, tables.rank4.value1)
        if (neg_flag == true) {
            if (rank4 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank4 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank5 = val_edit_type_handler(val_edit_type, tables.rank5.value1)
        if (neg_flag == true) {
            if (rank5 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank5 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank6 = val_edit_type_handler(val_edit_type, tables.rank6.value1)
        if (neg_flag == true) {
            if (rank6 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank6 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank7 = val_edit_type_handler(val_edit_type, tables.rank7.value1)
        if (neg_flag == true) {
            if (rank7 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank7 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank8 = val_edit_type_handler(val_edit_type, tables.rank8.value1)
        if (neg_flag == true) {
            if (rank8 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank8 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank9 = val_edit_type_handler(val_edit_type, tables.rank9.value1)
        if (neg_flag == true) {
            if (rank9 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank9 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank10 = val_edit_type_handler(val_edit_type, tables.rank10.value1)
        if (neg_flag == true) {
            if (rank10 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank10 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        if (use_neg == true) {
            tables = {
                rank1: {
                    value1: rank1
                },
                rank2: {
                    value1: rank2
                },
                rank3: {
                    value1: rank3
                },
                rank4: {
                    value1: rank4
                },
                rank5: {
                    value1: rank5
                },
                rank6: {
                    value1: rank6
                },
                rank7: {
                    value1: rank7
                },
                rank8: {
                    value1: rank8
                },
                rank9: {
                    value1: rank9
                },
                rank10: {
                    value1: rank10
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        } else {
            tables = {
                rank1: {
                    value1: Math.abs(rank1)
                },
                rank2: {
                    value1: Math.abs(rank2)
                },
                rank3: {
                    value1: Math.abs(rank3)
                },
                rank4: {
                    value1: Math.abs(rank4)
                },
                rank5: {
                    value1: Math.abs(rank5)
                },
                rank6: {
                    value1: Math.abs(rank6)
                },
                rank7: {
                    value1: Math.abs(rank7)
                },
                rank8: {
                    value1: Math.abs(rank8)
                },
                rank9: {
                    value1: Math.abs(rank9)
                },
                rank10: {
                    value1: Math.abs(rank10)
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        }
    }
    if (val_type == 8) {
        const rank1 = val_edit_type_handler(val_edit_type, tables.rank1.value1)
        if (neg_flag == true) {
            if (rank1 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank1 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank2 = val_edit_type_handler(val_edit_type, tables.rank2.value1)
        if (neg_flag == true) {
            if (rank2 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank2 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank3 = val_edit_type_handler(val_edit_type, tables.rank3.value1)
        if (neg_flag == true) {
            if (rank3 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank3 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank4 = val_edit_type_handler(val_edit_type, tables.rank4.value1)
        if (neg_flag == true) {
            if (rank4 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank4 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank5 = val_edit_type_handler(val_edit_type, tables.rank5.value1)
        if (neg_flag == true) {
            if (rank5 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank5 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank6 = val_edit_type_handler(val_edit_type, tables.rank6.value1)
        if (neg_flag == true) {
            if (rank6 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank6 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank7 = val_edit_type_handler(val_edit_type, tables.rank7.value1)
        if (neg_flag == true) {
            if (rank7 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank7 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank8 = val_edit_type_handler(val_edit_type, tables.rank8.value1)
        if (neg_flag == true) {
            if (rank8 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank8 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank9 = val_edit_type_handler(val_edit_type, tables.rank9.value1)
        if (neg_flag == true) {
            if (rank9 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank9 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank10 = val_edit_type_handler(val_edit_type, tables.rank10.value1)
        if (neg_flag == true) {
            if (rank10 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank10 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        if (use_neg == true) {
            tables = {
                rank1: {
                    value1: rank1
                },
                rank2: {
                    value1: rank2
                },
                rank3: {
                    value1: rank3
                },
                rank4: {
                    value1: rank4
                },
                rank5: {
                    value1: rank5
                },
                rank6: {
                    value1: rank6
                },
                rank7: {
                    value1: rank7
                },
                rank8: {
                    value1: rank8
                },
                rank9: {
                    value1: rank9
                },
                rank10: {
                    value1: rank10
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        } else {
            tables = {
                rank1: {
                    value1: Math.abs(rank1)
                },
                rank2: {
                    value1: Math.abs(rank2)
                },
                rank3: {
                    value1: Math.abs(rank3)
                },
                rank4: {
                    value1: Math.abs(rank4)
                },
                rank5: {
                    value1: Math.abs(rank5)
                },
                rank6: {
                    value1: Math.abs(rank6)
                },
                rank7: {
                    value1: Math.abs(rank7)
                },
                rank8: {
                    value1: Math.abs(rank8)
                },
                rank9: {
                    value1: Math.abs(rank9)
                },
                rank10: {
                    value1: Math.abs(rank10)
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        }
    }
    if (val_type == 9) {
        const rank1 = val_edit_type_handler(val_edit_type, tables.rank1.value1)
        if (neg_flag == true) {
            if (rank1 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank1 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank2 = val_edit_type_handler(val_edit_type, tables.rank2.value1)
        if (neg_flag == true) {
            if (rank2 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank2 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank3 = val_edit_type_handler(val_edit_type, tables.rank3.value1)
        if (neg_flag == true) {
            if (rank3 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank3 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank4 = val_edit_type_handler(val_edit_type, tables.rank4.value1)
        if (neg_flag == true) {
            if (rank4 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank4 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank5 = val_edit_type_handler(val_edit_type, tables.rank5.value1)
        if (neg_flag == true) {
            if (rank5 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank5 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank6 = val_edit_type_handler(val_edit_type, tables.rank6.value1)
        if (neg_flag == true) {
            if (rank6 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank6 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank7 = val_edit_type_handler(val_edit_type, tables.rank7.value1)
        if (neg_flag == true) {
            if (rank7 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank7 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank8 = val_edit_type_handler(val_edit_type, tables.rank8.value1)
        if (neg_flag == true) {
            if (rank8 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank8 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank9 = val_edit_type_handler(val_edit_type, tables.rank9.value1)
        if (neg_flag == true) {
            if (rank9 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank9 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank10 = val_edit_type_handler(val_edit_type, tables.rank10.value1)
        if (neg_flag == true) {
            if (rank10 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank10 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        if (use_neg == true) {
            tables = {
                rank1: {
                    value1: rank1
                },
                rank2: {
                    value1: rank2
                },
                rank3: {
                    value1: rank3
                },
                rank4: {
                    value1: rank4
                },
                rank5: {
                    value1: rank5
                },
                rank6: {
                    value1: rank6
                },
                rank7: {
                    value1: rank7
                },
                rank8: {
                    value1: rank8
                },
                rank9: {
                    value1: rank9
                },
                rank10: {
                    value1: rank10
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        } else {
            tables = {
                rank1: {
                    value1: Math.abs(rank1)
                },
                rank2: {
                    value1: Math.abs(rank2)
                },
                rank3: {
                    value1: Math.abs(rank3)
                },
                rank4: {
                    value1: Math.abs(rank4)
                },
                rank5: {
                    value1: Math.abs(rank5)
                },
                rank6: {
                    value1: Math.abs(rank6)
                },
                rank7: {
                    value1: Math.abs(rank7)
                },
                rank8: {
                    value1: Math.abs(rank8)
                },
                rank9: {
                    value1: Math.abs(rank9)
                },
                rank10: {
                    value1: Math.abs(rank10)
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        }
    }
    if (val_type == 10) {
        const rank1 = val_edit_type_handler(val_edit_type, tables.rank1.value1)
        if (neg_flag == true) {
            if (rank1 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank1 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank2 = val_edit_type_handler(val_edit_type, tables.rank2.value1)
        if (neg_flag == true) {
            if (rank2 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank2 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank3 = val_edit_type_handler(val_edit_type, tables.rank3.value1)
        if (neg_flag == true) {
            if (rank3 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank3 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank4 = val_edit_type_handler(val_edit_type, tables.rank4.value1)
        if (neg_flag == true) {
            if (rank4 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank4 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank5 = val_edit_type_handler(val_edit_type, tables.rank5.value1)
        if (neg_flag == true) {
            if (rank5 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank5 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank6 = val_edit_type_handler(val_edit_type, tables.rank6.value1)
        if (neg_flag == true) {
            if (rank6 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank6 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank7 = val_edit_type_handler(val_edit_type, tables.rank7.value1)
        if (neg_flag == true) {
            if (rank7 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank7 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank8 = val_edit_type_handler(val_edit_type, tables.rank8.value1)
        if (neg_flag == true) {
            if (rank8 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank8 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank9 = val_edit_type_handler(val_edit_type, tables.rank9.value1)
        if (neg_flag == true) {
            if (rank9 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank9 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank10 = val_edit_type_handler(val_edit_type, tables.rank10.value1)
        if (neg_flag == true) {
            if (rank10 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank10 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        if (use_neg == true) {
            tables = {
                rank1: {
                    value1: rank1
                },
                rank2: {
                    value1: rank2
                },
                rank3: {
                    value1: rank3
                },
                rank4: {
                    value1: rank4
                },
                rank5: {
                    value1: rank5
                },
                rank6: {
                    value1: rank6
                },
                rank7: {
                    value1: rank7
                },
                rank8: {
                    value1: rank8
                },
                rank9: {
                    value1: rank9
                },
                rank10: {
                    value1: rank10
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        } else {
            tables = {
                rank1: {
                    value1: Math.abs(rank1)
                },
                rank2: {
                    value1: Math.abs(rank2)
                },
                rank3: {
                    value1: Math.abs(rank3)
                },
                rank4: {
                    value1: Math.abs(rank4)
                },
                rank5: {
                    value1: Math.abs(rank5)
                },
                rank6: {
                    value1: Math.abs(rank6)
                },
                rank7: {
                    value1: Math.abs(rank7)
                },
                rank8: {
                    value1: Math.abs(rank8)
                },
                rank9: {
                    value1: Math.abs(rank9)
                },
                rank10: {
                    value1: Math.abs(rank10)
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        }
    }
    if (val_type == 11) {
        const rank1 = val_edit_type_handler(val_edit_type, tables.rank1.value1)
        if (neg_flag == true) {
            if (rank1 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank1 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank2 = val_edit_type_handler(val_edit_type, tables.rank2.value1)
        if (neg_flag == true) {
            if (rank2 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank2 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank3 = val_edit_type_handler(val_edit_type, tables.rank3.value1)
        if (neg_flag == true) {
            if (rank3 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank3 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank4 = val_edit_type_handler(val_edit_type, tables.rank4.value1)
        if (neg_flag == true) {
            if (rank4 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank4 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank5 = val_edit_type_handler(val_edit_type, tables.rank5.value1)
        if (neg_flag == true) {
            if (rank5 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank5 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank6 = val_edit_type_handler(val_edit_type, tables.rank6.value1)
        if (neg_flag == true) {
            if (rank6 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank6 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank7 = val_edit_type_handler(val_edit_type, tables.rank7.value1)
        if (neg_flag == true) {
            if (rank7 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank7 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank8 = val_edit_type_handler(val_edit_type, tables.rank8.value1)
        if (neg_flag == true) {
            if (rank8 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank8 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank9 = val_edit_type_handler(val_edit_type, tables.rank9.value1)
        if (neg_flag == true) {
            if (rank9 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank9 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank10 = val_edit_type_handler(val_edit_type, tables.rank10.value1)
        if (neg_flag == true) {
            if (rank10 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank10 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        if (use_neg == true) {
            tables = {
                rank1: {
                    value1: rank1
                },
                rank2: {
                    value1: rank2
                },
                rank3: {
                    value1: rank3
                },
                rank4: {
                    value1: rank4
                },
                rank5: {
                    value1: rank5
                },
                rank6: {
                    value1: rank6
                },
                rank7: {
                    value1: rank7
                },
                rank8: {
                    value1: rank8
                },
                rank9: {
                    value1: rank9
                },
                rank10: {
                    value1: rank10
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        } else {
            tables = {
                rank1: {
                    value1: Math.abs(rank1)
                },
                rank2: {
                    value1: Math.abs(rank2)
                },
                rank3: {
                    value1: Math.abs(rank3)
                },
                rank4: {
                    value1: Math.abs(rank4)
                },
                rank5: {
                    value1: Math.abs(rank5)
                },
                rank6: {
                    value1: Math.abs(rank6)
                },
                rank7: {
                    value1: Math.abs(rank7)
                },
                rank8: {
                    value1: Math.abs(rank8)
                },
                rank9: {
                    value1: Math.abs(rank9)
                },
                rank10: {
                    value1: Math.abs(rank10)
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        }
    }
    if (val_type == 12) {
        const rank1 = val_edit_type_handler(val_edit_type, tables.rank1.value1)
        if (neg_flag == true) {
            if (rank1 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank1 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank2 = val_edit_type_handler(val_edit_type, tables.rank2.value1)
        if (neg_flag == true) {
            if (rank2 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank2 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank3 = val_edit_type_handler(val_edit_type, tables.rank3.value1)
        if (neg_flag == true) {
            if (rank3 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank3 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank4 = val_edit_type_handler(val_edit_type, tables.rank4.value1)
        if (neg_flag == true) {
            if (rank4 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank4 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank5 = val_edit_type_handler(val_edit_type, tables.rank5.value1)
        if (neg_flag == true) {
            if (rank5 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank5 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank6 = val_edit_type_handler(val_edit_type, tables.rank6.value1)
        if (neg_flag == true) {
            if (rank6 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank6 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank7 = val_edit_type_handler(val_edit_type, tables.rank7.value1)
        if (neg_flag == true) {
            if (rank7 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank7 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank8 = val_edit_type_handler(val_edit_type, tables.rank8.value1)
        if (neg_flag == true) {
            if (rank8 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank8 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank9 = val_edit_type_handler(val_edit_type, tables.rank9.value1)
        if (neg_flag == true) {
            if (rank9 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank9 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank10 = val_edit_type_handler(val_edit_type, tables.rank10.value1)
        if (neg_flag == true) {
            if (rank10 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank10 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        if (use_neg == true) {
            tables = {
                rank1: {
                    value1: rank1
                },
                rank2: {
                    value1: rank2
                },
                rank3: {
                    value1: rank3
                },
                rank4: {
                    value1: rank4
                },
                rank5: {
                    value1: rank5
                },
                rank6: {
                    value1: rank6
                },
                rank7: {
                    value1: rank7
                },
                rank8: {
                    value1: rank8
                },
                rank9: {
                    value1: rank9
                },
                rank10: {
                    value1: rank10
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        } else {
            tables = {
                rank1: {
                    value1: Math.abs(rank1)
                },
                rank2: {
                    value1: Math.abs(rank2)
                },
                rank3: {
                    value1: Math.abs(rank3)
                },
                rank4: {
                    value1: Math.abs(rank4)
                },
                rank5: {
                    value1: Math.abs(rank5)
                },
                rank6: {
                    value1: Math.abs(rank6)
                },
                rank7: {
                    value1: Math.abs(rank7)
                },
                rank8: {
                    value1: Math.abs(rank8)
                },
                rank9: {
                    value1: Math.abs(rank9)
                },
                rank10: {
                    value1: Math.abs(rank10)
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        }
    }
    if (val_type == 14) {
        const rank1 = val_edit_type_handler(val_edit_type, tables.rank1.value1)
        if (neg_flag == true) {
            if (rank1 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank1 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank2 = val_edit_type_handler(val_edit_type, tables.rank2.value1)
        if (neg_flag == true) {
            if (rank2 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank2 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank3 = val_edit_type_handler(val_edit_type, tables.rank3.value1)
        if (neg_flag == true) {
            if (rank3 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank3 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank4 = val_edit_type_handler(val_edit_type, tables.rank4.value1)
        if (neg_flag == true) {
            if (rank4 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank4 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank5 = val_edit_type_handler(val_edit_type, tables.rank5.value1)
        if (neg_flag == true) {
            if (rank5 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank5 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank6 = val_edit_type_handler(val_edit_type, tables.rank6.value1)
        if (neg_flag == true) {
            if (rank6 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank6 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank7 = val_edit_type_handler(val_edit_type, tables.rank7.value1)
        if (neg_flag == true) {
            if (rank7 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank7 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank8 = val_edit_type_handler(val_edit_type, tables.rank8.value1)
        if (neg_flag == true) {
            if (rank8 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank8 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank9 = val_edit_type_handler(val_edit_type, tables.rank9.value1)
        if (neg_flag == true) {
            if (rank9 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank9 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank10 = val_edit_type_handler(val_edit_type, tables.rank10.value1)
        if (neg_flag == true) {
            if (rank10 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank10 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        if (use_neg == true) {
            tables = {
                rank1: {
                    value1: rank1
                },
                rank2: {
                    value1: rank2
                },
                rank3: {
                    value1: rank3
                },
                rank4: {
                    value1: rank4
                },
                rank5: {
                    value1: rank5
                },
                rank6: {
                    value1: rank6
                },
                rank7: {
                    value1: rank7
                },
                rank8: {
                    value1: rank8
                },
                rank9: {
                    value1: rank9
                },
                rank10: {
                    value1: rank10
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        } else {
            tables = {
                rank1: {
                    value1: Math.abs(rank1)
                },
                rank2: {
                    value1: Math.abs(rank2)
                },
                rank3: {
                    value1: Math.abs(rank3)
                },
                rank4: {
                    value1: Math.abs(rank4)
                },
                rank5: {
                    value1: Math.abs(rank5)
                },
                rank6: {
                    value1: Math.abs(rank6)
                },
                rank7: {
                    value1: Math.abs(rank7)
                },
                rank8: {
                    value1: Math.abs(rank8)
                },
                rank9: {
                    value1: Math.abs(rank9)
                },
                rank10: {
                    value1: Math.abs(rank10)
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        }
    }
    if (val_type == 16) {
        const rank1 = val_edit_type_handler(val_edit_type, tables.rank1.value1)
        if (neg_flag == true) {
            if (rank1 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank1 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank2 = val_edit_type_handler(val_edit_type, tables.rank2.value1)
        if (neg_flag == true) {
            if (rank2 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank2 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank3 = val_edit_type_handler(val_edit_type, tables.rank3.value1)
        if (neg_flag == true) {
            if (rank3 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank3 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank4 = val_edit_type_handler(val_edit_type, tables.rank4.value1)
        if (neg_flag == true) {
            if (rank4 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank4 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank5 = val_edit_type_handler(val_edit_type, tables.rank5.value1)
        if (neg_flag == true) {
            if (rank5 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank5 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank6 = val_edit_type_handler(val_edit_type, tables.rank6.value1)
        if (neg_flag == true) {
            if (rank6 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank6 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank7 = val_edit_type_handler(val_edit_type, tables.rank7.value1)
        if (neg_flag == true) {
            if (rank7 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank7 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank8 = val_edit_type_handler(val_edit_type, tables.rank8.value1)
        if (neg_flag == true) {
            if (rank8 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank8 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank9 = val_edit_type_handler(val_edit_type, tables.rank9.value1)
        if (neg_flag == true) {
            if (rank9 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank9 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank10 = val_edit_type_handler(val_edit_type, tables.rank10.value1)
        if (neg_flag == true) {
            if (rank10 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank10 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        if (use_neg == true) {
            tables = {
                rank1: {
                    value1: rank1
                },
                rank2: {
                    value1: rank2
                },
                rank3: {
                    value1: rank3
                },
                rank4: {
                    value1: rank4
                },
                rank5: {
                    value1: rank5
                },
                rank6: {
                    value1: rank6
                },
                rank7: {
                    value1: rank7
                },
                rank8: {
                    value1: rank8
                },
                rank9: {
                    value1: rank9
                },
                rank10: {
                    value1: rank10
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        } else {
            tables = {
                rank1: {
                    value1: Math.abs(rank1)
                },
                rank2: {
                    value1: Math.abs(rank2)
                },
                rank3: {
                    value1: Math.abs(rank3)
                },
                rank4: {
                    value1: Math.abs(rank4)
                },
                rank5: {
                    value1: Math.abs(rank5)
                },
                rank6: {
                    value1: Math.abs(rank6)
                },
                rank7: {
                    value1: Math.abs(rank7)
                },
                rank8: {
                    value1: Math.abs(rank8)
                },
                rank9: {
                    value1: Math.abs(rank9)
                },
                rank10: {
                    value1: Math.abs(rank10)
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        }
    }
    if (val_type == 18) {
        const rank1 = val_edit_type_handler(val_edit_type, tables.rank1.value1)
        if (neg_flag == true) {
            if (rank1 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank1 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank2 = val_edit_type_handler(val_edit_type, tables.rank2.value1)
        if (neg_flag == true) {
            if (rank2 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank2 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank3 = val_edit_type_handler(val_edit_type, tables.rank3.value1)
        if (neg_flag == true) {
            if (rank3 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank3 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank4 = val_edit_type_handler(val_edit_type, tables.rank4.value1)
        if (neg_flag == true) {
            if (rank4 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank4 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank5 = val_edit_type_handler(val_edit_type, tables.rank5.value1)
        if (neg_flag == true) {
            if (rank5 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank5 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank6 = val_edit_type_handler(val_edit_type, tables.rank6.value1)
        if (neg_flag == true) {
            if (rank6 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank6 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank7 = val_edit_type_handler(val_edit_type, tables.rank7.value1)
        if (neg_flag == true) {
            if (rank7 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank7 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank8 = val_edit_type_handler(val_edit_type, tables.rank8.value1)
        if (neg_flag == true) {
            if (rank8 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank8 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank9 = val_edit_type_handler(val_edit_type, tables.rank9.value1)
        if (neg_flag == true) {
            if (rank9 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank9 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank10 = val_edit_type_handler(val_edit_type, tables.rank10.value1)
        if (neg_flag == true) {
            if (rank10 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank10 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        if (use_neg == true) {
            tables = {
                rank1: {
                    value1: rank1
                },
                rank2: {
                    value1: rank2
                },
                rank3: {
                    value1: rank3
                },
                rank4: {
                    value1: rank4
                },
                rank5: {
                    value1: rank5
                },
                rank6: {
                    value1: rank6
                },
                rank7: {
                    value1: rank7
                },
                rank8: {
                    value1: rank8
                },
                rank9: {
                    value1: rank9
                },
                rank10: {
                    value1: rank10
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        } else {
            tables = {
                rank1: {
                    value1: Math.abs(rank1)
                },
                rank2: {
                    value1: Math.abs(rank2)
                },
                rank3: {
                    value1: Math.abs(rank3)
                },
                rank4: {
                    value1: Math.abs(rank4)
                },
                rank5: {
                    value1: Math.abs(rank5)
                },
                rank6: {
                    value1: Math.abs(rank6)
                },
                rank7: {
                    value1: Math.abs(rank7)
                },
                rank8: {
                    value1: Math.abs(rank8)
                },
                rank9: {
                    value1: Math.abs(rank9)
                },
                rank10: {
                    value1: Math.abs(rank10)
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        }
    }
    if (val_type == 20) {
        const rank1 = val_edit_type_handler(val_edit_type, tables.rank1.value1)
        if (neg_flag == true) {
            if (rank1 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank1 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank2 = val_edit_type_handler(val_edit_type, tables.rank2.value1)
        if (neg_flag == true) {
            if (rank2 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank2 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank3 = val_edit_type_handler(val_edit_type, tables.rank3.value1)
        if (neg_flag == true) {
            if (rank3 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank3 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank4 = val_edit_type_handler(val_edit_type, tables.rank4.value1)
        if (neg_flag == true) {
            if (rank4 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank4 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank5 = val_edit_type_handler(val_edit_type, tables.rank5.value1)
        if (neg_flag == true) {
            if (rank5 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank5 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank6 = val_edit_type_handler(val_edit_type, tables.rank6.value1)
        if (neg_flag == true) {
            if (rank6 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank6 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank7 = val_edit_type_handler(val_edit_type, tables.rank7.value1)
        if (neg_flag == true) {
            if (rank7 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank7 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank8 = val_edit_type_handler(val_edit_type, tables.rank8.value1)
        if (neg_flag == true) {
            if (rank8 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank8 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank9 = val_edit_type_handler(val_edit_type, tables.rank9.value1)
        if (neg_flag == true) {
            if (rank9 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank9 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        const rank10 = val_edit_type_handler(val_edit_type, tables.rank10.value1)
        if (neg_flag == true) {
            if (rank10 < 0) {
                effectstr = effectstrpull.debuff_string
            }
            if (rank10 > 0) {
                effectstr = effectstrpull.buff_string
            }
        }
        if (use_neg == true) {
            tables = {
                rank1: {
                    value1: rank1
                },
                rank2: {
                    value1: rank2
                },
                rank3: {
                    value1: rank3
                },
                rank4: {
                    value1: rank4
                },
                rank5: {
                    value1: rank5
                },
                rank6: {
                    value1: rank6
                },
                rank7: {
                    value1: rank7
                },
                rank8: {
                    value1: rank8
                },
                rank9: {
                    value1: rank9
                },
                rank10: {
                    value1: rank10
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        } else {
            tables = {
                rank1: {
                    value1: Math.abs(rank1)
                },
                rank2: {
                    value1: Math.abs(rank2)
                },
                rank3: {
                    value1: Math.abs(rank3)
                },
                rank4: {
                    value1: Math.abs(rank4)
                },
                rank5: {
                    value1: Math.abs(rank5)
                },
                rank6: {
                    value1: Math.abs(rank6)
                },
                rank7: {
                    value1: Math.abs(rank7)
                },
                rank8: {
                    value1: Math.abs(rank8)
                },
                rank9: {
                    value1: Math.abs(rank9)
                },
                rank10: {
                    value1: Math.abs(rank10)
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        }
    }

    //command_id trans
    if (value_trans == "split_by_2") {
        const rank1value5split5 = tables.rank1.value1 && split_by_2(5, parseInt(tables.rank1.value1));
        const rank1value4split5 = tables.rank1.value1 && split_by_2(4, parseInt(tables.rank1.value1));
        const rank1value3split5 = tables.rank1.value1 && split_by_2(3, parseInt(tables.rank1.value1));
        const rank1value2split5 = tables.rank1.value1 && split_by_2(2, parseInt(tables.rank1.value1));
        const rank1value1split5 = tables.rank1.value1 && split_by_2(1, parseInt(tables.rank1.value1));
        const rank2value5split5 = tables.rank2.value1 && split_by_2(5, parseInt(tables.rank2.value1));
        const rank2value4split5 = tables.rank2.value1 && split_by_2(4, parseInt(tables.rank2.value1));
        const rank2value3split5 = tables.rank2.value1 && split_by_2(3, parseInt(tables.rank2.value1));
        const rank2value2split5 = tables.rank2.value1 && split_by_2(2, parseInt(tables.rank2.value1));
        const rank2value1split5 = tables.rank2.value1 && split_by_2(1, parseInt(tables.rank2.value1));
        const rank3value5split5 = tables.rank3.value1 && split_by_2(5, parseInt(tables.rank3.value1));
        const rank3value4split5 = tables.rank3.value1 && split_by_2(4, parseInt(tables.rank3.value1));
        const rank3value3split5 = tables.rank3.value1 && split_by_2(3, parseInt(tables.rank3.value1));
        const rank3value2split5 = tables.rank3.value1 && split_by_2(2, parseInt(tables.rank3.value1));
        const rank3value1split5 = tables.rank3.value1 && split_by_2(1, parseInt(tables.rank3.value1));
        const rank4value5split5 = tables.rank4.value1 && split_by_2(5, parseInt(tables.rank4.value1));
        const rank4value4split5 = tables.rank4.value1 && split_by_2(4, parseInt(tables.rank4.value1));
        const rank4value3split5 = tables.rank4.value1 && split_by_2(3, parseInt(tables.rank4.value1));
        const rank4value2split5 = tables.rank4.value1 && split_by_2(2, parseInt(tables.rank4.value1));
        const rank4value1split5 = tables.rank4.value1 && split_by_2(1, parseInt(tables.rank4.value1));
        const rank5value5split5 = tables.rank5.value1 && split_by_2(5, parseInt(tables.rank5.value1));
        const rank5value4split5 = tables.rank5.value1 && split_by_2(4, parseInt(tables.rank5.value1));
        const rank5value3split5 = tables.rank5.value1 && split_by_2(3, parseInt(tables.rank5.value1));
        const rank5value2split5 = tables.rank5.value1 && split_by_2(2, parseInt(tables.rank5.value1));
        const rank5value1split5 = tables.rank5.value1 && split_by_2(1, parseInt(tables.rank5.value1));
        const rank6value5split5 = tables.rank6.value1 && split_by_2(5, parseInt(tables.rank6.value1));
        const rank6value4split5 = tables.rank6.value1 && split_by_2(4, parseInt(tables.rank6.value1));
        const rank6value3split5 = tables.rank6.value1 && split_by_2(3, parseInt(tables.rank6.value1));
        const rank6value2split5 = tables.rank6.value1 && split_by_2(2, parseInt(tables.rank6.value1));
        const rank6value1split5 = tables.rank6.value1 && split_by_2(1, parseInt(tables.rank6.value1));
        const rank7value5split5 = tables.rank7.value1 && split_by_2(5, parseInt(tables.rank7.value1));
        const rank7value4split5 = tables.rank7.value1 && split_by_2(4, parseInt(tables.rank7.value1));
        const rank7value3split5 = tables.rank7.value1 && split_by_2(3, parseInt(tables.rank7.value1));
        const rank7value2split5 = tables.rank7.value1 && split_by_2(2, parseInt(tables.rank7.value1));
        const rank7value1split5 = tables.rank7.value1 && split_by_2(1, parseInt(tables.rank7.value1));
        const rank8value5split5 = tables.rank8.value1 && split_by_2(5, parseInt(tables.rank8.value1));
        const rank8value4split5 = tables.rank8.value1 && split_by_2(4, parseInt(tables.rank8.value1));
        const rank8value3split5 = tables.rank8.value1 && split_by_2(3, parseInt(tables.rank8.value1));
        const rank8value2split5 = tables.rank8.value1 && split_by_2(2, parseInt(tables.rank8.value1));
        const rank8value1split5 = tables.rank8.value1 && split_by_2(1, parseInt(tables.rank8.value1));
        const rank9value5split5 = tables.rank9.value1 && split_by_2(5, parseInt(tables.rank9.value1));
        const rank9value4split5 = tables.rank9.value1 && split_by_2(4, parseInt(tables.rank9.value1));
        const rank9value3split5 = tables.rank9.value1 && split_by_2(3, parseInt(tables.rank9.value1));
        const rank9value2split5 = tables.rank9.value1 && split_by_2(2, parseInt(tables.rank9.value1));
        const rank9value1split5 = tables.rank9.value1 && split_by_2(1, parseInt(tables.rank9.value1));
        const rank10value5split5 = tables.rank10.value1 && split_by_2(5, parseInt(tables.rank10.value1));
        const rank10value4split5 = tables.rank10.value1 && split_by_2(4, parseInt(tables.rank10.value1));
        const rank10value3split5 = tables.rank10.value1 && split_by_2(3, parseInt(tables.rank10.value1));
        const rank10value2split5 = tables.rank10.value1 && split_by_2(2, parseInt(tables.rank10.value1));
        const rank10value1split5 = tables.rank10.value1 && split_by_2(1, parseInt(tables.rank10.value1));

        tables = {
            rank1: {
                value1: rank1value1split5,
                value2: rank1value2split5,
                value3: rank1value3split5,
                value4: rank1value4split5,
                value5: rank1value5split5
            },
            rank2: {
                value1: rank2value1split5,
                value2: rank2value2split5,
                value3: rank2value3split5,
                value4: rank2value4split5,
                value5: rank2value5split5
            },
            rank3: {
                value1: rank3value1split5,
                value2: rank3value2split5,
                value3: rank3value3split5,
                value4: rank3value4split5,
                value5: rank3value5split5
            },
            rank4: {
                value1: rank4value1split5,
                value2: rank4value2split5,
                value3: rank4value3split5,
                value4: rank4value4split5,
                value5: rank4value5split5
            },
            rank5: {
                value1: rank5value1split5,
                value2: rank5value2split5,
                value3: rank5value3split5,
                value4: rank5value4split5,
                value5: rank5value5split5
            },
            rank6: {
                value1: rank6value1split5,
                value2: rank6value2split5,
                value3: rank6value3split5,
                value4: rank6value4split5,
                value5: rank6value5split5
            },
            rank7: {
                value1: rank7value1split5,
                value2: rank7value2split5,
                value3: rank7value3split5,
                value4: rank7value4split5,
                value5: rank7value5split5
            },
            rank8: {
                value1: rank8value1split5,
                value2: rank8value2split5,
                value3: rank8value3split5,
                value4: rank8value4split5,
                value5: rank8value5split5
            },
            rank9: {
                value1: rank9value1split5,
                value2: rank9value2split5,
                value3: rank9value3split5,
                value4: rank9value4split5,
                value5: rank9value5split5
            },
            rank10: {
                value1: rank10value1split5,
                value2: rank10value2split5,
                value3: rank10value3split5,
                value4: rank10value4split5,
                value5: rank10value5split5
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }
    if (value_trans == "split_by_2_HP") {
        const rank1value5splithp = tables.rank1.value1 && split_by_2(5, parseInt(tables.rank1.value1));
        const rank1value4splithp = tables.rank1.value1 && split_by_2(4, parseInt(tables.rank1.value1));
        const rank1value3splithp = tables.rank1.value1 && split_by_2(3, parseInt(tables.rank1.value1));
        const rank1value2splithp = tables.rank1.value1 && split_by_2(2, parseInt(tables.rank1.value1));
        const rank1value1splithp = tables.rank1.value1 && split_by_2(1, parseInt(tables.rank1.value1));

        tables = {
            rank1: {
                value1: 100,
                value2: rank1value5splithp,
            },
            rank2: {
                value1: rank1value5splithp,
                value2: rank1value4splithp,
            },
            rank3: {
                value1: rank1value4splithp,
                value2: rank1value3splithp,
            },
            rank4: {
                value1: rank1value3splithp,
                value2: rank1value2splithp,
            },
            rank5: {
                value1: rank1value2splithp,
                value2: rank1value1splithp,
            },
            rank6: {
                value1: rank1value2splithp,
                value2: rank1value1splithp,
            },
            rank7: {
                value1: rank1value2splithp,
                value2: rank1value1splithp,
            },
            rank8: {
                value1: rank1value2splithp,
                value2: rank1value1splithp,
            },
            rank9: {
                value1: rank1value2splithp,
                value2: rank1value1splithp,
            },
            rank10: {
                value1: rank1value2splithp,
                value2: rank1value1splithp,
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: "levels",
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }
    if (value_trans == "split_by_2_level") {
        const rank1value5split = tables.rank1.value1 && split_by_2(5, parseInt(tables.rank1.value1));
        const rank1value4split = tables.rank1.value1 && split_by_2(4, parseInt(tables.rank1.value1));
        const rank1value3split = tables.rank1.value1 && split_by_2(3, parseInt(tables.rank1.value1));
        const rank1value2split = tables.rank1.value1 && split_by_2(2, parseInt(tables.rank1.value1));
        const rank1value1split = tables.rank1.value1 && split_by_2(1, parseInt(tables.rank1.value1));
        tables = {
            rank1: {
                value1: rank1value1split,
            },
            rank2: {
                value1: rank1value2split,
            },
            rank3: {
                value1: rank1value3split,
            },
            rank4: {
                value1: rank1value4split,
            },
            rank5: {
                value1: rank1value5split,
            },
            rank6: {
                value1: rank1value5split,
            },
            rank7: {
                value1: rank1value5split,
            },
            rank8: {
                value1: rank1value5split,
            },
            rank9: {
                value1: rank1value5split,
            },
            rank10: {
                value1: rank1value5split,
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: "levels",
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }
    if (value_trans == "100_chance") {
        const rank1 = tables.rank1.value1 && tables.rank1.value1 == 100 ? "" : `${tables.rank1.value1}% chance to `
        const rank2 = tables.rank2.value1 && tables.rank2.value1 == 100 ? "" : `${tables.rank2.value1}% chance to `
        const rank3 = tables.rank3.value1 && tables.rank3.value1 == 100 ? "" : `${tables.rank3.value1}% chance to `
        const rank4 = tables.rank4.value1 && tables.rank4.value1 == 100 ? "" : `${tables.rank4.value1}% chance to `
        const rank5 = tables.rank5.value1 && tables.rank5.value1 == 100 ? "" : `${tables.rank5.value1}% chance to `
        const rank6 = tables.rank6.value1 && tables.rank6.value1 == 100 ? "" : `${tables.rank6.value1}% chance to `
        const rank7 = tables.rank7.value1 && tables.rank7.value1 == 100 ? "" : `${tables.rank7.value1}% chance to `
        const rank8 = tables.rank8.value1 && tables.rank8.value1 == 100 ? "" : `${tables.rank8.value1}% chance to `
        const rank9 = tables.rank9.value1 && tables.rank9.value1 == 100 ? "" : `${tables.rank9.value1}% chance to `
        const rank10 = tables.rank10.value1 && tables.rank10.value1 == 100 ? "" : `${tables.rank10.value1}% chance to `
        tables = {
            rank1: {
                value1: rank1
            },
            rank2: {
                value1: rank2
            },
            rank3: {
                value1: rank3
            },
            rank4: {
                value1: rank4
            },
            rank5: {
                value1: rank5
            },
            rank6: {
                value1: rank6
            },
            rank7: {
                value1: rank7
            },
            rank8: {
                value1: rank8
            },
            rank9: {
                value1: rank9
            },
            rank10: {
                value1: rank10
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }
    if (value_trans == "localestring") {
        const localrank1 = tables.rank1.value1 && tables.rank1.value1.toLocaleString()
        const localrank2 = tables.rank2.value1 && tables.rank2.value1.toLocaleString()
        const localrank3 = tables.rank3.value1 && tables.rank3.value1.toLocaleString()
        const localrank4 = tables.rank4.value1 && tables.rank4.value1.toLocaleString()
        const localrank5 = tables.rank5.value1 && tables.rank5.value1.toLocaleString()
        const localrank6 = tables.rank6.value1 && tables.rank6.value1.toLocaleString()
        const localrank7 = tables.rank7.value1 && tables.rank7.value1.toLocaleString()
        const localrank8 = tables.rank8.value1 && tables.rank8.value1.toLocaleString()
        const localrank9 = tables.rank9.value1 && tables.rank9.value1.toLocaleString()
        const localrank10 = tables.rank10.value1 && tables.rank10.value1.toLocaleString()
        tables = {
            rank1: {
                value1: localrank1
            },
            rank2: {
                value1: localrank2
            },
            rank3: {
                value1: localrank3
            },
            rank4: {
                value1: localrank4
            },
            rank5: {
                value1: localrank5
            },
            rank6: {
                value1: localrank6
            },
            rank7: {
                value1: localrank7
            },
            rank8: {
                value1: localrank8
            },
            rank9: {
                value1: localrank9
            },
            rank10: {
                value1: localrank10
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }
    if (value_trans == "by_100") {
        const rank1 = tables.rank1.value1 && tables.rank1.value1 == 0 ? 100 : Math.abs(100 - tables.rank1.value1)
        const rank2 = tables.rank2.value1 && tables.rank2.value1 == 0 ? 100 : Math.abs(100 - tables.rank2.value1)
        const rank3 = tables.rank3.value1 && tables.rank3.value1 == 0 ? 100 : Math.abs(100 - tables.rank3.value1)
        const rank4 = tables.rank4.value1 && tables.rank4.value1 == 0 ? 100 : Math.abs(100 - tables.rank4.value1)
        const rank5 = tables.rank5.value1 && tables.rank5.value1 == 0 ? 100 : Math.abs(100 - tables.rank5.value1)
        const rank6 = tables.rank6.value1 && tables.rank6.value1 == 0 ? 100 : Math.abs(100 - tables.rank6.value1)
        const rank7 = tables.rank7.value1 && tables.rank7.value1 == 0 ? 100 : Math.abs(100 - tables.rank7.value1)
        const rank8 = tables.rank8.value1 && tables.rank8.value1 == 0 ? 100 : Math.abs(100 - tables.rank8.value1)
        const rank9 = tables.rank9.value1 && tables.rank9.value1 == 0 ? 100 : Math.abs(100 - tables.rank9.value1)
        const rank10 = tables.rank10.value1 && tables.rank10.value1 == 0 ? 100 : Math.abs(100 - tables.rank10.value1)
        tables = {
            rank1: {
                value1: rank1
            },
            rank2: {
                value1: rank2
            },
            rank3: {
                value1: rank3
            },
            rank4: {
                value1: rank4
            },
            rank5: {
                value1: rank5
            },
            rank6: {
                value1: rank6
            },
            rank7: {
                value1: rank7
            },
            rank8: {
                value1: rank8
            },
            rank9: {
                value1: rank9
            },
            rank10: {
                value1: rank10
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }
    if (value_trans == "shield_1") {
        var rank1value1shield1 = Math.floor((tables.rank1.value1 % 10000) / 10);
        var rank1shield = AilmentNames[rank1value1shield1] && AilmentNames[rank1value1shield1].name
        var rank1value2shield1 = Math.floor(tables.rank1.value1 % 10);

        var rank2value1shield1 = Math.floor((tables.rank2.value1 % 10000) / 10);
        var rank2shield = AilmentNames[rank2value1shield1] && AilmentNames[rank2value1shield1].name
        var rank2value2shield1 = Math.floor(tables.rank2.value1 % 10);

        var rank3value1shield1 = Math.floor((tables.rank3.value1 % 10000) / 10);
        var rank3shield = AilmentNames[rank3value1shield1] && AilmentNames[rank3value1shield1].name
        var rank3value2shield1 = Math.floor(tables.rank3.value1 % 10);

        var rank4value1shield1 = Math.floor((tables.rank4.value1 % 10000) / 10);
        var rank4shield = AilmentNames[rank4value1shield1] && AilmentNames[rank4value1shield1].name
        var rank4value2shield1 = Math.floor(tables.rank4.value1 % 10);

        var rank5value1shield1 = Math.floor((tables.rank5.value1 % 10000) / 10);
        var rank5shield = AilmentNames[rank5value1shield1] && AilmentNames[rank5value1shield1].name
        var rank5value2shield1 = Math.floor(tables.rank5.value1 % 10);

        var rank6value1shield1 = Math.floor((tables.rank6.value1 % 10000) / 10);
        var rank6shield = AilmentNames[rank6value1shield1] && AilmentNames[rank6value1shield1].name
        var rank6value2shield1 = Math.floor(tables.rank6.value1 % 10);

        var rank7value1shield1 = Math.floor((tables.rank7.value1 % 10000) / 10);
        var rank7shield = AilmentNames[rank7value1shield1] && AilmentNames[rank7value1shield1].name
        var rank7value2shield1 = Math.floor(tables.rank7.value1 % 10);

        var rank8value1shield1 = Math.floor((tables.rank8.value1 % 10000) / 10);
        var rank8shield = AilmentNames[rank8value1shield1] && AilmentNames[rank8value1shield1].name
        var rank8value2shield1 = Math.floor(tables.rank8.value1 % 10);

        var rank9value1shield1 = Math.floor((tables.rank9.value1 % 10000) / 10);
        var rank9shield = AilmentNames[rank9value1shield1] && AilmentNames[rank9value1shield1].name
        var rank9value2shield1 = Math.floor(tables.rank9.value1 % 10);

        var rank10value1shield1 = Math.floor((tables.rank10.value1 % 10000) / 10);
        var rank10shield = AilmentNames[rank10value1shield1] && AilmentNames[rank10value1shield1].name
        var rank10value2shield1 = Math.floor(tables.rank10.value1 % 10);
        tables = {
            rank1: {
                value1: `[${rank1shield}]`,
                value2: rank1value2shield1,
            },
            rank2: {
                value1: `[${rank2shield}]`,
                value2: rank2value2shield1,
            },
            rank3: {
                value1: `[${rank3shield}]`,
                value2: rank3value2shield1,
            },
            rank4: {
                value1: `[${rank4shield}]`,
                value2: rank4value2shield1,
            },
            rank5: {
                value1: `[${rank5shield}]`,
                value2: rank5value2shield1,
            },
            rank6: {
                value1: `[${rank6shield}]`,
                value2: rank6value2shield1,
            },
            rank7: {
                value1: `[${rank7shield}]`,
                value2: rank7value2shield1,
            },
            rank8: {
                value1: `[${rank8shield}]`,
                value2: rank8value2shield1,
            },
            rank9: {
                value1: `[${rank9shield}]`,
                value2: rank9value2shield1,
            },
            rank10: {
                value1: `[${rank10shield}]`,
                value2: rank10value2shield1,
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }
    if (value_trans == "shield_2") {
        var rank1value1shield2 = Math.floor((tables.rank1.value1 % 100000000) / 10000);
        var rank1shield2 = AilmentNames[rank1value1shield2] && AilmentNames[rank1value1shield2].name
        var rank1value2shield2 = Math.floor((tables.rank1.value1 % 10000) / 1000);
        var rank1value3shield2 = Math.floor(tables.rank1.value1 % 1000);

        var rank2value1shield2 = Math.floor((tables.rank2.value1 % 100000000) / 10000);
        var rank2shield2 = AilmentNames[rank2value1shield2] && AilmentNames[rank2value1shield2].name
        var rank2value2shield2 = Math.floor((tables.rank2.value1 % 10000) / 1000);
        var rank2value3shield2 = Math.floor(tables.rank2.value1 % 1000);

        var rank3value1shield2 = Math.floor((tables.rank3.value1 % 100000000) / 10000);
        var rank3shield2 = AilmentNames[rank3value1shield2] && AilmentNames[rank3value1shield2].name
        var rank3value2shield2 = Math.floor((tables.rank3.value1 % 10000) / 1000);
        var rank3value3shield2 = Math.floor(tables.rank3.value1 % 1000);

        var rank4value1shield2 = Math.floor((tables.rank4.value1 % 100000000) / 10000);
        var rank4shield2 = AilmentNames[rank4value1shield2] && AilmentNames[rank4value1shield2].name
        var rank4value2shield2 = Math.floor((tables.rank4.value1 % 10000) / 1000);
        var rank4value3shield2 = Math.floor(tables.rank4.value1 % 1000);

        var rank5value1shield2 = Math.floor((tables.rank5.value1 % 100000000) / 10000);
        var rank5shield2 = AilmentNames[rank5value1shield2] && AilmentNames[rank5value1shield2].name
        var rank5value2shield2 = Math.floor((tables.rank5.value1 % 10000) / 1000);
        var rank5value3shield2 = Math.floor(tables.rank5.value1 % 1000);

        var rank6value1shield2 = Math.floor((tables.rank6.value1 % 100000000) / 10000);
        var rank6shield2 = AilmentNames[rank6value1shield2] && AilmentNames[rank6value1shield2].name
        var rank6value2shield2 = Math.floor((tables.rank6.value1 % 10000) / 1000);
        var rank6value3shield2 = Math.floor(tables.rank6.value1 % 1000);

        var rank7value1shield2 = Math.floor((tables.rank7.value1 % 100000000) / 10000);
        var rank7shield2 = AilmentNames[rank7value1shield2] && AilmentNames[rank7value1shield2].name
        var rank7value2shield2 = Math.floor((tables.rank7.value1 % 10000) / 1000);
        var rank7value3shield2 = Math.floor(tables.rank7.value1 % 1000);

        var rank8value1shield2 = Math.floor((tables.rank8.value1 % 100000000) / 10000);
        var rank8shield2 = AilmentNames[rank8value1shield2] && AilmentNames[rank8value1shield2].name
        var rank8value2shield2 = Math.floor((tables.rank8.value1 % 10000) / 1000);
        var rank8value3shield2 = Math.floor(tables.rank8.value1 % 1000);

        var rank9value1shield2 = Math.floor((tables.rank9.value1 % 100000000) / 10000);
        var rank9shield2 = AilmentNames[rank9value1shield2] && AilmentNames[rank9value1shield2].name
        var rank9value2shield2 = Math.floor((tables.rank9.value1 % 10000) / 1000);
        var rank9value3shield2 = Math.floor(tables.rank9.value1 % 1000);

        var rank10value1shield2 = Math.floor((tables.rank10.value1 % 100000000) / 10000);
        var rank10shield2 = AilmentNames[rank10value1shield2] && AilmentNames[rank10value1shield2].name
        var rank10value2shield2 = Math.floor((tables.rank10.value1 % 10000) / 1000);
        var rank10value3shield2 = Math.floor(tables.rank10.value1 % 1000);
        tables = {
            rank1: {
                value1: `[${rank1shield2}]`,
                value2: rank1value2shield2,
                value3: rank1value3shield2
            },
            rank2: {
                value1: `[${rank2shield2}]`,
                value2: rank2value2shield2,
                value3: rank2value3shield2
            },
            rank3: {
                value1: `[${rank3shield2}]`,
                value2: rank3value2shield2,
                value3: rank3value3shield2
            },
            rank4: {
                value1: `[${rank4shield2}]`,
                value2: rank4value2shield2,
                value3: rank4value3shield2
            },
            rank5: {
                value1: `[${rank5shield2}]`,
                value2: rank5value2shield2,
                value3: rank5value3shield2
            },
            rank6: {
                value1: `[${rank6shield2}]`,
                value2: rank6value2shield2,
                value3: rank6value3shield2
            },
            rank7: {
                value1: `[${rank7shield2}]`,
                value2: rank7value2shield2,
                value3: rank7value3shield2
            },
            rank8: {
                value1: `[${rank8shield2}]`,
                value2: rank8value2shield2,
                value3: rank8value3shield2
            },
            rank9: {
                value1: `[${rank9shield2}]`,
                value2: rank9value2shield2,
                value3: rank9value3shield2
            },
            rank10: {
                value1: `[${rank10shield2}]`,
                value2: rank10value2shield2,
                value3: rank10value3shield2
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }
    if(value_trans == "command_id_split_2"){
        //rank1
        var rank1comdid = tables.rank1.value1 && Math.floor((tables.rank1.value1 % 1000000) / 10);
        var rank1comdid1 = CommandNames[rank1comdid]
        var rank1str_1 = `[${rank1comdid1 && rank1comdid1.name}] - #${rank1comdid}`
        if (rank1str_1 == "[undefined] - #0") {
            rank1str_1 = undefined
        }
        if (rank1str_1 == "[undefined] - #undefined") {
            rank1str_1 = undefined
        }
        var rank1value2_id = tables.rank1.value1 && Math.floor(tables.rank1.value1 % 10);

        //rank2
        var rank2comdid = tables.rank2.value1 && Math.floor((tables.rank2.value1 % 1000000) / 10);
        var rank2comdid1 = CommandNames[rank2comdid]
        var rank2str_1 = `[${rank2comdid1 && rank2comdid1.name}] - #${rank2comdid}`
        if (rank2str_1 == "[undefined] - #0") {
            rank2str_1 = undefined
        }
        if (rank2str_1 == "[undefined] - #undefined") {
            rank2str_1 = undefined
        }
        var rank2value2_id = tables.rank2.value1 && Math.floor(tables.rank2.value1 % 10);

        //rank3
        var rank3comdid = tables.rank3.value1 && Math.floor((tables.rank3.value1 % 1000000) / 10);
        var rank3comdid1 = CommandNames[rank3comdid]
        var rank3str_1 = `[${rank3comdid1 && rank3comdid1.name}] - #${rank3comdid}`
        if (rank3str_1 == "[undefined] - #0") {
            rank3str_1 = undefined
        }
        if (rank3str_1 == "[undefined] - #undefined") {
            rank3str_1 = undefined
        }
        var rank3value2_id = tables.rank3.value1 && Math.floor(tables.rank3.value1 % 10);

        //rank4
        var rank4comdid = tables.rank4.value1 && Math.floor((tables.rank4.value1 % 1000000) / 10);
        var rank4comdid1 = CommandNames[rank4comdid]
        var rank4str_1 = `[${rank4comdid1 && rank4comdid1.name}] - #${rank4comdid}`
        if (rank4str_1 == "[undefined] - #0") {
            rank4str_1 = undefined
        }
        if (rank4str_1 == "[undefined] - #undefined") {
            rank4str_1 = undefined
        }
        var rank4value2_id = tables.rank4.value1 && Math.floor(tables.rank4.value1 % 10)

        //rank5
        var rank5comdid = tables.rank5.value1 && Math.floor((tables.rank5.value1 % 1000000) / 10);
        var rank5comdid1 = CommandNames[rank5comdid]
        var rank5str_1 = `[${rank5comdid1 && rank5comdid1.name}] - #${rank5comdid}`
        if (rank5str_1 == "[undefined] - #0") {
            rank5str_1 = undefined
        }
        if (rank5str_1 == "[undefined] - #undefined") {
            rank5str_1 = undefined
        }
        var rank5value2_id = tables.rank5.value1 && Math.floor(tables.rank5.value1 % 10)

        //rank6
        var rank6comdid = tables.rank6.value1 && Math.floor((tables.rank6.value1 % 1000000) / 10);
        var rank6comdid1 = CommandNames[rank6comdid]
        var rank6str_1 = `[${rank6comdid1 && rank6comdid1.name}] - #${rank6comdid}`
        if (rank6str_1 == "[undefined] - #0") {
            rank6str_1 = undefined
        }
        if (rank6str_1 == "[undefined] - #undefined") {
            rank6str_1 = undefined
        }
        var rank6value2_id = tables.rank6.value1 && Math.floor(tables.rank6.value1 % 10)
        
        //rank7
        var rank7comdid = tables.rank7.value1 && Math.floor((tables.rank7.value1 % 1000000) / 10);
        var rank7comdid1 = CommandNames[rank7comdid]
        var rank7str_1 = `[${rank7comdid1 && rank7comdid1.name}] - #${rank7comdid}`
        if (rank7str_1 == "[undefined] - #0") {
            rank7str_1 = undefined
        }
        if (rank7str_1 == "[undefined] - #undefined") {
            rank7str_1 = undefined
        }
        var rank7value2_id = tables.rank7.value1 && Math.floor(tables.rank7.value1 % 10)
        
        //rank8
        var rank8comdid = tables.rank8.value1 && Math.floor((tables.rank8.value1 % 1000000) / 10);
        var rank8comdid1 = CommandNames[rank8comdid]
        var rank8str_1 = `[${rank8comdid1 && rank8comdid1.name}] - #${rank8comdid}`
        if (rank8str_1 == "[undefined] - #0") {
            rank8str_1 = undefined
        }
        if (rank8str_1 == "[undefined] - #undefined") {
            rank8str_1 = undefined
        }
        var rank8value2_id = tables.rank8.value1 && Math.floor(tables.rank8.value1 % 10)

        //rank9
        var rank9comdid = tables.rank9.value1 && Math.floor((tables.rank9.value1 % 1000000) / 10);
        var rank9comdid1 = CommandNames[rank9comdid]
        var rank9str_1 = `[${rank9comdid1 && rank9comdid1.name}] - #${rank9comdid}`
        if (rank9str_1 == "[undefined] - #0") {
            rank9str_1 = undefined
        }
        if (rank9str_1 == "[undefined] - #undefined") {
            rank9str_1 = undefined
        }
        var rank9value2_id = tables.rank9.value1 && Math.floor(tables.rank9.value1 % 10)

        //rank10
        var rank10comdid = tables.rank10.value1 && Math.floor((tables.rank10.value1 % 1000000) / 10);
        var rank10comdid1 = CommandNames[rank10comdid]
        var rank10str_1 = `[${rank10comdid1 && rank10comdid1.name}] - #${rank10comdid}`
        if (rank10str_1 == "[undefined] - #0") {
            rank10str_1 = undefined
        }
        if (rank10str_1 == "[undefined] - #undefined") {
            rank10str_1 = undefined
        }
        var rank10value2_id = tables.rank10.value1 && Math.floor(tables.rank10.value1 % 10)

        tables = {
            rank1: {
                value1: rank1str_1,
                value2: rank1value2_id
            },
            rank2: {
                value1: rank2str_1,
                value2: rank2value2_id
            },
            rank3: {
                value1: rank3str_1,
                value2: rank3value2_id
            },
            rank4: {
                value1: rank4str_1,
                value2: rank4value2_id
            },
            rank5: {
                value1: rank5str_1,
                value2: rank5value2_id
            },
            rank6: {
                value1: rank6str_1,
                value2: rank6value2_id
            },
            rank7: {
                value1: rank7str_1,
                value2: rank7value2_id
            },
            rank8: {
                value1: rank8str_1,
                value2: rank8value2_id
            },
            rank9: {
                value1: rank9str_1,
                value2: rank9value2_id
            },
            rank10: {
                value1: rank10str_1,
                value2: rank10value2_id
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }
    if (value_trans == "command_id") {
        var rank1comd = CommandNames[tables.rank1.value1]
        var rank1str = `[${rank1comd && rank1comd.name}] - #${tables.rank1.value1}`
        if (rank1str == "[undefined] - #0") {
            rank1str = undefined
        }
        if (rank1str == "[undefined] - #undefined") {
            rank1str = undefined
        }
        var rank2comd = CommandNames[tables.rank2.value1]
        var rank2str = `[${rank2comd && rank2comd.name}] - #${tables.rank2.value1}`
        if (rank2str == "[undefined] - #0") {
            rank2str = undefined
        }
        if (rank2str == "[undefined] - #undefined") {
            rank2str = undefined
        }
        var rank3comd = CommandNames[tables.rank3.value1]
        var rank3str = `[${rank3comd && rank3comd.name}] - #${tables.rank3.value1}`
        if (rank3str == "[undefined] - #0") {
            rank3str = undefined
        }
        if (rank3str == "[undefined] - #undefined") {
            rank3str = undefined
        }
        var rank4comd = CommandNames[tables.rank4.value1]
        var rank4str = `[${rank4comd && rank4comd.name}] - #${tables.rank4.value1}`
        if (rank4str == "[undefined] - #0") {
            rank4str = undefined
        }
        if (rank4str == "[undefined] - #undefined") {
            rank4str = undefined
        }
        var rank5comd = CommandNames[tables.rank5.value1]
        var rank5str = `[${rank5comd && rank5comd.name}] - #${tables.rank5.value1}`
        if (rank5str == "[undefined] - #0") {
            rank5str = undefined
        }
        if (rank5str == "[undefined] - #undefined") {
            rank5str = undefined
        }
        var rank6comd = CommandNames[tables.rank6.value1]
        var rank6str = `[${rank6comd && rank6comd.name}] - #${tables.rank6.value1}`
        if (rank6str == "[undefined] - #0") {
            rank6str = undefined
        }
        if (rank6str == "[undefined] - #undefined") {
            rank6str = undefined
        }
        var rank7comd = CommandNames[tables.rank7.value1]
        var rank7str = `[${rank7comd && rank7comd.name}] - #${tables.rank7.value1}`
        if (rank7str == "[undefined] - #0") {
            rank7str = undefined
        }
        if (rank7str == "[undefined] - #undefined") {
            rank7str = undefined
        }
        var rank8comd = CommandNames[tables.rank8.value1]
        var rank8str = `[${rank8comd && rank8comd.name}] - #${tables.rank8.value1}`
        if (rank8str == "[undefined] - #0") {
            rank8str = undefined
        }
        if (rank8str == "[undefined] - #undefined") {
            rank8str = undefined
        }
        var rank9comd = CommandNames[tables.rank9.value1]
        var rank9str = `[${rank9comd && rank9comd.name}] - #${tables.rank9.value1}`
        if (rank9str == "[undefined] - #0") {
            rank9str = undefined
        }
        if (rank9str == "[undefined] - #undefined") {
            rank9str = undefined
        }
        var rank10comd = CommandNames[tables.rank10.value1]
        var rank10str = `[${rank10comd && rank10comd.name}] - #${tables.rank10.value1}`
        if (rank10str == "[undefined] - #0") {
            rank10str = undefined
        }
        if (rank10str == "[undefined] - #undefined") {
            rank10str = undefined
        }
        tables = {
            rank1: {
                value1: rank1str
            },
            rank2: {
                value1: rank2str
            },
            rank3: {
                value1: rank3str
            },
            rank4: {
                value1: rank4str
            },
            rank5: {
                value1: rank5str
            },
            rank6: {
                value1: rank6str
            },
            rank7: {
                value1: rank7str
            },
            rank8: {
                value1: rank8str
            },
            rank9: {
                value1: rank9str
            },
            rank10: {
                value1: rank10str
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }
    if (value_trans == "split_3_rev") {
        var rank1value1split3rev = val_edit_type_handler(4, tables.rank1.value1)
        var rank1value2split3rev = val_edit_type_handler(3, tables.rank1.value1)
        var rank1value3split3rev = val_edit_type_handler(2, tables.rank1.value1)

        var rank2value1split3rev = val_edit_type_handler(4, tables.rank2.value1)
        var rank2value2split3rev = val_edit_type_handler(3, tables.rank2.value1)
        var rank2value3split3rev = val_edit_type_handler(2, tables.rank2.value1)

        var rank3value1split3rev = val_edit_type_handler(4, tables.rank3.value1)
        var rank3value2split3rev = val_edit_type_handler(3, tables.rank3.value1)
        var rank3value3split3rev = val_edit_type_handler(2, tables.rank3.value1)

        var rank4value1split3rev = val_edit_type_handler(4, tables.rank4.value1)
        var rank4value2split3rev = val_edit_type_handler(3, tables.rank4.value1)
        var rank4value3split3rev = val_edit_type_handler(2, tables.rank4.value1)

        var rank5value1split3rev = val_edit_type_handler(4, tables.rank5.value1)
        var rank5value2split3rev = val_edit_type_handler(3, tables.rank5.value1)
        var rank5value3split3rev = val_edit_type_handler(2, tables.rank5.value1)

        var rank6value1split3rev = val_edit_type_handler(4, tables.rank6.value1)
        var rank6value2split3rev = val_edit_type_handler(3, tables.rank6.value1)
        var rank6value3split3rev = val_edit_type_handler(2, tables.rank6.value1)

        var rank7value1split3rev = val_edit_type_handler(4, tables.rank7.value1)
        var rank7value2split3rev = val_edit_type_handler(3, tables.rank7.value1)
        var rank7value3split3rev = val_edit_type_handler(2, tables.rank7.value1)

        var rank8value1split3rev = val_edit_type_handler(4, tables.rank8.value1)
        var rank8value2split3rev = val_edit_type_handler(3, tables.rank8.value1)
        var rank8value3split3rev = val_edit_type_handler(2, tables.rank8.value1)

        var rank9value1split3rev = val_edit_type_handler(4, tables.rank9.value1)
        var rank9value2split3rev = val_edit_type_handler(3, tables.rank9.value1)
        var rank9value3split3rev = val_edit_type_handler(2, tables.rank9.value1)

        var rank10value1split3rev = val_edit_type_handler(4, tables.rank10.value1)
        var rank10value2split3rev = val_edit_type_handler(3, tables.rank10.value1)
        var rank10value3split3rev = val_edit_type_handler(2, tables.rank10.value1)
        tables = {
            rank1: {
                value1: rank1value1split3rev,
                value2: rank1value2split3rev,
                value3: rank1value3split3rev
            },
            rank2: {
                value1: rank2value1split3rev,
                value2: rank2value2split3rev,
                value3: rank2value3split3rev
            },
            rank3: {
                value1: rank3value1split3rev,
                value2: rank3value2split3rev,
                value3: rank3value3split3rev
            },
            rank4: {
                value1: rank4value1split3rev,
                value2: rank4value2split3rev,
                value3: rank4value3split3rev
            },
            rank5: {
                value1: rank5value1split3rev,
                value2: rank5value2split3rev,
                value3: rank5value3split3rev
            },
            rank6: {
                value1: rank6value1split3rev,
                value2: rank6value2split3rev,
                value3: rank6value3split3rev
            },
            rank7: {
                value1: rank7value1split3rev,
                value2: rank7value2split3rev,
                value3: rank7value3split3rev
            },
            rank8: {
                value1: rank8value1split3rev,
                value2: rank8value2split3rev,
                value3: rank8value3split3rev
            },
            rank9: {
                value1: rank9value1split3rev,
                value2: rank9value2split3rev,
                value3: rank9value3split3rev
            },
            rank10: {
                value1: rank10value1split3rev,
                value2: rank10value2split3rev,
                value3: rank10value3split3rev
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }

    if (value_trans == "split_3") {
        var rank1value1 = val_edit_type_handler(2, tables.rank1.value1)
        var rank1value2 = val_edit_type_handler(3, tables.rank1.value1)
        var rank1value3 = val_edit_type_handler(4, tables.rank1.value1)
        var rank2value1 = val_edit_type_handler(2, tables.rank2.value1)
        var rank2value2 = val_edit_type_handler(3, tables.rank2.value1)
        var rank2value3 = val_edit_type_handler(4, tables.rank2.value1)
        var rank3value1 = val_edit_type_handler(2, tables.rank3.value1)
        var rank3value2 = val_edit_type_handler(3, tables.rank3.value1)
        var rank3value3 = val_edit_type_handler(4, tables.rank3.value1)
        var rank4value1 = val_edit_type_handler(2, tables.rank4.value1)
        var rank4value2 = val_edit_type_handler(3, tables.rank4.value1)
        var rank4value3 = val_edit_type_handler(4, tables.rank4.value1)
        var rank5value1 = val_edit_type_handler(2, tables.rank5.value1)
        var rank5value2 = val_edit_type_handler(3, tables.rank5.value1)
        var rank5value3 = val_edit_type_handler(4, tables.rank5.value1)
        var rank6value1 = val_edit_type_handler(2, tables.rank6.value1)
        var rank6value2 = val_edit_type_handler(3, tables.rank6.value1)
        var rank6value3 = val_edit_type_handler(4, tables.rank6.value1)
        var rank7value1 = val_edit_type_handler(2, tables.rank7.value1)
        var rank7value2 = val_edit_type_handler(3, tables.rank7.value1)
        var rank7value3 = val_edit_type_handler(4, tables.rank7.value1)
        var rank8value1 = val_edit_type_handler(2, tables.rank8.value1)
        var rank8value2 = val_edit_type_handler(3, tables.rank8.value1)
        var rank8value3 = val_edit_type_handler(4, tables.rank8.value1)
        var rank9value1 = val_edit_type_handler(2, tables.rank9.value1)
        var rank9value2 = val_edit_type_handler(3, tables.rank9.value1)
        var rank9value3 = val_edit_type_handler(4, tables.rank9.value1)
        var rank10value1 = val_edit_type_handler(2, tables.rank10.value1)
        var rank10value2 = val_edit_type_handler(3, tables.rank10.value1)
        var rank10value3 = val_edit_type_handler(4, tables.rank10.value1)
        tables = {
            rank1: {
                value1: rank1value1,
                value2: rank1value2,
                value3: rank1value3
            },
            rank2: {
                value1: rank2value1,
                value2: rank2value2,
                value3: rank2value3
            },
            rank3: {
                value1: rank3value1,
                value2: rank3value2,
                value3: rank3value3
            },
            rank4: {
                value1: rank4value1,
                value2: rank4value2,
                value3: rank4value3
            },
            rank5: {
                value1: rank5value1,
                value2: rank5value2,
                value3: rank5value3
            },
            rank6: {
                value1: rank6value1,
                value2: rank6value2,
                value3: rank6value3
            },
            rank7: {
                value1: rank7value1,
                value2: rank7value2,
                value3: rank7value3
            },
            rank8: {
                value1: rank8value1,
                value2: rank8value2,
                value3: rank8value3
            },
            rank9: {
                value1: rank9value1,
                value2: rank9value2,
                value3: rank9value3
            },
            rank10: {
                value1: rank10value1,
                value2: rank10value2,
                value3: rank10value3
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }
    if (value_trans == "ailment_id_1_zero_off") {
        var rank1ail = AilmentNames[tables.rank1.value1]
        var rank1strail = `[${rank1ail && rank1ail.name}] - #${tables.rank1.value1} is NOT active`
        if (rank1strail == "[undefined] - #0 is NOT active") {
            rank1strail = `[-effect inactive-]`
        }
        if (rank1strail == "[undefined] - #undefined is NOT active") {
            rank1strail = `[-effect inactive-]`
        }
        var rank2ail = AilmentNames[tables.rank2.value1]
        var rank2strail = `[${rank2ail && rank2ail.name}] - #${tables.rank2.value1} is NOT active`
        if (rank2strail == "[undefined] - #0 is NOT active") {
            rank2strail = `[-effect inactive-]`
        }
        if (rank2strail == "[undefined] - #undefined is NOT active") {
            rank2strail = `[-effect inactive-]`
        }
        var rank3ail = AilmentNames[tables.rank3.value1]
        var rank3strail = `[${rank3ail && rank3ail.name}] - #${tables.rank3.value1} is NOT active`
        if (rank3strail == "[undefined] - #0 is NOT active") {
            rank3strail = `[-effect inactive-]`
        }
        if (rank3strail == "[undefined] - #undefined is NOT active") {
            rank3strail = `[-effect inactive-]`
        }
        var rank4ail = AilmentNames[tables.rank4.value1]
        var rank4strail = `[${rank4ail && rank4ail.name}] - #${tables.rank4.value1} is NOT active`
        if (rank4strail == "[undefined] - #0 is NOT active") {
            rank4strail = `[-effect inactive-]`
        }
        if (rank4strail == "[undefined] - #undefined is NOT active") {
            rank4strail = `[-effect inactive-]`
        }
        var rank5ail = AilmentNames[tables.rank5.value1]
        var rank5strail = `[${rank5ail && rank5ail.name}] - #${tables.rank5.value1} is NOT active`
        if (rank5strail == "[undefined] - #0 is NOT active") {
            rank5strail = `[-effect inactive-]`
        }
        if (rank5strail == "[undefined] - #undefined is NOT active") {
            rank5strail = `[-effect inactive-]`
        }
        var rank6ail = AilmentNames[tables.rank6.value1]
        var rank6strail = `[${rank6ail && rank6ail.name}] - #${tables.rank6.value1} is NOT active`
        if (rank6strail == "[undefined] - #0 is NOT active") {
            rank6strail = `[-effect inactive-]`
        }
        if (rank6strail == "[undefined] - #undefined is NOT active") {
            rank6strail = `[-effect inactive-]`
        }
        var rank7ail = AilmentNames[tables.rank7.value1]
        var rank7strail = `[${rank7ail && rank7ail.name}] - #${tables.rank7.value1} is NOT active`
        if (rank7strail == "[undefined] - #0 is NOT active") {
            rank7strail = `[-effect inactive-]`
        }
        if (rank7strail == "[undefined] - #undefined is NOT active") {
            rank7strail = `[-effect inactive-]`
        }
        var rank8ail = AilmentNames[tables.rank8.value1]
        var rank8strail = `[${rank8ail && rank8ail.name}] - #${tables.rank8.value1} is NOT active`
        if (rank8strail == "[undefined] - #0 is NOT active") {
            rank8strail = `[-effect inactive-]`
        }
        if (rank8strail == "[undefined] - #undefined is NOT active") {
            rank8strail = `[-effect inactive-]`
        }
        var rank9ail = AilmentNames[tables.rank9.value1]
        var rank9strail = `[${rank9ail && rank9ail.name}] - #${tables.rank9.value1} is NOT active`
        if (rank9strail == "[undefined] - #0 is NOT active") {
            rank9strail = `[-effect inactive-]`
        }
        if (rank9strail == "[undefined] - #undefined is NOT active") {
            rank9strail = `[-effect inactive-]`
        }
        var rank10ail = AilmentNames[tables.rank10.value1]
        var rank10strail = `[${rank10ail && rank10ail.name}] - #${tables.rank10.value1} is NOT active`
        if (rank10strail == "[undefined] - #0 is NOT active") {
            rank10strail = `[-effect inactive-]`
        }
        if (rank10strail == "[undefined] - #undefined is NOT active") {
            rank10strail = `[-effect inactive-]`
        }
        tables = {
            rank1: {
                value1: rank1strail
            },
            rank2: {
                value1: rank2strail
            },
            rank3: {
                value1: rank3strail
            },
            rank4: {
                value1: rank4strail
            },
            rank5: {
                value1: rank5strail
            },
            rank6: {
                value1: rank6strail
            },
            rank7: {
                value1: rank7strail
            },
            rank8: {
                value1: rank8strail
            },
            rank9: {
                value1: rank9strail
            },
            rank10: {
                value1: rank10strail
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }
    if (value_trans == "ailment_id_1") {
        rank1ail = AilmentNames[tables.rank1.value1]
        rank1strail = `[${rank1ail && rank1ail.name}] - #${tables.rank1.value1}`
        if (rank1strail == "[undefined] - #0") {
            rank1strail = undefined
        }
        if (rank1strail == "[undefined] - #undefined") {
            rank1strail = undefined
        }
        rank2ail = AilmentNames[tables.rank2.value1]
        rank2strail = `[${rank2ail && rank2ail.name}] - #${tables.rank2.value1}`
        if (rank2strail == "[undefined] - #0") {
            rank2strail = undefined
        }
        if (rank2strail == "[undefined] - #undefined") {
            rank2strail = undefined
        }
        rank3ail = AilmentNames[tables.rank3.value1]
        rank3strail = `[${rank3ail && rank3ail.name}] - #${tables.rank3.value1}`
        if (rank3strail == "[undefined] - #0") {
            rank3strail = undefined
        }
        if (rank3strail == "[undefined] - #undefined") {
            rank3strail = undefined
        }
        rank4ail = AilmentNames[tables.rank4.value1]
        rank4strail = `[${rank4ail && rank4ail.name}] - #${tables.rank4.value1}`
        if (rank4strail == "[undefined] - #0") {
            rank4strail = undefined
        }
        if (rank4strail == "[undefined] - #undefined") {
            rank4strail = undefined
        }
        rank5ail = AilmentNames[tables.rank5.value1]
        rank5strail = `[${rank5ail && rank5ail.name}] - #${tables.rank5.value1}`
        if (rank5strail == "[undefined] - #0") {
            rank5strail = undefined
        }
        if (rank5strail == "[undefined] - #undefined") {
            rank5strail = undefined
        }
        rank6ail = AilmentNames[tables.rank6.value1]
        rank6strail = `[${rank6ail && rank6ail.name}] - #${tables.rank6.value1}`
        if (rank6strail == "[undefined] - #0") {
            rank6strail = undefined
        }
        if (rank6strail == "[undefined] - #undefined") {
            rank6strail = undefined
        }
        rank7ail = AilmentNames[tables.rank7.value1]
        rank7strail = `[${rank7ail && rank7ail.name}] - #${tables.rank7.value1}`
        if (rank7strail == "[undefined] - #0") {
            rank7strail = undefined
        }
        if (rank7strail == "[undefined] - #undefined") {
            rank7strail = undefined
        }
        rank8ail = AilmentNames[tables.rank8.value1]
        rank8strail = `[${rank8ail && rank8ail.name}] - #${tables.rank8.value1}`
        if (rank8strail == "[undefined] - #0") {
            rank8strail = undefined
        }
        if (rank8strail == "[undefined] - #undefined") {
            rank8strail = undefined
        }
        rank9ail = AilmentNames[tables.rank9.value1]
        rank9strail = `[${rank9ail && rank9ail.name}] - #${tables.rank9.value1}`
        if (rank9strail == "[undefined] - #0") {
            rank9strail = undefined
        }
        if (rank9strail == "[undefined] - #undefined") {
            rank9strail = undefined
        }
        rank10ail = AilmentNames[tables.rank10.value1]
        rank10strail = `[${rank10ail && rank10ail.name}] - #${tables.rank10.value1}`
        if (rank10strail == "[undefined] - #0") {
            rank10strail = undefined
        }
        if (rank10strail == "[undefined] - #undefined") {
            rank10strail = undefined
        }
        tables = {
            rank1: {
                value1: rank1strail
            },
            rank2: {
                value1: rank2strail
            },
            rank3: {
                value1: rank3strail
            },
            rank4: {
                value1: rank4strail
            },
            rank5: {
                value1: rank5strail
            },
            rank6: {
                value1: rank6strail
            },
            rank7: {
                value1: rank7strail
            },
            rank8: {
                value1: rank8strail
            },
            rank9: {
                value1: rank9strail
            },
            rank10: {
                value1: rank10strail
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }
    if (value_trans == "ailment_id_2") {
        var rank1value1ailment2 = tables.rank1.value1 && Math.floor((tables.rank1.value1 % 1000000) / 100);
        var rank1value2ailment2 = tables.rank1.value1 && Math.floor(tables.rank1.value1 % 100);
        var rank1ail2 = tables.rank1.value1 && AilmentNames[rank1value1ailment2]
        var rank1strailailment2 = `[${rank1ail2 && rank1ail2.name}] - #${rank1value1ailment2}`
        if (rank1strailailment2 == "[undefined] - #0") {
            rank1strailailment2 = undefined
        }
        if (rank1strailailment2 == "[undefined] - #undefined") {
            rank1strailailment2 = undefined
        }
        var rank2value1ailment2 = tables.rank2.value1 && Math.floor((tables.rank2.value1 % 1000000) / 100);
        var rank2value2ailment2 = tables.rank2.value1 && Math.floor(tables.rank2.value1 % 100);
        var rank2ail2 = tables.rank2.value1 && AilmentNames[rank2value1ailment2]
        var rank2strailailment2 = `[${rank2ail2 && rank2ail2.name}] - #${rank2value1ailment2}`
        if (rank2strailailment2 == "[undefined] - #0") {
            rank2strailailment2 = undefined
        }
        if (rank2strailailment2 == "[undefined] - #undefined") {
            rank2strailailment2 = undefined
        }
        var rank3value1ailment2 = tables.rank3.value1 && Math.floor((tables.rank3.value1 % 1000000) / 100);
        var rank3value2ailment2 = tables.rank3.value1 && Math.floor(tables.rank3.value1 % 100);
        var rank3ail2 = tables.rank3.value1 && AilmentNames[rank3value1ailment2]
        var rank3strailailment2 = `[${rank3ail2 && rank3ail2.name}] - #${rank3value1ailment2}`
        if (rank3strailailment2 == "[undefined] - #0") {
            rank3strailailment2 = undefined
        }
        if (rank3strailailment2 == "[undefined] - #undefined") {
            rank3strailailment2 = undefined
        }
        var rank4value1ailment2 = tables.rank4.value1 && Math.floor((tables.rank4.value1 % 1000000) / 100);
        var rank4value2ailment2 = tables.rank4.value1 && Math.floor(tables.rank4.value1 % 100);
        var rank4ail2 = tables.rank4.value1 && AilmentNames[rank4value1ailment2]
        var rank4strailailment2 = `[${rank4ail2 && rank4ail2.name}] - #${rank4value1ailment2}`
        if (rank4strailailment2 == "[undefined] - #0") {
            rank4strailailment2 = undefined
        }
        if (rank4strailailment2 == "[undefined] - #undefined") {
            rank4strailailment2 = undefined
        }
        var rank5value1ailment2 = tables.rank5.value1 && Math.floor((tables.rank5.value1 % 1000000) / 100);
        var rank5value2ailment2 = tables.rank5.value1 && Math.floor(tables.rank5.value1 % 100);
        var rank5ail2 = tables.rank5.value1 && AilmentNames[rank5value1ailment2]
        var rank5strailailment2 = `[${rank5ail2 && rank5ail2.name}] - #${rank5value1ailment2}`
        if (rank5strailailment2 == "[undefined] - #0") {
            rank5strailailment2 = undefined
        }
        if (rank5strailailment2 == "[undefined] - #undefined") {
            rank5strailailment2 = undefined
        }
        var rank6value1ailment2 = tables.rank6.value1 && Math.floor((tables.rank6.value1 % 1000000) / 100);
        var rank6value2ailment2 = tables.rank6.value1 && Math.floor(tables.rank6.value1 % 100);
        var rank6ail2 = tables.rank6.value1 && AilmentNames[rank6value1ailment2]
        var rank6strailailment2 = `[${rank6ail2 && rank6ail2.name}] - #${rank6value1ailment2}`
        if (rank6strailailment2 == "[undefined] - #0") {
            rank6strailailment2 = undefined
        }
        if (rank6strailailment2 == "[undefined] - #undefined") {
            rank6strailailment2 = undefined
        }
        var rank7value1ailment2 = tables.rank7.value1 && Math.floor((tables.rank7.value1 % 1000000) / 100);
        var rank7value2ailment2 = tables.rank7.value1 && Math.floor(tables.rank7.value1 % 100);
        var rank7ail2 = tables.rank7.value1 && AilmentNames[rank7value1ailment2]
        var rank7strailailment2 = `[${rank7ail2 && rank7ail2.name}] - #${rank7value1ailment2}`
        if (rank7strailailment2 == "[undefined] - #0") {
            rank7strailailment2 = undefined
        }
        if (rank7strailailment2 == "[undefined] - #undefined") {
            rank7strailailment2 = undefined
        }
        var rank8value1ailment2 = tables.rank8.value1 && Math.floor((tables.rank8.value1 % 1000000) / 100);
        var rank8value2ailment2 = tables.rank8.value1 && Math.floor(tables.rank8.value1 % 100);
        var rank8ail2 = tables.rank8.value1 && AilmentNames[rank8value1ailment2]
        var rank8strailailment2 = `[${rank8ail2 && rank8ail2.name}] - #${rank8value1ailment2}`
        if (rank8strailailment2 == "[undefined] - #0") {
            rank8strailailment2 = undefined
        }
        if (rank8strailailment2 == "[undefined] - #undefined") {
            rank8strailailment2 = undefined
        }
        var rank9value1ailment2 = tables.rank9.value1 && Math.floor((tables.rank9.value1 % 1000000) / 100);
        var rank9value2ailment2 = tables.rank9.value1 && Math.floor(tables.rank9.value1 % 100);
        var rank9ail2 = tables.rank9.value1 && AilmentNames[rank9value1ailment2]
        var rank9strailailment2 = `[${rank9ail2 && rank9ail2.name}] - #${rank9value1ailment2}`
        if (rank9strailailment2 == "[undefined] - #0") {
            rank9strailailment2 = undefined
        }
        if (rank9strailailment2 == "[undefined] - #undefined") {
            rank9strailailment2 = undefined
        }
        var rank10value1ailment2 = tables.rank10.value1 && Math.floor((tables.rank10.value1 % 1000000) / 100);
        var rank10value2ailment2 = tables.rank10.value1 && Math.floor(tables.rank10.value1 % 100);
        var rank10ail2 = tables.rank10.value1 && AilmentNames[rank10value1ailment2]
        var rank10strailailment2 = `[${rank10ail2 && rank10ail2.name}] - #${rank10value1ailment2}`
        if (rank10strailailment2 == "[undefined] - #0") {
            rank10strailailment2 = undefined
        }
        if (rank10strailailment2 == "[undefined] - #undefined") {
            rank10strailailment2 = undefined
        }
        tables = {
            rank1: {
                value1: rank1strailailment2,
                value2: rank1value2ailment2
            },
            rank2: {
                value1: rank2strailailment2,
                value2: rank2value2ailment2
            },
            rank3: {
                value1: rank3strailailment2,
                value2: rank3value2ailment2
            },
            rank4: {
                value1: rank4strailailment2,
                value2: rank4value2ailment2
            },
            rank5: {
                value1: rank5strailailment2,
                value2: rank5value2ailment2
            },
            rank6: {
                value1: rank6strailailment2,
                value2: rank6value2ailment2
            },
            rank7: {
                value1: rank7strailailment2,
                value2: rank7value2ailment2
            },
            rank8: {
                value1: rank8strailailment2,
                value2: rank8value2ailment2
            },
            rank9: {
                value1: rank9strailailment2,
                value2: rank9value2ailment2
            },
            rank10: {
                value1: rank10strailailment2,
                value2: rank10value2ailment2
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }
    if (value_trans == "ailment_id_3") {
        var rank1value1ailment3 = tables.rank1.value1 && Math.floor((tables.rank1.value1 % 100000000) / 10000);
        var rank1value2ailment3 = tables.rank1.value1 && Math.floor((tables.rank1.value1 % 10000) / 100)
        var rank1value3ailment3 = tables.rank1.value1 && Math.floor( tables.rank1.value1 % 100);
        var rank1ail3 = tables.rank1.value1 && AilmentNames[rank1value1ailment3]
        var rank1strailailment3 = `[${rank1ail3 && rank1ail3.name}] - #${rank1value1ailment3}`
        if (rank1strailailment3 == "[undefined] - #0") {
            rank1strailailment3 = undefined
        }
        if (rank1strailailment3 == "[undefined] - #undefined") {
            rank1strailailment3 = undefined
        }
        var rank2value1ailment3 = tables.rank2.value1 && Math.floor((tables.rank2.value1 % 100000000) / 10000)
        var rank2value2ailment3 = tables.rank2.value1 && Math.floor((tables.rank2.value1 % 10000) / 100)
        var rank2value3ailment3 = tables.rank2.value1 && Math.floor( tables.rank2.value1 % 100);
        var rank2ail3 = tables.rank2.value1 && AilmentNames[rank2value1ailment3]
        var rank2strailailment3 = `[${rank2ail3 && rank2ail3.name}] - #${rank2value1ailment3}`
        if (rank2strailailment3 == "[undefined] - #0") {
            rank2strailailment3 = undefined
        }
        if (rank2strailailment3 == "[undefined] - #undefined") {
            rank2strailailment3 = undefined
        }
        var rank3value1ailment3 = tables.rank3.value1 && Math.floor((tables.rank3.value1 % 100000000) / 10000)
        var rank3value2ailment3 = tables.rank3.value1 && Math.floor((tables.rank3.value1 % 10000) / 100)
        var rank3value3ailment3 = tables.rank3.value1 && Math.floor( tables.rank3.value1 % 100);
        var rank3ail3 = tables.rank3.value1 && AilmentNames[rank3value1ailment3]
        var rank3strailailment3 = `[${rank3ail3 && rank3ail3.name}] - #${rank3value1ailment3}`
        if (rank3strailailment3 == "[undefined] - #0") {
            rank3strailailment3 = undefined
        }
        if (rank3strailailment3 == "[undefined] - #undefined") {
            rank3strailailment3 = undefined
        }
        var rank4value1ailment3 = tables.rank4.value1 && Math.floor((tables.rank4.value1 % 100000000) / 10000)
        var rank4value2ailment3 = tables.rank4.value1 && Math.floor((tables.rank4.value1 % 10000) / 100)
        var rank4value3ailment3 = tables.rank4.value1 && Math.floor( tables.rank4.value1 % 100);
        var rank4ail3 = tables.rank4.value1 && AilmentNames[rank4value1ailment3]
        var rank4strailailment3 = `[${rank4ail3 && rank4ail3.name}] - #${rank4value1ailment3}`
        if (rank4strailailment3 == "[undefined] - #0") {
            rank4strailailment3 = undefined
        }
        if (rank4strailailment3 == "[undefined] - #undefined") {
            rank4strailailment3 = undefined
        }
        var rank5value1ailment3 = tables.rank5.value1 && Math.floor((tables.rank5.value1 % 100000000) / 10000)
        var rank5value2ailment3 = tables.rank5.value1 && Math.floor((tables.rank5.value1 % 10000) / 100)
        var rank5value3ailment3 = tables.rank5.value1 && Math.floor( tables.rank5.value1 % 100);
        var rank5ail3 = tables.rank5.value1 && AilmentNames[rank5value1ailment3]
        var rank5strailailment3 = `[${rank5ail3 && rank5ail3.name}] - #${rank5value1ailment3}`
        if (rank5strailailment3 == "[undefined] - #0") {
            rank5strailailment3 = undefined
        }
        if (rank5strailailment3 == "[undefined] - #undefined") {
            rank5strailailment3 = undefined
        }
        var rank6value1ailment3 = tables.rank6.value1 && Math.floor((tables.rank6.value1 % 100000000) / 10000)
        var rank6value2ailment3 = tables.rank6.value1 && Math.floor((tables.rank6.value1 % 10000) / 100)
        var rank6value3ailment3 = tables.rank6.value1 && Math.floor( tables.rank6.value1 % 100);
        var rank6ail3 = tables.rank6.value1 && AilmentNames[rank6value1ailment3]
        var rank6strailailment3 = `[${rank6ail3 && rank6ail3.name}] - #${rank6value1ailment3}`
        if (rank6strailailment3 == "[undefined] - #0") {
            rank6strailailment3 = undefined
        }
        if (rank6strailailment3 == "[undefined] - #undefined") {
            rank6strailailment3 = undefined
        }
        var rank7value1ailment3 = tables.rank7.value1 && Math.floor((tables.rank7.value1 % 100000000) / 10000)
        var rank7value2ailment3 = tables.rank7.value1 && Math.floor((tables.rank7.value1 % 10000) / 100)
        var rank7value3ailment3 = tables.rank7.value1 && Math.floor( tables.rank7.value1 % 100);
        var rank7ail3 = tables.rank7.value1 && AilmentNames[rank7value1ailment3]
        var rank7strailailment3 = `[${rank7ail3 && rank7ail3.name}] - #${rank7value1ailment3}`
        if (rank7strailailment3 == "[undefined] - #0") {
            rank7strailailment3 = undefined
        }
        if (rank7strailailment3 == "[undefined] - #undefined") {
            rank7strailailment3 = undefined
        }
        var rank8value1ailment3 = tables.rank8.value1 && Math.floor((tables.rank8.value1 % 100000000) / 10000)
        var rank8value2ailment3 = tables.rank8.value1 && Math.floor((tables.rank8.value1 % 10000) / 100)
        var rank8value3ailment3 = tables.rank8.value1 && Math.floor( tables.rank8.value1 % 100);
        var rank8ail3 = tables.rank8.value1 && AilmentNames[rank8value1ailment3]
        var rank8strailailment3 = `[${rank8ail3 && rank8ail3.name}] - #${rank8value1ailment3}`
        if (rank8strailailment3 == "[undefined] - #0") {
            rank8strailailment3 = undefined
        }
        if (rank8strailailment3 == "[undefined] - #undefined") {
            rank8strailailment3 = undefined
        }
        var rank9value1ailment3 = tables.rank9.value1 && Math.floor((tables.rank9.value1 % 100000000) / 10000)
        var rank9value2ailment3 = tables.rank9.value1 && Math.floor((tables.rank9.value1 % 10000) / 100)
        var rank9value3ailment3 = tables.rank9.value1 && Math.floor( tables.rank9.value1 % 100);
        var rank9ail3 = tables.rank9.value1 && AilmentNames[rank9value1ailment3]
        var rank9strailailment3 = `[${rank9ail3 && rank9ail3.name}] - #${rank9value1ailment3}`
        if (rank9strailailment3 == "[undefined] - #0") {
            rank9strailailment3 = undefined
        }
        if (rank9strailailment3 == "[undefined] - #undefined") {
            rank9strailailment3 = undefined
        }
        var rank10value1ailment3 = tables.rank10.value1 && Math.floor((tables.rank10.value1 % 100000000) / 10000)
        var rank10value2ailment3 = tables.rank10.value1 && Math.floor((tables.rank10.value1 % 10000) / 100)
        var rank10value3ailment3 = tables.rank10.value1 && Math.floor( tables.rank10.value1 % 100);
        var rank10ail3 = tables.rank10.value1 && AilmentNames[rank10value1ailment3]
        var rank10strailailment3 = `[${rank10ail3 && rank10ail3.name}] - #${rank10value1ailment3}`
        if (rank10strailailment3 == "[undefined] - #0") {
            rank10strailailment3 = undefined
        }
        if (rank10strailailment3 == "[undefined] - #undefined") {
            rank10strailailment3 = undefined
        }

        tables = {
            rank1: {
                value1: rank1strailailment3,
                value2: rank1value2ailment3,
                value3: rank1value3ailment3
            },
            rank2: {
                value1: rank2strailailment3,
                value2: rank2value2ailment3,
                value3: rank2value3ailment3
            },
            rank3: {
                value1: rank3strailailment3,
                value2: rank3value2ailment3,
                value3: rank3value3ailment3
            },
            rank4: {
                value1: rank4strailailment3,
                value2: rank4value2ailment3,
                value3: rank4value3ailment3
            },
            rank5: {
                value1: rank5strailailment3,
                value2: rank5value2ailment3,
                value3: rank5value3ailment3
            },
            rank6: {
                value1: rank6strailailment3,
                value2: rank6value2ailment3,
                value3: rank6value3ailment3
            },
            rank7: {
                value1: rank7strailailment3,
                value2: rank7value2ailment3,
                value3: rank7value3ailment3
            },
            rank8: {
                value1: rank8strailailment3,
                value2: rank8value2ailment3,
                value3: rank8value3ailment3
            },
            rank9: {
                value1: rank9strailailment3,
                value2: rank9value2ailment3,
                value3: rank9value3ailment3
            },
            rank10: {
                value1: rank10strailailment3,
                value2: rank10value2ailment3,
                value3: rank10value3ailment3
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }
    if (value_trans == "ailment_group_id_1") {
        var rank1value1ailgroup1 = ailment_group[tables.rank1.value1] && ailment_group[tables.rank1.value1].unique
        var rank2value1ailgroup1 = ailment_group[tables.rank2.value1] && ailment_group[tables.rank2.value1].unique
        var rank3value1ailgroup1 = ailment_group[tables.rank3.value1] && ailment_group[tables.rank3.value1].unique
        var rank4value1ailgroup1 = ailment_group[tables.rank4.value1] && ailment_group[tables.rank4.value1].unique
        var rank5value1ailgroup1 = ailment_group[tables.rank5.value1] && ailment_group[tables.rank5.value1].unique
        var rank6value1ailgroup1 = ailment_group[tables.rank6.value1] && ailment_group[tables.rank6.value1].unique
        var rank7value1ailgroup1 = ailment_group[tables.rank7.value1] && ailment_group[tables.rank7.value1].unique
        var rank8value1ailgroup1 = ailment_group[tables.rank8.value1] && ailment_group[tables.rank8.value1].unique
        var rank9value1ailgroup1 = ailment_group[tables.rank9.value1] && ailment_group[tables.rank9.value1].unique
        var rank10value1ailgroup1 = ailment_group[tables.rank10.value1] && ailment_group[tables.rank10.value1].unique
        tables = {
            rank1: {
                value1: rank1value1ailgroup1
            },
            rank2: {
                value1: rank2value1ailgroup1
            },
            rank3: {
                value1: rank3value1ailgroup1
            },
            rank4: {
                value1: rank4value1ailgroup1
            },
            rank5: {
                value1: rank5value1ailgroup1
            },
            rank6: {
                value1: rank6value1ailgroup1
            },
            rank7: {
                value1: rank7value1ailgroup1
            },
            rank8: {
                value1: rank8value1ailgroup1
            },
            rank9: {
                value1: rank9value1ailgroup1
            },
            rank10: {
                value1: rank10value1ailgroup1
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }

    if (value_trans == "chara_id") {
        var rank1char_id = char_id[tables.rank1.value1] && char_id[tables.rank1.value1].name
        var rank2char_id = char_id[tables.rank2.value1] && char_id[tables.rank2.value1].name
        var rank3char_id = char_id[tables.rank3.value1] && char_id[tables.rank3.value1].name
        var rank4char_id = char_id[tables.rank4.value1] && char_id[tables.rank4.value1].name
        var rank5char_id = char_id[tables.rank5.value1] && char_id[tables.rank5.value1].name
        var rank6char_id = char_id[tables.rank6.value1] && char_id[tables.rank6.value1].name
        var rank7char_id = char_id[tables.rank7.value1] && char_id[tables.rank7.value1].name
        var rank8char_id = char_id[tables.rank8.value1] && char_id[tables.rank8.value1].name
        var rank9char_id = char_id[tables.rank9.value1] && char_id[tables.rank9.value1].name
        var rank10char_id = char_id[tables.rank10.value1] && char_id[tables.rank10.value1].name
        tables = {
            rank1: {
                value1: rank1char_id
            },
            rank2: {
                value1: rank2char_id
            },
            rank3: {
                value1: rank3char_id
            },
            rank4: {
                value1: rank4char_id
            },
            rank5: {
                value1: rank5char_id
            },
            rank6: {
                value1: rank6char_id
            },
            rank7: {
                value1: rank7char_id
            },
            rank8: {
                value1: rank8char_id
            },
            rank9: {
                value1: rank9char_id
            },
            rank10: {
                value1: rank10char_id
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }

    if (value_trans == "game_index") {
        var rank1MessageData_Game = MessageData_Game[tables.rank1.value1] && MessageData_Game[tables.rank1.value1].MessageData_Game
        var rank2MessageData_Game = MessageData_Game[tables.rank2.value1] && MessageData_Game[tables.rank2.value1].MessageData_Game
        var rank3MessageData_Game = MessageData_Game[tables.rank3.value1] && MessageData_Game[tables.rank3.value1].MessageData_Game
        var rank4MessageData_Game = MessageData_Game[tables.rank4.value1] && MessageData_Game[tables.rank4.value1].MessageData_Game
        var rank5MessageData_Game = MessageData_Game[tables.rank5.value1] && MessageData_Game[tables.rank5.value1].MessageData_Game
        var rank6MessageData_Game = MessageData_Game[tables.rank6.value1] && MessageData_Game[tables.rank6.value1].MessageData_Game
        var rank7MessageData_Game = MessageData_Game[tables.rank7.value1] && MessageData_Game[tables.rank7.value1].MessageData_Game
        var rank8MessageData_Game = MessageData_Game[tables.rank8.value1] && MessageData_Game[tables.rank8.value1].MessageData_Game
        var rank9MessageData_Game = MessageData_Game[tables.rank9.value1] && MessageData_Game[tables.rank9.value1].MessageData_Game
        var rank10MessageData_Game = MessageData_Game[tables.rank10.value1] && MessageData_Game[tables.rank10.value1].MessageData_Game
        tables = {
            rank1: {
                value1: rank1MessageData_Game
            },
            rank2: {
                value1: rank2MessageData_Game
            },
            rank3: {
                value1: rank3MessageData_Game
            },
            rank4: {
                value1: rank4MessageData_Game
            },
            rank5: {
                value1: rank5MessageData_Game
            },
            rank6: {
                value1: rank6MessageData_Game
            },
            rank7: {
                value1: rank7MessageData_Game
            },
            rank8: {
                value1: rank8MessageData_Game
            },
            rank9: {
                value1: rank9MessageData_Game
            },
            rank10: {
                value1: rank10MessageData_Game
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }

    if (value_trans == "ailment_group_id_2") {

        var rank1value1group2 = Math.floor((tables.rank1.value1 % 10000) / 100);
        var rank1value2group2 = Math.floor(tables.rank1.value1 % 100);
        var rank1value1ailgroup2 = ailment_group[rank1value1group2] && ailment_group[rank1value1group2].unique

        var rank2value1group2 = Math.floor((tables.rank2.value1 % 10000) / 100);
        var rank2value2group2 = Math.floor(tables.rank2.value1 % 100);
        var rank2value1ailgroup2 = ailment_group[rank2value1group2] && ailment_group[rank2value1group2].unique

        var rank3value1group2 = Math.floor((tables.rank3.value1 % 10000) / 100);
        var rank3value2group2 = Math.floor(tables.rank3.value1 % 100);
        var rank3value1ailgroup2 = ailment_group[rank3value1group2] && ailment_group[rank3value1group2].unique

        var rank4value1group2 = Math.floor((tables.rank4.value1 % 10000) / 100);
        var rank4value2group2 = Math.floor(tables.rank4.value1 % 100);
        var rank4value1ailgroup2 = ailment_group[rank4value1group2] && ailment_group[rank4value1group2].unique

        var rank5value1group2 = Math.floor((tables.rank5.value1 % 10000) / 100);
        var rank5value2group2 = Math.floor(tables.rank5.value1 % 100);
        var rank5value1ailgroup2 = ailment_group[rank5value1group2] && ailment_group[rank5value1group2].unique

        var rank6value1group2 = Math.floor((tables.rank6.value1 % 10000) / 100);
        var rank6value2group2 = Math.floor(tables.rank6.value1 % 100);
        var rank6value1ailgroup2 = ailment_group[rank6value1group2] && ailment_group[rank6value1group2].unique

        var rank7value1group2 = Math.floor((tables.rank7.value1 % 10000) / 100);
        var rank7value2group2 = Math.floor(tables.rank7.value1 % 100);
        var rank7value1ailgroup2 = ailment_group[rank7value1group2] && ailment_group[rank7value1group2].unique

        var rank8value1group2 = Math.floor((tables.rank8.value1 % 10000) / 100);
        var rank8value2group2 = Math.floor(tables.rank8.value1 % 100);
        var rank8value1ailgroup2 = ailment_group[rank8value1group2] && ailment_group[rank8value1group2].unique

        var rank9value1group2 = Math.floor((tables.rank9.value1 % 10000) / 100);
        var rank9value2group2 = Math.floor(tables.rank9.value1 % 100);
        var rank9value1ailgroup2 = ailment_group[rank9value1group2] && ailment_group[rank9value1group2].unique

        var rank10value1group2 = Math.floor((tables.rank10.value1 % 10000) / 100);
        var rank10value2group2 = Math.floor(tables.rank10.value1 % 100);
        var rank10value1ailgroup2 = ailment_group[rank10value1group2] && ailment_group[rank10value1group2].unique
        tables = {
            rank1: {
                value1: rank1value1ailgroup2,
                value2: rank1value2group2
            },
            rank2: {
                value1: rank2value1ailgroup2,
                value2: rank2value2group2
            },
            rank3: {
                value1: rank3value1ailgroup2,
                value2: rank3value2group2
            },
            rank4: {
                value1: rank4value1ailgroup2,
                value2: rank4value2group2
            },
            rank5: {
                value1: rank5value1ailgroup2,
                value2: rank5value2group2
            },
            rank6: {
                value1: rank6value1ailgroup2,
                value2: rank6value2group2
            },
            rank7: {
                value1: rank7value1ailgroup2,
                value2: rank7value2group2
            },
            rank8: {
                value1: rank8value1ailgroup2,
                value2: rank8value2group2
            },
            rank9: {
                value1: rank9value1ailgroup2,
                value2: rank9value2group2
            },
            rank10: {
                value1: rank10value1ailgroup2,
                value2: rank10value2group2
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }
    if (value_trans == "cast_id_1") {
        var rank1value1cast = tables.rank1.value1 && Math.floor((tables.rank1.value1 % 1000000000) / 100000)
        var rank1value2cast = tables.rank1.value1 && Math.floor((tables.rank1.value1 % 100000) / 1000)
        var rank1value3cast = tables.rank1.value1 && Math.floor((tables.rank1.value1 % 1000) / 10)
        var rank1value4cast = tables.rank1.value1 && Math.floor(tables.rank1.value1 % 10);
        var rank1cat = tables.rank1.value1 && CastNames[rank1value1cast]
        var rank1strcast = `[${rank1cat && rank1cat.name && rank1cat.name}] - #${rank1cat && rank1cat.id}`
        if (rank1strcast == "[undefined] - #0") {
            rank1strcast = undefined
        }
        if (rank1strcast == "[undefined] - #undefined") {
            rank1strcast = undefined
        }
        if (rank1value2cast == 0) {
            rank1value2cast = ""
        } else {
            rank1value2cast = `${rank1value2cast} level${rank1value2cast != 1 ? "s" : ""} of `
        }
        var rank2value1cast = tables.rank2.value1 && Math.floor((tables.rank2.value1 % 1000000000) / 100000)
        var rank2value2cast = tables.rank2.value1 && Math.floor((tables.rank2.value1 % 100000) / 1000)
        var rank2value3cast = tables.rank2.value1 && Math.floor((tables.rank2.value1 % 1000) / 10)
        var rank2value4cast = tables.rank2.value1 && Math.floor( tables.rank2.value1 % 10);
        var rank2cat = tables.rank2.value1 && CastNames[rank2value1cast]
        var rank2strcast = `[${rank2cat && rank2cat.name && rank2cat.name}] - #${rank2cat && rank2cat.id}`
        if (rank2strcast == "[undefined] - #0") {
            rank2strcast = undefined
        }
        if (rank2strcast == "[undefined] - #undefined") {
            rank2strcast = undefined
        }
        if (rank2value2cast == 0) {
            rank2value2cast = ""
        } else {
            rank2value2cast = `${rank2value2cast} level${rank2value2cast != 1 ? "s" : ""} of `
        }
        var rank3value1cast = tables.rank3.value1 && Math.floor((tables.rank3.value1 % 1000000000) / 100000)
        var rank3value2cast = tables.rank3.value1 && Math.floor((tables.rank3.value1 % 100000) / 1000)
        var rank3value3cast = tables.rank3.value1 && Math.floor((tables.rank3.value1 % 1000) / 10)
        var rank3value4cast = tables.rank3.value1 && Math.floor( tables.rank3.value1 % 10);
        var rank3cat = tables.rank3.value1 && CastNames[rank3value1cast]
        var rank3strcast = `[${rank3cat && rank3cat.name && rank3cat.name}] - #${rank3cat && rank3cat.id}`
        if (rank3strcast == "[undefined] - #0") {
            rank3strcast = undefined
        }
        if (rank3strcast == "[undefined] - #undefined") {
            rank3strcast = undefined
        }
        if (rank3value2cast == 0) {
            rank3value2cast = ""
        } else {
            rank3value2cast = `${rank3value2cast} level${rank3value2cast != 1 ? "s" : ""} of `
        }
        var rank4value1cast = tables.rank4.value1 && Math.floor((tables.rank4.value1 % 1000000000) / 100000)
        var rank4value2cast = tables.rank4.value1 && Math.floor((tables.rank4.value1 % 100000) / 1000)
        var rank4value3cast = tables.rank4.value1 && Math.floor((tables.rank4.value1 % 1000) / 10)
        var rank4value4cast = tables.rank4.value1 && Math.floor( tables.rank4.value1 % 10);
        var rank4cat = tables.rank4.value1 && CastNames[rank4value1cast]
        var rank4strcast = `[${rank4cat && rank4cat.name && rank4cat.name}] - #${rank4cat && rank4cat.id}`
        if (rank4strcast == "[undefined] - #0") {
            rank4strcast = undefined
        }
        if (rank4strcast == "[undefined] - #undefined") {
            rank4strcast = undefined
        }
        if (rank4value2cast == 0) {
            rank4value2cast = ""
        } else {
            rank4value2cast = `${rank4value2cast} level${rank4value2cast != 1 ? "s" : ""} of `
        }
        var rank5value1cast = tables.rank5.value1 && Math.floor((tables.rank5.value1 % 1000000000) / 100000)
        var rank5value2cast = tables.rank5.value1 && Math.floor((tables.rank5.value1 % 100000) / 1000)
        var rank5value3cast = tables.rank5.value1 && Math.floor((tables.rank5.value1 % 1000) / 10)
        var rank5value4cast = tables.rank5.value1 && Math.floor( tables.rank5.value1 % 10);
        var rank5cat = tables.rank5.value1 && CastNames[rank5value1cast]
        var rank5strcast = `[${rank5cat && rank5cat.name && rank5cat.name}] - #${rank5cat && rank5cat.id}`
        if (rank5strcast == "[undefined] - #0") {
            rank5strcast = undefined
        }
        if (rank5strcast == "[undefined] - #undefined") {
            rank5strcast = undefined
        }
        if (rank5value2cast == 0) {
            rank5value2cast = ""
        } else {
            rank5value2cast = `${rank5value2cast} level${rank5value2cast != 1 ? "s" : ""} of `
        }
        var rank6value1cast = tables.rank6.value1 && Math.floor((tables.rank6.value1 % 1000000000) / 100000)
        var rank6value2cast = tables.rank6.value1 && Math.floor((tables.rank6.value1 % 100000) / 1000)
        var rank6value3cast = tables.rank6.value1 && Math.floor((tables.rank6.value1 % 1000) / 10)
        var rank6value4cast = tables.rank6.value1 && Math.floor( tables.rank6.value1 % 10);
        var rank6cat = tables.rank6.value1 && CastNames[rank6value1cast]
        var rank6strcast = `[${rank6cat && rank6cat.name && rank6cat.name}] - #${rank6cat && rank6cat.id}`
        if (rank6strcast == "[undefined] - #0") {
            rank6strcast = undefined
        }
        if (rank6strcast == "[undefined] - #undefined") {
            rank6strcast = undefined
        }
        if (rank6value2cast == 0) {
            rank6value2cast = ""
        } else {
            rank6value2cast = `${rank6value2cast} level${rank6value2cast != 1 ? "s" : ""} of `
        }
        var rank7value1cast = tables.rank7.value1 && Math.floor((tables.rank7.value1 % 1000000000) / 100000)
        var rank7value2cast = tables.rank7.value1 && Math.floor((tables.rank7.value1 % 100000) / 1000)
        var rank7value3cast = tables.rank7.value1 && Math.floor((tables.rank7.value1 % 1000) / 10)
        var rank7value4cast = tables.rank7.value1 && Math.floor( tables.rank7.value1 % 10);
        var rank7cat = tables.rank7.value1 && CastNames[rank7value1cast]
        var rank7strcast = `[${rank7cat && rank7cat.name && rank7cat.name}] - #${rank7cat && rank7cat.id}`
        if (rank7strcast == "[undefined] - #0") {
            rank7strcast = undefined
        }
        if (rank7strcast == "[undefined] - #undefined") {
            rank7strcast = undefined
        }
        if (rank7value2cast == 0) {
            rank7value2cast = ""
        } else {
            rank7value2cast = `${rank7value2cast} level${rank7value2cast != 1 ? "s" : ""} of `
        }
        var rank8value1cast = tables.rank8.value1 && Math.floor((tables.rank8.value1 % 1000000000) / 100000)
        var rank8value2cast = tables.rank8.value1 && Math.floor((tables.rank8.value1 % 100000) / 1000)
        var rank8value3cast = tables.rank8.value1 && Math.floor((tables.rank8.value1 % 1000) / 10)
        var rank8value4cast = tables.rank8.value1 && Math.floor( tables.rank8.value1 % 10);
        var rank8cat = tables.rank8.value1 && CastNames[rank8value1cast]
        var rank8strcast = `[${rank8cat && rank8cat.name && rank8cat.name}] - #${rank8cat && rank8cat.id}`
        if (rank8strcast == "[undefined] - #0") {
            rank8strcast = undefined
        }
        if (rank8strcast == "[undefined] - #undefined") {
            rank8strcast = undefined
        }
        if (rank8value2cast == 0) {
            rank8value2cast = ""
        } else {
            rank8value2cast = `${rank8value2cast} level${rank8value2cast != 1 ? "s" : ""} of `
        }
        var rank9value1cast = tables.rank9.value1 && Math.floor((tables.rank9.value1 % 1000000000) / 100000)
        var rank9value2cast = tables.rank9.value1 && Math.floor((tables.rank9.value1 % 100000) / 1000)
        var rank9value3cast = tables.rank9.value1 && Math.floor((tables.rank9.value1 % 1000) / 10)
        var rank9value4cast = tables.rank9.value1 && Math.floor( tables.rank9.value1 % 10);
        var rank9cat = tables.rank9.value1 && CastNames[rank9value1cast]
        var rank9strcast = `[${rank9cat && rank9cat.name && rank9cat.name}] - #${rank9cat && rank9cat.id}`
        if (rank9strcast == "[undefined] - #0") {
            rank9strcast = undefined
        }
        if (rank9strcast == "[undefined] - #undefined") {
            rank9strcast = undefined
        }
        if (rank9value2cast == 0) {
            rank9value2cast = ""
        } else {
            rank9value2cast = `${rank9value2cast} level${rank9value2cast != 1 ? "s" : ""} of `
        }
        var rank10value1cast = tables.rank10.value1 && Math.floor((tables.rank10.value1 % 1000000000) / 100000)
        var rank10value2cast = tables.rank10.value1 && Math.floor((tables.rank10.value1 % 100000) / 1000)
        var rank10value3cast = tables.rank10.value1 && Math.floor((tables.rank10.value1 % 1000) / 10)
        var rank10value4cast = tables.rank10.value1 && Math.floor( tables.rank10.value1 % 10);
        var rank10cat = tables.rank10.value1 && CastNames[rank10value1cast]
        var rank10strcast = `[${rank10cat && rank10cat.name && rank10cat.name}] - #${rank10cat && rank10cat.id}`
        if (rank10strcast == "[undefined] - #0") {
            rank10strcast = undefined
        }
        if (rank10strcast == "[undefined] - #undefined") {
            rank10strcast = undefined
        }
        if (rank10value2cast == 0) {
            rank10value2cast = ""
        } else {
            rank10value2cast = `${rank10value2cast} level${rank10value2cast != 1 ? "s" : ""} of `
        }
        tables = {
            rank1: {
                value1: rank1strcast,
                value2: rank1value2cast,
                value3: rank1value3cast,
                value4: rank1value4cast == 0 ? "" : ` for ${rank1value4cast} turn${rank1value4cast != 1 ? "s" : ""}`
            },
            rank2: {
                value1: rank2strcast,
                value2: rank2value2cast,
                value3: rank2value3cast,
                value4: rank2value4cast == 0 ? "" : ` for ${rank2value4cast} turn${rank2value4cast != 1 ? "s" : ""}`
            },
            rank3: {
                value1: rank3strcast,
                value2: rank3value2cast,
                value3: rank3value3cast,
                value4: rank3value4cast == 0 ? "" : ` for ${rank3value4cast} turn${rank3value4cast != 1 ? "s" : ""}`
            },
            rank4: {
                value1: rank4strcast,
                value2: rank4value2cast,
                value3: rank4value3cast,
                value4: rank4value4cast == 0 ? "" : ` for ${rank4value4cast} turn${rank4value4cast != 1 ? "s" : ""}`
            },
            rank5: {
                value1: rank5strcast,
                value2: rank5value2cast,
                value3: rank5value3cast,
                value4: rank5value4cast == 0 ? "" : ` for ${rank5value4cast} turn${rank5value4cast != 1 ? "s" : ""}`
            },
            rank6: {
                value1: rank6strcast,
                value2: rank6value2cast,
                value3: rank6value3cast,
                value4: rank6value4cast == 0 ? "" : ` for ${rank6value4cast} turn${rank6value4cast != 1 ? "s" : ""}`
            },
            rank7: {
                value1: rank7strcast,
                value2: rank7value2cast,
                value3: rank7value3cast,
                value4: rank7value4cast == 0 ? "" : ` for ${rank7value4cast} turn${rank7value4cast != 1 ? "s" : ""}`
            },
            rank8: {
                value1: rank8strcast,
                value2: rank8value2cast,
                value3: rank8value3cast,
                value4: rank8value4cast == 0 ? "" : ` for ${rank8value4cast} turn${rank8value4cast != 1 ? "s" : ""}`
            },
            rank9: {
                value1: rank9strcast,
                value2: rank9value2cast,
                value3: rank9value3cast,
                value4: rank9value4cast == 0 ? "" : ` for ${rank9value4cast} turn${rank9value4cast != 1 ? "s" : ""}`
            },
            rank10: {
                value1: rank10strcast,
                value2: rank10value2cast,
                value3: rank10value3cast,
                value4: rank10value4cast == 0 ? "" : ` for ${rank10value4cast} turn${rank10value4cast != 1 ? "s" : ""}`
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }
    if (value_trans == "cast_id_1_levels") {
        rank1value1cast = tables.rank1.value1 && Math.floor((tables.rank1.value1 % 1000000000) / 100000)
        rank1value2cast = tables.rank1.value1 && Math.floor((tables.rank1.value1 % 100000) / 1000)
        rank1value3cast = tables.rank1.value1 && Math.floor((tables.rank1.value1 % 1000) / 10)
        rank1value4cast = tables.rank1.value1 && Math.floor( tables.rank1.value1 % 10) 
        rank1cat = tables.rank1.value1 && CastNames[rank1value1cast]
        rank1strcast = `[${rank1cat && rank1cat.name && rank1cat.name}] - #${rank1cat && rank1cat.id}`
        if (rank1strcast == "[undefined] - #0") {
            rank1strcast = undefined
        }
        if (rank1strcast == "[undefined] - #undefined") {
            rank1strcast = undefined
        }
        rank2value1cast = tables.rank2.value1 && Math.floor((tables.rank2.value1 % 1000000000) / 100000)
        rank2value2cast = tables.rank2.value1 && Math.floor((tables.rank2.value1 % 100000) / 1000)
        rank2value3cast = tables.rank2.value1 && Math.floor((tables.rank2.value1 % 1000) / 10)
        rank2value4cast = tables.rank2.value1 && Math.floor( tables.rank2.value1 % 10) 
        rank2cat = tables.rank2.value1 && CastNames[rank2value1cast]
        rank2strcast = `[${rank2cat && rank2cat.name && rank2cat.name}] - #${rank2cat && rank2cat.id}`
        if (rank2strcast == "[undefined] - #0") {
            rank2strcast = undefined
        }
        if (rank2strcast == "[undefined] - #undefined") {
            rank2strcast = undefined
        }
        rank3value1cast = tables.rank3.value1 && Math.floor((tables.rank3.value1 % 1000000000) / 100000)
        rank3value2cast = tables.rank3.value1 && Math.floor((tables.rank3.value1 % 100000) / 1000)
        rank3value3cast = tables.rank3.value1 && Math.floor((tables.rank3.value1 % 1000) / 10)
        rank3value4cast = tables.rank3.value1 && Math.floor( tables.rank3.value1 % 10) 
        rank3cat = tables.rank3.value1 && CastNames[rank3value1cast]
        rank3strcast = `[${rank3cat && rank3cat.name && rank3cat.name}] - #${rank3cat && rank3cat.id}`
        if (rank3strcast == "[undefined] - #0") {
            rank3strcast = undefined
        }
        if (rank3strcast == "[undefined] - #undefined") {
            rank3strcast = undefined
        }
        rank4value1cast = tables.rank4.value1 && Math.floor((tables.rank4.value1 % 1000000000) / 100000)
        rank4value2cast = tables.rank4.value1 && Math.floor((tables.rank4.value1 % 100000) / 1000)
        rank4value3cast = tables.rank4.value1 && Math.floor((tables.rank4.value1 % 1000) / 10)
        rank4value4cast = tables.rank4.value1 && Math.floor( tables.rank4.value1 % 10) 
        rank4cat = tables.rank4.value1 && CastNames[rank4value1cast]
        rank4strcast = `[${rank4cat && rank4cat.name && rank4cat.name}] - #${rank4cat && rank4cat.id}`
        if (rank4strcast == "[undefined] - #0") {
            rank4strcast = undefined
        }
        if (rank4strcast == "[undefined] - #undefined") {
            rank4strcast = undefined
        }
        rank5value1cast = tables.rank5.value1 && Math.floor((tables.rank5.value1 % 1000000000) / 100000)
        rank5value2cast = tables.rank5.value1 && Math.floor((tables.rank5.value1 % 100000) / 1000)
        rank5value3cast = tables.rank5.value1 && Math.floor((tables.rank5.value1 % 1000) / 10)
        rank5value4cast = tables.rank5.value1 && Math.floor( tables.rank5.value1 % 10) 
        rank5cat = tables.rank5.value1 && CastNames[rank5value1cast]
        rank5strcast = `[${rank5cat && rank5cat.name && rank5cat.name}] - #${rank5cat && rank5cat.id}`
        if (rank5strcast == "[undefined] - #0") {
            rank5strcast = undefined
        }
        if (rank5strcast == "[undefined] - #undefined") {
            rank5strcast = undefined
        }
        rank6value1cast = tables.rank6.value1 && Math.floor((tables.rank6.value1 % 1000000000) / 100000)
        rank6value2cast = tables.rank6.value1 && Math.floor((tables.rank6.value1 % 100000) / 1000)
        rank6value3cast = tables.rank6.value1 && Math.floor((tables.rank6.value1 % 1000) / 10)
        rank6value4cast = tables.rank6.value1 && Math.floor( tables.rank6.value1 % 10) 
        rank6cat = tables.rank6.value1 && CastNames[rank6value1cast]
        rank6strcast = `[${rank6cat && rank6cat.name && rank6cat.name}] - #${rank6cat && rank6cat.id}`
        if (rank6strcast == "[undefined] - #0") {
            rank6strcast = undefined
        }
        if (rank6strcast == "[undefined] - #undefined") {
            rank6strcast = undefined
        }
        rank7value1cast = tables.rank7.value1 && Math.floor((tables.rank7.value1 % 1000000000) / 100000)
        rank7value2cast = tables.rank7.value1 && Math.floor((tables.rank7.value1 % 100000) / 1000)
        rank7value3cast = tables.rank7.value1 && Math.floor((tables.rank7.value1 % 1000) / 10)
        rank7value4cast = tables.rank7.value1 && Math.floor( tables.rank7.value1 % 10) 
        rank7cat = tables.rank7.value1 && CastNames[rank7value1cast]
        rank7strcast = `[${rank7cat && rank7cat.name && rank7cat.name}] - #${rank7cat && rank7cat.id}`
        if (rank7strcast == "[undefined] - #0") {
            rank7strcast = undefined
        }
        if (rank7strcast == "[undefined] - #undefined") {
            rank7strcast = undefined
        }
        rank8value1cast = tables.rank8.value1 && Math.floor((tables.rank8.value1 % 1000000000) / 100000)
        rank8value2cast = tables.rank8.value1 && Math.floor((tables.rank8.value1 % 100000) / 1000)
        rank8value3cast = tables.rank8.value1 && Math.floor((tables.rank8.value1 % 1000) / 10)
        rank8value4cast = tables.rank8.value1 && Math.floor( tables.rank8.value1 % 10) 
        rank8cat = tables.rank8.value1 && CastNames[rank8value1cast]
        rank8strcast = `[${rank8cat && rank8cat.name && rank8cat.name}] - #${rank8cat && rank8cat.id}`
        if (rank8strcast == "[undefined] - #0") {
            rank8strcast = undefined
        }
        if (rank8strcast == "[undefined] - #undefined") {
            rank8strcast = undefined
        }
        rank9value1cast = tables.rank9.value1 && Math.floor((tables.rank9.value1 % 1000000000) / 100000)
        rank9value2cast = tables.rank9.value1 && Math.floor((tables.rank9.value1 % 100000) / 1000)
        rank9value3cast = tables.rank9.value1 && Math.floor((tables.rank9.value1 % 1000) / 10)
        rank9value4cast = tables.rank9.value1 && Math.floor( tables.rank9.value1 % 10) 
        rank9cat = tables.rank9.value1 && CastNames[rank9value1cast]
        rank9strcast = `[${rank9cat && rank9cat.name && rank9cat.name}] - #${rank9cat && rank9cat.id}`
        if (rank9strcast == "[undefined] - #0") {
            rank9strcast = undefined
        }
        if (rank9strcast == "[undefined] - #undefined") {
            rank9strcast = undefined
        }
        rank10value1cast = tables.rank10.value1 && Math.floor((tables.rank10.value1 % 1000000000) / 100000)
        rank10value2cast = tables.rank10.value1 && Math.floor((tables.rank10.value1 % 100000) / 1000)
        rank10value3cast = tables.rank10.value1 && Math.floor((tables.rank10.value1 % 1000) / 10)
        rank10value4cast = tables.rank10.value1 && Math.floor( tables.rank10.value1 % 10) 
        rank10cat = tables.rank10.value1 && CastNames[rank10value1cast]
        rank10strcast = `[${rank10cat && rank10cat.name && rank10cat.name}] - #${rank10cat && rank10cat.id}`
        if (rank10strcast == "[undefined] - #0") {
            rank10strcast = undefined
        }
        if (rank10strcast == "[undefined] - #undefined") {
            rank10strcast = undefined
        }
        tables = {
            rank1: {
                value1: rank1strcast,
                value2: `${rank1value2cast == undefined || rank1value2cast == 0 ? "" : `${rank1value2cast} level${rank1value2cast == 1 ? " of " : "s of "}`}`,
                value3: rank1value3cast,
                value4: `${rank1value4cast == 1 ? "Party " : "targets that met condition "}`
            },
            rank2: {
                value1: rank2strcast,
                value2: `${rank2value2cast == undefined || rank2value2cast == 0 ? "" : `${rank2value2cast} level${rank2value2cast == 1 ? " of " : "s of "}`}`,
                value3: rank2value3cast,
                value4: `${rank2value4cast == 1 ? "Party " : "targets that met condition "}`
            },
            rank3: {
                value1: rank3strcast,
                value2: `${rank3value2cast == undefined || rank3value2cast == 0 ? "" : `${rank3value2cast} level${rank3value2cast == 1 ? " of " : "s of "}`}`,
                value3: rank3value3cast,
                value4: `${rank3value4cast == 1 ? "Party " : "targets that met condition "}`
            },
            rank4: {
                value1: rank4strcast,
                value2: `${rank4value2cast == undefined || rank4value2cast == 0 ? "" : `${rank4value2cast} level${rank4value2cast == 1 ? " of " : "s of "}`}`,
                value3: rank4value3cast,
                value4: `${rank4value4cast == 1 ? "Party " : "targets that met condition "}`
            },
            rank5: {
                value1: rank5strcast,
                value2: `${rank5value2cast == undefined || rank5value2cast == 0 ? "" : `${rank5value2cast} level${rank5value2cast == 1 ? " of " : "s of "}`}`,
                value3: rank5value3cast,
                value4: `${rank5value4cast == 1 ? "Party " : "targets that met condition "}`
            },
            rank6: {
                value1: rank6strcast,
                value2: `${rank6value2cast == undefined || rank6value2cast == 0 ? "" : `${rank6value2cast} level${rank6value2cast == 1 ? " of " : "s of "}`}`,
                value3: rank6value3cast,
                value4: `${rank6value4cast == 1 ? "Party " : "targets that met condition "}`
            },
            rank7: {
                value1: rank7strcast,
                value2: `${rank7value2cast == undefined || rank7value2cast == 0 ? "" : `${rank7value2cast} level${rank7value2cast == 1 ? " of " : "s of "}`}`,
                value3: rank7value3cast,
                value4: `${rank7value4cast == 1 ? "Party " : "targets that met condition "}`
            },
            rank8: {
                value1: rank8strcast,
                value2: `${rank8value2cast == undefined || rank8value2cast == 0 ? "" : `${rank8value2cast} level${rank8value2cast == 1 ? " of " : "s of "}`}`,
                value3: rank8value3cast,
                value4: `${rank8value4cast == 1 ? "Party " : "targets that met condition "}`
            },
            rank9: {
                value1: rank9strcast,
                value2: `${rank9value2cast == undefined || rank9value2cast == 0 ? "" : `${rank9value2cast} level${rank9value2cast == 1 ? " of " : "s of "}`}`,
                value3: rank9value3cast,
                value4: `${rank9value4cast == 1 ? "Party " : "targets that met condition "}`
            },
            rank10: {
                value1: rank10strcast,
                value2: `${rank10value2cast == undefined || rank10value2cast == 0 ? "" : `${rank10value2cast} level${rank10value2cast == 1 ? " of " : "s of "}`}`,
                value3: rank10value3cast,
                value4: `${rank10value4cast == 1 ? "Party " : "targets that met condition "}`
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }
    if (value_trans == "cast_id_2") {
        var rank1value1cast2 = tables.rank1.value1 && Math.floor((tables.rank1.value1 % 1000000000) / 10000000)
        var rank1value2cast2 = tables.rank1.value1 && Math.floor((tables.rank1.value1 % 1000000) / 100)
        var rank1value3cast2 = tables.rank1.value1 && Math.floor( tables.rank1.value1 % 100)
        var rank1cat2 = tables.rank1.value1 && CastNames[rank1value2cast2]
        var rank1strcast2 = `[${rank1cat2 && rank1cat2.name && rank1cat2.name}] - #${rank1cat2 && rank1cat2.id}`
        if (rank1strcast2 == "[undefined] - #0") {
            rank1strcast2 = undefined
        }
        if (rank1strcast2 == "[undefined] - #undefined") {
            rank1strcast2 = undefined
        }
        var rank2value1cast2 = tables.rank2.value1 && Math.floor((tables.rank2.value1 % 1000000000) / 10000000)
        var rank2value2cast2 = tables.rank2.value1 && Math.floor((tables.rank2.value1 % 1000000) / 100)
        var rank2value3cast2 = tables.rank2.value1 && Math.floor( tables.rank2.value1 % 100)
        var rank2cat2 = tables.rank2.value1 && CastNames[rank2value2cast2]
        var rank2strcast2 = `[${rank2cat2 && rank2cat2.name && rank2cat2.name}] - #${rank2cat2 && rank2cat2.id}`
        if (rank2strcast2 == "[undefined] - #0") {
            rank2strcast2 = undefined
        }
        if (rank2strcast2 == "[undefined] - #undefined") {
            rank2strcast2 = undefined
        }
        var rank3value1cast2 = tables.rank3.value1 && Math.floor((tables.rank3.value1 % 1000000000) / 10000000)
        var rank3value2cast2 = tables.rank3.value1 && Math.floor((tables.rank3.value1 % 1000000) / 100)
        var rank3value3cast2 = tables.rank3.value1 && Math.floor( tables.rank3.value1 % 100)
        var rank3cat2 = tables.rank3.value1 && CastNames[rank3value2cast2]
        var rank3strcast2 = `[${rank3cat2 && rank3cat2.name && rank3cat2.name}] - #${rank3cat2 && rank3cat2.id}`
        if (rank3strcast2 == "[undefined] - #0") {
            rank3strcast2 = undefined
        }
        if (rank3strcast2 == "[undefined] - #undefined") {
            rank3strcast2 = undefined
        }
        var rank4value1cast2 = tables.rank4.value1 && Math.floor((tables.rank4.value1 % 1000000000) / 10000000)
        var rank4value2cast2 = tables.rank4.value1 && Math.floor((tables.rank4.value1 % 1000000) / 100)
        var rank4value3cast2 = tables.rank4.value1 && Math.floor( tables.rank4.value1 % 100)
        var rank4cat2 = tables.rank4.value1 && CastNames[rank4value2cast2]
        var rank4strcast2 = `[${rank4cat2 && rank4cat2.name && rank4cat2.name}] - #${rank4cat2 && rank4cat2.id}`
        if (rank4strcast2 == "[undefined] - #0") {
            rank4strcast2 = undefined
        }
        if (rank4strcast2 == "[undefined] - #undefined") {
            rank4strcast2 = undefined
        }
        var rank5value1cast2 = tables.rank5.value1 && Math.floor((tables.rank5.value1 % 1000000000) / 10000000)
        var rank5value2cast2 = tables.rank5.value1 && Math.floor((tables.rank5.value1 % 1000000) / 100)
        var rank5value3cast2 = tables.rank5.value1 && Math.floor( tables.rank5.value1 % 100)
        var rank5cat2 = tables.rank5.value1 && CastNames[rank5value2cast2]
        var rank5strcast2 = `[${rank5cat2 && rank5cat2.name && rank5cat2.name}] - #${rank5cat2 && rank5cat2.id}`
        if (rank5strcast2 == "[undefined] - #0") {
            rank5strcast2 = undefined
        }
        if (rank5strcast2 == "[undefined] - #undefined") {
            rank5strcast2 = undefined
        }
        var rank6value1cast2 = tables.rank6.value1 && Math.floor((tables.rank6.value1 % 1000000000) / 10000000)
        var rank6value2cast2 = tables.rank6.value1 && Math.floor((tables.rank6.value1 % 1000000) / 100)
        var rank6value3cast2 = tables.rank6.value1 && Math.floor( tables.rank6.value1 % 100)
        var rank6cat2 = tables.rank6.value1 && CastNames[rank6value2cast2]
        var rank6strcast2 = `[${rank6cat2 && rank6cat2.name && rank6cat2.name}] - #${rank6cat2 && rank6cat2.id}`
        if (rank6strcast2 == "[undefined] - #0") {
            rank6strcast2 = undefined
        }
        if (rank6strcast2 == "[undefined] - #undefined") {
            rank6strcast2 = undefined
        }
        var rank7value1cast2 = tables.rank7.value1 && Math.floor((tables.rank7.value1 % 1000000000) / 10000000)
        var rank7value2cast2 = tables.rank7.value1 && Math.floor((tables.rank7.value1 % 1000000) / 100)
        var rank7value3cast2 = tables.rank7.value1 && Math.floor( tables.rank7.value1 % 100)
        var rank7cat2 = tables.rank7.value1 && CastNames[rank7value2cast2]
        var rank7strcast2 = `[${rank7cat2 && rank7cat2.name && rank7cat2.name}] - #${rank7cat2 && rank7cat2.id}`
        if (rank7strcast2 == "[undefined] - #0") {
            rank7strcast2 = undefined
        }
        if (rank7strcast2 == "[undefined] - #undefined") {
            rank7strcast2 = undefined
        }
        var rank8value1cast2 = tables.rank8.value1 && Math.floor((tables.rank8.value1 % 1000000000) / 10000000)
        var rank8value2cast2 = tables.rank8.value1 && Math.floor((tables.rank8.value1 % 1000000) / 100)
        var rank8value3cast2 = tables.rank8.value1 && Math.floor( tables.rank8.value1 % 100)
        var rank8cat2 = tables.rank8.value1 && CastNames[rank8value2cast2]
        var rank8strcast2 = `[${rank8cat2 && rank8cat2.name && rank8cat2.name}] - #${rank8cat2 && rank8cat2.id}`
        if (rank8strcast2 == "[undefined] - #0") {
            rank8strcast2 = undefined
        }
        if (rank8strcast2 == "[undefined] - #undefined") {
            rank8strcast2 = undefined
        }
        var rank9value1cast2 = tables.rank9.value1 && Math.floor((tables.rank9.value1 % 1000000000) / 10000000)
        var rank9value2cast2 = tables.rank9.value1 && Math.floor((tables.rank9.value1 % 1000000) / 100)
        var rank9value3cast2 = tables.rank9.value1 && Math.floor( tables.rank9.value1 % 100)
        var rank9cat2 = tables.rank9.value1 && CastNames[rank9value2cast2]
        var rank9strcast2 = `[${rank9cat2 && rank9cat2.name && rank9cat2.name}] - #${rank9cat2 && rank9cat2.id}`
        if (rank9strcast2 == "[undefined] - #0") {
            rank9strcast2 = undefined
        }
        if (rank9strcast2 == "[undefined] - #undefined") {
            rank9strcast2 = undefined
        }
        var rank10value1cast2 = tables.rank10.value1 && Math.floor((tables.rank10.value1 % 1000000000) / 10000000)
        var rank10value2cast2 = tables.rank10.value1 && Math.floor((tables.rank10.value1 % 1000000) / 100)
        var rank10value3cast2 = tables.rank10.value1 && Math.floor( tables.rank10.value1 % 100)
        var rank10cat2 = tables.rank10.value1 && CastNames[rank10value2cast2]
        var rank10strcast2 = `[${rank10cat2 && rank10cat2.name && rank10cat2.name}] - #${rank10cat2 && rank10cat2.id}`
        if (rank10strcast2 == "[undefined] - #0") {
            rank10strcast2 = undefined
        }
        if (rank10strcast2 == "[undefined] - #undefined") {
            rank10strcast2 = undefined
        }
        tables = {
            rank1: {
                value1: rank1value1cast2,
                value2: `${rank1strcast2} ${rank2strcast2} ${rank3strcast2} ${rank4strcast2}`,
                value3: rank1value3cast2
            },
            rank2: {
                value1: rank2value1cast2,
                value2: `${rank1strcast2} ${rank2strcast2} ${rank3strcast2} ${rank4strcast2}`,
                value3: rank2value3cast2
            },
            rank3: {
                value1: rank3value1cast2,
                value2: `${rank1strcast2} ${rank2strcast2} ${rank3strcast2} ${rank4strcast2}`,
                value3: rank3value3cast2
            },
            rank4: {
                value1: rank4value1cast2,
                value2: `${rank1strcast2} ${rank2strcast2} ${rank3strcast2} ${rank4strcast2}`,
                value3: rank4value3cast2
            },
            rank5: {
                value1: rank5value1cast2,
                value2: `${rank1strcast2} ${rank2strcast2} ${rank3strcast2} ${rank4strcast2}`,
                value3: rank5value3cast2
            },
            rank6: {
                value1: rank6value1cast2,
                value2: `${rank1strcast2} ${rank2strcast2} ${rank3strcast2} ${rank4strcast2}`,
                value3: rank6value3cast2
            },
            rank7: {
                value1: rank7value1cast2,
                value2: `${rank1strcast2} ${rank2strcast2} ${rank3strcast2} ${rank4strcast2}`,
                value3: rank7value3cast2
            },
            rank8: {
                value1: rank8value1cast2,
                value2: `${rank1strcast2} ${rank2strcast2} ${rank3strcast2} ${rank4strcast2}`,
                value3: rank8value3cast2
            },
            rank9: {
                value1: rank9value1cast2,
                value2: `${rank1strcast2} ${rank2strcast2} ${rank3strcast2} ${rank4strcast2}`,
                value3: rank9value3cast2
            },
            rank10: {
                value1: rank10value1cast2,
                value2: `${rank1strcast2} ${rank2strcast2} ${rank3strcast2} ${rank4strcast2}`,
                value3: rank10value3cast2
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }

    if (value_trans == "brv_damage_cap_per") {
        var rank1value1brv = tables.rank1.value1
        var rank1value2brv = Math.round(((tables.rank1.value1 / 100) + 1) * 9999).toLocaleString()
        var rank2value1brv = tables.rank2.value1
        var rank2value2brv = Math.round(((tables.rank2.value1 / 100) + 1) * 9999).toLocaleString()
        var rank3value1brv = tables.rank3.value1
        var rank3value2brv = Math.round(((tables.rank3.value1 / 100) + 1) * 9999).toLocaleString()
        var rank4value1brv = tables.rank4.value1
        var rank4value2brv = Math.round(((tables.rank4.value1 / 100) + 1) * 9999).toLocaleString()
        var rank5value1brv = tables.rank5.value1
        var rank5value2brv = Math.round(((tables.rank5.value1 / 100) + 1) * 9999).toLocaleString()
        var rank6value1brv = tables.rank6.value1
        var rank6value2brv = Math.round(((tables.rank6.value1 / 100) + 1) * 9999).toLocaleString()
        var rank7value1brv = tables.rank7.value1
        var rank7value2brv = Math.round(((tables.rank7.value1 / 100) + 1) * 9999).toLocaleString()
        var rank8value1brv = tables.rank8.value1
        var rank8value2brv = Math.round(((tables.rank8.value1 / 100) + 1) * 9999).toLocaleString()
        var rank9value1brv = tables.rank9.value1
        var rank9value2brv = Math.round(((tables.rank9.value1 / 100) + 1) * 9999).toLocaleString()
        var rank10value1brv = tables.rank10.value1
        var rank10value2brv = Math.round(((tables.rank10.value1 / 100) + 1) * 9999).toLocaleString()
        tables = {
            rank1: {
                value1: rank1value1brv,
                value2: rank1value2brv
            },
            rank2: {
                value1: rank2value1brv,
                value2: rank2value2brv
            },
            rank3: {
                value1: rank3value1brv,
                value2: rank3value2brv
            },
            rank4: {
                value1: rank4value1brv,
                value2: rank4value2brv
            },
            rank5: {
                value1: rank5value1brv,
                value2: rank5value2brv
            },
            rank6: {
                value1: rank6value1brv,
                value2: rank6value2brv
            },
            rank7: {
                value1: rank7value1brv,
                value2: rank7value2brv
            },
            rank8: {
                value1: rank8value1brv,
                value2: rank8value2brv
            },
            rank9: {
                value1: rank9value1brv,
                value2: rank9value2brv
            },
            rank10: {
                value1: rank10value1brv,
                value2: rank10value2brv
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }

    if (value_trans == "max_brv_cap_per") {
        var rank1value1per = tables.rank1.value1
        var rank1value2per = Math.round(((tables.rank1.value1 / 100) + 1) * 99999).toLocaleString()
        var rank2value1per = tables.rank2.value1
        var rank2value2per = Math.round(((tables.rank2.value1 / 100) + 1) * 99999).toLocaleString()
        var rank3value1per = tables.rank3.value1
        var rank3value2per = Math.round(((tables.rank3.value1 / 100) + 1) * 99999).toLocaleString()
        var rank4value1per = tables.rank4.value1
        var rank4value2per = Math.round(((tables.rank4.value1 / 100) + 1) * 99999).toLocaleString()
        var rank5value1per = tables.rank5.value1
        var rank5value2per = Math.round(((tables.rank5.value1 / 100) + 1) * 99999).toLocaleString()
        var rank6value1per = tables.rank6.value1
        var rank6value2per = Math.round(((tables.rank6.value1 / 100) + 1) * 99999).toLocaleString()
        var rank7value1per = tables.rank7.value1
        var rank7value2per = Math.round(((tables.rank7.value1 / 100) + 1) * 99999).toLocaleString()
        var rank8value1per = tables.rank8.value1
        var rank8value2per = Math.round(((tables.rank8.value1 / 100) + 1) * 99999).toLocaleString()
        var rank9value1per = tables.rank9.value1
        var rank9value2per = Math.round(((tables.rank9.value1 / 100) + 1) * 99999).toLocaleString()
        var rank10value1per = tables.rank10.value1
        var rank10value2per = Math.round(((tables.rank10.value1 / 100) + 1) * 99999).toLocaleString()
        tables = {
            rank1: {
                value1: rank1value1per,
                value2: rank1value2per
            },
            rank2: {
                value1: rank2value1per,
                value2: rank2value2per
            },
            rank3: {
                value1: rank3value1per,
                value2: rank3value2per
            },
            rank4: {
                value1: rank4value1per,
                value2: rank4value2per
            },
            rank5: {
                value1: rank5value1per,
                value2: rank5value2per
            },
            rank6: {
                value1: rank6value1per,
                value2: rank6value2per
            },
            rank7: {
                value1: rank7value1per,
                value2: rank7value2per
            },
            rank8: {
                value1: rank8value1per,
                value2: rank8value2per
            },
            rank9: {
                value1: rank9value1per,
                value2: rank9value2per
            },
            rank10: {
                value1: rank10value1per,
                value2: rank10value2per
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }

    if (value_trans == "max_brv_cap") {
        var rank1value1cap = tables.rank1.value1
        var rank1value2cap = (tables.rank1.value1 + 99999).toLocaleString()
        var rank2value1cap = tables.rank2.value1
        var rank2value2cap = (tables.rank2.value1 + 99999).toLocaleString()
        var rank3value1cap = tables.rank3.value1
        var rank3value2cap = (tables.rank3.value1 + 99999).toLocaleString()
        var rank4value1cap = tables.rank4.value1
        var rank4value2cap = (tables.rank4.value1 + 99999).toLocaleString()
        var rank5value1cap = tables.rank5.value1
        var rank5value2cap = (tables.rank5.value1 + 99999).toLocaleString()
        var rank6value1cap = tables.rank6.value1
        var rank6value2cap = (tables.rank6.value1 + 99999).toLocaleString()
        var rank7value1cap = tables.rank7.value1
        var rank7value2cap = (tables.rank7.value1 + 99999).toLocaleString()
        var rank8value1cap = tables.rank8.value1
        var rank8value2cap = (tables.rank8.value1 + 99999).toLocaleString()
        var rank9value1cap = tables.rank9.value1
        var rank9value2cap = (tables.rank9.value1 + 99999).toLocaleString()
        var rank10value1cap = tables.rank10.value1
        var rank10value2cap = (tables.rank10.value1 + 99999).toLocaleString()
        tables = {
            rank1: {
                value1: rank1value1cap,
                value2: rank1value2cap
            },
            rank2: {
                value1: rank2value1cap,
                value2: rank2value2cap
            },
            rank3: {
                value1: rank3value1cap,
                value2: rank3value2cap
            },
            rank4: {
                value1: rank4value1cap,
                value2: rank4value2cap
            },
            rank5: {
                value1: rank5value1cap,
                value2: rank5value2cap
            },
            rank6: {
                value1: rank6value1cap,
                value2: rank6value2cap
            },
            rank7: {
                value1: rank7value1cap,
                value2: rank7value2cap
            },
            rank8: {
                value1: rank8value1cap,
                value2: rank8value2cap
            },
            rank9: {
                value1: rank9value1cap,
                value2: rank9value2cap
            },
            rank10: {
                value1: rank10value1cap,
                value2: rank10value2cap
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }

    if (value_trans == "ailment_id_4") {
        var rank1value1ailment = tables.rank1.value1 && Math.floor((tables.rank1.value1 % 1000000000) / 100000)
        var rank1ailment = tables.rank1.value1 && AilmentNames[rank1value1ailment]
        var rank1strailment = `[${rank1ailment && rank1ailment.name && rank1ailment.name}] - #${rank1value1ailment}`
        if (rank1strailment == "[undefined] - #0") {
            rank1strailment = undefined
        }
        if (rank1strailment == "[undefined] - #undefined") {
            rank1strailment = undefined
        }
        var rank1value2ailment = tables.rank1.value1 && Math.floor((tables.rank1.value1 % 100000) / 1000)
        if(rank1value2ailment > 0){
            rank1value2ailment = ` by ${rank1value2ailment} level${rank1value2ailment!=1?"s":""}`
        } else {
            rank1value2ailment = ""
        }
        var rank1value3ailment = tables.rank1.value1 && Math.floor((tables.rank1.value1 % 1000) / 10)
        var rank1value4ailment = tables.rank1.value1 && Math.floor( tables.rank1.value1 % 10)
        if(rank1value4ailment > 0){
            rank1value4ailment = ` for ${rank1value4ailment} turn${rank1value4ailment!=1?"s":""}`
        } else {
            rank1value4ailment = ""
        }

        var rank2value1ailment = tables.rank2.value1 && Math.floor((tables.rank2.value1 % 1000000000) / 100000)
        var rank2ailment = tables.rank2.value1 && AilmentNames[rank2value1ailment]
        var rank2strailment = `[${rank2ailment && rank2ailment.name && rank2ailment.name}] - #${rank2value1ailment}`
        if (rank2strailment == "[undefined] - #0") {
            rank2strailment = undefined
        }
        if (rank2strailment == "[undefined] - #undefined") {
            rank2strailment = undefined
        }
        var rank2value2ailment = tables.rank2.value1 && Math.floor((tables.rank2.value1 % 100000) / 1000)
        if(rank2value2ailment > 0){
            rank2value2ailment = ` by ${rank2value2ailment} level${rank2value2ailment!=1?"s":""}`
        } else {
            rank2value2ailment = ""
        }
        var rank2value3ailment = tables.rank2.value1 && Math.floor((tables.rank2.value1 % 1000) / 10)
        var rank2value4ailment = tables.rank2.value1 && Math.floor( tables.rank2.value1 % 10)
        if(rank2value4ailment > 0){
            rank2value4ailment = ` for ${rank2value4ailment} turn${rank2value4ailment!=1?"s":""}`
        } else {
            rank2value4ailment = ""
        }
        var rank3value1ailment = tables.rank3.value1 && Math.floor((tables.rank3.value1 % 1000000000) / 100000)
        var rank3ailment = tables.rank3.value1 && AilmentNames[rank3value1ailment]
        var rank3strailment = `[${rank3ailment && rank3ailment.name && rank3ailment.name}] - #${rank3value1ailment}`
        if (rank3strailment == "[undefined] - #0") {
            rank3strailment = undefined
        }
        if (rank3strailment == "[undefined] - #undefined") {
            rank3strailment = undefined
        }
        var rank3value2ailment = tables.rank3.value1 && Math.floor((tables.rank3.value1 % 100000) / 1000);
        if(rank3value2ailment > 0){
            rank3value2ailment = ` by ${rank3value2ailment} level${rank3value2ailment!=1?"s":""}`
        } else {
            rank3value2ailment = ""
        }
        var rank3value3ailment = tables.rank3.value1 && Math.floor((tables.rank3.value1 % 1000) / 10)
        var rank3value4ailment = tables.rank3.value1 && Math.floor( tables.rank3.value1 % 10)
        if(rank3value4ailment > 0){
            rank3value4ailment = ` for ${rank3value4ailment} turn${rank3value4ailment!=1?"s":""}`
        } else {
            rank3value4ailment = ""
        }
        var rank4value1ailment = tables.rank4.value1 && Math.floor((tables.rank4.value1 % 1000000000) / 100000)
        var rank4ailment = tables.rank4.value1 && AilmentNames[rank4value1ailment]
        var rank4strailment = `[${rank4ailment && rank4ailment.name && rank4ailment.name}] - #${rank4value1ailment}`
        if (rank4strailment == "[undefined] - #0") {
            rank4strailment = undefined
        }
        if (rank4strailment == "[undefined] - #undefined") {
            rank4strailment = undefined
        }
        var rank4value2ailment = tables.rank4.value1 && Math.floor((tables.rank4.value1 % 100000) / 1000)
        if(rank4value2ailment > 0){
            rank4value2ailment = ` by ${rank4value2ailment} level${rank4value2ailment!=1?"s":""}`
        } else {
            rank4value2ailment = ""
        }
        var rank4value3ailment = tables.rank4.value1 && Math.floor((tables.rank4.value1 % 1000) / 10)
        var rank4value4ailment = tables.rank4.value1 && Math.floor( tables.rank4.value1 % 10)
        if(rank4value4ailment > 0){
            rank4value4ailment = ` for ${rank4value4ailment} turn${rank4value4ailment!=1?"s":""}`
        } else {
            rank4value4ailment = ""
        }
        var rank5value1ailment = tables.rank5.value1 && Math.floor((tables.rank5.value1 % 1000000000) / 100000)
        var rank5ailment = tables.rank5.value1 && AilmentNames[rank5value1ailment]
        var rank5strailment = `[${rank5ailment && rank5ailment.name && rank5ailment.name}] - #${rank5value1ailment}`
        if (rank5strailment == "[undefined] - #0") {
            rank5strailment = undefined
        }
        if (rank5strailment == "[undefined] - #undefined") {
            rank5strailment = undefined
        }
        var rank5value2ailment = tables.rank5.value1 && Math.floor((tables.rank5.value1 % 100000) / 1000)
        if(rank5value2ailment > 0){
            rank5value2ailment = ` by ${rank5value2ailment} level${rank5value2ailment!=1?"s":""}`
        } else {
            rank5value2ailment = ""
        }
        var rank5value3ailment = tables.rank5.value1 && Math.floor((tables.rank5.value1 % 1000) / 10)
        var rank5value4ailment = tables.rank5.value1 && Math.floor( tables.rank5.value1 % 10)
        if(rank5value4ailment > 0){
            rank5value4ailment = ` for ${rank5value4ailment} turn${rank5value4ailment!=1?"s":""}`
        } else {
            rank5value4ailment = ""
        }
        var rank6value1ailment = tables.rank6.value1 && Math.floor((tables.rank6.value1 % 1000000000) / 100000)
        var rank6ailment = tables.rank6.value1 && AilmentNames[rank6value1ailment]
        var rank6strailment = `[${rank6ailment && rank6ailment.name && rank6ailment.name}] - #${rank6value1ailment}`
        if (rank6strailment == "[undefined] - #0") {
            rank6strailment = undefined
        }
        if (rank6strailment == "[undefined] - #undefined") {
            rank6strailment = undefined
        }
        var rank6value2ailment = tables.rank6.value1 && Math.floor((tables.rank6.value1 % 100000) / 1000)
        if(rank6value2ailment > 0){
            rank6value2ailment = ` by ${rank6value2ailment} level${rank6value2ailment!=1?"s":""}`
        } else {
            rank6value2ailment = ""
        }
        var rank6value3ailment = tables.rank6.value1 && Math.floor((tables.rank6.value1 % 1000) / 10)
        var rank6value4ailment = tables.rank6.value1 && Math.floor( tables.rank6.value1 % 10)
        if(rank6value4ailment > 0){
            rank6value4ailment = ` for ${rank6value4ailment} turn${rank6value4ailment!=1?"s":""}`
        } else {
            rank6value4ailment = ""
        }
        var rank7value1ailment = tables.rank7.value1 && Math.floor((tables.rank7.value1 % 1000000000) / 100000)
        var rank7ailment = tables.rank7.value1 && AilmentNames[rank7value1ailment]
        var rank7strailment = `[${rank7ailment && rank7ailment.name && rank7ailment.name}] - #${rank7value1ailment}`
        if (rank7strailment == "[undefined] - #0") {
            rank7strailment = undefined
        }
        if (rank7strailment == "[undefined] - #undefined") {
            rank7strailment = undefined
        }
        var rank7value2ailment = tables.rank7.value1 && Math.floor((tables.rank7.value1 % 100000) / 1000)
        if(rank7value2ailment > 0){
            rank7value2ailment = ` by ${rank7value2ailment} level${rank7value2ailment!=1?"s":""}`
        } else {
            rank7value2ailment = ""
        }
        var rank7value3ailment = tables.rank7.value1 && Math.floor((tables.rank7.value1 % 1000) / 10)
        var rank7value4ailment = tables.rank7.value1 && Math.floor( tables.rank7.value1 % 10)
        if(rank7value4ailment > 0){
            rank7value4ailment = ` for ${rank7value4ailment} turn${rank7value4ailment!=1?"s":""}`
        } else {
            rank7value4ailment = ""
        }
        var rank8value1ailment = tables.rank8.value1 && Math.floor((tables.rank8.value1 % 1000000000) / 100000)
        var rank8ailment = tables.rank8.value1 && AilmentNames[rank8value1ailment]
        var rank8strailment = `[${rank8ailment && rank8ailment.name && rank8ailment.name}] - #${rank8value1ailment}`
        if (rank8strailment == "[undefined] - #0") {
            rank8strailment = undefined
        }
        if (rank8strailment == "[undefined] - #undefined") {
            rank8strailment = undefined
        }
        var rank8value2ailment = tables.rank8.value1 && Math.floor((tables.rank8.value1 % 100000) / 1000)
        if(rank8value2ailment > 0){
            rank8value2ailment = ` by ${rank8value2ailment} level${rank8value2ailment!=1?"s":""}`
        } else {
            rank8value2ailment = ""
        }
        var rank8value3ailment = tables.rank8.value1 && Math.floor((tables.rank8.value1 % 1000) / 10)
        var rank8value4ailment = tables.rank8.value1 && Math.floor( tables.rank8.value1 % 10)
        if(rank8value4ailment > 0){
            rank8value4ailment = ` for ${rank8value4ailment} turn${rank8value4ailment!=1?"s":""}`
        } else {
            rank8value4ailment = ""
        }
        
        var rank9value1ailment = tables.rank9.value1 && Math.floor((tables.rank9.value1 % 1000000000) / 100000)
        var rank9ailment = tables.rank9.value1 && AilmentNames[rank9value1ailment]
        var rank9strailment = `[${rank9ailment && rank9ailment.name && rank9ailment.name}] - #${rank9value1ailment}`
        if (rank9strailment == "[undefined] - #0") {
            rank9strailment = undefined
        }
        if (rank9strailment == "[undefined] - #undefined") {
            rank9strailment = undefined
        }
        var rank9value2ailment = tables.rank9.value1 && Math.floor((tables.rank9.value1 % 100000) / 1000)
        if(rank9value2ailment > 0){
            rank9value2ailment = ` by ${rank9value2ailment} level${rank9value2ailment!=1?"s":""}`
        } else {
            rank9value2ailment = ""
        }
        var rank9value3ailment = tables.rank9.value1 && Math.floor((tables.rank9.value1 % 1000) / 10)
        var rank9value4ailment = tables.rank9.value1 && Math.floor( tables.rank9.value1 % 10)
        if(rank9value4ailment > 0){
            rank9value4ailment = ` for ${rank9value4ailment} turn${rank9value4ailment!=1?"s":""}`
        } else {
            rank9value4ailment = ""
        }
        var rank10value1ailment = tables.rank10.value1 && Math.floor((tables.rank10.value1 % 1000000000) / 100000)
        var rank10ailment = tables.rank10.value1 && AilmentNames[rank10value1ailment]
        var rank10strailment = `[${rank10ailment && rank10ailment.name && rank10ailment.name}] - #${rank10value1ailment}`
        if (rank10strailment == "[undefined] - #0") {
            rank10strailment = undefined
        }
        if (rank10strailment == "[undefined] - #undefined") {
            rank10strailment = undefined
        }
        var rank10value2ailment = tables.rank10.value1 && Math.floor((tables.rank10.value1 % 100000) / 1000)
        if(rank10value2ailment > 0){
            rank10value2ailment = ` by ${rank10value2ailment} level${rank10value2ailment!=1?"s":""}`
        } else {
            rank10value2ailment = ""
        }
        var rank10value3ailment = tables.rank10.value1 && Math.floor((tables.rank10.value1 % 1000) / 10)
        var rank10value4ailment = tables.rank10.value1 && Math.floor( tables.rank10.value1 % 10)
        if(rank10value4ailment > 0){
            rank10value4ailment = ` for ${rank10value4ailment} turn${rank10value4ailment!=1?"s":""}`
        } else {
            rank10value4ailment = ""
        }
        tables = {
            rank1: {
                value1: rank1strailment,
                value2: rank1value2ailment,
                value3: rank1value3ailment,
                value4: rank1value4ailment
            },
            rank2: {
                value1: rank2strailment,
                value2: rank2value2ailment,
                value3: rank2value3ailment,
                value4: rank2value4ailment
            },
            rank3: {
                value1: rank3strailment,
                value2: rank3value2ailment,
                value3: rank3value3ailment,
                value4: rank3value4ailment
            },
            rank4: {
                value1: rank4strailment,
                value2: rank4value2ailment,
                value3: rank4value3ailment,
                value4: rank4value4ailment
            },
            rank5: {
                value1: rank5strailment,
                value2: rank5value2ailment,
                value3: rank5value3ailment,
                value4: rank5value4ailment
            },
            rank6: {
                value1: rank6strailment,
                value2: rank6value2ailment,
                value3: rank6value3ailment,
                value4: rank6value4ailment
            },
            rank7: {
                value1: rank7strailment,
                value2: rank7value2ailment,
                value3: rank7value3ailment,
                value4: rank7value4ailment
            },
            rank8: {
                value1: rank8strailment,
                value2: rank8value2ailment,
                value3: rank8value3ailment,
                value4: rank8value4ailment
            },
            rank9: {
                value1: rank9strailment,
                value2: rank9value2ailment,
                value3: rank9value3ailment,
                value4: rank9value4ailment
            },
            rank10: {
                value1: rank10strailment,
                value2: rank10value2ailment,
                value3: rank10value3ailment,
                value4: rank10value4ailment
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }

    if (value_trans == "series") {
        var rank1series = MessageData_FFSeries[tables.rank1.value1] && MessageData_FFSeries[tables.rank1.value1].name
        var rank2series = MessageData_FFSeries[tables.rank2.value1] && MessageData_FFSeries[tables.rank2.value1].name
        var rank3series = MessageData_FFSeries[tables.rank3.value1] && MessageData_FFSeries[tables.rank3.value1].name
        var rank4series = MessageData_FFSeries[tables.rank4.value1] && MessageData_FFSeries[tables.rank4.value1].name
        var rank5series = MessageData_FFSeries[tables.rank5.value1] && MessageData_FFSeries[tables.rank5.value1].name
        var rank6series = MessageData_FFSeries[tables.rank6.value1] && MessageData_FFSeries[tables.rank6.value1].name
        var rank7series = MessageData_FFSeries[tables.rank7.value1] && MessageData_FFSeries[tables.rank7.value1].name
        var rank8series = MessageData_FFSeries[tables.rank8.value1] && MessageData_FFSeries[tables.rank8.value1].name
        var rank9series = MessageData_FFSeries[tables.rank9.value1] && MessageData_FFSeries[tables.rank9.value1].Name
        var rank10series = MessageData_FFSeries[tables.rank10.value1] && MessageData_FFSeries[tables.rank10.value1].name
        tables = {
            rank1: {
                value1: rank1series
            },
            rank2: {
                value1: rank2series
            },
            rank3: {
                value1: rank3series
            },
            rank4: {
                value1: rank4series
            },
            rank5: {
                value1: rank5series
            },
            rank6: {
                value1: rank6series
            },
            rank7: {
                value1: rank7series
            },
            rank8: {
                value1: rank8series
            },
            rank9: {
                value1: rank9series
            },
            rank10: {
                value1: rank10series
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }

    if (value_trans == "command_group_id") {
        var rank1value1group = command_group[tables.rank1.value1]
        var rank1value1str = rank1value1group && rank1value1group.unique
        var rank2value1group = command_group[tables.rank2.value1]
        var rank2value1str = rank2value1group && rank2value1group.unique
        var rank3value1group = command_group[tables.rank3.value1]
        var rank3value1str = rank3value1group && rank3value1group.unique
        var rank4value1group = command_group[tables.rank4.value1]
        var rank4value1str = rank4value1group && rank4value1group.unique
        var rank5value1group = command_group[tables.rank5.value1]
        var rank5value1str = rank5value1group && rank5value1group.unique
        var rank6value1group = command_group[tables.rank6.value1]
        var rank6value1str = rank6value1group && rank6value1group.unique
        var rank7value1group = command_group[tables.rank7.value1]
        var rank7value1str = rank7value1group && rank7value1group.unique
        var rank8value1group = command_group[tables.rank8.value1]
        var rank8value1str = rank8value1group && rank8value1group.unique
        var rank9value1group = command_group[tables.rank9.value1]
        var rank9value1str = rank9value1group && rank9value1group.unique
        var rank10value1group = command_group[tables.rank10.value1]
        var rank10value1str = rank10value1group && rank10value1group.unique
        tables = {
            rank1: {
                value1: rank1value1str
            },
            rank2: {
                value1: rank2value1str
            },
            rank3: {
                value1: rank3value1str
            },
            rank4: {
                value1: rank4value1str
            },
            rank5: {
                value1: rank5value1str
            },
            rank6: {
                value1: rank6value1str
            },
            rank7: {
                value1: rank7value1str
            },
            rank8: {
                value1: rank8value1str
            },
            rank9: {
                value1: rank9value1str
            },
            rank10: {
                value1: rank10value1str
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }

    if (value_trans == "neg_infinite") {
        var neg1 = tables.rank1.value1 == -1 ? "∞" : use_neg == true && tables.rank1.value1 == 1 ? "∞" : tables.rank1.value1
        var neg2 = tables.rank2.value1 == -1 ? "∞" : use_neg == true && tables.rank2.value1 == 1 ? "∞" : tables.rank2.value1
        var neg3 = tables.rank3.value1 == -1 ? "∞" : use_neg == true && tables.rank3.value1 == 1 ? "∞" : tables.rank3.value1
        var neg4 = tables.rank4.value1 == -1 ? "∞" : use_neg == true && tables.rank4.value1 == 1 ? "∞" : tables.rank4.value1
        var neg5 = tables.rank5.value1 == -1 ? "∞" : use_neg == true && tables.rank5.value1 == 1 ? "∞" : tables.rank5.value1
        var neg6 = tables.rank6.value1 == -1 ? "∞" : use_neg == true && tables.rank6.value1 == 1 ? "∞" : tables.rank6.value1
        var neg7 = tables.rank7.value1 == -1 ? "∞" : use_neg == true && tables.rank7.value1 == 1 ? "∞" : tables.rank7.value1
        var neg8 = tables.rank8.value1 == -1 ? "∞" : use_neg == true && tables.rank8.value1 == 1 ? "∞" : tables.rank8.value1
        var neg9 = tables.rank9.value1 == -1 ? "∞" : use_neg == true && tables.rank9.value1 == 1 ? "∞" : tables.rank9.value1
        var neg10 = tables.rank10.value1 == -1 ? "∞" : use_neg == true && tables.rank10.value1 == 1 ? "∞" : tables.rank10.value1
        tables = {
            rank1: {
                value1: neg1
            },
            rank2: {
                value1: neg2
            },
            rank3: {
                value1: neg3
            },
            rank4: {
                value1: neg4
            },
            rank5: {
                value1: neg5
            },
            rank6: {
                value1: neg6
            },
            rank7: {
                value1: neg7
            },
            rank8: {
                value1: neg8
            },
            rank9: {
                value1: neg9
            },
            rank10: {
                value1: neg10
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }

    if (value_trans == "value1") {
        var value1rank1 = val_edit_type_handler(4, tables.rank1.value1)
        var value1rank2 = val_edit_type_handler(4, tables.rank2.value1)
        var value1rank3 = val_edit_type_handler(4, tables.rank3.value1)
        var value1rank4 = val_edit_type_handler(4, tables.rank4.value1)
        var value1rank5 = val_edit_type_handler(4, tables.rank5.value1)
        var value1rank6 = val_edit_type_handler(4, tables.rank6.value1)
        var value1rank7 = val_edit_type_handler(4, tables.rank7.value1)
        var value1rank8 = val_edit_type_handler(4, tables.rank8.value1)
        var value1rank9 = val_edit_type_handler(4, tables.rank9.value1)
        var value1rank10 = val_edit_type_handler(4, tables.rank10.value1)
        tables = {
            rank1: {
                value1: value1rank1
            },
            rank2: {
                value1: value1rank2
            },
            rank3: {
                value1: value1rank3
            },
            rank4: {
                value1: value1rank4
            },
            rank5: {
                value1: value1rank5
            },
            rank6: {
                value1: value1rank6
            },
            rank7: {
                value1: value1rank7
            },
            rank8: {
                value1: value1rank8
            },
            rank9: {
                value1: value1rank9
            },
            rank10: {
                value1: value1rank10
            },
            effectstr: effectstr,
            cond_id: condstr,
            val_typestr: val_typestr,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            ValTypeShow: ValTypeShow,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank,
            hidden: hidden
        }
    }
    if (default_value != undefined) {
        if (tables.rank1.value1 == undefined) {
            tables = {
                rank1: {
                    value1: default_value
                },
                rank2: {
                    value1: default_value
                },
                rank3: {
                    value1: default_value
                },
                rank4: {
                    value1: default_value
                },
                rank5: {
                    value1: default_value
                },
                rank6: {
                    value1: default_value
                },
                rank7: {
                    value1: default_value
                },
                rank8: {
                    value1: default_value
                },
                rank9: {
                    value1: default_value
                },
                rank10: {
                    value1: default_value
                },
                effectstr: effectstr,
                cond_id: condstr,
                val_typestr: val_typestr,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                ValTypeShow: ValTypeShow,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank,
                hidden: hidden
            }
        }
    }

    return (tables)
}
export default ailment_data_pars