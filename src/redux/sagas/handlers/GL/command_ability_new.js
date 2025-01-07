import { call, put } from "redux-saga/effects";
import { setGLCommandAbilityNew } from "../../../ducks/GL/command_ability_new";
import { requestGetGLCommandAbilityNew } from "../../requests/GL/command_ability_new";
import isJson from "../_JSON_CHECK";

export function* handleGetGLCommandAbilityNew(action) {
  try {
    const response = yield call(requestGetGLCommandAbilityNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLCommandAbilityNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
