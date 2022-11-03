import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getPassives } from '../redux/ducks/passives';
import { getBuffs } from '../redux/ducks/buffs';
import { getCharacters } from '../redux/ducks/characters';
import { getJPToggle } from '../redux/ducks/jptoggle';
import Passives from '../Passives';
import Loading from './_loading'

const CallPassives = () =>{
    
    const dispatch = useDispatch();

    const ProcessedPassives = useSelector((state) => 
    state.passives.passives
    );

    const ProcessedCharacters = useSelector((state) => 
    state.characters.characters
    );

    const ProcessedBuffs = useSelector((state) => 
    state.buffs.buffs
    );

    const jptoggledata = useSelector((state) => 
    state.toggle.toggle
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedPassives == undefined) {
        dispatch(getPassives());
        }
        if (mounted && ProcessedCharacters == undefined) {
        dispatch(getCharacters())
        }
        if (mounted && ProcessedBuffs== undefined) {
        dispatch(getBuffs())
        }
        if (mounted) {
        dispatch(getJPToggle())
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,ProcessedPassives,ProcessedCharacters,ProcessedBuffs]);

    return (
        ProcessedPassives != undefined && ProcessedCharacters != undefined && ProcessedBuffs != undefined && jptoggledata != undefined?
        <Passives 
        ProcessedPassives={ProcessedPassives} 
        ProcessedCharacters={ProcessedCharacters} 
        ProcessedBuffs={ProcessedBuffs} 
        jptoggledata={jptoggledata}/>
        : 
        <Loading/>
    )

}

export default CallPassives;