import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import { getJPAilmentModifyNew } from '../../redux/ducks/JP/ailment_modify_new';

import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const Call_ailment_modify = () => {

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

    const ailment_modify_new_jp = useSelector((state) =>
        state.ailment_modify_new_jp.ailment_modify_new_jp
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ailment_modify_new_jp == undefined) {
            dispatch(getJPAilmentModifyNew());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ailment_modify_new_jp]);

    return (
        ailment_modify_new_jp != undefined &&
            master_index != undefined ?
            <Categories
                ailment_modify={ailment_modify_new_jp}
                master_index={master_index}
                ver={"JP"}
                loc={"Ailments"}
                file={"ailment_modify"}
                newcompare={"new"}
            />
            :
            <Loading />
    )

}

export default Call_ailment_modify;