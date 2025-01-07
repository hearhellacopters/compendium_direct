import { call, put } from "redux-saga/effects";
import { setGLAilmentRankCompare } from "../../../ducks/GL/ailment_rank_compare";
import { requestGetGLAilmentRankCompare } from "../../requests/GL/ailment_rank_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetGLAilmentRankCompare(action) {
  try {
    const response = yield call(requestGetGLAilmentRankCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLAilmentRankCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
