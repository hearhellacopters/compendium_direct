import { call, put } from "redux-saga/effects";
import { setAilmentEffects } from "../../ducks/ailment_effects";
import { requestGetAilmentEffects } from "../requests/ailment_effects";
import isJson from "./_JSON_CHECK";

export function* handleGetAilmentEffects(action) {
  try {
    const response = yield call(requestGetAilmentEffects);
    const { data } = response;
    if(isJson(data,"GetAilmentEffects") == true){
      yield put(setAilmentEffects(data));
    }
  } catch (error) {
    console.log(error);
  }
}
