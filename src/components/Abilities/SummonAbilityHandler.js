import React from "react";
import AbilityPars from "./AbilityPars";
import PassiveAbilityFormatting from "../Passives/PassiveAbilityFormatting";

export default function SummonAbilityHandler({
    summon_ability,
    ver,
    loc,
    file,
    master_index,
    debugging,
    formatting
}){
    return(
        <>
        {summon_ability.summon_ability_type_id == 2 ?
        <AbilityPars
            character_ability={summon_ability}
            loc={loc}
            ver={ver}
            file={file}
            formatting={formatting}
            master_index={master_index}
            debugging={debugging}
        />
        :
        <AbilityPars
            character_ability={summon_ability}
            loc={loc}
            ver={ver}
            file={file}
            formatting={formatting}
            master_index={master_index}
            summon={true}
            info={summon_ability.Name}
            debugging={debugging}
        />
        }
        {summon_ability.passive_data != undefined ?
        <PassiveAbilityFormatting
            passive_ability={summon_ability.passive_data}
            loc={loc}
            ver={ver}
            file={file}
            debugging={debugging}
            master_index={master_index}
            formatting={formatting}
        />
        :""}
        </>
    )
}