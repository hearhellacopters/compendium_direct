import React, {useState, useEffect} from 'react';
import EnemyAbilitiesFormattingDirect from './EnemyAbilitiesFormattingDirect'

const EnemyAbilityHandoffDirect = ({match,enemy_id,showmeraw,abilitylist,showai}) =>{

    match.sort((a, b) => a.data_id - b.data_id);

    return(
        <>
        {match.map(abilities =>(
            abilities != undefined ?
            <EnemyAbilitiesFormattingDirect 
            key={abilities.data_id} 
            pull={false} 
            match={abilities}
            enemy_id={enemy_id}
            nolink={true}
            showmeraw={showmeraw}
            abilitylist={abilitylist}
            showai={showai}
            />
            :""
        ))}
        </>
    )

}
export default EnemyAbilityHandoffDirect