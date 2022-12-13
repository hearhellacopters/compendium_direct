import { call, put } from "redux-saga/effects";
import { setGLGameListSphere } from "../../../ducks/GL/gamelist_sphere";
import { requestGetGLGameListSphere } from "../../requests/GL/gamelist_sphere";
import isJson from "../_JSON_CHECK";

export function* handleGetGLGameListSphere(action) {
  try {
    const response = yield call(requestGetGLGameListSphere);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLGameListSphere(data));
    }
  } catch (error) {
    console.log(error);
  }
}
