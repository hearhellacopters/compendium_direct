import { call, put } from "redux-saga/effects";
import { setGLCharacterAbilityCompare } from "../../../ducks/GL/character_ability_compare";
import { requestGetGLCharacterAbilityCompare } from "../../requests/GL/character_ability_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetGLCharacterAbilityCompare(action) {
  try {
    const response = yield call(requestGetGLCharacterAbilityCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLCharacterAbilityCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
