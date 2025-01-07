import { call, put } from "redux-saga/effects";
import { setGLEnemyResistCompare } from "../../../ducks/GL/enemy_resist_compare";
import { requestGetGLEnemyResistCompare } from "../../requests/GL/enemy_resist_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetGLEnemyResistCompare(action) {
  try {
    const response = yield call(requestGetGLEnemyResistCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLEnemyResistCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
