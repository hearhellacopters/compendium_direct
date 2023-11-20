import { call, put } from "redux-saga/effects";
import { setTalk } from "../../ducks/talk";
import { requestGetTalk } from "../requests/talk";
import {_error} from './_error_state_add';
import {_error_remove} from './_error_state_remove';
import isJson from "./_JSON_CHECK";

export function* handleGetTalk(action) {
  try {
    const response = yield call(requestGetTalk);
    const { data } = response;
    if (isJson(data, "GetTalk") == true) {
      _error_remove("talk");
      yield put(setTalk(data));
    }
  } catch (error) {
    _error("talk", error.message);
  }
}
