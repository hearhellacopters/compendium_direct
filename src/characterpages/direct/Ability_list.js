import React, {useState, useEffect} from 'react';
import Character_Ability_Pars from './formatting/command_ability/Character_Ability_Pars.js'

const Character_Ability_List =({
    character_ability,
    loc,
    ver,
    file,
    buff_data,

    formatting,
    tag_override,
    all_options,
    tag_display,
    reverse,

    master_index
})=>{

    const filteredout = character_ability

    filteredout && filteredout.sort(function(x, y) {
        return  reverse ? 
                y.ability_rank_ - x.ability_rank_ : 
                x.ability_rank_ - y.ability_rank_
    });

    filteredout && filteredout.sort(function(x, y) {
        return  reverse ? 
                x.same_ability_id_ - y.same_ability_id_ : 
                y.same_ability_id_ - x.same_ability_id_
    });

    filteredout && filteredout.sort(function(x, y) {
        // true values first
        // return (x === y)? 0 : x? -1 : 1;
        return (x.Trap === y.Trap)? 0 : x.Trap? 1 : -1;
    });

    filteredout && filteredout.sort(function(x, y) {
        return (x.FollowUp === y.FollowUp)? 0 : x.FollowUp? 1 : -1;
    });

    filteredout && filteredout.sort(function(x, y) {
        return (x.Counter === y.Counter)? 0 : x.Counter? 1 : -1;
    });
    
    if(character_ability.length == 0){
        return(
            ""
        )
    } else {
        return(
            <div>
                <div className="abilitygreysinglebutton margtop">
                    <span className={`${tag_display} undertaga`}></span> Attacks
                </div>
                {character_ability.map(cmd => {
                                return <Character_Ability_Pars 
                                key={cmd.data_id}
                                character_ability={cmd}
                                ver={ver}
                                loc={loc}
                                file={file}
            
                                master_index={master_index}
                                
                                buff_data={buff_data}
            
                                formatting={formatting}
                                all_options={all_options}
                                tag_override={tag_override}
                                />
                            })}
            </div>
        )
    }
}

export default Character_Ability_List