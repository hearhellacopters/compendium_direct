import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getEnemiesDirect } from '../redux/ducks/enemies_direct';
import { getCharacters } from '../redux/ducks/characters';
import { getJPToggle } from '../redux/ducks/jptoggle';
import BestiaryDirect from '../BestiaryDirect';
import Loading from './_loading'

const CallBestiary = () => {

    const dispatch = useDispatch();

    const ProcessedCharacters = useSelector((state) =>
        state.characters.characters
    );

    const ProcessedEnemyDirect = useSelector((state) =>
        state.enemies_direct.enemies_direct
    );

    const jptoggledata = useSelector((state) =>
        state.toggle.toggle
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedEnemyDirect == undefined) {
            dispatch(getEnemiesDirect());
        }
        if (mounted) {
            dispatch(getJPToggle());
        }
        if (mounted && ProcessedCharacters == undefined) {
            dispatch(getCharacters())
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedEnemyDirect, ProcessedCharacters]);

    const reversed = ProcessedEnemyDirect && Object.values(ProcessedEnemyDirect).reverse()

    return (
        reversed != undefined && ProcessedCharacters != undefined && jptoggledata != undefined ?
            <BestiaryDirect ProcessedEnemy={reversed} jptoggledata={jptoggledata} ProcessedCharacters={ProcessedCharacters} PartnerCharacters={ProcessedCharacters} />
            :
            <Loading />
    )

}

export default CallBestiary;