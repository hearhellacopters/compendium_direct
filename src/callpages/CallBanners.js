import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getBanners } from '../redux/ducks/banners';
import { getCharacters } from '../redux/ducks/characters';
import { getJPToggle } from '../redux/ducks/jptoggle';
import Banners from '../Banners';
import Loading from '../components/Loading'

export default function CallBanners(){

    const dispatch = useDispatch();

    const ProcessedBanners = useSelector((state) =>
        state.banners.banners
    );

    const jptoggledata = useSelector((state) =>
        state.toggle.toggle
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedBanners == undefined) {
            dispatch(getBanners());
        }
        if (mounted) {
            dispatch(getJPToggle());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedBanners]);

    const ProcessedCharacters = useSelector((state) =>
        state.characters.characters
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedCharacters == undefined) {
            dispatch(getCharacters());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedCharacters]);

    return (
        ProcessedBanners != undefined && ProcessedCharacters != undefined && jptoggledata != undefined ?
            <Banners ProcessedBanners={ProcessedBanners} ProcessedCharacters={ProcessedCharacters} jptoggledata={jptoggledata} />
            :
            <Loading />
    )

}