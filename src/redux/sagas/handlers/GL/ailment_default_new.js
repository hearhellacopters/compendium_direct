import { call, put } from "redux-saga/effects";
import { setGLAilmentDefaultNew } from "../../../ducks/GL/ailment_default_new";
import { requestGetGLAilmentDefaultNew } from "../../requests/GL/ailment_default_new";
import isJson from "../_JSON_CHECK";

export function* handleGetGLAilmentDefaultNew(action) {
  try {
    const response = yield call(requestGetGLAilmentDefaultNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLAilmentDefaultNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
