import { call, put } from "redux-saga/effects";
import { setGLEnemyAbilityNew } from "../../../ducks/GL/enemy_ability_new";
import { requestGetGLEnemyAbilityNew } from "../../requests/GL/enemy_ability_new";
import isJson from "../_JSON_CHECK";

export function* handleGetGLEnemyAbilityNew(action) {
  try {
    const response = yield call(requestGetGLEnemyAbilityNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLEnemyAbilityNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
