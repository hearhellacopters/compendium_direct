import { call, put } from "redux-saga/effects";
import { setEnemiesDirect } from "../../ducks/enemies_direct";
import { requestGetEnemiesDirect } from "../requests/enemies_direct";
import {_error} from './_error_state_add';
import {_error_remove} from './_error_state_remove';
import isJson from "./_JSON_CHECK";

export function* handleGetEnemiesDirect(action) {
  try {
    const response = yield call(requestGetEnemiesDirect);
    const { data } = response;
    if (isJson(data, "GetEnemiesDirect") == true) {
      _error_remove("enemies_direct");
      yield put(setEnemiesDirect(data));
    }
  } catch (error) {
    _error("enemies_direct", error.message);
  }
}
