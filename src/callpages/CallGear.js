import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from '../redux/ducks/characters.js';
import { getJPToggle } from '../redux/ducks/jptoggle.js';
import Loading from '../components/Loading.js'
//direct

import { getMasterIndex } from '../redux/ducks/master_index.js';

import { getJPGameListGear } from '../redux/ducks/JP/gamelist_gear.js';
import { getGLGameListGear } from '../redux/ducks/GL/gamelist_gear.js';

import Gear from '../Gear.js';

export default function CallGear(){

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

    const [ProcessedGear, setProcessedGear] = useState()
    const [ver, setver] = useState(jptoggledata == true ? "JP" : "GL")

    const jp_gamelist_gear = useSelector((state) =>
        state.jp_gamelist_gear.jp_gamelist_gear
    )

    const gl_gamelist_gear = useSelector((state) =>
        state.gl_gamelist_gear.gl_gamelist_gear
    )

    useEffect(() => {
        let mounted = true
        if (jptoggledata == true && jp_gamelist_gear == undefined) {
            setProcessedGear()
            dispatch(getJPGameListGear())
            setver("JP")
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, jptoggledata, jp_gamelist_gear])

    useEffect(() => {
        let mounted = true
        if (jptoggledata != true && gl_gamelist_gear == undefined) {
            setProcessedGear()
            dispatch(getGLGameListGear())
            setver("GL")
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, jptoggledata, gl_gamelist_gear])

    useEffect(() => {
        if (jptoggledata == true && jp_gamelist_gear != undefined) {
            setProcessedGear(jp_gamelist_gear)
            setver("JP")
        }
        if (jptoggledata != true && gl_gamelist_gear != undefined) {
            setProcessedGear(gl_gamelist_gear)
            setver("GL")
        }
    }, [dispatch, jptoggledata, gl_gamelist_gear, jp_gamelist_gear])


    return (
        ver != undefined &&
            ProcessedGear != undefined &&
            master_index != undefined
            ?
            <Gear
                ProcessedGear={ProcessedGear}
                ver={ver}
                match={match}
                master_index={master_index}
            />
            :
            <Loading />
    )
}