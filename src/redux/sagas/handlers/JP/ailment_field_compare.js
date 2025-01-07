import { call, put } from "redux-saga/effects";
import { setJPAilmentFieldCompare } from "../../../ducks/JP/ailment_field_compare";
import { requestGetJPAilmentFieldCompare } from "../../requests/JP/ailment_field_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetJPAilmentFieldCompare(action) {
  try {
    const response = yield call(requestGetJPAilmentFieldCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPAilmentFieldCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
