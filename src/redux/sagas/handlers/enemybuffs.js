import { call, put } from "redux-saga/effects";
import { setEnemyBuffs } from "../../ducks/enemybuffs";
import { requestGetEnemyBuffs } from "../requests/enemybuffs";
import isJson from "./_JSON_CHECK";

export function* handleGetEnemyBuffs(action) {
  try {
    const response = yield call(requestGetEnemyBuffs);
    const { data } = response;
    if(isJson(data,"GetEnemyBuffs") == true){
      yield put(setEnemyBuffs(data));
    }
  } catch (error) {
    console.log(error);
  }
}
