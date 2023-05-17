import React from 'react';
import Character_Ability_Dif from './Character_Ability_Dif.js';
import Character_Ability_Pars from './Character_Ability_Pars.js';

const Character_Ability_Dif_Handler = ({
    ability_data,
    master_index,
    ProcessedCharacters
}) => {

    return (
        ability_data.new_only == true ?         
            <Character_Ability_Pars
                character_ability={ability_data.command_new}
                ver={ability_data.ver_new}
                ProcessedCharacters={ProcessedCharacters}
                master_index={master_index}
                formatting={true}
                info={ability_data.info?ability_data.info+"\nNew Ability! (doesn't compare)":"New Ability! (doesn't compare)"}
            />    
            :
            <Character_Ability_Dif
                command_old={ability_data.command_old}
                ver_old={ability_data.ver_old}
                command_new={ability_data.command_new}
                ver_new={ability_data.ver_new}
                master_index={master_index}
                info={ability_data.info}
            />
    )
}

export default Character_Ability_Dif_Handler