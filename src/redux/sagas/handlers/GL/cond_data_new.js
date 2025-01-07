import { call, put } from "redux-saga/effects";
import { setGLCondDataNew } from "../../../ducks/GL/cond_data_new";
import { requestGetGLCondDataNew } from "../../requests/GL/cond_data_new";
import isJson from "../_JSON_CHECK";

export function* handleGetGLCondDataNew(action) {
  try {
    const response = yield call(requestGetGLCondDataNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLCondDataNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
