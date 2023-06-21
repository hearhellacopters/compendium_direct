import React from 'react';
import ReplacerCharacter from '../../ReplacerCharacter'

export default function AilmentLevelSettingsEnemy({
    levelsettings
}){

    const colormaker = (text) => {
        const cancelcheck = text && text.includes("Cancel")
        if (cancelcheck == true) {
            return "Cancel"
        }
        const triggercheck = text && text.includes("Trigger")
        if (triggercheck == true) {
            return "Trigger"
        }
        const tickcheck = text && text.includes("Tick")
        if (tickcheck == true) {
            return "Tick"
        }
        const pausecheck = text && text.includes("Pause")
        if (pausecheck == true) {
            return "Pause"
        }
        const increase = text && text.includes("Increase")
        if (increase == true) {
            return "Increase"
        }
    }

    return (
        <div className="p_note">
            <div className='fieldbar'>Level Conditions:</div>
            {levelsettings.map((item, i) =>
                item != undefined ?
                    <div className={colormaker(item)} key={i}>
                        {item && ReplacerCharacter(item)}
                    </div>
                    : "")}
        </div>
    )
}