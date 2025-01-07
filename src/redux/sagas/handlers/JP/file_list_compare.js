import { call, put } from "redux-saga/effects";
import { setJPFileListCompare } from "../../../ducks/JP/file_list_compare";
import { requestGetJPFileListCompare } from "../../requests/JP/file_list_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetJPFileListCompare(action) {
  try {
    const response = yield call(requestGetJPFileListCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPFileListCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
