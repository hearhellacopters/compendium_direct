import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from '../redux/ducks/characters';
import { getSpheres } from '../redux/ducks/spheres';
import { getJPToggle } from '../redux/ducks/jptoggle';
import CharacterSpheres from '../characterpages/CharacterPageSpheres';
import Loading from './_loading'

const CallCharSpheres = () =>{

    const match = {
        params: useParams()
    }
    
    const dispatch = useDispatch();

    const ProcessedCharacters = useSelector((state) => 
    state.characters.characters
    );

    const ProcessedSpheres = useSelector((state) => 
    state.spheres.spheres
    );

    const jptoggledata = useSelector((state) => 
    state.toggle.toggle
    );


    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedCharacters == undefined) {
        dispatch(getCharacters());
        }
        if (mounted && ProcessedSpheres == undefined) {
        dispatch(getSpheres());
        }
        if (mounted) {
            dispatch(getJPToggle());
            }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,ProcessedSpheres,ProcessedCharacters]);

    useEffect(() => {
        if(jptoggledata == true){
            ProcessedCharacters && ProcessedCharacters.sort((self,self2)=>self.JPOrder-self2.JPOrder)
        } else {
            ProcessedCharacters && ProcessedCharacters.sort((self,self2)=>self.GLOrder-self2.GLOrder)
        }
    },[ProcessedCharacters,jptoggledata])


    return (
        ProcessedCharacters != undefined && ProcessedSpheres != undefined ?
        <CharacterSpheres match={match} ProcessedCharacters={ProcessedCharacters} ProcessedSpheres={ProcessedSpheres} />
        : 
        <Loading/>
    )

}

export default CallCharSpheres;