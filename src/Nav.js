import React, { useState, useRef} from 'react';
import { useSelector } from "react-redux";
import { useLocation, Link } from 'react-router-dom';
import './Nav.css'
import { GiHamburgerMenu } from 'react-icons/gi';
import UseOnClickOutside from './components/UseOnClickOutside';

export default function Nav(){

  const location = useLocation()

  const loc = location.pathname.substring(1).split('/')[0];

  const [showLinks, setShowLinks] = useState(false);

  const menutoggle = () => {
    setShowLinks(false)
  }

  const jptoggledata = useSelector((state) =>
    state.toggle.toggle
  );

  const btnRef = useRef();
  UseOnClickOutside(btnRef, () => setShowLinks(false));

  return (
    <nav className="access">
      <div className="menu">
        <div ref={btnRef} id="navtoggle" className={showLinks == false ? "" : "navactive"} onClick={() => setShowLinks(!showLinks)} ><GiHamburgerMenu className="mobilelines"></GiHamburgerMenu><span className="menuspan">MENU</span></div>
        <ul id={showLinks ? "shown" : "hidden"} className="prime_nav" >
          <Link to={`/events${jptoggledata == false ? "" : "?JP=true"}`} onClick={menutoggle} className={`${loc == "events" ? "active" : ""}`}>
            <li>Events</li>
          </Link>
          <Link to={`/characters${jptoggledata == false ? "" : "?JP=true"}`} onClick={menutoggle} className={`${loc == "characters" ? "active" : ""}`}>
            <li>Characters</li>
          </Link>
          <Link to={`/search/buffs${jptoggledata == false ? "" : "?JP=true"}`} onClick={menutoggle} className={`${loc == "search" ? "active" : ""}`}>
            <li>Search</li>
          </Link>
          <Link to={`/bonuses${jptoggledata == false ? "" : "?JP=true"}`} onClick={menutoggle} className={`${loc == "bonuses" ? "active" : ""}`}>
            <li>Party Bonuses</li>
          </Link>
          <Link to={`/bestiary/enemies${jptoggledata == false ? "" : "?JP=true"}`} onClick={menutoggle} className={`${loc == "bestiary" ? "active" : ""}`}>
            <li>Bestiary</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}
