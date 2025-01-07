import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import { getJPAilmentRankNew } from '../../redux/ducks/JP/ailment_rank_new';
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

    const ailment_rank_new_jp = useSelector((state) =>
        state.ailment_rank_new_jp.ailment_rank_new_jp
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ailment_rank_new_jp == undefined) {
            dispatch(getJPAilmentRankNew());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ailment_rank_new_jp])


    return (
        master_index != undefined &&
            ailment_rank_new_jp != undefined ?
            <Categories
                ailment_rank={ailment_rank_new_jp}
                master_index={master_index}
                ver={"JP"}
                loc={"Ailments"}
                file={"ailment_rank"}
                newcompare={"new"} />
            :
            <Loading />
    )

}

export default Call_ailment_data;