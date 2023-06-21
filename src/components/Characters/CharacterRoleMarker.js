import React from "react";
import ailment_tags from '../../processing/ailment/ailment_tags.json'
import DefaultTippy from '../../components/TippyDefaults.js';

export default function CharacterRoleMarker({
    base,
    newmatch,
    lower
}){
    return (
        <>
            {lower == true ?
                <DefaultTippy content={`Realm ${base.Realm}`}>
                    <img className="classdisplay filterinactive" alt={base.Realm} src={base.Realm == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_icon.png" : `https://dissidiacompendium.com/images/static/icons/realms/name/${base.Realm}.png`}></img>
                </DefaultTippy>
                : ``}
            {lower == true && newmatch.Magic == true ?
                <DefaultTippy content="Magic Damage Type">
                    <li className="magicbutton classdisplay filterinactive"></li>
                </DefaultTippy>
                : ``}
            {lower == true && newmatch.Melee == true ?
                <DefaultTippy content="Melee Damage Type">
                    <li className="meleebutton classdisplay filterinactive"></li>
                </DefaultTippy>
                : ``}
            {lower == true && newmatch.Ranged == true ?
                <DefaultTippy content="Ranged Damage Type">
                    <li className="rangedbutton classdisplay filterinactive"></li>
                </DefaultTippy>
                : ``}
            {lower == true && newmatch.Fire_Damage == true ?
                <DefaultTippy content="Fire BRV Damage">
                    <li className="Firebutton classdisplay filterinactive"></li>
                </DefaultTippy>
                : ``}
            {lower == true && newmatch.Ice_Damage == true ?
                <DefaultTippy content="Ice BRV Damage">
                    <li className="Icebutton classdisplay filterinactive"></li>
                </DefaultTippy>
                : ``}
            {lower == true && newmatch.Thunder_Damage == true ?
                <DefaultTippy content="Thunder BRV Damage">
                    <li className="Thunderbutton classdisplay filterinactive"></li>
                </DefaultTippy>
                : ``}
            {lower == true && newmatch.Water_Damage == true ?
                <DefaultTippy content="Water BRV Damage">
                    <li className="Waterbutton classdisplay filterinactive"></li>
                </DefaultTippy>
                : ``}
            {lower == true && newmatch.Earth_Damage == true ?
                <DefaultTippy content="Earth BRV Damage">
                    <li className="Earthbutton classdisplay filterinactive"></li>
                </DefaultTippy>
                : ``}
            {lower == true && newmatch.Wind_Damage == true ?
                <DefaultTippy content="Wind BRV Damage">
                    <li className="Windbutton classdisplay filterinactive"></li>
                </DefaultTippy>
                : ``}
            {lower == true && newmatch.Dark_Damage == true ?
                <DefaultTippy content="Dark BRV Damage">
                    <li className="Darkbutton classdisplay filterinactive"></li>
                </DefaultTippy>
                : ``}
            {lower == true && newmatch.Holy_Damage == true ?
                <DefaultTippy content="Holy BRV Damage">
                    <li className="Holybutton classdisplay filterinactive"></li>
                </DefaultTippy>
                : ``}
            {lower == true && newmatch.ActiveRework == true ?
                <DefaultTippy content="Active JP Rework">
                    <li className="JPReworkbutton classdisplay filterinactive"></li>
                </DefaultTippy>
                : ``}
            {Object.keys(ailment_tags).map(key => {
                if (newmatch[key] == true && ailment_tags[key].hidden != true) {
                    return (
                        <DefaultTippy key={key} content={ailment_tags[key].name}>
                            <li className="classdisplay filterinactive"
                                style={{
                                    backgroundSize: "contain",
                                    backgroundImage: `url(https://dissidiacompendium.com/images/static/icons/${ailment_tags[key].url}.png)`
                                }}
                            ></li>
                        </DefaultTippy>
                    )
                }
            })}
        </>
    )
}