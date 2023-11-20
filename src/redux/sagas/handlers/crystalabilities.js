import { call, put } from "redux-saga/effects";
import { setCrystalAbilities } from "../../ducks/crystalabilities";
import { requestGetCrystalAbilities } from "../requests/crystalabilities";
import {_error} from './_error_state_add';
import {_error_remove} from './_error_state_remove';
import isJson from "./_JSON_CHECK";

export function* handleGetCrystalAbilities(action) {
  try {
    const response = yield call(requestGetCrystalAbilities);
    const { data } = response;
    if (isJson(data, "GetCrystalAbilities") == true) {
      _error_remove("crystalabilities");
      yield put(setCrystalAbilities(data));
    }
  } catch (error) {
    _error("crystalabilities", error.message);
  }
}
