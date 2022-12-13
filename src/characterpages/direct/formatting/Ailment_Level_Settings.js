import React, { useState, useEffect } from 'react';
import Tippy from '../../../formatting/TippyDefaults'
import addformatting from '../../../processing/replacer_abilitycontent';
import Format_Cleaner from '../../../processing/Format_Cleaner'

const Ailment_Level_Settings = ({
    levelsettings
}) => {

    const [useJPtext, setuseJPtext] = useState(false)

    const usejptext = (e) => {
        if (e.shiftKey) {
            if (useJPtext == false) {
                setuseJPtext(true)
            } else {
                setuseJPtext(false)
            }
        }
    }

    const colormaker = (text) => {
        const cancelcheck = text && text.includes("Cancel")
        const cancelcheck2 = text && text.includes("消滅条件")
        if (cancelcheck == true || cancelcheck2 == true) {
            return "Cancel"
        }
        const triggercheck = text && text.includes("Trigger")
        const triggercheck2 = text && text.includes("出現条件")
        if (triggercheck == true || triggercheck2 == true) {
            return "Trigger"
        }
        const tickcheck = text && text.includes("Tick")
        const tickcheck2 = text && text.includes("減少条件")
        if (tickcheck == true || tickcheck2 == true) {
            return "Tick"
        }
        const pausecheck = text && text.includes("Pause")
        const pausecheck2 = text && text.includes("停止条件")
        if (pausecheck == true || pausecheck2 == true) {
            return "Pause"
        }
        const increase = text && text.includes("Increase")
        const increase2 = text && text.includes("増加条件")
        if (increase == true || increase2 == true) {
            return "Increase"
        }
    }

    return (
        <div className="introflex blackbase">
            <div className="intable" onClick={usejptext}>Level Conditions:</div>
            <hr />
            {levelsettings.map((item, i) =>
                useJPtext == true ?
                    item.plain_text != undefined ?
                        <div className={colormaker(item.plain_text)} key={i}>{item.plain_text && addformatting(Format_Cleaner(item.plain_text))}
                        </div> :
                        <div className={colormaker(item.trans)} key={i}>
                            {item.trans && addformatting(Format_Cleaner(item.trans))}
                        </div>
                    :
                    item.trans != undefined ?
                        <div className={colormaker(item.trans)} key={i}>
                            {item.trans && addformatting(Format_Cleaner(item.trans))}
                        </div> :
                        <div className={colormaker(item.plain_text)} key={i}>{item.plain_text && addformatting(Format_Cleaner(item.plain_text))}
                        </div>
            )}
        </div>
    )
}
export default Ailment_Level_Settings