import { call, put } from "redux-saga/effects";
import { setJPSumFixPassiveCompare } from "../../../ducks/JP/sum_fix_passive_compare";
import { requestGetJPSumFixPassiveCompare } from "../../requests/JP/sum_fix_passive_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetJPSumFixPassiveCompare(action) {
  try {
    const response = yield call(requestGetJPSumFixPassiveCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPSumFixPassiveCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
