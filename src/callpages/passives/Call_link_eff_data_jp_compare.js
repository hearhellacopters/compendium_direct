import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import { getJPLinkEffDataCompare } from '../../redux/ducks/JP/link_eff_data_compare';

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

    const link_effect_data_compare_jp = useSelector((state) =>
        state.link_effect_data_compare_jp.link_effect_data_compare_jp
    );

    useEffect(() => {
        let mounted = true
        if (mounted && link_effect_data_compare_jp == undefined) {
            dispatch(getJPLinkEffDataCompare());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, link_effect_data_compare_jp]);

    return (
        master_index != undefined &&
            link_effect_data_compare_jp != undefined ?
            <Categories
                master_index={master_index}
                link_eff_data={link_effect_data_compare_jp}
                ver={"JP"}
                loc={"Character Passives"}
                file={"link_eff_data"}
                newcompare={"compare"}
            />
            :
            <Loading />
    )

}

export default Call_link_effect_data;