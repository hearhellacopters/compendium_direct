import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import { getJPAilmentCombinationCompare } from '../../redux/ducks/JP/ailment_combination_compare';
import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const Call_ailment_combination = () => {

    const dispatch = useDispatch();

    const ailment_combination_compare_jp = useSelector((state) =>
        state.ailment_combination_compare_jp.ailment_combination_compare_jp
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ailment_combination_compare_jp == undefined) {
            dispatch(getJPAilmentCombinationCompare());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ailment_combination_compare_jp]);

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
        ailment_combination_compare_jp != undefined &&
            master_index != undefined ?
            <Categories
                ailment_combination={ailment_combination_compare_jp}
                master_index={master_index}
                ver={"JP"}
                loc={"Ailments"}
                file={"ailment_combination"}
                newcompare={"compare"}
            />
            :
            <Loading />
    )

}

export default Call_ailment_combination;