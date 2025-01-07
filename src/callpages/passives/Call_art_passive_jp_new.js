import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import { getJPArtPassiveNew } from '../../redux/ducks/JP/art_passive_new';

import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const Call_art_passive = () => {

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

    const art_passive_new_jp = useSelector((state) =>
        state.art_passive_new_jp.art_passive_new_jp
    );

    useEffect(() => {
        let mounted = true
        if (mounted && art_passive_new_jp == undefined) {
            dispatch(getJPArtPassiveNew());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, art_passive_new_jp]);


    return (
        master_index != undefined &&
            art_passive_new_jp != undefined ?
            <Categories
                master_index={master_index}
                art_passive={art_passive_new_jp}
                ver={"JP"}
                loc={"Character Passives"}
                file={"art_passive"}
                newcompare={"new"}
            />
            :
            <Loading />
    )

}

export default Call_art_passive;