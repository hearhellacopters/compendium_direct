import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getGear} from '../redux/ducks/gear';
import { getBuffs} from '../redux/ducks/buffs';
import { getCharacters } from '../redux/ducks/characters';
import { getJPToggle } from '../redux/ducks/jptoggle';
import Gear from '../Gear';
import Loading from './_loading'

const CallGear = () =>{
    
    const dispatch = useDispatch();

    const ProcessedGear = useSelector((state) => 
    state.gear.gear
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
        if (mounted && ProcessedGear == undefined) {
        dispatch(getGear());
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
    }, [dispatch,ProcessedGear,ProcessedBuffs,ProcessedCharacters]);


    return (
        ProcessedGear != undefined && ProcessedCharacters != undefined && ProcessedBuffs != undefined && jptoggledata != undefined?
        <Gear ProcessedGear={ProcessedGear} ProcessedCharacters={ProcessedCharacters} ProcessedBuffs={ProcessedBuffs} jptoggledata={jptoggledata}/>
        : 
        <Loading/>
    )

}

export default CallGear;