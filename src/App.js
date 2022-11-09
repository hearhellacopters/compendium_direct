import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import { useStateIfMounted } from "use-state-if-mounted";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Direct_Guide from './characterpages/DirectGuide';
import './App.css';
import './Nav.css';
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
import CharactersHandoff from './callpages/CallCharacterHandoff.js';
import EnemyHandoffDirect from './callpages/CallEnemyHandoffDirect';
import CharactersPageBuffs from './callpages/CallCharBuffs';
import CharactersPageSpheres from './callpages/CallCharSpheres.js';
import CharactersPageAbilities from './callpages/CallCharAbilities';
import CharactersPageGear from './callpages/CallCharGear';
import CharactersPagePassives from './callpages/CallCharPassives';
import CharactersPageEvents from './callpages/CallCharEvents';
import CharactersPageCommunity from './callpages/CallCharCommunity.js';
import CharactersUltimaPage from './callpages/CallUltimaWeapon.js';
import CharactersFRPage from './callpages/CallFRTime.js';
import CharactersWardrobePage from './callpages/CallWardrobe.js';
import CharactersPageDirect from './callpages/CallCharDirect';
import CharactersPageReworks from './callpages/CallCharReworks';
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
import { getMaintenance } from './redux/ducks/maintenance';
import { getJPToggle } from './redux/ducks/jptoggle';
import {getQuery, getQueryStringVal,useQueryParam } from './processing/urlparams'
import { setFalse, setTrue } from './redux/ducks/jptoggle'

