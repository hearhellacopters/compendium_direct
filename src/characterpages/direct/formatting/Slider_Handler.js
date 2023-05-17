const Silder_Handler = (val_type,
    val_type_1,
    val_type_2,
    val_type_3,
    val_type_4,
    val_type_5,
    val_type_6,
    val_type_7,
    val_type_8,
    val_type_9,
    val_edit_type,
    val_edit_type_1,
    val_edit_type_2,
    val_edit_type_3,
    val_edit_type_4,
    val_edit_type_5,
    val_edit_type_6,
    val_edit_type_7,
    val_edit_type_8,
    val_edit_type_9,
    max_level,
    effect_value_type_field,
    val_edit_type_field) => {
    var levels = false
    var ranks = true
    var turns = false
    var debuffsrank = false
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
        val_edit_type_field.map(self => {
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
        effect_value_type_field.map(self => {
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
        })
    }
    if (val_type == 3 || val_type_1 == 3 || val_type_2 == 3 || val_type_3 == 3 || val_type_4 == 3 || val_type_5 == 3 || val_type_6 == 3 || val_type_7 == 3 || val_type_8 == 3 || val_type_9 == 3) {
        levels = true
    }
    if (val_type == 4 || val_type_1 == 4 || val_type_2 == 4 || val_type_3 == 4 || val_type_4 == 4 || val_type_5 == 4 || val_type_6 == 4 || val_type_7 == 4 || val_type_8 == 4 || val_type_9 == 4) {
        levels = true
    }
    if (val_type == 7 || val_type_1 == 7 || val_type_2 == 7 || val_type_3 == 7 || val_type_4 == 7 || val_type_5 == 7 || val_type_6 == 7 || val_type_7 == 7 || val_type_8 == 7 || val_type_9 == 7) {
        debuffsrank = true
    }
    if (val_type == 9 || val_type_1 == 9 || val_type_2 == 9 || val_type_3 == 9 || val_type_4 == 9 || val_type_5 == 9 || val_type_6 == 9 || val_type_7 == 9 || val_type_8 == 9 || val_type_9 == 9) {
        enemies = true
    }
    if (val_type == 10 || val_type_1 == 10 || val_type_2 == 10 || val_type_3 == 10 || val_type_4 == 10 || val_type_5 == 10 || val_type_6 == 10 || val_type_7 == 10 || val_type_8 == 10 || val_type_9 == 10) {
        turns = true
    }
    if (val_type == 11 || val_type_1 == 11 || val_type_2 == 11 || val_type_3 == 11 || val_type_4 == 11 || val_type_5 == 11 || val_type_6 == 11 || val_type_7 == 11 || val_type_8 == 11 || val_type_9 == 11) {
        debuffsrank = true
    }
    if (val_type == 14 || val_type_1 == 14 || val_type_2 == 14 || val_type_3 == 14 || val_type_4 == 14 || val_type_5 == 14 || val_type_6 == 14 || val_type_7 == 14 || val_type_8 == 14 || val_type_9 == 14) {
        stacks = true
    }
    if (val_type == 16 || val_type_1 == 16 || val_type_2 == 16 || val_type_3 == 16 || val_type_4 == 16 || val_type_5 == 16 || val_type_6 == 16 || val_type_7 == 16 || val_type_8 == 16 || val_type_9 == 16) {
        stacks = true
    }
    if (val_type == 18 || val_type_1 == 18 || val_type_2 == 18 || val_type_3 == 18 || val_type_4 == 18 || val_type_5 == 18 || val_type_6 == 18 || val_type_7 == 18 || val_type_8 == 18 || val_type_9 == 18) {
        debuffsrank = true
    }
    if (val_type == 20 || val_type_1 == 20 || val_type_2 == 20 || val_type_3 == 20 || val_type_4 == 20 || val_type_5 == 20 || val_type_6 == 20 || val_type_7 == 20 || val_type_8 == 20 || val_type_9 == 20) {
        enemies = true
    }
    if (val_edit_type == 16 || val_edit_type_1 == 16 || val_edit_type_2 == 16 || val_edit_type_3 == 16 || val_edit_type_4 == 16 || val_edit_type_5 == 16 || val_edit_type_6 == 16 || val_edit_type_7 == 16 || val_edit_type_8 == 16 || val_edit_type_9 == 16) {
        debuffsmuliply = true
    }
    if (val_edit_type == 19 || val_edit_type_1 == 19 || val_edit_type_2 == 19 || val_edit_type_3 == 19 || val_edit_type_4 == 19 || val_edit_type_5 == 19 || val_edit_type_6 == 19 || val_edit_type_7 == 19 || val_edit_type_8 == 19 || val_edit_type_9 == 19) {
        buffsmuliply = true
    }
    if (val_edit_type == 25 || val_edit_type_1 == 25 || val_edit_type_2 == 25 || val_edit_type_3 == 25 || val_edit_type_4 == 25 || val_edit_type_5 == 25 || val_edit_type_6 == 25 || val_edit_type_7 == 25 || val_edit_type_8 == 25 || val_edit_type_9 == 25) {
        debuffsmuliply = true
    }
    if (val_edit_type == 27 || val_edit_type_1 == 27 || val_edit_type_2 == 27 || val_edit_type_3 == 27 || val_edit_type_4 == 27 || val_edit_type_5 == 27 || val_edit_type_6 == 27 || val_edit_type_7 == 27 || val_edit_type_8 == 27 || val_edit_type_9 == 27) {
        debuffsmuliply = true
    }
    if (max_level != 0) {
        levels = true
    }
    var silders = {
        levels: levels,
        ranks: ranks,
        turns: turns,
        debuffsrank: debuffsrank,
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
export default Silder_Handler