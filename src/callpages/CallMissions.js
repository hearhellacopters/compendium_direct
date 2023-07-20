import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getJPToggle } from '../redux/ducks/jptoggle';
import Missions from '../Missions';
import Loading from '../components/Loading'

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