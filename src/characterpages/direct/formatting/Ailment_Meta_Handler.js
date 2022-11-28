const Ailment_Meta_Handler = (
    icon_type,
    sp_disp_type,
    global_limit, 
    life_type, 
    extendable, 
    onion, 
    b_life, 
    b_active, 
    max_level, 
    life_max_, 
    group_id,

    master_index,
    highestlvl
    ) =>{

    const life_type_data = master_index.ailment_effect_id_index.life_type
    var ishidden= ""
    var only1 = ""
    var life = ""
    var extend = ""
    var on = ""
    var blif = ""
    var bact = ""
    var mlevel = ""
    var maxlife = ""
    var group = ""
    if(icon_type == 0){
        ishidden = "\n*Hidden"
    }
    if(icon_type == 14 && (sp_disp_type == 0 || sp_disp_type == undefined)){
        ishidden = "\n*Hidden"
    }
    if(global_limit != undefined && global_limit != 0){
        only1 = "\n*Only one can be active"
    }
    const life_pull = life_type_data[life_type] && life_type_data[life_type].life_type
    if(life_pull != undefined){
        life = `\n${life_pull}`
    }
    if(extendable == 0){
        extend = "\n*Can not be extended"
    }
    //if(onion && onion != -1){
    //    on = "\n*Onion Buff"
    //}
    if(b_life == 0){
        blif = "\n*Decreases in BURST mode"
    }
    if(b_active == 0){
        bact = "\n*Not active in BURST mode"
    }
    if(max_level != undefined && max_level != 0){
        mlevel = `\n*Max Level: ${highestlvl}`
    }
    if(life_max_ != undefined && life_max_ != -1){
        maxlife = `\n*Max Turns: ${life_max_}`
    }
    if(group_id != undefined && group_id != 0){
        group = `\n*Group: ${group_id}`
    }
  return `${group}${ishidden}${only1}${life}${extend}${on}${blif}${bact}${mlevel}${maxlife}`
}

export default Ailment_Meta_Handler