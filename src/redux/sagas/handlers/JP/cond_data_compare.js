import { call, put } from "redux-saga/effects";
import { setJPCondDataCompare } from "../../../ducks/JP/cond_data_compare";
import { requestGetJPCondDataCompare } from "../../requests/JP/cond_data_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetJPCondDataCompare(action) {
  try {
    const response = yield call(requestGetJPCondDataCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPCondDataCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
