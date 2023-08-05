import require_trans from './require_trans.js'
import passive_ability_handler from './passive_ability_handler.js'
import passive_effect_trans from "./passive_effect_trans.js"
import ailment_field_effect_trans from '../ailment/ailment_field_effect_trans.js'
import ailment_data_pars_dif from '../ailment/ailment_data_pars_dif.js'

export default function passive_effects_dif(
    passive_ability,
    master_index,
    ver,
){

    const passive_trans = passive_ability_handler(
        passive_ability,
        master_index,
        ver,
    )

    const makefield=(spacer)=>{

        const make_spacer = (buffs, i)=>{
            var string;
            switch (spacer) {
                case "require_":
                    string = passive_trans.require_ != "" ? `${passive_ability.field.length == i + 1 ? "└─ " : "├─ "}` : undefined
                    break;
                case "require__1":
                    string = passive_trans.require__1 != "" ? `${passive_ability.field.length == i + 1 ? "└─ " : "├─ "}` : undefined 
                    break;
                case "cond_id":
                    string = `${buffs.cond_id != undefined ? "└─ " : "- "}`
                    break;
                case "":
                    string = `${passive_ability.field.length == i + 1 ? "└─ " : "├─ "}`
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

    const MakeAttachedMeta = ()=>{
        const _final_meta = []
        const attached = passive_ability.attached && passive_ability.attached.map(self =>
                passive_effects_dif(
                    Object.values(self)[0],
                    master_index,
                    ver,
                )
            )
        if(attached != undefined){
            _final_meta.push(...attached)
        }
        if(passive_trans.restrict_type != ""){
            _final_meta.push(`${passive_trans.restrict_type}\n`)
        }
        if(passive_trans.type_ != ""){
            _final_meta.push(`${passive_trans.type_}\n`)
        }
        if(passive_trans.required_equip_pa_id != ""){
            _final_meta.push(`${passive_trans.required_equip_pa_id}\n`)
        }
        var final_text = undefined
        if(_final_meta.length != 0){
            final_text = _final_meta.join("")
        }
        return final_text
    }

    if (passive_ability.attached == undefined && 
        passive_trans.require_ == "" && 
        passive_trans.require__1 == "" && 
        passive_trans.effect_ == "" && 
        passive_trans.effect__1 == "" && 
        (passive_ability.field == undefined || passive_ability.hide_field == true)
        ) {
        return ""
    } else {

        const full_text = []
        if(passive_ability.passive_cond_type == 1 && 
            (passive_trans.effect_ != undefined || 
             passive_trans.effect__1 != undefined || 
             passive_ability.field != undefined)
            ){
            
            if(passive_trans.require_ != undefined){
                full_text.push(passive_trans.require_)
            }
            if(passive_trans.effect_.includes("Field Effect") != true){
                full_text.push(passive_trans.effect_)
            }
            if(passive_trans.effect_.includes("Field Effect") == true && 
                passive_ability.hide_field != true
                ){
                const field_1_disp = makefield("require_")
                if(field_1_disp != undefined){
                    full_text.push(field_1_disp)
                }
            }
            if(passive_trans.effect__1.includes("Field Effect") != true){
                full_text.push(passive_trans.effect__1)
            }
            if(passive_trans.effect__1.includes("Field Effect") == true && 
                passive_ability.hide_field != true
                ){
                const field_2_disp = makefield("require__1")
                if(field_2_disp != undefined){
                    full_text.push(field_2_disp)
                }
            }

        } else 
        if(passive_ability.passive_cond_type == 3 && 
            (passive_trans.effect_ != undefined || 
             passive_trans.effect__1 != undefined || 
             passive_ability.field != undefined)
            ){

            if(passive_trans.require_ != undefined){
                full_text.push(passive_trans.require_)
            }
            if(passive_trans.effect_.includes("Field Effect") != true){
                full_text.push(passive_trans.effect_)
            }
            if(passive_trans.effect_.includes("Field Effect") == true && 
                passive_ability.hide_field != true
                ){
                const field_1_disp = makefield("require_")
                if(field_1_disp != undefined){
                    full_text.push(field_1_disp)
                }
            }
            if(passive_trans.effect__1.includes("Field Effect") != true){
                full_text.push(passive_trans.effect__1)
            }
            if(passive_trans.effect__1.includes("Field Effect") == true && 
                passive_ability.hide_field != true
                ){
                const field_2_disp = makefield("require__1")
                if(field_2_disp != undefined){
                    full_text.push(field_2_disp)
                }
            }
            if(passive_trans.effect__1.includes("Field Effect") != true && 
                passive_trans.effect_.includes("Field Effect") != true && 
                passive_ability.hide_field != true && 
                passive_ability.field != undefined
                ){
                const defun_field = makefield("")
                if(defun_field != undefined){
                    full_text.push(defun_field)
                }
            }
        } else 
        if(passive_ability.passive_cond_type == 2){

            if(passive_trans.require_ != undefined){
                full_text.push(passive_trans.require_)
            }
            if(passive_trans.effect_.includes("Field Effect") != true){
                full_text.push(passive_trans.effect_)
            }
            if(passive_trans.effect_.includes("Field Effect") == true && 
                passive_ability.hide_field != true
                ){
                const field_1_disp = makefield("require_")
                if(field_1_disp != undefined){
                    full_text.push(field_1_disp)
                }
            }
            if(passive_trans.require__1 != undefined){
                full_text.push(passive_trans.require__1)
            }
            if(passive_trans.effect__1.includes("Field Effect") != true){
                full_text.push(passive_trans.effect__1)
            }
            if(passive_trans.effect__1.includes("Field Effect") == true && 
                passive_ability.hide_field != true
                ){
                const field_2_disp = makefield("require__1")
                if(field_2_disp != undefined){
                    full_text.push(field_2_disp)
                }
            }
            if(passive_trans.effect__1.includes("Field Effect") != true && 
                passive_trans.effect_.includes("Field Effect") != true && 
                passive_ability.hide_field != true && 
                passive_ability.field != undefined
                ){
                const defun_field = makefield("cond_id")
                if(defun_field != undefined){
                    full_text.push(defun_field)
                }
            }
        }

        const meta_maker = MakeAttachedMeta()

        if(meta_maker != ""){
            full_text.push(meta_maker)
        }
        var return_text = ""
        if(full_text.length != 0){
            return_text = full_text.join("")
        }

        return return_text
}
}