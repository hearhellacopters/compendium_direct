import React from 'react';
import CharacterAbilityDifFormatting from './AbilityDifFormatting.js';
import CharacterAbilityPars from './AbilityPars.js';

export default function CharacterAbilityDifHandler({
    ability_data,
    master_index,
    ProcessedCharacters,
    debugging
}){

    return (
        ability_data.new_only == true ?         
            <CharacterAbilityPars
                character_ability={ability_data.command_new}
                ver={ability_data.ver_new}
                ProcessedCharacters={ProcessedCharacters}
                master_index={master_index}
                formatting={true}
                info={ability_data.info?ability_data.info+"\nNew Ability! (doesn't compare)":"New Ability! (doesn't compare)"}
                debugging={debugging}
            />    
            :
            <CharacterAbilityDifFormatting
                command_old={ability_data.command_old}
                ver_old={ability_data.ver_old}
                command_new={ability_data.command_new}
                ver_new={ability_data.ver_new}
                master_index={master_index}
                info={ability_data.info}
                debugging={debugging}
            />
    )
}