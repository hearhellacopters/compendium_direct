import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getJPCalendar } from '../redux/ducks/jpcalendar';
import { getEvents } from '../redux/ducks/events';
import { getBanners } from '../redux/ducks/banners';
import { getJPToggle } from '../redux/ducks/jptoggle';
import Calendar from '../Calendar';
import Loading from './_loading'

const CallCalendarPage = () => {

    const dispatch = useDispatch();

    const JPCalendarData = useSelector((state) =>
        state.jpcalendar.jpcalendar
    );

    const EventData = useSelector((state) =>
        state.events.events
    );

    const BannerData = useSelector((state) =>
        state.banners.banners
    );

    const jptoggledata = useSelector((state) =>
        state.toggle.toggle
    );

    useEffect(() => {
        let mounted = true
        if (mounted && JPCalendarData == undefined) {
            dispatch(getJPCalendar());
        }
        if (mounted && EventData == undefined) {
            dispatch(getEvents())
        }
        if (mounted && BannerData == undefined) {
            dispatch(getBanners())
        }
        if (mounted) {
            dispatch(getJPToggle())
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, JPCalendarData, BannerData, EventData]);

    return (
        EventData != undefined && JPCalendarData != undefined && jptoggledata != undefined && BannerData != undefined ?
            <Calendar JPCalendarData={JPCalendarData} EventData={EventData} jptoggledata={jptoggledata} BannerData={BannerData} />
            :
            <Loading />
    )

}

export default CallCalendarPage;