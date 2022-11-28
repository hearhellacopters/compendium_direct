import option_label_pars from './option_label_pars'

const options_trans_handler =(
    enemy_or_char,
    option_data,
    solor_or_attached,
    show_ids,

    master_index,
    ver,

)=>{

    const option_labels = master_index.option_trans_data.option_labels
    const option_type_ = master_index.option_trans_data.option_type_
    const CommandNames = master_index.commands

    const EX_rename =(data)=>{
        let replacement = data
        replacement = data == undefined ? "" : data.replace(/EX/,"EXrank")
        replacement = replacement == "" ? "" : replacement.replace(/BRV/,"brvattackicon")
        replacement = replacement == "" ? "" : replacement.replace(/HP/,"hpattackicon")
        replacement = replacement == "" ? "" : replacement.replace(/ /,"_")
        return replacement
    }

    var title_str = ""

    if(solor_or_attached == "solo"){
       var comd1 = CommandNames[option_data.original_label_] && CommandNames[option_data.original_label_].name
       var rank1 = CommandNames[option_data.original_label_] && CommandNames[option_data.original_label_].rank
       if(comd1 == undefined){
        comd1 = `ID #${option_data.original_label_}`
       }
       var comd2 = CommandNames[option_data.change_label_] && CommandNames[option_data.change_label_].name
       var rank2 = CommandNames[option_data.change_label_] && CommandNames[option_data.change_label_].rank
       if(comd2 == undefined){
        comd2 = `ID #${option_data.change_label_}`
       }
       var typepull = option_type_[option_data.option_type_] && option_type_[option_data.option_type_].option_str
       if(typepull == undefined){
        typepull = `Type #${option_data.option_type_}`
       }
       title_str = `<${EX_rename(rank1)}> [${comd1}]${show_ids == true ? ` #${option_data.original_label_}` :""} ${typepull} [${comd2}]${show_ids == true ? ` <${EX_rename(rank2)}> #${option_data.change_label_}` :""}`
    }
    if(solor_or_attached == "attached"){
        comd1 = CommandNames[option_data.original_label_] && CommandNames[option_data.original_label_].name
        rank1 = CommandNames[option_data.original_label_] && CommandNames[option_data.original_label_].rank
       if(comd1 == undefined){
        comd1 = `ID #${option_data.original_label_}`
       }
       comd2 = CommandNames[option_data.change_label_] && CommandNames[option_data.change_label_].name
       rank2 = CommandNames[option_data.change_label_] && CommandNames[option_data.change_label_].rank
       if(comd2 == undefined){
        comd2 = `ID #${option_data.change_label_}`
       }
       if(enemy_or_char == "character"){
        typepull = option_type_[option_data.option_type_] && option_type_[option_data.option_type_].option_type_
        if(typepull == undefined){
         typepull = `Type #${option_data.option_type_}`
        }
        title_str = `${typepull} <${EX_rename(rank1)}> [${comd1}]${show_ids == true ? ` #${option_data.original_label_}` :""}`
       }
       if(enemy_or_char == "enemy"){
        typepull = option_type_[option_data.option_type_] && option_type_[option_data.option_type_].enemy_str
        if(typepull == undefined){
         typepull = `Type #${option_data.option_type_}`
        }
        title_str = `${typepull} [${comd2}]${show_ids == true ? ` #${option_data.change_label_}` :""}`
       }
    }

    var label_str = ""

    var label1_pull = option_data.require_label_ && option_labels[option_data.require_label_]

    var label2_pull = option_data.require_label2_ && option_labels[option_data.require_label2_]

    var effect_str1 = ""

    var effect_str2 = ""

    if(label1_pull != undefined){
        effect_str1 = option_label_pars(
            option_data.require_label_,
            option_data.require_valueA_,
            option_data.require_valueB_,
            option_data.require_valueC_,
            option_data.require_target_,
            option_data.original_label_,

            master_index,
            ver,

        )
    }

    if(label2_pull != undefined){
        effect_str2 = option_label_pars(
            option_data.require_label2_,
            option_data.require_value2A_,
            option_data.require_value2B_,
            option_data.require_value2C_,
            option_data.require_target2_,
            option_data.original_label_,

            master_index,
            ver,
        )
    }

    if(effect_str1 != ""){
        label_str = effect_str1
    }

    if(effect_str2 != ""){
        if(label_str != ""){
            label_str += ` & ${effect_str2}`
        } else {
            label_str = effect_str2
        }
    }

    var table = {
        title_str: title_str,
        label_str: label_str,
        passives: option_data.passives != undefined ? option_data.passives : [],
        type: option_data.option_type_
    }

 return (
    table
 )   
}
export default options_trans_handler