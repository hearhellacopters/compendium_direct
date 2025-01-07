import { call, put } from "redux-saga/effects";
import { setGLCommandAbilityCompare } from "../../../ducks/GL/command_ability_compare";
import { requestGetGLCommandAbilityCompare } from "../../requests/GL/command_ability_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetGLCommandAbilityCompare(action) {
  try {
    const response = yield call(requestGetGLCommandAbilityCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLCommandAbilityCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
