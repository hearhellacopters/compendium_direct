import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useStateIfMounted } from "use-state-if-mounted";
import { getCharacters } from '../redux/ducks/characters';
import CharacterEvents from '../characterpages/CharacterPageEvents';
import CharacterEventsSub from '../characterpages/events/eventsubhandler';
import DevSwitch from '../redux/DevSwitch';
import Loading from './_loading'
import axios from "axios";
import {Navigate} from 'react-router-dom';

const CallCharEventsHandoff = ({match, filtered}) =>{

    function getSafe(fn, defaultVal) {
        try {
          return fn();
        } catch (e) {
          return defaultVal;
        }
      }
    
    
    const dispatch = useDispatch();
    const [EnemiesForCharacters, setEnemiesForCharacters] = useStateIfMounted()

    const ProcessedCharacters = useSelector((state) => 
    state.characters.characters
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedCharacters == undefined) {
        dispatch(getCharacters())
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,ProcessedCharacters]);

    useEffect(() => {
        if(DevSwitch == true && getSafe(() =>filtered[0].CharID) != undefined ){
            axios.get(`http://localhost:3001/data/enemiesforcharacters_direct/${filtered[0].CharID}`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setEnemiesForCharacters(response)
            }).catch(function(err) {
                console.log(err)
            })
          }
            if(DevSwitch == false && getSafe(() =>filtered[0].CharID) != undefined ){
              axios.get(`https://www.dissidiacompendium.com/data/enemiesforcharacters_direct/${filtered[0].CharID}.json`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setEnemiesForCharacters(response)
            }).catch(function(err) {
                console.log(err)
            })
          }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[match])

    if(getSafe(() =>filtered[0].CharID) == undefined ) {
        return(
            <Navigate replace to="/404"/>
        )
      }
    
      if(match.params.type == undefined){
        return (
            EnemiesForCharacters != undefined ?
            <CharacterEvents match={match} ProcessedCharacters={ProcessedCharacters}/>
            :
            <Loading/>
        )
      } else {
          return(
            EnemiesForCharacters != undefined ?
            <CharacterEventsSub match={match} ProcessedCharacters={ProcessedCharacters} EnemiesForCharacters={EnemiesForCharacters}/>
            :
            <Loading/>
          )
      }
}

export default CallCharEventsHandoff;