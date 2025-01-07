import { call, put } from "redux-saga/effects";
import { setGLLinkEffDataNew } from "../../../ducks/GL/link_eff_data_new";
import { requestGetGLLinkEffDataNew } from "../../requests/GL/link_eff_data_new";
import isJson from "../_JSON_CHECK";

export function* handleGetGLLinkEffDataNew(action) {
  try {
    const response = yield call(requestGetGLLinkEffDataNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLLinkEffDataNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
