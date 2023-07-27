import React from "react";
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';

function CharacterBackFormatting({
    char_id,
    match,
    scrollPosition 
}){
    var characterpull = ""
    if(match != undefined){
        characterpull = char_id[match] && char_id[match].CharacterURLName
    }

    return(
        <div className="spanhelper">
            <LazyLoadImage 
            scrollPosition={scrollPosition}
            effect="opacity" 
            className="BTCharacter noselect" 
            src={`https://dissidiacompendium.com/images/static/characters/${characterpull}/back.png`} 
            alt={characterpull} />
        </div>
    )
}

export default trackWindowScroll(CharacterBackFormatting)