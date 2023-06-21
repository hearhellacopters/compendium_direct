export default function ailment_slider_handler(
    ailment_data,
    effect_value_type_field,
    val_edit_type_field
){
    
    const val_type = ailment_data.val_type
    const val_type_1 = ailment_data.val_type_1
    const val_type_2 = ailment_data.val_type_2
    const val_type_3 = ailment_data.val_type_3
    const val_type_4 = ailment_data.val_type_4
    const val_type_5 = ailment_data.val_type_5
    const val_type_6 = ailment_data.val_type_6
    const val_type_7 = ailment_data.val_type_7
    const val_type_8 = ailment_data.val_type_8
    const val_type_9 = ailment_data.val_type_9
    const val_edit_type = ailment_data.val_edit_type
    const val_edit_type_1 = ailment_data.val_edit_type_1
    const val_edit_type_2 = ailment_data.val_edit_type_2
    const val_edit_type_3 = ailment_data.val_edit_type_3
    const val_edit_type_4 = ailment_data.val_edit_type_4
    const val_edit_type_5 = ailment_data.val_edit_type_5
    const val_edit_type_6 = ailment_data.val_edit_type_6
    const val_edit_type_7 = ailment_data.val_edit_type_7
    const val_edit_type_8 = ailment_data.val_edit_type_8
    const val_edit_type_9 = ailment_data.val_edit_type_9
    const max_level = ailment_data.max_level_overide != undefined ? ailment_data.max_level_overide : ailment_data.max_level

    var levels = false
    var ranks = true
    var turns = false
    var debuffsrank = false
    var debuffsrank2 = false
    var debuffsmuliply = false
    var buffsrank = false
    var buffsmuliply = false
    var fieldbuffsrank = false
    var enemies = false
    var stacks = false
    var groupstacks = false
    var currenthp = false
    var charactersleft = false
    var characterskb = false
    if (val_edit_type_field != undefined) {
        val_edit_type_field.forEach(self => {
            if (self == 16) {
                debuffsmuliply = true
            }
            if (self == 19) {
                buffsmuliply = true
            }
            if (self == 25) {
                debuffsmuliply = true
            }
            if (self == 27) {
                debuffsmuliply = true
            }
        })
    }
    if (effect_value_type_field != undefined) {
        effect_value_type_field.forEach(self => {
            if (self == 6) {
                fieldbuffsrank = true
            }
            if (self == 8) {
                groupstacks = true
            }
            if (self == 10) {
                currenthp = true
            }
            if (self == 11) {
                charactersleft = true
            }
            if(self == 15){
                characterskb = true
            }
            if(self == 17){
                debuffsrank2 = true
            }
        })
    }
    
    for(let i=0;i<10;i++){
        const end = i == 0 ? "":`_${i}`
        if(eval(`val_type${end}`) == 3 || eval(`val_type${end}`) == 4){
            levels = true
        }
        if(eval(`val_type${end}`) == 7 || eval(`val_type${end}`) == 11 || eval(`val_type${end}`) == 18){
            debuffsrank = true
        }
        if(eval(`val_type${end}`) == 9 || eval(`val_type${end}`) == 20){
            enemies = true
        }
        if(eval(`val_type${end}`) == 10){
            turns = true
        }
        if(eval(`val_type${end}`) == 14 || eval(`val_type${end}`) == 16){
            stacks = true
        }

        if(eval(`val_edit_type${end}`) == 16 || eval(`val_edit_type${end}`) == 25 || eval(`val_edit_type${end}`) == 27){
            stacks = true
        }
        if(eval(`val_edit_type${end}`) == 19){
            turns = true
        }
    }

    if (max_level != 0) {
        levels = true
    }
    var silders = {
        levels: levels,
        ranks: ranks,
        turns: turns,
        debuffsrank: debuffsrank,
        debuffsrank2: debuffsrank2,
        debuffsmuliply: debuffsmuliply,
        buffsrank: buffsrank,
        fieldbuffsrank: fieldbuffsrank,
        buffsmuliply: buffsmuliply,
        enemies: enemies,
        stacks: stacks,
        groupstacks: groupstacks,
        currenthp: currenthp,
        charactersleft: charactersleft,
        characterskb: characterskb
    }
    return silders
}