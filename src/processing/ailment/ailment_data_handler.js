import ailment_slider_handler from './ailment_slider_handler.js'
import ailment_effect_trans from './ailment_effect_trans.js'
import ailment_field_effect_trans from './ailment_field_effect_trans.js'
import ailment_meta_handler from './ailment_meta_handler.js'
import ability_rank_trans from '../abilities/ability_rank_trans.js'

export default function ailment_data_handler(
    ailment_data,
    rank,
    arg1,
    arg2,
    alt_rank,
    alt_aug1,
    alt_aug2,
    ver,
    master_index,
    castlocation,
    turns,
    rank_tag
){
    const cast_targets = master_index.command_data_trans.cast_target

    var cast_target = undefined
    if (ailment_data.atarg != undefined && ailment_data.atarg != 2) {
        cast_target = cast_targets[ailment_data.atarg] && cast_targets[ailment_data.atarg].target_id
    }

    var highestlvl = 0;
   
    if (ailment_data.max_level >= 10) {
        highestlvl = 10
    }
    if (ailment_data.max_level <= 10 && ailment_data.max_level != 0) {
        highestlvl = ailment_data.max_level
    }
    if (ailment_data.max_level == 0) {
        highestlvl = 0
    }
    if (ailment_data.max_level_overide != undefined) {
        highestlvl = ailment_data.max_level_overide
    }
    if (ailment_data.max_level == -1 && arg2 != undefined) {
        highestlvl = arg2
        Object.assign(ailment_data, {max_level:arg2})
    }
    if (ailment_data.max_level == -1 && arg2 == undefined) {
        highestlvl = 10
        Object.assign(ailment_data, {max_level:10})
    }

    const defaultrank = castlocation == false ? 1 : rank

    const defaultlevel = highestlvl != 0 ? arg1 : undefined

    const turns_set = Math.max(ailment_data && ailment_data.alife != undefined ? ailment_data.alife : turns || 1, 1)

    const effect_value_type_field = ailment_data.field && ailment_data.field.map(self => {
        return self.effect_id && self.effect_id.effect_value_type
    })

    const val_edit_type_field = ailment_data.field && ailment_data.field.map(self => {
        return self.effect_id && self.effect_id.val_edit_type
    })

    const sliders = ailment_slider_handler(
        ailment_data,
        effect_value_type_field,
        val_edit_type_field,
        master_index
        );

    const ailment_pars = {}

    for (var index = 0; index <10; index++) {
        const ending = index == 0 ? "" : `_${index}`
        const ail_data = ailment_data[`effect_id${ending}`] &&
        ailment_effect_trans(
                ailment_data.id,
                ailment_data[`effect_id${ending}`],
                ailment_data[`val_type${ending}`],
                ailment_data[`val_specify${ending}`],
                ailment_data[`val_edit_type${ending}`],
                ailment_data[`cond_id${ending}`],
                ailment_data[`rank_table${ending}`],
                ailment_data.is_buff,
                //effect#
                index,
                master_index,
                ver,
                //aug1&2
                arg1,
                arg2,
                highestlvl,
                rank,
                alt_rank,
                alt_aug1,
                alt_aug2,
                undefined,
            )
        if (index == 4 && !(ailment_data.effect_id_4 == 60 && ailment_data.cond_id_4 == -1)) {
            if (ail_data != undefined) {
                Object.assign(ailment_pars, { [`effect_id_${index}`]: ail_data })
            }
        }
        if (index != 4) {
            if (ail_data != undefined) {
                Object.assign(ailment_pars, { [`effect_id_${index}`]: ail_data })
            }
        }
    }

    if (ailment_data.field != undefined) {
        Object.assign(ailment_pars, { field: [] })
        ailment_data.field.forEach(self => {
            const field_data = ailment_field_effect_trans(
                self,
                false, //Single

                ailment_data.is_buff,
                arg1,
                arg2,
                highestlvl,
                rank,
                alt_rank,
                alt_aug1,
                alt_aug2,
                ver,
                ailment_data,
                master_index
            )
            ailment_pars.field.push(field_data)
        })
    }

    const metadata = ailment_meta_handler(
        ailment_data,
        master_index,
        highestlvl
    )

    const cast_title_str = `${ailment_data.alife != -1 ? `${ailment_data.is_buff == 0 ? "Inflicted ":"Granted "}for ` : `${ailment_data.is_buff == 0 ? "Inflicted ":"Granted "}${defaultlevel == undefined ? `from `:""}`}`
    const cast_turns_str = `${ailment_data.alife != -1 ? `${ailment_data.alife} turn${ailment_data.alife != 1 ? "s " : " "}` : ""}${defaultlevel!=undefined ? `at level ${defaultlevel} `:""}`
    const cast_target_str = `${ailment_data.alife != -1 ? `from ` : ""}${rank_tag != undefined ? `<${ability_rank_trans(rank_tag)}>` : ""} [${ailment_data.ability_namegl == undefined ? ailment_data.ability_name : ailment_data.ability_namegl}] #${ailment_data.command_id}${cast_target == undefined ? "" : ` to ${cast_target}`}`

    return ({
        highestlvl: highestlvl,
        defaultrank: defaultrank,
        turns_set: turns_set,
        sliders: sliders,
        ailment_pars: ailment_pars,
        metadata: metadata,
        cast_title_str: cast_title_str,
        cast_turns_str: cast_turns_str,
        cast_target_str: cast_target_str,
    })
}