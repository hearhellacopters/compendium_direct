import React from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import CharacterFaceFormatting from '../Characters/CharacterFaceFormatting'
import AilmentDataFormatting from './AilmentDataFormatting';
import DefaultTippy from '../TippyDefaults'
import ReplacerCharacter from '../ReplacerCharacter'
import ailment_level_icon from '../../processing/ailment/ailment_level_icon';

export default function AilmentDefaultPassoff({
    file,
    ver,
    ailment_default,

    loc,
    slider,
    formatting,
    gear,
    base_color,
    span,

    master_index
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

    const bufflist = []

    ailment_default.list && ailment_default.list.map(self => {
        self.cast_id && self.cast_id.casts && self.cast_id.casts.map(selfcast => {
            var holder = { [selfcast.id]: { ...self, cast: selfcast, ailment_id: selfcast.id } }
            bufflist.push(holder)
            holder = undefined
        })

    })

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
                <div className={`${gear == true || span == true ? "gearinfobanner" : "defaultlistholder"} ${base_color == undefined ? "newblue" : base_color}`}>
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
                </div>
                {selectedbuff.length != 0 ?
                    <AilmentDataFormatting
                        file={file}
                        loc={loc}
                        ver={ver}
                        ailment_data={selectedbuff.cast}

                        master_index={master_index}

                        slider={slider}
                        rank={selectedbuff.rank_id}
                        arg1={selectedbuff.arg1}
                        arg2={selectedbuff.arg2}
                        castlocation={true}
                        formatting={formatting}
                        gear={gear}
                        fullspan={span}
                        turns={selectedbuff.turn}
                        character_face={false}
                        frameless={true}
                        default_passoff={selectedbuff}
                        passed_passive={selectedbuff.passive}
                    />
                    : ""}
            </div>
        </div>
    )
}