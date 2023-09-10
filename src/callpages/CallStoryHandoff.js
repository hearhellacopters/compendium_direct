import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getJPToggle } from '../redux/ducks/jptoggle';
import { getTalkIndex } from '../redux/ducks/talk_index.js';
import { getTalk } from '../redux/ducks/talk.js';

import StoryHandoff from '../handoff/StoryHandoff';
import Loading from '../components/Loading'

export default function CallStory(){

    const match = {
        params: useParams()
    }

    const dispatch = useDispatch();

    const jptoggledata = useSelector((state) =>
        state.toggle.toggle
    );

    const talk_index = useSelector((state) =>
        state.talk_index.talk_index
    );

    const talk = useSelector((state) =>
        state.talk.talk
    );

    useEffect(() => {
        let mounted = true
        if (mounted && talk_index == undefined) {
            dispatch(getTalkIndex());
        }
        if (mounted && talk == undefined) {
            dispatch(getTalk());
        }
        if (mounted) {
            dispatch(getJPToggle());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, talk_index, talk]);

    return (
            talk != undefined &&
            talk_index != undefined?
            <StoryHandoff
                ver={jptoggledata == true ? "JP":"GL"}
                match={match}
                talk={talk}
                talk_index={talk_index}
            />
            :
            <Loading />
    )
}