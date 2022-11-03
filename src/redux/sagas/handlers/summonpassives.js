import { call, put } from "redux-saga/effects";
import { setSummonPassives } from "../../ducks/summonpassives";
import { requestGetSummonPassives } from "../requests/summonpassives";
import isJson from "./_JSON_CHECK";

export function* handleGetSummonPassives(action) {
  try {
    const response = yield call(requestGetSummonPassives);
    const { data } = response;
    if(isJson(data,"GetSummonPassives") == true){
      yield put(setSummonPassives(data));
    }
  } catch (error) {
    console.log(error);
  }
}
