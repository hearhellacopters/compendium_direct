import require_trans from './require_trans.js'
import passive_effect_trans from "./passive_effect_trans.js"
import ailment_field_effect_trans from '../ailment/ailment_field_effect_trans.js'
import ailment_data_pars_dif from '../ailment/ailment_data_pars_dif.js'

export default function passive_effects_dif(
    passive_ability,
    master_index,
    ver,
){

    const equipmentpassivenames = master_index.equipmentpassivenames
    const passivenames = master_index.passivenames
    const param_id = master_index.passive_effects.param_id

    var restrict_type = undefined
    if (passive_ability.restrict_type == 1) {
        restrict_type = "*Does not stack with sphere of same name"
    }
    if (passive_ability.restrict_type == 2) {
        restrict_type = "*Does not inflict debuff from spheres of the same name"
    }
    var type_ = undefined
    if (passive_ability.type_ == 2) {
        type_ = "*Increases applied before battle"
    }

    var required_equip_pa_id = undefined
    if (passive_ability.required_equip_pa_id != undefined && passive_ability.required_equip_pa_id != -1) {
        if (passive_ability.required_equip_pa_type != undefined && passive_ability.required_equip_pa_type == 0) {
            const pull = equipmentpassivenames[passive_ability.required_equip_pa_id]
            if (pull != undefined) {
                required_equip_pa_id = `*Requires <${equipmentpassivenames[passive_ability.required_equip_pa_id].loc_tag}> [${equipmentpassivenames[passive_ability.required_equip_pa_id].name}] #${passive_ability.required_equip_pa_id}`
            } else {
                required_equip_pa_id = `*Requires Equipment <smallpassive> [${passive_ability.required_equip_pa_id}] #${passive_ability.required_equip_pa_id}`
            }
        }
        if (passive_ability.required_equip_pa_type != undefined && passive_ability.required_equip_pa_type == 1) {
            const pull = passivenames[passive_ability.required_equip_pa_id]
            if (pull != undefined) {
                required_equip_pa_id = `*Requires <${passivenames[passive_ability.required_equip_pa_id].loc_tag}> [${passivenames[passive_ability.required_equip_pa_id].name}] #${passive_ability.required_equip_pa_id}`
            } else {
                required_equip_pa_id = `*Requires <smallpassive> [${passive_ability.required_equip_pa_id}] #${passive_ability.required_equip_pa_id}`
            }
        }
    }

    //param trans

    var effect_value1 = undefined
    var effect_value2 = undefined
    var effect_value3 = undefined
    if (passive_ability.effect_value01_param_id != undefined) {
        if (param_id[passive_ability.effect_value01_param_id] != undefined) {
            effect_value1 = param_id[passive_ability.effect_value01_param_id].param_id
        } else {
            effect_value1 = passive_ability.effect_value1
        }
    } else {
        effect_value1 = passive_ability.effect_value1
    }

    if (passive_ability.effect_value02_param_id != undefined) {
        if (param_id[passive_ability.effect_value02_param_id] != undefined) {
            effect_value2 = param_id[passive_ability.effect_value02_param_id].param_id
        } else {
            effect_value2 = passive_ability.effect_value2
        }
    } else {
        effect_value2 = passive_ability.effect_value2
    }

    if (passive_ability.effect_value03_param_id != undefined) {
        if (param_id[passive_ability.effect_value03_param_id] != undefined) {
            effect_value3 = param_id[passive_ability.effect_value03_param_id].param_id
        } else {
            effect_value3 = passive_ability.effect_value3
        }
    } else {
        effect_value3 = passive_ability.effect_value3
    }

    //param_1 trans

    var effect_value1_1 = undefined
    var effect_value2_1 = undefined
    var effect_value3_1 = undefined
    if (passive_ability.effect_value01_param_id_1 != undefined) {
        if (param_id[passive_ability.effect_value01_param_id_1] != undefined) {
            effect_value1_1 = param_id[passive_ability.effect_value01_param_id_1].param_id
        } else {
            effect_value1_1 = passive_ability.effect_value1_1
        }
    } else {
        effect_value1_1 = passive_ability.effect_value1_1
    }

    if (passive_ability.effect_value02_param_id_1 != undefined) {
        if (param_id[passive_ability.effect_value02_param_id_1] != undefined) {
            effect_value2_1 = param_id[passive_ability.effect_value02_param_id_1].param_id
        } else {
            effect_value2_1 = passive_ability.effect_value2_1
        }
    } else {
        effect_value2_1 = passive_ability.effect_value2_1
    }

    if (passive_ability.effect_value03_param_id_1 != undefined) {
        if (param_id[passive_ability.effect_value03_param_id_1] != undefined) {
            effect_value3_1 = param_id[passive_ability.effect_value03_param_id_1].param_id
        } else {
            effect_value3_1 = passive_ability.effect_value3_1
        }
    } else {
        effect_value3_1 = passive_ability.effect_value3_1
    }

    //Require param trans

    var require_value1 = undefined
    var require_value2 = undefined
    var require_value3 = undefined
    if (passive_ability.require_value01_param_id != undefined) {
        if (param_id[passive_ability.require_value01_param_id] != undefined) {
            require_value1 = param_id[passive_ability.require_value01_param_id].param_id
        } else {
            require_value1 = passive_ability.require_value1
        }
    } else {
        require_value1 = passive_ability.require_value1
    }

    if (passive_ability.require_value02_param_id != undefined) {
        if (param_id[passive_ability.require_value02_param_id] != undefined) {
            require_value2 = param_id[passive_ability.require_value02_param_id].param_id
        } else {
            require_value2 = passive_ability.require_value2
        }
    } else {
        require_value2 = passive_ability.require_value2
    }

    if (passive_ability.require_value03_param_id != undefined) {
        if (param_id[passive_ability.require_value03_param_id] != undefined) {
            require_value3 = param_id[passive_ability.require_value03_param_id].param_id
        } else {
            require_value3 = passive_ability.require_value3
        }
    } else {
        require_value3 = passive_ability.require_value3
    }

    //Require_1 param trans

    var require_value1_1 = undefined
    var require_value2_1 = undefined
    var require_value3_1 = undefined
    if (passive_ability.require_value01_param_id_1 != undefined) {
        if (param_id[passive_ability.require_value01_param_id_1] != undefined) {
            require_value1_1 = param_id[passive_ability.require_value01_param_id_1].param_id
        } else {
            require_value1_1 = passive_ability.require_value1_1
        }
    } else {
        require_value1_1 = passive_ability.require_value1_1
    }

    if (passive_ability.require_value02_param_id_1 != undefined) {
        if (param_id[passive_ability.require_value02_param_id_1] != undefined) {
            require_value2_1 = param_id[passive_ability.require_value02_param_id_1].param_id
        } else {
            require_value2_1 = passive_ability.require_value2_1
        }
    } else {
        require_value2_1 = passive_ability.require_value2_1
    }

    if (passive_ability.require_value03_param_id_1 != undefined) {
        if (param_id[passive_ability.require_value03_param_id_1] != undefined) {
            require_value3_1 = param_id[passive_ability.require_value03_param_id_1].param_id
        } else {
            require_value3_1 = passive_ability.require_value3_1
        }
    } else {
        require_value3_1 = passive_ability.require_value3_1
    }

    var require_ = undefined
    var require__1 = undefined

    var require_show = true
    var require__1_show = true

    if (passive_ability.require_ != undefined && passive_ability.passive_cond_type == 2 && passive_ability.effect_ == undefined) {
        require_show = false
    }
    if (passive_ability.require__1 != undefined && passive_ability.passive_cond_type == 2 && passive_ability.effect__1 == undefined) {
        require__1_show = false
    }

    if (passive_ability.require_ != undefined &&
        require_show == true
    ) {
        require_ = require_trans(
            passive_ability.require_,
            passive_ability.require_target,
            require_value1,
            require_value2,
            require_value3,

            master_index,
            ver
        )
    }

    if (passive_ability.require__1 != undefined &&
        require__1_show == true
    ) {
        require__1 = require_trans(
            passive_ability.require__1,
            passive_ability.require_target_1,
            require_value1_1,
            require_value2_1,
            require_value3_1,

            master_index,
            ver
        )
    }

    var effect_ = undefined
    var effect__1 = undefined

    if (passive_ability.effect_ != undefined) {
        effect_ = passive_effect_trans(
            passive_ability.effect_,
            passive_ability.passive_target == 2 ? passive_ability.effect_target : passive_ability.passive_target,
            effect_value1,
            effect_value2,
            effect_value3,
            passive_ability.effect__1,

            master_index,
            ver
        )
    }

    if (passive_ability.effect__1 != undefined) {
        effect__1 = passive_effect_trans(
            passive_ability.effect__1,
            passive_ability.passive_target == 2 ? passive_ability.effect_target_1 : passive_ability.passive_target,
            effect_value1_1,
            effect_value2_1,
            effect_value3_1,
            passive_ability.effect__1,

            master_index,
            ver
        )
    }


    const effect_display_pars = (effect_, effect__1, require_, require__1, effect_num) => {
        if (effect_num == 1) {
            const effec_1_break = effect_ && effect_.search('\n') != -1
            var add_char_1 = ` - `
            var last_char_1 = ` - `
            if (passive_ability.passive_cond_type == 1 && (require_ != undefined || require__1 != undefined)) {
                add_char_1 = ` ├─ `
                last_char_1 = effect__1 == undefined ? ` └─ ` : ` ├─ `
            }
            if (passive_ability.passive_cond_type == 3 && (require_ != undefined || require__1 != undefined)) {
                add_char_1 = ` ├─ `
                last_char_1 = effect__1 == undefined ? ` └─ ` : ` ├─ `
            }
            if (passive_ability.passive_cond_type == 2 && require_ != undefined) {
                add_char_1 = ` ├─ `
                last_char_1 = ` └─ `
            }
            if (effec_1_break) {
                const last1 = effect_.split(/\n/g).length - 1
                var effect_display = effect_.split(/\n/g).map((text, key) => {
                    return (
                        `${key != last1 ? add_char_1 : last_char_1}${text}`
                    )
                }).join("\n")
    
            } else {
                effect_display = `${last_char_1}${effect_}`
            }
            return effect_ != "Field Effect" && effect_ != undefined && effect_display != " - " ? effect_display : undefined
        } else {
            const effec_2_break = effect__1 && effect__1.search('\n') != -1
            var add_char_2 = ` - `
            var last_char_2 = ` - `
            if (passive_ability.passive_cond_type == 1 && (require_ != undefined || require__1 != undefined)) {
                add_char_2 = ` ├─ `
                last_char_2 = ` └─ `
            }
            if (passive_ability.passive_cond_type == 3 && (require_ != undefined || require__1 != undefined)) {
                add_char_2 = ` ├─ `
                last_char_2 = ` └─ `
            }
            if (passive_ability.passive_cond_type == 2 && require__1 != undefined) {
                add_char_2 = ` ├─ `
                last_char_2 = ` └─ `
            }
            if (effec_2_break) {
                const last2 = effect__1.split(/\n/g).length - 1
                var effect__1_display = effect__1.split(/\n/g).map((text, key) => {
                    return (
                        `${key != last2 ? add_char_2 : last_char_2}${text}`
                    )
                }).join("\n")
            } else {
                effect__1_display = `${last_char_2}${effect__1}`
            }
            return effect__1 != "Field Effect" && effect__1 != undefined && effect__1_display != " - " ? effect__1_display : undefined
        }
    }

    const field_data = (ailment_field)=>{
       return ailment_field_effect_trans(
            ailment_field,
            false, //Single
    
            undefined, //is_buff
            undefined, //AugValue1
            undefined, //AugValue2
            ailment_field.max_level <= 10 && ailment_field.max_level != -1 && ailment_field.max_level != 0 ? ailment_field.max_level : ailment_field.max_level_overide != undefined ? ailment_field.max_level_overide : ailment_field.max_level, //max_level
            1, //rank
            undefined, //alt_rank
            undefined, //alt_aug1
            undefined, //alt_aug2
            ver,
            undefined,
            master_index
        )
    }

    const makefield=(spacer)=>{

        const make_spacer = (buffs, i)=>{
            var string;
            switch (spacer) {
                case "require_":
                    string = require_ != "" ? `${passive_ability.field.length == i + 1 ? "└─" : "├─"}` : undefined
                    break;
                case "require__1":
                    string = require__1 != "" ? `${passive_ability.field.length == i + 1 ? "└─" : "├─"}` : undefined 
                    break;
                case "cond_id":
                    string = `${buffs.cond_id != undefined ? "└─" : "-"}`
                    break;
                case "":
                    string = `${passive_ability.field.length == i + 1 ? "└─" : "├─"}`
                    break;
                default:
                    string = undefined
                    break;
            }
            return string
        }

        return(
            passive_ability.field && passive_ability.field.map((buffs, i) => (
                ailment_data_pars_dif(
                    field_data(buffs),
                    1, //currentlevel
                    1, //currentturns
                    1, //currentenemies
                    1, //currentstacks
                    1, //currentdebuffsranks,
                    1, //currentdebuffsranks2,
                    1, //currentdebuffsmuliply,
                    1, //currentbuffsranks,
                    1, //currentfieldbuffsranks,
                    1, //currentbuffsmuliply,
                    1, //currentgroupstacks,
                    1, //currenthp,
                    1, //charactersleft,
                    1, //characterskb,
                    make_spacer(buffs, i)
                )
            ))
        )
    }

    const MakeMeta = ()=>{
        const _final_meta = []
        const attached = passive_ability.attached && passive_ability.attached.map(self =>
                passive_effects_dif(
                    Object.values(self)[0],
                    master_index,
                    ver
                )
            )
        if(attached != undefined){
            _final_meta.push(attached.join("\n"))
        }
        if(restrict_type != undefined){
            _final_meta.push(restrict_type)
        }
        if(type_ != undefined){
            _final_meta.push(type_)
        }
        if(required_equip_pa_id != undefined){
            _final_meta.push(required_equip_pa_id)
        }
        var final_text = undefined
        if(_final_meta.length != 0){
            final_text = _final_meta.join("\n")
        }
        return final_text
    }

    if (require_ == undefined && require__1 == undefined && effect_ == undefined && effect__1 == undefined && passive_ability.attached == undefined && passive_ability.field == undefined) {
        return undefined
    } else {
        const full_text = []
        if(passive_ability.passive_cond_type == 1 && (effect_ != undefined || effect__1 != undefined || passive_ability.field != undefined)){
            const require_1_disp = require__1 == undefined && require_ == undefined ? undefined : ` ┬ ${require_}${require__1 != undefined && require_ != undefined ? " & " : ""}${require__1 != undefined ? `${require__1}` : ""}`
            if(require_1_disp != undefined){
                full_text.push(require_1_disp)
            }
            const effect_1_disp = effect_display_pars(effect_, effect__1, require_, require__1, 1)
            if(effect_1_disp != undefined){
                full_text.push(effect_1_disp)
            }
            if(effect_ == "Field Effect" && passive_ability.hide_field != true){
                const field_1_disp = makefield("require_")
                if(field_1_disp != undefined){
                    full_text.push(field_1_disp)
                }
            }
            const effect_2_disp = effect_display_pars(effect_, effect__1, require_, require__1, 2)
            if(effect_2_disp != undefined){
                full_text.push(effect_2_disp)
            }
            if(effect__1 == "Field Effect" && passive_ability.hide_field != true){
                const field_2_disp = makefield("require__1")
                if(field_2_disp != undefined){
                    full_text.push(field_2_disp)
                }
            }
            const meta_maker = MakeMeta()
            if(meta_maker != undefined){
                full_text.push(meta_maker)
            }
            var return_text = undefined
            if(full_text.length != 0){
                return_text = full_text.join("\n")
            }
            return return_text
        }
        if(passive_ability.passive_cond_type == 3 && (effect_ != undefined || effect__1 != undefined || passive_ability.field != undefined)){
            const full_text = []
            const require_1_disp = require_ == undefined ? undefined : ` ┬ ${require_}${require__1 != undefined && require_ != undefined ? " or " : ""}${require__1 != undefined ? `${require__1}` : ""}`
            if(require_1_disp != undefined){
                full_text.push(require_1_disp)
            }
            const effect_1_disp = effect_display_pars(effect_, effect__1, require_, require__1, 1)
            if(effect_1_disp != undefined){
                full_text.push(effect_1_disp)
            }
            if(effect_ == "Field Effect" && passive_ability.hide_field != true){
                const field_1_disp = makefield("require_")
                if(field_1_disp != undefined){
                    full_text.push(field_1_disp)
                }
            }
            const effect_2_disp = effect_display_pars(effect_, effect__1, require_, require__1, 2)
            if(effect_2_disp != undefined){
                full_text.push(effect_2_disp)
            }
            if(effect__1 == "Field Effect" && passive_ability.hide_field != true){
                const field_2_disp = makefield("require__1")
                if(field_2_disp != undefined){
                    full_text.push(field_2_disp)
                }
            }
            if(effect__1 != "Field Effect" && effect_ != "Field Effect" && passive_ability.hide_field != true && passive_ability.field != undefined){
                const defun_field = makefield("")
                if(defun_field != undefined){
                    full_text.push(defun_field)
                }
            }
            const meta_maker = MakeMeta()
            if(meta_maker != undefined){
                full_text.push(meta_maker)
            }
            var return_text2 = undefined
            if(full_text.length != 0){
                return_text2 = full_text.join("\n")
            }
            return return_text2   
        }
        if(passive_ability.passive_cond_type == 2){
            const full_text = []
            const require_1_disp = effect_ == undefined && passive_ability.field == undefined ? undefined : require_ != undefined ? ` ┬ ${require_}` : undefined
            if(require_1_disp != undefined){
                full_text.push(require_1_disp)
            }
            const effect_1_disp = effect_display_pars(effect_, effect__1, require_, require__1, 1)
            if(effect_1_disp != undefined){
                full_text.push(effect_1_disp)
            }
            if(effect_ == "Field Effect" && passive_ability.hide_field != true){
                const field_1_disp = makefield("require_")
                if(field_1_disp != undefined){
                    full_text.push(field_1_disp)
                }
            }
            const require_2_disp = effect__1 == undefined && passive_ability.field == undefined ? undefined : require__1 != undefined ? ` ┬ ${require__1}` : undefined
            if(require_2_disp != undefined){
                full_text.push(require_2_disp)
            }
            const effect_2_disp = effect_display_pars(effect_, effect__1, require_, require__1, 2)
            if(effect_2_disp != undefined){
                full_text.push(effect_2_disp)
            }
            if(effect__1 == "Field Effect" && passive_ability.hide_field != true){
                const field_1_disp = makefield("require__1")
                if(field_1_disp != undefined){
                    full_text.push(field_1_disp)
                }
            }
            if(effect__1 != "Field Effect" && effect_ != "Field Effect" && passive_ability.hide_field != true && passive_ability.field != undefined){
                const defun_field = makefield("cond_id")
                if(defun_field != undefined){
                    full_text.push(defun_field)
                }
            }
            const meta_maker = MakeMeta()
            if(meta_maker != undefined){
                full_text.push(meta_maker)
            }
            var return_text3 = undefined
            if(full_text.length != 0){
                return_text3 = full_text.join("\n")
            }
            return return_text3    
        }
    }
}