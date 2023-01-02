import React from "react";
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';

export default function BackMaker({
    char_id,
    match
}){
    var characterpull = ""
    if(match != undefined){
        characterpull = char_id[match] && char_id[match].name
    }

    return(
       <div className="spanhelper">
            <LazyLoadImage effect="opacity" className="BTCharacter noselect" src={`https://dissidiacompendium.com/images/static/characters/${characterpull.replace(/ /g, "").replace(/,/g, "").replace(/'/g, "").replace(/&/g, "")}/back.png`} alt={characterpull} />
        </div>
    )
}