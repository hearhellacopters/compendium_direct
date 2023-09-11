import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getEnemiesDirect } from '../redux/ducks/enemies_direct';
import { getEvents } from '../redux/ducks/events';
import { getLevels } from '../redux/ducks/levels';
import { getCharacters } from '../redux/ducks/characters';
import { getJPToggle } from '../redux/ducks/jptoggle';

import EnemyHandoff from '../handoff/EnemyHandoff';
import Loading from '../components/Loading'

export default function CallEnemyHandoff(){

    const match = {
        params: useParams()
    }

    const dispatch = useDispatch();

    const jptoggledata = useSelector((state) =>
        state.toggle.toggle
    );

    const ProcessedCharacters = useSelector((state) =>
        state.characters.characters
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedCharacters == undefined) {
            dispatch(getCharacters())
        }
        if (mounted) {
            dispatch(getJPToggle());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedCharacters]);

    const ProcessedEnemies = useSelector((state) =>
        state.enemies_direct.enemies_direct
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedEnemies == undefined) {
            dispatch(getEnemiesDirect());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedEnemies]);

    const ProcessedEvents = useSelector((state) =>
        state.events.events
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedEvents == undefined) {
            dispatch(getEvents())
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedEvents]);

    const ProcessedLevels = useSelector((state) =>
        state.levels.levels
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedLevels == undefined) {
            dispatch(getLevels())
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedLevels]);

    return (
        ProcessedEnemies != undefined && ProcessedEvents != undefined && ProcessedLevels != undefined && ProcessedCharacters != undefined && jptoggledata != undefined ?
            <EnemyHandoff match={match} ProcessedEnemies={ProcessedEnemies} ProcessedEvents={ProcessedEvents} ProcessedLevels={ProcessedLevels} ProcessedCharacters={ProcessedCharacters} PartnerCharacters={ProcessedCharacters} jptoggledata={jptoggledata} />
            :
            <Loading />
    )

}