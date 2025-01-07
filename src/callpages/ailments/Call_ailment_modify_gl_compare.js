import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import { getGLAilmentModifyCompare } from '../../redux/ducks/GL/ailment_modify_compare';

import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const Call_ailment_modify = () => {

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

    const ailment_modify_compare_gl = useSelector((state) =>
        state.ailment_modify_compare_gl.ailment_modify_compare_gl
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ailment_modify_compare_gl == undefined) {
            dispatch(getGLAilmentModifyCompare());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ailment_modify_compare_gl]);


    return (
        ailment_modify_compare_gl != undefined &&
            master_index != undefined ?
            <Categories
                ailment_modify={ailment_modify_compare_gl}
                master_index={master_index}
                ver={"GL"}
                loc={"Ailments"}
                file={"ailment_modify"}
                newcompare={"compare"} />
            :
            <Loading />
    )

}

export default Call_ailment_modify;