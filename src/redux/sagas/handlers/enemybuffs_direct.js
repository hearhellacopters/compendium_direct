import { call, put } from "redux-saga/effects";
import { setEnemyBuffsDirect } from "../../ducks/enemybuffs_direct";
import { requestGetEnemyBuffsDirect } from "../requests/enemybuffs_direct";
import {_error} from './_error_state_add';
import {_error_remove} from './_error_state_remove';
import isJson from "./_JSON_CHECK";

export function* handleGetEnemyBuffsDirect(action) {
  try {
    const response = yield call(requestGetEnemyBuffsDirect);
    const { data } = response;
    if (isJson(data, "GetEnemyBuffsDirect") == true) {
      _error_remove("enemybuffs_direct");
      yield put(setEnemyBuffsDirect(data));
    }
  } catch (error) {
    _error("enemybuffs_direct", error.message);
  }
}
