import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getEnemyAbilityDirect } from '../redux/ducks/enemyability_direct';
import EnemyAbilities from '../EnemyAbilities';
import Loading from '../components/Loading'

export default function CallEnemyAbilities(){

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
            <EnemyAbilities ProcessedEnemyAbilities={Object.values(ProcessedEnemyAbilities)} />
            :
            <Loading />
    )

}