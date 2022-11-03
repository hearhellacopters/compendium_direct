import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getCharacters} from '../redux/ducks/characters';
import FRPageFormatting from '../characterpages/FRPageFormatting';
import Loading from './_loading'

const CallFRTime = () =>{

    const match = {
        params: useParams()
    }
    
    const dispatch = useDispatch();

    const ProcessedCharacters = useSelector((state) => 
    state.characters.characters
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedCharacters == undefined) {
        dispatch(getCharacters());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,ProcessedCharacters]);

    const PartnerCharacters ={}

    ProcessedCharacters && ProcessedCharacters.map(self=>{
        Object.assign(PartnerCharacters,{[self.CharID]: self})
    })

    const CharacterswithFR = ProcessedCharacters && ProcessedCharacters.filter(chars =>chars.AbilityFR != undefined)

    return (
        CharacterswithFR != undefined && PartnerCharacters != undefined?
        <FRPageFormatting match={match} PartnerCharacters={PartnerCharacters} ProcessedCharacters={CharacterswithFR}/>
        : 
        <Loading/>
    )

}

export default CallFRTime;