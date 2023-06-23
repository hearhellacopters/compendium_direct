export default function ailment_combination_trans(
    components,
    master_index,
    ver,
    base_id
){

    const AilmentNames = master_index.ailments

    var master_ailment = AilmentNames[components.ailment_id] 

    if (master_ailment == undefined) {
        master_ailment = components.ailment_id
    }
    var component_id = components.component_id == -1 ? "" : AilmentNames[components.component_id] 
    var component_id_1 = components.component_id_1 == -1 ? "" : AilmentNames[components.component_id_1]
    var component_id_2 = components.component_id_2 == -1 ? "" : AilmentNames[components.component_id_2]
    var component_id_3 = components.component_id_3 == -1 ? "" : AilmentNames[components.component_id_3]
    var component_id_4 = components.component_id_4 == -1 ? "" : AilmentNames[components.component_id_4]

    var component_id_str = component_id == "" ? "" : ` //${component_id.icon}// [${component_id.name}] #${components.component_id}`
    var component_id_1_str = component_id_1 == "" ? "" : ` //${component_id_1.icon}// [${component_id_1.name}] #${components.component_id_1}`
    var component_id_2_str = component_id_2 == "" ? "" : ` //${component_id_2.icon}// [${component_id_2.name}] #${components.component_id_2}`
    var component_id_3_str = component_id_3 == "" ? "" : ` //${component_id_3.icon}// [${component_id_3.name}] #${components.component_id_3}`
    var component_id_4_str = component_id_4 == "" ? "" : ` //${component_id_4.icon}// [${component_id_4.name}] #${components.component_id_4}`
    const passives = []

    if (components.component_id != components.ailment_id && component_id_str != "" && base_id != components.component_id) {
        passives.push(component_id_str)
    }
    if (component_id_1_str != "" && base_id != components.component_id_1) {
        passives.push(component_id_1_str)
    }
    if (component_id_2_str != "" && base_id != components.component_id_2) {
        passives.push(component_id_2_str)
    }
    if (component_id_3_str != "" && base_id != components.component_id_3) {
        passives.push(component_id_3_str)
    }
    if (component_id_4_str != "" && base_id != components.component_id_4) {
        passives.push(component_id_4_str)
    }
    var fullstr = `${passives.map(self => self)}`
    var display_str = ""
    if (base_id == components.ailment_id) {
        display_str = `*Displayed while${fullstr} ${passives.length > 1 ? "are" : "is"} active`
    } else {
        display_str = `*Displays //${master_ailment.icon}// [${master_ailment.name}] #${components.ailment_id}${passives.length != 0 ? " while" : ""}${fullstr}${passives.length != 1 ? passives.length == 0 ? " when" : " are" : " is"} active`
    }

    return (
        display_str != "" ? display_str+"\n": ""
    )
    
}