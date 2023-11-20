import { call, put } from "redux-saga/effects";
import { setWeaponSkins } from "../../ducks/weapon_skins";
import { requestGetWeaponSkins } from "../requests/weapon_skins";
import {_error} from './_error_state_add';
import {_error_remove} from './_error_state_remove';
import isJson from "./_JSON_CHECK";

export function* handleGetWeaponSkins(action) {
  try {
    const response = yield call(requestGetWeaponSkins);
    const { data } = response;
    if (isJson(data, "GetWeaponSkins") == true) {
      _error_remove("weapon_skins");
      yield put(setWeaponSkins(data));
    }
  } catch (error) {
    _error("weapon_skins", error.message);
  }
}
