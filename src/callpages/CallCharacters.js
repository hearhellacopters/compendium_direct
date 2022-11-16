import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from '../redux/ducks/characters';
import { getJPToggle } from '../redux/ducks/jptoggle';
import Character from '../Characters';
import Loading from './_loading'
import { getAccess} from '../redux/ducks/access';

const CallCharacters = () =>{
    
    const dispatch = useDispatch();

    const Access = useSelector((state) => 
    state.access.access
    );

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
        if (mounted && Access == undefined) {
        dispatch(getAccess());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedCharacters,Access]);


    return (
        ProcessedCharacters != undefined && jptoggledata != undefined && Access != undefined?
        <Character Access={Access} ProcessedCharacters={ProcessedCharacters} jptoggledata={jptoggledata}/>
        : 
        <Loading/>
    )

}

export default CallCharacters;