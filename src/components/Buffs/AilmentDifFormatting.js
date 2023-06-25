import React, { useEffect } from "react";
import axios from "axios";
import { useStateIfMounted } from "use-state-if-mounted";
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import CharacterFaceFormatting from "../Characters/CharacterFaceFormatting";
import format_cleaner from '../../processing/format_cleaner'
import { useDispatch, useSelector } from "react-redux";
import { getTransNames } from '../../redux/ducks/transnames';
import translater from '../../processing/translater_characters';
import ReplacerCharacter from  "../ReplacerCharacter";
import DevSwitch from '../../redux/DevSwitch';
import AilmentEffectDif from './AilmentEffectDif';
import { ObjectView } from 'react-object-view'
import makediff from "../../processing/makediff";
import AilmentSliderFormatting from "./AilmentSliderFormatting";
import ailment_data_handler from "../../processing/ailment/ailment_data_handler";
import ailment_level_icon from "../../processing/ailment/ailment_level_icon";

export default function AilmentDifFormatting({
    buff_new,
    ver_new,
    buff_old,
    ver_old,
    master_index,
    info,
    castlocation,
    character_face, //only on for list
    frameless, // for attached
    default_passoff, //default passoff
    passed_passive, // for passive defaults
    hide_title,
    debugging
}){

    const form = {diffing:true}
    const forma = {diffing:true,updown:true}

    const ailment_data_trans_new = ailment_data_handler(
        buff_new,
        buff_new.arank,
        buff_new.aarg1,
        buff_new.aarg2,
        buff_new.aranka,
        buff_new.aaug1a,
        buff_new.aaug2a,
        ver_new,
        master_index,
        castlocation,
        buff_new.life,
    )

    const { highestlvl, 
            turns_set,
            sliders,
            metadata,
            cast_title_str,
            cast_turns_str,
            cast_target_str
        } = ailment_data_trans_new

    const ailment_data_trans_old = ailment_data_handler(
            buff_old,
            buff_old.arank,
            buff_old.aarg1,
            buff_old.aarg2,
            buff_old.aranka,
            buff_old.aaug1a,
            buff_old.aaug2a,
            ver_old,
            master_index,
            castlocation,
            buff_old.life,
    )

    const metadata_old = ailment_data_trans_old.metadata
    const cast_title_str_old = ailment_data_trans_old.cast_title_str
    const cast_turns_str_old = ailment_data_trans_old.cast_turns_str
    const cast_target_str_old = ailment_data_trans_old.cast_target_str

    const char_id = master_index.charid

    const [onion_passoff, setonion_passoff] = useStateIfMounted();
    const [showdesc, setshowdesc] = useStateIfMounted(false);
    const [setdesc, setsetdesc] = useStateIfMounted();
    const [showtrans, setshowtrans] = useStateIfMounted(false)
    const [trans, settrans] = useStateIfMounted()

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
        setshowdesc(false)
        setsetdesc()
    }, [buff_new, setsetdesc, setshowdesc])

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
            const translate = translater(text, transnames)
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
        if (buff_new && buff_new.id && showdesc == true) {
            if (onion_passoff != undefined) {
                if (DevSwitch == true) {
                    axios.get(`http://localhost:3005/data/_dir/ailmenttextonion/${onion_passoff}`, { 'muteHttpExceptions': true }).then((res) => {
                        const response = res.data;
                        setsetdesc(response[ver_new])
                    }).catch(function (err) {
                        console.log(err)
                        setsetdesc("")
                    })
                } else {
                    axios.get(`https://www.dissidiacompendium.com/data/_dir/ailmenttextonion/${onion_passoff}.json`, { 'muteHttpExceptions': true }).then((res) => {
                        const response = res.data;
                        setsetdesc(response[ver_new])
                    }).catch(function (err) {
                        console.log(err)
                        setsetdesc("")
                    })
                }
            } else {
                if (buff_new.onion == undefined) {
                    if (DevSwitch == true) {
                        axios.get(`http://localhost:3005/data/_dir/ailmenttext/${buff_new.id}`, { 'muteHttpExceptions': true }).then((res) => {
                            const response = res.data;
                            setsetdesc(response[ver_new])
                        }).catch(function (err) {
                            console.log(err)
                            setsetdesc("")
                        })
                    } else {
                        axios.get(`https://www.dissidiacompendium.com/data/_dir/ailmenttext/${buff_new.id}.json`, { 'muteHttpExceptions': true }).then((res) => {
                            const response = res.data;
                            setsetdesc(response[ver_new])
                        }).catch(function (err) {
                            console.log(err)
                            setsetdesc("")
                        })
                    }
                }
            }
        }
        // eslint-disable-next-line 
    }, [showdesc, onion_passoff, buff_new, ver_new])

    const [currentlevel, setcurrentlevel] = useStateIfMounted(highestlvl != 0 ? buff_new.aarg1 : 1)

    useEffect(() => {
        if (buff_new && buff_new.onion != undefined && buff_new.onion != -1 && showdesc == true) {
            setonion_passoff(buff_new.onion + (currentlevel < 1 ? 0 : currentlevel - 1))
        }
    }, [currentlevel, setonion_passoff, buff_new, showdesc])

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

    const [options_tex, setoptions_tex] = useStateIfMounted("");
    const [options_tex_old, setoptions_tex_old] = useStateIfMounted("");

    useEffect(() => {
        if (buff_new.options != undefined) {
            var options_str = ""
            buff_new.options.forEach(self => {
                options_str = `${options_str} - ${self}\n`
            })
            setoptions_tex(options_str)
        }
        if (buff_old.options != undefined) {
            var options_old_str = ""
            buff_old.options.forEach(self => {
                options_old_str = `${options_old_str} - ${self}\n`
            })
            setoptions_tex_old(options_old_str)
        }
    }, [buff_new, buff_old, setoptions_tex, setoptions_tex_old])

    const minH = window.innerWidth <= 800 ? 210 : 150;

    const ailment_debug = {
        buff_new: buff_new,
        buff_old: buff_old,
        ailment_data_trans_new: ailment_data_trans_new,
        ailment_data_trans_old: ailment_data_trans_old
    }

    return (
        <div className={frameless != true ? character_face == true ? "buffunit" : "" : ""}>
            <div className={frameless != true ? "infoholder" : ""} style={{ minHeight: `${frameless == true || character_face != true ? 0 : minH}px` }}>
                <LazyLoadComponent>
                    {character_face == true?
                        <div className="infotitleholder">
                            <div className="faceandiconholder">
                                <CharacterFaceFormatting char_id={char_id} id={buff_new.chara_id}/>
                                <div onClick={showmeraw} className="infoiconholder2">
                                    <img className="bufficon" alt={buff_new.name && buff_new.name} src={`https://dissidiacompendium.com/images/static/icons/buff/${ailment_level_icon(buff_new,currentlevel)}.png`} />
                                </div>
                            </div>
                        </div>
                    :""}
                    <div style={{ marginTop: `${character_face != true ? "5px" : ""}` }} 
                         className={
                            frameless == true ? (buff_new.is_buff == 1 ? "Buffsubbanner2" : "Debuffsubbanner2") : 
                            buff_new.is_buff == 0 ? "Debuffbanner iconbuffer infonameholder nobuffpadding" : "Buffbanner iconbuffer infonameholder nobuffpadding"
                         }>
                        <div className={character_face != true ? "flexdisplay" :"infotitle2"}>
                            {character_face != true?
                                <div onClick={showmeraw} className="solo_buff_icon">
                                    <img className="bufficon2" alt={buff_new.name && buff_new.name} src={`https://dissidiacompendium.com/images/static/icons/buff/${ailment_level_icon(buff_new,currentlevel)}.png`} />
                                </div>
                            :
                            ""
                            }
                            <span className={character_face != true ? "splitrow" : ""}>
                            {ReplacerCharacter(`${buff_new && buff_new.name == "" ? `Unknown ${buff_new.is_buff == 1 ? "buff" : "debuff"}` : buff_new.name}${buff_new.is_state == true ? "" : ` - #${buff_new.id}`}`,form)}
                            {buff_new && buff_new.jpname == "" || buff_new && buff_new.jpname  == undefined ?
                                <div className="abilityJPname">
                                    {"None テキストなし"}
                                </div>
                                : <div className="abilityJPname">
                                    {ReplacerCharacter(buff_new.jpname,form)}
                                </div>}
                            </span>
                        </div>
                        {info != undefined?
                        <div className='buffglreworkbanner passiveinfobase'>{info}</div>
                        :""}
                    </div>
                    <AilmentSliderFormatting
                        ailment_data={buff_new}
                        sliders={sliders}
                        highestlvl={highestlvl}
                        nobuffpadding={frameless == true ? false : true}

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
                        frameless == true ? (buff_new.is_buff == 1 ? "Buffsubbase2" : "Debuffsubbase2") :
                        buff_new.is_buff == 0 ? "Debuffbase enemyabilityinfobase wpadding" : "Buffbase enemyabilityinfobase wpadding"
                        }>
                        {buff_new.hide_title == true || default_passoff != undefined || frameless == true || passed_passive != undefined || hide_title == true? "" :
                            <div className={"subpassiveflair cast_str"}>
                                {ReplacerCharacter(makediff(
                                `${cast_title_str_old}${cast_turns_str_old}${cast_target_str_old}`,
                                `${cast_title_str}${cast_turns_str}${cast_target_str}`
                                ),forma)}
                            </div>
                        }
                        <AilmentEffectDif
                            ailment_data_trans_new={ailment_data_trans_new}
                            ailment_data_trans_old={ailment_data_trans_old}
                            currentturns_passoff={currentturns}
                            currentdebuffsranks_passoff={currentdebuffsranks}
                            currentdebuffsranks2_passoff={currentdebuffsranks2}
                            currentdebuffsmuliply_passoff={currentdebuffsmuliply}
                            currentbuffsranks_passoff={currentbuffsranks}
                            currentfieldbuffsranks_passoff={currentfieldbuffsranks}
                            currentbuffsmuliply_passoff={currentbuffsmuliply}
                            currentstacks_passoff={currentstacks}
                            currentenemies_passoff={currentenemies}
                            currentgroupstacks_passoff={currentgroupstacks}
                            currenthp_passoff={currenthp}
                            charactersleft_passoff={charactersleft}
                            characterskb={characterskb}
                            currentlevel_passoff={currentlevel}
                            debugging={debugging}
                        />
                        {buff_new.options != undefined ?
                            <div className='p_grade'>
                                <div className='fieldbar'>
                                    <div >
                                        <span className='mini_ability'></span>Upgrades:
                                    </div>
                                </div>
                                {ReplacerCharacter(makediff(format_cleaner(options_tex_old).replace(/\s+$/g, ""), format_cleaner(options_tex).replace(/\s+$/g, "")),forma)}
                                <div className='abilityJPname'>*conditions may apply</div>
                            </div>
                            : ""}

                        {metadata && ReplacerCharacter(makediff(format_cleaner(metadata_old).replace(/^\s+|\s+$/g, ""), format_cleaner(metadata).replace(/^\s+|\s+$/g, "")),forma)}

                        <div onClick={() => showmedesc(showdesc)} className='clicky updatelink'>{showdesc == false ? "\xa0- Show Desc -" : "\xa0- Hide Desc -"}</div>
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
                        {ver_new == "JP" && showdesc == true ?
                            <div className='clicky updatelink contents' onClick={() => doTrans()}>Translate (Beta)</div>
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
                                data={buff_new} 
                                />
                            </span>
                            : ""}
                    </div>
                </LazyLoadComponent>
            </div>
        </div>
    )
}