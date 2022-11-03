import { call, put } from "redux-saga/effects";
import { setBuffs } from "../../ducks/buffs";
import { requestGetBuffs } from "../requests/buffs";
import isJson from "./_JSON_CHECK";

export function* handleGetBuffs(action) {
  try {
    const response = yield call(requestGetBuffs);
    const { data } = response;
    if(isJson(data,"GetBuffs") == true){
      yield put(setBuffs(data));
    }
    } catch (error) {
    console.log(error);
  }
}
