import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUpdates } from '../redux/ducks/updates';
import { getJPToggle } from '../redux/ducks/jptoggle';
import Home from '../Home';
import Loading from './_loading'

const CallHomePage = () => {

    const dispatch = useDispatch();

    const ProcessedUpdates = useSelector((state) =>
        state.updates.updates
    );

    const jptoggledata = useSelector((state) =>
        state.toggle.toggle
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedUpdates == undefined) {
            dispatch(getUpdates());
        }
        if (mounted) {
            dispatch(getJPToggle());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedUpdates]);


    return (
        ProcessedUpdates != undefined && jptoggledata != undefined ?
            <Home ProcessedUpdates={ProcessedUpdates} jptoggledata={jptoggledata} />
            :
            <Loading />
    )

}

export default CallHomePage;