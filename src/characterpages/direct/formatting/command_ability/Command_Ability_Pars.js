import Killer_Cond_Handler from './Killer_Cond_Handler';
import Killer_ID_Handler from './Killer_ID_Handler';
import Ailment_Cond_Handler from './Ailment_Cond_Handler'

const Command_Ability_Pars = (
    command_ability,
    ver,

    CastNames,
    enemy_type,
    cast_targets,
    char_id,
    passivenames,
    equipmentpassivenames,
    AilmentNames,
    CommandNames,
    CondData,
    MessageData_Category,
    MessageData_FFSeries,

    ailment_group,
    command_group,
    enemy_resist,

    type_,
    attack_type_,
    target_range_,
    target_type_,
    auto_target_type_,
    killer_cond,
    killer_cond_1,
    killer_type,
    cast_target,
    ailment_cond,
    ailment_cond_14,
    command_type,
)=>{

    const pulltr = target_range_[command_ability.tr] && target_range_[command_ability.tr].target_range_
    var target_range_str = `Target: ${pulltr}`
    const pullttype = target_type_[command_ability.ttype] && target_type_[command_ability.ttype].target_type_
    var target_type_str = `*Program Target: ${pullttype}`
    const pullattype = auto_target_type_[command_ability.attype] && auto_target_type_[command_ability.attype].auto_target_type_
    var auto_target_type_str = `*Auto Target: ${pullattype}`
    if(command_ability.show == 0){
        var show_str = "*Doesn't display banner"
    }
    var cost_str = `${command_ability.cost == 0 ? "*Instant Turn Rate" : `Turn Rate: ${command_ability.cost}`}`
    if(command_ability.blow == 0 || command_ability.command_type == 7){
        var blow_str = "*Can not knock back"
    }
    var stun_str = command_ability.stun == 50 ? "Initiates a <Knock Back>" : command_ability.blow == 0 ? "" : command_ability.command_type == 7 ? "" : `Chase +${command_ability.stun}`
    if(command_ability.kcon != undefined){
        var kcon_str = Killer_Cond_Handler(
            command_ability.kcon,
            command_ability.karg,
            command_ability.keff,
            command_ability.sarg,

            killer_cond,
            killer_cond_1,
            AilmentNames,
        )
    }
    if(command_ability.kcon_1 != undefined && command_ability.kcon_1 != -1){
        var kcon_1_str = Killer_Cond_Handler(
            command_ability.kcon_1,
            command_ability.karg_1,
            command_ability.keff_1,
            command_ability.sarg_1,

            killer_cond,
            killer_cond_1,
            AilmentNames,
        )
    }
    if(command_ability.nasp == 1){
        var nasp_str = "*No Free Uses"
    }
    if(command_ability.nex == 1){
        var nex_str = "*Does not charge EX"
    }
    if(command_ability.nsum == 1){
        var nsum_str = "*Does not charge Summon"
    }
    if(command_ability.nabi == 1){
        var nabi_str = "*Does not consume ability use"
    }
    if(command_ability.kid != undefined){
        var kid_str = Killer_ID_Handler(
            command_ability.kid,
            command_ability.sarg,
            command_ability.keff,

            killer_type
        )
    }
    if(command_ability.kid_1 != undefined){
        var kid_1_str = Killer_ID_Handler(
            command_ability.kid_1,
            command_ability.sarg_1,
            command_ability.keff_1,

            killer_type
        )
    }
    if(command_ability.exshow == 0){
        var exshow_str = "*Does not show EX charge"
    }
    if(command_ability.ncharge == 1){
        var ncharge_str = "*Does not charge cast bar"
    }
    if(command_ability.showadd == 0){
        var showadd_str = "*Does not display in additional banner"
    }
    if(command_ability.stunadd == 1){
        var stunadd_str = "*Deals Chase damage again"
    }
    if(command_ability.bdlur != undefined){
        const brv_dmg_cap = Math.round(((command_ability.bdlur/100)+1)*9999)
        var bdlur_str = `BRV Damage Cap Up by ${command_ability.bdlur}% (${brv_dmg_cap.toLocaleString()})`
    }
    if(command_ability.mblur != undefined){
        const max_dmg_cap = Math.round(((command_ability.mblur/100)+1)*99999)
        var mblur_str = `MAX BRV Cap Up by ${command_ability.mblur}% (${max_dmg_cap.toLocaleString()})`
    }
    if(command_ability.faf == 1){
        var faf_str = "Increases BRV damage to single targets by 60%"
    }

    const cast_list = []

    if(command_ability.atype_str != undefined){
        if(command_ability.acond != undefined){
            var cond = Ailment_Cond_Handler(
                command_ability.acond,
                command_ability.acarg,

                ailment_cond,
                ailment_cond_14,
                AilmentNames,
                ailment_group,
                CondData
            )
        }
        var atype = command_ability.atype
        var ahit = command_ability.ahit
        cast_list.push({
            id: `0_${atype}`, 
            cast_str: command_ability.atype_str,
            cond: cond,
            hit: ahit
        })
    }
    if(command_ability.atype_1_str != undefined){
        if(command_ability.acond_1 != undefined){
            var cond_1 = Ailment_Cond_Handler(
                command_ability.acond_1,
                command_ability.acarg_1,

                ailment_cond,
                ailment_cond_14,
                AilmentNames,
                ailment_group,
                CondData
            )
        }
        var atype_1 = command_ability.atype_1
        var ahit_1 = command_ability.ahit_1
        cast_list.push({
            id: `1_${atype_1}`, 
            cast_str: command_ability.atype_1_str,
            cond: cond_1,
            hit: ahit_1
        })
    }
    if(command_ability.atype_2_str != undefined){
        if(command_ability.acond_2 != undefined){
            var cond_2 = Ailment_Cond_Handler(
                command_ability.acond_2,
                command_ability.acarg_2,

                ailment_cond,
                ailment_cond_14,
                AilmentNames,
                ailment_group,
                CondData
            )
        }
        var atype_2 = command_ability.atype_2
        var ahit_2 = command_ability.ahit_2
        cast_list.push({
            id: `2_${atype_2}`, 
            cast_str: command_ability.atype_2_str,
            cond: cond_2,
            hit: ahit_2
        })
    }
    if(command_ability.atype_3_str != undefined){
        if(command_ability.acond_3 != undefined){
            var cond_3 = Ailment_Cond_Handler(
                command_ability.acond_3,
                command_ability.acarg_3,

                ailment_cond,
                ailment_cond_14,
                AilmentNames,
                ailment_group,
                CondData
            )
        }
        var atype_3 = command_ability.atype_3
        var ahit_3 = command_ability.ahit_3
        cast_list.push({
            id: `3_${atype_3}`, 
            cast_str: command_ability.atype_3_str,
            cond: cond_3,
            hit: ahit_3
        })
    }
    if(command_ability.atype_4_str != undefined){
        if(command_ability.acond_4 != undefined){
            var cond_4 = Ailment_Cond_Handler(
                command_ability.acond_4,
                command_ability.acarg_4,

                ailment_cond,
                ailment_cond_14,
                AilmentNames,
                ailment_group,
                CondData
            )
        }
        var atype_4 = command_ability.atype_4
        var ahit_4 = command_ability.ahit_4
        cast_list.push({
            id: `4_${atype_4}`, 
            cast_str: command_ability.atype_4_str,
            cond: cond_4,
            hit: ahit_4
        })
    }
    if(command_ability.atype_5_str != undefined){
        if(command_ability.acond_5 != undefined){
            var cond_5 = Ailment_Cond_Handler(
                command_ability.acond_5,
                command_ability.acarg_5,

                ailment_cond,
                ailment_cond_14,
                AilmentNames,
                ailment_group,
                CondData
            )
        }
        var atype_5 = command_ability.atype_5
        var ahit_5 = command_ability.ahit_5
        cast_list.push({
            id: `5_${atype_5}`, 
            cast_str: command_ability.atype_5_str,
            cond: cond_5,
            hit: ahit_5
        })
    }
    if(command_ability.atype_6_str != undefined){
        if(command_ability.acond_6 != undefined){
            var cond_6 = Ailment_Cond_Handler(
                command_ability.acond_6,
                command_ability.acarg_6,

                ailment_cond,
                ailment_cond_14,
                AilmentNames,
                ailment_group,
                CondData
            )
        }
        var atype_6 = command_ability.atype_6
        var ahit_6 = command_ability.ahit_6
        cast_list.push({
            id: `6_${atype_6}`, 
            cast_str: command_ability.atype_6_str,
            cond: cond_6,
            hit: ahit_6
        })
    }
    if(command_ability.atype_7_str != undefined){
        if(command_ability.acond_7 != undefined){
            var cond_7 = Ailment_Cond_Handler(
                command_ability.acond_7,
                command_ability.acarg_7,

                ailment_cond,
                ailment_cond_14,
                AilmentNames,
                ailment_group,
                CondData
            )
        }
        var atype_7 = command_ability.atype_7
        var ahit_7 = command_ability.ahit_7
        cast_list.push({
            id: `7_${atype_7}`, 
            cast_str: command_ability.atype_7_str,
            cond: cond_7,
            hit: ahit_7
        })
    }
    if(command_ability.atype_8_str != undefined){
        if(command_ability.acond_8 != undefined){
            var cond_8 = Ailment_Cond_Handler(
                command_ability.acond_8,
                command_ability.acarg_8,

                ailment_cond,
                ailment_cond_14,
                AilmentNames,
                ailment_group,
                CondData
            )
        }
        var atype_8 = command_ability.atype_8
        var ahit_8 = command_ability.ahit_8
        cast_list.push({
            id: `8_${atype_8}`, 
            cast_str: command_ability.atype_8_str,
            cond: cond_8,
            hit: ahit_8
        })
    }
    if(command_ability.atype_9_str != undefined){
        if(command_ability.acond_9 != undefined){
            var cond_9 = Ailment_Cond_Handler(
                command_ability.acond_9,
                command_ability.acarg_9,

                ailment_cond,
                ailment_cond_14,
                AilmentNames,
                ailment_group,
                CondData
            )
        }
        var atype_9 = command_ability.atype_9
        var ahit_9 = command_ability.ahit_9
        cast_list.push({
            id: `9_${atype_9}`, 
            cast_str: command_ability.atype_9_str,
            cond: cond_9,
            hit: ahit_9
        })
    }

    const return_var = {
        target_range_: target_range_str,
        target_type_: target_type_str,
        auto_target_type_: auto_target_type_str,
        show: show_str,
        cost: cost_str,
        blow: blow_str,
        stun: stun_str,
        kcon: kcon_str,
        kcon_1: kcon_1_str,
        nasp: nasp_str,
        nex: nex_str,
        nsum: nsum_str,
        nabi: nabi_str,
        kid: kid_str,
        kid_1: kid_1_str,
        exshow: exshow_str,
        ncharge: ncharge_str,
        showadd: showadd_str,
        stunadd: stunadd_str,
        bdlur: bdlur_str,
        mblur: mblur_str,
        faf: faf_str,
        cast_list: cast_list
    }
        
    return(
        return_var
    )
}
export default Command_Ability_Pars