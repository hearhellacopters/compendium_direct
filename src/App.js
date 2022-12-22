import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './App.css';
import './Nav.css';
import './Gear.css'
import Nav from './Nav';
import NotFoundPage from './404.js'
import Footer from './Footer';
import Home from './callpages/CallHome';
import Events from './callpages/CallEvents.js';
import Banners from './callpages/CallBanners.js';
import Panels from './callpages/CallPanels.js';
import EventPassOff from './callpages/CallEventHandoff';
import BannerPassOff from './callpages/CallBannersPassoff.js';
import Characters from './callpages/CallCharacters';
import EnemyHandoffDirect from './callpages/CallEnemyHandoffDirect';
import CharactersUltimaPage from './callpages/CallUltimaWeapon.js';
import CharactersFRPage from './callpages/CallFRTime.js';
import CharactersWardrobePage from './callpages/CallWardrobe.js';
import CharactersPageDirect from './callpages/CallCharDirect';
import WeaponSkins from './callpages/CallWeaponSkins';
import CallSummonHandoff from './callpages/CallSummons';
import Credits from './Credits';
import PassivesDirect from './callpages/CallDirectPassives';
import GearDirect from './callpages/CallDirectGear';
import AbilitiesDirect from './callpages/CallDirectAbilties';
import Calendar from "./callpages/CallCalendar";
import BuffsDirect from './callpages/CallDirectBuffs';
import SpheresDirect from './callpages/CallDirectSpheres';
import BestiaryDirect from './callpages/CallBestiaryDirect';
import Log from './Log';
import Stickers from './callpages/CallStickers.js';
import JukeBox from './callpages/CallJukeBox.js';
import EnemyBuffsDirect from './callpages/CallEnemyBuffsDirect.js';
import EnemyAbilitiesDirect from './callpages/CallEnemyAbilitiesDirect.js';
import JukeBoxMini from './callpages/CallJukeBoxMini';
import Forecast from './callpages/CallForecast.js'
import DevSwitch from './redux/DevSwitch'
import Tippy from './formatting/TippyDefaults.js';
import { useDispatch, useSelector } from "react-redux";
import { getJPToggle } from './redux/ducks/jptoggle';
import { getQuery, getQueryStringVal, useQueryParam } from './processing/urlparams'
import { setFalse, setTrue } from './redux/ducks/jptoggle'

