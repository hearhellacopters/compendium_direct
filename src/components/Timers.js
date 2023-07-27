import React from 'react';
import useTimer from './useTimer/UseTimer'
import TickUp from './tickUp'
import TickDown from './tickDown'

export function EndsInTimer({ expiryTimestamp, JPFlag }) {
    const {
        seconds,
        minutes,
        hours,
        days
    } = useTimer({ expiryTimestamp });
    const newhours = hours.toString().length < 2 ? `0${hours}` : hours
    const newminutes = minutes.toString().length < 2 ? `0${minutes}` : minutes
    const newdays = days.toString().length < 2 ? `0${days}` : days
    const newseconds = seconds.toString().length < 2 ? `0${seconds}` : seconds
    return (
        <div className="tickholder redcolor">
            {JPFlag == true ? <div className="jpflagtick"></div> : ""}
            {JPFlag == false ? <div className="glshadow"><span className='emoji'>🌎</span></div> : ""}
            <div className="spacerleft">
                <TickDown value={newdays} />
                {days == 1 ? "Day" : "Days"}
            </div>
            <div className="spacerleft">
                <TickDown value={newhours} />
                {hours == 1 ? "Hour" : "Hours"}
            </div>
            <div className="spacerleft">
                <TickDown value={newminutes} />
                {minutes == 1 ? "Min" : "Mins"}
            </div>
            {//<div className="spacerleft">
                //<TickDown value={newseconds}/>
                //Sec
                //</div>
            }
        </div>
    );
}

export function StartsInTimer({ expiryTimestamp, JPFlag }) {
    const {
        seconds,
        minutes,
        hours,
        days
    } = useTimer({ expiryTimestamp });
    const newhours = hours.toString().length < 2 ? `0${hours}` : hours
    const newminutes = minutes.toString().length < 2 ? `0${minutes}` : minutes
    const newdays = days.toString().length < 2 ? `0${days}` : days
    const newseconds = seconds.toString().length < 2 ? `0${seconds}` : seconds
    return (
        <div className="tickholder greencolor">
            {JPFlag == true ? <div className="jpflagtick"></div> : ""}
            {JPFlag == false ? <div className="glshadow"><span className='emoji'>🌎</span></div> : ""}
            <div className="spacerleft">
                <TickUp value={newdays} />
                {days == 1 ? "Day" : "Days"}
            </div>
            <div className="spacerleft">
                <TickUp value={newhours} />
                {hours == 1 ? "Hour" : "Hours"}
            </div>
            <div className="spacerleft">
                <TickUp value={newminutes} />
                {minutes == 1 ? "Min" : "Mins"}
            </div>
            {//<div className="spacerleft">
                //<TickUp value={newseconds}/>
                //Sec
                //</div>
            }
        </div>
    );
}
