import { call, put } from "redux-saga/effects";
import { setSummonPassives } from "../../ducks/summonpassives";
import { requestGetSummonPassives } from "../requests/summonpassives";
import {_error} from './_error_state_add';
import {_error_remove} from './_error_state_remove';
import isJson from "./_JSON_CHECK";

export function* handleGetSummonPassives(action) {
  try {
    const response = yield call(requestGetSummonPassives);
    const { data } = response;
    if (isJson(data, "GetSummonPassives") == true) {
      _error_remove("summonpassives");
      yield put(setSummonPassives(data));
    }
  } catch (error) {
    _error("summonpassives", error.message);
  }
}
