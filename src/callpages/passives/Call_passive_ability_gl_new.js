import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import { getGLPassiveAbilityNew } from '../../redux/ducks/GL/passive_ability_new';

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

    const passive_ability_new_gl = useSelector((state) =>
        state.passive_ability_new_gl.passive_ability_new_gl
    );

    useEffect(() => {
        let mounted = true
        if (mounted && passive_ability_new_gl == undefined) {
            dispatch(getGLPassiveAbilityNew());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, passive_ability_new_gl]);

    return (
        master_index != undefined &&
            passive_ability_new_gl != undefined ?
            <Categories
                master_index={master_index}
                passive_ability={passive_ability_new_gl}
                ver={"GL"}
                loc={"Character Passives"}
                file={"passive_ability"}
                newcompare={"new"}
            />
            :
            <Loading />
    )

}

export default Call_passive_ability;