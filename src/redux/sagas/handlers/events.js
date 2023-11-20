import { call, put } from "redux-saga/effects";
import { setEvents } from "../../ducks/events";
import { requestGetEvents } from "../requests/events";
import {_error} from './_error_state_add';
import {_error_remove} from './_error_state_remove';
import isJson from "./_JSON_CHECK";

export function* handleGetEvents(action) {
  try {
    const response = yield call(requestGetEvents);
    const { data } = response;
    if (isJson(data, "GetEvents") == true) {
      _error_remove("events");
      yield put(setEvents(data));
    }
  } catch (error) {
    _error("events", error.message);
  }
}
