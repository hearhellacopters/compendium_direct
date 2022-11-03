import React, {useState, useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
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
import {EndsInTimer, StartsInTimer} from './Timers'
import TickDown from '../processing/tickDown'
import TickUp from '../processing/tickUp'
import addformatting from '../processing/replacer_abilitycontent';

const ReworkGearFormatting = ({match, ProcessedBuffs, jptoggledata}) => {

    const dispatch = useDispatch();

    const [gearBuffs, setgearBuffs] = useStateIfMounted([]);

    const makeRank= (rank)=>{
        if(rank == 95){
            return "BTBuff"
        }
    }

    useEffect(()=>{
        const filteredBuffs = ProcessedBuffs && ProcessedBuffs.filter(self=>self.BuffFlag == makeRank(match.GearRank))
        setgearBuffs(filteredBuffs)
        // eslint-disable-next-line
    },[match])

    const urlmaker = (PassiveLoc) =>{
        if(PassiveLoc == 95){
            return "burst"
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

    return(
        <div key={match.GearKey + "unit"} >
            <div>
            <div className="abilitygreysinglebutton margtop"><span className={`${match.WeaponTag} undertaga`}></span> Gear</div>
            {match.ReworkBTPlusBanner1 == undefined && match.ReworkBTPlusBanner2 == undefined ?
            <div className="buffunit">
            <div className="infoholder" style={{ minHeight: "160px"}}>
                <LazyLoadComponent>
                <div className="infotitleholder">
                    <div className="faceandiconholder">
                        <Link to={`/characters/${match.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"").toLowerCase()}/gear`}>
                        <div className="faceholderpassives">
                            <LazyLoadImage effect="opacity" alt={match.CharacterName} className="faceicon" src={`https://dissidiacompendium.com/images/static/characters/${match.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"")}/face.png`}/>
                            <div className="facetext">
                                {match.CharacterName == "Cloud of Darkness" ? "CoD" : match.CharacterName == "Warrior of Light" ? "WoL" : match.CharacterName}
                            </div>
                        </div>
                        </Link>
                    </div>
                </div>
                <div className={`${"Buffbanner"} iconbuffer infonameholder nobuffpadding `}>
                    <div className="displayfex">
                    {match.GearAbilityURL == undefined ? 
                    <div className="spacearound">
                    <span className="smallpassive automarg" />&nbsp;
                    </div>
                    : ``}
                    <div className={`infotitle displayfex ${match.GearAbilityURL != undefined ? "unique" : ""}`}>
                        <Link className={`linktopage`} to={`/characters/${match.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"").toLowerCase()}/gear/${urlmaker(match.URL)}`}>
                            {addformatting(match.GearPassiveTitle)}
                        </Link>
                    </div>
                    </div>
                    {match.JPName && 
                    <div className={`${match.PassiveType == "ArtRed" ? "orangetext size12" : "abilityJPname"}`}>
                        {match.JPName.replace(/#lvd/gm, " Lv9")}
                    </div>
                    } 
                    <span className={match.WeaponTag}/>
                    {match.CPCost == 0 ? "" :
                    match.CPCost == undefined ? "" :
                    <div className="CPReqHolder">
                        <span className="unique">{`Req. `}<span className='CPIcon CPIconSmaller '></span></span>
                        <span className={match.GearAbilityURL != undefined ? "" : ``}>
                        {" " + match.CPCost}
                        </span>
                    </div>}
                    {match.bannerindex == undefined ? "" :
                    <div className="similarbanner">
                        {match.bannerindex.tempdate == true ?
                        <div>
                            <Link className="linktopage" to={`/events/banners/${match.bannerindex.bannerindex}`}>
                                {match.bannerindex.name}<br/>
                        </Link>
                            {handledate(match.bannerindex.indate)}
                        </div>
                        :
                        <div> 
                            <Link className="linktopage" to={`/events/banners/${match.bannerindex.bannerindex}`}>
                                {match.bannerindex.name}<br/>
                        </Link>
                            <StartsInTimer expiryTimestamp={new Date(match.bannerindex.indate)}/>
                            </div>
                        }
                    </div>
                    }
                </div>
                <div className={`${"bluebase"} infobase nobuffpadding ${match.GearAbilityURL != undefined ? "abilitybase" : ""}`}>
                    {match.GearSubPassiveTF == true ?
                    <div className="subpassiveflair spacearound">
                        <span className="smallpassive" /><div className="lb0 lsmallerinline"/>&nbsp;{addformatting(match.GearSubPassiveTitle)}
                    </div> : ""
                    }
                    {match.GearPassiveDesc0GL == undefined ? "" : addformatting(makediff(match.GearPassiveDesc0GL,match.GearPassiveDesc0))}
                </div>
                <div className={`${"bluebase"} infobase nobuffpadding ${match.GearAbilityURL != undefined ? "abilitybase" : ""}`}>
                    {match.GearPassiveTitle1 != undefined ?
                        <div className="subpassiveflair spacearound">
                            <span className="smallpassive" /><div className="lb1 lsmallerinline"/>&nbsp;{addformatting(match.GearPassiveTitle1)}
                        </div> : ""
                        }
                    {match.GearPassiveDesc1GL == undefined ? "" : addformatting(makediff(match.GearPassiveDesc1GL,match.GearPassiveDesc1))}
                </div>
                <div className={`${"bluebase"} infobase nobuffpadding ${match.GearAbilityURL != undefined ? "abilitybase" : ""}`}>
                        {match.GearPassiveTitle2 != undefined?
                        <div className="subpassiveflair spacearound">
                            <span className="smallpassive" /><div className="lb2 lsmallerinline"/>&nbsp;{addformatting(match.GearPassiveTitle2)}
                        </div> : ""
                        }
                    {match.GearPassiveDesc2GL == undefined ? "" : addformatting(makediff(match.GearPassiveDesc2GL,match.GearPassiveDesc2))}
                </div>
                <div className={`${"bluebase"} infobase nobuffpadding ${match.GearAbilityURL != undefined ? "abilitybase" : ""}`}>
                    {match.GearPassiveTitle3 != undefined ?
                        <div className="subpassiveflair spacearound">
                            <span className="smallpassive" /><div className="lb3 lsmallerinline"/>&nbsp;{addformatting(match.GearPassiveTitle3)}
                        </div> : ""
                        }
                    {match.GearPassiveDesc3GL == undefined ? "" : addformatting(makediff(match.GearPassiveDesc3GL,match.GearPassiveDesc3))}
                </div>
                <BuffsforPassives match={match} ProcessedBuffs={gearBuffs} jptoggledata={jptoggledata}/>
                </LazyLoadComponent>
            </div>
            </div>
            : ""}

            {match.ReworkBTPlusBanner1 != undefined && match.ReworkBTPlusBanner2 == undefined ?
            <div>
            <div className="buffunit">
            <div className="infoholder" style={{ minHeight: "160px"}}>
                <LazyLoadComponent>
                <div className="infotitleholder">
                    <div className="faceandiconholder">
                        <Link to={`/characters/${match.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"").toLowerCase()}/gear`}>
                        <div className="faceholderpassives">
                            <LazyLoadImage effect="opacity" alt={match.CharacterName} className="faceicon" src={`https://dissidiacompendium.com/images/static/characters/${match.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"")}/face.png`}/>
                            <div className="facetext">
                                {match.CharacterName == "Cloud of Darkness" ? "CoD" : match.CharacterName == "Warrior of Light" ? "WoL" : match.CharacterName}
                            </div>
                        </div>
                        </Link>
                    </div>
                </div>
                <div className={`${"Buffbanner"} iconbuffer infonameholder nobuffpadding `}>
                    <div className="displayfex">
                    {match.GearAbilityURL == undefined ? 
                    <div className="spacearound">
                    <span className="smallpassive automarg" />&nbsp;
                    </div>
                    : ``}
                    <div className={`infotitle displayfex ${match.GearAbilityURL != undefined ? "unique" : ""}`}>
                        <Link className={`linktopage`} to={`/characters/${match.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"").toLowerCase()}/gear/${urlmaker(match.URL)}`}>
                            {addformatting(match.GearPassiveTitle)}
                        </Link>
                    </div>
                    </div>
                    {match.JPName && 
                    <div className={`${match.PassiveType == "ArtRed" ? "orangetext size12" : "abilityJPname"}`}>
                        {match.JPName.replace(/#lvd/gm, " Lv9")}
                    </div>
                    } 
                    <span className={match.WeaponTag}/>
                    {match.CPCost == 0 ? "" :
                    match.CPCost == undefined ? "" :
                    <div className="CPReqHolder">
                        <span className="unique">{`Req. `}<span className='CPIcon CPIconSmaller '></span></span>
                        <span className={match.GearAbilityURL != undefined ? "" : ``}>
                        {" " + match.CPCost}
                        </span>
                    </div>}
                    {match.ReworkBTPlusBanner1 == undefined ? "" :
                    <div className="similarbanner">
                        {match.ReworkBTPlusBanner1.tempdate == true ?
                        <div>
                            <Link className="linktopage" to={`/events/banners/${match.ReworkBTPlusBanner1.bannerindex}`}>
                                {match.ReworkBTPlusBanner1.name}<br/>
                        </Link>
                            {handledate(match.ReworkBTPlusBanner1.indate)}
                        </div>
                        :
                        <div> 
                            <Link className="linktopage" to={`/events/banners/${match.ReworkBTPlusBanner1.bannerindex}`}>
                                {match.ReworkBTPlusBanner1.name}<br/>
                        </Link>
                            <StartsInTimer expiryTimestamp={new Date(match.ReworkBTPlusBanner1.indate)}/>
                            </div>
                        }
                    </div>
                    }
                </div>
                <div className={`${"bluebase"} infobase nobuffpadding ${match.GearAbilityURL != undefined ? "abilitybase" : ""}`}>
                    {match.GearSubPassiveTF == true ?
                    <div className="subpassiveflair spacearound">
                        <span className="smallpassive" /><div className="lb0 lsmallerinline"/>&nbsp;{addformatting(match.GearSubPassiveTitle)}
                    </div> : ""
                    }
                    {match.ReworkBTPlus0Desc1 == undefined ? "" : addformatting(makediff(match.ReworkBTPlus0Desc1,match.GearPassiveDesc0GL))}
                </div>
                <div className={`${"bluebase"} infobase nobuffpadding ${match.GearAbilityURL != undefined ? "abilitybase" : ""}`}>
                    {match.GearPassiveTitle1 != undefined ?
                        <div className="subpassiveflair spacearound">
                            <span className="smallpassive" /><div className="lb1 lsmallerinline"/>&nbsp;{addformatting(match.GearPassiveTitle1)}
                        </div> : ""
                        }
                    {match.ReworkBTPlus1Desc1 == undefined ? "" : addformatting(makediff(match.ReworkBTPlus1Desc1,match.GearPassiveDesc1GL))}
                </div>
                <div className={`${"bluebase"} infobase nobuffpadding ${match.GearAbilityURL != undefined ? "abilitybase" : ""}`}>
                        {match.GearPassiveTitle2 != undefined?
                        <div className="subpassiveflair spacearound">
                            <span className="smallpassive" /><div className="lb2 lsmallerinline"/>&nbsp;{addformatting(match.GearPassiveTitle2)}
                        </div> : ""
                        }
                    {match.ReworkBTPlus2Desc1 == undefined ? "" : addformatting(makediff(match.ReworkBTPlus2Desc1,match.GearPassiveDesc2GL))}
                </div>
                <div className={`${"bluebase"} infobase nobuffpadding ${match.GearAbilityURL != undefined ? "abilitybase" : ""}`}>
                    {match.GearPassiveTitle3 != undefined ?
                        <div className="subpassiveflair spacearound">
                            <span className="smallpassive" /><div className="lb3 lsmallerinline"/>&nbsp;{addformatting(match.GearPassiveTitle3)}
                        </div> : ""
                        }
                    {match.ReworkBTPlus3Desc1 == undefined ? "" : addformatting(makediff(match.ReworkBTPlus3Desc1,match.GearPassiveDesc3GL))}
                </div>
                <BuffsforPassives match={match} ProcessedBuffs={gearBuffs} jptoggledata={jptoggledata}/>
                </LazyLoadComponent>
            </div>
            </div>
            <div className="buffunit">
            <div className="infoholder" style={{ minHeight: "160px"}}>
                <LazyLoadComponent>
                <div className="infotitleholder">
                    <div className="faceandiconholder">
                        <Link to={`/characters/${match.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"").toLowerCase()}/gear`}>
                        <div className="faceholderpassives">
                            <LazyLoadImage effect="opacity" alt={match.CharacterName} className="faceicon" src={`https://dissidiacompendium.com/images/static/characters/${match.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"")}/face.png`}/>
                            <div className="facetext">
                                {match.CharacterName == "Cloud of Darkness" ? "CoD" : match.CharacterName == "Warrior of Light" ? "WoL" : match.CharacterName}
                            </div>
                        </div>
                        </Link>
                    </div>
                </div>
                <div className={`${"Buffbanner"} iconbuffer infonameholder nobuffpadding `}>
                    <div className="displayfex">
                    {match.GearAbilityURL == undefined ? 
                    <div className="spacearound">
                    <span className="smallpassive automarg" />&nbsp;
                    </div>
                    : ``}
                    <div className={`infotitle displayfex ${match.GearAbilityURL != undefined ? "unique" : ""}`}>
                        <Link className={`linktopage`} to={`/characters/${match.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"").toLowerCase()}/gear/${urlmaker(match.URL)}`}>
                            {addformatting(match.GearPassiveTitle)}
                        </Link>
                    </div>
                    </div>
                    {match.JPName && 
                    <div className={`${match.PassiveType == "ArtRed" ? "orangetext size12" : "abilityJPname"}`}>
                        {match.JPName.replace(/#lvd/gm, " Lv9")}
                    </div>
                    } 
                    <span className={match.WeaponTag}/>
                    {match.CPCost == 0 ? "" :
                    match.CPCost == undefined ? "" :
                    <div className="CPReqHolder">
                        <span className="unique">{`Req. `}<span className='CPIcon CPIconSmaller '></span></span>
                        <span className={match.GearAbilityURL != undefined ? "" : ``}>
                        {" " + match.CPCost}
                        </span>
                    </div>}
                    {match.bannerindex == undefined ? "" :
                    <div className="similarbanner">
                        {match.bannerindex.tempdate == true ?
                        <div>
                            <Link className="linktopage" to={`/events/banners/${match.bannerindex.bannerindex}`}>
                                {match.bannerindex.name}<br/>
                        </Link>
                            {handledate(match.bannerindex.indate)}
                        </div>
                        :
                        <div> 
                            <Link className="linktopage" to={`/events/banners/${match.bannerindex.bannerindex}`}>
                                {match.bannerindex.name}<br/>
                        </Link>
                            <StartsInTimer expiryTimestamp={new Date(match.bannerindex.indate)}/>
                            </div>
                        }
                    </div>
                    }
                </div>
                <div className={`${"bluebase"} infobase nobuffpadding ${match.GearAbilityURL != undefined ? "abilitybase" : ""}`}>
                    {match.GearSubPassiveTF == true ?
                    <div className="subpassiveflair spacearound">
                        <span className="smallpassive" /><div className="lb0 lsmallerinline"/>&nbsp;{addformatting(match.GearSubPassiveTitle)}
                    </div> : ""
                    }
                    {match.ReworkBTPlus0Desc1 == undefined ? "" : addformatting(makediff(match.ReworkBTPlus0Desc1,match.GearPassiveDesc0))}
                </div>
                <div className={`${"bluebase"} infobase nobuffpadding ${match.GearAbilityURL != undefined ? "abilitybase" : ""}`}>
                    {match.GearPassiveTitle1 != undefined ?
                        <div className="subpassiveflair spacearound">
                            <span className="smallpassive" /><div className="lb1 lsmallerinline"/>&nbsp;{addformatting(match.GearPassiveTitle1)}
                        </div> : ""
                        }
                    {match.ReworkBTPlus1Desc1 == undefined ? "" : addformatting(makediff(match.ReworkBTPlus1Desc1,match.GearPassiveDesc1))}
                </div>
                <div className={`${"bluebase"} infobase nobuffpadding ${match.GearAbilityURL != undefined ? "abilitybase" : ""}`}>
                        {match.GearPassiveTitle2 != undefined?
                        <div className="subpassiveflair spacearound">
                            <span className="smallpassive" /><div className="lb2 lsmallerinline"/>&nbsp;{addformatting(match.GearPassiveTitle2)}
                        </div> : ""
                        }
                    {match.ReworkBTPlus2Desc1 == undefined ? "" : addformatting(makediff(match.ReworkBTPlus2Desc1,match.GearPassiveDesc2))}
                </div>
                <div className={`${"bluebase"} infobase nobuffpadding ${match.GearAbilityURL != undefined ? "abilitybase" : ""}`}>
                    {match.GearPassiveTitle3 != undefined ?
                        <div className="subpassiveflair spacearound">
                            <span className="smallpassive" /><div className="lb3 lsmallerinline"/>&nbsp;{addformatting(match.GearPassiveTitle3)}
                        </div> : ""
                        }
                    {match.ReworkBTPlus3Desc1 == undefined ? "" : addformatting(makediff(match.ReworkBTPlus3Desc1,match.GearPassiveDesc3))}
                </div>
                <BuffsforPassives match={match} ProcessedBuffs={gearBuffs} jptoggledata={jptoggledata}/>
                </LazyLoadComponent>
            </div>
            </div>
            </div>
            : ""}

            {match.ReworkBTPlusBanner1 != undefined && match.ReworkBTPlusBanner2 != undefined ?
            <div>
            <div className="buffunit">
            <div className="infoholder" style={{ minHeight: "160px"}}>
                <LazyLoadComponent>
                <div className="infotitleholder">
                    <div className="faceandiconholder">
                        <Link to={`/characters/${match.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"").toLowerCase()}/gear`}>
                        <div className="faceholderpassives">
                            <LazyLoadImage effect="opacity" alt={match.CharacterName} className="faceicon" src={`https://dissidiacompendium.com/images/static/characters/${match.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"")}/face.png`}/>
                            <div className="facetext">
                                {match.CharacterName == "Cloud of Darkness" ? "CoD" : match.CharacterName == "Warrior of Light" ? "WoL" : match.CharacterName}
                            </div>
                        </div>
                        </Link>
                    </div>
                </div>
                <div className={`${"Buffbanner"} iconbuffer infonameholder nobuffpadding `}>
                    <div className="displayfex">
                    {match.GearAbilityURL == undefined ? 
                    <div className="spacearound">
                    <span className="smallpassive automarg" />&nbsp;
                    </div>
                    : ``}
                    <div className={`infotitle displayfex ${match.GearAbilityURL != undefined ? "unique" : ""}`}>
                        <Link className={`linktopage`} to={`/characters/${match.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"").toLowerCase()}/gear/${urlmaker(match.URL)}`}>
                            {addformatting(match.GearPassiveTitle)}
                        </Link>
                    </div>
                    </div>
                    {match.JPName && 
                    <div className={`${match.PassiveType == "ArtRed" ? "orangetext size12" : "abilityJPname"}`}>
                        {match.JPName.replace(/#lvd/gm, " Lv9")}
                    </div>
                    } 
                    <span className={match.WeaponTag}/>
                    {match.CPCost == 0 ? "" :
                    match.CPCost == undefined ? "" :
                    <div className="CPReqHolder">
                        <span className="unique">{`Req. `}<span className='CPIcon CPIconSmaller '></span></span>
                        <span className={match.GearAbilityURL != undefined ? "" : ``}>
                        {" " + match.CPCost}
                        </span>
                    </div>}
                    {match.ReworkBTPlusBanner2 == undefined ? "" :
                    <div className="similarbanner">
                        {match.ReworkBTPlusBanner2.tempdate == true ?
                        <div>
                            <Link className="linktopage" to={`/events/banners/${match.ReworkBTPlusBanner2.bannerindex}`}>
                                {match.ReworkBTPlusBanner2.name}<br/>
                        </Link>
                            {handledate(match.ReworkBTPlusBanner2.indate)}
                        </div>
                        :
                        <div> 
                            <Link className="linktopage" to={`/events/banners/${match.ReworkBTPlusBanner2.bannerindex}`}>
                                {match.ReworkBTPlusBanner2.name}<br/>
                        </Link>
                            <StartsInTimer expiryTimestamp={new Date(match.ReworkBTPlusBanner2.indate)}/>
                            </div>
                        }
                    </div>
                    }
                </div>
                <div className={`${"bluebase"} infobase nobuffpadding ${match.GearAbilityURL != undefined ? "abilitybase" : ""}`}>
                    {match.GearSubPassiveTF == true ?
                    <div className="subpassiveflair spacearound">
                        <span className="smallpassive" /><div className="lb0 lsmallerinline"/>&nbsp;{addformatting(match.GearSubPassiveTitle)}
                    </div> : ""
                    }
                    {match.ReworkBTPlus0Desc2 == undefined ? "" : addformatting(makediff(match.ReworkBTPlus0Desc2,match.ReworkBTPlus0Desc1))}
                </div>
                <div className={`${"bluebase"} infobase nobuffpadding ${match.GearAbilityURL != undefined ? "abilitybase" : ""}`}>
                    {match.GearPassiveTitle1 != undefined ?
                        <div className="subpassiveflair spacearound">
                            <span className="smallpassive" /><div className="lb1 lsmallerinline"/>&nbsp;{addformatting(match.GearPassiveTitle1)}
                        </div> : ""
                        }
                    {match.ReworkBTPlus1Desc2 == undefined ? "" : addformatting(makediff(match.ReworkBTPlus1Desc2,match.ReworkBTPlus1Desc1))}
                </div>
                <div className={`${"bluebase"} infobase nobuffpadding ${match.GearAbilityURL != undefined ? "abilitybase" : ""}`}>
                        {match.GearPassiveTitle2 != undefined?
                        <div className="subpassiveflair spacearound">
                            <span className="smallpassive" /><div className="lb2 lsmallerinline"/>&nbsp;{addformatting(match.GearPassiveTitle2)}
                        </div> : ""
                        }
                    {match.ReworkBTPlus2Desc2 == undefined ? "" : addformatting(makediff(match.ReworkBTPlus2Desc2,match.ReworkBTPlus2Desc1))}
                </div>
                <div className={`${"bluebase"} infobase nobuffpadding ${match.GearAbilityURL != undefined ? "abilitybase" : ""}`}>
                    {match.GearPassiveTitle3 != undefined ?
                        <div className="subpassiveflair spacearound">
                            <span className="smallpassive" /><div className="lb3 lsmallerinline"/>&nbsp;{addformatting(match.GearPassiveTitle3)}
                        </div> : ""
                        }
                    {match.ReworkBTPlus3Desc2 == undefined ? "" : addformatting(makediff(match.ReworkBTPlus3Desc2,match.ReworkBTPlus3Desc1))}
                </div>
                <BuffsforPassives match={match} ProcessedBuffs={gearBuffs} jptoggledata={jptoggledata}/>
                </LazyLoadComponent>
            </div>
            </div>
            <div className="buffunit">
            <div className="infoholder" style={{ minHeight: "160px"}}>
                <LazyLoadComponent>
                <div className="infotitleholder">
                    <div className="faceandiconholder">
                        <Link to={`/characters/${match.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"").toLowerCase()}/gear`}>
                        <div className="faceholderpassives">
                            <LazyLoadImage effect="opacity" alt={match.CharacterName} className="faceicon" src={`https://dissidiacompendium.com/images/static/characters/${match.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"")}/face.png`}/>
                            <div className="facetext">
                                {match.CharacterName == "Cloud of Darkness" ? "CoD" : match.CharacterName == "Warrior of Light" ? "WoL" : match.CharacterName}
                            </div>
                        </div>
                        </Link>
                    </div>
                </div>
                <div className={`${"Buffbanner"} iconbuffer infonameholder nobuffpadding `}>
                    <div className="displayfex">
                    {match.GearAbilityURL == undefined ? 
                    <div className="spacearound">
                    <span className="smallpassive automarg" />&nbsp;
                    </div>
                    : ``}
                    <div className={`infotitle displayfex ${match.GearAbilityURL != undefined ? "unique" : ""}`}>
                        <Link className={`linktopage`} to={`/characters/${match.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"").toLowerCase()}/gear/${urlmaker(match.URL)}`}>
                            {addformatting(match.GearPassiveTitle)}
                        </Link>
                    </div>
                    </div>
                    {match.JPName && 
                    <div className={`${match.PassiveType == "ArtRed" ? "orangetext size12" : "abilityJPname"}`}>
                        {match.JPName.replace(/#lvd/gm, " Lv9")}
                    </div>
                    } 
                    <span className={match.WeaponTag}/>
                    {match.CPCost == 0 ? "" :
                    match.CPCost == undefined ? "" :
                    <div className="CPReqHolder">
                        <span className="unique">{`Req. `}<span className='CPIcon CPIconSmaller '></span></span>
                        <span className={match.GearAbilityURL != undefined ? "" : ``}>
                        {" " + match.CPCost}
                        </span>
                    </div>}
                    {match.ReworkBTPlusBanner1 == undefined ? "" :
                    <div className="similarbanner">
                        {match.ReworkBTPlusBanner1.tempdate == true ?
                        <div>
                            <Link className="linktopage" to={`/events/banners/${match.ReworkBTPlusBanner1.bannerindex}`}>
                                {match.ReworkBTPlusBanner1.name}<br/>
                        </Link>
                            {handledate(match.ReworkBTPlusBanner1.indate)}
                        </div>
                        :
                        <div> 
                            <Link className="linktopage" to={`/events/banners/${match.ReworkBTPlusBanner1.bannerindex}`}>
                                {match.ReworkBTPlusBanner1.name}<br/>
                        </Link>
                            <StartsInTimer expiryTimestamp={new Date(match.ReworkBTPlusBanner1.indate)}/>
                            </div>
                        }
                    </div>
                    }
                </div>
                <div className={`${"bluebase"} infobase nobuffpadding ${match.GearAbilityURL != undefined ? "abilitybase" : ""}`}>
                    {match.GearSubPassiveTF == true ?
                    <div className="subpassiveflair spacearound">
                        <span className="smallpassive" /><div className="lb0 lsmallerinline"/>&nbsp;{addformatting(match.GearSubPassiveTitle)}
                    </div> : ""
                    }
                    {match.GearPassiveDesc0GL == undefined ? "" : addformatting(makediff(match.GearPassiveDesc0GL,match.ReworkBTPlus0Desc1))}
                </div>
                <div className={`${"bluebase"} infobase nobuffpadding ${match.GearAbilityURL != undefined ? "abilitybase" : ""}`}>
                    {match.GearPassiveTitle1 != undefined ?
                        <div className="subpassiveflair spacearound">
                            <span className="smallpassive" /><div className="lb1 lsmallerinline"/>&nbsp;{addformatting(match.GearPassiveTitle1)}
                        </div> : ""
                        }
                    {match.GearPassiveDesc1GL == undefined ? "" : addformatting(makediff(match.GearPassiveDesc1GL,match.ReworkBTPlus1Desc1))}
                </div>
                <div className={`${"bluebase"} infobase nobuffpadding ${match.GearAbilityURL != undefined ? "abilitybase" : ""}`}>
                        {match.GearPassiveTitle2 != undefined?
                        <div className="subpassiveflair spacearound">
                            <span className="smallpassive" /><div className="lb2 lsmallerinline"/>&nbsp;{addformatting(match.GearPassiveTitle2)}
                        </div> : ""
                        }
                    {match.GearPassiveDesc2GL == undefined ? "" : addformatting(makediff(match.GearPassiveDesc2GL,match.ReworkBTPlus2Desc1))}
                </div>
                <div className={`${"bluebase"} infobase nobuffpadding ${match.GearAbilityURL != undefined ? "abilitybase" : ""}`}>
                    {match.GearPassiveTitle3 != undefined ?
                        <div className="subpassiveflair spacearound">
                            <span className="smallpassive" /><div className="lb3 lsmallerinline"/>&nbsp;{addformatting(match.GearPassiveTitle3)}
                        </div> : ""
                        }
                    {match.GearPassiveDesc3GL == undefined ? "" : addformatting(makediff(match.GearPassiveDesc3GL,match.ReworkBTPlus3Desc1))}
                </div>
                <BuffsforPassives match={match} ProcessedBuffs={gearBuffs} jptoggledata={jptoggledata}/>
                </LazyLoadComponent>
            </div>
            </div>
            <div className="buffunit">
            <div className="infoholder" style={{ minHeight: "160px"}}>
                <LazyLoadComponent>
                <div className="infotitleholder">
                    <div className="faceandiconholder">
                        <Link to={`/characters/${match.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"").toLowerCase()}/gear`}>
                        <div className="faceholderpassives">
                            <LazyLoadImage effect="opacity" alt={match.CharacterName} className="faceicon" src={`https://dissidiacompendium.com/images/static/characters/${match.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"")}/face.png`}/>
                            <div className="facetext">
                                {match.CharacterName == "Cloud of Darkness" ? "CoD" : match.CharacterName == "Warrior of Light" ? "WoL" : match.CharacterName}
                            </div>
                        </div>
                        </Link>
                    </div>
                </div>
                <div className={`${"Buffbanner"} iconbuffer infonameholder nobuffpadding `}>
                    <div className="displayfex">
                    {match.GearAbilityURL == undefined ? 
                    <div className="spacearound">
                    <span className="smallpassive automarg" />&nbsp;
                    </div>
                    : ``}
                    <div className={`infotitle displayfex ${match.GearAbilityURL != undefined ? "unique" : ""}`}>
                        <Link className={`linktopage`} to={`/characters/${match.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"").toLowerCase()}/gear/${urlmaker(match.URL)}`}>
                            {addformatting(match.GearPassiveTitle)}
                        </Link>
                    </div>
                    </div>
                    {match.JPName && 
                    <div className={`${match.PassiveType == "ArtRed" ? "orangetext size12" : "abilityJPname"}`}>
                        {match.JPName.replace(/#lvd/gm, " Lv9")}
                    </div>
                    } 
                    <span className={match.WeaponTag}/>
                    {match.CPCost == 0 ? "" :
                    match.CPCost == undefined ? "" :
                    <div className="CPReqHolder">
                        <span className="unique">{`Req. `}<span className='CPIcon CPIconSmaller '></span></span>
                        <span className={match.GearAbilityURL != undefined ? "" : ``}>
                        {" " + match.CPCost}
                        </span>
                    </div>}
                    {match.bannerindex == undefined ? "" :
                    <div className="similarbanner">
                        {match.bannerindex.tempdate == true ?
                        <div>
                            <Link className="linktopage" to={`/events/banners/${match.bannerindex.bannerindex}`}>
                                {match.bannerindex.name}<br/>
                        </Link>
                            {handledate(match.bannerindex.indate)}
                        </div>
                        :
                        <div> 
                            <Link className="linktopage" to={`/events/banners/${match.bannerindex.bannerindex}`}>
                                {match.bannerindex.name}<br/>
                        </Link>
                            <StartsInTimer expiryTimestamp={new Date(match.bannerindex.indate)}/>
                            </div>
                        }
                    </div>
                    }
                </div>
                <div className={`${"bluebase"} infobase nobuffpadding ${match.GearAbilityURL != undefined ? "abilitybase" : ""}`}>
                    {match.GearSubPassiveTF == true ?
                    <div className="subpassiveflair spacearound">
                        <span className="smallpassive" /><div className="lb0 lsmallerinline"/>&nbsp;{addformatting(match.GearSubPassiveTitle)}
                    </div> : ""
                    }
                    {match.ReworkBTPlus0Desc1 == undefined ? "" : addformatting(makediff(match.ReworkBTPlus0Desc1,match.GearPassiveDesc0))}
                </div>
                <div className={`${"bluebase"} infobase nobuffpadding ${match.GearAbilityURL != undefined ? "abilitybase" : ""}`}>
                    {match.GearPassiveTitle1 != undefined ?
                        <div className="subpassiveflair spacearound">
                            <span className="smallpassive" /><div className="lb1 lsmallerinline"/>&nbsp;{addformatting(match.GearPassiveTitle1)}
                        </div> : ""
                        }
                    {match.ReworkBTPlus1Desc1 == undefined ? "" : addformatting(makediff(match.ReworkBTPlus1Desc1,match.GearPassiveDesc1))}
                </div>
                <div className={`${"bluebase"} infobase nobuffpadding ${match.GearAbilityURL != undefined ? "abilitybase" : ""}`}>
                        {match.GearPassiveTitle2 != undefined?
                        <div className="subpassiveflair spacearound">
                            <span className="smallpassive" /><div className="lb2 lsmallerinline"/>&nbsp;{addformatting(match.GearPassiveTitle2)}
                        </div> : ""
                        }
                    {match.ReworkBTPlus2Desc1 == undefined ? "" : addformatting(makediff(match.ReworkBTPlus2Desc1,match.GearPassiveDesc2))}
                </div>
                <div className={`${"bluebase"} infobase nobuffpadding ${match.GearAbilityURL != undefined ? "abilitybase" : ""}`}>
                    {match.GearPassiveTitle3 != undefined ?
                        <div className="subpassiveflair spacearound">
                            <span className="smallpassive" /><div className="lb3 lsmallerinline"/>&nbsp;{addformatting(match.GearPassiveTitle3)}
                        </div> : ""
                        }
                    {match.ReworkBTPlus3Desc1 == undefined ? "" : addformatting(makediff(match.ReworkBTPlus3Desc1,match.GearPassiveDesc3))}
                </div>
                <BuffsforPassives match={match} ProcessedBuffs={gearBuffs} jptoggledata={jptoggledata}/>
                </LazyLoadComponent>
            </div>
            </div>
            </div>
            : ""}
            </div>
        </div>
    )
}

export default ReworkGearFormatting;