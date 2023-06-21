import React, { useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import DevSwitch from '../../../redux/DevSwitch'
import EnemyAbilityHandoff from './EnemyAbilitiesListing';
import axios from "axios";

export default function EnemyAbilities_MasterListDetails({
    ai,
    enemy_id,
    stats
}){

    const [enemyabilities, setenemyabilities] = useStateIfMounted([])
    const [enemyai, setenemyai] = useStateIfMounted([])

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
            })
        }
        if (DevSwitch == false && ai != undefined) {
            axios.get(`https://www.dissidiacompendium.com/data/enemies/AI/${ai}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setenemyai(response)
            }).catch(function (err) {
                console.log(err)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enemy_id, ai])

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    function flatten(arrayOfArrays) {
        return [].concat.apply([], arrayOfArrays);
    }

    if (enemy_id == undefined) {
        return (
            "No Data Found"
        )
    } else {


        //let mymap = new Map();
        //
        //const uniqueAIpulls = enemyai.filter(el => {
        //    const val = mymap.get(el.Ability);
        //    if(val) {
        //        if(el.AIKey < val) {
        //            mymap.delete(el.Ability);
        //            mymap.set(el.Ability, el.AIKey);
        //            return true;
        //        } else {
        //            return false;
        //        }
        //    }
        //    mymap.set(el.Ability, el.AIKey);
        //    return true;
        //});

        const mastercommands = enemyai && enemyai.map(ai => {
            const holder = [];
            const abilitystring = `${enemy_id}${ai.AIAStr}`
            const filtered = enemyabilities && enemyabilities.filter(el => {
                const abilitypull = el.data_id == abilitystring
                return abilitypull
            })
            const pulledid = filtered && filtered[0] && filtered[0].abilityid_
            {
                ai.AIAStr == undefined ?
                holder.push(stats[`id${ai.Ability}`]
                )
                :
                holder.push(pulledid
                )
            }
            return holder
        })

        const statcommand = []
        if (stats.id0 != -1) {
            statcommand.push([stats.id0])
        }
        if (stats.id1 != -1) {
            statcommand.push([stats.id1])
        }
        if (stats.id2 != -1) {
            statcommand.push([stats.id2])
        }
        if (stats.id3 != -1) {
            statcommand.push([stats.id3])
        }
        if (stats.id4 != -1) {
            statcommand.push([stats.id4])
        }
        if (stats.id5 != -1) {
            statcommand.push([stats.id5])
        }
        if (stats.id6 != -1) {
            statcommand.push([stats.id6])
        }
        if (stats.id7 != -1) {
            statcommand.push([stats.id7])
        }
        if (stats.id8 != -1) {
            statcommand.push([stats.id8])
        }
        if (stats.id9 != -1) {
            statcommand.push([stats.id9])
        }

        if (statcommand && statcommand.length != 0) {
            mastercommands.push(...statcommand)
        }

        const masterabiltiies = mastercommands.map((el) => {
            const holder = [];
            const newpull = enemyabilities && enemyabilities.filter(ef => {
                return ef.abilityid_ == el[0]
            })
            holder.push(...newpull)
            return holder[0]
        })


        const uniquemasterabiltiies = masterabiltiies.filter(onlyUnique)

        const getoptions = uniquemasterabiltiies.filter((el) => {
            return el && el.Options
        })

        const addcommands = getoptions.map((el) => {
            const pulledid = el.Options && el.Options.map((ef) => {
                return ef.change_label_
            })
            return pulledid
        })


        const fullcommandlist = []

        fullcommandlist.push(...mastercommands)

        const makesingle = fullcommandlist.map((ef) => {
            return ef[0]
        }).filter(onlyUnique).sort((a, b) => a - b);

        const flat = flatten(addcommands)

        if (addcommands && addcommands.length != 0) {
            makesingle.push(...flat)
        }

        makesingle.sort((a, b) => a - b)

        const newunique = [...new Set(makesingle)];

        let fullcommands = newunique.length != 0 && newunique.map((el) => {
            const holder = [];
            const newpull = enemyabilities && enemyabilities.filter(ef => {
                return ef.abilityid_ == el
            })
            holder.push(...newpull)
            return holder[0]
        })

        return (
            enemyabilities != undefined && fullcommands != undefined && fullcommands[0] != undefined ?
                <EnemyAbilityHandoff match={fullcommands} enemy_id={enemy_id} />
                :
                "Loading..."
        )
    }
}