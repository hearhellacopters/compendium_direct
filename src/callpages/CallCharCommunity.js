import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from '../redux/ducks/characters';
import { getCharGuide } from '../redux/ducks/CharGuide';
import { getJPToggle } from '../redux/ducks/jptoggle';
import CharacterCommunity from '../characterpages/CharacterPageCommunity';

import {Navigate} from 'react-router-dom';
import Loading from './_loading'

const CallCommunity = () =>{

    const match = {
        params: useParams()
    }
    
    const dispatch = useDispatch();

    const ProcessedCharacters = useSelector((state) => 
    state.characters.characters
    );

    const Access = useSelector((state) => 
    state.characters.access
    );

    const CharGuideData= useSelector((state) => 
    state.charGuide.charGuide
    );

    const jptoggledata = useSelector((state) => 
    state.toggle.toggle
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedCharacters == undefined) {
        dispatch(getCharacters())
        }
        if (mounted && CharGuideData == undefined) {
        dispatch(getCharGuide())   
        }
        if (mounted) {
        dispatch(getJPToggle());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,ProcessedCharacters,CharGuideData]);


    return (
            Access != undefined && ProcessedCharacters != undefined && CharGuideData != undefined && jptoggledata != undefined?
            Access[match.params.id] == undefined ? 
            <Navigate replace to="/404"/>
            :
            <CharacterCommunity 
            chara_id={Access[match.params.id]}
            ProcessedCharacters={ProcessedCharacters} 
            match={match} 
            jptoggledata={jptoggledata}
            CharGuideData={CharGuideData}/>
            :<Loading/>
            
    )
    

}

export default CallCommunity;