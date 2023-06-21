import React from 'react';
import ReplacerCharacter from '../../ReplacerCharacter'
import ReplacerEnemyDesc from '../../ReplacerEnemyDesc'
import Tippy from '../../../components/TippyDefaults.js';

export default function EnemyAbilities_AI_Handler({
    ai,
    abilitylist,
    debug,
    showmeraw
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

    const type1 = ai && ai.action

    const type2 = ai && ai.reaction

    return (
        <>
            {type1 != undefined ?
                <div className='Nocolorbase enemyabilityinfobase'>
                    {type1.map(self => (
                        self.labels != undefined ?
                            <div key={self.AIKey} className='upgradedorg2'>
                                {(debug == true || showmeraw == true) ?
                                    <Tippy content={self.AIKey}>
                                        <div className='abilitydisplayfex'>{ReplacerEnemyDesc(`\xA0┬ ${self.Chance1 < 100 || self.Chance1 > 100 ? `RNG chance of ≤ ${self.Chance1} to be used when` : "Used when"}:`)}</div>
                                    </Tippy>
                                    :
                                    <div className='abilitydisplayfex'>{ReplacerEnemyDesc(`\xA0┬ ${self.Chance1 < 100 || self.Chance1 > 100 ? `RNG chance of ≤ ${self.Chance1} to be used when` : "Used when"}:`)}</div>
                                }
                                {self.labels.map((labels, i) => {
                                    const lastkey = (self.labels.length) - 1
                                    return (
                                        labels.AbilityNum != undefined ?
                                            <div key={i}>{ReplacerCharacter(`${lastkey == i ? "\xA0└─ " : "\xA0├─ "}${addabilitynum(labels.label, labels.AbilityNum)}`)}</div> :
                                            <div key={i}>{ReplacerCharacter(`${lastkey == i ? "\xA0└─ " : "\xA0├─ "}${labels.label}`)}</div>
                                    )
                                })}
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
                            <div key={self.AIKey} className='upgradedorg2'>
                                {debug == true ?
                                    <Tippy content={self.AIKey}>
                                        <div className='abilitydisplayfex'>{ReplacerEnemyDesc(`\xA0┬ ${self.Chance1 < 100 || self.Chance1 > 100 ? `RNG chance of ≤ ${self.Chance1} to be used when` : "Used when"}:`)}</div>
                                    </Tippy>
                                    :
                                    <div className='abilitydisplayfex'>{ReplacerEnemyDesc(`\xA0┬ ${self.Chance1 < 100 || self.Chance1 > 100 ? `RNG chance of ≤ ${self.Chance1} to be used when` : "Used when"}:`)}</div>
                                }
                                <div>
                                    {"\xA0└─ By default"}
                                </div>
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
                    ))}
                </div>
                : ""}
            {type2 != undefined ?
                <div className='Nocolorbase enemyabilityinfobase'>
                    {type2.map(self => (
                        self.labels != undefined ?
                            <div key={self.AIKey} className='Buffupgradedorg'>
                                {debug == true ?
                                    <Tippy content={self.AIKey}>
                                        <div className='abilitydisplayfex'>{ReplacerEnemyDesc(`\xA0┬ ${self.Chance1 < 100 || self.Chance1 > 100 ? `RNG chance of ≤ ${self.Chance1} to trigger on` : "Triggers on"} ${self.target && self.target.target != undefined ? self.target.target : ""}${self.target && self.target.chance != undefined ? ` (with a ${self.target.chance}% chance)` : ""} when:`)}</div>
                                    </Tippy>
                                    :
                                    <div className='abilitydisplayfex'>{ReplacerEnemyDesc(`\xA0┬ ${self.Chance1 < 100 || self.Chance1 > 100 ? `RNG chance of ≤ ${self.Chance1} to trigger on` : "Triggers on"} ${self.target && self.target.target != undefined ? self.target.target : ""}${self.target && self.target.chance != undefined ? ` (with a ${self.target.chance}% chance)` : ""} when:`)}</div>
                                }
                                {self.labels.map((labels, i) => {
                                    const lastkey2 = (self.labels.length) - 1
                                    return (
                                        labels.AbilityNum != undefined ?
                                            <div key={i}>{ReplacerCharacter(`${lastkey2 == i ? "\xA0└─ " : "\xA0├─ "}${addabilitynum(labels.label, labels.AbilityNum)}`)}</div> :
                                            <div key={i}>{ReplacerCharacter(`${lastkey2 == i ? "\xA0└─ " : "\xA0├─ "}${labels.label}`)}</div>
                                    )
                                })}
                                {self.restrict != undefined ?
                                    <div className='lightblue'>{ReplacerCharacter(self.restrict)}</div>
                                    : ""}
                                {self.repeat != undefined ?
                                    <div className='unique'>{`*Triggers ${self.repeat} time${self.repeat != 1 ? 's' : ""} per battle`}</div>
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
                            <div key={self.AIKey} className='Buffupgradedorg'>
                                {debug == true ?
                                    <Tippy content={self.AIKey}>
                                        <div className='abilitydisplayfex'>{ReplacerEnemyDesc(`\xA0┬ ${self.Chance1 < 100 || self.Chance1 > 100 ? `RNG chance of ≤ ${self.Chance1} to trigger on` : "Triggers on"} ${self.target && self.target.target != undefined ? self.target.target : ""}${self.target && self.target.chance != undefined ? ` (with a ${self.target.chance}% chance)` : ""} when:`)}</div>
                                    </Tippy>
                                    :
                                    <div className='abilitydisplayfex'>{ReplacerEnemyDesc(`\xA0┬ ${self.Chance1 < 100 || self.Chance1 > 100 ? `RNG chance of ≤ ${self.Chance1} to trigger on` : "Triggers on"} ${self.target && self.target.target != undefined ? self.target.target : ""}${self.target && self.target.chance != undefined ? ` (with a ${self.target.chance}% chance)` : ""} when:`)}</div>
                                }
                                <div>
                                    {"\xA0└─ By default"}
                                </div>
                                {self.restrict != undefined ?
                                    <div className='lightblue'>{ReplacerCharacter(self.restrict)}</div>
                                    : ""}
                                {self.repeat != undefined ?
                                    <div className='unique'>{`*Triggers ${self.repeat} time${self.repeat != 1 ? 's' : ""} per battle`}</div>
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
                : ""}
        </>
    )
}