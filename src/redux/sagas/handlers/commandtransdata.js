import { call, put } from "redux-saga/effects";
import { setCommandTransData } from "../../ducks/commandtransdata";
import { requestGetCommandTransData } from "../requests/commandtransdata";
import isJson from "./_JSON_CHECK";

export function* handleGetCommandTransData(action) {
  try {
    const response = yield call(requestGetCommandTransData);
    const { data } = response;
    if(isJson(data,"GetCommandTransData") == true){
      yield put(setCommandTransData(data));
    }
  } catch (error) {
    console.log(error);
  }
}
