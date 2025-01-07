import { call, put } from "redux-saga/effects";
import { setJPAilmentDataNew } from "../../../ducks/JP/ailment_data_new";
import { requestGetJPAilmentDataNew } from "../../requests/JP/ailment_data_new";
import isJson from "../_JSON_CHECK";

export function* handleGetJPAilmentDataNew(action) {
  try {
    const response = yield call(requestGetJPAilmentDataNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPAilmentDataNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
