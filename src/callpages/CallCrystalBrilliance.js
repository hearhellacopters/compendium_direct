import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getCrystalPassives } from '../redux/ducks/crystalpassives';
import { getJPToggle } from '../redux/ducks/jptoggle';
import CrystalPassivesPage from '../characterpages/CrystalPassivesPage';
import Loading from './_loading'

import { getMasterIndex } from '../redux/ducks/master_index';

const CallCrystalPassives = () => {

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


    const crystalpassives = useSelector((state) =>
        state.crystalpassives.crystalpassives
    );

    const jptoggledata = useSelector((state) =>
        state.toggle.toggle
    );

    useEffect(() => {
        let mounted = true
        if (mounted && crystalpassives == undefined) {
            dispatch(getCrystalPassives());
        }
        if (mounted) {
            dispatch(getJPToggle());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, crystalpassives]);

    return (

        jptoggledata != undefined &&

            crystalpassives != undefined &&

            master_index != undefined

            ?

            <CrystalPassivesPage
                jptoggledata={jptoggledata}

                crystalpassives={crystalpassives}
                match={match}

                master_index={master_index}

            />
            :
            <Loading />
    )

}

export default CallCrystalPassives;