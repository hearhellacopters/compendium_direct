import React, {useEffect, useState} from 'react';
import EnemyFormattingDirect from '../formatting/EnemyFormattingDirect.js'
import DevSwitch from'../redux/DevSwitch'
import {Navigate} from 'react-router-dom';
import axios from "axios";
import Loading from '../callpages/_loading'

const EnemyPassoffDirect = ({ match, ProcessedEnemies, ProcessedEvents, ProcessedLevels, ProcessedCharacters, PartnerCharacters, jptoggledata }) => {

    function getSafe(fn, defaultVal) {
        try {
          return fn();
        } catch (e) {
          return defaultVal;
        }
      }

    const levelparams = match.params.level
    const abilitiesparams = match.params.abilities

    const [battle_enemy, setbattle_enemy] = useState()

    const filtered = ProcessedEnemies[match.params.id]
        
    useEffect(() => {
        if(DevSwitch == true && getSafe(() =>filtered.battle_enemy_id) != undefined ){
            axios.get(`http://localhost:3001/data/enemies_direct/${filtered.battle_enemy_id}`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setbattle_enemy(response)
        }).catch(function(err) {
            console.log(err)
        })
    }
        if(DevSwitch == false && getSafe(() =>filtered.battle_enemy_id) != undefined ){
            axios.get(`https://www.dissidiacompendium.com/data/enemies_direct/${filtered.battle_enemy_id}.json`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setbattle_enemy(response)
        }).catch(function(err) {
            console.log(err)
        })
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[match])

        //console.log(battle_enemy)


      if(getSafe(() => filtered.enemy_id) == undefined ) {
        return(
            <Navigate replace to="/404"/>
        )
      }

      const enemyLevels = ProcessedLevels.filter(function(ef){
        return ef["enemyID"] == filtered.enemy_id;
    });

    const matchStats =  enemyLevels && enemyLevels.filter(function(ef){
        if(getSafe(() => filtered.Level) == undefined ){
        return ef["data_index"] == levelparams;
        } else {
        return ef["data_index"] == filtered.Level;
        }
    });

    const stats = matchStats && matchStats[0];

    const alllevels = enemyLevels && enemyLevels.sort((a,b) => b.data_index - a.data_index)

    const firstlevel = alllevels[0]

    if(battle_enemy != undefined){
        return(
            <div>
                <EnemyFormattingDirect 
                setlevel={getSafe(() => filtered.Level) != undefined ? true : false} 
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
                {levelparams == undefined?
                    <Navigate replace to={`/bestiary/enemies/${getSafe(() => filtered.battle_enemy_id)}/${firstlevel&& firstlevel.data_index}/${abilitiesparams == undefined ? "" : abilitiesparams}`}/>
                    :
                    ""
                }
            </div>
        )
    } else{
        return(
            <Loading/>
        )
    }
    
}
export default EnemyPassoffDirect