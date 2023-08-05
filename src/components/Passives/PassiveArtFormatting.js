import React, { useState, useEffect } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import Format_Cleaner from '../../processing/format_cleaner'
import translater from '../../processing/translater_characters'
import DefaultTippy from '../TippyDefaults';
import { useDispatch, useSelector } from "react-redux";
import { getTransNames } from '../../redux/ducks/transnames';
import CharacterFaceFormatting from '../Characters/CharacterFaceFormatting'
import AilmentDefaultPassoff from "../Buffs/AilmentDefaultPassoff";
import AilmentDataFormatting from "../Buffs/AilmentDataFormatting";
import PassiveEffectsHandoff from "./PassiveEffectsHandoff";
import ReplacerCharacter from '../ReplacerCharacter'
import { LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';
import { ObjectView } from 'react-object-view'
import ailment_level_icon from "../../processing/ailment/ailment_level_icon";

function PassiveArtFormatting({
    art_passive,
    loc,
    ver,
    file,
    Single,
    formatting,
    banner_color,
    base_color,
    span,
    link,
    master_index,
    debugging,
    scrollPosition 
}){

    const form = {formatting:formatting,updown:true}

    const char_id = master_index.charid

    const dispatch = useDispatch();

    const transnames = useSelector((state) =>
        state.transnames.transnames
    );

    const [trans, settrans] = useStateIfMounted()
    const [showtrans, setshowtrans] = useStateIfMounted(false)
    const [selectedbuff, setselectedbuff] = useState([]);

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
        const text = Format_Cleaner(art_passive.desc).replace(/\\n/gm, "\x0A")
        if (transnames != undefined && showtrans == true) {
            const translate = translater(text, transnames)
            settrans(translate)
        }
    }, [settrans, transnames, showtrans, art_passive.desc]);

    async function doTrans(text) {
        setshowtrans((prevValue) => !prevValue)
    }

    const listByChar = {}
    if (art_passive.defaults != undefined) {
        //make list by char
        Object.assign(listByChar, { [art_passive.chara_id]: { list: art_passive.defaults, char_id: art_passive.chara_id, name: char_id[art_passive.CharID].CharacterName, jpname: char_id[art_passive.chara_id].JPName } })
    }

    const bufflist = []
    if (art_passive.casts != undefined) {
        const castholder = {}
        art_passive.casts && art_passive.casts.map(second => {
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

    const textreplace = (text) => {
        const replacement = text
            .replace(/BRVスピードアップ/gm, "BRV Initiative")
            .replace(/HPダメージガードアップ/gm, "HP Damage Guard")
            .replace(/デバフアタックアップ/gm, "Debuff Attack Up")
            .replace(/ブレイクブーストアップ/gm, "Break Boost Up")
            .replace(/BRVアタックアップ/gm, "BRV Attack Up")
            .replace(/ブレイクスピードアップ/gm, "Break Speed Up")
            .replace(/BRVガードアップ/gm, "BRV Guard Up")
            .replace(/デンジャーガードアップ/gm, "Low HP Guard Up")
            .replace(/バックアタック/gm, "Back Attack")
            .replace(/バフアタックアップ/gm, "Buff Attack Up")
            .replace(/デバフガードアップ/, "Debuff Guard Up")
            .replace(/HPダメージBRVゲイン/, "HP Damage BRV Gain")
            .replace(/バフガードアップ/, "Buff Guard Up")
            .replace(/バフスピードアップ/, "Buff Speed Up")
            .replace(/デバフスピードアップ/, "Debuff Initiative")
            .replace(/デバフブーストアップ/gm, "Debuff Boost Up")
            .replace(/バフブーストアップ/gm, "Buff Boost Up")
        return (
            replacement
        )
    }

    const revtextreplace = (text) => {
        const replacement = text
            .replace(/BRV Initiative/gm, "BRVスピードアップ")
            .replace(/HP Damage Guard/gm, "HPダメージガードアップ")
            .replace(/Debuff Attack Up/gm, "デバフアタックアップ")
            .replace(/Break Boost Up/gm, "ブレイクブーストアップ")
            .replace(/BRV Attack Up/gm, "BRVアタックアップ")
            .replace(/Break Speed Up/gm, "ブレイクスピードアップ")
            .replace(/BRV Guard Up/gm, "BRVガードアップ")
            .replace(/Low HP Guard Up/gm, "デンジャーガードアップ")
            .replace(/Back Attack/gm, "バックアタック")
            .replace(/Buff Attack Up/gm, "バフアタックアップ")
            .replace(/Debuff Guard Up/, "デバフガードアップ")
            .replace(/HP Damage BRV Gain/, "HPダメージBRVゲイン")
            .replace(/Buff Guard Up/, "バフガードアップ")
            .replace(/Buff Speed Up/, "バフスピードアップ")
            .replace(/Debuff Initiative/, "デバフスピードアップ")
            .replace(/Debuff Boost Up/gm, "デバフブーストアップ")
            .replace(/Buff Boost Up/gm, "バフブーストアップ")
        return (
            replacement
        )
    }

    const minH = window.innerWidth <= 800 ? 210 : 150;

    return (
        <div className="buffunit">
            <LazyLoadComponent
            scrollPosition={scrollPosition}
            placeholder={<div className="infoholder" style={{ minHeight: `${minH}px` }}/>}
            >
            <div className="infoholder">
                {art_passive.chara_id != undefined ?
                    <div className="infotitleholder">
                        <div className="faceandiconholder" >
                            <CharacterFaceFormatting char_id={char_id} id={art_passive.chara_id} loc={loc} link={link} />
                        </div>
                    </div>
                    : ""}
                <div className={`${art_passive.chara_id != undefined ? "iconbuffer infonameholder nobuffpadding " : "infonameholderenemybuff "}${banner_color == undefined ? "Buffbanner" : banner_color}`} onClick={showmeraw}>
                    {ver == "JP" ?
                        <div>
                            <div className={`combotext infotitle ${art_passive.rank == 5 ? "orangetext" : ""}`}>
                                {ReplacerCharacter(`<art> ${art_passive.glname != "" ?
                                    `${art_passive.glname} - #${art_passive.spe_id}` :
                                    `${textreplace(Format_Cleaner(art_passive.name))} - #${art_passive.spe_id}`}`)}
                            </div>
                            <div className={`${art_passive.rank == 5 ? "orangetext size12" : "abilityJPname"}`}>
                                {art_passive.name != undefined && art_passive.name != "" ?
                                    `${Format_Cleaner(art_passive.name)} - #${art_passive.spe_id}` :
                                    `Unknown - #${art_passive.spe_id}`}
                            </div>
                        </div>
                        :
                        <div>

                            <div className={`combotext infotitle ${art_passive.rank == 5 ? "orangetext" : ""}`}>
                            {ReplacerCharacter(`<art> ${art_passive.name != undefined ?
                                    `${Format_Cleaner(art_passive.name).replace(/(.*?)(<)(.*?)(>)(.*?)/gm, '$1&lt;$3&gt;$5')} - #${art_passive.spe_id}`
                                    :
                                    `Unknown - #${art_passive.spe_id}`}`)}
                            </div>
                            <div className={`${art_passive.rank == 5 ? "orangetext size12" : "abilityJPname"}`}>
                                {art_passive.jpname != undefined && art_passive.jpname != "" ?
                                    `${Format_Cleaner(art_passive.jpname).replace(/(.*?)(<)(.*?)(>)(.*?)/gm, '$1&lt;$3&gt;$5')} - #${art_passive.spe_id}` :
                                    `${revtextreplace(Format_Cleaner(art_passive.name))} - #${art_passive.spe_id}`}
                            </div>
                        </div>
                    }
                </div>
                <div className={`${art_passive.chara_id != undefined ? "infobase nobuffpadding " : "infobase "}${base_color == undefined ? "Buffbase" : base_color}`}>
                    {trans != undefined && showtrans == true ?
                        ReplacerCharacter(trans+"\n",form)
                        :
                        ReplacerCharacter(Format_Cleaner(art_passive.desc+"\n"),form)
                    }
                    {ver == "JP" ?
                        <div className="clicky updatelink contents" onClick={() => doTrans()} >Translate (Beta)</div>
                        : ""}
                    <div className="newbluepassive infonameholderenemybuff default_passive">
                        <PassiveEffectsHandoff
                            passive_ability={art_passive}
                            master_index={master_index}
                            ver={ver}
                            file={file}
                            formatting={formatting}
                        />
                    </div>
                    {art_passive.defaults != undefined ?
                        Object.values(listByChar).map(buffs => (
                            <AilmentDefaultPassoff
                                file={"passive_ability"}
                                key={buffs.char_id}
                                ver={ver}
                                ailment_default={buffs}
                                master_index={master_index}
                                loc={loc}
                                framless={true}
                                full={false}
                                formatting={formatting}
                                character_face={false}
                                base_color={"classcolor"}
                            />
                        ))
                        : ""}
                    {bufflist.length != 0 ?
                        <div className={art_passive.chara_id != undefined ? file == "exskill" ? "infonameholderenemybuff newblue default_passive" : "defaultlistholder newblue default_passive" : "infonameholderenemybuff newblue default_passive"}>
                            <div className="unique ailmenttext">
                                Buffs / Debuffs:
                            </div>
                            {bufflist.length != 0 ?
                                <ul className={"abilitybufflist"}>
                                    {bufflist.map(buff => (
                                        <li className={`abilitybufficonsholder ${selectedbuff.id == buff.id ? "buffactive" : ""}`} key={buff.id}>
                                            <div className="biconspacer" onClick={() => buffselect(buff)} >
                                                <DefaultTippy content={
                                                    buff.name === "" ? `Unknown ${buff.id}` : buff.name
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
                            file={"exskill"}
                            loc={loc}
                            ver={ver}
                            ailment_data={selectedbuff}

                            master_index={master_index}

                            slider={false}
                            rank={selectedbuff.rank_id}
                            arg1={selectedbuff.arg1}
                            arg2={selectedbuff.arg2}
                            castlocation={true}
                            fullspan={art_passive.chara_id == undefined || file == "exskill" ? true : false}
                            formatting={formatting}
                            turns={selectedbuff.turn}
                            character_face={false}
                            frameless={true}
                            default_passoff={selectedbuff}
                            debugging={debugging}
                            showvalues={false}
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
                            data={art_passive} 
                            />
                        </span>
                        : ""}
                </div>
            </div>
            </LazyLoadComponent>
        </div>
    )
}

export default trackWindowScroll(PassiveArtFormatting)