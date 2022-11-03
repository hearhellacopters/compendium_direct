import { call, put } from "redux-saga/effects";
import { setCRYTable } from "../../ducks/tablecry";
import { requestGetCRYTable } from "../requests/tablecry";
import isJson from "./_JSON_CHECK";

export function* handleGetCRYTable(action) {
  try {
    const response = yield call(requestGetCRYTable);
    const { data } = response;
    if(isJson(data,"GetCRYTable") == true){
      yield put(setCRYTable(data));
    }
  } catch (error) {
    console.log(error);
  }
}
