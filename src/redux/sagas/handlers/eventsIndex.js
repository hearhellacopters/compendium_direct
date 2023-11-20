import { call, put } from "redux-saga/effects";
import { setEventsIndex } from "../../ducks/eventsIndex";
import { requestGetEventsIndex } from "../requests/eventsIndex";
import {_error} from './_error_state_add';
import {_error_remove} from './_error_state_remove';
import isJson from "./_JSON_CHECK";

export function* handleGetEventsIndex(action) {
  try {
    const response = yield call(requestGetEventsIndex);
    const { data } = response;
    if (isJson(data, "GetEvents") == true) {
      _error_remove("eventsIndex");
      yield put(setEventsIndex(data));
    }
  } catch (error) {
    _error("eventsIndex", error.message);
  }
}
