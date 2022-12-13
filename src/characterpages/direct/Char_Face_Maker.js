import React from 'react';
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const CharFaceMaker = ({
    id,
    char_id
}) => {

    var FaceURL = "https://dissidiacompendium.com/images/static/icons/misc/Unknown_face.png"
    var ShortName = ""
    var name = `Unknown #${id}`
    if (char_id[id] != undefined) {
        ShortName = char_id[id].ShortName && char_id[id].ShortName
        FaceURL = `https://dissidiacompendium.com/images/static/characters/${char_id[id].CharacterURLName && char_id[id].CharacterURLName}/face.png`
        name = char_id[id].CharacterName
    }

    return (
        <Link to={`/characters/${ShortName}`}>
            <li>
                <LazyLoadImage effect="opacity" alt={name} className={`faceiconlist`} src={FaceURL} />
                <div className="facetextlist">{name == "Cloud of Darkness" ? "CoD" : name == "Warrior of Light" ? "WoL" : name}</div>
            </li>
        </Link>
    )

}
export default CharFaceMaker;