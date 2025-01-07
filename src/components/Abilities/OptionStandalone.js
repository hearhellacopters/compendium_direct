import React, { useState, useEffect } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import DefaultTippy from '../TippyDefaults';
import { ObjectView } from 'react-object-view'
import ReplacerCharacter from "../ReplacerCharacter";
import CharacterFaceFormatting from "../Characters/CharacterFaceFormatting";
import options_trans_handler from "../../processing/abilities/options_trans_handler";

export default function OptionStandalone ({
    character_option,
    ver,
    master_index,
    enemy,
    enemy_names,
    formatting
}) {

    const form = {formatting:formatting}

    const char_id = master_index.charid

    const [showraw, setshowraw] = useStateIfMounted(false)

    const showmeraw = (current) => {
        if (current == false) {
            setshowraw(true)
        } else {
            setshowraw(false)
        }
    }

    const transdata = options_trans_handler(
        enemy ? "enemy" : "character", //character or enemy
        character_option, //option data
        "solo", //solo or attached
        true, //show command ids

        master_index,
        ver
    )

    const lastkey = transdata.passives == undefined ? 0 : (transdata.passives.length) - 1

    return (
        <div className="buffunit">
            <div className="infoholder">
                {character_option.chara_id_ != undefined && character_option.enemy_id == undefined ?
                    <div className="infotitleholder">
                        <div className="faceandiconholder">
                            <CharacterFaceFormatting char_id={char_id} id={character_option.chara_id_} />
                        </div>
                    </div>
                : ""}
                {enemy && character_option.enemy_id != undefined ?
                 <div className="infotitleholder">
                    <div className="faceandiconholder">
                        <img alt={character_option.enemy_id} className={`enemy_make_face`} src={`./images/static/enemy/face/stl_mon_face_${(character_option.enemy_id-1).toString().padStart(4, '0')}out.png`} />
                    </div>
                </div>
                :""}
                <div className={character_option.chara_id_ != undefined ? "Buffbanner iconbuffer infonameholder nobuffpadding " : "Buffbanner infonameholderenemybuff"}>
                    <div className="spacearound">
                        <DefaultTippy content={"Click to show raw"}>
                            <div onClick={() => showmeraw(showraw)} className="displayfex clicky">
                                {enemy?
                                `${character_option.enemy_id && enemy_names[character_option.enemy_id] && enemy_names[character_option.enemy_id].name} - #${character_option.enemy_id} / ID:${character_option.data_id}`
                                :`${char_id[character_option.chara_id_] && char_id[character_option.chara_id_].CharacterName} - #${character_option.data_id}`}
                            </div>
                        </DefaultTippy>
                    </div>
                    <div>
                        {character_option.option_type_ != undefined ?
                            ReplacerCharacter(` - ${transdata && transdata.title_str && transdata.title_str}`,form) :
                            ReplacerCharacter(` - Unknown Type - #${character_option.option_type_}`,form)}
                    </div>
                </div>
                <div className={character_option.chara_id_ != undefined ? "Buffbase infobase nobuffpadding" : "Buffbase infobase"}>
                    <div>
                        {`\xa0${transdata.label_str == "" && transdata.passives.length == 0 ? "-" : "┬"} `}
                        {transdata && transdata.title_str && ReplacerCharacter(transdata.title_str,form)}
                    </div>
                    {transdata && transdata.passives && transdata.passives.length != 0 ?
                        <div>
                            {transdata.passives.map((self, key) => {
                                return (
                                    <div key={key}>
                                        {ReplacerCharacter(`\xa0${transdata && transdata.label_str == "" && key == lastkey ? "└─ Active" : "├─ Active"} <${self.loc_tag && self.loc_tag}> [${self.name}] #${self.id} `,form)}
                                    </div>
                                )
                            })}
                        </div>
                    : ""}
                    {transdata && transdata.label_str != "" ?
                        <div>
                            {`\xa0${"└─"} `}{ReplacerCharacter(transdata.label_str,form)}
                        </div>
                        : ""
                    }
                    {showraw == true ?
                        <span className='react-json-view'>
                        <ObjectView
                        options={
                            {
                            hideDataTypes: true,
                            expandLevel: 1
                            }
                        }
                        data={character_option} />
                        </span>
                        : ""}
                </div>
            </div>
        </div>
    )
}