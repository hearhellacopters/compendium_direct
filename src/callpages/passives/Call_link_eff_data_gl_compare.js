import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import { getGLLinkEffDataCompare } from '../../redux/ducks/GL/link_eff_data_compare';

import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const Call_link_effect_data = () => {

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

    const link_effect_data_compare_gl = useSelector((state) =>
        state.link_effect_data_compare_gl.link_effect_data_compare_gl
    );

    useEffect(() => {
        let mounted = true
        if (mounted && link_effect_data_compare_gl == undefined) {
            dispatch(getGLLinkEffDataCompare());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, link_effect_data_compare_gl]);

    return (
        master_index != undefined &&
            link_effect_data_compare_gl != undefined ?
            <Categories
                master_index={master_index}
                link_eff_data={link_effect_data_compare_gl}
                ver={"GL"}
                loc={"Character Passives"}
                file={"link_eff_data"}
                newcompare={"compare"}
            />
            :
            <Loading />
    )

}

export default Call_link_effect_data;