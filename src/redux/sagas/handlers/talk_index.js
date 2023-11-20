import { call, put } from "redux-saga/effects";
import { setTalkIndex } from "../../ducks/talk_index";
import { requestGetTalkIndex } from "../requests/talk_index";
import {_error} from './_error_state_add';
import {_error_remove} from './_error_state_remove';
import isJson from "./_JSON_CHECK";

export function* handleGetTalkIndex(action) {
  try {
    const response = yield call(requestGetTalkIndex);
    const { data } = response;
    if (isJson(data, "GetTalkIndex") == true) {
      _error_remove("talk_index");
      yield put(setTalkIndex(data));
    }
  } catch (error) {
    _error("talk_index", error.message);
  }
}
