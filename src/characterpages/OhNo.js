import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const ohno = ({ name, random, message, message1 }) => {
    return (
        <div className="zone2">
            <div className="noresultsflair">
                <div className="noresults">
                    <LazyLoadImage effect="opacity" key={`ohno${random}`} className={`ohno${random}`} alt="oh no" src={`https://dissidiacompendium.com/images/static/icons/404/${random}.png`} />
                    <div className="singlenolinkstext"><div className="sitsatbottom">{message1 == undefined ? "No results!" : message1}</div></div>
                </div>
            </div>
            <span>{message == undefined ? "in this category for " : message}{message == undefined ? name : ""}</span>
        </div>
    )
}
export default ohno