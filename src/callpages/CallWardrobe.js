import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from '../redux/ducks/characters';
import Wardrobe from '../Wardrobe';
import Loading from '../components/Loading'

export default function CallWardrobe(){

    const match = {
        params: useParams()
    }

    const dispatch = useDispatch();

    const ProcessedCharacters = useSelector((state) =>
        state.characters.characters
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedCharacters == undefined) {
            dispatch(getCharacters());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedCharacters]);

    return (
        ProcessedCharacters != undefined ?
            <Wardrobe
                ProcessedCharacters={ProcessedCharacters}
                match={match} />
            :
            <Loading />
    )

}