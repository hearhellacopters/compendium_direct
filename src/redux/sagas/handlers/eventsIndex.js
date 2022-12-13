import { call, put } from "redux-saga/effects";
import { setEventsIndex } from "../../ducks/eventsIndex";
import { requestGetEventsIndex } from "../requests/eventsIndex";
import isJson from "./_JSON_CHECK";

export function* handleGetEventsIndex(action) {
  try {
    const response = yield call(requestGetEventsIndex);
    const { data } = response;
    if (isJson(data, "GetEvents") == true) {
      yield put(setEventsIndex(data));
    }
  } catch (error) {
    console.log(error);
  }
}
