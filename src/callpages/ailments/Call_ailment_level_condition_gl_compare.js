import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const ver = "GL"
const file = "ailment_level_condition"
import { getGLAilmentLevelContCompare } from '../../redux/ducks/GL/ailment_level_condition_compare';
const newcompare = "compare"
const loc = "Ailments"

const Call_ailment_level_condition_gl_compare = () => {

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

    const ailment_level_condition_compare_gl = useSelector((state) =>
        state.ailment_level_condition_compare_gl.ailment_level_condition_compare_gl
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ailment_level_condition_compare_gl == undefined) {
            dispatch(getGLAilmentLevelContCompare());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ailment_level_condition_compare_gl])

    return (
        master_index != undefined &&
            ailment_level_condition_compare_gl != undefined

            ?

            <Categories
                master_index={master_index}
                ailment_level_condition={ailment_level_condition_compare_gl}
                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare} />

            :

            <Loading />
    )
}
//file name change
export default Call_ailment_level_condition_gl_compare