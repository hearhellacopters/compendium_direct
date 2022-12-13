import { call, put } from "redux-saga/effects";
import { setUpdates } from "../../ducks/updates";
import { requestGetUpdates } from "../requests/updates";
import isJson from "./_JSON_CHECK";

export function* handleGetUpdates(action) {
  try {
    const response = yield call(requestGetUpdates);
    const { data } = response;
    if (isJson(data, "GetUpdates") == true) {
      yield put(setUpdates(data));
    }
  } catch (error) {
    console.log(error);
  }
}
