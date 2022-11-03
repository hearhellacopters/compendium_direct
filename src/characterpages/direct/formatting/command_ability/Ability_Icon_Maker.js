const Ability_Icon_Maker = (
    type_,
    att,
    rank,
    red_flag, 
    chara_id,
    char_id_index,
    type_index,
    attack_type_index,
    UseNum,
    Counter,
    Trap,
    FollowUp
)=>{

    var final_str = ""

    var typepull = type_index[type_] && type_index[type_].type_

    var attpull = attack_type_index[att] && attack_type_index[att].attack_type_

    var green_check = false

    final_str = `icons/buttons/ability/Ability_${typepull == "Battery" ? "Battery" : typepull == "Debuff" ? "Debuff" : typepull == "Heal" ? "Heal" : typepull == "Tank" ? "Tank" : attpull}${typepull == "HP" ? "_HP" : "_BRV"}${red_flag == 1 ? "_Red" : "_Blue"}`

    if(UseNum == 0 ||
       (Counter == true ||
        Trap==true ||
        FollowUp==true
        )){
        green_check = true
    }

    if( rank == "S1" ||
    rank == "S2" ||
    rank == "AA" ||
    rank == "EX" ||
    rank == "LD" ||
    (Counter == true ||
        Trap==true ||
        FollowUp==true
        )
    ){
        if(green_check == true){
            final_str = final_str.replace(/_Red/gm,"_Green").replace(/_Blue/gm,"_Green")
        }
}

    if(rank == "Call 75"){
        var characterpull = char_id_index[chara_id] && char_id_index[chara_id].name
        if(characterpull != undefined){
            final_str = `characters/${characterpull.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"")}/75c`
        }
    }

    if(rank == "Call LD"){
        characterpull = char_id_index[chara_id] && char_id_index[chara_id].name
        if(characterpull != undefined){
            final_str = `characters/${characterpull.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"")}/ldc`
        }
    }

    if(rank == "BT"){
        final_str = `icons/buttons/ability/Ability_${typepull == "Battery" ? "Battery" : typepull == "Debuff" ? "Debuff" : typepull == "Heal" ? "Heal" : typepull == "Tank" ? "Tank" : attpull}${typepull == "HP" ? "_HP" : "_BRV"}_Burst`
        if(green_check == true){
            final_str = final_str.replace(/_Burst/gm,"_Green")
        }
    }

    if(rank == "BT+"){
        final_str = `icons/buttons/ability/Ability_${typepull == "Battery" ? "Battery" : typepull == "Debuff" ? "Debuff" : typepull == "Heal" ? "Heal" : typepull == "Tank" ? "Tank" : attpull}${typepull == "HP" ? "_HP" : "_BRV"}_Burst+`
        if(green_check == true){
            final_str = final_str.replace(/_Burst\+/gm,"_Green")
        }
    }

    if(rank == "FR"){
        final_str = `icons/buttons/ability/Ability_${typepull == "Battery" ? "Battery" : typepull == "Debuff" ? "Debuff" : typepull == "Heal" ? "Heal" : typepull == "Tank" ? "Tank" : attpull}${typepull == "HP" ? "_HP" : "_BRV"}_Force`
        if(green_check == true){
            final_str = final_str.replace(/_Force/gm,"_Green")
        }
    }
    if(rank == "FRExt"){
        final_str = `icons/buttons/ability/Ability_${typepull == "Battery" ? "Battery" : typepull == "Debuff" ? "Debuff" : typepull == "Heal" ? "Heal" : typepull == "Tank" ? "Tank" : attpull}${typepull == "HP" ? "_HP" : "_BRV"}_ForceExt`
        if(green_check == true){
            final_str = final_str.replace(/_ForceExt/gm,"_Green")
        }
    }

    if(Trap == true){
        final_str = `icons/buttons/ability/Ability_Trap${typepull == "HP" ? "_HP" : "_BRV"}_Green`
    }

    return(
        final_str
    )
}
export default Ability_Icon_Maker