import React from "react";
import AilmentCharacterDifFormatting from "./AilmentDifFormatting";
import AilmentDataFormatting from "./AilmentDataFormatting";

export default function AilmentCharacterDifHandler({
    buff_data,
    master_index,
    ProcessedCharacters,
}){
    
    return(
        buff_data.new_only == true ? 
        <AilmentDataFormatting
            file={"default"}
            loc={undefined}
            ver={buff_data.ver_new}
            ailment_data={buff_data.ailment_new.default == true ? buff_data.ailment_new.cast : buff_data.ailment_new}

            slider={false}
            rank={buff_data.ailment_new.default == true ? buff_data.ailment_new.rank_id : buff_data.ailment_new.arank}
            arg1={buff_data.ailment_new.default == true ? buff_data.ailment_new.arg1 : buff_data.ailment_new.aarg1}
            arg2={buff_data.ailment_new.default == true ? buff_data.ailment_new.arg2 : buff_data.ailment_new.aarg2}
            castlocation={false}
            alt_rank={buff_data.ailment_new.aranka}
            alt_aug1={buff_data.ailment_new.aarg1a}
            alt_aug2={buff_data.ailment_new.aarg2a}
            formatting={true}
            ProcessedCharacters={ProcessedCharacters}
            turns={buff_data.ailment_new.default == true ? buff_data.ailment_new.turn : buff_data.ailment_new.alife}
            info={buff_data.info}
            character_face={true}
            master_index={master_index}
        />
        :
        <AilmentCharacterDifFormatting
            buff_new={buff_data.ailment_new}
            ver_new={buff_data.ver_new}
            buff_old={buff_data.ailment_old}
            ver_old={buff_data.ver_old}
            master_index={master_index}
            info={buff_data.info}
            ProcessedCharacters={ProcessedCharacters}
            castlocation={false}
        />
    )
}