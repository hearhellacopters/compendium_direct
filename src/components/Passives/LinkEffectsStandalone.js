import React from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import passive_link_trans from "../../processing/passives/passive_link_trans";
import ReplacerCharacter from "../ReplacerCharacter";
import CharacterFaceFormatting from "../Characters/CharacterFaceFormatting";
import DefaultTippy from '../TippyDefaults';
import { ObjectView } from 'react-object-view'

export default function LinkEffectsStandalone ({
    link_effect,
    ver,
    loc,
    master_index,
    formatting
}) {

    const form ={formatting:formatting,updown:true}

    const link_str = passive_link_trans(
        link_effect,
        master_index,
        ver,
        link_effect.player_id
    )

    const char_id = master_index.charid
    const passivenames = master_index.passivenames
    const equipmentpassivenames = master_index.equipmentpassivenames

    const [showraw, setshowraw] = useStateIfMounted(false)

    const showmeraw = (current) => {
        if (current == false) {
            setshowraw(true)
        } else {
            setshowraw(false)
        }
    }

    var require_passive_str = ""

    if (link_effect.require_passive != -1) {
        require_passive_str = passivenames[link_effect.require_passive] && passivenames[link_effect.require_passive].name
    }

    var require_weapon_skill_str = ""
    if (link_effect.require_weapon_skill != -1) {
        require_weapon_skill_str = equipmentpassivenames[link_effect.require_weapon_skill] && equipmentpassivenames[link_effect.require_weapon_skill].name
    }

    return (
        <div className="buffunit">
            <div className="infoholder">
                <div className="infotitleholder">
                    <DefaultTippy content="Display Raw" className="tooltip" >
                        <div className="faceandiconholder clicky" onClick={() => showmeraw(showraw)}>
                            <CharacterFaceFormatting char_id={char_id} id={link_effect.player_id} loc={loc} />
                        </div>
                    </DefaultTippy>
                </div>
                <div className="Buffbanner iconbuffer infonameholder nobuffpadding">
                    {require_weapon_skill_str != "" ?
                        <span className={equipmentpassivenames[link_effect.require_weapon_skill] && equipmentpassivenames[link_effect.require_weapon_skill].loc_tag + " inline"}></span>
                        : ""}
                    {` ${require_weapon_skill_str != "" ? require_weapon_skill_str : ""}`}
                    {require_passive_str != "" ?
                        <span className={passivenames[link_effect.require_passive] && passivenames[link_effect.require_passive].loc_tag}></span>
                        : ""}
                    {`${require_weapon_skill_str != "" && require_passive_str != "" ? ` & ` : ""}`}
                    {`${require_passive_str != "" ? require_passive_str : ""}`}
                    {` - #${link_effect.link_id}`}
                    <div className="abilityJPname ">
                        {equipmentpassivenames[link_effect.require_weapon_skill] != undefined ?
                            equipmentpassivenames[link_effect.require_weapon_skill].jpname && equipmentpassivenames[link_effect.require_weapon_skill].jpname.replace(/(.*?)(<)(.*?)(>)(.*?)/gm, '$1&lt;$3&gt;$5')
                            : ""}{` - ${link_effect.link_id}`}
                    </div>
                </div>
                <div className="Buffbase infobase nobuffpadding">
                    {ReplacerCharacter(link_str,form)}
                    {showraw == true ?
                        <span className='react-json-view'>
                        <ObjectView
                        options={
                            {
                            hideDataTypes: true,
                            expandLevel: 1
                            }
                        }
                        data={link_effect} />
                        </span>
                        : ""}
                </div>
            </div>
        </div>
    )
}