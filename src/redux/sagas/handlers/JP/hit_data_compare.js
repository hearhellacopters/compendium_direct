import { call, put } from "redux-saga/effects";
import { setJPHitDataCompare } from "../../../ducks/JP/hit_data_compare";
import { requestGetJPHitDataCompare } from "../../requests/JP/hit_data_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetJPHitDataCompare(action) {
  try {
    const response = yield call(requestGetJPHitDataCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPHitDataCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
