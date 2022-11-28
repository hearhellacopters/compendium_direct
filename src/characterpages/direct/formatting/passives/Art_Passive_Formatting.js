import React, {useState, useEffect} from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import Format_Cleaner from '../../../../processing/Format_Cleaner'
import translater from '../../../../processing/translater_characters'
import DefaultTippy from '../../../../formatting/TippyDefaults';
import { useDispatch, useSelector } from "react-redux";
import { getTransNames } from '../../../../redux/ducks/transnames';
import Char_Face_Maker from '../Char_Face_Maker'
import Ailment_Default_Passoff from "../Ailment_Default_Passoff";
import Ailment_Data_Formatting from '../Ailment_Data_Formating';
import Art_Passive_Effects_Handoff from "./Art_Passive_Effects_Handoff";
import replacer_titles from '../../../../processing/replacer_titles'
import replacer_buff from '../../../../processing/replacer_buffcontent'
import ReactJson from '@microlink/react-json-view'
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';

const Art_Passive_Formatting = ({
    art_passive,
    loc,
    ver,
    file,
    Single,
    
    formatting,

    banner_color,
    base_color,
    span,

    link,
    master_index
}) =>{

    const char_id = master_index.charid

    const dispatch = useDispatch();

    const transnames = useSelector((state) => 
    state.transnames.transnames
    );

    const [trans, settrans] = useStateIfMounted()
    const [showtrans, setshowtrans] = useStateIfMounted(false)
    const [selectedbuff, setselectedbuff] = useState([]);

    const [showraw,setshowraw] = useStateIfMounted(false)

    const showmeraw = (e)=>{
        if(e.shiftKey){
            if(showraw == false){
            setshowraw(true)
            } else{
                setshowraw(false)
            }
        }
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
    const text = Format_Cleaner(art_passive.desc).replace(/\\n/gm,"\x0A")
    if(transnames != undefined && showtrans == true){
        const translate = translater(text,transnames)
        settrans(translate)
    }
    }, [settrans,transnames,showtrans,art_passive.desc]);

 async function doTrans(text){
        setshowtrans((prevValue) => !prevValue)
    }

    const listByChar = {}
    if(art_passive.defaults != undefined){
    //make list by char
            Object.assign(listByChar,{[art_passive.chara_id]:{list: art_passive.defaults, char_id: art_passive.chara_id, name: char_id[art_passive.CharID].name, jpname: char_id[art_passive.chara_id].jpname}})
    }

    const bufflist = []
    if(art_passive.casts != undefined){
        const castholder = {}
        art_passive.casts && art_passive.casts.map(second=>{
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

    const textreplace = (text)=>{
        const replacement = text
        .replace(/BRVスピードアップ/gm,"BRV Initiative")
        .replace(/HPダメージガードアップ/gm,"HP Damage Guard")
        .replace(/デバフアタックアップ/gm,"Debuff Attack Up")
        .replace(/ブレイクブーストアップ/gm,"Break Boost Up")
        .replace(/BRVアタックアップ/gm,"BRV Attack Up")
        .replace(/ブレイクスピードアップ/gm,"Break Speed Up")
        .replace(/BRVガードアップ/gm,"BRV Guard Up")
        .replace(/デンジャーガードアップ/gm,"Low HP Guard Up")
        .replace(/バックアタック/gm,"Back Attack")
        .replace(/バフアタックアップ/gm,"Buff Attack Up")
        .replace(/デバフガードアップ/,"Debuff Guard Up")
        .replace(/HPダメージBRVゲイン/,"HP Damage BRV Gain")
        .replace(/バフガードアップ/,"Buff Guard Up")
        .replace(/バフスピードアップ/,"Buff Speed Up")
        .replace(/デバフスピードアップ/,"Debuff Initiative")
        .replace(/デバフブーストアップ/gm,"Debuff Boost Up")
        .replace(/バフブーストアップ/gm,"Buff Boost Up")
        return(
            replacement
        )
    }

    const revtextreplace = (text)=>{
        const replacement = text
        .replace(/BRV Initiative/gm,"BRVスピードアップ")
        .replace(/HP Damage Guard/gm,"HPダメージガードアップ")
        .replace(/Debuff Attack Up/gm,"デバフアタックアップ")
        .replace(/Break Boost Up/gm,"ブレイクブーストアップ")
        .replace(/BRV Attack Up/gm,"BRVアタックアップ")
        .replace(/Break Speed Up/gm,"ブレイクスピードアップ")
        .replace(/BRV Guard Up/gm,"BRVガードアップ")
        .replace(/Low HP Guard Up/gm,"デンジャーガードアップ")
        .replace(/Back Attack/gm,"バックアタック")
        .replace(/Buff Attack Up/gm,"バフアタックアップ")
        .replace(/Debuff Guard Up/,"デバフガードアップ")
        .replace(/HP Damage BRV Gain/,"HPダメージBRVゲイン")
        .replace(/Buff Guard Up/,"バフガードアップ")
        .replace(/Buff Speed Up/,"バフスピードアップ")
        .replace(/Debuff Initiative/,"デバフスピードアップ")
        .replace(/Debuff Boost Up/gm,"デバフブーストアップ")
        .replace(/Buff Boost Up/gm,"バフブーストアップ")
        return(
            replacement
        )
    }

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

    const minH = window.innerWidth <= 800 ? 210 : 150;

    return (
        <div className="buffunit">
        <div className="infoholder" style={{ minHeight: `${minH}px`}}>
            <LazyLoadComponent>
            {art_passive.chara_id != undefined ? 
            <div className="infotitleholder">
                <div className="faceandiconholder" >
                    <Char_Face_Maker char_id={char_id} id={art_passive.chara_id} loc={loc} link={link}/>
                </div>
            </div>
            :""}
            <div className={`${art_passive.chara_id != undefined ? "iconbuffer infonameholder nobuffpadding " : "infonameholderenemybuff "}${banner_color == undefined ? "Buffbanner" : banner_color}`} onClick={showmeraw}>
                {ver == "JP"?
                <div>
                    <div className={`combotext infotitle ${art_passive.rank == 5 ? "orangetext" : ""}`}>
                    <span className={"artpass"}></span>{"\xa0"}
                    {art_passive.glname != "" ?
                        `${art_passive.glname} - #${art_passive.spe_id}` :
                        `${textreplace(Format_Cleaner(art_passive.name))} - #${art_passive.spe_id}`}
                    </div>
                    <div className={`${art_passive.rank == 5 ? "orangetext size12" : "abilityJPname"}`}>
                        {art_passive.name != undefined && art_passive.name != ""?
                        `${Format_Cleaner(art_passive.name)} - #${art_passive.spe_id}` :
                        `Unknown - #${art_passive.spe_id}`}
                    </div>
                </div>
                :
                <div>

                    <div className={`combotext infotitle ${art_passive.rank == 5 ? "orangetext" : ""}`}>
                    <span className={"artpass"}></span>{"\xa0"}
                    {art_passive.name != undefined ?
                    `${Format_Cleaner(art_passive.name).replace(/(.*?)(<)(.*?)(>)(.*?)/gm, '$1&lt;$3&gt;$5')} - #${art_passive.spe_id}`
                        :
                        `Unknown - #${art_passive.spe_id}`}
                    </div>
                    <div className={`${art_passive.rank == 5 ? "orangetext size12" : "abilityJPname"}`}>
                        {art_passive.jpname != undefined && art_passive.jpname != ""?
                        `${Format_Cleaner(art_passive.jpname).replace(/(.*?)(<)(.*?)(>)(.*?)/gm, '$1&lt;$3&gt;$5')} - #${art_passive.spe_id}` :
                        `${revtextreplace(Format_Cleaner(art_passive.name))} - #${art_passive.spe_id}`}
                    </div>
                </div>
                }
            </div>
            <div className={`${art_passive.chara_id != undefined ? "infobase nobuffpadding ": "infobase "}${base_color == undefined ? "Buffbase" : base_color}`}>
                {trans != undefined && showtrans == true ?
                trans.split(/\n/gm).map((value, i)=>
                    <div key={i}>
                    {value}
                    <br></br>
                    </div>
                )
                :
                Format_Cleaner(art_passive.desc).split(/\\n/gm).map((value, i)=>
                    <div key={i}>
                    {add_formatting(value,"bu")}<br></br>
                    </div>
                )
                }
                {ver == "JP" ?
                <div className="clicky updatelink" onClick={()=>doTrans()} >Translate (Beta)</div>
                :""}
                <div className="newbluepassive infonameholderenemybuff default_passive">
                    <Art_Passive_Effects_Handoff
                    passive_ability={art_passive}

                    master_index={master_index}
                    ver={ver}
                    file={file}

                    formatting={formatting}
                    />
                </div>
                {art_passive.defaults != undefined ?
            Object.values(listByChar).map(buffs => (
                <Ailment_Default_Passoff
                file={"passive_ability"}
                key={buffs.char_id}
                ver={ver}
                ailment_default={buffs}

                master_index={master_index}

                loc={loc}
                slider={false}
                formatting={formatting}
                base_color={"classcolor"}
                span={span}
                />
                ))
                :""}
                {bufflist.length != 0 ?
                <div className={art_passive.chara_id !=  undefined ? file == "exskill" ? "infonameholderenemybuff newblue default_passive" : "defaultlistholder newblue default_passive" : "infonameholderenemybuff newblue default_passive"}>
                    <div className="unique ailmenttext">
                    Buffs / Debuffs:
                    </div>
                    {bufflist.length != 0 ?
                    <ul className={"abilitybufflist"}>
                        {bufflist.map(buff =>(
                           <li className={`abilitybufficonsholder ${selectedbuff.id == buff.id ? "buffactive" : ""}`} key={buff.id}>
                               <div className="biconspacer" onClick={() => buffselect(buff)} >
                                    <DefaultTippy content={
                                        buff.name === "" ? `Unknown ${buff.id}` : buff.name
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
                file={"exskill"}
                loc={loc}
                ver={ver}
                ailment_data={selectedbuff}

                master_index={master_index}

                slider={false}
                rank={selectedbuff.rank_id}
                arg1={selectedbuff.arg1}
                arg2={selectedbuff.arg2}
                castlocation={true}
                fullspan={art_passive.chara_id == undefined|| file == "exskill" ?  true : false}
                formatting={formatting}
                turns={selectedbuff.turn}
                />
                :""}
                 {showraw == true?
                <ReactJson iconStyle={"square"} quotesOnKeys={false} name={"Raw"} displayDataTypes={false} collapsed={false} theme={"threezerotwofour"} src={art_passive}/>
                :""}
            </div>
            </LazyLoadComponent>
        </div>
        </div>
    )
}
export default Art_Passive_Formatting