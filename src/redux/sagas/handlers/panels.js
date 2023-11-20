import { call, put } from "redux-saga/effects";
import { setPanels } from "../../ducks/panels";
import { requestGetPanels } from "../requests/panels";
import {_error} from './_error_state_add';
import {_error_remove} from './_error_state_remove';
import isJson from "./_JSON_CHECK";

export function* handleGetPanels(action) {
  try {
    const response = yield call(requestGetPanels);
    const { data } = response;
    if (isJson(data, "GetPanels") == true) {
      _error_remove("panels");
      yield put(setPanels(data));
    }
  } catch (error) {
    _error("panels", error.message);
  }
}
