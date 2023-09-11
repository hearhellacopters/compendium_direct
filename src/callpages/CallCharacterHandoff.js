import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from '../redux/ducks/characters';
import { getCharGuide } from '../redux/ducks/CharGuide';
import { getJPToggle } from '../redux/ducks/jptoggle';
import CharacterHandoff from '../handoff/CharacterHandoff.js';
import Loading from '../processing/Loading'

export default function CallCharacterHandoff(){

    const match = {
        params: useParams()
    }

    const dispatch = useDispatch();

    const ProcessedCharacters = useSelector((state) =>
        state.characters.characters
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

    const url_access = useSelector((state) =>
        state.characters.access
    );

    const CharGuideData = useSelector((state) =>
        state.charGuide.charGuide
    );

    const jptoggledata = useSelector((state) =>
        state.toggle.toggle
    );

    useEffect(() => {
        let mounted = true
        if (mounted && CharGuideData == undefined) {
            dispatch(getCharGuide());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, CharGuideData]);

    return (
        ProcessedCharacters != undefined && CharGuideData != undefined && jptoggledata != undefined && url_access != undefined ?
            <CharacterHandoff
                match={match}
                ProcessedCharacters={ProcessedCharacters}
                CharGuideData={CharGuideData}
                jptoggledata={jptoggledata}
                url_access={url_access}
            />
            :
            <Loading />
    )

}