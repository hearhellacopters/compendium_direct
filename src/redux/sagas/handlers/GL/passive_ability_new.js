import { call, put } from "redux-saga/effects";
import { setGLPassiveAbilityNew } from "../../../ducks/GL/passive_ability_new";
import { requestGetGLPassiveAbilityNew } from "../../requests/GL/passive_ability_new";
import isJson from "../_JSON_CHECK";

export function* handleGetGLPassiveAbilityNew(action) {
  try {
    const response = yield call(requestGetGLPassiveAbilityNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLPassiveAbilityNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
