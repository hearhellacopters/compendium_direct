import ailment_rank_between_10 from './ailment_rank_between_10.js'

export default function ailment_data_pars_dif(
    effect_id,
    currentlevel,
    currentturns,
    currentenemies,
    currentstacks,
    currentdebuffsranks,
    currentdebuffsranks2,
    currentdebuffsmuliply,
    currentbuffsranks,
    currentfieldbuffsranks,
    currentbuffsmuliply,
    currentgroupstacks,
    currenthp,
    charactersleft,
    characterskb,
    spacer,
){

    var rank = effect_id && effect_id.rank1
    var displayrank = rank
    var brv_cap = 0
    var max_brv_cap = 0
    var brv_cap_value = 0
    var max_brv_cap_value = 0

    //ranks
    if (effect_id && effect_id.slidertype == "ranks" && effect_id.defaultrank != undefined) {
        rank = effect_id && effect_id[`rank${ailment_rank_between_10(effect_id.defaultrank)}`]
    }
    //levels
    if (effect_id && effect_id.slidertype == "levels" && currentlevel != undefined) {
        rank = effect_id && effect_id[`rank${ailment_rank_between_10(currentlevel)}`]
    }
    //turns
    if (effect_id && effect_id.slidertype == "turns" && currentturns != undefined) {
        rank = effect_id && effect_id[`rank${ailment_rank_between_10(currentturns)}`]
    }
    //enemies
    if (effect_id && effect_id.slidertype == "enemies" && currentenemies != undefined) {
        rank = effect_id && effect_id[`rank${ailment_rank_between_10(currentenemies)}`]
    }
    //stacks
    if (effect_id && effect_id.slidertype == "stacks" && currentstacks != undefined) {
        rank = effect_id && effect_id[`rank${ailment_rank_between_10(currentstacks)}`]
    }
    //groupstacks
    if (effect_id && effect_id.slidertype == "groupstacks" && currentgroupstacks != undefined) {
        rank = effect_id && effect_id[`rank${ailment_rank_between_10(currentgroupstacks)}`]
    }
    //debuffsrank
    if (effect_id && effect_id.slidertype == "debuffsrank" && currentdebuffsranks != undefined) {
        rank = effect_id && effect_id[`rank${ailment_rank_between_10(currentdebuffsranks)}`]
    }
    //debuffsrank2
    if (effect_id && effect_id.slidertype == "debuffsrank2" && currentdebuffsranks2 != undefined) {
        rank = effect_id && effect_id[`rank${ailment_rank_between_10(currentdebuffsranks2)}`]
    }
    //buffsrank
    if (effect_id && effect_id.slidertype == "buffsrank" && currentbuffsranks != undefined) {
        rank = effect_id && effect_id[`rank${ailment_rank_between_10(currentbuffsranks)}`]
    }
    //fieldbuffsrank
    if (effect_id && effect_id.slidertype == "fieldbuffsrank" && currentfieldbuffsranks != undefined) {
        rank = effect_id && effect_id[`rank${ailment_rank_between_10(currentfieldbuffsranks)}`]
    }
    //currenthp backwards
    if (effect_id && effect_id.slidertype == "currenthp" && currenthp != undefined) {
        for (let index = 10; index > 0; index--) {
            if (effect_id[`rank${index}`] && effect_id[`rank${index}`].value3 <= currenthp) {
                rank = effect_id && effect_id[`rank${index}`]
            }
        }
    }
    //charactersleft
    if (effect_id && effect_id.slidertype == "charactersleft" && charactersleft != undefined) {
        for (let index = 0; index < 3; index++) {
            if (charactersleft == index) {
                rank = effect_id && effect_id[`rank${index + 1}`]
            }
        }
    }
    //characterskb
    if (effect_id && effect_id.slidertype == "characterskb" && characterskb != undefined) {
        for (let index = 0; index < 4; index++) {
            if (characterskb == index) {
                rank = effect_id && effect_id[`rank${index + 1}`]
            }
        }
    }

    if (effect_id && effect_id.multiply == false) {
        displayrank = rank
    }
    if (effect_id && effect_id.multiply == true) {
        if (effect_id && effect_id.multiplyslider == "debuffsmuliply") {
            const holder = rank && rank.value1 * (currentdebuffsmuliply - 1)
            displayrank = { value1: holder }
        }
        if (effect_id && effect_id.multiplyslider == "buffsmuliply") {
            const holder = rank && rank.value1 * (currentbuffsmuliply - 1)
            displayrank = { value1: holder }
        }
    }
    if (rank && rank.value1 != undefined) {
        if (typeof rank.value1 == "number") {
            brv_cap = Math.round(rank.value1 * 100)
            max_brv_cap = Math.round(rank.value1 * 1000)
            brv_cap_value = Math.round(((rank.value1 / 100) + 1) * 9999)
            max_brv_cap_value = Math.round(((rank.value1 / 100) + 1) * 99999)
        }
    }
    if (displayrank && displayrank.value1 != undefined) {
        if (typeof displayrank.value1 == "number") {
            brv_cap = Math.round(displayrank.value1 * 100)
            max_brv_cap = Math.round(displayrank.value1 * 1000)
            brv_cap_value = Math.round(((displayrank.value1 / 100) + 1) * 9999)
            max_brv_cap_value = Math.round(((displayrank.value1 / 100) + 1) * 99999)
        }
    }

    var cond_str = undefined
    var eff_str = undefined
    var stack_str = undefined
    var val_type_str = undefined
    var val_edit_type_str = undefined
    var effect_value_type_str = undefined
    var full_text = undefined

    if (effect_id && effect_id.cond_id) {
        cond_str = ` ┬ ${effect_id.cond_id}`
    }
    if (effect_id && effect_id.attached != undefined) {
        effect_id && effect_id.attached.forEach(self=>{
            cond_str = cond_str + `\n ├─ Or ${self.cond_id}`
        })
    }
    if (effect_id && effect_id.effectstr) {
        eff_str = ` ${spacer != undefined ? spacer : effect_id.cond_id != undefined ? "└─" : "-"} ${
            effect_id.effectstr.replace(/\[value1\]/gm, displayrank && displayrank.value1)
                               .replace(/\[value2\]/gm, rank && rank.value2)
                               .replace(/\[value3\]/gm, rank && rank.value3)
                               .replace(/\[value4\]/gm, rank && rank.value4)
                               .replace(/\[value5\]/gm, rank && rank.value5)
                               .replace(/\[BRV_CAP\]/gm, brv_cap.toLocaleString("en-US"))
                               .replace(/\[BRV_CAP_VAL\]/gm, brv_cap_value.toLocaleString("en-US"))
                               .replace(/\[MAX_CAP\]/gm, max_brv_cap.toLocaleString("en-US"))
                               .replace(/\[MAX_CAP_VAL\]/gm, max_brv_cap_value.toLocaleString("en-US"))}`
    }
    if (effect_id && effect_id.stack_flag != undefined) {
        stack_str = effect_id.stack_flag
    }
    if (effect_id && effect_id.ValTypeShow != false && effect_id.val_typestr != undefined) {
        val_type_str = effect_id.val_typestr
    }
    if (effect_id && effect_id.ValEditTypeShow != false && effect_id.val_edit_typestr != undefined) {
        val_edit_type_str = effect_id.val_edit_typestr.replace(/\[value1\]/gm, rank && rank.value1)
                                                      .replace(/\[value2\]/gm, rank && rank.value2)
                                                      .replace(/\[value3\]/gm, rank && rank.value3)
                                                      .replace(/\[value4\]/gm, rank && rank.value4)
                                                      .replace(/\[value5\]/gm, rank && rank.value5)
                                                      .replace(/\[BRV_CAP\]/gm, brv_cap.toLocaleString("en-US"))
                                                      .replace(/\[BRV_CAP_VAL\]/gm, brv_cap_value.toLocaleString("en-US"))
                                                      .replace(/\[MAX_CAP\]/gm, max_brv_cap.toLocaleString("en-US"))
                                                      .replace(/\[MAX_CAP_VAL\]/gm, max_brv_cap_value.toLocaleString("en-US"))
    }
    if (effect_id && effect_id.EffectValueTypeShow != false && effect_id.effect_value_typestr != undefined) {
        effect_value_type_str = effect_id.effect_value_typestr
    }

    full_text = `${cond_str != undefined ? cond_str : ""}${cond_str != undefined ? "\n" : ""}${eff_str != undefined ? eff_str : ""}${eff_str != undefined ? "\n" : ""}${stack_str != undefined ? stack_str : ""}${stack_str != undefined ? "\n" : ""}${val_type_str != undefined ? val_type_str : ""}${val_type_str != undefined ? "\n" : ""}${effect_value_type_str != undefined ? effect_value_type_str : ""}${effect_value_type_str != undefined ? "\n" : ""}${val_edit_type_str != undefined ? val_edit_type_str : ""}${val_edit_type_str != undefined ? "\n" : ""}`

    if (effect_id == undefined || effect_id.hidden == true) {
        return (
            ""
        )
    } else {
        return (
            full_text
        )
    }
}