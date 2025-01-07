import { call, put } from "redux-saga/effects";
import { setGLAilmentFieldCompare } from "../../../ducks/GL/ailment_field_compare";
import { requestGetGLAilmentFieldCompare } from "../../requests/GL/ailment_field_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetGLAilmentFieldCompare(action) {
  try {
    const response = yield call(requestGetGLAilmentFieldCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLAilmentFieldCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
