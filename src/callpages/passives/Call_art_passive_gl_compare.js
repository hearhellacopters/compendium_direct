import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import { getGLArtPassiveCompare } from '../../redux/ducks/GL/art_passive_compare';

import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const Call_art_passive = () => {

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

    const art_passive_compare_gl = useSelector((state) =>
        state.art_passive_compare_gl.art_passive_compare_gl
    );

    useEffect(() => {
        let mounted = true
        if (mounted && art_passive_compare_gl == undefined) {
            dispatch(getGLArtPassiveCompare());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, art_passive_compare_gl]);


    return (
        master_index != undefined &&
            art_passive_compare_gl != undefined ?
            <Categories
                master_index={master_index}
                art_passive={art_passive_compare_gl}
                ver={"GL"}
                loc={"Character Passives"}
                file={"art_passive"}
                newcompare={"compare"}
            />
            :
            <Loading />
    )

}

export default Call_art_passive;