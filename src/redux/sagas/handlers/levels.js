import { call, put } from "redux-saga/effects";
import { setLevels } from "../../ducks/levels";
import { requestGetLevels } from "../requests/levels";
import isJson from "./_JSON_CHECK";

export function* handleGetLevels(action) {
  try {
    const response = yield call(requestGetLevels);
    const { data } = response;
    if(isJson(data,"GetLevels") == true){
      yield put(setLevels(data));
    }
  } catch (error) {
    console.log(error);
  }
}
