import React, { useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import { Link } from 'react-router-dom'
import 'react-lazy-load-image-component/src/effects/opacity.css';
import AilmentDataEffectHandler from './AilmentDataEffectHandler';
import CharacterFaceFormatting from '../Characters/CharacterFaceFormatting'
import ailment_combination_trans from '../../processing/ailment/ailment_combination_trans'
import ailment_modify_trans from '../../processing/ailment/ailment_modify_trans';
import ReplacerCharacter from '../ReplacerCharacter'
import passive_link_trans from '../../processing/passives/passive_link_trans';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import axios from "axios";
import DevSwitch from '../../redux/DevSwitch';
import { useDispatch, useSelector } from "react-redux";
import { getTransNames } from '../../redux/ducks/transnames';
import format_cleaner from '../../processing/format_cleaner';
import translater_characters from '../../processing/translater_characters';
import passive_stats_merger from '../../processing/passives/passive_stats_merger';
import PassiveTotalDisplay from '../Passives/PassiveTotalDisplay';
import DefaultTippy from '../TippyDefaults';
import ailment_tags from '../../processing/ailment/ailment_tags.json'
import AilmentDefaultParsFormatting from './AilmentDefaultParsFormatting';
import PassiveEffectsHandoff from '../Passives/PassiveEffectsHandoff';
import { ObjectView } from 'react-object-view'
import ailment_level_icon from '../../processing/ailment/ailment_level_icon';
import AilmentSliderFormatting from './AilmentSliderFormatting';
import ailment_data_handler from '../../processing/ailment/ailment_data_handler';
import AilmentLevelSettings from './AilmentLevelSettings';
import CaliIcon from '../CaliIcon';

export default function AilmentDataFormatting({
    ver,
    ailment_data,
    master_index,
    rank,
    arg1,
    arg2,
    castlocation,
    alt_rank,
    alt_aug1,
    alt_aug2,
    formatting,
    rank_tag,
    cur_char,
    turns,
    link,
    info,
    full,
    character_face, //only on for list
    frameless, // for attached
    default_passoff, //default passoff
    passed_passive, // for passive defaults
    hide_title,
    debugging
}){

    const form = {formatting:formatting}
    const forma = {formatting:formatting,updown:true}

    const ailment_data_trans = ailment_data_handler(
        ailment_data,
        rank,
        arg1,
        arg2,
        alt_rank,
        alt_aug1,
        alt_aug2,
        ver,
        master_index,
        castlocation,
        turns,
        rank_tag
    )

    const { highestlvl, 
            defaultrank,
            turns_set,
            sliders,
            ailment_pars,
            metadata,
            cast_title_str,
            cast_turns_str,
            cast_target_str
        } = ailment_data_trans

    const char_id = master_index.charid

    const [onion_passoff, setonion_passoff] = useStateIfMounted();
    const [showdesc, setshowdesc] = useStateIfMounted(false);
    const [setdesc, setsetdesc] = useStateIfMounted();
    const [showtrans, setshowtrans] = useStateIfMounted(false)
    const [trans, settrans] = useStateIfMounted()

    const dispatch = useDispatch();

    const transnames = useSelector((state) =>
        state.transnames.transnames
    );

    async function doTrans(text) {
        setshowtrans((prevValue) => !prevValue)
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
        const text = format_cleaner(setdesc).replace(/\\n/gm, "\x0A")
        if (transnames != undefined && showtrans == true) {
            const translate = translater_characters(text, transnames)
            settrans(translate)
        }
    }, [settrans, transnames, showtrans, setdesc]);

    const showmedesc = (current) => {
        if (current == false) {
            setshowdesc(true)
        } else {
            setshowdesc(false)
            setonion_passoff()
        }
    }

    useEffect(() => {
        if (ailment_data && ailment_data.id && showdesc == true) {
            if (onion_passoff != undefined) {
                if (DevSwitch == true) {
                    axios.get(`http://localhost:3005/data/_dir/ailmenttextonion/${onion_passoff}`, { 'muteHttpExceptions': true }).then((res) => {
                        const response = res.data;
                        setsetdesc(response[ver])
                    }).catch(function (err) {
                        console.log(err)
                        setsetdesc("")
                    })
                } else {
                    axios.get(`https://www.dissidiacompendium.com/data/_dir/ailmenttextonion/${onion_passoff}.json`, { 'muteHttpExceptions': true }).then((res) => {
                        const response = res.data;
                        setsetdesc(response[ver])
                    }).catch(function (err) {
                        console.log(err)
                        setsetdesc("")
                    })
                }
            } else {
                if (ailment_data.onion == undefined) {
                    if (DevSwitch == true) {
                        axios.get(`http://localhost:3005/data/_dir/ailmenttext/${ailment_data.id}`, { 'muteHttpExceptions': true }).then((res) => {
                            const response = res.data;
                            setsetdesc(response[ver])
                        }).catch(function (err) {
                            console.log(err)
                            setsetdesc("")
                        })
                    } else {
                        axios.get(`https://www.dissidiacompendium.com/data/_dir/ailmenttext/${ailment_data.id}.json`, { 'muteHttpExceptions': true }).then((res) => {
                            const response = res.data;
                            setsetdesc(response[ver])
                        }).catch(function (err) {
                            console.log(err)
                            setsetdesc("")
                        })
                    }
                }
            }
        }
        // eslint-disable-next-line 
    }, [showdesc, onion_passoff, ailment_data, ver])

    const [currentlevel, setcurrentlevel] = useStateIfMounted(castlocation == false ? 1 : highestlvl != 0 ? arg1 : 1)

    useEffect(() => {
        if (ailment_data && ailment_data.onion != undefined && ailment_data.onion != -1 && showdesc == true) {
            setonion_passoff(ailment_data.onion + (currentlevel < 1 ? 0 : currentlevel - 1))
        }
    }, [currentlevel, setonion_passoff, ailment_data, showdesc])

    const [currentturns, setcurrentturns] = useStateIfMounted(turns_set)
    const [currentdebuffsranks, setcurrentdebuffsranks] = useStateIfMounted(9)
    const [currentdebuffsranks2, setcurrentdebuffsranks2] = useStateIfMounted(8)
    const [currentdebuffsmuliply, setcurrentdebuffsmuliply] = useStateIfMounted(9)
    const [currentbuffsranks, setcurrentbuffsranks] = useStateIfMounted(19)
    const [currentfieldbuffsranks, setcurrentfieldbuffsranks] = useStateIfMounted(7)
    const [currentbuffsmuliply, setcurrentbuffsmuliply] = useStateIfMounted(19)
    const [currentstacks, setcurrentstacks] = useStateIfMounted(5)
    const [currentenemies, setcurrentenemies] = useStateIfMounted(3)
    const [currentgroupstacks, setcurrentgroupstacks] = useStateIfMounted(5)
    const [currenthp, setcurrenthp] = useStateIfMounted(100)
    const [charactersleft, setcharactersleft] = useStateIfMounted(2)
    const [characterskb, setcharacterskb] = useStateIfMounted(3)

    const [showraw, setshowraw] = useStateIfMounted(false)
    const [ailment_tag, setailment_tag] = useStateIfMounted([]);
    const [ailment_tag_aura, setailment_tag_aura] = useStateIfMounted([]);

    const showmeraw = (e) => {
        if (e.shiftKey) {
            if (showraw == false) {
                const holder = []
                Object.keys(ailment_tags).forEach(key => {
                    if (ailment_data[`${key}`] != undefined) {
                        holder.push(ailment_tags[`${key}`])
                    }
                })
                setailment_tag(holder)
                const holder2 = []
                Object.keys(ailment_tags).forEach(key => {
                    if (ailment_data[`${key}_Party`] != undefined) {
                        holder2.push(ailment_tags[`${key}`])
                    }
                })
                setailment_tag_aura(holder2)
                setshowraw(true)
            } else {
                setshowraw(false)
            }
        }
    }

    const handleChangeLevel = (e) => {
        setcurrentlevel(parseInt(e.x));
    };

    const handleChangeDebuffRank = (e) => {
        setcurrentdebuffsranks(parseInt(e.x));
    };
    const handleChangeDebuffRank2 = (e) => {
        setcurrentdebuffsranks2(parseInt(e.x));
    };
    const handleChangeDebuffMuliply = (e) => {
        setcurrentdebuffsmuliply(parseInt(e.x));
    };

    const handleChangeBuffRank = (e) => {
        setcurrentbuffsranks(parseInt(e.x));
    };
    const handleChangeFieldBuffRank = (e) => {
        setcurrentfieldbuffsranks(parseInt(e.x));
    };
    const handleChangeBuffMuliply = (e) => {
        setcurrentbuffsmuliply(parseInt(e.x));
    };

    const handleChangeGroupStacks = (e) => {
        setcurrentgroupstacks(parseInt(e.x));
    };

    const handleChangeStacks = (e) => {
        setcurrentstacks(parseInt(e.x));
    };

    const handleChangeEnemies = (e) => {
        setcurrentenemies(parseInt(e.x));
    };
    const handleChangeTurns = (e) => {
        setcurrentturns(parseInt(e.x));
    };

    const handleChangeHP = (e) => {
        setcurrenthp(parseInt(e.x));
    };

    const handleChangeCharactersLeft = (e) => {
        setcharactersleft(parseInt(e.x));
    };

    const handleChangeCharactersKB = (e) => {
        setcharacterskb(parseInt(e.x));
    };

    const ailment_num = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
    ]

    const [merge_pas, setmerge_pas] = useStateIfMounted(ailment_data && ailment_data.passives && ailment_data.passives.length > 1 ? true : false)

    const togglemerge = () => {
        setmerge_pas((prevValue) => !prevValue);
    }

    const [show_upgrades, setshow_upgrades] = useStateIfMounted(ailment_data && ailment_data.options && ailment_data.options.length > 5 ? false : true)

    const doshow_upgrades = () => {
        if (ailment_data && ailment_data.options && ailment_data.options.length > 5) {
            setshow_upgrades(!show_upgrades)
        }
    }

    const [attachedbuff, setattachedbuff] = useStateIfMounted([])

    useEffect(() => {
        setmerge_pas(ailment_data && ailment_data.passives && ailment_data.passives.length > 1 ? true : false)
        setshow_upgrades(ailment_data && ailment_data.options && ailment_data.options.length > 5 ? false : true)
        setattachedbuff([])
        // eslint-disable-next-line
    }, [ailment_data])

    const buffattachedselect = (e) => {
        if (attachedbuff && attachedbuff.id == e.id) {
            setattachedbuff([])
        } else {
            setattachedbuff(e)
        }
    }

    const replacer = (e) => {
        var newtext = e && e.replace(/&/gm, "%26")
        return newtext
    }

    const minH = window.innerWidth <= 800 ? 210 : 150;

    const ailment_debug = {
        ailment_pars: ailment_pars,
        sliders: sliders,
        metadata: metadata
    }

    return (
        <div className={frameless != true ? character_face == true ? "buffunit" : "" : ""}>
            <div className={frameless != true ? "infoholder" : ""} style={{ minHeight: `${frameless == true || character_face != true ? 0 : minH}px` }}>
                <LazyLoadComponent>
                    {character_face == true?
                        <div className="infotitleholder">
                            <div className="faceandiconholder">
                                <CharacterFaceFormatting char_id={char_id} id={ailment_data.chara_id} link={link} />
                                <div onClick={showmeraw} className="infoiconholder2">
                                    <img className="bufficon" alt={ailment_data.name && ailment_data.name} src={`https://dissidiacompendium.com/images/static/icons/buff/${ailment_level_icon(ailment_data,currentlevel)}.png`} />
                                </div>
                            </div>
                        </div>
                    :""}
                    <div style={{ marginTop: `${character_face != true ? "5px" : ""}` }} 
                         className={
                            frameless == true ? (ailment_data.is_buff == 1 ? "Buffsubbanner2" : "Debuffsubbanner2") : 
                            ailment_data.is_buff == 0 ? `Debuffbanner iconbuffer infonameholder ${full == true ? "" : "nobuffpadding"}` : `Buffbanner iconbuffer infonameholder ${full == true ? "" : "nobuffpadding"}`
                         }>
                        <div className={character_face != true ? "flexdisplay" :"infotitle2"}>
                            {character_face != true?
                                <div onClick={showmeraw} className="solo_buff_icon">
                                    <img className="bufficon2" alt={ailment_data.name && ailment_data.name} src={`https://dissidiacompendium.com/images/static/icons/buff/${ailment_level_icon(ailment_data,currentlevel)}.png`} />
                                </div>
                            :
                            ""
                            }
                            <span className={character_face != true ? "splitrow" : ""}>
                            {ReplacerCharacter(`${ailment_data && ailment_data.name == "" ? `Unknown ${ailment_data.is_buff == 1 ? "buff" : "debuff"}` : ailment_data.name}${ailment_data.is_state == true ? "" : ` - #${ailment_data.id}`}`,form)}
                            {ailment_data && ailment_data.jpname == "" || ailment_data && ailment_data.jpname  == undefined ?
                                <div className="abilityJPname">
                                    {"None テキストなし"}
                                </div>
                                : <div className="abilityJPname">
                                    {ReplacerCharacter(ailment_data.jpname,form)}
                                </div>}
                            </span>
                        </div>
                        {ailment_data.sp_disp_type == 133 && debugging == undefined?
                            <div className="similarbanner">
                                <Link className="updatelink" to={`/characters/forcetime?Char=${char_id[ailment_data.chara_id||cur_char] && replacer(char_id[ailment_data.chara_id||cur_char].CharacterName)}`}>
                                    View Force Time
                                </Link>
                            </div>
                            : ""}
                        {info != undefined?
                        <div className='buffglreworkbanner passiveinfobase'>{info}</div>
                        :""}
                    </div>
                    <AilmentSliderFormatting
                        ailment_data={ailment_data}
                        sliders={sliders}
                        highestlvl={highestlvl}
                        nobuffpadding={frameless == true || full == true ? false : true}

                        currentlevel={currentlevel}
                        handleChangeLevel={handleChangeLevel}

                        currentturns={currentturns}
                        handleChangeTurns={handleChangeTurns}

                        currentdebuffsranks={currentdebuffsranks}
                        handleChangeDebuffRank={handleChangeDebuffRank}

                        currentdebuffsranks2={currentdebuffsranks2}
                        handleChangeDebuffRank2={handleChangeDebuffRank2}

                        currentdebuffsmuliply={currentdebuffsmuliply}
                        handleChangeDebuffMuliply={handleChangeDebuffMuliply}

                        currentfieldbuffsranks={currentfieldbuffsranks}
                        handleChangeFieldBuffRank={handleChangeFieldBuffRank}

                        currentbuffsranks={currentbuffsranks}
                        handleChangeBuffRank={handleChangeBuffRank}

                        currentbuffsmuliply={currentbuffsmuliply}
                        handleChangeBuffMuliply={handleChangeBuffMuliply}

                        currentenemies={currentenemies}
                        handleChangeEnemies={handleChangeEnemies}

                        currentstacks={currentstacks}
                        handleChangeStacks={handleChangeStacks}

                        currentgroupstacks={currentgroupstacks}
                        handleChangeGroupStacks={handleChangeGroupStacks}

                        currenthp={currenthp}
                        handleChangeHP={handleChangeHP}

                        charactersleft={charactersleft}
                        handleChangeCharactersLeft={handleChangeCharactersLeft}

                        characterskb={characterskb}
                        handleChangeCharactersKB={handleChangeCharactersKB}
                    />
                    <div className={
                        frameless == true ? (ailment_data.is_buff == 1 ? "Buffsubbase2" : "Debuffsubbase2") :
                        ailment_data.is_buff == 0 ?  `Debuffbase infobase ${full == true ? "" : "nobuffpadding"}` : `Buffbase infobase ${full == true ? "" : "nobuffpadding"}`
                        }>
                        {ailment_data.hide_title == true || default_passoff != undefined || frameless == true || passed_passive != undefined || hide_title == true? "" :
                        <div className={"subpassiveflair cast_str"}>
                            {cast_title_str}<span className='values'>{cast_turns_str}</span>{ReplacerCharacter(cast_target_str,forma)}
                        </div>
                        }
                        {passed_passive != undefined ?
                            <PassiveEffectsHandoff
                                key={ailment_data.id}
                                passive_ability={passed_passive}
                                master_index={master_index}
                                formatting={formatting}
                                ver={ver}
                                list={true}
                                pass_default={true}
                            />
                        : ""}
                        {ailment_data.defaults != undefined ?
                        <AilmentDefaultParsFormatting
                            key={ailment_data.id}
                            default_data={ailment_data.defaults}
                            ver={ver}
                            master_index={master_index}
                            formatting={formatting}
                            passed_ailment={ailment_data}
                        />
                        : 
                        default_passoff != undefined && passed_passive == undefined ?
                        <AilmentDefaultParsFormatting
                            key={ailment_data.id}
                            default_data={default_passoff}
                            ver={ver}
                            master_index={master_index}
                            formatting={formatting}
                            passed_ailment={ailment_data}
                        />
                        :""}
                        {ailment_data.note != undefined ?
                            <div className="p_note">
                                <div className='greybar values'>{CaliIcon}Note:</div>
                                {ReplacerCharacter(`${ailment_data.note}\n`,form)}
                            </div>
                        : ""}
                        {ailment_data.levelsettings != undefined ?
                              debugging != true ? "" :
                              <AilmentLevelSettings
                              levelsettings={ailment_data.levelsettings}
                              />
                        :""}
                        {ailment_data.components != undefined ?
                            <div className="subpassiveflair2">
                                {ailment_data.components.map((component, i) =>
                                    ReplacerCharacter(ailment_combination_trans(
                                        component,
                                        master_index,
                                        ver,
                                        ailment_data.id
                                    ),form)
                                )}
                            </div>
                        : ""}
                         {ailment_data.modify != undefined ?
                            <div className="p_note">
                                <div className='yellowbar'><div className='inline mod_icon'/>Modify:</div>
                                {ailment_data.modify.map((item, i) =>
                                    ReplacerCharacter(ailment_modify_trans(
                                        item,
                                        master_index,
                                        ver
                                    ),form)
                                )}
                            </div>
                        : ""}
                        {ailment_num.map(num => (
                            ailment_pars[`effect_id_${num}`] && 
                            (ailment_pars[`effect_id_${num}`].hidden != true || debugging )&& 
                            <AilmentDataEffectHandler
                                key={`${ailment_data.id}-${num}`}
                                effect_id={ailment_pars[`effect_id_${num}`]}
                                slider={true}
                                castlocation={castlocation}
                                currentrank={defaultrank}
                                currentlevel={currentlevel}
                                currentturns={currentturns}
                                currentenemies={currentenemies}
                                currentstacks={currentstacks}
                                currentdebuffsranks={currentdebuffsranks}
                                currentdebuffsranks2={currentdebuffsranks2}
                                currentdebuffsmuliply={currentdebuffsmuliply}
                                currentbuffsranks={currentbuffsranks}
                                currentfieldbuffsranks={currentfieldbuffsranks}
                                currentbuffsmuliply={currentbuffsmuliply}
                                currentgroupstacks={currentgroupstacks}
                                currenthp={currenthp}
                                charactersleft={charactersleft}
                                characterskb={characterskb}
                                formatting={formatting}
                                setonion_passoff={setonion_passoff}
                                setshowdesc={setshowdesc}
                                debugging={castlocation == true ? false : debugging}
                            />
                        ))}
                        {ailment_pars.field != undefined ?
                            <>
                                <div className='spacearound'>
                                    <DefaultTippy content="Field Effects">
                                        <span className='fieldeffects'></span>
                                    </DefaultTippy>
                                </div>
                                {ailment_pars.field.map((item, i) =>
                                    item && 
                                    (item.hidden != true || debugging) && 
                                    <AilmentDataEffectHandler
                                        key={`${ailment_data.id}-${i}f`}
                                        effect_id={item}
                                        slider={true}
                                        currentrank={defaultrank}
                                        currentlevel={currentlevel}
                                        currentturns={currentturns}
                                        currentenemies={currentenemies}
                                        currentstacks={currentstacks}
                                        currentdebuffsranks={currentdebuffsranks}
                                        currentdebuffsranks2={currentdebuffsranks2}
                                        currentdebuffsmuliply={currentdebuffsmuliply}
                                        currentbuffsranks={currentbuffsranks}
                                        currentbuffsmuliply={currentbuffsmuliply}
                                        currentfieldbuffsranks={currentfieldbuffsranks}
                                        currentgroupstacks={currentgroupstacks}
                                        currenthp={currenthp}
                                        charactersleft={charactersleft}
                                        characterskb={characterskb}
                                        castlocation={castlocation}
                                        formatting={formatting}
                                        debugging={castlocation == true ? false : debugging}
                                    />
                                )}
                            </>
                        : ""}
                        {ailment_data.force != undefined ?
                            <div className="l_grade">
                                <div className='linkbar'><div className='BonusHPDamage'/></div>
                                {ailment_data.force.map(link_effect => (
                                    ReplacerCharacter(passive_link_trans(
                                        link_effect,
                                        master_index,
                                        ver
                                    ),form)
                                ))}
                                <div className='abilityJPname'>*Totaled values</div>
                            </div>
                        : ""}
                        {ailment_data.passives != undefined ?
                            <div className='p_grade'>
                                <div className='fieldbar'><span className='smallpassive'></span>{"\xa0"}Effects:</div>
                                <div className='spanleft'>
                                    {ailment_data.passives.length != 1 ?
                                        <div className='subpassiveflair spacearound'>
                                            <div key="mergecheck1" className={`${merge_pas == true ? "nodisplay" : `uncheck`}`} onClick={togglemerge} />
                                            <div key="mergecheck2" className={`${merge_pas == true ? "check" : `nodisplay`}`} onClick={togglemerge} />
                                            <div className='noselect'>&nbsp;&nbsp;Total Values</div>
                                        </div>
                                        : ""}
                                    {passive_stats_merger(
                                        ailment_data.passives,

                                        master_index,
                                        ver,

                                        merge_pas,
                                        "ailment",
                                        true,
                                    ).sort((a, b) => a.rank - b.rank).map((ailment_passive, i, whole) => (
                                        ailment_passive.is_total != true ? 
                                        <PassiveEffectsHandoff
                                            key={`${ailment_passive.pa_id}-${i}`}
                                            passive_ability={ailment_passive}

                                            master_index={master_index}
                                            ver={ver}

                                            formatting={formatting}
                                            skip_space={i}
                                            use_ailment={true}
                                            merged={whole[i - 1] && whole[i - 1].loc_tag}
                                            hide_disp={merge_pas}
                                            battle_state={true}
                                        />
                                        :
                                        <PassiveTotalDisplay
                                            key={i}
                                            match={ailment_passive}
                                        />
                                    ))}
                                    <div className='abilityJPname'>*depending on origin ability</div>
                                </div>
                            </div>
                            : ""}

                        {ailment_data.options != undefined ?
                            <div className='p_grade'>
                                <div className='fieldbar'>
                                    <div className={ailment_data.options.length <= 5 ? "" : 'updatelink clicky'} onClick={doshow_upgrades}>
                                        {ailment_data.options.length <= 5 ? <><span className='mini_ability'></span>Upgrades:</> : show_upgrades ? <><span className='mini_ability'></span>Hide Upgrades:</> : <><span className='mini_ability'></span>Show Upgrades:</>}
                                    </div>
                                </div>
                                {show_upgrades ?
                                    ailment_data.options.map((self, i) => (
                                        ReplacerCharacter("\xa0- "+self+"\n",form)
                                    ))
                                    : ""}
                                <div className='abilityJPname'>*conditions may apply</div>
                            </div>
                            : ""}

                        {ReplacerCharacter(metadata, form)}

                        <div onClick={() => showmedesc(showdesc)} className='clicky updatelink contents'>{showdesc == false ? "\xa0- Show Desc -" : "\xa0- Hide Desc -"}</div>
                        {showdesc == true ?
                            <hr></hr>
                            : ""}
                        {showdesc == true && trans != undefined && showtrans == true ?
                            ReplacerCharacter(trans+"\n",form)
                            :
                            showdesc == true && setdesc != undefined && showtrans != true ? 
                                <div>
                                {ReplacerCharacter(format_cleaner(setdesc == undefined || setdesc == "" ? "Not available" : setdesc),form)}
                                </div>
                            : ""
                        }
                        {ver == "JP" && showdesc == true ?
                            <div className='clicky updatelink contents' onClick={() => doTrans()}>Translate (Beta)</div>
                            : ""}

                        {ailment_data.attached != undefined ?
                            <div className='infonameholder newblue'>
                                <div className="unique ailmenttext">
                                    Associated Casts:
                                </div>
                                <ul className="abilitybufflist">
                                    {ailment_data.attached.map(function (buff) {
                                        return <li className={`abilitybufficonsholder ${buff.id == attachedbuff.id ? "buffactive" : ""}`} key={buff.id}>
                                            <div className="biconspacer" onClick={() => buffattachedselect(buff)} >
                                                <DefaultTippy content={ReplacerCharacter(buff.name,form)}>
                                                    <img alt={buff.name} className="clicky abilitybufficon" src={`https://dissidiacompendium.com/images/static/icons/buff/${buff.icon}.png`} />
                                                </DefaultTippy>
                                            </div>
                                        </li>
                                    })}
                                </ul>
                            </div>
                            : ""}
                        {attachedbuff.length != 0 ?
                            <AilmentDataFormatting
                                key={attachedbuff.id}
                                ver={ver}
                                ailment_data={attachedbuff}

                                master_index={master_index}

                                slider={true}
                                castlocation={castlocation}
                                formatting={true}
                                rank={attachedbuff.arank}
                                arg1={attachedbuff.aarg1}
                                arg2={attachedbuff.aarg2}
                                alt_rank={attachedbuff.aranka}
                                alt_aug1={attachedbuff.aarg1a}
                                alt_aug2={attachedbuff.aarg2a}
                                turns={attachedbuff.alife}
                                character_face={false}
                                frameless={true}
                                hide_cast_str={true}
                                debugging={debugging}
                            />
                            : ""}
                        {showraw == true ?
                            <div className="newblue">
                                <div className="unique ailmenttext">
                                    Ailment Tags:
                                </div>
                                <ul className="abilitybufflist">
                                    {ailment_tag.map(function (buff) {
                                        return <li className={`abilitybufficonsholder`} key={`${buff.name}-1`}>
                                            <div className="biconspacer" >
                                                <DefaultTippy content={buff.name}>
                                                    <img alt={buff.name} className="abilitybufficon" src={`https://dissidiacompendium.com/images/static/icons/${buff.url}.png`} />
                                                </DefaultTippy>
                                            </div>
                                        </li>
                                    })}
                                </ul>
                                <div className="unique ailmenttext">
                                    Aura Tags:
                                </div>
                                <ul className="abilitybufflist">
                                    {ailment_tag_aura.map(function (buff) {
                                        return <li className={`abilitybufficonsholder`} key={`${buff.name}-2`}>
                                            <div className="biconspacer" >
                                                <DefaultTippy content={buff.name}>
                                                    <img alt={buff.name} className="abilitybufficon" src={`https://dissidiacompendium.com/images/static/icons/${buff.url}.png`} />
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
                                      expandLevel: 1,
                                      displayEntriesMaxCount: 1,
                                    }
                                  }
                                data={ailment_debug} 
                                />
                            </span>
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
                                data={ailment_data} 
                                />
                            </span>
                        : ""}
                    </div>
                </LazyLoadComponent>
            </div>
        </div>
    )
}