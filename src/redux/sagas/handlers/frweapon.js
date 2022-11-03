import { call, put } from "redux-saga/effects";
import { setFRWeapon } from "../../ducks/frweapon";
import { requestGetFRWeapon } from "../requests/frweapon";
import isJson from "./_JSON_CHECK";

export function* handleGetFRWeapon(action) {
  try {
    const response = yield call(requestGetFRWeapon);
    const { data } = response;
    if(isJson(data,"GetFRWeapon") == true){
      yield put(setFRWeapon(data));
    }
  } catch (error) {
    console.log(error);
  }
}
