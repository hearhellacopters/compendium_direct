import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { setFalse, setTrue } from './redux/ducks/jptoggle'
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import CalendarMonthView from './components/Events/month_view/CalendarMonthView';
import Tippy from './components/TippyDefaults.js';
import { getQueryStringVal, useQueryParam } from './components/URLParams'

export default function Calendar({ 
  JPCalendarData, 
  EventData, 
  BannerData, 
  jptoggledata 
}){

  const dispatch = useDispatch();

  const curtime = new Date().getTime()

  const calGLdates = EventData.filter(function (el) {
    return el["tempdate"] === false;
  });

  const calGLBanners = BannerData.filter(function (el) {
    return el["tempdate"] === false;
  });

  const calJPBanners = BannerData.filter(function (el) {
    return el["tempdate"] === true;
  });

  function ordinal(n) {
    var s = ["th", "st", "nd", "rd"];
    var v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }
  const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const makedouble = (number) => {
    if (number < 10) {
      return `0${number}`
    } else {
      return number
    }
  }

  //JP Cal
  const JPCalHolder = []

  const ProcessedJPEvents = JPCalendarData.map(filtered => (
    {
      id: filtered.eventindex,
      types: filtered.type,
      title: filtered.name,
      endDate: `${filtered.permanent == true ? "" : curtime <= new Date(filtered.JPoutdate) ? `Ends: ` : `Ended: `}${filtered.permanent == true ? "" : months[new Date(filtered.JPoutdate).getMonth()]} ${filtered.permanent == true ? "" : ordinal(new Date(filtered.JPoutdate).getDate())}`,
      startDate: `${filtered.JPindate && filtered.JPindate.replace(/(T\d\d:\d\d:\d\d.\d\d\dZ)/gm, 'T06:00:00.000Z')}`,
      url: `/events/${filtered.eventindex}`
    }
  ))

  JPCalHolder.push(...ProcessedJPEvents)

  const ProcessedJPBanners = calJPBanners.map(filtered => (
    {
      id: filtered.bannerindex,
      types: "Banner",
      title: filtered.name,
      endDate: `${curtime <= new Date(filtered.JPoutdate) ? `Ends: ` : `Ended: `}${months[new Date(filtered.JPoutdate).getMonth()]} ${ordinal(new Date(filtered.JPoutdate).getDate())}`,
      startDate: `${filtered.JPindate && filtered.JPindate.replace(/(T\d\d:\d\d:\d\d.\d\d\dZ)/gm, 'T06:00:00.000Z')}`,
      url: `/events/banners/${filtered.bannerindex}`
    }
  ))

  JPCalHolder.push(...ProcessedJPBanners)


  const JPuniqueevents = Array.from(new Set(JPCalHolder.map(a => a.startDate)))
    .map(id => {
      return JPCalHolder.find(a => a.startDate === id)
    })


  //GL Cal
  const GLCalHolder = []

  const ProcessedGLEvents = calGLdates.map(filtered => (
    {
      id: filtered.eventindex,
      types: filtered.type,
      title: filtered.name,
      endDate: `${filtered.permanent == true ? "" : curtime <= new Date(filtered.outdate) ? `Ends: ` : `Ended: `}${filtered.permanent == true ? "" : months[new Date(filtered.outdate).getMonth()]} ${filtered.permanent == true ? "" : ordinal(new Date(filtered.outdate).getDate())}`,
      startDate: `${filtered.indate && filtered.indate.replace(/(T\d\d:\d\d:\d\d.\d\d\dZ)/gm, 'T02:00:00.000Z')}`,
      url: `/events/${filtered.eventindex}`
    }
  ))

  GLCalHolder.push(...ProcessedGLEvents)

  const ProcessedGLBanners = calGLBanners.map(filtered => (
    {
      id: filtered.bannerindex,
      types: "Banner",
      title: filtered.name,
      endDate: `${curtime <= new Date(filtered.outdate) ? `Ends: ` : `Ended: `}${months[new Date(filtered.outdate).getMonth()]} ${ordinal(new Date(filtered.outdate).getDate())}`,
      startDate: `${filtered.indate && filtered.indate.replace(/(T\d\d:\d\d:\d\d.\d\d\dZ)/gm, 'T02:00:00.000Z')}`,
      url: `/events/banners/${filtered.bannerindex}`
    }
  ))

  GLCalHolder.push(...ProcessedGLBanners)

  const GLuniqueevents = Array.from(new Set(GLCalHolder.map(a => a.startDate)))
    .map(id => {
      return GLCalHolder.find(a => a.startDate === id)
    })

  const [jponly, setjponly] = useState(jptoggledata);
  const [JPsearch, setJPSearch] = useQueryParam("JP", "");

  //jp params

  useEffect(() => {
    if (jptoggledata == true) {
      setJPSearch("true")
    } else {
      setJPSearch("")
    }
  }, [jptoggledata, setJPSearch])

  useEffect(() => {
    if (getQueryStringVal("JP") == "true") {
      dispatch(setTrue())
      setjponly(true)
    } else {
      dispatch(setFalse())
      setjponly(false)
    }
  }, [setJPSearch, dispatch])

  const jponlybutton = () => {
    if (jponly == false) {
      dispatch(setTrue())
      setJPSearch("true")
    } else {
      dispatch(setFalse())
      setJPSearch("")
    }
    setjponly((prevValue) => !prevValue);
  };

  const event ={
    "Banner": "BannerOnly",
    "Event": "EventsCal",
    "Raid": "RaidButtonCal",
    "Heretic": "HereticButtonCal",
    "Dimension's End": "DimensionsEndCal",
    "Lost Chapter": "LostChaptersCal",
    "Hunt": "HuntsCal",
    "6 Man": "SixManCal",
    "Abyss": "AbyssButtonCal",
    "Act 1": "ActOneCal",
    "Act 2": "ActTwoCal",
    "Act 3": "ActThreeCal",
    "Act 4": "ActFourCal",
    "Boss Rush": "BossRushCal",
    "Mission Dungeon": "MissionDungeonCal",
    "World of Illusion": "WorldofIllusionsCal",
    "Entangled Wills": "EntangledWillsCal",
    "Memorial": "MemorialCal"
  }

  const renderGLDay = (day) => {
    const daterenders = GLuniqueevents.map(filtered => (
      `${new Date(filtered.startDate).getFullYear()}-${makedouble(new Date(filtered.startDate).getMonth() + 1)}-${makedouble(new Date(filtered.startDate).getDate())}` == `${new Date(day).getFullYear()}-${makedouble(new Date(day).getMonth() + 1)}-${makedouble(new Date(day).getDate())}` ?
        <Tippy key={filtered.id} touch="true" content={<span>{filtered.title}<br />{filtered.endDate}</span>}>
          <div className="tableholder">
            <Link to={filtered.url}>
              <div className={`buttoncal ${event[filtered.types]}`} />
            </Link>
          </div>
        </Tippy>
        : ""
    ))
    return daterenders
  };

  const renderJPDay = (day) => {
    const daterenders = JPuniqueevents.map(filtered => (
      `${new Date(filtered.startDate).getFullYear()}-${makedouble(new Date(filtered.startDate).getMonth() + 1)}-${makedouble(new Date(filtered.startDate).getDate())}` == `${new Date(day).getFullYear()}-${makedouble(new Date(day).getMonth() + 1)}-${makedouble(new Date(day).getDate())}` ?
        <Tippy key={filtered.id} touch="true" content={<span>{filtered.title}<br />{filtered.endDate}</span>}>
          <div className={`tableholder ${new Date(day).toISOString().split("T")[0]} ${filtered.startDate}`}>
            <Link to={filtered.url}>
              <div className={`buttoncal ${event[filtered.types]}`} />
            </Link>
          </div>
        </Tippy>
        : ""
    ))
    return daterenders
  };

  return (
    <div>
      <Helmet>
        <title>Calendar - Dissidia Compendium</title>
        <meta property="og:site_name" content="Dissidia Compendium" />
        <meta name="description" content="Calendar view of all events in a complete game timeline!" />\
        <meta name="twitter:title" content="Calendar View - Dissidia Compendium" />
        <meta name="twitter:description" content="Calendar view of all events in a complete game timeline!" />\
        <meta property="og:title" content="Calendar View - Dissidia Compendium" />
        <meta property="og:description" content="Calendar view of all events in a complete game timeline!" />\
      </Helmet>
      <div className="content">
        <h1>{jponly == false ? "GL " : "JP "}Calendar</h1>
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
          <Link to={"../events/missions?panels=true"}>
              <li className={""} >Missions</li>
          </Link>
          <Link to={"../events/notices"}>
            <li className={""} >Notices</li>
          </Link>
          <Link to={"../events/forecast"}>
            <li className={""} >Forecast</li>
          </Link>
          <Link to={"/events/calendar"}>
            <li className={"active"} ><span className="gemselected" />Calendar</li>
          </Link>
        </ul>
        <div className="calholder noselect">
          <div className="calcenter">
            {jponly == false ?
              <CalendarMonthView key="1" flag={"glflage"} renderDay={renderGLDay} titleTextStyle={{ color: 'white' }} dayNameTextStyle={{ color: 'white' }} dayTextStyle={{ color: 'white', fontSize: "20px", background: 'none', marginTop: "2px", marginRight: "2px" }} activeDayStyle={{ background: '#81a0c9', boxShadow: "inset -5px -5px 15px -2px #000000, inset 4px 4px 15px -2px #FFFFFF", borderRadius: "10px" }} inactiveDayStyle={{ boxShadow: "inset -5px -5px 15px -2px #000000, inset 4px 4px 15px -2px #FFFFFF", borderRadius: "10px", border: "1px solid black" }} width="100%" /> :
              <CalendarMonthView key="2" flag={"jpflage jpsmallinactive"} renderDay={renderJPDay} titleTextStyle={{ color: 'white' }} dayNameTextStyle={{ color: 'white' }} dayTextStyle={{ color: 'white', fontSize: "20px", background: 'none', marginTop: "2px", marginRight: "2px" }} activeDayStyle={{ background: '#81a0c9', boxShadow: "inset -5px -5px 15px -2px #000000, inset 4px 4px 15px -2px #FFFFFF", borderRadius: "10px" }} inactiveDayStyle={{ boxShadow: "inset -5px -5px 15px -2px #000000, inset 4px 4px 15px -2px #FFFFFF", borderRadius: "10px", border: "1px solid black" }} width="100%" />
            }
          </div>
        </div>
        <span className="subtext">
          *Multiple events on same day not shown
        </span>
      </div>
    </div>
  );
}
