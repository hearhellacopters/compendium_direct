import { call, put } from "redux-saga/effects";
import { setGLCommandGroupNew } from "../../../ducks/GL/command_group_new";
import { requestGetGLCommandGroupNew } from "../../requests/GL/command_group_new";
import isJson from "../_JSON_CHECK";

export function* handleGetGLCommandGroupNew(action) {
  try {
    const response = yield call(requestGetGLCommandGroupNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLCommandGroupNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
