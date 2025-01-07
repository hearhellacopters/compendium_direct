import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import { getGLEquipmentPassiveAbilityCompare } from '../../redux/ducks/GL/equipment_passive_ability_compare';

import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const Call_equipment_passive_ability = () => {

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

    const equipment_passive_ability_compare_gl = useSelector((state) =>
        state.equipment_passive_ability_compare_gl.equipment_passive_ability_compare_gl
    );

    useEffect(() => {
        let mounted = true
        if (mounted && equipment_passive_ability_compare_gl == undefined) {
            dispatch(getGLEquipmentPassiveAbilityCompare());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, equipment_passive_ability_compare_gl]);

    return (
        master_index != undefined &&
            equipment_passive_ability_compare_gl != undefined ?
            <Categories
                master_index={master_index}
                equipment_passive_ability={equipment_passive_ability_compare_gl}
                ver={"GL"}
                loc={"Character Passives"}
                file={"equipment_passive_ability"}
                newcompare={"compare"}
            />
            :
            <Loading />
    )

}

export default Call_equipment_passive_ability;