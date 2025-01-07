import { call, put } from "redux-saga/effects";
import { setGLCharacterOptionCompare } from "../../../ducks/GL/character_option_compare";
import { requestGetGLCharacterOptionCompare } from "../../requests/GL/character_option_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetGLCharacterOptionCompare(action) {
  try {
    const response = yield call(requestGetGLCharacterOptionCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLCharacterOptionCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
