import { takeLatest } from "redux-saga/effects";

import { handleGetJukeBox } from "./handlers/jukebox.js";
import { GET_JUKEBOX } from "../ducks/jukebox.js";

//direct

import { handleGetTransNames } from "./handlers/transnames";
import { GET_TRANSNAMES } from "../ducks/transnames";

import { handleGetWeaponSkins } from "./handlers/weapon_skins";
import { GET_WEAPONSKINS } from "../ducks/weapon_skins";

import { handleGetEnemyNames } from "./handlers/enemy_names";
import { GET_ENEMYNAMES } from "../ducks/enemy_names";

import { handleGetAccess } from "./handlers/access";
import { GET_ACCESS } from "../ducks/access";

import { handleGetMasterIndex } from "./handlers/master_index";
import { GET_MASTERINDEX } from "../ducks/master_index.js";

//ailment api

import { handleGetJPAilmentDataCompare } from "./handlers/JP/ailment_data_compare";
import { GET_JPAILMENTDATACOMPARE } from "../ducks/JP/ailment_data_compare";

import { handleGetJPAilmentDataNew } from "./handlers/JP/ailment_data_new";
import { GET_JPAILMENTDATANEW } from "../ducks/JP/ailment_data_new";

import { handleGetGLAilmentDataCompare } from "./handlers/GL/ailment_data_compare";
import { GET_GLAILMENTDATACOMPARE } from "../ducks/GL/ailment_data_compare";

import { handleGetGLAilmentDataNew } from "./handlers/GL/ailment_data_new";
import { GET_GLAILMENTDATANEW } from "../ducks/GL/ailment_data_new";

//ailment_level_condition api

import { handleGetJPAilmentLevelContCompare } from "./handlers/JP/ailment_level_condition_compare";
import { GET_JPAILMENTLEVELCONTCOMPARE } from "../ducks/JP/ailment_level_condition_compare";

import { handleGetJPAilmentLevelContNew } from "./handlers/JP/ailment_level_condition_new";
import { GET_JPAILMENTLEVELCONTNEW } from "../ducks/JP/ailment_level_condition_new";

import { handleGetGLAilmentLevelContCompare } from "./handlers/GL/ailment_level_condition_compare";
import { GET_GLAILMENTLEVELCONTCOMPARE } from "../ducks/GL/ailment_level_condition_compare";

import { handleGetGLAilmentLevelContNew } from "./handlers/GL/ailment_level_condition_new";
import { GET_GLAILMENTLEVELCONTNEW } from "../ducks/GL/ailment_level_condition_new";

//ailmentgroup api

import { handleGetJPAilmentGroupCompare } from "./handlers/JP/ailment_group_compare";
import { GET_JPAILMENTGROUPCOMPARE } from "../ducks/JP/ailment_group_compare";

import { handleGetJPAilmentGroupNew } from "./handlers/JP/ailment_group_new";
import { GET_JPAILMENTGROUPNEW } from "../ducks/JP/ailment_group_new";

import { handleGetGLAilmentGroupCompare } from "./handlers/GL/ailment_group_compare";
import { GET_GLAILMENTGROUPCOMPARE } from "../ducks/GL/ailment_group_compare";

import { handleGetGLAilmentGroupNew } from "./handlers/GL/ailment_group_new";
import { GET_GLAILMENTGROUPNEW } from "../ducks/GL/ailment_group_new";

//commandgroup api

import { handleGetJPCommandGroupCompare } from "./handlers/JP/command_group_compare";
import { GET_JPCOMMANDGROUPCOMPARE } from "../ducks/JP/command_group_compare";

import { handleGetJPCommandGroupNew } from "./handlers/JP/command_group_new";
import { GET_JPCOMMANDGROUPNEW } from "../ducks/JP/command_group_new";

import { handleGetGLCommandGroupCompare } from "./handlers/GL/command_group_compare";
import { GET_GLCOMMANDGROUPCOMPARE } from "../ducks/GL/command_group_compare";

import { handleGetGLCommandGroupNew } from "./handlers/GL/command_group_new";
import { GET_GLCOMMANDGROUPNEW } from "../ducks/GL/command_group_new";

//ailmentrank api

import { handleGetJPAilmentRankCompare } from "./handlers/JP/ailment_rank_compare";
import { GET_JPAILMENTRANKCOMPARE } from "../ducks/JP/ailment_rank_compare";

import { handleGetJPAilmentRankNew } from "./handlers/JP/ailment_rank_new";
import { GET_JPAILMENTRANKNEW } from "../ducks/JP/ailment_rank_new";

import { handleGetGLAilmentRankCompare } from "./handlers/GL/ailment_rank_compare";
import { GET_GLAILMENTRANKCOMPARE } from "../ducks/GL/ailment_rank_compare";

