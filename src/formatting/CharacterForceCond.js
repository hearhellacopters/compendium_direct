import React, {useState, useEffect } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import { Link } from 'react-router-dom'
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import addformatting from "../processing/replacer_enemydesc";
import roles from '../formatting/roles.json'
import Tippy from "../formatting/TippyDefaults";

const FRCond = ({ match, ProcessedCharacters, PartnerCharacters }) => {

    const Partner = match.FR_Partner == undefined ? PartnerCharacters[1] : PartnerCharacters[match.FR_Partner]

    const [columns,setcolumns]  =useStateIfMounted(`${window.innerWidth == undefined ? 2 : window.innerWidth > 799 ? 3 : window.innerWidth > 349 ? 2 : 1}`)
    const [run_helpers, setrun_helpers] =useStateIfMounted(false)
    const [ran, setran] =useStateIfMounted(false)

    const [set_helpers, setset_helpers] =useStateIfMounted(match.FR_Cond_Tag && match.FR_Cond_Tag.split(" "))
    const [set_chars, setset_chars] =useStateIfMounted(match.FRCharArray)
    const [force_helpers, setforcehelpers] = useStateIfMounted([])

    const cmp = function(a, b) {
        if (a > b) return +1;
        if (a < b) return -1;
        return 0;
    }

    const column_helper = function(normal, length) {
        var returner = normal
        if(length >= 7){
            returner = 3
        }
        if(length < 7){
            returner = 2
        }
        if(length < 3){
            returner = 1
        }
        if(returner >= normal){
            return normal
        } else {
            return returner
        }
    }

    useEffect(()=>{
        const helper_holder = {}
        if(run_helpers == true && ran == false){
            set_helpers && set_helpers.map(self=>{
                const helper_pull = Object.values(PartnerCharacters).filter(function (ef) {
                    return ef[`${self}`] === true;
                  });
                  
                  helper_pull.map(self3=>{
                    if(helper_holder[self3.CharID] == undefined){
                        Object.assign(helper_holder,{[self3.CharID]: {GLOrder: self3.GLOrder, RealmPars: self3.RealmPars, Sort: self3.Sort, ShortName: self3.ShortName, CharacterFaceURL: self3.CharacterFaceURL, CharacterName: self3.CharacterName, CharID: self3.CharID, roles:[self]}})
                    } else {
                        helper_holder[self3.CharID].roles.push(self)
                    }
                  })
            })
            set_chars && set_chars.map(self=>{
                const single = PartnerCharacters[self.CharID] && PartnerCharacters[self.CharID]
                if(helper_holder[self.CharID] == undefined){
                    Object.assign(helper_holder,{[self.CharID]: {GLOrder: single.GLOrder, RealmPars: single.RealmPars, Sort: single.Sort, ShortName: single.ShortName, CharacterFaceURL: single.CharacterFaceURL, CharacterName: single.CharacterName, CharID: self.CharID, roles: ["Character"]}})
                } else {
                    helper_holder[self.CharID].roles.push("Character")
                }
            })
            const final_arry = Object.values(helper_holder).sort((a, b) => cmp(a.RealmPars, b.RealmPars) || cmp(a.Sort,b.Sort))
            setran(true)
            setforcehelpers(final_arry)
            setcolumns(`${window.innerWidth == undefined ? column_helper(2,final_arry.length) : window.innerWidth > 799 ? column_helper(3,final_arry.length) : window.innerWidth > 349 ? column_helper(2,final_arry.length) : column_helper(1,final_arry.length)}`)
        }
    },[run_helpers,ran,PartnerCharacters,set_helpers,setforcehelpers,setran,setcolumns,set_chars])

    

    return(
        <div className="buffunit purpleoveride">
            <div className="infoholder" style={{ minHeight: "230px"}}>
                <LazyLoadComponent>
                <div className="infotitleholder">
                    <div className="force_background">
                        <div className="faceandiconholder">
                            <Link to={`/characters/` + match.ShortName}>
                            <div className="faceholder">
                                <LazyLoadImage effect="opacity" alt={match.CharacterName} className="faceicon" src={match.CharacterFaceURL}/>
                                <div className="facetext">{`${match.CharacterName == "Cloud of Darkness" ? "CoD" : match.CharacterName == "Warrior of Light" ? "WoL" : match.CharacterName}`}</div>
                            </div>
                            </Link>
                        </div>
                        <div className="faceandiconholder">
                            <Link to={`/characters/` + Partner && Partner.ShortName}>
                            <div className="faceholder">
                                <LazyLoadImage effect="opacity" alt={Partner && Partner.CharacterName} className="faceicon" src={Partner && Partner.CharacterFaceURL}/>
                                <div className="facetext">{`${Partner && Partner.CharacterName == "Cloud of Darkness" ? "CoD" : Partner && Partner.CharacterName == "Warrior of Light" ? "WoL" : Partner && Partner.CharacterName}`}</div>
                            </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="infonameholder wpadding blackbase">
                    {addformatting(match.AbilityFR)}
                    
                </div>
                <div className="subtext_brev">*info is truncated for brevity, see ability page for full details</div>
                <div className='zone'>
                    <div className={`featuredbanner force_coloring noshowbottomline`}>
                        <div onClick={()=>setrun_helpers((prevstate)=>!prevstate)} className='loadmorespheres'>
                        {run_helpers == false ? "Show Helpers" :"Hide Helpers" }
                        </div>
                    </div>
                    {run_helpers == false ?
                        ""
                        :
                        force_helpers.length == 0 ? 
                        <div className="charholderflair noshowbottomline force_coloring2">
                            No Helpers listed for above conditions
                        </div>
                        : 
                        <div className={`charholderflair${run_helpers == true ? " noshowbottomline force_coloring2" :""}`}>
                            <ul className={`CharNameHolder`} style={{columnCount: columns, MozColumnsCount: columns, WebkitColumnsCount: columns}}>
                            {force_helpers.map((self,i)=>(
                                <li key={i}>
                                    
                                    <Link className="linkforce" to={`/characters/${self.ShortName}`}>
                                        {self.CharacterName}:
                                    </Link><br/>
                                   
                                    {self.roles.map((self3,i)=>(
                                        <Tippy key={i} content={roles[self3].name}>
                                        <span className="rolesforforce" style={{backgroundSize: "contain", backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${roles[self3].url})`}}>
                                        </span>
                                        </Tippy>
                                    ))}
                                    
                                </li>
                            ))}
                            </ul>
                        </div>
                        }
                </div>
                </LazyLoadComponent>
            </div>
        </div>
    )
}

export default FRCond