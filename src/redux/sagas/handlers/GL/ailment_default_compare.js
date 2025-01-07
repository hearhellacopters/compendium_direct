import { call, put } from "redux-saga/effects";
import { setGLAilmentDefaultCompare } from "../../../ducks/GL/ailment_default_compare";
import { requestGetGLAilmentDefaultCompare } from "../../requests/GL/ailment_default_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetGLAilmentDefaultCompare(action) {
  try {
    const response = yield call(requestGetGLAilmentDefaultCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLAilmentDefaultCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
