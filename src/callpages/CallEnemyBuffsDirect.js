import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getEnemyBuffsDirect } from '../redux/ducks/enemybuffs_direct';
import EnemyBuffsDirect from '../EnemyBuffsDirect';
import Loading from './_loading'

const CallBestiary = () => {

    const dispatch = useDispatch();

    const ProcessedEnemyBuffs = useSelector((state) =>
        state.enemybuffs_direct.enemybuffs_direct
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedEnemyBuffs == undefined) {
            dispatch(getEnemyBuffsDirect());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedEnemyBuffs]);


    return (
        ProcessedEnemyBuffs != undefined ?
            <EnemyBuffsDirect ProcessedEnemyBuffs={Object.values(ProcessedEnemyBuffs)} />
            :
            <Loading />
    )

}

export default CallBestiary;