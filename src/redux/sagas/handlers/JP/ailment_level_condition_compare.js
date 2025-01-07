import { call, put } from "redux-saga/effects";
import { setJPAilmentLevelContCompare } from "../../../ducks/JP/ailment_level_condition_compare";
import { requestGetJPAilmentLevelContCompare } from "../../requests/JP/ailment_level_condition_compare";

export function* handleGetJPAilmentLevelContCompare(action) {
  try {
    const response = yield call(requestGetJPAilmentLevelContCompare);
    const { data } = response;
    yield put(setJPAilmentLevelContCompare(data));
  } catch (error) {
    console.log(error);
  }
}
