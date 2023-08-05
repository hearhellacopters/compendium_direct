import React, { useState } from "react";
import passive_ability_handler from "../../processing/passives/passive_ability_handler";
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

    const passive_trans = passive_ability_handler(
        passive_ability,
        master_index,
        ver,
        battle_state,
        use_ailment
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

    if (passive_ability.attached == undefined && 
        passive_trans.require_ == "" && 
        passive_trans.require__1 == "" && 
        passive_trans.effect_ == "" && 
        passive_trans.effect__1 == "" && 
        (passive_ability.field == undefined || passive_ability.hide_field == true)
        ) {
        return ("")
    } else {

        var pass_display = ""

        if(passive_ability.passive_cond_type == 1 && 
            (passive_trans.effect_ != "" || 
             passive_trans.effect__1 != "" || 
             passive_ability.field != undefined)
            ){
                pass_display =  <>
                                    {ReplacerCharacter(passive_trans.require_,{formatting:formatting})}
                                    {passive_trans.effect_.includes("Field Effect") ? "" : ReplacerCharacter(passive_trans.effect_,form)}
                                    {passive_trans.effect_.includes("Field Effect") && 
                                    passive_ability.hide_field != true ?
                                        makefield("require_")
                                    : ""}
                                    {passive_trans.effect__1.includes("Field Effect") ? "" : ReplacerCharacter(passive_trans.effect__1,form)}
                                    {passive_trans.effect__1.includes("Field Effect") && 
                                    passive_ability.hide_field != true ?
                                        makefield("require__1")
                                    : ""}
                                </>
        } else
        if(passive_ability.passive_cond_type == 3 && 
            (passive_trans.effect_ != "" || 
            passive_trans.effect__1 != "" || 
            passive_ability.field != undefined)
            ){
                pass_display =  <>
                                    {ReplacerCharacter(passive_trans.require_, {formatting:formatting})}
                                    {passive_trans.effect_.includes("Field Effect") ? "" : ReplacerCharacter(passive_trans.effect_,form)}
                                    {passive_trans.effect_.includes("Field Effect") && 
                                    passive_ability.hide_field != true ?
                                        makefield("require_")
                                    : ""}
                                    {passive_trans.effect__1.includes("Field Effect") ? "" :  ReplacerCharacter(passive_trans.effect__1,form)}
                                    {passive_trans.effect__1.includes("Field Effect") && 
                                    passive_ability.hide_field != true ?
                                        makefield("require__1")
                                    : ""}
                                    {passive_trans.effect__1.includes("Field Effect") != true && 
                                    passive_trans.effect_.includes("Field Effect") != true && 
                                    passive_ability.hide_field != true && 
                                    passive_ability.field != undefined ?
                                        makefield(``)
                                    : ""}
                                </>
        }
        if(passive_ability.passive_cond_type == 2){
            pass_display = <>
                                {ReplacerCharacter(passive_trans.require_, {formatting:formatting})}
                                {passive_trans.effect_.includes("Field Effect") ? "" : ReplacerCharacter(passive_trans.effect_,form)}
                                {passive_trans.effect_.includes("Field Effect") && passive_ability.hide_field != true ?
                                    makefield("require_")
                                : ""}
                                {ReplacerCharacter(passive_trans.require__1, {formatting:formatting})}
                                {passive_trans.effect__1.includes("Field Effect") ? "" :  ReplacerCharacter(passive_trans.effect__1,form)}
                                {passive_trans.effect__1.includes("Field Effect") && 
                                passive_ability.hide_field != true ?
                                    makefield("require__1")
                                : ""}
                                {passive_trans.effect__1.includes("Field Effect") != true && 
                                passive_trans.effect_.includes("Field Effect") != true && 
                                passive_ability.hide_field != true && 
                                passive_ability.field != undefined ?
                                    makefield(`cond_id`)
                                : ""}
                            </>
        }
        
        return (
            <>
            <div onClick={showmeraw} className={pass_default != true ? "" : `subpassiveflair cast_str`}>
                {battle_state != true ? "" : (hide_disp == true || passive_ability.loc_tag == merged) ? "" :
                    ReplacerCharacter(`From <${passive_ability.loc_tag}>\n`,{formatting:formatting})
                }

                {pass_display}

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
                        {ReplacerCharacter(passive_trans.active,{formatting:formatting})}
                    </div>
            : ""}

            {battle_state != true || attached != true ?
                <>
                    {passive_trans.restrict_type != "" ?
                        <div>
                            {passive_trans.restrict_type}
                        </div>
                    : ""}
                    {passive_trans.type_ != "" ?
                        <div>
                            {passive_trans.type_}
                        </div>
                    : ""}
                    {passive_trans.required_equip_pa_id != "" ?
                        <div>
                            {ReplacerCharacter(passive_trans.required_equip_pa_id)}
                        </div>
                    : ""}
                </>  
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