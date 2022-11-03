import { call, put } from "redux-saga/effects";
import { setOptionTransData } from "../../ducks/optiontransdata";
import { requestGetOptionTransData } from "../requests/optiontransdata";
import isJson from "./_JSON_CHECK";

export function* handleGetOptionTransData(action) {
  try {
    const response = yield call(requestGetOptionTransData);
    const { data } = response;
    if(isJson(data,"GetOptionTransData") == true){
      yield put(setOptionTransData(data));
    }
  } catch (error) {
    console.log(error);
  }
}
