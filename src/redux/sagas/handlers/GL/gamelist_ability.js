import { call, put } from "redux-saga/effects";
import { setGLGameListAbility } from "../../../ducks/GL/gamelist_ability";
import { requestGetGLGameListAbility } from "../../requests/GL/gamelist_ability";
import {_error} from '../_error_state_add';
import {_error_remove} from '../_error_state_remove';
import isJson from "../_JSON_CHECK";

export function* handleGetGLGameListAbility(action) {
  try {
    const response = yield call(requestGetGLGameListAbility);
    const { data } = response;
    if (isJson(data) == true) {
      _error_remove("gamelist_ability_gl");
      yield put(setGLGameListAbility(data));
    }
  } catch (error) {
    _error("gamelist_ability_gl", error.message);
  }
}
