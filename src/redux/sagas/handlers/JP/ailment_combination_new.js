import { call, put } from "redux-saga/effects";
import { setJPAilmentCombinationNew } from "../../../ducks/JP/ailment_combination_new";
import { requestGetJPAilmentCombinationNew } from "../../requests/JP/ailment_combination_new";
import isJson from "../_JSON_CHECK";

export function* handleGetJPAilmentCombinationNew(action) {
  try {
    const response = yield call(requestGetJPAilmentCombinationNew);
    const { data } = response;
    if (isJson(data) == true) {
      yield put(setJPAilmentCombinationNew(data));
    }
  } catch (error) {
    console.log(error);
  }
}
