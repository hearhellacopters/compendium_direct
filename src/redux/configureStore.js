import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga"; 
import eventGuideReducer from "./ducks/EventGuide";
import characterReducer from "./ducks/characters";
import master_indexReducer from "./ducks/master_index";
import charGuideReducer from "./ducks/CharGuide";
import updatesReducer from "./ducks/updates";
import summonsReducer from "./ducks/summons";
import levelsReducer from "./ducks/levels";
import jpcalendarReducer from "./ducks/jpcalendar";
import eventsReducer from "./ducks/events";
import eventsIndexReducer from "./ducks/eventsIndex";
import enemiesDirectReducer from "./ducks/enemies_direct";
import bannersReducer from "./ducks/banners";
import summonlevelsReducer from "./ducks/summonlevels";
import summonpassivesReducer from "./ducks/summonpassives";
import panelsReducer from "./ducks/panels";
import jptoggleReducer from "./ducks/jptoggle";
import stickerReducer from "./ducks/stickers";
import jukeboxReducer from "./ducks/jukebox";
import enemyabilityDirectReducer from "./ducks/enemyability_direct";
import enemybuffsDirectReducer from "./ducks/enemybuffs_direct";
import playingReducer from "./ducks/playing";
import playindexReducer from "./ducks/playindex";
import playlistReducer from "./ducks/playlist";
import playvolumeReducer from "./ducks/playvolume";
import ultimaweaponReducer from "./ducks/ultimaweapon";
//direct
import transnamesReducer from "./ducks/transnames";

import weaponskinsReducer from "./ducks/weapon_skins";
import accessReducer from "./ducks/access";
import { watcherSaga } from "./sagas/rootSaga";
//gamelist
import jp_gamelist_ailment_Reducer from './ducks/JP/gamelist_ailment'
import gl_gamelist_ailment_Reducer from './ducks/GL/gamelist_ailment'
import jp_gamelist_ability_Reducer from './ducks/JP/gamelist_ability'
import gl_gamelist_ability_Reducer from './ducks/GL/gamelist_ability'
import jp_gamelist_passive_Reducer from './ducks/JP/gamelist_passive'
import gl_gamelist_passive_Reducer from './ducks/GL/gamelist_passive'
import jp_gamelist_gear_Reducer from './ducks/JP/gamelist_gear'
import gl_gamelist_gear_Reducer from './ducks/GL/gamelist_gear'
import jp_gamelist_sphere_Reducer from './ducks/JP/gamelist_sphere'
import gl_gamelist_sphere_Reducer from './ducks/GL/gamelist_sphere'

const reducer = combineReducers({
  charGuide: charGuideReducer,
  eventGuide: eventGuideReducer,
  characters: characterReducer,
  updates : updatesReducer,
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
  //direct
  master_index: master_indexReducer,
  transnames: transnamesReducer,
  weapon_skins: weaponskinsReducer,
  access: accessReducer,
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
