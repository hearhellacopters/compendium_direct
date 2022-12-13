import cut_1 from "../cut_1_handler"
import split_by_2 from "../split_by_2_handler"
import val_edit_type_handler from '../val_edit_type_handler'

const Ailment_Cond_Handler = (
    acond,
    acarg,

    master_index,
    ver,

) => {

    const ailment_cond = master_index.command_data_trans.ailment_cond
    const ailment_cond_14 = master_index.command_data_trans.ailment_cond_14
    const AilmentNames = master_index.ailments
    const ailment_group = master_index.ailment_group_full[ver]
    const CondData = master_index.cond

    var final_str = undefined

    if (acond != 1 && acond != 13 && acond != -1) {
        var con_pull = ailment_cond[acond] && ailment_cond[acond].ailment_cond
        const value_trans = ailment_cond[acond] && ailment_cond[acond].value_trans

        if (value_trans == "ailment_cond_14") {
            const pull14 = ailment_cond_14[acarg] && ailment_cond_14[acarg].ailment_cond_14
            if (pull14 != undefined) {
                con_pull = con_pull.replace(/\[value1\]/gm, pull14)
            } else {
                con_pull = con_pull.replace(/\[value1\]/gm, `weapon #${acarg}`)
            }
        }

        if (value_trans == "ailment_group_id_1") {
            const pullgroup = ailment_group[acarg] && ailment_group[acarg].unique
            if (pullgroup != undefined) {
                con_pull = con_pull.replace(/\[value1\]/gm, pullgroup)
            } else {
                con_pull = con_pull.replace(/\[value1\]/gm, `ailment group #${acarg}`)
            }
        }

        if (value_trans == "cond_data") {
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
        }

        if (value_trans == "ailment_id_4") {
            const vale_1 = cut_1(1, acarg)
            const ailmentname = AilmentNames[vale_1] && AilmentNames[vale_1].name
            const vale_2 = cut_1(2, acarg)
            con_pull = con_pull.replace(/\[value2\]/gm, ailmentname == undefined ? `ailment #${vale_1}` : `[${ailmentname}] #${vale_1}`).replace(/\[value1\]/gm, vale_2)
        }

        if (value_trans == "split_by_2") {
            const cut_1 = split_by_2(4, acarg)
            const cut_2 = split_by_2(5, acarg)
            const testfor100 = parseInt(acarg.toString().substring(2, 4));
            con_pull = con_pull.replace(/\[value1\]/gm, cut_1).replace(/\[value2\]/gm, testfor100 == "00" ? 100 : cut_2)
        }

        if (value_trans == "split_3") {
            const trans_1 = val_edit_type_handler(3, acarg)
            const trans_2 = val_edit_type_handler(4, acarg)
            con_pull = con_pull.replace(/\[value2\]/gm, trans_1).replace(/\[value3\]/gm, trans_2)
        }

        final_str = con_pull == undefined ? undefined : con_pull.replace(/\[value1\]/gm, acarg)
    }

    return (
        final_str
    )
}
export default Ailment_Cond_Handler