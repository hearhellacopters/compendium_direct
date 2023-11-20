import { call, put } from "redux-saga/effects";
import { setUltimaWeapon } from "../../ducks/ultimaweapon";
import { requestGetUltimaWeapon } from "../requests/ultimaweapon";
import {_error} from './_error_state_add';
import {_error_remove} from './_error_state_remove';
import isJson from "./_JSON_CHECK";

export function* handleGetUltimaWeapon(action) {
  try {
    const response = yield call(requestGetUltimaWeapon);
    const { data } = response;
    if (isJson(data, "GetUltimaWeapon") == true) {
      _error_remove("ultimaweapon");
      yield put(setUltimaWeapon(data));
    }
  } catch (error) {
    _error("ultimaweapon", error.message);
  }
}
