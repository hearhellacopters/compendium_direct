import { call, put } from "redux-saga/effects";
import { setUpdates } from "../../ducks/updates";
import { requestGetUpdates } from "../requests/updates";
import {_error} from './_error_state_add';
import {_error_remove} from './_error_state_remove';
import isJson from "./_JSON_CHECK";

export function* handleGetUpdates(action) {
  try {
    const response = yield call(requestGetUpdates);
    const { data } = response;
    if (isJson(data, "GetUpdates") == true) {
      _error_remove("updates");
      yield put(setUpdates(data));
    }
  } catch (error) {
    _error("updates", error.message);
  }
}
