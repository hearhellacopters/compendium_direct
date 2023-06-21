export default function killer_id_handler(
    kid,
    sarg,
    keff,

    master_index,
    ver,
){

    const killer_type = master_index.command_data_trans.killer_type

    var final_str = ""

    if (kid != -1) {
        const killer_type_pull = killer_type[kid] && killer_type[kid].killer_type

        if (killer_type_pull != undefined) {
            final_str = killer_type_pull.replace(/\[sarg\]/gm, sarg)
                .replace(/\[keff\]/gm, keff)
        }
    } else {
        final_str = undefined
    }

    return (
        final_str
    )
}