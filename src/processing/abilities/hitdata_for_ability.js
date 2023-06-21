import hitdata_handler from "./hitdata_handler.js"

export default function hitdata_for_ability(
    ability,
    master_index,
    ver,
    meta
){

    const hit_effect_id = master_index.hit_trans_data.hit_effect_id

    const caller = {
        hit_data_id:    ability.hit_data_pars.hit_1,
        hit_data_id_1:  ability.hit_data_pars.hit_2,
        hit_data_id_2:  ability.hit_data_pars.hit_3,
        hit_data_id_3:  ability.hit_data_pars.hit_4,
        hit_data_id_4:  ability.hit_data_pars.hit_5,
        hit_data_id_5:  ability.hit_data_pars.hit_6,
        hit_data_id_6:  ability.hit_data_pars.hit_7,
        hit_data_id_7:  ability.hit_data_pars.hit_8,
        hit_data_id_8:  ability.hit_data_pars.hit_9,
        hit_data_id_9:  ability.hit_data_pars.hit_10,
        hit_data_id_10: ability.hit_data_pars.hit_11,
        hit_data_id_11: ability.hit_data_pars.hit_12,
        hit_data_id_12: ability.hit_data_pars.hit_13,
        hit_data_id_13: ability.hit_data_pars.hit_14,
        hit_data_id_14: ability.hit_data_pars.hit_15,
        hit_data_id_15: ability.hit_data_pars.hit_16,
        hit_data_id_16: ability.hit_data_pars.hit_17,
        hit_data_id_17: ability.hit_data_pars.hit_18,
        hit_data_id_18: ability.hit_data_pars.hit_19,
        hit_data_id_19: ability.hit_data_pars.hit_20,
        hit_data_id_20: ability.hit_data_pars.hit_21,
        hit_data_id_21: ability.hit_data_pars.hit_22,
        hit_data_id_22: ability.hit_data_pars.hit_23,
        hit_data_id_23: ability.hit_data_pars.hit_24,
        hit_data_id_24: ability.hit_data_pars.hit_25,
        hit_data_id_25: ability.hit_data_pars.hit_26,
        hit_data_id_26: ability.hit_data_pars.hit_27,
        hit_data_id_27: ability.hit_data_pars.hit_28,
        hit_data_id_28: ability.hit_data_pars.hit_29,
        hit_data_id_29: ability.hit_data_pars.hit_30,
        hit_data_id_30: ability.hit_data_pars.hit_31,
        hit_data_id_31: ability.hit_data_pars.hit_32,
        hit_data_id_32: ability.hit_data_pars.hit_33,
        hit_data_id_33: ability.hit_data_pars.hit_34,
        hit_data_id_34: ability.hit_data_pars.hit_35,
        hit_data_id_35: ability.hit_data_pars.hit_36,
        hit_data_id_36: ability.hit_data_pars.hit_37,
        hit_data_id_37: ability.hit_data_pars.hit_38,
        hit_data_id_38: ability.hit_data_pars.hit_39,
        hit_data_id_39: ability.hit_data_pars.hit_40
    }

    const faf =    meta && meta.faf
    const bdlur =  meta && meta.bdlur
    const mblur =  meta && meta.mblur
    const kcon =   meta && meta.kcon
    const kcon_1 = meta && meta.kcon_1
    const kid =    meta && meta.kid
    const kid_1 =  meta && meta.kid_1

    const power = ability.power

    const check_hidden = (id) => {
        if (id == undefined) {
            return false
        }
        if (hit_effect_id[id] && hit_effect_id[id].hidden == true) {
            return true
        } else {
            return false
        }
    }

    var after_each_except_last;

    const hitreturn = {
        hit_pars: {}
    }
    var hit_counter = 0
    for (let index = 0; index < 40; index++) {
        const hit_data = caller[`hit_data_id${index == 0 ? "" : `_${index}`}`]
        if(hit_data != undefined && hit_data.effect_id == 279
            ){
            after_each_except_last = {
                a_target: hit_data.a_target,
                m_nARG: hit_data.m_nARG,
                overflow: hit_data.overflow
            }
        }
        if(hit_data != undefined && after_each_except_last != undefined){
            Object.assign(hit_data,{after_each_except_last: after_each_except_last})
        }
        if (hit_data == undefined ||
            hit_data.hitdata_id == -1 ||
            hit_data.hitdata_id == 518 || //blanks
            hit_data.effect_id == 279 || // after_each_except_last
            (hit_data.effect_id == 37 && hit_data.m_nARG_4 == 2809) || //hide models
            (hit_data.effect_id == 275 && hit_data.m_nARG == 2771)  //casts hide models
            || check_hidden(hit_data && hit_data.effect_id)
        ) {
            //do nothing
        } else {
            var hit_data_id_pars = ""
            if (hit_data == undefined) {
                hit_counter = hit_counter + 1
                hit_data_id_pars = {
                    atk_str: `REMOVED HIT #${hit_data.hitdata_id}`,
                    id: hit_data.hitdata_id,
                    hit_num: hit_counter
                }
            } else {
                hit_counter = hit_counter + 1
                hit_data_id_pars = hitdata_handler(
                    hit_data,

                    master_index,
                    ver,

                    faf,
                    kcon,
                    kcon_1,
                    kid,
                    kid_1,
                    bdlur,
                    mblur,

                    power,
                    hit_counter
                )
            }
            if (hit_data && hit_data.effect_id == 159 || //159_ABILITY_TEXT_LINE
                hit_data && hit_data.effect_id == 258 //258_RAINBOW_TEXT_LINE
            ) {
                hit_counter = hit_counter - 1
                Object.assign(hit_data_id_pars, { hit_num: `B${hit_data.m_nARG}` })
                Object.assign(hitreturn.hit_pars, { [`B${hit_data.m_nARG}`]: hit_data_id_pars == "" ? undefined : hit_data_id_pars })
            } else if(hit_data && hit_data.effect_id == 110 && hit_data.type_id == 6){
                hit_counter = hit_counter - 1
                Object.assign(hit_data_id_pars, { hit_num: `S1` })
                Object.assign(hitreturn.hit_pars, { [`S1`]: hit_data_id_pars == "" ? undefined : hit_data_id_pars })
            } else {
                Object.assign(hitreturn.hit_pars, { [`hit_${hit_counter}`]: hit_data_id_pars == "" ? undefined : hit_data_id_pars })
            }
        }

    }

    return (
        hitreturn
    )
}