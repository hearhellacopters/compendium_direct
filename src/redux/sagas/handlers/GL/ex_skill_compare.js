import { call, put } from "redux-saga/effects";
import { setGLEXSkillCompare } from "../../../ducks/GL/ex_skill_compare";
import { requestGetGLEXSkillCompare } from "../../requests/GL/ex_skill_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetGLEXSkillCompare(action) {
  try {
    const response = yield call(requestGetGLEXSkillCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLEXSkillCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
