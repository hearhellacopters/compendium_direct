import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getCrystalPassives } from '../redux/ducks/crystalpassives';
import { getCrystalAbilities } from '../redux/ducks/crystalabilities';
import { getJPToggle } from '../redux/ducks/jptoggle';
import CrystalPassivesPage from '../CrystalPassives';
import CrystalAbilityPage from '../CrystalAbility';

import { getMasterIndex } from '../redux/ducks/master_index';

export default function CallCrystalBrilliance(){

    const match = {
        params: useParams()
    }

    const jptoggledata = useSelector((state) =>
        state.toggle.toggle
    );

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


    const crystalpassives = useSelector((state) =>
        state.crystalpassives.crystalpassives
    );

    useEffect(() => {
        let mounted = true
        if (mounted && crystalpassives == undefined) {
            dispatch(getCrystalPassives());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, crystalpassives])

    const crystalabilities = useSelector((state) =>
        state.crystalabilities.crystalabilities
    );

    useEffect(() => {
        let mounted = true
        if (mounted && crystalabilities == undefined) {
            dispatch(getCrystalAbilities());
        }
        if (mounted) {
            dispatch(getJPToggle());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, crystalabilities]);

    return (
        jptoggledata != undefined &&
            crystalpassives != undefined &&
            crystalabilities != undefined &&
            master_index != undefined
            ?
            match.params.type == "passives" ?
            <CrystalPassivesPage
                jptoggledata={jptoggledata}
                crystalpassives={crystalpassives}
                match={match}
                master_index={master_index}
            />
            :
            <CrystalAbilityPage
                jptoggledata={jptoggledata}
                crystalabilities={Object.values(crystalabilities)}
                match={match}
                master_index={master_index}
            />
            :
            <div className=""><h1><img className="loadingbardots" src={"https://dissidiacompendium.com/images/static/site/loading.gif"}></img></h1></div>
    )

}