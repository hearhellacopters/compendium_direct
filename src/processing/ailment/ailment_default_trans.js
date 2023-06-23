import ailment_level_icon from "./ailment_level_icon.js"

export default function ailment_default_trans(
    default_data,
    passed_ailment,
    master_index,
    ver
){

    const default_cond = master_index.ailment_effect_id_index.default_cond
    const passivenames = master_index.passivenames
    const equipmentpassivenames = master_index.equipmentpassivenames
    const CommandNames = master_index.commands
    const cast_targets = master_index.command_data_trans.cast_target

    const EX_rename = (data) => {
        let replacement = data
        replacement = data == undefined ? "" : data.replace(/EX/, "EXrank")
        return replacement
    }

    var cond_str = ""

    if (default_data.is_cast_only_wave_start_ == 1) {
        cond_str = "at start of wave"
    }
    if (default_data.is_cast_only_start_ == 1) {
        cond_str = "at start of quest"
    }
    if (default_data.is_cast_only_start_ == 1 && default_data.is_cast_only_wave_start_ == 1) {
        cond_str = "at start of quest & at start of wave"
    }
    if(cond_str == ""){
        cond_str = "at start of quest"
    }

    var cond_id_str = ""

    var cond_id_1_str = ""

    var arg1 = default_data.cond_arg1

    var arg2 = default_data.cond_arg2

    var tag = ""

    var rank = ""

    var arg1_1 = default_data.cond_arg1_1

    var arg2_1 = default_data.cond_arg2_2

    var tag_1 = ""

    var rank_1 = ""

    //cond_id

    const cond_id = default_cond[default_data.cond_id] && default_cond[default_data.cond_id].default_cond

    const cond_id_value_trans = default_cond[default_data.cond_id] && default_cond[default_data.cond_id].value_trans

    if (cond_id != undefined) {
        if (default_data.cond_id != 1) {
            cond_id_str = cond_id

            if (cond_id_value_trans == "passivenames") {
                const pass_pull = passivenames[default_data.cond_arg1] && passivenames[default_data.cond_arg1].name
                if (pass_pull != undefined) {
                    arg1 = `[${pass_pull}] #${default_data.cond_arg1} `
                } else {
                    arg1 = `[#${default_data.cond_arg1}] #${default_data.cond_arg1} `
                }
                const tag_pull = passivenames[default_data.cond_arg1] && passivenames[default_data.cond_arg1].loc_tag
                if (tag_pull != undefined) {
                    tag = `<${tag_pull}>`
                } else {
                    tag = `unknown tag`
                }
            }

            if (cond_id_value_trans == "equipmentpassivenames") {
                const equpass_pull = equipmentpassivenames[default_data.cond_arg1] && equipmentpassivenames[default_data.cond_arg1].name
                if (equpass_pull != undefined) {
                    arg1 = `[${equpass_pull}] #${default_data.cond_arg1} `
                } else {
                    arg1 = `[#${default_data.cond_arg1}] #${default_data.cond_arg1} `
                }
                const eqtag_pull = equipmentpassivenames[default_data.cond_arg1] && equipmentpassivenames[default_data.cond_arg1].loc_tag
                if (eqtag_pull != undefined) {
                    tag = `<${eqtag_pull}>`
                } else {
                    tag = `unknown tag`
                }
            }

            if (cond_id_value_trans == "CommandNames") {
                const comd_pull = CommandNames[default_data.cond_arg1] && CommandNames[default_data.cond_arg1].name
                if (comd_pull != undefined) {
                    arg1 = `[${comd_pull}] #${default_data.cond_arg1}`
                } else {
                    arg1 = `[#${default_data.cond_arg1}] #${default_data.cond_arg1}`
                }
                const rank_pull = CommandNames[default_data.cond_arg1] && CommandNames[default_data.cond_arg1].rank
                if (rank_pull != undefined) {
                    tag = `<${EX_rename(rank_pull)}>`
                } else {
                    tag = `unknown tag`
                }
            }

            if (default_data.cond_arg2 != 0) {
                //arg2 = `w/ Priority: ${default_data.cond_arg2}`
                arg2 = ""
            } else {
                arg2 = ""
            }

            cond_id_str = cond_id_str.replace(/\[arg1\]/gm, arg1)
                .replace(/\[arg2\]/gm, arg2)
                .replace(/\[tag\]/gm, tag)
                .replace(/\[rank\]/gm, rank)
        }
    }

    //cond_id_1

    const cond_id_1 = default_cond[default_data.cond_id_1] && default_cond[default_data.cond_id_1].default_cond

    const cond_id_1_value_trans = default_cond[default_data.cond_id_1] && default_cond[default_data.cond_id_1].value_trans

    if (cond_id != undefined) {
        if (default_data.cond_id_1 != 1) {
            cond_id_1_str = cond_id_1

            if (cond_id_1_value_trans == "passivenames") {
                const pass_pull_1 = passivenames[default_data.cond_arg1_1] && passivenames[default_data.cond_arg1_1].name
                if (pass_pull_1 != undefined) {
                    arg1_1 = `[${pass_pull_1}] #${default_data.cond_arg1_1}`
                } else {
                    arg1_1 = `[#${default_data.cond_arg1_1}] #${default_data.cond_arg1_1}`
                }
                const tag_pull_1 = passivenames[default_data.cond_arg1_1] && passivenames[default_data.cond_arg1_1].loc_tag
                if (tag_pull_1 != undefined) {
                    tag_1 = `<${tag_pull_1}>`
                } else {
                    tag_1 = `unknown tag`
                }
            }

            if (cond_id_1_value_trans == "equipmentpassivenames") {
                const equpass_pull_1 = equipmentpassivenames[default_data.cond_arg1_1] && equipmentpassivenames[default_data.cond_arg1_1].name
                if (equpass_pull_1 != undefined) {
                    arg1_1 = `[${equpass_pull_1}] #${default_data.cond_arg1_1}`
                } else {
                    arg1_1 = `[#${default_data.cond_arg1_1}] #${default_data.cond_arg1_1} `
                }
                const eqtag_pull_1 = equipmentpassivenames[default_data.cond_arg1_1] && equipmentpassivenames[default_data.cond_arg1_1].loc_tag
                if (eqtag_pull_1 != undefined) {
                    tag_1 = `<${eqtag_pull_1}>`
                } else {
                    tag_1 = `unknown tag`
                }
            }

            if (cond_id_1_value_trans == "CommandNames") {
                const comd_pull_1 = CommandNames[default_data.cond_arg1_1] && CommandNames[default_data.cond_arg1_1].name
                if (comd_pull_1 != undefined) {
                    arg1_1 = `[${comd_pull_1}] #${default_data.cond_arg1_1}`
                } else {
                    arg1_1 = `[#${default_data.cond_arg1_1}] #${default_data.cond_arg1_1}`
                }
                const rank_pull_1 = CommandNames[default_data.cond_arg1_1] && CommandNames[default_data.cond_arg1_1].rank
                if (rank_pull_1 != undefined) {
                    tag_1 = `<${rank_pull_1}>`
                } else {
                    tag_1 = `unknown tag`
                }
            }

            if (default_data.cond_arg2_1 != 0) {
                //arg2_1 = `w/ Priority: ${default_data.cond_arg2_1}`
                arg2_1 = ""
            } else {
                arg2_1 = ""
            }

            cond_id_1_str = cond_id_1_str.replace(/\[arg1\]/gm, arg1_1)
                .replace(/\[arg2\]/gm, arg2_1)
                .replace(/\[tag\]/gm, tag_1)
                .replace(/\[rank\]/gm, rank_1)
        }
    }

    var is_buff = undefined
    var ailment_name = undefined
    var ailment_id = undefined
    var max_level = undefined
    var icon_display = undefined
    var ail_data = undefined

    if (default_data.cast != undefined) {
        ail_data = default_data.cast
        is_buff = default_data.cast.is_buff
        max_level = default_data.cast.max_level
        icon_display = default_data.cast.icon
        ailment_name = default_data.cast.name
        ailment_id = default_data.cast.id
    }

    if (passed_ailment != undefined) {
        ail_data = passed_ailment
        is_buff = passed_ailment.is_buff
        max_level = passed_ailment.max_level
        icon_display = passed_ailment.icon
        ailment_name = passed_ailment.name
        ailment_id = passed_ailment.id
    }

    icon_display = icon_display && max_level && max_level != 0 ? ailment_level_icon(ail_data,default_data.arg1) : icon_display

    var cast_str = `${default_data.cast_rate_ < 100 ? `(A ${default_data.cast_rate_}% chance) ` : ``}${is_buff == 0 ? "Inflicted " : "Granted "}${cond_str}${default_data.turn != -1 ? ` for` : ""}`

    var turns_str = `${default_data.turn != -1 ? ` ${default_data.turn} turn${default_data.turn > 1 ? "s" : ""}` : ""}${max_level && max_level != 0 ? ` at level ${default_data.arg1}` : ""}`

    var target_str = `${default_data.cast_target_ != 2 ? ` to ${cast_targets[default_data.cast_target_] && cast_targets[default_data.cast_target_].target_id}` : ""}`

    var require_str = `${cond_id_str != "" ? " - "+cond_id_str+"\n" : ""}${cond_id_1_str != "" ? " - "+cond_id_1_str+"\n" : ""}`

    return ({
        cast_str: cast_str,
        turns_str: turns_str,
        target_str: target_str,
        require_str: require_str
    })
}