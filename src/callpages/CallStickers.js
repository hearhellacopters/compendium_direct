import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getStickers } from '../redux/ducks/stickers';
import { getCharacters } from '../redux/ducks/characters';
import { getJPToggle } from '../redux/ducks/jptoggle';
import Stickers from '../Stickers';
import Loading from './_loading'

const CallStickers = () =>{
    
    const dispatch = useDispatch();

    const ProcessedStickers = useSelector((state) => 
    state.stickers.stickers
    );

    const ProcessedCharacters = useSelector((state) => 
    state.characters.characters
    );

    const jptoggledata = useSelector((state) => 
    state.toggle.toggle
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedStickers == undefined) {
        dispatch(getStickers());
        }
        if (mounted && ProcessedCharacters == undefined) {
        dispatch(getCharacters());
        }
        if (mounted) {
        dispatch(getJPToggle());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,ProcessedCharacters,ProcessedStickers]);

    return (
        ProcessedStickers != undefined && ProcessedCharacters != undefined && jptoggledata != undefined?
        <Stickers 
        ProcessedStickers={ProcessedStickers} 
        ProcessedCharacters={ProcessedCharacters}
        jptoggledata={jptoggledata}
        />
        : 
        <Loading/>
    )

}

export default CallStickers;