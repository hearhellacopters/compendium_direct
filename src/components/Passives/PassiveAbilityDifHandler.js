import React from "react";
import Passive_Ability_Dif from "./PassiveAbilityDif";
import Passive_Ability_Formatting from "./PassiveAbilityFormatting";

export default function PassiveAbilityDifHandler({
    passive_data,
    master_index,
    ProcessedCharacters,
}){
    return(
        passive_data.new_only == true ? 
        <Passive_Ability_Formatting
        passive_ability={passive_data.pass_new}
        loc={"crystal"}
        ver={passive_data.ver_new}
        file={"crystal"}
        Single={true}
        master_index={master_index}
        chara_id_passoff={passive_data.pass_new.chara_id}
        formatting={true}
        gear={false}
        header={passive_data.header}
        />
        :
        <Passive_Ability_Dif
        passive_ability_new={passive_data.pass_new}
        ver_new={passive_data.ver_new}
        passive_ability_old={passive_data.pass_old}
        ver_old={passive_data.ver_old}
        master_index={master_index}
        info={passive_data.info}
        gear={false}
        chara_id_passoff={passive_data.pass_new.chara_id}
        header={passive_data.header}
        />
    )
}