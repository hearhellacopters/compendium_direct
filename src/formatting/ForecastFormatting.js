import React, { useEffect, useState } from 'react';
import { EndsInTimer, StartsInTimer } from './Timers'
import { Link } from 'react-router-dom'
import BackMaker from './BackFormatting.js'
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import '../Forecast.css'
import 'react-lazy-load-image-component/src/effects/opacity.css';
import TickDown from '../processing/tickDown'
import TickUp from '../processing/tickUp'

const ForecastFormatting = ({
    CharID,
    match,
    newchar,
    btchar,
    btpluschar,
    ldchar,
    frboardchar,
    ldboardchar,
    sevenachar,
    sevenapluschar,
    reworkchar,
    eightychar,
    ninetychar,
    frchar,
    board5chr
}) => {

    const [makedim, setmakedim] = useState(false)

    useEffect(() => {
        if (newchar == true ||
            btchar == true ||
            btpluschar == true ||
            ldchar == true ||
            ldboardchar == true ||
            sevenachar == true ||
            sevenapluschar == true ||
            reworkchar == true ||
            eightychar == true ||
            ninetychar == true ||
            frchar == true ||
            frboardchar == true ||
            board5chr == true ||
            CharID != ""
        ) {
            setmakedim(true)
        } else {
            setmakedim(false)
        }

    }, [CharID, board5chr, newchar, btchar, btpluschar, ldchar, ldboardchar, sevenachar, sevenapluschar, reworkchar, eightychar, ninetychar, frchar, frboardchar]);


    const currenttime = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];


    function ordinal(n) {
        var s = ["th", "st", "nd", "rd"];
        var v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }

    return (
        <li id={match.type} key={match.bannerindex}>
            <div className={"featuredbannerdark"}>
                <Link to={`/events/banners/` + match.bannerindex} style={{ color: "white" }}>
                    <h3 className={"toevents"}>{match.name}</h3>
                </Link>
                {currenttime >= new Date(match.outdate) ? (
                    <LazyLoadComponent>
                        <div className="tickholder redcolor">
                            <div className="glshadow"><span className='emoji'>🌎</span></div>&nbsp;<TickDown value={months[new Date(match.outdate).getMonth()]} /><TickDown value={ordinal(new Date(match.outdate).getDate())} /><TickDown value={new Date(match.outdate).getFullYear()} />
                        </div>
                    </LazyLoadComponent>
                ) : match.tempdate == true ?
                    <LazyLoadComponent>
                        <div className="greencolor">
                            <div className="tickholder">
                                <div className="glshadow"><span className='emoji'>🌎</span></div>&nbsp;<TickUp value={months[new Date(match.indate).getMonth()]} /><div className="spacerleft"><TickUp value={new Date(match.indate).getFullYear()} /></div>
                            </div>
                            {match.JPindate == undefined ? "" :
                                currenttime <= new Date(match.JPindate) ?
                                    <StartsInTimer expiryTimestamp={new Date(match.JPindate)} JPFlag={true} /> :
                                    new Date(match.JPoutdate) <= currenttime ? "" :
                                        <EndsInTimer expiryTimestamp={new Date(match.JPoutdate)} JPFlag={true} />}
                        </div>
                    </LazyLoadComponent>
                    : currenttime <= new Date(match.indate) ? (
                        <LazyLoadComponent>
                            <StartsInTimer expiryTimestamp={new Date(match.indate)} JPFlag={false} />
                        </LazyLoadComponent>
                    ) : (
                        <LazyLoadComponent>
                            <EndsInTimer expiryTimestamp={new Date(match.outdate)} JPFlag={false} />
                        </LazyLoadComponent>
                    )
                }
            </div>
            <div className="eventimageholder">
                {match.ForecastChars != undefined ?
                    <div className="eventholder">
                        <div className="featuredbanner2"><span className="charpageautotitle">Featured Characters</span></div>
                        <div className="charholderflairlight">
                            <ul className="CharBackListHolder">
                                <LazyLoadComponent>
                                    {match.ForecastChars.map(char => (
                                        <BackMaker key={char.CharID}
                                            match={char}
                                            dim={CharID != "" && CharID == char.CharID ? false : makedim}
                                            newchar={newchar}
                                            btchar={btchar}
                                            btpluschar={btpluschar}
                                            ldchar={ldchar}
                                            ldboardchar={ldboardchar}
                                            sevenachar={sevenachar}
                                            sevenapluschar={sevenapluschar}
                                            reworkchar={reworkchar}
                                            eightychar={eightychar}
                                            ninetychar={ninetychar}
                                            frboardchar={frboardchar}
                                            frchar={frchar}
                                            board5chr={board5chr}
                                        />
                                    ))
                                    }
                                    {match.ForecastChars && match.ForecastChars.length == 0 ?
                                        <li className="CharBackListHolderinner">
                                            <LazyLoadImage effect="opacity" alt="unknown" className={`CharBackForecast`} src={`https://dissidiacompendium.com/images/static/icons/misc/UnknownBack.png`} />
                                            <div className="facetextlist3">Unknown&nbsp;&nbsp;&nbsp;</div>
                                        </li>
                                        : ""}
                                </LazyLoadComponent>
                            </ul>
                        </div>
                    </div> : ""
                }
            </div>
        </li>
    )
}
export default ForecastFormatting;