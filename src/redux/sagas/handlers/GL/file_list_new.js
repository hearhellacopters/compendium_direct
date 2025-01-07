import { call, put } from "redux-saga/effects";
import { setGLFileListNew } from "../../../ducks/GL/file_list_new";
import { requestGetGLFileListNew } from "../../requests/GL/file_list_new";
import isJson from "../_JSON_CHECK";

export function* handleGetGLFileListNew(action) {
  try {
    const response = yield call(requestGetGLFileListNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLFileListNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
