import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getJPCalendar } from '../redux/ducks/jpcalendar';
import { getEvents } from '../redux/ducks/events';
import { getBanners } from '../redux/ducks/banners';
import { getJPToggle } from '../redux/ducks/jptoggle';
import Calendar from '../Calendar';
import Loading from '../components/Loading'

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