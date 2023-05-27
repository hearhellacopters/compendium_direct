import React, { useState, useEffect } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import Format_Cleaner from '../../../../processing/Format_Cleaner'
import DefaultTippy from '../../../../formatting/TippyDefaults';
import Char_Face_Maker from '../Char_Face_Maker'
import replacer_titles from '../../../../processing/replacer_titles'
import replacer_buff from '../../../../processing/replacer_buffcontent'
import ReactJson from '@microlink/react-json-view'
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import Passive_Effects_Dif from "./Passive_Effects_Dif";
import Passive_Link_Dif from "./Passive_Link_Dif";
const Diff = require('diff');

const Passive_Ability_Dif = ({
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
}) => {

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


    const makediff = (oldText, newText) => {
        const JPDESCREPLACE = Diff.diffTrimmedLines(oldText + "\n", newText + "\n", { newlineIsToken: false })
        const output = JPDESCREPLACE.map(text => `${text.added == true ? '~~' + text.value + '~.~' : ""}${text.removed == true ? '^^' + text.value + '^.^' : ""}${text.removed == undefined && text.added == undefined ? text.value : ""}`).join("")
        return (
            output
        )
    }

    const [passive_new, setpassive_new] = useState(
        Passive_Effects_Dif(
        passive_ability_new.passive,
        master_index,
        ver_new))

    const [passive_old, setpassive_old] = useState(
        Passive_Effects_Dif(
            passive_ability_old.passive,
            master_index,
            ver_old))

    const [force_new, setforce_new] = useState("")

    const [force_old, setforce_old] = useState("")

    useEffect(() => {
        if (passive_old != undefined && passive_new != undefined) {
            setpassivecompare(makediff(passive_old.replace(/\s+$/g, ""), passive_new.replace(/\s+$/g, "")))
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
                                    <Char_Face_Maker char_id={char_id} id={chara_id_passoff == undefined ? passive_ability_new.CharID : chara_id_passoff} loc={"passive"} />
                                </div>
                            </div>
                        : ""}
                    {header == false ? "" : ver_new == "JP" ?
                        <div className={`${passive_ability_new.CharID != undefined && passive_ability_new.passive.gear == undefined ? `iconbuffer infonameholder nobuffpadding ` : chara_id_passoff == undefined ? `infonameholderenemybuff ` : `Buffbanner iconbuffer infonameholder nobuffpadding `}`} onClick={showmeraw}>
                            <div className="spacearound" onClick={showmeraw}>
                                <DefaultTippy content={"Scroll to top"}>
                                    <div onClick={() => window.scrollTo(0, 0)} className="displayfex clicky">
                                        <span className={tag != undefined ? tag : passive_ability_new.passive.loc_tag != undefined ? passive_ability_new.passive.loc_tag : "smallpassive automarg"}></span>
                                        {"\xa0"}
                                    </div>
                                </DefaultTippy>
                                <div className="infotitle displayfex">
                                    {passive_ability_new.passive.glname != undefined ?
                                        replacer_titles(`${passive_ability_new.passive.glname} - #${passive_ability_new.passive.pa_id}`, "tl") :
                                        replacer_titles(`Unknown - #${passive_ability_new.passive.pa_id}`, "tl")}
                                </div>
                            </div>
                            <div className="displayfex ">
                                <div className="abilityJPname">
                                    {passive_ability_new.passive.name != undefined ?
                                        replacer_titles(`${Format_Cleaner(passive_ability_new.passive.name)} - #${passive_ability_new.passive.pa_id}`, "tl") :
                                        replacer_titles(`Unknown - #${passive_ability_new.passive.pa_id}`, "tl")}
                                </div>
                            </div>
                            {info != undefined?
                                <div className='buffglreworkbanner passiveinfobase'>{info}</div>
                            :""}
                        </div>
                        :
                        <div className={`${passive_ability_new.CharID != undefined && passive_ability_new.passive.gear == undefined ? `iconbuffer infonameholder nobuffpadding ` : chara_id_passoff == undefined ? `infonameholderenemybuff ` : `iconbuffer infonameholder nobuffpadding `}`} onClick={showmeraw}>
                            <div className="spacearound">
                                <DefaultTippy content={"Scroll to top"}>
                                    <div onClick={() => window.scrollTo(0, 0)} className="displayfex clicky">
                                        <span className={tag != undefined ? tag : passive_ability_new.passive.loc_tag != undefined ? passive_ability_new.passive.loc_tag : "smallpassive automarg"}></span>
                                        {"\xa0"}
                                    </div>
                                </DefaultTippy>
                                <div className="infotitle displayfex">
                                    {passive_ability_new.passive.name != undefined ?
                                        replacer_titles(`${Format_Cleaner(passive_ability_new.passive.name)} - #${passive_ability_new.passive.pa_id}`, "tl")
                                        :
                                        "Unknown"}
                                </div>
                            </div>
                            <div className="displayfex ">
                                <div className="abilityJPname ">
                                    {passive_ability_new.passive.jpname != undefined ?
                                        replacer_titles(`${Format_Cleaner(passive_ability_new.passive.jpname)} - #${passive_ability_new.passive.pa_id}`, "tl") :
                                        `Unknown - #${passive_ability_new.passive.pa_id}`}
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

                        {replacer_buff(passivecompare)}
                            
                        {passive_ability_new.force != undefined ?
                            <div className="forceaddtach infonameholderenemybuff default_passive">
                                <div className='BonusHPDamage' />
                                {replacer_buff(forcecompare)}
                            </div>
                            : ""}
                            
                        {showraw == true ?
                            <ReactJson iconStyle={"square"} quotesOnKeys={false} name={"Raw"} displayDataTypes={false} collapsed={false} theme={"threezerotwofour"} src={passive_ability_new} />
                            : ""}
                    </div>
                </LazyLoadComponent>
            </div>
        </div>
    )
}
export default Passive_Ability_Dif