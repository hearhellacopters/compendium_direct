import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from '../redux/ducks/characters';
import CharacterWardrobePage from '../characterpages/CharacterWardrobePage';
import Loading from './_loading'

const CallWardrobe = () =>{

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
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,ProcessedCharacters]);

    return (
        ProcessedCharacters != undefined ?
        <CharacterWardrobePage ProcessedCharacters={ProcessedCharacters} match={match}/>
        : 
        <Loading/>
    )

}

export default CallWardrobe;