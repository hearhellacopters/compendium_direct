import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getStickers } from '../redux/ducks/stickers';
import { getCharacters } from '../redux/ducks/characters';
import { getJPToggle } from '../redux/ducks/jptoggle';
import Stickers from '../Stickers';
import Loading from '../components/Loading'

export default function CallStickers(){

    const dispatch = useDispatch();

    const ProcessedStickers = useSelector((state) =>
        state.stickers.stickers
    );

    const jptoggledata = useSelector((state) =>
        state.toggle.toggle
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedStickers == undefined) {
            dispatch(getStickers());
        }
        if (mounted) {
            dispatch(getJPToggle());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedStickers]);


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
        ProcessedStickers != undefined && ProcessedCharacters != undefined && jptoggledata != undefined ?
            <Stickers
                ProcessedStickers={ProcessedStickers}
                ProcessedCharacters={ProcessedCharacters}
                jptoggledata={jptoggledata}
            />
            :
            <Loading />
    )

}