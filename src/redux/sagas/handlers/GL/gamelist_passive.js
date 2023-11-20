import { call, put } from "redux-saga/effects";
import { setGLGameListPassive } from "../../../ducks/GL/gamelist_passive";
import { requestGetGLGameListPassive } from "../../requests/GL/gamelist_passive";
import {_error} from '../_error_state_add';
import {_error_remove} from '../_error_state_remove';
import isJson from "../_JSON_CHECK";

export function* handleGetGLGameListPassive(action) {
  try {
    const response = yield call(requestGetGLGameListPassive);
    const { data } = response;
    if (isJson(data) == true) {
      _error_remove("gamelist_passive_gl");
      yield put(setGLGameListPassive(data));
    }
  } catch (error) {
    _error("gamelist_passive_gl", error.message);
  }
}
