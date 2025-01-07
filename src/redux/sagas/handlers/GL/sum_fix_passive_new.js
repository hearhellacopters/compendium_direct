import { call, put } from "redux-saga/effects";
import { setGLSumFixPassiveNew } from "../../../ducks/GL/sum_fix_passive_new";
import { requestGetGLSumFixPassiveNew } from "../../requests/GL/sum_fix_passive_new";
import isJson from "../_JSON_CHECK";

export function* handleGetGLSumFixPassiveNew(action) {
  try {
    const response = yield call(requestGetGLSumFixPassiveNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLSumFixPassiveNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
