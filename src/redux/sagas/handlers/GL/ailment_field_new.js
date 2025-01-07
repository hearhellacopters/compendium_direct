import { call, put } from "redux-saga/effects";
import { setGLAilmentFieldNew } from "../../../ducks/GL/ailment_field_new";
import { requestGetGLAilmentFieldNew } from "../../requests/GL/ailment_field_new";
import isJson from "../_JSON_CHECK";

export function* handleGetGLAilmentFieldNew(action) {
  try {
    const response = yield call(requestGetGLAilmentFieldNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLAilmentFieldNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
