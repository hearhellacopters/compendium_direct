import React, { useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import axios from "axios";
import CharacterReworks from '../formatting/Characters/CharacterPageReworks';
import Loading from '../processing/Loading'
import DevSwitch from '../redux/DevSwitch';
import { Navigate } from 'react-router-dom';
import { getQuery } from '../components/URLParams'

export default function CharReworksHandoff({ 
    match, 
    ProcessedCharacters, 
    jptoggledata, 
    filtered, 
    master_index 
}){

    const [ProcessedReworks, setProcessedReworks] = useStateIfMounted()

    useEffect(() => {
        if (DevSwitch == true && filtered.CharID != undefined) {
            axios.get(`http://localhost:3001/data/reworks/${filtered.CharID}`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setProcessedReworks(response)
            }).catch(function (err) {
                console.log(err)
            })
        }
        if (DevSwitch == false && filtered.CharID != undefined) {
            axios.get(`https://www.dissidiacompendium.com/data/reworks/${filtered.CharID}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setProcessedReworks(response)
            }).catch(function (err) {
                console.log(err)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match])

    if (filtered.CharID == undefined) {

        const { pathname } = window.location;
        const query = getQuery();
        const url = `${pathname}?${query.toString()}`;
        return (
            <Navigate replace to="/404" state={{loc:url}}/>
        )
    }

    return (
        ProcessedReworks != undefined && ProcessedCharacters != undefined && jptoggledata != undefined && master_index != undefined ?
            <CharacterReworks
                ProcessedReworks={ProcessedReworks}
                ProcessedCharacters={ProcessedCharacters}
                master_index={master_index}
                match={match}
                selected_chara={filtered}
                jptoggledata={jptoggledata}
            />
            :
            <Loading />
    )

}