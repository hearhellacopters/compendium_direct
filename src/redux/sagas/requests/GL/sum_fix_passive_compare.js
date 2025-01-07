import { call, put } from "redux-saga/effects";
import { setGLSumFixPassiveCompare } from "../../../ducks/GL/sum_fix_passive_compare";
import { requestGetGLSumFixPassiveCompare } from "../../requests/GL/sum_fix_passive_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetGLSumFixPassiveCompare(action) {
  try {
    const response = yield call(requestGetGLSumFixPassiveCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLSumFixPassiveCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
