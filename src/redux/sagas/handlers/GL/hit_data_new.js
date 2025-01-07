import { call, put } from "redux-saga/effects";
import { setGLHitDataNew } from "../../../ducks/GL/hit_data_new";
import { requestGetGLHitDataNew } from "../../requests/GL/hit_data_new";
import isJson from "../_JSON_CHECK";

export function* handleGetGLHitDataNew(action) {
  try {
    const response = yield call(requestGetGLHitDataNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLHitDataNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
