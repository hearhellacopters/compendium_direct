import { takeLatest } from "redux-saga/effects";

import { handleGetCharacters } from "./handlers/characters.js";
import { GET_CHARACTERS } from "../ducks/characters.js";

import { handleGetEventGuide } from "./handlers/EventGuide.js";
import { GET_EVENTGUIDE } from "../ducks/EventGuide.js";

import { handleGetCharGuide } from "./handlers/CharGuide.js";
import { GET_CHARGUIDE } from "../ducks/CharGuide.js";

import { handleGetUpdates } from "./handlers/updates.js";
import { GET_UPDATES } from "../ducks/updates.js";

import { handleGetSummons } from "./handlers/summons.js";
import { GET_SUMMONS } from "../ducks/summons.js";

import { handleGetLevels } from "./handlers/levels.js";
import { GET_LEVELS } from "../ducks/levels.js";

import { handleGetJPCalendar } from "./handlers/jpcalendar.js";
import { GET_JPCALENDAR } from "../ducks/jpcalendar.js";

import { handleGetEvents } from "./handlers/events.js";
import { GET_EVENTS } from "../ducks/events.js";

import { handleGetEventsIndex } from "./handlers/eventsIndex.js";
import { GET_EVENTSINDEX } from "../ducks/eventsIndex.js";

import { handleGetEnemiesDirect } from "./handlers/enemies_direct";
import { GET_ENEMIES_DIRECT } from "../ducks/enemies_direct.js";

import { handleGetBanners } from "./handlers/banners.js";
import { GET_BANNERS } from "../ducks/banners.js";

import { handleGetSummonLevels } from "./handlers/summonlevels";
import { GET_SUMMONLEVELS } from "../ducks/summonlevels.js";

import { handleGetSummonPassives } from "./handlers/summonpassives";
import { GET_SUMMONPASSIVES } from "../ducks/summonpassives.js";

import { handleGetPanels } from "./handlers/panels.js";
import { GET_PANELS } from "../ducks/panels.js";

import { handleGetStickers } from "./handlers/stickers.js";
import { GET_STICKERS } from "../ducks/stickers.js";

import { handleGetJukeBox } from "./handlers/jukebox.js";
import { GET_JUKEBOX } from "../ducks/jukebox.js";

import { handleGetEnemyAbilityDirect } from "./handlers/enemyability_direct.js";
import { GET_ENEMYABILITY_DIRECT } from "../ducks/enemyability_direct.js";

import { handleGetEnemyBuffsDirect } from "./handlers/enemybuffs_direct.js";
import { GET_ENEMYBUFFS_DIRECT } from "../ducks/enemybuffs_direct.js";

import { handleGetUltimaWeapon } from "./handlers/ultimaweapon.js";
import { GET_ULTIMAWEAPON } from "../ducks/ultimaweapon.js";

import { handleGetMaintenance } from "./handlers/maintenance.js";
import { GET_MAINTENANCE } from "../ducks/maintenance.js";

//direct

import { handleGetAilmentEffects } from "./handlers/ailment_effects";
import { GET_AILMENTEFFECTS } from "../ducks/ailment_effects.js";

import { handleGetAilmentGroupFull } from "./handlers/ailment_group_full";
import { GET_AILMENTGROUPFULL } from "../ducks/ailment_group_full.js";

import { handleGetAilmentNames} from "./handlers/ailmentnames";
import { GET_AILMENTNAMES } from "../ducks/ailmentnames";

import { handleGetArtPassiveNames } from "./handlers/artpassivenames";
import { GET_ARTPASSIVENAMES } from "../ducks/artpassivenames";

import { handleGetCastTargets } from "./handlers/cast_targets";
import { GET_CASTTARGETS } from "../ducks/cast_targets";

import { handleGetCharID } from "./handlers/char_id";
import { GET_CHARID } from "../ducks/char_id";

import { handleGetCommandGroupFull } from "./handlers/command_group_full";
import { GET_COMMANDGROUPFULL } from "../ducks/command_group_full";

import { handleGetCommandNames } from "./handlers/commandnames";
import { GET_COMMANDNAMES } from "../ducks/commandnames";

import { handleGetCommandTransData } from "./handlers/commandtransdata";
import { GET_COMMANDTRANSDATA } from "../ducks/commandtransdata";

