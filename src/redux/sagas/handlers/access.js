import { call, put } from "redux-saga/effects";
import { setAccess } from "../../ducks/access";
import { requestGetAccess } from "../requests/access";
import isJson from "./_JSON_CHECK";

export function* handleGetAccess(action) {
  try {
    const response = yield call(requestGetAccess);
    const { data } = response;
    if (isJson(data, "GetAccess") == true) {
      yield put(setAccess(data));
    }
  } catch (error) {
    console.log(error);
  }
}
