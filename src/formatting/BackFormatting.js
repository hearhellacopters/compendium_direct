import React from 'react';
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import Tippy from '../formatting/TippyDefaults.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';

const CharBackFace = ({
    match,
    location,
    dim,
    newchar,
    btchar,
    btpluschar,
    ldchar,
    frboardchar,
    ldboardchar,
    sevenachar,
    sevenapluschar,
    reworkchar,
    eightychar,
    ninetychar,
    frchar,
    fe50char,
    board5char
}) => {

    var dimmer = undefined
    if (dim == true) {
        dimmer = true
    }
    if (match.LD == ldchar) {
        dimmer = false
    }
    if (match.LDBoard == ldboardchar) {
        dimmer = false
    }
    if(match.FE50 == fe50char){
        dimmer = false
    }
    if (match.Board5 == board5char) {
        dimmer = false
    }
    if (match.FRBoard == frboardchar) {
        dimmer = false
    }
    if (match.newcharacter == newchar) {
        dimmer = false
    }
    if (match.BTChar == btchar) {
        dimmer = false
    }
    if (match.BTPlus == btpluschar) {
        dimmer = false
    }
    if (match.SevenArmor == sevenachar) {
        dimmer = false
    }
    if (match.SevenArmorPlus == sevenapluschar) {
        dimmer = false
    }
    if (match.Rework == reworkchar) {
        dimmer = false
    }
    if (match.CystalEighty == eightychar) {
        dimmer = false
    }
    if (match.CystalNinety == ninetychar) {
        dimmer = false
    }
    if (match.FR == frchar) {
        dimmer = false
    }


    return (
        <Link to={`/characters/${match.ShortName}${location != undefined ? location : ""}`}>
            <li className="CharBackListHolderinner">
                <ul className="forecasttagholder">
                    {match.newcharacter == true ?
                        <Tippy content="New Character">
                            <li className="NewChar forecasttag"></li>
                        </Tippy>
                        : ""}
                    {match.BTChar == true ?
                        <Tippy content="BT Character">
                            <li className="wpbtbutton forecasttag"></li>
                        </Tippy>
                        : ""}
                    {match.BTPlus == true ?
                        <Tippy content="BT+ Character">
                            <li className="wpbtplusbutton forecasttag"></li>
                        </Tippy>
                        : ""}
                    {match.FR == true ?
                        <Tippy content="FR Character">
                            <li className="wpfr forecasttag"></li>
                        </Tippy>
                        : ""}
                    {match.Board5 == true ?
                        <Tippy content="FR Board Character">
                            <li className="board5 forecasttag"></li>
                        </Tippy>
                        : ""}
                    {match.FE50 == true ?
                        <Tippy content="Force Enhancement Lv 50">
                            <li className="boardfr50 forecasttag"></li>
                        </Tippy>
                        : ""}
                    {match.FRBoard == true ?
                        <Tippy content="Force Enhancement">
                            <li className="boardfr forecasttag"></li>
                        </Tippy>
                        : ""}
                    {match.LD == true ?
                        <Tippy content="LD Character">
                            <li className="wpld forecasttag"></li>
                        </Tippy>
                        : ""}
                    {match.LDBoard == true ?
                        <Tippy content="LD Board Character">
                            <li className="board4button forecasttag"></li>
                        </Tippy>
                        : ""}
                    {match.SevenArmor == true ?
                        <Tippy content="7★ Armor Character">
                            <li className="arm7abutton forecasttag"></li>
                        </Tippy>
                        : ""}
                    {match.SevenArmorPlus == true ?
                        <Tippy content="7★+ Armor Character">
                            <li className="arm7aplusbutton forecasttag"></li>
                        </Tippy>
                        : ""}
                    {match.CystalEighty == true ?
                        <Tippy content="Lv80 Character">
                            <li className="cl80button forecasttag"></li>
                        </Tippy>
                        : ""}
                    {match.CystalNinety == true ?
                        <Tippy content="Lv90 Character">
                            <li className="cl90button forecasttag"></li>
                        </Tippy>
                        : ""}
                    {match.Rework == true ?
                        <Tippy content="Rework">
                            <li className="reworkicon forecasttag"></li>
                        </Tippy>
                        : ""}
                </ul>
                <div className="facetextlist2">{match.CharacterName == "Cloud of Darkness" ? "CoD" : match.CharacterName == "Warrior of Light" ? "WoL" : match.CharacterName}</div>
                <LazyLoadImage effect="opacity" alt={match.CharacterName} className={`CharBackForecast${dimmer == true ? " dim" : ""}`} src={`https://dissidiacompendium.com/images/static/characters/${match.CharacterName.replace(/ /g, "").replace(/,/g, "").replace(/'/g, "").replace(/&/g, "")}/back.png`} />
            </li>
        </Link>
    )

}
export default CharBackFace;