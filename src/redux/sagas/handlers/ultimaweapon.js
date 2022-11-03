import { call, put } from "redux-saga/effects";
import { setUltimaWeapon } from "../../ducks/ultimaweapon";
import { requestGetUltimaWeapon } from "../requests/ultimaweapon";
import isJson from "./_JSON_CHECK";

export function* handleGetUltimaWeapon(action) {
  try {
    const response = yield call(requestGetUltimaWeapon);
    const { data } = response;
    if(isJson(data,"GetUltimaWeapon") == true){
      yield put(setUltimaWeapon(data));
    }
  } catch (error) {
    console.log(error);
  }
}
