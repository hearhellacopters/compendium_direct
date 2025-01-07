import { call, put } from "redux-saga/effects";
import { setGLCommandGroupCompare } from "../../../ducks/GL/command_group_compare";
import { requestGetGLCommandGroupCompare } from "../../requests/GL/command_group_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetGLCommandGroupCompare(action) {
  try {
    const response = yield call(requestGetGLCommandGroupCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLCommandGroupCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
