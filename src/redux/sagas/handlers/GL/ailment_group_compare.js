import { call, put } from "redux-saga/effects";
import { setGLAilmentGroupCompare } from "../../../ducks/GL/ailment_group_compare";
import { requestGetGLAilmentGroupCompare } from "../../requests/GL/ailment_group_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetGLAilmentGroupCompare(action) {
  try {
    const response = yield call(requestGetGLAilmentGroupCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLAilmentGroupCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
