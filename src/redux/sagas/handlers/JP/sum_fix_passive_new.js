import { call, put } from "redux-saga/effects";
import { setJPSumFixPassiveNew } from "../../../ducks/JP/sum_fix_passive_new";
import { requestGetJPSumFixPassiveNew } from "../../requests/JP/sum_fix_passive_new";
import isJson from "../_JSON_CHECK";

export function* handleGetJPSumFixPassiveNew(action) {
  try {
    const response = yield call(requestGetJPSumFixPassiveNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPSumFixPassiveNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
