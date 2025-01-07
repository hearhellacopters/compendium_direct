import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const ver = "JP"

const file = "character_option"
import { getJPCharacterOptionCompare } from '../../redux/ducks/JP/character_option_compare';
const newcompare = "compare"
const loc = "Character Abilities"

const Call_character_option_jp_compare = () => {

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

    const character_option_compare_jp = useSelector((state) =>
        state.character_option_compare_jp.character_option_compare_jp
    );

    useEffect(() => {
        let mounted = true
        if (mounted && character_option_compare_jp == undefined) {
            dispatch(getJPCharacterOptionCompare());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, character_option_compare_jp])


    return (
        master_index != undefined &&

            character_option_compare_jp != undefined

            ?

            <Categories
                master_index={master_index}

                character_option={character_option_compare_jp}

                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare} />

            :

            <Loading />
    )
}
//file name change
export default Call_character_option_jp_compare