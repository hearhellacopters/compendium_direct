import { call, put } from "redux-saga/effects";
import { setJPGameListPassive } from "../../../ducks/JP/gamelist_passive";
import { requestGetJPGameListPassive } from "../../requests/JP/gamelist_passive";
import {_error} from '../_error_state_add';
import {_error_remove} from '../_error_state_remove';
import isJson from "../_JSON_CHECK";

export function* handleGetJPGameListPassive(action) {
  try {
    const response = yield call(requestGetJPGameListPassive);
    const { data } = response;
    if (isJson(data) == true) {
      _error_remove("gamelist_passive_jp");
      yield put(setJPGameListPassive(data));
    }
  } catch (error) {
    _error("gamelist_passive_jp", error.message);
  }
}
