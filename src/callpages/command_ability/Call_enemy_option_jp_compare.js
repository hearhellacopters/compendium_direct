import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import { getEnemyNames } from '../../redux/ducks/enemy_names'

import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const ver = "JP"

const file = "enemy_option"
import { getJPEnemyOptionCompare } from '../../redux/ducks/JP/enemy_option_compare';
const newcompare = "compare"
const loc = "Enemy Abilities"

const Call_enemy_option_jp_compare = () => {

    const dispatch = useDispatch();

    const enemy_names = useSelector((state) =>
        state.enemy_names.enemy_names
    );

    useEffect(() => {
        let mounted = true
        if (mounted && enemy_names == undefined) {
            dispatch(getEnemyNames());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, enemy_names]);

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

    //file call here

    const enemy_option_compare_jp = useSelector((state) =>
        state.enemy_option_compare_jp.enemy_option_compare_jp
    );

    useEffect(() => {
        let mounted = true
        if (mounted && enemy_option_compare_jp == undefined) {
            dispatch(getJPEnemyOptionCompare());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, enemy_option_compare_jp])


    return (
        master_index != undefined &&
            enemy_names != undefined &&

            enemy_option_compare_jp != undefined

            ?

            <Categories
                master_index={master_index}
                enemy_names={enemy_names}

                enemy_option={enemy_option_compare_jp}

                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare} />

            :

            <Loading />
    )
}
//file name change
export default Call_enemy_option_jp_compare