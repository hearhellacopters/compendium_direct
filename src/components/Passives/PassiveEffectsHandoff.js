import React, { useState } from "react";
import require_trans  from '../../processing/passives/require_trans'
import passive_effect_trans from "../../processing/passives/passive_effect_trans";
import ReplacerCharacter from '../ReplacerCharacter'
import AilmentFieldAttached from '../Buffs/AilmentFieldAttached'
import { ObjectView } from 'react-object-view'

export default function PassiveEffectsHandoff({
    file,
    passive_ability,

    master_index,
    ver,

    formatting,
    base_color,
    use_ailment,
    merged,
    hide_disp,
    attached,
    battle_state,
    pass_default,
    list,
}){

    const form = {formatting:formatting,updown:true}

    const equipmentpassivenames = master_index.equipmentpassivenames
    const passivenames = master_index.passivenames
    const param_id = master_index.passive_effects.param_id

    const [showraw, setshowraw] = useState(false)

    const showmeraw = (e) => {
        if (e.shiftKey) {
            if (showraw == false) {
                setshowraw(true)
            } else {
                setshowraw(false)
            }
        }
    }

    var restrict_type = ""
    if (passive_ability.restrict_type == 1) {
        restrict_type = "*Does not stack with sphere of same name"
    }
    if (passive_ability.restrict_type == 2) {
        restrict_type = "*Does not inflict debuff from spheres of the same name"
    }
    var type_ = ""
    if (passive_ability.type_ == 2) {
        type_ = "*Increases applied before battle"
    }

    var required_equip_pa_id = ""
    if (passive_ability.required_equip_pa_id != undefined && passive_ability.required_equip_pa_id != -1) {
        if (passive_ability.required_equip_pa_type != undefined && passive_ability.required_equip_pa_type == 0) {
            const pull = equipmentpassivenames[passive_ability.required_equip_pa_id]
            if (pull != undefined) {
                required_equip_pa_id = <div>{`*Requires `}<span className={equipmentpassivenames[passive_ability.required_equip_pa_id].loc_tag}></span><span className="unique">{" ["}{equipmentpassivenames[passive_ability.required_equip_pa_id].name}{"]"}</span>{` #${passive_ability.required_equip_pa_id}`}</div>
            } else {
                required_equip_pa_id = <div>{`*Requires Equipment `}<span className="smallpassive automarg" /><span className="unique">{" ["}{passive_ability.required_equip_pa_id}{"]"}</span>{` #${passive_ability.required_equip_pa_id}`}</div>
            }
        }
        if (passive_ability.required_equip_pa_type != undefined && passive_ability.required_equip_pa_type == 1) {
            const pull = passivenames[passive_ability.required_equip_pa_id]
            if (pull != undefined) {
                required_equip_pa_id = <div>{`*Requires `}<span className={passivenames[passive_ability.required_equip_pa_id].loc_tag}></span><span className="unique">{" ["}{passivenames[passive_ability.required_equip_pa_id].name}{"]"}</span>{` #${passive_ability.required_equip_pa_id}`}</div>
            } else {
                required_equip_pa_id = <div>{`*Requires `}<span className="smallpassive automarg" /><span className="unique">{" ["}{passive_ability.required_equip_pa_id}{"]"}</span>{` #${passive_ability.required_equip_pa_id}`}</div>
            }
        }
    }

    //param trans

    var effect_value1 = passive_ability.effect_value1_disp || ""
    var effect_value2 = passive_ability.effect_value2_disp || ""
    var effect_value3 = passive_ability.effect_value3_disp || ""
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

    var effect_value1_1 = passive_ability.effect_value1_1_disp || ""
    var effect_value2_1 = passive_ability.effect_value2_1_disp || ""
    var effect_value3_1 = passive_ability.effect_value3_1_disp || ""
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

    var require_value1 = ""
    var require_value2 = ""
    var require_value3 = ""
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

    var require_value1_1 = ""
    var require_value2_1 = ""
    var require_value3_1 = ""
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

    var require_ = ""
    var require__1 = ""

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

    if(battle_state && passive_ability.require_disp != true){
        require_ = ""
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

    if(battle_state && passive_ability.require__1disp != true){
        require__1 = ""
    }

    if (passive_ability.require__1 != undefined && passive_ability.passive_cond_type == 2 && passive_ability.effect__1 == undefined) {
        require__1 = ""
    }

    var effect_ = ""
    var effect__1 = ""

    if (battle_state == true ? (passive_ability.effect_ != undefined && passive_ability.effect_disp == true) : passive_ability.effect_ != undefined) {
        effect_ = passive_effect_trans(
            passive_ability.effect_,
            passive_ability.passive_target == 2 ? passive_ability.effect_target : passive_ability.passive_target,
            effect_value1,
            effect_value2,
            effect_value3,
            passive_ability.effect__1,

            master_index,
            ver,

            undefined,
            use_ailment
        )
    }

    if (battle_state == true ?  (passive_ability.effect__1 != undefined && passive_ability.effect__1disp == true) : passive_ability.effect__1 != undefined ) {
        effect__1 = passive_effect_trans(
            passive_ability.effect__1,
            passive_ability.passive_target == 2 ? passive_ability.effect_target_1 : passive_ability.passive_target,
            effect_value1_1,
            effect_value2_1,
            effect_value3_1,
            passive_ability.effect__1,

            master_index,
            ver,

            undefined,
            use_ailment
        )
    }

    const effect_display_pars = (effect_, effect__1, require_, require__1, effect_num) => {
        if (effect_num == 1) {
            const effec_1_break = effect_ && effect_.search('\n') != -1
            var add_char_1 = `\xa0- `
            var last_char_1 = `\xa0- `
            if (passive_ability.passive_cond_type == 1 && (require_ != "" || require__1 != "")) {
                add_char_1 = `\xa0├─ `
                last_char_1 = effect__1 == "" ? `\xa0└─ ` : `\xa0├─ `
            } else
            if (passive_ability.passive_cond_type == 3 && (require_ != "" || require__1 != "")) {
                add_char_1 = `\xa0├─ `
                last_char_1 = effect__1 == "" ? `\xa0└─ ` : `\xa0├─ `
            } else
            if (passive_ability.passive_cond_type == 2 && require_ != "") {
                add_char_1 = `\xa0├─ `
                last_char_1 = `\xa0└─ `
            }
            if (effec_1_break) {
                const last1 = effect_.split(/\n/g).length - 1
                var effect_display = effect_.split(/\n/g).map((text, key) => {
                    return (
                        `${key != last1 ? add_char_1 : last_char_1}${text}`
                    )
                }).join("\n")
                if(effect__1!=""||require__1!=""){
                    effect_display = `${effect_display}\n`
                }
            } else {
                effect_display = `${last_char_1}${effect_}\n`
            }
            return effect_ != "Field Effect" && effect_ != "" ? effect_display : ""
        } else {
            const effec_2_break = effect__1 && effect__1.search('\n') != -1
            var add_char_2 = `\xa0- `
            var last_char_2 = `\xa0- `
            if (passive_ability.passive_cond_type == 1 && (require_ != "" || require__1 != "")) {
                add_char_2 = `\xa0├─ `
                last_char_2 = `\xa0└─ `
            } else
            if (passive_ability.passive_cond_type == 3 && (require_ != "" || require__1 != "")) {
                add_char_2 = `\xa0├─ `
                last_char_2 = `\xa0└─ `
            } else
            if (passive_ability.passive_cond_type == 2 && require__1 != "") {
                add_char_2 = `\xa0├─ `
                last_char_2 = `\xa0└─ `
            }
            if (effec_2_break) {
                const last2 = effect__1.split(/\n/g).length - 1
                var effect__1_display = effect__1.split(/\n/g).map((text, key) => {
                    return (
                        `${key != last2 ? add_char_2 : last_char_2}${text}`
                    )
                }).join("\n")
            } else {
                effect__1_display = `${last_char_2}${effect__1}\n`
            }
            return effect__1 != "Field Effect" && effect__1 != "" ? effect__1_display : ""
        }
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
                <AilmentFieldAttached
                    key={buffs.data_id}
                    castlocation={true}
                    ver={ver}
                    master_index={master_index}
                    ailment_field={buffs}

                    loc={"passive"}
                    slider={false}
                    formatting={formatting}
                    hide_type={true}
                    battle_state={battle_state}
                    hide_disp={hide_disp != true ? false : buffs.field_hide}
                    spacer={make_spacer(buffs,i)}
                />
            ))
        )
    }

    const ending =  <>
                        {restrict_type != "" ?
                            <div>
                                {restrict_type}
                            </div>
                        : ""}
                        {type_ != "" ?
                            <div>
                                {type_}
                            </div>
                        : ""}
                        {required_equip_pa_id != "" ?
                            <div>
                                {required_equip_pa_id}
                            </div>
                        : ""}
                    </>       

    if (passive_ability.attached == undefined && require_ == "" && require__1 == "" && effect_ == "" && effect__1 == "" && (passive_ability.field == undefined || passive_ability.hide_field == true)) {
        return ("")
    } else {
        return (
            <>
            <div onClick={showmeraw} className={pass_default != true ? "" : `subpassiveflair cast_str`}>
                {battle_state != true ? "" : (hide_disp == true || passive_ability.loc_tag == merged) ? "" :
                    ReplacerCharacter(`From <${passive_ability.loc_tag}>\n`,{formatting:formatting})
                }
                {passive_ability.passive_cond_type == 1 && (effect_ != "" || effect__1 != "" || passive_ability.field != undefined)?
                    <>
                        {ReplacerCharacter(`${require__1 == "" && require_ == "" ? "" : "\xa0┬ "}${require_}${require__1 != "" && require_ != "" ? " & " : ""}${require__1 != "" ? `${require__1}\n` : require_ == "" ? "" : "\n"}`,{formatting:formatting})}
                        {ReplacerCharacter(effect_display_pars(effect_, effect__1, require_, require__1, 1),form)}
                        {effect_ == "Field Effect" && passive_ability.hide_field != true ?
                            makefield("require_")
                        : ""}
                        {ReplacerCharacter(effect_display_pars(effect_, effect__1, require_, require__1, 2),form)}
                        {effect__1 == "Field Effect" && passive_ability.hide_field != true ?
                            makefield("require__1")
                        : ""}
                    </>
                : ""}
                {passive_ability.passive_cond_type == 3 && (effect_ != "" || effect__1 != "" || passive_ability.field != undefined)?
                    <>
                        {ReplacerCharacter(`${require_ != "" ? `\xa0┬ ${require_}` : ""}${require__1 != "" && require_ != "" ? " or " : ""}${require__1 != "" ? `${require__1}\n` : require_ != "" ? "\n" : ""}`, {formatting:formatting})}
                        {ReplacerCharacter(effect_display_pars(effect_, effect__1, require_, require__1, 1),form)}
                        {effect_ == "Field Effect" && passive_ability.hide_field != true ?
                            makefield("require_")
                        : ""}
                        {ReplacerCharacter(effect_display_pars(effect_, effect__1, require_, require__1, 2),form)}
                        {effect__1 == "Field Effect" && passive_ability.hide_field != true ?
                            makefield("require__1")
                        : ""}
                        {effect__1 != "Field Effect" && effect_ != "Field Effect" && passive_ability.hide_field != true && passive_ability.field != undefined ?
                            makefield(``)
                        : ""}
                    </>
                : ""}
                {passive_ability.passive_cond_type == 2 ?
                    <>
                        {effect_ == "" && passive_ability.field == undefined ? "" : require_ != "" ? ReplacerCharacter(`\xa0┬ ${require_}\n`, {formatting:formatting}) : ""}
                        {ReplacerCharacter(effect_display_pars(effect_, effect__1, require_, require__1, 1),form)}
                        {effect_ == "Field Effect" && passive_ability.hide_field != true ?
                            makefield("require_")
                        : ""}
                        {effect__1 == "" && passive_ability.field == undefined ? "" : require__1 != "" ? ReplacerCharacter(`\xa0┬ ${require__1}\n`, {formatting:formatting}) : ""}
                        {ReplacerCharacter(effect_display_pars(effect_, effect__1, require_, require__1, 2),form)}
                        {effect__1 == "Field Effect" && passive_ability.hide_field != true ?
                            makefield("require__1")
                        : ""}
                        {effect__1 != "Field Effect" && effect_ != "Field Effect" && passive_ability.hide_field != true && passive_ability.field != undefined ?
                            makefield(`cond_id`)
                        : ""}
                    </>
                : ""}
                {battle_state != true && passive_ability.attached != undefined ?
                    passive_ability.attached.map((self,i) =>(
                        <PassiveEffectsHandoff
                            key={i}
                            passive_ability={Object.values(self)[0]}

                            master_index={master_index}
                            ver={ver}

                            formatting={formatting}
                            attached={true}
                        />
                    ))
                : ""}
            </div>
            {pass_default == true && passive_ability.loc_tag != undefined ?
                    <div className="p_note">
                        <div className="orangebar">{`Requires:`}</div>
                        {ReplacerCharacter(` - Active <${passive_ability.loc_tag}> [${ver == "GL" ? passive_ability.name : passive_ability.glname}] #${passive_ability.pa_id}`,{formatting:formatting})}
                    </div>
            : ""}

            {battle_state != true || attached != true ?
                ending
            :""}
                
            {showraw == true ?
                <div className='react-json-view'>
                    <ObjectView
                    options={
                        {
                            hideDataTypes: true,
                            expandLevel: 1
                        }
                        }
                    data={passive_ability} />
                </div>
            : ""}
            </>
        )
    }
}