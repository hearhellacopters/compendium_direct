import React from 'react';
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

export default function CharacterFaceFormatting({ 
    char_id, 
    id, 
    loc, 
    link, 
    match, 
    BTUnit, 
    location,
    list
}){
    
    if(match != undefined){

        return (
            <Link to={`/characters/${match.ShortName}${location != undefined ? location : ""}`}>
                <li>
                    <LazyLoadImage effect="opacity" alt={match.CharacterName} className={`faceiconlist ${BTUnit == match.CharID ? "btgreen" : ""}`} src={match.CharacterName == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_face.png" : `https://dissidiacompendium.com/images/static/characters/${match.CharacterName.replace(/ /g, "").replace(/,/g, "").replace(/'/g, "").replace(/&/g, "")}/face.png`} />
                    <div className="facetextlist">{match.CharacterName == "Cloud of Darkness" ? "CoD" : match.CharacterName == "Warrior of Light" ? "WoL" : match.CharacterName}</div>
                </li>
            </Link>
        )

    } else {

        const direct = {}

        if (char_id[id] == undefined) {
            Object.assign(direct, {
                CharacterName: `Unknown #${id}`,
                CharacterFaceURL: "https://dissidiacompendium.com/images/static/icons/misc/Unknown_face.png"
            })
        }
        if (char_id[id] != undefined) {
            Object.assign(direct, {
                ShortName: char_id[id].ShortName && char_id[id].ShortName,
                CharacterName: char_id[id].CharacterName,
                CharacterFaceURL: `https://dissidiacompendium.com/images/static/characters/${char_id[id] && char_id[id].CharacterName.replace(/ /g, "").replace(/,/g, "").replace(/'/g, "").replace(/&/g, "")}/face.png`
            })
        }

        const list_format = <li>
                        <LazyLoadImage effect="opacity" alt={direct.CharacterName} className={`faceiconlist`} src={direct.CharacterFaceURL == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_face.png" : direct.CharacterFaceURL} />
                        <div className="facetextlist">{direct.CharacterName == "Cloud of Darkness" ? "CoD" : direct.CharacterName == "Warrior of Light" ? "WoL" : direct.CharacterName}</div>
                    </li>

        const non_list = <div className={`${loc == "gear" ? "gearfaceholder" : "faceholder"}`}>
                            <LazyLoadImage effect="opacity" alt={direct.CharacterName} className={`${loc == "gear" ? "gearfaceicon" : "faceicon"}`} src={direct.CharacterFaceURL == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_face.png" : direct.CharacterFaceURL} />
                            <div className={`${loc == "gear" ? "gearfacetext" : "facetext"}`}>{direct.CharacterName == "Cloud of Darkness" ? "CoD" : direct.CharacterName == "Warrior of Light" ? "WoL" : direct.CharacterName}</div>
                        </div>

        if (link == undefined) {
            return (
                list == true ? list_format : non_list
            )
        } else {
            return (
                <Link to={`/characters/${direct.ShortName}/${link}`}>
                    {list == true ? list_format : non_list}
                </Link>
            )
        }
    }

}