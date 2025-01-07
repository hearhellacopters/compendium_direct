import { call, put } from "redux-saga/effects";
import { setGLEnemyOptionNew } from "../../../ducks/GL/enemy_option_new";
import { requestGetGLEnemyOptionNew } from "../../requests/GL/enemy_option_new";
import isJson from "../_JSON_CHECK";

export function* handleGetGLEnemyOptionNew(action) {
  try {
    const response = yield call(requestGetGLEnemyOptionNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLEnemyOptionNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
