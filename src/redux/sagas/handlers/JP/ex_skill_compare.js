import { call, put } from "redux-saga/effects";
import { setJPEXSkillCompare } from "../../../ducks/JP/ex_skill_compare";
import { requestGetJPEXSkillCompare } from "../../requests/JP/ex_skill_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetJPEXSkillCompare(action) {
  try {
    const response = yield call(requestGetJPEXSkillCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPEXSkillCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
