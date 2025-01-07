import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getGLFileListNew } from '../../redux/ducks/GL/file_list_new';
import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const Call_file_list = () => {

    const dispatch = useDispatch();

    const file_list_new_gl = useSelector((state) =>
        state.file_list_new_gl.file_list_new_gl
    );

    useEffect(() => {
        let mounted = true
        if (mounted && file_list_new_gl == undefined) {
            dispatch(getGLFileListNew());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, file_list_new_gl]);

    return (
        file_list_new_gl != undefined ?
            <Categories
                file_list={file_list_new_gl}
                ver={"GL"}
                loc={"File List"}
                file={"file_list"}
                newcompare={"new"}
            />
            :
            <Loading />
    )

}

export default Call_file_list;