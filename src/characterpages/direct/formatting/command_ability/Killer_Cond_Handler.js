const Killer_Cond_Handler =(
    kcon,
    karg,
    keff,
    sarg,

    killer_cond,
    killer_cond_1,
    AilmentNames
)=>{

    var final_str = ""

    if(kcon != -1){
        const killer_pull = killer_cond[kcon] && killer_cond[kcon].killer_cond

    const value_trans = killer_cond[kcon] && killer_cond[kcon].value_trans

    var karg_trans = karg

    if(killer_pull != undefined){
        if(value_trans == "killer_cond_1"){
            karg_trans = killer_cond_1[karg] && killer_cond_1[karg].killer_cond_1
        }
        if(value_trans == "afflicted_debuffed"){
            if(karg == -1){
                karg_trans = "debuffed"
            } else {
                const ailmentpull = AilmentNames[karg] && AilmentNames[karg].name
                karg_trans = `[${ailmentpull}] inflicted`
            }
        }
        final_str = killer_pull.replace(/\[karg\]/gm,karg_trans)
        .replace(/\[keff\]/gm,keff)
        .replace(/\[sarg\]/gm,sarg)
    }

    }

    return(
        final_str
    )
}
export default Killer_Cond_Handler