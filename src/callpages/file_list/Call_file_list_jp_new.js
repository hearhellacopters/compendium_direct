import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getJPFileListNew } from '../../redux/ducks/JP/file_list_new';
import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const Call_file_list = () => {

    const dispatch = useDispatch();

    const file_list_new_jp = useSelector((state) =>
        state.file_list_new_jp.file_list_new_jp
    );

    useEffect(() => {
        let mounted = true
        if (mounted && file_list_new_jp == undefined) {
            dispatch(getJPFileListNew());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, file_list_new_jp]);

    return (
        file_list_new_jp != undefined ?
            <Categories
                file_list={file_list_new_jp}
                ver={"JP"}
                loc={"File List"}
                file={"file_list"}
                newcompare={"new"}
            />
            :
            <Loading />
    )

}

export default Call_file_list;