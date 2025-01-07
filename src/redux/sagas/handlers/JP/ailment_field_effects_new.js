import { call, put } from "redux-saga/effects";
import { setJPAilmentFieldEffectsNew } from "../../../ducks/JP/ailment_field_effects_new";
import { requestGetJPAilmentFieldEffectsNew } from "../../requests/JP/ailment_field_effects_new";
import isJson from "../_JSON_CHECK";

export function* handleGetJPAilmentFieldEffectsNew(action) {
  try {
    const response = yield call(requestGetJPAilmentFieldEffectsNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPAilmentFieldEffectsNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
