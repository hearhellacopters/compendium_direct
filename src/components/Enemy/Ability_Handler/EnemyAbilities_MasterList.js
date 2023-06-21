import React, { useEffect, useState } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import DevSwitch from '../../../redux/DevSwitch'
import EnemyAbilitiesListing from './EnemyAbilitiesListing';
import AI_Target_Handler from './EnemyAbilities_AI_Target_Handler'
import axios from "axios";
import { ObjectView } from 'react-object-view'

export default function EnemyAbilities_MasterList({ 
    stats, 
    ai, 
    showmeraw, 
    battle_enemy, 
    showmeai, 
    showmeaibutton 
}){

    var finished = false

    const [enemyabilities, setenemyabilities] = useStateIfMounted([])
    const [enemyai, setenemyai] = useStateIfMounted([])

    const enemy_id = stats && stats.enemyID

    useEffect(() => {
        if (DevSwitch == true && enemy_id != undefined) {
            axios.get(`http://localhost:3001/data/enemies/abilities_direct/${enemy_id}`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setenemyabilities(response)
            }).catch(function (err) {
                console.log(err)
            })
        }
        if (DevSwitch == false && enemy_id != undefined) {
            axios.get(`https://www.dissidiacompendium.com/data/enemies/abilities_direct/${enemy_id}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setenemyabilities(response)
            }).catch(function (err) {
                console.log(err)
            })
        }
        if (DevSwitch == true && ai != undefined) {
            axios.get(`http://localhost:3001/data/enemies/AI/${ai}`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setenemyai(response)
            }).catch(function (err) {
                console.log(err)
                setenemyai(["error"])
            })
        }
        if (DevSwitch == false && ai != undefined) {
            axios.get(`https://www.dissidiacompendium.com/data/enemies/AI/${ai}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setenemyai(response)
            }).catch(function (err) {
                console.log(err)
                setenemyai(["error"])
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enemy_id, ai])

    //console.log(stats)
    //console.log(enemyai)
    //console.log(enemy_id)
    //console.log(enemyabilities)

    if (enemy_id == undefined) {
        return (
            "No Data Found"
        )
    } else {

        const addedcommands = new Set()

        const AIholder = {}

        //AI replace
        if (battle_enemy && battle_enemy.ai_replace != undefined && enemyai.length != 0) {
            battle_enemy.ai_replace.forEach(self => {
                const holder = enemyai.filter(self2 => self2.AIKey == self.AIKey)
                if (holder.length != 0) {
                    Object.assign(holder[0], self)
                }
            })
        }

        enemyai && enemyai.map(ai => {
            if (ai.AIAStr != undefined) {
                const filtered = enemyabilities && enemyabilities.filter(el => el.data_id == `${enemy_id}${ai.AIAStr}`)
                if (filtered[0] != undefined) {
                    Object.assign(filtered[0], { active: true })
                    if (filtered[0].Options != undefined) {
                        filtered[0].Options.map(self => {
                            addedcommands.add(self.change_label_)
                            const filtered2 = enemyabilities && enemyabilities.filter(el => el.abilityid_ == self.change_label_)
                            const ai_pull = filtered2 && filtered2[0] && filtered2[0].ai
                            if (ai.type == 2) {
                                if (filtered2[0] != undefined && ai_pull == undefined) {
                                    Object.assign(filtered2[0], { ai: { added: { reaction: 1 } } })
                                } else {
                                    Object.assign(ai_pull, { added: { reaction: 1 } })
                                }
                            }
                            if (ai.recast == 1) {
                                if (filtered2[0] != undefined && ai_pull == undefined) {
                                    Object.assign(filtered2[0], { ai: { added: { recast: 1 } } })
                                } else {
                                    Object.assign(ai_pull, { added: { recast: 1 } })
                                }
                            }
                            if (ai.force == 1) {
                                if (filtered2[0] != undefined && ai_pull == undefined) {
                                    Object.assign(filtered2[0], { ai: { added: { force: 1 } } })
                                } else {
                                    Object.assign(ai_pull, { added: { force: 1 } })
                                }
                            }
                            if (ai.orb == 1) {
                                if (filtered2[0] != undefined && ai_pull == undefined) {
                                    Object.assign(filtered2[0], { ai: { added: { orb: 1 } } })
                                } else {
                                    Object.assign(ai_pull, { added: { orb: 1 } })
                                }
                            }
                        })
                    }
                    if (AIholder[filtered[0].abilityid_] == undefined) {
                        Object.assign(AIholder, { [filtered[0].abilityid_]: { ai: {} } })
                        if (ai.type == 1) {
                            const aiaction = AIholder[filtered[0].abilityid_].ai
                            if (aiaction.action == undefined) {
                                Object.assign(aiaction, { action: [] })
                                aiaction.action.push(ai)
                            } else {
                                aiaction.action.push(ai)
                            }
                        }
                        if (ai.type == 2) {
                            const aireaction = AIholder[filtered[0].abilityid_].ai
                            if (aireaction.reaction == undefined) {
                                Object.assign(aireaction, { reaction: [] })
                                aireaction.reaction.push(ai)
                            } else {
                                aireaction.reaction.push(ai)
                            }
                        }
                        if (ai.type == 3) {
                            const aitarget = AIholder[filtered[0].abilityid_].ai
                            if (aitarget.target == undefined) {
                                Object.assign(aitarget, { target: [] })
                                aitarget.target.push(ai)
                            } else {
                                aitarget.target.push(ai)
                            }
                        }
                    } else {
                        if (ai.type == 1) {
                            const aiaction = AIholder[filtered[0].abilityid_].ai
                            if (aiaction.action == undefined) {
                                Object.assign(aiaction, { action: [] })
                                aiaction.action.push(ai)
                            } else {
                                aiaction.action.push(ai)
                            }
                        }
                        if (ai.type == 2) {
                            const aireaction = AIholder[filtered[0].abilityid_].ai
                            if (aireaction.reaction == undefined) {
                                Object.assign(aireaction, { reaction: [] })
                                aireaction.reaction.push(ai)
                            } else {
                                aireaction.reaction.push(ai)
                            }
                        }
                        if (ai.type == 3) {
                            const aitarget = AIholder[filtered[0].abilityid_].ai
                            if (aitarget.target == undefined) {
                                Object.assign(aitarget, { target: [] })
                                aitarget.target.push(ai)
                            } else {
                                aitarget.target.push(ai)
                            }
                        }
                    }
                }
            } else {
                const idpull = stats[`id${ai.Ability}`]
                const filtered = enemyabilities && enemyabilities.filter(el => el.abilityid_ == idpull)
                if (filtered[0] != undefined) {
                    Object.assign(filtered[0], { active: true })

                    if (filtered[0].Options != undefined) {
                        filtered[0].Options.map(self => {
                            addedcommands.add(self.change_label_)
                            const filtered2 = enemyabilities && enemyabilities.filter(el => el.abilityid_ == self.change_label_)
                            const ai_pull = filtered2 && filtered2[0] && filtered2[0].ai
                            if (ai.type == 2) {
                                if (filtered2[0] != undefined && ai_pull == undefined) {
                                    Object.assign(filtered2[0], { ai: { added: { reaction: 1 } } })
                                } else {
                                    Object.assign(ai_pull, { added: { reaction: 1 } })
                                }
                            }
                            if (ai.recast == 1) {
                                if (filtered2[0] != undefined && ai_pull == undefined) {
                                    Object.assign(filtered2[0], { ai: { added: { recast: 1 } } })
                                } else {
                                    Object.assign(ai_pull, { added: { recast: 1 } })
                                }
                            }
                            if (ai.force == 1) {
                                if (filtered2[0] != undefined && ai_pull == undefined) {
                                    Object.assign(filtered2[0], { ai: { added: { force: 1 } } })
                                } else {
                                    Object.assign(ai_pull, { added: { force: 1 } })
                                }
                            }
                            if (ai.orb == 1) {
                                if (filtered2[0] != undefined && ai_pull == undefined) {
                                    Object.assign(filtered2[0], { ai: { added: { orb: 1 } } })

                                } else {
                                    Object.assign(ai_pull, { added: { orb: 1 } })
                                }
                            }
                        })
                    }

                    if (AIholder[filtered[0].abilityid_] == undefined) {
                        Object.assign(AIholder, { [filtered[0].abilityid_]: { ai: {} } })
                        if (ai.type == 1) {
                            const aiaction = AIholder[filtered[0].abilityid_].ai
                            if (aiaction.action == undefined) {
                                Object.assign(aiaction, { action: [] })
                                aiaction.action.push(ai)
                            } else {
                                aiaction.action.push(ai)
                            }
                        }
                        if (ai.type == 2) {
                            const aireaction = AIholder[filtered[0].abilityid_].ai
                            if (aireaction.reaction == undefined) {
                                Object.assign(aireaction, { reaction: [] })
                                aireaction.reaction.push(ai)
                            } else {
                                aireaction.reaction.push(ai)
                            }
                        }
                        if (ai.type == 3) {
                            const aitarget = AIholder[filtered[0].abilityid_].ai
                            if (aitarget.target == undefined) {
                                Object.assign(aitarget, { target: [] })
                                aitarget.target.push(ai)
                            } else {
                                aitarget.target.push(ai)
                            }
                        }
                    } else {
                        if (ai.type == 1) {
                            const aiaction = AIholder[filtered[0].abilityid_].ai
                            if (aiaction.action == undefined) {
                                Object.assign(aiaction, { action: [] })
                                aiaction.action.push(ai)
                            } else {
                                aiaction.action.push(ai)
                            }
                        }
                        if (ai.type == 2) {
                            const aireaction = AIholder[filtered[0].abilityid_].ai
                            if (aireaction.reaction == undefined) {
                                Object.assign(aireaction, { reaction: [] })
                                aireaction.reaction.push(ai)
                            } else {
                                aireaction.reaction.push(ai)
                            }
                        }
                        if (ai.type == 3) {
                            const aitarget = AIholder[filtered[0].abilityid_].ai
                            if (aitarget.target == undefined) {
                                Object.assign(aitarget, { target: [] })
                                aitarget.target.push(ai)
                            } else {
                                aitarget.target.push(ai)
                            }
                        }
                    }

                }
            }
        })

        // repeat to trun back on
        //if(stats.id0 != -1){
        //    const filtered = enemyabilities && enemyabilities.filter(el => el.abilityid_ == stats.id0)
        //    if(filtered[0] != undefined){
        //        Object.assign(filtered[0],{active:true})
        //        if(filtered[0].Options != undefined){
        //            filtered[0].Options.map(self=>addedcommands.add(self.change_label_))
        //        }
        //    }
        //}

        const secondrun = new Set()

        if (addedcommands.length != 0) {
            enemyabilities.map(self => {
                if (addedcommands.has(self.abilityid_) == true) {
                    if (self.active != true) {
                        Object.assign(self, { active: true })
                    }
                    if (self.Options != undefined) {
                        self.Options.map(self => secondrun.add(self.change_label_))
                    }
                }
                if (self.ai != undefined && self.ai.added != undefined) {
                    if (self.ai.added.force != undefined) {
                        if (self.Options != undefined) {
                            self.Options.map(self2 => {
                                const option_change = enemyabilities.filter(self3 => self3.abilityid_ == self2.change_label_)
                                if (option_change.length != 0) {
                                    if (option_change[0].ai == undefined) {
                                        Object.assign(option_change[0], { ai: {} })
                                    }
                                    if (option_change[0].ai.added == undefined) {
                                        Object.assign(option_change[0].ai, { added: {} })
                                    }
                                    Object.assign(option_change[0].ai.added, { force: 1 })
                                }
                            })
                        }
                    }

                    if (self.ai.added.orb != undefined) {
                        if (self.Options != undefined) {
                            self.Options.map(self2 => {
                                const option_change = enemyabilities.filter(self3 => self3.abilityid_ == self2.change_label_)
                                if (option_change.length != 0) {
                                    if (option_change[0].ai == undefined) {
                                        Object.assign(option_change[0], { ai: {} })
                                    }
                                    if (option_change[0].ai.added == undefined) {
                                        Object.assign(option_change[0].ai, { added: {} })
                                    }
                                    Object.assign(option_change[0].ai.added, { orb: 1 })
                                }
                            })
                        }
                    }

                    if (self.ai.added.reaction != undefined) {
                        if (self.Options != undefined) {
                            self.Options.map(self2 => {
                                const option_change = enemyabilities.filter(self3 => self3.abilityid_ == self2.change_label_)
                                if (option_change.length != 0) {
                                    if (option_change[0].ai == undefined) {
                                        Object.assign(option_change[0], { ai: {} })
                                    }
                                    if (option_change[0].ai.added == undefined) {
                                        Object.assign(option_change[0].ai, { added: {} })
                                    }
                                    Object.assign(option_change[0].ai.added, { reaction: 1 })
                                }
                            })
                        }
                    }
                }
            })
        }

        if (secondrun.length != 0) {
            enemyabilities.map(self => {
                if (secondrun.has(self.abilityid_) == true) {
                    if (self.active != true) {
                        Object.assign(self, { active: true })
                    }
                }
            })
        }

        enemyabilities.map(self => {
            if (AIholder[self.abilityid_] != undefined) {
                Object.assign(self, AIholder[self.abilityid_])
            }
        })

        let fullcommands = enemyabilities.filter(el => el.active == true)

        const abilitydebug = {}

        enemyabilities && enemyabilities.map((self, i) => {
            Object.assign(abilitydebug, {
                [i + 10]: {
                    AIAbilityNum: i + 10,
                    Name: self.Name,
                    abilityid_: self.abilityid_,
                    ability_index: i + 1,
                    data_id: self.data_id,
                }
            })
        })

        if (stats != undefined) {
            var filter = []
            if (stats.id0 != -1) {
                filter = enemyabilities && enemyabilities.filter(el => el.abilityid_ == stats.id0)
                if (filter.length != 0) {
                    Object.assign(abilitydebug, {
                        0: {
                            AIAbilityNum: 0,
                            Name: filter[0].Name,
                            abilityid_: filter[0].abilityid_,
                            ability_index: parseInt(filter[0].data_id.toString().substring(filter[0].data_id.toString().length - 3)),
                            data_id: filter[0].data_id,
                        }
                    })
                }
            }
            if (stats.id1 != -1) {
                filter = enemyabilities && enemyabilities.filter(el => el.abilityid_ == stats.id1)
                if (filter.length != 0) {
                    Object.assign(abilitydebug, {
                        1: {
                            AIAbilityNum: 1,
                            Name: filter[0].Name,
                            abilityid_: filter[0].abilityid_,
                            ability_index: parseInt(filter[0].data_id.toString().substring(filter[0].data_id.toString().length - 3)),
                            data_id: filter[0].data_id,
                        }
                    })
                }
            }
            if (stats.id2 != -1) {
                filter = enemyabilities && enemyabilities.filter(el => el.abilityid_ == stats.id2)
                if (filter.length != 0) {
                    Object.assign(abilitydebug, {
                        2: {
                            AIAbilityNum: 2,
                            Name: filter[0].Name,
                            abilityid_: filter[0].abilityid_,
                            ability_index: parseInt(filter[0].data_id.toString().substring(filter[0].data_id.toString().length - 3)),
                            data_id: filter[0].data_id,
                        }
                    })
                }
            }
            if (stats.id3 != -1) {
                filter = enemyabilities && enemyabilities.filter(el => el.abilityid_ == stats.id3)
                if (filter.length != 0) {
                    Object.assign(abilitydebug, {
                        3: {
                            AIAbilityNum: 3,
                            Name: filter[0].Name,
                            abilityid_: filter[0].abilityid_,
                            ability_index: parseInt(filter[0].data_id.toString().substring(filter[0].data_id.toString().length - 3)),
                            data_id: filter[0].data_id,
                        }
                    })
                }
            }
            if (stats.id4 != -1) {
                filter = enemyabilities && enemyabilities.filter(el => el.abilityid_ == stats.id4)
                if (filter.length != 0) {
                    Object.assign(abilitydebug, {
                        4: {
                            AIAbilityNum: 4,
                            Name: filter[0].Name,
                            abilityid_: filter[0].abilityid_,
                            ability_index: parseInt(filter[0].data_id.toString().substring(filter[0].data_id.toString().length - 3)),
                            data_id: filter[0].data_id,
                        }
                    })
                }
            }
            if (stats.id5 != -1) {
                filter = enemyabilities && enemyabilities.filter(el => el.abilityid_ == stats.id5)
                if (filter.length != 0) {
                    Object.assign(abilitydebug, {
                        5: {
                            AIAbilityNum: 5,
                            Name: filter[0].Name,
                            abilityid_: filter[0].abilityid_,
                            ability_index: parseInt(filter[0].data_id.toString().substring(filter[0].data_id.toString().length - 3)),
                            data_id: filter[0].data_id,
                        }
                    })
                }
            }
            if (stats.id6 != -1) {
                filter = enemyabilities && enemyabilities.filter(el => el.abilityid_ == stats.id6)
                if (filter.length != 0) {
                    Object.assign(abilitydebug, {
                        6: {
                            AIAbilityNum: 6,
                            Name: filter[0].Name,
                            abilityid_: filter[0].abilityid_,
                            ability_index: parseInt(filter[0].data_id.toString().substring(filter[0].data_id.toString().length - 3)),
                            data_id: filter[0].data_id,
                        }
                    })
                }
            }
            if (stats.id7 != -1) {
                filter = enemyabilities && enemyabilities.filter(el => el.abilityid_ == stats.id7)
                if (filter.length != 0) {
                    Object.assign(abilitydebug, {
                        7: {
                            AIAbilityNum: 7,
                            Name: filter[0].Name,
                            abilityid_: filter[0].abilityid_,
                            ability_index: parseInt(filter[0].data_id.toString().substring(filter[0].data_id.toString().length - 3)),
                            data_id: filter[0].data_id,
                        }
                    })
                }
            }
            if (stats.id8 != -1) {
                filter = enemyabilities && enemyabilities.filter(el => el.abilityid_ == stats.id8)
                if (filter.length != 0) {
                    Object.assign(abilitydebug, {
                        8: {
                            AIAbilityNum: 8,
                            Name: filter[0].Name,
                            abilityid_: filter[0].abilityid_,
                            ability_index: parseInt(filter[0].data_id.toString().substring(filter[0].data_id.toString().length - 3)),
                            data_id: filter[0].data_id,
                        }
                    })
                }
            }
            if (stats.id9 != -1) {
                filter = enemyabilities && enemyabilities.filter(el => el.abilityid_ == stats.id9)
                if (filter.length != 0) {
                    Object.assign(abilitydebug, {
                        9: {
                            AIAbilityNum: 9,
                            Name: filter[0].Name,
                            abilityid_: filter[0].abilityid_,
                            ability_index: parseInt(filter[0].data_id.toString().substring(filter[0].data_id.toString().length - 3)),
                            data_id: filter[0].data_id,
                        }
                    })
                }
            }
        }

        const target_ai = Object.values(enemyai).filter(self => self.type == 3)

        finished = true

        return (
            enemyabilities != undefined && fullcommands != undefined && fullcommands.length != 0 ?
                <>
                    <div className='fullnow'>
                        <div className="margeholder">
                            <div className="Merge">
                                <label htmlFor="search" className="MergeText">Display AI?</label>
                                <div key="mergecheck1" className={`${showmeai != "" ? "nodisplay" : `uncheck`}`} onClick={showmeaibutton} />
                                <div key="mergecheck2" className={`${showmeai != "" ? "check" : `nodisplay`}`} onClick={showmeaibutton} />
                            </div>
                        </div>
                        {(showmeai != "" || showmeraw == true) && target_ai.length != 0 ?
                            <div className='bufflistbanner fullnow makeright ai_targets'>
                                <span className='unique ailmenttext'>Possible Targets:</span>
                                <AI_Target_Handler
                                    ai={target_ai}
                                    abilitylist={abilitydebug}
                                    debug={showmeraw}
                                />

                            </div>
                            :
                            ""}
                    </div>
                    <EnemyAbilitiesListing showai={showmeai != "" ? true : false} match={fullcommands} enemy_id={enemy_id} showmeraw={showmeraw} abilitylist={abilitydebug} />
                    {showmeraw == true ?
                        <span className='react-json-view'>
                            <ObjectView 
                            options={
                                {
                                  hideDataTypes: true,
                                  expandLevel: 1,
                                  displayEntriesMaxCount: 1,
                                }
                              } 
                              data={abilitydebug}
                            />
                        </span>
                        : ""}
                    {showmeraw == true ?
                        <span className='react-json-view'>
                            <ObjectView  
                            options={
                                {
                                  hideDataTypes: true,
                                  expandLevel: 1
                                }
                              }
                            data={enemyai} 
                            />
                        </span>
                        : ""}
                </>
                :
                enemyai && enemyai[0] == "error" ? "No AI for selected enemy" : finished == true && fullcommands.length == 0 ? "No Abilities from AI" : "...Loading"
        )
    }
}