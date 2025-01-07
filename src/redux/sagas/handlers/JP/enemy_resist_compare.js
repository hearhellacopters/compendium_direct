import { call, put } from "redux-saga/effects";
import { setJPEnemyResistCompare } from "../../../ducks/JP/enemy_resist_compare";
import { requestGetJPEnemyResistCompare } from "../../requests/JP/enemy_resist_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetJPEnemyResistCompare(action) {
  try {
    const response = yield call(requestGetJPEnemyResistCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPEnemyResistCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
