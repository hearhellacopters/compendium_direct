import { call, put } from "redux-saga/effects";
import { setMasterIndex } from "../../ducks/master_index";
import { requestGetMasterIndex } from "../requests/master_index";
import isJson from "./_JSON_CHECK";

export function* handleGetMasterIndex(action) {
  try {
    const response = yield call(requestGetMasterIndex);
    const { data } = response;
    if (isJson(data, "GetMasterIndex") == true) {
      yield put(setMasterIndex(data));
    }
  } catch (error) {
    console.log(error);
  }
}
