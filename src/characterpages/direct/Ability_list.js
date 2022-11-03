import React, {useState, useEffect} from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import Character_Ability_Pars from './formatting/command_ability/Character_Ability_Pars.js'

const Character_Ability_List =({
    character_ability,
    loc,
    ver,
    file,
    buff_data,

    CastNames,
    enemy_type,
    cast_targets,
    passivenames,
    equipmentpassivenames,
    passive_effects_data,
    CondData,
    Ailment_Effects,
    MessageData_Category,
    MessageData_FFSeries,
    char_id,

    option_trans_data,
    command_data_effects,
    hit_data_effects,

    hit_effect_id,
    ability_target_id,
    type_id,
    attack_type_id,
    effect_value_type_id,
    CommandNames,
    AilmentNames,
    ailment_group,
    command_group,
    enemy_resist,
    element_bit_,

    type_,
    attack_type_,
    target_range_,
    target_type_,
    auto_target_type_,
    killer_cond,
    killer_cond_1,
    killer_type,
    cast_target,
    ailment_cond,
    ailment_cond_14,
    command_type,

    option_labels,
    options_target,
    option_type_,
    formatting,
    tag_override,
    all_options,
    tag_display,
    reverse
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
            
                                CastNames={CastNames}
                                enemy_type={enemy_type}
                                cast_targets={cast_targets}
                                passivenames={passivenames}
                                equipmentpassivenames={equipmentpassivenames}
                                passive_effects_data={passive_effects_data}
                                CondData={CondData}
            
                                Ailment_Effects={Ailment_Effects}
            
                                MessageData_Category={MessageData_Category}
                                MessageData_FFSeries={MessageData_FFSeries}
                                char_id={char_id}
            
                                option_trans_data={option_trans_data}
                                command_data_effects={command_data_effects}
                                hit_data_effects={hit_data_effects}

                                buff_data={buff_data}
            
                                hit_effect_id={hit_effect_id}
                                ability_target_id={ability_target_id}
                                type_id={type_id}
                                attack_type_id={attack_type_id}
                                effect_value_type_id={effect_value_type_id}
                                CommandNames={CommandNames}
                                AilmentNames={AilmentNames}
                                ailment_group={ailment_group}
                                command_group={command_group}
                                enemy_resist={enemy_resist}
                                element_bit_={element_bit_}
            
                                type_={type_}
                                attack_type_={attack_type_}
                                target_range_={target_range_}
                                target_type_={target_type_}
                                auto_target_type_={auto_target_type_}
                                killer_cond={killer_cond}
                                killer_cond_1={killer_cond_1}
                                killer_type={killer_type}
                                cast_target={cast_target}
                                ailment_cond={ailment_cond}
                                ailment_cond_14={ailment_cond_14}
                                command_type={command_type}
            
                                option_labels={option_labels}
                                options_target={options_target}
                                option_type_={option_type_}
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