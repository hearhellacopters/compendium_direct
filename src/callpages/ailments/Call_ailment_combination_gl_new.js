import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import { getGLAilmentCombinationNew } from '../../redux/ducks/GL/ailment_combination_new';
import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const Call_ailment_combination = () => {

    const dispatch = useDispatch();


    const ailment_combination_new_gl = useSelector((state) =>
        state.ailment_combination_new_gl.ailment_combination_new_gl
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ailment_combination_new_gl == undefined) {
            dispatch(getGLAilmentCombinationNew());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ailment_combination_new_gl]);

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
        ailment_combination_new_gl != undefined &&
            master_index != undefined ?
            <Categories
                ailment_combination={ailment_combination_new_gl}
                master_index={master_index}
                ver={"GL"}
                loc={"Ailments"}
                file={"ailment_combination"}
                newcompare={"new"}
            />
            :
            <Loading />
    )

}

export default Call_ailment_combination;