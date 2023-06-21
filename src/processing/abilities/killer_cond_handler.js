export default function killer_cond_handler(
    kcon,
    karg,
    keff,
    sarg,

    master_index,
    ver,
){

    const killer_cond = master_index.command_data_trans.killer_cond
    const killer_cond_1 = master_index.command_data_trans.killer_cond_1
    const AilmentNames = master_index.ailments

    var final_str = ""

    if (kcon != -1) {
        const killer_pull = killer_cond[kcon] && killer_cond[kcon].killer_cond

        const value_trans = killer_cond[kcon] && killer_cond[kcon].value_trans

        var karg_trans = karg

        if (killer_pull != undefined) {
            if (value_trans == "killer_cond_1") {
                karg_trans = killer_cond_1[karg] && killer_cond_1[karg].killer_cond_1
            }
            if (value_trans == "afflicted_debuffed") {
                if (karg == -1) {
                    karg_trans = "debuffed"
                } else {
                    const ailmentpull = AilmentNames[karg] && AilmentNames[karg].name
                    karg_trans = `[${ailmentpull}] inflicted`
                }
            }
            final_str = killer_pull.replace(/\[karg\]/gm, karg_trans)
                .replace(/\[keff\]/gm, keff)
                .replace(/\[sarg\]/gm, sarg)
        }

    } else {
        final_str = undefined
    }

    return (
        final_str
    )
}