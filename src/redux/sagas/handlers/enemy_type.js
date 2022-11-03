import { call, put } from "redux-saga/effects";
import { setEnemyType } from "../../ducks/enemy_type";
import { requestGetEnemyType } from "../requests/enemy_type";
import isJson from "./_JSON_CHECK";

export function* handleGetEnemyType(action) {
  try {
    const response = yield call(requestGetEnemyType);
    const { data } = response;
    if(isJson(data,"GetEnemyType") == true){
      yield put(setEnemyType(data));
    }
  } catch (error) {
    console.log(error);
  }
}
