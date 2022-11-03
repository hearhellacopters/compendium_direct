import { call, put } from "redux-saga/effects";
import { setEXPTable } from "../../ducks/tableexp";
import { requestGetEXPTable } from "../requests/tableexp";
import isJson from "./_JSON_CHECK";

export function* handleGetEXPTable(action) {
  try {
    const response = yield call(requestGetEXPTable);
    const { data } = response;
    if(isJson(data,"GetEXPTable") == true){
      yield put(setEXPTable(data));
    }
  } catch (error) {
    console.log(error);
  }
}
