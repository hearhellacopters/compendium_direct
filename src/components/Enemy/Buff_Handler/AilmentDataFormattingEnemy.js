import React, { useState, useEffect } from 'react';
import AilmentDataParsHandlerEnemy from './AilmentDataEffectHandlerEnemy';
import DefaultTippy from '../../TippyDefaults'
import { useStateIfMounted } from 'use-state-if-mounted';
import Ailment_Level_Settings from './AilmentLevelSettingsEnemy';
import AilmentSliderFormatting from '../../Buffs/AilmentSliderFormatting';
import ReplacerCharacter from '../../ReplacerCharacter'
import ailment_level_icon from '../../../processing/ailment/ailment_level_icon';

export default function AilmentDataFormattingEnemy({
    ailment_data,
    turns,
    frameless,
    enemy_space
}){

    const slider = true

    const castlocation = true

    const arg1 = ailment_data.arg1

    const arg2 = ailment_data.arg2

    const rank = ailment_data.rank

    const [highestlvl, setHighestlvl] = useState();

    useEffect(() => {
        if (ailment_data.max_level >= 10) {
            setHighestlvl(10)
        }
        if (ailment_data.max_level <= 10 && ailment_data.max_level != 0) {
            setHighestlvl(ailment_data.max_level)
        }
        if (ailment_data.max_level == 0) {
            setHighestlvl(0)
        }
        if (ailment_data.max_level_overide != undefined) {
            setHighestlvl(ailment_data.max_level_overide)
        }

        if (ailment_data.max_level == -1 && arg2 != undefined) {
            setHighestlvl(arg2)
        }
        if (ailment_data.max_level == -1 && arg2 == undefined) {
            setHighestlvl(10)
        }
    }, [ailment_data, arg2])

    const [currentrank, setcurrentrank] = useState(castlocation == false ? 1 : rank)
    const [currentlevel, setcurrentlevel] = useState(castlocation == false ? 1 : arg1)

    useEffect(() => {
        if (arg1 != undefined && highestlvl != 0) {
            if (castlocation == true) {
                setcurrentlevel(arg1)
            }
        }
    }, [highestlvl, ailment_data, arg1, castlocation])

    var turns_set = ailment_data && ailment_data.alife != undefined ? ailment_data.alife : turns

    const [currentturns, setcurrentturns] = useStateIfMounted(turns_set == undefined ? 1 : turns_set < 1 ? 1 : turns_set)
    const [currentdebuffsranks, setcurrentdebuffsranks] = useStateIfMounted(9)
    const [currentdebuffsranks2, setcurrentdebuffsranks2] = useStateIfMounted(8)
    const [currentdebuffsmuliply, setcurrentdebuffsmuliply] = useStateIfMounted(9)
    const [currentbuffsranks, setcurrentbuffsranks] = useStateIfMounted(19)
    const [currentfieldbuffsranks, setcurrentfieldbuffsranks] = useStateIfMounted(7)
    const [currentbuffsmuliply, setcurrentbuffsmuliply] = useStateIfMounted(19)
    const [currentstacks, setcurrentstacks] = useStateIfMounted(5)
    const [currentenemies, setcurrentenemies] = useStateIfMounted(3)
    const [currentgroupstacks, setcurrentgroupstacks] = useStateIfMounted(5)
    const [currenthp, setcurrenthp] = useState(100)
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

    const handleChangeRank = (e) => {
        setcurrentrank(parseInt(e.x));
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

    const sliders = ailment_data.sliders

    const ailment_pars = {}

    for (let index = 0; index < 10; index++) {
        if (index == 4 && ailment_data.effect_id_4 && ailment_data.effect_id_4.effectstr != "Activates Field Effects" && ailment_data.effect_id_4.cond_id != undefined) {
            Object.assign(ailment_pars, { [`effect_id_${index}`]: ailment_data[`effect_id_${index}`] })
        }
        if (index != 4) {
            Object.assign(ailment_pars, { [`effect_id_${index}`]: ailment_data[`effect_id_${index}`] })
        }
    }

    if (ailment_data.field_effects != undefined) {
        Object.assign(ailment_pars, { field: [] })
        ailment_data.field_effects.forEach(self => {
            ailment_pars.field.push(self)
        })
    }

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


    const metadata = ailment_data.metadata

    const [attachedbuff, setattachedbuff] = useStateIfMounted([])

    const buffattachedselect = (e) => {
        if (attachedbuff && attachedbuff.id == e.id) {
            setattachedbuff([])
        } else {
            setattachedbuff(e)
        }
    }

    return (
        <div>
            <div className={frameless != true ? "infoholder" : ""}>
                <div style={{ marginTop: `5px` }} 
                         className={
                            frameless == true ? (ailment_data.is_buff == 1 ? "Buffsubbanner2" : "Debuffsubbanner2") : 
                            ailment_data.is_buff == 0 ? `Debuffbanner iconbuffer infonameholder ${enemy_space != true ? "" : "nobuffpadding"}` : `Buffbanner iconbuffer infonameholder ${enemy_space != true ? "" : "nobuffpadding"}`
                         }>
                    <div className={ "flexdisplay"}>
                        <div className="solo_buff_icon">
                            <img className="bufficon2" alt={ailment_data.name && ailment_data.name} src={`https://dissidiacompendium.com/images/static/icons/buff/${ailment_level_icon(ailment_data,currentlevel)}.png`} />
                        </div>
                        <span className={"splitrow"}>
                        {ReplacerCharacter(`${ailment_data && ailment_data.name == "" ? `Unknown ${ailment_data.is_buff == 1 ? "buff" : "debuff"}` : ailment_data.name}${ailment_data.is_state == true ? "" : ` - #${ailment_data.id}`}`)}
                        {ailment_data && ailment_data.jpname == "" || ailment_data && ailment_data.jpname  == undefined ?
                            <div className="abilityJPname">
                                {"None テキストなし"}
                            </div>
                            : <div className="abilityJPname">
                                {ReplacerCharacter(ailment_data.jpname)}
                            </div>}
                        </span>
                    </div>
                </div>
                <AilmentSliderFormatting
                    ailment_data={ailment_data}
                    sliders={sliders}
                    highestlvl={highestlvl}
                    nobuffpadding={enemy_space ? frameless == true ? false : true : false}

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
                 <div style={{ marginTop: `${frameless  != true ? "5px" : ""}` }}
                 className={
                        frameless == true ? (ailment_data.is_buff == 1 ? "Buffsubbase2" : "Debuffsubbase2") :
                        ailment_data.is_buff == 0 ? `Debuffbase iconbuffer infonameholder ${enemy_space != true ? "" : "nobuffpadding"}` : `Buffbase iconbuffer infonameholder ${enemy_space != true ? "" : "nobuffpadding"}`
                        }>
                    {ailment_data.hide_title == true || frameless == true || ailment_data.alife == -1 ? "" :
                        <div className={"subpassiveflair cast_str"}>
                            {`For `}<span className='values'>{`${ailment_data.alife != -1 ? `${ailment_data.alife} turn${ailment_data.alife != 1 ? "s " : " "}` : ""}`}</span>{ReplacerCharacter(`${ailment_data.atarg == undefined ? "" : `to ${ailment_data.atarg }`}`)}
                        </div>
                    }
                    {ailment_data.note != undefined ?
                        <div className="subpassiveflair">
                            {ailment_data.note.split(/\n/gm).map((value, i) =>
                                ReplacerCharacter(`${value}\n`,{updown:true})
                            )}
                        </div>
                        : ""}
                    {ailment_data.components != undefined ?
                        <div className="subpassiveflair2">
                            {ailment_data.components.map((item, i) =>
                                ReplacerCharacter(item,{updown:true})
                            )}
                        </div>
                        : ""}
                    {ailment_num.map((num, i)=>
                        ailment_pars[`effect_id_${num}`] && 
                        <AilmentDataParsHandlerEnemy
                            key={i}
                            effect_id={ailment_pars[`effect_id_${num}`]}
                            slider={slider}
                            castlocation={castlocation}
                            currentrank={currentrank}
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
                        />
                    )}
                    {ailment_pars.field != undefined ?
                        <div >
                            <div className='spacearound'>
                                <DefaultTippy content="Field Effects">
                                    <span className='fieldeffects'></span>
                                </DefaultTippy>
                            </div>
                            {ailment_pars.field.map((item, i) =>
                                <AilmentDataParsHandlerEnemy
                                    key={i}
                                    effect_id={item}
                                    slider={slider}
                                    castlocation={castlocation}
                                    currentrank={currentrank}
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
                                />
                            )}
                        </div>
                        : ""}
                    {ailment_data.modify != undefined ?
                        <div className="introflex Dbase">
                            Modify:
                            <br />
                            {ailment_data.modify.map((item, i) =>
                                ReplacerCharacter(item)
                            )}
                        </div>
                        : ""}
                    {ailment_data.levelsettings != undefined ?
                        <Ailment_Level_Settings levelsettings={ailment_data.levelsettings} />
                        : ""}

                    {metadata && metadata.split('\n').map((item, i) => <div key={i}>{item}</div>)}

                    {ailment_data.attached != undefined ?
                        <div className='infonameholder newblue'>
                            <div className="unique ailmenttext">
                                Associated Casts:
                            </div>
                            <ul className="abilitybufflist">
                                {ailment_data.attached.map(function (buff) {
                                    return <li className={`abilitybufficonsholder ${buff.id == attachedbuff.id ? "buffactive" : ""}`} key={buff.id}>
                                        <div className="biconspacer" onClick={() => buffattachedselect(buff)} >
                                            <DefaultTippy content={ReplacerCharacter(buff.name)}>
                                                <img alt={buff.name} className="clicky abilitybufficon" src={`https://dissidiacompendium.com/images/static/icons/buff/${buff.icon}.png`} />
                                            </DefaultTippy>
                                        </div>
                                    </li>
                                })}
                            </ul>
                        </div>
                        : ""}

                    {attachedbuff.length != 0 ?
                        <AilmentDataFormattingEnemy
                            key={attachedbuff.id}
                            ailment_data={attachedbuff}
                            frameless={true}
                            enemy_space={false}
                        />
                    : ""}
                </div>
            </div>
        </div>
    )
}