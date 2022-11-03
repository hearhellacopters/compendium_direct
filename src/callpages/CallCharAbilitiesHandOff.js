import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useStateIfMounted } from "use-state-if-mounted";
import axios from "axios";
import { getCharacters } from '../redux/ducks/characters';
import { getJPToggle } from '../redux/ducks/jptoggle';
import CharacterAbilities from '../characterpages/CharacterPageAbilities';
import CharacterAbilitiesSub from '../characterpages/abilities/abilitiessubhandler';
import Loading from './_loading'
import DevSwitch from '../redux/DevSwitch';
import {Navigate} from 'react-router-dom';

const CallCharAbilitiesHandoff = ({match, filtered}) =>{

    function getSafe(fn, defaultVal) {
        try {
          return fn();
        } catch (e) {
          return defaultVal;
        }
      }
    
    const dispatch = useDispatch();
    const [ProcessedAbilities, setProcessedAbilities] = useStateIfMounted(undefined)
    const [ProcessedBuffs, setProcessedBuffs] = useStateIfMounted(undefined)

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
            axios.get(`http://localhost:3001/data/abilities/${filtered[0].CharID}`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setProcessedAbilities(response)
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
            axios.get(`https://www.dissidiacompendium.com/data/abilities/${filtered[0].CharID}.json`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setProcessedAbilities(response)
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
                ProcessedAbilities != undefined && ProcessedCharacters != undefined && ProcessedBuffs != undefined && jptoggledata != undefined ? 
                <CharacterAbilities ProcessedAbilities={ProcessedAbilities} ProcessedCharacters={ProcessedCharacters} match={match} ProcessedBuffs={ProcessedBuffs} jptoggledata={jptoggledata}/>
                : 
                <Loading/>
            )
        } else {
            return (
                ProcessedAbilities != undefined && ProcessedCharacters != undefined && ProcessedBuffs != undefined && jptoggledata != undefined?
                <CharacterAbilitiesSub ProcessedAbilities={ProcessedAbilities} ProcessedCharacters={ProcessedCharacters} match={match} ProcessedBuffs={ProcessedBuffs} type={match.params.type} jptoggledata={jptoggledata}/>
            : 
            <Loading/>
            )
        }
}

export default CallCharAbilitiesHandoff;