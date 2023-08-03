import React, { useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import { useDispatch, useSelector } from "react-redux";
import translater from '../../processing/translater_characters'
import { getTransNames } from '../../redux/ducks/transnames';
import command_dif from '../../processing/abilities/command_dif'
import options_dif from '../../processing/abilities/options_dif';
import CharacterFaceFormatting from '../Characters/CharacterFaceFormatting'
import ability_icon_maker from '../../processing/abilities/ability_icon_maker'
import { ObjectView } from 'react-object-view'
import Tippy from '../TippyDefaults'
import Format_Cleaner from '../../processing/format_cleaner'
import ReplacerCharacter from '../ReplacerCharacter'
import { MdRecordVoiceOver }from 'react-icons/md';
import ability_rank_trans from '../../processing/abilities/ability_rank_trans'
import AilmentDataFormatting from '../Buffs/AilmentDataFormatting'
import AilmentDifFormatting from '../Buffs/AilmentDifFormatting';
import makediff from '../../processing/makediff';
import ability_use_maker from '../../processing/abilities/ability_use_maker';
import ailment_level_icon from '../../processing/ailment/ailment_level_icon';
import { LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';

function AbilityDifFormatting({
    command_old,
    ver_old,
    command_new,
    ver_new,
    master_index,
    info,
    debugging,
    showvalues,
    scrollPosition 
}){

    const from = {diffing:true}
    const froma = {diffing:true, updown:true}

    const CommandNames = master_index.commands
    const char_id = master_index.charid

    const [trans, settrans] = useStateIfMounted()
    const [showtrans, setshowtrans] = useStateIfMounted(false)
    const [playingaudio, setplayingaudio] = useStateIfMounted(false)

    const dispatch = useDispatch();

    const transnames = useSelector((state) =>
        state.transnames.transnames
    );

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
        let mounted = true
        if (mounted && transnames == undefined && showtrans == true) {
            dispatch(getTransNames());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, transnames, showtrans]);


    useEffect(() => {
        const text = Format_Cleaner(command_new.command && command_new.command.desc).replace(/\\n/gm, "\x0A")
        if (transnames != undefined && showtrans == true) {
            const translate = translater(text, transnames)
            settrans(translate)
        }
    }, [settrans, transnames, showtrans, command_new]);

    const [showraw, setshowraw] = useStateIfMounted(false)
    const [desc, setdesc] = useStateIfMounted(false)
    const [displayinfo, setdisplayinfo] = useStateIfMounted()

    const showmeraw = (e) => {
        if (e.shiftKey) {
            if (showraw == false) {
                setshowraw(true)
            } else {
                setshowraw(false)
            }
        }
    }

    const showmedesc = (current) => {
        if (current == false) {
            setdesc(true)
        } else {
            setdesc(false)
        }
    }

    const use_num = ability_use_maker(command_new)

    const IconURL = ability_icon_maker(
        command_new,

        master_index,
        ver_new,

        use_num.full,
    )

    var Name = ""
    var SubName = ""

    if (ver_new == "JP") {
        if (command_new.command && command_new.command.glname != undefined) {
            Name = command_new.command.glname
        } else {
            var comdpull = CommandNames[command_new.LearningAbility] && CommandNames[command_new.LearningAbility].name
            if (comdpull != undefined) {
                Name = comdpull
            } else {
                Name = `#${command_new.LearningAbility}`
            }
        }
    } else {
        if (command_new.command && command_new.command.name != undefined) {
            Name = command_new.command.name
        } else {
            comdpull = CommandNames[command_new.LearningAbility] && CommandNames[command_new.LearningAbility].name
            if (comdpull != undefined) {
                Name = comdpull
            } else {
                Name = `#${command_new.LearningAbility}`
            }
        }
    }

    if (ver_new == "JP") {
        if (command_new.command && command_new.command.name != undefined) {
            SubName = command_new.command.name
        } else {
            comdpull = CommandNames[command_new.LearningAbility] && CommandNames[command_new.LearningAbility].name
            if (comdpull != undefined) {
                SubName = comdpull
            } else {
                SubName = `#${command_new.LearningAbility}`
            }
        }
    } else {
        if (command_new.command && command_new.command.jpname != undefined) {
            SubName = command_new.command.jpname
        } else {
            comdpull = CommandNames[command_new.LearningAbility] && CommandNames[command_new.LearningAbility].name
            if (comdpull != undefined) {
                SubName = comdpull
            } else {
                SubName = `#${command_new.LearningAbility}`
            }
        }
    }

    const command_old_tex = command_dif(
            command_old,
            master_index,
            ver_old,
            debugging)
    

    const command_new_tex = command_dif(
            command_new,
            master_index,
            ver_new,
            debugging)
    
    const commandcompare = makediff(command_old_tex.replace(/\s+$/g, ""), command_new_tex.replace(/\s+$/g, ""))

    const [selectedbuff, setselectedbuff] = useStateIfMounted([]);
    const [selectedbuff_old, setselectedbuff_old] = useStateIfMounted([]);

    const buffselect = (buffs) => {
        if (selectedbuff.unq_id == buffs.unq_id) {
            setdisplayinfo()
            setselectedbuff([])
            setselectedbuff_old([])
        } else {
            if (command_old && command_old.command && command_old.command.casts != undefined) {
                const find_old = command_old.command.casts.filter(self => self.id == buffs.id)
                if (find_old.length != 0) {
                    setdisplayinfo()
                    setselectedbuff_old(find_old[0])
                    setselectedbuff(buffs)
                } else {
                    setdisplayinfo("New cast! (doesn't compare)")
                    setselectedbuff_old([])
                    setselectedbuff(buffs)
                }
            } else {
                setdisplayinfo("New cast! (doesn't compare)")
                setselectedbuff_old([])
                setselectedbuff(buffs)
            }
        }
    }

    var optioncompare = ""

    var options_old_tex = ""
    if (command_old.options != undefined) {
        options_old_tex = options_dif(
            command_old,
            ver_old,
            master_index
        )
    }
    var options_new_tex = ""
    if (command_new.options != undefined) {
        options_new_tex = options_dif(
            command_new,
            ver_new,
            master_index
        )
    }
    if (options_old_tex != "" || options_new_tex != "") {
        if(options_old_tex != ""){
            optioncompare = makediff(options_old_tex.replace(/\s+$/g, ""), options_new_tex.replace(/\s+$/g, ""))
        } else {
            optioncompare = "~~" + options_new_tex + "~.~"
        }
    }

    const character_ability = command_new

    const [show_upgrades, setshow_upgrades] = useStateIfMounted(character_ability && character_ability.options && character_ability.options.length > 5 ? false : true)

    const volume = useSelector((state) =>
        state.volume.volume
    );

    const doshow_upgrades = () => {
        if (character_ability && character_ability.options && character_ability.options.length > 5) {
            setshow_upgrades(!show_upgrades)
        }
    }

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

    return (
        <div className="buffunit">
            <LazyLoadComponent
            scrollPosition={scrollPosition}
            placeholder={<div className="infoholder" style={{ minHeight: "220px" }}/>}
            >
            <div className="infoholder">
                <div className="infotitleholder">
                    <div className="faceandiconholder">
                        <div className="idoffset" id={character_ability.LearningAbility}></div>
                        <CharacterFaceFormatting char_id={char_id} id={character_ability.charaID} loc={undefined} />
                        <div className="abilityiconholder" onClick={showmeraw}>
                            <div className="abilityurlholder">
                                <img className="abilityicon" alt={Name} src={`https://dissidiacompendium.com/images/static/${IconURL}.png`} />
                                <div className={
                                    typeof use_num.full == "string" ? "abilityblspeed" :
                                        character_ability.FR == true && use_num.full != 0 ? "saholderg" :
                                            character_ability.CallLD == true && use_num.full != 0 ? "saholderg" :
                                                character_ability.BT == true && use_num.full != 0 ? "saholderg" :
                                                    "saholder"
                                }>
                                    {use_num.full < 100 ?
                                        <div className={`sanumber ${character_ability.Free_Ability == true ? "upstat" : ""}`}>{(use_num.full || "∞")}</div>
                                        :
                                        (use_num.full || "∞")
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`bluebanner infonameholder nobuffpadding `}>
                    <div className="displayfex">
                        <div className="splitrow">
                            <div className={`infotitle abilitydisplayfex `}>
                                {Name && ReplacerCharacter(Format_Cleaner(Name),from)}{` - #${character_ability.LearningAbility}`}
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
                            <span onClick={() => window.scrollTo(0, 0)} className={`clicky`}>{ReplacerCharacter(character_ability.command && character_ability.command.rank && `<${ability_rank_trans(character_ability.command.rank)}>`)}</span>
                            </Tippy>
                            {character_ability.voice_index != undefined ?
                                    <Tippy content="Play voice line" className="tooltip" >
                                        <span>{" "}<MdRecordVoiceOver onClick={playvoice} className='soundicon click' style={{color:`${playingaudio == true ? "yellow":""}`}}/></span>
                                    </Tippy>
                                :""}
                        </div>
                        {use_num.base != 0 ?
                            <div className="usesmaker">
                                <div className="sidewaystextholder">
                                    <div className="sidewaystext unique">
                                        {typeof use_num.base == "string" ?
                                            "Speed" :
                                            "Uses"}
                                    </div>
                                </div>
                                {typeof use_num.base == "string" ?
                                    <div className={"abilityusesholder2"}>
                                        {ReplacerCharacter(`<${character_ability.command && character_ability.command.rank && ability_rank_trans(character_ability.command.rank)}>`)}
                                        {use_num.base || "∞"}
                                        {character_ability.increase.map((self, i) => (
                                                self.recast != undefined ?
                                                    <div key={i} style={{ whiteSpace: "nowrap" }}>
                                                        {ReplacerCharacter(`<${self.loc_tag}> +${self.recast}%`)}
                                                    </div>
                                                    : self.use == 0 ? "" :
                                                        <div key={i} style={{ whiteSpace: "nowrap" }}>
                                                            {ReplacerCharacter(`<${self.loc_tag}> +${self.use}`)}
                                                        </div>
                                        ))}
                                        {character_ability.increase != undefined ? <div className=''>{typeof use_num.base == "string" ? `(${use_num.full})` : `Total: ${use_num.full}`}</div>: ""}
                                    </div>
                                    :
                                    <div className={"abilityusesholder"}>
                                        {ReplacerCharacter(`<${character_ability.command && character_ability.command.rank && ability_rank_trans(character_ability.command.rank)}>`)}
                                        {use_num.base || "∞"}
                                        {character_ability.increase != undefined && use_num.base != 0 ?
                                            character_ability.increase.map((self, i) => (
                                                self.recast != undefined ?
                                                    <div key={i} style={{ whiteSpace: "nowrap" }}>
                                                        {ReplacerCharacter(`<${self.loc_tag}> +${self.recast}%`)}
                                                    </div>
                                                    : self.use == 0 ? "" :
                                                        <div key={i} style={{ whiteSpace: "nowrap" }}>
                                                            {ReplacerCharacter(`<${self.loc_tag}> +${self.use}`)}
                                                        </div>
                                            ))
                                        : ""}
                                        {character_ability.increase != undefined ? <div className=''>{typeof use_num.base == "string" ? `(${use_num.full})` : `Total: ${use_num.full}`}</div>: ""}
                                    </div>}
                            </div>
                            : ""}
                    </div>
                    {info != undefined ?
                        <div className='buffglreworkbanner passiveinfobase'>{info}</div>
                    :""}
                </div>
                <div className={`bluebase abilityinfobase`}>

                    {ReplacerCharacter(commandcompare,froma)}

                    {character_ability.command != undefined && character_ability.command.desc != undefined ?
                        desc == false ?
                            <div className="clicky updatelink contents" onClick={() => showmedesc(desc)}>
                                - Show Desc -
                            </div>
                            :
                            <div className="clicky updatelink contents" onClick={() => showmedesc(desc)}>
                                - Hide Desc -
                            </div>
                        : ""}
                    {desc == false && character_ability.command != undefined && character_ability.command.desc != undefined ? "" :
                        <div>
                            {desc == true ?
                                <hr />
                                : ""}
                            {trans != undefined && showtrans == true ?
                                ReplacerCharacter(trans+"\n",froma)
                            :
                            ver_old == ver_new ?
                                ReplacerCharacter(makediff(Format_Cleaner(command_old.command.desc), Format_Cleaner(character_ability.command.desc)),froma)
                                :
                                ReplacerCharacter(Format_Cleaner(character_ability.command.desc),froma)
                            }
                        </div>
                    }
                    {ver_new == "JP" && desc == true && ver_old != ver_new ?
                        <div className="clicky updatelink contents" onClick={() => doTrans()} >Translate (Beta)</div>
                        : ""}
                    {showraw == true ?
                        <span className='react-json-view'>
                            <ObjectView 
                            data={character_ability} 
                            options={
                                {
                                hideDataTypes: true,
                                expandLevel: 1
                                }
                            }
                            />
                        </span>
                        : ""}

                    {character_ability.options != undefined ?
                        <div className='p_grade'>
                            <div className='fieldbar'>
                                <div className={character_ability.options.length <= 5 ? "" : 'updatelink clicky'} onClick={doshow_upgrades}>
                                    {character_ability.options.length <= 5 ? "Conditions:" : show_upgrades ? "Hide All Conditions" : "Show All Conditions"}
                                </div>
                            </div>
                            {show_upgrades == true ?
                            ReplacerCharacter(optioncompare,froma)
                            :""}
                        </div>
                        : ""}

                </div>

                {character_ability.command && character_ability.command.casts && character_ability.command.casts != undefined ?
                    <div className={`bufflistbanner noselect newblue`}>
                        {character_ability.command && character_ability.command.casts && character_ability.command.casts != undefined ?
                            <>
                                <div className="unique ailmenttext">Buffs / Debuffs:</div>
                                <ul className="abilitybufflist">
                                    {character_ability.command.casts && character_ability.command.casts.map(buffs => (
                                        <li className={`abilitybufficonsholder ${selectedbuff.unq_id == buffs.unq_id ? "buffactive" : ""}`} key={buffs.unq_id}>
                                            <div className="biconspacer" onClick={() => buffselect(buffs)} >
                                                <Tippy content={
                                                    ReplacerCharacter(buffs.name && buffs.name,from)
                                                }>
                                                    <img alt={buffs.name} className={`clicky abilitybufficon `} src={`https://dissidiacompendium.com/images/static/icons/buff/${ailment_level_icon(buffs,buffs.aarg1)}.png`} />
                                                </Tippy>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </>
                            : ""}

                    </div>
                    : ""}
                {selectedbuff.length != 0 && selectedbuff.is_passive != true && selectedbuff.is_state != true ?

                    selectedbuff_old.length == 0 ?
                        <AilmentDataFormatting
                            file={"character_ability"}
                            loc={undefined}
                            ver={ver_new}
                            ailment_data={selectedbuff.default == true ? selectedbuff.cast : selectedbuff}
                            master_index={master_index}
                            slider={false}
                            rank={selectedbuff.default == true ? selectedbuff.rank_id : selectedbuff.arank}
                            arg1={selectedbuff.default == true ? selectedbuff.arg1 : selectedbuff.aarg1}
                            arg2={selectedbuff.default == true ? selectedbuff.arg2 : selectedbuff.aarg2}
                            castlocation={true}
                            alt_rank={selectedbuff.aranka}
                            alt_aug1={selectedbuff.aarg1a}
                            alt_aug2={selectedbuff.aarg2a}
                            formatting={true}
                            turns={selectedbuff.default == true ? selectedbuff.turn : selectedbuff.alife}
                            info={displayinfo}
                            cur_char={selectedbuff.charaID}
                            character_face={false}
                            hide_title={true}
                            passed_passive={selectedbuff.passive}
                            showvalues={showvalues}
                            debugging={debugging}
                        />
                        :
                        <AilmentDifFormatting
                            buff_new={selectedbuff}
                            ver_new={ver_new}
                            buff_old={selectedbuff_old}
                            ver_old={ver_old}
                            master_index={master_index}
                            info={displayinfo}
                            castlocation={true}
                            character_face={false}
                            frameless={false}
                            hide_title={true}
                        />
                        
                : ""}
            </div>
            </LazyLoadComponent>
        </div>
    )
}

export default trackWindowScroll(AbilityDifFormatting)