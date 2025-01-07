import { call, put } from "redux-saga/effects";
import { setJPCommandGroupNew } from "../../../ducks/JP/command_group_new";
import { requestGetJPCommandGroupNew } from "../../requests/JP/command_group_new";
import isJson from "../_JSON_CHECK";

export function* handleGetJPCommandGroupNew(action) {
  try {
    const response = yield call(requestGetJPCommandGroupNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPCommandGroupNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
