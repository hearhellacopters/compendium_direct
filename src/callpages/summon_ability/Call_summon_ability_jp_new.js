import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const ver = "JP"

const file = "summon_ability"
import { getJPSummonAbilityNew } from '../../redux/ducks/JP/summon_ability_new';
const newcompare = "new"
const loc = "Summon Abilities"

const Call_summon_ability_jp_new = () => {

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

    //file call here

    const summon_ability_new_jp = useSelector((state) =>
        state.summon_ability_new_jp.summon_ability_new_jp
    );

    useEffect(() => {
        let mounted = true
        if (mounted && summon_ability_new_jp == undefined) {
            dispatch(getJPSummonAbilityNew());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, summon_ability_new_jp])

    return (
        master_index != undefined &&

            summon_ability_new_jp != undefined

            ?

            <Categories
                master_index={master_index}

                summon_ability={summon_ability_new_jp}

                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare} />

            :

            <Loading />
    )
}
//file name change
export default Call_summon_ability_jp_new