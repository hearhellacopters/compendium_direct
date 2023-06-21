export default function ability_icon_maker(
    ability,

    master_index,
    ver,

    UseNum,
){
    const red_flag = ability.LD == true ? 1 :
                     ability.EX == true ? 1 :
                     ability.CallLD == true ? 1 :
                     ability.disp_flag_

    if(ability && ability.command == undefined){
        return `icons/buttons/ability/Ability_Unknown_${red_flag == 1 ? "Red" : "Blue"}`
    }

    const type_ = ability.command && ability.command.type_
    const att =  ability.command && ability.command.att
    const rank = ability.command && ability.command.rank

    const chara_id = ability.charaID

    const Counter = ability.Counter

    const Trap = ability.Trap

    const FollowUp = ability.FollowUp 

    const char_id_index = master_index.charid
    const type_index = master_index.command_data_trans.type_
    const attack_type_index = master_index.command_data_trans.attack_type_

    var final_str = ""

    var typepull = type_index[type_] && type_index[type_].type_

    var attpull = attack_type_index[att] && attack_type_index[att].attack_type_

    var green_check = false

    final_str = `icons/buttons/ability/Ability_${typepull == "Battery" ? "Battery" : typepull == "Debuff" ? "Debuff" : typepull == "Heal" ? "Heal" : typepull == "Tank" ? "Tank" : attpull}${typepull == "HP" ? "_HP" : "_BRV"}${red_flag == 1 ? "_Red" : "_Blue"}`

    if (UseNum == 0 ||
        (Counter == true ||
            Trap == true ||
            FollowUp == true
        )) {
        green_check = true
    }

    if (rank == "S1" ||
        rank == "S2" ||
        rank == "AA" ||
        rank == "EX" ||
        rank == "LD" ||
        (Counter == true ||
            Trap == true ||
            FollowUp == true
        )
    ) {
        if (green_check == true) {
            final_str = final_str.replace(/_Red/gm, "_Green").replace(/_Blue/gm, "_Green")
        }
    }

    if (rank == "Call 75") {
        var characterpull = char_id_index[chara_id] && char_id_index[chara_id].CharacterURLName
        if (characterpull != undefined) {
            final_str = `characters/${characterpull}/75c`
        }
    }

    if (rank == "Call LD") {
        characterpull = char_id_index[chara_id] && char_id_index[chara_id].CharacterURLName
        if (characterpull != undefined) {
            final_str = `characters/${characterpull}/ldc`
        }
    }

    if (rank == "BT") {
        final_str = `icons/buttons/ability/Ability_${typepull == "Battery" ? "Battery" : typepull == "Debuff" ? "Debuff" : typepull == "Heal" ? "Heal" : typepull == "Tank" ? "Tank" : attpull}${typepull == "HP" ? "_HP" : "_BRV"}_Burst`
        if (green_check == true) {
            final_str = final_str.replace(/_Burst/gm, "_Green")
        }
    }

    if (rank == "BT+") {
        final_str = `icons/buttons/ability/Ability_${typepull == "Battery" ? "Battery" : typepull == "Debuff" ? "Debuff" : typepull == "Heal" ? "Heal" : typepull == "Tank" ? "Tank" : attpull}${typepull == "HP" ? "_HP" : "_BRV"}_Burst+`
        if (green_check == true) {
            final_str = final_str.replace(/_Burst\+/gm, "_Green")
        }
    }

    if (rank == "FR") {
        final_str = `icons/buttons/ability/Ability_${typepull == "Battery" ? "Battery" : typepull == "Debuff" ? "Debuff" : typepull == "Heal" ? "Heal" : typepull == "Tank" ? "Tank" : attpull}${typepull == "HP" ? "_HP" : "_BRV"}_Force`
        if (green_check == true) {
            final_str = final_str.replace(/_Force/gm, "_Green")
        }
    }
    if (rank == "FRExt") {
        final_str = `icons/buttons/ability/Ability_${typepull == "Battery" ? "Battery" : typepull == "Debuff" ? "Debuff" : typepull == "Heal" ? "Heal" : typepull == "Tank" ? "Tank" : attpull}${typepull == "HP" ? "_HP" : "_BRV"}_ForceExt`
        if (green_check == true) {
            final_str = final_str.replace(/_ForceExt/gm, "_Green")
        }
    }
    if (rank == "Crystal") {
        final_str = `icons/buttons/ability/Ability_${typepull == "Battery" ? "Battery" : typepull == "Debuff" ? "Debuff" : typepull == "Heal" ? "Heal" : typepull == "Tank" ? "Tank" : attpull}${typepull == "HP" ? "_HP" : "_BRV"}_Crystal`
        if (green_check == true) {
            final_str = final_str.replace(/_Crystal/gm, "_Green")
        }
    }

    if (Trap == true) {
        final_str = `icons/buttons/ability/Ability_Trap${typepull == "HP" ? "_HP" : "_BRV"}_Green`
    }

    return (
        final_str
    )
}