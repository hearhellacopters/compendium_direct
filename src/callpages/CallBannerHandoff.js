import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getBanners } from '../redux/ducks/banners';
import BannerHandoff from '../handoff/BannerHandoff';
import Loading from '../components/Loading'

export default function CallBannerHandoff(){

    const match = {
        params: useParams()
    }

    const dispatch = useDispatch();

    const ProcessedBanners = useSelector((state) =>
        state.banners.banners
    );
    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedBanners == undefined) {
            dispatch(getBanners());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedBanners]);



    return (
        ProcessedBanners != undefined ?
            <BannerHandoff ProcessedBanners={ProcessedBanners} match={match} />
            :
            <Loading />
    )

}