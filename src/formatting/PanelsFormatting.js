import React, {useState, useEffect} from 'react';
import {EndsInTimer, StartsInTimer} from './Timers'
import ReminderMaker from './ReminderMaker';
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import TickDown from '../processing/tickDown'
import addformatting from '../processing/replacer_abilitycontent';
import TickUp from '../processing/tickUp'

const PanelsFormatting = ({ match }) => { 

    const currenttime = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];


    function ordinal(n) {
        var s = ["th", "st", "nd", "rd"];
        var v = n%100;
        return n + (s[(v-20)%10] || s[v] || s[0]);
      }


        const caldata = {
            name: `${match.name} Panel`,
            details: `Opera Omnia ${match.jpflag == true ? "JP Panel "  : "GL Panel " }` + match.name,
            startsAt: match.indate,
            endsAt: match.outdate,
        } 

    return(
        <li key={match.panelid}>
            <div className="eventtitlebanner">
                <h3 className="atevents">{match.name}</h3>
                    {currenttime >= new Date(match.outdate) ? (
                        <LazyLoadComponent>
                            <div className="tickholder redcolor">
                                <div className="glshadow"><span className='emoji'>🌎</span></div>&nbsp;<TickDown value={months[new Date(match.outdate).getMonth()]}/><TickDown value={ordinal(new Date(match.outdate).getDate())}/><TickDown value={new Date(match.outdate).getFullYear()}/>
                            </div>
                        </LazyLoadComponent>
                    ) : currenttime <= new Date(match.indate) ? (
                        <LazyLoadComponent>
                            <StartsInTimer expiryTimestamp={new Date(match.indate)} JPFlag={match.jpflag} />
                        </LazyLoadComponent>
                    ) : (
                        <LazyLoadComponent>
                            <EndsInTimer expiryTimestamp={new Date(match.outdate)} JPFlag={match.jpflag}/>
                        </LazyLoadComponent>
                        )
                    }
            </div> 
            <div className="znone">
                        <div className="featuredbanner">
                        <ReminderMaker eventdata={caldata}>
                            Reminder
                        </ReminderMaker>
                        </div>
                        </div>
            <div className="eventimageholder">
                <div className="eventholder">
                    <a target="_blank" rel="noreferrer" href={match.url}>
                    <LazyLoadImage effect="opacity" className={`panelimage withshadow clicky`} src={match.url} alt={match.name} />
                    </a>
                </div>
            </div>
            {match.desc != undefined ?
            <div className="zone">
            <div className="featuredbanner">
                Panel Help
            </div>
            <div className="filterholderflair panelbottomline">
                {addformatting(match.desc)}
            </div>
            </div>
            :""}
        </li>
    )
}
export default PanelsFormatting;