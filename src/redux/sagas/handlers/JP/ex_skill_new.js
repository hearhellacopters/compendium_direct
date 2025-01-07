import { call, put } from "redux-saga/effects";
import { setJPEXSkillNew } from "../../../ducks/JP/ex_skill_new";
import { requestGetJPEXSkillNew } from "../../requests/JP/ex_skill_new";
import isJson from "../_JSON_CHECK";

export function* handleGetJPEXSkillNew(action) {
  try {
    const response = yield call(requestGetJPEXSkillNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPEXSkillNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
