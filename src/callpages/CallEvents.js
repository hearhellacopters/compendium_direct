import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from '../redux/ducks/events';
import { getEventGuide } from '../redux/ducks/EventGuide';
import { getCharacters } from '../redux/ducks/characters';
import { getJPToggle } from '../redux/ducks/jptoggle';
import { getTalkIndex } from '../redux/ducks/talk_index.js';

import { getMasterIndex } from '../redux/ducks/master_index.js';

import { getJPGameListSphere } from '../redux/ducks/JP/gamelist_sphere';
import { getGLGameListSphere } from '../redux/ducks/GL/gamelist_sphere';

import Events from '../Events';
import Loading from '../components/Loading'

export default function CallEvents(){

    const dispatch = useDispatch();

    const ProcessedEvents = useSelector((state) =>
        state.events.events
    );

    const ProcessedCharacters = useSelector((state) =>
        state.characters.characters
    );

    const EventGuideData = useSelector((state) =>
        state.eventGuide.eventGuide
    );

    const jptoggledata = useSelector((state) =>
        state.toggle.toggle
    );

    const talk_index = useSelector((state) =>
        state.talk_index.talk_index
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

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedEvents == undefined) {
            dispatch(getEvents());
        }
        if (mounted && ProcessedCharacters == undefined) {
            dispatch(getCharacters());
        }
        if (mounted && EventGuideData == undefined) {
            dispatch(getEventGuide());
        }
        if (mounted && talk_index == undefined) {
            dispatch(getTalkIndex());
        }
        if (mounted && master_index == undefined) {
            dispatch(getMasterIndex());
        }
        if (mounted && jp_gamelist_sphere == undefined) {
            dispatch(getJPGameListSphere())
        }
        if (mounted && gl_gamelist_sphere == undefined) {
            dispatch(getGLGameListSphere())
        }
        if (mounted) {
            dispatch(getJPToggle());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedEvents, ProcessedCharacters, EventGuideData, talk_index, master_index, jp_gamelist_sphere, gl_gamelist_sphere]);

    return (
        ProcessedEvents != undefined &&
            ProcessedCharacters != undefined &&
            EventGuideData != undefined &&
            jptoggledata != undefined &&
            master_index != undefined &&
            talk_index != undefined?
            <Events
                ProcessedEvents={ProcessedEvents}
                ProcessedCharacters={ProcessedCharacters}
                EventGuideData={EventGuideData}
                jptoggledata={jptoggledata}
                master_index={master_index}
                talk_index={talk_index}
            />
            :
            <Loading />
    )

}