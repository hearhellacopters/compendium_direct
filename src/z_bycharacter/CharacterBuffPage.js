import React, { useState, useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import { ObjectView } from 'react-object-view'
import Tippy from '../components/TippyDefaults'
import ability_rank_ranked from '../processing/abilities/ability_rank_ranked';
import PassiveTotalDisplay from '../components/Passives/PassiveTotalDisplay';
import passive_stats_merger from '../processing/passives/passive_stats_merger';
import CharacterFaceFormatting from '../components/Characters/CharacterFaceFormatting'
import ReplacerCharacter from '../components/ReplacerCharacter';
import AilmentDataFormatting from '../components/Buffs/AilmentDataFormatting';
import ailment_level_icon from '../processing/ailment/ailment_level_icon';
import PassiveEffectsHandoff from '../components/Passives/PassiveEffectsHandoff';
import { LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';

function CharacterBuffPage ({
    ability_data,
    buff_data,

    ver,
    loc,
    newcompare,
    file,

    master_index,
    formatting,

    selected_id,
    gear,
    scrollPosition
}) {

    const form = {formatting:formatting}

    const char_id = master_index.charid

    const [showraw, setshowraw] = useState(false)
    const [selectedbuff, setselectedbuff] = useState([]);

    const showmeraw = (current) => {
        if (current == false) {
            setshowraw(true)
        } else {
            setshowraw(false)
        }
    }

    const buffselect = (e) => {
        if (selectedbuff.ailment_id == e.ailment_id && selectedbuff.data_id == e.data_id) {
            setselectedbuff([])
        } else {
            setselectedbuff(e)
        }
    }

    const [bufflist, setbufflist] = useStateIfMounted([])
    const [statelist, setstatelist] = useStateIfMounted([])

    useEffect(() => {
        var buff_holder = []
        var stateholder = []
        buff_data && buff_data.forEach(self => {
            self.cast_id && self.cast_id.casts && self.cast_id.casts.forEach(selfcast => {
                var holder = {
                    [selfcast.id]: {
                        ...self,
                        cast: selfcast,
                        ailment_id: selfcast.id,
                        active: self.active
                    }
                }
                if (self.is_state != true) {
                    buff_holder.push(holder)
                    holder = undefined
                } else {
                    stateholder.push(holder)
                    holder = undefined
                }
            })
        })
        buff_holder.sort((a, b) => Object.keys(b) - Object.keys(a))
        stateholder.sort((a, b) => Object.keys(b) - Object.keys(a))
        setbufflist(buff_holder)
        setstatelist(stateholder)
        // eslint-disable-next-line
    }, [buff_data])

    const ParsBuffs = {}

    Object.values(ability_data).map(filtered => {
        if (filtered.command && filtered.command.casts != undefined) {
            filtered.command.casts.map(self => {
                Object.assign(ParsBuffs, { [self.id]: self })
                Object.assign(ParsBuffs[self.id], { chara_id: selected_id, ability_name: filtered.command.name, ability_namegl: filtered.command.glname, command_id: filtered.command.ca_id, rank_tag: filtered.command.rank })
            })
        }
    })

    const [rawData, setrawData] = useStateIfMounted(Object.values(ParsBuffs).sort((a, b) =>
    ability_rank_ranked(b.rank_tag) - ability_rank_ranked(a.rank_tag) || b.id - a.id))

    const displaybuffs = rawData

    const [merge_pas, setmerge_pas] = useStateIfMounted(true)

    useEffect(() => {
        if (selectedbuff && selectedbuff.passives && selectedbuff.passives.length <= 1) {
            setmerge_pas(false)
        } else {
            setmerge_pas(true)
        }
        // eslint-disable-next-line
    }, [selectedbuff])

    const togglemerge = () => {
        setmerge_pas((prevValue) => !prevValue);
    }

    return (
        <div className='ultimaweaponitemholder'>
            {bufflist && bufflist.length != 0 ?
                <div className={file == "passive_ability" ? "default_passive" : "buffunit"}>
                    <div className="infoholder">
                        {file != "passive_ability" ?
                            <div onClick={showmeraw} className="infotitleholder">
                                <div className="faceandiconholder">
                                    <CharacterFaceFormatting char_id={char_id} id={selected_id} loc={loc} />
                                </div>
                            </div>
                            : ""}
                        <div className={`${gear == true ? "gearinfobanner" : "defaultlistholder"} newblue`}>
                            <div className="unique ailmenttext">
                                Conditional Casts:
                            </div>
                            {bufflist && bufflist.length != 0 ?
                                <ul className="abilitybufflist">
                                    {bufflist.map(function (buff) {
                                        const buffs = Object.values(buff)[0]
                                        const cast = buffs.cast
                                        return buffs.active == false ? "" : <li className={`abilitybufficonsholder ${selectedbuff.ailment_id == buffs.ailment_id && selectedbuff.data_id == buffs.data_id ? "buffactive" : ""}`} key={`${buffs.ailment_id}-${buffs.data_id}`}>
                                            <div className="biconspacer" onClick={() => buffselect(buffs)} >
                                                <Tippy content={
                                                    cast.name === "" ? ReplacerCharacter(`Unknown ${cast.id}`,form) : ReplacerCharacter(cast.name,form)
                                                }>
                                                    <img alt={cast.name} className="clicky abilitybufficon" src={`/images/static/icons/buff/${ailment_level_icon(cast,buffs.arg1)}.png`} />
                                                </Tippy>
                                            </div>
                                        </li>
                                    })}
                                </ul> :
                                ""}
                            {statelist && statelist.length != 0 ?
                                <>
                                    <div className="unique ailmenttext">
                                        Battle States:
                                    </div>
                                    <ul className="abilitybufflist">
                                        {statelist.map(function (buff) {
                                            const buffs = Object.values(buff)[0]
                                            const cast = buffs.cast
                                            return <li className={`abilitybufficonsholder ${selectedbuff.ailment_id == buffs.ailment_id && selectedbuff.data_id == buffs.data_id ? "buffactive" : ""}`} key={`${buffs.ailment_id}-${buffs.data_id}`}>
                                                <div className="biconspacer" onClick={() => buffselect(buffs)} >
                                                    <Tippy content={
                                                        cast.name === "" ? ReplacerCharacter(`Unknown ${cast.id}`,form) : ReplacerCharacter(cast.name,form)
                                                    }>
                                                        <img alt={cast.name} className="clicky abilitybufficon" src={`/images/static/icons/buff/${cast.icon}.png`} />
                                                    </Tippy>
                                                </div>
                                            </li>
                                        })}
                                    </ul>
                                </>
                                :
                                ""}
                        </div>
                        {selectedbuff.length != 0 && selectedbuff.is_state != true ?
                            <AilmentDataFormatting
                                key={selectedbuff.id}
                                file={file}
                                loc={loc}
                                ver={ver}
                                ailment_data={selectedbuff.cast}

                                master_index={master_index}

                                slider={true}
                                rank={selectedbuff.rank_id}
                                arg1={selectedbuff.arg1}
                                arg2={selectedbuff.arg2}
                                castlocation={true}
                                formatting={formatting}
                                gear={gear}
                                cur_char={selectedbuff.chara_id}
                                turns={selectedbuff.turn}
                                character_face={false}
                                frameless={false}
                                default_passoff={selectedbuff}
                                passed_passive={selectedbuff.passive}
                                showvalues={false}
                                debugging={true}
                            />
                        : ""}
                        {selectedbuff.length != 0 && selectedbuff.is_state == true ?
                            <div className='bufflistbanner Buffbase'>
                                <div className='Buffsubbanner'>
                                    {ReplacerCharacter(selectedbuff.cast.name,form)}
                                    <div className='abilityJPname'>
                                        {ReplacerCharacter(selectedbuff.cast.jpname,form)}
                                    </div>
                                </div>
                                {selectedbuff.passives && selectedbuff.passives.length > 1 ?
                                    <div className='subpassiveflair spacearound'>
                                        <div key="mergecheck1" className={`${merge_pas == true ? "nodisplay" : `uncheck`}`} onClick={togglemerge} />
                                        <div key="mergecheck2" className={`${merge_pas == true ? "check" : `nodisplay`}`} onClick={togglemerge} />
                                        <div className='noselect'>&nbsp;&nbsp;Total Values</div>
                                    </div>
                                    : ""}
                                {passive_stats_merger(
                                    selectedbuff.passives,

                                    master_index,
                                    ver,

                                    merge_pas,
                                    "state",
                                    false
                                ).sort((a, b) => a.rank - b.rank).map((battle_passive, i, whole) => (
                                    battle_passive.is_total != true ? 
                                    <PassiveEffectsHandoff
                                        key={`${battle_passive.pa_id}-${i}`}
                                        passive_ability={battle_passive}
                                        ver={ver}

                                        master_index={master_index}

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
                                        match={battle_passive}
                                    />
                                ))}
                            </div>
                            : ""}
                    </div>
                </div> : ""}
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
                    data={buff_data} 
                    />
                </span>
                : ""}
                {displaybuffs.length != 0 ?
                    <div className='directbuffholder'>
                        <div className='subtext2'>Strength of buff is determined by ability</div>
                        {displaybuffs.map(self => (
                            <LazyLoadComponent
                                key={self.id}
                                scrollPosition={scrollPosition}
                                placeholder={<div className='buffunit' style={{ minHeight: `210px` }}>
                                                <div className='infoholder'>
                                                <img className="loadingbardots" src="/images/static/site/loading.gif"/>
                                                </div>
                                            </div>}
                            >
                            <AilmentDataFormatting
                                key={self.id}
                                file={file}
                                loc={loc}
                                ver={ver}
                                master_index={master_index}
                                ailment_data={self}
                                slider={true}
                                rank={self.arank}
                                arg1={self.aarg1}
                                arg2={self.aarg2}
                                alt_rank={self.aranka}
                                alt_aug1={self.aarg1a}
                                alt_aug2={self.aarg2a}
                                castlocation={true}
                                formatting={formatting}
                                gear={gear}
                                rank_tag={self.rank_tag}
                                cur_char={self.chara_id}
                                turns={self.alife}
                                character_face={true}
                                frameless={false}
                                debugging={true}
                            />
                            </LazyLoadComponent>
                        ))}
                    </div>
                : "No Data"}
        </div>
    )
}
export default trackWindowScroll(CharacterBuffPage)