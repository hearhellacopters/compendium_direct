import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from '../redux/ducks/events';
import { getEventGuide } from '../redux/ducks/EventGuide';
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

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedEvents == undefined) {
        dispatch(getEvents());
        }
        if (mounted && EventGuideData == undefined) {
        dispatch(getEventGuide());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,ProcessedEvents,EventGuideData]);


    return (
        ProcessedEvents != undefined && EventGuideData != undefined?
        <EventPermaLinks ProcessedEvents={ProcessedEvents} match={match} EventGuideData={EventGuideData}/>
        : 
        <Loading/>
    )

}

export default CallEventhandoff;