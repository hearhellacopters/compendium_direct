import { call, put } from "redux-saga/effects";
import { setGLCondDataCompare } from "../../../ducks/GL/cond_data_compare";
import { requestGetGLCondDataCompare } from "../../requests/GL/cond_data_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetGLCondDataCompare(action) {
  try {
    const response = yield call(requestGetGLCondDataCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLCondDataCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
