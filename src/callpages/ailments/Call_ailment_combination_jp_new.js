import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import { getJPAilmentCombinationNew } from '../../redux/ducks/JP/ailment_combination_new';
import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const Call_ailment_combination = () => {

    const dispatch = useDispatch();

    const ailment_combination_new_jp = useSelector((state) =>
        state.ailment_combination_new_jp.ailment_combination_new_jp
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ailment_combination_new_jp == undefined) {
            dispatch(getJPAilmentCombinationNew());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ailment_combination_new_jp]);

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
        ailment_combination_new_jp != undefined &&
            master_index != undefined ?
            <Categories
                ailment_combination={ailment_combination_new_jp}
                master_index={master_index}
                ver={"JP"}
                loc={"Ailments"}
                file={"ailment_combination"}
                newcompare={"new"}
            />
            :
            <Loading />
    )

}

export default Call_ailment_combination;