import React, {useState, useEffect} from 'react';
import { useDispatch } from "react-redux";
import PanelsFormatting from './formatting/PanelsFormatting'
import { setFalse, setTrue } from './redux/ducks/jptoggle'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Helmet} from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Random from './processing/Random.js'
import Tippy from './formatting/TippyDefaults.js';
import {getQuery, getQueryStringVal,useQueryParam } from './processing/urlparams'

const Calendar = ({ProcessedPanels, jptoggledata}) => {

  const [random, setrandom] = useState(0)

  useEffect(() => {
      setrandom(Random(7))
  }, [])

  const dispatch = useDispatch();

  const curtime = new Date().getTime();

  const [jponly, setJPonly] = useState(jptoggledata);
  const [JPsearch, setJPSearch] = useQueryParam("JP", "");

  useEffect(() => {
    if(jptoggledata == true){
      setJPSearch("true")
    } else {
      setJPSearch("")
    }
  },[jptoggledata,setJPSearch])

  useEffect(() => {
    if(getQueryStringVal("JP") == "true" ){
      dispatch(setTrue())
      setJPonly(true)
    } else {
      dispatch(setFalse())
      setJPonly(false)
    }
  },[setJPSearch,dispatch])

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

  const JPdataPreSort = ProcessedPanels.filter(function (el) { 
    return el["jpflag"] == true && new Date(el["outdate"]) >= curtime ; 
  }); 

  const JPdata = JPdataPreSort.sort((a, b) => new Date(a.outdate) - new Date(b.outdate))

  const GLdataPreSort = ProcessedPanels.filter(function (el) { 
    return el["jpflag"] !== true && new Date(el["outdate"]) >= curtime ;  
  }); 

  const GLdata = GLdataPreSort.sort((a, b) => new Date(a.outdate) - new Date(b.outdate))

  return (
    <div>
      <Helmet>
          <title>Panels - Dissidia Compendium</title>
          <meta property="og:site_name" content="Dissidia Compendium"/>
          <meta name="description" content="Current in game Panels!"/>\
          <meta name="twitter:title" content="Panels - Dissidia Compendium"/>
          <meta name="twitter:description" content="Current in game Panels!"/>\
          <meta property="og:title" content="Panels - Dissidia Compendium"/>
          <meta property="og:description" content="Current in game Panels!"/>\
      </Helmet>
      <div className="content">
        <h1>{jponly== false? "GL " :"JP "}Panels</h1>
        <div className="noselect">
        <span className={`${jptoggledata ? "jponlybackground" : "GLonlybackground"}`}>
              <Tippy content={`${jptoggledata ? "Switch to GL" : "Switch to JP"}`} className="tooltip" >
            <span onClick={jponlybutton} className={`${jptoggledata ? "jpflage jpsmallinactive smalleventbutton" : "glflage smalleventbutton"}`}/>
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
              <Link to={"../events/forecast"}>
              <li className={""} >Forecast</li>
              </Link>
              <Link to={"../events/panels"}>
              <li className={"active"} ><span className="gemselected"/>Panels</li>
              </Link>
              <Link to={"/events/calendar"}>
              <li className={""} >Calendar</li>
              </Link>
            </ul>
          <div className="bannerholder">
            {jponly == false ?
            GLdata.length == 0 ?
                <div className="nolinksholder">
                <LazyLoadImage effect="opacity" key={`ohno${random}`} className={`ohno${random}`} alt="oh no" src={`https://dissidiacompendium.com/images/static/icons/404/${random}.png`}/> 
                <div className="nopanelstext"><div className="sitsatbottom"> No Panels!</div></div>
                </div>
            :
            GLdata.map(GLdata =>(
            <PanelsFormatting key={GLdata.panelid} match={GLdata}/>
            ))
            :
            JPdata.length == 0 ?
                <div className="nolinksholder">
                <LazyLoadImage effect="opacity" key={`ohno${random}`} className={`ohno${random}`} alt="oh no" src={`https://dissidiacompendium.com/images/static/icons/404/${random}.png`}/> 
                <div className="nopanelstext"><div className="sitsatbottom"> No Panels!</div></div>
                </div>
            :
            JPdata.map(JPdata =>(
            <PanelsFormatting key={JPdata.panelid} match={JPdata}/>
            ))
            }
          </div>
      </div>
    </div>
  );
}



export default Calendar;
