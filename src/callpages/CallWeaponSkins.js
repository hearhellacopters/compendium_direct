import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getWeaponSkins } from '../redux/ducks/weapon_skins';
import CharacterWeaponSkinsPage from '../characterpages/CharacterWeaponSkinsPage';
import Loading from './_loading'

const CallWeaponSkins = () => {

    const match = {
        params: useParams()
    }

    const dispatch = useDispatch();

    const WeaponSkins = useSelector((state) =>
        state.weapon_skins.weapon_skins
    );

    useEffect(() => {
        let mounted = true
        if (mounted && WeaponSkins == undefined) {
            dispatch(getWeaponSkins());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, WeaponSkins]);

    return (
        WeaponSkins != undefined ?
            <CharacterWeaponSkinsPage WeaponSkins={WeaponSkins} match={match} />
            :
            <Loading />
    )

}

export default CallWeaponSkins;