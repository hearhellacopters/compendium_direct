import React from 'react';
import Random from '../../processing/random.js'
import { LazyLoadImage, LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';

function CommunityEventGuidesFormatting({ 
    index, 
    EventGuideData,
    scrollPosition  
}){

    const setrandom = Random(7)
    var error = false

    function getlinks(data) {
        try {
            var rawdata = Object.values(data["CommunityGuides"]);
            var thiseventpull = rawdata.filter(function (el) {
                return el["eventindex"] == index;

            })
            return thiseventpull[0] && thiseventpull[0].Links
        } catch (e) {
            return []
        }
    }

    const is_youtube = (url) => {
        if (url.search("youtube.com") != -1) {
            return true
        }
        if (url.search("youtu") != -1) {
            return true
        }
    }

    const get_youhash = (url) => {
        if (url.search("playlist?") != -1) {
            const justHash = url.toString().replace(/(?:.*playlist\?list=)/g, "videoseries?list=")
            return justHash
        }
        if (url.search("watch?") != -1) {
            const justHash = url.toString().replace(/(?:.*watch\?v=|.*be\/)/g, "")
            return justHash
        }
        if (url.search("youtu.be") != -1) {
            const justHash = url.toString().replace(/(?:.*watch\?v=|.*be\/)/g, "")
            return justHash
        }
    }

    const thisevent = getlinks(EventGuideData)

    if (error == true) {
        return (
            <div className="zone">
                <div className="guidebanner nobordertop">Community Help Error!</div>
                <div className="guidelinksflair">
                    <div className="nolinksholder">
                        <LazyLoadImage 
                        scrollPosition={scrollPosition}
                        effect="opacity" 
                        className={`ohno${setrandom}`}
                        alt="oh no" 
                        src={`https://dissidiacompendium.com/images/static/icons/404/${setrandom}.png`} />
                        <div className="nolinkstext"><div className="sitsatbottom">Error!</div></div>
                    </div>
                    <div className="infobase Debuffbase centertext warning">There was an issue loading event guide data!
                        <br />Please contact an admin by <a className="updatelink" rel="noreferrer noopener" href="https://drive.google.com/open?id=1IJE93eDUcKIEKuQH0jwMZ7WaWVcrldUqbc6EyEZRrzs" target="_blank">submitting a form </a> here.<br />Or alerting them on our <a className="updatelink" target="_blank" rel="noreferrer" href="https://discord.gg/Y3Yn6gb">discord</a> to help!</div>
                </div>
            </div>
        )
    } else {
        return (
            thisevent && thisevent.length != 0 && index != 1 ?
                <div className="zone">
                    <div className="guidebanner nobordertop">Community Help</div>
                    <div className="guidelinksflair">
                        <ul className="guidelist">
                            {thisevent.sort((a, b) => b.id - a.id).map((links, index) => (
                                is_youtube(links.url) == true ?
                                    <div key={index} className='video-wrap'>
                                        <LazyLoadComponent
                                        scrollPosition={scrollPosition}
                                        placeholder={<div className="video-container"/>}
                                        >
                                            <div className="video-container">
                                                <iframe src={`https://www.youtube.com/embed/${get_youhash(links.url)}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                            </div>
                                        </LazyLoadComponent>
                                    </div>
                                    :
                                    <li key={index}>
                                        {links.title.search("(GL)") != -1 ?
                                            <span className=""><span className='emoji'>🌎</span></span> :
                                            <span className="jpflagupdate"></span>}
                                        <a className="guidelink" target="_blank" rel="noreferrer" href={links.url}>
                                            {links.title.replace(/\(GL\)/gm, "").replace(/\(JP\)/gm, "")}
                                        </a>
                                    </li>
                            ))}
                        </ul>
                        <div className="joinup">Would you like your content featured here?<br />Join our <a className="updatelink" target="_blank" rel="noreferrer" href="https://discord.gg/Y3Yn6gb">discord</a> and ask to sign up!</div>
                        <div className="subtext infolocation margright">*Compendium is not responsible for external content</div>
                    </div>
                </div>
                :
                <div className="zone">
                    <div className="guidebanner nobordertop">Community Help</div>
                    <div className="guidelinksflair">
                        <div className="nolinksholder">
                            <LazyLoadImage 
                            effect="opacity" 
                            scrollPosition={scrollPosition}
                            className={`ohno${setrandom}`} 
                            alt="oh no" 
                            src={`https://dissidiacompendium.com/images/static/icons/404/${setrandom}.png`} />
                            <div className="nolinkstext"><div className="sitsatbottom"> No Help!</div></div>
                        </div>
                        <div className="infobase Debuffbase centertext warning">Are you a content creator?
                            <br />Would you like your content featured here?
                            <br />Join our <a className="updatelink" target="_blank" rel="noreferrer" href="https://discord.gg/Y3Yn6gb">discord</a> and ask to sign up!</div>
                    </div>
                </div>
        )
    }
}

export default trackWindowScroll(CommunityEventGuidesFormatting)