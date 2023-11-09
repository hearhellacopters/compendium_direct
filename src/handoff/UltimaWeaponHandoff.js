import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import UltimaWeaponPageFormatting from '../UltimaWeapons';
import { Navigate } from 'react-router-dom';
import { getUltimaWeapon } from '../redux/ducks/ultimaweapon';
import Loading from '../components/Loading'
import { getQuery } from '../components/URLParams'

export default function UltimaWeaponHandoff({ match }){

    const dispatch = useDispatch();

    const UltimaWeapon = useSelector((state) =>
        state.ultimaweapon.ultimaweapon
    );

    useEffect(() => {
        let mounted = true
        if (mounted && UltimaWeapon == undefined) {
            dispatch(getUltimaWeapon());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, UltimaWeapon]);


    if (match.params.id == "ultimaweapon") {
        return (
            UltimaWeapon != undefined ?
                <UltimaWeaponPageFormatting ProcessedGear={UltimaWeapon} match={match} /> :
                <Loading />
        )
    } else {

        const { pathname } = window.location;
        const query = getQuery();
        const url = `${pathname}?${query.toString()}`;
        return (
            <Navigate replace to="/404" state={{loc:url}}/>
        )

    }
}