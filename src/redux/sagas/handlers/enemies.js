import { call, put } from "redux-saga/effects";
import { setEnemies } from "../../ducks/enemies";
import { requestGetEnemies } from "../requests/enemies";
import isJson from "./_JSON_CHECK";


export function* handleGetEnemies(action) {
  try {
    const response = yield call(requestGetEnemies);
    const { data } = response;
    if(isJson(data,"GetEnemies") == true){
      yield put(setEnemies(data));
    }
  } catch (error) {
    console.log(error);
  }
}
