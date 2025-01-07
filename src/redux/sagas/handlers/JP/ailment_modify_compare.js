import { call, put } from "redux-saga/effects";
import { setJPAilmentModifyCompare } from "../../../ducks/JP/ailment_modify_compare";
import { requestGetJPAilmentModifyCompare } from "../../requests/JP/ailment_modify_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetJPAilmentModifyCompare(action) {
  try {
    const response = yield call(requestGetJPAilmentModifyCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPAilmentModifyCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
