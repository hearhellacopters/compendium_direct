import { call, put } from "redux-saga/effects";
import { setNotices } from "../../ducks/notices";
import { requestGetNotices } from "../requests/notices";
import isJson from "./_JSON_CHECK";

export function* handleGetNotices(action) {
  try {
    const response = yield call(requestGetNotices);
    const { data } = response;
    if (isJson(data, "GetNotices") == true) {
      yield put(setNotices(data));
    }
  } catch (error) {
    console.log(error);
  }
}
