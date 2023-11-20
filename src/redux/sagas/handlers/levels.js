import { call, put } from "redux-saga/effects";
import { setLevels } from "../../ducks/levels";
import { requestGetLevels } from "../requests/levels";
import {_error} from './_error_state_add';
import {_error_remove} from './_error_state_remove';
import isJson from "./_JSON_CHECK";

export function* handleGetLevels(action) {
  try {
    const response = yield call(requestGetLevels);
    const { data } = response;
    if (isJson(data, "GetLevels") == true) {
      _error_remove("levels");
      yield put(setLevels(data));
    }
  } catch (error) {
    _error("levels", error.message);
  }
}
