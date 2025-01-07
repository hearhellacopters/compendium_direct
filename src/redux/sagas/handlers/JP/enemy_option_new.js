import { call, put } from "redux-saga/effects";
import { setJPEnemyOptionNew } from "../../../ducks/JP/enemy_option_new";
import { requestGetJPEnemyOptionNew } from "../../requests/JP/enemy_option_new";
import isJson from "../_JSON_CHECK";

export function* handleGetJPEnemyOptionNew(action) {
  try {
    const response = yield call(requestGetJPEnemyOptionNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPEnemyOptionNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
