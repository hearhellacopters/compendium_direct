import { call, put } from "redux-saga/effects";
import { setGLAilmentCastCompare } from "../../../ducks/GL/ailment_cast_compare";
import { requestGetGLAilmentCastCompare } from "../../requests/GL/ailment_cast_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetGLAilmentCastCompare(action) {
  try {
    const response = yield call(requestGetGLAilmentCastCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLAilmentCastCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
