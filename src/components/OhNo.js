import React from 'react';
import { LazyLoadImage, trackWindowScroll  } from 'react-lazy-load-image-component';

function OhNo ({
    name, 
    random, 
    message, 
    message1,
    scrollPosition 
}){
    return (
        <div className="zone2">
            <div className="noresultsflair">
                <div className="noresults">
                    <LazyLoadImage 
                    scrollPosition={scrollPosition}
                    effect="opacity" key={`ohno${random}`} className={`ohno${random}`} alt="oh no" src={`https://dissidiacompendium.com/images/static/icons/404/${random}.png`} />
                    <div className="singlenolinkstext"><div className="sitsatbottom">{message1 == undefined ? "No results!" : message1}</div></div>
                </div>
            </div>
            <span>{message == undefined ? "in this category for " : message}{message == undefined ? name : ""}</span>
        </div>
    )
}
export default trackWindowScroll(OhNo)