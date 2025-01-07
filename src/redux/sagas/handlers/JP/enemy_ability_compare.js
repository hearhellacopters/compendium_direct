import { call, put } from "redux-saga/effects";
import { setJPEnemyAbilityCompare } from "../../../ducks/JP/enemy_ability_compare";
import { requestGetJPEnemyAbilityCompare } from "../../requests/JP/enemy_ability_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetJPEnemyAbilityCompare(action) {
  try {
    const response = yield call(requestGetJPEnemyAbilityCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPEnemyAbilityCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
