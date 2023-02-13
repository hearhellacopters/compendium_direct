import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getSummons } from '../redux/ducks/summons';
import { getSummonLevels } from '../redux/ducks/summonlevels';
import { getSummonPassives } from '../redux/ducks/summonpassives';
import Summons from '../Summons';

import Loading from './_loading'

const CallSummonHandoff = () => {

    const match = {
        params: useParams()
    }

    const dispatch = useDispatch();

    const ProcessedSummons = useSelector((state) =>
        state.summons.summons
    );

    const ProcessedSummonLevels = useSelector((state) =>
        state.summonlevels.summonlevels
    );

    const ProcessedSummonPassives = useSelector((state) =>
        state.summonpassives.summonpassives
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedSummons == undefined) {
            dispatch(getSummons());
        }
        if (mounted && ProcessedSummonLevels == undefined) {
            dispatch(getSummonLevels());
        }
        if (mounted && ProcessedSummonPassives == undefined) {
            dispatch(getSummonPassives());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedSummons, ProcessedSummonLevels, ProcessedSummonPassives]);

    return (
        ProcessedSummons != undefined && ProcessedSummonLevels != undefined && ProcessedSummonPassives != undefined ?
            <Summons 
            match={match} 
            ProcessedSummons={ProcessedSummons} 
            ProcessedSummonLevels={ProcessedSummonLevels} 
            ProcessedSummonPassives={ProcessedSummonPassives} />
            :
            <Loading />
    )

}

export default CallSummonHandoff;