import { call, put } from "redux-saga/effects";
import { setJPAilmentGroupNew } from "../../../ducks/JP/ailment_group_new";
import { requestGetJPAilmentGroupNew } from "../../requests/JP/ailment_group_new";
import isJson from "../_JSON_CHECK";

export function* handleGetJPAilmentGroupNew(action) {
  try {
    const response = yield call(requestGetJPAilmentGroupNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPAilmentGroupNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
