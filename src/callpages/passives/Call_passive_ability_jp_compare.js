import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import { getJPPassiveAbilityCompare } from '../../redux/ducks/JP/passive_ability_compare';

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

    const passive_ability_compare_jp = useSelector((state) =>
        state.passive_ability_compare_jp.passive_ability_compare_jp
    );

    useEffect(() => {
        let mounted = true
        if (mounted && passive_ability_compare_jp == undefined) {
            dispatch(getJPPassiveAbilityCompare());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, passive_ability_compare_jp]);

    return (
        master_index != undefined &&
            passive_ability_compare_jp != undefined ?
            <Categories
                master_index={master_index}
                passive_ability={passive_ability_compare_jp}
                ver={"JP"}
                loc={"Character Passives"}
                file={"passive_ability"}
                newcompare={"compare"}
            />
            :
            <Loading />
    )

}

export default Call_passive_ability;