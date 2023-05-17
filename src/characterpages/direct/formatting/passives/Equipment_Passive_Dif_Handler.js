import React from "react";
import Equipment_Passive_Handler from "../../Equipment_Passives_Handler";
import Equipment_Passive_Dif from "./Equipment_Passive_Dif";

const Equipment_Passive_Dif_Handler = ({
    passive_data,
    master_index,
    ProcessedCharacters,
}) =>{
    return(
        passive_data.new_only == true?
        <Equipment_Passive_Handler
        gear={passive_data.equ_pass_new}
        ver={passive_data.ver_new}
        loc={"gear"}
        master_index={master_index}
        formatting={true}
        />
        :
        <Equipment_Passive_Dif
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
export default Equipment_Passive_Dif_Handler