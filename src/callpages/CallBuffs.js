import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getBuffs } from '../redux/ducks/buffs';
import { getJPToggle } from '../redux/ducks/jptoggle';
import { getCharacters } from '../redux/ducks/characters';
import Buffs from '../Buffs';
import Loading from './_loading'

const CallBuffs = () =>{
    
    const dispatch = useDispatch();

    const ProcessedBuffs = useSelector((state) => 
    state.buffs.buffs
    );

    const jptoggledata = useSelector((state) => 
    state.toggle.toggle
    );

    const ProcessedCharacters = useSelector((state) => 
    state.characters.characters
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedBuffs == undefined) {
        dispatch(getBuffs());
        }
        if (mounted) {
        dispatch(getJPToggle())
        }
        if (mounted && ProcessedCharacters == undefined) {
        dispatch(getCharacters());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedBuffs, ProcessedCharacters]);


    return (
        ProcessedBuffs != undefined && jptoggledata!= undefined && ProcessedCharacters != undefined?
        <Buffs ProcessedBuffs={ProcessedBuffs} jptoggledata={jptoggledata} ProcessedCharacters={ProcessedCharacters}/>
        : 
        <Loading/>
    )

}

export default CallBuffs;