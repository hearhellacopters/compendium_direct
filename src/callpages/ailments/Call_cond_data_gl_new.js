import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import { getGLCondDataNew } from '../../redux/ducks/GL/cond_data_new';
import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const Call_passive_ability = () => {

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

    const cond_data_new_gl = useSelector((state) =>
        state.cond_data_new_gl.cond_data_new_gl
    );

    useEffect(() => {
        let mounted = true
        if (mounted && cond_data_new_gl == undefined) {
            dispatch(getGLCondDataNew());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, cond_data_new_gl]);



    return (
        master_index != undefined &&
            cond_data_new_gl != undefined ?
            <Categories
                master_index={master_index}
                cond_data={cond_data_new_gl}
                ver={"GL"}
                loc={"Ailments"}
                file={"condition_data"}
                newcompare={"new"}
            />
            :
            <Loading />
    )

}

export default Call_passive_ability;