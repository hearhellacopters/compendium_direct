import React from "react";
import EquipmentPassivesFormatting from "./EquipmentPassivesFormatting";
import EquipmentPassiveDif from "./EquipmentPassiveDif";

export default function EquipmentPassiveDifHandler({
    passive_data,
    master_index,
    ProcessedCharacters,
    debugging
}){
    return(
        passive_data.new_only == true?
        <EquipmentPassivesFormatting
        gear={passive_data.equ_pass_new}
        ver={passive_data.ver_new}
        loc={"gear"}
        master_index={master_index}
        debugging={debugging}
        formatting={true}
        />
        :
        <EquipmentPassiveDif
        passive_ability_new={passive_data.equ_pass_new}
        ver_new={passive_data.ver_new}
        passive_ability_old={passive_data.equ_pass_old}
        ver_old={passive_data.ver_old}
        master_index={master_index}
        info={passive_data.info}
        chara_id_passoff={passive_data.pass_new.chara_id}
        />
    )
}