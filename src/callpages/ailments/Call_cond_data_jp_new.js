import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import { getJPCondDataNew } from '../../redux/ducks/JP/cond_data_new';
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

    const cond_data_new_jp = useSelector((state) =>
        state.cond_data_new_jp.cond_data_new_jp
    );

    useEffect(() => {
        let mounted = true
        if (mounted && cond_data_new_jp == undefined) {
            dispatch(getJPCondDataNew());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, cond_data_new_jp]);

    return (
        master_index != undefined &&
            cond_data_new_jp != undefined ?
            <Categories
                master_index={master_index}
                cond_data={cond_data_new_jp}
                ver={"JP"}
                loc={"Ailments"}
                file={"condition_data"}
                newcompare={"new"}
            />
            :
            <Loading />
    )

}

export default Call_passive_ability;