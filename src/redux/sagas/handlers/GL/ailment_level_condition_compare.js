import { call, put } from "redux-saga/effects";
import { setGLAilmentLevelContCompare } from "../../../ducks/GL/ailment_level_condition_compare";
import { requestGetGLAilmentLevelContCompare } from "../../requests/GL/ailment_level_condition_compare";

export function* handleGetGLAilmentLevelContCompare(action) {
  try {
    const response = yield call(requestGetGLAilmentLevelContCompare);
    const { data } = response;
    yield put(setGLAilmentLevelContCompare(data));
  } catch (error) {
    console.log(error);
  }
}
