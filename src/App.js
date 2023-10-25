import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useDispatch, useSelector } from "react-redux";
import { getJPToggle } from './redux/ducks/jptoggle.js';
import { getQueryStringVal, useQueryParam } from './components/URLParams.js'
import { setFalse, setTrue } from './redux/ducks/jptoggle'
import Loading from './components/Loading.js'
import Nav from'./Nav.js';
import DevSwitch from './redux/DevSwitch.js';
import Tippy from './components/TippyDefaults.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import './Abilities.css';
import './App.css';
import './Bestiary.css';
import './Buffs.css';
import './Calandar.css';
import './Characters.css';
import './Events.css';
import './Footer.css';
import './Forecast.css';
import './Gear.css';
import './Home.css';
import './JukeBoxStyle.css';
import './Missions.css';
import './Nav.css';
import './Passives.css';
import './Spheres.css';
import './Summons.css';
import './Talk.css';
import './components/Characters/CharacterPage.css';
import './components/Enemy/EnemyFormatting.css';
import './components/Enemy/LevelsFormatting.css';
import './components/Direct.css';
import './components/SilderStyle.css';
import './components/tickDown.css';
import './components/ticker.css';

const NotFoundPage = React.lazy(() => import('./404.js'));
const Footer = React.lazy(() => import('./Footer'));
const Home = React.lazy(() => import('./callpages/CallHome.js'));
const Events = React.lazy(() => import('./callpages/CallEvents.js'));
const Banners = React.lazy(() => import('./callpages/CallBanners.js'));
const Missions = React.lazy(() => import('./callpages/CallMissions.js'));
const EventHandoff = React.lazy(() => import('./callpages/CallEventHandoff.js'));
const StoryHandoff = React.lazy(() => import('./callpages/CallStoryHandoff.js'));
const CallBannerHandoff = React.lazy(() => import('./callpages/CallBannerHandoff.js'));
const Characters = React.lazy(() => import('./callpages/CallCharacters.js'));
const EnemyHandoff = React.lazy(() => import('./callpages/CallEnemyHandoff.js'));
const CharactersUltimaPage = React.lazy(() => import('./callpages/CallUltimaWeapon.js'));
const CharactersForceTimePage = React.lazy(() => import('./callpages/CallForceTime.js'));
const CharactersWardrobePage = React.lazy(() => import('./callpages/CallWardrobe.js'));
const Character = React.lazy(() => import('./callpages/CallCharacter.js'));
const WeaponSkins = React.lazy(() => import('./callpages/CallWeaponSkins.js'));
const CallSummonHandoff = React.lazy(() => import('./callpages/CallSummons.js'));
const Credits = React.lazy(() => import('./Credits.js'));
const Passives = React.lazy(() => import('./callpages/CallPassives.js'));
const Gear = React.lazy(() => import('./callpages/CallGear.js'));
const Abilities = React.lazy(() => import('./callpages/CallAbilties.js'));
const Calendar = React.lazy(() => import("./callpages/CallCalendar.js"));
const Buffs = React.lazy(() => import('./callpages/CallBuffs.js'));
const Spheres = React.lazy(() => import('./callpages/CallSpheres.js'));
const Bestiary = React.lazy(() => import('./callpages/CallBestiary.js'));
const Log = React.lazy(() => import('./Log.js'));
const Stickers = React.lazy(() => import('./callpages/CallStickers.js'));
const JukeBox = React.lazy(() => import('./callpages/CallJukeBox.js'));
const EnemyBuffs = React.lazy(() => import('./callpages/CallEnemyBuffs.js'));
const EnemyAbilities = React.lazy(() => import('./callpages/CallEnemyAbilities.js'));
const JukeBoxMini = React.lazy(() => import('./callpages/CallJukeBoxMini.js'));
const Forecast = React.lazy(() => import('./callpages/CallForecast.js'));
const Notices = React.lazy(() => import('./callpages/CallNotices.js'));
const Story = React.lazy(() => import('./callpages/CallStory.js'));

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
            <Suspense fallback={<Loading/>}>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/events" exact element={<Events />} />
              <Route path="/events/banners" exact element={<Banners />} />
              <Route path="/events/missions" exact element={<Missions />} />
              <Route path="/events/calendar" exact element={<Calendar />} />
              <Route path="/events/panels" exact element={<Navigate replace to={`/events/missions?panels=true${jptoggledata == false ? "" : "&JP=true"}`} />} />
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
              <Route path="/characters/wardrobe" element={<Navigate replace to="/characters/skins/wardrobe" />} />
              <Route path="/characters/skins" element={<Navigate replace to="/characters/skins/wardrobe" />} />
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
              <Route path="/story" element={<Story />} />
              <Route path="/story/:id" exact element={<StoryHandoff />} />
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
            </Suspense>
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