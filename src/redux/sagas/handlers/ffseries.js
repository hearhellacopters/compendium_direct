import { call, put } from "redux-saga/effects";
import { setFFSeries } from "../../ducks/ffseries";
import { requestGetFFSeries } from "../requests/ffseries";
import isJson from "./_JSON_CHECK";

export function* handleGetFFSeries(action) {
  try {
    const response = yield call(requestGetFFSeries);
    const { data } = response;
    if(isJson(data,"GetFFSeries") == true){
      yield put(setFFSeries(data));
    }
  } catch (error) {
    console.log(error);
  }
}
