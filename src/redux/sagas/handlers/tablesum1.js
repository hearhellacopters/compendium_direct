import { call, put } from "redux-saga/effects";
import { setSUM1Table } from "../../ducks/tablesum1";
import { requestGetSUM1Table } from "../requests/tablesum1";
import isJson from "./_JSON_CHECK";

export function* handleGetSUM1Table(action) {
  try {
    const response = yield call(requestGetSUM1Table);
    const { data } = response;
    if(isJson(data,"GetSUM1Table") == true){
      yield put(setSUM1Table(data));
    }
  } catch (error) {
    console.log(error);
  }
}
