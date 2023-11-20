import { call, put } from "redux-saga/effects";
import { setMasterIndex } from "../../ducks/master_index";
import { requestGetMasterIndex } from "../requests/master_index";
import {_error} from './_error_state_add';
import {_error_remove} from './_error_state_remove';
import isJson from "./_JSON_CHECK";

export function* handleGetMasterIndex(action) {
  try {
    const response = yield call(requestGetMasterIndex);
    const { data } = response;
    if (isJson(data, "GetMasterIndex") == true) {
      _error_remove("master_index");
      yield put(setMasterIndex(data));
    }
  } catch (error) {
    _error("master_index", error.message);
  }
}
