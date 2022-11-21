import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from '../redux/ducks/characters';
import { getJPToggle } from '../redux/ducks/jptoggle';
import Character from '../Characters';
import Loading from './_loading'

const CallCharacters = () =>{
    
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
        <Character ProcessedCharacters={ProcessedCharacters} jptoggledata={jptoggledata}/>
        : 
        <Loading/>
    )

}

export default CallCharacters;