import { handleGetGLAilmentRankNew } from "./handlers/GL/ailment_rank_new";
import { GET_GLAILMENTRANKNEW } from "../ducks/GL/ailment_rank_new";

//ailmentcast api

import { handleGetJPAilmentCastCompare } from "./handlers/JP/ailment_cast_compare";
import { GET_JPAILMENTCASTCOMPARE } from "../ducks/JP/ailment_cast_compare";

import { handleGetJPAilmentCastNew } from "./handlers/JP/ailment_cast_new";
import { GET_JPAILMENTCASTNEW } from "../ducks/JP/ailment_cast_new";

import { handleGetGLAilmentCastCompare } from "./handlers/GL/ailment_cast_compare";
import { GET_GLAILMENTCASTCOMPARE } from "../ducks/GL/ailment_cast_compare";

import { handleGetGLAilmentCastNew } from "./handlers/GL/ailment_cast_new";
import { GET_GLAILMENTCASTNEW } from "../ducks/GL/ailment_cast_new";

//ailmentfield api

import { handleGetJPAilmentFieldCompare } from "./handlers/JP/ailment_field_compare";
import { GET_JPAILMENTFIELDCOMPARE } from "../ducks/JP/ailment_field_compare";

import { handleGetJPAilmentFieldNew } from "./handlers/JP/ailment_field_new";
import { GET_JPAILMENTFIELDNEW } from "../ducks/JP/ailment_field_new";

import { handleGetGLAilmentFieldCompare } from "./handlers/GL/ailment_field_compare";
import { GET_GLAILMENTFIELDCOMPARE } from "../ducks/GL/ailment_field_compare";

import { handleGetGLAilmentFieldNew } from "./handlers/GL/ailment_field_new";
import { GET_GLAILMENTFIELDNEW } from "../ducks/GL/ailment_field_new";

//ailmentfield effect api

import { handleGetJPAilmentFieldEffectsCompare } from "./handlers/JP/ailment_field_effects_compare";
import { GET_JPAILMENTFIELDEFFECTSCOMPARE } from "../ducks/JP/ailment_field_effects_compare";

import { handleGetJPAilmentFieldEffectsNew } from "./handlers/JP/ailment_field_effects_new";
import { GET_JPAILMENTFIELDEFFECTSNEW } from "../ducks/JP/ailment_field_effects_new";

import { handleGetGLAilmentFieldEffectsCompare } from "./handlers/GL/ailment_field_effects_compare";
import { GET_GLAILMENTFIELDEFFECTSCOMPARE } from "../ducks/GL/ailment_field_effects_compare";

import { handleGetGLAilmentFieldEffectsNew } from "./handlers/GL/ailment_field_effects_new";
import { GET_GLAILMENTFIELDEFFECTSNEW } from "../ducks/GL/ailment_field_effects_new";

//cond data api

import { handleGetJPCondDataCompare } from "./handlers/JP/cond_data_compare";
import { GET_JPCONDDATACOMPARE } from "../ducks/JP/cond_data_compare";

import { handleGetJPCondDataNew } from "./handlers/JP/cond_data_new";
import { GET_JPCONDDATANEW } from "../ducks/JP/cond_data_new";

import { handleGetGLCondDataCompare } from "./handlers/GL/cond_data_compare";
import { GET_GLCONDDATACOMPARE } from "../ducks/GL/cond_data_compare";

import { handleGetGLCondDataNew } from "./handlers/GL/cond_data_new";
import { GET_GLCONDDATANEW } from "../ducks/GL/cond_data_new";

//ailmentdefault api

import { handleGetJPAilmentDefaultCompare } from "./handlers/JP/ailment_default_compare";
import { GET_JPAILMENTDEFAULTCOMPARE } from "../ducks/JP/ailment_default_compare";

import { handleGetJPAilmentDefaultNew } from "./handlers/JP/ailment_default_new";
import { GET_JPAILMENTDEFAULTNEW } from "../ducks/JP/ailment_default_new";

import { handleGetGLAilmentDefaultCompare } from "./handlers/GL/ailment_default_compare";
import { GET_GLAILMENTDEFAULTCOMPARE } from "../ducks/GL/ailment_default_compare";

import { handleGetGLAilmentDefaultNew } from "./handlers/GL/ailment_default_new";
import { GET_GLAILMENTDEFAULTNEW } from "../ducks/GL/ailment_default_new";

//filelist api

import { handleGetJPFileListCompare } from "./handlers/JP/file_list_compare";
import { GET_JPFILELISTCOMPARE } from "../ducks/JP/file_list_compare";

import { handleGetJPFileListNew } from "./handlers/JP/file_list_new";
import { GET_JPFILELISTNEW } from "../ducks/JP/file_list_new";

