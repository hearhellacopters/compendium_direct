import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from '../redux/ducks/characters';
import { getJPToggle } from '../redux/ducks/jptoggle';
import CharacterPassives from '../characterpages/CharacterPagePassives';
import CharacterPassivesSub from '../characterpages/passives/passivessubhandler';
import Loading from './_loading'
import DevSwitch from '../redux/DevSwitch';
import axios from "axios";
import {Navigate} from 'react-router-dom';
import { useStateIfMounted } from "use-state-if-mounted";

const CallCharPassivesHandoff = ({match, filtered}) =>{
    
    function getSafe(fn, defaultVal) {
        try {
          return fn();
        } catch (e) {
          return defaultVal;
        }
      }
    
    const dispatch = useDispatch();
    const [ProcessedPassives, setProcessedPassives] = useStateIfMounted()
    const [ProcessedBuffs, setProcessedBuffs] = useStateIfMounted()

    const ProcessedCharacters = useSelector((state) => 
    state.characters.characters
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
    }, [dispatch,ProcessedCharacters]);

    useEffect(() => {
        if(DevSwitch == true && getSafe(() =>filtered[0].CharID) != undefined ){
            axios.get(`http://localhost:3001/data/passives/${filtered[0].CharID}`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setProcessedPassives(response)
            }).catch(function(err) {
                console.log(err)
            })
            axios.get(`http://localhost:3001/data/buffs/${filtered[0].CharID}`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setProcessedBuffs(response)
            }).catch(function(err) {
                console.log(err)
            })
        }
        if(DevSwitch == false && getSafe(() =>filtered[0].CharID) != undefined ){
            axios.get(`https://www.dissidiacompendium.com/data/passives/${filtered[0].CharID}.json`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setProcessedPassives(response)
            }).catch(function(err) {
                console.log(err)
            })
            axios.get(`https://www.dissidiacompendium.com/data/buffs/${filtered[0].CharID}.json`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setProcessedBuffs(response)
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
                ProcessedPassives != undefined && ProcessedCharacters != undefined && ProcessedBuffs != undefined && jptoggledata != undefined?
                <CharacterPassives ProcessedPassives={ProcessedPassives} ProcessedCharacters={ProcessedCharacters} ProcessedBuffs={ProcessedBuffs} match={match} jptoggledata={jptoggledata}/>
                : 
                <Loading/>
            )
        } else {
            return (
                ProcessedPassives != undefined && ProcessedCharacters != undefined && ProcessedBuffs != undefined && jptoggledata !=  undefined?
                <CharacterPassivesSub ProcessedPassives={ProcessedPassives} ProcessedCharacters={ProcessedCharacters} ProcessedBuffs={ProcessedBuffs} match={match} type={match.params.type} jptoggledata={jptoggledata}/>
                : 
                <Loading/>
            )
        }
    
}

export default CallCharPassivesHandoff;