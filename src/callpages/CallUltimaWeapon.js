import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getUltimaWeapon } from '../redux/ducks/ultimaweapon';
import { getJPToggle } from '../redux/ducks/jptoggle';
import UltimaWeaponPageFormatting from '../UltimaWeapons';
import Loading from '../components/Loading'

import { getMasterIndex } from '../redux/ducks/master_index';

export default function CallUltimaWeapon(){

    const match = {
        params: useParams()
    }

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


    const UltimaWeapon = useSelector((state) =>
        state.ultimaweapon.ultimaweapon
    );

    const jptoggledata = useSelector((state) =>
        state.toggle.toggle
    );

    useEffect(() => {
        let mounted = true
        if (mounted && UltimaWeapon == undefined) {
            dispatch(getUltimaWeapon());
        }
        if (mounted) {
            dispatch(getJPToggle());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, UltimaWeapon]);

    return (

        jptoggledata != undefined &&

            UltimaWeapon != undefined &&

            master_index != undefined

            ?

            <UltimaWeaponPageFormatting
                jptoggledata={jptoggledata}

                ProcessedGear={UltimaWeapon}
                match={match}

                master_index={master_index}

            />
            :
            <Loading />
    )

}