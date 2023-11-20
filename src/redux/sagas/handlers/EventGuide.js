import { call, put } from "redux-saga/effects";
import { setEventGuide } from "../../ducks/EventGuide";
import { requestGetEventGuide } from "../requests/EventGuide";
import {_error} from './_error_state_add';
import {_error_remove} from './_error_state_remove';
import isJson from "./_JSON_CHECK";

export function* handleGetEventGuide(action) {
  try {
    const response = yield call(requestGetEventGuide);
    const { data } = response;
    if (isJson(data, "GetEventGuide") == true) {
      _error_remove("EventGuide");
      yield put(setEventGuide(data));
    }
  } catch (error) {
    _error("EventGuide", error.message);
  }
}
