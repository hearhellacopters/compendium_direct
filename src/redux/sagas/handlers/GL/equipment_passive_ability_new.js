import { call, put } from "redux-saga/effects";
import { setGLEquipmentPassiveAbilityNew } from "../../../ducks/GL/equipment_passive_ability_new";
import { requestGetGLEquipmentPassiveAbilityNew } from "../../requests/GL/equipment_passive_ability_new";
import isJson from "../_JSON_CHECK";

export function* handleGetGLEquipmentPassiveAbilityNew(action) {
  try {
    const response = yield call(requestGetGLEquipmentPassiveAbilityNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLEquipmentPassiveAbilityNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
