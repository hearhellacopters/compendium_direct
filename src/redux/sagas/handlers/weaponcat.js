import { call, put } from "redux-saga/effects";
import { setWeaponCat } from "../../ducks/weaponcat";
import { requestGetWeaponCat } from "../requests/weaponcat";
import isJson from "./_JSON_CHECK";

export function* handleGetWeaponCat(action) {
  try {
    const response = yield call(requestGetWeaponCat);
    const { data } = response;
    if(isJson(data,"GetWeaponCat") == true){
      yield put(setWeaponCat(data));
    }
  } catch (error) {
    console.log(error);
  }
}
