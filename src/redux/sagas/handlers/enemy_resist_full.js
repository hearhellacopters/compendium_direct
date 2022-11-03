import { call, put } from "redux-saga/effects";
import { setEnemyResistFull } from "../../ducks/enemy_resist_full";
import { requestGetEnemyResistFull } from "../requests/enemy_resist_full";
import isJson from "./_JSON_CHECK";

export function* handleGetEnemyResistFull(action) {
  try {
    const response = yield call(requestGetEnemyResistFull);
    const { data } = response;
    if(isJson(data,"GetEnemyResistFull") == true){
        yield put(setEnemyResistFull(data));
    }
  } catch (error) {
    console.log(error);
  }
}
