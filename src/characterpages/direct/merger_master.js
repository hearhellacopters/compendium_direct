import passive_effect_handler from "./formatting/passive_effect_handler"

const merger_master = (
    char_passives,

    master_index,
    ver,

    merge_pas,
    type,
    use_ailment
    )=>{

        const passive_effects_data = master_index.passive_effects
        const CommandNames = master_index.commands
        const AilmentNames = master_index.ailments
        const command_group = master_index.command_group_full[ver]
        const ailment_group = master_index.ailment_group_full[ver]
        const passivenames = master_index.passivenames
        const equipmentpassivenames = master_index.equipmentpassivenames
        const enemy_type = master_index.enemy_type
        const CastNames = master_index.cast_names
        const eff_check = master_index.passive_effects.effect_
        const param_id = master_index.passive_effects.param_id

        const full_values= {}

        const new_merge_value = {
            ATK: 0,
            P_ATK: 0,
            DEF: 0,
            P_DEF: 0,
            SPD: 0,
            P_SPD: 0,
            IBRV: 0,
            P_IBRV: 0,
            MBRV: 0,
            P_MBRV: 0,
            BRVDMG: 0,
            P_BRVDMG: 0,
            GAINS: 0,
            P_GAINS: 0,
            S_OVER: 0,
            P_S_OVER: 0,
            G_OVER: 0,
            P_G_OVER: 0,
            BRVCAP: 0,
            P_BRVCAP: 0,
            MAXCAP: 0,
            P_MAXCAP: 0,
            BONUSSTART: 0,
            BONUSEND: 0,
            GAUGE: 0,
            RATE: 0
        }

        const checker = (
            merger,
            pas_target,
            effect_target,
            passive_cond,
            effect_disp,
            effect__1disp,
            require_disp,
            require__1disp,
            eff
        )=>{
            if(eff == 1){
                if(passive_cond == 1){
                    if(merger == true &&
                        (pas_target == 2 || pas_target == 3) &&
                        (effect_target == 2 || effect_target == 3) &&
                        effect_disp == true && 
                        (require_disp != true && require__1disp != true )
                        ){
                        return true
                    } else {
                        return false
                    }
                }
                if(passive_cond == 2){
                    if(merger == true &&
                        (pas_target == 2 || pas_target == 3) &&
                        (effect_target == 2 || effect_target == 3) &&
                        effect_disp == true && require_disp != true
                        ){
                        return true
                    } else {
                        return false
                    }
                }
                if(passive_cond == 3){
                    if(merger == true &&
                        (pas_target == 2 || pas_target == 3) &&
                        (effect_target == 2 || effect_target == 3) &&
                        effect_disp == true && (require_disp != true && require__1disp != true )
                        ){
                        return true
                    } else {
                        return false
                    }
                }
            }
            if(eff == 2){
                if(passive_cond == 1){
                    if(merger == true &&
                        (pas_target == 2 || pas_target == 3) &&
                        (effect_target == 2 || effect_target == 3) &&
                        effect__1disp == true && 
                        (require_disp != true && require__1disp != true )
                        ){
                        return true
                    } else {
                        return false
                    }
                }
                if(passive_cond == 2){
                    if(merger == true &&
                        (pas_target == 2 || pas_target == 3) &&
                        (effect_target == 2 || effect_target == 3) &&
                        effect__1disp == true && require__1disp != true
                        ){
                        return true
                    } else {
                        return false
                    }
                }
                if(passive_cond == 3){
                    if(merger == true &&
                        (pas_target == 2 || pas_target == 3) &&
                        (effect_target == 2 || effect_target == 3) &&
                        effect__1disp == true && (require_disp != true && require__1disp != true )
                        ){
                        return true
                    } else {
                        return false
                    }
                }
            }
        }
    
        var cond_set = new Set(char_passives)

        cond_set.forEach(self=>{
            
            var eff_holder1 = self.effect_value01_param_id != undefined ? param_id[self.effect_value01_param_id].param_id : self.effect_value1
            Object.assign(self,{effect_value1:eff_holder1})
            Object.assign(self,{effect_value1_disp:eff_holder1})
            Object.assign(self,{effect_value01_param_id:undefined})
        
            var eff_holder2 = self.effect_value02_param_id != undefined ? param_id[self.effect_value02_param_id].param_id : self.effect_value2
            Object.assign(self,{effect_value2:eff_holder2})
            Object.assign(self,{effect_value2_disp:eff_holder2})
            Object.assign(self,{effect_value02_param_id:undefined})
        
            var eff_holder3 = self.effect_value03_param_id != undefined ? param_id[self.effect_value03_param_id].param_id : self.effect_value3
            Object.assign(self,{effect_value3:eff_holder3})
            Object.assign(self,{effect_value3_disp:eff_holder3})
            Object.assign(self,{effect_value03_param_id:undefined})
        
            var eff_holder1_1 = self.effect_value01_param_id_1 != undefined ? param_id[self.effect_value01_param_id_1].param_id : self.effect_value1_1
            Object.assign(self,{effect_value1_1:eff_holder1_1})
            Object.assign(self,{effect_value1_1_disp:eff_holder1_1})
            Object.assign(self,{effect_value01_param_id_1:undefined})
        
            var eff_holder2_1 = self.effect_value02_param_id_1 != undefined ? param_id[self.effect_value02_param_id_1].param_id : self.effect_value2_1
            Object.assign(self,{effect_value2_1:eff_holder2_1})
            Object.assign(self,{effect_value2_1_disp:eff_holder2_1})
            Object.assign(self,{effect_value02_param_id_1:undefined})
        
            var eff_holder3_1 = self.effect_value03_param_id_1 != undefined ? param_id[self.effect_value03_param_id_1].param_id : self.effect_value3_1
            Object.assign(self,{effect_value3_1:eff_holder3_1})
            Object.assign(self,{effect_value3_1_disp:eff_holder3_1})
            Object.assign(self,{effect_value03_param_id_1:undefined})
                     
        })
       
        cond_set.forEach(self=>{

            var single_loc = char_passives.filter(self2=>self2.loc_tag == self.loc_tag )
    
            single_loc.forEach(value_self=>{

                var tar_checkA = value_self.passive_target == 2 ? value_self.effect_target : value_self.passive_target
                var tar_checkB = self.passive_target == 2 ? self.effect_target : self.passive_target

                var tar_check_1A = value_self.passive_target == 2 ? value_self.effect_target_1 : value_self.passive_target
                var tar_check_1B = self.passive_target == 2 ? self.effect_target_1 : self.passive_target

                var checked = false
                if((self.effect_ == value_self.effect_ && tar_checkA == tar_checkB) && 
                    value_self.effect_disp != false && 
                    value_self.effect_ != undefined && 
                    value_self.require_disp != true && 
                    self.require_disp != true && 
                    self.require__1disp != true &&
                    value_self.require__1disp != true &&
                    self.pa_id != value_self.pa_id 
                    ){
                    checked = true
                    var full_effect_value1 = self.effect_value1_disp + value_self.effect_value1
                    var full_effect_value2 = self.effect_value2_disp + value_self.effect_value2
                    var full_effect_value3 = self.effect_value3_disp + value_self.effect_value3
                    Object.assign(self,{
                        effect_value1_disp: full_effect_value1,
                        effect_value2_disp: full_effect_value2,
                        effect_value3_disp: full_effect_value3
                    })
                    Object.assign(value_self,{check_1:true})
                }
                if((self.effect__1 == value_self.effect__1 && tar_check_1A == tar_check_1B) && 
                    value_self.effect__1 != undefined && 
                    value_self.effect__1disp != false && 
                    self.require_disp != true && 
                    self.require__1disp != true &&
                    value_self.require_disp != true && 
                    value_self.require__1disp != true &&
                    self.pa_id != value_self.pa_id 
                    ){
                    checked = true
                    var full_effect_value1_1 = self.effect_value1_1_disp + value_self.effect_value1_1
                    var full_effect_value2_1 = self.effect_value2_1_disp + value_self.effect_value2_1
                    var full_effect_value3_1 = self.effect_value3_1_disp + value_self.effect_value3_1
                    Object.assign(self,{
                        effect_value1_1_disp: full_effect_value1_1,
                        effect_value2_1_disp: full_effect_value2_1,
                        effect_value3_1_disp: full_effect_value3_1
                    })
                    Object.assign(value_self,{check_2:true})
                }
                if(checked == true && self.merged == undefined){
                    Object.assign(value_self,{merged:true})
                }
            })

        })

        cond_set.forEach(self=>{
            if(self.merged != true){
                Object.assign(full_values,{[self.pa_id]:{
                    ...self,
                }})
            }
        })

        if(merge_pas == true){
            const second_run ={}
            Object.values(full_values).forEach(self=>{
                var check_eff1 = checker(
                    eff_check[self.effect_] && eff_check[self.effect_].merger, 
                    self.passive_target == 2 ? self.effect_target : self.passive_target, 
                    self.effect_target,
                    self.passive_cond_type,
                    self.effect_disp,
                    self.effect__1disp,
                    self.require_disp,
                    self.require__1disp,
                    1)
                var check_eff2 = checker(
                    eff_check[self.effect__1] && eff_check[self.effect__1].merger, 
                    self.passive_target == 2 ? self.effect_target_1 : self.passive_target, 
                    self.effect_target_1,
                    self.passive_cond_type,
                    self.effect_disp,
                    self.effect__1disp,
                    self.require_disp,
                    self.require__1disp,
                    2)
                var field_check = false
                if(self.field != undefined && self.hide_field != true){
                    self.field.forEach(selfie=>{
                        //ATK
                        if(selfie.effect_id && selfie.effect_id && selfie.effect_id.effect_type_id == 1 && selfie.cond_id == undefined){
                            if(selfie.effect_id.effect_target_id == 1){
                                field_check = true
                                Object.assign(selfie,{field_hide:true})
                                if(self.require_id_1 == 4 || self.require_id_2 == 4 ){
                                    new_merge_value.ATK = new_merge_value.ATK + selfie.effect_id.effect_value
                                } else {
                                    new_merge_value.P_ATK = new_merge_value.P_ATK + selfie.effect_id.effect_value
                                }
                            }
                        }
                        //BRV Damage
                        if(selfie.effect_id && selfie.effect_id && selfie.effect_id.ailment_effect == 114 && selfie.cond_id == undefined){
                            if(selfie.effect_id.effect_target_id == 1){
                                field_check = true
                                Object.assign(selfie,{field_hide:true})
                                if(self.require_id_1 == 4 || self.require_id_2 == 4 ){
                                    new_merge_value.BRVDMG = new_merge_value.BRVDMG + selfie.effect_id.effect_value
                                } else {
                                    new_merge_value.P_BRVDMG = new_merge_value.P_BRVDMG + selfie.effect_id.effect_value
                                }
                            }
                        }
                        //MAX BRV Cap
                        if(selfie.effect_id && selfie.effect_id && selfie.effect_id.ailment_effect == 236 && selfie.cond_id == undefined){
                            if(selfie.effect_id.effect_target_id == 1){
                                field_check = true
                                Object.assign(selfie,{field_hide:true})
                                if(self.require_id_1 == 4 || self.require_id_2 == 4 ){
                                    new_merge_value.MAXCAP = new_merge_value.MAXCAP + selfie.effect_id.effect_value
                                } else {
                                    new_merge_value.P_MAXCAP = new_merge_value.P_MAXCAP + selfie.effect_id.effect_value
                                }
                            }
                        }
                        //BRV DMG Cap
                        if(selfie.effect_id && selfie.effect_id && selfie.effect_id.ailment_effect == 235 && selfie.cond_id == undefined){
                            if(selfie.effect_id.effect_target_id == 1){
                                field_check = true
                                Object.assign(selfie,{field_hide:true})
                                if(self.require_id_1 == 4 || self.require_id_2 == 4 ){
                                    new_merge_value.BRVCAP = new_merge_value.BRVCAP + selfie.effect_id.effect_value
                                } else {
                                    new_merge_value.P_BRVCAP = new_merge_value.P_BRVCAP + selfie.effect_id.effect_value
                                }
                            }
                        }
                    })
                }
                if(check_eff1 == true || check_eff2  == true || field_check == true){
                    if(check_eff1 == true){
                        
                        var eff_holder1 = self.effect_value1_disp
                        var eff_holder2 = self.effect_value2_disp
                        var eff_holder3 = self.effect_value3_disp

                        passive_effect_handler(
                            self.effect_,
                            self.passive_target == 2 ? self.effect_target : self.passive_target,
                            eff_holder1,
                            eff_holder2,
                            eff_holder3,
                            self.effect__1,
    
                            master_index,
                            ver,

                            new_merge_value,
                            use_ailment
                        )
                    }
                    if(check_eff2 == true){

                        var eff_holder1_1 = self.effect_value1_1_disp
                        var eff_holder2_1 = self.effect_value2_1_disp
                        var eff_holder3_1 = self.effect_value3_1_disp

                        passive_effect_handler(
                            self.effect__1,
                            self.passive_target == 2 ? self.effect_target_1 : self.passive_target,
                            eff_holder1_1,
                            eff_holder2_1,
                            eff_holder3_1,
                            self.effect__1,
    
                            master_index,
                            ver,

                            new_merge_value,
                            use_ailment
                        )
                    }
                    Object.assign(second_run,{[self.pa_id]:{
                        ...self,
                        merged: true,
                        field_check: field_check,
                        effect_disp: check_eff1 == true ? false : self.effect_disp,
                        require_disp: check_eff1 == true ? false : self.require_disp,
                        effect__1disp: check_eff2 == true ? false : self.effect__1disp,
                        require__1disp: check_eff2 == true ? false : self.require__1disp,
                    }})
                } else {
                    Object.assign(second_run,{[self.pa_id]:{
                        ...self,
                        merged: true 
                    }})
                }
            })
            Object.assign(second_run,{[0]:{
                ...new_merge_value,
                rank:0,
                is_total: true 
            }})
            return Object.values(second_run)
        } else {
            return Object.values(full_values)
        }
}
export default merger_master