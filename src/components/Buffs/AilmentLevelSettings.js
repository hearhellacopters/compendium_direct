import React, { useState } from 'react';
import ReplacerCharacter from '../ReplacerCharacter';
import Format_Cleaner from '../../processing/format_cleaner'

export default function AilmentLevelSettings({
    levelsettings
}){

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
        <div className="p_note">
            <div className='fieldbar' onClick={usejptext}>Level Conditions:</div>
            {levelsettings.map((item, i) =>
                useJPtext == true ?
                    item.plain_text != undefined ?
                        <div className={colormaker(item.plain_text)} key={i}>
                            {item.plain_text && ReplacerCharacter(Format_Cleaner(item.plain_text))}
                        </div> 
                        :
                        <div className={colormaker(item.trans)} key={i}>
                            {item.trans && ReplacerCharacter(Format_Cleaner(item.trans))}
                        </div>
                    :
                    item.trans != undefined ?
                        <div className={colormaker(item.trans)} key={i}>
                            {item.trans && ReplacerCharacter(Format_Cleaner(item.trans))}
                        </div> 
                        :
                        <div className={colormaker(item.plain_text)} key={i}>
                            {item.plain_text && ReplacerCharacter(Format_Cleaner(item.plain_text))}
                        </div>
            )}
        </div>
    )
}