import { call, put } from "redux-saga/effects";
import { setAccess } from "../../ducks/access";
import { requestGetAccess } from "../requests/access";
import {_error} from './_error_state_add';
import {_error_remove} from './_error_state_remove';
import isJson from "./_JSON_CHECK";

export function* handleGetAccess(action) {
  try {
    const response = yield call(requestGetAccess);
    const { data } = response;
    if (isJson(data, "GetAccess") == true) {
      _error_remove("access");
      yield put(setAccess(data));
    }
  } catch (error) {
    _error("access", error.message);
  }
}
