import { call, put } from "redux-saga/effects";
import { setEnemyAbilityDirect } from "../../ducks/enemyability_direct";
import { requestGetEnemyAbilityDirect } from "../requests/enemyability_direct";
import isJson from "./_JSON_CHECK";

export function* handleGetEnemyAbilityDirect(action) {
  try {
    const response = yield call(requestGetEnemyAbilityDirect);
    const { data } = response;
    if(isJson(data,"GetEnemyAbilityDirect") == true){
      yield put(setEnemyAbilityDirect(data));
    }
  } catch (error) {
    console.log(error);
  }
}
