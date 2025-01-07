import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import { getAccess } from '../../redux/ducks/access'
import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const ver = "JP"

import { getJPGameListSphere } from '../../redux/ducks/JP/gamelist_sphere'

const JPGameListSphere = ({ match }) => {

    const dispatch = useDispatch();

    const jp_gamelist_sphere = useSelector((state) =>
        state.jp_gamelist_sphere.jp_gamelist_sphere
    );

    useEffect(() => {
        let mounted = true
        if (mounted && jp_gamelist_sphere == undefined) {
            dispatch(getJPGameListSphere());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, jp_gamelist_sphere])

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

            jp_gamelist_sphere != undefined

            ?

            <Categories
                master_index={master_index}

                Access={Access}

                gamelist_sphere={jp_gamelist_sphere}

                ver={ver}
                match={match}
                loc={"Game List"}
                file={"spheres"}
            />

            :

            <Loading />
    )
}
export default JPGameListSphere