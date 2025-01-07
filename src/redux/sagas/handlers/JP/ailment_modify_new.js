import { call, put } from "redux-saga/effects";
import { setJPAilmentModifyNew } from "../../../ducks/JP/ailment_modify_new";
import { requestGetJPAilmentModifyNew } from "../../requests/JP/ailment_modify_new";
import isJson from "../_JSON_CHECK";

export function* handleGetJPAilmentModifyNew(action) {
  try {
    const response = yield call(requestGetJPAilmentModifyNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPAilmentModifyNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