import { handleGetGLFileListCompare } from "./handlers/GL/file_list_compare";
import { GET_GLFILELISTCOMPARE } from "../ducks/GL/file_list_compare";

import { handleGetGLFileListNew } from "./handlers/GL/file_list_new";
import { GET_GLFILELISTNEW } from "../ducks/GL/file_list_new";

//Ailment Combo api

import { handleGetJPAilmentCombinationCompare } from "./handlers/JP/ailment_combination_compare";
import { GET_JPAILMENTCOMBINATIONCOMPARE } from "../ducks/JP/ailment_combination_compare";

import { handleGetJPAilmentCombinationNew } from "./handlers/JP/ailment_combination_new";
import { GET_JPAILMENTCOMBINATIONNEW } from "../ducks/JP/ailment_combination_new";

import { handleGetGLAilmentCombinationCompare } from "./handlers/GL/ailment_combination_compare";
import { GET_GLAILMENTCOMBINATIONCOMPARE } from "../ducks/GL/ailment_combination_compare";

import { handleGetGLAilmentCombinationNew } from "./handlers/GL/ailment_combination_new";
import { GET_GLAILMENTCOMBINATIONNEW } from "../ducks/GL/ailment_combination_new";

//Ailment modify api

import { handleGetJPAilmentModifyCompare } from "./handlers/JP/ailment_modify_compare";
import { GET_JPAILMENTMODIFYCOMPARE } from "../ducks/JP/ailment_modify_compare";

import { handleGetJPAilmentModifyNew } from "./handlers/JP/ailment_modify_new";
import { GET_JPAILMENTMODIFYNEW } from "../ducks/JP/ailment_modify_new";

import { handleGetGLAilmentModifyCompare } from "./handlers/GL/ailment_modify_compare";
import { GET_GLAILMENTMODIFYCOMPARE } from "../ducks/GL/ailment_modify_compare";

import { handleGetGLAilmentModifyNew } from "./handlers/GL/ailment_modify_new";
import { GET_GLAILMENTMODIFYNEW } from "../ducks/GL/ailment_modify_new";

//passive_ability api

import { handleGetJPPassiveAbilityCompare } from "./handlers/JP/passive_ability_compare";
import { GET_JPPASSIVEABILITYCOMPARE } from "../ducks/JP/passive_ability_compare";

import { handleGetJPPassiveAbilityNew } from "./handlers/JP/passive_ability_new";
import { GET_JPPASSIVEABILITYNEW } from "../ducks/JP/passive_ability_new";

import { handleGetGLPassiveAbilityCompare } from "./handlers/GL/passive_ability_compare";
import { GET_GLPASSIVEABILITYCOMPARE } from "../ducks/GL/passive_ability_compare";

import { handleGetGLPassiveAbilityNew } from "./handlers/GL/passive_ability_new";
import { GET_GLPASSIVEABILITYNEW } from "../ducks/GL/passive_ability_new";

//equipment_passive_ability api

import { handleGetJPEquipmentPassiveAbilityCompare } from "./handlers/JP/equipment_passive_ability_compare";
import { GET_JPEQUIPMENTPASSIVEABILITYCOMPARE } from "../ducks/JP/equipment_passive_ability_compare";

import { handleGetJPEquipmentPassiveAbilityNew } from "./handlers/JP/equipment_passive_ability_new";
import { GET_JPEQUIPMENTPASSIVEABILITYNEW } from "../ducks/JP/equipment_passive_ability_new";

import { handleGetGLEquipmentPassiveAbilityCompare } from "./handlers/GL/equipment_passive_ability_compare";
import { GET_GLEQUIPMENTPASSIVEABILITYCOMPARE } from "../ducks/GL/equipment_passive_ability_compare";

import { handleGetGLEquipmentPassiveAbilityNew } from "./handlers/GL/equipment_passive_ability_new";
import { GET_GLEQUIPMENTPASSIVEABILITYNEW } from "../ducks/GL/equipment_passive_ability_new";

//art_passive api

import { handleGetJPArtPassiveCompare } from "./handlers/JP/art_passive_compare";
import { GET_JPARTPASSIVECOMPARE } from "../ducks/JP/art_passive_compare";

import { handleGetJPArtPassiveNew } from "./handlers/JP/art_passive_new";
import { GET_JPARTPASSIVENEW } from "../ducks/JP/art_passive_new";

import { handleGetGLArtPassiveCompare } from "./handlers/GL/art_passive_compare";
import { GET_GLARTPASSIVECOMPARE } from "../ducks/GL/art_passive_compare";

import { handleGetGLArtPassiveNew } from "./handlers/GL/art_passive_new";
import { GET_GLARTPASSIVENEW } from "../ducks/GL/art_passive_new";


