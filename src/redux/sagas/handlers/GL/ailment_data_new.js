import { call, put } from "redux-saga/effects";
import { setGLAilmentDataNew } from "../../../ducks/GL/ailment_data_new";
import { requestGetGLAilmentDataNew } from "../../requests/GL/ailment_data_new";
import isJson from "../_JSON_CHECK";

export function* handleGetGLAilmentDataNew(action) {
  try {
    const response = yield call(requestGetGLAilmentDataNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLAilmentDataNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
