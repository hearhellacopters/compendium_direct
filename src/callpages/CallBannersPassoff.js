import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getBanners } from '../redux/ducks/banners';
import BannerPermaLinks from '../passoff/BannerPermaLinks';
import Loading from './_loading'

const CallsingleBannersPage = () => {

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
            <BannerPermaLinks ProcessedBanners={ProcessedBanners} match={match} />
            :
            <Loading />
    )

}

export default CallsingleBannersPage;