import { call, put } from "redux-saga/effects";
import { setCondData } from "../../ducks/cond_data";
import { requestGetCondData } from "../requests/cond_data";
import isJson from "./_JSON_CHECK";

export function* handleGetCondData(action) {
  try {
    const response = yield call(requestGetCondData);
    const { data } = response;
    if(isJson(data,"GetCondData") == true){
      yield put(setCondData(data));
    }
  } catch (error) {
    console.log(error);
  }
}
