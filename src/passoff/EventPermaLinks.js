import React from 'react';
import EventListing from '../formatting/EventsFormatting.js'
import {Navigate} from 'react-router-dom';
import { Helmet} from 'react-helmet-async';
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import DefaultTippy from '../formatting/TippyDefaults.js';
import Tippy from '@tippyjs/react';
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/scale-subtle.css';
import 'tippy.js/animations/scale-extreme.css';
import ScrolltoTop from '../formatting/ScrollToTop'
import { ImArrowRight } from 'react-icons/im';
import { ImArrowLeft }  from 'react-icons/im';
import { FaShareSquare } from 'react-icons/fa';

const EventPassOff = ({ match, ProcessedEvents, EventGuideData, master_index, jptoggledata }) => {

    if(match.params.id == "calendar"){
        return(
            <Navigate replace to="/events/calendar"/>
        )
    }
    if(match.params.id == "banners"){
        return(
            <Navigate replace to="/events/banners"/>
        )
    }
    if(match.params.id == "panels"){
        return(
            <Navigate replace to="/events/panels"/>
        )
    }

    if(match.params.id == "forecast"){
        return(
            <Navigate replace to="/events/forecast"/>
        )
    }

    const filtered = ProcessedEvents.filter(function (el) { 
      return el["eventindex"] == match.params.id ; 
    }); 

    if(filtered.length === 0 ) {
        return(
            <Navigate replace to="/404"/>
        )
    
    } else {

        const filteredevent = ProcessedEvents.filter(item => {
            return item.eventindex == match.params.id
          })

          const prefilteredlist = ProcessedEvents.filter(function (el) { 
            return el["indate"] !== undefined ; 
          }); 

        const sortedevents= prefilteredlist.sort((a, b) => new Date(a.indate) - new Date(b.indate));
       
        let currentIndex = sortedevents.findIndex(x => x.eventindex == match.params.id);
        
        const nextIndex = (currentIndex + 1) % sortedevents.length;
        const previousIndex = (currentIndex - 1) % sortedevents.length;
    
        const nextevent = (function (){
            const holder = sortedevents[nextIndex];
            if(nextIndex === 0 ){
                return false;
            } else{
                return holder;
            }
        })();
    
        const previousevent = (function (){
            const holder = sortedevents[previousIndex];
            if(holder === undefined ){
                return false;
            } else{
                return holder;
            }
        })();

        const eventpull = filteredevent[0];

        const url = window.location.href

        return(
            <div>
                <Helmet>
                    <title>Event {eventpull.name} - Dissidia Compendium</title>
                    <meta property="og:site_name" content="Dissidia Compendium"/>
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://dissidiacompendium.com"/>
                    <meta name="description" content={`Find enemy and characters info as well as Community help for ${eventpull.name} event`}/>
                    <meta name="twitter:title" content={`Event ${eventpull.name}`}/>
                    <meta name="twitter:description" content={`Find enemy and characters info as well as Community help for ${eventpull.name} event`}/>
                    <meta name="twitter:image" content={`${eventpull.url1}`}/>
                    <meta name="twitter:card" content="summary_large_image"/>
                    <meta name="twitter:image:alt" content={`${eventpull.name}`}/>
                    <meta property="og:title" content={`Event ${eventpull.name}`}/>
                    <meta property="og:description" content={`Find enemy and characters info as well as Community help for ${eventpull.name} event`}/>
                    <meta property="og:image" content={`${eventpull.url1}`}/>
                    <meta property="og:url" content={`https://dissidiacompendium.com/events/${eventpull.eventindex}`}/>
                </Helmet>
                <ScrolltoTop/>
                <div className="returnbutton">
                <DefaultTippy content={"Return to Events"} className="tooltip" >
                <Link className="returnlink" to={`/events`}>
                    <div className="returnicon"></div>
                </Link>
                </DefaultTippy>
                </div>
                <div className="content">
                {nextevent == false ? "":
                <Link to={`/events/${nextevent.eventindex}`}>
                <DefaultTippy content={nextevent.name} className="tooltip" >
                <div className="nextbutton">
                    <ImArrowRight className="nexticon"/>
                </div>
                </DefaultTippy>
                </Link>}
                {previousevent == false ? "":
                <Link to={`/events/${previousevent.eventindex}`}>
                <DefaultTippy content={previousevent.name} className="tooltip" >
                <div className="previousbutton">
                    <ImArrowLeft className="previousicon"/>
                </div>
                </DefaultTippy>
                </Link>}
                    <CopyToClipboard text={url}>
                        <div className="shareholder">
                            <Tippy content="Link Copied!" inertia={true} animation={"shift-away"} touch={true} arrow={false} trigger={"click"} placement={"bottom"} duration={[100,500]}>
                                <div className="sharebutton automarg"><div className="centertext"><FaShareSquare className="shareicon"/>&nbsp;Share Page</div></div>
                            </Tippy>
                        </div>
                    </CopyToClipboard>
                    <ul className="nolistdisplay">
                    <EventListing 
                    match={eventpull}  
                    permapage={true} 
                    EventGuideData={EventGuideData}
                    jptoggledata={jptoggledata}
                    master_index={master_index}
                    />
                    </ul>
                </div>
            </div>
        )
    }
}
export default EventPassOff;