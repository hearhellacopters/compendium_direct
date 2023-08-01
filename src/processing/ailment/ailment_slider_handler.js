export default function ailment_slider_handler(
    ailment_data,
    effect_value_type_field,
    val_edit_type_field,
    master_index
){

    const EffectValueType = master_index.ailment_effect_id_index.effect_value_type
    const ValType = master_index.ailment_effect_id_index.val_type
    const ValEditType = master_index.ailment_effect_id_index.val_edit_type

    const val_types ={
        val_type: ailment_data.val_type,
        val_type_1: ailment_data.val_type_1,
        val_type_2: ailment_data.val_type_2,
        val_type_3: ailment_data.val_type_3,
        val_type_4: ailment_data.val_type_4,
        val_type_5: ailment_data.val_type_5,
        val_type_6: ailment_data.val_type_6,
        val_type_7: ailment_data.val_type_7,
        val_type_8: ailment_data.val_type_8,
        val_type_9: ailment_data.val_type_9,
        val_edit_type: ailment_data.val_edit_type,
        val_edit_type_1: ailment_data.val_edit_type_1,
        val_edit_type_2: ailment_data.val_edit_type_2,
        val_edit_type_3: ailment_data.val_edit_type_3,
        val_edit_type_4: ailment_data.val_edit_type_4,
        val_edit_type_5: ailment_data.val_edit_type_5,
        val_edit_type_6: ailment_data.val_edit_type_6,
        val_edit_type_7: ailment_data.val_edit_type_7,
        val_edit_type_8: ailment_data.val_edit_type_8,
        val_edit_type_9: ailment_data.val_edit_type_9,
    }

    const max_level = ailment_data.max_level_overide != undefined ? ailment_data.max_level_overide : ailment_data.max_level

    const sliders={
        levels: false,
        ranks: true,
        turns: false,
        debuffsrank: false,
        debuffsrank2: false,
        debuffsmuliply: false,
        buffsrank: false,
        buffsmuliply: false,
        fieldbuffsrank: false,
        enemies: false,
        stacks: false,
        groupstacks: false,
        currenthp: false,
        charactersleft: false,
        characterskb: false
    }
    if (val_edit_type_field != undefined) {
        val_edit_type_field.forEach(self => {
            if(ValEditType[self] && ValEditType[self].multiplyslider != undefined){
                sliders[ValEditType[self].multiplyslider] = true
            }
        })
    }
    if (effect_value_type_field != undefined) {
        effect_value_type_field.forEach(self => {
            if(EffectValueType[self] && EffectValueType[self].slidertype != undefined){
                sliders[EffectValueType[self].slidertype] = true
            }
        })
    }
    
    for(let i=0;i<10;i++){
        const end = i == 0 ? "":`_${i}`
        if(ValType[val_types[`val_type${end}`]] && ValType[val_types[`val_type${end}`]].slidertype != undefined){
            sliders[ValType[val_types[`val_type${end}`]].slidertype] = true
        }
    }

    if (max_level != 0) {
        sliders.levels = true
    }
    var silders = {
        levels: sliders.levels,
        ranks: sliders.ranks,
        turns: sliders.turns,
        debuffsrank: sliders.debuffsrank,
        debuffsrank2: sliders.debuffsrank2,
        debuffsmuliply: sliders.debuffsmuliply,
        buffsrank: sliders.buffsrank,
        fieldbuffsrank: sliders.fieldbuffsrank,
        buffsmuliply: sliders.buffsmuliply,
        enemies: sliders.enemies,
        stacks: sliders.stacks,
        groupstacks: sliders.groupstacks,
        currenthp: sliders.currenthp,
        charactersleft: sliders.charactersleft,
        characterskb: sliders.characterskb
    }
    return silders
}