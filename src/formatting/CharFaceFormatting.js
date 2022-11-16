import React from 'react';
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const CharFace = ({ match, BTUnit, location }) => {

    return(
        <Link to={`/characters/${match.ShortName}${location != undefined ? location : ""}`}>
        <li>
            <LazyLoadImage effect="opacity" alt={match.CharacterName} className={`faceiconlist ${BTUnit == match.CharID ? "btgreen" : "" }`} src={match.CharacterName == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_face.png" : `https://dissidiacompendium.com/images/static/characters/${match.CharacterName.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"")}/face.png`}/>
            <div className="facetextlist">{match.CharacterName == "Cloud of Darkness" ? "CoD" : match.CharacterName == "Warrior of Light" ? "WoL" : match.CharacterName}</div>
        </li>
        </Link>
    )

}
export default CharFace;