import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import FRWeaponFormatting from '../characterpages/FRPageFormatting';
import {Navigate} from 'react-router-dom';
import { getFRWeapon } from '../redux/ducks/frweapon';
import { getCharacters} from '../redux/ducks/characters';
import Loading from '../callpages/_loading'

const ForceTimeHandoff = ({ match }) => {

    const dispatch = useDispatch();

    const FRWeapon = useSelector((state) => 
    state.frweapon.frweapon
    );

    const ProcessedCharacters = useSelector((state) => 
    state.characters.characters
    );

    useEffect(() => {
        let mounted = true
        if (mounted && FRWeapon == undefined) {
        dispatch(getFRWeapon());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, FRWeapon]);

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedCharacters == undefined) {
        dispatch(getCharacters());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,ProcessedCharacters]);


      if(match.params.id == "frweapon"){
        return(
            FRWeapon != undefined && ProcessedCharacters != undefined?
            <FRWeaponFormatting ProcessedGear={FRWeapon} match={match} ProcessedCharacter={ProcessedCharacters}/>:
            <Loading/>
        )
        } else {
        return(
            <Navigate replace to="/404"/>
        )
    
    } 
}
export default ForceTimeHandoff