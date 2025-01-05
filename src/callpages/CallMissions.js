import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getJPToggle } from '../redux/ducks/jptoggle.js';
import Missions from '../Missions.js';
import Loading from '../components/Loading.js'

export default function CallMissions(){

    const dispatch = useDispatch();

    const jptoggledata = useSelector((state) =>
        state.toggle.toggle
    );

    useEffect(() => {
        let mounted = true
        if (mounted) {
            dispatch(getJPToggle());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch]);

    return (
        jptoggledata != undefined ?
            <Missions jptoggledata={jptoggledata} />
            :
            <Loading />
    )

}