import { call, put } from "redux-saga/effects";
import { setGLAilmentModifyNew } from "../../../ducks/GL/ailment_modify_new";
import { requestGetGLAilmentModifyNew } from "../../requests/GL/ailment_modify_new";
import isJson from "../_JSON_CHECK";

export function* handleGetGLAilmentModifyNew(action) {
  try {
    const response = yield call(requestGetGLAilmentModifyNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLAilmentModifyNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
