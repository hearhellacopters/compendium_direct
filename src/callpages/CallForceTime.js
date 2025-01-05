import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from '../redux/ducks/characters.js';
import { getJPToggle } from '../redux/ducks/jptoggle.js';
import FRPageFormatting from '../ForceTime.js';
import Loading from '../components/Loading.js'

export default function CallForceTime(){

    const match = {
        params: useParams()
    }

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

    const CharacterswithFR = ProcessedCharacters && Object.values(ProcessedCharacters).filter(chars => chars.AbilityFR != undefined)

    return (
        CharacterswithFR != undefined && ProcessedCharacters != undefined && CharacterswithFR != undefined ?
            <FRPageFormatting
                match={match}
                ForceCharacters={CharacterswithFR}
                ProcessedCharacters={ProcessedCharacters}
                jptoggledata={jptoggledata}
            />
            :
            <Loading />
    )

}