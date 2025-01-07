import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import { getEnemyNames } from '../../redux/ducks/enemy_names'

import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const ver = "JP"

const file = "enemy_ability"
import { getJPEnemyAbilityNew } from '../../redux/ducks/JP/enemy_ability_new';
const newcompare = "new"
const loc = "Enemy Abilities"

const Call_enemy_ability_jp_new = () => {

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

    const enemy_ability_new_jp = useSelector((state) =>
        state.enemy_ability_new_jp.enemy_ability_new_jp
    );

    useEffect(() => {
        let mounted = true
        if (mounted && enemy_ability_new_jp == undefined) {
            dispatch(getJPEnemyAbilityNew());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, enemy_ability_new_jp])

    return (
        master_index != undefined &&
            enemy_names != undefined &&
            enemy_ability_new_jp != undefined

            ?

            <Categories
                master_index={master_index}
                enemy_names={enemy_names}
                enemy_ability={enemy_ability_new_jp}

                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare} />

            :

            <Loading />
    )
}
//file name change
export default Call_enemy_ability_jp_new