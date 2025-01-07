import { call, put } from "redux-saga/effects";
import { setJPAilmentFieldEffectsCompare } from "../../../ducks/JP/ailment_field_effects_compare";
import { requestGetJPAilmentFieldEffectsCompare } from "../../requests/JP/ailment_field_effects_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetJPAilmentFieldEffectsCompare(action) {
  try {
    const response = yield call(requestGetJPAilmentFieldEffectsCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPAilmentFieldEffectsCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
