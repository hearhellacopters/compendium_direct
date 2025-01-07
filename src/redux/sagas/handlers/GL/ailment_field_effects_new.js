import { call, put } from "redux-saga/effects";
import { setGLAilmentFieldEffectsNew } from "../../../ducks/GL/ailment_field_effects_new";
import { requestGetGLAilmentFieldEffectsNew } from "../../requests/GL/ailment_field_effects_new";
import isJson from "../_JSON_CHECK";

export function* handleGetGLAilmentFieldEffectsNew(action) {
  try {
    const response = yield call(requestGetGLAilmentFieldEffectsNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLAilmentFieldEffectsNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
