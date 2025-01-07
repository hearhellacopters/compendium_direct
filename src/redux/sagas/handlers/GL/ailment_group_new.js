import { call, put } from "redux-saga/effects";
import { setGLAilmentGroupNew } from "../../../ducks/GL/ailment_group_new";
import { requestGetGLAilmentGroupNew } from "../../requests/GL/ailment_group_new";
import isJson from "../_JSON_CHECK";

export function* handleGetGLAilmentGroupNew(action) {
  try {
    const response = yield call(requestGetGLAilmentGroupNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLAilmentGroupNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
