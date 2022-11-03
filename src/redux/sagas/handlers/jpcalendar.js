import { call, put } from "redux-saga/effects";
import { setJPCalendar } from "../../ducks/jpcalendar";
import { requestGetJPCalendar } from "../requests/jpcalendar";
import isJson from "./_JSON_CHECK";

export function* handleGetJPCalendar(action) {
  try {
    const response = yield call(requestGetJPCalendar);
    const { data } = response;
    if(isJson(data,"GetJPCalendar") == true){
      yield put(setJPCalendar(data));
    }
  } catch (error) {
    console.log(error);
  }
}
