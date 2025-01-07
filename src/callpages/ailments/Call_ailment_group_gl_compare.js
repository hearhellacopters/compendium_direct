import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getGLAilmentGroupCompare } from '../../redux/ducks/GL/ailment_group_compare';

import { getMasterIndex } from '../../redux/ducks/master_index'

import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const Call_ailment_data = () => {

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


    const ailment_group_compare_gl = useSelector((state) =>
        state.ailment_group_compare_gl.ailment_group_compare_gl
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ailment_group_compare_gl == undefined) {
            dispatch(getGLAilmentGroupCompare());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ailment_group_compare_gl])


    return (
        ailment_group_compare_gl != undefined &&
            master_index != undefined ?
            <Categories
                master_index={master_index}
                ailment_group={ailment_group_compare_gl}
                ver={"GL"}
                loc={"Ailments"}
                file={"ailment_group"}
                newcompare={"compare"}
            />
            :
            <Loading />
    )

}

export default Call_ailment_data;