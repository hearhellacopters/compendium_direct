import { call, put } from "redux-saga/effects";
import { setSUM2Table } from "../../ducks/tablesum2";
import { requestGetSUM2Table } from "../requests/tablesum2";
import isJson from "./_JSON_CHECK";

export function* handleGetSUM2Table(action) {
  try {
    const response = yield call(requestGetSUM2Table);
    const { data } = response;
    if(isJson(data,"GetSUM2Table") == true){
      yield put(setSUM2Table(data));
    }
  } catch (error) {
    console.log(error);
  }
}
