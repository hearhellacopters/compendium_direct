import Ailment_Data_Pars from './Ailment_Data_Pars'
import val_edit_type_handler from "./val_edit_type_handler"

const Ailment_Field_Effect_Pars = (
    match,
    Single,

    is_buff,
    AugValue1,
    AugValue2,
    max_level,
    rank,
    alt_rank,
    alt_aug1,
    alt_aug2,
    ver,
    base_buff,
    master_index
) => {

    const EffectID = master_index.ailment_effect_id_index.effect_id
    const ValType = master_index.ailment_effect_id_index.val_type
    const ValEditType = master_index.ailment_effect_id_index.val_edit_type
    const EffectValueType = master_index.ailment_effect_id_index.effect_value_type
    const EffectTypeID = master_index.ailment_effect_id_index.effect_type_id
    const EffectID53 = master_index.ailment_effect_id_index.effect_id_53
    const field_require_id = master_index.ailment_effect_id_index.field_require_id
    const field_require_id_1 = master_index.ailment_effect_id_index.field_require_id_1
    const field_require_id_2 = master_index.ailment_effect_id_index.field_require_id_2
    const field_target = master_index.ailment_effect_id_index.field_target
    const MessageData_Game = master_index.ailment_effect_id_index.MessageData_Game
    const AilmentNames = master_index.ailments
    const CondData = master_index.cond
    const MessageData_FFSeries = master_index.ffseries
    const MessageData_Category = master_index.weaponcat
    const CastNames = master_index.cast_names
    const CommandNames = master_index.commands
    const ailment_group = master_index.ailment_group_full[ver]
    const command_group = master_index.command_group_full[ver]
    const Ailment_Effects = master_index.ailment_effect_id_index
    const char_id = master_index.charid

    const ailment_id = match.ailment_id
    const require_id_2 = match.require_id_2
    const require_id_1 = match.require_id_1
    const require_value = match.require_value
    const require_value_1 = match.require_value_1
    const require_value_2 = match.require_value_2
    const require_value_3 = match.require_value_3
    const require_value_4 = match.require_value_4
    const require_value_5 = match.require_value_5
    const no_stack = match.no_stack
    var effect_data = undefined
    var effect_target_id = undefined
    var val_edit_type = undefined
    var stack_flag = undefined
    var effect_value_type = undefined
    var effect_type_id = undefined
    var effect_value = undefined
    var effect_value_1 = undefined
    var effect_value_2 = undefined
    var effect_value_3 = undefined
    var effect_value_4 = undefined
    var effect_value_5 = undefined
    var effect_value_6 = undefined
    var effect_value_7 = undefined
    var effect_value_8 = undefined
    var effect_value_9 = undefined
    var ailment_effect = undefined
    var edit_arg = undefined
    if (Single == true) {
        effect_data = match.effect_id
        effect_target_id = match.effect_target_id
        val_edit_type = match.val_edit_type
        stack_flag = match.stack_flag
        effect_value_type = match.effect_value_type
        effect_type_id = match.effect_type_id
        effect_value = match.effect_value
        effect_value_1 = match.effect_value_1
        effect_value_2 = match.effect_value_2
        effect_value_3 = match.effect_value_3
        effect_value_4 = match.effect_value_4
        effect_value_5 = match.effect_value_5
        effect_value_6 = match.effect_value_6
        effect_value_7 = match.effect_value_7
        effect_value_8 = match.effect_value_8
        effect_value_9 = match.effect_value_9
        ailment_effect = match.ailment_effect
        edit_arg = match.edit_arg
    } else {
        effect_data = match.effect_id
        effect_target_id = effect_data && effect_data.effect_target_id
        val_edit_type = effect_data && effect_data.val_edit_type
        stack_flag = effect_data && effect_data.stack_flag
        effect_value_type = effect_data && effect_data.effect_value_type
        effect_type_id = effect_data && effect_data.effect_type_id
        effect_value = effect_data && effect_data.effect_value
        effect_value_1 = effect_data && effect_data.effect_value_1
        effect_value_2 = effect_data && effect_data.effect_value_2
        effect_value_3 = effect_data && effect_data.effect_value_3
        effect_value_4 = effect_data && effect_data.effect_value_4
        effect_value_5 = effect_data && effect_data.effect_value_5
        effect_value_6 = effect_data && effect_data.effect_value_6
        effect_value_7 = effect_data && effect_data.effect_value_7
        effect_value_8 = effect_data && effect_data.effect_value_8
        effect_value_9 = effect_data && effect_data.effect_value_9
        ailment_effect = effect_data && effect_data.ailment_effect
        edit_arg = effect_data && effect_data.edit_arg
    }
    const neg_flag = EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].neg_flag
    const value_trans = EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].value_trans

    //target

    var targetstr = ""

    var targ_pull = field_target[effect_target_id] && field_target[effect_target_id].field_target

    if (targ_pull != undefined) {
        targetstr = `${targ_pull} `
    } else {
        targetstr = `Unknown target: ${effect_target_id}`
    }


    var require_id_2str = undefined
    var require_id_1str = undefined

    var requ_1_pull = field_require_id_1[require_id_1] && field_require_id_1[require_id_1].field_require_id_1
    if (requ_1_pull != undefined) {
        require_id_1str = requ_1_pull
    } else {
        if (require_id_1 != -1) {
            require_id_1str = `Unknown require_id_1: ${require_id_1}`
        }
    }

    var requ_2_pull = field_require_id_2[require_id_2] && field_require_id_2[require_id_2].field_require_id_2
    if (requ_2_pull != undefined) {
        require_id_2str = requ_2_pull
    } else {
        if (require_id_2 != -1) {
            require_id_2str = `Unknown require_id_2: ${require_id_2}`
        }
    }

    if (targetstr == "Party " && require_id_1str == "(except Allies)") {
        targetstr = "Adds " //formally self
    }
    if (targetstr == "Party " && require_id_2str == "(except Allies)") {
        targetstr = "Adds " //formally self
    }
    if (targetstr == "Party " && require_id_1str == "(except Self)") {
        targetstr = "Party (except Self) "
    }
    if (targetstr == "Party " && require_id_2str == "(except Self)") {
        targetstr = "Party (except Self) "
    }

    var require_value_str = require_value
    var require_value_1_str = require_value_1
    var require_value_2_str = require_value_2
    var require_value_3_str = require_value_3
    var require_value_4_str = require_value_4
    var require_value_5_str = require_value_5

    //require_id_1
    var requ_1_value_trans = field_require_id_1[require_id_1] && field_require_id_1[require_id_1].value_trans

    if (requ_1_value_trans == "ailment_id_2_over_under") {
        const ailmentpull = AilmentNames[require_value_2] && AilmentNames[require_value_2].name
        if (ailmentpull != undefined) {
            require_value_2_str = `[${ailmentpull}] #${require_value_2}`
        }
        require_value_str = require_value > require_value_1 ? `≥ ${require_value}` : `≤  ${require_value_1}`
    }

    if (requ_1_value_trans == "over_under_2") {
        require_value_2_str = require_value_2 > require_value_3 ? `≥ ${require_value_2}` : `≤ ${require_value_3}`
        require_value_3_str = ""
    }

    if (requ_1_value_trans == "cond_id_2") {
        const cond_pull = CondData[require_value_2] && CondData[require_value_2].trans

        if (cond_pull != undefined) {
            if (ver == "GL" && CondData[require_value_2].GLtrans != undefined) {
                require_value_2_str = CondData[require_value_2].GLtrans
            } else {
                require_value_2_str = cond_pull
            }
        } else {
            require_value_2_str = `Cond: #${require_value_2}`
        }
    }

    if (requ_1_value_trans == "MessageData_Category_2") {
        const weapon_pull = MessageData_Category[require_value_2] && MessageData_Category[require_value_2].name
        if (weapon_pull != undefined) {
            require_value_2_str = weapon_pull
        } else {
            require_value_2_str = `Unknown Weapon #${require_value_2}`
        }
    }

    if (requ_1_value_trans == "Crystal_2") {
        const crystal = ["none", "Red", "Blue", "Green", "Yellow", "Black", "White"]
        const crystal_pull = crystal[require_value_2]
        if (crystal_pull != undefined) {
            require_value_2_str = crystal_pull
        } else {
            require_value_2_str = `Unknown crystal #${require_value_2}`
        }
    }

    if (requ_1_value_trans == "MessageData_FFSeries_2") {
        const series_pull = MessageData_FFSeries[require_value_2] && MessageData_FFSeries[require_value_2].name
        if (series_pull != undefined) {
            require_value_2_str = series_pull
        } else {
            require_value_2_str = `unknown sereies #${require_value_2}`
        }
    }

    if (requ_1_value_trans == "over_between_2") {
        require_value_2_str = require_value_3 == 0 ? `over ${require_value_2}%` : `between ${require_value_2}% - ${require_value_3}%`
        require_value_3_str = ""
    }

    require_id_1str = require_id_1str && require_id_1str
        .replace(/\[require_value\]/gm, require_value_str)
        .replace(/\[require_value_1\]/gm, require_value_1_str)
        .replace(/\[require_value_2\]/gm, require_value_2_str)
        .replace(/\[require_value_3\]/gm, require_value_3_str)
        .replace(/\[require_value_4\]/gm, require_value_4_str)
        .replace(/\[require_value_5\]/gm, require_value_5_str)

    //require_id_2
    var requ_2_value_trans = field_require_id_2[require_id_2] && field_require_id_2[require_id_2].value_trans

    var require_value_str_1 = require_value
    var require_value_1_str_1 = require_value_1
    var require_value_2_str_1 = require_value_2
    var require_value_3_str_1 = require_value_3
    var require_value_4_str_1 = require_value_4
    var require_value_5_str_1 = require_value_5

    if (requ_2_value_trans == "over_under_3") {
        require_value_4_str_1 = require_value_4 > require_value_5 ? `≥ ${require_value_4}` : `≤ ${require_value_5}`
        require_value_5_str_1 = ""
    }

    if (requ_2_value_trans == "cond_id_4") {
        const cond_pull_4 = CondData[require_value_4] && CondData[require_value_4].trans
        if (cond_pull_4 != undefined) {
            if (ver == "GL" && CondData[require_value_4].GLtrans != undefined) {
                require_value_4_str_1 = CondData[require_value_4].GLtrans
            } else {
                require_value_4_str_1 = cond_pull_4
            }
        } else {
            require_value_4_str_1 = `Cond: #${require_value_4}`
        }
    }

    if (requ_2_value_trans == "MessageData_Category_4") {
        const weapon_pull_4 = MessageData_Category[require_value_4] && MessageData_Category[require_value_4].name
        if (weapon_pull_4 != undefined) {
            require_value_4_str_1 = weapon_pull_4
        } else {
            require_value_4_str_1 = `Unknown Weapon #${require_value_4}`
        }
    }

    if (requ_2_value_trans == "Crystal_4") {
        const crystal_4 = ["none", "Red", "Blue", "Green", "Yellow", "Black", "White"]
        const crystal_pull_4 = crystal_4[require_value_4]
        if (crystal_pull_4 != undefined) {
            require_value_4_str_1 = crystal_pull_4
        } else {
            require_value_4_str_1 = `Unknown crystal #${require_value_4}`
        }
    }

    if (requ_2_value_trans == "MessageData_FFSeries_4") {
        const series_pull_4 = MessageData_FFSeries[require_value_4] && MessageData_FFSeries[require_value_4].name
        if (series_pull_4 != undefined) {
            require_value_4_str_1 = series_pull_4
        } else {
            require_value_4_str_1 = `unknown sereies #${require_value_2}`
        }
    }

    if (requ_2_value_trans == "over_between_4") {
        require_value_4_str_1 = require_value_5 == 0 ? `over ${require_value_4}%` : `between ${require_value_4}% - ${require_value_5}%`
        require_value_5_str_1 = ""
    }

    require_id_2str = require_id_2str && require_id_2str
        .replace(/\[require_value\]/gm, require_value_str_1)
        .replace(/\[require_value_1\]/gm, require_value_1_str_1)
        .replace(/\[require_value_2\]/gm, require_value_2_str_1)
        .replace(/\[require_value_3\]/gm, require_value_3_str_1)
        .replace(/\[require_value_4\]/gm, require_value_4_str_1)
        .replace(/\[require_value_5\]/gm, require_value_5_str_1)


    //cond maker
    var condstr = undefined

    if (require_id_1str != "(except Allies)" & require_id_1str != "(except Self)" && require_id_1str != undefined) {
        condstr = require_id_1str
    }
    if (require_id_2str != "(except Allies)" & require_id_2str != "(except Self)" && require_id_2str != undefined) {
        if (condstr != undefined) {
            condstr += ` & ${require_id_2str}`
        } else {
            condstr = require_id_2str
        }
    }
    if (Single == true) {
        condstr = undefined
    }

    //val_edit_type

    var val_edit_typestr = undefined

    if (val_edit_type != undefined && val_edit_type != 0) {
        const editvaluepull = ValEditType[val_edit_type] && ValEditType[val_edit_type].val_edit_type
        if (editvaluepull == undefined) {
            val_edit_typestr = `Unknown val_edit_type: ${val_edit_type}`
        } else {
            val_edit_typestr = editvaluepull
        }
    }

    var ValEditTypeShow = false

    if (val_edit_type >= 8) {
        ValEditTypeShow = true
    }

    //stack_flag

    var stack_flagstr = undefined

    if (stack_flag == 1) {
        stack_flagstr = "*Effect STACKS with buffs of same name"
    }
    if (no_stack == true) {
        if (stack_flagstr == undefined) {
            stack_flagstr = "*Does NOT stack with earlier effect of same value"
        } else {
            stack_flagstr += "but NOT earlier effect of same value"
        }
    }

    //EffectValueType

    var effect_value_typestr = undefined

    const effectvaluetypepull = EffectValueType[effect_value_type] && EffectValueType[effect_value_type].effect_value_type

    if (effectvaluetypepull != undefined && effectvaluetypepull != 0) {
        effect_value_typestr = effectvaluetypepull
    }
    else {
        effect_value_typestr = `Unknown effect_value_type: ${effect_value_type}`
    }

    if (effect_value_type == 8) {
        var getailmentgroup = ailment_group[edit_arg] && ailment_group[edit_arg].unique
        effect_value_typestr = effect_value_typestr.replace(/\[value1\]/gm, getailmentgroup)
    }

    var EffectValueTypeShow = false

    if (effect_value_type >= 4) {
        EffectValueTypeShow = true
    }

    //string pull

    var effectstr = targetstr

    var tarcheck = targetstr == "All Enemies " ? 0 : is_buff != undefined ? is_buff : 1

    if (effect_type_id != -1) {
        const effectpull = EffectTypeID[effect_type_id]
        if (effectpull == undefined) {
            effectstr = `Unknown effect_type_id: ${effect_type_id}`
        }
        if (tarcheck == 1) {
            effectstr += effectpull && effectpull.buff_string
        } else {
            effectstr += effectpull && effectpull.debuff_string
        }
    }

    //others

    var slidertype = "ranks"
    var multiply = false
    var multiplyslider = undefined
    var defaultrank = rank != undefined ? rank < 1 ? 1 : rank : 1

    if (effect_value_type == 2) {
        slidertype = "levels"
        defaultrank = AugValue1 != undefined ? AugValue1 : 1
    }
    if (effect_value_type == 3) {
        slidertype = "ranks"
        defaultrank = rank != undefined ? rank : 1
    }
    if (effect_value_type == 6) {
        slidertype = "fieldbuffsrank"
    }
    if (effect_value_type == 8) {
        slidertype = "groupstacks"
    }
    if (effect_value_type == 10) {
        slidertype = "currenthp"
    }
    if (effect_value_type == 11) {
        slidertype = "charactersleft"
    }
    if (base_buff && base_buff.effect_id_4 == 60 && base_buff && base_buff.val_type_4 != 0) {
        if (base_buff.val_type_4 == 3) {
            slidertype = "levels"
        }
        if (base_buff.val_type_4 == 4) {
            slidertype = "levels"
        }
        if (base_buff.val_type_4 == 7) {
            slidertype = "debuffsrank"
        }
        if (base_buff.val_type_4 == 10) {
            slidertype = "turns"
        }
        if (base_buff.val_type_4 == 11) {
            slidertype = "debuffsrank"
        }
        if (base_buff.val_type_4 == 14) {
            slidertype = "stacks"
        }
        if (base_buff.val_type_4 == 16) {
            slidertype = "stacks"
        }
        if (base_buff.val_type_4 == 18) {
            slidertype = "debuffsrank"
        }
        if (base_buff.val_type_4 == 20) {
            slidertype = "enemies"
        }
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

    //make values
    if (neg_flag == true) {
        if (effect_value < 0) {
            effectstr = targetstr
            effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
        }
        if (effect_value > 0) {
            effectstr = targetstr
            effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
        }
        if (effect_value_1 < 0) {
            effectstr = targetstr
            effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
        }
        if (effect_value_1 > 0) {
            effectstr = targetstr
            effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
        }
        if (effect_value_2 < 0) {
            effectstr = targetstr
            effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
        }
        if (effect_value_2 > 0) {
            effectstr = targetstr
            effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
        }
        if (effect_value_3 < 0) {
            effectstr = targetstr
            effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
        }
        if (effect_value_3 > 0) {
            effectstr = targetstr
            effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
        }
        if (effect_value_4 < 0) {
            effectstr = targetstr
            effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
        }
        if (effect_value_4 > 0) {
            effectstr = targetstr
            effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
        }
        if (effect_value_5 < 0) {
            effectstr = targetstr
            effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
        }
        if (effect_value_5 > 0) {
            effectstr = targetstr
            effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
        }
        if (effect_value_6 < 0) {
            effectstr = targetstr
            effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
        }
        if (effect_value_6 > 0) {
            effectstr = targetstr
            effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
        }
        if (effect_value_7 < 0) {
            effectstr = targetstr
            effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
        }
        if (effect_value_7 > 0) {
            effectstr = targetstr
            effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
        }
        if (effect_value_8 < 0) {
            effectstr = targetstr
            effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
        }
        if (effect_value_8 > 0) {
            effectstr = targetstr
            effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
        }
        if (effect_value_9 < 0) {
            effectstr = targetstr
            effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
        }
        if (effect_value_9 > 0) {
            effectstr = targetstr
            effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
        }
    }


    var rank_table = {
        rank1: {
            value1: effect_value
        },
        rank2: {
            value1: effect_value_1
        },
        rank3: {
            value1: effect_value_2
        },
        rank4: {
            value1: effect_value_3
        },
        rank5: {
            value1: effect_value_4
        },
        rank6: {
            value1: effect_value_5
        },
        rank7: {
            value1: effect_value_6
        },
        rank8: {
            value1: effect_value_7
        },
        rank9: {
            value1: effect_value_8
        },
        rank10: {
            value1: effect_value_9
        },
        effectstr: effectstr,
        cond_id: condstr,
        effect_value_typestr: effect_value_typestr,
        EffectValueTypeShow: EffectValueTypeShow,
        val_edit_typestr: val_edit_typestr,
        ValEditTypeShow: ValEditTypeShow,
        stack_flag: stack_flagstr,
        slidertype: slidertype,
        multiply: multiply,
        multiplyslider: multiplyslider,
        defaultrank: defaultrank
    }

    if (effect_type_id != 14 && effect_type_id != 15) {
        if (value_trans == "use_neg") {
            rank_table = {
                rank1: {
                    value1: effect_value
                },
                rank2: {
                    value1: effect_value_1
                },
                rank3: {
                    value1: effect_value_2
                },
                rank4: {
                    value1: effect_value_3
                },
                rank5: {
                    value1: effect_value_4
                },
                rank6: {
                    value1: effect_value_5
                },
                rank7: {
                    value1: effect_value_6
                },
                rank8: {
                    value1: effect_value_7
                },
                rank9: {
                    value1: effect_value_8
                },
                rank10: {
                    value1: effect_value_9
                },
                effectstr: effectstr,
                cond_id: condstr,
                effect_value_typestr: effect_value_typestr,
                EffectValueTypeShow: EffectValueTypeShow,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                stack_flag: stack_flagstr,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank
            }
        } else {
            rank_table = {
                rank1: {
                    value1: Math.abs(effect_value)
                },
                rank2: {
                    value1: Math.abs(effect_value_1)
                },
                rank3: {
                    value1: Math.abs(effect_value_2)
                },
                rank4: {
                    value1: Math.abs(effect_value_3)
                },
                rank5: {
                    value1: Math.abs(effect_value_4)
                },
                rank6: {
                    value1: Math.abs(effect_value_5)
                },
                rank7: {
                    value1: Math.abs(effect_value_6)
                },
                rank8: {
                    value1: Math.abs(effect_value_7)
                },
                rank9: {
                    value1: Math.abs(effect_value_8)
                },
                rank10: {
                    value1: Math.abs(effect_value_9)
                },
                effectstr: effectstr,
                cond_id: condstr,
                effect_value_typestr: effect_value_typestr,
                EffectValueTypeShow: EffectValueTypeShow,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                stack_flag: stack_flagstr,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank
            }
        }
    }
    if (effect_value_type == 1) {
        if (neg_flag == true) {
            if (effect_value < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (effect_value > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        if (effect_type_id != 14 && effect_type_id != 15) {
            if (value_trans == "use_neg") {
                rank_table = {
                    rank1: {
                        value1: effect_value
                    },
                    rank2: {
                        value1: effect_value
                    },
                    rank3: {
                        value1: effect_value
                    },
                    rank4: {
                        value1: effect_value
                    },
                    rank5: {
                        value1: effect_value
                    },
                    rank6: {
                        value1: effect_value
                    },
                    rank7: {
                        value1: effect_value
                    },
                    rank8: {
                        value1: effect_value
                    },
                    rank9: {
                        value1: effect_value
                    },
                    rank10: {
                        value1: effect_value
                    },
                    effectstr: effectstr,
                    cond_id: condstr,
                    effect_value_typestr: effect_value_typestr,
                    EffectValueTypeShow: EffectValueTypeShow,
                    val_edit_typestr: val_edit_typestr,
                    ValEditTypeShow: ValEditTypeShow,
                    stack_flag: stack_flagstr,
                    slidertype: slidertype,
                    multiply: multiply,
                    multiplyslider: multiplyslider,
                    defaultrank: defaultrank
                }
            } else {
                rank_table = {
                    rank1: {
                        value1: Math.abs(effect_value)
                    },
                    rank2: {
                        value1: Math.abs(effect_value)
                    },
                    rank3: {
                        value1: Math.abs(effect_value)
                    },
                    rank4: {
                        value1: Math.abs(effect_value)
                    },
                    rank5: {
                        value1: Math.abs(effect_value)
                    },
                    rank6: {
                        value1: Math.abs(effect_value)
                    },
                    rank7: {
                        value1: Math.abs(effect_value)
                    },
                    rank8: {
                        value1: Math.abs(effect_value)
                    },
                    rank9: {
                        value1: Math.abs(effect_value)
                    },
                    rank10: {
                        value1: Math.abs(effect_value)
                    },
                    effectstr: effectstr,
                    cond_id: condstr,
                    effect_value_typestr: effect_value_typestr,
                    EffectValueTypeShow: EffectValueTypeShow,
                    val_edit_typestr: val_edit_typestr,
                    ValEditTypeShow: ValEditTypeShow,
                    stack_flag: stack_flagstr,
                    slidertype: slidertype,
                    multiply: multiply,
                    multiplyslider: multiplyslider,
                    defaultrank: defaultrank
                }
            }
        }
    }

    //currenthp
    if (effect_value_type == 10) {
        if (neg_flag == true) {
            if (rank_table.rank1.value1 < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (rank_table.rank1.value1 > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        var hprank1value3 = val_edit_type_handler(2, Math.abs(rank_table.rank1.value1))
        var hprank1value2 = val_edit_type_handler(3, Math.abs(rank_table.rank1.value1))
        var hprank1value1 = val_edit_type_handler(4, Math.abs(rank_table.rank1.value1))
        if (neg_flag == true) {
            if (rank_table.rank2.value1 < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (rank_table.rank2.value1 > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        var hprank2value3 = val_edit_type_handler(2, Math.abs(rank_table.rank2.value1))
        var hprank2value2 = val_edit_type_handler(3, Math.abs(rank_table.rank2.value1))
        var hprank2value1 = val_edit_type_handler(4, Math.abs(rank_table.rank2.value1))
        if (neg_flag == true) {
            if (rank_table.rank3.value1 < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (rank_table.rank3.value1 > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        var hprank3value3 = val_edit_type_handler(2, Math.abs(rank_table.rank3.value1))
        var hprank3value2 = val_edit_type_handler(3, Math.abs(rank_table.rank3.value1))
        var hprank3value1 = val_edit_type_handler(4, Math.abs(rank_table.rank3.value1))
        if (neg_flag == true) {
            if (rank_table.rank4.value1 < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (rank_table.rank4.value1 > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        var hprank4value3 = val_edit_type_handler(2, Math.abs(rank_table.rank4.value1))
        var hprank4value2 = val_edit_type_handler(3, Math.abs(rank_table.rank4.value1))
        var hprank4value1 = val_edit_type_handler(4, Math.abs(rank_table.rank4.value1))
        if (neg_flag == true) {
            if (rank_table.rank5.value1 < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (rank_table.rank5.value1 > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        var hprank5value3 = val_edit_type_handler(2, Math.abs(rank_table.rank5.value1))
        var hprank5value2 = val_edit_type_handler(3, Math.abs(rank_table.rank5.value1))
        var hprank5value1 = val_edit_type_handler(4, Math.abs(rank_table.rank5.value1))
        if (neg_flag == true) {
            if (rank_table.rank6.value1 < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (rank_table.rank6.value1 > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        var hprank6value3 = val_edit_type_handler(2, Math.abs(rank_table.rank6.value1))
        var hprank6value2 = val_edit_type_handler(3, Math.abs(rank_table.rank6.value1))
        var hprank6value1 = val_edit_type_handler(4, Math.abs(rank_table.rank6.value1))
        if (neg_flag == true) {
            if (rank_table.rank7.value1 < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (rank_table.rank7.value1 > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        var hprank7value3 = val_edit_type_handler(2, Math.abs(rank_table.rank7.value1))
        var hprank7value2 = val_edit_type_handler(3, Math.abs(rank_table.rank7.value1))
        var hprank7value1 = val_edit_type_handler(4, Math.abs(rank_table.rank7.value1))
        if (neg_flag == true) {
            if (rank_table.rank8.value1 < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (rank_table.rank8.value1 > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        var hprank8value3 = val_edit_type_handler(2, Math.abs(rank_table.rank8.value1))
        var hprank8value2 = val_edit_type_handler(3, Math.abs(rank_table.rank8.value1))
        var hprank8value1 = val_edit_type_handler(4, Math.abs(rank_table.rank8.value1))
        if (neg_flag == true) {
            if (rank_table.rank9.value1 < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (rank_table.rank9.value1 > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        var hprank9value3 = val_edit_type_handler(2, Math.abs(rank_table.rank9.value1))
        var hprank9value2 = val_edit_type_handler(3, Math.abs(rank_table.rank9.value1))
        var hprank9value1 = val_edit_type_handler(4, Math.abs(rank_table.rank9.value1))
        if (neg_flag == true) {
            if (rank_table.rank10.value1 < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (rank_table.rank10.value1 > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        var hprank10value3 = val_edit_type_handler(2, Math.abs(rank_table.rank10.value1))
        var hprank10value2 = val_edit_type_handler(3, Math.abs(rank_table.rank10.value1))
        var hprank10value1 = val_edit_type_handler(4, Math.abs(rank_table.rank10.value1))
        rank_table = {
            rank1: {
                value1: hprank1value1,
                value2: hprank1value2,
                value3: hprank1value3
            },
            rank2: {
                value1: hprank2value1,
                value2: hprank2value2,
                value3: hprank2value3
            },
            rank3: {
                value1: hprank3value1,
                value2: hprank3value2,
                value3: hprank3value3
            },
            rank4: {
                value1: hprank4value1,
                value2: hprank4value2,
                value3: hprank4value3
            },
            rank5: {
                value1: hprank5value1,
                value2: hprank5value2,
                value3: hprank5value3
            },
            rank6: {
                value1: hprank6value1,
                value2: hprank6value2,
                value3: hprank6value3
            },
            rank7: {
                value1: hprank7value1,
                value2: hprank7value2,
                value3: hprank7value3
            },
            rank8: {
                value1: hprank8value1,
                value2: hprank8value2,
                value3: hprank8value3
            },
            rank9: {
                value1: hprank9value1,
                value2: hprank9value2,
                value3: hprank9value3
            },
            rank10: {
                value1: hprank10value1,
                value2: hprank10value2,
                value3: hprank10value3
            },
            cond_id: condstr,
            effect_value_typestr: effect_value_typestr,
            EffectValueTypeShow: EffectValueTypeShow,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            stack_flag: stack_flagstr,
            effectstr: effectstr,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank
        }
    }

    //ATK_DEF_SPD_(FIELD) & INT_BRV_MAX_BRV_(FIELD)
    if (effect_type_id == 14 || effect_type_id == 15) {
        if (neg_flag == true) {
            if (rank_table.rank1.value1 < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (rank_table.rank1.value1 > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        var rank1value1 = val_edit_type_handler(2, Math.abs(rank_table.rank1.value1))
        var rank1value2 = val_edit_type_handler(3, Math.abs(rank_table.rank1.value1))
        var rank1value3 = val_edit_type_handler(4, Math.abs(rank_table.rank1.value1))
        if (neg_flag == true) {
            if (rank_table.rank2.value1 < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (rank_table.rank2.value1 > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        var rank2value1 = val_edit_type_handler(2, Math.abs(rank_table.rank2.value1))
        var rank2value2 = val_edit_type_handler(3, Math.abs(rank_table.rank2.value1))
        var rank2value3 = val_edit_type_handler(4, Math.abs(rank_table.rank2.value1))
        if (neg_flag == true) {
            if (rank_table.rank3.value1 < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (rank_table.rank3.value1 > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        var rank3value1 = val_edit_type_handler(2, Math.abs(rank_table.rank3.value1))
        var rank3value2 = val_edit_type_handler(3, Math.abs(rank_table.rank3.value1))
        var rank3value3 = val_edit_type_handler(4, Math.abs(rank_table.rank3.value1))
        if (neg_flag == true) {
            if (rank_table.rank4.value1 < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (rank_table.rank4.value1 > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        var rank4value1 = val_edit_type_handler(2, Math.abs(rank_table.rank4.value1))
        var rank4value2 = val_edit_type_handler(3, Math.abs(rank_table.rank4.value1))
        var rank4value3 = val_edit_type_handler(4, Math.abs(rank_table.rank4.value1))
        if (neg_flag == true) {
            if (rank_table.rank5.value1 < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (rank_table.rank5.value1 > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        var rank5value1 = val_edit_type_handler(2, Math.abs(rank_table.rank5.value1))
        var rank5value2 = val_edit_type_handler(3, Math.abs(rank_table.rank5.value1))
        var rank5value3 = val_edit_type_handler(4, Math.abs(rank_table.rank5.value1))
        if (neg_flag == true) {
            if (rank_table.rank6.value1 < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (rank_table.rank6.value1 > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        var rank6value1 = val_edit_type_handler(2, Math.abs(rank_table.rank6.value1))
        var rank6value2 = val_edit_type_handler(3, Math.abs(rank_table.rank6.value1))
        var rank6value3 = val_edit_type_handler(4, Math.abs(rank_table.rank6.value1))
        if (neg_flag == true) {
            if (rank_table.rank7.value1 < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (rank_table.rank7.value1 > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        var rank7value1 = val_edit_type_handler(2, Math.abs(rank_table.rank7.value1))
        var rank7value2 = val_edit_type_handler(3, Math.abs(rank_table.rank7.value1))
        var rank7value3 = val_edit_type_handler(4, Math.abs(rank_table.rank7.value1))
        if (neg_flag == true) {
            if (rank_table.rank8.value1 < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (rank_table.rank8.value1 > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        var rank8value1 = val_edit_type_handler(2, Math.abs(rank_table.rank8.value1))
        var rank8value2 = val_edit_type_handler(3, Math.abs(rank_table.rank8.value1))
        var rank8value3 = val_edit_type_handler(4, Math.abs(rank_table.rank8.value1))
        if (neg_flag == true) {
            if (rank_table.rank9.value1 < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (rank_table.rank9.value1 > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        var rank9value1 = val_edit_type_handler(2, Math.abs(rank_table.rank9.value1))
        var rank9value2 = val_edit_type_handler(3, Math.abs(rank_table.rank9.value1))
        var rank9value3 = val_edit_type_handler(4, Math.abs(rank_table.rank9.value1))
        if (neg_flag == true) {
            if (rank_table.rank10.value1 < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (rank_table.rank10.value1 > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        var rank10value1 = val_edit_type_handler(2, Math.abs(rank_table.rank10.value1))
        var rank10value2 = val_edit_type_handler(3, Math.abs(rank_table.rank10.value1))
        var rank10value3 = val_edit_type_handler(4, Math.abs(rank_table.rank10.value1))
        effectstr = effectstr.replace(/\[target\]/gm, `\xa0- ${targetstr}`)
        rank_table = {
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
            cond_id: condstr,
            effect_value_typestr: effect_value_typestr,
            EffectValueTypeShow: EffectValueTypeShow,
            val_edit_typestr: val_edit_typestr,
            ValEditTypeShow: ValEditTypeShow,
            stack_flag: stack_flagstr,
            effectstr: effectstr,
            slidertype: slidertype,
            multiply: multiply,
            multiplyslider: multiplyslider,
            defaultrank: defaultrank
        }
    }
    var geteffect = rank_table
    if (effect_type_id == -1 && ailment_effect == -1) {
        geteffect = undefined
    }
    if (effect_type_id == -1 && ailment_effect != -1) {
        if (neg_flag == true) {
            if (effect_value < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (effect_value > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        if (neg_flag == true) {
            if (effect_value_1 < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (effect_value_1 > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        if (neg_flag == true) {
            if (effect_value_2 < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (effect_value_2 > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        if (neg_flag == true) {
            if (effect_value_3 < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (effect_value_3 > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        if (neg_flag == true) {
            if (effect_value_4 < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (effect_value_4 > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        if (neg_flag == true) {
            if (effect_value_5 < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (effect_value_5 > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        if (neg_flag == true) {
            if (effect_value_6 < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (effect_value_6 > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        if (neg_flag == true) {
            if (effect_value_7 < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (effect_value_7 > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        if (neg_flag == true) {
            if (effect_value_8 < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (effect_value_8 > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        if (neg_flag == true) {
            if (effect_value_9 < 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].debuff_string
            }
            if (effect_value_9 > 0) {
                effectstr = targetstr
                effectstr += EffectTypeID[effect_type_id] && EffectTypeID[effect_type_id].buff_string
            }
        }
        if (effect_value_type == 1) {
            rank_table = {
                rank1: effect_value,
                rank2: effect_value,
                rank3: effect_value,
                rank4: effect_value,
                rank5: effect_value,
                rank6: effect_value,
                rank7: effect_value,
                rank8: effect_value,
                rank9: effect_value,
                rank10: effect_value,
                effectstr: effectstr,
                cond_id: condstr,
                effect_value_typestr: effect_value_typestr,
                EffectValueTypeShow: EffectValueTypeShow,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                stack_flag: stack_flagstr,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank
            }
        } else {
            rank_table = {
                rank1: effect_value,
                rank2: effect_value_1,
                rank3: effect_value_2,
                rank4: effect_value_3,
                rank5: effect_value_4,
                rank6: effect_value_5,
                rank7: effect_value_6,
                rank8: effect_value_7,
                rank9: effect_value_8,
                rank10: effect_value_9,
                effectstr: effectstr,
                cond_id: condstr,
                effect_value_typestr: effect_value_typestr,
                EffectValueTypeShow: EffectValueTypeShow,
                val_edit_typestr: val_edit_typestr,
                ValEditTypeShow: ValEditTypeShow,
                stack_flag: stack_flagstr,
                slidertype: slidertype,
                multiply: multiply,
                multiplyslider: multiplyslider,
                defaultrank: defaultrank
            }
        }

        geteffect = Ailment_Data_Pars(
            ailment_id,
            ailment_effect,
            //val_type
            base_buff && base_buff.effect_id_4 == 60 && base_buff && base_buff.val_type_4 != 0 ? base_buff.val_type_4 : 0,
            //val_specify
            effect_value,
            val_edit_type,
            //cond_id 
            -1,
            rank_table,
            targetstr == "All Enemies " ? 0 : is_buff != undefined ? is_buff : 1,
            //effect number
            0,
            master_index,
            ver,
            //augs
            AugValue1,
            AugValue2,
            max_level,
            defaultrank,
            alt_rank,
            alt_aug1,
            alt_aug2,
            effect_value_type == 10 ? "split_3_rev" : undefined,
        )
        var effectstrpull = `${targetstr}${geteffect.effectstr}`
        Object.assign(geteffect,
            {
                slidertype: slidertype,
                cond_id: condstr,
                effect_value_typestr: effect_value_typestr,
                EffectValueTypeShow: EffectValueTypeShow,
                stack_flag: stack_flagstr,
                defaultrank: defaultrank,
                effectstr: effectstrpull
            })
    }

    return (
        geteffect
    )
}
export default Ailment_Field_Effect_Pars