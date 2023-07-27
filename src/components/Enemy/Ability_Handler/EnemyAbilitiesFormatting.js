import React from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import Tippy from '../../../components/TippyDefaults.js';
import { Link } from 'react-router-dom'
import AilmentDataFormattingEnemy from '../Buff_Handler/AilmentDataFormattingEnemy.js';
import OptionParsFormattingEnemy from './OptionParsFormattingEnemy.js';
import ReplacerCharacter from '../../ReplacerCharacter.js'
import AI_Handler from './EnemyAbilities_AI_Handler';
import { ObjectView } from 'react-object-view'
import ailment_level_icon from '../../../processing/ailment/ailment_level_icon.js';
import Hit_Data_Pars_Enemy from "./HitDataParsFormattingEnemy";

export default function EnemyAbilitiesFormatting({ 
    match, 
    pull, 
    command_id, 
    enemy_id, 
    nolink,
    showmeraw, 
    abilitylist, 
    showai 
}) {

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

    if(match == undefined){
        return(
            <div className="buffunit">
                <div className="infonameholder nobuffpadding ">Loading...</div>
            </div>
        )
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

    const Meta = abilitiespull && abilitiespull.Meta

    const hit_map = abilitiespull.hit_data || {}

    const cast_list = abilitiespull.cast_hit || {}

    const hit_count_map = Array.from(Array(40).keys(), num => num + 1);
    
    return (
        <div className="buffunit">
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
                <div className={`bluebanner infonameholder nobuffpadding`}>
                    <div className={`infotitle abilitydisplayfex `}>
                        {abilitiespull.Name && ReplacerCharacter(abilitiespull.Name)}{` #${match.abilityid_}`}
                        {abilitiespull.Magic == true ?
                            <span className="inline Magic"></span>
                            : ""}
                        {abilitiespull.Melee == true ?
                            <span className="inline Melee"></span>
                            : ""}
                        {abilitiespull.Ranged == true ?
                            <span className="inline Ranged"></span>
                            : ""}
                        {abilitiespull.Fire == true ?
                            <span className="inline Fire"></span>
                            : ""}
                        {abilitiespull.Ice == true ?
                            <span className="inline Ice"></span>
                            : ""}
                        {abilitiespull.Thunder == true ?
                            <span className="inline Thunder"></span>
                            : ""}
                        {abilitiespull.Earth == true ?
                            <span className="inline Earth"></span>
                            : ""}
                        {abilitiespull.Water == true ?
                            <span className="inline Water"></span>
                            : ""}
                        {abilitiespull.Wind == true ?
                            <span className="inline Wind"></span>
                            : ""}
                        {abilitiespull.Holy == true ?
                            <span className="inline Holy"></span>
                            : ""}
                        {abilitiespull.Dark == true ?
                            <span className="inline Dark"></span>
                            : ""}
                    </div>
                    <div className="infolocation">
                        {abilitiespull.JPName != null ?
                            <div className="abilityJPname">
                                {abilitiespull.JPName && ReplacerCharacter(abilitiespull.JPName)}
                            </div>
                            :
                            <div className="abilityJPname">
                                {abilitiespull.Name && ReplacerCharacter(abilitiespull.Name)}
                            </div>
                        }
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
                
                    {Meta && Meta.note != undefined ?
                        <div className="subpassiveflair">
                            {ReplacerCharacter(`${abilitiespull.Meta.note}\n`)}
                        </div>
                        : ""}
                    {hit_map[`B1`] != undefined && hit_map[`B1`].show != false ?
                        <Hit_Data_Pars_Enemy
                            key={`B1`}
                            hit_data={hit_map[`B1`]}
                        />
                        : ""}

                    {hit_map[`B2`] != undefined && hit_map[`B2`].show != false ?
                        <Hit_Data_Pars_Enemy
                            key={`B2`}
                            hit_data={hit_map[`B2`]}
                        />
                        : ""}

                    {hit_map[`B3`] != undefined && hit_map[`B3`].show != false ?
                        <Hit_Data_Pars_Enemy
                            key={`B3`}
                            hit_data={hit_map[`B3`]}
                        />
                        : ""}

                    {hit_map[`B4`] != undefined && hit_map[`B4`].show != false ?
                        <Hit_Data_Pars_Enemy
                            key={`B4`}
                            hit_data={hit_map[`B4`]}
                        />
                        : ""}

                    {cast_list[-1] != undefined ?
                        cast_list[-1].map(self => (
                            self.cond != undefined ? ReplacerCharacter(`┬ ${self.cond}\n└─ ${self.cast_str}\n`) : ReplacerCharacter(`${self.cast_str}\n`)
                        ))
                        : ""}

                    {hit_count_map.map(number => (
                        (cast_list[number] != undefined || (hit_map[number] != undefined && hit_map[number].show != false)) ? 
                        <Hit_Data_Pars_Enemy
                            key={number}
                            cast_list={cast_list[number]}
                            hit_data={hit_map[number]}
                        />
                        :""
                    ))}

                    {cast_list[0] != undefined ?
                        cast_list[0].map(self => (
                            self.cond != undefined ? ReplacerCharacter(`┬ ${self.cond}\n└─ ${self.cast_str}\n`) : ReplacerCharacter(`${self.cast_str}\n`)
                        ))
                        : ""}

                    {hit_map[`S1`] != undefined && hit_map[`S1`].show != false ?
                        <Hit_Data_Pars_Enemy
                            key={`S1`}
                            hit_data={hit_map[`S1`]}
                        />
                        : ""}

                    {//Meta && Meta.faf != undefined ?
                    //    <div>
                    //        {ReplacerCharacter(Meta && Meta.faf)}
                    //    </div>
                    //    : ""}
                    }
                    {Meta && Meta.bdlur != undefined ?
                        ReplacerCharacter(Meta.bdlur+"\n")
                        : ""}
                    {Meta && Meta.mblur != undefined ?
                        ReplacerCharacter(Meta.mblur+"\n")
                        : ""}
                    {
                    //{Meta && Meta.kcon != undefined ?
                    //    ReplacerCharacter(Meta.kcon+"\n")
                    //    : ""}
                    //{Meta && Meta.kcon_1 != undefined ?
                    //    ReplacerCharacter(Meta.kcon_1+"\n")
                    //    : ""}
                    //{Meta && Meta.kid != undefined ?
                    //    ReplacerCharacter(Meta.kcon+"\n")
                    //    : ""}
                    //{Meta && Meta.kid_1 != undefined ?
                    //    ReplacerCharacter(Meta.kcon_1+"\n")
                    //    : ""}
                    }

                    {Meta && Meta.cost != undefined ?
                        ReplacerCharacter(Meta.cost+"\n")   
                    : ""}

                    {Meta && Meta.nasp != undefined ?
                        ReplacerCharacter(Meta.nasp+"\n")
                    : ""}
                    {Meta && Meta.nex != undefined ?
                        ReplacerCharacter(Meta.nex+"\n")
                    : ""}
                    {Meta && Meta.nsum != undefined ?
                        ReplacerCharacter(Meta.nsum+"\n")
                    : ""}
                    {Meta && Meta.nabi != undefined ?
                        ReplacerCharacter(Meta.nabi+"\n")
                    : ""}
                    {Meta && Meta.exshow != undefined ?
                        ReplacerCharacter(Meta.exshow+"\n")
                    : ""}
                    {Meta && Meta.ncharge != undefined ?
                        ReplacerCharacter( Meta.ncharge+"\n")
                    : ""}
                    {showmeraw == true ?
                        <>
                            {Meta && Meta.type_ != undefined ?
                                ReplacerCharacter(Meta.type_+"\n")
                            : ""}
                            {Meta && Meta.target_range_ != undefined ?
                                ReplacerCharacter(Meta.target_range_+"\n")
                            : ""}
                            {Meta && Meta.target_type_ != undefined ?
                                ReplacerCharacter(Meta.target_type_+"\n")
                            : ""}
                            {Meta && Meta.auto_target_type_ != undefined ?
                                ReplacerCharacter(Meta.auto_target_type_+"\n")
                            : ""}
                            {Meta && Meta.show != undefined ?
                                ReplacerCharacter(Meta.show+"\n")
                            : ""}
                            {Meta && Meta.showadd != undefined ?
                                ReplacerCharacter(Meta.showadd+"\n")
                            : ""}
                        </>
                    : ""}
                    {showmedebug == true ?
                        <span className='react-json-view'>
                            <ObjectView 
                            options={
                                {
                                    hideDataTypes: true,
                                    expandLevel: 1
                                }
                                }
                            data={abilitiespull} />
                        </span>
                        : ""}
                </div>
                {abilitiespull.Options && abilitiespull.Options.map((options, key) => (
                    <OptionParsFormattingEnemy key={key} enemy_option={options} />
                ))}
                {abilitiespull.Casts && abilitiespull.Casts ?
                    <div className={`bufflistbanner noselect newblue`}>
                        <div className="unique ailmenttext">Buffs / Debuffs:</div>
                        <ul className="abilitybufflist">
                            {abilitiespull.Casts && abilitiespull.Casts.map(function (buffs) {
                                return <li className={`abilitybufficonsholder ${selectedbuff.unq_id == buffs.unq_id ? "buffactive" : ""}`} key={buffs.unq_id}>
                                    <div className="biconspacer" onClick={() => buffselect(buffs)} >
                                        <Tippy content={
                                            buffs.name && ReplacerCharacter(buffs.name)}>
                                            <img alt={buffs.name} className={`clicky abilitybufficon `} src={`https://dissidiacompendium.com/images/static/icons/buff/${ailment_level_icon(buffs,buffs.arg1)}.png`} />
                                        </Tippy>
                                    </div>
                                </li>;
                            })}
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