import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getJPAilmentGroupNew } from '../../redux/ducks/JP/ailment_group_new';
import { getMasterIndex } from '../../redux/ducks/master_index'
import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const Call_ailment_data = () => {

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

    const ailment_group_new_jp = useSelector((state) =>
        state.ailment_group_new_jp.ailment_group_new_jp
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ailment_group_new_jp == undefined) {
            dispatch(getJPAilmentGroupNew());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ailment_group_new_jp])


    return (
        ailment_group_new_jp != undefined &&
            master_index != undefined ?
            <Categories
                master_index={master_index}
                ailment_group={ailment_group_new_jp}
                ver={"JP"}
                loc={"Ailments"}
                file={"ailment_group"}
                newcompare={"new"}
            />
            :
            <Loading />
    )

}

export default Call_ailment_data;