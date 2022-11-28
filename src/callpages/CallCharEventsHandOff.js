import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useStateIfMounted } from "use-state-if-mounted";
import { getCharacters } from '../redux/ducks/characters';
import CharacterEvents from '../characterpages/CharacterPageEvents';
import DevSwitch from '../redux/DevSwitch';
import Loading from './_loading'
import axios from "axios";
import {Navigate} from 'react-router-dom';

const CallCharEventsHandoff = ({match, char_id, jptoggledata}) =>{
   
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
        if(DevSwitch == true && char_id != undefined ){
            axios.get(`http://localhost:3001/data/enemiesforcharacters_direct/${char_id}`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setEnemiesForCharacters(response)
            }).catch(function(err) {
                console.log(err)
            })
          }
            if(DevSwitch == false && char_id != undefined ){
              axios.get(`https://www.dissidiacompendium.com/data/enemiesforcharacters_direct/${char_id}.json`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setEnemiesForCharacters(response)
            }).catch(function(err) {
                console.log(err)
            })
          }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[match])

    if(char_id == undefined ) {
        return(
            <Navigate replace to="/404"/>
        )
      }
      
      return (
          EnemiesForCharacters != undefined ?
          <CharacterEvents 
          match={match} 
          filtered={ProcessedCharacters[char_id]}
          ProcessedCharacters={ProcessedCharacters}
          jptoggledata={jptoggledata}
          />
          :
          <Loading/>
      )
      
}

export default CallCharEventsHandoff;