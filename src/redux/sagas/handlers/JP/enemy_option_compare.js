import { call, put } from "redux-saga/effects";
import { setJPEnemyOptionCompare } from "../../../ducks/JP/enemy_option_compare";
import { requestGetJPEnemyOptionCompare } from "../../requests/JP/enemy_option_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetJPEnemyOptionCompare(action) {
  try {
    const response = yield call(requestGetJPEnemyOptionCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPEnemyOptionCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
