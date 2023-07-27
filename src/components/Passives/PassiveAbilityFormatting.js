import React, { useEffect } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import Format_Cleaner from '../../processing/format_cleaner'
import translater from '../../processing/translater_characters'
import DefaultTippy from '../../components/TippyDefaults';
import { useDispatch, useSelector } from "react-redux";
import { getTransNames } from '../../redux/ducks/transnames';
import CharacterFaceFormatting from '../Characters/CharacterFaceFormatting'
import AilmentDefaultPassoff from "../Buffs/AilmentDefaultPassoff";
import AilmentDataFormatting from "../Buffs/AilmentDataFormatting";
import PassiveEffectsHandoff from "./PassiveEffectsHandoff";
import { StartsInTimer } from '../../components/Timers'
import passive_link_trans from "../../processing/passives/passive_link_trans";
import ReplacerCharacter from '../ReplacerCharacter'
import { LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';
import { ObjectView } from 'react-object-view'
import ailment_level_icon from "../../processing/ailment/ailment_level_icon";

function PassiveAbilityFormatting({
    passive_ability,
    loc,
    ver,
    file,
    master_index,
    cp_cost,
    board_cost,
    chara_id_passoff,
    sphere_type,
    sphere_letter,
    release,
    formatting,
    gear,
    cost_overide,
    cp_overide,
    tag_overide,
    banner_color,
    base_color,
    link,
    scrollPosition
}){
    const form = {formatting:formatting}
    const forma = {formatting:formatting,updown:true}

    const char_id = master_index.charid
    const param_id = master_index.passive_effects.param_id

    const dispatch = useDispatch();

    const transnames = useSelector((state) =>
        state.transnames.transnames
    );

    const [showoptions, setshowoptions] = useStateIfMounted(passive_ability && passive_ability.options && passive_ability.options.length <= 5 ? true : false)
    const [showraw, setshowraw] = useStateIfMounted(false)
    const [trans, settrans] = useStateIfMounted()
    const [showtrans, setshowtrans] = useStateIfMounted(false)
    const [selectedbuff, setselectedbuff] = useStateIfMounted([]);

    useEffect(() => {
        let mounted = true
        if (mounted && transnames == undefined && showtrans == true) {
            dispatch(getTransNames());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, transnames, showtrans]);

    useEffect(() => {
        const text = Format_Cleaner(passive_ability.desc).replace(/\\n/gm, "\x0A")
        if (transnames != undefined && showtrans == true) {
            const translate = translater(text, transnames)
            settrans(translate)
        }
    }, [settrans, transnames, showtrans, passive_ability.desc]);

    const showmeraw = (e) => {
        if (e.shiftKey) {
            if (showraw == false) {
                setshowraw(true)
            } else {
                setshowraw(false)
            }
        }
    }

    const showmeoptions = (current) => {
        if (current == false) {
            setshowoptions(true)
        } else {
            setshowoptions(false)
        }
    }

    async function doTrans(text) {
        setshowtrans((prevValue) => !prevValue)
    }

    const listByChar = {}
    if (passive_ability.defaults != undefined) {
        //make list by char
        if (passive_ability.CharID != undefined) {
            Object.assign(listByChar, { [passive_ability.CharID]: { list: passive_ability.defaults, char_id: passive_ability.CharID, name: char_id[passive_ability.CharID].CharacterName, jpname: char_id[passive_ability.CharID].JPName } })
        }
    }

    const bufflist = []
    if (passive_ability.casts != undefined) {
        const castholder = {}
        passive_ability.casts && passive_ability.casts.map(second => {
            Object.assign(castholder, { [second.id]: { ...second, rank_id: 1, arg1: 1, arg2: 1 } })
        })

        if (castholder != {}) {
            Object.values(castholder).map(self => {
                bufflist.push(self)
            })
        }
    }

    const buffselect = (e) => {
        if (selectedbuff.id == e.id) {
            setselectedbuff([])
        } else {
            setselectedbuff(e)
        }
    }

    var sphere = undefined

    if (sphere_letter != undefined) {
        const letter = {
            1: "a",
            2: "b",
            3: "c",
            4: "d",
            5: "e"
        }
        const type = {
            1: "ex",
            2: "rf"
        }
        sphere = `${letter[sphere_letter]}${type[sphere_type]}`
    }

    const ct = new Date().getTime();

    var rData = undefined
    if (release != undefined) {
        if (ver == "JP") {
            const date_check = new Date(`${release.toString().replace(/ /, "T")}.000+09:00`);
            if (date_check && date_check.getTime() > ct) {
                rData = date_check
            }
        } else {
            const date_check2 = new Date(`${release.toString().replace(/ /, "T")}Z`);
            if (date_check2 && date_check2.getTime() > ct) {
                rData = date_check2
            }
        }
    }

    const e11d = param_id[passive_ability.effect_value01_param_id] && param_id[passive_ability.effect_value01_param_id].param_id
    const e12d = param_id[passive_ability.effect_value02_param_id] && param_id[passive_ability.effect_value02_param_id].param_id
    const e13d = param_id[passive_ability.effect_value03_param_id] && param_id[passive_ability.effect_value03_param_id].param_id

    const add_formatting = (text, switching) => {
        if (switching == "tl") {
            let replacement = text
            replacement = text == undefined ? "" : text.replace(/#e11d/gm, e11d)
            replacement = replacement == "" ? "" : replacement.replace(/#e12d/gm, e12d)
            replacement = replacement == "" ? "" : replacement.replace(/#e13d/gm, e13d)
            return ReplacerCharacter(replacement,form)
        }
        if (switching == "bu") {
            let replacement = text
            replacement = text == undefined ? "" : text.replace(/#e11d/, e11d)
            replacement = replacement == "" ? "" : replacement.replace(/#e12d/, e12d)
            replacement = replacement == "" ? "" : replacement.replace(/#e13d/, e13d)
            return ReplacerCharacter(replacement,form)
        }
    }

    return (
        <div className={gear == true ? "margtop" : `buffunit`}>
            <LazyLoadComponent
            scrollPosition={scrollPosition}
            placeholder={<div className="infoholder" style={{ minHeight: `250px` }}/>}
            >
            <div className="infoholder">
            
                {passive_ability.CharID != undefined || chara_id_passoff != undefined ?
                    gear == true ? "" :
                        <div className="infotitleholder">
                            <div className="faceandiconholder">
                                <CharacterFaceFormatting char_id={char_id} id={chara_id_passoff == undefined ? passive_ability.CharID : chara_id_passoff} loc={loc} link={link} />
                            </div>
                        </div>
                    : ""}
                {ver == "JP" ?
                    <div className={`${passive_ability.CharID != undefined && gear == undefined ? `iconbuffer infonameholder nobuffpadding ` : chara_id_passoff == undefined ? `infonameholderenemybuff ` : `iconbuffer infonameholder nobuffpadding `}${banner_color == undefined ? "Buffbanner" : banner_color}`} onClick={showmeraw}>
                        <div className="spacearound">
                            <DefaultTippy content={"Scroll to top"}>
                                <div onClick={() => window.scrollTo(0, 0)} className="displayfex clicky">
                                    {sphere == undefined ?
                                        ReplacerCharacter(`<${tag_overide != undefined ? tag_overide : passive_ability.loc_tag != undefined ? passive_ability.loc_tag : "smallpassive"}>`)
                                        : ""}
                                    {sphere != undefined ?
                                        <span className={sphere}></span>
                                        : ""}
                                    {"\xa0"}
                                </div>
                            </DefaultTippy>
                            <div className="infotitle displayfex  ">
                                {passive_ability.glname != undefined ?
                                    add_formatting(`${passive_ability.glname} - #${passive_ability.pa_id}`, "tl") :
                                    add_formatting(`Unknown - #${passive_ability.pa_id}`, "tl")}
                            </div>
                            {board_cost != undefined ?
                                <div className="CPReqHolder">
                                    <span className="unique">{`Cost `}</span>
                                    <span className="BoardPointIcon CPIconSmaller" />
                                    <span>
                                        {board_cost}
                                    </span>
                                </div>
                                : ""}
                            {cost_overide != undefined ?
                                <div className="CPReqHolder">
                                    <span className="unique">{`Cost `}</span>
                                    <span className="BoardPointIcon CPIconSmaller" />
                                    <span>
                                        {cost_overide}
                                    </span>
                                </div>
                                : ""}
                        </div>
                        <div className="displayfex ">
                            <div className="abilityJPname ">
                                {passive_ability.name != undefined ?
                                    add_formatting(`${Format_Cleaner(passive_ability.name)} - #${passive_ability.pa_id}`, "tl") :
                                    add_formatting(`Unknown - #${passive_ability.pa_id}`, "tl")}
                            </div>
                            {cp_cost != undefined ?
                                <div className="CPReqHolder">
                                    <span className="unique">{`Req. `}</span>
                                    <span className="CPIcon CPIconSmaller" />
                                    <span>
                                        {" " + cp_cost}
                                    </span>
                                </div>
                                : ""}
                            {cp_overide != undefined ?
                                <div className="CPReqHolder">
                                    <span className="unique">{`Req. `}</span>
                                    <span className="CPIcon CPIconSmaller" />
                                    <span>
                                        {" " + cp_overide}
                                    </span>
                                </div>
                                : ""}
                        </div>
                        {rData != undefined ?
                            <StartsInTimer
                                expiryTimestamp={rData}
                                JPFlag={ver == "JP" ? true : false}
                            />
                            : ""}
                    </div>
                    :
                    <div className={`${passive_ability.CharID != undefined && gear == undefined ? `iconbuffer infonameholder nobuffpadding ` : chara_id_passoff == undefined ? `infonameholderenemybuff ` : `iconbuffer infonameholder nobuffpadding `}${banner_color == undefined ? "Buffbanner" : banner_color}`} onClick={showmeraw}>
                        <div className="spacearound">
                            <DefaultTippy content={"Scroll to top"}>
                                <div onClick={() => window.scrollTo(0, 0)} className="displayfex clicky">
                                    {sphere == undefined ?
                                        ReplacerCharacter(`<${tag_overide != undefined ? tag_overide : passive_ability.loc_tag != undefined ? passive_ability.loc_tag : "smallpassive"}>`)
                                        : ""}
                                    {sphere != undefined ?
                                        <span className={sphere}></span>
                                        : ""}
                                    {"\xa0"}
                                </div>
                            </DefaultTippy>
                            <div className="infotitle displayfex">
                                {passive_ability.name != undefined ?
                                    add_formatting(`${Format_Cleaner(passive_ability.name)} - #${passive_ability.pa_id}`, "tl")
                                    :
                                    "Unknown"}
                            </div>
                            {board_cost != undefined ?
                                <div className="CPReqHolder">
                                    <span className="unique">{`Cost `}</span>
                                    <span className="BoardPointIcon CPIconSmaller" />
                                    <span>
                                        {" " + board_cost}
                                    </span>
                                </div>
                                : ""}
                        </div>
                        <div className="displayfex ">
                            <div className="abilityJPname ">
                                {passive_ability.jpname != undefined ?
                                    add_formatting(`${Format_Cleaner(passive_ability.jpname)} - #${passive_ability.pa_id}`, "tl") :
                                    `Unknown - #${passive_ability.pa_id}`}
                            </div>
                            {cp_cost != undefined ?
                                <div className="CPReqHolder">
                                    <span className="unique">{`Req. `}</span>
                                    <span className="CPIcon CPIconSmaller" />
                                    <span>
                                        {" " + cp_cost}
                                    </span>
                                </div>
                                : ""}
                            {cp_overide != undefined ?
                                <div className="CPReqHolder">
                                    <span className="unique">{`Req. `}</span>
                                    <span className="CPIcon CPIconSmaller" />
                                    <span>
                                        {" " + cp_overide}
                                    </span>
                                </div>
                                : ""}
                        </div>
                        {rData != undefined ?
                            <StartsInTimer
                                expiryTimestamp={rData}
                                JPFlag={ver == "JP" ? true : false}
                            />
                            : ""}
                    </div>
                }
                <div className={`${passive_ability.CharID != undefined && gear == undefined ? "infobase nobuffpadding " : chara_id_passoff == undefined ? "infobase " : "infobase nobuffpadding "}${base_color == undefined ? "Buffbase" : base_color}`}>

                    {trans != undefined && showtrans == true ?
                        add_formatting(trans+"\n", "bu")
                        :
                        add_formatting(Format_Cleaner(passive_ability.desc+"\n"),"bu")
                    }
                    {ver == "JP" ?
                        <div className="clicky updatelink contents" onClick={() => doTrans()} >Translate (Beta)</div>
                        : ""}
                    <div className={`${passive_ability.effect_ == undefined && passive_ability.effect__1 == undefined ? "" : `infonameholderenemybuff default_passive ${base_color != undefined ? "Buffbase" : "newbluepassive"}`}`}>
                        <PassiveEffectsHandoff
                            passive_ability={passive_ability}
                            master_index={master_index}
                            ver={ver}
                            formatting={formatting}
                            base_color={base_color != undefined ? "Buffbase" : undefined}
                        />
                    </div>
                    {passive_ability.force != undefined ?
                        <div className="forceaddtach infonameholderenemybuff default_passive">
                            <div className='BonusHPDamage' />
                            {passive_ability.force.map(link_effect => (
                                ReplacerCharacter(passive_link_trans(
                                    link_effect,
                                    master_index,
                                    ver,
                                    chara_id_passoff == undefined ? passive_ability.CharID : chara_id_passoff
                                ),form)
                            ))}
                        </div>
                        : ""}
                    {passive_ability.options != undefined ?
                        <div className={`default_passive infonameholderenemybuff ${base_color == undefined ? "Buffbase" : "blackbase"}`}>
                            {passive_ability.options.length > 5 ?
                                <div className="clicky updatelink" onClick={() => showmeoptions(showoptions)}>{showoptions == false ? <div><span className="mini_ability"></span>Show Upgrades:</div> : <div><span className="mini_ability"></span>Hide Upgrades:</div>}</div>
                                :
                                <><div className="mini_ability"/>Upgrades:<br/></>
                            }
                            {showoptions == true ?
                                passive_ability.options.map((self, key) => (
                                    ReplacerCharacter(`\xa0- ${self}\n`,form)
                                    ))
                                : ""}
                        </div>
                        : ""}
                    {passive_ability.defaults != undefined ?
                        Object.values(listByChar).map(buffs => (
                            <AilmentDefaultPassoff
                                file={"passive_ability"}
                                ver={ver}
                                key={buffs.char_id}
                                ailment_default={buffs}
                                master_index={master_index}
                                loc={loc}
                                slider={false}
                                framless={true}
                                formatting={formatting}
                                full={true}
                                character_face={false}
                                gear={gear}
                                base_color={"classcolor"}
                            />
                        ))
                        : ""}
                    {bufflist.length != 0 ?
                        <div className={passive_ability.CharID != undefined ? file == "exskill" ? "infonameholderenemybuff classcolor default_passive" : "defaultlistholder newblue default_passive" : "infonameholderenemybuff newblue default_passive"}>
                            <div className="unique ailmenttext">
                                Buffs / Debuffs:
                            </div>
                            {bufflist.length != 0 ?
                                <ul className={"abilitybufflist"}>
                                    {bufflist.map(buff => (
                                        <li className={`abilitybufficonsholder ${selectedbuff.id == buff.id ? "buffactive" : ""}`} key={buff.id}>
                                            <div className="biconspacer" onClick={() => buffselect(buff)} >
                                                <DefaultTippy content={
                                                    buff.name == "" ? `Unknown ${buff.id}` : add_formatting(buff.name && buff.name, "tl")
                                                }>
                                                    <img alt={buff.name} className="clicky abilitybufficon" src={`https://dissidiacompendium.com/images/static/icons/buff/${ailment_level_icon(buff,buff.aarg1)}.png`} />
                                                </DefaultTippy>
                                            </div>
                                        </li>
                                    ))}
                                </ul> :
                                ""}
                        </div>
                        : ""}
                    {selectedbuff.length != 0 ?
                        <AilmentDataFormatting
                            ailment_data={selectedbuff}
                            ver={ver}
                            master_index={master_index}
                            rank={selectedbuff.rank_id}
                            arg1={selectedbuff.arg1}
                            arg2={selectedbuff.arg2}
                            castlocation={true}
                            fullspan={passive_ability.CharID == undefined || file == "exskill" ? true : false}
                            formatting={formatting}
                            turns={selectedbuff.turn}
                            character_face={false}
                            hide_title={true}
                            full={passive_ability.CharID == undefined && chara_id_passoff == undefined ? true : false}
                            passed_passive={selectedbuff.passive}
                        />
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
                            data={passive_ability} />
                        </span>
                        : ""}
                </div>
            </div>
            </LazyLoadComponent>
        </div>
    )
}

export default trackWindowScroll(PassiveAbilityFormatting)