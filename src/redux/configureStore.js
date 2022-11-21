import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga"; 
import counterReducer from "./ducks/counter";
import eventGuideReducer from "./ducks/EventGuide";
import characterReducer from "./ducks/characters";
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
import maintenanceReducer from "./ducks/maintenance";
//direct
import ailmenteffectsReducer from "./ducks/ailment_effects";
import ailment_group_full_Reducer from './ducks/ailment_group_full'
import ailmentnamesReducer from "./ducks/ailmentnames";
import artpassivenamesReducer from "./ducks/artpassivenames";
import casttargetsReducer from "./ducks/cast_targets";
import charidReducer from "./ducks/char_id";
import command_group_full_Reducer from './ducks/command_group_full'
import commandnamesReducer from "./ducks/commandnames";
import commandtransdataReducer from "./ducks/commandtransdata";
import conddataReducer from "./ducks/cond_data";
import enemy_namesReducer from "./ducks/enemy_names";
import enemy_typeReducer from "./ducks/enemy_type";
import enemy_resist_full_Reducer from  './ducks/enemy_resist_full'
import equipmentpassivenamesReducer from "./ducks/equipmentpassivenames";
import ffseriesReducer from "./ducks/ffseries";
import hittransdataReducer from "./ducks/hittransdata";
import optiontransdataReducer from "./ducks/optiontransdata";
import passiveeffectsReducer from "./ducks/passive_effects";
import passivenamesReducer from "./ducks/passivenames";
import transnamesReducer from "./ducks/transnames";
import weaponcatReducer from "./ducks/weaponcat";
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
  counter: counterReducer,
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
  maintenance: maintenanceReducer,
  //direct
  ailmentnames: ailmentnamesReducer,
  ailment_effects: ailmenteffectsReducer,
  commandnames: commandnamesReducer,
  conddata: conddataReducer,
  passivenames: passivenamesReducer,
  equipmentpassivenames: equipmentpassivenamesReducer,
  artpassivenames: artpassivenamesReducer,
  charid: charidReducer,
  casttargets: casttargetsReducer,
  weaponcat: weaponcatReducer,
  ffseries: ffseriesReducer,
  passive_effects: passiveeffectsReducer,
  transnames: transnamesReducer,
  enemy_type: enemy_typeReducer,
  command_trans_data: commandtransdataReducer,
  option_trans_data: optiontransdataReducer,
  hit_trans_data: hittransdataReducer,
  enemy_names: enemy_namesReducer,
  ailment_group_full: ailment_group_full_Reducer,
  command_group_full: command_group_full_Reducer,
  enemy_resist_full: enemy_resist_full_Reducer,
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
