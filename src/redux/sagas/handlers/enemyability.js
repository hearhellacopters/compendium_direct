import { call, put } from "redux-saga/effects";
import { setEnemyAbility } from "../../ducks/enemyability";
import { requestGetEnemyAbility } from "../requests/enemyability";
import isJson from "./_JSON_CHECK";

export function* handleGetEnemyAbility(action) {
  try {
    const response = yield call(requestGetEnemyAbility);
    const { data } = response;
    if(isJson(data,"GetEnemyAbility") == true){
      yield put(setEnemyAbility(data));
    }
  } catch (error) {
    console.log(error);
  }
}
