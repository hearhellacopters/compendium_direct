import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getStickers } from '../redux/ducks/stickers';
import { getCharacters } from '../redux/ducks/characters';
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

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedStickers == undefined) {
        dispatch(getStickers());
        }
        if (mounted && ProcessedCharacters == undefined) {
        dispatch(getCharacters());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,ProcessedCharacters,ProcessedStickers]);

    return (
        ProcessedStickers != undefined && ProcessedCharacters != undefined?
        <Stickers ProcessedStickers={ProcessedStickers} ProcessedCharacters={ProcessedCharacters}/>
        : 
        <Loading/>
    )

}

export default CallStickers;