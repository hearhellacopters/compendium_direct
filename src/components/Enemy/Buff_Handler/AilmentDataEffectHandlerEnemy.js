import React, { useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import ReplacerCharacter from '../../ReplacerCharacter'
import between_10 from '../../../processing/ailment/ailment_rank_between_10';

export default function AilmentDataEffectHandlerEnemy({
    effect_id,
    slider,
    currentrank,
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
    currentbuffsmuliplysolo,
    currentgroupstacks,
    currenthp,
    charactersleft,
    characterskb,
    currentweaknessmuliply,
    castlocation,
    formatting,
    setonion_passoff,
    setshowdesc,
    hide_type,
    spacer,
}){

    const [rank, setrank] = useStateIfMounted(effect_id && effect_id.rank1)
    const [override, setoverride] = useStateIfMounted(false)
    const [displayrank, setdisplayrank] = useStateIfMounted(rank)
    const [brv_cap, set_brv_cap] = useStateIfMounted(0)
    const [max_brv_cap, set_max_brv_cap] = useStateIfMounted(0)
    const [brv_cap_value, set_brv_cap_value] = useStateIfMounted(0)
    const [max_brv_cap_value, set_max_brv_cap_value] = useStateIfMounted(0)

    useEffect(() => {
        if (override != true) {
            //ranks
            if (effect_id && effect_id.slidertype == "ranks" && castlocation == false) {
                setrank(effect_id && effect_id[`rank${between_10(currentrank)}`])
            }
            if (effect_id && effect_id.slidertype == "ranks" && effect_id.defaultrank != undefined && castlocation == true) {
                setrank(effect_id && effect_id[`rank${between_10(effect_id.defaultrank)}`])
            }
            //levels
            if (effect_id && effect_id.slidertype == "levels" && currentlevel != undefined) {
                setrank(effect_id && effect_id[`rank${between_10(currentlevel)}`])
            }
            //turns
            if (effect_id && effect_id.slidertype == "turns" && currentturns != undefined) {
                setrank(effect_id && effect_id[`rank${between_10(currentturns)}`])
            }
            //enemies
            if (effect_id && effect_id.slidertype == "enemies" && currentenemies != undefined) {
                setrank(effect_id && effect_id[`rank${between_10(currentenemies)}`])
            }
            //stacks
            if (effect_id && effect_id.slidertype == "stacks" && currentstacks != undefined) {
                setrank(effect_id && effect_id[`rank${between_10(currentstacks)}`])
            }
            //groupstacks
            if (effect_id && effect_id.slidertype == "groupstacks" && currentgroupstacks != undefined) {
                setrank(effect_id && effect_id[`rank${between_10(currentgroupstacks)}`])
            }
            //debuffsrank
            if (effect_id && effect_id.slidertype == "debuffsrank" && currentdebuffsranks != undefined) {
                setrank(effect_id && effect_id[`rank${between_10(currentdebuffsranks)}`])
            }
             //debuffsrank2
             if (effect_id && effect_id.slidertype == "debuffsrank2" && currentdebuffsranks2 != undefined) {
                setrank(effect_id && effect_id[`rank${between_10(currentdebuffsranks)}`])
            }
            //buffsrank
            if (effect_id && effect_id.slidertype == "buffsrank" && currentbuffsranks != undefined) {
                setrank(effect_id && effect_id[`rank${between_10(currentbuffsranks)}`])
            }
            //fieldbuffsrank
            if (effect_id && effect_id.slidertype == "fieldbuffsrank" && currentfieldbuffsranks != undefined) {
                setrank(effect_id && effect_id[`rank${between_10(currentfieldbuffsranks)}`])
            }
            //currenthp backwards
            if (effect_id && effect_id.slidertype == "currenthp" && currenthp != undefined) {
                for (let index = 10; index > 0; index--) {
                    if (effect_id[`rank${index}`] && effect_id[`rank${index}`].value3 <= currenthp) {
                        setrank(effect_id && effect_id[`rank${index}`])
                    }
                }
            }
            //charactersleft
            if (effect_id && effect_id.slidertype == "charactersleft" && charactersleft != undefined) {
                for (let index = 0; index < 3; index++) {
                    if (charactersleft == index) {
                        setrank(effect_id && effect_id[`rank${index + 1}`])
                    }
                }
            }
            //characterskb
            if (effect_id && effect_id.slidertype == "charactersleft" && characterskb != undefined) {
                for (let index = 0; index < 4; index++) {
                    if (characterskb == index) {
                        setrank(effect_id && effect_id[`rank${index + 1}`])
                    }
                }
            }
        }
        if (effect_id && effect_id.multiply == false) {
            setdisplayrank(rank)
        }
        if (rank && rank.value1 != undefined) {
            if (typeof rank.value1 == "number") {
                set_brv_cap(Math.round(rank.value1 * 100))
                set_max_brv_cap(Math.round(rank.value1 * 1000))
                set_brv_cap_value(Math.round(((rank.value1 / 100) + 1) * 9999))
                set_max_brv_cap_value(Math.round(((rank.value1 / 100) + 1) * 99999))
            }
        }
        if (displayrank && displayrank.value1 != undefined) {
            if (typeof displayrank.value1 == "number") {
                set_brv_cap(Math.round(displayrank.value1 * 100))
                set_max_brv_cap(Math.round(displayrank.value1 * 1000))
                set_brv_cap_value(Math.round(((displayrank.value1 / 100) + 1) * 9999))
                set_max_brv_cap_value(Math.round(((displayrank.value1 / 100) + 1) * 99999))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [override, rank, displayrank, set_max_brv_cap, set_brv_cap, set_brv_cap_value, set_max_brv_cap_value, currentbuffsmuliply, currentbuffsmuliplysolo, currentweaknessmuliply, currentdebuffsranks2, characterskb, currentdebuffsmuliply, castlocation, currenthp, charactersleft, currentgroupstacks, currentfieldbuffsranks, currentbuffsranks, currentdebuffsranks, currentenemies, currentstacks, currentturns, slider, currentrank, effect_id, currentlevel, setrank])

    useEffect(()=>{
        if (effect_id && effect_id.multiply == true) {
            if (effect_id && effect_id.multiplyslider == "debuffsmuliply") {
                const holder = rank.value1 * (currentdebuffsmuliply - 1)
                setdisplayrank({ value1: holder })
            }
            if (effect_id && effect_id.multiplyslider == "buffsmuliply") {
                const holder = rank && rank.value1 * (currentbuffsmuliply - 1)
                setdisplayrank({ value1: holder })
            }
            if (effect_id && effect_id.multiplyslider == "buffsmuliplysolo") {
                const holder = rank && rank.value1 * (currentbuffsmuliplysolo - 1)
                setdisplayrank({ value1: holder })
            }
            if (effect_id && effect_id.multiplyslider == "weaknessmuliply") {
                const holder = rank && rank.value1 * (currentweaknessmuliply - 1)
                setdisplayrank({ value1: holder })
            }
        }
    },[rank, setdisplayrank,effect_id,currentbuffsmuliply, currentbuffsmuliplysolo, currentdebuffsmuliply, currentweaknessmuliply])

    const [cond_str, setcond_str] = useStateIfMounted()
    const [eff_str, seteff_str] = useStateIfMounted()
    const [stack_str, setstack_str] = useStateIfMounted()
    const [val_type_str, setval_type_str] = useStateIfMounted()
    const [val_edit_type_str, setval_edit_type_str] = useStateIfMounted()
    const [effect_value_type_str, seteffect_value_type_str] = useStateIfMounted()

    //textdisplay
    useEffect(() => {
        if (effect_id && effect_id.cond_id) {
            setcond_str(` ┬ ${effect_id.cond_id}`)
        }
        if (effect_id && effect_id.attached != undefined) {
            effect_id && effect_id.attached.forEach(self=>{
                setcond_str((preVale)=> preVale + `\n ├─ Or ${self.cond_id}`)
            })
        }
        if (effect_id && effect_id.effectstr) {
            seteff_str(` ${spacer != undefined ? spacer : effect_id.cond_id != undefined ? "└─" : "-"} ${
                effect_id.effectstr.replace(/\[value1\]/gm, displayrank && displayrank.value1)
                                   .replace(/\[value2\]/gm, rank && rank.value2)
                                   .replace(/\[value3\]/gm, rank && rank.value3)
                                   .replace(/\[value4\]/gm, rank && rank.value4)
                                   .replace(/\[value5\]/gm, rank && rank.value5)
                                   .replace(/\[BRV_CAP\]/gm, brv_cap.toLocaleString("en-US"))
                                   .replace(/\[BRV_CAP_VAL\]/gm, brv_cap_value.toLocaleString("en-US"))
                                   .replace(/\[MAX_CAP\]/gm, max_brv_cap.toLocaleString("en-US"))
                                   .replace(/\[MAX_CAP_VAL\]/gm, max_brv_cap_value.toLocaleString("en-US"))}`)
        }
        if (hide_type != true) {
            if (effect_id && effect_id.stack_flag != undefined) {
                setstack_str(effect_id.stack_flag)
            }
            if (effect_id && effect_id.ValTypeShow != false && effect_id.val_typestr != undefined) {
                setval_type_str(effect_id.val_typestr)
            }
            if (effect_id && effect_id.ValEditTypeShow != false && effect_id.val_edit_typestr != undefined) {
                setval_edit_type_str(effect_id.val_edit_typestr.replace(/\[value1\]/gm, rank && rank.value1)
                                                               .replace(/\[value2\]/gm, rank && rank.value2)
                                                               .replace(/\[value3\]/gm, rank && rank.value3)
                                                               .replace(/\[value4\]/gm, rank && rank.value4)
                                                               .replace(/\[value5\]/gm, rank && rank.value5)
                                                               .replace(/\[BRV_CAP\]/gm, brv_cap.toLocaleString("en-US"))
                                                               .replace(/\[BRV_CAP_VAL\]/gm, brv_cap_value.toLocaleString("en-US"))
                                                               .replace(/\[MAX_CAP\]/gm, max_brv_cap.toLocaleString("en-US"))
                                                               .replace(/\[MAX_CAP_VAL\]/gm, max_brv_cap_value.toLocaleString("en-US")))
            }
            if (effect_id && effect_id.EffectValueTypeShow != false && effect_id.effect_value_typestr != undefined) {
                seteffect_value_type_str(effect_id.effect_value_typestr)
            }
        }
    }, [effect_id, setcond_str, cond_str, eff_str, effect_value_type_str, hide_type, spacer, setstack_str, val_type_str, brv_cap_value, max_brv_cap_value, val_edit_type_str, displayrank, rank, brv_cap, max_brv_cap, setval_edit_type_str, setval_type_str, seteff_str, seteffect_value_type_str])

    const seteffect = (value) => {
        setoverride(true)
        setrank(value)
    }

    if (effect_id == undefined || effect_id.hidden == true) {
        return (
            ""
        )
    } else {
        return (
            <>
                {cond_str != undefined ?
                    ReplacerCharacter(cond_str+"\n")
                : ""}
                {effect_id && effect_id.effectstr ?
                    <div className={`${castlocation == true && currentlevel <= 0 && (effect_id.slidertype == "levels" || effect_id.defaultrank <= 0) ? "inactiveeffect" : ""}`}>
                        {ReplacerCharacter(eff_str,{updown:true})}
                    </div>
                : ""}
                {hide_type != true ?
                    <>
                        {stack_str ?
                            <div className="typeval">
                                {ReplacerCharacter(stack_str)}
                            </div>
                            : ""}
                        {val_type_str ?
                            <div className="typeval">
                                {ReplacerCharacter(val_type_str)}
                            </div>
                            : ""}
                        {effect_value_type_str ?
                            <div className="typeval">
                                {ReplacerCharacter(effect_value_type_str)}
                            </div>
                            : ""}
                        {val_edit_type_str ?
                            <div className="typeval">
                                {ReplacerCharacter(val_edit_type_str)}
                            </div>
                            : ""}
                    </>
                : ""}
            </>
        )
    }
}