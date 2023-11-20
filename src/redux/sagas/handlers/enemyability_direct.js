import { call, put } from "redux-saga/effects";
import { setEnemyAbilityDirect } from "../../ducks/enemyability_direct";
import { requestGetEnemyAbilityDirect } from "../requests/enemyability_direct";
import {_error} from './_error_state_add';
import {_error_remove} from './_error_state_remove';
import isJson from "./_JSON_CHECK";

export function* handleGetEnemyAbilityDirect(action) {
  try {
    const response = yield call(requestGetEnemyAbilityDirect);
    const { data } = response;
    if (isJson(data, "GetEnemyAbilityDirect") == true) {
      _error_remove("enemyability_direct");
      yield put(setEnemyAbilityDirect(data));
    }
  } catch (error) {
    _error("enemyability_direct", error.message);
  }
}
