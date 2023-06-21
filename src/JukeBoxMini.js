import React, { useState, useEffect, useRef } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import ReactJkMusicPlayer from 'react-jinke-music-player'
import { setPlaying } from './redux/ducks/playing'
import { setPlayList } from './redux/ducks/playlist'
import { setMusicKey } from './redux/ducks/playindex'
import { setPlayIndex } from './redux/ducks/playindex'
import { getPlayIndex } from './redux/ducks/playindex'

import { getList1 } from './redux/ducks/playlist';
import { getList2 } from './redux/ducks/playlist';
import { getList3 } from './redux/ducks/playlist';

import { setUpdate } from './redux/ducks/playlist';
import { setRemove } from './redux/ducks/playlist';

import { setFullList } from './redux/ducks/playlist';
import { getFullList } from './redux/ducks/playlist';

import { setPlayVolume } from './redux/ducks/playvolume'

import { useDispatch, useSelector } from "react-redux";

import Select from 'react-select';

import './JukeBoxStyle.css'

export default function JukeBoxMini({ 
  ProcessedMusic, 
  playing, 
  volume, 
  playlist, 
  list1, 
  list2, 
  list3, 
  musickey, 
  getupdate, 
  add_track 
}){

  function isTouchDevice() {
    return (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0) ||
       (navigator.msMaxTouchPoints > 0));
  }

  const dispatch = useDispatch();
  const [masterlist, setmasterlist] = useStateIfMounted(ProcessedMusic)

  useEffect(() => {
    let mounted = true
    if (mounted) {
      dispatch(setFullList(ProcessedMusic));
      setmasterlist(ProcessedMusic)
    }
    return function cleanup() {
      mounted = false
    }
    // eslint-disable-next-line
  }, [ProcessedMusic])

  const full_list = useSelector((state) =>
    state.playlist.full_list
  );

  const playindex = useSelector((state) =>
    state.playindex.playindex
  );

  const [currentlist, setcurrentlist] = useStateIfMounted([])

  useEffect(() => {
    if (full_list != undefined) {
      setmasterlist(full_list)
    }
  }, [full_list, setmasterlist])

  useEffect(() => {
    if (playlist == "master") {
      setcurrentlist(masterlist)
      dispatch(setPlayList("master"))
    }
    if (playlist == "list1") {
      dispatch(getList1());
      setcurrentlist(list1)
      dispatch(setPlayList("list1"))
    }
    if (playlist == "list2") {
      dispatch(getList2());
      setcurrentlist(list2)
      dispatch(setPlayList("list2"))
    }
    if (playlist == "list3") {
      dispatch(getList3());
      setcurrentlist(list3)
      dispatch(setPlayList("list3"))
    }
    // eslint-disable-next-line
  }, [setcurrentlist, playlist, list1, list2, list3, getupdate, add_track])

  const [display, setdisplay] = useState(false)
  const [playerinstance, setplayerinstance] = useState()
  const [song, setSong] = useState()

  useEffect(() => {
    if (playerinstance != undefined) {
      playerinstance.volume = volume
    }
  }, [playerinstance, volume])

  useEffect(() => {
    if (playerinstance != undefined) {
      if (playing == true) {
        var playPromise = playerinstance.play();
        if (playPromise !== undefined) {
          playPromise
            .then(_ => {
              // Automatic playback started!
              // Show playing UI.
            })
            .catch(error => {
              // Auto-play was prevented
              // Show paused UI.
              console.log(error);
            });
        }
      } else {
        playerinstance.pause()
      }
    }
  }, [playerinstance, playing, currentlist])

  //type list
  const typeListArray = currentlist.map((list) => ({
    value: list.musicSrc,
    label: list.name,
    MusicKey: list.MusicKey
  }));

  //type selector
  const songSelect = (e) => {
    if (e !== null) {
      const index = currentlist.findIndex((element, index) => {
        if (element.MusicKey === e.MusicKey) {
          return true
        }
      })
      setSong(index)
      dispatch(setPlayIndex(e))
    }
  };

  const handleplay = (e) => {
    if (playindex && playindex != e.playIndex) {
      dispatch(setPlayIndex(e.playIndex))
    }
  }

  const updateList = (currentPlayId, audioLists, audioInfo) => {
    dispatch(setUpdate(audioLists))
    dispatch(getPlayIndex())
    if (playerinstance != undefined) {
      playerinstance.updatePlayIndex(playindex)
    }
  }

  const [currenttrack, setcurrenttrack] = useState([])

  const removeTrack = () => {
    if (currenttrack.length != 0) {
      dispatch(setRemove(currenttrack, currentlist))
    }
  }

  useEffect(() => {
    if (playerinstance != undefined) {
      if (currentlist.length != 0) {
        const MusicKeyPull = currentlist.filter(self => self.MusicKey == musickey)
        if (MusicKeyPull.length != 0) {
          dispatch(setMusicKey(MusicKeyPull[0].MusicKey))
          const index2 = currentlist.findIndex((element, index) => {
            if (element.MusicKey === MusicKeyPull[0].MusicKey) {
              return true
            }
          })
          if (index2 != -1) {
            setSong(index2)
          }
        }
      }
    }
    // eslint-disable-next-line
  }, [currentlist, dispatch, musickey])

  const settrack = (index) => {
    const current_track = currentlist[index]
    if (current_track != undefined) {
      setcurrenttrack([current_track])
      setSong(index)
      dispatch(setPlayIndex(index))
    }
  }

  const handlevolume = (e) => {
    window.localStorage.setItem('volume', parseFloat(e))
    dispatch(setPlayVolume(parseFloat(e)))
  };

  return (
    <div>
      {display == true ?
        <div className="songplayerselect">
          <Select
            key={display}
            isSearchable={true}
            placeholder="Song Select..."
            className='songselector'
            classNamePrefix="songtext"
            onChange={songSelect}
            options={typeListArray}
            isClearable={true}
          />
        </div> : ""}
      {currentlist && <ReactJkMusicPlayer
        getAudioInstance={(instance) => {
          setplayerinstance(instance)
        }}
        key={1}
        clearPriorAudioLists={true}
        showMediaSession
        onAudioPlay={(audioInfo) => handleplay(audioInfo)}
        playIndex={song}
        onModeChange={(stat) => setdisplay(stat == "mini" ? false : true)}
        defaultPosition={{ top: "65px", left: "calc(50% + 95px)" }}
        remember={true}
        audioLists={currentlist}
        updatePlayIndex={currentlist}
        onAudioVolumeChange={handlevolume}
        onAudioListsChange={updateList}
        responsive={false}
        glassBg={true}
        sortableOptions={{ sort: true, disabled: isTouchDevice(), animation: 0 }}
        autoHiddenCover={true}
        defaultPlayMode={"shufflePlay"}
        mobileMediaQuery="(max-width: 800px)"
        drag={false}
        quietUpdate={true}
        autoPlay={false}
        showDestroy={false}
        remove={true}
        showDownload={false}
        showLyric={false}
        showReload={false}
        showThemeSwitch={false}
        showMiniModeCover={false}
        className={"JKPlayer"}
        onPlayIndexChange={(playIndex) => settrack(playIndex)}
        extendsContent={
          <span className="audio-lists-panel-header-delete-btn"
            title={`Remove ${currenttrack[0] && currenttrack[0].name != undefined ? currenttrack[0].name : "current track"} from playlist`}
            onClick={() => removeTrack()}
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"></path></g></svg>
          </span>
        }
      />
      }
    </div>
  )
}