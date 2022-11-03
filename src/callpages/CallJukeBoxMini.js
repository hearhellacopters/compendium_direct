import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getJukeBox } from '../redux/ducks/jukebox';
import { getPlaying } from '../redux/ducks/playing';
import { getPlayIndex } from '../redux/ducks/playindex';
import { getPlayVolume } from '../redux/ducks/playvolume';
import { getPlayList } from '../redux/ducks/playlist';
import { setPlayList } from '../redux/ducks/playlist';
import { setList1 } from '../redux/ducks/playlist';
import { setList2 } from '../redux/ducks/playlist';
import { setList3 } from '../redux/ducks/playlist';
import { getUpdate } from '../redux/ducks/playlist';
import { getTrackUpdate } from '../redux/ducks/playlist';
import JukeBoxMini from '../JukeBoxMini'
import { getList1 } from '../redux/ducks/playlist';
import { getList2 } from '../redux/ducks/playlist';
import { getList3 } from '../redux/ducks/playlist';
import { getRemove } from '../redux/ducks/playlist';

import { getMusicKey } from '../redux/ducks/playindex'


const CallJukeBoxPage = () =>{
    
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
        dispatch(getPlayIndex());
        }
        if (mounted) {
        dispatch(getPlayVolume());
        }
        if (mounted) {
        dispatch(getPlayList());
        }
        if (mounted) {
        dispatch(getMusicKey());
        }
        if (mounted) {
        dispatch(getUpdate());
        }
        if (mounted) {
        dispatch(getTrackUpdate());
        }
        if (mounted) {
        dispatch(getList1());
        }
        if (mounted) {
        dispatch(getList2());
        }
        if (mounted) {
        dispatch(getList3());
        }
        if (mounted) {
          dispatch(getRemove());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,ProcessedMusic]);


    const playing = useSelector((state) => 
    state.playing.playing
    );

    const musickey = useSelector((state) => 
    state.playindex.musickey
    );

    const volume = useSelector((state) => 
    state.volume.volume
    );

    const playlist = useSelector((state) => 
    state.playlist.playlist
    );

    const list1 = useSelector((state) => 
    state.playlist.list1
    );

    const list2 = useSelector((state) => 
    state.playlist.list2
    );

    const list3 = useSelector((state) => 
    state.playlist.list3
    );

    const getupdate = useSelector((state) => 
    state.playlist.update
    );

    const add_track = useSelector((state) => 
    state.playlist.add_track
    );

    function isIterable (value) {
        return Symbol.iterator in Object(value);
      }

    const rawData = isIterable(ProcessedMusic) && ProcessedMusic.map(music => (
        {
          MusicKey: music.MusicKey, 
          musicSrc: `https://cdn.discordapp.com/attachments/658884508493414420/${music.URL}/${music.File}`, 
          name: music.Label, 
          cover: "https://dissidiacompendium.com/images/static/site/logo512.png",
          singer: music.FFTitle 
        }
        )).reverse()

    useEffect(()=>{
        if (typeof(Storage) !== "undefined") {
          // create
          if(window.localStorage.getItem("list1") == null){
            window.localStorage.setItem('list1', "[]")
          }
          if(window.localStorage.getItem("list2") == null){
            window.localStorage.setItem('list2', "[]")
          }
          if(window.localStorage.getItem("list3") == null){
            window.localStorage.setItem('list3', "[]")
          }
          if(window.localStorage.getItem("currentList") == null){
            window.localStorage.setItem('currentList', "master")
          }
          } else {
          // No web storage Support.
    
        }
        // eslint-disable-next-line
      },[])

      useEffect(()=>{
          if(playlist == undefined){
              const getlist = window.localStorage.getItem("currentList")
              if(getlist == null){
                window.localStorage.setItem('currentList', "master")
                dispatch(setPlayList("master"));
                const pull_list1 = window.localStorage.getItem("list1")
                dispatch(setList1(JSON.parse(pull_list1)));
                const pull_list2 = window.localStorage.getItem("list2")
                dispatch(setList2(JSON.parse(pull_list2)));
                const pull_list3 = window.localStorage.getItem("list3")
                dispatch(setList3(JSON.parse(pull_list3)));
              } else {
                dispatch(setPlayList(getlist));
                const pull_list1 = window.localStorage.getItem("list1")
                dispatch(setList1(JSON.parse(pull_list1)));
                const pull_list2 = window.localStorage.getItem("list2")
                dispatch(setList2(JSON.parse(pull_list2)));
                const pull_list3 = window.localStorage.getItem("list3")
                dispatch(setList3(JSON.parse(pull_list3)));
              }
          }
          // eslint-disable-next-line
      },[])


    return (
        rawData != false && playing != undefined && volume != undefined && ProcessedMusic != undefined && playlist != undefined && list1 != undefined && list2 != undefined && list3 != undefined?
        <JukeBoxMini ProcessedMusic={rawData} playing={playing} getupdate={getupdate} add_track={add_track} volume={volume} playlist={playlist} list1={list1} list2={list2} list3={list3} musickey={musickey}/>
        : 
        ""
    )

}

export default CallJukeBoxPage;