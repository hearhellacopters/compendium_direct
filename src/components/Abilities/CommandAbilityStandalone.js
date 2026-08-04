import React from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import Tippy from '../TippyDefaults'
import format_cleaner from '../../processing/format_cleaner'
import ability_icon_maker from '../../processing/abilities/ability_icon_maker'
import AilmentDataFormatting from '../Buffs/AilmentDataFormatting';
import { ObjectView } from 'react-object-view'
import ReplacerCharacter from '../ReplacerCharacter';
import command_ability_pars from '../../processing/abilities/command_ability_pars';
import ailment_level_icon from '../../processing/ailment/ailment_level_icon';

export default function CommandAbilityStandalone ({
    command_ability,
    ver,
    master_index,
    formatting
}) {

    const form = {formatting:formatting}

    const [selectedbuff, setselectedbuff] = useStateIfMounted([]);
    const [showraw, setshowraw] = useStateIfMounted(false)

    const showmeraw = (current) => {
        if (current == false) {
            setshowraw(true)
        } else {
            setshowraw(false)
        }
    }

    const command_meta = command_ability_pars(
        command_ability,
        ver,
        master_index
    )
    const buffselect = (buffs) => {
        if (selectedbuff.unq_id == buffs.unq_id) {
            setselectedbuff([])
        } else {
            setselectedbuff(buffs)
        }
    }

    var Name = ""
    var SubName = ""

    if (ver == "JP") {
        if (command_ability.glname != undefined) {
            Name = command_ability.glname
        }
    } else {
        Name = command_ability.name
    }

    if (ver == "JP") {
        SubName = command_ability.name
    } else {
        if (command_ability.jpname != undefined) {
            SubName = command_ability.jpname
        }
    }

    var IconURL = ability_icon_maker(
        {command:command_ability},
        master_index,
        ver,
    )

    return (
        <div className="buffunit">
            <div className="infoholder">
                <div className="infotitleholder">
                    {IconURL != "" ?
                        <div className="enemyabilityiconholder">
                            <Tippy content="Display Raw" className="tooltip" >
                                <div className="faceandiconholder clicky" onClick={() => showmeraw(showraw)}>
                                    <img className="abilityicon" alt={Name} src={`/images/static/${IconURL}.png`} />
                                </div>
                            </Tippy>
                        </div> : ""}
                </div>
                <div className={`bluebanner infonameholder nobuffpadding `}>
                    <div className="displayfex">
                        <div className="splitrow">
                            <div className={`infotitle abilitydisplayfex `}>
                                {ReplacerCharacter(`${Name && format_cleaner(Name)}${` - #${command_ability.ca_id}`}`,form)}
                            </div>
                            <div className="infolocation">
                                {SubName != "" ?
                                    <div className="abilityJPname">
                                        {ReplacerCharacter(format_cleaner(SubName),form)}
                                    </div>
                                    : ""}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`bluebase enemyabilityinfobase `}>
                    <>
                        {command_meta && command_meta.cast_list && command_meta.cast_list.length != 0 ?
                            command_meta.cast_list.map(self => (
                                self.cond != undefined ? ReplacerCharacter(`┬ ${self.cond}\n└─ ${self.cast_str}\n`,form) : ReplacerCharacter(`${self.cast_str}\n`,form)
                            ))
                        : ""}
                        {command_meta.kcon != undefined ?
                            ReplacerCharacter(command_meta.kcon+"\n",form)
                        : ""}
                        {command_meta.kcon_1 != undefined ?
                            ReplacerCharacter(command_meta.kcon_1+"\n",form)
                        : ""}
                        {command_meta.kid != undefined ?
                            ReplacerCharacter(command_meta.kid+"\n",form)
                        : ""}
                        {command_meta.kid_1 != undefined ?
                            ReplacerCharacter(command_meta.kid_1+"\n",form)
                        : ""}
                        {command_meta.bdlur != undefined ?
                            ReplacerCharacter(command_meta.bdlur+"\n",form)
                        : ""}
                        {command_meta.mblur != undefined ?
                            ReplacerCharacter(command_meta.mblur+"\n",form)
                        : ""}
                        {command_meta.blow != undefined ?
                            ReplacerCharacter(command_meta.blow+"\n",form)
                        : ""}
                        {command_meta.nasp != undefined ?
                            ReplacerCharacter(command_meta.nasp+"\n",form)
                        : ""}
                        {command_meta.nex != undefined ?
                            ReplacerCharacter(command_meta.nex+"\n",form)
                        : ""}
                        {command_meta.nsum != undefined ?
                            ReplacerCharacter(command_meta.nsum+"\n",form)
                        : ""}
                        {command_meta.nabi != undefined ?
                            ReplacerCharacter(command_meta.nabi+"\n",form)
                        : ""}
                        {command_meta.exshow != undefined ?
                            ReplacerCharacter(command_meta.exshow+"\n",form)
                        : ""}
                        {command_meta.ncharge != undefined ?
                            ReplacerCharacter(command_meta.ncharge+"\n",form)
                        : ""}
                        {command_meta.stunadd != undefined ?
                            ReplacerCharacter(command_meta.stunadd+"\n",form)
                        : ""}
                        {command_meta.cost != undefined ?
                            ReplacerCharacter(command_meta.cost+"\n",form)
                        : ""}
                        {command_meta.stun != undefined ?
                            ReplacerCharacter(command_meta.stun+"\n",form)
                        : ""}
                        {command_meta.show != undefined ?
                            ReplacerCharacter(command_meta.show+"\n",form)
                        : ""}
                        {command_meta.showadd != undefined ?
                            ReplacerCharacter(command_meta.showadd+"\n",form)
                        : ""}
                        {command_meta.type_ != undefined ?
                            ReplacerCharacter(command_meta.type_+"\n",form)
                        : ""}
                        {command_meta.target_range_ != undefined ?
                            ReplacerCharacter(command_meta.target_range_+"\n",form)
                        : ""}
                        {command_meta.target_type_ != undefined ?
                            ReplacerCharacter(command_meta.target_type_+"\n",form)
                        : ""}
                        {command_meta.auto_target_type_ != undefined ?
                            ReplacerCharacter(command_meta.auto_target_type_+"\n",form)
                        : ""}
                    </>
                    <div className='infobase'>
                    <div className='unique'> - Desc -</div>
                        {ReplacerCharacter(command_ability.desc && format_cleaner(command_ability.desc),form)}
                    </div>
                    {showraw == true ?
                        <span className='react-json-view'>
                        <ObjectView
                        options={
                            {
                            hideDataTypes: true,
                            expandLevel: 1
                            }
                        }
                        data={command_ability} />
                        </span>
                        : ""}
                </div>
                {command_ability.casts && command_ability.casts != undefined ?
                    <div className={`bufflistbanner noselect newblue`}>
                        <div className="unique ailmenttext">Buffs / Debuffs:</div>
                        <ul className="abilitybufflist">
                            {command_ability.casts && command_ability.casts.map(buffs => (
                                <li className={`abilitybufficonsholder ${selectedbuff.unq_id == buffs.unq_id ? "buffactive" : ""}`} key={buffs.unq_id}>
                                    <div className="biconspacer" onClick={() => buffselect(buffs)} >
                                        <Tippy content={
                                            buffs.name && buffs.name
                                        }>
                                            <img alt={buffs.name} className={`clicky abilitybufficon `} src={`/images/static/icons/buff/${ailment_level_icon(buffs,buffs.aarg1)}.png`} />
                                        </Tippy>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    : ""}
                {selectedbuff.length != 0 ?
                    <AilmentDataFormatting
                        ver={ver}
                        ailment_data={selectedbuff}
                        master_index={master_index}
                        rank={selectedbuff.arank}
                        arg1={selectedbuff.aarg1}
                        arg2={selectedbuff.aarg2}
                        castlocation={true}
                        alt_rank={selectedbuff.aranka}
                        alt_aug1={selectedbuff.aarg1a}
                        alt_aug2={selectedbuff.aarg2a}
                        formatting={formatting}
                        turns={selectedbuff.default == true ? selectedbuff.turn : selectedbuff.alife}
                        character_face={false}
                        hide_title={true}
                        showvalues={false}
                        debugging={true}
                        passed_passive={selectedbuff.passive}
                    />
                    : ""}
            </div>
        </div>
    )
}