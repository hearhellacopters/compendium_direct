import { call, put } from "redux-saga/effects";
import { setPassiveNames } from "../../ducks/passivenames";
import { requestGetPassiveNames } from "../requests/passivenames";
import isJson from "./_JSON_CHECK";

export function* handleGetPassiveNames(action) {
  try {
    const response = yield call(requestGetPassiveNames);
    const { data } = response;
    if(isJson(data,"GetPassiveNames") == true){
      yield put(setPassiveNames(data));
    }
  } catch (error) {
    console.log(error);
  }
}
