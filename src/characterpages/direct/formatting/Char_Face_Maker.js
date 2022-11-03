import React from 'react';
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const Char_Face_Maker = ({ char_id, id, loc, link }) => {

    const match ={}

    if(char_id[id] == undefined ){
        Object.assign(match, {
            CharacterName: `Unknown #${id}`, 
            CharacterFaceURL: "https://dissidiacompendium.com/images/static/icons/misc/Unknown_face.png" })
    }
    if(char_id[id] != undefined ){
        Object.assign(match, {
            ShortName: char_id[id].name && char_id[id].name.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"").toLowerCase(),
            CharacterName: char_id[id].name,
            CharacterFaceURL: `https://dissidiacompendium.com/images/static/characters/${char_id[id] && char_id[id].name.replace(/ /g,"").replace(/,/g,"").replace(/'/g,"").replace(/&/g,"")}/face.png`
        })}
    
    if(link == undefined){
        return(
            <div className={`${loc  == "gear" ? "gearfaceholder" : "faceholder"}`}>
                <LazyLoadImage effect="opacity" alt={match.CharacterName} className={`${loc  == "gear" ? "gearfaceicon" : "faceicon"}`} src={match.CharacterFaceURL == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_face.png" : match.CharacterFaceURL}/>
                <div className={`${loc  == "gear" ? "gearfacetext" : "facetext"}`}>{match.CharacterName == "Cloud of Darkness" ? "CoD" : match.CharacterName == "Warrior of Light" ? "WoL" : match.CharacterName}</div>
            </div>
        )
    } else {
        return(
            <Link to={`/characters/${match.ShortName}/${link}`}>
            <div className={`${loc  == "gear" ? "gearfaceholder" : "faceholder"}`}>
                <LazyLoadImage effect="opacity" alt={match.CharacterName} className={`${loc  == "gear" ? "gearfaceicon" : "faceicon"}`} src={match.CharacterFaceURL == undefined ? "https://dissidiacompendium.com/images/static/icons/misc/Unknown_face.png" : match.CharacterFaceURL}/>
                <div className={`${loc  == "gear" ? "gearfacetext" : "facetext"}`}>{match.CharacterName == "Cloud of Darkness" ? "CoD" : match.CharacterName == "Warrior of Light" ? "WoL" : match.CharacterName}</div>
            </div>
        </Link>
        )
    }
    

}
export default Char_Face_Maker;