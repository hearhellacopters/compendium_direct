export default function ailment_meta_handler(
    ailment_data,
    master_index,
    highestlvl
){

    const icon_type = ailment_data.icon_type
    const sp_disp_type = ailment_data.sp_disp_type
    const global_limit = ailment_data.global_limit
    const life_type = ailment_data.life_type
    const extendable = ailment_data.extendable
    const onion = ailment_data.onion
    const b_life = ailment_data.b_life
    const b_active = ailment_data.b_active
    const max_level = ailment_data.max_level
    const life_max_ = ailment_data.life_max_
    const group_id = ailment_data.group_id

    const life_type_data = master_index.ailment_effect_id_index.life_type
    var ishidden = ""
    var only1 = ""
    var life = ""
    var extend = ""
    var on = ""
    var blif = ""
    var bact = ""
    var mlevel = ""
    var maxlife = ""
    var group = ""
    if (icon_type == 0) {
        ishidden = "*Hidden\n"
    }
    if (icon_type == 14 && (sp_disp_type == 0 || sp_disp_type == undefined)) {
        ishidden = "*Hidden\n"
    }
    if (global_limit != undefined && global_limit != 0) {
        only1 = "*Only one can be active\n"
    }
    const life_pull = life_type_data[life_type] && life_type_data[life_type].life_type
    if (life_pull != undefined) {
        life = `${life_pull}\n`
    }
    if (extendable == 0) {
        extend = "*Can not be extended\n"
    }
    //if(onion && onion != -1){
    //    on = "*Onion Buff\n"
    //}
    if (b_life == 0) {
        blif = "*Decreases in BURST mode\n"
    }
    if (b_active == 0) {
        bact = "*Not active in BURST mode\n"
    }
    if (max_level != undefined && max_level != 0) {
        mlevel = `*Max Level: ${highestlvl}\n`
    }
    if (life_max_ != undefined && life_max_ != -1) {
        maxlife = `*Max Turns: ${life_max_}\n`
    }
    if (group_id != undefined && group_id != 0) {
        group = `*Group: ${group_id}\n`
    }
    return `${group}${ishidden}${only1}${life}${extend}${on}${blif}${bact}${mlevel}${maxlife}`
}