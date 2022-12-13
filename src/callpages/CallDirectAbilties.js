import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from '../redux/ducks/characters';
import { getJPToggle } from '../redux/ducks/jptoggle';
import Loading from './_loading'
//direct

import { getMasterIndex } from '../redux/ducks/master_index';

import { getJPGameListAbility } from '../redux/ducks/JP/gamelist_ability';
import { getGLGameListAbility } from '../redux/ducks/GL/gamelist_ability';

import AbilitiesDirect from '../AbilitiesDirect';

const CallAbilitiesDirect = () => {

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

    const [ProcessedAbilities, setProcessedAbilities] = useState()
    const [ver, setver] = useState(jptoggledata == true ? "JP" : "GL")

    const jp_gamelist_ability = useSelector((state) =>
        state.jp_gamelist_ability.jp_gamelist_ability
    )

    const gl_gamelist_ability = useSelector((state) =>
        state.gl_gamelist_ability.gl_gamelist_ability
    )

    useEffect(() => {
        let mounted = true
        if (mounted && jptoggledata == true && jp_gamelist_ability == undefined) {
            setProcessedAbilities()
            dispatch(getJPGameListAbility())
            setver("JP")
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, jptoggledata, jp_gamelist_ability])

    useEffect(() => {
        let mounted = true
        if (mounted && jptoggledata != true && gl_gamelist_ability == undefined) {
            setProcessedAbilities()
            dispatch(getGLGameListAbility())
            setver("JP")
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, jptoggledata, gl_gamelist_ability])

    useEffect(() => {
        if (jptoggledata == true && jp_gamelist_ability != undefined) {
            setProcessedAbilities(jp_gamelist_ability)
            setver("JP")
        }
        if (jptoggledata != true && gl_gamelist_ability != undefined) {
            setProcessedAbilities(gl_gamelist_ability)
            setver("GL")
        }
    }, [dispatch, jptoggledata, gl_gamelist_ability, jp_gamelist_ability])

    return (
        ver != undefined &&
            ProcessedCharacters != undefined &&
            ProcessedAbilities != undefined &&

            master_index != undefined

            ?

            <AbilitiesDirect
                ProcessedAbilities={ProcessedAbilities}
                ProcessedCharacters={ProcessedCharacters}
                ver={ver}
                match={match}
                master_index={master_index}
            />

            :

            <Loading />
    )
}

export default CallAbilitiesDirect;