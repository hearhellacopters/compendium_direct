export default function ailment_modify_trans(
    modify,
    master_index,
    ver
) {

    const modify_type_data = master_index.ailment_effect_id_index.modify_type
    const modify_require_data = master_index.ailment_effect_id_index.modify_require
    const CondData = master_index.cond
    const AilmentNames = master_index.ailments
    const command_group = master_index.command_group_full[ver]

    //mod str

    var modify_type_str = "Unknown Output"

    var mod_pull = modify_type_data[modify.modify_type] && modify_type_data[modify.modify_type].modify_type

    var modify_value_str = modify.modify_value

    if (mod_pull != undefined) {
        modify_type_str = mod_pull
    } else {
        modify_type_str = `Unknown Modify #${modify.modify_type}`
    }

    var mod_trans = modify_type_data[modify.modify_type] && modify_type_data[modify.modify_type].value_trans

    if (mod_trans == "ailment_id") {
        const ailment_pull = AilmentNames[modify.modify_value] || {}
        modify_value_str = `//${ailment_pull.icon}// [${ailment_pull.name}] #${modify.modify_value}`
    }

    modify_type_str = modify_type_str && modify_type_str.replace(/\[value\]/gm, modify_value_str)

    //requ str

    var requ_str = ""

    var requ_pull = modify_require_data[modify.require] && modify_require_data[modify.require].modify_require

    var requ_value_str = modify.require_value_1

    if (requ_pull != undefined && modify.require != 1) {
        requ_str = requ_pull
    } else {
        if (modify.require != 1) {
            requ_str = `Unknown require #${modify.require}`
        }
    }

    var requ_trans = modify_require_data[modify.require] && modify_require_data[modify.require].value_trans

    switch (requ_trans) {
        case "command_group":
            const group_pull = command_group[modify.require_value_1] && command_group[modify.require_value_1].unique
            if (group_pull == undefined) {
                requ_value_str = `unknown ailment group #${modify.require_value_1}`
            } else {
                requ_value_str = group_pull
            }
            break;
        case "cond":
            const cond_pull = CondData[modify.require_value_1] && CondData[modify.require_value_1].trans
            if (cond_pull == undefined) {
                requ_value_str = `cond #${modify.require_value_1}`
            } else {
                requ_value_str = cond_pull
            }
            break;
        default:
            break;
    }

    requ_str = requ_str && requ_str.replace(/\[value_1\]/gm, requ_value_str)

    //requ_1 str

    var requ_1_str = ""

    var requ_1_pull = modify_require_data[modify.require_1] && modify_require_data[modify.require_1].modify_require

    if (requ_1_pull != undefined && modify.require_1 != 1) {
        requ_1_str = requ_1_pull
    } else {
        if (modify.require_1 != 1) {
            requ_1_str = `Unknown require_1 #${modify.require_1}`
        }
    }

    var requ_1_trans = modify_require_data[modify.require_1] && modify_require_data[modify.require_1].value_trans

    var requ_1_value_str = modify.require_value_1_1

    switch (requ_1_trans) {
        case "command_group":
            const group_pull_1 = command_group[modify.require_value_1_1] && command_group[modify.require_value_1_1].unique
            if (group_pull_1 == undefined) {
                requ_1_value_str = `unknown ailment group #${modify.require_value_1_1}`
            } else {
                requ_1_value_str = group_pull_1
            }
            break;
        case "cond":
            const cond_pull_1 = CondData[modify.require_value_1_1] && CondData[modify.require_value_1_1].trans
            if (cond_pull_1 == undefined) {
                requ_1_value_str = `cond #${modify.require_value_1_1}`
            } else {
                requ_1_value_str = cond_pull_1
            }
            break;
        default:
            break;
    }

    requ_1_str = requ_1_str && requ_1_str.replace(/\[value_1\]/gm, requ_1_value_str)

    const full_req_str = requ_1_str != "" ? `${requ_str} & ${requ_1_str}` : requ_str

    return (
        `\xa0┬ ${full_req_str}\n\xa0└─ ${modify_type_str}\n`
    )
    
}