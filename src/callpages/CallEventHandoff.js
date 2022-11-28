import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from '../redux/ducks/events';
import { getEventGuide } from '../redux/ducks/EventGuide';
import { getCharacters } from '../redux/ducks/characters';
import { getJPToggle } from '../redux/ducks/jptoggle';

import { getMasterIndex } from '../redux/ducks/master_index.js';

import { getJPGameListSphere } from '../redux/ducks/JP/gamelist_sphere';
import { getGLGameListSphere } from '../redux/ducks/GL/gamelist_sphere';

import EventPermaLinks from '../passoff/EventPermaLinks';
import Loading from './_loading'

const CallEventhandoff = () =>{
    
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

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedEvents == undefined) {
        dispatch(getEvents());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,ProcessedEvents]);

    useEffect(() => {
        let mounted = true
    if (mounted && EventGuideData == undefined) {
        dispatch(getEventGuide());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,EventGuideData]);

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedCharacters == undefined) {
        dispatch(getCharacters());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,ProcessedCharacters]);

    const master_index = useSelector((state) => 
    state.master_index.master_index
    );

    useEffect(() => {
        let mounted = true
        if (mounted && master_index == undefined) {
        dispatch(getMasterIndex());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,master_index])

    const jp_gamelist_sphere = useSelector((state) => 
    state.jp_gamelist_sphere.jp_gamelist_sphere
    )

    const gl_gamelist_sphere = useSelector((state) => 
    state.gl_gamelist_sphere.gl_gamelist_sphere
    )

    useEffect(() => {
        let mounted = true
        if(mounted && jp_gamelist_sphere == undefined){
            dispatch(getJPGameListSphere())
        }
        return function cleanup() {
            mounted = false
        }
    },[dispatch,jp_gamelist_sphere])

    useEffect(() => {
        let mounted = true
        if(mounted && gl_gamelist_sphere == undefined){
            dispatch(getGLGameListSphere())
        }
        return function cleanup() {
            mounted = false
        }
    },[dispatch,gl_gamelist_sphere])

    const jptoggledata = useSelector((state) => 
    state.toggle.toggle
    );

    useEffect(() => {
        let mounted = true
        if (mounted) {
        dispatch(getJPToggle());
        }
        return function cleanup() {
            mounted = false
        }
    },[dispatch])

    return (
        ProcessedEvents != undefined && 
        ProcessedCharacters != undefined && 
        EventGuideData != undefined &&
        jptoggledata != undefined && 
        master_index != undefined 
        ?
        <EventPermaLinks 
        ProcessedEvents={ProcessedEvents} 
        match={match}
        ProcessedCharacters={ProcessedCharacters}
        jptoggledata={jptoggledata}
        master_index={master_index}
        EventGuideData={EventGuideData}
        />
        : 
        <Loading/>
    )

}

export default CallEventhandoff;