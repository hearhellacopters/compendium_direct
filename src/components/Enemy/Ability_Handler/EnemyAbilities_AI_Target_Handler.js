import React from 'react';
import ReplacerCharacter from '../../ReplacerCharacter'
import ReplacerEnemyDesc from '../../ReplacerEnemyDesc'
import Tippy from '../../../components/TippyDefaults.js';

export default function EnemyAbilities_AI_Target_Handler({
    ai,
    abilitylist,
    debug
}){

    const addabilitynum = (label, abilitynum) => {
        const pull = abilitylist[abilitynum]
        const indexpull = Object.values(abilitylist).filter(self => self.ability_index == abilitynum)
        if (pull != undefined) {
            const replacer = `[${pull.Name}] #${pull.abilityid_}`
            label = label.replace(/\[AbilityNum\]/gm, replacer)
        }
        if (indexpull.length != 0) {
            const replacer2 = `[${indexpull[0].Name}] #${indexpull[0].abilityid_}`
            label = label.replace(/\[AbilityIndex\]/gm, replacer2)
        }

        return label
    }

    const change_color = (data) => {
        var holder = "norecast"
        if (data.recast == 1) {
            holder = 'recastgold'
        }
        if (data.orb == 1) {
            holder = 'orbpink'
        }
        if (data.force == 1) {
            holder = 'forceblue'
        }
        return holder
    }

    return (
        <>
            <div className=''>
                {ai.map(self => (
                    self.labels != undefined ?
                        <div key={self.AIKey} className={change_color(self)}>
                            {debug == true ?
                                <Tippy content={self.AIKey}>
                                    <div className='abilitydisplayfex'>{ReplacerEnemyDesc(`\xA0┬ ${self.Chance1 < 100 || self.Chance1 > 100 ? `RNG chance of ≤ ${self.Chance1} to target` : "Targets"} ${self.target && self.target.target != undefined ? self.target.target : ""}${self.target && self.target.chance != undefined ? ` (with a ${self.target.chance}% chance)` : ""} when:`)}</div>
                                </Tippy>
                                :
                                <div className='abilitydisplayfex'>{ReplacerEnemyDesc(`\xA0┬ ${self.Chance1 < 100 || self.Chance1 > 100 ? `RNG chance of ≤ ${self.Chance1} to target` : "Targets"} ${self.target && self.target.target != undefined ? self.target.target : ""}${self.target && self.target.chance != undefined ? ` (with a ${self.target.chance}% chance)` : ""} when:`)}</div>
                            }
                            {self.labels.map((labels, i) => {
                                const lastkey2 = (self.labels.length) - 1
                                return (
                                    labels.AbilityNum != undefined ?
                                        <div key={i}>{ReplacerEnemyDesc(`${lastkey2 == i ? "\xA0└─ " : "\xA0├─ "}${addabilitynum(labels.label, labels.AbilityNum)}`)}</div> :
                                        <div key={i}>{ReplacerEnemyDesc(`${lastkey2 == i ? "\xA0└─ " : "\xA0├─ "}${labels.label}`)}</div>
                                )
                            })}
                            {self.restrict != undefined ?
                                <div className='lightblue'>{ReplacerEnemyDesc(self.restrict)}</div>
                                : ""}
                            {self.Recalculate != undefined ?
                                <div className='lightblue'>{`*Will recalculate target if conditions changes`}</div>
                                : ""}
                            {self.repeat != undefined ?
                                <div className='unique'>{`*Used ${self.repeat} time${self.repeat != 1 ? 's' : ""} per battle`}</div>
                                : ""}
                            {self.Control1 != undefined ?
                                <div className='Cancel'>
                                    {self.Control1}
                                </div>
                                : ""}
                            {self.Control2 != undefined ?
                                <div className='values'>
                                    {self.Control2}
                                </div>
                                : ""}
                        </div>
                        :
                        <div key={self.AIKey} className={change_color(self)}>
                            {debug == true ?
                                <Tippy content={self.AIKey}>
                                    <div className='abilitydisplayfex'>{ReplacerEnemyDesc(`\xA0┬ ${self.Chance1 < 100 || self.Chance1 > 100 ? `RNG chance of ≤ ${self.Chance1} to targets` : "Targets"} ${self.target && self.target.target != undefined ? self.target.target : ""}${self.target && self.target.chance != undefined ? ` (with a ${self.target.chance}% chance)` : ""} when:`)}</div>
                                </Tippy>
                                :
                                <div className='abilitydisplayfex'>{ReplacerEnemyDesc(`\xA0┬ ${self.Chance1 < 100 || self.Chance1 > 100 ? `RNG chance of ≤ ${self.Chance1} to targets` : "Targets"} ${self.target && self.target.target != undefined ? self.target.target : ""}${self.target && self.target.chance != undefined ? ` (with a ${self.target.chance}% chance)` : ""} when:`)}</div>
                            }
                            <div>
                                {"\xA0└─ By default"}
                            </div>
                            {self.restrict != undefined ?
                                <div className='lightblue'>{ReplacerCharacter(self.restrict)}</div>
                                : ""}
                            {self.Recalculate != undefined ?
                                <div className='lightblue'>{`*Will recalculate target if conditions changes`}</div>
                                : ""}
                            {self.repeat != undefined ?
                                <div className='unique'>{`*Used ${self.repeat} time${self.repeat != 1 ? 's' : ""} per battle`}</div>
                                : ""}
                            {self.Control1 != undefined ?
                                <div className='Cancel'>
                                    {self.Control1}
                                </div>
                                : ""}
                            {self.Control2 != undefined ?
                                <div className='values'>
                                    {self.Control2}
                                </div>
                                : ""}
                        </div>))}
            </div>
        </>
    )
}