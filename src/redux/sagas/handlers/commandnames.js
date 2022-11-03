import { call, put } from "redux-saga/effects";
import { setCommandNames } from "../../ducks/commandnames";
import { requestGetCommandNames } from "../requests/commandnames";
import isJson from "./_JSON_CHECK";

export function* handleGetCommandNames(action) {
  try {
    const response = yield call(requestGetCommandNames);
    const { data } = response;
    if(isJson(data,"GetCommandNames") == true){
      yield put(setCommandNames(data));
    }
  } catch (error) {
    console.log(error);
  }
}
