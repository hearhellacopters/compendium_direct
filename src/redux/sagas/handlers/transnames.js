import { call, put } from "redux-saga/effects";
import { setTransNames } from "../../ducks/transnames";
import { requestGetTransNames } from "../requests/transnames";
import isJson from "./_JSON_CHECK";

export function* handleGetTransNames(action) {
  try {
    const response = yield call(requestGetTransNames);
    const { data } = response;
    if(isJson(data,"GetTransNames") == true){
      yield put(setTransNames(data));
    }
  } catch (error) {
    console.log(error);
  }
}
