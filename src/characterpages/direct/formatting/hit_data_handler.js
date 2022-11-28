import val_edit_type from "./val_edit_type_handler"
import element_bit from "../../../processing/element_bit_"

const hit_data_handler =(
    hit_data,

    master_index,
    ver,

    faf,
    bdlur,
    mblur,
    hit_num
)=>{

    const type_id = hit_data.type_id
    const attack_type_id = hit_data.a_type_id
    const brave_rate_numerator = hit_data.num
    const brave_rate_denominator = hit_data.den
    const over_max_brv_rate_ = hit_data.overflow
    const over_max_brv_rate_with_break_ = hit_data.overflow_break
    const single_hit_brave_rate_up_ = hit_data.single_hit
    const brv_damage_limit_up_direct_ = hit_data.b_up_direct_
    const brv_damage_limit_up_rate_ = hit_data.b_up_rate_
    const max_brv_limit_up_direct_ = hit_data.m_up_direct_
    const max_brv_limit_up_rate_ = hit_data.m_up_rate_
    const element_bit_ = hit_data.bit_
    const hit_se_id = hit_data.hit_se_id
    const hit_effect_id = hit_data.hit_effect_id
    const ability_target_id = hit_data.a_target
    const effect_id = hit_data.effect_id
    const effect_value_type_id = hit_data.effect_type
    var m_nARG = hit_data.m_nARG
    const m_nARG_1 = hit_data.m_nARG_1
    const m_nARG_2 = hit_data.m_nARG_2
    const m_nARG_3 = hit_data.m_nARG_3
    const m_nARG_4 = hit_data.m_nARG_4

    const hit_effect_id_data = master_index.hit_trans_data.hit_effect_id
    const ability_target_id_data = master_index.hit_trans_data.ability_target_id
    const type_id_data = master_index.hit_trans_data.type_id
    const attack_type_id_data = master_index.hit_trans_data.attack_type_id
    const effect_value_type_id_data = master_index.hit_trans_data.effect_value_type_id
    const CommandNames = master_index.commands
    const AilmentNames = master_index.ailments
    const ailment_group = master_index.ailment_group_full[ver]
    const command_group = master_index.command_group_full[ver]
    const enemy_resist = master_index.enemy_resist_full[ver]

    var effect_str = ""

    const effpull = hit_effect_id_data[effect_id]

    const value_trans = hit_effect_id_data[effect_id] && hit_effect_id_data[effect_id].value_trans

    const count = type_id_data[type_id] && type_id_data[type_id].hit_count

    const times = type_id_data[type_id] && type_id_data[type_id].times_count

    if(effect_id != undefined){
        if(effpull == undefined){
            effect_str = `UNKNOWN${effect_id} [target] [effect_value_type] [m_nARG] - [m_nARG_1] - [m_nARG_2] - [m_nARG_3] - [m_nARG_4]`
        } else {
            effect_str = hit_effect_id_data[effect_id].effect_str
        }
    }

    var ove_str =""

    if(over_max_brv_rate_ && over_max_brv_rate_ > 0 && over_max_brv_rate_ != 100 && mblur == undefined && over_max_brv_rate_ <= 998){
        if(count == true){
            ove_str = `Allows for ${over_max_brv_rate_}% Stolen MAX BRV Overflow${over_max_brv_rate_with_break_  && over_max_brv_rate_with_break_ != 0 ? `, on BREAK: ${over_max_brv_rate_ +over_max_brv_rate_with_break_}%`: "" }`     
        } else {
            ove_str = `Allows for ${over_max_brv_rate_}% Gained MAX BRV Overflow`
        }
    }

    if(effect_id == 116){
        ove_str = `Allows for ${m_nARG_1}% Stolen MAX BRV Overflow${over_max_brv_rate_with_break_  && over_max_brv_rate_with_break_ != 0 ? `, on BREAK: ${m_nARG_1 +over_max_brv_rate_with_break_}%`: "" }`     
    }
    if(effect_id == 106){
        ove_str = `Allows for ${m_nARG}% Stolen MAX BRV Overflow${over_max_brv_rate_with_break_  && over_max_brv_rate_with_break_ != 0 ? `, on BREAK: ${m_nARG +over_max_brv_rate_with_break_}%`: "" }`  
        effect_str = ""
    }

    var pot_str = ""

    var pot_cent = Math.round((brave_rate_numerator/brave_rate_denominator)*100)
    
    if(count == true){
        pot_str = `BRV potency of ${pot_cent}% per hit`
    }

    if(ability_target_id == 5){
        if(type_id == 19){
            pot_str = "Deals Split <HP> Damage to all targets"
        }
        if(type_id == 2){
            pot_str = "Deals Split <HP> Damage to all targets"
            if(effect_id == 53 || effect_id == 107 || effect_id == 226){
                pot_str = ""
            } 
        }
    }

    var elem = ""
    if(element_bit_ && count == true){
        elem = element_bit(element_bit_)
    }

    var st_str = ""

    if(single_hit_brave_rate_up_ && single_hit_brave_rate_up_ != 0 && faf == undefined){
        var st_cent = Math.round((single_hit_brave_rate_up_/brave_rate_numerator)*brave_rate_denominator)
        st_str = `Increases BRV damage to single targets by ${st_cent}%`
    }

    var attack_type_str = ""

    if(attack_type_id != -1){
        attack_type_str = attack_type_id_data[attack_type_id] && attack_type_id_data[attack_type_id].attack_type_id
    }

    var type_id_str = ""

    type_id_str = type_id_data[type_id] && type_id_data[type_id].type_id

    var effect_value_type_str = ""

    if(effect_value_type_id && effect_value_type_id != 1 && effect_value_type_id != -1){
        effect_value_type_str = effect_value_type_id_data[effect_value_type_id] && effect_value_type_id_data[effect_value_type_id].effect_value_type_id
    }

    var ability_target_str = ""

    ability_target_str = ability_target_id_data[ability_target_id] && ability_target_id_data[ability_target_id].ability_target_id

    if(effect_value_type_id && effect_value_type_id == 58){
        var ailment_pull = AilmentNames[m_nARG] && AilmentNames[m_nARG].name
        ability_target_str.replace(/\[m_nARG\]/gm,`${ailment_pull == undefined ? `[${m_nARG}]` : `[${ailment_pull}]`}`)
    }

    var mcap_str = ""

    if(max_brv_limit_up_rate_ && max_brv_limit_up_rate_ > 0 && mblur == undefined){
        const maxbrv_ove_cent = Math.round(((max_brv_limit_up_rate_/100)+1)*99999)
        mcap_str = `MAX BRV Cap Up by ${max_brv_limit_up_rate_}% (${maxbrv_ove_cent.toLocaleString()})`
    }

    var brvcap_str = ""

    if(brv_damage_limit_up_rate_ && brv_damage_limit_up_rate_ > 0 && bdlur== undefined){
        const brv_dmg_cap = Math.round(((brv_damage_limit_up_rate_/100)+1)*9999)
        brvcap_str = `BRV Damage Cap Up by ${brv_damage_limit_up_rate_}% (${brv_dmg_cap.toLocaleString()})`
    }

    var atk_str = ""

    var atk_type = ""

    if(count == true){
        atk_type = "BRV"
    }

    if(times == true){
        atk_type = "HP"
    }

    if(effect_id == 52 || effect_id == 53 || effect_id == 107 || effect_id == 137 || effect_id == 225 || effect_id == 226 || effect_id == 238){
        atk_type = "HP"
    }

    if(type_id == 1 || type_id == 9 || type_id == 12 || type_id == 14 || type_id == 21){
        atk_str = `${ability_target_id != 1 ? `${ability_target_str} ` : ``}${elem != "" ? `${elem} ` : ``}${attack_type_str} ${type_id_str} ${times == true ? "Attack" : "{Attack}"}`
    }
    if(type_id == 2 || type_id == 19){
        atk_str = `${ability_target_id != 1 ? `${ability_target_str} ` : ``}${attack_type_str} ${type_id_str} ${times == true ? "Attack" : "{Attack}"}`
    }
    if(type_id == 8 || type_id == 15){
        atk_str = `${attack_type_str != '' ? `${attack_type_str} ${brave_rate_numerator} ` :""}${type_id_str}`
        pot_str = ""
    }
    if(type_id == 16){
        atk_str = `${attack_type_str} (${type_id_str})`
    }

    //value trans


    if(value_trans == "negone_all_debuffs"){
        if(m_nARG == -1){
            effect_str = effect_str.replace(/\[m_nARG\]/gm, `all debuffs`)
        } else{
            effect_str = effect_str.replace(/\[m_nARG\]/gm, `${m_nARG} debuff${m_nARG != 1 ? "s":""}`)
        }
    }
    if(value_trans == "activated"){
        effect_str = effect_str.replace(/\[m_nARG\]/gm, `${m_nARG == 1 ? "activated" : "deactivated"}`)
    }

    if(value_trans == "ailment_group"){
        const grouppull = ailment_group[m_nARG] && ailment_group[m_nARG].unique
        effect_str = effect_str.replace(/\[m_nARG\]/gm, grouppull == undefined ? m_nARG : grouppull )
    }

    if(value_trans == "ailment_id"){
        const ailment_pull = AilmentNames[m_nARG] && AilmentNames[m_nARG].name
        effect_str = effect_str.replace(/\[m_nARG\]/gm, `${ailment_pull == undefined ? `[#${m_nARG}]` : `[${ailment_pull}] #${m_nARG}`}`)
        m_nARG = m_nARG = ailment_pull == undefined ? `[#${m_nARG}]` : `[${ailment_pull}] #${m_nARG}`
    }

    if(value_trans == "ailment_id4"){
        const ailment_pull = AilmentNames[m_nARG_4] && AilmentNames[m_nARG_4].name
        effect_str = effect_str.replace(/\[m_nARG_4\]/gm, `${ailment_pull == undefined ? `[#${m_nARG_4}]` : `[${ailment_pull}] #${m_nARG_4}`}`)
    }

    if(value_trans == "ailment_id4_any"){
        const ailment_pull = AilmentNames[m_nARG_4] && AilmentNames[m_nARG_4].name
        effect_str = effect_str
        .replace(/\[m_nARG_3\]/gm, `${m_nARG_3 == 1 ? "any" : "self casted"}`)
        .replace(/\[m_nARG_4\]/gm, `${ailment_pull == undefined ? `[#${m_nARG_4}]` : `[${ailment_pull}] #${m_nARG_4}`}`)
    }

    if(value_trans == "ailment_id4_buffdebuff"){
        if(m_nARG_4 != -1){
            const ailment_pull = AilmentNames[m_nARG_4] && AilmentNames[m_nARG_4].name
            effect_str = effect_str.replace(/\[m_nARG_3\]/gm, `${m_nARG_3 == 1 ? "targets debuffed with " : "targets buffed with "}`)
            .replace(/\[m_nARG_4\]/gm, `${ailment_pull == undefined ? `[${m_nARG_4}]` : `[${ailment_pull}]`}`)
        } else {
            effect_str = effect_str.replace(/\[m_nARG_3\]/gm, `${m_nARG_3 == 1 ? "debuffed targets" : "buffed targets"}`)
            .replace(/\[m_nARG_4\]/gm, ``)
        }
    }

    if(value_trans == "ailment_id4_split3_remove_16atk"){
        if(effect_value_type_id == 49){
            const val_1 = val_edit_type(2 ,m_nARG)
            const val_2 = val_edit_type(3 ,m_nARG)
            const val_3 = val_edit_type(4 ,m_nARG)
            const m_nARG_str = `${val_1 != 0 ? `${val_1}%` : ""}${val_2 != 0 ? ` / ${val_2}%` : ""}${val_3 != 0 ? ` / ${val_3}%` : ""}`
            const val_4 = val_edit_type(2 ,m_nARG_1)
            const val_5 = val_edit_type(3 ,m_nARG_1)
            const val_6 = val_edit_type(4 ,m_nARG_1)
            const m_nARG_1_str = `${val_4 != 0 ? ` / ${val_4}%` : ""}${val_5 != 0 ? ` / ${val_5}%` : ""}${val_6 != 0 ? ` / ${val_6}%` : ""}`
            const val_7 = val_edit_type(2 ,m_nARG_2)
            const val_8 = val_edit_type(3 ,m_nARG_2)
            const val_9 = val_edit_type(4 ,m_nARG_2)
            const m_nARG_2_str = `${val_7 != 0 ? ` / ${val_7}%` : ""}${val_8 != 0 ? ` / ${val_8}%` : ""}${val_9 != 0 ? ` / ${val_9}%` : ""}`
            const val_10 = val_edit_type(2 ,m_nARG_3)
            const m_nARG_3_str = `${val_10 != 0 ? ` / ${val_10}%` : ""}`
            const ailment_pull = AilmentNames[m_nARG_4] && AilmentNames[m_nARG_4].name
            effect_str = effect_str
            .replace(/\[m_nARG\]/gm, m_nARG_str)
            .replace(/\[m_nARG_1\]/gm, m_nARG_1_str)
            .replace(/\[m_nARG_2\]/gm, m_nARG_2_str)
            .replace(/\[m_nARG_3\]/gm, m_nARG_3_str)
            .replace(/\[m_nARG_4\]/gm, `based on level of ${ailment_pull == undefined ? `[#${m_nARG_4}]` : `[${ailment_pull}] #${m_nARG_4}`} `)
        } else {
            effect_str = effect_str
            .replace(/\[m_nARG\]/gm, `${m_nARG}%`)
            .replace(/\[m_nARG_1\]/gm, "")
            .replace(/\[m_nARG_2\]/gm, "")
            .replace(/\[m_nARG_3\]/gm, "")
            .replace(/\[m_nARG_4\]/gm, "")
        }
    }

    if(value_trans == "all_debuffs_turns"){
        if(m_nARG != -1){
            const ailment_pull = AilmentNames[m_nARG] &&  AilmentNames[m_nARG].name
            effect_str = effect_str
            .replace(/\[m_nARG\]/gm, `${ailment_pull == undefined ? `[#${m_nARG}]` : `[${ailment_pull}] #${m_nARG}`}`)
            .replace(/\[m_nARG_1\]/gm, `${m_nARG_1 != 1 ? `${m_nARG_1} turns` : `1 turn`}`)
        } else {
            effect_str = effect_str
            .replace(/\[m_nARG\]/gm, `all inflicted debuffs`)
            .replace(/\[m_nARG_1\]/gm, `${m_nARG_1 != 1 ? `${m_nARG_1} turns` : `1 turn`}`)
        }

    }

    if(value_trans =="brv_less_than"){
        effect_str = effect_str.replace(/\[m_nARG_3\]/gm, `${m_nARG_3 == 1 ? `If BRV is less than ${effect_value_type_str}, ` :""}`)
    }

    if(value_trans =="buffs"){
        effect_str = effect_str
        .replace(/\[m_nARG\]/gm, `${m_nARG != 1 ? `${m_nARG} buffs` : "1 buff"}`)
    }

    if(value_trans =="cast_buff_inflicted_debuff"){
        effect_str = effect_str.replace(/\[m_nARG_3\]/gm, `${m_nARG_3 == 1 ? `inflicted debuffs` : "casted buffs"}`)
    }

    if(value_trans == "cast_buff_inflicted_debuff_turns"){
        effect_str = effect_str.replace(/\[m_nARG_3\]/gm, `${m_nARG_3 == 1 ? `inflicted debuffs` : "casted buffs"}`)
        .replace(/\[m_nARG\]/gm, `${m_nARG == 1 ? `1 turn` :`${m_nARG} turns`}`)
    }

    if(value_trans == "charge"){
        effect_str = effect_str.replace(/\[m_nARG\]/gm,  `${m_nARG == 0 ? "Cancels" : "Starts"}`)
    }

    if(value_trans == "command_id4_negmax"){
        const abilitypull = CommandNames[m_nARG_4] && CommandNames[m_nARG_4].name
        effect_str = effect_str.replace(/\[m_nARG_1\]/gm, `${m_nARG_1 != 100 ? `${m_nARG_1}% chance to `: ""}`)
        .replace(/\[m_nARG_4\]/gm, `${abilitypull == undefined ? `[#${m_nARG_4}]` : `[${abilitypull}] #${m_nARG_4}`}`)
        if(m_nARG == -1){
            effect_str = effect_str.replace(/\[m_nARG\]/gm, "to default")
        } else {
            const replacement = `by ${m_nARG}`
            effect_str = effect_str.replace(/\[m_nARG\]/gm, replacement)
        }
    }
    
    if(value_trans == "damage_display"){
        effect_str = effect_str.replace(/\[m_nARG\]/gm,  `${m_nARG == 0 ? "" : " with damage display"}`)
    }

    if(value_trans == "dice_potency"){
        pot_str = effect_str.replace(/\[m_nARG_1\]/gm, `${pot_cent*m_nARG_1}`)
        .replace(/\[potency\]/gm, `${pot_cent}`)
        effect_str = ""
    }

    if(value_trans == "divide_100"){
        const newvalue = m_nARG_1/100
        effect_str = effect_str.replace(/\[m_nARG_1\]/gm, `${newvalue}`)
    }

    if(value_trans == "divide_100_0"){
        const newvalue = m_nARG/100
        effect_str = effect_str.replace(/\[m_nARG\]/gm, `${newvalue}`)
    }

    if(value_trans == "effect41"){
        if(effect_value_type_id == 53){
            const val_1 = val_edit_type(2 ,m_nARG)
            const val_2 = val_edit_type(3 ,m_nARG)
            const val_3 = val_edit_type(4 ,m_nARG)
            const val_4 = val_edit_type(2 ,m_nARG_1)
            const val_5 = val_edit_type(3 ,m_nARG_1)
            const val_6 = val_edit_type(4 ,m_nARG_1)
            const val_7 = val_edit_type(2 ,m_nARG_2)
            const val_8 = val_edit_type(3 ,m_nARG_2)
            const val_9 = val_edit_type(4 ,m_nARG_2)
            const val_10 = val_edit_type(2 ,m_nARG_3)
            const m_nARG_str = `${val_1}%${val_2 != 0 ? ` / ${val_2}%` : ""}${val_3 != 0 ? ` / ${val_3}%` : ""}`
            const m_nARG_1_str = `${val_4 != 0 ? ` / ${val_4}%` : ""}${val_5 != 0 ? ` / ${val_5}%` : ""}${val_6 != 0 ? ` / ${val_6}%` : ""}`
            const m_nARG_2_str = `${val_7 != 0 ? ` / ${val_7}%` : ""}${val_8 != 0 ? ` / ${val_8}%` : ""}${val_9 != 0 ? ` / ${val_9}%` : ""}`
            const m_nARG_3_str = `${val_10 != 0 ? ` / ${val_10}%` : ""}`
            effect_str = effect_str.replace(/\[m_nARG\]/gm, `${m_nARG_str}${m_nARG_1_str}${m_nARG_2_str}${m_nARG_3_str}`)
        }
        if(effect_value_type_id == 46){
            effect_str = effect_str.replace(/\[m_nARG\]/gm, `${m_nARG}% / ${m_nARG_1}% / ${m_nARG_2}% / ${m_nARG_3}%`)
        }
        effect_str = effect_str.replace(/\[m_nARG\]/gm, `${m_nARG}%`)
        .replace(/\[target\]/gm, ability_target_str)
        .replace("Self ","")
    }

    if(value_trans == "effect43"){
        if(effect_value_type_id == 16){
            effect_str = effect_str.replace(/\[m_nARG\]/gm, `${m_nARG}`)
        } else {
            effect_str = effect_str.replace(/\[m_nARG\]/gm, `${m_nARG}%`)
        }
        effect_str = effect_str
        .replace(/\[target\]/gm, ability_target_str)
        .replace("Self ","")
    }

    if(value_trans == "effect44"){
        if(effect_value_type_id == 16){
            effect_str = effect_str.replace(/\[effect44\]/gm, `${m_nARG}`)
        }
        if(effect_value_type_id == 36){
            effect_str = effect_str.replace(/\[effect44\]/gm, `${m_nARG}% of total HP Damage dealt (${m_nARG_1}% on BREAK afflicted targets)`)
        }
        if(effect_value_type_id == 58){
            const ailment_pull = AilmentNames[m_nARG] && AilmentNames[m_nARG].name
            effect_str = effect_str.replace(/\[effect44\]/gm, `${m_nARG_1}% of stored value from ${ailment_pull == undefined ? `[#${m_nARG}]` : `[${ailment_pull}] #${m_nARG}`}`)
        }
        if(effect_value_type_id == 14){
            effect_str = effect_str.replace(/Deals Splash/gm, `Deals ${m_nARG}% Splash`)
            .replace(/by \[effect44\] /gm,"")
        }
        effect_str = effect_str.replace(/\[effect44\]/gm, `${m_nARG}% of ${effect_value_type_str}`)
    }

    if(value_trans == "enemy_resist"){
        const enemyresistpull =  enemy_resist[m_nARG]
        effect_str = effect_str.replace(/\[m_nARG\]/gm,enemyresistpull)
    }

    if(value_trans == "grants_consumes_ailment_id4"){
        const ailment_pull = AilmentNames[m_nARG_4] && AilmentNames[m_nARG_4].name
        if(m_nARG <0){
            effect_str = effect_str.replace(/\[m_nARG\]/gm, `Reduces ${Math.abs(m_nARG)} level${Math.abs(m_nARG) != 1 ? "s" : ""} of active`)
        } else {
            if(ability_target_id == 1 || ability_target_id == 5){
                effect_str = effect_str.replace(/\[m_nARG\]/gm, `Inflicts ${Math.abs(m_nARG)} level${Math.abs(m_nARG) != 1 ? "s" : ""} of active`)
            } else {
                effect_str = effect_str.replace(/\[m_nARG\]/gm, `Grants ${m_nARG} level${m_nARG != 1 ? "s" : ""} of active`)
            }
        }
        effect_str = effect_str.replace(/\[m_nARG_4\]/gm, `${ailment_pull == undefined ? `[#${m_nARG_4}]` : `[${ailment_pull}] #${m_nARG_4}`}`)
        .replace(/\[target\]/gm, ability_target_str)
        .replace("on Self","")
    }

    if(value_trans == "hits"){
        effect_str = effect_str.replace(/\[m_nARG\]/gm, `${m_nARG == 0 ? "" : ` for the next ${m_nARG} hit${m_nARG != 1 ? "s" : ""}`}`)
    }

    if(value_trans == "if_even"){
        effect_str = effect_str.replace(/\[m_nARG\]/gm, `${m_nARG == 2 ? "If current BRV is an even number, " : ``}`)
    }

    if(value_trans == "increase_decrease_ailment_id4"){
        const ailment_pull = AilmentNames[m_nARG_4] && AilmentNames[m_nARG_4].name
        effect_str = effect_str.replace(/\[m_nARG_4\]/gm, `${ailment_pull == undefined ? `[#${m_nARG_4}]` : `[${ailment_pull}] #${m_nARG_4}`}`)
        if(m_nARG <0){
            effect_str = effect_str.replace(/\[m_nARG\]/gm,`Decreases turns by ${Math.abs(m_nARG)}`)
        } else {
            effect_str = effect_str.replace(/\[m_nARG\]/gm,`Increases turns by ${m_nARG}`)
        }
    }

    if(value_trans == "increase_decrease_force"){
        if(m_nARG <0){
            effect_str = effect_str.replace(/\[m_nARG\]/gm,`Decreases Force Gauge by ${Math.round(Math.abs(m_nARG)/10)}%`)
        } else {
            effect_str = effect_str.replace(/\[m_nARG\]/gm,`Increases Force Gauge by ${Math.round(m_nARG/10)}%`)
        }
    }

    if(value_trans == "increase_decrease_recast"){
        if(m_nARG <0){
            effect_str = effect_str.replace(/\[m_nARG\]/gm,`Decreases Recast Bar by ${Math.abs(m_nARG)}%`)
        } else {
            effect_str = effect_str.replace(/\[m_nARG\]/gm,`Increases Recast Bar by ${m_nARG}%`)
        }
    }

    if(value_trans == "negone_all_buffs"){
        if(m_nARG == -1){
            effect_str = effect_str.replace(/\[m_nARG\]/gm, "all buffs")
        } else {
            effect_str = effect_str.replace(/\[m_nARG\]/gm, `${m_nARG} buff${m_nARG != 1 ? "s" : ""}`)
        }
    }

    if(value_trans == "negone_all_debuffs"){
        if(m_nARG == -1){
            effect_str = effect_str.replace(/\[m_nARG\]/gm, "all debuffs")
        } else {
            effect_str = effect_str.replace(/\[m_nARG\]/gm, `${m_nARG} debuff${m_nARG != 1 ? "s" : ""}`)
        }
    }

    if(value_trans == "negone_one_count"){
        if(m_nARG == -1){
            effect_str = effect_str.replace(/\[m_nARG\]/gm, "of all S1 & AA Abilities")
        } else {
            effect_str = effect_str.replace(/\[m_nARG\]/gm, `by ${m_nARG} use(s) to S1 & S2 Abilities`)
        }
    }

    if(value_trans == "no_self"){
        effect_str = effect_str
        .replace(/\[target\]/gm, ability_target_str)
        .replace("Self ","")
    }

    if(value_trans == "on_off"){
        if(m_nARG == 1){
            effect_str = effect_str.replace(/\[m_nARG\]/gm, "on")
        } else {
            effect_str = effect_str.replace(/\[m_nARG\]/gm, `off`)
        }
    }

    if(value_trans == "one_recover"){
        if(m_nARG == 1){
        effect_str = effect_str.replace(/\[m_nARG\]/gm, `${m_nARG == 1 ? "(Recovers)" : ""}`)
        } else {
            effect_str = effect_str.replace(/\[m_nARG\]/gm, "")
        }
    }

    if(value_trans == "plus_1"){
        effect_str = effect_str.replace(/\[m_nARG\]/gm, `${m_nARG + 1}`)
    }

    if(value_trans == "split_half2"){
        const val_2 = val_edit_type(3 ,m_nARG_2)
        effect_str = effect_str.replace(/\[m_nARG_2\]/gm, val_2)
    }

    if(value_trans == "split_merge"){
        if(ability_target_id == 6){
            effect_str = effect_str.replace(/\[target\]/gm, "Merge Effect")
        } else {
            effect_str = effect_str.replace(/\[target\]/gm, "Split Effect")
        }
    }

    if(value_trans == "times_ten"){
        pot_str = effect_str
        .replace(/\[effect_value_type\]/,effect_value_type_str)
        .replace(/\[target\]/gm, ability_target_str)
        .replace(/\[m_nARG\]/gm, m_nARG*10)
        .replace(/\[m_nARG_1\]/gm, m_nARG_1*10)
        .replace(/\[m_nARG_2\]/gm, m_nARG_2*10)
        .replace(/\[m_nARG_3\]/gm, m_nARG_3*10)
        .replace(/\[m_nARG_4\]/gm, m_nARG_4*10)
        effect_str = ""
    }

    if(value_trans == "turn_mod"){
        effect_str = effect_str.replace(/\[m_nARG\]/gm, `${m_nARG == 19 ? "debuffs" : "buffs"}`)
        if(m_nARG_1 > 0){
            effect_str = effect_str.replace(/\[m_nARG_1\]/gm, `increases by ${m_nARG_1} turn${m_nARG_1 != 1 ? "s" : ""}` )
        } else {
            effect_str = effect_str.replace(/\[m_nARG_1\]/gm, `decreases by ${Math.abs(m_nARG_1)} turn${m_nARG_1 != -1 ? "s" : ""}` )
        }
    }

    if(value_trans == "turns"){
        effect_str = effect_str.replace(/\[m_nARG\]/gm, `${m_nARG == 1 ? "1 turn" : `${m_nARG} turns`}`)
    }

    if(value_trans == "turns_ailment_id1"){
        const ailment_pull = AilmentNames[m_nARG_1] && AilmentNames[m_nARG_1].name
        effect_str = effect_str.replace(/\[m_nARG_1\]/gm, `${ailment_pull == undefined ? `[#${m_nARG_1}]` : `[${ailment_pull}] #${m_nARG_1}`}`)
        .replace(/\[m_nARG\]/gm, `${m_nARG == 1 ? "1 turn" : `${m_nARG} turns`}`)
    }

    if(value_trans == "turns_ailment_id4_buffdebuff_noself"){
        if(m_nARG_4 != -1){
            const ailment_pull = AilmentNames[m_nARG_4] && AilmentNames[m_nARG_4].name
            effect_str = effect_str.replace(/\[m_nARG_4\]/gm, `${ailment_pull == undefined ? `[#${m_nARG_4}]` : `[${ailment_pull}] #${m_nARG_4}`}`)
            .replace(/\[m_nARG_3\]/gm, "" )
        }
        effect_str = effect_str
        .replace(/\[target\]/gm, ability_target_str)
        .replace(/Self /gm, "")
        .replace(/\[m_nARG\]/gm, `${m_nARG == 1 ? "1 turn" : `${m_nARG} turns`}` )
        .replace(/\[m_nARG_3\]/gm, `${m_nARG_3 == 2 ? " buffs" : " debuffs"}` )
        .replace(/ \[m_nARG_4\]/gm, "" )
       
    }

    if(value_trans == "turns_selfgranted"){
        if(m_nARG_1 == 1){
            effect_str = effect_str.replace(/\[m_nARG_1\]/gm, "self granted" )
        } else {
            effect_str = effect_str.replace(/\[m_nARG_1\]/gm, "any" )
        }
        effect_str = effect_str.replace(/\[m_nARG\]/gm, `${m_nARG == 1 ? "1 turn" : `${m_nARG} turns`}`)
    }

    if(value_trans == "with_percent_of"){
        if(m_nARG_3 == 1){
            effect_str = effect_str.replace(/\[m_nARG_3\]/gm, `(If BRV is lower than ${effect_value_type_str}) ` )
        } else {
            effect_str = effect_str.replace(/\[m_nARG_3\]/gm, "")
        }
        if(effect_value_type_id == 16){
            effect_str = effect_str.replace(/\[m_nARG\]/gm, `${m_nARG} of `)
        } else {
            effect_str = effect_str.replace(/\[m_nARG\]/gm, `${m_nARG}% of `)
        }
        effect_str = effect_str.replace(/\[target\]/gm, ability_target_str)
        .replace(/to Self/gm, "")
    }

    if(value_trans == "effect_70"){
        if(ability_target_id == 6){
            effect_value_type_str = effect_value_type_str.replace(/Individual's/,"total")
        } else {
            effect_value_type_str = effect_value_type_str.replace(/Individual's /,"")
        }
        effect_str = effect_str.replace(/\[effect_value_type\]/,effect_value_type_str)
        .replace(/\[target\]/gm, ability_target_str).replace(/own /,"").replace(/Self /,"")
    }

    if(value_trans == "effect265"){
        effect_str = effect_str
        .replace(/\[effect_value_type\]/gm,effect_value_type_str)
        const ailment_pull = m_nARG.toString().slice(0, 4)
        const ailment_value = m_nARG.toString().slice(6)
        const ailment_name = AilmentNames[ailment_pull] && AilmentNames[ailment_pull].name
        effect_str = effect_str
        .replace(/\[m_nARG\]/gm, `[${ailment_name}] #${ailment_pull}`)
        effect_str = effect_str
        .replace(/\[m_nARG0\]/gm, ailment_value)
    }

    if(value_trans == "break_chance"){
        if(m_nARG == 100){
            effect_str = effect_str.replace(/\[m_nARG\]/gm, "Inflicts" )
        } else {
            effect_str = effect_str.replace(/\[m_nARG\]/gm, `${m_nARG}% chance of inflicting` )
        }
    }

    effect_str = effect_str
        .replace(/\[effect_value_type\]/gm,effect_value_type_str)
        .replace(/\[target\]/gm, ability_target_str)
        .replace(/\[m_nARG\]/gm, m_nARG)
        .replace(/\[m_nARG_1\]/gm, m_nARG_1)
        .replace(/\[m_nARG_2\]/gm, m_nARG_2)
        .replace(/\[m_nARG_3\]/gm, m_nARG_3)
        .replace(/\[m_nARG_4\]/gm, m_nARG_4)
        
    if(type_id == 16){
        var new_atk_str = `${atk_str} ${effect_str}`
        new_atk_str = new_atk_str.replace(/Deals /gm, "")
        atk_str = new_atk_str
        effect_str = ""
    }

    var hit_return = {
        id: `${atk_str}${effect_str}${pot_str}${st_str}${ove_str}${mcap_str}${brvcap_str}`,
        atk_str: atk_str == "" ? undefined : atk_str,
        atk_type: atk_type == "" ? undefined : atk_type,
        eff_str: effect_str == "" ? undefined : effect_str,
        pot_str: pot_str == "" ? undefined : pot_str,
        st_str: st_str == "" ? undefined : st_str,
        ove_str: ove_str == "" ? undefined : ove_str,
        mcap_str: mcap_str == "" ? undefined : mcap_str,
        brvcap_str: brvcap_str == "" ? undefined : brvcap_str,
        hit_num: hit_num,
    }

    return(
        hit_return
    )
}
export default hit_data_handler