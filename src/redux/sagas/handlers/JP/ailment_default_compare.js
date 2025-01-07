import { call, put } from "redux-saga/effects";
import { setJPAilmentDefaultCompare } from "../../../ducks/JP/ailment_default_compare";
import { requestGetJPAilmentDefaultCompare } from "../../requests/JP/ailment_default_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetJPAilmentDefaultCompare(action) {
  try {
    const response = yield call(requestGetJPAilmentDefaultCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPAilmentDefaultCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
