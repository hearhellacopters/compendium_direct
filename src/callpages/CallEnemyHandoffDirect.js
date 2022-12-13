import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getEnemiesDirect } from '../redux/ducks/enemies_direct';
import { getEvents } from '../redux/ducks/events';
import { getLevels } from '../redux/ducks/levels';
import { getCharacters } from '../redux/ducks/characters';
import { getJPToggle } from '../redux/ducks/jptoggle';

import EnemyHandoffDirect from '../passoff/EnemyHandoffDirect';
import Loading from './_loading'

const CallCharHandoffDirect = () => {

    const match = {
        params: useParams()
    }

    const dispatch = useDispatch();

    const ProcessedCharacters = useSelector((state) =>
        state.characters.characters
    );

    const ProcessedEnemies = useSelector((state) =>
        state.enemies_direct.enemies_direct
    );

    const ProcessedEvents = useSelector((state) =>
        state.events.events
    );

    const ProcessedLevels = useSelector((state) =>
        state.levels.levels
    );

    const jptoggledata = useSelector((state) =>
        state.toggle.toggle
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedEnemies == undefined) {
            dispatch(getEnemiesDirect());
        }
        if (mounted && ProcessedEvents == undefined) {
            dispatch(getEvents())
        }
        if (mounted && ProcessedLevels == undefined) {
            dispatch(getLevels())
        }
        if (mounted) {
            dispatch(getJPToggle());
        }
        if (mounted && ProcessedCharacters == undefined) {
            dispatch(getCharacters())
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedEvents, ProcessedEnemies, ProcessedLevels, ProcessedCharacters]);

    return (
        ProcessedEnemies != undefined && ProcessedEvents != undefined && ProcessedLevels != undefined && ProcessedCharacters != undefined && jptoggledata != undefined ?
            <EnemyHandoffDirect match={match} ProcessedEnemies={ProcessedEnemies} ProcessedEvents={ProcessedEvents} ProcessedLevels={ProcessedLevels} ProcessedCharacters={ProcessedCharacters} PartnerCharacters={ProcessedCharacters} jptoggledata={jptoggledata} />
            :
            <Loading />
    )

}

export default CallCharHandoffDirect;