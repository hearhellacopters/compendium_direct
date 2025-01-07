import { call, put } from "redux-saga/effects";
import { setJPAilmentRankCompare } from "../../../ducks/JP/ailment_rank_compare";
import { requestGetJPAilmentRankCompare } from "../../requests/JP/ailment_rank_compare";
import isJson from "../_JSON_CHECK";

export function* handleGetJPAilmentRankCompare(action) {
  try {
    const response = yield call(requestGetJPAilmentRankCompare);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPAilmentRankCompare(data));
    }
  } catch (error) {
    console.log(error);
  }
}
