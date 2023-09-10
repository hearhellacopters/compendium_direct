import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from '../redux/ducks/characters';
import { getJPToggle } from '../redux/ducks/jptoggle';
import { getTalkIndex } from '../redux/ducks/talk_index.js';
import { getTalk } from '../redux/ducks/talk.js';

import Story from '../Story';
import Loading from '../components/Loading'

export default function CallStory(){
    const dispatch = useDispatch();

    const ProcessedCharacters = useSelector((state) =>
        state.characters.characters
    );

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
        if (mounted && ProcessedCharacters == undefined) {
            dispatch(getCharacters());
        }
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
    }, [dispatch, ProcessedCharacters, talk_index, talk]);

    return (
            ProcessedCharacters != undefined &&
            talk != undefined &&
            talk_index != undefined?
            <Story
                ver={jptoggledata == true ? "JP":"GL"}
                ProcessedCharacters={ProcessedCharacters}
                talk={talk}
                talk_index={talk_index}
            />
            :
            <Loading />
    )
}