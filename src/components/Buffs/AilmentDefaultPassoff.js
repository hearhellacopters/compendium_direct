import React ,{ useEffect} from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import CharacterFaceFormatting from '../Characters/CharacterFaceFormatting'
import AilmentDataFormatting from './AilmentDataFormatting';
import DefaultTippy from '../TippyDefaults'
import ReplacerCharacter from '../ReplacerCharacter'
import ailment_level_icon from '../../processing/ailment/ailment_level_icon';
import PassiveEffectsHandoff from '../Passives/PassiveEffectsHandoff';
import PassiveTotalDisplay from '../Passives/PassiveTotalDisplay';
import passive_stats_merger from '../../processing/passives/passive_stats_merger';

export default function AilmentDefaultPassoff({
    file,
    ver,
    ailment_default,
    loc,
    formatting,
    gear,
    base_color,
    frameless,
    character_face,
    full,
    master_index,
    debugging
}){

    const form = {formatting:formatting}

    const char_id = master_index.charid

    const [selectedbuff, setselectedbuff] = useStateIfMounted([]);

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
        const buff_holder = []
        const buff_hidden = []
        const stateholder = []
        ailment_default.list && ailment_default.list.forEach(self => {
            self.cast_id && self.cast_id.casts && self.cast_id.casts.forEach(selfcast => {
                var holder = {
                    [selfcast.id]: {
                        ...self,
                        cast: selfcast,
                        ailment_id: selfcast.id,
                        cast_id: undefined,
                        active: self.active,
                        chara_id: self.chara_id
                    }
                }
                if (selfcast.icon.includes("buff_hidden") == true) {
                    buff_hidden.push(holder)
                    holder = undefined
                } else {
                    if (self.is_state != true) {
                        buff_holder.push(holder)
                        holder = undefined
                    } else {
                        stateholder.push(holder)
                        holder = undefined
                    }
                }
            })
        })
        buff_holder.sort((a, b) => Object.keys(b) - Object.keys(a))
        buff_hidden.sort((a, b) => Object.keys(b) - Object.keys(a))
        buff_holder.push(...buff_hidden)
        stateholder.sort((a, b) => Object.keys(b) - Object.keys(a))
        setbufflist(buff_holder)
        setstatelist(stateholder)
        // eslint-disable-next-line
    }, [ailment_default])

    const [merge_pas, setmerge_pas] = useStateIfMounted(true)

    const togglemerge = () => {
        setmerge_pas((prevValue) => !prevValue);
    }
    return (
        <div className={file == "passive_ability" ? "default_passive" : "buffunit"}>
            <div className="infoholder">
                {file != "passive_ability" ?
                    <div className="infotitleholder">
                        <div className="faceandiconholder" >
                            <CharacterFaceFormatting char_id={char_id} id={ailment_default.char_id} loc={loc} />
                        </div>
                    </div>
                    : ""}
                <div className={`${character_face == true ? "defaultlistholder" : "gearinfobanner"} ${base_color == undefined ? "newblue" : base_color}`}>
                    <div className="unique ailmenttext">
                        Conditional Casts:
                    </div>
                    {bufflist && bufflist.length != 0 ?
                        <ul className="abilitybufflist">
                            {bufflist.map(function (buff) {
                                const buffs = Object.values(buff)[0]
                                const cast = buffs.cast
                                return <li className={`abilitybufficonsholder ${selectedbuff.ailment_id == buffs.ailment_id && selectedbuff.data_id == buffs.data_id ? "buffactive" : ""}`} key={`${buffs.ailment_id}-${buffs.data_id}`}>
                                    <div className="biconspacer" onClick={() => buffselect(buffs)} >
                                        <DefaultTippy content={
                                            cast.name === "" ? ReplacerCharacter(`Unknown ${cast.id}`,form) : ReplacerCharacter(cast.name,form)
                                        }>
                                            <img alt={cast.name} className="clicky abilitybufficon" src={`https://dissidiacompendium.com/images/static/icons/buff/${ailment_level_icon(cast,buffs.arg1)}.png`} />
                                        </DefaultTippy>
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
                                            <DefaultTippy content={
                                                cast.name === "" ? ReplacerCharacter(`Unknown ${cast.id}`,form) : ReplacerCharacter(cast.name,form)
                                            }>
                                                <img alt={cast.name} className="clicky abilitybufficon" src={`https://dissidiacompendium.com/images/static/icons/buff/${cast.icon}.png`} />
                                            </DefaultTippy>
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
                        frameless={frameless}
                        full={full}
                        default_passoff={selectedbuff}
                        showvalues={false}
                        debugging={debugging}
                        passed_passive={selectedbuff.passive}
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
        </div>
    )
}