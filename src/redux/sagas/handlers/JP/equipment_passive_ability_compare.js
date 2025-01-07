import { call, put } from "redux-saga/effects";
import { setJPEquipmentPassiveAbilityCompare } from "../../../ducks/JP/equipment_passive_ability_compare";
import { requestGetJPEquipmentPassiveAbilityCompare } from "../../requests/JP/equipment_passive_ability_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetJPEquipmentPassiveAbilityCompare(action) {
  try {
    const response = yield call(requestGetJPEquipmentPassiveAbilityCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPEquipmentPassiveAbilityCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
