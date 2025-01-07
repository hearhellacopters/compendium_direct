import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter, HashRouter, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useDispatch, useSelector } from "react-redux";
import { getJPToggle } from './redux/ducks/jptoggle.js';
import { getQueryStringVal, useQueryParam } from './components/URLParams.js'
import { setFalse, setTrue } from './redux/ducks/jptoggle.js'
import Loading from './components/Loading.js'
import Nav from './Nav.js';
import NavDev from './NavDev.js';
import HomeDev from './HomeDev.js';
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
import './CharacterPage.css';
import './EnemyFormatting.css';
import './LevelsFormatting.css';
import './Direct.css';
import './components/SilderStyle.css';
import './components/tickDown.css';
import './components/ticker.css';

//tools
const Diffing = React.lazy(() => import('./Diffing'));
const Trans = React.lazy(() => import('./Trans'));

const NotFoundPage = React.lazy(() => import('./404.js'));
const Footer = React.lazy(() => import('./Footer.js'));
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
const LogDev = React.lazy(() => import('./LogDev.js'));
const Stickers = React.lazy(() => import('./callpages/CallStickers.js'));
const JukeBox = React.lazy(() => import('./callpages/CallJukeBox.js'));
const EnemyBuffs = React.lazy(() => import('./callpages/CallEnemyBuffs.js'));
const EnemyAbilities = React.lazy(() => import('./callpages/CallEnemyAbilities.js'));
const JukeBoxMini = React.lazy(() => import('./callpages/CallJukeBoxMini.js'));
const Forecast = React.lazy(() => import('./callpages/CallForecast.js'));
const Notices = React.lazy(() => import('./callpages/CallNotices.js'));
const Story = React.lazy(() => import('./callpages/CallStory.js'));
const { getQuery } = React.lazy(() => import('./components/URLParams.js'));


