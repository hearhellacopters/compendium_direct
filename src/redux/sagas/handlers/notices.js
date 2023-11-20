import { call, put } from "redux-saga/effects";
import { setNotices } from "../../ducks/notices";
import { requestGetNotices } from "../requests/notices";
import {_error} from './_error_state_add';
import {_error_remove} from './_error_state_remove';
import isJson from "./_JSON_CHECK";

export function* handleGetNotices(action) {
  try {
    const response = yield call(requestGetNotices);
    const { data } = response;
    if (isJson(data, "GetNotices") == true) {
      _error_remove("notices");
      yield put(setNotices(data));
    }
  } catch (error) {
    _error("notices", error.message);
  }
}
