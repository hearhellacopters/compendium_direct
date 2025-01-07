import { call, put } from "redux-saga/effects";
import { setGLPassiveAbilityCompare } from "../../../ducks/GL/passive_ability_compare";
import { requestGetGLPassiveAbilityCompare } from "../../requests/GL/passive_ability_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetGLPassiveAbilityCompare(action) {
  try {
    const response = yield call(requestGetGLPassiveAbilityCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLPassiveAbilityCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
