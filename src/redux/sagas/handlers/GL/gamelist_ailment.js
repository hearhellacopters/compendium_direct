import { call, put } from "redux-saga/effects";
import { setGLGameListAilment } from "../../../ducks/GL/gamelist_ailment";
import { requestGetGLGameListAilment } from "../../requests/GL/gamelist_ailment";
import {_error} from '../_error_state_add';
import {_error_remove} from '../_error_state_remove';
import isJson from "../_JSON_CHECK";

export function* handleGetGLGameListAilment(action) {
  try {
    const response = yield call(requestGetGLGameListAilment);
    const { data } = response;
    if (isJson(data) == true) {
      _error_remove("gamelist_ailment_gl");
      yield put(setGLGameListAilment(data));
    }
  } catch (error) {
    _error("gamelist_ailment_gl", error.message);
  }
}
