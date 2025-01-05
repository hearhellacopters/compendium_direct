import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import eventGuideReducer from "./ducks/EventGuide.js";
import characterReducer from "./ducks/characters.js";
import master_indexReducer from "./ducks/master_index.js";
import charGuideReducer from "./ducks/CharGuide.js";
import updatesReducer from "./ducks/updates.js";
import summonsReducer from "./ducks/summons.js";
import levelsReducer from "./ducks/levels.js";
import jpcalendarReducer from "./ducks/jpcalendar.js";
import eventsReducer from "./ducks/events.js";
import eventsIndexReducer from "./ducks/eventsIndex.js";
import enemiesDirectReducer from "./ducks/enemies_direct.js";
import bannersReducer from "./ducks/banners.js";
import summonlevelsReducer from "./ducks/summonlevels.js";
import summonpassivesReducer from "./ducks/summonpassives.js";
import panelsReducer from "./ducks/panels.js";
import jptoggleReducer from "./ducks/jptoggle.js";
import stickerReducer from "./ducks/stickers.js";
import jukeboxReducer from "./ducks/jukebox.js";
import enemyabilityDirectReducer from "./ducks/enemyability_direct.js";
import enemybuffsDirectReducer from "./ducks/enemybuffs_direct.js";
import playingReducer from "./ducks/playing.js";
import playindexReducer from "./ducks/playindex.js";
import playlistReducer from "./ducks/playlist.js";
import playvolumeReducer from "./ducks/playvolume.js";
import ultimaweaponReducer from "./ducks/ultimaweapon.js";
import crystalpassivesReducer from "./ducks/crystalpassives.js";
import crystalabilitiesReducer from "./ducks/crystalabilities.js";
import talkReducer from "./ducks/talk.js";
import talkIndexReducer from "./ducks/talk_index.js";
//direct
import transnamesReducer from "./ducks/transnames.js";
import noticesReducer from "./ducks/notices.js";

import weaponskinsReducer from "./ducks/weapon_skins.js";
import accessReducer from "./ducks/access.js";
import { watcherSaga } from "./sagas/rootSaga.js";
//gamelist
import jp_gamelist_ailment_Reducer from './ducks/JP/gamelist_ailment.js'
import gl_gamelist_ailment_Reducer from './ducks/GL/gamelist_ailment.js'
import jp_gamelist_ability_Reducer from './ducks/JP/gamelist_ability.js'
import gl_gamelist_ability_Reducer from './ducks/GL/gamelist_ability.js'
import jp_gamelist_passive_Reducer from './ducks/JP/gamelist_passive.js'
import gl_gamelist_passive_Reducer from './ducks/GL/gamelist_passive.js'
import jp_gamelist_gear_Reducer from './ducks/JP/gamelist_gear.js'
import gl_gamelist_gear_Reducer from './ducks/GL/gamelist_gear.js'
import jp_gamelist_sphere_Reducer from './ducks/JP/gamelist_sphere.js'
import gl_gamelist_sphere_Reducer from './ducks/GL/gamelist_sphere.js'

const reducer = combineReducers({
  charGuide: charGuideReducer,
  eventGuide: eventGuideReducer,
  characters: characterReducer,
  updates: updatesReducer,
  summons: summonsReducer,
  levels: levelsReducer,
  jpcalendar: jpcalendarReducer,
  events: eventsReducer,
  eventsIndex: eventsIndexReducer,
  enemies_direct: enemiesDirectReducer,
  banners: bannersReducer,
  summonlevels: summonlevelsReducer,
  summonpassives: summonpassivesReducer,
  toggle: jptoggleReducer,
  panels: panelsReducer,
  stickers: stickerReducer,
  jukebox: jukeboxReducer,
  enemyability_direct: enemyabilityDirectReducer,
  enemybuffs_direct: enemybuffsDirectReducer,
  playing: playingReducer,
  playindex: playindexReducer,
  playlist: playlistReducer,
  volume: playvolumeReducer,
  ultimaweapon: ultimaweaponReducer,
  crystalpassives: crystalpassivesReducer,
  crystalabilities: crystalabilitiesReducer,
  talk: talkReducer,
  talk_index: talkIndexReducer,
  //direct
  master_index: master_indexReducer,
  transnames: transnamesReducer,
  weapon_skins: weaponskinsReducer,
  access: accessReducer,
  notices: noticesReducer,
  //gamelist
  jp_gamelist_ailment: jp_gamelist_ailment_Reducer,
  gl_gamelist_ailment: gl_gamelist_ailment_Reducer,
  jp_gamelist_ability: jp_gamelist_ability_Reducer,
  gl_gamelist_ability: gl_gamelist_ability_Reducer,
  jp_gamelist_passive: jp_gamelist_passive_Reducer,
  gl_gamelist_passive: gl_gamelist_passive_Reducer,
  jp_gamelist_gear: jp_gamelist_gear_Reducer,
  gl_gamelist_gear: gl_gamelist_gear_Reducer,
  jp_gamelist_sphere: jp_gamelist_sphere_Reducer,
  gl_gamelist_sphere: gl_gamelist_sphere_Reducer,
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(reducer, {}, applyMiddleware(...middleware));

sagaMiddleware.run(watcherSaga);

export default store;
