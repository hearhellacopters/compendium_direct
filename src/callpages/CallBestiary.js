import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getEnemiesDirect } from '../redux/ducks/enemies_direct';
import { getCharacters } from '../redux/ducks/characters';
import { getJPToggle } from '../redux/ducks/jptoggle';
import Bestiary from '../Bestiary';
import Loading from '../components/Loading'

export default function CallBestiary(){

    const dispatch = useDispatch();

    const ProcessedCharacters = useSelector((state) =>
        state.characters.characters
    );

    const jptoggledata = useSelector((state) =>
        state.toggle.toggle
    );

    useEffect(() => {
        let mounted = true
        if (mounted) {
            dispatch(getJPToggle());
        }
        if (mounted && ProcessedCharacters == undefined) {
            dispatch(getCharacters())
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedCharacters]);

    const ProcessedEnemyDirect = useSelector((state) =>
        state.enemies_direct.enemies_direct
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedEnemyDirect == undefined) {
            dispatch(getEnemiesDirect());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedEnemyDirect]);

    const reversed = ProcessedEnemyDirect && Object.values(ProcessedEnemyDirect).reverse()

    return (
        reversed != undefined && ProcessedCharacters != undefined && jptoggledata != undefined ?
            <Bestiary ProcessedEnemy={reversed} jptoggledata={jptoggledata} ProcessedCharacters={ProcessedCharacters} PartnerCharacters={ProcessedCharacters} />
            :
            <Loading />
    )

}