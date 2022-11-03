import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import { useStateIfMounted } from "use-state-if-mounted";
import Passive_Ability_Formatting from './formatting/passives/Passive_Ability_Formatting.js'
import ReactJson from '@microlink/react-json-view'
import { StartsInTimer } from '../../formatting/Timers.js';
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';

const Equipment_Passive_Handler =({
    gear,

    ver,
    loc,
    file,
    Single,
    passivenames,
    equipmentpassivenames,
    AilmentNames,
    CommandNames,
    CondData,
    Ailment_Effects,
    MessageData_Category,
    MessageData_FFSeries,
    passive_effects_data,
    command_data_effects,
    ailment_group,
    command_group,
    CastNames,
    enemy_type,
    char_id,
    cast_targets,
    effect_,
    require_passive,
    passive_target,
    trap_type,
    param_id,
    attack_type,
    killer_type,
    elementid_1,
    command_type,
    target_range_,
    formatting,

    link
})=>{

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

    const makegear = {
        "wp4w":"4w",
        "wp15":"15",
        "wpwoi":"woi",
        "wp35":"35",
        "wpnt":"NT",
        "wpdark":"dark",
        "wpex":"ex",
        "wpexplus":"ex+",
        "wpld":"ld",
        "wpfr":"fr",
        "wpbt":"bt",
        "wpbtplus":"bt+",
        "armbloom": "bloom",
        "arm4a":"4a",
        "arm35a": "35a",
        "armhg": "hg",
        "armhgplus": "hg+",
        "arm7a": "7a",
        "arm7aplus": "7a+"
      }

      var getname = undefined

      const makeurl =(id,tag,gear)=>{
            getname = char_id[id] && char_id[id].name && char_id[id].name.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"")
            const getgear = makegear[tag]
            if(id == undefined || tag == undefined){
                return `/characters/UltimaWeapons/${gear.type}0.png`
            }
            if(getname == undefined || getgear == undefined){
                return `/icons/misc/GearMissing.png`
            } else {
                return `/characters/${getname}/${getgear}.png`
            }
      }
      const match = gear

      const [gearurl,setgearurl] = useStateIfMounted(makeurl(gear.chara_id,gear.gear_tag,gear))
      const [master,setmaster] =useStateIfMounted(false)
      const [ultima,setultima] =useStateIfMounted(gear.ultima)

      const makemaster = (value)=>{
        if(master == true && ultima != true){
            if(gear.gear_tag != "armbloom" ){
                if(gear.gear_tag != "wpbt" ){
                    if(gear.gear_tag != "arm7a" ){
                        setmaster(false)
                        setgearurl(gearurl.replace(/(.*)(m.png)/,"$1.png"))
                    }
                }
            }
        } else {
            if(ultima != true){
                if(gear.gear_tag != "armbloom" ){
                    if(gear.gear_tag != "wpbt" ){
                        if(gear.gear_tag != "arm7a" ){
                            setmaster(true)
                            setgearurl(gearurl.replace(/(.*)(\.png)/,"$1m$2"))
                        }
                    }
                }
            } else {
                setgearurl(gearurl.replace(/(\d).png/,`${value}.png`))
            }
        }
    }

    const ct = new Date().getTime();

    var rData = undefined
    if(ver == "JP"){
        const date_check = gear.start_date && new Date(`${gear.start_date.toString().replace(/ /,"T")}.000+09:00`);
        if(date_check && date_check.getTime() > ct){  
            rData = date_check
        }
    } else{
        const date_check2 = gear.start_date && new Date(`${gear.start_date.toString().replace(/ /,"T")}Z`);
        if(date_check2 && date_check2.getTime() > ct){  
            rData = date_check2
        }
    }

    return(
        <div className='buffunit' >
            <div className='infoholder' style={{ minHeight: "350px"}}>
                <LazyLoadComponent>
                <div className='geartoplevel'>
                        <div className='gearimageholder'>
                        {link == undefined ?
                        <LazyLoadImage effect="opacity" className={`gearimage${link != undefined ? " clicky" : ""}`} src={`https://dissidiacompendium.com/images/static/${gearurl}`}/>
                        :
                        <Link to={`/characters/${getname.toLowerCase()}/${link}`}>
                            <LazyLoadImage effect="opacity" className={`gearimage${link != undefined ? " clicky" : ""}`} src={`https://dissidiacompendium.com/images/static/${gearurl}`}/>
                        </Link>
                        }
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
                                <td onClick={()=>makemaster(0)} className={`rightborder topborder leftborder greybackground ${ultima?"click":""}`}><div className={`lb0${ultima==true?5:""} lsmaller`}/></td>
                                <td className="rightborder topborder">{match.HP0}</td>
                                <td className="rightborder topborder">{match.DEF0}</td>
                                <td className="rightborder topborder">{match.INTBRV0}</td>
                                <td className="rightborder topborder">{match.MAXBRV0}</td>
                                <td className="topborder">{match.ATK0}</td>
                                <td className={`whiterightborder whitetopborder blackbg ${match.LimitBreaks == 1 ? "whitebottomborder" : ""}`}>{match.CPGains0}</td>
                            </tr>
                            {match.LimitBreaks >= 2 ? 
                            <tr className={`statsflairperstat topborder`}>
                                <td onClick={()=>makemaster(1)} className={`rightborder topborder leftborder greybackground ${ultima?"click":""}`}><div className={`lb1${ultima==true?5:""} lsmaller`}/></td>
                                <td className="rightborder topborder">{match.HP1}</td>
                                <td className="rightborder topborder">{match.DEF1}</td>
                                <td className="rightborder topborder">{match.INTBRV1}</td>
                                <td className="rightborder topborder">{match.MAXBRV1}</td>
                                <td className="topborder">{match.ATK1}</td>
                                <td className="whitetopborder blackbg whiterightborder">{match.CPGains1}</td>
                            </tr>:null}
                            {match.LimitBreaks >= 3 ? 
                            <tr className={`statsflairperstat topborder`}>
                                <td onClick={()=>makemaster(2)} className={`rightborder topborder leftborder greybackground ${ultima?"click":""}`} ><div className={`lb2${ultima==true?5:""} lsmaller`}/></td>
                                <td className="rightborder topborder">{match.HP2}</td>
                                <td className="rightborder topborder">{match.DEF2}</td>
                                <td className="rightborder topborder">{match.INTBRV2}</td>
                                <td className="rightborder topborder">{match.MAXBRV2}</td>
                                <td className="topborder">{match.ATK2}</td>
                                <td className="whitetopborder blackbg whiterightborder">{match.CPGains2}</td>
                            </tr> :null}
                            {match.LimitBreaks >= 4 ? 
                            <tr className={`statsflairperstat topborder ${match.LimitBreaks == 4 ? "statsender": ""}`}>
                                <td onClick={()=>makemaster(3)} className="rightborder topborder leftborder greybackground click"><div className={`lb3${ultima==true?5:""} lsmaller`}/></td>
                                <td className="rightborder topborder">{match.HP3}</td>
                                <td className="rightborder topborder">{match.DEF3}</td>
                                <td className="rightborder topborder">{match.INTBRV3}</td>
                                <td className="rightborder topborder">{match.MAXBRV3}</td>
                                <td className="topborder">{match.ATK3}</td>
                                <td className={`whitetopborder blackbg whiterightborder ${match.LimitBreaks >= 5 ? "" : "whitebottomborder"}`}>{match.CPGains3}</td>
                            </tr> :null}
                            {match.LimitBreaks >= 5 ? 
                            <tr className={`statsflairperstat topborder`}>
                                <td onClick={()=>makemaster(4)} className="rightborder topborder leftborder greybackground click"><div className={`lb4${ultima==true?5:""} lsmaller`}/></td>
                                <td className="rightborder topborder">{match.HP4}</td>
                                <td className="rightborder topborder">{match.DEF4}</td>
                                <td className="rightborder topborder">{match.INTBRV4}</td>
                                <td className="rightborder topborder">{match.MAXBRV4}</td>
                                <td className="topborder">{match.ATK4}</td>
                                <td className="whitetopborder blackbg whiterightborder whitebottomborder">{match.CPGains4}</td>
                            </tr> :null}
                            {match.LimitBreaks >= 6 ? 
                            <tr className={`statsflairperstat topborder ${match.LimitBreaks == 6 ? "statsender": ""}`}>
                                <td onClick={()=>makemaster(5)} className="rightborder topborder leftborder greybackground click"><div className={`lb5${ultima==true?5:""} lsmaller`}/></td>
                                <td className="rightborder topborder">{match.HP5}</td>
                                <td className="rightborder topborder">{match.DEF5}</td>
                                <td className="rightborder topborder">{match.INTBRV5}</td>
                                <td className="rightborder topborder">{match.MAXBRV5}</td>
                                <td className="topborder">{match.ATK5}</td>
                                <td className="blackbg whiterightborder whitebottomborder">{match.CPGains5}</td>
                            </tr> :null}
                            </tbody>
                        </table>
                    </div>
                    <div className='gearinfonameholder blackbanner'>
                        <div className='displayfex'>
                            <div className='splitrow'>
                                {ver == "JP" ?
                                <>
                                <div className='geartitletext' onClick={showmeraw}>{gear.glname}{" - #"}{gear.equip_id}</div><br/>
                                <div className='abilityJPname'>{gear.name}</div>
                                </>
                                :
                                <>
                                <div className='geartitletext' onClick={showmeraw}>{gear.name}{" - #"}{gear.equip_id}</div><br/>
                                <div className='abilityJPname'>{gear.jpname}</div>
                                </>
                                }
                                <div onClick={()=>makemaster(1)} className={`${gear.gear_tag}button undertag`}/>
                            </div>
                            <div className='gearCPReqHolder spacearound'>
                                <span>
                                <span className="unique">Req.</span>
                                <span className="CPIcon CPIconSmaller"/>
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
                            :""}
                    </div>
                    {showraw == true?
                        <ReactJson iconStyle={"square"} quotesOnKeys={false} name={"Raw"} displayDataTypes={false} collapsed={false} theme={"threezerotwofour"} src={gear}/>
                        :""}
                    {gear && gear.passives && gear.passives.map(passive2=>(
                        <Passive_Ability_Formatting 
                        key={passive2.pa_id}
                        passive_ability={passive2}
                        ver={ver}
                        loc={loc}
                        file={"exskill"}
                        Single={true}
                        passivenames={passivenames}
                        equipmentpassivenames={equipmentpassivenames}
                        AilmentNames={AilmentNames}
                        CommandNames={CommandNames}
                        CondData={CondData}
                        Ailment_Effects={Ailment_Effects}
                        MessageData_Category={MessageData_Category}
                        MessageData_FFSeries={MessageData_FFSeries}
                        command_data_effects={command_data_effects}
                        passive_effects_data={passive_effects_data}
                        ailment_group={ailment_group}
                        command_group={command_group}
                        CastNames={CastNames}
                        enemy_type={enemy_type}
                        char_id={char_id}
                        cast_targets={cast_targets}
                        effect_={effect_}
                        require_passive={require_passive}
                        passive_target={passive_target}
                        trap_type={trap_type}
                        param_id={param_id}
                        attack_type={attack_type}
                        killer_type={killer_type}
                        elementid_1={elementid_1}
                        command_type={command_type}
                        target_range_={target_range_}
                        formatting={formatting}
                        gear={true}
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
                    <th className="blackcapborder "><div className="CPIcon CPIconSmaller"/></th>
                </tr>
                </thead>
                <tbody>
                <tr className={`statsflairperstat topborder`}>
                    <td className={`rightborder topborder leftborder greybackground `}><div className={`lb0${ultima==true?5:""} lsmaller`}/></td>
                    <td className="rightborder topborder">{match.HP0}</td>
                    <td className="rightborder topborder">{match.DEF0}</td>
                    <td className="rightborder topborder">{match.INTBRV0}</td>
                    <td className="rightborder topborder">{match.MAXBRV0}</td>
                    <td className="topborder">{match.ATK0}</td>
                    <td className={`whiterightborder whitetopborder blackbg ${match.LimitBreaks == 1 ? "whitebottomborder" : ""}`}>{match.CPGains0}</td>
                </tr>
                {match.LimitBreaks >= 2 ? 
                <tr className={`statsflairperstat topborder`}>
                    <td className={`rightborder topborder leftborder greybackground `}><div className={`lb1${ultima==true?5:""} lsmaller`}/></td>
                    <td className="rightborder topborder">{match.HP1}</td>
                    <td className="rightborder topborder">{match.DEF1}</td>
                    <td className="rightborder topborder">{match.INTBRV1}</td>
                    <td className="rightborder topborder">{match.MAXBRV1}</td>
                    <td className="topborder">{match.ATK1}</td>
                    <td className="whitetopborder blackbg whiterightborder">{match.CPGains1}</td>
                </tr>:null}
                {match.LimitBreaks >= 3 ? 
                <tr className={`statsflairperstat topborder`}>
                    <td className={`rightborder topborder leftborder greybackground `} ><div className={`lb2${ultima==true?5:""} lsmaller`}/></td>
                    <td className="rightborder topborder">{match.HP2}</td>
                    <td className="rightborder topborder">{match.DEF2}</td>
                    <td className="rightborder topborder">{match.INTBRV2}</td>
                    <td className="rightborder topborder">{match.MAXBRV2}</td>
                    <td className="topborder">{match.ATK2}</td>
                    <td className="whitetopborder blackbg whiterightborder">{match.CPGains2}</td>
                </tr> :null}
                {match.LimitBreaks >= 4 ? 
                <tr className={`statsflairperstat topborder ${match.LimitBreaks == 4 ? "statsender": ""}`}>
                    <td className="rightborder topborder leftborder greybackground click"><div className={`lb3${ultima==true?5:""} lsmaller`}/></td>
                    <td className="rightborder topborder">{match.HP3}</td>
                    <td className="rightborder topborder">{match.DEF3}</td>
                    <td className="rightborder topborder">{match.INTBRV3}</td>
                    <td className="rightborder topborder">{match.MAXBRV3}</td>
                    <td className="topborder">{match.ATK3}</td>
                    <td className={`whitetopborder blackbg whitebottomborder whiterightborder `}>{match.CPGains3}</td>
                </tr> :null}
                {match.LimitBreaks >= 5 ? 
                <tr className={`statsflairperstat topborder`}>
                    <td className="rightborder topborder leftborder greybackground click"><div className={`lb4${ultima==true?5:""} lsmaller`}/></td>
                    <td className="rightborder topborder">{match.HP4}</td>
                    <td className="rightborder topborder">{match.DEF4}</td>
                    <td className="rightborder topborder">{match.INTBRV4}</td>
                    <td className="rightborder topborder">{match.MAXBRV4}</td>
                    <td className="topborder">{match.ATK4}</td>
                    <td className={`whitetopborder blackbg whitebottomborder whiterightborder `}>{match.CPGains4}</td>
                </tr> :null}
                {match.LimitBreaks >= 6 ? 
                <tr className={`statsflairperstat topborder ${match.LimitBreaks == 6 ? "statsender": ""}`}>
                    <td className="rightborder topborder leftborder greybackground click"><div className={`lb5${ultima==true?5:""} lsmaller`}/></td>
                    <td className="rightborder topborder">{match.HP5}</td>
                    <td className="rightborder topborder">{match.DEF5}</td>
                    <td className="rightborder topborder">{match.INTBRV5}</td>
                    <td className="rightborder topborder">{match.MAXBRV5}</td>
                    <td className="topborder">{match.ATK5}</td>
                    <td className={`whitetopborder blackbg whiterightborder `}>{match.CPGains5}</td>
                </tr> :null}
                </tbody>
                </table>
                </LazyLoadComponent>
            </div>
        </div>
    )
}
export default Equipment_Passive_Handler