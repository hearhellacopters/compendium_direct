import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useStateIfMounted } from "use-state-if-mounted";
import axios from "axios";
import { getCharacters } from '../redux/ducks/characters';
import { getJPToggle } from '../redux/ducks/jptoggle';
import CharacterReworks from '../characterpages/CharacterPageReworks';
import Loading from './_loading'
import DevSwitch from '../redux/DevSwitch';
import {Navigate} from 'react-router-dom';

const CallCharBuffsHandoff = ({match, filtered}) =>{

    function getSafe(fn, defaultVal) {
        try {
          return fn();
        } catch (e) {
          return defaultVal;
        }
      }
    
    const dispatch = useDispatch();
    const [ProcessedReworks, setProcessedReworks] = useStateIfMounted()
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
            axios.get(`http://localhost:3001/data/reworks/${filtered[0].CharID}`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setProcessedReworks(response)
            }).catch(function(err) {
                console.log(err)
            })
        }
        if(DevSwitch == false && getSafe(() =>filtered[0].CharID) != undefined ){
            axios.get(`https://www.dissidiacompendium.com/data/reworks/${filtered[0].CharID}.json`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setProcessedReworks(response)
            }).catch(function(err) {
                console.log(err)
            })
        }
        if(DevSwitch == true && getSafe(() =>filtered[0].CharID) != undefined ){
            axios.get(`http://localhost:3001/data/buffs/${filtered[0].CharID}`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setProcessedBuffs(response)
            }).catch(function(err) {
                console.log(err)
            })
        }
        if(DevSwitch == false && getSafe(() =>filtered[0].CharID) != undefined ){
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

        return (
            ProcessedBuffs != undefined && ProcessedReworks != undefined && ProcessedCharacters != undefined && jptoggledata != undefined?
            <CharacterReworks ProcessedBuffs={ProcessedBuffs} ProcessedReworks={ProcessedReworks} ProcessedCharacters={ProcessedCharacters} match={match} jptoggledata={jptoggledata}/>
            : 
            <Loading/>
        )
        
}

export default CallCharBuffsHandoff;