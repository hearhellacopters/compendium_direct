import { call, put } from "redux-saga/effects";
import { setGLLinkEffDataCompare } from "../../../ducks/GL/link_eff_data_compare";
import { requestGetGLLinkEffDataCompare } from "../../requests/GL/link_eff_data_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetGLLinkEffDataCompare(action) {
  try {
    const response = yield call(requestGetGLLinkEffDataCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLLinkEffDataCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
