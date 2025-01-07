import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const ver = "GL"

const file = "command_ability"
import { getGLCommandAbilityNew } from '../../redux/ducks/GL/command_ability_new';
const newcompare = "new"
const loc = "Character Abilities"

const Call_command_ability_gl_new = () => {

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

    const command_ability_new_gl = useSelector((state) =>
        state.command_ability_new_gl.command_ability_new_gl
    );

    useEffect(() => {
        let mounted = true
        if (mounted && command_ability_new_gl == undefined) {
            dispatch(getGLCommandAbilityNew());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, command_ability_new_gl])

    return (
        master_index != undefined &&

            command_ability_new_gl != undefined

            ?

            <Categories
                master_index={master_index}

                command_ability={command_ability_new_gl}

                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare} />

            :

            <Loading />
    )
}
//file name change
export default Call_command_ability_gl_new