import { call, put } from "redux-saga/effects";
import { setJPAilmentCastCompare } from "../../../ducks/JP/ailment_cast_compare";
import { requestGetJPAilmentCastCompare } from "../../requests/JP/ailment_cast_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetJPAilmentCastCompare(action) {
  try {
    const response = yield call(requestGetJPAilmentCastCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPAilmentCastCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
