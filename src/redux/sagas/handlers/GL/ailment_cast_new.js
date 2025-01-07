import { call, put } from "redux-saga/effects";
import { setGLAilmentCastNew } from "../../../ducks/GL/ailment_cast_new";
import { requestGetGLAilmentCastNew } from "../../requests/GL/ailment_cast_new";
import isJson from "../_JSON_CHECK";

export function* handleGetGLAilmentCastNew(action) {
  try {
    const response = yield call(requestGetGLAilmentCastNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLAilmentCastNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
