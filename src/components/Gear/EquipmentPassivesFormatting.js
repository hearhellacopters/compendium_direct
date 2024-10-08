import React from 'react';
import { Link } from 'react-router-dom'
import { useStateIfMounted } from "use-state-if-mounted";
import PassiveAbilityFormatting from '../Passives/PassiveAbilityFormatting.js'
import { StartsInTimer } from '../../components/Timers.js';
import { LazyLoadImage, LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';
import { ObjectView } from 'react-object-view'
import ReplacerCharacter from '../ReplacerCharacter.js';

function EquipmentPassivesFormatting ({
    gear,
    ver,
    loc,
    file,
    master_index,
    formatting,
    link,
    debugging,
    scrollPosition 
}){

    const char_id = master_index.charid

    const [showraw, setshowraw] = useStateIfMounted(false)

    const showmeraw = (e) => {
        if (e.shiftKey) {
            if (showraw == false) {
                setshowraw(true)
            } else {
                setshowraw(false)
            }
        }
    }

    const makegear = {
        "wp4w": "4w",
        "wp15": "15",
        "wpwoi": "woi",
        "wp35": "35",
        "wpnt": "NT",
        "wpdark": "dark",
        "wpex": "ex",
        "wpexplus": "ex+",
        "wpld": "ld",
        "wpfr": "fr",
        "wpbt": "bt",
        "wpbtplus": "bt+",
        "armbloom": "bloom",
        "arm4a": "4a",
        "arm35a": "35a",
        "armhg": "hg",
        "armhgplus": "hg+",
        "arm7a": "7a",
        "arm7aplus": "7a+"
    }

    var getname = undefined

    const makeurl = (id, tag, gear) => {
        getname = char_id[id] && char_id[id].CharacterURLName
        const getgear = makegear[tag]
        if (id == undefined || tag == undefined) {
            return `/characters/UltimaWeapons/${gear.type}0.png`
        }
        if (getname == undefined || getgear == undefined) {
            return `/icons/misc/GearMissing.png`
        } else {
            return `/characters/${getname}/${getgear}.png`
        }
    }
    const match = gear

    const [gearurl, setgearurl] = useStateIfMounted(makeurl(gear.chara_id, gear.gear_tag, gear))
    const [master, setmaster] = useStateIfMounted(false)
    const [ultima, setultima] = useStateIfMounted(gear.ultima)

    const makemaster = (value) => {
        if (master == true && ultima != true) {
            if (gear.gear_tag != "armbloom") {
                if (gear.gear_tag != "wpbt") {
                    if (gear.gear_tag != "arm7a") {
                        setmaster(false)
                        setgearurl(gearurl.replace(/(.*)(m.png)/, "$1.png"))
                    }
                }
            }
        } else {
            if (ultima != true) {
                if (gear.gear_tag != "armbloom") {
                    if (gear.gear_tag != "wpbt") {
                        if (gear.gear_tag != "arm7a") {
                            setmaster(true)
                            setgearurl(gearurl.replace(/(.*)(\.png)/, "$1m$2"))
                        }
                    }
                }
            } else {
                setgearurl(gearurl.replace(/(\d).png/, `${value}.png`))
            }
        }
    }

    const ct = new Date().getTime();

    var rData = undefined
    if (ver == "JP") {
        const date_check = gear.start_date && new Date(`${gear.start_date.toString().replace(/ /, "T")}.000+09:00`);
        if (date_check && date_check.getTime() > ct) {
            rData = date_check
        }
    } else {
        const date_check2 = gear.start_date && new Date(`${gear.start_date.toString().replace(/ /, "T")}Z`);
        if (date_check2 && date_check2.getTime() > ct) {
            rData = date_check2
        }
    }

    return (
        <div className='buffunit' >
            <LazyLoadComponent
            scrollPosition={scrollPosition}
            placeholder={<div className='infoholder' style={{ minHeight: "350px" }}/>}
            >
            <div className='infoholder'>
                <div className='geartoplevel'>
                    <div className='gearimageholder'>
                        {link == undefined ?
                            <LazyLoadImage 
                            scrollPosition={scrollPosition}
                            effect="opacity" 
                            className={`gearimage${link != undefined ? " clicky" : ""}`} 
                            src={`https://dissidiacompendium.com/images/static${gearurl}`} />
                            :
                            <Link to={`/characters/${getname.toLowerCase()}/${link}`}>
                                <LazyLoadImage 
                                scrollPosition={scrollPosition}
                                effect="opacity" 
                                className={`gearimage${link != undefined ? " clicky" : ""}`} 
                                src={`https://dissidiacompendium.com/images/static${gearurl}`} />
                            </Link>
                        }
                    </div>
                    <table className="statstablenonmoble statframe tablenonmobile withshadow">
                        <thead className="statsflair ">
                            <tr>
                                <th className="rightborder leftborder tableven"><div className="unique">LB</div></th>
                                <th className="rightborder tableven"><div className="unique">HP</div></th>
                                <th className="rightborder tableven"><div className="unique">DEF</div></th>
                                <th className="rightborder tableven"><div className="unique">iBRV</div></th>
                                <th className="rightborder tableven"><div className="unique">mBRV</div></th>
                                <th className=" tableven"><div className="unique">ATK</div></th>
                                <th className="blackcapborder tableven"><div className="CPIcon CPIconSmaller" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={`statsflairperstat topborder`}>
                                <td onClick={() => makemaster(0)} className={`rightborder topborder leftborder greybackground ${ultima ? "click" : ""}`}><div className={`lb0${ultima == true ? 5 : ""} lsmaller`} /></td>
                                <td className="rightborder topborder">{match.HP0}</td>
                                <td className="rightborder topborder">{match.DEF0}</td>
                                <td className="rightborder topborder">{match.INTBRV0}</td>
                                <td className="rightborder topborder">{match.MAXBRV0}</td>
                                <td className="topborder">{match.ATK0}</td>
                                <td className={`whiterightborder whitetopborder blackbg ${match.LimitBreaks == 1 ? "whitebottomborder" : ""}`}>{match.CPGains0}</td>
                            </tr>
                            {match.LimitBreaks >= 2 ?
                                <tr className={`statsflairperstat topborder`}>
                                    <td onClick={() => makemaster(1)} className={`rightborder topborder leftborder greybackground ${ultima ? "click" : ""}`}><div className={`lb1${ultima == true ? 5 : ""} lsmaller`} /></td>
                                    <td className="rightborder topborder">{match.HP1}</td>
                                    <td className="rightborder topborder">{match.DEF1}</td>
                                    <td className="rightborder topborder">{match.INTBRV1}</td>
                                    <td className="rightborder topborder">{match.MAXBRV1}</td>
                                    <td className="topborder">{match.ATK1}</td>
                                    <td className="whitetopborder blackbg whiterightborder">{match.CPGains1}</td>
                                </tr> : null}
                            {match.LimitBreaks >= 3 ?
                                <tr className={`statsflairperstat topborder`}>
                                    <td onClick={() => makemaster(2)} className={`rightborder topborder leftborder greybackground ${ultima ? "click" : ""}`} ><div className={`lb2${ultima == true ? 5 : ""} lsmaller`} /></td>
                                    <td className="rightborder topborder">{match.HP2}</td>
                                    <td className="rightborder topborder">{match.DEF2}</td>
                                    <td className="rightborder topborder">{match.INTBRV2}</td>
                                    <td className="rightborder topborder">{match.MAXBRV2}</td>
                                    <td className="topborder">{match.ATK2}</td>
                                    <td className="whitetopborder blackbg whiterightborder">{match.CPGains2}</td>
                                </tr> : null}
                            {match.LimitBreaks >= 4 ?
                                <tr className={`statsflairperstat topborder ${match.LimitBreaks == 4 ? "statsender" : ""}`}>
                                    <td onClick={() => makemaster(3)} className="rightborder topborder leftborder greybackground click"><div className={`lb3${ultima == true ? 5 : ""} lsmaller`} /></td>
                                    <td className="rightborder topborder">{match.HP3}</td>
                                    <td className="rightborder topborder">{match.DEF3}</td>
                                    <td className="rightborder topborder">{match.INTBRV3}</td>
                                    <td className="rightborder topborder">{match.MAXBRV3}</td>
                                    <td className="topborder">{match.ATK3}</td>
                                    <td className={`whitetopborder blackbg whiterightborder ${match.LimitBreaks >= 5 ? "" : "whitebottomborder"}`}>{match.CPGains3}</td>
                                </tr> : null}
                            {match.LimitBreaks >= 5 ?
                                <tr className={`statsflairperstat topborder`}>
                                    <td onClick={() => makemaster(4)} className="rightborder topborder leftborder greybackground click"><div className={`lb4${ultima == true ? 5 : ""} lsmaller`} /></td>
                                    <td className="rightborder topborder">{match.HP4}</td>
                                    <td className="rightborder topborder">{match.DEF4}</td>
                                    <td className="rightborder topborder">{match.INTBRV4}</td>
                                    <td className="rightborder topborder">{match.MAXBRV4}</td>
                                    <td className="topborder">{match.ATK4}</td>
                                    <td className="whitetopborder blackbg whiterightborder whitebottomborder">{match.CPGains4}</td>
                                </tr> : null}
                            {match.LimitBreaks >= 6 ?
                                <tr className={`statsflairperstat topborder ${match.LimitBreaks == 6 ? "statsender" : ""}`}>
                                    <td onClick={() => makemaster(5)} className="rightborder topborder leftborder greybackground click"><div className={`lb5${ultima == true ? 5 : ""} lsmaller`} /></td>
                                    <td className="rightborder topborder">{match.HP5}</td>
                                    <td className="rightborder topborder">{match.DEF5}</td>
                                    <td className="rightborder topborder">{match.INTBRV5}</td>
                                    <td className="rightborder topborder">{match.MAXBRV5}</td>
                                    <td className="topborder">{match.ATK5}</td>
                                    <td className="blackbg whiterightborder whitebottomborder">{match.CPGains5}</td>
                                </tr> : null}
                        </tbody>
                    </table>
                </div>
                <div className='gearinfonameholder blackbanner'>
                    <div className='displayfex'>
                        <div className='splitrow'>
                            {ver == "JP" ?
                                <>
                                    <div className='geartitletext' onClick={showmeraw}>{gear.glname}{" - #"}{gear.equip_id}</div><br />
                                    <div className='abilityJPname'>{gear.name}</div>
                                </>
                                :
                                <>
                                    <div className='geartitletext' onClick={showmeraw}>{gear.name}{" - #"}{gear.equip_id}</div><br />
                                    <div className='abilityJPname'>{gear.jpname}</div>
                                </>
                            }
                            <div style={{display:"contents"}} onClick={() => makemaster(1)} className='clicky'>{ReplacerCharacter(`<${gear.gear_tag}>`)}</div>
                        </div>
                        <div className='gearCPReqHolder spacearound'>
                            <span>
                                <span className="unique">Req.</span>
                                <span className="CPIcon CPIconSmaller" />
                            </span>
                            <span className="gearcpcostholder">&nbsp;{gear.cp}</span>
                        </div>
                    </div>
                    {rData != undefined ?
                        <div>
                            <StartsInTimer
                                expiryTimestamp={rData}
                                JPFlag={ver == "JP" ? true : false}
                            />
                        </div>
                        : ""}
                </div>
                {showraw == true ?
                    <span className='react-json-view'>
                        <ObjectView 
                        options={
                            {
                                hideDataTypes: true,
                                expandLevel: 1
                            }
                            }
                        data={gear} />
                    </span>
                    : ""}
                {gear && gear.passives && gear.passives.map(passive2 => (
                    <PassiveAbilityFormatting
                        key={passive2.pa_id}
                        passive_ability={passive2}
                        ver={ver}
                        loc={loc}
                        file={"exskill"}
                        master_index={master_index}
                        formatting={formatting}
                        gear={true}
                        debugging={debugging}
                        banner_color={"newblue"}
                        base_color={"bluebase"}
                        tag_overide={gear.gear_tag == "wp4w" || gear.gear_tag == "arm4a" || gear.gear_tag == "arm35a" || gear.gear_tag == "armhg" || gear.gear_tag == "armhgplus" ? gear.gear_tag : undefined}
                    />
                ))}
                <table className="statstable statframe tablemobile">
                    <thead className="statsflair ">
                        <tr>
                            <th className="rightborder leftborder "><div className="unique">LB</div></th>
                            <th className="rightborder "><div className="unique">HP</div></th>
                            <th className="rightborder "><div className="unique">DEF</div></th>
                            <th className="rightborder "><div className="unique">iBRV</div></th>
                            <th className="rightborder "><div className="unique">mBRV</div></th>
                            <th className=" "><div className="unique">ATK</div></th>
                            <th className="blackcapborder "><div className="CPIcon CPIconSmaller" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={`statsflairperstat topborder`}>
                            <td className={`rightborder topborder leftborder greybackground `}><div className={`lb0${ultima == true ? 5 : ""} lsmaller`} /></td>
                            <td className="rightborder topborder">{match.HP0}</td>
                            <td className="rightborder topborder">{match.DEF0}</td>
                            <td className="rightborder topborder">{match.INTBRV0}</td>
                            <td className="rightborder topborder">{match.MAXBRV0}</td>
                            <td className="topborder">{match.ATK0}</td>
                            <td className={`whiterightborder whitetopborder blackbg ${match.LimitBreaks == 1 ? "whitebottomborder" : ""}`}>{match.CPGains0}</td>
                        </tr>
                        {match.LimitBreaks >= 2 ?
                            <tr className={`statsflairperstat topborder`}>
                                <td className={`rightborder topborder leftborder greybackground `}><div className={`lb1${ultima == true ? 5 : ""} lsmaller`} /></td>
                                <td className="rightborder topborder">{match.HP1}</td>
                                <td className="rightborder topborder">{match.DEF1}</td>
                                <td className="rightborder topborder">{match.INTBRV1}</td>
                                <td className="rightborder topborder">{match.MAXBRV1}</td>
                                <td className="topborder">{match.ATK1}</td>
                                <td className="whitetopborder blackbg whiterightborder">{match.CPGains1}</td>
                            </tr> : null}
                        {match.LimitBreaks >= 3 ?
                            <tr className={`statsflairperstat topborder`}>
                                <td className={`rightborder topborder leftborder greybackground `} ><div className={`lb2${ultima == true ? 5 : ""} lsmaller`} /></td>
                                <td className="rightborder topborder">{match.HP2}</td>
                                <td className="rightborder topborder">{match.DEF2}</td>
                                <td className="rightborder topborder">{match.INTBRV2}</td>
                                <td className="rightborder topborder">{match.MAXBRV2}</td>
                                <td className="topborder">{match.ATK2}</td>
                                <td className="whitetopborder blackbg whiterightborder">{match.CPGains2}</td>
                            </tr> : null}
                        {match.LimitBreaks >= 4 ?
                            <tr className={`statsflairperstat topborder ${match.LimitBreaks == 4 ? "statsender" : ""}`}>
                                <td className="rightborder topborder leftborder greybackground click"><div className={`lb3${ultima == true ? 5 : ""} lsmaller`} /></td>
                                <td className="rightborder topborder">{match.HP3}</td>
                                <td className="rightborder topborder">{match.DEF3}</td>
                                <td className="rightborder topborder">{match.INTBRV3}</td>
                                <td className="rightborder topborder">{match.MAXBRV3}</td>
                                <td className="topborder">{match.ATK3}</td>
                                <td className={`whitetopborder blackbg whitebottomborder whiterightborder `}>{match.CPGains3}</td>
                            </tr> : null}
                        {match.LimitBreaks >= 5 ?
                            <tr className={`statsflairperstat topborder`}>
                                <td className="rightborder topborder leftborder greybackground click"><div className={`lb4${ultima == true ? 5 : ""} lsmaller`} /></td>
                                <td className="rightborder topborder">{match.HP4}</td>
                                <td className="rightborder topborder">{match.DEF4}</td>
                                <td className="rightborder topborder">{match.INTBRV4}</td>
                                <td className="rightborder topborder">{match.MAXBRV4}</td>
                                <td className="topborder">{match.ATK4}</td>
                                <td className={`whitetopborder blackbg whitebottomborder whiterightborder `}>{match.CPGains4}</td>
                            </tr> : null}
                        {match.LimitBreaks >= 6 ?
                            <tr className={`statsflairperstat topborder ${match.LimitBreaks == 6 ? "statsender" : ""}`}>
                                <td className="rightborder topborder leftborder greybackground click"><div className={`lb5${ultima == true ? 5 : ""} lsmaller`} /></td>
                                <td className="rightborder topborder">{match.HP5}</td>
                                <td className="rightborder topborder">{match.DEF5}</td>
                                <td className="rightborder topborder">{match.INTBRV5}</td>
                                <td className="rightborder topborder">{match.MAXBRV5}</td>
                                <td className="topborder">{match.ATK5}</td>
                                <td className={`whitetopborder blackbg whiterightborder `}>{match.CPGains5}</td>
                            </tr> : null}
                    </tbody>
                </table>
            </div>
            </LazyLoadComponent>
        </div>
    )
}

export default trackWindowScroll(EquipmentPassivesFormatting)