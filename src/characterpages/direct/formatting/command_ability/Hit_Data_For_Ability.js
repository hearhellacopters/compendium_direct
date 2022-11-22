import hit_data_handler from "../hit_data_handler"

const Hit_Data_For_Ability =(
    ability,

    hit_data_id,
    hit_data_id_1,
    hit_data_id_2,
    hit_data_id_3,
    hit_data_id_4,
    hit_data_id_5,
    hit_data_id_6,
    hit_data_id_7,
    hit_data_id_8,
    hit_data_id_9,
    hit_data_id_10,
    hit_data_id_11,
    hit_data_id_12,
    hit_data_id_13,
    hit_data_id_14,
    hit_data_id_15,
    hit_data_id_16,
    hit_data_id_17,
    hit_data_id_18,
    hit_data_id_19,
    hit_data_id_20,
    hit_data_id_21,
    hit_data_id_22,
    hit_data_id_23,
    hit_data_id_24,
    hit_data_id_25,
    hit_data_id_26,
    hit_data_id_27,
    hit_data_id_28,
    hit_data_id_29,
    hit_data_id_30,
    hit_data_id_31,
    hit_data_id_32,
    hit_data_id_33,
    hit_data_id_34,
    hit_data_id_35,
    hit_data_id_36,
    hit_data_id_37,
    hit_data_id_38,
    hit_data_id_39,

    hit_effect_id,
    ability_target_id,
    type_id,
    attack_type_id,
    effect_value_type_id,
    CommandNames,
    AilmentNames,
    ailment_group,
    command_group,
    enemy_resist,
    element_bit_,

    faf,
    bdlur,
    mblur
)=>{

    const caller = {
        hit_data_id: hit_data_id,
        hit_data_id_1: hit_data_id_1,
        hit_data_id_2: hit_data_id_2,
        hit_data_id_3: hit_data_id_3,
        hit_data_id_4: hit_data_id_4,
        hit_data_id_5: hit_data_id_5,
        hit_data_id_6: hit_data_id_6,
        hit_data_id_7: hit_data_id_7,
        hit_data_id_8: hit_data_id_8,
        hit_data_id_9: hit_data_id_9,
        hit_data_id_10: hit_data_id_10,
        hit_data_id_11: hit_data_id_11,
        hit_data_id_12: hit_data_id_12,
        hit_data_id_13: hit_data_id_13,
        hit_data_id_14: hit_data_id_14,
        hit_data_id_15: hit_data_id_15,
        hit_data_id_16: hit_data_id_16,
        hit_data_id_17: hit_data_id_17,
        hit_data_id_18: hit_data_id_18,
        hit_data_id_19: hit_data_id_19,
        hit_data_id_20: hit_data_id_20,
        hit_data_id_21: hit_data_id_21,
        hit_data_id_22: hit_data_id_22,
        hit_data_id_23: hit_data_id_23,
        hit_data_id_24: hit_data_id_24,
        hit_data_id_25: hit_data_id_25,
        hit_data_id_26: hit_data_id_26,
        hit_data_id_27: hit_data_id_27,
        hit_data_id_28: hit_data_id_28,
        hit_data_id_29: hit_data_id_29,
        hit_data_id_30: hit_data_id_30,
        hit_data_id_31: hit_data_id_31,
        hit_data_id_32: hit_data_id_32,
        hit_data_id_33: hit_data_id_33,
        hit_data_id_34: hit_data_id_34,
        hit_data_id_35: hit_data_id_35,
        hit_data_id_36: hit_data_id_36,
        hit_data_id_37: hit_data_id_37,
        hit_data_id_38: hit_data_id_38,
        hit_data_id_39: hit_data_id_39
    }

    const check_hidden=(id)=>{
        if(id == undefined){
            return true
        }
        if(hit_effect_id[id] && hit_effect_id[id].hidden == true){
            return false
        } else {
            return true
        }
    }

    const hitreturn = {
        hit_pars:{}
    }
    var hit_counter = 0
    for (let index = 0; index < 40; index++) {
        const hit_data = caller[`hit_data_id${index == 0 ? "" : `_${index}`}`]
        if( hit_data != undefined && 
            hit_data.hitdata_id != -1 && 
            hit_data.hitdata_id != 518 && //blanks
            (hit_data.effect_id != 37 && hit_data.m_nARG_4 != 2809) && //hide models
            check_hidden(hit_data.effect_id)
            ){
            var hit_data_id_pars = ""
            if(hit_data == undefined){
                hit_counter = hit_counter + 1
                hit_data_id_pars = {
                    atk_str: `REMOVED HIT #${hit_data.hitdata_id}`,
                    id: hit_data.hitdata_id,
                    hit_num: hit_counter
                } 
            } else {
                hit_counter = hit_counter + 1
                hit_data_id_pars = hit_data_handler(
                    hit_data,
        
                    hit_effect_id,
                    ability_target_id,
                    type_id,
                    attack_type_id,
                    effect_value_type_id,
                    CommandNames,
                    AilmentNames,
                    ailment_group,
                    command_group,
                    enemy_resist,
                    element_bit_,
        
                    faf,
                    bdlur,
                    mblur,
                    hit_counter
                )
            }
            if( hit_data && hit_data.effect_id == 159||
                hit_data && hit_data.effect_id == 258
                ){
                    hit_counter = hit_counter - 1
                    Object.assign(hit_data_id_pars,{hit_num:`B${hit_data.m_nARG}`})
                    Object.assign(hitreturn.hit_pars,{[`B${hit_data.m_nARG}`]: hit_data_id_pars == "" ? undefined : hit_data_id_pars})
            } else {
                Object.assign(hitreturn.hit_pars,{[`hit_${hit_counter}`]: hit_data_id_pars == "" ? undefined : hit_data_id_pars})
            }
        }   

    }

    return(
        hitreturn
    )
}
export default Hit_Data_For_Ability