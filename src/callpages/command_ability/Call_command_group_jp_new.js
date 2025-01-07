import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getMasterIndex } from '../../redux/ducks/master_index'
import Categories from '../../subs/Categories'
import Loading from '../../components/Loading'

const ver = "JP"
const file = "command_ability_group"
import { getJPCommandGroupNew } from '../../redux/ducks/JP/command_group_new';
const newcompare = "new"
const loc = "Character Abilities"

const Call_command_group_jp_new = () => {

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

    const command_group_new_jp = useSelector((state) =>
        state.command_group_new_jp.command_group_new_jp
    );

    useEffect(() => {
        let mounted = true
        if (mounted && command_group_new_jp == undefined) {
            dispatch(getJPCommandGroupNew());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, command_group_new_jp])


    return (
        command_group_new_jp != undefined &&
            master_index != undefined ?
            <Categories
                command_group={command_group_new_jp}
                master_index={master_index}
                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare} />
            :
            <Loading />
    )

}

export default Call_command_group_jp_new;