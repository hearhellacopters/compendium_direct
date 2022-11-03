import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from '../redux/ducks/characters';
import { getCharGuide } from '../redux/ducks/CharGuide';
import CharacterCommunity from '../characterpages/CharacterPageCommunity';
import Loading from './_loading'

const CallCommunity = () =>{

    const match = {
        params: useParams()
    }
    
    const dispatch = useDispatch();

    const ProcessedCharacters = useSelector((state) => 
    state.characters.characters
    );

    const CharGuideData= useSelector((state) => 
    state.charGuide.charGuide
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedCharacters == undefined) {
        dispatch(getCharacters())
        }
        if (mounted && CharGuideData == undefined) {
        dispatch(getCharGuide())   
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,ProcessedCharacters,CharGuideData]);

    return (
        ProcessedCharacters != undefined && CharGuideData != undefined?
        <CharacterCommunity ProcessedCharacters={ProcessedCharacters} match={match} CharGuideData={CharGuideData}/>
        : 
        <Loading/>
    )
    

}

export default CallCommunity;