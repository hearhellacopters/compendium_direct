import React from "react";
import options_trans_handler from "../../processing/abilities/options_trans_handler";
import ReplacerCharacter from '../ReplacerCharacter'

export default function OptionParsFormatting({
    character_option,
    ver,
    formatting,
    all_options,
    master_index,
    enemy
}){

    const form = {formatting:formatting}

    if (all_options != undefined && all_options == false && character_option.active == false) {
        return ""
    }

    const transdata = options_trans_handler(
        enemy ? "enemy" : "character", //character or enemy
        character_option, //option data
        "attached", //solo or attached
        true, //show command ids

        master_index,
        ver
    )

    return (
        < >
            <div className="small_tags">
                {transdata && transdata.title_str && ReplacerCharacter(`\xa0${transdata.label_str == "" ? "-" : "┬"} ${transdata.title_str}${transdata && transdata.passives && transdata.passives.length != 0 ? ` w/${transdata.passives.map(self => ` <${self.loc_tag && self.loc_tag}>`)}` : ""}`,form)}
            </div>
            {transdata && transdata.label_str != "" ?
                <div className="small_tags">
                    {ReplacerCharacter(`\xa0└─ ${transdata.label_str}`,form)}
                </div>
                : ""
            }
        </>
    )
}