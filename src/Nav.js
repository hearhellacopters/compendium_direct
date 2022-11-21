import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {useLocation, Link, Navigate } from 'react-router-dom';
import './Nav.css'
import {GiHamburgerMenu} from 'react-icons/gi'; 
import DevSwitch from './redux/DevSwitch'
import { getQuery, getQueryStringVal, useQueryParam } from './processing/urlparams'
import { setFalse, setTrue } from './redux/ducks/jptoggle'

const Nav = () => {

  const location = useLocation()

  const loc = location.pathname.substring(1).split('/')[0];

  const [showLinks, setShowLinks] = useState(false);

  const menutoggle = () => {
    setShowLinks(false)
  }

  const dispatch = useDispatch();

  const jptoggledata = useSelector((state) => 
      state.toggle.toggle
      );

  const [jponly, setJPonly] = useState(jptoggledata);
  const [JPsearch, setJPSearch] = useQueryParam("JP", "");

  return (
    <nav className="access">
        <div className="menu">
          <div id="navtoggle" className={showLinks == false ? "" : "navactive"} onClick={() => setShowLinks(!showLinks)} ><GiHamburgerMenu  className="mobilelines"></GiHamburgerMenu><span className="menuspan">MENU</span></div>
          <ul id={showLinks ? "shown" : "hidden"} className="prime_nav" >
            <Link to={`/events${jptoggledata == false ? "":"?JP=true"}`} onClick={menutoggle} className={`${loc == "events" ? "active" : ""}`}>
             <li>Events</li>
            </Link>
            <Link to={`/characters${jptoggledata == false ? "":"?JP=true"}`} onClick={menutoggle} className={`${loc == "characters" ? "active" : ""}`}>
             <li>Characters</li>
            </Link>
            <Link to={`/search/buffs${jptoggledata == false ? "":"?JP=true"}`} onClick={menutoggle} className={`${loc == "search" ? "active" : ""}`}>
             <li>Search</li>
            </Link>
            <Link to={`/summons${jptoggledata == false ? "":"?JP=true"}`} onClick={menutoggle} className={`${loc == "summons" ? "active" : ""}`}>
             <li>Summons</li>
            </Link>
            <Link to={`/bestiary/enemies${jptoggledata == false ? "":"?JP=true"}`} onClick={menutoggle} className={`${loc == "bestiary" ? "active" : ""}`}>
             <li>Bestiary</li>
            </Link>    
          </ul>
        </div>
    </nav>
  );
}

export default Nav;
