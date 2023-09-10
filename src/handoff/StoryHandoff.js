import React from "react";
import Tippy from '../components/TippyDefaults.js';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom'
import ScrolltoTop from '../components/ScrollToTop.js'
import { Navigate } from 'react-router-dom';
import { ImArrowRight } from 'react-icons/im';
import { ImArrowLeft } from 'react-icons/im';
import { FaShareSquare } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import TalkFormatting from "../components/Talk/TalkFormatting.js";

export default function StoryHandoff({ 
    ver,
    match,
    talk,
    talk_index
}){

    const talk_pull = talk[match.params.id]

    if(talk_pull == undefined){
        return (
            <Navigate replace to="/404" />
        )
    }

    const url = window.location.href

    return(
        <div>
            <Helmet>
                <title>{talk_pull.name} Story - Dissidia Compendium</title>
                <meta property="og:site_name" content="Dissidia Compendium" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://dissidiacompendium.com" />
                <meta name="description" content={`${talk_pull.name} Story content`} />
                <meta name="twitter:title" content={`${talk_pull.name} Story content`} />
                <meta name="twitter:description" content={`${talk_pull.name} Story content`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image:alt" content={`${talk_pull.name}`} />
                <meta property="og:title" content={`Event ${talk_pull.name}`} />
                <meta property="og:description" content={`${talk_pull.name} Story content`} />
                <meta property="og:url" content={`https://dissidiacompendium.com/story/${talk_pull.field_id}`} />
            </Helmet>
            <ScrolltoTop />
            <div className="returnbutton">
                <Tippy content={"Return to Story"} className="tooltip" >
                    <Link className="returnlink" to={`/story`}>
                        <div className="returnicon"></div>
                    </Link>
                </Tippy>
            </div>
            <div className="content">
                <CopyToClipboard text={url}>
                    <div className="shareholder">
                        <Tippy content="Link Copied!" inertia={true} animation={"shift-away"} touch={true} arrow={false} trigger={"click"} placement={"bottom"} duration={[100, 500]}>
                            <div className="sharebutton automarg"><div className="centertext"><FaShareSquare className="shareicon" />&nbsp;Share Page</div></div>
                        </Tippy>
                    </div>
                </CopyToClipboard>
                <ul className="nolistdisplay">
                    <TalkFormatting
                    ver={ver}
                    talk_index={talk_index}
                    talk={talk_pull}
                    solo={true}
                    />
                </ul>
            </div>
        </div>
    )
}