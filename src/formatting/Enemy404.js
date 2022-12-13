import React from 'react';
import { Redirect } from 'react-router-dom';
import ProcessedEnemies from '../processing/ProcessedEnemy.js'
import EnemyUnitDirect from './EnemyListingDirect'

const EnemyPassoff = ({ match }) => {

    const battle_enemy = ProcessedEnemies.filter(function (el) {
        const enemysingle = el["battle_id"] === match.params.id;
        return enemysingle;
    });

    if (battle_enemy !== undefined) {
        return (
            <Redirect to="/404" />
        )
    } else {
        return (
            <EnemyUnitDirect match={match} />
        )
    }

}
export default EnemyPassoff;