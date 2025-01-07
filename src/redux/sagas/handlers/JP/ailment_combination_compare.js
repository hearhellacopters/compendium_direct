import { call, put } from "redux-saga/effects";
import { setJPAilmentCombinationCompare } from "../../../ducks/JP/ailment_combination_compare";
import { requestGetJPAilmentCombinationCompare } from "../../requests/JP/ailment_combination_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetJPAilmentCombinationCompare(action) {
  try {
    const response = yield call(requestGetJPAilmentCombinationCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPAilmentCombinationCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
