import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import { getGLAilmentRankCompare } from '../../redux/ducks/GL/ailment_rank_compare';
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

    const ailment_rank_compare_gl = useSelector((state) =>
        state.ailment_rank_compare_gl.ailment_rank_compare_gl
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ailment_rank_compare_gl == undefined) {
            dispatch(getGLAilmentRankCompare());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ailment_rank_compare_gl])


    return (
        master_index != undefined &&
            ailment_rank_compare_gl != undefined ?
            <Categories
                ailment_rank={ailment_rank_compare_gl}
                master_index={master_index}
                ver={"GL"}
                loc={"Ailments"}
                file={"ailment_rank"}
                newcompare={"compare"}
            />
            :
            <Loading />
    )

}

export default Call_ailment_data;