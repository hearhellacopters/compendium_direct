import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from '../redux/ducks/characters';
import { getJPToggle } from '../redux/ducks/jptoggle';
import { getMasterIndex } from '../redux/ducks/master_index';
import CallCharReworksHandOff from '../handoff/CharReworksHandoff';
import Loading from '../processing/Loading'
import { Navigate } from 'react-router-dom';

export default function CallCharReworks(){

    const match = {
        params: useParams()
    }

    const dispatch = useDispatch();

    const ProcessedCharacters = useSelector((state) =>
        state.characters.characters
    );

    const Access = useSelector((state) =>
        state.characters.access
    );

    const jptoggledata = useSelector((state) =>
        state.toggle.toggle
    );

    const master_index = useSelector((state) =>
        state.master_index.master_index
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedCharacters == undefined) {
            dispatch(getCharacters())
        }
        if (mounted) {
            dispatch(getJPToggle());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedCharacters]);

    useEffect(() => {
        let mounted = true
        if (mounted && master_index == undefined) {
            dispatch(getMasterIndex())
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, master_index]);


    const filtered = ProcessedCharacters && ProcessedCharacters[Access[match.params.id]]

    return (
        Access != undefined && ProcessedCharacters != undefined && jptoggledata != undefined && master_index != undefined ?
            filtered == undefined ?
                <Navigate replace to="/404" />
                :
                <CallCharReworksHandOff
                    match={match}
                    master_index={master_index}
                    ProcessedCharacters={ProcessedCharacters}
                    filtered={filtered}
                    jptoggledata={jptoggledata}
                />
            : <Loading />
    )

}