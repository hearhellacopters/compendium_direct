import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import { getGLAilmentDefaultCompare } from '../../redux/ducks/GL/ailment_default_compare';
import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const Call_ailment_default = () => {

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

    const ailment_default_compare_gl = useSelector((state) =>
        state.ailment_default_compare_gl.ailment_default_compare_gl
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ailment_default_compare_gl == undefined) {
            dispatch(getGLAilmentDefaultCompare());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ailment_default_compare_gl])

    return (
        master_index != undefined &&
            ailment_default_compare_gl != undefined ?
            <Categories
                master_index={master_index}
                ailment_default={ailment_default_compare_gl}
                ver={"GL"}
                loc={"Ailments"}
                file={"ailment_default"}
                newcompare={"compare"}
            />
            :
            <Loading />
    )

}

export default Call_ailment_default;