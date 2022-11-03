import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAbilities } from '../redux/ducks/abilities';
import { getBuffs } from '../redux/ducks/buffs';
import { getCharacters } from '../redux/ducks/characters';
import { getJPToggle } from '../redux/ducks/jptoggle';
import Abilities from '../Abilities';
import Loading from './_loading'

const CallAbilities = () =>{
    
    const dispatch = useDispatch();

    const ProcessedAbilities = useSelector((state) => 
    state.abilities.abilities
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
        if (mounted && ProcessedAbilities == undefined) {
        dispatch(getAbilities());
        }
        if (mounted && ProcessedCharacters == undefined) {
        dispatch(getCharacters())
        }
        if (mounted && ProcessedBuffs == undefined) {
        dispatch(getBuffs())
        }
        if (mounted) {
        dispatch(getJPToggle())
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,ProcessedAbilities,ProcessedCharacters,ProcessedBuffs]);

    return (
        ProcessedAbilities != undefined && ProcessedCharacters != undefined && ProcessedBuffs != undefined && jptoggledata != undefined?
        <Abilities ProcessedAbilities={ProcessedAbilities} ProcessedCharacters={ProcessedCharacters} ProcessedBuffs={ProcessedBuffs} jptoggledata={jptoggledata}/>
        : 
        <Loading/>
    )

}

export default CallAbilities;