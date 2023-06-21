import React, { useEffect, useState } from 'react';
import EnemyFormattingDirect from '../components/Enemy/EnemyFormatting.js'
import DevSwitch from '../redux/DevSwitch.js'
import { Navigate } from 'react-router-dom';
import axios from "axios";
import Loading from '../components/Loading.js'

export default function EnemyHandoff({ 
    match, 
    ProcessedEnemies, 
    ProcessedEvents, 
    ProcessedLevels, 
    ProcessedCharacters, 
    PartnerCharacters, 
    jptoggledata 
}){

    const levelparams = match.params.level
    const abilitiesparams = match.params.abilities

    const [battle_enemy, setbattle_enemy] = useState()

    const filtered = ProcessedEnemies[match.params.id]

    useEffect(() => {
        if (DevSwitch == true && filtered && filtered.battle_enemy_id != undefined) {
            axios.get(`http://localhost:3001/data/enemies_direct/${filtered.battle_enemy_id}`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setbattle_enemy(response)
            }).catch(function (err) {
                console.log(err)
            })
        }
        if (DevSwitch == false && filtered && filtered.battle_enemy_id != undefined) {
            axios.get(`https://www.dissidiacompendium.com/data/enemies_direct/${filtered.battle_enemy_id}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setbattle_enemy(response)
            }).catch(function (err) {
                console.log(err)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.params.id])

    //console.log(battle_enemy)


    if (filtered == undefined || filtered.enemy_id == undefined) {
        return (
            <Navigate replace to="/404" />
        )
    }

    const enemyLevels = ProcessedLevels.filter(function (ef) {
        return ef["enemyID"] == filtered.enemy_id;
    });

    const matchStats = enemyLevels && enemyLevels.filter(function (ef) {
        if (filtered.Level == undefined) {
            return ef["data_index"] == levelparams;
        } else {
            return ef["data_index"] == filtered.Level;
        }
    });

    const stats = matchStats && matchStats[0];

    const alllevels = enemyLevels && enemyLevels.sort((a, b) => b.data_index - a.data_index)

    const firstlevel = alllevels[0]

    if (battle_enemy != undefined) {
        return (
            <div>
                <EnemyFormattingDirect
                    setlevel={filtered.Level != undefined ? true : false}
                    alllevels={alllevels}
                    stats={levelparams == undefined ? firstlevel : stats}
                    match={match}
                    battle_enemy_id={filtered.battle_enemy_id}
                    ProcessedEvents={ProcessedEvents}
                    ProcessedLevels={ProcessedLevels}
                    ProcessedEnemies={Object.values(ProcessedEnemies)}
                    ProcessedCharacters={ProcessedCharacters}
                    PartnerCharacters={PartnerCharacters}
                    battle_enemy={battle_enemy}
                    jptoggledata={jptoggledata}
                />
                {levelparams == undefined ?
                    <Navigate replace to={`/bestiary/enemies/${filtered.battle_enemy_id}/${firstlevel && firstlevel.data_index}/${abilitiesparams == undefined ? "" : abilitiesparams}`} />
                    :
                    ""
                }
            </div>
        )
    } else {
        return (
            <Loading />
        )
    }

}