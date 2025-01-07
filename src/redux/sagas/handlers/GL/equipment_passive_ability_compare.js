import { call, put } from "redux-saga/effects";
import { setGLEquipmentPassiveAbilityCompare } from "../../../ducks/GL/equipment_passive_ability_compare";
import { requestGetGLEquipmentPassiveAbilityCompare } from "../../requests/GL/equipment_passive_ability_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetGLEquipmentPassiveAbilityCompare(action) {
  try {
    const response = yield call(requestGetGLEquipmentPassiveAbilityCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLEquipmentPassiveAbilityCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
