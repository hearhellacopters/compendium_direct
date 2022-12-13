import { call, put } from "redux-saga/effects";
import { setWeaponSkins } from "../../ducks/weapon_skins";
import { requestGetWeaponSkins } from "../requests/weapon_skins";
import isJson from "./_JSON_CHECK";

export function* handleGetWeaponSkins(action) {
  try {
    const response = yield call(requestGetWeaponSkins);
    const { data } = response;
    if (isJson(data, "GetWeaponSkins") == true) {
      yield put(setWeaponSkins(data));
    }
  } catch (error) {
    console.log(error);
  }
}
