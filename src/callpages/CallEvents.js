import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from '../redux/ducks/events';
import { getEventGuide } from '../redux/ducks/EventGuide';
import { getCharacters } from '../redux/ducks/characters';
import { getJPToggle } from '../redux/ducks/jptoggle';
import Events from '../Events';
import Loading from './_loading'

const CallEventsPage = () =>{
    
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
        if (mounted) {
        dispatch(getJPToggle());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,ProcessedEvents,ProcessedCharacters,EventGuideData]);
    
    return (
        ProcessedEvents != undefined && ProcessedCharacters != undefined && EventGuideData != undefined && jptoggledata != undefined?
        <Events ProcessedEvents={ProcessedEvents} ProcessedCharacters={ProcessedCharacters} EventGuideData={EventGuideData} jptoggledata={jptoggledata}/>
        : 
        <Loading/>
    )

}

export default CallEventsPage;