import { call, put } from "redux-saga/effects";
import { setJPLinkEffDataCompare } from "../../../ducks/JP/link_eff_data_compare";
import { requestGetJPLinkEffDataCompare } from "../../requests/JP/link_eff_data_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetJPLinkEffDataCompare(action) {
  try {
    const response = yield call(requestGetJPLinkEffDataCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPLinkEffDataCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
