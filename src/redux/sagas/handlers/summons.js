import { call, put } from "redux-saga/effects";
import { setSummons } from "../../ducks/summons";
import { requestGetSummons } from "../requests/summons";
import {_error} from './_error_state_add';
import {_error_remove} from './_error_state_remove';
import isJson from "./_JSON_CHECK";

export function* handleGetSummons(action) {
  try {
    const response = yield call(requestGetSummons);
    const { data } = response;
    if (isJson(data, "GetSummons") == true) {
      _error_remove("summons");
      yield put(setSummons(data));
    }
  } catch (error) {
    _error("summons", error.message);
  }
}
