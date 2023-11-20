import { call, put } from "redux-saga/effects";
import { setJPCalendar } from "../../ducks/jpcalendar";
import { requestGetJPCalendar } from "../requests/jpcalendar";
import {_error} from './_error_state_add';
import {_error_remove} from './_error_state_remove';
import isJson from "./_JSON_CHECK";

export function* handleGetJPCalendar(action) {
  try {
    const response = yield call(requestGetJPCalendar);
    const { data } = response;
    if (isJson(data, "GetJPCalendar") == true) {
      _error_remove("jpcalendar");
      yield put(setJPCalendar(data));
    }
  } catch (error) {
    _error("jpcalendar", error.message);
  }
}
