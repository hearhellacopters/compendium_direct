import React, {useState, useEffect} from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import Char_Face_Maker from './Char_Face_Maker'
import Ailment_Data_Formatting from './Ailment_Data_Formating';
import Default_Ailment_Pars from './default_ailment_pars';
import DefaultTippy from '../../../formatting/TippyDefaults'
import replacer_titles from '../../../processing/replacer_titles'
import replacer_buff from '../../../processing/replacer_buffcontent'

const Ailment_Default_Passoff =({
    file,
    ver,
    ailment_default,
    ailment_group,
    command_group,
    AilmentNames,
    CastNames,
    CommandNames,
    CondData,
    Ailment_Effects,
    MessageData_FFSeries,
    MessageData_Category,
    equipmentpassivenames,
    enemy_type,
    command_data_effects,
    passive_effects_data,
    passivenames,
    char_id,
    cast_targets,
    loc,
    slider,
    formatting,
    gear,
    base_color,
    span
})=>{
        const [selectedbuff, setselectedbuff] = useStateIfMounted([]);


        const buffselect = (e) =>{
            if(selectedbuff.ailment_id == e.ailment_id && selectedbuff.data_id == e.data_id ){
                setselectedbuff([])
            } else {
            setselectedbuff(e)
            }
        }

        const bufflist = []

        ailment_default.list && ailment_default.list.map(self =>{
            self.cast_id && self.cast_id.casts && self.cast_id.casts.map(selfcast=>{
                var holder = {[selfcast.id]: {...self,cast: selfcast, ailment_id: selfcast.id}}
                bufflist.push(holder)
                holder = undefined
            })
            
        })

        const add_formatting = (text,switching)=>{
            if(formatting != true){
                return text
            } else {
                if(switching == "tl"){
                    return replacer_titles(text)
                }
                if(switching == "bu"){
                    return replacer_buff(text)
                }
            }
        }

    return(
        <div className={file == "passive_ability" ? "default_passive": "buffunit"}>
        <div className="infoholder">
            {file != "passive_ability" ?
            <div className="infotitleholder">
                <div className="faceandiconholder" >
                    <Char_Face_Maker char_id={char_id} id={ailment_default.char_id} loc={loc}/>
                </div>
            </div>
            :""}
            <div className={`${gear == true || span == true ? "gearinfobanner" : "defaultlistholder"} ${base_color == undefined ? "newblue" : base_color}`}>
                    <div className="unique ailmenttext">
                        Conditional Casts:
                    </div>
                    {bufflist && bufflist.length != 0 ?
                    <ul className="abilitybufflist">
                        {bufflist.map(function(buff){
                            const buffs = Object.values(buff)[0]
                            const cast = buffs.cast
                           return  <li className={`abilitybufficonsholder ${selectedbuff.ailment_id == buffs.ailment_id && selectedbuff.data_id == buffs.data_id ? "buffactive" : ""}`} key={`${buffs.ailment_id}-${buffs.data_id}`}>
                               <div className="biconspacer" onClick={() => buffselect(buffs)} >
                               <DefaultTippy content={
                                        cast.name === "" ? add_formatting(`Unknown ${cast.id}`,"tl") : add_formatting(cast.name,"tl")
                                        }>
                                        <img alt={cast.name} className="clicky abilitybufficon" src={`https://dissidiacompendium.com/images/static/${cast.icon}`} />
                                    </DefaultTippy>
                                </div>
                            </li>
                        })}
                    </ul>:
                    ""}
            </div>
            {selectedbuff.length != 0 ?
                <Default_Ailment_Pars
                default_data={selectedbuff}
                passivenames={passivenames}
                equipmentpassivenames={equipmentpassivenames}
                CommandNames={CommandNames}
                cast_targets={cast_targets}
                Ailment_Effects={Ailment_Effects}
                formatting={formatting}
                gear={gear}
                char_id={char_id}
                span={span}
                />
            :""}
            {selectedbuff.length != 0 ?
            <Ailment_Data_Formatting
            file={file}
            loc={loc}
            ver={ver}
            ailment_data={selectedbuff.cast}
            ailment_group={ailment_group}
            command_group={command_group}
            AilmentNames={AilmentNames}
            CastNames={CastNames}
            cast_targets={cast_targets}
            CommandNames={CommandNames}
            CondData={CondData}
            Ailment_Effects={Ailment_Effects}
            MessageData_FFSeries={MessageData_FFSeries}
            MessageData_Category={MessageData_Category}
            passivenames={passivenames}
            equipmentpassivenames={equipmentpassivenames}
            command_data_effects={command_data_effects}
            enemy_type={enemy_type}
            passive_effects_data={passive_effects_data}
            slider={slider}
            rank={selectedbuff.rank_id}
            arg1={selectedbuff.arg1}
            arg2={selectedbuff.arg2}
            castlocation={true}
            formatting={formatting}
            gear={gear}
            char_id={char_id}
            fullspan={span}
            turns={selectedbuff.turn}
            />
            :""}
        </div>
        </div>
    )
}
export default Ailment_Default_Passoff