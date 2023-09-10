import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from '../redux/ducks/events';
import { getEventGuide } from '../redux/ducks/EventGuide';
import { getCharacters } from '../redux/ducks/characters';
import { getJPToggle } from '../redux/ducks/jptoggle';
import { getTalkIndex } from '../redux/ducks/talk_index.js';

import { getMasterIndex } from '../redux/ducks/master_index.js';

import { getJPGameListSphere } from '../redux/ducks/JP/gamelist_sphere';
import { getGLGameListSphere } from '../redux/ducks/GL/gamelist_sphere';

import EventHandoff from '../handoff/EventHandoff';
import Loading from '../components/Loading'

export default function CallEventHandoff(){

    const match = {
        params: useParams()
    }

    const dispatch = useDispatch();

    const ProcessedEvents = useSelector((state) =>
        state.events.events
    );

    const EventGuideData = useSelector((state) =>
        state.eventGuide.eventGuide
    );

    const ProcessedCharacters = useSelector((state) =>
        state.characters.characters
    );

    const master_index = useSelector((state) =>
        state.master_index.master_index
    );

    const jp_gamelist_sphere = useSelector((state) =>
        state.jp_gamelist_sphere.jp_gamelist_sphere
    )

    const gl_gamelist_sphere = useSelector((state) =>
        state.gl_gamelist_sphere.gl_gamelist_sphere
    )

    const jptoggledata = useSelector((state) =>
        state.toggle.toggle
    );

    const talk_index = useSelector((state) =>
        state.talk_index.talk_index
    );


    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedEvents == undefined) {
            dispatch(getEvents());
        }
        if (mounted && EventGuideData == undefined) {
            dispatch(getEventGuide());
        }
        if (mounted && ProcessedCharacters == undefined) {
            dispatch(getCharacters());
        }
        if (mounted && jp_gamelist_sphere == undefined) {
            dispatch(getJPGameListSphere())
        }
        if (mounted && gl_gamelist_sphere == undefined) {
            dispatch(getGLGameListSphere())
        }
        if (mounted && master_index == undefined) {
            dispatch(getMasterIndex());
        }
        if (mounted && talk_index == undefined) {
            dispatch(getTalkIndex());
        }
        if (mounted) {
            dispatch(getJPToggle());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedEvents, talk_index, EventGuideData, ProcessedCharacters, master_index, jp_gamelist_sphere, gl_gamelist_sphere]);

    return (
        ProcessedEvents != undefined &&
            ProcessedCharacters != undefined &&
            EventGuideData != undefined &&
            jptoggledata != undefined &&
            master_index != undefined &&
            talk_index != undefined
            ?
            <EventHandoff
                ProcessedEvents={ProcessedEvents}
                match={match}
                ProcessedCharacters={ProcessedCharacters}
                jptoggledata={jptoggledata}
                master_index={master_index}
                EventGuideData={EventGuideData}
                talk_index={talk_index}
            />
            :
            <Loading />
    )

}