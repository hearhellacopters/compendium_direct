import { call, put } from "redux-saga/effects";
import { setAbilities } from "../../ducks/abilities";
import { requestGetAbilities } from "../requests/abilities";
import isJson from "./_JSON_CHECK";

export function* handleGetAbilities(action) {
  try {
    const response = yield call(requestGetAbilities);
    const { data } = response;
    if(isJson(data,"GetAbilities") == true){
      yield put(setAbilities(data));
    }
  } catch (error) {
    console.log(error);
  }
}
