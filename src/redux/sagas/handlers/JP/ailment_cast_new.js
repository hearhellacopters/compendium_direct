import { call, put } from "redux-saga/effects";
import { setJPAilmentCastNew } from "../../../ducks/JP/ailment_cast_new";
import { requestGetJPAilmentCastNew } from "../../requests/JP/ailment_cast_new";
import isJson from "../_JSON_CHECK";

export function* handleGetJPAilmentCastNew(action) {
  try {
    const response = yield call(requestGetJPAilmentCastNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPAilmentCastNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
