import React, {useState, useEffect } from 'react';
import './CharacterPage.css'
import { useDispatch, useSelector } from "react-redux";
import { setFalse, setTrue } from '../redux/ducks/jptoggle'
import { getJPToggle } from '../redux/ducks/jptoggle';
import DefaultTippy from '../formatting/TippyDefaults.js';
import { Link } from 'react-router-dom'
import OhNo from './OhNo.js'
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { ImArrowRight } from 'react-icons/im';
import { ImArrowLeft }  from 'react-icons/im';
import { FaShareSquare } from 'react-icons/fa';
import Tippy from '@tippyjs/react';
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/scale-subtle.css';
import 'tippy.js/animations/scale-extreme.css';
import {getQuery, getQueryStringVal,useQueryParam } from '../processing/urlparams'
import Random from '../processing/Random.js'
import DevSwitch from '../redux/DevSwitch';

const CharPageHeader = ({nextevent, 
                        previousevent, 
                        headertitle,
                        Subheader, 
                        newmatch, 
                        pageloc, 
                        subcat,
                        brvattack,
                        hpattacks,
                        s1attacks,
                        s2attacks,
                        aaattacks,
                        exattacks,
                        ldattacks,
                        frattacks,
                        btattacks,
                        call75attacks,
                        callldattacks,
                        btbuffs,
                        callbuffs,
                        ldbuffs,
                        exbuffs,
                        aabuffs,
                        s2buffs,
                        frbuffs,
                        s1buffs,
                        bstatebuffs,
                        skin,
                        onlyarmor,
                        onlyweapons,
                        weaponbtplus,
                        weaponbt,
                        weaponexplus,
                        weaponld,
                        weaponex,
                        weapondark,
                        weapon35,
                        weaponnt,
                        weaponfr,
                        weaponwoi,
                        weapon15,
                        weapon4,
                        armor7plus,
                        armor7,
                        armorhgplus,
                        armorhg,
                        armor35,
                        armor4,
                        bloom,
                        boardfr,
                        board5,
                        frecho,
                        frext,
                        board4,
                        board3,
                        board2,
                        board1,
                        crystal,
                        ldext,
                        ldcall,
                        ldcallext,
                        cl90,
                        cl88,
                        cl85,
                        cl80,
                        cl78,
                        cl75,
                        cl70,
                        cl68,
                        cl65,
                        cl60,
                        cl58,
                        cl55,
                        cl54,
                        cl50,
                        cl45,
                        cl40,
                        cl35,
                        cl30,
                        cl25,
                        cl20,
                        cl15,
                        cl10,
                        cl5,
                        cl1,
                        artifacts,
                        nonext,
                        match,
                        Access,
                        direct_loc
                    }) => {

    const dispatch = useDispatch();
    const [showFilter, setShowFilter] = useState(true);
    const [showInfo, setshowInfo] = useState(false);
    const [random, setrandom] = useState(Random(7));
    const [check,setcheck] = useState()

    const jptoggledata = useSelector((state) => 
    state.toggle.toggle
    );

    useEffect(() => {
        let mounted = true
        if (mounted) {
            if(subcat == "direct" && check == undefined){
                axios.get(`https://www.dissidiacompendium.com/maint/dir/enance.json`,{'muteHttpExceptions': true}).then((res) => {
                const response = res.data;
                setcheck(response && response.maintenance)
                }).catch(function(err) {
                    console.log(err)
                })
            }
        }
        return function cleanup() {
            mounted = false
        }
    },[subcat,check])

    useEffect(() => {
        let mounted = true
        if (mounted) {
        dispatch(getJPToggle());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch]);

    const [JPsearch, setJPSearch] = useQueryParam("JP", "");

    const [showGLToggle, setShowGLToggle] = useState(jptoggledata);

    const [ver,setver] = useState(jptoggledata == true ? "JP": "GL")

    useEffect(() => {
        setver(jptoggledata == true ? "JP": "GL")
    },[jptoggledata,setver])
    
    const url = window.location.href

    //jp params
  useEffect(() => {
    if(getQueryStringVal("JP") == "true" ){
      dispatch(setTrue())
      setJPSearch("true")
      setShowGLToggle(true)
    } else {
      dispatch(setFalse())
      setJPSearch("")
    }
  },[setJPSearch,dispatch])

    useEffect(() => {
        if(jptoggledata == true ){
          setJPSearch("true")
        }
        if(getQueryStringVal("JP") == "true" ){
          dispatch(setTrue())
        }
      },[jptoggledata,dispatch,setJPSearch])

    const handletoggle = (toggle) =>{
        if(toggle == false){ 
          setShowGLToggle(true)
          dispatch(setTrue())
          setJPSearch("true")
    
        } else {
          setShowGLToggle(false)
          dispatch(setFalse())
          setJPSearch("")
        }
      }

      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  
      function ordinal(n) {
          var s = ["th", "st", "nd", "rd"];
          var v = n%100;
          return n + (s[(v-20)%10] || s[v] || s[0]);
        }

    return(
        <div>
            {nextevent == false || nonext == true ? "":
            <Link to={`/characters/${nextevent.ShortName}/${subcat == undefined || subcat == "none" ? "" : subcat}${pageloc == "spheres" ? "spheres" : ""}${subcat == "events" ? `/${pageloc}` : "" }${pageloc == "community" ? "community" : ""}`}>
            <DefaultTippy content={nextevent.CharacterName} className="tooltip" >
            <div className="nextbutton">
                <ImArrowRight className="nexticon"/>
            </div>
            </DefaultTippy>
            </Link>}
            {previousevent == false || nonext == true ? "":
            <Link to={`/characters/${previousevent.ShortName}/${subcat == undefined || subcat == "none" ? "" : subcat}${pageloc == "spheres" ? "spheres" : ""}${subcat == "events" ? `/${pageloc}` : "" }${pageloc == "community" ? "community" : ""}`}>
            <DefaultTippy content={previousevent.CharacterName} className="tooltip" >
            <div className="previousbutton">
                <ImArrowLeft className="previousicon"/>
            </div>
            </DefaultTippy>
            </Link>}
            {headertitle}
                <div className="subheader">{Subheader}</div>
                {Subheader == "Direct" ?
                <Link to={'/directguide'}>
                <div className="bluebutton" onClick={() => setshowInfo(!showInfo)}>
                   <span className="guidetext clicky"></span>
                </div>
                </Link>
                :""}
                {match.params.type == "boardfr" || match.params.type == "frweapon"?
                <div className="filterinfopad" onClick={() => setshowInfo(!showInfo)}>
                    <span className="infotext"></span>{showInfo ? <TiArrowSortedUp className="uparrow"/> : <TiArrowSortedDown className="downarrow"/>}
                    </div>
                    :
                Subheader != "Direct" ?
                 <div className="filterpadding"></div>
                :""}
                
                    <CopyToClipboard text={url}>
                        <div className="characterpageshare">
                            <Tippy content="Link Copied!" inertia={true} animation={"shift-away"} touch={true} arrow={false} trigger={"click"} placement={"bottom"} duration={[100,500]}>
                                <div className="sharebutton automarg"><div className="centertext"><FaShareSquare className="shareicon"/>&nbsp;Share Page</div></div>
                            </Tippy>
                        </div>
                    </CopyToClipboard>
                    <div key="filter1" onClick={() => setShowFilter(!showFilter)} className="sharefilter"><span className="jumptext"></span>{showFilter ? <TiArrowSortedUp className="uparrow"/> : <TiArrowSortedDown className="downarrow"/>}</div>
                    {match.params.type == "boardfr" || match.params.type == "frweapon"?
                <div className="filterholderpages noselect" id={showInfo ? "showfilteren" : "hiddenfilteren"}>
                <div className="similarbanner">Force Info</div> 
                        <div className="ultimainfo darkerbg">
                        <div className="yellowcolor">{"Force Gauge active in battle with FR Weapon or Force Enhancement Passive"}</div><br/>
                        <div className="yellowcolor">{"Force Gauge increases every turn, Force Ability is usable at 100%"}</div><br/>
                        <div className="yellowcolor">{"Force Time only possible with a Character that can use a Force Ability"}</div><br/>
                        <div className="yellowcolor">{"Force Abilities can be used during Burst but do not start Force Time"}</div><br/>
                        <div className="yellowcolor">{"Force Time decreases during Burst Phase"}</div><br/>
                        <div className="yellowcolor">{"Force Time increases HP Damage dealt and provides other enhancements"}</div><br/>
                        <div className="yellowcolor">{"Enhancement Passives provide Force enhancements without needing a FR Weapon"}</div>
                        </div>
                        <div className="similarbanner">Needed</div> 
                        <div className="ultimainfo darkerbg">
                        <span className="hiorbm"></span>{" x12 High Power Stone for "}<div className="ultimayellowcolor">{"full MLB"}</div>{", "}<span className="hiorbm"></span>{" x4 per "}<div className="ultimayellowcolor">{"Limit Break"}</div><br/><br/>
                        <span className="orbm"></span>{" x20 Power Stone makes "}<span className="hiorbm"></span>{"x1 "}<div className="ultimayellowcolor">{"High Power Stone"}</div><br/><br/>
                        <span className="orbm"></span>{" x240 needed for "}<div className="ultimayellowcolor">{" MLB "}</div><span className="gorbm"></span>{" x170 "}<div className="ultimayellowcolor">{"Higher Power Orbs "}</div>{"to Max level"}<br/><br/>
                        <span className="hiorbm"></span>{" x4 when selling a "}<div className="ultimayellowcolor">{"FR Weapon"}</div>
                        </div>
                        <div className="similarbanner">Where to get</div>
                        <div className="ultimainfo darkerbg">
                        <span className="frstone"></span>{" x2 Force Stones at FR Weapon "}<div className="ultimayellowcolor">{" Master Limit Break"}</div><br/><br/>
                        <span className="frstone"></span>{" x3 or "}<span className="frshard"></span>{" x60 and "}<span className="bpointm"></span>{" x15,000 Points for "}<div className="ultimayellowcolor">{"Force Enhancement Lv30"}</div><br/><br/>
                        <span className="frshard"></span>{" x20 when completing "}<div className="ultimayellowcolor">{"Shinryu level quests"}</div><br/><br/>
                        <span className="CPIcon CPIconSmaller"></span>{" +90 at Lv30 and "}<span className="CPIcon CPIconSmaller"></span>{" x90"}<div className="ultimayellowcolor">{" required for all passives"}</div>
                        </div>  
                </div>
                :""}
                <div className="filterholderpages noselect" id={showFilter ? "showfilteren" : "hiddenfilteren"}>
                  <div className="filterholderflair">
                  <div className="similarbanner">Categories</div>
                    <ul className="bufftypes">
                    <Link to={`/characters/${newmatch.ShortName}`}>
                      <li className={`${pageloc == "profile" ? "filteractive" : "filterinactive"} buffbutton profilebutton`}></li>
                    </Link>
                    <Link to={`/characters/${newmatch.ShortName}/abilities`}>
                      <li className={`${pageloc == "abilities" ? "filteractive" : "filterinactive"} buffbutton abilitiesbutton`} ></li>
                    </Link>
                    <Link to={`/characters/${newmatch.ShortName}/buffs`}>
                      <li className={`${pageloc == "buffs" ? "filteractive" : "filterinactive"} buffbutton buffsdebuffsbutton`} ></li>
                    </Link>
                    <Link to={`/characters/${newmatch.ShortName}/gear`}>
                      <li className={`${pageloc == "gear" ? "filteractive" : "filterinactive"} buffbutton gearbutton`} ></li>
                    </Link>
                    <Link to={`/characters/${newmatch.ShortName}/passives`}>
                      <li className={`${pageloc == "passives" ? "filteractive" : "filterinactive"} buffbutton passivesbutton`} ></li>
                    </Link>
                    <Link to={`/characters/${newmatch.ShortName}/reworks`}>
                      <li className={`${pageloc == "reworks" ? "filteractive" : "filterinactive"} buffbutton reworktab${newmatch.ActiveRework == true ? "red" : ""}`} ></li>
                    </Link>
                    <Link to={`/characters/${newmatch.ShortName}/spheres`}>
                      <li className={`${pageloc == "spheres" ? "filteractive" : "filterinactive"} buffbutton spherespagebutton`} ></li>
                    </Link>
                    <Link to={`/characters/${newmatch.ShortName}/events`}>
                      <li className={`${pageloc == "events" ? "filteractive" : "filterinactive"} buffbutton eventspagebutton`} ></li>
                    </Link>
                    <Link to={`/characters/${newmatch.ShortName}/community`}>
                      <li className={`${pageloc == "community" ? "filteractive" : "filterinactive"} buffbutton communitybutton`} ></li>
                    </Link>
                    <Link to={`/characters/${newmatch.ShortName}/direct`}>
                      <li className={`${pageloc == "direct" ? "filteractive" : "filterinactive"} buffbutton directbutton`} ></li>
                    </Link>
                    </ul>
                    {subcat == "none" ? "" :
                    <div className="similarbanner">{"Subcategories"}</div>}
                    {subcat == "abilities" ?
                    <ul className="bufftypes">
                        {btattacks.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/abilities/burst`}>
                            <Tippy content="Burst Attacks">
                            <li className={`${pageloc == "Burst Attacks" ? "filteractive" : "filterinactive"} buffbutton wpbtbutton`} ></li>
                            </Tippy>
                        </Link>}
                        {frattacks.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/abilities/fr`}>
                            <Tippy content="FR Attacks">
                            <li className={`${pageloc == "FR Attacks" ? "filteractive" : "filterinactive"} buffbutton wpfrbutton`} ></li>
                            </Tippy>
                        </Link>}
                        {ldattacks.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/abilities/ld`}>
                            <Tippy content="LD Attacks">
                            <li className={`${pageloc == "LD Attacks" ? "filteractive" : "filterinactive"} buffbutton wpldbutton`} ></li>
                            </Tippy>
                        </Link>}
                        {exattacks.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/abilities/ex`}>
                            <Tippy content="EX Attacks">
                            <li className={`${pageloc == "EX Attacks" ? "filteractive" : "filterinactive"} buffbutton wpexbutton`} ></li>
                            </Tippy>
                        </Link>}
                        
                        {s2attacks.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/abilities/s2`}>
                            <Tippy content="Crystal Lv20 Attacks">
                            <li className={`${pageloc == "Crystal Lv20 Attacks" ? "filteractive" : "filterinactive"} buffbutton cl20button`} ></li>
                            </Tippy>
                        </Link>}
                        {s1attacks.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/abilities/s1`}>
                            <Tippy content="Starting Attacks">
                            <li className={`${pageloc == "Starting Attacks" ? "filteractive" : "filterinactive"} buffbutton startingButton`} ></li>
                            </Tippy>
                        </Link>}
                        <br/>
                        {aaattacks.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/abilities/aa`}>
                            <Tippy content="AA Attacks">
                            <li className={`${pageloc == "AA Attacks" ? "filteractive" : "filterinactive"} buffbutton abuffButton`} ></li>
                            </Tippy>
                        </Link>}
                        {callldattacks.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/abilities/callld`}>
                            <Tippy content="LD Call Attacks">
                            <li className={`${pageloc == "LD Call Attacks" ? "filteractive" : "filterinactive"} buffbutton call2button`} ></li>
                            </Tippy>
                        </Link>}
                        {call75attacks.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/abilities/call75`}>
                            <Tippy content="Crystal Lv75 Call Attacks">
                            <li className={`${pageloc == "Crystal Level 75 Call Attacks" ? "filteractive" : "filterinactive"} buffbutton call1button`} ></li>
                            </Tippy>
                        </Link>}
                        {hpattacks.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/abilities/hp`}>
                            <Tippy content="HP Attacks">
                            <li className={`${pageloc == "HP Attacks" ? "filteractive" : "filterinactive"} buffbutton hpplusattackiconbutton`} ></li>
                            </Tippy>
                        </Link>}
                        {brvattack.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/abilities/brv`}>
                            <Tippy content="BRV Attacks">
                            <li className={`${pageloc == "BRV Attacks" ? "filteractive" : "filterinactive"} buffbutton brvattackiconbutton`} ></li>
                            </Tippy>
                        </Link>}
                    </ul> 
                    :""}
                    {subcat == "buffs" ?
                    <ul className="bufftypes">
                        {frbuffs && frbuffs.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/buffs/fr`}>
                            <Tippy content="FR Line Buffs">
                            <li className={`${pageloc == "FR Line Buffs" ? "filteractive" : "filterinactive"} buffbutton frbutton`} ></li>
                            </Tippy>
                        </Link>}
                        {btbuffs && btbuffs.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/buffs/bt`}>
                            <Tippy content="Burst Line Buffs">
                            <li className={`${pageloc == "Burst Line Buffs" ? "filteractive" : "filterinactive"} buffbutton burstButton`} ></li>
                            </Tippy>
                        </Link>}
                        {callbuffs && callbuffs.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/buffs/call`}>
                            <Tippy content="Calls Line Buffs">
                            <li className={`${pageloc == "Calls Line Buffs" ? "filteractive" : "filterinactive"} buffbutton callsButton`} ></li>
                            </Tippy>
                        </Link>}
                        {ldbuffs && ldbuffs.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/buffs/ld`}>
                            <Tippy content="LD Line Buffs">
                            <li className={`${pageloc == "LD Line Buffs" ? "filteractive" : "filterinactive"} buffbutton ldButton`} ></li>
                            </Tippy>
                        </Link>}
                        {exbuffs && exbuffs.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/buffs/ex`}>
                            <Tippy content="EX Line Buffs">
                            <li className={`${pageloc == "EX Line Buffs" ? "filteractive" : "filterinactive"} buffbutton exButton`} ></li>
                            </Tippy>
                        </Link>}
                        <br/>
                        {aabuffs && aabuffs.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/buffs/aa`}>
                            <Tippy content="AA Line Buffs">
                            <li className={`${pageloc == "AA Line Buffs" ? "filteractive" : "filterinactive"} buffbutton abuffButton`} ></li>
                            </Tippy>
                        </Link>}
                        {s2buffs && s2buffs.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/buffs/s2`}>
                            <Tippy content="Second Skill Line Buffs">
                            <li className={`${pageloc == "Second Skill Line Buffs" ? "filteractive" : "filterinactive"} buffbutton s20Button`} ></li>
                            </Tippy>
                        </Link>}
                        {s1buffs && s1buffs.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/buffs/s1`}>
                            <Tippy content="Starting Skill Line Buffs">
                            <li className={`${pageloc == "Starting Skill Line Buffs" ? "filteractive" : "filterinactive"} buffbutton startingButton`} ></li>
                            </Tippy>
                        </Link>}
                        {bstatebuffs && bstatebuffs.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/buffs/battlestate`}>
                            <Tippy content="Battle State Buffs">
                            <li className={`${pageloc == "Battle State Buffs" ? "filteractive" : "filterinactive"} buffbutton bstateButton`} ></li>
                            </Tippy>
                        </Link>}
                        </ul>
                    :""}
                    {subcat == "gear" ?
                    <div>
                        <ul className="spheretypes">
                        {onlyweapons.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/gear/weapons`}>
                            <Tippy content="All Weapons">
                            <li className={`${pageloc == "All Weapons" ? "filteractive" : "filterinactive"} spheresbutton weaponbutton`} ></li>
                            </Tippy>
                        </Link>}
                        {onlyarmor.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/gear/armor`}>
                            <Tippy content="All Armor">
                            <li className={`${pageloc == "All Armor" ? "filteractive" : "filterinactive"} spheresbutton armoriconbutton`} ></li>
                            </Tippy>
                        </Link>}
                        </ul>
                        <div className="similarbanner">Key Gear</div>
                    <ul className="bufftypes">
                        {skin.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/gear/gloss`}>
                            <Tippy content="Gloss">
                            <li className={`${pageloc == "Gloss" ? "filteractive" : "filterinactive"} buffbutton skinbutton`} ></li>
                            </Tippy>
                        </Link>}
                        {weaponbtplus.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/gear/btplusweapon`}>
                            <Tippy content="BT+ Weapon">
                            <li className={`${pageloc == "BT+ Weapon" ? "filteractive" : "filterinactive"} buffbutton wpbtplusbutton`} ></li>
                            </Tippy>
                        </Link>}
                        {weaponbt.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/gear/btweapon`}>
                            <Tippy content="BT Weapon">
                            <li className={`${pageloc == "BT Weapon" ? "filteractive" : "filterinactive"} buffbutton wpbtbutton`} ></li>
                            </Tippy>
                        </Link>}
                        {weaponfr.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/gear/frweapon`}>
                            <Tippy content="FR Weapon">
                            <li className={`${pageloc == "FR Weapon" ? "filteractive" : "filterinactive"} buffbutton wpfrbutton`} ></li>
                            </Tippy>
                        </Link>}
                        {weaponexplus.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/gear/explusweapon`}>
                            <Tippy content="EX+ Weapon">
                            <li className={`${pageloc == "EX+ Weapon" ? "filteractive" : "filterinactive"} buffbutton wpexplusbutton`} ></li>
                            </Tippy>
                        </Link>}
                        {weaponld.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/gear/ldweapon`}>
                            <Tippy content="LD Weapon">
                            <li className={`${pageloc == "LD Weapon" ? "filteractive" : "filterinactive"} buffbutton wpldbutton`} ></li>
                            </Tippy>
                        </Link>}
                        {weaponex.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/gear/exweapon`}>
                            <Tippy content="EX Weapon">
                            <li className={`${pageloc == "EX Weapon" ? "filteractive" : "filterinactive"} buffbutton wpexbutton`} ></li>
                            </Tippy>
                        </Link>}
                        {weapondark.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/gear/darkweapon`}>
                            <Tippy content="Dark Weapon">
                            <li className={`${pageloc == "Dark Weapon" ? "filteractive" : "filterinactive"} buffbutton wpdarkbutton`} ></li>
                            </Tippy>
                        </Link>}
                        {weapon35.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/gear/35weapon`}>
                            <Tippy content="35CP Weapon">
                            <li className={`${pageloc == "35CP Weapon" ? "filteractive" : "filterinactive"} buffbutton wp35button`} ></li>
                            </Tippy>
                        </Link>}
                        {weaponnt.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/gear/ntweapon`}>
                            <Tippy content="NT Weapon">
                            <li className={`${pageloc == "NT Weapon" ? "filteractive" : "filterinactive"} buffbutton wpntbutton`} ></li>
                            </Tippy>
                        </Link>}
                        {weaponwoi.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/gear/woiweapon`}>
                            <Tippy content="World of Illusions Weapon">
                            <li className={`${pageloc == "World of Illusions Weapon" ? "filteractive" : "filterinactive"} buffbutton wpwoibutton`} ></li>
                            </Tippy>
                        </Link>}
                        {weapon15.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/gear/15weapon`}>
                            <Tippy content="15CP Weapon">
                            <li className={`${pageloc == "15CP Weapon" ? "filteractive" : "filterinactive"} buffbutton wp15button`} ></li>
                            </Tippy>
                        </Link>}
                        {weapon4.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/gear/4starweapon`}>
                            <Tippy content="4★ Weapon">
                            <li className={`${pageloc == "4★ Weapon" ? "filteractive" : "filterinactive"} buffbutton wp4wbutton`} ></li>
                            </Tippy>
                        </Link>}
                    </ul>
                    <br/>
                    <ul className="bufftypes">
                        {armor7plus.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/gear/7starplusarmor`}>
                            <Tippy content="7★+ Armor">
                            <li className={`${pageloc == "7★+ Armor" ? "filteractive" : "filterinactive"} buffbutton arm7aplusbutton`} ></li>
                            </Tippy>
                        </Link>}
                        {armor7.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/gear/7stararmor`}>
                            <Tippy content="7★ Armor">
                            <li className={`${pageloc == "7★ Armor" ? "filteractive" : "filterinactive"} buffbutton arm7abutton`} ></li>
                            </Tippy>
                        </Link>}
                        {armorhgplus.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/gear/hgplusarmor`}>
                            <Tippy content="HG+ Armor">
                            <li className={`${pageloc == "HG+ Armor" ? "filteractive" : "filterinactive"} buffbutton armhgplusbutton`} ></li>
                            </Tippy>
                        </Link>}
                        {armorhg.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/gear/hgarmor`}>
                            <Tippy content="HG Armor">
                            <li className={`${pageloc == "HG Armor" ? "filteractive" : "filterinactive"} buffbutton armhgbutton`} ></li>
                            </Tippy>
                        </Link>}
                        {armor35.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/gear/35armor`}>
                            <Tippy content="35CP Armor">
                            <li className={`${pageloc == "35CP Armor" ? "filteractive" : "filterinactive"} buffbutton arm35abutton`} ></li>
                            </Tippy>
                        </Link>}
                        {armor4.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/gear/4stararmor`}>
                            <Tippy content="4★ Armor">
                            <li className={`${pageloc == "4★ Armor" ? "filteractive" : "filterinactive"} buffbutton arm4abutton`} ></li>
                            </Tippy>
                        </Link>}
                        {bloom.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/gear/bloomstone`}>
                            <Tippy content="Bloom Stone">
                            <li className={`${pageloc == "Bloom Stone" ? "filteractive" : "filterinactive"} buffbutton armbloombutton`} ></li>
                            </Tippy>
                        </Link>}
                    </ul>
                    </div>
                    :""}
                    {subcat == "passives" ?
                    <div>
                    <ul className="spheretypes">
                        {boardfr.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/passives/boardfr`}>
                            <Tippy content="Force Enhancement">
                            <li className={`${pageloc == "Force Enhancement" ? "filteractive" : "filterinactive"} buffbutton boardfrbutton`} ></li>
                            </Tippy>
                        </Link>}
                        {board5.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/passives/board5`}>
                            <Tippy content="FR Skill Board Passives">
                            <li className={`${pageloc == "FR Skill Board Passives" ? "filteractive" : "filterinactive"} buffbutton board5button`} ></li>
                            </Tippy>
                        </Link>}
                        {board4.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/passives/board4`}>
                            <Tippy content="LD Skill Board Passives">
                            <li className={`${pageloc == "LD Skill Board Passives" ? "filteractive" : "filterinactive"} buffbutton board4button`} ></li>
                            </Tippy>
                        </Link>}
                        {board3.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/passives/board3`}>
                            <Tippy content="EX Skill Board Passives">
                            <li className={`${pageloc == "EX Skill Board Passives" ? "filteractive" : "filterinactive"} buffbutton board3button`} ></li>
                            </Tippy>
                        </Link>}
                        {board2.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/passives/board2`}>
                            <Tippy content="Skill 2 Board Passives">
                            <li className={`${pageloc == "Skill 2 Board Passives" ? "filteractive" : "filterinactive"} buffbutton board2button`} ></li>
                            </Tippy>
                        </Link>}
                        {board1.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/passives/board1`}>
                            <Tippy content="Skill 1 Board Passives">
                            <li className={`${pageloc == "Skill 1 Board Passives" ? "filteractive" : "filterinactive"} buffbutton board1button`} ></li>
                            </Tippy>
                        </Link>}
                        {crystal.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/passives/crystal`}>
                            <Tippy content="Crystal Passives">
                            <li className={`${pageloc == "Crystal Passives" ? "filteractive" : "filterinactive"} buffbutton crystalsub`} ></li>
                            </Tippy>
                        </Link>}
                        {artifacts.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/passives/artifacts`}>
                            <Tippy content="Artifact Passives">
                            <li className={`${pageloc == "Artifact Passives" ? "filteractive" : "filterinactive"} buffbutton artpassbutton`} ></li>
                            </Tippy>
                        </Link>}
                        </ul>
                        <div className="similarbanner">Key Passives</div>
                        <ul className="refineabilities">
                        {frext.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/passives/board5ext`}>
                            <Tippy content="FR Extension Passive">
                            <li className={`${pageloc == "FR Extension Passive" ? "filteractive" : "filterinactive"} buffbutton board5extbutton`} ></li>
                            </Tippy>
                        </Link>}
                        {frecho.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/passives/board5echo`}>
                            <Tippy content="FR Echo Passive">
                            <li className={`${pageloc == "FR Echo Passive" ? "filteractive" : "filterinactive"} buffbutton board5echobutton`} ></li>
                            </Tippy>
                        </Link>}
                        {ldext.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/passives/ldext`}>
                            <Tippy content="LD Extension Passive">
                            <li className={`${pageloc == "LD Extension Passive" ? "filteractive" : "filterinactive"} buffbutton ench4extbutton`} ></li>
                            </Tippy>
                        </Link>}
                        {ldcallext.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/passives/ldcallext`}>
                            <Tippy content="LD Call Extension Passive">
                            <li className={`${pageloc == "LD Call Extension Passive" ? "filteractive" : "filterinactive"} buffbutton ench4cextbutton`} ></li>
                            </Tippy>
                        </Link>}
                        {ldcall.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/passives/ldcall`}>
                            <Tippy content="LD Call Ability">
                            <li className={`${pageloc == "LD Call Ability" ? "filteractive" : "filterinactive"} buffbutton ench4cbutton`} ></li>
                            </Tippy>
                        </Link>}
                        {cl88.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/passives/cl88`}>
                            <Tippy content="Crystal Level 88 Passive">
                            <li className={`${pageloc == "Crystal Level 88 Passive" ? "filteractive" : "filterinactive"} buffbutton cl88button`} ></li>
                            </Tippy>
                        </Link>}
                        {cl85.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/passives/cl85`}>
                            <Tippy content="Crystal Level 85 Passive">
                            <li className={`${pageloc == "Crystal Level 85 Passive" ? "filteractive" : "filterinactive"} buffbutton cl85button`} ></li>
                            </Tippy>
                        </Link>}
                        {cl80.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/passives/cl80`}>
                            <Tippy content="Crystal Level 80 Passive">
                            <li className={`${pageloc == "Crystal Level 80 Passive" ? "filteractive" : "filterinactive"} buffbutton cl80button`} ></li>
                            </Tippy>
                        </Link>}
                        {cl75.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/passives/cl75`}>
                            <Tippy content="Crystal Level 75 Skill">
                            <li className={`${pageloc == "Crystal Level 75 Skill" ? "filteractive" : "filterinactive"} buffbutton cl75button`} ></li>
                            </Tippy>
                        </Link>}
                        {cl70.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/passives/cl70`}>
                            <Tippy content="Crystal Level 70 Passive">
                            <li className={`${pageloc == "Crystal Level 70 Passive" ? "filteractive" : "filterinactive"} buffbutton cl70button`} ></li>
                            </Tippy>
                        </Link>}
                        {cl65.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/passives/cl65`}>
                            <Tippy content="Crystal Level 65 Skill">
                            <li className={`${pageloc == "Crystal Level 65 Skill" ? "filteractive" : "filterinactive"} buffbutton cl65button`} ></li>
                            </Tippy>
                        </Link>}
                        {cl60.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/passives/cl60`}>
                            <Tippy content="Crystal Level 60 Passive">
                            <li className={`${pageloc == "Crystal Level 60 Passive" ? "filteractive" : "filterinactive"} buffbutton cl60button`} ></li>
                            </Tippy>
                        </Link>}
                        {cl55.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/passives/cl55`}>
                            <Tippy content="Crystal Level 55 Passive">
                            <li className={`${pageloc == "Crystal Level 55 Passive" ? "filteractive" : "filterinactive"} buffbutton cl55button`} ></li>
                            </Tippy>
                        </Link>}
                        {cl50.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/passives/cl50`}>
                            <Tippy content="Crystal Level 50 Passive">
                            <li className={`${pageloc == "Crystal Level 50 Passive" ? "filteractive" : "filterinactive"} buffbutton cl50button`} ></li>
                            </Tippy>
                        </Link>}
                        {cl20.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/passives/cl20`}>
                            <Tippy content="Crystal Level 20 Skill">
                            <li className={`${pageloc == "Crystal Level 20 Skill" ? "filteractive" : "filterinactive"} buffbutton cl20button`} ></li>
                            </Tippy>
                        </Link>}
                        {cl1.length == 0 ? "" :
                        <Link to={`/characters/${newmatch.ShortName}/passives/cl1`}>
                            <Tippy content="Starting Skill">
                            <li className={`${pageloc == "Starting Skill" ? "filteractive" : "filterinactive"} buffbutton cl1button`} ></li>
                            </Tippy>
                        </Link>}
                    </ul>
                    </div>
                    :""}
                    {subcat == "events" ?
                    <ul className="bufftypes">
                        <Link to={`/characters/${newmatch.ShortName}/events/events`}>
                            <Tippy content="Upcoming Events">
                            <li className={`${pageloc == "events" ? "filteractive" : "filterinactive"} buffbutton upcomingbutton`} ></li>
                            </Tippy>
                        </Link>
                        <Link to={`/characters/${newmatch.ShortName}/events/enemies`}>
                            <Tippy content="Enemies Orb Handlers">
                            <li className={`${pageloc == "enemies" ? "filteractive" : "filterinactive"} buffbutton enemiesforcharbutton`} ></li>
                            </Tippy>
                        </Link>
                    </ul>
                    :""}
                    {subcat == "direct" ?
                    <div>
                    <ul className="bufftypes">
                        <DefaultTippy content={showGLToggle ? "JP Current" : "GL Current"} className="tooltip" hideOnClick={false} >
                          <li className={jptoggledata ? "switch2 switchchecked ": "switch2 switchunchecked"}  onClick={() => handletoggle(showGLToggle)}>
                            <div className={jptoggledata ? "slider sliderchecked": "slider sliderunchecked" } >
                            </div>
                          </li>
                        </DefaultTippy>
                        {Access[`${ver}abilities`] == true && Access[`${ver}basic`] == true?
                        <Link to={`/characters/${newmatch.ShortName}/direct/abilities`}>
                            <Tippy content="Abilities">
                                <li className={`${direct_loc == "abilities" ? "filteractive" : "filterinactive"} buffbutton directabilitiesbutton`} ></li>
                            </Tippy>
                        </Link>
                        :""}
                        {Access[`${ver}buffs`] == true && Access[`${ver}basic`] == true?
                        <Link to={`/characters/${newmatch.ShortName}/direct/buffs`}>
                            <Tippy content="Buffs">
                                <li className={`${direct_loc == "buffs" ? "filteractive" : "filterinactive"} buffbutton directbuffsButton`} ></li>
                            </Tippy>
                        </Link>
                        :""}
                        {Access[`${ver}gear`] == true && Access[`${ver}basic`] == true?
                        <Link to={`/characters/${newmatch.ShortName}/direct/gear`}>
                            <Tippy content="Equipment Passives">
                                <li className={`${direct_loc == "gear" ? "filteractive" : "filterinactive"} buffbutton directgearbutton`} ></li>
                            </Tippy>
                        </Link>
                        :""}
                        {(  Access[`${ver}crystal`] == true ||
                            Access[`${ver}sum_fix`] == true ||
                            Access[`${ver}exp`] == true ||
                            Access[`${ver}link`] == true ||
                            Access[`${ver}art`]  == true
                        )
                        && Access[`${ver}basic`] == true?
                        <Link to={`/characters/${newmatch.ShortName}/direct/passives/crystal`}>
                            <Tippy content="Passives">
                                <li className={`${(direct_loc == "crystal" || direct_loc == "boards" || direct_loc == "force" || direct_loc == "arts"||direct_loc == "exp") ? "filteractive" : "filterinactive"} buffbutton directpassives`} ></li>
                            </Tippy>
                        </Link>
                        :""}
                        {Access[`${ver}spheres`] == true && Access[`${ver}basic`] == true?
                        <Link to={`/characters/${newmatch.ShortName}/direct/spheres`}>
                            <Tippy content="Spheres">
                                <li className={`${direct_loc == "spheres" ? "filteractive" : "filterinactive"} buffbutton directspherespagebutton`} ></li>
                            </Tippy>
                        </Link>
                        :""}
                        {Access[`${ver}events`] == true && Access[`${ver}basic`] == true?
                        <Link to={`/characters/${newmatch.ShortName}/direct/events`}>
                            <Tippy content="Associated Events">
                                <li className={`${direct_loc == "events" ? "filteractive" : "filterinactive"} buffbutton eventsdirect`} ></li>
                            </Tippy>
                        </Link>
                        :""}
                      </ul>
                      {direct_loc == "crystal"||
                       direct_loc == "exp"||
                       direct_loc == "boards"||
                       direct_loc == "force"||
                       direct_loc == "arts" ?
                       <>
                       <div className="similarbanneruni">{"Passive Types"}</div>
                       <ul className='bufftypes'>
                       {Access[`${ver}exp`] == true && Access[`${ver}basic`] == true?
                        <Link to={`/characters/${newmatch.ShortName}/direct/exp`}>
                            <Tippy content="Experience Passives">
                                <li className={`${direct_loc == "exp" ? "filteractive" : "filterinactive"} buffbutton directexppassives`} ></li>
                            </Tippy>
                        </Link>
                        :""}
						{  Access[`${ver}crystal`] == true 
                        && Access[`${ver}basic`] == true?
                        <Link to={`/characters/${newmatch.ShortName}/direct/passives/crystal`}>
                            <Tippy content="Crystal Passives">
                                <li className={`${direct_loc == "crystal" ? "filteractive" : "filterinactive"} buffbutton directcrystalpassives`} ></li>
                            </Tippy>
                        </Link>
                        :""}
						{Access[`${ver}sum_fix`] == true && Access[`${ver}basic`] == true?
                        <Link to={`/characters/${newmatch.ShortName}/direct/boards`}>
                            <Tippy content="Enhancement Boards">
                                <li className={`${direct_loc == "boards" ? "filteractive" : "filterinactive"} buffbutton bpassivesbutton`} ></li>
                            </Tippy>
                        </Link>
                        :""}
                        {Access[`${ver}link`] == true && Access[`${ver}basic`] == true?
                        <Link to={`/characters/${newmatch.ShortName}/direct/force`}>
                            <Tippy content="Force Enhancement">
                                <li className={`${direct_loc == "force" ? "filteractive" : "filterinactive"} buffbutton linkbutton`} ></li>
                            </Tippy>
                        </Link>
                        :""}
                        {Access[`${ver}art`] == true && Access[`${ver}basic`] == true?
                        <Link to={`/characters/${newmatch.ShortName}/direct/arts`}>
                            <Tippy content="Artifact Passives">
                                <li className={`${direct_loc == "arts" ? "filteractive" : "filterinactive"} buffbutton artpassivedirect`} ></li>
                            </Tippy>
                        </Link>
                        :""}
                        </ul>
                       </>
                      :""}
                            {check == true ?
                            <div className="similarbannerred">
                            <DefaultTippy content={<div>Direct Data is being updated<div>Check back later as data may be incomplete or broken</div></div>}>
                                <div className='blink_me'>• Update in Progress •</div>
                            </DefaultTippy>
                            </div>
                            :
                            <div className="similarbanneruni">
                            {`Updated on ${months[new Date(Access[`${ver}update`]).getMonth()]} ${ordinal(new Date(Access[`${ver}update`]).getDate())}`}
                            </div>
                            }
                      </div>
                    :
                    ""
                    }
                    </div>
                </div>
        </div>
    )
}
export default CharPageHeader