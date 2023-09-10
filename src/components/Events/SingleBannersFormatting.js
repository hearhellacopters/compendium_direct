import React from 'react';
import { Link } from 'react-router-dom'
import Tippy from '../../components/TippyDefaults.js';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';

function SingleBannersFormatting({ 
    match, 
    permapage,
    scrollPosition
}){

    return (
        <li id={match.type} key={match.bannerindex}>
            <div className="charalistflarholder">
                <div className="titlemainupdateholder">
                    <Tippy content={match.name}>
                        <div className="singleevenimageholder">
                            <Link to={`/events/banners/${match.bannerindex}`}>
                                <LazyLoadImage 
                                scrollPosition={scrollPosition}
                                effect="opacity" 
                                className={`smallerbanners withshadow ${permapage == false ? "showlink" : ""}`}
                                src={"https://dissidiacompendium.com/images/static/banners/"+match.url1} 
                                alt={match.name} />
                            </Link>
                        </div>
                    </Tippy>
                </div>
            </div>
        </li>
    )
}

export default trackWindowScroll(SingleBannersFormatting)