import { call, put } from "redux-saga/effects";
import { setJPAilmentDefaultNew } from "../../../ducks/JP/ailment_default_new";
import { requestGetJPAilmentDefaultNew } from "../../requests/JP/ailment_default_new";
import isJson from "../_JSON_CHECK";

export function* handleGetJPAilmentDefaultNew(action) {
  try {
    const response = yield call(requestGetJPAilmentDefaultNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPAilmentDefaultNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
