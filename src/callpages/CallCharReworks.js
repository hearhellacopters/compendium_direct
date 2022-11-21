import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from '../redux/ducks/characters';
import { getJPToggle } from '../redux/ducks/jptoggle';
import CallReworksHandoff from './CallCharReworksHandOff';
import Loading from './_loading'
import {Navigate} from 'react-router-dom';

const CallCharReworks = () =>{

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

    const jptoggledata = useSelector((state) => 
    state.toggle.toggle
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedCharacters == undefined) {
        dispatch(getCharacters())
        }
        if (mounted) {
        dispatch(getJPToggle());
        }
        if (mounted) {
            dispatch(getJPToggle());
            }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,ProcessedCharacters]);


    const filtered = ProcessedCharacters && ProcessedCharacters[Access[match.params.id]]
    
    return (
        Access != undefined && ProcessedCharacters != undefined && jptoggledata != undefined?
        filtered == undefined ?
        <Navigate replace to="/404"/>
        :
        <CallReworksHandoff 
        match={match} 
        ProcessedCharacters={ProcessedCharacters}
        filtered={filtered}
        jptoggledata={jptoggledata}
        />
        :<Loading/>
    )

}

export default CallCharReworks;