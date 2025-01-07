import { call, put } from "redux-saga/effects";
import { setGLFileListCompare } from "../../../ducks/GL/file_list_compare";
import { requestGetGLFileListCompare } from "../../requests/GL/file_list_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetGLFileListCompare(action) {
  try {
    const response = yield call(requestGetGLFileListCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLFileListCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
