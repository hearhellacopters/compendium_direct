import React, {useEffect, useState} from 'react';
import { useStateIfMounted } from 'use-state-if-mounted';
import CharacterPage from '../characterpages/CharacterPageFormatting.js'
import ForceTimePassdoff from './ForceTimeHandoff';
import UltimaWeaponPassdoff from './UltimaWeaponHandoff';
import WardrobePassoff from './WardrobeHandoff.js';
import {Navigate} from 'react-router-dom';
import DevSwitch from '../redux/DevSwitch'
import axios from "axios";
import Loading from '../callpages/_loading'

const CharacterPassoff = ({ match, ProcessedCharacters, CharGuideData, jptoggledata}) => {

    function getSafe(fn, defaultVal) {
        try {
          return fn();
        } catch (e) {
          return defaultVal;
        }
      }

    const [ProcessedVoices, setProcessedVoices] = useStateIfMounted()
    const [CharStickers, setCharStickers] = useStateIfMounted()

    const filtered = ProcessedCharacters && ProcessedCharacters.filter(function (el) { 
        return el["ShortName"] == match.params.id ; 
      }); 

    useEffect(() => {
        if(DevSwitch == true && getSafe(() =>filtered[0].CharID) != undefined ){
            axios.get(`http://localhost:3001/data/characters/voice/${filtered[0].CharID}`,{'muteHttpExceptions': true}).then((res) => {
                    const response = res.data;
                    setProcessedVoices(response)
            }).catch(function(err) {
                console.log(err)
            })
            axios.get(`http://localhost:3001/data/characters/stickers/${filtered[0].CharID}`,{'muteHttpExceptions': true}).then((res) => {
                    const response = res.data;
                    setCharStickers(response)
            }).catch(function(err) {
                console.log(err)
            })
        }
        if(DevSwitch == false && getSafe(() =>filtered[0].CharID) != undefined ){
            axios.get(`https://www.dissidiacompendium.com/data/characters/voice/${filtered[0].CharID}.json`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setProcessedVoices(response)
            }).catch(function(err) {
                console.log(err)
            })
            axios.get(`https://www.dissidiacompendium.com/data/characters/stickers/${filtered[0].CharID}.json`,{'muteHttpExceptions': true}).then((res) => {
            const response = res.data;
            setCharStickers(response)
            }).catch(function(err) {
                console.log(err)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[match])

        if(match.params.id == "wardrobe"){
            console.log(match.params.id)
            return(
                <WardrobePassoff match={match}/>
            )
        }

        if(match.params.id == "ultimaweapon"){
            return(
                <UltimaWeaponPassdoff match={match}/>
            )
        }

        if(match.params.id == "forcetime"){
            return(
                <ForceTimePassdoff match={match} ProcessedCharacters={ProcessedCharacters}/>
            )
        }

        if(filtered.length === 0 ) {
            return(
                <Navigate replace to="/404"/>
            )
        } else {
            return (
                ProcessedVoices != undefined && CharStickers != undefined?
                <CharacterPage matchdata={match} match={filtered[0]} ProcessedCharacters={ProcessedCharacters} CharGuideData={CharGuideData} jptoggledata={jptoggledata} ProcessedVoices={ProcessedVoices} CharStickers={CharStickers}/>
                :
                <Loading/>
            )
        }
}
export default CharacterPassoff