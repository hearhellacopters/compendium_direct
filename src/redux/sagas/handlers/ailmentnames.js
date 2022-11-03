import { call, put } from "redux-saga/effects";
import { setAilmentNames } from "../../ducks/ailmentnames";
import { requestGetAilmentNames } from "../requests/ailmentnames";
import isJson from "./_JSON_CHECK";

export function* handleGetAilmentNames(action) {
  try {
    const response = yield call(requestGetAilmentNames);
    const { data } = response;
    if(isJson(data,"GetAilmentNames") == true){
      yield put(setAilmentNames(data));
    }
  } catch (error) {
    console.log(error);
  }
}
