import React, { useState, useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import '../Abilities.css';
import Tippy from './TippyDefaults.js';
import replace_title from '../processing/replacer_titles'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import EnemySingleBuffFormattingDirect from './EnemySingleBuffFormattingDirect.js'
import DevSwitch from '../redux/DevSwitch'
import axios from "axios";
import Enemy_Option_Pars from './Ability_Handler/Enemy_Option_Pars';
import Hit_Handler_Direct from './Ability_Handler/Hit_Display_Direct';

const AbilityFormatting = ({ match }) => {

    const [selectedbuff, setselectedbuff] = useStateIfMounted([]);
    const [abilitiespull, setabilitiespull] = useStateIfMounted();
    const [getdesc, setgetdesc] = useStateIfMounted(false);

    const currentenemyid = match.data_id

    const buffselect = (buffs) => {
        if (selectedbuff.unq_id == buffs.unq_id) {
            setselectedbuff([])
        } else {
            setselectedbuff(buffs)
        }
    }

    useEffect(() => {
        if (DevSwitch == true && currentenemyid != null && getdesc == true && abilitiespull == undefined) {
            axios.get(`http://localhost:3001/data/enemies/abilities_direct/desc/${currentenemyid}`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setabilitiespull(response)
            }).catch(function (err) {
                console.log(err)
            })
        }
        if (DevSwitch == false && currentenemyid != null && getdesc == true && abilitiespull == undefined) {
            axios.get(`https://www.dissidiacompendium.com/data/enemies/abilities_direct/desc/${currentenemyid}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                setabilitiespull(response)
            }).catch(function (err) {
                console.log(err)
            })
        }
    }, [currentenemyid, getdesc, abilitiespull, setabilitiespull])

    return (
        <div key={match.data_id + "unit"} className="buffunit">
            <div className="infoholder">
                <div className="infotitleholder">
                    {match.IconURL != undefined ?
                        <div className="enemyabilityiconholder">
                            <Link className="abilityurlholder" to={`/bestiary/enemies/${match.battle_enemy_id}`}>
                                <LazyLoadImage effect="opacity" className="abilityicon" alt={match.Name} src={`https://dissidiacompendium.com/images/static/icons/buttons/ability/${match.IconURL}`} />
                            </Link>
                        </div> : ""}
                </div>
                <div className={`bluebanner infonameholder nobuffpadding `}>
                    <div className="displayfex">
                        <div className="splitrow">
                            <div className={`infotitle abilitydisplayfex `}>
                                {match.Name && replace_title(match.Name + ` #${match.abilityid_}`)}
                                {match.Magic == true ?
                                    <span className="Magic"></span>
                                    : ""}
                                {match.Melee == true ?
                                    <span className="Melee"></span>
                                    : ""}
                                {match.Ranged == true ?
                                    <span className="Ranged"></span>
                                    : ""}
                                {match.Fire == true ?
                                    <span className="Fire"></span>
                                    : ""}
                                {match.Ice == true ?
                                    <span className="Ice"></span>
                                    : ""}
                                {match.Thunder == true ?
                                    <span className="Thunder"></span>
                                    : ""}
                                {match.Earth == true ?
                                    <span className="Earth"></span>
                                    : ""}
                                {match.Water == true ?
                                    <span className="Water"></span>
                                    : ""}
                                {match.Wind == true ?
                                    <span className="Wind"></span>
                                    : ""}
                                {match.Holy == true ?
                                    <span className="Holy"></span>
                                    : ""}
                                {match.Dark == true ?
                                    <span className="Dark"></span>
                                    : ""}
                            </div>
                            <div className="infolocation">
                                {match.JPName != null ?
                                    <div className="abilityJPname">
                                        {match.JPName && replace_title(match.JPName)}
                                    </div>
                                    :
                                    <div className="abilityJPname">
                                        {match.JPName && replace_title(match.Name)}
                                    </div>}
                                {match.EnemyName != null ?
                                    <Link className="clicky linktopage" to={`/bestiary/enemies/${match.battle_enemy_id}`}>
                                        <span >{`${match.EnemyName} or similar enemies`}</span>
                                    </Link>
                                    : ""}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`bluebase enemyabilityinfobase `}>
                    {getdesc == false ?
                        <div className="clicky thecoloryellow" onClick={() => setgetdesc((prevValue) => !prevValue)}>- Click to Load - </div>
                        : ""}
                    {getdesc == true ?
                        <Hit_Handler_Direct
                            command_meta={abilitiespull}
                        />
                        : ""}
                </div>
                {getdesc == true && abilitiespull && abilitiespull.Options &&
                    abilitiespull.Options.map(options => (
                        <Enemy_Option_Pars key={options.data_id} enemy_option={options} />
                    ))}
                {abilitiespull && abilitiespull.Casts ?
                    <div className={`bufflistbanner noselect newblue`}>
                        <div className="unique ailmenttext">Buffs / Debuffs:</div>
                        <ul className="abilitybufflist">
                            {abilitiespull && abilitiespull.Casts && abilitiespull.Casts.map(buffs => (
                                <li className={`abilitybufficonsholder ${selectedbuff.unq_id == buffs.unq_id ? "buffactive" : ""}`} key={buffs.unq_id}>
                                    <div className="biconspacer" onClick={() => buffselect(buffs)} >
                                        <Tippy content={buffs.name && replace_title(buffs.name)}>
                                            <img alt={buffs.name} className={`clicky abilitybufficon `} src={"https://dissidiacompendium.com/images/static/" + buffs.icon} />
                                        </Tippy>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    : ""}
                {selectedbuff.length == 0 ? "" :
                    <EnemySingleBuffFormattingDirect enemy_id={match.enemyID} match={selectedbuff} />
                }
            </div>
        </div>
    )
}

export default AbilityFormatting;