import React, { useState, useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import reactStringReplace from "react-string-replace"
import replacer_titles from '../../../processing/replacer_titles'
import Capped from '../../../processing/capped';
import between_10 from '../../../processing/between_10';
import replacer_buff from '../../../processing/replacer_buffcontent'

const Ailment_Data_Pars_Handler = ({
    effect_id,
    slider,
    currentrank,
    currentlevel,
    currentturns,
    currentenemies,
    currentstacks,
    currentdebuffsranks,
    currentdebuffsmuliply,
    currentbuffsranks,
    currentfieldbuffsranks,
    currentbuffsmuliply,
    currentgroupstacks,
    currenthp,
    charactersleft,
    castlocation,
    formatting,
    setonion_passoff,
    setshowdesc,
    hide_type,
    spacer,
}) => {

    const [rank, setrank] = useStateIfMounted(effect_id && effect_id.rank1)
    const [override, setoverride] = useStateIfMounted(false)
    const [displayrank, setdisplayrank] = useStateIfMounted(rank)
    const [brv_cap, set_brv_cap] = useStateIfMounted(0)
    const [max_brv_cap, set_max_brv_cap] = useStateIfMounted(0)
    const [brv_cap_value, set_brv_cap_value] = useStateIfMounted(0)
    const [max_brv_cap_value, set_max_brv_cap_value] = useStateIfMounted(0)

    const [onion, setonion] = useStateIfMounted(false)

    useEffect(() => {
        if (effect_id) {
            setonion(effect_id.effectstr.includes("Changes text description"))
        }
    }, [effect_id, setonion])

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
    }, [override, rank, set_max_brv_cap, set_brv_cap,displayrank,setdisplayrank, set_brv_cap_value, set_max_brv_cap_value, currentbuffsmuliply, currentdebuffsmuliply, castlocation, currenthp, charactersleft, currentgroupstacks, currentfieldbuffsranks, currentbuffsranks, currentdebuffsranks, currentenemies, currentstacks, currentturns, slider, currentrank, effect_id, currentlevel, setrank])

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
        }
    },[rank, setdisplayrank,effect_id,currentbuffsmuliply,currentdebuffsmuliply])

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
    }, [effect_id, setcond_str, cond_str, eff_str, effect_value_type_str, hide_type, spacer, setstack_str, val_type_str, brv_cap_value, max_brv_cap_value, val_edit_type_str, onion, displayrank, rank, brv_cap, max_brv_cap, setval_edit_type_str, setval_type_str, seteff_str, seteffect_value_type_str])

    const seteffect = (value) => {
        setoverride(true)
        setrank(value)
    }

    const addformatting = (text, switching) => {
        if (formatting != true) {
            let replacement = text
            var number = 0

            replacement = replacement == undefined ? "" : reactStringReplace(replacement, /(\[.*?\])/, (match, i) => {
                number = number + 1
                return (
                    <span key={`16-${i}-${number}`} className="unique">{match}</span>
                )
            })
            replacement = replacement == "" ? "" : reactStringReplace(replacement, /(Down$|Down[\s])/, (match, i) => {
                number = number + 1
                return (
                    <span key={`2-${i}-${number}`} className={"downstat"}>{match}</span>
                )
            })
            replacement = replacement == "" ? "" : reactStringReplace(replacement, /(Up$|Up[\s])/, (match, i) => {
                number = number + 1
                return (
                    <span key={`3-${i}-${number}`} className={"upstat"}>{match}</span>
                )
            })
            replacement = replacement == "" ? "" : reactStringReplace(replacement, /\|(.*?)\|/, (match, i) => {
                number = number + 1
                return (
                    <Capped key={`5-${i}-${number}`} text={match} />
                )
            })
            replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\d+%)/, (match, i) => {
                number = number + 1
                return (
                    <span key={`4-${i}-${number}`} className="values">{match}</span>
                )
            })
            replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\\n )/, (match, i) => {
                number = number + 1
                return (
                    <span key={`13-${i}-${number}`}><br />{`\xa0`}</span>
                )
            })
            replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\n )/, (match, i) => {
                number = number + 1
                return (
                    <span key={`12-${i}-${number}`}><br />{`\xa0`}</span>
                )
            })
            replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\\n)/, (match, i) => {
                number = number + 1
                return (
                    <br key={`10-${i}-${number}`} />
                )
            })
            replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\n)/, (match, i) => {
                number = number + 1
                return (
                    <br key={`11-${i}-${number}`} />
                )
            })
            return (
                replacement
            )
        } else {
            if (switching == "tl") {
                return replacer_titles(text)
            }
            if (switching == "bu") {
                return replacer_buff(text)
            }
        }
    }

    const desc_toggle = (value) => {
        setshowdesc(true)
        setonion_passoff(value)
    }

    if (effect_id == undefined) {
        return (
            ""
        )
    }

    const full_return =
        <div>
            {cond_str != undefined ?
                <div>
                    {addformatting(cond_str, "bu")}
                </div>
                : ""}
            {effect_id && effect_id.effectstr && onion == false ?
                <div className={`${castlocation == true && currentlevel <= 0 && (effect_id.slidertype == "levels" || effect_id.defaultrank <= 0) ? "inactiveeffect" : ""}`}>
                    {addformatting(eff_str, "bu")}
                </div>
                : ""}
            {effect_id && effect_id.effectstr && onion == true ?
                <div>
                    {`\xa0${effect_id.cond_id != undefined ? "└─" : "-"} ${effect_id.effectstr.replace(/\[value1\]/gm, "")}`}
                    <span onClick={() => setonion_passoff && displayrank && displayrank.value1 != 0 ? desc_toggle(displayrank && displayrank.value1) : ""} className={displayrank && displayrank.value1 != 0 ? `clicky updatelink` : ""}>{displayrank && displayrank.value1}</span>
                </div>
                : ""}
            {hide_type != true ?
                <>
                    {stack_str ?
                        <div className="typeval">
                            {addformatting(stack_str, "bu")}
                        </div>
                        : ""}
                    {val_type_str ?
                        <div className="typeval">
                            {addformatting(val_type_str, "bu")}
                        </div>
                        : ""}
                    {effect_value_type_str ?
                        <div className="typeval">
                            {addformatting(effect_value_type_str, "bu")}
                        </div>
                        : ""}
                    {val_edit_type_str ?
                        <div className="typeval">
                            {addformatting(val_edit_type_str, "bu")}
                        </div>
                        : ""}
                </>
                : ""}
        </div>

    if(effect_id.hidden == true){
        return(
            ""
        )
    }
    if (effect_id != undefined) {
        if (castlocation == true) {
            return (
                full_return
            )
        } else {
            return (
                <>
                    {full_return}
                    {slider == true ? "" :
                        effect_id == undefined ? "" :
                            <div className="abilityspacearound">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                    effect_id && effect_id[`rank${num}`] && effect_id[`rank${num}`].value1 == undefined ? "" :
                                        <div key={num} className="padleft updatelink clicky" onClick={() => seteffect(effect_id[`rank${num}`])}>
                                            {effect_id && effect_id[`rank${num}`] && effect_id[`rank${num}`].value1 != undefined ? `${num}) ` + effect_id[`rank${num}`].value1 : ""}
                                            {effect_id && effect_id[`rank${num}`].value2 && effect_id[`rank${num}`].value2 != undefined ? " " + effect_id[`rank${num}`].value2 : ""}
                                            {effect_id && effect_id[`rank${num}`].value3 && effect_id[`rank${num}`].value3 != undefined ? " " + effect_id[`rank${num}`].value3 : ""}
                                            {effect_id && effect_id[`rank${num}`].value4 && effect_id[`rank${num}`].value4 != undefined ? " " + effect_id[`rank${num}`].value4 : ""}
                                            {effect_id && effect_id[`rank${num}`].value5 && effect_id[`rank${num}`].value5 != undefined ? " " + effect_id[`rank${num}`].value5 : ""}
                                        </div>
                                ))}
                            </div>}
                </>
            )
        }
    }
}

export default Ailment_Data_Pars_Handler