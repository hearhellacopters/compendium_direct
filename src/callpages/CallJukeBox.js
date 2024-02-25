import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getJukeBox } from '../redux/ducks/jukebox';
import { getPlaying } from '../redux/ducks/playing';
import { getPlayVolume } from '../redux/ducks/playvolume';
import { getPlayIndex } from '../redux/ducks/playindex';
import { getMusicKey } from '../redux/ducks/playindex';
import { getPlayList } from '../redux/ducks/playlist'
import JukeBox from '../JukeBox'
import Loading from '../components/Loading'

export default function CallJukeBoxPage(){

    const dispatch = useDispatch();

    const ProcessedMusic = useSelector((state) =>
        state.jukebox.jukebox
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedMusic == undefined) {
            dispatch(getJukeBox());
        }
        if (mounted) {
            dispatch(getPlaying());
        }
        if (mounted) {
            dispatch(getPlayVolume());
        }
        if (mounted) {
            dispatch(getPlayIndex());
        }
        if (mounted) {
            dispatch(getPlayList());
        }
        if (mounted) {
            dispatch(getMusicKey());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, ProcessedMusic]);

    const playing = useSelector((state) =>
        state.playing.playing
    );

    const volume = useSelector((state) =>
        state.volume.volume
    );

    const playindex = useSelector((state) =>
        state.playindex.playindex
    );

    const musickey = useSelector((state) =>
        state.playindex.musickey
    );

    const playlist = useSelector((state) =>
        state.playlist.playlist
    );

    function isIterable(value) {
        return Symbol.iterator in Object(value);
    }

    const rawData = isIterable(ProcessedMusic) && ProcessedMusic.map(music => (
        {
            MusicKey: music.MusicKey,
            musicSrc: `https://dissidiacompendium.com/mus//${music.URL}/${music.File}`,
            name: music.Label,
            cover: "https://dissidiacompendium.com/images/static/site/logo512.png",
            singer: music.FFTitle
        }
    )).reverse()

    return (
        rawData != false && playing != undefined && volume != undefined && ProcessedMusic != undefined && playlist != undefined ?
            <JukeBox ProcessedMusic={rawData} playing={playing} volume={volume} playindex={playindex} playlist={playlist} musickey={musickey} />
            :
            <Loading />
    )

}