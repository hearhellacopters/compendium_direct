import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from '../redux/ducks/characters.js';
import { getJPToggle } from '../redux/ducks/jptoggle.js';
import Character from '../Characters.js';
import Loading from '../components/Loading.js'

export default function CallCharacters(){

    const dispatch = useDispatch();

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
        ProcessedCharacters != undefined && jptoggledata != undefined ?
            <Character ProcessedCharacters={ProcessedCharacters} jptoggledata={jptoggledata} />
            :
            <Loading />
    )

}