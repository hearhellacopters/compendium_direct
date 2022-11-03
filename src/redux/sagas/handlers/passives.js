import { call, put } from "redux-saga/effects";
import { setPassives } from "../../ducks/passives";
import { requestGetPassives } from "../requests/passives";
import isJson from "./_JSON_CHECK";

export function* handleGetPassives(action) {
  try {
    const response = yield call(requestGetPassives);
    const { data } = response;
    if(isJson(data,"GetPassives") == true){
      yield put(setPassives(data));
    }
  } catch (error) {
    console.log(error);
  }
}
