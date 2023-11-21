import React from 'react';
import ailment_data_pars_dif from '../../processing/ailment/ailment_data_pars_dif';
import Format_Cleaner from '../../processing/format_cleaner'
import ReplacerCharacter from '../ReplacerCharacter'
import makediff from '../../processing/makediff';

export default function AilmentEffectDif ({
    ailment_data_trans_new,
    ailment_data_trans_old,
    currentlevel_passoff,
    currentturns_passoff,
    currentenemies_passoff,
    currentstacks_passoff,
    currentdebuffsranks_passoff,
    currentdebuffsranks2_passoff,
    currentdebuffsmuliply_passoff,
    currentbuffsranks_passoff,
    currentfieldbuffsranks_passoff,
    currentbuffsmuliply_passoff,
    currentbuffsmuliplysolo_passoff,
    currentgroupstacks_passoff,
    currenthp_passoff,
    charactersleft_passoff,
    characterskb_passoff,
    currentweaknessmuliply_passoff
}){

    const forma = {diffing:true,updown:true}

    const ailment_pars_new = ailment_data_trans_new.ailment_pars

    const ailment_pars_old = ailment_data_trans_old.ailment_pars

    var new_text = ""

    for (let num = 0; num < 10; num++) {
        const text = ailment_data_pars_dif(
            ailment_pars_new[`effect_id_${num}`],
            currentlevel_passoff,
            currentturns_passoff,
            currentenemies_passoff,
            currentstacks_passoff,
            currentdebuffsranks_passoff,
            currentdebuffsranks2_passoff,
            currentdebuffsmuliply_passoff,
            currentbuffsranks_passoff,
            currentfieldbuffsranks_passoff,
            currentbuffsmuliply_passoff,
            currentbuffsmuliplysolo_passoff,
            currentgroupstacks_passoff,
            currenthp_passoff,
            charactersleft_passoff,
            characterskb_passoff,
            currentweaknessmuliply_passoff
        )
        if (text == " - Activates Field Effects\n") {
            new_text = `${new_text}<fieldeffects>\n`
        } else {
            new_text = `${new_text}${text}`
        }
    }

    if (ailment_pars_new.field != undefined) {
        ailment_pars_new.field.forEach(effect_id => {
            const text = ailment_data_pars_dif(
                effect_id,
                currentlevel_passoff,
                currentturns_passoff,
                currentenemies_passoff,
                currentstacks_passoff,
                currentdebuffsranks_passoff,
                currentdebuffsranks2_passoff,
                currentdebuffsmuliply_passoff,
                currentbuffsranks_passoff,
                currentfieldbuffsranks_passoff,
                currentbuffsmuliply_passoff,
                currentbuffsmuliplysolo_passoff,
                currentgroupstacks_passoff,
                currenthp_passoff,
                charactersleft_passoff,
                characterskb_passoff,
                currentweaknessmuliply_passoff
            )
            new_text = `${new_text}${text}`
        })
    }

    var old_text = ""

    for (let num = 0; num < 10; num++) {
        const text = ailment_data_pars_dif(
            ailment_pars_old[`effect_id_${num}`],
            currentlevel_passoff,
            currentturns_passoff,
            currentenemies_passoff,
            currentstacks_passoff,
            currentdebuffsranks_passoff,
            currentdebuffsranks2_passoff,
            currentdebuffsmuliply_passoff,
            currentbuffsranks_passoff,
            currentfieldbuffsranks_passoff,
            currentbuffsmuliply_passoff,
            currentbuffsmuliplysolo_passoff,
            currentgroupstacks_passoff,
            currenthp_passoff,
            charactersleft_passoff,
            characterskb_passoff,
            currentweaknessmuliply_passoff
        )
        if (text == " - Activates Field Effects\n") {
            old_text = `${old_text}<fieldeffects>\n`
        } else {
            old_text = `${old_text}${text}`
        }
    }

    if (ailment_pars_old.field != undefined) {
        ailment_pars_old.field.forEach(effect_id => {
            const text = ailment_data_pars_dif(
                effect_id,
                currentlevel_passoff,
                currentturns_passoff,
                currentenemies_passoff,
                currentstacks_passoff,
                currentdebuffsranks_passoff,
                currentdebuffsranks2_passoff,
                currentdebuffsmuliply_passoff,
                currentbuffsranks_passoff,
                currentfieldbuffsranks_passoff,
                currentbuffsmuliply_passoff,
                currentbuffsmuliplysolo_passoff,
                currentgroupstacks_passoff,
                currenthp_passoff,
                charactersleft_passoff,
                characterskb_passoff,
                currentweaknessmuliply_passoff
            )
            old_text = `${old_text}${text}`
        })
    }

    return (
        ReplacerCharacter(makediff(Format_Cleaner(old_text).replace(/\s+$/g, ""), Format_Cleaner(new_text).replace(/\s+$/g, "")),forma)
    )
}