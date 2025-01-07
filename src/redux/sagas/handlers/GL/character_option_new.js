import { call, put } from "redux-saga/effects";
import { setGLCharacterOptionNew } from "../../../ducks/GL/character_option_new";
import { requestGetGLCharacterOptionNew } from "../../requests/GL/character_option_new";
import isJson from "../_JSON_CHECK";

export function* handleGetGLCharacterOptionNew(action) {
  try {
    const response = yield call(requestGetGLCharacterOptionNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLCharacterOptionNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
