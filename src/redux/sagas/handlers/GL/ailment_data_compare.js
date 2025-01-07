import { call, put } from "redux-saga/effects";
import { setGLAilmentDataCompare } from "../../../ducks/GL/ailment_data_compare";
import { requestGetGLAilmentDataCompare } from "../../requests/GL/ailment_data_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetGLAilmentDataCompare(action) {
  try {
    const response = yield call(requestGetGLAilmentDataCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLAilmentDataCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