import { handleGetCondData } from "./handlers/cond_data";
import { GET_CONDDATA } from "../ducks/cond_data";

import { handleGetEnemyNames } from "./handlers/enemy_names";
import { GET_ENEMYNAMES } from "../ducks/enemy_names";

import { handleGetEnemyResistFull } from "./handlers/enemy_resist_full";
import { GET_ENEMYRESISTFULL } from "../ducks/enemy_resist_full";

import { handleGetEnemyType } from "./handlers/enemy_type";
import { GET_ENEMYTYPE } from "../ducks/enemy_type";

import { handleGetEquipmentPassiveNames } from "./handlers/equipmentpassivenames";
import { GET_EQUIPMENTPASSIVENAMES} from "../ducks/equipmentpassivenames";

import { handleGetFFSeries } from "./handlers/ffseries";
import { GET_FFSERIES} from "../ducks/ffseries";

import { handleGetHitTransData } from "./handlers/hittransdata";
import { GET_HITTRANSDATA} from "../ducks/hittransdata";

import { handleGetOptionTransData } from "./handlers/optiontransdata";
import { GET_OPTIONTRANSDATA } from "../ducks/optiontransdata";

import { handleGetPassiveEffects } from "./handlers/passive_effects";
import { GET_PASSIVEEFFECTS } from "../ducks/passive_effects";

import { handleGetPassiveNames } from "./handlers/passivenames";
import { GET_PASSIVENAMES } from "../ducks/passivenames";

import { handleGetTransNames } from "./handlers/transnames";
import { GET_TRANSNAMES } from "../ducks/transnames";

import { handleGetWeaponCat } from "./handlers/weaponcat";
import { GET_WEAPONCAT } from "../ducks/weaponcat";

import { handleGetWeaponSkins } from "./handlers/weapon_skins";
import { GET_WEAPONSKINS } from "../ducks/weapon_skins";

import { handleGetAccess } from "./handlers/access";
import { GET_ACCESS } from "../ducks/access";

//gamelist

import { handleGetGLGameListAilment } from "./handlers/GL/gamelist_ailment";
import { GET_GLGAMELISTAILMENT } from "../ducks/GL/gamelist_ailment";

import { handleGetJPGameListAilment } from "./handlers/JP/gamelist_ailment";
import { GET_JPGAMELISTAILMENT } from "../ducks/JP/gamelist_ailment";

import { handleGetGLGameListAbility } from "./handlers/GL/gamelist_ability";
import { GET_GLGAMELISTABILITY } from "../ducks/GL/gamelist_ability";

import { handleGetJPGameListAbility } from "./handlers/JP/gamelist_ability";
import { GET_JPGAMELISTABILITY } from "../ducks/JP/gamelist_ability";

import { handleGetGLGameListSphere } from "./handlers/GL/gamelist_sphere";
import { GET_GLGAMELISTSPHERE } from "../ducks/GL/gamelist_sphere";

import { handleGetJPGameListSphere } from "./handlers/JP/gamelist_sphere";
import { GET_JPGAMELISTSPHERE } from "../ducks/JP/gamelist_sphere";

import { handleGetGLGameListGear } from "./handlers/GL/gamelist_gear";
import { GET_GLGAMELISTGEAR } from "../ducks/GL/gamelist_gear";

import { handleGetJPGameListGear } from "./handlers/JP/gamelist_gear";
import { GET_JPGAMELISTGEAR } from "../ducks/JP/gamelist_gear";

import { handleGetGLGameListPassive } from "./handlers/GL/gamelist_passive";
import { GET_GLGAMELISTPASSIVE } from "../ducks/GL/gamelist_passive";

import { handleGetJPGameListPassive } from "./handlers/JP/gamelist_passive";
import { GET_JPGAMELISTPASSIVE} from "../ducks/JP/gamelist_passive";

