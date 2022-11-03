import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from '../redux/ducks/characters';
import { getCharGuide} from '../redux/ducks/CharGuide';
import { getJPToggle } from '../redux/ducks/jptoggle';
import CharacterHandoff from '../passoff/CharacterHandoff.js';
import Loading from './_loading'

const CallCharHandoff = () =>{
    
    const match = {
        params: useParams()
    }

    const dispatch = useDispatch();

    const ProcessedCharacters = useSelector((state) => 
    state.characters.characters
    );

    const CharGuideData = useSelector((state) => 
    state.charGuide.charGuide
    );

    const jptoggledata = useSelector((state) => 
    state.toggle.toggle
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedCharacters == undefined) {
        dispatch(getCharacters());
        }
        if (mounted && CharGuideData == undefined) {
        dispatch(getCharGuide());
        }
        if (mounted) {
        dispatch(getJPToggle());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,CharGuideData,ProcessedCharacters]);

    useEffect(() => {
        if(jptoggledata == true){
            ProcessedCharacters && ProcessedCharacters.sort((self,self2)=>self.JPOrder-self2.JPOrder)
        } else {
            ProcessedCharacters && ProcessedCharacters.sort((self,self2)=>self.GLOrder-self2.GLOrder)
        }
    },[ProcessedCharacters,jptoggledata])

    return (
        ProcessedCharacters != undefined && CharGuideData  != undefined && jptoggledata != undefined ?
        <CharacterHandoff match={match} ProcessedCharacters={ProcessedCharacters} CharGuideData={CharGuideData} jptoggledata={jptoggledata} />
        : 
        <Loading/>
    )

}

export default CallCharHandoff;