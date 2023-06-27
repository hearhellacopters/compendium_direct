import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import ReplacerCharacter from '../ReplacerCharacter';

export default function CharacterBrevityProfileFormatting({ match }){

    const [showforce, setshowforce] = useState(false)
    const [showBrevity, setShowBrevity] = useState([])
    const [artifacts, setartifacts] = useState(
        <>Artifact Priorities:<br /><div className="orangetext">{match.ArtPriority1}<br />{match.ArtPriority2}<br />{match.ArtPriority3}</div></>
    )

    const handleShowBrevirty = (match) => {
        if (showBrevity == match) {
            setShowBrevity([])
        } else {
            setShowBrevity(match)
        }
    }

    const handleBrevirtyColor = (e) => {
        if (e == match.AbilityBRV) {
            return "brvattacks"
        }
        if (e == match.AbilityHP) {
            return "hpattackes"
        }
        if (e == match.AbilityCL1) {
            return "startingattack"
        }
        if (e == match.AbilityCL20) {
            return "Abase"
        }
        if (e == match.AbilityCL65) {
            return "bluebase"
        }
        if (e == match.AbilityEXPlus) {
            return "exbrvcolor"
        }
        if (e == match.AbilityLimited) {
            return "ldblue"
        }
        if (e == match.AbilityBurst) {
            return "newblue"
        }
        if (e == match.AbilityBurstPlus) {
            return "Buffbase"
        }
        if (e == match.AbilityCL75) {
            return "bluebase"
        }
        if (e == match.AbilityLimitedCall) {
            return "ldblue"
        }
        if (e == match.Passive7StarArmor) {
            return "board4base"
        }
        if (e == match.AbilityFR) {
            return "board4banner"
        }
        if (e == artifacts) {
            return "brvattacks"
        }
        if (e == "") {
            return "introcolor"
        }
    }

    useEffect(() => {
        if (match.AbilityCL1 != undefined) {
            setShowBrevity(match.AbilityCL1)
        } else {
            setShowBrevity([])
        }
    }, [match])

    useEffect(() => {
        if (showBrevity == match.AbilityFR) {
            setshowforce(true)
        } else {
            setshowforce(false)
        }
    }, [showBrevity, match])

    const replacer = (e) => {
        var newtext = e && e.replace(/&/gm, "%26")
        return newtext
    }

    return (
        <div className="brevityholder">
            <div className={`brevcell ${handleBrevirtyColor(showBrevity)}`}>
                <span className="subtext">Quick Profile:</span><span className="infolocation subtext">{" (may contain JP reworks)"}</span>
                <div className="subpassiveflair ">
                    {match.AbilityBRV != undefined ?
                        <span onClick={() => handleShowBrevirty(match.AbilityBRV)} className={`brvattackiconbutton undertaga clicky ${showBrevity == match.AbilityBRV ? "buffactive" : ""}`}></span>
                        : ""}
                    {match.AbilityHP != undefined ?
                        <span onClick={() => handleShowBrevirty(match.AbilityHP)} className={`hpplusattackiconbutton undertaga clicky ${showBrevity == match.AbilityHP ? "buffactive" : ""}`}></span>
                        : ""}
                    {match.AbilityCL1 != undefined ?
                        <span onClick={() => handleShowBrevirty(match.AbilityCL1)} className={`cl1 undertaga clicky ${showBrevity == match.AbilityCL1 ? "buffactive" : ""}`}></span>
                        : ""}
                    {match.AbilityCL20 != undefined ?
                        <span onClick={() => handleShowBrevirty(match.AbilityCL20)} className={`cl20 undertaga clicky ${showBrevity == match.AbilityCL20 ? "buffactive" : ""}`}></span>
                        : ""}
                    {match.AbilityCL65 != undefined ?
                        <span onClick={() => handleShowBrevirty(match.AbilityCL65)} className={`aaabilityButton undertaga clicky ${showBrevity == match.AbilityCL65 ? "buffactive" : ""}`}></span>
                        : ""}
                    {match.AbilityEXPlus != undefined ?
                        <span onClick={() => handleShowBrevirty(match.AbilityEXPlus)} className={`wpexplus undertaga clicky ${showBrevity == match.AbilityEXPlus ? "buffactive" : ""}`}></span>
                        : ""}
                    {match.AbilityLimited != undefined ?
                        <span onClick={() => handleShowBrevirty(match.AbilityLimited)} className={`wpld undertaga clicky ${showBrevity == match.AbilityLimited ? "buffactive" : ""}`}></span>
                        : ""}
                    {match.AbilityBurst != undefined && match.AbilityBurstPlus == undefined ?
                        <span onClick={() => handleShowBrevirty(match.AbilityBurst)} className={`wpbt undertaga clicky ${showBrevity == match.AbilityBurst ? "buffactive" : ""}`}></span>
                        : ""}
                    {match.AbilityBurstPlus != undefined ?
                        <span onClick={() => handleShowBrevirty(match.AbilityBurstPlus)} className={`wpbtplus undertaga clicky ${showBrevity == match.AbilityBurstPlus ? "buffactive" : ""}`}></span>
                        : ""}
                    {match.AbilityFR != undefined ?
                        <span onClick={() => handleShowBrevirty(match.AbilityFR)} className={`wpfr undertaga clicky ${showBrevity == match.AbilityFR ? "buffactive" : ""}`}></span>
                        : ""}
                    {match.AbilityCL75 != undefined ?
                        <span onClick={() => handleShowBrevirty(match.AbilityCL75)} className={`call1 undertaga clicky ${showBrevity == match.AbilityCL75 ? "buffactive" : ""}`}></span>
                        : ""}
                    {match.AbilityLimitedCall != undefined ?
                        <span onClick={() => handleShowBrevirty(match.AbilityLimitedCall)} className={`call2 undertaga clicky ${showBrevity == match.AbilityLimitedCall ? "buffactive" : ""}`}></span>
                        : ""}
                    {match.ArtPriority1 != undefined ?
                        <span onClick={() => handleShowBrevirty(artifacts)} className={`artpass undertaga clicky ${showBrevity == artifacts ? "buffactive" : ""}`}></span>
                        : ""}
                    {match.Passive7StarArmor != undefined ?
                        <span onClick={() => handleShowBrevirty(match.Passive7StarArmor)} className={`arm7aicon undertaga clicky ${showBrevity == match.Passive7StarArmor ? "buffactive" : ""}`}></span>
                        : ""}
                </div>
                {showforce == true ?
                    <div className="similarbanner">
                        <Link className="updatelink" to={`/characters/forcetime?Char=${replacer(match.CharacterName)}`}>
                            View Force Time
                        </Link>
                    </div>
                    : ""}
                {showBrevity == "" ? "" :
                    <div>
                        {showBrevity == artifacts ?
                            artifacts :
                            ReplacerCharacter(showBrevity,{updown:true,force_page:true})
                        }
                    </div>
                }
            </div>
        </div>
    )
}