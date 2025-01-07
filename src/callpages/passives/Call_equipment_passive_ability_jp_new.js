import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getMasterIndex } from '../../redux/ducks/master_index'

import { getJPEquipmentPassiveAbilityNew } from '../../redux/ducks/JP/equipment_passive_ability_new';

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

    const equipment_passive_ability_new_jp = useSelector((state) =>
        state.equipment_passive_ability_new_jp.equipment_passive_ability_new_jp
    );

    useEffect(() => {
        let mounted = true
        if (mounted && equipment_passive_ability_new_jp == undefined) {
            dispatch(getJPEquipmentPassiveAbilityNew());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, equipment_passive_ability_new_jp]);

    return (
        master_index != undefined &&
            equipment_passive_ability_new_jp != undefined ?
            <Categories
                master_index={master_index}
                equipment_passive_ability={equipment_passive_ability_new_jp}
                ver={"JP"}
                loc={"Character Passives"}
                file={"equipment_passive_ability"}
                newcompare={"new"}
            />
            :
            <Loading />
    )

}

export default Call_equipment_passive_ability;