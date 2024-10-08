import React from "react"; 
import { useStateIfMounted } from "use-state-if-mounted";
import PassiveAbilityDif from "../Passives/PassiveAbilityDif";
import ReplacerCharacter from "../ReplacerCharacter";
import { LazyLoadImage, LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';
import { ObjectView } from 'react-object-view'

function EquipmentPassiveDif({
    passive_ability_new,
    ver_new,
    passive_ability_old,
    ver_old,
    master_index,
    info,
    chara_id_passoff,
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

    const match = passive_ability_new

    const [gearurl, setgearurl] = useStateIfMounted(makeurl(passive_ability_new.chara_id, passive_ability_new.gear_tag, passive_ability_new))
    const [master, setmaster] = useStateIfMounted(false)
    const [ultima, setultima] = useStateIfMounted(passive_ability_new.ultima)

    const makemaster = (value) => {
        if (master == true && ultima != true) {
            if (passive_ability_new.gear_tag != "armbloom") {
                if (passive_ability_new.gear_tag != "wpbt") {
                    if (passive_ability_new.gear_tag != "arm7a") {
                        setmaster(false)
                        setgearurl(gearurl.replace(/(.*)(m.png)/, "$1.png"))
                    }
                }
            }
        } else {
            if (ultima != true) {
                if (passive_ability_new.gear_tag != "armbloom") {
                    if (passive_ability_new.gear_tag != "wpbt") {
                        if (passive_ability_new.gear_tag != "arm7a") {
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


    return(
        <div className='buffunit' >
            <LazyLoadComponent
            scrollPosition={scrollPosition}
            placeholder={<div className='infoholder' style={{ minHeight: "550px" }}/>}
            >
            <div className='infoholder'>
                <div className='geartoplevel'>
                    <div className='gearimageholder'>
                        <LazyLoadImage 
                        scrollPosition={scrollPosition}
                        effect="opacity" 
                        className={`gearimage`} 
                        src={`https://dissidiacompendium.com/images/static/${gearurl}`} />
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
                            {ver_new == "JP" ?
                                <>
                                    <div className='geartitletext' onClick={showmeraw}>{passive_ability_new.glname}{" - #"}{passive_ability_new.equip_id}</div><br />
                                    <div className='abilityJPname'>{passive_ability_new.name}</div>
                                </>
                                :
                                <>
                                    <div className='geartitletext' onClick={showmeraw}>{passive_ability_new.name}{" - #"}{passive_ability_new.equip_id}</div><br />
                                    <div className='abilityJPname'>{passive_ability_new.jpname}</div>
                                </>
                            }
                            <div onClick={() => makemaster(1)} className='clicky'>{ReplacerCharacter(`<${passive_ability_new.gear_tag}>`)}</div>
                        </div>
                        <div className='gearCPReqHolder spacearound'>
                            <span>
                                <span className="unique">Req.</span>
                                <span className="CPIcon CPIconSmaller" />
                            </span>
                            <span className="gearcpcostholder">&nbsp;{passive_ability_new.cp}</span>
                        </div>
                    </div>
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
                        data={passive_ability_new} />
                    </span>
                    : ""}
                {passive_ability_new && passive_ability_new.passives && passive_ability_new.passives.map((passive2,i) => (
                    <PassiveAbilityDif
                        key={passive2.pa_id}

                        passive_ability_new={passive2}
                        ver_new={ver_new}
                        passive_ability_old={passive_ability_old.passives[i]}
                        ver_old={ver_old}
                        master_index={master_index}
                        info={info}
                        gear={true}
                        chara_id_passoff={chara_id_passoff}
                        tag={passive_ability_new.gear_tag == "wp4w" || 
                                        passive_ability_new.gear_tag == "arm4a" || 
                                        passive_ability_new.gear_tag == "arm35a" || 
                                        passive_ability_new.gear_tag == "armhg" || 
                                        passive_ability_new.gear_tag == "armhgplus" ? 
                                        passive_ability_new.gear_tag : undefined
                                    }
                        header={true}
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

export default trackWindowScroll(EquipmentPassiveDif)