//Link passives

import { handleGetJPLinkEffDataCompare } from "./handlers/JP/link_eff_data_compare";
import { GET_JPLINKEFFECTDATACOMPARE } from "../ducks/JP/link_eff_data_compare";

import { handleGetJPLinkEffDataNew } from "./handlers/JP/link_eff_data_new";
import { GET_JPLINKEFFECTDATANEW } from "../ducks/JP/link_eff_data_new";

import { handleGetGLLinkEffDataCompare } from "./handlers/GL/link_eff_data_compare";
import { GET_GLLINKEFFECTDATACOMPARE } from "../ducks/GL/link_eff_data_compare";

import { handleGetGLLinkEffDataNew } from "./handlers/GL/link_eff_data_new";
import { GET_GLLINKEFFECTDATANEW } from "../ducks/GL/link_eff_data_new";

//hit_data

import { handleGetJPHitDataCompare } from "./handlers/JP/hit_data_compare";
import { GET_JPHITDATACOMPARE } from "../ducks/JP/hit_data_compare";

import { handleGetJPHitDataNew } from "./handlers/JP/hit_data_new";
import { GET_JPHITDATANEW } from "../ducks/JP/hit_data_new";

import { handleGetGLHitDataCompare } from "./handlers/GL/hit_data_compare";
import { GET_GLHITDATACOMPARE } from "../ducks/GL/hit_data_compare";

import { handleGetGLHitDataNew } from "./handlers/GL/hit_data_new";
import { GET_GLHITDATANEW } from "../ducks/GL/hit_data_new";

//command_ability

import { handleGetJPCommandAbilityCompare } from "./handlers/JP/command_ability_compare";
import { GET_JPCOMMANDABILITYCOMPARE } from "../ducks/JP/command_ability_compare";

import { handleGetJPCommandAbilityNew } from "./handlers/JP/command_ability_new";
import { GET_JPCOMMANDABILITYNEW } from "../ducks/JP/command_ability_new";

import { handleGetGLCommandAbilityCompare } from "./handlers/GL/command_ability_compare";
import { GET_GLCOMMANDABILITYCOMPARE } from "../ducks/GL/command_ability_compare";

import { handleGetGLCommandAbilityNew } from "./handlers/GL/command_ability_new";
import { GET_GLCOMMANDABILITYNEW } from "../ducks/GL/command_ability_new";

//character_option

import { handleGetJPCharacterOptionCompare } from "./handlers/JP/character_option_compare";
import { GET_JPCHARACTEROPTIONCOMPARE } from "../ducks/JP/character_option_compare";

import { handleGetJPCharacterOptionNew } from "./handlers/JP/character_option_new";
import { GET_JPCHARACTEROPTIONNEW } from "../ducks/JP/character_option_new";

import { handleGetGLCharacterOptionCompare } from "./handlers/GL/character_option_compare";
import { GET_GLCHARACTEROPTIONCOMPARE } from "../ducks/GL/character_option_compare";

import { handleGetGLCharacterOptionNew } from "./handlers/GL/character_option_new";
import { GET_GLCHARACTEROPTIONNEW } from "../ducks/GL/character_option_new";

//enemy_option

import { handleGetJPEnemyOptionCompare } from "./handlers/JP/enemy_option_compare";
import { GET_JPENEMYOPTIONCOMPARE } from "../ducks/JP/enemy_option_compare";

import { handleGetJPEnemyOptionNew } from "./handlers/JP/enemy_option_new";
import { GET_JPENEMYOPTIONNEW } from "../ducks/JP/enemy_option_new";

import { handleGetGLEnemyOptionCompare } from "./handlers/GL/enemy_option_compare";
import { GET_GLENEMYOPTIONCOMPARE } from "../ducks/GL/enemy_option_compare";

import { handleGetGLEnemyOptionNew } from "./handlers/GL/enemy_option_new";
import { GET_GLENEMYOPTIONNEW } from "../ducks/GL/enemy_option_new";

//character_ability

import { handleGetJPCharacterAbilityCompare } from "./handlers/JP/character_ability_compare";
import { GET_JPCHARACTERABILITYCOMPARE } from "../ducks/JP/character_ability_compare";

import { handleGetJPCharacterAbilityNew } from "./handlers/JP/character_ability_new";
import { GET_JPCHARACTERABILITYNEW } from "../ducks/JP/character_ability_new";

import { handleGetGLCharacterAbilityCompare } from "./handlers/GL/character_ability_compare";
import { GET_GLCHARACTERABILITYCOMPARE } from "../ducks/GL/character_ability_compare";

