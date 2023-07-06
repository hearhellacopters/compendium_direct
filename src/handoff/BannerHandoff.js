import React from 'react';
import BannersListing from '../components/Events/BannersFormatting.js'
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import DefaultTippy from '../components/TippyDefaults.js';
import Tippy from '@tippyjs/react';
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/scale-subtle.css';
import 'tippy.js/animations/scale-extreme.css';
import { ImArrowRight } from 'react-icons/im';
import { ImArrowLeft } from 'react-icons/im';
import { FaShareSquare } from 'react-icons/fa';

export default function BannerHandoff({ 
    match, 
    ProcessedBanners 
}){

    const filtered = ProcessedBanners.filter(function (el) {
        return el["bannerindex"] == match.params.id;
    });

    if (filtered.length === 0) {
        return (
            <Navigate replace to="/404" />
        )

    } else {

        const prefilteredlist = ProcessedBanners.filter(function (el) {
            return el["indate"] !== undefined;
        });

        const sortedbanners = prefilteredlist.sort((a, b) => new Date(a.indate) - new Date(b.indate));

        const filteredevent = sortedbanners.filter(item => {
            return item.bannerindex == match.params.id
        })

        let currentIndex = sortedbanners.findIndex(x => x.bannerindex == match.params.id);
        const nextIndex = (currentIndex + 1) % sortedbanners.length;
        const previousIndex = (currentIndex - 1) % sortedbanners.length;

        const nextevent = (function () {
            const holder = sortedbanners[nextIndex];
            if (nextIndex === 0) {
                return false;
            } else {
                return holder;
            }
        })();

        const previousevent = (function () {
            const holder = sortedbanners[previousIndex];
            if (holder === undefined) {
                return false;
            } else {
                return holder;
            }
        })();

        const bannerpull = filteredevent[0];

        const url = window.location.href

        return (
            <div>
                <Helmet>
                    <title>{bannerpull.name} Banner - Dissidia Compendium</title>
                    <meta property="og:site_name" content="Dissidia Compendium" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://dissidiacompendium.com" />
                    <meta name="description" content={`${bannerpull.name} Banner`} />
                    <meta name="twitter:title" content={`${bannerpull.name} Banner`} />
                    <meta name="twitter:description" content={`${bannerpull.name} Banner`} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:image:alt" content={`${bannerpull.name}`} />
                    <meta property="og:title" content={`${bannerpull.name} Banner`} />
                    <meta property="og:description" content={`${bannerpull.name} Banner`} />
                    <meta property="og:url" content={`https://dissidiacompendium.com/events/banners/${bannerpull.bannerindex}`} />
                </Helmet>
                <div className="returnbutton">
                    <DefaultTippy content="Return to Events" className="tooltip" >
                        <Link className="returnlink" to={`../banners/`}>
                            <div className="returnicon"></div>
                        </Link>
                    </DefaultTippy>
                </div>
                <div className="content">
                    {nextevent == false ? "" :
                        <Link to={`/events/banners/${nextevent.bannerindex}`}>
                            <DefaultTippy content={nextevent.name} className="tooltip" >
                                <div className="nextbutton">
                                    <ImArrowRight className="nexticon" />
                                </div>
                            </DefaultTippy>
                        </Link>}
                    {previousevent == false ? "" :
                        <Link to={`/events/banners/${previousevent.bannerindex}`}>
                            <DefaultTippy content={previousevent.name} className="tooltip" >
                                <div className="previousbutton">
                                    <ImArrowLeft className="previousicon" />
                                </div>
                            </DefaultTippy>
                        </Link>}
                    <CopyToClipboard text={url}>
                        <div className="shareholder">
                            <Tippy content="Link Copied!" inertia={true} animation={"shift-away"} touch={true} arrow={false} trigger={"click"} placement={"bottom"} duration={[100, 500]}>
                                <div className="sharebutton automarg"><div className="centertext"><FaShareSquare className="shareicon" />&nbsp;Share Page</div></div>
                            </Tippy>
                        </div>
                    </CopyToClipboard>
                    <ul className="nolistdisplay">
                        <BannersListing match={bannerpull} showbanner={true} permapage={true} />
                    </ul>
                </div>
            </div>
        )
    }
}