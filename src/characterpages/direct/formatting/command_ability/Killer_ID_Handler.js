const Killer_ID_Handler =(
    kid,
    sarg,
    keff,

    master_index,
    ver,
)=>{

    const killer_type = master_index.command_data_trans.killer_type

    var final_str = ""

    if(kid != -1){
        const killer_type_pull = killer_type[kid] && killer_type[kid].killer_type

    if(killer_type_pull != undefined){
        final_str = killer_type_pull.replace(/\[sarg\]/gm,sarg)
        .replace(/\[keff\]/gm,keff)
    }
    }

    return(
        final_str
    )
}
export default Killer_ID_Handler