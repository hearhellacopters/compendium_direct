import { call, put } from "redux-saga/effects";
import { setEventGuide } from "../../ducks/EventGuide";
import { requestGetEventGuide } from "../requests/EventGuide";
import isJson from "./_JSON_CHECK";

export function* handleGetEventGuide(action) {
  try {
    const response = yield call(requestGetEventGuide);
    const { data } = response;
    if(isJson(data,"GetEventGuide") == true){
      yield put(setEventGuide(data));
    }
  } catch (error) {
    console.log(error);
  }
}
