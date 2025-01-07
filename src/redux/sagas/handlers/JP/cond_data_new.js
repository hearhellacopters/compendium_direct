import { call, put } from "redux-saga/effects";
import { setJPCondDataNew } from "../../../ducks/JP/cond_data_new";
import { requestGetJPCondDataNew } from "../../requests/JP/cond_data_new";
import isJson from "../_JSON_CHECK";

export function* handleGetJPCondDataNew(action) {
  try {
    const response = yield call(requestGetJPCondDataNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPCondDataNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
