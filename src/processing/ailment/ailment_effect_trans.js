import ailment_val_edit_type_handler from "./ailment_val_edit_type_handler.js"
import ailment_split_by_2 from "./ailment_split_by_2.js"
import ailment_level_icon from "./ailment_level_icon.js"

export default function ailment_effect_trans(
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
){

    const AilmentNames = master_index.ailments
    const CastNames = master_index.cast_names
    const CommandNames = master_index.commands
    const CondData = master_index.cond
    const MessageData_FFSeries = master_index.ffseries
    //const MessageData_Category = master_index.weaponcat
    const ailment_group = master_index.ailment_group_full[ver]
    const command_group = master_index.command_group_full[ver]
    const char_id = master_index.charid

    const EffectID = master_index.ailment_effect_id_index.effect_id
    const ValType = master_index.ailment_effect_id_index.val_type
    const ValEditType = master_index.ailment_effect_id_index.val_edit_type
    //const EffectValueType = master_index.ailment_effect_id_index.effect_value_type
    //const EffectTypeID = master_index.ailment_effect_id_index.effect_type_id
    const EffectID53 = master_index.ailment_effect_id_index.effect_id_53
    const MessageData_Game = master_index.ailment_effect_id_index.MessageData_Game

    var valeditpull = ValEditType[val_edit_type]

    var val_edit_typestr = valeditpull == undefined ? `※ Unknown val_edit_type ${val_edit_type}` : val_edit_type != 0 ? valeditpull.val_edit_type : val_edit_type

    var ValEditTypeShow = valeditpull && valeditpull.ValEditTypeShow || false

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

    var slidertype = ValType[val_type] && ValType[val_type].slidertype || "ranks" //static
    var multiply = valeditpull && valeditpull.multiplyslider != undefined ? true : false || false //multiplier true/false
    var multiplyslider = valeditpull && valeditpull.multiplyslider || undefined //multiplier slider
    var defaultrank = 1 //rank
    var ValTypeShow = ValType[val_type] && ValType[val_type].ValTypeShow || false //for important val_type
    var val_typestr = ValType[val_type] && ValType[val_type].val_type || `• val_type ${val_type}`

    switch (val_type) {
        case 1:
            if(rank_table != -1 && AugValue1 != undefined) {
                defaultrank = AugValue1
            }
            break;
        case 2:
            if (rank_table != -1 && AugValue2 != undefined) {
                defaultrank = AugValue2
            }
            break;
        case 3:
            if (AugValue1 != undefined) {
                defaultrank = AugValue1
            }
            break;
        case 4:
            if (AugValue1 != undefined) {
                defaultrank = AugValue1
            }
            break;
        case 14:
            const debuffname14 = AilmentNames[val_specify]
            val_typestr = `• Per levels of //${debuffname14 && debuffname14.icon}// [${debuffname14 && debuffname14.name}] - #${val_specify} on target`
            if (rank != undefined) {
                defaultrank = rank
            }
            break;
        case 16:
            const debuffname16 = AilmentNames[val_specify]
            val_typestr = `• Per levels of //${debuffname16 && debuffname16.icon}// [${debuffname16 && debuffname16.name}] - #${val_specify} on target`
            if (rank != undefined) {
                defaultrank = rank
            }
            break;
        case 28:
            const buffname28 = AilmentNames[val_specify]
            val_typestr = `• Stored Value of //${buffname28 && buffname28.icon}// [${buffname28 && buffname28.name}] - #${val_specify}`
            if (rank != undefined) {
                defaultrank = rank
            }
            break;
        default:
            if (rank != undefined) {
                defaultrank = rank
            }
            break;
    }

    if (defaultrank < 1) {
        defaultrank = 1
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
            for (let i=1;i<11;i++){
                tables[`rank${i}`].value1 = alt_rank
            }
        }
    }

    if (alt_aug1 != undefined && alt_aug1 != 0) {
        if (val_type == 1 || val_type == 3 || val_type == 4) {
            for (let i=1;i<11;i++){
                tables[`rank${i}`].value1 = alt_aug1
            }
        }
    }

    if (alt_aug2 != undefined && alt_aug2 != 0) {
        if (val_type == 2) {
            for (let i=1;i<11;i++){
                tables[`rank${i}`].value1 = alt_aug2
            }
        }
    }


    const neg_flag = effectstrpull && effectstrpull.neg_flag
    const value_trans = value_trans_override != undefined ? value_trans_override : effectstrpull && effectstrpull.value_trans
    const default_value = effectstrpull && effectstrpull.default
    const use_neg = effectstrpull && effectstrpull.use_neg

    var rank1 ;
    var rank2 ;
    var rank3 ;
    var rank4 ;
    var rank5 ;
    var rank6 ;
    var rank7 ;
    var rank8 ;
    var rank9 ;
    var rank10;

    switch (val_type) {
        case 0:
            if (rank_table != -1) {
                rank1 = ailment_val_edit_type_handler(val_edit_type, tables.rank1.value1)
                rank2 = ailment_val_edit_type_handler(val_edit_type, tables.rank2.value1)
                rank3 = ailment_val_edit_type_handler(val_edit_type, tables.rank3.value1)
                rank4 = ailment_val_edit_type_handler(val_edit_type, tables.rank4.value1)
                rank5 = ailment_val_edit_type_handler(val_edit_type, tables.rank5.value1)
                rank6 = ailment_val_edit_type_handler(val_edit_type, tables.rank6.value1)
                rank7 = ailment_val_edit_type_handler(val_edit_type, tables.rank7.value1)
                rank8 = ailment_val_edit_type_handler(val_edit_type, tables.rank8.value1)
                rank9 = ailment_val_edit_type_handler(val_edit_type, tables.rank9.value1)
                rank10 = ailment_val_edit_type_handler(val_edit_type, tables.rank10.value1)
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
                if (use_neg != true) {
                    rank1  = Math.abs(rank1)
                    rank2  = Math.abs(rank2)
                    rank3  = Math.abs(rank3)
                    rank4  = Math.abs(rank4)
                    rank5  = Math.abs(rank5)
                    rank6  = Math.abs(rank6)
                    rank7  = Math.abs(rank7)
                    rank8  = Math.abs(rank8)
                    rank9  = Math.abs(rank9)
                    rank10 = Math.abs(rank10)
                }
            }
            break;
        case 1:
            if (rank_table != -1) {
                rank1 = ailment_val_edit_type_handler(val_edit_type, tables.rank1.value1)
                if (neg_flag == true) {
                    if (rank1 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank1 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                rank2 = ailment_val_edit_type_handler(val_edit_type, tables.rank2.value1)
                if (neg_flag == true) {
                    if (rank2 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank2 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                rank3 = ailment_val_edit_type_handler(val_edit_type, tables.rank3.value1)
                if (neg_flag == true) {
                    if (rank3 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank3 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                rank4 = ailment_val_edit_type_handler(val_edit_type, tables.rank4.value1)
                if (neg_flag == true) {
                    if (rank4 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank4 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                rank5 = ailment_val_edit_type_handler(val_edit_type, tables.rank5.value1)
                if (neg_flag == true) {
                    if (rank5 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank5 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                rank6 = ailment_val_edit_type_handler(val_edit_type, tables.rank6.value1)
                if (neg_flag == true) {
                    if (rank6 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank6 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                rank7 = ailment_val_edit_type_handler(val_edit_type, tables.rank7.value1)
                if (neg_flag == true) {
                    if (rank7 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank7 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                rank8 = ailment_val_edit_type_handler(val_edit_type, tables.rank8.value1)
                if (neg_flag == true) {
                    if (rank8 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank8 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                rank9 = ailment_val_edit_type_handler(val_edit_type, tables.rank9.value1)
                if (neg_flag == true) {
                    if (rank9 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank9 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                rank10 = ailment_val_edit_type_handler(val_edit_type, tables.rank10.value1)
                if (neg_flag == true) {
                    if (rank10 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank10 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                if (use_neg != true) {
                    rank1 = Math.abs(rank1)
                    rank2 = Math.abs(rank2)
                    rank3 = Math.abs(rank3)
                    rank4 = Math.abs(rank4)
                    rank5 = Math.abs(rank5)
                    rank6 = Math.abs(rank6)
                    rank7 = Math.abs(rank7)
                    rank8 = Math.abs(rank8)
                    rank9 = Math.abs(rank9)
                    rank10 = Math.abs(rank10)
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
                    rank1 =  Math.abs(alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1)
                    rank2 =  Math.abs(alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1)
                    rank3 =  Math.abs(alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1)
                    rank4 =  Math.abs(alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1)
                    rank5 =  Math.abs(alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1)
                    rank6 =  Math.abs(alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1)
                    rank7 =  Math.abs(alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1)
                    rank8 =  Math.abs(alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1)
                    rank9 =  Math.abs(alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1)
                    rank10 = Math.abs(alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1)
                } else {
                    rank1 =  alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1
                    rank2 =  alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1
                    rank3 =  alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1
                    rank4 =  alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1
                    rank5 =  alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1
                    rank6 =  alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1
                    rank7 =  alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1
                    rank8 =  alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1
                    rank9 =  alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1
                    rank10 = alt_aug1 != undefined && alt_aug1 != 0 ? alt_aug1 : AugValue1
                }
            }
            break;
        case 2:
            if (rank_table != -1) {
                rank1 = ailment_val_edit_type_handler(val_edit_type, tables.rank1.value1)
                if (neg_flag == true) {
                    if (rank1 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank1 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                rank2 = ailment_val_edit_type_handler(val_edit_type, tables.rank2.value1)
                if (neg_flag == true) {
                    if (rank2 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank2 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                rank3 = ailment_val_edit_type_handler(val_edit_type, tables.rank3.value1)
                if (neg_flag == true) {
                    if (rank3 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank3 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                rank4 = ailment_val_edit_type_handler(val_edit_type, tables.rank4.value1)
                if (neg_flag == true) {
                    if (rank4 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank4 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                rank5 = ailment_val_edit_type_handler(val_edit_type, tables.rank5.value1)
                if (neg_flag == true) {
                    if (rank5 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank5 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                rank6 = ailment_val_edit_type_handler(val_edit_type, tables.rank6.value1)
                if (neg_flag == true) {
                    if (rank6 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank6 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                rank7 = ailment_val_edit_type_handler(val_edit_type, tables.rank7.value1)
                if (neg_flag == true) {
                    if (rank7 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank7 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                rank8 = ailment_val_edit_type_handler(val_edit_type, tables.rank8.value1)
                if (neg_flag == true) {
                    if (rank8 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank8 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                rank9 = ailment_val_edit_type_handler(val_edit_type, tables.rank9.value1)
                if (neg_flag == true) {
                    if (rank9 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank9 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                rank10 = ailment_val_edit_type_handler(val_edit_type, tables.rank10.value1)
                if (neg_flag == true) {
                    if (rank10 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (rank10 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                if (use_neg != true) {
                    rank1 = Math.abs(rank1)
                    rank2 = Math.abs(rank2)
                    rank3 = Math.abs(rank3)
                    rank4 = Math.abs(rank4)
                    rank5 = Math.abs(rank5)
                    rank6 = Math.abs(rank6)
                    rank7 = Math.abs(rank7)
                    rank8 = Math.abs(rank8)
                    rank9 = Math.abs(rank9)
                    rank10 = Math.abs(rank10)
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
                    rank1 =  Math.abs(alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2)
                    rank2 =  Math.abs(alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2)
                    rank3 =  Math.abs(alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2)
                    rank4 =  Math.abs(alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2)
                    rank5 =  Math.abs(alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2)
                    rank6 =  Math.abs(alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2)
                    rank7 =  Math.abs(alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2)
                    rank8 =  Math.abs(alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2)
                    rank9 =  Math.abs(alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2)
                    rank10 = Math.abs(alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2)
                } else {
                    rank1  = alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2
                    rank2  = alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2
                    rank3  = alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2
                    rank4  = alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2
                    rank5  = alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2
                    rank6  = alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2
                    rank7  = alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2
                    rank8  = alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2
                    rank9  = alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2
                    rank10 = alt_aug2 != undefined && alt_aug2 != 0 ? alt_aug2 : AugValue2
                }
            }
            break;
        case 3:
            rank1 = ailment_val_edit_type_handler(val_edit_type, tables.rank1.value1)
            if (neg_flag == true) {
                if (rank1 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank1 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank2 = ailment_val_edit_type_handler(val_edit_type, tables.rank2.value1)
            if (neg_flag == true) {
                if (rank2 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank2 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank3 = ailment_val_edit_type_handler(val_edit_type, tables.rank3.value1)
            if (neg_flag == true) {
                if (rank3 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank3 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank4 = ailment_val_edit_type_handler(val_edit_type, tables.rank4.value1)
            if (neg_flag == true) {
                if (rank4 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank4 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank5 = ailment_val_edit_type_handler(val_edit_type, tables.rank5.value1)
            if (neg_flag == true) {
                if (rank5 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank5 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank6 = ailment_val_edit_type_handler(val_edit_type, tables.rank6.value1)
            if (neg_flag == true) {
                if (rank6 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank6 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank7 = ailment_val_edit_type_handler(val_edit_type, tables.rank7.value1)
            if (neg_flag == true) {
                if (rank7 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank7 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank8 = ailment_val_edit_type_handler(val_edit_type, tables.rank8.value1)
            if (neg_flag == true) {
                if (rank8 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank8 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank9 = ailment_val_edit_type_handler(val_edit_type, tables.rank9.value1)
            if (neg_flag == true) {
                if (rank9 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank9 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank10 = ailment_val_edit_type_handler(val_edit_type, tables.rank10.value1)
            if (neg_flag == true) {
                if (rank10 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank10 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            if (use_neg != true) {
                rank1 =  Math.abs(rank1)
                rank2 =  Math.abs(rank2)
                rank3 =  Math.abs(rank3)
                rank4 =  Math.abs(rank4)
                rank5 =  Math.abs(rank5)
                rank6 =  Math.abs(rank6)
                rank7 =  Math.abs(rank7)
                rank8 =  Math.abs(rank8)
                rank9 =  Math.abs(rank9)
                rank10 = Math.abs(rank10)
            }
            break;
        case 4:
            rank6 = ailment_val_edit_type_handler(val_edit_type, tables.rank6.value1)
            if (neg_flag == true) {
                if (rank6 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank6 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank7 = ailment_val_edit_type_handler(val_edit_type, tables.rank7.value1)
            if (neg_flag == true) {
                if (rank7 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank7 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank8 = ailment_val_edit_type_handler(val_edit_type, tables.rank8.value1)
            if (neg_flag == true) {
                if (rank8 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank8 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank9 = ailment_val_edit_type_handler(val_edit_type, tables.rank9.value1)
            if (neg_flag == true) {
                if (rank9 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank9 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank10 = ailment_val_edit_type_handler(val_edit_type, tables.rank10.value1)
            if (neg_flag == true) {
                if (rank10 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank10 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            if (use_neg == true) {
                rank1  = rank6
                rank2  = rank7
                rank3  = rank8
                rank4  = rank9
                rank5  = rank10
            } else {
                rank1  = Math.abs(rank6)
                rank2  = Math.abs(rank7)
                rank3  = Math.abs(rank8)
                rank4  = Math.abs(rank9)
                rank5  = Math.abs(rank10)
                rank6  = Math.abs(rank6)
                rank7  = Math.abs(rank7)
                rank8  = Math.abs(rank8)
                rank9  = Math.abs(rank9)
                rank10 = Math.abs(rank10)
            }
            break;
        case 5:
            rank1 = ailment_val_edit_type_handler(val_edit_type, tables.rank1.value1)
            if (neg_flag == true) {
                if (rank1 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank1 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank2 = ailment_val_edit_type_handler(val_edit_type, tables.rank2.value1)
            if (neg_flag == true) {
                if (rank2 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank2 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank3 = ailment_val_edit_type_handler(val_edit_type, tables.rank3.value1)
            if (neg_flag == true) {
                if (rank3 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank3 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank4 = ailment_val_edit_type_handler(val_edit_type, tables.rank4.value1)
            if (neg_flag == true) {
                if (rank4 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank4 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank5 = ailment_val_edit_type_handler(val_edit_type, tables.rank5.value1)
            if (neg_flag == true) {
                if (rank5 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank5 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank6 = ailment_val_edit_type_handler(val_edit_type, tables.rank6.value1)
            if (neg_flag == true) {
                if (rank6 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank6 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank7 = ailment_val_edit_type_handler(val_edit_type, tables.rank7.value1)
            if (neg_flag == true) {
                if (rank7 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank7 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank8 = ailment_val_edit_type_handler(val_edit_type, tables.rank8.value1)
            if (neg_flag == true) {
                if (rank8 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank8 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank9 = ailment_val_edit_type_handler(val_edit_type, tables.rank9.value1)
            if (neg_flag == true) {
                if (rank9 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank9 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank10 = ailment_val_edit_type_handler(val_edit_type, tables.rank10.value1)
            if (neg_flag == true) {
                if (rank10 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank10 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            if (use_neg != true) {
                rank1  = Math.abs(rank1)
                rank2  = Math.abs(rank2)
                rank3  = Math.abs(rank3)
                rank4  = Math.abs(rank4)
                rank5  = Math.abs(rank5)
                rank6  = Math.abs(rank6)
                rank7  = Math.abs(rank7)
                rank8  = Math.abs(rank8)
                rank9  = Math.abs(rank9)
                rank10 = Math.abs(rank10)
            }
            break;
        case 6:
            const ranker = val_specify && ailment_val_edit_type_handler(val_edit_type, val_specify)
            if (neg_flag == true) {
                if (ranker < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (ranker > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            if (use_neg == true) {
                rank1  = ranker
                rank2  = ranker
                rank3  = ranker
                rank4  = ranker
                rank5  = ranker
                rank6  = ranker
                rank7  = ranker
                rank8  = ranker
                rank9  = ranker
                rank10 = ranker
            } else {
                rank1  = Math.abs(ranker)
                rank2  = Math.abs(ranker)
                rank3  = Math.abs(ranker)
                rank4  = Math.abs(ranker)
                rank5  = Math.abs(ranker)
                rank6  = Math.abs(ranker)
                rank7  = Math.abs(ranker)
                rank8  = Math.abs(ranker)
                rank9  = Math.abs(ranker)
                rank10 = Math.abs(ranker)
            }
            break;
        case 7:
            rank1 = ailment_val_edit_type_handler(val_edit_type, tables.rank1.value1)
            if (neg_flag == true) {
                if (rank1 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank1 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank2 = ailment_val_edit_type_handler(val_edit_type, tables.rank2.value1)
            if (neg_flag == true) {
                if (rank2 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank2 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank3 = ailment_val_edit_type_handler(val_edit_type, tables.rank3.value1)
            if (neg_flag == true) {
                if (rank3 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank3 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank4 = ailment_val_edit_type_handler(val_edit_type, tables.rank4.value1)
            if (neg_flag == true) {
                if (rank4 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank4 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank5 = ailment_val_edit_type_handler(val_edit_type, tables.rank5.value1)
            if (neg_flag == true) {
                if (rank5 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank5 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank6 = ailment_val_edit_type_handler(val_edit_type, tables.rank6.value1)
            if (neg_flag == true) {
                if (rank6 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank6 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank7 = ailment_val_edit_type_handler(val_edit_type, tables.rank7.value1)
            if (neg_flag == true) {
                if (rank7 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank7 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank8 = ailment_val_edit_type_handler(val_edit_type, tables.rank8.value1)
            if (neg_flag == true) {
                if (rank8 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank8 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank9 = ailment_val_edit_type_handler(val_edit_type, tables.rank9.value1)
            if (neg_flag == true) {
                if (rank9 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank9 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank10 = ailment_val_edit_type_handler(val_edit_type, tables.rank10.value1)
            if (neg_flag == true) {
                if (rank10 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank10 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            if (use_neg != true) {
                rank1  = Math.abs(rank1)
                rank2  = Math.abs(rank2)
                rank3  = Math.abs(rank3)
                rank4  = Math.abs(rank4)
                rank5  = Math.abs(rank5)
                rank6  = Math.abs(rank6)
                rank7  = Math.abs(rank7)
                rank8  = Math.abs(rank8)
                rank9  = Math.abs(rank9)
                rank10 = Math.abs(rank10)
            }
            break;
        case 8:
            rank1 = ailment_val_edit_type_handler(val_edit_type, tables.rank1.value1)
            if (neg_flag == true) {
                if (rank1 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank1 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank2 = ailment_val_edit_type_handler(val_edit_type, tables.rank2.value1)
            if (neg_flag == true) {
                if (rank2 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank2 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank3 = ailment_val_edit_type_handler(val_edit_type, tables.rank3.value1)
            if (neg_flag == true) {
                if (rank3 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank3 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank4 = ailment_val_edit_type_handler(val_edit_type, tables.rank4.value1)
            if (neg_flag == true) {
                if (rank4 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank4 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank5 = ailment_val_edit_type_handler(val_edit_type, tables.rank5.value1)
            if (neg_flag == true) {
                if (rank5 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank5 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank6 = ailment_val_edit_type_handler(val_edit_type, tables.rank6.value1)
            if (neg_flag == true) {
                if (rank6 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank6 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank7 = ailment_val_edit_type_handler(val_edit_type, tables.rank7.value1)
            if (neg_flag == true) {
                if (rank7 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank7 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank8 = ailment_val_edit_type_handler(val_edit_type, tables.rank8.value1)
            if (neg_flag == true) {
                if (rank8 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank8 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank9 = ailment_val_edit_type_handler(val_edit_type, tables.rank9.value1)
            if (neg_flag == true) {
                if (rank9 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank9 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank10 = ailment_val_edit_type_handler(val_edit_type, tables.rank10.value1)
            if (neg_flag == true) {
                if (rank10 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank10 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            if (use_neg != true) {
                rank1  = Math.abs(rank1)
                rank2  = Math.abs(rank2)
                rank3  = Math.abs(rank3)
                rank4  = Math.abs(rank4)
                rank5  = Math.abs(rank5)
                rank6  = Math.abs(rank6)
                rank7  = Math.abs(rank7)
                rank8  = Math.abs(rank8)
                rank9  = Math.abs(rank9)
                rank10 = Math.abs(rank10)
            }
            break;
        case 9:
            rank1 = ailment_val_edit_type_handler(val_edit_type, tables.rank1.value1)
            if (neg_flag == true) {
                if (rank1 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank1 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank2 = ailment_val_edit_type_handler(val_edit_type, tables.rank2.value1)
            if (neg_flag == true) {
                if (rank2 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank2 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank3 = ailment_val_edit_type_handler(val_edit_type, tables.rank3.value1)
            if (neg_flag == true) {
                if (rank3 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank3 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank4 = ailment_val_edit_type_handler(val_edit_type, tables.rank4.value1)
            if (neg_flag == true) {
                if (rank4 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank4 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank5 = ailment_val_edit_type_handler(val_edit_type, tables.rank5.value1)
            if (neg_flag == true) {
                if (rank5 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank5 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank6 = ailment_val_edit_type_handler(val_edit_type, tables.rank6.value1)
            if (neg_flag == true) {
                if (rank6 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank6 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank7 = ailment_val_edit_type_handler(val_edit_type, tables.rank7.value1)
            if (neg_flag == true) {
                if (rank7 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank7 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank8 = ailment_val_edit_type_handler(val_edit_type, tables.rank8.value1)
            if (neg_flag == true) {
                if (rank8 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank8 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank9 = ailment_val_edit_type_handler(val_edit_type, tables.rank9.value1)
            if (neg_flag == true) {
                if (rank9 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank9 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank10 = ailment_val_edit_type_handler(val_edit_type, tables.rank10.value1)
            if (neg_flag == true) {
                if (rank10 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank10 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            if (use_neg != true) {
                tables.rank1.value1 = Math.abs(rank1)
                tables.rank2.value1 = Math.abs(rank2)
                tables.rank3.value1 = Math.abs(rank3)
                tables.rank4.value1 = Math.abs(rank4)
                tables.rank5.value1 = Math.abs(rank5)
                tables.rank6.value1 = Math.abs(rank6)
                tables.rank7.value1 = Math.abs(rank7)
                tables.rank8.value1 = Math.abs(rank8)
                tables.rank9.value1 = Math.abs(rank9)
                tables.rank10.value1 = Math.abs(rank10)
            }
            break;
        case 10:
            rank1 = ailment_val_edit_type_handler(val_edit_type, tables.rank1.value1)
            if (neg_flag == true) {
                if (rank1 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank1 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank2 = ailment_val_edit_type_handler(val_edit_type, tables.rank2.value1)
            if (neg_flag == true) {
                if (rank2 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank2 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank3 = ailment_val_edit_type_handler(val_edit_type, tables.rank3.value1)
            if (neg_flag == true) {
                if (rank3 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank3 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank4 = ailment_val_edit_type_handler(val_edit_type, tables.rank4.value1)
            if (neg_flag == true) {
                if (rank4 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank4 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank5 = ailment_val_edit_type_handler(val_edit_type, tables.rank5.value1)
            if (neg_flag == true) {
                if (rank5 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank5 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank6 = ailment_val_edit_type_handler(val_edit_type, tables.rank6.value1)
            if (neg_flag == true) {
                if (rank6 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank6 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank7 = ailment_val_edit_type_handler(val_edit_type, tables.rank7.value1)
            if (neg_flag == true) {
                if (rank7 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank7 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank8 = ailment_val_edit_type_handler(val_edit_type, tables.rank8.value1)
            if (neg_flag == true) {
                if (rank8 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank8 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank9 = ailment_val_edit_type_handler(val_edit_type, tables.rank9.value1)
            if (neg_flag == true) {
                if (rank9 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank9 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank10 = ailment_val_edit_type_handler(val_edit_type, tables.rank10.value1)
            if (neg_flag == true) {
                if (rank10 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank10 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            if (use_neg != true) {
                rank1  = Math.abs(rank1)
                rank2  = Math.abs(rank2)
                rank3  = Math.abs(rank3)
                rank4  = Math.abs(rank4)
                rank5  = Math.abs(rank5)
                rank6  = Math.abs(rank6)
                rank7  = Math.abs(rank7)
                rank8  = Math.abs(rank8)
                rank9  = Math.abs(rank9)
                rank10 = Math.abs(rank10)
            }
            break;
        case 11:
            rank1 = ailment_val_edit_type_handler(val_edit_type, tables.rank1.value1)
            if (neg_flag == true) {
                if (rank1 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank1 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank2 = ailment_val_edit_type_handler(val_edit_type, tables.rank2.value1)
            if (neg_flag == true) {
                if (rank2 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank2 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank3 = ailment_val_edit_type_handler(val_edit_type, tables.rank3.value1)
            if (neg_flag == true) {
                if (rank3 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank3 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank4 = ailment_val_edit_type_handler(val_edit_type, tables.rank4.value1)
            if (neg_flag == true) {
                if (rank4 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank4 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank5 = ailment_val_edit_type_handler(val_edit_type, tables.rank5.value1)
            if (neg_flag == true) {
                if (rank5 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank5 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank6 = ailment_val_edit_type_handler(val_edit_type, tables.rank6.value1)
            if (neg_flag == true) {
                if (rank6 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank6 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank7 = ailment_val_edit_type_handler(val_edit_type, tables.rank7.value1)
            if (neg_flag == true) {
                if (rank7 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank7 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank8 = ailment_val_edit_type_handler(val_edit_type, tables.rank8.value1)
            if (neg_flag == true) {
                if (rank8 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank8 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank9 = ailment_val_edit_type_handler(val_edit_type, tables.rank9.value1)
            if (neg_flag == true) {
                if (rank9 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank9 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank10 = ailment_val_edit_type_handler(val_edit_type, tables.rank10.value1)
            if (neg_flag == true) {
                if (rank10 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank10 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            if (use_neg != true) {
                rank1  = Math.abs(rank1)
                rank2  = Math.abs(rank2)
                rank3  = Math.abs(rank3)
                rank4  = Math.abs(rank4)
                rank5  = Math.abs(rank5)
                rank6  = Math.abs(rank6)
                rank7  = Math.abs(rank7)
                rank8  = Math.abs(rank8)
                rank9  = Math.abs(rank9)
                rank10 = Math.abs(rank10)
            }
            break;
        case 12:
            rank1 = ailment_val_edit_type_handler(val_edit_type, tables.rank1.value1)
            if (neg_flag == true) {
                if (rank1 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank1 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank2 = ailment_val_edit_type_handler(val_edit_type, tables.rank2.value1)
            if (neg_flag == true) {
                if (rank2 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank2 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank3 = ailment_val_edit_type_handler(val_edit_type, tables.rank3.value1)
            if (neg_flag == true) {
                if (rank3 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank3 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank4 = ailment_val_edit_type_handler(val_edit_type, tables.rank4.value1)
            if (neg_flag == true) {
                if (rank4 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank4 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank5 = ailment_val_edit_type_handler(val_edit_type, tables.rank5.value1)
            if (neg_flag == true) {
                if (rank5 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank5 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank6 = ailment_val_edit_type_handler(val_edit_type, tables.rank6.value1)
            if (neg_flag == true) {
                if (rank6 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank6 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank7 = ailment_val_edit_type_handler(val_edit_type, tables.rank7.value1)
            if (neg_flag == true) {
                if (rank7 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank7 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank8 = ailment_val_edit_type_handler(val_edit_type, tables.rank8.value1)
            if (neg_flag == true) {
                if (rank8 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank8 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank9 = ailment_val_edit_type_handler(val_edit_type, tables.rank9.value1)
            if (neg_flag == true) {
                if (rank9 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank9 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank10 = ailment_val_edit_type_handler(val_edit_type, tables.rank10.value1)
            if (neg_flag == true) {
                if (rank10 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank10 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            if (use_neg != true) {
                rank1  = Math.abs(rank1)
                rank2  = Math.abs(rank2)
                rank3  = Math.abs(rank3)
                rank4  = Math.abs(rank4)
                rank5  = Math.abs(rank5)
                rank6  = Math.abs(rank6)
                rank7  = Math.abs(rank7)
                rank8  = Math.abs(rank8)
                rank9  = Math.abs(rank9)
                rank10 = Math.abs(rank10)
            }
            break;
        case 14:
            rank1 = ailment_val_edit_type_handler(val_edit_type, tables.rank1.value1)
            if (neg_flag == true) {
                if (rank1 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank1 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank2 = ailment_val_edit_type_handler(val_edit_type, tables.rank2.value1)
            if (neg_flag == true) {
                if (rank2 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank2 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank3 = ailment_val_edit_type_handler(val_edit_type, tables.rank3.value1)
            if (neg_flag == true) {
                if (rank3 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank3 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank4 = ailment_val_edit_type_handler(val_edit_type, tables.rank4.value1)
            if (neg_flag == true) {
                if (rank4 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank4 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank5 = ailment_val_edit_type_handler(val_edit_type, tables.rank5.value1)
            if (neg_flag == true) {
                if (rank5 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank5 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank6 = ailment_val_edit_type_handler(val_edit_type, tables.rank6.value1)
            if (neg_flag == true) {
                if (rank6 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank6 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank7 = ailment_val_edit_type_handler(val_edit_type, tables.rank7.value1)
            if (neg_flag == true) {
                if (rank7 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank7 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank8 = ailment_val_edit_type_handler(val_edit_type, tables.rank8.value1)
            if (neg_flag == true) {
                if (rank8 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank8 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank9 = ailment_val_edit_type_handler(val_edit_type, tables.rank9.value1)
            if (neg_flag == true) {
                if (rank9 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank9 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank10 = ailment_val_edit_type_handler(val_edit_type, tables.rank10.value1)
            if (neg_flag == true) {
                if (rank10 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank10 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            if (use_neg != true) {
                rank1  = Math.abs(rank1)
                rank2  = Math.abs(rank2)
                rank3  = Math.abs(rank3)
                rank4  = Math.abs(rank4)
                rank5  = Math.abs(rank5)
                rank6  = Math.abs(rank6)
                rank7  = Math.abs(rank7)
                rank8  = Math.abs(rank8)
                rank9  = Math.abs(rank9)
                rank10 = Math.abs(rank10)
            }
            break;
        case 16:
            rank1 = ailment_val_edit_type_handler(val_edit_type, tables.rank1.value1)
            if (neg_flag == true) {
                if (rank1 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank1 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank2 = ailment_val_edit_type_handler(val_edit_type, tables.rank2.value1)
            if (neg_flag == true) {
                if (rank2 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank2 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank3 = ailment_val_edit_type_handler(val_edit_type, tables.rank3.value1)
            if (neg_flag == true) {
                if (rank3 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank3 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank4 = ailment_val_edit_type_handler(val_edit_type, tables.rank4.value1)
            if (neg_flag == true) {
                if (rank4 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank4 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank5 = ailment_val_edit_type_handler(val_edit_type, tables.rank5.value1)
            if (neg_flag == true) {
                if (rank5 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank5 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank6 = ailment_val_edit_type_handler(val_edit_type, tables.rank6.value1)
            if (neg_flag == true) {
                if (rank6 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank6 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank7 = ailment_val_edit_type_handler(val_edit_type, tables.rank7.value1)
            if (neg_flag == true) {
                if (rank7 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank7 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank8 = ailment_val_edit_type_handler(val_edit_type, tables.rank8.value1)
            if (neg_flag == true) {
                if (rank8 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank8 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank9 = ailment_val_edit_type_handler(val_edit_type, tables.rank9.value1)
            if (neg_flag == true) {
                if (rank9 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank9 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank10 = ailment_val_edit_type_handler(val_edit_type, tables.rank10.value1)
            if (neg_flag == true) {
                if (rank10 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank10 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            if (use_neg != true) {
                rank1  = Math.abs(rank1)
                rank2  = Math.abs(rank2)
                rank3  = Math.abs(rank3)
                rank4  = Math.abs(rank4)
                rank5  = Math.abs(rank5)
                rank6  = Math.abs(rank6)
                rank7  = Math.abs(rank7)
                rank8  = Math.abs(rank8)
                rank9  = Math.abs(rank9)
                rank10 = Math.abs(rank10)
            }
            break;
        case 18:
            rank1 = ailment_val_edit_type_handler(val_edit_type, tables.rank1.value1)
            if (neg_flag == true) {
                if (rank1 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank1 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank2 = ailment_val_edit_type_handler(val_edit_type, tables.rank2.value1)
            if (neg_flag == true) {
                if (rank2 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank2 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank3 = ailment_val_edit_type_handler(val_edit_type, tables.rank3.value1)
            if (neg_flag == true) {
                if (rank3 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank3 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank4 = ailment_val_edit_type_handler(val_edit_type, tables.rank4.value1)
            if (neg_flag == true) {
                if (rank4 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank4 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank5 = ailment_val_edit_type_handler(val_edit_type, tables.rank5.value1)
            if (neg_flag == true) {
                if (rank5 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank5 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank6 = ailment_val_edit_type_handler(val_edit_type, tables.rank6.value1)
            if (neg_flag == true) {
                if (rank6 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank6 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank7 = ailment_val_edit_type_handler(val_edit_type, tables.rank7.value1)
            if (neg_flag == true) {
                if (rank7 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank7 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank8 = ailment_val_edit_type_handler(val_edit_type, tables.rank8.value1)
            if (neg_flag == true) {
                if (rank8 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank8 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank9 = ailment_val_edit_type_handler(val_edit_type, tables.rank9.value1)
            if (neg_flag == true) {
                if (rank9 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank9 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank10 = ailment_val_edit_type_handler(val_edit_type, tables.rank10.value1)
            if (neg_flag == true) {
                if (rank10 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank10 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            if (use_neg != true) {
                rank1  = Math.abs(rank1)
                rank2  = Math.abs(rank2)
                rank3  = Math.abs(rank3)
                rank4  = Math.abs(rank4)
                rank5  = Math.abs(rank5)
                rank6  = Math.abs(rank6)
                rank7  = Math.abs(rank7)
                rank8  = Math.abs(rank8)
                rank9  = Math.abs(rank9)
                rank10 = Math.abs(rank10)
            }
            break;
        case 20:
            rank1 = ailment_val_edit_type_handler(val_edit_type, tables.rank1.value1)
            if (neg_flag == true) {
                if (rank1 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank1 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank2 = ailment_val_edit_type_handler(val_edit_type, tables.rank2.value1)
            if (neg_flag == true) {
                if (rank2 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank2 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank3 = ailment_val_edit_type_handler(val_edit_type, tables.rank3.value1)
            if (neg_flag == true) {
                if (rank3 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank3 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank4 = ailment_val_edit_type_handler(val_edit_type, tables.rank4.value1)
            if (neg_flag == true) {
                if (rank4 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank4 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank5 = ailment_val_edit_type_handler(val_edit_type, tables.rank5.value1)
            if (neg_flag == true) {
                if (rank5 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank5 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank6 = ailment_val_edit_type_handler(val_edit_type, tables.rank6.value1)
            if (neg_flag == true) {
                if (rank6 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank6 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank7 = ailment_val_edit_type_handler(val_edit_type, tables.rank7.value1)
            if (neg_flag == true) {
                if (rank7 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank7 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank8 = ailment_val_edit_type_handler(val_edit_type, tables.rank8.value1)
            if (neg_flag == true) {
                if (rank8 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank8 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank9 = ailment_val_edit_type_handler(val_edit_type, tables.rank9.value1)
            if (neg_flag == true) {
                if (rank9 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank9 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            rank10 = ailment_val_edit_type_handler(val_edit_type, tables.rank10.value1)
            if (neg_flag == true) {
                if (rank10 < 0) {
                    effectstr = effectstrpull.debuff_string
                }
                if (rank10 > 0) {
                    effectstr = effectstrpull.buff_string
                }
            }
            if (use_neg != true) {
                rank1  = Math.abs(rank1)
                rank2  = Math.abs(rank2)
                rank3  = Math.abs(rank3)
                rank4  = Math.abs(rank4)
                rank5  = Math.abs(rank5)
                rank6  = Math.abs(rank6)
                rank7  = Math.abs(rank7)
                rank8  = Math.abs(rank8)
                rank9  = Math.abs(rank9)
                rank10 = Math.abs(rank10)
            }
            break;
        case 28:
                const ranker2 = val_specify && ailment_val_edit_type_handler(val_edit_type, val_specify)
                if (neg_flag == true) {
                    if (ranker2 < 0) {
                        effectstr = effectstrpull.debuff_string
                    }
                    if (ranker2 > 0) {
                        effectstr = effectstrpull.buff_string
                    }
                }
                if (use_neg == true) {
                    rank1  = ranker2
                    rank2  = ranker2
                    rank3  = ranker2
                    rank4  = ranker2
                    rank5  = ranker2
                    rank6  = ranker2
                    rank7  = ranker2
                    rank8  = ranker2
                    rank9  = ranker2
                    rank10 = ranker2
                } else {
                    rank1  = Math.abs(ranker2)
                    rank2  = Math.abs(ranker2)
                    rank3  = Math.abs(ranker2)
                    rank4  = Math.abs(ranker2)
                    rank5  = Math.abs(ranker2)
                    rank6  = Math.abs(ranker2)
                    rank7  = Math.abs(ranker2)
                    rank8  = Math.abs(ranker2)
                    rank9  = Math.abs(ranker2)
                    rank10 = Math.abs(ranker2)
                }
                break;
        default:
            break;
    }
    
    tables.effectstr = effectstr
    tables.rank1.value1 = rank1
    tables.rank2.value1 = rank2
    tables.rank3.value1 = rank3
    tables.rank4.value1 = rank4
    tables.rank5.value1 = rank5
    tables.rank6.value1 = rank6
    tables.rank7.value1 = rank7
    tables.rank8.value1 = rank8
    tables.rank9.value1 = rank9
    tables.rank10.value1 = rank10

    //command_id trans

    switch (value_trans) {
        case "add_s1":
            for (let i = 1; i <11; i++){
                tables[`rank${i}`].value2 = tables[`rank${i}`].value1 != 1 ? "s": ""
            }
            break;
        case "split_by_2":
            for (let i = 1; i <11; i++){
                var value5split_by_2 = tables[`rank${i}`].value1 && ailment_split_by_2(5, parseInt(tables[`rank${i}`].value1));
                var value4split_by_2 = tables[`rank${i}`].value1 && ailment_split_by_2(4, parseInt(tables[`rank${i}`].value1));
                var value3split_by_2 = tables[`rank${i}`].value1 && ailment_split_by_2(3, parseInt(tables[`rank${i}`].value1));
                var value2split_by_2 = tables[`rank${i}`].value1 && ailment_split_by_2(2, parseInt(tables[`rank${i}`].value1));
                var value1split_by_2 = tables[`rank${i}`].value1 && ailment_split_by_2(1, parseInt(tables[`rank${i}`].value1));
                tables[`rank${i}`].value1 = value1split_by_2
                tables[`rank${i}`].value2 = value2split_by_2
                tables[`rank${i}`].value3 = value3split_by_2
                tables[`rank${i}`].value4 = value4split_by_2
                tables[`rank${i}`].value5 = value5split_by_2
            }
            break;
        case "split_by_2_HP":
            const rank1value5splithp = tables.rank1.value1 && ailment_split_by_2(5, parseInt(tables.rank1.value1));
            const rank1value4splithp = tables.rank1.value1 && ailment_split_by_2(4, parseInt(tables.rank1.value1));
            const rank1value3splithp = tables.rank1.value1 && ailment_split_by_2(3, parseInt(tables.rank1.value1));
            const rank1value2splithp = tables.rank1.value1 && ailment_split_by_2(2, parseInt(tables.rank1.value1));
            const rank1value1splithp = tables.rank1.value1 && ailment_split_by_2(1, parseInt(tables.rank1.value1));
    
            tables.rank1.value1 = 100
            tables.rank1.value2 = rank1value5splithp
    
            tables.rank2.value1 = rank1value5splithp
            tables.rank2.value2 = rank1value4splithp
            
            tables.rank3.value1 = rank1value4splithp
            tables.rank3.value2 = rank1value3splithp
    
            tables.rank4.value1 = rank1value3splithp
            tables.rank4.value2 = rank1value2splithp
    
            tables.rank5.value1 = rank1value2splithp
            tables.rank5.value2 = rank1value1splithp
    
            tables.rank6.value1 = rank1value2splithp
            tables.rank6.value2 = rank1value1splithp
    
            tables.rank7.value1 = rank1value2splithp
            tables.rank7.value2 = rank1value1splithp
    
            tables.rank8.value1 = rank1value2splithp
            tables.rank8.value2 = rank1value1splithp
    
            tables.rank9.value1 = rank1value2splithp
            tables.rank9.value2 = rank1value1splithp
    
            tables.rank10.value1 = rank1value2splithp
            tables.rank10.value2 = rank1value1splithp
            tables.slidertype = "levels"
            break;
        case "split_by_2_level":
            const rank1value5split = tables.rank1.value1 && ailment_split_by_2(5, parseInt(tables.rank1.value1));
            const rank1value4split = tables.rank1.value1 && ailment_split_by_2(4, parseInt(tables.rank1.value1));
            const rank1value3split = tables.rank1.value1 && ailment_split_by_2(3, parseInt(tables.rank1.value1));
            const rank1value2split = tables.rank1.value1 && ailment_split_by_2(2, parseInt(tables.rank1.value1));
            const rank1value1split = tables.rank1.value1 && ailment_split_by_2(1, parseInt(tables.rank1.value1));
            tables.rank1.value1 = rank1value1split
            tables.rank2.value1 = rank1value2split
            tables.rank3.value1 = rank1value3split
            tables.rank4.value1 = rank1value4split
            tables.rank5.value1 = rank1value5split
            tables.rank6.value1 = rank1value5split
            tables.rank7.value1 = rank1value5split
            tables.rank8.value1 = rank1value5split
            tables.rank9.value1 = rank1value5split
            tables.rank10.value1 = rank1value5split
            tables.slidertype = "levels"
            break;
        case "100_chance":
            for (let i = 1; i <11; i++){
                var chancer = tables[`rank${i}`].value1 && tables[`rank${i}`].value1 == 100 ? "" : `${tables[`rank${i}`].value1}% chance to `
                tables[`rank${i}`].value1 = chancer
            }
            break;
        case "localestring":
            for (let i = 1; i <11; i++){
                var localestring = tables[`rank${i}`].value1 && tables[`rank${i}`].value1.toLocaleString()
                tables[`rank${i}`].value1 = localestring
            }
            break;
        case "by_100":
            for (let i = 1; i <11; i++){
                var by_100 = tables[`rank${i}`].value1 && tables[`rank${i}`].value1
                by_100 = by_100 == 0 ? 100 : by_100 == 100 ? 100 : Math.abs(100 - by_100)
                tables[`rank${i}`].value1 = by_100
            }
            break;
        case "shield_1":
            for (let i = 1; i <11; i++){
                var rank1value1shield1 = Math.floor((tables[`rank${i}`].value1 % 10000) / 10);
                var rank1shield = AilmentNames[rank1value1shield1] || {}
                var rank1value2shield1 = Math.floor(tables[`rank${i}`].value1 % 10);
                tables[`rank${i}`].value1 = `//${rank1shield.icon}// [${rank1shield.name}] #${rank1value1shield1}`
                tables[`rank${i}`].value2 = rank1value2shield1
            }
            break;
        case "shield_2":
            for (let i = 1; i <11; i++){
                var rank1value1shield2 = Math.floor((tables[`rank${i}`].value1 % 100000000) / 10000);
                var rank1shield2 = AilmentNames[rank1value1shield2] || {}
                var rank1value2shield2 = Math.floor((tables[`rank${i}`].value1 % 10000) / 1000);
                var rank1value3shield2 = Math.floor(tables[`rank${i}`].value1 % 1000);
                tables[`rank${i}`].value1 = `//${rank1shield2.icon}// [${rank1shield2.name}] #${rank1value1shield2}`
                tables[`rank${i}`].value2 = rank1value2shield2
                tables[`rank${i}`].value3 = rank1value3shield2
            }
            break;
        case "command_id_split_2":
            for (let i = 1; i <11; i++){
                var rank1comdid = tables[`rank${i}`].value1 && Math.floor((tables[`rank${i}`].value1 % 1000000) / 10);
                var rank1comdid1 = CommandNames[rank1comdid]
                var rank1str_1 = `[${rank1comdid1 && rank1comdid1.name}] - #${rank1comdid}`
                if (rank1str_1 == "[undefined] - #0") {
                    rank1str_1 = undefined
                }
                if (rank1str_1 == "[undefined] - #undefined") {
                    rank1str_1 = undefined
                }
                var rank1value2_id = tables[`rank${i}`].value1 && Math.floor(tables[`rank${i}`].value1 % 10);
                tables[`rank${i}`].value1 = rank1str_1
                tables[`rank${i}`].value2 = rank1value2_id
                tables[`rank${i}`].value3 = rank1value2_id != 1 ? "s" : ""
            }
            break;
        case "command_id":
            for (let i = 1; i <11; i++){
                var rank1comd = CommandNames[tables[`rank${i}`].value1]
                var rank1str = `[${rank1comd && rank1comd.name}] - #${tables[`rank${i}`].value1}`
                if (rank1str == "[undefined] - #0") {
                    rank1str = undefined
                }
                if (rank1str == "[undefined] - #undefined") {
                    rank1str = undefined
                }
                tables[`rank${i}`].value1 = rank1str
            }
            break;
        case "split_3_rev":
            for (let i = 1; i <11; i++){
                var rank1value1split3rev = ailment_val_edit_type_handler(4, tables[`rank${i}`].value1)
                var rank1value2split3rev = ailment_val_edit_type_handler(3, tables[`rank${i}`].value1)
                var rank1value3split3rev = ailment_val_edit_type_handler(2, tables[`rank${i}`].value1)
                tables[`rank${i}`].value1 = rank1value1split3rev
                tables[`rank${i}`].value2 = rank1value2split3rev
                tables[`rank${i}`].value3 = rank1value3split3rev
            }
            break;
        case "split_3":
            for (let i = 1; i <11; i++){
                var rank1value1 = ailment_val_edit_type_handler(2, tables[`rank${i}`].value1)
                var rank1value2 = ailment_val_edit_type_handler(3, tables[`rank${i}`].value1)
                var rank1value3 = ailment_val_edit_type_handler(4, tables[`rank${i}`].value1)
                tables[`rank${i}`].value1 = rank1value1
                tables[`rank${i}`].value2 = rank1value2
                tables[`rank${i}`].value3 = rank1value3
            }
            break;
        case "ailment_id_1_zero_off":
            for (let i = 1; i <11; i++){
                var rank1ail = AilmentNames[tables[`rank${i}`].value1]
                var rank1strail = `//${rank1ail && rank1ail.icon}// [${rank1ail && rank1ail.name}] - #${tables[`rank${i}`].value1} is NOT active`
                if (rank1strail == "//undefined// [undefined] - #0 is NOT active") {
                    rank1strail = `[*effect inactive]`
                }
                if (rank1strail == "//undefined// [undefined] - #undefined is NOT active") {
                    rank1strail = `[*effect inactive]`
                }
                tables[`rank${i}`].value1 = rank1strail
            }
            break;
        case "ailment_id_1":
            for (let i = 1; i <11; i++){
                var rank2ail = AilmentNames[tables[`rank${i}`].value1]
                var rank2strail = `//${rank2ail && rank2ail.icon}// [${rank2ail && rank2ail.name}] - #${tables[`rank${i}`].value1}`
                if (rank2strail == "[undefined] - #0") {
                    rank2strail = undefined
                }
                if (rank2strail == "[undefined] - #undefined") {
                    rank2strail = undefined
                }
                tables[`rank${i}`].value1 = rank2strail
            }
            break;
        case "ailment_id_2":
            for (let i = 1; i <11; i++){
                var rank1value1ailment2 = tables[`rank${i}`].value1 && Math.floor((tables[`rank${i}`].value1 % 1000000) / 100);
                var rank1value2ailment2 = tables[`rank${i}`].value1 && Math.floor(tables[`rank${i}`].value1 % 100);
                var rank1ail2 = tables[`rank${i}`].value1 && AilmentNames[rank1value1ailment2]
                var rank1strailailment2 = `//${rank1ail2 && rank1ail2.icon}// [${rank1ail2 && rank1ail2.name}] - #${rank1value1ailment2}`
                if (rank1strailailment2 == "[undefined] - #0") {
                    rank1strailailment2 = undefined
                }
                if (rank1strailailment2 == "[undefined] - #undefined") {
                    rank1strailailment2 = undefined
                }
                tables[`rank${i}`].value1 = rank1strailailment2
                tables[`rank${i}`].value2 = rank1value2ailment2
            }
            break;
        case "ailment_id_3":
            for (let i = 1; i <11; i++){
                var rank1value1ailment3 = tables[`rank${i}`].value1 && Math.floor((tables[`rank${i}`].value1 % 100000000) / 10000);
                var rank1value2ailment3 = tables[`rank${i}`].value1 && Math.floor((tables[`rank${i}`].value1 % 10000) / 100)
                var rank1value3ailment3 = tables[`rank${i}`].value1 && Math.floor( tables[`rank${i}`].value1 % 100);
                var rank1ail3 = tables[`rank${i}`].value1 && AilmentNames[rank1value1ailment3]
                var icon1 = rank1ail3 && rank1ail3.icon && rank1value2ailment3 != 0 ? ailment_level_icon(rank1ail3,rank1value2ailment3) : rank1ail3.icon
                var rank1strailailment3 = `//${icon1}// [${rank1ail3 && rank1ail3.name}] - #${rank1value1ailment3}`
                if (rank1strailailment3 == "[undefined] - #0") {
                    rank1strailailment3 = undefined
                }
                if (rank1strailailment3 == "[undefined] - #undefined") {
                    rank1strailailment3 = undefined
                }
                tables[`rank${i}`].value1 = rank1strailailment3
                tables[`rank${i}`].value2 = `${rank1value2ailment3} level${rank1value2ailment3!=1?"s":""}`
                tables[`rank${i}`].value3 = rank1value3ailment3
            }
            break;
        case "ailment_group_id_1":
            for (let i = 1; i <11; i++){
                var rank1value1ailgroup1 = ailment_group[tables[`rank${i}`].value1] && ailment_group[tables[`rank${i}`].value1].unique
                tables[`rank${i}`].value1 = rank1value1ailgroup1
            }
            break;
        case "chara_id":
            for (let i = 1; i <11; i++){
                var rank1char_id = char_id[tables[`rank${i}`].value1] && char_id[tables[`rank${i}`].value1].CharacterName
                tables[`rank${i}`].value1 = rank1char_id
            }
            break;
        case "game_index":
            for (let i = 1; i <11; i++){
                var rank1MessageData_Game = MessageData_Game[tables[`rank${i}`].value1] && MessageData_Game[tables[`rank${i}`].value1].MessageData_Game
                tables[`rank${i}`].value1 = rank1MessageData_Game
            }
            break;
        case "ailment_group_id_2":
            for (let i = 1; i <11; i++){
                var rank1value1group2 = Math.floor((tables[`rank${i}`].value1 % 10000) / 100);
                var rank1value2group2 = Math.floor(tables[`rank${i}`].value1 % 100);
                var rank1value1ailgroup2 = ailment_group[rank1value1group2] && ailment_group[rank1value1group2].unique
                tables[`rank${i}`].value1 = rank1value1ailgroup2
                tables[`rank${i}`].value2 = rank1value2group2
            }
            break;
        case "cast_id_1":
            for (let i = 1; i <11; i++){
                var rank1value1cast = tables[`rank${i}`].value1 && Math.floor((tables[`rank${i}`].value1 % 1000000000) / 100000)
                var rank1value2cast = tables[`rank${i}`].value1 && Math.floor((tables[`rank${i}`].value1 % 100000) / 1000)
                var rank1value3cast = tables[`rank${i}`].value1 && Math.floor((tables[`rank${i}`].value1 % 1000) / 10)
                var rank1value4cast = tables[`rank${i}`].value1 && Math.floor(tables[`rank${i}`].value1 % 10);
                var rank1cat = tables[`rank${i}`].value1 && CastNames[rank1value1cast]
                var icon2 = rank1cat && rank1cat.icon && rank1value2cast != 0 ? ailment_level_icon(rank1cat,rank1value2cast) : rank1cat.icon
                var rank1strcast = `//${icon2}// [${rank1cat && rank1cat.name}] - #${rank1cat && rank1cat.id}`
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
                tables[`rank${i}`].value1 = rank1strcast
                tables[`rank${i}`].value2 = rank1value2cast
                tables[`rank${i}`].value3 = rank1value3cast
                tables[`rank${i}`].value4 = rank1value4cast == 0 ? "" : ` for ${rank1value4cast} turn${rank1value4cast != 1 ? "s" : ""}`
            }
            break;
        case "cast_id_1_levels":
            for (let i = 1; i <11; i++){
                var rank2value1cast = tables[`rank${i}`].value1 && Math.floor((tables[`rank${i}`].value1 % 1000000000) / 100000)
                var rank2value2cast = tables[`rank${i}`].value1 && Math.floor((tables[`rank${i}`].value1 % 100000) / 1000)
                var rank2value3cast = tables[`rank${i}`].value1 && Math.floor((tables[`rank${i}`].value1 % 1000) / 10)
                var rank2value4cast = tables[`rank${i}`].value1 && Math.floor( tables[`rank${i}`].value1 % 10) 
                var rank2cat = tables[`rank${i}`].value1 && CastNames[rank2value1cast]
                var rank2strcast = `//${rank2cat && rank2cat.icon}// [${rank2cat && rank2cat.name}] - #${rank2cat && rank2cat.id}`
                if (rank2strcast == "[undefined] - #0") {
                    rank2strcast = undefined
                }
                if (rank2strcast == "[undefined] - #undefined") {
                    rank2strcast = undefined
                }
                tables[`rank${i}`].value1 = rank2strcast
                tables[`rank${i}`].value2 = `${rank2value2cast == undefined || rank2value2cast == 0 ? "" : `${rank2value2cast} level${rank2value2cast == 1 ? " of " : "s of "}`}`
                tables[`rank${i}`].value3 = rank2value3cast
                tables[`rank${i}`].value4 = `${rank2value4cast == 1 ? "Party " : "targets that met condition "}` 
            }
            break;
        case "cast_id_2":
            var rank1value1cast2 = tables.rank1.value1 && Math.floor((tables.rank1.value1 % 1000000000) / 10000000)
            var rank1value2cast2 = tables.rank1.value1 && Math.floor((tables.rank1.value1 % 1000000) / 100)
            var rank1value3cast2 = tables.rank1.value1 && Math.floor( tables.rank1.value1 % 100)
            var rank1cat2 = tables.rank1.value1 && CastNames[rank1value2cast2]
            var rank1strcast2 = `//${rank1cat2 && rank1cat2.icon}// [${rank1cat2 && rank1cat2.name}] - #${rank1cat2 && rank1cat2.id}`
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
            var rank2strcast2 = `//${rank2cat2 && rank2cat2.icon}// [${rank2cat2 && rank2cat2.name}] - #${rank2cat2 && rank2cat2.id}`
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
            var rank3strcast2 = `//${rank3cat2 && rank3cat2.icon}// [${rank3cat2 && rank3cat2.name}] - #${rank3cat2 && rank3cat2.id}`
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
            var rank4strcast2 = `//${rank4cat2 && rank4cat2.icon}// [${rank4cat2 && rank4cat2.name}] - #${rank4cat2 && rank4cat2.id}`
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
            var rank5strcast2 = `//${rank5cat2 && rank5cat2.icon}// [${rank5cat2 && rank5cat2.name}] - #${rank5cat2 && rank5cat2.id}`
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
            var rank6strcast2 = `//${rank6cat2 && rank6cat2.icon}// [${rank6cat2 && rank6cat2.name}] - #${rank6cat2 && rank6cat2.id}`
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
            var rank7strcast2 = `//${rank7cat2 && rank7cat2.icon}// [${rank7cat2 && rank7cat2.name}] - #${rank7cat2 && rank7cat2.id}`
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
            var rank8strcast2 = `//${rank8cat2 && rank8cat2.icon}// [${rank8cat2 && rank8cat2.name}] - #${rank8cat2 && rank8cat2.id}`
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
            var rank9strcast2 = `//${rank9cat2 && rank9cat2.icon}// [${rank9cat2 && rank9cat2.name}] - #${rank9cat2 && rank9cat2.id}`
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
            var rank10strcast2 = `//${rank10cat2 && rank10cat2.icon}// [${rank10cat2 && rank10cat2.name}] - #${rank10cat2 && rank10cat2.id}`
            if (rank10strcast2 == "[undefined] - #0") {
                rank10strcast2 = undefined
            }
            if (rank10strcast2 == "[undefined] - #undefined") {
                rank10strcast2 = undefined
            }
            tables.rank1.value1 = rank1value1cast2
            tables.rank1.value2 = `${rank1strcast2} ${rank2strcast2} ${rank3strcast2} ${rank4strcast2}`
            tables.rank1.value3 = rank1value3cast2
            tables.rank2.value1 = rank2value1cast2
            tables.rank2.value2 = `${rank1strcast2} ${rank2strcast2} ${rank3strcast2} ${rank4strcast2}`
            tables.rank2.value3 = rank2value3cast2
            tables.rank3.value1 = rank3value1cast2
            tables.rank3.value2 = `${rank1strcast2} ${rank2strcast2} ${rank3strcast2} ${rank4strcast2}`
            tables.rank3.value3 = rank3value3cast2
            tables.rank4.value1 = rank4value1cast2
            tables.rank4.value2 = `${rank1strcast2} ${rank2strcast2} ${rank3strcast2} ${rank4strcast2}`
            tables.rank4.value3 = rank4value3cast2
            tables.rank5.value1 = rank5value1cast2
            tables.rank5.value2 = `${rank1strcast2} ${rank2strcast2} ${rank3strcast2} ${rank4strcast2}`
            tables.rank5.value3 = rank5value3cast2
            tables.rank6.value1 = rank6value1cast2
            tables.rank6.value2 = `${rank1strcast2} ${rank2strcast2} ${rank3strcast2} ${rank4strcast2}`
            tables.rank6.value3 = rank6value3cast2
            tables.rank7.value1 = rank7value1cast2,
            tables.rank7.value2 = `${rank1strcast2} ${rank2strcast2} ${rank3strcast2} ${rank4strcast2}`
            tables.rank7.value3 = rank7value3cast2
            tables.rank8.value1 = rank8value1cast2,
            tables.rank8.value2 = `${rank1strcast2} ${rank2strcast2} ${rank3strcast2} ${rank4strcast2}`
            tables.rank8.value3 = rank8value3cast2
            tables.rank9.value1 = rank9value1cast2,
            tables.rank9.value2 = `${rank1strcast2} ${rank2strcast2} ${rank3strcast2} ${rank4strcast2}`
            tables.rank9.value3 = rank9value3cast2
            tables.rank10.value1 = rank10value1cast2,
            tables.rank10.value2 = `${rank1strcast2} ${rank2strcast2} ${rank3strcast2} ${rank4strcast2}`
            tables.rank10.value3 = rank10value3cast2
            break;
        case "brv_damage_cap_per":
            for (let i = 1; i <11; i++){
                var rank1value1brv = tables[`rank${i}`].value1
                var rank1value2brv = Math.round(((tables[`rank${i}`].value1 / 100) + 1) * 9999).toLocaleString()
                tables[`rank${i}`].value1 = rank1value1brv
                tables[`rank${i}`].value2 = rank1value2brv
            }
            break;
        case "max_brv_cap_per":
            for (let i = 1; i <11; i++){
                var rank1value1per = tables[`rank${i}`].value1
                var rank1value2per = Math.round(((tables[`rank${i}`].value1 / 100) + 1) * 99999).toLocaleString()
                tables[`rank${i}`].value1 = rank1value1per
                tables[`rank${i}`].value2 = rank1value2per
            }
            break;
        case "max_brv_cap":
            for (let i = 1; i <11; i++){
                var rank1value1cap = tables[`rank${i}`].value1
                var rank1value2cap = (tables[`rank${i}`].value1 + 99999).toLocaleString()
                if(val_type == 28){
                    rank2ail = AilmentNames[tables[`rank${i}`].value1]
                    rank1value1cap = ' (stored value in)'
                    rank1value2cap = `//${rank2ail && rank2ail.icon}// [${rank2ail && rank2ail.name}] - #${tables[`rank${i}`].value1}`
                }
                tables[`rank${i}`].value1 = rank1value1cap
                tables[`rank${i}`].value2 = rank1value2cap
            }
            break;
        case "ailment_id_4":
            for (let i = 1; i <11; i++){
                var rank1value1ailment = tables[`rank${i}`].value1 && Math.floor((tables[`rank${i}`].value1 % 1000000000) / 100000)
                var rank1ailment = tables[`rank${i}`].value1 && AilmentNames[rank1value1ailment]
                var rank1strailment = `//${rank1ailment && rank1ailment.icon}// [${rank1ailment && rank1ailment.name}] - #${rank1value1ailment}`
                if (rank1strailment == "[undefined] - #0") {
                    rank1strailment = undefined
                }
                if (rank1strailment == "[undefined] - #undefined") {
                    rank1strailment = undefined
                }
                var rank1value2ailment = tables[`rank${i}`].value1 && Math.floor((tables[`rank${i}`].value1 % 100000) / 1000)
                if(rank1value2ailment > 0){
                    rank1value2ailment = ` by ${rank1value2ailment} level${rank1value2ailment!=1?"s":""}`
                } else {
                    rank1value2ailment = ""
                }
                var rank1value3ailment = tables[`rank${i}`].value1 && Math.floor((tables[`rank${i}`].value1 % 1000) / 10)
                var rank1value4ailment = tables[`rank${i}`].value1 && Math.floor( tables[`rank${i}`].value1 % 10)
                if(rank1value4ailment > 0){
                    rank1value4ailment = ` for ${rank1value4ailment} turn${rank1value4ailment!=1?"s":""}`
                } else {
                    rank1value4ailment = ""
                }
                tables[`rank${i}`].value1 = rank1strailment
                tables[`rank${i}`].value2 = rank1value2ailment
                tables[`rank${i}`].value3 = rank1value3ailment
                tables[`rank${i}`].value4 = rank1value4ailment
            }
            break;
        case "series":
            for (let i = 1; i <11; i++){
                var rank1series = MessageData_FFSeries[tables[`rank${i}`].value1] && MessageData_FFSeries[tables[`rank${i}`].value1].name
                tables[`rank${i}`].value1 = rank1series
            }
            break;
        case "command_group_id":
            for (let i = 1; i <11; i++){
                var rank1value1group = command_group[tables[`rank${i}`].value1]
                var rank1value1str = rank1value1group && rank1value1group.unique
                tables[`rank${i}`].value1 = rank1value1str
            }
            break;
        case "turn_rate":
            for (let i = 1; i <11; i++){
                var turn_rate1 =  tables[`rank${i}`].value1 <= 1 ? "∞" : tables[`rank${i}`].value1 
                tables[`rank${i}`].value1 = turn_rate1
            }
            break;
        case "neg_infinite":
            for (let i = 1; i <11; i++){
                var neg1 =  tables[`rank${i}`].value1  == -1 ? "∞" : tables[`rank${i}`].value1  == 99 ? "∞" : tables[`rank${i}`].value1  
                tables[`rank${i}`].value1 = neg1
                tables[`rank${i}`].value2 = neg1 == "∞" ? "s" : neg1 != 0 ? "s" : ""
            }
            break;
        case "value1":
            for (let i = 1; i <11; i++){
                var value1rank1 = ailment_val_edit_type_handler(4, tables[`rank${i}`].value1)
                tables[`rank${i}`].value1 = value1rank1
            }
            break;
        default:
            break;
    }

    if (default_value != undefined) {
        if (tables.rank1.value1 == undefined) {
            for (let i = 1; i <11; i++){
                tables[`rank${i}`].value1 = default_value
            }
        }
    }

    return (tables)
}