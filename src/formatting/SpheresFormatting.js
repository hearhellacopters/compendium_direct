import React from 'react';
import '../Buffs.css';
import { Link } from 'react-router-dom'
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import SingleEventsFormatting from './SingleEventsFormatting.js'
import addformatting_buff from '../processing/replacer_buffcontent';
import addformatting from '../processing/replacer_abilitycontent';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const SpheresFormatting = ({match , singlepage, eventlisting}) => {

    return(
        <div className={`${eventlisting == true ? "sphereeventunit" : "buffunit" }`}>
            <div className="infoholder" style={{ minHeight: "130px"}}>
                <LazyLoadComponent>
                <div className="infotitleholder">
                    <div className="faceandiconholder">
                        {singlepage != true ? 
                        <Link to={`/characters/${match.CharacterShortName}/spheres`}>
                        <div className="faceholder">
                            <LazyLoadImage effect="opacity" alt={match.SphereCharacterName} className="faceicon" src={"https://dissidiacompendium.com/images/static/characters/" + match.SphereFaceURL}/>
                            <div className="facetext">
                            {match.SphereCharacterName == "Cloud of Darkness" ? "CoD" : match.SphereCharacterName == "Warrior of Light" ? "WoL" : match.SphereCharacterName}
                            </div>
                        </div>
                        </Link> : 
                        <div className="faceholder">
                            <LazyLoadImage effect="opacity" alt={match.SphereCharacterName} className="faceicon" src={"https://dissidiacompendium.com/images/static/characters/" + match.SphereFaceURL}/>
                            <div className="facetext">
                            {match.SphereCharacterName == "Cloud of Darkness" ? "CoD" : match.SphereCharacterName == "Warrior of Light" ? "WoL" : match.SphereCharacterName}
                            </div>
                        </div>
                        }
                        {singlepage != true ? 
                        <Link to={`/characters/${match.CharacterShortName}/spheres`}>
                        <div className="infoiconholder ">
                            <LazyLoadImage effect="opacity" className="sphereicon" alt={match.SphereType + " " + match.SphereLetter} src={"https://dissidiacompendium.com/images/static/icons/spheres/" + match.SphereURL}/>
                        </div>
                        </Link> :
                        <div className="infoiconholder ">
                        <LazyLoadImage effect="opacity" className="sphereicon" alt={match.SphereType + " " + match.SphereLetter} src={"https://dissidiacompendium.com/images/static/icons/spheres/" + match.SphereURL}/>
                        </div>}
                    </div>
                </div>
                <div className={match.SphereLetter + "banner infonameholder wpadding"}>
                    <div className="infotitle">
                    {singlepage != true ? 
                        <Link className="linktopage"  to={`/characters/${match.CharacterShortName}/spheres`}>
                        {addformatting(match.SphereName)}
                        </Link>:
                        addformatting(match.SphereName)
                        }
                    </div>
                    <div className="abilityJPname">
                        {match.JPName != null ?
                        match.JPName
                        :""}
                    </div>
                </div>
                <div className={match.SphereLetter + "base infobase wpadding"}>
                    {match.SphereDesc == undefined ? "" : addformatting_buff(match.SphereDesc)}
                </div>
                </LazyLoadComponent>
            </div>
            {match.CharSphereEvents != undefined && singlepage == true?
            <div className="zone makeitfull">
            <div className="featuredbanner">Refined Sphere Events</div>
            {match.CharSphereEvents.map(events => (
                    <SingleEventsFormatting key={events.eventindex} match={events} permapage={false}/>
                ))}
            </div>
            :""}
        </div>
    )
}

export default SpheresFormatting;