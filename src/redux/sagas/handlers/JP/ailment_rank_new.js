import { call, put } from "redux-saga/effects";
import { setJPAilmentRankNew } from "../../../ducks/JP/ailment_rank_new";
import { requestGetJPAilmentRankNew } from "../../requests/JP/ailment_rank_new";
import isJson from "../_JSON_CHECK";

export function* handleGetJPAilmentRankNew(action) {
  try {
    const response = yield call(requestGetJPAilmentRankNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPAilmentRankNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
