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
import enemy_namesReducer from "./ducks/enemy_names";
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
//ailment_level_condition
import ailment_level_condition_compare_jp_Reducer from './ducks/JP/ailment_level_condition_compare'
import ailment_level_condition_new_jp_Reducer from './ducks/JP/ailment_level_condition_new'
import ailment_level_condition_compare_gl_Reducer from './ducks/GL/ailment_level_condition_compare'
import ailment_level_condition_new_gl_Reducer from './ducks/GL/ailment_level_condition_new'
//ailmentdata
import ailment_data_compare_jp_Reducer from './ducks/JP/ailment_data_compare'
import ailment_data_new_jp_Reducer from './ducks/JP/ailment_data_new'
import ailment_data_compare_gl_Reducer from './ducks/GL/ailment_data_compare'
import ailment_data_new_gl_Reducer from './ducks/GL/ailment_data_new'
//ailmentgroup
import ailment_group_compare_jp_Reducer from './ducks/JP/ailment_group_compare'
import ailment_group_new_jp_Reducer from './ducks/JP/ailment_group_new'
import ailment_group_compare_gl_Reducer from './ducks/GL/ailment_group_compare'
import ailment_group_new_gl_Reducer from './ducks/GL/ailment_group_new'
//commandgroup
import command_group_compare_jp_Reducer from './ducks/JP/command_group_compare'
import command_group_new_jp_Reducer from './ducks/JP/command_group_new'
import command_group_compare_gl_Reducer from './ducks/GL/command_group_compare'
import command_group_new_gl_Reducer from './ducks/GL/command_group_new'
//ailmentranks
import ailment_rank_compare_jp_Reducer from './ducks/JP/ailment_rank_compare'
import ailment_rank_new_jp_Reducer from './ducks/JP/ailment_rank_new'
import ailment_rank_compare_gl_Reducer from './ducks/GL/ailment_rank_compare'
import ailment_rank_new_gl_Reducer from './ducks/GL/ailment_rank_new'
//ailmentcasts
import ailment_cast_compare_jp_Reducer from './ducks/JP/ailment_cast_compare'
import ailment_cast_new_jp_Reducer from './ducks/JP/ailment_cast_new'
import ailment_cast_compare_gl_Reducer from './ducks/GL/ailment_cast_compare'
import ailment_cast_new_gl_Reducer from './ducks/GL/ailment_cast_new'
//ailmentfields
import ailment_field_compare_jp_Reducer from './ducks/JP/ailment_field_compare'
import ailment_field_new_jp_Reducer from './ducks/JP/ailment_field_new'
import ailment_field_compare_gl_Reducer from './ducks/GL/ailment_field_compare'
import ailment_field_new_gl_Reducer from './ducks/GL/ailment_field_new'
//ailmenteffects
import ailment_field_effects_compare_jp_Reducer from './ducks/JP/ailment_field_effects_compare'
import ailment_field_effects_new_jp_Reducer from './ducks/JP/ailment_field_effects_new'
import ailment_field_effects_compare_gl_Reducer from './ducks/GL/ailment_field_effects_compare'
import ailment_field_effects_new_gl_Reducer from './ducks/GL/ailment_field_effects_new'
//ailmentdefaults
import ailment_default_compare_jp_Reducer from './ducks/JP/ailment_default_compare'
import ailment_default_new_jp_Reducer from './ducks/JP/ailment_default_new'
import ailment_default_compare_gl_Reducer from './ducks/GL/ailment_default_compare'
import ailment_default_new_gl_Reducer from './ducks/GL/ailment_default_new'
//cond_Data
import cond_data_compare_jp_Reducer from './ducks/JP/cond_data_compare'
import cond_data_new_jp_Reducer from './ducks/JP/cond_data_new'
import cond_data_compare_gl_Reducer from './ducks/GL/cond_data_compare'
import cond_data_new_gl_Reducer from './ducks/GL/cond_data_new'
//ailment_combination
import ailment_combination_compare_jp_Reducer from './ducks/JP/ailment_combination_compare'
import ailment_combination_new_jp_Reducer from './ducks/JP/ailment_combination_new'
import ailment_combination_compare_gl_Reducer from './ducks/GL/ailment_combination_compare'
import ailment_combination_new_gl_Reducer from './ducks/GL/ailment_combination_new'
//ailment_modify
import ailment_modify_compare_jp_Reducer from './ducks/JP/ailment_modify_compare'
import ailment_modify_new_jp_Reducer from './ducks/JP/ailment_modify_new'
import ailment_modify_compare_gl_Reducer from './ducks/GL/ailment_modify_compare'
import ailment_modify_new_gl_Reducer from './ducks/GL/ailment_modify_new'
//passive_ability
import passive_ability_compare_jp_Reducer from './ducks/JP/passive_ability_compare'
import passive_ability_new_jp_Reducer from './ducks/JP/passive_ability_new'
import passive_ability_compare_gl_Reducer from './ducks/GL/passive_ability_compare'
import passive_ability_new_gl_Reducer from './ducks/GL/passive_ability_new'
//equipment_passive_ability
import equipment_passive_ability_compare_jp_Reducer from './ducks/JP/equipment_passive_ability_compare'
import equipment_passive_ability_new_jp_Reducer from './ducks/JP/equipment_passive_ability_new'
import equipment_passive_ability_compare_gl_Reducer from './ducks/GL/equipment_passive_ability_compare'
import equipment_passive_ability_new_gl_Reducer from './ducks/GL/equipment_passive_ability_new'
//art_passive
import art_passive_compare_jp_Reducer from './ducks/JP/art_passive_compare'
import art_passive_new_jp_Reducer from './ducks/JP/art_passive_new'
import art_passive_compare_gl_Reducer from './ducks/GL/art_passive_compare'
import art_passive_new_gl_Reducer from './ducks/GL/art_passive_new'
//link_effect_data
import link_effect_data_compare_jp_Reducer from './ducks/JP/link_eff_data_compare'
import link_effect_data_new_jp_Reducer from './ducks/JP/link_eff_data_new'
import link_effect_data_compare_gl_Reducer from './ducks/GL/link_eff_data_compare'
import link_effect_data_new_gl_Reducer from './ducks/GL/link_eff_data_new'
//hit_data
import hit_data_compare_jp_Reducer from './ducks/JP/hit_data_compare'
import hit_data_new_jp_Reducer from './ducks/JP/hit_data_new'
import hit_data_compare_gl_Reducer from './ducks/GL/hit_data_compare'
import hit_data_new_gl_Reducer from './ducks/GL/hit_data_new'
//command_ability
import command_ability_compare_jp_Reducer from './ducks/JP/command_ability_compare'
import command_ability_new_jp_Reducer from './ducks/JP/command_ability_new'
import command_ability_compare_gl_Reducer from './ducks/GL/command_ability_compare'
import command_ability_new_gl_Reducer from './ducks/GL/command_ability_new'
//character_option
import character_option_compare_jp_Reducer from './ducks/JP/character_option_compare'
import character_option_new_jp_Reducer from './ducks/JP/character_option_new'
import character_option_compare_gl_Reducer from './ducks/GL/character_option_compare'
import character_option_new_gl_Reducer from './ducks/GL/character_option_new'
//enemy_option
import enemy_option_compare_jp_Reducer from './ducks/JP/enemy_option_compare'
import enemy_option_new_jp_Reducer from './ducks/JP/enemy_option_new'
import enemy_option_compare_gl_Reducer from './ducks/GL/enemy_option_compare'
import enemy_option_new_gl_Reducer from './ducks/GL/enemy_option_new'
//character_ability
import character_ability_compare_jp_Reducer from './ducks/JP/character_ability_compare'
import character_ability_new_jp_Reducer from './ducks/JP/character_ability_new'
import character_ability_compare_gl_Reducer from './ducks/GL/character_ability_compare'
import character_ability_new_gl_Reducer from './ducks/GL/character_ability_new'
//enemy_ability
import enemy_ability_compare_jp_Reducer from './ducks/JP/enemy_ability_compare'
import enemy_ability_new_jp_Reducer from './ducks/JP/enemy_ability_new'
import enemy_ability_compare_gl_Reducer from './ducks/GL/enemy_ability_compare'
import enemy_ability_new_gl_Reducer from './ducks/GL/enemy_ability_new'
//summon_ability
import summon_ability_new_jp_Reducer from './ducks/JP/summon_ability_new'
import summon_ability_new_gl_Reducer from './ducks/GL/summon_ability_new'
//enemy_resist
import enemy_resist_compare_jp_Reducer from './ducks/JP/enemy_resist_compare'
import enemy_resist_new_jp_Reducer from './ducks/JP/enemy_resist_new'
import enemy_resist_compare_gl_Reducer from './ducks/GL/enemy_resist_compare'
import enemy_resist_new_gl_Reducer from './ducks/GL/enemy_resist_new'
//filelist
import file_list_compare_jp_Reducer from './ducks/JP/file_list_compare'
import file_list_new_jp_Reducer from './ducks/JP/file_list_new'
import file_list_compare_gl_Reducer from './ducks/GL/file_list_compare'
import file_list_new_gl_Reducer from './ducks/GL/file_list_new'

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
  enemy_names: enemy_namesReducer,
  weapon_skins: weaponskinsReducer,
  access: accessReducer,
  notices: noticesReducer,
  //ailment_level_condition
  ailment_level_condition_compare_jp: ailment_level_condition_compare_jp_Reducer,
  ailment_level_condition_new_jp: ailment_level_condition_new_jp_Reducer,
  ailment_level_condition_compare_gl: ailment_level_condition_compare_gl_Reducer,
  ailment_level_condition_new_gl: ailment_level_condition_new_gl_Reducer,
  //ailment data
  ailment_data_compare_jp: ailment_data_compare_jp_Reducer,
  ailment_data_new_jp: ailment_data_new_jp_Reducer,
  ailment_data_compare_gl: ailment_data_compare_gl_Reducer,
  ailment_data_new_gl: ailment_data_new_gl_Reducer,
  //ailment group
  ailment_group_compare_jp: ailment_group_compare_jp_Reducer,
  ailment_group_new_jp: ailment_group_new_jp_Reducer,
  ailment_group_compare_gl: ailment_group_compare_gl_Reducer,
  ailment_group_new_gl: ailment_group_new_gl_Reducer,
  //command group
  command_group_compare_jp: command_group_compare_jp_Reducer,
  command_group_new_jp: command_group_new_jp_Reducer,
  command_group_compare_gl: command_group_compare_gl_Reducer,
  command_group_new_gl: command_group_new_gl_Reducer,
  //ailment rank 
  ailment_rank_compare_jp: ailment_rank_compare_jp_Reducer,
  ailment_rank_new_jp: ailment_rank_new_jp_Reducer,
  ailment_rank_compare_gl: ailment_rank_compare_gl_Reducer,
  ailment_rank_new_gl: ailment_rank_new_gl_Reducer,
  //ailment cast 
  ailment_cast_compare_jp: ailment_cast_compare_jp_Reducer,
  ailment_cast_new_jp: ailment_cast_new_jp_Reducer,
  ailment_cast_compare_gl: ailment_cast_compare_gl_Reducer,
  ailment_cast_new_gl: ailment_cast_new_gl_Reducer,
  //ailment field 
  ailment_field_compare_jp: ailment_field_compare_jp_Reducer,
  ailment_field_new_jp: ailment_field_new_jp_Reducer,
  ailment_field_compare_gl: ailment_field_compare_gl_Reducer,
  ailment_field_new_gl: ailment_field_new_gl_Reducer,
  //ailment field effects
  ailment_field_effects_compare_jp: ailment_field_effects_compare_jp_Reducer,
  ailment_field_effects_new_jp: ailment_field_effects_new_jp_Reducer,
  ailment_field_effects_compare_gl: ailment_field_effects_compare_gl_Reducer,
  ailment_field_effects_new_gl: ailment_field_effects_new_gl_Reducer,
  //ailment default
  ailment_default_compare_jp: ailment_default_compare_jp_Reducer,
  ailment_default_new_jp: ailment_default_new_jp_Reducer,
  ailment_default_compare_gl: ailment_default_compare_gl_Reducer,
  ailment_default_new_gl: ailment_default_new_gl_Reducer,
  //cond data
  cond_data_compare_jp: cond_data_compare_jp_Reducer,
  cond_data_new_jp: cond_data_new_jp_Reducer,
  cond_data_compare_gl: cond_data_compare_gl_Reducer,
  cond_data_new_gl: cond_data_new_gl_Reducer,
  //ailment_combination
  ailment_combination_compare_jp: ailment_combination_compare_jp_Reducer,
  ailment_combination_new_jp: ailment_combination_new_jp_Reducer,
  ailment_combination_compare_gl: ailment_combination_compare_gl_Reducer,
  ailment_combination_new_gl: ailment_combination_new_gl_Reducer,
  //ailment_modify
  ailment_modify_compare_jp: ailment_modify_compare_jp_Reducer,
  ailment_modify_new_jp: ailment_modify_new_jp_Reducer,
  ailment_modify_compare_gl: ailment_modify_compare_gl_Reducer,
  ailment_modify_new_gl: ailment_modify_new_gl_Reducer,
  //passive_ability
  passive_ability_compare_jp: passive_ability_compare_jp_Reducer,
  passive_ability_new_jp: passive_ability_new_jp_Reducer,
  passive_ability_compare_gl: passive_ability_compare_gl_Reducer,
  passive_ability_new_gl: passive_ability_new_gl_Reducer,
  //art_passive
  art_passive_compare_jp: art_passive_compare_jp_Reducer,
  art_passive_new_jp: art_passive_new_jp_Reducer,
  art_passive_compare_gl: art_passive_compare_gl_Reducer,
  art_passive_new_gl: art_passive_new_gl_Reducer,
  //link_effect_data
  link_effect_data_compare_jp: link_effect_data_compare_jp_Reducer,
  link_effect_data_new_jp: link_effect_data_new_jp_Reducer,
  link_effect_data_compare_gl: link_effect_data_compare_gl_Reducer,
  link_effect_data_new_gl: link_effect_data_new_gl_Reducer,
  //hit_data
  hit_data_compare_jp: hit_data_compare_jp_Reducer,
  hit_data_new_jp: hit_data_new_jp_Reducer,
  hit_data_compare_gl: hit_data_compare_gl_Reducer,
  hit_data_new_gl: hit_data_new_gl_Reducer,
  //equipment_passive_ability
  equipment_passive_ability_compare_jp: equipment_passive_ability_compare_jp_Reducer,
  equipment_passive_ability_new_jp: equipment_passive_ability_new_jp_Reducer,
  equipment_passive_ability_compare_gl: equipment_passive_ability_compare_gl_Reducer,
  equipment_passive_ability_new_gl: equipment_passive_ability_new_gl_Reducer,
  //command_ability
  command_ability_compare_jp: command_ability_compare_jp_Reducer,
  command_ability_new_jp: command_ability_new_jp_Reducer,
  command_ability_compare_gl: command_ability_compare_gl_Reducer,
  command_ability_new_gl: command_ability_new_gl_Reducer,
  //character_ability
  character_ability_compare_jp: character_ability_compare_jp_Reducer,
  character_ability_new_jp: character_ability_new_jp_Reducer,
  character_ability_compare_gl: character_ability_compare_gl_Reducer,
  character_ability_new_gl: character_ability_new_gl_Reducer,
  //enemy_ability
  enemy_ability_compare_jp: enemy_ability_compare_jp_Reducer,
  enemy_ability_new_jp: enemy_ability_new_jp_Reducer,
  enemy_ability_compare_gl: enemy_ability_compare_gl_Reducer,
  enemy_ability_new_gl: enemy_ability_new_gl_Reducer,
  //summon_ability
  summon_ability_new_jp: summon_ability_new_jp_Reducer,
  summon_ability_new_gl: summon_ability_new_gl_Reducer,
  //character_option
  character_option_compare_jp: character_option_compare_jp_Reducer,
  character_option_new_jp: character_option_new_jp_Reducer,
  character_option_compare_gl: character_option_compare_gl_Reducer,
  character_option_new_gl: character_option_new_gl_Reducer,
  //enemy_option
  enemy_option_compare_jp: enemy_option_compare_jp_Reducer,
  enemy_option_new_jp: enemy_option_new_jp_Reducer,
  enemy_option_compare_gl: enemy_option_compare_gl_Reducer,
  enemy_option_new_gl: enemy_option_new_gl_Reducer,
  //enemy_resist
  enemy_resist_compare_jp: enemy_resist_compare_jp_Reducer,
  enemy_resist_new_jp: enemy_resist_new_jp_Reducer,
  enemy_resist_compare_gl: enemy_resist_compare_gl_Reducer,
  enemy_resist_new_gl: enemy_resist_new_gl_Reducer,
  //filelist
  file_list_compare_jp: file_list_compare_jp_Reducer,
  file_list_new_jp: file_list_new_jp_Reducer,
  file_list_compare_gl: file_list_compare_gl_Reducer,
  file_list_new_gl: file_list_new_gl_Reducer,
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
