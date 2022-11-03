import { call, put } from "redux-saga/effects";
import { setSummonLevels } from "../../ducks/summonlevels";
import { requestGetSummonLevels } from "../requests/summonlevels";
import isJson from "./_JSON_CHECK";

export function* handleGetSummonLevels(action) {
  try {
    const response = yield call(requestGetSummonLevels);
    const { data } = response;
    if(isJson(data,"GetSummonLevels") == true){
      yield put(setSummonLevels(data));
    }
  } catch (error) {
    console.log(error);
  }
}
