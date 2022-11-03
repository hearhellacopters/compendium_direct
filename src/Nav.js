import React, {useState} from 'react';
import './Nav.css'
import { NavLink } from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'; 
import DevSwitch from './redux/DevSwitch'

const Nav = () => {

  const [showLinks, setShowLinks] = useState(false);

  const menutoggle = () => {
    setShowLinks(false)
  }

  return (
    <nav className="access">
        <div className="menu">
          <div id="navtoggle" className={showLinks == false ? "" : "navactive"} onClick={() => setShowLinks(!showLinks)} ><GiHamburgerMenu  className="mobilelines"></GiHamburgerMenu><span className="menuspan">MENU</span></div>
          <ul id={showLinks ? "shown" : "hidden"} className="prime_nav" >
            <NavLink to='/events/' onClick={menutoggle} className="EventsPage" activeclassname="active">
             <li>Events</li>
            </NavLink>
            <NavLink to='/characters/' onClick={menutoggle} className="Characters" activeclassname="active">
             <li>Characters</li>
            </NavLink>
            <NavLink to='/search/' onClick={menutoggle} className="Buffs" activeclassname="active">
             <li>Search</li>
            </NavLink>
            <NavLink to='/summons/' onClick={menutoggle} className="Summons" activeclassname="active">
             <li>Summons</li>
            </NavLink>
            <NavLink to='/bestiary/' onClick={menutoggle} className="Bestiary" activeclassname="active">
             <li>Bestiary</li>
            </NavLink>    
          </ul>
        </div>
    </nav>
  );
}

export default Nav;
