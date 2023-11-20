import { call, put } from "redux-saga/effects";
import { setCharGuide } from "../../ducks/CharGuide";
import { requestGetCharGuide } from "../requests/CharGuide";
import {_error} from './_error_state_add';
import {_error_remove} from './_error_state_remove';
import isJson from "./_JSON_CHECK";

export function* handleGetCharGuide(action) {
  try {
    const response = yield call(requestGetCharGuide);
    const { data } = response;
    if (isJson(data, "GetCharGuide") == true) {
      _error_remove("CharGuide");
      yield put(setCharGuide(data));
    }
  } catch (error) {
    _error("CharGuide", error.message);
  }
}
