import { call, put } from "redux-saga/effects";
import { setJPAilmentFieldNew } from "../../../ducks/JP/ailment_field_new";
import { requestGetJPAilmentFieldNew } from "../../requests/JP/ailment_field_new";
import isJson from "../_JSON_CHECK";

export function* handleGetJPAilmentFieldNew(action) {
  try {
    const response = yield call(requestGetJPAilmentFieldNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPAilmentFieldNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
