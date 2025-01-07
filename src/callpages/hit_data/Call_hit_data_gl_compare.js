import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const ver = "GL"

const file = "ability_hit_data"
import { getGLHitDataCompare } from '../../redux/ducks/GL/hit_data_compare';
const newcompare = "compare"
const loc = "Character Abilities"

const Call_ability_hit_data_gl_compare = () => {

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

    //file call here

    const hit_data_compare_gl = useSelector((state) =>
        state.hit_data_compare_gl.hit_data_compare_gl
    );

    useEffect(() => {
        let mounted = true
        if (mounted && hit_data_compare_gl == undefined) {
            dispatch(getGLHitDataCompare());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, hit_data_compare_gl])

    return (
        master_index != undefined &&

            hit_data_compare_gl != undefined

            ?

            <Categories
                master_index={master_index}

                hit_data={hit_data_compare_gl}

                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare} />

            :

            <Loading />
    )
}
//file name change
export default Call_ability_hit_data_gl_compare