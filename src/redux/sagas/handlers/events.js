import { call, put } from "redux-saga/effects";
import { setEvents } from "../../ducks/events";
import { requestGetEvents } from "../requests/events";
import isJson from "./_JSON_CHECK";

export function* handleGetEvents(action) {
  try {
    const response = yield call(requestGetEvents);
    const { data } = response;
    if(isJson(data,"GetEvents") == true){
      yield put(setEvents(data));
    }
  } catch (error) {
    console.log(error);
  }
}
