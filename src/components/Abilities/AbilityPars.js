import React, { useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import Tippy from '../TippyDefaults'
import DefaultTippy from '../TippyDefaults'
import Format_Cleaner from '../../processing/format_cleaner'
import translater from '../../processing/translater_characters'
import 'react-lazy-load-image-component/src/effects/opacity.css';
import Ability_Icon_Maker from '../../processing/abilities/ability_icon_maker'
import AilmentDataFormatting from '../Buffs/AilmentDataFormatting';
import CharacterFaceFormatting from '../Characters/CharacterFaceFormatting'
import OptionParsFormatting from './OptionParsFormatting';
import Command_Ability_Pars from '../../processing/abilities/command_ability_pars';
import hitdata_for_ability from '../../processing/abilities/hitdata_for_ability'
import HitDataParsFormatting from './HitDataParsFormatting';
import counts_handler from '../../processing/abilities/hitdata_counts_handler.js'
import times_handler from '../../processing/abilities/hitdata_times_handler.js'
import ReplacerCharacter from '../ReplacerCharacter'
import { useDispatch, useSelector } from "react-redux";
import { getTransNames } from '../../redux/ducks/transnames';
import { MdRecordVoiceOver }from 'react-icons/md';
import ability_rank_trans from '../../processing/abilities/ability_rank_trans'
import { ObjectView } from 'react-object-view'
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import merger_master from '../../processing/passives/passive_stats_merger';
import Passive_Total_Display from '../Passives/PassiveTotalDisplay';
import PassiveEffectsHandoff from '../Passives/PassiveEffectsHandoff';
import ability_use_maker from '../../processing/abilities/ability_use_maker';
import ailment_level_icon from '../../processing/ailment/ailment_level_icon';
   
export default function CharacterAbilityPars({
    character_ability,
    loc,
    ver,
    file,
    ProcessedCharacters,
    formatting,
    tag_override,
    all_options,
    link,
    master_index,
    hide_chara,
    use_tag,
    info
}){

    const form = {formatting:formatting}

    const CommandNames = master_index.commands
    const char_id = master_index.charid

    const [merge_pas, setmerge_pas] = useStateIfMounted(character_ability && character_ability.passives && character_ability.passives.length > 1 ? true : false)
    const [selectedbuff, setselectedbuff] = useStateIfMounted([]);

    const togglemerge = () => {
        setmerge_pas((prevValue) => !prevValue);
    }

    const [show_upgrades, setshow_upgrades] = useStateIfMounted(character_ability && character_ability.options && character_ability.options.length > 5 ? false : true)

    useEffect(() => {
        setmerge_pas(character_ability && character_ability.passives && character_ability.passives.length > 1 ? true : false)
        setshow_upgrades(character_ability && character_ability.options && character_ability.options.length > 5 ? false : true)
        // eslint-disable-next-line
    }, [character_ability])

    const doshow_upgrades = () => {
        if (character_ability && character_ability.options && character_ability.options.length > 5) {
            setshow_upgrades(!show_upgrades)
        }
    }

    const [bufflist, setbufflist] = useStateIfMounted([])
    const [statelist, setstatelist] = useStateIfMounted([])

    useEffect(() => {
        if (character_ability.defaults != undefined) {
            if (character_ability.defaults.states != undefined) {
                setstatelist(character_ability.defaults.states.sort((a, b) => Object.keys(b) - Object.keys(a)))
            }
            if (character_ability.defaults.buffs != undefined) {
                setbufflist(character_ability.defaults.buffs.sort((a, b) => Object.keys(b) - Object.keys(a)))
            }
        }
        // eslint-disable-next-line
    }, [character_ability])

    const [merge_pas_buffs, setmerge_pas_buffs] = useStateIfMounted(true)

    useEffect(() => {
        if (selectedbuff && selectedbuff.passives && selectedbuff.passives.length <= 1) {
            setmerge_pas_buffs(false)
        } else {
            setmerge_pas_buffs(true)
        }
        // eslint-disable-next-line
    }, [selectedbuff])

    const togglemerge_buffs = () => {
        setmerge_pas_buffs((prevValue) => !prevValue);
    }

    const dispatch = useDispatch();

    const transnames = useSelector((state) =>
        state.transnames.transnames
    );

    const [playingaudio, setplayingaudio] = useStateIfMounted(false)
    const [showraw, setshowraw] = useStateIfMounted(false)
    const [showoptions, setshowoptions] = useStateIfMounted(false)
    const [desc, setdesc] = useStateIfMounted(false)
    const [showhitdata, setshowhitdata] = useStateIfMounted(false)
    const [trans, settrans] = useStateIfMounted()
    const [showtrans, setshowtrans] = useStateIfMounted(false)

    useEffect(() => {
        let mounted = true
        if (mounted && transnames == undefined && showtrans == true) {
            dispatch(getTransNames());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, transnames, showtrans]);

    async function doTrans(text) {
        setshowtrans((prevValue) => !prevValue)
    }

    useEffect(() => {
        const text = Format_Cleaner(character_ability.command && character_ability.command.desc)
        if (transnames != undefined && showtrans == true) {
            const translate = translater(text, transnames)
            settrans(translate)
        }
    }, [settrans, transnames, showtrans, character_ability]);

    const showmeraw = (e) => {
        if (e.shiftKey) {
            if (showraw == false) {
                setshowraw(true)
            } else {
                setshowraw(false)
            }
        }
    }

    const volume = useSelector((state) =>
        state.volume.volume
    );

    const playvoice =()=>{
        if(playingaudio != true && character_ability.voice_index != undefined){
            try {
                const myAudioElement = new Audio(`https://dissidiacompendium.com/images/static/characters/${char_id[character_ability.charaID] && char_id[character_ability.charaID].CharacterURLName}/voice/${character_ability.voice_index}.mp3`)
                myAudioElement.volume = volume
                myAudioElement.style.display = "none"
                myAudioElement.addEventListener("canplaythrough", (event) => {
                    /* the audio is now playable; play it if permissions allow */
                    setplayingaudio(true)
                    myAudioElement.play();
                });
                myAudioElement.onended = function(){
                    setplayingaudio(false)
                    myAudioElement.remove();
                }
                myAudioElement.load();
            } catch (error) {
                console.log(error)
                setplayingaudio(false)
            }
        }
    }

    const showmeoptions = (current) => {
        if (current == false) {
            setshowoptions(true)
        } else {
            setshowoptions(false)
        }
    }

    const showmedesc = (current) => {
        if (current == false) {
            setdesc(true)
        } else {
            setdesc(false)
        }
    }

    const showmehitdata = (current) => {
        if (current == false) {
            setshowhitdata(true)
        } else {
            setshowhitdata(false)
        }
    }

    const buffselect = (buffs) => {
        if (selectedbuff.unq_id == buffs.unq_id) {
            setselectedbuff([])
        } else {
            setselectedbuff(buffs)
        }
    }

    const use_num = ability_use_maker(character_ability)

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

    const IconURL = Ability_Icon_Maker(
        character_ability,

        master_index,
        ver,

        use_num,
    )
   
    var Name = ""
    var SubName = ""

    if (ver == "JP") {
        if (character_ability.command && character_ability.command.glname != undefined) {
            Name = character_ability.command.glname
        } else {
            var comdpull = CommandNames[character_ability.LearningAbility] && CommandNames[character_ability.LearningAbility].name
            if (comdpull != undefined) {
                Name = comdpull
            } else {
                Name = `#${character_ability.LearningAbility}`
            }
        }
    } else {
        if (character_ability.command && character_ability.command.name != undefined) {
            Name = character_ability.command.name
        } else {
            comdpull = CommandNames[character_ability.LearningAbility] && CommandNames[character_ability.LearningAbility].name
            if (comdpull != undefined) {
                Name = comdpull
            } else {
                Name = `#${character_ability.LearningAbility}`
            }
        }
    }

    if (ver == "JP") {
        if (character_ability.command && character_ability.command.name != undefined) {
            SubName = character_ability.command.name
        } else {
            comdpull = CommandNames[character_ability.LearningAbility] && CommandNames[character_ability.LearningAbility].name
            if (comdpull != undefined) {
                SubName = comdpull
            } else {
                SubName = `#${character_ability.LearningAbility}`
            }
        }
    } else {
        if (character_ability.command && character_ability.command.jpname != undefined) {
            SubName = character_ability.command.jpname
        } else {
            comdpull = CommandNames[character_ability.LearningAbility] && CommandNames[character_ability.LearningAbility].name
            if (comdpull != undefined) {
                SubName = comdpull
            } else {
                SubName = `#${character_ability.LearningAbility}`
            }
        }
    }

    const command_meta = character_ability && character_ability.command &&
        Command_Ability_Pars(
            character_ability.command,
            ver,
            master_index,
        )

    const hit_data_pars = character_ability && hitdata_for_ability(
        character_ability,
        master_index,
        ver,
        command_meta 
    )

    const hit_parers = counts_handler(hit_data_pars.hit_pars)

    const hit_map = times_handler(hit_parers)

    const abilitytext = character_ability.command && character_ability.command && character_ability.command.udname

    const cast_list = {}

    command_meta && command_meta.cast_list && command_meta.cast_list.forEach(self => {
        if (cast_list[self.hit] == undefined) {
            Object.assign(cast_list, { [self.hit]: [self] })
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

    return (
        <div className="buffunit" loading="lazy">
            <div className="infoholder" style={{ minHeight: "220px" }}>
                <div className="infotitleholder">
                    <div className="faceandiconholder">
                        <div className="idoffset" id={character_ability.LearningAbility}></div>
                        {hide_chara == true ?"":
                        <CharacterFaceFormatting char_id={char_id} id={character_ability.charaID} loc={loc} link={link} />
                        }
                        <div className={hide_chara == true ? "enemyabilityiconholder" :"abilityiconholder"} onClick={showmeraw} >
                            <div className="abilityurlholder">
                                <LazyLoadImage effect="opacity" className="abilityicon" alt={Name} src={`https://dissidiacompendium.com/images/static/${IconURL}.png`} />
                                <div className={
                                    typeof use_num == "string" ? "abilityblspeed" :
                                    character_ability.Crystal == true && use_num != 0 ? "saholder_crystal" :
                                        character_ability.FR == true && use_num != 0 ? "saholderg" :
                                            character_ability.CallLD == true && use_num != 0 ? "saholderg" :
                                                character_ability.BT == true && use_num != 0 ? "saholderg" :
                                                    "saholder"
                                }>
                                    {typeof use_num != "string" ?
                                        <div className={`sanumber${character_ability.Crystal == true ? "_crystal": ""} ${character_ability.Free_Ability == true ? "upstat" : ""}`}>{use_num || "∞"}</div>
                                        :
                                        (use_num || "∞")
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
                                    {Name && ReplacerCharacter(Format_Cleaner(Name),form)}{` - #${character_ability.LearningAbility}`}
                                    {character_ability.Group == true ?
                                        <span className='inline Group'></span>
                                        : ""}
                                    {character_ability.Melee == true ?
                                        <span className='inline Melee'></span>
                                        : ""}
                                    {character_ability.Ranged == true ?
                                        <span className='inline Ranged'></span>
                                        : ""}
                                    {character_ability.Magic == true ?
                                        <span className='inline Magic'></span>
                                        : ""}
                                    {character_ability.Fire == true ?
                                        <span className='inline Fire'></span>
                                        : ""}
                                    {character_ability.Ice == true ?
                                        <span className='inline Ice'></span>
                                        : ""}
                                    {character_ability.Thunder == true ?
                                        <span className='inline Thunder'></span>
                                        : ""}
                                    {character_ability.Earth == true ?
                                        <span className='inline Earth'></span>
                                        : ""}
                                    {character_ability.Water == true ?
                                        <span className='inline Water'></span>
                                        : ""}
                                    {character_ability.Wind == true ?
                                        <span className='inline Wind'></span>
                                        : ""}
                                    {character_ability.Holy == true ?
                                        <span className='inline Holy'></span>
                                        : ""}
                                    {character_ability.Dark == true ?
                                        <span className='inline Dark'></span>
                                        : ""}

                                    {character_ability.HP_Heal_Ability == true ?
                                        <Tippy content={"Heals"}>
                                            <span className='inline Heals'></span>
                                        </Tippy>
                                        : ""}
                                    {character_ability.Ignore_DEF == true ?
                                        <Tippy content={"Ignores DEF"}>
                                            <span className='inline IgnoreDEF'></span>
                                        </Tippy>
                                        : ""}
                                    {character_ability.Instant == true ?
                                        <Tippy content={"Instant Turn Rate"}>
                                            <span className='inline Instant'></span>
                                        </Tippy>
                                        : ""}
                                    {character_ability.Launcher == true ?
                                        <Tippy content={"Knock Back"}>
                                            <span className='inline KnockBack'></span>
                                        </Tippy>
                                        : ""}
                                    {character_ability.Counter == true ?
                                        <Tippy content={"Counter"}>
                                            <span className='inline Counters'></span>
                                        </Tippy>
                                        : ""}
                                    {character_ability.Trap == true ?
                                        <Tippy content={"Trap"}>
                                            <span className='inline Traps'></span>
                                        </Tippy>
                                        : ""}
                                    {character_ability.FollowUp == true ?
                                        <Tippy content={"Follow Up"}>
                                            <span className='inline FollowUp'></span>
                                        </Tippy>
                                        : ""}

                                    {character_ability.Summon == false ?
                                        <Tippy content={"Doesn't charge Summon"}>
                                            <span className='inline NoSummon'></span>
                                        </Tippy>
                                        : ""}
                                    {character_ability.NoEX == true ?
                                        <Tippy content={"Doesn't charge EX"}>
                                            <span className='inline NoEX'></span>
                                        </Tippy>
                                        : ""}
                                    {character_ability.Free_Ability == false ?
                                        <Tippy content={"No Free Uses"}>
                                            <span className='inline NoFree'></span>
                                        </Tippy>
                                        : ""}
                                    {character_ability.Free_Ability == true ?
                                        <Tippy content={"Does not consume ability use"}>
                                            <span className='inline Free'></span>
                                        </Tippy>
                                        : ""}
                                </div>
                                <div className="infolocation">
                                    {SubName != "" ?
                                        <div className="abilityJPname">
                                            {SubName && Format_Cleaner(SubName)}
                                        </div>
                                        : ""}
                                </div>
                                <Tippy content="Scroll to top" className="tooltip" >
                                    <span onClick={() => window.scrollTo(0, 0)} className={tag_override != undefined ? `${tag_override} undertag clicky` : character_ability.command && character_ability.command.rank && `${ability_rank_trans(character_ability.command.rank)} clicky`}></span>
                                </Tippy>
                                {character_ability.voice_index != undefined ?
                                    <Tippy content="Play voice line" className="tooltip" >
                                        <span>{" "}<MdRecordVoiceOver onClick={playvoice} className='soundicon click' style={{color:`${playingaudio == true ? "yellow":""}`}}/></span>
                                    </Tippy>
                                :""}
                            </div>
                            {use_num != 0 ?
                                <div className="usesmaker">
                                    <div className="sidewaystextholder">
                                        <div className="sidewaystext unique">
                                            {typeof use_num == "string" ?
                                                "Speed" :
                                                "Uses"}
                                        </div>
                                    </div>
                                    {typeof use_num == "string" ?
                                        <Tippy content={recast_tip}>
                                            <div className={"abilityusesholder2"}>
                                                <span className={use_tag != undefined ? use_tag : tag_override != undefined ? tag_override : character_ability.command && character_ability.command.rank && ability_rank_trans(character_ability.command.rank)}></span>
                                                {use_num || "∞"}
                                                {character_ability.increase.map((self, i) => (
                                                        self.recast != undefined ?
                                                            <div key={i} style={{ whiteSpace: "nowrap" }}>
                                                                <span className={`undertaga ${self.loc_tag}`}></span>{`+${self.recast}%`}
                                                            </div>
                                                            : self.use == 0 ? "" :
                                                                <div key={i} style={{ whiteSpace: "nowrap" }}>
                                                                    <span className={`undertaga ${self.loc_tag}`}></span>{`+${self.use}`}
                                                                </div>
                                                ))}
                                            </div>
                                        </Tippy>
                                        :
                                        <div className={"abilityusesholder"}>
                                            <span className={use_tag != undefined ? use_tag :tag_override != undefined ? tag_override : character_ability.command && character_ability.command.rank && ability_rank_trans(character_ability.command.rank)}></span> 
                                            {use_tag != undefined ? " x" :""}{use_num || "∞"}
                                            {character_ability.increase != undefined && use_num != 0 ?
                                                character_ability.increase.map((self, i) => (
                                                    self.recast != undefined ?
                                                        <div key={i} style={{ whiteSpace: "nowrap" }}>
                                                            <span className={`undertaga ${self.loc_tag}`}></span>{`+${self.recast}%`}
                                                        </div>
                                                        : self.use == 0 ? "" :
                                                            <div key={i} style={{ whiteSpace: "nowrap" }}>
                                                                <span className={`undertaga ${self.loc_tag}`}></span>{`+${self.use}`}
                                                            </div>
                                                ))
                                            : ""}
                                        </div>}
                                </div>
                            : ""}
                        </div>
                        {info != undefined?
                            <div className='buffglreworkbanner'>{info}</div>
                        :""}
                    </div>
                    <div className={`bluebase abilityinfobase`}>

                        {character_ability.command && character_ability.command.note != undefined ?
                            <div className="subpassiveflair">
                                {ReplacerCharacter(`${character_ability.command.note}\n`,form)}
                            </div>
                            : ""}

                        {character_ability.FR == true ?
                            ProcessedCharacters[character_ability.charaID] &&
                                ProcessedCharacters[character_ability.charaID].FR_Partner != undefined &&
                                char_id[ProcessedCharacters[character_ability.charaID].FR_Partner] != undefined ?
                                ReplacerCharacter(`Summons ${char_id[ProcessedCharacters[character_ability.charaID].FR_Partner].CharacterName}\n`,form)
                                : ""
                            : ""}

                        {hit_map[`B1`] != undefined && hit_map[`B1`].show != false ?
                            <HitDataParsFormatting
                                key={`B1`}
                                hit_data={hit_map[`B1`]}
                                formatting={formatting}
                                abilitytext={abilitytext}
                            />
                            : ""}

                        {hit_map[`B2`] != undefined && hit_map[`B2`].show != false ?
                            <HitDataParsFormatting
                                key={`B2`}
                                hit_data={hit_map[`B2`]}
                                formatting={formatting}
                                abilitytext={abilitytext}
                            />
                            : ""}

                        {hit_map[`B3`] != undefined && hit_map[`B3`].show != false ?
                            <HitDataParsFormatting
                                key={`B3`}
                                hit_data={hit_map[`B3`]}
                                formatting={formatting}
                                abilitytext={abilitytext}
                            />
                            : ""}

                        {hit_map[`B4`] != undefined && hit_map[`B4`].show != false ?
                            <HitDataParsFormatting
                                key={`B4`}
                                hit_data={hit_map[`B4`]}
                                formatting={formatting}
                                abilitytext={abilitytext}
                            />
                            : ""}

                        {cast_list[-1] != undefined ?
                            cast_list[-1].map(self => (
                                self.cond != undefined ? ReplacerCharacter(`┬ ${self.cond}\n└─ ${self.cast_str}\n`,form) : ReplacerCharacter(`${self.cast_str}\n`,form)
                            ))
                            : ""}
                            
                        {hit_count_map.map(number => (
                            (cast_list[number] != undefined || (hit_map[number] != undefined && hit_map[number].show != false)) ? 
                                <HitDataParsFormatting
                                    key={number}
                                    cast_list={cast_list[number]}
                                    hit_data={hit_map[number]}
                                    formatting={formatting}
                                    abilitytext={abilitytext}
                                />
                            :""
                        ))}

                        {cast_list[0] != undefined ?
                            cast_list[0].map(self => (
                                self.cond != undefined ? ReplacerCharacter(`┬ ${self.cond}\n└─ ${self.cast_str}\n`,form) : ReplacerCharacter(`${self.cast_str}\n`,form)
                            ))
                            : ""}

                        {hit_map[`S1`] != undefined && hit_map[`S1`].show != false ?
                            <HitDataParsFormatting
                                key={`S1`}
                                hit_data={hit_map[`S1`]}
                                formatting={formatting}
                                abilitytext={abilitytext}
                            />
                            : ""}

                        {//meta below
                        }
                        {
                        //{command_meta && command_meta.faf != undefined ?
                        //    ReplacerCharacter(command_meta.faf+"\n",form)
                        //    : ""}
                        }
                        {command_meta && command_meta.bdlur != undefined ?
                            ReplacerCharacter(command_meta.bdlur+"\n",form)
                            : ""}
                        {command_meta && command_meta.mblur != undefined ?
                            ReplacerCharacter(command_meta.mblur+"\n",form)
                            : ""}
                        {
                        //{command_meta && command_meta.kcon != undefined ?
                        //    ReplacerCharacter(command_meta.kcon+"\n",form)
                        //    : ""}
                        //{command_meta && command_meta.kcon_1 != undefined ?
                        //    ReplacerCharacter(command_meta.kcon_1+"\n",form)
                        //    : ""}
                        //{command_meta && command_meta.kid != undefined ?
                        //    ReplacerCharacter(command_meta.kid+"\n",form)
                        //    : ""}
                        //{command_meta && command_meta.kid_1 != undefined ?
                        //    ReplacerCharacter(command_meta.kid_1+"\n",form)
                        //    : ""}
                        }

                        {command_meta && command_meta.cost != undefined ?
                            command_meta.cost == "*Instant Turn Rate" ?
                                ReplacerCharacter(command_meta.cost+"\n",form)
                                : ""
                            : ""}

                        {command_meta && command_meta.blow != undefined ?
                            ReplacerCharacter(command_meta.blow+"\n",form)
                            : ""}
                        {command_meta && command_meta.stun != undefined ?
                            ReplacerCharacter(command_meta.stun+"\n",form)
                            : ""}
                        {command_meta && command_meta.stunadd != undefined ?
                            ReplacerCharacter(command_meta.stunadd+"\n",form)
                            : ""}

                        {command_meta && command_meta.cost != undefined ?
                            command_meta.cost != "*Instant Turn Rate" ?
                                ReplacerCharacter(command_meta.cost+"\n",form)
                                : ""
                            : ""}

                        {//{command_meta && command_meta.nasp!= undefined ?
                            //ReplacerCharacter(command_meta.nasp+"\n",form)
                            //:""}
                            //{command_meta && command_meta.nex!= undefined ?
                            //ReplacerCharacter(command_meta.nex+"\n",form)
                            //:""}
                            //{command_meta && command_meta.nsum!= undefined ?
                            //ReplacerCharacter(command_meta.nsum+"\n",form)
                            //:""}
                            //{command_meta && command_meta.nabi!= undefined ?
                            //ReplacerCharacter(command_meta.nabi+"\n",form)
                            //:""}
                        }
                        {command_meta && command_meta.exshow != undefined ?
                            ReplacerCharacter(command_meta.exshow+"\n",form)
                            : ""}
                        {command_meta && command_meta.ncharge != undefined ?
                            ReplacerCharacter(command_meta.ncharge+"\n",form)
                            : ""}

                        {command_meta && command_meta.show != undefined ?
                            ReplacerCharacter(command_meta.show+"\n",form)
                            : ""}
                        {command_meta && command_meta.showadd != undefined ?
                            ReplacerCharacter(command_meta.showadd+"\n",form)
                            : ""}
                        {character_ability.same_ability_id_ != 0 && character_ability.same_ability_id_ != undefined?
                            ReplacerCharacter(`*Ability Group: ${character_ability.same_ability_id_}\n`,form)
                            : ""}
                        {character_ability.ability_rank_ != 0 && character_ability.same_ability_id_ != undefined?
                            ReplacerCharacter(`*Ability Rank: ${character_ability.ability_rank_}\n`,form)
                            : ""}
                        {character_ability.command != undefined && character_ability.command.desc != undefined ?
                            desc == false ?
                                <div className="clicky updatelink contents" onClick={() => showmedesc(desc)}>
                                    {"\xa0- Show Desc -"}
                                </div>
                                :
                                <div className="clicky updatelink contents" onClick={() => showmedesc(desc)}>
                                    {"\xa0- Hide Desc -"}
                                </div>
                            : ""}
                        {desc == false && character_ability.command != undefined && character_ability.command.desc != undefined ? "" :
                            <div>
                                {desc == true ?
                                    <hr />
                                    : ""}
                                {trans != undefined && showtrans == true ?
                                    ReplacerCharacter(trans+"\n",form)
                                    :
                                    character_ability.command && character_ability.command.desc &&
                                    ReplacerCharacter(Format_Cleaner(character_ability.command.desc),form)
                                }
                            </div>
                        }
                        {ver == "JP" && desc == true ?
                            <div className="clicky updatelink contents" onClick={() => doTrans()} >Translate (Beta)</div>
                            : ""}
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
                            data={hit_parers} />
                            </span>
                            : ""}
                        {showraw == true ?
                            <span className='react-json-view'>
                            <ObjectView 
                            options={
                                {
                                  hideDataTypes: true,
                                  expandLevel: 1
                                }
                              }
                            data={character_ability} />
                            </span>
                            : ""}


                        {character_ability.passives != undefined ?
                            <div className='p_grade'>
                                <div className='fieldbar'><span className='smallpassive'></span>{"\xa0"}Effects:</div>
                                <div className='spanleft'>
                                    {character_ability.passives.length != 1 ?
                                        <div className='subpassiveflair spacearound'>
                                            <div key="mergecheck1" className={`${merge_pas == true ? "nodisplay" : `uncheck`}`} onClick={togglemerge} />
                                            <div key="mergecheck2" className={`${merge_pas == true ? "check" : `nodisplay`}`} onClick={togglemerge} />
                                            <div className='noselect'>&nbsp;&nbsp;Total Values</div>
                                        </div>
                                        : ""}
                                    {merger_master(
                                        character_ability.passives,

                                        master_index,
                                        ver,

                                        merge_pas,
                                        "command",
                                        true
                                    ).sort((a, b) => a.rank - b.rank).map((ailment_passive, i, whole) => (
                                        ailment_passive.is_total != true ? <PassiveEffectsHandoff
                                            key={`${ailment_passive.pa_id}-${i}`}
                                            passive_ability={ailment_passive}
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
                                            <Passive_Total_Display
                                                key={i}
                                                match={ailment_passive}
                                            />
                                    ))}
                                    <div className='abilityJPname'>*depending on origin ability</div>
                                </div>
                            </div>
                            : ""}

                        {character_ability.options != undefined ?
                            <div className='p_grade'>
                                <div className='fieldbar'>
                                    <div className={character_ability.options.length <= 5 ? "" : 'updatelink clicky'} onClick={doshow_upgrades}>
                                        {character_ability.options.length <= 5 ? "Conditions:" : show_upgrades ? "Hide All Conditions" : "Show All Conditions"}
                                    </div>
                                </div>
                                {show_upgrades == true && character_ability.options.map((options, key) => (
                                    <OptionParsFormatting
                                        key={key}
                                        character_option={options}
                                        ver={ver}
                                        master_index={master_index}
                                        all_options={all_options}
                                    />
                                ))}
                            </div>
                            : ""}

                    </div>

                    {character_ability.command && character_ability.command.casts && character_ability.command.casts != undefined || (bufflist && bufflist.length != 0 || statelist && statelist.length != 0) ?
                        <div className={`bufflistbanner noselect newblue`}>
                            {character_ability.command && character_ability.command.casts && character_ability.command.casts != undefined ?
                                <>
                                    <div className="unique ailmenttext">Buffs / Debuffs:</div>
                                    <ul className="abilitybufflist">
                                        {character_ability.command.casts && character_ability.command.casts.map(buffs => (
                                            <li className={`abilitybufficonsholder ${selectedbuff.unq_id == buffs.unq_id ? "buffactive" : ""}`} key={buffs.unq_id}>
                                                <div className="biconspacer" onClick={() => buffselect(buffs)} >
                                                    <Tippy content={
                                                        ReplacerCharacter(buffs.name,form)
                                                    }>
                                                        <img alt={buffs.name} className={`clicky abilitybufficon `} src={`https://dissidiacompendium.com/images/static/icons/buff/${ailment_level_icon(buffs,buffs.aarg1)}.png`} />
                                                    </Tippy>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                                : ""}
                            {bufflist && bufflist.length != 0 ?
                                <>
                                    <div className="unique ailmenttext">
                                        Conditional Casts (Non-self):
                                    </div>
                                    <ul className="abilitybufflist">
                                        {bufflist && bufflist.length != 0 ?
                                            <ul className="abilitybufflist">
                                                {bufflist.map(function (buff) {
                                                    const buffs = Object.values(buff)[0]
                                                    const cast = buffs.cast
                                                    return buffs.active == false ? "" : <li className={`abilitybufficonsholder ${selectedbuff.ailment_id == buffs.ailment_id && selectedbuff.data_id == buffs.data_id ? "buffactive" : ""}`} key={`${buffs.ailment_id}-${buffs.data_id}`}>
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
                                    </ul>
                                </>
                                : ""}
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
                                : ""}
                        </div>
                        : ""}
                    {selectedbuff.length != 0 && selectedbuff.is_state != true ?
                        <AilmentDataFormatting
                            key={selectedbuff.id}
                            file={file}
                            loc={loc}
                            ver={ver}
                            ailment_data={selectedbuff.default == true ? selectedbuff.cast : selectedbuff}

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
                            character_face={false}
                            hide_title={true}
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
                                    <div key="mergecheck1" className={`${merge_pas_buffs == true ? "nodisplay" : `uncheck`}`} onClick={togglemerge_buffs} />
                                    <div key="mergecheck2" className={`${merge_pas_buffs == true ? "check" : `nodisplay`}`} onClick={togglemerge_buffs} />
                                    <div className='noselect'>&nbsp;&nbsp;Total Values</div>
                                </div>
                                : ""}
                            {merger_master(
                                selectedbuff.passives,

                                master_index,
                                ver,

                                merge_pas_buffs,
                                "state",
                                false
                            ).sort((a, b) => a.rank - b.rank).map((battle_passive, i, whole) => (
                                battle_passive.is_total != true ? <PassiveEffectsHandoff
                                    key={`${battle_passive.pa_id}-${i}`}
                                    passive_ability={battle_passive}
                                    ver={ver}

                                    master_index={master_index}

                                    formatting={formatting}
                                    skip_space={i}
                                    use_ailment={false}
                                    merged={whole[i - 1] && whole[i - 1].loc_tag}
                                    hide_disp={merge_pas_buffs}
                                    battle_state={true}
                                />
                                    :
                                    <Passive_Total_Display
                                        key={i}
                                        match={battle_passive}
                                    />
                            ))}
                        </div>
                        : ""}
                </LazyLoadComponent>
            </div>
        </div>
    )
}