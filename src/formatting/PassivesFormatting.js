import React, {useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { setFalse, setTrue } from '../redux/ducks/jptoggle'
import DefaultTippy from './TippyDefaults.js';
import '../Passives.css';
import { Link } from 'react-router-dom'
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import BuffsforPassives from './BuffsforPassives.js'
import { getQuery, getQueryStringVal, useQueryParam } from '../processing/urlparams'
const Diff = require('diff');
import addformatting from '../processing/replacer_abilitycontent';
import TickUp from '../processing/tickUp'
import TickDown from '../processing/tickDown'
import {EndsInTimer, StartsInTimer} from '../formatting/Timers'

const PassiveFormatting = ({match, ProcessedBuffs, jptoggledata}) => {

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

    const urlmaker = (PassiveLoc, PassiveType) =>{
        if(PassiveLoc == "artpass"){
            return "artifacts"
        } else { 
            if(PassiveType == "boardfr"){
                return "boardfr"
            } else {
                return PassiveLoc
            }
            
        }
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

    const handletoggle = (showGLToggle) =>{
        if(showGLToggle == false){
            setJPSearch("true")
        } else {
            setJPSearch("")
        }
        setShowGLToggle((prevValue) => !prevValue)
    }

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
        return  <div className="tickholder greencolor">
                    <div className="glshadow"><span className='emoji'>🌎</span></div>
                    <div className="spacerleft">
                        <TickUp value={monthstext[new Date(date).getMonth()]}/>
                    </div>
  
                    <div className="spacerleft">
                        <TickUp value={new Date(date).getFullYear()}/>
                    </div>
                </div>
      }

    return(
        <div key={match.PassiveKey + "unit"} className="buffunit">
            <div className="infoholder" style={{ minHeight: "160px"}}>
                <LazyLoadComponent>
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
                            {match.PassiveGLFlag ? 
                                <div className="toggleforpassives" id="GLtoggle">
                                    <DefaultTippy content={showGLToggle ? "JP Current" : "GL Current"} className="tooltip" placement="bottom" hideOnClick={false}>
                                        <div className={showGLToggle ? "switch switchchecked": "switch switchunchecked"}  onClick={() => handletoggle(showGLToggle)}>
                                            <div className={showGLToggle ? "slider sliderchecked": "slider sliderunchecked" } >
                                            </div>
                                    </div>
                                    </DefaultTippy>
                                </div>
                            : 
                            ""
                            }
                            {match.AbilityURL != undefined ?
                            <div className="abilityiconholder">
                                <Link to={`/characters/${match.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"").toLowerCase()}/abilities`}>
                                    <LazyLoadImage effect="opacity" className="abilityicon" alt={match.PassiveName} src={match.AbilityURL}/>
                                </Link>
                                <div className={match.PassiveType == "board4" ? "saholderg" : "saholder"}>
                                <div className="sanumber">{match.PassiveCost}</div>
                                </div>
                            </div> : ""}
                    </div>
                </div>
                <div className={`${match.PassiveType + "banner"} iconbuffer infonameholder nobuffpadding `}>
                    <div className="displayfex">
                    {match.AbilityURL == undefined ? 
                    <div className="spacearound">
                    <span className="smallpassive automarg" />&nbsp;
                    </div>
                    : ``}
                    <div className={`infotitle displayfex ${match.PassiveType == "ArtRed" ? "orangetext" : ""} ${match.AbilityURL != undefined ? "unique" : ""}`}>
                        <Link className={`${match.PassiveType != "ArtRed" ? "linktopage" : ""}`} to={`/characters/${match.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"").toLowerCase()}/passives/${urlmaker(match.PassiveLoc, match.PassiveType)}`}>
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
                    {match.ReleaseDate == undefined && match.LDBoardRelease == undefined && match.EightyRelease == undefined && match.Rework == undefined && match.NintyRelease == undefined && match.FRBoardRelease == undefined && match.Board5Release == undefined ? "" :
                    <div className="similarbanner">
                         {match.Rework == undefined ? "" :
                        <Link className="updatelink" to={`/characters/${match.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"").toLowerCase()}/reworks`}>
                            View Upcoming Reworks
                        </Link>
                            }
                        {match.ReleaseDate == undefined ? "" :
                         match.ReleaseDateTemp == true ?
                         <div>
                            <Link className="linktopage" to={`/events/banners/${match.ReleaseDateIndex}`}>
                                {match.ReleaseDateName}
                            </Link><br/>
                            <span className="glupdategreen">{handledate(match.ReleaseDate)}</span>
                        </div>
                        :
                        <div>
                            <Link className="linktopage" to={`/events/banners/${match.ReleaseDateIndex}`}>
                                {match.ReleaseDateName}
                            </Link><br/>
                            <StartsInTimer expiryTimestamp={new Date(match.ReleaseDate)} JPFlag={false}/>
                        </div>
                        }
                        {match.Board5Release == undefined || match.ReleaseDate == match.Board5Release ? "" :
                         match.Board5ReleaseTemp == true ?
                         <div>
                            <Link className="linktopage" to={`/events/banners/${match.Board5ReleaseIndex}`}>
                                {match.Board5ReleaseName}
                            </Link><br/>
                            <span className="glupdategreen">{handledate(match.Board5Release)}</span>
                        </div>
                        :
                        <div>
                            <Link className="linktopage" to={`/events/banners/${match.Board5ReleaseIndex}`}>
                                {match.Board5ReleaseName}
                            </Link><br/>
                            <StartsInTimer expiryTimestamp={new Date(match.Board5Release)} JPFlag={false}/>
                        </div>
                        }
                        {match.FRBoardRelease == undefined || match.ReleaseDate == match.FRBoardRelease ? "" :
                         match.FRBoardReleaseTemp == true ?
                         <div>
                            <Link className="linktopage" to={`/events/banners/${match.FRBoardReleaseIndex}`}>
                                {match.FRBoardReleaseName}
                            </Link><br/>
                            <span className="glupdategreen">{handledate(match.FRBoardRelease)}</span>
                        </div>
                        :
                        <div>
                            <Link className="linktopage" to={`/events/banners/${match.FRBoardReleaseIndex}`}>
                                {match.FRBoardReleaseName}
                            </Link><br/>
                            <StartsInTimer expiryTimestamp={new Date(match.FRBoardRelease)} JPFlag={false}/>
                        </div>
                        }
                        {match.LDBoardRelease == undefined || match.ReleaseDate == match.LDBoardRelease ? "" :
                         match.LDBoardReleaseTemp == true ?
                         <div>
                            <Link className="linktopage" to={`/events/banners/${match.LDBoardReleaseIndex}`}>
                                {match.LDBoardReleaseName}
                            </Link><br/>
                            <span className="glupdategreen">{handledate(match.LDBoardRelease)}</span>
                        </div>
                        :
                        <div>
                            <Link className="linktopage" to={`/events/banners/${match.LDBoardReleaseIndex}`}>
                                {match.LDBoardReleaseName}
                            </Link><br/>
                            <StartsInTimer expiryTimestamp={new Date(match.LDBoardRelease)} JPFlag={false}/>
                        </div>
                        }
                        {match.EightyRelease == undefined || match.ReleaseDate == match.EightyRelease ? "" :
                         match.EightyReleaseTemp == true ?
                         <div>
                            <Link className="linktopage" to={`/events/banners/${match.EightyReleaseIndex}`}>
                                {match.EightyReleaseName}
                            </Link><br/>
                            <span className="glupdategreen">{handledate(match.EightyRelease)}</span>
                        </div>
                        :
                        <div>
                            <Link className="linktopage" to={`/events/banners/${match.EightyReleaseIndex}`}>
                                {match.EightyReleaseName}
                            </Link><br/>
                            <StartsInTimer expiryTimestamp={new Date(match.EightyRelease)} JPFlag={false}/>
                        </div>
                        }
                        {match.NintyRelease == undefined  || match.ReleaseDate == match.NintyRelease? "" :
                         match.NintyReleaseTemp == true ?
                         <div>
                            <Link className="linktopage" to={`/events/banners/${match.NintyReleaseIndex}`}>
                                {match.NintyReleaseName}
                            </Link><br/>
                            <span className="glupdategreen">{handledate(match.NintyRelease)}</span>
                        </div>
                        :
                        <div>
                            <Link className="linktopage" to={`/events/banners/${match.NintyReleaseIndex}`}>
                                {match.NintyReleaseName}
                            </Link><br/>
                            <StartsInTimer expiryTimestamp={new Date(match.NintyRelease)} JPFlag={false}/>
                        </div>
                        }
                    </div>
                    }
                </div>
                <div className={`${match.PassiveType + "base"}  infobase nobuffpadding ${match.AbilityURL != undefined ? "abilitybase" : ""}`}>
                    {showGLToggle == false && match.PassiveGLFlag == true ? 
                            match.PassiveDescGL == undefined ? "" : addformatting(match.PassiveDescGL) 
                    :
                    JPDesc == undefined ? "" : addformatting(JPDesc)
                    }
                </div>
                <BuffsforPassives match={match} ProcessedBuffs={ProcessedBuffs} jptoggledata={jptoggledata}/>
                </LazyLoadComponent>
            </div>
        </div>
    )
}

export default PassiveFormatting;