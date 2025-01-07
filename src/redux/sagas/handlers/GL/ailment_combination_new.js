import { call, put } from "redux-saga/effects";
import { setGLAilmentCombinationNew } from "../../../ducks/GL/ailment_combination_new";
import { requestGetGLAilmentCombinationNew } from "../../requests/GL/ailment_combination_new";
import isJson from "../_JSON_CHECK";

export function* handleGetGLAilmentCombinationNew(action) {
  try {
    const response = yield call(requestGetGLAilmentCombinationNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLAilmentCombinationNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
