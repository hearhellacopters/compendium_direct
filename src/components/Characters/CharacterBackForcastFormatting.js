import React from 'react';
import { Link } from 'react-router-dom'
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import ReplacerCharacter from '../ReplacerCharacter.js';
import Tippy from '../../components/TippyDefaults.js';

function CharacterBackForcastFormatting({
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
    board5char,
    scrollPosition
}){

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
                            <li className="forecasttag">{ReplacerCharacter(`<NewChar>`)}</li>
                        </Tippy>
                        : ""}
                    {match.BTChar == true || match.BTPlus == true?
                        <Tippy content="BT Character">
                            <li className="forecasttag">{ReplacerCharacter(`<bt+m>`)}</li>
                        </Tippy>
                        : ""}
                    {match.FR == true ?
                        <Tippy content="FR Character">
                            <li className="forecasttag">{ReplacerCharacter(`<fr>`)}</li>
                        </Tippy>
                        : ""}
                    {match.Board5 == true ?
                        <Tippy content="FR Board Character">
                            <li className="forecasttag">{ReplacerCharacter(`<board5>`)}</li>
                        </Tippy>
                        : ""}
                    {match.FE50 == true ?
                        <Tippy content="Force Enhancement Lv 50">
                            <li className="forecasttag">{ReplacerCharacter('<boardfr50>')}</li>
                        </Tippy>
                        : ""}
                    {match.FRBoard == true ?
                        <Tippy content="Force Enhancement">
                            <li className="forecasttag">{ReplacerCharacter(`<boardfr>`)}</li>
                        </Tippy>
                        : ""}
                    {match.LD == true ?
                        <Tippy content="LD Character">
                            <li className="forecasttag">{ReplacerCharacter(`<LD>`)}</li>
                        </Tippy>
                        : ""}
                    {match.LDBoard == true ?
                        <Tippy content="LD Board Character">
                            <li className="forecasttag">{ReplacerCharacter(`<board4>`)}</li>
                        </Tippy>
                        : ""}
                    {match.SevenArmor == true ?
                        <Tippy content="7★ Armor Character">
                            <li className="forecasttag">{ReplacerCharacter(`<arm7a>`)}</li>
                        </Tippy>
                        : ""}
                    {match.SevenArmorPlus == true ?
                        <Tippy content="7★+ Armor Character">
                            <li className="forecasttag">{ReplacerCharacter(`<arm7aplus>`)}</li>
                        </Tippy>
                        : ""}
                    {match.CystalEighty == true ?
                        <Tippy content="Lv80 Character">
                            <li className="forecasttag">{ReplacerCharacter(`<cl80>`)}</li>
                        </Tippy>
                        : ""}
                    {match.CystalNinety == true ?
                        <Tippy content="Lv90 Character">
                            <li className="forecasttag">{ReplacerCharacter(`<cl90>`)}</li>
                        </Tippy>
                        : ""}
                    {match.Rework == true ?
                        <Tippy content="Rework">
                            <li className="forecasttag">{ReplacerCharacter(`<rework>`)}</li>
                        </Tippy>
                        : ""}
                </ul>
                <div className="facetextlist2">{match.CharacterName == "Cloud of Darkness" ? "CoD" : match.CharacterName == "Warrior of Light" ? "WoL" : match.CharacterName}</div>
                <LazyLoadImage 
                scrollPosition={scrollPosition}
                effect="opacity" 
                alt={match.CharacterName} 
                className={`CharBackForecast${dimmer == true ? " dim" : ""}`} 
                src={`https://dissidiacompendium.com/images/static/characters/${match.CharacterName.replace(/ /g, "").replace(/,/g, "").replace(/'/g, "").replace(/&/g, "")}/back.png`} />
            </li>
        </Link>
    )

}

export default trackWindowScroll(CharacterBackForcastFormatting)