import { handleGetGLCharacterAbilityNew } from "./handlers/GL/character_ability_new";
import { GET_GLCHARACTERABILITYNEW } from "../ducks/GL/character_ability_new";

//enemy_ability

import { handleGetJPEnemyAbilityCompare } from "./handlers/JP/enemy_ability_compare";
import { GET_JPENEMYABILITYCOMPARE } from "../ducks/JP/enemy_ability_compare";

import { handleGetJPEnemyAbilityNew } from "./handlers/JP/enemy_ability_new";
import { GET_JPENEMYABILITYNEW } from "../ducks/JP/enemy_ability_new";

import { handleGetGLEnemyAbilityCompare } from "./handlers/GL/enemy_ability_compare";
import { GET_GLENEMYABILITYCOMPARE } from "../ducks/GL/enemy_ability_compare";

import { handleGetGLEnemyAbilityNew } from "./handlers/GL/enemy_ability_new";
import { GET_GLENEMYABILITYNEW } from "../ducks/GL/enemy_ability_new";

//enemy_resist

import { handleGetJPEnemyResistCompare } from "./handlers/JP/enemy_resist_compare";
import { GET_JPENEMYRESISTCOMPARE } from "../ducks/JP/enemy_resist_compare";

import { handleGetJPEnemyResistNew } from "./handlers/JP/enemy_resist_new";
import { GET_JPENEMYRESISTNEW } from "../ducks/JP/enemy_resist_new";

import { handleGetGLEnemyResistCompare } from "./handlers/GL/enemy_resist_compare";
import { GET_GLENEMYRESISTCOMPARE } from "../ducks/GL/enemy_resist_compare";

import { handleGetGLEnemyResistNew } from "./handlers/GL/enemy_resist_new";
import { GET_GLENEMYRESISTNEW } from "../ducks/GL/enemy_resist_new";

//summon ability

import { handleGetJPSummonAbilityNew } from "./handlers/JP/summon_ability_new";
import { GET_JPSUMMONABILITYNEW } from "../ducks/JP/summon_ability_new";

import { handleGetGLSummonAbilityNew } from "./handlers/GL/summon_ability_new";
import { GET_GLSUMMONABILITYNEW } from "../ducks/GL/summon_ability_new";

//gamelist

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

import { handleGetEnemyAbilityDirect } from "./handlers/enemyability_direct.js";
import { GET_ENEMYABILITY_DIRECT } from "../ducks/enemyability_direct.js";

import { handleGetEnemyBuffsDirect } from "./handlers/enemybuffs_direct.js";
import { GET_ENEMYBUFFS_DIRECT } from "../ducks/enemybuffs_direct.js";

import { handleGetUltimaWeapon } from "./handlers/ultimaweapon.js";
import { GET_ULTIMAWEAPON } from "../ducks/ultimaweapon.js";

import { handleGetCrystalPassives} from "./handlers/crystalpassives";
import { GET_CRYSTALPASSIVES } from "../ducks/crystalpassives.js";

import { handleGetCrystalAbilities} from "./handlers/crystalabilities";
import { GET_CRYSTALABILITIES } from "../ducks/crystalabilities";

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
import { GET_JPGAMELISTPASSIVE } from "../ducks/JP/gamelist_passive";

import { handleGetNotices } from "./handlers/notices";
import { GET_NOTICES } from "../ducks/notices";

import { handleGetTalk } from "./handlers/talk";
import { GET_TALK } from "../ducks/talk";

import { handleGetTalkIndex } from "./handlers/talk_index";
import { GET_TALK_INDEX } from "../ducks/talk_index";

