import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import { getGLAilmentCastNew } from '../../redux/ducks/GL/ailment_cast_new';
import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const Call_ailment_cast = () => {

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

    const ailment_cast_new_gl = useSelector((state) =>
        state.ailment_cast_new_gl.ailment_cast_new_gl
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ailment_cast_new_gl == undefined) {
            dispatch(getGLAilmentCastNew());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ailment_cast_new_gl])

    return (
        ailment_cast_new_gl != undefined &&
            master_index != undefined ?
            <Categories
                master_index={master_index}
                ailment_cast={ailment_cast_new_gl}
                ver={"GL"}
                loc={"Ailments"}
                file={"ailment_cast"}
                newcompare={"new"} />
            :
            <Loading />
    )

}

export default Call_ailment_cast;