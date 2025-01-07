import { call, put } from "redux-saga/effects";
import { setJPEnemyResistNew } from "../../../ducks/JP/enemy_resist_new";
import { requestGetJPEnemyResistNew } from "../../requests/JP/enemy_resist_new";
import isJson from "../_JSON_CHECK";

export function* handleGetJPEnemyResistNew(action) {
  try {
    const response = yield call(requestGetJPEnemyResistNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPEnemyResistNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
