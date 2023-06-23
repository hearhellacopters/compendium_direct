import require_trans from './require_trans.js'

export default function passive_link_dif(
    link_effect,
    master_index,
    ver
){
    const val_edit_type = master_index.ailment_effect_id_index.val_edit_type
    const group_id = master_index.ailment_effect_id_index.group_id

    const AilmentNames = master_index.ailments
    const CondData = master_index.cond
    const passive_target = master_index.passive_effects.passive_target

    var require_value1 = link_effect.require_value1
    var require_value2 = link_effect.require_value2
    var require_value3 = link_effect.require_value3

    var require_value1_1 = link_effect.require_value1_1
    var require_value2_1 = link_effect.require_value2_1
    var require_value3_1 = link_effect.require_value3_1

    var value_display = undefined

    var require_ = undefined
    var require__1 = undefined

    if (link_effect.require_id != undefined) {
        require_ = require_trans(
            link_effect.require_id,
            link_effect.require_target,
            require_value1,
            require_value2,
            require_value3,

            master_index,
            ver
        )
    }

    if (link_effect.cond_id != undefined) {
        const puller = CondData[link_effect.cond_id] && CondData[link_effect.cond_id].trans
        const target = passive_target[link_effect.require_target] && passive_target[link_effect.require_target].passive_target
        if (puller != undefined) {
            require_ = `${target}: ${puller}`
        } else {
            require_ = `cond_data #${link_effect.cond_id}`
        }
    }

    if (link_effect.require_id_1 != undefined) {
        require__1 = require_trans(
            link_effect.require_id_1,
            link_effect.require_target_1,
            require_value1_1,
            require_value2_1,
            require_value3_1,

            master_index,
            ver
        )
    }

    if (link_effect.cond_id_1 != undefined) {
        const puller2 = CondData[link_effect.cond_id_1] && CondData[link_effect.cond_id_1].trans
        const target2 = passive_target[link_effect.require_target_1] && passive_target[link_effect.require_target_1].passive_target
        if (puller2 != undefined) {
            require__1 = `${target2}: ${puller2}`
        } else {
            require__1 = `cond_data #${link_effect.cond_id_1}`
        }
    }

    var effect_ = undefined

    if (link_effect.change_value > 0) {
        effect_ = `+${link_effect.change_value}%`
    } else {
        effect_ = `-${Math.abs(link_effect.change_value)}%`
    }

    if (link_effect.val_edit_type != undefined) {
        const puller3 = val_edit_type[link_effect.val_edit_type] && val_edit_type[link_effect.val_edit_type]
        if (puller3.val_edit_type != undefined) {
            if (puller3.modify_value != undefined) {

                if (puller3.modify_value == "group_id") {
                    const puller4 = group_id[link_effect.modify_value] && group_id[link_effect.modify_value].group_id
                    if (puller4 != undefined) {
                        value_display = puller3.val_edit_type.replace(/\[modify_value\]/gm, puller4)
                    } else {
                        value_display = puller3.val_edit_type.replace(/\[modify_value\]/gm, `[unknown group#${link_effect.modify_value}]`)
                    }
                }

                if (puller3.modify_value == "ailment_id") {
                    const puller5 = AilmentNames[link_effect.modify_value] && AilmentNames[link_effect.modify_value].name
                    if (puller5 != undefined) {
                        value_display = puller3.val_edit_type.replace(/\[modify_value\]/gm, `[${puller5}] #${link_effect.modify_value}`)
                    } else {
                        value_display = puller3.val_edit_type.replace(/\[modify_value\]/gm, `[unknown ailment#${link_effect.modify_value}]`)
                    }
                }

            } else {
                value_display = puller3.val_edit_type
            }
        } else {
            value_display = `val_edit_type #${link_effect.val_edit_typ}`
        }
    }

    const fliped = link_effect.require_id_1 == 131 || link_effect.require_id_1 == 130 ? true : false
    const final_text = []
    if(effect_ != undefined){
        final_text.push(effect_)
    }
    if(value_display != undefined){
        final_text.push(` (${value_display})`)
    }
    if(fliped == true){
        final_text.push(`${require__1}, `)
    }
    if(require_ != undefined){
        final_text.push(require_ + " ")
    }
    if(require__1 != undefined && require_ != undefined && fliped != true){
        final_text.push("and ")
    }
    if(require__1 != undefined && fliped != true){
        final_text.push(require__1)
    }
    if(link_effect.add_once_in_turn != undefined){
        final_text.push("(once per turn)")
    }
    var final_str = undefined
    if(final_text.length != 0){
        final_str = final_text.join("")
    }
    return final_str
}