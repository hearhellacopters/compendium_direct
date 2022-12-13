import React, {useState, useEffect} from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import { useDispatch, useSelector } from "react-redux";
import translater from '../../../../processing/translater_characters'
import { getTransNames } from '../../../../redux/ducks/transnames';
import Command_Dif from './Command_Dif';
import Options_Dif from './Options_Dif';
import addformatting from '../../../../processing/replacer_abilitycontent';
import Char_Face_Maker from '../Char_Face_Maker'
import Ability_Icon_Maker from './Ability_Icon_Maker'
import ReactJson from '@microlink/react-json-view'
import Tippy from '../../../../formatting/TippyDefaults'
import Format_Cleaner from '../../../../processing/Format_Cleaner'
import replacer_titles from '../../../../processing/replacer_titles'
import rank_trans from './rank_trans'
import Ailment_Data_Formatting from '../Ailment_Data_Formating'
import Ailment_Character_Dif from '../Ailment_Character_Dif';
const Diff = require('diff');

const Character_Ability_Dif = ({
    command_old,
    ver_old,
    command_new,
    ver_new,
    master_index
}) =>{

    const CommandNames = master_index.commands
    const char_id = master_index.charid

    const [trans, settrans] = useStateIfMounted()
    const [showtrans, setshowtrans] = useStateIfMounted(false)

    const dispatch = useDispatch();

    const transnames = useSelector((state) => 
    state.transnames.transnames
    );

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
        let mounted = true
        if (mounted && transnames == undefined && showtrans== true) {
        dispatch(getTransNames());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch,transnames,showtrans]);


    useEffect(() => {
        const text = Format_Cleaner(command_new.command && command_new.command.desc).replace(/\\n/gm,"\x0A")
        if(transnames != undefined && showtrans == true){
            const translate = translater(text,transnames)
            settrans(translate)
        }
    }, [settrans,transnames,showtrans,command_new]);

    const [showraw,setshowraw] = useStateIfMounted(false)
    const [desc,setdesc] = useStateIfMounted(false)
    const [error, seterror] = useStateIfMounted()

    const showmeraw = (e)=>{
        if(e.shiftKey){
            if(showraw == false){
                setshowraw(true)
            } else{
                setshowraw(false)
            }
        }
    }

    const showmedesc = (current)=>{
        if(current == false){
            setdesc(true)
        } else{
            setdesc(false)
        }
    }

    const makediff = (oldText,newText) =>{
        const JPDESCREPLACE = Diff.diffTrimmedLines(oldText + "\n", newText + "\n", {newlineIsToken: false})
        const output = JPDESCREPLACE.map(text => `${text.added == true ? '~~' + text.value + '~.~': ""}${text.removed == true ? '^^' + text.value  + '^.^': ""}${text.removed == undefined && text.added == undefined ? text.value :""}`).join("")
        return (
            output
        )
    }

    const [use_num, setuse_num] = useStateIfMounted()

    useEffect(()=>{
        if(command_new.Trap == true ||
            command_new.FollowUp == true ||
            command_new.Counter == true ||
            command_new.BRV == true ||
            command_new.HP == true
            ){
                setuse_num(0)
        } else {
            if(command_new.increase != undefined ){
                var new_value = command_new.UseNum
                var new_recast = 0
                command_new.increase.forEach(self=>{
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
                if(command_new && command_new.BT == true && command_new && command_new.UseNum == 0 && command_new && command_new.disp_flag_ == 1){
                    setuse_num(1)
                } else {
                    setuse_num(command_new.UseNum)
                }  
            }
        }
        // eslint-disable-next-line
    },[])

    if(command_new.command != undefined){
        var red = command_new.LD == true ? 1:
        command_new.EX == true ? 1 :
        command_new.CallLD == true ? 1 :
        command_new.disp_flag_
        var IconURL = Ability_Icon_Maker(
            command_new.command.type_,
            command_new.command.att,
            command_new.command.rank,
            red, //red_flag
            command_new.charaID, //char id
            
            master_index,
            ver_new,

            use_num,
            command_new.Counter,
            command_new.Trap,
            command_new.FollowUp
        )
    } else {
        IconURL = `icons/buttons/ability/Ability_Unknown_${red == 1 ? "Red" :"Blue"}`
    }
    
    var Name = ""
    var SubName = ""

    if(ver_new == "JP"){
        if(command_new.command && command_new.command.glname != undefined){
            Name = command_new.command.glname
        } else {
            var comdpull = CommandNames[command_new.LearningAbility] && CommandNames[command_new.LearningAbility].name
            if(comdpull != undefined){
                Name = comdpull
            } else {
                Name = `#${command_new.LearningAbility}`
            }
        }
    } else {
        if(command_new.command && command_new.command.name != undefined){
            Name = command_new.command.name
        } else {
            comdpull = CommandNames[command_new.LearningAbility] && CommandNames[command_new.LearningAbility].name
            if(comdpull != undefined){
                Name = comdpull
            } else {
                Name = `#${command_new.LearningAbility}`
            }
        }
    }

    if(ver_new == "JP"){
        if(command_new.command && command_new.command.name != undefined){
            SubName = command_new.command.name
        } else {
            comdpull = CommandNames[command_new.LearningAbility] && CommandNames[command_new.LearningAbility].name
            if(comdpull != undefined){
                SubName = comdpull
            } else {
                SubName = `#${command_new.LearningAbility}`
            }
        }
    } else {
        if(command_new.command && command_new.command.jpname != undefined){
            SubName = command_new.command.jpname
        } else {
            comdpull = CommandNames[command_new.LearningAbility] && CommandNames[command_new.LearningAbility].name
            if(comdpull != undefined){
                SubName = comdpull
            } else {
                SubName = `#${command_new.LearningAbility}`
            }
        }
    }

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

    const [commandcompare, setcommandcompare] = useState("");

    const [command_old_tex, setcommand_old_tex] = useState(
        Command_Dif(
        command_old,
        master_index,
        ver_old)
        );

    const [command_new_tex, setcommand_new_tex] = useState(
        Command_Dif(
        command_new,
        master_index,
        ver_new)
        );

    useEffect(()=>{
        if(command_old_tex != undefined && command_new_tex != undefined){
            setcommandcompare(makediff(command_old_tex.replace(/\s+$/g,""),command_new_tex.replace(/\s+$/g,"")))
        }
    },[command_old_tex,command_new_tex])

    const [selectedbuff, setselectedbuff] = useStateIfMounted([]);
    const [selectedbuff_old, setselectedbuff_old] = useStateIfMounted([]);

    const buffselect = (buffs) =>{
        if(selectedbuff.unq_id == buffs.unq_id){
            seterror()
            setselectedbuff([])
            setselectedbuff_old([])
        } else {
            if(command_old && command_old.command  && command_old.command.casts != undefined){
                const find_old = command_old.command.casts.filter(self=>self.id == buffs.id)
                if(find_old.length != 0){
                    seterror()
                    setselectedbuff_old(find_old[0])
                    setselectedbuff(buffs)
                } else {
                    seterror("New cast! (doesn't compare)")
                    setselectedbuff_old([])
                    setselectedbuff(buffs)
                }
            } else {
                seterror("New cast! (doesn't compare)")
                setselectedbuff_old([])
                setselectedbuff(buffs)
            }
        }
    }

    const [optioncompare, setoptioncompare] = useState("");

    useEffect(()=>{
        var options_old_tex = ""
        if(command_old.options != undefined){
            options_old_tex = Options_Dif(
                command_old,
                ver_old,
                master_index
            )
        }
        var options_new_tex = ""
        if(command_new.options != undefined){
            options_new_tex = Options_Dif(
                command_new,
                ver_new,
                master_index
            )
        }
        if(options_old_tex != "" && options_new_tex != ""){
            setoptioncompare(makediff(options_old_tex.replace(/\s+$/g,""),options_new_tex.replace(/\s+$/g,"")))
        }
    },[command_old,command_new,ver_new,ver_old,master_index])   

    const character_ability = command_new

    return(
        <div className="buffunit" loading="lazy">
            <div className="infoholder" style={{ minHeight: "220px"}}>
            <div className="infotitleholder">
                <div className="faceandiconholder">
                    <div className="idoffset" id={character_ability.LearningAbility}></div>
                    <Char_Face_Maker char_id={char_id} id={character_ability.charaID} loc={undefined}/>
                    <div className="abilityiconholder"  onClick={showmeraw}>
                    <div className="abilityurlholder">
                    <img className="abilityicon" alt={Name} src={`https://dissidiacompendium.com/images/static/${IconURL}.png`}/>
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
            <div className={`bluebanner infonameholder nobuffpadding `}>
                    <div className="displayfex">
                        <div className="splitrow">
                            <div className={`infotitle abilitydisplayfex `}>
                                {Name && replacer_titles(Format_Cleaner(Name))}{` - #${character_ability.LearningAbility}`}
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
                            <span onClick={()=>window.scrollTo(0, 0)} className={character_ability.command && character_ability.command.rank && `${rank_trans(character_ability.command.rank)} clicky`}></span>
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
                            
                            <div className={character_ability.UseNum<100?"abilityusesholder":"abilityusesholder2"}>
                            {character_ability.UseNum<100?
                            <span className={character_ability.command && character_ability.command.rank && rank_trans(character_ability.command.rank)}></span>
                            :""}
                            {usemaker(character_ability.UseNum)}
                            {character_ability.increase !=undefined && character_ability.UseNum != 0 ?
                            character_ability.increase.map((self,i)=>(
                                self.recast!=undefined?
                                <div key={i} style={{whiteSpace: "nowrap"}}>
                                <span className={self.loc_tag}></span>{`+${self.recast}%`}
                                </div>
                                :self.use == 0 ? "":
                                <div key={i} style={{whiteSpace: "nowrap"}}>
                                <span className={self.loc_tag}></span>{`+${self.use}`}
                                </div>
                            ))
                            :""}
                            </div>
                           
                            :
                            <div className={character_ability.UseNum<100?"abilityusesholder":"abilityusesholder2"}>
                            {character_ability.UseNum<100?
                            <span className={character_ability.command && character_ability.command.rank && rank_trans(character_ability.command.rank)}></span>
                            :""}
                            {usemaker(character_ability.UseNum)}
                            {character_ability.increase !=undefined && character_ability.UseNum != 0 ?
                            character_ability.increase.map((self,i)=>(
                                self.recast!=undefined?
                                <div key={i} style={{whiteSpace: "nowrap"}}>
                                <span className={self.loc_tag}></span>{`+${self.recast}%`}
                                </div>
                                :self.use == 0 ? "":
                                <div key={i} style={{whiteSpace: "nowrap"}}>
                                <span className={self.loc_tag}></span>{`+${self.use}`}
                                </div>
                            ))
                            :""}
                            </div>}
                        </div>
                        :""}
                    </div> 
            </div>
            <div className={`bluebase abilityinfobase`}>
                
                {addformatting(commandcompare)}
                
                {character_ability.command != undefined && character_ability.command.desc != undefined ? 
            desc == false ?
                <div className="clicky updatelink contents" onClick={()=>showmedesc(desc)}>
                    - Show Desc -
                </div>
           :
                <div className="clicky updatelink contents" onClick={()=>showmedesc(desc)}>
                    - Hide Desc -
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
                {addformatting(value,"tl")}<br></br>
                </div>
                ) :
            ver_old == ver_new ?
                addformatting(makediff(Format_Cleaner(command_old.command.desc),Format_Cleaner(character_ability.command.desc)))
                :
                addformatting(Format_Cleaner(character_ability.command.desc))
            }
            </div>
            }
             {ver_new == "JP" && desc == true && ver_old != ver_new ?
                <div className="clicky updatelink" onClick={()=>doTrans()} >Translate (Beta)</div>
                :""}
            {showraw == true?
                <ReactJson iconStyle={"square"} quotesOnKeys={false} name={"Raw"} displayDataTypes={false} collapsed={false} theme={"threezerotwofour"} src={character_ability}/>
                :""}

            {character_ability.options!=undefined?
            <div className='p_grade'>
                <div className='fieldbar'>
                <div >
                Conditions:
                </div>
                </div>
                {addformatting(optioncompare)}
                </div>
            :""}

            </div>
           
            {character_ability.command && character_ability.command.casts && character_ability.command.casts != undefined ? 
                <div className={`bufflistbanner noselect newblue`}>
                    {character_ability.command && character_ability.command.casts && character_ability.command.casts != undefined ?
                    <>
                    <div className="unique ailmenttext">Buffs / Debuffs:</div>
                    <ul className="abilitybufflist">  
                    {character_ability.command.casts && character_ability.command.casts.map(buffs =>(
                    <li className={`abilitybufficonsholder ${selectedbuff.unq_id == buffs.unq_id ? "buffactive" : ""}`} key={buffs.unq_id}>
                            <div className="biconspacer" onClick={() => buffselect(buffs)} >
                                <Tippy content={
                                    replacer_titles(buffs.name && buffs.name)
                                    }>
                                <img alt={buffs.name} className={`clicky abilitybufficon `} src={"https://dissidiacompendium.com/images/static/" +buffs.icon} />
                                </Tippy>
                            </div>
                        </li>
                    ))}
                </ul>
                </>
                :""}
                
                </div>
                :""}
                {error != undefined ?<div className='bufflistbanner noselect newblue unique'>{error}</div>:""}
                {selectedbuff.length != 0 && selectedbuff.is_passive != true && selectedbuff.is_state != true ?
                
                selectedbuff_old.length == 0 ?
                    <Ailment_Data_Formatting
                    file={"character_ability"}
                    loc={undefined}
                    ver={ver_new}
                    ailment_data={selectedbuff.default == true ? selectedbuff.cast :selectedbuff}
                    
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
                    char_id={char_id}
                    turns={selectedbuff.default == true ? selectedbuff.turn : selectedbuff.alife}
                    />
                :

                    <Ailment_Character_Dif
                    buff_new={selectedbuff}
                    ver_new={ver_new}
                    buff_old={selectedbuff_old}
                    ver_old={ver_old}                   
                    master_index={master_index}
                    />

                :""}
            </div>
        </div>
    )
}
export default Character_Ability_Dif