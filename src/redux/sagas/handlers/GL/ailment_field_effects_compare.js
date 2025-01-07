import { call, put } from "redux-saga/effects";
import { setGLAilmentFieldEffectsCompare } from "../../../ducks/GL/ailment_field_effects_compare";
import { requestGetGLAilmentFieldEffectsCompare } from "../../requests/GL/ailment_field_effects_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetGLAilmentFieldEffectsCompare(action) {
  try {
    const response = yield call(requestGetGLAilmentFieldEffectsCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLAilmentFieldEffectsCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
