import { call, put } from "redux-saga/effects";
import { setEnemiesDirect } from "../../ducks/enemies_direct";
import { requestGetEnemiesDirect } from "../requests/enemies_direct";
import isJson from "./_JSON_CHECK";

export function* handleGetEnemiesDirect(action) {
  try {
    const response = yield call(requestGetEnemiesDirect);
    const { data } = response;
    if (isJson(data, "GetEnemiesDirect") == true) {
      yield put(setEnemiesDirect(data));
    }
  } catch (error) {
    console.log(error);
  }
}
