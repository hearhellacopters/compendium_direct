import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getBanners } from '../redux/ducks/banners.js';
import { getCharacters } from '../redux/ducks/characters.js';
import { getJPToggle } from '../redux/ducks/jptoggle.js';
import Forecast from '../Forecast.js';
import Loading from '../components/Loading.js'

export default function CallForecast(){

    const dispatch = useDispatch();

    const ProcessedBanners = useSelector((state) =>
        state.banners.banners
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedBanners == undefined) {
            dispatch(getBanners());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedBanners]);

    const ProcessedCharacters = useSelector((state) =>
        state.characters.characters
    );

    const jptoggledata = useSelector((state) =>
        state.toggle.toggle
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedCharacters == undefined) {
            dispatch(getCharacters());
        }
        if (mounted) {
            dispatch(getJPToggle());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedCharacters]);

    return (
        ProcessedBanners != undefined && ProcessedCharacters != undefined && jptoggledata != undefined ?
            <Forecast ProcessedBanners={ProcessedBanners} ProcessedCharacters={ProcessedCharacters} jptoggledata={jptoggledata} />
            :
            <Loading />
    )

}