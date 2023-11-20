import { call, put } from "redux-saga/effects";
import { setJukeBox } from "../../ducks/jukebox";
import { requestGetJukeBox } from "../requests/jukebox";
import {_error} from './_error_state_add';
import {_error_remove} from './_error_state_remove';
import isJson from "./_JSON_CHECK";

export function* handleGetJukeBox(action) {
  try {
    const response = yield call(requestGetJukeBox);
    const { data } = response;
    if (isJson(data, "GetJukeBox") == true) {
      _error_remove("jukebox");
      yield put(setJukeBox(data));
    }
  } catch (error) {
    _error("jukebox", error.message);
  }
}