const App = () => {

  const dispatch = useDispatch();

  const check = useSelector((state) => 
    state.maintenance.maintenance
    );

    const jptoggledata = useSelector((state) => 
    state.toggle.toggle
    );

    useEffect(() => {
      let mounted = true
      if (mounted && check == undefined) {
      dispatch(getMaintenance())
      }
      if (mounted) {
        dispatch(getJPToggle());
        }
      return function cleanup() {
          mounted = false
      }
  }, [dispatch,check]);

const [jponly, setJPonly] = useState(jptoggledata);
const [JPsearch, setJPSearch] = useQueryParam("JP", "");

useEffect(() => {
  if(getQueryStringVal("JP") == "true" ){
    dispatch(setTrue())
    setJPSearch("true")
    setJPonly(true)
  } else {
    dispatch(setFalse())
    setJPSearch("")
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

  return(
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
              <div className="jpflagupdate"></div>
              :
              <div className='emoji'>🌎</div>}
              </div>
            {check && check.maintenance == true ?
            <Tippy content={<div><div>Site is in maintenance mode</div><div>You may experince loading issues</div></div>}>
              <Link to="/">
            <img alt={"logom"} className={"logom"}>
            </img>
            </Link>
            </Tippy>:
            <Link to="/">
            <img alt={"logo"} className={"logo"}>
            </img>
            </Link>
            }
            </div>
          <JukeBoxMini/>
      </header>
        <div className="wrapper">
          <Nav />
          <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/events" exact element={<Events/>} />
            <Route path="/events/banners" exact element={<Banners/>} />
            <Route path="/events/calendar" exact element={<Calendar/>} />
            <Route path="/events/panels" exact element={<Panels/>} />
            <Route path="/events/forecast" exact element={<Forecast/>}/>
            <Route path="/events/banners/:id" exact element={<BannerPassOff/>} />
            <Route path="/events/:id" exact element={<EventPassOff/>} />
            <Route path="/characters" exact element={<Characters/>} />
            <Route path="/characters/ultimaweapon/:id" element={<CharactersUltimaPage/>} />
            <Route path="/characters/ultimaweapon/" element={<CharactersUltimaPage/>} />
            <Route path="/characters/forcetime/" element={<CharactersFRPage/>} />
            <Route path="/characters/skins/wardrobe/" exact element={<CharactersWardrobePage/>} />
            <Route path="/characters/skins/weapons/" exact element={<WeaponSkins/>} />
            <Route path="/characters/wardrobe" element={<Navigate replace to ="/characters/skins/wardrobe/"/>}/>
            <Route path="/characters/skins" element={<Navigate replace to ="/characters/skins/wardrobe/"/>}/>
            <Route path="/characters/:id" exact element={<CharactersHandoff/>} />
            <Route path="/characters/:id/buffs/" exact element={<CharactersPageBuffs/>} />
            <Route path="/characters/:id/buffs/:type" exact element={<CharactersPageBuffs/>} />
            <Route path="/characters/:id/spheres" exact element={<CharactersPageSpheres/>} />
            <Route path="/characters/:id/direct" exact element={<CharactersPageDirect/>} />
            <Route path="/characters/:id/direct/:type" exact element={<CharactersPageDirect/>} />
            <Route path="/characters/:id/direct/passives/:type" exact element={<CharactersPageDirect/>} />
            <Route path="/characters/:id/abilities" exact element={<CharactersPageAbilities/>} />
            <Route path="/characters/:id/abilities/:type" exact element={<CharactersPageAbilities/>} />
            <Route path="/characters/:id/gear" exact element={<CharactersPageGear/>} />
            <Route path="/characters/:id/gear/:type" exact element={<CharactersPageGear/>} />
            <Route path="/characters/:id/passives" exact element={<CharactersPagePassives/>} />
            <Route path="/characters/:id/reworks" exact element={<CharactersPageReworks/>} />
            <Route path="/characters/:id/passives/:type" exact element={<CharactersPagePassives/>} />
            <Route path="/characters/:id/community" exact element={<CharactersPageCommunity/>} />
            <Route path="/characters/:id/events" exact element={<CharactersPageEvents/>} />
            <Route path="/characters/:id/events/:type" exact element={<CharactersPageEvents/>} />
            <Route path="/search/buffs" element={<BuffsDirect/>} />
            <Route path="/search/" element={<Navigate replace to ={`/search/buffs${jptoggledata == false ? "":"?JP=true"}`}/>} />
            <Route path="/search/abilities" element={<AbilitiesDirect/>} />
            <Route path="/search/gear" element={<GearDirect/>} />
            <Route path="/search/spheres" element={<SpheresDirect/>} />
            <Route path="/search/passives" element={<PassivesDirect/>} />

            <Route path="/search/stickers" element={<Stickers/>} />
            <Route path="/search/music" exact element={<JukeBox/>}/>
            <Route path="/summons" exact element={<CallSummonHandoff/>} />
            <Route path="/summons/:id" exact element={<CallSummonHandoff/>} />
            <Route path="/bestiary/enemies" element={<BestiaryDirect/>} />
            <Route path="/bestiary" exact element={<Navigate replace to ="/bestiary/enemies/"/>} /> 
            <Route path="/bestiary/buffs" element={<EnemyBuffsDirect/>} />
            <Route path="/bestiary/abilities" element={<EnemyAbilitiesDirect/>} />
            <Route path="/bestiary/enemies/:id" element={<EnemyHandoffDirect/>} />
            <Route path="/bestiary/enemies/:id/:level" element={<EnemyHandoffDirect/>} />
            <Route path="/bestiary/enemies/:id/:level/:abilities" element={<EnemyHandoffDirect/>} />
            <Route path="/404" element={<NotFoundPage/>} />
            <Route path="/credits" element={<Credits/>} />
            <Route path="/log" element={<Log/>}/>
            <Route path="/directguide" element={<Direct_Guide/>}/>
            <Route path="/guide" element={<Navigate replace to ="/"/>} />
            <Route path='*' element={<NotFoundPage/>} />
            <Route element={<NotFoundPage/>} />
          </Routes>
        </div>
        <Footer/>
      </Router>
    </HelmetProvider>
  );
  
}
export default App;