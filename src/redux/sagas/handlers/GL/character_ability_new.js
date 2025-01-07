import { call, put } from "redux-saga/effects";
import { setGLCharacterAbilityNew } from "../../../ducks/GL/character_ability_new";
import { requestGetGLCharacterAbilityNew } from "../../requests/GL/character_ability_new";
import isJson from "../_JSON_CHECK";

export function* handleGetGLCharacterAbilityNew(action) {
  try {
    const response = yield call(requestGetGLCharacterAbilityNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLCharacterAbilityNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