//ailment_level_condition
const Ailment_level_condition_jp_compare = React.lazy(() => import('./callpages/ailments/Call_ailment_level_condition_jp_compare'));
const Ailment_level_condition_jp_new = React.lazy(() => import('./callpages/ailments/Call_ailment_level_condition_jp_new'));
const Ailment_level_condition_gl_compare = React.lazy(() => import('./callpages/ailments/Call_ailment_level_condition_gl_compare'));
const Ailment_level_condition_gl_new = React.lazy(() => import('./callpages/ailments/Call_ailment_level_condition_gl_new'));
//ailment data
const Ailment_data_jp_compare = React.lazy(() => import('./callpages/ailments/Call_ailment_data_jp_compare'));
const Ailment_data_jp_new = React.lazy(() => import('./callpages/ailments/Call_ailment_data_jp_new'));
const Ailment_data_gl_compare = React.lazy(() => import('./callpages/ailments/Call_ailment_data_gl_compare'));
const Ailment_data_gl_new = React.lazy(() => import('./callpages/ailments/Call_ailment_data_gl_new'));
//ailment group
const Ailment_group_jp_compare = React.lazy(() => import('./callpages/ailments/Call_ailment_group_jp_compare'));
const Ailment_group_jp_new = React.lazy(() => import('./callpages/ailments/Call_ailment_group_jp_new'));
const Ailment_group_gl_compare = React.lazy(() => import('./callpages/ailments/Call_ailment_group_gl_compare'));
const Ailment_group_gl_new = React.lazy(() => import('./callpages/ailments/Call_ailment_group_gl_new'));
//command group
const Command_group_jp_compare = React.lazy(() => import('./callpages/command_ability/Call_command_group_jp_compare'));
const Command_group_jp_new = React.lazy(() => import('./callpages/command_ability/Call_command_group_jp_new'));
const Command_group_gl_compare = React.lazy(() => import('./callpages/command_ability/Call_command_group_gl_compare'));
const Command_group_gl_new = React.lazy(() => import('./callpages/command_ability/Call_command_group_gl_new'));
//ailment rank
const Ailment_rank_jp_compare = React.lazy(() => import('./callpages/ailments/Call_ailment_rank_jp_compare'));
const Ailment_rank_jp_new = React.lazy(() => import('./callpages/ailments/Call_ailment_rank_jp_new'));
const Ailment_rank_gl_compare = React.lazy(() => import('./callpages/ailments/Call_ailment_rank_gl_compare'));
const Ailment_rank_gl_new = React.lazy(() => import('./callpages/ailments/Call_ailment_rank_gl_new'));
//ailment cast
const Ailment_cast_jp_compare = React.lazy(() => import('./callpages/ailments/Call_ailment_cast_jp_compare'));
const Ailment_cast_jp_new = React.lazy(() => import('./callpages/ailments/Call_ailment_cast_jp_new'));
const Ailment_cast_gl_compare = React.lazy(() => import('./callpages/ailments/Call_ailment_cast_gl_compare'));
const Ailment_cast_gl_new = React.lazy(() => import('./callpages/ailments/Call_ailment_cast_gl_new'));
//ailment field
const Ailment_field_jp_compare = React.lazy(() => import('./callpages/ailments/Call_ailment_field_jp_compare'));
const Ailment_field_jp_new = React.lazy(() => import('./callpages/ailments/Call_ailment_field_jp_new'));
const Ailment_field_gl_compare = React.lazy(() => import('./callpages/ailments/Call_ailment_field_gl_compare'));
const Ailment_field_gl_new = React.lazy(() => import('./callpages/ailments/Call_ailment_field_gl_new'));
//ailment field effects
const Ailment_field_effects_jp_compare = React.lazy(() => import('./callpages/ailments/Call_ailment_field_effects_jp_compare'));
const Ailment_field_effects_jp_new = React.lazy(() => import('./callpages/ailments/Call_ailment_field_effects_jp_new'));
const Ailment_field_effects_gl_compare = React.lazy(() => import('./callpages/ailments/Call_ailment_field_effects_gl_compare'));
const Ailment_field_effects_gl_new = React.lazy(() => import('./callpages/ailments/Call_ailment_field_effects_gl_new'));
//ailment default
const Ailment_default_jp_compare = React.lazy(() => import('./callpages/ailments/Call_ailment_default_jp_compare'));
const Ailment_default_jp_new = React.lazy(() => import('./callpages/ailments/Call_ailment_default_jp_new'));
const Ailment_default_gl_compare = React.lazy(() => import('./callpages/ailments/Call_ailment_default_gl_compare'));
const Ailment_default_gl_new = React.lazy(() => import('./callpages/ailments/Call_ailment_default_gl_new'));
//ailment default
const Cond_data_jp_compare = React.lazy(() => import('./callpages/ailments/Call_cond_data_jp_compare'));
const Cond_data_jp_new = React.lazy(() => import('./callpages/ailments/Call_cond_data_jp_new'));
const Cond_data_gl_compare = React.lazy(() => import('./callpages/ailments/Call_cond_data_gl_compare'));
const Cond_data_gl_new = React.lazy(() => import('./callpages/ailments/Call_cond_data_gl_new'));
//ailment_combination
const Ailment_combination_jp_compare = React.lazy(() => import('./callpages/ailments/Call_ailment_combination_jp_compare'));
const Ailment_combination_jp_new = React.lazy(() => import('./callpages/ailments/Call_ailment_combination_jp_new'));
const Ailment_combination_gl_compare = React.lazy(() => import('./callpages/ailments/Call_ailment_combination_gl_compare'));
const Ailment_combination_gl_new = React.lazy(() => import('./callpages/ailments/Call_ailment_combination_gl_new'));
//ailment_modify
const Ailment_modify_jp_compare = React.lazy(() => import('./callpages/ailments/Call_ailment_modify_jp_compare'));
const Ailment_modify_jp_new = React.lazy(() => import('./callpages/ailments/Call_ailment_modify_jp_new'));
const Ailment_modify_gl_compare = React.lazy(() => import('./callpages/ailments/Call_ailment_modify_gl_compare'));
const Ailment_modify_gl_new = React.lazy(() => import('./callpages/ailments/Call_ailment_modify_gl_new'));
//passive_ability
const Passive_ability_jp_compare = React.lazy(() => import('./callpages/passives/Call_passive_ability_jp_compare'));
const Passive_ability_jp_new = React.lazy(() => import('./callpages/passives/Call_passive_ability_jp_new'));
const Passive_ability_gl_compare = React.lazy(() => import('./callpages/passives/Call_passive_ability_gl_compare'));
const Passive_ability_gl_new = React.lazy(() => import('./callpages/passives/Call_passive_ability_gl_new'));
//passive_ability
const Equipment_passive_ability_jp_compare = React.lazy(() => import('./callpages/passives/Call_equipment_passive_ability_jp_compare'));
const Equipment_passive_ability_jp_new = React.lazy(() => import('./callpages/passives/Call_equipment_passive_ability_jp_new'));
const Equipment_passive_ability_gl_compare = React.lazy(() => import('./callpages/passives/Call_equipment_passive_ability_gl_compare'));
const Equipment_passive_ability_gl_new = React.lazy(() => import('./callpages/passives/Call_equipment_passive_ability_gl_new'));
//art_ability
const Art_passive_jp_compare = React.lazy(() => import('./callpages/passives/Call_art_passive_jp_compare'));
const Art_passive_jp_new = React.lazy(() => import('./callpages/passives/Call_art_passive_jp_new'));
const Art_passive_gl_compare = React.lazy(() => import('./callpages/passives/Call_art_passive_gl_compare'));
const Art_passive_gl_new = React.lazy(() => import('./callpages/passives/Call_art_passive_gl_new'));
//link_eff_data
const Link_eff_data_jp_compare = React.lazy(() => import('./callpages/passives/Call_link_eff_data_jp_compare'));
const Link_eff_data_jp_new = React.lazy(() => import('./callpages/passives/Call_link_eff_data_jp_new'));
const Link_eff_data_gl_compare = React.lazy(() => import('./callpages/passives/Call_link_eff_data_gl_compare'));
const Link_eff_data_gl_new = React.lazy(() => import('./callpages/passives/Call_link_eff_data_gl_new'));
//command_ability
const Command_ability_jp_compare = React.lazy(() => import('./callpages/command_ability/Call_command_ability_jp_compare'));
const Command_ability_jp_new = React.lazy(() => import('./callpages/command_ability/Call_command_ability_jp_new'));
const Command_ability_gl_compare = React.lazy(() => import('./callpages/command_ability/Call_command_ability_gl_compare'));
const Command_ability_gl_new = React.lazy(() => import('./callpages/command_ability/Call_command_ability_gl_new'));
//character_option
const Character_option_jp_compare = React.lazy(() => import('./callpages/command_ability/Call_character_option_jp_compare'));
const Character_option_jp_new = React.lazy(() => import('./callpages/command_ability/Call_character_option_jp_new'));
const Character_option_gl_compare = React.lazy(() => import('./callpages/command_ability/Call_character_option_gl_compare'));
const Character_option_gl_new = React.lazy(() => import('./callpages/command_ability/Call_character_option_gl_new'));
//enemy_option
const Enemy_option_jp_compare = React.lazy(() => import('./callpages/command_ability/Call_enemy_option_jp_compare'));
const Enemy_option_jp_new = React.lazy(() => import('./callpages/command_ability/Call_enemy_option_jp_new'));
const Enemy_option_gl_compare = React.lazy(() => import('./callpages/command_ability/Call_enemy_option_gl_compare'));
const Enemy_option_gl_new = React.lazy(() => import('./callpages/command_ability/Call_enemy_option_gl_new'));
//character_ability
const Character_ability_jp_compare = React.lazy(() => import('./callpages/command_ability/Call_character_ability_jp_compare'));
const Character_ability_jp_new = React.lazy(() => import('./callpages/command_ability/Call_character_ability_jp_new'));
const Character_ability_gl_compare = React.lazy(() => import('./callpages/command_ability/Call_character_ability_gl_compare'));
const Character_ability_gl_new = React.lazy(() => import('./callpages/command_ability/Call_character_ability_gl_new'));
//enemy_ability
const Enemy_ability_jp_compare = React.lazy(() => import('./callpages/command_ability/Call_enemy_ability_jp_compare'));
const Enemy_ability_jp_new = React.lazy(() => import('./callpages/command_ability/Call_enemy_ability_jp_new'));
const Enemy_ability_gl_compare = React.lazy(() => import('./callpages/command_ability/Call_enemy_ability_gl_compare'));
const Enemy_ability_gl_new = React.lazy(() => import('./callpages/command_ability/Call_enemy_ability_gl_new'));
//summon_ability
const Summon_ability_jp_new = React.lazy(() => import('./callpages/summon_ability/Call_summon_ability_jp_new'));
const Summon_ability_gl_new = React.lazy(() => import('./callpages/summon_ability/Call_summon_ability_gl_new'));
//hit_data
const Hit_data_jp_compare = React.lazy(() => import('./callpages/hit_data/Call_hit_data_jp_compare'));
const Hit_data_jp_new = React.lazy(() => import('./callpages/hit_data/Call_hit_data_jp_new'));
const Hit_data_gl_compare = React.lazy(() => import('./callpages/hit_data/Call_hit_data_gl_compare'));
const Hit_data_gl_new = React.lazy(() => import('./callpages/hit_data/Call_hit_data_gl_new'));
//filelist
const File_list_jp_compare = React.lazy(() => import('./callpages/file_list/Call_file_list_jp_compare'));
const File_list_jp_new = React.lazy(() => import('./callpages/file_list/Call_file_list_jp_new'));
const File_list_gl_compare = React.lazy(() => import('./callpages/file_list/Call_file_list_gl_compare'));
const File_list_gl_new = React.lazy(() => import('./callpages/file_list/Call_file_list_gl_new'));

