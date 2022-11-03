import React, {useState, useEffect} from 'react';
import { useDispatch } from "react-redux";
import { setFalse, setTrue } from '../redux/ducks/jptoggle'
import DefaultTippy from './TippyDefaults.js';
import useTimer from '../usetimer/UseTimer'
import '../Buffs.css';
import { Link } from 'react-router-dom'
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import BuffsforBattleState from './BuffsforBattleState'
import { getQuery, getQueryStringVal, useQueryParam } from '../processing/urlparams'
import addformatting from '../processing/replacer_buffcontent';
import addformatting_title from '../processing/replacer_abilitycontent';

const BuffsFormatting = ({ProcessedBuffs, match , jptoggledata}) => {

    const dispatch = useDispatch();

    const [showGLToggle, setShowGLToggle] = useState(false);

    useEffect(() => {
        if(match.JPFlag == true){
            setShowGLToggle(jptoggledata)
        } else {
            setShowGLToggle(false)
        }

    }, [jptoggledata,match.JPFlag])

    const urlmaker = (rank) => {
        if(rank === "BTBuff" ){
            return "bt"
        }
        if(rank === "CallBuff" ){
            return "call"
        }
        if(rank === "LDBuff" ){
            return "ld"
        }
        if(rank === "EXBuff" ){
            return "ex"
        }
        if(rank === "ABuff" ){
            return "aa"
        }
        if(rank === "S1Buff" ){
            return "s1"
        }
        if(rank === "S2Buff" ){
            return "s2"
        }
        if(rank === "FRBuff" ){
            return "fr"
        }
        if(rank === "BState" ){
            return "battlestate"
        }

    } 

    const [JPsearch, setJPSearch] = useQueryParam("JP", "");
    const [desc, setdesc] = useState(showGLToggle == false && match.JPFlag == true ? match.BuffDescGL : match.BuffDesc)
    const [BStatebuffs, setBStatebuffs] = useState([])

    useEffect(() => {
        if(showGLToggle == false && match.JPFlag == true ){
            setdesc(" "+ match.BuffDescGL)
        } else{
            setdesc(" "+ match.BuffDesc)
        }
    },[match.BuffDesc,match.BuffDescGL,match.JPFlag,showGLToggle])

      //unique
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

    useEffect(() => {
    const split = desc && desc.match(/(\[[^[]*\])/gm, '') 
    if(match.BuffFlag === "BState" ){
        let holder = []
        if(split != null || split != undefined){
        split.map(buff =>{
            const dapusher = ProcessedBuffs.filter((allbuffs) =>{
                return allbuffs.CharID == match.CharID}).filter((allbuffs) =>{
                    return allbuffs.BuffName == buff})
            if(dapusher.length != 0){
                holder.push(dapusher[0])
            }
        })
        const newholder = holder.filter(onlyUnique)
        setBStatebuffs(newholder)
        }
    }
    }, [ProcessedBuffs,desc,match.CharID,match.BuffFlag])

    const handletoggle = (showGLToggle) =>{
        if(showGLToggle == false){
            dispatch(setTrue())
            setJPSearch("true")
        } else {
            dispatch(setFalse())
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
      return monthstext[new Date(date).getMonth()] + " " + new Date(date).getFullYear()
    }

    function StartsInTimer({ expiryTimestamp }) {
        const {
            seconds,
            minutes,
            hours,
            days
        } = useTimer({ expiryTimestamp});
        return (
                <div><span className="glupdategreen">{`${days == 0 ? "" : days < 2 ? days + " Day " : days + " Days "}${hours == 0 ? "" : hours < 2 ? hours + " Hour " : hours+ " Hours "}${minutes == 0 ? "" : minutes < 2 ? minutes+ " Minute " : minutes + " Minutes "}${seconds == 0 ? "" : seconds < 2 ? seconds + " Second" : seconds + " Seconds"}`}</span></div>
            );
        }

    const replacer=(e)=>{
        var newtext = e&&e.replace(/&/gm,"%26")
        return newtext
    }

    return(
        <div className="buffunit">
            <div className="infoholder" style={{ minHeight: "140px"}}>
                <LazyLoadComponent>
                <div className="infotitleholder">
                    <div className="faceandiconholder">
                        <Link to={`/characters/` + match.CharacterShortName+`/buffs`}>
                        <div className="faceholder">
                            <LazyLoadImage effect="opacity" alt={match.CharacterName} className="faceicon" src={"https://dissidiacompendium.com/images/static/characters/" + match.CharacterFaceURL + "/face.png"}/>
                            <div className="facetext">{`${match.CharacterName == "Cloud of Darkness" ? "CoD" : match.CharacterName == "Warrior of Light" ? "WoL" : match.CharacterName}`}</div>
                        </div>
                        </Link>
                        <Link to={`/characters/` + match.CharacterShortName+`/buffs/${urlmaker(match.BuffFlag)}`}>
                        <div className="infoiconholder">
                          <LazyLoadImage effect="opacity" className="bufficon" alt={match.BuffNameDisplay && match.BuffNameDisplay} src={`https://dissidiacompendium.com/images/static/icons/${jptoggledata == true && match.JPBuffURL != undefined ? match.JPBuffURL : match.BuffURL}`}/>
                        </div>
                        </Link>
                            {match.JPFlag ? 
                                <div className="toggleforbuffs" id="GLtoggle">
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
                </div>
                <div className={match.BuffType + "banner infonameholder wpadding"}>
                    <div className="infotitle">
                        {match.BuffFlag == "BState" ? 
                          <span className="values">{match.BuffNameDisplay && addformatting_title(match.BuffNameDisplay)}</span>
                        : <Link className="linktopage" to={"/"+match.URLLocation}>
                            {match.BuffNameDisplay && addformatting_title(match.BuffNameDisplay)}
                        </Link>}
                        {match.JPName && 
                        <div className="abilityJPname">
                        {match.JPName && addformatting_title(match.JPName)}
                        </div>}
                    </div>
                    <div className="infolocation">
                        {addformatting_title(`Granted from ${match.BuffLocation == undefined ? "" : match.BuffLocation}`)}
                    </div>
                    {match.Rework == undefined ? "" :
                    <div className="buffglreworkbanner">
                         {match.Rework == undefined ? "" :
                        <Link className="updatelink" to={`/characters/${match.CharacterShortName}/reworks`}>
                            View Upcoming Reworks
                        </Link>
                            }
                    </div>
                    }
                    {match.BuffFlag == "FRBuff" && match.BuffName && match.BuffName.search("(F)") != -1 ?
                    <div className="buffglreworkbanner">
                        <Link className="updatelink" to={`/characters/forcetime?Char=${replacer(match.CharacterName)}`}>
                            View Force Time
                        </Link>
                    </div>
                    :""}
                </div>
                <div className={match.BuffType + "base infobase wpadding"}>
                    {match.BuffFlag == "BState" ? 
                    <div>
                    {showGLToggle == false && match.JPFlag == true ? 
                        match.BuffDescGL == undefined ? <span className="unique">*Not in GL*</span> : addformatting(" "+ match.BuffDescGL):
                        match.BuffDesc == undefined ? <span className="unique">*Not in JP*</span> : addformatting(" "+ match.BuffDesc)}
                    </div>
                    :
                    <div>
                    {showGLToggle == false && match.JPFlag == true ? 
                    addformatting("From " + match.BuffIcon + "\n" + match.BuffDescGL == undefined || match.BuffDescGL == "" ? "" : match.BuffDescGL && " "+ match.BuffDescGL):
                    addformatting("From " + match.BuffIcon + "\n" + match.BuffDesc == undefined || match.BuffDesc == "" ? "" : match.BuffDesc && " "+ match.BuffDesc) }
                    </div>
                    }
                </div>
                {match.BuffFlag === "BState" && BStatebuffs.length != 0 ?
                <BuffsforBattleState 
                key={BStatebuffs}
                ProcessedBuffs={ProcessedBuffs}
                bufflist={BStatebuffs}
                full={false}
                jptoggledata={jptoggledata}
                />
                :""}
                </LazyLoadComponent>
            </div>
        </div>
    )
}

export default BuffsFormatting;