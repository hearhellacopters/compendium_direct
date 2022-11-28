import React, {useState, useEffect} from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import Format_Cleaner from '../../../../processing/Format_Cleaner'
import translater from '../../../../processing/translater_characters'
import DefaultTippy from '../../../../formatting/TippyDefaults';
import { useDispatch, useSelector } from "react-redux";
import { getTransNames } from '../../../../redux/ducks/transnames';
import Ailment_Field_Attached from '../Ailment_Field_Attached'
import Char_Face_Maker from '../Char_Face_Maker'
import Ailment_Default_Passoff from "../Ailment_Default_Passoff";
import Ailment_Data_Formatting from '../Ailment_Data_Formating';
import Passive_Effects_Handoff from "./Passive_Effects_Handoff";
import {EndsInTimer, StartsInTimer} from '../../../../formatting/Timers'
import Passive_Link_Effects from "./Passive_Link_Effects";
import replacer_titles from '../../../../processing/replacer_titles'
import replacer_buff from '../../../../processing/replacer_buffcontent'
import reactStringReplace from "react-string-replace"
import ReactJson from '@microlink/react-json-view'
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import sphere_tags from '../command_ability/sphere_tags.json'

const Sphere_Passive_Ability_Formatting = ({
    passive_ability,
    loc,
    ver,
    file,
    Single,
   
    cp_cost,
    board_cost,
    chara_id_passoff,
    sphere_type,
    sphere_letter,
    release,
    formatting,
    gear,
    cost_overide,
    cp_overide,
    tag_overide,

    banner_color,
    base_color,
    span,
    raw,

    link,
    master_index
}) =>{

    const char_id = master_index.charid

    const param_id = master_index.passive_effects.param_id

    const dispatch = useDispatch();

    const transnames = useSelector((state) => 
    state.transnames.transnames
    );

    const [showoptions,setshowoptions] = useStateIfMounted(passive_ability && passive_ability.options && passive_ability.options.length <= 5 ? true : false)
    const [showraw,setshowraw] = useStateIfMounted(false)
    const [trans, settrans] = useStateIfMounted()
    const [showtrans, setshowtrans] = useStateIfMounted(false)
    const [selectedbuff, setselectedbuff] = useStateIfMounted([]);
    const [passive_tag, setpassive_tag]= useStateIfMounted([]);

    useEffect(() => {
        let mounted = true
        if (mounted && transnames == undefined && showtrans== true) {
        dispatch(getTransNames());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,transnames,showtrans]);

    useEffect(() => {
    const text = Format_Cleaner(passive_ability.desc).replace(/\\n/gm,"\x0A")
    if(transnames != undefined && showtrans == true){
        const translate = translater(text,transnames)
        settrans(translate)
    }
    }, [settrans,transnames,showtrans,passive_ability.desc]);

    const showmeraw = (e)=>{
        if(e.shiftKey){
            if(showraw == false){
                const holder =[]
                Object.keys(sphere_tags).forEach(key=>{
                    if(raw[`${key}`] == true){
                        holder.push(sphere_tags[`${key}`])
                    }
                })
                setpassive_tag(holder)
            setshowraw(true)
            } else{
                setshowraw(false)
            }
        }
    }

    const showmeoptions = (current)=>{
        if(current == false){
            setshowoptions(true)
        } else{
            setshowoptions(false)
        }
    }

 async function doTrans(text){
        setshowtrans((prevValue) => !prevValue)
    }

    const listByChar = {}
    if(passive_ability.defaults != undefined){
    //make list by char
            if(passive_ability.CharID != undefined){
                Object.assign(listByChar,{[passive_ability.CharID]:{list: passive_ability.defaults, char_id: passive_ability.CharID, name: char_id[passive_ability.CharID].name, jpname: char_id[passive_ability.CharID].jpname}})
            }
    }

    const bufflist = []
    if(passive_ability.casts != undefined){
        const castholder = {}
        passive_ability.casts && passive_ability.casts.map(second=>{
                Object.assign(castholder,{[second.id]: {...second,rank_id: 1,arg1: 1,arg2: 1}})
            })
            
        if(castholder != {}){
            Object.values(castholder).map(self=>{
                bufflist.push(self)
            })
        }
    }

    const buffselect = (e) =>{
        if(selectedbuff.id == e.id){
            setselectedbuff([])
        } else {
        setselectedbuff(e)
        }
    }

    var sphere = undefined

    const Capletter ={
        1: "A",
        2: "B",
        3: "C",
        4: "D",
        5: "E"
    }

    const type = {
        1: "Ex",
        2: "Craft"
    }

    sphere = `${type[sphere_type]}${Capletter[sphere_letter]}`
    

    const ct = new Date().getTime();
   
    var rData = undefined
    if(release != undefined){
        if(ver == "JP"){
            const date_check = new Date(`${release.toString().replace(/ /,"T")}.000+09:00`);
            if(date_check && date_check.getTime() > ct){  
                rData = date_check
            }
        } else{
            const date_check2 = new Date(`${release.toString().replace(/ /,"T")}Z`);
            if(date_check2 && date_check2.getTime() > ct){  
                rData = date_check2
            }
        }
    }

    const e11d = param_id[passive_ability.effect_value01_param_id] && param_id[passive_ability.effect_value01_param_id].param_id
    const e12d = param_id[passive_ability.effect_value02_param_id] && param_id[passive_ability.effect_value02_param_id].param_id
    const e13d = param_id[passive_ability.effect_value03_param_id] && param_id[passive_ability.effect_value03_param_id].param_id

    const add_formatting = (text,switching)=>{
        if(formatting != true){
            let replacement = text
            var number = 0
            replacement = text == undefined ? "" : text.replace(/#e11d/gm,e11d)
            replacement = replacement == "" ? "" : replacement.replace(/#e12d/gm,e12d)
            replacement = replacement == "" ? "" : replacement.replace(/#e13d/gm,e13d)
            replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\d+%)/, (match, i) => {
                number = number + 1
                return(
            <span key={`4-${i}-${number}`} className="values">{match}</span>
            )})
            return replacement
        } else {
            if(switching == "tl"){
                let replacement = text
                replacement = text == undefined ? "" : text.replace(/#e11d/gm,e11d)
                replacement = replacement == "" ? "" : replacement.replace(/#e12d/gm,e12d)
                replacement = replacement == "" ? "" : replacement.replace(/#e13d/gm,e13d)
                return replacer_titles(replacement)
            }
            if(switching == "bu"){
                let replacement = text
                replacement = text == undefined ? "" : text.replace(/#e11d/,e11d)
                replacement = replacement == "" ? "" : replacement.replace(/#e12d/,e12d)
                replacement = replacement == "" ? "" : replacement.replace(/#e13d/,e13d)
                return replacer_buff(replacement)
            }
        }
    }

    const minH = window.innerWidth <= 800 ? ( gear == true ? 140 :  210 ): 140;

    return (
        <div className={gear == true ? "margtop" : `buffunit`}>
        <div className="infoholder" style={{ minHeight: `${minH}px`}}>
            <LazyLoadComponent>
            {passive_ability.CharID != undefined || chara_id_passoff != undefined? 
            gear == true ? "" :
            <div className="infotitleholder">
            <div className="faceandiconholder" >
                <Char_Face_Maker char_id={char_id} id={chara_id_passoff == undefined ? passive_ability.CharID : chara_id_passoff} loc={loc} link={link}/>
                <div className="infoiconholder ">
                    <LazyLoadImage effect="opacity" className="sphereicon" alt={`${sphere} sphere`} src={`https://dissidiacompendium.com/images/static/icons/spheres/Sphere${sphere}.png`}/>
                </div>
            </div>
            </div>
            :""}
                {ver == "JP"?
                <div className={`${Capletter[sphere_letter]}banner infonameholder wpadding`} onClick={showmeraw}>
                    <div className="spacearound">
                        <div className="infotitle displayfex  ">
                        {passive_ability.glname != undefined ?
                            add_formatting(`${passive_ability.glname} - #${passive_ability.pa_id}`,"tl") :
                            add_formatting(`Unknown - #${passive_ability.pa_id}`,"tl")}
                        </div>
                    </div>
                    <div className="displayfex ">
                        <div className="abilityJPname ">
                            {passive_ability.name != undefined ?
                            add_formatting(`${Format_Cleaner(passive_ability.name)} - #${passive_ability.pa_id}`,"tl") :
                            add_formatting(`Unknown - #${passive_ability.pa_id}`,"tl")}
                        </div>
                    </div>
                    {rData != undefined ?
                    <StartsInTimer 
                    expiryTimestamp={rData}
                    JPFlag={ver == "JP" ? true : false}
                    />
                    :""}
                </div>
                :
                <div className={`${Capletter[sphere_letter]}banner infonameholder wpadding`} onClick={showmeraw}>
                    <div className="spacearound">
                        <div className="infotitle displayfex">
                            {passive_ability.name != undefined ?
                            add_formatting(`${Format_Cleaner(passive_ability.name)} - #${passive_ability.pa_id}`,"tl")
                            :
                            "Unknown"}
                        </div>
                    </div>
                    <div className="displayfex ">
                    <div className="abilityJPname ">
                        {passive_ability.jpname != undefined ?
                        add_formatting(`${Format_Cleaner(passive_ability.jpname)} - #${passive_ability.pa_id}`,"tl") :
                        `Unknown - #${passive_ability.pa_id}`}
                        </div>
                    </div>
                    {rData != undefined ?
                    <StartsInTimer 
                    expiryTimestamp={rData}
                    JPFlag={ver == "JP" ? true : false}
                    />
                    :""}
                </div>
                }
            <div className={`${Capletter[sphere_letter]}base infobase wpadding`}>
                
                {trans != undefined && showtrans == true ?
                trans.split(/\n/gm).map((value, i)=>
                    <div key={i}>
                    {add_formatting(value,"bu")}<br></br>
                    </div>
                )
                :
                Format_Cleaner(passive_ability.desc).split(/\\n/gm).map((value, i)=>
                    <div key={i}>
                    {add_formatting(value,"bu")}<br></br>
                    </div>
                )
                }
                {ver == "JP" ?
                <div className="clicky updatelink" onClick={()=>doTrans()} >Translate (Beta)</div>
                :""}
                <div className={`${passive_ability.effect_ == undefined && passive_ability.effect__1 == undefined ? "" : `infonameholderenemybuff default_passive bluebase`}`}>
                <Passive_Effects_Handoff
                passive_ability={passive_ability}
                master_index={master_index}
                ver={ver}                
                file={file}
                
                formatting={formatting}
                />
                {passive_ability.field != undefined ?
                passive_ability.field.map(buffs => (
                    <Ailment_Field_Attached 
                    key={buffs.data_id}
                    castlocation={true}
                    ver={ver}
                    ailment_field={buffs}

                    master_index={master_index}

                    loc={loc}
                    slider={false}
                    formatting={formatting}
                    base_color={undefined}
                    />
                ))
                :""}
                </div>
                {passive_ability.force != undefined ?
                <div className="forceaddtach infonameholderenemybuff default_passive">
                    <div className='BonusHPDamage'/>
                {passive_ability.force.map(self=>(
                    <Passive_Link_Effects
                    key={self.link_id}
                    link_effect={self}
                    file={file}

                    ver={ver}
                    master_index={master_index}
                    
                    formatting={formatting}
                    />
                ))}
                </div>
                :""}
                {passive_ability.options != undefined ?
                    <div className={`default_passive infonameholderenemybuff ${base_color == undefined ? "Buffbase" : "blackbase"}`}>
                        <div>
                            {passive_ability.options.length > 5 ?
                            <div className="clicky updatelink" onClick={()=>showmeoptions(showoptions)}>{showoptions == false ? <div><span className="mini_ability"></span>Show Upgrades:</div> : <div><span className="mini_ability"></span>Hide Upgrades:</div>}</div>
                            :
                            <div><span className="mini_ability"></span>Upgrades:</div>
                            }
                            {showoptions == true ? 
                            <div>
                                {passive_ability.options.map((self,key)=>(
                                    <div key={key}>
                                    {replacer_titles(`\xa0- ${self}`)}
                                    </div>
                                ))}
                            </div>
                            :""}
                        </div>
                    </div>
                :""}
                {passive_ability.defaults != undefined ?
            Object.values(listByChar).map(buffs => (
                <Ailment_Default_Passoff
                file={"passive_ability"}
                ver={ver} 
                key={buffs.char_id}
                ailment_default={buffs}

                master_index={master_index}

                loc={loc}
                slider={false}
                formatting={formatting}
                gear={gear}
                base_color={"classcolor"}
                span={span}
                />
                ))
                :""}
                {bufflist.length != 0 ?
                <div className={passive_ability.CharID != undefined ? file == "exskill" ? "infonameholderenemybuff classcolor default_passive" : "defaultlistholder newblue default_passive" : "infonameholderenemybuff newblue default_passive"}>
                    <div className="unique ailmenttext">
                    Buffs / Debuffs:
                    </div>
                    {bufflist.length != 0 ?
                    <ul className={"abilitybufflist"}>
                        {bufflist.map(buff =>(
                           <li className={`abilitybufficonsholder ${selectedbuff.id == buff.id ? "buffactive" : ""}`} key={buff.id}>
                               <div className="biconspacer" onClick={() => buffselect(buff)} >
                                    <DefaultTippy content={
                                        buff.name == "" ? `Unknown ${buff.id}` : add_formatting(buff.name && buff.name,"tl")
                                        }>
                                        <img alt={buff.name} className="clicky abilitybufficon" src={`https://dissidiacompendium.com/images/static/${buff.icon}`} />
                                    </DefaultTippy>
                                </div>
                            </li>
                        ))}
                    </ul>:
                    ""}
                </div>
                :""}
                {selectedbuff.length != 0 ?
                <Ailment_Data_Formatting
                file={"passive_ability"}
                loc={loc}
                ver={ver}

                ailment_data={selectedbuff}
                master_index={master_index}
                
                slider={false}
                rank={selectedbuff.rank_id}
                arg1={selectedbuff.arg1}
                arg2={selectedbuff.arg2}
                castlocation={true}
                fullspan={passive_ability.CharID == undefined || file == "exskill" ? true : false}
                formatting={formatting}

                turns={selectedbuff.turn}
                />
                :""}
                {showraw == true?
                    <div className="newblue">
                    <div className="unique ailmenttext">
                        Sphere Tag:
                    </div>
                    <ul className="abilitybufflist">
                        {passive_tag.map(function(buff){
                           return  <li className={`abilitybufficonsholder`} key={`${buff.name}`}>
                               <div className="biconspacer" >
                                    <DefaultTippy content={buff.name}>
                                        <img alt={buff.name} className="abilitybufficon" src={`https://dissidiacompendium.com/images/static/icons/${buff.url}.png`} />
                                    </DefaultTippy>
                                </div>
                            </li>
                        })}
                    </ul>
                    </div>
                    :
                    ""}
                {showraw == true?
                <ReactJson iconStyle={"square"} quotesOnKeys={false} name={"Raw"} displayDataTypes={false} collapsed={false} theme={"threezerotwofour"} src={raw}/>
                :""}
            </div>
            </LazyLoadComponent>
        </div>
        </div>
    )
}
export default Sphere_Passive_Ability_Formatting