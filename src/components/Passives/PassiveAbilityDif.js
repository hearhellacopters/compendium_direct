import React, { useState, useEffect } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import Format_Cleaner from '../../processing/format_cleaner'
import DefaultTippy from '../TippyDefaults';
import CharacterFaceFormatting from '../Characters/CharacterFaceFormatting'
import ReplacerCharacter from '../ReplacerCharacter'
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Passive_Effects_Dif from "../../processing/passives/passive_effects_dif";
import Passive_Link_Dif from "../../processing/passives/passive_link_dif";
import { ObjectView } from 'react-object-view'
import makediff from "../../processing/makediff";

export default function PassiveAbilityDif ({
    passive_ability_new,
    ver_new,
    passive_ability_old,
    ver_old,
    master_index,
    info,
    gear,
    tag,
    chara_id_passoff,
    header
}){

    const form = {updown:true,diffing:true}

    const char_id = master_index.charid

    const [passivecompare, setpassivecompare] = useState("");
    const [forcecompare, setforcecompare] = useState("");
    const [showraw, setshowraw] = useStateIfMounted(false)

    const showmeraw = (e) => {
        if (e.shiftKey) {
            if (showraw == false) {
                setshowraw(true)
            } else {
                setshowraw(false)
            }
        }
    }

    const [passive_new, setpassive_new] = useState(
        Passive_Effects_Dif(
        passive_ability_new,
        master_index,
        ver_new))

    const [passive_old, setpassive_old] = useState(
        Passive_Effects_Dif(
            passive_ability_old,
            master_index,
            ver_old))

    const [force_new, setforce_new] = useState("")

    const [force_old, setforce_old] = useState("")

    useEffect(() => {
        if (passive_new != undefined) {
            if(passive_old != undefined){
                setpassivecompare(makediff(passive_old.replace(/\s+$/g, ""), passive_new.replace(/\s+$/g, "")))
            } else {
                setpassivecompare('~~' + passive_new+ '~.~')
            }
        }

        if(passive_ability_new.force != undefined){
            const old_text = passive_ability_old.force.map(self=>{
                Passive_Link_Dif(
                    self,
                    master_index,
                    ver_new
                )
            })
            setforce_old(old_text)
            const new_text = passive_ability_new.force.map(self=>{
                Passive_Link_Dif(
                    self,
                    master_index,
                    ver_new
                )
            })
            setforce_new(new_text)
            setforcecompare(makediff(force_old.replace(/\s+$/g, ""), force_new.replace(/\s+$/g, "")))
        }
    }, [passive_old, passive_new, force_new, force_old, ver_new,  master_index, passive_ability_new, passive_ability_old])


    return (
        <div className={gear == true ? "margtop" : header == false ? "" : `buffunit`}>
            <div className={"infoholder"} style={{ minHeight: header == false ? "" :`50px` }}>
                <LazyLoadComponent>
                    {header == false ? "" : passive_ability_new.CharID != undefined || chara_id_passoff != undefined ?
                        passive_ability_new.gear == true ? "" :
                            <div className="infotitleholder">
                                <div className="faceandiconholder">
                                    <CharacterFaceFormatting char_id={char_id} id={chara_id_passoff == undefined ? passive_ability_new.CharID : chara_id_passoff} loc={"passive"} />
                                </div>
                            </div>
                        : ""}
                    {header == false ? "" : ver_new == "JP" ?
                        <div className={`${passive_ability_new.CharID != undefined && passive_ability_new.gear == undefined ? `iconbuffer infonameholder nobuffpadding ` : chara_id_passoff == undefined ? `infonameholderenemybuff ` : `Buffbanner iconbuffer infonameholder nobuffpadding `}`} onClick={showmeraw}>
                            <div className="spacearound" onClick={showmeraw}>
                                <DefaultTippy content={"Scroll to top"}>
                                    <div onClick={() => window.scrollTo(0, 0)} className="displayfex clicky">
                                        {ReplacerCharacter(`<${tag != undefined ? tag : passive_ability_new.loc_tag != undefined ? passive_ability_new.loc_tag : "smallpassive"}>`)}
                                        {"\xa0"}
                                    </div>
                                </DefaultTippy>
                                <div className="infotitle displayfex">
                                    {passive_ability_new.glname != undefined ?
                                        ReplacerCharacter(`${passive_ability_new.glname} - #${passive_ability_new.pa_id}`) :
                                        ReplacerCharacter(`Unknown - #${passive_ability_new.pa_id}`)}
                                </div>
                            </div>
                            <div className="displayfex ">
                                <div className="abilityJPname">
                                    {passive_ability_new.name != undefined ?
                                        ReplacerCharacter(`${Format_Cleaner(passive_ability_new.name)} - #${passive_ability_new.pa_id}`) :
                                        ReplacerCharacter(`Unknown - #${passive_ability_new.pa_id}`)}
                                </div>
                            </div>
                            {info != undefined?
                                <div className='buffglreworkbanner passiveinfobase'>{info}</div>
                            :""}
                        </div>
                        :
                        <div className={`${passive_ability_new.CharID != undefined && passive_ability_new.gear == undefined ? `iconbuffer infonameholder nobuffpadding ` : chara_id_passoff == undefined ? `infonameholderenemybuff ` : `iconbuffer infonameholder nobuffpadding `}`} onClick={showmeraw}>
                            <div className="spacearound">
                                <DefaultTippy content={"Scroll to top"}>
                                    <div onClick={() => window.scrollTo(0, 0)} className="displayfex clicky">
                                        <span className={`${tag != undefined ? tag : passive_ability_new.loc_tag != undefined ? passive_ability_new.loc_tag : "smallpassive automarg"} inline`}></span>
                                        {"\xa0"}
                                    </div>
                                </DefaultTippy>
                                <div className="infotitle displayfex">
                                    {passive_ability_new.name != undefined ?
                                        ReplacerCharacter(`${Format_Cleaner(passive_ability_new.name)} - #${passive_ability_new.pa_id}`)
                                        :
                                        "Unknown"}
                                </div>
                            </div>
                            <div className="displayfex ">
                                <div className="abilityJPname ">
                                    {passive_ability_new.jpname != undefined ?
                                        ReplacerCharacter(`${Format_Cleaner(passive_ability_new.jpname)} - #${passive_ability_new.pa_id}`) :
                                        `Unknown - #${passive_ability_new.pa_id}`}
                                </div>
                            </div>
                            {info != undefined?
                                <div className='buffglreworkbanner passiveinfobase'>{info}</div>
                            :""}
                        </div>
                    }
                    <div className={`bluebase enemyabilityinfobase nobuffpadding`}>

                        {info != undefined && header == false?
                            <div className='buffglreworkbanner passiveinfobase'>{info}</div>
                        :""}

                        {ReplacerCharacter(passivecompare,form)}
                            
                        {passive_ability_new.force != undefined ?
                            <div className="forceaddtach infonameholderenemybuff default_passive">
                                <div className='BonusHPDamage' />
                                {ReplacerCharacter(forcecompare,form)}
                            </div>
                            : ""}
                            
                        {showraw == true ?
                            <span className='react-json-view'>
                                <ObjectView 
                                options={
                                    {
                                      hideDataTypes: true,
                                      expandLevel: 1
                                    }
                                  }
                                data={passive_ability_new} 
                                />
                            </span>
                            : ""}
                    </div>
                </LazyLoadComponent>
            </div>
        </div>
    )
}