import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import CharacterWardrobePage from '../characterpages/CharacterWardrobePage';
import { Navigate } from 'react-router-dom';
import { getCharacters } from '../redux/ducks/characters';
import Loading from '../callpages/_loading'

const WardrobePassoff = ({ match }) => {

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


    if (match.params.id == "wardrobe") {
        return (
            ProcessedCharacters != undefined ?
                <CharacterWardrobePage ProcessedCharacters={ProcessedCharacters} match={match} /> :
                <Loading />
        )
    } else {
        return (
            <Navigate replace to="/404" />
        )

    }
}
export default WardrobePassoff