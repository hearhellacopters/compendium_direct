import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getEnemyAbilityDirect } from '../redux/ducks/enemyability_direct';
import EnemyAbilitiesDirect from '../EnemyAbilitiesDirect';
import Loading from './_loading'

const CallBestiary = () => {

    const dispatch = useDispatch();

    const ProcessedEnemyAbilities = useSelector((state) =>
        state.enemyability_direct.enemyability_direct
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedEnemyAbilities == undefined) {
            dispatch(getEnemyAbilityDirect());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedEnemyAbilities]);


    return (
        ProcessedEnemyAbilities != undefined ?
            <EnemyAbilitiesDirect ProcessedEnemyAbilities={Object.values(ProcessedEnemyAbilities)} />
            :
            <Loading />
    )

}

export default CallBestiary;