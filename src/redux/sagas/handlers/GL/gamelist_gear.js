import { call, put } from "redux-saga/effects";
import { setGLGameListGear } from "../../../ducks/GL/gamelist_gear";
import { requestGetGLGameListGear } from "../../requests/GL/gamelist_gear";
import {_error} from '../_error_state_add';
import {_error_remove} from '../_error_state_remove';
import isJson from "../_JSON_CHECK";

export function* handleGetGLGameListGear(action) {
  try {
    const response = yield call(requestGetGLGameListGear);
    const { data } = response;
    if (isJson(data) == true) {
      _error_remove("gamelist_gear_gl");
      yield put(setGLGameListGear(data));
    }
  } catch (error) {
    _error("gamelist_gear_gl", error.message);
  }
}
