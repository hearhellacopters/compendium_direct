import { call, put } from "redux-saga/effects";
import { setGLAilmentLevelContNew } from "../../../ducks/GL/ailment_level_condition_new";
import { requestGetGLAilmentLevelContNew } from "../../requests/GL/ailment_level_condition_new";

export function* handleGetGLAilmentLevelContNew(action) {
  try {
    const response = yield call(requestGetGLAilmentLevelContNew);
    const { data } = response;
    yield put(setGLAilmentLevelContNew(data));
  } catch (error) {
    console.log(error);
  }
}
