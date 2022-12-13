import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from '../redux/ducks/characters';
import { getJPToggle } from '../redux/ducks/jptoggle';
import CharacterDirect from '../characterpages/CharacterPageDirect';
import { getEventsIndex } from '../redux/ducks/eventsIndex';
import { getCharGuide } from '../redux/ducks/CharGuide';
import Loading from './_loading'
//direct

import { getMasterIndex } from '../redux/ducks/master_index';

import WardrobePassoff from '../passoff/WardrobeHandoff';
import ForceTimePassdoff from './CallFRTime';
import UltimaWeaponPassdoff from '../passoff/UltimaWeaponHandoff'

const CallCharDirect = ({
    loc
}) => {

    const match = {
        params: useParams()
    }

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


    const ProcessedCharacters = useSelector((state) =>
        state.characters.characters
    );

    const Access = useSelector((state) =>
        state.characters.access
    );

    const jptoggledata = useSelector((state) =>
        state.toggle.toggle
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedCharacters == undefined) {
            dispatch(getCharacters())
        }
        if (mounted) {
            dispatch(getJPToggle());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedCharacters]);

    const ProcessedEventsIndex = useSelector((state) =>
        state.eventsIndex.eventsIndex
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedEventsIndex == undefined) {
            dispatch(getEventsIndex());
        }

        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedEventsIndex]);

    const CharGuideData = useSelector((state) =>
        state.charGuide.charGuide
    );

    useEffect(() => {
        let mounted = true
        if (mounted && CharGuideData == undefined) {
            dispatch(getCharGuide());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, CharGuideData]);

    const filtered = ProcessedCharacters && ProcessedCharacters[Access[match.params.id]]

    return (
        jptoggledata != undefined &&
            ProcessedEventsIndex != undefined &&
            ProcessedCharacters != undefined &&
            Access != undefined &&
            CharGuideData != undefined &&
            master_index != undefined

            ?
            match.params.id == "wardrobe" ?
                <WardrobePassoff match={match} />
                :
                match.params.id == "ultimaweapon" ?
                    <UltimaWeaponPassdoff match={match} />
                    :
                    filtered == undefined ?
                        <Navigate replace to="/404" />
                        :
                        match.params.id == "forcetime" ?
                            <ForceTimePassdoff
                                match={match}
                                ProcessedCharacters={ProcessedCharacters}
                            />
                            :
                            loc == "passives" && match.params.type == undefined ?
                                <Navigate replace to={`/characters/${match.params.id}/passives/crystal${jptoggledata == true ? "?JP=true" : ""}`} />
                                :
                                <CharacterDirect
                                    loc={loc}

                                    filtered={filtered}
                                    match={match}
                                    jptoggledata={jptoggledata}
                                    Access={Access}
                                    ProcessedEventsIndex={ProcessedEventsIndex}
                                    ProcessedCharacters={ProcessedCharacters}
                                    selected_char={filtered}
                                    CharGuideData={CharGuideData}

                                    master_index={master_index}
                                />

            :

            <Loading />
    )
}

export default CallCharDirect;