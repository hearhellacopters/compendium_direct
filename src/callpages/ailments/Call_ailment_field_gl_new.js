import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import { getGLAilmentFieldNew } from '../../redux/ducks/GL/ailment_field_new';
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

    const ailment_field_new_gl = useSelector((state) =>
        state.ailment_field_new_gl.ailment_field_new_gl
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ailment_field_new_gl == undefined) {
            dispatch(getGLAilmentFieldNew());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ailment_field_new_gl])

    return (
        master_index != undefined &&
            ailment_field_new_gl != undefined ?
            <Categories
                master_index={master_index}
                ailment_field={ailment_field_new_gl}
                ver={"GL"}
                loc={"Ailments"}
                file={"ailment_field"}
                newcompare={"new"}
            />
            :
            <Loading />
    )

}

export default Call_ailment_cast;