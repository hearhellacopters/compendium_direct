import { call, put } from "redux-saga/effects";
import { setGLAilmentCombinationCompare } from "../../../ducks/GL/ailment_combination_compare";
import { requestGetGLAilmentCombinationCompare } from "../../requests/GL/ailment_combination_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetGLAilmentCombinationCompare(action) {
  try {
    const response = yield call(requestGetGLAilmentCombinationCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLAilmentCombinationCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
