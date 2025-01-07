import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const ver = "JP"

const file = "command_ability"
import { getJPCommandAbilityNew } from '../../redux/ducks/JP/command_ability_new';
const newcompare = "new"
const loc = "Character Abilities"

const Call_command_ability_jp_new = () => {

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

    const command_ability_new_jp = useSelector((state) =>
        state.command_ability_new_jp.command_ability_new_jp
    );

    useEffect(() => {
        let mounted = true
        if (mounted && command_ability_new_jp == undefined) {
            dispatch(getJPCommandAbilityNew());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, command_ability_new_jp])

    return (
        master_index != undefined &&

            command_ability_new_jp != undefined

            ?

            <Categories
                master_index={master_index}

                command_ability={command_ability_new_jp}

                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare} />

            :

            <Loading />
    )
}
//file name change
export default Call_command_ability_jp_new