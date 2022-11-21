import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom'
import '../Characters.css';
import Tippy from './TippyDefaults.js'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const CharacterFilter = ({ match, reverse, Sortsearch, ProcessedCharacters,jptoggledata,spoilers }) => {

    const [ver,setver] = useState(jptoggledata == true ? "JP":"GL")

    useEffect(()=>{
        setver(jptoggledata == true ? "JP":"GL")
    },[jptoggledata])
 
    const idstoremove = match.map((char) => (
        char.CharID
    ));

    const filteredout = ProcessedCharacters.filter(function(char) {
        return idstoremove.indexOf(char.CharID) == -1
    });

    const cmp = function(a, b) {
        if (a > b) return +1;
        if (a < b) return -1;
        return 0;
    }

    filteredout
    .sort((a, b) => 
    reverse == false && Sortsearch == "" ? 
    b[`${ver}Order`] - a[`${ver}Order`] :
    null)
    .sort((a, b) => 
    reverse == true && Sortsearch == "" ? 
    a[`${ver}Order`] - b[`${ver}Order`] :
    null)
    .sort((a, b) => 
    reverse == false && Sortsearch == "Name" ? 
    cmp(b.CharacterName, a.CharacterName) :
    null)
    .sort((a, b) => 
    reverse == true && Sortsearch == "Name" ? 
    cmp(a.CharacterName, b.CharacterName) :
    null)
    .sort((a, b) => 
    reverse == false && Sortsearch == "Realm" ? 
    cmp(a.RealmPars, b.RealmPars) || cmp(a.Sort,b.Sort):
    null)
    .sort((a, b) => 
    reverse == true && Sortsearch == "Realm" ? 
    cmp(b.RealmPars, a.RealmPars) || cmp(a.Sort,b.Sort):
    null)
    .sort((a, b) => 
    reverse == false && Sortsearch == "JP" ? 
    b.JPOrder - a.JPOrder :
    null)
    .sort((a, b) => 
    reverse == true && Sortsearch == "JP" ? 
    a.JPOrder - b.JPOrder :
    null)
    .sort((a, b) => 
    reverse == true && Sortsearch == "HP" ? 
    a.HP - b.HP :
    null)
    .sort((a, b) => 
    reverse == false && Sortsearch == "HP" ? 
    b.HP - a.HP :
    null)
    .sort((a, b) => 
    reverse == true && Sortsearch == "INTBRV" ? 
    a.INTBRV - b.INTBRV :
    null)
    .sort((a, b) => 
    reverse == false && Sortsearch == "INTBRV" ? 
    b.INTBRV - a.INTBRV :
    null)
    .sort((a, b) => 
    reverse == true && Sortsearch == "MAXBRV" ? 
    a.MAXBRV - b.MAXBRV :
    null)
    .sort((a, b) => 
    reverse == false && Sortsearch == "MAXBRV" ? 
    b.MAXBRV - a.MAXBRV :
    null)
    .sort((a, b) => 
    reverse == true && Sortsearch == "ATK" ? 
    a.ATK - b.ATK :
    null)
    .sort((a, b) => 
    reverse == false && Sortsearch == "ATK" ? 
    b.ATK - a.ATK :
    null)
    .sort((a, b) => 
    reverse == true && Sortsearch == "DEF" ? 
    a.DEF - b.DEF :
    null)
    .sort((a, b) => 
    reverse == false && Sortsearch == "DEF" ? 
    b.DEF - a.DEF :
    null)
    .sort((a, b) => 
    reverse == true && Sortsearch == "SPD" ? 
    a.SPD - b.SPD :
    null)
    .sort((a, b) => 
    reverse == false && Sortsearch == "SPD" ? 
    b.SPD - a.SPD :
    null)

    match
    .sort((a, b) => 
    reverse == false && Sortsearch == "" ? 
    b[`${ver}Order`] - a[`${ver}Order`] :
    null)
    .sort((a, b) => 
    reverse == true && Sortsearch == "" ? 
    a[`${ver}Order`] - b[`${ver}Order`] :
    null)
    .sort((a, b) => 
    reverse == false && Sortsearch == "Name" ? 
    cmp(b.CharacterName, a.CharacterName) :
    null)
    .sort((a, b) => 
    reverse == true && Sortsearch == "Name" ? 
    cmp(a.CharacterName, b.CharacterName) :
    null)
    .sort((a, b) => 
    reverse == false && Sortsearch == "Realm" ? 
    cmp(a.RealmPars, b.RealmPars) || cmp(a.Sort,b.Sort) :
    null)
    .sort((a, b) => 
    reverse == true && Sortsearch == "Realm" ? 
    cmp(b.RealmPars, a.RealmPars) || cmp(a.Sort,b.Sort):
    null)
    .sort((a, b) => 
    reverse == false && Sortsearch == "JP" ? 
    b.JPOrder - a.JPOrder :
    null)
    .sort((a, b) => 
    reverse == true && Sortsearch == "JP" ? 
    a.JPOrder - b.JPOrder :
    null)
    .sort((a, b) => 
    reverse == true && Sortsearch == "HP" ? 
    a.HP - b.HP :
    null)
    .sort((a, b) => 
    reverse == false && Sortsearch == "HP" ? 
    b.HP - a.HP :
    null)
    .sort((a, b) => 
    reverse == true && Sortsearch == "INTBRV" ? 
    a.INTBRV - b.INTBRV :
    null)
    .sort((a, b) => 
    reverse == false && Sortsearch == "INTBRV" ? 
    b.INTBRV - a.INTBRV :
    null)
    .sort((a, b) => 
    reverse == true && Sortsearch == "MAXBRV" ? 
    a.MAXBRV - b.MAXBRV :
    null)
    .sort((a, b) => 
    reverse == false && Sortsearch == "MAXBRV" ? 
    b.MAXBRV - a.MAXBRV :
    null)
    .sort((a, b) => 
    reverse == true && Sortsearch == "ATK" ? 
    a.ATK - b.ATK :
    null)
    .sort((a, b) => 
    reverse == false && Sortsearch == "ATK" ? 
    b.ATK - a.ATK :
    null)
    .sort((a, b) => 
    reverse == true && Sortsearch == "DEF" ? 
    a.DEF - b.DEF :
    null)
    .sort((a, b) => 
    reverse == false && Sortsearch == "DEF" ? 
    b.DEF - a.DEF :
    null)
    .sort((a, b) => 
    reverse == true && Sortsearch == "SPD" ? 
    a.SPD - b.SPD :
    null)
    .sort((a, b) => 
    reverse == false && Sortsearch == "SPD" ? 
    b.SPD - a.SPD :
    null)

    const ct = new Date().getTime();

    const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

    function ordinal(n) {
      var s = ["", "", "", ""];
      var v = n%100;
      return n + (s[(v-20)%10] || s[v] || s[0]);
    }

    const convert_card = (chars)=>{
        if(spoilers == false && chars[`${ver}basic`] == false){
            return `https://dissidiacompendium.com/images/static/icons/misc/spoilercard2.png`
        } else {
            return `https://dissidiacompendium.com/images/static/characters/${chars.CharacterURLName}/cc.png`
        }
    }

    const bannerdisplay = <><span className="subtextgold">{filteredout.length}</span> Non-Matching Character{filteredout.length == 1 ? "" : "s"}</>

    return(
        <div>
            <div className="charlistholder centeralign">
                {match.map(chars => (
                    <Link className="characterlink" key={chars.CharID} to={'/characters/' + chars.ShortName}>
                    <li >
                        <LazyLoadImage className="charactercard" alt={chars.CharacterName} src={convert_card(chars)} effect="opacity"/>
                    </li>
                    {chars.JPSynergyStart == undefined && chars.GLSynergyStart == undefined ? "" :
                    <div className={chars.JPSynergyStart == undefined || chars.GLSynergyStart == undefined ? "bubble1" : "bubble2"}>
                    </div>
                    }
                        {chars.GLSynergyStart == undefined ? "" : 
                        <span className={`${chars.JPSynergyStart == undefined || chars.GLSynergyStart == undefined ? "textloc1" : chars.JPSynergyStart != undefined || chars.GLSynergyStart != undefined ? "textloc2" : "textloc1"} ${new Date(chars.GLSynergyStart) >= ct ? "greentext" : "redtext"}`}>
                            <span className='emoji'>🌎</span>
                            <br/>
                            {`${new Date(chars.GLSynergyStart) >= ct ? `${months[new Date(chars.GLSynergyStart).getMonth()] + "/" + ordinal(new Date(chars.GLSynergyStart).getDate())}` : `${months[new Date(chars.GLSynergyEnd).getMonth()] + "/" + ordinal(new Date(chars.GLSynergyEnd).getDate())}`}`}
                        </span>}
                        {chars.JPSynergyStart == undefined ? "" : 
                        <span className={`${chars.JPSynergyStart == undefined || chars.GLSynergyStart == undefined ? "textloc1" : chars.JPSynergyStart != undefined || chars.GLSynergyStart != undefined ? "textloc1" : "textloc2"} ${new Date(chars.JPSynergyStart) >= ct ? "greentext" : "redtext"}`}>
                            <span className="jpflagcharcard"/>
                            <br/>
                            {`${new Date(chars.JPSynergyStart) >= ct ? `${months[new Date(chars.JPSynergyStart).getMonth()] + "/" + ordinal(new Date(chars.JPSynergyStart).getDate())}` : `${months[new Date(chars.JPSynergyEnd).getMonth()] + "/" + ordinal(new Date(chars.JPSynergyEnd).getDate())}`}`}
                        </span>
                        }
                        {chars.JPSynergyStart == undefined && chars.GLSynergyStart == undefined ? "" :
                        <Tippy content={
                            <>
                            {chars.GLSynergyStart == undefined ? "" : new Date(chars.GLSynergyStart) >= ct ? <span className="greentext"><span className='emoji'>🌎</span> Synergy On:<br/>{months[new Date(chars.GLSynergyStart).getMonth()] + "/" + ordinal(new Date(chars.GLSynergyStart).getDate())}</span> : <span className="redtext">🌎 Synergy Ends:<br/>{months[new Date(chars.GLSynergyEnd).getMonth()] + "/" + ordinal(new Date(chars.GLSynergyEnd).getDate())}</span>}
                            {chars.JPSynergyStart != undefined ? chars.GLSynergyStart != undefined ? <br/> : "" : ""}
                            {chars.JPSynergyStart == undefined ? "" : new Date(chars.JPSynergyStart) >= ct ? <span className="greentext"><span className="jpflagupdate"></span> Synergy On:<br/>{months[new Date(chars.JPSynergyStart).getMonth()] + "/" + ordinal(new Date(chars.JPSynergyStart).getDate())}</span> : <span className="redtext"><span className="jpflagupdate"></span> Synergy Ends:<br/>{months[new Date(chars.JPSynergyEnd).getMonth()] + "/" + ordinal(new Date(chars.JPSynergyEnd).getDate())}</span>}
                            </>
                        }><div className="fakedivtip"></div>
                        </Tippy>}
                    </Link>
                ))}
                
            </div>
            {filteredout.length == 0 ? "" :
                <div className="nonmatchheader">
                {bannerdisplay}
                </div>}
            <div className="charlistholder centeralign">
            {filteredout.map(chars => (
                <Link className="characterlink"  key={chars.CharID + "dim"} to={'/characters/' + chars.ShortName}>
                <li >
                    <LazyLoadImage className="charactercard dim" alt={chars.CharacterName} src={convert_card(chars)} effect="opacity"/>
                </li>
                {chars.JPSynergyStart == undefined && chars.GLSynergyStart == undefined ? "" :
                    <div className={chars.JPSynergyStart == undefined || chars.GLSynergyStart == undefined ? "bubble1 dim" : "bubble2 dim"}>
                    </div>
                    }
                    {chars.GLSynergyStart == undefined ? "" : 
                        <span className={`${chars.JPSynergyStart == undefined || chars.GLSynergyStart == undefined ? "textloc1" : chars.JPSynergyStart != undefined || chars.GLSynergyStart != undefined ? "textloc2" : "textloc1"} ${chars.GLSynergyStart >= ct ? "greentext" : "redtext"}`}>
                            <span className='emoji'>🌎</span>
                            <br/>
                            {`${new Date(chars.GLSynergyStart) >= ct ? `${months[new Date(chars.GLSynergyStart).getMonth()] + "/" + ordinal(new Date(chars.GLSynergyStart).getDate())}` : `${months[new Date(chars.GLSynergyEnd).getMonth()] + "/" + ordinal(new Date(chars.GLSynergyEnd).getDate())}`}`}
                        </span>}
                        {chars.JPSynergyStart == undefined ? "" : 
                        <span className={`${chars.JPSynergyStart == undefined || chars.GLSynergyStart == undefined ? "textloc1" : chars.JPSynergyStart != undefined || chars.GLSynergyStart != undefined ? "textloc1" : "textloc2"} ${new Date(chars.JPSynergyStart) >= ct ? "greentext" : "redtext"}`}>
                            <span className="jpflagcharcard"/>
                            <br/>
                            {`${new Date(chars.JPSynergyStart) >= ct ? `${months[new Date(chars.JPSynergyStart).getMonth()] + "/" + ordinal(new Date(chars.JPSynergyStart).getDate())}` : `${months[new Date(chars.JPSynergyEnd).getMonth()] + "/" + ordinal(new Date(chars.JPSynergyEnd).getDate())}`}`}
                        </span>
                        }
                        {chars.JPSynergyStart == undefined && chars.GLSynergyStart == undefined ? "" :
                        <Tippy content={
                            <>
                            {chars.GLSynergyStart == undefined ? "" : new Date(chars.GLSynergyStart) >= ct ? <span className="greentext"><span className='emoji'>🌎</span> Synergy On:<br/>{months[new Date(chars.GLSynergyStart).getMonth()] + "/" + ordinal(new Date(chars.GLSynergyStart).getDate())}</span> : <span className="redtext">🌎 Synergy Ends:<br/>{months[new Date(chars.GLSynergyEnd).getMonth()] + "/" + ordinal(new Date(chars.GLSynergyEnd).getDate())}</span>}
                            {chars.JPSynergyStart != undefined ? chars.GLSynergyStart != undefined ? <br/> : "" : ""}
                            {chars.JPSynergyStart == undefined ? "" : new Date(chars.JPSynergyStart) >= ct ? <span className="greentext"><span className="jpflagupdate"></span> Synergy On:<br/>{months[new Date(chars.JPSynergyStart).getMonth()] + "/" + ordinal(new Date(chars.JPSynergyStart).getDate())}</span> : <span className="redtext"><span className="jpflagupdate"></span> Synergy Ends:<br/>{months[new Date(chars.JPSynergyEnd).getMonth()] + "/" + ordinal(new Date(chars.JPSynergyEnd).getDate())}</span>}
                            </>
                    }><div className="fakedivtip"></div>
                        </Tippy>}
                    </Link>
            ))}
            </div>
        </div>
    )
    
}
export default CharacterFilter;