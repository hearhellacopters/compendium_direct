import React, { useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import Tippy from '../../../components/TippyDefaults.js';
import ReplacerCharacter from '../../ReplacerCharacter.js'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import AilmentDataFormattingEnemy from '../Buff_Handler/AilmentDataFormattingEnemy.js';
import DevSwitch from '../../../redux/DevSwitch'
import axios from "axios";
import Option_Pars_Enemy from './OptionParsFormattingEnemy.js';
import ailment_level_icon from '../../../processing/ailment/ailment_level_icon.js';
import { _error } from '../../../redux/sagas/handlers/_error_state_add.js';
import { _error_remove } from '../../../redux/sagas/handlers/_error_state_remove.js';

export default function EnemyAbilitiesListingFormattingDirect({ match }){

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
                _error_remove(`enemies_abilities_direct_desc_${currentenemyid}`);
                setabilitiespull(response);
            }).catch(function (err) {
                _error(`enemies_abilities_direct_desc_${currentenemyid}`, err.message);
            })
        }
        if (DevSwitch == false && currentenemyid != null && getdesc == true && abilitiespull == undefined) {
            axios.get(`https://www.dissidiacompendium.com/data/enemies/abilities_direct/desc/${currentenemyid}.json`, { 'muteHttpExceptions': true }).then((res) => {
                const response = res.data;
                _error_remove(`enemies_abilities_direct_desc_${currentenemyid}`);
                setabilitiespull(response);
            }).catch(function (err) {
                _error(`enemies_abilities_direct_desc_${currentenemyid}`, err.message);
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
                                <img className="abilityicon" alt={match.Name} src={`https://dissidiacompendium.com/images/static/icons/buttons/ability/${match.IconURL}`} />
                            </Link>
                        </div> : ""}
                </div>
                <div className={`bluebanner infonameholder nobuffpadding`}>
                    <div className={`infotitle abilitydisplayfex `}>
                        {match.Name && ReplacerCharacter(match.Name + ` #${match.abilityid_}`)}
                        {match.Magic == true ?
                            <span className="inline Magic"></span>
                            : ""}
                        {match.Melee == true ?
                            <span className="inline Melee"></span>
                            : ""}
                        {match.Ranged == true ?
                            <span className="inline Ranged"></span>
                            : ""}
                        {match.Fire == true ?
                            <span className="inline Fire"></span>
                            : ""}
                        {match.Ice == true ?
                            <span className="inline Ice"></span>
                            : ""}
                        {match.Thunder == true ?
                            <span className="inline Thunder"></span>
                            : ""}
                        {match.Earth == true ?
                            <span className="inline Earth"></span>
                            : ""}
                        {match.Water == true ?
                            <span className="inline Water"></span>
                            : ""}
                        {match.Wind == true ?
                            <span className="inline Wind"></span>
                            : ""}
                        {match.Holy == true ?
                            <span className="inline Holy"></span>
                            : ""}
                        {match.Dark == true ?
                            <span className="inline Dark"></span>
                            : ""}
                    </div>
                    <div className="infolocation">
                        {match.JPName != null ?
                            <div className="abilityJPname">
                                {match.JPName && ReplacerCharacter(match.JPName)}
                            </div>
                            :
                            <div className="abilityJPname">
                                {match.JPName && ReplacerCharacter(match.Name)}
                            </div>
                        }
                    </div>
                </div>
                <div className={`bluebase enemyabilityinfobase `}>
                    {match.EnemyName != null ?
                        <Link className="clicky linktopage" to={`/bestiary/enemies/${match.battle_enemy_id}`}>
                            <span >{`${match.EnemyName} or similar enemies`}</span>
                        </Link>
                    : ""}
                </div>
                {getdesc == true && abilitiespull && abilitiespull.Options &&
                    abilitiespull.Options.map(options => (
                        <Option_Pars_Enemy key={options.data_id} enemy_option={options} />
                    ))}
                {abilitiespull && abilitiespull.Casts ?
                    <div className={`bufflistbanner noselect newblue`}>
                        <div className="unique ailmenttext">Buffs / Debuffs:</div>
                        <ul className="abilitybufflist">
                            {abilitiespull && abilitiespull.Casts && abilitiespull.Casts.map(buffs => (
                                <li className={`abilitybufficonsholder ${selectedbuff.unq_id == buffs.unq_id ? "buffactive" : ""}`} key={buffs.unq_id}>
                                    <div className="biconspacer" onClick={() => buffselect(buffs)} >
                                        <Tippy content={buffs.name && ReplacerCharacter(buffs.name)}>
                                            <img alt={buffs.name} className={`clicky abilitybufficon `} src={`https://dissidiacompendium.com/images/static/icons/buff/${ailment_level_icon(buffs,buffs.arg1)}.png`} />
                                        </Tippy>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    : ""}
                {selectedbuff.length == 0 ? "" :
                    <AilmentDataFormattingEnemy 
                    ailment_data={selectedbuff} 
                    enemy_space={true}
                    />
                }
            </div>
        </div>
    )
}