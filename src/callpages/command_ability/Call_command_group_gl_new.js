import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getMasterIndex } from '../../redux/ducks/master_index'
import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const ver = "GL"
const file = "command_ability_group"
import { getGLCommandGroupNew } from '../../redux/ducks/GL/command_group_new';
const newcompare = "new"
const loc = "Character Abilities"

const Call_command_group_gl_new = () => {

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


    const command_group_new_gl = useSelector((state) =>
        state.command_group_new_gl.command_group_new_gl
    );

    useEffect(() => {
        let mounted = true
        if (mounted && command_group_new_gl == undefined) {
            dispatch(getGLCommandGroupNew());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, command_group_new_gl])


    return (
        command_group_new_gl != undefined &&
            master_index != undefined ?
            <Categories
                command_group={command_group_new_gl}
                master_index={master_index}
                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare} />
            :
            <Loading />
    )

}

export default Call_command_group_gl_new;