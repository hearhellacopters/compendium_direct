import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from '../redux/ducks/characters';
import { getJPToggle } from '../redux/ducks/jptoggle';
import Loading from '../components/Loading'
//direct

import { getMasterIndex } from '../redux/ducks/master_index';

import { getJPGameListAilment } from '../redux/ducks/JP/gamelist_ailment';
import { getGLGameListAilment } from '../redux/ducks/GL/gamelist_ailment';

import Buffs from '../Buffs';

export default function CallBuffs(){

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

    const [ProcessedBuffs, setProcessedBuffs] = useState()
    const [ver, setver] = useState(jptoggledata == true ? "JP" : "GL")

    const jp_gamelist_ailment = useSelector((state) =>
        state.jp_gamelist_ailment.jp_gamelist_ailment
    )

    const gl_gamelist_ailment = useSelector((state) =>
        state.gl_gamelist_ailment.gl_gamelist_ailment
    )

    useEffect(() => {
        let mounted = true
        if (mounted && jptoggledata == true && jp_gamelist_ailment == undefined) {
            setProcessedBuffs()
            dispatch(getJPGameListAilment())
            setver("JP")
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, jptoggledata, jp_gamelist_ailment])

    useEffect(() => {
        let mounted = true
        if (mounted && jptoggledata != true && gl_gamelist_ailment == undefined) {
            setProcessedBuffs()
            dispatch(getGLGameListAilment())
            setver("GL")
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, jptoggledata, gl_gamelist_ailment])

    useEffect(() => {
        if (jptoggledata == true && jp_gamelist_ailment != undefined) {
            setProcessedBuffs(jp_gamelist_ailment)
            setver("JP")
        }
        if (jptoggledata != true && gl_gamelist_ailment != undefined) {
            setProcessedBuffs(gl_gamelist_ailment)
            setver("GL")
        }
    }, [dispatch, jptoggledata, jp_gamelist_ailment, gl_gamelist_ailment])


    return (
        ver != undefined &&
            ProcessedBuffs != undefined &&
            master_index != undefined
            ?
            <Buffs
                ProcessedBuffs={ProcessedBuffs}
                ver={ver}
                match={match}
                master_index={master_index}
            />
            :
            <Loading />
    )
}