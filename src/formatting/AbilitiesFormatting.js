import React, {useState, useEffect} from 'react';
import { useDispatch } from "react-redux";
import { setFalse, setTrue } from '../redux/ducks/jptoggle'
import DefaultTippy from './TippyDefaults.js';
import '../Abilities.css';
import Tippy from '../formatting/TippyDefaults.js';
import useTimer from '../usetimer/UseTimer'
import { Link } from 'react-router-dom'
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import BuffHandoff from '../passoff/SingleBuffFormatting.js'
import { getQuery, getQueryStringVal, useQueryParam } from '../processing/urlparams'
import addformatting from '../processing/replacer_abilitycontent';

const AbilityFormatting = ({match, ProcessedBuffs, jptoggledata}) => {

    const dispatch = useDispatch();
    const [JPsearch, setJPSearch] = useQueryParam("JP", "");
    const [makestartingbuffs, setmakestartingbuffs] = useState(false)
    const [atqueststart,setatqueststart] = useState([])
    const [atqueststartebuffs, setatqueststartebuffs] = useState([])
    const [atwavestart,setatwavestart] = useState([])
    const [atwavestartbuffs,setatwavestartbuffs] = useState([])
    const [queststart,setqueststart] = useState([])
    const [wavestart,setwavestart] = useState([])
    const [allbuffs,setallbuffs] = useState([])

    const [showGLToggle, setShowGLToggle] = useState(false);
    const [selectedbuff, setselectedbuff] = useState([]);

    useEffect(() => {
        if(match.Tree == "C. Lv75 Tree" || match.Tree == "Limited Call Tree"){
            if(match.AbilityUses != "∞"){
                setmakestartingbuffs(true)
            }
        }
    },[match.Tree,match.AbilityUses])

    useEffect(() => {
        if(JPsearch == false){
            if(match.GLFlag == true){
                const desc = match.GLDesc
                const split = desc && desc.match(/(\[[^[]*\])/gm, '') 
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
                setallbuffs(newholder)
                }
            } else {
                const desc = match.Desc
                const split = desc && desc.match(/(\[[^[]*\])/gm, '') 
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
                setallbuffs(newholder)
                }
            }
        } else {
            if(match.GLFlag == true){
                const desc = match.GLDesc
                const split = desc && desc.match(/(\[[^[]*\])/gm, '') 
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
                setallbuffs(newholder)
                }
            } else {
                const desc = match.Desc
                const split = desc && desc.match(/(\[[^[]*\])/gm, '') 
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
                setallbuffs(newholder)
                }
            }
        }
    },[JPsearch,match,ProcessedBuffs])

    useEffect(() => {
        if(makestartingbuffs == true){
            const pullbuffstarting = ProcessedBuffs.filter(self=>{
                return self.CharID == match.CharID && self.BuffName == "At start of quest:"
            })
            setqueststart(pullbuffstarting[0])
            if(pullbuffstarting.length != 0){
                setatqueststart({jp: pullbuffstarting[0].BuffDesc,gl: pullbuffstarting[0].BuffDescGL})
            }
            const pullbuffwave = ProcessedBuffs.filter(self=>{
                return self.CharID == match.CharID && self.BuffName == "At start of wave:"
            })
            setwavestart(pullbuffwave[0])
            if(pullbuffwave.length != 0){
                setatwavestart({jp: pullbuffwave[0].BuffDesc,gl: pullbuffwave[0].BuffDescGL})
            }
        }
    },[makestartingbuffs,ProcessedBuffs,match.CharID])

          //unique
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

    useEffect(() => {
        if(JPsearch == false && queststart && queststart.JPFlag == true ){
            //GL
            if(atqueststart.length != 0){
                const desc = atqueststart.gl
                const split = desc && desc.match(/(\[[^[]*\])/gm, '') 
                let holder = []
                holder.push(queststart)
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
                setatqueststartebuffs(newholder)
                }
            }
        } else{
            //JP
            if(atqueststart.length != 0){
                const desc = atqueststart.jp
                const split = desc && desc.match(/(\[[^[]*\])/gm, '') 
                let holder = []
                holder.push(queststart)
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
                setatqueststartebuffs(newholder)
                }
            }
        }
        if(JPsearch == false && wavestart && wavestart.JPFlag == true ){
            //GL
            if(atwavestart.length != 0){
                const desc = atwavestart.gl
                const split = desc && desc.match(/(\[[^[]*\])/gm, '') 
                let holder = []
                holder.push(wavestart)
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
                setatwavestartbuffs(newholder)
                }
            }
        } else {
            //JP
            if(atwavestart.length != 0){
                const desc = atwavestart.jp
                let holder = []
                holder.push(wavestart)
                const split = desc && desc.match(/(\[[^[]*\])/gm, '') 
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
                setatwavestartbuffs(newholder)
                }
            }
        }
    },[JPsearch,queststart,wavestart, match.BuffDesc,match.BuffDescGL,match.JPFlag,showGLToggle,ProcessedBuffs,atqueststart.gl,atqueststart.jp,atqueststart.length,match.CharID,atwavestart.length,atwavestart.jp,atwavestart.gl])

    useEffect(() => {
        if(getQueryStringVal("JP") == "true" ){
          dispatch(setTrue())
          setJPSearch("true")
        } else {
          dispatch(setFalse())
          setJPSearch("")
        }

      },[setJPSearch,dispatch])

    const trogglebutton = (showGLToggle) =>{
        if(showGLToggle == false){
            setJPSearch("true")
        } else {
            setJPSearch("")
        }
        setShowGLToggle((prevValue) => !prevValue);
        setselectedbuff([])
    }

    useEffect(() => {
        if(match.GLFlag == true){
            setShowGLToggle(jptoggledata)
        } else {
            setShowGLToggle(false)
        }
    }, [jptoggledata,match.GLFlag])

    const TreeTranslator = (tree) =>{
        if(tree.search("BRV Tree") != -1 ){
            return "brvattackiconbutton"
        }
        if(tree == "HP Tree"){
            return "hpplusattackicon"
        }
        if(tree == "Starting Tree"){
            return "startingability"
        }
        if(tree == "C. Lv20 Tree"){
            return "cl20"
        }
        if(tree == "C. Lv65 Tree"){
            return "cl65"
        }
        if(tree == "EX Tree"){
            return "wpex"
        }
        if(tree == "Limited Tree"){
            return "wpld"
        }
        if(tree == "Burst Tree"){
            return "wpbt"
        }
        if(tree == "FR Tree"){
            return "wpfr"
        }
        if(tree == "C. Lv75 Tree"){
            return "call1"
        }
        if(tree == "Limited Call Tree" ){
            return "call2"
        }
    }
    const abilityloc = (tree) =>{
        if(tree.search("BRV Tree") != -1 ){
            return "brv"
        }
        if(tree == "HP Tree"){
            return "hp"
        }
        if(tree == "Starting Tree"){
            return "s1"
        }
        if(tree == "C. Lv20 Tree"){
            return "s2"
        }
        if(tree == "C. Lv65 Tree"){
            return "aa"
        }
        if(tree == "EX Tree"){
            return "ex"
        }
        if(tree == "Limited Tree"){
            return "ld"
        }
        if(tree == "Burst Tree"){
            return "burst"
        }
        if(tree == "FR Tree"){
            return "fr"
        }
        if(tree == "C. Lv75 Tree"){
            return "call75"
        }
        if(tree == "Limited Call Tree" ){
            return "callld"
        }
    }


        const buffselect = (buffs) =>{
            if(selectedbuff == buffs ){
                setselectedbuff([])
            } else {
            setselectedbuff(buffs)
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

    const minH = window.innerWidth <= 800 ? 210 : 220;

    const replacer=(e)=>{
        var newtext = e&&e.replace(/&/gm,"%26")
        return newtext
    }

    return(
        <div key={match.AbilityKey + "unit"} className="buffunit">
            <div className="infoholder" style={{ minHeight: `${minH}px`}}>
                <LazyLoadComponent>
                <div className="infotitleholder">
                    <div className="faceandiconholder">
                        <Link to={`/characters/${match.CharacterShortName}/abilities`}>
                        <div className="faceholderpassives">
                            <LazyLoadImage effect="opacity" alt={match.CharacterName} className="faceicon" src={`https://dissidiacompendium.com/images/static/characters/${match.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"")}/face.png`}/>
                            <div className="facetext">
                                {match.CharacterName == "Cloud of Darkness" ? "CoD" : match.CharacterName == "Warrior of Light" ? "WoL" : match.CharacterName}
                            </div>
                        </div>
                        </Link>
                        {match.GLFlag ? 
                        <div className="toggleforabilities" id="GLtoggle">
                            <DefaultTippy content={showGLToggle ? "JP Current" : "GL Current"} className="tooltip" placement="bottom" hideOnClick={false}>
                                <div className={showGLToggle ? "switch switchchecked": "switch switchunchecked"}  onClick={() => trogglebutton(showGLToggle)}>
                                    <div className={showGLToggle ? "slider sliderchecked": "slider sliderunchecked" } >
                                    </div>
                            </div>
                            </DefaultTippy>
                        </div>
                        : 
                        ""
                        }
                        {match.JPURL != undefined ?
                        <div className="abilityiconholder">
                            <Link className="abilityurlholder" to={`/characters/${match.CharacterShortName}/abilities/${abilityloc(match.Tree)}`}>
                                <LazyLoadImage effect="opacity" className="abilityicon" alt={match.AbilityName} src={showGLToggle != true && match.GLFlag == true ? match.GLURL : match.JPURL}/>
                                {match.AbilityRank == 6 && match.Trap != true && match.Counter != true && match.FollowUp != true? 
                                <div className="abilityblspeed">
                                {showGLToggle != true && match.GLFlag == true ? match.GLAbilityUses : match.JPAbilityUses}
                                </div>:""}
                            </Link>
                            {match.AbilityRank != 6 || match.Trap == true || match.Counter == true || match.FollowUp == true? 
                            <div className={match.AbilityRank == 8 || match.AbilityRank == 9 || match.AbilityRank == 21 ? 
                                match.Trap != true && match.Counter != true && match.FollowUp != true ? "saholderg" : "saholder": "saholder"}>
                                <div className="sanumber">{showGLToggle != true && match.GLFlag == true ?  match.GLAbilityUses : match.JPAbilityUses}</div>
                            </div>:""}
                        </div> : ""}
                    </div>
                </div>
                <div className={`bluebanner infonameholder nobuffpadding `}>
                    <div className="displayfex">
                        <div className="splitrow">
                            <div className={`infotitle abilitydisplayfex `}>
                                {addformatting(`${match.AbilityName} ${showGLToggle != true && match.GLFlag == true ? match.GLAbilityTags == undefined ? "" : match.GLAbilityTags : match.JPAbilityTags == undefined ? "" : match.JPAbilityTags}`)}
                            </div>
                            <div className="infolocation">
                                {match.JPName != null ?
                                <div className="abilityJPname">
                                {match.JPName}
                                <br></br>
                                </div>
                                :""}
                                <Tippy content={match.Tree}>
                                    <span className={`${TreeTranslator(match.Tree)} undertaga`} />
                                </Tippy>
                                &nbsp;from&nbsp;
                                <Tippy content={"Location Granted"}>
                                <span className={`${showGLToggle != true && match.GLFlag == true ?  match.GLLocationTag : match.JPLocationTag } undertaga`}/>
                                </Tippy>
                            </div>
                        </div>
                        {match.JPAbilityUsesDesc == undefined ? "" :
                        <div className="usesmaker">
                            <div className="sidewaystextholder">
                                <div className="sidewaystext unique">{match.Tree == "EX Tree" && match.Trap != true && match.FollowUp != true && match.Counter != true ? "Speed":""}{match.Tree == "Burst Tree" || match.Tree == "FR Tree" && match.Trap != true && match.FollowUp != true && match.Counter != true ? "Turns":""}{match.Tree != "Burst Tree" && match.Tree != "FR Tree" && match.Tree != "EX Tree" && match.Tree != "BRV Tree" && match.Tree != "HP Tree" && match.Trap != true && match.FollowUp != true && match.Counter != true ? "Uses":""}</div>
                            </div>
                        <div className="abilityusesholder">
                            {showGLToggle != true && match.GLFlag == true ?  addformatting(match.GLAbilityUsesDesc) : addformatting(match.JPAbilityUsesDesc)}
                        </div>
                        </div>}
                    </div> 
                    {match.Rework == undefined ? "" :
                    <div className="abilityglreworkbanner">
                        {match.Rework == undefined ? "" :
                        <Link className="updatelink" to={`/characters/${match.CharacterShortName}/reworks`}>
                            View Upcoming Reworks
                        </Link>
                            }
                    </div>
                    }
                    {match.Tree == "FR Tree" ?
                    <div className="buffglreworkbanner">
                        <Link className="updatelink" to={`/characters/forcetime?Char=${replacer(match.CharacterName)}`}>
                            View Force Time
                        </Link>
                    </div>
                    :""}
                </div>
                <div className={`bluebase abilityinfobase `}>
                    {showGLToggle != true && match.GLFlag == true ?  
                        match.GLDesc && addformatting(match.GLDesc)
                        : 
                        match.JPDesc && addformatting(match.JPDesc)
                    } 
                </div>
                {allbuffs.length == 0 && atqueststartebuffs == 0 && atwavestartbuffs == 0 ? "" :
                match.GLFlag == undefined || showGLToggle == true  ? 
                <div className={`bufflistbanner noselect newblue`}>
                {allbuffs.length == 0? "" : 
                    <div> 
                    <div className="unique ailmenttext">Buffs / Debuffs:</div>
                    <ul className="abilitybufflist">  
                    {allbuffs.map(function(buffs){
                    return <li className={`abilitybufficonsholder ${selectedbuff == buffs ? "buffactive" : ""}`} key={buffs.BuffKey}>
                            <div className="biconspacer" onClick={() => buffselect(buffs)} >
                                <Tippy content={buffs.BuffNameDisplay && addformatting(buffs.BuffNameDisplay)}>
                                <img alt={buffs.BuffNameDisplay} className={`clicky abilitybufficon `} src={`https://dissidiacompendium.com/images/static/icons/${jptoggledata == true && buffs.JPBuffURL != undefined ? buffs.JPBuffURL : buffs.BuffURL}`} />
                                </Tippy>
                            </div>
                        </li>;
                    })}
                </ul>
                </div>}
                {atqueststartebuffs == 0? "" :
                <div>
                    <div className="unique ailmenttext">Start Of Quest:</div>
                    <ul className="abilitybufflist">
                    {atqueststartebuffs.map(function(buffs){
                    return <li className={`abilitybufficonsholder ${selectedbuff == buffs ? "buffactive" : ""}`} key={buffs.BuffKey}>
                                <div className="biconspacer" onClick={() => buffselect(buffs)} >
                                <Tippy content={buffs.BuffNameDisplay && addformatting(buffs.BuffNameDisplay)}>
                                <img alt={buffs.BuffNameDisplay} className="clicky abilitybufficon" src={`https://dissidiacompendium.com/images/static/icons/${jptoggledata == true && buffs.JPBuffURL != undefined ? buffs.JPBuffURL : buffs.BuffURL}`} />
                                </Tippy>
                                </div>
                        </li>;
                    })}
                </ul>
                </div>}

                {atwavestartbuffs == 0? "" :
                <div>
                    <div className="unique ailmenttext">Start Of Wave:</div>
                    <ul className="abilitybufflist">
                    {atwavestartbuffs.map(function(buffs){
                    return <li className={`abilitybufficonsholder ${selectedbuff == buffs ? "buffactive" : ""}`} key={buffs.BuffKey}>
                                <div className="biconspacer" onClick={() => buffselect(buffs)} >
                                <Tippy content={buffs.BuffNameDisplay && addformatting(buffs.BuffNameDisplay)}>
                                <img alt={buffs.BuffNameDisplay} className="clicky abilitybufficon" src={`https://dissidiacompendium.com/images/static/icons/${jptoggledata == true && buffs.JPBuffURL != undefined ? buffs.JPBuffURL : buffs.BuffURL}`} />
                                </Tippy>
                                </div>
                        </li>;
                    })}
                </ul>
                </div>}
                </div> :""}
                {allbuffs.length == 0 && atqueststartebuffs == 0 && atwavestartbuffs == 0 ? "" :
                match.GLFlag == true && showGLToggle == false  ? 
                <div className={`bufflistbanner noselect newblue`}>
                {allbuffs == 0? "" :
                    <div>
                    <div className="unique ailmenttext">Buffs / Debuffs:</div>
                    <ul className="abilitybufflist">
                    {allbuffs.map(function(buffs){
                    return <li className={`abilitybufficonsholder ${selectedbuff == buffs ? "buffactive" : ""}`} key={buffs.BuffKey}>
                                <div className="biconspacer" onClick={() => buffselect(buffs)} >
                                <Tippy content={buffs.BuffNameDisplay && addformatting(buffs.BuffNameDisplay)}>
                                <img alt={buffs.BuffNameDisplay} className="clicky abilitybufficon" src={`https://dissidiacompendium.com/images/static/icons/${jptoggledata == true && buffs.JPBuffURL != undefined ? buffs.JPBuffURL : buffs.BuffURL}`} />
                                </Tippy>
                                </div>
                        </li>;
                    })}
                </ul>
                </div>}
                {atqueststartebuffs == 0? "" :
                <div>
                    <div className="unique ailmenttext">Start Of Quest:</div>
                    <ul className="abilitybufflist">
                    {atqueststartebuffs.map(function(buffs){
                    return <li className={`abilitybufficonsholder ${selectedbuff == buffs ? "buffactive" : ""}`} key={buffs.BuffKey}>
                                <div className="biconspacer" onClick={() => buffselect(buffs)} >
                                <Tippy content={buffs.BuffNameDisplay && addformatting(buffs.BuffNameDisplay)}>
                                <img alt={buffs.BuffNameDisplay} className="clicky abilitybufficon" src={`https://dissidiacompendium.com/images/static/icons/${jptoggledata == true && buffs.JPBuffURL != undefined ? buffs.JPBuffURL : buffs.BuffURL}`} />
                                </Tippy>
                                </div>
                        </li>;
                    })}
                </ul>
                </div>}

                {atwavestartbuffs == 0? "" :
                <div>
                    <div className="unique ailmenttext">Start Of Wave:</div>
                    <ul className="abilitybufflist">
                    {atwavestartbuffs.map(function(buffs){
                    return <li className={`abilitybufficonsholder ${selectedbuff == buffs ? "buffactive" : ""}`} key={buffs.BuffKey}>
                                <div className="biconspacer" onClick={() => buffselect(buffs)} >
                                <Tippy content={buffs.BuffNameDisplay && addformatting(buffs.BuffNameDisplay)}>
                                <img alt={buffs.BuffNameDisplay} className="clicky abilitybufficon" src={`https://dissidiacompendium.com/images/static/icons/${jptoggledata == true && buffs.JPBuffURL != undefined ? buffs.JPBuffURL : buffs.BuffURL}`} />
                                </Tippy>
                                </div>
                        </li>;
                    })}
                </ul>
                </div>}

                </div> :""}
                {selectedbuff.length == 0 ? "" :
                <BuffHandoff match={selectedbuff} jptoggledata={jptoggledata}/>
                }
                </LazyLoadComponent>
            </div>
        </div>
    )
}

export default AbilityFormatting;