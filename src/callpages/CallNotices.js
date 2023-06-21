import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getNotices } from '../redux/ducks/notices';
import { getJPToggle } from '../redux/ducks/jptoggle';
import Notices from '../Notices';
import Loading from '../components/Loading'

export default function CallNotices(){

    const dispatch = useDispatch();

    const ProcessedNotices = useSelector((state) =>
        state.notices.notices
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedNotices == undefined) {
            dispatch(getNotices());
        }
        if (mounted) {
            dispatch(getJPToggle());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedNotices]);

    const jptoggledata = useSelector((state) =>
        state.toggle.toggle
    );

    return (
        ProcessedNotices != undefined && jptoggledata != undefined ?
            <Notices ProcessedNotices={ProcessedNotices[jptoggledata==true?"JP":"GL"]} jptoggledata={jptoggledata} />
            :
            <Loading />
    )

}