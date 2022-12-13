import Killer_Cond_Handler from './Killer_Cond_Handler';
import Killer_ID_Handler from './Killer_ID_Handler';
import Ailment_Cond_Handler from './Ailment_Cond_Handler'

const Command_Ability_Pars = (
    command_ability,
    ver,

    master_index,
) => {

    const target_range_ = master_index.command_data_trans.target_range_
    const target_type_ = master_index.command_data_trans.target_type_
    const auto_target_type_ = master_index.command_data_trans.auto_target_type_

    const pulltr = target_range_[command_ability.tr] && target_range_[command_ability.tr].target_range_
    var target_range_str = `Target: ${pulltr}`
    const pullttype = target_type_[command_ability.ttype] && target_type_[command_ability.ttype].target_type_
    var target_type_str = `*Program Target: ${pullttype}`
    const pullattype = auto_target_type_[command_ability.attype] && auto_target_type_[command_ability.attype].auto_target_type_
    var auto_target_type_str = `*Auto Target: ${pullattype}`
    if (command_ability.show == 0) {
        var show_str = "*Doesn't display banner"
    }
    var cost_str = `${command_ability.cost == 0 ? "*Instant Turn Rate" : `Turn Rate: -${command_ability.cost}`}`
    if (command_ability.blow == 0 || command_ability.command_type == 7) {
        var blow_str = "*Can not knock back"
    }
    var stun_str = command_ability.stun == 50 ? "Initiates a <Knock Back>" : command_ability.blow == 0 ? undefined : command_ability.command_type == 7 ? undefined : `Chase +${command_ability.stun}`
    if (command_ability.kcon != undefined) {
        var kcon_str = Killer_Cond_Handler(
            command_ability.kcon,
            command_ability.karg,
            command_ability.keff,
            command_ability.sarg,

            master_index,
            ver,
        )
    }
    if (command_ability.kcon_1 != undefined && command_ability.kcon_1 != -1) {
        var kcon_1_str = Killer_Cond_Handler(
            command_ability.kcon_1,
            command_ability.karg_1,
            command_ability.keff_1,
            command_ability.sarg_1,

            master_index,
            ver,
        )
    }
    if (command_ability.nasp == 1) {
        var nasp_str = "*No Free Uses"
    }
    if (command_ability.nex == 1) {
        var nex_str = "*Does not charge EX"
    }
    if (command_ability.nsum == 1) {
        var nsum_str = "*Does not charge Summon"
    }
    if (command_ability.nabi == 1) {
        var nabi_str = "*Does not consume ability use"
    }
    if (command_ability.kid != undefined) {
        var kid_str = Killer_ID_Handler(
            command_ability.kid,
            command_ability.sarg,
            command_ability.keff,

            master_index,
            ver,
        )
    }
    if (command_ability.kid_1 != undefined) {
        var kid_1_str = Killer_ID_Handler(
            command_ability.kid_1,
            command_ability.sarg_1,
            command_ability.keff_1,

            master_index,
            ver,
        )
    }
    if (command_ability.exshow == 0) {
        var exshow_str = "*Does not show EX charge"
    }
    if (command_ability.ncharge == 1) {
        var ncharge_str = "*Does not charge cast bar"
    }
    if (command_ability.showadd == 0) {
        var showadd_str = "*Does not display in additional banner"
    }
    if (command_ability.stunadd == 1) {
        var stunadd_str = "*Deals Chase damage again"
    }
    if (command_ability.bdlur != undefined) {
        const brv_dmg_cap = Math.round(((command_ability.bdlur / 100) + 1) * 9999)
        var bdlur_str = `BRV Damage Cap Up by ${command_ability.bdlur}% (${brv_dmg_cap.toLocaleString()})`
    }
    if (command_ability.mblur != undefined) {
        const max_dmg_cap = Math.round(((command_ability.mblur / 100) + 1) * 99999)
        var mblur_str = `MAX BRV Cap Up by ${command_ability.mblur}% (${max_dmg_cap.toLocaleString()})`
    }
    if (command_ability.faf == 1) {
        var faf_str = "Increases BRV damage to single targets by 60%"
    }

    const cast_list = []

    for (let index = 0; index < 10; index++) {
        const atype_str = command_ability[`atype${index == 0 ? "" : `_${index}`}_str`]
        const atype = command_ability[`atype${index == 0 ? "" : `_${index}`}`]
        const acond = command_ability[`acond${index == 0 ? "" : `_${index}`}`]
        const acarg = command_ability[`acarg${index == 0 ? "" : `_${index}`}`]
        var ahit = command_ability[`ahit${index == 0 ? "" : `_${index}`}`]
        if (atype_str != undefined) {
            if (acond != undefined) {
                var cond = Ailment_Cond_Handler(
                    acond,
                    acarg,

                    master_index,
                    ver,
                )
            }
            cast_list.push({
                id: `${index}_${atype}`,
                cast_str: atype_str,
                cond: cond,
                hit: ahit
            })
        }
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

    return (
        return_var
    )
}
export default Command_Ability_Pars