const JPByCharacterCall = React.lazy(() => import('./callpages/bycharacter/JPCharacters'));
const GLByCharacterCall = React.lazy(() => import('./callpages/bycharacter/GLCharacters'));

//gamelist

const GLGameListAbility = React.lazy(() => import('./callpages/gamelist/GLGameListAbility'));
const JPGameListAbility = React.lazy(() => import('./callpages/gamelist/JPGameListAbility'));
const GLGameListAilment = React.lazy(() => import('./callpages/gamelist/GLGameListAilment'));
const JPGameListAilment = React.lazy(() => import('./callpages/gamelist/JPGameListAilment'));
const GLGameListPassive = React.lazy(() => import('./callpages/gamelist/GLGameListPassive'));
const JPGameListPassive = React.lazy(() => import('./callpages/gamelist/JPGameListPassive'));
const GLGameListGear = React.lazy(() => import('./callpages/gamelist/GLGameListGear'));
const JPGameListGear = React.lazy(() => import('./callpages/gamelist/JPGameListGear'));
const GLGameListSphere = React.lazy(() => import('./callpages/gamelist/GLGameListSphere'));
const JPGameListSphere = React.lazy(() => import('./callpages/gamelist/JPGameListSphere'));

export default function App() {

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
  const [devSite, setdevSite] = useState(false);

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
      <HashRouter >
        <header id="header-bg">
          <div className="headerimagelink" >
            {DevSwitch == true ?
              ""
              //<div className="devfloat">
              // DEV
              //</div>
              : ""}
            <div className="minifloat clicky noselect" onClick={jponlybutton}>
              {devSite == true ?
                "" :
                jponly == true ?
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
              <img alt={"logo"} className={devSite ? "logodev" : "logo"}>
              </img>
            </Link>
          </div>
          <JukeBoxMini />
        </header>
        <div className={"wrapper"}>

          {devSite == true ?
            <ErrorBoundary>
              <NavDev />
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" exact element={<HomeDev />} />
                  <Route path="/index" exact element={<HomeDev />} />
                  <Route path="/tools/" exact element={<Diffing />} />
                  {
                    //<Route path="/tools/notices" exact element={<Notices />} />
                    //<Route path="/tools/missions" exact element={<Missions />} />
                  }
                  <Route path="/tools/diffing" exact element={<Diffing />} />
                  <Route path="/tools/trans" exact element={<Trans />} />
                  {
                    //<Route path="/tools/compare" exact element={<Compare />} />
                  }
                  {//JP paths
                  }
                  <Route path="/JP/ailments/ailment_data/compare" element={<Ailment_data_jp_compare />} />
                  <Route path="/JP/ailments/ailment_data/new" element={<Ailment_data_jp_new />} />
                  <Route path="/JP/ailments/ailment_group/compare" element={<Ailment_group_jp_compare />} />
                  <Route path="/JP/ailments/ailment_group/new" element={<Ailment_group_jp_new />} />
                  <Route path="/JP/ailments/ailment_rank/compare" element={<Ailment_rank_jp_compare />} />
                  <Route path="/JP/ailments/ailment_rank/new" element={<Ailment_rank_jp_new />} />
                  <Route path="/JP/ailments/ailment_cast/compare" element={<Ailment_cast_jp_compare />} />
                  <Route path="/JP/ailments/ailment_cast/new" element={<Ailment_cast_jp_new />} />
                  <Route path="/JP/ailments/ailment_field/compare" element={<Ailment_field_jp_compare />} />
                  <Route path="/JP/ailments/ailment_field/new" element={<Ailment_field_jp_new />} />
                  <Route path="/JP/ailments/ailment_default/compare" element={<Ailment_default_jp_compare />} />
                  <Route path="/JP/ailments/ailment_default/new" element={<Ailment_default_jp_new />} />
                  <Route path="/JP/filelist/file_list/compare" element={<File_list_jp_compare />} />
                  <Route path="/JP/filelist/file_list/new" element={<File_list_jp_new />} />
                  <Route path="/JP/ailments/ailment_combination/compare" element={<Ailment_combination_jp_compare />} />
                  <Route path="/JP/ailments/ailment_combination/new" element={<Ailment_combination_jp_new />} />
                  <Route path="/JP/ailments/ailment_field_effects/compare" element={<Ailment_field_effects_jp_compare />} />
                  <Route path="/JP/ailments/ailment_field_effects/new" element={<Ailment_field_effects_jp_new />} />
                  <Route path="/JP/ailments/ailment_modify/compare" element={<Ailment_modify_jp_compare />} />
                  <Route path="/JP/ailments/ailment_modify/new" element={<Ailment_modify_jp_new />} />
                  <Route path="/JP/characterpassives/passive_ability/compare" element={<Passive_ability_jp_compare />} />
                  <Route path="/JP/characterpassives/passive_ability/new" element={<Passive_ability_jp_new />} />
                  <Route path="/JP/characterpassives/equipment_passive_ability/compare" element={<Equipment_passive_ability_jp_compare />} />
                  <Route path="/JP/characterpassives/equipment_passive_ability/new" element={<Equipment_passive_ability_jp_new />} />
                  <Route path="/JP/ailments/condition_data/compare" element={<Cond_data_jp_compare />} />
                  <Route path="/JP/ailments/condition_data/new" element={<Cond_data_jp_new />} />
                  <Route path="/JP/ailments/ailment_level_condition/compare" element={<Ailment_level_condition_jp_compare />} />
                  <Route path="/JP/ailments/ailment_level_condition/new" element={<Ailment_level_condition_jp_new />} />
                  <Route path="/JP/characterpassives/link_eff_data/compare" element={<Link_eff_data_jp_compare />} />
                  <Route path="/JP/characterpassives/link_eff_data/new" element={<Link_eff_data_jp_new />} />
                  <Route path="/JP/charability/ability_hit_data/compare" element={<Hit_data_jp_compare />} />
                  <Route path="/JP/charability/ability_hit_data/new" element={<Hit_data_jp_new />} />
                  <Route path="/JP/enemyabilities/enemy_option/compare" element={<Enemy_option_jp_compare />} />
                  <Route path="/JP/enemyabilities/enemy_option/new" element={<Enemy_option_jp_new />} />
                  <Route path="/JP/charability/command_ability_group/compare" element={<Command_group_jp_compare />} />
                  <Route path="/JP/charability/command_ability_group/new" element={<Command_group_jp_new />} />
                  <Route path="/JP/ailments/ailment_level_condition/" element={<Navigate replace to="/JP/ailments/ailment_level_condition/compare" />} />
                  <Route path="/JP/charability/command_ability_group/" element={<Navigate replace to="/JP/charability/command_ability_group/compare" />} />
                  <Route path="/JP/summons/summon_ability/new" element={<Summon_ability_jp_new />} />
                  <Route path="/JP/summons/" element={<Navigate replace to="/JP/summons/summon_ability/new" />} />
                  <Route path="/JP/summons/summon_ability" element={<Summon_ability_jp_new />} />
                  <Route path="/JP/enemyabilities/enemy_option/" element={<Navigate replace to="/JP/enemyabilities/enemy_option/compare" />} />
                  <Route path="/JP/enemyabilities/enemy_ability/compare" element={<Enemy_ability_jp_compare />} />
                  <Route path="/JP/enemyabilities/enemy_ability/new" element={<Enemy_ability_jp_new />} />
                  <Route path="/JP/enemyabilities/enemy_ability/" element={<Navigate replace to="/JP/enemyabilities/enemy_ability/compare" />} />
                  <Route path="/JP/charability/character_ability/compare" element={<Character_ability_jp_compare />} />
                  <Route path="/JP/charability/character_ability/new" element={<Character_ability_jp_new />} />
                  <Route path="/JP/charability/character_ability/" element={<Navigate replace to="/JP/charability/character_ability/compare" />} />
                  <Route path="/JP/charability/character_option/compare" element={<Character_option_jp_compare />} />
                  <Route path="/JP/charability/character_option/new" element={<Character_option_jp_new />} />
                  <Route path="/JP/charability/character_option/" element={<Navigate replace to="/JP/charability/character_option/compare" />} />
                  <Route path="/JP/charability/command_ability/compare" element={<Command_ability_jp_compare />} />
                  <Route path="/JP/charability/command_ability/new" element={<Command_ability_jp_new />} />
                  <Route path="/JP/charability/command_ability/" element={<Navigate replace to="/JP/charability/command_ability/compare" />} />
                  <Route path="/JP/charability/ability_hit_data/" element={<Navigate replace to="/JP/charability/ability_hit_data/compare" />} />
                  <Route path="/JP/characterpassives/link_eff_data/" element={<Navigate replace to="/JP/characterpassives/link_eff_data/compare" />} />
                  <Route path="/JP/characterpassives/art_passive/compare" element={<Art_passive_jp_compare />} />
                  <Route path="/JP/characterpassives/art_passive/new" element={<Art_passive_jp_new />} />
                  <Route path="/JP/characterpassives/art_passive/" element={<Navigate replace to="/JP/characterpassives/art_passive/compare" />} />
                  <Route path="/JP/ailments/condition_data/" element={<Navigate replace to="/JP/ailments/condition_data/compare" />} />
                  <Route path="/JP/characterpassives/equipment_passive_ability/" element={<Navigate replace to="/JP/characterpassives/equipment_passive_ability/compare" />} />
                  <Route path="/JP/characterpassives/passive_ability/" element={<Navigate replace to="/JP/characterpassives/passive_ability/compare" />} />
                  <Route path="/JP/ailments/ailment_modify/" element={<Navigate replace to="/JP/ailments/ailment_modify/compare" />} />
                  <Route path="/JP/ailments/ailment_field_effects/" element={<Navigate replace to="/JP/ailments/ailment_field_effects/compare" />} />
                  <Route path="/JP/ailments/ailment_combination/" element={<Navigate replace to="/JP/ailments/ailment_combination/compare" />} />
                  <Route path="/JP/filelist/file_list/" element={<Navigate replace to="/JP/filelist/file_list/compare" />} />
                  <Route path="/JP/ailments/ailment_default/" element={<Navigate replace to="/JP/ailments/ailment_default/compare" />} />
                  <Route path="/JP/ailments/ailment_data" element={<Navigate replace to="/JP/ailments/ailment_data/compare" />} />

                  <Route path="/JP/ailments/ailment_group" element={<Navigate replace to="/JP/ailments/ailment_group/compare" />} />

                  <Route path="/JP/ailments/ailment_rank" element={<Navigate replace to="/JP/ailments/ailment_rank/compare" />} />

                  <Route path="/JP/ailments/ailment_cast" element={<Navigate replace to="/JP/ailments/ailment_cast/compare" />} />

                  <Route path="/JP/ailments/ailment_field/" element={<Navigate replace to="/JP/ailments/ailment_field/compare" />} />

                  <Route path="/JP/ailments" element={<Navigate replace to="/JP/ailments/ailment_data/compare" />} />

                  <Route path="/JP/charability" element={<Navigate replace to="/JP/charability/character_ability/compare" />} />

                  <Route path="/JP/enemyabilities" element={<Navigate replace to="/JP/enemyabilities/enemy_ability/compare" />} />

                  <Route path="/JP/characterpassives" element={<Navigate replace to="/JP/characterpassives/passive_ability/compare" />} />

                  <Route path="/JP/filelist" element={<Navigate replace to="/JP/filelist/file_list/compare" />} />

                  {//GL paths
                  }
                  <Route path="/GL/ailments/ailment_data/compare" element={<Ailment_data_gl_compare />} />
                  <Route path="/GL/ailments/ailment_data/new" element={<Ailment_data_gl_new />} />
                  <Route path="/GL/ailments/ailment_group/compare" element={<Ailment_group_gl_compare />} />
                  <Route path="/GL/ailments/ailment_group/new" element={<Ailment_group_gl_new />} />
                  <Route path="/GL/ailments/ailment_rank/compare" element={<Ailment_rank_gl_compare />} />
                  <Route path="/GL/ailments/ailment_rank/new" element={<Ailment_rank_gl_new />} />
                  <Route path="/GL/ailments/ailment_cast/compare" element={<Ailment_cast_gl_compare />} />
                  <Route path="/GL/ailments/ailment_cast/new" element={<Ailment_cast_gl_new />} />
                  <Route path="/GL/ailments/ailment_field/compare" element={<Ailment_field_gl_compare />} />
                  <Route path="/GL/ailments/ailment_field/new" element={<Ailment_field_gl_new />} />
                  <Route path="/GL/ailments/ailment_default/compare" element={<Ailment_default_gl_compare />} />
                  <Route path="/GL/ailments/ailment_default/new" element={<Ailment_default_gl_new />} />
                  <Route path="/GL/filelist/file_list/compare" element={<File_list_gl_compare />} />
                  <Route path="/GL/filelist/file_list/new" element={<File_list_gl_new />} />
                  <Route path="/GL/ailments/ailment_combination/compare" element={<Ailment_combination_gl_compare />} />
                  <Route path="/GL/ailments/ailment_combination/new" element={<Ailment_combination_gl_new />} />
                  <Route path="/GL/ailments/ailment_field_effects/compare" element={<Ailment_field_effects_gl_compare />} />
                  <Route path="/GL/ailments/ailment_field_effects/new" element={<Ailment_field_effects_gl_new />} />
                  <Route path="/GL/ailments/ailment_modify/compare" element={<Ailment_modify_gl_compare />} />
                  <Route path="/GL/ailments/ailment_modify/new" element={<Ailment_modify_gl_new />} />
                  <Route path="/GL/characterpassives/passive_ability/compare" element={<Passive_ability_gl_compare />} />
                  <Route path="/GL/characterpassives/passive_ability/new" element={<Passive_ability_gl_new />} />
                  <Route path="/GL/characterpassives/equipment_passive_ability/compare" element={<Equipment_passive_ability_gl_compare />} />
                  <Route path="/GL/characterpassives/equipment_passive_ability/new" element={<Equipment_passive_ability_gl_new />} />
                  <Route path="/GL/ailments/condition_data/compare" element={<Cond_data_gl_compare />} />
                  <Route path="/GL/ailments/condition_data/new" element={<Cond_data_gl_new />} />
                  <Route path="/GL/characterpassives/link_eff_data/compare" element={<Link_eff_data_gl_compare />} />
                  <Route path="/GL/characterpassives/link_eff_data/new" element={<Link_eff_data_gl_new />} />
                  <Route path="/GL/charability/ability_hit_data/compare" element={<Hit_data_gl_compare />} />
                  <Route path="/GL/charability/ability_hit_data/new" element={<Hit_data_gl_new />} />
                  <Route path="/GL/charability/command_ability/compare" element={<Command_ability_gl_compare />} />
                  <Route path="/GL/charability/command_ability/new" element={<Command_ability_gl_new />} />
                  <Route path="/GL/enemyabilities/enemy_option/compare" element={<Enemy_option_gl_compare />} />
                  <Route path="/GL/enemyabilities/enemy_option/new" element={<Enemy_option_gl_new />} />
                  <Route path="/GL/charability/command_ability_group/compare" element={<Command_group_gl_compare />} />
                  <Route path="/GL/charability/command_ability_group/new" element={<Command_group_gl_new />} />
                  <Route path="/GL/ailments/ailment_level_condition/compare" element={<Ailment_level_condition_gl_compare />} />
                  <Route path="/GL/ailments/ailment_level_condition/new" element={<Ailment_level_condition_gl_new />} />
                  <Route path="/GL/ailments/ailment_level_condition/" element={<Navigate replace to="/GL/ailments/ailment_level_condition/compare" />} />

                  <Route path="/GL/charability/command_ability_group/" element={<Navigate replace to="/GL/charability/command_ability_group/compare" />} />

                  <Route path="/GL/enemyabilities/enemy_option/" element={<Navigate replace to="/GL/enemyabilities/enemy_option/compare" />} />

                  <Route path="/GL/summons/summon_ability/new" element={<Summon_ability_gl_new />} />
                  <Route path="/GL/summons/" element={<Navigate replace to="/GL/summons/summon_ability/new" />} />

                  <Route path="/GL/enemyabilities/enemy_ability/compare" element={<Enemy_ability_gl_compare />} />
                  <Route path="/GL/enemyabilities/enemy_ability/new" element={<Enemy_ability_gl_new />} />
                  <Route path="/GL/enemyabilities/enemy_ability/" element={<Navigate replace to="/GL/enemyabilities/enemy_ability/compare" />} />

                  <Route path="/GL/charability/character_ability/compare" element={<Character_ability_gl_compare />} />
                  <Route path="/GL/charability/character_ability/new" element={<Character_ability_gl_new />} />
                  <Route path="/GL/charability/character_ability/" element={<Navigate replace to="/GL/charability/character_ability/compare" />} />

                  <Route path="/GL/charability/character_option/compare" element={<Character_option_gl_compare />} />
                  <Route path="/GL/charability/character_option/new" element={<Character_option_gl_new />} />
                  <Route path="/GL/charability/character_option/" element={<Navigate replace to="/GL/charability/character_option/compare" />} />

                  <Route path="/GL/charability/command_ability/" element={<Navigate replace to="/GL/charability/command_ability/compare" />} />

                  <Route path="/GL/charability/ability_hit_data/" element={<Navigate replace to="/gl/charability/ability_hit_data/compare" />} />

                  <Route path="/GL/characterpassives/link_eff_data/" element={<Navigate replace to="/GL/characterpassives/link_eff_data/compare" />} />

                  <Route path="/GL/characterpassives/art_passive/compare" element={<Art_passive_gl_compare />} />
                  <Route path="/GL/characterpassives/art_passive/new" element={<Art_passive_gl_new />} />
                  <Route path="/GL/characterpassives/art_passive/" element={<Navigate replace to="/GL/characterpassives/art_passive/compare" />} />

                  <Route path="/GL/ailments/condition_data/" element={<Navigate replace to="/GL/ailments/condition_data/compare" />} />

                  <Route path="/GL/characterpassives/equipment_passive_ability/" element={<Navigate replace to="/GL/characterpassives/equipment_passive_ability/compare" />} />

                  <Route path="/GL/characterpassives/passive_ability/" element={<Navigate replace to="/GL/characterpassives/passive_ability/compare" />} />

                  <Route path="/GL/ailments/ailment_modify/" element={<Navigate replace to="/GL/ailments/ailment_modify/compare" />} />

                  <Route path="/GL/ailments/ailment_field_effects/" element={<Navigate replace to="/GL/ailments/ailment_field_effects/compare" />} />

                  <Route path="/GL/ailments/ailment_combination/" element={<Navigate replace to="/GL/ailments/ailment_combination/compare" />} />

                  <Route path="/GL/filelist/file_list/" element={<Navigate replace to="/GL/filelist/file_list/compare" />} />

                  <Route path="/GL/ailments/ailment_default/" element={<Navigate replace to="/GL/ailments/ailment_default/compare" />} />

                  <Route path="/GL/ailments/ailment_cast" element={<Navigate replace to="/GL/ailments/ailment_cast/compare" />} />

                  <Route path="/GL/ailments/ailment_data" element={<Navigate replace to="/GL/ailments/ailment_data/compare" />} />

                  <Route path="/GL/ailments/ailment_group" element={<Navigate replace to="/GL/ailments/ailment_group/compare" />} />

                  <Route path="/GL/ailments/ailment_field/" element={<Navigate replace to="/GL/ailments/ailment_field/compare" />} />

                  <Route path="/GL/ailments/ailment_rank" element={<Navigate replace to="/GL/ailments/ailment_rank/compare" />} />

                  <Route path="/GL/filelist" element={<Navigate replace to="/GL/filelist/file_list/compare" />} />

                  <Route path="/GL/ailments" element={<Navigate replace to="/GL/ailments/ailment_data/compare" />} />

                  <Route path="/GL/characterpassives" element={<Navigate replace to="/GL/characterpassives/passive_ability/compare" />} />

                  <Route path="/GL/charability" element={<Navigate replace to="/GL/charability/character_ability/compare" />} />

                  <Route path="/GL/enemyabilities" element={<Navigate replace to="/GL/enemyabilities/enemy_ability/compare" />} />

                  {//gamelist              
                  }
                  <Route path="/JP/gamelist/ailments" element={<JPGameListAilment />} />
                  <Route path="/JP/gamelist/abilities" element={<JPGameListAbility />} />
                  <Route path="/JP/gamelist/passives" element={<JPGameListPassive />} />
                  <Route path="/JP/gamelist/gear" element={<JPGameListGear />} />
                  <Route path="/JP/gamelist/spheres" element={<JPGameListSphere />} />
                  <Route path="/JP/gamelist" exact element={<Navigate replace to="/JP/gamelist/ailments" />} />

                  <Route path="/GL/gamelist/ailments" element={<GLGameListAilment />} />
                  <Route path="/GL/gamelist/abilities" element={<GLGameListAbility />} />
                  <Route path="/GL/gamelist/passives" element={<GLGameListPassive />} />
                  <Route path="/GL/gamelist/gear" element={<GLGameListGear />} />
                  <Route path="/GL/gamelist/spheres" element={<GLGameListSphere />} />
                  <Route path="/GL/gamelist" exact element={<Navigate replace to="/GL/gamelist/ailments" />} />

                  <Route path="/JP/characterlist" element={<JPByCharacterCall />} />
                  <Route path="/JP" exact element={<Navigate replace to="/JP/characterlist" />} />

                  <Route path="/GL/characterlist" element={<GLByCharacterCall />} />
                  <Route path="/GL" exact element={<Navigate replace to="/GL/characterlist" />} />
                  <Route path="/log" element={<LogDev />} />
                  <Route path="/404" exact element={<NotFoundPage />} />
                  <Route path='*' element={<NotFoundPage />} />
                  <Route element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
            :
            <ErrorBoundary>
              <Nav />
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" exact element={<Home />} />
                  <Route path="/index" exact element={<Home />} />
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
                  <Route path="/summons" exact element={<Navigate replace to="/bonuses" />} />
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
          }
        </div>
        <Footer devSite={devSite} setdevSite={setdevSite} />
      </HashRouter>
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
      const { pathname } = window.location;
      const query = getQuery();
      const url = `${pathname}?${query.toString()}`;
      return <div className='content'>
        <h1>Something went wrong.</h1>
        <div className='subheader infolocation'>Location: {url}</div>
      </div>;
    }
    return this.props.children;
  }
}