import { call, put } from "redux-saga/effects";
import { setJPHitDataNew } from "../../../ducks/JP/hit_data_new";
import { requestGetJPHitDataNew } from "../../requests/JP/hit_data_new";
import isJson from "../_JSON_CHECK";

export function* handleGetJPHitDataNew(action) {
  try {
    const response = yield call(requestGetJPHitDataNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPHitDataNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
