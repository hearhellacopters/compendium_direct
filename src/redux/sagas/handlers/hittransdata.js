import { call, put } from "redux-saga/effects";
import { setHitTransData } from "../../ducks/hittransdata";
import { requestGetHitTransData } from "../requests/hittransdata";
import isJson from "./_JSON_CHECK";

export function* handleGetHitTransData(action) {
  try {
    const response = yield call(requestGetHitTransData);
    const { data } = response;
    if(isJson(data,"GetHitTransData") == true){
      yield put(setHitTransData(data));
    }
  } catch (error) {
    console.log(error);
  }
}
