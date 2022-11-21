import React from 'react';
import { Link } from 'react-router-dom'
import Tippy from '../formatting/TippyDefaults.js';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const SingleEventFormatting = ({ match, permapage }) => {

    if(match.tempdate != undefined) {
    return(
        <li className="nolistevents" id={match.type} key={match.eventindex}>
            <div className="charalistflarholder">
                <div className="titlemainupdateholder">
                    <Link to={`/events/${match.eventindex}`}>
                        <Tippy content={match.name}>
                            <div className="singleevenimageholder">
                                <LazyLoadImage effect="opacity" className={`eventimage withshadow ${permapage == false ? "showlink" : ""}`} src={match.url1} alt={match.name} />
                            </div>
                        </Tippy>   
                    </Link>
                </div>
            </div>
        </li>
    )
    } else {
        return("")
    }
}
export default SingleEventFormatting;