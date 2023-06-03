import React, { useState, useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import '../Abilities.css';
import Tippy from './TippyDefaults.js';
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import EnemySingleBuffFormattingDirect from './EnemySingleBuffFormattingDirect.js'
import DevSwitch from '../redux/DevSwitch'
import axios from "axios";
import Enemy_Option_Pars from './Ability_Handler/Enemy_Option_Pars';
import replacer_title from '../processing/replacer_titles'
import Hit_Handler_Direct from './Ability_Handler/Hit_Display_Direct';
import ReactJson from '@microlink/react-json-view'
import AI_Handler from './EnemyAbilities_AI_Handler';

const EnemyAbilitiesFormattingDirect = ({ match, pull, command_id, enemy_id, nolink, showmeraw, abilitylist, showai }) => {

    const [selectedbuff, setselectedbuff] = useStateIfMounted([]);
    const [abilitiespull, setabilitiespull] = useStateIfMounted(match);

    const buffselect = (buffs) => {
        if (selectedbuff.unq_id == buffs.unq_id) {
            setselectedbuff([])
        } else {
            setselectedbuff(buffs)
        }
    }

    const [showmedebug, setshowmedebug] = useStateIfMounted(false)

    const handleClick = (e) => {
        if (e.shiftKey) {
            setshowmedebug((prev) => !prev)
        }
    }

    const fulllist = []

    abilitiespull && abilitiespull.ai && abilitiespull.ai.reaction && fulllist.push(...abilitiespull.ai.reaction)
    abilitiespull && abilitiespull.ai && abilitiespull.ai.action && fulllist.push(...abilitiespull.ai.action)

    const ability_checks = []

    abilitiespull && abilitiespull.ai && abilitiespull.ai.reaction && ability_checks.push(...abilitiespull.ai.reaction)
    abilitiespull && abilitiespull.ai && abilitiespull.ai.action && ability_checks.push(...abilitiespull.ai.action)
    abilitiespull && abilitiespull.ai && abilitiespull.ai.added && ability_checks.push(abilitiespull.ai.added)

    const is_recast = ability_checks && ability_checks.some(self => self.recast == 1)
    const is_force = ability_checks && ability_checks.some(self => self.force == 1)
    const is_orb = ability_checks && ability_checks.some(self => self.orb == 1)
    const is_reaction = ability_checks && ability_checks.some(self => self.reaction == 1)

    const change_color = (IconURL) => {
        var holder = IconURL
        if (is_recast == true) {
            holder = holder && holder.toString().replace(/Blue/, 'Red')
        }
        if (is_orb == true) {
            holder = holder && holder.toString().replace(/Blue/, 'Orb')
        }
        if (is_force == true) {
            holder = holder && holder.toString().replace(/Blue/, 'Force')
        }
        if (is_reaction == true) {
            holder = holder && holder.toString().replace(/Blue/, 'Green')
        }
        if (abilitiespull && abilitiespull.ai && abilitiespull.ai.reaction != undefined) {
            holder = holder && holder.toString().replace(/Blue/, 'Green')
        }
        return holder
    }

    return (
        abilitiespull == undefined ?
            <div className="buffunit">
                <div className="infonameholder nobuffpadding ">Loading...</div>
            </div>
            : <div className="buffunit">
                <div className="infoholder">
                    <div className="infotitleholder">
                        {nolink == true ?
                            <div className="enemyabilityiconholder">
                                <img onClick={handleClick} className="abilityicon" alt={abilitiespull.Name} src={`https://dissidiacompendium.com/images/static/icons/buttons/ability/${change_color(abilitiespull.IconURL)}`} />
                            </div>
                            :
                            abilitiespull.IconURL != undefined ?
                                <div className="enemyabilityiconholder">
                                    <Link className="abilityurlholder" to={`/bestiary/enemies/${abilitiespull.battle_enemy_id}`}>
                                        <img className="abilityicon" alt={abilitiespull.Name} src={`https://dissidiacompendium.com/images/static/icons/buttons/ability/${change_color(abilitiespull.IconURL)}`} />
                                    </Link>
                                </div> : ""
                        }
                    </div>
                    <div className={`bluebanner infonameholder nobuffpadding `}>
                        <div className="displayfex">
                            <div className="splitrow">
                                <div className={`infotitle abilitydisplayfex `}>
                                    {abilitiespull.Name && replacer_title(abilitiespull.Name)}{` #${match.abilityid_}`}
                                    {abilitiespull.Magic == true ?
                                        <span className="Magic"></span>
                                        : ""}
                                    {abilitiespull.Melee == true ?
                                        <span className="Melee"></span>
                                        : ""}
                                    {abilitiespull.Ranged == true ?
                                        <span className="Ranged"></span>
                                        : ""}
                                    {abilitiespull.Fire == true ?
                                        <span className="Fire"></span>
                                        : ""}
                                    {abilitiespull.Ice == true ?
                                        <span className="Ice"></span>
                                        : ""}
                                    {abilitiespull.Thunder == true ?
                                        <span className="Thunder"></span>
                                        : ""}
                                    {abilitiespull.Earth == true ?
                                        <span className="Earth"></span>
                                        : ""}
                                    {abilitiespull.Water == true ?
                                        <span className="Water"></span>
                                        : ""}
                                    {abilitiespull.Wind == true ?
                                        <span className="Wind"></span>
                                        : ""}
                                    {abilitiespull.Holy == true ?
                                        <span className="Holy"></span>
                                        : ""}
                                    {abilitiespull.Dark == true ?
                                        <span className="Dark"></span>
                                        : ""}
                                </div>
                                <div className="infolocation">
                                    {abilitiespull.JPName != null ?
                                        <div className="abilityJPname">
                                            {abilitiespull.JPName && replacer_title(abilitiespull.JPName)}
                                        </div>
                                        :
                                        <div className="abilityJPname">
                                            {abilitiespull.Name && replacer_title(abilitiespull.Name)}
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {(showmeraw == true || showai == true) && abilitiespull.ai != undefined ?
                        <AI_Handler
                            ai={abilitiespull.ai}
                            abilitylist={abilitylist}
                            debug={showmedebug}
                            showmeraw={showmeraw}
                        />
                        : ""}
                    <div className={`bluebase enemyabilityinfobase `}>
                        <Hit_Handler_Direct
                            command_meta={abilitiespull}
                            showai={showai}
                            showmeraw={showmeraw}
                        />
                        {showmedebug == true ?
                            <ReactJson iconStyle={"square"} quotesOnKeys={false} name={"Ability Debug"} displayDataTypes={false} collapsed={false} theme={"threezerotwofour"} src={abilitiespull} />
                            : ""}
                    </div>
                    {abilitiespull.Options && abilitiespull.Options.map((options, key) => (
                        <Enemy_Option_Pars key={key} enemy_option={options} />
                    ))}
                    {abilitiespull.Casts && abilitiespull.Casts ?
                        <div className={`bufflistbanner noselect newblue`}>
                            <div className="unique ailmenttext">Buffs / Debuffs:</div>
                            <ul className="abilitybufflist">
                                {abilitiespull.Casts && abilitiespull.Casts.map(function (buffs) {
                                    return <li className={`abilitybufficonsholder ${selectedbuff.unq_id == buffs.unq_id ? "buffactive" : ""}`} key={buffs.unq_id}>
                                        <div className="biconspacer" onClick={() => buffselect(buffs)} >
                                            <Tippy content={
                                                buffs.name && replacer_title(buffs.name)}>
                                                <img alt={buffs.name} className={`clicky abilitybufficon `} src={"https://dissidiacompendium.com/images/static/" + buffs.icon} />
                                            </Tippy>
                                        </div>
                                    </li>;
                                })}
                            </ul>
                        </div>
                        : ""}
                    {selectedbuff.length == 0 ? "" :
                        <EnemySingleBuffFormattingDirect enemy_id={abilitiespull.enemyID} match={selectedbuff} />
                    }
                </div>
            </div>
    )
}

export default EnemyAbilitiesFormattingDirect;