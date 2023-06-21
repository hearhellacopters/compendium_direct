import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from '../redux/ducks/characters';
import { getJPToggle } from '../redux/ducks/jptoggle';
import Loading from '../components/Loading'
//direct

import { getMasterIndex } from '../redux/ducks/master_index';

import { getJPGameListPassive } from '../redux/ducks/JP/gamelist_passive';
import { getGLGameListPassive } from '../redux/ducks/GL/gamelist_passive';

import Passives from '../Passives';

export default function CallPassives(){

    const match = {
        params: useParams()
    }

    const dispatch = useDispatch();

    const master_index = useSelector((state) =>
        state.master_index.master_index
    );

    useEffect(() => {
        let mounted = true
        if (mounted && master_index == undefined) {
            dispatch(getMasterIndex());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, master_index])

    const ProcessedCharacters = useSelector((state) =>
        state.characters.characters
    );

    const jptoggledata = useSelector((state) =>
        state.toggle.toggle
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

    const [ProcessedPassives, setProcessedPassives] = useState()
    const [ver, setver] = useState(jptoggledata == true ? "JP" : "GL")

    const jp_gamelist_passive = useSelector((state) =>
        state.jp_gamelist_passive.jp_gamelist_passive
    )

    const gl_gamelist_passive = useSelector((state) =>
        state.gl_gamelist_passive.gl_gamelist_passive
    )

    useEffect(() => {
        let mounted = true
        if (mounted && jptoggledata == true && jp_gamelist_passive == undefined) {
            setProcessedPassives()
            dispatch(getJPGameListPassive())
            setver("JP")
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, jptoggledata, jp_gamelist_passive])

    useEffect(() => {
        let mounted = true
        if (mounted && jptoggledata != true && gl_gamelist_passive == undefined) {
            setProcessedPassives()
            dispatch(getGLGameListPassive())
            setver("GL")
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, jptoggledata, gl_gamelist_passive])

    useEffect(() => {
        if (jptoggledata == true && jp_gamelist_passive != undefined) {
            setProcessedPassives(jp_gamelist_passive)
            setver("JP")
        }
        if (jptoggledata != true && gl_gamelist_passive != undefined) {
            setProcessedPassives(gl_gamelist_passive)
            setver("GL")
        }
    }, [dispatch, jptoggledata, gl_gamelist_passive, jp_gamelist_passive])


    return (
        ver != undefined &&

            ProcessedPassives != undefined &&

            master_index != undefined

            ?

            <Passives

                ProcessedPassives={ProcessedPassives}
                ver={ver}

                match={match}

                master_index={master_index}
            />

            :

            <Loading />
    )
}