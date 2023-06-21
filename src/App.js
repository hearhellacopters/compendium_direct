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
import EventHandoff from './callpages/CallEventHandoff';
import CallBannerHandoff from './callpages/CallBannerHandoff.js';
import Characters from './callpages/CallCharacters';
import EnemyHandoff from './callpages/CallEnemyHandoff';
import CharactersUltimaPage from './callpages/CallUltimaWeapon.js';
import CharactersForceTimePage from './callpages/CallForceTime.js';
import CharactersWardrobePage from './callpages/CallWardrobe.js';
import Character from './callpages/CallCharacter';
import WeaponSkins from './callpages/CallWeaponSkins';
import CallSummonHandoff from './callpages/CallSummons';
import Credits from './Credits';
import Passives from './callpages/CallPassives';
import Gear from './callpages/CallGear';
import Abilities from './callpages/CallAbilties';
import Calendar from "./callpages/CallCalendar";
import Buffs from './callpages/CallBuffs';
import Spheres from './callpages/CallSpheres';
import Bestiary from './callpages/CallBestiary';
import Log from './Log';
import Stickers from './callpages/CallStickers.js';
import JukeBox from './callpages/CallJukeBox.js';
import EnemyBuffs from './callpages/CallEnemyBuffs.js';
import EnemyAbilities from './callpages/CallEnemyAbilities.js';
import JukeBoxMini from './callpages/CallJukeBoxMini';
import Forecast from './callpages/CallForecast.js'
import Notices from './callpages/CallNotices'
import DevSwitch from './redux/DevSwitch'
import Tippy from './components/TippyDefaults.js';
import { useDispatch, useSelector } from "react-redux";
import { getJPToggle } from './redux/ducks/jptoggle';
import { getQueryStringVal, useQueryParam } from './components/URLParams'
import { setFalse, setTrue } from './redux/ducks/jptoggle'

export default function App(){

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
              <Route path="/events/notices" exact element={<Notices />} />
              <Route path="/events/forecast" exact element={<Forecast />} />
              <Route path="/events/banners/:id" exact element={<CallBannerHandoff />} />
              <Route path="/events/:id" exact element={<EventHandoff />} />
              <Route path="/characters" exact element={<Characters />} />
              <Route path="/characters/ultimaweapon/:id" element={<CharactersUltimaPage />} />
              <Route path="/characters/ultimaweapon/" element={<CharactersUltimaPage />} />
              <Route path="/characters/forcetime/" element={<CharactersForceTimePage />} />
              <Route path="/characters/skins/wardrobe/" exact element={<CharactersWardrobePage />} />
              <Route path="/characters/skins/weapons/" exact element={<WeaponSkins />} />
              <Route path="/characters/wardrobe" element={<Navigate replace to="/characters/skins/wardrobe/" />} />
              <Route path="/characters/skins" element={<Navigate replace to="/characters/skins/wardrobe/" />} />
              <Route path="/characters/:id" exact element={<Character loc="character" />} />
              <Route path="/characters/:id/buffs/" exact element={<Character loc="buffs" />} />
              <Route path="/characters/:id/spheres" exact element={<Character loc="spheres" />} />
              <Route path="/characters/:id/abilities" exact element={<Character loc="abilities" />} />
              <Route path="/characters/:id/gear" exact element={<Character loc="gear" />} />
              <Route path="/characters/:id/passives/" exact element={<Character loc="passives" />} />
              <Route path="/characters/:id/passives/:type" exact element={<Character loc="passives" />} />
              <Route path="/characters/:id/reworks" exact element={<Character loc="reworks" />} />
              <Route path="/characters/:id/community" exact element={<Character loc="community" />} />
              <Route path="/characters/:id/events" exact element={<Character loc="events" />} />
              <Route path="/search/buffs" element={<Buffs />} />
              <Route path="/search/" element={<Navigate replace to={`/search/buffs${jptoggledata == false ? "" : "?JP=true"}`} />} />
              <Route path="/search/abilities" element={<Abilities />} />
              <Route path="/search/gear" element={<Gear />} />
              <Route path="/search/spheres" element={<Spheres />} />
              <Route path="/search/passives" element={<Passives />} />
              <Route path="/search/crystalpassives" element={<Navigate replace to="/bonuses/crystal" />} />

              <Route path="/search/stickers" element={<Stickers />} />
              <Route path="/search/music" exact element={<JukeBox />} />
              <Route path="/bonuses" exact element={<CallSummonHandoff />} />
              <Route path="/summons" exact element={<Navigate replace to="/bonuses" />}  />
              <Route path="/bonuses/crystal" element={<Navigate replace to="/bonuses/crystal/passives" />} />
              <Route path="/bonuses/:id/:type" exact element={<CallSummonHandoff />} />
              <Route path="/bonuses/:id" exact element={<CallSummonHandoff />} />
              <Route path="/bestiary/enemies" element={<Bestiary />} />
              <Route path="/bestiary" exact element={<Navigate replace to="/bestiary/enemies/" />} />
              <Route path="/bestiary/buffs" element={<EnemyBuffs />} />
              <Route path="/bestiary/abilities" element={<EnemyAbilities />} />
              <Route path="/bestiary/enemies/:id" element={<EnemyHandoff />} />
              <Route path="/bestiary/enemies/:id/:level" element={<EnemyHandoff />} />
              <Route path="/bestiary/enemies/:id/:level/:abilities" element={<EnemyHandoff />} />
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