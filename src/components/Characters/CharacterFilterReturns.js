import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Tippy from '../../components/TippyDefaults.js'
import { LazyLoadImage, LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';

function CharacterFilterReturns({ 
    match, 
    reverse, 
    Sortsearch, 
    ProcessedCharacters, 
    jptoggledata, 
    spoilers,
    scrollPosition
}){

    const [ver, setver] = useState(jptoggledata == true ? "JP" : "GL")

    useEffect(() => {
        setver(jptoggledata == true ? "JP" : "GL")
    }, [jptoggledata])

    const idstoremove = match.map((char) => (
        char.CharID
    ));

    const filteredout = ProcessedCharacters.filter(function (char) {
        return idstoremove.indexOf(char.CharID) == -1
    });

    const cmp = function (a, b) {
        if (a > b) return +1;
        if (a < b) return -1;
        return 0;
    }

    function filter_compare(a, b) {
        if(Sortsearch == ""){
            if(reverse == false ){
                return (b[`${ver}Order`] || 0 )- (a[`${ver}Order`] || 0 )
            } else {
                return a[`${ver}Order`] - b[`${ver}Order`] 
            }
        }
        if(Sortsearch == "Name"){
            if(reverse == false){
                return cmp(a.CharacterName, b.CharacterName) 
            } else {
                return cmp(b.CharacterName, a.CharacterName)
            }
        }
        if(Sortsearch == "Realm"){
            if(reverse == false){
                return cmp(a.RealmPars, b.RealmPars) || cmp(a.Sort, b.Sort)
            } else {
                return cmp(b.RealmPars, a.RealmPars) || cmp(a.Sort, b.Sort)
            }
        }
        if(Sortsearch == "JP"){
            if(reverse == false){
                return b.JPOrder - a.JPOrder 
            } else {
                return a.JPOrder - b.JPOrder
            }
        }
      }

    filteredout.sort(filter_compare)

    match.sort(filter_compare)

    const ct = new Date().getTime();

    const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

    function ordinal(n) {
        var s = ["", "", "", ""];
        var v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }


    const convert_card = (chars) => {
        var fr = ''
        var bt = ''
        if (chars[`${ver}traits`] && chars[`${ver}traits`].FRFlag == true) {
            fr = "_FR"
        }
        if (chars[`${ver}traits`] && chars[`${ver}traits`].Board5Flag == true) {
            fr = "_FRExt"
        }
        if (chars[`${ver}traits`] && chars[`${ver}traits`].BTPlusFlag == true) {
            bt = "_BT"
        }

        if (spoilers == false && chars[`${ver}basic`] == false) {
            return `https://dissidiacompendium.com/images/static/icons/misc/spoilercard2.png`
        } else {
            return `https://dissidiacompendium.com/images/static/characters/${chars.CharacterURLName}/cc${fr}${bt}.png`
        }
    }

    const bannerdisplay = <><span className="subtextgold">{filteredout.length}</span> Non-Matching Character{filteredout.length == 1 ? "" : "s"}</>

    return (
        <LazyLoadComponent
        scrollPosition={scrollPosition}
        placeholder={<div className="charlistholder centeralign"/>}
        >
            <div className="charlistholder centeralign">
                {match.map(chars => (
                    <Link className="characterlink" key={chars.CharID} to={'/characters/' + chars.ShortName}>
                        <li >
                            <LazyLoadImage 
                            scrollPosition={scrollPosition}
                            effect="opacity" 
                            className="charactercard" 
                            alt={chars.CharacterName} 
                            src={convert_card(chars)} />
                        </li>
                        {chars.JPSynergyStart == undefined && chars.GLSynergyStart == undefined ? "" :
                            <div className={chars.JPSynergyStart == undefined || chars.GLSynergyStart == undefined ? "bubble1" : "bubble2"}>
                            </div>
                        }
                        {chars.GLSynergyStart == undefined ? "" :
                            <span className={`${chars.JPSynergyStart == undefined || chars.GLSynergyStart == undefined ? "textloc1" : chars.JPSynergyStart != undefined || chars.GLSynergyStart != undefined ? "textloc2" : "textloc1"} ${new Date(chars.GLSynergyStart) >= ct ? "greentext" : "redtext"}`}>
                                <span className='emoji'>🌎</span>
                                <br />
                                {`${new Date(chars.GLSynergyStart) >= ct ? `${months[new Date(chars.GLSynergyStart).getMonth()] + "/" + ordinal(new Date(chars.GLSynergyStart).getDate())}` : `${months[new Date(chars.GLSynergyEnd).getMonth()] + "/" + ordinal(new Date(chars.GLSynergyEnd).getDate())}`}`}
                            </span>}
                        {chars.JPSynergyStart == undefined ? "" :
                            <span className={`${chars.JPSynergyStart == undefined || chars.GLSynergyStart == undefined ? "textloc1" : chars.JPSynergyStart != undefined || chars.GLSynergyStart != undefined ? "textloc1" : "textloc2"} ${new Date(chars.JPSynergyStart) >= ct ? "greentext" : "redtext"}`}>
                                <span className="jpflagcharcard" />
                                <br />
                                {`${new Date(chars.JPSynergyStart) >= ct ? `${months[new Date(chars.JPSynergyStart).getMonth()] + "/" + ordinal(new Date(chars.JPSynergyStart).getDate())}` : `${months[new Date(chars.JPSynergyEnd).getMonth()] + "/" + ordinal(new Date(chars.JPSynergyEnd).getDate())}`}`}
                            </span>
                        }
                        {chars.JPSynergyStart == undefined && chars.GLSynergyStart == undefined ? "" :
                            <Tippy content={
                                <>
                                    {chars.GLSynergyStart == undefined ? "" : new Date(chars.GLSynergyStart) >= ct ? <span className="greentext"><span className='emoji'>🌎</span> Synergy On:<br />{months[new Date(chars.GLSynergyStart).getMonth()] + "/" + ordinal(new Date(chars.GLSynergyStart).getDate())}</span> : <span className="redtext">🌎 Synergy Ends:<br />{months[new Date(chars.GLSynergyEnd).getMonth()] + "/" + ordinal(new Date(chars.GLSynergyEnd).getDate())}</span>}
                                    {chars.JPSynergyStart != undefined ? chars.GLSynergyStart != undefined ? <br /> : "" : ""}
                                    {chars.JPSynergyStart == undefined ? "" : new Date(chars.JPSynergyStart) >= ct ? <span className="greentext"><span className="jpflagupdate"></span> Synergy On:<br />{months[new Date(chars.JPSynergyStart).getMonth()] + "/" + ordinal(new Date(chars.JPSynergyStart).getDate())}</span> : <span className="redtext"><span className="jpflagupdate"></span> Synergy Ends:<br />{months[new Date(chars.JPSynergyEnd).getMonth()] + "/" + ordinal(new Date(chars.JPSynergyEnd).getDate())}</span>}
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
                    <Link className="characterlink" key={chars.CharID + "dim"} to={'/characters/' + chars.ShortName}>
                        <li >
                            <LazyLoadImage 
                            scrollPosition={scrollPosition}
                            effect="opacity" 
                            className="charactercard dim" 
                            alt={chars.CharacterName} 
                            src={convert_card(chars)}/>
                        </li>
                        {chars.JPSynergyStart == undefined && chars.GLSynergyStart == undefined ? "" :
                            <div className={chars.JPSynergyStart == undefined || chars.GLSynergyStart == undefined ? "bubble1 dim" : "bubble2 dim"}>
                            </div>
                        }
                        {chars.GLSynergyStart == undefined ? "" :
                            <span className={`${chars.JPSynergyStart == undefined || chars.GLSynergyStart == undefined ? "textloc1" : chars.JPSynergyStart != undefined || chars.GLSynergyStart != undefined ? "textloc2" : "textloc1"} ${chars.GLSynergyStart >= ct ? "greentext" : "redtext"}`}>
                                <span className='emoji'>🌎</span>
                                <br />
                                {`${new Date(chars.GLSynergyStart) >= ct ? `${months[new Date(chars.GLSynergyStart).getMonth()] + "/" + ordinal(new Date(chars.GLSynergyStart).getDate())}` : `${months[new Date(chars.GLSynergyEnd).getMonth()] + "/" + ordinal(new Date(chars.GLSynergyEnd).getDate())}`}`}
                            </span>}
                        {chars.JPSynergyStart == undefined ? "" :
                            <span className={`${chars.JPSynergyStart == undefined || chars.GLSynergyStart == undefined ? "textloc1" : chars.JPSynergyStart != undefined || chars.GLSynergyStart != undefined ? "textloc1" : "textloc2"} ${new Date(chars.JPSynergyStart) >= ct ? "greentext" : "redtext"}`}>
                                <span className="jpflagcharcard" />
                                <br />
                                {`${new Date(chars.JPSynergyStart) >= ct ? `${months[new Date(chars.JPSynergyStart).getMonth()] + "/" + ordinal(new Date(chars.JPSynergyStart).getDate())}` : `${months[new Date(chars.JPSynergyEnd).getMonth()] + "/" + ordinal(new Date(chars.JPSynergyEnd).getDate())}`}`}
                            </span>
                        }
                        {chars.JPSynergyStart == undefined && chars.GLSynergyStart == undefined ? "" :
                            <Tippy content={
                                <>
                                    {chars.GLSynergyStart == undefined ? "" : new Date(chars.GLSynergyStart) >= ct ? <span className="greentext"><span className='emoji'>🌎</span> Synergy On:<br />{months[new Date(chars.GLSynergyStart).getMonth()] + "/" + ordinal(new Date(chars.GLSynergyStart).getDate())}</span> : <span className="redtext">🌎 Synergy Ends:<br />{months[new Date(chars.GLSynergyEnd).getMonth()] + "/" + ordinal(new Date(chars.GLSynergyEnd).getDate())}</span>}
                                    {chars.JPSynergyStart != undefined ? chars.GLSynergyStart != undefined ? <br /> : "" : ""}
                                    {chars.JPSynergyStart == undefined ? "" : new Date(chars.JPSynergyStart) >= ct ? <span className="greentext"><span className="jpflagupdate"></span> Synergy On:<br />{months[new Date(chars.JPSynergyStart).getMonth()] + "/" + ordinal(new Date(chars.JPSynergyStart).getDate())}</span> : <span className="redtext"><span className="jpflagupdate"></span> Synergy Ends:<br />{months[new Date(chars.JPSynergyEnd).getMonth()] + "/" + ordinal(new Date(chars.JPSynergyEnd).getDate())}</span>}
                                </>
                            }><div className="fakedivtip"></div>
                            </Tippy>}
                    </Link>
                ))}
            </div>
        </LazyLoadComponent>
    )

}

export default trackWindowScroll(CharacterFilterReturns)