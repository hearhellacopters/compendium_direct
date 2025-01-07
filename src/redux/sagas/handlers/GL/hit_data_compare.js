import { call, put } from "redux-saga/effects";
import { setGLHitDataCompare } from "../../../ducks/GL/hit_data_compare";
import { requestGetGLHitDataCompare } from "../../requests/GL/hit_data_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetGLHitDataCompare(action) {
  try {
    const response = yield call(requestGetGLHitDataCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLHitDataCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
