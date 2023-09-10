import React from 'react';
import { Link } from 'react-router-dom'
import Tippy from '../../components/TippyDefaults.js';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';

function SingleEventsFormatting({ 
    match, 
    permapage,
    scrollPosition 
}){

    if (match.tempdate != undefined) {
        return (
            <li className="nolistevents" id={match.type} key={match.eventindex}>
                <div className="charalistflarholder">
                    <div className="titlemainupdateholder">
                        <Link to={`/events/${match.eventindex}`}>
                            <Tippy content={match.name}>
                                <div className="singleevenimageholder">
                                    <LazyLoadImage 
                                    scrollPosition={scrollPosition}
                                    effect="opacity" 
                                    className={`eventimage withshadow ${permapage == false ? "showlink" : ""}`} 
                                    src={"https://dissidiacompendium.com/images/static/banners/"+match.url1} 
                                    alt={match.name} />
                                </div>
                            </Tippy>
                        </Link>
                    </div>
                </div>
            </li>
        )
    } else {
        return ("")
    }
}

export default trackWindowScroll(SingleEventsFormatting)