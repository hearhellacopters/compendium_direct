import { call, put } from "redux-saga/effects";
import { setJPAilmentLevelContNew } from "../../../ducks/JP/ailment_level_condition_new";
import { requestGetJPAilmentLevelContNew } from "../../requests/JP/ailment_level_condition_new";

export function* handleGetJPAilmentLevelContNew(action) {
  try {
    const response = yield call(requestGetJPAilmentLevelContNew);
    const { data } = response;
    yield put(setJPAilmentLevelContNew(data));
  } catch (error) {
    console.log(error);
  }
}
