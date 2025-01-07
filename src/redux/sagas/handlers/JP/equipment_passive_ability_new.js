import { call, put } from "redux-saga/effects";
import { setJPEquipmentPassiveAbilityNew } from "../../../ducks/JP/equipment_passive_ability_new";
import { requestGetJPEquipmentPassiveAbilityNew } from "../../requests/JP/equipment_passive_ability_new";
import isJson from "../_JSON_CHECK";

export function* handleGetJPEquipmentPassiveAbilityNew(action) {
  try {
    const response = yield call(requestGetJPEquipmentPassiveAbilityNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPEquipmentPassiveAbilityNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
