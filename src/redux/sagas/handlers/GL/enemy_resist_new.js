import { call, put } from "redux-saga/effects";
import { setGLEnemyResistNew } from "../../../ducks/GL/enemy_resist_new";
import { requestGetGLEnemyResistNew } from "../../requests/GL/enemy_resist_new";
import isJson from "../_JSON_CHECK";

export function* handleGetGLEnemyResistNew(action) {
  try {
    const response = yield call(requestGetGLEnemyResistNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLEnemyResistNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
