import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from '../redux/ducks/characters';
import CharacterEventsHandoff from './CallCharEventsHandOff'
import { getJPToggle } from '../redux/ducks/jptoggle';
import Loading from './_loading'

const CallCharEvents = () =>{

  const match = {
    params: useParams()
}
    
    const dispatch = useDispatch();

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
      if(jptoggledata == true){
          ProcessedCharacters && ProcessedCharacters.sort((self,self2)=>self.JPOrder-self2.JPOrder)
      } else {
          ProcessedCharacters && ProcessedCharacters.sort((self,self2)=>self.GLOrder-self2.GLOrder)
      }
  },[ProcessedCharacters,jptoggledata])

    const filtered = ProcessedCharacters && ProcessedCharacters.filter(function (el) { 
        return el["ShortName"] == match.params.id ; 
      }); 

      if(filtered != undefined ){
        return (
            <CharacterEventsHandoff match={match} filtered={filtered}/>
        )
      } else {
          return(
            <Loading/>
          )
      }
    
}

export default CallCharEvents;