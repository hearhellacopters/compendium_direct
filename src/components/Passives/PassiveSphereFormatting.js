import React, { useEffect } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import format_cleaner from '../../processing/format_cleaner'
import translater from '../../processing/translater_characters'
import DefaultTippy from '../TippyDefaults';
import { useDispatch, useSelector } from "react-redux";
import { getTransNames } from '../../redux/ducks/transnames';
import AilmentFieldAttached from '../Buffs/AilmentFieldAttached'
import CharacterFaceFormatting from '../Characters/CharacterFaceFormatting'
import AilmentDataFormatting from "../Buffs/AilmentDataFormatting";
import Ailment_Default_Passoff from "../Buffs/AilmentDefaultPassoff";
import PassiveEffectsHandoff from "./PassiveEffectsHandoff";
import { StartsInTimer } from '../Timers'
import passive_link_trans from "../../processing/passives/passive_link_trans";
import ReplacerCharacter from '../ReplacerCharacter'
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import sphere_tags from '../../processing/passives/sphere_tags.json'
import { ObjectView } from 'react-object-view'
import ailment_level_icon from "../../processing/ailment/ailment_level_icon";

export default function PassiveSphereFormatting({
    passive_ability,
    loc,
    ver,
    file,
    Single,

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
    span,
    raw,

    link,
    master_index
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
    const [passive_tag, setpassive_tag] = useStateIfMounted([]);

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
        const text = format_cleaner(passive_ability.desc).replace(/\\n/gm, "\x0A")
        if (transnames != undefined && showtrans == true) {
            const translate = translater(text, transnames)
            settrans(translate)
        }
    }, [settrans, transnames, showtrans, passive_ability.desc]);

    const showmeraw = (e) => {
        if (e.shiftKey) {
            if (showraw == false) {
                const holder = []
                Object.keys(sphere_tags).forEach(key => {
                    if (raw[`${key}`] == true) {
                        holder.push(sphere_tags[`${key}`])
                    }
                })
                setpassive_tag(holder)
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

    const Capletter = {
        1: "A",
        2: "B",
        3: "C",
        4: "D",
        5: "E"
    }

    const type = {
        1: "Ex",
        2: "Craft"
    }

    sphere = `${type[sphere_type]}${Capletter[sphere_letter]}`


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

    return (
        <div className={gear == true ? "margtop" : `buffunit`}>
            <div className="infoholder" style={{ minHeight: `50px` }}>
                <LazyLoadComponent>
                    {passive_ability.CharID != undefined || chara_id_passoff != undefined ?
                        gear == true ? "" :
                            <div className="infotitleholder">
                                <div className="faceandiconholder" >
                                    <CharacterFaceFormatting char_id={char_id} id={chara_id_passoff == undefined ? passive_ability.CharID : chara_id_passoff} loc={loc} link={link} />
                                    <div className="infoiconholder ">
                                        <LazyLoadImage effect="opacity" className="sphereicon" alt={`${sphere} sphere`} src={`https://dissidiacompendium.com/images/static/icons/spheres/Sphere${sphere}.png`} />
                                    </div>
                                </div>
                            </div>
                        : ""}
                    {ver == "JP" ?
                        <div className={`${Capletter[sphere_letter]}banner infonameholder wpadding`} onClick={showmeraw}>
                            <div className="spacearound">
                                <div className="infotitle displayfex  ">
                                    {passive_ability.glname != undefined ?
                                        ReplacerCharacter(`${passive_ability.glname} - #${passive_ability.pa_id}`,form) :
                                        `Unknown - #${passive_ability.pa_id}`}
                                </div>
                            </div>
                            <div className="displayfex ">
                                <div className="abilityJPname ">
                                    {passive_ability.name != undefined ?
                                        ReplacerCharacter(`${format_cleaner(passive_ability.name)} - #${passive_ability.pa_id}`,form) :
                                        `Unknown - #${passive_ability.pa_id}`}
                                </div>
                            </div>
                            {rData != undefined ?
                                <StartsInTimer
                                    expiryTimestamp={rData}
                                    JPFlag={ver == "JP" ? true : false}
                                />
                                : ""}
                        </div>
                        :
                        <div className={`${Capletter[sphere_letter]}banner infonameholder wpadding`} onClick={showmeraw}>
                            <div className="spacearound">
                                <div className="infotitle displayfex">
                                    {passive_ability.name != undefined ?
                                        ReplacerCharacter(`${format_cleaner(passive_ability.name)} - #${passive_ability.pa_id}`,form)
                                        :
                                        "Unknown"}
                                </div>
                            </div>
                            <div className="displayfex ">
                                <div className="abilityJPname ">
                                    {passive_ability.jpname != undefined ?
                                        ReplacerCharacter(`${format_cleaner(passive_ability.jpname)} - #${passive_ability.pa_id}`,form) :
                                        `Unknown - #${passive_ability.pa_id}`}
                                </div>
                            </div>
                            {rData != undefined ?
                                <StartsInTimer
                                    expiryTimestamp={rData}
                                    JPFlag={ver == "JP" ? true : false}
                                />
                                : ""}
                        </div>
                    }
                    <div className={`${Capletter[sphere_letter]}base infobase wpadding`}>

                        {trans != undefined && showtrans == true ?
                            ReplacerCharacter(trans+"\n",forma)
                            :
                            ReplacerCharacter(format_cleaner(passive_ability.desc+'\n',forma))
                        }
                        {ver == "JP" ?
                            <div className="clicky updatelink contents" onClick={() => doTrans()} >Translate (Beta)</div>
                            : ""}
                        <div className={`${passive_ability.effect_ == undefined && passive_ability.effect__1 == undefined ? "" : `infonameholderenemybuff default_passive bluebase`}`}>
                            <PassiveEffectsHandoff
                                passive_ability={passive_ability}
                                master_index={master_index}
                                ver={ver}
                                file={file}

                                formatting={formatting}
                            />
                            {passive_ability.field != undefined ?
                                passive_ability.field.map(buffs => (
                                    <AilmentFieldAttached
                                        key={buffs.data_id}
                                        castlocation={true}
                                        ver={ver}
                                        ailment_field={buffs}

                                        master_index={master_index}

                                        loc={loc}
                                        slider={false}
                                        formatting={formatting}
                                        base_color={undefined}
                                    />
                                ))
                                : ""}
                        </div>
                        {passive_ability.force != undefined ?
                            <div className="forceaddtach infonameholderenemybuff default_passive">
                                <div className='BonusHPDamage' />
                                {passive_ability.force.map(link_effect => (
                                    ReplacerCharacter(passive_link_trans(
                                        link_effect,
                                        master_index,
                                        ver
                                    ),form)
                                ))}
                            </div>
                            : ""}
                        {passive_ability.options != undefined ?
                            <div className={`default_passive infonameholderenemybuff ${base_color == undefined ? "Buffbase" : "blackbase"}`}>
                                <div>
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
                            </div>
                            : ""}
                        {passive_ability.defaults != undefined ?
                            Object.values(listByChar).map((buffs,i) => (
                                <Ailment_Default_Passoff
                                    file={"passive_ability"}
                                    ver={ver}
                                    key={i}
                                    ailment_default={buffs}

                                    master_index={master_index}

                                    loc={loc}
                                    slider={false}
                                    formatting={formatting}
                                    gear={gear}
                                    base_color={"classcolor"}
                                    span={span}
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
                                                        buff.name == "" ? `Unknown ${buff.id}` : ReplacerCharacter(buff.name && buff.name,form)
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
                                file={"passive_ability"}
                                loc={loc}
                                ver={ver}

                                ailment_data={selectedbuff}
                                master_index={master_index}

                                slider={false}
                                rank={selectedbuff.rank_id}
                                arg1={selectedbuff.arg1}
                                arg2={selectedbuff.arg2}
                                castlocation={true}
                                fullspan={passive_ability.CharID == undefined || file == "exskill" ? true : false}
                                formatting={formatting}

                                turns={selectedbuff.turn}
                                character_face={false}
                                frameless={true}
                                passed_passive={selectedbuff.passive}
                                hide_title={true}
                            />
                            : ""}
                        {showraw == true ?
                            <div className="newblue">
                                <div className="unique ailmenttext">
                                    Sphere Tag:
                                </div>
                                <ul className="abilitybufflist">
                                    {passive_tag.map(function (buff) {
                                        return <li className={`abilitybufficonsholder`} key={`${buff.name}`}>
                                            <div className="biconspacer" >
                                                <DefaultTippy content={buff.name}>
                                                    <img alt={buff.name} className="abilitybufficon" src={`https://dissidiacompendium.com/images/static/icons/buff/${buff.url}.png`} />
                                                </DefaultTippy>
                                            </div>
                                        </li>
                                    })}
                                </ul>
                            </div>
                            :
                            ""}
                        {showraw == true ?
                            <span className='react-json-view'>
                                <ObjectView 
                                options={
                                    {
                                      hideDataTypes: true,
                                      expandLevel: 1
                                    }
                                  }
                                data={raw} />
                            </span>
                            : ""}
                    </div>
                </LazyLoadComponent>
            </div>
        </div>
    )
}