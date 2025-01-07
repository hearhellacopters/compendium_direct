import { call, put } from "redux-saga/effects";
import { setJPAilmentGroupCompare } from "../../../ducks/JP/ailment_group_compare";
import { requestGetJPAilmentGroupCompare } from "../../requests/JP/ailment_group_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetJPAilmentGroupCompare(action) {
  try {
    const response = yield call(requestGetJPAilmentGroupCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPAilmentGroupCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
