import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import { getJPAilmentCastNew } from '../../redux/ducks/JP/ailment_cast_new';
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

    const ailment_cast_new_jp = useSelector((state) =>
        state.ailment_cast_new_jp.ailment_cast_new_jp
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ailment_cast_new_jp == undefined) {
            dispatch(getJPAilmentCastNew());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ailment_cast_new_jp])

    return (
        master_index != undefined &&
            ailment_cast_new_jp != undefined ?
            <Categories
                master_index={master_index}
                ailment_cast={ailment_cast_new_jp}
                ver={"JP"}
                loc={"Ailments"}
                file={"ailment_cast"}
                newcompare={"new"}
            />
            :
            <Loading />
    )

}

export default Call_ailment_cast;