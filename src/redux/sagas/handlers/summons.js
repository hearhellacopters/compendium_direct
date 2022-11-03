import { call, put } from "redux-saga/effects";
import { setSummons } from "../../ducks/summons";
import { requestGetSummons } from "../requests/summons";
import isJson from "./_JSON_CHECK";

export function* handleGetSummons(action) {
  try {
    const response = yield call(requestGetSummons);
    const { data } = response;
    if(isJson(data,"GetSummons") == true){
      yield put(setSummons(data));
    }
  } catch (error) {
    console.log(error);
  }
}
