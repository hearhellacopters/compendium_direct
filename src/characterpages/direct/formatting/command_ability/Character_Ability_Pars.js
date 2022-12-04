import React, {useState, useEffect} from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import Tippy from '../../../../formatting/TippyDefaults'
import DefaultTippy from '../../../../formatting/TippyDefaults'
import Format_Cleaner from '../../../../processing/Format_Cleaner'
import translater from '../../../../processing/translater_characters'
import 'react-lazy-load-image-component/src/effects/opacity.css';
import Ability_Icon_Maker from './Ability_Icon_Maker'
import Ailment_Data_Formatting from '../Ailment_Data_Formating';
import Char_Face_Maker from '../Char_Face_Maker'
import Character_Option_Pars from './Character_Option_Pars';
import Command_Ability_Pars from './Command_Ability_Pars';
import Hit_Data_For_Ability from './Hit_Data_For_Ability';
import reactStringReplace from "react-string-replace"
import Hit_Data_Pars from '../hitdata/Hit_Data_Pars';
import counts_handler from './counts_handler.js'
import times_handler from './times_handler.js'
import replacer_titles from '../../../../processing/replacer_titles'
import replacer_buff from '../../../../processing/replacer_buffcontent'
import { useDispatch, useSelector } from "react-redux";
import { getTransNames } from '../../../../redux/ducks/transnames';
import rank_trans from './rank_trans'
import ReactJson from '@microlink/react-json-view'
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import merger_master from '../../merger_master';
import Passive_Battle_State from '../passives/Passives_Battle_State';
import Passive_Total_Display from '../passives/Passive_Total_Display';
import Passive_Effects_Default from '../passives/Passive_Effects_Default';
import Default_Ailment_Pars from '../default_ailment_pars';
import replacer_ability from '../../../../processing/replacer_abilitycontent';

