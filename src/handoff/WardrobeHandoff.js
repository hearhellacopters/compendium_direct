import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import CharacterWardrobePage from '../Wardrobe';
import { Navigate } from 'react-router-dom';
import { getCharacters } from '../redux/ducks/characters';
import Loading from '../components/Loading';
import { getQuery } from '../components/URLParams';

export default function WardrobeHandoff({ match }){

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
        
        const { pathname } = window.location;
        const query = getQuery();
        const url = `${pathname}?${query.toString()}`;
        return (
            <Navigate replace to="/404" state={{loc:url}}/>
        )

    }
}