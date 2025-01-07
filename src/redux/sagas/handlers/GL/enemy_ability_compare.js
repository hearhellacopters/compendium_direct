import { call, put } from "redux-saga/effects";
import { setGLEnemyAbilityCompare } from "../../../ducks/GL/enemy_ability_compare";
import { requestGetGLEnemyAbilityCompare } from "../../requests/GL/enemy_ability_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetGLEnemyAbilityCompare(action) {
  try {
    const response = yield call(requestGetGLEnemyAbilityCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLEnemyAbilityCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
