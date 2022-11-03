import React, {useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { setFalse, setTrue } from '../redux/ducks/jptoggle'
import '../Passives.css';
import { Link } from 'react-router-dom'
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import BuffsforPassives from './BuffsforPassives.js'
import { getQuery, getQueryStringVal, useQueryParam } from '../processing/urlparams'
const Diff = require('diff');
import addformatting from '../processing/replacer_abilitycontent';
import {EndsInTimer, StartsInTimer} from '../formatting/Timers'
import TickUp from '../processing/tickUp'

const ReworkPassiveFormatting = ({match, ProcessedBuffs, jptoggledata}) => {

    const dispatch = useDispatch();

    const [showGLToggle, setShowGLToggle] = useState(false);
    const [JPDesc, setJPDesc] = useState("");

    useEffect(() => {
        if(match.PassiveGLFlag == true){
            setShowGLToggle(jptoggledata)
            const JPDESCREPLACE = Diff.diffTrimmedLines(match.PassiveDescGL + "\n", match.PassiveDesc + "\n", {newlineIsToken: false})
            setJPDesc(JPDESCREPLACE.map(text => `${text.added == true ? '~~' + text.value + '~.~': ""}${text.removed == true ? '^^' + text.value  + '^.^': ""}${text.removed == undefined && text.added == undefined ? text.value :""}`).join(""))
        } else {
            setShowGLToggle(false)
            setJPDesc(match.PassiveDesc)
        }
    }, [jptoggledata,match])

    const urlmaker = (PassiveLoc) =>{
        if(PassiveLoc == "artpass"){
            return "artifacts"
        }
        else 
        return PassiveLoc
    }
    const [JPsearch, setJPSearch] = useQueryParam("JP", "");

    useEffect(() => {
        if(getQueryStringVal("JP") == "true" ){
          dispatch(setTrue())
        } else {
          dispatch(setFalse())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[setJPSearch])

    const ct = new Date().getTime();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    const monthstext = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function ordinal(n) {
      var s = ["", "", "", ""];
      var v = n%100;
      return n + (s[(v-20)%10] || s[v] || s[0]);
    }

    const handledate = (date) =>{
      return <div className="tickholder greencolor">
                <div className="glshadow"><span className='emoji'>🌎</span></div>
                <div className="spacerleft">
                    <TickUp value={monthstext[new Date(date).getMonth()]}/>
                </div>

                <div className="spacerleft">
                    <TickUp value={new Date(date).getFullYear()}/>
                </div>
            </div>
    }


    const makediff = (oldText,newText) =>{
        const JPDESCREPLACE = Diff.diffTrimmedLines(oldText + "\n", newText + "\n", {newlineIsToken: false})
        const output = JPDESCREPLACE.map(text => `${text.added == true ? '~~' + text.value + '~.~': ""}${text.removed == true ? '^^' + text.value  + '^.^': ""}${text.removed == undefined && text.added == undefined ? text.value :""}`).join("")
        return (
            output
        )
    }

    const make_face = ()=>{
        return(
            <div className="infotitleholder">
                <div className="faceandiconholder">
                    <Link to={`/characters/${match.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"").toLowerCase()}/passives`}>
                    <div className="faceholderpassives">
                        <LazyLoadImage effect="opacity" alt={match.CharacterName} className="faceicon" src={`https://dissidiacompendium.com/images/static/characters/${match.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"")}/face.png`}/>
                        <div className="facetext">
                            {match.CharacterName == "Cloud of Darkness" ? "CoD" : match.CharacterName == "Warrior of Light" ? "WoL" : match.CharacterName}
                        </div>
                    </div>
                    </Link>
                        {match.AbilityURL != undefined ?
                        <div className="abilityiconholder">
                            <Link to={`/characters/${match.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"").toLowerCase()}/abilities`}>
                                <LazyLoadImage effect="opacity" className="abilityicon" alt={match.PassiveName} src={match.AbilityURL}/>
                            </Link>
                            <div className="saholder">
                            <div className="sanumber">{match.PassiveCost}</div>
                            </div>
                        </div> : ""}
                </div>
            </div>
        )
    }

    const make_title=(pass_banner)=>{
        return(
            <div className={`${match.PassiveType + "banner"} iconbuffer infonameholder nobuffpadding `}>
                <div className="displayfex">
                {match.AbilityURL == undefined ? 
                <div className="spacearound">
                <span className="smallpassive automarg" />&nbsp;
                </div>
                : ``}
                <div className={`infotitle displayfex ${match.PassiveType == "ArtRed" ? "orangetext" : ""} ${match.AbilityURL != undefined ? "unique" : ""}`}>
                    <Link className={`${match.PassiveType != "ArtRed" ? "linktopage" : ""}`} to={`/characters/${match.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"").toLowerCase()}/passives/${urlmaker(match.PassiveLoc)}`}>
                        {showGLToggle == false && match.PassiveGLFlag == true ? 
                            match.PassiveNameGL == undefined ? "" : addformatting(match.PassiveNameGL)
                            :
                            match.PassiveName == undefined ? "" : addformatting(match.PassiveName)}
                    </Link>
                </div>
                </div>
                {match.JPName && 
                <div className={`${match.PassiveType == "ArtRed" ? "orangetext size12" : "abilityJPname"}`}>
                    {match.JPName.replace(/#lvd/gm, " Lv9")}
                </div>
                } 
                <span className={match.PassiveRank == 327 ? "board4ext " :  match.PassiveRank == 326 ? "board4c " : match.PassiveRank == 325 ? "board4cext " : match.PassiveLoc + " "}/>
                {match.PassiveCost == 0 ? "" :
                match.PassiveCost == undefined ? "" :
                <div className="CPReqHolder">
                    <span className="unique">{match.AbilityURL != undefined ? "Uses: " : `Req. `}</span>
                    {match.AbilityURL == undefined ?
                    <span className="CPIcon CPIconSmaller"/>
                    : ""}
                    <span className={match.AbilityURL != undefined ? "" : ``}>
                    {" " + match.PassiveCost}
                    </span>
                </div>}
                {match.ReleaseDate == undefined && match.LDBoardRelease == undefined && match.EightyRelease == undefined && match.Rework == undefined && match.NintyRelease == undefined && match.Board5Release == undefined ? "" :
                <div className="similarbanner">
                    {match.Rework == undefined ? "" :
                        pass_banner.tempdate == true ?
                    <div>
                        <Link className="linktopage" to={`/events/banners/${pass_banner.bannerindex}`}>
                            {pass_banner.name}<br/>
                    </Link>
                        {handledate(pass_banner.indate)}
                    </div>
                    :
                    <div> 
                        <Link className="linktopage" to={`/events/banners/${pass_banner.bannerindex}`}>
                            {pass_banner.name}<br/>
                    </Link>
                        <StartsInTimer expiryTimestamp={new Date(pass_banner.indate)}/>
                        </div>
                    }
                </div>
                }
            </div>
        )
    }

    return(
        <div key={match.PassiveKey + "unit"} >
            {// 2 overflows
            }
            {match.ReworkPassive1 != undefined && match.ReworkPassive2 != undefined ?
            <div>
            <div className="abilitygreysinglebutton margtop"><span className={`${match.PassiveLoc} undertaga`}></span> Passives</div>
            <div className="buffunit">
            <div className="infoholder" style={{ minHeight: "160px"}}>
                <LazyLoadComponent>
                {make_face()}
                {make_title(match.ReworkBannerID1)}
                <div className={`${match.PassiveType + "base"}  infobase nobuffpadding ${match.AbilityURL != undefined ? "abilitybase" : ""}`}>
                    {match.PassiveDescGL == undefined ? "" : addformatting(makediff(match.PassiveDescGL,match.ReworkPassive1))} 
                </div>
                <BuffsforPassives match={match} ProcessedBuffs={ProcessedBuffs} jptoggledata={jptoggledata}/>
                </LazyLoadComponent>
            </div>
        </div>
            <div className="buffunit">
            <div className="infoholder" style={{ minHeight: "160px"}}>
                <LazyLoadComponent>
                {make_face()}
                {make_title(match.ReworkBannerID2)}
                <div className={`${match.PassiveType + "base"}  infobase nobuffpadding ${match.AbilityURL != undefined ? "abilitybase" : ""}`}>
                    {match.PassiveDescGL == undefined ? "" : addformatting(makediff(match.ReworkPassive1,match.ReworkPassive2))}
                </div>
                <BuffsforPassives match={match} ProcessedBuffs={ProcessedBuffs} jptoggledata={jptoggledata}/>
                </LazyLoadComponent>
            </div>
        </div>
        <div className="buffunit">
            <div className="infoholder"  style={{ minHeight: "160px"}}>
                <LazyLoadComponent>
                {make_face()}
                {make_title(match.bannerindex)}
                <div className={`${match.PassiveType + "base"}  infobase nobuffpadding ${match.AbilityURL != undefined ? "abilitybase" : ""}`}>
                    {match.PassiveDescGL == undefined ? "" : addformatting(makediff(match.ReworkPassive2,match.PassiveDesc))}
                </div>
                <BuffsforPassives match={match} ProcessedBuffs={ProcessedBuffs} jptoggledata={jptoggledata}/>
                </LazyLoadComponent>
            </div>
        </div>
    </div>
        : ""}
            {//1 overflow
            }
            {match.ReworkPassive1 != undefined && match.ReworkPassive2 == undefined ?
            <div>
                <div className="abilitygreysinglebutton margtop"><span className={`${match.PassiveLoc} undertaga`}></span> Passives</div>
                <div className="buffunit">
                <div className="infoholder"  style={{ minHeight: "160px"}}>
                <LazyLoadComponent>
                {make_face()}
                {make_title(match.ReworkBannerID1)}
                <div className={`${match.PassiveType + "base"}  infobase nobuffpadding ${match.AbilityURL != undefined ? "abilitybase" : ""}`}>
                    {match.PassiveDescGL == undefined ? "" : addformatting(makediff(match.PassiveDescGL,match.ReworkPassive1))}
                </div>
                <BuffsforPassives match={match} ProcessedBuffs={ProcessedBuffs} jptoggledata={jptoggledata}/>
                </LazyLoadComponent>
            </div>
        </div>
        <div className="buffunit">
            <div className="infoholder" style={{ minHeight: "160px"}}>
                <LazyLoadComponent>
                {make_face()}
                {make_title(match.bannerindex)}
                <div className={`${match.PassiveType + "base"}  infobase nobuffpadding ${match.AbilityURL != undefined ? "abilitybase" : ""}`}>
                    {match.PassiveDescGL == undefined ? "" : addformatting(makediff(match.ReworkPassive1,match.PassiveDesc))}
                </div>
                <BuffsforPassives match={match} ProcessedBuffs={ProcessedBuffs} jptoggledata={jptoggledata}/>
                </LazyLoadComponent>
            </div>
        </div>
        </div>
        : ""}
        {//no overflow
        }
        {match.ReworkPassive1 == undefined && match.ReworkPassive2== undefined ?
        <div>
        <div className="abilitygreysinglebutton margtop"><span className={`${match.PassiveLoc} undertaga`}></span> Passives</div>
        <div className="buffunit">
            <div className="infoholder" style={{ minHeight: "160px"}}>
                <LazyLoadComponent>
                {make_face()}
                {make_title(match.bannerindex)}
                <div className={`${match.PassiveType + "base"}  infobase nobuffpadding ${match.AbilityURL != undefined ? "abilitybase" : ""}`}>
                    {match.PassiveDescGL == undefined ? "" : addformatting(makediff(match.PassiveDescGL,match.PassiveDesc))}
                </div>
                <BuffsforPassives match={match} ProcessedBuffs={ProcessedBuffs} jptoggledata={jptoggledata}/>
                </LazyLoadComponent>
            </div>
        </div>
        </div>
        : ""}
        </div>
    )
}

export default ReworkPassiveFormatting;