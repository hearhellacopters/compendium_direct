import { call, put } from "redux-saga/effects";
import { setJPFileListNew } from "../../../ducks/JP/file_list_new";
import { requestGetJPFileListNew } from "../../requests/JP/file_list_new";
import isJson from "../_JSON_CHECK";

export function* handleGetJPFileListNew(action) {
  try {
    const response = yield call(requestGetJPFileListNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPFileListNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
