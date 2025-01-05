import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getJPCalendar } from '../redux/ducks/jpcalendar.js';
import { getEvents } from '../redux/ducks/events.js';
import { getBanners } from '../redux/ducks/banners.js';
import { getJPToggle } from '../redux/ducks/jptoggle.js';
import Calendar from '../Calendar.js';
import Loading from '../components/Loading.js'

export default function CallCalendar(){

    const dispatch = useDispatch();

    const JPCalendarData = useSelector((state) =>
        state.jpcalendar.jpcalendar
    );

    const jptoggledata = useSelector((state) =>
        state.toggle.toggle
    );

    useEffect(() => {
        let mounted = true
        if (mounted && JPCalendarData == undefined) {
            dispatch(getJPCalendar());
        }
        if (mounted) {
            dispatch(getJPToggle())
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, JPCalendarData]);

    const EventData = useSelector((state) =>
        state.events.events
    );

    useEffect(() => {
        let mounted = true
        if (mounted && EventData == undefined) {
            dispatch(getEvents())
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, EventData]);

    const BannerData = useSelector((state) =>
        state.banners.banners
    );

    useEffect(() => {
        let mounted = true
        if (mounted && BannerData == undefined) {
            dispatch(getBanners())
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, BannerData]);

    return (
        EventData != undefined && JPCalendarData != undefined && jptoggledata != undefined && BannerData != undefined ?
            <Calendar JPCalendarData={JPCalendarData} EventData={EventData} jptoggledata={jptoggledata} BannerData={BannerData} />
            :
            <Loading />
    )

}