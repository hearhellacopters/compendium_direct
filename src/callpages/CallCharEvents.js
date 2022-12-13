import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from '../redux/ducks/characters';
import CharacterEvents from '../characterpages/CharacterPageEvents';
import { Navigate } from 'react-router-dom';


import { getJPToggle } from '../redux/ducks/jptoggle';
import Loading from './_loading'

const CallCharEvents = () => {

  const match = {
    params: useParams()
  }

  const dispatch = useDispatch();

  const ProcessedCharacters = useSelector((state) =>
    state.characters.characters
  );

  const Access = useSelector((state) =>
    state.characters.access
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
  }, [dispatch, ProcessedCharacters]);

  const filtered = Access[match.params.id];

  return (
    Access != undefined && ProcessedCharacters != undefined && jptoggledata != undefined ?
      filtered == undefined ?
        <Navigate replace to="/404" />
        :
        <CharacterEvents
          match={match}
          char_id={filtered}
          filtered={ProcessedCharacters[filtered]}
          ProcessedCharacters={ProcessedCharacters}
          jptoggledata={jptoggledata}
        />
      :
      <Loading />
  )
}

export default CallCharEvents;