import { call, put } from "redux-saga/effects";
import { setGLEnemyOptionCompare } from "../../../ducks/GL/enemy_option_compare";
import { requestGetGLEnemyOptionCompare } from "../../requests/GL/enemy_option_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetGLEnemyOptionCompare(action) {
  try {
    const response = yield call(requestGetGLEnemyOptionCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLEnemyOptionCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
