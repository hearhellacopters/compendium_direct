import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import { getAccess } from '../../redux/ducks/access'
import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const ver = "GL"

import { getGLGameListAbility } from '../../redux/ducks/GL/gamelist_ability'

const GLGameListAbility = ({ match }) => {

    const dispatch = useDispatch();

    const gl_gamelist_ability = useSelector((state) =>
        state.gl_gamelist_ability.gl_gamelist_ability
    );

    useEffect(() => {
        let mounted = true
        if (mounted && gl_gamelist_ability == undefined) {
            dispatch(getGLGameListAbility());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, gl_gamelist_ability])

    const Access = useSelector((state) =>
        state.access.access
    );

    useEffect(() => {
        let mounted = true
        if (mounted && Access == undefined) {
            dispatch(getAccess());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, Access])

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

    return (
        master_index != undefined &&

            Access != undefined &&

            gl_gamelist_ability != undefined

            ?

            <Categories
                master_index={master_index}

                Access={Access}

                gamelist_ability={gl_gamelist_ability}

                ver={ver}
                match={match}
                loc={"Game List"}
                file={"abilities"}
            />

            :

            <Loading />
    )
}
export default GLGameListAbility