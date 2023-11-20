import { call, put } from "redux-saga/effects";
import { setGLGameListSphere } from "../../../ducks/GL/gamelist_sphere";
import { requestGetGLGameListSphere } from "../../requests/GL/gamelist_sphere";
import {_error} from '../_error_state_add';
import {_error_remove} from '../_error_state_remove';
import isJson from "../_JSON_CHECK";

export function* handleGetGLGameListSphere(action) {
  try {
    const response = yield call(requestGetGLGameListSphere);
    const { data } = response;
    if (isJson(data) == true) {
      _error_remove("gamelist_sphere_gl");
      yield put(setGLGameListSphere(data));
    }
  } catch (error) {
    _error("gamelist_sphere_gl", error.message);
  }
}
