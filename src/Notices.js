import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { setFalse, setTrue } from './redux/ducks/jptoggle'
import { useStateIfMounted } from "use-state-if-mounted";
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import Tippy from './formatting/TippyDefaults'
import NoticeFormatting from './formatting/NoticeFormatting';
import { getQuery, getQueryStringVal, useQueryParam } from './processing/urlparams'

const Notices =({
    ProcessedNotices,
    jptoggledata
})=>{

    const dispatch = useDispatch();
    const [jponly, setJPonly] = useState(jptoggledata);

    const [noticelist,setnoticelist]= useStateIfMounted(ProcessedNotices.list.sort((a,b)=>b.start_at - a.start_at));
    const [noticetime,setnoticetime]= useStateIfMounted(ProcessedNotices.date);

    useEffect(()=>{
        if(ProcessedNotices != undefined){
            setnoticelist()
            const list = ProcessedNotices.list.sort((a,b)=>b.start_at - a.start_at)
            setnoticelist(list)
            setnoticetime(ProcessedNotices.date)
        }
        // eslint-disable-next-line
    },[jptoggledata])

    function ordinal(n) {
        var s = ["th", "st", "nd", "rd"];
        var v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }

    const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

    var ampm = "AM"
    const set_hours = (time)=>{
        if(time == 0){
            return 12
        }
        if(time >12){
            ampm = "PM"
            time = time - 12
            return time
        } else {
            return time
        }
    }

    const [JPsearch, setJPSearch] = useQueryParam("JP", "");

    const jponlybutton = () => {
        if (jponly == false) {
          dispatch(setTrue())
          setJPSearch("true")
        } else {
          dispatch(setFalse())
          setJPSearch("")
        }
        setJPonly((prevValue) => !prevValue);
      };

    return (
        <div className="">
            <Helmet>
                <title>Notices - Dissidia Compendium</title>
                <meta property="og:site_name" content="Dissidia Compendium" />
                <meta name="description" content="Current in game Notices!" />\
                <meta name="twitter:title" content="Notices - Dissidia Compendium" />
                <meta name="twitter:description" content="Current in game Panels!" />\
                <meta property="og:title" content="Notices - Dissidia Compendium" />
                <meta property="og:description" content="Current in game Notices!" />\
            </Helmet>
            <div className="content">
                <h1>{jponly == false ? "GL " : "JP "}Notices</h1>
                <div className="noselect">
                    <span className={`${jptoggledata ? "jponlybackground" : "GLonlybackground"}`}>
                    <Tippy content={`${jptoggledata ? "Switch to GL" : "Switch to JP"}`} className="tooltip" >
                        <span onClick={jponlybutton} className={`${jptoggledata ? "jpflage jpsmallinactive smalleventbutton" : "glflage smalleventbutton"}`} />
                    </Tippy>
                    </span>
                    <div>
                    </div>
                </div>
                <ul className="bannertabs">
                    <Link to={"../events"}>
                    <li className={""} >Events</li>
                    </Link>
                    <Link to={"../events/banners"}>
                    <li className={""} >Banners</li>
                    </Link>
                    <Link to={"../events/notices"}>
                    <li className={"active"} ><span className="gemselected" />Notices</li>
                    </Link>
                    <Link to={"../events/forecast"}>
                    <li className={""} >Forecast</li>
                    </Link>
                    <Link to={"../events/panels"}>
                    <li className={""} >Panels</li>
                    </Link>
                    <Link to={"/events/calendar"}>
                    <li className={""} >Calendar</li>
                    </Link>
                </ul>
                <div className="buffsholder">
                    <div className="lastupdate">{noticetime && `Updated on: ${months[new Date(noticetime).getMonth()]} ${ordinal(new Date(noticetime).getDate())} ${set_hours(new Date(noticetime).getHours())}:${new Date(noticetime).getMinutes().toString().padStart(2, '0')}${ampm}`}</div>
                    {noticelist &&
                    noticelist.map((self, i)=>(
                            <NoticeFormatting
                            key={`${i}-${jptoggledata}`}
                            match={self}
                            jptoggledata={jptoggledata}
                            />
                        )
                    )}
                </div>
            </div>
        </div>
    )
} 
export default Notices