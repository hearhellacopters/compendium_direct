import { call, put } from "redux-saga/effects";
import { setCrystalPassives } from "../../ducks/crystalpassives";
import { requestGetCrystalPassives } from "../requests/crystalpassives";
import {_error} from './_error_state_add';
import {_error_remove} from './_error_state_remove';
import isJson from "./_JSON_CHECK";

export function* handleGetCrystalPassives(action) {
  try {
    const response = yield call(requestGetCrystalPassives);
    const { data } = response;
    if (isJson(data, "GetCrystalPassives") == true) {
      _error_remove("crystalpassives");
      yield put(setCrystalPassives(data));
    }
  } catch (error) {
    _error("crystalpassives", error.message);
  }
}
