import { call, put } from "redux-saga/effects";
import { setGLEXSkillNew } from "../../../ducks/GL/ex_skill_new";
import { requestGetGLEXSkillNew } from "../../requests/GL/ex_skill_new";
import isJson from "../_JSON_CHECK";

export function* handleGetGLEXSkillNew(action) {
  try {
    const response = yield call(requestGetGLEXSkillNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLEXSkillNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
