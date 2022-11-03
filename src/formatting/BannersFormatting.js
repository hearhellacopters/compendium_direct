import React, { useEffect, useState} from 'react';
import {EndsInTimer, StartsInTimer} from './Timers'
import { Link } from 'react-router-dom'
import FaceMaker from './CharFaceFormatting.js'
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import ReminderMaker from './ReminderMaker.js';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import TickDown from '../processing/tickDown'
import TickUp from '../processing/tickUp'

const FormatedEvents = ({ match , permapage }) => {

    const [bannerdisplay, setBannerdisplay] = useState("Banner1")

    useEffect(() => {
        setBannerdisplay("Banner1")
    },[]);

    const currenttime = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];


    function ordinal(n) {
        var s = ["th", "st", "nd", "rd"];
        var v = n%100;
        return n + (s[(v-20)%10] || s[v] || s[0]);
      }

        const caldata = {
            name: `${match.name} Banner`,
            details: `Opera Omnia ${match.tempdate == false ? "GL Banner " : "JP Banner " }` + match.name,
            startsAt: match.tempdate == true ? match.JPindate : match.indate,
            endsAt: match.tempdate == true ? match.JPoutdate : match.outdate,
        }

    return(
        <li id={match.type} key={match.bannerindex}>
            <div className={permapage == true ? "singleeventtitlebanner" : "eventtitlebanner"}>
                {permapage == false ? 
                <Link to={`/events/banners/` + match.bannerindex} >
                    <h3 className={permapage == false ? "toevents" : "atevents"}>{match.name}</h3>
                </Link> :
                <h3 className={permapage == false ? "toevents" : "atevents"}>{match.name}</h3>
                }
                    {currenttime >= new Date(match.outdate) ? (
                        <LazyLoadComponent>
                            <div className="tickholder redcolor">
                                <div className="glshadow"><span className='emoji'>🌎</span></div>&nbsp;<TickDown value={months[new Date(match.outdate).getMonth()]}/><TickDown value={ordinal(new Date(match.outdate).getDate())}/><TickDown value={new Date(match.outdate).getFullYear()}/>
                            </div>
                        </LazyLoadComponent>
                    ) : match.tempdate == true ? 
                        <LazyLoadComponent>
                            <div className="greencolor">
                                <div className="tickholder">
                                <div className="glshadow"><span className='emoji'>🌎</span></div>&nbsp;<TickUp value={months[new Date(match.indate).getMonth()]}/><div className="spacerleft"><TickUp value={new Date(match.indate).getFullYear()}/></div>
                                </div>
                            {match.JPindate == undefined ? "" :
                            currenttime <= new Date(match.JPindate) ?
                                <StartsInTimer expiryTimestamp={new Date(match.JPindate)} JPFlag={true}/> : 
                                new Date(match.JPoutdate) <= currenttime ? "" :
                                <EndsInTimer expiryTimestamp={new Date(match.JPoutdate)} JPFlag={true}/>}
                            </div> 
                        </LazyLoadComponent>
                     : currenttime <= new Date(match.indate) ? (
                        <LazyLoadComponent>
                            <StartsInTimer expiryTimestamp={new Date(match.indate)} JPFlag={false} />
                        </LazyLoadComponent>
                    ) : (
                        <LazyLoadComponent>
                            <EndsInTimer expiryTimestamp={new Date(match.outdate)} JPFlag={false}/>
                        </LazyLoadComponent>
                        )
                    }
            </div>
            {permapage == true ? 
                        match.tempdate == false && new Date(match.outdate) >= currenttime || match.tempdate == true  &&  match.JPindate != undefined && new Date(match.JPoutdate) >= currenttime?
                        <div className="znone">
                        <div className="eventtitlebanner">
                        <ReminderMaker eventdata={caldata}>
                            Reminder
                        </ReminderMaker>
                        </div>
                        </div>
                    : "": ""}
            <div className="eventimageholder">
                <div className="eventholder">
                    {match.url2 == undefined ? 
                    permapage == false ? 
                    <Link to={`/events/banners/${match.bannerindex}`}>
                    <LazyLoadImage effect="opacity" className={`bannerimage withshadow ${permapage == false ? "showlink" : ""}`} src={match.url1} alt={match.name} />
                    </Link>
                    :
                    <LazyLoadImage effect="opacity" className={`bannerimage withshadow ${permapage == false ? "showlink" : ""}`} src={match.url1} alt={match.name} />
                    : 
                    <div className="eventtabs">
                        <div className="eventwithbackgorundtabs withshadow" style={{ minHeight: "120px"}}>
                            {permapage == false ? 
                            <Link to={`/events/banners/${match.bannerindex}`}>
                            <LazyLoadImage effect="opacity" className={`bannerimage ${permapage == false ? "showlink" : ""}`} src={
                            bannerdisplay == "Banner1" ? match.url1 :
                            bannerdisplay == "Banner2" ? match.url2 :
                            ""
                            } alt={match.name} />
                            </Link> : 
                            <LazyLoadImage effect="opacity" className={`bannerimage ${permapage == false ? "showlink" : ""}`} src={
                            bannerdisplay == "Banner1" ? match.url1 :
                            bannerdisplay == "Banner2" ? match.url2 :
                            ""
                            } alt={match.name} />
                            }
                        </div>
                        {match.url2 !== undefined  ? 
                        <ul className="eventablist">
                            <li onClick={() => setBannerdisplay("Banner1")} className={bannerdisplay == "Banner1" ? "activeeventtab" : "inactiveeventtab"} >
                                Banner 1
                            </li>
                            <li onClick={() => setBannerdisplay("Banner2")} className={bannerdisplay == "Banner2" ? "activeeventtab" : "inactiveeventtab"}>
                                Banner 2
                            </li>
                        </ul> : ""}
                    </div>
                    }
                    {match.CharList.length != 0 ?
                    <div className="zone">
                        <div className="featuredbanner">Featured Characters</div>
                            <div className="charholderflair" style={{ minHeight: "40px"}}>
                                <ul className="CharListHolder">
                                    <LazyLoadComponent>
                                        {match.CharList.map(char => (
                                            <FaceMaker key={char.CharID} match={char} location="/gear" BTUnit={match.BTUnit}/>
                                        ))
                                        }
                                    </LazyLoadComponent>
                                </ul>
                            </div>
                    </div>
                    :""}
                    {permapage == false ? <br/> : ""}
                    {permapage == true && match.event != undefined ?
                    <div className="zone">
                    <div className="featuredbanner">Featured Event</div>
                    <div className="eventimageholder">
                        <div className="eventholder">
                        <Link to={`/events/${match.event.eventindex}`}>
                            <LazyLoadImage effect="opacity" className={`eventimage withshadow showlink`} src={match.event.url1} alt={match.event.name} />
                        <div className="bannername">{match.event.name}</div>
                        </Link>
                        </div>
                        </div>
                    </div>
                    :""}
                </div>
            </div>
        </li>
    )
}
export default FormatedEvents;