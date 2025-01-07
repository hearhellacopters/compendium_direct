import { call, put } from "redux-saga/effects";
import { setJPEnemyAbilityNew } from "../../../ducks/JP/enemy_ability_new";
import { requestGetJPEnemyAbilityNew } from "../../requests/JP/enemy_ability_new";
import isJson from "../_JSON_CHECK";

export function* handleGetJPEnemyAbilityNew(action) {
  try {
    const response = yield call(requestGetJPEnemyAbilityNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPEnemyAbilityNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
