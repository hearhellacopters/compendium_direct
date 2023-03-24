import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import FaceMaker from './CharFaceFormatting.js'
import EnemyListingDirect from './EnemyListingDirect.js'
import ReminderMaker from './ReminderMaker.js';
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import GetEvents from '../passoff/GetEventGuides.js'
import { EndsInTimer, StartsInTimer } from './Timers'
import TickDown from '../processing/tickDown'
import TickUp from '../processing/tickUp'
import BackMaker from './BackMaker.js';

import Sphere_Passive_Ability_Formatting from '../characterpages/direct/formatting/passives/Sphere_Passive_Ability_Formatting.js';
import { useDispatch, useSelector } from "react-redux";
import { getJPToggle } from '../redux/ducks/jptoggle';

//direct

import { getJPGameListSphere } from '../redux/ducks/JP/gamelist_sphere';
import { getGLGameListSphere } from '../redux/ducks/GL/gamelist_sphere';

const EventsFormatting = ({ match, permapage, EventGuideData, master_index }) => {

    const char_id = master_index.charid
    const hide_other = window.innerWidth != undefined && window.innerWidth < 799 ? permapage == true ? false : true : false

    useEffect(() => {
        setBannerdisplay("Banner1");
        setEventURL("Event1");
        setShowingLinks(permapage)
    }, [permapage]);

    const [eventURL, setEventURL] = useState("Event1")
    const [showingBanners, setShowingBanners] = useState(false)
    const [showingLinks, setShowingLinks] = useState(false)
    const [bannerdisplay, setBannerdisplay] = useState("Banner1")
    const [selectedbanner, setselectedbanner] = useState()
    const [showingsphereslist, setshowingsphereslist] = useState(permapage == true ? true : false)
    const [spheres_holder, setspheres_holder] = useState()

    useEffect(() => {
        if (match.bannercount != 0 && match.banners && match.banners.length != 0) {
            setselectedbanner(match.banners[0])
        } else {
            setselectedbanner()
        }
    }, [match, permapage]);

    const totalbannercount = match.bannercount == undefined ? 0 : match.bannercount;

    const currenttime = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function ordinal(n) {
        var s = ["th", "st", "nd", "rd"];
        var v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }

    const caldata = {
        name: `${match.name} Event`,
        details: `Opera Omnia ${match.tempdate == false ? "GL Event " : "JP Event "}` + match.name,
        startsAt: match.tempdate == true ? match.JPindate : match.indate,
        endsAt: match.tempdate == true ? match.JPoutdate : match.outdate,
    }

    const handleSelectBanner = (bannerdata, bannernumber) => {
        setselectedbanner(bannerdata)
        setBannerdisplay(bannernumber)
    }

    const dispatch = useDispatch();


    const jptoggledata = useSelector((state) =>
        state.toggle.toggle
    );

    useEffect(() => {
        let mounted = true
        if (mounted) {
            dispatch(getJPToggle());
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch]);

    const [ProcessedSpheres, setProcessedSpheres] = useState()
    const [ver, setver] = useState(jptoggledata == true ? "JP" : "GL")

    const jp_gamelist_sphere = useSelector((state) => state.jp_gamelist_sphere.jp_gamelist_sphere)

    const gl_gamelist_sphere = useSelector((state) => state.gl_gamelist_sphere.gl_gamelist_sphere)

    useEffect(() => {
        let mounted = true
        if (mounted && match && match.tempdate == true && jp_gamelist_sphere == undefined) {
            setProcessedSpheres()
            dispatch(getJPGameListSphere())
            setver("JP")
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, match, jp_gamelist_sphere])

    useEffect(() => {
        let mounted = true
        if (mounted && match && match.tempdate == false && gl_gamelist_sphere == undefined) {
            setProcessedSpheres()
            dispatch(getGLGameListSphere())
            setver("GL")
        }
        return function cleanup() {
            mounted = false
        }
    }, [dispatch, match, gl_gamelist_sphere])

    useEffect(() => {
        if (match && match.tempdate == true && jp_gamelist_sphere != undefined) {
            setProcessedSpheres(jp_gamelist_sphere)
            setver("JP")
        }
        if (match && match.tempdate == false && gl_gamelist_sphere != undefined) {
            setProcessedSpheres(gl_gamelist_sphere)
            setver("GL")
        }
    }, [dispatch, match, gl_gamelist_sphere, jp_gamelist_sphere])

    useEffect(() => {
        if (match.SpheresList && match.SpheresList.length != 0 && showingsphereslist == true && ProcessedSpheres != undefined) {
            const holder = []
            match.SpheresList.forEach(self => {
                const pull = ProcessedSpheres.filter(self2 => self.CharID == self2.CharID && self2.RF == true)
                if (pull.length != 0) {
                    holder.push(pull[0])
                }
            })
            if (holder.length != 0) {
                setspheres_holder(holder)
            }

        }
    }, [jptoggledata, match, showingsphereslist, ProcessedSpheres])

    return (
        <li id={match.type} key={match.eventindex}>
            <div className={permapage == true ? "singleeventtitlebanner" : "eventtitlebanner"} style={{ minHeight: "40px" }}>
                {permapage == false ?
                    <Link style={{ color: "white" }} to={`/events/` + match.eventindex} >
                        <h3 className={permapage == false ? "toevents" : "atevents"}>{match.name}</h3>
                    </Link> :
                    <h3 className={permapage == false ? "toevents" : "atevents"}>{match.name}</h3>
                }
                {currenttime >= new Date(match.outdate) ? (
                    match.permanent == true ? (
                        <LazyLoadComponent>
                            <div className='EventHolder'>
                                <div className="tickholder greencolor">
                                    <div className="glshadow"><span className='emoji'>🌎</span></div>&nbsp;<TickUp value={months[new Date(match.indate).getMonth()]} /><TickUp value={ordinal(new Date(match.indate).getDate())} /><TickUp value={new Date(match.indate).getFullYear()} />
                                </div>
                                <div className='space_left'>{match.number ? match.number : ""}</div>
                            </div>
                        </LazyLoadComponent>
                    ) : (
                        <LazyLoadComponent>
                            <div className='EventHolder'>
                                <div className="tickholder redcolor">
                                    <div className="glshadow"><span className='emoji'>🌎</span></div>&nbsp;<TickDown value={months[new Date(match.outdate).getMonth()]} /><TickDown value={ordinal(new Date(match.outdate).getDate())} /><TickDown value={new Date(match.outdate).getFullYear()} />
                                </div>
                                <div className='space_left'>{match.number ? match.number : ""}</div>
                            </div>
                        </LazyLoadComponent>
                    )
                ) : match.tempdate == true ?
                    <LazyLoadComponent>
                        <div className='EventHolder'>
                            <div className="greencolor">
                                <div className="tickholder">
                                    <div className="glshadow"><span className='emoji'>🌎</span></div>&nbsp;<TickUp value={months[new Date(match.indate).getMonth()]} /><div className="spacerleft"><TickUp value={new Date(match.indate).getFullYear()} /></div>
                                </div>
                                {match.JPindate == undefined ? "" :
                                    currenttime <= new Date(match.JPindate) ?
                                        <StartsInTimer expiryTimestamp={new Date(match.JPindate)} JPFlag={true} /> :
                                        new Date(match.JPoutdate) <= currenttime ? "" :
                                            match.permanent == true ? (
                                                <div className="tickholder greencolor">
                                                    <span className="jpflagtick"></span>&nbsp;<TickUp value={months[new Date(match.JPindate).getMonth()]} /><TickUp value={ordinal(new Date(match.JPindate).getDate())} /><TickUp value={new Date(match.JPindate).getFullYear()} />
                                                </div>) :
                                                <EndsInTimer expiryTimestamp={new Date(match.JPoutdate)} JPFlag={true} />}
                            </div>
                            <div className='space_left'>{match.number ? match.number : ""}</div>
                        </div>
                    </LazyLoadComponent>
                    : currenttime <= new Date(match.indate) ? (
                        <LazyLoadComponent>
                            <div className='EventHolder'>
                                <StartsInTimer expiryTimestamp={new Date(match.indate)} JPFlag={false} />
                                <div className='space_left'>{match.number ? match.number : ""}</div>
                            </div>
                        </LazyLoadComponent>
                    ) : match.permanent == false ? (
                        <LazyLoadComponent>
                            <div className='EventHolder'>
                                <EndsInTimer expiryTimestamp={new Date(match.outdate)} JPFlag={false} />
                                <div className='space_left'>{match.number ? match.number : ""}</div>
                            </div>
                        </LazyLoadComponent>
                    )
                        : (
                            <LazyLoadComponent>
                                <div className='EventHolder'>
                                    <div className="tickholder greencolor">
                                        <div className="glshadow"><span className='emoji'>🌎</span></div>&nbsp;<TickUp value={months[new Date(match.indate).getMonth()]} /><TickUp value={ordinal(new Date(match.indate).getDate())} /><TickUp value={new Date(match.indate).getFullYear()} />
                                    </div>
                                    <div className='space_left'>{match.number ? match.number : ""}</div>
                                </div>
                            </LazyLoadComponent>
                        )}
            </div>
            {permapage == true ?
                match.tempdate == false && new Date(match.outdate) >= currenttime || match.tempdate == true && match.JPindate != undefined && new Date(match.JPoutdate) >= currenttime ?
                    <div className="znone">
                        <div className="eventtitlebanner">
                            <ReminderMaker eventdata={caldata}>
                                Reminder
                            </ReminderMaker>
                        </div>
                    </div>
                    : "" : ""}
            <div className="eventimageholder">
                <div className="eventholder">
                    {match.url2 == undefined ?
                        permapage == false ?
                            <Link to={`../events/${match.eventindex}`}>
                                <LazyLoadImage effect="opacity" className={`eventimage withshadow ${permapage == false ? "showlink" : ""}`} src={match.url1} alt={match.name} />
                            </Link>
                            :
                            <LazyLoadImage effect="opacity" className={`eventimage withshadow ${permapage == false ? "showlink" : ""}`} src={match.url1} alt={match.name} />
                        :
                        <div className="eventtabs">
                            <div className="eventwithbackgorundtabs withshadow">
                                {permapage == false ?
                                    <Link to={`../events/${match.eventindex}`}>
                                        <LazyLoadImage effect="opacity" className={`eventimage ${permapage == false ? "showlink" : ""}`} src={
                                            eventURL == "Event1" ? match.url1 :
                                                eventURL == "Event2" ? match.url2 :
                                                    eventURL == "Event3" ? match.url3 :
                                                        eventURL == "Event4" ? match.url4 :
                                                            ""
                                        } alt={match.name} />
                                    </Link> :
                                    <LazyLoadImage effect="opacity" className={`eventimage ${permapage == false ? "showlink" : ""}`} src={
                                        eventURL == "Event1" ? match.url1 :
                                            eventURL == "Event2" ? match.url2 :
                                                eventURL == "Event3" ? match.url3 :
                                                    eventURL == "Event4" ? match.url4 :
                                                        ""
                                    } alt={match.name} />
                                }
                            </div>
                            {match.url3 == undefined ?
                                <ul className="eventablist">
                                    <li onClick={() => setEventURL("Event1")} className={eventURL == "Event1" ? "activeeventtab" : "inactiveeventtab"} >
                                        Event 1
                                    </li>
                                    <li onClick={() => setEventURL("Event2")} className={eventURL == "Event2" ? "activeeventtab" : "inactiveeventtab"}>
                                        Event 2
                                    </li>
                                </ul> :
                                match.url4 == undefined ?
                                    <ul className="eventablist">
                                        <li onClick={() => setEventURL("Event1")} className={eventURL == "Event1" ? "activeeventtab" : "inactiveeventtab"}>
                                            Event 1
                                        </li>
                                        <li onClick={() => setEventURL("Event2")} className={eventURL == "Event2" ? "activeeventtab" : "inactiveeventtab"}>
                                            Event 2
                                        </li>
                                        <li onClick={() => setEventURL("Event3")} className={eventURL == "Event3" ? "activeeventtab" : "inactiveeventtab"}>
                                            Event 3
                                        </li>
                                    </ul> :
                                    <ul className="eventablist">
                                        <li onClick={() => setEventURL("Event1")} className={eventURL == "Event1" ? "activeeventtab" : "inactiveeventtab"}>
                                            Event 1
                                        </li>
                                        <li onClick={() => setEventURL("Event2")} className={eventURL == "Event2" ? "activeeventtab" : "inactiveeventtab"}>
                                            Event 2
                                        </li>
                                        <li onClick={() => setEventURL("Event3")} className={eventURL == "Event3" ? "activeeventtab" : "inactiveeventtab"}>
                                            Event 3
                                        </li>
                                        <li onClick={() => setEventURL("Event4")} className={eventURL == "Event4" ? "activeeventtab" : "inactiveeventtab"}>
                                            Event 4
                                        </li>
                                    </ul>
                            }
                        </div>
                    }
                    {match.BTChar != undefined ?
                            <BackMaker char_id={char_id} match={match.BTChar}/>
                        : ""}
                    {hide_other != true ?
                    <>
                    {match.EnemyList.length != 0 ?
                        <div className="znone">
                            <div className="enemyunits" >
                                <div className="featuredbanner">Featured Enemies</div>
                                <ul className="enemyevents">
                                    {match.EnemyList.map(Enemy => (
                                        <EnemyListingDirect key={Enemy.key} match={Enemy} />
                                    ))}
                                </ul>
                            </div>
                        </div> : ""
                    }
                    {match.CharList.length != 0 ?
                        <div className="zone">
                            <div className="featuredbanner">Featured Characters</div>
                            <div className="charholderflair" style={{ minHeight: "40px" }}>
                                <ul className="CharListHolder">
                                    <LazyLoadComponent>
                                        {match.CharList.map((char,i) => (
                                            <FaceMaker key={i} match={char} BTUnit={match.BTChar} />
                                        ))
                                        }
                                    </LazyLoadComponent>
                                </ul>
                            </div>
                        </div>
                        : ""
                    }
                    {match.SpheresList.length != 0 ?
                        <div className="zone">
                            <div className="featuredbanner">
                                <div onClick={() => setshowingsphereslist((prevValue) => !prevValue)} className="loadmorespheres">
                                    <span className="spheresbutton rfSpheresButton"></span> Spheres
                                </div>
                            </div>
                            {master_index != undefined &&

                                ver != undefined &&
                                showingsphereslist == true &&
                                spheres_holder != undefined ?
                                <div className="sphereslistholder">
                                    {spheres_holder.map((passive, i) => (
                                        <Sphere_Passive_Ability_Formatting
                                            key={i}
                                            passive_ability={passive.passive}
                                            ver={ver}
                                            loc={undefined}
                                            file={"exskill"}
                                            Single={true}

                                            master_index={master_index}

                                            sphere_type={passive.sphere_type}
                                            sphere_letter={passive.ex_category_id}
                                            release={passive.start_date}

                                            formatting={true}

                                            banner_color={"newblue"}
                                            base_color={"bluebase"}
                                            raw={passive}

                                            link={"spheres"}
                                        />
                                    ))}
                                </div> : ""}
                        </div>
                        : ""}
                    {showingLinks == false ? "" :
                        <GetEvents index={match.eventindex} EventGuideData={EventGuideData} />
                    }
                    {<div className="eventbuttons">
                        <div className="loadbanners" onClick={() => setShowingLinks((prevValue) => !prevValue)}>Community Help</div>
                        {totalbannercount == 0 ? "" :
                            <div className="loadbanners" onClick={() => setShowingBanners((prevValue) => !prevValue)}>Show Banner</div>}
                    </div>}
                    {showingBanners == false ?
                        totalbannercount == 0 ? "" :
                            showingBanners == false || showingLinks == false ? "" :
                                <div className="banneroneventholder"  >
                                    <div className="loadbanners" onClick={() => setShowingLinks((prevValue) => !prevValue)}>Community Help</div>
                                    {match.bannercount == 0 ? "" : <div className="loadbanners" onClick={() => setShowingBanners((prevValue) => !prevValue)}>Show Banner</div>}
                                </div>
                        :
                        <div className="bannerholdertabs">
                            {totalbannercount == 0 || selectedbanner == undefined ? "" :
                                totalbannercount == 1 ?
                                    <Link to={`../events/banners/${selectedbanner.bannerindex}`}>
                                        <LazyLoadImage effect="opacity" className={`bannerimage showlink`} src={selectedbanner.url} alt={selectedbanner.name} />
                                        <div className="bannername">{selectedbanner.name}</div>
                                    </Link> :
                                    <div className="eventwithbackgorundtabs">
                                        <Link to={`/events/banners/${selectedbanner.bannerindex}`}>
                                            <LazyLoadImage effect="opacity" className={`bannerimage showlink`} src={selectedbanner.url} alt={selectedbanner.name} />
                                            <div className="bannername">{selectedbanner.name}</div></Link>
                                    </div>}
                            {totalbannercount == 1 ? "" :
                                totalbannercount >= 1 ?
                                    <ul className="eventablist">
                                        {match.banners.map((self, i) => (
                                            <li key={i} onClick={() => handleSelectBanner(self, `Banner${i + 1}`)} className={bannerdisplay == `Banner${i + 1}` ? "activeeventtab" : "inactiveeventtab"} >
                                                {`Banner${i + 1}`}
                                            </li>
                                        ))}
                                    </ul> : ""}
                            {totalbannercount == 0 ? "" : <div className="loadbanners bottomspace" onClick={() => setShowingBanners(false)}>Hide Banner</div>}
                        </div>
                    }
                    </>
                    :""}
                </div>
            </div>
        </li>
    )
}
export default EventsFormatting;