import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const ver = "GL"

const file = "character_option"
import { getGLCharacterOptionNew } from '../../redux/ducks/GL/character_option_new';
const newcompare = "new"
const loc = "Character Abilities"

const Call_character_option_gl_new = () => {

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

    const character_option_new_gl = useSelector((state) =>
        state.character_option_new_gl.character_option_new_gl
    );

    useEffect(() => {
        let mounted = true
        if (mounted && character_option_new_gl == undefined) {
            dispatch(getGLCharacterOptionNew());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, character_option_new_gl])

    return (
        master_index != undefined &&

            character_option_new_gl != undefined

            ?

            <Categories
                master_index={master_index}

                character_option={character_option_new_gl}

                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare} />

            :

            <Loading />
    )
}
//file name change
export default Call_character_option_gl_new