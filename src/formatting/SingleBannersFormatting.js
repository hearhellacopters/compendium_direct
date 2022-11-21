import React from 'react';
import { Link } from 'react-router-dom'
import Tippy from '../formatting/TippyDefaults.js';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const SingleBannersFormatting = ({ match , permapage }) => {

    return(
        <li id={match.type} key={match.bannerindex}>
            <div className="charalistflarholder">
                <div className="titlemainupdateholder">
                    <Tippy content={match.name}>
                        <div className="singleevenimageholder">
                            <Link to={`/events/banners/${match.bannerindex}`}>
                                <LazyLoadImage effect="opacity" className={`smallerbanners withshadow ${permapage == false ? "showlink" : ""}`} src={match.url1} alt={match.name} />
                            </Link>
                        </div>
                    </Tippy>
                </div>
            </div>
        </li>
    )
}
export default SingleBannersFormatting;