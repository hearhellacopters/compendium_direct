import React, { useState, useEffect } from 'react';
import './CharacterPage.css'
import { useDispatch, useSelector } from "react-redux";
import { setFalse, setTrue } from '../redux/ducks/jptoggle'
import { getJPToggle } from '../redux/ducks/jptoggle';
import DefaultTippy from '../formatting/TippyDefaults.js';
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import { ImArrowRight } from 'react-icons/im';
import { ImArrowLeft } from 'react-icons/im';
import { FaShareSquare } from 'react-icons/fa';
import Tippy from '@tippyjs/react';
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/scale-subtle.css';
import 'tippy.js/animations/scale-extreme.css';
import { getQuery, getQueryStringVal, useQueryParam } from '../processing/urlparams'

const CharPageHeader = ({ nextevent,
    previousevent,
    headertitle,
    Subheader,
    newmatch,
    pageloc,
    nonext,
    match,
    direct_loc,
    showFilter,
    showfilterbutton
}) => {

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

    const [JPsearch, setJPSearch] = useQueryParam("JP", "");

    const [ver, setver] = useState(jptoggledata == true ? "JP" : "GL")

    useEffect(() => {
        setver(jptoggledata == true ? "JP" : "GL")
    }, [jptoggledata, setver])

    const url = window.location.href

    //jp params
    useEffect(() => {
        if (getQueryStringVal("JP") == "true") {
            dispatch(setTrue())
            setJPSearch("true")
        } else {
            dispatch(setFalse())
            setJPSearch("")
        }
    }, [setJPSearch, dispatch])

    useEffect(() => {
        if (jptoggledata == true) {
            setJPSearch("true")
        }
        if (getQueryStringVal("JP") == "true") {
            dispatch(setTrue())
        }
    }, [jptoggledata, dispatch, setJPSearch])


    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];


    function ordinal(n) {
        var s = ["th", "st", "nd", "rd"];
        var v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }

    return (
        <div>
            {nextevent == false || nonext == true ? "" :
                <Link to={`/characters/${nextevent.ShortName}/${pageloc == undefined || pageloc == "character" ? "" : pageloc}${match.params.type != undefined ? `/${match.params.type}` : ""}${jptoggledata == false ? "" : "?JP=true"}`}>
                    <DefaultTippy content={nextevent.CharacterName} className="tooltip" >
                        <div className="nextbutton">
                            <ImArrowRight className="nexticon" />
                        </div>
                    </DefaultTippy>
                </Link>}
            {previousevent == false || nonext == true ? "" :
                <Link to={`/characters/${previousevent.ShortName}/${pageloc == undefined || pageloc == "character" ? "" : pageloc}${match.params.type != undefined ? `/${match.params.type}` : ""}${jptoggledata == false ? "" : "?JP=true"}`}>
                    <DefaultTippy content={previousevent.CharacterName} className="tooltip" >
                        <div className="previousbutton">
                            <ImArrowLeft className="previousicon" />
                        </div>
                    </DefaultTippy>
                </Link>}
            {headertitle}
            <div className="subheader">{Subheader}</div>
            <div className="filterpadding"></div>
            <CopyToClipboard text={url}>
                <div className="characterpageshare">
                    <Tippy content="Link Copied!" inertia={true} animation={"shift-away"} touch={true} arrow={false} trigger={"click"} placement={"bottom"} duration={[100, 500]}>
                        <div className="sharebutton automarg"><div className="centertext"><FaShareSquare className="shareicon" />&nbsp;Share Page</div></div>
                    </Tippy>
                </div>
            </CopyToClipboard>
            <div onClick={showfilterbutton} key="filter1" className="sharefilter"><span className="jumptext"></span>{showFilter ? <TiArrowSortedUp className="uparrow" /> : <TiArrowSortedDown className="downarrow" />}</div>
            <div className="filterholderpages noselect" id={showFilter ? "showfilteren" : "hiddenfilteren"}>
                <div className="filterholderflair">
                    <div className="similarbanner">{`Updated on ${months[new Date(newmatch[`${ver}update`]).getMonth()]} ${ordinal(new Date(newmatch[`${ver}update`]).getDate())}`}</div>
                    <ul className="bufftypes">
                        <Link to={`/characters/${newmatch.ShortName}`}>
                            <li className={`${pageloc == "character" ? "filteractive" : "filterinactive"} buffbutton directprofile`}></li>
                        </Link>
                        <Link to={`/characters/${newmatch.ShortName}/abilities${ver =="JP"?"?JP=true":""}`}>
                            <Tippy content="Abilities">
                                <li className={`${pageloc == "abilities" ? "filteractive" : "filterinactive"}${(newmatch[`${ver}basic`] != true || newmatch[`${ver}abilities`] != true) ? "grey" : ""} buffbutton directabilitiesbutton`} ></li>
                            </Tippy>
                        </Link>
                        <Link to={`/characters/${newmatch.ShortName}/buffs${ver =="JP"?"?JP=true":""}`}>
                            <Tippy content="Buffs">
                                <li className={`${pageloc == "buffs" ? "filteractive" : "filterinactive"}${(newmatch[`${ver}basic`] != true || newmatch[`${ver}buffs`] != true) ? "grey" : ""} buffbutton directbuffsButton`} ></li>
                            </Tippy>
                        </Link>
                        <Link to={`/characters/${newmatch.ShortName}/gear${ver =="JP"?"?JP=true":""}`}>
                            <Tippy content="Equipment Passives">
                                <li className={`${pageloc == "gear" ? "filteractive" : "filterinactive"}${(newmatch[`${ver}basic`] != true || newmatch[`${ver}gear`] != true) ? "grey" : ""} buffbutton directgearbutton`} ></li>
                            </Tippy>
                        </Link>
                        {(newmatch[`${ver}crystal`] == true ||
                            newmatch[`${ver}sum_fix`] == true ||
                            newmatch[`${ver}exp`] == true ||
                            newmatch[`${ver}link`] == true ||
                            newmatch[`${ver}art`] == true)
                            && newmatch[`${ver}basic`] == true
                            ?
                            <Link to={`/characters/${newmatch.ShortName}/passives/crystal${ver =="JP"?"?JP=true":""}`}>
                                <Tippy content="Passives">
                                    <li className={`${pageloc == "passives" ? "filteractive" : "filterinactive"} buffbutton directpassives`} ></li>
                                </Tippy>
                            </Link>
                            :
                            <Link to={`/characters/${newmatch.ShortName}/passives/crystal${ver =="JP"?"?JP=true":""}`}>
                                <Tippy content="Passives">
                                    <li className={`${pageloc == "passives" ? "filteractive" : "filterinactive"}grey buffbutton directpassives`} ></li>
                                </Tippy>
                            </Link>
                        }
                        <Link to={`/characters/${newmatch.ShortName}/reworks${ver =="JP"?"?JP=true":""}`}>
                            <Tippy content="Upcoming Reworks">
                                <li className={`${pageloc == "reworks" ? "filteractive" : "filterinactive"} buffbutton reworktab${newmatch.ActiveRework == true ? "red" : ""}_direct`} ></li>
                            </Tippy>
                        </Link>
                        <Link to={`/characters/${newmatch.ShortName}/spheres${ver =="JP"?"?JP=true":""}`}>
                            <Tippy content="Spheres">
                                <li className={`${pageloc == "spheres" ? "filteractive" : "filterinactive"}${(newmatch[`${ver}basic`] != true || newmatch[`${ver}spheres`] != true) ? "grey" : ""} buffbutton directspherespagebutton`} ></li>
                            </Tippy>
                        </Link>
                        <Link to={`/characters/${newmatch.ShortName}/events${ver =="JP"?"?JP=true":""}`}>
                            <Tippy content="Associated Events">
                                <li className={`${pageloc == "events" ? "filteractive" : "filterinactive"}${(newmatch[`${ver}basic`] != true || newmatch[`${ver}events`] != true) ? "grey" : ""} buffbutton eventsdirect`} ></li>
                            </Tippy>
                        </Link>
                        <Link to={`/characters/${newmatch.ShortName}/community${ver =="JP"?"?JP=true":""}`}>
                            <Tippy content="Community Help">
                                <li className={`${pageloc == "community" ? "filteractive" : "filterinactive"} buffbutton communityprofile`} ></li>
                            </Tippy>
                        </Link>
                    </ul>
                    {pageloc != "passives" ? "" :
                        <div className="similarbanneruni">{"Passive Types"}</div>}
                    {direct_loc == "crystal" ||
                        direct_loc == "exp" ||
                        direct_loc == "boards" ||
                        direct_loc == "force" ||
                        direct_loc == "arts" ?
                        <ul className='bufftypes'>
                            <Link to={`/characters/${newmatch.ShortName}/passives/exp${ver =="JP"?"?JP=true":""}`}>
                                <Tippy content="Experience Passives">
                                    <li className={`${direct_loc == "exp" ? "filteractive" : "filterinactive"}${(newmatch[`${ver}basic`] != true || newmatch[`${ver}exp`] != true) ? "grey" : ""} buffbutton directexppassives`} ></li>
                                </Tippy>
                            </Link>
                            <Link to={`/characters/${newmatch.ShortName}/passives/crystal${ver =="JP"?"?JP=true":""}`}>
                                <Tippy content="Crystal Passives">
                                    <li className={`${direct_loc == "crystal" ? "filteractive" : "filterinactive"}${(newmatch[`${ver}basic`] != true || newmatch[`${ver}crystal`] != true) ? "grey" : ""} buffbutton directcrystalpassives`} ></li>
                                </Tippy>
                            </Link>
                            <Link to={`/characters/${newmatch.ShortName}/passives/boards${ver =="JP"?"?JP=true":""}`}>
                                <Tippy content="Enhancement Boards">
                                    <li className={`${direct_loc == "boards" ? "filteractive" : "filterinactive"}${(newmatch[`${ver}basic`] != true || newmatch[`${ver}sum_fix`] != true) ? "grey" : ""} buffbutton bpassivesbutton`} ></li>
                                </Tippy>
                            </Link>
                            <Link to={`/characters/${newmatch.ShortName}/passives/force${ver =="JP"?"?JP=true":""}`}>
                                <Tippy content="Force Enhancement">
                                    <li className={`${direct_loc == "force" ? "filteractive" : "filterinactive"}${(newmatch[`${ver}basic`] != true || newmatch[`${ver}link`] != true) ? "grey" : ""} buffbutton linkbutton`} ></li>
                                </Tippy>
                            </Link>
                            <Link to={`/characters/${newmatch.ShortName}/passives/arts${ver =="JP"?"?JP=true":""}`}>
                                <Tippy content="Artifact Passives">
                                    <li className={`${direct_loc == "arts" ? "filteractive" : "filterinactive"}${(newmatch[`${ver}basic`] != true || newmatch[`${ver}art`] != true) ? "grey" : ""} buffbutton artpassivedirect`} ></li>
                                </Tippy>
                            </Link>
                        </ul>
                        : ""}

                </div>
            </div>
        </div>
    )
}
export default CharPageHeader