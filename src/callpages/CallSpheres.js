import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from '../redux/ducks/characters';
import { getJPToggle } from '../redux/ducks/jptoggle';
import Loading from '../components/Loading'
//direct

import { getMasterIndex } from '../redux/ducks/master_index';

import { getJPGameListSphere } from '../redux/ducks/JP/gamelist_sphere';
import { getGLGameListSphere } from '../redux/ducks/GL/gamelist_sphere';

import Spheres from '../Spheres';

export default function CallSpheres(){

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

    const [ProcessedSpheres, setProcessedSpheres] = useState()
    const [ver, setver] = useState(jptoggledata == true ? "JP" : "GL")

    const jp_gamelist_sphere = useSelector((state) =>
        state.jp_gamelist_sphere.jp_gamelist_sphere
    )

    const gl_gamelist_sphere = useSelector((state) =>
        state.gl_gamelist_sphere.gl_gamelist_sphere
    )

    useEffect(() => {
        let mounted = true
        if (mounted && jptoggledata == true && jp_gamelist_sphere == undefined) {
            setProcessedSpheres()
            dispatch(getJPGameListSphere())
            setver("JP")
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, jptoggledata, jp_gamelist_sphere])

    useEffect(() => {
        let mounted = true
        if (mounted && jptoggledata != true && gl_gamelist_sphere == undefined) {
            setProcessedSpheres()
            dispatch(getGLGameListSphere())
            setver("GL")
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, jptoggledata, gl_gamelist_sphere])

    useEffect(() => {
        if (jptoggledata == true && jp_gamelist_sphere != undefined) {
            setProcessedSpheres(jp_gamelist_sphere)
            setver("JP")
        }
        if (jptoggledata != true && gl_gamelist_sphere != undefined) {
            setProcessedSpheres(gl_gamelist_sphere)
            setver("GL")
        }
    }, [dispatch, jptoggledata, gl_gamelist_sphere, jp_gamelist_sphere])


    return (

        ver != undefined &&

            ProcessedSpheres != undefined &&

            master_index != undefined

            ?

            <Spheres

                ProcessedSpheres={ProcessedSpheres}
                ver={ver}

                match={match}

                master_index={master_index}
            />

            :

            <Loading />
    )
}