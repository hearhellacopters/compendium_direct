import { call, put } from "redux-saga/effects";
import { setJPAilmentDataCompare } from "../../../ducks/JP/ailment_data_compare";
import { requestGetJPAilmentDataCompare } from "../../requests/JP/ailment_data_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetJPAilmentDataCompare(action) {
  try {
    const response = yield call(requestGetJPAilmentDataCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPAilmentDataCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
