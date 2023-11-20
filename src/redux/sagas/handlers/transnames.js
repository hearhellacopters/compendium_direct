import { call, put } from "redux-saga/effects";
import { setTransNames } from "../../ducks/transnames";
import { requestGetTransNames } from "../requests/transnames";
import {_error} from './_error_state_add';
import {_error_remove} from './_error_state_remove';
import isJson from "./_JSON_CHECK";

export function* handleGetTransNames(action) {
  try {
    const response = yield call(requestGetTransNames);
    const { data } = response;
    if (isJson(data, "GetTransNames") == true) {
      _error_remove("transnames");
      yield put(setTransNames(data));
    }
  } catch (error) {
    _error("transnames", error.message);
  }
}
