import { call, put } from "redux-saga/effects";
import { setJPCommandGroupCompare } from "../../../ducks/JP/command_group_compare";
import { requestGetJPCommandGroupCompare } from "../../requests/JP/command_group_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetJPCommandGroupCompare(action) {
  try {
    const response = yield call(requestGetJPCommandGroupCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPCommandGroupCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
