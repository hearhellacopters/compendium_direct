import { call, put } from "redux-saga/effects";
import { setGLAilmentRankNew } from "../../../ducks/GL/ailment_rank_new";
import { requestGetGLAilmentRankNew } from "../../requests/GL/ailment_rank_new";
import isJson from "../_JSON_CHECK";

export function* handleGetGLAilmentRankNew(action) {
  try {
    const response = yield call(requestGetGLAilmentRankNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setGLAilmentRankNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
