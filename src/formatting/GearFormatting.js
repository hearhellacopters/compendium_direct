import React, {useState, useEffect} from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import { useDispatch } from "react-redux";
import { setFalse, setTrue } from '../redux/ducks/jptoggle'
import '../Buffs.css';
import '../Gear.css';
import { Link } from 'react-router-dom'
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import BuffsforGear from '../formatting/BuffsforGear.js'
import TickUp from '../processing/tickUp'
import TickDown from '../processing/tickDown'
import {EndsInTimer, StartsInTimer} from '../formatting/Timers'
import addformatting from '../processing/replacer_abilitycontent';
import { getQuery, getQueryStringVal, useQueryParam } from '../processing/urlparams'
const Diff = require('diff');
import DefaultTippy from './TippyDefaults.js';

const GearFormatting = ({match, ProcessedBuffs, jptoggledata}) => {

    const dispatch = useDispatch();

    const [JPsearch, setJPSearch] = useQueryParam("JP", "");

    const [changeicon, setchangeicon] = useStateIfMounted(false);

    const [changeiconcount, setchangeiconcount] = useStateIfMounted(0);

    const mouseoverbutton = () => {
        setchangeicon((prevValue) => !prevValue)
        if(changeiconcount <= 4){
            setchangeiconcount((previus) => previus +1)
        } else {
            setchangeiconcount(0)
        }
    }

    const [showGLToggle, setShowGLToggle] = useState(false);
    const [JPDesc0, setJPDesc0] = useState("");
    const [JPDesc1, setJPDesc1] = useState("");
    const [JPDesc2, setJPDesc2] = useState("");
    const [JPDesc3, setJPDesc3] = useState("");

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

    useEffect(() => {
        if(match.GearGLFlag == true){
            setShowGLToggle(jptoggledata)
            if(jptoggledata){
                if(match.LimitBreaks == 1){
                    const JPDESCREPLACE = Diff.diffTrimmedLines(match.GearPassiveDesc0GL + "\n", match.GearPassiveDesc0 + "\n", {newlineIsToken: false})
                    setJPDesc0(JPDESCREPLACE.map(text => `${text.added == true ? '~~' + text.value + '~.~': ""}${text.removed == true ? '^^' + text.value  + '^.^': ""}${text.removed == undefined && text.added == undefined ? text.value :""}`).join(""))
                }
                if(match.LimitBreaks == 4){
                    const JPDESCREPLACE0 = Diff.diffTrimmedLines(match.GearPassiveDesc0GL + "\n", match.GearPassiveDesc0 + "\n", {newlineIsToken: false})
                    setJPDesc0(JPDESCREPLACE0.map(text => `${text.added == true ? '~~' + text.value + '~.~': ""}${text.removed == true ? '^^' + text.value  + '^.^': ""}${text.removed == undefined && text.added == undefined ? text.value :""}`).join(""))
                    const JPDESCREPLACE1 = Diff.diffTrimmedLines(match.GearPassiveDesc1GL + "\n", match.GearPassiveDesc1 + "\n", {newlineIsToken: false})
                    setJPDesc1(JPDESCREPLACE1.map(text => `${text.added == true ? '~~' + text.value + '~.~': ""}${text.removed == true ? '^^' + text.value  + '^.^': ""}${text.removed == undefined && text.added == undefined ? text.value :""}`).join(""))
                    const JPDESCREPLACE2 = Diff.diffTrimmedLines(match.GearPassiveDesc2GL + "\n", match.GearPassiveDesc2 + "\n", {newlineIsToken: false})
                    setJPDesc2(JPDESCREPLACE2.map(text => `${text.added == true ? '~~' + text.value + '~.~': ""}${text.removed == true ? '^^' + text.value  + '^.^': ""}${text.removed == undefined && text.added == undefined ? text.value :""}`).join(""))
                    const JPDESCREPLACE3 = Diff.diffTrimmedLines(match.GearPassiveDesc3GL + "\n", match.GearPassiveDesc3 + "\n", {newlineIsToken: false})
                    setJPDesc3(JPDESCREPLACE3.map(text => `${text.added == true ? '~~' + text.value + '~.~': ""}${text.removed == true ? '^^' + text.value  + '^.^': ""}${text.removed == undefined && text.added == undefined ? text.value :""}`).join(""))
                }
            } else {
                if(match.LimitBreaks == 1){
                    setJPDesc0(match.GearPassiveDesc0GL)
                }
                if(match.LimitBreaks >= 4){
                    setJPDesc0(match.GearPassiveDesc0GL)
                    setJPDesc1(match.GearPassiveDesc1GL)
                    setJPDesc2(match.GearPassiveDesc2GL)
                    setJPDesc3(match.GearPassiveDesc3GL)
                }
            }
            
        } else {
            setShowGLToggle(false)
            if(match.LimitBreaks == 1){
                setJPDesc0(match.GearPassiveDesc0)
            }
            if(match.LimitBreaks >= 4){
                setJPDesc0(match.GearPassiveDesc0)
                setJPDesc1(match.GearPassiveDesc1)
                setJPDesc2(match.GearPassiveDesc2)
                setJPDesc3(match.GearPassiveDesc3)
            }
        }
    }, [jptoggledata,match])

    const facemaker = {
        CharacterName: match.CharacterName,
        ShortName: match.CharacterShortName,
        CharacterFaceURL: "https://dissidiacompendium.com/images/static/characters/" + match.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"") + "/face.png"
    }

    const colormaker = (rank) => {
        if(rank == 1 || rank == 50 || rank == 10 || rank == 80) {
            return "Nocolorbanner"
        }
        if(rank == 2 || rank == 54 || rank == 52 || rank == 51) {
            return "Dbanner"
        }
        if(rank == 3) {
            return "Bbanner"
        }
        if(rank == 4 || rank == 57 || rank == 56 || rank == 75
            ) {
            return "bluebanner"
        }
        if(rank == 11 || rank ==70) {
            return "blackbanner"
        }
        if(rank == 12) {
            return "bluebanner"
        }
        if(rank == 55 || rank == 90) {
            return "newbackbanner"
        }
        if(rank == 53){
            return "Bbanner"
        }
        if(rank >= 900){
            return "Buffbanner"
        }
        if(rank == 95)
        return "Buffbanner"
    }

    const abilitymaker = (rank) => {
        if(rank == 95) {
            return "burst"
        }
        if(rank == 90) {
            return "burst"
        }
        if(rank == 57) {
            return "ld"
        }
        if(rank == 75) {
            return "fr"
        }
        if(rank == 56) {
            return "ex"
        }
        else{
            return null
        }
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

    const replacer=(e)=>{
        var newtext = e&&e.replace(/&/gm,"%26")
        return newtext
    }

    return(
        <div className="buffunit">
            <div className="infoholder" style={{ minHeight: "250px"}}>
                <LazyLoadComponent>
                <div className="geartoplevel">
                    <div className="gearimageholder">
                        <Link to={match.CharID == 999 ? 
                            `/characters/${match.CharacterShortName}/${match.GearType.toLowerCase()}` :
                            `/characters/${match.CharacterShortName}/gear/${match.URL}`
                            }>
                            <LazyLoadImage effect="opacity" key={match.GearKey + "nom"} className="gearimage clicky"  alt={match.GearName} src={match.CharID == 999 ? `${match.GearURL}${changeiconcount}.png` : changeicon == false ? match.GearURL : match.GearURLMaster} />
                        </Link>
                    </div>
                <table className="statstablenonmoble statframe tablenonmobile shadow">
                <thead className="statsflair ">
                <tr>
                    <th className="rightborder leftborder tableven"><div className="unique">LB</div></th>
                    <th className="rightborder tableven"><div className="unique">HP</div></th>
                    <th className="rightborder tableven"><div className="unique">DEF</div></th>
                    <th className="rightborder tableven"><div className="unique">iBRV</div></th>
                    <th className="rightborder tableven"><div className="unique">mBRV</div></th>
                    <th className=" tableven"><div className="unique">ATK</div></th>
                    <th className="blackcapborder tableven"><div className="CPIcon CPIconSmaller"/></th>
                </tr>
                </thead>
                <tbody>
                <tr className={`statsflairperstat topborder`}>
                    <td onClick={() => setchangeiconcount(0)} className={`rightborder topborder leftborder greybackground ${match.CharID == 999 ? "click" : ""}`}><div className={`lb0${match.CharID == 999 ? "5" : ""} lsmaller`}/></td>
                    <td className="rightborder topborder">{match.HP0}</td>
                    <td className="rightborder topborder">{match.DEF0}</td>
                    <td className="rightborder topborder">{match.INTBRV0}</td>
                    <td className="rightborder topborder">{match.MAXBRV0}</td>
                    <td className="topborder">{match.ATK0}</td>
                    <td className={`whiterightborder whitetopborder blackbg ${match.LimitBreaks == 1 ? "whitebottomborder" : ""}`}>{match.CPGains0}</td>
                </tr>
                {match.LimitBreaks >= 2 ? 
                <tr className={`statsflairperstat topborder`}>
                    <td onClick={() => setchangeiconcount(1)} className={`rightborder topborder leftborder greybackground ${match.CharID == 999 ? "click" : ""}`}><div className={`lb1${match.CharID == 999 ? "5" : ""} lsmaller`}/></td>
                    <td className="rightborder topborder">{match.HP1}</td>
                    <td className="rightborder topborder">{match.DEF1}</td>
                    <td className="rightborder topborder">{match.INTBRV1}</td>
                    <td className="rightborder topborder">{match.MAXBRV1}</td>
                    <td className="topborder">{match.ATK1}</td>
                    <td className="whitetopborder blackbg whiterightborder">{match.CPGains1}</td>
                </tr>:null}
                {match.LimitBreaks >= 3 ? 
                <tr className={`statsflairperstat topborder`}>
                    <td onClick={() => setchangeiconcount(2)} className={`rightborder topborder leftborder greybackground ${match.CharID == 999 ? "click" : ""}`} ><div className={`lb2${match.CharID == 999 ? "5" : ""} lsmaller`}/></td>
                    <td className="rightborder topborder">{match.HP2}</td>
                    <td className="rightborder topborder">{match.DEF2}</td>
                    <td className="rightborder topborder">{match.INTBRV2}</td>
                    <td className="rightborder topborder">{match.MAXBRV2}</td>
                    <td className="topborder">{match.ATK2}</td>
                    <td className="whitetopborder blackbg whiterightborder">{match.CPGains2}</td>
                </tr> :null}
                {match.LimitBreaks >= 4 ? 
                <tr className={`statsflairperstat topborder ${match.LimitBreaks == 4 && match.CharID != 999  ? "statsender": ""}`}>
                    {match.CharID != 999 ?
                    <td onClick={mouseoverbutton} className="rightborder topborder leftborder greybackground click"><div className={`lb3${match.CharID == 999 ? "5" : ""} lsmaller`}/></td>
                    :
                    <td onClick={() => setchangeiconcount(3)} className="rightborder topborder leftborder greybackground click"><div className={`lb3${match.CharID == 999 ? "5" : ""} lsmaller`}/></td>
                    }
                    <td className="rightborder topborder">{match.HP3}</td>
                    <td className="rightborder topborder">{match.DEF3}</td>
                    <td className="rightborder topborder">{match.INTBRV3}</td>
                    <td className="rightborder topborder">{match.MAXBRV3}</td>
                    <td className="topborder">{match.ATK3}</td>
                    <td className={`whitetopborder blackbg ${match.CharID == 999 ? "" : "whitebottomborder"} whiterightborder `}>{match.CPGains3}</td>
                </tr> :null}
                {match.LimitBreaks >= 5 ? 
                <tr className={`statsflairperstat topborder`}>
                    <td onClick={() => setchangeiconcount(4)} className="rightborder topborder leftborder greybackground click"><div className={`lb4${match.CharID == 999 ? "5" : ""} lsmaller`}/></td>
                    <td className="rightborder topborder">{match.HP4}</td>
                    <td className="rightborder topborder">{match.DEF4}</td>
                    <td className="rightborder topborder">{match.INTBRV4}</td>
                    <td className="rightborder topborder">{match.MAXBRV4}</td>
                    <td className="topborder">{match.ATK4}</td>
                    <td className="whitetopborder blackbg whiterightborder whitebottomborder">{match.CPGains4}</td>
                </tr> :null}
                {match.LimitBreaks >= 6 ? 
                <tr className={`statsflairperstat topborder ${match.LimitBreaks == 6 ? "statsender": ""}`}>
                    <td onClick={() => setchangeiconcount(5)} className="rightborder topborder leftborder greybackground click"><div className={`lb5${match.CharID == 999 ? "5" : ""} lsmaller`}/></td>
                    <td className="rightborder topborder">{match.HP5}</td>
                    <td className="rightborder topborder">{match.DEF5}</td>
                    <td className="rightborder topborder">{match.INTBRV5}</td>
                    <td className="rightborder topborder">{match.MAXBRV5}</td>
                    <td className="topborder">{match.ATK5}</td>
                    <td className="blackbg whiterightborder whitebottomborder">{match.CPGains5}</td>
                </tr> :null}
                </tbody>
                </table>
                    {match.GearAbilityTF == true ? 
                    <div className="gearabilityiconholder">
                        <Link to={`/characters/${match.CharacterShortName}/abilities/${abilitymaker(match.GearRank)}`}>
                        <LazyLoadImage effect="opacity" key={match.GearAbilityURL} className="abilityicon" alt={match.GearAbilityName} src={match.GearAbilityURL}/>
                        </Link>
                        {match.GearRank == 56 ? "" :
                        <div className="gearsaholder">
                            <div className="gearsanumber">{match.AbilityUse}
                            </div>
                        </div>}
                        {match.GearRank == 56 ? 
                        <div className="gearablspeed">
                        {match.AbilityUse}
                        </div>
                        : 
                        <div className="gearabilityuses">
                            <span className="unique">{`Uses: `}</span>
                            <span>{match.AbilityUse}</span>
                        </div>
                        }
                        {match.GearGLFlag ? 
                        <div className="toggleforminigear" id="GLtoggle">
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
                    </div>
                    : "" }
                </div>
                {match.Unreleased == undefined && match.BTRelease == undefined && match.BTPlusRelease == undefined && match.LDRelease == undefined && match.SevenArmorRelease == undefined && match.SevenArmorPlusRelease == undefined && match.FRRelease == undefined ? "" :
               <div className="subheader">
               {match.Unreleased == undefined ? "" :
               (new Date(match.Unreleased ) < ct ) == true ? "" :
               match.UnreleasedTemp == true ?
                     <div>
                         <Link className="linktopage" to={`/events/banners/${match.UnreleasedIndex}`}>
                             {match.UnreleasedName}
                         </Link><br/>
                         <span className="glupdategreen">{handledate(match.Unreleased)}</span>
                    </div>
                :
                    <div>
                        <Link className="linktopage" to={`/events/banners/${match.UnreleasedIndex}`}>
                             {match.UnreleasedName}
                         </Link><br/>
                        <StartsInTimer expiryTimestamp={new Date(match.Unreleased)} JPFlag={false}/>
                    </div>
                }
                {match.FRRelease == undefined ? "" :
                (new Date(match.FRRelease ) < ct ) == true ? "" :
                match.Unreleased == match.FRRelease ? "" : 
                match.FRReleaseTemp == true ?
                <div>
                    <Link className="linktopage" to={`/events/banners/${match.FRReleaseIndex}`}>
                        {match.FRReleaseName}
                    </Link><br/>
                    <span className="glupdategreen">{handledate(match.FRRelease)}</span>
                    </div>
                :
                <div>
                    <Link className="linktopage" to={`/events/banners/${match.FRReleaseIndex}`}>
                        {match.FRReleaseName}
                    </Link><br/>
                    <StartsInTimer expiryTimestamp={new Date(match.FRRelease)}  JPFlag={false}/>
                </div>
                }
                {match.BTRelease == undefined ? "" :
                (new Date(match.BTRelease ) < ct ) == true ? "" :
                match.Unreleased == match.BTRelease ? "" : 
                match.BTReleaseTemp == true ?
                <div>
                    <Link className="linktopage" to={`/events/banners/${match.BTReleaseIndex}`}>
                        {match.BTReleaseName}
                    </Link><br/>
                    <span className="glupdategreen">{handledate(match.BTRelease)}</span>
                    </div>
                :
                <div>
                    <Link className="linktopage" to={`/events/banners/${match.BTReleaseIndex}`}>
                        {match.BTReleaseName}
                    </Link><br/>
                    <StartsInTimer expiryTimestamp={new Date(match.BTRelease)}  JPFlag={false}/>
                </div>
                }
                {match.BTPlusRelease == undefined ? "" :
                (new Date(match.BTPlusRelease ) < ct ) == true ? "" :
                match.Unreleased == match.BTPlusRelease ? "" : 
                match.BTPlusReleaseTemp == true ?
                <div>
                    <Link className="linktopage" to={`/events/banners/${match.BTPlusReleaseIndex}`}>
                        {match.BTPlusReleaseName}
                    </Link><br/>
                    <span className="glupdategreen">{handledate(match.BTPlusRelease)}</span>
                    </div>
                :
                <div>
                    <Link className="linktopage" to={`/events/banners/${match.BTPlusReleaseIndex}`}>
                        {match.BTPlusReleaseName}
                    </Link><br/>
                    <StartsInTimer expiryTimestamp={new Date(match.BTPlusRelease)}  JPFlag={false}/>
                    </div>
                }
                {match.LDRelease == undefined ? "" :
                (new Date(match.LDRelease ) < ct ) == true ? "" :
                match.Unreleased == match.LDRelease ? "" : 
                match.LDReleaseTemp == true ?
                <div>
                    <Link className="linktopage" to={`/events/banners/${match.LDReleaseIndex}`}>
                        {match.LDReleaseName}
                    </Link><br/>
                    <span className="glupdategreen">{handledate(match.LDRelease)}</span>
                    </div>
                :
                <div><StartsInTimer expiryTimestamp={new Date(match.LDRelease)} JPFlag={false}/></div>
                }
                {match.SevenArmorRelease == undefined ? "" :
                (new Date(match.SevenArmorRelease ) < ct ) == true ? "" :
                match.Unreleased == match.SevenArmorRelease ? "" : 
                match.SevenArmorReleaseTemp == true ?
                    <div>
                        <Link className="linktopage" to={`/events/banners/${match.SevenArmorReleaseIndex}`}>
                            {match.SevenArmorReleaseName}
                        </Link><br/>
                        <span className="glupdategreen">{handledate(match.SevenArmorRelease)}</span>
                    </div>
                :
                    <div>
                        <Link className="linktopage" to={`/events/banners/${match.SevenArmorReleaseIndex}`}>
                            {match.SevenArmorReleaseName}
                        </Link><br/>
                        <StartsInTimer expiryTimestamp={new Date(match.SevenArmorRelease)} JPFlag={false}/>
                        </div>
                }
                {match.SevenArmorPlusRelease == undefined ? "" :
                (new Date(match.SevenArmorPlusRelease ) < ct ) == true ? "" :
                match.Unreleased == match.SevenArmorPlusRelease ? "" : 
                match.SevenArmorPlusReleaseTemp == true ?
                    <div>
                        <Link className="linktopage" to={`/events/banners/${match.SevenArmorPlusReleaseIndex}`}>
                            {match.SevenArmorPlusReleaseName}
                        </Link><br/>
                        <span className="glupdategreen">{handledate(match.SevenArmorPlusRelease)}</span>
                    </div>
                :
                    <div>
                        <Link className="linktopage" to={`/events/banners/${match.SevenArmorPlusReleaseIndex}`}>
                            {match.SevenArmorPlusReleaseName}
                        </Link><br/>
                        <StartsInTimer expiryTimestamp={new Date(match.SevenArmorPlusRelease)} JPFlag={false}/>
                    </div>
                }
                </div>
                }
                <div className={`gearinfonameholder ${colormaker(match.GearRank)}`}>
                    <div className="displayfex">
                        <div className="splitrow">
                        <div className="geartitletext">
                        {`${match.GearName} ${match.GearRank != 80 ? match.CharID == 999 ? "" : ` (${match.Realm})` : ""}`}
                        </div>
                        <div onClick={mouseoverbutton} key={match.WeaponTag} className={`${match.WeaponTag}button undertag`}/>
                        </div>
                        <div className="gearfaceandiconholder">
                            {match.CharID != 999 ? 
                        <Link to={'/characters/' + facemaker.ShortName+'/gear'}>
                            <div className="gearfaceholder">
                            <img key={facemaker.CharacterFaceURL} alt={facemaker.CharacterName} className="gearfaceicon" src={facemaker.CharacterFaceURL}/>
                            <div className="gearfacetext">{`${facemaker.CharacterName == "Cloud of Darkness" ? "CoD" : facemaker.CharacterName == "Warrior of Light" ? "WoL" : facemaker.CharacterName}`}</div>
                        </div>
                        </Link>
                        :""}
                        </div>
                    </div>
                    {match.GearGLFlag == undefined ? "" :
                        <div className="buffglreworkbanner">
                            <Link className="updatelink" to={`/characters/${match.CharacterShortName}/reworks`}>
                                View Upcoming Reworks
                            </Link>
                        </div>
                        }
                    {match.WeaponTag == "wpfr" ?
                    <div className="buffglreworkbanner">
                        <Link className="updatelink" to={`/characters/forcetime?Char=${replacer(match.CharacterName)}`}>
                            View Force Time
                        </Link>
                    </div>
                    :""}
                </div>
                {match.GearAbilityTF == true ? 
                    <div className="inlinegearabilityiconholder">
                        {match.GearGLFlag ? 
                                <div className="toggleforgear" id="GLtoggle">
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
                        <Link to={`/characters/${match.CharacterShortName}/abilities/${abilitymaker(match.GearRank)}`}>
                        <img key={match.GearAbilityURL} className="abilityicon" alt={match.GearAbilityName} src={match.GearAbilityURL}/>
                        </Link>
                        
                        {match.GearRank == 56 ? "" :
                        <div className={match.GearRank == 95 ||match.GearRank == 90 || match.GearRank == 75 ?"inlinegearsaholderg" : "inlinegearsaholder"}>
                            <div className="gearsanumber">{match.AbilityUse}
                            </div>
                        </div>}
                        {match.GearRank == 56 ? 
                        <div className="gearablspeed">
                        {match.AbilityUse}
                        </div>
                        : 
                        <div className="gearabilityuses">
                            <span className="unique">{`Uses: `}</span>
                            <span>{match.AbilityUse}</span>
                        </div>
                        }
                         
                    </div>
                    : "" }
                <div className={`mastergearinfobanner newblue flexdisplay ${match.GearAbilityTF == true ? "nobuffpadding" : ""}`}>
                    <div className="spacearound2">
                        {match.GearRank == 80 ? "" : <span className="smallpassive" />}&nbsp;{addformatting(match.GearPassiveTitle)}
                        {match.JPName != null ?
                        <div className="abilityJPname">
                            {match.JPName}
                        </div>
                        :""}
                    </div>
                    <div className="gearCPReqHolder spacearound">
                     {match.GearRank == 80 ? "" : <span><span className="unique">Req.</span> <span className="CPIcon CPIconSmaller "/></span>}<span className="gearcpcostholder">&nbsp;{match.CPCost}</span>
                    </div>
                </div>
                {match.PassivesAmount >= 1 ?
                <div className={`gearinfobanner bluebase ${match.GearAbilityTF == true ? "nobuffpadding" : ""}`}>
                <div>
                    {match.GearSubPassiveTF == true ?
                        <div className="subpassiveflair spacearound">
                            <span className="smallpassive" /><div className="lb0 lsmallerinline"/>&nbsp;{addformatting(match.GearSubPassiveTitle)}
                        </div> : ""
                        }
                        <div className='passiveinfobase'>
                        {match.GearPassiveDesc0 == undefined ? "" : showGLToggle == false && match.GearGLFlag == true ? 
                        addformatting(match.GearPassiveDesc0GL) : 
                        addformatting(JPDesc0)
                        }
                        </div>
                    </div>
                </div>
                : ""}
                {match.PassivesAmount >= 2 ?
                <div>
                    <div className={`gearinfobanner bluebase ${match.GearAbilityTF == true ? "nobuffpadding" : ""}`}>
                    <div>
                        <div className="spacearound subpassiveflair">
                        <span className="smallpassive" /><div className={`lb1${match.CharID == 999 ? "5" : ""} lsmallerinline`}/>&nbsp;{addformatting(match.GearPassiveTitle1)}
                        </div>
                        <div className='passiveinfobase'>
                        {match.GearPassiveDesc1 == undefined ? "" : showGLToggle == false && match.GearGLFlag == true ? 
                        addformatting(match.GearPassiveDesc1GL) : 
                        addformatting(JPDesc1)
                        }
                        </div>
                    </div>
                    </div>
                </div>
                : "" }
                {match.PassivesAmount >= 3 ?
                <div>
                    <div className={`gearinfobanner bluebase ${match.GearAbilityTF == true ? "nobuffpadding" : ""}`}>
                    <div>
                    <div className="spacearound subpassiveflair">
                        <span className="smallpassive" /><div className={`lb2${match.CharID == 999 ? "5" : ""} lsmallerinline`}/>&nbsp;{addformatting(match.GearPassiveTitle2)}
                        </div>
                        <div className='passiveinfobase'>
                        {match.GearPassiveDesc2 == undefined ? "" : showGLToggle == false && match.GearGLFlag == true ? 
                        addformatting(match.GearPassiveDesc2GL) : 
                        addformatting(JPDesc2)
                        }
                        </div>
                    </div>
                    </div>
                </div>
                : "" }
                {match.PassivesAmount >= 4 ?
                <div>
                    <div className={`gearinfobanner bluebase ${match.GearAbilityTF == true ? "nobuffpadding" : ""}`}>
                    <div>
                    <div className="spacearound subpassiveflair">
                        <span className="smallpassive" /><div className={`lb3${match.CharID == 999 ? "5" : ""} lsmallerinline`}/>&nbsp;{addformatting(match.GearPassiveTitle3)}
                        </div>
                        <div className='passiveinfobase'>
                        {match.GearPassiveDesc3 == undefined ? "" : showGLToggle == false && match.GearGLFlag == true ? 
                        addformatting(match.GearPassiveDesc3GL) : 
                        addformatting(JPDesc3)
                        }
                        </div>
                    </div>
                    </div>
                </div>
                : "" }
                {match.PassivesAmount >= 5 ?
                <div>
                    <div className={`gearinfobanner bluebase ${match.GearAbilityTF == true ? "nobuffpadding" : ""}`}>
                    <div>
                    <div className="spacearound subpassiveflair">
                        <span className="smallpassive" /><div className={`lb4${match.CharID == 999 ? "5" : ""} lsmallerinline`}/>&nbsp;{addformatting(match.GearPassiveTitle4)}
                        </div>
                        <div className='passiveinfobase'>
                        {match.GearPassiveDesc4 == undefined ? "" : addformatting(match.GearPassiveDesc4)}
                        </div>
                    </div>
                    </div>
                </div>
                : "" }
                {match.PassivesAmount >= 6 ?
                <div>
                    <div className={`gearinfobanner bluebase ${match.GearAbilityTF == true ? "nobuffpadding" : ""}`}>
                    <div>
                    <div className="spacearound subpassiveflair">
                        <span className="smallpassive" /><div className={`lb5${match.CharID == 999 ? "5" : ""} lsmallerinline`}/>&nbsp;{addformatting(match.GearPassiveTitle5)}
                        </div>
                        <div className='passiveinfobase'>
                        {match.GearPassiveDesc5 == undefined ? "" : addformatting(match.GearPassiveDesc5)}
                        </div>
                    </div>
                    </div>
                </div>
                : "" }
                <BuffsforGear 
                full={match.GearRank == 51 || match.GearRank == 53 || match.GearRank == 70 ? true : false}
                match={match}
                ProcessedBuffs={ProcessedBuffs}
                jptoggledata={jptoggledata}
                />
                <table className="statstable statframe tablemobile">
                <thead className="statsflair ">
                <tr>
                    <th className="rightborder leftborder "><div className="unique">LB</div></th>
                    <th className="rightborder "><div className="unique">HP</div></th>
                    <th className="rightborder "><div className="unique">DEF</div></th>
                    <th className="rightborder "><div className="unique">iBRV</div></th>
                    <th className="rightborder "><div className="unique">mBRV</div></th>
                    <th className=" "><div className="unique">ATK</div></th>
                    <th className="blackcapborder "><div className="CPIcon CPIconSmaller"/></th>
                </tr>
                </thead>
                <tbody>
                <tr className={`statsflairperstat topborder`}>
                    <td onClick={() => setchangeiconcount(0)} className={`rightborder topborder leftborder greybackground ${match.CharID == 999 ? "click" : ""}`}><div className={`lb0${match.CharID == 999 ? "5" : ""} lsmaller`}/></td>
                    <td className="rightborder topborder">{match.HP0}</td>
                    <td className="rightborder topborder">{match.DEF0}</td>
                    <td className="rightborder topborder">{match.INTBRV0}</td>
                    <td className="rightborder topborder">{match.MAXBRV0}</td>
                    <td className="topborder">{match.ATK0}</td>
                    <td className={`whiterightborder whitetopborder blackbg ${match.LimitBreaks == 1 ? "whitebottomborder" : ""}`}>{match.CPGains0}</td>
                </tr>
                {match.LimitBreaks >= 2 ? 
                <tr className={`statsflairperstat topborder`}>
                    <td onClick={() => setchangeiconcount(1)} className={`rightborder topborder leftborder greybackground ${match.CharID == 999 ? "click" : ""}`}><div className={`lb1${match.CharID == 999 ? "5" : ""} lsmaller`}/></td>
                    <td className="rightborder topborder">{match.HP1}</td>
                    <td className="rightborder topborder">{match.DEF1}</td>
                    <td className="rightborder topborder">{match.INTBRV1}</td>
                    <td className="rightborder topborder">{match.MAXBRV1}</td>
                    <td className="topborder">{match.ATK1}</td>
                    <td className="whitetopborder blackbg whiterightborder">{match.CPGains1}</td>
                </tr>:null}
                {match.LimitBreaks >= 3 ? 
                <tr className={`statsflairperstat topborder`}>
                    <td onClick={() => setchangeiconcount(2)} className={`rightborder topborder leftborder greybackground ${match.CharID == 999 ? "click" : ""}`} ><div className={`lb2${match.CharID == 999 ? "5" : ""} lsmaller`}/></td>
                    <td className="rightborder topborder">{match.HP2}</td>
                    <td className="rightborder topborder">{match.DEF2}</td>
                    <td className="rightborder topborder">{match.INTBRV2}</td>
                    <td className="rightborder topborder">{match.MAXBRV2}</td>
                    <td className="topborder">{match.ATK2}</td>
                    <td className="whitetopborder blackbg whiterightborder">{match.CPGains2}</td>
                </tr> :null}
                {match.LimitBreaks >= 4 ? 
                <tr className={`statsflairperstat topborder ${match.LimitBreaks == 4 && match.CharID != 999  ? "statsender": ""}`}>
                    {match.CharID != 999 ?
                    <td onClick={mouseoverbutton}  className="rightborder topborder leftborder greybackground click"><div className={`lb3${match.CharID == 999 ? "5" : ""} lsmaller`}/></td>
                    :
                    <td onClick={() => setchangeiconcount(3)} className="rightborder topborder leftborder greybackground click"><div className={`lb3${match.CharID == 999 ? "5" : ""} lsmaller`}/></td>
                    }
                    <td className="rightborder topborder">{match.HP3}</td>
                    <td className="rightborder topborder">{match.DEF3}</td>
                    <td className="rightborder topborder">{match.INTBRV3}</td>
                    <td className="rightborder topborder">{match.MAXBRV3}</td>
                    <td className="topborder">{match.ATK3}</td>
                    <td className={`whitetopborder blackbg ${match.CharID == 999 ? "" : "whitebottomborder"} whiterightborder `}>{match.CPGains3}</td>
                </tr> :null}
                {match.LimitBreaks >= 5 ? 
                <tr className={`statsflairperstat topborder`}>
                    <td onClick={() => setchangeiconcount(4)} className="rightborder topborder leftborder greybackground click"><div className={`lb4${match.CharID == 999 ? "5" : ""} lsmaller`}/></td>
                    <td className="rightborder topborder">{match.HP4}</td>
                    <td className="rightborder topborder">{match.DEF4}</td>
                    <td className="rightborder topborder">{match.INTBRV4}</td>
                    <td className="rightborder topborder">{match.MAXBRV4}</td>
                    <td className="topborder">{match.ATK4}</td>
                    <td className={`whitetopborder blackbg ${match.CharID == 999 ? "" : "whitebottomborder"} whiterightborder `}>{match.CPGains4}</td>
                </tr> :null}
                {match.LimitBreaks >= 6 ? 
                <tr className={`statsflairperstat topborder ${match.LimitBreaks == 6 ? "statsender": ""}`}>
                    <td onClick={() => setchangeiconcount(5)} className="rightborder topborder leftborder greybackground click"><div className={`lb5${match.CharID == 999 ? "5" : ""} lsmaller`}/></td>
                    <td className="rightborder topborder">{match.HP5}</td>
                    <td className="rightborder topborder">{match.DEF5}</td>
                    <td className="rightborder topborder">{match.INTBRV5}</td>
                    <td className="rightborder topborder">{match.MAXBRV5}</td>
                    <td className="topborder">{match.ATK5}</td>
                    <td className={`whitetopborder blackbg ${match.CharID == 999 ? "whitebottomborder" : ""} whiterightborder `}>{match.CPGains5}</td>
                </tr> :null}
                </tbody>
                </table>
                </LazyLoadComponent>
            </div>
        </div>
    )
}

export default GearFormatting;