export function* watcherSaga() {
  yield takeLatest(GET_CHARACTERS, handleGetCharacters);
  yield takeLatest(GET_EVENTGUIDE, handleGetEventGuide);
  yield takeLatest(GET_CHARGUIDE, handleGetCharGuide);
  yield takeLatest(GET_UPDATES, handleGetUpdates);
  yield takeLatest(GET_SUMMONS, handleGetSummons);
  yield takeLatest(GET_LEVELS , handleGetLevels);
  yield takeLatest(GET_JPCALENDAR , handleGetJPCalendar);
  yield takeLatest(GET_EVENTS , handleGetEvents);
  yield takeLatest(GET_EVENTSINDEX , handleGetEventsIndex);
  yield takeLatest(GET_ENEMIES_DIRECT , handleGetEnemiesDirect);
  yield takeLatest(GET_BANNERS , handleGetBanners);
  yield takeLatest(GET_SUMMONLEVELS , handleGetSummonLevels);
  yield takeLatest(GET_SUMMONPASSIVES , handleGetSummonPassives);
  yield takeLatest(GET_PANELS , handleGetPanels);
  yield takeLatest(GET_STICKERS , handleGetStickers);
  yield takeLatest(GET_JUKEBOX , handleGetJukeBox);
  yield takeLatest(GET_ENEMYABILITY_DIRECT , handleGetEnemyAbilityDirect);
  yield takeLatest(GET_ENEMYBUFFS_DIRECT , handleGetEnemyBuffsDirect);
  yield takeLatest(GET_ULTIMAWEAPON , handleGetUltimaWeapon);
  yield takeLatest(GET_MAINTENANCE , handleGetMaintenance);
  //direct
  yield takeLatest(GET_AILMENTEFFECTS, handleGetAilmentEffects);
  yield takeLatest(GET_AILMENTGROUPFULL, handleGetAilmentGroupFull);
  yield takeLatest(GET_AILMENTNAMES, handleGetAilmentNames);
  yield takeLatest(GET_ARTPASSIVENAMES, handleGetArtPassiveNames);
  yield takeLatest(GET_CASTTARGETS, handleGetCastTargets);
  yield takeLatest(GET_CHARID, handleGetCharID);
  yield takeLatest(GET_COMMANDNAMES, handleGetCommandNames);
  yield takeLatest(GET_COMMANDGROUPFULL, handleGetCommandGroupFull);
  yield takeLatest(GET_COMMANDTRANSDATA, handleGetCommandTransData);
  yield takeLatest(GET_CONDDATA, handleGetCondData);
  yield takeLatest(GET_ENEMYNAMES, handleGetEnemyNames);
  yield takeLatest(GET_ENEMYRESISTFULL, handleGetEnemyResistFull);
  yield takeLatest(GET_ENEMYTYPE, handleGetEnemyType);
  yield takeLatest(GET_EQUIPMENTPASSIVENAMES, handleGetEquipmentPassiveNames);
  yield takeLatest(GET_FFSERIES, handleGetFFSeries);
  yield takeLatest(GET_HITTRANSDATA, handleGetHitTransData);
  yield takeLatest(GET_OPTIONTRANSDATA, handleGetOptionTransData);
  yield takeLatest(GET_PASSIVEEFFECTS, handleGetPassiveEffects);
  yield takeLatest(GET_PASSIVENAMES, handleGetPassiveNames);
  yield takeLatest(GET_TRANSNAMES, handleGetTransNames);
  yield takeLatest(GET_WEAPONCAT, handleGetWeaponCat);
  yield takeLatest(GET_WEAPONSKINS, handleGetWeaponSkins);
  yield takeLatest(GET_ACCESS, handleGetAccess);
  //gamelists
  yield takeLatest(GET_GLGAMELISTAILMENT , handleGetGLGameListAilment);
  yield takeLatest(GET_JPGAMELISTAILMENT , handleGetJPGameListAilment);
  yield takeLatest(GET_GLGAMELISTABILITY , handleGetGLGameListAbility);
  yield takeLatest(GET_JPGAMELISTABILITY , handleGetJPGameListAbility);
  yield takeLatest(GET_GLGAMELISTGEAR , handleGetGLGameListGear);
  yield takeLatest(GET_JPGAMELISTGEAR , handleGetJPGameListGear);
  yield takeLatest(GET_GLGAMELISTSPHERE , handleGetGLGameListSphere);
  yield takeLatest(GET_JPGAMELISTSPHERE , handleGetJPGameListSphere);
  yield takeLatest(GET_GLGAMELISTPASSIVE , handleGetGLGameListPassive);
  yield takeLatest(GET_JPGAMELISTPASSIVE , handleGetJPGameListPassive);
}