const App = () => {

  const dispatch = useDispatch();

  const jptoggledata = useSelector((state) =>
    state.toggle.toggle
  );

  useEffect(() => {
    let mounted = true
    if (mounted && jptoggledata == undefined) {
      dispatch(getJPToggle());
    }
    return function cleanup() {
      mounted = false
    }
  }, [dispatch, jptoggledata]);

  const [jponly, setJPonly] = useState(jptoggledata);
  const [JPsearch, setJPSearch] = useQueryParam("JP", "");

  useEffect(() => {
    const prev = window.localStorage.getItem("ver")
    if (getQueryStringVal("JP") == "true" || prev == "JP") {
      dispatch(setTrue())
      setJPSearch("true")
      setJPonly(true)
    } else {
      dispatch(setFalse())
      setJPSearch("")
      setJPonly(false)
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
    setJPonly((prevValue) => !prevValue);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Dissidia Compendium</title>
      </Helmet>
      <Router >
        <header id="header-bg">
          <div className="headerimagelink" >
            {DevSwitch == true ?
              <div className="devfloat">
                DEV
              </div>
              : ""}
            <div className="minifloat clicky noselect" onClick={jponlybutton}>
              {jponly == true ?
                <Tippy content="Switch to GL">
                  <div className="jpflagupdate"></div>
                </Tippy>
                :
                <Tippy content="Switch to JP">
                  <div className='emoji'>🌎</div>
                </Tippy>
              }
            </div>
            <Link to="/">
              <img alt={"logo"} className={"logo"}>
              </img>
            </Link>
          </div>
          <JukeBoxMini />
        </header>
        <div className="wrapper">
          <ErrorBoundary>
            <Nav />
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/events" exact element={<Events />} />
              <Route path="/events/banners" exact element={<Banners />} />
              <Route path="/events/calendar" exact element={<Calendar />} />
              <Route path="/events/panels" exact element={<Panels />} />
              <Route path="/events/forecast" exact element={<Forecast />} />
              <Route path="/events/banners/:id" exact element={<BannerPassOff />} />
              <Route path="/events/:id" exact element={<EventPassOff />} />
              <Route path="/characters" exact element={<Characters />} />
              <Route path="/characters/ultimaweapon/:id" element={<CharactersUltimaPage />} />
              <Route path="/characters/ultimaweapon/" element={<CharactersUltimaPage />} />
              <Route path="/characters/forcetime/" element={<CharactersFRPage />} />
              <Route path="/characters/skins/wardrobe/" exact element={<CharactersWardrobePage />} />
              <Route path="/characters/skins/weapons/" exact element={<WeaponSkins />} />
              <Route path="/characters/wardrobe" element={<Navigate replace to="/characters/skins/wardrobe/" />} />
              <Route path="/characters/skins" element={<Navigate replace to="/characters/skins/wardrobe/" />} />
              <Route path="/characters/:id" exact element={<CharactersPageDirect loc="character" />} />
              <Route path="/characters/:id/buffs/" exact element={<CharactersPageDirect loc="buffs" />} />
              <Route path="/characters/:id/spheres" exact element={<CharactersPageDirect loc="spheres" />} />
              <Route path="/characters/:id/abilities" exact element={<CharactersPageDirect loc="abilities" />} />
              <Route path="/characters/:id/gear" exact element={<CharactersPageDirect loc="gear" />} />
              <Route path="/characters/:id/passives/" exact element={<CharactersPageDirect loc="passives" />} />
              <Route path="/characters/:id/passives/:type" exact element={<CharactersPageDirect loc="passives" />} />
              <Route path="/characters/:id/reworks" exact element={<CharactersPageDirect loc="reworks" />} />
              <Route path="/characters/:id/community" exact element={<CharactersPageDirect loc="community" />} />
              <Route path="/characters/:id/events" exact element={<CharactersPageDirect loc="events" />} />
              <Route path="/search/buffs" element={<BuffsDirect />} />
              <Route path="/search/" element={<Navigate replace to={`/search/buffs${jptoggledata == false ? "" : "?JP=true"}`} />} />
              <Route path="/search/abilities" element={<AbilitiesDirect />} />
              <Route path="/search/gear" element={<GearDirect />} />
              <Route path="/search/spheres" element={<SpheresDirect />} />
              <Route path="/search/passives" element={<PassivesDirect />} />

              <Route path="/search/stickers" element={<Stickers />} />
              <Route path="/search/music" exact element={<JukeBox />} />
              <Route path="/summons" exact element={<CallSummonHandoff />} />
              <Route path="/summons/:id" exact element={<CallSummonHandoff />} />
              <Route path="/bestiary/enemies" element={<BestiaryDirect />} />
              <Route path="/bestiary" exact element={<Navigate replace to="/bestiary/enemies/" />} />
              <Route path="/bestiary/buffs" element={<EnemyBuffsDirect />} />
              <Route path="/bestiary/abilities" element={<EnemyAbilitiesDirect />} />
              <Route path="/bestiary/enemies/:id" element={<EnemyHandoffDirect />} />
              <Route path="/bestiary/enemies/:id/:level" element={<EnemyHandoffDirect />} />
              <Route path="/bestiary/enemies/:id/:level/:abilities" element={<EnemyHandoffDirect />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="/credits" element={<Credits />} />
              <Route path="/log" element={<Log />} />
              <Route path="/guide" element={<Navigate replace to="/" />} />
              <Route path='*' element={<NotFoundPage />} />
              <Route element={<NotFoundPage />} />
            </Routes>
          </ErrorBoundary>
        </div>
        <Footer />
      </Router>
    </HelmetProvider>
  );

}
export default App;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <div className='content'><h1>Something went wrong.</h1></div>;
    }
    return this.props.children;
  }
}