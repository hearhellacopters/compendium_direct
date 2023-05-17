import React, { useState, useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import ailment_data_pars from './Ailment_Data_Pars'
import Ailment_Data_Pars_Dif from './Ailment_Data_Pars_Dif';
import Ailment_Field_Effect_Pars from './Ailment_Field_Effect_Pars';
import Format_Cleaner from '../../../processing/Format_Cleaner'
import replacer_titles from '../../../processing/replacer_buffcontent'
const Diff = require('diff');

const Ailment_Dif = ({
    master_index,
    ver_old,
    buff_old,
    ver_new,
    buff_new,

    currentlevel_passoff,
    currentturns_passoff,
    currentenemies_passoff,
    currentstacks_passoff,
    currentdebuffsranks_passoff,
    currentdebuffsmuliply_passoff,
    currentbuffsranks_passoff,
    currentfieldbuffsranks_passoff,
    currentbuffsmuliply_passoff,
    currentgroupstacks_passoff,
    currenthp_passoff,
    charactersleft_passoff,
    characterskb_passoff,
}) => {

    const loc = "ailmment"

    const makediff = (oldText, newText) => {
        const JPDESCREPLACE = Diff.diffTrimmedLines(oldText + "\n", newText + "\n", { newlineIsToken: false })
        const output = JPDESCREPLACE.map(text => `${text.added == true ? '~~' + text.value + '~.~' : ""}${text.removed == true ? '^^' + text.value + '^.^' : ""}${text.removed == undefined && text.added == undefined ? text.value : ""}`).join("")
        return (
            output
        )
    }

    const [highestlvl_new, setHighestlvl_new] = useStateIfMounted();
    const [highestlvl_old, setHighestlvl_old] = useStateIfMounted();

    useEffect(() => {
        if (buff_new.max_level >= 10) {
            setHighestlvl_new(10)
        }
        if (buff_new.max_level <= 10 && buff_new.max_level != 0) {
            setHighestlvl_new(buff_new.max_level)
        }
        if (buff_new.max_level == 0) {
            setHighestlvl_new(0)
        }
        if (buff_new.max_level_overide != undefined) {
            setHighestlvl_new(buff_new.max_level_overide)
        }

        if (buff_new.max_level == -1 && buff_new.aarg2 != undefined) {
            setHighestlvl_new(buff_new.aarg2)
        }
        if (buff_new.max_level == -1 && buff_new.aarg2 == undefined) {
            setHighestlvl_new(10)
        }
        // eslint-disable-next-line 
    }, [buff_new])

    useEffect(() => {
        if (buff_old.max_level >= 10) {
            setHighestlvl_old(10)
        }
        if (buff_old.max_level <= 10 && buff_old.max_level != 0) {
            setHighestlvl_old(buff_old.max_level)
        }
        if (buff_old.max_level == 0) {
            setHighestlvl_old(0)
        }
        if (buff_old.max_level_overide != undefined) {
            setHighestlvl_old(buff_old.max_level_overide)
        }

        if (buff_old.max_level == -1 && buff_old.aarg2 != undefined) {
            setHighestlvl_old(buff_old.aarg2)
        }
        if (buff_old.max_level == -1 && buff_old.aarg2 == undefined) {
            setHighestlvl_old(10)
        }
        // eslint-disable-next-line 
    }, [buff_old])


    const ailment_pars_new = {}

    for (let index = 0; index < 10; index++) {
        const ail_data = buff_new[`effect_id${index == 0 ? "" : `_${index}`}`] &&
            ailment_data_pars(
                buff_new.id,
                buff_new[`effect_id${index == 0 ? "" : `_${index}`}`],
                buff_new[`val_type${index == 0 ? "" : `_${index}`}`],
                buff_new[`val_specify${index == 0 ? "" : `_${index}`}`],
                buff_new[`val_edit_type${index == 0 ? "" : `_${index}`}`],
                buff_new[`cond_id${index == 0 ? "" : `_${index}`}`],
                buff_new[`rank_table${index == 0 ? "" : `_${index}`}`],
                buff_new.is_buff,
                //effect#
                index,
                master_index,
                ver_new,
                //aug1&2
                buff_new.aarg1,
                buff_new.aarg2,
                highestlvl_new,
                buff_new.arank,
                buff_new.aranka,
                buff_new.aarg1a,
                buff_new.aarg2a,
                undefined,
            )
        if (ail_data != undefined) {
            Object.assign(ailment_pars_new, { [`effect_id_${index}`]: ail_data })
        }
    }

    if (buff_new.field != undefined) {
        Object.assign(ailment_pars_new, { field: [] })
        buff_new.field.forEach(self => {
            const field_data = Ailment_Field_Effect_Pars(
                self,
                false, //Single

                buff_new.is_buff,
                buff_new.aarg1,
                buff_new.aarg2,
                highestlvl_new,
                buff_new.arank,
                buff_new.aranka,
                buff_new.aarg1a,
                buff_new.aarg2a,
                ver_new,
                buff_new,
                master_index
            )
            ailment_pars_new.field.push(field_data)
        })
    }

    const ailment_pars_old = {}

    for (let index = 0; index < 10; index++) {
        const ail_data = buff_old[`effect_id${index == 0 ? "" : `_${index}`}`] &&
            ailment_data_pars(
                buff_old.id,
                buff_old[`effect_id${index == 0 ? "" : `_${index}`}`],
                buff_old[`val_type${index == 0 ? "" : `_${index}`}`],
                buff_old[`val_specify${index == 0 ? "" : `_${index}`}`],
                buff_old[`val_edit_type${index == 0 ? "" : `_${index}`}`],
                buff_old[`cond_id${index == 0 ? "" : `_${index}`}`],
                buff_old[`rank_table${index == 0 ? "" : `_${index}`}`],
                buff_old.is_buff,
                //effect#
                index,
                master_index,
                ver_old,
                //aug1&2
                buff_old.aarg1,
                buff_old.aarg2,
                highestlvl_old,
                buff_old.arank,
                buff_old.aranka,
                buff_old.aarg1a,
                buff_old.aarg2a,
                undefined,
            )
        if (ail_data != undefined) {
            Object.assign(ailment_pars_old, { [`effect_id_${index}`]: ail_data })
        }
    }

    if (buff_old.field != undefined) {
        Object.assign(ailment_pars_old, { field: [] })
        buff_old.field.forEach(self => {
            const field_data = Ailment_Field_Effect_Pars(
                self,
                false, //Single

                buff_old.is_buff,
                buff_old.aarg1,
                buff_old.aarg2,
                highestlvl_old,
                buff_old.arank,
                buff_old.aranka,
                buff_old.aarg1a,
                buff_old.aarg2a,
                ver_old,
                buff_old,
                master_index
            )
            ailment_pars_old.field.push(field_data)
        })
    }

    const ailment_num = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
    ]

    var new_text = ""

    ailment_num.forEach(num => {
        const text = Ailment_Data_Pars_Dif(
            ailment_pars_new[`effect_id_${num}`],
            currentlevel_passoff,
            currentturns_passoff,
            currentenemies_passoff,
            currentstacks_passoff,
            currentdebuffsranks_passoff,
            currentdebuffsmuliply_passoff,
            currentbuffsranks_passoff,
            currentfieldbuffsranks_passoff,
            currentbuffsmuliply_passoff,
            currentgroupstacks_passoff,
            currenthp_passoff,
            charactersleft_passoff,
            characterskb_passoff
        )
        if (text == " - Activates Field Effects\n") {
            new_text = `${new_text}<fieldeffects>\n`
        } else {
            new_text = `${new_text}${text}`
        }
    })

    if (ailment_pars_new.field != undefined) {
        ailment_pars_new.field.forEach(effect_id => {
            const text = Ailment_Data_Pars_Dif(
                effect_id,
                currentlevel_passoff,
                currentturns_passoff,
                currentenemies_passoff,
                currentstacks_passoff,
                currentdebuffsranks_passoff,
                currentdebuffsmuliply_passoff,
                currentbuffsranks_passoff,
                currentfieldbuffsranks_passoff,
                currentbuffsmuliply_passoff,
                currentgroupstacks_passoff,
                currenthp_passoff,
                charactersleft_passoff,
                characterskb_passoff
            )
            new_text = `${new_text}${text}`
        })
    }

    var old_text = ""

    ailment_num.forEach(num => {
        const text = Ailment_Data_Pars_Dif(
            ailment_pars_old[`effect_id_${num}`],
            currentlevel_passoff,
            currentturns_passoff,
            currentenemies_passoff,
            currentstacks_passoff,
            currentdebuffsranks_passoff,
            currentdebuffsmuliply_passoff,
            currentbuffsranks_passoff,
            currentfieldbuffsranks_passoff,
            currentbuffsmuliply_passoff,
            currentgroupstacks_passoff,
            currenthp_passoff,
            charactersleft_passoff,
            characterskb_passoff
        )
        if (text == " - Activates Field Effects\n") {
            old_text = `${old_text}<fieldeffects>\n`
        } else {
            old_text = `${old_text}${text}`
        }
    })

    if (ailment_pars_old.field != undefined) {
        ailment_pars_old.field.forEach(effect_id => {
            const text = Ailment_Data_Pars_Dif(
                effect_id,
                currentlevel_passoff,
                currentturns_passoff,
                currentenemies_passoff,
                currentstacks_passoff,
                currentdebuffsranks_passoff,
                currentdebuffsmuliply_passoff,
                currentbuffsranks_passoff,
                currentfieldbuffsranks_passoff,
                currentbuffsmuliply_passoff,
                currentgroupstacks_passoff,
                currenthp_passoff,
                charactersleft_passoff,
                characterskb_passoff
            )
            old_text = `${old_text}${text}`
        })
    }

    return (
        <>
            {replacer_titles(makediff(Format_Cleaner(old_text).replace(/\s+$/g, ""), Format_Cleaner(new_text).replace(/\s+$/g, "")))}
        </>
    )
}
export default Ailment_Dif