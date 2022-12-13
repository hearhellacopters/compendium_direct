import React, { useState, useEffect } from 'react';
import Character_Ability_Dif from './Character_Ability_Dif.js';
import Character_Ability_Pars from './Character_Ability_Pars.js';

const Character_Ability_Dif_Handler = ({
    ability_data,
    master_index,
    ProcessedCharacters
}) => {

    const [show, setshow] = useState(false);

    return (
        <>
            <div className='force_coloring noshowbottomline'>
                <div className='loadmorespheres' onClick={() => setshow((prevValue) => !prevValue)}>
                    {show ? "Hide Abilities" : "Show Abilities"}
                </div>
            </div>
            {show == true ?
                ability_data && ability_data.map((self, i) => (
                    self.new_only == true ?
                        <div
                            key={i}
                        >
                            <div className='infonameholderenemybuff newblue unique center'>New Ability! (doesn't compare)</div>
                            <Character_Ability_Pars
                                character_ability={self.command_new}
                                ver={self.ver_new}
                                ProcessedCharacters={ProcessedCharacters}
                                master_index={master_index}
                                formatting={true}
                            />
                        </div>
                        :
                        <Character_Ability_Dif
                            key={i}
                            command_old={self.command_old}
                            ver_old={self.ver_old}
                            command_new={self.command_new}
                            ver_new={self.ver_new}
                            master_index={master_index}
                        />
                ))
                : ""}
        </>
    )
}

export default Character_Ability_Dif_Handler