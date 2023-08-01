import ailment_split_by_2 from "../ailment/ailment_split_by_2.js"
import ailment_val_edit_type_handler from '../ailment/ailment_val_edit_type_handler.js'
import ailment_level_icon from "../ailment/ailment_level_icon.js"

export default function ailment_cond_trans(
    acond,
    acarg,
    master_index,
    ver,
){

    const ailment_cond = master_index.command_data_trans.ailment_cond
    const ailment_cond_14 = master_index.command_data_trans.ailment_cond_14
    const AilmentNames = master_index.ailments
    const ailment_group = master_index.ailment_group_full[ver]
    const CondData = master_index.cond

    var final_str = undefined

    if (acond != 1 && acond != 13 && acond != -1) {
        var con_pull = ailment_cond[acond] && ailment_cond[acond].ailment_cond
        const value_trans = ailment_cond[acond] && ailment_cond[acond].value_trans

        switch (value_trans) {
            case "ailment_cond_14":
                const pull14 = ailment_cond_14[acarg] && ailment_cond_14[acarg].ailment_cond_14
                if (pull14 != undefined) {
                    con_pull = con_pull.replace(/\[value1\]/gm, pull14)
                } else {
                    con_pull = con_pull.replace(/\[value1\]/gm, `weapon #${acarg}`)
                }
                break;
            case "ailment_group_id_1":
                const pullgroup = ailment_group[acarg] && ailment_group[acarg].unique
                if (pullgroup != undefined) {
                    con_pull = con_pull.replace(/\[value1\]/gm, pullgroup)
                } else {
                    con_pull = con_pull.replace(/\[value1\]/gm, `ailment group #${acarg}`)
                }
                break;
            case "cond_data":
                var cond_pulled = CondData[acarg] && CondData[acarg].trans
                if (ver == "GL") {
                    if (cond_pulled && cond_pulled.GLtrans != undefined) {
                        cond_pulled = CondData[acarg].GLtrans
                    }
                }
                if (cond_pulled != undefined) {
                    con_pull = con_pull.replace(/\[value1\]/gm, cond_pulled)
                } else {
                    con_pull = con_pull.replace(/\[value1\]/gm, `cond #${acarg}`)
                }
                break;
            case "ailment_id_4":
                const vale_1 = Math.floor((acarg % 100000) / 10) 
                const ailment = AilmentNames[vale_1]
                const vale_2 = Math.floor(acarg % 10)
                const ailmenticon = ailment_level_icon(ailment,vale_2)
                con_pull = con_pull.replace(/\[value2\]/gm, ailment == undefined ? `ailment #${vale_1}` : `//${ailmenticon}// [${ailment.name}] #${vale_1}`).replace(/\[value1\]/gm, vale_2)
                break;
            case "split_by_2":
                const cut_1 = ailment_split_by_2(4, acarg)
                const cut_2 = ailment_split_by_2(5, acarg)
                con_pull = con_pull.replace(/\[value1\]/gm, cut_1 == 0 ? 100 : cut_1).replace(/\[value2\]/gm, cut_2 == 0 ? 100 : cut_2)
                break;
            case "split_3":
                const trans_1 = ailment_val_edit_type_handler(3, acarg)
                const trans_2 = ailment_val_edit_type_handler(4, acarg)
                con_pull = con_pull.replace(/\[value2\]/gm, trans_1).replace(/\[value3\]/gm, trans_2)
                break;
            default:
                break;
        }

        final_str = con_pull == undefined ? undefined : con_pull.replace(/\[value1\]/gm, acarg)
    }

    return (
        final_str
    )
}