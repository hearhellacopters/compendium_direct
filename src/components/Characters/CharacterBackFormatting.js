import React from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function CharacterBackFormatting({
    char_id,
    match
}){
    var characterpull = ""
    if(match != undefined){
        characterpull = char_id[match] && char_id[match].CharacterURLName
    }

    return(
        <div className="spanhelper">
            <LazyLoadImage effect="opacity" className="BTCharacter noselect" src={`https://dissidiacompendium.com/images/static/characters/${characterpull}/back.png`} alt={characterpull} />
        </div>
    )
}