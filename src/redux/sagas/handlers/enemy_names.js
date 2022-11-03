import { call, put } from "redux-saga/effects";
import { setEnemyNames } from "../../ducks/enemy_names";
import { requestGetEnemyNames } from "../requests/enemy_names";
import isJson from "./_JSON_CHECK";

export function* handleGetEnemyNames(action) {
  try {
    const response = yield call(requestGetEnemyNames);
    const { data } = response;
    if(isJson(data,"GetEnemyNames") == true){
      yield put(setEnemyNames(data));
    }
  } catch (error) {
    console.log(error);
  }
}
