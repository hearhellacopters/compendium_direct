import { call, put } from "redux-saga/effects";
import { setGLAilmentModifyCompare } from "../../../ducks/GL/ailment_modify_compare";
import { requestGetGLAilmentModifyCompare } from "../../requests/GL/ailment_modify_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetGLAilmentModifyCompare(action) {
  try {
    const response = yield call(requestGetGLAilmentModifyCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLAilmentModifyCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
