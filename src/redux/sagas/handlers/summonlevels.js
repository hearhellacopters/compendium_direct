import { call, put } from "redux-saga/effects";
import { setSummonLevels } from "../../ducks/summonlevels";
import { requestGetSummonLevels } from "../requests/summonlevels";
import {_error} from './_error_state_add';
import {_error_remove} from './_error_state_remove';
import isJson from "./_JSON_CHECK";

export function* handleGetSummonLevels(action) {
  try {
    const response = yield call(requestGetSummonLevels);
    const { data } = response;
    if (isJson(data, "GetSummonLevels") == true) {
      _error_remove("summonlevels");
      yield put(setSummonLevels(data));
    }
  } catch (error) {
    _error("summonlevels", error.message);
  }
}
