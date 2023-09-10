import { call, put } from "redux-saga/effects";
import { setTalkIndex } from "../../ducks/talk_index";
import { requestGetTalkIndex } from "../requests/talk_index";
import isJson from "./_JSON_CHECK";

export function* handleGetTalkIndex(action) {
  try {
    const response = yield call(requestGetTalkIndex);
    const { data } = response;
    if (isJson(data, "GetTalkIndex") == true) {
      yield put(setTalkIndex(data));
    }
  } catch (error) {
    console.log(error);
  }
}