const Character_Ability_Pars =({
    character_ability,
    loc,
    ver,
    file,
    ProcessedCharacters,
    formatting,
    tag_override,
    all_options,
    link,
    master_index
})=>{

    const CommandNames = master_index.commands
    const char_id = master_index.charid

    const [merge_pas, setmerge_pas] = useStateIfMounted(character_ability && character_ability.passives && character_ability.passives.length > 1 ? true :false)
    const [selectedbuff, setselectedbuff] = useStateIfMounted([]);

    const togglemerge = () => {
    setmerge_pas((prevValue) => !prevValue);
    }

    const [show_upgrades, setshow_upgrades] = useStateIfMounted(character_ability && character_ability.options && character_ability.options.length > 5 ? false : true)

    useEffect(()=>{
        setmerge_pas(character_ability && character_ability.passives && character_ability.passives.length > 1 ? true :false)
        setshow_upgrades(character_ability && character_ability.options && character_ability.options.length > 5 ? false : true)
        // eslint-disable-next-line
    },[character_ability])

    const doshow_upgrades =()=>{
        if(character_ability && character_ability.options && character_ability.options.length > 5){
            setshow_upgrades(!show_upgrades)
        }
    }

    const [bufflist,setbufflist] = useStateIfMounted([])
    const [statelist,setstatelist] = useStateIfMounted([])

    useEffect(()=>{
        if(character_ability.defaults != undefined){
            if(character_ability.defaults.states != undefined){
                setstatelist(character_ability.defaults.states.sort((a,b)=>Object.keys(b)- Object.keys(a)))
            }
            if(character_ability.defaults.buffs != undefined){
                setbufflist(character_ability.defaults.buffs.sort((a,b)=>Object.keys(b)- Object.keys(a)))
            }
        }
        // eslint-disable-next-line
    },[character_ability])

    const [merge_pas_buffs, setmerge_pas_buffs] = useStateIfMounted(true)

    useEffect(()=>{
        if(selectedbuff && selectedbuff.passives && selectedbuff.passives.length <= 1){
            setmerge_pas_buffs(false)
        } else {
            setmerge_pas_buffs(true)
        }
        // eslint-disable-next-line
    },[selectedbuff])

    const togglemerge_buffs = () => {
        setmerge_pas_buffs((prevValue) => !prevValue);
    }

    const dispatch = useDispatch();

    const transnames = useSelector((state) => 
    state.transnames.transnames
    );

    const [showraw,setshowraw] = useStateIfMounted(false)
    const [showoptions,setshowoptions] = useStateIfMounted(false)
    const [desc,setdesc] = useStateIfMounted(false)
    const [showhitdata, setshowhitdata] = useStateIfMounted(false)
    const [trans, settrans] = useStateIfMounted()
    const [showtrans, setshowtrans] = useStateIfMounted(false)

    useEffect(() => {
        let mounted = true
        if (mounted && transnames == undefined && showtrans== true) {
        dispatch(getTransNames());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,transnames,showtrans]);

    async function doTrans(text){
        setshowtrans((prevValue) => !prevValue)
    }

    useEffect(() => {
        const text = Format_Cleaner(character_ability.command && character_ability.command.desc)
        if(transnames != undefined && showtrans == true){
            const translate = translater(text,transnames)
            settrans(translate)
        }
        }, [settrans,transnames,showtrans,character_ability]);

    const showmeraw = (e)=>{
        if(e.shiftKey){
            if(showraw == false){
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

    const showmedesc = (current)=>{
        if(current == false){
            setdesc(true)
        } else{
            setdesc(false)
        }
    }

    const showmehitdata = (current)=>{
        if(current == false){
            setshowhitdata(true)
        } else{
            setshowhitdata(false)
        }
    }

    const buffselect = (buffs) =>{
        if(selectedbuff.unq_id == buffs.unq_id){
            setselectedbuff([])
        } else {
        setselectedbuff(buffs)
        }
    }

    const [use_num, setuse_num] = useStateIfMounted()

    useEffect(()=>{
        if(character_ability.Trap == true ||
            character_ability.FollowUp == true ||
            character_ability.Counter == true ||
            character_ability.BRV == true ||
            character_ability.HP == true
            ){
                setuse_num(0)
        } else {
            if(character_ability.increase != undefined ){
                var new_value = character_ability.UseNum
                var new_recast = 0
                character_ability.increase.forEach(self=>{
                    if(self.use != undefined){
                        new_value = new_value + self.use
                    }
                    if(self.recast != undefined){
                        new_recast = new_recast + self.recast
                    }
                })
                if(new_recast != 0){
                    new_value = ((100-new_recast)/100)*new_value
                }
                setuse_num(new_value)
            } else {
                if(character_ability && character_ability.BT == true && character_ability.UseNum == 0 && character_ability && character_ability.disp_flag_ == 1){
                    setuse_num(1)
                } else {
                    setuse_num(character_ability.UseNum)
                }               
            }
        }
        // eslint-disable-next-line
    },[])
    

    const usemaker = (number)=>{
        if(number == 0){
            return(
                "∞"
            )
        }
        if(number <= 90){
            return(
                number
            )
        }
        if(number >= 100 && number < 3000){
            return(
                "Fast+++"
            )
        }
        if(number >= 3000 && number < 6000){
            return(
                "Fast++"
            )
        }
        if(number >= 6000 && number <= 9000){
            return(
                "Fast+"
            )
        }
        if(number >= 9000 && number < 12000){
            return(
                "Fast"
            )
        }
        if(number >= 12000 && number < 15000){
            return(
                "Normal"
            )
        }
        if(number >= 15000 && number < 18000){
            return(
                "Slow"
            )
        }
        if(number >= 18000 && number < 21000){
            return(
                "Slow-"
            )
        }
        if(number >= 21000){
            return(
                "Slow--"
            )
        }
    }

    const recast_tip = <div className='makeleft'>Ranks:    
    <div>Fast+++   </div>
    <div>Fast++    </div>
    <div>Fast+     </div>
    <div>Fast      </div>
    <div>Normal    </div>
    <div>Slow      </div>
    <div>Slow-     </div>
    <div>Slow--    </div>
    </div>

    if(character_ability.command != undefined){
        var red = character_ability.LD == true ? 1:
        character_ability.EX == true ? 1 :
        character_ability.CallLD == true ? 1 :
        character_ability.disp_flag_
        var IconURL = Ability_Icon_Maker(
            character_ability.command.type_,
            character_ability.command.att,
            character_ability.command.rank,
            red, //red_flag
            character_ability.charaID, //char id

            master_index,
            ver,

            use_num,
            character_ability.Counter,
            character_ability.Trap,
            character_ability.FollowUp
        )
    } else {
        IconURL = `icons/buttons/ability/Ability_Unknown_${red == 1 ? "Red" :"Blue"}`
    }
    
    var Name = ""
    var SubName = ""

    if(ver == "JP"){
        if(character_ability.command && character_ability.command.glname != undefined){
            Name = character_ability.command.glname
        } else {
            var comdpull = CommandNames[character_ability.LearningAbility] && CommandNames[character_ability.LearningAbility].name
            if(comdpull != undefined){
                Name = comdpull
            } else {
                Name = `#${character_ability.LearningAbility}`
            }
        }
    } else {
        if(character_ability.command && character_ability.command.name != undefined){
            Name = character_ability.command.name
        } else {
            comdpull = CommandNames[character_ability.LearningAbility] && CommandNames[character_ability.LearningAbility].name
            if(comdpull != undefined){
                Name = comdpull
            } else {
                Name = `#${character_ability.LearningAbility}`
            }
        }
    }

    if(ver == "JP"){
        if(character_ability.command && character_ability.command.name != undefined){
            SubName = character_ability.command.name
        } else {
            comdpull = CommandNames[character_ability.LearningAbility] && CommandNames[character_ability.LearningAbility].name
            if(comdpull != undefined){
                SubName = comdpull
            } else {
                SubName = `#${character_ability.LearningAbility}`
            }
        }
    } else {
        if(character_ability.command && character_ability.command.jpname != undefined){
            SubName = character_ability.command.jpname
        } else {
            comdpull = CommandNames[character_ability.LearningAbility] && CommandNames[character_ability.LearningAbility].name
            if(comdpull != undefined){
                SubName = comdpull
            } else {
                SubName = `#${character_ability.LearningAbility}`
            }
        }
    }

    const addformatting =(text,switching)=>{
        if(formatting != true){
        let replacement = text
        var number = 0

        replacement = replacement == undefined ? "" : reactStringReplace(replacement, /(\[.*?\])/, (match, i) => {
            number = number + 1
            return(
                <span key={`1-${i}-${number}`} className="unique">{match}</span>
            )
        })
        replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\d+%)/, (match, i) => {
            number = number + 1
            return(
        <span key={`4-${i}-${number}`} className="values">{match}</span>
        )})
        replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\\n)/, (match, i) => {
            number = number + 1
            return(
                <br key={`10-${i}-${number}`}/>
        )})
        replacement = replacement == "" ? "" : reactStringReplace(replacement, /(\n)/, (match, i) => {
            number = number + 1
            return(
                <br key={`11-${i}-${number}`}/>
        )})
        return(
            replacement
        )
        } else {
            if(switching == "tl"){
                return replacer_titles(text)
            }
            if(switching == "bu"){
                return replacer_buff(text)
            }
            if(switching == "ab"){
                return replacer_ability(text)
            }
        }
    }

    var command_meta = character_ability && character_ability.command && 
        Command_Ability_Pars(
            character_ability.command,
            ver,

            master_index,
        )

        const hit_data_pars = Hit_Data_For_Ability(
            character_ability,
            master_index,
            ver,

            character_ability.hit_data_pars.hit_1,
            character_ability.hit_data_pars.hit_2,
            character_ability.hit_data_pars.hit_3,
            character_ability.hit_data_pars.hit_4,
            character_ability.hit_data_pars.hit_5,
            character_ability.hit_data_pars.hit_6,
            character_ability.hit_data_pars.hit_7,
            character_ability.hit_data_pars.hit_8,
            character_ability.hit_data_pars.hit_9,
            character_ability.hit_data_pars.hit_10,
            character_ability.hit_data_pars.hit_11,
            character_ability.hit_data_pars.hit_12,
            character_ability.hit_data_pars.hit_13,
            character_ability.hit_data_pars.hit_14,
            character_ability.hit_data_pars.hit_15,
            character_ability.hit_data_pars.hit_16,
            character_ability.hit_data_pars.hit_17,
            character_ability.hit_data_pars.hit_18,
            character_ability.hit_data_pars.hit_19,
            character_ability.hit_data_pars.hit_20,
            character_ability.hit_data_pars.hit_21,
            character_ability.hit_data_pars.hit_22,
            character_ability.hit_data_pars.hit_23,
            character_ability.hit_data_pars.hit_24,
            character_ability.hit_data_pars.hit_25,
            character_ability.hit_data_pars.hit_26,
            character_ability.hit_data_pars.hit_27,
            character_ability.hit_data_pars.hit_28,
            character_ability.hit_data_pars.hit_29,
            character_ability.hit_data_pars.hit_30,
            character_ability.hit_data_pars.hit_31,
            character_ability.hit_data_pars.hit_32,
            character_ability.hit_data_pars.hit_33,
            character_ability.hit_data_pars.hit_34,
            character_ability.hit_data_pars.hit_35,
            character_ability.hit_data_pars.hit_36,
            character_ability.hit_data_pars.hit_37,
            character_ability.hit_data_pars.hit_38,
            character_ability.hit_data_pars.hit_39,
            character_ability.hit_data_pars.hit_40,

            command_meta && command_meta.faf != undefined ? command_meta.faf : undefined,
            command_meta && command_meta.bdlur != undefined ? command_meta.bdlur : undefined,
            command_meta && command_meta.mblur != undefined ? command_meta.mblur : undefined
        )
        
        const hit_parers = counts_handler(hit_data_pars.hit_pars)

        const new_hit_pars = {}

        var hit_num = 0

        Object.keys(hit_parers).forEach((key, index, array)=>{
            if( key == "B1" ||
                key == "B2" ||
                key == "B3" ||
                key == "B4" 
             ){
                Object.assign(new_hit_pars,{[key]:hit_parers[key]})
            } else {
                if(hit_parers[key].show != false){
                    hit_num = hit_num + 1
                    Object.assign(new_hit_pars,{[`hit_${hit_num}`]:hit_parers[key]})
                }
            }
        })

        const hit_pars = times_handler(new_hit_pars)

        const hit_map = {}

        Object.values(hit_pars).forEach(self=>{
            Object.assign(hit_map,{[self.hit_num]:self})
        })

        const abilitytext = character_ability.command && character_ability.command && character_ability.command.udname

        const cast_list ={}

        command_meta && command_meta.cast_list && command_meta.cast_list.forEach(self=>{
            if(cast_list[self.hit] == undefined){
                Object.assign(cast_list,{[self.hit]:[self]})
            } else {
                cast_list[self.hit].push(self)
            }
        })

        const hit_count_map = [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31,
            32,
            33,
            34,
            35,
            36,
            37,
            38,
            39,
            40,
        ]

    return(
        <div className="buffunit" loading="lazy">
            <div className="infoholder" style={{ minHeight: "220px"}}>
            <div className="infotitleholder">
                <div className="faceandiconholder">
                    <div className="idoffset" id={character_ability.LearningAbility}></div>
                    <Char_Face_Maker char_id={char_id} id={character_ability.charaID} loc={loc} link={link}/>
                    <div className="abilityiconholder" onClick={showmeraw} >
                    <div className="abilityurlholder">
                        <LazyLoadImage effect="opacity" className="abilityicon" alt={Name} src={`https://dissidiacompendium.com/images/static/${IconURL}.png`}/>
                        <div className={
                        use_num > 100 ? "abilityblspeed" : 
                        character_ability.FR == true && (use_num < 100 && use_num != 0 ) ? "saholderg" :
                        character_ability.CallLD == true && (use_num < 100 && use_num != 0 ) ? "saholderg" :
                        character_ability.BT == true && (use_num < 100 && use_num != 0 ) ? "saholderg" :
                        "saholder"
                    }>
                        {use_num < 100 ?
                        <div className={`sanumber ${character_ability.Free_Ability == true ? "upstat" : ""}`}>{usemaker(use_num)}</div>
                        : 
                        usemaker(use_num)
                        }
                    </div>
                    </div>
                </div>

                </div>
            </div>
            <LazyLoadComponent>
            <div className={`bluebanner infonameholder nobuffpadding `}>
                    <div className="displayfex">
                        <div className="splitrow">
                            <div className={`infotitle abilitydisplayfex `}>
                                {Name && addformatting(Format_Cleaner(Name),"tl")}{` - #${character_ability.LearningAbility}`}
                                {character_ability.Group == true?
                                <span className='Group'></span>
                                :""}
                                {character_ability.Melee == true?
                                <span className='Melee'></span>
                                :""}
                                {character_ability.Ranged == true?
                                <span className='Ranged'></span>
                                :""}
                                {character_ability.Magic == true?
                                <span className='Magic'></span>
                                :""}
                                {character_ability.Fire == true?
                                <span className='Fire'></span>
                                :""}
                                {character_ability.Ice == true?
                                <span className='Ice'></span>
                                :""}
                                {character_ability.Thunder == true?
                                <span className='Thunder'></span>
                                :""}
                                {character_ability.Earth == true?
                                <span className='Earth'></span>
                                :""}
                                {character_ability.Water == true?
                                <span className='Water'></span>
                                :""}
                                {character_ability.Wind == true?
                                <span className='Wind'></span>
                                :""}
                                {character_ability.Holy == true?
                                <span className='Holy'></span>
                                :""}
                                {character_ability.Dark == true?
                                <span className='Dark'></span>
                                :""}

                                {character_ability.HP_Heal_Ability == true?
                                <Tippy content={"Heals"}>
                                    <span className='Heals'></span>
                                </Tippy>
                                :""}
                                {character_ability.Ignore_DEF == true?
                                <Tippy content={"Ignores DEF"}>
                                    <span className='IgnoreDEF'></span>
                                </Tippy>
                                :""}
                                {character_ability.Instant == true?
                                <Tippy content={"Instant Turn Rate"}>
                                    <span className='Instant'></span>
                                </Tippy>
                                :""}
                                {character_ability.Launcher == true?
                                <Tippy content={"Knock Back"}>
                                    <span className='KnockBack'></span>
                                </Tippy>
                                :""}
                                {character_ability.Counter == true?
                                <Tippy content={"Counter"}>
                                    <span className='Counters'></span>
                                </Tippy>
                                :""}
                                {character_ability.Trap == true?
                                <Tippy content={"Trap"}>
                                    <span className='Traps'></span>
                                </Tippy>
                                :""}
                                {character_ability.FollowUp == true?
                                <Tippy content={"Follow Up"}>
                                    <span className='FollowUp'></span>
                                </Tippy>
                                :""}

                                {character_ability.Summon == false?
                                <Tippy content={"Doesn't charge Summon"}>
                                    <span className='NoSummon'></span>
                                </Tippy>
                                :""}
                                {character_ability.NoEX == true?
                                <Tippy content={"Doesn't charge EX"}>
                                    <span className='NoEX'></span>
                                </Tippy>
                                :""}
                                {character_ability.Free_Ability == false?
                                <Tippy content={"No Free Uses"}>
                                    <span className='NoFree'></span>
                                </Tippy>
                                :""}
                                {character_ability.Free_Ability == true?
                                <Tippy content={"Does not consume ability use"}>
                                    <span className='Free'></span>
                                </Tippy>
                                :""}
                            </div>
                            <div className="infolocation">
                                {SubName != "" ?
                                <div className="abilityJPname">
                                {SubName && Format_Cleaner(SubName)}
                                </div>
                                :""}
                            </div>
                            <Tippy content="Scroll to top" className="tooltip" >
                            <span onClick={()=>window.scrollTo(0, 0)} className={tag_override != undefined ? `${tag_override} undertag clicky` : character_ability.command && character_ability.command.rank && `${rank_trans(character_ability.command.rank)} clicky`}></span>
                            </Tippy>
                        </div>
                        {use_num != 0 ?
                        <div className="usesmaker">
                            <div className="sidewaystextholder">
                                <div className="sidewaystext unique">
                                    {use_num > 100 ?
                                    "Speed":
                                    "Uses"}
                                </div>
                            </div>
                            {use_num > 100 ?
                            <Tippy content={recast_tip}>
                            <div className="abilityusesholder">
                            {character_ability.UseNum<100?
                            <span className={tag_override != undefined ? tag_override : character_ability.command && character_ability.command.rank && rank_trans(character_ability.command.rank)}></span>
                            :""}
                            {usemaker(character_ability.UseNum)}
                            {character_ability.increase !=undefined && character_ability.UseNum != 0 ?
                            character_ability.increase.map((self,i)=>(
                                self.recast!=undefined?
                                <div key={i}>
                                <span className={self.loc_tag}></span>+{self.recast}%
                                </div>
                                :self.use == 0 ? "":
                                <div key={i}>
                                <span className={self.loc_tag}></span>+{self.use}
                                </div>
                            ))
                            :""}
                            </div>
                            </Tippy>
                            :
                            <div className="abilityusesholder">
                            {character_ability.UseNum<100?
                            <span className={tag_override != undefined ? tag_override : character_ability.command && character_ability.command.rank && rank_trans(character_ability.command.rank)}></span>
                            :""}
                            {usemaker(character_ability.UseNum)}
                            {character_ability.increase !=undefined && character_ability.UseNum != 0 ?
                            character_ability.increase.map((self,i)=>(
                                self.recast!=undefined?
                                <div key={i}>
                                <span className={self.loc_tag}></span>+{self.recast}%
                                </div>
                                :self.use == 0 ? "":
                                <div key={i}>
                                <span className={self.loc_tag}></span>+{self.use}
                                </div>
                            ))
                            :""}
                            </div>}
                        </div>
                        :""}
                    </div> 
            </div>
            <div className={`bluebase abilityinfobase`}>

                {character_ability.command && character_ability.command.note !=undefined?
                <div className="subpassiveflair">
                {character_ability.command.note.split(/\n/gm).map((value, i)=>
                <div key={i}>{replacer_buff(`(${value})`)}</div>
                )}
                </div>
                :""}

                {character_ability.FR == true ?
                ProcessedCharacters[character_ability.charaID] &&
                ProcessedCharacters[character_ability.charaID].FR_Partner != undefined &&
                char_id[ProcessedCharacters[character_ability.charaID].FR_Partner] != undefined ?
                    `Summons ${char_id[ProcessedCharacters[character_ability.charaID].FR_Partner].name}`
                :""
                :""}

                {hit_map[`B1`] != undefined && hit_map[`B1`].show != false ?
                <Hit_Data_Pars
                key={`B1`}
                hit_data={hit_map[`B1`]}
                formatting={formatting}
                abilitytext={abilitytext}
                />
                :""}

                {hit_map[`B2`] != undefined && hit_map[`B2`].show != false ?
                <Hit_Data_Pars
                key={`B2`}
                hit_data={hit_map[`B2`]}
                formatting={formatting}
                abilitytext={abilitytext}
                />
                :""}

                {hit_map[`B3`] != undefined && hit_map[`B3`].show != false ?
                <Hit_Data_Pars
                key={`B3`}
                hit_data={hit_map[`B3`]}
                formatting={formatting}
                abilitytext={abilitytext}
                />
                :""}

                {hit_map[`B4`] != undefined && hit_map[`B4`].show != false ?
                <Hit_Data_Pars
                key={`B4`}
                hit_data={hit_map[`B4`]}
                formatting={formatting}
                abilitytext={abilitytext}
                />
                :""}

                {cast_list[-1] != undefined ?
                 cast_list[-1].map(self=>(
                    <div key={self.id}>
                        {self.cond != undefined ? `\xa0┬ `:""}{addformatting(self.cond,"tl")}
                        {self.cond != undefined ? <br/> :""}
                        {self.cond != undefined ? `\xa0└─ ` : ""}{addformatting(self.cast_str,"tl")}
                    </div>
                 ))
                :""} 

                {hit_count_map.map(number=>(
                    <div key={number}>
                     {cast_list[number] && cast_list[number].map(self=>(
                           <div key={self.id}>
                               {self.cond != undefined ? `\xa0┬ `:""}{addformatting(self.cond,"tl")}
                               {self.cond != undefined ? <br/> :""}
                               {self.cond != undefined ? `\xa0└─ ` : ""}{addformatting(self.cast_str,"tl")}
                           </div>
                        ))}
                    {hit_map[number] != undefined && hit_map[number].show != false ?
                        <Hit_Data_Pars
                        key={number}
                        hit_data={hit_map[number]}
                        formatting={formatting}
                        abilitytext={abilitytext}
                        />
                    :""}
                    </div>
                ))}

                {cast_list[0] != undefined ?
                 cast_list[0].map(self=>(
                    <div key={self.id}>
                        {self.cond != undefined ? `\xa0┬ `:""}{addformatting(self.cond,"tl")}
                        {self.cond != undefined ? <br/> :""}
                        {self.cond != undefined ? `\xa0└─ ` : ""}{addformatting(self.cast_str,"tl")}
                    </div>
                 ))
                :""}

                {//meta below
                }
                {command_meta && command_meta.faf!= undefined ?
                <div>
                {addformatting(command_meta && command_meta.faf,"tl")}
                </div>
                :""}

                {command_meta && command_meta.bdlur!= undefined ?
                <div>
                {addformatting(command_meta && command_meta.bdlur,"tl")}
                </div>
                :""}
                {command_meta && command_meta.mblur!= undefined ?
                <div>
                {addformatting(command_meta && command_meta.mblur,"tl")}
                </div>
                :""}

                {command_meta && command_meta.kcon!= undefined ?
                <div>
                {addformatting(command_meta && command_meta.kcon,"tl")}
                </div>
                :""}
                {command_meta && command_meta.kcon_1!= undefined ?
                <div>
                {addformatting(command_meta && command_meta.kcon_1,"tl")}
                </div>
                :""}

                {command_meta && command_meta.cost!= undefined ?
                command_meta.cost == "*Instant Turn Rate" ?
                    <div>
                    {addformatting(command_meta && command_meta.cost,"tl")}
                    </div>
                :""
                :""}

                {command_meta && command_meta.blow!= undefined ?
                <div>
                {addformatting(command_meta && command_meta.blow,"tl")}
                </div>
                :""}
                {command_meta && command_meta.stun!= undefined ?
                <div>
                {addformatting(command_meta && command_meta.stun,"tl")}
                </div>
                :""}
                {command_meta && command_meta.stunadd!= undefined ?
                <div>
                {addformatting(command_meta && command_meta.stunadd,"tl")}
                </div>
                :""}

                {command_meta && command_meta.cost!= undefined ?
                command_meta.cost != "*Instant Turn Rate" ?
                    <div>
                    {addformatting(command_meta && command_meta.cost,"tl")}
                    </div>
                :""
                :""}

                {//{command_meta && command_meta.nasp!= undefined ?
                //<div>
                //{addformatting(command_meta && command_meta.nasp,"tl")}
                //</div>
                //:""}
                //{command_meta && command_meta.nex!= undefined ?
                //<div>
                //{addformatting(command_meta && command_meta.nex,"tl")}
                //</div>
                //:""}
                //{command_meta && command_meta.nsum!= undefined ?
                //<div>
                //{addformatting(command_meta && command_meta.nsum,"tl")}
                //</div>
                //:""}
                //{command_meta && command_meta.nabi!= undefined ?
                //<div>
                //{addformatting(command_meta && command_meta.nabi,"tl")}
                //</div>
                //:""}
                }
                {command_meta && command_meta.exshow!= undefined ?
                <div>
                {addformatting(command_meta && command_meta.exshow,"tl")}
                </div>
                :""}
                {command_meta && command_meta.ncharge!= undefined ?
                <div>
                {addformatting(command_meta && command_meta.ncharge,"tl")}
                </div>
                :""}
                
                {command_meta && command_meta.show!= undefined ?
                <div>
                {addformatting(command_meta && command_meta.show,"tl")}
                </div>
                :""}
                {command_meta && command_meta.showadd!= undefined ?
                <div>
                {addformatting(command_meta && command_meta.showadd,"tl")}
                </div>
                :""}
                {character_ability.same_ability_id_ != 0?
                <div>
                    {`*Ability Group: ${character_ability.same_ability_id_}`}
                </div>
                :""}
                {character_ability.ability_rank_ != 0?
                <div>
                    {`*Ability Rank: ${character_ability.ability_rank_}`}
                </div>
                :""}
                {character_ability.command != undefined && character_ability.command.desc != undefined ? 
            desc == false ?
                <div className="clicky updatelink contents" onClick={()=>showmedesc(desc)}>
                    {"\xa0- Show Desc -"}
                </div>
           :
                <div className="clicky updatelink contents" onClick={()=>showmedesc(desc)}>
                    {"\xa0- Hide Desc -"}
                </div>
            :""}
            {desc == false && character_ability.command != undefined && character_ability.command.desc != undefined ? "" :
            <div>
                {desc == true ?
                <hr/>
                :""}
            {trans != undefined && showtrans == true ?
            trans.split(/\n/gm).map((value, i)=>
            <div key={i}>
            {addformatting(value,"ab")}<br></br>
            </div>
            )
            :
            character_ability.command && character_ability.command.desc && 
            addformatting(Format_Cleaner(character_ability.command.desc),"ab")
            }
            </div>
            }
            {ver == "JP" && desc == true ?
                <div className="clicky updatelink" onClick={()=>doTrans()} >Translate (Beta)</div>
                :""}
            {showraw == true?
            <ReactJson iconStyle={"square"} quotesOnKeys={false} name={"hit map"} displayDataTypes={false} collapsed={true} theme={"threezerotwofour"} src={hit_parers}/>
            :""}
            {showraw == true?
            <ReactJson iconStyle={"square"} quotesOnKeys={false} name={"Raw"} displayDataTypes={false} collapsed={false} theme={"threezerotwofour"} src={character_ability}/>
            :""}
            

            {character_ability.passives != undefined?
            <div className='p_grade'>
            <div className='fieldbar'><span className='smallpassive'></span>{"\xa0"}Effects:</div>
                <div className='spanleft'>
                {character_ability.passives.length != 1 ?
                <div className='subpassiveflair spacearound'>
                    <div key="mergecheck1" className={`${merge_pas == true ? "nodisplay" :  `uncheck`}`} onClick={togglemerge}/>
                    <div key="mergecheck2" className={`${merge_pas == true ? "check" :  `nodisplay`}`} onClick={togglemerge}/>
                    <div className='noselect'>&nbsp;&nbsp;Total Values</div>
                </div>
                :""}
                {merger_master(
                    character_ability.passives,

                    master_index,
                    ver,

                    merge_pas,
                    "command",
                    true
                ).sort((a,b)=>a.rank-b.rank).map((ailment_passive,i,whole)=>(
                    ailment_passive.is_total != true ? <Passive_Battle_State
                    key={`${ailment_passive.pa_id}-${i}`}
                    passive_ability={ailment_passive}
                    ver={ver}
                    master_index={master_index}

                    formatting={formatting}
                    skip_space={i}
                    use_ailment={true}
                    merged={whole[i-1] && whole[i-1].loc_tag}
                    hide_disp={merge_pas}
                    />
                    :
                    <Passive_Total_Display
                    key={i}
                    match={ailment_passive}
                    />
                ))}
                <div className='abilityJPname'>*depending on origin ability</div>
                </div>
            </div>
            :""}

            {character_ability.options!=undefined?
            <div className='p_grade'>
                <div className='fieldbar'>
                <div className={character_ability.options.length <=5 ? "" :'updatelink clicky'} onClick={doshow_upgrades}>
                {character_ability.options.length <=5 ? "Conditions:" : show_upgrades ? "Hide All Conditions" : "Show All Conditions"}
                </div>
                </div>
                {show_upgrades == true && character_ability.options.map((options,key)=>(
                    <Character_Option_Pars
                    key={key}
                    character_option={options}
                    ver={ver}
                    loc={loc}
                    file={file}
                    Single={false}
                    master_index={master_index}

                    formatting={formatting}
                    all_options={all_options}
                    />
                ))}
                </div>
            :""}

            </div>

            
            {character_ability.command && character_ability.command.casts && character_ability.command.casts != undefined || (bufflist && bufflist.length != 0 || statelist && statelist.length != 0 )? 
                <div className={`bufflistbanner noselect newblue`}>
                     {character_ability.command && character_ability.command.casts && character_ability.command.casts != undefined ?
                     <>
                    <div className="unique ailmenttext">Buffs / Debuffs:</div>
                    <ul className="abilitybufflist">  
                    {character_ability.command.casts && character_ability.command.casts.map(buffs =>(
                    <li className={`abilitybufficonsholder ${selectedbuff.unq_id == buffs.unq_id ? "buffactive" : ""}`} key={buffs.unq_id}>
                            <div className="biconspacer" onClick={() => buffselect(buffs)} >
                                <Tippy content={
                                    addformatting(buffs.name && buffs.name,"tl")
                                    }>
                                <img alt={buffs.name} className={`clicky abilitybufficon `} src={"https://dissidiacompendium.com/images/static/" +buffs.icon} />
                                </Tippy>
                            </div>
                        </li>
                    ))}
                </ul>
                </>
                :""}
                {bufflist && bufflist.length != 0 ?
                <>
                    <div className="unique ailmenttext">
                        Conditional Casts:
                    </div>
                    <ul className="abilitybufflist">
                    {bufflist && bufflist.length != 0 ?
                    <ul className="abilitybufflist">
                        {bufflist.map(function(buff){
                            const buffs = Object.values(buff)[0]
                            const cast = buffs.cast
                           return buffs.active == false ? "" : <li className={`abilitybufficonsholder ${selectedbuff.ailment_id == buffs.ailment_id && selectedbuff.data_id == buffs.data_id ? "buffactive" : ""}`} key={`${buffs.ailment_id}-${buffs.data_id}`}>
                               <div className="biconspacer" onClick={() => buffselect(buffs)} >
                               <DefaultTippy content={
                                        cast.name === "" ? addformatting(`Unknown ${cast.id}`,"tl") : addformatting(cast.name,"tl")
                                        }>
                                        <img alt={cast.name} className="clicky abilitybufficon" src={`https://dissidiacompendium.com/images/static/${cast.icon}`} />
                                    </DefaultTippy>
                                </div>
                            </li>
                        })}
                    </ul>:
                    ""}
                    </ul>
                </>
                :""}
                {statelist && statelist.length != 0 ?
                <>
                    <div className="unique ailmenttext">
                        Battle States:
                    </div>
                    <ul className="abilitybufflist">
                        {statelist.map(function(buff){
                            const buffs = Object.values(buff)[0]
                            const cast = buffs.cast
                           return  <li className={`abilitybufficonsholder ${selectedbuff.ailment_id == buffs.ailment_id && selectedbuff.data_id == buffs.data_id ? "buffactive" : ""}`} key={`${buffs.ailment_id}-${buffs.data_id}`}>
                               <div className="biconspacer" onClick={() => buffselect(buffs)} >
                               <DefaultTippy content={
                                        cast.name === "" ? addformatting(`Unknown ${cast.id}`,"tl") : addformatting(cast.name,"tl")
                                        }>
                                        <img alt={cast.name} className="clicky abilitybufficon" src={`https://dissidiacompendium.com/images/static/${cast.icon}`} />
                                    </DefaultTippy>
                                </div>
                            </li>
                        })}
                    </ul>
                </>
                :""}
                </div>
                :""}
                {selectedbuff.length != 0 && selectedbuff.is_passive != true && selectedbuff.is_state != true && selectedbuff.default == true?
                <Default_Ailment_Pars
                default_data={selectedbuff}
                master_index={master_index}
                ver={ver}

                formatting={formatting}
                gear={false}
                />
                :""}
                {selectedbuff.length != 0 && selectedbuff.is_passive == true?
                <Passive_Effects_Default
                passive_ability={selectedbuff.passive}

                master_index={master_index}

                formatting={formatting}
                ver={ver}
                />
                :""}
                {selectedbuff.length != 0 && selectedbuff.is_state != true?
                <Ailment_Data_Formatting
                file={file}
                loc={loc}
                ver={ver}
                ailment_data={selectedbuff.default == true ? selectedbuff.cast :selectedbuff}

                master_index={master_index}

                slider={true}
                rank={selectedbuff.default == true ? selectedbuff.rank_id : selectedbuff.arank}
                arg1={selectedbuff.default == true ? selectedbuff.arg1 : selectedbuff.aarg1}
                arg2={selectedbuff.default == true ? selectedbuff.arg2 : selectedbuff.aarg2}
                castlocation={true}
                alt_rank={selectedbuff.aranka}
                alt_aug1={selectedbuff.aarg1a}
                alt_aug2={selectedbuff.aarg2a}
                formatting={formatting}
                cur_char={character_ability.charaID}
                turns={selectedbuff.default == true ? selectedbuff.turn : selectedbuff.alife}
                />
                :""}
                {selectedbuff.length != 0 && selectedbuff.is_state == true?
                <div className='bufflistbanner Buffbase'>
                    <div className='Buffsubbanner'>
                        {addformatting(selectedbuff.cast.name,"tl")}
                        <div className='abilityJPname'>
                        {addformatting(selectedbuff.cast.jpname,"tl")}
                        </div>
                    </div>
                    {selectedbuff.passives && selectedbuff.passives.length >1?
                    <div className='subpassiveflair spacearound'>
                        <div key="mergecheck1" className={`${merge_pas_buffs == true ? "nodisplay" :  `uncheck`}`} onClick={togglemerge_buffs}/>
                        <div key="mergecheck2" className={`${merge_pas_buffs == true ? "check" :  `nodisplay`}`} onClick={togglemerge_buffs}/>
                        <div className='noselect'>&nbsp;&nbsp;Total Values</div>
                    </div>
                    :""}
                    {merger_master(
                        selectedbuff.passives,

                        master_index,
                        ver,

                        merge_pas_buffs,
                        "state",
                        false
                        ).sort((a,b)=>a.rank-b.rank).map((battle_passive,i,whole)=>(
                        battle_passive.is_total != true ? <Passive_Battle_State
                        key={`${battle_passive.pa_id}-${i}`}
                        passive_ability={battle_passive}
                        ver={ver}

                        master_index={master_index}
                        
                        formatting={formatting}
                        skip_space={i}
                        use_ailment={false}
                        merged={whole[i-1] && whole[i-1].loc_tag}
                        hide_disp={merge_pas_buffs}
                        />
                        :
                        <Passive_Total_Display
                        key={i}
                        match={battle_passive}
                        />
                    ))}
                </div>
                :""}
                </LazyLoadComponent>
            </div>
        </div>
    )
}
export default Character_Ability_Pars