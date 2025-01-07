import { call, put } from "redux-saga/effects";
import { setGLSummonAbilityNew } from "../../../ducks/GL/summon_ability_new";
import { requestGetGLSummonAbilityNew } from "../../requests/GL/summon_ability_new";
import isJson from "../_JSON_CHECK";

export function* handleGetGLSummonAbilityNew(action) {
  try {
    const response = yield call(requestGetGLSummonAbilityNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLSummonAbilityNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
