import { call, put } from "redux-saga/effects";
import { setTalk } from "../../ducks/talk";
import { requestGetTalk } from "../requests/talk";
import isJson from "./_JSON_CHECK";

export function* handleGetTalk(action) {
  try {
    const response = yield call(requestGetTalk);
    const { data } = response;
    if (isJson(data, "GetTalk") == true) {
      yield put(setTalk(data));
    }
  } catch (error) {
    console.log(error);
  }
}
