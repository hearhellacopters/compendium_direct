import { call, put } from "redux-saga/effects";
import { setJPLinkEffDataNew } from "../../../ducks/JP/link_eff_data_new";
import { requestGetJPLinkEffDataNew } from "../../requests/JP/link_eff_data_new";
import isJson from "../_JSON_CHECK";

export function* handleGetJPLinkEffDataNew(action) {
  try {
    const response = yield call(requestGetJPLinkEffDataNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPLinkEffDataNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
