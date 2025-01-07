import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getGLFileListCompare } from '../../redux/ducks/GL/file_list_compare';
import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const Call_file_list = () => {

    const dispatch = useDispatch();

    const file_list_compare_gl = useSelector((state) =>
        state.file_list_compare_gl.file_list_compare_gl
    );

    useEffect(() => {
        let mounted = true
        if (mounted && file_list_compare_gl == undefined) {
            dispatch(getGLFileListCompare());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, file_list_compare_gl]);


    return (
        file_list_compare_gl != undefined ?
            <Categories
                file_list={file_list_compare_gl}
                ver={"GL"}
                loc={"File List"}
                file={"file_list"}
                newcompare={"compare"}
            />
            :
            <Loading />
    )

}

export default Call_file_list;