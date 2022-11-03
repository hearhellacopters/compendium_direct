import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useStateIfMounted } from "use-state-if-mounted";
import axios from "axios";
import { getCharacters } from '../redux/ducks/characters';
import { getAccess} from '../redux/ducks/access';
import { getJPToggle } from '../redux/ducks/jptoggle';
import CharacterDirect from '../characterpages/CharacterPageDirect';
import Loading from './_loading'
import DevSwitch from '../redux/DevSwitch';
import {Navigate} from 'react-router-dom';
import { getEventsIndex } from '../redux/ducks/eventsIndex';

const CallCharDirectHandoff = ({
    match, 
    filtered,

    enemy_type,
    cast_targets,
    passive_effects_data,
    char_id,
    passivenames,
    equipmentpassivenames,
    AilmentNames,
    CommandNames,
    CondData,
    Ailment_Effects,
    MessageData_Category,
    MessageData_FFSeries,
    command_data_effects,
    hit_data_effects,
    option_trans_data,
    
    ailment_group,
    command_group,
    enemy_resist,
}) =>{

    const selected_id = filtered[0] && filtered[0].CharID
    
    const dispatch = useDispatch();
    const Access = useSelector((state) => 
    state.access.access
    );

    const ProcessedCharacters = useSelector((state) => 
    state.characters.characters
    );
    const jptoggledata = useSelector((state) => 
    state.toggle.toggle
    );

    const ProcessedEventsIndex = useSelector((state) => 
    state.eventsIndex.eventsIndex
    );

    useEffect(() => {
        let mounted = true
        if (mounted && ProcessedCharacters == undefined) {
        dispatch(getCharacters())
        }
        if (mounted) {
        dispatch(getJPToggle());
        }
        if (mounted && ProcessedEventsIndex == undefined) {
        dispatch(getEventsIndex());
        }
        if (mounted && Access == undefined) {
        dispatch(getAccess());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,ProcessedCharacters,ProcessedEventsIndex,Access]);


        if(selected_id == undefined ) {
            return(
                <Navigate replace to="/404"/>
            )
          }


        return (
            Access != undefined && ProcessedCharacters != undefined && ProcessedEventsIndex != undefined && jptoggledata != undefined && filtered[0] != undefined?
            <CharacterDirect 
            Access={Access} 
            ProcessedCharacters={ProcessedCharacters} 
            ProcessedEventsIndex={ProcessedEventsIndex}
            selected_char={filtered[0]} 
            match={match} 
            jptoggledata={jptoggledata}

            enemy_type={enemy_type}
            cast_targets={cast_targets}
            passive_effects_data={passive_effects_data}
            char_id={char_id}
            passivenames={passivenames}
            equipmentpassivenames={equipmentpassivenames}
            AilmentNames={AilmentNames}
            CommandNames={CommandNames}
            CondData={CondData}
            Ailment_Effects={Ailment_Effects}
            MessageData_Category={MessageData_Category}
            MessageData_FFSeries={MessageData_FFSeries}
            command_data_effects={command_data_effects}
            hit_data_effects={hit_data_effects}
            option_trans_data={option_trans_data}

            ailment_group_data={ailment_group}
            command_group_data={command_group}
            enemy_resist_data={enemy_resist}
            />
            : 
            <Loading/>
        )

}

export default CallCharDirectHandoff;