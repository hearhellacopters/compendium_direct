import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import UltimaWeaponFormatting from '../characterpages/UltimaPageFormatting';
import { Navigate } from 'react-router-dom';
import { getUltimaWeapon } from '../redux/ducks/ultimaweapon';
import Loading from '../callpages/_loading'

const UTWeaponPassoff = ({ match }) => {

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
                <UltimaWeaponFormatting ProcessedGear={UltimaWeapon} match={match} /> :
                <Loading />
        )
    } else {
        return (
            <Navigate replace to="/404" />
        )

    }
}
export default UTWeaponPassoff