import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getSummons } from '../redux/ducks/summons.js';
import { getSummonLevels } from '../redux/ducks/summonlevels.js';
import { getSummonPassives } from '../redux/ducks/summonpassives.js';
import Summons from '../Summons.js';

import Loading from '../components/Loading.js'

export default function CallSummons(){

    const match = {
        params: useParams()
    }

    const dispatch = useDispatch();

    const ProcessedSummons = useSelector((state) =>
        state.summons.summons
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedSummons == undefined) {
            dispatch(getSummons());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedSummons]);


    const ProcessedSummonLevels = useSelector((state) =>
        state.summonlevels.summonlevels
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedSummonLevels == undefined) {
            dispatch(getSummonLevels());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedSummonLevels]);


    const ProcessedSummonPassives = useSelector((state) =>
        state.summonpassives.summonpassives
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedSummonPassives == undefined) {
            dispatch(getSummonPassives());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedSummonPassives]);

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