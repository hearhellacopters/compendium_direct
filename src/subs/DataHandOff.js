import React, { useState, useEffect } from 'react';
import Ailment_Data from '../z_ailments/ailment_data'
import Ailment_Group from '../z_ailments/ailment_group'
import Ailment_Rank from '../z_ailments/ailment_rank'
import Ailment_Cast from '../z_ailments/ailment_cast'
import Ailment_Field from '../z_ailments/ailment_field'
import Ailment_Field_Effects from '../z_ailments/ailment_field_effects'
import Ailment_Default from '../z_ailments/ailment_default'
import Ailment_Modify from '../z_ailments/ailment_modify'
import Ailment_Combination from '../z_ailments/ailment_combination'
import Cond_Data from '../z_ailments/condition_data'
import Passive_Ability from '../z_characterpassives/passive_ability';
import Art_Passive from '../z_characterpassives/art_passive';
import Link_Eff_Data from '../z_characterpassives/link_eff_data';
import Equipment_Passive_Ability from '../z_characterpassives/equipment_passive_ability';
import Hit_Data from '../z_command_ability/hit_data'
import Command_Ability from '../z_command_ability/command_ability';
import Character_Option from '../z_command_ability/character_option';
import Character_Ability from '../z_command_ability/character_ability';
import Enemy_Option from '../z_enemy/enemy_option';
import Enemy_Ability from '../z_enemy/enemy_ability';
import Command_Group from '../z_command_ability/command_group';
import Summon_Ability from '../z_summon/summon_ability';
import Ailment_Level_Condition from '../z_ailments/ailment_level_condition';
import File_List from '../z_file_list/file_list'
import CharacterSelect from './CharacterSelect';
import ListLanding from '../z_game_list/_list_landing'

const DataHandOff = ({
    ver,
    loc,
    file,
    newcompare,
    match,
    //indexes
    master_index,
    enemy_names,

    Access,
    //APIs
    ailment_data,
    ailment_group,
    command_group,
    ailment_rank,
    ailment_cast,
    ailment_field,
    ailment_field_effects,
    ailment_default,
    ailment_combination,
    ailment_modify,
    ailment_level_condition,
    cond_data,
    passive_ability,
    equipment_passive_ability,
    art_passive,
    link_eff_data,
    hit_data,
    enemy_resist,
    command_ability,
    character_option,
    enemy_option,
    character_ability,
    enemy_ability,
    summon_ability,
    file_list,

    gamelist_ailment,
    gamelist_ability,
    gamelist_passive,
    gamelist_sphere,
    gamelist_gear,
}) => {

    if (file == "ailment_level_condition") {
        return (
            <Ailment_Level_Condition
                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare}
                ailment_level_condition={ailment_level_condition}

                master_index={master_index}
            />
        )
    }

    if (file == "By Character") {
        return (
            <CharacterSelect
                ver={ver}
                match={match}

                Access={Access}

                master_index={master_index}
            />
        )
    }
    if (file == "summon_ability") {
        return (
            <Summon_Ability
                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare}

                master_index={master_index}

                summon_ability={summon_ability}
            />
        )
    }

    if (file == "enemy_option") {
        return (
            <Enemy_Option
                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare}


                enemy_names={enemy_names}

                master_index={master_index}

                enemy_option={enemy_option}
            />
        )
    }

    if (file == "enemy_ability") {
        return (
            <Enemy_Ability
                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare}

                enemy_names={enemy_names}

                master_index={master_index}

                enemy_ability={enemy_ability}
            />
        )
    }

    if (file == "character_ability") {
        return (
            <Character_Ability
                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare}

                master_index={master_index}

                character_ability={character_ability}
            />
        )
    }

    if (file == "character_option") {
        return (
            <Character_Option
                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare}

                master_index={master_index}

                character_option={character_option}
            />
        )
    }

    if (file == "command_ability") {
        return (
            <Command_Ability
                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare}

                master_index={master_index}

                command_ability={command_ability}
            />
        )
    }

    if (file == "ability_hit_data") {
        return (
            <Hit_Data
                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare}

                master_index={master_index}

                hit_data={hit_data}
            />
        )
    }
    if (file == "link_eff_data") {
        return (
            <Link_Eff_Data
                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare}

                master_index={master_index}

                link_eff_data={link_eff_data}
            />
        )
    }

    if (file == "art_passive") {
        return (
            <Art_Passive
                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare}

                master_index={master_index}

                art_passive={art_passive}
            />
        )
    }
    if (file == "condition_data") {
        return (
            <Cond_Data
                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare}

                master_index={master_index}

                cond_data={cond_data}

            />
        )
    }
    if (file == "equipment_passive_ability") {
        return (
            <Equipment_Passive_Ability
                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare}

                master_index={master_index}

                equipment_passive_ability={equipment_passive_ability}


            />
        )
    }
    if (file == "passive_ability") {
        return (
            <Passive_Ability
                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare}

                master_index={master_index}

                passive_ability={passive_ability}

            />
        )
    }
    if (file == "ailment_data") {
        return (
            <Ailment_Data
                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare}

                master_index={master_index}

                ailment_data={ailment_data}

            />
        )
    }
    if (file == "ailment_modify") {
        return (
            <Ailment_Modify
                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare}

                master_index={master_index}

                ailment_modify={ailment_modify}

            />
        )
    }
    if (file == "command_ability_group") {
        return (
            <Command_Group
                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare}

                master_index={master_index}

                command_group={command_group}
            />
        )
    }
    if (file == "ailment_group") {
        return (
            <Ailment_Group
                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare}

                ailment_group={ailment_group}

                master_index={master_index}
            />
        )
    }
    if (file == "ailment_rank") {
        return (
            <Ailment_Rank
                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare}

                master_index={master_index}

                ailment_rank={ailment_rank}
            />
        )
    }
    if (file == "ailment_cast") {
        return (
            <Ailment_Cast
                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare}

                master_index={master_index}

                ailment_cast={ailment_cast}
            />
        )
    }
    if (file == "ailment_field") {
        return (
            <Ailment_Field
                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare}

                master_index={master_index}

                ailment_field={ailment_field}

            />
        )
    }
    if (file == "ailment_field_effects") {
        return (
            <Ailment_Field_Effects
                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare}

                master_index={master_index}

                ailment_field_effects={ailment_field_effects}

            />
        )
    }
    if (file == "ailment_default") {
        return (
            <Ailment_Default
                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare}

                master_index={master_index}

                ailment_default={ailment_default}

            />
        )
    }
    if (file == "file_list") {
        return (
            <File_List
                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare}
                file_list={file_list}
            />
        )
    }
    if (file == "ailment_combination") {
        return (
            <Ailment_Combination
                ver={ver}
                loc={loc}
                file={file}
                newcompare={newcompare}

                master_index={master_index}

                ailment_combination={ailment_combination}
            />
        )
    }
    if (loc == "Game List") {
        return (
            <ListLanding
                ver={ver}
                loc={loc}
                file={file}
                match={match}


                Access={Access}

                master_index={master_index}

                gamelist_ailment={gamelist_ailment}
                gamelist_ability={gamelist_ability}
                gamelist_passive={gamelist_passive}
                gamelist_sphere={gamelist_sphere}
                gamelist_gear={gamelist_gear}
            />
        )
    }
    return (
        ""
    )
}
export default DataHandOff