export function* watcherSaga() {
  yield takeLatest(GET_CHARACTERS, handleGetCharacters);
  yield takeLatest(GET_EVENTGUIDE, handleGetEventGuide);
  yield takeLatest(GET_CHARGUIDE, handleGetCharGuide);
  yield takeLatest(GET_UPDATES, handleGetUpdates);
  yield takeLatest(GET_SUMMONS, handleGetSummons);
  yield takeLatest(GET_LEVELS, handleGetLevels);
  yield takeLatest(GET_JPCALENDAR, handleGetJPCalendar);
  yield takeLatest(GET_EVENTS, handleGetEvents);
  yield takeLatest(GET_EVENTSINDEX, handleGetEventsIndex);
  yield takeLatest(GET_ENEMIES_DIRECT, handleGetEnemiesDirect);
  yield takeLatest(GET_BANNERS, handleGetBanners);
  yield takeLatest(GET_SUMMONLEVELS, handleGetSummonLevels);
  yield takeLatest(GET_SUMMONPASSIVES, handleGetSummonPassives);
  yield takeLatest(GET_PANELS, handleGetPanels);
  yield takeLatest(GET_STICKERS, handleGetStickers);
  yield takeLatest(GET_JUKEBOX, handleGetJukeBox);
  yield takeLatest(GET_ENEMYABILITY_DIRECT, handleGetEnemyAbilityDirect);
  yield takeLatest(GET_ENEMYBUFFS_DIRECT, handleGetEnemyBuffsDirect);
  yield takeLatest(GET_ULTIMAWEAPON, handleGetUltimaWeapon);
  yield takeLatest(GET_CRYSTALPASSIVES, handleGetCrystalPassives);
  yield takeLatest(GET_CRYSTALABILITIES, handleGetCrystalAbilities);
  yield takeLatest(GET_TALK_INDEX, handleGetTalkIndex);
  yield takeLatest(GET_TALK, handleGetTalk);
  //direct
  yield takeLatest(GET_MASTERINDEX, handleGetMasterIndex);
  yield takeLatest(GET_TRANSNAMES, handleGetTransNames);
  yield takeLatest(GET_ENEMYNAMES, handleGetEnemyNames);
  yield takeLatest(GET_WEAPONSKINS, handleGetWeaponSkins);
  yield takeLatest(GET_ACCESS, handleGetAccess);
  //ailment api
  yield takeLatest(GET_JPAILMENTLEVELCONTCOMPARE, handleGetJPAilmentLevelContCompare);
  yield takeLatest(GET_JPAILMENTLEVELCONTNEW, handleGetJPAilmentLevelContNew);
  yield takeLatest(GET_GLAILMENTLEVELCONTCOMPARE, handleGetGLAilmentLevelContCompare);
  yield takeLatest(GET_GLAILMENTLEVELCONTNEW, handleGetGLAilmentLevelContNew);
  //ailment api
  yield takeLatest(GET_JPAILMENTDATACOMPARE, handleGetJPAilmentDataCompare);
  yield takeLatest(GET_JPAILMENTDATANEW, handleGetJPAilmentDataNew);
  yield takeLatest(GET_GLAILMENTDATACOMPARE, handleGetGLAilmentDataCompare);
  yield takeLatest(GET_GLAILMENTDATANEW, handleGetGLAilmentDataNew);
  //ailmentgroup api
  yield takeLatest(GET_JPAILMENTGROUPCOMPARE, handleGetJPAilmentGroupCompare);
  yield takeLatest(GET_JPAILMENTGROUPNEW, handleGetJPAilmentGroupNew);
  yield takeLatest(GET_GLAILMENTGROUPCOMPARE, handleGetGLAilmentGroupCompare);
  yield takeLatest(GET_GLAILMENTGROUPNEW, handleGetGLAilmentGroupNew);
  //commandgroup
  yield takeLatest(GET_JPCOMMANDGROUPCOMPARE, handleGetJPCommandGroupCompare);
  yield takeLatest(GET_JPCOMMANDGROUPNEW, handleGetJPCommandGroupNew);
  yield takeLatest(GET_GLCOMMANDGROUPCOMPARE, handleGetGLCommandGroupCompare);
  yield takeLatest(GET_GLCOMMANDGROUPNEW, handleGetGLCommandGroupNew);
  //rank
  yield takeLatest(GET_JPAILMENTRANKCOMPARE, handleGetJPAilmentRankCompare);
  yield takeLatest(GET_JPAILMENTRANKNEW, handleGetJPAilmentRankNew);
  yield takeLatest(GET_GLAILMENTRANKCOMPARE, handleGetGLAilmentRankCompare);
  yield takeLatest(GET_GLAILMENTRANKNEW, handleGetGLAilmentRankNew);
  //cast
  yield takeLatest(GET_JPAILMENTCASTCOMPARE, handleGetJPAilmentCastCompare);
  yield takeLatest(GET_JPAILMENTCASTNEW, handleGetJPAilmentCastNew);
  yield takeLatest(GET_GLAILMENTCASTCOMPARE, handleGetGLAilmentCastCompare);
  yield takeLatest(GET_GLAILMENTCASTNEW, handleGetGLAilmentCastNew);
  //FIELD
  yield takeLatest(GET_JPAILMENTFIELDCOMPARE, handleGetJPAilmentFieldCompare);
  yield takeLatest(GET_JPAILMENTFIELDNEW, handleGetJPAilmentFieldNew);
  yield takeLatest(GET_GLAILMENTFIELDCOMPARE, handleGetGLAilmentFieldCompare);
  yield takeLatest(GET_GLAILMENTFIELDNEW, handleGetGLAilmentFieldNew);
  //FIELD effects
  yield takeLatest(GET_JPAILMENTFIELDEFFECTSCOMPARE, handleGetJPAilmentFieldEffectsCompare);
  yield takeLatest(GET_JPAILMENTFIELDEFFECTSNEW, handleGetJPAilmentFieldEffectsNew);
  yield takeLatest(GET_GLAILMENTFIELDEFFECTSCOMPARE, handleGetGLAilmentFieldEffectsCompare);
  yield takeLatest(GET_GLAILMENTFIELDEFFECTSNEW, handleGetGLAilmentFieldEffectsNew);
  //cond_data
  yield takeLatest(GET_JPCONDDATACOMPARE, handleGetJPCondDataCompare);
  yield takeLatest(GET_JPCONDDATANEW, handleGetJPCondDataNew);
  yield takeLatest(GET_GLCONDDATACOMPARE, handleGetGLCondDataCompare);
  yield takeLatest(GET_GLCONDDATANEW, handleGetGLCondDataNew);
  //default
  yield takeLatest(GET_JPAILMENTDEFAULTCOMPARE, handleGetJPAilmentDefaultCompare);
  yield takeLatest(GET_JPAILMENTDEFAULTNEW, handleGetJPAilmentDefaultNew);
  yield takeLatest(GET_GLAILMENTDEFAULTCOMPARE, handleGetGLAilmentDefaultCompare);
  yield takeLatest(GET_GLAILMENTDEFAULTNEW, handleGetGLAilmentDefaultNew);
  //ailment_combination
  yield takeLatest(GET_JPAILMENTCOMBINATIONCOMPARE, handleGetJPAilmentCombinationCompare);
  yield takeLatest(GET_JPAILMENTCOMBINATIONNEW, handleGetJPAilmentCombinationNew);
  yield takeLatest(GET_GLAILMENTCOMBINATIONCOMPARE, handleGetGLAilmentCombinationCompare);
  yield takeLatest(GET_GLAILMENTCOMBINATIONNEW, handleGetGLAilmentCombinationNew);
  //ailment_modify
  yield takeLatest(GET_JPAILMENTMODIFYCOMPARE, handleGetJPAilmentModifyCompare);
  yield takeLatest(GET_JPAILMENTMODIFYNEW, handleGetJPAilmentModifyNew);
  yield takeLatest(GET_GLAILMENTMODIFYCOMPARE, handleGetGLAilmentModifyCompare);
  yield takeLatest(GET_GLAILMENTMODIFYNEW, handleGetGLAilmentModifyNew);
  //passive_ability
  yield takeLatest(GET_JPPASSIVEABILITYCOMPARE, handleGetJPPassiveAbilityCompare);
  yield takeLatest(GET_JPPASSIVEABILITYNEW, handleGetJPPassiveAbilityNew);
  yield takeLatest(GET_GLPASSIVEABILITYCOMPARE, handleGetGLPassiveAbilityCompare);
  yield takeLatest(GET_GLPASSIVEABILITYNEW, handleGetGLPassiveAbilityNew);
  //equipment_passive_ability
  yield takeLatest(GET_JPEQUIPMENTPASSIVEABILITYCOMPARE, handleGetJPEquipmentPassiveAbilityCompare);
  yield takeLatest(GET_JPEQUIPMENTPASSIVEABILITYNEW, handleGetJPEquipmentPassiveAbilityNew);
  yield takeLatest(GET_GLEQUIPMENTPASSIVEABILITYCOMPARE, handleGetGLEquipmentPassiveAbilityCompare);
  yield takeLatest(GET_GLEQUIPMENTPASSIVEABILITYNEW, handleGetGLEquipmentPassiveAbilityNew);
  //art_passive
  yield takeLatest(GET_JPARTPASSIVECOMPARE, handleGetJPArtPassiveCompare);
  yield takeLatest(GET_JPARTPASSIVENEW, handleGetJPArtPassiveNew);
  yield takeLatest(GET_GLARTPASSIVECOMPARE, handleGetGLArtPassiveCompare);
  yield takeLatest(GET_GLARTPASSIVENEW, handleGetGLArtPassiveNew);
  //linkeffectdata
  yield takeLatest(GET_JPLINKEFFECTDATACOMPARE, handleGetJPLinkEffDataCompare);
  yield takeLatest(GET_JPLINKEFFECTDATANEW, handleGetJPLinkEffDataNew);
  yield takeLatest(GET_GLLINKEFFECTDATACOMPARE, handleGetGLLinkEffDataCompare);
  yield takeLatest(GET_GLLINKEFFECTDATANEW, handleGetGLLinkEffDataNew);
  //hit data
  yield takeLatest(GET_JPHITDATACOMPARE, handleGetJPHitDataCompare);
  yield takeLatest(GET_JPHITDATANEW, handleGetJPHitDataNew);
  yield takeLatest(GET_GLHITDATACOMPARE, handleGetGLHitDataCompare);
  yield takeLatest(GET_GLHITDATANEW, handleGetGLHitDataNew);
  //command ability
  yield takeLatest(GET_JPCOMMANDABILITYCOMPARE, handleGetJPCommandAbilityCompare);
  yield takeLatest(GET_JPCOMMANDABILITYNEW, handleGetJPCommandAbilityNew);
  yield takeLatest(GET_GLCOMMANDABILITYCOMPARE, handleGetGLCommandAbilityCompare);
  yield takeLatest(GET_GLCOMMANDABILITYNEW, handleGetGLCommandAbilityNew);
  //character options
  yield takeLatest(GET_JPCHARACTEROPTIONCOMPARE, handleGetJPCharacterOptionCompare);
  yield takeLatest(GET_JPCHARACTEROPTIONNEW, handleGetJPCharacterOptionNew);
  yield takeLatest(GET_GLCHARACTEROPTIONCOMPARE, handleGetGLCharacterOptionCompare);
  yield takeLatest(GET_GLCHARACTEROPTIONNEW, handleGetGLCharacterOptionNew);
  //enemy options
  yield takeLatest(GET_JPENEMYOPTIONCOMPARE, handleGetJPEnemyOptionCompare);
  yield takeLatest(GET_JPENEMYOPTIONNEW, handleGetJPEnemyOptionNew);
  yield takeLatest(GET_GLENEMYOPTIONCOMPARE, handleGetGLEnemyOptionCompare);
  yield takeLatest(GET_GLENEMYOPTIONNEW, handleGetGLEnemyOptionNew);
  //enemy resist
  yield takeLatest(GET_JPENEMYRESISTCOMPARE, handleGetJPEnemyResistCompare);
  yield takeLatest(GET_JPENEMYRESISTNEW, handleGetJPEnemyResistNew);
  yield takeLatest(GET_GLENEMYRESISTCOMPARE, handleGetGLEnemyResistCompare);
  yield takeLatest(GET_GLENEMYRESISTNEW, handleGetGLEnemyResistNew);
  //character ability
  yield takeLatest(GET_JPCHARACTERABILITYCOMPARE, handleGetJPCharacterAbilityCompare);
  yield takeLatest(GET_JPCHARACTERABILITYNEW, handleGetJPCharacterAbilityNew);
  yield takeLatest(GET_GLCHARACTERABILITYCOMPARE, handleGetGLCharacterAbilityCompare);
  yield takeLatest(GET_GLCHARACTERABILITYNEW, handleGetGLCharacterAbilityNew);
  //enemy ability
  yield takeLatest(GET_JPENEMYABILITYCOMPARE, handleGetJPEnemyAbilityCompare);
  yield takeLatest(GET_JPENEMYABILITYNEW, handleGetJPEnemyAbilityNew);
  yield takeLatest(GET_GLENEMYABILITYCOMPARE, handleGetGLEnemyAbilityCompare);
  yield takeLatest(GET_GLENEMYABILITYNEW, handleGetGLEnemyAbilityNew);
  //summon ability
  yield takeLatest(GET_JPSUMMONABILITYNEW, handleGetJPSummonAbilityNew);
  yield takeLatest(GET_GLSUMMONABILITYNEW, handleGetGLSummonAbilityNew);
  //filelist
  yield takeLatest(GET_JPFILELISTCOMPARE, handleGetJPFileListCompare);
  yield takeLatest(GET_JPFILELISTNEW, handleGetJPFileListNew);
  yield takeLatest(GET_GLFILELISTCOMPARE, handleGetGLFileListCompare);
  yield takeLatest(GET_GLFILELISTNEW, handleGetGLFileListNew);
  //gamelists
  yield takeLatest(GET_GLGAMELISTAILMENT, handleGetGLGameListAilment);
  yield takeLatest(GET_JPGAMELISTAILMENT, handleGetJPGameListAilment);
  yield takeLatest(GET_GLGAMELISTABILITY, handleGetGLGameListAbility);
  yield takeLatest(GET_JPGAMELISTABILITY, handleGetJPGameListAbility);
  yield takeLatest(GET_GLGAMELISTGEAR, handleGetGLGameListGear);
  yield takeLatest(GET_JPGAMELISTGEAR, handleGetJPGameListGear);
  yield takeLatest(GET_GLGAMELISTSPHERE, handleGetGLGameListSphere);
  yield takeLatest(GET_JPGAMELISTSPHERE, handleGetJPGameListSphere);
  yield takeLatest(GET_GLGAMELISTPASSIVE, handleGetGLGameListPassive);
  yield takeLatest(GET_JPGAMELISTPASSIVE, handleGetJPGameListPassive);

  yield takeLatest(GET_NOTICES, handleGetNotices);
}
